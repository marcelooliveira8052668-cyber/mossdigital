/* ============================================================
   product.js — detalhes do produto, quantidade e favoritos
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;

  function render(params) {
    const p = MOSS.catalog.byId(params.id);
    if (!p) {
      return MOSS.ui.empty('🤔', 'Produto não encontrado', 'O código informado não existe no catálogo.', '<a class="btn btn--primary" href="#/produtos">Voltar aos produtos</a>');
    }
    const soldOut = p.stock <= 0;
    const specs = Object.keys(p.specs).map(function (k) {
      return '<li><strong>' + u.escapeHtml(k) + '</strong><span>' + u.escapeHtml(p.specs[k]) + '</span></li>';
    }).join('');
    const favs = MOSS.store.get().favorites;
    const isFav = favs.indexOf(p.id) >= 0;

    return '<div class="page">' +
      '<div class="row small muted" style="margin-bottom:1rem"><a href="#/home">Loja</a> / <a href="#/produtos">Produtos</a> / ' + u.escapeHtml(p.name) + '</div>' +
      '<div class="pdp">' +
        '<div>' +
          '<div class="pdp__media">' + MOSS.catalog.img(p, 'Foto de ' + p.name, 0, '', 'pdp-main') + '</div>' +
          '<div class="pdp__thumbs">' +
            [0,1,2].map(function (v) {
              return '<button class="pdp__thumb' + (v===0?' is-active':'') + '" data-variant="' + v + '" aria-label="Ver imagem ' + (v+1) + '">' +
                MOSS.catalog.img(p, '', v) + '</button>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<div>' +
          '<span class="badge badge--navy">' + u.escapeHtml(p.id) + '</span>' +
          '<h1 style="font-size:clamp(1.7rem,3vw,2.4rem);margin-top:.6rem">' + u.escapeHtml(p.name) + '</h1>' +
          '<div class="pdp__stars">' + MOSS.ui.stars(p.rating) + ' <span class="muted small">' + p.rating.toFixed(1) + ' · ' + p.reviews + ' avaliações · ' +
            (p.sold || 0).toLocaleString('pt-BR') + ' vendidos</span></div>' +
          '<div class="row small muted" style="margin-top:.4rem"><span>🏪 ' + u.escapeHtml(p.shop || 'Moss Store Oficial') + '</span>' +
            '<span>📍 ' + u.escapeHtml(p.location || 'São Paulo, SP') + '</span>' +
            (p.freeShipping ? '<span class="badge badge--green">Frete grátis</span>' : '') + '</div>' +
          '<div style="margin:1.1rem 0" class="pdp__price">' + u.money(p.price) +
            (p.oldPrice && p.oldPrice > p.price ? '<span class="product-card__old">' + u.money(p.oldPrice) + '</span>' : '') + '</div>' +
          '<p class="muted">' + u.escapeHtml(p.desc) + '</p>' +
          '<div class="row" style="margin-bottom:1rem">' + MOSS.ui.badgeStock(p) +
            '<span class="small muted">Estoque: ' + p.stock + ' unidade(s)</span></div>' +

          '<div class="row" style="margin-bottom:1rem">' +
            '<div class="qty" role="group" aria-label="Quantidade">' +
              '<button type="button" id="qty-minus" aria-label="Diminuir quantidade">−</button>' +
              '<input type="number" id="qty-input" value="1" min="1" max="' + p.stock + '" aria-label="Quantidade">' +
              '<button type="button" id="qty-plus" aria-label="Aumentar quantidade">+</button>' +
            '</div>' +
            '<button class="btn btn--primary btn--lg" id="add-btn"' + (soldOut?' disabled':'') + '>' +
              (soldOut ? 'Produto esgotado' : 'Adicionar ao carrinho 🛒') + '</button>' +
            '<button class="btn btn--outline" id="fav-btn" aria-pressed="' + isFav + '" aria-label="Favoritar">' + (isFav?'♥ Salvo':'♡ Favoritar') + '</button>' +
          '</div>' +
          '<div id="pdp-msg" class="small" aria-live="polite"></div>' +

          '<div class="card card--pad" style="margin-top:1.4rem">' +
            '<h3>Detalhes adicionais</h3><ul class="spec-list">' + specs + '</ul>' +
          '</div>' +
          '<div class="note note--warn">⚠️ Produto, preço, estoque e avaliações são <strong>fictícios</strong>, criados para demonstração de interface.</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function bind(params) {
    const app = document.getElementById('app');
    const p = MOSS.catalog.byId(params.id);
    if (!p) return;
    const input = app.querySelector('#qty-input');
    const msg = app.querySelector('#pdp-msg');

    function clamp() {
      let n = parseInt(input.value, 10);
      if (!Number.isFinite(n) || n < 1) n = 1;
      if (n > p.stock) n = p.stock;
      input.value = n;
      return n;
    }
    app.querySelector('#qty-minus').addEventListener('click', function () { input.value = Math.max(1, parseInt(input.value||1,10) - 1); });
    app.querySelector('#qty-plus').addEventListener('click', function () { input.value = Math.min(p.stock, parseInt(input.value||1,10) + 1); });
    input.addEventListener('change', clamp);

    app.querySelector('#add-btn').addEventListener('click', function () {
      const ok = MOSS.cartService.add(p.id, clamp());
      msg.innerHTML = ok ? '<span style="color:var(--green-500)">✓ Adicionado! <a href="#/carrinho">Ir para o carrinho</a></span>' : '';
    });
    app.querySelector('#fav-btn').addEventListener('click', function (e) {
      const on = MOSS.store.toggleFavorite(p.id);
      e.currentTarget.textContent = on ? '♥ Salvo' : '♡ Favoritar';
      e.currentTarget.setAttribute('aria-pressed', String(on));
    });
    app.querySelectorAll('[data-variant]').forEach(function (b) {
      b.addEventListener('click', function () {
        app.querySelector('#pdp-main').src = MOSS.catalog.photo(p, Number(b.getAttribute('data-variant')));
        app.querySelectorAll('[data-variant]').forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
      });
    });
  }

  MOSS.pages = MOSS.pages || {};
  MOSS.pages.product = { render:render, bind:bind };
})(window);
