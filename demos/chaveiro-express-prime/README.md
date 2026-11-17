# CHAVEIRO EXPRESS PRIME — Demonstração 10

Central de atendimento demonstrativa: catálogo de serviços, mapa de regiões
ilustrativo, estimativa, quadro de chamados com status, histórico e WhatsApp.

**Status:** ✅ Concluída em 17/11/2026.

## Abrir
Abra `index.html`. Arquivo único, sem dependências.

## Onde editar
| O que mudar | Onde |
|-------------|------|
| Serviços e preços | Array `SERVICOS` (JS) |
| Regiões do mapa | Array `REGIOES` (JS) |
| Chamados iniciais | `CHAMADOS_FICTICIOS` (JS) |
| WhatsApp MOSS (rodapé) | `WHATSAPP_MOSS` (JS) |

## Funcionalidades reais
- Mapa SVG com 4 zonas clicáveis (mouse e teclado); a escolha altera a estimativa.
- Orçamento ilustrativo por serviço × região × urgência.
- Formulário com validação; cria chamado no quadro (LocalStorage).
- Quadro com 3 colunas (Aberto, Em rota, Concluído); selects movem chamados.
- Histórico fictício atualizado.
- WhatsApp via `wa.me/?text=` sem número fixo (o visitante escolhe o contato).

## Segurança
- **Não solicita chaves, códigos, senhas nem dados sensíveis** — aviso visível.
- Valores e regiões são fictícios; o mapa não representa cobertura real.
- Para versão comercial: backend com autenticação, geolocalização protegida e
  integração com WhatsApp Business oficial (credenciais no servidor, nunca no JS).

## Acessibilidade
Skip link, foco visível, zonas do mapa navegáveis por `Enter`/`Espaço`,
`aria-pressed`, `aria-live`, selects rotulados, `prefers-reduced-motion`.
