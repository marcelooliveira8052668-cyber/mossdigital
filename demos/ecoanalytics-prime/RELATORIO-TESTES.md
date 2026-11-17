# Relatório de testes — ECOANALYTICS PRIME

**Data:** 17/11/2026 · **Ambiente:** Windows 11, Node v26.4.0, Chromium headless
via CDP · **Comando:** `node ecoanalytics-prime\tests\cdp-smoke.js`

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
| 360 px | ✅ Nenhuma | ✅ 6 análises, 5 amostras, 4 indicadores, 4 resultados |
| 390 px | ✅ Nenhuma | ✅ idem |
| 768 px | ✅ Nenhuma | ✅ idem |
| 1366 px | ✅ Nenhuma | ✅ idem |

## Funcionalidades
| Teste | Resultado |
|-------|-----------|
| Busca AM-2403 | ✅ 1 amostra |
| Botão limpar | ✅ 5 amostras |
| Detalhe AM-2404 | ✅ resultados marcados FICTÍCIOS (4 linhas) |
| Solicitação de coleta | ✅ 5 → 6 amostras |
| Validação | ✅ 3 erros |
| Relatório impresso | ✅ conteúdo com aviso "SEM VALIDADE DE LAUDO" |
| Botão MOSS | ✅ correto |

## Inspeção visual
Screenshots 390 px e 1366 px em `tests/` conferidos: hero, catálogo,
solicitação, painel, métodos, contato e rodapé.

## Limitações
- Sem leitor de tela real; sem Safari/Firefox reais.
- A janela de impressão do sistema não foi acionada; o conteúdo gerado em
  `#areaImpressao` foi verificado por código.
