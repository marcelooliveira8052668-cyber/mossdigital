
/* Eu mantenho toda a interação local, sem bibliotecas, rastreadores ou envio silencioso. */
(function () {
  'use strict';
  const config = window.DEMO_CONFIG;
  const items = config.items;
  const byId = new Map(items.map(item => [item.id, item]));
  const selected = new Map();
  const $ = id => document.getElementById(id);
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const currency = value => value.toLocaleString('pt-BR', {style:'currency',currency:'BRL'});
  const originalLabels = new Map();
  const status = $('status');
  let statusTimer;
  let estimate = null;
  let booking = null;
  /* Eu anuncio as ações com texto seguro e sem mover o foco da pessoa. */
  function notify(message) {
    clearTimeout(statusTimer);
    status.textContent = message;
    statusTimer = setTimeout(() => { status.textContent = ''; }, 5000);
  }
  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }
  function button(text, label, action) {
    const element = node('button', text, 'remove');
    element.type = 'button';
    element.setAttribute('aria-label', label);
    element.addEventListener('click', action);
    return element;
  }
  function total() {
    return [...selected].reduce((sum,[id,qty]) => sum + (byId.get(id).price || 0)*qty, 0);
  }
  function hours() {
    return [...selected.keys()].reduce((sum,id) => sum+(byId.get(id).duration || 0),0);
  }
  /* Eu mantenho os botões do catálogo coerentes com a seleção e com o estoque fictício. */
  function syncButtons() {
    document.querySelectorAll('[data-add]').forEach(btn => {
      const item = byId.get(btn.dataset.add);
      if (!originalLabels.has(item.id)) originalLabels.set(item.id,btn.textContent);
      if (config.type === 'market') {
        btn.disabled = (selected.get(item.id)||0) >= item.stock;
        btn.textContent = btn.disabled ? 'Limite do estoque de exemplo' : originalLabels.get(item.id);
      } else if (config.type !== 'cowork') {
        const active = selected.has(item.id);
        btn.setAttribute('aria-pressed', String(active));
        btn.textContent = active ? 'No plano ✓ · remover' : originalLabels.get(item.id);
      }
    });
  }
  function renderSelection() {
    const list = $('selected-list');
    if (!list) return;
    list.replaceChildren();
    selected.forEach((qty,id) => {
      const item=byId.get(id);
      const li=node('li');
      const text=node('div');
      text.appendChild(node('strong',item.name));
      const detail=config.type==='market' ? currency(item.price)+' / '+item.unit : (item.hours || item.region);
      text.appendChild(node('small',detail));
      li.appendChild(text);
      if(config.type==='market') {
        const controls=node('div',undefined,'qty');
        controls.appendChild(button('−','Reduzir quantidade de '+item.name,()=>changeQuantity(id,-1)));
        controls.appendChild(node('span',String(qty)));
        const plus=button('+','Aumentar quantidade de '+item.name,()=>changeQuantity(id,1));
        plus.disabled=qty>=item.stock;
        controls.appendChild(plus);
        li.appendChild(controls);
      } else {
        li.appendChild(button('Remover','Remover '+item.name,()=>{selected.delete(id);renderSelection();notify('Item removido do plano.');}));
      }
      list.appendChild(li);
    });
    $('selection-empty').hidden=selected.size>0;
    if(config.type==='volunteer') {
      $('time-total').replaceChildren(node('p','Dedicação semanal ilustrativa:'));
      $('time-total').appendChild(node('strong',hours()+' h/semana'));
    }
    if(config.type==='market') {
      const sum=total();
      $('cart-total').textContent=currency(sum);
      $('minimum-note').textContent=sum>=30 ? 'Mínimo ilustrativo atingido. Estoque, preço final e retirada dependem de confirmação.' : 'Faltam '+currency(30-sum)+' para o pedido mínimo ilustrativo. Sem cobrança neste site.';
      $('order-market').disabled=sum<30;
    }
    syncButtons();
    /* Eu devolvo o foco a um controle persistente quando uma linha é removida. */
    if(document.activeElement===document.body) $('copy-plan').focus({preventScroll:true});
  }
  function changeQuantity(id, delta) {
    const item=byId.get(id);
    const next=(selected.get(id)||0)+delta;
    if(next>item.stock) {notify('Limite do estoque ilustrativo atingido.');return;}
    if(next<=0) selected.delete(id); else selected.set(id,next);
    renderSelection();
    notify(next<=0?'Produto removido da cesta.':'Quantidade atualizada: '+item.name+'.');
  }
  document.querySelectorAll('[data-add]').forEach(btn=>btn.addEventListener('click',()=>{
    const id=btn.dataset.add;
    if(config.type==='cowork') {
      $('space').value=id;
      invalidateBooking();
      $('planejar').scrollIntoView({behavior:'smooth',block:'start'});
      $('space').focus({preventScroll:true});
      notify('Ambiente selecionado. Escolha data e duração para simular.');
    } else if(config.type==='market') {
      changeQuantity(id,1);
    } else {
      if(selected.has(id)){selected.delete(id);notify('Item removido.');}
      else {selected.set(id,1);notify('Incluído no plano. Consulte sua seleção na seção de planejamento.');}
      renderSelection();
    }
  }));
  /* Eu filtro conteúdo já presente no HTML, preservando leitura sem JavaScript. */
  const filters=$('filters');
  function filter() {
    const term=normalize($('search').value.trim());
    const category=$('category').value;
    const region=$('region')?.value || '';
    const feature=$('feature')?.value || '';
    let count=0;
    document.querySelectorAll('#catalog .card').forEach(card=>{
      const item=byId.get(card.dataset.id);
      const categoryMatch=!category || item.category===category || (item.materials||[]).includes(category);
      const haystack=normalize([item.name,item.description,item.region,item.organization||'',...(item.materials||[]),...(item.features||[])].join(' '));
      const match=haystack.includes(term)&&categoryMatch&&(!region||item.region===region)&&(!feature||(item.features||[]).includes(feature));
      card.hidden=!match;
      if(match)count++;
    });
    $('filter-result').textContent=count+' resultado(s) de demonstração';
    $('empty-results').hidden=count>0;
  }
  filters.addEventListener('input',filter);
  filters.addEventListener('change',filter);
  filters.addEventListener('submit',event=>event.preventDefault());
  filters.addEventListener('reset',()=>setTimeout(filter,0));
  $('reset-empty').addEventListener('click',()=>{filters.reset();setTimeout(()=>{$('search').focus();filter();},0);});
  /* Eu simulo descarte apenas com peso informado, sem inventar impactos ambientais. */
  if(config.type==='recycle') {
    const form=$('recycle-form');
    form.addEventListener('input',()=>{estimate=null;$('estimate').replaceChildren(node('p','Valores alterados. Clique em organizar descarte para atualizar o plano.'));});
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(!form.reportValidity())return;
      const material=$('material').value;
      const weight=Number($('weight').value);
      if(!Number.isFinite(weight)||weight<0.1||weight>1000)return;
      const matches=items.filter(item=>item.materials.includes(material));
      estimate={material,weight};
      $('estimate').replaceChildren(node('strong',weight.toLocaleString('pt-BR')+' kg de '+material.toLowerCase()),node('p',matches.length+' ponto(s) ilustrativo(s) aceitam este material. Peso estimado, sem medição ou garantia de recebimento.'),node('p','Separe os materiais e confirme as condições com o operador real. Resíduos perigosos não fazem parte desta simulação.'));
      $('category').value=material;
      $('region').value='';$('search').value='';filter();
    });
  }
  /* Eu valido a estimativa de coworking sem criar falsa disponibilidade. */
  function localDate(date) {
    return date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
  }
  function invalidateBooking() {
    booking=null;
    if(!$('booking-result'))return;
    $('booking-result').replaceChildren(node('p','Seleção alterada. Calcule novamente para gerar uma estimativa atualizada.'));
    $('booking-error').textContent='';
    $('download-ics').disabled=true;
  }
  if(config.type==='cowork') {
    const today=new Date();
    const limit=new Date(today.getFullYear(),today.getMonth(),today.getDate()+180);
    $('booking-date').min=localDate(today);
    $('booking-date').max=localDate(limit);
    const form=$('booking-form');
    form.addEventListener('input',invalidateBooking);
    form.addEventListener('change',invalidateBooking);
    form.addEventListener('submit',event=>{
      event.preventDefault();
      invalidateBooking();
      if(!form.reportValidity())return;
      const item=byId.get($('space').value);
      const date=$('booking-date').value;
      const start=Number($('booking-time').value);
      const duration=Number($('duration').value);
      const people=Number($('people').value);
      const day=new Date(date+'T12:00:00');
      let error='';
      if(!date||date<localDate(new Date())||date>localDate(limit)||Number.isNaN(day.getTime())) error='Escolha uma data de hoje até os próximos 180 dias.';
      else if(day.getDay()===0) error='O espaço de exemplo não funciona aos domingos. Escolha de segunda a sábado.';
      else if(!Number.isInteger(people)||people<1||people>item.capacity) error='Este espaço comporta até '+item.capacity+' pessoa(s). Ajuste o grupo ou escolha outro ambiente.';
      else if(!Number.isInteger(duration)||duration<1||duration>8||start<8||start+duration>19)error='A combinação precisa terminar até as 19h. Ajuste horário ou duração.';
      if(error){$('booking-error').textContent=error;return;}
      booking={id:item.id,date,start,duration,people,total:item.price*duration};
      const displayDate=day.toLocaleDateString('pt-BR');
      $('booking-result').replaceChildren(node('strong',currency(booking.total)),node('p',item.name+' · '+displayDate+' · '+String(start).padStart(2,'0')+':00 às '+String(start+duration).padStart(2,'0')+':00 · '+people+' pessoa(s).'),node('p','Estimativa: '+currency(item.price)+'/hora × '+duration+' hora(s). Disponibilidade não consultada. Reserva não confirmada.'));
      $('download-ics').disabled=false;
    });
  }
  /* Eu produzo um resumo com aviso visível para que ele não pareça comprovante. */
  function summary() {
    const lines=[config.brand+' — PLANO DE DEMONSTRAÇÃO','Dados fictícios. Sem pedido, reserva, inscrição ou atendimento confirmado.',''];
    if(estimate)lines.push('Descarte estimado: '+estimate.weight+' kg de '+estimate.material+'.');
    selected.forEach((qty,id)=>{
      const item=byId.get(id);
      let value=item.name+' — '+item.region;
      if(config.type==='market')value=qty+' × '+item.name+' ('+item.unit+') — '+currency(item.price*qty);
      if(config.type==='volunteer')value+=' — '+item.hours;
      if(config.type==='access')value+=' — recursos ilustrativos: '+item.features.join(', ')+'. Recursos não auditados.';
      lines.push(value);
    });
    if(config.type==='volunteer')lines.push('Dedicação estimada: '+hours()+' h/semana.');
    if(config.type==='market')lines.push('Total ilustrativo: '+currency(total())+'. Sem frete ou cobrança.','Retirada pretendida: '+$('pickup').value,'Substituição: '+$('substitution').value,'Estoque e retirada precisam de confirmação. Não visite o endereço fictício.');
    if(config.type==='cowork') {
      if(booking){const item=byId.get(booking.id);lines.push(item.name+' — '+booking.date+' — início '+booking.start+'h — '+booking.duration+' hora(s) — '+booking.people+' pessoa(s).','Total estimado: '+currency(booking.total)+'. Sem consulta a calendário.');}
      else lines.push('Nenhuma estimativa válida calculada.');
    }
    if(!selected.size&&!estimate&&!booking)lines.push('Nenhum item selecionado.');
    lines.push('','Confirme todas as condições com a organização real.','Modelo criado pela MOSS Digital — https://mossdigital.com.br/');
    return lines.join('\n');
  }
  function download(text,name,type) {
    const url=URL.createObjectURL(new Blob([text],{type}));
    const link=node('a');link.href=url;link.download=name;
    document.body.appendChild(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  $('download-plan').addEventListener('click',()=>{download(summary(),config.id+'-plano.txt','text/plain;charset=utf-8');notify('Resumo de demonstração preparado para download.');});
  $('copy-plan').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(summary());notify('Resumo copiado. Nenhum dado foi enviado.');}
    catch(error){download(summary(),config.id+'-plano.txt','text/plain;charset=utf-8');notify('Cópia não permitida pelo navegador. Baixamos um arquivo de texto como alternativa.');}
  });
  $('print-plan').addEventListener('click',()=>window.print());
  $('clear-plan').addEventListener('click',()=>{
    selected.clear();estimate=null;
    if(config.type==='cowork'){$('booking-form').reset();invalidateBooking();}
    if(config.type==='recycle'){$('recycle-form').reset();$('estimate').replaceChildren(node('p','Plano limpo. Informe material e peso para recomeçar.'));}
    renderSelection();notify('Plano limpo. Nenhum dado ficou armazenado.');
  });
  /* Eu identifico o destinatário real e mantenho o envio sob controle da pessoa. */
  function openWhatsApp(message) {
    window.open('https://wa.me/5511942038103?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
  }
  if(config.type==='market')$('order-market').addEventListener('click',()=>{
    if(total()<30){notify('Adicione itens até o mínimo ilustrativo de R$ 30.');return;}
    openWhatsApp('Olá, MOSS Digital! Estou testando a demo Raiz Feira. Não é um pedido real.\n\n'+summary());
  });
  if(config.type==='cowork')$('download-ics').addEventListener('click',()=>{
    if(!booking)return;
    const pad=value=>String(value).padStart(2,'0');
    const date=booking.date.replace(/-/g,'');
    const start=date+'T'+pad(booking.start)+'0000';
    const end=date+'T'+pad(booking.start+booking.duration)+'0000';
    const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
    const uid='demo-'+Date.now()+'-'+Math.random().toString(36).slice(2)+'@mossdigital.com.br';
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//MOSS Digital//Demo Ponto Comum//PT-BR','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:'+uid,'DTSTAMP:'+stamp,'DTSTART:'+start,'DTEND:'+end,'SUMMARY:Lembrete de DEMO - reserva NAO confirmada','DESCRIPTION:Simulacao ficticia. Sem confirmacao ou consulta a agenda. Horario local do calendario.','STATUS:TENTATIVE','TRANSP:TRANSPARENT','END:VEVENT','END:VCALENDAR'];
    download(lines.join('\r\n')+'\r\n','ponto-comum-lembrete-provisorio.ics','text/calendar;charset=utf-8');
    notify('Lembrete provisório preparado. Isso não confirma reserva.');
  });
  $('contact-form').addEventListener('submit',event=>{
    event.preventDefault();
    const form=event.currentTarget;
    if(!form.reportValidity())return;
    const name=$('contact-name').value.trim();
    const message=$('contact-message').value.trim();
    if(!name||!message){notify('Preencha nome e mensagem com texto, não apenas espaços.');return;}
    openWhatsApp('Olá, MOSS Digital! Meu nome é '+name+'. Conheci a demonstração '+config.brand+'.\n\n'+message);
    notify('WhatsApp aberto para revisão. A mensagem só será enviada se você confirmar lá.');
  });
  /* Eu mantenho o menu móvel operável e o ano atualizado. */
  const menuToggle=$('menu-toggle');
  const navigation=$('navigation');
  function closeMenu(){navigation.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}
  menuToggle.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
  navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuToggle.focus();}});
  $('year').textContent=new Date().getFullYear();
  syncButtons();
  filter();
})();
