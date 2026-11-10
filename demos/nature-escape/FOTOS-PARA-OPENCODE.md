# FOTOGRAFIAS — 11-nature-escape | Instruções para OpenCode

## Missão

Adicionar imagens reais e legalmente utilizáveis **somente nesta demo**, mantendo o HTML, o CSS, o JavaScript, as dimensões dos cards, o conteúdo e o telefone WhatsApp existentes. Fazer backup antes de alterar algo. Não publicar nada no GitHub ou no site oficial sem aprovação.

## Arquivos esperados e medidas

A página já procura automaticamente cada foto em `assets/img/`. Enquanto não existir, mostra o SVG local de identificação. Use os **mesmos nomes** (incluindo `.webp`):

- [ ] `assets/img/capa.webp` — Foto principal da capa, 1600 x 1200 px, enquadramento horizontal
- [ ] `assets/img/domo-vista-verde.webp` — Card: Domo Vista Verde, 900 x 675 px
- [ ] `assets/img/cabana-horizonte.webp` — Card: Cabana Horizonte, 900 x 675 px
- [ ] `assets/img/trilha-guiada.webp` — Card: Trilhas guiadas, 900 x 675 px
- [ ] `assets/img/cafe-bosque.webp` — Card: Café do Bosque, 900 x 675 px
- [ ] `assets/img/deck-externo.webp` — Galeria — ambiente, 900 x 675 px
- [ ] `assets/img/interior-cabana.webp` — Galeria — equipe/processo, 900 x 675 px
- [ ] `assets/img/paisagem-serra.webp` — Galeria — resultado, 900 x 675 px

- Prefira imagens próprias do cliente ou de bancos com licença comercial verificada; registre autor e licença, quando aplicável.
- Otimize as fotos, idealmente WebP entre 100 e 350 KB por imagem, sem exagerar na compressão.
- Depois de copiar, recarregue a página no navegador. Se a imagem continuar ausente, confira nome, extensão, letras maiúsculas/minúsculas e caminhos.
- Não apresente os espaços reservados, nem imagens geradas, como fotografias de uma empresa real.

## Critérios para o encaixe

1. Confirmar no CSS o tamanho renderizado dos contêineres antes de preparar cada foto.
2. Para cards e galeria, preparar 900 × 675 pixels, proporção 4:3; para a capa, 1600 × 1200 pixels.
3. Manter `width: 100%`, `height: 100%`, `object-fit: cover` e `overflow: hidden` no contêiner. Não esticar nem distorcer.
4. Se um rosto/produto for cortado, ajustar **apenas o enquadramento** (`object-position`) ou selecionar outra foto adequada.
5. Converter para `.webp`, registrar origem e licença, conferir permissão para uso comercial e otimizar tamanho.
6. Salvar as fotos exatamente em `assets/img/` com os nomes indicados. O JS já substitui os marcadores visuais ao encontrar os arquivos.
7. Conferir visualmente desktop e celular, cards clicáveis, menu, filtros, formulários e WhatsApp.
8. Relatar fotos adicionadas, tamanhos, fontes, licença e o que efetivamente foi testado.

**Atenção:** não usar fotos falsas como se retratassem o estabelecimento do cliente. Não inventar depoimentos ou equipe.
