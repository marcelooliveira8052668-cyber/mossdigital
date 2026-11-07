# Guia didático de personalização

As linhas abaixo estão atualizadas para a revisão com fotografias. Ao adicionar conteúdo, elas podem mudar; procure também pelo nome da variável ou do componente indicado.

Antes de alterar arquivos existentes em uma próxima tarefa, apresente a intenção e obtenha autorização, conforme a regra do projeto.

## Visual e entrada

| Quero modificar | Onde encontrar | Linhas de referência |
| --- | --- | --- |
| Cores de fundo, cobre, marfim e turquesa | `src/styles/condo.css` | 3–10, variáveis `--condo-*` |
| Fontes da interface e dos títulos | `src/styles/condo.css` | 14 e 25, `font-family` |
| Proporção entre texto e fotografia | `src/styles/condo.css` | 75, `.condo-hero` |
| Tamanho do slogan no desktop | `src/styles/condo.css` | 77, `.condo-hero h1` |
| Regras específicas de celular | `src/styles/condo.css` | Bloco `@media (max-width: 600px)` |
| Slogan, descrição, perfis e textos de entrada | `src/pages/Landing.jsx` | 12–47, componente `Landing` |
| Ilustração autoral preservada, fora da apresentação atual | `src/components/Architecture.jsx` | 4–29, componente `Architecture` |

**Exemplo conceitual:** `--condo-copper` é uma variável CSS. Os botões usam `var(--condo-copper)`, então mudar seu valor modifica as regiões que a utilizam, sem procurar cada cor individualmente. Confira o contraste depois de qualquer mudança.

Manrope e DM Sans estão declaradas com alternativas locais; esta versão não baixa fontes de terceiros. Na ausência dessas famílias no dispositivo, a interface usa Segoe UI ou Arial. O itálico editorial utiliza Georgia.

## Navegação e perfis

- `src/App.jsx`, linha **22**, variável `navigation`: rótulos e ícones dos menus.
- `src/App.jsx`, linha **24**, variável `permissions`: módulos disponíveis para cada perfil.
- `src/data/seed.js`, linha **6**, variável `profiles`: nomes visíveis dos perfis.
- `src/pages/Dashboard.jsx`, a partir da linha **18**: resumo específico de cada experiência.

**O que aprender:** uma propriedade React, como `profile`, é um valor enviado de um componente para outro. O painel lê esse valor para escolher a saudação e os indicadores permitidos. Não transforme essa lógica em uma promessa de autenticação real: os dados ainda estão no navegador.

## Cadastros, financeiro, ocorrências e portaria

- `src/data/modules.js`, linhas **4–11**: campos, opções e colunas de todos os módulos.
- `src/pages/Records.jsx`, linha **18**: início do componente que apresenta os registros.
- `src/pages/Records.jsx`, linha **36**, função `save`: valida e grava o cadastro.
- `src/components/RecordDialog.jsx`, a partir da linha **4**: construção dos formulários.

**O que aprender:** `fields` significa “campos”. Cada campo tem uma `key`, seu nome interno, e uma `label`, o rótulo mostrado na tela. Quando há `options`, o formulário cria uma lista de seleção em vez de uma caixa de texto.

O evento `onChange` lê o que foi digitado e atualiza o estado do React. O evento `onSubmit` é disparado ao salvar o formulário, inclusive pelo teclado. O código usa `event.preventDefault()` para evitar o recarregamento padrão do navegador.

## Gráficos

- `src/components/FinanceChart.jsx`, linhas **8–11**: agrupamento mensal e cálculo de receitas e despesas.
- No mesmo arquivo, procure `stroke` para as cores das linhas e `Tooltip` para a caixa de valores.
- `src/pages/Dashboard.jsx`, linhas **22–26**: indicadores calculados com base no mês e no pagamento.

**O que aprender:** `filter` seleciona registros; `reduce` soma os valores selecionados. Os gráficos e o relatório financeiro usam os mesmos registros da aplicação, em vez de uma imagem com números fixos.

## Áreas comuns e calendário

