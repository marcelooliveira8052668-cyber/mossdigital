# Plano da demo: mercadinho online para comerciante local

Rascunho de escopo levantado em conversa com o proprietário em 12/11/2026. **Nada foi construído ainda.** Este documento serve para alinhamento antes do início do trabalho.

## Decisões já tomadas

| Tema | Decisão |
| --- | --- |
| Formato principal | Loja online com catálogo e carrinho |
| Público-alvo | Comerciante local pequeno (padaria, mercadinho de bairro, florista, papelaria) |
| Dados e fotos | Produtos fictícios com fotos de banco identificadas, espaços para as fotos reais do comerciante |

## O que a demo precisa ter

### Para o cliente final (quem compra)

1. **Home do mercadinho** com identidade própria, diferente das outras demos: nome fictício, products em destaque, categorias, avisos de entrega/retirada e chamada para o WhatsApp.
2. **Catálogo** com busca por nome, filtro por categoria, filtro por faixa de preço, marcador de esgotado e ordenação.
3. **Página do produto** com foto, descrição, preço, unidade (kg, unidade, caixa), quantidade, variações simples e produtos relacionados.
4. **Carrinho lateral** com quantidade, remoção, subtotal, frete ilustrativo ou retirada, e mensagem pronta para o WhatsApp do comerciante.

### Para o comerciante (quem compra a demo)

5. **Painel do comerciante** local: cadastrar produto, editar preço/descrição, ativar e desativar, marcar esgotado, organizar categorias, ver os pedidos de exemplo e definir mensagem de boas-vindas.
6. **Página "Anuncie no mercadinho"** para captar novos comerciantes, com prévia e sem envio automático.

### Honestidade das demonstrações

- Marca, produtos, preços, notas, clientes e pedidos fictícios, identificados como demonstração.
- Sem pagamento real, sem gateway, sem login real, sem backend conectado, sem estoque real.
- O carrinho gera uma mensagem para o WhatsApp configurado; sem número configurado, a demo mostra a prévia e explica o que falta.
- Fotos de banco sempre rotuladas como referência, sem sugerir que são fotos do produto vendido.

## Identidade sugerida

Nome fictício a combinar com você, por exemplo **MERCADO DO BAIRRO**, **CASA DO MERCEEIRO** ou **ARMAZÉM DA ESQUINA**. A paleta deve ser própria e mais acolhedora que a VIVA Prime, com ar de comércio de bairro: verde, terracota ou amarelo mostarda sobre fundo claro. Precisa se diferenciar claramente das demos de academia (escuro neon), imobiliária (verde/bege editorial) e das lojas já existentes no portfólio.

## Perguntas em aberto para alinharmos

1. **Nome e segmento exato** do mercadinho fictício (padaria, hortifruti, mercearia, papelaria, florista?).
2. **O carrinho deve mandar para o WhatsApp do comerciante ou simular um checkout?** Recomendo WhatsApp, porque é o formato que o comerciante local realmente usa.
3. **Quer entrega, retirada ou os dois?** Posso mostrar os dois com aviso de que são áreas de atendimento ilustrativas.
4. **Produtos com unidade e peso** (kg, pacote, caixa) ou só preço por unidade? Para mercearia, peso costuma ser importante.
5. **Deve ter lista de compras / pedido recorrente** (o cliente monta a lista e o comerciante recebe), ou isso fica para uma segunda etapa?
6. **Quantos produtos e categorias** deseja no catálogo inicial? Sugiro 18 a 24 produtos em 5 ou 6 categorias.
7. **Precisamos de área do cliente** com pedidos salvos, ou basta o carrinho?

## Regras de entrega da demo

- HTML5, CSS3 e JavaScript puro, sem frameworks.
- LocalStorage apenas para carrinho, favoritos do comerciante e preferências; sem guardar dados sensíveis.
- Código comentado em português.
- Pelo menos seis fotografias distintas e verificadas, com fonte e licença registradas.
- Botões e links com resultado honesto; nada de simular pagamento concluído.
- Responsivo, testado por teclado, sem overflow.
- Capa de Instagram de 1080 × 1350 px com a fonte editável.
- Manual do comprador e explicação da evolução real com backend.
- Publicação somente depois da aprovação explícita desta demo.
