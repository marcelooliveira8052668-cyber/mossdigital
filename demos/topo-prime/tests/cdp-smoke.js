/*
 * HARNESS DE TESTE CDP — Chromium headless (sem dependências npm)
 * ---------------------------------------------------------------
 * Usa o Chromium já instalado pelo Playwright e a WebSocket nativa do Node 26.
 * Verifica: larguras 360/390/768/1366, rolagem horizontal, erros de console
 * e uma série de verificações funcionais configuráveis.
 *
 * Uso: node cdp-smoke.js
 */
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:\\Users\\Sylvia Camillo\\AppData\\Local\\ms-playwright\\chromium-1254\\chrome-win64\\chrome.exe';
const PORT = 9333;
const PERFIL = path.join(os.tmpdir(), 'moss-cdp-' + Date.now());
const HTML = path.join(__dirname, '..', 'index.html');
const fileUrl = 'file:///' + HTML.replace(/\\/g, '/').replace(/ /g, '%20');

// Cliente CDP mínimo baseado em id de requisição.
class CDP {
  constructor(ws, onEvent) {
    this.ws = ws; this.id = 0; this.pending = new Map();
    ws.onmessage = e => {
      const m = JSON.parse(e.data);
      if (m.id && this.pending.has(m.id)) {
        const p = this.pending.get(m.id); this.pending.delete(m.id);
        m.error ? p.reject(new Error(JSON.stringify(m.error))) : p.resolve(m.result);
      } else if (onEvent) onEvent(m);
    };
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    const msg = { id, method, params };
    if (sessionId) msg.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify(msg));
    });
  }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + PERFIL,
    '--no-first-run', '--no-default-browser-check', 'about:blank'
  ], { stdio: 'ignore' });

  try {
    // Aguarda o endpoint de depuração ficar disponível.
    let ver;
    for (let i = 0; i < 60; i++) {
      try { ver = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); break; }
      catch { await sleep(150); }
    }
    if (!ver) throw new Error('Chromium não iniciou a tempo');

    const erros = [];
    const ws = new WebSocket(ver.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);
    const cdp = new CDP(ws, m => {
      if (m.method === 'Runtime.exceptionThrown') {
        erros.push('EXCEPTION: ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
      }
      if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
        erros.push('CONSOLE: ' + m.params.args.map(a => a.value || a.description).join(' '));
      }
    });

    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    await cdp.send('Runtime.enable', {}, sessionId);
    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Log.enable', {}, sessionId);

    const avaliar = async expr => {
      const r = await cdp.send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }, sessionId);
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
      return r.result.value;
    };

    const resultados = [];
    const checar = (nome, ok, detalhe = '') => {
      resultados.push({ nome, ok: !!ok, detalhe });
    };

    // ---- Testes de layout nas 4 larguras exigidas ----
    for (const largura of [360, 390, 768, 1366]) {
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: largura, height: 900, deviceScaleFactor: 1, mobile: largura < 600
      }, sessionId);
      await cdp.send('Page.navigate', { url: fileUrl }, sessionId);
      // aguarda carregamento
      for (let i = 0; i < 40; i++) {
        const pronto = await avaliar('document.readyState === "complete"');
        if (pronto) break;
        await sleep(100);
      }
      await sleep(150);
      const info = await avaliar(`JSON.stringify({
        sw: document.documentElement.scrollWidth,
        cw: document.documentElement.clientWidth,
        titulo: document.title,
        cardsServico: document.querySelectorAll('.servico').length,
        cardsProjeto: document.querySelectorAll('.projeto').length,
        equipamentos: document.querySelectorAll('.equipamento').length
      })`);
      const d = JSON.parse(info);
      checar(`Layout ${largura}px — sem rolagem horizontal`, d.sw <= d.cw + 1, `scrollWidth=${d.sw}, clientWidth=${d.cw}`);
      checar(`Layout ${largura}px — conteúdo renderizado`, d.cardsServico === 6 && d.cardsProjeto === 6 && d.equipamentos === 4,
        `serviços=${d.cardsServico}, projetos=${d.cardsProjeto}, equipamentos=${d.equipamentos}`);
    }

    // Volta para desktop para os testes funcionais
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
    await cdp.send('Page.navigate', { url: fileUrl }, sessionId);
    await sleep(400);

    // ---- Calculadora ----
    const calc = await avaliar(`(() => {
      const a = document.getElementById('area'); a.value = '3000'; a.dispatchEvent(new Event('input'));
      document.getElementById('tipo').value = 'georreferenciamento';
      document.getElementById('formOrcamento').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      return document.getElementById('valorEstimado').textContent;
    })()`);
    checar('Calculadora gera valor', calc.includes('R$') && /\d/.test(calc) && !calc.includes('—'), `valor=${calc}`);

    // ---- Filtro de portfólio ----
    const filtro = await avaliar(`(() => {
      document.querySelector('[data-filtro="rural"]').click();
      const visiveis = Array.from(document.querySelectorAll('.projeto')).filter(p => !p.hidden);
      return visiveis.length + '|' + visiveis.every(p => p.dataset.categoria === 'rural');
    })()`);
    checar('Filtro do portfólio funciona', filtro.startsWith('2|true'), `resultado=${filtro}`);

    // ---- Planta interativa ----
    const planta = await avaliar(`(() => {
      document.querySelector('.ponto-visivel').dispatchEvent(new MouseEvent('click', { bubbles: true }));
      return document.getElementById('coordInfo').textContent;
    })()`);
    checar('Planta mostra coordenadas ao clicar', /P01/.test(planta) && /leste/i.test(planta), `coord=${planta.slice(0, 60)}`);

    // ---- Formulário: validação e confirmação ----
    const formVazio = await avaliar(`(() => {
      document.getElementById('formVisita').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      return Array.from(document.querySelectorAll('#formVisita .erro')).filter(e => e.textContent.trim()).length;
    })()`);
    checar('Formulário valida campos vazios', formVazio >= 4, `erros=${formVazio}`);

    const formOk = await avaliar(`(() => {
      document.getElementById('nome').value = 'Maria Silva';
      document.getElementById('telefone').value = '(11) 99999-9999';
      document.getElementById('email').value = 'maria@exemplo.com';
      document.getElementById('cidade').value = 'São Paulo';
      document.getElementById('formVisita').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      return document.getElementById('confirmacao').classList.contains('visivel');
    })()`);
    checar('Formulário confirma envio simulado', formOk === true, `visivel=${formOk}`);

    // ---- Link comercial MOSS ----
    const wa = await avaliar(`document.getElementById('btnMoss').href`);
    checar('Botão MOSS aponta ao WhatsApp correto', wa.startsWith('https://wa.me/5511942038103'), `href=${wa.slice(0, 80)}`);

    // ---- Relatório ----
    
