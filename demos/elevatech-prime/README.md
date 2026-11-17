# ELEVATECH PRIME — Demonstração 04

Portal demonstrativo de manutenção de elevadores: chamados, equipamentos,
calendário, checklist, alertas de prazo, cadastros e ordem de serviço para
impressão. **Dados fictícios. Não substitui inspeções técnicas obrigatórias.**

**Status:** ✅ Concluída em 17/11/2026.

## Como abrir
Abra `index.html`. Arquivo único, sem dependências.

## Onde editar
| O que mudar | Onde | Linha aprox. |
|-------------|------|--------------|
| Condomínios | `CONDOMINIOS_FICTICIOS` | ~430 |
| Equipamentos | `EQUIPAMENTOS_FICTICIOS` | ~438 |
| Chamados | `CHAMADOS_FICTICIOS` | ~448 |
| Checklist | `CHECKLIST_PADRAO` | ~460 |
| WhatsApp MOSS | `WHATSAPP_MOSS` | ~422 |

## Funcionalidades reais
- Painel com 3 abas: Chamados, Equipamentos, Calendário.
- Filtro de chamados por status e alteração de status (atualiza indicadores).
- Checklist ilustrativo interativo por chamado, salvo no LocalStorage.
- Alertas visuais de prazos próximos/vencidos (ilustrativos).
- Calendário navegável; clique em data marcada filtra equipamentos.
- Cadastro de condomínio/equipamento fictício + restauração dos dados iniciais.
- Geração de ordem de serviço ilustrativa para impressão (`@media print`).
- Formulário de assistência com validação e confirmação simulada.
- Botão MOSS com mensagem identificando a demo.

## Simulação e segurança
- Nenhum dado real deve ser inserido. Tudo fica no LocalStorage deste navegador.
- A OS gerada **não tem validade técnica ou regulamentar**.
- O sistema **não substitui** procedimentos técnicos, inspeções obrigatórias
  nem profissionais habilitados — aviso visível na página.
- Para versão comercial: backend com autenticação, trilha de auditoria,
  integração segura com sistemas oficiais e emissão de documentos por
  responsável técnico. Credenciais nunca no JavaScript público.

## Acessibilidade
Skip link, foco visível, abas com `role="tab"`/`aria-selected`, filtros com
`aria-pressed`, tabelas com cabeçalhos, calendário navegável por teclado,
rolagem horizontal contida nas tabelas, `prefers-reduced-motion`.
