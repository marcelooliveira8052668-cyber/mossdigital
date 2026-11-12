// Configurações da demonstração: não há backend ou cobrança automática.
const TELEFONE_MOSS = '5511942038103'; // WhatsApp autorizado.
const dinheiro = (valor) => valor.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); // Formatação brasileira.
function abrirWhatsApp(mensagem) { // Abre conversa com dados informados pelo visitante.
  const endereco = `https://wa.me/${TELEFONE_MOSS}?text=${encodeURIComponent(mensagem)}`; // Link codificado.
  window.open(endereco, '_blank', 'noopener,noreferrer'); // Abre em nova aba.
}
// Botões de contato genérico utilizam o número autorizado.
document.querySelectorAll('[data-wa]').forEach((botao) => {
  const mensagem = botao.dataset.wa || 'Olá! Vim pela demonstração da MOSS Digital e quero mais informações.'; // Texto padrão.
  botao.href = `https://wa.me/${TELEFONE_MOSS}?text=${encodeURIComponent(mensagem)}`; // Link real.
  botao.target = '_blank'; // Nova aba.
  botao.rel = 'noopener noreferrer'; // Segurança.
});
// Tenta carregar as fotografias locais somente quando forem adicionadas ao projeto.
document.querySelectorAll('img[data-photo]').forEach((img) => {
  const teste = new Image(); // Imagem invisível usada para verificar o caminho.
  teste.onload = () => { img.src = img.dataset.photo; }; // Foto real encontrada.
  teste.onerror = () => {}; // Mantém o placeholder se faltar arquivo.
  teste.src = img.dataset.photo; // Inicia o teste de existência.
});

// Fórmula demonstrativa de área, sem dimensionamento estrutural de engenharia.
const largura=document.getElementById('width'); // Largura do retângulo.
const comprimento=document.getElementById('length'); // Comprimento do retângulo.
const tipo=document.getElementById('type'); // Serviço escolhido.
const inclinacao=document.getElementById('slope'); // Fator escolhido pelo visitante.
const custo={telhas:150,revisao:65,calhas:90}; // Preços fictícios por m² para simulação.
let ultimo=null; // Guarda apenas a estimativa atual.
function calcular(){ // Prepara área e estimativa.
  const w=Number(largura.value); const l=Number(comprimento.value); // Dimensões informadas.
  if(!Number.isFinite(w)||!Number.isFinite(l)||w<=0||l<=0||w>100||l>100){document.getElementById('area').textContent='Confira medidas';document.getElementById('price').textContent='—';ultimo=null;return;} // Validação.
  const area=w*l*Number(inclinacao.value); // Área simplificada.
  const valor=area*custo[tipo.value]; // Valor demonstrativo.
  document.getElementById('area').textContent=`${area.toFixed(1).replace('.',',')} m²`; // Exibição.
  document.getElementById('price').textContent=dinheiro(valor); // Valor brasileiro.
  ultimo={area,valor,largura:w,comprimento:l,tipo:tipo.options[tipo.selectedIndex].text,inclinacao:inclinacao.value}; // Resumo.
}
[largura,comprimento,tipo,inclinacao].forEach(el=>el.addEventListener('input',calcular)); // Recalcula em cada alteração.
document.getElementById('form-telha').addEventListener('submit',(e)=>{ // Encaminha solicitação.
  e.preventDefault();if(!e.currentTarget.reportValidity())return; // Campos válidos.
  calcular();if(!ultimo){alert('Informe medidas válidas.');return;} // Valida total.
  abrirWhatsApp([`Olá! Quero orçamento pela demo Telha Certa.`,`Dimensões: ${ultimo.largura} x ${ultimo.comprimento} m`,`Serviço: ${ultimo.tipo}`,`Área estimada: ${ultimo.area.toFixed(1)} m²`,`Referência ilustrativa: ${dinheiro(ultimo.valor)}`,`Favor agendar vistoria e confirmar materiais, custos e prazo.`].join('\n')); // Envio sem backend.
});
calcular(); // Cálculo inicial.
// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
