/* HARNESS CDP — SAFEWORK PRIME. Uso: node cdp-smoke.js */
const {spawn}=require('child_process');const os=require('os'),path=require('path'),fs=require('fs');
const CHROME='C:\\Users\\Sylvia Camillo\\AppData\\Local\\ms-playwright\\chromium-1254\\chrome-win64\\chrome.exe';
const PORT=9461,PERFIL=path.join(os.tmpdir(),'moss-cdp-sw-'+Date.now());
const HTML=path.join(__dirname,'..','index.html');const fileUrl='file:///'+HTML.replace(/\\/g,'/').replace(/ /g,'%20');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
class CDP{constructor(ws,ev){this.ws=ws;this.id=0;this.p=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);
if(m.id&&this.p.has(m.id)){const x=this.p.get(m.id);this.p.delete(m.id);m.error?x.rej(m.error):x.res(m.result);}else if(ev)ev(m);};}
send(method,params={},sessionId){const id=++this.id,msg={id,method,params};if(sessionId)msg.sessionId=sessionId;
return new Promise((res,rej)=>{this.p.set(id,{res,rej});this.ws.send(JSON.stringify(msg));});}}
(async()=>{
const chrome=spawn(CHROME,['--headless=new','--disable-gpu','--no-sandbox','--hide-scrollbars','--remote-debugging-port='+PORT,'--user-data-dir='+PERFIL,'about:blank'],{stdio:'ignore'});
try{
let ver;for(let i=0;i<60;i++){try{ver=await(await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();break;}catch{await sleep(150);}}
if(!ver)throw new Error('Chromium não iniciou');
const erros=[];const ws=new WebSocket(ver.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
const c=new CDP(ws,m=>{
if(m.method==='Runtime.exceptionThrown')erros.push('EXCEPTION: '+(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text));
if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')erros.push('CONSOLE: '+m.params.args.map(a=>a.value||a.description).join(' '));
if(m.method==='Page.javascriptDialogOpening')c.send('Page.handleJavaScriptDialog',{accept:true},m.sessionId).catch(()=>{});});
const {targetId}=await c.send('Target.createTarget',{url:'about:blank'});
const {sessionId}=await c.send('Target.attachToTarget',{targetId,flatten:true});
await c.send('Runtime.enable',{},sessionId);await c.send('Page.enable',{},sessionId);
const av=async expr=>{const r=await c.send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true},sessionId);
if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
const resultados=[],checar=(n,ok,d='')=>resultados.push({nome:n,ok:!!ok,detalhe:d});

for(const w of [360,390,768,1366]){
await c.send('Emulation.setDeviceMetricsOverride',{width:w,height:900,deviceScaleFactor:1,mobile:w<600},sessionId);
await c.send('Page.navigate',{url:fileUrl},sessionId);
for(let i=0;i<40;i++){if(await av('document.readyState==="complete"'))break;await sleep(100);}await sleep(150);
const d=JSON.parse(await av(`JSON.stringify({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,
consultorias:document.querySelectorAll('.consultoria').length,treinamentos:document.querySelectorAll('#corpoTreinamentos tr').length,
documentos:document.querySelectorAll('.documento').length,ind:document.querySelectorAll('.indicador').length,
checks:document.querySelectorAll('#checklistRotina input').length})`));
checar(`Layout ${w}px — sem rolagem horizontal`,d.sw<=d.cw+1,`scrollWidth=${d.sw}, clientWidth=${d.cw}`);
checar(`Layout ${w}px — conteúdo renderizado`,d.consultorias===6&&d.treinamentos===4&&d.documentos===4&&d.ind===4&&d.checks===5,JSON.stringify(d));}
await c.send('Emulation.setDeviceMetricsOverride',{width:1366,height:900,deviceScaleFactor:1,mobile:false},sessionId);
await c.send('Page.navigate',{url:fileUrl},sessionId);await sleep(400);

// Documentos: alertas de vencimento
const docs=await av(`JSON.stringify({avisos:document.querySelectorAll('.selo-doc--aviso').length,
vencidos:document.querySelectorAll('.selo-doc--vencido').length,ok:document.querySelectorAll('.selo-doc--ok').length})`);
const dc=JSON.parse(docs);
checar('Alertas de vencimento calculados',dc.avisos>=1&&dc.vencidos>=1&&dc.ok>=1,JSON.stringify(dc));

// Cadastro de empresa
const cad=await av(`(()=>{document.getElementById('nomeEmpresa').value='Empresa Fictícia Nova';
document.getElementById('formEmpresa').dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));
return JSON.stringify({ind:document.querySelectorAll('.indicador strong')[2].textContent,conf:document.getElementById('confirmacaoEmpresa').classList.contains('visivel')});})()`);
const ci=JSON.parse(cad);
checar('Cadastro de empresa fictícia funciona',ci.ind==='1'&&ci.conf,JSON.stringify(ci));

// Calendário
const cal=await av(`(()=>{const a=document.getElementById('mesCalendario').textContent;document.getElementById('mesSeguinte').click();
return a!==document.getElementById('mesCalendario').textContent;})()`);
checar('Calendário navega entre meses',cal===true,`trocou=${cal}`);

// Relatório para impressão
const rel=await av(`(()=>{document.getElementById('imprimirRelatorio').click();return document.getElementById('areaImpressao').textContent;})()`);
checar('Relatório administrativo gerado',/SEM VALIDADE REGULAMENTAR/.test(rel)&&/Treinamentos ilustrativos/.test(rel),`tamanho=${rel.length}`);

// Orçamento
const val=await av(`(()=>{document.getElementById('nome').value='';document.getElementById('email').value='x';document.getElementById('detalhes').value='';
document.getElementById('formOrcamento').dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));
return Array.from(document.querySelectorAll('#formOrcamento .erro')).filter(e=>e.textContent.trim()).length;})()`);
checar('Orçamento valida campos',val===3,`erros=${val}`);

// Sem certificados / normas específicas citadas
const seg=await av(`(()=>{const t=document.body.innerText.toLowerCase();return JSON.stringify({
 naoEmite:t.includes('não emite certificados'),naoNormas:t.includes('nenhuma norma específica')});})()`);
const sg=JSON.parse(seg);
checar('Avisos de segurança presentes',sg.naoEmite&&sg.naoNormas,JSON.stringify(sg));

const wa=await av(`document.getElementById('btnMoss').href`);
checar('Botão MOSS aponta ao WhatsApp correto',wa.startsWith('https://wa.me/5511942038103'),`href=${wa.slice(0,80)}`);


// Fotografias licenciadas (6 por demo) — carregamento real
await av(`document.getElementById('fotografias').scrollIntoView()`);
await new Promise(function(r){setTimeout(r,600)});
const fotos=await av(`JSON.stringify(Array.from(document.querySelectorAll('#fotografias img')).map(i=>({ok:i.complete&&i.naturalWidth>0,alt:i.alt.length>5,local:i.getAttribute('src').startsWith('img/fotos/')})))`);
const fo=JSON.parse(fotos);
checar('6 fotografias licenciadas carregam',fo.length===6&&fo.every(function(x){return x.ok&&x.alt&&x.local}),JSON.stringify(fo.map(function(x){return x.ok})));

console.log('\n===== RELATÓRIO DE TESTES — SAFEWORK PRIME =====\n');
resultados.forEach(r=>console.log((r.ok?'PASS ':'FAIL ')+r.nome+(r.detalhe?'  ['+r.detalhe+']':'')));
const falhas=resultados.filter(r=>!r.ok).length;
console.log('\nErros de console/JS capturados: '+erros.length);erros.slice(0,12).forEach(e=>console.log('  ! '+e));
console.log(`\nTotal: ${resultados.length} verificações, ${falhas} falhas, ${erros.length} erros de console.`);
process.exitCode=(falhas===0&&erros.length===0)?0:1;
}catch(e){console.error('ERRO NO HARNESS:',e);process.exitCode=1;}
finally{chrome.kill('SIGKILL');try{fs.rmSync(PERFIL,{recursive:true,force:true});}catch{}}})();
