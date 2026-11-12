/* Fotos reais de banco, sem alegar produtos ou clientes de marcas fictícias. */
(() => {
  'use strict';
  const assuntos = new Map();
  function legenda(img) {
    if (!img.matches('img[data-photo],img[data-foto]') || !img.naturalWidth || /placeholder|\.svg(?:\?|$)/i.test(img.currentSrc || img.src)) return;
    const caminho = new URL(img.currentSrc || img.src, location.href).pathname;
    const assunto = assuntos.get(caminho);
    img.alt = (assunto || img.alt.replace(/^(Espaço reservado:|Foto a inserir:)\s*/i, '').replace(/\s*· foto ilustrativa de banco de imagens$/, '')) + ' · foto ilustrativa de banco de imagens';
    const rotulo = img.parentElement.querySelector('.photo-label');
    if (rotulo) rotulo.textContent = 'Foto ilustrativa do segmento';
  }
  document.addEventListener('load', event => {
    if (event.target instanceof HTMLImageElement) legenda(event.target);
  }, true);
  function iniciar() {
    document.querySelectorAll('img[data-photo],img[data-foto]').forEach(legenda);
    fetch('../../assets/img/fotos-revisadas/fontes.json').then(r => {
      if (!r.ok) throw new Error('Fontes indisponíveis');
      return r.json();
    }).then(dados => {
      dados.photos.forEach(foto => foto.targets.forEach(alvo => {
        const [pasta, nome] = alvo.split('/');
        assuntos.set(new URL('../../demos/' + pasta + '/assets/img/' + nome, location.href).pathname, foto.alt);
      }));
      document.querySelectorAll('img[data-photo],img[data-foto]').forEach(legenda);
    }).catch(() => {});
    if (document.getElementById('aviso-fotos-revisadas')) return;
    const aviso = document.createElement('aside');
    aviso.id = 'aviso-fotos-revisadas';
    aviso.style.cssText = 'padding:12px 20px;font:13px/1.5 system-ui,sans-serif;background:#eff5f8;color:#172b3a;text-align:center;overflow-wrap:anywhere';
    aviso.append('Fotos reais de banco, ilustrativas do segmento. Não são produtos, clientes, equipes ou locais desta marca fictícia. ');
    const fonte = document.createElement('a');
    fonte.href = '../../assets/img/fotos-revisadas/fontes.html';
    fonte.textContent = 'Ver fontes e licença';
    fonte.style.cssText = 'color:#075985;text-decoration:underline';
    aviso.append(fonte);
    document.body.append(aviso);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar, { once: true });
  else iniciar();
})();
