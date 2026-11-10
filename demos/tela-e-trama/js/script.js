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

// Catálogo de filmes e séries inteiramente fictícios; não reproduz mídias.
function initDemo(){ // Inicia os recursos desta demo.
 const key='moss-catalogo-cinema-favoritos-v1'; // Nome exclusivo do armazenamento.
 const favorites=new Set(readLocal(key,[])); // Favoritos deste navegador.
 let kind='Todos'; // Filtro inicial.
 const search=$('#search'); // Campo de busca.
 const cards=$$('.movie'); // Cards da coleção.
 const render=()=>{ // Atualiza catálogo e lista de favoritos.
   const term=search.value.toLocaleLowerCase('pt-BR').trim(); // Consulta normalizada.
   let visible=0; // Contador para mensagem de lista vazia.
   cards.forEach(card=>{ // Decide visibilidade por formato e texto.
     const matches=(kind==='Todos'||card.dataset.kind===kind) && (card.dataset.title+' '+card.dataset.genre+' '+card.dataset.summary).toLocaleLowerCase('pt-BR').includes(term);
     card.hidden=!matches; if(matches) visible++; // Mostra apenas itens encontrados.
     const fav=$('[data-fav]',card); // Botão correspondente ao card.
     const selected=favorites.has(card.dataset.title); // Verifica favorito.
     fav.setAttribute('aria-pressed',String(selected)); // Estado acessível.
     fav.textContent=selected?'♥ Salvo':'♡ Favoritar'; // Texto do botão.
   });
   $('#empty').hidden=visible>0; // Exibe resultado vazio.
   $('#fav-count').textContent=String(favorites.size); // Atualiza quantidade.
   const list=$('#fav-list');list.replaceChildren(); // Limpa lista anterior.
   [...favorites].forEach(title=>{const li=document.createElement('li');li.textContent=title;list.append(li);}); // Texto seguro.
 };
 $$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{ // Filtra filme/série.
    kind=button.dataset.filter; $$('[data-filter]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn===button))); render();
 }));
 search.addEventListener('input',render); // Atualiza busca durante digitação.
 $$('[data-fav]').forEach(btn=>btn.addEventListener('click',()=>{ // Adiciona ou remove título.
   const title=btn.dataset.fav; favorites.has(title)?favorites.delete(title):favorites.add(title); saveLocal(key,[...favorites]);render();notify('Lista de favoritos atualizada.');
 }));
 const modal=$('#details'); // Janela nativa de detalhes.
 $$('[data-info]').forEach(btn=>btn.addEventListener('click',()=>{ // Abre sinopse.
   const card=btn.closest('.movie');$('#detail-title').textContent=card.dataset.title;$('#detail-summary').textContent=card.dataset.summary;modal.showModal();
 }));
 $('#close-details').addEventListener('click',()=>modal.close()); // Fecha janela.
 $('#share-list').addEventListener('click',()=>{ // Compartilha a lista, sem transmitir vídeos.
   if(!favorites.size){notify('Salve um título antes de compartilhar.');return;}
   window.open(whatsLink('Olá! Minha seleção de obras fictícias na Tela & Trama:\n'+[...favorites].join('\n')),'_blank','noopener');
 });
 render(); // Primeira renderização.
}

