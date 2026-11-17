/* ============================================================
   shipping.js — modalidades de entrega simuladas
   ------------------------------------------------------------
   Preços e prazos são FICTÍCIOS, apenas para a simulação.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const OPTIONS = [
    { id:'economica', name:'Entrega econômica', price:19.90, days:'5 a 8 dias úteis', icon:'📦', desc:'Menor custo, prazo amplo.' },
    { id:'expressa',  name:'Entrega expressa',  price:39.90, days:'1 a 2 dias úteis', icon:'⚡', desc:'Chega mais rápido.' },
    { id:'retirada',  name:'Retirada na loja',  price:0,     days:'Imediata (simulada)', icon:'🏬', desc:'Sem custo de frete.' }
  ];
  function get(id) { return OPTIONS.find(function (o) { return o.id === id; }) || null; }
  MOSS.shipping = { all: function () { return OPTIONS.slice(); }, get: get };
})(window);
