/* Teste local: nunca envia WhatsApp, e-mails ou pagamentos. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const repo = path.resolve(__dirname, '..');
const temp = path.join(process.env.LOCALAPPDATA, 'Temp', 'opencode');
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const profile = fs.mkdtempSync(path.join(temp, 'portfolio-test-'));
  const exe = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
  const edge = spawn(exe, ['--headless=new', '--disable-gpu', '--no-first-run', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
  let ws;
  try {
    const pf = path.join(profile, 'DevToolsActivePort');
    for (let i = 0; i < 100 && !fs.existsSync(pf); i++) await wait(100);
    const port = fs.readFileSync(pf, 'utf8').split('\n')[0];
    const pages = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    ws = new WebSocket(pages.find(p => p.type === 'page').webSocketDebuggerUrl);
    await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
    let serial = 0;
    const pending = new Map(), errors = [];
    ws.onmessage = e => {
      const m = JSON.parse(e.data);
      if (m.id) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(m.error) : p.resolve(m.result); }
      else if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails);
      else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') console.error(m.params.args.map(a=>a.value || a.description).join(' '));
    };
    const cmd = (method, params = {}) => new Promise((resolve, reject) => { const id = ++serial; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
    const js = async expression => {
      const r = await cmd('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails));
      return r.result.value;
    };
    const load = async file => { await cmd('Page.navigate', { url: pathToFileURL(path.join(repo, file)).href }); await wait(800); };
    await cmd('Runtime.enable'); await cmd('Page.enable');
    await load('portfolio/index.html');
    assert.equal(await js('typeof MossArquivos.pdf'), 'function');
    assert.equal(await js("document.getElementById('email-panel').hidden"), true);
    await js("document.getElementById('baixar-pedido').click()");
    assert.match(await js("document.getElementById('pedido-msg').textContent"), /nome completo/);
    await js(`document.getElementById('nome').value='Ana Teste';document.getElementById('funcao').value='Designer';
      document.getElementById('sobre').value='Texto de teste <script>alert(1)</script>';
      window.__downloads=[];MossArquivos.baixar=(blob,nome)=>{window.__downloads.push({blob,nome})};
      window.__opens=[];window.open=(...args)=>window.__opens.push(args);`);
    await js("document.getElementById('baixar-pedido').click()");
    const pedido = await js('window.__downloads[0].blob.text()');
    assert.equal(JSON.parse(pedido).dados.nome, 'Ana Teste');
    await js("document.getElementById('whatsapp-cta').click()");
    assert.match(await js('decodeURIComponent(window.__opens[0][0])'), /anexar manualmente/);
    assert.equal(await js(`(() => {const p=JSON.parse(${JSON.stringify(pedido)});p.dados.foto='data:image/svg+xml;base64,PHN2Zz4=';try{MossArquivos.validar(p);return false}catch{return true}})()`), true);
    assert.equal(await js(`(() => {const p=JSON.parse(${JSON.stringify(pedido)});p.dados.template='__proto__';try{MossArquivos.validar(p);return false}catch{return true}})()`), true);
    const foto = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=';
    for (const modelo of ['editorial', 'profissional']) {
      console.log('Gerando prévia e final:', modelo);
      const r = await js(`(async()=>{
        const d=coletar();d.template=${JSON.stringify(modelo)};d.foto=${JSON.stringify(foto)};
        d.projetos=Array.from({length:4},(_,i)=>({nome:'Projeto '+i,desc:'Descrição de teste. '.repeat(10),link:'https://example.com'}));
        const p=await MossArquivos.pdf(d,true);const f=await MossArquivos.pdf(d,false);
        const pt=await p.text(),ft=await f.text();
        return {previa:p.size,final:f.size,marca:pt.includes('PREVIA - MOSS DIGITAL'),limpo:!ft.includes('PREVIA - MOSS DIGITAL'),assinatura:pt.startsWith('%PDF-')};
      })()`);
      assert.ok(r.previa > 1000 && r.final > 1000); assert.equal(r.marca, true); assert.equal(r.limpo, true); assert.equal(r.assinatura, true);
    }
    for (const width of [390, 320]) {
      await cmd('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile: true });
      assert.equal(await js('document.documentElement.scrollWidth<=innerWidth'), true);
    }
    await load('.moss-local/finalizar.html');
    assert.equal(await js("document.getElementById('final').disabled"), true);
    // Reproduz importação sem usar dados reais de clientes.
    await js(`(() => {const dt=new DataTransfer();dt.items.add(new File([${JSON.stringify(pedido)}],'pedido.json',{type:'application/json'}));const i=document.getElementById('pedido');i.files=dt.files;i.dispatchEvent(new Event('change'));})()`);
    await wait(200);
    assert.equal(await js("document.getElementById('pago').disabled"), false);
    assert.match(await js("document.getElementById('resumo').textContent"), /Ana Teste/);
    await js("document.getElementById('pago').click()");
    assert.equal(await js("document.getElementById('final').disabled"), false);
    await js("window.__final=null;MossArquivos.baixar=(b,n)=>{window.__final={size:b.size,nome:n}};document.getElementById('final').click()");
    await js("new Promise((resolve,reject)=>{const t=setInterval(()=>{if(window.__final){clearInterval(t);resolve(true)}else if(!document.getElementById('final').disabled){clearInterval(t);reject(Error(document.getElementById('status').textContent))}},100)})");
    assert.match(await js('window.__final.nome'), /^portfolio-final-/);
    assert.equal(errors.length, 0, JSON.stringify(errors));
    console.log('OK: validação, pedido JSON, WhatsApp simulado, modelo editorial (e pedido legado mapeado) com/sem marca, 320/390 px e importação/finalização local.');
    await cmd('Browser.close');
  } finally { if (ws) ws.close(); edge.kill(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
