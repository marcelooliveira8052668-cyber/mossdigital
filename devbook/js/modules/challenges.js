/* ═══════════════════════════════════════════════════════
   DevBook — Desafios de codigo com validacao automatica
   O codigo do aluno roda em iframe sandboxed (sem rede,
   sem acesso ao pai) junto com a suite de testes do
   desafio. O resultado aparece num console e, se passar,
   o desafio e marcado como concluido e rende XP.
   ═══════════════════════════════════════════════════════ */

const Challenges = (() => {
  const modalEl = () => document.getElementById("challengeModal");
  const bodyEl  = () => document.getElementById("challengeBody");

  let current = null;   // desafio aberto
  let running = false;  // trava re-execucao enquanto o sandbox roda
  let frame = null;     // iframe ativo

  const LVL = {
    easy:   { label: "Facil",    cls: "easy" },
    medium: { label: "Medio",    cls: "medium" },
    hard:   { label: "Avancado", cls: "hard" }
  };

  /* ─── Utilidades ─── */
  const esc = s => String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const decode = s => {
    const t = document.createElement("textarea");
    t.innerHTML = s || "";
    return t.value;
  };

  const line = (text, cls) => {
    const d = document.createElement("div");
    if (cls) d.className = cls;
    d.textContent = text;
    return d;
  };

  const consoleEl = () => bodyEl() && bodyEl().querySelector("[data-console]");
  const verdictEl = () => bodyEl() && bodyEl().querySelector("[data-verdict]");
  const setVerdict = t => { const v = verdictEl(); if (v) v.textContent = t; };

  /* ═══════════ CONTROLE ═══════════ */
  function open(id) {
    const c = CHALLENGES.find(x => x.id === id);
    if (!c) return;
    current = c;
    running = false;
    render();
    modalEl().classList.remove("hidden");
    const first = bodyEl().querySelector("textarea");
    if (first) first.focus();
  }

  function close() {
    stopFrame();
    running = false;
    modalEl().classList.add("hidden");
    current = null;
  }

  function onKey(e) {
    if (e.key === "Escape") { close(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); run(); }
  }

  function stopFrame() {
    if (frame && frame.parentNode) frame.parentNode.removeChild(frame);
    frame = null;
    window.removeEventListener("message", onMessage);
  }

  /* ═══════════ RENDER ═══════════ */
  function render() {
    const c = current;
    const done = Progress.isChallengeDone(c.id);
    const lvl = LVL[c.level] || LVL.easy;
    const saved = localStorage.getItem("devbook_ch_" + c.id);

    bodyEl().innerHTML = `
      <div class="chal">
        <header class="chal-head">
          <div>
            <div class="chal-kicker">
              ${esc(c.icon)} Desafio de codigo ·
              <span class="cc-badge ${lvl.cls}">${lvl.label}</span> ·
              <strong>+${c.xp} XP</strong>
            </div>
            <h3>${esc(c.title)}</h3>
          </div>
          ${done ? '<span class="chal-done">&#10004; Concluido</span>' : ""}
        </header>

        <div class="callout info">
          <span class="co-title">Enunciado</span>
          <p>${c.prompt}</p>
        </div>

        <details class="chal-hint">
          <summary>&#128161; Precisa de uma dica?</summary>
          <p>${c.hint}</p>
        </details>

        <div class="playground chal-pg">
          <div class="pg-head">
            <div class="pg-tabs"><span class="pg-tab active">solucao.js</span></div>
            <div class="pg-actions">
              <button class="pg-btn run" data-action="validate" title="Rodar testes (Ctrl+Enter)">&#9654; Validar</button>
              <button class="pg-btn" data-action="reset" title="Descartar e voltar ao inicio">&#8630;</button>
              <button class="pg-btn" data-action="copy" title="Copiar codigo">&#10697;</button>
            </div>
          </div>
          <div class="pg-body chal-body">
            <div class="pg-editor">
              <textarea spellcheck="false" aria-label="Sua solucao"></textarea>
            </div>
            <div class="pg-console chal-console" data-console hidden></div>
          </div>
        </div>

        <div class="chal-footer">
          <small>
            <kbd>Ctrl</kbd>+<kbd>Enter</kbd> valida ·
            resultado: <span data-verdict class="chal-verdict">aguardando</span>
          </small>
        </div>

        <details class="chal-how">
          <summary>Como a validacao funciona?</summary>
          <p>Ao validar, seu codigo roda em um ambiente isolado (sem internet e sem acesso a esta pagina) junto com casos de teste ocultos. Se todos passarem, voce ganha <strong>+${c.xp} XP</strong>. Erros de sintaxe ou excecoes aparecem no console abaixo do editor.</p>
        </details>
      </div>`;

    const ta = bodyEl().querySelector("textarea");
    ta.value = saved || decode(c.starter);

    ta.addEventListener("keydown", e => {
      if (e.key === "Tab") {
        e.preventDefault();
        const s = ta.selectionStart, en = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + "  " + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = s + 2;
      }
    });
    ta.addEventListener("input", () => {
      try { localStorage.setItem("devbook_ch_" + c.id, ta.value); } catch {}
    });

    bodyEl().querySelector('[data-action="validate"]').addEventListener("click", () => run());
    bodyEl().querySelector('[data-action="reset"]').addEventListener("click", () => {
      if (!confirm("Descartar sua solucao e voltar ao codigo inicial?")) return;
      ta.value = decode(c.starter);
      try { localStorage.removeItem("devbook_ch_" + c.id); } catch {}
      const box = consoleEl();
      box.innerHTML = "";
      box.hidden = true;
      setVerdict("aguardando");
    });
    bodyEl().querySelector('[data-action="copy"]').addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(ta.value); toast("Codigo copiado!", "success"); }
      catch { toast("Nao foi possivel copiar.", "danger"); }
    });
  }

  /* ═══════════ EXECUCAO NO SANDBOX ═══════════ */
  function run() {
    if (running || !current) return;
    running = true;

    const c = current;
    const code = bodyEl().querySelector("textarea").value;
    const box = consoleEl();
    box.innerHTML = "";
    box.hidden = false;
    box.appendChild(line("› Rodando suite de testes…", "log-info"));
    setVerdict("executando…");

    /* Documento do sandbox:
       1) hook de console que repassa tudo ao pai via postMessage
       2) codigo do aluno
       3) suite de testes (lanca se falhar) */
    const doc = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>
<script>
(function () {
  var post = function (msg, kind) {
    parent.postMessage({ __chal: true, txt: msg, kind: kind || "" }, "*");
  };
  var fmt = function (args) {
    return Array.prototype.slice.call(args).map(function (v) {
      if (v instanceof Error) return v.message;
      if (typeof v === "object" && v !== null) {
        try { return JSON.stringify(v); } catch (e) { return String(v); }
      }
      return String(v);
    }).join(" ");
  };
  ["log", "info"].forEach(function (m) {
    var orig = console[m];
    console[m] = function () { post(fmt(arguments), ""); orig.apply(console, arguments); };
  });
  ["warn", "error"].forEach(function (m) {
    var orig = console[m];
    console[m] = function () { post(fmt(arguments), "warn"); orig.apply(console, arguments); };
  });
  window.addEventListener("error", function (e) {
    post("Erro de sintaxe/runtime: " + e.message + " (linha " + e.lineno + ")", "err");
    post("__halt__", "err");
  });
  window.addEventListener("unhandledrejection", function (e) {
    post("Promise rejeitada: " + e.reason, "err");
    post("__halt__", "err");
  });
})();
<\/script>
<script>
try {
${code}
${c.validate}
  parent.postMessage({ __chal: true, txt: "__passed__", kind: "pass" }, "*");
} catch (err) {
  parent.postMessage({ __chal: true, txt: err && err.message ? err.message : String(err), kind: "err" }, "*");
}
<\/script>
</body></html>`;

    stopFrame();
    frame = document.createElement("iframe");
    frame.setAttribute("sandbox", "allow-scripts");
    frame.setAttribute("title", "Executor de testes");
    frame.className = "chal-frame";
    frame.srcdoc = doc;

    window.addEventListener("message", onMessage);
    document.body.appendChild(frame);

    /* Trava contra loop infinito: 5s sem resultado → aborta */
    setTimeout(() => {
      if (!running) return;
      finish("err", "Tempo esgotado (5s). Voce provavelmente tem um loop infinito.");
    }, 5000);
  }

  /* Handler único de mensagens do sandbox */
  function onMessage(e) {
    if (!frame || e.source !== frame.contentWindow) return;
    const d = e.data;
    if (!d || d.__chal !== true) return;

    if (d.kind === "ready") return;

    switch (d.kind) {
      case "err":
        consoleEl().appendChild(line(d.txt === "__halt__" ? "Execucao interrompida." : "✗ " + d.txt, "log-err"));
        consoleEl().scrollTop = consoleEl().scrollHeight;
        setVerdict("falhou — corrija e tente de novo");
        running = false;
        stopFrame();
        break;

      case "warn":
        consoleEl().appendChild(line("! " + d.txt, "log-warn"));
        break;

      case "pass":
        consoleEl().appendChild(line("✓ Todos os testes passaram!", "log-ok"));
        consoleEl().scrollTop = consoleEl().scrollHeight;
        setVerdict("aprovado");
        running = false;
        stopFrame();
        if (current && !Progress.isChallengeDone(current.id)) {
          const ch = current;
          Progress.completeChallenge(ch.id);
          setTimeout(() => { if (current === ch) render(); }, 1000);
        }
        break;

      default:
        consoleEl().appendChild(line("› " + d.txt, ""));
        consoleEl().scrollTop = consoleEl().scrollHeight;
    }
  }

  function finish(kind, text) {
    if (!running) return;
    if (kind === "err") {
      consoleEl().appendChild(line("✗ " + text, "log-err"));
      setVerdict("falhou");
    }
    running = false;
    stopFrame();
  }

  /* Garante que o atalho de teclado so funciona com o modal aberto */
  document.addEventListener("keydown", e => {
    if (!current) return;
    onKey(e);
  });

  return { open, close, isOpen: () => !!current };
})();