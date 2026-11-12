# Demo Ponto & Ajuste + busca no catálogo — 12/11/2026

## O que foi entregue

- Nova demonstração `demos/ponto-ajuste/`: ateliê de costura com identidade
  editorial própria, sem reaproveitar a composição de outras demos.
- Integração opcional com Supabase: consulta de catálogo e painel restrito
  para o responsável registrar pedidos recebidos pelo WhatsApp.
- Manual do comprador (`MANUAL-DO-CLIENTE.html`) com instalação, publicação,
  segurança e passo a passo do banco.
- Capa para Instagram (1080 × 1350) com fonte editável e legenda.
- Busca no catálogo de Modelos de Sites, combinada com as categorias.

## Regras do proprietário aplicadas às próximas demos

Registradas em `demos/AGENTS.md`: uma demo por vez com aprovação antes de
publicar, identidade e layout próprios, mínimo de seis fotos reais conferidas
com fonte e licença, todos os botões funcionando com resultado honesto, card
com imagem própria, explicação clara de banco de dados quando houver, manual
do comprador e registro de novas preferências durante o trabalho.

## Busca do catálogo

- `assets/js/catalogo-busca.js` é o ponto único de verdade: categoria + texto.
- Ignora acentos e maiúsculas: “clinica” encontra “Clínica”.
- Casa por título, descrição e categoria; destaca a ocorrência no título.
- Sem resultado: aviso claro, contagem por `aria-live` e botão para limpar.
- Limpar com o X, com Esc ou pelo botão “Limpar busca e mostrar todos”.
- A ordem A–Z continua valendo com a busca ativa.
- Espera de digitação dispensada: a resposta é local e imediata.

## Verificações

Dados fictícios e API simulada. Não comprova RLS nem cobrança reais.

- `tools/test-ponto-ajuste.py`: oito fotos, âncoras, menu, filtros, lightbox
  com teclado, formulário e WhatsApp sem envio, reset, 320–1440 px, painel
  desativado, login autorizado e negado, criar/listar/alterar/excluir, chaves
  privadas rejeitadas, sessão não persistida e manual em PDF.
- `tools/test-catalogo-busca.py`: busca por título e descrição, destaque,
  categoria combinada, zero resultados com reinício, limpadores, ordem A–Z,
  320/390/768 px e rótulos acessíveis.
- Auditoria estática: 195 HTML e 258 arquivos JS sem achados.
- Auditoria de navegador: 222 páginas/presets, zero erro JavaScript capturado
  e zero imagem carregada quebrada. Catálogo com 119 cards, A–Z confirmado.
- Os 16 avisos de largura são os arquivos-fonte das capas Instagram (1080 ×
  1350), de tamanho fixo, como já documentado na rodada anterior.

## Limites

- O banco foi testado contra respostas simuladas. O proprietário precisa criar
  o projeto Supabase, executar `supabase/instalacao.sql` e conferir as
  políticas com usuário autorizado e não autorizado antes de usar dados reais.
- As fotografias são de banco, ilustrativas de costura, e não representam
  trabalhos, equipe ou instalações da marca fictícia.
- A demo não processa pagamentos, não agenda serviços e não envia mensagens.
- Não é garantia de ausência de todo erro em toda situação.