- `src/data/seed.js`, linha **4**, variável `areas`: nomes das cinco áreas.
- `src/pages/Reservations.jsx`, linha **16**: componente do calendário e filtros.
- `src/pages/Reservations.jsx`, linha **35**, função `save`: criação de reservas.
- `src/utils/rules.js`, linha **8**, função `overlaps`: verificação de sobreposição.
- `src/utils/rules.js`, linhas **10–14**, função `reservationError`: mensagens e validações.

**O que aprender:** dois intervalos entram em conflito quando começam antes do término um do outro. O código também compara data e área. Uma reserva encerrada às 12h não impede outra começando às 12h; uma reserva cancelada deixa de bloquear a agenda.

## Dados fictícios e persistência

- `src/data/seed.js`, linha **8**, função `createSeed`: dados iniciais e histórico mensal.
- `src/hooks/useDemo.js`, linha **6**, variável `KEY`: nome exclusivo usado no armazenamento local.
- `src/hooks/useDemo.js`, a partir da linha **8**: carregamento, tratamento de erro, atualização e restauração.

**Importante:** alterar os exemplos do arquivo não substitui automaticamente o que já está salvo no navegador. Depois da alteração autorizada, use **Restaurar demonstração** para carregar o novo conjunto de exemplos.

Não use `localStorage.clear()`: isso poderia apagar informações de outras aplicações no mesmo domínio. A MOSS CONDO grava apenas sua própria chave.

## Fotografias — onde personalizar

| Quero modificar | Arquivo e linhas |
| --- | --- |
| Descrições acessíveis e ponto de enquadramento | `src/data/photos.js`, linhas **4–13**: `alt` e `position` |
| Fotografia de cada área comum | `src/data/photos.js`, linha **18**: `areaPhotos` |
| Fotografia de cada módulo | `src/data/photos.js`, linha **20**: `modulePhotos` |
| Foto principal da entrada | `src/pages/Landing.jsx`, linha **38**: propriedade `image="fachada"` |
| Fotos e mensagens dos três painéis | `src/pages/Dashboard.jsx`, linha **37**: componente `PhotoBanner` |
| Indicação de foto ilustrativa, variantes e tratamento de erro | `src/components/Photo.jsx`, linhas **8–18** |
| Título e descrição sobre a foto | `src/components/PhotoBanner.jsx`, linhas **6–14** |
| Seleção da disponibilidade pelos cartões | `src/pages/Reservations.jsx`, linha **57** |
| Moldura, recorte, banners e galeria | `src/styles/condo.css`, a partir da linha **388**, seletores `.condo-photo`, `.condo-photo-banner` e `.condo-area-gallery` |
| Origem e preparo dos arquivos locais | `tools/prepare_photos.py`, lista `SOURCES` e geração de variantes |

**O que aprender:** `alt` descreve o conteúdo para quem não pode ver a imagem. `object-fit: cover` preenche a moldura sem deformar a foto. `position` informa qual região deve permanecer visível durante o recorte. `srcSet` oferece várias larguras para o navegador escolher a mais adequada.

O carregamento das fotos abaixo da área inicial usa `loading="lazy"`. A foto principal e os banners iniciais usam prioridade para aparecer cedo. O estado `failed`, atualizado pelo evento `onError`, permite exibir uma alternativa se o arquivo não carregar.

Ao trocar uma fotografia, registre a nova origem e sua licença em vez de copiar fotos de sites de condomínios ou clientes. Depois execute `python tools/prepare_photos.py`, gere o build e repita `python tests/photos_check.py`. O preparo acessa os bancos de imagem; a aplicação final utiliza apenas arquivos locais.

Veja também `FOTOGRAFIAS.md` para as condições de uso e o inventário desta versão.

## Capa para Instagram

Na raiz do repositório, o arquivo `divulgacao/instagram/moss-condo/gerar_capa.py` contém explicações em português sobre cada etapa. O SVG gerado permite editar textos e posições sem depender de links externos. O PNG tem 1080 × 1350 pixels.

Depois de modificar a aparência da aplicação, gere capturas novas e repita o gerador. Não divulgue um endereço como publicado enquanto não houver autorização.
