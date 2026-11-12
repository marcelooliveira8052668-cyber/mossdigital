'use strict';
const $ = selector => document.querySelector(selector);
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const money = cents => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(cents/100);
const categories = ['Todos','Tênis','Sapatos','Sandálias','Botas'];
let products = PASSO_PRODUCTS;
let category = 'Todos';
let favoritesOnly = false;
let selectedProduct = null;
let favorites = [];
let bag = [];
let toastTimer;
const focusBefore = new Map();
function notify(text){$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3200);}
function save(){try{localStorage.setItem('passo-favorites',JSON.stringify(favorites));localStorage.setItem('passo-bag',JSON.stringify(bag));}catch{/* Persistência é opcional, nunca fingir banco. */}}
function loadSaved(){
 try{
  const savedFavorites=JSON.parse(localStorage.getItem('passo-favorites')||'[]');
  favorites=Array.isArray(savedFavorites)?[...new Set(savedFavorites.filter(id=>products.some(p=>p.id===id)))]:[];
  const savedBag=JSON.parse(localStorage.getItem('passo-bag')||'[]');
  const map=new Map();
  if(Array.isArray(savedBag)) for(const row of savedBag.slice(0,200)){
    const p=products.find(p=>p.id===row?.id);
    if(p&&p.sizes.includes(row.size)&&Number.isInteger(row.quantity)&&row.quantity>0&&row.quantity<=9){
      const key=p.id+'|'+row.size;
      map.set(key,{id:p.id,size:row.size,quantity:Math.min(9,(map.get(key)?.quantity||0)+row.quantity)});
    }
  }
  bag=[...map.values()];
 }catch{favorites=[];bag=[];}
}
function renderCategories(){ $('#categories').innerHTML=categories.map(c=>`<button type="button" data-filter="${esc(c)}" aria-pressed="${c===category}">${esc(c)}</button>`).join(''); }
function render(){
 const query=normalize($('#search').value.trim());
 const size=Number($('#size').value)||null;
 const style=$('#style').value;
 const list=products.filter(p=>(category==='Todos'||p.category===category)&&(!size||p.sizes.includes(size))&&(!style||p.style===style)&&(!favoritesOnly||favorites.includes(p.id))&&normalize([p.name,p.category,p.style,p.color,p.description].join(' ')).includes(query));
 const sort=$('#sort').value;
 if(sort==='price-up')list.sort((a,b)=>a.price-b.price);
 if(sort==='price-down')list.sort((a,b)=>b.price-a.price);
 if(sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
 $('#products').innerHTML=list.length?list.map(p=>`<article class="product"><button class="product-image" data-product="${esc(p.id)}" aria-label="Ver ${esc(p.name)}"><img src="img/${esc(p.image)}" alt="${esc(p.alt)}" width="700" height="820" loading="lazy"><span class="product-tag">${esc(p.tag)}</span></button><button class="favorite" data-favorite="${esc(p.id)}" aria-pressed="${favorites.includes(p.id)}" aria-label="${favorites.includes(p.id)?'Remover dos favoritos':'Favoritar'}: ${esc(p.name)}">${favorites.includes(p.id)?'♥':'♡'}</button><div class="product-info"><span class="product-category">${esc(p.category.toUpperCase())} / ${esc(p.style.toUpperCase())}</span><h3><button type="button" data-product="${esc(p.id)}">${esc(p.name)}</button></h3><p class="product-color">${esc(p.color)}</p><div class="product-bottom"><strong>${money(p.price)}</strong><button type="button" data-product="${esc(p.id)}">Escolher tamanho ↗</button></div><p class="product-sizes">${p.sizes.join(' · ')} / numerações ilustrativas</p></div></article>`).join(''):'<div class="empty"><strong>Nenhum par por aqui, ainda.</strong><p>Tente outra combinação de filtros ou adicione um modelo aos favoritos.</p><button class="button button-line" type="button" data-reset>Ver toda a coleção</button></div>';
 $('#results').textContent=`${list.length} ${list.length===1?'modelo':'modelos'}${favoritesOnly?' nos seus favoritos':''}`;
 $('#favorites').setAttribute('aria-pressed',String(favoritesOnly));
 $('#favorites').setAttribute('aria-label',favoritesOnly?'Mostrar toda a coleção':'Mostrar favoritos');
 $('#categories').querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===category)));
}
function reset(){category='Todos';favoritesOnly=false;$('#search').value='';$('#size').value='';$('#style').value='';$('#sort').value='curadoria';render();}
function openDialog(id){const dialog=$('#'+id);if(dialog.open)return;focusBefore.set(id,document.activeElement);dialog.showModal();dialog.scrollTop=0;dialog.querySelector('.close')?.focus({preventScroll:true});}
function openProduct(id){
 selectedProduct=products.find(p=>p.id===id);if(!selectedProduct)return;
 const p=selectedProduct;
 $('#product-detail').innerHTML=`<div class="detail-grid"><div class="detail-photo"><img src="img/${esc(p.image)}" alt="${esc(p.alt)}" width="700" height="900"><span class="photo-note">FOTO ILUSTRATIVA · MODELO FICTÍCIO</span></div><div class="detail-copy"><p class="eyebrow">${esc(p.category)} / ${esc(p.style)}</p><h2 id="product-title">${esc(p.name)}</h2><p class="price">${money(p.price)}</p><p>${esc(p.description)}</p><div class="detail-meta"><div><span>Referência de cor</span><strong>${esc(p.color)}</strong></div><div><span>Seleção</span><strong>${esc(p.style)}</strong></div><div><span>Valor</span><strong>Exemplo demonstrativo</strong></div></div><form id="add-form" novalidate><fieldset class="sizes"><legend>Escolha uma numeração ilustrativa</legend><div class="size-options">${p.sizes.map(n=>`<label><input type="radio" name="product-size" value="${n}" required><span>${n}</span></label>`).join('')}</div></fieldset><p id="size-error" class="size-error" role="alert"></p><button class="button button-dark full" type="submit">Adicionar à sacola <span>+</span></button></form><p class="detail-note">Foto de referência: pode exibir marca de terceiro, sem vínculo com PASSO. Numeração e preço são fictícios. Não confirmamos material, estoque, encaixe ou especificações técnicas da peça fotografada.</p><a class="text-link" href="#guia" id="detail-guide">Como escolher a numeração ↗</a></div></div>`;
 $('#add-form').addEventListener('submit',event=>{
   event.preventDefault();
   const checked=$('#add-form input:checked');
   if(!checked){$('#size-error').textContent='Escolha um tamanho para continuar.';$('#add-form input').focus();return;}
   $('#size-error').textContent='';
   const size=Number(checked.value);if(!p.sizes.includes(size))return;
   const existing=bag.find(row=>row.id===p.id&&row.size===size);
   if(existing&&existing.quantity>=9){notify('Limite demonstrativo: 9 unidades por tamanho.');return;}
   if(existing)existing.quantity++;else bag.push({id:p.id,size,quantity:1});
   save();renderBag();notify(`${p.name}, tamanho ${size}, na sacola demonstrativa.`);
 });
 $('#detail-guide').addEventListener('click',event=>{event.preventDefault();$('#product-dialog').close();openDialog('guide-dialog');});
 openDialog('product-dialog');
}
function renderBag(){
 const count=bag.reduce((sum,row)=>sum+row.quantity,0);
 $('#bag-count').textContent=count;
 $('#open-bag').setAttribute('aria-label',`Abrir sacola, ${count} ${count===1?'item':'itens'}`);
 $('#bag-items').innerHTML=bag.length?bag.map(row=>{
   const p=products.find(p=>p.id===row.id);const key=p.id+'|'+row.size;
   return `<article class="bag-row"><img src="img/${esc(p.image)}" alt="${esc(p.alt)}" width="120" height="150"><div><h3>${esc(p.name)}</h3><p>Tamanho ${row.size} · ${money(p.price)} / un.</p><div class="quantity"><button type="button" data-quantity="-1" data-key="${esc(key)}" aria-label="Diminuir ${esc(p.name)}, tamanho ${row.size}" ${row.quantity===1?'disabled':''}>−</button><span aria-label="Quantidade">${row.quantity}</span><button type="button" data-quantity="1" data-key="${esc(key)}" aria-label="Aumentar ${esc(p.name)}, tamanho ${row.size}" ${row.quantity===9?'disabled':''}>+</button></div></div><div><strong>${money(p.price*row.quantity)}</strong><br><button class="remove" data-remove="${esc(key)}" type="button">Remover<span class="sr-only"> ${esc(p.name)}, tamanho ${row.size}</span></button></div></article>`;
 }).join(''):'<div class="empty"><strong>Sua próxima escolha começa na coleção.</strong><p>Adicione um modelo e selecione o tamanho para explorar a sacola.</p><button type="button" class="button button-line" data-close="bag-dialog">Continuar explorando ↗</button></div>';
 $('#bag-total').textContent=money(bag.reduce((sum,row)=>sum+products.find(p=>p.id===row.id).price*row.quantity,0));
 $('#prepare').disabled=!bag.length;
 $('#order-summary').hidden=true;$('#copy-status').textContent='';
}
document.addEventListener('click',event=>{
 const product=event.target.closest('[data-product]');if(product)openProduct(product.dataset.product);
 const favorite=event.target.closest('[data-favorite]');if(favorite){const id=favorite.dataset.favorite;favorites=favorites.includes(id)?favorites.filter(value=>value!==id):[...favorites,id];save();render();const next=document.querySelector(`[data-favorite="${CSS.escape(id)}"]`);next?.focus({preventScroll:true});notify(favorites.includes(id)?'Salvo nos favoritos deste navegador.':'Removido dos favoritos.');}
 const filter=event.target.closest('[data-filter]');if(filter){category=filter.dataset.filter;render();}
 const edition=event.target.closest('[data-category]');if(edition){reset();category=edition.dataset.category;render();$('#colecao').scrollIntoView({block:'start'});}
 const style=event.target.closest('[data-style]');if(style){reset();$('#style').value=style.dataset.style;render();$('#colecao').scrollIntoView({block:'start'});}
 const close=event.target.closest('[data-close]');if(close)$('#'+close.dataset.close).close();
 if(event.target.closest('[data-reset]'))reset();
 const quantity=event.target.closest('[data-quantity]');if(quantity){const row=bag.find(row=>row.id+'|'+row.size===quantity.dataset.key);if(row){row.quantity=Math.max(1,Math.min(9,row.quantity+Number(quantity.dataset.quantity)));save();renderBag();const next=document.querySelector(`[data-key="${CSS.escape(quantity.dataset.key)}"][data-quantity="${quantity.dataset.quantity}"]`);if(next&&!next.disabled)next.focus({preventScroll:true});}}
 const remove=event.target.closest('[data-remove]');if(remove){bag=bag.filter(row=>row.id+'|'+row.size!==remove.dataset.remove);save();renderBag();$('#bag-dialog .close').focus({preventScroll:true});}
});
$('#search').addEventListener('input',render);
for(const id of ['size','style','sort'])$('#'+id).addEventListener('change',render);
$('#clear').addEventListener('click',reset);
$('#favorites').addEventListener('click',()=>{favoritesOnly=!favoritesOnly;render();$('#colecao').scrollIntoView({block:'start'});});
$('#open-bag').addEventListener('click',()=>{renderBag();openDialog('bag-dialog');});
$('#open-guide').addEventListener('click',()=>openDialog('guide-dialog'));
for(const dialog of document.querySelectorAll('dialog')){
 dialog.addEventListener('close',()=>{const trigger=focusBefore.get(dialog.id);if(trigger?.isConnected)trigger.focus({preventScroll:true});});
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
}
$('#prepare').addEventListener('click',()=>{
 if(!bag.length)return;
 const lines=bag.map(row=>{const p=products.find(p=>p.id===row.id);return `${row.quantity} × ${p.name} / tamanho ${row.size} — ${money(p.price*row.quantity)}`;});
 $('#order-text').value=['PASSO ATELIER — SELEÇÃO DEMONSTRATIVA',...lines,'Subtotal ilustrativo: '+$('#bag-total').textContent,'Sem pedido enviado, reserva de estoque, frete ou pagamento. Marca, valores e tamanhos fictícios.'].join('\n');
 $('#order-summary').hidden=false;$('#order-text').focus();$('#order-summary').scrollIntoView({block:'nearest'});
});
$('#copy-order').addEventListener('click',async()=>{try{if(!navigator.clipboard||!isSecureContext)throw new Error('clipboard');await navigator.clipboard.writeText($('#order-text').value);$('#copy-status').textContent='Seleção copiada. Nenhum pedido foi enviado.';}catch{$('#order-text').focus();$('#order-text').select();$('#copy-status').textContent='Texto selecionado. Use a opção Copiar do seu navegador ou Ctrl+C.';}});
function validProduct(p){return p&&typeof p.id==='string'&&/^[a-z0-9-]{1,60}$/.test(p.id)&&typeof p.name==='string'&&p.name.length>0&&p.name.length<120&&categories.slice(1).includes(p.category)&&['Clássico','Contemporâneo'].includes(p.style)&&Number.isInteger(p.price)&&p.price>0&&p.price<1000000&&Array.isArray(p.sizes)&&p.sizes.length>0&&p.sizes.every(n=>Number.isInteger(n)&&n>=34&&n<=46)&&typeof p.image==='string'&&/^[a-z0-9-]+\.webp$/.test(p.image)&&['color','alt','tag','description'].every(key=>typeof p[key]==='string'&&p[key].length<1500);}
async function initialize(){
 if(PASSO_CONFIG.mode==='supabase'){
   $('#data-status').textContent='CONSULTANDO CATÁLOGO PÚBLICO…';
   try{
     const url=new URL(PASSO_CONFIG.supabaseUrl);
     const key=PASSO_CONFIG.supabasePublicKey;
     if(url.protocol!=='https:'||!url.hostname.endsWith('.supabase.co')||!key||key.startsWith('sb_secret_'))throw new Error('Configuração inválida');
     if(key.split('.').length===3){const part=key.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');if(JSON.parse(atob(part)).role!=='anon')throw new Error('Use apenas chave pública anon');}
     else if(!key.startsWith('sb_publishable_'))throw new Error('Use apenas chave pública');
     const response=await fetch(new URL('/rest/v1/passo_products?select=id,name,category,style,color,price,sizes,image,alt,tag,description&active=eq.true&order=position.asc&limit=200',url),{headers:{apikey:key},credentials:'omit',signal:AbortSignal.timeout(10000)});
     if(!response.ok)throw new Error('Consulta indisponível');
     const rows=await response.json();
     if(!Array.isArray(rows)||rows.length===0||!rows.every(validProduct)||new Set(rows.map(p=>p.id)).size!==rows.length)throw new Error('Catálogo inválido');
     products=rows;$('#data-status').textContent='CATÁLOGO LIDO DO SUPABASE · SACOLA LOCAL';
   }catch{products=PASSO_PRODUCTS;$('#data-status').textContent='BANCO INDISPONÍVEL · CATÁLOGO LOCAL DEMONSTRATIVO';}
 }
 loadSaved();renderCategories();
 $('#size').innerHTML='<option value="">Todas</option>'+[...new Set(products.flatMap(p=>p.sizes))].sort((a,b)=>a-b).map(n=>`<option value="${n}">${n}</option>`).join('');
 render();renderBag();
}
initialize();
