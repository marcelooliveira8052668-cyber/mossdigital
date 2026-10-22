/* Textos de apoio BNCC — Linguagens, Códigos e suas Tecnologias (ENEM) */
const TEXTOS_LING = [

  /* ================== LÍNGUA PORTUGUESA — TEXTO 1 ================== */
  {
    id: "txt-lp-1",
    disciplina: "linguagens",
    trimestre: 1,
    tipo: "anuncio",
    fonte: "Adaptado de matéria jornalística",
    titulo: "Campanha de doação de sangue: quando o cartaz fala com você",
    habilidades: ["EM13LP101", "EM13LP201"],
    corpo:
      "<p>No hall de uma unidade básica de saúde da zona leste de São Paulo, um cartaz de papel couché ocupa metade da parede. Em destaque, uma gota de sangue estilizada em vermelho sobre fundo branco e, abaixo, em caixa alta e corpo grande, a frase: «Doe sangue. Você não precisa ser herói para salvar uma vida.» No canto inferior direito, o endereço do hemocentro e o horário de funcionamento.</p>" +
      "<p>A peça não foi escolhida por acaso. Antes de definir o texto, a equipe de comunicação da Secretaria Municipal de Saúde ouviu grupos focais com doadores regulares e com pessoas que nunca haviam doado. A conclusão foi a de que a palavra «herói» afastava parte do público, porque sugeria um ato excepcional, reservado a poucos. Substituiu-se, então, a expressão «seja um herói» por «você não precisa ser herói», construindo um convite que reduz a distância entre o serviço público e o cidadão comum.</p>" +
      "<p>Do ponto de vista linguístico, o cartaz organiza pelo menos três funções da linguagem em camadas. O pronome «você» e o verbo no imperativo («Doe») apontam diretamente para o destinatário, o que caracteriza a função apelativa, também chamada de conativa, típica da publicidade e da propaganda. A informação sobre endereço e horário cumpre a função referencial, porque seu objetivo é descrever um fato do mundo de maneira objetiva. Já o jogo de palavras com a ideia de heroísmo coloca em evidência a própria forma da mensagem, explorando a função poética. Algumas campanhas vão além e usam a função emotiva, com depoimentos em primeira pessoa de pacientes que dependem de transfusão: nesses casos, o cartaz passa a girar em torno do emissor e de sua emoção.</p>",
    questoes: [
      {
        enunciado:
          "No cartaz da campanha de doação de sangue, a frase «Doe sangue. Você não precisa ser herói para salvar uma vida.» está organizada a partir do uso do pronome «você» e do verbo no imperativo. Esses recursos concentram-se predominantemente em qual função da linguagem?",
        alternativas: [
          "Emotiva, porque o cartaz expressa antes de tudo o sentimento de solidariedade de quem produz a mensagem.",
          "Poética, porque a escolha das palavras valoriza a sonoridade e a própria forma do enunciado.",
          "Apelativa, porque o enunciado se volta diretamente para o destinatário, com o objetivo de mobilizá-lo a doar sangue.",
          "Referencial, porque a frase informa de maneira objetiva os horários e o endereço do hemocentro.",
          "Metalinguística, porque a frase explica ao público o significado da palavra «sangue».",
        ],
        correta: 2,
        comentario:
          "As funções da linguagem foram sistematizadas a partir da ênfase em um dos elementos da comunicação. Quando a mensagem se organiza em torno do destinatário — como no uso do pronome «você» e do verbo no imperativo «Doe» —, predomina a função apelativa (ou conativa), característica de textos que pretendem convencer, ordenar ou convocar. A função referencial apareceria se o cartaz se limitasse a informar dados; a emotiva, se o foco fosse a emoção do emissor; a poética, se o enunciado explorasse a forma em si mesma; e a metalinguística, se a mensagem falasse do próprio código. O cartaz descrito mistura funções, mas o núcleo do convite é apelativo.",
      },
      {
        enunciado:
          "Segundo o texto, a substituição da expressão original «seja um herói» por «você não precisa ser herói para salvar uma vida» produziu o seguinte efeito:",
        alternativas: [
          "Reduziu a distância entre o serviço público e o cidadão, ao sugerir que doar sangue é um ato acessível a qualquer pessoa, e não um feito excepcional.",
          "Manteve a função referencial do cartaz, já que a frase passou a informar dados objetivos sobre o estoque do hemocentro.",
          "Fortaleceu a função emotiva, uma vez que o enunciado passou a centrar-se na emoção de quem realiza a doação.",
          "Transformou o cartaz em texto injuntivo, pois eliminou qualquer referência ao destinatário da mensagem.",
          "Deslocou o foco para o próprio código, tornando a peça metalinguística ao explicar em palavras o ato de doar.",
        ],
        correta: 0,
        comentario:
          "O texto explicita que a palavra «herói» afastava parte do público porque sugeria um ato excepcional, reservado a poucos. A nova formulação preserva a ideia de salvamento de vidas, mas a apresenta como algo acessível ao cidadão comum, aproximando o serviço público do leitor. Isso mantém — e até reforça — a função apelativa, porque o convite se dirige ainda mais diretamente ao destinatário. As demais alternativas descrevem efeitos que o texto não sustenta: não houve acréscimo de informação objetiva (referencial), nem foco na emoção do emissor (emotiva), nem explicação sobre o código (metalinguística).",
      },
    ],
  },

  /* ================== LÍNGUA PORTUGUESA — TEXTO 2 ================== */
  {
    id: "txt-lp-2",
    disciplina: "linguagens",
    trimestre: 2,
    tipo: "artigo",
    fonte: "Adaptado de matéria jornalística",
    titulo: "Conectivos em ação: a leitura de uma reportagem sobre mobilidade urbana",
    habilidades: ["EM13LP202", "EM13LP203"],
    corpo:
      "<p>Leia o trecho de uma reportagem publicada em jornal de grande circulação sobre a ampliação da malha cicloviária de uma capital brasileira:</p>" +
      "<blockquote>«A malha cicloviária da capital saltou de 120 para 480 quilômetros em seis anos. O número de acidentes envolvendo ciclistas, entretanto, não caiu na mesma proporção. Por isso, a Secretaria de Transportes anunciou um plano de educação no trânsito. Embora a medida seja bem-vinda, especialistas alertam que ela não substitui a separação física entre ciclistas e motoristas.»</blockquote>" +
      "<p>O trecho foi construído sobre uma cadeia de relações lógicas que o leitor precisa reconstruir para compreender a argumentação. O primeiro período estabelece um dado factual. O segundo introduz uma quebra de expectativa com o conectivo «entretanto», que marca oposição e, ao mesmo tempo, concede razão ao leitor que imaginaria uma queda automática dos acidentes. O terceiro período começa com «Por isso», expressão de conclusão que transforma o diagnóstico em justificativa para a ação do poder público. O quarto, por sua vez, usa «Embora» para abrir uma concessão: reconhece o valor da medida anunciada, mas, na oração seguinte, impõe um limite claro a ela.</p>" +
      "<p>Do ponto de vista da coesão textual, cada um desses articuladores funciona como uma placa de sinalização. Se o repórter tivesse escrito «Portanto, especialistas alertam que a medida não substitui a separação física», a conclusão seria a de que os especialistas consideram o plano desnecessário, e não a de que ele é insuficiente. A escolha do conectivo, portanto, não é um ornamento: ela decide a direção do raciocínio e sustenta a coerência entre as partes do texto.</p>",
    questoes: [
      {
        enunciado:
          "No trecho da reportagem, os conectivos «entretanto», «Por isso» e «Embora» estabelecem, respectivamente, as relações de:",
        alternativas: [
          "causa, conformidade e condição.",
          "tempo, conclusão e proporção.",
          "condição, finalidade e oposição.",
          "oposição, conclusão e concessão.",
          "explicação, consequência e adição.",
        ],
        correta: 3,
        comentario:
          "«Entretanto» é um conectivo adversativo, que institui uma relação de oposição entre o crescimento da malha cicloviária e a ausência de queda proporcional dos acidentes. «Por isso» é conclusivo: apresenta o plano de educação no trânsito como consequência do problema diagnosticado. «Embora» é concessivo: admite que a medida é bem-vinda para, em seguida, limitar seu alcance. Essas três relações — oposição, conclusão e concessão — sustentam a coerência do texto, porque mostram que o repórter não apenas exalta a obra pública nem a desqualifica, mas a dimensiona. Confundir «Embora» com «Portanto», por exemplo, inverteria o sentido da argumentação.",
      },
      {
        enunciado:
          "O comentário do texto afirma que a escolha do conectivo «não é um ornamento». Com base nessa afirmação, assinale a alternativa que descreve corretamente o efeito da substituição proposta.",
        alternativas: [
          "O efeito seria o mesmo, porque as duas expressões indicam que os especialistas apoiam incondicionalmente o plano.",
          "O efeito seria diferente, porque a relação de concessão daria lugar a uma relação de conclusão: o leitor passaria a entender que o alerta dos especialistas decorre do apoio à medida, e não que ele impõe um limite a ela.",
          "O efeito seria idêntico, pois os dois articuladores pertencem à mesma classe gramatical e, por isso, são intercambiáveis em qualquer texto.",
          "O efeito seria mais enfático, uma vez que «Portanto» é um conectivo de maior formalidade do que «Embora» e, por isso, mais adequado ao gênero reportagem.",
          "O efeito seria praticamente nulo, já que a coerência de um texto jornalístico depende apenas da ordem em que os parágrafos se apresentam na página.",
        ],
        correta: 1,
        comentario:
          "A coerência de um texto não está apenas nas palavras, mas nas relações lógicas que elas estabelecem. «Embora a medida seja bem-vinda, especialistas alertam...» instaura uma relação de concessão: admite-se um lado positivo e, na sequência, ressalva-se um limite. Se o articulador fosse trocado por «Portanto», a relação passaria a ser conclusiva, e o leitor seria induzido a entender que o alerta dos especialistas é consequência do próprio apoio à medida. Por isso o texto afirma que o conectivo funciona como placa de sinalização: ele orienta a direção do raciocínio e pode, se mal escolhido, comprometer a coerência.",
      },
    ],
  },

  /* ================== LÍNGUA PORTUGUESA — TEXTO 3 ================== */
  {
    id: "txt-lp-3",
    disciplina: "linguagens",
    trimestre: 3,
    tipo: "carta",
    fonte: "Adaptado de seção de jornal (carta do leitor e editorial)",
    titulo: "Carta do leitor e resposta editorial: a variação linguística em debate",
    habilidades: ["EM13LP102", "EM13LP104"],
    corpo:
      "<p>Carta de leitora publicada na seção de opinião de um jornal mineiro:</p>" +
      "<blockquote>«Sou professora de uma escola municipal e escrevo para registrar um incômodo. Na semana passada, um candidato a um concurso público da cidade foi ridicularizado em comentários nas redes sociais por ter pronunciado «nós VAMOS» com o ritmo do interior. O riso debochado não tinha como alvo um erro de raciocínio, mas sim o sotaque de quem veio de outra cidade. Essa confusão entre erro e marca regional é velha, e ela atravessa a história das nossas escolas. Quando um aluno chega dizendo «os menino chegaram», não estamos diante de uma falha de inteligência, mas de um sistema linguístico diferente daquele que a escola valoriza — e que também é legítimo.»</blockquote>" +
      "<p>O editorial do dia seguinte respondeu em termos próximos: «A língua portuguesa é um sistema vivo e variável, e nenhuma de suas variedades é, em si mesma, superior a outra. O que a escola deve fazer é ensinar também a modalidade escrita formal, sem apagar nem desqualificar a variedade que o aluno traz de casa.»</p>" +
      "<p>O debate toca em um ponto central do ensino de línguas: a distinção entre variedade linguística e desvio. Do ponto de vista científico, todas as línguas apresentam variação interna, determinada por região, classe social, geração, ocupação e situação de uso. O português falado no Brasil reúne dezenas de sotaques reconhecíveis, e nenhum deles é «errado». Um falante pode dominar plenamente a norma culta escrita e, ainda assim, conservar marcas regionais de pronúncia — que, na escrita, simplesmente não aparecem. O preconceito linguístico, portanto, costuma ser um preconceito social travestido de correção gramatical.</p>",
    questoes: [
      {
        enunciado:
          "Na carta da professora e na resposta do editorial, predomina a defesa de que:",
        alternativas: [
          "a escrita culta formal deve ser abandonada, porque ela reproduz a desigualdade social.",
          "as variedades regionais devem substituir a norma culta nos textos jurídicos e escolares.",
          "a variação linguística é um fenômeno irrelevante diante da necessidade de unidade da língua.",
          "o desvio de concordância, em qualquer contexto de uso, deve ser aceito sem ressalvas pela escola.",
          "a variação linguística é legítima, e a escola deve ensinar também a modalidade formal sem desqualificar a variedade que o aluno traz de casa.",
        ],
        correta: 4,
        comentario:
          "Os dois textos convergem: reconhecem a legitimidade científica de todas as variedades do português e, ao mesmo tempo, afirmam que a escola tem o papel de ensinar a modalidade escrita formal. A professora não pede o abandono da norma culta, e sim o fim da confusão entre erro e marca regional; o editorial é explícito ao dizer que a escola deve ensinar a modalidade formal «sem apagar nem desqualificar» a variedade do aluno. As alternativas que propõem substituir a norma culta ou abolir a escrita formal deformam o argumento, e a que trata a variação como irrelevante contraria diretamente o texto.",
      },
      {
        enunciado:
          "A forma «os menino chegaram», citada na carta da leitora, é utilizada no texto como exemplo de:",
        alternativas: [
          "erro grave de regência verbal, que compromete a inteligibilidade do enunciado.",
          "desvio fonético provocado pela mistura de línguas indígenas com o português.",
          "marca de uma variedade linguística legítima, distinta da noção de erro, ainda que não corresponda à norma culta escrita.",
          "construção típica da linguagem literária, empregada com valor estético.",
          "forma arcaica do português, preservada apenas em cidades do interior do estado de Minas Gerais.",
        ],
        correta: 2,
        comentario:
          "A carta é explícita: «não estamos diante de uma falha de inteligência, mas de um sistema linguístico diferente daquele que a escola valoriza». A expressão «os menino chegaram» ilustra a variação no plano morfológico, comum em várias variedades do português brasileiro, e não um erro de raciocimento. O preconceito linguístico surge justamente quando se trata toda diferença — regional, social ou geracional — como incorreção. Vale notar que a própria resposta do editorial não nega a existência da norma formal: ela apenas recusa a ideia de que uma variedade seja linguisticamente superior a outra.",
      },
    ],
  },

  /* ================== REDAÇÃO — TEXTO 1 ================== */
  {
    id: "txt-red-1",
    disciplina: "redacao",
    trimestre: 1,
    tipo: "artigo",
    fonte: "Adaptado de matéria jornalística",
    titulo: "Anatomia de uma redação nota mil: tese, argumentos e repertório",
    habilidades: ["EM13LP101", "EM13LP403"],
    corpo:
      "<p>Uma banca corretora de uma universidade pública divulgou, em seu relatório anual, os cinco problemas mais frequentes nas redações do vestibular. O primeiro não foi a ortografia, mas a ausência de tese: o candidato descrevia o tema durante quatro parágrafos sem nunca enunciar um ponto de vista defensável. O segundo problema era o repertório decorado — citações de direitos humanos, impacto das redes sociais ou dados de saúde mental apareciam em qualquer tema, encaixadas a fórceps. O terceiro era a lista de argumentos sem hierarquia, em que o candidato dizia que o problema tem «várias causas» sem mostrar qual delas sustenta sua conclusão. O quarto era a proposta de intervenção vaga, do tipo «conscientizar a população». O quinto era o projeto de texto ignorado: o candidato simplesmente escrevia o que vinha à cabeça.</p>" +
      "<p>A estrutura de um texto dissertativo-argumentativo pode ser pensada como um edifício. A tese é a planta: define o que será defendido e em que direção a argumentação caminha. Os argumentos são as paredes: cada um precisa de um desenvolvimento próprio, com explicação, exemplo e consequência. O repertório sociocultural é a fundação: só é produtivo quando é mobilizado para resolver um problema colocado pela tese, não quando é exposto como ornamento. A introdução apresenta o tema e a tese; o desenvolvimento detalha e comprova; a conclusão retoma a tese à luz do que foi demonstrado e encaminha a proposta de intervenção.</p>" +
      "<p>Um repertório produtivo, portanto, não precisa ser erudito. Uma observação do cotidiano, um dado de uma reportagem local, uma lembrança de um filme ou uma experiência de trabalho podem funcionar, desde que o candidato explique a relação entre esse material e o problema em discussão. O que derruba a nota não é a simplicidade do repertório, mas a sua ausência de função argumentativa.</p>",
    questoes: [
      {
        enunciado:
          "Segundo o texto, o repertório sociocultural é considerado produtivo quando:",
        alternativas: [
          "consiste em citações de autores clássicos e dados oficiais, que conferem autoridade ao texto.",
          "é mobilizado para resolver um problema colocado pela tese, e não exposto como ornamento do texto.",
          "aparece em todos os parágrafos, garantindo a presença de elementos culturais na dissertação.",
          "abrange temas contemporâneos, como redes sociais, impactos ambientais e saúde mental.",
          "é apresentado na conclusão, momento em que sintetiza os argumentos desenvolvidos.",
        ],
        correta: 1,
        comentario:
          "O texto é direto: o repertório «só é produtivo quando é mobilizado para resolver um problema colocado pela tese, não quando é exposto como ornamento». A metáfora da fundação ajuda: sem fundação o edifício não se sustenta, mas a fundação existe para sustentar a construção, não para ser exibida. O relatório da banca critica justamente o repertório decorado, encaixado em qualquer tema. Assim, um dado de uma reportagem local ou uma experiência pessoal podem valer mais do que uma citação erudita descolada do problema em discussão.",
      },
      {
        enunciado:
          "No trecho «Um candidato chegou a dizer que a ausência de transporte público nas periferias é consequência da desorganização do país», a formulação é apontada pelo texto como exemplo de:",
        alternativas: [
          "tese clara e defensável, porque identifica um problema e sua causa principal.",
          "argumento bem hierarquizado, porque aponta uma causa geral para um fenômeno específico.",
          "generalização que enfraquece a coerência, porque uma causa ampla demais não explica o problema analisado.",
          "repertório sociocultural produtivo, porque remete a um diagnóstico de alcance nacional.",
          "proposta de intervenção completa, porque indica um agente e uma ação a ser realizada.",
        ],
        correta: 2,
        comentario:
          "A generalidade excessiva é um dos defeitos mais graves em uma dissertação. Quando o candidato atribui o problema a uma causa vasta e abstrata — como «a desorganização do país» —, ele não demonstra como essa causa opera no caso concreto, nem permite que o leitor avalie a relação entre causa e efeito. Um argumento forte é específico: mostra o mecanismo, apresenta dados ou exemplos e liga cada etapa à tese. A formulação citada, além de vaga, tende a produzir uma proposta de intervenção igualmente vaga, o que compromete também a competência relativa à solução do problema.",
      },
    ],
  },

  /* ================== REDAÇÃO — TEXTO 2 ================== */
  {
    id: "txt-red-2",
    disciplina: "redacao",
    trimestre: 2,
    tipo: "roteiro",
    fonte: "Adaptado de matéria jornalística",
    titulo: "Proposta de intervenção: agente, ação, modo e efeito",
    habilidades: ["EM13LP104", "EM13LP403"],
    corpo:
      "<p>Se a introdução define o problema e o desenvolvimento o explica, a conclusão precisa mostrar o que fazer com ele. É aí que entra a proposta de intervenção, elemento que costuma separar redações medianas de redações altas. A matriz de correção do ENEM, na competência que trata da proposta de intervenção, exige que o candidato apresente uma solução detalhada, e não um simples apelo genérico à conscientização.</p>" +
      "<p>Um roteiro simples ajuda a testar a qualidade da proposta. Primeiro, o agente: quem executa? «O governo», sozinho, é pouco; «o Ministério da Saúde, em parceria com as secretarias estaduais de educação» é melhor, porque delimita responsabilidades. Segundo, a ação: o que será feito? «Conscientizar» é vago; «inserir aulas de educação financeira na Base Nacional Comum Curricular» é verificável. Terceiro, o modo: como? Aqui entram os meios — campanhas, editais, mudanças legais, verbas, prazos, canais de participação. Quarto, o efeito: para que? A proposta precisa indicar o resultado esperado, mostrando que ela ataca a causa apontada no desenvolvimento, e não um sintoma qualquer.</p>" +
      "<p>Vale lembrar que a proposta deve respeitar os direitos humanos e ser viável. Soluções que ferem a dignidade, que suprimem liberdades ou que dependem de verbas inexistentes sem qualquer justificativa costuma ser penalizadas. Também é preciso cuidado com a presunção: prometer o que nenhum agente pode cumprir enfraquece o texto. Uma proposta enxuta, específica e ligada à tese vale mais do que três pedidos genéricos acumulados no último parágrafo.</p>",
    questoes: [
      {
        enunciado:
          "De acordo com o roteiro apresentado no texto, a alternativa que contém a proposta de intervenção mais completa é:",
        alternativas: [
          "É preciso que a população se conscientize sobre a importância do problema o mais rápido possível.",
          "O governo deve criar leis mais severas e campanhas educativas em todos os meios de comunicação.",
          "As escolas precisam repensar sua atitude, promovendo debates e atividades ao longo do ano letivo.",
          "O Ministério da Educação deve incluir disciplina de educação financeira no ensino médio, por meio de alteração na Base Nacional Comum Curricular, com formação de professores e material didático, para reduzir o endividamento entre jovens.",
          "Cabe à sociedade civil e ao poder público agirem juntos, buscando soluções eficazes e duradouras.",
        ],
        correta: 3,
        comentario:
          "A alternativa correta cumpre os quatro passos do roteiro. O agente está delimitado (Ministério da Educação); a ação é verificável (incluir disciplina de educação financeira); o modo é detalhado (alteração na Base Nacional Comum Curricular, formação de professores, material didático); e o efeito está explícito (reduzir o endividamento entre jovens), ligado à causa apontada no desenvolvimento. As outras alternativas falham justamente nesses pontos: «conscientizar a população» e «repensar sua atitude» são ações vagas; «leis mais severas e campanhas» não especificam como nem para quê; e «agirem juntos» não identifica nenhum agente concreto.",
      },
      {
        enunciado:
          "Segundo o texto, uma proposta de intervenção que prometa «erradicar o problema em seis meses, com campanhas permanentes em todas as escolas do país» seria problemática principalmente porque:",
        alternativas: [
          "omite o agente responsável, já que não indica quem executaria as campanhas.",
          "é inviável e pouco realista, pois promete o que nenhum agente pode cumprir, o que enfraquece o texto.",
          "desrespeita os direitos humanos ao propor ação de alcance nacional sem consulta prévia.",
          "deveria estar na introdução, e não na conclusão do texto dissertativo-argumentativo.",
          "confunde a proposta de intervenção com a tese, repetindo o que já foi defendido no primeiro parágrafo.",
        ],
        correta: 1,
        comentario:
          "O texto alerta expressamente para a presunção: «prometer o que nenhum agente pode cumprir enfraquece o texto». Uma solução viável é aquela que dimensiona o problema e respeita limites reais de prazo, orçamento e alcance. Note que a proposta citada até tem agente implícito e ação, mas falha no modo e no efeito porque é desproporcional. Por outro lado, uma proposta não precisa ser modesta a ponto de ser inócua; o equilíbrio está em detalhar os meios e indicar um efeito plausível, atacando a causa apontada no desenvolvimento.",
      },
    ],
  },

  /* ================== REDAÇÃO — TEXTO 3 ================== */
  {
    id: "txt-red-3",
    disciplina: "redacao",
    trimestre: 3,
    tipo: "cronologia",
    fonte: "Adaptado de matéria jornalística",
    titulo: "Reescrita e revisão: o percurso de um texto até a versão final",
    habilidades: ["EM13LP101", "EM13LP104"],
    corpo:
      "<p>Uma professora de uma escola estadual registrou, em um diário de aula, as etapas pelas quais passou a produção de uma redação de um de seus alunos ao longo de três semanas. O caso ajuda a entender que escrever bem é, antes de tudo, reescrever.</p>" +
      "<p><strong>Semana 1 — o rascunho.</strong> O aluno escreveu o que sabia sobre o tema, sem se preocupar com a forma. O texto tinha 32 linhas e uma única ideia central. A professora não corrigiu a ortografia nessa etapa: pediu apenas que ele sublinhasse a frase que resumia sua opinião. A frase encontrada era «O problema é grande e precisa de atenção». Diante disso, a professora pediu que ele a transformasse em uma afirmação sobre a qual fosse possível discordar.</p>" +
      "<p><strong>Semana 2 — a reescrita.</strong> O aluno voltou com uma tese mais precisa e dois argumentos. A professora então trabalhou a progressão textual: cada parágrafo deveria acrescentar informação nova, e não repetir a anterior com outras palavras. Foram cortadas quatro linhas de introdução, porque o leitor não precisava de tantos rodeios para chegar ao problema. Dois exemplos concretos substituíram frases genéricas como «muitas pessoas sofrem com isso».</p>" +
      "<p><strong>Semana 3 — a revisão.</strong> Só então entraram as correções de superfície: acentuação, pontuação, concordância, escolha de palavras. O aluno leu o texto em voz alta, encontrou duas frases longas demais e as dividiu. A versão final tinha 26 linhas — menos do que o rascunho — e dizia mais.</p>" +
      "<p>A lição do registro é simples: confundir revisão com reescrita leva o candidato a perder tempo nas provas. A revisão de superfície é a última etapa, não a primeira. Um texto com uma ou outra falha de acentuação, mas com tese clara e argumentos consistentes, vale muito mais do que um texto impecavelmente «limpo» que não argumenta nada.</p>",
    questoes: [
      {
        enunciado:
          "Pela sequência descrita no texto, a professora priorizou, na primeira etapa do trabalho, o desenvolvimento de qual aspecto do texto?",
        alternativas: [
          "A correção ortográfica e a acentuação, para evitar vícios desde o início.",
          "A ampliação do número de linhas, garantindo que o tema fosse bem explorado.",
          "A identificação e o refinamento da tese, transformando uma opinião genérica em uma afirmação defensável.",
          "A eliminação de repetições e de frases longas, por meio da leitura em voz alta.",
          "A inserção de repertório sociocultural diversificado ao longo dos parágrafos.",
        ],
        correta: 2,
        comentario:
          "A professora foi explícita ao dizer que não corrigiu a ortografia nessa etapa. O pedido foi outro: localizar a frase que resumia a opinião do aluno para, em seguida, transformá-la em uma afirmação sobre a qual fosse possível discordar. Esse trabalho é o de construção da tese, que precisa ser defensável e específica, e não uma constatação evidente com a qual ninguém discutiria. A revisão de superfície — acentuação, repetições, frases longas — apareceu apenas na Semana 3, e a ampliação do número de linhas não foi uma meta: a versão final teve menos linhas do que o rascunho.",
      },
      {
        enunciado:
          "Comparando o rascunho da Semana 1 com a versão final da Semana 3, o texto defende que a qualidade da redação aumentou principalmente porque:",
        alternativas: [
          "o aluno passou a escrever mais, pois a extensão é o principal indicador de profundidade na redação.",
          "houve corte de conteúdo supérfluo e substituição de frases genéricas por exemplos concretos, o que aumentou a densidade argumentativa.",
          "a professora corrigiu a ortografia já na primeira etapa, evitando a fixação de vícios de escrita.",
          "o aluno eliminou a tese original, que era genérica, e passou a apenas descrever o tema.",
          "a proposta de intervenção foi transferida para a introdução, facilitando a compreensão do leitor.",
        ],
        correta: 1,
        comentario:
          "O registro mostra que a versão final tinha 26 linhas, ou seja, menos do que o rascunho de 32 — e, ainda assim, dizia mais. Os ganhos vieram de cortes (quatro linhas de rodeios na introdução) e de substituições (exemplos concretos no lugar de frases como «muitas pessoas sofrem com isso»). Isso ilustra a diferença entre reescrita e revisão: a primeira age sobre as ideias e a estrutura; a segunda, sobre a superfície. Um texto mais longo não é necessariamente melhor, e um texto «limpo» do ponto de vista ortográfico pode permanecer vazio de argumentação.",
      },
    ],
  },

  /* ================== LITERATURA — TEXTO 1 ================== */
  {
    id: "txt-lit-1",
    disciplina: "literatura",
    trimestre: 1,
    tipo: "artigo",
    fonte: "Adaptado de artigo de divulgação cultural",
    titulo: "O Indianismo romântico: herói nacional, obra e contexto histórico",
    habilidades: ["EM13LIT1001", "EM13LIT1002"],
    corpo:
      "<p>Em 1836, a publicação de «Suspiros poéticos e saudades», de Gonçalves de Magalhães, é tomada pela historiografia literária como o marco inicial do Romantismo no Brasil. O país havia se tornado independente havia pouco mais de uma década e precisava construir símbolos próprios: uma natureza, um herói e uma língua que não fossem apenas a herança do colonizador. Foi nesse esforço que nasceu o Indianismo, vertente em que o indígena passou a ocupar o lugar de personagem central.</p>" +
      "<p>José de Alencar levou essa transformação ao romance. Em «O Guarani» (1857), o protagonista Peri, guerreiro potiguar, luta para proteger a família de Dom Antônio de Mariz; em «Iracema» (1865), a narrativa começa com a frase «Além, muito além daquela serra, que ainda azula no horizonte, nasceu Iracema», e acompanha a união entre a protagonista indígena e o colonizador português Martim, união da qual nasce Moacir, apresentado como o primeiro filho da terra — uma alegoria da formação do povo brasileiro. Durante décadas, essas personagens foram lidas nas escolas como a própria alegoria nacional.</p>" +
      "<p>A crítica posterior, no entanto, mostrou que o indígena desses romances é mais uma invenção do que um retrato. Alencar não era antropólogo, e seus indígenas foram construídos a partir de crônicas de viajantes, da poesia de Gonçalves Dias e da imaginação do romancista: falam um português elaborado e agem segundo categorias europeias de honra e dever. Enquanto isso, os povos indígenas reais da segunda metade do século XIX eram dizimados, expulsos de suas terras e integrados à força a aldeamentos. O Indianismo, assim, cumpriu um papel duplo: deu ao Brasil uma mitologia própria e, ao mesmo tempo, apagou os povos originários para colocar em seu lugar um personagem idealizado e convenientemente desaparecido.</p>",
    questoes: [
      {
        enunciado:
          "Com base no texto, é correto afirmar que o Indianismo romântico:",
        alternativas: [
          "tinha como objetivo documentar com precisão etnográfica a vida dos povos indígenas do século XIX.",
          "surgiu antes da Independência do Brasil, como forma de sustentar a permanência de Portugal na colônia.",
          "era rejeitado pelos leitores do século XIX por utilizar a língua portuguesa em vez das línguas indígenas.",
          "representava os indígenas como inimigos que deveriam ser derrotados pelos heróis colonizadores.",
          "construiu uma imagem idealizada do indígena, cumprindo ao mesmo tempo um papel de fundação mítica do povo brasileiro e um apagamento dos povos reais.",
        ],
        correta: 4,
        comentario:
          "O texto descreve o Indianismo como uma dupla operação. De um lado, ele forneceu ao Brasil recém-independente símbolos próprios — Peri, Iracema, Moacir, o primeiro filho da terra. De outro, a idealização do indígena literário serviu para encobrir a violência concreta sofrida pelos povos indígenas no período, que aparecem na história como dizimados, expulsos de suas terras e integrados à força a aldeamentos. A alternativa correta articula as duas faces. As demais negam elementos centrais do texto: o Indianismo não era documento etnográfico, não nasceu antes da Independência, não foi rejeitado pelo público do século XIX e não tratava o indígena como inimigo — pelo contrário, ele era o herói.",
      },
      {
        enunciado:
          "A frase que abre «Iracema» — «Além, muito além daquela serra, que ainda azula no horizonte, nasceu Iracema» — é citada no texto com a finalidade de:",
        alternativas: [
          "exemplificar uma abertura em que a paisagem do Ceará se liga ao nascimento da heroína que simboliza a terra e a origem do povo.",
          "demonstrar que Alencar dominava as línguas indígenas e as reproduzia com fidelidade no romance.",
          "mostrar que a obra é um registro histórico confiável da chegada dos portugueses ao litoral cearense.",
          "comprovar que o romance indianista foi escrito antes da Independência do Brasil.",
          "caracterizar o estilo parnasiano, marcado pela objetividade e pela descrição científica da natureza.",
        ],
        correta: 0,
        comentario:
          "A citação funciona como exemplo do procedimento alegórico descrito pelo texto: o nascimento da personagem é fundido ao nascimento da terra, o que sustenta a leitura de «Iracema» como mito de origem nacional. É justamente esse caráter simbólico que a crítica posterior contrapõe ao indígena histórico, real e massacrado. A alternativa que fala em fidelidade às línguas indígenas contraria o texto, que afirma serem os personagens construídos a partir de crônicas de viajantes e da imaginação do autor; a que fala em registro histórico confiável é incompatível com a denúncia de invenção; e a referência ao parnasianismo é anacrônica, pois o parnasianismo é posterior ao primeiro romantismo e se caracteriza pelo rigor formal e pela impessoalidade.",
      },
    ],
  },

  /* ================== LITERATURA — TEXTO 2 ================== */
  {
    id: "txt-lit-2",
    disciplina: "literatura",
    trimestre: 2,
    tipo: "artigo",
    fonte: "Adaptado de artigo de divulgação cultural",
    titulo: "Dom Casmurro: o narrador ciumento e a dúvida que não se resolve",
    habilidades: ["EM13LIT2001", "EM13LIT3001"],
    corpo:
      "<p>Publicado em 1899, «Dom Casmurro» é a obra em que a prosa de Machado de Assis atinge um de seus pontos de maior tensão psicológica. O narrador, Bentinho, já idoso e recluso no Engenho Novo, decide escrever as memórias de sua juventude para explicar ao leitor por que recebeu o apelido de casmurro — isto é, fechado em si mesmo, calado. Seu projeto declarado é atar as duas pontas da vida, reconstruindo a trajetória que o levou do seminário ao noivado com Capitu e, finalmente, à separação.</p>" +
      "<p>O problema é que Bentinho é um narrador suspeito. Tudo o que o leitor sabe de Capitu chega filtrado pelo olhar e pela memória dele, movidos por ciúme e desconfiança. A cena do enterro, em que Bentinho observa o olhar de Capitu para Escobar no cemitério; a semelhança física que ele passa a reconhecer entre o filho Ezequiel e o amigo morto; as interpretações obsessivas construídas a partir desses elementos: nada disso é confirmado nem desmentido pelo texto. Machado de Assis, mestre da ironia, preferiu deixar a dúvida em pé. É por isso que a obra ainda hoje é lida como um estudo sobre a impossibilidade de conhecer a verdade do outro a partir de aparências e interpretações.</p>" +
      "<p>A estratégia não é exclusiva dele. Em «Vidas secas» (1938), Graciliano Ramos constrói a fala seca e oblíqua de Fabiano para mostrar o que a miséria impede de dizer; em «A Hora da Estrela» (1977), Clarice Lispector transforma o narrador Rodrigo S. M. em um problema explícito, que admite não conseguir descrever a protagonista. Os três autores têm em comum a seguinte aposta: o ato de narrar, com seus limites, suas omissões e suas falhas, torna-se matéria do próprio enredo.</p>",
    questoes: [
      {
        enunciado:
          "Segundo o texto, a dúvida em relação à fidelidade de Capitu permanece sem resolução porque:",
        alternativas: [
          "a obra ficou incompleta, e Machado de Assis não chegou a escrever os capítulos finais.",
          "Bentinho morre antes de concluir as memórias, interrompendo a narrativa no momento decisivo.",
          "Capitu nega sistematicamente as acusações, mas o narrador se recusa a registrar as respostas dela.",
          "toda informação sobre Capitu é filtrada pela memória ciumenta de Bentinho, e o texto não confirma nem desmente suas suspeitas.",
          "o autor optou por um narrador onisciente que desconhece os pensamentos dos personagens.",
        ],
        correta: 3,
        comentario:
          "A chave de leitura oferecida pelo texto é a do ponto de vista. Bentinho narra em primeira pessoa, muito depois dos fatos, e é justamente a subjetividade dele — o ciúme, a desconfiança, a obsessão por sinais — que impede o leitor de separar fato e interpretação. As cenas que ele apresenta são ambíguas, e o romance não traz nenhuma instância que as valide ou as refute. As alternativas que falam em obra incompleta, morte do narrador ou recusa em registrar respostas inventam elementos inexistentes no texto, e a do narrador onisciente contradiz diretamente a análise, já que a ausência de onisciência é o próprio motor do problema.",
      },
      {
        enunciado:
          "No terceiro parágrafo, o texto aproxima «Dom Casmurro», «Vidas secas» e «A Hora da Estrela» com o objetivo de mostrar que, nas três obras:",
        alternativas: [
          "predomina o estilo realista de descrição objetiva do ambiente social e econômico.",
          "as protagonistas femininas são silenciadas para reforçar a dominação patriarcal.",
          "o próprio ato de narrar, com seus limites, suas omissões e suas falhas, torna-se matéria do enredo.",
          "o ciúme é o motor psicológico que conduz a ação de todos os personagens principais.",
          "a narração em primeira pessoa é empregada apenas com a finalidade de produzir efeito de humor.",
        ],
        correta: 2,
        comentario:
          "O texto fecha o terceiro parágrafo com uma generalização explícita: os três autores apostam em transformar a narração em conteúdo da obra. Em Machado, isso ocorre pela memória interessada e ciumenta de Bentinho; em Graciliano, pela fala seca e truncada de Fabiano, que revela pela forma o que a pobreza impede de dizer; em Clarice, pelo narrador que expõe a própria incapacidade de descrever. Essa é uma questão recorrente da literatura moderna, e por isso as três obras são aproximadas. As outras alternativas descrevem traços parciais ou inexistentes: o estilo realista objetivo não se aplica a «A Hora da Estrela»; o silenciamento feminino não é a chave comum; e a primeira pessoa em Machado não tem função humorística.",
      },
    ],
  },

  /* ================== LITERATURA — TEXTO 3 ================== */
  {
    id: "txt-lit-3",
    disciplina: "literatura",
    trimestre: 3,
    tipo: "cronologia",
    fonte: "Adaptado de artigo de divulgação cultural",
    titulo: "Da Semana de Arte Moderna à escrevivência: a literatura brasileira em movimento",
    habilidades: ["EM13LIT1003", "EM13LIT2002"],
    corpo:
      "<p><strong>1922 — a ruptura.</strong> Em fevereiro, no Theatro Municipal de São Paulo, três dias de apresentações de música, poesia e artes plásticas ficaram conhecidos como a Semana de Arte Moderna. Não havia programa único entre os participantes, mas havia um alvo comum: a literatura e a arte ainda presas ao parnasianismo e à sintaxe portuguesa. No mesmo ano, Mario de Andrade publicava «Paulicéia Desvairada».</p>" +
      "<p><strong>1928 — a antropofagia.</strong> Tarsila do Amaral pinta «Abaporu» e o oferece a Oswald de Andrade, que renomeou o grupo de Aracy para Antropofagia. A «Revista de Antropofagia», em sua primeira dentição, trazia o «Manifesto Antropófago», com a fórmula «Tupi or not Tupi, eis a questão» e a proposta de devorar a herança estrangeira para transformá-la em criação brasileira. No mesmo ano, Mario de Andrade publicava «Macunaíma, o herói sem nenhum caráter».</p>" +
      "<p><strong>1956 — a invenção de uma língua.</strong> João Guimarães Rosa publica «Grande Sertão: Veredas», em que Riobaldo afirma, em sua fala ao mesmo tempo oral e filosófica, que o sertão está dentro da gente. A frase resume o gesto da obra: recriar a linguagem para dar conta de um mundo que o português padrão não alcançava.</p>" +
      "<p><strong>2003 em diante — a escrevivência.</strong> Conceição Evaristo, mineira de Belo Horizonte, cunha a palavra escrevivência para nomear uma literatura que escreve a partir da experiência de vida das mulheres negras e periféricas. Em «Ponciá Vicêncio» (2003) e em «Becos da Memória» (2006), a memória da escravidão e o cotidiano das periferias deixam de ser pano de fundo e passam a ser o próprio lugar de enunciação.</p>" +
      "<p>A linha do tempo, evidentemente, não é uma sucessão de superações. A antropofagia e a escrevivência respondiam a necessidades diferentes: a primeira disputava o sentido da modernidade brasileira; a segunda, o direito de narrar a própria história. O que une esses momentos é a busca de uma língua e de um repertório que não sejam mera cópia do estrangeiro.</p>",
    questoes: [
      {
        enunciado:
          "De acordo com o texto, a proposta antropofágica de Oswald de Andrade, em 1928, consistia em:",
        alternativas: [
          "recusar toda influência europeia e produzir uma arte exclusivamente indígena.",
          "devorar criticamente a herança estrangeira para transformá-la em criação brasileira.",
          "imitar as vanguardas europeias, demonstrando fidelidade ao projeto moderno.",
          "abandonar a literatura escrita e valorizar apenas a oralidade de origem tupi.",
          "restaurar as formas parnasianas de versificação, atualizadas para o século XX.",
        ],
        correta: 1,
        comentario:
          "A metáfora antropofágica não é de recusa, e sim de digestão: os modernistas propunham «engolir» as técnicas e as influências estrangeiras para devolvê-las transformadas em algo brasileiro. O texto descreve exatamente isso ao falar em «devorar a herança estrangeira para transformá-la em criação brasileira», e a fórmula «Tupi or not Tupi, eis a questão» resume o gesto, que é ao mesmo tempo de incorporação e de inversão irônica do cânone europeu. As alternativas que sugerem recusa total, imitação servil, abandono da escrita ou retorno ao parnasianismo contradizem o texto — inclusive a última, pois o parnasianismo era justamente o alvo dos manifestos de 1922.",
      },
      {
        enunciado:
          "No texto, o conceito de escrevivência, atribuído a Conceição Evaristo, é apresentado como:",
        alternativas: [
          "uma técnica de composição poética baseada na rima e na métrica clássica.",
          "a transcrição literal de depoimentos orais colhidos nas periferias brasileiras.",
          "um gênero literário exclusivo da poesia contemporânea de autoria negra.",
          "uma proposta de retorno ao romance histórico do século XIX, centrado na memória da escravidão.",
          "uma escrita que toma a experiência de vida de mulheres negras e periféricas como fundamento da criação.",
        ],
        correta: 4,
        comentario:
          "O texto define escrevivência como «uma literatura que escreve a partir da experiência de vida das mulheres negras e periféricas», e mostra seu efeito em «Ponciá Vicêncio» e em «Becos da Memória»: a história da escravidão e o cotidiano das periferias passam a ser o lugar de enunciação, e não apenas o cenário. Isso altera quem narra e de onde se narra. A alternativa que trata o conceito como técnica métrica confunde-o com as escolas do século XIX; a que fala em transcrição literal ignora que se trata de criação literária; a que o restringe à poesia contraria os exemplos citados, que são romances; e a que o liga ao romance histórico do século XIX é anacrônica, pois Conceição Evaristo é autora contemporânea.",
      },
    ],
  },
];
if (typeof window !== "undefined") { window.TEXTOS_LING = TEXTOS_LING; }
