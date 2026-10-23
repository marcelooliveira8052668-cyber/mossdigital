/* ==========================================================================
   CONFIGURACAO DO SITE — EDITE AQUI
   ==========================================================================
   Este e o unico arquivo que voce precisa mexer. Cada bloco abaixo esta
   comentado. Troque o valor entre aspas, salve, e o site ja atualiza.

   Nao apague as chaves { }, as virgulas e as aspas.
   Se algo parar de funcionar, desfaca a alteracao (Ctrl+Z).
   ========================================================================== */
window.SITE_CONFIG = {
// NOME E MARCA — nome do negocio, slogan, logo e favicon
  "brand": {
    "name": "Lumière",
    "tagline": "Clínica de estética",
    "logo": "assets/img/est-logo.svg",
    "logoDark": "assets/img/est-logo-light.svg",
    "favicon": "assets/img/est-favicon.svg"
  },
// CORES E FONTES — troque "primary" e o site inteiro muda de cor
  "theme": {
    "primary": "#9d174d",
    "primaryDark": "#701a45",
    "secondary": "#2b061d",
    "accent": "#f59e0b",
    "success": "#16a34a",
    "error": "#dc2626",
    "radius": "18px",
    "fontHeading": "'Playfair Display', Georgia, serif",
    "fontBody": "'Inter', system-ui, -apple-system, sans-serif"
  },
// O QUE APARECE NO GOOGLE — titulo e descricao da aba e da busca
  "meta": {
    "title": "Lumière — Clínica de Estética em São Paulo",
    "description": "Tratamentos de estética com equipe médica, desde 2012. Limpeza de pele, Harmonização, depilação a laser e muito mais. Agende pelo WhatsApp.",
    "ogImage": "assets/img/est-hero.svg"
  },
// BANCO DE DADOS — "local" guarda no proprio navegador. So troque se tiver API
  "dataSource": {
    "provider": "local",
    "rest": {
      "baseUrl": "https://api.seudominio.com"
    },
    "supabase": {
      "url": "https://xxxxx.supabase.co",
      "anonKey": "sua-chave-anon"
    },
    "sheets": {
      "url": "https://script.google.com/macros/s/SEU_ID/exec"
    },
    "collections": [
      "portfolio",
      "services"
    ]
  },
// MENU — os itens do topo e para onde cada um leva
  "nav": [
    {
      "label": "Início",
      "href": "#inicio"
    },
    {
      "label": "Tratamentos",
      "href": "#cardapio"
    },
    {
      "label": "Sobre",
      "href": "#sobre"
    },
    {
      "label": "Galeria",
      "href": "#galeria"
    },
    {
      "label": "Agendar",
      "href": "#contato"
    }
  ],
// PRIMEIRA DOBRA — titulo, texto da capa e foto principal
  "hero": {
    "tag": "CNO · Equipe médica · 4,9 no Google",
    "title": "Cuidado que se nota na pele e na confiança",
    "subtitle": "Cada tratamento começa com uma consulta de avaliação, sem commitment. Só hacemos o que tem indicação para o seu caso — e sempre com protocolo médico.",
    "primaryCta": {
      "label": "Agendar avaliação",
      "href": "#contato"
    },
    "secondaryCta": {
      "label": "Ver tratamentos",
      "href": "#cardapio"
    },
    "image": "assets/img/fotos/heroi-estetica.jpg"
  },
// NUMEROS — os numeros grandes com legenda (ex.: anos de casa, clientes)
  "stats": [
    {
      "value": 14,
      "suffix": "",
      "label": "Anos de clínica"
    },
    {
      "value": 12000,
      "suffix": "+",
      "label": "Atendimentos"
    },
    {
      "value": 4.9,
      "suffix": "",
      "label": "Nota no Google"
    },
    {
      "value": 6,
      "suffix": "",
      "label": "Especialistas"
    }
  ],
// TITULOS — o titulo de cada secao do site
  "sections": {
    "services": {
      "tag": "Tratamentos",
      "title": "Escolha o que você quer cuidar",
      "description": "Clique em qualquer card para ver a ficha completa: o que é, quanto dura, quanto custa e os cuidados depois."
    },
    "portfolio": {
      "tag": "Galeria",
      "title": "Nosso espaço e resultados",
      "description": "Ambiente pensado para o seu conforto. As fotos são reais, tiradas aqui dentro."
    },
    "about": {
      "tag": "Nossa história",
      "title": "Estética séria começa em 2012"
    },
    "contact": {
      "tag": "Agendamento",
      "title": "Agende sua avaliação",
      "description": "A primeira consulta é gratuita e sem compromisso. Escolha o melhor dia e horário para você."
    }
  },
// SERVICOS / PRODUTOS — cada card. "price" e o preco que aparece nele
  "services": [
    {
      "icon": "star",
      "title": "Limpeza de Pele",
      "badge": "Mais pedido",
      "description": "Extração profissional, esfoliação enzimática e hidratação profunda em uma sessão.",
      "text": "Indicada para pele oleosa, mista ou com cravos e espinhas. Começamos com a esfoliação enzimática, que dissolve o sebo e remove células mortas sem agressão. Depois fazemos a extração manual com material esterilizado e finalizamos com uma máscara calmante. A pele sai mais clara e, se você seguir as orientações em casa, o intervalo entre sessões passa de 30 para 45 dias.",
      "price": "R$ 280",
      "image": "assets/img/fotos/beleza-1.jpg",
      "gallery": [
        "assets/img/fotos/beleza-2.jpg",
        "assets/img/fotos/beleza-3.jpg",
        "assets/img/fotos/beleza-4.jpg"
      ],
      "features": [
        "Esfoliação enzimática",
        "Extração manual esterilizada",
        "Máscara calmante e hidratação",
        {
          "label": "Duração",
          "value": "90 minutos"
        },
        {
          "label": "Intervalo",
          "value": "A cada 30 a 45 dias"
        },
        {
          "label": "Retorno",
          "value": "Visível já na 1ª sessão"
        }
      ],
      "cta": {
        "label": "Agendar limpeza de pele",
        "href": "#contato"
      }
    },
    {
      "icon": "heart",
      "title": "Harmonização Facial",
      "badge": "Procedimento médico",
      "description": "Preenchimento, toxina botulínica e harmonização de contorno com médico responsável.",
      "text": "Trabalhamos com ácido hialurônico e toxina botulínica de marcas certificadas. A consulta com a médica responsável define o plano: o que faz sentido alterar, o que é melhor deixar como está. Aplicamos com mapeamento simétrico e acompanhamos a evolução com retorno em 15 dias — sem custo.",
      "price": "A partir de R$ 690",
      "image": "assets/img/fotos/beleza-2.jpg",
      "gallery": [],
      "features": [
        "Consulta com médica responsável",
        "Marcas certificadas e lote registrado",
        "Mapeamento simétrico antes da aplicação",
        {
          "label": "Duração",
          "value": "60 minutos"
        },
        {
          "label": "Retorno",
          "value": "Gratuito em 15 dias"
        }
      ],
      "cta": {
        "label": "Agendar avaliação",
        "href": "#contato"
      }
    },
    {
      "icon": "rocket",
      "title": "Depilação a Laser",
      "description": "Laser de diodo com protocolo progressivo, para rosto, corpo e área íntima.",
      "text": "Usamos laser de diodo com sistema de resfriamento, o que deixa o tratamento bem mais confortável do que você imagina. O protocolo é progressivo: começamos com densidade alta e energia baixa para adaptação e aumentamos conforme a resposta da pele. A maioria das clientes precisa de 6 a 8 sessões, com intervalo de 21 dias.",
      "price": "R$ 390 a sessão",
      "image": "assets/img/fotos/beleza-1.jpg",
      "gallery": [],
      "features": [
        "Laser de diodo com resfriamento",
        "Protocolo progressivo por tipo de pele",
        "Óculos de proteção e avaliação prévia",
        {
          "label": "Duração",
          "value": "40 a 60 minutos"
        },
        {
          "label": "Sessões",
          "value": "6 a 8"
        },
        {
          "label": "Intervalo",
          "value": "21 dias"
        }
      ],
      "cta": {
        "label": "Agendar avaliação de pele",
        "href": "#contato"
      }
    },
    {
      "icon": "support",
      "title": "Massagem Relaxante",
      "description": "Relaxamento muscular, pedras quentes opcionais e finalização relaxante.",
      "text": "Indicada para quem trabalha muito tempo na frente da tela. A massagem trabalha lombar, cervical e ombros, que é onde a tensão se acumula. Terminamos com stones quentes para liberar as fáscias e cinco minutos de respiração guiada para descer a frequência cardíaca. Você sai daqui com a tensão lá embaixo.",
      "price": "R$ 220",
      "image": "assets/img/fotos/beleza-2.jpg",
      "gallery": [],
      "features": [
        "Relaxamento muscular",
        "Pedras quentes opcionais",
        "Finalização com respiração guiada",
        {
          "label": "Duração",
          "value": "60 ou 80 minutos"
        },
        {
          "label": "Indicação",
          "value": "Cervical, lombar e ombros"
        }
      ],
      "cta": {
        "label": "Agendar massagem",
        "href": "#contato"
      }
    },
    {
      "icon": "star",
      "title": "Design de Sobrancelha",
      "description": "Design com pinça e linha, seguindo o formato natural do seu rosto.",
      "text": "Trabalhamos com pinça e linha, sem tinta. Antes de começar, fazemos o desenho junto com você no espelho até ficar do jeito que você quer. A retirada é suave, sem machucar a pele sensível. Recomendamos repetir a cada 3 a 4 semanas para manter o formato.",
      "price": "R$ 90",
      "image": "assets/img/fotos/beleza-3.jpg",
      "gallery": [],
      "features": [
        "Pinça e linha, sem tinta",
        "Formato desenhado com você no espelho",
        "Retoque de pelos claros incluso",
        {
          "label": "Duração",
          "value": "40 minutos"
        },
        {
          "label": "Manutenção",
          "value": "A cada 3 a 4 semanas"
        }
      ],
      "cta": {
        "label": "Agendar design",
        "href": "#contato"
      }
    },
    {
      "icon": "users",
      "title": "Plano de Manutenção",
      "description": "Pacote mensal com os tratamentos que você mais precisa, num preço fechado.",
      "text": "Para quem já tem a rotina montada. Você escolhe os tratamentos e o número de sessões do mês, e o valor fica fechado — sem surpresa na fatura. Inclui avaliação periódica para ajustar o plano conforme o resultado. Cancelamento sem multa com 24h de antecedência.",
      "price": "R$ 590/mês",
      "image": "assets/img/fotos/beleza-4.jpg",
      "gallery": [],
      "features": [
        "Tratamentos combináveis",
        "Valor mensal fechado",
        "Avaliação periódica inclusa",
        {
          "label": "Economia",
          "value": "Até 25% sobre avulso"
        },
        {
          "label": "Flexibilidade",
          "value": "Remarcação sem custo"
        }
      ],
      "cta": {
        "label": "Falar sobre o plano",
        "href": "#contato"
      }
    }
  ],
// CATEGORIAS DA GALERIA — os filtros que ficam acima das fotos
  "portfolioFilters": [
    "Todos"
  ],
// GALERIA DE FOTOS — troque o valor de "image" para trocar a foto
  "portfolio": [
    {
      "title": "Nosso espaço",
      "category": "Estrutura",
      "description": "Sala individual, maca com aquecimento e música baixa.",
      "badge": "Estrutura",
      "text": "Cada sala tem maca com aquecimento, iluminação ajustável e som ambiente. Nada de luz de consultório: a sala foi desenhada para você relaxar, não para parecer clínica.",
      "image": "assets/img/fotos/fisio-1.jpg",
      "gallery": [],
      "features": [
        "Sala individual",
        "Maca com aquecimento",
        "Iluminação ajustável"
      ],
      "cta": {
        "label": "Agendar uma visita",
        "href": "#contato"
      }
    },
    {
      "title": "Cuidados com o rosto",
      "category": "Tratamentos",
      "description": "Resultado da harmonização depois de 60 dias de protocolo.",
      "text": "Foto real de cliente, 60 dias após o início do protocolo de harmonização. Peça autorização antes de publicar casos assim — sempre perguntamos.",
      "image": "assets/img/fotos/fisio-2.jpg",
      "gallery": [],
      "features": [
        "Antes e depois",
        "Protocolo de 60 dias",
        "Autorização da cliente"
      ],
      "cta": {
        "label": "Quero esse resultado",
        "href": "#contato"
      }
    },
    {
      "title": "Depilação a laser",
      "category": "Equipamento",
      "description": "Laser de diodo com sistema de resfriamento.",
      "text": "O resfriamento é o que torna o tratamento confortável. Além disso, trabalhamos com energia progressiva e todo cliente faz avaliação de fototipo antes da primeira sessão.",
      "image": "assets/img/fotos/fisio-3.jpg",
      "gallery": [],
      "features": [
        "Diodo com resfriamento",
        "Energia progressiva",
        "Avaliação de fototipo"
      ],
      "cta": {
        "label": "Agendar avaliação",
        "href": "#contato"
      }
    },
    {
      "title": "Resultados",
      "category": "Depoimentos",
      "description": "O que dizem as clientes depois de seis meses.",
      "text": "Reunimos os principais pontos que as clientes mais citam: o atendimento, a clareza dos valores e a verdade sobre o que precisa ou não precisa fazer.",
      "image": "assets/img/fotos/heroi-estetica.jpg",
      "gallery": [],
      "features": [
        "4,9 no Google",
        "Mais de 300 avaliações",
        "96% recomendariam"
      ],
      "cta": {
        "label": "Agendar avaliação",
        "href": "#contato"
      }
    }
  ],
// SOBRE — a historia do negocio e a foto do lado
  "about": {
    "tag": "Nossa história",
    "title": "Estética séria começa em 2012",
    "description": "A Lumière nasceu numa sala pequena com uma maca e uma missão clara: estética não é achismo, é técnica. Quatorze anos depois, somos seis profissionais — entre médicos, dentistas e enfermeiras — e seguimos com o mesmo princípio. Se não tem indicação para o seu caso, a gente fala. E se o tratamento é simples, a gente indica o simples. A confiança se constrói assim.",
    "image": "assets/img/fotos/beleza-1.jpg",
    "stats": [
      {
        "value": 14,
        "suffix": "",
        "label": "Anos de clínica"
      },
      {
        "value": 6,
        "suffix": "",
        "label": "Profissionais"
      },
      {
        "value": 4.9,
        "suffix": "",
        "label": "Nota no Google"
      }
    ],
    "cta": {
      "label": "Agendar avaliação",
      "href": "#contato"
    }
  },
// CONTATO — telefone, WhatsApp, e-mail, endereco, horario e mapa
  "contact": {
    "tag": "Agendamento",
    "title": "Agende sua avaliação",
    "description": "A primeira consulta é gratuita e sem compromisso. Escolha o melhor dia e horário para você.",
    "phone": "(11) 3555-2020",
    "email": "contato@lumiereestetica.com.br",
    "whatsapp": "5511913131313",
    "address": "Al. Santos, 1500, conj. 120 — São Paulo/SP",
    "hours": "Segunda a sexta, das 9h às 20h · Sábado, das 9h às 14h",
    "mapEmbed": "https://www.google.com/maps?q=Sao+Paulo&output=embed",
    "social": {
      "instagram": "#",
      "facebook": "#",
      "linkedin": "#",
      "github": "#"
    },
    "formMode": "whatsapp",
    "formWhatsTitle": "Novo agendamento pelo site",
    "formWhatsFooter": "Enviado pelo site",
    "formWhatsMsg": "Abrimos o WhatsApp com seu pedido escrito. É só tocar em enviar!",
    "formTitle": "Agendar avaliação gratuita",
    "formSubmit": "Confirmar horários",
    "formWhats": "Ou chame no WhatsApp",
    "formSuccess": "Agendamento recebido! Confirmamos o horário no WhatsApp em poucos minutos.",
    "formFields": [
      {
        "type": "text",
        "name": "nome",
        "label": "Nome",
        "placeholder": "Seu nome",
        "required": true,
        "half": true
      },
      {
        "type": "tel",
        "name": "telefone",
        "label": "WhatsApp",
        "placeholder": "(11) 99999-9999",
        "required": true,
        "half": true
      },
      {
        "type": "select",
        "name": "tratamento",
        "label": "Tratamento de interesse",
        "placeholder": "Escolha",
        "required": true,
        "half": true,
        "options": [
          "Limpeza de Pele",
          "Harmonização Facial",
          "Depilação a Laser",
          "Massagem Relaxante",
          "Design de Sobrancelha",
          "Plano de Manutenção"
        ]
      },
      {
        "type": "select",
        "name": "horario",
        "label": "Melhor horário",
        "placeholder": "Escolha",
        "required": true,
        "half": true,
        "options": [
          "Manhã (9h às 12h)",
          "Tarde (12h às 17h)",
          "Noite (17h às 20h)"
        ]
      },
      {
        "type": "date",
        "name": "data",
        "label": "Data preferida",
        "required": true,
        "half": true
      },
      {
        "type": "email",
        "name": "email",
        "label": "E-mail",
        "placeholder": "seu@email.com",
        "required": false,
        "half": true
      },
      {
        "type": "textarea",
        "name": "observacoes",
        "label": "Observações",
        "placeholder": "Alergias, gravidez, medicações em uso..."
      }
    ]
  },
// RODAPE — textos do fim da pagina: marca, links e copyright
  "footer": {
    "description": "Clínica de estética com equipe médica, desde 2012. Avaliação gratuita e protocolo sempre personalizado.",
    "credit": "© 2026 Lumière Clínica de Estética. Todos os direitos reservados."
  }
};
