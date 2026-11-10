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

// Sacola comercial ilustrativa: nenhuma transação financeira é executada.
function initDemo(){ // Prepara catálogo da boutique.
 const key='moss-maison-reuse-sacola-v1'; // Identificador exclusivo no navegador.
 const catalog=new Map($$('.product [data-add]').map(btn=>[btn.dataset.add,Number(btn.dataset.price)])); // Preços de demonstração.
 const bag=readLocal(key,{}); // Sacola local.
 let category='Todas'; // Filtro inicial.
 const render=()=>{ // Atualiza catálogo e sacola.
   $$('.product').forEach(card=>{card.hidden=category!=='Todas'&&card.dataset.category!==category;}); // Categorias.
   const list=$('#bag-items');list.replaceChildren(); // Apaga itens anteriores.
   let count=0,total=0; // Calcula totais ilustrativos.
   for(const [name,qty] of Object.entries(bag)){ // Lê peças da sacola.
     if(!catalog.has(name)||!Number.isInteger(qty)||qty<=0)continue; // Validação.
     count+=qty;total+=catalog.get(name)*qty; // Soma.
     const item=document.createElement('li'); // Linha acessível.
     const text=document.createElement('span');text.textContent=`${name} × ${qty} — ${money(catalog.get(name)*qty)}`; // Texto seguro.
     const remove=document.createElement('button');remove.type='button';remove.textContent='Remover';remove.setAttribute('aria-label',`Remover uma unidade de ${name}`); // Ação.
     remove.addEventListener('click',()=>{bag[name]-=1;if(!bag[name])delete bag[name];saveLocal(key,bag);render();}); // Atualiza.
     item.append(text,remove);list.append(item); // Adiciona à interface.
   }
   if(!count){const li=document.createElement('li');li.textContent='Sua sacola está vazia.';list.append(li);} // Estado vazio.
   $('#bag-count').textContent=String(count);$('#bag-total').textContent=money(total); // Indicadores.
 };
 $$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{category=btn.dataset.filter;$$('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===btn)));render();})); // Filtra.
 $$('[data-add]').forEach(btn=>btn.addEventListener('click',()=>{const name=btn.dataset.add;bag[name]=(bag[name]||0)+1;saveLocal(key,bag);render();notify(`${name} adicionado à sacola.`);})); // Adiciona.
 $('#clear-bag').addEventListener('click',()=>{Object.keys(bag).forEach(k=>delete bag[k]);saveLocal(key,bag);render();notify('Sacola limpa.');}); // Limpa.
 $('#send-bag').addEventListener('click',()=>{ // Cria mensagem sem cobrar nada.
   const lines=Object.entries(bag).filter(([name,qty])=>catalog.has(name)&&qty>0).map(([name,qty])=>`${name} — ${qty} unidade(s)`);
   if(!lines.length){notify('Adicione uma peça antes de solicitar.');return;}
   window.open(whatsLink('Olá! Gostaria de consultar as peças da demo Maison Reuse:\n'+lines.join('\n')+'\nPor favor, confirme disponibilidade e valores.'),'_blank','noopener');
 });
 render(); // Inicializa.
}

