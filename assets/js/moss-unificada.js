/* Une busca, categoria e paginação. Sem JS, todas as demos permanecem acessíveis. */
(() => {
  'use strict';
  const root = document.querySelector('#modelos');
  if (!root) return;
  const cards = [...root.querySelectorAll('#cards > article')];
  const input = root.querySelector('input[type="search"]');
  const category = root.querySelector('select');
  const more = root.querySelector('[data-more]');
  const clear = root.querySelector('[data-clear]');
  const reset = root.querySelector('[data-reset]');
  const count = root.querySelector('#count');
  const empty = root.querySelector('[data-empty]');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const text = new Map(cards.map(card => [card, normalize(card.textContent)]));
  let limit = 6;
  function apply() {
    const query = normalize(input.value.trim());
    const matches = cards.filter(card => (category.value === 'Todos' || card.dataset.category === category.value) && text.get(card).includes(query));
    const visible = new Set(matches.slice(0, limit));
    cards.forEach(card => { card.hidden = !visible.has(card); });
    count.textContent = matches.length ? `${visible.size} de ${matches.length} demos${query || category.value !== 'Todos' ? ' encontradas' : ' disponíveis'}` : 'Nenhuma demo encontrada';
    more.hidden = matches.length <= limit;
    if (!more.hidden) more.textContent = `Ver mais ${Math.min(6, matches.length - limit)} demos`;
    clear.hidden = input.value.length === 0;
    empty.hidden = matches.length !== 0;
  }
  function search() { limit = 6; apply(); }
  function clean() { input.value = ''; category.value = 'Todos'; search(); input.focus(); }
  input.addEventListener('input', search);
  input.addEventListener('search', search);
  input.addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); input.value = ''; search(); } });
  category.addEventListener('change', search);
  clear.addEventListener('click', () => { input.value = ''; search(); input.focus(); });
  reset.addEventListener('click', clean);
  more.addEventListener('click', () => {
    const before = new Set(cards.filter(card => !card.hidden));
    limit += 6; apply();
    const next = cards.find(card => !card.hidden && !before.has(card));
    next?.querySelector('.demo-cover')?.focus({preventScroll:true});
  });
  apply();
})();
