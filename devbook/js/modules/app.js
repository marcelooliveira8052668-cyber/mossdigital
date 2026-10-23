/* ═══════════════════════════════════════════════════════
   DevBook — App principal (v3)
   Roteamento · renderização · navegação · busca · tema · PWA
   ═══════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const $  = id => document.getElementById(id);
  const view = $("view");
  const tocNav = $("tocNav");
  const chapterNav = $("chapterNav");
  const breadcrumb = $("breadcrumb");

  /* ═══════════ TEMA ═══════════ */
  const Theme = {
    get() { return document.documentElement.dataset.theme; },
    set(t) {
      document.documentElement.dataset.theme = t;
      try { localStorage.setItem("devbook_theme", t); } catch {}
      const btn = $("btnTheme");
      if (btn) { btn.textContent = t === "dark" ? "☀️" : "🌙"; btn.setAttribute("aria-label", t === "dark" ? "Ativar tema claro" : "Ativar tema escuro"); }
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = t === "dark" ? "#14161c" : "#f6f7f9";
    },
    toggle() { this.set(this.get() === "dark" ? "light" : "dark"); }
  };
  Theme.set((() => { try { return localStorage.getItem("devbook_theme") || "light"; } catch { return "light"; } })());

  /* ═══════════ HELPERS ═══════════ */
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const byId = id => CURRICULUM.find(c => c.id === id);
  const idxOf = id => CURRICULUM.findIndex(c => c.id === id);
  const chapterNum = id => idxOf(id) + 1;   // 1..15

  /* Remove acentos — busca e comparação mais tolerantes */
  const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const LEVEL_LABEL = { easy: ["Fácil", "easy"], medium: ["Médio", "medium"], hard: ["Avançado", "hard"] };

  /* ═══════════ SEÇÕES EXTRAS ═══════════ */
  const EXTRA_SECTIONS = [
    { id: "trilhas",     icon: "🧭", label: "Trilhas de carreira",    kw: "carreira especializacao foco caminho qual escolher" },
    { id: "projetos",    icon: "📦", label: "Projetos integradores", kw: "projeto portfolio pratica exercicio real entrega" },
    { id: "desafios",    icon: "💪", label: "Desafios de código",    kw: "desafio exercicio pratica validar teste algoritmo desafio" },
    { id: "certificado", icon: "📜", label: "Certificado",           kw: "certificado diploma conclusao pdf prova final" }
  ];

  /* ═══════════ ROTEAMENTO ═══════════ */
  function currentRoute() {
    const h = location.hash.replace(/^#\//, "");
    if (h.startsWith("capitulo/")) return { type: "chapter", id: h.slice(9) };
    if (EXTRA_SECTIONS.some(s => s.id === h)) return { type: "section", id: h };
    if (h === "") return { type: "home" };
    return { type: "notfound", id: h };
  }

  function route() {
    const r = currentRoute();
    stopOutlineSpy();

    /* Trava de acesso: capítulo/seção bloqueado mostra a tela de código */
    if (isBlocked(r)) {
      Gate.render(r.type === "chapter" ? { title: byId(r.id) && byId(r.id).title } : null);
      renderTOC();
      updateTotalProgress();
      updateQuickNav(null);
      hideBehindGate();
      return;
    }

    Gate.release();
    unhideShell();

    if (r.type === "chapter" && byId(r.id)) renderChapter(byId(r.id));
    else if (r.type === "section") renderSection(r.id);
    else if (r.type === "notfound") renderNotFound(r.id);
    else renderHome();

    renderTOC();
    updateTotalProgress();
    updateQuickNav(r.type === "section" ? r.id : null);

    /* recalcula a altura da página depois que o DOM foi trocado,
       então atualiza a barra de leitura */
    maxScrollCache = 0;
    measureScroll();
    updateReadBar();

    if (window.scrollTo) window.scrollTo({ top: 0, behavior: "instant" });
  }

  /* A rota pede conteúdo bloqueado? */
  function isBlocked(r) {
    if (Gate.isOpen()) return false;
    if (r.type === "chapter") {
      if (!byId(r.id)) return false;              // rota inválida: deixa o 404 cuidar
      return !Gate.isChapterFree(r.id);
    }
    if (r.type === "section") return !Gate.isSectionFree(r.id);
    return false;                                  // home e 404 são sempre públicos
  }

  /* Esconde o conteúdo atrás da tela de acesso */
  function hideBehindGate() {
    const shell = document.querySelector(".shell");
    if (shell) shell.classList.add("blurred");
    if (chapterNav) chapterNav.classList.add("hidden");
    $("quickNav").classList.add("hidden");
    const max = document.documentElement.scrollHeight - window.innerHeight;
    maxScrollCache = Math.max(0, max);
    updateReadBar();
  }

  function unhideShell() {
    const shell = document.querySelector(".shell");
    if (shell) shell.classList.remove("blurred");
  }

  /* Quando o aluno digita o código certo, redesenha */
  window.addEventListener("devbook:unlocked", () => {
    unhideShell();
    route();
  });

  /* ═══════════ TOC — SUMÁRIO LATERAL ═══════════ */
  let searchQuery = "";

  function renderTOC() {
    const route = currentRoute();
    const parts = [];
    CURRICULUM.forEach(ch => { if (!parts.includes(ch.part)) parts.push(ch.part); });

    let html = "";

    /* Seções do curso */
    const secsVisiveis = EXTRA_SECTIONS.filter(s => {
      if (!searchQuery) return true;
      const q = norm(searchQuery);
      return norm(s.label).includes(q) || norm(s.kw).includes(q);
    });

    if (secsVisiveis.length) {
      html += `<div class="toc-part-row"><span>Caminho completo</span></div>`;
      secsVisiveis.forEach(s => {
        const active = route.type === "section" && route.id === s.id;
        html += `<button class="toc-item extra${active ? " active" : ""}" data-goto-section="${s.id}">
          <span class="toc-check">${s.icon}</span>
          <span>${esc(s.label)}</span>
        </button>`;
      });
    }

    /* Capítulos por parte, com progresso de cada parte */
    let encontrou = secsVisiveis.length > 0;

    parts.forEach(part => {
      const todos = CURRICULUM.filter(c => c.part === part);
      const items = todos.map(ch => {
        if (searchQuery) {
          const hay = norm(`${ch.title} ${ch.desc} ${ch.tags.join(" ")}`);
          if (!hay.includes(norm(searchQuery))) return "";
        }
        const done = Progress.isDone(ch.id);
        const active = route.type === "chapter" && route.id === ch.id;
        const num = chapterNum(ch.id);
        return `<button class="toc-item${done ? " done" : ""}${active ? " active" : ""}"
                  data-goto="${ch.id}" title="${num}. ${esc(ch.title)}"
                  ${active ? 'aria-current="page"' : ""}>
          <span class="toc-check">${done ? "✔" : num}</span>
          <span>${esc(ch.icon)} ${esc(ch.title)}</span>
        </button>`;
      }).join("");

      if (!items) return;
      encontrou = true;

      /* progresso da parte */
      const doneN = todos.filter(c => Progress.isDone(c.id)).length;
      const pct = Math.round((doneN / todos.length) * 100);
      const cls = pct === 100 ? "done" : pct > 0 ? "partial" : "";
      const label = pct === 100 ? "✔" : `${doneN}/${todos.length}`;

      html += `<div class="toc-part-row">
        <span>${esc(part.replace(/^Parte (\d+) — /, "$1. "))}</span>
        <span class="toc-part-progress ${cls}">${label}</span>
      </div>${items}`;
    });

    if (!encontrou) {
      html = `<div class="toc-empty">
        Nada encontrado para “${esc(searchQuery)}”.<br><br>
        <small>Use <kbd>Ctrl</kbd>+<kbd>K</kbd> para busca completa.</small>
      </div>`;
    }

    tocNav.innerHTML = html;

    tocNav.querySelectorAll("[data-goto]").forEach(b => {
      b.addEventListener("click", () => {
        location.hash = "#/capitulo/" + b.dataset.goto;
        closeSidebar();
      });
    });
    tocNav.querySelectorAll("[data-goto-section]").forEach(b => {
      b.addEventListener("click", () => {
        location.hash = "#/" + b.dataset.gotoSection;
        closeSidebar();
      });
    });

    /* Rola o item ativo para dentro da visão */
    const activeEl = tocNav.querySelector(".toc-item.active");
    if (activeEl) {
      const box = tocNav.getBoundingClientRect();
      const it = activeEl.getBoundingClientRect();
      if (it.top < box.top || it.bottom > box.bottom) {
        activeEl.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }

  /* ═══════════ NAV RÁPIDA ═══════════ */
  function updateQuickNav(active) {
    const bar = $("quickNav");
    if (!bar) return;
    bar.classList.toggle("hidden", !active);
    bar.querySelectorAll("[data-section]").forEach(b => {
      b.classList.toggle("active", b.dataset.section === active);
    });
  }

  /* ═══════════ HOME ═══════════ */
  let homeFilter = "all";

  function renderHome() {
    chapterNav.classList.add("hidden");
    $("quickNav").classList.add("hidden");
    breadcrumb.innerHTML = "<strong>DevBook</strong> · Full Stack do Zero";

    const done = Progress.doneCount;
    const total = CURRICULUM.length;
    const dueFlash = Flashcards.dueCount();
    const lv = Progress.levelInfo();
    const nextCh = CURRICULUM.find(c => !Progress.isDone(c.id));
    const pct = Math.round((done / total) * 100);

    const parts = [];
    CURRICULUM.forEach(ch => { if (!parts.includes(ch.part)) parts.push(ch.part); });

    const unread = CURRICULUM.filter(c => !Progress.isDone(c.id)).length;

    let html = `
      <section class="hero">
        <span class="kicker">📚 Curso completo · ${total} capítulos · ${CHALLENGES.length} desafios · ${PROJECTS.length} projetos</span>
        <h1>Vire <em>desenvolvedor</em> do zero ao deploy</h1>
        <p>HTML, CSS, JavaScript, React, Next.js, Node.js, SQL, TypeScript, testes e Docker — com código rodando na hora, ${CHALLENGES.length} desafios validados automaticamente, ${PROJECTS.length} projetos de portfólio e certificado.</p>
        <div class="hero-actions">
          <button class="btn-primary" data-action="continue">
            ▶ ${done === 0 ? "Começar pelo capítulo 1" : done === total ? "Revisar o curso" : "Continuar de onde parei"}
          </button>
          ${nextCh ? `<button class="btn-ghost" data-action="next-unread">📖 ${esc(nextCh.icon)} ${esc(nextCh.title)}</button>` : ""}
          <button class="btn-ghost" data-action="flash">🃏 Revisar ${dueFlash ? `(${dueFlash})` : "flashcards"}</button>
        </div>
        ${done > 0 ? `
        <div class="hero-progress">
          <div class="hp-bar"><span style="width:${pct}%"></span></div>
          <span>${pct}% concluído · ${done}/${total} capítulos</span>
        </div>` : ""}
      </section>

      <div class="stat-grid">
        <div class="stat-card"><div class="big">${done}/${total}</div><div class="lbl">Capítulos</div></div>
        <div class="stat-card"><div class="big">${Progress.totalXP}</div><div class="lbl">XP total</div></div>
        <div class="stat-card"><div class="big">🔥 ${Progress.state.streak}</div><div class="lbl">Dias seguidos</div></div>
        <div class="stat-card"><div class="big">${Progress.challengesDoneCount}/${CHALLENGES.length}</div><div class="lbl">Desafios</div></div>
        <div class="stat-card"><div class="big">${Progress.projectsDoneCount}/${PROJECTS.length}</div><div class="lbl">Projetos</div></div>
        <div class="stat-card"><div class="big">Nv ${lv.n}</div><div class="lbl">${lv.name}</div></div>
      </div>

      <section class="home-cta">
        <h2>Caminho completo do curso</h2>
        <div class="cta-grid">
          <button class="cta-card purple" data-goto="trilhas">
            <span class="cta-ico">🧭</span>
            <strong>Trilhas de carreira</strong>
            <span>Front-end, Back-end ou Full Stack — com a ordem de estudos ideal para cada perfil.</span>
          </button>
          <button class="cta-card accent" data-goto="projetos">
            <span class="cta-ico">📦</span>
            <strong>Projetos integradores</strong>
            <span>Dashboard, API REST e e-commerce — com escopo, pontos e critérios de aceite.</span>
          </button>
          <button class="cta-card success" data-goto="desafios">
            <span class="cta-ico">💪</span>
            <strong>Desafios de código</strong>
            <span>${CHALLENGES.length} exercícios validados automaticamente por testes ocultos.</span>
          </button>
          <button class="cta-card primary" data-goto="certificado">
            <span class="cta-ico">📜</span>
            <strong>Certificado</strong>
            <span>Emita seu certificado em PDF quando concluir os requisitos.</span>
          </button>
        </div>
      </section>

      <div class="home-filters" role="tablist" aria-label="Filtrar capítulos">
        <span class="hf-label">Filtrar</span>
        <button class="filter-chip${homeFilter === "all" ? " active" : ""}" data-filter="all">Todos <span class="fc-count">${total}</span></button>
        <button class="filter-chip${homeFilter === "unread" ? " active" : ""}" data-filter="unread">Não lidos <span class="fc-count">${unread}</span></button>
        <button class="filter-chip${homeFilter === "done" ? " active" : ""}" data-filter="done">Concluídos <span class="fc-count">${done}</span></button>
        <button class="btn-ghost small" style="width:auto;margin-left:auto" data-action="palette">🔍 Busca rápida <kbd>Ctrl K</kbd></button>
      </div>`;

    /* Partes, respeitando o filtro ativo */
    parts.forEach((part, pi) => {
      const chs = CURRICULUM.filter(c => c.part === part).filter(c => {
        if (homeFilter === "unread") return !Progress.isDone(c.id);
        if (homeFilter === "done") return Progress.isDone(c.id);
        return true;
      });
      if (!chs.length) return;

      const all = CURRICULUM.filter(c => c.part === part);
      const chDone = all.filter(c => Progress.isDone(c.id)).length;

      html += `
        <section class="part-block">
          <div class="part-head">
            <div class="part-num">${pi + 1}</div>
            <div>
              <h2>${esc(part.replace(/^Parte \d+ — /, ""))}</h2>
              <div class="part-sub">${chDone}/${all.length} concluídos${homeFilter !== "all" ? ` · mostrando ${chs.length}` : ""}</div>
            </div>
          </div>
          <div class="chapter-grid">
            ${chs.map(ch => chapterCard(ch)).join("")}
          </div>
        </section>`;
    });

    if (!CURRICULUM.some(c =>
      homeFilter === "unread" ? !Progress.isDone(c.id)
      : homeFilter === "done" ? Progress.isDone(c.id) : true)) {
      html += `<div class="empty-state">
        <div class="es-ico">${homeFilter === "done" ? "🎉" : "📚"}</div>
        <h3>${homeFilter === "done" ? "Nenhum capítulo concluído ainda" : "Tudo lido! 🎉"}</h3>
        <p>${homeFilter === "done"
          ? "Marque um capítulo como concluído e ele aparece aqui."
          : "Você completou todos os capítulos do curso. Parabéns!"}</p>
        <button class="btn-primary" data-filter="${homeFilter === "done" ? "all" : "unread"}">
          ${homeFilter === "done" ? "Ver todos os capítulos" : "Filtrar não lidos"}
        </button>
      </div>`;
    }

    view.innerHTML = html;

    /* Eventos */
    const cont = view.querySelector('[data-action="continue"]');
    if (cont) cont.onclick = goNextUnread;
    const nu = view.querySelector('[data-action="next-unread"]');
    if (nu) nu.onclick = goNextUnread;
    const fl = view.querySelector('[data-action="flash"]');
    if (fl) fl.onclick = () => Flashcards.open();
    const pal = view.querySelector('[data-action="palette"]');
    if (pal) pal.onclick = () => CommandPalette.open();

    view.querySelectorAll("[data-goto]").forEach(b => {
      b.addEventListener("click", () => { location.hash = "#/" + b.dataset.goto; });
    });
    view.querySelectorAll("[data-chapter]").forEach(el => {
      el.addEventListener("click", () => { location.hash = "#/capitulo/" + el.dataset.chapter; });
    });
    view.querySelectorAll("[data-filter]").forEach(b => {
      b.addEventListener("click", () => { homeFilter = b.dataset.filter; renderHome(); });
    });
  }

  function goNextUnread() {
    const next = CURRICULUM.find(c => !Progress.isDone(c.id));
    if (next) location.hash = "#/capitulo/" + next.id;
    else { location.hash = ""; toast("🎉 Você concluiu todos os capítulos!", "success"); }
  }

  function chapterCard(ch) {
    const done = Progress.isDone(ch.id);
    const lvl = LEVEL_LABEL[ch.level] || ["", "easy"];
    const num = chapterNum(ch.id);
    const chDone = Progress.state.quizzes[ch.id];
    return `
      <button class="chapter-card${done ? " done" : ""}" data-chapter="${ch.id}">
        <span class="cc-num">${num}</span>
        <span class="cc-icon">${ch.icon}</span>
        <span class="cc-title">${esc(ch.title)}</span>
        <span class="cc-desc">${esc(ch.desc)}</span>
        <span class="cc-meta">
          <span class="cc-badge ${lvl[1]}">${lvl[0]}</span>
          <span>⏱ ${ch.minutes} min</span>
          ${chDone ? `<span title="Quiz ${chDone.correct}/${chDone.total}">🎯 ${chDone.correct}/${chDone.total}</span>` : ""}
          <span class="cc-status">${done ? "✔ Concluído" : "▶ Ler"}</span>
        </span>
      </button>`;
  }

  /* ═══════════ SEÇÕES (trilhas/projetos/desafios/certificado) ═══════════ */
  function renderSection(id) {
    chapterNav.classList.add("hidden");
    $("quickNav").classList.remove("hidden");

    const titles = {
      trilhas: "🧭 Trilhas de Carreira",
      projetos: "📦 Projetos Integradores",
      desafios: "💪 Desafios de Código",
      certificado: "📜 Certificado"
    };
    breadcrumb.innerHTML = `<strong>${titles[id]}</strong>`;

    if (id === "trilhas") view.innerHTML = Labs.renderTracks();
    else if (id === "projetos") view.innerHTML = Labs.renderProjects();
    else if (id === "desafios") view.innerHTML = Labs.renderChallenges();
    else if (id === "certificado") view.innerHTML = Labs.renderCertificate();

    bindSectionEvents(id);
  }

  function bindSectionEvents(id) {
    view.querySelectorAll("[data-chapter]").forEach(b => {
      b.addEventListener("click", () => { location.hash = "#/capitulo/" + b.dataset.chapter; });
    });

    view.querySelectorAll("[data-project]").forEach(b => {
      b.addEventListener("click", () => {
        location.hash = "#/projetos";
        setTimeout(() => {
          const card = view.querySelector(`[data-project-open="${b.dataset.project}"]`);
          if (card) {
            const d = card.querySelector("details");
            if (d) d.open = true;
            card.scrollIntoView({ behavior: "smooth", block: "center" });
            card.classList.add("flash-highlight");
            setTimeout(() => card.classList.remove("flash-highlight"), 1600);
          }
        }, 80);
      });
    });

    view.querySelectorAll("[data-challenge]").forEach(b => {
      b.addEventListener("click", () => Challenges.open(b.dataset.challenge));
    });

    view.querySelectorAll("[data-project-toggle]").forEach(b => {
      b.addEventListener("click", () => {
        const nowDone = Progress.toggleProject(b.dataset.projectToggle);
        toast(nowDone ? "📦 Projeto marcado como entregue! +120 XP" : "Projeto desmarcado.", nowDone ? "success" : "info");
        renderSection("projetos");
        renderTOC();
        updateTotalProgress();
      });
    });

    view.querySelectorAll("[data-project-copy]").forEach(b => {
      b.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(Labs.projectBriefing(b.dataset.projectCopy));
          toast("Briefing copiado — cole no README do seu repositório.", "success");
        } catch { toast("Não foi possível copiar.", "danger"); }
      });
    });

    const emit = $("btnEmitCert");
    if (emit && !emit.disabled) emit.addEventListener("click", () => Labs.issueCertificate());
    const again = $("btnEmitAgain");
    if (again) again.addEventListener("click", () => Labs.issueCertificate());
  }

  function renderNotFound(slug) {
    chapterNav.classList.add("hidden");
    $("quickNav").classList.add("hidden");
    breadcrumb.innerHTML = "<strong>Página não encontrada</strong>";
    view.innerHTML = `
      <section class="hero">
        <span class="kicker">Erro 404</span>
        <h1>Não encontramos essa <em>página</em></h1>
        <p>O endereço <code>#/${esc(slug)}</code> não existe. Use a busca rápida para encontrar o que procura.</p>
        <div class="hero-actions">
          <button class="btn-primary" data-action="go-home">← Voltar ao início</button>
          <button class="btn-ghost" data-action="go-search">🔍 Buscar no curso</button>
        </div>
      </section>`;
    view.querySelector('[data-action="go-home"]').onclick = () => { location.hash = ""; };
    view.querySelector('[data-action="go-search"]').onclick = () => CommandPalette.open();
  }

  /* ═══════════ CAPÍTULO ═══════════ */
  let outlineSpy = null;

  function renderChapter(ch) {
    const i = idxOf(ch.id);
    const prev = CURRICULUM[i - 1];
    const next = CURRICULUM[i + 1];
    const done = Progress.isDone(ch.id);

    $("quickNav").classList.add("hidden");

    /* breadcrumb clicável: Parte > Capítulo */
    breadcrumb.innerHTML = `
      <button class="crumb-link" data-crumb-home>DevBook</button>
      <span class="crumb-sep">›</span>
      <button class="crumb-link" data-crumb-home>${esc(ch.part.replace(/^Parte \d+ — /, "Parte "))}</button>
      <span class="crumb-sep">›</span>
      <strong>${esc(ch.title)}</strong>`;

    /* Seções com IDs para âncoras + sumário */
    let sectionsHtml = "";
    const outline = [];
    (ch.sections || []).forEach((s, si) => {
      const anchor = `sec-${si}`;
      outline.push({ id: anchor, label: s.h });
      sectionsHtml += `<h2 id="${anchor}">${esc(s.h)}</h2>${s.html}`;
    });

    /* Playground */
    let pgHtml = "";
    if (ch.playground) {
      sectionsHtml += `<h2 id="sec-lab">🛠️ Experimente no playground</h2>
        <p>Edite o código e clique em <strong>▶ Rodar</strong> (ou <kbd>Ctrl</kbd>+<kbd>Enter</kbd>). O console aparece logo abaixo.</p>`;
      outline.push({ id: "sec-lab", label: "🛠️ Playground" });
      pgHtml = `<div id="playgroundMount"></div>`;
    }

    /* Desafios relacionados ao capítulo */
    const relChallenges = CHALLENGES.filter(c => (c.track || []).includes("fullstack") ||
      (ch.tags || []).some(t => norm(t).includes(norm(c.title.split(" ")[0]))));
    if (relChallenges.length && ch.level === "hard") {
      sectionsHtml += `<h2 id="sec-desafio">💪 Desafio relacionado</h2>
        <div class="rel-chal">${relChallenges.slice(0, 2).map(c => `
          <button class="rc-item" data-challenge="${c.id}">
            <span class="rc-ico">${c.icon}</span>
            <div><strong>${esc(c.title)}</strong><small>+${c.xp} XP</small></div>
          </button>`).join("")}</div>`;
      outline.push({ id: "sec-desafio", label: "💪 Desafio relacionado" });
    }

    /* Quiz */
    let quizHtml = "";
    if (ch.quiz && ch.quiz.length) {
      outline.push({ id: "sec-quiz", label: "🎯 Teste de conhecimentos" });
      quizHtml = `
        <section class="quiz-box" id="quizSection">
          <h3>🎯 Teste seus conhecimentos</h3>
          <p class="quiz-hint">${ch.quiz.length} perguntas · 15 XP por acerto · você pode tentar quantas vezes quiser</p>
          ${ch.quiz.map((q, qi) => `
            <div class="quiz-item" data-qi="${qi}" style="margin-bottom:26px">
              <p class="quiz-q"><strong>${qi + 1}.</strong> ${esc(q.q)}</p>
              <div class="quiz-opts">
                ${q.opts.map((o, oi) => `<button class="quiz-opt" data-opt="${oi}">${String.fromCharCode(65 + oi)}) ${esc(o)}</button>`).join("")}
              </div>
              <div class="quiz-feedback" data-feedback></div>
            </div>`).join("")}
        </section>`;
    }

    /* Síntese */
    const summaryHtml = `
      <section class="summary-box">
        <h3>📌 O que você aprendeu neste capítulo</h3>
        <ul>${(ch.flashcards || []).map(f => `<li><strong>${esc(f.q)}</strong></li>`).join("")}</ul>
        <button class="btn-ghost small summary-btn" data-action="review-chapter-flash">
          🃏 Revisar os ${(ch.flashcards || []).length} flashcards deste capítulo
        </button>
      </section>`;
    outline.push({ id: "sec-resumo", label: "📌 Síntese" });

    /* Sumário do capítulo */
    const outlineHtml = outline.length > 2 ? `
      <details class="ch-outline" id="chOutline">
        <summary>Neste capítulo (${outline.length} seções)</summary>
        <ol>${outline.map(o => `<li><a href="#${o.id}" data-outline="${o.id}">${esc(o.label)}</a></li>`).join("")}</ol>
      </details>` : "";

    view.innerHTML = `
      <header class="ch-head">
        <div class="ch-top">
          <span class="ch-counter">Capítulo ${i + 1} de ${CURRICULUM.length}</span>
          ${done ? '<span class="ch-done-badge">✔ Concluído</span>' : ""}
        </div>
        <h1>${ch.icon} ${esc(ch.title)}</h1>
        <p class="ch-lead">${esc(ch.lead)}</p>
        <div class="ch-tags">${ch.tags.map(t => `<span class="ch-tag">${esc(t)}</span>`).join("")}
          <span class="ch-tag">⏱ ${ch.minutes} min</span>
        </div>
      </header>

      ${outlineHtml}

      <article class="content" id="sec-conteudo">
        ${sectionsHtml}
        ${pgHtml}
        <h2 id="sec-quiz-top"></h2>
        ${quizHtml}
        <div id="sec-resumo-anchor"></div>
        ${summaryHtml}
      </article>`;

    /* Playground */
    if (ch.playground) {
      const mount = $("playgroundMount");
      if (mount) mount.appendChild(Playground.create(ch.playground));
    }

    /* Quiz */
    if (ch.quiz && ch.quiz.length) initQuiz(ch);

    /* Desafios relacionados */
    view.querySelectorAll("[data-challenge]").forEach(b => {
      b.addEventListener("click", () => Challenges.open(b.dataset.challenge));
    });

    /* Flashcards do capítulo */
    const revBtn = view.querySelector('[data-action="review-chapter-flash"]');
    if (revBtn) revBtn.onclick = () => Flashcards.open();

    /* Breadcrumb */
    view.querySelectorAll("[data-crumb-home]").forEach(b => {
      b.addEventListener("click", () => { location.hash = ""; });
    });

    /* Sumário com scroll spy */
    setupOutlineSpy();

    /* Barra de navegação inferior */
    chapterNav.classList.remove("hidden");
    const btnPrev = $("btnPrev"), btnNext = $("btnNext"), btnComplete = $("btnComplete");

    btnPrev.disabled = !prev;
    btnPrev.querySelector("span").textContent = prev ? `Cap. ${chapterNum(prev.id)} · ${prev.title}` : "Início";
    btnPrev.title = prev ? `Anterior: ${prev.title}` : "Voltar ao início";
    btnPrev.onclick = () => { location.hash = prev ? "#/capitulo/" + prev.id : ""; };

    btnNext.disabled = !next;
    btnNext.querySelector("span").textContent = next ? `Cap. ${chapterNum(next.id)} · ${next.title}` : "Fim do curso";
    btnNext.title = next ? `Próximo: ${next.title}` : "Você chegou ao fim";
    btnNext.onclick = () => { location.hash = next ? "#/capitulo/" + next.id : ""; };

    updateCompleteBtn(btnComplete, ch, next);
    btnComplete.onclick = () => {
      if (Progress.isDone(ch.id)) {
        if (next) location.hash = "#/capitulo/" + next.id;
        else toast("🎉 Última etapa do curso concluída!", "success");
        return;
      }
      Progress.completeChapter(ch.id, ch.minutes);
      updateCompleteBtn(btnComplete, ch, next);
      renderTOC();
      updateTotalProgress();
      updateContinueBtn();
    };

    $("btnBadges").onclick = openBadges;
  }

  function updateCompleteBtn(btn, ch, next) {
    if (Progress.isDone(ch.id)) {
      btn.textContent = next ? "✓ Concluído — próximo →" : "✓ Concluído — fim do curso";
      btn.classList.add("done");
    } else {
      btn.textContent = "✓ Concluir e ganhar 50 XP";
      btn.classList.remove("done");
    }
  }

  /* Scroll spy do sumário do capítulo */
  function setupOutlineSpy() {
    const box = $("chOutline");
    if (!box) return;
    box.open = true; /* aberto por padrão — ajuda a navegar */

    box.querySelectorAll("[data-outline]").forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        const target = $(a.dataset.outline);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top, behavior: "smooth" });
        }
        box.open = false;
      });
    });

    const links = [...box.querySelectorAll("[data-outline]")];
    const targets = links.map(a => $(a.dataset.outline)).filter(Boolean);
    if (!targets.length) return;

    const onScroll = () => {
      let currentIdx = 0;
      targets.forEach((t, i) => {
        if (t.getBoundingClientRect().top <= 140) currentIdx = i;
      });
      links.forEach((a, i) => a.classList.toggle("current", i === currentIdx));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    outlineSpy = () => window.removeEventListener("scroll", onScroll);
  }

  function stopOutlineSpy() {
    if (outlineSpy) { outlineSpy(); outlineSpy = null; }
  }

  /* ═══════════ QUIZ ═══════════ */
  function initQuiz(ch) {
    const box = $("quizSection");
    if (!box) return;
    const answered = {};
    let correct = 0;

    box.querySelectorAll(".quiz-item").forEach(item => {
      const qi = Number(item.dataset.qi);
      const q = ch.quiz[qi];
      const fb = item.querySelector("[data-feedback]");

      item.querySelectorAll(".quiz-opt").forEach(opt => {
        opt.addEventListener("click", () => {
          if (answered[qi] !== undefined) return;
          answered[qi] = Number(opt.dataset.opt);

          const isRight = answered[qi] === q.answer;
          if (isRight) correct++;

          item.querySelectorAll(".quiz-opt").forEach((o, oi) => {
            o.disabled = true;
            if (oi === q.answer) o.classList.add("correct");
            else if (oi === answered[qi]) o.classList.add("wrong");
          });

          fb.className = "quiz-feedback show " + (isRight ? "ok" : "no");
          fb.innerHTML = `<strong>${isRight ? "✔ Correto!" : "✘ Incorreto."}</strong> ${esc(q.feedback)}`;

          if (Object.keys(answered).length === ch.quiz.length) {
            Progress.saveQuiz(ch.id, correct, ch.quiz.length);
            if (correct === ch.quiz.length) toast("🎯 Quiz perfeito! Bônus de XP", "success");
            else toast(`Quiz finalizado: ${correct}/${ch.quiz.length} acertos. +${correct * 15} XP`, "xp");
            renderTOC();
          }
        });
      });
    });
  }

  /* ═══════════ BARRA DE PROGRESSO (leitura + total) ═══════════ */
  function updateTotalProgress() {
    const pct = Math.round((Progress.doneCount / CURRICULUM.length) * 100);
    const ring = $("totalRing");
    const label = $("totalPct");
    if (ring) ring.style.strokeDashoffset = 100 - pct;
    if (label) label.textContent = pct + "%";
    updateContinueBtn();
  }

  function updateContinueBtn() {
    const btn = $("btnContinue");
    if (!btn) return;
    const next = CURRICULUM.find(c => !Progress.isDone(c.id));
    if (next) {
      btn.innerHTML = `▶ Continuar: ${esc(next.icon)} ${esc(next.title.slice(0, 28))}`;
      btn.onclick = goNextUnread;
    } else {
      btn.innerHTML = "🎉 Curso completo!";
      btn.onclick = () => { location.hash = ""; };
    }
  }

  /* Progresso de leitura da página.
     Calculado de forma SÍNCRONA: usar requestAnimationFrame aqui
     deixava a barra sem valor em abas não-visíveis (rAF é pausado). */
  let maxScrollCache = 0;

  function measureScroll() {
    maxScrollCache = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    return maxScrollCache;
  }

  function updateReadBar() {
    const fill = $("readFill");
    const top = $("btnTop");
    const y = window.scrollY || window.pageYOffset || 0;

    if (fill) {
      const max = maxScrollCache || measureScroll();
      const pct = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
      fill.style.width = pct.toFixed(1) + "%";
    }
    if (top) top.classList.toggle("show", y > 500);
  }

  /* ═══════════ CONQUISTAS ═══════════ */
  function openBadges() {
    const body = $("badgeBody");
    const snap = {
      xp: Progress.totalXP,
      chaptersDone: Progress.doneCount,
      streak: Math.max(Progress.state.streak, Progress.state.streakBest || 0),
      perfectQuizzes: Progress.state.perfectQuizzes,
      flashReviews: Progress.state.flashReviews,
      challengesDone: Progress.challengesDoneCount,
      projectsDone: Progress.projectsDoneCount,
      certificates: Progress.state.certificates,
      trackFullstack: Progress.trackComplete("fullstack")
    };
    const unlocked = BADGES.filter(b => b.check(snap)).length;
    body.innerHTML = `
      <p class="badge-summary">
        Você desbloqueou <strong>${Progress.state.badges.length}</strong> de ${BADGES.length} conquistas
        (${unlocked} já atingidas no estado atual).
      </p>
      <div class="badge-grid">${BADGES.map(b => {
        const has = b.check(snap);
        return `<div class="badge-item${has ? "" : " locked"}">
          <span class="b-ico">${b.ico}</span>
          <div class="b-name">${esc(b.name)}</div>
          <div class="b-desc">${esc(b.desc)}</div>
        </div>`;
      }).join("")}</div>`;
    $("badgeModal").classList.remove("hidden");
  }

  function openShortcuts() { $("shortcutsModal").classList.remove("hidden"); }

  /* ═══════════ SIDEBAR MOBILE ═══════════ */
  function openSidebar() {
    $("sidebar").classList.add("open");
    $("sidebarBackdrop").classList.add("show");
  }
  function closeSidebar() {
    $("sidebar").classList.remove("open");
    $("sidebarBackdrop").classList.remove("show");
  }

  /* ═══════════ PWA ═══════════ */
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPrompt = e;
    $("pwaBar").classList.remove("hidden");
  });
  $("btnInstall").onclick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    $("pwaBar").classList.add("hidden");
  };
  $("btnDismissPwa").onclick = () => $("pwaBar").classList.add("hidden");

  window.addEventListener("online", () => $("offlineBadge").classList.add("hidden"));
  window.addEventListener("offline", () => $("offlineBadge").classList.remove("hidden"));
  if (!navigator.onLine) $("offlineBadge").classList.remove("hidden");

  /* ═══════════ EVENTOS GLOBAIS ═══════════ */
  $("btnTheme").onclick = () => Theme.toggle();
  $("btnFlashcards").onclick = () => Flashcards.open();
  $("btnBadges").onclick = openBadges;
  $("btnShortcuts").onclick = openShortcuts;
  $("btnContinue").onclick = goNextUnread;
  $("btnPalette").onclick = () => CommandPalette.open();
  $("btnPaletteMobile").onclick = () => CommandPalette.open();
  $("btnTop").onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  $("btnResetProgress").onclick = () => {
    Progress.reset();
    route();
  };
  $("btnOpenSidebar").onclick = openSidebar;
  $("btnCloseSidebar").onclick = closeSidebar;
  $("sidebarBackdrop").onclick = closeSidebar;

  document.querySelectorAll("#quickNav [data-section]").forEach(b => {
    b.addEventListener("click", () => {
      location.hash = "#/" + b.dataset.section;
      if (window.innerWidth <= 860) closeSidebar();
    });
  });

  /* Filtro do sumário */
  const searchInput = $("searchInput");
  searchInput.addEventListener("input", e => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderTOC();
  });
  searchInput.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      searchInput.value = "";
      searchQuery = "";
      renderTOC();
      searchInput.blur();
    }
  });
  /* Enter no filtro abre o primeiro resultado */
  searchInput.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    const first = tocNav.querySelector("[data-goto], [data-goto-section]");
    if (first) first.click();
  });

  /* Scroll: barra de leitura + botão topo.
     throttle com rAF evita recalcular a cada pixel — mas calculamos
     de forma síncrona no scroll, com o valor em cache. */
  let scrollTick = false;
  window.addEventListener("scroll", () => {
    updateReadBar();
    /* recacheia a altura a cada ~10 eventos de scroll */
    if (!scrollTick) {
      scrollTick = true;
      setTimeout(() => { scrollTick = false; measureScroll(); }, 250);
    }
  }, { passive: true });

  /* Fechar modais */
  document.querySelectorAll("[data-close-modal]").forEach(b => {
    b.addEventListener("click", () => b.closest(".modal").classList.add("hidden"));
  });
  document.querySelectorAll(".modal").forEach(m => {
    m.addEventListener("click", e => { if (e.target === m) m.classList.add("hidden"); });
  });

  /* Atalhos de teclado */
  document.addEventListener("keydown", e => {
    const typing = document.activeElement &&
      ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
    if (typing) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const k = e.key.toLowerCase();
    if (k === "t") Theme.toggle();
    else if (k === "f") Flashcards.open();
    else if (k === "n") { e.preventDefault(); goNextUnread(); }
    else if (e.key === "?") openShortcuts();
    else if (e.key === "Escape") {
      document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden"));
      closeSidebar();
    }
  });

  window.addEventListener("hashchange", route);
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeSidebar();
    maxScrollCache = 0;
    measureScroll();
    updateReadBar();
  });

  /* ═══════════ BOOT ═══════════ */
  Gate.init();
  Progress.renderProfile();
  Progress.checkBadges();
  route();
})();