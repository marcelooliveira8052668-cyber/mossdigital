/* =========================================================================
   EducaEnem — TRILHAS DE VESTIBULAR (Fuvest e Unicamp)

   Por que existe: o ENEM e o vestibular tradicional são provas DIFERENTES.
   O mesmo aluno, estudando do mesmo jeito, vai bem no ENEM e mal na Fuvest
   (e vice-versa). Aqui fica o que muda, na prática.

   Formatos das provas: edições 2027 (conferidos no site oficial de cada
   banca). Quando a banca mudar, atualizar a data em `edicao` e as fases.

   Estrutura de cada item:
     formato.fases[]      -> como é a prova, fase a fase
     comparativo[]        -> ENEM x vestibular, lado a lado
     mudaNosEstudos[]     -> o que o aluno precisa fazer diferente
     redacao{}            -> formato, critérios e o que não serve do ENEM
     trilhas[]            -> por onde estudar, com a prioridade
     textos[]             -> leituras longas no estilo da prova
     questoes[]           -> banco de questões no estilo da banca
   ========================================================================= */

const VESTIBULARES = [
  /* ======================================================================
     FUVEST — USP
     ====================================================================== */
  {
    id: "fuvest",
    nome: "Fuvest",
    sigla: "FUVEST",
    universidade: "Universidade de São Paulo (USP)",
    banca: "Fundação Fuvest",
    emoji: "🏆",
    cor: "#8b5cf6",
    edicao: "Fuvest 2027",
    resumo:
      "O vestibular mais concorrido do país. Exige CONTEÚDO na ponta da língua: " +
      "não basta interpretar, é preciso saber. A 2ª fase cobra escrita discursiva " +
      "de verdade e uma lista de obras obrigatória.",
    calendario: [
      "1ª fase — dezembro de 2026",
      "2ª fase — 06 e 07/12/2026",
      "1ª chamada — 26/01/2027",
    ],

    formato: {
      resumo:
        "Duas fases. A 1ª é objetiva e elimina; a 2ª é dissertativa, vale nota " +
        "e cobra a lista de literatura.",
      fases: [
        {
          nome: "1ª Fase",
          prova: "80 questões de múltipla escolha (mudou de 90 para 80 na edição 2027)",
          tempo: "5 horas",
          vale: "Eliminatória — corta para a 2ª fase",
          detalhes:
            "Cobre Língua Portuguesa, Matemática, Inglês, Biologia, Física, Química, " +
            "História, Geografia, Filosofia, Sociologia, Arte e Educação Física. " +
            "As questões são cada vez mais interdisciplinares: uma mesma questão " +
            "pode juntar Química e Geografia, ou História e Literatura. Como o número " +
            "de questões caiu e o tempo continuou em 5 horas, sobrou mais tempo por " +
            "questão — o que significa que a Fuvest quer raciocínio, não decoreba relâmpago.",
        },
        {
          nome: "2ª Fase — 1º dia",
          prova: "10 questões discursivas de Língua Portuguesa + redação",
          tempo: "até 4 horas",
          vale: "100 pontos (50 das questões + 50 da redação)",
          detalhes:
            "As 10 questões cobram interpretação de texto, gramática e LITERATURA, " +
            "com base na lista obrigatória de livros da Fuvest. A redação tem 2 " +
            "propostas e o candidato escolhe uma. Não escolher = nota zero.",
        },
        {
          nome: "2ª Fase — 2º dia",
          prova: "12 questões discursivas das disciplinas específicas da carreira",
          tempo: "até 4 horas",
          vale: "100 pontos",
          detalhes:
            "As questões vêm de 2 a 4 disciplinas, definidas pela carreira escolhida " +
            "(ex.: Direito cobra Português, História, Filosofia; Medicina cobra " +
            "Biologia, Química, Física). Na edição 2027 a Fuvest passou de 22 modelos " +
            "de prova para apenas 6, agrupados por área.",
        },
      ],
      eliminacao:
        "É eliminatório e classificatório. Quem tirar ZERO na redação, ou errar " +
        "TODAS as questões de um dos dois dias, é eliminado. E é preciso pontuar " +
        "pelo menos 50% da avaliação para ser convocado.",
    },

    comparativo: [
      {
        tema: "Número de questões",
        enem: "90 objetivas + redação",
        vest: "80 objetivas (1ª fase) + 22 discursivas + redação (2ª fase)",
      },
      {
        tema: "Estilo de questão",
        enem: "Muito texto, interpretação, dados e gráficos. Conteúdo de base.",
        vest: "Mais direto no conteúdo, mas cobra DETALHE que o ENEM não cobra.",
      },
      {
        tema: "Redação",
        enem: "5 competências, tema atual, proposta de intervenção obrigatória.",
        vest:
          "Dia 1 da 2ª fase, vale 50 pontos. Sem a fórmula da proposta de " +
          "intervenção — vale argumentação de verdade.",
      },
      {
        tema: "Literatura",
        enem: "Trechos nas questões. Sem lista obrigatória fechada.",
        vest: "Lista de obras OBRIGATÓRIA. Caíram na 2ª fase.",
      },
      {
        tema: "Filosofia e Sociologia",
        enem: "Interpretação de texto com situção brasileira.",
        vest: "Cobra autores e conceitos: Kant, Durkheim, Bourdieu, Frankfurt.",
      },
      {
        tema: "Matemática",
        enem: "Aplicada ao cotidiano, muita tabela e gráfico.",
        vest: "Mais abstrata: geometria, matrizes, funções e estatística clássica.",
      },
      {
        tema: "Nota zero",
        enem: "Redação zerada tira a nota, mas não elimina do SiSU.",
        vest: "ZERO na redação ou errar todas as questões = ELIMINADO.",
      },
    ],

    mudaNosEstudos: [
      "Pare de estudar só por interpretação. Na Fuvest você precisa DECORAR o conteúdo " +
        "e depois aplicar — é o caminho inverso do ENEM.",
      "Leia a lista de literatura OBRIGATÓRIA da Fuvest. Ela não é sugestão: as obras " +
        "caem na 2ª fase e não tem como improvisar.",
      "Treine escrita discursiva com cronômetro. No ENEM você tem 1 hora e 30 para a " +
        "redação; na Fuvest são 10 questões dissertativas + redação em 4 horas.",
      "Filosofia e Sociologia exigem autores, não só repertório de situação. Estude " +
        "Durkheim, Bourdieu, Kant e a Escola de Frankfurt pelo nome.",
      "Estude as disciplinas ESPECÍFICAS da sua carreira — a 2ª fase do 2º dia não " +
        "cobra o Ensino Médio inteiro, cobra 2 a 4 matérias.",
    ],

    redacao: {
      onde: "2ª Fase, 1º dia — junto com as 10 questões discursivas de Português",
      vale: "50 pontos (metade da nota do 1º dia)",
      formato:
        "2 propostas para escolher. Texto dissertativo-argumentativo. Não existe a " +
        "proposta de intervenção com agente/meio/curso/detalhamento que o ENEM exige.",
      diferencas: [
        "SEM proposta de intervenção — a maior armadilha de quem vem do ENEM. Aqui vale " +
          "a defesa de uma tese com argumentos, não a lista de ações.",
        "Literatura e repertório culto pesam muito mais do que no ENEM.",
        "Gramática é cobrada nas 10 questões do mesmo dia — erro grave ali derruba a nota.",
        "Tema costuma ser cultural e filosófico, menos 'atualidade' que o ENEM.",
      ],
      criterios: [
        { nome: "Compromisso com o tema", desc: "Se desviar do tema, a nota cai." },
        { nome: "Compreensão do tema", desc: "Demonstrar que entendeu o problema inteiro." },
        { nome: "Seleção e organização de argumentos", desc: "Repertório legítimo e pertinente." },
        { nome: "Coerência e organização", desc: "Estrutura clara: introdução, desenvolvimento, conclusão." },
        { nome: "Proposta de textualização", desc: "Domínio da norma e adequação ao gênero." },
      ],
      temasFrequentes: [
        "Identidade e formação do indivíduo na sociedade contemporânea",
        "Cultura brasileira e suas contradições",
        "Linguagem, poder e manipulação nas mídias",
        "Memória histórica e construção da identidade nacional",
        "Arte e educação como instrumentos de transformação",
      ],
    },

    trilhas: [
      { nome: "Literatura — lista da Fuvest", area: "linguagens", emoji: "📖", prioridade: "alta", mudanca: "OBRIGATÓRIO. Sem isso você não passa na 2ª fase." },
      { nome: "Língua Portuguesa — gramática e interpretação", area: "linguagens", emoji: "✍️", prioridade: "alta", mudanca: "10 discursivas + redação no dia 1. Vale 100 pontos." },
      { nome: "Filosofia por autores", area: "humanas", emoji: "🧠", prioridade: "alta", mudanca: "Cobra conceitos e autores, não só situação do Brasil." },
      { nome: "Sociologia por conceitos", area: "humanas", emoji: "👥", prioridade: "alta", mudanca: "Durkheim, Bourdieu, Weber — pelo nome e pela ideia central." },
      { nome: "História — conteúdo detalhado", area: "humanas", emoji: "🏛️", prioridade: "media", mudanca: "Data, processo e causalidade. Menos interpretação de imagem." },
      { nome: "Geografia — conteúdo e mapas", area: "humanas", emoji: "🌍", prioridade: "media", mudanca: "Questões mais diretas sobre relevo, clima e urbanização." },
      { nome: "Matemática — abstrata", area: "matematica", emoji: "📐", prioridade: "alta", mudanca: "Funções, geometria e estatística sem 'historinha'." },
      { nome: "Física — fórmula e conceito", area: "natureza", emoji: "⚛️", prioridade: "media", mudanca: "Menos situação-problema, mais aplicação direta da fórmula." },
      { nome: "Química — conteúdo e cálculo", area: "natureza", emoji: "🧪", prioridade: "media", mudanca: "Estequiometria e orgânica com mais profundidade." },
      { nome: "Biologia — conteúdo", area: "natureza", emoji: "🧬", prioridade: "media", mudanca: "Menos texto, mais fisiologia e genética." },
      { nome: "Redação Fuvest", area: "redacao", emoji: "📝", prioridade: "alta", mudanca: "SEM proposta de intervenção. Outro formato, outro treino." },
    ],

    textos: [
      {
        id: "vf-lit-1",
        titulo: "Por que a lista de literatura da Fuvest não é decoreba",
        fonte: "Material de apoio — estudo de literatura para a 2ª fase",
        tags: ["Literatura", "Fuvest 2027"],
        corpo:
          "<p>Todo ano, milhares de candidatos descobrem na véspera da 2ª fase que a " +
          "lista de obras da Fuvest não é um detalhe: é metade da prova de Língua " +
          "Portuguesa do 1º dia. Isso porque a banca não pergunta apenas qual é o " +
          "personagem de um romance. Ela pede que o candidato LEIA o texto crítico, " +
          "reconheça a obra, entenda o contexto de produção e desenvolva uma " +
          "interpretação que só quem leu consegue fazer.</p>" +
          "<p>A diferença entre quem leu e quem decorou sinopse aparece em questões " +
          "do tipo <em>«na passagem acima, o narrador adota uma postura que lembra…»</em>. " +
          "Quem leu reconhece a focalização; quem decorou sinopse não tem a menor " +
          "ideia do que a questão quer. E nas discursivas de 2 a 4 linhas, o candidato " +
          "precisa citar a obra corretamente — título, autor e ano. Errar isso é " +
          "perder ponto em uma prova onde a pontuação é disputada por décimos.</p>" +
          "<p>Há ainda uma razão estratégica. A Fuvest cobra literatura em duas frentes: " +
          "nas 10 discursivas do 1º dia e na redação, quando o candidato pode — e deve — " +
          "usar repertório literário para sustentar um argumento. Um candidato que " +
          "domina as obras tem um duplo ganho: resolve a questão técnica e enriquece " +
          "a argumentação. Um candidato que não leu perde dos dois lados ao mesmo tempo.</p>" +
          "<blockquote><p>«Ler a lista não é sobre literatura. É sobre ter o que dizer " +
          "quando a prova pedir.»</p></blockquote>" +
          "<p>A recomendação prática é ler em ordem cronológica, fazendo fichas de " +
          "uma página por obra: época, movimento, tema central, um trecho marcante e " +
          "a crítica que a obra faz ao seu tempo. A lista muda de ano para ano e " +
          "inclui obras da literatura brasileira e portuguesa, com atenção a vozes " +
          "marginalizadas e produções contemporâneas. Consulte sempre a lista vigente " +
          "no edital da edição em que você vai prestar — a deste material segue a " +
          "edição 2027.</p>",
      },
      {
        id: "vf-red-1",
        titulo: "Redação da Fuvest: por que a proposta de intervenção não existe aqui",
        fonte: "Material de apoio — preparação para a redação da 2ª fase",
        tags: ["Redação", "Fuvest 2027"],
        corpo:
          "<p>A armadilha mais cruel da Fuvest para quem vem preparado pelo ENEM é " +
          "a redação. No ENEM, o candidato é treinado durante anos para fechar o " +
          "texto com uma proposta de intervenção detalhada: agente, meio, finalidade, " +
          "detalhamento. É uma fórmula, e quem domina a fórmula tira nota alta. Na " +
          "Fuvest, essa fórmula simplesmente não existe.</p>" +
          "<p>A redação da Fuvest vale 50 pontos do 1º dia da 2ª fase e é um texto " +
          "dissertativo-argumentativo puro. O candidato escolhe uma das duas propostas " +
          "e precisa defender uma tese com argumentos, repertório e organização. Não " +
          "há pontuação por «agente» ou «meio». O que a banca avalia é a capacidade " +
          "de pensar e de escrever com coerência — não a capacidade de preencher um " +
          "checklist.</p>" +
          "<p>Isso muda completamente o treino. Quem chega repetindo «cabe ao Estado, " +
          "por meio da escola, promover…» está escrito no registro errado: a Fuvest " +
          "espera repertório cultural e filosófico, não linguagem de proposta social. " +
          "O repertório sociocultural legítimo pesa — e isso significa citar obras, " +
          "pensadores e fatos históricos com precisão, da mesma forma que se citaria " +
          "numa prova de História ou Filosofia.</p>" +
          "<blockquote><p>«No ENEM você fecha a redação com uma solução. Na Fuvest, " +
          "você fecha com uma ideia.»</p></blockquote>" +
          "<p>Outra diferença prática: o tempo. São 4 horas no 1º dia, divididas entre " +
          "10 questões discursivas de Português E a redação. O candidato precisa " +
          "administrá-lo sozinho — não há tempo garantido para a redação. E o risco é " +
          "severo: nota zero na redação elimina o candidato do concurso inteiro, mesmo " +
          "que ele tenha ido bem nos dois dias de prova.</p>",
      },
      {
        id: "vf-hum-1",
        titulo: "Filosofia e Sociologia na Fuvest: o conteúdo que o ENEM não cobra",
        fonte: "Adaptado de material didático de Ciências Humanas",
        tags: ["Filosofia", "Sociologia", "Fuvest 2027"],
        corpo:
          "<p>Quem estuda Filosofia e Sociologia para o ENEM aprende a interpretar " +
          "textos sobre desigualdade, educação e trabalho no Brasil. É um estudo útil — " +
          "mas insuficiente para a Fuvest. A banca exige que o candidato conheça os " +
          "autores e seus conceitos centrais, e cobra isso de forma direta.</p>" +
          "<p>Na Sociologia, é esperado o domínio de conceitos como o de " +
          "<strong>divisão social do trabalho</strong> e a <strong>solidariedade " +
          "mecânica e orgânica</strong> de Durkheim; a <strong>ação social</strong> " +
          "e os tipos ideais de Weber; o conceito de <strong>habitus</strong> e o " +
          "<strong>capital cultural</strong> de Bourdieu; e a ideia de " +
          "<strong>indústria cultural</strong> da Escola de Frankfurt. O candidato " +
          "precisa saber não só o que cada conceito significa, mas em que problema " +
          "ele foi criado para responder.</p>" +
          "<p>Na Filosofia, a cobrança é igual: Kant e a distinção entre fenômeno e " +
          "númeno; a ética do dever; as categorias do entendimento; e os filósofos " +
          "da modernidade que tratam da liberdade e do conhecimento. A Fuvest monta " +
          "questões que misturam um trecho de um autor com uma situação contemporânea " +
          "— e só quem entendeu o conceito resolve. Quem apenas «reconhece o tema» " +
          "cai em duas alternativas parecidas e erra.</p>" +
          "<p>A estratégia que funciona é estudar cada autor em quatro perguntas: " +
          "quem era, qual problema ele tentou resolver, qual é a ideia central dele, " +
          "e em que ele discorda de quem veio antes. Com isso na cabeça, as questões " +
          "discursivas do 1º dia deixam de ser decoreba e passam a ser aplicação.</p>",
      },
    ],

    questoes: [
      {
        area: "Linguagens",
        enunciado:
          "Assinale a alternativa que apresenta corretamente a relação entre o narrador e a história em um texto em que a narração é feita por um personagem que participa dos fatos e só sabe o que vê e vive:",
        alternativas: [
          "Narrador onisciente, focalização interna fixa.",
          "Narrador personagem, focalização interna fixa.",
          "Narrador homodiegético, focalização externa múltipla.",
          "Narrador heterodiegético, focalização zero.",
          "Narrador personagem, focalização externa fixa.",
        ],
        gabarito: 1,
        comentario:
          "Narrador personagem é sinônimo de homodiegético (participa da história). " +
          "Como ele só sabe o que vive, a focalização é interna e fixa — está nele. " +
          "Questão clássica de Fuvest: cobra o CONCEITO, não a interpretação.",
      },
      {
        area: "Sociologia",
        enunciado:
          "Para Durkheim, a solidariedade social que predomina nas sociedades " +
          "industriais complexas, baseada na diferenciação dos indivíduos e na " +
          "interdependência das funções, é denominada:",
        alternativas: [
          "Solidariedade mecânica.",
          "Solidariedade orgânica.",
          "Consciência coletiva.",
          "Fato social exterior.",
          "Anomia.",
        ],
        gabarito: 1,
        comentario:
          "Mecânica = sociedades simples, sem divisão do trabalho (todos iguais). " +
          "Orgânica = sociedades complexas, com divisão do trabalho e interdependência. " +
          "A Fuvest cobra a diferença entre os dois conceitos pelo nome.",
      },
      {
        area: "Filosofia",
        enunciado:
          "Em sua filosofia crítica, Immanuel Kant afirma que o conhecimento " +
          "sensível nos dá apenas os fenômenos — as coisas como nos aparecem — e " +
          "nunca a coisa em si mesma. Esse «algo que está por trás» do fenômeno é " +
          "chamado por Kant de:",
        alternativas: ["Categoria", "Númeno", "Transcendental", "Síntese", "Appercepção"],
        gabarito: 1,
        comentario:
          "Fenômeno = como a coisa nos aparece. Númeno = a coisa em si (inacessível). " +
          "A distinção é o cerne da Crítica da Razão Pura e cobra muito na Fuvest.",
      },
      {
        area: "História",
        enunciado:
          "Durante a Primeira Guerra Mundial, com o corte dos fornecedores europeus, " +
          "gêneros importados faltaram no mercado interno brasileiro. A reação " +
          "econômica a esse quadro teve como objetivo principal:",
        alternativas: [
          "Substituir o café brasileiro pelo leite condensado na pauta de exportação.",
          "Incentivar a produção de café no Vale do Paraíba.",
          "Substituir os gêneros importados que faltavam no mercado interno e conter a alta de preços.",
          "Ampliar a produção de borracha na Amazônia.",
          "Modernizar a indústria têxtil brasileira com capital estrangeiro.",
        ],
        gabarito: 2,
        comentario:
          "Com o corte dos fornecedores europeus, ao Brasil faltaram gêneros importados. " +
          "A produção interna cresceu para substituir o que não chegava e conter " +
          "a alta dos preços; o país, em meio à carestia, declarou guerra à " +
          "Alemanha em outubro de 1917. História com DATA e CONTEXTO — estilo Fuvest.",
      },
      {
        area: "Matemática",
        enunciado:
          "Em uma pesquisa, 60 pessoas foram entrevistadas sobre a frequência com " +
          "que leem. Se 40% delas leem ao menos uma vez por semana e, dessas, 1/3 " +
          "leem diariamente, quantas pessoas leem diariamente?",
        alternativas: ["6", "8", "10", "12", "16"],
        gabarito: 1,
        comentario:
          "40% de 60 = 24 leem ao menos uma vez por semana. 1/3 de 24 = 8 leem " +
          "diariamente. Cálculo direto, sem pegadinha — é assim que a Fuvest costuma " +
          "cobrar porcentagem: exigindo o conteúdo, não a decoração de fórmula.",
      },
      {
        area: "Natureza",
        enunciado:
          "A reação de combustão completa do metano (CH₄) em excesso de oxigênio " +
          "produz:",
        alternativas: [
          "CO e H₂O",
          "CO₂ e H₂O",
          "CO₂, H₂O e O₃",
          "C₂H₆ e O₂",
          "CO₂ e H₂",
        ],
        gabarito: 1,
        comentario:
          "CH₄ + 2O₂ → CO₂ + 2H₂O. Combustão completa dá CO₂ e H₂O; incompleta daria CO. " +
          "Questão direta de conteúdo — é assim que a Fuvest cobra Química.",
      },
      {
        area: "Humanas",
        enunciado:
          "Na Geografia, o fenômeno da metropolização refere-se a:",
        alternativas: [
          "A diminuição do tamanho das cidades médias brasileiras.",
          "A expansão da mancha urbana e o crescimento das regiões metropolitanas com intensa segregação socioespacial.",
          "O retorno do campo para a cidade causado pela mecanização agrícola.",
          "A criação de cidades satélites planejadas pelo Estado para conter o crescimento.",
          "A migração de população de áreas centrais para o interior do país.",
        ],
        gabarito: 1,
        comentario:
          "Metropolização = crescimento da mancha urbana + segregação (centro x periferia). " +
          "Perceba: as alternativas são próximas, mas só uma traz a segregação socioespacial, " +
          "que é o cerne do conceito.",
      },
      {
        area: "Redação",
        enunciado:
          "Na redação da Fuvest, qual dos elementos a seguir NÃO é exigido pela " +
          "banca?",
        alternativas: [
          "Defesa de uma tese.",
          "Repertório sociocultural legítimo.",
          "Proposta de intervenção com agente, meio, finalidade e detalhamento.",
          "Coesão e coerência ao longo do texto.",
          "Adequação à norma-padrão.",
        ],
        gabarito: 2,
        comentario:
          "A proposta de intervenção detalhada é EXCLUSIVA do ENEM. Na Fuvest ela não " +
          "existe — e cobra caro quem aplica a fórmula sem querer.",
      },
{
        area: "História",
        enunciado:
          "O período conhecido como Era Vargas (1930-1945) redefiniu o Estado " +
          "brasileiro. Sobre esse período, é correto afirmar que:",
        alternativas: [
          "O Estado Novo (1937-1945) foi um regime democrático, com eleições livres e Congresso aberto.",
          "A Revolução de 1930 derrubou a República Velha e iniciou a Era Vargas, que incluiu o Estado Novo, regime ditatorial.",
          "Vargas chegou ao poder por eleições diretas em 1930, com o apoio das oligarquias paulistas.",
          "A Era Vargas foi marcada pelo alinhamento integral do Brasil aos regimes totalitários europeus.",
          "O governo Vargas manteve o federalismo e o poder das oligarquias estaduais intactos.",
        ],
        gabarito: 1,
        comentario:
          "1930 = fim da República Velha; 1937 = Estado Novo (ditadura, Congresso " +
          "fechado, eleições suspensas). A banca cobra a periodização: Vargas (1930) " +
          "não é o mesmo que Estado Novo (1937-1945).",
      },
      {
        area: "Geografia",
        enunciado:
          "No Brasil contemporâneo, a concentração de terras é um problema histórico. " +
          "Sobre esse quadro, é correto afirmar que:",
        alternativas: [
          "A Lei de Terras de 1850 facilitou o acesso à terra para pequenos produtores e imigrantes.",
          "A concentração fundiária no Brasil tem origem no sistema de capitanias e na Lei de Terras de 1850, que restringiu o acesso à propriedade.",
          "O Estatuto da Terra (1964) foi responsável pela democratização do acesso à terra no país.",
          "O agronegócio brasileiro é majoritariamente formado por pequenas propriedades familiares.",
          "A reforma agrária brasileira foi concluída na década de 1990, eliminando os latifúndios.",
        ],
        gabarito: 1,
        comentario:
          "Lei de Terras de 1850: a terra só podia ser adquirida por compra, não por " +
          "posse — consolidou a concentração. Pegadinha clássica: a alternativa A " +
          "inverte a lógica da lei.",
      },
      {
        area: "Física",
        enunciado:
          "Um fio condutor percorrido por uma corrente elétrica constante produz ao seu " +
          "redor:",
        alternativas: [
          "Um campo elétrico uniforme e um campo magnético nulo.",
          "Um campo magnético, mas não produz campo elétrico.",
          "Nem campo elétrico nem campo magnético, pois a corrente é constante.",
          "Um campo elétrico variável que cancela o campo magnético.",
          "Um campo gravitacional proporcional à corrente.",
        ],
        gabarito: 1,
        comentario:
          "Corrente elétrica constante gera campo magnético ao redor do fio (Lei de " +
          "Ampère). O fio em si não produz campo elétrico. Conteúdo direto de " +
          "eletromagnetismo, do tipo que a Fuvest cobra na 1ª fase.",
      },
      {
        area: "Biologia",
        enunciado: "Segundo a teoria evolutiva, a seleção natural atua:",
        alternativas: [
          "Sobre os indivíduos, favorecendo características que aumentam a sobrevivência e a reprodução no ambiente.",
          "Sobre as espécies inteiras, modificando todos os indivíduos ao mesmo tempo.",
          "Apenas sobre as características hereditárias que são vantajosas em qualquer ambiente.",
          "De forma direcionada, guiando os organismos em direção à perfeição.",
          "Somente sobre as mutações que ocorrem durante a reprodução sexuada.",
        ],
        gabarito: 0,
        comentario:
          "A seleção natural atua sobre indivíduos (variação + ambiente). Não é " +
          "direcionada nem visa a perfeição — é o erro clássico de quem confunde " +
          "seleção natural com Lamarck ou com ideia de progresso.",
      },
      {
        area: "Química",
        enunciado: "Qual das substâncias a seguir é um ácido carboxílico?",
        alternativas: [
          "Etanol.",
          "Metano.",
          "Ácido etanoico (acético).",
          "Etanal.",
          "Éter dietílico.",
        ],
        gabarito: 2,
        comentario:
          "Ácido carboxílico = grupo -COOH. O ácido etanoico (acético) é o vinagre. " +
          "Etanol é álcool, metano é hidrocarboneto, etanal é aldeído e éter dietílico " +
          "é éter. A Fuvest cobra função orgânica pelo nome, sem fórmula.",
      },
      {
        area: "Matemática",
        enunciado: "A função f(x) = 2x + 3 é:",
        alternativas: [
          "Linear, com coeficiente angular 3.",
          "Afim, com coeficiente angular 2 e coeficiente linear 3.",
          "Quadrática, pois tem dois termos.",
          "Exponencial, pois a variável está no expoente.",
          "Inversa de y = 2x.",
        ],
        gabarito: 1,
        comentario:
          "f(x) = ax + b é função afim (linear quando b = 0). Aqui a = 2 (angular) e " +
          "b = 3 (linear). Pegadinha: confundir linear com afim.",
      },
      {
        area: "Linguagens",
        enunciado:
          "Na frase «O Brasil é um país de contrastes», a expressão «país de contrastes» " +
          "constitui:",
        alternativas: [
          "Uma metáfora, pois compara o Brasil a algo sem usar como.",
          "Um pleonasmo, pois repete a ideia de diversidade.",
          "Uma ironia, pois o sentido real é o contrário do que se diz.",
          "Uma hipérbole, pois exagera a realidade do país.",
          "Um eufemismo, pois suaviza uma crítica.",
        ],
        gabarito: 0,
        comentario:
          "«País de contrastes» é metáfora (comparação implícita). A banca adora " +
          "distinguir metáfora de hipérbole e eufemismo — três figuras parecidas, " +
          "sentidos diferentes.",
      },
      {
        area: "Sociologia",
        enunciado:
          "Na teoria de Karl Marx, a sociedade capitalista divide-se em duas classes " +
          "sociais principais, definidas pela:",
        alternativas: [
          "Posição no mercado de trabalho e nível de renda.",
          "Relação com os meios de produção: burguesia (proprietária) e proletariado (vendedor da força de trabalho).",
          "Escolaridade e prestígio profissional.",
          "Posse de bens de consumo e acesso a serviços.",
          "Participação política e filiação partidária.",
        ],
        gabarito: 1,
        comentario:
          "Para Marx, a divisão fundamental é pela relação com os meios de produção " +
          "(donos x não-donos). Escolaridade e renda são critérios weberianos, não " +
          "marxistas — pegadinha clássica de Fuvest.",
      },
    ],

literatura: {
      edicao: "Lista da Fuvest 2026 (última confirmada neste material)",
      aviso:
        "A lista de obras obrigatórias muda TODO ANO. Esta é a lista da Fuvest 2026. " +
        "Antes de estudar, confira a lista vigente no edital da edição em que você " +
        "vai prestar — a deste material é da edição 2026.",
      obras: [
        {
          titulo: "A teus pés",
          autor: "Ana Cristina Cesar",
          movimento: "Poesia contemporânea brasileira",
          porQueCai: "Poesia marginal dos anos 1970. A banca cobra a voz feminina e a quebra de padrão.",
        },
        {
          titulo: "Água viva",
          autor: "Clarice Lispector",
          movimento: "Modernismo brasileiro (2ª fase)",
          porQueCai: "Narrativa de fluxo de consciência, sem enredo tradicional.",
        },
        {
          titulo: "Campo geral",
          autor: "Guimarães Rosa",
          movimento: "Modernismo / regionalismo renovado",
          porQueCai: "Infância, memória e o sertão. Linguagem inventiva.",
        },
        {
          titulo: "Estrela absurda",
          autor: "Mário de Andrade",
          movimento: "Modernismo brasileiro (1ª fase)",
          porQueCai: "Romance de formação e identidade nacional.",
        },
        {
          titulo: "Mensagem",
          autor: "Fernando Pessoa",
          movimento: "Modernismo português",
          porQueCai: "Único livro de poesia publicado em vida; mito do sebastianismo.",
        },
        {
          titulo: "Nove noites",
          autor: "Bernardo Carvalho",
          movimento: "Literatura brasileira contemporânea",
          porQueCai: "Ficção histórica: a Amazônia no ciclo da borracha.",
        },
        {
          titulo: "O cortiço",
          autor: "Aluísio Azevedo",
          movimento: "Naturalismo",
          porQueCai: "Naturalismo: determinismo, meio e multidão.",
        },
        {
          titulo: "Quarto de despejo",
          autor: "Carolina Maria de Jesus",
          movimento: "Literatura marginal / documento",
          porQueCai: "Diário da favela; voz feminina negra; documento social.",
        },
        {
          titulo: "Sagarana",
          autor: "Guimarães Rosa",
          movimento: "Modernismo / regionalismo renovado",
          porQueCai: "Contos do sertão; linguagem inventiva.",
        },
        {
          titulo: "Toda a poesia",
          autor: "Pablo Neruda",
          movimento: "Poesia latino-americana",
          porQueCai: "Obra completa do chileno; amor, política e natureza.",
        },
      ],
    },

  },

  /* ======================================================================
     UNICAMP — Comvest
     ====================================================================== */
  {
    id: "unicamp",
    nome: "Unicamp",
    sigla: "UNICAMP",
    universidade: "Universidade Estadual de Campinas (Unicamp)",
    banca: "Comvest",
    emoji: "🔶",
    cor: "#f59e0b",
    edicao: "Unicamp 2027",
    resumo:
      "A banca da interpretação. A 1ª fase é de Conhecimentos Gerais com questões " +
      "interdisciplinares e pegadinhas — não adianta decorar, é preciso ENTENDER " +
      "e ligar matérias que parecem não ter nada a ver.",
    calendario: [
      "1ª fase — 18/10/2026",
      "2ª fase — 29 e 30/11/2026",
      "Resultado — dezembro de 2026",
    ],

    formato: {
      resumo:
        "Duas fases. A 1ª é uma prova só, de Conhecimentos Gerais, com 72 questões. " +
        "A 2ª tem 2 dias: o 1º é igual para todos, o 2º é específico do curso.",
      fases: [
        {
          nome: "1ª Fase",
          prova: "72 questões de múltipla escolha (Conhecimentos Gerais)",
          tempo: "5 horas",
          vale: "1 ponto por questão — corta para a 2ª fase",
          detalhes:
            "Prova ÚNICA para todos os candidatos, cobrindo o Ensino Médio inteiro com " +
            "forte apelo interdisciplinar. Só de Ciências Humanas (História, Geografia, " +
            "Filosofia e Sociologia) são 20 questões dentro das 72. A característica " +
            "mais marcante são as questões que juntam duas ou mais disciplinas na mesma " +
            "alternativa — e as pegadinhas de interpretação.",
        },
        {
          nome: "2ª Fase — 1º dia",
          prova: "10 questões discursivas + redação (IGUAIS para todos)",
          tempo: "manhã",
          vale: "Até 4 pontos por questão + até 12 pontos na redação",
          detalhes:
            "Composição: Língua Portuguesa e Literatura (6 questões) + " +
            "interdisciplinares de Inglês (2) e Ciências da Natureza (2). A redação " +
            "apresenta 2 propostas e o candidato escreve sobre UMA. Isso vale até " +
            "12 pontos.",
        },
        {
          nome: "2ª Fase — 2º dia",
          prova: "Questões dissertativas ESPECÍFICAS do curso escolhido",
          tempo: "manhã",
          vale: "Até 4 pontos por questão",
          detalhes:
            "As questões variam conforme a carreira. O candidato escreve respostas " +
            "dissertativas sobre as disciplinas que exigem aquele curso — é aqui que " +
            "a profundidade por área faz diferença.",
        },
      ],
      eliminacao:
        "A nota é calculada por estatística: a nota bruta da 1ª fase (N) é convertida " +
        "em função da média (M) e do desvio padrão (DP) dos candidatos. Ou seja: sua " +
        "nota depende do DESEMPEHO RELATIVO, não de um número fixo de acertos.",
    },

    comparativo: [
      {
        tema: "Estrutura da 1ª fase",
        enem: "90 questões, prova por área (Matemática, Natureza, Humanas, Linguagens).",
        vest: "72 questões em UMA prova só, de Conhecimentos Gerais, para todos.",
      },
      {
        tema: "Estilo de questão",
        enem: "Interpretação com situação do Brasil, dados e gráficos.",
        vest:
          "Interdisciplinar e com pegadinha: uma questão pode pedir História, " +
          "mas a alternativa correta depende de Geografia.",
      },
      {
        tema: "Nota",
        enem: "Nota absoluta (0–1000 por área) usada no SiSU.",
        vest: "Nota RELATIVA — convertida por média e desvio padrão dos candidatos.",
      },
      {
        tema: "Redação",
        enem: "5 competências, proposta de intervenção obrigatória, vale 200 pontos.",
        vest: "2 propostas, escolhe 1. Vale até 12 pontos. SEM proposta de intervenção.",
      },
      {
        tema: "Literatura",
        enem: "Trechos nas questões, sem lista fechada.",
        vest: "Lista de obras obrigatória — as 6 questões de Literatura vêm dela.",
      },
      {
        tema: "Inglês e Espanhol",
        enem: "Área de Linguagens, com textos longos de interpretação.",
        vest: "Cobrado na 2ª fase do 1º dia, em questões interdisciplinares.",
      },
      {
        tema: "Segundo dia",
        enem: "Não existe — é uma prova só (mais a redação).",
        vest: "Existe: questões dissertativas específicas do curso.",
      },
    ],

    mudaNosEstudos: [
      "Treine questões INTERDISCIPLINARES. Na Unicamp uma única questão pode exigir " +
        "História e Geografia ao mesmo tempo — estudar matéria por matéria não basta.",
      "A nota da 1ª fase é relativa: o que importa é sua posição entre os candidatos. " +
        "Isso muda a estratégia de prova — errar pouco vale mais do que acertar fácil.",
      "Leia a lista de literatura da Unicamp. As 6 questões de Literatura do 1º dia " +
        "da 2ª fase vêm todas dela.",
      "A redação tem 2 propostas e você escolhe UMA. Escolher a errada custa a nota — " +
        "leia as duas antes de decidir.",
      "Estude as disciplinas do SEU curso para o 2º dia da 2ª fase. Questões " +
        "dissertativas exigem estrutura de resposta, não palavrinha-chave.",
    ],

    redacao: {
      onde: "2ª Fase, 1º dia — junto com as 10 questões discursivas",
      vale: "Até 12 pontos",
      formato:
        "2 propostas, escolha uma. Texto dissertativo-argumentativo. Vale até 12 " +
        "pontos — pesa menos que na Fuvest, mas ainda é diferença entre passar e não passar.",
      diferencas: [
        "ESCOLHA entre 2 propostas — quem lê só uma costuma pegar o tema pela metade.",
        "SEM proposta de intervenção, como na Fuvest.",
        "Interpretação de texto pesa junto com a redação: são 10 questões + redação no mesmo dia.",
        "A Unicamp valoriza repertório próprio e escrita clara mais do que decoreba de fórmula.",
      ],
      criterios: [
        { nome: "Domínio da norma-padrão", desc: "Sem erros graves de escrita." },
        { nome: "Compreensão do tema", desc: "Tratar o tema inteiro, não um pedaço." },
        { nome: "Seleção de argumentos", desc: "Repertório pertinente ao argumento." },
        { nome: "Coesão e coerência", desc: "Texto amarrado, com progressão de ideias." },
        { nome: "Autonomia discursiva", desc: "Defender o ponto de vista com segurança." },
      ],
      temasFrequentes: [
        "Tecnologia e seus efeitos na vida cotidiana",
        "Cultura brasileira e formação da identidade",
        "Educação e transformação social",
        "Meio ambiente e desenvolvimento",
        "Linguagem e comunicação na sociedade contemporânea",
      ],
    },

    trilhas: [
      { nome: "Questões interdisciplinares", area: "geral", emoji: "🔗", prioridade: "alta", mudanca: "A assinatura da Unicamp. Uma questão, duas matérias." },
      { nome: "Literatura — lista da Unicamp", area: "linguagens", emoji: "📖", prioridade: "alta", mudanca: "6 discursivas do 1º dia vêm daqui." },
      { nome: "Língua Portuguesa — interpretação", area: "linguagens", emoji: "✍️", prioridade: "alta", mudanca: "6 questões discursivas no dia 1." },
      { nome: "Inglês — interdisciplinar", area: "linguagens", emoji: "🌍", prioridade: "media", mudanca: "2 questões no 1º dia da 2ª fase, junto com o texto." },
      { nome: "História — processo e contexto", area: "humanas", emoji: "🏛️", prioridade: "alta", mudanca: "20 questões de Humanas na 1ª fase." },
      { nome: "Geografia — conceito e mapa", area: "humanas", emoji: "🗺️", prioridade: "alta", mudanca: "Entra na conta das 20 de Humanas." },
      { nome: "Filosofia — conceitos", area: "humanas", emoji: "🧠", prioridade: "media", mudanca: "Cobra conceitos, com questões de ligação." },
      { nome: "Sociologia — conceitos", area: "humanas", emoji: "👥", prioridade: "media", mudanca: "Muito presente em questões interdisciplinares." },
      { nome: "Matemática — aplicada", area: "matematica", emoji: "📐", prioridade: "alta", mudanca: "Base da 1ª fase, com interpretação de dados." },
      { nome: "Ciências da Natureza", area: "natureza", emoji: "🧪", prioridade: "alta", mudanca: "2 questões interdisciplinares no dia 1 da 2ª fase." },
      { nome: "Redação Unicamp", area: "redacao", emoji: "📝", prioridade: "alta", mudanca: "2 propostas, escolha 1. Sem proposta de intervenção." },
    ],

    textos: [
      {
        id: "vu-int-1",
        titulo: "Interdisciplinaridade na Unicamp: o que a banca realmente quer",
        fonte: "Material de apoio — estratégia de prova para a Comvest",
        tags: ["Estratégia", "Unicamp 2027"],
        corpo:
          "<p>Existe um mal-entendido muito comum sobre a prova da Unicamp: acreditar " +
          "que a interdisciplinaridade significa apenas que a prova tem questões de " +
          "várias matérias. Não é isso. A interdisciplinaridade da Comvest aparece " +
          "DENTRO de uma única questão — e é aí que ela derruba quem estudou cada " +
          "disciplina em caixinhas separadas.</p>" +
          "<p>Uma questão típica traz um texto sobre urbanização, pergunta algo sobre " +
          "o processo de metropolização e, entre as alternativas, coloca uma opção que " +
          "só está correta se o candidato lembrar de um conceito de Sociologia sobre " +
          "segregação espacial. Quem estudou Geografia sozinha reconhece o tema, mas " +
          "não enxerga o amarração; quem estudou Sociologia sozinha sabe o conceito, " +
          "mas não aplica no contexto geográfico. A alternativa correta só aparece " +
          "para quem ligou as duas coisas.</p>" +
          "<p>É por isso que a 1ª fase tem 72 questões em uma prova só, e não quatro " +
          "provas separadas como no ENEM. A banca quer saber se o candidato pensa. " +
          "E o segundo elemento que sustenta esse raciocínio são as pegadinhas: " +
          "alternativas tecnicamente verdadeiras, mas que não respondem o que foi " +
          "perguntado. Ler o enunciado até o fim, identificar o VERBO da pergunta e " +
          "só então olhar as alternativas é o hábito que separa quem passa de quem não passa.</p>" +
          "<blockquote><p>«Na Unicamp não se estuda matéria. Estuda-se a relação " +
          "entre as matérias.»</p></blockquote>" +
          "<p>Na prática, o treino recomendado é fazer questões interdisciplinares " +
          "todo dia, mesmo que de disciplinas diferentes — e, ao errar, anotar não " +
          "apenas a matéria correta, mas QUAL o candidato precisava saber para acertar. " +
          "Em poucas semanas, o candidato começa a enxergar as ligações naturalmente, " +
          "e a prova deixa de parecer um sortear de conteúdos.</p>",
      },
      {
        id: "vu-red-1",
        titulo: "Duas propostas, uma escolha: como decidir em minutos",
        fonte: "Material de apoio — redação da 2ª fase",
        tags: ["Redação", "Unicamp 2027"],
        corpo:
          "<p>A redação da Unicamp tem um detalhe que muda tudo e que quase nenhum " +
          "candidato treina: são DUAS propostas, e o candidato escreve sobre apenas " +
          "uma. Soa simples, mas no meio de uma prova de 4 horas, com 10 questões " +
          "discursivas pela frente, a decisão é tomada às pressas — e é comum " +
          "escolher o tema pela primeira impressão e perceber, na metade do texto, " +
          "que o repertório não fluía.</p>" +
          "<p>O critério de decisão não é gostar do tema. É ter REPERTÓRIO para ele. " +
          "Antes de escolher, vale fazer três perguntas rápidas: consigo citar ao " +
          "menos duas fontes seguras (uma obra, um pensador, um fato histórico)? " +
          "consigo defender um ponto de vista que seja meu, não uma repetição do " +
          "enunciado? e consigo concluir sem depender de uma fórmula pronta? Se a " +
          "resposta for sim nas três, aquele é o tema. Se não, a outra proposta " +
          "provavelmente é melhor — mesmo que pareça mais difícil à primeira vista.</p>" +
          "<p>Vale lembrar que a redação vale até 12 pontos, e cada questão discursiva " +
          "vale até 4. Ou seja: a redação equivale a 3 questões discursivas. Ela pesa, " +
          "mas não é o centro da prova — e isso deve entrar na gestão do tempo. Quem " +
          "gasta uma hora e meia só na redação acaba correndo nas 10 questões e perde " +
          "mais ponto do que ganha.</p>" +
          "<blockquote><p>«Escolher o tema não é preferência. É estratégia de nota.»</p></blockquote>" +
          "<p>Por fim: não existe proposta de intervenção. Quem fecha o texto com " +
          "«cabe à sociedade, por meio da escola, promover…» está usando uma estrutura " +
          "que a Comvest não pede. O fechamento esperado é uma conclusão que sustente " +
          "a tese defendida ao longo do texto — com repertório, se possível. A escrita " +
          "clara e a defesa de um ponto de vista valem mais do que uma lista de ações " +
          "em formato de fórmula.</p>",
      },
      {
        id: "vu-nat-1",
        titulo: "Por que a nota da Unicamp é relativa e o que isso muda na sua prova",
        fonte: "Material de apoio — sistema de notas da Comvest",
        tags: ["Estratégia", "Unicamp 2027"],
        corpo:
          "<p>Uma das diferenças mais importantes — e mais ignoradas — entre o ENEM e a " +
          "Unicamp é como a nota é calculada. No ENEM, a nota é absoluta: você acerta " +
          "X questões e recebe Y pontos, independentemente de quem fez a prova ao seu " +
          "lado. Na Unicamp, a nota da 1ª fase é convertida em função da média e do " +
          "desvio padrão dos candidatos. Sua nota é, essencialmente, uma medida do seu " +
          "DESEMPENHO RELATIVO.</p>" +
          "<p>O que isso significa na prática? Significa que não existe número mágico " +
          "de acertos para passar. Uma prova difícil, em que todo mundo erra mais, " +
          "não necessariamente prejudica o candidato que errou a mesma quantidade — " +
          "porque a média também cai. O que importa é a posição entre os candidatos. " +
          "Em prova relativa, ERRAR POUCO vale mais do que ACERTAR O FÁCIL: quem erra " +
          "as questões bobas perde posição para quem não errou.</p>" +
          "<p>Isso muda a estratégia de prova de duas formas. A primeira é a ordem de " +
          "ataque: resolver primeiro o que se domina garante os pontos seguros, e " +
          "deixar o arriscado para o fim evita perder tempo com o que não se sabe. A " +
          "segunda é o cuidado com as pegadinhas — numa prova relativa, cair numa " +
          "alternativa errada por descuido custa caro, porque alguém não caiu.</p>" +
          "<blockquote><p>«Em prova relativa, o seu concorrente é a sua régua.»</p></blockquote>" +
          "<p>Na 2ª fase a conta é diferente: cada questão discursiva vale até 4 pontos " +
          "e a redação até 12, com pontuação direta. Ali o que vale é a qualidade da " +
          "escrita e a profundidade da resposta. São dois jogos distintos dentro do " +
          "mesmo vestibular — e preparar-se para um não prepara para o outro.</p>",
      },
    ],

    questoes: [
      {
        area: "Interdisciplinar",
        enunciado:
          "Leia o texto: «A expansão da mancha urbana nas últimas décadas avançou " +
          "sobre áreas rurais, formando cinturões de habitação popular distantes do " +
          "centro, onde ficam os empregos.» Considerando esse processo e o conceito " +
          "sociológico de Bourdieu, é correto afirmar que:",
        alternativas: [
          "A segregação socioespacial reproduz, no espaço, a distribuição desigual de capital cultural entre os grupos sociais.",
          "O processo decorre exclusivamente da falta de planejamento governamental, sem relação com relações de classe.",
          "A urbanização brasileira é resultado da industrialização recente, sem precedentes históricos.",
          "A distância do centro é irrelevante para a análise sociológica da cidade.",
          "O fenômeno atinge igualmente todas as classes sociais, sem hierarquia.",
        ],
        gabarito: 0,
        comentario:
          "Geografia (metropolização) + Sociologia (Bourdieu, capital cultural) " +
          "na MESMA questão. Isso é a Unicamp: só resolve quem ligou as duas matérias.",
      },
      {
        area: "Humanas",
        enunciado:
          "O período conhecido como Belle Époque, no fim do século XIX, caracterizou-se, " +
          "no Brasil, principalmente por:",
        alternativas: [
          "A industrialização acelerada e a substituição da agricultura pela fábrica.",
          "O café como motor econômico, imigração europeia e urbanização das cidades do Sudeste.",
          "A abolição da escravidão e a criação da República sem conflitos.",
          "A expansão da economia cafeeira para o Norte do país.",
          "O isolamento comercial e a ausência de imigração.",
        ],
        gabarito: 1,
        comentario:
          "Belle Époque no Brasil = café + imigração + urbanização. A pegadinha é " +
          "a alternativa A, que descreve a industrialização de outros países.",
      },
      {
        area: "Humanas",
        enunciado:
          "Segundo a teoria weberiana, a ação social é considerada racional quando o " +
          "indivíduo:",
        alternativas: [
          "Age guiado por emoções e tradições sem calcular consequências.",
          "Considera os meios e as consequências de seu comportamento de forma consciente.",
          "Obedece às normas por hábito cultural herdado.",
          "Busca apenas a satisfação imediata do desejo.",
          "Age conforme o mandamento religioso da comunidade.",
        ],
        gabarito: 1,
        comentario:
          "Ação racional = meios e fins calculados conscientemente. A alternativa C descreve a ação tradicional, " +
          "a D, a ação afetiva, e a E, a ação valorativa; a A combina emoção " +
          "e tradição sem cálculo de meios e fins.",
      },
      {
        area: "Linguagens",
        enunciado:
          "Em «O tempo não volta, mas insiste em nos lembrar do que fomos», a expressão " +
          "«insiste» atribui ao tempo uma qualidade humana. Esse recurso é:",
        alternativas: [
          "Metáfora.",
          "Prosopopeia (personificação).",
          "Hipérbole.",
          "Eufemismo.",
          "Antítese.",
        ],
        gabarito: 1,
        comentario:
          "Atribuir ação humana («insistir») a um ser inanimado (o tempo) = " +
          "prosopopeia/personificação. Metáfora seria comparar sem usar «como».",
      },
      {
        area: "Natureza",
        enunciado:
          "A fotossíntese libera oxigênio para a atmosfera porque esse gás provém:",
        alternativas: [
          "Da quebra da glicose na respiração celular.",
          "Da fotólise da água na fase clara.",
          "Da redução do gás carbônico no ciclo de Calvin.",
          "Da respiração das mitocôndrias.",
          "Da decomposição de matéria orgânica no solo.",
        ],
        gabarito: 1,
        comentario:
          "O O₂ vem da quebra (fotólise) da H₂O na fase clara. O CO₂ é reduzido, " +
          "não libera O₂. A alternativa A descreve respiração, não fotossíntese.",
      },
      {
        area: "Matemática",
        enunciado:
          "Um gráfico mostra que, ao dobrar o valor de x, o valor de y também dobra. " +
          "Esse comportamento corresponde a uma função:",
        alternativas: ["Linear.", "Quadrática.", "Exponencial.", "Senoidal.", "Inversa."],
        gabarito: 0,
        comentario:
          "Se, ao dobrar o valor de x, o valor de y também dobra, a relação é de " +
          "proporcionalidade direta: y = k · x, isto é, função linear que passa " +
          "pela origem. Na exponencial y = bˣ, o que multiplica a saída é um acréscimo " +
          "constante de x (em y = 2ˣ, de x = 2 para x = 4, y vai de 4 para 16). " +
          "Questão de interpretação de gráfico, típica da 1ª fase.",
      },
      {
        area: "Redação",
        enunciado:
          "Na redação da Unicamp, qual afirmação está correta?",
        alternativas: [
          "São apresentadas 2 propostas e o candidato escreve sobre as duas.",
          "É exigida uma proposta de intervenção detalhada, como no ENEM.",
          "São apresentadas 2 propostas e o candidato escolhe uma para escrever.",
          "A redação não tem pontuação — só as questões discursivas contam.",
          "A redação vale 100 pontos, metade da nota da 2ª fase.",
        ],
        gabarito: 2,
        comentario:
          "2 propostas, escolha UMA. Vale até 12 pontos. Sem proposta de intervenção " +
          "— os erros mais comuns de quem vem do ENEM.",
      },
      {
        area: "Linguagens",
        enunciado:
          "Na lista de literatura da Unicamp, as obras são exigidas principalmente em:",
        alternativas: [
          "Exclusivamente na 1ª fase, em questões de múltipla escolha.",
          "Nas 6 questões discursivas de Língua Portuguesa e Literatura do 1º dia da 2ª fase.",
          "Na redação do 1º dia, como repertório obrigatório.",
          "No 2º dia da 2ª fase, nas questões específicas do curso.",
          "A Unicamp não cobra literatura com lista obrigatória.",
        ],
        gabarito: 1,
        comentario:
          "As obras da lista caem nas duas fases: na 1ª fase, em questões objetivas, e " +
          "na 2ª fase, onde 6 das 10 questões discursivas do 1º dia são de " +
          "Língua Portuguesa e Literatura. Sem ler a lista, o candidato perde mais " +
          "da metade daquela prova.",
      },
{
        area: "Interdisciplinar",
        enunciado:
          "Leia: «A transferência da corte portuguesa para o Brasil, em 1808, mudou a " +
          "dinâmica política e territorial da América Portuguesa.» Considerando esse " +
          "processo, é correto afirmar que:",
        alternativas: [
          "A vinda da corte transferiu o centro do poder colonial para o Rio de Janeiro, e em 1815 o Brasil foi elevado a Reino Unido a Portugal e Algarves.",
          "A transferência da corte enfraqueceu o Brasil, que perdeu autonomia política e econômica.",
          "O Rio de Janeiro deixou de ser capital do Brasil com a vinda da corte.",
          "A corte se transferiu para o Brasil por pressão da Inglaterra, sem impacto na organização territorial.",
          "O evento não alterou o estatuto colonial do Brasil, que permaneceu como colônia até 1822 com a mesma estrutura.",
        ],
        gabarito: 0,
        comentario:
          "1808 = corte no Rio; 1815 = Brasil vira Reino Unido (Portugal, Brasil e " +
          "Algarves). História + Geopolítica: a banca ama cobrar essa data com a " +
          "mudança de status.",
      },
      {
        area: "Interdisciplinar",
        enunciado:
          "A chuva ácida é um fenômeno ambiental causado principalmente pela emissão " +
          "de:",
        alternativas: [
          "Gás carbônico e vapor d'água, que acidificam naturalmente as nuvens.",
          "Óxidos de enxofre e de nitrogênio, que reagem com a água atmosférica formando ácidos.",
          "Metano e amônia, que elevam o pH das águas superficiais.",
          "Oxigênio molecular, que oxida os componentes do solo.",
          "Clorofluorcarbonos, que destroem o ozônio e acidificam a atmosfera.",
        ],
        gabarito: 1,
        comentario:
          "Chuva ácida = SOx + NOx → ácidos sulfúrico e nítrico. Biologia (impacto " +
          "ambiental) + Química (reação) na MESMA questão. Metano é gás de efeito " +
          "estufa; CFC destrói ozônio — não acidifica.",
      },
      {
        area: "Natureza",
        enunciado: "Um objeto em queda livre, desprezando a resistência do ar, apresenta:",
        alternativas: [
          "Aceleração crescente e velocidade constante.",
          "Aceleração constante e velocidade crescente.",
          "Aceleração nula e velocidade constante.",
          "Aceleração crescente e velocidade decrescente.",
          "Aceleração constante e velocidade constante.",
        ],
        gabarito: 1,
        comentario:
          "Queda livre: a = g (constante) e v = g·t (crescente). Conteúdo básico, mas " +
          "a Unicamp cobra a associação entre aceleração e velocidade.",
      },
      {
        area: "Matemática",
        enunciado:
          "Em uma urna, há 5 bolas vermelhas e 3 azuis. Retirando-se uma bola ao " +
          "acaso, a probabilidade de ser azul é:",
        alternativas: ["3/5", "3/8", "5/8", "3/2", "8/3"],
        gabarito: 1,
        comentario:
          "P = 3 azuis / 8 totais = 3/8. A pegadinha é inverter ou somar errado — a " +
          "Unicamp cobra probabilidade simples com distratores próximos.",
      },
      {
        area: "Linguagens",
        enunciado:
          "No verso «Minha terra tem palmeiras, onde canta o sabiá», de Gonçalves " +
          "Dias, a referência à terra natal como espaço de memórias e afetos é um " +
          "recurso:",
        alternativas: [
          "Narrativo, pois descreve uma sequência de eventos.",
          "Lírico, pois expressa a subjetividade e o sentimento do eu poético.",
          "Dramático, pois apresenta diálogo entre personagens.",
          "Satírico, pois ironiza a realidade do poeta.",
          "Épico, pois narra feitos heroicos.",
        ],
        gabarito: 1,
        comentario:
          "Lírico = subjetividade, sentimento, eu poético. Contrasta com narrativo " +
          "(sequência) e épico (feitos). A Unicamp cobra gêneros literários com frequência.",
      },
      {
        area: "Humanas",
        enunciado:
          "Para Hegel, o Estado é a realização da ética objetiva, e a liberdade só se " +
          "efetiva quando o indivíduo:",
        alternativas: [
          "Obedece às leis por medo da punição.",
          "Reconhece as leis como expressão da razão e do bem comum, integrando-se a elas.",
          "Rejeita qualquer forma de autoridade como opressão.",
          "Segue apenas seus interesses individuais, sem considerar a coletividade.",
          "Delega todas as decisões a um líder absoluto.",
        ],
        gabarito: 1,
        comentario:
          "Hegel: liberdade racional = reconhecer a lei como expressão da razão (ética " +
          "objetiva), não como imposição. A alternativa A descreve Hobbes; a C, o " +
          "anarquismo; a D, o liberalismo individualista.",
      },
      {
        area: "Interdisciplinar",
        enunciado: "O desmatamento da Amazônia afeta diretamente o ciclo da água porque:",
        alternativas: [
          "A floresta não contribui para a evapotranspiração, então a derrubada não altera o regime de chuvas.",
          "A vegetação promove a evapotranspiração e a manutenção dos rios voadores; sua redução diminui a umidade e altera o clima regional.",
          "A floresta amazônica não influencia o clima, apenas a biodiversidade.",
          "O desmatamento aumenta a evapotranspiração, intensificando as chuvas.",
          "A Amazônia não possui relação com os cursos d'água do país.",
        ],
        gabarito: 1,
        comentario:
          "Geografia (rio voador, regime de chuvas) + Biologia (evapotranspiração). A " +
          "Amazônia bombeia água para o resto do Brasil — a alternativa B é a única correta.",
      },
      {
        area: "Redação",
        enunciado:
          "Na 1ª fase da Unicamp, a prova de Conhecimentos Gerais é:",
        alternativas: [
          "Dividida em quatro provas por área, como no ENEM.",
          "Uma prova única de 72 questões, comum a todos os candidatos.",
          "Composta por 10 questões discursivas e redação.",
          "Apenas eliminatória, sem pontuação.",
          "Obrigatória apenas para alguns cursos.",
        ],
        gabarito: 1,
        comentario:
          "Unicamp 1ª fase = 72 questões em UMA prova só, para todos. A pegadinha é " +
          "lembrar que o ENEM divide por áreas — a Unicamp não.",
      },
    ],
  },
];

/* Consulta rápida — usada pelas telas do app. */
if (typeof window !== "undefined") {
  window.VESTIBULARES = VESTIBULARES;
  window.acharVestibular = function (id) {
    return VESTIBULARES.filter(function (v) {
      return v.id === id;
    })[0] || null;
  };
}
