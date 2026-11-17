# ECOANALYTICS PRIME — Demonstração 08

Laboratório demonstrativo de análises ambientais: catálogo de ensaios,
solicitação de coleta, painel de amostras, busca, resultados fictícios e
relatório ilustrativo para impressão.

**Status:** ✅ Concluída em 17/11/2026.

## Abrir
Abra `index.html`. Arquivo único, sem dependências.

## Onde editar
| O que mudar | Onde |
|-------------|------|
| Catálogo de análises | Array `ANALISES` (JS) |
| Amostras iniciais | `AMOSTRAS_FICTICIAS` (JS) |
| Resultados da tabela | `RESULTADOS_FICTICIOS` (JS) |
| Etapas do fluxo | Array `ETAPAS` (JS) |
| WhatsApp MOSS | `WHATSAPP_MOSS` (JS) |

## Funcionalidades reais
- Catálogo com 6 tipos de análise.
- Solicitação de coleta com validação; gera código `AM-####` e adiciona ao
  painel (LocalStorage, somente dados fictícios).
- Busca por código/local/tipo + botão limpar.
- Painel com 4 indicadores e tabela clicável.
- Detalhe lateral com etapas e tabela de resultados **fictícios**.
- Relatório demonstrativo para impressão (`@media print`).
- Formulário de contato com validação e confirmação local.

## Segurança (regra crítica)
- **Nenhum resultado é real.** Valores, unidades "u.i.", códigos, locais e
  relatórios são inventados e identificados como fictícios na própria página.
- **Não há certificados de acreditação, laudos oficiais, normas citadas nem
  resultados de laboratório verdadeiro.**
- Para versão comercial: LIMS real com cadeia de custódia, laudos assinados
  por responsável técnico, credenciais de acreditação verificadas e
  conformidade legal — nada disso é afirmado nesta demonstração.

## Acessibilidade
Skip link, foco visível, `aria-live` em indicadores/painel, tabelas com
cabeçalhos, busca com rótulo, teclado nas linhas, `prefers-reduced-motion`.
