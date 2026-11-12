/* Busca do catálogo MOSS: categoria + texto, mantendo a ordem A–Z já aplicada.
   Um único ponto de verdade, reutilizável em futuros catálogos. */
(() => {
  'use strict';
  const busca = document.querySelector('[data-catalogo-busca]');
  const grade = document.querySelector('#cards, main .grid');
  if (!busca || !grade) return;
  const entrada = busca.querySelector('input[type=search], input[type=text]');
  const limpar = busca.querySelector('[data-limpar-busca]');
  const contagem = document.querySelector('#count');
  const semResultado = document.querySelector('[data-sem-resultado]');
  const botoes = [...document.querySelectorAll('[data-filter]')];
  const cartoes = [...grade.children].filter(c => c.matches('article.card'));
  const removerAcentos = texto => String(texto ?? '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  // Normaliza mantendo o mapa para voltar ao texto original e destacar a Occorrência.
  const normalizar = texto => {
    let saida = '', mapa = [];
    for (let i = 0; i < String(texto ?? '').length; i++) {
      const forma = String(texto)[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      for (const c of forma) { saida += c; mapa.push(i); }
    }
    return { texto: saida, mapa };
  };
  const escapar = valor => String(valor).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const tituloOriginal = new Map();
  cartoes.forEach(c => tituloOriginal.set(c, c.querySelector('h2, h3')));
  function limparDestaques() {
    cartoes.forEach(c => {
      const h = tituloOriginal.get(c);
      if (h && h.dataset.textoOriginal === undefined) h.dataset.textoOriginal = h.textContent;
      if (h && h.textContent !== (h.dataset.textoOriginal || '')) h.textContent = h.dataset.textoOriginal;
    });
  }
  function destacar(cartao, consulta) {
    const h = tituloOriginal.get(cartao);
    if (!h) return;
    const original = h.dataset.textoOriginal ?? h.textContent;
    h.textContent = original;
    if (!consulta) return;
    const alvo = normalizar(original);
    const pos = alvo.texto.indexOf(consulta);
    if (pos < 0) return;
    const inicio = alvo.mapa[pos];
    const fim = alvo.mapa[pos + consulta.length - 1] + 1;
    h.innerHTML = escapar(original.slice(0, inicio)) + '<mark>' + escapar(original.slice(inicio, fim)) + '</mark>' + escapar(original.slice(fim));
  }
  let categoria = 'Todos';
  function textoDoCartao(cartao) {
    const h = tituloOriginal.get(cartao);
    const titulo = h?.dataset.textoOriginal ?? h?.textContent ?? '';
    const descricao = cartao.querySelector('.card-body p')?.textContent ?? '';
    const categoriaTexto = cartao.querySelector('.category')?.textContent ?? '';
    return removerAcentos(titulo + ' ' + descricao + ' ' + categoriaTexto);
  }
  function aplicar() {
    const termo = removerAcentos(entrada.value.trim());
    let total = 0;
    cartoes.forEach(cartao => {
      const passaCategoria = categoria === 'Todos' || cartao.dataset.category === categoria;
      const passaTexto = !termo || textoDoCartao(cartao).includes(termo);
      const mostrar = passaCategoria && passaTexto;
      cartao.hidden = !mostrar;
      destacar(cartao, termo);
      if (mostrar) total++;
    });
    botoes.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === categoria)));
    if (contagem) {
      const sufixo = ' · ordem A–Z';
      if (!termo) contagem.textContent = total + (total === 1 ? ' modelo disponível' : ' modelos disponíveis') + sufixo;
      else contagem.textContent = total === 0
        ? 'Nenhum modelo encontrado para “' + entrada.value.trim() + '”' + sufixo
        : total + (total === 1 ? ' modelo encontrado para “' : ' modelos encontrados para “') + entrada.value.trim() + '”' + sufixo;
    }
    if (semResultado) {
      semResultado.hidden = total !== 0;
      const aviso = semResultado.querySelector('[data-aviso-busca]');
      if (aviso) aviso.textContent = termo ? 'Nenhum modelo corresponde a “' + entrada.value.trim() + '” nesta categoria.' : 'Nenhum modelo nesta categoria.';
    }
    if (limpar) limpar.hidden = !termo;
  }
  botoes.forEach(b => b.addEventListener('click', () => { categoria = b.dataset.filter; aplicar(); }));
  entrada.addEventListener('input', aplicar);
  entrada.addEventListener('search', aplicar);
  entrada.addEventListener('keydown', evento => { if (evento.key === 'Escape' && entrada.value) { evento.preventDefault(); entrada.value = ''; aplicar(); } });
  if (limpar) limpar.addEventListener('click', () => { entrada.value = ''; categoria = 'Todos'; aplicar(); entrada.focus(); });
  const formulario = busca.closest('form');
  if (formulario) formulario.addEventListener('submit', evento => evento.preventDefault());
  const zerar = document.querySelector('[data-limpar-tudo]');
  if (zerar) zerar.addEventListener('click', () => { entrada.value = ''; categoria = 'Todos'; aplicar(); entrada.focus(); });
  limparDestaques();
  aplicar();
})();
