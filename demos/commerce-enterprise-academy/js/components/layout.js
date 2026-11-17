/* ============================================================
   layout.js — cabeçalho, navegação e rodapé
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;

  const NAV = [
    { path:'home',        label:'Loja', icon:'🏬' },
    { path:'produtos',    label:'Produtos', icon:'📦' },
    { path:'carrinho',    label:'Carrinho', icon:'🛒' },
    { path:'checkout',    label:'Checkout', icon:'🧾' },
    { path:'pedidos',     label:'Pedidos', icon:'📋' },
    { path:'rastrear',    label:'Rastrear', icon:'🚚' },
    { path:'admin',       label:'Painel admin', icon:'⚙️' },
    { path:'tecnologias', label:'Tecnologias', icon:'🧩' },
    { path:'laboratorio', label:'Laboratório', icon:'🔬' },
    { path:'carreira',    label:'Carreira', icon:'🎓' }
  ];

  function renderHeader() {
    const root = document.getElementById('header-root');
    if (!root) return;
    const cartCount = MOSS.cartService.count();
    root.innerHTML =
      '<header class="site-header"><div class="container header-inner">' +
        '<a class="brand" href="#/home" aria-label="MOSS Commerce — início">' +
          '<span class="brand__mark">M</span>' +
          '<span class="brand__text"><strong>MOSS Commerce</strong><span>Enterprise Academy</span></span>' +
        '</a>' +
        '<form class="header-search" id="header-search" role="search">' +
          '<input type="search" id="header-q" placeholder="Buscar produtos…" aria-label="Buscar produtos">' +
          '<button type="submit" aria-label="Buscar">🔍</button>' +
        '</form>' +
        '<nav class="nav-desktop" aria-label="Navegação principal">' +
          NAV.map(function (n) {
            return '<a class="nav-link" data-nav="' + n.path + '" href="#/' + n.path + '">' + n.label + '</a>';
          }).join('') +
        '</nav>' +
        '<div class="header-actions">' +
          '<button class="icon-btn" data-theme-toggle aria-label="Alternar tema" title="Alternar tema">☾</button>' +
          '<a class="icon-btn" href="#/carrinho" aria-label="Abrir carrinho (' + cartCount + ' itens)" title="Carrinho">' +
            '🛒<span class="icon-btn__badge" id="cart-badge">' + cartCount + '</span></a>' +
          '<button class="icon-btn menu-toggle" data-menu-toggle aria-label="Abrir menu" aria-expanded="false" title="Menu">☰</button>' +
        '</div>' +
      '</div>' +
      '<nav class="nav-mobile" id="mobile-nav" aria-label="Navegação mobile">' +
        NAV.map(function (n) {
          return '<a data-nav="' + n.path + '" href="#/' + n.path + '"><span aria-hidden="true">' + n.icon + '</span> ' + n.label + '</a>';
        }).join('') +
      '</nav></header>';

    const searchForm = root.querySelector('#header-search');
    if (searchForm) searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const q = root.querySelector('#header-q').value.trim();
      MOSS.router.navigate('produtos', q ? { q:q } : {});
    });

    const btn = root.querySelector('[data-menu-toggle]');
    const nav = root.querySelector('#mobile-nav');
    btn.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function updateBadge() {
    const b = document.getElementById('cart-badge');
    if (!b) return;
    const n = MOSS.cartService.count();
    b.textContent = n;
    const link = b.parentElement;
    link.setAttribute('aria-label', 'Abrir carrinho (' + n + ' itens)');
  }

  function renderFooter() {
    const root = document.getElementById('footer-root');
    if (!root) return;
    root.innerHTML =
      '<footer class="site-footer"><div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-col"><h4>MOSS Commerce Academy</h4>' +
            '<p class="small">Uma loja virtual completa para conhecer compras, pagamentos, entregas e aprender como a programação funciona por dentro.</p>' +
            '<span class="badge" style="background:rgba(255,255,255,.12);color:#fff">Demonstração fictícia</span>' +
          '</div>' +
          '<div class="footer-col"><h4>Loja</h4><ul>' +
            '<li><a href="#/home">Loja</a></li><li><a href="#/produtos">Produtos</a></li>' +
            '<li><a href="#/carrinho">Carrinho</a></li><li><a href="#/checkout">Finalizar compra</a></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h4>Acompanhar</h4><ul>' +
            '<li><a href="#/pedidos">Meus pedidos</a></li><li><a href="#/rastrear">Acompanhar entrega</a></li>' +
            '<li><a href="#/admin">Painel administrativo</a></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h4>Aprender</h4><ul>' +
            '<li><a href="#/laboratorio">Laboratório de código</a></li>' +
            '<li><a href="#/carreira">Carreira Front-End</a></li>' +
            '<li><a href="#/tecnologias">Tecnologias</a></li>' +
            '<li><a href="https://mossdigital.com.br" target="_blank" rel="noopener">MOSS Digital ↗</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + ' MOSS Digital · Projeto demonstrativo independente.</span>' +
          '<span>Nenhum dinheiro é movimentado nesta demonstração.</span></div>' +
      '</div></footer>';
  }

  function init() {
    renderHeader();
    renderFooter();
    MOSS.store.subscribe(function () { updateBadge(); });
    updateBadge();
  }

  MOSS.layout = { init:init, renderHeader:renderHeader, updateBadge:updateBadge, NAV:NAV };
})(window);
