/* ============================================================
   cart.js — carrinho com quantidades, cupom e totais
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;

  function render() {
    const linhas = MOSS.cartService.lines();
    if (!linhas.length) {
      return '<div class="page">' + MOSS.ui.empty('🛒', 'Seu carrinho está vazio', 'Explore o catálogo e adicione produtos fictícios para testar o carrinho.', '<a class="btn btn--primary" href="#/produtos">Explorar produtos</a>') + '</div>';
    }
    return '<div class="page">' +
      '<div class="page-head"><div><span class="eyebrow">Etapa 1 do checkout</span><h1>Seu carrinho</h1>' +
        '<p>Confira produtos e quantidades. Todos os valores são fictícios.</p></div>' +
        '<a class="btn btn--primary" href="#/checkout">Ir para o checkout →</a></div>' +
      '<div class="grid grid--side">' +
        '<div class="card"><div class="card__head"><h3>Itens (' + MOSS.cartService.count() + ')</h3>' +
          '<button class="btn btn--ghost btn--sm" id="clear-cart">Esvaziar</button></div>' +
          '<div class="card__body" id="cart-items">' + itemsHtml() + '</div></div>' +

        '<div class="card"><div class="card__head"><h3>Resumo</h3></div><div class="card__body">' +
          '<div id="coupon-area">' + couponHtml() + '</div>' +
          '<div id="summary">' + summaryHtml() + '</div>' +
          '<a class="btn btn--primary btn--block" href="#/checkout" style="margin-top:1rem">Finalizar compra →</a>' +
          '<p class="tiny muted" style="margin-top:.8rem">Frete é calculado na próxima etapa. Nenhuma cobrança será feita.</p>' +
        '</div></div>' +
      '</div>' +
    '</div>';
  }

  function itemsHtml() {
    return MOSS.cartService.lines().map(function (l) {
      return '<div class="cart-item" data-line="' + l.product.id + '">' +
        '<div class="cart-item__img">' + MOSS.catalog.img(l.product, '', 0) + '</div>' +
        '<div><div class="cart-item__name">' + u.escapeHtml(l.product.name) + '</div>' +
          '<div class="small muted">' + u.money(l.product.price) + ' / un. · estoque ' + l.product.stock + '</div>' +
          '<div class="row" style="margin-top:.5rem">' +
            '<div class="qty" role="group" aria-label="Quantidade de ' + u.escapeHtml(l.product.name) + '">' +
              '<button type="button" data-dec="' + l.product.id + '" aria-label="Diminuir">−</button>' +
              '<input type="number" value="' + l.qty + '" min="1" max="' + l.product.stock + '" data-qty="' + l.product.id + '" aria-label="Quantidade">' +
              '<button type="button" data-inc="' + l.product.id + '" aria-label="Aumentar">+</button>' +
            '</div>' +
            '<button class="btn btn--ghost btn--sm" data-remove="' + l.product.id + '">Remover</button>' +
          '</div>' +
        '</div>' +
        '<div class="cart-item__price">' + u.money(l.lineTotal) + '</div>' +
      '</div>';
    }).join('');
  }

  function couponHtml() {
    const code = MOSS.store.get().coupon;
    if (code) {
      return '<div class="row"><span class="badge badge--green">✓ ' + u.escapeHtml(code) + ' aplicado</span>' +
        '<button class="btn btn--ghost btn--sm" id="remove-coupon">Remover</button></div>';
    }
    return '<div class="field"><label for="coupon">Cupom de desconto (fictício)</label>' +
      '<div class="coupon-form"><input id="coupon" placeholder="MOSS10 ou PRIME20" autocomplete="off">' +
      '<button class="btn btn--navy" id="apply-coupon">Aplicar</button></div>' +
      '<span class="field__hint">Experimente MOSS10 (10%) ou PRIME20 (20%).</span></div>';
  }

  function summaryHtml() {
    const t = MOSS.cartService.getTotals();
    return '<div class="summary-row"><span>Subtotal</span><span>' + u.money(t.subtotal) + '</span></div>' +
      (t.discount ? '<div class="summary-row summary-row__discount"><span>Desconto (' + t.coupon.code + ')</span><span>− ' + u.money(t.discount) + '</span></div>' : '') +
      '<div class="summary-row"><span>Frete</span><span class="muted">A calcular</span></div>' +
      '<div class="summary-row summary-row--total"><span>Total parcial</span><span>' + u.money(t.total) + '</span></div>';
  }

  function bind() {
    const app = document.getElementById('app');

    function refresh() {
      app.querySelector('#cart-items').innerHTML = itemsHtml();
      app.querySelector('#coupon-area').innerHTML = couponHtml();
      app.querySelector('#summary').innerHTML = summaryHtml();
      MOSS.layout.updateBadge();
      bindItemEvents();
      bindCouponEvents();
    }

    function bindItemEvents() {
      app.querySelectorAll('[data-dec]').forEach(function (b) {
        b.addEventListener('click', function () {
          const id = b.getAttribute('data-dec');
          const item = MOSS.store.get().cart.find(function (i) { return i.id === id; });
          MOSS.cartService.setQty(id, (item ? item.qty : 1) - 1);
          if (!MOSS.cartService.lines().length) return MOSS.router.render();
          refresh();
        });
      });
      app.querySelectorAll('[data-inc]').forEach(function (b) {
        b.addEventListener('click', function () {
          const id = b.getAttribute('data-inc');
          const item = MOSS.store.get().cart.find(function (i) { return i.id === id; });
          MOSS.cartService.setQty(id, (item ? item.qty : 0) + 1);
          refresh();
        });
      });
      app.querySelectorAll('[data-qty]').forEach(function (inp) {
        inp.addEventListener('change', function () {
          MOSS.cartService.setQty(inp.getAttribute('data-qty'), parseInt(inp.value, 10));
          if (!MOSS.cartService.lines().length) return MOSS.router.render();
          refresh();
        });
      });
      app.querySelectorAll('[data-remove]').forEach(function (b) {
        b.addEventListener('click', function () {
          MOSS.cartService.remove(b.getAttribute('data-remove'));
          if (!MOSS.cartService.lines().length) return MOSS.router.render();
          refresh();
        });
      });
    }

    function bindCouponEvents() {
      const apply = app.querySelector('#apply-coupon');
      if (apply) apply.addEventListener('click', function () {
        const code = app.querySelector('#coupon').value;
        if (MOSS.cartService.applyCoupon(code)) refresh();
      });
      const inp = app.querySelector('#coupon');
      if (inp) inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); if (MOSS.cartService.applyCoupon(inp.value)) refresh(); }
      });
      const rem = app.querySelector('#remove-coupon');
      if (rem) rem.addEventListener('click', function () { MOSS.cartService.removeCoupon(); refresh(); });
    }

    const clear = app.querySelector('#clear-cart');
    if (clear) clear.addEventListener('click', function () {
      MOSS.notify.confirm('Esvaziar carrinho?', 'Todos os itens serão removidos.', function () {
        MOSS.store.clearCart(); MOSS.router.render();
      }, true);
    });

    bindItemEvents();
    bindCouponEvents();
  }

  MOSS.pages = MOSS.pages || {};
  MOSS.pages.cart = { render:render, bind:bind };
})(window);
