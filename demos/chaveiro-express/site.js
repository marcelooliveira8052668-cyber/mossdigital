'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const menu = $('menu'), toggle = document.querySelector('.menu-toggle');
  function fecharMenu() { menu.classList.remove('aberto'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', () => {
    const aberto = toggle.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('aberto', aberto);
    toggle.setAttribute('aria-expanded', String(aberto));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', fecharMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { fecharMenu(); toggle.focus(); } });

  const cards = [...document.querySelectorAll('.foto')], filtros = [...document.querySelectorAll('[data-filtro]')];
  let visiveis = cards, atual = 0;
  filtros.forEach(botao => botao.addEventListener('click', () => {
    filtros.forEach(outro => outro.setAttribute('aria-pressed', String(outro === botao)));
    cards.forEach(card => { card.hidden = botao.dataset.filtro !== 'todas' && card.dataset.categoria !== botao.dataset.filtro; });
    visiveis = cards.filter(card => !card.hidden);
    $('galeria-contagem').textContent = visiveis.length + ' fotografias';
  }));
  function mostrarFoto(indice) {
    atual = (indice + visiveis.length) % visiveis.length;
    const card = visiveis[atual], img = card.querySelector('img');
    $('foto-ampliada').src = img.src; $('foto-ampliada').alt = img.alt;
    $('foto-legenda').textContent = card.dataset.legenda + ' Fotografia de banco ilustrativa.';
    $('foto-numero').textContent = (atual + 1) + ' / ' + visiveis.length;
  }
  cards.forEach(card => card.addEventListener('click', () => { mostrarFoto(visiveis.indexOf(card)); $('lightbox').showModal(); }));
  $('fechar-foto').addEventListener('click', () => $('lightbox').close());
  $('lightbox').addEventListener('click', e => {
    if (e.target !== $('lightbox')) return;
    const r = $('lightbox').getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) $('lightbox').close();
  });
  $('foto-anterior').addEventListener('click', () => mostrarFoto(atual - 1));
  $('foto-proxima').addEventListener('click', () => mostrarFoto(atual + 1));
  $('lightbox').addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); mostrarFoto(atual + (e.key === 'ArrowRight' ? 1 : -1)); }
  });

  const form = $('form-chamado');
  function reiniciar() { $('chamado-pronto').hidden = true; $('chamado-status').textContent = ''; $('chamado-whats').removeAttribute('href'); }
  document.querySelectorAll('[data-servico]').forEach(a => a.addEventListener('click', () => { $('ch-servico').value = a.dataset.servico; reiniciar(); }));
  form.addEventListener('input', reiniciar);
  form.addEventListener('change', reiniciar);
  form.addEventListener('reset', () => { reiniciar(); $('chamado-texto').textContent = ''; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const config = window.CHAVEIRO_CONFIG;
    if (!/^\d{10,15}$/.test(config.whatsapp)) { $('chamado-status').textContent = 'O WhatsApp ainda precisa ser configurado pelo responsável.'; return; }
    const telefone = $('ch-contato').value.trim();
    if (telefone.replace(/\D/g, '').length < 8) { $('chamado-status').textContent = 'Confira o telefone informado, com DDD.'; $('ch-contato').focus(); return; }
    const numero = String(Math.floor(Math.random() * 9000) + 1000);
    $('chamado-id').textContent = 'Nº ' + numero;
    const texto = 'Olá! Vim pelo site Chaveiro Express.\n\n' +
      ($('ch-nome').value.trim() ? 'Nome: ' + $('ch-nome').value.trim() + '\n' : '') +
      'Serviço: ' + $('ch-servico').selectedOptions[0].textContent + '\n' +
      'Bairro: ' + $('ch-bairro').value.trim() + '\n' +
      'Telefone: ' + telefone + '\n' +
      'Situação: ' + $('ch-descricao').value.trim() + '\n\n' +
      'Quero combinar valor, prazo e forma de pagamento.';
    $('chamado-texto').textContent = texto;
    $('chamado-whats').href = 'https://wa.me/' + config.whatsapp + '?text=' + encodeURIComponent(texto);
    $('chamado-pronto').hidden = false;
    $('chamado-status').textContent = 'Mensagem preparada no navegador. Nada foi enviado nem salvo no banco.';
    $('chamado-whats').focus({ preventScroll: true });
    $('chamado-pronto').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
  });

  async function carregarServicos() {
    if (!window.CHAVEIRO_CONFIG.usarSupabase) return;
    $('modo-banco').textContent = 'Consultando catálogo no Supabase…';
    try {
      const dados = await window.ChaveiroBanco.servicos();
      const esperados = ['abertura', 'fechaduras', 'copia', 'veiculo'];
      if (!Array.isArray(dados) || dados.length !== 4 || !esperados.every(c => dados.some(s => s.codigo === c && typeof s.nome === 'string' && typeof s.descricao === 'string'))) throw Error('O catálogo precisa dos quatro serviços do roteiro SQL.');
      document.querySelectorAll('#lista-servicos article').forEach(article => {
        const codigo = article.querySelector('[data-servico]').dataset.servico;
        const servico = dados.find(item => item.codigo === codigo);
        article.querySelector('h3').textContent = servico.nome;
        article.querySelector('p').textContent = servico.descricao;
        article.querySelector('a').setAttribute('aria-label', 'Abrir chamado de ' + servico.nome);
        [...$('ch-servico').options].find(o => o.value === codigo).textContent = servico.nome;
      });
      $('modo-banco').textContent = 'Catálogo carregado do Supabase. O formulário continua sem salvar dados; a conversa é enviada manualmente no WhatsApp.';
    } catch {
      $('modo-banco').textContent = 'Não foi possível carregar o banco. Exibindo catálogo demonstrativo local; nenhum chamado foi enviado. O responsável deve conferir a conexão.';
    }
  }
  carregarServicos();
})();
