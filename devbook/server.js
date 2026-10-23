/* ═══════════════════════════════════════════════════════
   DevBook — Servidor de desenvolvimento (zero dependências)
   Uso: node server.js [porta]   → http://localhost:8080
   Envia Cache-Control: no-store para nunca servir código
   desatualizado durante o desenvolvimento.
   ═══════════════════════════════════════════════════════ */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.argv[2]) || 8080;
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webmanifest": "application/manifest+json"
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  let filePath = path.normalize(path.join(ROOT, urlPath === "/" ? "index.html" : urlPath));

  /* Proteção contra path traversal */
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("403 Forbidden");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("404 — arquivo não encontrado: " + urlPath);
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": "no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*"
    });
    res.end(data);
  });
}).listen(PORT, "127.0.0.1", () => {
  console.log("🚀 DevBook em http://localhost:" + PORT);
});
