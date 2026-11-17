# Registro de alterações (ANTES / DEPOIS / POR QUÊ)

Este arquivo acompanha o padrão de explicação do código exigido no prompt.
Cada entry mostra o que mudou e por quê, em linguagem acessível.

---

## 1. Pesquisa tolerante a acentos

- **ANTES:** comparação direta `produto.name.includes(termo)` — "fone" não encontrava "Fone" com acento digitado de outra forma.
- **DEPOIS:** `u.normalize(nome).indexOf(u.normalize(termo)) >= 0`.
- **ONDE:** `js/core/utils.js → normalize()` e `js/pages/store.js → apply()`.
- **POR QUÊ:** exigência de pesquisa sem diferença entre letras acentuadas e não acentuadas.
- **TRADUÇÃO:** *normalize* = normalizar; *toLowerCase* = para minúsculas; *trim* = aparar.
- **SÍMBOLOS:** `NFD` decompõe o acento; `[\u0300-\u036f]` é a faixa Unicode dos acentos; `replace(..., '')` remove.
- **RESULTADO:** digitar `FONE`, `fone` ou `fône` retorna o mesmo produto.

## 2. Cálculo do carrinho com cupom

- **ANTES:** soma simples de preços, sem desconto nem arredondamento.
- **DEPOIS:** `getTotals()` centraliza subtotal, desconto percentual, frete e `round2()`.
- **ONDE:** `js/services/cart.service.js → getTotals()`.
- **POR QUÊ:** evitar duplicação de cálculo entre carrinho, checkout e painel, e erros de ponto flutuante.
- **TRADUÇÃO:** *subtotal* = soma parcial; *discount* = desconto; *shipping* = frete; *round* = arredondar.
- **SÍMBOLOS:** `* 10 / 100` converte porcentagem; `Math.round(n*100)/100` limita a 2 casas.
- **RESULTADO:** MOSS10 em R$ 200 gera R$ 20 de desconto; com frete de R$ 20, total R$ 200.

## 3. Pagamentos ficcionais sem cobrança real

- **ANTES:** não existia simulador.
- **DEPOIS:** `payment.service.js` devolve `aprovado | recusado | pendente` e IDs com prefixo `PIX-`/`CARD-`.
- **ONDE:** `js/services/payment.service.js` e `js/pages/checkout.js → stepPayment()`.
- **POR QUÊ:** cumprir a regra fundamental — nenhum dinheiro movimentado.
- **TRADUÇÃO:** *approved* = aprovado; *declined* = recusado; *pending* = pendente; *installments* = parcelas.
- **SÍMBOLOS:** `await` espera a Promise; `===` compara o resultado escolhido.
- **RESULTADO:** trocar o resultado no checkout mostra 3 reações diferentes, todas simuladas.

## 4. Linha do tempo logística

- **ANTES:** status era apenas um texto.
- **DEPOIS:** 6 estados com ícones e cores, avanço manual e rastreio fictício.
- **ONDE:** `js/services/logistics.service.js` e `js/components/ui.js → timeline()`.
- **POR QUÊ:** tornar visível o caminho Pedido recebido → ... → Entregue.
- **TRADUÇÃO:** *tracking* = rastreio; *advance* = avançar; *event* = evento.
- **SÍMBOLOS:** `indexOf(status)` descobre a etapa atual; `concat()` adiciona evento ao histórico.
- **RESULTADO:** cada clique em "Avançar" destaca a próxima etapa e registra data/hora.

## 5. Laboratório Visual do Código

- **ANTES:** não existia visualizeção da execução do código.
- **DEPOIS:** diagrama clicável + código linha a linha + explicação (tradução, símbolos, arquivo, resultado).
- **ONDE:** `js/pages/lab.js` e `js/data/lab-content.js`.
- **POR QUÊ:** prioridade pedagógica — aprender vendo o código funcionar dentro do site.
- **TRADUÇÃO:** *line* = linha; *flow* = fluxo; *simplified* = simplificado.
- **SÍMBOLOS:** `=>` seta de função; `await` pausa; `//` comentário.
- **RESULTADO:** clicar em "Próxima linha" destaca a linha amarela e atualiza a explicação embaixo.

## 6. Tema claro/escuro

- **ANTES:** sem alternância.
- **DEPOIS:** variáveis CSS + `data-theme` persistido.
- **ONDE:** `css/base.css`, `js/core/theme.js`.
- **POR QUÊ:** identidade visual moderna e conforto visual.
- **TRADUÇÃO:** *theme* = tema; *toggle* = alternar.
- **SÍMBOLOS:** `[data-theme="dark"]` é um seletor de atributo; `--variavel` é variável CSS.
- **RESULTADO:** clique no ícone ☾/☀ troca todas as cores sem recarregar.
