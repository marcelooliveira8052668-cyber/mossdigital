/* ============================================================
   ui.js — pequenos componentes visuais reutilizáveis
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const e = MOSS.utils.escapeHtml;

  function stars(rating) {
    const full = Math.floor(rating || 0);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }

  function price(value, old) {
    let html = '<span class="product-card__price">' + MOSS.utils.money(value) + '</span>';
    if (old && old > value) html += '<span class="product-card__old">' + MOSS.utils.money(old) + '</span>';
    return html;
  }

  function badgeStock(p) {
    if (p.stock <= 0) return '<span class="badge badge--red">Esgotado</span>';
    if (p.stock <= 5) return '<span class="badge badge--accent">Últimas unidades</span>';
    return '<span class="badge badge--green">Disponível</span>';
  }

  function sectionHead(eyebrow, title, desc) {
    return '<div class="page-head"><div><span class="eyebrow">' + e(eyebrow) + '</span>' +
      '<h2>' + e(title) + '</h2>' + (desc ? '<p>' + e(desc) + '</p>' : '') + '</div></div>';
  }

  function empty(icon, title, text, actionHtml) {
    return '<div class="empty"><div class="empty__icon">' + icon + '</div>' +
      '<h3>' + e(title) + '</h3><p>' + e(text) + '</p>' + (actionHtml || '') + '</div>';
  }

  function timeline(order) {
    const seq = MOSS.logistics.ESTADOS;
    const labels = MOSS.orderService.STATUS_LABELS;
    const currentIdx = seq.indexOf(order.status);
    const map = {};
    (order.timeline || []).forEach(function (ev) { map[ev.status] = ev; });
    return '<ol class="timeline">' + seq.map(function (s, i) {
      const ev = map[s];
      const cls = i < currentIdx ? 'is-done' : (i === currentIdx ? 'is-current' : '');
      const icon = i < currentIdx ? '✓' : (i === currentIdx ? '●' : String(i + 1));
      return '<li class="' + cls + '"><span class="timeline__icon">' + icon + '</span>' +
        '<div class="timeline__title">' + labels[s] + '</div>' +
        '<div class="timeline__meta">' + (ev ? MOSS.utils.formatDate(ev.at) : 'Aguardando…') +
        (ev && ev.note ? ' · ' + e(ev.note) : '') + '</div></li>';
    }).join('') + '</ol>';
  }

  function steps(current, labels) {
    return '<div class="steps">' + labels.map(function (l, i) {
      const cls = i < current ? 'is-done' : (i === current ? 'is-current' : '');
      return '<div class="steps__item ' + cls + '"><div class="steps__bar"><span></span></div>' +
        '<span class="steps__label">' + e(l) + '</span></div>';
    }).join('') + '</div>';
  }

  MOSS.ui = { stars:stars, price:price, badgeStock:badgeStock, sectionHead:sectionHead, empty:empty, timeline:timeline, steps:steps };
})(window);
