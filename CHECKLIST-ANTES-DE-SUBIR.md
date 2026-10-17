# Checklist — antes de subir para o GitHub

**Alvo: depois de pegar o diploma (curso termina 30/10).**

---

## Bloqueadores (precisa resolver)

- [ ] **Preencher os 3 depoimentos** com clientes REAIS
      → `index.html`, procurar `<!-- DEPOIMENTOS -->`
      → trocar tudo que está entre `[ ]`
      → **tirar a classe `case--vazio`** do `<article>`
      → a borda tracejada vira sólida e o card fica normal

- [ ] **Decidir qual site fica** — `index.html` e `portfolio.html` são
      praticamente o mesmo site hoje. O `index.html` era o exemplo da
      clínica de estética e foi sobrescrito pela landing page.
      Recomendação: ficar só com **um** deles.

- [ ] **Resolver o `index-old.html`** — está órfão, não é usado por ninguém.

- [ ] **Título da seção "Quem já confia"**
      Hoje diz *"19 sites no ar. Olha o que os clientes disseram"*.
      Se ainda não houver depoimento, ou comenta o `<div class="cases">`,
      ou muda o texto.

---

## Detalhes que valem conferir

- [ ] **Número do WhatsApp** — `(11) 94203-8103` aparece em vários lugares
      e no `assets/js/portfolio.js` (`whats: '5511942038103'`).
      Está certo?

- [ ] **Nome e cargo** — "Prof. Marcelo Oliveira". Confere com o que você
      quer usar profissionalmente.

- [ ] **Ano do rodapé** é automático (`© 2026`), não precisa mexer.

- [ ] **Rodapé** ainda diz "São Paulo — SP" e "Respondo em até 2 horas".

---

## Já resolvido nesta sessão

- [x] Texto corrompido no hero (frases coladas por um busca-e-substitui)
- [x] "19 tipos de negócio" → "19 projetos entregues"
- [x] Prazo "7 dias" → "7 a 15 dias" (em 8 lugares + FAQ nova)
- [x] Card de preço agora diz o que **não** entra nos R$ 400
- [x] FAQ "isso dá pra loja online?" e "por que tão barato?"
- [x] Seção de prova social criada (3 cards, com placeholders)
- [x] `.gitignore` da raiz liberando esta pasta

---

## Antes do commit

```bash
git add .gitignore
git add template-site-profissional/
git status                    # conferir o que vai entrar
git commit -m "feat: landing page de criação de sites"
```

O `.gitignore` da raiz ignora tudo por padrão e só liberava o DevBook.
A linha `!/template-site-profissional/` foi adicionada — sem ela o site
**não ia junto** no commit.