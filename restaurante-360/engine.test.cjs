/* Eu testo as regras sem depender da interface ou de transações reais. */
const assert=require('assert/strict');
const E=require('./assets/engine.js');
let tests=0;
function check(name,fn){fn();tests++;console.log('OK · '+name);}
let s=E.seed();
function run(action,p){const result=E.apply(s,action,p);s=result.state;return result;}
function open(table=1,guests=2){return run('open',{table,guests,alias:'Grupo de teste'}).data;}
function finish(id){let a=s.accounts.find(a=>a.id===id);for(const line of a.lines){for(let n=0;n<3;n++){a=s.accounts.find(a=>a.id===id);const l=a.lines.find(l=>l.id===line.id);if(l.status==='entregue'||l.status==='cancelado')break;run(l.status==='pronto'?'deliver':'progress',{id,line:l.id});}}}
check('semente consistente e mesa ocupada protegida',()=>{assert.ok(E.assertState(s));assert.throws(()=>run('open',{table:4,guests:2,alias:'Teste'}),/ocupada/);});
check('capacidade de mesa e tara são validadas',()=>{assert.throws(()=>open(1,3),/entre 1 e 2/);});
const id=open();
check('buffet não aceita tara igual ou maior que o bruto',()=>{assert.throws(()=>run('add',{id,kind:'buffet',gross:200,tare:200}),/maior/);});
check('modalidades mistas preservam valores inteiros e peso líquido',()=>{
  run('add',{id,kind:'alacarte',product:'corte',qty:1});
  run('add',{id,kind:'buffet',gross:620,tare:200});
  run('add',{id,kind:'rodizio',variant:'adulto',qty:1});
  const a=s.accounts.find(a=>a.id===id);assert.equal(a.lines[1].grams,420);assert.equal(a.lines[1].price,4616);assert.equal(E.totals(s,a).subtotal,23006);
});
check('rodízio não excede pessoas da mesa',()=>{assert.throws(()=>run('add',{id,kind:'rodizio',variant:'adulto',qty:2}),/exceder/);});
check('baixa de estoque é atômica e não pode duplicar',()=>{
  const before=s.ingredients.find(i=>i.id==='carne').qty;run('send',{id});const after=s.ingredients.find(i=>i.id==='carne').qty;assert.equal(before-after,544);assert.throws(()=>run('send',{id}),/Nenhum rascunho/);assert.equal(s.ingredients.find(i=>i.id==='carne').qty,after);
});
check('não recebe antes de entregar',()=>{assert.throws(()=>run('pay',{id,method:'pix',amount:100}),/entrega/);});
check('ciclo KDS e taxa opcional funcionam',()=>{finish(id);run('bill',{id,service:true});const a=s.accounts.find(a=>a.id===id);assert.ok(E.ready(a));assert.equal(E.totals(s,a).service,2301);});
check('desconto exige justificativa e respeita arredondamento',()=>{assert.throws(()=>run('discount',{id,percent:10,reason:'x'}),/5 caracteres/);run('discount',{id,percent:10,reason:'Ajuste de teste'});const t=E.totals(s,s.accounts.find(a=>a.id===id));assert.equal(t.discount,2301);assert.equal(t.total,22776);});
check('pagamento parcial mantém mesa e bloqueia mutação',()=>{run('pay',{id,method:'pix',amount:10000});assert.ok(E.activeTable(s,1));assert.throws(()=>run('add',{id,kind:'alacarte',product:'agua',qty:1}),/parcial/);assert.throws(()=>run('close',{id}),/Quite/);});
check('mudança global não altera taxa de conta com pagamento parcial',()=>{run('settings',{...s.settings,servicePercent:20});assert.equal(E.totals(s,s.accounts.find(a=>a.id===id)).total,22776);run('pay',{id,method:'cartao',amount:12776});run('close',{id});assert.equal(E.activeTable(s,1),undefined);});
check('pix/cartão não aceitam troco e dinheiro registra saldo aplicado',()=>{
  const x=open(1,1);run('add',{id:x,kind:'alacarte',product:'agua',qty:1});run('send',{id:x});finish(x);
  assert.throws(()=>run('pay',{id:x,method:'pix',amount:1000}),/troco/);run('pay',{id:x,method:'dinheiro',amount:1000});const p=s.accounts.find(a=>a.id===x).payments[0];assert.equal(p.amount,700);assert.equal(p.change,300);assert.equal(E.cashExpected(s),30700);run('close',{id:x});
});
check('falta de insumo não deixa baixa parcial ou envio parcial',()=>{
  const x=open(1,1);run('add',{id:x,kind:'alacarte',product:'massa',qty:1});run('add',{id:x,kind:'alacarte',product:'corte',qty:1});s.ingredients.find(i=>i.id==='carne').qty=0;
  const before=JSON.stringify(s);assert.throws(()=>run('send',{id:x}),/insuficiente/);assert.equal(JSON.stringify(s),before);run('cancelCheck',{id:x,reason:'Encerramento de teste'});
});
check('cancelamento não repõe automaticamente consumo anterior',()=>{const a=s.accounts.find(a=>a.table===4&&a.status==='aberta'),line=a.lines[0];const before=s.ingredients.find(i=>i.id==='carne').qty;run('void',{id:a.id,line:line.id,reason:'Cancelamento de teste'});assert.equal(s.ingredients.find(i=>i.id==='carne').qty,before);});
check('perfis restringem comandos e estações',()=>{const copy=E.clone(s);copy.role='caixa';assert.throws(()=>E.apply(copy,'void',{id:'x',line:'x',reason:'Teste'}),/perfil/);copy.role='bar';const a=copy.accounts.find(a=>a.table===8&&a.status==='aberta');assert.throws(()=>E.apply(copy,'progress',{id:a.id,line:a.lines[0].id}),/outra estação/);});
check('estoque não fica negativo e exige motivo',()=>{assert.throws(()=>run('stock',{ingredient:'carne',type:'perda',qty:1,reason:'Perda de teste'}),/negativo/);run('stock',{ingredient:'carne',type:'compra',qty:1000,reason:'Entrada de teste'});assert.equal(s.ingredients.find(i=>i.id==='carne').qty,1000);});
check('reservas conflitantes e chegada em mesa ocupada são impedidas',()=>{const tomorrow=new Date();tomorrow.setDate(tomorrow.getDate()+1);const date=E.day(tomorrow);run('reservation',{date,time:'19:00',table:4,guests:2,alias:'Reserva exemplo'});assert.throws(()=>run('reservation',{date,time:'20:00',table:4,guests:2,alias:'Outro exemplo'}),/Conflito/);assert.throws(()=>run('arrive',{id:s.reservations[0].id}),/ocupada/);});
check('fila respeita capacidade e abre comanda',()=>{run('wait',{alias:'Grupo de teste',guests:2});const w=s.waitlist.at(-1);run('seat',{id:w.id,table:1});assert.ok(E.activeTable(s,1));});
check('delivery valida etapas e termina antes de receber',()=>{const x=run('newDelivery',{alias:'Pedido teste',channel:'retirada',fee:1000}).data;assert.equal(s.accounts.find(a=>a.id===x).fee,0);run('add',{id:x,kind:'alacarte',product:'agua',qty:1});run('send',{id:x});assert.throws(()=>run('dispatch',{id:x}),/prontos/);finish(x);run('dispatch',{id:x});assert.throws(()=>run('pay',{id:x,amount:700,method:'pix'}),/entrega\/retirada/);run('dispatch',{id:x});run('pay',{id:x,amount:700,method:'pix'});run('close',{id:x});});
check('turno não fecha com contas abertas ou sangria excessiva',()=>{assert.throws(()=>run('closeShift',{counted:30700}),/comandas/);assert.throws(()=>run('cashMove',{type:'sangria',amount:999999,reason:'Teste de caixa'}),/maior/);});
check('relatórios contam vendas encerradas e pagamentos em centavos',()=>{const m=E.metrics(s);assert.equal(m.count,3);assert.equal(m.sales,24176);assert.equal(m.received,24176);assert.equal(m.methods.dinheiro,700);});
check('fechamento e reabertura de turno deixam contas históricas intactas',()=>{s.accounts.filter(a=>a.status==='aberta').forEach(a=>run('cancelCheck',{id:a.id,reason:'Fim da sessão de testes'}));run('closeShift',{counted:E.cashExpected(s)});assert.equal(s.shift.open,false);run('openShift',{opening:20000});assert.equal(s.shift.open,true);assert.equal(E.cashExpected(s),20000);assert.ok(E.assertState(s));});
console.log('\n'+tests+' grupos de regras aprovados. Nenhum pagamento real foi realizado.');
