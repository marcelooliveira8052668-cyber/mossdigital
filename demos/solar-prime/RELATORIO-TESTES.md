# Relatório de testes — SOLAR PRIME

**Data:** 17/11/2026 · **Ambiente:** Windows 11, Node v26.4.0, Chromium headless
via CDP · **Comando:** `node solar-prime\tests\cdp-smoke.js`

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
| 360 px | ✅ Nenhuma | ✅ 4 hipóteses, 3 cenários, 3 instalações, 3 barras, 11 pontos no gráfico |
| 390 px | ✅ Nenhuma | ✅ idem |
| 768 px | ✅ Nenhuma | ✅ idem |
| 1366 px | ✅ Nenhuma | ✅ idem |

## Funcionalidades
| Teste | Resultado |
|-------|-----------|
| Simulação inicial (450 kWh) | ✅ 383 kWh/mês, 6 painéis, 3,3 kWp, R$ 352 |
| Cenário Máximo | ✅ cobertura 100%, 8 painéis |
| Validação de entradas | ✅ 3 erros |
| Ausência de NaN/undefined | ✅ confirmado |
| Diferenciação documentada (FAQ cita Sol do Bairro) | ✅ |
| Botão MOSS | ✅ correto |

## Inspeção visual
Screenshots 390 px e 1366 px em `tests/` conferidos: hero, hipóteses,
dimensionador, gráficos, galeria, FAQ e rodapé. O gráfico de linha e as barras
foram gerados corretamente via SVG/JavaScript.

## Limitações
- Sem leitor de tela real; sem Safari/Firefox reais.
- A projeção usa premissas fixas e não considera reajustes, inflação ou
  financiamento — aviso explícito na interface.
