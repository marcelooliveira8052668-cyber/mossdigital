/* =============================================================
   Lina - Tutor de Inglês IA
   chave.js
   -------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa mexer para ligar a IA.

   1) MODO SERVIDOR (recomendado)
      A chave da IA fica NO SERVIDOR, nunca no navegador.
      Rode "node server.js" na pasta e a Lina já conversa de verdade.
      Se for publicar na internet, ponha aqui o endereço do seu
      servidor, por exemplo:

        window.LINA_API = "https://SEU-PROJETO.web.app";

      Vazio: a Lina funciona no MODO BÁSICO (respostas prontas).

   2) CHAVE NO NAVEGADOR (opcional)
      Só se você não tiver servidor. A chave fica guardada
      neste navegador (localStorage), nunca é enviada a lugar
      nenhum além da API da IA.

        window.CHAVE_IA = "AIza...";   // Gemini
        window.CHAVE_IA = "sk-...";    // OpenRouter

      Quem tem servidor NÃO precisa preencher isto.
   ============================================================= */

/* Endereço da API. Vazio = modo básico. */
window.LINA_API = "";

/* Chave da IA direto no navegador. Vazio = use o servidor. */
window.CHAVE_IA = "";
