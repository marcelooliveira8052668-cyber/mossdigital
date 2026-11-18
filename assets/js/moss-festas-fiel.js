/* MOSS DIGITAL — organiza os temas fiéis sem tocar nos 156 cartões.
   Inicia após moss-estacoes.js (ambos são scripts defer). */
(() => {
  'use strict';
  const galeria=document.getElementById('modelos');
  const faixa=document.querySelector('.moss-estacoes-faixa');
  if(!galeria || !faixa) return;
  // O banner precisa vir depois dos sites, como na foto aprovada.
  galeria.insertAdjacentElement('afterend',faixa);

  // Todos os textos desta seção são claros, sem promessa de descontos.
  const vantagens=document.createElement('section');
  vantagens.className='moss-fiel-vantagens';
  vantagens.setAttribute('aria-label','Por que escolher a MOSS Digital');
  vantagens.innerHTML=[
    '<h2>Por que escolher<br>a MOSS Digital?</h2>',
    '<div class="moss-fiel-vantagem"><span aria-hidden="true">▣</span><div><strong>Sites modernos</strong><p>Feitos para apresentar sua empresa.</p></div></div>',
    '<div class="moss-fiel-vantagem"><span aria-hidden="true">⚡</span><div><strong>Sites prontos</strong><p>Escolha um exemplo e nós adaptamos.</p></div></div>',
    '<div class="moss-fiel-vantagem"><span aria-hidden="true">↗</span><div><strong>Mais visibilidade</strong><p>Mostre seu negócio para mais pessoas.</p></div></div>',
    '<div class="moss-fiel-vantagem"><span aria-hidden="true">☏</span><div><strong>Atendimento próximo</strong><p>Fale diretamente pelo WhatsApp.</p></div></div>'
  ].join('');
  faixa.insertAdjacentElement('afterend',vantagens);
})();
