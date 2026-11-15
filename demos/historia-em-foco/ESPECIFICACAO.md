# História em Foco — Especificação

Livro digital gratuito para leitura na web, do Egito Antigo ao Brasil de hoje.
93 capítulos, com busca, sumário, glossário com Definitions, leitura em voz alta
e imagens do Wikimedia Commons com créditos. HTML, CSS e JavaScript puros.

## O que já funciona sem nenhuma configuração

- leitura em duas páginas, como um livro impresso, com virar de folha;
- sumário completo com busca por número de capítulo e por palavra;
- 93 capítulos escritos pelo professor Marcelo Oliveira;
- vocabulário destacado com o significado ao passar o mouse;
- leitura em voz alta de cada página (síntese de voz do navegador);
- tema claro e escuro;
- capítulo final de Referências e Créditos, com as fontes consultadas e a
  licença de cada imagem;
- jogo de filmes como material extra dentro da mesma pasta.

## Para o cliente: nada precisa ser conectado

Não há servidor, chave, cadastro, banco de dados nem cobrança. Para publicar:

1. copie a pasta inteira e publique como site estático com HTTPS;
2. opcionalmente troque a foto do autor (`img/professor.webp`) e os dados da
   capa em `referencias.js` e no bloco `window.LIVRO` de `index.html`.

Se o cliente quiser vender o livro, este modelo serve de vitrine: a leitura
gratuita no site substitui a entrega de arquivo e cada capítulo já tem página
própria para link direto (`?cap=1.5`).

## Conteúdo e imagens

- Os textos são obra original do professor Marcelo Oliveira.
- As 93 imagens vêm do Wikimedia Commons, em licença livre (domínio público,
  CC0, CC BY ou CC BY-SA). Os créditos completos, com autor, licença e link do
  arquivo original, estão no capítulo de Referências e Créditos e no arquivo
  `referencias.js`.
- As imagens foram convertidas para WebP com 1400 px de largura máxima para
  carregar rápido: o conteúdo é o mesmo, o peso é menor.
- As obras consultadas estão listadas no capítulo de Referências: elas
  documentam as fontes do texto, e a autoria didática do livro é do professor.

## Estrutura

```
historia-em-foco/
├── index.html          página do livro (sumário, leitura, busca, créditos)
├── jogo-filmes.html    jogo de filmes extra
├── estilo.css          visual de livro, temas claro e escuro
├── app.js              virada de páginas, busca, sumário, áudio e referências
├── livro1.js … livro5.js   o texto dos 93 capítulos, dividido em partes
├── imagens.js          figura e legenda de cada capítulo
├── referencias.js      fontes consultadas e créditos das imagens
├── imgCred.json        dados brutos dos créditos
├── imgPlano.json       plano de imagens
├── imgResultado.json   resultado da conferência das imagens
├── img/                94 imagens WebP (capítulos, capa e foto do autor)
├── css/ e js/          estilos e scripts auxiliares
└── README.md
```

Ordem de carregamento importa: `livro1.js` a `livro5.js` → `imagens.js` →
`referencias.js` → `app.js`.

## O que esta demo NÃO faz

- Não há cadastro, login, comentários, pagamento, download do PDF nem envio de
  e-mail. É leitura.
- As imagens são ilustrativas do segmento histórico: mostram o assunto do
  capítulo, não a cena descrita no texto nem a obra original citada.
- Não há servidor de busca: a busca roda no navegador, sobre o texto carregado.

## Checklist antes de publicar

- abrir `index.html` e testar virada de páginas, busca, sumário, áudio e tema;
- conferir a largura do palco em celular, tablet e computador;
- abrir o capítulo de Referências e conferir se todos os créditos e links das
  imagens estão presentes;
- revisar a foto do autor e o texto de capa;
- conferir a pasta `img/` completa: 94 arquivos WebP.

## Licença

Texto original do professor Marcelo Oliveira. Imagens do Wikimedia Commons,
cada uma com a licença registrada no capítulo de Créditos (domínio público,
CC0, CC BY ou CC BY-SA — as CC BY exigem atribuição, já feita no próprio
capítulo). HTML, CSS e JavaScript são marcas registradas de seus respectivos
proprietários.
