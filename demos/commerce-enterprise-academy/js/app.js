/* ============================================================
   app.js — ponto de entrada da aplicação
   ------------------------------------------------------------
   Registra rotas, inicializa temas, layout e serviços opcionais.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;

  function notFound() {
    return '<div class="page">' + MOSS.ui.empty('🧭', 'Página não encontrada', 'O endereço acessado não existe nesta demonstração.', '<a class="btn btn--primary" href="#/home">Voltar à loja</a>') + '</div>';
  }

  MOSS.cleanups = []; // funções chamadas ao sair de uma página (timers etc.)

  function init() {
    // Serviço opcional: se não houver configuração, opera em modo simulado.
    MOSS.supabaseService.init();

    MOSS.theme.init();
    MOSS.layout.init();
    MOSS.productCard.initDelegation();

    const r = MOSS.router;
    r.register('home', MOSS.pages.home)
     .register('produtos', MOSS.pages.store)
     .register('produto', MOSS.pages.product)
     .register('carrinho', MOSS.pages.cart)
     .register('checkout', MOSS.pages.checkout)
     .register('pedidos', MOSS.pages.orders)
     .register('rastrear', MOSS.pages.tracking)
     .register('admin', MOSS.pages.admin)
     .register('tecnologias', MOSS.pages.technologies)
     .register('laboratorio', MOSS.pages.lab)
     .register('carreira', MOSS.pages.career)
     .setNotFound(notFound)
     .init();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})(window);
