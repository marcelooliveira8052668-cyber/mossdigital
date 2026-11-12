'use strict';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const contentDialog = $('#content-dialog');
const galleryDialog = $('#gallery-dialog');
let previousFocus;

function openDialog(dialog) {
  previousFocus = document.activeElement;
  dialog.showModal();
  document.body.classList.add('modal-open');
}
function closeDialog(dialog) { dialog.close(); }
$$('dialog').forEach(dialog => {
  $('[data-close]', dialog).addEventListener('click', () => closeDialog(dialog));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog);
  });
  dialog.addEventListener('close', () => {
    $$('video', dialog).forEach(video => video.pause());
    document.body.classList.remove('modal-open');
    previousFocus?.focus();
  });
});

const menuToggle = $('.menu-toggle');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  $('#main-nav').classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  $('#main-nav').classList.toggle('is-open', open);
});
$$('#main-nav a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const gallery = $$('[data-gallery]').map(button => ({ src: $('img', button).src.replace(/w=\d+/, 'w=1800'), alt: $('img', button).alt, title: $('h3', button).textContent }));
let photoIndex = 0;
function displayPhoto(index) {
  photoIndex = (index + gallery.length) % gallery.length;
  const photo = gallery[photoIndex];
  $('#gallery-image').src = photo.src;
  $('#gallery-image').alt = photo.alt;
  $('#gallery-caption').textContent = `${String(photoIndex + 1).padStart(2, '0')} / 04 — ${photo.title} · Imagem ilustrativa`;
}
$$('[data-gallery]').forEach(button => button.addEventListener('click', () => { displayPhoto(Number(button.dataset.gallery)); openDialog(galleryDialog); }));
$('.gallery-prev').addEventListener('click', () => displayPhoto(photoIndex - 1));
$('.gallery-next').addEventListener('click', () => displayPhoto(photoIndex + 1));
galleryDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') displayPhoto(photoIndex - 1);
  if (event.key === 'ArrowRight') displayPhoto(photoIndex + 1);
});

