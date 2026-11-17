# Registro de alterações — INSPECT PRIME

## 17/11/2026 — Versão inicial (concluída)
- Criado `index.html` com identidade arquitetônica azul-profundo/branco/cobre,
  6 serviços, painel de imóveis, checklists por categoria, registro de
  ocorrências com prioridade, galeria, agenda, histórico e relatório visual.
- Criados README, CREDITOS, RELATORIO-TESTES e `tests/`.

## Correções durante o desenvolvimento
| Item | Antes | Depois |
|------|-------|--------|
| Overflow 360/390px | estilos inline `grid-template-columns:repeat(3,1fr)` e `1fr 1fr` ignoravam media queries; tabela do histórico estourava o grid | inline styles removidos, `.grade-2` criada no CSS, `.cal-hist>*{min-width:0}` adicionado |

Linhas aproximadas: `index.html` ~130 (CSS) e ~360/420 (formulários).

### Fim do ciclo de 15 demos
Próximas etapas: avaliação comercial (seção 10) e preparação de publicação
(seção 11, somente com autorização final).

## 17/11/2026 — Complemento: fotografias licenciadas
- Adicionadas **6 fotografias reais** (WebP 1200×800) em `img/fotos/`.
- Fontes via Openverse, licenças CC0/CC BY/CC BY-SA registradas em `CREDITOS.md`.
- Galeria `Fotografias ilustrativas` inserida antes do rodapé, com aviso de que não representam a empresa fictícia.
- Testes reforçados: carregamento real das 6 imagens verificado por CDP.

