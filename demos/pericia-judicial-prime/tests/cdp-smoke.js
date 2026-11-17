/*
 * HARNESS DE TESTE CDP — PERÍCIA JUDICIAL PRIME
 * Cobre larguras 360/390/768/1366, erros de console e funcionalidades do painel.
 * Uso: node cdp-smoke.js
 */
const { spawn } = require('child_process');
const os = require('os'), path = require('path'), fs = require('fs');
const CHROME = 'C:\\Users\\Sylvia Camillo\\AppData\\Local\\ms-playwright\\chromium-1254\\chrome-win64\\chrome.exe';
const PORT = 9341;
const PERFIL = path.join(os.tmpdir(), 'moss-cdp-pj-' + Date.now());
const HTML = path.join(__dirname, '..', 'index.html');
const fileUrl = 'file:///' + HTML.replace(/\\/g, '/').replace(/ /g, '%20');
const sleep = ms => new Promise(r => setTimeout(r, ms));

class CDP {
  constructor(ws, onEvent) { this.ws = ws; this.id = 0; this.p = new Map();
    ws.onmessage = e => { const m = JSON.parse(e.data);
      if (m.id && this.p.has(m.id)) { const x = this.p.get(m.id); this.p.delete(m.id); m.error ? x.rej(m.error) : x.res(m.result); }
      else if (onEvent) onEvent(m); }; }
  send(method, params = {}, sessionId) { const id = ++this.id, msg = { id, method, params }; if (sessionId) msg.sessionId = sessionId;
    return new Promise((res, rej) => { this.p.set(id, { res, rej }); this.ws.send(JSON.stringify(msg)); }); }
}

