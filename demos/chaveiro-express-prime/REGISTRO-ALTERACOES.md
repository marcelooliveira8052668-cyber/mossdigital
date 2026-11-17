# Registro de alterações — CHAVEIRO EXPRESS PRIME

## 17/11/2026 — Versão inicial (concluída)
- Criado `index.html` com identidade urbana preto/amarelo, 6 serviços, mapa SVG
  com 4 zonas, orçamento, quadro de chamados com 3 status, histórico e FAQ.
- Criados README, CREDITOS, RELATORIO-TESTES e `tests/`.

## Correções durante o desenvolvimento
| Item | Antes | Depois | Motivo |
|------|-------|--------|--------|
| ID do contador | `cnt`+nome normalizado ("Emrota") | mapa `{Aberto:'cntAberto','Em rota':'cntRota',...}` | ID não existia e gerava erro |
| Ordem de inicialização | `const fmt=...` declarado depois de `selecionarZona('centro')` | `function fmt(v){...}` (hasteada) | Zona morta temporal abortava todo o script |
| Expectativa do teste | rota esperada 3 | rota esperada 2 | Valor correto após mover 1 chamado |

Linhas aproximadas: `index.html` ~463 (mapa de contadores), ~424 (`fmt`),
`tests/cdp-smoke.js` ~62.

### Próximo passo
Demo 11 — AQUACARE PRIME (`aquacare-prime/`).
