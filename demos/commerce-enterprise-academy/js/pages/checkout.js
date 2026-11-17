/* ============================================================
   checkout.js — fluxo de compra em 7 etapas (100% fictício)
   ------------------------------------------------------------
   1 Carrinho · 2 Identificação · 3 Endereço · 4 Frete
   5 Pagamento · 6 Confirmação · 7 Acompanhamento
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;

  const LABELS = ['Carrinho','Identificação','Endereço','Frete','Pagamento','Confirmação','Acompanhamento'];

  const state = {
    step: 0,
    form: {
      name:'', email:'', phone:'', zip:'', address:'', number:'', city:'', state:'',
      shippingId:'economica', paymentMethod:'pix', cardResult:'aprovado', installments:1
    },
    order: null,
    payment: null,
    errors: {}
  };

  const TEST_DATA = {
    name:'Cliente de Teste', email:'cliente.teste@exemplo.com', phone:'(11) 90000-0000',
    zip:'00000-000', address:'Rua das Demonstrações, 123', number:'Apto 4', city:'São Paulo', state:'SP'
  };

  function totals() { return MOSS.cartService.getTotals(state.form.shippingId); }

  function render() {
    // Se o carrinho foi esvaziado e não há pedido em andamento,
    // volta ao início para não prender o visitante numa etapa antiga.
    if (!MOSS.cartService.lines().length && !state.order && state.step > 0) {
      state.step = 0; state.errors = {};
    }
    return '<div class="page">' +
      '<div class="page-head"><div><span class="eyebrow">Demonstração · nenhuma cobrança real</span>' +
        '<h1>Finalizar compra</h1><p>Preencha com dados fictícios. Use o botão abaixo para preencher automaticamente ou digite livremente.</p></div>' +
        '<div class="row">' +
          '<button class="btn btn--outline" id="fill-test">Preencher dados de teste</button>' +
          '<button class="btn btn--ghost" id="reset-checkout">Reiniciar checkout</button>' +
        '</div></div>' +
      '<div id="checkout-root">' + content() + '</div>' +
    '</div>';
  }

  function content() {
    let stepHtml = '';
    switch (state.step) {
      case 0: stepHtml = stepCart(); break;
      case 1: stepHtml = stepIdentify(); break;
      case 2: stepHtml = stepAddress(); break;
      case 3: stepHtml = stepShipping(); break;
      case 4: stepHtml = stepPayment(); break;
      case 5: stepHtml = stepConfirmation(); break;
      case 6: stepHtml = stepTracking(); break;
    }
    const principal = '<div class="card card--pad">' +
      MOSS.ui.steps(state.step, LABELS) +
      '<h2>' + LABELS[state.step] + '</h2>' +
      stepHtml +
      navHtml() +
    '</div>';

    // Resumo lateral fixo nas etapas de compra (some na confirmação/rastreio).
    let lateral = '';
    if (state.step <= 4) {
      const ls = MOSS.cartService.lines();
      lateral = '<aside class="card card--pad checkout-aside">' +
        '<h3>🛒 Resumo do pedido</h3>' +
        (ls.length ? '<div class="checkout-aside__items">' + ls.map(function (l) {
          return '<div class="spread small" style="padding:.4rem 0;border-bottom:1px solid var(--border)">' +
            '<span>' + u.escapeHtml(l.product.name) + ' <span class="muted">×' + l.qty + '</span></span>' +
            '<strong>' + u.money(l.lineTotal) + '</strong></div>';
        }).join('') + '</div>' : '<p class="muted small">Carrinho vazio.</p>') +
        '<div style="margin-top:.8rem">' + summaryRows() + '</div>' +
        '<div class="note note--warn small" style="margin-top:1rem">Nenhuma cobrança real será feita. Todos os valores são fictícios.</div>' +
        '</aside>';
    }

    return '<div class="checkout-grid">' + principal + lateral + '</div>';
  }

  function navHtml() {
    let html = '<div class="row" style="margin-top:1.5rem;justify-content:space-between">';
    if (state.step > 0 && state.step < 6) html += '<button class="btn btn--outline" id="btn-back">← Voltar</button>';
    else html += '<span></span>';
    if (state.step === 0) {
      html += '<div class="row">' +
        '<a class="btn btn--outline" href="#/carrinho">Editar carrinho</a>' +
        (MOSS.cartService.lines().length ? '<button class="btn btn--primary" id="btn-next">Continuar →</button>' : '') +
        '</div>';
    } else if (state.step < 4) html += '<button class="btn btn--primary" id="btn-next">Continuar →</button>';
    else if (state.step === 6) html += '<a class="btn btn--primary" href="#/pedidos">Ver meus pedidos →</a>';
    html += '</div>';
    return html;
  }

  function field(name, label, type, placeholder, extra) {
    const err = state.errors[name];
    return '<div class="field"><label for="f-' + name + '">' + label + '</label>' +
      '<input id="f-' + name + '" type="' + (type||'text') + '" value="' + u.escapeHtml(state.form[name]||'') + '" ' +
      'placeholder="' + u.escapeHtml(placeholder||'') + '" ' + (err ? 'aria-invalid="true"' : '') + ' ' + (extra||'') + '>' +
      '<span class="field__error">' + u.escapeHtml(err||'') + '</span></div>';
  }

  function stepCart() {
    const ls = MOSS.cartService.lines();
    if (!ls.length) return MOSS.ui.empty('🛒', 'Carrinho vazio', 'Adicione produtos antes de finalizar.', '<a class="btn btn--primary" href="#/produtos">Explorar produtos</a>');
    return '<div class="table-wrap"><table class="data"><thead><tr><th>Produto</th><th>Qtd.</th><th>Valor</th></tr></thead><tbody>' +
      ls.map(function (l) { return '<tr><td>' + u.escapeHtml(l.product.name) + '</td><td>' + l.qty + '</td><td>' + u.money(l.lineTotal) + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
      '<p class="small muted" style="margin-top:1rem">Subtotal: <strong>' + u.money(totals().subtotal) + '</strong></p>';
  }

  function stepIdentify() {
    return '<div class="form-grid">' + field('name','Nome completo','text','Como está no documento (fictício)') +
      field('email','E-mail','email','cliente@exemplo.com') + '</div>' +
      field('phone','Telefone','tel','(11) 90000-0000') +
      '<div class="note">🔒 Não pedimos CPF nem dados bancários reais. Use somente informações de teste.</div>';
  }

  function stepAddress() {
    return '<div class="form-grid">' + field('zip','CEP (fictício)','text','00000-000') +
      field('number','Número / complemento','text','123, Apto 4') + '</div>' +
      field('address','Endereço (fictício)','text','Rua das Demonstrações') +
      '<div class="form-grid">' + field('city','Cidade','text','São Paulo') +
      field('state','Estado (UF)','text','SP') + '</div>';
  }

  function stepShipping() {
    return '<div id="shipping-options">' + MOSS.shipping.all().map(function (o) {
      return '<label class="option-card' + (state.form.shippingId===o.id?' is-selected':'') + '" data-option="' + o.id + '">' +
        '<input type="radio" name="ship" value="' + o.id + '"' + (state.form.shippingId===o.id?' checked':'') + '>' +
        '<span><span class="option-card__title">' + o.icon + ' ' + o.name + '</span><br>' +
        '<span class="option-card__meta">' + o.desc + ' · ' + o.days + '</span></span>' +
        '<span class="option-card__price">' + (o.price ? u.money(o.price) : 'Grátis') + '</span></label>';
    }).join('') + '</div>' +
      '<div class="card card--pad" style="background:var(--surface-2)" id="ship-summary">' + summaryRows() + '</div>';
  }

  function summaryRows() {
    const t = totals();
    return '<div class="summary-row"><span>Subtotal</span><span>' + u.money(t.subtotal) + '</span></div>' +
      (t.discount ? '<div class="summary-row summary-row__discount"><span>Desconto</span><span>− ' + u.money(t.discount) + '</span></div>' : '') +
      '<div class="summary-row"><span>Frete</span><span>' + u.money(t.shipping) + '</span></div>' +
      '<div class="summary-row summary-row--total"><span>Total</span><span>' + u.money(t.total) + '</span></div>';
  }

  function stepPayment() {
    const t = totals();
    let body = '<div class="row" style="margin-bottom:1rem">' +
      '<button class="chip' + (state.form.paymentMethod==='pix'?' is-active':'') + '" data-method="pix"> Pix</button>' +
      '<button class="chip' + (state.form.paymentMethod==='card'?' is-active':'') + '" data-method="card"> Cartão fictício</button>' +
      '</div>';

    if (state.form.paymentMethod === 'pix') {
      body += '<div class="grid grid--2"><div>' +
        '<div class="receipt">' +
          '<div class="small muted">COMPROVANTE DEMONSTRATIVO</div>' +
          '<div class="receipt__amount">' + u.money(t.total) + '</div>' +
          '<div class="small muted">Identificador fictício</div>' +
          '<div class="receipt__id">PIX-DEMO-0000</div>' +
          '<span class="badge badge--accent">Aguardando simulação</span>' +
        '</div>' +
        '<button class="btn btn--primary btn--block" id="pay-pix" style="margin-top:1rem">Simular pagamento aprovado ✓</button>' +
        '</div><div class="note note--warn">⚠️ Este não é um QR Code real e não permite transferência de dinheiro. É apenas uma representação visual para estudo.</div></div>';
    } else {
      const c = MOSS.payment.TEST_CARD;
      body += '<div class="grid grid--2"><div>' +
        '<div class="credit-card"><div class="credit-card__chip"></div>' +
          '<div class="credit-card__number">' + c.number + '</div>' +
          '<div class="credit-card__row"><span>' + c.name + '</span><span>' + c.expiry + '</span></div></div>' +
        '<p class="tiny muted">Cartão de teste predefinido. Não digite dados reais.</p>' +
        '</div><div>' +
          '<div class="field"><label for="card-result">Resultado do teste</label>' +
            '<select id="card-result"><option value="aprovado"' + (state.form.cardResult==='aprovado'?' selected':'') + '>Pagamento aprovado</option>' +
            '<option value="recusado"' + (state.form.cardResult==='recusado'?' selected':'') + '>Pagamento recusado</option>' +
            '<option value="pendente"' + (state.form.cardResult==='pendente'?' selected':'') + '>Pagamento pendente</option></select></div>' +
          '<div class="field"><label for="installments">Parcelamento fictício</label>' +
            '<select id="installments">' + MOSS.payment.INSTALLMENTS.map(function (i) {
              return '<option value="' + i.n + '"' + (state.form.installments===i.n?' selected':'') + '>' +
                i.n + '× de ' + u.money(t.total * i.multiplier / i.n) + ' — ' + i.label + '</option>';
            }).join('') + '</select></div>' +
          '<button class="btn btn--primary btn--block" id="pay-card">Processar pagamento de teste</button>' +
        '</div></div>' +
        '<div class="note">💡 Escolha cada resultado para ver como a interface reage. Nenhuma cobrança é enviada.</div>';
    }

    if (state.payment) {
      const ok = state.payment.status === 'pago';
      body += '<div class="note ' + (ok?'':'note--danger') + '" id="payment-result">' +
        (ok ? '✅ ' : '⛔ ') + u.escapeHtml(state.payment.message) +
        ' <span class="badge ' + (ok?'badge--green':'badge--red') + '">' + state.payment.status + '</span></div>';
    }
    return body + '<div class="card card--pad" style="background:var(--surface-2);margin-top:1rem">' + summaryRows() + '</div>';
  }

  function stepConfirmation() {
    const o = state.order;
    if (!o) return MOSS.ui.empty('❓','Pedido não encontrado','Volte e tente novamente.','<button class="btn btn--primary" id="btn-back">Voltar</button>');
    return '<div class="note note--warn">✅ Pedido demonstrativo criado. Nenhum valor foi cobrado.</div>' +
      '<div class="grid grid--2">' +
        '<div class="card card--pad"><h3>Resumo do pedido</h3>' +
          '<p><strong>Número:</strong> ' + u.escapeHtml(o.id) + '</p>' +
          '<p><strong>Status:</strong> <span class="badge badge--blue">' + o.status + '</span></p>' +
          '<p><strong>Pagamento:</strong> ' + o.payment.method.toUpperCase() + ' · ' + o.payment.status + '</p>' +
          '<p><strong>Total:</strong> ' + u.money(o.totals.total) + '</p></div>' +
        '<div class="card card--pad"><h3>Entrega</h3>' +
          '<p><strong>' + u.escapeHtml(o.shipping.name) + '</strong></p>' +
          '<p>' + u.escapeHtml(o.customer.address) + ', ' + u.escapeHtml(o.customer.number) + ' — ' + u.escapeHtml(o.customer.city) + '/' + u.escapeHtml(o.customer.state) + '</p>' +
          '<p class="small muted">' + MOSS.logistics.estimate(o) + '</p></div>' +
      '</div>' +
      '<div class="row" style="margin-top:1rem"><button class="btn btn--primary" id="go-tracking">Acompanhar entrega →</button>' +
      '<a class="btn btn--outline" href="#/pedidos">Ver meus pedidos</a></div>';
  }

  function stepTracking() {
    const o = state.order;
    if (!o) return MOSS.ui.empty('📦','Sem pedido','Crie um pedido primeiro.');
    return '<div class="row spread"><div><span class="badge badge--accent">Rastreio fictício</span>' +
      '<h3 style="margin-top:.5rem">' + u.escapeHtml(o.tracking || '—') + '</h3>' +
      '<p class="small muted">' + MOSS.logistics.estimate(o) + '</p></div>' +
      '<button class="btn btn--navy" id="advance-btn"' + (o.status==='entregue'?' disabled':'') + '>Avançar estado →</button></div>' +
      '<div class="progress" style="margin:1rem 0"><span style="width:' + MOSS.logistics.progress(o) + '%"></span></div>' +
      MOSS.ui.timeline(o);
  }

  function refresh() {
    document.getElementById('checkout-root').innerHTML = content();
    bindStep();
  }

  function go(step) {
    state.step = step;
    state.errors = {};
    refresh();
  }

  function validate(fields) {
    state.errors = {};
    fields.forEach(function (f) {
      const v = (state.form[f] || '').trim();
      if (!v) state.errors[f] = 'Campo obrigatório.';
      else if (f === 'email' && !u.isEmail(v)) state.errors[f] = 'Informe um e-mail válido.';
    });
    return Object.keys(state.errors).length === 0;
  }

  function bindStep() {
    const app = document.getElementById('app');

    // IMPORTANTE: grava no estado tudo que a pessoa digita nos campos.
    // Sem isto, o botão "Continuar" validava sempre os valores vazios.
    app.querySelectorAll('[id^="f-"]').forEach(function (inp) {
      inp.addEventListener('input', function () { state.form[inp.id.slice(2)] = inp.value; });
      inp.addEventListener('change', function () { state.form[inp.id.slice(2)] = inp.value; });
    });

    const fill = app.querySelector('#fill-test');
    if (fill && !fill.dataset.bound) {
      fill.dataset.bound = '1';
      fill.addEventListener('click', function () {
        Object.assign(state.form, TEST_DATA);
        MOSS.notify.toast('Dados fictícios preenchidos.', 'ok', 1800);
        refresh();
      });
    }

    const resetBtn = app.querySelector('#reset-checkout');
    if (resetBtn && !resetBtn.dataset.bound) {
      resetBtn.dataset.bound = '1';
      resetBtn.addEventListener('click', function () {
        state.step = 0; state.order = null; state.payment = null; state.errors = {};
        state.form = { name:'', email:'', phone:'', zip:'', address:'', number:'', city:'', state:'',
          shippingId:'economica', paymentMethod:'pix', cardResult:'aprovado', installments:1 };
        MOSS.notify.toast('Checkout reiniciado.', 'info', 1800);
        MOSS.router.render();
      });
    }

    const back = app.querySelector('#btn-back');
    if (back) back.addEventListener('click', function () { go(state.step - 1); });

    const next = app.querySelector('#btn-next');
    if (next) next.addEventListener('click', function () {
      if (state.step === 1 && !validate(['name','email','phone'])) return refresh();
      if (state.step === 2 && !validate(['zip','address','number','city','state'])) return refresh();
      go(state.step + 1);
    });

    app.querySelectorAll('[data-method]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.form.paymentMethod = b.getAttribute('data-method');
        state.payment = null;
        refresh();
      });
    });

    app.querySelectorAll('[data-option]').forEach(function (l) {
      l.addEventListener('click', function () {
        state.form.shippingId = l.getAttribute('data-option');
        refresh();
      });
    });

    const result = app.querySelector('#card-result');
    if (result) result.addEventListener('change', function () { state.form.cardResult = result.value; });
    const inst = app.querySelector('#installments');
    if (inst) inst.addEventListener('change', function () { state.form.installments = Number(inst.value); });

    const payPix = app.querySelector('#pay-pix');
    if (payPix) payPix.addEventListener('click', async function () {
      payPix.disabled = true; payPix.textContent = 'Processando…';
      const order = state.order || await MOSS.orderService.create(state.form);
      if (!order) { payPix.disabled = false; payPix.textContent = 'Simular pagamento aprovado ✓'; return; }
      state.order = order;
      state.payment = await MOSS.payment.payPix(order);
      MOSS.orderService.markPayment(order.id, state.payment.status, { id:state.payment.id, method:'pix' });
      state.order = MOSS.orderService.byId(order.id);
      MOSS.store.clearCart();
      go(5);
    });

    const payCard = app.querySelector('#pay-card');
    if (payCard) payCard.addEventListener('click', async function () {
      payCard.disabled = true; payCard.textContent = 'Processando…';
      const order = state.order || await MOSS.orderService.create(state.form);
      if (!order) { payCard.disabled = false; payCard.textContent = 'Processar pagamento de teste'; return; }
      state.order = order;
      state.payment = await MOSS.payment.payCard(order, state.form.cardResult, state.form.installments);
      MOSS.orderService.markPayment(order.id, state.payment.status, { id:state.payment.id, method:'card', installments:state.payment.installments });
      state.order = MOSS.orderService.byId(order.id);
      if (state.payment.status === 'pago') {
        MOSS.store.clearCart();
        go(5); // aprovado: mostra confirmação (como no Pix)
      } else {
        // Recusado/pendente: mantém a tela para o aluno ver a reação.
        refresh();
      }
    });

    const goTracking = app.querySelector('#go-tracking');
    if (goTracking) goTracking.addEventListener('click', function () { go(6); });

    const advance = app.querySelector('#advance-btn');
    if (advance) advance.addEventListener('click', function () {
      state.order = MOSS.orderService.advance(state.order.id, 'Atualizado manualmente na demonstração.');
      MOSS.notify.toast('Pedido avançou para: ' + state.order.status, 'info');
      refresh();
    });
  }

  function bind() { bindStep(); }

  MOSS.pages = MOSS.pages || {};
  MOSS.pages.checkout = { render:render, bind:bind };
})(window);
