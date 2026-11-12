// Gráfica Ponto: simulação de tiragem com carrinho de orçamento.
const pricePerItem={cartao:.75,folheto:1.15,etiqueta:.33}; // Custo fictício por unidade.
const labels={cartao:'Cartão de visita',folheto:'Folheto A5',etiqueta:'Etiqueta adesiva'}; // Nome comercial.
const items=[]; // Itens temporários da simulação.
const $=id=>document.getElementById(id); // Seleção por identificador.
const money=x=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(x); // Moeda brasileira.
function totalCost(p,qty,paper,finish){ // Calcula uma linha de impressão.
  const base=pricePerItem[p]*qty; // Preço de referência.
  const paperMultiplier=paper==='premium'?1.25:1; // Opção premium.
  const finishMultiplier=finish==='laminado'?1.20:1; // Acabamento.
  return Math.round(base*paperMultiplier*finishMultiplier*100)/100; // Arredonda centavos.
}
function render(){ // Atualiza a lista de itens.
  const list=$('items');list.replaceChildren(); // Reconstrói apenas o resumo.
  if(!items.length){const li=document.createElement('li');li.textContent='Seu pedido ainda está vazio.';list.append(li);} // Lista vazia.
  items.forEach((item,index)=>{ // Cada linha do pedido.
    const li=document.createElement('li'); // Elemento da lista.
    const text=document.createElement('span');text.textContent=`${item.quantity}× ${labels[item.product]} (${item.paper==='premium'?'premium':'padrão'} / ${item.finishing==='laminado'?'laminado':'padrão'}) — ${money(item.price)}`; // Texto seguro.
    const remove=document.createElement('button');remove.type='button';remove.textContent='Remover';remove.style.marginLeft='9px';remove.addEventListener('click',()=>{items.splice(index,1);render();}); // Exclusão.
    li.append(text,remove);list.append(li); // Adiciona a linha.
  });
  $('sum').textContent=money(items.reduce((sum,item)=>sum+item.price,0)); // Soma do pedido.
}
$('add-item').addEventListener('click',()=>{ // Adiciona impressão à lista.
  const product=$('product').value;const quantity=Number($('quantity').value);const paper=$('paper').value;const finishing=$('finishing').value; // Valores do formulário.
  if(!Number.isInteger(quantity)||quantity<50||quantity>10000){$('quantity').reportValidity();$('note').textContent='Informe de 50 a 10.000 unidades.';return;} // Validação.
  items.push({product,quantity,paper,finishing,price:totalCost(product,quantity,paper,finishing)}); // Nova linha.
  $('note').textContent=`${labels[product]} adicionado ao orçamento.`;render(); // Feedback.
});
$('send').addEventListener('click',()=>{ // Prepara mensagem de orçamento.
  if(!items.length){$('note').textContent='Adicione ao menos um produto.';return;} // Impede envio vazio.
  const name=$('client').value.trim(); // Nome opcional.
  const msg=[`Olá! Vim pela demo Gráfica Ponto. Gostaria de confirmar os seguintes impressos:`,...items.map(i=>`• ${i.quantity}× ${labels[i.product]} / papel ${i.paper} / acabamento ${i.finishing}: ${money(i.price)}`),`Estimativa ilustrativa: ${$('sum').textContent}`,`Nome: ${name||'Não informado'}`,`Preciso confirmar preço final, arte e prazo.`].join('\n'); // Resumo.
  $('note').textContent='Mensagem preparada para revisão no WhatsApp.'; // Feedback.
  window.open(`https://wa.me/5511942038103?text=${encodeURIComponent(msg)}`,'_blank','noopener,noreferrer'); // Abre WhatsApp.
});
document.querySelectorAll('img[data-photo]').forEach(img=>{const check=new Image();check.onload=()=>img.src=img.dataset.photo;check.onerror=()=>{};check.src=img.dataset.photo;}); // Fotos opcionais.
render(); // Estado inicial do balcão.
// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
