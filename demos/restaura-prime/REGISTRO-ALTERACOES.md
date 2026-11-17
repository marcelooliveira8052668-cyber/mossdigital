# Registro de alterações — RESTAURA PRIME

## 17/11/2026 — Versão inicial (concluída)

- Criado `index.html` com identidade artesanal premium (madeira, bege e
  verde-oliva), tipografia serif e SVGs originais gerados por `desenharPeca()`.
- Implementados: comparador antes/depois com `<input type="range">` + `clip-path`,
  6 serviços, 3 projetos, etapas, acompanhamento de ordens, formulário com
  prévia local de fotos e botão comercial MOSS.
- Criados README, CREDITOS, RELATORIO-TESTES e `tests/`.

### Correções durante o desenvolvimento
| Item | Antes | Depois |
|------|-------|--------|
| Tag do título do hero | `<h1Devolva ... .</h1Devolva>` | `<h1>Devolva ... .</h1>` |
| Barra superior | "DEPPOIMENTOS" | "DEPOIMENTOS" |
| Harness de teste | `JSON.stringify(msg);` (parêntese ausente) | `JSON.stringify(msg));` |
| Asserção do comparador | esperava "Armário" na legenda | verifica aba ativa + posição do slider |

Linhas aproximadas: `index.html` ~205 (hero), ~35 (barra);
`tests/cdp-smoke.js` ~12 e ~85.

### Próximo passo
Demo 04 — ELEVATECH PRIME (`elevatech-prime/`).

## 17/11/2026 — Complemento: fotografias licenciadas
- Adicionadas **6 fotografias reais** (WebP 1200×800) em `img/fotos/`.
- Fontes via Openverse, licenças CC0/CC BY/CC BY-SA registradas em `CREDITOS.md`.
- Galeria `Fotografias ilustrativas` inserida antes do rodapé, com aviso de que não representam a empresa fictícia.
- Testes reforçados: carregamento real das 6 imagens verificado por CDP.

