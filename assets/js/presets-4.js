/* ==========================================================================
   PRESETS-4 — MOSS Digital
   Eu acrescentei este arquivo para guardar presets novas sem mexer nas
   anteriores. Aqui dentro está a demo "tatuagem" (Studio de Tatuagem),
   o 24º nicho do catálogo, com visual dark premium e dourado — bem
   diferente das demos claras que já existiam.
   A ordem de carregamento importa: presets.js -> presets-2 -> presets-3 -> presets-4.
   ========================================================================== */

/* Eu registro a nova demo na lista do painel de escolha (?painel=1). */
window.SITE_PRESET_LIST.push.apply(window.SITE_PRESET_LIST, [
  { "id": "tatuagem", "nome": "Studio de Tatuagem", "icone": "T" }
]);

/* Eu declaro a preset completa: tudo que o app.js precisa para montar o site. */
window.SITE_PRESETS = window.SITE_PRESETS || {};

window.SITE_PRESETS["tatuagem"] = {

  /* MARCA — nome, slogan, logo e favicon do studio fictício */
  "brand": {
    "name": "Agulha de Ouro",
    "tagline": "Studio de tatuagem autoral",
    "logo": "assets/img/tatuagem/logo.svg",
    "logoDark": "assets/img/tatuagem/logo-light.svg",
    "favicon": "assets/img/tatuagem/favicon.svg"
  },

  /* CORES E FONTES — dourado sobre preto, com serifa clássica nos títulos */
  "theme": {
    "primary": "#d4a24e",
    "primaryDark": "#b0812f",
    "secondary": "#12100e",
    "accent": "#f4d78c",
    "success": "#16a34a",
    "error": "#dc2626",
    "radius": "10px",
    "fontHeading": "'Cormorant Garamond', Georgia, serif",
    "fontBody": "'Inter', system-ui, sans-serif"
  },

  /* META — é o que aparece na aba e nos resultados do Google */
  "meta": {
    "title": "Agulha de Ouro — Studio de Tatuagem Autoral em São Paulo",
    "description": "Tatuagem autoral, fine line e blackwork com agenda aberta. Estúdio com material descartável, higiene certificada e orçamento pelo WhatsApp.",
    "ogImage": "assets/img/tatuagem/heroi-tatuagem.svg"
  },

  /* MENU — os itens do topo e para onde cada um leva */
  "nav": [
    { "label": "Início", "href": "#inicio" },
    { "label": "Estilos", "href": "#cardapio" },
    { "label": "Sobre", "href": "#sobre" },
    { "label": "Galeria", "href": "#galeria" },
    { "label": "Contato", "href": "#contato" }
  ],

  /* PRIMEIRA DOBRA — a capa que o cliente vê ao abrir o link */
  "hero": {
    "tag": "Agenda aberta · avaliação de projeto grátis",
    "title": "A sua tatuagem começa com uma boa conversa",
    "subtitle": "Traço autoral em fine line, blackwork e ornamental. Você descreve a ideia, eu desenho na medida do seu corpo e só tatuamos quando você amar o projeto.",
    "primaryCta": { "label": "Agendar pelo WhatsApp", "href": "#contato" },
    "secondaryCta": { "label": "Ver a galeria", "href": "#galeria" },
    "image": "assets/img/tatuagem/heroi-tatuagem.svg"
  },

  /* NÚMEROS — os números grandes que aparecem sob a capa */
  "stats": [
    { "value": 3200, "suffix": "+", "label": "Tatuagens feitas" },
    { "value": 4.9, "suffix": "", "label": "Nota no Google" },
    { "value": 9, "suffix": "", "label": "Anos de estrada" }
  ],

  /* TÍTULOS — o texto de cabeçalho de cada seção do site */
  "sections": {
    "services": {
      "tag": "Estilos e valores",
      "title": "Escolha o seu estilo",
      "description": "Valores de referência por peça. O fechamento sai do orçamento, considerando tamanho, local do corpo e tempo de sessão."
    },
    "portfolio": {
      "tag": "Galeria",
      "title": "Traços que já saíram da agulha",
      "description": "Artes ilustrativas em quatro estilos — no site do cliente entram fotos reais do trabalho."
    },
    "about": {
      "tag": "O studio",
      "title": "Cada cliente vira uma história na pele"
    },
    "contact": {
      "tag": "Agende",
      "title": "Vamos desenhar a sua ideia",
      "description": "Chame no WhatsApp, conte a ideia e o local do corpo — o retorno com o orçamento sai em até 24 horas."
    }
  },

  /* SERVIÇOS — os cards de estilos com preço */
  "services": [
    {
      "icon": "design",
      "title": "Fine line",
      "description": "Traço fino e delicado, linhas limpas e mínimas. Ótimo para flores, símbolos e letras.",
      "price": "A partir de R$ 250"
    },
    {
      "icon": "shield",
      "title": "Blackwork",
      "description": "Preenchimento sólido em preto, contraste forte e presença na pele.",
      "price": "A partir de R$ 350"
    },
    {
      "icon": "star",
      "title": "Ornamental",
      "description": "Composições com mandalas e detalhes que acompanham o formato do corpo.",
      "price": "A partir de R$ 400"
    },
    {
      "icon": "heart",
      "title": "Flash autoral",
      "description": "Desenhos exclusivos, feitos uma única vez — quem pega, leva o original.",
      "price": "A partir de R$ 300"
    },
    {
      "icon": "clock",
      "title": "Hora técnica",
      "description": "Sessões longas de cobertura e projetos grandes, cobradas por hora.",
      "price": "R$ 180 / hora"
    },
    {
      "icon": "check",
      "title": "Retoque",
      "description": "Retoque gratuito de até 90 dias para clientes do studio, com orientação de cuidado.",
      "price": "Grátis"
    }
  ],

  /* GALERIA — as fotos dos trabalhos, com filtro por categoria */
  "portfolio": [
    {
      "title": "Rosa em fine line",
      "category": "Fine line",
      "description": "Ilustração de rosa em traço fino, exemplo de estilo.",
      "image": "assets/img/tatuagem/tat-1.svg",
      "url": "#"
    },
    {
      "title": "Cobra blackwork",
      "category": "Blackwork",
      "description": "Ilustração de cobra com preenchimento sólido, exemplo de estilo.",
      "image": "assets/img/tatuagem/tat-2.svg",
      "url": "#"
    },
    {
      "title": "Lua minimalista",
      "category": "Minimalista",
      "description": "Ilustração de lua crescente com folhas, exemplo de estilo.",
      "image": "assets/img/tatuagem/tat-3.svg",
      "url": "#"
    },
    {
      "title": "Lótus ornamental",
      "category": "Ornamental",
      "description": "Ilustração de flor de lótus com raios, exemplo de estilo.",
      "image": "assets/img/tatuagem/tat-4.svg",
      "url": "#"
    }
  ],

  /* SOBRE — a história do studio com números e botão */
  "about": {
    "tag": "O studio",
    "title": "Cada cliente vira uma história na pele",
    "description": "A Agulha de Ouro nasceu em 2017 num canto de ateliê alugado, com uma cadeira, uma máquina e a teimosia de fazer arte sob medida. Nove anos depois, o ritual continua igual: conversa franca sobre a ideia, desenho exclusivo e sessão sem pressa, com material 100% descartável e certificado de autenticidade da arte. Aqui ninguém sai com um desenho igual ao de outra pessoa.",
    "image": "assets/img/tatuagem/sobre-tatuagem.svg",
    "stats": [
      { "value": 3200, "suffix": "+", "label": "Sessões realizadas" },
      { "value": 100, "suffix": "%", "label": "Material descartável" },
      { "value": 4.9, "suffix": "", "label": "Nota no Google" }
    ],
    "cta": { "label": "Quero agendar", "href": "#contato" }
  },

  /* CONTATO — telefone, WhatsApp, endereço, horário e mapa */
  "contact": {
    "tag": "Agende",
    "title": "Vamos desenhar a sua ideia",
    "description": "Chame no WhatsApp, conte a ideia e o local do corpo — o retorno com o orçamento sai em até 24 horas.",
    "phone": "(11) 94203-8103",
    "email": "agenda@agulhadeouro.com.br",
    "whatsapp": "5511942038103",
    "address": "Rua Aurora, 210 — São Paulo/SP",
    "hours": "Terça a sábado, das 10h às 20h",
    "mapEmbed": "https://www.google.com/maps?q=Rua+Aurora+Sao+Paulo&output=embed",
    "social": {
      "instagram": "#",
      "facebook": "#",
      "linkedin": "#"
    }
  },

  /* RODAPÉ — textos do fim da página */
  "footer": {
    "description": "Tatuagem autoral com projeto sob medida, material descartável e agenda aberta em São Paulo.",
    "credit": "© 2026 Agulha de Ouro Studio. Todos os direitos reservados."
  }
};
