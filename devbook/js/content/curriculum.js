/* ═══════════════════════════════════════════════════════
   DevBook — CURRÍCULO — capítulos 1 a 11
   Conteúdo do curso. ADICIONE CAPÍTULOS AQUI.
   ═══════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   DevBook — Currículo Full Stack do Zero
   Cada capítulo: texto, code playground, quiz e flashcards
   ═══════════════════════════════════════════════════════ */

const CURRICULUM = [
{
  id: "html-fundamentos",
  part: "Parte 1 — Fundamentos da Web",
  icon: "🏗️",
  title: "HTML: a estrutura das páginas",
  desc: "Entenda o esqueleto de qualquer site: tags, elementos, semântica e formulários.",
  level: "easy",
  minutes: 25,
  tags: ["HTML", "Semântica", "Formulários"],
  lead: "HTML é a língua que o navegador lê para montar uma página. Aprenda a escrever páginas corretas, acessíveis e bem organizadas.",
  sections: [
    { h: "O que é HTML?", html: `
      <p><strong>HTML</strong> (HyperText Markup Language) é uma linguagem de <em>marcação</em>, não de programação. Ela não calcula nem decide nada — ela <strong>descreve</strong> o que existe na página: título, parágrafo, imagem, botão, formulário.</p>
      <p>Tudo em HTML é feito de <strong>tags</strong> (etiquetas). Uma tag abre, o conteúdo vem e outra fecha:</p>
      <pre><code>&lt;p&gt;Este é um parágrafo.&lt;/p&gt;</code></pre>
      <div class="callout info"><span class="co-title">Regra de ouro</span><p>Tag de abertura + conteúdo + tag de fechamento (<code>&lt;tag&gt;</code>…<code>&lt;/tag&gt;</code>). Algumas como <code>&lt;img&gt;</code> são "vazias" e não precisam de fechamento.</p></div>
    `},
    { h: "A estrutura de um documento", html: `
      <p>Toda página HTML começa com uma estrutura padrão:</p>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="pt-BR"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Minha página&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Olá, mundo!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
      <ul>
        <li><strong>head</strong> — informações para o navegador (título, charset, estilos);</li>
        <li><strong>body</strong> — tudo que o usuário vê na tela;</li>
        <li><strong>lang</strong> — idioma da página, importante para acessibilidade e SEO.</li>
      </ul>
    `},
    { h: "Semântica: tag certa para cada coisa", html: `
      <p>Em vez de usar <code>&lt;div&gt;</code> para tudo, o HTML moderno oferece tags com <strong>significado</strong>:</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Tag</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td><code>&lt;header&gt;</code></td><td>Cabeçalho da página ou seção</td></tr>
          <tr><td><code>&lt;nav&gt;</code></td><td>Links de navegação</td></tr>
          <tr><td><code>&lt;main&gt;</code></td><td>Conteúdo principal (único por página)</td></tr>
          <tr><td><code>&lt;article&gt;</code></td><td>Conteúdo independente (post, carta)</td></tr>
          <tr><td><code>&lt;section&gt;</code></td><td>Agrupamento temático</td></tr>
          <tr><td><code>&lt;footer&gt;</code></td><td>Rodapé</td></tr>
        </tbody>
      </table></div>
      <div class="callout tip"><span class="co-title">Por que importa?</span><p>Leitores de tela, buscadores e o próprio navegador entendem melhor páginas semânticas. Usar as tags certas é um gesto de acessibilidade.</p></div>
    `},
    { h: "Listas, links e imagens", html: `
      <pre><code>&lt;a href="https://exemplo.com" target="_blank"&gt;Visitar site&lt;/a&gt;

&lt;img src="foto.jpg" alt="Descrição da foto"&gt;

&lt;ul&gt;
  &lt;li&gt;Item não ordenado&lt;/li&gt;
&lt;/ul&gt;

&lt;ol&gt;
  &lt;li&gt;Item numerado&lt;/li&gt;
&lt;/ol&gt;</code></pre>
      <div class="callout warn"><span class="co-title">Atenção</span><p>O atributo <code>alt</code> da imagem é obrigatório. É ele que leitores de tela anunciam e que aparece quando a imagem não carrega.</p></div>
    `},
    { h: "Formulários", html: `
      <p>Formulários coletam dados do usuário. O elemento principal é o <code>&lt;form&gt;</code>:</p>
      <pre><code>&lt;form&gt;
  &lt;label for="nome"&gt;Nome&lt;/label&gt;
  &lt;input id="nome" name="nome" type="text" placeholder="Seu nome" required&gt;

  &lt;label for="email"&gt;E-mail&lt;/label&gt;
  &lt;input id="email" name="email" type="email"&gt;

  &lt;button type="submit"&gt;Enviar&lt;/button&gt;
&lt;/form&gt;</code></pre>
      <p>Todo campo precisa de uma <code>&lt;label&gt;</code> vinculada pelo <code>for</code>/<code>id</code>. Isso aumenta a área de clique e melhora a acessibilidade.</p>
    `}
  ],
  playground: {
    tabs: ["index.html"],
    starter: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Minha página</title>
  <style>
    body { font-family: system-ui; max-width: 600px; margin: 40px auto; padding: 0 16px; }
    .card { background: #f0f6ff; border: 1px solid #bcd; border-radius: 12px; padding: 20px; }
  </style>
</head>
<body>
  <header>
    <h1>👋 Meu primeiro site</h1>
  </header>

  <main>
    <p>Estou aprendendo <strong>HTML</strong> com o DevBook!</p>

    <div class="card">
      <h3>Lista de tarefas</h3>
      <ul>
        <li>Estudar tags</li>
        <li>Criar um formulário</li>
      </ul>
    </div>
  </main>

  <footer>
    <small>Feito com carinho</small>
  </footer>
</body>
</html>`
  },
  quiz: [
    { q: "Qual tag representa o conteúdo principal único de uma página?", opts: ["<section>", "<main>", "<div>", "<body>"], answer: 1,
      feedback: "<main> identifica o conteúdo principal. Deve aparecer apenas uma vez por página." },
    { q: "O atributo alt de uma imagem serve para:", opts: ["Deixar a imagem maior", "Descrever a imagem para acessibilidade e quando ela falha", "Mudar a cor da imagem", "Adicionar um link"], answer: 1,
      feedback: "O alt é lido por leitores de tela e exibido quando a imagem não carrega. É obrigatório." },
    { q: "Qual a diferença entre HTML e CSS?", opts: ["Nenhuma, são iguais", "HTML estrutura o conteúdo, CSS estiliza", "HTML programa, CSS compila", "CSS só funciona no celular"], answer: 1,
      feedback: "HTML descreve a estrutura/conteúdo; CSS cuida da aparência (cores, fontes, espaçamento)." }
  ],
  flashcards: [
    { q: "O que significa HTML?", a: "HyperText Markup Language — linguagem de marcação para estruturar páginas web." },
    { q: "Qual a diferença entre <head> e <body>?", a: "head = configurações invisíveis (título, meta, estilos). body = tudo que aparece na tela." },
    { q: "Para que serve a tag <main>?", a: "Marca o conteúdo principal da página. Deve ser usada apenas uma vez por página." },
    { q: "O que é um atributo em HTML?", a: "Um valor extra dentro da tag que dá informação adicional, como href, src, alt, class e id." },
    { q: "Por que todo input precisa de label?", a: "Para acessibilidade (leitores de tela) e para ampliar a área de clique do campo." }
  ]
},
{
  id: "css-fundamentos",
  part: "Parte 1 — Fundamentos da Web",
  icon: "🎨",
  title: "CSS: o visual das páginas",
  desc: "Cores, tipografia, espaçamento, seletores e o modelo de caixa.",
  level: "easy",
  minutes: 30,
  tags: ["CSS", "Box Model", "Seletores"],
  lead: "CSS é o que transforma um documento feio em uma interface bonita. Aprenda seletores, o modelo de caixa e como organizar seus estilos.",
  sections: [
    { h: "Como o CSS funciona", html: `
      <p>CSS (Cascading Style Sheets) aplica <strong>regras</strong> a elementos HTML. Cada regra tem um <strong>seletor</strong> (quem) e declarações (o quê):</p>
      <pre><code>p {
  color: blue;
  font-size: 18px;
}</code></pre>
      <p>Existem três formas de aplicar CSS:</p>
      <ol>
        <li><strong>Inline</strong> — no atributo <code>style</code> (evite);</li>
        <li><strong>&lt;style&gt;</strong> — no head da página;</li>
        <li><strong>Arquivo .css</strong> — com <code>&lt;link&gt;</code> (melhor organização).</li>
      </ol>
    `},
    { h: "Seletores essenciais", html: `
      <div class="table-wrap"><table>
        <thead><tr><th>Seletor</th><th>Seleciona</th></tr></thead>
        <tbody>
          <tr><td><code>p</code></td><td>Todos os parágrafos</td></tr>
          <tr><td><code>.card</code></td><td>Elementos com class="card"</td></tr>
          <tr><td><code>#titulo</code></td><td>Elemento com id="titulo"</td></tr>
          <tr><td><code>nav a</code></td><td>Links dentro de nav</td></tr>
          <tr><td><code>:hover</code></td><td>Quando o mouse passa por cima</td></tr>
        </tbody>
      </table></div>
      <div class="callout info"><span class="co-title">Especificidade</span><p><code>#id</code> vence <code>.class</code>, que vence <code>tag</code>. Use classes para a maioria dos casos — ids são muito específicos.</p></div>
    `},
    { h: "O modelo de caixa (Box Model)", html: `
      <p>Todo elemento HTML é uma <strong>caixa</strong> formada por:</p>
      <pre><code>┌── margin (espaço externo) ──┐
│ ┌── border (borda) ───────┐ │
│ │ ┌── padding (espaço) ─┐ │ │
│ │ │   conteúdo          │ │ │
│ │ └─────────────────────┘ │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘</code></pre>
      <p>Ative o box-sizing para somar tudo de forma intuitiva:</p>
      <pre><code>* {
  box-sizing: border-box;
}</code></pre>
      <div class="callout tip"><span class="co-title">Dica profissional</span><p>Sem <code>border-box</code>, um elemento com <code>width: 300px</code> + <code>padding: 20px</code> fica com 340px. Com ele, continua com 300px. Use sempre.</p></div>
    `},
    { h: "Layout com Flexbox", html: `
      <p>Flexbox alinha itens em uma <strong>linha</strong> ou <strong>coluna</strong> de forma poderosa:</p>
      <pre><code>.container {
  display: flex;
  justify-content: space-between; /* horizontal */
  align-items: center;            /* vertical */
  gap: 16px;
}</code></pre>
      <p>As propriedades-chave:</p>
      <ul>
        <li><strong>justify-content</strong> — alinhamento no eixo principal;</li>
        <li><strong>align-items</strong> — alinhamento no eixo transversal;</li>
        <li><strong>gap</strong> — espaço entre os itens (substitui margin).</li>
      </ul>
    `},
    { h: "Grid para layouts em 2 dimensões", html: `
      <pre><code>.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}</code></pre>
      <p><code>1fr</code> = uma fração do espaço disponível. <code>repeat(3, 1fr)</code> cria 3 colunas iguais. Com <code>auto-fit</code> e <code>minmax()</code> o layout fica responsivo sem media queries:</p>
      <pre><code>grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));</code></pre>
    `}
  ],
  playground: {
    tabs: ["index.html"],
    starter: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>CSS Demo</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui; background: #0f172a; color: #e2e8f0; padding: 30px; }
    h1 { color: #38bdf8; margin-bottom: 20px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 14px;
      padding: 22px;
      transition: transform .2s, border-color .2s;
    }
    .card:hover { transform: translateY(-5px); border-color: #38bdf8; }
    .card h3 { color: #38bdf8; margin-bottom: 8px; }
    .badge {
      display: inline-block;
      background: #38bdf8; color: #0f172a;
      font-size: 12px; font-weight: 700;
      padding: 3px 10px; border-radius: 20px;
      margin-top: 12px;
    }
  </style>
</head>
<body>
  <h1>Meu painel 🎨</h1>
  <div class="grid">
    <div class="card"><h3>Flexbox</h3><p>Alinhamento em linha ou coluna.</p><span class="badge">Fácil</span></div>
    <div class="card"><h3>Grid</h3><p>Layouts em duas dimensões.</p><span class="badge">Médio</span></div>
    <div class="card"><h3>Responsivo</h3><p>Adapta-se a qualquer tela.</p><span class="badge">Essencial</span></div>
  </div>
</body>
</html>`
  },
  quiz: [
    { q: "O que faz o box-sizing: border-box?", opts: ["Aumenta a caixa", "Padding e border entram dentro da width definida", "Remove a borda", "Muda a cor do texto"], answer: 1,
      feedback: "Com border-box, width inclui padding e borda. Sem ele, a caixa fica maior que o esperado." },
    { q: "Qual a diferença entre Flexbox e Grid?", opts: ["Nenhuma", "Flex para 1 eixo (linha/coluna), Grid para 2 eixos (linhas e colunas)", "Grid é mais antigo", "Flex só funciona verticalmente"], answer: 1,
      feedback: "Flexbox pensa em uma dimensão (linha OU coluna). Grid pensa nas duas ao mesmo tempo." },
    { q: "Qual seletor tem maior especificidade?", opts: [".classe", "#id", "tag", ":hover"], answer: 1,
      feedback: "ID > classe > tag. Por isso ids vencem nos conflitos de estilo." }
  ],
  flashcards: [
    { q: "O que significa CSS?", a: "Cascading Style Sheets — folhas de estilo em cascata que definem a aparência." },
    { q: "Quais as 4 partes do Box Model?", a: "De dentro para fora: conteúdo → padding → border → margin." },
    { q: "O que faz display: flex?", opts: "", a: "Transforma o elemento em contêiner flex, permitindo alinhar e distribuir filhos com justify-content, align-items e gap." },
    { q: "quando usar Grid e quando usar Flex?", a: "Flex: eixo único (nav, barra, lista alinhada). Grid: duas dimensões (galeria, dashboard, layout de página)." },
    { q: "O que é cascata no CSS?", a: "Quando várias regras disputam o mesmo elemento, o navegador decide por ordem, especificidade e importância (!important)." }
  ]
},
{
  id: "js-fundamentos",
  part: "Parte 1 — Fundamentos da Web",
  icon: "⚡",
  title: "JavaScript: lógica e interatividade",
  desc: "Variáveis, tipos, condicionais, laços, funções e eventos.",
  level: "easy",
  minutes: 35,
  tags: ["JavaScript", "Lógica", "DOM"],
  lead: "JavaScript é a única linguagem que roda nativamente no navegador. É ela que dá vida às páginas.",
  sections: [
    { h: "Variáveis e tipos de dados", html: `
      <p>Use <code>const</code> por padrão e <code>let</code> quando o valor precisa mudar. Nunca use <code>var</code> em código novo:</p>
      <pre><code>const nome = "Ana";      // não muda
let idade = 25;          // pode mudar
idade = 26;              // ok!

// Tipos primitivos
const texto  = "Olá";      // string
const numero = 42;         // number
const pi     = 3.14;       // number
const ativo  = true;       // boolean
const vazio  = null;       // null (ausência intencional)
const indef  = undefined;  // undefined (não atribuído)</code></pre>
      <div class="callout danger"><span class="co-title">Erro comum</span><p>Reatribuir uma <code>const</code> lança erro: <code>TypeError: Assignment to constant variable</code>.</p></div>
    `},
    { h: "Condicionais e comparação", html: `
      <pre><code>const idade = 18;

if (idade >= 18) {
  console.log("Maior de idade");
} else if (idade >= 16) {
  console.log("Quase lá");
} else {
  console.log("Menor");
}</code></pre>
      <div class="callout warn"><span class="co-title">== vs ===</span><p><code>==</code> compara convertendo tipos (<code>"5" == 5</code> → true). <code>===</code> compara valor E tipo (<code>"5" === 5</code> → false). <strong>Sempre use ===</strong>.</p></div>
    `},
    { h: "Laços de repetição", html: `
      <pre><code>// for — quando você sabe quantas vezes repete
for (let i = 0; i < 5; i++) {
  console.log("Rodada " + i);
}

// for...of — percorre arrays
const frutas = ["maçã", "banana", "uva"];
for (const fruta of frutas) {
  console.log(fruta);
}

// while — repete enquanto a condição for verdadeira
let contador = 3;
while (contador > 0) {
  console.log(contador);
  contador--;
}</code></pre>
    `},
    { h: "Funções", html: `
      <p>Funções organizam e reutilizam código:</p>
      <pre><code>// Declaração tradicional
function somar(a, b) {
  return a + b;
}

// Arrow function (forma moderna, mais curta)
const subtrair = (a, b) => a - b;

// Função anônima armazenada em variável
const saudar = function (nome) {
  return "Olá, " + nome + "!";
};

console.log(somar(2, 3));      // 5
console.log(subtrair(10, 4));  // 6
console.log(saudar("Ana"));    // Olá, Ana!</code></pre>
      <div class="callout tip"><span class="co-title">Template literals</span><p>Use crases para interpolar: <code>\`Olá, \${nome}!\`</code> — muito mais legível que concatenação com +.</p></div>
    `},
    { h: "Arrays e objetos", html: `
      <pre><code>// Array = lista ordenada
const notas = [7, 8.5, 9];
notas.push(10);            // adiciona no fim
notas.length;              // 4

// Objeto = conjunto de propriedades
const aluno = {
  nome: "Ana",
  nota: 8.5,
  aprovado: true
};
console.log(aluno.nome);   // Ana

// Map transforma cada item
const dobro = notas.map(n => n * 2);

// Filter seleciona itens
const altos = notas.filter(n => n >= 8);</code></pre>
    `},
    { h: "DOM: manipulando a página", html: `
      <p>DOM (Document Object Model) é a representação da página em memória. Com JavaScript você pode alterar qualquer coisa:</p>
      <pre><code>// Selecionar elementos
const titulo = document.querySelector("h1");
const botoes = document.querySelectorAll(".btn");

// Alterar conteúdo e estilo
titulo.textContent = "Novo título";
titulo.style.color = "blue";

// Escutar eventos
botao.addEventListener("click", () => {
  alert("Clicou!");
});

// Criar elemento
const li = document.createElement("li");
li.textContent = "Novo item";
document.querySelector("ul").appendChild(li);</code></pre>
    `}
  ],
  playground: {
    tabs: ["index.html"],
    starter: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>JS Demo</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui; max-width: 520px; margin: 36px auto; padding: 0 16px; color: #1e293b; }
    h1 { color: #0284c7; }
    .box { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 18px; margin: 14px 0; }
    button { background: #0284c7; color: #fff; border: none; padding: 10px 18px; border-radius: 9px; font-weight: 700; cursor: pointer; }
    button:hover { background: #0369a1; }
    #contador { font-size: 2rem; font-weight: 800; color: #0284c7; }
    ul li { padding: 5px 0; }
  </style>
</head>
<body>
  <h1>⚡ JavaScript ao vivo</h1>

  <div class="box">
    <p>Contador com eventos:</p>
    <p id="contador">0</p>
    <button id="btnMais">+1</button>
    <button id="btnMenos">-1</button>
    <button id="btnZerar">Zerar</button>
  </div>

  <div class="box">
    <p><strong>Gerador de lista:</strong></p>
    <input id="entrada" placeholder="Digite um item">
    <button id="btnAdd">Adicionar</button>
    <ul id="lista"></ul>
  </div>

  <script>
    let valor = 0;
    const el = document.getElementById('contador');
    const lista = document.getElementById('lista');

    document.getElementById('btnMais').onclick = () => { valor++; el.textContent = valor; };
    document.getElementById('btnMenos').onclick = () => { valor--; el.textContent = valor; };
    document.getElementById('btnZerar').onclick = () => { valor = 0; el.textContent = valor; };

    function adicionar() {
      const campo = document.getElementById('entrada');
      if (!campo.value.trim()) return;
      const li = document.createElement('li');
      li.textContent = '• ' + campo.value;
      lista.appendChild(li);
      campo.value = '';
      campo.focus();
    }
    document.getElementById('btnAdd').onclick = adicionar;
    document.getElementById('entrada').addEventListener('keydown', e => {
      if (e.key === 'Enter') adicionar();
    });
  </script>
</body>
</html>`
  },
  quiz: [
    { q: "Qual a diferença entre let e const?", opts: ["Nenhuma", "let pode ser reatribuída, const não", "const é mais rápido", "let só funciona em loops"], answer: 1,
      feedback: "const cria uma referência imutável. Use let apenas quando o valor realmente precisar mudar." },
    { q: "Qual comparação NÃO usa coerção de tipo?", opts: ["==", "===", "!=", "=?"], answer: 1,
      feedback: "=== compara valor E tipo. '5' === 5 é false, enquanto '5' == 5 é true." },
    { q: "O que document.querySelector('.item') retorna?", opts: ["Todos os elementos com class item", "O primeiro elemento que casa com o seletor", "Um array", "O id do elemento"], answer: 1,
      feedback: "querySelector retorna o PRIMEIRO match. use querySelectorAll para todos." }
  ],
  flashcards: [
    { q: "Quais os 3 modos de declarar variável em JS?", a: "var (evitar, escopo confuso), let (reatribuível) e const (imutável). Padrão moderno: const por padrão, let quando necessário." },
    { q: "O que é o DOM?", a: "Document Object Model — representação em memória da página como árvore de objetos, acessível via JavaScript." },
    { q: "O que faz addEventListener?", a: "Associa uma função a um evento (click, input, keydown…) sem sobrescrever handlers anteriores." },
    { q: "Diferença entre == e ===?", a: "== compara convertendo tipos (coerção). === compara tipo E valor. Prefira sempre ===." },
    { q: "O que Array.map() faz?", a: "Cria um NOVO array aplicando uma função a cada item, mantendo o mesmo tamanho do original." }
  ]
},
{
  id: "js-assincrono",
  part: "Parte 1 — Fundamentos da Web",
  icon: "🔄",
  title: "JavaScript assíncrono: Promises e async/await",
  desc: "Callbacks, Promises, async/await, fetch e consumo de APIs.",
  level: "medium",
  minutes: 30,
  tags: ["JavaScript", "APIs", "Fetch"],
  lead: "A web é assíncrona: requisições, temporizadores e eventos não bloqueiam a interface. Entenda Promises e async/await para dominar esse fluxo.",
  sections: [
    { h: "Por que assincronismo?", html: `
      <p>Se o JavaScript esperasse uma resposta de rede parando tudo, a página <strong>congelaria</strong>. Por isso operações lentas rodam em segundo plano e o código recebe uma resposta depois:</p>
      <ul>
        <li><strong>Síncrono</strong> — executa linha por linha, na ordem (cálculos rápidos);</li>
        <li><strong>Assíncrono</strong> — dispara e continua, notifica quando termina (rede, timers).</li>
      </ul>
    `},
    { h: "Promises", html: `
      <p>Uma <strong>Promise</strong> representa um valor que vai existir (ou falhar) no futuro. Ela está em um de três estados:</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Estado</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td><code>pending</code></td><td>Ainda processando</td></tr>
          <tr><td><code>fulfilled</code></td><td>Deu certo (resolve)</td></tr>
          <tr><td><code>rejected</code></td><td>Falhou (reject)</td></tr>
        </tbody>
      </table></div>
      <pre><code>const esperar = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Pronto!"), 1000);
});

esperar
  .then(resultado => console.log(resultado))  // sucesso
  .catch(erro => console.error(erro))         // falha
  .finally(() => console.log("sempre roda"));</code></pre>
    `},
    { h: "async/await: a sintaxe moderna", html: `
      <p><code>async</code> e <code>await</code> deixam código assíncrono com aparência de síncrono — muito mais legível:</p>
      <pre><code>async function carregarUsuario() {
  try {
    const resposta = await fetch("https://api.exemplo.com/usuarios/1");
    const dados = await resposta.json();
    console.log(dados.nome);
  } catch (erro) {
    console.error("Falhou:", erro);
  }
}</code></pre>
      <div class="callout info"><span class="co-title">Regra</span><p><code>await</code> só funciona dentro de funções <code>async</code> (ou no topo de módulos). Ele pausa aquela função — mas NÃO bloqueia o resto da página.</p></div>
    `},
    { h: "fetch: conversando com APIs", html: `
      <pre><code>// GET
const r = await fetch("https://api.exemplo.com/posts");
const posts = await r.json();

// POST
const r2 = await fetch("https://api.exemplo.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ titulo: "Olá", corpo: "Mundo" })
});</code></pre>
      <div class="callout warn"><span class="co-title">Pegadinha</span><p><code>fetch</code> NÃO lança erro em respostas 404/500 — só em falha de rede. Verifique sempre <code>resposta.ok</code>.</p></div>
    `}
  ],
  playground: {
    tabs: ["index.html"],
    starter: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Async Demo</title>
  <style>
    body { font-family: system-ui; max-width: 560px; margin: 36px auto; padding: 0 16px; color: #1e293b; }
    h1 { color: #0284c7; }
    .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 14px 0; }
    button { background: #0284c7; color: #fff; border: none; padding: 10px 18px; border-radius: 9px; font-weight: 700; cursor: pointer; }
    #saida { font-family: monospace; white-space: pre-wrap; background: #0f172a; color: #38bdf8; padding: 14px; border-radius: 10px; min-height: 90px; }
  </style>
</head>
<body>
  <h1>🔄 Assíncrono na prática</h1>

  <div class="box">
    <button id="btnTimer">Esperar 2s (Promise)</button>
    <button id="btnApi">Buscar dados (simulado)</button>
    <button id="btnLimpar" style="background:#64748b">Limpar</button>
  </div>

  <div class="box">
    <strong>Saída:</strong>
    <div id="saida">Aguardando ação…</div>
  </div>

  <script>
    const saida = document.getElementById('saida');
    const log = (txt) => saida.textContent += '\\n' + txt;

    function esperar(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    document.getElementById('btnTimer').onclick = async () => {
      saida.textContent = '⏳ Esperando 2 segundos…';
      const t0 = Date.now();
      await esperar(2000);
      saida.textContent = '✅ Terminou! (' + (Date.now() - t0) + 'ms)';
    };

    document.getElementById('btnApi').onclick = async () => {
      saida.textContent = '📡 Buscando…';
      try {
        await esperar(1200);
        const usuario = { id: 1, nome: 'Ana Silva', cargo: 'Dev Front-End' };
        await esperar(600);
        log('👤 ' + usuario.nome);
        log('💼 ' + usuario.cargo);
        log('✔️ Carregado com async/await!');
      } catch (e) {
        log('❌ Erro: ' + e.message);
      }
    };

    document.getElementById('btnLimpar').onclick = () => {
      saida.textContent = 'Aguardando ação…';
    };
  </script>
</body>
</html>`
  },
  quiz: [
    { q: "Qual o estado inicial de uma Promise?", opts: ["fulfilled", "rejected", "pending", "resolved"], answer: 2,
      feedback: "Promise nasce como pending (pendente). Depois vira fulfilled ou rejected." },
    { q: "O que o await faz?", opts: ["Para a página inteira", "Pausa a função async até a Promise resolver", "Deleta a Promise", "Cria um loop"], answer: 1,
      feedback: "await pausa APENAS a função async onde está. O resto da página continua rodando normalmente." },
    { q: "fetch lança erro em HTTP 404?", opts: ["Sim, sempre", "Não, apenas em falhas de rede — verifique response.ok", "Só em HTTPS", "Só em POST"], answer: 1,
      feedback: "fetch só rejeita em falha de rede. Respostas 4xx/5xx chegam normalmente; você precisa checar res.ok." }
  ],
  flashcards: [
    { q: "Quais os 3 estados de uma Promise?", a: "pending (pendente), fulfilled (resolvida com sucesso) e rejected (rejeitada/com erro)." },
    { q: "Como capturar erro com async/await?", a: "Usando try/catch: o await dentro do try lança a exceção da Promise rejeitada no catch." },
    { q: "O que retorna fetch()?", a: "Uma Promise de um objeto Response. Para ler o corpo: await response.json() (ou .text())." },
    { q: "async function sempre retorna?", a: "Sempre retorna uma Promise — mesmo que você use return com valor simples, ele é embrulhado." }
  ]
},
{
  id: "git-github",
  part: "Parte 1 — Fundamentos da Web",
  icon: "🌿",
  title: "Git e GitHub: controle de versões",
  desc: "Repositórios, commits, branches, merge e colaboração.",
  level: "medium",
  minutes: 25,
  tags: ["Git", "GitHub", "Colaboração"],
  lead: "Git salva o histórico do seu código; GitHub coloca ele na nuvem para você e sua equipe colaborarem.",
  sections: [
    { h: "O problema que o Git resolve", html: `
      <p>Sem controle de versões, você teria pastas como <code>projeto</code>, <code>projeto-final</code>, <code>projeto-final-v2</code>… O Git guarda <strong>todos os estados</strong> do projeto e permite voltar no tempo, testar mudanças em paralelo e colaborar sem conflito.</p>
    `},
    { h: "Comandos essenciais", html: `
      <pre><code># configurar uma vez
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# iniciar um repositório
git init
git status                  # o que mudou?

# registrar mudanças
git add arquivo.js          # adiciona arquivo
git add .                   # adiciona tudo
git commit -m "mensagem"    # salva no histórico

# ver histórico
git log --oneline</code></pre>
    `},
    { h: "Remoto e colaboração", html: `
      <pre><code># conectar ao GitHub
git remote add origin https://github.com/voce/projeto.git
git push -u origin main      # envia para a nuvem
git pull                     # baixa mudanças do remoto

# clonar projeto existente
git clone https://github.com/outro/projeto.git</code></pre>
      <div class="callout tip"><span class="co-title">Fluxo básico</span><p>Edite → <code>git add</code> → <code>git commit</code> → <code>git push</code>. Repita a cada mudança importante.</p></div>
    `},
    { h: "Branches: código em paralelo", html: `
      <pre><code>git branch nova-feature        # cria branch
git checkout nova-feature      # entra nela
# ou tudo de uma vez:
git switch -c nova-feature

# ... faz as mudanças e commita ...

git checkout main              # volta para main
git merge nova-feature         # junta as mudanças</code></pre>
      <p>Cada <strong>branch</strong> é uma linha do tempo independente. Assim você testa recursos sem quebrar o código principal.</p>
    `},
    { h: "Resolvendo conflitos", html: `
      <p>Quando duas pessoas mudam a <strong>mesma linha</strong> do mesmo arquivo, o Git não sabe quem vence. Ele marca o conflito no arquivo:</p>
      <pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
código do seu branch
=======
código do outro branch
&gt;&gt;&gt;&gt;&gt;&gt;&gt; outra-branch</code></pre>
      <p>Edite, escolha o resultado certo, remova as marcações e faça <code>git add</code> + <code>git commit</code>.</p>
    `}
  ],
  playground: null,
  quiz: [
    { q: "Qual comando salva as mudanças no histórico?", opts: ["git push", "git commit", "git add", "git pull"], answer: 1,
      feedback: "git add prepara; git commit salva de fato no histórico local. git push leva para o remoto." },
    { q: "Para que serve uma branch?", opts: ["Aumentar velocidade", "Trabalhar em mudanças em paralelo sem afetar a main", "Apagar histórico", "Comprimir arquivos"], answer: 1,
      feedback: "Branch = linha do tempo paralela. Permite desenvolver features e corrigições com segurança." },
    { q: "git pull faz o quê?", opts: ["Envia commits", "Baixa e integra mudanças do repositório remoto", "Apaga o repositório", "Cria um commit"], answer: 1,
      feedback: "pull = fetch (baixa) + merge (integra). Use antes de começar a trabalhar para ter o código atualizado." }
  ],
  flashcards: [
    { q: "Qual a diferença entre git add e git commit?", a: "add = staging area (prepara). commit = snapshot permanente no histórico com mensagem." },
    { q: "O que é um repositório remoto?", a: "Cópia do projeto hospedada (GitHub, GitLab) para colaboração e backup." },
    { q: "Como resolver um conflito de merge?", a: "Abrir o arquivo, remover as marcações <<<<<<< / ======= / >>>>>>>, manter o código desejado, git add e git commit." },
    { q: "O que significa git clone?", a: "Baixa uma cópia completa do repositório remoto (com histórico) para sua máquina." }
  ]
},
{
  id: "react-fundamentos",
  part: "Parte 2 — Frontend Moderno",
  icon: "⚛️",
  title: "React: componentes e estado",
  desc: "JSX, componentes, props, estado e o ciclo de renderização.",
  level: "medium",
  minutes: 35,
  tags: ["React", "Componentes", "JSX"],
  lead: "React quebra a interface em componentes reutilizáveis que reagem automaticamente às mudanças de dados.",
  sections: [
    { h: "O que é React?", html: `
      <p>React é uma biblioteca (não framework) para criar interfaces <strong>componentizadas</strong>. A ideia central: em vez de manipular o DOM manualmente, você <strong>descreve</strong> como a tela deve ficar para cada estado de dados — e o React atualiza o que mudou.</p>
      <div class="callout info"><span class="co-title">Virtus do Virtual DOM</span><p>O React compara a árvore anterior com a nova (diffing) e altera no navegador apenas o que realmente mudou — isso é rápido.</p></div>
    `},
    { h: "JSX: HTML dentro do JavaScript", html: `
      <pre><code>const elemento = (
  &lt;div className="card"&gt;
    &lt;h1&gt;Olá, {nome}&lt;/h1&gt;
    &lt;p&gt;Contagem: {contador}&lt;/p&gt;
  &lt;/div&gt;
);</code></pre>
      <ul>
        <li><code>className</code> em vez de <code>class</code> (class é palavra reservada no JS);</li>
        <li><code>{expressão}</code> embute qualquer valor JavaScript;</li>
        <li>JSX precisa de um único elemento raiz (ou use <code>&lt;&gt;…&lt;/&gt;</code>).</li>
      </ul>
    `},
    { h: "Componentes", html: `
      <p>Componente é uma função que retorna JSX:</p>
      <pre><code>function Saudacao({ nome, cargo }) {
  return (
    &lt;div className="card"&gt;
      &lt;h2&gt;{nome}&lt;/h2&gt;
      &lt;p&gt;{cargo}&lt;/p&gt;
    &lt;/div&gt;
  );
}

// Uso:
&lt;Saudacao nome="Ana" cargo="Dev" /&gt;</code></pre>
      <p><strong>Props</strong> são os parâmetros do componente — dados que vêm de cima e não devem ser alterados dentro dele.</p>
    `},
    { h: "Estado (state)", html: `
      <p>Props são somente leitura; <strong>estado</strong> é o dado que o próprio componente gerencia e que, quando muda, <strong>re-renderiza</strong> a interface:</p>
      <pre><code>import { useState } from "react";

function Contador() {
  const [numero, setNumero] = useState(0);
  //   ^valor     ^função que atualiza   ^valor inicial

  return (
    &lt;div&gt;
      &lt;p&gt;{numero}&lt;/p&gt;
      &lt;button onClick={() =&gt; setNumero(numero + 1)}&gt;
        Somar
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      <div class="callout warn"><span class="co-title">Nunca altere o estado direto</span><p>Errado: <code>numero = 5</code>. Certo: <code>setNumero(5)</code>. Só a função de atualização dispara a nova renderização.</p></div>
    `},
    { h: "Renderização condicional e listas", html: `
      <pre><code>// Condicional
{usuario ? &lt;Painel /&gt; : &lt;Login /&gt;}
{contador > 0 &amp;&amp; &lt;span&gt;Tem itens&lt;/span&gt;}

// Listas — sempre use key
&lt;ul&gt;
  {tarefas.map(t =&gt; (
    &lt;li key={t.id}&gt;{t.texto}&lt;/li&gt;
  ))}
&lt;/ul&gt;</code></pre>
      <p>A <code>key</code> única ajuda o React a identificar cada item e atualizar apenas o que mudou.</p>
    `}
  ],
  playground: {
    tabs: ["index.html"],
    starter: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>React via CDN (demo)</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui; max-width: 560px; margin: 36px auto; padding: 0 16px; color: #1e293b; }
    h1 { color: #0ea5e9; }
    .card { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 18px; margin: 12px 0; }
    .card h3 { margin-bottom: 6px; color: #0284c7; }
    button { background: #0ea5e9; color: #fff; border: none; padding: 9px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; margin-right: 6px; }
    .tag { display: inline-block; background: #0ea5e9; color: #fff; font-size: 11px; padding: 2px 9px; border-radius: 20px; }
  </style>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState } = React;

    function Tarefa({ texto, feita, onToggle }) {
      return (
        &lt;li onClick={onToggle}
            style={{ textDecoration: feita ? 'line-through' : 'none',
                     cursor: 'pointer', padding: '6px 0' }}&gt;
          {feita ? '✅' : '⬜'} {texto}
        &lt;/li&gt;
      );
    }

    function App() {
      const [tarefas, setTarefas] = useState([
        { id: 1, texto: 'Estudar componentes', feita: true },
        { id: 2, texto: 'Praticar useState', feita: false },
        { id: 3, texto: 'Criar um projeto', feita: false },
      ]);
      const [nova, setNova] = useState('');

      const alternar = (id) =&gt; {
        setTarefas(ts =&gt; ts.map(t =&gt;
          t.id === id ? { ...t, feita: !t.feita } : t));
      };

      const adicionar = () =&gt; {
        if (!nova.trim()) return;
        setTarefas(ts =&gt; [...ts, { id: Date.now(), texto: nova, feita: false }]);
        setNova('');
      };

      const concluidas = tarefas.filter(t =&gt; t.feita).length;

      return (
        &lt;div&gt;
          &lt;h1&gt;⚛️ Lista com React&lt;/h1&gt;
          &lt;div className="card"&gt;
            &lt;h3&gt;Tarefas &lt;span className="tag"&gt;{concluidas}/{tarefas.length}&lt;/span&gt;&lt;/h3&gt;
            &lt;ul style={{ listStyle: 'none', padding: 0 }}&gt;
              {tarefas.map(t =&gt; (
                &lt;Tarefa key={t.id} {...t} onToggle={() =&gt; alternar(t.id)} /&gt;
              ))}
            &lt;/ul&gt;
            &lt;input value={nova} onChange={e =&gt; setNova(e.target.value)}
                   onKeyDown={e =&gt; e.key === 'Enter' &amp;&amp; adicionar()}
                   placeholder="Nova tarefa…" style={{ padding: 8, borderRadius: 8, border: '1px solid #bae6fd', width: '70%' }} /&gt;
            {' '}
            &lt;button onClick={adicionar}&gt;+&lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(&lt;App /&gt;);
  </script>
</body>
</html>`
  },
  quiz: [
    { q: "Por que usamos className em vez de class no JSX?", opts: ["É mais bonito", "class é palavra reservada do JavaScript", "React não aceita class", "Para funcionar no IE"], answer: 1,
      feedback: "class é reservada no JS (usada em classes de objetos), então o React adotou className." },
    { q: "Qual a diferença entre props e state?", opts: ["Nenhuma", "Props vêm de cima e são somente leitura; state é gerenciado pelo componente", "Props são mais rápidas", "State só existe em classes"], answer: 1,
      feedback: "Props = dados imutáveis passados pelo pai. State = dados internos que, ao mudar, re-renderizam o componente." },
    { q: "Por que precisamos de key nas listas?", opts: ["Para estilizar", "Para o React identificar cada item e atualizar só o que mudou", "Porque JSX exige", "Para ordenar"], answer: 1,
      feedback: "keys estáveis ajudam o React no diffing — sem elas, ele recria itens inteiros desnecessariamente." }
  ],
  flashcards: [
    { q: "O que é JSX?", a: "Sintaxe parecida com HTML dentro de JavaScript que descreve a UI. É transpilada para chamadas de React.createElement." },
    { q: "O que faz useState?", a: "Cria uma variável de estado e sua função de atualização. Ao chamar a função, o componente re-renderiza." },
    { q: "O que é prop drilling?", a: "Passar props através de muitos níveis de componentes aninhados. Soluções: composição ou Context API." },
    { q: "Quando um componente re-renderiza?", a: "Quando seu state muda, quando um pai re-renderiza (e ele recebe props novas) ou quando o contexto usado muda." }
  ]
},
{
  id: "react-hooks",
  part: "Parte 2 — Frontend Moderno",
  icon: "🪝",
  title: "Hooks: useEffect e hooks personalizados",
  desc: "Efeitos colaterais, dependências, limpeza e custom hooks.",
  level: "medium",
  minutes: 30,
  tags: ["React", "Hooks", "useEffect"],
  lead: "Hooks estendem funcionalidades dos componentes: sincronizar com sistemas externos, memorizar cálculos e extrair lógica reutilizável.",
  sections: [
    { h: "useEffect: efeitos colaterais", html: `
      <p><code>useEffect</code> roda código <strong>depois</strong> da renderização — para buscar dados, inscrever eventos, manipular timers:</p>
      <pre><code>useEffect(() =&gt; {
  document.title = "Contador: " + numero;
}, [numero]);
//              ^ array de dependências</code></pre>
      <ul>
        <li><strong>[]</strong> — roda uma vez, ao montar;</li>
        <li><strong>[x]</strong> — roda quando x muda;</li>
        <li><strong>sem array</strong> — roda a cada renderização (use com cuidado).</li>
      </ul>
    `},
    { h: "Função de limpeza", html: `
      <p>Se o efeito cria algo (timer, listener), retorne uma função para limpar:</p>
      <pre><code>useEffect(() =&gt; {
  const id = setInterval(() =&gt; {
    console.log("tic");
  }, 1000);

  return () =&gt; clearInterval(id); // limpa ao desmontar
}, []);</code></pre>
      <div class="callout danger"><span class="co-title">Bug clássico</span><p>Esquecer a limpeza causa vazamento de memória: intervals e listeners continuam rodando mesmo depois do componente sair da tela.</p></div>
    `},
    { h: "useMemo e useCallback", html: `
      <pre><code>// useMemo — memoriza um CÁLCULO
const total = useMemo(() =&gt;
  itens.reduce((s, i) =&gt; s + i.preco, 0),
[itens]);

// useCallback — memoriza uma FUNÇÃO
const handleClick = useCallback(() =&gt; {
  selecionar(id);
}, [id]);</code></pre>
      <p>Só use quando houver problema de performance real — não memorize tudo "por precaução".</p>
    `},
    { h: "Custom hooks", html: `
      <p>Extraia lógica reutilizável em funções que usam hooks — o nome deve começar com <code>use</code>:</p>
      <pre><code>function useContador(valorInicial = 0) {
  const [valor, setValor] = useState(valorInicial);

  const incrementar = () =&gt; setValor(v =&gt; v + 1);
  const zerar = () =&gt; setValor(valorInicial);

  return { valor, incrementar, zerar };
}

// Em qualquer componente:
const { valor, incrementar, zerar } = useContador(10);</code></pre>
    `}
  ],
  playground: {
    tabs: ["index.html"],
    starter: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Hooks Demo</title>
  <style>
    body { font-family: system-ui; max-width: 560px; margin: 36px auto; padding: 0 16px; color: #1e293b; }
    h1 { color: #7c3aed; }
    .card { background: #faf5ff; border: 1px solid #ddd6fe; border-radius: 12px; padding: 18px; margin: 12px 0; }
    .card h3 { color: #7c3aed; margin-bottom: 8px; font-size: 1rem; }
    button { background: #7c3aed; color: #fff; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 700; cursor: pointer; margin-right: 6px; }
    #relogio { font-family: monospace; font-size: 1.6rem; font-weight: 800; color: #7c3aed; }
    .status { font-size: .85rem; color: #64748b; }
  </style>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect, useMemo } = React;

    function useContador(inicial = 0) {
      const [valor, setValor] = useState(inicial);
      return {
        valor,
        incrementar: () =&gt; setValor(v =&gt; v + 1),
        zerar: () =&gt; setValor(inicial)
      };
    }

    function App() {
      const [rodando, setRodando] = useState(true);
      const [agora, setAgora] = useState(new Date());
      const tarefa = useContador(0);

      // useEffect com dependência [rodando] + limpeza
      useEffect(() =&gt; {
        if (!rodando) return;
        const id = setInterval(() =&gt; setAgora(new Date()), 1000);
        return () =&gt; clearInterval(id);
      }, [rodando]);

      // useMemo: cálculo pesado memorizado
      const dobro = useMemo(() =&gt; {
        console.log('calculando…');
        return tarefa.valor * 2;
      }, [tarefa.valor]);

      return (
        &lt;div&gt;
          <h1>🪝 Hooks na prática</h1>

          &lt;div className="card"&gt;
            <h3>useEffect — relógio</h3>
            &lt;div id="relogio"&gt;{agora.toLocaleTimeString()}&lt;/div&gt;
            &lt;button onClick={() =&gt; setRodando(r =&gt; !r)}&gt;
              {rodando ? '⏸ Pausar' : '▶ Retomar'}
            &lt;/button&gt;
            &lt;p className="status"&gt;{rodando ? 'Timer ativo — repare no console' : 'Pausado'}&lt;/p&gt;
          &lt;/div&gt;

          &lt;div className="card"&gt;
            <h3>useMemo + Custom Hook</h3>
            &lt;p&gt;Valor: &lt;strong&gt;{tarefa.valor}&lt;/strong&gt; · Dobro (memo): &lt;strong&gt;{dobro}&lt;/strong&gt;&lt;/p&gt;
            &lt;button onClick={tarefa.incrementar}&gt;+1&lt;/button&gt;
            &lt;button onClick={tarefa.zerar} style={{background:'#64748b'}}&gt;Zerar&lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(&lt;App /&gt;);
  </script>
</body>
</html>`
  },
  quiz: [
    { q: "Quando useEffect com [] executa?", opts: ["A cada renderização", "Uma vez, ao montar o componente", "Nunca", "Quando o state muda"], answer: 1,
      feedback: "Array vazio = sem dependências = roda apenas na montagem (e a função de limpeza, ao desmontar)." },
    { q: "Para que serve a função de limpeza do useEffect?", opts: ["Melhorar performance", "Cancelar timers, remover listeners e evitar vazamentos", "Zerar o state", "Remover o componente"], answer: 1,
      feedback: "Retornar uma função dentro do effect permite cancelar o que foi criado (clearInterval, removeEventListener…) ao desmontar ou antes do próximo efeito." },
    { q: "Qual a regra para nomear um custom hook?", opts: ["Qualquer nome", "Deve começar com 'use'", "Deve ter extensão .hook", "Precisa ser export default"], answer: 1,
      feedback: "O prefixo use é obrigatório — é assim que o React reconhece que o hook pode usar outros hooks." }
  ],
  flashcards: [
    { q: "O que é um efeito colateral?", a: "Ação que o componente faz FORA do React: timers, fetch, subscriptions, manipulação do DOM." },
    { q: "Quando NÃO usar useEffect?", a: "Para derivar dados do state (use variável/memo direto) e para lidar com eventos (use onClick)." },
    { q: "O que faz useMemo?", a: "Memoriza o resultado de um cálculo até que as dependências mudem — evita recálculos custosos." },
    { q: "Como criar um hook personalizado?", a: "Função que usa outros hooks e começa com 'use'. Retorna valores/funções prontos para reutilização." }
  ]
},
{
  id: "node-backend",
  part: "Parte 3 — Backend com Node.js",
  icon: "🟢",
  title: "Node.js: seu primeiro backend",
  desc: "Runtime JavaScript no servidor, npm, módulos e API REST com Express.",
  level: "medium",
  minutes: 35,
  tags: ["Node.js", "Express", "API"],
  lead: "Node.js permite usar JavaScript fora do navegador — para criar servidores, APIs e ferramentas de linha de comando.",
  sections: [
    { h: "O que é Node.js?", html: `
      <p>Node.js é um <strong>runtime</strong> que executa JavaScript fora do navegador, usando o motor V8 (do Chrome). Ele é ideal para I/O intensivo — como responder requisições — pois usa um modelo de <strong>event loop</strong> não bloqueante.</p>
      <div class="callout info"><span class="co-title">npm</span><p>O npm (Node Package Manager) é o maior ecossistema de bibliotecas do mundo. <code>npm install express</code> baixa o pacote para o projeto.</p></div>
    `},
    { h: "Estrutura de um projeto", html: `
      <pre><code>meu-api/
├── package.json      # metadados e dependências
├── src/
│   └── server.js     # ponto de entrada
└── node_modules/     # dependências (não versionar)</code></pre>
      <pre><code># iniciar projeto
npm init -y
npm install express
npm install --save-dev nodemon</code></pre>
    `},
    { h: "API REST com Express", html: `
      <pre><code>const express = require("express");
const app = express();

app.use(express.json()); // interpretar JSON no corpo

// dados em memória
let tarefas = [
  { id: 1, texto: "Estudar Node", feita: false }
];

// GET — listar
app.get("/tarefas", (req, res) =&gt; {
  res.json(tarefas);
});

// GET — um item
app.get("/tarefas/:id", (req, res) =&gt; {
  const t = tarefas.find(t =&gt; t.id == req.params.id);
  if (!t) return res.status(404).json({ erro: "Não encontrada" });
  res.json(t);
});

// POST — criar
app.post("/tarefas", (req, res) =&gt; {
  const nova = { id: Date.now(), texto: req.body.texto, feita: false };
  tarefas.push(nova);
  res.status(201).json(nova);
});

app.listen(3000, () =&gt;
  console.log("🚀 API rodando em http://localhost:3000")
);</code></pre>
    `},
    { h: "Métodos HTTP e status", html: `
      <div class="table-wrap"><table>
        <thead><tr><th>Método</th><th>Uso</th><th>Sucesso</th></tr></thead>
        <tbody>
          <tr><td>GET</td><td>Ler dados</td><td>200</td></tr>
          <tr><td>POST</td><td>Criar</td><td>201</td></tr>
          <tr><td>PUT/PATCH</td><td>Atualizar</td><td>200</td></tr>
          <tr><td>DELETE</td><td>Remover</td><td>204</td></tr>
        </tbody>
      </table></div>
      <p>Erros comuns: <strong>400</strong> (dados inválidos), <strong>401</strong> (sem login), <strong>403</strong> (sem permissão), <strong>404</strong> (não existe), <strong>500</strong> (erro do servidor).</p>
    `},
    { h: "Rotas, middlewares e organização", html: `
      <pre><code>// Middleware = função entre request e response
function logger(req, res, next) {
  console.log(req.method, req.url);
  next(); // prossiga
}
app.use(logger);

// Roteador modular
const rotasTarefas = require("./routes/tarefas");
app.use("/tarefas", rotasTarefas);</code></pre>
      <p>Middleware pode autenticar, logar, validar dados ou tratar erros antes de chegar na rota final.</p>
    `}
  ],
  playground: null,
  quiz: [
    { q: "O que é o event loop do Node?", opts: ["Um loop infinito", "Mecanismo que processa callbacks/filas sem bloquear o servidor", "Um framework", "Um banco de dados"], answer: 1,
      feedback: "O event loop espera operações de I/O e executa callbacks quando prontos — por isso o Node lida bem com muitas conexões." },
    { q: "Qual status HTTP para recurso criado com sucesso?", opts: ["200", "201", "204", "404"], answer: 1,
      feedback: "201 Created indica que o POST gerou um novo recurso." },
    { q: "O que faz express.json()?", opts: ["Cria HTML", "Faz o Express interpretar corpos de requisição em JSON", "Gera documentação", "Sobe o servidor"], answer: 1,
      feedback: "É um middleware que transforma o body JSON em objeto JavaScript acessível via req.body." }
  ],
  flashcards: [
    { q: "O que é API REST?", a: "Estilo de arquitetura com recursos em URLs, verbos HTTP (GET/POST/PUT/DELETE) e representação em JSON." },
    { q: "O que é um middleware no Express?", a: "Função que intercepta a requisição antes da rota final — log, auth, validação, erros." },
    { q: "npm init -y cria o quê?", a: "O arquivo package.json com valores padrão, que registra scripts e dependências do projeto." },
    { q: "Diferença entre PUT e PATCH?", a: "PUT substitui o recurso inteiro; PATCH atualiza apenas os campos enviados." }
  ]
},
{
  id: "sql-banco",
  part: "Parte 4 — Banco de Dados",
  icon: "🗄️",
  title: "SQL: consultando e modelando dados",
  desc: "SELECT, WHERE, JOINs, agregações e modelagem de tabelas.",
  level: "medium",
  minutes: 35,
  tags: ["SQL", "PostgreSQL", "Modelagem"],
  lead: "SQL é a linguagem universal para conversar com bancos relacionais. Aprenda a consultar, cruzar e resumir dados.",
  sections: [
    { h: "O que é um banco relacional?", html: `
      <p>Um banco relacional organiza dados em <strong>tabelas</strong> (entidades) com <strong>linhas</strong> (registros) e <strong>colunas</strong> (atributos). Tabelas se relacionam por <strong>chaves</strong>:</p>
      <pre><code>CLIENTES                          PEDIDOS
+----+-------+----------+       +----+---------+-----------+
| id | nome  | email    |       | id | cliente | produto   |
+----+-------+----------+       +----+---------+-----------+
|  1 | Ana   | a@x.com  |       |  1 |    1    | Notebook  |
|  2 | Bruno | b@x.com  |       |  2 |    2    | Mouse     |
+----+-------+----------+       +----+---------+-----------+
                               pedido.cliente → cliente.id</code></pre>
    `},
    { h: "SELECT: lendo dados", html: `
      <pre><code>-- Selecionar colunas
SELECT nome, email FROM clientes;

-- Filtros
SELECT * FROM clientes WHERE cidade = 'São Paulo';
SELECT * FROM produtos WHERE preco &gt; 100 AND ativo = true;

-- Ordenação e limite
SELECT * FROM produtos ORDER BY preco DESC LIMIT 10;

-- Busca por texto (like)
SELECT * FROM clientes WHERE nome LIKE '%ana%';</code></pre>
      <div class="callout warn"><span class="co-title">Segurança</span><p>Nunca concatene valores na query. Use <strong>parâmetros preparados</strong> para evitar SQL Injection: <code>WHERE nome = $1</code> com valor separado.</p></div>
    `},
    { h: "JOIN: cruzando tabelas", html: `
      <pre><code>-- INNER JOIN: só quem combina nos dois lados
SELECT c.nome, p.id AS pedido, p.produto
FROM clientes c
INNER JOIN pedidos p ON p.cliente = c.id;

-- LEFT JOIN: todos os clientes, mesmo sem pedidos
SELECT c.nome, COUNT(p.id) AS total_pedidos
FROM clientes c
LEFT JOIN pedidos p ON p.cliente = c.id
GROUP BY c.id;</code></pre>
      <div class="table-wrap"><table>
        <thead><tr><th>JOIN</th><th>Retorna</th></tr></thead>
        <tbody>
          <tr><td>INNER</td><td>Somente correspondências nos dois lados</td></tr>
          <tr><td>LEFT</td><td>Tudo da tabela da esquerda + matches da direita</td></tr>
          <tr><td>RIGHT</td><td>Tudo da direita + matches da esquerda</td></tr>
          <tr><td>FULL</td><td>Tudo dos dois lados</td></tr>
        </tbody>
      </table></div>
    `},
    { h: "Agregações", html: `
      <pre><code>SELECT COUNT(*)  FROM usuarios;          -- quantidade
SELECT AVG(nota) FROM provas;            -- média
SELECT SUM(total) FROM vendas;           -- soma
SELECT MAX(preco), MIN(preco) FROM itens;-- extremos

-- Agrupar
SELECT cidade, COUNT(*) FROM clientes
GROUP BY cidade
HAVING COUNT(*) &gt; 10;</code></pre>
      <p><code>WHERE</code> filtra linhas <em>antes</em> de agrupar; <code>HAVING</code> filtra <em>depois</em> do GROUP BY.</p>
    `},
    { h: "INSERT, UPDATE, DELETE", html: `
      <pre><code>INSERT INTO clientes (nome, email)
VALUES ('Ana', 'ana@x.com');

UPDATE clientes SET nome = 'Ana Silva' WHERE id = 1;

DELETE FROM clientes WHERE id = 1;</code></pre>
      <div class="callout danger"><span class="co-title">Sempre use WHERE</span><p><code>UPDATE</code> ou <code>DELETE</code> sem WHERE afeta <strong>todas as linhas</strong> da tabela. Em produção, teste primeiro com SELECT.</p></div>
    `}
  ],
  playground: null,
  quiz: [
    { q: "Qual JOIN retorna todos os clientes, mesmo os sem pedidos?", opts: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "JOIN apenas"], answer: 1,
      feedback: "LEFT JOIN mantém todas as linhas da tabela da esquerda; onde não há match, aparecem NULLs." },
    { q: "Qual a diferença entre WHERE e HAVING?", opts: ["Nenhuma", "WHERE filtra antes do GROUP BY, HAVING filtra depois", "HAVING é mais rápido", "WHERE só funciona com JOIN"], answer: 1,
      feedback: "WHERE condiciona linhas individuais antes de agrupar; HAVING condiciona grupos já agregados." },
    { q: "Como evitar SQL Injection?", opts: ["Usando concatenação", "Parâmetros preparados (prepared statements)", "Escapando manualmente", "Tabelas diferentes"], answer: 1,
      feedback: "Queries parametrizadas separam código de dados — o banco nunca interpreta o valor como comando." }
  ],
  flashcards: [
    { q: "O que é uma chave primária (PRIMARY KEY)?", a: "Coluna que identifica unicamente cada linha de uma tabela. Não pode ser nula nem repetida." },
    { q: "O que é uma chave estrangeira (FOREIGN KEY)?", a: "Coluna que aponta para a chave primária de outra tabela, criando o relacionamento entre elas." },
    { q: "Diferença entre DELETE e TRUNCATE?", a: "DELETE remove linhas (com WHERE, pode ser desfeito com rollback). TRUNCATE limpa a tabela inteira rapidamente." },
    { q: "O que faz COUNT(*)?", a: "Conta o número de linhas (ou de grupos, no contexto de GROUP BY) do resultado." },
    { q: "O que é normalização?", a: "Processo de organizar tabelas para reduzir duplicação — ex.: dados de cliente em tabela própria, não repetidos em cada pedido." }
  ]
},
{
  id: "typescript",
  part: "Parte 5 — Profissionalização",
  icon: "🔷",
  title: "TypeScript: JavaScript com tipos",
  desc: "Tipagem estática, interfaces, generics e segurança em tempo de desenvolvimento.",
  level: "hard",
  minutes: 30,
  tags: ["TypeScript", "Tipagem", "Qualidade"],
  lead: "TypeScript adiciona tipos ao JavaScript e pega erros ANTES de o código rodar — essencial em projetos grandes.",
  sections: [
    { h: "Por que TypeScript?", html: `
      <p>JavaScript aceita <code>let x = 5; x = "texto";</code> sem reclamar — até o código quebrar em produção. TypeScript define o que cada variável aceita e o editor (VS Code) mostra o erro enquanto você digita.</p>
      <div class="callout tip"><span class="co-title">Curiosidade</span><p>TypeScript é compilado para JavaScript puro. O navegador/Node nunca vê os tipos — eles existem só para você e para a ferramenta.</p></div>
    `},
    { h: "Tipos básicos e anotações", html: `
      <pre><code>let nome: string = "Ana";
let idade: number = 25;
let ativo: boolean = true;
let tags: string[] = ["dev", "web"];
let nota: number | null = null;   // união de tipos

// Funções com tipos
function somar(a: number, b: number): number {
  return a + b;
}

// Arrow
const dobro = (n: number): number =&gt; n * 2;</code></pre>
    `},
    { h: "Interfaces e tipos", html: `
      <pre><code>interface Usuario {
  id: number;
  nome: string;
  email: string;
  admin?: boolean;   // opcional
}

const u: Usuario = {
  id: 1,
  nome: "Ana",
  email: "ana@x.com"
};

// Tipo alternativo (para union/intersection)
type Status = "pendente" | "ativo" | "inativo";
type ID = string | number;</code></pre>
      <p>Interfaces descrevem a <strong>forma</strong> dos objetos — como um contrato que o compilador valida.</p>
    `},
    { h: "Generics", html: `
      <p>Funções e estruturas que funcionam com <strong>qualquer tipo</strong>, mantendo a segurança:</p>
      <pre><code>function primeiro&lt;T&gt;(lista: T[]): T | undefined {
  return lista[0];
}

const n = primeiro([1, 2, 3]);       // number | undefined
const s = primeiro(["a", "b"]);      // string | undefined

// Genérico com restrição
function pegarId&lt;T extends { id: number }&gt;(obj: T): number {
  return obj.id;
}</code></pre>
    `},
    { h: "Narrowing e strict mode", html: `
      <pre><code>function processar(valor: string | number) {
  if (typeof valor === "string") {
    return valor.toUpperCase();   // TS sabe que é string aqui
  }
  return valor.toFixed(2);        // e number aqui
}</code></pre>
      <p>Ative <code>"strict": true</code> no <code>tsconfig.json</code> — é o modo que realmente protege seu código.</p>
    `}
  ],
  playground: null,
  quiz: [
    { q: "Os tipos do TypeScript existem no código final?", opts: ["Sim", "Não — são removidos na compilação", "Só em produção", "Só no navegador"], answer: 1,
      feedback: "A compilação remove os tipos. O que sai é JavaScript puro — os tipos agem apenas durante o desenvolvimento." },
    { q: "O que faz o operador | em tipos?", opts: ["Soma", "Cria uma união — o valor pode ser um OU outro", "Multiplica", "Divide"], answer: 1,
      feedback: "string | number aceita string OU number. É como dizer 'ou um, ou outro'." },
    { q: "O que é um generic <T>?", opts: ["Um tipo fixo", "Um marcador de tipo que muda conforme o uso", "Um erro de sintaxe", "Uma função especial"], answer: 1,
      feedback: "T é um parâmetro de tipo: quem chama define o tipo real, e o compilador o acompanha." }
  ],
  flashcards: [
    { q: "O que é type inference?", a: "Inferência de tipos: quando o TS deduz o tipo sozinho — ex.: const x = 5 infere number." },
    { q: "interface vs type?", a: "Ambos descrevem formas. interface: extensível (extends), boa para objetos. type: mais versátil (uniões, interseções, primitivos)." },
    { q: "O que faz as?:", a: "Marca uma propriedade como opcional — pode ser omitida ao criar o objeto." },
    { q: "O que é narrowing?", a: "O TS restringe o tipo após checagens (typeof, instanceof), liberando acesso seguro aos membros." }
  ]
},
{
  id: "deploy",
  part: "Parte 5 — Profissionalização",
  icon: "🚀",
  title: "Deploy: colocando seu projeto no ar",
  desc: "Build, variáveis de ambiente, hospedagem e boas práticas de produção.",
  level: "hard",
  minutes: 25,
  tags: ["Deploy", "DevOps", "Produção"],
  lead: "Última etapa: levar o projeto do seu computador para o mundo real — com segurança e boas práticas.",
  sections: [
    { h: "O que acontece no deploy?", html: `
      <ol>
        <li><strong>Build</strong> — o código é compilado/minificado (bundle);</li>
        <li><strong>Ambiente</strong> — variáveis de configuração são definidas;</li>
        <li><strong>Hospedagem</strong> — arquivos vão para servidores (estáticos) ou o backend sobe (runtime);</li>
        <li><strong>Domínio</strong> — DNS aponta seu endereço para o servidor.</li>
      </ol>
    `},
    { h: "Variáveis de ambiente", html: `
      <p>Nunca coloque segredos no código! Use <code>.env</code>:</p>
      <pre><code># .env (NÃO versionar — adicione ao .gitignore)
PORT=3000
DATABASE_URL=postgres://user:senha@host:5432/banco
API_KEY=abc123</code></pre>
      <pre><code>// No código (Node)
const porta = process.env.PORT || 3000;</code></pre>
      <div class="callout danger"><span class="co-title">Nunca commite .env</span><p>Segredos versionados no Git são vazamentos. Adicione <code>.env</code> ao <code>.gitignore</code> e configure as variáveis direto na plataforma de hospedagem.</p></div>
    `},
    { h: "Onde hospedar?", html: `
      <div class="table-wrap"><table>
        <thead><tr><th>Tipo</th><th>Plataformas</th><th>Ideal para</th></tr></thead>
        <tbody>
          <tr><td>Frontend estático</td><td>Vercel, Netlify, GitHub Pages</td><td>React/HTML puro (gratuito)</td></tr>
          <tr><td>Backend Node</td><td>Render, Railway, Fly.io, VPS</td><td>APIs Express</td></tr>
          <tr><td>Banco de dados</td><td>Neon, Supabase, Railway</td><td>PostgreSQL gerenciado</td></tr>
        </tbody>
      </table></div>
    `},
    { h: "Checklist antes de publicar", html: `
      <ul>
        <li>✅ Variáveis de ambiente configuradas (nenhum segredo no código);</li>
        <li>✅ <code>.gitignore</code> completo (node_modules, .env, dist);</li>
        <li>✅ Erros tratados (não vazar stack trace para o usuário);</li>
        <li>✅ HTTPS ativo;</li>
        <li>✅ Build de produção testado localmente (<code>npm run build</code>);</li>
        <li>✅ Logs e monitoramento configurados.</li>
      </ul>
    `},
    { h: "CI/CD: automação", html: `
      <p><strong>CI</strong> (Integração Contínua) roda testes a cada push; <strong>CD</strong> (Entrega Contínua) publica automaticamente quando passa:</p>
      <pre><code># exemplo mínimo (.github/workflows/ci.yml)
name: CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test
      - run: npm run build</code></pre>
      <p>Assim, código quebrado nunca chega ao ar.</p>
    `}
  ],
  playground: null,
  quiz: [
    { q: "Por que segredos não podem ir para o Git?", opts: ["O Git é lento", "Qualquer pessoa com acesso ao repositório veria as credenciais", "Arquivos .env pesam muito", "O Git não suporta texto"], answer: 1,
      feedback: "Git guarda histórico permanente. Segredo commitado continua lá mesmo depois de 'apagar' — é vazamento." },
    { q: "O que o CD (Entrega Contínua) faz?", opts: ["Copia arquivos", "Publica automaticamente quando os testes passam", "Cria commits", "Comprime imagens"], answer: 1,
      feedback: "CD automatiza a publicação: build → testes OK → deploy em produção, sem intervenção manual." },
    { q: "Para que serve o .gitignore?", opts: ["Ignorar erros", "Excluir arquivos/diretórios do versionamento (ex.: node_modules, .env)", "Apagar o projeto", "Comprimir o repositório"], answer: 1,
      feedback: "Evita versionar lixo e segredos: node_modules, builds e arquivos .env ficam fora do repositório." }
  ],
  flashcards: [
    { q: "O que é build?", a: "Processo que transforma o código-fonte (TSX, módulos) em arquivos otimizados prontos para produção (minificados, bundlados)." },
    { q: "O que é .gitignore?", a: "Arquivo que lista caminhos que o Git deve ignorar — node_modules, .env, dist, logs." },
    { q: "Diferença entre CI e CD?", a: "CI = testar/validar a cada push. CD = publicar automaticamente após validação. Juntos: pipeline de entrega." },
    { q: "O que é HTTPS e por que é obrigatório?", a: "HTTP com TLS/SSL — criptografa a comunicação. Exige certificado (Let's Encrypt é grátis) e é exigido por navegadores." }
  ]
}
];
