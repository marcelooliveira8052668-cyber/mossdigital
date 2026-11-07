# Fotografias e cartografia da MOSS CITY

## Fotografias selecionadas

As cinco imagens são do acervo gratuito Pexels. Suas páginas de origem e a licença do provedor foram consultadas durante a seleção; os links estão em `photo-sources.json`.

| Identificador | Conteúdo conferido visualmente | Uso nesta prévia |
| --- | --- | --- |
| `cidade` | Edifícios residenciais e vegetação em São Paulo | Portal e detalhes urbanos |
| `avenida` | Avenida Paulista ao entardecer | Asset contextual preparado para próximas composições |
| `parque` | Vista aérea da região do Parque Ibirapuera, vias e áreas verdes | Fotografia principal e contexto ambiental |
| `mobilidade` | Ônibus urbano em São Paulo | Eixo de mobilidade e detalhes territoriais |
| `obras` | Canteiro visto de cima, com estruturas e via ao lado | Infraestrutura e detalhe de obras fictícias |

A origem brasileira é identificada somente quando consta na fonte consultada. A fotografia de obras não é apresentada como brasileira nem como registro de contrato público. Fotos de diferentes lugares não representam um conjunto real de serviços de uma prefeitura.

Referências:

- Licença Pexels: <https://www.pexels.com/license/>
- Uso comercial: <https://help.pexels.com/hc/en-us/articles/360042295214-Can-I-use-the-photos-and-videos-for-a-commercial-project>

A licença permite uso e adaptação em aplicações e materiais comerciais, respeitadas suas restrições. Não autoriza sugerir endosso por pessoas ou marcas fotografadas, transformar fotos em marca registrada ou redistribuir um acervo concorrente. Créditos individuais só são registrados quando confirmados; não foram inventados nomes de autores.

As imagens são salvas em WebP, com variantes de 640, 1120 e 1920 pixels, preservando proporção e sem copiar metadados pessoais de câmera ou localização. A folha `fotografias.jpg` em `docs/screenshots/` (branch de desenvolvimento `feat/moss-city`) registra a seleção visual.

## Cartografia local por padrão

O arquivo `src/assets/territorio.svg` — incluído na branch de desenvolvimento `feat/moss-city` — é um desenho autoral gerado pelo script comentado `tools/prepare_assets.py`. Não foi copiado de mapas de terceiros. Representa somente uma cidade fictícia, sem escala cadastral, limites legais ou precisão de engenharia.

O Leaflet oferece zoom, arraste, seleção de marcadores e camadas mesmo nessa base independente de internet. Categorias e pontos são os mesmos da lista acessível.

## OpenStreetMap opcional

O visitante pode ativar a base OSM depois de uma confirmação que explica as requisições externas. A interface passa a informar **ruas reais, pontos fictícios**, mantendo visível a atribuição © OpenStreetMap contributors e seu link de licença.

Política consultada: <https://operations.osmfoundation.org/policies/tiles/>.

Regras consideradas:

- URL oficial HTTPS de tiles, sem servidores pagos ou chaves.
- Referer normal do navegador e sem configuração restritiva que o suprima.
- Cache normal do navegador, sem cabeçalhos que forcem recarga de tiles.
- Sem pré-download, arquivos de cidade, mapas offline ou varreduras automatizadas.
- Sem geolocalização, busca de endereços pessoais ou tráfego em tempo real.
- Falha do provedor é informada; a base local e a lista continuam disponíveis.

**Os testes automatizados interceptam todas as requisições de tiles e respondem com imagens locais de teste.** Nenhum robô executa sequências de pan/zoom no serviço comunitário. A auditoria de acessibilidade também bloqueia o provedor externo.

A verificação automatizada prova o funcionamento da troca de camada e da atribuição na aplicação, não a disponibilidade ou o desempenho do servidor real. O uso online continua sujeito à rede, às condições e à capacidade do provedor. Uma futura operação comercial precisaria reavaliar a infraestrutura cartográfica adequada à demanda.
