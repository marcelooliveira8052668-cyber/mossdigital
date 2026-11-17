# Relatório de testes — TRADUZ PRIME

**Data:** 17/11/2026 · **Ambiente:** Windows 11, Node v26.4.0, Chromium headless
via CDP · **Comando:** `node traduz-prime\tests\cdp-smoke.js`

## Resultado geral
| Métrica | Valor |
|---------|-------|
| Verificações | 16 |
| Aprovadas | 16 |
| Falhas | 0 |
| Erros de console/JS | 0 |
| Sintaxe JavaScript | Válida |

## Layout
| Largura | Rolagem horizontal | Conteúdo |
|---------|--------------------|----------|
| 360 px | ✅ Nenhuma (após correção do `::before`) | ✅ 5 idiomas, 6 documentos, 5 etapas, 4 FAQs |
| 390 px | ✅ Nenhuma | ✅ idem |
| 768 px | ✅ Nenhuma | ✅ idem |
| 1366 px | ✅ Nenhuma | ✅ idem |

O diagnóstico por CDP mostrou que `querySelectorAll` não detectava o
pseudo-elemento estourando a página; a causa foi identificada pela diferença
entre `scrollWidth` e as larguras dos elementos.

## Funcionalidades
| Teste | Resultado |
|-------|-----------|
| Simulador (20 pág., técnico, expresso) | ✅ R$ 1.705, PT-BR → EN |
| Idiomas iguais rejeitados | ✅ aviso exibido |
| Pedido TR-2026-002 | ✅ EN → PT-BR, 5 etapas |
| Código inválido | ✅ erro exibido |
| Validação do formulário | ✅ 3 erros |
| Confirmação | ✅ resumo local |
| FAQ | ✅ abre |
| Link WhatsApp MOSS | ✅ correto |

## Inspeção visual
Screenshots 390 px e 1366 px em `tests/` conferidos: hero editorial, idiomas,
documentos, simulador, fluxo escuro, acompanhamento, formulário, FAQ e rodapé.

## Limitações
- Sem leitor de tela real; sem Safari/Firefox reais.
- O formulário deliberadamente não possui upload (regra de segurança da demo).
