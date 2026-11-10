// Funções de carrinho: o armazenamento local não equivale a um pedido confirmado.
const CHAVE_CARRINHO = 'chronos-prime-carrinho-v1';
// Recupera apenas IDs válidos e quantidades inteiras positivas.
function carregarCarrinho(){try{const dados=JSON.parse(localStorage.getItem(CHAVE_CARRINHO)||'{}');const seguro={};for(const [id,qtd] of Object.entries(dados)){if(PRODUTOS.some(p=>p.id===Number(id))&&Number.isInteger(qtd)&&qtd>0&&qtd<=99)seguro[id]=qtd;}return seguro;}catch{return {};}}
// Estado do carrinho usado na interface.
let carrinho=carregarCarrinho();
// Persiste as mudanças no dispositivo atual.
function salvarCarrinho(){try{localStorage.setItem(CHAVE_CARRINHO,JSON.stringify(carrinho));}catch{console.warn('Armazenamento local indisponível.');}atualizarCarrinho();}
// Acrescenta uma unidade de um produto conhecido.
function adicionarProduto(id){if(!PRODUTOS.some(p=>p.id===id))return;carrinho[id]=Math.min(99,(carrinho[id]||0)+1);salvarCarrinho();}
// Ajusta quantidade e remove o produto quando chegar a zero.
function alterarQuantidade(id,diferenca){const atual=carrinho[id]||0;const proximo=Math.min(99,atual+diferenca);if(proximo<=0)delete carrinho[id];else carrinho[id]=proximo;salvarCarrinho();}
// Formata valores em moeda brasileira.
const moeda=valor=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(valor);
