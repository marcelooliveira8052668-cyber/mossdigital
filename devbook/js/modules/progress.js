/* ═══════════════════════════════════════════════════════
   DevBook — Progresso, XP, streak e conquistas
   Persistência: localStorage
   ═══════════════════════════════════════════════════════ */

const Progress = (() => {
  const KEY = "devbook_progress_v1";

  const defaults = () => ({
    xp: 0,
    chaptersDone: [],        // ids concluídos
    quizzes: {},             // { chapterId: { correct, total } }
    flashReviews: 0,
    perfectQuizzes: 0,
    streak: 0,
    lastStudy: null,         // "YYYY-MM-DD"
    badges: [],              // ids ganhos
    seenFlashcards: {},      // fila de revisão espaçada { idx: { due, box } }
    /* ── sistemas novos (v2.0) ── */
    projectsDone: [],        // ids de projetos concluídos
    challengesDone: [],      // ids de desafios concluídos
    certificates: 0,         // certificados gerados
    streakBest: 0,           // melhor sequência
    studyLog: {},            // { "YYYY-MM-DD": minutos }
    trackProgress: {}        // { trackId: { chaptersDone, projectsDone, startedAt } }
  });

  let state;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      state = raw ? { ...defaults(), ...JSON.parse(raw) } : defaults();
    } catch { state = defaults(); }
    updateStreak();
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  /* ─── Streak (sequência de dias) ─── */
  function today() { return new Date().toISOString().slice(0, 10); }

  function updateStreak() {
    const t = today();
    if (state.lastStudy === t) return;
    const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    state.streak = (state.lastStudy === yesterday) ? state.streak + 1 : 1;
    state.lastStudy = t;
    if (state.streak > state.streakBest) state.streakBest = state.streak;
    save();
  }

  /* ─── Registro de minutos de estudo (heatmap) ─── */
  function logStudy(minutes) {
    const t = today();
    state.studyLog[t] = (state.studyLog[t] || 0) + minutes;
    save();
  }

  function totalStudyMinutes() {
    return Object.values(state.studyLog).reduce((s, m) => s + m, 0);
  }

  /* ─── XP e níveis ─── */
  const LEVELS = [
    { at: 0,    name: "Iniciante" },
    { at: 100,  name: "Aprendiz" },
    { at: 300,  name: "Explorador" },
    { at: 600,  name: "Praticante" },
    { at: 1000, name: "Desenvolvedor" },
    { at: 1500, name: "Pleno" },
    { at: 2200, name: "Avançado" },
    { at: 3000, name: "Senior" },
    { at: 4000, name: "Especialista" },
    { at: 5500, name: "Mestre do Código" }
  ];

  function levelInfo() {
    let idx = 0;
    for (let i = 0; i < LEVELS.length; i++) if (state.xp >= LEVELS[i].at) idx = i;
    const cur = LEVELS[idx];
    const next = LEVELS[idx + 1] || null;
    const base = cur.at;
    const need = next ? next.at - base : 1;
    const have = state.xp - base;
    return {
      n: idx + 1,
      name: cur.name,
      pct: next ? Math.min(100, Math.round((have / need) * 100)) : 100,
      into: next ? have : need,
      need: next ? need : need
    };
  }

  function addXP(amount, reason) {
    const before = levelInfo().n;
    updateStreak();
    state.xp += amount;
    save();
    checkBadges();
    const after = levelInfo().n;
    if (after > before) {
      toast(`🎉 Subiu para o nível ${after} — ${levelInfo().name}!`, "xp");
    } else if (reason) {
      toast(`+${amount} XP — ${reason}`, "xp");
    }
    renderProfile();
  }

  /* ─── Capítulos ─── */
  function isDone(id) { return state.chaptersDone.includes(id); }

  function completeChapter(id, minutes) {
    if (isDone(id)) return false;
    state.chaptersDone.push(id);
    if (minutes) logStudy(minutes);
    save();
    addXP(50, "capítulo concluído");
    return true;
  }

  /* ─── Quiz ─── */
  function saveQuiz(id, correct, total) {
    const prev = state.quizzes[id];
    if (!prev || correct > prev.correct) {
      state.quizzes[id] = { correct, total };
      if (correct === total) state.perfectQuizzes++;
    }
    save();
    const gained = correct * 15;
    if (gained > 0) addXP(gained, `quiz: ${correct}/${total}`);
    checkBadges();
  }

  /* ─── Flashcards (repetição espaçada — caixas de Leitner) ─── */
  // box 1=dia, 2=dias, 3=4 dias, 4=8 dias, 5=15 dias
  const LEITNER = [1, 2, 4, 8, 15];

  function flashKey(chapterId, idx) { return chapterId + ":" + idx; }

  function getFlashState(key) {
    const s = state.seenFlashcards[key];
    if (!s) return { box: 0, due: 0 }; // box 0 = nunca vista
    return s;
  }

  function flashDue(chapterId, idx) {
    const s = getFlashState(flashKey(chapterId, idx));
    if (s.box === 0) return true;
    return Date.now() >= s.due;
  }

  function reviewFlash(chapterId, idx, quality) {
    // quality: 0=again, 1=hard, 2=good, 3=easy
    const key = flashKey(chapterId, idx);
    const s = getFlashState(key);
    let box = s.box;
    if (quality === 0) box = 0;
    else if (quality === 1) box = Math.max(1, box);
    else box = Math.min(5, box + 1);

    const days = LEITNER[Math.max(0, box - 1)] || 1;
    state.seenFlashcards[key] = {
      box,
      due: Date.now() + days * 864e5
    };
    state.flashReviews++;
    save();
    addXP(quality >= 2 ? 5 : 2, "revisão de flashcard");
    checkBadges();
  }

  /* ─── Conquistas ─── */
  function checkBadges() {
    const snapshot = {
      xp: state.xp,
      chaptersDone: state.chaptersDone.length,
      streak: Math.max(state.streak, state.streakBest),
      perfectQuizzes: state.perfectQuizzes,
      flashReviews: state.flashReviews,
      challengesDone: state.challengesDone.length,
      projectsDone: state.projectsDone.length,
      certificates: state.certificates,
      trackFullstack: trackComplete("fullstack")
    };
    BADGES.forEach(b => {
      if (!state.badges.includes(b.id) && b.check(snapshot)) {
        state.badges.push(b.id);
        save();
        toast(`🏅 Conquista desbloqueada: ${b.name}!`, "success");
      }
    });
  }

  /* ─── PROJETOS INTEGRADORES ─── */
  function isProjectDone(id) { return state.projectsDone.includes(id); }

  function toggleProject(id) {
    const proj = (typeof PROJECTS !== "undefined") ? PROJECTS.find(p => p.id === id) : null;
    if (!proj) return false;
    if (state.projectsDone.includes(id)) {
      state.projectsDone = state.projectsDone.filter(x => x !== id);
      save(); renderProfile(); return false;
    }
    state.projectsDone.push(id);
    save();
    addXP(120, `projeto: ${proj.name}`);
    renderProfile();
    return true;
  }

  /* ─── DESAFIOS DE CÓDIGO ─── */
  function isChallengeDone(id) { return state.challengesDone.includes(id); }

  function completeChallenge(id) {
    if (state.challengesDone.includes(id)) return false;
    const ch = (typeof CHALLENGES !== "undefined") ? CHALLENGES.find(c => c.id === id) : null;
    state.challengesDone.push(id);
    save();
    addXP(ch ? ch.xp : 50, `desafio: ${ch ? ch.title : id}`);
    renderProfile();
    return true;
  }

  /* ─── TRILHAS ─── */
  function trackStats(trackId) {
    const t = (typeof TRACKS !== "undefined") ? TRACKS.find(x => x.id === trackId) : null;
    if (!t) return { pct: 0, chaptersDone: 0, chaptersTotal: 0, projectsDone: 0, projectsTotal: 0, complete: false };
    const chDone = t.chapters.filter(id => state.chaptersDone.includes(id)).length;
    const prDone = (t.projects || []).filter(id => state.projectsDone.includes(id)).length;
    const chTotal = t.chapters.length;
    const prTotal = (t.projects || []).length;
    /* progresso = 80% capítulos + 20% projetos */
    const pct = chTotal + prTotal > 0
      ? Math.round(((chDone / chTotal) * 80) + ((prTotal ? (prDone / prTotal) * 20 : 0)))
      : 0;
    return {
      pct: Math.min(100, pct),
      chaptersDone: chDone, chaptersTotal: chTotal,
      projectsDone: prDone, projectsTotal: prTotal,
      complete: chDone === chTotal && prDone === prTotal
    };
  }

  function trackComplete(trackId) {
    const s = trackStats(trackId);
    return s.complete;
  }

  function trackDetail(trackId) {
    const s = trackStats(trackId);
    return {
      chaptersDone: s.chaptersDone, chaptersTotal: s.chaptersTotal,
      projectsDone: s.projectsDone, projectsTotal: s.projectsTotal,
      pct: s.pct
    };
  }

  /* ─── CERTIFICADO ─── */
  function certificateStatus() {
    const cfg = (typeof CERTIFICATE !== "undefined") ? CERTIFICATE : { requirements: {} };
    const req = cfg.requirements || {};
    const quizzesAnswered = Object.keys(state.quizzes).length;
    const checks = [
      { id: "chapters", label: "Capítulos concluídos", got: state.chaptersDone.length, need: req.chapters || 0, unit: "" },
      { id: "quizzes",  label: "Quizzes respondidos",  got: quizzesAnswered,           need: req.quizzes || 0,  unit: "" },
      { id: "projects", label: "Projetos entregues",   got: state.projectsDone.length,  need: req.projects || 0, unit: "" },
      { id: "challenges", label: "Desafios resolvidos", got: state.challengesDone.length, need: req.challenges || 0, unit: "" },
      { id: "xp",       label: "XP acumulado",         got: state.xp,                   need: req.xp || 0,       unit: " XP" }
    ];
    const eligible = checks.every(c => c.got >= c.need);
    return { eligible, checks };
  }

  function issueCertificate() {
    const st = certificateStatus();
    if (!st.eligible) return false;
    state.certificates += 1;
    save();
    checkBadges();
    toast("📜 Certificado emitido com sucesso!", "success");
    renderProfile();
    return true;
  }

  /* ─── Reset ─── */
  function reset() {
    if (!confirm("Zerar todo o progresso, XP e conquistas?")) return;
    state = defaults();
    save();
    renderProfile();
    toast("Progresso zerado.", "danger");
  }

  /* ─── Perfil na UI ─── */
  function renderProfile() {
    const lv = levelInfo();
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set("levelEl", `Nível ${lv.n} — ${lv.name}`);
    set("xpText", `${lv.into} / ${lv.need} XP`);
    set("streakEl", state.streak);
    set("badgesEl", state.badges.length);
    set("chaptersDoneEl", state.chaptersDone.length);

    const fill = document.getElementById("xpFill");
    if (fill) fill.style.width = lv.pct + "%";

    const avatar = document.getElementById("avatarEl");
    if (avatar) avatar.textContent = lv.n >= 8 ? "🧑‍🚀" : lv.n >= 5 ? "🧑‍💻" : "🌱";

    /* números extras (opcionais na UI) */
    set("challengesDoneEl", state.challengesDone.length);
    set("projectsDoneEl", state.projectsDone.length);
  }

  load();

  return {
    get state() { return state; },
    levelInfo, addXP,
    isDone, completeChapter,
    saveQuiz, quizzes: () => state.quizzes,
    flashDue, reviewFlash,
    checkBadges, reset, renderProfile,
    /* novos */
    logStudy, totalStudyMinutes,
    isProjectDone, toggleProject,
    isChallengeDone, completeChallenge,
    trackStats, trackComplete, trackDetail,
    certificateStatus, issueCertificate,
    get doneCount() { return state.chaptersDone.length; },
    get totalXP() { return state.xp; },
    get challengesDoneCount() { return state.challengesDone.length; },
    get projectsDoneCount() { return state.projectsDone.length; }
  };
})();

/* ─── Toast helper (usado pelo Progress) ─── */
function toast(msg, type = "info") {
  const zone = document.getElementById("toastZone");
  if (!zone) return;
  const el = document.createElement("div");
  el.className = "toast " + type;
  el.textContent = msg;
  zone.appendChild(el);
  setTimeout(() => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 320);
  }, 3400);
}
