/* =============================================================================
   ATIVIDADES — Ciências da Natureza (Biologia, Física, Química)
   3 atividades por disciplina (1 por trimestre) · 2 questões estilo ENEM cada
   Gabarito comentado em cada questão · Habilidades BNCC em cada item
   ============================================================================= */

const ATIVIDADES_NATUREZA = [
  /* ======================= BIOLOGIA — TRIMESTRE 1 ======================= */
  {
    id: "atv-bio-1",
    area: "natureza",
    disciplina: "biologia",
    trimestre: 1,
    titulo: "Fotossíntese e respiração celular",
    descricao:
      "Duas questões sobre os processos de troca de matéria e energia na célula.",
    tipo: "tarefa",
    videoApoio: "https://www.youtube.com/embed/vFRM0YHkTZw",
    habilidades: ["EM13CNT102"],
    questoes: [
      {
        enunciado:
          "Em regiões de seca, determinadas plantas realizam o ciclo CAM (Metabolismo Ácido Crassuláceo) e abrem os estômatos predominantemente à noite. Esse mecanismo é uma adaptação que:",
        alternativas: [
          "Maximiza a fotossíntese durante o período de maior insolação.",
          "Reduz a perda de água pela transpiração, fixando o CO₂ no período noturno.",
          "Acelera a respiração celular para liberar energia antes do amanhecer.",
          "Substitui a clorofila por pigmentos que absorvem luz infravermelha.",
          "Impede a entrada de água nas raízes durante o dia.",
        ],
        correta: 1,
        comentario:
          "No ciclo CAM, a abertura noturna dos estômatos e a fixação do CO₂ em ácido málico reduzem a transpiração. Durante o dia, com os estômatos fechados, o CO₂ é liberado e usado na fotossíntese.",
      },
      {
        enunciado:
          "A respeito da respiração celular aeróbica, é correto afirmar que:",
        alternativas: [
          "Ocorre na mitocôndria dos eucariotos e libera energia na forma de ATP.",
          "É o processo de produção de glicose a partir de CO₂ e luz.",
          "Não produz ATP, apenas libera CO₂ e vapor de água.",
          "Ocorre exclusivamente em anaeróbios, como as leveduras.",
          "É a etapa que ocorre na membrana plasmática das células procarióticas.",
        ],
        correta: 0,
        comentario:
          "A respiração aeróbica degrada a glicose, iniciando-se no citosol (glicólise) e continuando na mitocôndria (ciclo de Krebs e cadeia de transporte de elétrons), gerando ATP. A fotossíntese é o processo inverso: consome CO₂ e luz para produzir glicose.",
      },
    ],
  },

  /* ======================= BIOLOGIA — TRIMESTRE 2 ======================= */
  {
    id: "atv-bio-2",
    area: "natureza",
    disciplina: "biologia",
    trimestre: 2,
    titulo: "Genética mendeliana",
    descricao:
      "Duas questões sobre segregação, retrocruzamento e resolução de problemas genéticos.",
    tipo: "tarefa",
    videoApoio: "https://www.youtube.com/embed/z4U8K7B1qk",
    habilidades: ["EM13CNT304", "EM13CNT305"],
    questoes: [
      {
        enunciado:
          "Um homem de fenótipo normal (Xᴰ Y) casa-se com uma mulher portadora do daltonismo (Xᴰ Xᵈ). Qual a probabilidade de o casal ter uma filha daltônica?",
        alternativas: ["25%", "50%", "75%", "100%", "0%"],
        correta: 4,
        comentario:
          "Do cruzamento Xᴰ Y × Xᴰ Xᵈ, todas as filhas recebem o Xᴰ do pai, portanto nenhuma filha será daltônica. A probabilidade é 0%. Já os filhos têm 50% de chance de ser daltônicos (Xᵈ Y).",
      },
      {
        enunciado:
          "Segundo a primeira lei de Mendel, no cruzamento de dois heterozigotos Aa × Aa, a proporção esperada de genótipos (AA : Aa : aa) é:",
        alternativas: ["1 : 3", "1 : 2 : 1", "3 : 1", "1 : 1", "9 : 3 : 3 : 1"],
        correta: 1,
        comentario:
          "Em Aa × Aa obtém-se 1 AA : 2 Aa : 1 aa — proporção genotípica 1 : 2 : 1. " +
          "Como A é dominante, AA e Aa têm fenótipo dominante e apenas aa (1/4) " +
          "apresenta fenótipo recessivo; a proporção fenotípica é, portanto, 3 : 1. " +
          "A proporção 9 : 3 : 3 : 1 decorreria de um cruzamento com dois caracteres " +
          "(segunda lei de Mendel).",
      },
    ],
  },

  /* ======================= BIOLOGIA — TRIMESTRE 3 ======================= */
  {
    id: "atv-bio-3",
    area: "natureza",
    disciplina: "biologia",
    trimestre: 3,
    titulo: "Imunidade e vacinação",
    descricao:
      "Questões sobre imunidade adaptativa, memória imunológica e campanhas de vacinação.",
    tipo: "tarefa",
    videoApoio: "https://www.youtube.com/embed/z4U8K7B1qk",
    habilidades: ["EM13CNT402"],
    questoes: [
      {
        enunciado:
          "Uma criança é vacinada contra o sarampo e, anos depois, ao entrar em contato com o vírus, não apresenta sintomas. Esse fenômeno é explicado pela:",
        alternativas: [
          "Imunidade inata acelerada pelas barreiras naturais do organismo.",
          "Imunidade adaptativa com formação de células de memória.",
          "Inibição da replicação viral pela ação direta de antibióticos.",
          "Ausência natural de receptores para o vírus no organismo.",
          "Resposta autoimune contra antígenos do próprio corpo.",
        ],
        correta: 1,
        comentario:
          "A vacinação induz memória imunológica adaptativa (linfócitos T e B de memória), que responde rapidamente ao contato posterior com o patógeno, impedindo o desenvolvimento da doença.",
      },
      {
        enunciado:
          "Por que a vacina contra a gripe precisa ser aplicada todos os anos, enquanto a vacina contra o sarampo exige apenas poucas doses para proteger por toda a vida?",
        alternativas: [
          "O vírus da influenza sofre mutações antigênicas que alteram seus epitopos, exigindo a atualização anual da fórmula.",
          "O vírus da gripe permanece latente no organismo por décadas e reativaria a doença.",
          "As células de memória formadas pela vacina da gripe sobrevivem apenas alguns dias.",
          "A vacina do sarampo é feita com vírus vivo, e a da gripe não consegue estimular o sistema imune.",
          "A gripe se transmite por via aérea, e o sarampo apenas por contato direto com lesões de pele.",
        ],
        correta: 0,
        comentario:
          "O vírus da influenza tem genoma de RNA e taxa de mutação alta. Alterações graduais nas proteínas de superfície (drift antigênico) modificam os epitopos reconhecidos pelas células de memória, de modo que a resposta preparada nas doses anteriores não alcança o novo variante — por isso a fórmula é reformulada todos os anos. O vírus do sarampo é antigeneamente estável: as duas doses induzem memória duradoura. Em ambos os casos a vacina estimula imunidade ativa.",
      },
    ],
  },

  /* ======================= FÍSICA — TRIMESTRE 1 ======================= */
  {
    id: "atv-fis-1",
    area: "natureza",
    disciplina: "fisica",
    trimestre: 1,
    titulo: "As Leis de Newton",
    descricao:
      "Duas questões que aplicam inércia, segunda e terceira lei em situações do cotidiano.",
    tipo: "tarefa",
    videoApoio: "https://www.youtube.com/embed/3D3F1L2oVhQ",
    habilidades: ["EM13FIS205", "EM13FIS206"],
    questoes: [
      {
        enunciado:
          "Um ônibus freia bruscamente e os passageiros em pé são projetados para frente. Esse fenômeno está de acordo com a:",
        alternativas: [
          "Primeira Lei de Newton (princípio da inércia).",
          "Segunda Lei de Newton (F = m · a).",
          "Terceira Lei de Newton (ação e reação).",
          "Lei da conservação da energia mecânica.",
          "Lei da Gravitação Universal.",
        ],
        correta: 0,
        comentario:
          "Por inércia, o corpo dos passageiros tende a manter seu estado de movimento. Como o ônibus desacelera, o corpo 'avança' em relação ao veículo.",
      },
      {
        enunciado:
          "Um nadador empurra a água para trás e, por isso, consegue se deslocar para frente. Pela terceira Lei de Newton, a força que a água exerce no nadador é:",
        alternativas: [
          "Igual e de mesmo sentido à força aplicada pelo nadador.",
          "Igual e de sentido oposto à força aplicada pelo nadador.",
          "Maior e de mesmo sentido à força aplicada pelo nadador.",
          "Menor e de sentido oposto à força aplicada pelo nadador.",
          "Nula, pois a água não oferece resistência.",
        ],
        correta: 1,
        comentario:
          "Para toda ação corresponde uma reação de igual módulo e sentido oposto. O nadador empurra a água para trás e a água empurra o nadador para frente.",
      },
    ],
  },

  /* ======================= FÍSICA — TRIMESTRE 2 ======================= */
  {
    id: "atv-fis-2",
    area: "natureza",
    disciplina: "fisica",
    trimestre: 2,
    titulo: "Trabalho e energia",
    descricao:
      "Duas questões que relacionam trabalho mecânico, potência e rendimento.",
    tipo: "tarefa",
    videoApoio: "https://www.youtube.com/embed/IejUkVdZ-zw",
    habilidades: ["EM13FIS301"],
    questoes: [
      {
        enunciado:
          "Um bloco de 20 kg é erguido a uma altura de 2 m. Considerando g = 10 m/s², o trabalho realizado pela força peso durante a subida é, em módulo, igual a:",
        alternativas: ["400 J", "200 J", "40 J", "4.000 J", "0 J"],
        correta: 0,
        comentario:
          "W = −m · g · h = −20 · 10 · 2 = −400 J. Em módulo, 400 J. O sinal negativo indica que o trabalho da gravidade é contrário ao deslocamento.",
      },
      {
        enunciado:
          "Uma máquina realiza 600 J de trabalho em 3 segundos. A potência dessa máquina é de:",
        alternativas: ["200 W", "300 W", "1.800 W", "180 W", "2.000 W"],
        correta: 0,
        comentario:
          "Potência é a razão entre o trabalho e o tempo: P = W / t = 600 / 3 = 200 W. O watt (W) equivale a joule por segundo.",
      },
    ],
  },

  /* ======================= FÍSICA — TRIMESTRE 3 ======================= */
  {
    id: "atv-fis-3",
    area: "natureza",
    disciplina: "fisica",
    trimestre: 3,
    titulo: "Óptica e ondulatória",
    descricao:
      "Duas questões sobre reflexão, refração e formação do arco-íris.",
    tipo: "tarefa",
    videoApoio: "https://www.youtube.com/embed/N-z2vS0Ozk",
    habilidades: ["EM13FIS302"],
    questoes: [
      {
        enunciado:
          "A formação do arco-íris ocorre porque, ao atravessar as gotículas de água, a luz solar sofre:",
        alternativas: [
          "Reflexão interna e refração.",
          "Reflexão total e polarização.",
          "Difração.",
          "Interferência.",
          "Absorção seletiva de cores.",
        ],
        correta: 0,
        comentario:
          "A luz penetra na gota (refração), é refletida internamente e sai refratada novamente. Como cada cor tem índice de refração levemente diferente, a luz se dispersa e forma o arco-íris.",
      },
      {
        enunciado:
          "Um raio de luz passa do ar (n = 1,0) para a água (n = 1,3). Em relação à normal, o raio refratado:",
        alternativas: [
          "Fica mais afastado da normal que o raio incidente.",
          "Aproxima-se da normal.",
          "Fica perpendicular à superfície da água.",
          "É refletido totalmente.",
          "Mantém exatamente o mesmo ângulo.",
        ],
        correta: 1,
        comentario:
          "Ao passar para um meio mais denso (maior índice de refração), a luz diminui de velocidade e aproxima-se da normal: o ângulo de refração é menor que o ângulo de incidência.",
      },
    ],
  },

  /* ======================= QUÍMICA — TRIMESTRE 1 ======================= */
  {
    id: "atv-qui-1",
    area: "natureza",
    disciplina: "quimica",
    trimestre: 1,
    titulo: "Modelos atômicos e tabela periódica",
    descricao:
      "Duas questões sobre evolução dos modelos atômicos e leitura da tabela periódica.",
    tipo: "tarefa",
    videoApoio: "https://www.youtube.com/embed/kfj9F1kuRjU",
    habilidades: ["EM13QMU101"],
    questoes: [
      {
        enunciado: "O número atômico (Z) de um elemento químico representa:",
        alternativas: [
          "A quantidade de nêutrons.",
          "A quantidade de elétrons.",
          "A quantidade de prótons.",
          "A massa atômica arredondada.",
          "O número de isótopos conhecidos.",
        ],
        correta: 2,
        comentario:
          "O número atômico é a contagem de prótons no núcleo. Em átomos neutros, Z também corresponde ao número de elétrons, mas a definição é o número de prótons.",
      },
      {
        enunciado: "O elemento químico mais abundante na crosta terrestre é:",
        alternativas: ["Hidrogênio", "Oxigênio", "Ferro", "Carbono", "Silício"],
        correta: 1,
        comentario:
          "O oxigênio representa cerca de 46% da crosta terrestre, seguido do silício (~28%). O hidrogênio é o mais abundante do universo, mas na crosta o oxigênio lidera.",
      },
    ],
  },

  /* ======================= QUÍMICA — TRIMESTRE 2 ======================= */
  {
    id: "atv-qui-2",
    area: "natureza",
    disciplina: "quimica",
    trimestre: 2,
    titulo: "Reações químicas e estequiometria",
    descricao:
      "Duas questões sobre balanceamento de equações e cálculo de quantidade de matéria.",
    tipo: "tarefa",
    videoApoio: "https://www.youtube.com/embed/4L3Mzv3qkpY",
    habilidades: ["EM13QMU204", "EM13QMU201"],
    questoes: [
      {
        enunciado:
          "Na reação 2 H₂ + O₂ → 2 H₂O, quantos mols de H₂ são necessários para produzir 2 mols de H₂O?",
        alternativas: ["0,5 mol", "1 mol", "2 mols", "3 mols", "4 mols"],
        correta: 2,
        comentario:
          "A equação já está balanceada. O coeficiente de H₂ é 2, portanto 2 mols de H₂ produzem 2 mols de H₂O.",
      },
      {
        enunciado:
          "Uma reação que libera calor para o meio ambiente é classificada como:",
        alternativas: ["Endotérmica", "Exotérmica", "Catalisada", "Isotérmica", "Adiabática"],
        correta: 1,
        comentario:
          "Reações que liberam calor são exotérmicas (ΔH < 0). Reações endotérmicas absorvem calor do ambiente. 'Catalisada' refere-se à presença de um catalisador, que acelera a reação sem ser consumido.",
      },
    ],
  },

  /* ======================= QUÍMICA — TRIMESTRE 3 ======================= */
  {
    id: "atv-qui-3",
    area: "natureza",
    disciplina: "quimica",
    trimestre: 3,
    titulo: "Química orgânica e isômeros",
    descricao:
      "Duas questões sobre cadeias carbônicas, isômeros estruturais e combustão.",
    tipo: "tarefa",
    videoApoio: "https://www.youtube.com/embed/2wpQ7ZqE9jM",
    habilidades: ["EM13QMU302", "EM13QMU502"],
    questoes: [
      {
        enunciado:
          "Dois compostos apresentam a mesma fórmula molecular (C₄H₁₀), mas cadeias carbônicas distintas. Esse fenômeno é chamado de:",
        alternativas: ["Ciclização", "Isomeria", "Polimerização", "Criogênese", "Radioatividade"],
        correta: 1,
        comentario:
          "Isômeros são compostos com a mesma fórmula molecular e estruturas diferentes. Quando a diferença está na disposição da cadeia carbônica, trata-se de isomeria estrutural (de cadeia).",
      },
      {
        enunciado: "A combustão completa de um hidrocarboneto produz:",
        alternativas: [
          "CO₂ e vapor de água.",
          "CO e hidrocarbonetos.",
          "CH₄ e oxigênio.",
          "Somente CO₂.",
          "Somente água.",
        ],
        correta: 0,
        comentario:
          "Na combustão completa há oxigênio suficiente, formando dióxido de carbono e água. Na combustão incompleta forma-se monóxido de carbono (CO), que é tóxico.",
      },
    ],
  },
];

/* Exportação para uso global */
if (typeof window !== "undefined") {
  window.ATIVIDADES_NATUREZA = ATIVIDADES_NATUREZA;
}
