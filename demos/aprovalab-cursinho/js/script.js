/* Número único autorizado para esta coleção de demonstrações. */
const WHATSAPP = '5511942038103'; // Declara um dado ou referência utilizada nesta funcionalidade.
const STORAGE_KEY = 'moss_aprovalab_planner_v1'; // Declara um dado ou referência utilizada nesta funcionalidade.
const menu = document.querySelector('#menu'); // Declara um dado ou referência utilizada nesta funcionalidade.
const toggle = document.querySelector('#menu-button'); // Declara um dado ou referência utilizada nesta funcionalidade.
/* O menu em telas pequenas mantém aria-expanded atualizado. */
toggle.addEventListener('click', () => { // Registra a reação a uma ação do usuário.
  const ativo = menu.classList.toggle('open'); // Declara um dado ou referência utilizada nesta funcionalidade.
  toggle.setAttribute('aria-expanded', String(ativo)); // Executa uma etapa da interação descrita acima.
  toggle.textContent = ativo ? '✕' : '☰'; // Atualiza um texto da interface sem inserir HTML.
}); // Encerra o bloco ou a função anterior.
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { // Registra a reação a uma ação do usuário.
  menu.classList.remove('open'); // Executa uma etapa da interação descrita acima.
  toggle.setAttribute('aria-expanded', 'false'); // Executa uma etapa da interação descrita acima.
  toggle.textContent = '☰'; // Atualiza um texto da interface sem inserir HTML.
})); // Encerra o bloco ou a função anterior.
/* Filtros são visuais e não representam turmas disponíveis em tempo real. */
document.querySelectorAll('[data-filter]').forEach(botao => botao.addEventListener('click', () => { // Registra a reação a uma ação do usuário.
  const filtro = botao.dataset.filter; // Declara um dado ou referência utilizada nesta funcionalidade.
  document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b === botao)); // Localiza os elementos necessários na página.
  document.querySelectorAll('[data-category]').forEach(card => { // Localiza os elementos necessários na página.
    card.hidden = filtro !== 'todos' && card.dataset.category !== filtro; // Executa uma etapa da interação descrita acima.
  }); // Encerra o bloco ou a função anterior.
})); // Encerra o bloco ou a função anterior.
/* Seleção da trilha, sem matricular automaticamente. */
document.querySelectorAll('[data-course]').forEach(botao => botao.addEventListener('click', () => { // Registra a reação a uma ação do usuário.
  document.querySelector('#trilha-selecionada').value = botao.dataset.course; // Localiza os elementos necessários na página.
  document.querySelector('#planner').scrollIntoView({behavior:'smooth'}); // Localiza os elementos necessários na página.
})); // Encerra o bloco ou a função anterior.
const tarefas = Array.from(document.querySelectorAll('[data-task]')); // Declara um dado ou referência utilizada nesta funcionalidade.
/* Armazenamento exclusivamente no navegador, com falha tolerada. */
try { // Tenta uma operação que pode ser bloqueada pelo navegador.
  const salvas = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); // Declara um dado ou referência utilizada nesta funcionalidade.
  if(Array.isArray(salvas)) tarefas.forEach(t => { t.checked = salvas.includes(t.dataset.task); }); // Verifica uma condição antes de prosseguir.
} catch (erro) { /* Modo sem persistência permanece funcional. */ } // Encerra o bloco ou a função anterior.
function atualizarProgresso() { // Inicia a função responsável por esta operação.
  const completas = tarefas.filter(t => t.checked).length; // Declara um dado ou referência utilizada nesta funcionalidade.
  document.querySelector('#progress-text').textContent = `${completas} de ${tarefas.length}`; // Localiza os elementos necessários na página.
  document.querySelector('#progress-bar').style.width = `${100 * completas / tarefas.length}%`; // Localiza os elementos necessários na página.
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas.filter(t=>t.checked).map(t=>t.dataset.task))); } catch (erro) { /* Uso privado pode bloquear gravação. */ } // Tenta uma operação que pode ser bloqueada pelo navegador.
} // Encerra o bloco ou a função anterior.
tarefas.forEach(t => t.addEventListener('change', atualizarProgresso)); // Registra a reação a uma ação do usuário.
atualizarProgresso(); // Executa uma etapa da interação descrita acima.
/* A conversa não constitui matrícula. */
document.querySelector('#contato').addEventListener('click', () => { // Registra a reação a uma ação do usuário.
  const trilha = document.querySelector('#trilha-selecionada').value; // Declara um dado ou referência utilizada nesta funcionalidade.
  const concluidas = tarefas.filter(t => t.checked).length; // Declara um dado ou referência utilizada nesta funcionalidade.
  const texto = `Olá! Gostaria de conhecer a trilha ${trilha} do AprovaLab. Estou organizando meus estudos (${concluidas} de ${tarefas.length} tarefas marcadas neste navegador). Quais informações e condições vocês oferecem?`; // Declara um dado ou referência utilizada nesta funcionalidade.
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer'); // Abre a conversa do WhatsApp com mensagem codificada.
}); // Encerra o bloco ou a função anterior.
// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
