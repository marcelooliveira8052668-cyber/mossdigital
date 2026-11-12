/* Aplicação demonstrativa: toda informação temporária permanece só na memória. */
'use strict'; // Evita variáveis globais acidentais.
const $ = (selector, root = document) => root.querySelector(selector); // Seleção curta de um elemento.
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)]; // Lista estável de elementos.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)'); // Preferência de acessibilidade.
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); // Moeda brasileira.
const state = { billing: 'monthly', filter: 'all', expanded: false, photo: 0, day: 0, name: 'Atleta Demo', plan: 'Performance', reservations: new Map() }; // Não existe persistência, senha ou backend.
const prices = { Start: 129, Performance: 219, Black: 329 }; // Valores fictícios centralizados.
let toastTimer; // Permite substituir avisos sem empilhar temporizadores.

/* Um construtor mínimo usa textContent, nunca interpreta entradas do usuário como HTML. */
function el(tag, text, className) {
  const node = document.createElement(tag); // Cria o elemento sem interpolar HTML.
  if (text !== undefined) node.textContent = text; // Preserva caracteres como texto seguro.
  if (className) node.className = className; // Classes são definidas apenas pelo código.
  return node; // Retorna o nó pronto para compor a interface.
}

/* Mensagens de estado também são anunciadas por leitores de tela. */
function notify(message) {
  clearTimeout(toastTimer); // Cancela o aviso anterior.
  $('#toast').textContent = message; // Mensagem sem interpretação de HTML.
  $('#toast').classList.add('visible'); // Mostra a mensagem sem deslocar o layout.
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 4500); // Ocultação independente das animações.
}

/* Navegação móvel: botões e Escape sempre deixam o foco em uma posição visível. */
function closeMenu(restoreFocus = false) {
  $('#menu').classList.remove('is-open'); // Fecha o painel.
  $('.menu-toggle').setAttribute('aria-expanded', 'false'); // Informa o estado acessível.
  $('.menu-toggle').setAttribute('aria-label', 'Abrir menu'); // Atualiza a descrição do controle.
  if (restoreFocus) $('.menu-toggle').focus(); // Evita foco em um item que ficou oculto.
}
$('.menu-toggle').addEventListener('click', () => {
  const open = $('.menu-toggle').getAttribute('aria-expanded') !== 'true'; // Alterna o estado.
  $('#menu').classList.toggle('is-open', open); // Aplica a apresentação correspondente.
  $('.menu-toggle').setAttribute('aria-expanded', String(open)); // Expõe o estado ao leitor.
  $('.menu-toggle').setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); // Nome correspondente.
});
$$('#menu a').forEach(link => link.addEventListener('click', () => closeMenu(true))); // Âncoras fecham o menu móvel.
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !document.querySelector('dialog[open]')) closeMenu(true); // Escape fora dos diálogos.
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header') && $('#menu').classList.contains('is-open')) closeMenu(); // Clique externo.
});

/* Diálogos nativos: apenas um aberto de cada vez, com restauração de foco. */
let dialogReturnFocus = null; // Referência do último controle acionador.
function openDialog(id) {
  const previous = document.querySelector('dialog[open]'); // Identifica uma eventual transição de painel.
  if (!previous) dialogReturnFocus = document.activeElement; // Guarda o foco antes do primeiro diálogo.
  if (previous) previous.close(); // Não empilha modais.
  closeMenu(); // O menu nunca fica aberto atrás do diálogo.
  $(id).showModal(); // O navegador gerencia bloqueio de fundo e foco interno.
}
$$('dialog').forEach(dialog => {
  $('[data-close]', dialog).addEventListener('click', () => dialog.close()); // Fechamento explícito.
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } }); // Clique só no backdrop.
  dialog.addEventListener('close', () => {
    requestAnimationFrame(() => { // Espera uma possível abertura de outro diálogo.
      if (!document.querySelector('dialog[open]')) { // Não rouba foco de uma transição entre modais.
        const target = dialogReturnFocus; // Recupera o acionador original.
        if (target && target.getClientRects().length) target.focus({ preventScroll: true }); // Só foca elementos visíveis.
        else $('.menu-toggle').focus({ preventScroll: true }); // Alternativa para acionador móvel oculto.
      }
    });
  });
});
$$('[data-open]').forEach(button => button.addEventListener('click', () => openDialog(`#${button.dataset.open}`))); // Política de privacidade.

