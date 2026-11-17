# Registro de alterações — TRADUZ PRIME

## 17/11/2026 — Versão inicial (concluída)
- Criado `index.html` com identidade editorial (azul-marinho, creme, serif),
  5 idiomas, 6 tipos de documento, simulador, fluxo, acompanhamento, FAQ e
  formulário sem upload de arquivos.
- Criados README, CREDITOS, RELATORIO-TESTES e `tests/`.

## Correções durante o desenvolvimento
| Item | Antes | Depois |
|------|-------|--------|
| Acento no hero | "precisão" (caractere combinante) | "precisão" |
| FAQ | "Consultam dados reais?" | "consultam dados reais?" |
| Layout 360/390/768px | scrollWidth 518/563/866 (pseudo-elemento da linha do fluxo) | `transform:translateX(-50%)` no `.etapa::before` |

Linha aproximada do CSS corrigido: `index.html` ~160 (regra `.etapa::before`).

### Próximo passo
Demo 06 — BIOCONTROL PRIME (`biocontrol-prime/`).
