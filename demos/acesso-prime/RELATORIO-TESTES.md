# Relatório de testes — ACESSO PRIME

**Data:** 17/11/2026 · **Ambiente:** Windows 11, Node v26.4.0, Chromium headless
via CDP · **Comando:** `node acesso-prime\tests\cdp-smoke.js`

## Resultado geral
| Métrica | Valor |
|---------|-------|
| Verificações | 17 |
| Aprovadas | 17 |
| Falhas | 0 |
| Erros de console/JS | 0 |
| Sintaxe JavaScript | Válida |

## Layout
| Largura | Rolagem horizontal | Conteúdo |
|---------|--------------------|----------|
| 360 px | ✅ Nenhuma | ✅ 6 adaptações, 3 projetos, 7 checks, skip link, 1 h1, 4 landmarks |
| 390 px | ✅ Nenhuma | ✅ idem |
| 768 px | ✅ Nenhuma | ✅ idem |
| 1366 px | ✅ Nenhuma | ✅ idem |

## Acessibilidade verificada por CDP
| Verificação | Resultado |
|-------------|-----------|
| 15 `aria-label`, 5 `aria-live`, 4 SVGs rotulados | ✅ |
| `role="progressbar"` no checklist | ✅ |
| `aria-valuetext` no comparador (80%) | ✅ |
| Foco programático atinge o botão | ✅ |
| Botão alto contraste alterna classe e `aria-pressed` | ✅ |
| Botão A+ altera `--escala-fonte` para 1.15 | ✅ |
| Formulário marca 4 `aria-invalid` e foca primeiro inválido | ✅ |
| Aviso "não declara conformidade" presente | ✅ |

## Funcionalidades
Comparador, checklist (1 de 7 = 14%), formulário com confirmação e botão MOSS —
todos aprovados.

## Inspeção visual
Screenshots 390 px e 1366 px em `tests/` conferidos: alto contraste padrão,
hero, adaptações, comparador, checklist, galeria, formulário e rodapé.

## Limitações
- **Não foi executada auditoria com leitor de tela real** (NVDA/VoiceOver),
  nem ferramenta automatizada de acessibilidade (axe). A verificação foi por
  código, atributos ARIA, foco e inspeção visual.
- Sem Safari/Firefox reais.

## Fotografias (complemento)
| Verificação | Resultado |
|---|---|
| 6 fotos presentes, com `alt` e caminho local | ✅ |
| Carregamento real (`naturalWidth > 0`) após rolagem | ✅ 6/6 |
| Conferência visual por contato (18 fotos) | ✅ |

