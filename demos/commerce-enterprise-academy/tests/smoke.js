/* Smoke test em Node com stubs mínimos de DOM.
   Executa: node tests/smoke.js
   Objetivo: detectar erros de runtime e validar fluxos principais. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const store = new Map();

function makeEl() {
  const el = {
    _html: '', style: {}, dataset: {}, textContent: '', disabled: false, value: '',
    classList: { add(){}, remove(){}, toggle(){ return false; }, contains(){ return false; } },
    addEventListener(){}, removeEventListener(){}, appendChild(){}, remove(){},
    focus(){}, setAttribute(){}, getAttribute(){ return null; }, closest(){ return null; },
    querySelector(){ return makeEl(); }, querySelectorAll(){ return []; },
    getBoundingClientRect(){ return { left:0, top:0, width:10, height:10 }; },
    get offsetWidth(){ return 10; },
    get innerHTML(){ return this._html; },
    set innerHTML(v){ this._html = String(v); }
  };
  return el;
}

const documentStub = {
  readyState: 'complete',
  documentElement: { setAttribute(){}, getAttribute(){ return 'light'; } },
  body: makeEl(),
  getElementById(){ return makeEl(); },
  createElement(){ return makeEl(); },
  addEventListener(){},
  querySelector(){ return makeEl(); },
  querySelectorAll(){ return []; }
};

const windowStub = {
  location: { hash: '', href: '' },
  localStorage: {
    getItem(k){ return store.has(k) ? store.get(k) : null; },
    setItem(k,v){ store.set(k, String(v)); },
    removeItem(k){ store.delete(k); }
  },
  setTimeout, clearTimeout,
  scrollTo(){},
  addEventListener(){},
  structuredClone: global.structuredClone || (o => JSON.parse(JSON.stringify(o))),
  console
};
windowStub.window = windowStub;
windowStub.document = documentStub;

const ctx = vm.createContext(windowStub);
function load(rel) {
  const code = fs.readFileSync(path.join(root, rel), 'utf8');
  vm.runInContext(code, ctx, { filename: rel });
}

const files = [
  'js/core/utils.js','js/core/store.js','js/core/notify.js','js/core/theme.js','js/core/router.js',
  'js/data/catalog.js','js/data/coupons.js','js/data/shipping.js','js/data/technologies.js',
  'js/data/course.js','js/data/lab-content.js',
  'js/services/api.service.js','js/services/cart.service.js','js/services/order.service.js',
  'js/services/payment.service.js','js/services/logistics.service.js','js/services/supabase.service.js','js/services/admin.service.js',
  'js/components/ui.js','js/components/layout.js','js/components/product-card.js',
  'js/pages/home.js','js/pages/store.js','js/pages/product.js','js/pages/cart.js',
  'js/pages/checkout.js','js/pages/orders.js','js/pages/tracking.js','js/pages/admin.js',
  'js/pages/technologies.js','js/pages/lab.js','js/pages/career.js'
];
files.forEach(load);

const MOSS = ctx.MOSS;
let pass = 0, fail = 0;
function check(name, cond, info) {
  if (cond) { pass++; console.log('PASS', name); }
  else { fail++; console.log('FAIL', name, info === undefined ? '' : JSON.stringify(info)); }
}

(async () => {
  const totalProdutos = MOSS.catalog.all().length;
  check('catálogo marketplace tem 200+ produtos', totalProdutos > 200, totalProdutos);
  check('17 categorias', MOSS.catalog.categories().length === 17, MOSS.catalog.categories().length);
  ['vestuario','livros','auto','cama-mesa-banho','cozinha'].forEach(c =>
    check('categoria ' + c, MOSS.catalog.all().some(p => p.category === c)));
  check('todos os produtos têm foto', MOSS.catalog.all().every(p => !!MOSS.catalog.photo(p).startsWith('https://images.unsplash.com/')));
  check('todos os produtos têm vendedor e estoque', MOSS.catalog.all().every(p => !!p.shop && Number.isFinite(p.stock)));
  check('fotos com índice válido', MOSS.catalog.all().every(p => Number.isInteger(p.photoIndex) && p.photoIndex >= 0 && p.photoIndex < MOSS.catalog.PHOTO_IDS.length));
  check('sem fotos descartadas', MOSS.catalog.all().every(p => ![93,96].includes(p.photoIndex)));
  const bike = MOSS.catalog.all().find(p => p.name.indexOf('Bicicleta') === 0);
  const livro = MOSS.catalog.all().find(p => p.name.indexOf('Livro:') === 0);
  check('bicicleta usa foto de bicicleta', bike && bike.photoIndex === 61, bike && bike.photoIndex);
  check('livro usa foto de livro', livro && livro.photoIndex >= 75 && livro.photoIndex <= 98, livro && livro.photoIndex);
  check('normalize sem acento', MOSS.utils.normalize('Ação') === 'acao');
  check('image é data URI', MOSS.catalog.image(MOSS.catalog.all()[0]).startsWith('data:image/svg+xml'));

  // Páginas renderizam sem lançar erro.
  const pages = ['home','store','product','cart','checkout','orders','tracking','admin','technologies','lab','career'];
  pages.forEach(p => {
    const entry = MOSS.pages[p];
    const fn = typeof entry === 'function' ? entry : entry.render;
    let html = '';
    try { html = fn({ id: MOSS.catalog.all()[0].id }); }
    catch (e) { html = ''; check('render ' + p, false, e.message); }
    if (html) check('render ' + p, typeof html === 'string' && html.length > 50, html.length);
  });

  // Checkout: botão de avanço existe e campos gravam o que é digitado.
  MOSS.cartService.add('EL-101', 1);
  const checkoutHtml = MOSS.pages.checkout.render();
  check('checkout etapa carrinho tem botão Continuar', checkoutHtml.indexOf('id="btn-next"') >= 0);
  const checkoutSrc = fs.readFileSync(path.join(root, 'js/pages/checkout.js'), 'utf8');
  check('checkout grava campos digitados', checkoutSrc.indexOf("state.form[inp.id.slice(2)] = inp.value") >= 0);

  // Fluxo de carrinho.
  MOSS.store.clearCart();
  check('carrinho vazio', MOSS.cartService.count() === 0);
  check('adicionar produto', MOSS.cartService.add('EL-101', 2) === true);
  check('quantidade no carrinho', MOSS.cartService.count() === 2);
  check('estoque insuficiente bloqueado', MOSS.cartService.add('EL-101', 999) === false);
  check('cupom válido', MOSS.cartService.applyCoupon('MOSS10') === true);
  check('cupom inválido', MOSS.cartService.applyCoupon('XX') === false);
  let t = MOSS.cartService.getTotals('economica');
  const esperado = MOSS.utils.round2(449.90 * 2 * 0.9 + 19.90);
  check('total com desconto e frete', Math.abs(t.total - esperado) < 0.01, { total:t.total, esperado });

  // Pedido + pagamento + logística.
  const order = await MOSS.orderService.create({
    name:'Teste', email:'teste@exemplo.com', address:'Rua A', number:'1', city:'SP', state:'SP', zip:'00000-000',
    shippingId:'expressa', paymentMethod:'pix'
  });
  check('pedido criado', !!order && order.items.length === 1);
  const pix = await MOSS.payment.payPix(order);
  check('pix aprovado', pix.approved === true && pix.id.startsWith('PIX'));
  const pago = MOSS.orderService.markPayment(order.id, pix.status, { id: pix.id });
  check('pedido marcado pago', pago.status === 'pago');
  const cardOk = await MOSS.payment.payCard(order, 'aprovado', 3);
  const cardBad = await MOSS.payment.payCard(order, 'recusado', 1);
  const cardPend = await MOSS.payment.payCard(order, 'pendente', 1);
  check('cartão aprovado', cardOk.status === 'pago');
  check('cartão recusado', cardBad.status === 'recusado');
  check('cartão pendente', cardPend.status === 'pendente');
  let adv = order;
  for (let i = 0; i < 5; i++) adv = MOSS.orderService.advance(adv.id);
  check('entregue após avanços', adv.status === 'entregue', adv.status);
  check('rastreio gerado', !!adv.tracking);
  check('progresso 100%', MOSS.logistics.progress(adv) === 100);

  // Cadastro de produtos e estoque (painel administrativo).
  const antesCadastro = MOSS.catalog.all().length;
  const novo = MOSS.adminService.createProduct({
    name:'Produto de Teste Painel', category:'cozinha', price:123.45, stock:7,
    shop:'Loja Teste', location:'Recife, PE', description:'Criado no smoke test', photoIndex:104
  });
  check('cadastro de produto', !!novo && MOSS.catalog.all().length === antesCadastro + 1);
  check('produto cadastrado aparece no catálogo', !!MOSS.catalog.byId(novo.id));
  const estoqueAntes = MOSS.catalog.byId(novo.id).stock;
  MOSS.adminService.adjustStock(novo.id, 5, 'Entrada de teste');
  check('ajuste de estoque (+5)', MOSS.catalog.byId(novo.id).stock === estoqueAntes + 5);
  MOSS.adminService.adjustStock(novo.id, -3, 'Saída de teste');
  check('ajuste de estoque (-3)', MOSS.catalog.byId(novo.id).stock === estoqueAntes + 2);
  check('estoque nunca negativo', MOSS.catalog.byId(novo.id).stock >= 0);
  check('histórico de movimentações', MOSS.adminService.movements().length >= 3);
  MOSS.adminService.setPrice(novo.id, 99.9);
  check('alteração de preço', MOSS.catalog.byId(novo.id).price === 99.9);

  // Supabase em modo não configurado deve degradar sem erro.
  const sb = MOSS.supabaseService.init();
  check('supabase degrada para demo', sb.connected === false);

  console.log('\nRESULTADO: ' + pass + ' passaram, ' + fail + ' falharam.');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('ERRO NO SMOKE TEST', e); process.exit(1); });
