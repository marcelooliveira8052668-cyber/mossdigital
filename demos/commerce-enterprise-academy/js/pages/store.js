/* ============================================================
   store.js — catálogo marketplace com busca, filtros e paginação
   ------------------------------------------------------------
   Aceita ?q=termo e ?cat=categoria pela URL (hash).
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;

  const filters = { term:'', category:'all', sort:'relevance', onlyFavs:false, onlyFree:false };
  let visible = 24;

  function apply() {
    let list = MOSS.catalog.all();
    if (filters.term) {
      const t = u.normalize(filters.term);
      list = list.filter(function (p) {
        return u.normalize(p.name + ' ' + p.description + ' ' + MOSS.catalog.categoryName(p.category) +
          ' ' + (p.shop || '')).indexOf(t) >= 0;
      });
    }
    if (filters.category !== 'all') list = list.filter(function (p) { return p.category === filters.category; });
    if (filters.onlyFavs) {
      const favs = MOSS.store.get().favorites;
      list = list.filter(function (p) { return favs.indexOf(p.id) >= 0; });
    }
    if (filters.onlyFree) list = list.filter(function (p) { return p.freeShipping; });
    if (filters.sort === 'asc') list.sort(function (a, b) { return a.price - b.price; });
    if (filters.sort === 'desc') list.sort(function (a, b) { return b.price - a.price; });
    if (filters.sort === 'rating') list.sort(function (a, b) { return b.rating - a.rating; });
    if (filters.sort === 'sold') list.sort(function (a, b) { return (b.sold || 0) - (a.sold || 0); });
    return list;
  }

  function gridHtml() {
    const list = apply();
    if (!list.length) {
      return MOSS.ui.empty('🔍', 'Nenhum produto encontrado', 'Tente outro termo ou remova os filtros.', '<button class="btn btn--outline" id="clear-filters">Limpar filtros</button>');
    }
    const page = list.slice(0, visible);
    let html = '<div class="grid grid--auto">' + page.map(MOSS.productCard.render).join('') + '</div>';
    if (list.length > visible) {
      html += '<div class="text-center" style="margin-top:1.5rem">' +
        '<button class="btn btn--navy btn--lg" id="load-more">Carregar mais produtos</button></div>';
    }
    return html;
  }

  function render() {
    const cats = MOSS.catalog.categories();
    return '<div class="page">' +
      '<div class="page-head"><div><span class="eyebrow">Marketplace · ' + MOSS.catalog.all().length + ' produtos</span>' +
        '<h1>Produtos</h1><p>Pesquise sem acentos, filtre por categoria, vendedor ou frete grátis. Todos os produtos são fictícios.</p></div>' +
        '<a class="btn btn--outline" href="#/laboratorio">🔬 Ver esta busca no laboratório</a></div>' +

      '<div class="store-toolbar">' +
        '<div class="search-box"><span class="search-box__icon">🔍</span>' +
          '<input id="search" type="search" placeholder="Buscar produtos, marcas, vendedores…" value="' + u.escapeHtml(filters.term) + '" ' +
          'aria-label="Pesquisar produtos" autocomplete="off"></div>' +
        '<select id="sort" aria-label="Ordenar por">' +
          '<option value="relevance" ' + (filters.sort==='relevance'?'selected':'') + '>Relevância</option>' +
          '<option value="sold" ' + (filters.sort==='sold'?'selected':'') + '>Mais vendidos</option>' +
          '<option value="asc" ' + (filters.sort==='asc'?'selected':'') + '>Preço: menor ao maior</option>' +
          '<option value="desc" ' + (filters.sort==='desc'?'selected':'') + '>Preço: maior ao menor</option>' +
          '<option value="rating" ' + (filters.sort==='rating'?'selected':'') + '>Melhor avaliados</option>' +
        '</select>' +
        '<button class="btn btn--outline btn--sm" id="toggle-free" aria-pressed="' + filters.onlyFree + '">' +
          (filters.onlyFree ? '✓ Frete grátis' : '🚚 Frete grátis') + '</button>' +
        '<button class="btn btn--outline btn--sm" id="toggle-favs" aria-pressed="' + filters.onlyFavs + '">' +
          (filters.onlyFavs ? '♥ Favoritos' : '♡ Favoritos') + '</button>' +
      '</div>' +

      '<div class="filter-bar">' +
        '<button class="chip' + (filters.category==='all'?' is-active':'') + '" data-cat="all">Todos</button>' +
        cats.map(function (c) {
          return '<button class="chip' + (filters.category===c.id?' is-active':'') + '" data-cat="' + c.id + '">' +
            c.icon + ' ' + c.name + '</button>';
        }).join('') +
        '<span class="result-count" id="result-count"></span>' +
      '</div>' +

      '<div id="catalog-grid">' + gridHtml() + '</div>' +
    '</div>';
  }

  function bind(params) {
    const app = document.getElementById('app');
    const search = app.querySelector('#search');
    const sort = app.querySelector('#sort');
    const favBtn = app.querySelector('#toggle-favs');
    const freeBtn = app.querySelector('#toggle-free');

    // Parâmetros vindos da URL (ex.: #/produtos?cat=livros).
    if (params.q) { filters.term = params.q; search.value = params.q; }
    if (params.cat) {
      filters.category = params.cat;
      app.querySelectorAll('[data-cat]').forEach(function (b) {
        b.classList.toggle('is-active', b.getAttribute('data-cat') === params.cat);
      });
    }

    function refreshGrid(reset) {
      if (reset) visible = 24;
      const grid = app.querySelector('#catalog-grid');
      if (!grid) return;
      grid.innerHTML = gridHtml();
      app.querySelector('#result-count').textContent = apply().length + ' produto(s)';
      const more = grid.querySelector('#load-more');
      if (more) more.addEventListener('click', function () {
        visible += 24; refreshGrid(false);
      });
      const clear = grid.querySelector('#clear-filters');
      if (clear) clear.addEventListener('click', function () {
        filters.term = ''; filters.category = 'all'; filters.onlyFavs = false; filters.onlyFree = false;
        search.value = ''; MOSS.router.navigate('produtos');
      });
    }

    search.addEventListener('input', u.debounce(function (e) {
      filters.term = e.target.value; refreshGrid(true);
    }, 140));

    sort.addEventListener('change', function (e) { filters.sort = e.target.value; refreshGrid(true); });

    favBtn.addEventListener('click', function () {
      filters.onlyFavs = !filters.onlyFavs;
      favBtn.setAttribute('aria-pressed', String(filters.onlyFavs));
      favBtn.textContent = filters.onlyFavs ? '♥ Favoritos' : '♡ Favoritos';
      refreshGrid(true);
    });

    freeBtn.addEventListener('click', function () {
      filters.onlyFree = !filters.onlyFree;
      freeBtn.setAttribute('aria-pressed', String(filters.onlyFree));
      freeBtn.textContent = filters.onlyFree ? '✓ Frete grátis' : '🚚 Frete grátis';
      refreshGrid(true);
    });

    app.querySelectorAll('[data-cat]').forEach(function (b) {
      b.addEventListener('click', function () {
        filters.category = b.getAttribute('data-cat');
        app.querySelectorAll('[data-cat]').forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
        refreshGrid(true);
      });
    });

    refreshGrid(true);
  }

  MOSS.pages = MOSS.pages || {};
  MOSS.pages.store = { render:render, bind:bind };
})(window);
