/* Verifica se as 6 fotos carregam de fato ao rolar até a galeria. */
const { spawn } = require('child_process');
const os = require('os'), path = require('path'), fs = require('fs');
const CHROME = 'C:\\Users\\Sylvia Camillo\\AppData\\Local\\ms-playwright\\chromium-1254\\chrome-win64\\chrome.exe';
const PORT = 9481, PERFIL = path.join(os.tmpdir(), 'moss-fotos-' + Date.now());
const sleep = ms => new Promise(r => setTimeout(r, ms));
class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.p = new Map();
    ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && this.p.has(m.id)) { const x = this.p.get(m.id); this.p.delete(m.id); x.res(m.result); } }; }
  send(method, params = {}, sessionId) { const id = ++this.id, msg = { id, method, params }; if (sessionId) msg.sessionId = sessionId;
    return new Promise(res => { this.p.set(id, { res }); this.ws.send(JSON.stringify(msg)); }); }
}
(async () => {
  const chrome = spawn(CHROME, ['--headless=new','--disable-gpu','--no-sandbox','--remote-debugging-port='+PORT,'--user-data-dir='+PERFIL,'about:blank'], { stdio: 'ignore' });
  try {
    let ver; for (let i=0;i<60;i++) { try { ver = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json(); break; } catch { await sleep(150); } }
    const ws = new WebSocket(ver.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r); const c = new CDP(ws);
    const { targetId } = await c.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await c.send('Target.attachToTarget', { targetId, flatten: true });
    await c.send('Page.enable', {}, sessionId);
    for (const demo of ['restaura-prime','acesso-prime','inspect-prime']) {
      const file = `C:/Users/Sylvia Camillo/${demo}/index.html`.replace(/ /g,'%20');
      await c.send('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
      await c.send('Page.navigate', { url: 'file:///' + file }, sessionId); await sleep(600);
      await c.send('Runtime.evaluate', { expression: `document.getElementById('fotografias').scrollIntoView()` }, sessionId);
      await sleep(1200);
      const r = await c.send('Runtime.evaluate', { expression: `JSON.stringify(Array.from(document.querySelectorAll('#fotografias img')).map(i=>({alt:i.alt.slice(0,28),ok:i.complete&&i.naturalWidth>0,w:i.naturalWidth})))`, returnByValue: true }, sessionId);
      const itens = JSON.parse(r.result.value);
      const ok = itens.filter(x => x.ok).length;
      console.log(demo + ': ' + ok + '/6 carregadas -> ' + JSON.stringify(itens.map(x=>x.w)));
    }
  } catch (e) { console.error(e); process.exitCode = 1; }
  finally { chrome.kill('SIGKILL'); try { fs.rmSync(PERFIL,{recursive:true,force:true}); } catch {} }
})();
