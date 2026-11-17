/* ============================================================
   notify.js — sistema de mensagens e modal
   ------------------------------------------------------------
   Substitui "alert()". Dá feedback visual para toda ação.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const esc = MOSS.utils.escapeHtml;
  const ICONS = { ok: '✓', err: '!', info: 'i', warn: '⚠' };

  /** Toast: mensagem temporária no canto da tela. */
  function toast(message, type, ms) {
    type = type || 'info';
    const root = document.getElementById('toast-root');
    if (!root) return;
    const el = document.createElement('div');
    el.className = 'toast toast--' + type;
    el.setAttribute('role', type === 'err' ? 'alert' : 'status');
    el.innerHTML = '<span class="toast__icon" aria-hidden="true">' + ICONS[type] + '</span>' +
      '<span class="toast__text">' + esc(message) + '</span>';
    root.appendChild(el);
    const ttl = ms || (type === 'err' ? 4500 : 3200);
    setTimeout(function () {
      el.classList.add('is-out');
      setTimeout(function () { el.remove(); }, 200);
    }, ttl);
  }

  /** Modal acessível com foco inicial e fechamento por Esc/backdrop. */
  function modal(opts) {
    const root = document.getElementById('modal-root');
    if (!root) return;
    const title = opts.title || '';
    const body = opts.body || '';
    const actions = opts.actions || [];
    const wide = opts.wide ? ' style="width:min(860px,100%)"' : '';

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-label="' + esc(title) + '"' + wide + '>' +
        '<div class="modal__head"><h3>' + esc(title) + '</h3>' +
          '<button class="icon-btn" data-close aria-label="Fechar">✕</button></div>' +
        '<div class="modal__body">' + body + '</div>' +
        '<div class="modal__foot"></div>' +
      '</div>';

    const foot = backdrop.querySelector('.modal__foot');
    actions.forEach(function (a, i) {
      const b = document.createElement('button');
      b.className = 'btn ' + (a.className || 'btn--outline');
      b.textContent = a.label;
      b.setAttribute('data-action', String(i));
      foot.appendChild(b);
    });

    function close() {
      document.removeEventListener('keydown', onKey);
      backdrop.remove();
      document.body.classList.remove('no-scroll');
    }
    function onKey(e) { if (e.key === 'Escape') close(); }

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop || e.target.closest('[data-close]')) return close();
      const btn = e.target.closest('[data-action]');
      if (btn) {
        const action = actions[Number(btn.getAttribute('data-action'))];
        if (action && action.onClick) {
          const keep = action.onClick(backdrop.querySelector('.modal__body'), close);
          if (!keep) close();
        } else close();
      }
    });
    document.addEventListener('keydown', onKey);
    root.appendChild(backdrop);
    document.body.classList.add('no-scroll');
    const focusTarget = backdrop.querySelector('[autofocus], input, button');
    if (focusTarget) focusTarget.focus();
    return close;
  }

  /** Confirmação simples. */
  function confirm(title, message, onYes, danger) {
    modal({
      title: title,
      body: '<p>' + esc(message) + '</p>',
      actions: [
        { label: 'Cancelar', className: 'btn--outline' },
        { label: 'Confirmar', className: danger ? 'btn--danger' : 'btn--primary', onClick: function () { onYes(); } }
      ]
    });
  }

  MOSS.notify = { toast: toast, modal: modal, confirm: confirm };
})(window);
