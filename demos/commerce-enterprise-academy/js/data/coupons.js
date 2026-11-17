/* ============================================================
   coupons.js — cupons fictícios de desconto
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const COUPONS = {
    MOSS10:  { code: 'MOSS10',  percent: 10, label: '10% de desconto' },
    PRIME20: { code: 'PRIME20', percent: 20, label: '20% de desconto' }
  };
  function get(code) {
    if (!code) return null;
    return COUPONS[String(code).trim().toUpperCase()] || null;
  }
  MOSS.coupons = { get: get, all: function () { return Object.values(COUPONS); } };
})(window);
