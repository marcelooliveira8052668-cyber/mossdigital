# Roteiro de fotografias — VivaMall

Atualmente os produtos usam **SVGs ilustrativos locais**, desenhados para não depender de fotografias sem licença. Para a versão comercial:

## Tamanhos e arquivos esperados
- `hero.webp` — fotografia ou colagem licenciada para a capa. Preferir 4:3; adaptar o enquadramento responsivo.
- `produto-01.webp` — fotografia autorizada do produto «Fone Aura», proporção 1:1; arquivo atual `produto-01.svg` é ilustração provisória.
- `produto-02.webp` — fotografia autorizada do produto «Mini Caixa Pulse», proporção 1:1; arquivo atual `produto-02.svg` é ilustração provisória.
- `produto-03.webp` — fotografia autorizada do produto «Luminária Arco», proporção 1:1; arquivo atual `produto-03.svg` é ilustração provisória.
- `produto-04.webp` — fotografia autorizada do produto «Kit Canecas Duo», proporção 1:1; arquivo atual `produto-04.svg` é ilustração provisória.
- `produto-05.webp` — fotografia autorizada do produto «Bolsa City», proporção 1:1; arquivo atual `produto-05.svg` é ilustração provisória.
- `produto-06.webp` — fotografia autorizada do produto «Tênis Street», proporção 1:1; arquivo atual `produto-06.svg` é ilustração provisória.
- `produto-07.webp` — fotografia autorizada do produto «Skincare Fresh», proporção 1:1; arquivo atual `produto-07.svg` é ilustração provisória.
- `produto-08.webp` — fotografia autorizada do produto «Kit Pincéis Pro», proporção 1:1; arquivo atual `produto-08.svg` é ilustração provisória.

## Instruções precisas para OpenCode
1. Pesquisar imagens com permissão clara de uso comercial, sem copiar fotografias e marcas de Shopee, Mercado Livre, Amazon, Magalu, Zalando etc.
2. Confirmar se a licença cobre o projeto e registrar autor, URL de origem, licença e data em `CREDITOS-FOTOS.md`.
3. Converter para WebP otimizado; hero com aproximadamente 1600 px de largura, produtos com 900 px se a resolução de origem permitir.
4. Substituir em `index.html` **apenas** `src="assets/img/hero.svg"` por `src="assets/img/hero.webp"`.
5. Em `js/script.js`, localizar a função `imagem(produto)` e substituir a extensão `.svg` pela extensão `.webp` após salvar os arquivos com nomes correspondentes.
6. Preservar `alt`, proporções, cards, botões, lógica do carrinho e responsividade; testar todas as imagens no Edge, computador e celular.
7. Não publicar sem autorização do proprietário e revisão das fontes das imagens.

Os arquivos SVG podem permanecer como backup até a aprovação das novas fotos.
