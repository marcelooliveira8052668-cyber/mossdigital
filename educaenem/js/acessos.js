/* =============================================================================
   EducaEnem — PLANO GRÁTIS + COMPRA (cota mensal)
   -----------------------------------------------------------------------------
   Modelo do site:
     • Todo estudante pode criar uma CONTA GRÁTIS e estudar com uma cota
       mensal (X questões e Y aulas por mês).
     • Quem quiser estudar sem limite compra o CURSO, uma ÁREA ou uma
       DISCIPLINA na loja (curso.html) — e o acesso é liberado na hora.

   Regras (fáceis de trocar):  js/config.js → plano.gratis
   Compras registradas na loja: js/loja.js  (Loja.pedidos)

   Este arquivo não quebra o site se faltar: tudo é verificado antes de usar.
   ============================================================================= */
window.Acessos = (function () {
  "use strict";

  const CFG = (window.EDUCA_CONFIG && window.EDUCA_CONFIG.plano) || {};
  // Planos ilimitados -- tudo gratuito, sem cotas
  const GRATIS = Object.assign({ ativo: true, cotas: { questoes: 999999, aulas: 999999 } }, CFG.gratis || {});
  const MSG = Object.assign(
    {
      titulo: "Plano grátis ativo",
      corpo:
        "Você está no plano gratuito com acesso ilimitado a todos os conteúdos. Sem limite de questões ou aulas por mês.",
      cta: "Continuar estudando",
      semConta: "Acesse o curso grátis",
    },
    CFG.mensagens || {}
  );
  const LS = "educaenem_cota_v1";

  /* ---------------- utilidades ---------------- */
  function usuario() {
    try {
      return typeof Store !== "undefined" ? Store.usuarioAtual() : null;
    } catch (e) {
      return null;
    }
  }

  function mesAtual() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
  }

  function carregarTudo() {
    try {
      return JSON.parse(localStorage.getItem(LS) || "{}");
    } catch (e) {
      return {};
    }
  }

  function gravarTudo(tudo) {
    try {
      localStorage.setItem(LS, JSON.stringify(tudo));
    } catch (e) {
      /* armazenamento cheio: não derruba o site */
    }
  }

  /* Registro do mês para o aluno atual (muda sozinho quando vira o mês). */
  function registro() {
    const u = usuario();
    const tudo = carregarTudo();
    const chave = (u ? u.id : "convidado") + "|" + mesAtual();
    if (!tudo[chave] || typeof tudo[chave] !== "object") tudo[chave] = { questao: {}, aula: {} };
    if (!tudo[chave].questao) tudo[chave].questao = {};
    if (!tudo[chave].aula) tudo[chave].aula = {};
    return tudo[chave];
  }

  function limite(tipo) {
    // O config.js usa o plural (aulas/questoes); o código usa o singular.
    // Aceita as duas grafias para nunca zerar a cota por engano.
    return Number(GRATIS.cotas && GRATIS.cotas[chaveConfig(tipo)]) || 0;
  }

  /* Gravação: usamos "aula"/"questao". Leitura: aceita as duas. */
  function chaveCota(tipo) {
    if (tipo === "aulas") return "aula";
    if (tipo === "questoes") return "questao";
    return tipo;
  }

  function chaveConfig(tipo) {
    if (tipo === "aula") return "aulas";
    if (tipo === "questao") return "questoes";
    return tipo;
  }

  function totalUsado(reg, tipo) {
    const mapa = (reg && reg[chaveCota(tipo)]) || {};
    return Object.keys(mapa).reduce((s, k) => s + (Number(mapa[k]) || 0), 0);
  }

  /* ---------------- pedidos (compras feitas neste navegador) ---------------- */
  const STATUS_PAGOS = ["pagamento informado", "pago", "confirmado", "ativo", "liberado"];

  function lerPedidos() {
    try {
      if (window.Loja && typeof Loja.pedidos === "function") return Loja.pedidos() || [];
      // Páginas que não carregam a loja (ex.: index.html) leem o mesmo
      // armazenamento que a loja usa — assim a compra vale em todo o site.
      return JSON.parse(localStorage.getItem("educaenem_pedidos_v1") || "[]") || [];
    } catch (e) {
      return [];
    }
  }

  function ehPago(p) {
    return !!p && STATUS_PAGOS.indexOf(String(p.status || "").toLowerCase()) >= 0;
  }

  /** Todos os itens já pagos (curso, área, disciplina ou aula avulsa). */
  function itensPagos() {
    return lerPedidos()
      .filter(ehPago)
      .reduce((lista, p) => lista.concat(Array.isArray(p.itens) ? p.itens : []), []);
  }

  /* ---------------- assinatura (professor / comprou o curso completo) ------- */
  function assinante() {
    const u = usuario();
    if (!u) return false;
    if (u.papel === "professor") return true;
    if (!GRATIS.ativo) return true; // cota desligada no config.js
    // Só quem comprou o CURSO COMPLETO tem acesso total e ilimitado.
    return itensPagos().some((i) => i && i.tipo === "curso");
  }

  /**
   * O aluno comprou este conteúdo específico? (disciplina, área da disciplina
   * ou a própria aula/conteúdo). ctx = { id, disciplina }
   */
  function liberadoConteudo(ctx) {
    if (!ctx) return false;
    const itens = itensPagos();
    if (!itens.length) return false;

    // comprou esta aula/conteúdo exato
    if (ctx.id && itens.some((i) => i && i.tipo === "aula" && String(i.id) === String(ctx.id))) return true;

    if (!ctx.disciplina) return false;

    // comprou a disciplina inteira
    if (itens.some((i) => i && i.tipo === "disciplina" && i.id === ctx.disciplina)) return true;

    // comprou o pacote da área a qual a disciplina pertence
    const areasCompradas = itens.filter((i) => i && i.tipo === "area").map((i) => i.id);
    if (areasCompradas.length) {
      const d = (window.DISCIPLINAS || []).find((x) => x.id === ctx.disciplina);
      if (d && areasCompradas.indexOf(d.area) >= 0) return true;
    }
    return false;
  }

  /* ---------------- consumo da cota ---------------- */
  /**
   * Consome créditos. Usa uma "chave" para que abrir duas vezes o mesmo
   * conteúdo (ou refazer a mesma atividade) no mês não cobre de novo.
   * @returns true se pode usar; false se acabou a cota (e mostra o aviso).
   */
  function usar(tipo, chave, custo, ctx) {
    if (!GRATIS.ativo) return true;
    if (assinante()) return true;

    const u = usuario();
    if (!u) {
      mostrarPaywall({ semConta: true, ctx: ctx });
      return false;
    }

    const reg = registro();
    const mapa = reg[chaveCota(tipo)] || (reg[chaveCota(tipo)] = {});
    const valor = Number(custo) || 1;

    if (mapa[chave] != null) return true; // já pago neste mês

    if (totalUsado(reg, tipo) + valor > limite(tipo)) {
      mostrarPaywall({ tipo: tipo, ctx: ctx });
      return false;
    }

    mapa[chave] = valor;
    gravarTudo(carregarTudoAtualizado(reg));
    avisar(tipo);
    return true;
  }

  /* Grava o registro de volta no armazenamento */
  function carregarTudoAtualizado(reg) {
    const tudo = carregarTudo();
    tudo[(usuario() ? usuario().id : "convidado") + "|" + mesAtual()] = reg;
    return tudo;
  }

  function usarQuestoes(qtd, chave, ctx) {
    return usar("questao", chave || "q:" + Date.now(), qtd || 1, ctx);
  }

  function usarAula(chave) {
    return usar("aula", chave || "a:" + Date.now(), 1);
  }

  function restante(tipo) {
    if (!GRATIS.ativo) return Infinity;
    if (assinante()) return Infinity;
    const reg = registro();
    return Math.max(0, limite(tipo) - totalUsado(reg, tipo));
  }

  /* ---------------- telas ---------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[c]);
  }

  function precoCurso() {
    const p = (window.EDUCA_CONFIG && window.EDUCA_CONFIG.precos) || {};
    return Number(p.curso) || 0;
  }

  function brl(v) {
    return "R$ " + Number(v || 0).toFixed(2).replace(".", ",");
  }

  function precoDe(chave) {
    const p = (window.EDUCA_CONFIG && window.EDUCA_CONFIG.precos) || {};
    return Number(p[chave]) || 0;
  }

  function linkLoja(params) {
    const partes = [];
    Object.keys(params || {}).forEach((k) => {
      if (params[k]) partes.push(encodeURIComponent(k) + "=" + encodeURIComponent(params[k]));
    });
    return "curso.html" + (partes.length ? "?" + partes.join("&") : "");
  }

  /* Monta as opções de compra da tela bloqueada: dá para levar SÓ a aula,
     a disciplina inteira ou o curso completo — tudo em 1 clique. */
  function opcoesCompra(ctx) {
    const cfg = (window.EDUCA_CONFIG && window.EDUCA_CONFIG.precos) || {};
    const opcoes = [];

    if (ctx && ctx.id) {
      opcoes.push({
        icone: "🎬",
        rotulo: ctx.titulo || "Só esta aula",
        detalhe: brl(precoDe("aula")) + " · compre apenas este conteúdo",
        href: linkLoja({
          item: "aula:" + ctx.id,
          nome: ctx.titulo || "Aula avulsa",
          disc: ctx.disciplina || "",
        }),
      });
    }

    if (ctx && ctx.disciplina) {
      opcoes.push({
        icone: "📘",
        rotulo: "Disciplina inteira",
        detalhe: brl(precoDe("disciplina")) + " · todo o conteúdo da matéria",
        href: linkLoja({ item: "disciplina:" + ctx.disciplina }),
      });
    }

    opcoes.push({
      icone: "🎓",
      rotulo: "Curso completo",
      detalhe: brl(precoDe("curso")) + " · todas as disciplinas, sem limite",
      href: linkLoja({ item: "curso:enem-2026" }),
      destaque: true,
    });
    return opcoes;
  }

  function htmlOpcoesCompra(ctx) {
    const opcoes = opcoesCompra(ctx);
    if (!opcoes.length) return "";
    return (
      '<div class="grade" style="max-width:760px;margin:1rem auto 0;gap:.75rem">' +
      opcoes
        .map(
          (o) =>
            '<div class="cartao cartao-compacto" style="text-align:left' +
            (o.destaque ? ";border:1px solid var(--accent)" : "") +
            '">' +
            '<div class="stat"><div class="stat-icone">' +
            o.icone +
            "</div><div>" +
            '<div class="stat-rotulo">' +
            esc(o.rotulo) +
            "</div>" +
            '<div class="stat-valor" style="font-size:1.05rem">' +
            esc(o.detalhe) +
            "</div>" +
            '<a class="btn ' +
            (o.destaque ? "btn-accent" : "btn-primario") +
            ' btn-pequeno" style="margin-top:.6rem" href="' +
            o.href +
            '">Comprar agora</a>' +
            "</div></div></div>"
        )
        .join("") +
      "</div>"
    );
  }

  function paywallHTML(opcoes) {
    const o = opcoes || {};
    const semConta = !!o.semConta;
    const restamAulas = restante("aula");
    const restamQuestoes = restante("questao");
    const ctx = o.ctx || null;

    let corpo;
    if (semConta) {
      corpo = MSG.semConta;
    } else {
      corpo =
        "Você usou <strong>" +
        limite("aulas") +
        "</strong> aulas e <strong>" +
        limite("questoes") +
        "</strong> questões do seu plano grátis neste mês (reinicia todo dia 1).";
    }

    return (
      '<div class="cartao" style="text-align:center;padding:2rem 1.5rem">' +
      '<div style="font-size:3rem;line-height:1">🔒</div>' +
      '<h2 style="margin:0.75rem 0 0.5rem">' +
      esc(semConta ? "Crie sua conta grátis" : MSG.titulo) +
      "</h2>" +
      '<p class="texto-pequeno" style="max-width:560px;margin:0 auto 1rem">' +
      corpo +
      "</p>" +
      (ctx && ctx.titulo
        ? '<p class="texto-pequeno" style="margin:-.5rem auto 0"><strong>' + esc(ctx.titulo) + "</strong></p>"
        : "") +
      htmlOpcoesCompra(ctx) +
      '<p class="texto-pequeno" style="margin:1.25rem auto 0;max-width:560px">' +
      "Ou continue de graça: <strong>" +
      limpeza(limite("questoes")) +
      " questões · " +
      limpeza(limite("aulas")) +
      " aulas</strong> por mês no plano grátis.</p>" +
      '<div class="hero-acoes" style="justify-content:center;margin-top:1rem">' +
      '<a class="btn btn-accent btn-grande" href="' + (semConta ? "#/entrar/cadastrar" : "curso.html") + '">' +
      esc(semConta ? "Criar conta grátis" : MSG.cta) +
      "</a>" +
      (semConta
        ? '<a class="btn btn-secundario" href="curso.html">Ver planos e preços</a>'
        : '<a class="btn btn-secundario" href="#/painel">Voltar ao painel</a>') +
      "</div>" +
      (semConta
        ? ""
        : '<p class="texto-pequeno" style="margin-top:1rem">Restam no seu plano grátis: ' +
          (restamAulas === Infinity ? "∞" : restamAulas) +
          " aulas e " +
          (restamQuestoes === Infinity ? "∞" : restamQuestoes) +
          " questões.</p>") +
      "</div>"
    );
  }

  function limpeza(n) {
    return Number(n) || 0;
  }

  /* Aviso discreto quando o aluno usa créditos */
  function avisar(tipo) {
    const r = restante(tipo);
    if (r === Infinity) return;
    const rotulo = chaveCota(tipo) === "questao" ? "questões" : "aulas";
    try {
      if (typeof window.toast === "function") {
        window.toast("Plano grátis: " + r + " " + rotulo + " restantes neste mês.", "sucesso");
      }
    } catch (e) {}
  }

  /* Bloqueio em tela cheia (usado quando acaba a cota ao responder) */
  function mostrarPaywall(opcoes) {
    const o = opcoes || {};
    try {
      const antigo = document.getElementById("paywall-gratis");
      if (antigo) antigo.remove();
      const div = document.createElement("div");
      div.id = "paywall-gratis";
      div.style.cssText =
        "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;" +
        "background:rgba(0,0,0,.75);backdrop-filter:blur(4px);padding:1rem";
      div.innerHTML =
        '<div style="max-width:760px;width:100%;max-height:90vh;overflow:auto">' +
        paywallHTML({ semConta: !!o.semConta, ctx: o.ctx }) +
        "</div>";
      div.addEventListener("click", (e) => {
        if (e.target === div) div.remove();
      });
      document.body.appendChild(div);
    } catch (e) {
      /* sem DOM: só segue */
    }
  }

  /* ---------------- bloqueio de rota (chamado pelo app.js) ---------------- */
  function rotasPagas() {
    return Array.isArray(GRATIS.rotasPagas) ? GRATIS.rotasPagas : [];
  }

  /**
   * Devolve o HTML do bloqueio se a rota exigir plano pago e o aluno não
   * puder usar. Devolve "" (liberado) caso contrário.
   * ctx = { id, disciplina, titulo } — o que o aluno tentou abrir (app.js).
   */
  function bloquearRota(seg, ctx) {
    if (!GRATIS.ativo) return "";
    if (rotasPagas().indexOf(seg) < 0) return "";

    if (assinante()) return ""; // professor ou curso completo
    if (liberadoConteudo(ctx)) return ""; // comprou esta disciplina/aula

    const u = usuario();
    if (!u) return paywallHTML({ semConta: true, ctx: ctx });

    if (restante("aula") <= 0) return paywallHTML({ ctx: ctx });

    /* Consome 1 crédito por conteúdo aberto. A chave usa a rota completa,
       então reabrir a mesma aula (ou a tela se redesenhar) não cobra de novo. */
    const chave = seg + ":" + (window.location ? window.location.hash : seg);
    if (!usar("aula", chave, 1)) return paywallHTML({ ctx: ctx });
    return "";
  }

  /* ---------------- cartão para o painel do aluno ---------------- */
  function resumoHTML() {
    const u = usuario();
    if (!u) return "";
    if (assinante()) {
      return (
        '<div class="cartao cartao-compacto" style="border-left:2px solid var(--accent)">' +
        '<div class="stat"><div class="stat-icone">🎓</div><div>' +
        '<div class="stat-rotulo">Seu acesso</div>' +
        '<div class="stat-valor">Curso completo ativo</div>' +
        '<p class="texto-pequeno" style="margin:0.25rem 0 0">Estude sem limite em todas as disciplinas.</p>' +
        "</div></div></div>"
      );
    }
    if (!GRATIS.ativo) return "";
    const a = restante("aula");
    const q = restante("questao");
    return (
      '<div class="cartao cartao-compacto">' +
      '<div class="stat"><div class="stat-icone">🎁</div><div style="flex:1">' +
      '<div class="stat-rotulo">Plano grátis · renova dia 1</div>' +
      '<div class="stat-valor">' + a + " aulas · " + q + " questões</div>" +
      '<p class="texto-pequeno" style="margin:.25rem 0 .6rem">Por ' +
      brl(precoCurso()) +
      " você estuda sem limite em todas as disciplinas.</p>" +
      '<div class="linha" style="gap:.5rem;flex-wrap:wrap">' +
      '<a class="btn btn-accent btn-pequeno" href="' +
      linkLoja({ item: "curso:enem-2026" }) +
      '">🎓 Comprar curso</a>' +
      '<a class="btn btn-secundario btn-pequeno" href="curso.html">Ver planos</a>' +
      "</div></div></div></div>"
    );
  }

  function info() {
    const u = usuario();
    return {
      usuario: u ? u.login : null,
      assinante: assinante(),
      mes: mesAtual(),
      aulas: { limite: limite("aulas"), usadas: totalUsado(registro(), "aulas"), restam: restante("aula") },
      questoes: { limite: limite("questoes"), usadas: totalUsado(registro(), "questoes"), restam: restante("questao") },
    };
  }

  return {
    assinante: assinante,
    restante: restante,
    usar: usar,
    usarQuestoes: usarQuestoes,
    usarAula: usarAula,
    bloquearRota: bloquearRota,
    paywallHTML: paywallHTML,
    mostrarPaywall: mostrarPaywall,
    resumoHTML: resumoHTML,
    info: info,
  };
})();
