# BIOCONTROL PRIME — Demonstração 06

Empresa demonstrativa de controle de pragas: serviços por tipo de praga,
orçamento ilustrativo, planos de manutenção, agenda de visitas, checklist e
orientações gerais de prevenção.

**Status:** ✅ Concluída em 17/11/2026.

## Abrir
Abra `index.html`. Arquivo único, sem dependências.

## Onde editar
| O que mudar | Onde |
|-------------|------|
| Serviços e ícones | Arrays `SERVICOS` / `ICONES` (JS) |
| Planos | Array `PLANOS` (JS) |
| Preços do orçamento | Objeto `CONFIG` (JS) |
| Visitas da agenda | Array `VISITAS` (JS) |
| Checklist | Array `CHECKLIST` (JS) |
| WhatsApp MOSS | `WHATSAPP_MOSS` (JS) |

## Funcionalidades reais
- Orçamento: nome, telefone, tipo de imóvel, foco, área (20–5.000 m²) e data;
  valida, calcula valor/faixa, mostra detalhamentos e confirma localmente.
- Planos de manutenção selecionáveis (simulação).
- Calendário navegável; clique em dia marcado filtra a lista de visitas.
- Checklist de visita interativo.
- Menu mobile e botão MOSS com mensagem identificando a demo.

## Segurança (regra importante)
- **Não há instruções de aplicação de produtos perigosos** e nenhum campo de
  upload. Os serviços são descritos como executados por profissionais
  habilitados.
- Orientações de prevenção são apenas higiene/manutenção geral.
- Todos os dados são fictícios. Nada é enviado a servidor.
- Para versão comercial: backend com agendamento e notificações, cadastro de
  visitas com autenticação, conformidade com normas e licenças aplicáveis —
  verificadas por profissional responsável.

## Acessibilidade
Skip link, foco visível, `aria-live` em resultados, calendário navegável por
teclado, contraste verde/amarelo verificado visualmente, `prefers-reduced-motion`.
