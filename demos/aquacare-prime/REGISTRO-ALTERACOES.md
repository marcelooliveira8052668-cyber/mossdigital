# Registro de alterações — AQUACARE PRIME

## 17/11/2026 — Versão inicial (concluída)
- Criado `index.html` com identidade turquesa/areia, 6 serviços, 3 planos,
  calculadora de volume com 3 formatos, agenda, clientes, checklist,
  indicadores ilustrativos e galeria.
- Criados README, CREDITOS, RELATORIO-TESTES e `tests/`.

## Correções antes/durante os testes
| Item | Antes | Depois |
|------|-------|--------|
| Caractere estranho | "palmeiras e赌 sol" | "palmeiras e sol" |
| Layout 360/390px | scrollWidth 472/473 (tabela) | `.painel>*{min-width:0}` + `.tabela{min-width:420px}` |
| Contraste dos indicadores | títulos brancos sobre cards brancos | `.indicador h3{color:var(--tq-900)}` |
| Asserção do teste | procurava frases literais inexistentes | verifica presença de "medições" e "dosagem química" |

### Próximo passo
Demo 12 — HARMONIA TECH PRIME (`harmonia-tech-prime/`).
