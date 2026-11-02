/* Eu mantenho os rascunhos nesta aba, sem banco de currículos ou envio automático. */
(function(){
  'use strict';
  const services=window.ENTRELARES_SERVICES;
  const $=id=>document.getElementById(id);
  const states={h:{step:1},c:{step:1}};
  let timer,resetTarget=null,resetFocus=null;
  const normalize=text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function notify(message){clearTimeout(timer);$('status').textContent=message;timer=setTimeout(()=>$('status').textContent='',6500);}
  function fieldset(prefix,step){return $(`${prefix}-form`).querySelector(`[data-step="${step}"]`);}
  function values(prefix){return Object.fromEntries(new FormData($(`${prefix}-form`)));}
  function serviceName(id){return services.find(s=>s.id===id)?.name||'Não informado';}
  function populateHiring(preferred=''){
    const sector=$('h-sector').value,select=$('h-service');
    const keep=preferred||select.value;
    select.replaceChildren(new Option(sector?'Selecione uma área':'Escolha primeiro o ambiente',''));
    services.filter(s=>s.sector===sector).forEach(s=>select.add(new Option(s.name,s.id)));
    select.value=services.some(s=>s.id===keep&&s.sector===sector)?keep:'';
  }
  function employmentNotice(){
    $('h-employment').hidden=!($('h-sector').value==='Residências'&&$('h-frequency').value==='3 ou mais dias por semana');
  }
  function clearError(prefix){$(`${prefix}-error`).textContent='';$(`${prefix}-form`).querySelectorAll('[aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));}
  /* Eu verifico só a etapa relevante, com rótulo e foco no primeiro campo inválido. */
  function invalidStep(prefix,step){
    const scope=fieldset(prefix,step),fields=[...scope.querySelectorAll('input,select,textarea')];
    fields.forEach(el=>el.setCustomValidity(''));
    fields.forEach(el=>{
      if(['name','city'].includes(el.name)&&el.value.trim().length<2)el.setCustomValidity('Use pelo menos dois caracteres, não apenas espaços.');
      if(el.maxLength>0&&el.value.length>el.maxLength)el.setCustomValidity('O texto ultrapassou o limite deste campo.');
    });
    const data=values(prefix);
    if(step===1){
      const service=services.find(s=>s.id===data.service);
      if(!service)$(`${prefix}-service`).setCustomValidity('Escolha uma área válida.');
      else if(data.sector&&data.sector!=='Ambos'&&data.sector!==service.sector)$(`${prefix}-sector`).setCustomValidity('Esta área pertence a '+service.sector+'. Revise o ambiente ou a área selecionada.');
    }
    return fields.find(el=>!el.checkValidity());
  }
  function announceInvalid(prefix,step,el){
    showStep(prefix,step,false);el.setAttribute('aria-invalid','true');
    const label=el.labels?.[0]?.textContent.trim()||'Campo';
    $(`${prefix}-error`).textContent='Revise '+label+': '+el.validationMessage;
    el.focus();
  }
  function validate(prefix,includeAck=false){
    for(const step of includeAck?[1,2,3]:[1,2]){const invalid=invalidStep(prefix,step);if(invalid){announceInvalid(prefix,step,invalid);return false;}}
    return true;
  }
  function summaryRows(prefix){
    const data=values(prefix);
    const rows=[['Caminho',prefix==='h'?'Preciso contratar · briefing de exemplo':'Quero trabalhar · apresentação de exemplo'],['Identificação fictícia',(data.name||'').trim()||'Não informada'],['Área profissional',serviceName(data.service)],['Ambiente',data.sector||'Não informado'],['Cidade / região',(data.city||'').trim()||'Não informada']];
    if(prefix==='h')rows.push(['Frequência pretendida',data.frequency||'Não informada'],['Período',data.period||'Não informado'],['Tarefas / qualificações',(data.details||'').trim()||'A combinar']);
    else rows.push(['Experiência',data.experience||'Não informada'],['Período de interesse',data.period||'Não informado'],['Quando conversar',data.availability||'A combinar'],['Habilidades profissionais',(data.details||'').trim()||'Não informadas']);
    rows.push(['Modelo proposto','A agência conduz recrutamento e seleção. O cliente contrata diretamente o profissional.'],['Limites','Sem seleção executada, vaga, inscrição, contrato, verificação ou garantia de contratação.']);
    return rows;
  }
  function summaryText(prefix){
    return ['ENTRELARES — RESUMO DE DEMONSTRAÇÃO','MARCA FICTÍCIA DA MOSS DIGITAL','Não é cadastro, contrato, pedido enviado ou garantia de vaga.','',...summaryRows(prefix).map(([name,value])=>name+': '+value),'','Contato real desta demo: MOSS Digital — https://mossdigital.com.br/','Não envie documentos, dados de referências ou dados sensíveis.'].join('\n');
  }
  /* Eu insiro as respostas como texto, nunca como HTML executável. */
  function renderSummary(prefix){
    const box=$(`${prefix}-summary`),dl=document.createElement('dl');
    summaryRows(prefix).forEach(([name,value])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=name;dd.textContent=value;dl.append(dt,dd);});
    box.replaceChildren(dl);
  }
  function showStep(prefix,step,focus=true){
    states[prefix].step=step;
    const form=$(`${prefix}-form`);
    form.querySelectorAll('[data-step]').forEach(el=>el.hidden=Number(el.dataset.step)!==step);
    form.querySelectorAll('.progress li').forEach((el,i)=>{if(i+1===step)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');el.classList.toggle('done',i+1<step);});
    form.querySelector('[data-action="back"]').hidden=step===1;
    form.querySelector('[data-action="next"]').hidden=step===3;
    form.querySelector('[data-action="contact"]').hidden=step!==3;
    clearError(prefix);
    if(step===3)renderSummary(prefix);
    if(focus){form.scrollIntoView({block:'start',behavior:'instant'});fieldset(prefix,step).querySelector('legend').focus({preventScroll:true});}
  }
  function next(prefix){
    const step=states[prefix].step,invalid=invalidStep(prefix,step);
    if(invalid){announceInvalid(prefix,step,invalid);return;}
    if(step<3)showStep(prefix,step+1);
    else notify('Revise o resumo e use o botão identificado para preparar a conversa com a MOSS.');
  }
  function download(text,name){
    const url=URL.createObjectURL(new Blob(['\uFEFF'+text],{type:'text/plain;charset=utf-8'}));
    const anchor=document.createElement('a');anchor.href=url;anchor.download=name;document.body.appendChild(anchor);anchor.click();anchor.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function example(prefix){
    const set=(name,value)=>{const el=$(`${prefix}-${name}`);el.value=value;el.setCustomValidity('');};
    if(prefix==='h'){
      set('sector','Residências');populateHiring('diarista');set('frequency','3 ou mais dias por semana');set('period','Integral');set('name','Cliente exemplo');set('city','Cidade exemplo, região central');set('details','Demonstração: limpeza geral da casa (banheiros, sala e cozinha) em três dias por semana. Condições serão avaliadas pela agência real.');employmentNotice();
    }else{
      set('service','cozinha');set('sector','Residências');set('experience','Mais de 2 anos de experiência');set('period','Manhã');set('availability','A combinar');set('name','Profissional exemplo');set('city','Cidade exemplo, região norte');set('details','Demonstração: preparo de refeições e organização de cozinha. Sem dados ou referências reais.');$('c-adult').checked=true;
    }
    $(`${prefix}-ack`).checked=false;showStep(prefix,1);notify('Preenchemos um exemplo fictício. Revise as etapas antes de continuar.');
  }
  function reset(prefix){
    const form=$(`${prefix}-form`);form.reset();form.querySelectorAll('input,select,textarea').forEach(el=>el.setCustomValidity(''));
    if(prefix==='h'){populateHiring();employmentNotice();}
    showStep(prefix,1);notify('Este formulário foi limpo. O outro caminho não foi alterado.');
  }
  async function action(name,prefix){
    if(name==='next')next(prefix);
    else if(name==='back')showStep(prefix,Math.max(1,states[prefix].step-1));
    else if(name==='example')example(prefix);
    else if(name==='reset'){resetTarget=prefix;resetFocus=document.activeElement;$('reset-dialog').showModal();}
    else if(name==='download'||name==='copy'||name==='print'){
      if(!validate(prefix))return;
      const text=summaryText(prefix);
      if(name==='download'){download(text,'entrelares-'+(prefix==='h'?'necessidade':'apresentacao')+'-demo.txt');notify('Resumo preparado para download. Nenhum dado foi enviado.');}
      else if(name==='print'){$('print-area').textContent=text;window.print();}
      else {
        try{await navigator.clipboard.writeText(text);notify('Resumo copiado. Ele não foi enviado à MOSS nem a uma agência.');}
        catch(error){download(text,'entrelares-resumo-demo.txt');notify('O navegador não permitiu copiar. Preparamos um TXT como alternativa.');}
      }
    }else if(name==='contact'){
      if(!validate(prefix,true))return;
      const message='Olá, MOSS Digital! Estou testando o modelo EntreLares. Não é uma candidatura nem solicitação real de profissional.\n\n'+summaryText(prefix);
      window.open('https://wa.me/5511942038103?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
      notify('Mensagem preparada. Revise e confirme o envio no WhatsApp. Se não abriu, copie o resumo.');
    }
  }
  document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>action(button.dataset.action,button.dataset.wizard)));
  for(const prefix of ['h','c']){
    const form=$(`${prefix}-form`);
    form.addEventListener('submit',event=>{event.preventDefault();next(prefix);});
    form.addEventListener('input',event=>{
      const el=event.target;el.setCustomValidity?.('');el.removeAttribute('aria-invalid');$(`${prefix}-error`).textContent='';
      if(el.id!==`${prefix}-ack`)$(`${prefix}-ack`).checked=false;
      if(states[prefix].step===3)renderSummary(prefix);
    });
    form.addEventListener('change',event=>{
      if(event.target.id==='h-sector')populateHiring();
      if(prefix==='h')employmentNotice();
      if(event.target.id==='c-service'&&!$('c-sector').value){const service=services.find(s=>s.id===$('c-service').value);if(service)$('c-sector').value=service.sector;}
    });
    showStep(prefix,1,false);
  }
  document.querySelectorAll('[data-select]').forEach(button=>button.addEventListener('click',()=>{
    const service=services.find(s=>s.id===button.dataset.select);if(!service)return;
    $('h-sector').value=service.sector;populateHiring(service.id);$('h-ack').checked=false;employmentNotice();showStep('h',1);
    notify(service.name+' selecionada para descrever a necessidade.');
  }));
  const filters=$('service-filters');
  function filter(){
    const term=normalize($('service-search').value.trim()),sector=$('service-sector').value;let count=0;
    document.querySelectorAll('#services [data-service]').forEach(card=>{
      const service=services.find(s=>s.id===card.dataset.service);
      const match=(!sector||service.sector===sector)&&normalize([service.name,service.description,...service.skills].join(' ')).includes(term);
      card.hidden=!match;if(match)count++;
    });
    $('service-count').textContent=count+' área(s) de seleção demonstrativa(s)';$('empty-services').hidden=count>0;
  }
  filters.addEventListener('input',filter);filters.addEventListener('change',filter);filters.addEventListener('submit',event=>event.preventDefault());filters.addEventListener('reset',()=>setTimeout(filter,0));
  $('reset-search').addEventListener('click',()=>{filters.reset();setTimeout(()=>{filter();$('service-search').focus();},0);});
  const dialog=$('reset-dialog');
  $('reset-cancel').addEventListener('click',()=>{dialog.close();resetFocus?.focus();});
  $('reset-confirm').addEventListener('click',()=>{const prefix=resetTarget;dialog.close();resetTarget=null;if(prefix)reset(prefix);});
  dialog.addEventListener('cancel',()=>{resetTarget=null;});
  const menu=$('navigation'),toggle=$('menu-toggle');
  function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
  toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.classList.contains('open')){closeMenu();toggle.focus();}});
  $('year').textContent=new Date().getFullYear();populateHiring();filter();
  /* Eu só habilito os formulários após instalar validação e bloqueio de envio nativo. */
  $('h-enabled').disabled=false;$('c-enabled').disabled=false;
})();
