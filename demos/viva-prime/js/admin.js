/* Gestão demonstrativa: LocalStorage não oferece autenticação nem segurança de produção. */
'use strict'; // Impede globais acidentais no painel.
(() => {
  const A=window.VP;const {D,$,$$,el,button,money,read,write,notify,confirmAction}=A; // Núcleo compartilhado com a vitrine.
  const form=$('#property-editor');let editing=null;let gallery=[]; // Rascunho em memória até salvar explicitamente.
  const flags=['pool','bbq','furnished','beach','gated','seaview','featured','luxury','mcmv','launch','rural']; // Conjunto controlado de campos booleanos.
  const numbers=['price','area','land','beds','suites','baths','parking','condo','iptu','guests']; // Valores numéricos conferidos antes de persistir.
  const labels={demo:'Visível como DEMO',rascunho:'Rascunho local',oculto:'Oculto localmente'}; // Não existe estado de disponibilidade confirmada.
  $$('[data-admin-tab]').forEach(control=>control.addEventListener('click',()=>{$$('[data-admin-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b===control)));['properties','leads','brokers'].forEach(key=>$(`#admin-${key}`).hidden=control.dataset.adminTab!==key);})); // Navegação de seções sem falsa autenticação.
  [...new Set(D.listings.map(p=>p.cover))].forEach(id=>{const option=el('option',`Referência de banco ${id} — não é foto do imóvel`);option.value=id;$('#admin-cover').append(option);}); // Seleção restrita ao acervo local com fontes registradas.
  function renderGallery(){ $('#admin-gallery').replaceChildren(...gallery.map((slot,index)=>{const row=el('li');row.append(el('span',`${index+1}. ${slot.room} — foto real a incluir`));[-1,1].forEach(direction=>{const move=button(direction===-1?'↑':'↓',()=>{const target=index+direction;[gallery[index],gallery[target]]=[gallery[target],gallery[index]];renderGallery();},'');move.disabled=index+direction<0||index+direction>=gallery.length;move.setAttribute('aria-label',`${direction===-1?'Subir':'Descer'} espaço ${slot.room}`);row.append(move);});return row;})); } // Organiza espaços sem fabricar imagens da mesma propriedade.
  function renderList(){
    const records=A.allListings(); // Somente cadastros deste navegador.
    $('#admin-count').textContent=`${records.length} cadastros fictícios neste navegador`; // Contagem com anúncio acessível.
    $('#admin-list').replaceChildren(...records.map(property=>{
      const row=el('article',undefined,'admin-row'); // Linha independente e responsiva.
      const copy=el('div'); // Nome e resumo do cadastro.
      copy.append(el('h3',property.name),el('p',`${property.id} · ${property.city} · ${money(property.price)} · ${labels[property.status]}`)); // Valores tratados como texto.
      const actions=el('div'); // Controles sem submit acidental.
      actions.append(button('EDITAR',()=>edit(property),'')); // Carrega o rascunho no formulário.
      actions.append(button('EXCLUIR',()=>confirmAction(`Excluir o cadastro fictício ${property.id} somente deste navegador? Você pode restaurar o catálogo de exemplo depois.`,()=>{
        write('listings',A.allListings().filter(p=>p.id!==property.id)); // Remove somente o registro selecionado.
        if(editing?.id===property.id)newRecord(); // Não mantém no editor um cadastro excluído.
        renderList(); // Atualiza a lista sem alterar outros dados.
      }),'danger')); // A exclusão exige confirmação explícita.
      row.append(copy,actions); // Monta a linha com conteúdo seguro.
      return row; // Entrega a linha para a lista.
    })); // Não usa HTML de dados editáveis.
  }
  function edit(property){editing=property;form.reset();['id','name','type','purpose','city','district','condition','cover','status','description','rules'].forEach(key=>form.elements[key].value=property[key]??'');numbers.forEach(key=>form.elements[key].value=property[key]);flags.forEach(key=>form.elements[key].checked=property[key]===true);form.elements.pets.value=property.pets===true?'yes':property.pets===false?'no':'unknown';form.elements.features.value=property.features.join('\n');form.elements.infrastructure.value=property.infrastructure.join('\n');gallery=property.gallery.map(slot=>({...slot}));$('#editor-title').textContent=`Editar ${property.id}.`;$('#admin-error').textContent='';renderGallery();form.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});form.elements.name.focus({preventScroll:true});} // Edição não grava antes do submit.
  function newRecord(){editing=null;form.reset();form.elements.id.value='';form.elements.status.value='rascunho';form.elements.cover.value=D.listings[0].cover;gallery=D.listings[0].gallery.map(slot=>({...slot}));$('#editor-title').textContent='Novo conceito de imóvel.';$('#admin-error').textContent='';renderGallery();} // Novo anúncio começa como rascunho, não como oferta real.
  form.addEventListener('submit',event=>{event.preventDefault();const values=form.elements;const record={...(editing||D.listings[0]),id:editing?.id||`VP-LOCAL-${Date.now()}`}; // Identificador local sem dados pessoais.
    ['name','type','purpose','city','district','condition','status','description','rules'].forEach(key=>record[key]=values[key].value.trim());numbers.forEach(key=>record[key]=Number(values[key].value));flags.forEach(key=>record[key]=values[key].checked);record.pets=values.pets.value==='unknown'?null:values.pets.value==='yes';record.cover=Number(values.cover.value);record.features=values.features.value.split('\n').map(v=>v.trim()).filter(Boolean);record.infrastructure=values.infrastructure.value.split('\n').map(v=>v.trim()).filter(Boolean);record.gallery=gallery.map((slot,index)=>({...slot,id:index+1}));record.date=A.today();record.availability='Não verificada. Cadastro local fictício; nenhum imóvel ou data realmente disponível.'; // Campos explicitamente demonstrativos.
    const error=record.name.length<3||!record.city||!record.district?'Preencha nome, cidade e região fictícios.':record.description.length<10?'Inclua uma descrição fictícia com ao menos dez caracteres.':record.suites>record.beds?'A quantidade de suítes não pode superar a de quartos.':!numbers.every(key=>Number.isFinite(record[key])&&record[key]>=0)?'Revise os valores numéricos.':record.price<=0||record.area<=0?'Preço e área devem ser maiores que zero.':'';$('#admin-error').textContent=error;if(error)return; // Não persiste campos incoerentes.
    const clean=A.sanitizeListing(record);const records=A.allListings().filter(p=>p.id!==record.id);records.push(clean);write('listings',records);editing=clean;form.elements.id.value=clean.id;$('#editor-title').textContent=`Editar ${clean.id}.`;renderList();notify('Cadastro fictício salvo apenas neste navegador. Nada foi publicado na internet.'); // Sucesso local, não publicação de produção.
  }); // Os dados sobrevivem ao recarregamento somente neste armazenamento local.
  $('#admin-new').addEventListener('click',()=>{newRecord();form.scrollIntoView({block:'start'});form.elements.name.focus({preventScroll:true});}); // Preparação explícita de um novo rascunho.
  $('#admin-reset').addEventListener('click',()=>confirmAction('Restaurar os 12 cadastros originais desta demo? Isso remove apenas as edições locais do catálogo VIVA Prime, sem afetar favoritos, corretores ou outros sites.',()=>{A.removeStored('listings');newRecord();renderList();notify('Catálogo original restaurado. Outros dados foram preservados.');})); // Nunca usa limpeza global do navegador.
  const brokerForm=$('#broker-editor');let brokers=read('brokers',D.brokers);if(!Array.isArray(brokers)||!brokers.length)brokers=D.brokers.map(b=>({...b})); // Estado local da equipe demonstrativa.
  brokers.forEach((broker,index)=>{const option=el('option',String(broker.name));option.value=index;$('#broker-selector').append(option);}); // Seletor usa índice, não HTML interpolado.
  function loadBroker(){const broker=brokers[Number(brokerForm.elements.broker.value)];['name','specialty','region','creci','whatsapp'].forEach(key=>brokerForm.elements[key].value=typeof broker[key]==='string'?broker[key]:'');} // Campos profissionais vazios por padrão.
  $('#broker-selector').addEventListener('change',loadBroker);brokerForm.addEventListener('submit',event=>{event.preventDefault();const index=Number(brokerForm.elements.broker.value);const record={...brokers[index]};['name','specialty','region','creci','whatsapp'].forEach(key=>record[key]=brokerForm.elements[key].value.trim());brokers[index]=record;write('brokers',brokers);$('#broker-selector').options[index].textContent=record.name;notify('Perfil de exemplo salvo localmente. Registro e contato não foram verificados.');}); // Não apresenta o campo CRECI como credencial autenticada.
  newRecord();renderList();loadBroker(); // Inicialização sem exigir senha fictícia ou fingir proteção real.
})();
