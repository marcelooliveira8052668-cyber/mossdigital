/* Eu verifico o fluxo do restaurante no Edge, sem bibliotecas ou serviços pagos. */
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {spawn}=require('child_process'),{pathToFileURL}=require('url');
const base=__dirname,temp=path.join(process.env.LOCALAPPDATA,'Temp','opencode');
const out=path.resolve(base,'..','..','Restaurante 360 - Apresentacao e Capas');fs.mkdirSync(out,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const profile=fs.mkdtempSync(path.join(temp,'restaurant-test-'));
  const edgePath=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
  const edge=spawn(edgePath,['--headless=new','--disable-gpu','--no-first-run','--hide-scrollbars','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore'});
  let ws;
  try{
    const pf=path.join(profile,'DevToolsActivePort');for(let i=0;i<100&&!fs.existsSync(pf);i++)await sleep(100);
    const port=fs.readFileSync(pf,'utf8').split('\n')[0],pages=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j});
    let serial=0;const pending=new Map(),errors=[];
    ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);};
    const cmd=(method,params={})=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
    const js=async expression=>{const r=await cmd('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
    const size=(width,height=1000)=>cmd('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<700});
    const load=async page=>{await cmd('Page.navigate',{url:pathToFileURL(path.join(base,page)).href});await sleep(700);await js(`document.readyState==='complete'?true:new Promise(r=>window.addEventListener('load',()=>r(true),{once:true}))`);};
    const click=selector=>js(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});if(!el)throw Error('Elemento ausente: '+${JSON.stringify(selector)});if(el.disabled)throw Error('Botão desabilitado: '+${JSON.stringify(selector)});el.click();return true})()`);
    const set=(selector,value,event='input')=>js(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});if(!el)throw Error('Campo ausente');el.value=${JSON.stringify(String(value))};el.dispatchEvent(new Event(${JSON.stringify(event)},{bubbles:true}));return true})()`);
    const submit=selector=>js(`(()=>{let form=document.querySelector(${JSON.stringify(selector)});if(!form.checkValidity())throw Error('Formulário inválido: '+[...form.elements].filter(e=>e.validity&&!e.validity.valid).map(e=>e.name).join(','));form.requestSubmit();return true})()`);
    const text=selector=>js(`document.querySelector(${JSON.stringify(selector)}).textContent`);
    const screenshot=async name=>{await js(`document.querySelector('#toast')?.replaceChildren()`);const shot=await cmd('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(out,name+'.png'),Buffer.from(shot.data,'base64'));};
    const go=view=>click(`[data-ui="go"][data-view="${view}"]`);
    await cmd('Runtime.enable');await cmd('Page.enable');await size(1440,1100);await load('index.html');
    await screenshot('01 - Vitrine do restaurante');await click('[data-filter="Bebidas"]');assert.equal(await js(`document.querySelectorAll('[data-category]:not([hidden])').length`),4);
    await size(390,844);await load('index.html');assert.equal(await js('document.documentElement.scrollWidth'),390);await screenshot('02 - Vitrine no celular');await click('#public-toggle');assert.equal(await js(`document.querySelector('#public-toggle').getAttribute('aria-expanded')`),'true');
    await size(1440,1000);await load('painel.html');await click('[data-ui="close"]');
    assert.equal(await js(`localStorage.getItem('moss-restaurante360-v1')`),null);
    await go('salao');await click('[data-ui="table"][data-id="1"]');await set('#f-alias','Grupo UI fictício');await set('#f-guests','2');await submit('form[data-action="open"]');
    const account=await js(`document.querySelector('form[data-action="add"] input[name="id"]').value`);
    await submit('form[data-action="add"]');
    await set('#item-kind','buffet','change');await set('#f-gross',620);await set('#f-tare',200);assert.match(await text('#weight-preview'),/420 g/);await submit('form[data-action="add"]');
    await set('#item-kind','rodizio','change');await submit('form[data-action="add"]');assert.match(await text('#dialog-body'),/230,06/);
    await click('[data-cmd="send"]');assert.equal(await text('#dialog-error'),'');await click('#dialog-close');
    await go('producao');
    for(let n=0;n<8;n++){
      const selector=await js(`(()=>{const ticket=[...document.querySelectorAll('.ticket')].find(t=>t.querySelector('header').textContent.includes('Mesa 01')||t.querySelector('header').textContent.includes('Mesa 1'));return ticket?ticket.querySelector('[data-cmd]').dataset.line:null})()`);
      if(!selector)break;await click(`.ticket [data-line="${selector}"]`);
    }
    assert.equal(await js(`document.querySelectorAll('.ticket [data-id="${account}"]').length`),0);
    await go('caixa');await set('#cash-account',account,'change');await click('[data-cmd="bill"]');assert.match(await text('#main'),/253,07/);
    await set('#split-people',3);assert.match(await text('#split-preview'),/84,35/);assert.match(await text('#split-preview'),/84,37/);
    await submit('form[data-action="pay"]');assert.match(await text('#main'),/168,72/);await submit('form[data-action="pay"]');
    await click('[data-cmd="close"]');await go('salao');assert.equal(await js(`document.querySelector('[data-ui="table"][data-id="1"]').classList.contains('occupied')`),false);
    await go('reservas');await click('[data-ui="reservation"]');await submit('form[data-action="reservation"]');assert.match(await text('#main'),/Reserva exemplo/);
    await click('[data-ui="wait"]');await submit('form[data-action="wait"]');assert.match(await text('#main'),/Grupo em espera/);
    await go('delivery');await click('[data-ui="newDelivery"]');await submit('form[data-action="newDelivery"]');assert.match(await text('#dialog-title'),/Delivery/);await click('#dialog-close');
    await go('estoque');await click('[data-ui="stock"]');await set('#f-ingredient','agua','change');await set('#f-qty',5);await set('#f-reason','Compra fictícia');await submit('form[data-action="stock"]');assert.match(await text('#main'),/Compra fictícia/);
    await go('relatorios');assert.match(await text('#main'),/253,07/);await set('#report-date','2020-01-01','change');assert.match(await text('.metrics'),/R\$\s*0,00/);
    await set('#profile','cozinha','change');assert.equal(await js(`document.querySelectorAll('#navigation button').length`),1);assert.match(await text('#main'),/Cozinha no ritmo/);
    await set('#profile','gerente','change');await go('config');await click('[data-ui="storage"]');await click('[data-ui="enable"]');assert.ok(await js(`localStorage.getItem('moss-restaurante360-v1')`));
    await cmd('Page.reload');await sleep(600);assert.equal(await js(`document.querySelector('#dialog').open`),false);
    await go('config');await click('[data-ui="reset"]');await set('#f-confirmation','REINICIAR');await submit('form[data-action="ui-reset"]');
    await screenshot('03 - Painel da operacao');
    await go('salao');await screenshot('04 - Salao e comandas');await go('producao');await screenshot('05 - Cozinha e bar');
    await go('config');await click('[data-ui="storage"]');assert.equal(await js(`localStorage.getItem('moss-restaurante360-v1')`),null);
    for(const view of ['dashboard','salao','producao','caixa','reservas','delivery','estoque','cardapio','relatorios','equipe','config']){
      await go(view);
      for(const width of [390,320]){await size(width,844);const metrics=await js(`({width:innerWidth,scroll:document.documentElement.scrollWidth})`);assert.ok(metrics.scroll<=metrics.width,view+' transbordou em '+width);}
      await size(1440,1000);
    }
    await go('dashboard');await size(390,844);await screenshot('06 - Painel no celular');await click('#mobile-menu');assert.equal(await js(`document.querySelector('#mobile-menu').getAttribute('aria-expanded')`),'true');await cmd('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});assert.equal(await js(`document.querySelector('#mobile-menu').getAttribute('aria-expanded')`),'false');
    await load('privacidade.html');assert.equal(await js(`document.querySelectorAll('h1').length`),1);
    assert.equal(errors.length,0,JSON.stringify(errors));
    const report={at:new Date().toISOString(),runtimeErrors:errors.length,flow:'Mesa mista → produção → recebimentos parciais → encerramento',checks:['vitrine e filtro','mesa mista e cálculo em gramas','produção por estação','divisão em centavos','recebimento parcial','liberação de mesa','reservas e espera','delivery','estoque','relatórios por data','perfis','persistência opcional e exclusão','11 módulos em 320 e 390 px','privacidade']};
    fs.writeFileSync(path.join(base,'TESTES-NAVEGADOR.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
    await cmd('Browser.close');
  }finally{if(ws)ws.close();edge.kill();await sleep(400);try{fs.rmSync(profile,{recursive:true,force:true,maxRetries:3,retryDelay:200});}catch(e){console.warn('Perfil temporário em uso: '+profile);}}
})().catch(e=>{console.error(e);process.exit(1)});
