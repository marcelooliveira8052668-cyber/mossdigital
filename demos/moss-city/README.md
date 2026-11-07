# MOSS CITY — demonstração de gestão urbana Urban Command

**O futuro da cidade começa aqui.**

Entrega da **Etapa 3**: identidade aprovada na Etapa 2 mais os módulos de gestão (obras, mobilidade, meio ambiente, equipamentos públicos, atendimento administrativo, despesas fictícias e relatórios), todos navegáveis sobre o mesmo cenário persistido, e os ajustes aprovados em seguida: alternador dia/noite, detalhes técnicos e histórico no ponto selecionado, coordenadas variadas em registros novos e atalhos de módulos no centro de comando. **Publicação concluída e verificada no ar**, mediante autorização: <https://mossdigital.com.br/demos/moss-city/> com cartão no catálogo (registro em [docs/PUBLICACAO.md](docs/PUBLICACAO.md)).

Todos os registros operacionais são fictícios. As fotos são ilustrativas. Não há autenticação de produção, integração municipal, envio a órgãos públicos nem trânsito ao vivo.

## Onde está este trabalho

Branch exclusiva: `feat/moss-city`, criada a partir da versão publicada de `main`, sem modificar a branch ou os fontes da MOSS CONDO.

Árvore de trabalho independente:

`C:\Users\Sylvia Camillo\AppData\Local\Temp\opencode\moss-city-desenvolvimento`

Aplicação: `demos/moss-city/` dentro dessa árvore. A pasta independente é controlada pelo Git. A branch `feat/moss-city` foi enviada ao repositório remoto e o build foi publicado em `main` — detalhes em [docs/PUBLICACAO.md](docs/PUBLICACAO.md).

## Abrir a prévia

Na pasta `demos/moss-city/`:

```powershell
npm install
npm run dev -- --port 5206 --strictPort
```

Endereço local: **http://127.0.0.1:5206/**.

Escolha Administrador, Gestor de obras, Gestor ambiental ou Cidadão na entrada. O cabeçalho permite trocar a experiência. Não é necessário cadastro.

## Já disponível para avaliar

- Identidade própria Urban Command: fundo noturno, ciano, verde, geometria técnica e navegação estrutural.
- Alternador dia/noite no cabeçalho e na entrada, com preferência salva em chave exclusiva e variante diurna centralizada no fim do CSS.
- Apresentação com fotografia brasileira real, slogan, escolha de perfil e links funcionais para categorias do mapa.
- Cinco fotos selecionadas e documentadas, com 15 variantes WebP locais.
- Centro de comando com indicadores derivados do cenário, gráfico de solicitações, despesas e distribuição de serviços, atalhos para os módulos autorizados ao perfil e histórico do ponto selecionado.
- Detalhe do ponto com prazo demonstrativo da obra, linha/intervalo/extensão da mobilidade, área ambiental e linha do tempo de etapas registradas.
- Mapa Leaflet com 18 pontos fictícios, filtros, seleção, zoom, enquadramento, camada de regiões e detalhes externos ao mapa.
- Alternativa de lista para todos os pontos, utilizável com teclado.
- Base esquemática autoral local por padrão; OpenStreetMap opcional após explicação e confirmação.
- CSV da seleção territorial atual, sem valores administrativos no relatório público.
- Primeiro fluxo do cidadão: solicitação fictícia, protocolo, consulta dos próprios exemplos e histórico inicial.
- Cadastro genérico com validação, edição, exclusão confirmada, filtros, tabela acessível e CSV em seis módulos: obras, mobilidade, meio ambiente, equipamentos públicos, atendimento e despesas fictícias. Registros novos nascem com coordenadas variadas dentro dos limites do território fictício.
- Histórico de atualizações por registro, com observação opcional gravada em cada edição.
- Atendimento administrativo com escopo por perfil (gestores veem apenas suas categorias) e protocolo que não reaproveita códigos excluídos.
- Relatórios com janela de 3, 6 ou 12 meses, métricas, gráficos e tabela de situação por módulo, com exportação própria.
- Persistência em chave exclusiva, restauração confirmada, recuperação de erro, atualização silenciosa de dados salvos por versões anteriores e alternativa para fotos indisponíveis.
- Layout verificado em larguras pequenas e intermediárias, além do desktop.

Os números da entrada descrevem o **cenário inicial de exemplo**. Os números do comando, do portal, dos módulos e dos relatórios refletem os registros persistidos. Orçamento previsto de obras e despesas lançadas são valores diferentes, sem movimentação financeira real.

## Próximas etapas

1. Avaliação visual da versão publicada e ajustes indicados por você.
2. Backend real (autenticação, autorização, API e banco de dados) quando a demonstração avançar para produto.
3. Postagem da capa no Instagram somente após autorização específica — os arquivos estão prontos em `divulgacao/instagram/moss-city/`.

Os menus apontam apenas para telas funcionais, filtradas por `permissions`. Não há botões decorativos para módulos pendentes.

