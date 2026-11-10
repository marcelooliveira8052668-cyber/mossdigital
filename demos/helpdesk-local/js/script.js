// HelpDesk Local: cadastro de demonstração, sem API e sem dados reais de clientes.
const key='moss_demo_helpdesk_tickets_v1'; // Estado exclusivo do navegador.
const form=document.getElementById('ticket-form'); // Novo chamado.
const list=document.getElementById('ticket-list'); // Lista de solicitações.
const filter=document.getElementById('filter'); // Filtro por status.
let tickets=[]; // Array de chamados fictícios.
try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))tickets=saved.filter(item=>item&&typeof item.id==='string'&&typeof item.title==='string');}catch(err){/* Se houver dados inválidos, inicia lista vazia. */} // Carrega registros locais.
function save(){try{localStorage.setItem(key,JSON.stringify(tickets));}catch(err){/* A falha de armazenamento não impede a demonstração. */}} // Salva o estado atual.
function putText(node,text){node.textContent=String(text);} // Usa textContent para evitar inserção de HTML malicioso.
function render(){ // Atualiza o painel e as métricas.
  document.getElementById('total-count').textContent=tickets.length; // Total geral.
  document.getElementById('open-count').textContent=tickets.filter(x=>x.status==='Aberto').length; // Abertos.
  document.getElementById('doing-count').textContent=tickets.filter(x=>x.status==='Em andamento').length; // Em andamento.
  document.getElementById('done-count').textContent=tickets.filter(x=>x.status==='Resolvido').length; // Resolvidos.
  const selected=filter.value==='Todos'?tickets:tickets.filter(x=>x.status===filter.value); // Aplica filtro.
  list.replaceChildren(); // Remove elementos anteriores de forma segura.
  if(!selected.length){const p=document.createElement('p');p.className='empty';p.textContent='Nenhum chamado neste filtro.';list.append(p);return;} // Estado vazio.
  selected.forEach(item=>{ // Monta cada ticket com elementos DOM.
    const row=document.createElement('article');row.className='ticket'; // Estrutura principal.
    const info=document.createElement('div'); // Conteúdo do chamado.
    const h=document.createElement('h3');putText(h,item.title); // Assunto do chamado.
    const detail=document.createElement('p');putText(detail,item.description||'Sem descrição'); // Descrição segura.
    const meta=document.createElement('small');putText(meta,`${item.category} · Prioridade ${item.priority} · ${item.id.slice(0,8)}`); // Metadados.
    info.append(h,detail,meta); // Organiza texto.
    const controls=document.createElement('div');controls.className='ticket-controls'; // Área de comandos.
    const select=document.createElement('select');select.setAttribute('aria-label',`Status de ${item.title}`); // Alterar status.
    ['Aberto','Em andamento','Resolvido'].forEach(status=>{const option=document.createElement('option');option.value=status;option.textContent=status;option.selected=item.status===status;select.append(option);}); // Adiciona opções.
    select.addEventListener('change',()=>{item.status=select.value;save();render();}); // Persiste atualização.
    const del=document.createElement('button');del.type='button';del.textContent='Excluir';del.setAttribute('aria-label',`Excluir ${item.title}`); // Exclusão de exemplo.
    del.addEventListener('click',()=>{tickets=tickets.filter(x=>x.id!==item.id);save();render();}); // Remove da lista.
    controls.append(select,del);row.append(info,controls);list.append(row); // Insere na tela.
  });
}
form.addEventListener('submit',event=>{ // Cria chamado fictício.
  event.preventDefault();if(!form.reportValidity())return; // Valida campos HTML.
  const data=new FormData(form); // Dados do formulário.
  const title=String(data.get('title')||'').trim(); // Texto do assunto.
  if(!title)return; // Rejeita títulos vazios.
  const id=(typeof crypto!=='undefined'&&typeof crypto.randomUUID==='function')?crypto.randomUUID():`demo-${Date.now()}-${Math.random().toString(36).slice(2)}`; // Identificador local.
  tickets.unshift({id,title,category:String(data.get('category')||'Computadores'),priority:String(data.get('priority')||'Baixa'),description:String(data.get('description')||'').slice(0,220),status:'Aberto'}); // Salva objeto simples.
  save();form.reset();filter.value='Todos';render(); // Atualiza visão geral.
});
filter.addEventListener('change',render); // Filtra sob demanda.
render(); // Inicia dashboard.
