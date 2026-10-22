/* =============================================================================
   EducaEnem — CAMADA LOCAL (navegador / localStorage)
   Usuários (aluno/professor), sessão, correções e notas.

   Este arquivo é o adaptador "local". Quando o site é ligado a um servidor
   de verdade (js/config.js → backend.modo = "api"), quem passa a mandar nos
   dados é o js/backend.js, orquestrado pelo js/db.js — as telas não mudam.
   ============================================================================= */

const Store = (() => {
  const CHAVE = "educaenem_v1";

  /* ---------- hash simples (obscurece a senha; não é segurança real) ---------- */
  function hash(senha) {
    let h = 5381;
    const s = String(senha || "");
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) + h + s.charCodeAt(i)) & 0xffffffff;
    }
    return "h" + (h >>> 0).toString(16);
  }

  /* Compara usuários ignorando maiúsculas e acentos.
     (Definida aqui de propósito: o cadastro não pode depender de nenhum
     outro arquivo carregado antes.) */
  function normalizar(texto) {
    return String(texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function agoraISO() {
    return new Date().toISOString();
  }

  function novoId(prefixo) {
    return prefixo + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  /* ---------- dados iniciais ---------- */
  function seed() {
    /* SITE LIMPO: só a conta do dono. Os alunos são cadastrados pelo professor. */
    const usuarios = [
      {
        id: "u-prof",
        nome: "Prof. Marcelo Oliveira",
        login: "marcelo",
        senha: hash("1234"),
        papel: "professor",
        email: "marcelo.oliveira@educaenem.com",
        turma: null,
        formacao: "História e Sociologia",
        bio: "Professor responsável pelas turmas do ENEM 2026.",
        criadoEm: "2026-01-05T10:00:00.000Z",
      },
    ];

    /* SITE LIMPO: nenhuma nota inventada de fábrica.
       O boletim começa vazio — só o que o professor lançar de verdade aparece. */
    const notas = [];

    return {
      usuarios,
      sessao: null,
      submissoes: [],
      notas,
      provas: [],
      textosExtra: [],
      aulasExtra: [],
      matriculas: [], // o professor matricula os alunos dele
      tutora: {}, // histórico de conversa por aluno
    };
  }

  /* ---------- leitura / escrita ---------- */
  let cache = null;

  /* Versão do esquema. Sobe quando muda a estrutura, para migrar bancos velhos. */
  const VERSAO = 2;

  function carregar() {
    if (cache) return cache;
    try {
      const raw = localStorage.getItem(CHAVE);
      if (raw) {
        cache = JSON.parse(raw);
      } else {
        cache = seed();
        salvar();
      }
    } catch (e) {
      cache = seed();
      try {
        salvar();
      } catch (_) {}
    }

    /* ---------- MIGRAÇÕES (rodam uma vez, por versão) ---------- */
    if (!cache.versao || cache.versao < 2) {
      // v2 — SITE LIMPO: apaga as notas de exemplo que vinham de fábrica.
      // Só são removidas as notas geradas pelo seed (id "nota-N", descrição
      // "Média do Nº trimestre"). Qualquer nota lançada de verdade é preservada.
      if (Array.isArray(cache.notas)) {
        const antes = cache.notas.length;
        cache.notas = cache.notas.filter((n) => {
          const ehSeed =
            /^nota-\d+$/.test(String(n.id || "")) &&
            /^Média do \dº trimestre$/.test(String(n.descricao || ""));
          return !ehSeed;
        });
        if (antes !== cache.notas.length) {
          console.info(
            "[EducaEnem] Site limpo: " +
              (antes - cache.notas.length) +
              " nota(s) de exemplo removida(s)."
          );
        }
      }
      cache.versao = 2;
    }

    if (!cache.versao || cache.versao < 3) {
      // v3 — SITE LIMPO: remove TODOS os alunos de exemplo e tudo que deles
      // depende (notas, submissões, matrículas, progresso, conversa).
      // Sobra só o professor. Depois é ele quem cadastra os alunos reais.
      const ids = (cache.usuarios || [])
        .filter((u) => u.papel === "aluno")
        .map((u) => u.id);
      if (ids.length) {
        const emUso = (id) => ids.indexOf(id) !== -1;
        cache.usuarios = (cache.usuarios || []).filter((u) => u.papel !== "aluno");
        cache.notas = (cache.notas || []).filter((n) => !emUso(n.alunoId));
        cache.submissoes = (cache.submissoes || []).filter((s) => !emUso(s.alunoId));
        cache.matriculas = (cache.matriculas || []).filter((m) => !emUso(m.alunoId));
        cache.progresso = (cache.progresso || []).filter((p) => !emUso(p.usuarioId));
        if (cache.tutora) {
          ids.forEach((id) => {
            delete cache.tutora[id];
          });
        }
        // Se a sessão aberta era de um aluno removido, volta para a entrada.
        if (cache.sessao && emUso(cache.sessao.usuarioId)) cache.sessao = null;
        console.info(
          "[EducaEnem] Site limpo: " +
            ids.length +
            " aluno(s) de exemplo removido(s). Cadastre os seus."
        );
      }
      cache.versao = 3;
    }

    // Bancos salvos antes do controle de progresso: cria a lista vazia.
    // Quem já estuda continua do ZERO — o progresso só sobe com atividade real.
    if (cache && !Array.isArray(cache.progresso)) {
      cache.progresso = [];
      try {
        salvar();
      } catch (_) {}
    }
    try {
      salvar();
    } catch (_) {}
    return cache;
  }

  function salvar() {
    if (!cache) return;
    try {
      localStorage.setItem(CHAVE, JSON.stringify(cache));
    } catch (e) {
      console.warn("Não foi possível salvar (armazenamento cheio?).", e);
    }
  }

  function resetar() {
    cache = seed();
    salvar();
  }

  /* ---------- sessão ---------- */
  function usuarioAtual() {
    const db = carregar();
    if (!db.sessao) return null;
    return db.usuarios.find((u) => u.id === db.sessao.usuarioId) || null;
  }

  function entrar(login, senha) {
    const db = carregar();
    const user = db.usuarios.find(
      (u) => normalizar(u.login) === normalizar(String(login).trim())
    );
    if (!user) return { ok: false, erro: "Usuário não encontrado." };
    if (user.senha !== hash(senha))
      return { ok: false, erro: "Senha incorreta. Tente novamente." };
    if (user.ativo === false) return { ok: false, erro: "Esta matrícula está inativa." };
    db.sessao = { usuarioId: user.id, desde: agoraISO() };
    salvar();
    return { ok: true, usuario: user };
  }

  function sair() {
    const db = carregar();
    db.sessao = null;
    salvar();
  }

  /* ---------- usuários ---------- */
  function usuarios(papel) {
    const db = carregar();
    return papel ? db.usuarios.filter((u) => u.papel === papel) : db.usuarios.slice();
  }

  function usuarioPorId(id) {
    return carregar().usuarios.find((u) => u.id === id) || null;
  }

  function criarUsuario(dados) {
    const db = carregar();
    const login = String(dados.login || "").trim();
    if (!login) return { ok: false, erro: "Informe um nome de usuário." };
    if (db.usuarios.some((u) => normalizar(u.login) === normalizar(login)))
      return { ok: false, erro: "Este nome de usuário já está em uso." };
    if (!dados.senha || String(dados.senha).length < 3)
      return { ok: false, erro: "A senha precisa ter ao menos 3 caracteres." };
    const user = {
      id: novoId("u"),
      nome: dados.nome || login,
      login,
      senha: hash(dados.senha),
      papel: dados.papel === "professor" ? "professor" : "aluno",
      email: dados.email || "",
      turma: dados.turma || "EM3-A",
      criadoEm: agoraISO(),
    };
    db.usuarios.push(user);
    if (user.papel === "aluno") {
      db.matriculas.push({
        alunoId: user.id,
        curso: dados.curso || "ENEM 2026",
        situacao: "ativo",
        desde: agoraISO().slice(0, 10),
      });
    }
    salvar();
    return { ok: true, usuario: user };
  }

  function atualizarUsuario(id, patch) {
    const db = carregar();
    const u = db.usuarios.find((x) => x.id === id);
    if (!u) return { ok: false, erro: "Usuário não encontrado." };
    Object.keys(patch).forEach((k) => {
      if (k === "senha") {
        if (patch.senha) u.senha = hash(patch.senha);
      } else if (k !== "id" && k !== "papel") {
        u[k] = patch[k];
      }
    });
    salvar();
    return { ok: true, usuario: u };
  }

  function removerUsuario(id) {
    const db = carregar();
    db.usuarios = db.usuarios.filter((u) => u.id !== id);
    db.notas = db.notas.filter((n) => n.alunoId !== id);
    db.submissoes = db.submissoes.filter((s) => s.alunoId !== id);
    db.matriculas = db.matriculas.filter((m) => m.alunoId !== id);
    if (db.sessao && db.sessao.usuarioId === id) db.sessao = null;
    salvar();
  }

  /* ---------- notas ---------- */
  function notas() {
    return carregar().notas.slice();
  }

  function notasDeAluno(alunoId) {
    return carregar().notas.filter((n) => n.alunoId === alunoId);
  }

  function salvarNota(nota) {
    const db = carregar();
    if (nota.id) {
      const i = db.notas.findIndex((n) => n.id === nota.id);
      if (i >= 0) {
        db.notas[i] = Object.assign({}, db.notas[i], nota);
        salvar();
        return db.notas[i];
      }
    }
    const nova = Object.assign(
      {
        id: novoId("nota"),
        dataISO: agoraISO(),
        lancadoPor: db.sessao ? db.sessao.usuarioId : null,
      },
      nota
    );
    nova.id = nota.id || nova.id;
    db.notas.push(nova);
    salvar();
    return nova;
  }

  function removerNota(id) {
    const db = carregar();
    db.notas = db.notas.filter((n) => n.id !== id);
    salvar();
  }

  /* ---------- submissões (correção automática) ---------- */
  function salvarSubmissao(sub) {
    const db = carregar();
    const s = Object.assign({ id: novoId("sub"), dataISO: agoraISO() }, sub);
    db.submissoes.push(s);
    salvar();
    return s;
  }

  function submissoesDe(alunoId) {
    return carregar()
      .submissoes.filter((s) => s.alunoId === alunoId)
      .sort((a, b) => b.dataISO.localeCompare(a.dataISO));
  }

  function submissoesRecebidas() {
    const db = carregar();
    return db.submissoes
      .slice()
      .sort((a, b) => b.dataISO.localeCompare(a.dataISO));
  }

  /* ---------- avaliações criadas pelo professor ---------- */
  function provas() {
    return carregar().provas.slice();
  }

  function salvarProva(prova) {
    const db = carregar();
    const p = Object.assign({ id: novoId("prova"), dataISO: agoraISO() }, prova);
    db.provas.push(p);
    salvar();
    return p;
  }

  function removerProva(id) {
    const db = carregar();
    db.provas = db.provas.filter((p) => p.id !== id);
    salvar();
  }

  /* ---------- textos criados pelo professor ---------- */
  function textosExtra() {
    return carregar().textosExtra.slice();
  }

  function salvarTextoExtra(texto) {
    const db = carregar();
    const t = Object.assign({ id: novoId("txt"), criadoEm: agoraISO() }, texto);
    db.textosExtra.push(t);
    salvar();
    return t;
  }

  function removerTextoExtra(id) {
    const db = carregar();
    db.textosExtra = db.textosExtra.filter((t) => t.id !== id);
    salvar();
  }

  /* ---------- aulas online criadas pelo professor ---------- */
  function aulasExtra() {
    return carregar().aulasExtra.slice();
  }

  function salvarAula(aula) {
    const db = carregar();
    if (aula.id) {
      const i = db.aulasExtra.findIndex((a) => a.id === aula.id);
      if (i >= 0) {
        db.aulasExtra[i] = Object.assign({}, db.aulasExtra[i], aula);
        salvar();
        return db.aulasExtra[i];
      }
    }
    const nova = Object.assign(
      { id: novoId("aula"), status: "agendada", criadaEm: agoraISO() },
      aula
    );
    db.aulasExtra.push(nova);
    salvar();
    return nova;
  }

  function removerAula(id) {
    const db = carregar();
    db.aulasExtra = db.aulasExtra.filter((a) => a.id !== id);
    salvar();
  }

  /* ---------- histórico do tutor ---------- */
  function tutorHistorico(alunoId) {
    const db = carregar();
    return (db.tutora && db.tutora[alunoId]) || [];
  }

  function tutorSalvar(alunoId, mensagens) {
    const db = carregar();
    if (!db.tutora) db.tutora = {};
    db.tutora[alunoId] = mensagens.slice(-40);
    salvar();
  }

  function tutorLimpar(alunoId) {
    const db = carregar();
    if (db.tutora) delete db.tutora[alunoId];
    salvar();
  }

  /* ---------- integração com o backend (modo "api") ----------
     Quando o site está ligado a um servidor (js/config.js → backend.modo
     = "api"), os dados chegam da nuvem pelo js/db.js. Estas funções só
     colocam esses dados no cache local, para as telas continuarem rápidas
     e funcionando mesmo sem internet. ------------------------------ */
  function importarRemoto(pacote) {
    const db = carregar();
    const p = pacote || {};
    let mudou = false;

    function trazer(campoLocal, lista, preservarSenha) {
      if (!Array.isArray(lista) || !lista.length) return;
      const destino = db[campoLocal];
      lista.forEach((item) => {
        if (!item || !item.id) return;
        const i = destino.findIndex((x) => x.id === item.id);
        if (i < 0) {
          const novo = Object.assign({}, item);
          if (preservarSenha && !novo.senha) novo.senha = hash("");
          destino.push(novo);
        } else {
          const senhaLocal = preservarSenha ? destino[i].senha : null;
          destino[i] = Object.assign({}, destino[i], item);
          if (senhaLocal) destino[i].senha = senhaLocal;
        }
      });
      mudou = true;
    }

    trazer("usuarios", p.usuarios, true);
    trazer("notas", p.notas, false);
    trazer("submissoes", p.submissoes, false);
    trazer("textosExtra", p.textos, false);
    trazer("aulasExtra", p.aulas, false);

    if (mudou) salvar();
    return { ok: true, mudou: mudou };
  }

  /** Usado no login via API: guarda o usuário do servidor e abre a sessão. */
  function registrarSessaoRemota(usuario) {
    const db = carregar();
    if (!usuario || !usuario.id) return null;
    const limpo = Object.assign({}, usuario);
    delete limpo.senha;
    delete limpo.senhaHash;

    const i = db.usuarios.findIndex(
      (u) => u.id === limpo.id || (limpo.login && normalizar(u.login) === normalizar(limpo.login))
    );
    if (i >= 0) {
      const senhaLocal = db.usuarios[i].senha;
      db.usuarios[i] = Object.assign({}, db.usuarios[i], limpo, { senha: senhaLocal });
    } else {
      db.usuarios.push(
        Object.assign({ papel: "aluno", turma: "EM3-A", email: "" }, limpo, { senha: hash("") })
      );
    }

    const ids = db.usuarios.filter((u) => u.id === limpo.id || u.login === limpo.login).map((u) => u.id);
    db.sessao = { usuarioId: i >= 0 ? db.usuarios[i].id : limpo.id, desde: agoraISO() };
    const atual = db.usuarios.find((u) => u.id === db.sessao.usuarioId);
    if (atual && atual.papel === "aluno" && !db.matriculas.some((m) => m.alunoId === atual.id)) {
      db.matriculas.push({
        alunoId: atual.id,
        curso: "ENEM 2026",
        situacao: "ativo",
        desde: agoraISO().slice(0, 10),
      });
    }
    salvar();
    return atual || null;
  }

  function atualizarSubmissao(id, patch) {
    const db = carregar();
    const s = db.submissoes.find((x) => x.id === id);
    if (!s) return null;
    Object.keys(patch || {}).forEach((k) => {
      if (k !== "id") s[k] = patch[k];
    });
    salvar();
    return s;
  }

  /* ---------- cálculo de médias ---------- */
  function mediaDoAluno(alunoId, disciplina) {
    const doAluno = notasDeAluno(alunoId);
    const trim = [1, 2, 3]
      .map((t) => {
        const ns = doAluno.filter(
          (n) => n.disciplina === disciplina && n.trimestre === t
        );
        if (!ns.length) return null;
        return ns.reduce((s, n) => s + Number(n.valor || 0), 0) / ns.length;
      })
      .filter((v) => v !== null);
    if (!trim.length) return null;
    return Math.round((trim.reduce((a, b) => a + b, 0) / trim.length) * 100) / 100;
  }

  function mediaGeral(alunoId) {
    const doAluno = notasDeAluno(alunoId);
    const discs = [...new Set(doAluno.map((n) => n.disciplina))];
    if (!discs.length) return null;
    let soma = 0;
    let qtd = 0;
    discs.forEach((d) => {
      const m = mediaDoAluno(alunoId, d);
      if (m !== null) {
        soma += m;
        qtd++;
      }
    });
    return qtd ? Math.round((soma / qtd) * 100) / 100 : null;
  }

  function situacao(media) {
    if (media === null || media === undefined) return { rotulo: "Sem notas", cor: "badge-ambar" };
    if (media >= 7) return { rotulo: "Aprovado", cor: "badge-verde" };
    if (media >= 5) return { rotulo: "Recuperação", cor: "badge-ambar" };
    return { rotulo: "Reprovado", cor: "badge-vermelho" };
  }

  /* =========================================================================
     PROGRESSO DO ALUNO

     Regra do dono do curso: o progresso começa ZERADO e só sobe quando o
     próprio aluno faz alguma coisa — ler um texto, responder questões,
     concluir uma atividade, assistir a aula. O professor NÃO lança progresso.

     Guardamos os itens CONCLUÍDOS, um por item (chave única). Refazer a mesma
     atividade não conta duas vezes.
     ========================================================================= */

  function registrarProgresso(tipo, ref, detalhe) {
    const u = usuarioAtual();
    if (!u || !ref) return null;
    const db = carregar();
    if (!Array.isArray(db.progresso)) db.progresso = [];

    const chave = u.id + ":" + tipo + ":" + ref;
    const existente = db.progresso.filter((p) => p.chave === chave)[0];
    if (existente) {
      // Já contava — só atualiza o detalhe (ex.: acertos) e a data.
      if (detalhe) Object.assign(existente, detalhe);
      existente.em = agoraISO();
      salvar();
      return existente;
    }

    const item = {
      id: novoId("prg"),
      chave: chave,
      usuarioId: u.id,
      tipo: tipo, // texto | atividade | aula | simulado | vestibular | questao
      ref: ref,
      em: agoraISO(),
    };
    if (detalhe) Object.assign(item, detalhe);
    db.progresso.push(item);
    salvar();
    return item;
  }

  function progressoDe(alunoId) {
    const db = carregar();
    const lista = Array.isArray(db.progresso) ? db.progresso : [];
    return lista.filter((p) => p.usuarioId === alunoId);
  }

  function progressoResumo(alunoId) {
    const itens = progressoDe(alunoId);
    const conta = (tipo) => itens.filter((p) => p.tipo === tipo).length;
    const datas = itens.map((p) => p.em).filter(Boolean).sort();
    return {
      itens: itens.length,
      textos: conta("texto"),
      atividades: conta("atividade"),
      aulas: conta("aula"),
      simulados: conta("simulado"),
      vestibulares: conta("vestibular"),
      questoes: conta("questao"),
      primeiro: datas.length ? datas[0] : null,
      ultimo: datas.length ? datas[datas.length - 1] : null,
    };
  }

  return {
    hash,
    resetar,
    carregar,
    usuarioAtual,
    entrar,
    sair,
    usuarios,
    usuarioPorId,
    criarUsuario,
    atualizarUsuario,
    removerUsuario,
    notas,
    notasDeAluno,
    salvarNota,
    removerNota,
    salvarSubmissao,
    submissoesDe,
    submissoesRecebidas,
    provas,
    salvarProva,
    removerProva,
    textosExtra,
    salvarTextoExtra,
    removerTextoExtra,
    aulasExtra,
    salvarAula,
    removerAula,
    tutorHistorico,
    tutorSalvar,
    tutorLimpar,
    importarRemoto,
    registrarSessaoRemota,
    atualizarSubmissao,
    mediaDoAluno,
    mediaGeral,
    situacao,
    registrarProgresso,
    progressoDe,
    progressoResumo,
  };
})();
