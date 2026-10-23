/* ═══════════════════════════════════════════════════════
   DevBook — Flashcards com repetição espaçada (Leitner)
   Modal de revisão global — prioriza cards vencidos
   ═══════════════════════════════════════════════════════ */

const Flashcards = (() => {

  /* Monta lista global de todos os cards do currículo */
  function allCards() {
    const list = [];
    CURRICULUM.forEach(ch => {
      (ch.flashcards || []).forEach((f, i) => {
        list.push({ chapterId: ch.id, chapterTitle: ch.title, idx: i, q: f.q, a: f.a });
      });
    });
    return list;
  }

  /* Cards vencidos (ou nunca vistos) */
  function dueCards() {
    return allCards().filter(c => Progress.flashDue(c.chapterId, c.idx));
  }

  /* ─── Estado do modal ─── */
  let queue = [];
  let pos = 0;
  let revealed = false;
  let results = [];

  function open() {
    queue = dueCards();
    if (queue.length === 0) {
      queue = allCards().slice(0, 10); // se nada venceu, sorteia 10 para praticar
      toast("Nenhuma revisão vencida — modo prática sorteou 10 cards.", "info");
    }
    pos = 0;
    revealed = false;
    results = [];
    document.getElementById("flashModal").classList.remove("hidden");
    render();
  }

  function close() {
    document.getElementById("flashModal").classList.add("hidden");
  }

  function render() {
    const body = document.getElementById("flashBody");

    /* Fim da revisão */
    if (pos >= queue.length) {
      const ok = results.filter(r => r >= 2).length;
      body.innerHTML = `
        <div class="flash-stage">
          <div style="font-size:3rem;margin-bottom:10px">${ok === queue.length ? "🎉" : "✅"}</div>
          <h3>Revisão concluída!</h3>
          <p style="color:var(--text-2);margin:10px 0 18px">
            Você revisou <strong>${queue.length}</strong> cards e acertou
            <strong>${ok}</strong> de primeira ou no esforço.
          </p>
          <div class="stat-grid" style="grid-template-columns:repeat(3,1fr)">
            <div class="stat-card"><div class="big">${queue.length}</div><div class="lbl">Revisados</div></div>
            <div class="stat-card"><div class="big">${ok}</div><div class="lbl">Dominados</div></div>
            <div class="stat-card"><div class="big">${queue.length - ok}</div><div class="lbl">Refazer</div></div>
          </div>
          <button class="btn-primary" style="margin-top:18px" id="flashCloseBtn">Concluir</button>
        </div>`;
      document.getElementById("flashCloseBtn").onclick = close;
      return;
    }

    const card = queue[pos];
    const dots = queue.map((_, i) => {
      let cls = "flash-dot";
      if (i < results.length) cls += results[i] >= 2 ? " ok" : " no";
      if (i === pos) cls += " active";
      return `<span class="${cls}"></span>`;
    }).join("");

    body.innerHTML = `
      <div class="flash-stage">
        <div class="flash-progress">${dots}</div>
        <div style="font-size:.72rem;color:var(--text-3);margin-bottom:10px;text-transform:uppercase;letter-spacing:.1em;font-weight:700">
          ${card.chapterTitle} · ${pos + 1}/${queue.length}
        </div>

        <div class="flash-card" id="flashCard" role="button" tabindex="0">
          <div class="fc-face">
            <span class="fc-label">${revealed ? "Resposta" : "Pergunta"}</span>
            ${revealed
              ? `<div class="fc-answer">${escapeHtml(card.a)}</div>`
              : `<div>${escapeHtml(card.q)}</div>`}
          </div>
        </div>

        ${revealed
          ? `<p class="flash-hint">Como foi sua resposta?</p>
             <div class="flash-rates">
               <button class="flash-rate again" data-rate="0">😵 De novo</button>
               <button class="flash-rate hard"  data-rate="1">😓 Difícil</button>
               <button class="flash-rate good"  data-rate="2">🙂 Bom</button>
               <button class="flash-rate easy"  data-rate="3">😎 Fácil</button>
             </div>`
          : `<p class="flash-hint">Clique no card ou pressione Espaço para ver a resposta</p>`}
      </div>`;

    const cardEl = document.getElementById("flashCard");
    cardEl.addEventListener("click", () => { if (!revealed) { revealed = true; render(); } });
    cardEl.addEventListener("keydown", e => {
      if ((e.key === " " || e.key === "Enter") && !revealed) { e.preventDefault(); revealed = true; render(); }
    });

    body.querySelectorAll("[data-rate]").forEach(btn => {
      btn.addEventListener("click", () => {
        const rate = Number(btn.dataset.rate);
        Progress.reviewFlash(card.chapterId, card.idx, rate);
        results.push(rate);
        revealed = false;
        pos++;
        render();
      });
    });
  }

  /* Atalho global: Espaço revela, 1-4 avaliam */
  function handleKeys(e) {
    const modal = document.getElementById("flashModal");
    if (modal.classList.contains("hidden")) return;
    if (e.key === "Escape") { close(); return; }
    if (document.activeElement && document.activeElement.tagName === "INPUT") return;

    if ((e.key === " " || e.key === "Enter") && !revealed && pos < queue.length) {
      e.preventDefault();
      revealed = true;
      render();
      return;
    }
    if (revealed && ["1", "2", "3", "4"].includes(e.key)) {
      const rate = Number(e.key) - 1;
      const card = queue[pos];
      Progress.reviewFlash(card.chapterId, card.idx, rate);
      results.push(rate);
      revealed = false;
      pos++;
      render();
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  document.addEventListener("keydown", handleKeys);

  return { open, close, dueCount: () => dueCards().length };
})();
