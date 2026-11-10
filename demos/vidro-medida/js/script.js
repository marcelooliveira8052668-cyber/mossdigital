// Vidro & Medida: cálculo ilustrativo por metro quadrado.
const PRICES={temperado:340,laminado:440,espelho:260}; // Valores fictícios, não são cotação real.
const $=id=>document.getElementById(id); // Atalho para elementos do formulário.
const fmt=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n); // Preço em reais.
const form=$('measure-form'); // Referência ao formulário principal.
function calculate(){ // Atualiza área e estimativa quando o usuário muda os campos.
  const w=Number($('width').value);const h=Number($('height').value);const pieces=Number($('pieces').value); // Dimensões em centímetros.
  const valid=Number.isFinite(w)&&Number.isFinite(h)&&Number.isFinite(pieces)&&w>=20&&w<=400&&h>=20&&h<=400&&pieces>=1&&pieces<=30; // Limites da demo.
  if(!valid){$('area').textContent='Verifique as medidas';$('estimate').textContent='—';return null;} // Dados inválidos.
  const area=w*h*pieces/10000; // Conversão de cm² para m².
  const rate=PRICES[$('type').value]; // Valor ilustrativo por metro.
  const factor=$('finish').value==='premium'?1.15:1; // Acréscimo ilustrativo.
  const total=area*rate*factor; // Total sem instalação, frete ou ferragens.
  $('area').textContent=`${area.toLocaleString('pt-BR',{maximumFractionDigits:2})} m²`; // Área.
  $('estimate').textContent=fmt(total); // Estimativa visual.
  $('glass-label').textContent=`${(w/100).toFixed(2).replace('.',',')} × ${(h/100).toFixed(2).replace('.',',')} m`; // Esquema.
  return{area,total,w,h,pieces,type:$('type').selectedOptions[0].text,finish:$('finish').selectedOptions[0].text}; // Dados para WhatsApp.
}
form.querySelectorAll('input,select').forEach(el=>el.addEventListener('input',calculate)); // Recalcula em tempo real.
form.addEventListener('submit',event=>{ // Abre pedido de orçamento manual.
  event.preventDefault();const d=calculate();if(!d)return; // Só permite medidas válidas.
  const msg=`Olá! Vim pela demo Vidro & Medida. Gostaria de orçamento para ${d.pieces} peça(s) de ${d.w} cm × ${d.h} cm. Tipo: ${d.type}; acabamento: ${d.finish}. Área aproximada: ${d.area.toFixed(2)} m². Estimativa ilustrativa: ${fmt(d.total)}. Quero confirmação de medidas, ferragens, instalação e preço real.`; // Mensagem.
  window.open(`https://wa.me/5511942038103?text=${encodeURIComponent(msg)}`,'_blank','noopener,noreferrer'); // WhatsApp.
});
document.querySelectorAll('img[data-photo]').forEach(img=>{const i=new Image();i.onload=()=>img.src=img.dataset.photo;i.onerror=()=>{};i.src=img.dataset.photo;}); // Fotos reais opcionais.
calculate(); // Mostra a primeira estimativa.
