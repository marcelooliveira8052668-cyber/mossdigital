/* Diagnóstico: elementos que estouram a viewport em 360px */
const {spawn}=require('child_process');const os=require('os'),path=require('path'),fs=require('fs');
const CHROME='C:\\Users\\Sylvia Camillo\\AppData\\Local\\ms-playwright\\chromium-1254\\chrome-win64\\chrome.exe';
const PORT=9475,PERFIL=path.join(os.tmpdir(),'moss-diag-ip-'+Date.now());
const HTML=path.join(__dirname,'..','index.html');const fileUrl='file:///'+HTML.replace(/\\/g,'/').replace(/ /g,'%20');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
class CDP{constructor(ws){this.ws=ws;this.id=0;this.p=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&this.p.has(m.id)){const x=this.p.get(m.id);this.p.delete(m.id);x.res(m.result);}};}
send(method,params={},sessionId){const id=++this.id,msg={id,method,params};if(sessionId)msg.sessionId=sessionId;return new Promise(res=>{this.p.set(id,{res});this.ws.send(JSON.stringify(msg));});}}
(async()=>{const chrome=spawn(CHROME,['--headless=new','--disable-gpu','--no-sandbox','--remote-debugging-port='+PORT,'--user-data-dir='+PERFIL,'about:blank'],{stdio:'ignore'});
try{let ver;for(let i=0;i<60;i++){try{ver=await(await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();break;}catch{await sleep(150);}}
const ws=new WebSocket(ver.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);const c=new CDP(ws);
const {targetId}=await c.send('Target.createTarget',{url:'about:blank'});const {sessionId}=await c.send('Target.attachToTarget',{targetId,flatten:true});
await c.send('Page.enable',{},sessionId);
await c.send('Emulation.setDeviceMetricsOverride',{width:360,height:900,deviceScaleFactor:1,mobile:true},sessionId);
await c.send('Page.navigate',{url:fileUrl},sessionId);await sleep(800);
const r=await c.send('Runtime.evaluate',{expression:`JSON.stringify(Array.from(document.querySelectorAll('*')).map(e=>({
 tag:e.tagName.toLowerCase(),cls:(typeof e.className==='string'?e.className:e.className.baseVal)||'',
 right:Math.round(e.getBoundingClientRect().right),w:Math.round(e.getBoundingClientRect().width),sw:e.scrollWidth,cw:e.clientWidth
})).filter(x=>x.right>window.innerWidth+2).slice(0,20))`,returnByValue:true},sessionId);
console.log(r.result.value);
}catch(e){console.error(e);}finally{chrome.kill('SIGKILL');try{fs.rmSync(PERFIL,{recursive:true,force:true});}catch{}}})();
