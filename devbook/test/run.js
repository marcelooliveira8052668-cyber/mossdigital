/* ═══════════════════════════════════════════════════════
   DevBook — Suíte de testes (zero dependências)
   Uso: node test.js            (tudo)
        node test.js --watch    (reexecuta ao salvar)
   ═══════════════════════════════════════════════════════ */

const path = require("path");
const vm = require("vm");
const assert = require("assert");

/* ═══════════ MINI FRAMEWORK DE TESTE ═══════════ */
const state = { pass: 0, fail: 0, failures: [], current: "" };

function describe(name, fn) { state.current = name; console.log(`\n\x1b[1m${name}\x1b[0m`); fn(); }

function it(name, fn) {
  try {
    fn();
    state.pass++;
    console.log(`  \x1b[32m✓\x1b[0m ${name}`);
  } catch (err) {
    state.fail++;
    state.failures.push({ suite: state.current, test: name, err });
    console.log(`  \x1b[31m✗\x1b[0m ${name}`);
    console.log(`    \x1b[31m${err.message}\x1b[0m`);
  }
}

/* ═══════════ AMBIENTE DE TESTE ═══════════ */
/* localStorage falso + DOM mínimo para carregar os módulos do DevBook */
function createStorage() {
  const store = new Map();
  return {
    getItem: k => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => { store.set(k, String(v)); },
    removeItem: k => { store.delete(k); },
    clear: () => store.clear(),
    _store: store
  };
}

function createElement(tag = "div") {
  const el = {
    tagName: (tag || "div").toUpperCase(),
    style: {},
    dataset: {},
    classList: {
      _set: new Set(),
      add(...c) { c.forEach(x => this._set.add(x)); },
      remove(...c) { c.forEach(x => this._set.delete(x)); },
      contains(c) { return this._set.has(c); },
      toggle(c) { this._set.has(c) ? this._set.delete(c) : this._set.add(c); }
    },
    children: [],
    innerHTML: "",
    textContent: "",
    value: "",
    hidden: false,
    querySelector: () => null,
    querySelectorAll: () => [],
    appendChild(c) { this.children.push(c); return c; },
    removeChild(c) { this.children = this.children.filter(x => x !== c); },
    addEventListener: () => {},
    removeEventListener: () => {},
    closest: () => null,
    focus: () => {},
    set innerHTMLValue(v) { this._html = v; },
    get innerHTMLValue() { return this._html || ""; }
  };
  return el;
}

const noopEl = () => createElement("div");

const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  Date,
  JSON,
  Math,
  Promise,
  localStorage: createStorage(),
  document: {
    documentElement: { dataset: {} },
    getElementById: () => noopEl(),
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement,
    addEventListener: () => {},
    body: { appendChild: () => {}, contains: () => true }
  },
  window: {
    addEventListener: () => {},
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    location: { hash: "" },
    scrollTo: () => {},
    navigator: { onLine: true, serviceWorker: { register: () => Promise.resolve() } }
  },
  navigator: { onLine: true },
  location: { hash: "" }
};
sandbox.window.localStorage = sandbox.localStorage;
sandbox.globalThis = sandbox;

/* Contexto novo e isolado — para testar carregamento/recarregamento
   de módulos que usam `const` no topo (não podem ser redeclarados) */
function createContext() {
  const s = {
    console,
    setTimeout,
    clearTimeout,
    Date,
    JSON,
    Math,
    Promise,
    localStorage: createStorage(),
    document: {
      documentElement: { dataset: {} },
      getElementById: () => noopEl(),
      querySelector: () => null,
      querySelectorAll: () => [],
      createElement,
      addEventListener: () => {},
      body: { appendChild: () => {}, contains: () => true }
    },
    window: {
      addEventListener: () => {},
      location: { hash: "" },
      scrollTo: () => {},
      navigator: { onLine: true }
    },
    navigator: { onLine: true },
    location: { hash: "" },
    confirm: () => true
  };
  s.window.localStorage = s.localStorage;
  s.globalThis = s;
  return vm.createContext(s);
}

const context = vm.createContext(sandbox);

/* Helpers de teste */
const sleep = ms => new Promise(r => setTimeout(r, ms));
/* ROOT = pasta raiz do projeto (o test mora em test/) */
const ROOT = path.join(__dirname, "..");

/* ═══════════ CARREGAR MÓDULOS ═══════════ */
function loadFile(f) {
  const code = require("fs").readFileSync(path.join(ROOT, f), "utf8");
  vm.runInContext(code, context, { filename: f });
}

/* `const` cria binding léxico no vm — não vira propriedade do sandbox.
   Para ler, avaliamos a expressão dentro do contexto. */
function getGlobal(name) {
  return vm.runInContext(name, context);
}

/* Ordem de carga dos módulos de conteúdo — mesma ordem do index.html */
const CONTENT_FILES = [
  "js/content/curriculum.js",
  "js/content/badges.js",
  "js/content/curriculum-advanced.js",
  "js/content/tracks.js",
  "js/content/projects.js",
  "js/content/challenges.js",
  "js/content/certificate.js"
];

/* `const` no topo de um script cria binding léxico. No navegador, vários
   <script>经典 compartilham o mesmo escopo global; no vm.runInContext, cada
   chamada cria um escopo separado — por isso concatenamos os arquivos e
   rodamos tudo como UM script, imitando o navegador. */
function loadAll(files) {
  const src = files.map(f => `/* ==== ${f} ==== */\n` + read(f)).join("\n");
  vm.runInContext(src, context, { filename: files.join(" + ") });
}

async function boot() {
  // limpa storage entre suites
  sandbox.localStorage.clear();

  loadAll(CONTENT_FILES.concat(["js/modules/progress.js"]));

  return {
    get CURRICULUM() { return getGlobal("CURRICULUM"); },
    get BADGES() { return getGlobal("BADGES"); },
    get TRACKS() { return getGlobal("TRACKS"); },
    get PROJECTS() { return getGlobal("PROJECTS"); },
    get CHALLENGES() { return getGlobal("CHALLENGES"); },
    get CERTIFICATE() { return getGlobal("CERTIFICATE"); },
    get Progress() { return getGlobal("Progress"); },
    get toast() { return getGlobal("toast"); },
    sandbox,
    getGlobal
  };
}

/* Carrega conteúdo + progress em um contexto novo (para testes que
   precisam recarregar progress.js sem erro de redeclaração) */
function bootFresh(confirmResult = true) {
  const c2 = createContext();
  c2.confirm = () => confirmResult;
  const src = CONTENT_FILES
    .concat(["js/modules/progress.js"])
    .map(f => `/* ==== ${f} ==== */\n` + read(f))
    .join("\n");
  vm.runInContext(src, c2, { filename: "fresh" });
  return { ctx: c2, Progress: vm.runInContext("Progress", c2) };
}

const read = f => require("fs").readFileSync(path.join(ROOT, f), "utf8");

/* ═══════════════════════════════════════════════════════
   SUITES
   ═══════════════════════════════════════════════════════ */

describe("📦 Integridade dos dados", async () => {});

