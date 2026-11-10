// MudaJá: checklist persistido localmente e solicitação de orçamento pelo WhatsApp.
const key='moss_demo_mudaja_inventario_v1'; // Chave apenas deste protótipo.
const checks=[...document.querySelectorAll('[data-task]')]; // Lista de tarefas ilustrativas.
function update(){ // Atualiza contagem e armazenamento local.
  const selected=checks.filter(item=>item.checked); // Tarefas marcadas.
  document.getElementById('progress').textContent=`${selected.length} de ${checks.length} itens`; // Progresso textual.
  document.getElementById('bar').style.width=`${100*selected.length/checks.length}%`; // Progresso visual.
  try{localStorage.setItem(key,JSON.stringify(selected.map(item=>item.dataset.task)));}catch(err){/* Falha no localStorage não impede o uso. */} // Persiste somente rótulos genéricos.
}
try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))checks.forEach(item=>item.checked=saved.includes(item.dataset.task));}catch(err){/* Ignora armazenamento inválido. */} // Recupera estado salvo.
checks.forEach(item=>item.addEventListener('change',update)); // Atualiza ao clicar.
document.getElementById('reset').addEventListener('click',()=>{checks.forEach(item=>item.checked=false);update();}); // Limpa checklist.
update(); // Inicia o progresso.
const form=document.getElementById('quote-form'); // Solicitação de mudança.
const rooms=document.getElementById('rooms'); // Quantidade de cômodos.
function calc(){const n=Number(rooms.value);document.getElementById('capacity').textContent=Number.isFinite(n)&&n>0?`${n} cômodo${n===1?'':'s'}`:'Informe um número válido';} // Somente planejamento visual.
rooms.addEventListener('input',calc);calc(); // Atualiza conforme digitação.
const date=document.getElementById('date'); // Data preferida.
const now=new Date();date.min=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10); // Limita a datas futuras.
form.addEventListener('submit',event=>{ // Abre conversa comercial.
  event.preventDefault();if(!form.reportValidity())return; // Valida o formulário.
  const msg=['Olá! Vim pela demo MudaJá e gostaria de orçamento para mudança.']; // Cabeçalho.
  new FormData(form).forEach((value,key)=>msg.push(`${key}: ${value}`)); // Inclui dados inseridos pelo visitante.
  msg.push('A data e o valor só serão confirmados pelo atendimento.'); // Evita promessas falsas.
  window.open(`https://wa.me/5511942038103?text=${encodeURIComponent(msg.join('\n'))}`,'_blank','noopener,noreferrer'); // Contato autorizado.
});
