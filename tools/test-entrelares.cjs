/* Eu testo as duas jornadas sem enviar mensagens reais ou documentos. */
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {spawn}=require('child_process'),{pathToFileURL}=require('url');
const repo=path.resolve(__dirname,'..'),base=path.join(repo,'demos','entrelares');
const temp=path.join(process.env.LOCALAPPDATA,'Temp','opencode');
const output=path.resolve(repo,'..','EntreLares - Apresentacao e Instagram');fs.mkdirSync(output,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const profile=fs.mkdtempSync(path.join(temp,'entrelares-test-'));
  const exe=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
  const edge=spawn(exe,['--headless=new','--disable-gpu','--no-first-run','--hide-scrollbars','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore'});
  let ws;
  try{
    const pf=path.join(profile,'DevToolsActivePort');for(let n=0;n<100&&!fs.existsSync(pf);n++)await sleep(100);
    const port=fs.readFileSync(pf,'utf8').split('\n')[0],pages=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});
    const pending=new Map(),errors=[];let serial=0;
    ws.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);};
    const cmd=(method,params={})=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
    const js=async expression=>{const r=await cmd('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
    const size=(width,height=1000)=>cmd('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<720});
    const load=async(page='index.html')=>{await cmd('Page.navigate',{url:pathToFileURL(path.join(base,page)).href});await sleep(700);await js(`document.readyState==='complete'?true:new Promise(r=>window.addEventListener('load',()=>r(true),{once:true}))`);};
    const click=s=>js(`(()=>{const el=document.querySelector(${JSON.stringify(s)});if(!el||el.disabled)throw Error('Controle ausente/desabilitado: '+${JSON.stringify(s)});el.click();return true;})()`);
    const set=(s,value,event='input')=>js(`(()=>{const el=document.querySelector(${JSON.stringify(s)});if(!el)throw Error('Campo ausente');el.value=${JSON.stringify(String(value))};el.dispatchEvent(new Event(${JSON.stringify(event)},{bubbles:true}));return true;})()`);
    const text=s=>js(`document.querySelector(${JSON.stringify(s)}).textContent`);
    const capture=async name=>{await js(`document.querySelector('#status')?.replaceChildren()`);await sleep(200);const r=await cmd('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(output,name+'.png'),Buffer.from(r.data,'base64'));};
    const next=p=>click(`[data-action="next"][data-wizard="${p}"]`);
    const checks=[];
    await cmd('Runtime.enable');await cmd('Page.enable');await size(1440,1050);await load();
    assert.equal(await js(`document.querySelectorAll('#services .service').length`),6);
    assert.equal(await js(`document.querySelectorAll('input[type=file]').length`),0);
    assert.equal(await js(`document.querySelector('#h-enabled').disabled`),false);
    await capture('01 - Site EntreLares');
    await set('#service-search','recepcao');assert.equal(await js(`document.querySelectorAll('#services .service:not([hidden])').length`),1);
    await set('#service-search','zzzz-inexistente');assert.equal(await js(`document.querySelector('#empty-services').hidden`),false);await click('#reset-search');await sleep(40);
    await set('#service-sector','Pequenos negócios','change');assert.equal(await js(`document.querySelectorAll('#services .service:not([hidden])').length`),2);
    await js(`document.querySelector('#service-filters').reset()`);await sleep(40);checks.push('busca sem acentos, filtros e estado vazio');
    await next('h');assert.ok((await text('#h-error')).length>0);assert.equal(await js('document.activeElement.id'),'h-sector');
    await click('[data-select="recepcao"]');assert.equal(await js(`document.querySelector('#h-sector').value`),'Pequenos negócios');assert.equal(await js(`document.querySelector('#h-service').value`),'recepcao');
    await set('#h-frequency','A definir com a agência','change');await set('#h-period','Manhã','change');await next('h');
    await next('h');assert.equal(await js('document.activeElement.id'),'h-name');
    await set('#h-name','<b>Cliente teste</b>');await set('#h-city','Cidade exemplo');await set('#h-details','Exemplo: <script>window.__xss=1</script>');await next('h');
    assert.match(await text('#h-summary'),/<b>Cliente teste<\/b>/);assert.equal(await js(`document.querySelector('#h-summary b')`),null);assert.equal(await js(`window.__xss||null`),null);
    await js(`window.__opens=[];window.open=(...args)=>{window.__opens.push(args);return null;};const original=URL.createObjectURL;URL.createObjectURL=blob=>{window.__blob=blob;return original(blob)};HTMLAnchorElement.prototype.click=function(){window.__download=this.download};window.__prints=0;window.print=()=>window.__prints++;`);
    await click('[data-action="contact"][data-wizard="h"]');assert.equal(await js('window.__opens.length'),0);assert.equal(await js('document.activeElement.id'),'h-ack');
    await js(`document.querySelector('#h-ack').click()`);await click('[data-action="contact"][data-wizard="h"]');
    const opened=await js('window.__opens[0][0]');assert.match(opened,/https:\/\/wa.me\/5511942038103/);assert.match(decodeURIComponent(opened),/Não é uma candidatura nem solicitação real/);
    await click('[data-action="download"][data-wizard="h"]');assert.match(await js('window.__blob.text()'),/Não é cadastro/);assert.ok((await js('window.__blob.text()')).includes('\n'));
    await click('[data-action="print"][data-wizard="h"]');assert.equal(await js('window.__prints'),1);checks.push('contratante: validação por etapa, resumo seguro e contato identificado');
    await click('[data-action="back"][data-wizard="h"]');await set('#h-city','Outra cidade exemplo');assert.equal(await js(`document.querySelector('#h-ack').checked`),false);await next('h');assert.match(await text('#h-summary'),/Outra cidade exemplo/);
    await click('[data-action="example"][data-wizard="h"]');assert.equal(await js(`document.querySelector('#h-employment').hidden`),false);await next('h');await next('h');await capture('02 - Resumo de necessidade');checks.push('revisão após edição e aviso de frequência doméstica');
    await click('[data-action="example"][data-wizard="c"]');await set('#c-sector','Pequenos negócios','change');await next('c');assert.equal(await js('document.activeElement.id'),'c-sector');
    await set('#c-sector','Residências','change');await next('c');await js(`document.querySelector('#c-adult').click()`);await next('c');assert.equal(await js('document.activeElement.id'),'c-adult');
    await js(`document.querySelector('#c-adult').click()`);await next('c');await capture('03 - Apresentacao profissional');await click('[data-action="contact"][data-wizard="c"]');assert.equal(await js('window.__opens.length'),1);
    await js(`document.querySelector('#c-ack').click()`);await click('[data-action="contact"][data-wizard="c"]');assert.equal(await js('window.__opens.length'),2);checks.push('profissional: compatibilidade de área, declaração de público e revisão');
    const candidateName=await js(`document.querySelector('#c-name').value`);
    await click('[data-action="reset"][data-wizard="h"]');await click('#reset-cancel');assert.equal(await js(`document.querySelector('#h-name').value`),'Cliente exemplo');
    await click('[data-action="reset"][data-wizard="h"]');await click('#reset-confirm');assert.equal(await js(`document.querySelector('#h-name').value`),'');assert.equal(await js(`document.querySelector('#c-name').value`),candidateName);assert.equal(await js(`document.querySelector('#c-form [data-step="3"]').hidden`),false);checks.push('limpeza independente com confirmação');
    await js(`Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(Error('Teste sem permissão'))}})`);await click('[data-action="copy"][data-wizard="c"]');await sleep(100);assert.equal(await js('window.__download'),'entrelares-resumo-demo.txt');checks.push('alternativa TXT para cópia bloqueada');
    assert.equal(await js('localStorage.length'),0);assert.equal(await js('sessionStorage.length'),0);checks.push('sem armazenamento persistente pelo aplicativo');
    for(const width of [390,320]){
      await size(width,844);await js(`window.scrollTo({top:0,behavior:'instant'})`);await sleep(100);
      let m=await js(`({width:innerWidth,scroll:document.documentElement.scrollWidth})`);assert.ok(m.scroll<=m.width,'página transbordou em '+width);
      await click('[data-action="example"][data-wizard="h"]');await next('h');await next('h');m=await js(`({width:innerWidth,scroll:document.documentElement.scrollWidth})`);assert.ok(m.scroll<=m.width,'resumo transbordou em '+width);
      if(width===390){await capture('04 - Formulario no celular');await js(`window.scrollTo({top:0,behavior:'instant'})`);await sleep(100);await capture('05 - Site no celular');await click('#menu-toggle');assert.equal(await js(`document.querySelector('#menu-toggle').getAttribute('aria-expanded')`),'true');await cmd('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});assert.equal(await js(`document.querySelector('#menu-toggle').getAttribute('aria-expanded')`),'false');}
    }
    checks.push('layout, revisão e menu em 320/390 px');
    for(const page of ['privacidade.html','termos.html','implantacao.html']){await load(page);assert.equal(await js(`document.querySelectorAll('h1').length`),1);assert.equal(await js(`document.documentElement.scrollWidth<=innerWidth`),true);}
    checks.push('privacidade, termos e guia em HTML');
    await cmd('Emulation.setScriptExecutionDisabled',{value:true});await load();assert.equal(await js(`document.querySelector('#h-enabled').disabled`),true);assert.equal(await js(`document.querySelector('#c-enabled').disabled`),true);assert.equal(await js(`document.querySelectorAll('#services .service').length`),6);checks.push('catálogo legível e formulários bloqueados sem JavaScript');
    await cmd('Emulation.setScriptExecutionDisabled',{value:false});assert.equal(errors.length,0,JSON.stringify(errors));
    const report={at:new Date().toISOString(),runtimeErrors:0,checks};fs.writeFileSync(path.join(base,'TESTES-NAVEGADOR.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
    await cmd('Browser.close');
  }finally{if(ws)ws.close();edge.kill();await sleep(400);try{fs.rmSync(profile,{recursive:true,force:true,maxRetries:3,retryDelay:200});}catch(error){console.warn('Perfil temporário em uso: '+profile);}}
})().catch(error=>{console.error(error);process.exit(1)});
