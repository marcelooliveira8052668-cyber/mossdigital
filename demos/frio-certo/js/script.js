// Frio Certo: pedido de visita sem reserva automática e sem banco de dados.
const form=document.getElementById('visit-form'); // Formulário de triagem.
const date=document.getElementById('date'); // Data preferida de atendimento.
const today=new Date(); // Data atual do dispositivo.
const localISO=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10); // Data local sem efeito de fuso UTC.
date.min=localISO; // Bloqueia escolha de datas anteriores.
date.value=localISO; // Data inicial sugerida.
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{ // Atalho do card para o formulário.
  document.getElementById('service').value=link.dataset.service; // Seleciona o serviço escolhido.
}));
form.addEventListener('submit',e=>{ // Constrói mensagem para consulta de horário.
  e.preventDefault(); // Evita enviar dados para um servidor inexistente.
  if(!form.reportValidity())return; // Validação nativa.
  const data=new FormData(form); // Dados temporários.
  const selected=data.get('data'); // Data desejada.
  if(selected<localISO){alert('Escolha uma data de hoje em diante.');return;} // Impede data antiga.
  const readable=selected.split('-').reverse().join('/'); // Formato brasileiro.
  const msg=`Olá! Vim pela demo Frio Certo. Gostaria de solicitar visita. Nome: ${data.get('nome')}. Ambiente: ${data.get('ambiente')}. Serviço: ${data.get('servico')}. Quantidade de aparelhos: ${data.get('aparelhos')}. Data desejada: ${readable}. Período: ${data.get('periodo')}. Observações: ${data.get('observacoes')||'Nenhuma'}. Entendo que horário e preço dependem de confirmação.`; // Texto claro.
  window.open(`https://wa.me/5511942038103?text=${encodeURIComponent(msg)}`,'_blank','noopener,noreferrer'); // Abre o WhatsApp.
});
document.querySelectorAll('img[data-photo]').forEach(img=>{const check=new Image();check.onload=()=>img.src=img.dataset.photo;check.onerror=()=>{};check.src=img.dataset.photo;}); // Substituição de fotos opcionais.
