# Relatório de testes — BIOCONTROL PRIME

**Data:** 17/11/2026 · **Ambiente:** Windows 11, Node v26.4.0, Chromium headless
via CDP · **Comando:** `node biocontrol-prime\tests\cdp-smoke.js`

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
| 360 px | ✅ Nenhuma | ✅ 6 serviços, 3 planos, 4 visitas, 5 checks |
| 390 px | ✅ Nenhuma | ✅ idem |
| 768 px | ✅ Nenhuma | ✅ idem |
| 1366 px | ✅ Nenhuma | ✅ idem |

## Funcionalidades
| Teste | Resultado |
|-------|-----------|
| Orçamento (indústria, 1.000 m²) | ✅ R$ 1.445, confirmação visível |
| Validação do orçamento | ✅ 3 erros |
| Calendário navega entre meses | ✅ |
| Clique em data com visita | ✅ 1 visita filtrada |
| Checklist interativo | ✅ |
| Sem upload e aviso de segurança | ✅ 0 inputs de arquivo, aviso presente |
| Link WhatsApp MOSS | ✅ correto |

## Inspeção visual
Screenshots 390 px e 1366 px em `tests/` conferidos: hero, serviços,
orçamento, planos, agenda/visitas, prevenção e rodapé.

## Limitações
- Sem leitor de tela real; sem Safari/Firefox reais.
- Planos e visitas são ilustrativos, sem integração com agenda real.
