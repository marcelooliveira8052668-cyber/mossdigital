# Personalização didática — Urban Command

Referências desta demonstração. As linhas podem mudar em etapas futuras; procure também os nomes indicados. Antes de modificar arquivos existentes em uma próxima tarefa, apresente o plano e aguarde autorização.

## Cores, tipografia e composição

| Quero alterar | Arquivo e referência |
| --- | --- |
| Fundo, ciano, azul aço, branco-gelo e verde | `src/styles/city.css`, linhas **3–9**, variáveis `--city-*` |
| Variante diurna (modo dia) | `src/styles/city.css`, linha **693**, bloco `.moss-city.theme-day`; a partir da linha **691**, todos os comentários do modo dia |
| Cor da categoria quando vira texto no modo dia | `src/styles/city.css`, procure `color-mix(in srgb, var(--category-color)` — escurece a tinta de cada setor sobre fundo claro |
| Fonte da interface | `src/styles/city.css`, linha **13** |
| Fonte tecnológica dos títulos | `src/styles/city.css`, linha **23**, família local Bahnschrift e alternativas |
| Tamanho do slogan inicial | `src/styles/city.css`, linha **87**, `.city-landing-copy h1` |
| Menu estrutural e cabeçalho | Procure `.city-sidebar` e `.city-topbar` no mesmo CSS |
| Aparência da cartografia e de seus controles | Procure `.city-map-canvas`, `.city-map-tools` e `.city-map-pin` |
| Adaptação ao celular | Blocos `@media` de 800 e 500 pixels |

**O que aprender:** uma variável CSS guarda um valor reutilizado dentro desta aplicação. `var(--city-cyan)` lê a cor de destaque. Alterar a variável afeta apenas os elementos da MOSS CITY que a utilizam, sem editar o CSS do site principal.

Bahnschrift é uma fonte local; onde não estiver instalada, o navegador usa uma alternativa. Não há download automático de fontes. Todas as cores de leitura devem ser reavaliadas depois de qualquer alteração de paleta.

## Tema dia e noite

- `src/App.jsx`, linha **32**, constante `THEME_KEY`: chave exclusiva `moss-city:theme:v1` usada para lembrar a escolha.
- `src/App.jsx`, estado `theme` e função `toggleTheme` na função `App`: valor `night` (padrão) ou `day`, aplicado como classe `theme-day` na raiz `.moss-city`.
- Botões de alternar: `src/App.jsx`, no topo do ambiente interno, e `src/pages/Landing.jsx`, linha **18**, no cabeçalho da entrada. Ambos usam `aria-pressed` e rótulo `Ativar modo dia` / `Ativar modo noite`.
- `src/styles/city.css`, linha **693**: as variáveis centrais são redefinidas no bloco `.moss-city.theme-day`. Todo elemento que lê `var(--city-*)` se adapta sozinho.
- `src/styles/city.css`, a partir da linha **695**: regras de sobrescrita para superfícies, tabelas, gráficos e formulários que usavam cores fixas. Os gráficos são corrigidos por seletores de atributo, como `[stroke='#00d4ff']`.
- A camada cartográfica permanece escura nos dois modos, por decisão de desenho.

**O que aprender:** o tema não duplica o layout — ele troca variáveis e sobrescreve apenas as cores fixas. Quando um valor já usa `var()`, nenhuma regra extra é necessária. As cores fixas da biblioteca de gráficas são inalteráveis por variável, por isso o CSS usa seletores de atributo para substituí-las no modo dia. As cores das categorias usam `color-mix` para escurecer a tinta original sobre fundo claro, mantendo o tom de cada setor com contraste garantido.

## Textos e navegação

- `src/pages/Landing.jsx`, a partir da linha **18**: slogan, proposta, escolha do perfil e links dos três eixos visuais.
- `src/components/Brand.jsx`, linha **8**: assinatura textual do produto. Não é o arquivo do logotipo oficial da MOSS Digital.
- `src/App.jsx`, linha **28**, objeto `navigation`, e linha **30**, lista `pageOrder`: rótulos, ícones e ordem dos módulos funcionais; a lista `permissions` em `src/data/modules.js` decide quem vê cada um.
- `src/data/scenario.js`, linha **2**: nomes dos quatro perfis demonstrativos.
- `src/pages/Command.jsx`, a partir da linha **18**: organização dos indicadores, visão de cada gestor e lista `shortcuts` (linha **29**) dos atalhos filtrados por `permissions`.

**O que aprender:** uma propriedade React, como `profile`, é um valor enviado a outro componente. O componente usa esse valor para escolher sua apresentação. Essa escolha no navegador não é autenticação nem autorização de backend.

## Fotografias e enquadramento

- `src/data/photos.js`, linhas **4–9**: cada imagem tem uma descrição `alt`, uma posição de recorte `position` e uma indicação `label` de uso ilustrativo.
- `src/components/Photo.jsx`, linha **6**: tamanho responsivo, prioridade e recuperação de imagem indisponível.
- `tools/prepare_assets.py`, lista `SOURCES`: endereços e títulos das fotografias selecionadas.
- `docs/photo-sources.json`: registro gerado de fontes, licença e finalidade.

