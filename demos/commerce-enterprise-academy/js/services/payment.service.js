/* ============================================================
   payment.service.js — simulador de pagamentos (100% fictício)
   ------------------------------------------------------------
   NÃO gera chave Pix real, NÃO cria cobrança, NÃO chama gateway.
   Resultados são escolhidos pelo usuário para fins didáticos.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;

  const TEST_CARD = {
    number:'0000 0000 0000 0000',
    name:'CLIENTE DE TESTE',
    expiry:'12/30',
    cvv:'000'
  };

  const INSTALLMENTS = [
    { n:1,  label:'1× de valor integral', multiplier:1 },
    { n:2,  label:'2× sem juros', multiplier:1 },
    { n:3,  label:'3× sem juros', multiplier:1 },
    { n:6,  label:'6× com juros simulados', multiplier:1.06 },
    { n:12, label:'12× com juros simulados', multiplier:1.12 }
  ];

  /** Pagamento Pix: sempre aprovado ao clicar em "Simular pagamento aprovado". */
  async function payPix(order) {
    await MOSS.api.delay(700);
    const id = u.uid('PIX');
    return {
      approved:true, status:'pago', id:id, method:'pix',
      amount:order.totals.total, paidAt:new Date().toISOString(),
      message:'Pagamento Pix aprovado (simulação).'
    };
  }

  /**
   * Cartão: o visitante escolhe o resultado para estudo dos 3 caminhos.
   * resultado: 'aprovado' | 'recusado' | 'pendente'
   */
  async function payCard(order, resultado, parcelas) {
    await MOSS.api.delay(900);
    const id = u.uid('CARD');
    const inst = INSTALLMENTS.find(function (i) { return i.n === parcelas; }) || INSTALLMENTS[0];
    const base = {
      id:id, method:'card', amount:order.totals.total,
      installments:inst.n, installmentValue:u.round2(order.totals.total * inst.multiplier / inst.n),
      simulatedAt:new Date().toISOString()
    };
    if (resultado === 'recusado') {
      return Object.assign({}, base, { approved:false, status:'recusado', message:'Pagamento recusado (simulação). Nenhuma cobrança real foi feita.' });
    }
    if (resultado === 'pendente') {
      return Object.assign({}, base, { approved:false, status:'pendente', message:'Pagamento pendente de análise (simulação).' });
    }
    return Object.assign({}, base, { approved:true, status:'pago', message:'Pagamento aprovado (simulação).' });
  }

  MOSS.payment = { TEST_CARD:TEST_CARD, INSTALLMENTS:INSTALLMENTS, payPix:payPix, payCard:payCard };
})(window);
