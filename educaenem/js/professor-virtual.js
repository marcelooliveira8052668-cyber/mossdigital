/* =============================================================================
   PROFESSOR VIRTUAL — EducaEnem
   Motor de dúvidas presente em TODAS as disciplinas.
   Combina: base de conhecimento (TUTOR_KB) + roteiros + glossário
            + contexto da aula atual (texto, habilidades, questões).
   Postura: didática e acolhedora. Nunca entrega o gabarito de bandeja —
   dá a dica, conduz o raciocínio e só confirma depois.
   ============================================================================= */

const Tutor = (() => {
  const KB = typeof TUTOR_KB !== "undefined" ? TUTOR_KB : [];
  const ROTEIROS = typeof TUTOR_ROTEIROS !== "undefined" ? TUTOR_ROTEIROS : {};
  const GLOSSARIO = typeof TUTOR_GLOSSARIO !== "undefined" ? TUTOR_GLOSSARIO : [];

  const STOP = new Set(
    (
      "a o as os um uma uns umas de do da dos das em no na nos nas pra para por pelo pela com " +
      "e ou mas que se ao aos à às como quando qual quais quanto quanta onde porque pois " +
      "eu me meu minha meu tu te teu tua ele ela eles elas nos nos vos voce voces voce nos " +
      "isso isto esse essa este esta aquele aquela aquilo ser estar tem ter sou eh sao era " +
      "faz fazer foi sao muito mais menos entre sobre tambem nao sim gostaria queria quero " +
      "pode poderia explica explicar me da dar apenas somente entao ai la ca ta tô"
    ).split(" ")
  );

  /* ---------- normalização ---------- */
  function norm(t) {
    return String(t || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function tokens(t) {
    return norm(t)
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP.has(w));
  }

  /* ---------- pontuação de um item da KB ---------- */
  function pontuar(item, qTextoNorm, qTokens, ctx) {
    let s = 0;
    const gatilhos = (item.gatilhos || []).map(norm);
    gatilhos.forEach((g) => {
      if (g.length < 3) return;
      if (qTextoNorm.includes(g)) {
        s += qTextoNorm.split(" ").includes(g) ? 6 : 3;
      }
      // match por token
      qTokens.forEach((tk) => {
        if (tk === g) s += 5;
        else if (g.includes(tk) || tk.includes(g)) s += tk.length > 4 ? 2 : 0;
      });
    });
    // tema e título
    if (item.tema && qTextoNorm.includes(norm(item.tema))) s += 4;
    if (item.titulo && qTextoNorm.includes(norm(item.titulo))) s += 2;

    // bônus se for da disciplina do contexto atual
    if (ctx && ctx.disciplina && item.disciplina === ctx.disciplina) s += 4;
    if (ctx && ctx.disciplina && item.disciplina === "geral") s += 1;
    // penaliza disciplinas diferentes quando há contexto
    if (ctx && ctx.disciplina && item.disciplina && item.disciplina !== ctx.disciplina && item.disciplina !== "geral") {
      s -= 2;
    }
    return s;
  }

  function buscarKB(pergunta, ctx) {
    const qn = norm(pergunta);
    const qt = tokens(pergunta);
    const ranqueados = KB.map((item) => ({
      item,
      s: pontuar(item, qn, qt, ctx),
    }))
      .filter((r) => r.s >= 4)
      .sort((a, b) => b.s - a.s)
      .slice(0, 3);
    return ranqueados.map((r) => r.item);
  }

  function buscarGlossario(pergunta, ctx) {
    const qn = norm(pergunta);
    return GLOSSARIO.filter((g) => {
      const t = norm(g.termo);
      return t.length > 3 && qn.includes(t);
    });
  }

  /* ---------- intenções especiais ---------- */
  function querGabarito(q) {
    const qn = norm(q);
    return /(gabarito|resposta certa|resposta correta|alternativa correta|qual (e )?(a )?resposta|me fala a resposta|fala a resposta|qual a resposta|resposta da questao|so a resposta|cola)/.test(
      qn
    );
  }

  function querAjuda(q) {
    const qn = norm(q);
    return /(nao entendi|nao consigo|dificil|duvida|me ajuda|como assim|como faz|nao sei|travou|bloqueou|esqueci)/.test(qn);
  }

  function apoioEmocional(q) {
    const qn = norm(q);
    return /(ansiedade|ansioso|ansiosa|nervoso|nervosa|estresse|cansado|cansada|desanim|desisti|nao vou conseguir|pressao|deprim|sobrecarreg|medo)/.test(
      qn
    );
  }

  const APOIO = [
    "<p>Respira fundo — isso é mais comum do que parece, e passa. 💚</p>" +
      "<p>Olha o que funciona de verdade no ENEM:</p>" +
      "<ul>" +
      "<li><strong>Metas pequenas</strong>: em vez de 'vou passar', hoje eu resolvo 5 questões de um tema.</li>" +
      "<li><strong>Rotina curta e constante</strong> bate maratão de uma vez. 40 min por dia vale mais que 6 h no domingo.</li>" +
      "<li><strong>Erro é dado</strong>: cada questão que você erra hoje é uma que você não erra na prova.</li>" +
      "</ul>" +
      "<p>Quer que eu monte com você um plano de 30 minutos para agora? Me diga a disciplina que mais te assusta.</p>",
  ];

  const SEM_RESPOSTA = [
    "<p>Boa pergunta! Não encontrei essa resposta específica no material desta aula, mas vou te ajudar pelo raciocínio. 🧠</p>" +
      "<p>Me conta o que o enunciado está pedindo e qual trecho você não entendeu. Enquanto isso, uma dica geral que funciona em quase todas as questões do ENEM:</p>" +
      "<ul>" +
      "<li>Leia o enunciado <strong>duas vezes</strong> e sublinhe o comando (o que ele pede, de fato).</li>" +
      "<li>Antes das alternativas, tente responder <strong>com suas palavras</strong>.</li>" +
      "<li>Descarte as alternativas absurdas — geralmente sobram duas, e aí a disputa é por detalhe.</li>" +
      "</ul>" +
      "<p>Pode mandar a questão aqui que a gente resolve juntos, passo a passo.</p>",
  ];

  function dicaSocratica(ctx) {
    const dicas = [
      "<p>Eu não entrego a resposta — isso tiraria o seu aprendizado. 😄 Mas te dou o caminho:</p>" +
        "<ol>" +
        "<li>Releia o enunciado e grife <strong>o que está sendo pedido</strong>.</li>" +
        "<li>Liste os <strong>dados</strong> que o problema te deu.</li>" +
        "<li>Lembre do conceito envolvido: você consegue escrever a fórmula, a lei ou a definição?</li>" +
        "<li>Substitua os dados e teste as alternativas, começando pelas que você já descartou.</li>" +
        "</ol>" +
        "<p>Me diga onde travou exatamente — na leitura, no conceito ou na conta — que eu te dou a próxima pista.</p>",
      "<p>Vamos por partes. Me responde três coisas:</p>" +
        "<ol>" +
        "<li>Qual é a <strong>pergunta</strong> da questão?</li>" +
        "<li>Quais informações você já usou?</li>" +
        "<li>Qual alternativa você acha mais provável, mesmo sem certeza?</li>" +
        "</ol>" +
        "<p>Com isso eu consigo te mostrar o erro ou confirmar seu raciocínio — e você aprende o caminho, não só o resultado.</p>",
    ];
    return dicas[Math.floor(Math.random() * dicas.length)];
  }

  /* ---------- resposta principal ---------- */
  function responder(pergunta, ctx) {
    ctx = ctx || {};
    const q = String(pergunta || "").trim();
    if (!q) return { html: "<p>Escreve sua dúvida que eu te ajudo! 👋</p>", fonte: [] };

    // 0. apoio emocional tem prioridade
    if (apoioEmocional(q)) {
      return { html: APOIO[0], fonte: [{ titulo: "Apoio ao estudante" }] };
    }

    // 1. pedido de gabarito -> dica socrática
    if (querGabarito(q)) {
      // se ele já tentou e errou, aí sim explicamos
      if (ctx.jaTentou) {
        const achados = buscarKB(q, ctx);
        if (achados.length) return { html: conteudoItem(achados[0]), fonte: [achados[0]] };
      }
      return { html: dicaSocratica(ctx), fonte: [] };
    }

    // 2. glossário
    const gl = buscarGlossario(q, ctx);
    if (gl.length) {
      const html =
        "<p><strong>" +
        gl[0].termo +
        "</strong> " +
        gl[0].definicao +
        "</p>" +
        (gl.length > 1
          ? "<p class='texto-pequeno'>Veja também: <em>" +
            gl
              .slice(1, 4)
              .map((g) => g.termo)
              .join(", ") +
            "</em></p>"
          : "");
      return { html, fonte: [{ titulo: "Glossário: " + gl[0].termo }] };
    }

    // 3. base de conhecimento
    const achados = buscarKB(q, ctx);
    if (achados.length) {
      let html = conteudoItem(achados[0]);
      if (achados[1]) {
        html +=
          "<div class='tutor-extra'><p class='texto-pequeno'><strong>Complemento:</strong> " +
          achados[1].tema +
          "</p>" +
          conteudoItem(achados[1]) +
          "</div>";
      }
      return { html, fonte: achados };
    }

    // 4. contexto da aula atual
    if (ctx.textoCorpo) {
      const alvo = norm(q)
        .split(" ")
        .filter((w) => w.length > 4);
      const trechos = (ctx.textoCorpo.match(/<p>[\s\S]*?<\/p>/g) || []).filter((p) => {
        const pn = norm(p.replace(/<[^>]+>/g, ""));
        return alvo.some((w) => pn.includes(w));
      });
      if (trechos.length && /(texto|enunciado|leitura|trecho|passagem|materia|material|sobre o que)/.test(norm(q))) {
        return {
          html:
            "<p>Olha o que o texto desta aula diz sobre isso:</p>" +
            trechos.slice(0, 2).join("") +
            "<p>Quer que eu relacione esse trecho com a questão que você está resolvendo?</p>",
          fonte: ctx.textoTitulo ? [{ titulo: ctx.textoTitulo }] : [],
        };
      }
    }

    // 5. fallback
    return {
      html: (querAjuda(q) ? "<p>Calma, a gente chega lá. </p>" : "") + escolher(SEM_RESPOSTA),
      fonte: [],
    };
  }

  function conteudoItem(item) {
    let html = "<p class='tutor-tema'><strong>" + (item.tema || item.titulo || "") + "</strong></p>";
    html += item.conteudo || "";
    return html;
  }

  function escolher(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* ---------- roteiro de aula (abertura) ---------- */
  function saudacao(disciplinaId) {
    const r = ROTEIROS[disciplinaId];
    const disc = typeof disciplinaPorId === "function" ? disciplinaPorId(disciplinaId) : null;
    const nome = disc ? disc.nome : "nossa disciplina";
    let html =
      "<p>Olá! Eu sou o <strong>Professor Virtual</strong> de " + nome + ". 👋</p>";
    if (r && r.objetivos && r.objetivos.length) {
      html += "<p>Nesta aula, nossos objetivos são:</p><ul>";
      r.objetivos.forEach((o) => (html += "<li>" + o + "</li>"));
      html += "</ul>";
    }
    if (r && r.pontosChave && r.pontosChave.length) {
      html += "<p><strong>Fique atento a:</strong></p><ul>";
      r.pontosChave.forEach((p) => (html += "<li>" + p + "</li>"));
      html += "</ul>";
    }
    html +=
      "<p>Pode me perguntar qualquer coisa — conceito, resolução de exercício ou 'não entendi'. " +
      "Se travar, eu te dou a pista. Vamos começar! 🚀</p>";
    return html;
  }

  function sugestoes(disciplinaId) {
    const base = [
      "Me explica este conteúdo",
      "Tenho dúvida em uma questão",
      "Como estudar isso para o ENEM?",
      "Qual o erro mais comum aqui?",
    ];
    const especificas = {
      matematica: ["Como resolver porcentagem?", "Quando usar regra de três?"],
      fisica: ["Qual a diferença entre as leis de Newton?"],
      quimica: ["Como balancear uma equação?"],
      biologia: ["Como saber se é dominante ou recessivo?"],
      historia: ["Qual a diferença entre República Velha e Era Vargas?"],
      sociologia: ["O que é mais-valia?"],
      filosofia: ["Explique o imperativo categórico"],
      geografia: ["O que é macrocefalia urbana?"],
      redacao: ["Como fazer uma proposta de intervenção?"],
      linguagens: ["Como identificar a função da linguagem?"],
      literatura: ["Diferença entre Romantismo e Modernismo?"],
      ingles: ["Quais são os falsos cognatos mais cobrados?"],
      espanhol: ["Qual a diferença entre 'pero' e 'sino'?"],
    };
    const id = disciplinaId || "";
    const chave = id.indexOf("historia") === 0 ? "historia" : id;
    return base.concat(especificas[chave] || []);
  }

  return {
    responder,
    saudacao,
    sugestoes,
    _norm: norm,
    _kb: KB,
  };
})();

if (typeof window !== "undefined") {
  window.Tutor = Tutor;
}
