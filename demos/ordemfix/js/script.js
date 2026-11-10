// OrdemFix: controle demonstrativo que usa apenas armazenamento local.
const STORAGE_KEY='moss_ordemfix_demo_v1'; // Chave isolada deste protótipo.
const STATUSES={aberto:'Aberto',andamento:'Em andamento',concluido:'Concluído'}; // Estados disponíveis.
const money=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v); // Valores em reais.
const $=id=>document.getElementById(id); // Atalho de seleção.
function load(){ // Carrega registros anteriores apenas deste navegador.
  try{const data=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');return Array.isArray(data)?data:[];}catch{return [];} // Proteção contra dados inválidos.
}
let orders=load(); // Estado atual da interface.
function persist(){ // Grava no navegador, sem servidor.
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(orders));}catch{alert('Não foi possível gravar neste navegador.');} // Trata armazenamento bloqueado.
}
function safeText(value){return String(value||'');} // Normaliza textos livres.
function render(){ // Atualiza lista, filtro e indicadores.
  $('count-all').textContent=String(orders.length); // Total.
  $('count-open').textContent=String(orders.filter(x=>x.status==='aberto').length); // Abertas.
  $('count-progress').textContent=String(orders.filter(x=>x.status==='andamento').length); // Em andamento.
  $('count-done').textContent=String(orders.filter(x=>x.status==='concluido').length); // Concluídas.
  const query=$('search').value.toLocaleLowerCase('pt-BR'); // Busca simplificada.
  const selected=$('status-filter').value; // Filtro atual.
  const list=$('orders');list.replaceChildren(); // Redesenha sem usar HTML não confiável.
  const visible=orders.filter(x=>(selected==='todos'||x.status===selected)&&`${x.equipamento} ${x.servico} ${x.descricao}`.toLocaleLowerCase('pt-BR').includes(query)); // Registros visíveis.
  if(!visible.length){const p=document.createElement('p');p.textContent='Nenhuma ordem encontrada. Cadastre uma OS fictícia para experimentar.';list.append(p);} // Mensagem vazia.
  visible.forEach(item=>{ // Uma linha de OS.
    const article=document.createElement('article');article.className='order'; // Contêiner.
    const top=document.createElement('div');top.className='order-top'; // Cabeçalho.
    const info=document.createElement('div'); // Área de informações.
    const h=document.createElement('h3');h.textContent=`#${item.id} • ${safeText(item.equipamento)}`; // Equipamento.
    const small=document.createElement('small');small.textContent=`${safeText(item.servico)} • ${money(item.valor)} • ${safeText(item.created)}`; // Metadados.
    const desc=document.createElement('p');desc.textContent=safeText(item.descricao)||'Sem descrição'; // Descrição.
    info.append(h,small,desc); // Cabeçalho textual.
    const badge=document.createElement('span');badge.className='badge'+(item.prioridade==='alta'?' alta':'');badge.textContent=item.prioridade==='alta'?'Prioridade alta':'Normal'; // Selo simples.
    top.append(info,badge); // Exibe rótulos.
    const controls=document.createElement('div');controls.className='order-controls'; // Ações da linha.
    const status=document.createElement('select');status.setAttribute('aria-label',`Alterar status da ordem ${item.id}`); // Seleção acessível.
    Object.entries(STATUSES).forEach(([value,label])=>{const option=document.createElement('option');option.value=value;option.textContent=label;option.selected=item.status===value;status.append(option);}); // Estados.
    status.addEventListener('change',()=>{item.status=status.value;persist();render();}); // Atualiza status.
    const share=document.createElement('button');share.type='button';share.textContent='WhatsApp ↗'; // Ação de compartilhamento.
    share.addEventListener('click',()=>{const msg=`Resumo ilustrativo OS #${item.id}: ${item.equipamento}. Serviço: ${item.servico}. Status: ${STATUSES[item.status]}. Estimativa: ${money(item.valor)}. Nenhum reparo ou prazo está confirmado.`;window.open(`https://wa.me/5511942038103?text=${encodeURIComponent(msg)}`,'_blank','noopener,noreferrer');}); // Abre WhatsApp sem enviar automaticamente.
    const remove=document.createElement('button');remove.type='button';remove.textContent='Excluir';remove.className='danger'; // Ação destrutiva.
    remove.addEventListener('click',()=>{if(confirm(`Excluir a OS fictícia #${item.id}?`)){orders=orders.filter(x=>x.id!==item.id);persist();render();}}); // Confirma antes de remover.
    controls.append(status,share,remove);article.append(top,controls);list.append(article); // Renderiza a linha.
  });
}
$('os-form').addEventListener('submit',event=>{ // Criação de OS local.
  event.preventDefault();const data=new FormData(event.currentTarget); // Lê campos.
  const equipamento=safeText(data.get('equipamento')).trim();const servico=safeText(data.get('servico'));const valor=Number(data.get('valor')); // Dados.
  if(!equipamento||!servico||!Number.isFinite(valor)||valor<0||valor>999999){alert('Verifique os dados da ordem.');return;} // Validação.
  const id=String(Date.now()).slice(-8); // Identificador local de demonstração.
  orders.unshift({id,equipamento,servico,valor,descricao:safeText(data.get('descricao')).trim(),prioridade:safeText(data.get('prioridade')),status:'aberto',created:new Date().toLocaleDateString('pt-BR')}); // Registro fictício.
  persist();event.currentTarget.reset();render();location.hash='#lista'; // Atualiza a lista.
});
$('search').addEventListener('input',render);$('status-filter').addEventListener('change',render); // Busca e filtragem.
function csvCell(value){ // Protege CSV contra quebra de colunas e fórmulas em planilhas.
  let s=safeText(value); if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"'; // Escapa caracteres perigosos.
}
$('export').addEventListener('click',()=>{ // Exportação local de dados fictícios.
  const header=['ID','Equipamento','Serviço','Descrição','Prioridade','Status','Valor','Data']; // Colunas.
  const rows=orders.map(x=>[x.id,x.equipamento,x.servico,x.descricao,x.prioridade,STATUSES[x.status],x.valor,x.created]); // Linhas.
  const csv='\uFEFF'+[header,...rows].map(row=>row.map(csvCell).join(';')).join('\r\n'); // CSV legível no Excel.
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob); // Arquivo temporário.
  const a=document.createElement('a');a.href=url;a.download='ordemfix-demonstracao.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000); // Dispara download.
});
render(); // Estado inicial.
