/* ═══════════════════════════════════════════════════════
   DevBook — Controle de acesso (trava de conteúdo)
   ═══════════════════════════════════════════════════════

   ⚠️  IMPORTANTE — leia antes de confiar neste arquivo:

   Este é um TRAVAMENTO DE SOFTWARE, não de segurança.

   O conteúdo do curso fica em arquivos .js que o navegador
   baixa. Mesmo com a trava na tela, quem abrir o DevTools
   consegue ler o texto direto no arquivo.

   Serve para: NÃOmalinkar o link, casual, automaticamente.
   NÃO serve para: proteger o material de quem realmente
   quer copiar.

   Para proteção de verdade, o conteúdo não pode estar num
   repositório público. Escolha uma destas opções:

   • Repo privado no GitHub + enviar o link de download
   • Subir o conteúdo na área de membros da Hotmart/Kiwify
     (a plataforma já resolve login, pagamento e entrega)
   • Hospedar o conteúdo em storage privado (S3, Supabase
     com URL assinada) e carregar via fetch autenticado

   COMO CONFIGURAR
   ──────────────
   1. Defina os códigos de acesso em CONFIG.codes
   2. Ative a trava em CONFIG.enabled
*/

const Gate = (() => {
  const STORAGE_KEY = "devbook_access";

  /* ═══════════ CONFIGURAÇÃO ═══════════ */
  const CONFIG = {
    /* ESTE É UM TRANCAMENTO DE SOFTWARE, NÃO SEGURANÇA DE VERDADE.
       O conteúdo viaja em arquivos .js que o navegador baixa: quem abrir
       o DevTools lê o texto mesmo com a tela de bloqueio na frente.
       Use para não deixar o link se espalhar sozinho — não como proteção
       contra quem realmente quer copiar. */
    aviso: "Isto é uma trava de interface, não segurança real.",

    /* Liga a trava. Enquanto false, o curso fica 100% aberto
       (útil enquanto você não tiver os códigos de acesso). */
    enabled: false,

    /* Quantos capítulos ficam liberados sem digitar o código.
       1 = o primeiro capítulo vira a "aula grátis" da landing page. */
    freeChapters: 1,

    /* Seções liberadas sem código: "trilhas" | "projetos" |
       "desafios" | "certificado" */
    freeSections: [],

    /* Códigos de acesso válidos.
       Gere códigos longos e aleatórios — evite "devbook2024". */
    codes: [
      // "COLE-SEUS-CODIGOS-AQUI"
    ],

    /* Mensagem mostrada na tela de bloqueio. */
    message:
      "Use o código de acesso que veio no seu e-mail de compra."
  };

  /* ═══════════ ESTADO ═══════════ */
  let unlocked = false;

  /* Lê o acesso salvo (permite o aluno continuar offline) */
  function init() {
    try {
      unlocked = localStorage.getItem(STORAGE_KEY) === "ok";
    } catch {
      unlocked = false;
    }
    return unlocked;
  }

  function isUnlocked() { return unlocked; }

  /* O curso inteiro está aberto? */
  function isOpen() { return !CONFIG.enabled || unlocked; }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, "ok"); } catch {}
  }

  function clear() {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    unlocked = false;
  }

  /* ═══════════ REGRAS POR ROTA ═══════════ */

  /* Um capítulo específico está liberado? */
  function isChapterFree(chapterId) {
    if (!CONFIG.enabled) return true;
    if (unlocked) return true;

    const idx = CURRICULUM.findIndex(c => c.id === chapterId);
    return idx >= 0 && idx < CONFIG.freeChapters;
  }

  /* Uma seção do curso está liberada? */
  function isSectionFree(sectionId) {
    if (!CONFIG.enabled) return true;
    if (unlocked) return true;
    return CONFIG.freeSections.includes(sectionId);
  }

  /* ═══════════ TELA DE DESBLOQUEIO ═══════════ */
  function isScreenOpen() {
    const el = document.getElementById("gateScreen");
    return el && !el.classList.contains("hidden");
  }

  function closeScreen() {
    const el = document.getElementById("gateScreen");
    if (el) el.classList.add("hidden");
  }

  function render(what) {
    const el = document.getElementById("gateScreen");
    if (!el) return;

    const contexto = what && what.type === "chapter" && what.title
      ? `“${what.title}” faz parte do curso completo.`
      : "Esta parte faz parte do curso completo.";

    el.innerHTML = `
      <div class="gate-box">
        <div class="gate-lock">🔒</div>

        <h2>Conteúdo do curso completo</h2>
        <p class="gate-lead">${contexto}<br>${CONFIG.message}</p>

        <div class="gate-stats">
          <div><strong>${CURRICULUM.length}</strong><span>capítulos</span></div>
          <div><strong>${CHALLENGES.length}</strong><span>desafios com testes</span></div>
          <div><strong>${PROJECTS.length}</strong><span>projetos de portfólio</span></div>
        </div>

        <form class="gate-form" id="gateForm" autocomplete="off">
          <label for="gateInput">Código de acesso</label>
          <div class="gate-input-row">
            <input type="password" id="gateInput" placeholder="Cole o código aqui"
                   autocomplete="off" autocapitalize="off" spellcheck="false"
                   aria-label="Código de acesso">
            <button type="submit" class="btn-primary">Acessar</button>
          </div>
          <div class="gate-msg" id="gateMsg" role="alert"></div>
        </form>

        <div class="gate-actions">
          ${CONFIG.freeChapters > 0
            ? `<button class="gate-link" id="gateFree">Ver a aula grátis (capítulo 1)</button>`
            : ""}
          <a class="gate-link" href="landing.html">Quero me inscrever</a>
        </div>
      </div>`;

    el.classList.remove("hidden");

    const form = document.getElementById("gateForm");
    const input = document.getElementById("gateInput");
    const msg = document.getElementById("gateMsg");

    form.addEventListener("submit", e => {
      e.preventDefault();
      const code = input.value.trim();

      if (!code) {
        msg.textContent = "Digite o código de acesso.";
        msg.className = "gate-msg show error";
        input.focus();
        return;
      }

      if (CONFIG.codes.length === 0) {
        msg.textContent =
          "Nenhum código configurado ainda. Enquanto isso, o curso está aberto para todos.";
        msg.className = "gate-msg show error";
        return;
      }

      if (CONFIG.codes.some(c => c.toLowerCase() === code.toLowerCase())) {
        unlocked = true;
        save();
        msg.textContent = "Acesso liberado!";
        msg.className = "gate-msg show ok";
        toast("🔓 Acesso liberado. Bom estudo!", "success");
        setTimeout(() => {
          closeScreen();
          window.dispatchEvent(new Event("devbook:unlocked"));
        }, 600);
        return;
      }

      msg.textContent = "Código inválido. Confira e tente de novo.";
      msg.className = "gate-msg show error";
      input.select();
      /* treme para dar feedback visual */
      form.classList.remove("shake");
      void form.offsetWidth;
      form.classList.add("shake");
    });

    const freeBtn = document.getElementById("gateFree");
    if (freeBtn) {
      freeBtn.addEventListener("click", () => {
        location.hash = "#/capitulo/" + CURRICULUM[0].id;
      });
    }

    setTimeout(() => input.focus(), 60);
  }

  /* Atalho para sair da tela quando o usuário já tem acesso */
  function release() {
    if (isOpen()) {
      closeScreen();
      return true;
    }
    return false;
  }

  return {
    CONFIG,
    init, isUnlocked, isOpen, clear, save,
    isChapterFree, isSectionFree,
    render, closeScreen, isScreenOpen, release
  };
})();