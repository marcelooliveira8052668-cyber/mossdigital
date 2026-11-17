# MOVE PRIME — Demonstração 07

Empresa demonstrativa de mudanças: calculadora ilustrativa com inventário
interativo, volume aproximado, serviços adicionais, checklist de preparação,
acompanhamento e orçamento via WhatsApp.

**Status:** ✅ Concluída em 17/11/2026.

## Abrir
Abra `index.html`. Arquivo único, sem dependências.

## Onde editar
| O que mudar | Onde |
|-------------|------|
| Itens, volumes e preços | Objeto `CONFIG` (JS) |
| Serviços adicionais | `CONFIG.adicionais` (JS) |
| Checklist | Array `CHECKLIST` (JS) |
| Códigos de mudança | Objeto `PEDIDOS` (JS) |
| WhatsApp MOSS (rodapé) | `WHATSAPP_MOSS` (JS) |

## Funcionalidades reais
- Inventário com 8 itens e steppers +/– (0–99) que recalculam automaticamente.
- Calculadora: origem/destino (valida 3+ caracteres), tipo de imóvel, andares,
  elevador, 4 serviços adicionais → valor, faixa, volume em m³ e resumo.
- Checklist de 7 itens com barra de progresso.
- Acompanhamento de códigos fictícios (MV-1024/1030/1042) com 5 etapas.
- Botão "Solicitar orçamento via WhatsApp": abre `https://wa.me/?text=...`
  com o resumo preenchido, **sem número fixo** — o visitante escolhe o contato.

## Simulação e segurança
- Origem/destino são rótulos: **nenhuma rota ou distância é calculada**.
- Valores são estimativas configuráveis, **não preços garantidos**.
- O WhatsApp da calculadora não usa o número da MOSS, para não confundir
  o contato comercial da desenvolvedora com o da empresa fictícia.
- Para versão comercial: API de cotação com bases reais, integração de mapas
  com chave protegida no servidor, agendamento e assinatura digital.

## Acessibilidade
Skip link, foco visível, steppers com `aria-label`, `aria-live` nos resultados,
checklist com rótulos, navegação por teclado, `prefers-reduced-motion`.
