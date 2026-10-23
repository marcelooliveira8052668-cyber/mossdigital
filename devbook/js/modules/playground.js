/* ═══════════════════════════════════════════════════════
   DevBook — Code Playground
   Editor de código com preview ao vivo e console capturado
   ═══════════════════════════════════════════════════════ */

const Playground = (() => {
  let uidCounter = 0;

  /* Registro de playgrounds ativos + listener global de mensagens.
     e.target em eventos 'message' é a WINDOW, não um Node — por isso
     comparamos e.source com o contentWindow de cada iframe. */
  const instances = new Set();

  window.addEventListener("message", e => {
    if (!e.data || e.data.__pg !== true) return;
    instances.forEach(inst => {
      if (inst.iframe.contentWindow !== e.source) return;
      if (!document.body.contains(inst.wrap)) { instances.delete(inst); return; }
      inst.log(e.data);
    });
  });

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* Decodifica entidades HTML (&lt; → <) para o código-fonte do starter */
  function decodeEntities(s) {
    const t = document.createElement("textarea");
    t.innerHTML = s;
    return t.value;
  }

  /**
   * Cria um playground completo.
   * @param {Object} cfg - { tabs: ["index.html"], starter: "código" }
   * @returns {HTMLElement}
   */
  function create(cfg) {
    const uid = "pg" + (++uidCounter);
    const starterText = decodeEntities(cfg.starter || "");
    const wrap = document.createElement("div");
    wrap.className = "playground";
    wrap.innerHTML = `
      <div class="pg-head">
        <div class="pg-tabs">${(cfg.tabs || ["index.html"]).map((t, i) =>
          `<span class="pg-tab${i === 0 ? " active" : ""}">${escapeHtml(t)}</span>`).join("")}</div>
        <div class="pg-actions">
          <button class="pg-btn run" data-action="run" title="Executar (Ctrl+Enter)">▶ Rodar</button>
          <button class="pg-btn" data-action="reset" title="Restaurar código inicial">↺</button>
          <button class="pg-btn" data-action="copy" title="Copiar código">⧉</button>
        </div>
      </div>
      <div class="pg-body">
        <div class="pg-editor">
          <textarea spellcheck="false" aria-label="Editor de código"></textarea>
        </div>
        <div class="pg-preview">
          <iframe sandbox="allow-scripts allow-modals" title="Pré-visualização"></iframe>
        </div>
        <div class="pg-console" data-console hidden></div>
      </div>`;

    const ta = wrap.querySelector("textarea");
    ta.value = starterText;
    const iframe = wrap.querySelector("iframe");
    const consoleEl = wrap.querySelector("[data-console]");
    const runBtn = wrap.querySelector('[data-action="run"]');

    /* ─── Tab no editor: insere 2 espaços em vez de sair ─── */
    ta.addEventListener("keydown", e => {
      if (e.key === "Tab") {
        e.preventDefault();
        const s = ta.selectionStart, en = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + "  " + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = s + 2;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        run();
      }
    });

    /* ─── Console: injeta hook de captura antes do código do usuário ─── */
    function buildDoc(code) {
      if (!/<!DOCTYPE|<html/i.test(code)) {
        // trecho HTML parcial → embrulha
        code = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:system-ui;padding:16px}</style></head><body>${code}</body></html>`;
      }
      const hook = `<script>
(function(){
  const fmt = a => a.map(v => {
    if (v instanceof Error) return v.message;
    if (typeof v === 'object') { try { return JSON.stringify(v, null, 1); } catch { return String(v); } }
    return String(v);
  }).join(' ');
  const send = (txt, err) => parent.postMessage({ __pg: true, txt, err }, '*');
  console.log = new Proxy(console.log, { apply(t, s, a){ send(fmt(a)); return Reflect.apply(t, s, a); }});
  console.error = new Proxy(console.error, { apply(t, s, a){ send(fmt(a), true); return Reflect.apply(t, s, a); }});
  console.warn = new Proxy(console.warn, { apply(t, s, a){ send(fmt(a)); return Reflect.apply(t, s, a); }});
  window.addEventListener('error', e => send(e.message + ' (linha ' + e.lineno + ')', true));
  window.addEventListener('unhandledrejection', e => send('Promise rejeitada: ' + e.reason, true));
})();
<\/script>`;
      // injeta o hook logo após <head> ou no início
      if (/<head[^>]*>/i.test(code)) return code.replace(/<head[^>]*>/i, m => m + hook);
      if (/<html[^>]*>/i.test(code)) return code.replace(/<html[^>]*>/i, m => m + "<head>" + hook + "</head>");
      return hook + code;
    }

    function run(manual) {
      const code = ta.value;
      consoleEl.innerHTML = "";
      consoleEl.hidden = true;
      iframe.srcdoc = buildDoc(code);
      runBtn.textContent = "✓ Rodado";
      setTimeout(() => (runBtn.textContent = "▶ Rodar"), 900);
      if (manual && !xpAwarded) {
        xpAwarded = true;
        Progress.addXP(2, "experimentou o código");
      }
    }
    let xpAwarded = false;

    /* ─── Console: recebe mensagens do iframe (listener global, ver topo) ─── */
    function logToConsole(data) {
      consoleEl.hidden = false;
      const line = document.createElement("div");
      if (data.err) line.className = "log-err";
      line.textContent = "› " + data.txt;
      consoleEl.appendChild(line);
      consoleEl.scrollTop = consoleEl.scrollHeight;
    }
    instances.add({ wrap, iframe, log: logToConsole });

    /* ─── Botões ─── */
    wrap.querySelector('[data-action="run"]').addEventListener("click", () => run(true));
    wrap.querySelector('[data-action="reset"]').addEventListener("click", () => {
      if (confirm("Restaurar o código inicial?")) {
        ta.value = starterText;
        run(true);
      }
    });
    wrap.querySelector('[data-action="copy"]').addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(ta.value);
        toast("Código copiado!", "success");
      } catch { toast("Não foi possível copiar.", "danger"); }
    });

    // primeira execução automática
    setTimeout(run, 60);

    return wrap;
  }

  return { create };
})();
