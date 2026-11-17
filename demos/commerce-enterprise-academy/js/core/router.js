/* ============================================================
   router.js — navegação por hash (compatível com file:// e Pages)
   ------------------------------------------------------------
   Rotas: #/rota?param=valor. Sem history API para funcionar
   abrindo index.html diretamente e em hospedagem estática.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;

  const routes = new Map();       // path -> handler(params)
  let notFound = null;
  let beforeEachFn = null;

  function parse() {
    const hash = global.location.hash.replace(/^#\/?/, '') || 'home';
    const qi = hash.indexOf('?');
    const path = (qi >= 0 ? hash.slice(0, qi) : hash) || 'home';
    const query = {};
    if (qi >= 0) {
      hash.slice(qi + 1).split('&').forEach(function (pair) {
        if (!pair) return;
        const kv = pair.split('=');
        query[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
      });
    }
    return { path: path, params: query };
  }

  function register(path, handler) { routes.set(path, handler); return router; }
  function setNotFound(fn) { notFound = fn; return router; }
  function beforeEach(fn) { beforeEachFn = fn; return router; }

  function navigate(path, params) {
    let hash = '#/' + (path || 'home');
    if (params && Object.keys(params).length) {
      hash += '?' + Object.keys(params).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
      }).join('&');
    }
    if (global.location.hash === hash) render();
    else global.location.hash = hash;
  }

  function render() {
    const route = parse();
    if (beforeEachFn) beforeEachFn(route);
    const entry = routes.get(route.path) || notFound;
    const app = document.getElementById('app');
    if (!entry || !app) return;
    // Handler pode ser uma função (retorna HTML) ou um objeto { render, bind }.
    const handler = typeof entry === 'function' ? entry : entry.render;
    if (typeof handler !== 'function') return;
    if (MOSS.cleanups) MOSS.cleanups.slice().forEach(function (fn) { try { fn(); } catch (e) {} });
    if (MOSS.cleanups) MOSS.cleanups.length = 0;
    app.innerHTML = handler(route.params) || '';
    if (typeof entry === 'object' && typeof entry.bind === 'function') entry.bind(route.params);
    app.focus({ preventScroll: true });
    global.scrollTo({ top: 0, behavior: 'instant' in global ? 'instant' : 'auto' });
    // Atualiza estado "ativo" na navegação.
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('data-nav') === route.path);
    });
  }

  const router = {
    register: register, setNotFound: setNotFound, beforeEach: beforeEach,
    navigate: navigate, render: render, parse: parse
  };

  function init() {
    global.addEventListener('hashchange', render);
    if (!global.location.hash) global.location.hash = '#/home';
    else render();
  }

  router.init = init;
  MOSS.router = router;
  /** Atalho global para hrefs: <a href="#/produtos"> já funciona nativamente. */
  MOSS.go = navigate;
})(window);
