/* ============================================================
   cart.service.js — regras de negócio do carrinho
   ------------------------------------------------------------
   Conecta o catálogo ao store e centraliza todos os cálculos.
   Toda validação gera mensagem amigável (nunca "erro genérico").
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils, store = MOSS.store, notify = MOSS.notify;

  /** Adiciona com validação de existência, estoque e quantidade. */
  function add(productId, qty) {
    const p = MOSS.catalog.byId(productId);
    if (!p) { notify.toast('Produto inexistente no catálogo.', 'err'); return false; }
    qty = parseInt(qty, 10);
    if (!Number.isFinite(qty) || qty < 1) { notify.toast('Quantidade inválida.', 'err'); return false; }
    const atual = store.get().cart.find(function (i) { return i.id === productId; });
    const nova = (atual ? atual.qty : 0) + qty;
    if (nova > p.stock) {
      notify.toast('Estoque insuficiente. Disponível: ' + p.stock + ' unidade(s).', 'err');
      return false;
    }
    store.addToCart(productId, qty);
    notify.toast(p.name + ' adicionado ao carrinho.', 'ok');
    return true;
  }

  /** Altera quantidade com validação de estoque. */
  function setQty(productId, qty) {
    const p = MOSS.catalog.byId(productId);
    if (!p) { notify.toast('Produto inexistente.', 'err'); return false; }
    qty = parseInt(qty, 10);
    if (!Number.isFinite(qty) || qty < 0) { notify.toast('Quantidade inválida.', 'err'); return false; }
    if (qty > p.stock) { notify.toast('Estoque insuficiente. Máximo: ' + p.stock + '.', 'err'); return false; }
    store.setQty(productId, qty);
    return true;
  }

  function remove(productId) {
    store.removeFromCart(productId);
    notify.toast('Item removido do carrinho.', 'info');
  }

  /** Aplica cupom com validação. */
  function applyCoupon(code) {
    const c = MOSS.coupons.get(code);
    if (!c) { notify.toast('Cupom inválido. Use MOSS10 ou PRIME20.', 'err'); return false; }
    store.setCoupon(c.code);
    notify.toast('Cupom ' + c.code + ' aplicado: ' + c.label + '.', 'ok');
    return true;
  }

  function removeCoupon() { store.setCoupon(null); notify.toast('Cupom removido.', 'info'); }

  /** Linhas do carrinho já com os dados do produto. */
  function lines() {
    return store.get().cart.map(function (item) {
      const p = MOSS.catalog.byId(item.id);
      return p ? { product:p, qty:item.qty, lineTotal:u.round2(p.price * item.qty) } : null;
    }).filter(Boolean);
  }

  function count() {
    return store.get().cart.reduce(function (s, i) { return s + i.qty; }, 0);
  }

  /**
   * Cálculo centralizado. freteId pode ser uma modalidade ou um número avulso.
   * Retorna { subtotal, discount, shipping, total, coupon }.
   */
  function getTotals(freightId) {
    const ls = lines();
    const subtotal = u.round2(ls.reduce(function (s, l) { return s + l.lineTotal; }, 0));
    const cupom = MOSS.coupons.get(store.get().coupon);
    const discount = cupom ? u.round2(subtotal * cupom.percent / 100) : 0;
    let shipping = 0;
    if (typeof freightId === 'number') shipping = freightId;
    else if (freightId) {
      const opt = MOSS.shipping.get(freightId);
      shipping = opt ? opt.price : 0;
    }
    const total = u.round2(Math.max(0, subtotal - discount) + shipping);
    return { subtotal:subtotal, discount:discount, shipping:shipping, total:total, coupon:cupom };
  }

  MOSS.cartService = {
    add: add, setQty: setQty, remove: remove, applyCoupon: applyCoupon,
    removeCoupon: removeCoupon, lines: lines, count: count, getTotals: getTotals
  };
})(window);
