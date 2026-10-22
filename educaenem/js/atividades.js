/* =============================================================================
   ATIVIDADES — Matemática, Linguagens e Ciências Humanas
   1 atividade por disciplina · 2 questões estilo ENEM · gabarito comentado
   (As atividades de Ciências da Natureza estão em banco-1natureza.js)
   ============================================================================= */

const ATIVIDADES_MAT = [
  {
    id: "atv-mat-1",
    area: "matematica",
    disciplina: "matematica",
    trimestre: 1,
    titulo: "Razão, proporção e escala",
    descricao: "Duas questões de grandezas proporcionais aplicadas a mapas e receitas.",
    tipo: "tarefa",
    habilidades: ["EM13MAT205"],
    questoes: [
      {
        enunciado:
          "Um mapa está na escala 1:2.000.000. Se duas cidades distam 6 cm no mapa, qual a distância real entre elas?",
        alternativas: ["60 km", "120 km", "12 km", "600 km", "1.200 km"],
        correta: 1,
        comentario:
          "1 cm no mapa = 2.000.000 cm = 20 km na realidade. Logo, 6 cm × 20 km = 120 km.",
      },
      {
        enunciado:
          "Se 3 operários constroem um muro em 12 dias, em quantos dias 4 operários, com o mesmo ritmo, construiriam o mesmo muro?",
        alternativas: ["16 dias", "9 dias", "6 dias", "8 dias", "15 dias"],
        correta: 1,
        comentario:
          "Grandezas inversamente proporcionais: 3 × 12 = 4 × x → x = 36/4 = 9 dias.",
      },
    ],
  },
  {
    id: "atv-mat-2",
    area: "matematica",
    disciplina: "matematica",
    trimestre: 2,
    titulo: "Função do 1º grau",
    descricao: "Leitura de gráficos e cálculo de raiz de uma função afim.",
    tipo: "tarefa",
    habilidades: ["EM13MAT205"],
    questoes: [
      {
        enunciado: "A raiz da função f(x) = 3x - 12 é:",
        alternativas: ["2", "3", "4", "-4", "12"],
        correta: 2,
        comentario: "3x - 12 = 0 → 3x = 12 → x = 4.",
      },
      {
        enunciado:
          "Uma corrida de táxi custa R$ 5,00 (bandeirada) mais R$ 2,20 por km. Qual o valor de uma corrida de 8 km?",
        alternativas: ["R$ 17,60", "R$ 21,60", "R$ 23,60", "R$ 16,60", "R$ 22,60"],
        correta: 4,
        comentario:
          "f(km) = 5 + 2,2·km → 5 + 2,2×8 = 5 + 17,6 = R$ 22,60. A bandeirada é contada uma única vez; o distrator R$ 17,60 é só a parte variável (2,2 × 8), sem a taxa fixa.",
      },
    ],
  },
];

