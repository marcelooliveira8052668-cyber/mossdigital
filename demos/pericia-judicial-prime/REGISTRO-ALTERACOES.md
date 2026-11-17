# Registro de alterações — PERÍCIA JUDICIAL PRIME

## 17/11/2026 — Versão inicial (concluída)

- Criado `index.html` com identidade grafite/branco/dourado, tipografia serif
  editorial (diferente da Demo 01) e SVGs originais embutidos.
- Implementados: indicadores, busca, filtros de prioridade e situação, lista de
  processos, detalhe com checklist e timeline, cadastro com validação,
  calendário de prazos, resumo para impressão e link comercial MOSS.
- `LocalStorage` usado apenas para dados fictícios, com botão de restauração.
- Criados README, CREDITOS, RELATORIO-TESTES e scripts em `tests/`.

### Correção durante o desenvolvimento
| Item | Antes | Depois |
|------|-------|--------|
| Rótulo do formulário | "Núdo do processo (fictício) *" | "Número do processo (fictício) *" |

Linha aproximada: `index.html` ~430 (formulário de cadastro).

### Próximo passo
Demo 03 — RESTAURA PRIME (`restaura-prime/`).
