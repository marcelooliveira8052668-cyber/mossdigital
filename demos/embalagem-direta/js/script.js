// EMBALAGEM DIRETA — catálogo e carrinho de cotação local, sem cobrança.
(() => { // Evita variáveis globais.
  'use strict'; // Proteção de escopo.
  const PHONE='5511942038103'; // WhatsApp autorizado para a MOSS Digital.
  const products=[ // Produtos ilustrativos, valores em reais por pacote.
    {id:'cx-pizza',name:'Caixa pizza kraft',category:'food',unit:'pacote com 25 un.',price:42,photo:'caixa-pizza.webp',info:'Para delivery de pizzas.'}, // Item 01.
    {id:'box-lanche',name:'Box para hambúrguer',category:'food',unit:'pacote com 50 un.',price:36,photo:'box-hamburguer.webp',info:'Para lanches e porções.'}, // Item 02.
    {id:'pote-750',name:'Pote 750 ml com tampa',category:'food',unit:'pacote com 25 un.',price:31,photo:'pote-marmita.webp',info:'Para refeições prontas.'}, // Item 03.
    {id:'copo-300',name:'Copo transparente 300 ml',category:'bebidas',unit:'pacote com 100 un.',price:24,photo:'copo-plastico.webp',info:'Para sucos e sobremesas.'}, // Item 04.
    {id:'tampa-copo',name:'Tampa para copo',category:'bebidas',unit:'pacote com 100 un.',price:16,photo:'tampa-copo.webp',info:'Compatibilidade a confirmar.'}, // Item 05.
    {id:'sacola-kraft',name:'Sacola kraft reforçada',category:'sacolas',unit:'pacote com 50 un.',price:59,photo:'sacola-kraft.webp',info:'Para lojas e presentes.'}, // Item 06.
    {id:'sacola-delivery',name:'Sacola delivery',category:'sacolas',unit:'pacote com 100 un.',price:73,photo:'sacola-delivery.webp',info:'Opção para transporte.'}, // Item 07.
    {id:'box-doce',name:'Caixa para doces',category:'food',unit:'pacote com 50 un.',price:48,photo:'caixa-doce.webp',info:'Para kits e docerias.'} // Item 08.
  ];
  const KEY='moss-embalagem-direta-cotacao-v1'; // Armazenamento exclusivo.
  const $=selector=>document.querySelector(selector); // Consulta simples.
  const brl=number=>number.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); // Formatação brasileira.
  let category='todos'; // Filtro inicial.
  let basket={}; // Quantidade de pacotes por produto.
  try {const stored=JSON.parse(localStorage.getItem(KEY)||'{}'); if(stored && typeof stored==='object' && !Array.isArray(stored)) for(const product of products){ const q=Number(stored[product.id]); if(Number.isSafeInteger(q)&&q>0&&q<=500)basket[product.id]=q; }} catch {basket={};} // Recupera somente quantidades válidas.
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(basket));}catch{/* Continua sem persistência se o navegador bloquear. */}}; // Guarda dados locais.
  const menuButton=$('#menu-toggle'); // Botão de menu.
  menuButton?.addEventListener('click',()=>{const open=$('#nav-links').classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));}); // Alterna menu.
  const priceFor=(product,qty)=>{ // Preço progressivo fictício por volume de pacotes.
    const discount=qty>=200?.18:qty>=50?.1:0; // Regra de demonstração.
    return product.price*qty*(1-discount); // Valor ilustrativo.
  };
  const make=(tag,cls,text)=>{const element=document.createElement(tag);if(cls)element.className=cls;if(text!==undefined)element.textContent=text;return element;}; // Cria elementos com texto seguro.
  const attachPhoto=img=>{ // Troca SVG somente se o WebP local existir.
    const preloader=new Image();preloader.onload=()=>{img.src=img.dataset.photo;};preloader.src=img.dataset.photo;
  };
  const renderCatalog=()=>{ // Lista os produtos de acordo com busca e categoria.
    const term=$('#search').value.toLocaleLowerCase('pt-BR').trim(); // Texto digitado.
    const container=$('#products');container.replaceChildren(); // Remove a lista antiga.
    const visible=products.filter(item=>(category==='todos'||item.category===category)&&(`${item.name} ${item.info}`.toLocaleLowerCase('pt-BR').includes(term))); // Pesquisa.
    if(!visible.length){container.append(make('p','empty','Nenhum item encontrado nesta categoria.'));return;} // Mensagem de ausência.
    visible.forEach(product=>{ // Monta cartão próprio.
      const card=make('article','product-card'); // Contêiner.
      const media=make('div','product-photo'); // Foto.
      const img=document.createElement('img');img.src='assets/img/placeholder.svg';img.dataset.photo=`assets/img/${product.photo}`;img.alt=`Fotografia de ${product.name} a inserir`;img.loading='lazy';img.width=900;img.height=675;attachPhoto(img);media.append(img); // Fotografia substituível.
      const copy=make('div','product-copy'); // Conteúdo de venda.
      copy.append(make('small','',product.category==='food'?'Alimentos':product.category==='bebidas'?'Bebidas':'Sacolas'),make('h3','',product.name),make('p','',product.info)); // Texto do produto.
      const amount=make('div','product-price',brl(product.price));const unit=make('span','',` / ${product.unit}`);amount.append(unit);copy.append(amount); // Preço e unidade.
      const actions=make('div','product-actions'); // Controles de pedido.
      const quantity=document.createElement('input');quantity.type='number';quantity.min='1';quantity.max='500';quantity.value='1';quantity.setAttribute('aria-label',`Quantidade de pacotes de ${product.name}`); // Quantidade.
      const button=make('button','','+ Adicionar');button.type='button';button.addEventListener('click',()=>{const qty=Number(quantity.value);if(!Number.isSafeInteger(qty)||qty<1||qty>500){alert('Escolha entre 1 e 500 pacotes.');return;}basket[product.id]=Math.min(500,(basket[product.id]||0)+qty);save();renderBasket();}); // Adiciona ao pedido.
      actions.append(quantity,button);copy.append(actions);card.append(media,copy);container.append(card); // Exibe cartão.
    });
  };
  const renderBasket=()=>{ // Atualiza a cesta e totais.
    const container=$('#cart-lines');container.replaceChildren(); // Reinicia linhas.
    const items=products.filter(product=>(basket[product.id]||0)>0); // Itens escolhidos.
    const quantityTotal=items.reduce((sum,p)=>sum+basket[p.id],0); // Total de pacotes.
    $('#cart-count').textContent=String(quantityTotal);$('#cart-badge').textContent=String(quantityTotal); // Contadores.
    const total=items.reduce((sum,p)=>sum+priceFor(p,basket[p.id]),0);$('#total-price').textContent=brl(total); // Total estimativo.
    if(!items.length){container.append(make('p','empty','Seu pedido está vazio. Adicione produtos do catálogo.'));return;} // Vazio.
    items.forEach(product=>{ // Uma linha por item.
      const q=basket[product.id];const line=make('div','cart-line'); // Contêiner.
      const head=make('div','cart-line-head');head.append(make('span','',product.name),make('span','',brl(priceFor(product,q))));line.append(head,make('small','',product.unit)); // Produto e preço.
      const actions=make('div','line-actions');const input=document.createElement('input');input.type='number';input.min='1';input.max='500';input.value=String(q);input.setAttribute('aria-label',`Quantidade de ${product.name}`); // Editor.
      input.addEventListener('change',()=>{const value=Number(input.value);if(!Number.isSafeInteger(value)||value<1||value>500){alert('Quantidade entre 1 e 500.');input.value=String(q);return;}basket[product.id]=value;save();renderBasket();}); // Edita.
      const remove=make('button','','Remover');remove.type='button';remove.addEventListener('click',()=>{delete basket[product.id];save();renderBasket();}); // Exclui.
      actions.append(input,remove);line.append(actions);container.append(line); // Insere linha.
    });
  };
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));renderCatalog();})); // Filtro ativo.
  $('#search').addEventListener('input',renderCatalog); // Pesquisa em tempo real.
  $('#send-order').addEventListener('click',()=>{ // Monta mensagem do orçamento.
    const items=products.filter(product=>(basket[product.id]||0)>0);if(!items.length){alert('Adicione pelo menos um produto.');return;} // Verifica pedido.
    const lines=['Olá! Vim pela demo Embalagem Direta e gostaria de uma cotação:','']; // Abertura da mensagem.
    items.forEach(p=>lines.push(`• ${p.name}: ${basket[p.id]} pacote(s) (${p.unit}) — ref. ${brl(priceFor(p,basket[p.id]))}`)); // Produtos.
    lines.push('',`TOTAL ILUSTRATIVO: ${brl(items.reduce((sum,p)=>sum+priceFor(p,basket[p.id]),0))}`,'Favor confirmar estoque, preço, frete e condições.'); // Aviso.
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer'); // Abre WhatsApp.
  });
  $('#clear-order').addEventListener('click',()=>{if(confirm('Esvaziar o pedido fictício?')){basket={};save();renderBasket();}}); // Apaga a cesta.
  renderCatalog();renderBasket(); // Inicialização.
})(); // Fim.
// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
