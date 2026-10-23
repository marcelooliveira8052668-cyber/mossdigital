/* ═══════════════════════════════════════════════════════
   DevBook — Service Worker (modo offline)
   Estratégia: network-first para os arquivos do app,
   com cache como fallback offline. Prioridade para rede
   porque não há build/hashing de nomes: servir cache
   antigo após uma atualização confunde o aluno.
   ═══════════════════════════════════════════════════════ */

const CACHE = "devbook-v4";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/styles.css",

  // Conteúdo do curso
  "./js/content/curriculum.js",
  "./js/content/badges.js",
  "./js/content/curriculum-advanced.js",
  "./js/content/tracks.js",
  "./js/content/projects.js",
  "./js/content/challenges.js",
  "./js/content/certificate.js",

  // Módulos da aplicação
  "./js/modules/progress.js",
  "./js/modules/gate.js",
  "./js/modules/playground.js",
  "./js/modules/challenges.js",
  "./js/modules/labs.js",
  "./js/modules/palette.js",
  "./js/modules/flashcards.js",
  "./js/modules/app.js",

  "./assets/icon.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

/* Arquivos que NÃO entram no precache: são grandes demais ou
   dependem de configuração do dono. Ficam só no cache de runtime. */
const RUNTIME_ONLY = [
  "./landing.html",
  "./legal.html",
  "./css/landing.css",
  "./css/legal.css",
  "./assets/og-cover.svg"
];

/* Instala: pré-cache dos arquivos do app */
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* Ativa: limpa caches antigos e assume o controle imediatamente */
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* Fetch: rede primeiro (com atualização do cache), cache como reserva offline */
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  const mesmaOrigem = url.origin === self.location.origin;

  /* Navegação: tenta a rede, cai para index.html em cache */
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  /* Arquivos do próprio app: rede primeiro (HTML/CSS/JSfresh),
     cache apenas quando offline */
  if (mesmaOrigem) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request).then(cached => {
          if (cached) return cached;
          if (e.request.destination === "image") return new Response("", { status: 504 });
          return new Response("Offline: recurso não disponível no cache.", {
            status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" }
          });
        }))
    );
    return;
  }

  /* Externos (Google Fonts, unpkg dos demos): cache primeiro */
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
