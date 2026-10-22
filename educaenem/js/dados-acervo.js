/* =============================================================================
   EducaEnem 2026 — Dados base
   Áreas, disciplinas, calendário letivo e aulas online (Zoom / Google Meet)
   ============================================================================= */

/* ---------- Áreas de conhecimento da matriz do ENEM ---------- */
const AREAS_ENEM = [
  {
    id: "natureza",
    nome: "Ciências da Natureza e suas Tecnologias",
    sigla: "Ciências da Natureza",
    cor: "#15803d",
    emoji: "🧬",
    resumo:
      "Fenômenos naturais, modelos explicativos e intervenção técnica na realidade.",
  },
  {
    id: "matematica",
    nome: "Matemática e suas Tecnologias",
    sigla: "Matemática",
    cor: "#1b7fb8",
    emoji: "📐",
    resumo:
      "Raciocínio quantitativo, representação de dados e resolução de problemas.",
  },
  {
    id: "linguagens",
    nome: "Linguagens e suas Tecnologias",
    sigla: "Linguagens",
    cor: "#b45309",
    emoji: "📖",
    resumo:
      "Leitura, produção de texto, língua estrangeira, literatura e artes.",
  },
  {
    id: "humanas",
    nome: "Ciências Humanas e suas Tecnologias",
    sigla: "Ciências Humanas",
    cor: "#7f1d1d",
    emoji: "🏛",
    resumo:
      "Sociedade, cultura, política, espaço e tempo na História, Geografia, Sociologia e Filosofia.",
  },
];

/* ---------- Disciplinas do curso ---------- */
const DISCIPLINAS = [
  {
    id: "matematica",
    nome: "Matemática",
    area: "matematica",
    emoji: "📐",
    cor: "#1b7fb8",
    professor: "Marcelo Oliveira",
    horas: 120,
    resumo:
      "Razão e proporção, funções, análise de dados, probabilidade e geometria aplicada.",
    pdf: "Resumao-de-Matematica-no-ENEM-Formulas-Exercicios-e-Simulados-Praticos.pdf",
    video: "MA_ZrgV2xws",
  },
  {
    id: "redacao",
    nome: "Redação",
    area: "linguagens",
    emoji: "✍️",
    cor: "#c2410c",
    professor: "Marcelo Oliveira",
    horas: 40,
    resumo:
      "Dissertativo-argumentativo: tese, repertório, proposta de intervenção e reescrita.",
    pdf: "Guia-Completo-de-Redacao-do-ENEM-Modelos-Exercicios-e-Propostas-de-Intervencao.pdf",
    video: "cVlfWDcIAfo",
  },
  {
    id: "linguagens",
    nome: "Língua Portuguesa",
    area: "linguagens",
    emoji: "📖",
    cor: "#a16207",
    professor: "Marcelo Oliveira",
    horas: 90,
    resumo:
      "Interpretação de texto, funções da linguagem, coesão, coerência e gêneros textuais.",
    pdf: null,
    video: "2mXyS6VFJh4",
  },
  {
    id: "literatura",
    nome: "Literatura",
    area: "linguagens",
    emoji: "📚",
    cor: "#9f1239",
    professor: "Marcelo Oliveira",
    horas: 45,
    resumo:
      "Linha do tempo, escolas literárias brasileiras, intertextualidade e contemporaneidade.",
    pdf: "Resumao-de-Literatura-no-ENEM-Linha-do-Tempo-Quadros-e-Exercicios.pdf",
    video: "NP3y5JVJ--I",
  },
  {
    id: "ingles",
    nome: "Inglês",
    area: "linguagens",
    emoji: "🗽",
    cor: "#4338ca",
    professor: "Marcelo Oliveira",
    horas: 30,
    resumo:
      "Interpretação de textos, falsos cognatos, conectivos, condicionais e vocabulário acadêmico.",
    pdf: null,
    video: "2mXyS6VFJh4",
  },
  {
    id: "espanhol",
    nome: "Espanhol",
    area: "linguagens",
    emoji: "🌐",
    cor: "#7c3aed",
    professor: "Marcelo Oliveira",
    horas: 30,
    resumo:
      "Interpretação, falsos cognatos, conectores, presente do subjuntivo e vocabulário.",
    pdf: "Guia-de-Espanhol-para-o-ENEM-Domine-a-Lingua-e-Garanta-sua-Nota.pdf",
    video: "uvZvp8dI9JM",
  },
  {
    id: "historia-geral",
    nome: "História Geral",
    area: "humanas",
    emoji: "🏺",
    cor: "#92400e",
    professor: "Marcelo Oliveira",
    horas: 80,
    resumo:
      "Antiguidade, Idade Média, Modernidade, Revoluções e Contemporaneidade.",
    pdf: "Resumao-de-Historia-Geral-para-o-ENEM-2025.pdf",
    video: "LxuTxkHAXeQ",
  },
  {
    id: "historia-brasil",
    nome: "História do Brasil",
    area: "humanas",
    emoji: "🗺️",
    cor: "#0f766e",
    professor: "Marcelo Oliveira",
    horas: 60,
    resumo:
      "Colônia, Império, República, Era Vargas, Ditadura e redemocratização.",
    pdf: "Plano de aula para 2026 História geral e do Brasil.pdf",
    video: "LxuTxkHAXeQ",
  },
  {
    id: "geografia",
    nome: "Geografia",
    area: "humanas",
    emoji: "🌍",
    cor: "#15803d",
    professor: "Marcelo Oliveira",
    horas: 70,
    resumo:
      "População, urbanização, geopolítica, energia, meio ambiente e desenvolvimento.",
    pdf: "Resumao-de-Geografia-para-o-ENEM-Mapas-Conceitos-e-Exercicios-Comentados.pdf",
    video: "nrzFMOq1k-w",
  },
  {
    id: "sociologia",
    nome: "Sociologia",
    area: "humanas",
    emoji: "👥",
    cor: "#7f1d1d",
    professor: "Marcelo Oliveira",
    horas: 45,
    resumo:
      "Trabalho, classes sociais, Estado, poder, cultura e movimentos sociais.",
    pdf: "Guia-Completo-de-Sociologia-para-o-ENEM.pdf",
    video: "Hoz3Vgaf_Ns",
  },
  {
    id: "filosofia",
    nome: "Filosofia",
    area: "humanas",
    emoji: "💭",
    cor: "#4c1d95",
    professor: "Marcelo Oliveira",
    horas: 40,
    resumo:
      "Mythos e logos, ética, política, contratualismo e correntes contemporâneas.",
    pdf: "Filosofia-no-ENEM-Correntes-e-Pensadores-Essenciais.pdf",
    video: "i4U3yRUmnCY",
  },
  {
    id: "biologia",
    nome: "Biologia",
    area: "natureza",
    emoji: "🧬",
    cor: "#15803d",
    professor: "Marcelo Oliveira",
    horas: 80,
    resumo:
      "Célula, genética, ecologia, evolução, fisiologia e saúde.",
    pdf: "Guia-Completo-de-Biologia-para-o-ENEM.pdf",
    video: "fo7JbUG5flY",
  },
  {
    id: "fisica",
    nome: "Física",
    area: "natureza",
    emoji: "⚛️",
    cor: "#0369a1",
    professor: "Marcelo Oliveira",
    horas: 60,
    resumo:
      "Mecânica, termologia, óptica, ondulatória, eletricidade e hidrostática.",
    pdf: "Guia-Completo-de-Fisica-para-o-Estuda-ENEM.pdf",
    video: "hxciSW_B8Hw",
  },
  {
    id: "quimica",
    nome: "Química",
    area: "natureza",
    emoji: "⚗️",
    cor: "#a21caf",
    professor: "Marcelo Oliveira",
    horas: 60,
    resumo:
      "Matéria, ligações, soluções, estequiometria, termoquímica, orgânica e ambiental.",
    pdf: "Resumao-de-Quimica-no-ENEM-Mapas-Conceituais-Exercicios-e-Dicas-Praticas.pdf",
    video: "akKNhBT14gs",
  },
];

