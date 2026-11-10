# 07 — Wood Prime | Demonstração MOSS Digital

**Segmento:** Marcenaria e móveis sob medida  
**Status:** implementação funcional local; 8 fotografias de banco (licença Pexels) já inseridas e validadas visualmente em desktop, tablet e celular, aguardando substituição pelo portfólio autorizado do cliente, dados reais e aprovação para apresentação comercial final.  
**Tecnologia:** HTML + CSS + JavaScript puros, sem npm, sem frameworks e sem serviços externos.

## Como abrir

1. Extraia a pasta inteira; não abra arquivos de dentro do ZIP.
2. Abra `index.html` no Edge, Chrome ou outro navegador moderno.
3. Navegue pelos filtros, cards, menu, galeria ilustrativa e formulário.
4. O formulário monta uma mensagem para o WhatsApp **(11) 94203-8103**.

## Fotos reais: basta adicionar os arquivos (sem editar código!)

A página já procura automaticamente cada foto em `assets/img/`. Enquanto não existir, mostra o SVG local de identificação. Use os **mesmos nomes** (incluindo `.webp`):

- [x] `assets/img/capa.webp` — Foto principal da capa, 1600 x 1200 px, enquadramento horizontal
- [x] `assets/img/cozinha-planejada.webp` — Card: Cozinhas planejadas, 900 x 675 px
- [x] `assets/img/sala-planejada.webp` — Card: Painéis e salas, 900 x 675 px
- [x] `assets/img/dormitorio.webp` — Card: Dormitórios, 900 x 675 px
- [x] `assets/img/corporativo.webp` — Card: Espaços corporativos, 900 x 675 px
- [x] `assets/img/detalhe-madeira.webp` — Galeria — ambiente, **900 x 519 px** (ver observação abaixo)
- [x] `assets/img/montagem-oficina.webp` — Galeria — equipe/processo, 900 x 675 px
- [x] `assets/img/ambiente-finalizado.webp` — Galeria — resultado, 900 x 675 px

> Observação da 1ª foto da galeria: no CSS, o `.gallery` usa colunas `1.3fr 1fr 1fr` e as figuras 2 e 3 têm `aspect-ratio: 4/3`. Para a figura larga terminar na mesma base das outras, a proporção interna dela precisa ser `0,75 ÷ 1,3 = 1,7333` — por isso os 900 x 519 px (as demais continuam em 900 x 675 px). Em telas até 700 px o CSS força `4/3` nelas e a foto é recortada pelo `object-fit: cover`, sem deformação.

### Origem e licença das fotografias inseridas

Todas vêm do **Pexels** e estão sob a [Licença do Pexels](https://www.pexels.com/license/): uso pessoal e comercial gratuito, sem exigência de crédito e sem restrição de vendas. Não há marcas d'água. Nenhuma imagem foi gerada por IA nesta demo.

| Arquivo | Foto (ID no Pexels) | Autor informado pelo CDN | Dimensões | Peso |
|---|---|---|---|---|
| `capa.webp` | [15220866](https://www.pexels.com/photo/15220866/) | Hiba Q. Omar | 1600 x 1200 | 192 KB |
| `cozinha-planejada.webp` | [1358900](https://www.pexels.com/photo/1358900/) | não informado | 900 x 675 | 37 KB |
| `sala-planejada.webp` | [32178067](https://www.pexels.com/photo/32178067/) | não informado | 900 x 675 | 37 KB |
| `dormitorio.webp` | [6585745](https://www.pexels.com/photo/6585745/) | não informado | 900 x 675 | 60 KB |
| `corporativo.webp` | [33827334](https://www.pexels.com/photo/33827334/) | não informado | 900 x 675 | 85 KB |
| `detalhe-madeira.webp` | [129733](https://www.pexels.com/photo/129733/) | fwstudio | 900 x 519 | 128 KB |
| `montagem-oficina.webp` | [6790760](https://www.pexels.com/photo/6790760/) | Tima Miroshnichenko | 900 x 675 | 105 KB |
| `ambiente-finalizado.webp` | [5733620](https://www.pexels.com/photo/5733620/) | Dayvison de Oliveira Silva | 900 x 675 | 67 KB |

Recorte sempre ao centro (`object-fit: cover` já existe no CSS), na proporção exata de cada espaço, para não esticar nem cortar rostos e produtos.

- Prefira imagens próprias do cliente ou de bancos com licença comercial verificada; registre autor e licença, quando aplicável.
- Otimize as fotos, idealmente WebP entre 100 e 350 KB por imagem, sem exagerar na compressão.
- Depois de copiar, recarregue a página no navegador. Se a imagem continuar ausente, confira nome, extensão, letras maiúsculas/minúsculas e caminhos.
- Não apresente os espaços reservados, nem imagens geradas, como fotografias de uma empresa real: as fotos acima são amostras de banco para demonstração e devem ser substituídas pelo portfólio autorizado do cliente.

## Recursos implementados

- Menu responsivo e navegação interna; filtros de serviços; cards clicáveis com janela de detalhes.
- Galeria com três vagas de fotos; formulário validado; mensagem personalizada no WhatsApp.
- Acessibilidade inicial: textos alternativos, labels, estados de filtros, foco visível e diálogo nativo.
- Briefing de orçamento sem cobrança, armazenamento ou reserva automática.

## O que é demonstrativo ou ainda não está conectado

- Não há checkout, Pix automático, cartão, banco de dados ou autenticação.
- Não há reserva confirmada, envio de e-mails, painel administrativo ou backend.
- Nome comercial, serviços, preços, texto, marca e disponibilidade precisam da aprovação do cliente real.
- Não publique nem altere a MOSS Digital sem autorização expressa do proprietário.

## Arquivos

- `index.html` — conteúdo completo e formulário. (Único trecho ajustado na inserção das fotos: os atributos `width`/`height` da 1ª imagem da galeria passaram a 900/519, com comentário explicando a proporção — sem efeito de layout.)
- `css/style.css` — identidade visual, layout desktop e mobile. (Sem alterações: `img {width:100%;height:100%;object-fit:cover}`, `.card-image`, `.hero-image` e `.gallery figure` já enquadram as fotos.)
- `js/script.js` — navegação, filtros, detalhes, galeria e WhatsApp. (Sem alterações: o ciclo `img[data-photo]` troca o SVG pela foto e remove o rótulo da capa automaticamente.)
- `assets/img/*.webp` — as 8 fotografias inseridas (tabela de origem e licença na seção de fotos).
- `assets/img/placeholder.svg` — reserva local enquanto a foto não existe.
- `INTEGRACOES.md` — roteiro didático de hospedagem, domínio, Supabase, Pix, cartão e segurança.

## Validação visual executada (sem erros encontrados)

- Desktop 1440 px: capa enquadrada no bloco de 500 px, 4 cards com imagens de altura igual (4:3), galeria com as três figuras iniciando em y=2590 e terminando em y=2850 (bases idênticas).
- Tablet 768 px: capa em 420 px, cards 2 por linha, galeria alinhada nas colunas 1.3fr/1fr/1fr.
- Celular real 390 px (teste via iframe, pois o Chrome headless limita janela a 500 px): capa 5/4, cards em coluna única, galeria 1 por linha, menu abrindo sem estouro horizontal.
- Interações: diálogo "Ver detalhes" abrindo com a foto do card, filtro por categoria e menu móvel — todos sem erro de JavaScript.
- Todas as 8 fotos carregam pelos caminhos declarados; nenhum espaço reservado visível (exceto o do diálogo, que recebe a foto do card ao abrir).
