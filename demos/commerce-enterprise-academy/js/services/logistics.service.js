/* ============================================================
   logistics.service.js — simulador logístico e rastreamento
   ------------------------------------------------------------
   Gera códigos e eventos FICTÍCIOS. Não cria etiquetas nem
   contrata fretes. Integrações reais são apenas didáticas.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;

  const ESTADOS = ['recebido','pago','preparando','despachado','transporte','entregue'];

  const PROVIDERS = [
    { name:'Correios', note:'Serviços postais e rastreio no Brasil.', docs:'https://www.correios.com.br/' },
    { name:'Melhor Envio', note:'Compara fretes e gera etiquetas.', docs:'https://melhorenvio.com.br/' },
    { name:'Frenet', note:'API de cotação de frete.', docs:'https://frenet.io/' },
    { name:'Intelipost', note:'Gestão logística e rastreamento.', docs:'https://www.intelipost.com.br/' }
  ];

  function progress(order) {
    if (!order) return 0;
    const i = ESTADOS.indexOf(order.status);
    if (i < 0) return 0;
    return Math.round(((i + 1) / ESTADOS.length) * 100);
  }

  function estimate(order) {
    const days = (order.shipping && order.shipping.days) || 'prazo não informado';
    return 'Prazo fictício: ' + days + '. Nenhum frete real foi contratado.';
  }

  MOSS.logistics = { ESTADOS:ESTADOS, PROVIDERS:PROVIDERS, progress:progress, estimate:estimate };
})(window);
