/*
  Proteção contra cópia simples — portfólio MO Sites Profissionais.
  Desincentivo ao usuário comum (botão direito, atalhos de devolução,
  seleção de texto). Não é segurança absoluta: nada fica 100% protegido
  no navegador; a proteção principal é jurídica (ver LICENSE).
*/
(function () {
  'use strict';

  // deixa campos de formulário e áreas com data-selecionar utilizáveis
  function util(e) {
    var t = e.target;
    while (t && t !== document.body && t !== document.documentElement) {
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return true;
      if (t.hasAttribute && t.hasAttribute('data-selecionar')) return true;
      t = t.parentNode;
    }
    return false;
  }

  // botão direito
  document.addEventListener('contextmenu', function (e) {
    if (!util(e)) e.preventDefault();
  });

  // arrastar imagens e links
  document.addEventListener('dragstart', function (e) {
    if (!util(e)) e.preventDefault();
  });

  // seleção de texto (números e telefones continuam copiáveis via [data-selecionar])
  document.addEventListener('selectstart', function (e) {
    if (!util(e)) e.preventDefault();
  });

  // atalhos que abrem o código-fonte ou salvam a página
  document.addEventListener('keydown', function (e) {
    if (e.key === 'F12') { e.preventDefault(); return false; }

    var ctrl = e.ctrlKey || e.metaKey;
    if (!ctrl) return;

    var k = String(e.key || '').toLowerCase();

    // Ctrl+U (código-fonte), Ctrl+S (salvar), Ctrl+P (imprimir)
    if (!e.shiftKey && (k === 'u' || k === 's' || k === 'p')) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+I/J/C/K (ferramentas de desenvolvedor)
    if (e.shiftKey && (k === 'i' || k === 'j' || k === 'c' || k === 'k')) {
      e.preventDefault();
      return false;
    }
  }, false);
})();
