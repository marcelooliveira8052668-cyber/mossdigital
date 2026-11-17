# Relatório de testes — MOVE PRIME

**Data:** 17/11/2026 · **Ambiente:** Windows 11, Node v26.4.0, Chromium headless
via CDP · **Comando:** `node move-prime\tests\cdp-smoke.js`

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
| 360 px | ✅ Nenhuma | ✅ 8 itens, 4 adicionais, 7 checks, 4 vantagens |
| 390 px | ✅ Nenhuma | ✅ idem |
| 768 px | ✅ Nenhuma | ✅ idem |
| 1366 px | ✅ Nenhuma | ✅ idem |

## Funcionalidades
| Teste | Resultado |
|-------|-----------|
| Calculadora (2 sofás + 1 caixa + embalagem) | ✅ R$ 441, 3,72 m³, 3 itens |
| Validação origem/destino | ✅ 2 erros |
| Checklist 2 de 7 | ✅ barra 29% |
| Busca MV-1030 | ✅ São Paulo → Santos, 5 etapas |
| WhatsApp da calculadora | ✅ `https://wa.me/?text=...` sem número fixo |
| Botão MOSS no rodapé | ✅ correto |

## Inspeção visual
Screenshots 390 px e 1366 px em `tests/` conferidos: hero, vantagens,
calculadora, checklist, acompanhamento e rodapé.

## Limitações
- Sem leitor de tela real; sem Safari/Firefox reais.
- O clique no WhatsApp foi interceptado substituindo `window.open` (o link real
  do WhatsApp não foi aberto durante o teste).
