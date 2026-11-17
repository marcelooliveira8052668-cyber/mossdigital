/* ============================================================
   config.js — configuração OPCIONAL do Supabase
   ------------------------------------------------------------
   A demonstração funciona 100% sem este arquivo (modo local).
   Para testar o modo conectado:
     1) crie um projeto no Supabase e execute schema.sql;
     2) preencha URL e ANON KEY abaixo (a chave PÚBLICA);
     3) inclua o SDK antes dos scripts da aplicação em index.html:
        <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
        <script src="supabase/config.js"></script>
   ⚠️ NUNCA coloque service_role key aqui. Ela é secreta.
   ============================================================ */
window.MOSS_SUPABASE_CONFIG = {
  url: '',      // ex.: https://SEU-PROJETO.supabase.co
  anonKey: '',  // chave pública "anon" — NÃO é a service_role
  enabled: false
};
