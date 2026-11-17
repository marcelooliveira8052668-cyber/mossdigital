# RESTAURA PRIME — Demonstração 03

Oficina demonstrativa de restauração de móveis: comparador antes/depois,
portfólio, serviços, acompanhamento de ordens e orçamento com prévia de fotos.

**Status:** ✅ Concluída em 17/11/2026.

## Como abrir
Abra `index.html`. Arquivo único (HTML + CSS + JS + SVGs), sem dependências.

## Estrutura
```
restaura-prime/
├── index.html, README.md, CREDITOS.md, REGISTRO-ALTERACOES.md, RELATORIO-TESTES.md
└── tests/ (cdp-smoke.js, capturar.js, screenshots)
```

## Onde editar

| O que mudar | Onde | Linha aprox. |
|-------------|------|--------------|
| Serviços | Array `SERVICOS` | ~430 |
| Peças do comparador | Array `PECAS` | ~445 |
| Ordens de acompanhamento | Objeto `ORDENS` | ~455 |
| Portfólio | Array `PORTFOLIO` | ~465 |
| Ilustrações | Função `desenharPeca()` | ~480 |
| WhatsApp da MOSS | `WHATSAPP_MOSS` | ~425 |

### Exemplo: alterar uma ordem fictícia
```js
// Antes
'RS-1024': { peca:'Cadeira Estilo', etapa:3, previsao:'em 5 dias úteis (ilustrativo)' },
// Depois
'RS-1024': { peca:'Cadeira Estilo', etapa:5, previsao:'pronta para retirada (ilustrativo)' },
```
**Explicação:** `etapa` vai de 1 a 6 e controla a barra de progresso e quais
passos aparecem como concluídos.

## Funcionalidades que realmente funcionam
- **Comparador antes/depois:** 3 peças selecionáveis; controle deslizante
  funciona com mouse, toque e teclado (`<input type="range">` com `clip-path`).
- **Acompanhamento:** busca de códigos fictícios (RS-1024, RS-1030, RS-1042)
  com barra de progresso e lista de etapas; erro para código inválido.
- **Formulário:** valida nome, contato, tipo de móvel e descrição de danos;
  exibe confirmação e resumo.
- **Prévia de fotos:** seleção local via `FileReader`/`URL.createObjectURL`,
  miniaturas com botão remover. Nenhum arquivo é enviado.
- **Menu mobile**, CTAs e botão comercial MOSS com mensagem identificando a demo.

## Funcionalidades simuladas
- Peças, projetos, códigos, previsões e depoimentos são **fictícios** — os
  depoimentos estão identificados como exemplos na própria página.
- O formulário **não envia** dados nem fotos; tudo fica apenas no navegador.
- As ilustrações são estilizadas, não fotos de restaurações reais.

### Para versão comercial
1. Upload real de fotos com storage e controle de privacidade (LGPD).
2. Backend para ordens de serviço, agendamento e notificações.
3. Galeria antes/depois com fotos reais licenciadas (atualizar CREDITOS.md).
4. Gateways de pagamento e assinatura de orçamento.

## Acessibilidade
Skip link, foco visível, `aria-pressed` nas abas, `aria-valuetext` no slider,
`aria-live` nas mensagens, alternância por teclado, `prefers-reduced-motion`.

## Fotografias ilustrativas (6 por demo)

Foram adicionadas 6 fotografias reais de marcenaria, ferramentas e móveis antigos, obtidas via Openverse com licenças que permitem uso comercial (CC0, CC BY ou CC BY-SA). Cada imagem foi redimensionada para 1200×800 e convertida em WebP, com fonte, licença e autor registrados em `CREDITOS.md` e `img/fotos/fontes.json`.

As fotos são **imagens de referência**: não representam a empresa fictícia, sua equipe, instalações ou trabalhos reais. Aviso visível na seção `Fotografias ilustrativas`.
