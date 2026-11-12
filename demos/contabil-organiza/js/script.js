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

// Este painel é um protótipo local sem dados fiscais, anexos ou transmissão para servidores.
const mesCampo = document.getElementById('month'); // Define o mês ativo.
const lista = document.getElementById('task-list'); // Lista de tarefas.
const tarefaCampo = document.getElementById('new-task'); // Texto digitado pelo usuário.
const modelo = [ // Modelo inicial, sem datas fiscais oficiais.
  {id:'modelo-1',texto:'Organizar comprovantes de exemplo',feito:false}, // Tarefa A.
  {id:'modelo-2',texto:'Conferir documentos recebidos (simulação)',feito:false}, // Tarefa B.
  {id:'modelo-3',texto:'Preparar perguntas para o contador',feito:false}, // Tarefa C.
  {id:'modelo-4',texto:'Revisar pendências administrativas',feito:false} // Tarefa D.
];
const hoje=new Date(); // Define mês atual no dispositivo.
mesCampo.value=`${hoje.getFullYear()}-${String(hoje.getMonth()+1).padStart(2,'0')}`; // Formato input month.
function chave(){ return `moss-contabil-demo-${mesCampo.value}`; } // Chave específica do mês.
function carregar(){ // Recupera tarefas do mês neste navegador.
  try { const gravado=JSON.parse(localStorage.getItem(chave())); return Array.isArray(gravado)?gravado:modelo.map(t=>({...t})); } // Dados existentes.
  catch { return modelo.map(t=>({...t})); } // Recuperação segura em caso de dados inválidos.
}
let tarefas=carregar(); // Estado atual do painel.
function salvar(){ // Salva apenas checklist demonstrativo.
  try{localStorage.setItem(chave(),JSON.stringify(tarefas));}catch{document.getElementById('storage-note').textContent='Seu navegador não permitiu salvar os dados.';} // Sem falhar se o navegador bloquear.
}
function renderizar(){ // Atualiza lista e indicador de progresso.
  lista.replaceChildren(); // Elimina itens antigos de modo seguro.
  tarefas.forEach(t=>{ // Uma linha por tarefa.
    const li=document.createElement('li'); // Cria linha.
    if(t.feito)li.classList.add('done'); // Marca estado.
    const box=document.createElement('input'); // Caixa de seleção.
    box.type='checkbox';box.checked=!!t.feito;box.id=`t-${t.id}`; // Configuração acessível.
    const label=document.createElement('label');label.htmlFor=box.id;label.textContent=t.texto; // Somente texto, sem HTML inseguro.
    box.addEventListener('change',()=>{t.feito=box.checked;salvar();renderizar();}); // Marca tarefa.
    const del=document.createElement('button');del.type='button';del.textContent='×';del.setAttribute('aria-label',`Excluir ${t.texto}`); // Excluir.
    del.addEventListener('click',()=>{tarefas=tarefas.filter(item=>item.id!==t.id);salvar();renderizar();}); // Remove.
    li.append(box,label,del);lista.append(li); // Exibe na interface.
  });
  const feitas=tarefas.filter(t=>t.feito).length; // Quantidade concluída.
  document.getElementById('progress-label').textContent=`${feitas}/${tarefas.length}`; // Indicador.
  document.getElementById('progress-fill').style.width=tarefas.length?`${feitas/tarefas.length*100}%`:'0%'; // Barra.
}
mesCampo.addEventListener('change',()=>{tarefas=carregar();renderizar();}); // Troca mês.
document.getElementById('new-task-form').addEventListener('submit',(e)=>{ // Cria item.
  e.preventDefault();const texto=tarefaCampo.value.trim();if(!texto)return; // Valida entrada.
  tarefas.push({id:`custom-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,texto,feito:false}); // Identificador local.
  tarefaCampo.value='';salvar();renderizar(); // Atualiza.
});
document.getElementById('reset-tasks').addEventListener('click',()=>{ // Reinicia demonstração.
  if(confirm('Repor as tarefas de demonstração deste mês?')){tarefas=modelo.map(t=>({...t}));salvar();renderizar();} // Pede confirmação.
});
document.getElementById('contact-form').addEventListener('submit',(e)=>{ // Contato por WhatsApp.
  e.preventDefault();if(!e.currentTarget.reportValidity())return; // Validação HTML.
  const nome=document.getElementById('client-name').value.trim(); // Nome.
  const tipo=document.getElementById('client-type').value; // Assunto.
  const detalhe=document.getElementById('client-detail').value.trim(); // Resumo.
  abrirWhatsApp([`Olá! Vim pela demo Contábil Organiza.`,`Nome: ${nome}`,`Assunto: ${tipo}`,`Mensagem: ${detalhe||'Gostaria de mais informações.'}`].join('\n')); // Abre conversa.
});
// Disponibiliza aviso de persistência sem guardar documentos.
const nota=document.createElement('small');nota.id='storage-note';nota.textContent='Dados deste exemplo ficam somente neste navegador.';document.querySelector('.tasks').append(nota); // Nota visível.
renderizar(); // Monta checklist inicial.
// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
