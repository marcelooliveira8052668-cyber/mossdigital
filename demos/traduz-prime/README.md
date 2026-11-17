# TRADUZ PRIME — Demonstração 05

Estúdio editorial demonstrativo de tradução e interpretação: idiomas,
documentos, simulador de orçamento, fluxo de entrega, acompanhamento, FAQ e
atendimento. **Perfil fictício — nenhuma credencial real é assumida.**

**Status:** ✅ Concluída em 17/11/2026.

## Abrir
Abra `index.html`. Arquivo único, sem dependências.

## Onde editar
| O que mudar | Onde |
|-------------|------|
| Idiomas e bandeiras | Array `IDIOMAS` (JS) |
| Preços, tipos de documento e prazos | Objeto `CONFIG` (JS) |
| Pedidos de acompanhamento | Objeto `PEDIDOS` (JS) |
| WhatsApp MOSS | `WHATSAPP_MOSS` (JS) |
| Cores | `:root` (CSS) |

### Exemplo: alterar valor por página
```js
// Antes: valorPorPagina: 42
// Depois:
valorPorPagina: 55,  // valor ilustrativo por página
```
O simulador recalcula ao recarregar a página.

## Funcionalidades reais
- Simulador: origem/destino (rejeita idiomas iguais), tipo de documento,
  1–60 páginas, prazo; calcula valor, faixa e detalhamentos.
- Acompanhamento de pedidos fictícios (TR-2026-001/002/003) com 5 etapas;
  erro para código inválido.
- FAQ em `<details>` (nativo e acessível).
- Formulário com validação (nome, e-mail, descrição) e confirmação local.
- Menu mobile e botão MOSS com mensagem identificando a demo.

## Simulação e segurança
- **Não envia nem armazena documentos pessoais reais.** O formulário não tem
  campo de upload — o texto avisa explicitamente para não anexar documentos.
- Códigos, perfil, pedidos e valores são fictícios.
- Para versão comercial: backend seguro, gestão de arquivos com consentimento
  e retenção definida (LGPD), assinatura de responsável técnico e integração
  de pagamentos — credenciais nunca no JavaScript público.

## Acessibilidade
Skip link, foco visível, navegação por teclado, `<details>` nativo, `aria-live`
em resultados e erros, `prefers-reduced-motion`, bandeiras com SVG original
(e sem marcas oficiais).
