/* HARNESS CDP — RESTAURA PRIME. Uso: node cdp-smoke.js */
const { spawn } = require('child_process');
const os = require('os'), path = require('path'), fs = require('fs');
const CHROME = 'C:\\Users\\Sylvia Camillo\\AppData\\Local\\ms-playwright\\chromium-1254\\chrome-win64\\chrome.exe';
const PORT = 9351, PERFIL = path.join(os.tmpdir(), 'moss-cdp-rp-' + Date.now());
const HTML = path.join(__dirname, '..', 'index.html');
const fileUrl = 'file:///' + HTML.replace(/\\/g, '/').replace(/ /g, '%20');
const sleep = ms => new Promise(r => setTimeout(r, ms));
class CDP { constructor(ws,ev){this.ws=ws;this.id=0;this.p=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);
  if(m.id&&this.p.has(m.id)){const x=this.p.get(m.id);this.p.delete(m.id);m.error?x.rej(m.error):x.res(m.result);}else if(ev)ev(m);};}
  send(method,params={},sessionId){const id=++this.id,msg={id,method,params};if(sessionId)msg.sessionId=sessionId;
    return new Promise((res,rej)=>{this.p.set(id,{res,rej});this.ws.send(JSON.stringify(msg));});}}
(async()=>{
  const chrome=spawn(CHROME,['--headless=new','--disable-gpu','--no-sandbox','--hide-scrollbars',
    '--remote-debugging-port='+PORT,'--user-data-dir='+PERFIL,'about:blank'],{stdio:'ignore'});
  try{
    let ver;for(let i=0;i<60;i++){try{ver=await(await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();break;}catch{await sleep(150);}}
    if(!ver) throw new Error('Chromium não iniciou');
    const erros=[];const ws=new WebSocket(ver.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
    const c=new CDP(ws,m=>{
      if(m.method==='Runtime.exceptionThrown')erros.push('EXCEPTION: '+(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text));
      if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')erros.push('CONSOLE: '+m.params.args.map(a=>a.value||a.description).join(' '));
    });
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
        servicos:document.querySelectorAll('.servico').length,projetos:document.querySelectorAll('.projeto').length,
        abas:document.querySelectorAll('.aba').length,
        antes:document.querySelector('#camadaAntes svg')!==null,depois:document.querySelector('#camadaDepois svg')!==null})`));
      checar(`Layout ${w}px — sem rolagem horizontal`,d.sw<=d.cw+1,`scrollWidth=${d.sw}, clientWidth=${d.cw}`);
      checar(`Layout ${w}px — conteúdo renderizado`,d.servicos===6&&d.projetos===3&&d.abas===3&&d.antes&&d.depois,
        `serviços=${d.servicos}, projetos=${d.projetos}, abas=${d.abas}`);
    }
    await c.send('Emulation.setDeviceMetricsOverride',{width:1366,height:900,deviceScaleFactor:1,mobile:false},sessionId);
    await c.send('Page.navigate',{url:fileUrl},sessionId);await sleep(400);

    // Comparador: troca de peça e movimento do slider
    const comp=await av(`(()=>{const abas=document.querySelectorAll('.aba');abas[2].click();
      const r=document.getElementById('rangeComparador');r.value='75';r.dispatchEvent(new Event('input'));
      const caixa=document.getElementById('caixaComparador');
      return JSON.stringify({pos:caixa.style.getPropertyValue('--pos'),abaAtiva:abas[2].getAttribute('aria-pressed'),
        legenda:document.getElementById('legendaComparador').textContent});})()`);
    const ci=JSON.parse(comp);
    checar('Comparador troca peça e move controle',ci.pos==='75%'&&ci.abaAtiva==='true'&&ci.legenda.length>10,JSON.stringify(ci));

    // Acompanhamento de ordem
    const ordem=await av(`(()=>{document.getElementById('codigoOrdem').value='rs-1024';
      document.getElementById('buscarOrdem').click();
      return JSON.stringify({html:document.getElementById('resultadoOrdem').textContent,
        passos:document.querySelectorAll('#resultadoOrdem .passos li').length});})()`);
    const oi=JSON.parse(ordem);
    checar('Busca de ordem fictícia funciona',/Cadeira Estilo/.test(oi.html)&&oi.passos===6,JSON.stringify(oi).slice(0,120));

    const ordemErro=await av(`(()=>{document.getElementById('codigoOrdem').value='XXX-000';
      document.getElementById('buscarOrdem').click();return document.getElementById('erroOrdem').textContent;})()`);
    checar('Ordem inexistente exibe erro',/não encontrado/i.test(ordemErro),`erro=${ordemErro.slice(0,50)}`);

    // Formulário: validação e confirmação
    const vazio=await av(`(()=>{document.getElementById('formOrcamento').dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));
      return Array.from(document.querySelectorAll('#formOrcamento .erro')).filter(e=>e.textContent.trim()).length;})()`);
    checar('Formulário valida campos',vazio===4,`erros=${vazio}`);

    const ok=await av(`(()=>{document.getElementById('nome').value='João';document.getElementById('contato').value='11999999999';
      document.getElementById('tipoMovel').value='Cadeira';document.getElementById('danos').value='Pernas soltas e verniz desgastado';
      document.getElementById('formOrcamento').dispatchEvent(new Event('submit',{cancelable:true,bubbles:true}));
      return document.getElementById('confirmacao').classList.contains('visivel');})()`);
    checar('Formulário confirma envio simulado',ok===true,`visivel=${ok}`);

    const wa=await av(`document.getElementById('btnMoss').href`);
    checar('Botão MOSS aponta ao WhatsApp correto',wa.startsWith('https://wa.me/5511942038103'),`href=${wa.slice(0,80)}`);

    

// Fotografias licenciadas (6 por demo) — carregamento real
await av(`document.getElementById('fotografias').scrollIntoView()`);
await new Promise(function(r){setTimeout(r,600)});
const fotos=await av(`JSON.stringify(Array.from(document.querySelectorAll('#fotografias img')).map(i=>({
 ok:i.complete&&i.naturalWidth>0, alt:i.alt.length>5, local:i.getAttribute('src').startsWith('img/fotos/')})))`);
const fo=JSON.parse(fotos);
checar('6 fotografias licenciadas carregam',fo.length===6&&fo.every(x=>x.ok&&x.alt&&x.local),JSON.stringify(fo.map(x=>x.ok)));

console.log('\n===== RELATÓRIO DE TESTES — RESTAURA PRIME =====\n');
    resultados.forEach(r=>console.log((r.ok?'PASS ':'FAIL ')+r.nome+(r.detalhe?'  ['+r.detalhe+']':'')));
    const falhas=resultados.filter(r=>!r.ok).length;
    console.log('\nErros de console/JS capturados: '+erros.length);erros.slice(0,12).forEach(e=>console.log('  ! '+e));
    console.log(`\nTotal: ${resultados.length} verificações, ${falhas} falhas, ${erros.length} erros de console.`);
    process.exitCode=(falhas===0&&erros.length===0)?0:1;
  }catch(e){console.error('ERRO NO HARNESS:',e);process.exitCode=1;}
  finally{chrome.kill('SIGKILL');try{fs.rmSync(PERFIL,{recursive:true,force:true});}catch{}}
})();
