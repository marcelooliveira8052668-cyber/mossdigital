# NEXA STORE — Loja Virtual Completa

Modelo de e-commerce demonstrativo, pronto para apresentar a um cliente.
56 produtos em 10 categorias, carrinho persistente, checkout com **Pix, crédito e débito**,
acompanhamento de pedido e página de promoções.

Não usa back-end: tudo roda no navegador com `localStorage`, então basta abrir o
`index.html` — não precisa de servidor, banco de dados nem instalação.

---

## Índice

- [Abrir o site](#abrir-o-site)
- [O que já funciona](#o-que-ja-funciona)
- [O que o cliente precisa trocar](#o-que-o-cliente-precisa-trocar)
- [Editar as cores da loja](#editar-as-cores-da-loja)
- [Adicionar ou trocar produtos](#adicionar-ou-trocar-produtos)
- [Como funciona o Pix](#como-funciona-o-pix)
- [Limitações desta versão](#limitacoes-desta-versao)
- [Estrutura de arquivos](#estrutura-de-arquivos)
- [Créditos e licenças](#creditos-e-licencas)

---

## Abrir o site

**Opção 1 — direto.** Dê dois cliques em `index.html`. Funciona assim mesmo.

**Opção 2 — servido pela internet.** Suba a pasta para um hosting estático
(GitHub Pages, Netlify, Vercel, hospedagem tradicional). Não há etapa de build.

> O site usa apenas HTML, CSS e JavaScript puro. Pode ser publicado em qualquer
> lugar que sirva arquivos estáticos.

---

## O que já funciona

| Área | Detalhe |
| --- | --- |
| **Catálogo** | 56 produtos, 10 categorias, busca sem acento, ordenação, filtro por categoria, paginação |
| **Cards** | Clique leva à página do produto; botão *Adicionar* no card; *Falar com vendedor* no WhatsApp |
| **Página do produto** | Galeria, zoom, ficha técnica, o que vem na caixa, garantia, prazo de entrega, avaliações com distribuição de notas, relacionados, cálculo de frete por CEP, mapa da loja |
| **Carrinho** | Gaveta lateral, quantidade ±, cupom, persiste ao fechar o navegador |
| **Checkout** | Pix (QR real), crédito em até 12x, débito, retirada na loja, cupom, validação com mensagens amigáveis |
| **Pedido** | Número do pedido, linha do tempo de 6 etapas, itens, pagamento, endereço, mapa, botão de contato |
| **Página de ofertas** | 21 promoções, contador regressivo, cupons da semana |
| **Responsivo** | Desktop, tablet e celular |

**O carrinho não guarda preço.** Ele salva apenas `{id, qtd}` no `localStorage` e
lê o valor atual do catálogo a cada render. Assim, se o cliente trocar o preço de um
produto, ninguém fica com valor velho preso no navegador.

---

## O que o cliente precisa trocar

Abra **`js/config.js`**. É o único arquivo que precisa mexer para a loja "virar" a do
cliente. Tudo o mais é opcional.

| O que | Onde em `config.js` | Situação atual |
| --- | --- | --- |
| Nome e slogan da loja | `CONFIG.loja` | `NEXA STORE` (fictício) |
| WhatsApp de atendimento | `CONFIG.contato.whatsapp` | `5511999999999` (fictício) |
| E-mail | `CONFIG.contato.email` | fictício |
| Endereço e CEP | `CONFIG.loja` | fictício |
| Horário de atendimento | `CONFIG.loja` | fictício |
| **Chave Pix** | `CONFIG.pagamento.pix.chave` | fictícia |
| Nome do titular Pix | `CONFIG.pagamento.pix.titular` | fictício |
| Juros do crédito | `CONFIG.pagamento.jurosCredito` | `0.0399` (3,99% a.m.) |
| Limite de parcelas sem juros | `CONFIG.pagamento.parcelasSemJuros` | `6` |
| Valor do frete e mínimo para frete grátis | `CONFIG.entrega` | `R$ 24,90` / `R$ 199` |
| Cores da marca | `CONFIG.cores` | ver abaixo |

> **Importante:** o site avisa o visitante de que é uma loja demonstrativa — no rodapé
> e na página de contato. Essa advertência some sozinha assim que os dados em
> `config.js` deixarem de ser os de exemplo.

---

## Editar as cores da loja

Troque `CONFIG.cores.principal` em `js/config.js`. O resto do site acompanha sozinho:
botões, links, badges, chips, foco de teclado e a sombra colorida dos cards.

```js
cores: {
  principal: "#4f46e5",   // índigo — a cor atual
  principalEscuro: "#4338ca",
  principalClaro: "#eef2ff",
  acento: "#f97316"       // laranja dos selos de promoção
}
```

Bons pontos de partida: `#0ea5e9` (azul), `#059669` (verde), `#db2777` (rosa),
`#7c3aed` (roxo), `#dc2626` (vermelho).

---

## Adicionar ou trocar produtos

Tudo fica em **`js/dados.js`**. Existem quatro listas, nesta ordem:

1. `CATEGORIAS` — as 10 seções da loja
2. `PRODUTOS` — os 56 itens à venda
3. `AVALIACOES` — os comentários de clientes, um bloco por produto
4. `CUPONS` — os cupons de desconto

### Um produto, campo a campo

```js
{
  id: "nexa-phone-x-pro",          // único; vira o endereço produto.html?id=...
  nome: "Nexa Phone X Pro",
  categoria: "smartphones",        // precisa existir em CATEGORIAS
  preco: 4999,                     // preço cheio (número, sem R$)
  promo: 4299,                     // preço promocional — ou null se não houver
  imagem: "assets/img/produtos/nexa-phone-x-pro.jpg",
  icone: "mobile-screen-button",   // usado só se a imagem faltar
  resumo: "Uma linha curta, que aparece no card.",
  descricao: "Texto longo da página do produto.",
  specs: { Tela: "6,7\" AMOLED", Bateria: "5.000 mAh" },
  nota: 4.3,
  vendidos: 40,
  estoque: 3,                      // some do site quando chega a zero
  freteGratis: true
}
```

Três regras que valem a pena lembrar:

- **`promo` precisa ser menor que `preco`.** Se for maior ou igual, o site
  entende que não há promoção e ignora.
- **`id` não pode repetir.** É a chave de tudo: carrinho, URL e avaliações.
- **Cada produto precisa de um bloco em `AVALIACOES`,** com a mesma chave de `id`.

### As imagens

As 56 fotos estão em `assets/img/produtos/`, 800×800, e mostram o ícone do produto
sobre um fundo que combina com a categoria. São ilustrações próprias, sem direito
autoral de terceiro — pode vender o site sem se preocupar.

Se preferir fotos reais, é só substituir o `.jpg` mantendo o mesmo nome, ou apontar
`imagem` para o caminho que quiser.

---

## Como funciona o Pix

O QR Code do checkout é um **BR Code válido** — o mesmo formato que o app do banco
lê. O valor, a identificação do pedido e o CRC16 são calculados na hora.

Ou seja: assim que o cliente colocar a chave Pix verdadeira em
`CONFIG.pagamento.pix.chave`, o código passa a ser **genuinamente pagável**. Não é
imagem decorativa.

Para testar sem receber dinheiro, mantenha a chave fictícia — o QR é gerado
normalmente, mas não vai a lugar nenhum.

---

## Limitações desta versão

Ditas na frente, para não causar surpresa na entrega:

- **Não há servidor.** O pedido fica gravado só no navegador de quem comprou.
  Para receber pedidos de verdade é preciso um backend ou um serviço de
  e-mail/formulário (Formspree, Netlify Forms, Supabase, ou uma API própria).
- **O pagamento não é cobrado.** O Pix gera o código real e o cartão só valida os
  dados digitados — não há gateway integrado. A integração com Mercado Pago,
  Pagar.me, Stripe ou Asaas é o próximo passo natural.
- **As senhas não existem.** Não há área do cliente nem login.
- **Os preços são fictícios** e servem só para a demonstração.

---

## Estrutura de arquivos

```
├── index.html          vitrine: hero, categorias, ofertas, produtos, cupons, mapa
├── ofertas.html        21 promoções com contador regressivo
├── produto.html        página completa do produto (?id=...)
├── checkout.html       dados, entrega e pagamento
├── pedido.html         acompanhamento (?numero=...)
├── css/
│   └── style.css       todo o visual, com variáveis no topo
├── js/
│   ├── config.js       ← o que o cliente edita
│   ├── dados.js        ← catálogo, avaliações e cupons
│   ├── catalogo.js     busca, filtro, ordenação, cálculo de desconto
│   ├── carrinho.js     carrinho persistente
│   ├── ui.js           cabeçalho, rodapé, gaveta, cards, formatadores
│   ├── app.js          montagem da home
│   ├── produto.js      página do produto
│   ├── checkout.js     validação, Pix, parcelas, confirmação
│   ├── pedido.js       linha do tempo do pedido
│   └── lib/
│       └── qrcode.js   gerador de QR Code (MIT)
└── assets/img/produtos/  56 fotos
```

Ordem de carregamento importa: `dados.js` → `config.js` → módulos → página.

---

## Créditos e licenças

- **`js/lib/qrcode.js`** — QR Code Generator for JavaScript, de Kazuhiko Arase.
  Licença MIT. Uso direto, sem alterações.
- **Ícones** — Font Awesome Free 6.5.2, carregado por CDN. Segue a licença
  Creative Commons BY 4.0 do projeto.
- **Tipografia** — Inter, via Google Fonts.
- **Mapa** — OpenStreetMap, carregado por CDN.
- **Demais código, textos, layout e ilustrações** — originais deste projeto.

Todo o restante é código próprio, sem dependência de serviço pago.

---

## Suporte

Dúvida sobre como adaptar este modelo a um cliente específico é só chamar.