(async () => {
  const chrome = spawn(CHROME, ['--headless=new','--disable-gpu','--no-sandbox','--hide-scrollbars',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + PERFIL, 'about:blank'], { stdio: 'ignore' });
  try {
    let ver;
    for (let i = 0; i < 60; i++) { try { ver = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); break; } catch { await sleep(150); } }
    if (!ver) throw new Error('Chromium não iniciou');
    const erros = [];
    const ws = new WebSocket(ver.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
    const c = new CDP(ws, m => {
      if (m.method === 'Runtime.exceptionThrown') erros.push('EXCEPTION: ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
      if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') erros.push('CONSOLE: ' + m.params.args.map(a => a.value || a.description).join(' '));
    });
    const { targetId } = await c.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await c.send('Target.attachToTarget', { targetId, flatten: true });
    await c.send('Runtime.enable', {}, sessionId);
    await c.send('Page.enable', {}, sessionId);
    const av = async expr => {
      const r = await c.send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }, sessionId);
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
      return r.result.value;
    };
    const resultados = [];
    const checar = (nome, ok, detalhe='') => resultados.push({ nome, ok: !!ok, detalhe });

    for (const largura of [360, 390, 768, 1366]) {
      await c.send('Emulation.setDeviceMetricsOverride', { width: largura, height: 900, deviceScaleFactor: 1, mobile: largura < 600 }, sessionId);
      await c.send('Page.navigate', { url: fileUrl }, sessionId);
      for (let i = 0; i < 40; i++) { if (await av('document.readyState === "complete"')) break; await sleep(100); }
      await sleep(150);
      const d = JSON.parse(await av(`JSON.stringify({ sw:document.documentElement.scrollWidth, cw:document.documentElement.clientWidth,
        processos:document.querySelectorAll('.processo').length, indicadores:document.querySelectorAll('.indicador').length,
        dias:document.querySelectorAll('.dia').length })`));
      checar(`Layout ${largura}px — sem rolagem horizontal`, d.sw <= d.cw + 1, `scrollWidth=${d.sw}, clientWidth=${d.cw}`);
      checar(`Layout ${largura}px — painel renderizado`, d.processos === 5 && d.indicadores === 4 && d.dias >= 28,
        `processos=${d.processos}, indicadores=${d.indicadores}, dias=${d.dias}`);
    }

    await c.send('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
    await c.send('Page.navigate', { url: fileUrl }, sessionId); await sleep(400);

    // Busca
    const busca = await av(`(() => { const i=document.getElementById('busca'); i.value='Contabilidade'; i.dispatchEvent(new Event('input'));
      return document.querySelectorAll('.processo').length; })()`);
    checar('Busca por processos filtra resultados', busca === 1, `resultados=${busca}`);

    // Filtro de prioridade
    const prio = await av(`(() => { const i=document.getElementById('busca'); i.value=''; i.dispatchEvent(new Event('input'));
      document.querySelector('[data-prioridade="alta"]').click(); return document.querySelectorAll('.processo').length; })()`);
    checar('Filtro por prioridade funciona', prio === 2, `resultados=${prio}`);

    // Filtro de situação
    const sit = await av(`(() => { document.querySelector('[data-prioridade="todas"]').click();
      document.querySelector('[data-situacao="Concluído"]').click(); return document.querySelectorAll('.processo').length; })()`);
    checar('Filtro por situação funciona', sit === 1, `resultados=${sit}`);

    // Seleção + checklist + timeline
    const detalhe = await av(`(() => { document.querySelector('[data-situacao="todas"]').click();
      document.querySelector('.processo').click();
      const cb = document.querySelector('#detalheCorpo [data-doc]');
      if (cb) { cb.checked = !cb.checked; cb.dispatchEvent(new Event('change')); }
      return JSON.stringify({ titulo: document.getElementById('detalheTitulo').textContent,
        checks: document.querySelectorAll('#detalheCorpo [data-doc]').length,
        timeline: document.querySelectorAll('#detalheCorpo .timeline li').length }); })()`);
    const dinfo = JSON.parse(detalhe);
    checar('Detalhe exibe checklist e linha do tempo', dinfo.checks > 0 && dinfo.timeline > 0, JSON.stringify(dinfo));

    // Cadastro de novo processo fictício
    const cadastro = await av(`(() => {
      document.getElementById('novoNumero').value='9999999-99.2026.8.26.9999';
      document.getElementById('novoPrazo').value='2026-12-31';
      document.getElementById('formNovo').dispatchEvent(new Event('submit', { cancelable:true, bubbles:true }));
      return JSON.stringify({ total: document.querySelectorAll('.processo').length,
        ind: document.querySelector('.indicador strong').textContent }); })()`);
    const cinfo = JSON.parse(cadastro);
    checar('Cadastro adiciona processo fictício', cinfo.total === 6 && cinfo.ind === '6', JSON.stringify(cinfo));

    // Validação do cadastro
    const invalido = await av(`(() => {
      document.getElementById('novoNumero').value=''; document.getElementById('novoPrazo').value='';
      document.getElementById('formNovo').dispatchEvent(new Event('submit', { cancelable:true, bubbles:true }));
      return Array.from(document.querySelectorAll('#formNovo .erro')).filter(e=>e.textContent.trim()).length; })()`);
    checar('Cadastro valida campos obrigatórios', invalido === 2, `erros=${invalido}`);

    // Calendário: navegação de mês
    const cal = await av(`(() => { const antes=document.getElementById('mesAtual').textContent;
      document.getElementById('mesSeguinte').click(); const depois=document.getElementById('mesAtual').textContent;
      return antes !== depois; })()`);
    checar('Calendário navega entre meses', cal === true, `trocou=${cal}`);

    // Link MOSS
    const wa = await av(`document.getElementById('btnMoss').href`);
    checar('Botão MOSS aponta ao WhatsApp correto', wa.startsWith('https://wa.me/5511942038103'), `href=${wa.slice(0,80)}`);

    
// Fotografias licenciadas (6 por demo) — carregamento real
await av(`document.getElementById('fotografias').scrollIntoView()`);
await new Promise(function(r){setTimeout(r,600)});
const fotos=await av(`JSON.stringify(Array.from(document.querySelectorAll('#fotografias img')).map(i=>({ok:i.complete&&i.naturalWidth>0,alt:i.alt.length>5,local:i.getAttribute('src').startsWith('img/fotos/')})))`);
const fo=JSON.parse(fotos);
checar('6 fotografias licenciadas carregam',fo.length===6&&fo.every(function(x){return x.ok&&x.alt&&x.local}),JSON.stringify(fo.map(function(x){return x.ok})));

console.log('\n===== RELATÓRIO DE TESTES — PERÍCIA JUDICIAL PRIME =====\n');
    resultados.forEach(r => console.log((r.ok?'PASS ':'FAIL ')+r.nome+(r.detalhe?'  ['+r.detalhe+']':'')));
    const falhas = resultados.filter(r=>!r.ok).length;
    console.log('\nErros de console/JS capturados: ' + erros.length);
    erros.slice(0,12).forEach(e=>console.log('  ! '+e));
    console.log(`\nTotal: ${resultados.length} verificações, ${falhas} falhas, ${erros.length} erros de console.`);
    process.exitCode = (falhas===0 && erros.length===0) ? 0 : 1;
  } catch (e) { console.error('ERRO NO HARNESS:', e); process.exitCode = 1; }
  finally { chrome.kill('SIGKILL'); try { fs.rmSync(PERFIL,{recursive:true,force:true}); } catch {} }
})();
