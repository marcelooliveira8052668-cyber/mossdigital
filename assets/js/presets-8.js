/* ==========================================================================
   PRESETS-8 — MOSS Digital
   Eu criei este arquivo para a demo "bar" (Bar e Coquetelaria),
   o 28º nicho do catálogo. O visual é noturno e neon: quase preto com
   rosa fluorescente e ciano de letreiro, brilho de gás em cada destaque.
   Ordem de carregamento: presets -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8.
   ========================================================================== */

/* Eu registro a demo na lista do painel de escolha (?painel=1). */
window.SITE_PRESET_LIST.push.apply(window.SITE_PRESET_LIST, [
  { "id": "bar", "nome": "Bar e Coquetelaria", "icone": "B" }
]);

/* Eu declaro o espaço da nova preset no objeto global de presets. */
window.SITE_PRESETS = window.SITE_PRESETS || {};

window.SITE_PRESETS["bar"] = {

  /* MARCA — nome, slogan e logos do negócio fictício */
  "brand": {
    "name": "Bar Íris",
    "tagline": "Coquetelaria",
    "logo": "assets/img/bar/logo.svg",
    "logoDark": "assets/img/bar/logo-light.svg",
    "favicon": "assets/img/bar/favicon.svg"
  },

  /* CORES E FONTES — rosa neon, ciano de letreiro e fundo de madrugada */
  "theme": {
    "primary": "#ff2d95",
    "primaryDark": "#db2777",
    "secondary": "#0e0f1f",
    "accent": "#22d3ee",
    "success": "#16a34a",
    "error": "#dc2626",
    "radius": "14px",
    "fontHeading": "'Playfair Display', Georgia, serif",
    "fontBody": "'Inter', system-ui, sans-serif"
  },

  /* META — o que aparece na aba e nos resultados do Google */
  "meta": {
    "title": "Bar Íris — Coquetelaria em São Paulo",
    "description": "Coquetelaria com drinks autorais, clássicos da casa e petiscos até tarde. Reserve sua mesa pelo WhatsApp.",
    "ogImage": "assets/img/bar/heroi-bar.svg"
  },

  /* MENU — os itens do topo e para onde cada um leva */
  "nav": [
    { "label": "Início", "href": "#inicio" },
    { "label": "Drinks", "href": "#cardapio" },
    { "label": "Sobre", "href": "#sobre" },
    { "label": "Galeria", "href": "#galeria" },
    { "label": "Contato", "href": "#contato" }
  ],

  /* PRIMEIRA DOBRA — a capa que o cliente vê ao abrir o link */
  "hero": {
    "tag": "Coquetelaria artesanal · Aberto até de madrugada",
    "title": "Drinks que acendem a noite",
    "subtitle": "Clássicos bem feitos, criações autorais e a trilha certa: a sua mesa espera no balcão.",
    "primaryCta": { "label": "Reservar mesa no WhatsApp", "href": "#contato" },
    "secondaryCta": { "label": "Ver a carta de drinks", "href": "#cardapio" },
    "image": "assets/img/bar/heroi-bar.svg"
  },

  /* NÚMEROS — os números grandes sob a capa */
  "stats": [
    { "value": 80, "suffix": "+", "label": "Drinks na carta" },
    { "value": 4.8, "suffix": "", "label": "Nota no Google" },
    { "value": 6, "suffix": "", "label": "Anos de noite" }
  ],

  /* TÍTULOS — o cabeçalho de cada seção do site */
  "sections": {
    "services": {
      "tag": "A carta",
      "title": "O que sai do balcão",
      "description": "Valores de referência por categoria. A carta completa e as criações da semana estão no salão."
    },
    "portfolio": {
      "tag": "A noite",
      "title": "O clima do Íris em imagens",
      "description": "Ilustrações do ambiente — no site do cliente entram fotos reais do bar e dos drinks."
    },
    "about": {
      "tag": "O bar",
      "title": "Noite boa é aquela que vira rotina"
    },
    "contact": {
      "tag": "Reserve",
      "title": "Sua mesa está a uma mensagem",
      "description": "Chame no WhatsApp com a data e o número de pessoas — confirmamos a mesa na hora."
    }
  },

  /* SERVIÇOS — os cards de serviço com preço */
  "services": [
    {
      "icon": "star",
      "title": "Clássicos da casa",
      "description": "Negroni, Old Fashioned, Espresso Martini e os clássicos feitos na medida certa.",
      "price": "A partir de R$ 32"
    },
    {
      "icon": "design",
      "title": "Drinks autorais",
      "description": "Criações sazonais do bar, com ingredientes frescos e apresentação de assinar.",
      "price": "A partir de R$ 38"
    },
    {
      "icon": "coffee",
      "title": "Sem álcool",
      "description": "Mocktails e drinks sem álcool com a mesma cuidado e o mesmo sabor de festa.",
      "price": "A partir de R$ 24"
    },
    {
      "icon": "users",
      "title": "Degustação em dueto",
      "description": "Escolha quatro drinks em tamanho degustação e divida com quem senta do seu lado.",
      "price": "A partir de R$ 70"
    },
    {
      "icon": "burger",
      "title": "Petiscos da cozinha",
      "description": "Porções salgadas, queijos e frios pensados para acompanhar o drink sem pesar.",
      "price": "A partir de R$ 28"
    },
    {
      "icon": "calendar",
      "title": "Música ao vivo",
      "description": "Sextas e sábados com banda ou DJ — clima de casa cheia sem perder a conversa.",
      "price": "Entrada gratuita"
    }
  ],

  /* GALERIA — os trabalhos com filtro por categoria */
  "portfolio": [
    {
      "title": "Shaker em ação",
      "category": "Balcão",
      "description": "Ilustração neon de coquetel shaker.",
      "image": "assets/img/bar/bar-1.svg",
      "url": "#"
    },
    {
      "title": "Carta de garrafas",
      "category": "Seleção",
      "description": "Ilustração neon de prateleira de garrafas.",
      "image": "assets/img/bar/bar-2.svg",
      "url": "#"
    },
    {
      "title": "Drink da semana",
      "category": "Drinks",
      "description": "Ilustração neon de drink com limão.",
      "image": "assets/img/bar/bar-3.svg",
      "url": "#"
    },
    {
      "title": "Noite de música",
      "category": "Agenda",
      "description": "Ilustração neon de microfone e notas.",
      "image": "assets/img/bar/bar-4.svg",
      "url": "#"
    }
  ],

  /* SOBRE — a história do bar com números e botão */
  "about": {
    "tag": "O bar",
    "title": "Noite boa é aquela que vira rotina",
    "description": "O Bar Íris abriu em 2019 com um balcão de seis lugares, uma lista de clássicos escrita à mão e a teoria de que bem-vindo é quem chega tarde. Hoje a lista passou de 80 drinks, a casa tem mesa na calçada e música ao vivo nas sextas — mas o combinado é o mesmo: drink feito na hora, conversa sem pressa e servidor que lembra do seu pedido.",
    "image": "assets/img/bar/sobre-bar.svg",
    "stats": [
      { "value": 80, "suffix": "+", "label": "Drinks na carta" },
      { "value": 6, "suffix": "", "label": "Anos de noite" },
      { "value": 4.8, "suffix": "", "label": "Nota no Google" }
    ],
    "cta": { "label": "Quero reservar uma mesa", "href": "#contato" }
  },

  /* CONTATO — telefone, WhatsApp, endereço, horário e mapa */
  "contact": {
    "tag": "Reserve",
    "title": "Sua mesa está a uma mensagem",
    "description": "Chame no WhatsApp com a data e o número de pessoas — confirmamos a mesa na hora.",
    "phone": "(11) 94203-8103",
    "email": "reservas@bariris.com.br",
    "whatsapp": "5511942038103",
    "address": "Rua Augusta, 1200 — São Paulo/SP",
    "hours": "Terça a domingo, das 18h às 2h",
    "mapEmbed": "https://www.google.com/maps?q=Rua+Augusta+1200+Sao+Paulo&output=embed",
    "social": {
      "instagram": "#",
      "facebook": "#",
      "linkedin": "#"
    }
  },

  /* RODAPÉ — textos do fim da página */
  "footer": {
    "description": "Coquetelaria com drinks autorais, clássicos da casa e música ao vivo em São Paulo.",
    "credit": "© 2026 Bar Íris Coquetelaria. Todos os direitos reservados."
  }
};
