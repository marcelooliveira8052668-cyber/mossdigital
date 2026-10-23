/* ═══════════════════════════════════════════════════════
   DevBook — Paleta de comandos (Ctrl+K / Cmd+K)
   Busca rápida em capítulos, seções, projetos, desafios
   e ações. É o atalho principal de navegação.
   ═══════════════════════════════════════════════════════ */

const CommandPalette = (() => {
  let open = false;
  let items = [];
  let filtered = [];
  let cursor = 0;
  let query = "";

  const el = () => document.getElementById("palette");

  /* ═══════════ ÍNDICE DE COMANDOS ═══════════ */
  function buildIndex() {
    const list = [];

    /* Ações rápidas */
    list.push({ group: "Ações", icon: "▶", label: "Continuar de onde parei", hint: "próximo capítulo não lido", run: () => goNextUnread() });
    list.push({ group: "Ações", icon: "🏠", label: "Ir para o início", run: () => { location.hash = ""; } });
    list.push({ group: "Ações", icon: "🃏", label: "Revisar flashcards", hint: "F", run: () => Flashcards.open() });
    list.push({ group: "Ações", icon: "🌙", label: "Alternar tema claro/escuro", hint: "T", run: () => document.getElementById("btnTheme").click() });
    list.push({ group: "Ações", icon: "🏅", label: "Ver minhas conquistas", run: () => document.getElementById("btnBadges").click() });

    /* Seções do curso */
    list.push({ group: "Ir para", icon: "🧭", label: "Trilhas de carreira", run: () => { location.hash = "#/trilhas"; } });
    list.push({ group: "Ir para", icon: "📦", label: "Projetos integradores", run: () => { location.hash = "#/projetos"; } });
    list.push({ group: "Ir para", icon: "💪", label: "Desafios de código", run: () => { location.hash = "#/desafios"; } });
    list.push({ group: "Ir para", icon: "📜", label: "Certificado de conclusão", run: () => { location.hash = "#/certificado"; } });

    /* Trilhas */
    TRACKS.forEach(t => {
      list.push({
        group: "Trilhas", icon: t.icon,
        label: t.name, hint: t.tagline,
        run: () => { location.hash = "#/trilhas"; }
      });
    });

    /* Capítulos */
    CURRICULUM.forEach(c => {
      list.push({
        group: c.part, icon: c.icon,
        label: c.title, hint: `${c.level} · ${c.minutes} min`,
        done: Progress.isDone(c.id),
        run: () => { location.hash = "#/capitulo/" + c.id; }
      });
    });

    /* Projetos */
    PROJECTS.forEach(p => {
      list.push({
        group: "Projetos", icon: p.icon,
        label: p.name, hint: `${p.hours}h · ${p.stack.slice(0, 3).join(", ")}`,
        done: Progress.isProjectDone(p.id),
        run: () => { location.hash = "#/projetos"; }
      });
    });

    /* Desafios */
    CHALLENGES.forEach(c => {
      list.push({
        group: "Desafios", icon: c.icon,
        label: c.title, hint: `${c.level} · ${c.xp} XP`,
        done: Progress.isChallengeDone(c.id),
        run: () => Challenges.open(c.id)
      });
    });

    return list;
  }

  /* ═══════════ RANKING (fuzzy simples) ═══════════ */
  function score(item, q) {
    const label = item.label.toLowerCase();
    const group = item.group.toLowerCase();
    const hint = (item.hint || "").toLowerCase();

    /* começa com o termo — melhor */
    if (label.startsWith(q)) return 1000;
    /* palavra começa com o termo */
    const words = label.split(/\s+/);
    if (words.some(w => w.startsWith(q))) return 700;
    /* contém */
    if (label.includes(q)) return 500;
    if (group.includes(q)) return 300;
    if (hint.includes(q)) return 200;
    /* subsequência (a c d em "academico") */
    if (subsequence(q, label)) return 100;
    return 0;
  }

  function subsequence(needle, hay) {
    let i = 0;
    for (const ch of hay) {
      if (ch === needle[i]) i++;
      if (i === needle.length) return true;
    }
    return needle.length === 0;
  }

  /* Remove acentos para busca — "react" acha "Reação", "codigo" acha "código" */
  function norm(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function applyFilter() {
    const q = norm(query.trim());
    if (!q) {
      filtered = items.slice(0, 40);
    } else {
      filtered = items
        .map(it => ({ it, s: score(it, q) }))
        .filter(x => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 40)
        .map(x => x.it);
    }
    cursor = 0;
    render();
  }

  /* ═══════════ RENDER ═══════════ */
  function render() {
    const box = el();
    if (!box) return;

    if (!filtered.length) {
      box.innerHTML = `
        <div class="palette-box">
          <div class="palette-search">
            <span class="ps-ico">🔍</span>
            <input type="text" class="ps-input" placeholder="Buscar capítulo, projeto, atalho…"
                   value="${escapeAttr(query)}" aria-label="Buscar" autocomplete="off">
            <kbd>Esc</kbd>
          </div>
          <div class="palette-empty">
            Nada encontrado para <strong>${escapeHtml(query)}</strong>.<br>
            <small>Tente "react", "docker", "jwt", "projeto", "tema"…</small>
          </div>
        </div>`;
      bindSearch();
      return;
    }

    /* agrupa mantendo a ordem filtrada */
    let html = "";
    let lastGroup = null;
    filtered.forEach((it, i) => {
      if (it.group !== lastGroup) {
        html += `<div class="palette-group">${escapeHtml(it.group)}</div>`;
        lastGroup = it.group;
      }
      html += `
        <button class="palette-item${i === cursor ? " active" : ""}" data-i="${i}">
          <span class="pi-ico">${it.icon}</span>
          <span class="pi-label">
            ${highlight(it.label, query)}
            ${it.hint ? `<em>${escapeHtml(it.hint)}</em>` : ""}
          </span>
          ${it.done ? '<span class="pi-done" title="Concluído">✔</span>' : ""}
        </button>`;
    });

    box.innerHTML = `
      <div class="palette-box">
        <div class="palette-search">
          <span class="ps-ico">🔍</span>
          <input type="text" class="ps-input" placeholder="Buscar capítulo, projeto, atalho…"
                 value="${escapeAttr(query)}" aria-label="Buscar comandos" autocomplete="off">
          <kbd>Esc</kbd>
        </div>
        <div class="palette-list">${html}</div>
        <div class="palette-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
          <span><kbd>Enter</kbd> abrir</span>
          <span><kbd>Esc</kbd> fechar</span>
          <span class="pf-count">${filtered.length} resultado(s)</span>
        </div>
      </div>`;

    bindSearch();

    box.querySelectorAll(".palette-item").forEach(b => {
      b.addEventListener("click", () => pick(Number(b.dataset.i)));
      b.addEventListener("mousemove", () => setCursor(Number(b.dataset.i)));
    });
    scrollCursorIntoView();
  }

  /* Realça o trecho digitado */
  function highlight(label, q) {
    const clean = norm(q.trim());
    if (!clean) return escapeHtml(label);
    const nLabel = norm(label);
    const idx = nLabel.indexOf(clean);
    if (idx === -1) return escapeHtml(label);
    return escapeHtml(label.slice(0, idx))
      + "<mark>" + escapeHtml(label.slice(idx, idx + clean.length)) + "</mark>"
      + escapeHtml(label.slice(idx + clean.length));
  }

  const escapeHtml = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const escapeAttr = s => escapeHtml(s).replace(/"/g, "&quot;");

  function bindSearch() {
    const input = el().querySelector(".ps-input");
    if (!input) return;
    input.value = query;
    input.focus();
    /* cursor no fim */
    input.setSelectionRange(input.value.length, input.value.length);
    input.addEventListener("input", e => {
      query = e.target.value;
      applyFilter();
    });
  }

  /* ═══════════ NAVEGAÇÃO NO LISTADO ═══════════ */
  function setCursor(i) {
    if (i === cursor) return;
    cursor = i;
    el().querySelectorAll(".palette-item").forEach((b, bi) => {
      b.classList.toggle("active", bi === i);
    });
    scrollCursorIntoView();
  }

  function scrollCursorIntoView() {
    const box = el();
    const active = box.querySelector(".palette-item.active");
    const list = box.querySelector(".palette-list");
    if (active && list) {
      const a = active.offsetTop, h = active.offsetHeight;
      if (a < list.scrollTop) list.scrollTop = a - 8;
      else if (a + h > list.scrollTop + list.clientHeight) list.scrollTop = a + h - list.clientHeight + 8;
    }
  }

  function move(delta) {
    if (!filtered.length) return;
    setCursor((cursor + delta + filtered.length) % filtered.length);
  }

  function pick(i) {
    const item = filtered[i];
    if (!item) return;
    close();
    /* Executa direto — rAF pode ser pausado em abas em background,
       o que deixaria a navegação travada. setTimeout(0) é sempre fires. */
    try { item.run(); }
    catch (e) { console.error("Falha ao executar comando:", e); }
  }

  /* ═══════════ ABRIR / FECHAR ═══════════ */
  function show() {
    items = buildIndex();
    query = "";
    open = true;
    el().classList.remove("hidden");
    applyFilter();
    document.body.classList.add("palette-open");
  }

  function close() {
    open = false;
    el().classList.add("hidden");
    document.body.classList.remove("palette-open");
    /* Solta o foco: se ficar preso no input escondido, atalhos como
       "/" param de funcionar porque o navegador acha que estamos digitando. */
    const active = document.activeElement;
    if (active && el().contains(active)) {
      active.blur();
      if (document.body) document.body.focus();
    }
  }

  function toggle() { open ? close() : show(); }

  /* Próximo capítulo não lido */
  function goNextUnread() {
    const next = CURRICULUM.find(c => !Progress.isDone(c.id));
    if (next) location.hash = "#/capitulo/" + next.id;
    else location.hash = "";
  }

  /* ═══════════ TECLADO GLOBAL ═══════════ */
  function onKey(e) {
    /* Ctrl+K / Cmd+K / "/" abre de qualquer lugar */
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      toggle();
      return;
    }
    if (e.key === "/" && !isTyping(e)) {
      e.preventDefault();
      show();
      return;
    }
    if (!open) return;

    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (e.key === "Home") { e.preventDefault(); setCursor(0); }
    else if (e.key === "End") { e.preventDefault(); setCursor(filtered.length - 1); }
    else if (e.key === "Enter") { e.preventDefault(); pick(cursor); }
    else if (e.key === "Tab") { e.preventDefault(); move(e.shiftKey ? -1 : 1); }
  }

  function isTyping(e) {
    const el = document.activeElement;
    return el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
  }

  document.addEventListener("keydown", onKey);

  /* Clica fora fecha */
  document.addEventListener("click", e => {
    if (open && el() && !el().contains(e.target)) close();
  });

  return { open: show, close, toggle };
})();