/* ---------- Calendário letivo 2026 ---------- */
const TRIMESTRES = [
  {
    n: 1,
    nome: "1º Trimestre",
    periodo: "Fev → Abr",
    foco: "Fundamentos e diagnóstico",
    inicio: "2026-02-02",
    fim: "2026-04-10",
  },
  {
    n: 2,
    nome: "2º Trimestre",
    periodo: "Abr → Jul",
    foco: "Aprofundamento e aprofundamento por área",
    inicio: "2026-04-13",
    fim: "2026-07-03",
  },
  {
    n: 3,
    nome: "3º Trimestre",
    periodo: "Jul → Nov",
    foco: "Consolidação, revisão e simulados finais",
    inicio: "2026-07-06",
    fim: "2026-11-06",
  },
];

/* ---------- Aulas online (Zoom / Google Meet) ----------
   status: "agendada" | "ao-vivo" | "encerrada"
   gravacao: link da gravação quando a aula já aconteceu
------------------------------------------------------------------- */
const AULAS_ONLINE = [
  {
    id: "aula-01",
    trimestre: 1,
    disciplina: "matematica",
    titulo: "Razão, proporção e escala de mapas",
    descricao:
      "Abertura do ciclo 2026: grandezas proporcionais, escalas cartográficas e problemas de ENEM.",
    plataforma: "zoom",
    link: "https://zoom.us/j/98213344501",
    senha: "enem2026",
    dataISO: "2026-10-19T19:00",
    duracao: 90,
    status: "agendada",
  },
  {
    id: "aula-02",
    trimestre: 1,
    disciplina: "linguagens",
    titulo: "As funções da linguagem",
    descricao:
      "Diagnóstico linguístico: identificação da função dominante em textos do ENEM.",
    plataforma: "meet",
    link: "https://meet.google.com/abc-defg-hij",
    senha: "",
    dataISO: "2026-10-21T15:00",
    duracao: 90,
    status: "agendada",
  },
  {
    id: "aula-03",
    trimestre: 1,
    disciplina: "historia-geral",
    titulo: "Grécia Antiga: a pólis e a democracia",
    descricao:
      "Ágora, cidadania e a diferença entre democracia direta e representativa.",
    plataforma: "zoom",
    link: "https://zoom.us/j/98213344502",
    senha: "enem2026",
    dataISO: "2026-10-24T19:00",
    duracao: 100,
    status: "agendada",
  },
  {
    id: "aula-04",
    trimestre: 1,
    disciplina: "biologia",
    titulo: "Célula: organelas e respiração celular",
    descricao:
      "Comparativo entre célula animal e vegetal e a respiração aeróbica passo a passo.",
    plataforma: "meet",
    link: "https://meet.google.com/kln-mnop-qrs",
    senha: "",
    dataISO: "2026-10-26T15:00",
    duracao: 100,
    status: "agendada",
  },
  {
    id: "aula-05",
    trimestre: 1,
    disciplina: "redacao",
    titulo: "Estrutura dissertativo-argumentativa",
    descricao:
      "Tese, argumento, repertório e conclusão — os quatro pilares da nota 1000.",
    plataforma: "zoom",
    link: "https://zoom.us/j/98213344503",
    senha: "enem2026",
    dataISO: "2026-10-28T10:00",
    duracao: 90,
    status: "agendada",
  },
  {
    id: "aula-06",
    trimestre: 2,
    disciplina: "matematica",
    titulo: "Probabilidade condicional",
    descricao:
      "Eventos independentes, teorema de Bayes e questões típicas do ENEM.",
    plataforma: "zoom",
    link: "https://zoom.us/j/98213344601",
    senha: "enem2026",
    dataISO: "2026-11-02T19:00",
    duracao: 90,
    status: "agendada",
  },
  {
    id: "aula-07",
    trimestre: 2,
    disciplina: "filosofia",
    titulo: "Kant e o Imperativo Categórico",
    descricao:
      "Ética do dever, autonomia e a conexão com o conceito de cidadania.",
    plataforma: "meet",
    link: "https://meet.google.com/tuv-wxyz-001",
    senha: "",
    dataISO: "2026-11-04T19:00",
    duracao: 100,
    status: "agendada",
  },
  {
    id: "aula-08",
    trimestre: 2,
    disciplina: "sociologia",
    titulo: "Max Weber e a burocracia",
    descricao:
      "Tipologia weberiana, dominação racional-legal e eficiência burocrática.",
    plataforma: "zoom",
    link: "https://zoom.us/j/98213344602",
    senha: "enem2026",
    dataISO: "2026-11-07T15:00",
    duracao: 90,
    status: "agendada",
  },
  {
    id: "aula-09",
    trimestre: 3,
    disciplina: "quimica",
    titulo: "Química orgânica: isômeros",
    descricao:
      "Isômeros estruturais e de posição: como diferenciar nas questões do ENEM.",
    plataforma: "meet",
    link: "https://meet.google.com/abc-987-xyz",
    senha: "",
    dataISO: "2026-11-09T19:00",
    duracao: 100,
    status: "agendada",
  },
  {
    id: "aula-10",
    trimestre: 3,
    disciplina: "historia-brasil",
    titulo: "Redemocratização e Constituição de 1988",
    descricao:
      "Da Ditadura à Carta Magna: o debate sobre democracia e direitos fundamentais.",
    plataforma: "zoom",
    link: "https://zoom.us/j/98213344701",
    senha: "enem2026",
    dataISO: "2026-11-11T15:00",
    duracao: 90,
    status: "agendada",
  },
];

