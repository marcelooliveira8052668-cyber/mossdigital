/* ============================================================
   supabase.service.js — integração OPCIONAL (modo conectado)
   ------------------------------------------------------------
   A demonstração local NÃO depende desta integração.
  Para usar: preencha supabase/config.js com URL e chave ANON
   (pública) e inclua o SDK via CDN. NUNCA use service_role aqui.
   Sem configuração, todos os métodos operam em modo simulado.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;

  const cfg = global.MOSS_SUPABASE_CONFIG || null;
  const configured = !!(cfg && cfg.url && cfg.anonKey);
  const hasSdk = !!(global.supabase && typeof global.supabase.createClient === 'function');

  let client = null;

  function init() {
    if (!configured) return { connected:false, reason:'Não configurado (modo demonstração)' };
    if (!hasSdk) return { connected:false, reason:'SDK do Supabase não carregado' };
    try {
      // Somente a chave ANON (pública) é usada no navegador.
      client = global.supabase.createClient(cfg.url, cfg.anonKey);
      return { connected:true, reason:'Conectado com chave pública (anon)' };
    } catch (e) {
      return { connected:false, reason:'Falha ao conectar: ' + e.message };
    }
  }

  function status() {
    return {
      configured:configured,
      connected:!!client,
      mode:MOSS.store.get().mode,
      hasSdk:hasSdk,
      reason:configured ? (client ? 'Pronto' : 'Configurado, mas SDK ausente') : 'Usando localStorage'
    };
  }

  async function listProducts() {
    if (!client) return { ok:true, simulated:true, data:MOSS.catalog.all() };
    try {
      const { data, error } = await client.from('products').select('*').order('name');
      if (error) throw error;
      return { ok:true, simulated:false, data:data };
    } catch (e) {
      return { ok:false, simulated:true, error:e.message, data:MOSS.catalog.all() };
    }
  }

  async function insertOrder(order) {
    if (!client) return { ok:true, simulated:true, id:order.id };
    try {
      const { data, error } = await client.from('orders').insert(toRow(order)).select();
      if (error) throw error;
      return { ok:true, simulated:false, data:data };
    } catch (e) {
      return { ok:false, simulated:true, error:e.message };
    }
  }

  async function signInAdmin(email, password) {
    if (!client) return { ok:false, simulated:true, error:'Modo demonstração: autenticação simulada. Use o painel local.' };
    try {
      const { data, error } = await client.auth.signInWithPassword({ email:email, password:password });
      if (error) throw error;
      return { ok:true, simulated:false, user:data.user };
    } catch (e) {
      return { ok:false, simulated:true, error:e.message };
    }
  }

  async function signOut() {
    if (!client) return { ok:true, simulated:true };
    await client.auth.signOut();
    return { ok:true, simulated:false };
  }

  // Converte o pedido da demo para as colunas do schema.sql.
  function toRow(o) {
    return {
      code:o.id,
      customer_name:o.customer.name,
      customer_email:o.customer.email,
      totals:o.totals,
      items:o.items,
      payment_status:o.payment.status,
      shipping_id:o.shipping.id,
      tracking:o.tracking,
      status:o.status
    };
  }

  MOSS.supabaseService = { init:init, status:status, listProducts:listProducts, insertOrder:insertOrder, signInAdmin:signInAdmin, signOut:signOut };
})(window);
