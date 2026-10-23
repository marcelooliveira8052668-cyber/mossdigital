# 📚 DevBook — Curso Full Stack do Zero ao Deploy

Plataforma de ensino **Full Stack** para quem quer virar desenvolvedor — do zero absoluto ao primeiro deploy. Feita com **HTML, CSS e JavaScript puros**: zero frameworks, zero build, **zero dependências**. Funciona offline como PWA.

- **Aula do curso** → [`index.html`](index.html) (ou `npm start`)
- **Landing page de vendas** → [`landing.html`](landing.html)

---

## 📁 Estrutura

```
devbook/
├── index.html              # entrada do curso (SPA)
├── landing.html            # landing page de vendas
├── package.json            # scripts (start / test)
├── sw.js                   # service worker (offline)
├── server.js               # servidor de dev sem dependências
│
├── assets/
│   ├── icon.svg            # ícone vetorial (reserva)
│   ├── icon-192.png        # ícone da PWA 192×192
│   ├── icon-512.png        # ícone da PWA 512×512 (instalação no celular)
│   ├── og-cover.svg        # capa para redes sociais (vetorial)
│   └── og-cover.png        # capa 1200×630 usada no compartilhamento
│
├── css/
│   ├── styles.css          # design system do curso (temas claro/escuro)
│   └── landing.css         # layout da landing page
│
├── js/
│   ├── content/            # 📚 DADOS — edite aqui para mudar conteúdo
│   │   ├── curriculum.js           # capítulos 1 a 11
│   │   ├── badges.js               # conquistas (badges)
│   │   ├── curriculum-advanced.js  # capítulos 12 a 15
│   │   ├── tracks.js               # 3 trilhas de carreira
│   │   ├── projects.js             # 3 projetos integradores
│   │   ├── challenges.js           # 6 desafios de código
│   │   └── certificate.js          # regras do certificado
│   │
│   └── modules/            # ⚙️ LÓGICA — raramente precisa editar
│       ├── progress.js             # XP, níveis, streak, Leitner, projetos, certificado
│       ├── playground.js           # editor + preview + console
│       ├── challenges.js           # sandbox de validação dos desafios
│       ├── labs.js                 # rendering de trilhas/projetos/desafios + certificado
│       ├── palette.js              # busca rápida (Ctrl+K)
│       ├── flashcards.js           # revisão espaçada
│       └── app.js                  # roteamento, renderização, tema, PWA
│
└── test/
    └── run.js              # suíte de testes (121 testes)
```

> **A regra da pasta:** `js/content/` é o que você **edita** para mudar o curso.
> `js/modules/` é a **máquina**. Se não for bug, não mexe.

---

## ▶️ Como rodar

```bash
npm start          # → http://localhost:8080
npm test           # roda a suíte de testes
```

Sem npm? Funciona igual:

```bash
node server.js 8080
node test/run.js
```

O `server.js` usa só `http`/`fs`/`path` do Node, manda `Cache-Control: no-store` e bloqueia path traversal.

---

## 🎯 O que tem dentro do curso

### 15 capítulos em 6 partes

| Parte | Conteúdo |
|-------|----------|
| **1. Fundamentos da Web** | HTML semântico · CSS (Box Model, Flexbox, Grid) · JavaScript · JS Assíncrono · Git/GitHub |
| **2. Frontend Moderno** | React (JSX, props, state) · Hooks (useEffect, useMemo, custom hooks) |
| **3. Backend com Node.js** | Runtime, npm, API REST com Express, middlewares |
| **4. Banco de Dados** | SQL, JOINs, agregações, modelagem |
| **5. Profissionalização** | TypeScript · Testes (Jest, Supertest, RTL) · Deploy, env vars, CI/CD |
| **6. Stack Moderna** | Next.js (App Router, Server Components) · Docker · Arquitetura, JWT, bcrypt, validação |

Cada capítulo traz teoria enxuta, tabelas comparativas, callouts de erro comum, **playground com código ao vivo**, **quiz** com feedback explicativo (15 XP por acerto) e **flashcards**.

### 🧭 3 trilhas de carreira

Front-End · Back-End · Full Stack — cada uma com a ordem de estudos, os projetos e as skills que você domina no final.

### 💪 6 desafios com validação automática

Cada desafio roda **casos de teste ocultos** contra o seu código num sandbox isolado (sem rede, sem acesso à página):

| Desafio | Nível | XP |
|---------|:-----:|---:|
| FizzBuzz em 4 flavors | Fácil | 30 |
| Detector de Palíndromos | Fácil | 40 |
| Gerador de Slug | Médio | 50 |
| Utilitários de Array | Médio | 60 |
| Validador de Payload | Médio | 60 |
| Debounce de Busca | Avançado | 80 |

