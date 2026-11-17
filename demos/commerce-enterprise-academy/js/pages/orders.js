/* ============================================================
   orders.js — lista de pedidos fictícios do visitante
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;

  function render() {
    const orders = MOSS.orderService.all();
    if (!orders.length) {
      return '<div class="page">' + MOSS.ui.empty('📋', 'Nenhum pedido ainda', 'Os pedidos criados no checkout aparecerão aqui.', '<a class="btn btn--primary" href="#/produtos">Começar uma compra fictícia</a>') + '</div>';
    }
    return '<div class="page">' +
      '<div class="page-head"><div><span class="eyebrow">Histórico local</span><h1>Meus pedidos</h1>' +
        '<p>Pedidos fictícios criados neste navegador. Use o checkout para gerar novos.</p></div>' +
        '<a class="btn btn--primary" href="#/checkout">Novo pedido →</a></div>' +
      '<div class="grid">' + orders.map(function (o) {
        return '<div class="card card--pad">' +
          '<div class="spread"><div><span class="badge badge--navy">' + u.escapeHtml(o.id) + '</span>' +
            '<div class="small muted">' + u.formatDate(o.createdAt) + '</div></div>' +
            '<span class="badge badge--blue">' + u.escapeHtml(safeStatus(o)) + '</span></div>' +
          '<h3 style="margin-top:.8rem">' + u.escapeHtml(o.customer.name) + '</h3>' +
          '<p class="small muted">' + o.items.length + ' item(ns) · ' + u.money(o.totals.total) + ' · ' + u.escapeHtml(o.shipping.name) + '</p>' +
          '<div class="row"><a class="btn btn--outline btn--sm" href="#/rastrear?id=' + encodeURIComponent(o.id) + '">🚚 Acompanhar</a>' +
            '<button class="btn btn--ghost btn--sm" data-order-details="' + u.escapeHtml(o.id) + '">Ver detalhes</button></div>' +
        '</div>';
      }).join('') + '</div>' +
    '</div>';
  }

  function safeStatus(o) { return (MOSS.orderService.STATUS_LABELS[o.status] || o.status); }

  function bind() {
    const app = document.getElementById('app');
    // #app persiste entre rotas: evita acumular listeners a cada visita.
    if (app.dataset.ordersBound) return;
    app.dataset.ordersBound = '1';
    app.addEventListener('click', function (e) {
      const b = e.target.closest('[data-order-details]');
      if (!b) return;
      const o = MOSS.orderService.byId(b.getAttribute('data-order-details'));
      if (!o) return;
      MOSS.notify.modal({
        title:'Pedido ' + o.id,
        wide:true,
        body:'<p class="small muted">Criado em ' + u.formatDate(o.createdAt) + '</p>' +
          '<div class="table-wrap"><table class="data"><thead><tr><th>Produto</th><th>Qtd.</th><th>Valor</th></tr></thead><tbody>' +
          o.items.map(function (i) { return '<tr><td>' + u.escapeHtml(i.name) + '</td><td>' + i.qty + '</td><td>' + u.money(i.lineTotal) + '</td></tr>'; }).join('') +
          '</tbody></table></div>' +
          '<div class="card card--pad" style="background:var(--surface-2);margin-top:1rem">' +
            '<div class="summary-row"><span>Subtotal</span><span>' + u.money(o.totals.subtotal) + '</span></div>' +
            (o.totals.discount ? '<div class="summary-row summary-row__discount"><span>Desconto</span><span>− ' + u.money(o.totals.discount) + '</span></div>' : '') +
            '<div class="summary-row"><span>Frete</span><span>' + u.money(o.totals.shipping) + '</span></div>' +
            '<div class="summary-row summary-row--total"><span>Total</span><span>' + u.money(o.totals.total) + '</span></div>' +
          '</div>',
        actions:[{ label:'Fechar', className:'btn--outline' }]
      });
    });
  }

  MOSS.pages = MOSS.pages || {};
  MOSS.pages.orders = { render:render, bind:bind };
})(window);
