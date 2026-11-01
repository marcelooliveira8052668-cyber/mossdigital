/* ==========================================================================
   PRESETS-5 — MOSS Digital
   Eu criei este arquivo para a demo "assistencia" (Assistência Técnica de
   Celular), o 25º nicho do catálogo. O visual é tech: azul elétrico sobre
   fundo escuro, tipografia sem serifa e linguagem de oficina de verdade.
   Ordem de carregamento: presets -> 2 -> 3 -> 4 -> 5.
   ========================================================================== */

/* Eu registro a demo na lista do painel de escolha (?painel=1). */
window.SITE_PRESET_LIST.push.apply(window.SITE_PRESET_LIST, [
  { "id": "assistencia", "nome": "Assistência de Celular", "icone": "C" }
]);

/* Eu declaro o espaço da nova preset no objeto global de presets. */
window.SITE_PRESETS = window.SITE_PRESETS || {};

window.SITE_PRESETS["assistencia"] = {

  /* MARCA — nome, slogan e logos do negócio fictício */
  "brand": {
    "name": "Ponto Certo",
    "tagline": "Assistência técnica de celular",
    "logo": "assets/img/assistencia/logo.svg",
    "logoDark": "assets/img/assistencia/logo-light.svg",
    "favicon": "assets/img/assistencia/favicon.svg"
  },

  /* CORES E FONTES — azul elétrico, fundo escuro e cantos arredondados */
  "theme": {
    "primary": "#0ea5e9",
    "primaryDark": "#0284c7",
    "secondary": "#0d1b2c",
    "accent": "#7dd3fc",
    "success": "#16a34a",
    "error": "#dc2626",
    "radius": "14px",
    "fontHeading": "'Space Grotesk', 'Inter', system-ui, sans-serif",
    "fontBody": "'Inter', system-ui, sans-serif"
  },

  /* META — o que aparece na aba e nos resultados do Google */
  "meta": {
    "title": "Ponto Certo — Assistência Técnica de Celular em São Paulo",
    "description": "Troca de tela, bateria e conserto de placa com orçamento na hora. Diagnóstico grátis, garantia de 90 dias e retirada em domicílio.",
    "ogImage": "assets/img/assistencia/heroi-assistencia.svg"
  },

  /* MENU — os itens do topo e para onde cada um leva */
  "nav": [
    { "label": "Início", "href": "#inicio" },
    { "label": "Serviços", "href": "#cardapio" },
    { "label": "Sobre", "href": "#sobre" },
    { "label": "Galeria", "href": "#galeria" },
    { "label": "Contato", "href": "#contato" }
  ],

  /* PRIMEIRA DOBRA — a capa que o cliente vê ao abrir o link */
  "hero": {
    "tag": "Diagnóstico grátis · Garantia de 90 dias",
    "title": "Seu celular volta a funcionar no mesmo dia",
    "subtitle": "Tela trincada, bateria viciada ou placa doente: a gente resolve na hora quando dá, e avisa o prazo quando não. Sem surpresa no orçamento.",
    "primaryCta": { "label": "Pedir orçamento no WhatsApp", "href": "#contato" },
    "secondaryCta": { "label": "Ver serviços e preços", "href": "#cardapio" },
    "image": "assets/img/assistencia/heroi-assistencia.svg"
  },

  /* NÚMEROS — os números grandes sob a capa */
  "stats": [
    { "value": 8500, "suffix": "+", "label": "Celulares consertados" },
    { "value": 4.9, "suffix": "", "label": "Nota no Google" },
    { "value": 90, "suffix": " dias", "label": "De garantia no serviço" }
  ],

  /* TÍTULOS — o cabeçalho de cada seção do site */
  "sections": {
    "services": {
      "tag": "Serviços e valores",
      "title": "O que a gente resolve",
      "description": "Preços de referência para os reparos mais pedidos. O valor fechado sai após o diagnóstico gratuito do seu aparelho."
    },
    "portfolio": {
      "tag": "Bancada",
      "title": "Por dentro do nosso trabalho",
      "description": "Imagens ilustrativas dos reparos — no site do cliente entram fotos reais da oficina."
    },
    "about": {
      "tag": "A oficina",
      "title": "Oficina de verdade, não só balcão de troca"
    },
    "contact": {
      "tag": "Fale com a gente",
      "title": "Manda o problema que a gente orça",
      "description": "Chame no WhatsApp com a foto do aparelho e do problema — o orçamento sai no mesmo dia."
    }
  },

  /* SERVIÇOS — os cards de reparo com preço */
  "services": [
    {
      "icon": "design",
      "title": "Troca de tela",
      "description": "Tela original ou compatível de qualidade, com teste de touch e sensor na frente do cliente.",
      "price": "A partir de R$ 180"
    },
    {
      "icon": "fuel",
      "title": "Bateria nova",
      "description": "Bateria com selo de qualidade, troca rápida e teste de carga antes da entrega.",
      "price": "A partir de R$ 120"
    },
    {
      "icon": "code",
      "title": "Conserto de placa",
      "description": "Microsolda para celular que não liga, não carrega ou desliga sozinho.",
      "price": "A partir de R$ 250"
    },
    {
      "icon": "phone",
      "title": "Conector de carga e microfone",
      "description": "Troca de conector, microfone e alto-falante com teste completo no final.",
      "price": "A partir de R$ 90"
    },
    {
      "icon": "chart",
      "title": "Recuperação de dados",
      "description": "Resgate de fotos, contatos e arquivos de aparelhos que pararam de funcionar.",
      "price": "A partir de R$ 200"
    },
    {
      "icon": "support",
      "title": "Limpeza de líquidos",
      "description": "Ultrassom e secagem profunda para celular afogado — a chance de salvar é maior quando é rápido.",
      "price": "A partir de R$ 150"
    }
  ],

  /* GALERIA — os trabalhos com filtro por categoria */
  "portfolio": [
    {
      "title": "Tela trincada salva",
      "category": "Telas",
      "description": "Ilustração de celular com a tela trincada.",
      "image": "assets/img/assistencia/cel-1.svg",
      "url": "#"
    },
    {
      "title": "Bateria trocada na hora",
      "category": "Baterias",
      "description": "Ilustração de bateria de celular carregando.",
      "image": "assets/img/assistencia/cel-2.svg",
      "url": "#"
    },
    {
      "title": "Placa em microsolda",
      "category": "Placas",
      "description": "Ilustração de placa de celular com componentes.",
      "image": "assets/img/assistencia/cel-3.svg",
      "url": "#"
    },
    {
      "title": "Bancada de ferramentas",
      "category": "Oficina",
      "description": "Ilustração de bancada de conserto com ferramentas.",
      "image": "assets/img/assistencia/cel-4.svg",
      "url": "#"
    }
  ],

  /* SOBRE — a história da oficina com números e botão */
  "about": {
    "tag": "A oficina",
    "title": "Oficina de verdade, não só balcão de troca",
    "description": "A Ponto Certo abriu em 2013 com uma lupa, um ferro de solda e a mania de explicar o defeito antes de mexer em qualquer coisa. Doze anos depois, somos uma oficina completa, com microscópio, ultrassom e peças testadas — mas o combinado continua o mesmo: diagnóstico na sua frente, orçamento aprovado antes de começar e garantia escrita de 90 dias em todo reparo.",
    "image": "assets/img/assistencia/sobre-assistencia.svg",
    "stats": [
      { "value": 8500, "suffix": "+", "label": "Reparos entregues" },
      { "value": 12, "suffix": "", "label": "Anos de oficina" },
      { "value": 90, "suffix": " dias", "label": "De garantia" }
    ],
    "cta": { "label": "Quero um orçamento", "href": "#contato" }
  },

  /* CONTATO — telefone, WhatsApp, endereço, horário e mapa */
  "contact": {
    "tag": "Fale com a gente",
    "title": "Manda o problema que a gente orça",
    "description": "Chame no WhatsApp com a foto do aparelho e do problema — o orçamento sai no mesmo dia.",
    "phone": "(11) 94203-8103",
    "email": "orcamento@pontocerto.com.br",
    "whatsapp": "5511942038103",
    "address": "Rua do Comércio, 320 — São Paulo/SP",
    "hours": "Segunda a sábado, das 9h às 19h",
    "mapEmbed": "https://www.google.com/maps?q=Rua+do+Comercio+Sao+Paulo&output=embed",
    "social": {
      "instagram": "#",
      "facebook": "#",
      "linkedin": "#"
    }
  },

  /* RODAPÉ — textos do fim da página */
  "footer": {
    "description": "Assistência técnica de celular com diagnóstico grátis, orçamento honesto e garantia de 90 dias em São Paulo.",
    "credit": "© 2026 Ponto Certo Assistência Técnica. Todos os direitos reservados."
  }
};
