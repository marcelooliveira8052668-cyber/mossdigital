/* =============================================================================
   PROJETOS TRIMESTRAIS — 1 por trimestre (a cada 3 meses)
   Cada projeto: tema, questão-âncora, etapas com entregáveis, produto final,
   critérios de avaliação por competência e habilidades BNCC.
   ============================================================================= */

const PROJETOS = [
  /* ===================== 1º TRIMESTRE ===================== */
  {
    id: "proj-1",
    trimestre: 1,
    titulo: "Diagnóstico do meu lugar no mundo",
    perguntaAncora:
      "Como os dados do lugar onde eu vivo explicam os desafios que a minha comunidade enfrenta?",
    resumo:
      "Investigação sobre o bairro ou a cidade do estudante usando fontes e dados oficiais, com produção de um infográfico e um texto argumentativo.",
    disciplinasEnvolvidas: [
      "matematica",
      "geografia",
      "sociologia",
      "linguagens",
    ],
    professor: "Marcelo Oliveira",
    dataEntrega: "2026-04-09",
    cargaHoraria: 12,
    habilidades: ["EM13MAT202", "EM13GEO102", "EM13CHS102", "EM13LP201"],
    etapas: [
      {
        n: 1,
        titulo: "Coleta de dados",
        descricao:
          "Selecionar 5 indicadores do bairro ou município (população, renda, saneamento, escolaridade, transporte) em fontes oficiais: IBGE, DataSUS, portal da prefeitura ou Imprensa.",
        entregavel: "Planilha com fontes, data da coleta e link de cada indicador.",
        prazo: "2026-03-05",
      },
      {
        n: 2,
        titulo: "Organização e análise",
        descricao:
          "Organizar os dados em tabelas e escolher 3 medidas de tendência central (média, mediana, moda) ou 2 gráficos adequados. Justificar por que esse gráfico representa melhor o fenômeno.",
        entregavel: "Tabela + 2 gráficos + parágrafo de justificativa da escolha.",
        prazo: "2026-03-19",
      },
      {
        n: 3,
        titulo: "Interpretação sociológica",
        descricao:
          "Relacionar dois dos indicadores a um conceito das Ciências Humanas — desigualdade social, mobilidade urbana, segregação, trabalho informal ou racismo estrutural.",
        entregavel: "Texto de até 20 linhas articulando dado e conceito.",
        prazo: "2026-04-02",
      },
      {
        n: 4,
        titulo: "Produto final",
        descricao:
          "Infográfico (cartaz digital ou apresentação) + texto dissertativo-argumentativo sobre \"os desafios do lugar onde vivo\", com proposta de intervenção.",
        entregavel: "Infográfico e redação de até 30 linhas.",
        prazo: "2026-04-09",
      },
    ],
    criterios: [
      { competencia: "Coerência dos dados", peso: 25, descricao: "Indicadores de fontes confiáveis, com data e registro da coleta." },
      { competencia: "Uso da matemática", peso: 25, descricao: "Cálculos corretos e escolha justificada de medidas e gráficos." },
      { competencia: "Fundamentação conceitual", peso: 20, descricao: "Articulação entre os dados e um conceito das Ciências Humanas." },
      { competencia: "Repertório e argumentação", peso: 15, descricao: "Tese clara e repertório sociocultural produtivo." },
      { competencia: "Proposta de intervenção", peso: 15, descricao: "Agente, ação, modo e finalidade, respeitando direitos humanos." },
    ],
  },

  /* ===================== 2º TRIMESTRE ===================== */
  {
    id: "proj-2",
    trimestre: 2,
    titulo: "Ciência cidadã: um experimento que responde a uma pergunta da escola",
    perguntaAncora:
      "Que pergunta sobre o ambiente da minha escola (ou do meu bairro) pode ser respondida com um experimento controlado?",
    resumo:
      "Planejamento e execução de um experimento simples das Ciências da Natureza, com registro metodológico, análise de dados e divulgação dos resultados.",
    disciplinasEnvolvidas: ["biologia", "fisica", "quimica", "matematica", "redacao"],
    professor: "Marcelo Oliveira",
    dataEntrega: "2026-07-02",
    cargaHoraria: 16,
    habilidades: ["EM13CNT205", "EM13CNT301", "EM13MAT406", "EM13LP104"],
    etapas: [
      {
        n: 1,
        titulo: "Problema e hipótese",
        descricao:
          "Definir uma pergunta testável sobre o ambiente escolar: consumo de energia, qualidade da água da torneira, temperatura das salas, resíduos produzidos, presença de plantas.",
        entregavel: "Ficha com problema, hipótese e variáveis (independente, dependente e controle).",
        prazo: "2026-04-30",
      },
      {
        n: 2,
        titulo: "Método e coleta",
        descricao:
          "Descrever o procedimento em passos reprodutíveis, com material, cronograma e registro das medições ao longo de pelo menos 5 dias.",
        entregavel: "Caderno de campo com tabela de medições datadas.",
        prazo: "2026-05-21",
      },
      {
        n: 3,
        titulo: "Análise",
        descricao:
          "Calcular média, amplitude e construir gráfico dos resultados; confrontar com a hipótese inicial e apontar fontes de erro.",
        entregavel: "Gráfico + texto de análise com conclusão e limitações.",
        prazo: "2026-06-18",
      },
      {
        n: 4,
        titulo: "Divulgação",
        descricao:
          "Produzir um pôster científico (ou vídeo de até 3 minutos) apresentando problema, método, resultados e proposta de ação para a escola.",
        entregavel: "Pôster científico ou vídeo de divulgação.",
        prazo: "2026-07-02",
      },
    ],
    criterios: [
      { competencia: "Questão científica", peso: 20, descricao: "Pergunta testável, hipótese e variáveis claramente identificadas." },
      { competencia: "Rigor metodológico", peso: 25, descricao: "Procedimento reprodutível, controle e registro sistemático." },
      { competencia: "Tratamento dos dados", peso: 20, descricao: "Cálculos corretos, gráfico adequado e leitura crítica dos resultados." },
      { competencia: "Comunicação científica", peso: 20, descricao: "Clareza na exposição do problema, método e conclusão." },
      { competencia: "Proposta de ação", peso: 15, descricao: "Sugestão viável e articulada com os resultados obtidos." },
    ],
  },

  /* ===================== 3º TRIMESTRE ===================== */
  {
    id: "proj-3",
    trimestre: 3,
    titulo: "Simulado ENEM: da produção de questões à revisão colaborativa",
    perguntaAncora:
      "O que um enunciado precisa ter para avaliar, de fato, uma habilidade do ENEM?",
    resumo:
      "Os alunos produzem questões no estilo ENEM a partir dos textos do curso, revisam as dos colegas, aplicam um simulado e analisam os resultados da turma.",
    disciplinasEnvolvidas: [
      "matematica",
      "linguagens",
      "redacao",
      "historia-geral",
      "geografia",
      "biologia",
      "fisica",
      "quimica",
    ],
    professor: "Marcelo Oliveira",
    dataEntrega: "2026-11-05",
    cargaHoraria: 20,
    habilidades: ["EM13LP201", "EM13LP202", "EM13MAT202", "EM13HIS101", "EM13GEO101"],
    etapas: [
      {
        n: 1,
        titulo: "Leitura analítica de um texto-base",
        descricao:
          "Escolher um dos textos do curso e levantar as habilidades BNCC que ele permite avaliar, com justificativa.",
        entregavel: "Ficha de leitura com tema, habilidades e possíveis recortes de questão.",
        prazo: "2026-08-27",
      },
      {
        n: 2,
        titulo: "Construção da questão",
        descricao:
          "Redigir duas questões de múltipla escolha no estilo ENEM (5 alternativas, uma correta), com base no texto escolhido.",
        entregavel: "Duas questões com enunciado, alternativas, gabarito e comentário.",
        prazo: "2026-09-17",
      },
      {
        n: 3,
        titulo: "Revisão por pares",
        descricao:
          "Trocar questões com um colega e revisar: clareza do comando, presença de distratores plausíveis, uma única resposta correta e habilidade declarada.",
        entregavel: "Parecer de revisão assinado + versão revisada da questão.",
        prazo: "2026-10-08",
      },
      {
        n: 4,
        titulo: "Aplicação e análise",
        descricao:
          "Aplicar o simulado da turma e analisar os resultados coletivamente: índice de acerto por questão, distrator mais escolhido e habilidades com maior dificuldade.",
        entregavel: "Relatório com gráfico de desempenho da turma e plano de revisão.",
        prazo: "2026-11-05",
      },
    ],
    criterios: [
      { competencia: "Domínio do formato ENEM", peso: 25, descricao: "Enunciado claro, 5 alternativas plausíveis e apenas uma correta." },
      { competencia: "Alinhamento à habilidade", peso: 25, descricao: "A questão avalia, de fato, a habilidade BNCC declarada." },
      { competencia: "Qualidade dos distratores", peso: 20, descricao: "Alternativas erradas ligadas a erros reais de raciocínio." },
      { competencia: "Colaboração na revisão", peso: 15, descricao: "Parecer construtivo e incorporação das sugestões recebidas." },
      { competencia: "Análise dos resultados", peso: 15, descricao: "Leitura crítica dos dados da turma e proposta de plano de estudo." },
    ],
  },
];

/* ---------- Helpers ---------- */
function projetosDo(trimestreN) {
  return PROJETOS.filter((p) => !trimestreN || p.trimestre === Number(trimestreN));
}

function projetoPorId(id) {
  return PROJETOS.find((p) => p.id === id) || null;
}

if (typeof window !== "undefined") {
  window.PROJETOS = PROJETOS;
  window.projetosDo = projetosDo;
  window.projetoPorId = projetoPorId;
}
