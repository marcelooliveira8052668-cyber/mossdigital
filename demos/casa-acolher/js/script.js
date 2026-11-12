// Rotinas compartilhadas, copiadas para cada demo independente, sem dependências externas.
const WHATSAPP = '5511942038103'; // Telefone comercial autorizado pela MOSS Digital.
const $ = (selector, scope = document) => scope.querySelector(selector); // Busca um elemento.
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)]; // Busca uma lista.
const money = (number) => Number(number || 0).toLocaleString('pt-BR', {style:'currency', currency:'BRL'}); // Reais.
const whatsLink = (message) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`; // Link de atendimento.
const notify = (message) => { // Exibe uma mensagem rápida ao visitante.
  const live = $('#feedback'); // Região com leitura por tecnologias assistivas.
  if (live) live.textContent = message; // Evita inserir HTML não confiável.
};
const readLocal = (key, fallback) => { // Carrega dados, sem quebrar quando o armazenamento estiver indisponível.
  try {return JSON.parse(localStorage.getItem(key)) ?? fallback;} catch {return fallback;}
};
const saveLocal = (key, value) => { // Salva no navegador atual; não sincroniza entre dispositivos.
  try {localStorage.setItem(key, JSON.stringify(value)); return true;} catch {notify('Não foi possível salvar neste navegador.'); return false;}
};
function setupCommon() { // Executa configurações gerais da página.
  const toggle = $('#menu-toggle'); // Botão de menu em telas menores.
  const nav = $('#nav-links'); // Lista de navegação.
  if (toggle && nav) toggle.addEventListener('click', () => { // Mostra/oculta o menu.
    const opened = toggle.getAttribute('aria-expanded') === 'true'; // Estado anterior.
    toggle.setAttribute('aria-expanded', String(!opened)); // Atualiza acessibilidade.
    nav.classList.toggle('open', !opened); // Atualiza o visual.
  });
  if (nav) $$('#nav-links a').forEach(link => link.addEventListener('click', () => { // Fecha menu após navegar.
    nav.classList.remove('open'); if (toggle) toggle.setAttribute('aria-expanded','false');
  }));
  $$('img[data-photo]').forEach(img => { // Substitui o placeholder apenas se a foto real existir.
    const src = img.dataset.photo; if (!src) return; // Caminho local especificado no HTML.
    const probe = new Image(); // Verificação isolada para evitar foto quebrada.
    probe.onload = () => {img.src = src;}; // Usa a fotografia real.
    probe.src = src; // Inicia a checagem.
  });
  $$('a[data-whatsapp]').forEach(link => { // Configura atalhos de atendimento.
    link.href = whatsLink(link.dataset.message || `Olá! Vim pela demonstração ${document.body.dataset.demo}.`);
    link.target = '_blank'; link.rel = 'noopener noreferrer'; // Abertura segura.
  });
}
document.addEventListener('DOMContentLoaded', () => {setupCommon(); initDemo();}); // Aguarda o DOM.

// Solicitação de visita, sem cadastro, sem detalhes de saúde e sem marcação automática.
function initDemo(){ // Inicializa fluxo da residência.
 const dateInput=$('input[type=date]'); // Dia preferido.
 const now=new Date(); // Data local do visitante.
 const y=now.getFullYear(),m=String(now.getMonth()+1).padStart(2,'0'),d=String(now.getDate()).padStart(2,'0'); // Formato ISO local.
 dateInput.min=`${y}-${m}-${d}`; // Evita data passada no calendário.
 $('#visit-form').addEventListener('submit',event=>{ // Abre conversa com dados básicos.
   event.preventDefault(); // Não envia para servidor.
   const form=event.currentTarget;if(!form.reportValidity())return; // Valida campos do navegador.
   const data=new FormData(form); // Recebe apenas dados de contato.
   const values=[...data.entries()].map(([key,value])=>`${key}: ${String(value).trim()}`); // Monta texto.
   window.open(whatsLink('Olá! Gostaria de conhecer a Casa Acolher (demonstração).\n'+values.join('\n')+'\nAguardo confirmação da visita.'),'_blank','noopener'); // WhatsApp.
   notify('Abra o WhatsApp para revisar e enviar o pedido.'); // Orientação.
 });
}

// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
