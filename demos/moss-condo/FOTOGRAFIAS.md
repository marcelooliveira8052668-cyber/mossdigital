# Fotografias da MOSS CONDO

Revisão solicitada e autorizada pelo usuário: fotografias na apresentação, nos três painéis, nas áreas comuns, nos módulos de gestão e na divulgação, mantendo a identidade Premium Glass.

## Inventário

| Arquivo-base | Conteúdo conferido visualmente | Uso |
| --- | --- | --- |
| `fachada` | Edifício residencial contemporâneo | Entrada, painel do síndico, financeiro e capa |
| `residencia` | Residência com jardim ao entardecer | Gestão de moradores |
| `recepcao` | Ambiente de convivência com mesas e janelas | Painel da portaria e visitantes |
| `salao` | Salão preparado para eventos | Salão de festas |
| `churrasqueira` | Detalhe de grelha com carvão em brasa | Churrasqueira |
| `quadra` | Raquete e bola sobre quadra de saibro | Área esportiva |
| `gourmet` | Cozinha integrada à sala de jantar | Espaço gourmet e contexto de entregas |
| `reunioes` | Ambiente de escritório com salas envidraçadas | Sala de reuniões e manutenção |
| `piscina` | Piscina ao ar livre e vegetação | Painel do morador e mural |

São ambientes de referência de locais diferentes. Nenhuma imagem é apresentada como fotografia do condomínio fictício, de um cliente ou de patrimônio da MOSS Digital. A piscina é apenas contextual: ela não adiciona uma sexta área reservável.

As descrições alternativas refletem o que aparece de verdade. A imagem da quadra é um detalhe de equipamento esportivo, e a da churrasqueira é um detalhe da grelha; não são vistas completas de instalações do condomínio.

## Fontes e licenças

As origens completas estão em **`photo-sources.json`**, com endereço do arquivo original, provedor, referência de licença e finalidade de uso. Não foram usados assets Unsplash+ nem imagens de acervos pagos.

- Unsplash: <https://unsplash.com/license>
- Orientação de uso comercial Unsplash: <https://help.unsplash.com/en/articles/2612315-can-i-use-unsplash-images-for-personal-or-commercial-projects>
- Pexels: <https://www.pexels.com/license/>
- Orientação de uso comercial Pexels: <https://help.pexels.com/hc/en-us/articles/360042295214-Can-I-use-the-photos-and-videos-for-a-commercial-project>

As licenças desses acervos permitem uso comercial e adaptação, sem atribuição obrigatória, respeitadas suas restrições. Isso não significa cessão de marcas, direitos de imagem de pessoas ou endosso dos proprietários dos locais. A seleção final não utiliza rostos identificáveis e permanece claramente ilustrativa.

A página de licença Unsplash não ficou acessível por leitura direta neste ambiente; seu conteúdo foi consultado pelo índice de pesquisa e pela documentação pública de ajuda. Não foi inventado crédito de fotógrafo onde a autoria individual não foi confirmada.

## Otimização e funcionamento local

- 9 fotografias, cada uma com variantes de 640, 1120 e 1600 pixels: 27 arquivos WebP.
- Proporções preservadas; recorte visual aplicado por CSS.
- Metadados originais de câmera e localização não são copiados para os arquivos WebP.
- `srcSet` e `sizes` permitem escolher uma variante por tela; as 27 versões não são todas baixadas em uma visita.
- Carregamento sob demanda nas galerias; prioridade para a foto principal e para o banner inicial de cada módulo.
- Dimensões de moldura definidas antes do carregamento, sem deslocar cartões e tabelas.
- Descrição acessível, indicação de foto ilustrativa e alternativa legível em caso de falha.
- Nenhuma requisição a Unsplash, Pexels ou outro domínio externo durante o teste da aplicação compilada.

## Regeneração e testes

Na pasta da demo, com Python e Pillow disponíveis:

```powershell
python tools/prepare_photos.py
npm run build
```

Com o servidor local da pasta em execução na porta 8796:

```powershell
python tests/photos_check.py
python tests/browser_check.py
python tests/modules_check.py
python tests/accessibility_check.py
npm test
```

`photos_check.py` confere imagens válidas em todas as experiências, descrições, seleção e remoção de filtro pelas fotos, fallback, subdiretório, larguras pequenas e ausência de requisições externas. Ele também gera a captura `screenshots/reservas-desktop.png`.

A capa e as capturas foram atualizadas localmente. Nenhuma autorização de integração ao catálogo ou publicação foi inferida desta revisão.
