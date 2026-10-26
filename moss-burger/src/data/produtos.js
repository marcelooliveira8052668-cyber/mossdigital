// Estou centralizando TODOS os dados do cardápio num arquivo só.
// Motivo profissional: quando o cliente quiser mudar um preço,
// ele (ou você) mexe apenas aqui — nunca dentro dos componentes.
// É o princípio "dados separados da apresentação".

export const categorias = [
  { id: 'lanches',  nome: 'Lanches',  emoji: '🍔' },
  { id: 'porcoes',  nome: 'Porções',  emoji: '🍟' },
  { id: 'bebidas',  nome: 'Bebidas',  emoji: '🥤' },
]

export const produtos = [
  // ---------- LANCHES ----------
  {
    id: 1,
    nome: 'MOSS Clássico',
    categoria: 'lanches',
    emoji: '🍔',
    descricao: 'Pão brioche, blend 150g, queijo prato, alface crocante e molho da casa',
    preco: 22.9,
    destaque: true,
  },
  {
    id: 2,
    nome: 'MOSS Bacon',
    categoria: 'lanches',
    emoji: '🥓',
    descricao: 'Blend 150g, cheddar cremoso, bacon em fatias generosas',
    preco: 27.9,
    destaque: true,
    maisVendido: true,
  },
  {
    id: 3,
    nome: 'MOSS Duplo',
    categoria: 'lanches',
    emoji: '🍔🍔',
    descricao: 'Dois blends de 150g, dobro de queijo, picles e molho especial',
    preco: 34.9,
    maisVendido: true,
  },
  {
    id: 4,
    nome: 'MOSS Frango Crocante',
    categoria: 'lanches',
    emoji: '🍗',
    descricao: 'Filé de frango empanado na hora, queijo, alface e maionese verde',
    preco: 25.9,
  },
  {
    id: 5,
    nome: 'MOSS Veggie',
    categoria: 'lanches',
    emoji: '🥬',
    descricao: 'Hambúrguer vegetal, queijo, rúcula, tomate e maionese de ervas',
    preco: 26.9,
  },

  // ---------- PORÇÕES ----------
  {
    id: 6,
    nome: 'Batata Frita',
    categoria: 'porcoes',
    emoji: '🍟',
    descricao: 'Porção 300g crocante por fora, macia por dentro',
    preco: 18.9,
    destaque: true,
  },
  {
    id: 7,
    nome: 'Batata Cheddar & Bacon',
    categoria: 'porcoes',
    emoji: '🧀',
    descricao: 'Porção 400g com cheddar cremoso e bacon crocante',
    preco: 29.9,
    maisVendido: true,
  },
  {
    id: 8,
    nome: 'Onion Rings',
    categoria: 'porcoes',
    emoji: '🧅',
    descricao: 'Anéis de cebola empanados — porção com 12 unidades',
    preco: 21.9,
  },
  {
    id: 9,
    nome: 'Calabresa Acebolada',
    categoria: 'porcoes',
    emoji: '🌭',
    descricao: 'Porção 400g suculenta com cebola dourada',
    preco: 26.9,
  },

  // ---------- BEBIDAS ----------
  {
    id: 10,
    nome: 'Coca-Cola Lata 350ml',
    categoria: 'bebidas',
    emoji: '🥤',
    descricao: 'Bem gelada',
    preco: 7.0,
  },
  {
    id: 11,
    nome: 'Guaraná Lata 350ml',
    categoria: 'bebidas',
    emoji: '🥤',
    descricao: 'Bem gelado',
    preco: 6.5,
  },
  {
    id: 12,
    nome: 'Suco Natural 500ml',
    categoria: 'bebidas',
    emoji: '🧃',
    descricao: 'Escolha entre laranja ou maracujá',
    preco: 10.9,
  },
  {
    id: 13,
    nome: 'Água Mineral 500ml',
    categoria: 'bebidas',
    emoji: '💧',
    descricao: 'Com ou sem gás',
    preco: 5.0,
  },
]

export const promocoes = [
  {
    id: 101,
    nome: 'Combo Casal',
    emoji: '💑🍔',
    descricao: '2 MOSS Clássicos + 1 batata 300g + 2 refris lata',
    preco: 59.9,
    precoAntigo: 72.8,
  },
  {
    id: 102,
    nome: 'Combo Família',
    emoji: '👨‍👩‍👧‍👦',
    descricao: '4 lanches à escolha + batata cheddar & bacon + 4 bebidas',
    preco: 119.9,
    precoAntigo: 145.6,
  },
  {
    id: 103,
    nome: 'Terça do Bacon',
    emoji: '🥓🔥',
    descricao: 'Todo terça: MOSS Bacon + batata frita 300g com 25% OFF',
    preco: 34.9,
    precoAntigo: 46.8,
  },
]
