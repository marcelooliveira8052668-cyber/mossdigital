# SAFEWORK PRIME — Demonstração 14

Portal corporativo demonstrativo de consultoria em segurança do trabalho:
treinamentos, indicadores, calendário, documentos com vencimentos, cadastro de
empresas fictícias, checklist e relatório administrativo para impressão.

**Status:** ✅ Concluída em 17/11/2026.

## Abrir
Abra `index.html`. Arquivo único, sem dependências.

## Onde editar
| O que mudar | Onde |
|-------------|------|
| Consultorias | Array `CONSULTORIAS` (JS) |
| Treinamentos | `TREINAMENTOS_FICTICIOS` (JS) |
| Documentos e prazos | `DOCUMENTOS_FICTICIOS` (JS) |
| Checklist | Array `CHECKLIST_ITENS` (JS) |
| WhatsApp MOSS | `WHATSAPP_MOSS` (JS) |

## Funcionalidades reais
- Indicadores recalculados (treinamentos, concluídos, empresas, alertas).
- Tabela de treinamentos com barras de progresso.
- Calendário navegável; clique em data marcada filtra treinamentos.
- Gestão visual de documentos com selos calculados por data: EM DIA, VENCENDO
  e VENCIDO (todos ilustrativos).
- Cadastro de empresa fictícia com validação e persistência local.
- Checklist genérico interativo.
- Relatório administrativo para impressão (`@media print`).
- Formulário de orçamento com validação e confirmação local.

## Segurança (regra crítica)
- **Não gera certificados, documentos regulamentares nem declarações de
  conformidade.** Nenhuma norma específica é citada — apenas referências
  genéricas ilustrativas.
- Todos os dados são fictícios. Nada é enviado a servidor.
- Para versão comercial: verificar normas vigentes com profissional habilitado,
  implementar backend autenticado e emissão de documentos apenas por
  responsável técnico. Credenciais nunca no JavaScript público.

## Acessibilidade
Skip link, foco visível, `aria-live` em indicadores, calendário navegável por
teclado, rótulos nos formulários, `prefers-reduced-motion`.
