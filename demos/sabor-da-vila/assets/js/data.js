/* Sabor da Vila — dados do cardápio (29 itens, fotos reais) */
window.SV_CARDAPIO = [
  { id: 'p01', nome: 'Pizza Margherita', cat: 'Pizzas', preco: 59.9, desc: 'Molho de tomate, muçarela de búfala e manjericão fresco.', tags: ['vegetariano'], tempo: '30 min' },
  { id: 'p02', nome: 'Pizza Napolitana', cat: 'Pizzas', preco: 64.9, desc: 'Massa artesanal, tomate italiano, mozzarella e manjericão.', tags: ['clássico'], tempo: '30 min' },
  { id: 'p03', nome: 'Pizza Tomate e Manjericão', cat: 'Pizzas', preco: 62.9, desc: 'Leve, fresca e cheia de sabor. Feita na hora no forno a lenha.', tags: ['vegetariano'], tempo: '30 min' },
  { id: 'p04', nome: 'Pizza Caprese', cat: 'Pizzas', preco: 69.9, desc: 'Mozzarella cremosa, tomate fresco e molho pesto.', tags: ['vegetariano'], tempo: '35 min' },
  { id: 'p05', nome: 'Pizza Margherita Especial', cat: 'Pizzas', preco: 72.9, desc: 'Nossa versão premium com borda recheada e ingredientes selecionados.', tags: ['premium'], tempo: '35 min' },

  { id: 'p06', nome: 'Burger Duplo Cheddar', cat: 'Burgers', preco: 39.9, desc: 'Dois smash burgers, cheddar derretido e pão brioche.', tags: ['mais pedido'], tempo: '20 min' },
  { id: 'p07', nome: 'Burger Clássico', cat: 'Burgers', preco: 32.9, desc: 'Carne grelhada, alface, tomate e nosso molho da casa.', tags: ['clássico'], tempo: '20 min' },
  { id: 'p08', nome: 'Burger da Casa', cat: 'Burgers', preco: 42.9, desc: 'Carne artesanal, queijo, cebola caramelizada e molho especial.', tags: ['premium'], tempo: '25 min' },
  { id: 'p09', nome: 'Burger Smash', cat: 'Burgers', preco: 36.9, desc: 'Carne smash crocante, queijo cheddar e pão tostado.', tags: ['novidade'], tempo: '20 min' },
  { id: 'p10', nome: 'Combo Burger + Fritas', cat: 'Burgers', preco: 45.9, desc: 'Burger da casa com fritas crocantes e refrigerante.', tags: ['combo'], tempo: '25 min' },

  { id: 'p11', nome: 'Salada Caesar', cat: 'Saladas', preco: 29.9, desc: 'Alface romana, parmesão, croutons e molho Caesar.', tags: ['leve'], tempo: '15 min' },
  { id: 'p12', nome: 'Salada da Horta', cat: 'Saladas', preco: 27.9, desc: 'Folhas frescas, vegetais da estação e vinagrete cítrico.', tags: ['vegetariano', 'leve'], tempo: '15 min' },
  { id: 'p13', nome: 'Salada Caesar Especial', cat: 'Saladas', preco: 34.9, desc: 'Caesar com frango grelhado e lascas de parmesão.', tags: ['proteico'], tempo: '18 min' },
  { id: 'p14', nome: 'Salada de Frutos do Mar', cat: 'Saladas', preco: 44.9, desc: 'Camarão, lula e peixe com folhas frescas e limão.', tags: ['premium'], tempo: '20 min' },

  { id: 'p15', nome: 'Spaghetti ao Tomate', cat: 'Massas', preco: 39.9, desc: 'Massa fresca com molho de tomate caseiro e manjericão.', tags: ['vegetariano'], tempo: '25 min' },
  { id: 'p16', nome: 'Spaghetti Bolonhesa', cat: 'Massas', preco: 44.9, desc: 'Molho bolonhesa cozido lentamente com carne e especiarias.', tags: ['clássico'], tempo: '30 min' },
  { id: 'p17', nome: 'Macarrão à Carbonara', cat: 'Massas', preco: 46.9, desc: 'Cremoso, com bacon crocante, gema e parmesão.', tags: ['clássico'], tempo: '25 min' },
  { id: 'p18', nome: 'Massa com Frutos do Mar', cat: 'Massas', preco: 54.9, desc: 'Camarões e lulas em molho branco com toque de alho.', tags: ['premium'], tempo: '30 min' },

  { id: 'p19', nome: 'Bolo de Chocolate', cat: 'Doces', preco: 19.9, desc: 'Fatia generosa de bolo fofinho com cobertura cremosa.', tags: ['clássico'], tempo: '10 min' },
  { id: 'p20', nome: 'Tiramisù da Casa', cat: 'Doces', preco: 24.9, desc: 'Camadas de café, mascarpone e cacau. Nosso queridinho.', tags: ['mais pedido'], tempo: '10 min' },
  { id: 'p21', nome: 'Bolo com Frutas Vermelhas', cat: 'Doces', preco: 26.9, desc: 'Massa de chocolate com frutas vermelhas frescas.', tags: ['premium'], tempo: '10 min' },
  { id: 'p22', nome: 'Brownie com Sorvete', cat: 'Doces', preco: 22.9, desc: 'Brownie quentinho com sorvete de creme e calda de chocolate.', tags: ['novidade'], tempo: '12 min' },

  { id: 'p23', nome: 'Cappuccino Artesanal', cat: 'Bebidas', preco: 14.9, desc: 'Espresso cremoso com leite vaporizado e arte na espuma.', tags: ['café'], tempo: '8 min' },
  { id: 'p24', nome: 'Latte Latte Art', cat: 'Bebidas', preco: 15.9, desc: 'Café suave com leite e desenho feito à mão.', tags: ['café'], tempo: '8 min' },
  { id: 'p25', nome: 'Cappuccino Especial', cat: 'Bebidas', preco: 16.9, desc: 'Nosso blend exclusivo com espuma densa e canela.', tags: ['café'], tempo: '8 min' },
  { id: 'p26', nome: 'Café com Leite da Casa', cat: 'Bebidas', preco: 13.9, desc: 'Café coado na hora com leite cremoso.', tags: ['café'], tempo: '6 min' },

  { id: 'p27', nome: 'Combinado Sushi 20 peças', cat: 'Sushi', preco: 74.9, desc: 'Seleção de niguiris, maki rolls e sashimis fresquinhos.', tags: ['premium'], tempo: '30 min' },
  { id: 'p28', nome: 'Sushi Variado', cat: 'Sushi', preco: 69.9, desc: 'Combinação equilibrada de peças clássicas e especiais.', tags: ['mais pedido'], tempo: '30 min' },
  { id: 'p29', nome: 'Combinado Especial 30 peças', cat: 'Sushi', preco: 89.9, desc: 'Para dividir: 30 peças selecionadas pelo nosso chef.', tags: ['premium'], tempo: '35 min' },
];
