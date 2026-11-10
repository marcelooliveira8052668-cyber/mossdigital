// Catálogo demonstrativo: produtos fictícios, imagens ilustrativas e preços de exemplo.
const PRODUTOS = [
  {
    "id": 1,
    "nome": "Clássico Clássico 001",
    "categoria": "Clássicos masculinos",
    "preco": 196.9,
    "imagem": "assets/img/produtos/relogio-001.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design clássico. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#293b4b"
  },
  {
    "id": 2,
    "nome": "Clássico Minimalista 002",
    "categoria": "Clássicos masculinos",
    "preco": 263.9,
    "imagem": "assets/img/produtos/relogio-002.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design minimalista. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#9c6657"
  },
  {
    "id": 3,
    "nome": "Clássico Urbano 003",
    "categoria": "Clássicos masculinos",
    "preco": 330.9,
    "imagem": "assets/img/produtos/relogio-003.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design urbano. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b6b5c"
  },
  {
    "id": 4,
    "nome": "Clássico Elegante 004",
    "categoria": "Clássicos masculinos",
    "preco": 397.9,
    "imagem": "assets/img/produtos/relogio-004.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design elegante. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#7864a4"
  },
  {
    "id": 5,
    "nome": "Clássico Aventura 005",
    "categoria": "Clássicos masculinos",
    "preco": 464.9,
    "imagem": "assets/img/produtos/relogio-005.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design aventura. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#b56c82"
  },
  {
    "id": 6,
    "nome": "Clássico Performance 006",
    "categoria": "Clássicos masculinos",
    "preco": 531.9,
    "imagem": "assets/img/produtos/relogio-006.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design performance. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#425c7a"
  },
  {
    "id": 7,
    "nome": "Clássico Vintage 007",
    "categoria": "Clássicos masculinos",
    "preco": 598.9,
    "imagem": "assets/img/produtos/relogio-007.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design vintage. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#d5a24a"
  },
  {
    "id": 8,
    "nome": "Clássico Contemporâneo 008",
    "categoria": "Clássicos masculinos",
    "preco": 665.9,
    "imagem": "assets/img/produtos/relogio-008.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design contemporâneo. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b4d55"
  },
  {
    "id": 9,
    "nome": "Clássico Premium 009",
    "categoria": "Clássicos masculinos",
    "preco": 732.9,
    "imagem": "assets/img/produtos/relogio-009.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design premium. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#a55c43"
  },
  {
    "id": 10,
    "nome": "Clássico Essential 010",
    "categoria": "Clássicos masculinos",
    "preco": 799.9,
    "imagem": "assets/img/produtos/relogio-010.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design essential. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#bca477"
  },
  {
    "id": 11,
    "nome": "Clássico Clássico 011",
    "categoria": "Clássicos masculinos",
    "preco": 866.9,
    "imagem": "assets/img/produtos/relogio-011.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design clássico. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#293b4b"
  },
  {
    "id": 12,
    "nome": "Clássico Minimalista 012",
    "categoria": "Clássicos masculinos",
    "preco": 933.9,
    "imagem": "assets/img/produtos/relogio-012.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design minimalista. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#9c6657"
  },
  {
    "id": 13,
    "nome": "Clássico Urbano 013",
    "categoria": "Clássicos masculinos",
    "preco": 1000.9,
    "imagem": "assets/img/produtos/relogio-013.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design urbano. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b6b5c"
  },
  {
    "id": 14,
    "nome": "Clássico Elegante 014",
    "categoria": "Clássicos masculinos",
    "preco": 1067.9,
    "imagem": "assets/img/produtos/relogio-014.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design elegante. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#7864a4"
  },
  {
    "id": 15,
    "nome": "Clássico Aventura 015",
    "categoria": "Clássicos masculinos",
    "preco": 1134.9,
    "imagem": "assets/img/produtos/relogio-015.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design aventura. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#b56c82"
  },
  {
    "id": 16,
    "nome": "Clássico Performance 016",
    "categoria": "Clássicos masculinos",
    "preco": 1201.9,
    "imagem": "assets/img/produtos/relogio-016.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design performance. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#425c7a"
  },
  {
    "id": 17,
    "nome": "Clássico Vintage 017",
    "categoria": "Clássicos masculinos",
    "preco": 1268.9,
    "imagem": "assets/img/produtos/relogio-017.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design vintage. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#d5a24a"
  },
  {
    "id": 18,
    "nome": "Clássico Contemporâneo 018",
    "categoria": "Clássicos masculinos",
    "preco": 1335.9,
    "imagem": "assets/img/produtos/relogio-018.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design contemporâneo. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b4d55"
  },
  {
    "id": 19,
    "nome": "Clássico Premium 019",
    "categoria": "Clássicos masculinos",
    "preco": 1402.9,
    "imagem": "assets/img/produtos/relogio-019.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design premium. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#a55c43"
  },
  {
    "id": 20,
    "nome": "Clássico Essential 020",
    "categoria": "Clássicos masculinos",
    "preco": 1469.9,
    "imagem": "assets/img/produtos/relogio-020.svg",
    "descricao": "Modelo demonstrativo da coleção clássicos masculinos, com design essential. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#bca477"
  },
  {
    "id": 21,
    "nome": "Feminino Clássico 021",
    "categoria": "Femininos",
    "preco": 1536.9,
    "imagem": "assets/img/produtos/relogio-021.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design clássico. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#293b4b"
  },
  {
    "id": 22,
    "nome": "Feminino Minimalista 022",
    "categoria": "Femininos",
    "preco": 1603.9,
    "imagem": "assets/img/produtos/relogio-022.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design minimalista. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#9c6657"
  },
  {
    "id": 23,
    "nome": "Feminino Urbano 023",
    "categoria": "Femininos",
    "preco": 1670.9,
    "imagem": "assets/img/produtos/relogio-023.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design urbano. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b6b5c"
  },
  {
    "id": 24,
    "nome": "Feminino Elegante 024",
    "categoria": "Femininos",
    "preco": 1737.9,
    "imagem": "assets/img/produtos/relogio-024.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design elegante. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#7864a4"
  },
  {
    "id": 25,
    "nome": "Feminino Aventura 025",
    "categoria": "Femininos",
    "preco": 1804.9,
    "imagem": "assets/img/produtos/relogio-025.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design aventura. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#b56c82"
  },
  {
    "id": 26,
    "nome": "Feminino Performance 026",
    "categoria": "Femininos",
    "preco": 1871.9,
    "imagem": "assets/img/produtos/relogio-026.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design performance. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#425c7a"
  },
  {
    "id": 27,
    "nome": "Feminino Vintage 027",
    "categoria": "Femininos",
    "preco": 138.9,
    "imagem": "assets/img/produtos/relogio-027.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design vintage. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#d5a24a"
  },
  {
    "id": 28,
    "nome": "Feminino Contemporâneo 028",
    "categoria": "Femininos",
    "preco": 205.9,
    "imagem": "assets/img/produtos/relogio-028.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design contemporâneo. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b4d55"
  },
  {
    "id": 29,
    "nome": "Feminino Premium 029",
    "categoria": "Femininos",
    "preco": 272.9,
    "imagem": "assets/img/produtos/relogio-029.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design premium. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#a55c43"
  },
  {
    "id": 30,
    "nome": "Feminino Essential 030",
    "categoria": "Femininos",
    "preco": 339.9,
    "imagem": "assets/img/produtos/relogio-030.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design essential. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#bca477"
  },
  {
    "id": 31,
    "nome": "Feminino Clássico 031",
    "categoria": "Femininos",
    "preco": 406.9,
    "imagem": "assets/img/produtos/relogio-031.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design clássico. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#293b4b"
  },
  {
    "id": 32,
    "nome": "Feminino Minimalista 032",
    "categoria": "Femininos",
    "preco": 473.9,
    "imagem": "assets/img/produtos/relogio-032.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design minimalista. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#9c6657"
  },
  {
    "id": 33,
    "nome": "Feminino Urbano 033",
    "categoria": "Femininos",
    "preco": 540.9,
    "imagem": "assets/img/produtos/relogio-033.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design urbano. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b6b5c"
  },
  {
    "id": 34,
    "nome": "Feminino Elegante 034",
    "categoria": "Femininos",
    "preco": 607.9,
    "imagem": "assets/img/produtos/relogio-034.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design elegante. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#7864a4"
  },
  {
    "id": 35,
    "nome": "Feminino Aventura 035",
    "categoria": "Femininos",
    "preco": 674.9,
    "imagem": "assets/img/produtos/relogio-035.svg",
    "descricao": "Modelo demonstrativo da coleção femininos, com design aventura. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#b56c82"
  },
  {
    "id": 36,
    "nome": "Esportivo Clássico 036",
    "categoria": "Esportivos",
    "preco": 741.9,
    "imagem": "assets/img/produtos/relogio-036.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design clássico. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#425c7a"
  },
  {
    "id": 37,
    "nome": "Esportivo Minimalista 037",
    "categoria": "Esportivos",
    "preco": 808.9,
    "imagem": "assets/img/produtos/relogio-037.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design minimalista. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#d5a24a"
  },
  {
    "id": 38,
    "nome": "Esportivo Urbano 038",
    "categoria": "Esportivos",
    "preco": 875.9,
    "imagem": "assets/img/produtos/relogio-038.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design urbano. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b4d55"
  },
  {
    "id": 39,
    "nome": "Esportivo Elegante 039",
    "categoria": "Esportivos",
    "preco": 942.9,
    "imagem": "assets/img/produtos/relogio-039.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design elegante. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#a55c43"
  },
  {
    "id": 40,
    "nome": "Esportivo Aventura 040",
    "categoria": "Esportivos",
    "preco": 1009.9,
    "imagem": "assets/img/produtos/relogio-040.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design aventura. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#bca477"
  },
  {
    "id": 41,
    "nome": "Esportivo Performance 041",
    "categoria": "Esportivos",
    "preco": 1076.9,
    "imagem": "assets/img/produtos/relogio-041.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design performance. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#293b4b"
  },
  {
    "id": 42,
    "nome": "Esportivo Vintage 042",
    "categoria": "Esportivos",
    "preco": 1143.9,
    "imagem": "assets/img/produtos/relogio-042.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design vintage. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#9c6657"
  },
  {
    "id": 43,
    "nome": "Esportivo Contemporâneo 043",
    "categoria": "Esportivos",
    "preco": 1210.9,
    "imagem": "assets/img/produtos/relogio-043.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design contemporâneo. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b6b5c"
  },
  {
    "id": 44,
    "nome": "Esportivo Premium 044",
    "categoria": "Esportivos",
    "preco": 1277.9,
    "imagem": "assets/img/produtos/relogio-044.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design premium. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#7864a4"
  },
  {
    "id": 45,
    "nome": "Esportivo Essential 045",
    "categoria": "Esportivos",
    "preco": 1344.9,
    "imagem": "assets/img/produtos/relogio-045.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design essential. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#b56c82"
  },
  {
    "id": 46,
    "nome": "Esportivo Clássico 046",
    "categoria": "Esportivos",
    "preco": 1411.9,
    "imagem": "assets/img/produtos/relogio-046.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design clássico. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#425c7a"
  },
  {
    "id": 47,
    "nome": "Esportivo Minimalista 047",
    "categoria": "Esportivos",
    "preco": 1478.9,
    "imagem": "assets/img/produtos/relogio-047.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design minimalista. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#d5a24a"
  },
  {
    "id": 48,
    "nome": "Esportivo Urbano 048",
    "categoria": "Esportivos",
    "preco": 1545.9,
    "imagem": "assets/img/produtos/relogio-048.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design urbano. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b4d55"
  },
  {
    "id": 49,
    "nome": "Esportivo Elegante 049",
    "categoria": "Esportivos",
    "preco": 1612.9,
    "imagem": "assets/img/produtos/relogio-049.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design elegante. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#a55c43"
  },
  {
    "id": 50,
    "nome": "Esportivo Aventura 050",
    "categoria": "Esportivos",
    "preco": 1679.9,
    "imagem": "assets/img/produtos/relogio-050.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design aventura. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#bca477"
  },
  {
    "id": 51,
    "nome": "Esportivo Performance 051",
    "categoria": "Esportivos",
    "preco": 1746.9,
    "imagem": "assets/img/produtos/relogio-051.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design performance. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#293b4b"
  },
  {
    "id": 52,
    "nome": "Esportivo Vintage 052",
    "categoria": "Esportivos",
    "preco": 1813.9,
    "imagem": "assets/img/produtos/relogio-052.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design vintage. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#9c6657"
  },
  {
    "id": 53,
    "nome": "Esportivo Contemporâneo 053",
    "categoria": "Esportivos",
    "preco": 1880.9,
    "imagem": "assets/img/produtos/relogio-053.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design contemporâneo. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b6b5c"
  },
  {
    "id": 54,
    "nome": "Esportivo Premium 054",
    "categoria": "Esportivos",
    "preco": 147.9,
    "imagem": "assets/img/produtos/relogio-054.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design premium. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#7864a4"
  },
  {
    "id": 55,
    "nome": "Esportivo Essential 055",
    "categoria": "Esportivos",
    "preco": 214.9,
    "imagem": "assets/img/produtos/relogio-055.svg",
    "descricao": "Modelo demonstrativo da coleção esportivos, com design essential. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#b56c82"
  },
  {
    "id": 56,
    "nome": "Smartwatche Clássico 056",
    "categoria": "Smartwatches",
    "preco": 281.9,
    "imagem": "assets/img/produtos/relogio-056.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design clássico. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#425c7a"
  },
  {
    "id": 57,
    "nome": "Smartwatche Minimalista 057",
    "categoria": "Smartwatches",
    "preco": 348.9,
    "imagem": "assets/img/produtos/relogio-057.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design minimalista. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#d5a24a"
  },
  {
    "id": 58,
    "nome": "Smartwatche Urbano 058",
    "categoria": "Smartwatches",
    "preco": 415.9,
    "imagem": "assets/img/produtos/relogio-058.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design urbano. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b4d55"
  },
  {
    "id": 59,
    "nome": "Smartwatche Elegante 059",
    "categoria": "Smartwatches",
    "preco": 482.9,
    "imagem": "assets/img/produtos/relogio-059.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design elegante. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#a55c43"
  },
  {
    "id": 60,
    "nome": "Smartwatche Aventura 060",
    "categoria": "Smartwatches",
    "preco": 549.9,
    "imagem": "assets/img/produtos/relogio-060.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design aventura. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#bca477"
  },
  {
    "id": 61,
    "nome": "Smartwatche Performance 061",
    "categoria": "Smartwatches",
    "preco": 616.9,
    "imagem": "assets/img/produtos/relogio-061.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design performance. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#293b4b"
  },
  {
    "id": 62,
    "nome": "Smartwatche Vintage 062",
    "categoria": "Smartwatches",
    "preco": 683.9,
    "imagem": "assets/img/produtos/relogio-062.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design vintage. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#9c6657"
  },
  {
    "id": 63,
    "nome": "Smartwatche Contemporâneo 063",
    "categoria": "Smartwatches",
    "preco": 750.9,
    "imagem": "assets/img/produtos/relogio-063.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design contemporâneo. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b6b5c"
  },
  {
    "id": 64,
    "nome": "Smartwatche Premium 064",
    "categoria": "Smartwatches",
    "preco": 817.9,
    "imagem": "assets/img/produtos/relogio-064.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design premium. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#7864a4"
  },
  {
    "id": 65,
    "nome": "Smartwatche Essential 065",
    "categoria": "Smartwatches",
    "preco": 884.9,
    "imagem": "assets/img/produtos/relogio-065.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design essential. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#b56c82"
  },
  {
    "id": 66,
    "nome": "Smartwatche Clássico 066",
    "categoria": "Smartwatches",
    "preco": 951.9,
    "imagem": "assets/img/produtos/relogio-066.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design clássico. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#425c7a"
  },
  {
    "id": 67,
    "nome": "Smartwatche Minimalista 067",
    "categoria": "Smartwatches",
    "preco": 1018.9,
    "imagem": "assets/img/produtos/relogio-067.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design minimalista. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#d5a24a"
  },
  {
    "id": 68,
    "nome": "Smartwatche Urbano 068",
    "categoria": "Smartwatches",
    "preco": 1085.9,
    "imagem": "assets/img/produtos/relogio-068.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design urbano. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b4d55"
  },
  {
    "id": 69,
    "nome": "Smartwatche Elegante 069",
    "categoria": "Smartwatches",
    "preco": 1152.9,
    "imagem": "assets/img/produtos/relogio-069.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design elegante. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#a55c43"
  },
  {
    "id": 70,
    "nome": "Smartwatche Aventura 070",
    "categoria": "Smartwatches",
    "preco": 1219.9,
    "imagem": "assets/img/produtos/relogio-070.svg",
    "descricao": "Modelo demonstrativo da coleção smartwatches, com design aventura. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#bca477"
  },
  {
    "id": 71,
    "nome": "Luxo Clássico 071",
    "categoria": "Luxo",
    "preco": 1286.9,
    "imagem": "assets/img/produtos/relogio-071.svg",
    "descricao": "Modelo demonstrativo da coleção luxo, com design clássico. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#293b4b"
  },
  {
    "id": 72,
    "nome": "Luxo Minimalista 072",
    "categoria": "Luxo",
    "preco": 1353.9,
    "imagem": "assets/img/produtos/relogio-072.svg",
    "descricao": "Modelo demonstrativo da coleção luxo, com design minimalista. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#9c6657"
  },
  {
    "id": 73,
    "nome": "Luxo Urbano 073",
    "categoria": "Luxo",
    "preco": 1420.9,
    "imagem": "assets/img/produtos/relogio-073.svg",
    "descricao": "Modelo demonstrativo da coleção luxo, com design urbano. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b6b5c"
  },
  {
    "id": 74,
    "nome": "Luxo Elegante 074",
    "categoria": "Luxo",
    "preco": 1487.9,
    "imagem": "assets/img/produtos/relogio-074.svg",
    "descricao": "Modelo demonstrativo da coleção luxo, com design elegante. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#7864a4"
  },
  {
    "id": 75,
    "nome": "Luxo Aventura 075",
    "categoria": "Luxo",
    "preco": 1554.9,
    "imagem": "assets/img/produtos/relogio-075.svg",
    "descricao": "Modelo demonstrativo da coleção luxo, com design aventura. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#b56c82"
  },
  {
    "id": 76,
    "nome": "Luxo Performance 076",
    "categoria": "Luxo",
    "preco": 1621.9,
    "imagem": "assets/img/produtos/relogio-076.svg",
    "descricao": "Modelo demonstrativo da coleção luxo, com design performance. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#425c7a"
  },
  {
    "id": 77,
    "nome": "Luxo Vintage 077",
    "categoria": "Luxo",
    "preco": 1688.9,
    "imagem": "assets/img/produtos/relogio-077.svg",
    "descricao": "Modelo demonstrativo da coleção luxo, com design vintage. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#d5a24a"
  },
  {
    "id": 78,
    "nome": "Luxo Contemporâneo 078",
    "categoria": "Luxo",
    "preco": 1755.9,
    "imagem": "assets/img/produtos/relogio-078.svg",
    "descricao": "Modelo demonstrativo da coleção luxo, com design contemporâneo. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b4d55"
  },
  {
    "id": 79,
    "nome": "Luxo Premium 079",
    "categoria": "Luxo",
    "preco": 1822.9,
    "imagem": "assets/img/produtos/relogio-079.svg",
    "descricao": "Modelo demonstrativo da coleção luxo, com design premium. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#a55c43"
  },
  {
    "id": 80,
    "nome": "Luxo Essential 080",
    "categoria": "Luxo",
    "preco": 1889.9,
    "imagem": "assets/img/produtos/relogio-080.svg",
    "descricao": "Modelo demonstrativo da coleção luxo, com design essential. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#bca477"
  },
  {
    "id": 81,
    "nome": "Digitai Clássico 081",
    "categoria": "Digitais",
    "preco": 156.9,
    "imagem": "assets/img/produtos/relogio-081.svg",
    "descricao": "Modelo demonstrativo da coleção digitais, com design clássico. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#293b4b"
  },
  {
    "id": 82,
    "nome": "Digitai Minimalista 082",
    "categoria": "Digitais",
    "preco": 223.9,
    "imagem": "assets/img/produtos/relogio-082.svg",
    "descricao": "Modelo demonstrativo da coleção digitais, com design minimalista. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#9c6657"
  },
  {
    "id": 83,
    "nome": "Digitai Urbano 083",
    "categoria": "Digitais",
    "preco": 290.9,
    "imagem": "assets/img/produtos/relogio-083.svg",
    "descricao": "Modelo demonstrativo da coleção digitais, com design urbano. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b6b5c"
  },
  {
    "id": 84,
    "nome": "Digitai Elegante 084",
    "categoria": "Digitais",
    "preco": 357.9,
    "imagem": "assets/img/produtos/relogio-084.svg",
    "descricao": "Modelo demonstrativo da coleção digitais, com design elegante. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#7864a4"
  },
  {
    "id": 85,
    "nome": "Digitai Aventura 085",
    "categoria": "Digitais",
    "preco": 424.9,
    "imagem": "assets/img/produtos/relogio-085.svg",
    "descricao": "Modelo demonstrativo da coleção digitais, com design aventura. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#b56c82"
  },
  {
    "id": 86,
    "nome": "Digitai Performance 086",
    "categoria": "Digitais",
    "preco": 491.9,
    "imagem": "assets/img/produtos/relogio-086.svg",
    "descricao": "Modelo demonstrativo da coleção digitais, com design performance. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#425c7a"
  },
  {
    "id": 87,
    "nome": "Digitai Vintage 087",
    "categoria": "Digitais",
    "preco": 558.9,
    "imagem": "assets/img/produtos/relogio-087.svg",
    "descricao": "Modelo demonstrativo da coleção digitais, com design vintage. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#d5a24a"
  },
  {
    "id": 88,
    "nome": "Digitai Contemporâneo 088",
    "categoria": "Digitais",
    "preco": 625.9,
    "imagem": "assets/img/produtos/relogio-088.svg",
    "descricao": "Modelo demonstrativo da coleção digitais, com design contemporâneo. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b4d55"
  },
  {
    "id": 89,
    "nome": "Digitai Premium 089",
    "categoria": "Digitais",
    "preco": 692.9,
    "imagem": "assets/img/produtos/relogio-089.svg",
    "descricao": "Modelo demonstrativo da coleção digitais, com design premium. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#a55c43"
  },
  {
    "id": 90,
    "nome": "Digitai Essential 090",
    "categoria": "Digitais",
    "preco": 759.9,
    "imagem": "assets/img/produtos/relogio-090.svg",
    "descricao": "Modelo demonstrativo da coleção digitais, com design essential. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#bca477"
  },
  {
    "id": 91,
    "nome": "Infanti Clássico 091",
    "categoria": "Infantis",
    "preco": 826.9,
    "imagem": "assets/img/produtos/relogio-091.svg",
    "descricao": "Modelo demonstrativo da coleção infantis, com design clássico. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#293b4b"
  },
  {
    "id": 92,
    "nome": "Infanti Minimalista 092",
    "categoria": "Infantis",
    "preco": 893.9,
    "imagem": "assets/img/produtos/relogio-092.svg",
    "descricao": "Modelo demonstrativo da coleção infantis, com design minimalista. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#9c6657"
  },
  {
    "id": 93,
    "nome": "Infanti Urbano 093",
    "categoria": "Infantis",
    "preco": 960.9,
    "imagem": "assets/img/produtos/relogio-093.svg",
    "descricao": "Modelo demonstrativo da coleção infantis, com design urbano. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b6b5c"
  },
  {
    "id": 94,
    "nome": "Infanti Elegante 094",
    "categoria": "Infantis",
    "preco": 1027.9,
    "imagem": "assets/img/produtos/relogio-094.svg",
    "descricao": "Modelo demonstrativo da coleção infantis, com design elegante. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#7864a4"
  },
  {
    "id": 95,
    "nome": "Infanti Aventura 095",
    "categoria": "Infantis",
    "preco": 1094.9,
    "imagem": "assets/img/produtos/relogio-095.svg",
    "descricao": "Modelo demonstrativo da coleção infantis, com design aventura. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#b56c82"
  },
  {
    "id": 96,
    "nome": "Infanti Performance 096",
    "categoria": "Infantis",
    "preco": 1161.9,
    "imagem": "assets/img/produtos/relogio-096.svg",
    "descricao": "Modelo demonstrativo da coleção infantis, com design performance. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#425c7a"
  },
  {
    "id": 97,
    "nome": "Infanti Vintage 097",
    "categoria": "Infantis",
    "preco": 1228.9,
    "imagem": "assets/img/produtos/relogio-097.svg",
    "descricao": "Modelo demonstrativo da coleção infantis, com design vintage. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#d5a24a"
  },
  {
    "id": 98,
    "nome": "Infanti Contemporâneo 098",
    "categoria": "Infantis",
    "preco": 1295.9,
    "imagem": "assets/img/produtos/relogio-098.svg",
    "descricao": "Modelo demonstrativo da coleção infantis, com design contemporâneo. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#4b4d55"
  },
  {
    "id": 99,
    "nome": "Infanti Premium 099",
    "categoria": "Infantis",
    "preco": 1362.9,
    "imagem": "assets/img/produtos/relogio-099.svg",
    "descricao": "Modelo demonstrativo da coleção infantis, com design premium. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#a55c43"
  },
  {
    "id": 100,
    "nome": "Infanti Essential 100",
    "categoria": "Infantis",
    "preco": 1429.9,
    "imagem": "assets/img/produtos/relogio-100.svg",
    "descricao": "Modelo demonstrativo da coleção infantis, com design essential. Fotografia, materiais, dimensões e demais especificações devem ser confirmados pelo lojista antes de vender.",
    "cor": "#bca477"
  }
];

// ALTERE AQUI: a pasta com as fotos reais, com arquivos numerados de 001 até 100.
const PASTA_FOTOS_REAIS = 'assets/img/fotos-reais/';
// EXPLICAÇÃO: verificamos se existe uma foto real, sem apagar a ilustração original.
PRODUTOS.forEach((produto) => {
  // EXPLICAÇÃO: guardamos a imagem de segurança para o caso de a fotografia ainda não existir.
  produto.imagemIlustrativa = produto.imagem;
  // EXPLICAÇÃO: a foto só deve ser marcada como validada após conferir origem e correspondência.
  produto.fotoValidada = false;
  // EXPLICAÇÃO: o caminho da fotografia segue o ID do relógio.
  produto.caminhoFotoReal = `${PASTA_FOTOS_REAIS}relogio-${String(produto.id).padStart(3, '0')}.jpg`;
});
