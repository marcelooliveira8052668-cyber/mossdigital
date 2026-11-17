# Relatório de testes — CHAVEIRO EXPRESS PRIME

**Data:** 17/11/2026 · **Ambiente:** Windows 11, Node v26.4.0, Chromium headless
via CDP · **Comando:** `node chaveiro-express-prime\tests\cdp-smoke.js`

## Resultado geral
| Métrica | Valor |
|---------|-------|
| Verificações | 15 |
| Aprovadas | 15 |
| Falhas | 0 |
| Erros de console/JS | 0 (após correção da zona morta temporal) |
| Sintaxe JavaScript | Válida |

## Layout
| Largura | Rolagem horizontal | Conteúdo |
|---------|--------------------|----------|
| 360 px | ✅ Nenhuma | ✅ 6 serviços, 4 zonas, 4 chamados, 4 históricos |
| 390 px | ✅ Nenhuma | ✅ idem |
| 768 px | ✅ Nenhuma | ✅ idem |
| 1366 px | ✅ Nenhuma | ✅ idem |

## Funcionalidades
| Teste | Resultado |
|-------|-----------|
| Mapa: Centro → Leste | ✅ R$ 120,00 → R$ 144,00 |
| Validação do formulário | ✅ 2 erros |
| Novo chamado | ✅ 4 → 5, confirmação visível, Aberto = 3 |
| Mover status | ✅ Em rota 1 → 2, Aberto 3 → 2 |
| Aviso de segurança / sem campos sensíveis | ✅ |
| WhatsApp sem número fixo | ✅ `https://wa.me/?text=...` |
| Botão MOSS | ✅ correto |

## Inspeção visual
Screenshots 390 px e 1366 px em `tests/` conferidos: hero, serviços, pedido
com mapa, quadro de chamados, histórico, FAQ e rodapé.

## Limitações
- Sem leitor de tela real; sem Safari/Firefox reais.
- O clique no WhatsApp foi interceptado substituindo `window.open`.
