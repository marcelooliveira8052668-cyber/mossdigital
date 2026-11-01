# Brasa & Oliva — Restaurante 360

## Natureza da entrega

Protótipo funcional local para restaurante com à la carte, buffet por peso e rodízio. Não é um sistema homologado nem está pronto para operar um estabelecimento real apenas trocando o logotipo. A vitrine e o painel são exemplos independentes com identidade fictícia.

## Como abrir

- `index.html`: site do restaurante, cardápio e apresentação.
- `painel.html`: operação integrada da demonstração.
- Abra os HTMLs no navegador ou execute `python -m http.server 8080` nesta pasta e acesse http://localhost:8080/.
- Não é necessário instalar bibliotecas para usar o site. JavaScript é necessário para o painel e os filtros.
- `assets/engine.js`: regras isoladas e cálculos financeiros em centavos.
- `assets/panel.js` e `assets/panel.css`: módulos e interface operacional.
- `assets/site.js` e `assets/site.css`: comportamento e identidade da vitrine.
- `assets/mesa.svg`: ilustração gastronômica original, sem fotos de terceiros.
- `privacidade.html`: armazenamento, termos de demonstração e limitações.

## O que funciona na demonstração

1. Mapa de 16 mesas, capacidades e comandas abertas; duas mesas começam com exemplos.
2. Conta mista com à la carte, buffet e rodízio na mesma mesa.
3. Buffet: peso bruto e tara em gramas, peso líquido e preço por kg. Sem conexão a balança.
4. Rodízio adulto/infantil por pessoa, limitado ao número de pessoas da mesa. Idades e regras comerciais reais ainda precisam ser definidas.
5. Pedidos em rascunho, observações e envio local à cozinha ou ao bar.
6. Estoque conferido atomicamente antes do envio: uma falta impede o envio inteiro; uma mesma linha não é baixada duas vezes.
7. Painéis com aguardando, preparando, pronto e entregue. Não há impressão ou sincronização entre aparelhos.
8. Cancelamentos com motivo e sem retorno automático de consumo ao estoque.
9. Serviço opcional, desconto justificado pelo perfil Gerente e recebimentos parciais simulados.
10. Cálculos em centavos, divisão com diferença de arredondamento e troco apenas para dinheiro.
11. Bloqueio de alterações após o primeiro recebimento; sem estorno nesta versão.
12. Encerramento somente com itens entregues e saldo quitado. A mesa é então liberada.
13. Reservas locais com capacidade e conflito de horário; fila de espera e acomodação.
14. Pedidos de entrega/retirada com taxa fictícia e etapas locais de expedição.
15. Estoque em g/ml/un, ficha técnica de referência, compras, ajustes e perdas manuais.
16. Turno com fundo, sangria, suprimento, saldo teórico, contagem e diferença justificada. Fechamento exige encerrar/cancelar todas as comandas.
17. Relatórios de vendas encerradas, recebimentos, mix bruto, ticket médio, CSV e histórico local de até 500 eventos.
18. Perfis demonstrativos Gerente, Garçom, Cozinha, Bar e Caixa; não são autenticação ou proteção real.
19. Sessão temporária por padrão; armazenamento local opcional, exclusão específica, backup JSON para conferência e reinício da demo.

## Limites importantes

- Não há backend, servidor de pedidos, banco de dados central ou sincronização multiusuário.
- Não há senha, login autenticado, permissão no servidor ou log imutável.
- Pix e cartão são anotações simuladas: não há provedor, transação, conciliação, antifraude ou estorno.
- A conferência não é documento fiscal nem comprovante de pagamento. Não emite NFC-e/NF-e e não integra SEFAZ.
- Não há integração com iFood, WhatsApp API, entregadores, impressoras, gaveta de caixa ou balança.
- A seleção de perfil é aberta para qualquer visitante. Não use dados reais.
- localStorage não é backup nem isolamento entre usuários; outra aba pode ter uma cópia desatualizada. Não use várias abas como terminais de operação.
- O backup JSON pode ser baixado para conferência técnica; não há importação/restauração pelo painel.
- A vitrine tem cardápio de exemplo estático. Alterações de configuração no painel não editam automaticamente o HTML público.
- Buffet e rodízio usam consumo estimado de insumos. Não há avaliação de rendimento, porcionamento individual, alergênicos ou qualidade nutricional.
- O sistema não identifica individualmente cada pessoa da mesa; o limite de rodízio considera somente a soma das pessoas.
- Não há DRE, lucro líquido, compras fiscais, cálculo tributário, conciliação bancária ou gestão de pessoas/RH.
- Reservas não são comunicadas e não bloqueiam uma agenda central real.
- Não declarar conformidade jurídica, fiscal ou WCAG sem auditoria específica.

## Dados que o restaurante precisa fornecer

Nome, razão social e identificação aplicável; marca, logotipo e domínio; fotos autorizadas; contatos; endereços e horários; áreas e capacidade de mesas; modalidades e regras; preços por item, kg e pessoa; faixa etária infantil; serviço opcional e descontos autorizados; ingredientes, alergênicos, receitas e rendimentos verificados; fornecedores; estoque e unidades; políticas de reservas, entrega, cancelamento e privacidade; processos de atendimento e responsáveis.

Não solicite dados pessoais desnecessários nem compartilhe senhas em arquivos do site.

## Checklist para uma operação real

- [ ] Levantar volume de mesas, terminais simultâneos, pedidos e horários críticos.
- [ ] Definir arquitetura de servidor, banco de dados transacional, disponibilidade e recuperação de desastres.
- [ ] Implementar login, autorização no servidor, trilha de auditoria protegida e segregação de funções.
- [ ] Garantir idempotência, concorrência, locks de conta e estoque, reconciliação e prevenção de dupla cobrança.
- [ ] Integrar pedidos e KDS com sincronização, confirmação de recebimento e recuperação de falhas.
- [ ] Contratar e integrar pagamentos e fluxo de estorno por provedor autorizado.
- [ ] Validar emissão fiscal e obrigações com contador e fornecedor especializado, conforme local e regime.
- [ ] Homologar impressoras, balanças e equipamentos; não assumir compatibilidade.
- [ ] Definir integração de delivery e contratos próprios, quando necessária.
- [ ] Validar serviço opcional, descontos, cancelamentos, regras comerciais e políticas com o responsável real.
- [ ] Definir governança de dados, base legal, retenção, segurança e direitos conforme a LGPD.
- [ ] Configurar backups com restauração testada, monitoramento e suporte em horário de operação.
- [ ] Realizar testes de carga, quedas de internet, retomada, pagamentos duplicados e divergências de caixa.
- [ ] Auditar acessibilidade, navegação por teclado, contraste e uso em tablets/telas da cozinha.
- [ ] Aprovar conteúdo da vitrine e configurar domínio, HTTPS, canonical e dados estruturados verdadeiros. Remover noindex somente no site real aprovado; painel operacional não deve ser indexado.
- [ ] Treinar gerente, caixa, cozinha e garçons; operar em homologação antes de substituir o sistema atual.

## Condição comercial sugerida

Venda a personalização da vitrine e o protótipo como escopos separados da implantação operacional. Banco de dados, integrações, homologação, suporte, hospedagem e manutenção precisam de escopo, contrato e orçamento próprios. Não prometa que esta demonstração sozinha substitui o sistema de um grande restaurante.
