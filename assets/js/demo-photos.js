/* Fotografias locais de referência. Não altera formulários, preços ou pedidos. */
(function () {
  'use strict';
  var script = document.currentScript;
  var folder = new URL('../img/demo-photos/', script.src);
  var catalog = script.hasAttribute('data-catalog');
  var slug = script.dataset.demo;
  var sets = {
    floricultura: ['floricultura', 'rosas', 'girassois', 'flores-campo'],
    casamento: ['casamento', 'casamento-mesa'],
    contabilidade: ['contabilidade', 'contabilidade-calculos', 'contabilidade-documentos'],
    entrelares: ['limpeza', 'passadeira', 'cozinha', 'organizacao', 'limpeza-piso', 'limpeza-comercial'],
    pontocomum: ['coworking', 'coworking-reuniao'],
    raizfeira: ['feira', 'feira-produtos'],
    reciclo: ['reciclagem'],
    junto: ['voluntariado', 'voluntariado-doacoes'],
    acessoaberto: ['acessibilidade', 'acessibilidade-sinalizacao'],
    tatuagem: ['tatuagem', 'tatuagem-estudio'],
    assistencia: ['assistencia', 'assistencia-bancada'],
    fretes: ['fretes', 'fretes-estrada'],
    festas: ['festas', 'festas-detalhes', 'casamento-mesa'],
    bar: ['bar', 'bar-coquetel'],
    restaurante360: ['restaurante', 'cozinha']
  };

  async function init() {
    try {
      var response = await fetch(new URL('manifest.json', folder));
      if (!response.ok) throw new Error('Manifesto indisponível');
      var data = await response.json();
      var photos = new Map(data.photos.map(function (photo) { return [photo.name, photo]; }));
      function image(name, role) {
        var photo = photos.get(name);
        if (!photo) throw new Error('Foto não cadastrada: ' + name);
        var img = document.createElement('img');
        img.src = new URL((role === 'moss-photo-catalog' ? 'cards/' : '') + name + '.webp', folder).href;
        img.alt = photo.alt + ' · foto ilustrativa de banco de imagens';
        img.className = 'moss-demo-photo ' + (role || 'moss-photo-inline');
        img.width = role === 'moss-photo-catalog' ? 800 : 1200;
        img.height = role === 'moss-photo-catalog' ? 500 : 900;
        img.loading = role === 'moss-photo-hero' ? 'eager' : 'lazy';
        img.decoding = 'async';
        return img;
      }
      function change(element, name, role) {
        var img = image(name, role);
        if (element.id) img.id = element.id;
        element.replaceWith(img);
        img.parentElement.classList.add('moss-photo-frame');
        var caption = img.closest('.galeria figure, .faixa__foto');
        if (caption && caption.querySelector('figcaption')) caption.querySelector('figcaption').textContent = photos.get(name).alt + ' · referência ilustrativa';
        return img;
      }
      function creditLink() {
        var a = document.createElement('a');
        a.href = new URL('fontes.html', folder).href;
        a.textContent = 'Fontes e licença das fotos';
        return a;
      }

      if (catalog) {
        document.querySelectorAll('.card').forEach(function (card) {
          var found;
          Array.from(card.querySelectorAll('a[href]')).some(function (link) {
            var url = new URL(link.href, location.href);
            var match = url.pathname.match(/\/demos\/([^/]+)/);
            var candidate = match ? match[1] : url.pathname.includes('/restaurante-360') ? 'restaurante360' : url.searchParams.get('preset');
            if (sets[candidate]) { found = candidate; return true; }
            return false;
          });
          var old = card.querySelector('img');
          if (found && old && !old.dataset.mossSnapshot) {
            var img = image(sets[found][0], 'moss-photo-catalog');
            img.loading = 'lazy';
            old.replaceWith(img);
          }
        });
        var cards = document.getElementById('cards');
        if (cards && !document.getElementById('photo-disclosure')) {
          var note = document.createElement('p');
          note.id = 'photo-disclosure'; note.className = 'moss-catalog-photo-note';
          note.append('Capas revisadas com capturas das próprias demonstrações. Fotos internas de banco são ilustrativas, não representam clientes, equipes ou produtos das marcas fictícias. ', creditLink());
          cards.before(note);
        }
      } else if (sets[slug]) {
        var set = sets[slug];
        if (!['floricultura', 'casamento', 'contabilidade'].includes(slug)) {
          document.querySelectorAll('.hero-art > img, .story-art > img, .story > img[src$=".svg"]').forEach(function (old, index) {
            change(old, set[index % set.length], old.closest('.hero-art') ? 'moss-photo-hero' : 'moss-photo-inline');
          });
          var vectors = Array.from(document.querySelectorAll('main svg')).filter(function (svg) {
            var box = svg.getAttribute('viewBox');
            return box && Number(box.split(/\s+/)[2]) >= 100;
          });
          vectors.forEach(function (svg, index) {
            var hero = svg.closest('.capa__grade');
            change(svg, set[index % set.length], hero ? 'moss-photo-hero' : 'moss-photo-inline');
          });
          if (slug === 'tatuagem' || slug === 'fretes') {
            var container = document.querySelector('.capa .envoltorio');
            if (container) {
              var figure = document.createElement('figure'); figure.className = 'moss-added-hero';
              figure.append(image(set[0], 'moss-photo-hero'));
              var label = document.createElement('figcaption'); label.textContent = 'Foto ilustrativa, não é trabalho, equipe ou frota desta marca fictícia.';
              figure.append(label); container.append(figure);
            }
          }
        }
        if (slug === 'contabilidade') {
          document.querySelectorAll('.service-grid article').forEach(function (card, index) { card.prepend(image(set[index % set.length], 'moss-photo-service')); });
        }
        if (slug === 'casamento') {
          var story = document.querySelector('.story-card');
          if (story) story.prepend(image('casamento-mesa', 'moss-photo-service'));
        }
        if (slug === 'entrelares') {
          // A ordem das fotos acompanha as seis atividades, sem sugerir profissionais cadastrados.
          document.querySelectorAll('.service-art img').forEach(function (img, index) {
            var name = set[index % set.length]; img.src = new URL(name + '.webp', folder).href; img.alt = photos.get(name).alt + ' · foto ilustrativa';
          });
        }
        if (slug === 'tatuagem') {
          var heading = document.querySelector('#galeria h2');
          if (heading) heading.textContent = 'Referências para o seu site';
        }
        var banner = document.querySelector('.demo-note, .demo-notice, aside.notice, body > .demo');
        var disclosure = ' Fotos ilustrativas de banco: não são clientes, equipe, local ou produtos desta marca fictícia. ';
        if (slug === 'acessoaberto') disclosure += 'A foto não comprova acessibilidade dos locais demonstrativos. ';
        if (banner) { banner.append(document.createTextNode(disclosure), creditLink()); }
        else {
          var aside = document.createElement('aside'); aside.className = 'moss-photo-disclosure'; aside.setAttribute('aria-label','Aviso de demonstração e fotografias');
          aside.append('DEMONSTRAÇÃO MOSS DIGITAL. Marca e dados ilustrativos.' + disclosure, creditLink());
          document.body.prepend(aside);
        }
        document.querySelectorAll('.galeria .titulos > p').forEach(function (p) { p.textContent = 'Fotografias de referência de banco de imagens. Não são trabalhos, produtos ou ambientes desta marca fictícia.'; });
      }
      document.documentElement.dataset.mossPhotos = 'ready';
    } catch (error) {
      // Sem o manifesto, as ilustrações originais continuam disponíveis.
      document.documentElement.dataset.mossPhotos = 'fallback';
      console.warn('Fotografias de demonstração: ' + error.message);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}());
