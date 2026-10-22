/* Textos de apoio BNCC — Língua Estrangeira: Inglês e Espanhol (ENEM) */
const TEXTOS_IDIOMAS = [
  /* ===================== INGLÊS — TRIMESTRE 1 ===================== */
  {
    id: "txt-ing-1",
    disciplina: "ingles",
    trimestre: 1,
    tipo: "anuncio",
    fonte: "Adaptado de campanha publicitária internacional",
    titulo: "Read Anywhere: Don't Pretend You Don't Read",
    habilidades: ["EM13LI101", "EM13LI102"],
    corpo: "<p><strong>CITY PUBLIC LIBRARY — READ ANYWHERE CAMPAIGN</strong></p><p>Do people still read? <em>Actually</em>, most of our members say they read more now than they did five years ago. Our digital library never closes: you can borrow an e-book at 2 a.m. if you feel like it. <em>Eventually</em>, everyone finds the book that changes the way they see the world. Don't <em>pretend</em> you are “not a reader” — we know you are. <em>Push</em> your limits, <em>support</em> your local library, and read something difficult today.</p>",
    questoes: [
      {
        enunciado: "No trecho “Actually, most of our members say they read more now than they did five years ago”, a palavra Actually indica uma ideia de:",
        alternativas: [
          "atualidade (equivalente a atualmente)",
          "frequência (de vez em quando)",
          "contraste com uma expectativa (na verdade, de fato)",
          "tempo futuro (mais tarde)",
          "certeza absoluta (sem dúvida)",
        ],
        correta: 2,
        comentario: "O anúncio abre com a pergunta “Do people still read?” e, em seguida, responde “Actually, most of our members say they read more now...”, corrigindo a dúvida inicial. Nesse contexto, actually equivale a “na verdade/de fato”, e não a “atualmente”: a evidência do contraste é a própria pergunta que introduz a resposta.",
      },
      {
        enunciado: "Em “Eventually, everyone finds the book that changes the way they see the world”, a palavra eventually expressa a ideia de:",
        alternativas: [
          "mais cedo ou mais tarde, depois de algum tempo",
          "de imediato, sem nenhuma demora",
          "com muita frequência",
          "quase nunca",
          "por acaso",
        ],
        correta: 0,
        comentario: "Eventually indica que algo acontece ao final de um período de espera: “mais cedo ou mais tarde”. Cuidado com o falso cognato — em português, “eventualmente” significa “de vez em quando”, mas em inglês eventually equivale a “finalmente/mais cedo ou mais tarde”. A frase do anúncio descreve uma descoberta que ocorre em algum momento da vida do leitor.",
      },
    ],
  },

  /* ===================== INGLÊS — TRIMESTRE 2 ===================== */
  {
    id: "txt-ing-2",
    disciplina: "ingles",
    trimestre: 2,
    tipo: "artigo",
    fonte: "Adaptado de matéria de jornal",
    titulo: "Green Streets: Cycling Plan to Double by 2030",
    habilidades: ["EM13LI101", "EM13LI103"],
    corpo: "<p><strong>Green streets: cycling plan to double by 2030</strong></p><p>Although the new bike lanes have reduced traffic jams in the city center, some shop owners complain about the loss of parking spaces. However, a recent survey shows that 78% of residents support the measure, and local businesses report more customers arriving by bike. Therefore, the city council decided to expand the program to three more neighborhoods. Moreover, researchers at the University of Leeds link daily cycling to lower stress levels and fewer sick days.</p><p>“We were wrong about the bikes,” admits one shopkeeper. “The cars never stopped, but now people do.”</p>",
    questoes: [
      {
        enunciado: "No trecho “However, a recent survey shows that 78% of residents support the measure”, o conector however estabelece uma relação de:",
        alternativas: [
          "adição de mais uma informação sobre o mesmo assunto",
          "causa da reclamação dos lojistas",
          "ordem temporal dos fatos narrados",
          "contraste com a informação anterior",
          "conclusão do raciocínio do autor",
        ],
        correta: 3,
        comentario: "A frase anterior apresenta a reclamação dos lojistas (“some shop owners complain about the loss of parking spaces”), e however introduz a pesquisa favorável (78% dos moradores apoiam a medida). O conector however equivale a “no entanto” e sempre marca oposição entre as ideias — a evidência está na passagem da queixa para o dado que a contraria.",
      },
      {
        enunciado: "Em “Therefore, the city council decided to expand the program to three more neighborhoods”, a palavra therefore indica que a decisão do conselho é:",
        alternativas: [
          "uma hipótese sem relação com os dados do texto",
          "uma consequência dos dados apresentados no texto",
          "uma oposição direta ao resultado da pesquisa",
          "um fato anterior à realização da pesquisa",
          "uma condição para a construção das ciclovias",
        ],
        correta: 1,
        comentario: "Therefore equivale a “portanto” e introduz uma conclusão apoiada no que vem antes: a pesquisa registra 78% de apoio dos moradores e as empresas relatam mais clientes que chegam de bicicleta. Esses dados sustentam logicamente a decisão de expandir o programa — a evidência são os argumentos que precedem o conector.",
      },
    ],
  },

  /* ===================== INGLÊS — TRIMESTRE 3 ===================== */
  {
    id: "txt-ing-3",
    disciplina: "ingles",
    trimestre: 3,
    tipo: "post",
    fonte: "Adaptado de postagem em rede social",
    titulo: "What If Small Habits Changed Everything?",
    habilidades: ["EM13LI101", "EM13LI202"],
    corpo: "<p><strong>@civicvoices</strong> · 2 h</p><p>What if small habits changed everything? <strong>If</strong> everyone supported local farmers, our towns <strong>would be</strong> stronger and our food fresher. But <strong>if</strong> we do not <strong>address</strong> this <strong>issue</strong> now, we will lose the farms that feed us. Today's topic <strong>underscores</strong> one point: climate action starts at the kitchen table.</p><p>If you had one dollar to spend, would you buy local?</p>",
    questoes: [
      {
        enunciado: "Em “If everyone supported local farmers, our towns would be stronger”, a estrutura verbal utilizada expressa:",
        alternativas: [
          "um fato verdadeiro e frequente no presente",
          "uma possibilidade muito provável para o futuro",
          "uma situação hipotética e improvável no presente",
          "uma ordem ou pedido direto ao leitor",
          "uma ação já concluída no passado",
        ],
        correta: 2,
        comentario: "A combinação de If + passado simples (supported) com would + infinitivo (would be) forma a segunda condicional, usada para falar de situações imaginárias. A evidência está no próprio texto: a frase admite que hoje nem todos apoiam os agricultores locais (“If everyone supported...”), por isso trata de uma hipótese, e não de um fato real.",
      },
      {
        enunciado: "Em “if we do not address this issue now, we will lose the farms that feed us”, o verbo address significa, no contexto:",
        alternativas: [
          "escrever o endereço de uma carta",
          "mudar-se para um novo endereço",
          "tratar de ou enfrentar um problema",
          "pronunciar um discurso para uma plateia",
          "aumentar o preço de um produto",
        ],
        correta: 2,
        comentario: "Address é um falso amigo do português: como substantivo, significa “endereço”, mas na expressão “address this issue” funciona como verbo e quer dizer “tratar de, enfrentar”. A evidência é a consequência anunciada na própria frase — “we will lose the farms that feed us” —, que só faz sentido se o problema for enfrentado agora.",
      },
    ],
  },

  /* ===================== ESPANHOL — TRIMESTRE 1 ===================== */
  {
    id: "txt-esp-1",
    disciplina: "espanhol",
    trimestre: 1,
    tipo: "noticia",
    fonte: "Adaptado de matéria de jornal espanhol",
    titulo: "Carmen Ruiz presenta su novela en la Biblioteca Nacional",
    habilidades: ["EM13LE101", "EM13LE102"],
    corpo: "<p><strong>Carmen Ruiz presenta su novela en la Biblioteca Nacional</strong></p><p>Madrid, 15 de marzo. La periodista Carmen Ruiz presentó ayer su nueva novela, que ya es un éxito de crítica. La obra tiene un largo recorrido por la historia de tres generaciones de su familia. “Actualmente estoy realizando una investigación sobre mujeres periodistas del siglo XX”, declaró la autora durante el acto. La novela, aventuró Ruiz, nació de una anécdota personal: “Cuando empecé a escribir el primer capítulo, mi mejor amiga estaba embarazada, y su alegría me sirvió de inspiración”.</p>",
    questoes: [
      {
        enunciado: "No trecho “mi mejor amiga estaba embarazada, y su alegría me sirvió de inspiración”, a palavra embarazada significa:",
        alternativas: [
          "envergonhada, com vergonha",
          "apressada, com muita pressa",
          "grávida, esperando um bebê",
          "surpresa, admirada",
          "emocionada, comovida",
        ],
        correta: 2,
        comentario: "Embarazada é um falso cognato clássico: em espanhol significa “grávida” (a forma espanhola equivalente a “envergonhada” seria avergonzada). A evidência está na continuação da frase — “su alegría me sirvió de inspiración” —: a alegria da amiga se relaciona com a espera de um bebê, e não com vergonha.",
      },
      {
        enunciado: "Em “La obra tiene un largo recorrido por la historia de tres generaciones de su familia”, a expressão largo recorrido significa:",
        alternativas: [
          "um percurso curto e rápido",
          "um espaço amplo e vazio",
          "um erro de tradução",
          "uma trilha perigosa",
          "uma longa trajetória",
        ],
        correta: 4,
        comentario: "Largo, em espanhol, quer dizer “comprido, longo”; em português, “largo” significa “amplo” (oposto de estreito), e o termo equivalente ao espanhol é “longo”. A evidência está no complemento da frase: a obra percorre “la historia de tres generaciones de su familia”, ou seja, uma trajetória longa no tempo.",
      },
    ],
  },

  /* ===================== ESPANHOL — TRIMESTRE 2 ===================== */
  {
    id: "txt-esp-2",
    disciplina: "espanhol",
    trimestre: 2,
    tipo: "cartaz",
    fonte: "Adaptado de cartaz de campanha ambiental",
    titulo: "Pequeños gestos, grandes cambios",
    habilidades: ["EM13LE101", "EM13LE103"],
    corpo: "<p><strong>PEQUEÑOS GESTOS, GRANDES CAMBIOS</strong></p><p>Aunque el problema parece enorme, tú puedes empezar hoy. Pero no tires envases de plástico en la calle. Sin embargo, reciclar no es suficiente: además, tu dinero también vota. Por lo tanto, reduce, reutiliza y recicla. El planeta no tiene un plan B.</p>",
    questoes: [
      {
        enunciado: "No cartaz, a expressão “Sin embargo, reciclar no es suficiente” introduz uma ideia de:",
        alternativas: [
          "causa do problema ambiental",
          "contraste em relação à ideia anterior de que cada pessoa pode começar hoje",
          "sequência temporal das ações recomendadas",
          "comparação de igualdade entre as atitudes",
          "condição para que se possa reciclar",
        ],
        correta: 1,
        comentario: "Sin embargo equivale a “no entanto” e marca contraste. A frase anterior incentiva a ação individual (“tú puedes empezar hoy”), e a seguinte a relativiza (“reciclar no es suficiente”). A evidência da oposição está na passagem do incentivo (“puedes empezar hoy”) para a ressalva (“no es suficiente”).",
      },
      {
        enunciado: "Em “Por lo tanto, reduce, reutiliza y recicla”, a expressão por lo tanto serve para:",
        alternativas: [
          "introduzir uma dúvida sobre as atitudes recomendadas",
          "negar a informação apresentada antes",
          "apresentar um exemplo de produto reciclável",
          "marcar uma conclusão que decorre das ideias anteriores",
          "indicar que a ação só acontecerá num futuro distante",
        ],
        correta: 3,
        comentario: "Por lo tanto significa “portanto” e anuncia a conclusão do raciocínio do cartaz. Depois de afirmar que reciclar não basta e que o dinheiro do consumidor também “vota”, o cartaz conclui com as três ações possíveis — “reduce, reutiliza y recicla”. A evidência são as ideias anteriores, que sustentam essa conclusão prática.",
      },
    ],
  },

  /* ===================== ESPANHOL — TRIMESTRE 3 ===================== */
  {
    id: "txt-esp-3",
    disciplina: "espanhol",
    trimestre: 3,
    tipo: "menu",
    fonte: "Adaptado de cardápio de restaurante espanhol",
    titulo: "Restaurante El Rincón — Carta de temporada",
    habilidades: ["EM13LE101", "EM13LE104"],
    corpo: "<p><strong>RESTAURANTE EL RINCÓN — Carta de temporada</strong></p><p>Entrantes: sopa de tomate y pan con ajo. Plato principal: paella de mariscos. Postre: flan de huevo. Bebidas: sangría y agua fresca.</p><p><strong>Nota del chef:</strong> “Esperamos que disfruten de nuestra comida. Recomendamos que prueben el pescado fresco antes de que se acabe. Es importante que reserven mesa, porque el local es pequeño.”</p>",
    questoes: [
      {
        enunciado: "Em “Recomendamos que prueben el pescado fresco”, a forma prueben (presente do subjuntivo) é usada porque:",
        alternativas: [
          "descreve uma ação habitual do chef no passado",
          "depende de uma expressão de recomendação (recomendamos que), que exige subjuntivo",
          "trata-se de uma ordem direta dirigida a uma única pessoa",
          "indica uma ação que já foi concluída ontem",
          "expressa um fato certo e indiscutível",
        ],
        correta: 1,
        comentario: "Em espanhol, depois de verbos como recomendar — que expressam conselho, vontade ou influência sobre a ação de outra pessoa —, usa-se o presente do subjuntivo prueben (referindo-se a “ustedes”, os clientes). A evidência está na própria estrutura: “Recomendamos que prueben...”: o chef ainda não sabe se os clientes vão provar o peixe; ele apenas recomenda a ação.",
      },
      {
        enunciado: "No cardápio, a palavra postre corresponde a:",
        alternativas: [
          "a entrada",
          "a bebida",
          "a sobremesa",
          "o prato principal",
          "a conta",
        ],
        correta: 2,
        comentario: "Postre, em espanhol, é a sobremesa — a parte final da refeição. A evidência está na organização do próprio cardápio: “Entrantes / Plato principal / Postre / Bebidas” reproduz a ordem típica de uma refeição, e o item listado como postre é o “flan de huevo”, um doce.",
      },
    ],
  },
];
if (typeof window !== "undefined") { window.TEXTOS_IDIOMAS = TEXTOS_IDIOMAS; }
