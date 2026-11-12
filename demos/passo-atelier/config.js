'use strict';
/* Não há banco configurado. Consulte manual.html antes de mudar o modo. */
const PASSO_CONFIG = Object.freeze({
  mode: 'local', // 'local' ou 'supabase' — somente leitura pública do catálogo.
  supabaseUrl: '',
  supabasePublicKey: '' // Apenas chave publishable/anon pública. Nunca service_role/secret.
});
