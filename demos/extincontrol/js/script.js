// EXTINCONTROL — agenda administrativa com dados fictícios salvos apenas neste navegador.
(() => { // Início do módulo isolado.
  'use strict'; // Modo estrito.
  const KEY='moss-extincontrol-ativos-v1'; // Armazenamento local único.
  const $=selector=>document.querySelector(selector); // Atalho.
  const menu=$('#menu-toggle'); // Botão do menu móvel.
  menu?.addEventListener('click',()=>{const opened=$('#side-nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));}); // Expande o menu.
  document.querySelectorAll('img[data-photo]').forEach(img=>{const test=new Image();test.onload=()=>img.src=img.dataset.photo;test.src=img.dataset.photo;}); // Carrega fotos locais quando existirem.
  const current=new Date(); // Data local do navegador.
  $('#today-label').textContent=current.toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'}); // Exibe data de hoje.
  const parseDate=str=>{ // Lê data como meia-noite LOCAL, evitando variação de fuso ao usar ISO UTC.
    if(!/^\d{4}-\d{2}-\d{2}$/.test(str))return null; // Verifica formato.
    const [year,month,day]=str.split('-').map(Number); // Extrai partes.
    const date=new Date(year,month-1,day); // Cria data local.
    if(date.getFullYear()!==year||date.getMonth()!==month-1||date.getDate()!==day)return null; // Rejeita datas inválidas.
    return date; // Retorna data válida.
  };
  const today=new Date(current.getFullYear(),current.getMonth(),current.getDate()); // Hoje sem horas.
  const daysUntil=str=>{const date=parseDate(str);return date?Math.round((date-today)/86400000):null;}; // Diferença em dias.
  const status=str=>{const days=daysUntil(str);if(days===null)return 'invalido';if(days<0)return 'atrasado';if(days<=30)return 'proximo';return 'futuro';}; // Etiquetas administrativas sem certificação.
  const load=()=>{try{const val=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(val)?val.filter(item=>item&&typeof item.code==='string'&&typeof item.location==='string'&&parseDate(item.date)&&typeof item.id==='string').slice(0,200):[];}catch{return[];}}; // Carrega registros válidos.
  let records=load(); // Estado local.
  const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(records));}catch{alert('Armazenamento indisponível: os dados não foram persistidos.');}}; // Persiste registros fictícios.
  const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}; // Elementos seguros.
  const render=()=>{ // Redesenha indicadores e tabela.
    $('#metric-total').textContent=String(records.length); // Quantidade de registros.
    $('#metric-overdue').textContent=String(records.filter(r=>status(r.date)==='atrasado').length); // Prazos vencidos na agenda informada.
    $('#metric-soon').textContent=String(records.filter(r=>status(r.date)==='proximo').length); // Próximos 30 dias.
    $('#metric-ok').textContent=String(records.filter(r=>status(r.date)==='futuro').length); // Demais datas futuras.
    const filter=$('#filter-status').value; // Filtro atual.
    const items=records.filter(r=>filter==='todos'||status(r.date)===filter).sort((a,b)=>a.date.localeCompare(b.date)); // Seleciona e ordena por data.
    const body=$('#asset-body');body.replaceChildren(); // Elimina linhas anteriores.
    $('#empty-state').textContent=items.length?'':'Nenhum registro encontrado. Cadastre exemplos fictícios para explorar o painel.'; // Estado vazio.
    items.forEach(row=>{ // Cria linhas com textContent para impedir HTML injetado.
      const tr=make('tr');tr.append(make('td','',row.code),make('td','',row.location),make('td','',parseDate(row.date).toLocaleDateString('pt-BR'))); // Três colunas.
      const state=make('span','state',status(row.date)==='atrasado'?'Data ultrapassada':status(row.date)==='proximo'?'Até 30 dias':'Mais de 30 dias'); // Etiqueta.
      state.classList.toggle('overdue',status(row.date)==='atrasado');state.classList.toggle('soon',status(row.date)==='proximo'); // Cor da etiqueta.
      const stateCell=make('td');stateCell.append(state);tr.append(stateCell); // Coluna status.
      const action=make('button','row-delete','Excluir');action.type='button';action.setAttribute('aria-label',`Excluir registro ${row.code}`); // Botão de exclusão.
      action.addEventListener('click',()=>{records=records.filter(r=>r.id!==row.id);persist();render();}); // Remove item.
      const actionCell=make('td');actionCell.append(action);tr.append(actionCell);body.append(tr); // Insere linha.
    });
  };
  $('#asset-form').addEventListener('submit',event=>{ // Cadastra equipamento fictício.
    event.preventDefault(); // Sem servidor.
    const code=$('#asset-name').value.trim();const location=$('#asset-location').value.trim();const date=$('#asset-date').value; // Lê valores.
    if(!code||!location||!parseDate(date)){alert('Preencha um identificador, um local e uma data válidos.');return;} // Validação.
    if(records.length>=200){alert('Limite de 200 registros para esta demo.');return;} // Limite local.
    records.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),code:code.slice(0,60),location:location.slice(0,60),date}); // Novo registro.
    persist();render();event.currentTarget.reset();$('#asset-name').focus(); // Atualiza interface.
  });
  $('#filter-status').addEventListener('change',render); // Filtra a tabela.
  $('#clear-all').addEventListener('click',()=>{if(confirm('Apagar todos os registros fictícios deste navegador?')){records=[];persist();render();}}); // Limpa após confirmação.
  render(); // Estado inicial.
})(); // Finaliza.
// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