function activateTab(button, buttons) {
  buttons.forEach(tab => { const active = tab === button; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
}
function addTabKeyboard(container) {
  container.addEventListener('keydown', event => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    const tabs = $$('[role="tab"]', container);
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    event.preventDefault();
    let next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].click(); tabs[next].focus();
  });
}
const filterButtons = $$('[data-filter]');
filterButtons.forEach(button => button.addEventListener('click', () => {
  activateTab(button, filterButtons);
  $('#modality-grid').setAttribute('aria-labelledby', button.id);
  $$('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
}));
addTabKeyboard($('.modality-tabs'));

const modalityDetails = {
  'Musculação': ['Força que acompanha a sua evolução.', 'Treinos individualizados, área de pesos livres e máquinas para todos os grupos musculares. Orientação profissional desde o primeiro dia.', 'Todos os níveis · Plano Start, Plus ou Black'],
  'Natação': ['Um novo ritmo, dentro da água.', 'Aulas por nível para desenvolver técnica, resistência e confiança na piscina. A definição da turma depende da avaliação do professor.', 'Iniciante ao avançado · Plano Black'],
  'Boxe & Muay Thai': ['Foco na mente. Potência no movimento.', 'Técnica, coordenação e condicionamento em aulas orientadas. Consulte a equipe sobre equipamentos de proteção e turmas iniciantes.', 'Todos os níveis · Plano Plus ou Black'],
  'Funcional': ['Prepare seu corpo para a vida.', 'Circuitos dinâmicos de força, mobilidade e resistência. Os exercícios e intensidades são adaptados ao seu nível.', 'Todos os níveis · Plano Plus ou Black'],
  'Yoga & Pilates': ['Respire. Fortaleça. Reconecte.', 'Práticas de consciência corporal, estabilidade e flexibilidade. A proposta do plano Black inclui Yoga e Pilates solo.', 'Todos os níveis · Plano Black'],
  'Hidroginástica': ['Leve para as articulações. Incrível para você.', 'Movimentos na água para trabalhar condicionamento, coordenação e força com menor impacto. Procure orientação profissional para avaliar suas necessidades.', 'Todos os níveis · Plano Black']
};
$$('[data-modality]').forEach(button => button.addEventListener('click', () => {
  const title = button.dataset.modality;
  const detail = modalityDetails[title];
  $('#dialog-content').innerHTML = `<div class="dialog-body"><div class="eyebrow">ENCONTRE O QUE TE MOVE</div><h2>${title.toUpperCase()}</h2><p><strong>${detail[0]}</strong></p><p>${detail[1]}</p><p>${detail[2]}</p><p class="form-hint">Modalidade apresentada em caráter demonstrativo. A grade e as condições dependem da unidade.</p><button class="btn btn-lime" id="try-modality">Quero experimentar <svg><use href="#i-arrow"/></svg></button></div>`;
  openDialog(contentDialog);
  $('#try-modality').addEventListener('click', () => renderEnroll(`Aula experimental — ${title}`));
}));

function renderEnroll(plan) {
  $('#dialog-content').innerHTML = `<div class="dialog-body"><div class="eyebrow">SEU DIA UM COMEÇA AQUI</div><h2>VAMOS DAR<br>O PRIMEIRO PASSO?</h2><p>Preencha seu interesse. Esta é uma demonstração: não realiza matrícula, reserva, envio de dados ou cobrança.</p><form class="enroll-form"><label>Seu nome<input name="name" autocomplete="name" required minlength="2" maxlength="90" placeholder="Como podemos chamar você?"></label><label>E-mail<input type="email" name="email" autocomplete="email" required maxlength="160" placeholder="voce@email.com"></label><label>Celular com DDD<input type="tel" name="phone" autocomplete="tel" inputmode="tel" required minlength="10" maxlength="16" placeholder="(11) 99999-9999"></label><label>Tenho interesse em<select name="interest"><option>PULSE START</option><option>PULSE PLUS</option><option>PULSE BLACK</option><option>Aula experimental</option><option>Visita à academia</option></select></label><label class="consent"><input type="checkbox" required><span>Entendo que este é um site demonstrativo e que meu interesse será salvo somente neste navegador, sem envio à academia.</span></label><button class="btn btn-lime" type="submit">Salvar meu interesse <svg><use href="#i-arrow"/></svg></button><p class="form-hint">Seus dados de contato não serão armazenados. Apenas seu primeiro nome e o plano de interesse ficam nesta sessão para demonstrar a área do aluno.</p></form></div>`;
  const phone = $('input[name="phone"]', contentDialog);
  phone.addEventListener('input', () => {
    const digits = phone.value.replace(/\D/g, '');
    const valid = /^[\d\s()+-]+$/.test(phone.value) && (digits.length === 10 || digits.length === 11);
    phone.setCustomValidity(valid ? '' : 'Informe um telefone válido com DDD (10 ou 11 dígitos).');
  });
  const select = $('select', contentDialog);
  const option = [...select.options].find(item => item.value === plan);
  if (option) select.value = plan;
  else { const custom = new Option(plan, plan, true, true); select.add(custom); }
  $('.enroll-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const firstName = data.get('name').trim().split(/\s+/)[0];
    const interest = data.get('interest');
    let saved = true;
    try { sessionStorage.setItem('pulse-demo', JSON.stringify({ firstName, interest })); } catch { saved = false; }
    $('#dialog-content').innerHTML = `<div class="dialog-body"><div class="success-icon"><svg><use href="#i-check"/></svg></div><div class="eyebrow">PRIMEIRO PASSO DADO</div><h2>BOA ESCOLHA!</h2><p id="success-message"></p><p>Nenhuma matrícula ou reserva foi realizada e nenhum dado foi enviado. Na versão publicada, este formulário poderá ser conectado ao atendimento da sua academia.</p><button class="btn btn-lime" id="success-close">Continuar explorando <svg><use href="#i-arrow"/></svg></button></div>`;
    $('#success-message').textContent = saved ? `${firstName}, seu interesse em ${interest} foi salvo nesta sessão do navegador.` : `${firstName}, seu interesse foi registrado apenas nesta tela. O navegador não permitiu salvar a sessão.`;
    $('#success-close').addEventListener('click', () => closeDialog(contentDialog));
  });
}
function enroll(plan) { renderEnroll(plan); openDialog(contentDialog); }
$$('[data-enroll]').forEach(button => button.addEventListener('click', () => enroll(button.dataset.enroll)));

