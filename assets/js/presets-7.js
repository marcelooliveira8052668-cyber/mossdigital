/* ==========================================================================
   PRESETS-7 — MOSS Digital
   Eu criei este arquivo para a demo "festas" (Casa de Festas),
   o 27º nicho do catálogo. O visual é festivo e elegante: rosa magenta
   sobre roxo profundo, dourado de confete e títulos em serifa.
   Ordem de carregamento: presets -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.
   ========================================================================== */

/* Eu registro a demo na lista do painel de escolha (?painel=1). */
window.SITE_PRESET_LIST.push.apply(window.SITE_PRESET_LIST, [
  { "id": "festas", "nome": "Casa de Festas", "icone": "F" }
]);

/* Eu declaro o espaço da nova preset no objeto global de presets. */
window.SITE_PRESETS = window.SITE_PRESETS || {};

window.SITE_PRESETS["festas"] = {

  /* MARCA — nome, slogan e logos do negócio fictício */
  "brand": {
    "name": "Celebra",
    "tagline": "Casa de Festas",
    "logo": "assets/img/festas/logo.svg",
    "logoDark": "assets/img/festas/logo-light.svg",
    "favicon": "assets/img/festas/favicon.svg"
  },

  /* CORES E FONTES — rosa de festa, roxo de noite, dourado de confete */
  "theme": {
    "primary": "#db2777",
    "primaryDark": "#be185d",
    "secondary": "#28084a",
    "accent": "#fbbf24",
    "success": "#16a34a",
    "error": "#dc2626",
    "radius": "24px",
    "fontHeading": "'Playfair Display', Georgia, serif",
    "fontBody": "'Inter', system-ui, sans-serif"
  },

  /* META — o que aparece na aba e nos resultados do Google */
  "meta": {
    "title": "Celebra — Casa de Festas em São Paulo",
    "description": "Salão de festas para aniversário, casamento e formatura com decoração, buffet e data reservada na hora. Monte sua festa pelo WhatsApp.",
    "ogImage": "assets/img/festas/heroi-festas.svg"
  },

  /* MENU — os itens do topo e para onde cada um leva */
  "nav": [
    { "label": "Início", "href": "#inicio" },
    { "label": "Pacotes", "href": "#cardapio" },
    { "label": "Galeria", "href": "#galeria" },
    { "label": "Sobre", "href": "#sobre" },
    { "label": "Contato", "href": "#contato" }
  ],

  /* PRIMEIRA DOBRA — a capa que o cliente vê ao abrir o link */
  "hero": {
    "tag": "Datas abertas para 2026 · Reserva sem entrada",
    "title": "A festa que você sempre sonhou começa aqui",
    "subtitle": "Salão decorado, buffet montado e equipe cuidando de tudo — você só precisa chegar e aproveitar.",
    "primaryCta": { "label": "Reservar data no WhatsApp", "href": "#contato" },
    "secondaryCta": { "label": "Ver pacotes e valores", "href": "#cardapio" },
    "image": "assets/img/festas/heroi-festas.svg"
  },

  /* NÚMEROS — os números grandes sob a capa */
  "stats": [
    { "value": 1200, "suffix": "+", "label": "Festas realizadas" },
    { "value": 4.9, "suffix": "", "label": "Nota no Google" },
    { "value": 30, "suffix": "min", "label": "Para confirmar sua data" }
  ],

  /* TÍTULOS — o cabeçalho de cada seção do site */
  "sections": {
    "services": {
      "tag": "Pacotes e valores",
      "title": "Jeitos diferentes de celebrar",
      "description": "Valores de referência por pacote. O orçamento fechado sai depois de definir data, número de convidados e o que você quer incluir."
    },
    "portfolio": {
      "tag": "Galeria",
      "title": "Festas que a gente fez acontecer",
      "description": "Ilustrações dos ambientes — no site do cliente entram fotos reais de cada evento."
    },
    "about": {
      "tag": "A casa",
      "title": "Cuidar da sua festa é o nosso dia a dia"
    },
    "contact": {
      "tag": "Reserve agora",
      "title": "Qual é a data da sua festa?",
      "description": "Chame no WhatsApp com a data e o tipo de evento — respondemos com as opções disponíveis na hora."
    }
  },

  /* SERVIÇOS — os cards de pacote com preço */
  "services": [
    {
      "icon": "location",
      "title": "Salão decorado",
      "description": "Salão climatizado com decoração de balões, mesas postas e som liberado para até 150 convidados.",
      "price": "A partir de R$ 2.400"
    },
    {
      "icon": "star",
      "title": "Aniversário infantil",
      "description": "Tema à escolha, cantinho dos brinquedos, bolo personalizado e animação por 3 horas.",
      "price": "A partir de R$ 1.800"
    },
    {
      "icon": "heart",
      "title": "Casamento e noivado",
      "description": "Cerimônia no jardim, recepção coberta, decoração personalizada e suíte para os noivos.",
      "price": "A partir de R$ 6.900"
    },
    {
      "icon": "users",
      "title": "Formatura",
      "description": "Espaço para turmas inteiras, passarela, buffet montado e coordenação do cronograma da noite.",
      "price": "Sob orçamento"
    },
    {
      "icon": "design",
      "title": "Decoração temática",
      "description": "Painel de flores, arco de balões, mesa de doces e cenografia no estilo que você escolher.",
      "price": "A partir de R$ 750"
    },
    {
      "icon": "cart",
      "title": "Buffet e barra de doces",
      "description": "Salgados, espetinhos, doces variados e bebidas servidos pela nossa equipe.",
      "price": "A partir de R$ 89 por pessoa"
    }
  ],

  /* GALERIA — os trabalhos com filtro por categoria */
  "portfolio": [
    {
      "title": "Balões em toda a festa",
      "category": "Decoração",
      "description": "Ilustração de buquê de balões coloridos.",
      "image": "assets/img/festas/fest-1.svg",
      "url": "#"
    },
    {
      "title": "Bolo com velas acesas",
      "category": "Doces",
      "description": "Ilustração de bolo de festa com três velas.",
      "image": "assets/img/festas/fest-2.svg",
      "url": "#"
    },
    {
      "title": "Mesa posta para os convidados",
      "category": "Buffet",
      "description": "Ilustração de mesa posta com pratos e taças.",
      "image": "assets/img/festas/fest-3.svg",
      "url": "#"
    },
    {
      "title": "Pista pronta para dançar",
      "category": "Espaço",
      "description": "Ilustração de espelho de pista com notas musicais.",
      "image": "assets/img/festas/fest-4.svg",
      "url": "#"
    }
  ],

  /* SOBRE — a história da casa com números e botão */
  "about": {
    "tag": "A casa",
    "title": "Cuidar da sua festa é o nosso dia a dia",
    "description": "A Celebra começou em 2011 com um salão alugado para aniversários de bairro e a vontade de que cada evento fosse único. Hoje são três espaços climatizados, equipe própria de decoração e buffet, e um compromisso simples: sua festa fica pronta antes do primeiro convidado chegar — e você não precisa ligar atrás de ninguém no dia.",
    "image": "assets/img/festas/sobre-festas.svg",
    "stats": [
      { "value": 1200, "suffix": "+", "label": "Festas realizadas" },
      { "value": 15, "suffix": "", "label": "Anos de casa" },
      { "value": 98, "suffix": "%", "label": "Clientes satisfeitos" }
    ],
    "cta": { "label": "Quero reservar uma data", "href": "#contato" }
  },

  /* CONTATO — telefone, WhatsApp, endereço, horário e mapa */
  "contact": {
    "tag": "Reserve agora",
    "title": "Qual é a data da sua festa?",
    "description": "Chame no WhatsApp com a data e o tipo de evento — respondemos com as opções disponíveis na hora.",
    "phone": "(11) 94203-8103",
    "email": "festas@celebra.com.br",
    "whatsapp": "5511942038103",
    "address": "Rua das Acácias, 420 — São Paulo/SP",
    "hours": "Todos os dias, das 9h às 21h",
    "mapEmbed": "https://www.google.com/maps?q=Rua+das+Acacias+Sao+Paulo&output=embed",
    "social": {
      "instagram": "#",
      "facebook": "#",
      "linkedin": "#"
    }
  },

  /* RODAPÉ — textos do fim da página */
  "footer": {
    "description": "Casa de festas com salão decorado, buffet e equipe própria em São Paulo.",
    "credit": "© 2026 Celebra Casa de Festas. Todos os direitos reservados."
  }
};
