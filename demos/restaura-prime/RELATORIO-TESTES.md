# Relatório de testes — RESTAURA PRIME

**Data:** 17/11/2026 · **Ambiente:** Windows 11, Node v26.4.0, Chromium headless
via CDP · **Comando:** `node restaura-prime\tests\cdp-smoke.js`

## Resultado geral
| Métrica | Valor |
|---------|-------|
| Verificações | 14 |
| Aprovadas | 14 |
| Falhas | 0 |
| Erros de console/JS | 0 |
| Sintaxe JavaScript | Válida (277 linhas) |

## Layout
| Largura | Rolagem horizontal | Conteúdo |
|---------|--------------------|----------|
| 360 px | ✅ Nenhuma | ✅ 6 serviços, 3 projetos, 3 abas, comparador com SVGs |
| 390 px | ✅ Nenhuma | ✅ idem |
| 768 px | ✅ Nenhuma | ✅ idem |
| 1366 px | ✅ Nenhuma | ✅ idem |

## Funcionalidades
| Teste | Resultado |
|-------|-----------|
| Comparador troca de peça e slider a 75% | ✅ `--pos: 75%`, aba ativa |
| Busca de ordem RS-1024 | ✅ Cadeira Estilo, 6 etapas, 50% |
| Código inválido | ✅ mensagem de erro |
| Validação do formulário | ✅ 4 erros |
| Confirmação do envio simulado | ✅ painel visível |
| Link WhatsApp MOSS | ✅ correto |

## Inspeção visual
Screenshots 390 px e 1366 px em `tests/` conferidos: hero, comparador
(lado restaurado à esquerda e desgastado à direita), serviços, portfólio,
etapas, acompanhamento, formulário, depoimentos e rodapé.

## Limitações
- Prévia de fotos testada por código (o harness não simula seleção de arquivo);
  a implementação usa API padrão do navegador sem envio.
- Sem teste em leitor de tela real; sem Safari/Firefox reais.

## Fotografias (complemento)
| Verificação | Resultado |
|---|---|
| 6 fotos presentes, com `alt` e caminho local | ✅ |
| Carregamento real (`naturalWidth > 0`) após rolagem | ✅ 6/6 |
| Conferência visual por contato (18 fotos) | ✅ |

