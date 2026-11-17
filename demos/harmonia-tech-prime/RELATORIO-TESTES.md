# Relatório de testes — HARMONIA TECH PRIME

**Data:** 17/11/2026 · **Ambiente:** Windows 11, Node v26.4.0, Chromium headless
via CDP · **Comando:** `node harmonia-tech-prime\tests\cdp-smoke.js`

## Resultado geral
| Métrica | Valor |
|---------|-------|
| Verificações | 14 |
| Aprovadas | 14 |
| Falhas | 0 |
| Erros de console/JS | 0 |
| Sintaxe JavaScript | Válida |

## Layout
| Largura | Rolagem horizontal | Conteúdo |
|---------|--------------------|----------|
| 360 px | ✅ Nenhuma | ✅ 5 instrumentos, 5 serviços, 4 ordens, 3 trabalhos |
| 390 px | ✅ Nenhuma | ✅ idem |
| 768 px | ✅ Nenhuma | ✅ idem |
| 1366 px | ✅ Nenhuma | ✅ idem |

## Funcionalidades
| Teste | Resultado |
|-------|-----------|
| Orçamento violino + restauração | ✅ R$ 72 → R$ 396 |
| Validação da ordem | ✅ 3 erros |
| Nova ordem | ✅ 4 → 5, confirmação visível |
| Detalhe OS-5102 | ✅ Violino, 5 etapas |
| Calendário | ✅ troca de mês |
| Botão MOSS | ✅ correto |

## Inspeção visual
Screenshots 390 px e 1366 px em `tests/` conferidos: hero, instrumentos,
serviços, ordem, painel/calendário, portfólio e rodapé.

## Limitações
- Sem leitor de tela real; sem Safari/Firefox reais.
- Acessibilidade verificada por código e inspeção visual, não por auditoria automatizada.
