# Revisão técnica, catálogos e fotografias — 12/11/2026

Publicação autorizada pelo proprietário durante o atendimento. O livro completo,
os pedidos de clientes e a ferramenta particular de finalização **não** fazem
parte da publicação pública.

## Correções

- Catálogos de modelos e sistemas em A–Z pelo título, com comparação em português
  e sem deixar emojis determinarem a posição. Filtros e URLs foram preservados.
- A MOSS Distribuidora agora participa do filtro Comércio.
- 132 capas de destinos únicos capturadas das próprias demonstrações: cobertura
  dos 118 cartões de modelos e 15 de sistemas (há um destino compartilhado).
  O botão de ampliar a prévia nos sistemas acompanha a nova captura.
- Fotos de banco substituídas por capturas no catálogo, evitando anunciar um
  visual que não corresponde ao site aberto. Fontes das imagens internas continuam
  distintas das capturas de interface.
- 55 fotografias reais selecionadas por assunto e conferidas visualmente,
  aplicadas em 77 posições compatíveis. Origem e licença Pexels registradas em
  `assets/img/fotos-revisadas/fontes.html` e `fontes.json`.
- Fotos não são apresentadas como produtos, equipes ou clientes das marcas
  fictícias. Produtos fictícios e posições sem fotografia específica validada
  podem continuar usando ilustrações; não foram preenchidos com fotos aleatórias.
- Relógios não recebem automaticamente fotografias cuja licença e correspondência
  ao modelo estejam pendentes. Os arquivos anteriores foram preservados.
- Conflito de merge e raiz React duplicada corrigidos na MOSS CONDO.
- Inicialização do NF Control movida para depois das constantes complementares.
  Recuperação do espelho ocorre antes de salvar listas vazias.
- Rotas antigas MOSS Burger e Solar Prime encaminham às demonstrações existentes,
  sem tentar executar JSX diretamente no GitHub Pages ou exibir página vazia.
- Links antigos de duas páginas auxiliares de demos atualizados.
- Links do guia de estrutura e de entrada do EducaEnem corrigidos.
- Demo PetLove: imagens ausentes, contatos não autorizados, seletor `#` inválido,
  visual móvel, identificação fictícia, rótulos e simulação do formulário corrigidos.
  Não confirma agendamento real nem envia o formulário por navegação GET.
- Grid da Casa do Queijo pode encolher a imagem sem transbordar no celular.
- Camada de dados não afirma recebimento quando só há cópia local ou resposta
  opaca de rede; falha de armazenamento não é tratada como sucesso.
- Cópia de configuração do painel mantém o provedor padrão.
- Amostra pública do livro regenerada após as correções identificadas no módulo 1.

## Ferramentas de verificação

- `python tools/audit-site.py`: referências estáticas, IDs, títulos e sintaxe JS.
- `python tools/audit-browser.py`: abertura de páginas/presets, erros de execução,
  imagens carregadas, layout em 1366 e 390 px, ordenação e filtros do catálogo.
- `node tools/test-data-layer.cjs`: sete cenários de envio com rede simulada.
- `node tools/test-portfolio-arquivos.cjs`: pedidos, prévia marcada, final sem marca,
  três modelos, importação local e larguras de 320/390 px.
- `python tools/capture-catalogos.py`: geração reproduzível das capturas; aceita
  trechos de URL como argumentos para atualizar apenas determinados destinos.
- `python tools/download-fotos-revisadas.py`: baixa somente fotos explicitamente
  selecionadas; protege fotos desconhecidas contra sobrescrita.

## Limites da revisão

### Resultado da rodada automatizada

- 189 documentos HTML e 249 arquivos JS: sem referência estática ausente,
  ID duplicado, título ausente aplicável ou erro de sintaxe detectado.
- 216 páginas/presets abertos no navegador: zero erro JavaScript capturado
  e zero imagem carregada visível quebrada na rodada.
- Capas aplicadas a 118/118 cartões de modelos e 15/15 de sistemas.
  Ordenação A–Z e filtro Comércio conferidos no navegador.
- Sem transbordamento horizontal nas páginas públicas testadas a 390/1366 px.
  Os 15 avisos restantes de largura são os arquivos editoriais de capas Instagram.
- Relatório bruto registra 115 respostas 404 de candidatos de fotografia opcional,
  mantidos com ilustrações de reserva; isso não foi omitido como se todas as
  fotografias possíveis estivessem disponíveis.

Não é uma garantia de inexistência de todo erro. A varredura automatizada não
substitui revisão humana integral de conteúdo, auditoria de segurança completa,
teste com leitores de tela nem homologação comercial de cada sistema.

Não foram enviados pedidos, e-mails ou pagamentos reais durante os testes.
Contas, bancos, APIs, emissão fiscal e autenticação externa não foram homologados.
Não houve publicação em outros repositórios que hospedam algumas demos externas.

Arquivos HTML de divulgação do Instagram são fontes editoriais fixas de
1080 × 1350, não páginas responsivas de atendimento. Não devem ser deformados
para eliminar os avisos de largura da ferramenta.

Algumas demos testam fotografias opcionais com uma imagem temporária e mantêm
o SVG quando a foto ainda não existe. O relatório bruto do navegador pode registrar
404 desses candidatos. Isso deve ser distinguido de uma imagem visível quebrada;
não significa que todas as posições passaram a ter fotografia real.

O livro recebeu correções pontuais e testes técnicos em seus 15 módulos, com
originais preservados e novo PDF/ZIP privados. Não houve certificação pedagógica
humana de todas as 425 páginas. O manual particular de entrega registra o limite.
