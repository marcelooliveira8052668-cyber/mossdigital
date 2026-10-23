/* ═══════════════════════════════════════════════════════
   DevBook — CURRÍCULO — capítulos 12 a 15
   Continuação do currículo. Roda DEPOIS de content/curriculum.js.
   ═══════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   DevBook — Expansão do curso
   Novos capítulos, trilhas de carreira, projetos
   integradores e desafios de código com validação.
   Carregado depois de data.js (CURRICULUM é mutável).
   ═══════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────────────
   CAPÍTULOS AVANÇADOS (Parte 5 e 6)
   ─────────────────────────────────────────────────────── */

CURRICULUM.push(
{
  id: "testes",
  part: "Parte 5 — Profissionalização",
  icon: "🧪",
  title: "Testes automatizados: confiança no código",
  desc: "Unit tests, Jest, testes de integração e a pirâmide de testes.",
  level: "hard",
  minutes: 40,
  tags: ["Testes", "Jest", "Qualidade", "TDD"],
  lead: "Quem não testa, reza. Quem testa bem, refatora sem medo. Este capítulo é o que separa hobby de engenharia.",
  sections: [
    { h: "Por que testar?", html: `
      <p>Teste automatizado é código que <strong>verifica outro código</strong>. Ele responde: "essa função ainda funciona depois que eu mudei alguma coisa?". Sem isso, cada mudança exige testar na mão — lento e cheio de erro.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Tipo de teste</th><th>O que verifica</th><th>Velocidade</th></tr></thead>
        <tbody>
          <tr><td><strong>Unitário</strong></td><td>Uma função/isoladamente</td><td>Muito rápido (ms)</td></tr>
          <tr><td><strong>Integração</strong></td><td>Peças juntas (API + banco)</td><td>Rápido (s)</td></tr>
          <tr><td><strong>E2E</strong></td><td>Fluxo completo do usuário (navegador)</td><td>Lento (min)</td></tr>
        </tbody>
      </table></div>
      <div class="callout info"><span class="co-title">Pirâmide de testes</span><p>Base larga de testes unitários, meio de integração e poucos E2E no topo. É o equilibrio entre velocidade e segurança.</p></div>
    `},
    { h: "Escrevendo testes com Jest", html: `
      <pre><code>// Calculadora.js
function somar(a, b) { return a + b; }
function dividir(a, b) {
  if (b === 0) throw new Error("Divisão por zero");
  return a / b;
}
module.exports = { somar, dividir };

// Calculadora.test.js
const { somar, dividir } = require("./Calculadora");

describe("Calculadora", () =&gt; {
  test("soma dois números", () =&gt; {
    expect(somar(2, 3)).toBe(5);
  });

  test("soma com números negativos", () =&gt; {
    expect(somar(-2, -3)).toBe(-5);
  });

  test("divisão normal", () =&gt; {
    expect(dividir(10, 2)).toBe(5);
  });

  test("divisão por zero lança erro", () =&gt; {
    expect(() =&gt; dividir(1, 0)).toThrow("Divisão por zero");
  });
});</code></pre>
      <div class="table-wrap"><table>
        <thead><tr><th>Matcher</th><th>Verifica</th></tr></thead>
        <tbody>
          <tr><td><code>toBe(x)</code></td><td>Igualdade estrita (===)</td></tr>
          <tr><td><code>toEqual(x)</code></td><td>Igualdade profunda (objetos/arrays)</td></tr>
          <tr><td><code>toContain(x)</code></td><td>Array contém item / string contém trecho</td></tr>
          <tr><td><code>toThrow(msg)</code></td><td>Função lança exceção</td></tr>
          <tr><td><code>toBeTruthy()</code></td><td>Valor é verdadeiro</td></tr>
        </tbody>
      </table></div>
    `},
    { h: "Testando APIs (integração)", html: `
      <p>Com <strong>Supertest</strong> você sobe a aplicação em memória e faz requisições reais:</p>
      <pre><code>const request = require("supertest");
const app = require("./app");

describe("POST /tarefas", () =&gt; {
  it("cria uma tarefa e retorna 201", async () =&gt; {
    const res = await request(app)
      .post("/tarefas")
      .send({ texto: "Estudar testes" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.texto).toBe("Estudar testes");
  });

  it("rejeita payload sem texto com 400", async () =&gt; {
    const res = await request(app).post("/tarefas").send({});
    expect(res.status).toBe(400);
    expect(res.body.erro).toBeDefined();
  });
});</code></pre>
    `},
    { h: "Cobertura de código", html: `
      <pre><code># rodar testes com cobertura
npm test -- --coverage

# resultado: linhas, branches, functions, statements
# (busque 80%+ — abaixo disso há código morto)</code></pre>
      <p>Cobertura mostra <em>o que foi testado</em>, não se os testes estão certos. Um teste sem asserção que dá 100% é inútil.</p>
      <div class="callout warn"><span class="co-title">Teste ruim</span><p>Testar implementação (detalhes internos) quebra a cada refactor. Teste <strong>comportamento</strong> (resultado observável) sobrevive às mudanças.</p></div>
    `},
    { h: "Testes de componentes React", html: `
      <pre><code>import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contador from "./Contador";

test("incrementa ao clicar", async () =&gt; {
  render(&lt;Contador /&gt;);
  await userEvent.click(screen.getByRole("button", { name: /incrementar/i }));
  expect(screen.getByText("1")).toBeInTheDocument();
});</code></pre>
      <p>Consultas por <strong>role</strong> e <strong>nome acessível</strong> em vez de classes CSS — o teste também valida a acessibilidade.</p>
    `}
  ],
  playground: {
    tabs: ["index.html"],
    starter: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Testes na prática</title>
  <style>
    body { font-family: system-ui; max-width: 600px; margin: 30px auto; padding: 0 16px; color:#171a21; }
    .box { background:#f6f7f9; border:1px solid #dde1e8; border-radius:12px; padding:16px; margin:12px 0; }
    button { background:#3d4557; color:#fff; border:none; padding:9px 16px; border-radius:8px; font-weight:700; cursor:pointer; margin:3px; }
    button.err { background:#b91c1c; }
    pre { background:#14161c; color:#c3c9d6; padding:14px; border-radius:10px; font-size:.8rem; overflow:auto; max-height:230px; }
    .pass { color:#15803d; font-weight:700; }
    .fail { color:#b91c1c; font-weight:700; }
  </style>
</head>
<body>
  <h1>🧪 Mini framework de testes</h1>
  <div class="box">
    <p>Teste 1..3 abaixo simulam a suíte de testes da calculadora.</p>
    <button id="btnRodar">▶ Rodar suíte</button>
  </div>
  <pre id="out">Aguardando…</pre>

  <script>
    // "Implementação" testada
    function somar(a, b) { return a + b; }
    function dividir(a, b) {
      if (b === 0) throw new Error("Divisão por zero");
      return a / b;
    }

    // Mini framework
    let falhas = 0;
    function expect(recebido, esperado) {
      return JSON.stringify(recebido) === JSON.stringify(esperado);
    }
    function test(nome, fn) {
      try {
        fn();
        out('  ✓ ' + nome + ' <span class="pass">PASS</span>');
      } catch (e) {
        falhas++;
        out('  ✗ ' + nome + ' <span class="fail">FAIL — ' + e.message + '</span>');
      }
    }
    const out = html => document.getElementById('out').innerHTML = html;

    document.getElementById('btnRodar').onclick = () => {
      falhas = 0;
      let log = 'PASS  Calculadora.test.js\\n';
      log += '─────────────────────────────\\n';

      test('soma dois números', () => {
        const r = somar(2, 3);
        if (r !== 5) throw new Error('esperava 5, recebeu ' + r);
      });
      test('soma com negativos', () => {
        const r = somar(-2, -3);
        if (r !== -5) throw new Error('esperava -5, recebeu ' + r);
      });
      test('divisão por zero lança erro', () => {
        try { dividir(1, 0); throw new Error('não lançou erro!'); }
        catch (e) { if (e.message !== 'Divisão por zero') throw e; }
      });

      log += '─────────────────────────────\\n';
      log += falhas === 0 ? 'Tests: 3 passed, 3 total ✅' : 'Tests: ' + falhas + ' failed';
      log += '\\nTime: 0.42s';
      out(log);
    };
  </script>
</body>
</html>`
  },
  quiz: [
    { q: "Qual matcher verifica igualdade profunda de objetos?", opts: ["toBe", "toEqual", "toBeTruthy", "toThrow"], answer: 1,
      feedback: "toEqual compara a estrutura inteira (deep equality). toBe só funciona para primitivos e mesma referência." },
    { q: "Qual é o pedido de testes na pirâmide?", opts: ["Muitos E2E e poucos unitários", "Muitos unitários, poucos E2E", "Só E2E", "Só unitários"], answer: 1,
      feedback: "Pirâmide = muitos unitários (baratos e rápidos), poucos E2E (caros e frágeis)." },
    { q: "Por que evitar testar detalhes internos?", opts: ["É mais lento", "Testes de comportamento sobrevivem a refactor; de implementação quebram sem aviso", "É mais fácil", "O Jest não permite"], answer: 1,
      feedback: "Se você testa estado interno, toda refatoração quebra testes sem mudar comportamento — falso alarme." }
  ],
  flashcards: [
    { q: "O que é teste unitário?", a: "Teste que verifica uma unidade isolada de código (uma função) sem depender de outras partes." },
    { q: "Diferença entre toBe e toEqual?", a: "toBe = igualdade estrita (===), só primitivos/mesma referência. toEqual = compara estrutura profunda." },
    { q: "O que é teste E2E?", a: "End-to-End: simula o fluxo completo do usuário no navegador, da tela ao banco de dados." },
    { q: "O que é cobertura de código?", a: "Percentual do código executado pelos testes. Mede o que foi exercitado, não a qualidade do teste." },
    { q: "O que é TDD?", a: "Test-Driven Development: escreve-se o teste antes da implementação (ciclo Vermelho → Verde → Refatorar)." }
  ]
},
{
  id: "nextjs",
  part: "Parte 6 — Stack Moderna",
  icon: "▲",
  title: "Next.js: React com poder de servidor",
  desc: "SSR, SSG, rotas de API, Server Components e App Router.",
  level: "hard",
  minutes: 40,
  tags: ["Next.js", "SSR", "React", "Fullstack"],
  lead: "Next.js unifica front-end e back-end num projeto só: renderização no servidor, rotas de API e otimização automática.",
  sections: [
    { h: "Por que Next.js?", html: `
      <p>React puro roda <strong>só no navegador</strong> — ruim para SEO e lento no primeiro carregamento. Next.js resolve isso renderizando no servidor e mandando HTML pronto.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Estratégia</th><th>Onde renderiza</th><th>Quando usar</th></tr></thead>
        <tbody>
          <tr><td><strong>CSR</strong> (SPA)</td><td>Navegador</td><td>Apps com login/dashboards</td></tr>
          <tr><td><strong>SSR</strong></td><td>Servidor a cada request</td><td>Conteúdo que muda sempre</td></tr>
          <tr><td><strong>SSG</strong></td><td>Build time</td><td>Blog, docs, landing pages</td></tr>
          <tr><td><strong>ISR</strong></td><td>Build + revalidação</td><td>E-commerce, conteúdo semi-estático</td></tr>
        </tbody>
      </table></div>
    `},
    { h: "App Router: estrutura de pastas", html: `
      <pre><code>app/
├── layout.jsx        # wrapper (header/footer) — compartilhado
├── page.jsx          # rota "/" (equivalente a /pages/index)
├── about/page.jsx    # rota "/about"
├── posts/
│   └── [id]/page.jsx # rota dinâmica "/posts/1"
├── api/
│   └── hello/route.js # rota de API (substitui pages/api)
└── globals.css</code></pre>
      <p>Cada <code>page.jsx</code> é uma rota. <code>layout.jsx</code> envolve todas as rotas abaixo dele. <code>route.js</code> cria endpoints HTTP no mesmo projeto.</p>
    `},
    { h: "Server Components vs Client Components", html: `
      <p>Por padrão, tudo é <strong>Server Component</strong>: renderiza no servidor, NÃO viaja para o navegador (menor bundle). Para interatividade, marque com <code>"use client"</code>:</p>
      <pre><code>// app/page.jsx (Server Component por padrão)
import Counter from "./Counter"; // client

export default async function Page() {
  const dados = await getDados(); // roda no servidor
  return (
    &lt;main&gt;
      &lt;h1&gt;{dados.titulo}&lt;/h1&gt;
      &lt;Counter inicio={dados.total} /&gt; {/* vai pro client */}
    &lt;/main&gt;
  );
}

// components/Counter.jsx
"use client";                        // ← limite cliente
import { useState } from "react";
export default function Counter({ inicio }) {
  const [n, setN] = useState(inicio);
  return &lt;button onClick={() =&gt; setN(n + 1)}&gt;{n}&lt;/button&gt;
}</code></pre>
      <div class="callout tip"><span class="co-title">Regra prática</span><p>Use Server Components por padrão (são mais leves). Só adicione <code>"use client"</code> na fronteira mais próxima da interatividade.</p></div>
    `},
    { h: "Rotas de API dentro do app", html: `
      <pre><code>// app/api/tarefas/route.js
export async function GET() {
  return Response.json(await listar());
}

export async function POST(req) {
  const body = await req.json();
  if (!body.texto) {
    return Response.json({ erro: "texto obrigatório" }, { status: 400 });
  }
  return Response.json(await criar(body), { status: 201 });
}

// Usar: fetch("/api/tarefas")</code></pre>
      <p>Agora frontend e API vivem no mesmo servidor, mesma linguagem, deploy único.</p>
    `},
    { h: "Metadata e SEO", html: `
      <pre><code>// app/layout.jsx
export const metadata = {
  title: "Minha App",
  description: "Descrição que aparece no Google",
  openGraph: { title: "Minha App", images: ["/og.png"] }
};

// app/posts/[id]/page.jsx
export async function generateMetadata({ params }) {
  const post = await buscarPost(params.id);
  return { title: post.titulo, description: post.resumo };
}</code></pre>
      <p>Metadata declarativa é aplicada automaticamente pelo Next.js em todas as rotas.</p>
    `}
  ],
  playground: null,
  quiz: [
    { q: "O que marca um componente como Client Component?", opts: ["import client", '"use client"', "use client()", "#client"], answer: 1,
      feedback: 'A diretiva "use client" no topo do arquivo torna aquele módulo (e tudo que ele importa) client-side.' },
    { q: "Qual arquivo cria um endpoint /api/hello?", opts: ["api/hello.js", "app/api/hello/route.js", "pages/hello/api.js", "app/api.js"], answer: 1,
      feedback: "No App Router, endpoints são route.js dentro de app/api/..." },
    { q: "Qual renderização gera HTML estático no build?", opts: ["SSR", "SSG", "CSR", "ISR"], answer: 1,
      feedback: "SSG (Static Site Generation) gera as páginas no build — super rápido e barato de servir." }
  ],
  flashcards: [
    { q: "Qual a diferença entre 'use client' e Server Component?", a: "'use client marca o módulo para enviar ao navegador (tem estado/eventos). Server Component renderiza só no servidor e não viaja para o cliente." },
    { q: "O que é App Router?", a: "Sistema de rotas baseado em pastas em /app, com layout.jsx, page.jsx e route.js — sucessor do Pages Router." },
    { q: "O que é generateMetadata?", a: "Função que gera metadata (title, description, OG) dinamicamente por rota — essencial para SEO em conteúdo variável." },
    { q: "SSR, SSG, CSR e ISR — defina em uma frase cada.", a: "SSR = por request. SSG = no build. CSR = no cliente (SPA). ISR = SSG que se revalida após N segundos." }
  ]
},
{
  id: "docker-deploy",
  part: "Parte 6 — Stack Moderna",
  icon: "🐳",
  title: "Docker e infraestrutura como código",
  desc: "Dockerfile, containers, docker-compose e orquestração básica.",
  level: "hard",
  minutes: 35,
  tags: ["Docker", "DevOps", "Infra"],
  lead: "Docker garante que seu app rode igual na sua máquina, no servidor e no CI — sem surpresa.",
  sections: [
    { h: "Problema: 'funciona na minha máquina'", html: `
      <p>Cada máquina tem versões diferentes de Node, banco, bibliotecas. Docker empacota app + dependências + sistema em uma <strong>imagem</strong> isolada que roda igual em qualquer lugar.</p>
      <div class="callout info"><span class="co-title">Imagem vs Container</span><p><strong>Imagem</strong> = receita/template (read-only). <strong>Container</strong> = instância rodando dessa receita.</p></div>
    `},
    { h: "Dockerfile", html: `
      <pre><code># syntax=docker/dockerfile:1
FROM node:20-alpine          # imagem base
WORKDIR /app                 # diretório de trabalho

COPY package*.json ./         # copia dependências
RUN npm ci --omit=dev         # instala (aproveita cache)

COPY . .                     # copia o código

EXPOSE 3000                  # documenta a porta
ENV NODE_ENV=production
CMD ["node", "server.js"]     # comando de inicialização</code></pre>
      <p>Cada instrução vira uma camada em cache. Por isso copiamos <code>package.json</code> antes do código: assim mudar código não reinstala dependências.</p>
    `},
    { h: "Construindo e rodando", html: `
      <pre><code>docker build -t minha-api:1.0 .
docker run -p 3000:3000 minha-api:1.0
docker ps                     # containers rodando
docker logs -f &lt;id&gt;         # ver logs
docker stop / rm / images</code></pre>
    `},
    { h: "docker-compose: múltiplos serviços", html: `
      <p>Um projeto real tem API + banco + Redis. O compose sobe tudo junto com um comando:</p>
      <pre><code># docker-compose.yml
services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://user:senha@db:5432/app
    depends_on: [db]

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: senha
      POSTGRES_DB: app
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports: ["5432:5432"]

volumes:
  pgdata:</code></pre>
      <pre><code>docker compose up -d       # sobe tudo em background
docker compose logs -f api
docker compose down          # derruba tudo
docker compose down -v       # derruba e apaga volumes</code></pre>
      <div class="callout tip"><span class="co-title">Service name como host</span><p>Dentro da rede do compose, serviços se referenciam pelo nome: a API acessa o banco em <code>db:5432</code>, não em localhost.</p></div>
    `},
    { h: "Boas práticas", html: `
      <ul>
        <li>✅ Imagens pequenas (alpine, multi-stage builds);</li>
        <li>✅ <code>.dockerignore</code> excluindo node_modules, .git, .env;</li>
        <li>✅ Nunca embuta segredo na imagem — use variáveis em runtime;</li>
        <li>✅ Healthcheck para o orquestrador saber se a app está viva;</li>
        <li>✅ Tags de versão específicas (não use <code>latest</code> em produção).</li>
      </ul>
    `}
  ],
  playground: null,
  quiz: [
    { q: "Qual a diferença entre imagem e container?", opts: ["São a mesma coisa", "Imagem é o template read-only; container é a instância rodando", "Container é o arquivo, imagem é o processo", "Imagem é para backend, container para frontend"], answer: 1,
      feedback: "Analogia: imagem = receita de bolo, container = o bolo assado. Você roda o mesmo container a partir da mesma imagem várias vezes." },
    { q: "Por que COPY package*.json vem antes de COPY . . ?", opts: ["É stylistic", "Para aproveitar o cache de camadas e não reinstalar dependências a cada mudança de código", "Obrigatoriedade do Docker", "Ordem alfabética"], answer: 1,
      feedback: "Camadas mudam só se o conteúdo anterior mudar. Cache de npm fica válido enquanto o package.json não muda." },
    { q: "Dentro do docker-compose, como a API acha o banco?", opts: ["localhost", "Pelo nome do serviço, ex.: db:5432", "127.0.0.1:5432", "IP fixo manual"], answer: 1,
      feedback: "Serviços do compose compartilham uma rede Docker e se resolvem pelo nome do serviço." }
  ],
  flashcards: [
    { q: "O que é docker-compose?", a: "Arquivo YAML que define e sobe múltiplos serviços (api, banco, cache) com um único comando." },
    { q: "O que é multi-stage build?", a: "Dockerfile com etapas (build → runtime): compila na primeira imagem e copia só o necessário para a imagem final, que fica menor." },
    { q: "Por que usar tags específicas de imagem?", a: "Para reprodutibilidade e rollbacks seguros — 'latest' muda sem aviso e quebra o ambiente." },
    { q: "O que é .dockerignore?", a: "Arquivo que define o que NÃO entra no contexto de build — evita enviar .env, node_modules e .git para a imagem." }
  ]
},
{
  id: "arquitetura",
  part: "Parte 6 — Stack Moderna",
  icon: "🏗️",
  title: "Arquitetura, segurança e boas práticas",
  desc: "Autenticação, JWT, validação, tratamento de erros e organização de código em escala.",
  level: "hard",
  minutes: 40,
  tags: ["Arquitetura", "Segurança", "Auth", "Escalabilidade"],
  lead: "É aqui que você deixa de fazer scripts e passa a construir sistemas. Segurança e arquitetura desde o dia 1.",
  sections: [
    { h: "Autenticação vs Autorização", html: `
      <div class="table-wrap"><table>
        <thead><tr><th></th><th>Autenticação</th><th>Autorização</th></tr></thead>
        <tbody>
          <tr><td><strong>Pergunta</strong></td><td>Quem é você?</td><td>O que você pode fazer?</td></tr>
          <tr><td><strong>Mecanismo</strong></td><td>Login, JWT, sessão, OAuth</td><td>Roles, permissões, escopo de recurso</td></tr>
        </tbody>
      </table></div>
    `},
    { h: "Senhas seguras: hash com salt", html: `
      <p>Nunca guarde senha em texto puro. Use <strong>bcrypt</strong> (ou argon2), que é lento de propósito — dificulta ataques de força bruta:</p>
      <pre><code>const bcrypt = require("bcrypt");

// cadastro
const hash = await bcrypt.hash(senha, 12); // 12 rounds
await db.query("INSERT INTO users (email, hash) VALUES ($1, $2)", [email, hash]);

// login
const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
const ok = user && await bcrypt.compare(senha, user.hash);</code></pre>
      <div class="callout danger"><span class="co-title">Nunca</span><p>Não use MD5/SHA1 para senha (rápidos de quebrar). Não use crypto.createHash simples. bcrypt/argon2 é o padrão.</p></div>
    `},
    { h: "JWT:(stateless)", html: `
      <p>JWT (JSON Web Token) é um token assinado que carrega claims. O servidor não precisa guardar sessão — o token é verificado pela assinatura:</p>
      <pre><code>import jwt from "jsonwebtoken";

const token = jwt.sign(
  { sub: user.id, role: "admin" },   // payload
  process.env.JWT_SECRET,           // assinatura
  { expiresIn: "1h" }
);

// Middleware de proteção
function auth(req, res, next) {
  const h = req.headers.authorization?.replace("Bearer ", "");
  try {
    req.user = jwt.verify(h, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}</code></pre>
      <p><strong>Access token</strong> (curto, ~1h) + <strong>refresh token</strong> (longo, em cookie httpOnly) é o padrão seguro.</p>
    `},
    { h: "Validação de entrada", html: `
      <pre><code>import { z } from "zod";

const schema = z.object({
  nome: z.string().min(3, "mínimo 3 caracteres").max(100),
  email: z.string().email(),
  idade: z.number().int().min(18).optional()
});

const dados = schema.safeParse(req.body);
if (!dados.success) {
  return res.status(400).json({ erros: dados.error.issues });
}
// dados.data agora é tipado e validado</code></pre>
      <p><strong>Nunca confie no input do cliente.</strong> Valide no servidor mesmo que o frontend já valide.</p>
    `},
    { h: "Tratamento centralizado de erros", html: `
      <pre><code>// middleware de erro (sempre no final das rotas)
app.use((err, req, res, next) =&gt; {
  if (err.name === "ZodError") {
    return res.status(400).json({ erro: "Dados inválidos" });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ erro: "Não autorizado" });
  }
  console.error(err);              // loga internamente
  res.status(500).json({           // resposta genérica
    erro: "Erro interno"
  });
});</code></pre>
      <div class="callout warn"><span class="co-title">Nunca vazar stack trace</span><p>Detalhe do erro (stack trace, query, caminho de arquivo) só para log interno. O cliente recebe mensagem genérica — isso não vaza informação sensível.</p></div>
    `},
    { h: "Organização em camadas", html: `
      <pre><code>src/
├── controllers/   # req/res (entrada/saída HTTP)
├── services/      # regras de negócio (lógica real)
├── repositories/  # acesso a dados (SQL/queries)
├── models/        # schemas e entidades
├── middlewares/   # auth, erro, validação
├── routes/        # definição de rotas
├── config/        # env, db
└── utils/         # helpers</code></pre>
      <p>Separar camadas deixa o código testável e trocavel. Trocar Express por Fastify? Só muda o controller.</p>
    `}
  ],
  playground: null,
  quiz: [
    { q: "Qual a diferença entre autenticação e autorização?", opts: ["Nenhuma", "Autenticação = quem é; autorização = o que pode fazer", "Autenticação é front, autorização é back", "Autorização é opcional"], answer: 1,
      feedback: "Auth prova identidade (login/token). Authorization verifica permissão sobre um recurso (role, owner)." },
    { q: "Por que bcrypt e não SHA256 para senhas?", opts: ["É mais curto", "bcrypt é propositalmente lento + salt, dificultando força bruta", "SHA256 não funciona em Node", "bcrypt criptografa"], answer: 1,
      feedback: "bcrypt é adaptativo e usa salt único por senha. SHA é rápido demais para guardar senha." },
    { q: "Em que caso a resposta 500 deve revelar o erro interno?", opts: ["Sempre", "Nunca ao cliente — só no log interno", "Só em dev local", "Quando for 404"], answer: 1,
      feedback: "Stack trace, SQL e paths vazam informação de infraestrutura. Cliente recebe mensagem genérica; você loga o detalhe." }
  ],
  flashcards: [
    { q: "O que é JWT?", a: "Token assinado (header.payload.signature) que carrega claims; verificado pela assinatura sem guardar sessão no servidor." },
    { q: "O que é salt em hash de senha?", a: "Valor aleatório único por senha, misturado no hash — impede que senhas iguais gerem o mesmo hash e viabiliza rainbow tables." },
    { q: "Qual a diferença entre access e refresh token?", a: "Access: curto (15min-1h), vai no header Authorization. Refresh: longo, em cookie httpOnly, usado para renovar o access." },
    { q: "O que é middleware de erro?", a: "Função no final da cadeia Express que centraliza o tratamento de exceções,_padronizando resposta HTTP e logando internamente." },
    { q: "Por que separar controllers de services?", a: "Controller cuida de HTTP (req/res); service cuida de regra de negócio. Permite trocar Express por outro framework sem reescrever a lógica." }
  ]
}
);
