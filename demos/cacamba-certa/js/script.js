// Cálculo demonstrativo de aluguel de caçambas. Não confirma disponibilidade ou preço comercial.
const form=document.getElementById('quote-form'); // Formulário de solicitação.
const volume=document.getElementById('volume'); // Volume escolhido.
const qty=document.getElementById('quantity'); // Quantidade de caçambas.
const days=document.getElementById('days'); // Dias de locação.
const total=document.getElementById('total'); // Exibição do valor calculado.
const prices={3:250,4:310,5:370}; // Valores fictícios, não ofertas reais.
const fmt=value=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(value); // Formatação em reais.
function calculate(){ // Recalcula preço exemplificativo.
  const q=Math.max(1,Math.min(10,Number(qty.value)||1)); // Valida quantidade.
  const d=Math.max(1,Math.min(15,Number(days.value)||1)); // Valida período.
  const size=Number(volume.value); // Converte tamanho.
  const estimate=q*((prices[size]||0)+Math.max(0,d-3)*35); // Exemplo simples para aula.
  total.textContent=fmt(estimate); // Atualiza cartão de estimativa.
  document.querySelectorAll('[data-size]').forEach(btn=>btn.setAttribute('aria-pressed',String(Number(btn.dataset.size)===size))); // Marca a opção ativa.
  return estimate; // Permite incluir valor no WhatsApp.
}
document.querySelectorAll('[data-size]').forEach(btn=>btn.addEventListener('click',()=>{volume.value=btn.dataset.size;calculate();document.getElementById('simular').scrollIntoView({behavior:'smooth'});})); // Seleção rápida.
[volume,qty,days].forEach(input=>input.addEventListener('input',calculate)); // Atualiza ao alterar.
const date=document.getElementById('date'); // Campo de data.
const now=new Date(); // Relógio local do visitante.
date.min=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10); // Impede passado na interface.
form.addEventListener('submit',event=>{ // Abre o WhatsApp somente após ação do visitante.
  event.preventDefault(); // Evita recarga da página.
  if(!form.reportValidity())return; // Respeita validação HTML.
  const lines=['Olá! Vim pela demo Caçamba Certa e gostaria de um orçamento.']; // Mensagem inicial.
  new FormData(form).forEach((value,key)=>lines.push(`${key}: ${value}`)); // Acrescenta campos preenchidos.
  lines.push(`Estimativa ilustrativa: ${fmt(calculate())}`,'O preço e a disponibilidade precisam de confirmação.'); // Esclarece limites.
  window.open(`https://wa.me/5511942038103?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer'); // Abre conversa.
});
calculate(); // Exibe valor inicial.
// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
