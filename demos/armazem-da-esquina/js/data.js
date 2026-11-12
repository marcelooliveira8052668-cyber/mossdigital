/* Catalogo ficticio do ARMAZEM DA ESQUINA: itens, categorias e configuracoes. */
'use strict';
window.ARMAZEM = (() => { // Um unico lugar para personalizar a demo.
  const config = { // Identidade e contatos.
    nome: 'ARMAZÉM DA ESQUINA', // Marca ficticia da demo.
    slogan: 'O bairro entrega. Você escolhe.', // Frase de apoio.
    whatsapp: '', // Numero autorizado do comerciante: vazio mantem o envio desativado.
    email: '', // E-mail verdadeiro do comerciante, a ser configurado.
    endereco: 'Endereço e horário de funcionamento ilustrativos. Nenhum comércio real é representado.', // Sem endereço inventado.
    entrega: { taxa: 'Taxa de entrega calculada pelo comerciante.', prazo: 'Entrega ilustrativa no mesmo dia, sujeita à confirmação.', retirada: 'Retirada na loja a combinar.', raio: 'Bairro do entorno, conforme disponibilidade.' }, // Regras honestas e genericas.
    storagePrefix: 'armazem-da-esquina-demo-v1:' // Prefixo exclusivo desta demo no navegador.
  };
  const categorias = [ // Seis prateleiras do mercadinho.
    { id:'padaria', nome:'Padaria', icone:'🥖', descricao:'Forno de verdade, do pão ao bolo.' },
    { id:'hortifruti', nome:'Hortifruti', icone:'🍎', descricao:'Fruta, verdura e o que veio da roça hoje.' },
    { id:'mercearia', nome:'Mercearia', icone:'🛒', descricao:'O armário sempre cheio, sem falta de nada.' },
    { id:'laticinios', nome:'Laticínios', icone:'🥛', descricao:'Leite, queijo e iogurte fresquinhos.' },
    { id:'bebidas', nome:'Bebidas', icone:'🧃', descricao:'Geladas para a mesa e para a rua.' },
    { id:'limpeza', nome:'Limpeza', icone:'🧼', descricao:'Casa limpa começa no carrinho.' }
  ];
  const unidades = { kg:'kg', un:'un', pct:'pct', gar:'garrafa', cx:'caixa' }; // Como o item é vendido.
  const produtos = [ // Vinte e quatro itens ficticios, com foto de referencia licensed.
    { id:'pao-frances', nome:'Pão francês', categoria:'padaria', preco:8.50, precoOriginal:9.90, unidade:'un', unidadeTexto:'unidade', estoque:60, top:7, emoji:'🥖', descricao:'Pão francês de forno, crocante por fora e macio por dentro. Assado no dia, como manda a tradição de bairro. Produto fictício, com foto de referência.', destaque:true },
    { id:'croissant', nome:'Croissant folhado', categoria:'padaria', preco:9.00, unidade:'un', unidadeTexto:'unidade', estoque:35, top:10, emoji:'🥐', descricao:'Massa folhada em camadas, assada até dourar. Vem quentinho, se você pedir no mesmo dia. Produto fictício, com foto de referência.', destaque:true },
    { id:'bolo-chocolate', nome:'Bolo de chocolate', categoria:'padaria', preco:42.00, precoOriginal:49.90, unidade:'un', unidadeTexto:'torta', estoque:8, top:0, emoji:'🍫', descricao:'Bolo de chocolate com cobertura generosa, feito em pequenos lotes. Serve de 8 a 10 pessoas. Produto fictício, com foto de referência.', oferta:true },
    { id:'bisnaguinha', nome:'Bisnaguinha com manteiga', categoria:'padaria', preco:6.50, pacote:1, unidade:'pct', unidadeTexto:'pacote com 6', estoque:70, top:0, emoji:'🍪', descricao:'Biscoito amanteigado, sequinho e douradinho. Combina com café da tarde. Produto fictício, com foto de referência.' },
    { id:'banana-prata', nome:'Banana prata', categoria:'hortifruti', preco:6.90, unidade:'kg', unidadeTexto:'quilo', estoque:120, top:1, emoji:'🍌', descricao:'Banana prata madura na medida, colhida na semana. Vem com o cacho inteiro ou a unidade que você quiser. Produto fictício, com foto de referência.', destaque:true },
    { id:'tomate-italiano', nome:'Tomate italiano', categoria:'hortifruti', preco:12.90, unidade:'kg', unidadeTexto:'quilo', estoque:90, top:3, emoji:'🍅', descricao:'Tomate italiano firme e perfumado, bom para molho, salada ou fatiado no pão. Produto fictício, com foto de referência.' },
    { id:'maca-gala', nome:'Maçã gala', categoria:'hortifruti', preco:9.80, unidade:'kg', unidadeTexto:'quilo', estoque:95, top:0, emoji:'🍎', descricao:'Maçã gala crocante, acidez na medida e boa para lanche ou salada. Produto fictício, com foto de referência.' },
    { id:'alface-crespa', nome:'Alface crespa', categoria:'hortifruti', preco:4.50, unidade:'un', unidadeTexto:'unidade', estoque:48, top:0, emoji:'🥬', descricao:'Alface crespa lavada e crocante, embalada para durar a semana na geladeira. Produto fictício, com foto de referência.' },
    { id:'batata-inglesa', nome:'Batata inglesa', categoria:'hortifruti', preco:7.90, unidade:'kg', unidadeTexto:'quilo', estoque:140, top:0, emoji:'🥔', descricao:'Batata inglesa firme, ótima para cozimento ou assar. Produto fictício, com foto de referência.' },
    { id:'laranja-largo', nome:'Laranja do largo', categoria:'hortifruti', preco:5.90, unidade:'kg', unidadeTexto:'quilo', estoque:110, top:0, emoji:'🍊', descricao:'Laranja doce e suculenta, colhida na semana. Perfeita para suco, sobremesa ou comer com a casca. Produto fictício, com foto de referência.' },
    { id:'arroz-agulha', nome:'Arroz agulha tipo 1', categoria:'mercearia', preco:7.99, unidade:'pct', unidadeTexto:'pacote de 5 kg', estoque:80, top:2, emoji:'🍚', descricao:'Arroz agulha tipo 1, soltinho e cheiroso. Pacote de 5 kg para a família inteira. Produto fictício, com foto de referência.', destaque:true },
    { id:'feijao-carioca', nome:'Feijão carioca', categoria:'mercearia', preco:9.50, unidade:'pct', unidadeTexto:'pacote de 1 kg', estoque:75, top:0, emoji:'🫘', descricao:'Feijão carioca selecionado, de cocção rápida e sempre no ponto. Produto fictício, com foto de referência.' },
    { id:'macarrao-parafuso', nome:'Macarrão parafuso', categoria:'mercearia', preco:5.20, unidade:'pct', unidadeTexto:'pacote de 500 g', estoque:100, top:0, emoji:'🍝', descricao:'Macarrão parafuso que segura o molho e rende bem. Produto fictício, com foto de referência.' },
    { id:'azeite-oliva', nome:'Azeite de oliva extravirgem', categoria:'mercearia', preco:29.90, precoOriginal:34.90, unidade:'gar', unidadeTexto:'garrafa de 500 ml', estoque:24, top:5, emoji:'🫒', descricao:'Azeite de oliva extravirgem, primeira prensagem a frio, ideal para saladas e massas. Produto fictício, com foto de referência.', oferta:true },
    { id:'acucar-cristal', nome:'Açúcar cristal', categoria:'mercearia', preco:4.10, unidade:'kg', unidadeTexto:'quilo', estoque:120, top:0, emoji:'🧂', descricao:'Açúcar cristal refinado, para o café, a receita e a sobremesa. Produto fictício, com foto de referência.' },
    { id:'cafe-torrado', nome:'Café torrado e moído', categoria:'mercearia', preco:18.90, unidade:'pct', unidadeTexto:'pacote de 500 g', estoque:40, top:4, emoji:'☕', descricao:'Café torrado e moído na hora, com aroma de torra média. Produto fictício, com foto de referência.', destaque:true },
    { id:'oleo-soja', nome:'Óleo de soja', categoria:'mercearia', preco:8.90, unidade:'gar', unidadeTexto:'garrafa de 900 ml', estoque:45, top:0, emoji:'🫙', descricao:'Óleo de soja para o dia a dia, em embalagem de 900 ml. Produto fictício, com foto de referência.' },
    { id:'farinha-mandioca', nome:'Farinha de mandioca', categoria:'mercearia', preco:7.40, unidade:'kg', unidadeTexto:'quilo', estoque:55, top:0, emoji:'🥣', descricao:'Farinha de mandioca para a receita da casa: pudim, bolo e pão de queijo. Produto fictício, com foto de referência.' },
    { id:'leite-integral', nome:'Leite integral', categoria:'laticinios', preco:5.49, unidade:'un', unidadeTexto:'litro', estoque:60, top:6, emoji:'🥛', descricao:'Leite integral, de sabor marcante e origem auditada. Produto fictício, com foto de referência.' },
    { id:'ovos-caixa', nome:'Ovos caixinha', categoria:'laticinios', preco:13.90, unidade:'un', unidadeTexto:'cartela com 30 unidades', estoque:42, top:0, emoji:'🥚', descricao:'Ovos caixinha com 30 unidades, selecionados e embalados na própria loja. Produto fictício, com foto de referência.' },
    { id:'iogurte-natural', nome:'Iogurte natural', categoria:'laticinios', preco:6.80, unidade:'un', unidadeTexto:'pote de 170 g', estoque:50, top:0, emoji:'🥣', descricao:'Iogurte natural sem açúcar, cremoso e com sabor de leite de verdade. Produto fictício, com foto de referência.' },
    { id:'agua-mineral', nome:'Água mineral sem gás', categoria:'bebidas', preco:7.90, unidade:'cx', unidadeTexto:'pack de 6 garrafas', estoque:36, top:0, emoji:'💧', descricao:'Água mineral sem gás em garrafas de 500 ml. Produto fictício, com foto de referência.' },
    { id:'suco-uva', nome:'Suco de uva integral', categoria:'bebidas', preco:15.90, unidade:'gar', unidadeTexto:'garrafa de 1 L', estoque:28, top:8, emoji:'🍇', descricao:'Suco de uva integral, sem açúcar adicionado, para o café da manhã ou a sobremesa. Produto fictício, com foto de referência.' },
    { id:'detergente', nome:'Detergente neutro', categoria:'limpeza', preco:2.79, precoOriginal:3.49, unidade:'un', unidadeTexto:'frasco de 500 ml', estoque:90, top:9, emoji:'🧴', descricao:'Detergente neutro para louça, de fragrância suave e bom rendimento. Produto fictício, com foto de referência.', oferta:true }
  ];
  const top10 = () => produtos.filter(p=>p.top>0).sort((a,b)=>a.top-b.top); // Ranking dos mais pedidos.
  const ofertas = () => produtos.filter(p=>p.oferta); // Itens com preço promotional ficticio.
  const destaques = () => produtos.filter(p=>p.destaque); // Recortados na home.
  return { config, categorias, unidades, produtos, top10, ofertas, destaques }; // API de dados, sem backend.
})();
