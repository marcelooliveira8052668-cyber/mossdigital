/* ============================================================
   home.js — vitrine estilo marketplace
   ------------------------------------------------------------
   Banner, busca, categorias, flash sale com contador, cupons,
   mais vendidos e recomendações com "carregar mais".
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;

  let visible = 16;

  // Fotos reais do topo (Unsplash). Se não carregarem, o gradiente
  // da .hero continua aparecendo — a página nunca fica sem capa.
  const BANNER = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80';
  const BANNER_ART = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80';

  function render() {
    const produtos = MOSS.catalog.all();
    const ofertas = produtos.filter(function (p) { return p.oldPrice && p.oldPrice > p.price; }).slice(0, 6);
    const maisVendidos = produtos.slice().sort(function (a, b) { return (b.sold || 0) - (a.sold || 0); }).slice(0, 6);
    const recomendados = produtos.slice().sort(function (a, b) { return (b.rating * (b.reviews || 1)) - (a.rating * (a.reviews || 1)); });

    return '<div class="page">' +
      // --- Banner ---------------------------------------------
      '<section class="hero hero--photo" style="background:linear-gradient(105deg, rgba(7,22,44,.94) 0%, rgba(11,31,58,.86) 45%, rgba(11,31,58,.45) 100%), url(\'' + BANNER + '\') center/cover no-repeat">' +
        '<div class="hero__inner">' +
          '<span class="eyebrow" style="color:var(--accent-500)">MOSS Digital · Marketplace demonstrativo</span>' +
          '<h1>Commerce Enterprise Academy</h1>' +
          '<p>Mais de ' + produtos.length + ' produtos fictícios para comprar, vender, pagar, entregar e aprender programação vendo o código funcionar.</p>' +
          '<form class="market-search" id="hero-search" role="search">' +
            '<input id="hero-q" type="search" placeholder="Busque por celular, notebook, livro, peça de carro…" aria-label="Buscar produtos">' +
            '<button class="btn btn--primary" type="submit">Buscar 🔍</button>' +
          '</form>' +
          '<div class="hero__badges">' +
            '<span class="hero__badge">🛍️ ' + produtos.length + ' produtos</span>' +
            '<span class="hero__badge">💳 Pix e cartão de teste</span>' +
            '<span class="hero__badge">🚚 Frete grátis em vários itens</span>' +
            '<span class="hero__badge">🔬 Laboratório de código</span>' +
          '</div>' +
        '</div>' +
        '<div class="hero__art" aria-hidden="true">' +
          '<img src="' + BANNER_ART + '" alt="" loading="eager" onerror="this.style.display=\'none\'">' +
        '</div>' +
      '</section>' +

      // --- Categorias -----------------------------------------
      '<section class="section section--tight">' +
        '<div class="section-title-row"><h2>Categorias</h2>' +
          '<a class="btn btn--outline btn--sm" href="#/produtos">Ver todas →</a></div>' +
        '<div class="category-strip">' +
          MOSS.catalog.categories().map(function (c) {
            return '<a class="category-tile" href="#/produtos?cat=' + c.id + '">' +
              '<span class="category-tile__icon">' + c.icon + '</span>' +
              '<span class="category-tile__name">' + u.escapeHtml(c.name) + '</span></a>';
          }).join('') +
        '</div>' +
      '</section>' +

      // --- Flash sale -----------------------------------------
      '<section class="section section--tight">' +
        '<div class="flash-head">' +
          '<div><span class="eyebrow" style="color:var(--red-500)">⚡ Ofertas relâmpago</span>' +
          '<h2>Flash Sale <span class="flash-timer" id="flash-timer">00:00:00</span></h2></div>' +
          '<a class="btn btn--outline btn--sm" href="#/produtos">Ver ofertas →</a>' +
        '</div>' +
        '<div class="grid grid--auto">' + ofertas.map(MOSS.productCard.render).join('') + '</div>' +
      '</section>' +

      // --- Cupons ---------------------------------------------
      '<section class="section section--tight">' +
        '<div class="grid grid--3">' +
          '<div class="coupon-tile"><span>🎟️</span><div><strong>MOSS10</strong><p class="small">10% de desconto na simulação</p></div>' +
            '<button class="btn btn--primary btn--sm" data-coupon="MOSS10">Usar</button></div>' +
          '<div class="coupon-tile"><span>🎟️</span><div><strong>PRIME20</strong><p class="small">20% de desconto na simulação</p></div>' +
            '<button class="btn btn--primary btn--sm" data-coupon="PRIME20">Usar</button></div>' +
          '<div class="coupon-tile"><span>📚</span><div><strong>Laboratório</strong><p class="small">Veja o código da compra acontecendo</p></div>' +
            '<a class="btn btn--outline btn--sm" href="#/laboratorio">Abrir</a></div>' +
        '</div>' +
      '</section>' +

      // --- Mais vendidos --------------------------------------
      '<section class="section section--tight">' +
        '<div class="section-title-row"><h2>🔥 Mais vendidos</h2>' +
          '<span class="small muted">Baseado em vendas fictícias</span></div>' +
        '<div class="grid grid--auto">' + maisVendidos.map(MOSS.productCard.render).join('') + '</div>' +
      '</section>' +

      // --- Recomendados ---------------------------------------
      '<section class="section section--tight">' +
        '<div class="section-title-row"><h2>✨ Recomendados para você</h2>' +
          '<span class="small muted" id="rec-count"></span></div>' +
        '<div class="grid grid--auto" id="recommended">' + recomendados.slice(0, visible).map(MOSS.productCard.render).join('') + '</div>' +
        '<div class="text-center" style="margin-top:1.5rem">' +
          '<button class="btn btn--navy btn--lg" id="load-more">Carregar mais produtos</button></div>' +
      '</section>' +

      // --- Chamada educacional --------------------------------
      '<section class="section section--tight">' +
        '<div class="card card--pad" style="background:linear-gradient(135deg,var(--navy-800),var(--navy-600));color:#fff;border:0">' +
          '<div class="row" style="justify-content:space-between">' +
            '<div><span class="eyebrow" style="color:var(--accent-500)">Aprenda vendo</span>' +
            '<h2 style="color:#fff;margin:.2rem 0">Laboratório Visual do Código</h2>' +
            '<p style="color:#cbd9ee;max-width:60ch;margin:0">Clique em "Adicionar ao carrinho" e veja, linha por linha, o código sendo executado.</p></div>' +
            '<a class="btn btn--primary" href="#/laboratorio">Abrir laboratório →</a>' +
          '</div>' +
        '</div>' +
      '</section>' +
    '</div>';
  }

  function bind() {
    const app = document.getElementById('app');

    const form = app.querySelector('#hero-search');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      const q = app.querySelector('#hero-q').value.trim();
      MOSS.router.navigate('produtos', q ? { q:q } : {});
    });

    // Contador regressivo fictício (reinicia a cada 20 minutos).
    const timerEl = app.querySelector('#flash-timer');
    let restante = 20 * 60;
    function tick() {
      if (!timerEl || !timerEl.isConnected) return;
      restante = restante > 0 ? restante - 1 : 20 * 60;
      const h = String(Math.floor(restante / 3600)).padStart(2, '0');
      const m = String(Math.floor((restante % 3600) / 60)).padStart(2, '0');
      const s = String(restante % 60).padStart(2, '0');
      timerEl.textContent = h + ':' + m + ':' + s;
    }
    tick();
    const interval = setInterval(tick, 1000);
    if (MOSS.cleanups) MOSS.cleanups.push(function () { clearInterval(interval); });

    app.querySelectorAll('[data-coupon]').forEach(function (b) {
      b.addEventListener('click', function () {
        MOSS.cartService.applyCoupon(b.getAttribute('data-coupon'));
        b.textContent = 'Aplicado ✓';
      });
    });

    const total = produtosCount();
    function updateCount() {
      const el = app.querySelector('#rec-count');
      if (el) el.textContent = 'Mostrando ' + Math.min(visible, total) + ' de ' + total;
    }
    updateCount();

    const more = app.querySelector('#load-more');
    if (more) more.addEventListener('click', function () {
      const list = MOSS.catalog.all().slice().sort(function (a, b) { return (b.rating * (b.reviews || 1)) - (a.rating * (a.reviews || 1)); });
      const prox = list.slice(visible, visible + 16);
      if (!prox.length) { more.textContent = 'Você viu todos os produtos'; more.disabled = true; return; }
      app.querySelector('#recommended').insertAdjacentHTML('beforeend', prox.map(MOSS.productCard.render).join(''));
      visible += 16;
      updateCount();
      if (visible >= list.length) { more.textContent = 'Você viu todos os produtos'; more.disabled = true; }
    });
  }

  function produtosCount() { return MOSS.catalog.all().length; }

  MOSS.pages = MOSS.pages || {};
  MOSS.pages.home = { render:render, bind:bind };
})(window);
