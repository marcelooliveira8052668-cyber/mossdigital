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

// Regras apenas demonstrativas; locação real depende de disponibilidade.
const form=document.getElementById('planner-form'); // Formulário de evento.
const ids=['days','chairs','tables','linens','lighting']; // Controles que alteram o total.
const byId=(id)=>document.getElementById(id); // Atalho para encontrar campo.
function calcular(){ // Calcula a previsão de locação.
  const dias=Number(byId('days').value)||1; // Período.
  const cadeiras=Math.max(0,Math.min(300,Number(byId('chairs').value)||0)); // Quantidade.
  const mesas=Math.max(0,Math.min(80,Number(byId('tables').value)||0)); // Quantidade.
  const toalhas=byId('linens').checked?mesas*18:0; // Adicional por mesa.
  const luz=byId('lighting').checked?190:0; // Kit decorativo.
  const total=(cadeiras*9+mesas*32+toalhas+luz)*dias; // Total ilustrativo.
  byId('estimate-total').textContent=dinheiro(total); // Atualiza a interface.
  return {dias,cadeiras,mesas,total,toalhas,luz}; // Devolve dados para mensagem.
}
ids.forEach((id)=>byId(id).addEventListener('input',calcular)); // Recalcula em tempo real.
form.addEventListener('submit',(evento)=>{ // Prepara solicitação.
  evento.preventDefault(); // Não envia dados ao servidor.
  if(!form.reportValidity())return; // Valida os campos HTML.
  const resumo=calcular(); // Dados atualizados.
  if(resumo.cadeiras===0&&resumo.mesas===0&&!resumo.luz){alert('Selecione pelo menos um item.');return;} // Evita pedido vazio.
  const data=byId('date').value; // Data solicitada.
  const local=byId('location').value.trim(); // Local do evento.
  const msg=[`Olá! Quero cotar locação de móveis pela demo Aluga Festa.`,`Data: ${data}`,`Local: ${local}`,`Diárias: ${resumo.dias}`,`Cadeiras: ${resumo.cadeiras}`,`Mesas: ${resumo.mesas}`,`Toalhas: ${byId('linens').checked?'sim':'não'}`,`Iluminação: ${byId('lighting').checked?'sim':'não'}`,`Estimativa ilustrativa: ${dinheiro(resumo.total)}`,`Favor confirmar frete, disponibilidade e valor real.`]; // Mensagem completa.
  abrirWhatsApp(msg.join('\n')); // Abre WhatsApp.
});
calcular(); // Estado inicial.
