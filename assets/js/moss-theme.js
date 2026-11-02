/* Tema das páginas institucionais. As demos mantêm seus próprios controles. */
(function () {
  'use strict';

  var key = 'moss-digital-theme';
  var root = document.documentElement;
  var system = window.matchMedia('(prefers-color-scheme: dark)');
  var preference = null;
  var button;

  function readPreference() {
    try {
      var value = window.localStorage.getItem(key);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function apply(theme) {
    root.setAttribute('data-moss-theme', theme);
    if (!button) return;
    var isDark = theme === 'dark';
    var label = isDark ? 'Ativar modo claro' : 'Ativar modo escuro';
    button.setAttribute('aria-label', label);
    button.title = label;
    button.querySelector('.theme-label').textContent = isDark ? 'Modo claro' : 'Modo escuro';
  }

  function usePreference() {
    apply(preference || (system.matches ? 'dark' : 'light'));
  }

  // Executado no head para aplicar a preferência antes de desenhar a página.
  preference = readPreference();
  usePreference();

  function install() {
    var navigation = document.querySelector('header nav');
    if (!navigation || navigation.querySelector('.theme-toggle')) return;
    button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.innerHTML = '<svg class="theme-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>'
      + '<svg class="theme-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" focusable="false"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/></svg>'
      + '<span class="theme-label"></span>';
    button.addEventListener('click', function () {
      preference = root.getAttribute('data-moss-theme') === 'dark' ? 'light' : 'dark';
      apply(preference);
      try {
        window.localStorage.setItem(key, preference);
      } catch (error) {
        // Mesmo sem armazenamento, o botão continua funcionando nesta página.
      }
    });
    navigation.appendChild(button);
    usePreference();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  } else {
    install();
  }

  if (system.addEventListener) {
    system.addEventListener('change', function () {
      if (!preference) usePreference();
    });
  }
  window.addEventListener('storage', function (event) {
    if (event.key === key || event.key === null) {
      preference = readPreference();
      usePreference();
    }
  });
}());
