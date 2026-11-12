/* A capa mostra a própria demonstração, não uma foto genérica de outro negócio. */
(() => {
  'use strict';
  const raiz = new URL('../../', document.currentScript.src);
  function chave(valor) {
    const url = new URL(valor, location.href);
    const proprio = ['mossdigital.com.br', 'www.mossdigital.com.br', location.host].includes(url.host);
    const caminho = url.pathname.replace(/index\.html$/, '') || '/';
    const preset = url.searchParams.get('preset');
    return (proprio ? '' : url.origin) + caminho + (preset ? '?preset=' + encodeURIComponent(preset) : '');
  }
  async function aplicar() {
    try {
      const resposta = await fetch(new URL('assets/img/catalogo-fiel/manifest.json', raiz), { cache: 'no-cache' });
      if (!resposta.ok) throw new Error('Manifesto de capas indisponível');
      const dados = await resposta.json();
      const capas = new Map(dados.previews.map(p => [p.key, p]));
      document.querySelectorAll('#cards article.card, main .grid article.card').forEach(cartao => {
        const link = cartao.querySelector('a.demo') || cartao.querySelector('a.access') || cartao.querySelector('a.preview');
        const img = cartao.querySelector('img');
        if (!link || !img) return;
        const capa = capas.get(chave(link.href));
        if (!capa) return;
        img.dataset.mossSnapshot = 'true';
        img.src = new URL(capa.src, raiz).href;
        const ampliar = cartao.querySelector('a.preview');
        if (ampliar) ampliar.href = img.src;
        img.alt = 'Captura da própria demonstração: ' + (cartao.querySelector('h2,h3')?.textContent.trim() || capa.title);
        img.width = 960; img.height = 600;
        img.loading = 'lazy';
        img.classList.remove('moss-demo-photo', 'moss-photo-catalog');
      });
      document.documentElement.dataset.mossPreviews = 'ready';
    } catch (erro) {
      document.documentElement.dataset.mossPreviews = 'fallback';
      console.warn(erro.message);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', aplicar, { once: true });
  else aplicar();
})();
