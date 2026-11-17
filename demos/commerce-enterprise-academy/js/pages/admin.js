/* ============================================================
   admin.js — painel demonstrativo com cadastro e estoque
   ------------------------------------------------------------
   Todos os dados vêm da simulação local. Não representa a MOSS
   Digital. No modo Supabase, exigir admin autenticado.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;

  const LOGS_KEY = 'moss_ca_admin_log_v1';
  const uiState = { stockSearch:'', stockFilter:'all', showForm:false };

  function logs() { return u.lsGet(LOGS_KEY, []); }
  function log(action) {
    const l = [{ at:new Date().toISOString(), action:action }].concat(logs()).slice(0, 50);
    u.lsSet(LOGS_KEY, l);
  }

  function paidOrders() { return MOSS.orderService.all().filter(function (o) { return o.payment.status === 'pago' || o.status === 'entregue'; }); }
  function revenue() { return u.round2(paidOrders().reduce(function (s, o) { return s + o.totals.total; }, 0)); }

  function topProducts() {
    const map = {};
    MOSS.orderService.all().forEach(function (o) { o.items.forEach(function (i) { map[i.id] = (map[i.id] || 0) + i.qty; }); });
    return Object.keys(map).map(function (id) {
      const p = MOSS.catalog.byId(id);
      return { id:id, name:p ? p.name : id, qty:map[id] };
    }).sort(function (a, b) { return b.qty - a.qty; }).slice(0, 5);
  }

  function render() {
    const orders = MOSS.orderService.all();
    const sb = MOSS.supabaseService.status();
    const tops = topProducts();
    const max = Math.max.apply(null, tops.map(function (t) { return t.qty; }).concat([1]));
    const baixos = MOSS.adminService.lowStock(10);
    const total = MOSS.catalog.all().length;

    return '<div class="page">' +
      '<div class="admin-banner">⚠️ <strong>Painel demonstrativo.</strong> Produtos, preços e estoques são fictícios e existem apenas neste navegador.</div>' +

      '<div class="card card--pad" style="margin-bottom:1.2rem">' +
        '<div class="spread"><div><h3>Modo de dados</h3><p class="small muted">' + u.escapeHtml(sb.reason) + '. ' +
          'Nesta demonstração o cadastro de produtos é livre: <strong>não é preciso senha nem login</strong>.</p></div>' +
          '<span class="badge ' + (sb.connected?'badge--green':'badge--outline') + '">' + (sb.connected?'Conectado':'Demonstração') + '</span></div>' +
      '</div>' +

      '<div class="page-head"><div><span class="eyebrow">Administração</span><h1>Painel administrativo</h1>' +
        '<p>Cadastre produtos, ajuste estoque, acompanhe pedidos e indicadores da simulação.</p></div>' +
        '<div class="row"><button class="btn btn--primary" id="toggle-form">' + (uiState.showForm?'✕ Fechar formulário':'+ Cadastrar produto') + '</button>' +
        '<button class="btn btn--outline" id="admin-reset">Redefinir simulação</button></div></div>' +

      (uiState.showForm ? formHtml() : '') +

      '<div class="grid grid--4">' +
        '<div class="stat"><span class="stat__icon">📦</span><span class="stat__label">Pedidos</span><span class="stat__value">' + orders.length + '</span><span class="stat__hint">Criados na demonstração</span></div>' +
        '<div class="stat"><span class="stat__icon">💰</span><span class="stat__label">Faturamento fictício</span><span class="stat__value">' + u.money(revenue()) + '</span><span class="stat__hint">Pedidos pagos (simulação)</span></div>' +
        '<div class="stat"><span class="stat__icon">🛍️</span><span class="stat__label">Produtos</span><span class="stat__value">' + total + '</span><span class="stat__hint">' + baixos.length + ' com estoque baixo</span></div>' +
        '<div class="stat"><span class="stat__icon">⚠️</span><span class="stat__label">Estoque baixo</span><span class="stat__value">' + baixos.length + '</span><span class="stat__hint">Até 10 unidades</span></div>' +
      '</div>' +

      '<div class="grid grid--2" style="margin-top:1.2rem">' +
        '<div class="card"><div class="card__head"><h3>Produtos mais vendidos (simulação)</h3></div><div class="card__body">' +
          (tops.length ? '<div class="chart">' + tops.map(function (t) {
            return '<div class="chart__col"><div class="chart__bar" style="height:' + Math.round(t.qty/max*100) + '%"></div><span class="chart__label">' + u.escapeHtml(t.name.split(' ').slice(0,2).join(' ')) + '</span></div>';
          }).join('') + '</div>' : '<p class="muted">Ainda não há vendas simuladas.</p>') +
        '</div></div>' +
        '<div class="card"><div class="card__head"><h3>Histórico de eventos</h3></div><div class="card__body">' +
          (logs().length ? '<ul class="log-list">' + logs().map(function (l) {
            return '<li><time>' + u.formatDate(l.at) + '</time><span>' + u.escapeHtml(l.action) + '</span></li>';
          }).join('') + '</ul>' : '<p class="muted">Nenhuma ação administrativa ainda.</p>') +
        '</div></div>' +
      '</div>' +

      // --- Controle de estoque --------------------------------
      '<div class="card" style="margin-top:1.2rem"><div class="card__head"><h3>📊 Controle de estoque</h3>' +
        '<span class="small muted">' + MOSS.adminService.movements().length + ' movimentações registradas</span></div>' +
        '<div class="card__body">' +
          '<div class="row" style="margin-bottom:1rem">' +
            '<div class="search-box grow"><span class="search-box__icon">🔍</span>' +
              '<input id="stock-search" placeholder="Buscar produto por nome ou ID…" value="' + u.escapeHtml(uiState.stockSearch) + '"></div>' +
            '<select id="stock-filter" aria-label="Filtrar estoque">' +
              '<option value="all"' + (uiState.stockFilter==='all'?' selected':'') + '>Todos</option>' +
              '<option value="low"' + (uiState.stockFilter==='low'?' selected':'') + '>Estoque baixo (≤10)</option>' +
              '<option value="out"' + (uiState.stockFilter==='out'?' selected':'') + '>Esgotados</option>' +
              '<option value="custom"' + (uiState.stockFilter==='custom'?' selected':'') + '>Cadastrados no painel</option>' +
            '</select>' +
          '</div>' +
          '<div id="stock-table">' + stockTableHtml() + '</div>' +
        '</div></div>' +

      // --- Movimentações --------------------------------------
      '<div class="card" style="margin-top:1.2rem"><div class="card__head"><h3>↕️ Movimentações de estoque</h3></div>' +
        '<div class="card__body">' + movementsHtml() + '</div></div>' +

      // --- Produtos ocultos -----------------------------------
      (hiddenHtml()) +

      // --- Pedidos --------------------------------------------
      '<div class="card" style="margin-top:1.2rem"><div class="card__head"><h3>Pedidos e status</h3></div><div class="card__body">' +
        (orders.length ? '<div class="table-wrap"><table class="data"><thead><tr><th>Pedido</th><th>Cliente</th><th>Total</th><th>Status</th><th>Ações</th></tr></thead><tbody>' +
          orders.map(function (o) {
            return '<tr><td>' + o.id + '</td><td>' + u.escapeHtml(o.customer.name) + '</td><td>' + u.money(o.totals.total) + '</td>' +
              '<td><span class="badge badge--blue">' + u.escapeHtml(o.status) + '</span></td>' +
              '<td class="row" style="gap:.3rem">' +
                '<button class="btn btn--ghost btn--sm" data-advance="' + o.id + '"' + (o.status==='entregue'?' disabled':'') + '>Avançar</button>' +
                '<button class="btn btn--outline btn--sm" data-refund="' + o.id + '">Devolver</button>' +
              '</td></tr>';
          }).join('') + '</tbody></table></div>' : '<p class="muted">Nenhum pedido criado ainda.</p>') +
      '</div></div>' +

      '<div class="note" style="margin-top:1.2rem">🔐 Aqui você pode cadastrar livremente — <strong>sem senha</strong>. Em uma operação real com Supabase, o acesso administrativo exigiria login e políticas RLS; a chave de serviço nunca vai para o navegador. <a href="#/tecnologias">Saiba mais</a>.</div>' +
    '</div>';
  }

  function formHtml() {
    const cats = MOSS.catalog.categories();
    return '<div class="card card--pad" style="margin-bottom:1.4rem;border-color:var(--accent-500)">' +
      '<h3>➕ Cadastrar novo produto (fictício)</h3>' +
      '<p class="small muted">O produto aparecerá imediatamente na loja. Nenhum dado real é alterado.</p>' +
      '<form id="product-form">' +
        '<div class="form-grid">' +
          '<div class="field" style="grid-column:1/-1"><label for="p-name">Nome do produto *</label><input id="p-name" name="name" required placeholder="Ex.: Smartphone Moss Novo 128GB"></div>' +
          '<div class="field"><label for="p-category">Categoria *</label><select id="p-category" name="category">' +
            cats.map(function (c) { return '<option value="' + c.id + '">' + c.icon + ' ' + c.name + '</option>'; }).join('') +
          '</select></div>' +
          '<div class="field"><label for="p-photo">Foto do produto</label><select id="p-photo" name="photoIndex">' +
            MOSS.adminService.PHOTO_SUGESTIONS.map(function (s) { return '<option value="' + s.index + '">' + s.label + '</option>'; }).join('') +
          '</select></div>' +
          '<div class="field"><label for="p-price">Preço (R$) *</label><input id="p-price" name="price" type="number" step="0.01" min="0" required placeholder="299.90"></div>' +
          '<div class="field"><label for="p-old">Preço anterior (R$)</label><input id="p-old" name="oldPrice" type="number" step="0.01" min="0" placeholder="Opcional"></div>' +
          '<div class="field"><label for="p-stock">Estoque inicial *</label><input id="p-stock" name="stock" type="number" min="0" required value="10"></div>' +
          '<div class="field"><label for="p-shop">Vendedor</label><input id="p-shop" name="shop" value="Moss Store Oficial"></div>' +
          '<div class="field"><label for="p-loc">Localização</label><input id="p-loc" name="location" value="São Paulo, SP"></div>' +
          '<div class="field" style="grid-column:1/-1"><label for="p-desc">Descrição</label><textarea id="p-desc" name="description" rows="2" placeholder="Descrição fictícia do produto"></textarea></div>' +
        '</div>' +
        '<label class="row small"><input type="checkbox" name="freeShipping" checked> Frete grátis (simulado)</label>' +
        '<div class="row" style="margin-top:1rem"><button class="btn btn--primary" type="submit">Cadastrar produto</button>' +
        '<button class="btn btn--outline" type="button" id="cancel-form">Cancelar</button></div>' +
      '</form>' +
    '</div>';
  }

  function stockRows() {
    const term = u.normalize(uiState.stockSearch);
    return MOSS.catalog.all().filter(function (p) {
      if (term && u.normalize(p.name + ' ' + p.id).indexOf(term) < 0) return false;
      if (uiState.stockFilter === 'low' && p.stock > 10) return false;
      if (uiState.stockFilter === 'out' && p.stock > 0) return false;
      if (uiState.stockFilter === 'custom' && !p.createdByAdmin) return false;
      return true;
    });
  }

  function stockTableHtml() {
    const rows = stockRows().slice(0, 60);
    if (!rows.length) return MOSS.ui.empty('🔍', 'Nenhum produto encontrado', 'Ajuste a busca ou o filtro.');
    return '<div class="table-wrap"><table class="data"><thead><tr><th>Produto</th><th>Categoria</th><th>Preço</th><th>Estoque</th><th>Status</th><th>Ajuste</th><th></th></tr></thead><tbody>' +
      rows.map(function (p) {
        const status = p.stock <= 0 ? '<span class="badge badge--red">Esgotado</span>' :
          p.stock <= 10 ? '<span class="badge badge--accent">Baixo</span>' :
          '<span class="badge badge--green">OK</span>';
        return '<tr><td><strong>' + u.escapeHtml(p.name) + '</strong><br><span class="tiny muted">' + p.id + '</span></td>' +
          '<td class="small">' + u.escapeHtml(MOSS.catalog.categoryName(p.category)) + '</td>' +
          '<td><input type="number" step="0.01" min="0" style="width:100px;padding:.35rem" data-price="' + p.id + '" value="' + p.price + '" aria-label="Preço"></td>' +
          '<td><input type="number" min="0" style="width:70px;padding:.35rem" data-stock="' + p.id + '" value="' + p.stock + '" aria-label="Estoque"></td>' +
          '<td>' + status + '</td>' +
          '<td class="row" style="gap:.25rem">' +
            '<button class="btn btn--ghost btn--sm" data-dec="' + p.id + '" aria-label="Diminuir estoque">−</button>' +
            '<button class="btn btn--ghost btn--sm" data-inc="' + p.id + '" aria-label="Aumentar estoque">+</button>' +
          '</td>' +
          '<td class="row" style="gap:.25rem">' +
            '<button class="btn btn--navy btn--sm" data-save="' + p.id + '">Salvar</button>' +
            '<button class="btn btn--outline btn--sm" data-remove="' + p.id + '">Excluir</button>' +
          '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      (stockRows().length > 60 ? '<p class="small muted" style="margin-top:.7rem">Mostrando 60 de ' + stockRows().length + '. Use a busca para reduzir.</p>' : '');
  }

  function movementsHtml() {
    const m = MOSS.adminService.movements();
    if (!m.length) return '<p class="muted">Nenhuma movimentação ainda. Ajuste um estoque para começar.</p>';
    return '<ul class="log-list">' + m.slice(0, 20).map(function (x) {
      const sinal = x.delta > 0 ? '+' : '';
      const cor = x.delta > 0 ? 'var(--green-500)' : 'var(--red-500)';
      return '<li><time>' + u.formatDate(x.at) + '</time><span><strong style="color:' + cor + '">' + sinal + x.delta + '</strong> · ' +
        u.escapeHtml(x.id) + ' — ' + u.escapeHtml(x.reason) + '</span></li>';
    }).join('') + '</ul>';
  }

  function hiddenHtml() {
    const hidden = MOSS.store.get().deletedProducts || [];
    if (!hidden.length) return '';
    return '<div class="card" style="margin-top:1.2rem"><div class="card__head"><h3>Produtos ocultados</h3></div><div class="card__body">' +
      '<div class="row">' + hidden.map(function (id) {
        return '<span class="badge badge--outline">' + u.escapeHtml(id) +
          ' <button class="btn btn--ghost btn--sm" data-restore="' + u.escapeHtml(id) + '">Restaurar</button></span>';
      }).join('') + '</div></div></div>';
  }

  function refreshStock() {
    const app = document.getElementById('app');
    app.querySelector('#stock-table').innerHTML = stockTableHtml();
    bindStockTable();
  }

  function bindStockTable() {
    const app = document.getElementById('app');

    app.querySelectorAll('[data-inc]').forEach(function (b) {
      b.addEventListener('click', function () { MOSS.adminService.adjustStock(b.getAttribute('data-inc'), 1); refreshStock(); });
    });
    app.querySelectorAll('[data-dec]').forEach(function (b) {
      b.addEventListener('click', function () { MOSS.adminService.adjustStock(b.getAttribute('data-dec'), -1); refreshStock(); });
    });
    app.querySelectorAll('[data-save]').forEach(function (b) {
      b.addEventListener('click', function () {
        const id = b.getAttribute('data-save');
        const price = Number(app.querySelector('[data-price="' + id + '"]').value);
        const stock = parseInt(app.querySelector('[data-stock="' + id + '"]').value, 10);
        if (!Number.isFinite(price) || price < 0 || !Number.isFinite(stock) || stock < 0) {
          MOSS.notify.toast('Valores inválidos.', 'err'); return;
        }
        MOSS.adminService.setPrice(id, price);
        MOSS.adminService.setStock(id, stock, 'Atualização via painel');
        log('Preço/estoque atualizado: ' + id);
        refreshStock();
      });
    });
    app.querySelectorAll('[data-remove]').forEach(function (b) {
      b.addEventListener('click', function () {
        MOSS.adminService.remove(b.getAttribute('data-remove'));
      });
    });
    app.querySelectorAll('[data-restore]').forEach(function (b) {
      b.addEventListener('click', function () { MOSS.adminService.restore(b.getAttribute('data-restore')); });
    });
  }

  function bind() {
    const app = document.getElementById('app');

    const toggle = app.querySelector('#toggle-form');
    if (toggle) toggle.addEventListener('click', function () { uiState.showForm = !uiState.showForm; MOSS.router.render(); });
    const cancel = app.querySelector('#cancel-form');
    if (cancel) cancel.addEventListener('click', function () { uiState.showForm = false; MOSS.router.render(); });

    const form = app.querySelector('#product-form');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      const fd = new FormData(form);
      const dados = {
        name:fd.get('name'), category:fd.get('category'), price:fd.get('price'),
        oldPrice:fd.get('oldPrice'), stock:fd.get('stock'), shop:fd.get('shop'),
        location:fd.get('location'), description:fd.get('description'),
        photoIndex:fd.get('photoIndex'), freeShipping:fd.get('freeShipping') === 'on'
      };
      const created = MOSS.adminService.createProduct(dados);
      if (created) { log('Produto cadastrado: ' + created.name + ' (' + created.id + ')'); uiState.showForm = false; MOSS.router.render(); }
    });

    const search = app.querySelector('#stock-search');
    if (search) search.addEventListener('input', u.debounce(function (e) {
      uiState.stockSearch = e.target.value; refreshStock();
    }, 150));

    const filter = app.querySelector('#stock-filter');
    if (filter) filter.addEventListener('change', function (e) {
      uiState.stockFilter = e.target.value; refreshStock();
    });

    app.querySelectorAll('[data-advance]').forEach(function (b) {
      b.addEventListener('click', function () {
        const next = MOSS.orderService.advance(b.getAttribute('data-advance'), 'Avançado no painel demonstrativo.');
        if (next) { log('Pedido avançado: ' + next.id + ' → ' + next.status); MOSS.notify.toast('Pedido avançou para ' + next.status, 'ok'); }
        MOSS.router.render();
      });
    });
    app.querySelectorAll('[data-refund]').forEach(function (b) {
      b.addEventListener('click', function () {
        const id = b.getAttribute('data-refund');
        MOSS.notify.confirm('Simular devolução', 'Registrará uma devolução fictícia no pedido ' + id + '.', function () {
          MOSS.orderService.refund(id, 'Devolução solicitada no painel.');
          log('Devolução simulada: ' + id);
          MOSS.router.render();
        }, true);
      });
    });

    const reset = app.querySelector('#admin-reset');
    if (reset) reset.addEventListener('click', function () {
      MOSS.notify.confirm('Redefinir simulação?', 'Carrinho, pedidos, produtos cadastrados e estoques serão apagados.', function () {
        MOSS.store.resetAll(); u.lsRemove(LOGS_KEY); uiState.showForm = false; MOSS.router.render();
      }, true);
    });

    bindStockTable();
  }

  MOSS.pages = MOSS.pages || {};
  MOSS.pages.admin = { render:render, bind:bind };
})(window);