const ATIVIDADES_LING = [
  {
    id: "atv-lp-1",
    area: "linguagens",
    disciplina: "linguagens",
    trimestre: 1,
    titulo: "Funções da linguagem",
    descricao: "Identificação da função dominante em textos do dia a dia.",
    tipo: "tarefa",
    habilidades: ["EM13LP201"],
    questoes: [
      {
        enunciado:
          "No cartaz 'Vacine seu filho contra a paralisia infantil neste sábado!', a função da linguagem predominante é a:",
        alternativas: ["Emotiva", "Referencial", "Conativa (apelativa)", "Metalinguística", "Poética"],
        correta: 2,
        comentario:
          "O texto busca convencer o leitor a agir, focando no receptor: função conativa ou apelativa.",
      },
      {
        enunciado: "Em um poema que valoriza a sonoridade e a forma das palavras, predomina a função:",
        alternativas: ["Fática", "Poética", "Referencial", "Conativa", "Emotiva"],
        correta: 1,
        comentario:
          "Quando o foco está na mensagem e na sua organização estética, predomina a função poética.",
      },
    ],
  },
  {
    id: "atv-lit-1",
    area: "linguagens",
    disciplina: "literatura",
    trimestre: 2,
    titulo: "Escolas literárias do Brasil",
    descricao: "Características do Modernismo e do Romantismo.",
    tipo: "tarefa",
    habilidades: ["EM13LIT1002"],
    questoes: [
      {
        enunciado:
          "O Manifesto Antropófago, de Oswald de Andrade, propunha:",
        alternativas: [
          "A imitação dos modelos clássicos europeus.",
          "A 'devoração' crítica da cultura estrangeira para criar uma identidade brasileira.",
          "A valorização exclusiva do indígena como herói.",
          "A negação de qualquer influência externa.",
          "A defesa do parnasianismo.",
        ],
        correta: 1,
        comentario:
          "A antropofagia defendia deglutir criticamente as influências estrangeiras e produzir algo original e nacional.",
      },
      {
        enunciado: "A primeira fase do Romantismo brasileiro é conhecida como:",
        alternativas: ["Condoreira", "Indianista", "Realista", "Parnasiana", "Pré-modernista"],
        correta: 1,
        comentario:
          "A fase indianista exaltava o indígena como herói nacional, com obras como 'O Guarani' e 'Iracema'.",
      },
    ],
  },
  {
    id: "atv-red-1",
    area: "linguagens",
    disciplina: "redacao",
    trimestre: 1,
    titulo: "Estrutura do texto dissertativo-argumentativo",
    descricao: "Tese, repertório e proposta de intervenção.",
    tipo: "tarefa",
    habilidades: ["EM13LP603"],
    questoes: [
      {
        enunciado:
          "Na redação do ENEM, a proposta de intervenção deve apresentar, obrigatoriamente:",
        alternativas: [
          "Apenas o agente que resolverá o problema.",
          "Agente, ação, modo/meio, efeito e detalhamento.",
          "Somente dados estatísticos do IBGE.",
          "Uma opinião pessoal sem detalhamento.",
          "Apenas o efeito esperado da ação.",
        ],
        correta: 1,
        comentario:
          "A proposta completa detalha quem age (agente), o que faz (ação), como (modo/meio), o que se pretende obter (efeito/finalidade) e detalhes que especificam a ação (detalhamento), respeitando os direitos humanos.",
      },
      {
        enunciado: "O 'repertório sociocultural' na redação serve para:",
        alternativas: [
          "Alongar o texto sem necessidade.",
          "Sustentar a argumentação com referências diversas (leis, dados, autores, fatos).",
          "Substituir a tese do texto.",
          "Descrever a história pessoal do autor.",
          "Encerrar a conclusão.",
        ],
        correta: 1,
        comentario:
          "O repertório legitimado (filmes, leis, filósofos, dados) dá peso e originalidade à argumentação.",
      },
    ],
  },
  {
    id: "atv-ing-1",
    area: "linguagens",
    disciplina: "ingles",
    trimestre: 1,
    titulo: "Falsos cognatos em interpretação",
    descricao: "Cuidados com termos que enganam na tradução.",
    tipo: "tarefa",
    habilidades: ["EM13LI202"],
    questoes: [
      {
        enunciado: "Na frase 'She is actually very prepared', a palavra 'actually' significa:",
        alternativas: ["Atualmente", "Na verdade", "Realmente sempre", "Eventualmente", "No final"],
        correta: 1,
        comentario:
          "'Actually' = 'na verdade'. 'Atualmente' seria 'currently'. Todo cuidado com falsos cognatos.",
      },
      {
        enunciado: "Em 'The policy aims to reduce costs', a palavra 'policy' significa:",
        alternativas: ["Polícia", "Política", "Educação", "Economia", "Popularidade"],
        correta: 1,
        comentario:
          "'Policy' = política (diretriz/estratégia). 'Polícia' é 'police'. Atenção aos falsos cognatos.",
      },
    ],
  },
  {
    id: "atv-esp-1",
    area: "linguagens",
    disciplina: "espanhol",
    trimestre: 1,
    titulo: "Interpretação e vocabulário",
    descricao: "Conectores e falsos cognatos do espanhol.",
    tipo: "tarefa",
    habilidades: ["EM13LE202"],
    questoes: [
      {
        enunciado: "A palavra espanhola 'embarazada' significa:",
        alternativas: ["Envergonhada", "Grávida", "Cansada", "Confusa", "Com fome"],
        correta: 1,
        comentario:
          "'Embarazada' = grávida. É um falso cognato clássico do espanhol.",
      },
      {
        enunciado: "O conector 'sin embargo' indica uma ideia de:",
        alternativas: ["Causa", "Consequência", "Contraste (adversativa)", "Tempo", "Finalidade"],
        correta: 2,
        comentario:
          "'Sin embargo' = 'no entanto', introduz contraste, articulando uma oposição entre as ideias.",
      },
    ],
  },
];

