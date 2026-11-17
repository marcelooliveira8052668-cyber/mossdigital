/* ============================================================
   product-card.js — cartão de produto reutilizável
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;

  /**
   * Delega eventos de forma global: um único listener no document
   * cuida de todos os botões data-action dos cartões.
   */
  function initDelegation() {
    document.addEventListener('click', function (e) {
      const fav = e.target.closest('[data-fav]');
      if (fav) {
        const id = fav.getAttribute('data-fav');
        const on = MOSS.store.toggleFavorite(id);
        fav.classList.toggle('is-active', on);
        fav.setAttribute('aria-pressed', String(on));
        MOSS.notify.toast(on ? 'Adicionado aos favoritos.' : 'Removido dos favoritos.', 'info', 1500);
        return;
      }
      const add = e.target.closest('[data-add]');
      if (add) {
        MOSS.cartService.add(add.getAttribute('data-add'), 1);
        return;
      }
      const details = e.target.closest('[data-details]');
      if (details) MOSS.router.navigate('produto', { id:details.getAttribute('data-details') });
    });
  }

  function render(p) {
    const favs = MOSS.store.get().favorites;
    const isFav = favs.indexOf(p.id) >= 0;
    const soldOut = p.stock <= 0;
    return '<article class="card product-card">' +
      '<div class="product-card__media">' +
        MOSS.catalog.img(p, 'Foto de ' + p.name, 0) +
        '<button class="product-card__fav' + (isFav ? ' is-active' : '') + '" data-fav="' + p.id + '" ' +
          'aria-pressed="' + isFav + '" aria-label="Favoritar ' + u.escapeHtml(p.name) + '" title="Favorito">' + (isFav ? '♥' : '♡') + '</button>' +
        (p.oldPrice && p.oldPrice > p.price ? '<span class="badge badge--accent product-card__badge">Oferta</span>' : '') +
      '</div>' +
      '<div class="product-card__body">' +
        '<span class="product-card__cat">' + u.escapeHtml(MOSS.catalog.categoryName(p.category)) + '</span>' +
        '<h3 class="product-card__name">' + u.escapeHtml(p.name) + '</h3>' +
        '<div class="product-card__rating">' + MOSS.ui.stars(p.rating) + ' <span>(' + p.reviews + ')</span> · ' +
          (p.sold || 0).toLocaleString('pt-BR') + ' vendidos</div>' +
        '<div class="product-card__tiny" title="' + u.escapeHtml(p.shop || 'Moss Store Oficial') + '">🏪 ' + u.escapeHtml(p.shop || 'Moss Store Oficial') +
          (p.location ? ' · 📍' + u.escapeHtml(p.location) : '') + '</div>' +
        '<div>' + MOSS.ui.price(p.price, p.oldPrice) + '</div>' +
        '<div class="row" style="gap:.35rem">' + MOSS.ui.badgeStock(p) +
          (p.freeShipping ? '<span class="badge badge--green">Frete grátis</span>' : '') + '</div>' +
        '<div class="product-card__actions">' +
          '<button class="btn btn--navy btn--sm" data-details="' + p.id + '">Ver detalhes</button>' +
          '<button class="btn btn--primary btn--sm" data-add="' + p.id + '"' + (soldOut ? ' disabled' : '') + '>' +
            (soldOut ? 'Esgotado' : 'Adicionar') + '</button>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  MOSS.productCard = { render:render, initDelegation:initDelegation };
})(window);
