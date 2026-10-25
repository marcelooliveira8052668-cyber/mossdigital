# Checklist — antes de subir para o GitHub

**Alvo: depois de pegar o diploma (curso termina 30/10).**

Repositório: `marcelooliveira8052668-cyber/template-site-professional`
Site no ar: <https://marcelooliveira8052668-cyber.github.io/template-site-professional/>

---

## Bloqueadores (precisa resolver)

- [ ] **Preencher os 3 depoimentos** com clientes REAIS
      → `index.html`, procurar `<!-- PROVA SOCIAL -->`
      → descomentar o bloco e trocar tudo que está entre `[ ]`
      → **tirar a classe `case--vazio`** do `<article>`
      → a borda tracejada vira sólida e o card fica normal
- [ ] **Número do WhatsApp** — `(11) 94203-8103` aparece em vários lugares
      e no `assets/js/portfolio.js` (`whats: '5511942038103'`).
      Está certo?
- [ ] **Nome e cargo** — "Prof. Marcelo Oliveira". Confere com o que você
      quer usar profissionalmente.
- [ ] **Rodapé** ainda diz "São Paulo — SP".

---

## Detalhes que valem conferir

- [ ] **Contagem de projetos** — os números no site (hoje `15 projetos no ar`
      e `23 modelos prontos`) agora são **calculados pelo script**, então sozinhos
      ficam certos. Ao adicionar projeto, é só entrar na lista `REAIS` ou
      `MODELOS` de `assets/js/portfolio.js`.
- [ ] **Ano do rodapé** é automático (`© 2026`), não precisa mexer.

---

## Já resolvido

- [x] **Posicionamento do herói** — saiu o "a partir de R$ 400" da primeira dobra.
      O herói agora fala de resultado (site que traz cliente) e o preço foi para
      a seção `#preco`, com o mesmo card e o texto do que entra / não entra.
- [x] **Projetos reais separados dos modelos** — duas seções: `#reais` (13, no ar)
      e `#exemplos` (23 modelos prontos). O cliente vê a diferença na hora.
- [x] **PAC-MAN//NEON no portfólio** — pasta `pacman/`, card em `REAIS` e capa
      `assets/img/fotos/heroi-pacman.svg`.
- [x] **Contagens automáticas** — a legenda e os números vêm do tamanho das
      listas do `portfolio.js`, sem número fixo para esquecer.
- [x] **Decidir qual site fica** — `index.html` é a versão oficial (tem manifesto,
      card de "não entra nos R$ 400" e FAQ refinado). `portfolio.html` virou um
      redirecionamento para ele, então links antigos continuam funcionando.
- [x] **Resolver o `index-old.html`** — era órfão (ninguém linkava). A estrutura
      do site do cliente já vive no `demo.html`. Removido do repositório —
      continua no histórico do Git, caso precise voltar atrás.
- [x] **Título da seção "Quem já confia"** — a seção inteira foi comentada
      até existirem depoimentos reais. Sem texto quebrado no ar.
- [x] **EducaEnem no portfólio** — pasta `educaenem/` + card com foto local.
- [x] **Código & Conhecimento no portfólio** — pasta `codigo-conhecimento/`
      (+ o `portal-da-escola/`) + card com foto local.
- [x] **README reescrito** — estrutura real dos arquivos, 23 presets na tabela
      (faltavam 5) e a seção dos 3 projetos reais.
- [x] Texto corrompido no hero (frases coladas por um busca-e-substitui)
- [x] "19 tipos de negócio" → "19 projetos entregues"
- [x] Prazo "7 dias" → "7 a 15 dias" (em 8 lugares + FAQ nova)
- [x] Card de preço agora diz o que **não** entra nos R$ 400
- [x] FAQ "isso dá pra loja online?" e "por que tão barato?"
- [x] Seção de prova social criada (3 cards, com placeholders)

---

## Antes do commit

```bash
git status                     # conferir o que vai entrar
git add .
git commit -m "feat: sua mensagem"
git push origin main           # o GitHub Pages publica sozinho
```

> O repositório local fica em
> `Downloads/template-site-professional-main/template-site-professional-main`
> e já tem `.git` próprio com o remote correto. Não precisa mexer no
> repositório da pasta do usuário (que é de outro projeto).
