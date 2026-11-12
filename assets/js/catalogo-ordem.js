/* Catálogos MOSS: A–Z em português, mantendo links, filtros e cartões. */
(() => {
  'use strict';
  const comparar = new Intl.Collator('pt-BR', { sensitivity: 'base', numeric: true });
  // Alguns títulos começam com emojis: eles não devem vir antes da letra A.
  const nome = cartao => (cartao.querySelector('h2, h3')?.textContent || '')
    .trim().replace(/^[^\p{L}\p{N}]+/u, '');
  const grades = document.querySelectorAll('#cards, main .grid');
  grades.forEach(grade => {
    const cartoes = Array.from(grade.children).filter(el => el.matches('article.card'));
    if (cartoes.length < 2) return;
    cartoes.sort((a, b) => comparar.compare(nome(a), nome(b)));
    grade.append(...cartoes);
  });
})();
