# Relatório de testes — ELEVATECH PRIME

**Data:** 17/11/2026 · **Ambiente:** Windows 11, Node v26.4.0, Chromium headless
via CDP · **Comando:** `node elevatech-prime\tests\cdp-smoke.js`

## Resultado geral
| Métrica | Valor |
|---------|-------|
| Verificações | 17 |
| Aprovadas | 17 |
| Falhas | 0 |
| Erros de console/JS | 0 |
| Sintaxe JavaScript | Válida (262 linhas) |

## Layout (após correção do estouro da tabela)
| Largura | Rolagem horizontal | Conteúdo |
|---------|--------------------|----------|
| 360 px | ✅ Nenhuma (360 = 360) | ✅ 4 chamados, 5 equipamentos, 4 indicadores |
| 390 px | ✅ Nenhuma (390 = 390) | ✅ idem |
| 768 px | ✅ Nenhuma | ✅ idem |
| 1366 px | ✅ Nenhuma | ✅ idem |

A tabela possui rolagem horizontal **interna** em telas pequenas, sem
estourar o documento.

## Funcionalidades
| Teste | Resultado |
|-------|-----------|
| Filtro de chamados "Aberto" | ✅ 2 chamados |
| Alterar status do chamado | ✅ indicador "Abertos" caiu de 2 para 1 |
| Checklist interativo | ✅ item marcado |
| Alertas de vencimento | ✅ 2 alertas |
| Troca de abas | ✅ calendário visível, chamados ocultos |
| Navegação do calendário | ✅ mês alterado |
| Cadastro de equipamento | ✅ 5 → 6 registros (diálogo aceito) |
| Formulário de assistência | ✅ confirmação visível |
| Link WhatsApp MOSS | ✅ correto |

## Inspeção visual
Screenshots 390 px e 1366 px em `tests/` conferidos: hero, faixa de serviços,
painel, cadastro, assistência e rodapé.

## Limitações
- A impressão da OS usa `@media print`; a janela do sistema não foi acionada
  no teste automatizado.
- Sem leitor de tela real; sem Safari/Firefox reais.