/* ---------- Avisos do mural (exibidos no painel) ---------- */
const AVISOS = [
  {
    id: "aviso-1",
    dataISO: "2026-10-05",
    titulo: "Matrículas abertas 2026",
    texto:
      "As turmas do ciclo 2026 estão com inscrições abertas. Confira o calendário de aulas ao vivo na aba Aulas.",
    tipo: "info",
  },
  {
    id: "aviso-2",
    dataISO: "2026-10-08",
    titulo: "Simulado diagnóstico",
    texto:
      "O primeiro simulado diagnóstico será aplicado após a aula de Linguagens. Estude as funções da linguagem.",
    tipo: "alerta",
  },
];

/* ---------- Helpers ---------- */
function disciplinaPorId(id) {
  return DISCIPLINAS.find((d) => d.id === id);
}

function areaPorId(id) {
  return AREAS_ENEM.find((a) => a.id === id);
}

function trimestrePorN(n) {
  return TRIMESTRES.find((t) => t.n === Number(n));
}

function aulasDe(disciplinaId, trimestreN) {
  return AULAS_ONLINE.filter((a) => {
    const okDisc = !disciplinaId || a.disciplina === disciplinaId;
    const okTrim = !trimestreN || a.trimestre === Number(trimestreN);
    return okDisc && okTrim;
  }).sort((a, b) => a.dataISO.localeCompare(b.dataISO));
}

function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/* Exportação */
if (typeof window !== "undefined") {
  window.AREAS_ENEM = AREAS_ENEM;
  window.DISCIPLINAS = DISCIPLINAS;
  window.TRIMESTRES = TRIMESTRES;
  window.AULAS_ONLINE = AULAS_ONLINE;
  window.AVISOS = AVISOS;
}
