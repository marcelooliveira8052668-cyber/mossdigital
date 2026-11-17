/* ============================================================
   admin.service.js — cadastro de produtos e controle de estoque
   ------------------------------------------------------------
   Todas as alterações são locais (localStorage) e afetam apenas
   esta demonstração. Nenhum dado real de estoque é modificado.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils, store = MOSS.store, notify = MOSS.notify;

  const PHOTO_SUGESTIONS = [
    { label:'Celular', index:5 }, { label:'Notebook', index:16 }, { label:'Desktop gamer', index:10 },
    { label:'Smartwatch', index:22 }, { label:'TV', index:6 }, { label:'Caixa de som', index:33 },
    { label:'Fone', index:30 }, { label:'Câmera', index:46 }, { label:'Relógio', index:25 },
    { label:'Tênis', index:53 }, { label:'Mochila', index:49 }, { label:'Livro', index:76 },
    { label:'Carro', index:87 }, { label:'Cama e banho', index:110 }, { label:'Cozinha', index:104 }
  ];

  function isCustom(id) {
    return (store.get().customProducts || []).some(function (p) { return p.id === id; });
  }

  /** Cria um produto novo a partir do formulário do painel. */
  function createProduct(data) {
    const name = String(data.name || '').trim();
    const price = Number(data.price);
    const stockQty = parseInt(data.stock, 10);
    if (!name) { notify.toast('Informe o nome do produto.', 'err'); return null; }
    if (!Number.isFinite(price) || price < 0) { notify.toast('Preço inválido.', 'err'); return null; }
    if (!Number.isFinite(stockQty) || stockQty < 0) { notify.toast('Estoque inválido.', 'err'); return null; }

    const cat = data.category || 'utilidades';
    const catObj = MOSS.catalog.categories().find(function (c) { return c.id === cat; }) || {};
    const product = {
      id: u.uid('CAD'),
      name: name,
      category: cat,
      price: u.round2(price),
      oldPrice: data.oldPrice ? u.round2(Number(data.oldPrice)) : 0,
      stock: stockQty,
      rating: 5, reviews: 0, sold: 0,
      photoIndex: Number.isFinite(Number(data.photoIndex)) ? Number(data.photoIndex) : 0,
      icon: iconFor(cat), bg: ['#0b1f3a', '#275a94'],
      desc: String(data.description || '').trim() || 'Produto cadastrado no painel demonstrativo.',
      specs: {
        'Categoria': catObj.name || cat,
        'Vendedor': String(data.shop || 'Moss Store Oficial').trim(),
        'Origem': String(data.location || 'São Paulo, SP').trim(),
        'Garantia': '12 meses (fictícia)'
      },
      shop: String(data.shop || 'Moss Store Oficial').trim(),
      location: String(data.location || 'São Paulo, SP').trim(),
      freeShipping: !!data.freeShipping,
      createdByAdmin: true
    };

    store.addProduct(product);
    store.recordStock(product.id, stockQty, 'Cadastro de produto');
    notify.toast('Produto "' + name + '" cadastrado com sucesso.', 'ok');
    return product;
  }

  function iconFor(cat) {
    const map = {
      celulares:'phone', notebooks:'laptop', pcs:'pc', relogios:'watch', tvs:'tv',
      audio:'speaker', informatica:'keyboard', camera:'camera', casa:'lamp',
      moda:'shirt', esportes:'bike', utilidades:'coffee', vestuario:'shirt',
      livros:'book', auto:'car', 'cama-mesa-banho':'bed', cozinha:'coffee'
    };
    return map[cat] || 'phone';
  }

  /** Define preço (custom products direto; demais via override). */
  function setPrice(id, price) {
    price = u.round2(price);
    if (!Number.isFinite(price) || price < 0) { notify.toast('Preço inválido.', 'err'); return false; }
    if (isCustom(id)) store.updateProduct(id, { price:price });
    else {
      const overrides = Object.assign({}, store.get().adminProducts || {});
      const p = MOSS.catalog.byId(id);
      overrides[id] = { price:price, stock: p ? p.stock : 0 };
      store.setAdminProducts(overrides);
    }
    return true;
  }

  /** Ajusta estoque com delta (+ / -) e registra a movimentação. */
  function adjustStock(id, delta, reason) {
    delta = parseInt(delta, 10);
    if (!Number.isFinite(delta)) { notify.toast('Quantidade inválida.', 'err'); return false; }
    const p = MOSS.catalog.byId(id);
    if (!p) { notify.toast('Produto não encontrado.', 'err'); return false; }
    const novo = Math.max(0, p.stock + delta);
    if (isCustom(id)) store.updateProduct(id, { stock:novo });
    else {
      const overrides = Object.assign({}, store.get().adminProducts || {});
      overrides[id] = { price:p.price, stock:novo };
      store.setAdminProducts(overrides);
    }
    store.recordStock(id, novo - p.stock, reason || 'Ajuste manual no painel');
    notify.toast('Estoque de ' + p.name + ' ajustado para ' + novo + '.', 'ok', 2000);
    return true;
  }

  /** Define estoque absoluto (usado no campo numérico da tabela). */
  function setStock(id, qty, reason) {
    const p = MOSS.catalog.byId(id);
    if (!p) return false;
    return adjustStock(id, parseInt(qty, 10) - p.stock, reason);
  }

  function remove(id) {
    MOSS.notify.confirm('Remover produto?', 'O produto deixará de aparecer na loja. Nenhum dado real é afetado.', function () {
      if (isCustom(id)) {
        const list = store.get().customProducts.filter(function (p) { return p.id !== id; });
        store.set({ customProducts: list }, 'customProducts');
      } else {
        store.deleteProduct(id);
      }
      store.recordStock(id, 0, 'Produto removido do catálogo');
      notify.toast('Produto removido da vitrine.', 'info');
      MOSS.router.render();
    }, true);
  }

  function restore(id) {
    store.restoreProduct(id);
    notify.toast('Produto restaurado na vitrine.', 'ok');
    MOSS.router.render();
  }

  function movements() { return (store.get().stockMovements || []).slice(); }

  function lowStock(limit) {
    const max = limit || 10;
    return MOSS.catalog.all().filter(function (p) { return p.stock <= max; });
  }

  MOSS.adminService = {
    PHOTO_SUGESTIONS: PHOTO_SUGESTIONS, createProduct: createProduct,
    setPrice: setPrice, adjustStock: adjustStock, setStock: setStock,
    remove: remove, restore: restore, movements: movements, lowStock: lowStock
  };
})(window);
