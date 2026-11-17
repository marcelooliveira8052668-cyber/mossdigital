# AQUACARE PRIME — Demonstração 11

Site demonstrativo elegante de manutenção de piscinas: serviços, planos,
calculadora de volume, orçamento, agenda, clientes fictícios, checklist,
indicadores ilustrativos e galeria.

**Status:** ✅ Concluída em 17/11/2026.

## Abrir
Abra `index.html`. Arquivo único, sem dependências.

## Onde editar
| O que mudar | Onde |
|-------------|------|
| Serviços | Array `SERVICOS` (JS) |
| Planos | Array `PLANOS` (JS) |
| Indicadores ilustrativos | Array `INDICADORES` (JS) |
| Clientes e visitas | `CLIENTES_FICTICIOS` / `VISITAS` (JS) |
| Galeria | Array `GALERIA` (JS) |

## Funcionalidades reais
- Calculadora de volume (retangular, oval, circular) em litros, com dimensões
  configuráveis e estimativa ilustrativa de manutenção.
- Orçamento com validação, confirmação e compartilhamento via `wa.me/?text=`
  sem número fixo.
- Planos selecionáveis (simulação).
- Agenda navegável; clique em data marcada filtra clientes.
- Checklist de visita interativo.
- Indicadores visuais em anéis SVG, marcados como ILUSTRATIVOS.
- Galeria com 3 SVGs originais.

## Segurança
- Indicadores **não são medições, análises laboratoriais nem recomendações de
  dosagem química** — avisos explícitos em duas seções.
- Clientes, visitas e valores são fictícios.
- Para versão comercial: integrar laudos de profissional responsável, agendamento
  real e base de clientes autenticada; credenciais nunca no JavaScript público.

## Acessibilidade
Skip link, foco visível, `aria-live`, calendário navegável por teclado,
indicadores SVG com `aria-label`, contraste corrigido nos cards,
`prefers-reduced-motion`.
