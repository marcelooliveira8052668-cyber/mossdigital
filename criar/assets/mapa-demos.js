/* ==========================================================================
   MAPA DAS DEMONSTRAÇÕES → CRIADOR
   Cada demonstração do site vira ponto de partida do criador: o id abaixo
   pré-marcou produto e área quando a pessoa chega em /criar/?demo=<id>.

   IMPORTANTE: este arquivo é uma cópia idêntica de
   10 - Plataforma MOSS/versao-local/publico/criar/assets/mapa-demos.js
   Os testes (testes-mapas.py) conferem que as duas cópias nunca divergem.

   Estrutura de cada entrada:
     id: { nome, produto, area, demo }
       nome   — como a demonstração aparece para quem chega ao criador
       produto — "site" ou "portfolio" (chaves válidas do criador)
       area   — chave da área no catálogo de exemplos do criador
       demo   — caminho da demonstração, relativo à pasta criar/
   ========================================================================== */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.MossDemos = api;
}(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  var mapa = {
    /* ---------- Demonstrações em demos/ (16) ---------- */
    'acessoaberto': { nome: 'acesso aberto — Guia de Acessibilidade Urbana', produto: 'site', area: 'geral', demo: '../demos/acessoaberto/' },
    'assistencia': { nome: 'Ponto Certo — Assistência e Reparos', produto: 'site', area: 'servicos', demo: '../demos/assistencia/' },
    'bar': { nome: 'Bar Íris — Coquetelaria', produto: 'site', area: 'restaurante', demo: '../demos/bar/' },
    'casamento': { nome: 'Clara & Tomás — Site de casamento', produto: 'site', area: 'geral', demo: '../demos/casamento/' },
    'contabilidade': { nome: 'Eixo Contábil — Contabilidade', produto: 'site', area: 'servicos', demo: '../demos/contabilidade/' },
    'entrelares': { nome: 'EntreLares — Profissionais para sua casa', produto: 'site', area: 'servicos', demo: '../demos/entrelares/' },
    'festas': { nome: 'Celebra — Casa de Festas', produto: 'site', area: 'geral', demo: '../demos/festas/' },
    'floricultura': { nome: 'Flora & Afeto — Floricultura', produto: 'site', area: 'loja', demo: '../demos/floricultura/' },
    'fretes': { nome: 'Fretes Avenida — Fretes e Transportes', produto: 'site', area: 'servicos', demo: '../demos/fretes/' },
    'junto': { nome: 'junto. — Voluntariado e Impacto Social', produto: 'site', area: 'geral', demo: '../demos/junto/' },
    'moss-motors': { nome: 'MOSS Motors — Loja de Veículos', produto: 'site', area: 'loja', demo: '../demos/moss-motors/' },
    'otica': { nome: 'Lumina Ótica — Óculos de grau e sol', produto: 'site', area: 'loja', demo: '../demos/otica/' },
    'pontocomum': { nome: 'ponto comum — Coworking e Salas de Reunião', produto: 'site', area: 'servicos', demo: '../demos/pontocomum/' },
    'raizfeira': { nome: 'raiz / feira — Feira de Produtores Locais', produto: 'site', area: 'loja', demo: '../demos/raizfeira/' },
    'reciclo': { nome: 'ReCiclo — Reciclagem e Ecopontos', produto: 'site', area: 'geral', demo: '../demos/reciclo/' },
    'tatuagem': { nome: 'Agulha de Ouro — Studio de Tatuagem', produto: 'site', area: 'beleza', demo: '../demos/tatuagem/' },

    /* ---------- Demonstrações pelo painel de presets (28) ---------- */
    'preset-academia': { nome: 'Academia', produto: 'site', area: 'servicos', demo: '../demo.html?preset=academia' },
    'preset-advocacia': { nome: 'Advocacia', produto: 'site', area: 'servicos', demo: '../demo.html?preset=advocacia' },
    'preset-arquiteto': { nome: 'Arquiteto', produto: 'site', area: 'servicos', demo: '../demo.html?preset=arquiteto' },
    'preset-assistencia': { nome: 'Assistência de Celular', produto: 'site', area: 'servicos', demo: '../demo.html?preset=assistencia' },
    'preset-bar': { nome: 'Bar e Coquetelaria', produto: 'site', area: 'restaurante', demo: '../demo.html?preset=bar' },
    'preset-barbearia': { nome: 'Barbearia', produto: 'site', area: 'beleza', demo: '../demo.html?preset=barbearia' },
    'preset-clinica': { nome: 'Clínica', produto: 'site', area: 'servicos', demo: '../demo.html?preset=clinica' },
    'preset-dentista': { nome: 'Dentista', produto: 'site', area: 'servicos', demo: '../demo.html?preset=dentista' },
    'preset-escola': { nome: 'Escola e cursos', produto: 'site', area: 'geral', demo: '../demo.html?preset=escola' },
    'preset-estetica': { nome: 'Clínica estética', produto: 'site', area: 'beleza', demo: '../demo.html?preset=estetica' },
    'preset-festas': { nome: 'Casa de festas', produto: 'site', area: 'geral', demo: '../demo.html?preset=festas' },
    'preset-fisioterapia': { nome: 'Fisioterapia', produto: 'site', area: 'servicos', demo: '../demo.html?preset=fisioterapia' },
    'preset-fotografo': { nome: 'Fotógrafo', produto: 'portfolio', area: 'fotografia', demo: '../demo.html?preset=fotografo' },
    'preset-fretes': { nome: 'Fretes e Transportes', produto: 'site', area: 'servicos', demo: '../demo.html?preset=fretes' },
    'preset-hotel': { nome: 'Hotel e pousada', produto: 'site', area: 'geral', demo: '../demo.html?preset=hotel' },
    'preset-imobiliaria': { nome: 'Imobiliária', produto: 'site', area: 'servicos', demo: '../demo.html?preset=imobiliaria' },
    'preset-lanchonete': { nome: 'Lanchonete', produto: 'site', area: 'restaurante', demo: '../demo.html?preset=lanchonete' },
    'preset-locadora': { nome: 'Locadora', produto: 'site', area: 'servicos', demo: '../demo.html?preset=locadora' },
    'preset-nutricionista': { nome: 'Nutricionista', produto: 'site', area: 'servicos', demo: '../demo.html?preset=nutricionista' },
    'preset-oficina': { nome: 'Oficina', produto: 'site', area: 'servicos', demo: '../demo.html?preset=oficina' },
    'preset-padaria': { nome: 'Padaria e café', produto: 'site', area: 'confeitaria', demo: '../demo.html?preset=padaria' },
    'preset-petshop': { nome: 'Pet shop', produto: 'site', area: 'loja', demo: '../demo.html?preset=petshop' },
    'preset-pizzaria': { nome: 'Pizzaria', produto: 'site', area: 'restaurante', demo: '../demo.html?preset=pizzaria' },
    'preset-psicologo': { nome: 'Psicólogo', produto: 'site', area: 'servicos', demo: '../demo.html?preset=psicologo' },
    'preset-salao': { nome: 'Salão de beleza', produto: 'site', area: 'beleza', demo: '../demo.html?preset=salao' },
    'preset-servicos': { nome: 'Prestação de serviço', produto: 'site', area: 'servicos', demo: '../demo.html?preset=servicos' },
    'preset-tatuagem': { nome: 'Studio de Tatuagem', produto: 'site', area: 'beleza', demo: '../demo.html?preset=tatuagem' },
    'preset-veterinario': { nome: 'Clínica veterinária', produto: 'site', area: 'servicos', demo: '../demo.html?preset=veterinario' },

    /* ---------- Projetos e demonstrações na raiz do site (20) ---------- */
    'agenda-pro': { nome: 'MOSS Agenda Pro', produto: 'site', area: 'servicos', demo: '../agenda-pro/' },
    'codigo-conhecimento': { nome: 'Código & Conhecimento — Livro de programação', produto: 'site', area: 'geral', demo: '../codigo-conhecimento/' },
    'comandas': { nome: 'Comanda Fácil — Comandas, cozinha e caixa', produto: 'site', area: 'servicos', demo: '../comandas/' },
    'devbook': { nome: 'DevBook — Curso Full Stack', produto: 'site', area: 'geral', demo: '../devbook/' },
    'educaenem': { nome: 'EducaEnem — Curso online', produto: 'site', area: 'geral', demo: '../educaenem/' },
    'elaine-sandrinha': { nome: 'Elaine & Sandra — Neuropsicopedagogia', produto: 'site', area: 'servicos', demo: '../elaine-sandrinha/' },
    'fotos-amigos': { nome: 'Fotos entre Amigos', produto: 'portfolio', area: 'fotografia', demo: '../fotos-amigos/' },
    'gerador-portfolio': { nome: 'Gerador de Portfólio', produto: 'portfolio', area: 'geral', demo: '../gerador-portfolio/' },
    'jogo-velha': { nome: 'Jogo da Velha', produto: 'site', area: 'geral', demo: '../jogo-velha/' },
    'lanchonete-do-china': { nome: 'Lanchonete do China', produto: 'site', area: 'restaurante', demo: '../lanchonete-do-china/' },
    'livraria-mo': { nome: 'M.O Livraria', produto: 'site', area: 'loja', demo: '../livraria-mo/' },
    'loja-virtual': { nome: 'NEXA Store — Loja virtual', produto: 'site', area: 'loja', demo: '../loja-virtual/' },
    'moss-burger': { nome: 'MOSS Burger', produto: 'site', area: 'restaurante', demo: '../moss-burger/' },
    'moss-burger-online': { nome: 'MOSS Burger — Pedido online', produto: 'site', area: 'restaurante', demo: '../moss-burger-online/' },
    'nf-control': { nome: 'NF Control — Gestão de notas fiscais', produto: 'site', area: 'servicos', demo: '../nf-control/' },
    'pacman': { nome: 'PAC-MAN//NEON', produto: 'site', area: 'geral', demo: '../pacman/' },
    'restaurante-360': { nome: 'Restaurante 360 — Brasa & Oliva', produto: 'site', area: 'restaurante', demo: '../restaurante-360/' },
    'site-de-turismo': { nome: 'Horizon Travel — Agência de viagens', produto: 'site', area: 'geral', demo: '../site-de-turismo/' },
    'skillmatch': { nome: 'SkillMatch — Vagas compatíveis', produto: 'site', area: 'geral', demo: '../skillmatch/' },
    'tutor-ia': { nome: 'Lina — Tutor de Inglês com IA', produto: 'site', area: 'geral', demo: '../tutor-ia/' }
  };

  function get(id) {
    return Object.prototype.hasOwnProperty.call(mapa, id) ? mapa[id] : null;
  }

  function ids() {
    return Object.keys(mapa);
  }

  function todas() {
    var copia = {};
    ids().forEach(function (id) {
      copia[id] = { nome: mapa[id].nome, produto: mapa[id].produto, area: mapa[id].area, demo: mapa[id].demo };
    });
    return copia;
  }

  return { get: get, ids: ids, todas: todas };
}));
