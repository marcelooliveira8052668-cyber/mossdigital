/* Alternância Dia/Noite da página inicial MOSS Digital. Não altera as demonstrações. */
(() => {
  'use strict';
  const raiz = document.documentElement;
  const botao = document.getElementById('moss-tema-botao');
  if (!botao) return;

  const icone = botao.querySelector('.moss-tema-icone');
  const nome = botao.querySelector('.moss-tema-texto');
  const corNavegador = document.querySelector('meta[name="theme-color"]');

  function atualizarInterface() {
    const dia = raiz.dataset.tema === 'dia';
    // O botão indica para qual modo o visitante mudará ao clicar.
    const texto = dia ? 'Noite' : 'Dia';
    const acao = dia ? 'Ativar modo noite' : 'Ativar modo dia';
    icone.textContent = dia ? '☾' : '☀';
    nome.textContent = texto;
    botao.setAttribute('aria-label', acao);
    botao.title = acao;
    if (corNavegador) corNavegador.content = dia ? '#fff9ef' : '#0b1f4d';
  }

  botao.addEventListener('click', () => {
    const proximo = raiz.dataset.tema === 'dia' ? 'noite' : 'dia';
    raiz.dataset.tema = proximo;
    try {
      localStorage.setItem('moss:tema', proximo);
    } catch (_) {
      // Em navegadores restritos, a troca continua funcionando nesta página.
    }
    atualizarInterface();
  });

  atualizarInterface();
})();
