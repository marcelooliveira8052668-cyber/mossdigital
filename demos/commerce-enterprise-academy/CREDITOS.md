# Créditos e licenças

## Fotos reais dos produtos

As fotos exibidas no catálogo são do **Unsplash** e são servidas pelo CDN oficial
`images.unsplash.com`, com parâmetros de redimensionamento (`w=600&h=600&fit=crop&q=80`).

- **Fonte:** https://unsplash.com
- **Licença:** [Unsplash License](https://unsplash.com/license) — uso gratuito para fins comerciais e não comerciais; não exige atribuição (crédito dado aqui de forma voluntária).
- **Créditos:** os fotógrafos são creditados individualmente pelo Unsplash em cada página da foto. Os identificadores exatos das 50 imagens usadas estão em `js/data/catalog.js` (array `PHOTO_IDS`, referenciado pelo campo `photoIndex` de cada produto).
- **Verificação:** os URLs foram testados individualmente em 17/11/2026 (111 URLs verificados, reaproveitados entre os 236 produtos).
- **Fallback offline:** se a foto não carregar, `catalog.img()` troca automaticamente para uma ilustração SVG gerada localmente. A demonstração continua funcional sem internet.

> As fotos são genéricas de categoria (celular, notebook, TV, relógio etc.) e **não** representam produtos reais da MOSS Digital. Nomes, preços, estoques e avaliações são fictícios.

## Ilustrações SVG (fallback)

Geradas por código em `js/data/catalog.js`, função `image()`. Criadas exclusivamente
para este projeto, sem dependência de terceiros.

## Favicon

`assets/favicon.svg` — ilustração vetorial original.

## Marcas e tecnologias

Nomes de ferramentas (Mercado Pago, Stripe, Supabase, Correios etc.) e da MOSS Digital
aparecem apenas como referência didática. Logotipos oficiais não foram incorporados.

## Site oficial

MOSS Digital — https://mossdigital.com.br
