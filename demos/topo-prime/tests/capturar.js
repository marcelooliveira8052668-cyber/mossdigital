/* Captura screenshots em 390px e 1366px para inspeção visual. */
const { spawn } = require('child_process');
const os = require('os'), path = require('path'), fs = require('fs');
const CHROME = 'C:\\Users\\Sylvia Camillo\\AppData\\Local\\ms-playwright\\chromium-1254\\chrome-win64\\chrome.exe';
const PORT = 9334;
const PERFIL = path.join(os.tmpdir(), 'moss-shot-' + Date.now());
const HTML = path.join(__dirname, '..', 'index.html');
const fileUrl = 'file:///' + HTML.replace(/\\/g, '/').replace(/ /g, '%20');
const sleep = ms => new Promise(r => setTimeout(r, ms));

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.p = new Map();
    ws.onmessage = e => { const m = JSON.parse(e.data);
      if (m.id && this.p.has(m.id)) { const x = this.p.get(m.id); this.p.delete(m.id); m.error ? x.rej(m.error) : x.res(m.result); } }; }
  send(method, params = {}, sessionId) { const id = ++this.id, msg = { id, method, params }; if (sessionId) msg.sessionId = sessionId;
    return new Promise((res, rej) => { this.p.set(id, { res, rej }); this.ws.send(JSON.stringify(msg)); }); }
}

(async () => {
  const chrome = spawn(CHROME, ['--headless=new','--disable-gpu','--no-sandbox','--hide-scrollbars',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + PERFIL, 'about:blank'], { stdio: 'ignore' });
  try {
    let ver;
    for (let i = 0; i < 60; i++) { try { ver = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); break; } catch { await sleep(150); } }
    const ws = new WebSocket(ver.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
    const c = new CDP(ws);
    const { targetId } = await c.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await c.send('Target.attachToTarget', { targetId, flatten: true });
    await c.send('Page.enable', {}, sessionId);
    for (const [largura, altura, nome] of [[390, 844, 'topo-prime-mobile.png'], [1366, 900, 'topo-prime-desktop.png']]) {
      await c.send('Emulation.setDeviceMetricsOverride', { width: largura, height: altura, deviceScaleFactor: 1, mobile: largura < 600 }, sessionId);
      await c.send('Page.navigate', { url: fileUrl }, sessionId);
      await sleep(700);
      // captura da página inteira
      const { data } = await c.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true }, sessionId);
      const destino = path.join(__dirname, nome);
      fs.writeFileSync(destino, Buffer.from(data, 'base64'));
      console.log('Salvo: ' + destino);
    }
  } catch (e) { console.error(e); process.exitCode = 1; }
  finally { chrome.kill('SIGKILL'); try { fs.rmSync(PERFIL, { recursive: true, force: true }); } catch {} }
})();
