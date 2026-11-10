# Fotografias — Sola Viva

**Objetivo:** deixar o layout completo e inserir fotos reais sem mudar a geometria dos cards.

## Arquivos esperados em `assets/img/`

- `capa-sapateiro.webp` — Ateliê de sapataria, sapateiro em bancada, hero horizontal
- `restauracao-calcados.webp` — Sola de sapato sendo restaurada; serviço
- `reparo-bolsas.webp` — Bolsa e couro sobre bancada; serviço
- `cuidados-couro.webp` — Peças de couro e produtos de cuidado; serviço

## Dimensões recomendadas

- Capas: WebP 1600 × 1000 px ou proporção equivalente conforme área visual.
- Cards e fotos de serviço: WebP 900 × 675 px (4:3), respeitando o enquadramento.
- Fotos quadradas: WebP 900 × 900 px, se necessário.
- Imagens de portfólio: entre 1200 × 900 px e 1600 × 1000 px, de acordo com o contêiner.

Não force a imagem a ficar esticada: use `object-fit: cover`, revise o corte e ajuste `object-position` quando necessário.

Se não houver foto aprovada, o SVG local continuará aparecendo. As fotos são inseridas automaticamente pelo JavaScript quando o arquivo existir.

## Regras do OpenCode

1. Busque fotos compatíveis com o produto/serviço; confira licenças e autoria.
2. Não use fotos identificando falsamente uma empresa real como sendo desta demo.
3. Otimize peso e formato, sem perder legibilidade.
4. Teste no Edge em 390 px, 768 px e 1440 px.
5. Não modifique o site oficial nem publique no GitHub sem autorização específica.
