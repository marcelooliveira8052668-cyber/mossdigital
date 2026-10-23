/* ═══════════════════════════════════════════════════════
   DevBook — CERTIFICADO E RESUMO DO CURSO
   Requisitos para emitir o certificado e conquistas extras.
   ═══════════════════════════════════════════════════════ */

const CERTIFICATE = {
  title: "Certificado de Conclusão",
  subtitle: "Curso Full Stack do Zero ao Deploy",
  issuer: "DevBook",
  requirements: {
    chapters: 12,     // minimo de capitulos concluidos
    quizzes: 10,      // minimo de quizzes respondidos
    projects: 1,      // minimo de projetos entregues
    challenges: 4,    // minimo de desafios resolvidos
    xp: 1500          // XP minimo
  }
};

/* Registro dos badges extras (projetos + desafios + tracks) */
if (typeof BADGES !== "undefined") {
  BADGES.push(
    { id: "primeiro-desafio", ico: "💪", name: "Mãos à obra", desc: "Conclua 1 desafio de código", check: p => (p.challengesDone||0) >= 1 },
    { id: "cinco-desafios", ico: "🧠", name: "Raciocínio afiado", desc: "Conclua 5 desafios de código", check: p => (p.challengesDone||0) >= 5 },
    { id: "primeiro-projeto", ico: "📦", name: "Projetando", desc: "Conclua 1 projeto integrador", check: p => (p.projectsDone||0) >= 1 },
    { id: "trilha-fullstack", ico: "🧩", name: "Full Stack", desc: "Conclua a trilha Full Stack", check: p => p.trackFullstack === true },
    { id: "certificado", ico: "📜", name: "Diploma", desc: "Gerou seu certificado de conclusão", check: p => (p.certificates||0) >= 1 }
  );
}

/* Nota de rodapé para o README / sobre */
const COURSE_INFO = {
  version: "2.0",
  totalChapters: CURRICULUM.length,
  tracks: TRACKS.length,
  projects: PROJECTS.length,
  challenges: CHALLENGES.length
};