$$('[data-video]').forEach(button => button.addEventListener('click', () => {
  $('#dialog-content').innerHTML = `<div class="dialog-body"><div class="eyebrow">MOVIMENTO INSPIRA MOVIMENTO</div><h2>SINTA A ENERGIA.</h2><video class="modal-video" controls playsinline preload="metadata" poster="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80"><source src="https://videos.pexels.com/video-files/3209298/3209298-hd_1920_1080_25fps.mp4" type="video/mp4">Seu navegador não suporta este vídeo.</video><p class="form-hint">Vídeo de banco de imagens (Pexels), usado para demonstração. Substitua por um tour da sua academia.</p><p id="video-error" class="form-hint" hidden>Não foi possível carregar o vídeo. Verifique a conexão ou tente novamente mais tarde.</p></div>`;
  openDialog(contentDialog);
  const video = $('video', contentDialog);
  video.addEventListener('error', () => { $('#video-error').hidden = false; });
}));

const week = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const schedules = [
  [['06:30','Funcional','Lucas Martins','Estúdio 01'],['08:00','Hidroginástica','Equipe aquática','Piscina'],['12:00','Yoga','Camila Rocha','Estúdio 02'],['18:30','Boxe','Rafael Costa','Arena'],['19:30','Natação','Equipe aquática','Piscina']],
  [['07:00','Pilates solo','Camila Rocha','Estúdio 02'],['09:00','Natação','Equipe aquática','Piscina'],['12:30','Funcional','Lucas Martins','Estúdio 01'],['18:00','Muay Thai','Rafael Costa','Arena'],['20:00','Yoga','Camila Rocha','Estúdio 02']],
  [['06:30','Funcional','Lucas Martins','Estúdio 01'],['08:00','Hidroginástica','Equipe aquática','Piscina'],['12:00','Yoga','Camila Rocha','Estúdio 02'],['18:30','Boxe','Rafael Costa','Arena'],['19:30','Natação','Equipe aquática','Piscina']],
  [['07:00','Pilates solo','Camila Rocha','Estúdio 02'],['09:00','Natação','Equipe aquática','Piscina'],['12:30','Funcional','Lucas Martins','Estúdio 01'],['18:00','Muay Thai','Rafael Costa','Arena'],['20:00','Yoga','Camila Rocha','Estúdio 02']],
  [['06:30','Funcional','Lucas Martins','Estúdio 01'],['08:00','Hidroginástica','Equipe aquática','Piscina'],['12:00','Pilates solo','Camila Rocha','Estúdio 02'],['18:30','Boxe','Rafael Costa','Arena']],
  [['08:00','Yoga','Camila Rocha','Estúdio 02'],['09:00','Funcional','Lucas Martins','Estúdio 01'],['10:00','Natação','Equipe aquática','Piscina'],['11:00','Muay Thai','Rafael Costa','Arena']],
  [['09:00','Alongamento & mobilidade','Camila Rocha','Estúdio 02'],['10:00','Funcional','Lucas Martins','Estúdio 01']]
];
const daysContainer = $('.schedule-days');
week.forEach((day, index) => {
  const button = document.createElement('button');
  button.textContent = day;
  button.id = `day-${index}`;
  button.setAttribute('role', 'tab');
  button.setAttribute('aria-controls', 'schedule-list');
  button.setAttribute('aria-selected', 'false');
  button.tabIndex = -1;
  button.addEventListener('click', () => {
    activateTab(button, $$('button', daysContainer));
    $('#schedule-list').setAttribute('aria-labelledby', button.id);
    $('#schedule-list').innerHTML = schedules[index].map(([time, name, teacher, room]) => `<article class="class-row"><span class="class-time">${time}</span><div><h3>${name}</h3><small>Todos os níveis · 45–60 min</small></div><span>${teacher}</span><span class="class-room">${room}</span><button data-class="${name}" data-time="${day}, ${time}">Tenho interesse ↗</button></article>`).join('');
    $$('[data-class]').forEach(item => item.addEventListener('click', () => enroll(`${item.dataset.class} — ${item.dataset.time}`)));
  });
  daysContainer.append(button);
});
addTabKeyboard(daysContainer);
const today = (new Date().getDay() + 6) % 7;
$$('button', daysContainer)[today].click();

