// Demo Piscina em Dia: volume geométrico e checklist do navegador.
const inputs=['length','width','depth'].map(id=>document.getElementById(id)); // Medidas da piscina em metros.
const liters=document.getElementById('liters'); // Saída do cálculo.
function calculate(){ // Cálculo exclusivo para piscinas retangulares.
  const dimensions=inputs.map(input=>Number(input.value)); // Converte o texto em números.
  const valid=inputs.every(input=>input.checkValidity())&&dimensions.every(n=>n>0); // Evita medidas vazias ou inválidas.
  const volume=valid?dimensions.reduce((a,b)=>a*b,1)*1000:0; // Metro cúbico convertido em litros.
  liters.textContent=valid?`${new Intl.NumberFormat('pt-BR',{maximumFractionDigits:0}).format(volume)} litros`:'Confira as medidas'; // Mostra apenas estimativa geométrica.
}
inputs.forEach(input=>input.addEventListener('input',calculate)); // Atualiza a cada modificação.
calculate(); // Resultado inicial.
const key='moss_demo_piscina_checklist_v1'; // Chave do estado local.
const checks=[...document.querySelectorAll('[data-task]')]; // Caixa de cada tarefa.
const progress=document.getElementById('progress'); // Texto do progresso.
const bar=document.getElementById('progressbar'); // Barra visual.
function update(){ // Atualiza lista e barra.
  const marked=checks.filter(box=>box.checked).length; // Conta tarefas assinaladas.
  progress.textContent=`${marked} de ${checks.length} tarefas`; // Mostra o andamento.
  bar.style.width=`${100*marked/checks.length}%`; // Escala da barra.
  try{localStorage.setItem(key,JSON.stringify(checks.filter(box=>box.checked).map(box=>box.dataset.task)));}catch(err){/* Mantém a demo utilizável se o armazenamento estiver bloqueado. */} // Persistência opcional.
}
try{const stored=JSON.parse(localStorage.getItem(key)||'[]');checks.forEach(box=>box.checked=Array.isArray(stored)&&stored.includes(box.dataset.task));}catch(err){/* Ignora dados inválidos. */} // Restaura marcações válidas.
checks.forEach(box=>box.addEventListener('change',update)); // Ouve cada mudança.
document.getElementById('reset').addEventListener('click',()=>{checks.forEach(box=>box.checked=false);update();}); // Limpa marcações.
update(); // Atualiza estado inicial.
const date=document.getElementById('visit-date'); // Data preferida.
const now=new Date(); // Hora do visitante.
date.min=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10); // Data mínima local.
const form=document.getElementById('visit-form'); // Formulário de solicitação.
form.addEventListener('submit',event=>{ // Encaminha solicitação ao WhatsApp.
  event.preventDefault();if(!form.reportValidity())return; // Valida antes de abrir.
  const lines=['Olá! Vi a demo Piscina em Dia e gostaria de agendar uma avaliação.']; // Saudação.
  new FormData(form).forEach((value,key)=>lines.push(`${key}: ${value}`)); // Campos básicos.
  lines.push(`Volume geométrico estimado: ${liters.textContent}`,'A data é apenas uma preferência, sujeito a confirmação.'); // Contexto sem recomendação técnica.
  window.open(`https://wa.me/5511942038103?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer'); // Abre conversa.
});
