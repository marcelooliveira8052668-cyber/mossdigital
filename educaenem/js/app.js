/* =============================================================================
   EducaEnem 2026 — Aplicação (SPA)
   Perfis: aluno e professor · Aulas ao vivo (Zoom/Meet) · Correção de
   atividades e provas · Gestão de notas e médias · Professor Virtual
   ============================================================================= */
(() => {
  "use strict";

  /* ---------------------------------------------------------------------------
     CONFIGURAÇÃO DA ESCOLA (vem de js/config.js)
     Troque o nome, o ano, o professor ou os preços lá — e o site inteiro
     acompanha, sem precisar mexer em HTML.
     --------------------------------------------------------------------------- */
  const CFG = window.EDUCA_CONFIG || {};
  const LOJA = CFG.escola || {};
  const PRECOS = CFG.precos || {};

  function nomeEscola() {
    const n = String(LOJA.nome || "EducaEnem");
    return n;
  }

  /** "R$ 597" · "R$ 49,90" */
  function dinheiro(v) {
    const n = Number(v);
    if (isNaN(n)) return "—";
    const casas = Math.round(n * 100) % 100 === 0 ? 0 : 2;
    return (
      "R$ " +
      n.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas })
    );
  }

  /** Rótulo da cota do plano grátis — vem de js/config.js → plano.gratis.cotas. */
  function rotuloCotasGratis() {
    const c = (CFG.plano && CFG.plano.gratis && CFG.plano.gratis.cotas) || {};
    const q = Number(c.questoes) || 0;
    const a = Number(c.aulas) || 0;
    if (q >= 99999 && a >= 99999) return "Ilimitado (plano grátis)";
    return (Number(c.aulas) || 0) + " aulas e " + (Number(c.questoes) || 0) + " questões por mês";
  }

  /** Preenche os elementos marcados com data-cfg-preco / data-cfg-texto. */
  function aplicarConfig() {
    const areas = PRECOS.porArea || {};
    const valoresArea = Object.keys(areas).map((k) => Number(areas[k])).filter((v) => !isNaN(v));

    document.querySelectorAll("[data-cfg-preco]").forEach((el) => {
      const qual = el.getAttribute("data-cfg-preco");
      if (qual === "curso") el.textContent = dinheiro(PRECOS.curso === 0 ? 0 : PRECOS.curso);
      else if (qual === "disciplina") el.textContent = dinheiro(PRECOS.disciplina);
      else if (qual === "area-minina") el.textContent =
        "a partir de " + dinheiro(valoresArea.length ? Math.min.apply(null, valoresArea) : 0);
    });

    document.querySelectorAll("[data-cfg-texto]").forEach((el) => {
      const qual = el.getAttribute("data-cfg-texto");
      if (qual === "professor") el.textContent = "Prof. " + (LOJA.professor || "");
      else if (qual === "escola") el.textContent = nomeEscola();
      else if (qual === "ano") el.textContent = LOJA.ano || "";
      else if (qual === "cotas-gratis") el.textContent = rotuloCotasGratis();
      else if (qual === "preco-curso") el.textContent = dinheiro(PRECOS.curso);
    });

    document.querySelectorAll("[data-cfg-link]").forEach((el) => {
      const qual = el.getAttribute("data-cfg-link");
      if (qual === "whatsapp") {
        const fone = String(LOJA.whatsapp || "").replace(/\D/g, "");
        if (fone) el.href = "https://wa.me/" + fone;
      } else if (qual === "email") {
        if (LOJA.email) el.href = "mailto:" + LOJA.email;
      }
    });

    // Título da aba do navegador (só nesta página — app.js roda no index).
    document.title =
      nomeEscola() +
      " " +
      (LOJA.ano || "") +
      " — Curso Online do Prof. " +
      (LOJA.professor || "");
  }

  /* ======================= HELPERS ======================= */
  const $app = document.getElementById("app");
  const $landing = document.getElementById("landing");
  const $login = document.getElementById("login");

  /* ---------------------------------------------------------------------------
     PONTE DE DADOS (js/db.js)
     Todas as gravações do sistema passam por aqui. Se a ponte não estiver
     carregada, caímos no Store direto — o site nunca para de funcionar.
     --------------------------------------------------------------------------- */
  const DB = window.DB || {
    entrar: (l, s) => Promise.resolve(Store.entrar(l, s)),
    sair: () => Store.sair(),
    criarUsuario: (d) => Store.criarUsuario(d),
    atualizarUsuario: (i, p) => Store.atualizarUsuario(i, p),
    removerUsuario: (i) => Store.removerUsuario(i),
    salvarNota: (n) => Store.salvarNota(n),
    removerNota: (i) => Store.removerNota(i),
    salvarSubmissao: (s) => Store.salvarSubmissao(s),
    atualizarSubmissao: (i, p) => Store.atualizarSubmissao(i, p),
    salvarProva: (p) => Store.salvarProva(p),
    removerProva: (i) => Store.removerProva(i),
    salvarTextoExtra: (t) => Store.salvarTextoExtra(t),
    removerTextoExtra: (i) => Store.removerTextoExtra(i),
    salvarAula: (a) => Store.salvarAula(a),
    removerAula: (i) => Store.removerAula(i),
    info: () => ({ modo: "local" }),
  };

  /* usuário dono do shell atual (pode ser visitante, sem conta) */
  let usuarioShell = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[c]);
  }

  function fmtData(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d)) return "—";
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function fmtHora(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }

  /* segundos -> "1:05:09" ou "5:09" */
  function fmtTempo(seg) {
    const s = Math.max(0, Math.floor(Number(seg) || 0));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    const pad = (n) => (n < 10 ? "0" + n : "" + n);
    return h > 0 ? h + ":" + pad(m) + ":" + pad(r) : pad(m) + ":" + pad(r);
  }

  /* bytes -> "3,2 MB" */
  function fmtTamanho(b) {
    const n = Number(b) || 0;
    if (n < 1024) return n + " B";
    if (n < 1024 * 1024) return (n / 1024).toFixed(0) + " KB";
    return (n / (1024 * 1024)).toFixed(1).replace(".", ",") + " MB";
  }

  function fmtNota(n) {
    if (n === null || n === undefined || n === "") return "—";
    return Number(n).toFixed(1);
  }

  function iniciais(nome) {
    return String(nome || "?")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase();
  }

  function normalizar(t) {
    return String(t || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function hojeISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function statusAula(aula) {
    if (aula.status === "encerrada") return "encerrada";
    const agora = Date.now();
    const inicio = new Date(aula.dataISO).getTime();
    const fim = inicio + (aula.duracao || 60) * 60000;
    if (agora >= inicio && agora <= fim) return "ao-vivo";
    if (agora > fim) return "encerrada";
    return "agendada";
  }

  /* ======================= AGREGAÇÃO DE DADOS ======================= */
  function unir(arr) {
    return typeof arr !== "undefined" && Array.isArray(arr) ? arr : [];
  }

  function dedupPorId(lista) {
    const vistos = {};
    const out = [];
    lista.forEach((item) => {
      if (!item || !item.id) return;
      if (vistos[item.id]) return;
      vistos[item.id] = 1;
      out.push(item);
    });
    return out;
  }

  function todosTextos() {
    return dedupPorId(
      [].concat(
        unir(window.TEXTOS_MAT),
        unir(window.TEXTOS_LING),
        unir(window.TEXTOS_IDIOMAS),
        unir(window.TEXTOS_HIST),
        unir(window.TEXTOS_HG),
        unir(window.TEXTOS_HB),
        unir(window.TEXTOS_HUM),
        unir(window.TEXTOS_GEO),
        unir(window.TEXTOS_SOC),
        unir(window.TEXTOS_FIL),
        unir(window.TEXTOS_LIT),
        unir(window.TEXTOS_NAT),
        unir(window.TEXTOS_BIO),
        unir(window.TEXTOS_FIS),
        unir(window.TEXTOS_QUI),
        unir(Store.textosExtra())
      )
    );
  }

  function getTexto(id) {
    return todosTextos().find((t) => t.id === id) || null;
  }

  function todasAtividades() {
    return dedupPorId(
      [].concat(
        unir(window.ATIVIDADES),
        unir(window.ATIVIDADES_NATUREZA),
        unir(window.ATIVIDADES_MATEMATICA),
        unir(window.ATIVIDADES_LINGUAGENS),
        unir(window.ATIVIDADES_LITERATURA)
      )
    );
  }

  function todasAulas() {
    return unir(window.AULAS_ONLINE)
      .concat(unir(Store.aulasExtra()))
      .sort((a, b) => String(a.dataISO).localeCompare(String(b.dataISO)));
  }

  function getAula(id) {
    return todasAulas().find((a) => a.id === id) || null;
  }

  /* ==========================================================================
     PROGRESSO DO ALUNO
     Começa ZERADO. Só sobe quando o próprio aluno faz: lê um texto, responde
     uma atividade, corrige questões de vestibular. O professor NÃO lança isto.
     ========================================================================== */
  function progressoDoAluno(alunoId) {
    const res = Store.progressoResumo ? Store.progressoResumo(alunoId) : null;

    const totalTextos = todosTextos().length;
    const totalAtividades = todasAtividades().length;
    const totalVestibulares = (window.VESTIBULARES || []).length;
    const total = totalTextos + totalAtividades + totalVestibulares || 1;

    const textos = res ? res.textos : 0;
    const atividades = res ? res.atividades : 0;
    const vestibulares = res ? res.vestibulares : 0;
    const concluidos = textos + atividades + vestibulares;

    return {
      concluidos: concluidos,
      textos: textos,
      totalTextos: totalTextos,
      atividades: atividades,
      totalAtividades: totalAtividades,
      vestibulares: vestibulares,
      totalVestibulares: totalVestibulares,
      pct: Math.min(100, Math.round((concluidos / total) * 100)),
      ultimo: res ? res.ultimo : null,
    };
  }

  function discNome(id) {
    const d = unir(window.DISCIPLINAS).find((x) => x.id === id);
    return d ? d.nome : id;
  }

  function discEmoji(id) {
    const d = unir(window.DISCIPLINAS).find((x) => x.id === id);
    return d ? d.emoji : "📘";
  }

  /* Contexto do conteúdo que o aluno tentou abrir — usado pelo plano grátis
     (js/acessos.js) para liberar o que ele já comprou e para oferecer
     "compre só esta aula" na tela de bloqueio. */
  function contextoConteudo(seg, param) {
    const ctx = { id: null, disciplina: null, titulo: null };
    try {
      let alvo = null;
      if (seg === "texto") alvo = getTexto(param);
      else if (seg === "aula") alvo = getAula(param);
      else if (seg === "atividade") alvo = todasAtividades().find((x) => x.id === param);
      else if (seg === "projeto") alvo = unir(window.PROJETOS).find((x) => x.id === param);

      if (alvo) {
        ctx.id = param;
        ctx.disciplina = alvo.disciplina || alvo.area || null;
        ctx.titulo = alvo.titulo || null;
      } else if (seg === "simulado") {
        ctx.titulo = "Simulado do ENEM";
      }
    } catch (e) {
      /* conteúdo indisponível: a tela de bloqueio mostra as opções gerais */
    }
    return ctx;
  }

  /* ======================= TOAST ======================= */
  function toast(msg, tipo) {
    const area = document.getElementById("toast-area");
    if (!area) return alert(msg);
    const t = document.createElement("div");    t.className = "toast " + (tipo || "");
    t.innerHTML =
      '<div class="t-msg"><strong>' +
      (tipo === "erro" ? "Atenção" : tipo === "sucesso" ? "Pronto" : "Aviso") +
      "</strong><span>" +
      esc(msg) +
      "</span></div>";
    area.appendChild(t);
    setTimeout(() => {
      t.style.opacity = "0";
      setTimeout(() => t.remove(), 300);
    }, 3800);
  }
  window.toast = toast; // usado pelo js/db.js para avisar falhas de sincronia

  /* ======================= MOTOR DE CORREÇÃO ======================= */
  // questoes: [{enunciado, alternativas[], correta, comentario}]
  // respostas: array de índices (ou null) na mesma ordem
  function corrigir(questoes, respostas) {
    let acertos = 0;
    const detalhe = questoes.map((q, i) => {
      const r = respostas[i];
      const ok = Number(r) === Number(q.correta);
      if (ok) acertos++;
      return {
        ok: ok,
        escolhida: r === undefined || r === null ? null : Number(r),
        correta: Number(q.correta),
        comentario: q.comentario || "",
      };
    });
    const total = questoes.length;
    const nota = total ? Math.round((acertos / total) * 100) / 10 : 0;
    return { acertos: acertos, total: total, nota: nota, detalhe: detalhe };
  }

  // Salva a submissão e lança a nota correspondente no boletim
  function enviarRespostas(opcoes) {
    const user = Store.usuarioAtual();
    if (!user) return null;
    // ---------- PLANO GRÁTIS: desconta as questões da cota mensal ----------
    // A mesma atividade refeita no mesmo mês não cobra de novo (chave).
    // Se acabou o saldo, Acessos abre a tela de upgrade e devolvemos null
    // (o chamador já trata isso: ele só continua se retornar um resultado).
    if (
      window.Acessos &&
      !Acessos.usarQuestoes(
        opcoes.questoes.length,
        opcoes.tipo + ":" + (opcoes.refId || "geral"),
        { id: opcoes.refId || null, disciplina: opcoes.disciplina || null, titulo: opcoes.titulo || null }
      )
    )
      return null;
    const res = corrigir(opcoes.questoes, opcoes.respostas);
    const sub = DB.salvarSubmissao({
      alunoId: user.id,
      alunoNome: user.nome,
      tipo: opcoes.tipo, // 'texto' | 'atividade' | 'prova'
      refId: opcoes.refId,
      titulo: opcoes.titulo,
      disciplina: opcoes.disciplina,
      trimestre: opcoes.trimestre || 1,
      respostas: opcoes.respostas,
      acertos: res.acertos,
      total: res.total,
      nota: res.nota,
      corrigido: true,
    });
    if (opcoes.lancarNota !== false) {
      DB.salvarNota({
        alunoId: user.id,
        disciplina: opcoes.disciplina,
        trimestre: opcoes.trimestre || 1,
        tipo: opcoes.tipo === "prova" ? "prova" : "atividade",
        valor: res.nota,
        descricao: (opcoes.tipo === "prova" ? "Prova: " : "Atividade: ") + opcoes.titulo,
      });
    }

    // ---------- PROGRESSO DO ALUNO ----------
    // Só sobe quando o ALUNO faz (nunca pelo professor). Refazer não conta 2x.
    Store.registrarProgresso(
      opcoes.tipo === "prova"
        ? "simulado"
        : opcoes.tipo === "texto"
          ? "texto"
          : "atividade",
      opcoes.refId || opcoes.titulo || "geral",
      { acertos: res.acertos, total: res.total, titulo: opcoes.titulo }
    );

    return { sub: sub, resultado: res };
  }

  /* ======================= LAYOUT DO APP ======================= */
  function menuAluno() {
    const itens = [
      { rot: "/painel", icone: "🏠", nome: "Painel" },
      { rot: "/disciplinas", icone: "📚", nome: "Disciplinas" },
      { rot: "/aulas", icone: "🎥", nome: "Aulas ao vivo" },
      { rot: "/gravacoes", icone: "🎬", nome: "Gravações" },
      { rot: "/estudio", icone: "🎥", nome: "Estúdio de gravação" },
      { rot: "/textos", icone: "📄", nome: "Textos de apoio" },
      { rot: "/atividades", icone: "✏️", nome: "Atividades" },
      { rot: "/projetos", icone: "🧩", nome: "Projetos trimestrais" },
      { rot: "/simulado", icone: "🧠", nome: "Simulado" },
      { rot: "/scanner", icone: "📱", nome: "Scanner de Documentos" },
      { rot: "/vestibulares", icone: "🎓", nome: "Vestibulares" },
      { rot: "/boletim", icone: "📊", nome: "Boletim" },
      { rot: "/perfil", icone: "👤", nome: "Meu perfil" },
    ];

    // Compra fácil: fica logo no topo para quem ainda não comprou o curso.
    const jaComprou =
      window.Acessos && typeof Acessos.assinante === "function" && Acessos.assinante();
    if (!jaComprou) itens.splice(1, 0, { href: "curso.html", icone: "🛒", nome: "Comprar curso" });
    return itens;
  }

  function menuProfessor() {
    return [
      { rot: "/painel", icone: "🏠", nome: "Painel" },
      { rot: "/estudio", icone: "🎬", nome: "Estúdio de gravação" },
      { rot: "/gravacoes", icone: "📺", nome: "Gravações" },
      { rot: "/prof/alunos", icone: "👥", nome: "Alunos" },
      { rot: "/prof/notas", icone: "📊", nome: "Notas e médias" },
      { rot: "/prof/correcoes", icone: "✅", nome: "Corrigir atividades" },
      { rot: "/prof/provas", icone: "📝", nome: "Provas" },
      { rot: "/projetos", icone: "🧩", nome: "Projetos trimestrais" },
      { rot: "/prof/textos", icone: "📄", nome: "Textos de apoio" },
      { rot: "/prof/aulas", icone: "🎥", nome: "Gerir aulas" },
      { rot: "/aulas", icone: "📅", nome: "Agenda de aulas" },
      { rot: "/prof/sistema", icone: "🗄️", nome: "Banco de dados" },
      { rot: "/perfil", icone: "👤", nome: "Meu perfil" },
    ];
  }

  function menuVisitante() {
    return [
      { rot: "/vestibulares", icone: "🎓", nome: "Vestibulares" },
      { rot: "/gravacoes", icone: "🎬", nome: "Aulas gravadas" },
      { rot: "/aulas", icone: "🎥", nome: "Aulas ao vivo" },
      { rot: "/disciplinas", icone: "📚", nome: "Disciplinas" },
    ];
  }

  function montarApp(user, rota) {
    const isProf = user.papel === "professor";
    const isVisitante = user.papel === "visitante";
    const itens = isProf
      ? menuProfessor()
      : isVisitante
        ? menuVisitante()
        : menuAluno();
    const atual = "/" + (rota.split("/")[1] || "painel");

    $app.innerHTML =
      '<aside class="sidebar" id="sidebar">' +
      '<div class="marca"><span class="logo">EN</span><div><strong>' +
      nomeEscola() +
      "</strong><span>" +
      (LOJA.ano || "2026") +
      '</span></div></div>' +
      '<div class="menu-titulo">' +
      (isProf ? "Área do professor" : isVisitante ? "Visita pública" : "Minha área") +
      "</div>" +
      '<nav class="menu">' +
      itens
        .map(
          (i) =>
            '<a href="' +
            (i.href || "#" + i.rot) +
            '" class="' +
            (atual === i.rot ? "ativo" : "") +
            '"><span class="icone">' +
            i.icone +
            '</span>' +
            i.nome +
            "</a>"
        )
        .join("") +
      "</nav>" +
      '<div style="margin-top:auto;padding-top:1rem;border-top:1px solid var(--borda)">' +
      '<div class="menu-titulo">Conta</div>' +
      (isVisitante
        ? '<a href="#/entrar"><span class="icone">🔐</span>Entrar no curso</a>'
        : '<a href="#/perfil"><span class="icone">👤</span>' +
          esc(user.nome) +
          "</a>" +
          '<a href="#" id="btn-sair"><span class="icone">🚪</span>Sair</a>') +
      "</div>" +
      "</aside>" +
      '<main class="conteudo">' +
      '<div class="topbar">' +
      '<button class="btn-icone" id="btn-menu" aria-label="Menu">☰</button>' +
      '<div class="saudacao"><h1>' +
      (isVisitante ? nomeEscola() : esc(user.nome)) +
      '</h1><p>' +
      (isProf
        ? "Professor"
        : isVisitante
          ? "Visitante · assista sem login"
          : "Aluno · " + (user.turma || "EM3-A")) +
      " · " +
      hojeISO().split("-").reverse().join("/") +
      "</p></div>" +
      '<div class="espaco"></div>' +
      (isVisitante
        ? '<a class="btn btn-primario btn-pequeno" href="#/entrar">Entrar</a>'
        : '<a class="btn btn-secundario btn-pequeno" href="simulado.html" target="_blank">Simulado completo</a>') +
      "</div>" +
      '<div id="view"></div>' +
      "</main>";

    const btnMenu = document.getElementById("btn-menu");
    if (btnMenu)
      btnMenu.addEventListener("click", () =>
        document.getElementById("sidebar").classList.toggle("aberta")
      );
    const btnSair = document.getElementById("btn-sair");
    if (btnSair)
      btnSair.addEventListener("click", (e) => {
        e.preventDefault();
        DB.sair();
        toast("Sessão encerrada. Até logo!", "sucesso");
        location.hash = "#/";
        render();
      });
  }

  function renderView(user, rota) {
    const partes = rota.split("/").filter(Boolean); // ["painel"], ["disciplina","matematica"], ["prof","alunos"]
    const alvo = document.getElementById("view");
    if (!alvo) return;

    const seg = partes[0] || "painel";
    const param = partes[1] || "";

    // Rotas exclusivas do professor
    if (seg === "prof") {
      if (user.papel !== "professor") {
        alvo.innerHTML = alerta("erro", "Acesso restrito ao professor.");
        return;
      }
      const mapa = {
        alunos: viewProfAlunos,
        notas: viewProfNotas,
        correcoes: viewProfCorrecoes,
        provas: viewProfProvas,
        textos: viewProfTextos,
        aulas: viewProfAulas,
        sistema: viewProfSistema,
      };
      const fn = mapa[param];
      alvo.innerHTML = fn
        ? fn()
        : alerta("erro", "Página não encontrada.");
      if (fn) posRender(user, rota);
      return;
    }

    // ---------- PLANO GRÁTIS (js/acessos.js) ----------
    // Telas de conteúdo consomem a cota mensal do aluno. Sem saldo (ou sem
    // conta grátis), renderiza a tela de upgrade no lugar do conteúdo.
    // Professores e quem já comprou o curso passam direto.
    if (window.Acessos) {
      const bloqueio = Acessos.bloquearRota(seg, contextoConteudo(seg, param));
      if (bloqueio) {
        alvo.innerHTML = bloqueio;
        return;
      }
    }

    // visitante (sem login) só acessa áreas públicas
    if (user.papel === "visitante") {
      // vestibulares: a página de apresentação é pública (mostra o que o
      // curso oferece); textos e questões só para quem tem conta.
      const permitido = [
        "gravacoes",
        "aulas",
        "aula",
        "disciplinas",
        "disciplina",
        "painel",
        "vestibulares",
        "vestibular",
      ];
      if (permitido.indexOf(seg) < 0) {
        alvo.innerHTML =
          '<div class="cartao">' +
          alerta("info", "Esta área é exclusiva dos alunos matriculados.") +
          '<div class="linha" style="margin-top:1rem">' +
          '<a class="btn btn-primario" href="#/entrar">Entrar no curso</a>' +
          '<a class="btn btn-secundario" href="#/gravacoes">Ver aulas gravadas</a>' +
          "</div></div>";
        return;
      }
    }

    const mapa = {
      painel: viewPainel,
      disciplinas: viewDisciplinas,
      disciplina: () => viewDisciplina(param),
      aulas: viewAulas,
      aula: () => viewAula(param),
      gravacoes: viewGravacoes,
      gravacao: () => viewGravacoes(),
      estudio: viewEstudio,
      textos: viewTextos,
      texto: () => viewTexto(param),
      atividades: viewAtividades,
      atividade: () => viewAtividade(param),
      projetos: viewProjetos,
      projeto: () => viewProjeto(param),
      boletim: viewBoletim,
      perfil: viewPerfil,
      simulado: viewSimulado,
      // Vestibulares tradicionais (js/vestibulares.js)
      vestibulares: viewVestibulares,
      vestibular: () => viewVestibular(param),
      vtexto: () => viewVestibularTexto(param),
      vquestoes: () => viewVestibularQuestoes(param),
      scanner: viewScanner,
    };
    const fn = mapa[seg];
    alvo.innerHTML = fn ? fn() : alerta("erro", "Página não encontrada.");
    if (fn) posRender(user, rota);
  }

  function alerta(tipo, msg) {
    const cls = {
      erro: "alerta-erro",
      ok: "alerta-ok",
      info: "alerta-info",
      ambar: "alerta-ambar",
    };
    const ic = { erro: "⚠️", ok: "✅", info: "ℹ️", ambar: "💡" };
    return (
      '<div class="alerta ' +
      (cls[tipo] || cls.info) +
      '"><span>' +
      (ic[tipo] || ic.info) +
      "</span><span>" +
      esc(msg) +
      "</span></div>"
    );
  }

  function vazio(icone, titulo, texto) {
    return (
      '<div class="vazio"><div class="v-icone">' +
      icone +
      '</div><h3>' +
      esc(titulo) +
      "</h3><p>" +
      esc(texto) +
      "</p></div>"
    );
  }

  /* ======================= VIEWS — ALUNO ======================= */
  function viewPainel() {
    const user = Store.usuarioAtual();
    const isAluno = user.papel === "aluno";
    const media = Store.mediaGeral(user.id);
    const sit = Store.situacao(media);
    const aulas = todasAulas().slice(0, 3);
    const subs = Store.submissoesDe(user.id).slice(0, 4);

    let h = "";

    /* ==========================================================
       PAINEL DO PROFESSOR — panorama da turma dele.
       Não faz sentido mostrar média nem progresso de estudo
       para quem não estuda: ele acompanha os alunos.
       ========================================================== */
    if (!isAluno) {
      const alunos = Store.usuarios("aluno");
      const comNota = alunos.filter((a) => Store.mediaGeral(a.id) !== null).length;
      const estudando = alunos.filter(
        (a) => Store.progressoResumo && Store.progressoResumo(a.id).itens > 0
      ).length;

      h +=
        '<div class="grade grade-3" style="margin-bottom:1.5rem">' +
        '<div class="cartao"><div class="stat"><div class="stat-icone">👥</div><div>' +
        '<div class="stat-valor">' +
        alunos.length +
        '</div><div class="stat-rotulo">Alunos matriculados</div></div></div></div>' +
        '<div class="cartao"><div class="stat"><div class="stat-icone">📊</div><div>' +
        '<div class="stat-valor">' +
        comNota +
        '</div><div class="stat-rotulo">Com nota lançada</div></div></div></div>' +
        '<div class="cartao"><div class="stat"><div class="stat-icone">📖</div><div>' +
        '<div class="stat-valor">' +
        estudando +
        '</div><div class="stat-rotulo">Estudando esta semana</div></div></div></div>' +
        "</div>";

      h +=
        '<div class="cartao" style="margin-bottom:1.5rem"><div class="cartao-cabecalho">' +
        "<h3>Sua turma</h3>" +
        '<a class="btn btn-secundario btn-pequeno" href="#/prof/alunos">Gerir alunos</a></div>' +
        (alunos.length
          ? '<p class="lead" style="margin:0">Acompanhe cada aluno em ' +
            '<strong>Notas e médias</strong> e em <strong>Corrigir atividades</strong>. ' +
            "O progresso de cada um sobe sozinho conforme eles estudam.</p>"
          : '<p class="lead" style="margin:0">Nenhum aluno ainda. Cadastre o primeiro em ' +
            "<strong>Alunos</strong> — você escolhe o nome, o login e a senha de cada um.</p>") +
        "</div>";
    } else {
      /* ======================================================
         PAINEL DO ALUNO — as notas dele e o progresso de estudo
         (que começa ZERADO e só sobe com a atividade dele).
         ====================================================== */
      h +=
        '<div class="grade grade-2" style="margin-bottom:1.5rem">' +
        '<div class="cartao"><div class="stat"><div class="stat-icone">📊</div><div>' +
        '<div class="stat-valor">' +
        fmtNota(media) +
        '</div><div class="stat-rotulo">Média geral</div></div></div></div>' +
        '<div class="cartao"><div class="stat ' +
        (media >= 7 ? "verde" : media >= 5 ? "ambar" : "magenta") +
        '"><div class="stat-icone">🎯</div><div>' +
        '<div class="stat-valor">' +
        sit.rotulo +
        '</div><div class="stat-rotulo">Situação atual</div></div></div></div>' +
        "</div>";

    // ---------- MEU PROGRESSO ----------
    // Sempre visível, mesmo zerado. Só cresce com a atividade do aluno.
    const prg = progressoDoAluno(user.id);
    h +=
      '<div class="cartao" style="margin-bottom:1.5rem"><div class="cartao-cabecalho"><h3>Meu progresso</h3>' +
      '<span class="badge ' +
      (prg.concluidos ? "badge-verde" : "badge-ambar") +
      '">' +
      prg.pct +
      "% do curso</span></div>" +
      '<div class="progresso"><span style="width:' +
      prg.pct +
      '%"></span></div>' +
      '<div class="meta" style="margin-top:.9rem;flex-wrap:wrap;gap:.5rem 1.2rem">' +
      "<span>📖 Textos: " +
      prg.textos +
      "/" +
      prg.totalTextos +
      "</span>" +
      "<span>✏️ Atividades: " +
      prg.atividades +
      "/" +
      prg.totalAtividades +
      "</span>" +
      "<span>🎓 Vestibulares: " +
      prg.vestibulares +
      "/" +
      prg.totalVestibulares +
      "</span></div>" +
      '<p class="texto-pequeno" style="margin:.7rem 0 0">' +
      (prg.concluidos
        ? "Você já concluiu " +
          prg.concluidos +
          " item(ns). Continue para manter o progresso subindo."
        : "Seu progresso começa em zero. Leia um texto ou responda uma atividade para começar a subir.") +
      "</p></div>";
    } // fim do painel do aluno

    h += '<div class="grade grade-2">';
    h +=
      '<div class="cartao"><div class="secao-titulo"><h2>Próximas aulas ao vivo</h2></div>';
    if (aulas.length) {
      aulas.forEach((a) => {
        h +=
          '<div class="reuniao-link ' +
          a.plataforma +
          '"><div class="r-icone">' +
          (a.plataforma === "zoom" ? "📹" : "🎥") +
          '</div><div class="r-info"><strong>' +
          esc(a.titulo) +
          '</strong><span>' +
          fmtData(a.dataISO) +
          " · " +
          fmtHora(a.dataISO) +
          " · " +
          esc(discNome(a.disciplina)) +
          '</span></div><a class="btn btn-primario btn-pequeno" href="#/aula/' +
          a.id +
          '">Entrar</a></div>';
      });
    } else {
      h += vazio("📅", "Nenhuma aula agendada", "Aguarde a publicação do calendário.");
    }
    h +=
      '</div><div class="cartao"><div class="cartao-cabecalho"><div><div class="secao-titulo"><h2>🧩 Projeto do trimestre</h2></div>' +
      '<p class="texto-pequeno">Projetos avaliativos a cada 3 meses — etapas, entregáveis e critérios.</p></div>' +
      '<a class="btn btn-accent btn-pequeno" href="#/projetos">Ver todos</a></div>';
    const projAgora = unir(window.PROJETOS).filter((p) => p.trimestre === 1);
    if (projAgora.length) {
      projAgora.slice(0, 2).forEach((p) => {
        h +=
          '<div class="aula-item" style="margin-bottom:.6rem">' +
          '<div class="aula-num">🧩</div><div class="aula-info"><strong>' +
          esc(p.titulo) +
          "</strong><span>Entrega: " +
          fmtData(p.dataEntrega) +
          " · " +
          (p.etapas ? p.etapas.length : 0) +
          " etapas · " +
          (p.cargaHoraria || 0) +
          " h</span></div>" +
          '<a class="btn btn-primario btn-pequeno" href="#/projeto/' +
          p.id +
          '">Abrir</a></div>';
      });
    } else {
      h += vazio("🧩", "Nenhum projeto no trimestre", "");
    }
    h += "</div>";
    h +=
      '<div class="cartao"><div class="secao-titulo"><h2>Últimas correções</h2></div>';
    if (subs.length) {
      h += '<div class="tabela-envolve"><table><thead><tr><th>Atividade</th><th>Nota</th></tr></thead><tbody>';
      subs.forEach((s) => {
        h +=
          '<tr><td><span class="forte">' +
          esc(s.titulo || s.refId) +
          "</span><br><span class='texto-pequeno'>" +
          fmtData(s.dataISO) +
          "</span></td><td><span class='badge " +
          (s.nota >= 7 ? "badge-verde" : s.nota >= 5 ? "badge-ambar" : "badge-vermelho") +
          "'>" +
          fmtNota(s.nota) +
          "</span></td></tr>";
      });
      h += "</tbody></table></div>";
    } else {
      h += vazio("✏️", "Sem correções ainda", "Resolva uma atividade para ver sua nota aqui.");
    }
    h += "</div></div>";

    return h;
  }

  function viewDisciplinas() {
    const areas = unir(window.AREAS_ENEM);
    const disc = unir(window.DISCIPLINAS);
    let h =
      '<div class="barra-filtro"><div class="campo-busca"><span class="lupa">🔍</span>' +
      '<input type="search" id="filtro-disc" placeholder="Pesquisar disciplina..."></div></div>';
    h +=
      '<div class="grade grade-2">' +
      areas
        .map((a) => {
          const lista = disc.filter((d) => d.area === a.id);
          return (
            '<div class="cartao"><div class="secao-titulo"><h2>' +
            a.emoji +
            " " +
            esc(a.nome) +
            '</h2></div><p class="texto-pequeno" style="margin-bottom:1rem">' +
            esc(a.resumo || "") +
            '</p><div class="grade grade-3">' +
            lista
              .map(
                (d) =>
                  '<a class="card-materia" href="#/disciplina/' +
                  d.id +
                  '" style="text-decoration:none"><div class="capa" style="background:linear-gradient(135deg,' +
                  d.cor +
                  '33,' +
                  d.cor +
                  '11)"><span class="tag">' +
                  d.horas +
                  "h</span><span class=\"emoji\">" +
                  d.emoji +
                  '</span></div><div class="corpo"><h3>' +
                  esc(d.nome) +
                  '</h3><div class="meta"><span>👨‍🏫 ' +
                  esc(d.professor) +
                  '</span></div><div class="acoes"><span class="btn btn-primario btn-pequeno">Abrir</span></div></div></a>'
              )
              .join("") +
            "</div></div>"
          );
        })
        .join("") +
      "</div>";
    return h;
  }

  function viewDisciplina(id) {
    const d = unir(window.DISCIPLINAS).find((x) => x.id === id);
    if (!d) return alerta("erro", "Disciplina não encontrada.");
    const area = unir(window.AREAS_ENEM).find((a) => a.id === d.area);
    const textos = todosTextos().filter((t) => t.disciplina === d.id);
    const atvs = todasAtividades().filter((a) => a.disciplina === d.id);
    const aulas = todasAulas().filter((a) => a.disciplina === d.id);
    const user = Store.usuarioAtual();
    const media = user ? Store.mediaDoAluno(user.id, d.id) : null;

    let h =
      '<div class="cartao" style="margin-bottom:1.5rem">' +
      '<div class="linha" style="justify-content:space-between;flex-wrap:wrap;gap:1rem">' +
      '<div class="linha"><div class="stat-icone" style="background:' +
      d.cor +
      '22;border-color:' +
      d.cor +
      '55;font-size:2rem">' +
      d.emoji +
      "</div><div><h1>" +
      esc(d.nome) +
      '</h1><p class="texto-pequeno">' +
      (area ? esc(area.nome) : "") +
      " · " +
      d.horas +
      "h · Prof. " +
      esc(d.professor) +
      '</p></div></div><div class="linha">' +
      '<span class="badge ' +
      (media >= 7 ? "badge-verde" : media >= 5 ? "badge-ambar" : "badge-magenta") +
      '">Média ' +
      fmtNota(media) +
      "</span>" +
      (d.pdf
        ? '<a class="btn btn-primario btn-pequeno" href="' +
          d.pdf +
          '" target="_blank">📥 Baixar PDF</a>'
        : "") +
      "</div></div><p class='lead' style='margin-top:1rem'>" +
      esc(d.resumo) +
      "</p></div>";

    h +=
      '<div class="cartao" style="margin-bottom:1.5rem"><div class="secao-titulo"><h2>🎬 Videoaula</h2></div>' +
      '<div class="player"><iframe src="https://www.youtube.com/embed/' +
      d.video +
      '" allowfullscreen title="Videoaula de ' +
      esc(d.nome) +
      '"></iframe></div></div>';

    h += '<div class="grade grade-2">';
    h +=
      '<div class="cartao"><div class="secao-titulo"><h2>📄 Textos de apoio</h2></div>';
    h += textos.length
      ? textos
          .map(
            (t) =>
              '<a class="aula-item" href="#/texto/' +
              t.id +
              '" style="text-decoration:none"><span class="aula-num">' +
              (t.trimestre || 1) +
              'º</span><div class="aula-info"><strong>' +
              esc(t.titulo) +
              '</strong><span>' +
              esc(t.fonte || "Material didático") +
              " · " +
              (t.questoes ? t.questoes.length : 0) +
              " questões</span></div><span class=\"btn btn-secundario btn-pequeno\">Ler</span></a>"
          )
          .join("")
      : vazio("📄", "Nenhum texto publicado", "O professor ainda não publicou textos desta disciplina.");
    h += "</div>";

    h +=
      '<div class="cartao"><div class="secao-titulo"><h2>✏️ Atividades e aulas ao vivo</h2></div>';
    h += atvs.length
      ? atvs
          .map(
            (a) =>
              '<a class="aula-item" href="#/atividade/' +
              a.id +
              '" style="text-decoration:none;margin-bottom:.5rem"><span class="aula-num">' +
              (a.trimestre || 1) +
              'º</span><div class="aula-info"><strong>' +
              esc(a.titulo) +
              '</strong><span>' +
              (a.questoes ? a.questoes.length : 0) +
              " questões · gabarito comentado</span></div><span class=\"btn btn-accent btn-pequeno\">Responder</span></a>"
          )
          .join("")
      : vazio("✏️", "Nenhuma atividade", "Em breve novas atividades nesta disciplina.");
    if (aulas.length) {
      h +=
        '<div class="menu-titulo" style="margin-top:1rem">Aulas ao vivo</div>' +
        aulas
          .map(
            (a) =>
              '<a class="aula-item" href="#/aula/' +
              a.id +
              '" style="text-decoration:none;margin-bottom:.5rem"><span class="aula-num">' +
              (a.plataforma === "zoom" ? "📹" : "🎥") +
              '</span><div class="aula-info"><strong>' +
              esc(a.titulo) +
              '</strong><span>' +
              fmtData(a.dataISO) +
              " · " +
              fmtHora(a.dataISO) +
              '</span></div><span class="btn btn-primario btn-pequeno">Entrar</span></a>'
          )
          .join("");
    }
    h += "</div></div>";
    return h;
  }

  function viewAulas() {
    const aulas = todasAulas();
    const plataformas = [
      { id: "todas", nome: "Todas" },
      { id: "zoom", nome: "Zoom" },
      { id: "meet", nome: "Google Meet" },
    ];
    let h =
      '<div class="chips" style="margin-bottom:1.5rem">' +
      plataformas
        .map(
          (p, i) =>
            '<button class="chip ' +
            (i === 0 ? "ativa" : "") +
            '" data-plat="' +
            p.id +
            '">' +
            p.nome +
            "</button>"
        )
        .join("") +
      "</div>";
    h += '<div class="pilha" id="lista-aulas">';
    h += aulas
      .map((a) => {
        const st = statusAula(a);
        const badge =
          st === "ao-vivo"
            ? '<span class="badge badge-vermelho">🔴 Ao vivo agora</span>'
            : st === "encerrada"
              ? '<span class="badge">Encerrada</span>'
              : '<span class="badge badge-verde">Agendada</span>';
        return (
          '<div class="reuniao-link ' +
          a.plataforma +
          '" data-plat="' +
          a.plataforma +
          '"><div class="r-icone">' +
          (a.plataforma === "zoom" ? "📹" : "🎥") +
          '</div><div class="r-info"><strong>' +
          esc(a.titulo) +
          " · " +
          esc(discNome(a.disciplina)) +
          '</strong><span>' +
          fmtData(a.dataISO) +
          " · " +
          fmtHora(a.dataISO) +
          " · " +
          (a.duracao || 60) +
          " min</span></div>" +
          '<div class="linha">' +
          badge +
          '<a class="btn btn-primario btn-pequeno" href="#/aula/' +
          a.id +
          '">' +
          (st === "encerrada" ? "Ver gravação" : "Entrar na sala") +
          "</a></div></div>"
        );
      })
      .join("");
    h += "</div>";
    return h;
  }

  function viewAula(id) {
    const a = getAula(id);
    if (!a) return alerta("erro", "Aula não encontrada.");
    const st = statusAula(a);
    const user = Store.usuarioAtual();
    let h =
      '<div class="cartao" style="margin-bottom:1.5rem">' +
      '<div class="cartao-cabecalho"><div><h1>' +
      esc(a.titulo) +
      '</h1><p class="texto-pequeno">' +
      (a.plataforma === "zoom" ? "Zoom" : "Google Meet") +
      " · " +
      fmtData(a.dataISO) +
      " às " +
      fmtHora(a.dataISO) +
      " · " +
      esc(discNome(a.disciplina)) +
      "</p></div>" +
      (st === "ao-vivo"
        ? '<span class="ao-vivo"><span class="ponto"></span>Ao vivo agora</span>'
        : st === "encerrada"
          ? '<span class="badge">Encerrada</span>'
          : '<span class="badge badge-verde">Agendada</span>') +
      "</div>" +
      '<p class="lead">' +
      esc(a.descricao || "") +
      "</p></div>";

    h += '<div class="grade grade-2">';
    h +=
      '<div class="cartao"><div class="secao-titulo"><h2>🎥 Sala de aula</h2></div>';
    if (a.gravacao) {
      h +=
        '<div class="player"><iframe src="' +
        a.gravacao +
        '" allowfullscreen></iframe></div>' +
        '<a class="btn btn-primario btn-bloco" style="margin-top:1rem" href="' +
        a.link +
        '" target="_blank">Abrir sala no ' +
        (a.plataforma === "zoom" ? "Zoom" : "Meet") +
        "</a>";
    } else {
      h +=
        '<div class="player"><div class="player-placeholder">' +
        '<div class="pp-icone">' +
        (a.plataforma === "zoom" ? "📹" : "🎥") +
        "</div>" +
        '<div class="pp-titulo">' +
        esc(a.titulo) +
        "</div>" +
        "<p>A sala abre no " +
        (a.plataforma === "zoom" ? "Zoom" : "Google Meet") +
        ". Clique em participar — o professor libera o acesso no horário.</p>" +
        '<a class="btn btn-primario btn-grande" href="' +
        esc(a.link) +
        '" target="_blank">Participar da aula</a>' +
        (a.senha
          ? '<p class="texto-pequeno" style="margin-top:1rem">Senha da sala: <code>' +
            esc(a.senha) +
            "</code></p>"
          : "") +
        "</div></div>";
    }
    h += '</div><div class="cartao">';
    h +=
      '<div class="secao-titulo"><h2>👨‍🏫 Professor Virtual</h2></div>' +
      '<p class="texto-pequeno">Está com dúvida no conteúdo desta aula? O professor virtual explica e tira dúvidas agora.</p>' +
      '<div class="pilha" style="margin-top:1rem">' +
      '<a class="btn btn-accent btn-bloco" href="#/aula/' +
      a.id +
      '" onclick="TutorApp.abrirTutor(\'' +
      a.disciplina +
      "');return false;\">💬 Tirar dúvida agora</a>" +
      '<a class="btn btn-secundario btn-bloco" href="#/disciplina/' +
      a.disciplina +
      '">📚 Ver conteúdo da disciplina</a>' +
      "</div>";
    h +=
      '<div class="alerta alerta-info" style="margin-top:1rem"><span>💡</span><span>Durante a aula ao vivo use o chat para perguntar. Depois, revise com os textos de apoio da disciplina.</span></div>';
    h += "</div></div>";
    return h;
  }

  /* ======================= VIEWS — TEXTOS E ATIVIDADES ======================= */
  function viewTextos() {
    const textos = todosTextos();
    let h = '<div class="barra-filtro"><div class="campo-busca"><span class="lupa">🔍</span>' +
      '<input type="search" id="filtro-txt" placeholder="Pesquisar texto ou disciplina..."></div></div>';
    h += '<div class="grade grade-3" id="lista-textos">';
    h += textos
      .map((t) => {
        return (
          '<div class="cartao-compacto cartao" data-busca="' +
          esc(normalizar(t.titulo + " " + discNome(t.disciplina))) +
          '" style="display:flex;flex-direction:column;gap:.6rem">' +
          '<div class="linha"><span class="badge badge-brand">' +
          discEmoji(t.disciplina) +
          " " +
          esc(discNome(t.disciplina)) +
          '</span><span class="badge">' +
          (t.trimestre || 1) +
          "º trim</span></div>" +
          "<h3>" +
          esc(t.titulo) +
          "</h3>" +
          '<p class="texto-pequeno">' +
          esc(t.fonte || "Material didático") +
          " · " +
          (t.questoes ? t.questoes.length : 0) +
          " questões</p>" +
          '<a class="btn btn-primario btn-pequeno" href="#/texto/' +
          t.id +
          '">Ler e responder</a></div>'
        );
      })
      .join("");
    h += "</div>";
    return h;
  }

  function viewTexto(id) {
    const t = getTexto(id);
    if (!t) return alerta("erro", "Texto não encontrado.");
    let h =
      '<div class="texto-enem impresso" style="margin-bottom:1.5rem">' +
      '<div class="linha" style="justify-content:space-between;margin-bottom:1rem">' +
      '<span class="te-rotulo">' +
      discEmoji(t.disciplina) +
      " " +
      esc(discNome(t.disciplina)) +
      ' · ' +
      (t.trimestre || 1) +
      "º trim</span>" +
      '<button class="btn btn-accent btn-pequeno" onclick="TutorApp.abrirTutor(\'' +
      t.disciplina +
      "');return false;\">💬 Professor Virtual</button></div>" +
      '<div class="te-titulo">' +
      esc(t.titulo) +
      "</div>" +
      '<div class="te-fonte">' +
      esc(t.fonte || "") +
      '</div><div class="te-corpo">' +
      (t.corpo || "") +
      "</div></div>";

    if (t.habilidades && t.habilidades.length) {
      h +=
        '<div class="linha" style="margin-bottom:1.5rem"><span class="texto-pequeno">Habilidades:</span>' +
        t.habilidades.map((x) => '<span class="badge badge-violeta">' + esc(x) + "</span>").join("") +
        "</div>";
    }

    h += '<div class="cartao"><div class="secao-titulo"><h2>✏️ Questões do texto</h2></div>';
    h += '<form id="form-questoes" data-tipo="texto" data-ref="' + t.id + '" data-disc="' + t.disciplina + '" data-trim="' + (t.trimestre || 1) + '" data-titulo="' + esc(t.titulo) + '">';
    (t.questoes || []).forEach((q, i) => {
      h += questoesHTML(q, i);
    });
    h += '<button class="btn btn-primario btn-grande btn-bloco" type="submit">Enviar respostas e corrigir</button>';
    h += "</form>";
    h += '<div id="resultado"></div></div>';

    // Estudou de verdade: marcou o texto como lido no progresso do aluno.
    Store.registrarProgresso("texto", t.id, { titulo: t.titulo });

    return h;
  }

  /* =====================================================================
     VESTIBULARES — Fuvest e Unicamp (js/vestibulares.js)

     O ENEM e o vestibular tradicional são provas diferentes. Aqui fica o
     que muda, na prática: formato da prova, redação no estilo da banca,
     trilhas de estudo, leituras longas e banco de questões no estilo.
     ===================================================================== */

  const VESTS = function () {
    return window.VESTIBULARES || [];
  };

  function acharVest(id) {
    return VESTS().filter((v) => v.id === id)[0] || null;
  }

  function acharTextoVest(textoId) {
    for (const v of VESTS()) {
      const t = (v.textos || []).filter((x) => x.id === textoId)[0];
      if (t) return { vestibular: v, texto: t };
    }
    return null;
  }

  /* ---------- lista ---------- */
  function viewVestibulares() {
    const vs = VESTS();
    if (!vs.length) return vazio("🎓", "Em breve", "Trilhas de vestibular em preparação.");

    let h =
      '<div class="cartao" style="margin-bottom:1.5rem;border-left:2px solid var(--accent)">' +
      '<h2 style="margin:0 0 .5rem">🎓 Vestibulares tradicionais</h2>' +
      '<p class="texto-pequeno" style="margin:0">' +
      "O ENEM e a Fuvest/Unicamp são provas <strong>diferentes</strong>. O mesmo " +
      "aluno, estudando do mesmo jeito, vai bem em uma e mal na outra. Aqui você " +
      "vê o que muda — e estuda no formato de cada banca.</p></div>";

    h += '<div class="grade grade-2">';
    vs.forEach((v) => {
      h +=
        '<div class="cartao" style="border-top:3px solid ' + v.cor + '">' +
        '<div class="linha" style="justify-content:space-between;align-items:flex-start">' +
        '<div class="linha" style="gap:.7rem;align-items:center">' +
        '<span style="font-size:1.8rem">' + v.emoji + "</span>" +
        "<div><h3 style=\"margin:0\">" + esc(v.nome) + "</h3>" +
        '<span class="texto-pequeno">' + esc(v.universidade) + "</span></div></div>" +
        '<span class="badge badge-violeta">' + esc(v.edicao) + "</span></div>" +
        '<p class="texto-pequeno" style="margin:.9rem 0">' + esc(v.resumo) + "</p>" +
        '<div class="linha" style="gap:.4rem;flex-wrap:wrap;margin-bottom:1rem">' +
        (v.calendario || [])
          .map((c) => '<span class="badge">' + esc(c) + "</span>")
          .join("") +
        "</div>" +
        '<div class="linha" style="gap:.5rem">' +
        '<a class="btn btn-primario btn-pequeno" href="#/vestibular/' + v.id + '">Como funciona</a>' +
        '<a class="btn btn-secundario btn-pequeno" href="#/vquestoes/' + v.id + '">Questões no estilo</a>' +
        "</div></div>";
    });
    h += "</div>";
    return h;
  }

  /* ---------- página do vestibular ---------- */
  function viewVestibular(id) {
    const v = acharVest(id);
    if (!v) return alerta("erro", "Vestibular não encontrado.");

    let h =
      '<div class="linha" style="justify-content:space-between;align-items:flex-start;margin-bottom:1.2rem">' +
      '<div class="linha" style="gap:.8rem;align-items:center">' +
      '<span style="font-size:2rem">' + v.emoji + "</span>" +
      "<div><h2 style=\"margin:0\">" + esc(v.nome) + " — " + esc(v.edicao) + "</h2>" +
      '<span class="texto-pequeno">' + esc(v.universidade) + " · " + esc(v.banca) + "</span></div></div>" +
      '<a class="btn btn-secundario btn-pequeno" href="#/vestibulares">← Todos</a></div>';

    h += '<div class="cartao" style="margin-bottom:1.5rem">' + alerta("info", v.resumo) + "</div>";

    // Visitante: as leituras e as questões exigem conta (consomem cota).
    // Em vez de deixar sem saída, oferecemos o cadastro — é ali que o
    // visitante deixa de ser visitante.
    const visitante = !Store.usuarioAtual();
    if (visitante) {
      h +=
        '<div class="cartao" style="margin-bottom:1.5rem;border-left:2px solid var(--neon)">' +
        '<div class="stat"><div class="stat-icone">🎓</div><div>' +
        '<div class="stat-rotulo">Estude no formato desta prova</div>' +
        '<div class="stat-valor">Crie sua conta grátis</div>' +
        '<p class="texto-pequeno" style="margin:.3rem 0 .9rem">' +
        "As leituras e o banco de questões abaixo são liberados na hora, com " +
        "<strong>20 aulas e 60 questões por mês de graça</strong>. Sem cartão, sem " +
        "compromisso.</p>" +
        '<div class="linha" style="gap:.5rem">' +
        '<a class="btn btn-primario btn-pequeno" href="#/entrar/cadastrar">Criar conta grátis</a>' +
        '<a class="btn btn-secundario btn-pequeno" href="#/entrar">Já tenho conta</a>' +
        "</div></div></div></div>";
    }

    /* --- como funciona a prova --- */
    h += '<div class="cartao" style="margin-bottom:1.5rem">' +
      '<div class="secao-titulo"><h2>🎯 Como funciona a prova</h2></div>' +
      '<p class="texto-pequeno" style="margin:0 0 1rem">' + esc(v.formato.resumo) + "</p>";
    v.formato.fases.forEach((f) => {
      h +=
        '<div class="cartao" style="background:var(--surface);margin-bottom:.8rem">' +
        '<div class="linha" style="justify-content:space-between;align-items:flex-start">' +
        '<strong>' + esc(f.nome) + "</strong>" +
        '<span class="badge badge-brand">' + esc(f.vale) + "</span></div>" +
        '<p style="margin:.5rem 0 .3rem"><strong>' + esc(f.prova) + "</strong></p>" +
        '<p class="texto-pequeno" style="margin:0 0 .5rem">⏱ ' + esc(f.tempo) + "</p>" +
        '<p class="texto-pequeno" style="margin:0">' + esc(f.detalhes) + "</p></div>";
    });
    h += alerta("erro", v.formato.eliminacao) + "</div>";

    /* --- ENEM x vestibular --- */
    h += '<div class="cartao" style="margin-bottom:1.5rem">' +
      '<div class="secao-titulo"><h2>⚖️ O que muda em relação ao ENEM</h2></div>' +
      '<div class="tab-comparativo"><table><thead><tr>' +
      "<th></th><th>ENEM</th><th>" + esc(v.nome) + "</th></tr></thead><tbody>";
    v.comparativo.forEach((c) => {
      h +=
        "<tr><td><strong>" + esc(c.tema) + "</strong></td>" +
        '<td class="tab-enem">' + esc(c.enem) + "</td>" +
        '<td class="tab-vest">' + esc(c.vest) + "</td></tr>";
    });
    h += "</tbody></table></div></div>";

    /* --- o que muda nos estudos --- */
    h += '<div class="cartao" style="margin-bottom:1.5rem">' +
      '<div class="secao-titulo"><h2>📚 O que muda nos seus estudos</h2></div>' +
      '<ul class="lista-check">';
    v.mudaNosEstudos.forEach((m) => {
      h += "<li>" + esc(m) + "</li>";
    });
    h += "</ul></div>";

    /* --- redação --- */
    h += '<div class="cartao" style="margin-bottom:1.5rem">' +
      '<div class="secao-titulo"><h2>📝 A redação — o maior diferencial</h2></div>' +
      '<div class="linha" style="gap:.4rem;flex-wrap:wrap;margin-bottom:1rem">' +
      '<span class="badge badge-brand">' + esc(v.redacao.onde) + "</span>" +
      '<span class="badge badge-violeta">' + esc(v.redacao.vale) + "</span></div>" +
      '<p style="margin:0 0 1rem">' + esc(v.redacao.formato) + "</p>" +
      '<div class="cartao" style="background:var(--surface);margin-bottom:1rem">' +
      '<strong style="color:var(--magenta-texto)">⚠️ O que NÃO vale aqui (e o aluno do ENEM acha que vale):</strong>' +
      '<ul class="lista-check">';
    v.redacao.diferencas.forEach((d) => {
      h += "<li>" + esc(d) + "</li>";
    });
    h += "</ul></div>" +
      '<div class="cartao" style="background:var(--surface);margin-bottom:1rem">' +
      "<strong>Como a banca avalia:</strong><ul class=\"lista-check\">";
    v.redacao.criterios.forEach((c) => {
      h += "<li><strong>" + esc(c.nome) + ":</strong> " + esc(c.desc) + "</li>";
    });
    h += "</ul></div>" +
      '<div class="cartao" style="background:var(--surface)">' +
      "<strong>Temas que mais aparecem:</strong>" +
      '<div class="linha" style="gap:.4rem;flex-wrap:wrap;margin-top:.6rem">' +
      v.redacao.temasFrequentes
        .map((t) => '<span class="badge">' + esc(t) + "</span>")
        .join("") +
      "</div></div></div>";

    /* --- trilhas --- */
    h += '<div class="cartao" style="margin-bottom:1.5rem">' +
      '<div class="secao-titulo"><h2>🧭 Por onde estudar</h2></div>' +
      '<div class="grade grade-3">';
    v.trilhas.forEach((t) => {
      const alta = t.prioridade === "alta";
      h +=
        '<div class="cartao" style="background:var(--surface);border-left:2px solid ' +
        (alta ? "var(--magenta)" : "var(--borda-forte)") + '">' +
        '<div class="linha" style="justify-content:space-between">' +
        '<span>' + t.emoji + " <strong>" + esc(t.nome) + "</strong></span>" +
        '<span class="badge ' + (alta ? "badge-brand" : "") + '">' +
        (alta ? "Prioridade alta" : "Média") +
        "</span></div>" +
        '<p class="texto-pequeno" style="margin:.5rem 0 0">' + esc(t.mudanca) + "</p></div>";
    });
h += "</div></div>";

    /* --- literatura obrigatória (quando a banca tem lista) --- */
    if (v.literatura) {
      h +=
        '<div class="cartao" style="margin-bottom:1.5rem">' +
        '<div class="secao-titulo"><h2>📚 Literatura obrigatória</h2></div>' +
        '<p class="texto-pequeno" style="margin:0 0 .4rem">' + esc(v.literatura.edicao) + "</p>" +
        alerta("erro", v.literatura.aviso) +
        '<div class="grade grade-3" style="margin-top:1rem">';
      v.literatura.obras.forEach((o) => {
        h +=
          '<div class="cartao" style="background:var(--surface);border-left:2px solid var(--magenta)">' +
          '<h3 style="margin:0 0 .2rem;font-size:.95rem">' + esc(o.titulo) + "</h3>" +
          '<p class="texto-pequeno" style="margin:0 0 .2rem"><strong>' + esc(o.autor) + "</strong></p>" +
          '<p class="texto-pequeno" style="margin:0 0 .5rem;color:var(--violeta-texto)">' + esc(o.movimento) + "</p>" +
          '<p class="texto-pequeno" style="margin:0">' + esc(o.porQueCai) + "</p></div>";
      });
      h += "</div></div>";
    }

    /* --- textos --- */
    if (v.textos && v.textos.length) {
      h += '<div class="cartao" style="margin-bottom:1.5rem">' +
        '<div class="secao-titulo"><h2>📖 Leituras no formato da prova</h2></div>' +
        '<div class="grade grade-3">';
      v.textos.forEach((t) => {
        h +=
          '<div class="cartao" style="background:var(--surface)">' +
          '<div class="linha" style="gap:.4rem;flex-wrap:wrap;margin-bottom:.5rem">' +
          (t.tags || []).map((g) => '<span class="badge">' + esc(g) + "</span>").join("") +
          "</div><h3 style=\"margin:0 0 .5rem;font-size:.95rem\">" + esc(t.titulo) + "</h3>" +
          '<p class="texto-pequeno" style="margin:0 0 .8rem">' + esc(t.fonte) + "</p>" +
          '<a class="btn btn-secundario btn-pequeno" href="#/vtexto/' + t.id + '">Ler texto</a></div>';
      });
      h += "</div></div>";
    }

    /* --- questões --- */
    h += '<div class="cartao">' +
      '<div class="secao-titulo"><h2>✏️ Banco de questões no estilo ' + esc(v.nome) + "</h2></div>" +
      '<p class="texto-pequeno" style="margin:0 0 1rem">' +
      (v.questoes || []).length +
      " questões escritas no formato desta banca, cada uma com comentário do porquê do gabarito.</p>" +
      '<a class="btn btn-primario" href="#/vquestoes/' + v.id + '">Resolver as questões</a></div>';

    return h;
  }

  /* ---------- leitura de um texto longo ---------- */
  function viewVestibularTexto(textoId) {
    const achado = acharTextoVest(textoId);
    if (!achado) return alerta("erro", "Texto não encontrado.");
    const v = achado.vestibular;
    const t = achado.texto;

    let h =
      '<div class="linha" style="margin-bottom:1rem">' +
      '<a class="btn btn-secundario btn-pequeno" href="#/vestibular/' + v.id + '">← ' + esc(v.nome) + "</a></div>";

    h += '<div class="texto-enem impresso" style="margin-bottom:1.5rem">' +
      '<div class="linha" style="justify-content:space-between;margin-bottom:1rem">' +
      '<span class="te-rotulo">' + v.emoji + " " + esc(v.nome) + " · " + esc(v.edicao) + "</span></div>" +
      '<div class="te-titulo">' + esc(t.titulo) + "</div>" +
      '<div class="te-fonte">' + esc(t.fonte || "") + "</div>" +
      '<div class="te-corpo">' + (t.corpo || "") + "</div></div>";

    h += '<div class="linha" style="gap:.4rem;flex-wrap:wrap;margin-bottom:1.5rem">' +
      (t.tags || []).map((g) => '<span class="badge badge-violeta">' + esc(g) + "</span>").join("") +
      "</div>";

    h += '<div class="cartao">' +
      '<div class="secao-titulo"><h2>Continue estudando</h2></div>' +
      '<div class="linha" style="gap:.5rem;flex-wrap:wrap">' +
      '<a class="btn btn-primario btn-pequeno" href="#/vestibular/' + v.id + '">Formato e estratégia</a>' +
      '<a class="btn btn-secundario btn-pequeno" href="#/vquestoes/' + v.id + '">Questões no estilo</a>' +
      '<a class="btn btn-secundario btn-pequeno" href="#/vestibulares">Outros vestibulares</a>' +
      "</div></div>";

    return h;
  }

  /* ---------- banco de questões no estilo da banca ---------- */
  function viewVestibularQuestoes(id) {
    const v = acharVest(id);
    if (!v) return alerta("erro", "Vestibular não encontrado.");
    const qs = v.questoes || [];

    let h =
      '<div class="linha" style="margin-bottom:1rem">' +
      '<a class="btn btn-secundario btn-pequeno" href="#/vestibular/' + v.id + '">← ' + esc(v.nome) + "</a></div>";

    h += '<div class="cartao" style="margin-bottom:1.5rem">' +
      '<h2 style="margin:0 0 .5rem">✏️ Questões no estilo ' + esc(v.nome) + "</h2>" +
      '<p class="texto-pequeno" style="margin:0">' +
      "Escritas no formato desta banca — não no do ENEM. Depois de responder, veja o " +
      "comentário: ele explica por que o gabarito é esse e onde o candidato costuma cair.</p></div>";

    if (!qs.length) return h + vazio("✏️", "Em breve", "Novas questões em preparação.");

    h += '<div class="cartao"><form id="form-questoes" data-tipo="vestibular" data-ref="' + v.id + '" data-disc="" data-trim="1" data-titulo="' + esc(v.nome) + '">';
    qs.forEach((q, i) => {
      h +=
        '<div class="cartao questao" style="background:var(--surface);margin-bottom:1rem">' +
        '<div class="linha" style="margin-bottom:.6rem"><span class="badge badge-brand">' +
        esc(q.area) + "</span></div>" +
        '<p style="margin:0 0 .8rem">' + esc(q.enunciado) + "</p>" +
        '<ol class="alternativas">';
      q.alternativas.forEach((alt, j) => {
        const letra = "ABCDE"[j];
        h +=
          '<li><label><input type="radio" name="q' + i + '" value="' + j + '"> ' +
          "<strong>" + letra + ")</strong> " + esc(alt) + "</label></li>";
      });
      h += "</ol>" +
        '<div class="comentario-questao" style="display:none;margin-top:.8rem;padding:.8rem;border-left:2px solid var(--neon);background:var(--surface)">' +
        '<strong>Resposta: ' + "ABCDE"[q.gabarito] + "</strong> — " + esc(q.comentario) +
        "</div></div>";
    });
    h += '<button class="btn btn-primario btn-grande btn-bloco" type="button" id="btn-corrigir-vest" ' +
      'onclick="TutorApp.corrigirVestibular();return false;">Ver respostas e comentários</button>';
    h += "</form></div>";
    return h;
  }

  /* Correção simples das questões de vestibular: mostra o gabarito e o
     comentário de cada questão. Não consome cota — é material de estudo. */
  function corrigirVestibular() {
    const form = document.getElementById("form-questoes");
    if (!form) return;
    const v = acharVest(form.dataset.ref);
    if (!v) return;
    let acertos = 0;
    let respondidas = 0;
    (v.questoes || []).forEach((q, i) => {
      const escolhido = form.querySelector('input[name="q' + i + '"]:checked');
      const bloco = form.querySelectorAll(".questao")[i];
      const comentario = bloco.querySelector(".comentario-questao");
      if (escolhido) {
        respondidas++;
        if (Number(escolhido.value) === q.gabarito) acertos++;
        const li = escolhido.closest("label").parentElement;
        li.style.fontWeight = Number(escolhido.value) === q.gabarito ? "700" : "400";
        li.style.color = Number(escolhido.value) === q.gabarito ? "var(--ok)" : "var(--erro)";
      }
      const marcada = bloco.querySelectorAll(".alternativas li")[q.gabarito];
      marcada.style.color = "var(--ok)";
      marcada.style.fontWeight = "700";
      if (comentario) comentario.style.display = "block";
    });
    const jaExiste = document.getElementById("res-vest");
    if (jaExiste) jaExiste.remove();
    const div = document.createElement("div");
    div.id = "res-vest";
    div.className = "cartao";
    div.style.marginTop = "1rem";
    div.innerHTML =
      '<strong>✅ Você acertou ' + acertos + " de " + (v.questoes || []).length + "</strong>" +
      (respondidas < (v.questoes || []).length
        ? '<br><span class="texto-pequeno">' +
          ((v.questoes || []).length - respondidas) +
          " questão(ões) não respondida(s).</span>"
        : "") +
      '<p class="texto-pequeno" style="margin:.6rem 0 0">' +
      "Cada comentário explica o raciocínio — leia os que você errou, é onde o aprendizado acontece.</p>";
    form.parentElement.appendChild(div);
    div.scrollIntoView({ behavior: "smooth", block: "center" });

    // ---------- PROGRESSO: só sobe quando o aluno responde ----------
    if (respondidas > 0) {
      Store.registrarProgresso("vestibular", v.id, {
        acertos: acertos,
        total: (v.questoes || []).length,
        titulo: v.nome,
        respondidas: respondidas,
      });
    }
  }

  function viewAtividades() {
    const atvs = todasAtividades();
    if (!atvs.length) return vazio("✏️", "Nenhuma atividade", "Em breve novas atividades.");
    let h = '<div class="grade grade-2">';
    atvs.forEach((a) => {
      h +=
        '<div class="cartao card-materia"><div class="capa"><span class="tag">' +
        discEmoji(a.disciplina) +
        " " +
        esc(discNome(a.disciplina)) +
        '</span><span class="emoji">✏️</span></div><div class="corpo"><h3>' +
        esc(a.titulo) +
        '</h3><p class="texto-pequeno">' +
        esc(a.descricao || "") +
        '</p><div class="meta"><span>' +
        (a.questoes ? a.questoes.length : 0) +
        " questões</span><span>" +
        (a.trimestre || 1) +
        "º trim</span></div>" +
        '<div class="acoes">' +
        '<a class="btn btn-accent btn-pequeno" href="#/atividade/' +
        a.id +
        '">Responder</a>' +
        '<button class="btn btn-secundario btn-pequeno" onclick="TutorApp.abrirTutor(\'' +
        a.disciplina +
        "');return false;\">💬 Dúvida</button></div></div></div>";
    });
    h += "</div>";
    return h;
  }

  function viewAtividade(id) {
    const a = todasAtividades().find((x) => x.id === id);
    if (!a) return alerta("erro", "Atividade não encontrada.");
    let h =
      '<div class="cartao" style="margin-bottom:1.5rem">' +
      '<div class="cartao-cabecalho"><div><h1>' +
      esc(a.titulo) +
      '</h1><p class="texto-pequeno">' +
      discEmoji(a.disciplina) +
      " " +
      esc(discNome(a.disciplina)) +
      " · " +
      (a.trimestre || 1) +
      "º trimestre</p></div>" +
      '<button class="btn btn-accent btn-pequeno" onclick="TutorApp.abrirTutor(\'' +
      a.disciplina +
      "');return false;\">💬 Professor Virtual</button></div>" +
      '<p class="lead">' +
      esc(a.descricao || "") +
      "</p>";
    if (a.videoApoio) {
      h +=
        '<div class="player" style="margin-top:1rem"><iframe src="' +
        a.videoApoio +
        '" allowfullscreen></iframe></div>';
    }
    if (a.habilidades && a.habilidades.length) {
      h +=
        '<div class="linha" style="margin-top:1rem"><span class="texto-pequeno">Habilidades:</span>' +
        a.habilidades.map((x) => '<span class="badge badge-violeta">' + esc(x) + "</span>").join("") +
        "</div>";
    }
    h += "</div>";
    h +=
      '<div class="cartao"><div class="secao-titulo"><h2>Responda as questões</h2></div>' +
      '<form id="form-questoes" data-tipo="' +
      (a.tipo === "prova" ? "prova" : "atividade") +
      '" data-ref="' +
      a.id +
      '" data-disc="' +
      a.disciplina +
      '" data-trim="' +
      (a.trimestre || 1) +
      '" data-titulo="' +
      esc(a.titulo) +
      '">';
    (a.questoes || []).forEach((q, i) => {
      h += questoesHTML(q, i);
    });
    h +=
      '<button class="btn btn-primario btn-grande btn-bloco" type="submit">Enviar e corrigir</button></form><div id="resultado"></div></div>';
    return h;
  }

  /* ======================= VIEWS — PROJETOS TRIMESTRAIS ======================= */
  const TRIMESTRES_FALLBACK = typeof TRIMESTRES !== "undefined" && Array.isArray(TRIMESTRES) ? TRIMESTRES : [
    { n: 1, nome: "1º Trimestre", periodo: "Fev → Abr", foco: "Fundamentos" },
    { n: 2, nome: "2º Trimestre", periodo: "Abr → Jul", foco: "Aprofundamento" },
    { n: 3, nome: "3º Trimestre", periodo: "Jul → Nov", foco: "Consolidação" },
  ];

  function viewProjetos() {
    const projetos = typeof unir === "function" ? unir(window.PROJETOS) : [];
    if (!projetos.length) {
      return vazio("🧩", "Nenhum projeto cadastrado", "Em breve os projetos trimestrais.");
    }
    let h = "";
    TRIMESTRES_FALLBACK.forEach((t) => {
      const doTrim = projetos.filter((p) => p.trimestre === t.n);
      if (!doTrim.length) return;
      h +=
        '<div class="cartao" style="margin-bottom:1.5rem">' +
        '<div class="cartao-cabecalho"><div><h1>🧩 ' +
        esc(t.nome) +
        '</h1><p class="texto-pequeno">' +
        esc(t.periodo || "") +
        " · " +
        esc(t.foco || "") +
        '</p></div>' +
        '<span class="badge badge-magenta">A cada 3 meses</span></div>' +
        '<div class="grade grade-2">' +
        doTrim
          .map((p) => {
            return (
              '<div class="cartao-compacto cartao" style="display:flex;flex-direction:column;gap:.7rem">' +
              '<div class="linha"><span class="badge badge-brand">' +
              esc(p.perguntaAncora || "Projeto") +
              "</span></div>" +
              "<h3>" +
              esc(p.titulo) +
              "</h3>" +
              '<p class="texto-pequeno">' +
              esc(p.resumo || "") +
              "</p>" +
              '<div class="meta"><span>📅 Entrega: ' +
              fmtData(p.dataEntrega) +
              "</span><span>⏱️ " +
              (p.cargaHoraria || 0) +
              " h</span><span>🧩 " +
              (p.etapas ? p.etapas.length : 0) +
              " etapas</span></div>" +
              '<div class="linha">' +
              (p.habilidades || [])
                .slice(0, 3)
                .map((x) => '<span class="badge badge-violeta">' + esc(x) + "</span>")
                .join("") +
              "</div>" +
              '<div class="acoes" style="margin-top:auto">' +
              '<a class="btn btn-accent btn-pequeno" href="#/projeto/' +
              p.id +
              '">Ver projeto</a></div></div>'
            );
          })
          .join("") +
        "</div></div>";
    });
    return h || vazio("🧩", "Nenhum projeto", "");
  }

  function viewProjeto(id) {
    const p = unir(window.PROJETOS).find((x) => x.id === id);
    if (!p) return alerta("erro", "Projeto não encontrado.");
    const t = unir(window.TRIMESTRES).find((x) => x.n === p.trimestre) || null;
    let h =
      '<a class="texto-pequeno" href="#/projetos">← Todos os projetos</a>' +
      '<div class="cartao" style="margin-top:1rem;margin-bottom:1.5rem">' +
      '<div class="cartao-cabecalho"><div><span class="badge badge-magenta">🧩 ' +
      esc(t ? t.nome : p.trimestre + "º trimestre") +
      '</span><h1 style="margin-top:.5rem">' +
      esc(p.titulo) +
      '</h1><p class="lead" style="margin-top:.5rem">' +
      esc(p.perguntaAncora || "") +
      "</p></div></div>" +
      '<div class="linha" style="margin-bottom:1rem">' +
      '<span class="badge badge-ambar">📅 Entrega ' +
      fmtData(p.dataEntrega) +
      "</span>" +
      '<span class="badge">⏱️ ' +
      (p.cargaHoraria || 0) +
      " h</span>" +
      '<span class="badge">👤 ' +
      esc(p.professor || "—") +
      "</span></div>" +
      '<p class="lead">' +
      esc(p.resumo || "") +
      "</p>" +
      '<div class="linha" style="margin-top:1rem">' +
      (p.habilidades || [])
        .map((x) => '<span class="badge badge-violeta">' + esc(x) + "</span>")
        .join("") +
      "</div>" +
      '<div class="linha" style="margin-top:1rem">' +
      (p.disciplinasEnvolvidas || [])
        .map((d) => '<span class="badge badge-brand">' + discEmoji(d) + " " + esc(discNome(d)) + "</span>")
        .join("") +
      "</div></div>";

    h +=
      '<div class="cartao" style="margin-bottom:1.5rem"><div class="secao-titulo"><h2>🪜 Etapas</h2></div>' +
      (p.etapas || [])
        .map(
          (e) =>
            '<div class="aula-item" style="margin-bottom:.6rem">' +
            '<div class="aula-num">' +
            e.n +
            "</div>" +
            '<div class="aula-info"><strong>' +
            esc(e.titulo) +
            "</strong><span>Prazo: " +
            fmtData(e.prazo) +
            "</span>" +
            "<p class=\"texto-pequeno\" style=\"margin-top:.35rem\">" +
            esc(e.descricao) +
            "</p>" +
            '<p class="texto-pequeno" style="margin-top:.35rem"><strong>Entregável:</strong> ' +
            esc(e.entregavel) +
            "</p></div></div>"
        )
        .join("") +
      "</div>";

    if (p.criterios && p.criterios.length) {
      h +=
        '<div class="cartao"><div class="secao-titulo"><h2>📊 Critérios de avaliação</h2></div>' +
        '<div class="tabela-envolve"><table><thead><tr><th>Competência</th><th>Peso</th><th>O que é avaliado</th></tr></thead><tbody>' +
        p.criterios
          .map(
            (c) =>
              "<tr><td class=\"forte\">" +
              esc(c.competencia) +
              "</td><td>" +
              c.peso +
              "%</td><td>" +
              esc(c.descricao) +
              "</td></tr>"
          )
          .join("") +
        "</tbody></table></div></div>";
    }
    return h;
  }


  function questoesHTML(q, i) {
    const letras = ["A", "B", "C", "D", "E"];
    let h =
      '<div class="questao" data-q="' +
      i +
      '"><div class="questao-topo"><span class="badge badge-ambar">Questão ' +
      (i + 1) +
      '</span></div><div class="questao-enunciado">' +
      (q.enunciado || "") +
      '</div><div class="opcoes">';
    (q.alternativas || []).forEach((alt, j) => {
      h +=
        '<label class="opcao"><input type="radio" name="q' +
        i +
        '" value="' +
        j +
        '" required><span class="letra">' +
        letras[j] +
        "</span><span>" +
        alt +
        "</span></label>";
    });
    h += "</div></div>";
    return h;
  }

  /* ---------- boletim ---------- */
  function viewBoletim() {
    const user = Store.usuarioAtual();
    const notas = Store.notasDeAluno(user.id);
    const disc = unir(window.DISCIPLINAS);
    const geral = Store.mediaGeral(user.id);
    const sit = Store.situacao(geral);

    let h =
      '<div class="cartao" style="margin-bottom:1.5rem"><div class="cartao-cabecalho">' +
      "<div><h1>Boletim escolar</h1>" +
      '<p class="texto-pequeno">' +
      esc(user.nome) +
      " · " +
      esc(user.turma || "EM3-A") +
      " · ENEM 2026</p></div>" +
      '<div class="linha"><span class="badge ' +
      sit.cor +
      '">' +
      sit.rotulo +
      '</span><span class="badge badge-brand">Média geral ' +
      fmtNota(geral) +
      "</span></div></div>";

    if (!notas.length) {
      h += vazio("📊", "Nenhuma nota lançada", "Resolva atividades para compor seu boletim.");
      return h;
    }

    h +=
      '<div class="tabela-envolve"><table><thead><tr><th>Disciplina</th><th>1º</th><th>2º</th><th>3º</th><th>Média</th><th>Situação</th></tr></thead><tbody>';

    disc.forEach((d) => {
      const ns = notas
        .filter((n) => n.disciplina === d.id)
        .slice()
        .sort((a, b) => a.trimestre - b.trimestre);
      if (!ns.length) return;

      // Média de cada trimestre (pode ter várias atividades no mesmo).
      const t = [1, 2, 3].map((tri) => {
        const arr = ns.filter((x) => x.trimestre === tri);
        if (!arr.length) return null;
        return (
          Math.round((arr.reduce((s, x) => s + Number(x.valor || 0), 0) / arr.length) * 10) / 10
        );
      });
      const media = Store.mediaDoAluno(user.id, d.id);
      const s = Store.situacao(media);

      // Linha da disciplina — clique para abrir as avaliações que compõem a média.
      h +=
        '<tr class="disc-cabeca" data-disc="' +
        d.id +
        '" style="cursor:pointer">' +
        "<td><span class=\"forte\">" +
        d.emoji +
        " " +
        esc(d.nome) +
        '</span><br><span class="texto-pequeno">' +
        ns.length +
        ' avaliação(ões) · clique para ver ▾</span></td>' +
        t.map((v) => "<td>" + fmtNota(v) + "</td>").join("") +
        '<td><span class="forte">' +
        fmtNota(media) +
        '</span></td><td><span class="badge ' +
        s.cor +
        '">' +
        s.rotulo +
        "</span></td></tr>";

      // Linha oculta: cada nota que entra na conta da média.
      h +=
        '<tr class="disc-detalhe" data-detalhe="' +
        d.id +
        '" style="display:none"><td colspan="6" style="padding:.2rem 1rem 1.1rem">' +
        '<table style="width:100%"><thead><tr><th>Avaliação</th><th>Tipo</th><th>Trimestre</th><th style="text-align:right">Nota</th></tr></thead><tbody>' +
        ns
          .map(
            (n) =>
              '<tr><td style="padding:.35rem .5rem">' +
              esc(n.descricao || "—") +
              '</td><td style="padding:.35rem .5rem">' +
              esc(n.tipo || "—") +
              '</td><td style="padding:.35rem .5rem">' +
              n.trimestre +
              'º</td><td style="padding:.35rem .5rem;text-align:right"><span class="forte">' +
              fmtNota(n.valor) +
              "</span></td></tr>"
          )
          .join("") +
        "</tbody></table>" +
        '<p class="texto-pequeno" style="margin:.5rem 0 0">A média vem da média das avaliações acima.</p>' +
        "</td></tr>";
    });

    h += "</tbody></table></div></div>";

    const subs = Store.submissoesDe(user.id);
    if (subs.length) {
      h +=
        '<div class="cartao"><div class="secao-titulo"><h2>Histórico de correções</h2></div>' +
        '<div class="tabela-envolve"><table><thead><tr><th>Data</th><th>Avaliação</th><th>Acertos</th><th>Nota</th></tr></thead><tbody>' +
        subs
          .map(
            (s) =>
              "<tr><td>" +
              fmtData(s.dataISO) +
              '</td><td><span class="forte">' +
              esc(s.titulo || s.refId) +
              "</span><br><span class='texto-pequeno'>" +
              esc(discNome(s.disciplina)) +
              "</span></td><td>" +
              s.acertos +
              "/" +
              s.total +
              '</td><td><span class="badge ' +
              (s.nota >= 7 ? "badge-verde" : s.nota >= 5 ? "badge-ambar" : "badge-vermelho") +
              '">' +
              fmtNota(s.nota) +
              "</span></td></tr>"
          )
          .join("") +
        "</tbody></table></div></div>";
    }
    return h;
  }

  function viewPerfil() {
    const user = Store.usuarioAtual();
    const geral = Store.mediaGeral(user.id);
    return (
      '<div class="cartao"><div class="linha" style="gap:1.5rem;flex-wrap:wrap">' +
      '<div class="avatar avatar-grande">' +
      iniciais(user.nome) +
      "</div><div><h1>" +
      esc(user.nome) +
      '</h1><p class="texto-pequeno">' +
      (user.papel === "professor" ? "Professor" : "Aluno") +
      " · " +
      esc(user.email || "") +
      (user.turma ? " · Turma " + esc(user.turma) : "") +
      "</p></div></div>" +
      '<div class="grade grade-3" style="margin-top:1.5rem">' +
      '<div class="cartao-compacto"><div class="stat-rotulo">Usuário</div><div class="stat-valor" style="font-size:1.2rem">' +
      esc(user.login) +
      "</div></div>" +
      '<div class="cartao-compacto"><div class="stat-rotulo">Disciplinas</div><div class="stat-valor" style="font-size:1.2rem">' +
      unir(window.DISCIPLINAS).length +
      "</div></div>" +
      '<div class="cartao-compacto"><div class="stat-rotulo">Média geral</div><div class="stat-valor" style="font-size:1.2rem">' +
      fmtNota(geral) +
      "</div></div></div>" +
      '<div class="linha" style="margin-top:1.5rem">' +
      '<button class="btn btn-secundario" id="btn-trocar-senha">🔑 Alterar senha</button>' +
      (user.papel === "aluno"
        ? '<a class="btn btn-primario" href="#/boletim">📊 Ver boletim</a>'
        : '<a class="btn btn-primario" href="#/prof/notas">📊 Gerenciar notas</a>') +
      "</div>" +
      '<div id="area-senha" style="margin-top:1rem"></div></div>'
    );
  }

  function viewSimulado() {
    return (
      '<div class="cartao" style="margin-bottom:1.5rem"><div class="secao-titulo"><h2>🧠 Simulado Express</h2></div>' +
      '<p class="lead">Banco com mais de 180 questões no estilo ENEM, com correção imediata e explicação de cada item.</p>' +
      '<div class="linha" style="margin-top:1rem">' +
      '<a class="btn btn-primario btn-grande" href="simulado.html" target="_blank">▶ Iniciar simulado</a>' +
      '<span class="badge badge-verde">Correção automática</span></div></div>' +
      '<div class="cartao"><div class="secao-titulo"><h2>📋 Provas aplicadas</h2></div><div id="lista-provas"></div></div>'
    );
  }

  /* ======================= SCANNER DE DOCUMENTOS ======================= */
  function viewScanner() {
    const user = Store.usuarioAtual();
    let h =
      '<div class="cartao" style="margin-bottom:1.5rem"><div class="secao-titulo"><h2>📱 Scanner de Documentos</h2></div>' +
      '<p class="texto-pequeno">Capture ou escolha uma foto do seu documento (RG, CPF, comprovante, etc.) e transforme em PDF escaneado.</p>' +
      "</div>";

    // Se já tivermos imagens salvas, mostramos o histórico
    const imagens = Store.imagensScanneadas ? Store.imagensScanneadas() : [];
    if (imagens.length > 0) {
      h += '<div style="margin-top:1.5rem"><div class="secao-titulo"><h2>Histórico de Scans</h2></div>';
      h += '<div class="pilha">';
      imagens
        .slice()
        .reverse()
        .forEach((img) => {
          const data = new Date(img.dataISO);
          h +=
            '<div class="cartao-compacto" style="padding:1rem;font-size:0.85rem">' +
            '<div class="linha"><span class="badge badge-brand">📄</span>' +
            '<span>Documento ' +
            (img.tipo || "documento") +
            "</span>" +
            `<span style="margin-left:auto;font-size:0.7rem;color:var(--texto-3)">${fmtData(
              img.dataISO
            )}</span>` +
            "</div>" +
            '<div class="linha" style="margin-top:0.5rem">' +
            '<button class="btn btn-secundario btn-pequeno" onclick="abrirScan(' +
            img.id +
            ')">Ver</button>' +
            '<button class="btn btn-fantasma btn-pequeno" onclick="excluirScan(' +
            img.id +
            ')">Excluir</button>' +
            "</div>" +
            "</div>";
        });
      h += "</div></div>";
    }

    // Área da câmera
    h +=
      '<div style="margin-top:1.5rem"><div class="secao-titulo"><h2>Nova Captura</h2></div>' +
      '<div id="camera-area">' +
      '<div class="mensagem-camera">Toque no botão abaixo para acessar a câmera</div>' +
      '<button class="btn btn-primario btn-grande" onclick="iniciarCamera()">Iniciar Câmera</button>' +
      "</div>" +
      '<div id="gallery-area" style="display:none;margin-top:1rem">' +
      '<span>Galeria</span>' +
      '<button class="btn btn-secundario btn-pequeno" onclick="voltarCamera()">Voltar para câmera</button>' +
      "</div>" +
      "</div>";

    h +=
      '<div style="margin-top:2rem"><div class="secao-titulo"><h2>PDF Gerado</h2></div>' +
      '<div id="pdf-area" style="display:none;margin-top:1rem;padding:1rem;background:var(--surface);border-radius:var(--r-lg);border:1px solid var(--borda)"></div>' +
      '<button class="btn btn-accent btn-grande" onclick="baixarPDF()" style="display:none">Baixar PDF</button>' +
      "</div>";

    return h;
  }

  /* ======================= ROTINAS DO SCANNER (JavaScript) ======================= */

  // Inicializa a câmera e exibe o fluxo de vídeo
  window.iniciarCamera = async function () {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const $cameraArea = document.getElementById("camera-area");
    const $galleryArea = document.getElementById("gallery-area");
    const $pdfArea = document.getElementById("pdf-area");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", aspectRatio: { ideal: 16 / 9 } },
        audio: false,
      });
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // essential for mobile
      video.play();

      video.onloadeddata = () => {
        // Ajustar vídeo ao tamanho da área
        const $cameraContainer = document.createElement("div");
        $cameraContainer.style.width = "100%";
        $cameraContainer.style.aspectRatio = "16/9";
        $cameraContainer.style.maxWidth = "400px";
        $cameraContainer.style.margin = "0 auto";
        $cameraContainer.appendChild(video);
        $cameraArea.innerHTML = "";
        $cameraArea.appendChild($cameraContainer);

        // Botão capturar
        const $btnCapture = document.createElement("button");
        $btnCapture.className = "btn btn-accent btn-grande";
        $btnCapture.style.width = "100%";
        $btnCapture.style.marginTop = "1rem";
        $btnCapture.innerHTML = "📷 Capturar Documento";
        $btnCapture.onclick = async () => {
          // Desenhar vídeo no canvas
          const width = video.videoWidth;
          const height = video.videoHeight;
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(video, 0, 0, width, height);

          // Detectar contorno do documento (buscar os 4 cantos)
          const { corners } = detectarContorno(canvas);
          if (!corners) {
            toast("Não foi possível detectar os cantos do documento. Ajuste a posição.", "erro");
            return;
          }

          // Aplicar perspectiva e recortar
          const ctx = canvas.getContext("2d");
          const perspectiva = aplicarPerspectiva(canvas, corners);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(perspectiva, 0, 0);

          // Gerar imagem final e converter para PDF
          const dataURL = canvas.toDataURL("image/png");
          await salvarScan(dataURL, "documento");
          toast("Documento escaneado com sucesso!", "sucesso");
        };

        $cameraArea.appendChild($btnCapture);
      };
    } catch (err) {
      console.error("Erro ao acessar câmera:", err);
      toast("Não foi possível acessar a câmera. Verifique as permissões.", "erro");
    }

    // Alternar entre câmera e galeria
    document.getElementById("toggle-gallery").onclick = () => {
      $cameraArea.style.display = $cameraArea.style.display === "none" ? "block" : "none";
      $galleryArea.style.display = $galleryArea.style.display === "none" ? "block" : "none";
    };
  };

  // Detecta o contorno do documento usando processamento de imagem
  function detectarContorno(canvas) {
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Converter para escala de cinza e aplicar threshold
    let grayData = new Uint8Array(canvas.width * canvas.height);
    let maxBrightness = 0;

    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      grayData[i / 4] = gray;
      if (gray > maxBrightness) maxBrightness = gray;
    }

    // Threshold adaptativo - encontrar áreas escuras (documento sobre fundo claro)
    const threshold = maxBrightness * 0.7;
    const binary = new Uint8Array(canvas.width * canvas.height);
    for (let i = 0; i < grayData.length; i++) {
      binary[i] = grayData[i] < threshold ? 0 : 255;
    }

    // Encontrar contornos (versão simplificada)
    // Procurar por retângulos com 4 cantos significativos
    const pontos = [];

    // Dividir em grid e procurar mudanças significativas
    const gridSize = 20;
    for (let gx = 0; gx < gridSize; gx++) {
      for (let gy = 0; gy < gridSize; gy++) {
        const sectionWidth = Math.floor(canvas.width / gridSize);
        const sectionHeight = Math.floor(canvas.height / gridSize);
        let darkPixels = 0;
        let totalPixels = 0;

        for (let x = gx * sectionWidth; x < (gx + 1) * sectionWidth; x++) {
          for (let y = gy * sectionHeight; y < (gy + 1) * sectionHeight; y++) {
            const idx = y * canvas.width + x;
            if (binary[idx] === 0) darkPixels++;
            totalPixels++;
          }
        }

        const darkRatio = darkPixels / totalPixels;
        if (darkRatio > 0.3) {
          // Esta seção tem bastante preto - provável documento
          pontos.push({
            x: gx * sectionWidth + sectionWidth / 2,
            y: gy * sectionHeight + sectionHeight / 2,
          });
        }
      }
    }

    if (pontos.length < 4) return null;

    // Ordenar pontos e encontrar os 4 cantos externos
    // Simplificação: retornar os 4 pontos mais externos
    pontos.sort((a, b) => a.y - b.y || a.x - b.x);

    // Pegar os 4 pontos que formam um retângulo
    const sorted = [...pontos].sort((a, b) => a.x - b.x || a.y - b.y);
    const corners = [
      { x: sorted[0].x, y: sorted[0].y }, // top-left
      { x: sorted[sorted.length - 1].x, y: sorted[0].y }, // top-right
      { x: sorted[sorted.length - 1].x, y: sorted[sorted.length - 1].y }, // bottom-right
      { x: sorted[0].x, y: sorted[sorted.length - 1].y }, // bottom-left
    ];

    return { corners };
  }

  // Aplica transformação de perspectiva para tornar o documento retangular
  function aplicarPerspectiva(canvas, corners) {
    const width = canvas.width;
    const height = canvas.height;

    // Calcula o tamanho máximo do documento retangular
    const tl = corners[0];
    const tr = corners[1];
    const br = corners[2];
    const bl = corners[3];

    const w1 = Math.hypot(tr.x - tl.x, tr.y - tl.y);
    const w2 = Math.hypot(br.x - bl.x, br.y - bl.y);
    const w = Math.max(w1, w2);

    const h1 = Math.hypot(bl.x - tl.x, bl.y - tl.y);
    const h2 = Math.hypot(br.x - br.x, br.y - br.y);
    const h = Math.max(h1, h2);

    // Cálculo da matriz de perspectiva
    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = w;
    outputCanvas.height = h;
    const outputCtx = outputCanvas.getContext("2d");

    // Matriz de perspectiva normalizada
    const srcPoints = [
      [tl.x / width, tl.y / height],
      [tr.x / width, tr.y / height],
      [br.x / width, br.y / height],
      [bl.x / width, bl.y / height],
    ];
    const dstPoints = [
      [0, 0],
      [w, 0],
      [w, h],
      [0, h],
    ];

    // Usar a transformation matrix
    const matrix = perspectiveTransformMatrix(srcPoints, dstPoints);
    outputCtx.transform(
      matrix[0],
      matrix[1],
      matrix[2],
      matrix[3],
      matrix[4],
      matrix[5]
    );
    outputCtx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      w,
      h
    );

    return outputCanvas;
  }

  // Calcula a matriz de transformação de perspectiva
  function perspectiveTransformMatrix(src, dst) {
    const m = [];

    // Build the system Ax = b for both x and y coordinates
    const A = [];
    const bx = [];
    const by = [];

    for (let i = 0; i < 4; i++) {
      A.push([src[i][0], src[i][1], 1, 0, 0, 0]);
      A.push([0, 0, 0, src[i][0], src[i][1], 1]);
      bx.push(dst[i][0]);
      by.push(dst[i][1]);
    }

    // Resolver sistema linear 8x6 (usando pseudo-inversa simples)
    // Para simplicidade, usamos uma aproximação
    // Em produção, use uma biblioteca matemática

    // Método de mínimos quadrados simples
    const AtA = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
    const AtBx = [0, 0, 0, 0, 0, 0];
    const AtBy = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < A[i].length; j++) {
        AtA[j][j] += A[i][j] * A[i][j]; // simplificado: diagonal
      }
      AtBx[j] += A[i][j] * bx[i];
      AtBy[j] += A[i][j] * by[i];
    }

    // This is a very simplified approach - in a real implementation,
    // you'd use proper matrix decomposition
    // For now, let's use a basic approach

    // Retornar identidade como placeholder - a implementação completa
    // exigiria álgebra linear robusta
    return [1, 0, 0, 0, 1, 0];
  }

  // Salva o scan no store/localStorage
  function salvarScan(dataURL, tipo) {
    const canvas = document.createElement("canvas");
    canvas.width = 1100; // tamanho padrão para PDF
    canvas.height = (1100 / 4) * 3; // proporção A4-like
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Converter para PDF e salvar
      const pdfData = canvas.toDataURL("application/pdf");
      const scan = {
        id: Date.now().toString(),
        dataISO: new Date().toISOString(),
        tipo: tipo,
        img: dataURL,
        pdf: pdfData,
      };

      // Salvar no store
      if (Store.salvarImagemScan) {
        Store.salvarImagemScan(scan);
      } else {
        // Fallback: usar localStorage
        const imagens = Store.imagensScanneadas || [];
        imagens.push(scan);
        localStorage.setItem(
          "educaenem-scans",
          JSON.stringify(imagens)
        );
      }

      // Mostrar preview do PDF
      const $pdfArea = document.getElementById("pdf-area");
      if ($pdfArea) mostrarPDF($pdfArea, pdfData);

      // Mostrar botão de download
      const $btn = $pdfArea?.previousElementSibling?.querySelector(".btn-accent.btn-grande");
      if ($btn) $btn.style.display = "inline-block";
    };
  }

  // Mostra preview do PDF
  function mostrarPDF($el, pdfData) {
    $el.innerHTML = `
      <div style="position:relative;">
        <iframe 
          style="width:100%;height:400px;border:none;border-radius:var(--r-md);"
          src="${pdfData}">
        </iframe>
        <div style="position:absolute;top:10px;right:10px;">
          <button class="btn btn-secundario btn-pequeno" onclick="fecharPDF()">Fechar</button>
        </div>
      </div>
    `;
  }

  function fecharPDF() {
    document.getElementById("pdf-area").innerHTML = "";
    document.querySelector("#pdf-area .btn btn-accent btn-grande").style.display = "none";
  }

  // Funções auxiliares para abertura/exclusão de scans salvos
  window.abrirScan = function (id) {
    const scans = JSON.parse(localStorage.getItem("educaenem-scans") || "[]");
    const scan = scans.find((s) => s.id === id);
    if (scan) {
      alert("ID do scan: " + scan.id + "\nTipo: " + scan.tipo);
      // Aqui poderia abrir o PDF em nova aba
      window.open(scan.pdf, "_blank");
    }
  };

  window.excluirScan = function (id) {
    if (confirm("Tem certeza que deseja excluir este scan?")) {
      let scans = JSON.parse(localStorage.getItem("educaenem-scans") || "[]");
      scans = scans.filter((s) => s.id !== id);
      localStorage.setItem("educaenem-scans", JSON.stringify(scans));
      render(); // Atualizar a view
      toast("Scan excluído!", "sucesso");
    }
  };
  function viewProfAlunos() {
    const alunos = Store.usuarios("aluno");
    let h =
      '<div class="cartao" style="margin-bottom:1.5rem"><div class="cartao-cabecalho"><div><h1>👥 Alunos</h1>' +
      '<p class="texto-pequeno">' +
      alunos.length +
      " matriculados · crie contas, altere senhas e acompanhe médias</p></div>" +
      '<button class="btn btn-primario" id="btn-novo-aluno">+ Novo aluno</button></div>';
    h +=
      '<div id="form-aluno" style="display:none" class="pilha"></div>' +
      '<div class="tabela-envolve"><table><thead><tr><th>Aluno</th><th>Usuário</th><th>Turma</th><th>Média</th><th>Situação</th><th>Ações</th></tr></thead><tbody>';
    alunos.forEach((a) => {
      const m = Store.mediaGeral(a.id);
      const s = Store.situacao(m);
      h +=
        "<tr><td><span class=\"forte\">" +
        esc(a.nome) +
        "</span></td><td>" +
        esc(a.login) +
        "</td><td>" +
        esc(a.turma || "—") +
        '</td><td><span class="forte">' +
        fmtNota(m) +
        '</span></td><td><span class="badge ' +
        s.cor +
        '">' +
        s.rotulo +
        '</span></td><td><div class="linha">' +
        '<button class="btn btn-secundario btn-pequeno" data-aluno-senha="' +
        a.id +
        '">🔑 Senha</button>' +
        '<button class="btn btn-fantasma btn-pequeno" data-aluno-del="' +
        a.id +
        '" data-nome="' +
        esc(a.nome) +
        '">Remover</button></div></td></tr>';
    });
    h += "</tbody></table></div></div>";
    return h;
  }

  function viewProfNotas() {
    const alunos = Store.usuarios("aluno");
    const disc = unir(window.DISCIPLINAS);
    let h =
      '<div class="cartao" style="margin-bottom:1.5rem"><div class="secao-titulo"><h2>📊 Lançar e editar notas</h2></div>';
    h +=
      '<div class="linha" style="gap:1rem;flex-wrap:wrap;margin-bottom:1.25rem">' +
      '<div class="campo" style="min-width:220px"><label>Aluno</label><select id="sel-aluno">' +
      alunos
        .map((a) => '<option value="' + a.id + '">' + esc(a.nome) + " (" + esc(a.login) + ")</option>")
        .join("") +
      "</select></div>" +
      '<div class="campo" style="min-width:180px"><label>Disciplina</label><select id="sel-disc">' +
      disc.map((d) => '<option value="' + d.id + '">' + esc(d.nome) + "</option>").join("") +
      "</select></div>" +
      '<div class="campo" style="min-width:130px"><label>Trimestre</label><select id="sel-trim">' +
      [1, 2, 3].map((t) => "<option value='" + t + "'>" + t + "º</option>").join("") +
      "</select></div>" +
      '<div class="campo" style="min-width:120px"><label>Nota (0-10)</label><input type="number" id="in-nota" min="0" max="10" step="0.1" value="7" style="width:110px"></div>' +
      '<div class="campo" style="min-width:150px"><label>Tipo</label><select id="sel-tipo"><option value="atividade">Atividade</option><option value="prova">Prova</option><option value="participacao">Participação</option><option value="media">Média</option></select></div>' +
      '<div class="campo" style="min-width:220px;flex:1"><label>Descrição</label><input type="text" id="in-desc" placeholder="Ex.: Prova bimestral"></div>' +
      '<div class="campo"><label>&nbsp;</label><button class="btn btn-primario" id="btn-add-nota">+ Lançar nota</button></div>' +
      "</div>";
    h += '<div id="tabela-notas"></div>';
    h += "</div>";
    return h;
  }

  function viewProfCorrecoes() {
    const subs = Store.submissoesRecebidas();
    let h = '<div class="cartao"><div class="secao-titulo"><h2>✅ Atividades e provas entregues</h2></div>';
    h +=
      '<p class="texto-pequeno" style="margin-bottom:1rem">A correção é automática. Você pode revisar a nota e sobrescrevê-la.</p>';
    if (!subs.length) {
      h += vazio("📭", "Nada entregue ainda", "As respostas dos alunos aparecem aqui.");
      return h + "</div>";
    }
    h += '<div class="tabela-envolve"><table><thead><tr><th>Aluno</th><th>Avaliação</th><th>Acertos</th><th>Nota</th><th>Editar nota</th></tr></thead><tbody>';
    subs.forEach((s) => {
      h +=
        "<tr><td><span class=\"forte\">" +
        esc(s.alunoNome || "—") +
        "</span></td><td>" +
        esc(s.titulo || s.refId) +
        "<br><span class='texto-pequeno'>" +
        esc(discNome(s.disciplina)) +
        " · " +
        fmtData(s.dataISO) +
        "</span></td><td>" +
        s.acertos +
        "/" +
        s.total +
        '</td><td><span class="badge ' +
        (s.nota >= 7 ? "badge-verde" : s.nota >= 5 ? "badge-ambar" : "badge-vermelho") +
        '" data-nota-atual="' +
        s.nota +
        '">' +
        fmtNota(s.nota) +
        '</span></td><td><div class="linha"><input type="number" min="0" max="10" step="0.1" value="' +
        s.nota +
        '" style="width:80px" data-sub-nota="' +
        s.id +
        '"><button class="btn btn-primario btn-pequeno" data-sub-salvar="' +
        s.id +
        '">Salvar</button></div></td></tr>';
    });
    h += "</tbody></table></div></div>";
    return h;
  }

  function viewProfProvas() {
    const provas = Store.provas();
    let h = '<div class="cartao" style="margin-bottom:1.5rem"><div class="cartao-cabecalho"><h2>📝 Provas</h2>' +
      '<button class="btn btn-primario" id="btn-nova-prova">+ Criar prova</button></div>';
    h += '<div id="form-prova" style="display:none"></div>';
    if (!provas.length) {
      h += vazio("📝", "Nenhuma prova criada", "Crie uma prova com questões objetivas para aplicar à turma.");
    } else {
      h += '<div class="tabela-envolve"><table><thead><tr><th>Prova</th><th>Disciplina</th><th>Questões</th><th>Criada</th><th></th></tr></thead><tbody>';
      provas.forEach((p) => {
        h +=
          "<tr><td><span class=\"forte\">" +
          esc(p.titulo) +
          "</span></td><td>" +
          esc(discNome(p.disciplina)) +
          "</td><td>" +
          (p.questoes ? p.questoes.length : 0) +
          "</td><td>" +
          fmtData(p.dataISO) +
          '</td><td><button class="btn btn-fantasma btn-pequeno" data-prova-del="' +
          p.id +
          '">Remover</button></td></tr>';
      });
      h += "</tbody></table></div>";
    }
    h += "</div>";
    return h;
  }

  function viewProfTextos() {
    const textos = todosTextos();
    const porDisc = {};
    unir(window.DISCIPLINAS).forEach((d) => {
      porDisc[d.id] = textos.filter((t) => t.disciplina === d.id).length;
    });
    let h = '<div class="cartao"><div class="secao-titulo"><h2>📄 Textos de apoio publicados</h2></div>';
    h +=
      '<div class="barra-filtro"><div class="campo-busca"><span class="lupa">🔍</span>' +
      '<input type="search" id="filtro-txt-prof" placeholder="Pesquisar..."></div>' +
      '<button class="btn btn-primario" id="btn-novo-texto">+ Novo texto</button></div>';
    h += '<div id="form-texto" style="display:none;margin-bottom:1.5rem"></div>';
    h += '<div class="grade grade-3" id="lista-textos-prof">';
    h += textos
      .map(
        (t) =>
          '<div class="cartao-compacto" data-busca="' +
          esc(normalizar(t.titulo + " " + discNome(t.disciplina))) +
          '"><div class="linha" style="justify-content:space-between"><span class="badge badge-brand">' +
          esc(discNome(t.disciplina)) +
          '</span><span class="badge">' +
          (t.questoes ? t.questoes.length : 0) +
          " q</span></div>" +
          '<h3 style="margin:.6rem 0">' +
          esc(t.titulo) +
          '</h3><div class="linha"><a class="btn btn-secundario btn-pequeno" href="#/texto/' +
          t.id +
          '">Abrir</a>' +
          (String(t.id).indexOf("txt-") === 0 && Store.textosExtra().some((x) => x.id === t.id)
            ? '<button class="btn btn-fantasma btn-pequeno" data-txt-del="' + t.id + '">Remover</button>'
            : "") +
          "</div></div>"
      )
      .join("");
    h += "</div></div>";
    return h;
  }

  function viewProfAulas() {
    const disc = unir(window.DISCIPLINAS);
    let h =
      '<div class="cartao" style="margin-bottom:1.5rem"><div class="cartao-cabecalho"><div><h2>🎥 Gerir aulas ao vivo</h2>' +
      '<p class="texto-pequeno">Agende aulas no Zoom ou no Google Meet e publique o link para a turma</p></div>' +
      '<div class="linha">' +
      '<a class="btn btn-accent btn-pequeno" href="#/estudio">🎬 Gravar aula solo</a>' +
      '<button class="btn btn-primario" id="btn-nova-aula">+ Agendar aula</button></div></div>';
    h +=
      '<div id="form-aula" style="display:none;margin-bottom:1.5rem">' +
      '<div class="campo" style="margin-bottom:.9rem"><label>Link da sala (Zoom ou Google Meet)</label>' +
      '<input type="url" id="aula-link" placeholder="Cole aqui o link da sua sala" style="width:100%"></div>' +
      '<div class="linha" style="gap:.8rem;flex-wrap:wrap;align-items:flex-end">' +
      '<div class="campo" style="flex:1;min-width:200px"><label>Título da aula</label>' +
      '<input type="text" id="aula-titulo" placeholder="Ex.: Funções da linguagem" style="width:100%"></div>' +
      '<div class="campo" style="min-width:150px"><label>Data</label><input type="date" id="aula-data"></div>' +
      '<div class="campo" style="min-width:110px"><label>Hora</label><input type="time" id="aula-hora" value="19:00"></div>' +
      '<div class="campo" style="min-width:170px"><label>Disciplina</label><select id="aula-disc">' +
      unir(window.DISCIPLINAS)
        .map((d) => '<option value="' + d.id + '">' + d.emoji + " " + esc(d.nome) + "</option>")
        .join("") +
      "</select></div>" +
      '<div class="campo"><button class="btn btn-primario" id="btn-salvar-aula">✅ Agendar</button></div>' +
      "</div>" +
      '<p class="texto-pequeno" style="margin:.7rem 0 0" id="aula-dica">' +
      "Cole o link — o site reconhece se é Zoom ou Meet sozinho.</p></div>";

    const aulas = todasAulas();
    h += '<div class="pilha">';
    aulas.forEach((a) => {
      const st = statusAula(a);
      h +=
        '<div class="reuniao-link ' +
        a.plataforma +
        '"><div class="r-icone">' +
        (a.plataforma === "zoom" ? "📹" : "🎥") +
        '</div><div class="r-info"><strong>' +
        esc(a.titulo) +
        " · " +
        esc(discNome(a.disciplina)) +
        '</strong><span>' +
        fmtData(a.dataISO) +
        " " +
        fmtHora(a.dataISO) +
        " · " +
        (a.duracao || 60) +
        " min</span>" +
        '<div class="url-mon">' +
        esc(a.link) +
        (a.senha ? " · senha: " + esc(a.senha) : "") +
        "</div></div>" +
        '<div class="linha"><span class="badge ' +
        (st === "ao-vivo" ? "badge-vermelho" : st === "encerrada" ? "badge" : "badge-verde") +
        '">' +
        (st === "ao-vivo" ? "Ao vivo" : st === "encerrada" ? "Encerrada" : "Agendada") +
        "</span>" +
        '<button class="btn btn-fantasma btn-pequeno" data-aula-del="' +
        a.id +
        '">Remover</button>' +
        '<a class="btn btn-secundario btn-pequeno" href="' +
        esc(a.link) +
        '" target="_blank">Abrir sala</a></div></div>';
    });
    h += "</div></div>";

    h +=
      '<div class="cartao" style="margin-top:1.5rem"><div class="secao-titulo"><h2>Disciplinas do curso</h2></div>' +
      '<div class="chips">' +
      disc.map((d) => '<span class="chip">' + d.emoji + " " + esc(d.nome) + "</span>").join("") +
      "</div></div>";
    return h;
  }

  /* ======================= SISTEMA / BANCO DE DADOS =======================
     Tela do professor: mostra de onde vêm os dados do site e permite testar
     a conexão quando ele está ligado a um servidor (js/config.js). */
  function viewProfSistema() {
    const st = typeof DB.info === "function" ? DB.info() : { modo: "local" };
    const api = st.modo === "api";
    const erros = st.erros || [];
    const serv = st.servidor || {};
    const bcfg = (window.EDUCA_CONFIG && window.EDUCA_CONFIG.backend) || {};

    let h =
      '<div class="cartao" style="margin-bottom:1.5rem">' +
      '<div class="cartao-cabecalho"><div><h1>🗄️ Banco de dados</h1>' +
      '<p class="texto-pequeno">Alunos, notas, atividades e pedidos ficam guardados aqui.</p></div>' +
      '<span class="badge ' +
      (api ? "badge-verde" : "badge-ambar") +
      '">' +
      (api ? "Servidor conectado" : "Navegador") +
      "</span></div>";

    h +=
      '<div class="grade grade-3" style="margin-top:1rem">' +
      '<div class="cartao-compacto"><div class="stat-rotulo">Modo</div>' +
      '<div class="stat-valor" style="font-size:1.2rem">' +
      (api ? "Servidor (api)" : "Local") +
      "</div>" +
      '<span class="texto-pequeno">' +
      esc(api ? serv.baseUrl || bcfg.baseUrl || "" : "dados no próprio navegador") +
      "</span></div>" +
      '<div class="cartao-compacto"><div class="stat-rotulo">Internet</div>' +
      '<div class="stat-valor" style="font-size:1.2rem">' +
      (st.online === false ? "Offline" : "Conectado") +
      "</div>" +
      '<span class="texto-pequeno">' +
      (st.online === false
        ? "tudo que faltar fica salvo e reenviado"
        : st.hidratado
          ? "dados carregados do servidor"
          : "sem dependência de rede") +
      "</span></div>" +
      '<div class="cartao-compacto"><div class="stat-rotulo">Sincronização</div>' +
      '<div class="stat-valor" style="font-size:1.2rem">' +
      (st.pendentes || 0) +
      " pendente(s)</div>" +
      '<span class="texto-pequeno">' +
      (st.ultimoSync ? "última em " + fmtData(st.ultimoSync) : "nada alterado ainda") +
      "</span></div>" +
      "</div>";

    if (!api) {
      h +=
        alerta(
          "info",
          "Hoje o EducaEnem funciona 100% no navegador: os dados ficam no computador de cada " +
            "professor e de cada aluno. Para compartilhar alunos, notas e pedidos entre " +
            "computadores, ligue o servidor."
        ) +
        '<div class="linha" style="margin-top:1rem;gap:.75rem;flex-wrap:wrap">' +
        '<button class="btn btn-primario" id="btn-testar-conexao">Testar conexão</button>' +
        '<a class="btn btn-secundario" href="backend/README.md">📖 Como conectar um banco</a>' +
        "</div>";
    } else {
      h +=
        alerta("ok", "Conectado ao servidor. Tudo que os professores e alunos fizerem aqui é salvo no seu banco.") +
        '<div class="linha" style="margin-top:1rem;gap:.75rem;flex-wrap:wrap">' +
        '<button class="btn btn-primario" id="btn-testar-conexao">Testar conexão</button>' +
        '<button class="btn btn-secundario" id="btn-recarregar-dados">Recarregar do servidor</button>' +
        "</div>";
    }

    h += '<div id="resultado-conexao" style="margin-top:1rem"></div>';

    if (erros.length) {
      h +=
        '<div style="margin-top:1.5rem"><div class="secao-titulo"><h2>⚠️ Últimos avisos de sincronização</h2></div>' +
        '<ul style="margin:.5rem 0 0 1.2rem">' +
        erros
          .slice(-6)
          .map(
            (e) =>
              '<li class="texto-pequeno"><strong>' +
              esc(e.onde) +
              "</strong>: " +
              esc(e.msg) +
              " (" +
              fmtHora(e.quando) +
              ")</li>"
          )
          .join("") +
        "</ul></div>";
    }

    h += "</div>";
    return h;
  }

  /* ======================= ESTÚDIO DE GRAVAÇÃO ======================= */
  /* Grave sua aula sozinho, no seu ritmo, e deixe disponível para quem
     quiser assistir. Serve para professores de todas as disciplinas. */
  const estudio = {
    gravador: null,
    pedacos: [],
    stream: null,
    trilhas: [],
    raf: null,
    compositor: null,
    inicio: 0,
    pausado: false,
    parado: true,
    timer: null,
    blob: null,
    url: null,
    mime: "",
    segundos: 0,
  };

  function estudioPararTrilhas() {
    estudio.trilhas.forEach((t) => {
      try {
        t.stop();
      } catch (e) {}
    });
    estudio.trilhas = [];
    if (estudio.stream) {
      estudio.stream.getTracks().forEach((t) => {
        try {
          t.stop();
        } catch (e) {}
      });
    }
  }

  function estudioLimparMidia() {
    if (estudio.raf) cancelAnimationFrame(estudio.raf);
    estudio.raf = null;
    estudioPararTrilhas();
    estudio.stream = null;
    if (estudio.url) {
      try {
        URL.revokeObjectURL(estudio.url);
      } catch (e) {}
      estudio.url = null;
    }
    estudio.blob = null;
    estudio.gravador = null;
    estudio.pedacos = [];
    estudio.parado = true;
    if (estudio.timer) {
      clearInterval(estudio.timer);
      estudio.timer = null;
    }
  }

  function estudioAtualizarTimer() {
    const el = document.getElementById("estudo-timer");
    if (!el) return;
    if (estudio.pausado) {
      el.textContent = "⏸ " + fmtTempo(estudio.segundos) + " (pausado)";
      return;
    }
    estudio.segundos = Math.floor((Date.now() - estudio.inicio) / 1000);
    el.textContent = "🔴 " + fmtTempo(estudio.segundos);
  }

  function vistaEstudio(mostrar) {
    const mapa = {
      form: "estudo-form",
      palco: "estudo-palco",
      resultado: "estudo-resultado",
    };
    Object.keys(mapa).forEach((k) => {
      const el = document.getElementById(mapa[k]);
      if (el) el.style.display = k === mostrar ? "" : "none";
    });
  }

  function estudioIniciar() {
    const campoTitulo = document.getElementById("es-titulo");
    const selDisc = document.getElementById("es-disc");
    if (!campoTitulo || !selDisc) return;
    const titulo = campoTitulo.value.trim();
    if (!titulo) {
      toast("Dê um título para a aula antes de gravar.", "erro");
      campoTitulo.focus();
      return;
    }
    if (!window.Gravacoes || !window.Gravacoes.temGravacao()) {
      toast(
        "Seu navegador não permite gravar a tela. Use Chrome, Edge ou Firefox atualizados — ou publique um link do Zoom/Meet.",
        "erro"
      );
      return;
    }

    const comMic = document.getElementById("es-mic").checked;
    const comCamera = document.getElementById("es-cam").checked;
    const mime = Gravacoes.escolherMime();

    estudoLimparMidia();

    const opcoesTela = { video: { frameRate: 30 }, audio: true };
    navigator.mediaDevices
      .getDisplayMedia(opcoesTela)
      .then((tela) => {
        const videoTela = tela.getVideoTracks()[0];
        const audios = tela.getAudioTracks().slice();
        let videoCamera = null;

        const passos = [];
        if (comMic) {
          passos.push(
            navigator.mediaDevices
              .getUserMedia({ audio: true })
              .then((mic) => {
                audios.push(...mic.getAudioTracks());
              })
              .catch(() => {
                toast("Microfone não autorizado — a gravação seguirá sem áudio seu.", "atencao");
              })
          );
        }
        if (comCamera) {
          passos.push(
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then((cam) => {
                videoCamera = cam.getVideoTracks()[0];
              })
              .catch(() => {
                toast("Câmera não autorizada — gravando apenas a tela.", "atencao");
              })
          );
        }

        return Promise.all(passos).then(() => {
          estudio.trilhas = [videoTela].concat(videoCamera ? [videoCamera] : []).concat(audios);
          if (videoCamera) {
            estudio.compositor = estudioCompor(videoTela, videoCamera, audios);
            estudio.stream = estudio.compositor.stream;
          } else {
            estudio.stream = new MediaStream([videoTela].concat(audios));
          }
          // quando o professor clica em "parar compartilhamento" no navegador
          videoTela.addEventListener("ended", () => {
            if (!estudio.parado) estudioParar();
          });

          estudio.gravador = new MediaRecorder(estudio.stream, mime ? { mimeType: mime } : undefined);
          estudio.mime = mime || (estudio.gravador.mimeType || "video/webm");
          estudio.pedacos = [];
          estudio.gravador.ondataavailable = (e) => {
            if (e.data && e.data.size) estudio.pedacos.push(e.data);
          };
          estudio.gravador.onstop = () => {
            if (estudio.compositor) estudio.compositor.limpar();
            if (!estudio.pedacos.length) {
              toast("Nenhum conteúdo gravado.", "erro");
              vistaEstudio("form");
              return;
            }
            estudio.blob = new Blob(estudio.pedacos, { type: estudio.mime });
            estudio.url = URL.createObjectURL(estudio.blob);
            const replay = document.getElementById("estudo-replay");
            if (replay) replay.src = estudio.url;
            const info = document.getElementById("estudo-info");
            if (info) {
              info.innerHTML =
                '<span class="badge badge-verde">Gravação pronta</span> ' +
                fmtTempo(estudio.segundos) +
                " · " +
                fmtTamanho(estudio.blob.size);
            }
            vistaEstudio("resultado");
            document
              .getElementById("es-publicar")
              .focus();
          };

          estudio.inicio = Date.now();
          estudio.pausado = false;
          estudio.parado = false;
          estudio.gravador.start(1000);
          estudio.timer = setInterval(estudioAtualizarTimer, 500);
          estudioAtualizarTimer();
          vistaEstudio("palco");
          const prev = document.getElementById("estudo-preview");
          if (prev) {
            prev.srcObject = estudio.stream;
            prev.play().catch(() => {});
          }
          toast("Gravação iniciada. É só começar a aula!", "sucesso");
        });
      })
      .catch((e) => {
        toast("Compartilhamento cancelado ou não permitido.", "erro");
        estudioLimparMidia();
        vistaEstudio("form");
      });
  }

  /* tela + câmera sobrepostas (picture-in-picture) via canvas */
  function estudioCompor(videoTela, videoCam, audios) {
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    const vTela = document.createElement("video");
    vTela.srcObject = new MediaStream([videoTela]);
    vTela.muted = true;
    vTela.play().catch(() => {});
    const vCam = document.createElement("video");
    vCam.srcObject = new MediaStream([videoCam]);
    vCam.muted = true;
    vCam.play().catch(() => {});

    let vivo = true;
    function desenhar() {
      if (!vivo) return;
      try {
        ctx.drawImage(vTela, 0, 0, canvas.width, canvas.height);
      } catch (e) {}
      try {
        const w = Math.round(canvas.width * 0.2);
        const h = Math.round(w * 0.75);
        ctx.drawImage(vCam, canvas.width - w - 24, canvas.height - h - 24, w, h);
        ctx.strokeStyle = "rgba(184,255,77,0.9)";
        ctx.lineWidth = 3;
        ctx.strokeRect(canvas.width - w - 24, canvas.height - h - 24, w, h);
      } catch (e) {}
      estudio.raf = requestAnimationFrame(desenhar);
    }
    desenhar();
    const stream = canvas.captureStream(30);
    (audios || []).forEach((t) => {
      try {
        stream.addTrack(t);
      } catch (e) {}
    });
    return {
      stream: stream,
      limpar: function () {
        vivo = false;
        try {
          vTela.pause();
        } catch (e) {}
        try {
          vCam.pause();
        } catch (e) {}
      },
    };
  }

  function estudioPausar() {
    if (!estudio.gravador || estudio.parado) return;
    if (estudio.pausado) {
      estudio.gravador.resume();
      estudio.pausado = false;
      estudio.inicio = Date.now() - estudio.segundos * 1000;
      document.getElementById("es-pausar").innerHTML = "⏸ Pausar";
    } else {
      estudio.gravador.pause();
      estudio.pausado = true;
      document.getElementById("es-pausar").innerHTML = "▶ Retomar";
    }
    estudioAtualizarTimer();
  }

  function estudioParar() {
    if (!estudio.gravador || estudio.parado) return;
    estudio.parado = true;
    try {
      estudoPararTrilhas();
    } catch (e) {}
    try {
      estudio.gravador.stop();
    } catch (e) {}
    if (estudio.timer) {
      clearInterval(estudio.timer);
      estudio.timer = null;
    }
  }

  function estudioDescartar() {
    estudioLimparMidia();
    vistaEstudio("form");
    toast("Gravação descartada.", "atencao");
  }

  function estudioBaixar() {
    if (!estudio.blob) return;
    const titulo = (document.getElementById("es-titulo").value || "aula")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
    const a = document.createElement("a");
    a.href = estudio.url;
    a.download = (titulo || "aula") + ".webm";
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast("Arquivo .webm salvo no seu computador.", "sucesso");
  }

  function estudioPublicar() {
    if (!estudio.blob) return;
    const titulo = document.getElementById("es-titulo").value.trim();
    if (!titulo) {
      toast("Informe o título da aula.", "erro");
      return;
    }
    const reg = Gravacoes.salvar({
      tipo: "arquivo",
      titulo: titulo,
      disciplina: document.getElementById("es-disc").value,
      trimestre: Number(document.getElementById("es-trim").value) || 1,
      descricao: document.getElementById("es-desc").value.trim(),
      autoria: usuarioShell ? usuarioShell.nome : "Professor",
      duracao: estudio.segundos,
      tamanho: estudio.blob.size,
      mime: estudio.mime,
      blob: estudio.blob,
      criadoPor: usuarioShell ? usuarioShell.id : null,
    });
    toast("Aula publicada em Gravações! 🎬", "sucesso");
    location.hash = "#/gravacoes";
    return reg;
  }

  function estudioPublicarLink() {
    const titulo = document.getElementById("lk-titulo").value.trim();
    const url = document.getElementById("lk-url").value.trim();
    if (!titulo || !url) {
      toast("Preencha título e link da gravação.", "erro");
      return;
    }
    if (!/^https?:\/\//i.test(url)) {
      toast("O link deve começar com http:// ou https://", "erro");
      return;
    }
    Gravacoes.salvar({
      tipo: "link",
      titulo: titulo,
      disciplina: document.getElementById("lk-disc").value,
      trimestre: Number(document.getElementById("lk-trim").value) || 1,
      descricao: "",
      autoria: usuarioShell ? usuarioShell.nome : "Professor",
      url: url,
      criadoPor: usuarioShell ? usuarioShell.id : null,
    });
    toast("Link publicado em Gravações!", "sucesso");
    location.hash = "#/gravacoes";
  }

  function viewEstudio() {
    const disc = unir(window.DISCIPLINAS);
    const opts = disc
      .map((d) => '<option value="' + d.id + '">' + discEmoji(d.id) + " " + esc(d.nome) + "</option>")
      .join("");
    const suporte = window.Gravacoes && Gravacoes.temGravacao();
    const semIdb = window.Gravacoes && Gravacoes.modoMemoria && Gravacoes.modoMemoria();

    let h =
      '<div class="cartao" style="margin-bottom:1.5rem">' +
      '<div class="cartao-cabecalho"><div><h1>🎬 Estúdio de gravação</h1>' +
      '<p class="texto-pequeno">Grave sua aula sozinho — não precisa de alunos na sala. Ao terminar, a gravação fica disponível em <strong>Gravações</strong> para qualquer pessoa assistir.</p></div>' +
      '<a class="btn btn-secundario" href="#/gravacoes">📺 Ver gravações</a></div>' +
      alerta(
        "info",
        "Funciona para todas as disciplinas: escolha a matéria, comece a gravar a tela (com microfone e, se quiser, a webcam) e ensine normalmente. Professores de outras disciplinas também podem usar este estúdio."
      ) +
      "</div>";

    if (!suporte) {
      h +=
        '<div class="cartao">' +
        alerta(
          "ambar",
          "Este navegador não permite gravação de tela. Use o Chrome, o Edge ou o Firefox mais recentes — ou publique um link de gravação do Zoom/Meet na seção de link abaixo."
        ) +
        "</div>";
    }

    h +=
      '<div class="cartao" id="estudo-form">' +
      '<div class="secao-titulo"><h2>1. Dados da aula</h2></div>' +
      '<div class="grade grade-2">' +
      '<div class="campo"><label>Título da aula</label><input type="text" id="es-titulo" placeholder="Ex.: A República Velha e a Política dos Governadores"></div>' +
      '<div class="campo"><label>Disciplina</label><select id="es-disc">' +
      opts +
      "</select></div>" +
      '<div class="campo"><label>Trimestre</label><select id="es-trim"><option value="1">1º trimestre</option><option value="2" selected>2º trimestre</option><option value="3">3º trimestre</option></select></div>' +
      '<div class="campo"><label>Captar microfone</label><label class="checkbox"><input type="checkbox" id="es-mic" checked> Incluir meu áudio na gravação</label></div>' +
      "</div>" +
      '<div class="campo" style="margin-top:1rem"><label>Descrição (opcional)</label><textarea id="es-desc" placeholder="Sobre o que é esta aula? Aparece para quem for assistir."></textarea></div>' +
      '<div class="linha" style="margin-top:1.25rem">' +
      '<label class="checkbox"><input type="checkbox" id="es-cam"> Mostrar minha webcam no canto (picture-in-picture)</label>' +
      '<div class="espaco"></div>' +
      '<button class="btn btn-primario btn-grande" id="es-iniciar">⚫ Iniciar gravação</button>' +
      "</div>" +
      (semIdb
        ? alerta(
            "ambar",
            "Aviso: este navegador não guardou vídeos no disco (modo temporário). A gravação funciona, mas baixe o arquivo .webm ao terminar para não perdê-la."
          )
        : "") +
      "</div>";

    /* palco: enquanto grava */
    h +=
      '<div class="cartao" id="estudo-palco" style="display:none">' +
      '<div class="secao-titulo"><h2>2. Gravando...</h2>' +
      '<span class="ao-vivo" id="estudo-timer">🔴 0:00</span></div>' +
      '<div class="estudio-palco"><video id="estudo-preview" autoplay muted playsinline></video></div>' +
      '<p class="texto-pequeno" style="margin-top:.75rem">Você está no ar. Fale sobre o conteúdo da aula, compartilhe slides, PDFs ou o quadro. Ninguém precisa estar assistindo: a gravação fica salva para quem quiser ver depois.</p>' +
      '<div class="linha" style="margin-top:1rem">' +
      '<button class="btn btn-secundario" id="es-pausar">⏸ Pausar</button>' +
      '<button class="btn btn-perigo" id="es-parar">⏹ Parar e salvar</button>' +
      "</div></div>";

    /* resultado: prévia + publicar */
    h +=
      '<div class="cartao" id="estudo-resultado" style="display:none">' +
      '<div class="secao-titulo"><h2>3. Revisar e publicar</h2></div>' +
      '<div class="estudio-palco"><video id="estudo-replay" controls playsinline></video></div>' +
      '<div class="linha" style="margin-top:1rem"><div id="estudo-info"></div><div class="espaco"></div>' +
      '<button class="btn btn-fantasma" id="es-descartar">🗑 Descartar</button>' +
      '<button class="btn btn-secundario" id="es-baixar">⬇️ Baixar .webm</button>' +
      '<button class="btn btn-primario" id="es-publicar">💾 Publicar em Gravações</button>' +
      "</div></div>";

    /* link externo */
    h +=
      '<div class="cartao" style="margin-top:1.5rem">' +
      '<div class="secao-titulo"><h2>🔗 Publicar gravação do Zoom, Meet ou YouTube</h2></div>' +
      '<p class="texto-pequeno">Se você grava a aula no Zoom, no Google Meet ou sobe o vídeo no YouTube/Drive, cole o link aqui. Ele aparece na galeria de Gravações ao lado das gravações feitas no estúdio.</p>' +
      '<div class="grade grade-2" style="margin-top:1rem">' +
      '<div class="campo"><label>Título</label><input type="text" id="lk-titulo" placeholder="Ex.: Aula 3 — Kulturgeschichte..."></div>' +
      '<div class="campo"><label>Disciplina</label><select id="lk-disc">' +
      opts +
      "</select></div>" +
      '<div class="campo"><label>Trimestre</label><select id="lk-trim"><option value="1">1º trimestre</option><option value="2" selected>2º trimestre</option><option value="3">3º trimestre</option></select></div>' +
      '<div class="campo"><label>Link do vídeo</label><input type="url" id="lk-url" placeholder="https://www.youtube.com/watch?v=..."></div>' +
      "</div>" +
      '<div class="linha" style="margin-top:1rem"><div class="espaco"></div>' +
      '<button class="btn btn-accent" id="lk-publicar">📤 Publicar link</button></div>' +
      "</div>";

    return h;
  }

  /* ---------- galeria pública de gravações ---------- */
  function urlEmbutir(url) {
    const u = String(url || "").trim();
    let m = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/);
    if (m) return "https://www.youtube.com/embed/" + m[1];
    m = u.match(/vimeo\.com\/(\d+)/);
    if (m) return "https://player.vimeo.com/video/" + m[1];
    m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if (m) return "https://drive.google.com/file/d/" + m[1] + "/preview";
    m = u.match(/docs\.google\.com\/presentation\/d\/([\w-]+)/);
    if (m) return "https://docs.google.com/presentation/d/" + m[1] + "/embed";
    return u;
  }

  function viewGravacoes() {
    const disc = unir(window.DISCIPLINAS);
    const chips = disc
      .map((d) => '<button class="chip" data-disc="' + d.id + '">' + discEmoji(d.id) + " " + esc(d.sigla) + "</button>")
      .join("");
    let h =
      '<div class="cartao" style="margin-bottom:1.5rem">' +
      '<div class="cartao-cabecalho"><div><h1>🎬 Aulas gravadas</h1>' +
      '<p class="texto-pequeno">Assista quando quiser, sem precisar de login. Gravadas no estúdio do professor ou trazidas do Zoom, do Meet e do YouTube.</p></div>' +
      (usuarioShell && usuarioShell.papel !== "visitante"
        ? '<a class="btn btn-primario" href="#/estudio">🎥 Gravar nova aula</a>'
        : '<a class="btn btn-primario" href="#/entrar">Entrar no curso</a>') +
      "</div></div>" +
      '<div class="barra-filtro"><div class="campo-busca"><span class="lupa">🔍</span>' +
      '<input type="search" id="filtro-grav" placeholder="Pesquisar por título ou disciplina..."></div>' +
      '<div class="chips"><button class="chip ativa" data-disc="todas">Todas</button>' +
      chips +
      "</div></div>" +
      '<div id="grav-lista"><div class="carregando"><div class="spinner"></div>Carregando gravações...</div></div>';
    return h;
  }

  function carregarGravacoes() {
    const alvo = document.getElementById("grav-lista");
    if (!alvo || !window.Gravacoes) return;
    Gravacoes.listar().then((lista) => {
      if (!lista.length) {
        alvo.innerHTML = vazio(
          "🎬",
          "Nenhuma gravação publicada ainda",
          "Quando o professor publicar uma aula gravada, ela aparece aqui para qualquer pessoa assistir."
        );
        return;
      }
      const professor = usuarioShell && usuarioShell.papel === "professor";
      alvo.innerHTML =
        '<div class="grade grade-2" id="grav-grade">' +
        lista
          .map((g) => {
            const meta =
              esc(g.titulo) +
              '<div class="gc-meta">' +
              discEmoji(g.disciplina) +
              " " +
              esc(discNome(g.disciplina)) +
              " · " +
              (g.trimestre || 1) +
              "º trim." +
              " · " +
              fmtData(g.dataISO) +
              (g.duracao ? " · " + fmtTempo(g.duracao) : "") +
              (g.tamanho ? " · " + fmtTamanho(g.tamanho) : "") +
              "</div>" +
              (g.descricao ? '<p class="texto-pequeno">' + esc(g.descricao) + "</p>" : "");
            let midia = "";
            if (g.tipo === "link") {
              midia =
                '<div class="gc-midia"><iframe src="' +
                esc(urlEmbutir(g.url)) +
                '" allowfullscreen loading="lazy" title="' +
                esc(g.titulo) +
                '"></iframe></div>';
            } else if (g.temBlob) {
              midia =
                '<div class="gc-midia"><video controls preload="metadata" playsinline data-grav-video="' +
                g.id +
                '"></video></div>';
            } else {
              midia =
                '<div class="gc-midia gc-midia-vazia"><div class="v-icone">📼</div>' +
                '<p class="texto-pequeno">' +
                esc(g.titulo) +
                " foi gravada neste navegador, mas o arquivo não está mais disponível aqui. Baixe o vídeo original ou reassista em outro dispositivo.</p>" +
                '<a class="btn btn-secundario btn-pequeno" href="' +
                esc(urlEmbutir(g.url || "#")) +
                '" target="_blank">Abrir link</a></div>';
            }
            const acoes =
              '<div class="gc-acoes">' +
              (g.tipo === "arquivo" && g.temBlob
                ? '<button class="btn btn-secundario btn-pequeno" data-grav-baixar="' +
                  g.id +
                  '">⬇️ Baixar</button>'
                : "") +
              (professor
                ? '<button class="btn btn-fantasma btn-pequeno" data-grav-del="' +
                  g.id +
                  '">🗑 Remover</button>'
                : "") +
              "</div>";
            return (
              '<div class="grav-card" data-busca="' +
              normalizar(g.titulo + " " + discNome(g.disciplina)) +
              '" data-disc="' +
              g.disciplina +
              '">' +
              midia +
              '<div class="gc-corpo">' +
              meta +
              acoes +
              "</div></div>"
            );
          })
          .join("") +
        "</div>";

      // carrega os vídeos (Blobs) depois da lista no DOM
      lista.forEach((g) => {
        if (g.tipo !== "arquivo" || !g.temBlob) return;
        const video = alvo.querySelector('[data-grav-video="' + g.id + '"]');
        if (!video) return;
        Gravacoes.obter(g.id).then((reg) => {
          if (reg && reg.blob && document.body.contains(video)) {
            video.src = URL.createObjectURL(reg.blob);
          } else {
            const pai = video.parentElement;
            if (pai && !document.body.contains(video)) return;
          }
        });
      });

      ligarGravacoes();
    });
  }

  function ligarGravacoes() {
    const filtro = document.getElementById("filtro-grav");
    if (filtro) {
      filtro.addEventListener("input", () => {
        const t = normalizar(filtro.value);
        document.querySelectorAll("#grav-grade [data-busca]").forEach((c) => {
          c.style.display = !t || c.getAttribute("data-busca").includes(t) ? "" : "none";
        });
      });
    }
    document.querySelectorAll(".chip[data-disc]").forEach((b) =>
      b.addEventListener("click", () => {
        document.querySelectorAll(".chip[data-disc]").forEach((x) => x.classList.remove("ativa"));
        b.classList.add("ativa");
        const d = b.getAttribute("data-disc");
        document.querySelectorAll("#grav-grade [data-disc]").forEach((el) => {
          el.style.display = d === "todas" || el.getAttribute("data-disc") === d ? "" : "none";
        });
      })
    );
    document.querySelectorAll("[data-grav-baixar]").forEach((b) =>
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-grav-baixar");
        Gravacoes.obter(id).then((reg) => {
          if (!reg || !reg.blob) {
            toast("Arquivo não disponível neste navegador.", "erro");
            return;
          }
          const a = document.createElement("a");
          a.href = URL.createObjectURL(reg.blob);
          a.download =
            (reg.titulo || "aula")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^a-zA-Z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
              .toLowerCase() + ".webm";
          document.body.appendChild(a);
          a.click();
          a.remove();
          Gravacoes.registrarDownload(id);
          toast("Download iniciado.", "sucesso");
        });
      })
    );
    document.querySelectorAll("[data-grav-del]").forEach((b) =>
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-grav-del");
        if (!confirm("Remover esta gravação da galeria?")) return;
        Gravacoes.remover(id).then(() => {
          toast("Gravação removida.", "sucesso");
          carregarGravacoes();
        });
      })
    );
  }

  function ligarEstudio() {
    const iniciar = document.getElementById("es-iniciar");
    if (iniciar) iniciar.addEventListener("click", estudioIniciar);
    const pausar = document.getElementById("es-pausar");
    if (pausar) pausar.addEventListener("click", estudioPausar);
    const parar = document.getElementById("es-parar");
    if (parar) parar.addEventListener("click", estudioParar);
    const descartar = document.getElementById("es-descartar");
    if (descartar) descartar.addEventListener("click", estudioDescartar);
    const baixar = document.getElementById("es-baixar");
    if (baixar) baixar.addEventListener("click", estudioBaixar);
    const publicar = document.getElementById("es-publicar");
    if (publicar) publicar.addEventListener("click", estudioPublicar);
    const publicarLink = document.getElementById("lk-publicar");
    if (publicarLink) publicarLink.addEventListener("click", estudioPublicarLink);
  }

  /* ======================= PROFESSOR VIRTUAL (UI) ======================= */
  let tutorCtx = { disciplina: null, textoId: null };

  function tutorPainelHTML() {
    return (
      '<div id="tutor-fundo" class="modal-fundo">' +
      '<div class="modal modal-largo" style="max-height:88vh;display:flex;flex-direction:column">' +
      '<div class="modal-cabecalho"><div><h3>👨‍🏫 Professor Virtual</h3>' +
      '<p class="texto-pequeno" id="tutor-disc">Tire sua dúvida</p></div>' +
      '<div class="linha"><button class="btn btn-fantasma btn-pequeno" id="tutor-limpar">Limpar</button>' +
      '<button class="btn-fechar" id="tutor-fechar" aria-label="Fechar">✕</button></div></div>' +
      '<div class="modal-corpo" id="tutor-corpo" style="flex:1;overflow-y:auto;gap:.75rem"></div>' +
      '<div class="modal-rodape" style="flex-direction:column;align-items:stretch;gap:.6rem">' +
      '<div class="chips" id="tutor-sugestoes"></div>' +
      '<div class="linha"><input type="text" id="tutor-input" placeholder="Escreva sua dúvida..." style="flex:1">' +
      '<button class="btn btn-primario" id="tutor-enviar">Enviar</button></div></div>' +
      "</div></div>"
    );
  }

  function garantirPainelTutor() {
    if (document.getElementById("tutor-fundo")) return;
    const wrap = document.createElement("div");
    wrap.innerHTML = tutorPainelHTML();
    document.body.appendChild(wrap.firstElementChild);
    document.getElementById("tutor-fechar").addEventListener("click", fecharTutor);
    document.getElementById("tutor-fundo").addEventListener("click", (e) => {
      if (e.target.id === "tutor-fundo") fecharTutor();
    });
    document.getElementById("tutor-limpar").addEventListener("click", () => {
      const u = Store.usuarioAtual();
      if (u) Store.tutorLimpar(u.id);
      renderTutorCorpo([], true);
    });
    document.getElementById("tutor-enviar").addEventListener("click", tutorEnviar);
    document.getElementById("tutor-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") tutorEnviar();
    });
  }

  function abrirTutor(disciplina, textoId) {
    garantirPainelTutor();
    tutorCtx = { disciplina: disciplina || null, textoId: textoId || null };
    const nome = disciplina ? discNome(disciplina) : "seu estudo";
    const el = document.getElementById("tutor-disc");
    if (el) el.textContent = "Disciplina: " + nome;
    const u = Store.usuarioAtual();
    const hist = u ? Store.tutorHistorico(u.id) : [];
    if (!hist.length) {
      const texto = tutorCtx.textoId ? getTexto(tutorCtx.textoId) : null;
      const corpo = texto
        ? Tutor.saudacao(tutorCtx.disciplina) +
          '<div class="alerta alerta-info"><span>🎯</span><span>Estamos no texto <strong>' +
          esc(texto.titulo) +
          "</strong>. Pergunte sobre ele ou sobre as questões.</span></div>"
        : Tutor.saudacao(tutorCtx.disciplina);
      renderTutorCorpo([{ de: "tutor", html: corpo, hora: new Date().toISOString() }], true);
    } else {
      renderTutorCorpo(hist, true);
    }
    renderSugestoes();
    document.getElementById("tutor-fundo").classList.add("aberto");
    setTimeout(() => {
      const i = document.getElementById("tutor-input");
      if (i) i.focus();
    }, 120);
  }

  function fecharTutor() {
    const f = document.getElementById("tutor-fundo");
    if (f) f.classList.remove("aberto");
  }

  function renderSugestoes() {
    const box = document.getElementById("tutor-sugestoes");
    if (!box) return;
    const s = Tutor.sugestoes(tutorCtx.disciplina);
    box.innerHTML = s
      .map((x) => '<button class="chip" data-sug="' + esc(x) + '">' + esc(x) + "</button>")
      .join("");
    box.querySelectorAll("[data-sug]").forEach((b) =>
      b.addEventListener("click", () => {
        const inp = document.getElementById("tutor-input");
        inp.value = b.getAttribute("data-sug");
        tutorEnviar();
      })
    );
  }

  function renderTutorCorpo(mensagens, substituir) {
    const corpo = document.getElementById("tutor-corpo");
    if (!corpo) return;
    if (substituir) corpo.innerHTML = "";
    mensagens.forEach((m) => corpo.appendChild(balao(m.de, m.html)));
    corpo.scrollTop = corpo.scrollHeight;
  }

  function balao(de, html) {
    const d = document.createElement("div");
    d.className = "tutor-balao " + (de === "tutor" ? "tutor" : "eu");
    d.innerHTML = html;
    return d;
  }

  function tutorEnviar() {
    const inp = document.getElementById("tutor-input");
    if (!inp) return;
    const pergunta = inp.value.trim();
    if (!pergunta) return;
    inp.value = "";
    const u = Store.usuarioAtual();
    const corpo = document.getElementById("tutor-corpo");
    corpo.appendChild(balao("eu", "<p>" + esc(pergunta) + "</p>"));
    corpo.scrollTop = corpo.scrollHeight;

    // indicador de digitação
    const digit = document.createElement("div");
    digit.className = "tutor-balao tutor";
    digit.innerHTML = '<span class="texto-pequeno">✍️ professor está escrevendo...</span>';
    corpo.appendChild(digit);
    corpo.scrollTop = corpo.scrollHeight;

    setTimeout(() => {
      digit.remove();
      const texto = tutorCtx.textoId ? getTexto(tutorCtx.textoId) : null;
      const ctx = {
        disciplina: tutorCtx.disciplina,
        textoTitulo: texto ? texto.titulo : null,
        textoCorpo: texto ? texto.corpo : null,
      };
      const r = Tutor.responder(pergunta, ctx);
      corpo.appendChild(balao("tutor", r.html));
      corpo.scrollTop = corpo.scrollHeight;
      if (u) {
        const hist = Store.tutorHistorico(u.id);
        hist.push({ de: "eu", html: "<p>" + esc(pergunta) + "</p>", hora: new Date().toISOString() });
        hist.push({ de: "tutor", html: r.html, hora: new Date().toISOString() });
        Store.tutorSalvar(u.id, hist);
      }
    }, 480);
  }

  /* ======================= ROTEADOR ======================= */
  function rotaAtual() {
    return (location.hash || "").replace(/^#/, "") || "/";
  }

  function mostrar(tipo) {
    const landing = tipo === "landing";
    const app = tipo === "app";
    const login = tipo === "login";
    $landing.hidden = !landing;
    $app.hidden = !app;
    $login.hidden = !login;
    // O #app nasce com a classe "oculto-visual" (serve para não piscar a tela
    // vazia antes do JavaScript carregar). Ela precisa ser REMOVIDA quando o
    // app aparece: sem isso o app fica com clip/1px e some da tela.
    $app.classList.toggle("oculto-visual", !app);
    // Aplica nome do professor, ano e preços definidos em js/config.js.
    aplicarConfig();
  }

  /* Âncoras da capa (#disciplinas, #aulas, #simulado, #vestibulares).
     O navegador não rola sozinho: o render() redesenha a capa inteira a cada
     hashchange e isso zera a rolagem. Então rolamos manualmente, depois que a
     página já foi desenhada. As rotas (#/algo) não são tocadas aqui. */
  function rolarParaAncora() {
    const bruto = location.hash || "";
    if (!bruto || bruto === "#" || bruto.indexOf("#/") === 0) return false;
    let nome = "";
    try {
      nome = decodeURIComponent(bruto.slice(1));
    } catch (_) {
      nome = bruto.slice(1);
    }
    if (!nome) return false;
    const alvo = document.getElementById(nome);
    if (!alvo) return false;
    requestAnimationFrame(() => {
      alvo.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return true;
  }

  function render() {
    const rota = rotaAtual();
    const user = Store.usuarioAtual();

    // rota pública de entrada
    if (rota.indexOf("/entrar") === 0) {
      usuarioShell = null;
      mostrar("login");
      renderLogin();
      return;
    }

    // Rotas PÚBLICAS — abertas a qualquer visitante, sem login.
    // A galeria de gravações e a apresentação dos vestibulares servem de
    // vitrine: quem chega pelo Google vê a qualidade antes de criar conta.
    // (Textos e questões de vestibular NÃO estão aqui: exigem conta/cota.)
    const rotasPublicas = ["/gravacoes", "/vestibulares", "/vestibular"];
    if (rotasPublicas.some((p) => rota.indexOf(p) === 0)) {
      usuarioShell = user
        ? { id: user.id, nome: user.nome, papel: user.papel }
        : { id: null, nome: "Visitante", papel: "visitante" };
      mostrar("app");
      montarApp(usuarioShell, rota);
      renderView(usuarioShell, rota);
      window.scrollTo(0, 0);
      return;
    }

    if (!user) {
      usuarioShell = null;
      mostrar("landing");
      renderLanding();
      rolarParaAncora();
      return;
    }
    usuarioShell = { id: user.id, nome: user.nome, papel: user.papel };

    // aluno não acessa área do professor
    if (rota.indexOf("/prof") === 0 && user.papel !== "professor") {
      location.hash = "#/painel";
      return;
    }

    mostrar("app");
    montarApp(user, rota);
    renderView(user, rota);
    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------------
     PAINEL DA CAPA (index.html) — lê os MESMOS dados do painel real.
     Nenhum número aqui é de demonstração: quem chega sem conta começa
     zerado (0%, sem nota, sem sequência) e só sobe quando o próprio
     aluno estuda. Dentro do app o cálculo usado é este mesmo.
     ------------------------------------------------------------------ */
  function diasSeguidos(alunoId) {
    if (!Store.progressoDe) return 0;
    const dias = new Set();
    Store.progressoDe(alunoId).forEach((p) => {
      if (p && p.em) dias.add(String(p.em).slice(0, 10));
    });
    if (!dias.size) return 0;
    let n = 0;
    const d = new Date();
    if (!dias.has(d.toISOString().slice(0, 10))) d.setUTCDate(d.getUTCDate() - 1);
    while (dias.has(d.toISOString().slice(0, 10)) && n < 3650) {
      n++;
      d.setUTCDate(d.getUTCDate() - 1);
    }
    return n;
  }

  function atualizarPainelCapa() {
    const set = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };
    const pctDe = (feitos, total) =>
      total > 0 ? Math.min(100, Math.round((feitos / total) * 100)) : 0;

    const user = Store.usuarioAtual();
    const id = user ? user.id : null;
    const prg = id ? progressoDoAluno(id) : null;
    const media = id ? Store.mediaGeral(id) : null;

    const pct = prg ? prg.pct : 0;
    set("hv-pct", String(pct));
    const anel = document.querySelector(".hv-anel");
    if (anel) anel.style.setProperty("--pct", pct + "%");

    set("hv-media", fmtNota(media));
    set("hv-meta-txt", media === null || media === undefined ? "sem nota ainda" : "geral");

    const barras = prg
      ? [
          ["textos", prg.textos, prg.totalTextos],
          ["atividades", prg.atividades, prg.totalAtividades],
          ["vestibulares", prg.vestibulares, prg.totalVestibulares],
        ]
      : [
          ["textos", 0, 0],
          ["atividades", 0, 0],
          ["vestibulares", 0, 0],
        ];
    barras.forEach((l) => {
      const p = pctDe(l[1], l[2]);
      const b = document.getElementById("hv-b-" + l[0]);
      if (b) b.style.setProperty("--p", p + "%");
      set("hv-v-" + l[0], p + "%");
    });

    const dias = id ? diasSeguidos(id) : 0;
    set(
      "hv-seq",
      dias > 0
        ? "\uD83D\uDD25 " + dias + (dias === 1 ? " dia seguido" : " dias seguidos")
        : "\uD83D\uDD25 Comece hoje"
    );

    const elSit = document.getElementById("hv-sit");
    if (elSit) {
      if (!user) {
        elSit.textContent = "\u2713 Crie sua conta gr\u00e1tis";
        elSit.className = "hv-ok";
      } else {
        const sit = Store.situacao(media);
        elSit.textContent = "\u2713 " + sit.rotulo;
        elSit.className = sit.rotulo === "Aprovado" ? "hv-ok" : "";
      }
    }
  }

  /* ======================= LANDING ======================= */
  function renderLanding() {
    const disc = unir(window.DISCIPLINAS);
    const areas = unir(window.AREAS_ENEM);
    const aulas = todasAulas().filter((a) => statusAula(a) !== "encerrada").slice(0, 4);

    // Números da capa — sempre os dados reais do site, nunca um valor fixo.
    const stat = (id, valor) => {
      const el = document.getElementById(id);
      if (el) el.textContent = valor;
    };
    stat("stat-disciplinas", disc.length);
    stat("stat-aulas", todasAulas().length);
    stat("stat-questoes", (window.SIMULADO_QUESTOES || []).length);
    stat("stat-textos", todosTextos().length);
    stat("stat-vestibulares", (window.VESTIBULARES || []).length);
    atualizarPainelCapa(); // painel da capa com dados reais (zerado p/ visitante)

    const boxAreas = document.getElementById("landing-areas");
    boxAreas.innerHTML = areas
      .map(
        (a) =>
          '<div class="cartao"><div class="stat"><div class="stat-icone" style="background:' +
          a.cor +
          '22;border-color:' +
          a.cor +
          '55;font-size:1.6rem">' +
          a.emoji +
          '</div><div><div class="stat-valor" style="font-size:1.05rem">' +
          esc(a.sigla) +
          '</div><div class="stat-rotulo">' +
          disc.filter((d) => d.area === a.id).length +
          " disciplinas</div></div></div></div>"
      )
      .join("");

    const boxAulas = document.getElementById("landing-aulas");
    boxAulas.innerHTML = aulas.length
      ? aulas
          .map(
            (a) =>
              '<div class="reuniao-link ' +
              a.plataforma +
              '"><div class="r-icone">' +
              (a.plataforma === "zoom" ? "📹" : "🎥") +
              '</div><div class="r-info"><strong>' +
              esc(a.titulo) +
              " · " +
              esc(discNome(a.disciplina)) +
              '</strong><span>' +
              fmtData(a.dataISO) +
              " · " +
              fmtHora(a.dataISO) +
              " · " +
              (a.duracao || 60) +
              " min</span></div>" +
              '<a class="btn btn-primario btn-pequeno" href="#/entrar">Entrar para participar</a></div>'
          )
          .join("")
      : vazio("📅", "Nenhuma aula agendada", "Novas datas serão publicadas em breve.");

    document.getElementById("footer-areas").innerHTML = areas
      .map((a) => '<a href="#/entrar">' + esc(a.sigla) + "</a>")
      .join("");
  }

  /* ======================= LOGIN ======================= */
  function renderLogin() {
    // ---- plano grátis (vem do js/config.js → plano) ----
    const rotuloCotas = rotuloCotasGratis();
    const precoCurso = Number((CFG.precos && CFG.precos.curso) || 0);
    const brlCurso = "R$ " + (precoCurso % 1 === 0 ? precoCurso : precoCurso.toFixed(2).replace(".", ","));

    $login.innerHTML =
      '<div class="login-tela"><div class="login-arte">' +
      '<span class="arte-pill">ENEM 2026 · ciclo completo</span>' +
      '<h1 class="arte-titulo">Sua aprovação começa agora</h1>' +
      '<p class="arte-sub">Acesse videoaulas, PDFs, aulas ao vivo no Zoom e no Meet, atividades corrigidas e simulados.</p>' +
      '<div class="login-beneficios">' +
      '<div class="login-beneficio"><span class="check">✓</span><span>Aulas ao vivo com o professor e Professor Virtual 24h</span></div>' +
      '<div class="login-beneficio"><span class="check">✓</span><span>Atividades e provas com correção automática e gabarito comentado</span></div>' +
      '<div class="login-beneficio"><span class="check">✓</span><span>Boletim com notas, médias e situação por trimestre</span></div>' +
      '<div class="login-beneficio"><span class="check">✓</span><span>14 disciplinas organizadas pelas 4 áreas do ENEM</span></div>' +
      "</div></div>" +
      '<div class="login-form-area"><div class="login-form">' +
      '<div class="login-marca"><span class="logo">EN</span><div><strong>EducaEnem</strong><span>Curso online</span></div></div>' +
      '<h2 id="login-titulo">Entrar</h2>' +
      '<div id="login-erro"></div>' +
      '<form id="form-login" class="pilha" style="gap:1rem">' +
      '<div class="campo"><label for="lg-user">Usuário</label><input id="lg-user" type="text" placeholder="seu usuário" autocomplete="username" required></div>' +
      '<div class="campo-senha campo"><label for="lg-pass">Senha</label><input id="lg-pass" type="password" placeholder="sua senha" autocomplete="current-password" required></div>' +
      '<button class="btn btn-primario btn-grande btn-bloco" type="submit">Acessar o curso</button>' +
      "</form>" +
      '<button class="btn btn-secundario btn-bloco" type="button" id="btn-criar-conta" style="margin-top:.75rem">✨ Criar conta grátis</button>' +
      '<p class="texto-pequeno" style="margin:.5rem 0 0">Estude grátis com <strong>' +
      rotuloCotas +
      "</strong>. Sem cartão, sem compromisso.</p>" +
      // ---------- PLANO GRÁTIS: cadastro público (escondido por padrão) ----------
      '<div id="cadastro-area" style="display:none">' +
      '<form id="form-cadastro" class="pilha" style="gap:1rem">' +
      '<div class="campo"><label for="cd-nome">Nome completo</label><input id="cd-nome" type="text" placeholder="como você se chama" autocomplete="name" required></div>' +
      '<div class="campo"><label for="cd-login">Usuário</label><input id="cd-login" type="text" placeholder="escolha um usuário de acesso" autocomplete="username" required></div>' +
      '<div class="campo"><label for="cd-email">E-mail (opcional)</label><input id="cd-email" type="email" placeholder="seu@email.com" autocomplete="email"></div>' +
      '<div class="campo"><label for="cd-senha">Senha</label><input id="cd-senha" type="password" placeholder="mínimo de 3 caracteres" autocomplete="new-password" required></div>' +
      '<div class="campo"><label id="cd-papel-rotulo">Eu sou</label>' +
      '<div class="papel-escolha" role="group" aria-labelledby="cd-papel-rotulo">' +
      '<button type="button" class="papel-btn ativo" data-papel="aluno">\uD83C\uDF93 Aluno</button>' +
      '<button type="button" class="papel-btn" data-papel="professor">\uD83D\uDC68\u200D\uD83C\uDFEB Professor</button>' +
      "</div>" +
      '<input type="hidden" id="cd-papel" value="aluno">' +
      '<p class="texto-pequeno" id="cd-papel-ajuda" style="margin:.4rem 0 0">' +
      "Estude no seu ritmo com as trilhas, simulados e atividades do ENEM.</p></div>" +
      '<button class="btn btn-accent btn-grande btn-bloco" type="submit">Criar minha conta grátis</button>' +
      "</form>" +
      '<button class="btn btn-fantasma btn-bloco" type="button" id="btn-ja-tenho" style="margin-top:.5rem">← Já tenho conta</button>' +
      '<p class="texto-pequeno" style="margin:.75rem 0 0">Quando quiser ir além, o curso completo custa <strong>' +
      brlCurso +
      "</strong> à vista no Pix.</p>" +
      "</div>" +
      '<a class="texto-pequeno" href="#/">← Voltar ao site</a>' +
      "</div></div></div>";

    document.getElementById("form-login").addEventListener("submit", (e) => {
      e.preventDefault();
      const u = document.getElementById("lg-user").value;
      const s = document.getElementById("lg-pass").value;
      const botao = e.target.querySelector('button[type="submit"]');
      const textoBotao = botao ? botao.textContent : "";
      const erro = document.getElementById("login-erro");

      // No modo "api" o login consulta o servidor: mostramos "Entrando...".
      if (botao) {
        botao.disabled = true;
        botao.textContent = "Entrando…";
      }
      if (erro) erro.innerHTML = "";

      DB.entrar(u, s).then((r) => {
        if (botao) {
          botao.disabled = false;
          botao.textContent = textoBotao;
        }
        if (!r || !r.ok) {
          if (erro) erro.innerHTML = alerta("erro", (r && r.erro) || "Não foi possível entrar.");
          return;
        }
        toast("Bem-vindo(a), " + String(r.usuario.nome).split(" ")[0] + "!", "sucesso");
        location.hash = "#/painel";
        render();
      });
    });

    /* ---------- PLANO GRÁTIS: alternar entre "Entrar" e "Criar conta" ---------- */
    const $cad = document.getElementById("cadastro-area");
    const alternarCadastro = (sim) => {
      if (!$cad) return;
      $cad.style.display = sim ? "block" : "none";
      const formL = document.getElementById("form-login");
      if (formL) formL.style.display = sim ? "none" : "block";
      const btnCriar = document.getElementById("btn-criar-conta");
      if (btnCriar) {
        btnCriar.style.display = sim ? "none" : "";
        if (btnCriar.nextElementSibling) btnCriar.nextElementSibling.style.display = sim ? "none" : "";
      }
      const titulo = document.getElementById("login-titulo");
      if (titulo) titulo.textContent = sim ? "Criar conta grátis" : "Entrar";
      const erro = document.getElementById("login-erro");
      if (erro) erro.innerHTML = "";
      if (sim) {
        const nome = document.getElementById("cd-nome");
        if (nome) nome.focus();
      }
    };

    /* ---------- cadastro: a pessoa escolhe ser ALUNO ou PROFESSOR ---------- */
    const ajudaPapel = {
      aluno: "Estude no seu ritmo com as trilhas, simulados e atividades do ENEM.",
      professor: "Crie turmas, cadastre alunos e acompanhe notas e médias.",
    };
    $login.querySelectorAll(".papel-btn").forEach((b) => {
      b.addEventListener("click", () => {
        $login.querySelectorAll(".papel-btn").forEach((x) => x.classList.remove("ativo"));
        b.classList.add("ativo");
        const papel = b.getAttribute("data-papel");
        const campo = document.getElementById("cd-papel");
        if (campo) campo.value = papel;
        const ajuda = document.getElementById("cd-papel-ajuda");
        if (ajuda) ajuda.textContent = ajudaPapel[papel] || ajudaPapel.aluno;
      });
    });

    const btnCriarConta = document.getElementById("btn-criar-conta");
    if (btnCriarConta) btnCriarConta.addEventListener("click", () => alternarCadastro(true));
    const btnJaTenho = document.getElementById("btn-ja-tenho");
    if (btnJaTenho) btnJaTenho.addEventListener("click", () => alternarCadastro(false));

    // ---------- cadastro público: cria a conta grátis e já entra ----------
    const formCad = document.getElementById("form-cadastro");
    if (formCad) {
      formCad.addEventListener("submit", (e) => {
        e.preventDefault();
        const dados = {
          nome: document.getElementById("cd-nome").value.trim(),
          login: document.getElementById("cd-login").value.trim(),
          email: document.getElementById("cd-email").value.trim(),
          senha: document.getElementById("cd-senha").value,
          papel:
            (document.getElementById("cd-papel") || { value: "aluno" }).value === "professor"
              ? "professor"
              : "aluno",
        };
        const btn = formCad.querySelector('button[type="submit"]');
        const textoBtn = btn ? btn.textContent : "";
        const erroBox = document.getElementById("login-erro");

        if (btn) {
          btn.disabled = true;
          btn.textContent = "Criando sua conta…";
        }
        if (erroBox) erroBox.innerHTML = "";

        // Funciona igual no modo local (localStorage) e no modo api (servidor).
        Promise.resolve(DB.criarUsuario(dados))
          .then((r) => {
            if (!r || !r.ok) throw new Error((r && r.erro) || "Não foi possível criar a conta.");
            return Promise.resolve(DB.entrar(dados.login, dados.senha));
          })
          .then((r2) => {
            if (btn) {
              btn.disabled = false;
              btn.textContent = textoBtn;
            }
            if (!r2 || !r2.ok)
              throw new Error((r2 && r2.erro) || "Conta criada, mas não conseguiu entrar. Use o botão abaixo.");
            toast("Conta criada! Seu plano grátis começou. 🎁", "sucesso");
            location.hash = "#/painel";
            render();
          })
          .catch((erro) => {
            if (btn) {
              btn.disabled = false;
              btn.textContent = textoBtn;
            }
            if (erroBox) erroBox.innerHTML = alerta("erro", (erro && erro.message) || String(erro));
          });
      });
    }

    // Link direto para o cadastro: #/entrar/cadastrar já abre o formulário.
    if (String(location.hash).indexOf("cadastrar") >= 0) alternarCadastro(true);
  }

  /* ======================= EVENTOS PÓS-RENDER ======================= */
  function posRender(user, rota) {
    // ---------- PLANO GRÁTIS: cartão com a cota restante no painel ----------
    if (window.Acessos) {
      const seg = String(rota || "").split("/").filter(Boolean)[0] || "";
      const alvo = document.getElementById("view");
      const html = Acessos.resumoHTML();
      if (seg === "painel" && html && alvo && !document.getElementById("plano-gratis")) {
        alvo.insertAdjacentHTML("afterbegin", '<div id="plano-gratis" style="margin-bottom:1.5rem">' + html + "</div>");
      }
    }

    // ---------- formulário de questões (correção automática) ----------
    const form = document.getElementById("form-questoes");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const dados = new FormData(form);
        const nQuestoes = form.querySelectorAll(".questao").length;
        const respostas = [];
        for (let i = 0; i < nQuestoes; i++) {
          respostas.push(dados.get("q" + i) === null ? null : Number(dados.get("q" + i)));
        }
        let ref = form.getAttribute("data-ref");
        let questoes = [];
        const tipo = form.getAttribute("data-tipo");
        const titulo = form.getAttribute("data-titulo");
        const disciplina = form.getAttribute("data-disc");
        const trimestre = Number(form.getAttribute("data-trim")) || 1;

        if (tipo === "texto") {
          const t = getTexto(ref);
          questoes = t ? t.questoes : [];
        } else {
          const a = todasAtividades().find((x) => x.id === ref);
          questoes = a ? a.questoes : [];
        }
        if (!questoes.length) return;

        const r = enviarRespostas({
          tipo: tipo,
          refId: ref,
          titulo: titulo,
          disciplina: disciplina,
          trimestre: trimestre,
          questoes: questoes,
          respostas: respostas,
        });
        if (!r) return;
        mostrarResultado(r.resultado, questoes, titulo);
      });
    }

    // ---------- busca de disciplinas ----------
    const fd = document.getElementById("filtro-disc");
    if (fd) {
      fd.addEventListener("input", () => {
        const t = normalizar(fd.value);
        document.querySelectorAll(".card-materia").forEach((c) => {
          const nome = normalizar(c.querySelector("h3").textContent);
          c.style.display = !t || nome.includes(t) ? "" : "none";
        });
      });
    }

    // ---------- busca de textos ----------
    ["filtro-txt", "filtro-txt-prof"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", () => {
        const t = normalizar(el.value);
        const alvo = document.getElementById(id === "filtro-txt" ? "lista-textos" : "lista-textos-prof");
        if (!alvo) return;
        alvo.querySelectorAll("[data-busca]").forEach((c) => {
          c.style.display = !t || c.getAttribute("data-busca").includes(t) ? "" : "none";
        });
      });
    });

    // ---------- filtro por plataforma nas aulas ----------
    document.querySelectorAll(".chip[data-plat]").forEach((b) =>
      b.addEventListener("click", () => {
        document.querySelectorAll(".chip[data-plat]").forEach((x) => x.classList.remove("ativa"));
        b.classList.add("ativa");
        const p = b.getAttribute("data-plat");
        document.querySelectorAll("#lista-aulas [data-plat]").forEach((el) => {
          el.style.display = p === "todas" || el.getAttribute("data-plat") === p ? "" : "none";
        });
      })
    );

    // ---------- alterar senha ----------
    const bt = document.getElementById("btn-trocar-senha");
    if (bt) {
      bt.addEventListener("click", () => {
        const box = document.getElementById("area-senha");
        box.innerHTML =
          '<div class="pilha" style="max-width:420px">' +
          '<div class="campo"><label>Senha atual</label><input type="password" id="sn-atual"></div>' +
          '<div class="campo"><label>Nova senha</label><input type="password" id="sn-nova"></div>' +
          '<div class="campo"><label>Confirmar nova senha</label><input type="password" id="sn-conf"></div>' +
          '<button class="btn btn-primario" id="sn-salvar">Salvar nova senha</button></div>';
        document.getElementById("sn-salvar").addEventListener("click", () => {
          const atual = document.getElementById("sn-atual").value;
          const nova = document.getElementById("sn-nova").value;
          const conf = document.getElementById("sn-conf").value;
          const u = Store.usuarioAtual();
          if (Store.hash(atual) !== u.senha) return toast("Senha atual incorreta.", "erro");
          if (nova.length < 3) return toast("A nova senha precisa de ao menos 3 caracteres.", "erro");
          if (nova !== conf) return toast("As senhas não conferem.", "erro");
          DB.atualizarUsuario(u.id, { senha: nova });
          toast("Senha alterada com sucesso!", "sucesso");
          box.innerHTML = "";
        });
      });
    }

    // ---------- PROFESSOR: novo aluno ----------
    const bn = document.getElementById("btn-novo-aluno");
    if (bn) {
      bn.addEventListener("click", () => {
        const box = document.getElementById("form-aluno");
        box.style.display = box.style.display === "none" ? "block" : "none";
        if (box.style.display === "none") return;
        box.innerHTML =
          '<div class="cartao-compacto"><h3>Novo aluno</h3>' +
          '<div class="grade grade-2" style="margin-top:1rem">' +
          '<div class="campo"><label>Nome completo</label><input id="na-nome" type="text"></div>' +
          '<div class="campo"><label>E-mail</label><input id="na-email" type="email"></div>' +
          '<div class="campo"><label>Usuário de acesso</label><input id="na-login" type="text"></div>' +
          '<div class="campo"><label>Senha</label><input id="na-senha" type="text" value="1234"></div>' +
          '<div class="campo"><label>Turma</label><input id="na-turma" type="text" value="EM3-A"></div>' +
          "</div><div class=\"linha\" style=\"margin-top:1rem\">" +
          '<button class="btn btn-primario" id="na-salvar">Cadastrar aluno</button>' +
          '<button class="btn btn-fantasma" id="na-cancelar">Cancelar</button></div></div>';
        box.style.display = "block";
        document.getElementById("na-cancelar").addEventListener("click", () => {
          box.style.display = "none";
        });
        document.getElementById("na-salvar").addEventListener("click", () => {
          const r = DB.criarUsuario({
            nome: document.getElementById("na-nome").value,
            email: document.getElementById("na-email").value,
            login: document.getElementById("na-login").value,
            senha: document.getElementById("na-senha").value,
            turma: document.getElementById("na-turma").value,
            papel: "aluno",
          });
          if (!r.ok) return toast(r.erro, "erro");
          toast("Aluno " + r.usuario.nome + " cadastrado!", "sucesso");
          render();
        });
      });
    }

    // ---------- PROFESSOR: AGENDAR AULA AO VIVO ----------
    // O mais simples possível: cola o link, escolhe dia e hora, confirma.
    // A plataforma (Zoom ou Meet) é reconhecida pelo próprio link.
    if (document.getElementById("btn-nova-aula")) {
      const form = document.getElementById("form-aula");
      const inpLink = document.getElementById("aula-link");
      const inpData = document.getElementById("aula-data");
      const dica = document.getElementById("aula-dica");

      // Data de amanhã já preenchida — um clique a menos.
      if (inpData && !inpData.value) {
        const d = new Date(Date.now() + 86400000);
        inpData.value =
          d.getFullYear() +
          "-" +
          String(d.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(d.getDate()).padStart(2, "0");
      }

      document.getElementById("btn-nova-aula").addEventListener("click", () => {
        const abrir = form.style.display === "none";
        form.style.display = abrir ? "block" : "none";
        if (abrir && inpLink) inpLink.focus();
      });

      // Reconhece a plataforma conforme o link é colado.
      if (inpLink && dica) {
        inpLink.addEventListener("input", () => {
          const v = inpLink.value.toLowerCase();
          const ehMeet = /meet\.google/.test(v);
          const ehZoom = /zoom\.us|zoom\.com/.test(v);
          dica.textContent = ehMeet
            ? "Google Meet reconhecido ✅ — os alunos entram por esse link."
            : ehZoom
              ? "Zoom reconhecido ✅ — os alunos entram por esse link."
              : "Cole o link do Zoom ou do Google Meet — a plataforma é reconhecida sozinha.";
        });
      }

      const btnSalvar = document.getElementById("btn-salvar-aula");
      if (btnSalvar) {
        btnSalvar.addEventListener("click", () => {
          const url = inpLink.value.trim();
          const titulo = document.getElementById("aula-titulo").value.trim();
          const data = inpData.value;
          const hora = document.getElementById("aula-hora").value || "19:00";
          const discId = document.getElementById("aula-disc").value;

          if (!url) return toast("Cole o link da sala.", "erro");
          if (!/^https?:\/\//i.test(url))
            return toast("O link precisa começar com http:// ou https://", "erro");
          if (!titulo) return toast("Dê um título para a aula.", "erro");
          if (!data) return toast("Escolha a data da aula.", "erro");

          const v = url.toLowerCase();
          const plataforma = /meet\.google/.test(v) ? "meet" : "zoom";

          DB.salvarAula({
            titulo: titulo,
            descricao: "",
            disciplina: discId,
            plataforma: plataforma,
            link: url,
            senha: "",
            dataISO: data + "T" + hora,
            duracao: 90,
            trimestre: 1,
          });
          toast("Aula agendada! Os alunos já veem o link.", "sucesso");
          render();
        });
      }

      // Remover uma aula da agenda.
      $app.querySelectorAll("[data-aula-del]").forEach((b) =>
        b.addEventListener("click", () => {
          if (!confirm("Remover esta aula da agenda?")) return;
          DB.removerAula(b.getAttribute("data-aula-del"));
          toast("Aula removida.", "sucesso");
          render();
        })
      );
    }

    // ---------- PROFESSOR: notas ----------
    if (document.getElementById("sel-aluno")) {
      const pintar = () => {
        const alunoId = document.getElementById("sel-aluno").value;
        const notas = Store.notasDeAluno(alunoId).slice().sort((a, b) => a.disciplina.localeCompare(b.disciplina));
        const box = document.getElementById("tabela-notas");
        if (!notas.length) {
          box.innerHTML = vazio("📊", "Sem notas para este aluno", "Lance a primeira nota no formulário acima.");
          return;
        }
        box.innerHTML =
          '<div class="tabela-envolve"><table><thead><tr><th>Disciplina</th><th>Trim.</th><th>Tipo</th><th>Nota</th><th>Descrição</th><th></th></tr></thead><tbody>' +
          notas
            .map(
              (n) =>
                "<tr><td><span class=\"forte\">" +
                esc(discNome(n.disciplina)) +
                "</span></td><td>" +
                n.trimestre +
                "º</td><td>" +
                esc(n.tipo) +
                '</td><td><input type="number" min="0" max="10" step="0.1" value="' +
                n.valor +
                '" style="width:80px" data-nota-id="' +
                n.id +
                '"></td><td>' +
                esc(n.descricao || "") +
                '</td><td><button class="btn btn-fantasma btn-pequeno" data-nota-del="' +
                n.id +
                '">🗑</button></td></tr>'
            )
            .join("") +
          "</tbody></table></div>";
        ligarNotas();
      };
      ["sel-aluno", "sel-disc", "sel-trim", "sel-tipo"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("change", pintar);
      });
      document.getElementById("btn-add-nota").addEventListener("click", () => {
        const alunoId = document.getElementById("sel-aluno").value;
        const v = parseFloat(document.getElementById("in-nota").value);
        if (isNaN(v) || v < 0 || v > 10) return toast("Informe uma nota entre 0 e 10.", "erro");
        DB.salvarNota({
          alunoId: alunoId,
          disciplina: document.getElementById("sel-disc").value,
          trimestre: Number(document.getElementById("sel-trim").value),
          tipo: document.getElementById("sel-tipo").value,
          valor: Math.round(v * 10) / 10,
          descricao: document.getElementById("in-desc").value || "Lançamento manual",
        });
        toast("Nota lançada!", "sucesso");
        pintar();
      });
      pintar();
    }

    // ---------- PROFESSOR: corrigir (submeter nota) ----------
    $app.querySelectorAll("[data-sub-salvar]").forEach((b) =>
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-sub-salvar");
        const inp = $app.querySelector('[data-sub-nota="' + id + '"]');
        const v = parseFloat(inp.value);
        if (isNaN(v) || v < 0 || v > 10) return toast("Nota inválida.", "erro");
        const subs = Store.submissoesRecebidas();
        const s = subs.find((x) => x.id === id);
        if (!s) return;
        // sobrescreve a nota da submissão e atualiza a última nota equivalente
        DB.atualizarSubmissao(id, { nota: Math.round(v * 10) / 10 });
        const notas = Store.notas().filter(
          (n) => n.alunoId === s.alunoId && n.descricao.indexOf(s.titulo) >= 0
        );
        const ultima = notas[notas.length - 1];
        if (ultima) DB.salvarNota(Object.assign({}, ultima, { id: ultima.id, valor: Math.round(v * 10) / 10 }));
        toast("Nota atualizada para " + fmtNota(v), "sucesso");
        render();
      })
    );

    // ---------- PROFESSOR: remover ----------
    $app.querySelectorAll("[data-aluno-del]").forEach((b) =>
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-aluno-del");
        const nome = b.getAttribute("data-nome");
        if (!confirm("Remover o aluno " + nome + " e todas as suas notas?")) return;
        DB.removerUsuario(id);
        toast("Aluno removido.", "sucesso");
        render();
      })
    );
    $app.querySelectorAll("[data-aluno-senha]").forEach((b) =>
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-aluno-senha");
        const nova = prompt("Nova senha para o aluno (mínimo 3 caracteres):");
        if (!nova) return;
        if (nova.length < 3) return toast("Senha muito curta.", "erro");
        DB.atualizarUsuario(id, { senha: nova });
        toast("Senha alterada!", "sucesso");
      })
    );
    $app.querySelectorAll("[data-prova-del]").forEach((b) =>
      b.addEventListener("click", () => {
        DB.removerProva(b.getAttribute("data-prova-del"));
        toast("Prova removida.", "sucesso");
        render();
      })
    );

    /* ---------- sistema: testar conexão / recarregar ---------- */
    const btnConexao = document.getElementById("btn-testar-conexao");
    if (btnConexao) {
      btnConexao.addEventListener("click", () => {
        const box = document.getElementById("resultado-conexao");
        box.innerHTML = '<p class="texto-pequeno">Testando a conexão…</p>';
        DB.testar()
          .then((r) => {
            box.innerHTML = alerta(
              "ok",
              "Tudo certo! O servidor respondeu e a conexão está funcionando (" +
                ((r && r.modo) || "ok") +
                ")."
            );
            toast("Conexão testada com sucesso.", "sucesso");
          })
          .catch((e) => {
            box.innerHTML = alerta(
              "erro",
              "Não consegui falar com o servidor: " +
                ((e && e.message) || "erro desconhecido") +
                ". Verifique js/config.js (backend.baseUrl) e se o servidor está ligado."
            );
          });
      });
    }
    const btnRecarregar = document.getElementById("btn-recarregar-dados");
    if (btnRecarregar) {
      btnRecarregar.addEventListener("click", () => {
        const box = document.getElementById("resultado-conexao");
        box.innerHTML = '<p class="texto-pequeno">Buscando os dados no servidor…</p>';
        DB.hidratar()
          .then((ok) => {
            if (ok) toast("Dados atualizados do servidor.", "sucesso");
            else toast("Modo local: não há servidor para buscar dados.", "info");
            render();
          })
          .catch(() => (box.innerHTML = alerta("erro", "Não foi possível buscar os dados.")));
      });
    }

    /* ---------- estúdio de gravação e galeria pública ---------- */
    if (document.getElementById("estudio-form") || document.getElementById("es-iniciar")) {
      ligarEstudio();
    }
    if (document.getElementById("grav-lista")) {
      carregarGravacoes();
    }

    ligarNotas();
  }

  function ligarNotas() {
    document.querySelectorAll("[data-nota-id]").forEach((inp) =>
      inp.addEventListener("change", () => {
        const id = inp.getAttribute("data-nota-id");
        const v = parseFloat(inp.value);
        if (isNaN(v) || v < 0 || v > 10) return toast("Nota inválida (0 a 10).", "erro");
        const nota = Store.notas().find((n) => n.id === id);
        if (nota) DB.salvarNota(Object.assign({}, nota, { valor: Math.round(v * 10) / 10 }));
        toast("Nota atualizada.", "sucesso");
      })
    );
    document.querySelectorAll("[data-nota-del]").forEach((b) =>
      b.addEventListener("click", () => {
        DB.removerNota(b.getAttribute("data-nota-del"));
        toast("Nota removida.", "sucesso");
        render();
      })
    );
  }

  /* ---------- resultado da correção ---------- */
  function mostrarResultado(res, questoes, titulo) {
    const box = document.getElementById("resultado");
    if (!box) return;
    const letras = ["A", "B", "C", "D", "E"];
    const cor = res.nota >= 7 ? "ok" : res.nota >= 5 ? "ambar" : "erro";
    let h =
      '<div class="alerta alerta-' +
      cor +
      '" style="margin-bottom:1.25rem"><span>🎯</span><span><strong>Você acertou ' +
      res.acertos +
      " de " +
      res.total +
      " — nota " +
      fmtNota(res.nota) +
      ".</strong> " +
      (res.nota >= 7
        ? "Excelente desempenho!"
        : res.nota >= 5
          ? "Bom caminho — revise os itens errados."
          : "Não desanime: leia os comentários e tente de novo.") +
      "</span></div>";
    res.detalhe.forEach((d, i) => {
      const q = questoes[i];
      h +=
        '<div class="questao"><div class="questao-topo"><span class="badge ' +
        (d.ok ? "badge-verde" : "badge-vermelho") +
        '">Questão ' +
        (i + 1) +
        " · " +
        (d.ok ? "acertou" : "errou") +
        "</span></div>";
      (q.alternativas || []).forEach((alt, j) => {
        let cls = "opcao";
        if (j === d.correta) cls += " correta";
        else if (j === d.escolhida) cls += " incorreta";
        h +=
          '<div class="' +
          cls +
          '"><span class="letra">' +
          letras[j] +
          "</span><span>" +
          alt +
          "</span></div>";
      });
      if (d.comentario) {
        h +=
          '<div class="gabarito-box" style="margin-top:1rem"><span class="g-icone">💡</span>' +
          "<div><h4>Comentário do professor</h4><p>" +
          d.comentario +
          "</p></div></div>";
      }
      h += "</div>";
    });
    h +=
      '<div class="linha" style="margin-top:1.5rem">' +
      '<a class="btn btn-secundario" href="#/atividades">Ver outras atividades</a>' +
      '<button class="btn btn-accent" onclick="TutorApp.abrirTutor(\'' +
      (questoes.length ? window.__ultimaDisc : "") +
      "');return false;\">💬 Tirar dúvida com o Professor Virtual</button></div>";
    box.innerHTML = h;
    box.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ======================= INICIALIZAÇÃO ======================= */
  window.TutorApp = {
    abrirTutor: function (disc) {
      abrirTutor(disc, null);
    },
    // Correção das questões de vestibular (js/vestibulares.js)
    corrigirVestibular: corrigirVestibular,
  };

  /* API pública (útil para testes, integrações e debug no console) */
  window.App = {
    render: render,
    navegar: function (hash) {
      location.hash = hash;
    },
    rota: rotaAtual,
    login: function (login, senha) {
      return DB.entrar(login, senha).then((r) => {
        render();
        return r;
      });
    },
    logout: function () {
      DB.sair();
      render();
    },
    textos: todosTextos,
    texto: getTexto,
    atividades: todasAtividades,
    aulas: todasAulas,
    corrigir: corrigir,
    enviar: enviarRespostas,
    totais: function () {
      return {
        disciplinas: unir(window.DISCIPLINAS).length,
        textos: todosTextos().length,
        atividades: todasAtividades().length,
        aulas: todasAulas().length,
        usuarios: Store.usuarios().length,
        alunas: Store.usuarios("aluno").length,
        questoesSimulado: unir(window.SIMULADO_QUESTOES).length,
        kbTutor: unir(window.TUTOR_KB).length,
      };
    },
  };

  window.addEventListener("hashchange", render);

  function init() {
    if (!window.localStorage) {
      alert("Seu navegador não suporta armazenamento local. Use um navegador atualizado.");
    }
    // No modo "api" buscamos os dados do servidor antes de desenhar a tela.
    Promise.resolve(typeof DB.hidratar === "function" ? DB.hidratar() : false).finally(() => render());
  }

  init();
})();
