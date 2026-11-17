# MOSS Commerce Enterprise Academy

Uma loja virtual completa para conhecer compras, pagamentos, entregas e aprender como a programação funciona por dentro.

> **Demonstração 100% fictícia.** Nenhuma compra, pagamento ou entrega movimenta dinheiro real.

## Como executar

### Opção 1 — abrir direto no navegador (recomendado)
Abra `index.html` no Chrome/Edge/Firefox. Não precisa instalar nada, nem configurar credenciais.

### Opção 2 — Koder / VS Code Live Server
Use a extensão Live Server ou qualquer servidor estático. Necessário apenas se quiser testar o modo Supabase via CDN.

### Opção 3 — GitHub Pages
Publique esta **pasta inteira** como um site. Compatível com rotas por hash (`#/produtos`), sem precisar de reescrita de URL.

## O que está incluído

| Área | Recursos |
|---|---|
| Loja estilo marketplace | **236 produtos fictícios em 17 categorias**, fotos reais (Unsplash) com fallback SVG offline, busca no cabeçalho, categorias, flash sale com contador, mais vendidos, cupons, filtro de frete grátis, paginação e favoritos |
| Carrinho | Quantidades, remoção, cupons MOSS10/PRIME20, subtotal e total, persistência em `localStorage` |
| Checkout | 7 etapas com barra de progresso, validações e dados de teste predefinidos |
| Pagamentos | Pix fictício com comprovante visual; cartão de teste com 3 resultados (aprovado/recusado/pendente) e parcelamento |
| Entrega | 3 modalidades, 6 estados, linha do tempo visual e código de rastreio fictício |
| Admin | **Cadastro de produtos**, **controle de estoque** (entrada/saída, alertas, histórico de movimentações), exclusão/restauração, indicadores, gráfico, avanço de pedidos e devolução simulada |
| Tecnologias | 50+ cartões com finalidade/aplicação/documentação, painel de custos e calculadora |
| Laboratório | 12 módulos, diagrama de fluxo clicável, código linha a linha com tradução/símbolos/resultado |
| Academy | 8 tarefas simuladas de Front-End Júnior com progresso local |
| Testes | `tests/index.html` com asserções das funções críticas |

## Estrutura de arquivos

```
index.html                  Interface (HTML semântico)
css/
  base.css                  Variáveis de tema, reset, tipografia
  layout.css                Cabeçalho, menu responsivo, rodapé, grids
  components.css            Botões, cards, forms, modais, timeline
  pages.css                 Estilos por área
  lab.css                   Laboratório Visual do Código
js/
  core/                     utils, store, notify, theme, router
  data/                     catalog, coupons, shipping, technologies, course, lab-content
  services/                 api, cart, order, payment, logistics, supabase, admin
  components/               ui, layout, product-card
  pages/                    home, store, product, cart, checkout, orders,
                            tracking, admin, technologies, lab, career
  app.js                    Bootstrap e registro de rotas
supabase/                   schema.sql + config.js opcional (RLS)
tests/index.html            Testes automatizados
assets/favicon.svg          Ícone vetorial
CREDITOS.md                 Créditos e licenças das imagens
MAPA-VISUAL.md              Mapa de arquivos e componentes
REGISTRO-ALTERACOES.md      Registros ANTES/DEPOIS/POR QUÊ
PREVIA-PUBLICACAO.md        Prévia e procedimento de publicação
```

## Decisões técnicas

- **Vanilla JavaScript** em IIFEs com namespace `window.MOSS` — sem frameworks, sem build, sem `import`/`fetch` de módulos (funciona em `file://`).
- **Rotas por hash** para compatibilidade com GitHub Pages e abertura direta do arquivo.
- **Fotos reais do Unsplash** (Unsplash License) com **fallback SVG gerado por código**: se o navegador estiver offline, o desenho vetorial local aparece no lugar da foto.
- **Store reativo simples** com `localStorage` e fallback seguro em modo privado.
- **Serviço de API simulado** com delay e envelopes `{ ok, data, meta }`.
- **Supabase opcional**: sem configuração, tudo roda localmente; com configuração, usa apenas a chave pública anon e RLS.

## Regra de ouro

Nunca colocar chaves secretas (service_role) em HTML/JavaScript público. Cobranças reais, webhooks e credenciais exigem backend seguro — este projeto apenas ensina essa arquitetura.
