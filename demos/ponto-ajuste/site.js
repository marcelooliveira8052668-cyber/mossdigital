'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const menu = $('menu'), toggle = document.querySelector('.menu-toggle');
  function fecharMenu() { menu.classList.remove('aberto'); toggle.setAttribute('aria-expanded','false'); }
  toggle.addEventListener('click', () => { const aberto = toggle.getAttribute('aria-expanded') !== 'true'; menu.classList.toggle('aberto',aberto); toggle.setAttribute('aria-expanded',String(aberto)); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click',fecharMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { fecharMenu(); toggle.focus(); } });
  const cards = [...document.querySelectorAll('.foto')], filtros = [...document.querySelectorAll('[data-filtro]')];
  let visiveis = cards, atual = 0;
  filtros.forEach(b => b.addEventListener('click', () => {
    filtros.forEach(outro => outro.setAttribute('aria-pressed',String(outro === b)));
    cards.forEach(card => { card.hidden = b.dataset.filtro !== 'todas' && card.dataset.categoria !== b.dataset.filtro; });
    visiveis = cards.filter(card => !card.hidden); $('galeria-contagem').textContent = visiveis.length + ' fotografias';
  }));
  function mostrarFoto(indice) {
    atual = (indice + visiveis.length) % visiveis.length;
    const card = visiveis[atual], img = card.querySelector('img');
    $('foto-ampliada').src = img.src; $('foto-ampliada').alt = img.alt;
    $('foto-legenda').textContent = card.dataset.legenda + ' Foto de banco ilustrativa.';
    $('foto-numero').textContent = (atual + 1) + ' / ' + visiveis.length;
  }
  cards.forEach(card => card.addEventListener('click', () => { mostrarFoto(visiveis.indexOf(card)); $('lightbox').showModal(); document.body.classList.add('modal-aberto'); }));
  $('fechar-foto').addEventListener('click', () => $('lightbox').close());
  $('lightbox').addEventListener('close', () => document.body.classList.remove('modal-aberto'));
  $('lightbox').addEventListener('click', e => { if (e.target === $('lightbox')) { const r = $('lightbox').getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) $('lightbox').close(); } });
  $('foto-anterior').addEventListener('click', () => mostrarFoto(atual - 1));
  $('foto-proxima').addEventListener('click', () => mostrarFoto(atual + 1));
  $('lightbox').addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); mostrarFoto(atual + (e.key === 'ArrowRight' ? 1 : -1)); } });
  const form = $('form-pedido');
  function invalidarMensagem() { $('mensagem-pronta').hidden = true; $('abrir-whatsapp').removeAttribute('href'); $('form-status').textContent = ''; }
  document.querySelectorAll('[data-servico]').forEach(a => a.addEventListener('click', () => { $('servico').value = a.dataset.servico; invalidarMensagem(); }));
  form.addEventListener('input',invalidarMensagem); form.addEventListener('change',invalidarMensagem);
  form.addEventListener('reset', () => { invalidarMensagem(); $('texto-mensagem').textContent = ''; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    if (!$('detalhes').value.trim()) { $('form-status').textContent = 'Conte brevemente o que você gostaria de fazer.'; $('detalhes').focus(); return; }
    const config = window.PONTO_AJUSTE_CONFIG;
    if (!/^\d{10,15}$/.test(config.whatsapp)) { $('form-status').textContent = 'O WhatsApp ainda precisa ser configurado pelo responsável.'; return; }
    const texto = 'Olá! Vi a demonstração Ponto & Ajuste da MOSS Digital e quero conversar sobre este modelo de site.\n\nExemplo de solicitação de costura:\n' + ($('nome').value.trim() ? 'Nome: '+$('nome').value.trim()+'\n' : '') + 'Cuidado: '+$('servico').selectedOptions[0].textContent+'\nPeça: '+$('peca').value+'\nDetalhes: '+$('detalhes').value.trim()+'\n\nSei que esta é uma demonstração, não um agendamento confirmado.';
    $('texto-mensagem').textContent = texto;
    $('abrir-whatsapp').href = 'https://wa.me/'+config.whatsapp+'?text='+encodeURIComponent(texto);
    $('mensagem-pronta').hidden = false; $('form-status').textContent = 'Mensagem preparada no navegador. Nada foi enviado ou salvo no banco.';
    $('abrir-whatsapp').focus({preventScroll:true}); $('mensagem-pronta').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});
  });
  async function carregarServicos() {
    if (!window.PONTO_AJUSTE_CONFIG.usarSupabase) return;
    $('modo-banco').textContent = 'Consultando catálogo no Supabase…';
    try {
      const servicos = await window.PontoBanco.consultar();
      const esperados = ['ajustes','reparos','acabamentos','transformacao'];
      if (!Array.isArray(servicos) || servicos.length !== 4 || !esperados.every(c => servicos.some(s => s.codigo === c && typeof s.nome === 'string' && typeof s.descricao === 'string'))) throw Error('O catálogo precisa dos quatro serviços do roteiro SQL.');
      document.querySelectorAll('#lista-servicos article').forEach(article => {
        const codigo = article.querySelector('[data-servico]').dataset.servico, s = servicos.find(item => item.codigo === codigo);
        article.querySelector('h3').textContent = s.nome; article.querySelector('p').textContent = s.descricao;
        article.querySelector('a').setAttribute('aria-label','Conversar sobre '+s.nome);
        [...$('servico').options].find(o => o.value === codigo).textContent = s.nome;
      });
      $('modo-banco').textContent = 'Catálogo carregado do Supabase. O formulário continua sem salvar dados; a conversa é enviada manualmente no WhatsApp.';
    } catch { $('modo-banco').textContent = 'Não foi possível carregar o banco. Exibindo catálogo demonstrativo local; nenhum pedido foi enviado. O responsável deve conferir a conexão.'; }
  }
  carregarServicos();
})();
