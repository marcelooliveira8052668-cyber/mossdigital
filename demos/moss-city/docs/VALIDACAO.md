# Validação — módulos de gestão Urban Command

## Escopo testado

Esta verificação cobre a ampliação da **Etapa 3**: cadastros de obras, mobilidade, meio ambiente, equipamentos públicos, atendimento administrativo, despesas fictícias e relatórios, além das telas aprovadas na Etapa 2 (entrada, comando, mapa e portal).

| Verificação | Resultado |
| --- | --- |
| `npm run build` | Aprovado, com assets relativos e telas carregadas sob demanda |
| `npm test` | 28 testes aprovados: dados, indicadores, filtros, protocolo, validação, permissões, escopo, migração de esquema, coordenadas variadas e persistência isolada |
| Tema dia/noite | Botão no cabeçalho e na entrada; classe `theme-day` aplicada, chave `moss-city:theme:v1` gravada e escolha preservada após recarregar |
| Entrada | Fotografia carregada, seleção de perfil e navegação funcional |
| Comando | Indicadores coerentes com os registros, seleção de camada, gráficos dinâmicos, atalhos por perfil (7 para o administrador) e linha do tempo do ponto |
| Detalhe do ponto | Prazo demonstrativo de obras, linha/intervalo/extensão de mobilidade, área ambiental e histórico de etapas exibidos em texto |
| Mapa | 18 pontos, categorias, pesquisa, lista, seleção, zoom, enquadramento e contornos fictícios |
| Troca OSM | Camada e atribuição verificadas usando tiles substituídos localmente |
| CSV | Download da seleção territorial atual e dos módulos administrativos |
| Portal | Protocolo fictício criado, consultável e persistido após recarregar |
| Cadastros | Criação, edição e exclusão confirmada de obras, com validação de prazo, situação e percentual exibida em texto |
| Triagem | Atendimento administrativo com filtros, novo protocolo gerado e exclusão sem reaproveitar códigos |
| Relatórios | Seis tabelas de situação, janela de 3/6/12 meses e exportação CSV da janela atual |
| Perfis | Quatro experiências navegáveis; cidadão redirecionado ao tentar abrir o comando; gestor de obras sem módulo financeiro e com escopo restrito de categorias |
| Recuperação | Armazenamento inválido produz mensagem e mantém a aplicação utilizável |
| Restauração | Recria os exemplos após confirmação e preserva chave de outra demo |
| Fotografias | Fotografias reais renderizadas; alternativa de falha verificada com arquivos bloqueados |
| Responsividade | Comando verificado em 320, 390, 768 e 1024 px; cadastro sem estouro horizontal em 390 px; capturas desktop e celular |
| Acessibilidade automatizada | Nenhuma violação WCAG A/AA detectada nos dezenove cenários da auditoria (doze no modo noturno e sete no modo dia) |
| Subdiretório | Testes executados no build em `http://127.0.0.1:8797/dist/` |
| Rede | Sem conexões externas inesperadas; tiles de teste interceptados, sem varredura do OSM |

Scripts reproduzíveis: `tests/domain.test.js`, `tests/preview_check.py`, `tests/accessibility_check.py`.

O build emite avisos da biblioteca React Router sobre diretivas `use client` ignoradas pelo Vite. A compilação termina com sucesso; arquivos da biblioteca não foram alterados. Nenhum pacote gerado ultrapassou o limite de aviso de 500 kB nesta versão.

## Evidências visuais

- `screenshots/entrada-desktop.png`
- `screenshots/entrada-dia-desktop.png`
- `screenshots/entrada-mobile.png`
- `screenshots/comando-desktop.png`
- `screenshots/comando-dia-desktop.png`
- `screenshots/comando-mobile.png`
- `screenshots/mapa-desktop.png`
- `screenshots/mapa-dia-desktop.png`
- `screenshots/mapa-mobile.png`
- `screenshots/portal-desktop.png`
- `screenshots/obras-desktop.png`
- `screenshots/obras-mobile.png`
- `screenshots/relatorios-desktop.png`
- `screenshots/fotografias.jpg`
- `accessibility-results.json`

As capturas de celular e do portal podem conter o protocolo fictício criado pela automação. A restauração retorna ao cenário inicial. Os dados salvos por uma versão anterior da demo são completados automaticamente (`schemaVersion` 2) sem apagar protocolos já criados.

## Limites e próximos testes

- Auditoria automatizada não é certificação WCAG nem substitui revisão com leitor de tela e pessoas usuárias.
- Responsividade foi verificada no Chrome em dimensões simuladas, não em uma frota de aparelhos físicos.
- Safari e Firefox ainda não foram testados nesta entrega.
- A disponibilidade do provedor real OSM não é validada por esses testes; eles usam imagens locais e respeitam sua política de não varredura.
- As permissões são demonstrativas no frontend; os dados locais podem ser inspecionados pelo visitante.
- Não há backend, sincronização entre usuários nem protocolo transacional entre abas.
- A persistência não foi apresentada como um envio real de atendimento municipal.

## Preservação e publicação

Branch independente: `feat/moss-city`. A revisão do Git mostrou somente arquivos novos em `demos/moss-city/` e `divulgacao/instagram/moss-city/`. Nenhum arquivo rastreado anterior foi modificado, removido ou adicionado ao stage.

O site, as outras demos, o catálogo, os logotipos e as configurações globais permanecem intactos. Nenhum commit, push, merge, postagem ou publicação foi executado para a MOSS CITY. A cópia da capa foi criada apenas na subpasta específica `04 - Divulgacao/MOSS CITY/`, conforme a instrução de entrega.
