/* ============================================================
   store.js — estado global reativo (muyum de mini "store")
   ------------------------------------------------------------
   Guarda carrinho, pedidos, favoritos, cupom e modo de dados.
   Qualquer mudança notifica inscritos para a UI se atualizar.
   Persistência via localStorage — funciona no modo demonstração.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;

  const KEYS = {
    cart: 'moss_ca_cart_v1',
    orders: 'moss_ca_orders_v1',
    favorites: 'moss_ca_favorites_v1',
    coupon: 'moss_ca_coupon_v1',
    progress: 'moss_ca_progress_v1',
    adminProducts: 'moss_ca_admin_products_v1',
    customProducts: 'moss_ca_custom_products_v1',
    deletedProducts: 'moss_ca_deleted_products_v1',
    stockMovements: 'moss_ca_stock_movements_v1',
    mode: 'moss_ca_mode_v1'
  };

  // Estado em memória, hidratado a partir do localStorage.
  const state = {
    cart: u.lsGet(KEYS.cart, []),          // [{ id, qty }]
    orders: u.lsGet(KEYS.orders, []),      // [pedido]
    favorites: u.lsGet(KEYS.favorites, []),// [id]
    coupon: u.lsGet(KEYS.coupon, null),    // 'MOSS10' | 'PRIME20' | null
    progress: u.lsGet(KEYS.progress, {}),  // { 'FE-001': true, ... }
    adminProducts: u.lsGet(KEYS.adminProducts, null), // overrides de preço/estoque
    customProducts: u.lsGet(KEYS.customProducts, []), // produtos cadastrados no painel
    deletedProducts: u.lsGet(KEYS.deletedProducts, []),// ids ocultados no painel
    stockMovements: u.lsGet(KEYS.stockMovements, []),  // histórico de movimentações
    mode: u.lsGet(KEYS.mode, 'demo')       // 'demo' | 'supabase'
  };

  const listeners = new Set();

  function get() { return state; }

  /** Persiste uma chave e avisa os inscritos. */
  function set(patch, key) {
    Object.assign(state, patch);
    if (key) u.lsSet(KEYS[key], state[key]);
    listeners.forEach(function (fn) { fn(state); });
  }

  function subscribe(fn) { listeners.add(fn); return function () { listeners.delete(fn); }; }

  function persistAll() {
    Object.keys(KEYS).forEach(function (k) { u.lsSet(KEYS[k], state[k]); });
  }

  // --- Ações do carrinho -------------------------------------
  function addToCart(id, qty) {
    qty = Math.max(1, parseInt(qty, 10) || 1);
    const cart = state.cart.slice();
    const idx = cart.findIndex(function (i) { return i.id === id; });
    if (idx >= 0) cart[idx].qty += qty;
    else cart.push({ id: id, qty: qty });
    set({ cart: cart }, 'cart');
  }

  function setQty(id, qty) {
    qty = parseInt(qty, 10) || 0;
    let cart = state.cart.slice();
    if (qty <= 0) cart = cart.filter(function (i) { return i.id !== id; });
    else {
      const idx = cart.findIndex(function (i) { return i.id === id; });
      if (idx >= 0) cart[idx].qty = qty;
    }
    set({ cart: cart }, 'cart');
  }

  function removeFromCart(id) {
    set({ cart: state.cart.filter(function (i) { return i.id !== id; }) }, 'cart');
  }

  function clearCart() { set({ cart: [] }, 'cart'); set({ coupon: null }, 'coupon'); }

  function toggleFavorite(id) {
    const favs = state.favorites.slice();
    const i = favs.indexOf(id);
    if (i >= 0) favs.splice(i, 1); else favs.push(id);
    set({ favorites: favs }, 'favorites');
    return favs.indexOf(id) >= 0;
  }

  function setCoupon(code) { set({ coupon: code }, 'coupon'); }

  function addOrder(order) {
    const orders = [order].concat(state.orders);
    set({ orders: orders }, 'orders');
  }

  function updateOrder(id, patch) {
    const orders = state.orders.map(function (o) {
      return o.id === id ? Object.assign({}, o, patch, { updatedAt: new Date().toISOString() }) : o;
    });
    set({ orders: orders }, 'orders');
  }

  function setProgress(taskId, done) {
    const p = Object.assign({}, state.progress);
    p[taskId] = !!done;
    set({ progress: p }, 'progress');
  }

  function setAdminProducts(overrides) { set({ adminProducts: overrides }, 'adminProducts'); }
  function setMode(mode) { set({ mode: mode }, 'mode'); }

  // --- Cadastro e estoque (painel administrativo) ------------
  function addProduct(product) {
    const list = state.customProducts.slice();
    list.unshift(product);
    set({ customProducts: list }, 'customProducts');
  }

  function updateProduct(id, patch) {
    const list = state.customProducts.map(function (p) {
      return p.id === id ? Object.assign({}, p, patch) : p;
    });
    set({ customProducts: list }, 'customProducts');
  }

  function deleteProduct(id) {
    const list = (state.deletedProducts || []).slice();
    if (list.indexOf(id) < 0) list.push(id);
    set({ deletedProducts: list }, 'deletedProducts');
  }

  function restoreProduct(id) {
    set({ deletedProducts: (state.deletedProducts || []).filter(function (x) { return x !== id; }) }, 'deletedProducts');
  }

  function recordStock(id, delta, reason) {
    const list = [{ id:id, delta:delta, reason:reason || 'Ajuste manual', at:new Date().toISOString() }]
      .concat(state.stockMovements || []).slice(0, 100);
    set({ stockMovements: list }, 'stockMovements');
  }

  function resetAll() {
    u.lsRemove(KEYS.cart); u.lsRemove(KEYS.orders); u.lsRemove(KEYS.favorites);
    u.lsRemove(KEYS.coupon); u.lsRemove(KEYS.adminProducts);
    u.lsRemove(KEYS.customProducts); u.lsRemove(KEYS.deletedProducts); u.lsRemove(KEYS.stockMovements);
    set({ cart: [], orders: [], favorites: [], coupon: null, adminProducts: null,
          customProducts: [], deletedProducts: [], stockMovements: [] });
  }

  MOSS.store = {
    KEYS: KEYS, get: get, set: set, subscribe: subscribe, persistAll: persistAll,
    addToCart: addToCart, setQty: setQty, removeFromCart: removeFromCart, clearCart: clearCart,
    toggleFavorite: toggleFavorite, setCoupon: setCoupon, addOrder: addOrder,
    updateOrder: updateOrder, setProgress: setProgress, setAdminProducts: setAdminProducts,
    setMode: setMode, resetAll: resetAll,
    addProduct: addProduct, updateProduct: updateProduct, deleteProduct: deleteProduct,
    restoreProduct: restoreProduct, recordStock: recordStock
  };
})(window);
