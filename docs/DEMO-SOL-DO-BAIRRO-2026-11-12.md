# Demo Sol do Bairro — 12/11/2026

Terceira demo construída sob as regras do proprietário (ver `demos/AGENTS.md`),
após aprovação explícita na análise da cópia local.

## Identidade

- Visual claro e solar: azul-céu com dourado, formas arredondadas e sombra
  suave. Estrutura diferente da Ponto & Ajuste (editorial clara e serifada) e
  da Chaveiro Express (escura, condensada e industrial).
- Catorze fotografias reais de painéis, instalações, telhados e equipamentos,
  conferidas visualmente, com origem e licença registradas em
  `img/fontes.json`.
- Foto do topo com proporção mais compacta, para o conteúdo inteiro da
  primeira tela caber sem rolagem (ajuste pedido pelo proprietário).

## Simulador de economia

- Roda inteiro no navegador: conta de luz e consumo ajustáveis geram
  painéis sugeridos, área aproximada, geração mensal e economia estimada.
- As premissas do cálculo aparecem na tela e são editáveis em `site.js`
  (`KWH_POR_PAINEL`, `COMPENSACAO_MIN`, `COMPENSACAO_MAX`).
- A tarifa por kWh é estimada a partir da conta e do consumo informados pelo
  visitante.
- Aviso visível: estimativa para orientação, não é proposta e não garante
  economia. A proposta real depende da análise técnica do telhado.
- Ao pedir proposta, os números da simulação vão junto na mensagem do
  WhatsApp.

## Integração opcional com Supabase

- `supabase/instalacao.sql` cria `sb_servicos`, `sb_responsaveis` e
  `sb_propostas`, com RLS, políticas por função e índices.
- `painel.html` autentica o responsável e permite registrar, filtrar, alterar
  status e excluir propostas. A sessão fica só na memória da aba.
- O site vem com o banco desligado e o catálogo local identificado na
  interface. O formulário público prepara a mensagem e não grava nada.

## Manual do comprador

`MANUAL-DO-CLIENTE.html`: instalação, personalização, publicação, conexão do
Supabase passo a passo, segurança, privacidade, problemas comuns e checklist
final. Inclui um capítulo específico sobre o simulador: como mudar as
constantes, como reescrever as premissas e o alerta de que número
desatualizado cria problema com cliente.

## Capa para o Instagram

`divulgacao/instagram/sol-do-bairro/` com PNG 1080 × 1350, fonte editável e
legenda pronta. Usa captura real da própria demo.

## Verificações

- `tools/test-sol-do-bairro.py`: doze imagens, simulador com cálculo coerente
  entre si, filtros, lightbox com teclado, proposta com a simulação no
  WhatsApp, FAQ, 320–1440 px, painel desativado, API simulada com login
  autorizado e negado, criar/listar/alterar/excluir, chaves privadas
  rejeitadas, sessão não persistida e manual em PDF.
- `tools/test-catalogo-busca.py`: catálogo com 121 cards, busca com
  categorias, zero resultados, limpadores e ordem A–Z.
- Auditoria estática: 209 HTML e 266 arquivos JS sem achados.
- Auditoria de navegador nas páginas alteradas: zero erro JavaScript
  capturado, zero 404 local e zero transbordamento.

## Limites

- O banco foi testado contra respostas simuladas. O proprietário precisa criar
  o projeto Supabase, executar o SQL e conferir as políticas com usuário
  autorizado e não autorizado antes de usar dados reais.
- As fotografias são de banco e ilustram o setor; não representam instalações,
  equipe ou clientes da marca fictícia.
- O simulador é uma estimativa com premissas declaradas. Não garante
  economia e não substitui proposta nem análise técnica.
- A demo não cobra, não agenda, não registra pagamento e não emite contrato.
- Não é garantia de ausência de todo erro em toda situação.
