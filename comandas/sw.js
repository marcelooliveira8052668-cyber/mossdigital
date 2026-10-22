/* =================================================================
   COMANDA FÁCIL — sw.js (service worker)
   Guarda a "casca" do sistema em cache para funcionar offline.
   Os dados ficam no localStorage, então dá para operar sem internet.

   Versão do cache: incrementar quando qualquer arquivo mudar.
   ================================================================= */

var VERSAO_CACHE = 'comanda-facil-v2';

var ARQUIVOS = [
    './',
    './index.html',
    './css/estilo.css',
    './js/util.js',
    './js/dados.js',
    './js/negocio.js',
    './js/app.js',
    './manifest.webmanifest',
    './favicon.svg',
    './icones/pwa-192.png',
    './icones/pwa-512.png'
];


/* ------------------------------------------------- INSTALAÇÃO */
self.addEventListener('install', function (ev) {
    ev.waitUntil(
        caches.open(VERSAO_CACHE)
            .then(function (cache) { return cache.addAll(ARQUIVOS); })
            .then(function () { return self.skipWaiting(); })
    );
});


/* ---------------------------------------------------- LIMPEZA */
self.addEventListener('activate', function (ev) {
    ev.waitUntil(
        caches.keys()
            .then(function (nomes) {
                return Promise.all(nomes.map(function (nome) {
                    if (nome !== VERSAO_CACHE) return caches.delete(nome);
                }));
            })
            .then(function () { return self.clients.claim(); })
    );
});


/* --------------------------------------------------- BUSCA
   Estratégia:
   • Navegação (abrir o sistema): rede primeiro, cache como reserva.
      Assim uma atualização chega assim que houver internet.
   • Demais arquivos: cache primeiro, rede como reserva.
      São arquivos fixos — não mudam enquanto a versão não mudar.
-------------------------------------------------------------- */
self.addEventListener('fetch', function (ev) {

    /* Ignora pedidos que não são GET ou que não são do próprio site. */
    if (ev.request.method !== 'GET') return;

    var url = new URL(ev.request.url);
    if (url.origin !== self.location.origin) return;

    var ehNavegacao = ev.request.mode === 'navigate';

    if (ehNavegacao) {
        ev.respondWith(
            fetch(ev.request)
                .then(function (resposta) {
                    var copia = resposta.clone();
                    caches.open(VERSAO_CACHE).then(function (c) { c.put(ev.request, copia); });
                    return resposta;
                })
                .catch(function () {
                    return caches.match(ev.request).then(function (cacheado) {
                        return cacheado || caches.match('./index.html');
                    });
                })
        );
        return;
    }

    ev.respondWith(
        caches.match(ev.request).then(function (cacheado) {
            if (cacheado) return cacheado;

            return fetch(ev.request).then(function (resposta) {
                if (resposta && resposta.status === 200) {
                    var copia = resposta.clone();
                    caches.open(VERSAO_CACHE).then(function (c) { c.put(ev.request, copia); });
                }
                return resposta;
            });
        })
    );
});
