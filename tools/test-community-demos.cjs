/* Eu valido a coleção em um navegador real, incluindo filtros, cálculos e celular. */
const fs=require('fs');
const path=require('path');
const {spawn,spawnSync}=require('child_process');
const {pathToFileURL}=require('url');
const assert=require('assert/strict');
const repo=path.resolve(__dirname,'..');
const temp=path.join(process.env.LOCALAPPDATA,'Temp','opencode');
const output=path.join(repo,'..','Capas Instagram - Utilidade e Empreendedorismo','Previas dos sites');
fs.mkdirSync(output,{recursive:true});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const ids=['reciclo','junto','raizfeira','pontocomum','acessoaberto'];
(async()=>{
  const edgePath=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
  const profile=fs.mkdtempSync(path.join(temp,'community-test-'));
  const edge=spawn(edgePath,['--headless=new','--disable-gpu','--no-first-run','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{stdio:'ignore'});
  let ws;let cmd;
  try{
    const portFile=path.join(profile,'DevToolsActivePort');
    for(let n=0;n<100&&!fs.existsSync(portFile);n++)await sleep(100);
    const port=fs.readFileSync(portFile,'utf8').split('\n')[0];
    const pages=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
    await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
    const pending=new Map();let id=0;const runtimeErrors=[];
    ws.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}else if(m.method==='Runtime.exceptionThrown')runtimeErrors.push(m.params.exceptionDetails)};
    cmd=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}))});
    const evaluate=async expression=>{const result=await cmd('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails));return result.result.value;};
    const size=async(width,height=1000)=>cmd('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<700});
    const capture=async name=>{const shot=await cmd('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(output,name+'.png'),Buffer.from(shot.data,'base64'))};
    const reports=[];
    await cmd('Page.enable');await cmd('Runtime.enable');
    for(const preset of ids){
      const base=path.join(repo,'demos',preset);
      const source=fs.readFileSync(path.join(base,'index.html'),'utf8');
      assert.equal((source.match(/<!--/g)||[]).length,(source.match(/-->/g)||[]).length,preset+' comentários');
      for(const name of ['app.js','data.js'])assert.equal(spawnSync(process.execPath,['--check',path.join(base,'assets',name)]).status,0,preset+' sintaxe');
      await size(1280,1000);
      await cmd('Page.navigate',{url:pathToFileURL(path.join(base,'index.html')).href});await sleep(800);
      await evaluate(`document.readyState==='complete'?true:new Promise(resolve=>window.addEventListener('load',()=>resolve(true),{once:true}))`);
      const initial=await evaluate(`({cards:document.querySelectorAll('#catalog .card').length,images:[...document.images].filter(i=>i.complete&&!i.naturalWidth).length,width:innerWidth,scroll:document.documentElement.scrollWidth})`);
      if(initial.cards!==6)fs.writeFileSync(path.join(temp,'community-dom-debug.html'),await evaluate('document.documentElement.outerHTML'));
      assert.equal(initial.cards,6);assert.equal(initial.images,0);assert.ok(initial.scroll<=initial.width,preset+' desktop');
      await capture(preset+'-desktop');
      await evaluate(`document.querySelector('#search').value='zzzzzz-inexistente';document.querySelector('#search').dispatchEvent(new Event('input',{bubbles:true}))`);
      assert.equal(await evaluate(`document.querySelectorAll('#catalog .card:not([hidden])').length`),0);
      assert.equal(await evaluate(`document.querySelector('#empty-results').hidden`),false);
      await evaluate(`document.querySelector('#reset-empty').click()`);await sleep(50);
      assert.equal(await evaluate(`document.querySelectorAll('#catalog .card:not([hidden])').length`),6);
      /* Eu intercepto saídas apenas no teste para não abrir WhatsApp nem gerar impressões. */
      await evaluate(`window.__opens=[];window.open=(...args)=>{window.__opens.push(args);return null};const originalBlobURL=URL.createObjectURL;URL.createObjectURL=blob=>{window.__downloadBlob=blob;return originalBlobURL(blob)};HTMLAnchorElement.prototype.click=function(){window.__downloadName=this.download};`);
      if(preset==='reciclo'){
        await evaluate(`document.querySelector('[data-add="r1"]').click();document.querySelector('#material').value='Vidro';document.querySelector('#weight').value='5.5';document.querySelector('#recycle-form').requestSubmit()`);
        assert.equal(await evaluate(`document.querySelectorAll('#catalog .card:not([hidden])').length`),2);
        assert.match(await evaluate(`document.querySelector('#estimate').textContent`),/5,5 kg/);
        assert.equal(await evaluate(`document.querySelectorAll('#selected-list li').length`),1);
        await evaluate(`document.querySelector('#filters').reset()`);await sleep(30);
        await evaluate(`document.querySelector('#search').value='eletronicos';document.querySelector('#search').dispatchEvent(new Event('input',{bubbles:true}))`);
        assert.equal(await evaluate(`document.querySelectorAll('#catalog .card:not([hidden])').length`),1,'busca sem acentos');
      }
      if(preset==='junto'){
        await evaluate(`document.querySelector('[data-add="j1"]').click();document.querySelector('[data-add="j2"]').click()`);
        assert.match(await evaluate(`document.querySelector('#time-total').textContent`),/3 h/);
        await evaluate(`document.querySelector('[data-add="j1"]').click()`);
        assert.match(await evaluate(`document.querySelector('#time-total').textContent`),/2 h/);
      }
      if(preset==='raizfeira'){
        assert.equal(await evaluate(`document.querySelector('#order-market').disabled`),true);
        await evaluate(`document.querySelector('[data-add="f1"]').click();for(let i=0;i<20;i++)document.querySelector('[data-add="f2"]').click()`);
        assert.equal(await evaluate(`document.querySelector('[data-add="f2"]').disabled`),true);
        assert.match(await evaluate(`document.querySelector('#cart-total').textContent`),/152,00/);
        await evaluate(`document.querySelector('#order-market').click()`);
        const url=await evaluate(`window.__opens[0][0]`);
        assert.match(url,/wa\.me\/5511942038103/);assert.match(decodeURIComponent(url),/Não é um pedido real/);
        assert.equal(await evaluate(`document.querySelectorAll('#selected-list li').length`),2);
      }
      if(preset==='pontocomum'){
        const date=new Date();date.setDate(date.getDate()+2);while(date.getDay()===0)date.setDate(date.getDate()+1);
        const localDate=date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
        await evaluate(`document.querySelector('#space').value='p2';document.querySelector('#booking-date').value='${localDate}';document.querySelector('#booking-time').value='18';document.querySelector('#duration').value='2';document.querySelector('#people').value='4';document.querySelector('#booking-form').requestSubmit()`);
        assert.match(await evaluate(`document.querySelector('#booking-error').textContent`),/19h/);
        await evaluate(`document.querySelector('#booking-time').value='9';document.querySelector('#people').value='5';document.querySelector('#booking-form').requestSubmit()`);
        assert.match(await evaluate(`document.querySelector('#booking-error').textContent`),/4 pessoa/);
        await evaluate(`document.querySelector('#people').value='4';document.querySelector('#booking-form').requestSubmit()`);
        assert.match(await evaluate(`document.querySelector('#booking-result').textContent`),/130,00/);
        await evaluate(`document.querySelector('#download-ics').click()`);
        const ics=await evaluate(`window.__downloadBlob.text()`);
        assert.match(ics,/BEGIN:VCALENDAR\r\n/);assert.match(ics,/STATUS:TENTATIVE/);assert.match(ics,/DTSTART:\d{8}T090000/);
        await evaluate(`document.querySelector('#people').dispatchEvent(new Event('input',{bubbles:true}))`);
        assert.equal(await evaluate(`document.querySelector('#download-ics').disabled`),true);
      }
      if(preset==='acessoaberto'){
        await evaluate(`document.querySelector('#feature').value='Elevador';document.querySelector('#feature').dispatchEvent(new Event('change',{bubbles:true}))`);
        assert.equal(await evaluate(`document.querySelectorAll('#catalog .card:not([hidden])').length`),2);
        await evaluate(`document.querySelector('[data-add="a1"]').click();document.querySelector('#filters').reset()`);await sleep(30);
        await evaluate(`document.querySelector('[data-add="a2"]').click()`);
        assert.equal(await evaluate(`document.querySelectorAll('#selected-list li').length`),2);
      }
      await evaluate(`document.querySelector('#download-plan').click()`);
      const plan=await evaluate(`window.__downloadBlob.text()`);
      assert.match(plan,/PLANO DE DEMONSTRAÇÃO/);assert.ok(plan.includes('\n'),'resumo precisa de linhas reais');
      await evaluate(`document.querySelector('#contact-name').value='<teste>';document.querySelector('#contact-message').value='Quero um projeto assim.';document.querySelector('#contact-consent').checked=true;document.querySelector('#contact-form').requestSubmit()`);
      assert.match(decodeURIComponent(await evaluate(`window.__opens.at(-1)[0]`)),/<teste>/);
      await evaluate(`document.querySelector('#clear-plan').click();document.querySelector('#filters').reset()`);await sleep(40);
      if(preset==='raizfeira')assert.equal(await evaluate(`document.querySelector('#order-market').disabled`),true);
      for(const width of [390,320]){
        await size(width,844);await evaluate(`window.scrollTo(0,0)`);await sleep(100);
        const metrics=await evaluate(`({width:innerWidth,scroll:document.documentElement.scrollWidth})`);
        assert.equal(metrics.width,metrics.scroll,preset+' transborda em '+width);
        if(width===390){
          await evaluate(`document.querySelector('#menu-toggle').click()`);
          assert.equal(await evaluate(`document.querySelector('#menu-toggle').getAttribute('aria-expanded')`),'true');
          await cmd('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});
          assert.equal(await evaluate(`document.querySelector('#menu-toggle').getAttribute('aria-expanded')`),'false');
          await evaluate(`document.querySelector('#status').textContent=''`);
          await capture(preset+'-celular');
        }
      }
      for(const page of ['privacidade.html','termos.html']){
        await cmd('Page.navigate',{url:pathToFileURL(path.join(base,page)).href});await sleep(100);
        assert.ok(await evaluate(`document.querySelector('h1').textContent.length>0`));
      }
      reports.push({id:preset,catalog:6,filters:'OK',tool:'OK',download:'OK',mobile:[390,320],policies:'OK'});
      console.log(preset+': catálogo, filtros, ferramenta, download, políticas e celular OK');
    }
    await size(1280,1000);
    await cmd('Page.navigate',{url:pathToFileURL(path.join(repo,'modelos.html')).href});await sleep(600);
    await evaluate(`document.readyState==='complete'?true:new Promise(resolve=>window.addEventListener('load',()=>resolve(true),{once:true}))`);
    await evaluate(`document.querySelector('[data-filter="Utilidade pública"]').click()`);
    assert.equal(await evaluate(`document.querySelectorAll('#cards .card:not([hidden])').length`),3,'categoria pública');
    await evaluate(`document.querySelector('[data-filter="Empreendedorismo"]').click()`);
    assert.equal(await evaluate(`document.querySelectorAll('#cards .card:not([hidden])').length`),2,'categoria empreendedora');
    assert.equal(runtimeErrors.length,0,JSON.stringify(runtimeErrors));
    const report={timestamp:new Date().toISOString(),runtimeErrors:0,results:reports};
    fs.writeFileSync(path.join(temp,'community-validation.json'),JSON.stringify(report,null,2));
    fs.mkdirSync(path.join(repo,'docs','testes'),{recursive:true});
    fs.writeFileSync(path.join(repo,'docs','testes','community-demos.json'),JSON.stringify(report,null,2));
    console.log('5 demos aprovadas. Nenhuma mensagem real foi enviada.');
    await cmd('Browser.close');
  }finally{
    if(ws)ws.close();edge.kill();await sleep(400);
    /* Eu limpo apenas o perfil temporário criado por este teste. */
    try{fs.rmSync(profile,{recursive:true,force:true,maxRetries:3,retryDelay:200});}catch(error){console.warn('Perfil temporário ainda em uso: '+profile);}
  }
})().catch(error=>{console.error(error);process.exit(1)});
