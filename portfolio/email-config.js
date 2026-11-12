/* Configuração pública do envio por e-mail da MOSS Digital.
 * Preencha SOMENTE depois de publicar e testar o Worker e o Turnstile.
 * NUNCA inclua aqui senha do Gmail, API key da Resend ou segredo do Turnstile.
 * Enquanto estiver vazio, o botão de e-mail fica oculto e o WhatsApp funciona.
 */
window.MOSS_PORTFOLIO_EMAIL = Object.freeze({
  endpoint: "", // Ex.: https://SEU-WORKER.workers.dev/pedido-portfolio
  turnstileSiteKey: "" // Chave pública do Turnstile para mossdigital.com.br
});