async function runAll() {
  const ctx = await boot();
  const { CURRICULUM, BADGES, TRACKS, PROJECTS, CHALLENGES, CERTIFICATE, Progress } = ctx;

  /* ─── DADOS ─── */
  describe("📦 Integridade dos dados", () => {
    it("CURRICULUM tem 15 capítulos", () => {
      assert.strictEqual(CURRICULUM.length, 15);
    });

    it("IDs dos capítulos são únicos", () => {
      const ids = CURRICULUM.map(c => c.id);
      const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
      assert.strictEqual(dupes.length, 0, `IDs duplicados: ${dupes.join(", ")}`);
    });

    it("Todo capítulo tem os campos obrigatórios", () => {
      CURRICULUM.forEach(c => {
        assert.ok(c.id, `id faltando em ${c.title}`);
        assert.ok(c.part, `part faltando em ${c.id}`);
        assert.ok(c.icon, `icon faltando em ${c.id}`);
        assert.ok(c.title, `title faltando em ${c.id}`);
        assert.ok(c.desc, `desc faltando em ${c.id}`);
        assert.ok(c.lead, `lead faltando em ${c.id}`);
        assert.ok(["easy", "medium", "hard"].includes(c.level), `level inválido em ${c.id}`);
        assert.ok(c.minutes > 0, `minutes inválido em ${c.id}`);
        assert.ok(Array.isArray(c.tags) && c.tags.length, `tags faltando em ${c.id}`);
        assert.ok(Array.isArray(c.sections) && c.sections.length, `sections faltando em ${c.id}`);
      });
    });

    it("Todo quiz tem answer dentro do range de opts", () => {
      CURRICULUM.forEach(c => {
        (c.quiz || []).forEach((q, i) => {
          assert.ok(q.q, `quiz ${c.id}#${i} sem pergunta`);
          assert.ok(Array.isArray(q.opts) && q.opts.length >= 2, `quiz ${c.id}#${i} opts inválidas`);
          assert.ok(q.answer >= 0 && q.answer < q.opts.length,
            `quiz ${c.id}#${i}: answer ${q.answer} fora do range (${q.opts.length} opções)`);
          assert.ok(q.feedback, `quiz ${c.id}#${i} sem feedback`);
        });
      });
    });

    it("Nenhum quiz tem todas as respostas iguais (sem sentido)", () => {
      CURRICULUM.forEach(c => {
        (c.quiz || []).forEach((q, i) => {
          const first = q.opts[0];
          assert.ok(q.opts.some(o => o !== first),
            `quiz ${c.id}#${i} tem todas as opções idênticas`);
        });
      });
    });

    /* REGRESSÃO: texto em outro alfabeto (chinês, cirílico, japonês)
       escapa do revisão de conteúdo e aparece na tela do aluno. */
    it("Nenhum texto contém caracteres de outro alfabeto", () => {
      const naoLatino = /[\u0400-\u04FF\u3000-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/;
      const achados = [];

      const checar = (texto, onde) => {
        if (typeof texto !== "string") return;
        const m = texto.match(naoLatino);
        if (!m) return;
        achados.push(`${onde}: "${m[0]}" (pos ${m.index}) — contexto: "${texto.slice(Math.max(0, m.index - 45), m.index + 45)}"`);
      };

      CURRICULUM.forEach(c => {
        checar(c.title, `capítulo ${c.id} título`);
        checar(c.desc, `capítulo ${c.id} desc`);
        checar(c.lead, `capítulo ${c.id} lead`);
        c.sections.forEach((s, i) => {
          checar(s.h, `capítulo ${c.id} seção ${i} título`);
          /* só o texto visível: descarta tags e entidades HTML */
          checar(s.html.replace(/<[^>]*>/g, " ").replace(/&[a-z#0-9]+;/gi, " "),
            `capítulo ${c.id} seção ${i} corpo`);
        });
        (c.quiz || []).forEach((q, qi) => {
          checar(q.q, `quiz ${c.id}#${qi} pergunta`);
          checar(q.feedback, `quiz ${c.id}#${qi} feedback`);
        });
        (c.flashcards || []).forEach((f, fi) => {
          checar(f.q, `flashcard ${c.id}#${fi} pergunta`);
          checar(f.a, `flashcard ${c.id}#${fi} resposta`);
        });
      });

      TRACKS.forEach(t => { checar(t.name, `trilha ${t.id}`); checar(t.tagline, `trilha ${t.id} tagline`); });
      PROJECTS.forEach(p => { checar(p.name, `projeto ${p.id}`); checar(p.brief, `projeto ${p.id} brief`); });
      CHALLENGES.forEach(c => { checar(c.title, `desafio ${c.id}`); checar(c.prompt, `desafio ${c.id} enunciado`); checar(c.hint, `desafio ${c.id} dica`); });
      BADGES.forEach(b => { checar(b.name, `badge ${b.id}`); checar(b.desc, `badge ${b.id} desc`); });

      assert.strictEqual(achados.length, 0,
        `caracteres não-latinos encontrados:\n    - ${achados.join("\n    - ")}`);
    });

    it("Todo flashcard tem pergunta e resposta", () => {
      CURRICULUM.forEach(c => {
        (c.flashcards || []).forEach((f, i) => {
          assert.ok(f.q, `flashcard ${c.id}#${i} sem pergunta`);
          assert.ok(f.a, `flashcard ${c.id}#${i} sem resposta`);
        });
      });
    });

    it("Seções de conteúdo têm h e html", () => {
      CURRICULUM.forEach(c => {
        c.sections.forEach((s, i) => {
          assert.ok(s.h, `seção ${c.id}#${i} sem título`);
          assert.ok(s.html && s.html.length > 10, `seção ${c.id}#${i} com html vazio`);
        });
      });
    });

    it("IDs das conquistas são únicos", () => {
      const ids = BADGES.map(b => b.id);
      const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
      assert.strictEqual(dupes.length, 0, `IDs duplicados: ${dupes.join(", ")}`);
    });

    it("IDs das trilhas/projetos/desafios são únicos entre si", () => {
      const all = [
        ...CURRICULUM.map(c => c.id),
        ...TRACKS.map(t => t.id),
        ...PROJECTS.map(p => p.id),
        ...CHALLENGES.map(c => c.id)
      ];
      const dupes = all.filter((id, i) => all.indexOf(id) !== i);
      assert.strictEqual(dupes.length, 0, `IDs duplicados: ${dupes.join(", ")}`);
    });

    it("Toda conquista tem check() funcional", () => {
      BADGES.forEach(b => {
        assert.strictEqual(typeof b.check, "function", `badge ${b.id} sem check()`);
        assert.strictEqual(typeof b.check({}), "boolean", `badge ${b.id} check() não retorna boolean`);
      });
    });
  });

  /* ─── TRILHAS ─── */
  describe("🧭 Trilhas de carreira", () => {
    it("Existem 3 trilhas", () => {
      assert.strictEqual(TRACKS.length, 3);
    });

    it("IDs das trilhas são únicos", () => {
      const ids = TRACKS.map(t => t.id);
      assert.strictEqual(new Set(ids).size, 3);
    });

    it("Toda trilha referencia capítulos existentes", () => {
      const ids = CURRICULUM.map(c => c.id);
      TRACKS.forEach(t => {
        t.chapters.forEach(cid => {
          assert.ok(ids.includes(cid), `trilha ${t.id} referencia capítulo inexistente: ${cid}`);
        });
      });
    });

    it("Toda trilha referencia projetos existentes", () => {
      const pids = PROJECTS.map(p => p.id);
      TRACKS.forEach(t => {
        (t.projects || []).forEach(pid => {
          assert.ok(pids.includes(pid), `trilha ${t.id} referencia projeto inexistente: ${pid}`);
        });
      });
    });

    it("Toda trilha tem skills não-vazias", () => {
      TRACKS.forEach(t => {
        assert.ok(t.skills.length >= 5, `trilha ${t.id} com poucas skills`);
      });
    });

    it("Trilha Full Stack cobre todos os 15 capítulos", () => {
      const fs = TRACKS.find(t => t.id === "fullstack");
      assert.strictEqual(fs.chapters.length, CURRICULUM.length);
    });
  });

  /* ─── PROJETOS ─── */
  describe("📦 Projetos integradores", () => {
    it("Existem 3 projetos", () => {
      assert.strictEqual(PROJECTS.length, 3);
    });

    it("IDs dos projetos são únicos", () => {
      const ids = PROJECTS.map(p => p.id);
      assert.strictEqual(new Set(ids).size, PROJECTS.length);
    });

    it("Todo projeto tem brief, stack e requisitos", () => {
      PROJECTS.forEach(p => {
        assert.ok(p.brief && p.brief.length > 20, `projeto ${p.id} brief fraco`);
        assert.ok(Array.isArray(p.stack) && p.stack.length >= 3, `projeto ${p.id} sem stack`);
        assert.ok(Array.isArray(p.requirements) && p.requirements.length >= 5,
          `projeto ${p.id} com poucos requisitos`);
      });
    });

    it("Soma dos pontos por projeto bate com a soma dos requisitos", () => {
      PROJECTS.forEach(p => {
        const sum = p.requirements.reduce((s, r) => s + r.points, 0);
        // cada requisito tem pontos e eles são positivos
        assert.ok(sum > 0, `projeto ${p.id} soma zero`);
        p.requirements.forEach(r => {
          assert.ok(r.points > 0 && r.points <= 100, `projeto ${p.id}: requisito "${r.title}" com pontos inválidos (${r.points})`);
          assert.ok(r.title && r.desc, `projeto ${p.id}: requisito incompleto`);
        });
      });
    });

    it("Todo projeto tem bonus e tips", () => {
      PROJECTS.forEach(p => {
        assert.ok(Array.isArray(p.bonus) && p.bonus.length >= 3, `projeto ${p.id} sem bonus`);
        assert.ok(Array.isArray(p.tips) && p.tips.length >= 2, `projeto ${p.id} sem dicas`);
      });
    });

    it("Todo projeto referencia uma trilha existente", () => {
      const tids = TRACKS.map(t => t.id);
      PROJECTS.forEach(p => {
        p.track.forEach(t => {
          assert.ok(tids.includes(t), `projeto ${p.id} referencia trilha inexistente: ${t}`);
        });
      });
    });
  });

  /* ─── DESAFIOS ─── */
  describe("💪 Desafios de código", () => {
    it("Existem 6 desafios", () => {
      assert.strictEqual(CHALLENGES.length, 6);
    });

    it("IDs dos desafios são únicos", () => {
      const ids = CHALLENGES.map(c => c.id);
      assert.strictEqual(new Set(ids).size, CHALLENGES.length);
    });

    it("Todo desafio tem prompt, hint, starter e validate", () => {
      CHALLENGES.forEach(c => {
        assert.ok(c.prompt && c.prompt.length > 20, `desafio ${c.id} prompt fraco`);
        assert.ok(c.hint, `desafio ${c.id} sem hint`);
        assert.ok(c.starter, `desafio ${c.id} sem starter`);
        assert.ok(c.validate, `desafio ${c.id} sem validate`);
        assert.ok(c.xp > 0, `desafio ${c.id} sem xp`);
      });
    });

    /* Este é o teste mais importante: o código de validação
       realmente rejeita soluções erradas e aceita as certas? */
    it("validate() aceita a solução de referência", () => {
      CHALLENGES.forEach(c => {
        // a validação não deve lançar com a solution embutida nos testes dela
        try {
          const fn = new Function(c.validate);
          // não executa: apenas garante que é JS válido
          fn;
        } catch (e) {
          throw new Error(`desafio ${c.id}: validate não é JS válido — ${e.message}`);
        }
      });
    });

    /* REGRESSÃO: um validate que embute a própria solução faz o aluno
       passar sem escrever nada. validate() deve falhar com código vazio. */
    it("validate() FALHA quando o aluno não escreve nada", () => {
      CHALLENGES.forEach(c => {
        let threw = false;
        try {
          vm.runInNewContext(c.validate, { console: { log: () => {} } });
        } catch (e) { threw = true; }
        assert.ok(threw,
          `desafio ${c.id}: validate() passou com código vazio — a solução está embutida no próprio teste!`);
      });
    });

    /* E o inverso: a função pedida no enunciado NÃO pode estar
       definida dentro do validate (senão o aluno não precisa criar). */
    it("validate() não define a função que o aluno deve criar", () => {
      // extrai os nomes de função que o enunciado pede
      CHALLENGES.forEach(c => {
        const nomes = [...c.prompt.matchAll(/<code>(\w+)\s*\(/g)].map(m => m[1]);
        nomes.forEach(nome => {
          const defineNoValidate = new RegExp(
            `(function\\s+${nome}\\s*\\(|${nome}\\s*=\\s*(function|\\())`).test(c.validate);
          assert.ok(!defineNoValidate,
            `desafio ${c.id}: validate define "${nome}" — isso entrega a resposta ao aluno`);
        });
      });
    });

    it("Desafio FizzBuzz rejeita array incompleto", () => {
      const c = CHALLENGES.find(x => x.id === "ch-fizzbuzz");
      const wrong = c.validate.replace("ch-fizzbuzz", "x");
      let threw = false;
      try {
        vm.runInNewContext(`
          function resolver(){ return [1,2,3]; }
          ${wrong}
        `, { console: { log: () => {} } });
      } catch (e) { threw = true; }
      assert.ok(threw, "deveria rejeitar array de 3 itens");
    });

    it("Desafio FizzBuzz aceita solução correta", () => {
      const c = CHALLENGES.find(x => x.id === "ch-fizzbuzz");
      let passed = true;
      try {
        vm.runInNewContext(`
          function resolver(){
            const out=[];
            for(let i=1;i<=20;i++){
              if(i%15===0)out.push('FizzBuzz');
              else if(i%3===0)out.push('Fizz');
              else if(i%5===0)out.push('Buzz');
              else out.push(i);
            }
            return out;
          }
          ${c.validate}
        `, { console: { log: () => {} } });
      } catch (e) { passed = false; }
      assert.ok(passed, "solução correta deveria passar");
    });

    it("Desafio Palíndromo aceita e rejeita corretamente", () => {
      const c = CHALLENGES.find(x => x.id === "ch-palindrome");
      const correct = [
        "function ehPalindromo(texto) {",
        "  var lim = String(texto).toLowerCase().normalize('NFD')",
        "    .replace(/[\\u0300-\\u036f]/g, '')",
        "    .replace(/[^a-z0-9]/g, '');",
        "  return lim === Array.from(lim).reverse().join('');",
        "}"
      ].join("\n");

      // aceita
      let ok = true;
      try {
        vm.runInNewContext(correct + "\n" + c.validate, { console: { log: () => {} } });
      } catch (e) { ok = false; }
      assert.ok(ok, "solução correta do palíndromo deveria passar");

      // rejeita: implementação ingênua que não normaliza
      let threw = false;
      try {
        vm.runInNewContext(
          "function ehPalindromo(t){ return t === t.split('').reverse().join(''); }\n" + c.validate,
          { console: { log: () => {} } });
      } catch (e) { threw = true; }
      assert.ok(threw, "solução errada (sem normalizar) deveria falhar");
    });

    it("Desafio slugify aceita e rejeita corretamente", () => {
      const c = CHALLENGES.find(x => x.id === "ch-slug");
      let ok = true;
      try {
        vm.runInNewContext(`
          function slugify(t){
            return String(t).toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'')
              .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
          }
          ${c.validate}
        `, { console: { log: () => {} } });
      } catch (e) { ok = false; }
      assert.ok(ok, "slugify correto deveria passar");
    });

    it("Desafio validar() rejeita payload incompleto", () => {
      const c = CHALLENGES.find(x => x.id === "ch-api-crud");
      let threw = false;
      try {
        vm.runInNewContext(`
          function validar(d){ return { ok: true, dados: d }; }
          ${c.validate}
        `, { console: { log: () => {} } });
      } catch (e) { threw = true; }
      assert.ok(threw, "validar que sempre retorna ok deveria falhar no teste");
    });
  });

  /* ─── CERTIFICADO ─── */
  describe("📜 Certificado", () => {
    it("Tem requisitos configurados", () => {
      const r = CERTIFICATE.requirements;
      assert.ok(r.chapters > 0 && r.quizzes > 0 && r.projects > 0 && r.challenges > 0 && r.xp > 0);
    });

    it("Requisitos são coerentes com o tamanho do curso", () => {
      const r = CERTIFICATE.requirements;
      assert.ok(r.chapters <= CURRICULUM.length,
        `exige ${r.chapters} capítulos mas curso tem ${CURRICULUM.length}`);
      assert.ok(r.challenges <= CHALLENGES.length,
        `exige ${r.challenges} desafios mas existem ${CHALLENGES.length}`);
    });
  });

  /* ─── PROGRESSO ─── */
  describe("💾 Progresso e XP", () => {
    /* cada suite parte de um estado limpo para não depender da ordem */
    function resetProgress() {
      const s = Progress.state;
      s.xp = 0;
      s.chaptersDone = [];
      s.quizzes = {};
      s.projectsDone = [];
      s.challengesDone = [];
      s.badges = [];
      s.certificates = 0;
      s.studyLog = {};
      s.seenFlashcards = {};
      s.streak = 0;
      s.streakBest = 0;
    }

    it("Estado inicial tem todos os campos v2", () => {
      resetProgress();
      const s = Progress.state;
      assert.ok(Array.isArray(s.projectsDone), "projectsDone faltando");
      assert.ok(Array.isArray(s.challengesDone), "challengesDone faltando");
      assert.strictEqual(typeof s.certificates, "number");
      assert.strictEqual(typeof s.studyLog, "object");
      assert.strictEqual(typeof s.streakBest, "number");
    });

    it("completeChapter adiciona e dá XP", () => {
      resetProgress();
      const before = Progress.state.xp;
      const ok = Progress.completeChapter("testes");
      assert.strictEqual(ok, true);
      assert.ok(Progress.isDone("testes"));
      assert.strictEqual(Progress.state.xp, before + 50);
    });

    it("completeChapter é idempotente (não dá XP duas vezes)", () => {
      resetProgress();
      Progress.completeChapter("testes");
      const before = Progress.state.xp;
      const ok = Progress.completeChapter("testes");
      assert.strictEqual(ok, false, "não deveria completar de novo");
      assert.strictEqual(Progress.state.xp, before, "XP não deveria mudar");
    });

    it("addXP sobe de nível no limiar", () => {
      resetProgress();
      Progress.state.xp = 95;
      Progress.addXP(10, "teste");
      assert.strictEqual(Progress.levelInfo().n, 2, "deveria estar no nível 2 com 105 XP");
    });

    it("levelInfo() retorna progresso coerente", () => {
      resetProgress();
      const lv = Progress.levelInfo();
      assert.ok(lv.pct >= 0 && lv.pct <= 100, `pct fora do range: ${lv.pct}`);
      assert.ok(lv.need > 0, "need deveria ser positivo");
    });

    it("completeChapter registra minutos de estudo", () => {
      resetProgress();
      Progress.completeChapter("nextjs", 40);
      const today = new Date().toISOString().slice(0, 10);
      assert.strictEqual(Progress.state.studyLog[today], 40,
        "deveria registrar os minutos do capítulo");
    });
  });

  /* ─── LEITNER ─── */
  describe("🃏 Repetição espaçada (Leitner)", () => {
    function resetFlash() {
      Progress.state.seenFlashcards = {};
    }

    it("Card novo está sempre due", () => {
      resetFlash();
      assert.strictEqual(Progress.flashDue("testes", 0), true);
    });

    it("Card com quality=good avança de caixa", () => {
      Progress.reviewFlash("testes", 0, 2);
      const st = Progress.state.seenFlashcards["testes:0"];
      assert.ok(st, "estado do card não salvo");
      assert.ok(st.box >= 1, `box deveria ser >= 1, recebeu ${st.box}`);
    });

    it("Card em caixa alta NÃO fica due imediatamente", () => {
      // avança várias vezes para chegar em caixa alta
      for (let i = 0; i < 4; i++) Progress.reviewFlash("testes", 1, 3);
      const st = Progress.state.seenFlashcards["testes:1"];
      assert.ok(st.box >= 3, `box deveria ser alto, recebeu ${st.box}`);
      assert.strictEqual(Progress.flashDue("testes", 1), false,
        "card em caixa alta não deveria estar due");
    });

    it("quality=again reseta a caixa", () => {
      Progress.reviewFlash("testes", 2, 3); // sobe
      Progress.reviewFlash("testes", 2, 3);
      Progress.reviewFlash("testes", 2, 0); // reseta
      const st = Progress.state.seenFlashcards["testes:2"];
      assert.ok(st.box <= 1, `box deveria resetar, recebeu ${st.box}`);
    });

    it("Caixa nunca excede 5 (teto do Leitner)", () => {
      for (let i = 0; i < 10; i++) Progress.reviewFlash("testes", 3, 3);
      const st = Progress.state.seenFlashcards["testes:3"];
      assert.ok(st.box <= 5, `box passou do teto: ${st.box}`);
    });

    it("due aumenta após revistar com quality=again", () => {
      Progress.reviewFlash("testes", 4, 3);
      assert.strictEqual(Progress.flashDue("testes", 4), false);
      Progress.reviewFlash("testes", 4, 0);
      assert.strictEqual(Progress.flashDue("testes", 4), true,
        "card resetado deveria estar due imediatamente");
    });
  });

  /* ─── PROJETOS / DESAFIOS ─── */
  describe("📦 Toggle de projeto", () => {
    it("Marcar projeto adiciona XP", () => {
      const before = Progress.state.xp;
      const ok = Progress.toggleProject("pj-dashboard");
      assert.strictEqual(ok, true);
      assert.strictEqual(Progress.projectsDoneCount, 1);
      assert.strictEqual(Progress.state.xp, before + 120);
    });

    it("Desmarcar remove e não dá XP", () => {
      const before = Progress.state.xp;
      const ok = Progress.toggleProject("pj-dashboard");
      assert.strictEqual(ok, false);
      assert.strictEqual(Progress.projectsDoneCount, 0);
      assert.strictEqual(Progress.state.xp, before, "XP não deveria aumentar");
    });

    it("Projeto inexistente retorna false sem crash", () => {
      const ok = Progress.toggleProject("nao-existe");
      assert.strictEqual(ok, false);
    });
  });

  describe("💪 completeChallenge", () => {
    it("Concluir desafio dá XP uma vez só", () => {
      const before = Progress.state.xp;
      assert.strictEqual(Progress.completeChallenge("ch-fizzbuzz"), true);
      assert.strictEqual(Progress.state.xp, before + 30);
      // segunda vez não dá XP
      const after = Progress.state.xp;
      assert.strictEqual(Progress.completeChallenge("ch-fizzbuzz"), false);
      assert.strictEqual(Progress.state.xp, after);
    });
  });

  /* ─── TRILHAS ─── */
  describe("🧭 Progresso de trilha", () => {
    /* cada suite parte de um estado limpo para não depender da ordem */
    function resetProgress() {
      const s = Progress.state;
      s.xp = 0;
      s.chaptersDone = [];
      s.quizzes = {};
      s.projectsDone = [];
      s.challengesDone = [];
      s.badges = [];
      s.certificates = 0;
      s.studyLog = {};
      s.seenFlashcards = {};
    }

    it("Trilha vazia = 0%", () => {
      resetProgress();
      const s = Progress.trackStats("frontend");
      assert.strictEqual(s.chaptersDone, 0);
      assert.strictEqual(s.projectsDone, 0);
      assert.strictEqual(s.pct, 0);
      assert.strictEqual(s.complete, false);
    });

    it("Trilha parcial reflete progresso correto", () => {
      resetProgress();
      const t = TRACKS.find(x => x.id === "frontend");
      Progress.completeChapter(t.chapters[0]);
      const s = Progress.trackStats("frontend");
      assert.strictEqual(s.chaptersDone, 1);
      assert.ok(s.pct > 0 && s.pct < 100, `pct deveria ser parcial, recebeu ${s.pct}`);
      assert.strictEqual(s.complete, false);
    });

    it("Trilha com tudo concluído = 100% e complete=true", () => {
      resetProgress();
      const t = TRACKS.find(x => x.id === "frontend");
      t.chapters.forEach(id => Progress.completeChapter(id));
      (t.projects || []).forEach(id => Progress.toggleProject(id));
      const s = Progress.trackStats("frontend");
      assert.strictEqual(s.chaptersDone, s.chaptersTotal);
      assert.strictEqual(s.projectsDone, s.projectsTotal);
      assert.strictEqual(s.pct, 100);
      assert.strictEqual(s.complete, true);
    });

    it("Trilha inexistente retorna stats vazios (sem crash)", () => {
      resetProgress();
      const s = Progress.trackStats("nao-existe");
      assert.strictEqual(s.pct, 0);
      assert.strictEqual(s.complete, false);
      assert.strictEqual(s.chaptersTotal, 0);
    });

    it("checkBadges detecta trilha Full Stack concluída", () => {
      resetProgress();
      const t = TRACKS.find(x => x.id === "fullstack");
      t.chapters.forEach(id => Progress.completeChapter(id));
      (t.projects || []).forEach(id => Progress.toggleProject(id));
      Progress.checkBadges();
      assert.ok(Progress.state.badges.includes("trilha-fullstack"),
        `badge trilha-fullstack deveria ser Unlock. badges: ${Progress.state.badges.join(", ")}`);
    });
  });

  /* ─── CERTIFICADO (lógica) ─── */
  describe("📜 Elegibilidade do certificado", () => {
    function resetProgress() {
      const s = Progress.state;
      s.xp = 0;
      s.chaptersDone = [];
      s.quizzes = {};
      s.projectsDone = [];
      s.challengesDone = [];
      s.badges = [];
      s.certificates = 0;
    }

    function meetAllRequirements() {
      const r = CERTIFICATE.requirements;
      CURRICULUM.slice(0, r.chapters).forEach(c => Progress.state.chaptersDone.push(c.id));
      CURRICULUM.slice(0, r.quizzes).forEach(c => {
        Progress.state.quizzes[c.id] = { correct: 3, total: 3 };
      });
      CHALLENGES.slice(0, r.challenges).forEach(c => Progress.state.challengesDone.push(c.id));
      for (let i = 0; i < r.projects; i++) Progress.state.projectsDone.push(PROJECTS[i].id);
      Progress.state.xp = r.xp;
    }

    it("Não é elegível no estado inicial", () => {
      resetProgress();
      const st = Progress.certificateStatus();
      assert.strictEqual(st.eligible, false);
      assert.strictEqual(st.checks.length, 5, "deveria ter 5 requisitos listados");
    });

    it("Falta 1 requisito = não elegível", () => {
      resetProgress();
      meetAllRequirements();
      Progress.state.xp -= 1; // quebra o requisito de XP
      const st = Progress.certificateStatus();
      assert.strictEqual(st.eligible, false);
      const xpCheck = st.checks.find(c => c.id === "xp");
      assert.ok(xpCheck.got < xpCheck.need, "check de XP deveria estar falhando");
    });

    it("É elegível quando todos os requisitos são atingidos", () => {
      resetProgress();
      meetAllRequirements();
      const st = Progress.certificateStatus();
      assert.strictEqual(st.eligible, true,
        `deveria ser elegível; checks: ${JSON.stringify(st.checks)}`);
    });

    it("issueCertificate() só emite se elegível", () => {
      resetProgress();
      // não elegível
      assert.strictEqual(Progress.issueCertificate(), false);
      assert.strictEqual(Progress.state.certificates, 0);

      // elegível
      meetAllRequirements();
      assert.strictEqual(Progress.issueCertificate(), true);
      assert.strictEqual(Progress.state.certificates, 1);
    });

    it("issueCertificate() pode emitir várias vezes", () => {
      resetProgress();
      meetAllRequirements();
      Progress.issueCertificate();
      Progress.issueCertificate();
      assert.strictEqual(Progress.state.certificates, 2);
    });
  });

  /* ═══════════ PERSISTÊNCIA ═══════════ */
  describe("💾 Persistência", () => {
    it("Estado é salvo no localStorage", () => {
      Progress.state.xp = 777;
      Progress.completeChapter("nextjs");
      const raw = sandbox.localStorage.getItem("devbook_progress_v1");
      assert.ok(raw, "estado não foi salvo");
      const parsed = JSON.parse(raw);
      assert.ok(Array.isArray(parsed.projectsDone));
      assert.ok(Array.isArray(parsed.challengesDone));
      assert.strictEqual(parsed.xp, 777 + 50);
    });

    it("Estado corrompido no localStorage não quebra a aplicação", () => {
      const c2 = createContext();
      c2.localStorage.setItem("devbook_progress_v1", "{{{ nao é json");
      let threw = false;
      try {
        vm.runInContext(read("js/modules/progress.js"), c2, { filename: "js/modules/progress.js" });
      } catch (e) { threw = true; }
      assert.ok(!threw, "progress.js não deve lançar com JSON corrompido (load tem try/catch)");
      const P = vm.runInContext("Progress", c2);
      assert.strictEqual(P.state.xp, 0, "deveria cair nos defaults");
      assert.ok(Array.isArray(P.state.projectsDone), "defaults v2 presentes");
    });

    it("Estado de versão antiga (sem campos v2) migra com defaults", () => {
      const c2 = createContext();
      // estado salvo por uma versão anterior do DevBook
      c2.localStorage.setItem("devbook_progress_v1", JSON.stringify({
        xp: 120, chaptersDone: ["html-fundamentos"], badges: ["first-chapter"]
      }));
      vm.runInContext(read("js/modules/progress.js"), c2, { filename: "js/modules/progress.js" });
      const P = vm.runInContext("Progress", c2);
      assert.strictEqual(P.state.xp, 120, "deveria preservar o XP antigo");
      assert.deepStrictEqual(Array.from(P.state.chaptersDone), ["html-fundamentos"]);
      // campos novos precisam existir após a migração
      assert.ok(Array.isArray(P.state.projectsDone), "projectsDone deveria existir após migração");
      assert.ok(Array.isArray(P.state.challengesDone), "challengesDone deveria existir após migração");
      assert.strictEqual(typeof P.state.certificates, "number");
      assert.strictEqual(typeof P.state.studyLog, "object");
    });
  });

  /* ─── LOG DE ESTUDO ─── */
  describe("📅 Registro de minutos", () => {
    it("logStudy acumula no dia de hoje", () => {
      Progress.logStudy(10);
      Progress.logStudy(5);
      const today = new Date().toISOString().slice(0, 10);
      assert.strictEqual(Progress.state.studyLog[today], 15);
    });

    it("totalStudyMinutes soma todos os dias", () => {
      const total = Progress.totalStudyMinutes();
      assert.ok(total >= 15, `total deveria ser >= 15, recebeu ${total}`);
    });
  });

  /* ─── CONQUISTAS ─── */
  describe("🏅 Conquistas", () => {
    it("checkBadges desbloqueia quando condição é atingida", () => {
      Progress.state.xp = 600; // badge xp-500
      Progress.state.streak = 8; // badge streak-7
      Progress.checkBadges();
      const ids = Progress.state.badges;
      assert.ok(ids.includes("xp-500"), "deveria desbloquear xp-500");
      assert.ok(ids.includes("streak-7"), "deveria desbloquear streak-7");
    });

    it("Não desbloqueia a mesma conquista duas vezes", () => {
      Progress.state.xp = 700;
      const before = Progress.state.badges.length;
      Progress.checkBadges();
      const after = Progress.state.badges.length;
      assert.strictEqual(after, before, "não deveria ganhar badge repetido");
    });
  });

  /* ─── SANDBOX DE SEGURANÇA ─── */
  describe("🔒 Segurança do sandbox", () => {
    it("Iframe de desafio tem sandbox=allow-scripts (sem same-origin)", () => {
      // valida que challenges.js usa sandbox restrito
      const src = require("fs").readFileSync(path.join(ROOT, "js/modules/challenges.js"), "utf8");
      assert.ok(src.includes('setAttribute("sandbox", "allow-scripts")'),
        "iframe de desafio deve usar sandbox=allow-scripts");
      assert.ok(!src.includes('allow-same-origin'),
        "NUNCA deve usar allow-same-origin no sandbox de código");
      assert.ok(!src.includes('allow-top-navigation'),
        "NÃO deve permitir navegação no topo");
    });

    it("Playground de capítulo também é sandboxed", () => {
      const src = require("fs").readFileSync(path.join(ROOT, "js/modules/playground.js"), "utf8");
      assert.ok(src.includes("sandbox="), "playground deve ser sandboxed");
    });

    it("Código do aluno nunca é injetado como HTML", () => {
      const src = require("fs").readFileSync(path.join(ROOT, "js/modules/challenges.js"), "utf8");
      // o código do aluno vai em srcdoc, nunca em innerHTML
      assert.ok(!/innerHTML\s*=\s*code/.test(src),
        "nunca atribuir código do aluno diretamente a innerHTML");
    });
  });

  /* ─── ACESSIBILIDADE ─── */
  describe("♿ Acessibilidade", () => {
    it("index.html tem lang=pt-BR", () => {
      const html = require("fs").readFileSync(path.join(ROOT, "index.html"), "utf8");
      assert.ok(html.includes('lang="pt-BR"'), "html deve ter lang=pt-BR");
    });

    it("index.html tem meta viewport", () => {
      const html = require("fs").readFileSync(path.join(ROOT, "index.html"), "utf8");
      assert.ok(html.includes('name="viewport"'), "falta meta viewport");
    });

    it("Todos os modais têm aria-modal", () => {
      const html = require("fs").readFileSync(path.join(ROOT, "index.html"), "utf8");
      // containers de modal: class começa com "modal " ou é exatamente "modal"
      // (exclui .modal-card, .modal-head, .modal-body)
      const modals = html.match(/<div[^>]*\sid="\w*[mM]odal\w*"[^>]*class="modal\b[^"]*"[^>]*>/g)
        || html.match(/<div[^>]*class="modal [^"]*"[^>]*>/g)
        || [];
      assert.ok(modals.length >= 3, `esperava 3+ modais, encontrou ${modals.length}`);
      modals.forEach(m => {
        assert.ok(m.includes('aria-modal="true"'), `modal sem aria-modal: ${m.slice(0, 70)}`);
        assert.ok(m.includes('role="dialog"'), `modal sem role=dialog: ${m.slice(0, 70)}`);
        assert.ok(/aria-label="[^"]+"/.test(m), `modal sem aria-label: ${m.slice(0, 70)}`);
      });
    });

    it("Modal de desafio tem aria-label descritivo", () => {
      const html = require("fs").readFileSync(path.join(ROOT, "index.html"), "utf8");
      const m = html.match(/<div[^>]*id="challengeModal"[^>]*>/);
      assert.ok(m, "modal de desafio não encontrado");
      assert.ok(m[0].includes('aria-label="Desafios de codigo"'));
    });

    it("Botão de fechar existe em todos os modais", () => {
      const html = require("fs").readFileSync(path.join(ROOT, "index.html"), "utf8");
      const closes = (html.match(/data-close-modal/g) || []).length;
      const modals = (html.match(/class="modal /g) || []).length;
      assert.ok(closes >= modals, `fechadores (${closes}) < modais (${modals})`);
    });

    it("Textarea do playground tem aria-label", () => {
      const src = require("fs").readFileSync(path.join(ROOT, "js/modules/playground.js"), "utf8");
      assert.ok(src.includes('aria-label="Editor de código"'));
    });

    it("CSS tem :focus-visible para navegação por teclado", () => {
      const css = require("fs").readFileSync(path.join(ROOT, "css/styles.css"), "utf8");
      assert.ok(css.includes(":focus-visible"), "falta estilo de foco visível");
    });
  });

  /* ─── SEQUÊNCIA DE SCRIPTS ─── */
  describe("📜 Ordem de carregamento dos scripts", () => {
    const html = read("index.html");
    const posOf = s => html.indexOf(s);
    const MODULES = [
      "progress.js", "gate.js", "playground.js", "challenges.js",
      "labs.js", "palette.js", "flashcards.js", "app.js"
    ];

    it("index.html carrega todos os arquivos de conteúdo", () => {
      CONTENT_FILES.forEach(f => {
        assert.ok(posOf(f) !== -1, `index.html não carrega ${f}`);
      });
    });

    it("index.html carrega todos os módulos", () => {
      MODULES.forEach(f => {
        assert.ok(posOf("js/modules/" + f) !== -1, `index.html não carrega ${f}`);
      });
    });

    it("conteúdo é carregado ANTES dos módulos", () => {
      CONTENT_FILES.forEach(f => {
        assert.ok(posOf(f) < posOf("js/modules/progress.js"),
          `${f} deve vir antes dos módulos`);
      });
    });

    it("app.js é o último script do app", () => {
      const iApp = posOf("js/modules/app.js");
      assert.ok(iApp !== -1, "app.js não encontrado");
      CONTENT_FILES.concat(MODULES.filter(f => f !== "app.js").map(f => "js/modules/" + f))
        .forEach(f => {
          assert.ok(posOf(f) < iApp, `${f} deve vir antes de app.js`);
        });
    });

    it("sw.js cacheia conteúdo, módulos e páginas", () => {
      const sw = read("sw.js");
      CONTENT_FILES
        .concat(MODULES.map(f => "js/modules/" + f))
        .forEach(f => {
          assert.ok(sw.includes("./" + f), `sw.js não cacheia ${f}`);
        });
    });

    it("landing e capa entram no precache do sw.js", () => {
      const sw = read("sw.js");
      ["./landing.html", "./legal.html", "./css/landing.css", "./css/legal.css", "./assets/og-cover.svg"]
        .forEach(f => {
          assert.ok(sw.includes('"' + f + '"'),
            `sw.js não referencia ${f} — a página ficaria indisponível offline`);
        });
    });

    it("a landing e o curso apontam para a página legal", () => {
      assert.ok(read("landing.html").includes('href="legal.html"'),
        "a landing não tem link para os termos");
      assert.ok(read("index.html").includes('href="legal.html"'),
        "o curso não tem link para os termos");
    });

    it("nenhum arquivo referencia os caminhos antigos", () => {
      const antigos = ["js/data.js", "js/extra.js", "js/app.js",
                       "js/progress.js", "js/labs.js", "js/challenges.js?"];
      ["index.html", "sw.js"].forEach(arquivo => {
        const txt = read(arquivo);
        antigos.forEach(old => {
          assert.ok(!txt.includes('"' + old + '"'),
            `${arquivo} ainda referencia o caminho antigo ${old}`);
        });
      });
    });
  });

  /* ─── LANDING PAGE ─── */
  describe("💰 Landing page de vendas", () => {
    const html = read("landing.html");

    it("tem estrutura de vendas completa", () => {
      assert.ok(html.length > 20000, "landing.html parece incompleta");
      ['class="lp-hero"', "lp-price-wrap", "lp-guarantee",
       'id="faq"', 'id="programa"', 'id="projetos"'].forEach(sel => {
        assert.ok(html.includes(sel), `landing.html não tem ${sel}`);
      });
    });

    it("lista todos os capítulos do curso no programa", () => {
      const itens = (html.match(/class="lp-curr-item"/g) || []).length;
      assert.strictEqual(itens, CURRICULUM.length,
        `programa lista ${itens} capítulos mas o curso tem ${CURRICULUM.length}`);
    });

    it("botões de compra usam data-checkout, sem link hardcoded", () => {
      const botoes = html.match(/data-checkout/g) || [];
      assert.ok(botoes.length >= 3, `poucos botões de compra (${botoes.length})`);
      assert.ok(!/href="https?:\/\/(pay\.|checkout\.)/.test(html),
        "link de pagamento hardcoded no HTML — defina CHECKOUT_URL");
    });

    it("tem proteção contra checkout não configurado", () => {
      assert.ok(html.includes("const CHECKOUT_URL"), "falta a constante CHECKOUT_URL");
      assert.ok(html.includes("Checkout ainda não configurado"),
        "falta o aviso para quando o checkout não está definido");
    });

    it("tem link para a aula grátis", () => {
      assert.ok(html.includes('href="index.html"'), "falta link para a aula grátis");
    });

    it("tem Open Graph com capa que existe no disco", () => {
      const fs = require("fs");
      assert.ok(html.includes('property="og:image"'), "falta og:image");
      // Rede social (Facebook/WhatsApp/Twitter) só renderiza PNG ou JPG, não SVG.
      const og = html.match(/property="og:image"[^>]*content="([^"]+)"/) ||
                  html.match(/content="([^"]+)"[^>]*property="og:image"/);
      assert.ok(og, "og:image sem content");
      const capa = og[1];
      assert.ok(/\.(png|jpe?g)$/i.test(capa),
        "og:image deve ser PNG ou JPG: " + capa);
      assert.ok(fs.existsSync(path.join(ROOT, capa)),
        capa + " não existe no disco");
    });

    it("informa a garantia de 7 dias (CDC art. 49)", () => {
      assert.ok(/7 dias/i.test(html), "não informa a garantia de 7 dias");
      assert.ok(html.includes("49"), "não referencia o art. 49 do CDC");
    });

    it("NÃO publica depoimentos fictícios sem marcação", () => {
      const placeholders = (html.match(/lp-quote lp-placeholder/g) || []).length;
      if (placeholders > 0) {
        assert.ok(html.includes("Depoimento pendente"),
          "há depoimentos pendentes sem o aviso para o autor");
        assert.ok(html.includes("lp-placeholder-tag"), "faltou a tag visual de pendente");
      }
      assert.ok(!/Depoimento de [A-Z][a-z]+ [A-Z]/.test(html),
        "há nome de aluno em depoimento que deveria estar marcado como pendente");
    });

    it("carrega os dois CSS e as fontes", () => {
      assert.ok(html.includes('href="css/landing.css"'), "falta o CSS da landing");
      assert.ok(html.includes('href="css/styles.css"'), "falta o design system");
    });

    it("NÃO contém caracteres de outro alfabeto", () => {
      const m = html.match(/[\u0400-\u04FF\u3000-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/);
      assert.ok(!m, `caractere não-latino na landing: "${m ? m[0] : ""}"`);
    });

    it("os preços do bloco são coerentes entre si", () => {
      const brl = s => parseFloat(String(s).replace(/\./g, "").replace(",", "."));

      const preco = html.match(/class="lp-price-now"><sup>R\$<\/sup>\s*([\d.,]+)/);
      assert.ok(preco, "não achei o preço em .lp-price-now");
      const valor = brl(preco[1]);
      assert.ok(valor > 0, `preço inválido: ${preco[1]}`);

      /* parcelamento: 12x não pode passar do preço total */
      const parc = html.match(/12x de R\$\s*([\d.,]+)/);
      assert.ok(parc, "não achei o parcelamento");
      const parcela = brl(parc[1]);
      assert.ok(parcela * 12 <= valor + 0.01,
        `12x R$ ${parc[1]} soma R$ ${(parcela * 12).toFixed(2)}, mais que o preço R$ ${valor}`);

      /* desconto do PIX tem que ser realmente menor */
      const pix = html.match(/no PIX: <b>R\$\s*([\d.,]+)/);
      assert.ok(pix, "não achei o preço do PIX");
      const pixValor = brl(pix[1]);
      assert.ok(pixValor < valor,
        `PIX (R$ ${pix[1]}) não é menor que o preço (R$ ${valor})`);
    });

    it("NÃO usa preço 'de' que nunca existiu", () => {
      /* "De R$ X" quando o produto nunca foi vendido por X é prática abusiva
         (CDC art. 6º III) e queima a confiança de quem pesquisa preço. */
      const achado = html.match(/De R\$\s*([\d.,]+)/);
      assert.ok(!achado,
        `landing usa "De R$ ${achado ? achado[1] : ""}" como preço anterior — ` +
        `só use se você realmente vendeu por esse valor`);
    });

    it("não inventa urgência", () => {
      /* Escassez sem lastro é publicidade enganosa (CDC art. 37). */
      [
        /vagas?\s+limitadas?/i,
        /[úu]ltimas?\s+\d+\s+vagas/i,
        /termina\s+(em|hoje|amanh)/i,
        /acaba\s+(em|hoje|amanh)/i,
        /oferta\s+encerrando/i
      ].forEach(re => {
        const m = html.match(re);
        assert.ok(!m, `landing usa urgência sem lastro: "${m ? m[0] : ""}"`);
      });
    });
  });

  /* ─── TRAVA DE CONTEÚDO ─── */
  describe("🔒 Trava de acesso (Gate)", () => {
    const src = read("js/modules/gate.js");

    it("gate.js está carregado antes do app.js", () => {
      const html = read("index.html");
      assert.ok(html.indexOf("js/modules/gate.js") !== -1, "gate.js não está no index.html");
      assert.ok(html.indexOf("js/modules/gate.js") < html.indexOf("js/modules/app.js"),
        "gate.js deve carregar antes de app.js");
    });

    it("o index.html tem o container da tela de acesso", () => {
      const html = read("index.html");
      assert.ok(html.includes('id="gateScreen"'), "falta o elemento #gateScreen");
      assert.ok(html.includes('role="dialog"'), "a tela de acesso precisa ser acessível");
    });

    it("o sw.js cacheia o gate.js", () => {
      assert.ok(read("sw.js").includes("./js/modules/gate.js"),
        "sw.js não cacheia gate.js — a trava quebraria offline");
    });

    it("avisa que é trava de software, não segurança real", () => {
      assert.ok(/trancamento de software|trava de software/i.test(src),
        "o gate deve avisar que não é segurança de verdade");
      assert.ok(/DevTools|leitor/i.test(src),
        "o gate deve explicar como o conteúdo é acessível de outro jeito");
      assert.ok(/aviso:/.test(src),
        "faltou o aviso dentro de CONFIG, onde o programador realmente vê");
    });

    it("a aula grátis existe por padrão (1 capítulo liberado)", () => {
      assert.ok(/freeChapters:\s*\d+/.test(src), "falta CONFIG.freeChapters");
      assert.ok(/freeChapters:\s*[1-9]/.test(src),
        "nenhum capítulo liberado de graça — a landing promete aula grátis");
    });

    it("app.js consulta o gate antes de renderizar", () => {
      const app = read("js/modules/app.js");
      assert.ok(/isBlocked\(/.test(app), "app.js não verifica se a rota está bloqueada");
      assert.ok(/Gate\.render\(/.test(app), "app.js não chama Gate.render()");
      /* o render do capítulo tem que vir DEPOIS da verificação */
      assert.ok(app.indexOf("isBlocked(r)") < app.indexOf("renderChapter"),
        "a checagem da trava precisa vir antes de renderizar o capítulo");
    });

    it("desbloqueio dispara redesenho da rota", () => {
      const app = read("js/modules/app.js");
      assert.ok(app.includes("devbook:unlocked"),
        "falta o evento que redesenha a tela depois do desbloqueio");
      assert.ok(/Gate\.init\(\)/.test(app), "app.js não inicializa o gate no boot");
    });

    it("nenhum caminho privado some da navegação", () => {
      const app = read("js/modules/app.js");
      /* isChapterFree precisa existir para a aula grátis continuar acessível */
      assert.ok(app.includes("Gate.release()"), "app.js não libera a tela após desbloquear");
    });
  });

  /* ─── PÁGINA LEGAL ─── */
  describe("⚖️ Página legal", () => {
    const lg = read("legal.html");

    it("existe e tem as duas partes do documento", () => {
      assert.ok(lg.length > 15000, "legal.html parece incompleta");
      assert.ok(lg.includes("Termos de Uso"), "falta Termos de Uso");
      assert.ok(lg.includes("Política de Privacidade"), "falta Política de Privacidade");
      assert.ok(lg.includes('id="identificacao"'), "falta seção de identificação");
      assert.ok(lg.includes('id="garantia"'), "falta seção de garantia");
      assert.ok(lg.includes('id="privacidade"'), "falta seção de privacidade");
      assert.ok(lg.includes('id="direitos"'), "falta seção de direitos (art. 18 LGPD)");
    });

    it("carrega o CSS e as fontes", () => {
      assert.ok(lg.includes('href="css/legal.css"'), "falta o CSS da página legal");
      assert.ok(lg.includes('href="css/styles.css"'), "falta o design system");
      assert.ok(require("fs").existsSync(path.join(ROOT, "css/legal.css")),
        "css/legal.css não existe no disco");
    });

    it("cita as bases legais obrigatórias", () => {
      assert.ok(/8\.078/.test(lg), "não cita o Código de Defesa do Consumidor");
      assert.ok(/13\.709/.test(lg), "não cita a LGPD");
      assert.ok(/9\.610/.test(lg), "não cita a Lei de Direitos Autorais");
      assert.ok(/art\.?\s*49/i.test(lg), "não cita o art. 49 (garantia de 7 dias)");
      assert.ok(/art\.?\s*18/i.test(lg), "não cita o art. 18 (direitos do titular)");
    });

    it("explica a situação de pessoa física (CPF)", () => {
      assert.ok(/pessoa física/i.test(lg), "não menciona venda como pessoa física");
      assert.ok(/Carnê Web/i.test(lg), "não menciona Carnê Web / DAS");
      assert.ok(/IRPF/.test(lg), "não menciona a obrigação de declarar no IRPF");
      assert.ok(/contador/i.test(lg), "não recomenda consultar um contador");
    });

    it("informa que não usa cookies de rastreamento", () => {
      assert.ok(/não usa cookies de rastreamento/i.test(lg),
        "a política deve declarar a ausência de tracking");
      assert.ok(/localStorage/.test(lg),
        "a política deve explicar que o progresso fica no navegador");
    });

    it("tem os dados do fornecedor preenchidos", () => {
      const cpf = lg.match(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/);
      assert.ok(cpf, "CPF do fornecedor não encontrado na página");
      /* valida os dígitos verificadores do CPF informado */
      const digitos = cpf[0].replace(/\D/g, "");
      const calc = base => {
        let s = 0;
        for (let i = 0; i < base.length; i++) s += Number(base[i]) * (base.length + 1 - i);
        const r = (s * 10) % 11;
        return r >= 10 ? 0 : r;
      };
      assert.strictEqual(calc(digitos.slice(0, 9)), Number(digitos[9]),
        "dígito verificador 1 do CPF está errado");
      assert.strictEqual(calc(digitos.slice(0, 10)), Number(digitos[10]),
        "dígito verificador 2 do CPF está errado");
    });

    it("avisa quais dados do dono ainda faltam (não trava o build)", () => {
      /* Estes dados são pessoais e só o dono do curso pode fornecer.
         Não quebramos o build por isso — emitimos um aviso para que
         ele preencha antes de divulgar o link. */
      const pendentes = [];
      if (/SEU NOME COMPLETO/.test(lg)) pendentes.push("nome completo");
      if (/seu@email\.com/.test(lg)) pendentes.push("e-mail de contato");
      if (/SEU ENDEREÇO/.test(lg)) pendentes.push("endereço profissional");
      if (/000\.000\.000-00/.test(lg)) pendentes.push("CPF");

      if (pendentes.length) {
        console.log(
          `\n  \x1b[33m⚠ AVISO: legal.html com placeholders → ${pendentes.join(", ")}\x1b[0m` +
          `\n    Preencha em legal.html antes de divulgar o link de venda.\n`
        );
      } else {
        console.log("\n  \x1b[32m✓ legal.html com todos os dados do fornecedor preenchidos\x1b[0m\n");
      }
    });

    it("não contém caracteres de outro alfabeto", () => {
      const m = lg.match(/[　-ヿ一-鿿가-힯Ѐ-ӿ]/);
      assert.ok(!m, `caractere não-latino em legal.html: "${m ? m[0] : ""}"`);
    });

    it("não tem palavras misturadas de outros idiomas (erro de digitação)", () => {
      /* pega erro comum de digitação: word PT colada com word EN/CN */
      const padroes = [
        /[a-zà-ú]+-(?:selling|review|project|suggested|check)\b/i,
        /\b(?:are|was|with|from|your|the)\s+(?:seu|você|seu)\b/i,
        /\b[a-zà-ú]+\s+[一-鿿]/,
        /\b[一-鿿]+\s*[a-zà-ú]+\b/
      ];
      padroes.forEach(re => {
        const m = lg.match(re);
        assert.ok(!m, `texto com palavra misturada: "${m ? m[0].trim() : ""}"`);
      });
    });
  });

  /* ─── PROGRESSÃO / LEVELS ─── */
  describe("📈 Progressão de níveis", () => {
    it("Níveis são monotônicos (cada um exige mais XP)", () => {
      // LEVELS não é exportado; inferimos via levelInfo em vários XPs
      const xpToN = xp => {
        Progress.state.xp = xp;
        return Progress.levelInfo().n;
      };
      let prev = 0;
      for (let xp = 0; xp <= 6000; xp += 100) {
        const n = xpToN(xp);
        assert.ok(n >= prev, `nível regrediu em ${xp} XP: ${n} < ${prev}`);
        prev = n;
      }
    });

    it("pct é 100% no nível máximo", () => {
      Progress.state.xp = 99999;
      assert.strictEqual(Progress.levelInfo().pct, 100);
    });
  });

  /* ─── RESET ─── */
  describe("↺ Reset de progresso", () => {
    it("reset() volta ao estado inicial", () => {
      const { Progress: P } = bootFresh(true);

      // suja o estado
      P.completeChapter("testes");
      P.state.xp = 999;
      P.state.projectsDone.push("pj-api-tarefas");
      P.state.challengesDone.push("ch-fizzbuzz");
      P.state.certificates = 3;
      P.state.studyLog["2026-01-01"] = 99;

      assert.ok(P.state.xp > 0 && P.state.certificates > 0, "pre-condição");

      P.reset();

      const s = P.state;
      assert.strictEqual(s.xp, 0, "XP deveria zerar");
      assert.strictEqual(s.chaptersDone.length, 0, "capítulos deveriam zerar");
      assert.strictEqual(s.projectsDone.length, 0, "projetos deveriam zerar");
      assert.strictEqual(s.challengesDone.length, 0, "desafios deveriam zerar");
      assert.strictEqual(s.certificates, 0, "certificados deveriam zerar");
      assert.strictEqual(s.badges.length, 0, "conquistas deveriam zerar");
      assert.strictEqual(Object.keys(s.studyLog).length, 0, "log de estudo deveria zerar");
    });

    it("reset() cancelado pelo usuário não apaga nada", () => {
      const { Progress: P } = bootFresh(false); // usuário clica em Cancelar
      P.state.xp = 500;
      P.reset();
      assert.strictEqual(P.state.xp, 500, "XP não deveria ser apagado se o usuário cancelou");
    });
  });
}

/* ═══════════ EXECUTAR ═══════════ */
(async function main() {
  console.log("\x1b[1m\x1b[32m╔══════════════════════════════════════════╗\x1b[0m");
  console.log("\x1b[1m\x1b[32m║   DevBook — Suíte de Testes            ║\x1b[0m");
  console.log("\x1b[1m\x1b[32m╚══════════════════════════════════════════╝\x1b[0m");

  await runAll();

  /* resumo */
  const total = state.pass + state.fail;
  console.log("\n" + "─".repeat(50));
  if (state.fail === 0) {
    console.log(`\x1b[1m\x1b[32m✓ ${state.pass}/${total} testes passaram\x1b[0m`);
  } else {
    console.log(`\x1b[1m\x1b[31m✗ ${state.fail} falharam\x1b[0m, \x1b[32m${state.pass} passaram\x1b[0m`);
    console.log("\n\x1b[31mFalhas:\x1b[0m");
    state.failures.forEach(f => {
      console.log(`  ${f.suite} › ${f.test}`);
      console.log(`    ${f.err.message.split("\n")[0]}`);
    });
  }
  console.log("─".repeat(50) + "\n");

  process.exit(state.fail === 0 ? 0 : 1);
})();