// Fotografias licenciadas (6 por demo) — carregamento real
await avaliar(`document.getElementById('fotografias').scrollIntoView()`);
await new Promise(function(r){setTimeout(r,600)});
const fotos=await avaliar(`JSON.stringify(Array.from(document.querySelectorAll('#fotografias img')).map(i=>({ok:i.complete&&i.naturalWidth>0,alt:i.alt.length>5,local:i.getAttribute('src').startsWith('img/fotos/')})))`);
const fo=JSON.parse(fotos);
checar('6 fotografias licenciadas carregam',fo.length===6&&fo.every(function(x){return x.ok&&x.alt&&x.local}),JSON.stringify(fo.map(function(x){return x.ok})));

console.log('\n===== RELATÓRIO DE TESTES — TOPO PRIME =====\n');
    resultados.forEach(r => console.log((r.ok ? 'PASS ' : 'FAIL ') + r.nome + (r.detalhe ? '  [' + r.detalhe + ']' : '')));
    const falhas = resultados.filter(r => !r.ok).length;
    console.log('\nErros de console/JS capturados: ' + erros.length);
    erros.slice(0, 12).forEach(e => console.log('  ! ' + e));
    console.log(`\nTotal: ${resultados.length} verificações, ${falhas} falhas, ${erros.length} erros de console.`);
    process.exitCode = (falhas === 0 && erros.length === 0) ? 0 : 1;
  } catch (e) {
    console.error('ERRO NO HARNESS:', e);
    process.exitCode = 1;
  } finally {
    chrome.kill('SIGKILL');
    try { fs.rmSync(PERFIL, { recursive: true, force: true }); } catch {}
  }
})();
