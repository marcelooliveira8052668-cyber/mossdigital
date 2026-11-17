/* ============================================================
   tracking.js — acompanhamento visual da entrega simulada
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;

  function render(params) {
    const orders = MOSS.orderService.all();
    if (!orders.length) {
      return '<div class="page">' + MOSS.ui.empty('🚚', 'Nenhuma entrega para acompanhar', 'Crie um pedido fictício no checkout para ver a linha do tempo.', '<a class="btn btn--primary" href="#/checkout">Ir ao checkout</a>') + '</div>';
    }
    const selected = (params.id && MOSS.orderService.byId(params.id)) || orders[0];

    return '<div class="page">' +
      '<div class="page-head"><div><span class="eyebrow">Simulação logística</span><h1>Acompanhar entrega</h1>' +
        '<p>Linha do tempo fictícia. Nenhuma transportadora foi contratada.</p></div></div>' +
      '<div class="grid grid--side">' +
        '<div class="card card--pad">' +
          '<div class="spread"><div><span class="badge badge--accent">Código de rastreio fictício</span>' +
            '<h3 style="margin-top:.5rem">' + u.escapeHtml(selected.tracking || 'Aguardando pagamento') + '</h3></div>' +
            '<button class="btn btn--navy" id="advance"' + (selected.status==='entregue'?' disabled':'') + '>Avançar estado →</button></div>' +
          '<div class="progress" style="margin:1.1rem 0"><span style="width:' + MOSS.logistics.progress(selected) + '%"></span></div>' +
          MOSS.ui.timeline(selected) +
          '<div class="note">📦 ' + MOSS.logistics.estimate(selected) + '</div>' +
        '</div>' +
        '<div class="card"><div class="card__head"><h3>Seus pedidos</h3></div><div class="card__body">' +
          orders.map(function (o) {
            return '<a class="option-card' + (o.id===selected.id?' is-selected':'') + '" style="display:block" href="#/rastrear?id=' + encodeURIComponent(o.id) + '">' +
              '<span><span class="option-card__title">' + u.escapeHtml(o.id) + '</span><br>' +
              '<span class="option-card__meta">' + u.escapeHtml(MOSS.orderService.STATUS_LABELS[o.status]||o.status) + ' · ' + u.money(o.totals.total) + '</span></span></a>';
          }).join('') +
          '<div style="margin-top:1rem"><h4>Integrações reais (didático)</h4>' +
            MOSS.logistics.PROVIDERS.map(function (p) {
              return '<p class="small"><a href="' + p.docs + '" target="_blank" rel="noopener">' + p.name + ' ↗</a> — ' + p.note + '</p>';
            }).join('') +
          '</div>' +
        '</div></div>' +
      '</div>' +
    '</div>';
  }

  function bind(params) {
    const app = document.getElementById('app');
    const btn = app.querySelector('#advance');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const orders = MOSS.orderService.all();
      const current = (params.id && MOSS.orderService.byId(params.id)) || orders[0];
      const next = MOSS.orderService.advance(current.id, 'Atualizado em ' + new Date().toLocaleTimeString('pt-BR') + '.');
      if (next) MOSS.notify.toast('Estado atual: ' + (MOSS.orderService.STATUS_LABELS[next.status] || next.status), 'ok');
      MOSS.router.render();
    });
  }

  MOSS.pages = MOSS.pages || {};
  MOSS.pages.tracking = { render:render, bind:bind };
})(window);
