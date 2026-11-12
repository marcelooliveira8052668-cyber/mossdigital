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

// Planejamento semanal com orçamento de demonstração e contato por WhatsApp.
function initDemo(){ // Inicia marmitaria.
 const meals=new Map([['Segunda','Frango cítrico'],['Terça','Carne caseira'],['Quarta','Prato vegetariano'],['Quinta','Peixe e verduras'],['Sexta','Bowl da semana']]); // Cardápio fictício.
 const days=$$('input[name="dias"]'); // Dias da semana.
 const update=()=>{ // Atualiza o resumo.
   const selected=days.filter(input=>input.checked).map(input=>input.value); // Dias ativos.
   const portion=$('input[name="porcao"]:checked'); // Tamanho.
   const mode=$('input[name="recebimento"]:checked'); // Retirada ou entrega.
   const daily=Number(portion.dataset.price)+Number(mode.dataset.fee); // Preço ilustrativo.
   const total=daily*selected.length; // Estimativa, sem desconto por assinatura.
   const list=$('#summary-days');list.replaceChildren(); // Limpa e escreve com segurança.
   if(!selected.length){const p=document.createElement('p');p.textContent='Escolha pelo menos um dia.';list.append(p);}
   selected.forEach(day=>{const p=document.createElement('p');p.textContent=`${day}: ${meals.get(day)}`;list.append(p);}); // Pratos.
   $('#count-days').textContent=String(selected.length);$('#plan-total').textContent=money(total); // Indicadores.
   return {selected,portion:portion.value,mode:mode.value,total}; // Valores para envio.
 };
 $$('input[name="dias"],input[name="porcao"],input[name="recebimento"]').forEach(input=>input.addEventListener('change',update)); // Recalcula ao alterar.
 $('#send-plan').addEventListener('click',()=>{ // Encaminha interesse para o WhatsApp.
   const order=update();if(!order.selected.length){notify('Escolha pelo menos um dia.');return;}
   const customer=$('#cliente').value.trim(); // Nome opcional.
   const lines=order.selected.map(day=>`${day}: ${meals.get(day)}`); // Detalhes diários.
   const message=`Olá! Quero solicitar um plano semanal da demo Mesa da Semana.\n${customer?'Nome: '+customer+'\n':''}Dias:\n${lines.join('\n')}\nPorção: ${order.portion}\nModalidade: ${order.mode}\nEstimativa: ${money(order.total)}\nPor favor, confirme cardápio, entrega e valores. Não desejo pagamento automático.`;
   window.open(whatsLink(message),'_blank','noopener'); // Sem compra automática.
 });
 update(); // Primeiro resumo.
}

// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
