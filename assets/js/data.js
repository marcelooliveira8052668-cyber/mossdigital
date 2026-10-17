/* ==========================================================================
   DATA LAYER — Camada de banco de dados
   ==========================================================================
   O site SEMPRE funciona sem banco de dados. Se você configurar um provedor
   externo e ele falhar, o site volta automaticamente para os dados do
   config.js. Ou seja: nunca quebra o site.

   Para trocar o banco, edite apenas  dataSource  no config.js.

   EXPECTATIVAS DE CADA PROVEDOR:

   ┌─ local ────────────────────────────────────────────────
   │ Salva no navegador (localStorage). Usado para testar
   │ sem servidor. Cada visitante vê os dados de exemplo.
   └────────────────────────────────────────────────────────

   ┌─ rest ─────────────────────────────────────────────────
   │ GET  {baseUrl}/{colecao}   →  [ {objeto}, {objeto} ]
   │ POST {baseUrl}/leads       →  { nome, email, mensagem }
   │ Funciona com PHP, Node, Laravel, Django, qualquer API.
   └────────────────────────────────────────────────────────

   ┌─ supabase ─────────────────────────────────────────────
   │ GET  {url}/rest/v1/{tabela}?select=*
   │ POST {url}/rest/v1/leads
   │ Usa as anon key para autenticação.
   └────────────────────────────────────────────────────────

   ┌─ sheets ───────────────────────────────────────────────
   │ POST {url}  (Google Apps Script Web App)
   │ Envio de pedidos/leads cai numa planilha.
   └────────────────────────────────────────────────────────
   ========================================================================== */

const DataLayer = (function () {
  'use strict';

  const cfg = window.SITE_CONFIG.dataSource;
  const LOCAL_KEY = 'bb_leads';

  // Evita requisições repetidas em caso de erro
  const cache = {};

  function log(msg) {
    if (window.SITE_DEBUG) console.log('[data]', msg);
  }

  /* ----------------------------------------------------------------------
     PROVEDOR LOCAL — navegador
     ---------------------------------------------------------------------- */
  const local = {
    async get(collection) {
      try {
        const raw = window.localStorage.getItem('bb_' + collection);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    },

    async sendLead(lead) {
      try {
        const raw = window.localStorage.getItem(LOCAL_KEY) || '[]';
        const list = JSON.parse(raw);
        list.push(Object.assign({ id: Date.now(), criadoEm: new Date().toISOString() }, lead));
        window.localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
        log('lead salvo no navegador:', lead);
        return { ok: true, local: true };
      } catch (e) {
        return { ok: true, local: true };
      }
    }
  };

  /* ----------------------------------------------------------------------
     PROVEDOR REST — qualquer API
     ---------------------------------------------------------------------- */
  const rest = {
    async get(collection) {
      const url = cfg.rest.baseUrl.replace(/\/$/, '') + '/' + collection;
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        // Se a sua API exigir credencial, descomente e ajuste:
        // headers: { 'Accept': 'application/json', 'Authorization': 'Bearer SEU_TOKEN' }
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      return Array.isArray(data) ? data : (data.data || null);
    },

    async sendLead(lead) {
      const url = cfg.rest.baseUrl.replace(/\/$/, '') + '/leads';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(lead)
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return { ok: true };
    }
  };

  /* ----------------------------------------------------------------------
     PROVEDOR SUPABASE
     ---------------------------------------------------------------------- */
  const supabase = {
    headers() {
      return {
        'apikey': cfg.supabase.anonKey,
        'Authorization': 'Bearer ' + cfg.supabase.anonKey,
        'Content-Type': 'application/json'
      };
    },

    async get(collection) {
      const url = cfg.supabase.url.replace(/\/$/, '') + '/rest/v1/' + collection + '?select=*';
      const res = await fetch(url, { headers: this.headers() });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    },

    async sendLead(lead) {
      const url = cfg.supabase.url.replace(/\/$/, '') + '/rest/v1/leads';
      const res = await fetch(url, {
        method: 'POST',
        headers: Object.assign(this.headers(), {
          'Prefer': 'return=minimal'
        }),
        body: JSON.stringify(lead)
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return { ok: true };
    }
  };

  /* ----------------------------------------------------------------------
     PROVEDOR GOOGLE SHEETS
     ---------------------------------------------------------------------- */
  const sheets = {
    async get() {
      // Sheets não devolve dados com segurança. O site usa o config.js.
      return null;
    },

    async sendLead(lead) {
      const res = await fetch(cfg.sheets.url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      // no-cors devolve status 0; tratamos como sucesso
      return { ok: true, opaque: res.type === 'opaque' };
    }
  };

  const providers = { local, rest, supabase, sheets };

  /* ----------------------------------------------------------------------
     API PÚBLICA
     ---------------------------------------------------------------------- */
  return {
    // Buscar uma coleção do banco. Devolve null se não houver ou falhar.
    async get(collection) {
      if (collection in cache) return cache[collection];

      const provider = providers[cfg.provider] || local;

      if (cfg.provider === 'local') {
        const data = await provider.get(collection);
        return data;
      }

      try {
        const data = await provider.get(collection);
        cache[collection] = data;
        log('"' + collection + '" carregado do banco (' + cfg.provider + ')');
        return data;
      } catch (e) {
        log('falha ao ler "' + collection + '" (' + e.message + ') — usando config.js');
        cache[collection] = null;
        return null;
      }
    },

    // Enviar um pedido / lead para o banco.
    // Nunca lança erro: se o banco falhar, salva local e avisa no retorno.
    async sendLead(lead) {
      const provider = providers[cfg.provider] || local;
      const payload = Object.assign({
        criadoEm: new Date().toISOString(),
        origem: location.pathname
      }, lead);

      if (cfg.provider === 'local') {
        return provider.sendLead(payload);
      }

      try {
        const r = await provider.sendLead(payload);
        log('lead enviado (' + cfg.provider + ')');
        return Object.assign({ persisted: true }, r);
      } catch (e) {
        log('banco indisponível (' + e.message + ') — salvo localmente');
        await local.sendLead(payload);
        return { ok: true, persisted: false, error: e.message };
      }
    },

    // Informa qual provedor está em uso
    provider() {
      return cfg.provider;
    }
  };
})();

window.DataLayer = DataLayer;