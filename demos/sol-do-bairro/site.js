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

  /* Simulador de economia: cálculo local, sem envio e sem gravação. */
  const KWH_POR_PAINEL = 13.5;   // média mensal por painel de cerca de 2 m²
  const COMPENSACAO_MIN = 0.70;  // parte mais conservadora da geração compensada
  const COMPENSACAO_MAX = 1.00;
  const conta = $('sim-conta'), consumo = $('sim-consumo');
  let ultimo = null;
  function calcular() {
    const valorConta = Number(conta.value);
    const kwh = Number(consumo.value);
    const paineis = Math.max(1, Math.ceil(kwh / KWH_POR_PAINEL));
    const area = paineis * 2;
    const geracao = paineis * KWH_POR_PAINEL;
    const tarifa = kwh > 0 ? valorConta / kwh : 0;
    const economiaMin = geracao * COMPENSACAO_MIN * tarifa;
    const economiaMax = geracao * COMPENSACAO_MAX * tarifa;
    $('sim-conta-valor').textContent = 'R$ ' + valorConta.toLocaleString('pt-BR');
    $('sim-consumo-valor').textContent = kwh.toLocaleString('pt-BR') + ' kWh';
    $('sim-paineis').textContent = paineis;
    $('sim-area').textContent = area + ' m²';
    $('sim-geracao').textContent = Math.round(geracao).toLocaleString('pt-BR') + ' kWh';
    $('sim-economia').textContent = 'R$ ' + Math.round(economiaMin).toLocaleString('pt-BR') + '–' + Math.round(economiaMax).toLocaleString('pt-BR');
    ultimo = { valorConta, kwh, paineis, area, geracao: Math.round(geracao), economiaMin: Math.round(economiaMin), economiaMax: Math.round(economiaMax) };
    return ultimo;
  }
  conta.addEventListener('input', calcular);
  consumo.addEventListener('input', calcular);
  $('sim-limpar').addEventListener('click', () => { conta.value = 320; consumo.value = 350; calcular(); $('sim-status').textContent = 'Valores reiniciados. Estimativa para orientação, não é proposta.'; });
  calcular();

  /* Galeria */
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

  /* Proposta */
  const form = $('form-proposta');
  function reiniciar() { $('proposta-pronta').hidden = true; $('proposta-status').textContent = ''; $('proposta-whats').removeAttribute('href'); }
  document.querySelectorAll('[data-servico]').forEach(a => a.addEventListener('click', () => { $('pr-servico').value = a.dataset.servico; reiniciar(); }));
  form.addEventListener('input', reiniciar);
  form.addEventListener('change', reiniciar);
  form.addEventListener('reset', () => { reiniciar(); $('proposta-texto').textContent = ''; });
  function montarMensagem() {
    const d = ultimo || calcular();
    const nome = $('pr-nome').value.trim();
    const telefone = $('pr-contato').value.trim();
    return 'Olá! Vim pelo site Sol do Bairro e quero uma proposta.\n\n' +
      (nome ? 'Nome: ' + nome + '\n' : '') +
      'WhatsApp: ' + telefone + '\n' +
      'Bairro: ' + $('pr-bairro').value.trim() + '\n' +
      'Serviço: ' + $('pr-servico').selectedOptions[0].textContent + '\n' +
      'Sobre a instalação: ' + ($('pr-detalhes').value.trim() || 'ainda a descrever') + '\n\n' +
      'Simulei no site: conta de R$ ' + d.valorConta + ', consumo de ' + d.kwh + ' kWh.\n' +
      'Estimativa do site: ' + d.paineis + ' painéis (' + d.area + ' m²), ' + d.geracao + ' kWh/mês, economia de R$ ' + d.economiaMin + ' a R$ ' + d.economiaMax + ' por mês.\n\n' +
      'Quero saber os próximos passos, prazo e valores.';
  }
  $('sim-proposta').addEventListener('click', () => {
    document.getElementById('proposta').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    $('pr-nome').focus({ preventScroll: true });
    $('sim-status').textContent = 'Levamos os números para o formulário de proposta. Preencha os dados e prepare a mensagem.';
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const config = window.SOL_BAIRRO_CONFIG;
    if (!/^\d{10,15}$/.test(config.whatsapp)) { $('proposta-status').textContent = 'O WhatsApp ainda precisa ser configurado pelo responsável.'; return; }
    const telefone = $('pr-contato').value.trim();
    if (telefone.replace(/\D/g, '').length < 8) { $('proposta-status').textContent = 'Confira o telefone informado, com DDD.'; $('pr-contato').focus(); return; }
    const texto = montarMensagem();
    $('proposta-texto').textContent = texto;
    $('proposta-whats').href = 'https://wa.me/' + config.whatsapp + '?text=' + encodeURIComponent(texto);
    $('proposta-pronta').hidden = false;
    $('proposta-status').textContent = 'Mensagem preparada no navegador. Nada foi enviado nem salvo no banco.';
    $('proposta-whats').focus({ preventScroll: true });
    $('proposta-pronta').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
  });

  /* Catálogo opcional do banco */
  async function carregarServicos() {
    if (!window.SOL_BAIRRO_CONFIG.usarSupabase) return;
    $('modo-banco').textContent = 'Consultando catálogo no Supabase…';
    try {
      const dados = await window.SolBanco.servicos();
      const esperados = ['instalacao', 'manutencao', 'monitoramento'];
      if (!Array.isArray(dados) || dados.length !== 3 || !esperados.every(c => dados.some(s => s.codigo === c && typeof s.nome === 'string' && typeof s.descricao === 'string'))) throw Error('O catálogo precisa dos três serviços do roteiro SQL.');
      document.querySelectorAll('#lista-servicos .servico').forEach(cartao => {
        const codigo = cartao.querySelector('[data-servico]').dataset.servico;
        const servico = dados.find(item => item.codigo === codigo);
        cartao.querySelector('h3').textContent = servico.nome;
        cartao.querySelector('p').textContent = servico.descricao;
        cartao.querySelector('a').textContent = 'Quero ' + servico.nome.toLowerCase() + ' →';
        [...$('pr-servico').options].find(o => o.value === codigo).textContent = servico.nome;
      });
      $('modo-banco').textContent = 'Serviços carregados do Supabase. A proposta continua sem salvar dados; a conversa é enviada manualmente no WhatsApp.';
    } catch {
      $('modo-banco').textContent = 'Não foi possível carregar o banco. Exibindo serviços demonstrativos; nenhuma proposta foi enviada. O responsável deve conferir a conexão.';
    }
  }
  carregarServicos();
})();
