/* =============================================================================
   EducaEnem — PONTE DE DADOS (liga as telas ao backend)
   -----------------------------------------------------------------------------
   Este arquivo é o "tradutor" entre o site e o js/backend.js. Ele existe para
   que VOCÊ NÃO PRECISE MEXER EM NENHUMA TELA quando trocar de banco de dados.

   COMO FUNCIONA
     • Modo "local" (padrão): tudo continua no navegador. O comportamento é
       exatamente o de antes — nada muda para quem usa o site.
     • Modo "api": cada coisa que o aluno ou o professor faz (entrar, lançar
       nota, enviar atividade, cadastrar aluno...) é salva no navegador NA HORA
       (a tela não trava) e também enviada ao seu servidor em segundo plano.
       Se a internet cair, o dado fica guardado e a próxima ação tenta de novo.

   Para ligar um banco de verdade, leia backend/README.md. Em resumo:
   edite js/config.js → backend.modo = "api" e informe backend.baseUrl.
   ============================================================================= */
window.DB = (() => {
  "use strict";

  const ETIQUETA = "[EducaEnem]";
  const estado = {
    hidratado: false,
    pendentes: 0,
    ultimoSync: null,
    erros: [],
  };

  /* ---------------------------------------------------------------------------
     utilitários
     --------------------------------------------------------------------------- */
  function apiAtiva() {
    return typeof window.Backend !== "undefined" && window.Backend.modo === "api";
  }

  function textoDoErro(e) {
    if (!e) return "erro desconhecido";
    return e.message || e.erro || String(e);
  }

  function registrarErro(onde, e) {
    const msg = textoDoErro(e);
    estado.erros.push({ onde: onde, msg: msg, quando: new Date().toISOString() });
    if (estado.erros.length > 20) estado.erros.shift();
    console.warn(ETIQUETA, "não foi possível sincronizar", onde + ":", msg);
    avisarTela(onde, msg);
  }

  /* Avisa discretamente no canto da tela (sem interromper o usuário). */
  function avisarTela(onde, msg) {
    try {
      const area = document.getElementById("toast-area");
      if (!area || typeof window.toast !== "function") return;
      window.toast("Não sincronizou " + onde + " com o servidor (" + msg + "). Será reenviado.", "erro");
    } catch (e) {
      /* silencioso: o aviso é opcional */
    }
  }

  /* Envia uma escrita ao servidor sem travar a tela. */
  function espelhar(onde, promessa) {
    if (!apiAtiva() || !promessa || typeof promessa.then !== "function") return null;
    estado.pendentes++;
    return promessa
      .then(() => {
        estado.ultimoSync = new Date().toISOString();
      })
      .catch((e) => registrarErro(onde, e))
      .then(() => {
        estado.pendentes = Math.max(0, estado.pendentes - 1);
      });
  }

  /* Atualiza um registro no navegador e espelha a alteração no servidor. */
  function atualizarUsuarioRemoto(id, patch) {
    const r = Store.atualizarUsuario(id, patch);
    if (r && r.ok) {
      const envio = { id: id };
      Object.keys(patch || {}).forEach((k) => {
        if (k !== "id") envio[k] = patch[k];
      });
      espelhar("alteração do aluno", window.Backend.atualizarUsuario(id, envio));
    }
    return r;
  }

  function remover(rotulo, metodoLocal) {
    return function (id) {
      Store[metodoLocal](id);
      espelhar(rotulo, window.Backend[metodoLocal](id));
      return true;
    };
  }

  /* ---------------------------------------------------------------------------
     ENTRAR / SAIR
     --------------------------------------------------------------------------- */
  function entrar(login, senha) {
    // Sem backend: resposta imediata (como sempre funcionou).
    if (!apiAtiva()) return Promise.resolve(Store.entrar(login, senha));

    return window.Backend
      .entrar(login, senha)
      .then((resposta) => {
        if (resposta && resposta.ok && resposta.usuario) {
          // Guarda o usuário do servidor no cache e abre a sessão.
          const local = Store.registrarSessaoRemota(resposta.usuario);
          if (local) {
            if (resposta.token) {
              try {
                localStorage.setItem("educaenem_token", resposta.token);
              } catch (e) {}
            }
            return { ok: true, usuario: local };
          }
        }
        // Servidor respondeu "não": respeita a decisão dele.
        return resposta || { ok: false, erro: "Não foi possível entrar." };
      })
      .catch((e) => {
        // O servidor foi consultado e disse "não autorizado": respeitamos a
        // decisão — o cache local NÃO pode liberar acesso que o servidor negou.
        if (e && e.detalhe && (e.detalhe.status === 401 || e.detalhe.status === 403)) {
          return { ok: false, erro: e.message || "Usuário ou senha incorretos." };
        }
        // Servidor fora do ar: usa o cadastro local para ninguém ficar travado.
        console.warn(ETIQUETA, "servidor indisponível no login — usando o cadastro local.");
        return Store.entrar(login, senha);
      });
  }

  function sair() {
    try {
      localStorage.removeItem("educaenem_token");
    } catch (e) {}
    Store.sair();
    espelhar("sessão", window.Backend ? window.Backend.sair() : null);
    return true;
  }

  /* ---------------------------------------------------------------------------
     PRIMEIRA CARGA (modo api): traz os dados do servidor para o navegador
     --------------------------------------------------------------------------- */
  function hidratar() {
    if (!apiAtiva()) {
      estado.hidratado = true;
      return Promise.resolve(false);
    }
    const B = window.Backend;
    return Promise.all([
      Promise.resolve(B.listarUsuarios()).catch(() => null),
      Promise.resolve(B.listarNotas()).catch(() => null),
      Promise.resolve(B.listarSubmissoes()).catch(() => null),
      Promise.resolve(B.listarTextos()).catch(() => null),
      Promise.resolve(B.listarAulas()).catch(() => null),
    ])
      .then((res) => {
        Store.importarRemoto({
          usuarios: res[0],
          notas: res[1],
          submissoes: res[2],
          textos: res[3],
          aulas: res[4],
        });
        estado.hidratado = true;
        estado.ultimoSync = new Date().toISOString();
        return true;
      })
      .catch((e) => {
        registrarErro("carregamento dos dados", e);
        return false;
      });
  }

  /* ---------------------------------------------------------------------------
     FACHADA USADA PELAS TELAS
     Regra: grava primeiro no navegador (rápido, funciona off-line) e, se o
     modo for "api", espelha no servidor. O retorno é sempre o mesmo do Store,
     então nenhuma tela precisou ser reescrita.
     --------------------------------------------------------------------------- */
  const fachada = {
    get modo() {
      return apiAtiva() ? "api" : "local";
    },
    get online() {
      return typeof navigator === "undefined" ? true : navigator.onLine !== false;
    },

    info: () =>
      Object.assign(
        {
          modo: fachada.modo,
          online: fachada.online,
          hidratado: estado.hidratado,
          pendentes: estado.pendentes,
          ultimoSync: estado.ultimoSync,
          erros: estado.erros.slice(),
        },
        window.Backend ? { servidor: window.Backend.info() } : {}
      ),

    testar: () =>
      window.Backend
        ? window.Backend.testar()
        : Promise.reject(new Error("js/backend.js não foi carregado.")),

    /* --- sessão --- */
    entrar: entrar,
    sair: sair,
    hidratar: hidratar,

    /* --- usuários --- */
    criarUsuario: (dados) => {
      const r = Store.criarUsuario(dados);
      if (r && r.ok) {
        espelhar(
          "cadastro do aluno",
          window.Backend.criarUsuario({
            id: r.usuario.id,
            nome: r.usuario.nome,
            login: r.usuario.login,
            senha: dados.senha,
            papel: r.usuario.papel,
            email: r.usuario.email,
            turma: r.usuario.turma,
          })
        );
      }
      return r;
    },
    atualizarUsuario: atualizarUsuarioRemoto,
    removerUsuario: remover("remoção do aluno", "removerUsuario"),

    /* --- notas --- */
    salvarNota: (nota) => {
      const salva = Store.salvarNota(nota);
      espelhar("nota", window.Backend.salvarNota(salva));
      return salva;
    },
    removerNota: remover("remoção da nota", "removerNota"),

    /* --- atividades / correções --- */
    salvarSubmissao: (sub) => {
      const salva = Store.salvarSubmissao(sub);
      espelhar("atividade enviada", window.Backend.salvarSubmissao(salva));
      return salva;
    },
    atualizarSubmissao: (id, patch) => {
      const salva = Store.atualizarSubmissao(id, patch);
      espelhar("correção", window.Backend.atualizarSubmissao(id, patch));
      return salva;
    },

    /* --- textos, aulas e provas criados pelo professor --- */
    salvarTextoExtra: (texto) => {
      const salva = Store.salvarTextoExtra(texto);
      espelhar("texto", window.Backend.salvarTextoExtra(salva));
      return salva;
    },
    removerTextoExtra: remover("remoção do texto", "removerTextoExtra"),
    salvarAula: (aula) => {
      const salva = Store.salvarAula(aula);
      espelhar("aula", window.Backend.salvarAula(salva));
      return salva;
    },
    removerAula: remover("remoção da aula", "removerAula"),
    salvarProva: (prova) => {
      const salva = Store.salvarProva(prova);
      espelhar("prova", window.Backend.salvarProva(salva));
      return salva;
    },
    removerProva: remover("remoção da prova", "removerProva"),
  };

  if (apiAtiva()) {
    console.info(
      ETIQUETA,
      "modo api ativo — os dados serão salvos também em",
      window.Backend.info().baseUrl
    );
  }

  return fachada;
})();
