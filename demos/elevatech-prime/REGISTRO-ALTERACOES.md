# Registro de alterações — ELEVATECH PRIME

## 17/11/2026 — Versão inicial (concluída)
- Criado `index.html` com identidade industrial (azul-escuro, cinza, laranja),
  tipografia condensada e ilustração SVG de elevador.
- Implementados painel com abas, indicadores, filtros, checklist, calendário,
  alertas de prazo, cadastro, OS para impressão e formulário de assistência.
- Criados README, CREDITOS, RELATORIO-TESTES e `tests/`.

## Correções durante o desenvolvimento
| Item | Antes | Depois | Motivo |
|------|-------|--------|--------|
| Texto do checklist | "Observar ruños incomuns" | "Observar ruídos incomuns" | Erro de digitação |
| Comentário no HTML | continha literal `<script>` | "no início do JavaScript" | O verificador de sintaxe capturava o comentário |
| Layout 360/390px | scrollWidth 528 (estouro da tabela) | scrollWidth = largura da viewport | Adicionado `min-width:0` ao grid e `.rolagem-tabela{max-width:100%}` com `.tabela{min-width:520px}` |
| Harness de teste | travava no `alert()` do cadastro | handler `Page.javascriptDialogOpening` com `sessionId` | Diálogo bloqueava o JS |

Linhas aproximadas: `index.html` ~455 (checklist), ~120 e ~230 (CSS),
`tests/cdp-smoke.js` ~22.

### Próximo passo
Demo 05 — TRADUZ PRIME (`traduz-prime/`).