/* Dados editoriais de modalidades: equipamentos e benefícios são conceituais. */
const modalities = {
  forca: { title: ['FORÇA QUE', 'VAI ALÉM.'], kicker: 'CONSTRUA SUA MELHOR VERSÃO', tag: 'STRENGTH / PERFORMANCE', photo: 1552252, alt: 'Barra com anilhas sobre o piso de uma sala de treino', text: 'Da primeira repetição ao novo desafio. Um conceito de sala de musculação com equipamentos profissionais e áreas pensadas para diferentes etapas do seu treino.', equipment: ['Esteiras profissionais', 'Bicicletas ergométricas', 'Elípticos', 'Leg press', 'Smith machine', 'Supino articulado', 'Máquinas de remada', 'Polias ajustáveis', 'Estações multifuncionais', 'Área de pesos livres'] },
  aqua: { title: ['ENCONTRE', 'SEU FLUXO.'], kicker: 'RESPIRE. MERGULHE. EVOLUA.', tag: 'AQUA / ENDURANCE', photo: 261185, alt: 'Nadadores em piscina com raias demarcadas', text: 'Técnica, resistência e uma nova relação com o movimento. O centro aquático do conceito reúne propostas para nadar, aprender e se exercitar em diferentes ritmos.', equipment: ['Natação para adultos', 'Turmas de iniciação', 'Hidroginástica', 'Treino de resistência', 'Raias de treinamento', 'Pranchas e flutuadores', 'Orientação técnica', 'Atividades de baixo impacto'] },
  fight: { title: ['SUA FORÇA.', 'SEU CONTROLE.'], kicker: 'DISCIPLINA DENTRO E FORA DA ARENA', tag: 'FIGHT / FOCUS', photo: 1544774, alt: 'Praticantes de boxe em treino com luvas e manoplas', text: 'Aprender uma técnica é também aprender sobre você. O conceito Fight Club combina respeito, coordenação e disciplina, com turmas organizadas por experiência.', equipment: ['Boxe técnico', 'Muay thai', 'Jiu-jítsu', 'Turmas iniciantes', 'Área de tatame', 'Sacos de pancada', 'Manoplas e aparadores', 'Orientação profissional'] },
  move: { title: ['SAIA DO', 'AUTOMÁTICO.'], kicker: 'MOVIMENTO PARA A VIDA REAL', tag: 'MOVE / CONDITIONING', photo: 2294361, alt: 'Praticante realizando exercício funcional no solo da academia', text: 'Mobilidade, coordenação e condicionamento em sessões dinâmicas. Um espaço para desenvolver capacidade física, respeitando o seu momento e a orientação profissional.', equipment: ['Circuitos funcionais', 'Treino de mobilidade', 'Cordas navais', 'Kettlebells', 'Caixas de salto', 'Bolas medicinais', 'Faixas de resistência', 'Exercícios com peso corporal'] }
};
function chooseModality(key) {
  const data = modalities[key]; // Dados seguros definidos internamente.
  $$('[data-modality]').forEach(button => { const selected = button.dataset.modality === key; button.setAttribute('aria-selected', String(selected)); button.tabIndex = selected ? 0 : -1; }); // Padrão de abas com foco itinerante.
  $('#modality-panel').setAttribute('aria-labelledby', `tab-${key}`); // Liga o painel à aba ativa.
  $('#modality-title').replaceChildren(el('span', data.title[0]), document.createElement('br'), el('span', data.title[1])); // Título com quebra editorial.
  $('#modality-kicker').textContent = data.kicker; // Atualiza o subtítulo.
  $('#modality-tag').textContent = data.tag; // Atualiza a identificação da foto.
  $('#modality-text').textContent = data.text; // Descrição da modalidade.
  $('#modality-photo').src = `assets/img/${data.photo}.webp`; // Arquivo local correspondente.
  $('#modality-photo').alt = data.alt; // Alternativa fiel à fotografia.
  $('#equipment').replaceChildren(...data.equipment.map(item => el('li', item))); // Lista sem HTML dinâmico inseguro.
}
$$('[data-modality]').forEach((button, index, tabs) => {
  button.addEventListener('click', () => chooseModality(button.dataset.modality)); // Ativação por toque ou clique.
  button.addEventListener('keydown', event => {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']; // Navegação de abas por teclado.
    if (!keys.includes(event.key)) return; // Demais teclas mantêm o comportamento nativo.
    event.preventDefault(); // Não rola a página ao trocar de aba.
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length; // Índice circular.
    chooseModality(tabs[next].dataset.modality); // Seleciona a próxima modalidade.
    tabs[next].focus(); // Move o foco junto com a seleção.
  });
});