**O que aprender:** `object-fit: cover` preenche a moldura sem deformar a foto. `objectPosition` informa qual região da imagem deve permanecer visível. `srcSet` oferece arquivos de larguras diferentes para que o navegador escolha o mais adequado.

O evento `onError` ativa o estado `failed` e mostra uma alternativa legível em vez de deixar uma imagem quebrada. O atributo `loading="lazy"` adia fotos fora da região inicial. A foto principal usa prioridade de carregamento.

Não copie imagens de portais municipais sem verificar licença e condições específicas. Uma fotografia de referência nunca deve ser descrita como comprovação de um serviço fictício.

## Território, filtros e mapa

- `src/data/scenario.js`: categorias, cores, símbolos, bairros fictícios, limites de referência e endereço do mapa autoral.
- `src/data/seed.js`, linha **6**, função `createSeed`: pontos e demais registros do cenário inicial.
- `src/components/CityMap.jsx`, linha **12**: criação do Leaflet e sincronização com os filtros.
- `src/pages/MapExplorer.jsx`, linha **18**: pesquisa, categoria, situação, região e seleção da lista.
- `src/utils/domain.js`, função `filterPoints`: aplica os mesmos critérios ao mapa e à lista.

**O que aprender:** latitude e longitude são números usados para posicionar marcadores. Aqui são somente referências de uma demonstração. A imagem local do território é esquemática, não uma base cadastral. Na opção OSM, as ruas são reais, mas os pontos continuam inventados.

`useEffect` conecta o componente a uma biblioteca externa e devolve uma função de limpeza. A limpeza remove mapa, camadas e observadores quando a tela sai de cena, evitando duplicações e consumo desnecessário de recursos.

Os contornos de regiões são simulações visuais, não fronteiras municipais. Não remova a atribuição obrigatória do OpenStreetMap nem adicione recursos de download de áreas ao serviço comunitário.

## Indicadores, protocolos e persistência

- `src/utils/domain.js`, função `summarize`: totais calculados a partir dos registros.
- `src/components/Charts.jsx`: agrupamento temporal e distribuição por setor, com os mesmos valores também disponíveis em texto.
- `src/pages/CitizenPortal.jsx`, linha **12**: formulário e consulta do cidadão fictício.
- `src/utils/domain.js`, funções `nextProtocol` e `requestError`: sequência demonstrativa e validação.
- `src/services/repository.js`, linha **4**: chave exclusiva `moss-city:scenario:v1`.
- `src/hooks/useScenario.js`, linha **8**: carregamento, gravação, mensagens e restauração.

**O que aprender:** `filter` seleciona registros, `map` transforma listas e `reduce` acumula resultados, como somas. O comando não mantém uma cópia manual dos números: ele recalcula os totais quando os registros mudam.

Depois de alterar os exemplos em `seed.js`, use **Restaurar demonstração** para carregar os novos dados. Alterar o arquivo não substitui automaticamente o que já está salvo no navegador.

Nunca use `localStorage.clear()` para restaurar a MOSS CITY. Isso poderia apagar informações de outras aplicações no mesmo domínio. O serviço desta prévia acessa somente sua própria chave.

## Módulos de gestão, permissões e relatórios

- `src/data/modules.js`, linha **8**, objeto `permissions`: quais páginas cada perfil demonstrativo pode abrir.
- `src/data/modules.js`, linha **19**, objeto `modules`: título, descrição, fotografia, campos, colunas e filtro de data de cada módulo.
- `src/data/modules.js`, função `recordsFor` (linha **32**): seleção de registros respeitando perfil e escopo de categorias.
- `src/utils/management.js`, linha **41**, função `saveRecord`: validação, montagem do registro e histórico de atualização.
- `src/utils/management.js`, demais funções: `fieldsFor`, `initialRecord` (linha **16**, com coordenadas variadas por `variedCoord`), `recordError`, `deleteRecord` e `filterRecords`.
- `src/components/PointDetail.jsx`: prazo da obra, linha/intervalo/extensão da mobilidade, área ambiental e histórico de etapas, com conversão de data em `brDate`.
- `src/pages/ModulePage.jsx`, linha **22**: tela única que renderiza qualquer módulo conforme a configuração acima.
- `src/pages/Reports.jsx`, linha **22**: janela temporal, métricas, gráficos e tabela de situação por módulo.
- `src/services/schema.js`, função `normalizeScenario` (linha **4**): completa dados salvos por versões anteriores.

**O que aprender:** um módulo novo costuma exigir apenas uma entrada em `modules.js` e uma rota em `App.jsx`. A tela de cadastro é genérica porque lê os campos da configuração em vez de escrever um formulário diferente para cada domínio. As permissões são demonstrativas, feitas no frontend: elas organizam a demonstração, não protegem dados de verdade.

Para mudar um rótulo, adicionar um campo ou restringir um perfil, comece por `src/data/modules.js`. Depois confira se `npm test`, `tests/preview_check.py` e `tests/accessibility_check.py` continuam aprovados.

## Capa de apresentação

`divulgacao/instagram/moss-city/gerar_capa.py`, na raiz do worktree, gera PNG e SVG editável com fotos locais e uma captura verdadeira da prévia. A opção `--copy-to` recebe explicitamente a pasta externa de divulgação, evitando confundir o diretório temporário do worktree com a pasta original da MOSS Digital.
