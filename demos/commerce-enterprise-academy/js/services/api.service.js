/* ============================================================
   api.service.js — API simulada com respostas realistas
   ------------------------------------------------------------
   Não faz requisições de rede. Apenas devolve dados locais com
   um pequeno atraso para simular latência. Nenhum serviço pago.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  const ENDPOINTS = {
    '/products': function () { return MOSS.catalog.all(); },
    '/categories': function () { return MOSS.catalog.categories(); },
    '/shipping': function () { return MOSS.shipping.all(); },
    '/coupons': function () { return MOSS.coupons.all(); }
  };

  /**
   * get(path) → Promise<{ ok, data, meta }>
   * Caminhos desconhecidos retornam 404 simulado.
   */
  async function get(path) {
    await delay(280);
    const handler = ENDPOINTS[path];
    if (!handler) return { ok:false, status:404, data:null, error:'Recurso não encontrado' };
    const data = handler();
    return {
      ok:true, status:200, data:data,
      meta: { count: Array.isArray(data) ? data.length : 1, simulated:true, source:'api.service.js' }
    };
  }

  /** post(path, payload) — simula criação de recursos (pedido). */
  async function post(path, payload) {
    await delay(420);
    if (path === '/orders') {
      return { ok:true, status:201, data: Object.assign({}, payload, { serverSimulated:true }), meta:{ simulated:true } };
    }
    return { ok:false, status:404, data:null, error:'Recurso não encontrado' };
  }

  MOSS.api = { get: get, post: post, delay: delay, ENDPOINTS: ENDPOINTS };
})(window);
