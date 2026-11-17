/* HARNESS CDP — ACESSO PRIME. Inclui verificações de acessibilidade. Uso: node cdp-smoke.js */
const {spawn}=require('child_process');const os=require('os'),path=require('path'),fs=require('fs');
const CHROME='C:\\Users\\Sylvia Camillo\\AppData\\Local\\ms-playwright\\chromium-1254\\chrome-win64\\chrome.exe';
const PORT=9451,PERFIL=path.join(os.tmpdir(),'moss-cdp-ap-'+Date.now());
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
adaptacoes:document.querySelectorAll('.adaptacao').length,projetos:document.querySelectorAll('#gradeProjetos > .card').length,
checks:document.querySelectorAll('#listaCheck input').length,skip:!!document.querySelector('.skip-link'),
h1:document.querySelectorAll('h1').length,landmarks:document.querySelectorAll('main,header,footer,nav').length})`));
checar(`Layout ${w}px — sem rolagem horizontal`,d.sw<=d.cw+1,`scrollWidth=${d.sw}, clientWidth=${d.cw}`);
checar(`Layout ${w}px — conteúdo renderizado`,d.adaptacoes===6&&d.projetos===3&&d.checks===7&&d.skip&&d.h1===1&&d.landmarks>=4,JSON.stringify(d));}
await c.send('Emulation.setDeviceMetricsOverride',{width:1366,height:900,deviceScaleFactor:1,mobile:false},sessionId);
await c.send('Page.navigate',{url:fileUrl},sessionId);await sleep(400);

// Acessibilidade estrutural
const a11y=await av(`JSON.stringify({
 ariaLabels:document.querySelectorAll('[aria-label]').length,
 ariaLive:document.querySelectorAll('[aria-live]').length,
 progressbar:document.querySelector('#barraCheck').getAttribute('role'),
 rangeLabel:document.getElementById('rangeComparador').getAttribute('aria-label'),
 imgAlts:document.querySelectorAll('svg[role="img"][aria-label]').length,
 focusVisible:(function(){const e=document.getElementById('btnContraste');e.focus();return document.activeElement===e;})()
})`);
const ai=JSON.parse(a11y);
checar('ARIA e foco presentes',ai.ariaLabels>=5&&ai.ariaLive>=4&&ai.progressbar==='progressbar'&&ai.rangeLabel&&ai.imgAlts>=3&&ai.focusVisible,JSON.stringify(ai));

// Controle de alto contraste
const contraste=await av(`(()=>{const b=document.getElementById('btnContraste');b.click();
return JSON.stringify({classe:document.documentElement.classList.contains('contraste-alto'),pressed:b.getAttribute('aria-pressed')});})()`);
const ci=JSON.parse(contraste);
checar('Botão alto contraste funciona',ci.classe&&ci.pressed==='true',JSON.stringify(ci));

// Controle de fonte
const fonte=await av(`(()=>{const b=document.getElementById('btnFonte');b.click();
return getComputedStyle(document.documentElement).getPropertyValue('--escala-fonte').trim();})()`);
checar('Botão A+ altera escala da fonte',fonte==='1.15',`escala=${fonte}`);

// Comparador teclado
const comp=await av(`(()=>{const r=document.getElementById('rangeComparador');r.value='80';r.dispatchEvent(new Event('input'));
return JSON.stringify({pos:document.getElementById('caixaComparador').style.getPropertyValue('--pos'),vt:r.getAttribute('aria-valuetext')});})()`);
const co=JSON.parse(comp);
checar('Comparador funciona e atualiza aria-valuetext',co.pos==='80%'&&/80%/.test(co.vt),JSON.stringify(co));

// Checklist com progressbar
const chk=await av(`(()=>{document.querySelectorAll('#listaCheck input')[0].click();
return JSON.stringify({txt:document.getElementById('textoProgresso').textContent,now:document.getElementById('barraCheck').getAttribute('aria-valuenow')});})()`);
const ch=JSON.parse(chk);
checar('Checklist atualiza progresso e ARIA',/1 de 7/.test(ch.txt)&&Number(ch.now)>0,JSON.stringify(ch));

// Formulário: validação e foco no primeiro inválido
const val=await av(`(()=>{document.getElementById('formOrcamento').dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));
const erros=Array.from(document.querySelectorAll('#formOrcamento .erro')).filter(e=>e.textContent.trim());
return JSON.stringify({erros:erros.length,invalido:document.querySelectorAll('#formOrcamento .invalido').length,
aria:document.getElementById('nome').getAttribute('aria-invalid')});})()`);
const va=JSON.parse(val);
checar('Formulário valida e marca aria-invalid',va.erros===4&&va.invalido===4&&va.aria==='true',JSON.stringify(va));

const ok=await av(`(()=>{document.getElementById('nome').value='Ana';document.getElementById('telefone').value='11999999999';
document.getElementById('tipoEspaco').value='Escola';document.getElementById('necessidades').value='Precisamos de rampa e sinalização';
document.getElementById('formOrcamento').dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));
return document.getElementById('confirmacao').classList.contains('visivel');})()`);
checar('Formulário confirma envio simulado',ok===true,`visivel=${ok}`);

const wa=await av(`document.getElementById('btnMoss').href`);
checar('Botão MOSS aponta ao WhatsApp correto',wa.startsWith('https://wa.me/5511942038103'),`href=${wa.slice(0,80)}`);

// Sem declaração de conformidade
const conf=await av(`(()=>{const t=document.body.innerText.toLowerCase();return t.includes('não declara conformidade');})()`);
checar('Sem declaração de conformidade legal',conf===true,`presente=${conf}`);



// Fotografias licenciadas (6 por demo) — carregamento real
await av(`document.getElementById('fotografias').scrollIntoView()`);
await new Promise(function(r){setTimeout(r,600)});
const fotos=await av(`JSON.stringify(Array.from(document.querySelectorAll('#fotografias img')).map(i=>({
 ok:i.complete&&i.naturalWidth>0, alt:i.alt.length>5, local:i.getAttribute('src').startsWith('img/fotos/')})))`);
const fo=JSON.parse(fotos);
checar('6 fotografias licenciadas carregam',fo.length===6&&fo.every(x=>x.ok&&x.alt&&x.local),JSON.stringify(fo.map(x=>x.ok)));

console.log('\n===== RELATÓRIO DE TESTES — ACESSO PRIME =====\n');
resultados.forEach(r=>console.log((r.ok?'PASS ':'FAIL ')+r.nome+(r.detalhe?'  ['+r.detalhe+']':'')));
const falhas=resultados.filter(r=>!r.ok).length;
console.log('\nErros de console/JS capturados: '+erros.length);erros.slice(0,12).forEach(e=>console.log('  ! '+e));
console.log(`\nTotal: ${resultados.length} verificações, ${falhas} falhas, ${erros.length} erros de console.`);
process.exitCode=(falhas===0&&erros.length===0)?0:1;
}catch(e){console.error('ERRO NO HARNESS:',e);process.exitCode=1;}
finally{chrome.kill('SIGKILL');try{fs.rmSync(PERFIL,{recursive:true,force:true});}catch{}}})();
