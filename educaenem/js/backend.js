/* =============================================================================
   EducaEnem — CAMADA DE DADOS PLUGÁVEL ("a porta pronta")
   -----------------------------------------------------------------------------
   O site inteiro conversa com os dados através deste objeto `Backend`.
   Hoje ele usa o adaptador LOCAL (localStorage). Quando você conectar o seu
   servidor/banco de dados, basta:

       1. editar js/config.js  ->  backend.modo = "api"  e  backend.baseUrl = "https://..."
       2. implementar os endpoints descritos em backend/api.md
          (ou rodar backend/exemplo-servidor.js)

   Nenhuma tela precisa ser reescrita: todos os métodos abaixo já existem
   nas duas versões (local e api) e sempre devolvem Promise.
   ============================================================================= */
window.Backend = (() => {
  "use strict";

  const CFG = (window.EDUCA_CONFIG && window.EDUCA_CONFIG.backend) || {};
  const LS_MODO = "educaenem_backend_modo";

  function modoAtual() {
    try {
      const alt = localStorage.getItem(LS_MODO);
      if (alt === "local" || alt === "api") return alt;
    } catch (e) {}
    return CFG.modo === "api" ? "api" : "local";
  }

  function baseUrl() {
    return String(CFG.baseUrl || "").replace(/\/+$/, "");
  }

  function caminhoDe(recurso) {
    const rec = (CFG.recursos && CFG.recursos[recurso]) || "/" + recurso;
    return rec.charAt(0) === "/" ? rec : "/" + rec;
  }

  /* ---------------- erro padronizado ---------------- */
  function ErroBackend(mensagem, tipo, detalhe) {
    const e = new Error(mensagem);
    e.tipo = tipo || "erro";
    e.detalhe = detalhe;
    return e;
  }

  /* ---------------- requisição HTTP (adaptador api) ---------------- */
  function http(metodo, recurso, corpo, query) {
    if (!baseUrl()) {
      return Promise.reject(
        ErroBackend(
          "Backend em modo api, mas backend.baseUrl não foi configurado em js/config.js.",
          "config"
        )
      );
    }
    const alvo = baseUrl() + caminhoDe(recurso) + (query ? query : "");
    const cabecalhos = { "Content-Type": "application/json" };
    if (CFG.apiKey) cabecalhos["Authorization"] = "Bearer " + CFG.apiKey;

    const controlador = typeof AbortController !== "undefined" ? new AbortController() : null;
    const tempo = CFG.timeout || 15000;
    const idTempo = controlador ? setTimeout(() => controlador.abort(), tempo) : null;

    return fetch(alvo, {
      method: metodo,
      headers: cabecalhos,
      body: corpo != null ? JSON.stringify(corpo) : undefined,
      signal: controlador ? controlador.signal : undefined,
    })
      .then((resp) => {
        if (idTempo) clearTimeout(idTempo);
        return resp.text().then((txt) => {
          let dados = null;
          try {
            dados = txt ? JSON.parse(txt) : null;
          } catch (e) {
            dados = txt;
          }
          if (!resp.ok) {
            const msg = (dados && (dados.erro || dados.message)) || "Falha na requisição (" + resp.status + ").";
            throw ErroBackend(msg, "http", { status: resp.status, dados: dados });
          }
          return dados;
        });
      })
      .catch((e) => {
        if (idTempo) clearTimeout(idTempo);
        if (e && e.tipo) throw e;
        if (e && e.name === "AbortError")
          throw ErroBackend("O servidor demorou demais para responder.", "timeout");
        throw ErroBackend("Não foi possível falar com o servidor.", "rede", e);
      });
  }

  /* ===========================================================================
     ADAPTADOR LOCAL — dados no próprio navegador (padrão)
     =========================================================================== */
  const local = {
    nome: "local",
    disponivel: () => true,

    ping: () => Promise.resolve({ ok: true, modo: "local", onde: "localStorage" }),

    listarUsuarios: (papel) =>
      Promise.resolve(typeof Store !== "undefined" ? Store.usuarios(papel) : []),

    entrar: (login, senha) =>
      Promise.resolve(typeof Store !== "undefined" ? Store.entrar(login, senha) : { ok: false, erro: "Store indisponível." }),

    sair: () => {
      if (typeof Store !== "undefined") Store.sair();
      return Promise.resolve(true);
    },

    criarUsuario: (dados) =>
      Promise.resolve(typeof Store !== "undefined" ? Store.criarUsuario(dados) : { ok: false, erro: "Store indisponível." }),

    atualizarUsuario: (id, patch) =>
      Promise.resolve(
        typeof Store !== "undefined" ? Store.atualizarUsuario(id, patch) : { ok: false, erro: "Store indisponível." }
      ),

    removerUsuario: (id) => {
      if (typeof Store !== "undefined") Store.removerUsuario(id);
      return Promise.resolve(true);
    },

    listarNotas: (alunoId) =>
      Promise.resolve(
        typeof Store !== "undefined" ? (alunoId ? Store.notasDeAluno(alunoId) : Store.notas()) : []
      ),

    salvarNota: (nota) =>
      Promise.resolve(typeof Store !== "undefined" ? Store.salvarNota(nota) : nota),

    removerNota: (id) => {
      if (typeof Store !== "undefined") Store.removerNota(id);
      return Promise.resolve(true);
    },

    listarSubmissoes: (alunoId) =>
      Promise.resolve(
        typeof Store !== "undefined"
          ? alunoId
            ? Store.submissoesDe(alunoId)
            : Store.submissoesRecebidas()
          : []
      ),

    salvarSubmissao: (sub) =>
      Promise.resolve(typeof Store !== "undefined" ? Store.salvarSubmissao(sub) : sub),

    atualizarSubmissao: (id, patch) =>
      Promise.resolve(typeof Store !== "undefined" ? Store.atualizarSubmissao(id, patch) : patch),

    listarPedidos: () => Promise.resolve(window.Loja ? Loja.pedidos() : []),

    salvarPedido: (pedido) => Promise.resolve(window.Loja ? Loja.salvarPedido(pedido) : pedido),

    listarTextos: () => Promise.resolve(typeof Store !== "undefined" ? Store.textosExtra() : []),

    salvarTextoExtra: (texto) =>
      Promise.resolve(typeof Store !== "undefined" ? Store.salvarTextoExtra(texto) : texto),

    removerTextoExtra: (id) => {
      if (typeof Store !== "undefined") Store.removerTextoExtra(id);
      return Promise.resolve(true);
    },

    listarAulas: () => Promise.resolve(typeof Store !== "undefined" ? Store.aulasExtra() : []),

    salvarAula: (aula) =>
      Promise.resolve(typeof Store !== "undefined" ? Store.salvarAula(aula) : aula),

    removerAula: (id) => {
      if (typeof Store !== "undefined") Store.removerAula(id);
      return Promise.resolve(true);
    },

    listarProvas: () => Promise.resolve(typeof Store !== "undefined" ? Store.provas() : []),

    salvarProva: (prova) =>
      Promise.resolve(typeof Store !== "undefined" ? Store.salvarProva(prova) : prova),

    removerProva: (id) => {
      if (typeof Store !== "undefined") Store.removerProva(id);
      return Promise.resolve(true);
    },
  };

  /* ===========================================================================
     ADAPTADOR API — conversa com o SEU servidor (REST)
     =========================================================================== */
  const api = {
    nome: "api",
    disponivel: () => !!baseUrl(),

    ping: () => http("GET", "usuarios", null, "?limite=1").then(() => ({ ok: true, modo: "api", baseUrl: baseUrl() })),

    listarUsuarios: (papel) =>
      http("GET", "usuarios", null, papel ? "?papel=" + encodeURIComponent(papel) : ""),

    entrar: (login, senha) => http("POST", "login", { login: login, senha: senha }),

    sair: () => Promise.resolve(true), // sessão no servidor é resolvida por token

    criarUsuario: (dados) => http("POST", "usuarios", dados),

    atualizarUsuario: (id, patch) =>
      http("PUT", "usuarios", Object.assign({ id: id }, patch || {}), "?id=" + encodeURIComponent(id)),

    removerUsuario: (id) => http("DELETE", "usuarios", null, "?id=" + encodeURIComponent(id)),

    listarNotas: (alunoId) =>
      http("GET", "notas", null, alunoId ? "?alunoId=" + encodeURIComponent(alunoId) : ""),

    salvarNota: (nota) => http("POST", "notas", nota),

    removerNota: (id) => http("DELETE", "notas", null, "?id=" + encodeURIComponent(id)),

    listarSubmissoes: (alunoId) =>
      http("GET", "submissoes", null, alunoId ? "?alunoId=" + encodeURIComponent(alunoId) : ""),

    salvarSubmissao: (sub) => http("POST", "submissoes", sub),

    atualizarSubmissao: (id, patch) =>
      http("PUT", "submissoes", Object.assign({ id: id }, patch || {}), "?id=" + encodeURIComponent(id)),

    listarPedidos: () => http("GET", "pedidos", null, ""),

    // Envia sempre como POST: o servidor faz "upsert" (cria ou atualiza pelo id).
    salvarPedido: (pedido) => http("POST", "pedidos", pedido),

    listarTextos: () => http("GET", "textos", null, ""),

    salvarTextoExtra: (texto) => http("POST", "textos", texto),

    removerTextoExtra: (id) => http("DELETE", "textos", null, "?id=" + encodeURIComponent(id)),

    listarAulas: () => http("GET", "aulas", null, ""),

    salvarAula: (aula) => http("POST", "aulas", aula),

    removerAula: (id) => http("DELETE", "aulas", null, "?id=" + encodeURIComponent(id)),

    listarProvas: () => http("GET", "provas", null, ""),

    salvarProva: (prova) => http("POST", "provas", prova),

    removerProva: (id) => http("DELETE", "provas", null, "?id=" + encodeURIComponent(id)),
  };

  function adaptador() {
    return modoAtual() === "api" ? api : local;
  }

  /* ---------------- fachada pública ---------------- */
  const fachada = {
    get modo() {
      return modoAtual();
    },
    get config() {
      return CFG;
    },
    Erro: ErroBackend,

    /** Troca o modo em tempo de execução e guarda a escolha no navegador. */
    definirModo: (m) => {
      const val = m === "api" ? "api" : "local";
      try {
        localStorage.setItem(LS_MODO, val);
      } catch (e) {}
      console.info("[Backend] modo alterado para:", val);
      return val;
    },

    info: () => ({
      modo: modoAtual(),
      baseUrl: baseUrl() || null,
      adaptador: adaptador().nome,
      recursos: CFG.recursos || {},
    }),

    /** Testa a conexão (útil na tela de configuração do professor). */
    testar: () => adaptador().ping(),
  };

  /* Delega todos os métodos de dados para o adaptador ativo */
  [
    "ping",
    "listarUsuarios",
    "entrar",
    "sair",
    "criarUsuario",
    "atualizarUsuario",
    "removerUsuario",
    "listarNotas",
    "salvarNota",
    "removerNota",
    "listarSubmissoes",
    "salvarSubmissao",
    "atualizarSubmissao",
    "listarPedidos",
    "salvarPedido",
    "listarTextos",
    "salvarTextoExtra",
    "removerTextoExtra",
    "listarAulas",
    "salvarAula",
    "removerAula",
    "listarProvas",
    "salvarProva",
    "removerProva",
  ].forEach((metodo) => {
    fachada[metodo] = function () {
      return adaptador()[metodo].apply(null, arguments);
    };
  });

  console.info(
    "[Backend] modo atual:",
    modoAtual(),
    modoAtual() === "local"
      ? "(dados no navegador — para conectar um banco, edite js/config.js)"
      : "(" + baseUrl() + ")"
  );

  return fachada;
})();
