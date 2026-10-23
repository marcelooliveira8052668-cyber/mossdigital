/* ═══════════════════════════════════════════════════════
   DevBook — CONQUISTAS E CERTIFICADO
   Conquistas (badges) e regras de emissão do certificado.
   ═══════════════════════════════════════════════════════ */

/* Níveis dos badges */
const BADGES = [
  { id: "first-chapter", ico: "🌱", name: "Primeiro passo", desc: "Leia 1 capítulo", check: p => p.chaptersDone >= 1 },
  { id: "five-chapters", ico: "📚", name: "Leitor assíduo", desc: "Leia 5 capítulos", check: p => p.chaptersDone >= 5 },
  { id: "all-chapters", ico: "🎓", name: "Formado", desc: "Leia todos os capítulos", check: p => p.chaptersDone >= CURRICULUM.length },
  { id: "streak-3", ico: "🔥", name: "Constância", desc: "3 dias seguidos", check: p => p.streak >= 3 },
  { id: "streak-7", ico: "⚡", name: "Semana forte", desc: "7 dias seguidos", check: p => p.streak >= 7 },
  { id: "xp-500", ico: "💰", name: "Caçador de XP", desc: "Acumule 500 XP", check: p => p.xp >= 500 },
  { id: "xp-2000", ico: "👑", name: "Veterano", desc: "Acumule 2000 XP", check: p => p.xp >= 2000 },
  { id: "quiz-perfect", ico: "🎯", name: "Certeiro", desc: "Acerte 100% de um quiz", check: p => p.perfectQuizzes >= 1 },
  { id: "flash-20", ico: "🃏", name: "Memória ferrea", desc: "Responda 20 flashcards", check: p => p.flashReviews >= 20 }
];
