# HARMONIA TECH PRIME — Demonstração 12

Oficina demonstrativa de instrumentos musicais: galeria, serviços, ordem de
serviço com equipamento fictício, orçamento ilustrativo, acompanhamento por
etapas, calendário e portfólio.

**Status:** ✅ Concluída em 17/11/2026.

## Abrir
Abra `index.html`. Arquivo único, sem dependências.

## Onde editar
| O que mudar | Onde |
|-------------|------|
| Instrumentos, ícones e preços | Objeto `CONFIG` (JS) |
| Ordens iniciais | `ORDENS_FICTICIAS` (JS) |
| Etapas do reparo | Array `ETAPAS` (JS) |
| Portfólio | Array `PORTFOLIO` (JS) |
| WhatsApp MOSS | `WHATSAPP_MOSS` (JS) |

## Funcionalidades reais
- Orçamento reage a instrumento × serviço (ex.: violino + restauração = R$ 396).
- Ordem de serviço com validação; registra instrumento/marca fictícios e cria
  ordem no painel (LocalStorage).
- Tabela de ordens clicável mostra etapas do reparo no painel lateral.
- Calendário navegável; clique em data marcada filtra ordens.
- Galeria com 5 SVGs originais e portfólio com 3 trabalhos.

## Simulação e segurança
- Instrumentos, marcas, ordens, valores e prazos são fictícios.
- Nenhuma marca comercial real é representada.
- Para versão comercial: backend com autenticação, laudos de técnico
  responsável, agendamento real e controle de peças/estoque.

## Acessibilidade
Skip link, foco visível, `aria-live` em resultados, calendário e linhas de
tabela navegáveis por teclado, contraste vinho/dourado verificado visualmente,
`prefers-reduced-motion`.
