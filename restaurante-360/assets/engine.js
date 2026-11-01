/* Eu concentro regras e cálculos em centavos inteiros; este motor não é um servidor. */
(function(root,factory){const engine=factory();if(typeof module==='object'&&module.exports)module.exports=engine;else root.RestaurantEngine=engine;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const clone=x=>JSON.parse(JSON.stringify(x));
  const stamp=()=>new Date().toISOString();
  const uid=p=>p+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9);
  const day=value=>{const d=new Date(value);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
  const money=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n/100);
  const int=(n,min,max,label)=>{n=Number(n);if(!Number.isInteger(n)||n<min||n>max)throw Error(label+': informe um número inteiro entre '+min+' e '+max+'.');return n;};
  const text=(s,max=160)=>String(s||'').trim().slice(0,max);
  function required(value,label,min=2,max=160){const out=text(value,max);if(out.length<min)throw Error(label+': preencha pelo menos '+min+' caracteres.');return out;}
  const ROLES={gerente:['dashboard','salao','producao','caixa','reservas','delivery','estoque','cardapio','relatorios','equipe','config'],garcom:['salao','reservas','cardapio'],cozinha:['producao'],bar:['producao'],caixa:['caixa','salao','delivery']};
  const PERMS={open:['gerente','garcom'],add:['gerente','garcom'],send:['gerente','garcom'],deliver:['gerente','garcom','cozinha','bar'],progress:['gerente','cozinha','bar'],void:['gerente'],cancelCheck:['gerente'],pay:['gerente','caixa'],close:['gerente','caixa'],bill:['gerente','caixa'],discount:['gerente'],reservation:['gerente','garcom'],cancelReservation:['gerente','garcom'],arrive:['gerente','garcom'],wait:['gerente','garcom'],seat:['gerente','garcom'],newDelivery:['gerente','caixa'],dispatch:['gerente','caixa'],stock:['gerente'],settings:['gerente'],cashMove:['gerente','caixa'],closeShift:['gerente','caixa'],openShift:['gerente','caixa']};
  /* Eu permito ao caixa lançar apenas pedidos externos, nunca consumo de mesa. */
  ['add','send'].forEach(action=>PERMS[action].push('caixa'));
  function seed(){
    const now=stamp();
    const state={version:1,role:'gerente',settings:{name:'Brasa & Oliva',buffetPrice:10990,rodizioAdult:9490,rodizioChild:5990,servicePercent:10},tables:Array.from({length:16},(_,i)=>({id:i+1,seats:[2,4,4,6,2,4,8,6,4,2,6,8,4,4,10,12][i],area:i<8?'Salão principal':'Varanda'})),ingredients:[
      {id:'carne',name:'Proteína bovina',unit:'g',qty:18000,min:5000,costPer1000:5800},
      {id:'arroz',name:'Arroz (referência de preparo)',unit:'g',qty:12000,min:3000,costPer1000:900},
      {id:'vegetais',name:'Vegetais variados',unit:'g',qty:16000,min:4000,costPer1000:1400},
      {id:'massa',name:'Massa fresca',unit:'g',qty:8000,min:2000,costPer1000:2200},
      {id:'peixe',name:'Peixe porcionado',unit:'g',qty:6000,min:1800,costPer1000:6500},
      {id:'sobremesa',name:'Sobremesa porcionada',unit:'un',qty:18,min:20,costPer1000:900000},
      {id:'cerveja',name:'Cerveja 600 ml',unit:'un',qty:36,min:12,costPer1000:1100000},
      {id:'agua',name:'Água mineral',unit:'un',qty:48,min:18,costPer1000:250000},
      {id:'suco',name:'Suco base',unit:'ml',qty:9000,min:3000,costPer1000:1800},
      {id:'vinho',name:'Vinho da casa',unit:'ml',qty:3000,min:1500,costPer1000:6500}
    ],products:[
      {id:'corte',name:'Corte da casa',category:'Pratos',price:8900,station:'cozinha',recipe:{carne:280,vegetais:150}},
      {id:'massa',name:'Massa do chef',category:'Pratos',price:6900,station:'cozinha',recipe:{massa:220,vegetais:100}},
      {id:'peixe',name:'Peixe na brasa',category:'Pratos',price:7900,station:'cozinha',recipe:{peixe:250,arroz:120}},
      {id:'vegetal',name:'Bowl da estação',category:'Pratos',price:4900,station:'cozinha',recipe:{arroz:150,vegetais:280}},
      {id:'entrada',name:'Vegetais na chapa',category:'Entradas',price:3200,station:'cozinha',recipe:{vegetais:250}},
      {id:'sobremesa',name:'Doce da casa',category:'Sobremesas',price:2600,station:'cozinha',recipe:{sobremesa:1}},
      {id:'agua',name:'Água mineral',category:'Bebidas',price:700,station:'bar',recipe:{agua:1}},
      {id:'suco',name:'Suco da estação',category:'Bebidas',price:1400,station:'bar',recipe:{suco:300}},
      {id:'cerveja',name:'Cerveja 600 ml',category:'Bebidas',price:2200,station:'bar',recipe:{cerveja:1}},
      {id:'vinho',name:'Taça de vinho',category:'Bebidas',price:2900,station:'bar',recipe:{vinho:150}}
    ],accounts:[],reservations:[],waitlist:[],moves:[],audit:[],shift:{id:uid('turno'),openedAt:now,opening:30000,open:true,events:[],closedAt:null,counted:null,difference:null}};
    /* Eu ofereço duas mesas de exemplo, sem representar vendas reais. */
    const a=createAccount(state,{table:4,guests:3,alias:'Mesa demonstração A'});
    a.lines=[makeLine({name:'Corte da casa',kind:'alacarte',price:8900,qty:1,station:'cozinha',recipe:{carne:280,vegetais:150},status:'preparando',stockDebited:true}),makeLine({name:'Suco da estação',kind:'alacarte',price:1400,qty:2,station:'bar',recipe:{suco:300},status:'aguardando',stockDebited:true})];
    const b=createAccount(state,{table:8,guests:4,alias:'Mesa demonstração B'});
    b.lines=[makeLine({name:'Rodízio adulto',kind:'rodizio',price:9490,qty:2,station:'cozinha',recipe:{carne:180,arroz:80,vegetais:60},status:'pronto',stockDebited:true}),makeLine({name:'Buffet · 420 g líquidos',kind:'buffet',price:4616,qty:1,station:'direto',recipe:{carne:84,arroz:168,vegetais:168},status:'entregue',stockDebited:true,grams:420})];
    state.audit.push({at:now,role:'sistema',action:'Início da demonstração',detail:'Saldos e comandas fictícios já ajustados. Nenhum atendimento real.'});
    return state;
  }
  function makeLine(data){return {id:uid('item'),at:stamp(),sentAt:stamp(),status:'rascunho',stockDebited:false,notes:'',...data};}
  function createAccount(state,p){const a={id:uid('comanda'),number:state.accounts.length+1001,table:p.table||null,guests:p.guests||1,alias:text(p.alias||'Cliente exemplo',40),channel:p.channel||'mesa',address:text(p.address,160),fee:p.fee||0,phase:'produção',openedAt:stamp(),closedAt:null,lines:[],payments:[],service:false,discount:0,discountReason:'',status:'aberta'};state.accounts.push(a);return a;}
  const live=a=>a.status==='aberta';
  function account(state,id){const a=state.accounts.find(x=>x.id===id);if(!a||!live(a))throw Error('Comanda não encontrada ou já encerrada.');return a;}
  function activeTable(state,id){return state.accounts.find(a=>live(a)&&a.table===Number(id));}
  function totals(state,a){
    const subtotal=a.lines.filter(l=>l.status!=='cancelado').reduce((n,l)=>n+l.price*l.qty,0);
    const discount=Math.round(subtotal*a.discount/100);
    const service=a.service?Math.round((subtotal-discount)*state.settings.servicePercent/100):0;
    /* Eu fixo o percentual da conta quando o primeiro recebimento é registrado. */
    const serviceFinal=a.lockedServicePercent!==undefined&&a.service?Math.round((subtotal-discount)*a.lockedServicePercent/100):service;
    const total=subtotal-discount+serviceFinal+a.fee;
    const paid=a.payments.reduce((n,p)=>n+p.amount,0);
    return {subtotal,discount,service:serviceFinal,fee:a.fee,total,paid,balance:Math.max(0,total-paid)};
  }
  function editable(a){if(a.payments.length)throw Error('Esta conta já tem recebimento parcial. Itens e condições ficam bloqueados para não alterar uma cobrança em andamento.');}
  function operational(state){if(!state.shift.open)throw Error('Abra o turno demonstrativo antes de operar.');}
  function permission(state,action){if(!(PERMS[action]||[]).includes(state.role))throw Error('Esta ação não está disponível neste perfil demonstrativo. Troque o perfil para experimentar outra função.');}
  function audit(s,action,detail){s.audit.unshift({at:stamp(),role:s.role,action,detail:text(detail,250)});s.audit=s.audit.slice(0,500);}
  function ready(a){const lines=a.lines.filter(l=>l.status!=='cancelado');return lines.length>0&&lines.every(l=>l.status==='entregue');}
  function cashExpected(s){const cash=s.accounts.flatMap(a=>a.payments).filter(p=>p.shift===s.shift.id&&p.method==='dinheiro').reduce((n,p)=>n+p.amount,0);return s.shift.opening+cash+s.shift.events.reduce((n,e)=>n+e.amount,0);}
  function lineFor(s,p){const a=account(s,p.id);const l=a.lines.find(x=>x.id===p.line);if(!l)throw Error('Item não encontrado.');return {a,l};}
  function consume(s,lines,ref){
    const required={};
    lines.forEach(l=>{if(l.stockDebited)return;Object.entries(l.recipe).forEach(([id,q])=>{required[id]=(required[id]||0)+q*l.qty;});});
    for(const [id,qty] of Object.entries(required)){const i=s.ingredients.find(x=>x.id===id);if(!i||i.qty<qty)throw Error('Estoque insuficiente de '+(i?.name||id)+'. O envio inteiro foi cancelado; ajuste o estoque ou os itens.');}
    for(const [id,qty] of Object.entries(required)){const i=s.ingredients.find(x=>x.id===id);i.qty-=qty;s.moves.unshift({id:uid('mov'),at:stamp(),ingredient:id,qty:-qty,type:'consumo',reason:'Consumo estimado por ficha técnica',ref,cost:Math.round(qty*i.costPer1000/1000)});}
    lines.forEach(l=>{l.stockDebited=true;l.sentAt=stamp();l.status=l.station==='direto'?'entregue':'aguardando';});
  }
  /* Eu aplico comandos numa cópia: qualquer erro descarta todas as alterações. */
  function apply(original,action,p={}){
    const s=clone(original);permission(s,action);let result='Ação demonstrativa concluída.';let data=null;
    if(!['settings','stock','reservation','cancelReservation','wait','openShift'].includes(action))operational(s);
    if(['add','send'].includes(action)&&s.role==='caixa'&&account(s,p.id).channel==='mesa')throw Error('O caixa lança itens apenas nos pedidos externos. Para mesas, use Garçom ou Gerente.');
    if(action==='open'){
      const table=s.tables.find(t=>t.id===Number(p.table));if(!table)throw Error('Escolha uma mesa válida.');if(activeTable(s,table.id))throw Error('Esta mesa já está ocupada.');
      const guests=int(p.guests,1,table.seats,'Pessoas');data=createAccount(s,{table:table.id,guests,alias:required(p.alias,'Identificação fictícia',2,40)}).id;result='Mesa aberta nesta demonstração.';
    }else if(action==='add'){
      const a=account(s,p.id);editable(a);let l;
      if(p.kind==='buffet'){
        if(a.channel!=='mesa')throw Error('Buffet por peso é exclusivo do salão neste modelo.');
        const gross=int(p.gross,1,5000,'Peso bruto em gramas');const tare=int(p.tare,0,2000,'Tara em gramas');if(tare>=gross)throw Error('O peso bruto deve ser maior que a tara.');const grams=gross-tare;
        l=makeLine({name:'Buffet · '+grams+' g líquidos',kind:'buffet',price:Math.round(grams*s.settings.buffetPrice/1000),qty:1,station:'direto',grams,recipe:{carne:Math.round(grams*.2),arroz:Math.round(grams*.4),vegetais:grams-Math.round(grams*.2)-Math.round(grams*.4)}});
      }else if(p.kind==='rodizio'){
        if(a.channel!=='mesa')throw Error('Rodízio é exclusivo do salão neste modelo.');const qty=int(p.qty,1,a.guests,'Pessoas no rodízio');const existing=a.lines.filter(l=>l.kind==='rodizio'&&l.status!=='cancelado').reduce((n,l)=>n+l.qty,0);if(qty+existing>a.guests)throw Error('O total de rodízios não pode exceder as pessoas da mesa.');if(!['adulto','infantil'].includes(p.variant))throw Error('Escolha adulto ou infantil.');
        l=makeLine({name:p.variant==='infantil'?'Rodízio infantil':'Rodízio adulto',kind:'rodizio',price:p.variant==='infantil'?s.settings.rodizioChild:s.settings.rodizioAdult,qty,station:'cozinha',recipe:{carne:180,arroz:80,vegetais:60}});
      }else{
        const product=s.products.find(x=>x.id===p.product);if(!product)throw Error('Escolha um produto válido.');const qty=int(p.qty,1,30,'Quantidade');l=makeLine({name:product.name,kind:'alacarte',product:product.id,price:product.price,qty,station:product.station,recipe:clone(product.recipe)});
      }
      l.notes=text(p.notes,180);a.lines.push(l);result='Item lançado como rascunho. Envie para cozinha/bar para confirmar o consumo estimado.';
    }else if(action==='send'){
      const a=account(s,p.id);editable(a);const drafts=a.lines.filter(l=>l.status==='rascunho');if(!drafts.length)throw Error('Nenhum rascunho para enviar.');consume(s,drafts,a.id);result='Pedidos enviados aos painéis locais. Consumo estimado registrado uma única vez.';
    }else if(action==='progress'||action==='deliver'){
      const {a,l}=lineFor(s,p);if(s.role==='bar'&&l.station!=='bar'||s.role==='cozinha'&&l.station!=='cozinha')throw Error('Este item pertence a outra estação.');
      const transitions={aguardando:'preparando',preparando:'pronto',pronto:'entregue'};
      if(action==='deliver'&&l.status!=='pronto')throw Error('A entrega exige item pronto.');if(s.role==='garcom'&&l.status!=='pronto')throw Error('O garçom só confirma a entrega de itens prontos.');
      const next=transitions[l.status];if(!next)throw Error('Este item não pode avançar.');l.status=next;result='Item marcado como '+next+'.';
    }else if(action==='void'){
      const {a,l}=lineFor(s,p);editable(a);if(l.status==='cancelado')throw Error('Este item já foi cancelado.');const reason=required(p.reason,'Motivo do cancelamento',5);l.status='cancelado';l.voidReason=reason;result='Item cancelado. Consumo já registrado não retorna ao estoque automaticamente.';
    }else if(action==='cancelCheck'){
      const a=account(s,p.id);editable(a);const reason=required(p.reason,'Motivo',5);a.status='cancelada';a.closedAt=stamp();a.cancelReason=reason;a.lines.forEach(l=>l.status='cancelado');result='Comanda cancelada. Consumo anterior preservado no histórico.';
    }else if(action==='bill'){
      const a=account(s,p.id);editable(a);a.service=Boolean(p.service);result='Taxa de serviço opcional atualizada.';
    }else if(action==='discount'){
      const a=account(s,p.id);editable(a);a.discount=int(p.percent,0,30,'Desconto percentual');a.discountReason=a.discount?required(p.reason,'Justificativa do desconto',5):'';result='Desconto registrado com justificativa.';
    }else if(action==='pay'){
      const a=account(s,p.id);if(!ready(a))throw Error('Conclua a entrega de todos os itens antes de receber.');if(a.channel!=='mesa'&&!['entregue','retirado'].includes(a.phase))throw Error('Conclua a entrega/retirada antes de receber neste fluxo demonstrativo.');
      const t=totals(s,a);if(!t.balance)throw Error('Não existe saldo a receber.');if(!['dinheiro','pix','cartao'].includes(p.method))throw Error('Forma de pagamento inválida.');const tender=int(p.amount,1,10000000,'Valor recebido em centavos');if(p.method!=='dinheiro'&&tender>t.balance)throw Error('Pix e cartão não geram troco. Informe até o saldo restante.');const amount=Math.min(tender,t.balance);const change=tender-amount;
      if(a.lockedServicePercent===undefined)a.lockedServicePercent=s.settings.servicePercent;a.payments.push({id:uid('pag'),at:stamp(),amount,tender,change,method:p.method,shift:s.shift.id,simulated:true});result='Recebimento apenas simulado: '+money(amount)+'. Troco: '+money(change)+'. Nenhuma transação bancária foi feita.';
    }else if(action==='close'){
      const a=account(s,p.id);if(!ready(a))throw Error('Há itens sem entrega concluída.');const t=totals(s,a);if(t.balance||!a.payments.length)throw Error('Quite o saldo no caixa antes de encerrar.');a.status='fechada';a.closedAt=stamp();a.finalTotals=t;result='Conta encerrada na demo. A mesa foi liberada.';
    }else if(action==='reservation'){
      const date=required(p.date,'Data',10,10);const at=required(p.time,'Horário',5,5);const when=new Date(date+'T'+at+':00');if(!Number.isFinite(when.getTime())||when.getTime()<Date.now()-60000||when.getHours()<11||when.getHours()>21)throw Error('Escolha uma data futura entre 11h e 21h.');const table=s.tables.find(t=>t.id===Number(p.table));if(!table)throw Error('Escolha uma mesa.');const guests=int(p.guests,1,table.seats,'Pessoas');if(s.reservations.some(r=>r.status==='prevista'&&r.table===table.id&&Math.abs(new Date(r.when)-when)<7200000))throw Error('Conflito: essa mesa tem reserva a menos de duas horas deste horário.');s.reservations.push({id:uid('reserva'),alias:required(p.alias,'Identificação fictícia',2,40),guests,table:table.id,when:when.toISOString(),status:'prevista'});result='Reserva fictícia anotada. Nenhuma mensagem foi enviada.';
    }else if(action==='cancelReservation'){
      const r=s.reservations.find(r=>r.id===p.id&&r.status==='prevista');if(!r)throw Error('Reserva não disponível.');r.status='cancelada';result='Reserva de demonstração cancelada.';
    }else if(action==='arrive'){
      const r=s.reservations.find(r=>r.id===p.id&&r.status==='prevista');if(!r)throw Error('Reserva não disponível.');if(activeTable(s,r.table))throw Error('A mesa ainda está ocupada. Libere-a ou anote a chegada na fila.');data=createAccount(s,{table:r.table,guests:r.guests,alias:r.alias}).id;r.status='recebida';result='Chegada anotada e comanda aberta.';
    }else if(action==='wait'){
      s.waitlist.push({id:uid('fila'),alias:required(p.alias,'Identificação fictícia',2,40),guests:int(p.guests,1,12,'Pessoas'),at:stamp(),status:'aguardando'});result='Grupo fictício incluído na fila. Não há envio de SMS ou WhatsApp.';
    }else if(action==='seat'){
      const w=s.waitlist.find(w=>w.id===p.id&&w.status==='aguardando');if(!w)throw Error('Grupo não está aguardando.');const table=s.tables.find(t=>t.id===Number(p.table)&&t.seats>=w.guests);if(!table||activeTable(s,table.id))throw Error('Selecione uma mesa livre com capacidade suficiente.');data=createAccount(s,{table:table.id,guests:w.guests,alias:w.alias}).id;w.status='acomodado';result='Grupo acomodado na simulação.';
    }else if(action==='newDelivery'){
      if(!['entrega','retirada'].includes(p.channel))throw Error('Canal inválido.');data=createAccount(s,{channel:p.channel,alias:required(p.alias,'Identificação fictícia',2,40),address:p.channel==='entrega'?required(p.address,'Endereço fictício',5,160):'',fee:p.channel==='entrega'?int(p.fee,0,5000,'Taxa de entrega em centavos'):0}).id;result='Pedido externo fictício aberto. Lance os itens e envie à produção.';
    }else if(action==='dispatch'){
      const a=account(s,p.id);if(a.channel==='mesa')throw Error('Use esta ação somente em entrega/retirada.');const lines=a.lines.filter(l=>l.status!=='cancelado');if(!lines.length||lines.some(l=>!['pronto','entregue'].includes(l.status)))throw Error('Todos os itens precisam estar prontos para a expedição.');const transitions=a.channel==='entrega'?{'produção':'embalado','embalado':'saiu','saiu':'entregue'}:{'produção':'pronto para retirada','pronto para retirada':'retirado'};const next=transitions[a.phase];if(!next)throw Error('Entrega ou retirada já concluída.');a.phase=next;if(['entregue','retirado'].includes(next))lines.forEach(l=>l.status='entregue');result='Etapa simulada: '+next+'.';
    }else if(action==='stock'){
      const i=s.ingredients.find(i=>i.id===p.ingredient);if(!i)throw Error('Insumo inválido.');const qty=int(p.qty,1,1000000,'Quantidade na unidade-base');if(!['compra','perda','ajuste+','ajuste-'].includes(p.type))throw Error('Tipo de movimento inválido.');const delta=['perda','ajuste-'].includes(p.type)?-qty:qty;if(i.qty+delta<0)throw Error('O movimento deixaria o estoque negativo.');const reason=required(p.reason,'Motivo ou referência',5);i.qty+=delta;s.moves.unshift({id:uid('mov'),at:stamp(),ingredient:i.id,qty:delta,type:p.type,reason,cost:Math.round(qty*i.costPer1000/1000),ref:'manual'});result='Estoque demonstrativo atualizado. Não há integração com compras ou nota fiscal.';
    }else if(action==='settings'){
      s.settings.name=required(p.name,'Nome de demonstração',2,60);s.settings.buffetPrice=int(p.buffetPrice,100,100000,'Preço por kg em centavos');s.settings.rodizioAdult=int(p.rodizioAdult,100,100000,'Rodízio adulto');s.settings.rodizioChild=int(p.rodizioChild,100,100000,'Rodízio infantil');s.settings.servicePercent=int(p.servicePercent,0,20,'Serviço percentual');result='Configuração atualizada. Preços já lançados não são recalculados.';
    }else if(action==='cashMove'){
      const amount=int(p.amount,1,10000000,'Valor em centavos');const sign=p.type==='sangria'?-1:p.type==='suprimento'?1:0;if(!sign)throw Error('Escolha sangria ou suprimento.');if(sign<0&&cashExpected(s)<amount)throw Error('Sangria maior que o saldo teórico em dinheiro.');s.shift.events.push({id:uid('caixa'),at:stamp(),amount:amount*sign,type:p.type,reason:required(p.reason,'Justificativa',5)});result='Movimento de caixa simulado registrado.';
    }else if(action==='closeShift'){
      if(s.accounts.some(live))throw Error('Encerre ou cancele todas as comandas antes de fechar o turno.');const counted=int(p.counted,0,100000000,'Dinheiro contado em centavos');const difference=counted-cashExpected(s);const reason=difference?required(p.reason,'Justificativa da diferença',5):text(p.reason);s.shift.open=false;s.shift.closedAt=stamp();s.shift.counted=counted;s.shift.difference=difference;s.shift.reason=reason;result='Turno demonstrativo fechado. Diferença: '+money(difference)+'.';
    }else if(action==='openShift'){
      if(s.shift.open)throw Error('Já existe um turno aberto.');s.shift={id:uid('turno'),openedAt:stamp(),opening:int(p.opening,0,100000000,'Fundo em centavos'),open:true,events:[],closedAt:null};result='Novo turno demonstrativo aberto.';
    }else throw Error('Comando não implementado.');
    audit(s,action,p.reason||result);assertState(s);return {state:s,message:result,data};
  }
  /* Eu verifico invariantes; isto não substitui validação e autenticação no servidor real. */
  function assertState(s){
    if(!s||!s.shift||typeof s.shift.open!=='boolean'||!['products','reservations','waitlist','moves','audit'].every(k=>Array.isArray(s[k])))throw Error('Dados locais incompletos.');
    if(s.version!==1||!ROLES[s.role]||!Array.isArray(s.accounts)||!Array.isArray(s.ingredients)||!s.settings||!Array.isArray(s.tables))throw Error('Estrutura de demonstração inválida.');
    s.ingredients.forEach(i=>{if(!Number.isInteger(i.qty)||i.qty<0)throw Error('Saldo de estoque inválido.');});
    const tables=new Set();s.accounts.forEach(a=>{if(live(a)&&a.table){if(tables.has(a.table))throw Error('Duas contas abertas na mesma mesa.');tables.add(a.table);}a.lines.forEach(l=>{if(!Number.isInteger(l.price)||l.price<0||!Number.isInteger(l.qty)||l.qty<1)throw Error('Valor de item inválido.');});const t=totals(s,a);if(t.paid>t.total)throw Error('Recebimento superior ao total.');});
    return true;
  }
  function metrics(s,date=day(new Date())){
    const closed=s.accounts.filter(a=>a.status==='fechada'&&day(a.closedAt)===date);const payments=s.accounts.flatMap(a=>a.payments).filter(p=>day(p.at)===date);const sales=closed.reduce((n,a)=>n+(a.finalTotals||totals(s,a)).total,0);const received=payments.reduce((n,p)=>n+p.amount,0);
    const methods={dinheiro:0,pix:0,cartao:0};payments.forEach(p=>methods[p.method]+=p.amount);const mix={alacarte:0,buffet:0,rodizio:0};closed.forEach(a=>a.lines.filter(l=>l.status!=='cancelado').forEach(l=>mix[l.kind]+=l.price*l.qty));
    return {sales,received,count:closed.length,ticket:closed.length?Math.round(sales/closed.length):0,methods,mix,open:s.accounts.filter(live).length,occupied:s.accounts.filter(a=>live(a)&&a.table).length,pending:s.accounts.filter(live).reduce((n,a)=>n+totals(s,a).balance,0),low:s.ingredients.filter(i=>i.qty<=i.min).length};
  }
  return {seed,apply,totals,activeTable,metrics,cashExpected,assertState,money,day,ROLES,PERMS,ready,clone};
});
