/* HARNESS CDP — TRADUZ PRIME. Uso: node cdp-smoke.js */
const {spawn}=require('child_process');
const os=require('os'),path=require('path'),fs=require('fs');
const CHROME='C:\\Users\\Sylvia Camillo\\AppData\\Local\\ms-playwright\\chromium-1254\\chrome-win64\\chrome.exe';
const PORT=9371,PERFIL=path.join(os.tmpdir(),'moss-cdp-tp-'+Date.now());
const HTML=path.join(__dirname,'..','index.html');
const fileUrl='file:///'+HTML.replace(/\\/g,'/').replace(/ /g,'%20');
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
idiomas:document.querySelectorAll('.idioma').length,documentos:document.querySelectorAll('.documento').length,
etapas:document.querySelectorAll('.etapa').length,faq:document.querySelectorAll('details').length})`));
checar(`Layout ${w}px — sem rolagem horizontal`,d.sw<=d.cw+1,`scrollWidth=${d.sw}, clientWidth=${d.cw}`);
checar(`Layout ${w}px — conteúdo renderizado`,d.idiomas===5&&d.documentos===6&&d.etapas===5&&d.faq===4,JSON.stringify(d));}
await c.send('Emulation.setDeviceMetricsOverride',{width:1366,height:900,deviceScaleFactor:1,mobile:false},sessionId);
await c.send('Page.navigate',{url:fileUrl},sessionId);await sleep(400);

// Simulador
const sim=await av(`(()=>{document.getElementById('paginas').value='20';
document.getElementById('paginas').dispatchEvent(new Event('input'));
document.getElementById('tipoDoc').value='tecnico';document.getElementById('prazo').value='expresso';
document.getElementById('formSimulador').dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));
return JSON.stringify({valor:document.getElementById('valorSimulado').textContent,
idiomas:document.getElementById('linhaIdiomas').textContent,pag:document.getElementById('linhaPag').textContent});})()`);
const si=JSON.parse(sim);
checar('Simulador calcula estimativa',si.valor.includes('R$')&&/\d/.test(si.valor)&&si.idiomas==='PT-BR → EN'&&si.pag==='20 páginas',JSON.stringify(si));

// Validação de idiomas iguais
const igual=await av(`(()=>{document.getElementById('destino').value='PT-BR';
document.getElementById('formSimulador').dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));
const e=document.getElementById('erroIdioma');return e?e.textContent:'';})()`);
checar('Simulador rejeita idiomas iguais',/diferentes/i.test(igual),`erro=${igual}`);

// Acompanhamento
const ped=await av(`(()=>{document.getElementById('codigoPedido').value='tr-2026-002';
document.getElementById('buscarPedido').click();
return JSON.stringify({txt:document.getElementById('resultadoPedido').textContent,
passos:document.querySelectorAll('#resultadoPedido .passos li').length});})()`);
const pi=JSON.parse(ped);
checar('Busca de pedido fictício funciona',/EN → PT-BR/.test(pi.txt)&&pi.passos===5,JSON.stringify(pi).slice(0,100));
const erro=await av(`(()=>{document.getElementById('codigoPedido').value='XXX';document.getElementById('buscarPedido').click();
return document.getElementById('erroPedido').textContent;})()`);
checar('Pedido inexistente exibe erro',/não encontrado/i.test(erro),`erro=${erro.slice(0,50)}`);

// Formulário
const vazio=await av(`(()=>{document.getElementById('formAtendimento').dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));
return Array.from(document.querySelectorAll('#formAtendimento .erro')).filter(e=>e.textContent.trim()).length;})()`);
checar('Formulário valida campos',vazio===3,`erros=${vazio}`);
const ok=await av(`(()=>{document.getElementById('nome').value='Ana';document.getElementById('email').value='ana@exemplo.com';
document.getElementById('detalhes').value='Traduzir um artigo de dez páginas';
document.getElementById('formAtendimento').dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));
return document.getElementById('confirmacao').style.display;})()`);
checar('Formulário confirma envio simulado',ok==='block',`display=${ok}`);

// FAQ
const faq=await av(`(()=>{const d=document.querySelector('details');d.open=true;return d.open;})()`);
checar('FAQ abre ao clicar',faq===true,`aberto=${faq}`);

// Link MOSS
const wa=await av(`document.getElementById('btnMoss').href`);
checar('Botão MOSS aponta ao WhatsApp correto',wa.startsWith('https://wa.me/5511942038103'),`href=${wa.slice(0,80)}`);


// Fotografias licenciadas (6 por demo) — carregamento real
await av(`document.getElementById('fotografias').scrollIntoView()`);
await new Promise(function(r){setTimeout(r,600)});
const fotos=await av(`JSON.stringify(Array.from(document.querySelectorAll('#fotografias img')).map(i=>({ok:i.complete&&i.naturalWidth>0,alt:i.alt.length>5,local:i.getAttribute('src').startsWith('img/fotos/')})))`);
const fo=JSON.parse(fotos);
checar('6 fotografias licenciadas carregam',fo.length===6&&fo.every(function(x){return x.ok&&x.alt&&x.local}),JSON.stringify(fo.map(function(x){return x.ok})));

console.log('\n===== RELATÓRIO DE TESTES — TRADUZ PRIME =====\n');
resultados.forEach(r=>console.log((r.ok?'PASS ':'FAIL ')+r.nome+(r.detalhe?'  ['+r.detalhe+']':'')));
const falhas=resultados.filter(r=>!r.ok).length;
console.log('\nErros de console/JS capturados: '+erros.length);erros.slice(0,12).forEach(e=>console.log('  ! '+e));
console.log(`\nTotal: ${resultados.length} verificações, ${falhas} falhas, ${erros.length} erros de console.`);
process.exitCode=(falhas===0&&erros.length===0)?0:1;
}catch(e){console.error('ERRO NO HARNESS:',e);process.exitCode=1;}
finally{chrome.kill('SIGKILL');try{fs.rmSync(PERFIL,{recursive:true,force:true});}catch{}}})();
