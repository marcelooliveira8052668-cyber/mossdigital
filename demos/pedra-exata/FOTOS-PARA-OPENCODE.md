# Fotografias — Pedra Exata

**Objetivo:** deixar o layout completo e inserir fotos reais sem mudar a geometria dos cards.

## Arquivos esperados em `assets/img/`

- `capa-marmoraria.webp` — Cozinha com bancada sofisticada; hero horizontal
- `granito-sao-gabriel.webp` — Textura real de granito; ficha de material
- `quartzo-branco.webp` — Superfície de quartzo branco; ficha de material
- `marmore-claro.webp` — Mármore claro em ambiente real; ficha de material
- `oficina-pedra.webp` — Oficina com equipe profissional; apoio
- `cozinha-planejada.webp` — Bancada de cozinha em uso; portfólio
- `lavabo-pedra.webp` — Lavabo com superfície de pedra; portfólio
- `escada-pedra.webp` — Escadaria com revestimento de pedra; portfólio

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