const ATIVIDADES_HUM = [
  {
    id: "atv-hg-1",
    area: "humanas",
    disciplina: "historia-geral",
    trimestre: 1,
    titulo: "Antiguidade: Grécia e Roma",
    descricao: "Democracia ateniense e a transição da República para o Império.",
    tipo: "tarefa",
    habilidades: ["EM13HIS101"],
    questoes: [
      {
        enunciado: "A democracia ateniense do século V a.C. caracterizava-se por ser:",
        alternativas: [
          "Direta, com a participação dos cidadãos nas decisões na Ágora.",
          "Representativa, com eleições para o Senado.",
          "Universal, incluindo mulheres e estrangeiros.",
          "Monárquica, sob a liderança de um rei.",
          "Controlada pelos sacerdotes.",
        ],
        correta: 0,
        comentario:
          "A democracia ateniense era direta: os cidadãos (homens atenienses, maiores de idade, de pai e mãe atenienses) deliberavam pessoalmente na Eclésia, assembleia que se reunia no Pnyx; a Ágora era o espaço de comércio e circulação da cidade.",
      },
      {
        enunciado: "As lutas dos plebeus em Roma resultaram na criação da/o:",
        alternativas: [
          "Código de Hamurábi.",
          "Lei das Doze Tábuas.",
          "Edito de Nantes.",
          "Tratado de Versalhes.",
          "Corpus Juris Civilis.",
        ],
        correta: 1,
        comentario:
          "A pressão dos plebeus levou à Lei das Doze Tábuas (450 a.C.), primeiro código escrito do direito romano.",
      },
    ],
  },
  {
    id: "atv-hb-1",
    area: "humanas",
    disciplina: "historia-brasil",
    trimestre: 2,
    titulo: "República Velha e coronelismo",
    descricao: "Política dos Governadores e voto de cabresto.",
    tipo: "tarefa",
    habilidades: ["EM13HIS202", "EM13HIS205"],
    questoes: [
      {
        enunciado: "A 'Política dos Governadores', do governo Campos Salles, consistia em:",
        alternativas: [
          "Apoio mútuo entre o Presidente e os governadores para eleger candidatos oficiais.",
          "Divisão igualitária de terras entre os estados.",
          "Fim do poder dos coronéis no interior.",
          "Entrega do governo a militares.",
          "Aliança do Brasil com a Inglaterra.",
        ],
        correta: 0,
        comentario:
          "Presidência e governadores trocavam apoios para garantir a eleição de candidatos oficiais e controlar a oposição.",
      },
      {
        enunciado: "O voto aberto previsto na Constituição de 1891 favorecia diretamente:",
        alternativas: [
          "O sigilo e a liberdade do eleitor.",
          "A fraude e a coerção pelo coronelismo.",
          "A ampliação do eleitorado feminino.",
          "O voto dos analfabetos.",
          "A fiscalização independente das eleições.",
        ],
        correta: 1,
        comentario:
          "Sem voto secreto, o coronel podia identificar e coagir o voto do eleitor rural, garantindo o resultado.",
      },
    ],
  },
  {
    id: "atv-geo-1",
    area: "humanas",
    disciplina: "geografia",
    trimestre: 2,
    titulo: "Urbanização brasileira",
    descricao: "Macrocefalia urbana e segregação socioespacial.",
    tipo: "tarefa",
    habilidades: ["EM13GEO102"],
    questoes: [
      {
        enunciado: "O termo 'macrocefalia urbana' refere-se:",
        alternativas: [
          "Ao crescimento equilibrado das cidades médias.",
          "Ao crescimento acelerado e desordenado de uma cidade, que concentra serviços e população.",
          "À diminuição da população nas capitais.",
          "Ao planejamento urbano sustentável.",
          "À industrialização do campo.",
        ],
        correta: 1,
        comentario:
          "A macrocefalia urbana é o crescimento exagerado de uma metrópole, que concentra população, serviços e problemas.",
      },
      {
        enunciado: "A 'conurbação' ocorre quando:",
        alternativas: [
          "Duas ou mais cidades vizinhas crescem até unir seus limites físicos.",
          "Uma cidade é totalmente planejada.",
          "A população migra do campo para a cidade.",
          "As indústrias deixam o espaço urbano.",
          "Ocorre a divulgação de uma cultura local.",
        ],
        correta: 0,
        comentario:
          "Conurbação é o encontro físico entre cidades próximas, formando uma malha urbana contínua.",
      },
    ],
  },
  {
    id: "atv-soc-1",
    area: "humanas",
    disciplina: "sociologia",
    trimestre: 1,
    titulo: "Trabalho e classes em Marx e Weber",
    descricao: "Mais-valia e os tipos de dominação.",
    tipo: "tarefa",
    habilidades: ["SOC2001"],
    questoes: [
      {
        enunciado: "Para Karl Marx, a 'mais-valia' corresponde:",
        alternativas: [
          "Ao lucro do trabalhador sobre o salário.",
          "À diferença entre o valor produzido pelo trabalho e o salário pago.",
          "Aos juros pagos pelos bancos.",
          "Ao custo da matéria-prima.",
          "Ao valor de mercado das máquinas.",
        ],
        correta: 1,
        comentario:
          "A mais-valia é o tempo de trabalho não pago: o valor que o operário produz além do que recebe, apropriado pelo capitalista.",
      },
      {
        enunciado: "Max Weber classificou a dominação 'racional-legal' como aquela baseada:",
        alternativas: [
          "No carisma do líder.",
          "Nos costumes e na tradição.",
          "Em leis e regulamentos impessoais.",
          "No uso da força física.",
          "Na vontade divina.",
        ],
        correta: 2,
        comentario:
          "A dominação racional-legal se sustenta em normas impessoais e na crença na legalidade, típica do Estado moderno burocrático.",
      },
    ],
  },
  {
    id: "atv-fil-1",
    area: "humanas",
    disciplina: "filosofia",
    trimestre: 2,
    titulo: "Ética e contratualismo",
    descricao: "Kant, Locke e o contrato social.",
    tipo: "tarefa",
    habilidades: ["FIL3001", "FIL4001"],
    questoes: [
      {
        enunciado: "O Imperativo Categórico de Kant afirma que devemos agir:",
        alternativas: [
          "Sempre em busca do prazer.",
          "De modo que nossa ação possa se tornar uma lei universal.",
          "Conforme os interesses da maioria.",
          "Conforme a tradição de cada povo.",
          "Para agradar aos deuses.",
        ],
        correta: 1,
        comentario:
          "Para Kant, a ação moral é aquela que se pode universalizar, movida pelo dever e não pelo interesse.",
      },
      {
        enunciado: "Para John Locke, os direitos naturais inalienáveis do ser humano são:",
        alternativas: [
          "Riqueza, poder e glória.",
          "Vida, liberdade e propriedade.",
          "Trabalho, lazer e educação.",
          "Terra, casa e família.",
          "Religião, exército e Estado.",
        ],
        correta: 1,
        comentario:
          "Locke defende que todo indivíduo possui, naturalmente, direito à vida, à liberdade e à propriedade.",
      },
    ],
  },
];

/* ---------- União de todas as atividades ---------- */
const ATIVIDADES = [
  ...(typeof ATIVIDADES_NATUREZA !== "undefined" ? ATIVIDADES_NATUREZA : []),
  ...ATIVIDADES_MAT,
  ...ATIVIDADES_LING,
  ...ATIVIDADES_HUM,
];

/* Exportação global */
if (typeof window !== "undefined") {
  window.ATIVIDADES = ATIVIDADES;
  window.ATIVIDADES_MAT = ATIVIDADES_MAT;
  window.ATIVIDADES_LING = ATIVIDADES_LING;
  window.ATIVIDADES_HUM = ATIVIDADES_HUM;
}