### 📦 3 projetos de portfólio (300 pontos)

**Dashboard de Vendas** · **API REST de Tarefas** · **Loja Online Full Stack** — cada um com escopo, requisitos pontuados, bônus e um botão que copia o briefing em Markdown pro README do seu GitHub.

### 🎮 Gamificação

XP, 10 níveis, 14 conquistas, streak diário e **certificado de conclusão em PDF** (A4 paisagem).

### 🗺️ Navegação

- **Ctrl+K** ou `/` — busca fuzzy em capítulos, projetos, desafios e comandos
- **N** — próximo capítulo não lido · **F** — flashcards · **T** — tema · **?** — ajuda
- Sidebar com progresso por parte, sumário do capítulo com scroll spy, barra de leitura, filtros (todos / não lidos / concluídos)

---

## 🔒 Vendendo: controle de acesso

O `js/modules/gate.js` trava o conteúdo atrás de uma tela de código. Para ligar,
edite o bloco `CONFIG`:

```js
const CONFIG = {
  enabled: true,          // ← liga a trava
  freeChapters: 1,        // 1 = o capítulo 1 vira a "aula grátis" da landing
  freeSections: [],       // ex.: ["trilhas", "certificado"]
  codes: [
    "SEU-CODIGO-1",
    "SEU-CODIGO-2"
  ]
};
```

Gere códigos longos e aleatórios (ex.: `DEV-7K2M-9QX4`). Não use
`devbook2024` — é o primeiro que alguém tenta.

### ⚠️ Isto não é segurança

O conteúdo do curso viaja em arquivos `.js` que o navegador baixa. **Quem abrir o
DevTools lê o texto mesmo com a tela de bloqueio na frente.**

O que a trava resolve: o link não se espalha sozinho, e o comprador não bate na
porta. O que ela **não** resolve: alguém decidido de copiar.

Para proteção de verdade, o conteúdo não pode estar num repositório público:

| Opção | Como funciona |
|---|---|
| **Hotmart / Kiwify** (recomendado) | Você sobe o conteúdo na área de membros. A plataforma resolve login, pagamento, senha, e-mail e entrega |
| **Repo privado** | Converte o `devbook` em privado e envia o link por e-mail após a compra |
| **Storage privado** | Conteúdo em S3/Supabase com URL assinada, carregado via `fetch` autenticado |

---

## ⚖️ Página legal

`legal.html` reúne os Termos de Uso e a Política de Privacidade (LGPD), com os
requisitos que o Código de Defesa do Consumidor e a LGPD exigem:

- Identificação do fornecedor (nome, **CPF**, endereço, e-mail)
- Preço, formas de pagamento e parcelamento
- Entrega e acesso
- **Garantia de 7 dias** (CDC, art. 49)
- Obrigações do comprador e propriedade intelectual
- Limitação de responsabilidade
- Foro (domicílio do consumidor — CDC, art. 101, I)
- Política de privacidade com tabela de dados, base legal, prazo e compartilhamentos
- Direitos do titular (LGPD, art. 18) e contato com a ANPD

### ⚠️ Antes de divulgar o link

Preencha em `legal.html` os campos marcados em amarelo:

| Campo | Onde |
|---|---|
| Nome completo | seção 1 e rodapé |
| **CPF** | seção 1 e seção 11 |
| Endereço profissional | seção 1 |
| E-mail de contato | várias seções |
| Plataforma de pagamento | seção 11.3 |
| Plataforma de e-mail | seção 11.3 |
| Data da última atualização | topo do documento |

A página tem um aviso amarelo no topo enquanto houver placeholders, e `npm test`
imprime um lembrete na saída. Um teste também valida os dígitos verificadores do
CPF informado — se digitar errado, o teste falha.

### CP com CPF (sem CNPJ)

Você **pode** vender como pessoa física, sem CNPJ. As plataformas de checkout
(Hotmart, Kiwify, Mercado Pago) emitem a nota fiscal no seu CPF. A única
obrigação que sobra é declarar a receita no IRPF e, se passar do limite de
isenção, pagar o Carnê Web (DASN-Simples Nacional). Fale com um contador sobre a
sua estratégia — as regras mudam e a página legal não substitui parecer
profissional.

---

## 💰 Vendendo o curso

A landing page está pronta em `landing.html`. **Antes de publicar, defina:**

1. **O link de checkout** — no fim do arquivo, procure:
   ```js
   const CHECKOUT_URL = "#";   // ← cole aqui
   ```
   Aceita Hotmart, Kiwify, Mercado Pago, Stripe. Enquanto ficar `"#"`, os botões
   mostram um aviso em vez de quebrar.

2. **O preço** — procure `.lp-price-old` e `.lp-price-now` no bloco `#preco`.