function studentArea() {
  let profile = null;
  try { profile = JSON.parse(sessionStorage.getItem('pulse-demo')); } catch { /* Storage may be disabled. */ }
  $('#dialog-content').innerHTML = `<div class="dialog-body"><div class="eyebrow">ÁREA DO ALUNO · DEMONSTRAÇÃO</div><h2 id="student-title">SEU ESPAÇO<br>NA PULSE.</h2><p id="student-summary">O portal real poderá reunir seu plano, treinos, avaliações e reservas. A integração com o sistema de gestão da academia ainda não está conectada.</p><p id="student-interest"></p><button class="btn btn-lime" id="student-action"></button>${profile ? '<button class="btn btn-outline" id="clear-profile">Limpar dados desta sessão</button>' : ''}<p class="form-hint">Esta área não é um login e não apresenta treinos prescritos ou matrículas reais.</p></div>`;
  if (profile && typeof profile.firstName === 'string' && typeof profile.interest === 'string') {
    $('#student-title').textContent = `OLÁ, ${profile.firstName.toUpperCase()}!`;
    $('#student-interest').textContent = `Seu interesse salvo: ${profile.interest}. Isso não confirma matrícula ou reserva.`;
  }
  $('#student-action').textContent = profile ? 'Ver grade de aulas ↗' : 'Conhecer os planos ↗';
  $('#student-action').addEventListener('click', () => { closeDialog(contentDialog); $(profile ? '#horarios' : '#planos').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); });
  $('#clear-profile')?.addEventListener('click', () => {
    try { sessionStorage.removeItem('pulse-demo'); } catch { /* No persistent data was created. */ }
    closeDialog(contentDialog); toast('Os dados demonstrativos desta sessão foram apagados.');
  });
  openDialog(contentDialog);
}
$('#student-button').addEventListener('click', studentArea);
$('#footer-student').addEventListener('click', studentArea);
$('#privacy-button').addEventListener('click', () => {
  $('#dialog-content').innerHTML = '<div class="dialog-body"><div class="eyebrow">TRANSPARÊNCIA EM PRIMEIRO LUGAR</div><h2>SUA PRIVACIDADE.</h2><p>Este site é uma demonstração da marca fictícia PULSE. Não realiza pagamentos, contratações ou envio dos formulários a servidores.</p><p>Ao salvar seu interesse, apenas o primeiro nome e a opção escolhida são guardados no sessionStorage deste navegador, até o encerramento da sessão. E-mail e telefone não são armazenados. É possível limpar os dados pela Área do aluno.</p><p>Fotos, vídeo e fontes são carregados de Unsplash, Pravatar, Pexels e Google Fonts. Esses serviços recebem dados técnicos da conexão, como endereço IP, conforme suas próprias políticas. Este demonstrativo não usa ferramentas de publicidade ou análise de navegação.</p><p>Antes da publicação comercial, substitua os dados fictícios e implemente a política de privacidade e as integrações adequadas à operação real da academia.</p></div>';
  openDialog(contentDialog);
});
let toastTimeout;
function toast(message) {
  $('#toast').textContent = message; $('#toast').classList.add('visible');
  clearTimeout(toastTimeout); toastTimeout = setTimeout(() => $('#toast').classList.remove('visible'), 4000);
}
$('#year').textContent = new Date().getFullYear();
