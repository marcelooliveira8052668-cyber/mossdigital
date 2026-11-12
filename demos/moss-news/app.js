'use strict';
const $ = selector => document.querySelector(selector);
$('#videos video').poster = 'assets/flowers-poster.jpg';
const categories = ['Todas','Negócios','Tecnologia','Economia','Bem-estar','Cultura','Vida & Cidade'];
let category = 'Todas';
let query = '';
let selected = null;
let returnFocus = null;
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const image = (item, eager = false) => `<img src="assets/${escapeHTML(item.image)}" alt="${escapeHTML(item.alt)}" ${eager?'fetchpriority="high"':'loading="lazy"'} decoding="async" width="1000" height="667">`;
const meta = item => `<span class="meta">GUIA INFORMATIVO <span aria-hidden="true">·</span> ${item.minutes} min de leitura</span>`;
function renderNavigation() {
  $('#categories').innerHTML = categories.map(item => `<button type="button" data-category="${escapeHTML(item)}" aria-pressed="${category===item}">${escapeHTML(item)}</button>`).join('');
}
function card(item) {
  return `<article class="story"><a class="article-link" href="#guia=${item.id}" data-article="${item.id}"><div class="story-image">${image(item)}</div><span class="eyebrow">${escapeHTML(item.category)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.summary)}</p>${meta(item)}</a></article>`;
}
function render() {
  const filtered = MOSS_ARTICLES.filter(item => (category==='Todas'||item.category===category) && normalize([item.title,item.summary,item.category,...item.sections.map(section=>section.text||'')].join(' ')).includes(normalize(query)));
  $('#articles').innerHTML = filtered.length ? filtered.map(card).join('') : '<p class="empty">Nenhum guia encontrado. Tente outro assunto ou selecione “Todas”.</p>';
  $('#result-count').textContent = `${filtered.length} ${filtered.length===1?'guia disponível':'guias disponíveis'}`;
  $('#library-title').textContent = query ? `Resultados para “${query}”` : category==='Todas' ? 'Explore. Entenda. Aplique.' : `Para entender ${category.toLowerCase()}`;
  $('#reset').hidden = category==='Todas' && !query;
  $('#categories').querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category===category)));
}
function renderHighlights() {
  const [lead,...side] = MOSS_ARTICLES;
  $('#highlights').innerHTML = `<a class="lead-card article-link" href="#guia=${lead.id}" data-article="${lead.id}">${image(lead,true)}<div class="lead-content"><span class="pill">ESPECIAL · PRESENÇA DIGITAL</span><h2>${escapeHTML(lead.title)}</h2><p>${escapeHTML(lead.summary)}</p>${meta(lead)}</div></a><div class="side-stack">${side.slice(0,2).map(item=>`<article class="side-card"><a class="side-image" href="#guia=${item.id}" data-article="${item.id}" aria-label="Ler: ${escapeHTML(item.title)}">${image(item)}</a><div class="side-copy"><span class="eyebrow">${escapeHTML(item.category)}</span><a class="article-link" href="#guia=${item.id}" data-article="${item.id}"><h2>${escapeHTML(item.title)}</h2></a><p>${escapeHTML(item.summary)}</p>${meta(item)}</div></article>`).join('')}</div>`;
  $('#reading-list').innerHTML = [MOSS_ARTICLES[1],MOSS_ARTICLES[7],MOSS_ARTICLES[0]].map(item=>`<li><a href="#guia=${item.id}" data-article="${item.id}">${escapeHTML(item.title)}</a></li>`).join('');
}
function openArticle(id) {
  const item = MOSS_ARTICLES.find(article=>article.id===id);
  if (!item) return;
  selected = item;
  returnFocus = document.activeElement;
  $('#reader-content').innerHTML = `<figure class="reader-figure"><div class="reader-cover">${image(item,true)}</div><figcaption>Foto ilustrativa · Unsplash · Não documenta acontecimentos do texto.</figcaption></figure><article class="reader-prose"><p class="eyebrow">${escapeHTML(item.category)} · GUIA EDUCATIVO</p><h2 id="reader-title">${escapeHTML(item.title)}</h2><p class="standfirst">${escapeHTML(item.summary)}</p><p class="meta">Conteúdo demonstrativo MOSS Digital · ${item.minutes} min de leitura</p>${item.sections.map(section=>`<section><h3>${escapeHTML(section.title)}</h3>${section.text?`<p>${escapeHTML(section.text)}</p>`:`<ul>${section.items.map(text=>`<li>${escapeHTML(text)}</li>`).join('')}</ul>`}</section>`).join('')}<aside class="reader-sources"><h3>Para se aprofundar</h3><ul>${item.sources.map(source=>`<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.name)} ↗</a></li>`).join('')}</ul><p>Referências de consulta geral. Confirme informações atuais diretamente nas fontes.</p></aside><p class="reader-note">Este é um guia educativo de um portal demonstrativo, não uma notícia em tempo real. Não substitui orientação profissional.</p></article>`;
  $('#share-status').textContent = '';
  if (!$('#reader').open) $('#reader').showModal();
  $('#reader').scrollTop = 0;
  $('#close-reader').focus({preventScroll:true});
}
function applyHash() {
  const match = location.hash.match(/^#guia=([a-z0-9-]+)$/);
  if (match) openArticle(match[1]);
  else if ($('#reader').open) $('#reader').close();
}
function setQuery(value) {
  query = value.trim().slice(0,200);
  render();
}
document.addEventListener('click', event => {
  const article = event.target.closest('[data-article]');
  if (article && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button===0) {
    event.preventDefault();
    const hash = `#guia=${article.dataset.article}`;
    if (location.hash===hash) openArticle(article.dataset.article); else location.hash=hash;
  }
  const filter = event.target.closest('[data-category]');
  if (filter) { category=filter.dataset.category; render(); $('#library-title').scrollIntoView({block:'start'}); }
  const topic = event.target.closest('[data-query]');
  if (topic) { category='Todas'; $('#search').value=topic.dataset.query; setQuery(topic.dataset.query); $('#library-title').scrollIntoView({block:'start'}); }
});
$('#search').addEventListener('input',event=>setQuery(event.target.value));
$('#search-form').addEventListener('submit',event=>{event.preventDefault();setQuery($('#search').value);$('#library-title').scrollIntoView({block:'start'});});
$('#reset').addEventListener('click',()=>{category='Todas';query='';$('#search').value='';render();$('#search').focus();});
$('#close-reader').addEventListener('click',()=>$('#reader').close());
$('#reader').addEventListener('close',()=>{
  if (location.hash.startsWith('#guia=')) history.replaceState(null,'',location.pathname+location.search);
  if (returnFocus && returnFocus.isConnected) returnFocus.focus({preventScroll:true});
});
$('#credits').addEventListener('click',()=>$('#credits-dialog').showModal());
$('#close-credits').addEventListener('click',()=>$('#credits-dialog').close());
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
}
$('#share').addEventListener('click',async()=>{
  if(!selected) return;
  const isWeb = /^https?:$/.test(location.protocol);
  const url = isWeb ? new URL(`#guia=${selected.id}`,location.href).href : null;
  const text = `MOSS News — guia educativo: ${selected.title}. ${selected.summary}`;
  try {
    if (navigator.share && isWeb) {await navigator.share({title:selected.title,text,url});$('#share-status').textContent='Compartilhamento concluído.';}
    else if (navigator.clipboard && window.isSecureContext) {await navigator.clipboard.writeText(text+(url?'\n'+url:''));$('#share-status').textContent=url?'Link copiado.':'Resumo copiado. Um arquivo local não gera link público.';}
    else $('#share-status').textContent='Para compartilhar um link público, hospede o portal em HTTPS. Você pode copiar o título do guia.';
  } catch(error) {if(error.name!=='AbortError') $('#share-status').textContent='Não foi possível compartilhar. Tente copiar o endereço da página.';}
});
function setTheme(dark) {
  document.body.classList.toggle('dark',dark);
  $('#theme').setAttribute('aria-pressed',String(dark));
  $('#theme').setAttribute('aria-label',dark?'Ativar tema claro':'Ativar tema escuro');
}
try {const saved=localStorage.getItem('moss-news-theme');setTheme(saved?saved==='dark':matchMedia('(prefers-color-scheme: dark)').matches);} catch {setTheme(false);}
$('#theme').addEventListener('click',()=>{const dark=!document.body.classList.contains('dark');setTheme(dark);try{localStorage.setItem('moss-news-theme',dark?'dark':'light');}catch{/* Preferência opcional: o portal funciona sem armazenamento. */}});
$('#today').textContent = new Intl.DateTimeFormat('pt-BR',{day:'numeric',month:'long',year:'numeric'}).format(new Date()).toUpperCase();
$('#year').textContent = new Date().getFullYear();
window.addEventListener('hashchange',applyHash);
renderNavigation();
renderHighlights();
render();
applyHash();
