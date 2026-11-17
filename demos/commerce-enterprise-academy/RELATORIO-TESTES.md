# Relatório de testes

## Executados automaticamente ✅

**Comando:** `node tests/smoke.js` — **46 passaram, 0 falharam.**
**Sintaxe:** `node --check` em todos os 30 arquivos `.js` — sem erros.
**Referências:** 38 `src`/`href` do `index.html` — todos os arquivos existem.

Cobertura do smoke test:

- Catálogo com 236 produtos e 17 categorias (inclui vestuário, livros, peças de carro, cama/mesa/banho e cozinha).
- `normalize()` sem acentos; imagens SVG geradas como data URI.
- Renderização das 11 páginas sem lançar exceções.
- Carrinho: vazio, adicionar, quantidade, estoque insuficiente, cupons válido/inválido.
- Total com desconto e frete calculado corretamente.
- Pedido criado, Pix aprovado, pedido marcado como pago.
- Cartão: aprovado, recusado e pendente.
- Avanço pelos 6 estados, rastreio gerado, progresso 100%.
- Cadastro de produto, ajuste de estoque (+/-), histórico de movimentações e alteração de preço.
- Supabase sem configuração degrada para modo demo sem erro.

**Testes no navegador:** abra `tests/index.html` e clique em "Executar testes"
(12 asserções de funções puras e cálculo de desconto; nenhuma chama serviço de pagamento).

## Ainda precisam ser executados manualmente ⏳

Por limitações do ambiente (sem navegador headless disponível), os itens abaixo
devem ser conferidos visualmente no navegador antes da publicação:

- [ ] Celular, tablet e computador (responsividade e menu sem cortes).
- [ ] Navegação por teclado (Tab/Enter/Esc) e foco visível.
- [ ] Alternância de tema claro/escuro.
- [ ] Console do navegador sem erros (`F12` → Console).
- [ ] Recarregar a página com itens no carrinho (persistência).
- [ ] Carrinho vazio, estoque insuficiente e dados inválidos.
- [ ] Fluxo completo: Pix aprovado → rastreamento → entrega.
- [ ] Fluxo completo: cartão recusado e pendente.
- [ ] Painel administrativo: editar preço/estoque, avançar pedido, devolução.
- [ ] Laboratório: reproduzir módulos e clicar nos nós do diagrama.
- [ ] Academy: concluir tarefas e recarregar (progresso local).
- [ ] Falha de conexão opcional com Supabase (deve continuar em modo demo).

> Nenhum teste fictício chama serviços de pagamento reais.
