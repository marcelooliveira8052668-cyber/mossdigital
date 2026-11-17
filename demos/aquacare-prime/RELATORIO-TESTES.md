# Relatório de testes — AQUACARE PRIME

**Data:** 17/11/2026 · **Ambiente:** Windows 11, Node v26.4.0, Chromium headless
via CDP · **Comando:** `node aquacare-prime\tests\cdp-smoke.js`

## Resultado geral
| Métrica | Valor |
|---------|-------|
| Verificações | 15 |
| Aprovadas | 15 |
| Falhas | 0 |
| Erros de console/JS | 0 |
| Sintaxe JavaScript | Válida |

## Layout
| Largura | Rolagem horizontal | Conteúdo |
|---------|--------------------|----------|
| 360 px | ✅ Nenhuma (após correção) | ✅ 6 serviços, 3 planos, 3 indicadores, 3 galerias, 4 clientes |
| 390 px | ✅ Nenhuma | ✅ idem |
| 768 px | ✅ Nenhuma | ✅ idem |
| 1366 px | ✅ Nenhuma | ✅ idem |

## Funcionalidades
| Teste | Resultado |
|-------|-----------|
| Volume 8×4×1,4 | ✅ 44.800 litros |
| Alterar comprimento para 10 m | ✅ 56.000 litros, R$ 504 |
| Formato oval | ✅ volume recalculado |
| Orçamento | ✅ confirmação e 3 erros de validação |
| Avisos de segurança | ✅ "medições" e "dosagem química" presentes |
| Calendário | ✅ troca de mês |
| Botão MOSS | ✅ correto |

## Inspeção visual
Screenshots 390 px e 1366 px em `tests/` conferidos. Após a primeira inspeção,
o contraste dos títulos dos indicadores foi corrigido e a captura refeita.

## Limitações
- Sem leitor de tela real; sem Safari/Firefox reais.
- Indicadores são fictícios por design (registrado na página e na documentação).