## Organização para aprender

| Arquivo / pasta | Responsabilidade |
| --- | --- |
| `src/App.jsx` | Navegação, perfis, limites de acesso e restauração |
| `src/pages/Landing.jsx` | Identidade e apresentação do produto |
| `src/pages/Command.jsx` | Composição territorial e indicadores |
| `src/pages/ModulePage.jsx` | Cadastro, filtros, tabela e exclusão dos módulos de gestão |
| `src/pages/Reports.jsx` | Janela temporal, métricas, gráficos e tabelas por módulo |
| `src/pages/MapExplorer.jsx` | Pesquisa, filtros, lista e exportação territorial |
| `src/pages/CitizenPortal.jsx` | Primeiro fluxo de solicitação e acompanhamento |
| `src/components/CityMap.jsx` | Leaflet, marcadores, camadas e base cartográfica |
| `src/components/PointDetail.jsx` | Fotografia, localização, situação e avanço do ponto |
| `src/components/Charts.jsx` | Cálculos e gráficos com alternativas textuais |
| `src/components/Photo.jsx` | Imagens responsivas e estado de falha |
| `src/data/modules.js` | Títulos, campos, colunas, permissões e escopo de cada módulo |
| `src/data/seed.js` | Cidade, locais, despesas e protocolos fictícios |
| `src/utils/management.js` | Validação, gravação, exclusão e filtros genéricos dos módulos |
| `src/services/schema.js` | Atualização silenciosa de dados salvos por versões anteriores |
| `src/services/repository.js` | Persistência isolada, preparada para substituição futura por API |
| `src/hooks/useScenario.js` | Estado compartilhado e tratamento de armazenamento |
| `src/styles/city.css` | CSS exclusivo comentado em português |
| `tools/prepare_assets.py` | Fotografias, fontes e cartografia autoral |

O código-fonte tem comentários em português. JSON, bibliotecas e assets compilados não recebem comentários manuais.

Referências de personalização: **[docs/PERSONALIZACAO.md](docs/PERSONALIZACAO.md)**.

## Testes reproduzíveis

```powershell
npm test
npm run build
```

Para os testes de navegador, use o Python com Playwright, Pillow e Chrome local, já disponíveis no ambiente desta entrega. As dependências de Python não são necessárias para executar a aplicação React.

Em um terminal, na pasta da demo:

```powershell
python -m http.server 8797 --bind 127.0.0.1
```

Em outro terminal:

```powershell
python tests/preview_check.py
python tests/accessibility_check.py
```

Os scripts visitam `/dist/` para testar a hospedagem em subdiretório. **Os tiles do OpenStreetMap são substituídos por imagens de teste locais; os testes não varrem o serviço comunitário.**

A verificação da publicação usa outro endereço e não depende do servidor local:

```powershell
python tests/publication_check.py
```

Ela consulta o site publicado na internet (é preciso estar conectado), confere a execução do React e do CSS, o alternador dia/noite, a largura de celular, o cartão do catálogo e a prévia da captura.

Resultados: **[docs/VALIDACAO.md](docs/VALIDACAO.md)**.

## Mapas e fotografias

- Cartografia local: desenho esquemático autoral, sem escala cadastral ou limites municipais reais.
- OpenStreetMap: base opcional, online, com atribuição visível. Ao ativá-la, ruas reais e pontos fictícios são diferenciados por aviso permanente.
- Não há download de áreas, uso offline de tiles do OSM, busca de endereço ou rastreamento de localização pessoal.
- As fotos ficam no próprio build, sem dependência dos bancos durante a visita.
- Fontes e condições: **[docs/FOTOGRAFIAS-E-MAPAS.md](docs/FOTOGRAFIAS-E-MAPAS.md)** e `docs/photo-sources.json`.

## Divulgação e publicação

Capa PNG 1080 × 1350, fonte SVG e legenda da **prévia** em `divulgacao/instagram/moss-city/`, na raiz desta árvore de trabalho. Cópia em `Downloads/00 - MOSS Digital/04 - Divulgacao/MOSS CITY/`.

O Vite usa `base: './'` e a aplicação usa `HashRouter`. O build fica em `dist/`, ignorado pelas configurações existentes do repositório. Nenhuma configuração global de publicação foi alterada.

A publicação foi concluída com autorização, no padrão da MOSS CONDO: build em <https://mossdigital.com.br/demos/moss-city/>, cartão em <https://mossdigital.com.br/sistemas.html> e verificação em produção por `python tests/publication_check.py`. A capa não foi postada em redes sociais. Registro completo: [docs/PUBLICACAO.md](docs/PUBLICACAO.md).

## Limites de produção

Perfis são uma simulação de interface. O localStorage pode ser inspecionado pelo visitante, não há sincronização entre usuários e a geração de protocolo não é transacional entre abas. Uma operação municipal real exigiria backend, autenticação, autorização, proteção de dados e integrações oficialmente aprovadas.
