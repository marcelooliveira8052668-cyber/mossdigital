# Relatório de testes — INSPECT PRIME

**Data:** 17/11/2026 · **Ambiente:** Windows 11, Node v26.4.0, Chromium headless
via CDP · **Comando:** `node inspect-prime\tests\cdp-smoke.js`

## Resultado geral
| Métrica | Valor |
|---------|-------|
| Verificações | 17 |
| Aprovadas | 17 |
| Falhas | 0 |
| Erros de console/JS | 0 |
| Sintaxe JavaScript | Válida |

## Layout (após correção do overflow)
| Largura | Rolagem horizontal | Conteúdo |
|---------|--------------------|----------|
| 360 px | ✅ Nenhuma | ✅ 6 serviços, 3 imóveis, 9 checks, 2 ocorrências, 3 galerias, 3 históricos |
| 390 px | ✅ Nenhuma | ✅ idem |
| 768 px | ✅ Nenhuma | ✅ idem |
| 1366 px | ✅ Nenhuma | ✅ idem |

## Funcionalidades
| Teste | Resultado |
|-------|-----------|
| Seleção do imóvel im2 | ✅ Centro Comercial Prime, 1 ocorrência |
| Checklist | ✅ marcado |
| Nova observação com prioridade alta | ✅ 2 ocorrências, etiqueta alta, confirmação |
| Cadastro de imóvel | ✅ 3 → 4, histórico 3 → 4 |
| Relatório visual | ✅ aviso "SEM VALOR DE LAUDO TÉCNICO OFICIAL" |
| Calendário | ✅ troca de mês |
| Orçamento | ✅ 3 erros de validação |
| Aviso de não-laudo | ✅ presente |
| Botão MOSS | ✅ correto |

## Inspeção visual
Screenshots 390 px e 1366 px em `tests/` conferidos: hero, serviços, imóveis,
vistoria, agenda/histórico, galeria, orçamento e rodapé.

## Limitações
- Sem leitor de tela real; sem Safari/Firefox reais.
- Janela de impressão do sistema não foi acionada; conteúdo verificado por código.

## Fotografias (complemento)
| Verificação | Resultado |
|---|---|
| 6 fotos presentes, com `alt` e caminho local | ✅ |
| Carregamento real (`naturalWidth > 0`) após rolagem | ✅ 6/6 |
| Conferência visual por contato (18 fotos) | ✅ |

