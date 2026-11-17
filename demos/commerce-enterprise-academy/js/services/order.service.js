/* ============================================================
   order.service.js — criação e gestão de pedidos fictícios
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils, store = MOSS.store, notify = MOSS.notify;

  const STATUS_LABELS = {
    recebido:'Pedido recebido',
    pago:'Pagamento confirmado',
    preparando:'Preparando encomenda',
    despachado:'Pedido despachado',
    transporte:'Em transporte',
    entregue:'Entregue'
  };

  /** Cria um pedido demonstrativo a partir do carrinho atual. */
  async function create(data) {
    const linhas = MOSS.cartService.lines();
    if (!linhas.length) { notify.toast('O carrinho está vazio.', 'err'); return null; }

    const totals = MOSS.cartService.getTotals(data.shippingId);
    const frete = MOSS.shipping.get(data.shippingId);
    const order = {
      id: u.uid('MOSS'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customer: {
        name: data.name, email: data.email, phone: data.phone || '—',
        address: data.address, city: data.city, state: data.state, zip: data.zip, number: data.number
      },
      items: linhas.map(function (l) {
        return { id:l.product.id, name:l.product.name, qty:l.qty, price:l.product.price, lineTotal:l.lineTotal };
      }),
      totals: totals,
      shipping: { id:frete ? frete.id : 'economica', name:frete ? frete.name : 'Entrega econômica', price:totals.shipping, days:frete ? frete.days : '—' },
      payment: { method:data.paymentMethod || 'pix', status:'pendente', history:[] },
      status:'recebido',
      tracking: null,
      timeline: [{ status:'recebido', label:STATUS_LABELS.recebido, at:new Date().toISOString(), note:'Pedido criado na demonstração.' }]
    };

    await MOSS.api.post('/orders', order);
    store.addOrder(order);
    return order;
  }

  /** Atualiza o status do pagamento e registra no histórico. */
  function markPayment(orderId, status, details) {
    const order = store.get().orders.find(function (o) { return o.id === orderId; });
    if (!order) return null;
    const history = (order.payment.history || []).slice();
    history.push({ status:status, at:new Date().toISOString(), details:details || 'Simulação' });
    const payment = Object.assign({}, order.payment, { status:status, history:history });
    const patch = { payment:payment };
    if (status === 'pago') {
      patch.status = 'pago';
      patch.timeline = order.timeline.concat([{ status:'pago', label:STATUS_LABELS.pago, at:new Date().toISOString(), note:'Pagamento aprovado na simulação.' }]);
    }
    store.updateOrder(orderId, patch);
    return store.get().orders.find(function (o) { return o.id === orderId; });
  }

  /** Avança o pedido para o próximo estado logístico. */
  function advance(orderId, note) {
    const order = store.get().orders.find(function (o) { return o.id === orderId; });
    if (!order || order.status === 'entregue') return order || null;
    const seq = ['recebido','pago','preparando','despachado','transporte','entregue'];
    const i = seq.indexOf(order.status);
    if (i < 0 || i >= seq.length - 1) return order;
    const next = seq[i + 1];
    const tracking = order.tracking || u.uid('MOSS');
    const timeline = order.timeline.concat([{ status:next, label:STATUS_LABELS[next], at:new Date().toISOString(), note:note || 'Atualização automática da simulação.' }]);
    store.updateOrder(orderId, { status:next, tracking:tracking, timeline:timeline });
    return store.get().orders.find(function (o) { return o.id === orderId; });
  }

  /** Simula uma devolução (ação administrativa). */
  function refund(orderId, reason) {
    const order = store.get().orders.find(function (o) { return o.id === orderId; });
    if (!order) return null;
    const history = (order.payment.history || []).slice();
    history.push({ status:'devolvido', at:new Date().toISOString(), details:reason || 'Devolução simulada' });
    const timeline = order.timeline.concat([{ status:'devolvido', label:'Devolução solicitada (simulada)', at:new Date().toISOString(), note:reason || 'Solicitada no painel demonstrativo.' }]);
    store.updateOrder(orderId, {
      status:'devolvido',
      payment:Object.assign({}, order.payment, { status:'devolvido', history:history }),
      timeline:timeline
    });
    notify.toast('Devolução simulada registrada.', 'ok');
    return store.get().orders.find(function (o) { return o.id === orderId; });
  }

  function byId(id) { return store.get().orders.find(function (o) { return o.id === id; }) || null; }
  function all() { return store.get().orders.slice(); }

  MOSS.orderService = {
    STATUS_LABELS:STATUS_LABELS, create:create, markPayment:markPayment,
    advance:advance, refund:refund, byId:byId, all:all
  };
})(window);
