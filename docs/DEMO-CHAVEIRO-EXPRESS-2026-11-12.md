# Demo Chaveiro Express — 12/11/2026

Segunda demo construída sob as regras do proprietário (ver `demos/AGENTS.md`),
após aprovação explícita na análise da cópia local.

## Identidade

- Visual industrial escuro com âmbar de alta visibilidade, tipografia
  condensada e grade técnica. Estrutura diferente da Ponto & Ajuste
  (editorial clara e serifada): mosaico de fotos, faixa de status, ticker,
  serviços com códigos SV-01 a SV-04, linha do tempo em quatro etapas e
  ficha de chamado no formato de ordem de serviço.
- Doze fotografias reais de chaves, fechaduras e ferramentas, conferidas
  visualmente, com origem e licença registradas em `img/fontes.json`.
- Galeria com filtros Chaves, Fechaduras e Ferramentas, ampliação por
  teclado e contagem anunciada.

## Integração opcional com Supabase

- `supabase/instalacao.sql` cria `ce_servicos`, `ce_responsaveis` e
  `ce_chamados`, com RLS, políticas por função e índices.
- `painel.html` autentica o responsável, permite registrar, filtrar, alterar
  status e excluir chamados. A sessão fica só na memória da aba.
- O site vem com o banco desligado e o catálogo local identificado na interface.
  O formulário público prepara a mensagem do WhatsApp e não grava nada.

## Manual do comprador

`MANUAL-DO-CLIENTE.html`: instalação, personalização de marca, fotos e
WhatsApp, publicação, conexão do Supabase passo a passo, segurança,
privacidade, problemas comuns e checklist final.

## Capa para o Instagram

`divulgacao/instagram/chaveiro-express/` com PNG 1080 × 1350, fonte editável
e legenda pronta. Cópia em `E:\MOSS - Divulgacao\Instagram - Chaveiro Express`.

## Verificações

- `tools/test-chaveiro-express.py`: doze fotos, âncoras, filtros, lightbox
  com teclado, validação do chamado, mensagem de WhatsApp sem envio, FAQ,
  320–1440 px, painel desativado, API simulada com login autorizado e
  negado, criar/listar/alterar/excluir, chaves privadas rejeitadas, sessão
  não persistida e manual em PDF.
- `tools/test-catalogo-busca.py`: busca com categorias, zero resultados,
  limpadores e ordem A–Z, com o catálogo em 120 cards.
- Auditoria estática: 200 HTML e 262 arquivos JS sem achados.
- Auditoria de navegador nas páginas alteradas: zero erro JavaScript
  capturado, zero 404 local e zero transbordamento.

## Limites

- O banco foi testado contra respostas simuladas. O proprietário precisa criar
  o projeto Supabase, executar o SQL e conferir as políticas com usuário
  autorizado e não autorizado antes de usar dados reais.
- As fotografias são de banco e ilustram o serviço; não representam equipe,
  veículo, atendimento ou clientes da marca fictícia.
- A demo não cobra, não agenda, não registra pagamento e não garante prazo
  ou preço. A faixa de 24h é elemento visual do modelo e deve ser ajustada
  ao que o negócio realmente oferece.
- Não é garantia de ausência de todo erro em toda situação.