3. **Seu e-mail de suporte** — `const SUPORTE_EMAIL` no fim do arquivo.

4. **Os depoimentos** — a seção `#depoimentos` tem 3 cards marcados como
   `Depoimento pendente`, com borda tracejada. **Substitua por relatos reais ou
   apague a seção inteira.** Não publique depoimento inventado: além do risco
   jurídico (CDC, art. 37), é a primeira coisa que um comprador desconfiado
   verifica.

A landing já inclui o que o comprador brasileiro exige: preço visível, formas de
pagamento (PIX/cartão/boleto), garantia incondicional de 7 dias com referência ao
art. 49 do CDC, e o preço parcelado.

---

## ✏️ Como adicionar conteúdo

### Capítulo novo

Adicione um objeto em `js/content/curriculum-advanced.js` (ou `curriculum.js`):

```js
CURRICULUM.push({
  id: "meu-capitulo",           // único, kebab-case
  part: "Parte 7 — Minha Área", // agrupa no sumário
  icon: "🚀", title: "Título", desc: "Resumo curto",
  level: "medium",              // easy | medium | hard
  minutes: 30, tags: ["tag1"],
  lead: "Frase de abertura",
  sections: [{ h: "Seção", html: "<p>conteúdo…</p>" }],
  playground: { tabs: ["index.html"], starter: "<!-- código -->" }, // ou null
  quiz: [{ q: "Pergunta?", opts: ["a","b"], answer: 1, feedback: "Por quê." }],
  flashcards: [{ q: "Pergunta?", a: "Resposta." }]
});
```

### Desafio novo

Em `js/content/challenges.js`:

```js
{
  id: "ch-meu-desafio",
  icon: "🎯", title: "Título",
  level: "medium", minutes: 15, track: ["frontend"],
  prompt: "Implemente <code>minhaFuncao()</code> …",
  hint: "Use <code>reduce</code> …",
  starter: "// código inicial do aluno",
  validate: "if (typeof minhaFuncao !== 'function') throw new Error('…'); …",
  xp: 60
}
```

> ⚠️ **Regra importante:** o `validate` **não pode definir** a função que o aluno
> precisa criar — se definir, ele passa sem escrever nada. Há um teste que
> detecta isso automaticamente.

### Projeto / Trilha / Conquista

- `js/content/projects.js` — adiciona ao array `PROJECTS`
- `js/content/tracks.js` — adiciona ao array `TRACKS`
- `js/content/badges.js` — adiciona ao array `BADGES`

Depois de mexer em qualquer conteúdo, rode `npm test`: ele valida IDs únicos,
campos obrigatórios, referências quebradas e caracteres estranhos.

---

## 🧪 Testes

```bash
npm test
```

**121 testes, zero dependências.** Cobrem:

- Integridade dos dados (IDs únicos, campos obrigatórios, `answer` no range, referências válidas)
- Suítes de validação dos desafios rodando soluções **certas e erradas**
- XP, níveis, Leitner, projetos, certificado, reset, persistência e migração de estado
- Segurança do sandbox (nunca `allow-same-origin`)
- Acessibilidade, ordem dos scripts e presença no cache do service worker
- Estrutura da landing page (incluindo um teste que **impede publicar depoimentos fictícios**)

### Adicionando um teste

Abra `test/run.js` e use os helpers existentes:

```js
it("minha regra de negócio", () => {
  const antes = Progress.state.xp;
  Progress.completeChapter("testes");
  assert.strictEqual(Progress.state.xp, antes + 50);
});
```

Os testes rodam o código real do app num `vm` isolado, com `localStorage` falso.

---

## 🎨 Tema e cores

Paleta **Grafite** (neutra), com tema claro como padrão. Todas as cores passam por
custom properties — trocar a identidade visual inteira é editar dois blocos:

```css
[data-theme="light"] { --primary: #3d4557; --bg: #f6f7f9; }
[data-theme="dark"]  { --primary: #c3c9d6; --bg: #14161c; }
```

Se mudar a paleta, atualize também `meta[name="theme-color"]` no `index.html` e
`landing.html`, e `background_color`/`theme_color` no `manifest.json`.

---

## 📱 Offline

O service worker usa **rede primeiro** para os arquivos do app (não há build nem
hash nos nomes, então servir cache antigo depois de uma atualização confunde o
aluno) e guarda tudo em cache para uso offline. Externos (Google Fonts, unpkg
dos demos) usam cache primeiro.

Ao publicar uma versão nova, suba o nome do cache em `sw.js`:

```js
const CACHE = "devbook-v4";   // ← incremente a cada publicação
```

---

🔗 Repositório completo: [guia-docente-historia-e-tecnologia](https://github.com/marcelooliveira8052668-cyber/guia-docente-historia-e-tecnologia)