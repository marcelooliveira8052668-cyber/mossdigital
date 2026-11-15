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

  /* Montador de plano: cálculo local de escopo e tempo estimado. */
  const MINUTOS_AMBIENTE = { 'Sala': 60, 'Cozinha': 75, 'Banheiro': 45, 'Quartos': 40, 'Lavanderia': 30, 'Varanda e janelas': 40 };
  const MULTIPLICADOR = { manutencao: 1.0, profunda: 1.6, mudanca: 1.3, posobra: 2.2 };
  const NOMES_TIPO = { manutencao: 'Manutenção', profunda: 'Limpeza profunda', mudanca: 'Pré-mudança', posobra: 'Pós-obra' };
  const MINUTOS_POR_PESSOA = 25;
  const checkboxes = [...document.querySelectorAll('input[name=ambiente]')];
  const radios = [...document.querySelectorAll('input[name=tipo]')];
  const botoesPessoas = [...document.querySelectorAll('[data-pessoas]')];
  let pessoas = 2, ultimo = null;
  function calcular() {
    const tipo = (radios.find(r => r.checked) || {}).value || 'manutencao';
    const ambientes = checkboxes.filter(c => c.checked).map(c => c.value);
    const base = ambientes.reduce((soma, ambiente) => soma + (MINUTOS_AMBIENTE[ambiente] || 0), 0);
    const minutos = Math.round((base * (MULTIPLICADOR[tipo] || 1) + MINUTOS_POR_PESSOA * pessoas) / 5) * 5;
    const horas = (minutos / 60);
    const equipe = minutos <= 180 ? 1 : minutos <= 420 ? 2 : 3;
    $('plano-tipo').textContent = NOMES_TIPO[tipo];
    $('plano-ambientes').textContent = ambientes.length;
    $('plano-tempo').textContent = horas >= 1 ? (Number.isInteger(horas) ? horas + ' h' : horas.toFixed(1).replace('.', ',') + ' h') : minutos + ' min';
    $('plano-equipe').textContent = equipe + (equipe === 1 ? ' pessoa' : ' pessoas');
    const lista = $('plano-lista');
    lista.replaceChildren();
    if (!ambientes.length) {
      const vazio = document.createElement('li'); vazio.className = 'vazio'; vazio.textContent = 'Marque ao menos um ambiente para montar o plano.';
      lista.append(vazio);
    } else {
      ambientes.forEach(ambiente => {
        const item = document.createElement('li');
        item.textContent = ambiente + ' · ' + (MINUTOS_AMBIENTE[ambiente] || 0) + ' min base';
        lista.append(item);
      });
    }
    ultimo = { tipo, nomeTipo: NOMES_TIPO[tipo], ambientes, pessoas, minutos, horas: Number(horas.toFixed(1)), equipe };
    return ultimo;
  }
  radios.forEach(r => r.addEventListener('change', calcular));
  checkboxes.forEach(c => c.addEventListener('change', calcular));
  botoesPessoas.forEach(botao => botao.addEventListener('click', () => {
    pessoas = Number(botao.dataset.pessoas);
    botoesPessoas.forEach(outro => outro.setAttribute('aria-pressed', String(outro === botao)));
    calcular();
  }));
  $('plano-todos').addEventListener('click', () => { checkboxes.forEach(c => c.checked = true); calcular(); });
  $('plano-limpar-ambientes').addEventListener('click', () => { checkboxes.forEach(c => c.checked = false); calcular(); });
  calcular();

  function textoDoPlano() {
    const d = ultimo || calcular();
    return 'Plano montado no site Casa Impecável:\n' +
      'Tipo: ' + d.nomeTipo + '\n' +
      'Ambientes (' + d.ambientes.length + '): ' + (d.ambientes.length ? d.ambientes.join(', ') : 'nenhum marcado') + '\n' +
      'Pessoas na casa: ' + d.pessoas + '\n' +
      'Tempo estimado: ' + d.horas + ' h, com ' + d.equipe + (d.equipe === 1 ? ' pessoa' : ' pessoas') + '\n' +
      'Estimativa do site, a confirmar na visita.';
  }
  $('plano-enviar').addEventListener('click', () => {
    if (!ultimo || !ultimo.ambientes.length) {
      $('plano-status').textContent = 'Marque ao menos um ambiente antes de enviar o plano.';
      return;
    }
    document.getElementById('pedido').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    $('pe-nome').focus({ preventScroll: true });
    $('plano-status').textContent = 'Plano pronto. Use dados inventados para ver como seria um pedido.';
  });

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

  /* Pedido */
  const form = $('form-pedido');
  function reiniciar() { $('pedido-pronto').hidden = true; $('pedido-status').textContent = ''; $('pedido-whats').removeAttribute('href'); }
  document.querySelectorAll('[data-servico]').forEach(a => a.addEventListener('click', () => { $('pe-servico').value = a.dataset.servico; reiniciar(); }));
  form.addEventListener('input', reiniciar);
  form.addEventListener('change', reiniciar);
  form.addEventListener('reset', () => { reiniciar(); $('pedido-texto').textContent = ''; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const config = window.CASA_IMPECAVEL_CONFIG;
    if (!/^\d{10,15}$/.test(config.whatsapp)) { $('pedido-status').textContent = 'O WhatsApp ainda precisa ser configurado pelo responsável.'; return; }
    const telefone = $('pe-contato').value.trim();
    if (telefone.replace(/\D/g, '').length < 8) { $('pedido-status').textContent = 'Confira o telefone informado, com DDD.'; $('pe-contato').focus(); return; }
    const d = ultimo || calcular();
    const linhas = [
      'Olá! Vim pelo site Casa Impecável e quero um orçamento.',
      '',
      'Nome: ' + $('pe-nome').value.trim(),
      'WhatsApp: ' + telefone,
      'Bairro: ' + $('pe-bairro').value.trim(),
      'Serviço: ' + $('pe-servico').selectedOptions[0].textContent
    ];
    if ($('pe-quando').value.trim()) linhas.push('Preferência de dia/horário: ' + $('pe-quando').value.trim());
    if ($('pe-detalhes').value.trim()) linhas.push('Sobre a casa: ' + $('pe-detalhes').value.trim());
    if (d.ambientes.length) {
      linhas.push('', textoDoPlano());
    }
    linhas.push('', 'Quero saber valor, prazo e como funciona.');
    const texto = linhas.join('\n');
    $('pedido-texto').textContent = texto;
    $('pedido-whats').href = 'https://wa.me/' + config.whatsapp + '?text=' + encodeURIComponent('Olá, MOSS Digital! Vi a demo Casa Impecável e gostaria de conversar sobre a criação de um site como este.');
    $('pedido-pronto').hidden = false;
    $('pedido-status').textContent = 'Exemplo preparado no navegador. Não foi enviado nem salvo. O link do WhatsApp é para conversar sobre criação de sites.';
    $('pedido-whats').focus({ preventScroll: true });
    $('pedido-pronto').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
  });

  /* Catálogo opcional do banco */
  async function carregarServicos() {
    if (!window.CASA_IMPECAVEL_CONFIG.usarSupabase) return;
    $('modo-banco').textContent = 'Consultando catálogo no Supabase…';
    try {
      const dados = await window.CasaBanco.servicos();
      const esperados = ['manutencao', 'profunda', 'mudanca'];
      if (!Array.isArray(dados) || dados.length !== 3 || !esperados.every(c => dados.some(s => s.codigo === c && typeof s.nome === 'string' && typeof s.descricao === 'string'))) throw Error('O catálogo precisa dos três serviços do roteiro SQL.');
      document.querySelectorAll('#lista-servicos .servico').forEach(cartao => {
        const codigo = cartao.querySelector('[data-servico]').dataset.servico;
        const servico = dados.find(item => item.codigo === codigo);
        cartao.querySelector('h3').textContent = servico.nome;
        cartao.querySelector('p').textContent = servico.descricao;
        [...$('pe-servico').options].find(o => o.value === codigo).textContent = servico.nome;
      });
      $('modo-banco').textContent = 'Serviços carregados do Supabase. O pedido continua sem salvar dados; a conversa é enviada manualmente no WhatsApp.';
    } catch {
      $('modo-banco').textContent = 'Não foi possível carregar o banco. Exibindo serviços demonstrativos; nenhum pedido foi enviado. O responsável deve conferir a conexão.';
    }
  }
  carregarServicos();
})();