/* Carrossel sem autoplay: respeita escolha do visitante e economiza processamento. */
function slideSpace(direction) {
  const carousel = $('#space-carousel'); // Contêiner horizontal nativo.
  const max = carousel.scrollWidth - carousel.clientWidth; // Limite de deslocamento.
  let target = carousel.scrollLeft + direction * ($('.space-card').getBoundingClientRect().width + 22); // Um cartão por ação.
  if (direction > 0 && carousel.scrollLeft >= max - 3) target = 0; // Retorna ao primeiro no fim.
  if (direction < 0 && carousel.scrollLeft <= 3) target = max; // Retorna ao último no começo.
  carousel.scrollTo({ left: target, behavior: reduceMotion.matches ? 'instant' : 'smooth' }); // Preferência de movimento.
}
$('#space-prev').addEventListener('click', () => slideSpace(-1)); // Instalação anterior.
$('#space-next').addEventListener('click', () => slideSpace(1)); // Próxima instalação.
$('#space-carousel').addEventListener('keydown', event => { if (['ArrowRight', 'ArrowLeft'].includes(event.key)) { event.preventDefault(); slideSpace(event.key === 'ArrowRight' ? 1 : -1); } }); // Controle também por teclado.

/* Curadoria visual conferida: cada legenda descreve o conteúdo efetivo da foto. */
const photos = [
  [260352, 'forca', 'Halteres / área de pesos livres'], // Fileiras de halteres no suporte.
  [1954524, 'forca', 'Cardio / esteiras profissionais'], // Alunos em esteiras diante de janelas.
  [1552252, 'forca', 'Barra e anilhas / treino de força'], // Barra no piso de academia.
  [261185, 'aqua', 'Natação / piscina com raias'], // Piscina com nadadores e divisórias.
  [1544774, 'fight', 'Boxe / treino com manoplas'], // Dupla com luvas e aparadores.
  [1552242, 'move', 'Condicionamento / cordas navais'], // Dupla realizando exercício com cordas.
  [4162451, 'forca', 'Musculação / seleção de halteres'], // Vista de um suporte completo.
  [3836861, 'forca', 'Cardio / bicicleta ergométrica'], // Pessoa em bicicleta de exercício.
  [949129, 'forca', 'Pesos livres / preparação da barra'], // Praticante junto à barra carregada.
  [841130, 'forca', 'Treino com barra / levantamento'], // Exercício com anilhas grandes.
  [841131, 'forca', 'Força / pegada e execução'], // Detalhe da pegada na barra.
  [841135, 'forca', 'Barra olímpica / movimento'], // Preparação de levantamento no piso.
  [4164761, 'forca', 'Halteres / treino individual'], // Close de uma mão segurando halter.
  [2261477, 'forca', 'Área livre / levantamento com barra'], // Atleta e barra na plataforma.
  [1552106, 'forca', 'Treino de força / agachamento'], // Atleta com barra sobre os ombros.
  [1552249, 'forca', 'Agachamento / barra livre'], // Atleta agachando com anilhas.
  [863988, 'aqua', 'Técnica / natação em raia'], // Vista superior de nadador.
  [4162449, 'fight', 'Fight arena / saco de pancada'], // Equipamento de boxe na sala.
  [4761792, 'fight', 'Boxe / luvas e preparação'], // Atleta ajustando equipamento.
  [4753996, 'move', 'Funcional / exercício de solo'], // Apoio de braço e corpo em movimento.
  [4162487, 'move', 'Peso corporal / flexão de braços'], // Praticante em posição de flexão.
  [4162491, 'move', 'Controle corporal / força no solo'], // Outra tomada de exercício funcional.
  [2294361, 'move', 'Condicionamento / circuito funcional'], // Praticante em exercício no solo.
  [4164512, 'move', 'Recuperação / pausa para hidratação'] // Atleta bebendo água junto a argolas.
].map(([id, category, title]) => ({ id, category, title })); // Converte tuplas para objetos nomeados.
const filteredPhotos = () => photos.filter(photo => state.filter === 'all' || photo.category === state.filter); // Seleção da galeria.
function renderGallery() {
  const filtered = filteredPhotos(); // Todas as fotos correspondentes ao filtro.
  const visible = state.expanded || state.filter !== 'all' ? filtered : filtered.slice(0, 8); // Limita o carregamento inicial.
  $('#gallery-grid').replaceChildren(...visible.map((photo, index) => {
    const button = el('button', undefined, 'gallery-photo'); // Foto inteira é um botão acessível.
    button.setAttribute('aria-label', `Ampliar: ${photo.title}`); // Nome completo para o leitor.
    const image = el('img'); // Imagem da galeria.
    image.src = `assets/img/thumb-${photo.id}.webp`; // Miniatura de baixa resolução.
    image.alt = photo.title; // Descrição compatível com o conteúdo conferido.
    image.width = 500; image.height = 400; image.loading = 'lazy'; // Dimensões e carregamento sob demanda.
    const caption = el('span', photo.title); // Legenda persistente sobre a imagem.
    caption.append(el('b', '↗')); // Ícone decorativo do acionamento.
    button.append(image, caption); // Monta o botão com nós seguros.
    button.addEventListener('click', () => { state.photo = index; updateLightbox(); openDialog('#lightbox'); }); // Abre no índice do filtro atual.
    return button; // Entrega o cartão pronto.
  }));
  $('#gallery-status').textContent = `${visible.length} de ${filtered.length} fotografias ilustrativas`; // Anúncio de quantidade.
  $('#gallery-more').hidden = state.expanded || state.filter !== 'all'; // Evita um controle sem efeito.
}
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  state.filter = button.dataset.filter; // Guarda o filtro ativo.
  $$('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); // Apenas um filtro selecionado.
  renderGallery(); // Recompõe a grade localmente.
}));
$('#gallery-more').addEventListener('click', () => { state.expanded = true; renderGallery(); $('.gallery-photo:nth-child(9)').focus({ preventScroll: true }); }); // Continua no primeiro item adicionado.
function updateLightbox() {
  const filtered = filteredPhotos(); // Navegação respeita o filtro escolhido.
  state.photo = (state.photo + filtered.length) % filtered.length; // Mantém o índice circular.
  const photo = filtered[state.photo]; // Fotografia atual.
  $('#lightbox-img').src = `assets/img/${photo.id}.webp`; // Arquivo maior só no lightbox.
  $('#lightbox-img').alt = photo.title; // Texto alternativo fiel.
  $('#lightbox-title').textContent = photo.title; // Legenda ampliada.
  $('#photo-counter').textContent = `${state.photo + 1} / ${filtered.length}`; // Posição no conjunto filtrado.
  $('#photo-source').href = `https://www.pexels.com/photo/${photo.id}/`; // Fonte específica verificável.
}
function movePhoto(direction) { state.photo += direction; updateLightbox(); } // Passo circular da galeria.
$('#photo-prev').addEventListener('click', () => movePhoto(-1)); // Foto anterior.
$('#photo-next').addEventListener('click', () => movePhoto(1)); // Próxima foto.
$('#lightbox').addEventListener('keydown', event => { if (['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); movePhoto(event.key === 'ArrowRight' ? 1 : -1); } }); // Setas sem rolagem indevida.

/* Grade fictícia com reservas reversíveis, sem capacidade ou confirmação reais. */
const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']; // Nomes legíveis da semana demonstrativa.
const classes = [
  [['06:30', 'Funcional', 'Move Lab', '45 min'], ['08:00', 'Natação', 'Aqua Zone', '50 min'], ['18:00', 'Boxe iniciante', 'Fight Arena', '50 min'], ['19:30', 'Mobilidade', 'Move Lab', '40 min']], // Segunda.
  [['07:00', 'Hidroginástica', 'Aqua Zone', '45 min'], ['12:00', 'Funcional', 'Move Lab', '45 min'], ['18:30', 'Muay thai', 'Fight Arena', '50 min'], ['20:00', 'Jiu-jítsu', 'Fight Arena', '60 min']], // Terça.
  [['06:30', 'Funcional', 'Move Lab', '45 min'], ['09:00', 'Natação iniciante', 'Aqua Zone', '50 min'], ['18:00', 'Boxe técnico', 'Fight Arena', '50 min'], ['19:30', 'Mobilidade', 'Move Lab', '40 min']], // Quarta.
  [['07:00', 'Hidroginástica', 'Aqua Zone', '45 min'], ['12:00', 'Circuito funcional', 'Move Lab', '45 min'], ['18:30', 'Muay thai', 'Fight Arena', '50 min'], ['20:00', 'Jiu-jítsu iniciante', 'Fight Arena', '60 min']], // Quinta.
  [['06:30', 'Funcional', 'Move Lab', '45 min'], ['08:00', 'Natação', 'Aqua Zone', '50 min'], ['18:00', 'Boxe', 'Fight Arena', '50 min'], ['19:00', 'Mobilidade', 'Move Lab', '40 min']], // Sexta.
  [['08:00', 'Natação', 'Aqua Zone', '50 min'], ['09:00', 'Circuito funcional', 'Move Lab', '45 min'], ['10:00', 'Boxe iniciante', 'Fight Arena', '50 min']] // Sábado.
];
function renderSchedule() {
  $('#schedule-list').replaceChildren(...classes[state.day].map(([time, title, room, duration], index) => {
    const id = `${state.day}-${index}`; // Identificador estável da aula demonstrativa.
    const row = el('article', undefined, 'class-row'); // Linha sem semântica de tabela quebrada no celular.
    const timeNode = el('time', time); // Horário legível e semanticamente marcado.
    timeNode.dateTime = time; // Valor normalizado para agentes de leitura.
    const copy = el('div'); // Nome e duração da aula.
    copy.append(el('h3', title), el('small', `${duration} • aula demonstrativa`)); // Identificação fictícia junto ao conteúdo.
    const button = el('button', state.reservations.has(id) ? 'REMOVER RESERVA ×' : 'RESERVAR DEMO ↗', 'reserve-button'); // Estado da reserva local.
    button.setAttribute('aria-pressed', String(state.reservations.has(id))); // Informa seleção.
    button.setAttribute('aria-label', `${state.reservations.has(id) ? 'Remover reserva demonstrativa' : 'Reservar demonstração'}: ${title}, ${days[state.day]}, ${time}`); // Desambigua controles repetidos.
    button.addEventListener('click', () => {
      if (state.reservations.has(id)) { state.reservations.delete(id); notify('Reserva demonstrativa removida.'); } // Cancelamento reversível.
      else { state.reservations.set(id, { day: days[state.day], time, title, room }); notify('Adicionada à área do aluno. Nenhuma vaga real foi reservada.'); } // Adição apenas em memória.
      renderSchedule(); renderReservations(); // Sincroniza os dois painéis.
      $$('button', $('#schedule-list'))[index].focus({ preventScroll: true }); // Preserva posição de teclado após renderizar.
    });
    row.append(timeNode, copy, el('span', room.toUpperCase(), 'class-category'), button); // Monta a aula.
    return row; // Entrega a linha pronta.
  }));
}
$$('[data-day]').forEach(button => button.addEventListener('click', () => {
  state.day = Number(button.dataset.day); // Dia em exibição.
  $$('[data-day]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); // Atualiza o controle selecionado.
  renderSchedule(); // Mostra somente as aulas do dia escolhido.
}));

/* Planos mensais e anuais usam centavos exatos e exibem o compromisso total. */
const monthlyPrice = plan => state.billing === 'annual' ? Math.round(prices[plan] * 85) / 100 : prices[plan]; // Desconto de 15%, sem arredondar para inteiro.
function planTerm(plan) { return state.billing === 'annual' ? `${money(monthlyPrice(plan) * 12)} à vista / 12 meses (simulação)` : 'Cobrança mensal • sem fidelidade'; } // Condições explícitas.
function updatePrices() {
  $$('[data-price]').forEach(node => {
    const price = state.billing === 'annual' ? Number(node.dataset.price) * .85 : Number(node.dataset.price); // Valor correspondente à periodicidade.
    const [integer, decimals] = price.toFixed(2).split('.'); // Separa o preço para o tratamento tipográfico.
    node.textContent = integer; // Parte principal do preço.
    node.nextElementSibling.textContent = `,${decimals}/mês`; // Centavos corretos, inclusive no anual.
    $('.plan-term', node.closest('.plan-card')).textContent = planTerm(Object.keys(prices).find(plan => prices[plan] === Number(node.dataset.price))); // Total anual sem esconder o desembolso.
  });
  updateEnrollSummary(); // O formulário acompanha o período escolhido.
}
$$('[data-billing]').forEach(button => button.addEventListener('click', () => {
  state.billing = button.dataset.billing; // Periodicidade selecionada.
  $$('[data-billing]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); // Estado visual e acessível.
  updatePrices(); // Recalcula os cartões e o resumo.
}));
function updateEnrollSummary() {
  const plan = $('#enroll-form').elements.plan.value; // Plano do formulário, não necessariamente o último confirmado.
  $('#enroll-summary').replaceChildren(el('strong', `${plan} • ${money(monthlyPrice(plan))}/mês`), el('br'), document.createTextNode(planTerm(plan))); // Resumo seguro e verificável.
}
function startEnroll(plan) {
  $('#enroll-form').hidden = false; $('#enroll-result').hidden = true; // Restaura o fluxo de simulação.
  $('#enroll-form').elements.plan.value = plan; // Pré-seleciona o cartão acionado.
  updateEnrollSummary(); // Calcula o resumo atual.
  openDialog('#enroll-dialog'); // Abre o fluxo sem navegar para fora.
}
$$('[data-enroll]').forEach(button => button.addEventListener('click', () => startEnroll(button.dataset.enroll))); // Ações de matrícula em toda a página.
$('#enroll-form').elements.plan.addEventListener('change', updateEnrollSummary); // Mudança de plano no diálogo.
$('#enroll-form').addEventListener('submit', event => {
  event.preventDefault(); // Nunca envia dados para um servidor.
  const form = event.currentTarget; // Formulário já validado nativamente.
  const name = form.elements.name.value.trim(); // Remove espaços sem interpretar marcação.
  if (name.length < 2) { form.elements.name.setCustomValidity('Digite ao menos dois caracteres para o nome fictício.'); form.elements.name.reportValidity(); return; } // Valida nome não vazio.
  state.name = name; state.plan = form.elements.plan.value; // Estado temporário da demonstração.
  $('#enroll-result-text').textContent = `${state.name}, esta é sua prévia do plano ${state.plan}: ${money(monthlyPrice(state.plan))}/mês. Objetivo ilustrativo: ${form.elements.goal.value.toLowerCase()}. ${planTerm(state.plan)}.`; // Usa somente texto seguro.
  form.hidden = true; $('#enroll-result').hidden = false; // Exibe o resultado honesto, sem confirmação contratual.
  $('#enroll-to-student').focus(); // Encaminha o foco ao próximo passo.
});
$('#enroll-form').elements.name.addEventListener('input', event => event.target.setCustomValidity('')); // Limpa erro quando houver edição.
$('#enroll-reset').addEventListener('click', () => { $('#enroll-form').reset(); startEnroll('Performance'); }); // Nova simulação sem sobras da anterior.

/* Área do aluno sem falsa autenticação: treino ilustrativo e reservas em memória. */
function showStudent() {
  $('#student-name').textContent = state.name.toUpperCase(); // Nome fictício protegido por textContent.
  $('#student-plan').textContent = state.plan.toUpperCase(); // Plano da última simulação.
  renderReservations(); // Atualiza reservas feitas pela agenda.
  openDialog('#student-dialog'); // Não solicita e-mail ou senha.
}
$$('[data-student]').forEach(button => button.addEventListener('click', showStudent)); // Acesso pelo menu.
$('#enroll-to-student').addEventListener('click', showStudent); // Acesso depois da simulação.
$$('[data-student-tab]').forEach(button => button.addEventListener('click', () => {
  $$('[data-student-tab]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); // Seleção da subárea.
  $('#workout-panel').hidden = button.dataset.studentTab !== 'workout'; // Alterna treino.
  $('#reservations-panel').hidden = button.dataset.studentTab !== 'reservations'; // Alterna aulas reservadas.
}));
function renderReservations() {
  $('#reservation-count').textContent = state.reservations.size; // Contador na aba do aluno.
  const rows = [...state.reservations.entries()].map(([id, reservation]) => {
    const row = el('div', undefined, 'reservation-item'); // Reserva visual.
    const copy = el('div'); // Texto da aula demonstrativa.
    copy.append(el('p', reservation.title), el('small', `${reservation.day} • ${reservation.time} • ${reservation.room}`)); // Horário e ambiente.
    const cancel = el('button', 'REMOVER ×'); // Cancelamento local explícito.
    cancel.setAttribute('aria-label', `Remover reserva: ${reservation.title}, ${reservation.day}, ${reservation.time}`); // Desambiguação.
    cancel.addEventListener('click', () => { state.reservations.delete(id); renderReservations(); renderSchedule(); $('#student-to-schedule').focus(); }); // Sincroniza e mantém foco visível.
    row.append(copy, cancel); // Compõe a linha.
    return row; // Entrega reserva montada.
  });
  $('#reservation-list').replaceChildren(...(rows.length ? rows : [el('p', 'Nenhuma aula demonstrativa selecionada. Explore a grade e experimente uma reserva.', 'muted')])); // Estado vazio informativo.
}
$('#student-to-schedule').addEventListener('click', () => {
  $('#student-dialog').close(); // Retorna ao conteúdo principal.
  $('#agenda').scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : 'smooth' }); // Navega para a grade.
  dialogReturnFocus = $('[data-day="0"]'); // Após fechar, o foco fica no destino correto.
});

/* Visita fictícia: data futura, nenhum campo de contato e nenhum envio real. */
function todayLocal() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; } // Evita deslocamento de fuso por UTC.
$('#visit-form').elements.date.min = todayLocal(); // Calendário bloqueia datas passadas.
$('#visit-open').addEventListener('click', () => { $('#visit-result').hidden = true; openDialog('#visit-dialog'); }); // Abre a prévia de visita.
$('#visit-form').addEventListener('submit', event => {
  event.preventDefault(); // Sem rede, sem confirmação externa.
  const form = event.currentTarget; // Referência aos valores fictícios.
  const date = form.elements.date.value; // Data normalizada pelo input nativo.
  if (date < todayLocal()) { form.elements.date.setCustomValidity('Escolha hoje ou uma data futura.'); form.elements.date.reportValidity(); return; } // Verificação extra.
  if (form.elements.visitor.value.trim().length < 2) { form.elements.visitor.setCustomValidity('Use um nome fictício com pelo menos dois caracteres.'); form.elements.visitor.reportValidity(); return; } // Evita apenas espaços.
  const formatted = new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR'); // Formata sem alterar o dia escolhido.
  $('#visit-result').textContent = `${form.elements.visitor.value.trim()}, sua prévia de visita: ${formatted}, às ${form.elements.time.value}. Apenas uma simulação: não houve agendamento, envio ou confirmação com uma unidade real.`; // Resultado transparente.
  $('#visit-result').hidden = false; // Mostra o status para leitores e visitantes.
});
$$('input', $('#visit-form')).forEach(input => input.addEventListener('input', () => { input.setCustomValidity(''); $('#visit-result').hidden = true; })); // Remove mensagem desatualizada.
$('#visit-form').elements.time.addEventListener('change', () => { $('#visit-result').hidden = true; }); // Horário editado invalida a prévia anterior.

/* Animações executam só quando os elementos entram em tela e só uma vez. */
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  document.documentElement.classList.add('motion-ready'); // Ativa a revelação apenas com suporte completo.
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return; // Não calcula elementos fora da tela.
    entry.target.classList.add('is-visible'); // Revela o bloco.
    observer.unobserve(entry.target); // Libera observação após a primeira entrada.
  }), { threshold: .08 }); // Disparo suave, inclusive em telas pequenas.
  $$('.reveal').forEach(node => observer.observe(node)); // Observa somente blocos editoriais.
  const counts = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return; // Contador ainda não chegou à tela.
    const node = entry.target; const end = Number(node.dataset.count); const start = performance.now(); // Estado numérico do contador.
    function frame(now) { const progress = Math.min((now - start) / 1000, 1); node.textContent = Math.round(end * (1 - (1 - progress) ** 3)) + (node.dataset.suffix || ''); if (progress < 1) requestAnimationFrame(frame); } // Animação curta sem intervalos permanentes.
    requestAnimationFrame(frame); counts.unobserve(node); // Inicia uma única execução.
  }), { threshold: .6 }); // A maioria do número precisa estar visível.
  $$('[data-count]').forEach(node => counts.observe(node)); // Os valores iniciais continuam corretos sem JS.
}
$('#year').textContent = new Date().getFullYear(); // Atualiza apenas o ano do rodapé.
renderGallery(); renderSchedule(); renderReservations(); updatePrices(); // Inicialização previsível dos componentes.
