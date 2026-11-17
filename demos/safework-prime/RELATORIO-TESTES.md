# Relatório de testes — SAFEWORK PRIME

**Data:** 17/11/2026 · **Ambiente:** Windows 11, Node v26.4.0, Chromium headless
via CDP · **Comando:** `node safework-prime\tests\cdp-smoke.js`

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
| 360 px | ✅ Nenhuma | ✅ 6 consultorias, 4 treinamentos, 4 documentos, 4 indicadores, 5 checks |
| 390 px | ✅ Nenhuma | ✅ idem |
| 768 px | ✅ Nenhuma | ✅ idem |
| 1366 px | ✅ Nenhuma | ✅ idem |

## Funcionalidades
| Teste | Resultado |
|-------|-----------|
| Alertas de vencimento | ✅ 1 vencendo, 1 vencido, 2 em dia |
| Cadastro de empresa | ✅ indicador 0 → 1, confirmação |
| Calendário | ✅ troca de mês |
| Relatório de impressão | ✅ conteúdo com aviso "SEM VALIDADE REGULAMENTAR" |
| Validação do orçamento | ✅ 3 erros |
| Avisos de segurança | ✅ "não emite certificados" e "nenhuma norma específica" |
| Botão MOSS | ✅ correto |

## Inspeção visual
Screenshots 390 px e 1366 px em `tests/` conferidos: hero, consultorias,
painel/calendário, documentos, cadastros, orçamento e rodapé.

## Limitações
- Sem leitor de tela real; sem Safari/Firefox reais.
- A janela de impressão do sistema não foi acionada; o conteúdo gerado foi
  verificado por código.
