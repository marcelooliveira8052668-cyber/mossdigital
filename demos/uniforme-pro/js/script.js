// Configurador comercial de uniformes: preços meramente fictícios.
const options={camisa:{label:'Camisa polo',price:48},jaleco:{label:'Jaleco profissional',price:76},avental:{label:'Avental premium',price:61}}; // Catálogo demonstrativo.
const form=document.getElementById('quote-form'); // Formulário de orçamento.
const model=document.getElementById('model'); // Modelo escolhido.
const finish=document.getElementById('finish'); // Personalização ilustrativa.
const sizes=[...document.querySelectorAll('[data-size]')]; // Tamanhos do lote.
const fmt=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n); // Formata valores.
function quantity(input){return Number(input.value)||0;} // Converte a quantidade para número.
function calculate(){ // Atualiza totais e cards.
  const totalQty=sizes.reduce((sum,input)=>sum+Math.max(0,quantity(input)),0); // Soma tamanhos.
  const unit=options[model.value].price+(finish.value==='logo'?12:0); // Preço de exemplo por modelo.
  const total=totalQty*unit; // Total hipotético.
  document.getElementById('count').textContent=String(totalQty); // Atualiza total de peças.
  document.getElementById('total').textContent=fmt(total); // Atualiza o valor ilustrativo.
  document.querySelectorAll('[data-model]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.model===model.value))); // Destaque visual.
  return {totalQty,total}; // Retorna totais.
}
document.querySelectorAll('[data-model]').forEach(button=>button.addEventListener('click',()=>{model.value=button.dataset.model;calculate();document.getElementById('montagem').scrollIntoView({behavior:'smooth'});})); // Seleciona o modelo do card.
[model,finish,...sizes].forEach(input=>input.addEventListener('input',calculate)); // Recalcula em tempo real.
form.addEventListener('submit',event=>{ // Envia consulta somente com ação do visitante.
  event.preventDefault(); // Impede envio para servidor inexistente.
  if(!form.reportValidity())return; // Confere campos obrigatórios.
  const summary=calculate(); // Obtém totais atualizados.
  if(summary.totalQty<1){sizes[0].focus();alert('Informe pelo menos uma peça para solicitar o orçamento.');return;} // Evita pedido sem itens.
  const lines=['Olá! Vim pela demo Uniforme Pro e gostaria de uma cotação.',`Empresa: ${form.elements.Empresa.value}`,`Modelo: ${options[model.value].label}`,`Personalização: ${finish.selectedOptions[0].text}`,`Tamanhos: ${sizes.map(input=>`${input.dataset.size}=${quantity(input)}`).join(', ')}`,`Quantidade: ${summary.totalQty}`,`Estimativa ilustrativa: ${fmt(summary.total)}`,`Observações: ${form.elements['Observações'].value||'Nenhuma'}`,'Preço final e prazo sujeitos à confirmação.']; // Mensagem da proposta.
  window.open(`https://wa.me/5511942038103?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer'); // Abre WhatsApp.
});
calculate(); // Estado inicial.
// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
