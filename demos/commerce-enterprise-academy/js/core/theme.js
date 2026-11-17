/* ============================================================
   theme.js — alternância de tema claro/escuro
   ------------------------------------------------------------
   Persiste a preferência e atualiza o atributo data-theme.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const KEY = 'moss_ca_theme_v1';
  const u = MOSS.utils;

  function current() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function toggle() {
    const next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    u.lsSet(KEY, next);
    if (MOSS.notify) MOSS.notify.toast('Tema ' + (next === 'dark' ? 'escuro' : 'claro') + ' ativado.', 'info', 1600);
    // Atualiza ícone do botão onde quer que ele esteja.
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.textContent = next === 'dark' ? '☀' : '☾';
      b.setAttribute('aria-label', next === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
    });
    return next;
  }

  function init() {
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-theme-toggle]')) toggle();
    });
    const icon = current() === 'dark' ? '☀' : '☾';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) { b.textContent = icon; });
  }

  MOSS.theme = { current: current, toggle: toggle, init: init };
})(window);
