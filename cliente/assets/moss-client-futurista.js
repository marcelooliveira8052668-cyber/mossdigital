/* Camada visual da Área do Cliente. Não altera dados nem autenticação. */
(function () {
  'use strict';
  function install() {
    if (document.querySelector('.moss-client-note')) return;
    var note = document.createElement('aside');
    note.className = 'moss-client-note';
    note.setAttribute('aria-label', 'Aviso sobre a Área do Cliente');
    note.innerHTML = '<strong>Área do Cliente</strong>Projeto demonstrativo da MOSS Digital. Sem autenticação real, backend ou dados de clientes. <a href="/">Voltar ao site</a>';
    document.body.appendChild(note);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
  else install();
})();