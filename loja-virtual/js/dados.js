/* ==========================================================================
   CATÁLOGO DA LOJA  —  edite este arquivo para trocar produtos, preços e ofertas
   --------------------------------------------------------------------------
   Cada produto:  id, nome, categoria, preco, promo, imagem, resumo, descricao ...

     preco ....... preço normal, em reais, SEM ponto e SEM cifrão
     promo ....... preço promocional, ou null se não estiver em oferta
     destaque .... true aparece na vitrine da home

   Para ADD UM PRODUTO: copie um bloco inteiro {}, cole e mude os campos.
   Para REMOVER: apague o bloco inteiro.
   A foto do produto vai em assets/img/produtos/<id>.jpg

   Nenhum outro arquivo precisa ser editado para o catálogo mudar.
   ========================================================================== */

const CATEGORIAS = {
  "smartphones": {
    "rotulo": "Smartphones",
    "icone": "mobile-screen-button"
  },
  "notebooks": {
    "rotulo": "Notebooks",
    "icone": "laptop"
  },
  "audio": {
    "rotulo": "Áudio",
    "icone": "headphones"
  },
  "tv": {
    "rotulo": "TV & Vídeo",
    "icone": "tv"
  },
  "games": {
    "rotulo": "Games",
    "icone": "gamepad"
  },
  "wearables": {
    "rotulo": "Relógios",
    "icone": "clock"
  },
  "casa": {
    "rotulo": "Casa",
    "icone": "house"
  },
  "eletro": {
    "rotulo": "Eletro",
    "icone": "blender"
  },
  "cameras": {
    "rotulo": "Câmeras",
    "icone": "camera"
  },
  "perifericos": {
    "rotulo": "Periféricos",
    "icone": "computer-mouse"
  }
};

const PRODUTOS = [
  {
    "id": "nexa-phone-x-pro",
    "nome": "Nexa Phone X Pro",
    "categoria": "smartphones",
    "preco": 4999,
    "promo": 4299,
    "imagem": "assets/img/produtos/nexa-phone-x-pro.jpg",
    "icone": "mobile-screen-button",
    "resumo": "Tela 6,7\" AMOLED 120Hz, câmera tripla 108MP e bateria para o dia todo.",
    "descricao": "Tela 6,7\" AMOLED 120Hz, câmera tripla 108MP e bateria para o dia todo. O Nexa Phone X Pro é para quem vive colado ao celular: tela que respira luz boa, câmera que não pede licença para a noite e bateria que aguenta até o fim do expediente sem caçar tomada.\n\nO que você precisa saber antes de comprar:\n\nTela: 6,1\" a 6,7\" · Bateria: 5.000 mAh · Armazenamento: 128 GB a 1 TB · Rede: 5G + Wi-Fi 6 · Câmera: Traseira tripla · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.3,
    "avaliacoes": 23,
    "vendidos": 40,
    "estoque": 3,
    "especificacoes": [
      ["Tela", "6,1\" a 6,7\""],
      ["Bateria", "5.000 mAh"],
      ["Armazenamento", "128 GB a 1 TB"],
      ["Rede", "5G + Wi-Fi 6"],
      ["Câmera", "Traseira tripla"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Aparelho", "Cabo USB-C", "Adaptador de tomada", "Pin para chip", "Capa protetora", "Folha de garantia"],
    "freteGratis": true,
    "destaque": true
  },
  {
    "id": "nexa-phone-12",
    "nome": "Nexa Phone 12",
    "categoria": "smartphones",
    "preco": 2499,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-phone-12.jpg",
    "icone": "mobile-screen-button",
    "resumo": "O melhor custo-benefício da linha: 5G, 128GB e tela de 6,4\".",
    "descricao": "O melhor custo-benefício da linha: 5G, 128GB e tela de 6,4\". O Nexa Phone 12 é para quem vive colado ao celular: tela que respira luz boa, câmera que não pede licença para a noite e bateria que aguenta até o fim do expediente sem caçar tomada.\n\nO que você precisa saber antes de comprar:\n\nTela: 6,1\" a 6,7\" · Bateria: 5.000 mAh · Armazenamento: 128 GB a 1 TB · Rede: 5G + Wi-Fi 6 · Câmera: Traseira tripla · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 5.0,
    "avaliacoes": 60,
    "vendidos": 101,
    "estoque": 16,
    "especificacoes": [
      ["Tela", "6,1\" a 6,7\""],
      ["Bateria", "5.000 mAh"],
      ["Armazenamento", "128 GB a 1 TB"],
      ["Rede", "5G + Wi-Fi 6"],
      ["Câmera", "Traseira tripla"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Aparelho", "Cabo USB-C", "Adaptador de tomada", "Pin para chip", "Capa protetora", "Folha de garantia"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-phone-mini",
    "nome": "Nexa Phone Mini",
    "categoria": "smartphones",
    "preco": 1899,
    "promo": 1599,
    "imagem": "assets/img/produtos/nexa-phone-mini.jpg",
    "icone": "mobile",
    "resumo": "Compacto, leve e com tudo que importa — ideal para quem não quer peso no bolso.",
    "descricao": "Compacto, leve e com tudo que importa — ideal para quem não quer peso no bolso. O Nexa Phone Mini é para quem vive colado ao celular: tela que respira luz boa, câmera que não pede licença para a noite e bateria que aguenta até o fim do expediente sem caçar tomada.\n\nO que você precisa saber antes de comprar:\n\nTela: 6,1\" a 6,7\" · Bateria: 5.000 mAh · Armazenamento: 128 GB a 1 TB · Rede: 5G + Wi-Fi 6 · Câmera: Traseira tripla · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.9,
    "avaliacoes": 97,
    "vendidos": 162,
    "estoque": 29,
    "especificacoes": [
      ["Tela", "6,1\" a 6,7\""],
      ["Bateria", "5.000 mAh"],
      ["Armazenamento", "128 GB a 1 TB"],
      ["Rede", "5G + Wi-Fi 6"],
      ["Câmera", "Traseira tripla"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Aparelho", "Cabo USB-C", "Adaptador de tomada", "Pin para chip", "Capa protetora", "Folha de garantia"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-phone-ultra-5g",
    "nome": "Nexa Phone Ultra 5G",
    "categoria": "smartphones",
    "preco": 5799,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-phone-ultra-5g.jpg",
    "icone": "mobile-screen-button",
    "resumo": "Câmera com zoom ótico 5x, processador top de linha e carregamento de 65W.",
    "descricao": "Câmera com zoom ótico 5x, processador top de linha e carregamento de 65W. O Nexa Phone Ultra 5G é para quem vive colado ao celular: tela que respira luz boa, câmera que não pede licença para a noite e bateria que aguenta até o fim do expediente sem caçar tomada.\n\nO que você precisa saber antes de comprar:\n\nTela: 6,1\" a 6,7\" · Bateria: 5.000 mAh · Armazenamento: 128 GB a 1 TB · Rede: 5G + Wi-Fi 6 · Câmera: Traseira tripla · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.8,
    "avaliacoes": 134,
    "vendidos": 223,
    "estoque": 42,
    "especificacoes": [
      ["Tela", "6,1\" a 6,7\""],
      ["Bateria", "5.000 mAh"],
      ["Armazenamento", "128 GB a 1 TB"],
      ["Rede", "5G + Wi-Fi 6"],
      ["Câmera", "Traseira tripla"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Aparelho", "Cabo USB-C", "Adaptador de tomada", "Pin para chip", "Capa protetora", "Folha de garantia"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-phone-a54",
    "nome": "Nexa Phone A54",
    "categoria": "smartphones",
    "preco": 1299,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-phone-a54.jpg",
    "icone": "mobile",
    "resumo": "Entrada que não decepciona: tela fluida, 256GB e bateria de 5.000mAh.",
    "descricao": "Entrada que não decepciona: tela fluida, 256GB e bateria de 5.000mAh. O Nexa Phone A54 é para quem vive colado ao celular: tela que respira luz boa, câmera que não pede licença para a noite e bateria que aguenta até o fim do expediente sem caçar tomada.\n\nO que você precisa saber antes de comprar:\n\nTela: 6,1\" a 6,7\" · Bateria: 5.000 mAh · Armazenamento: 128 GB a 1 TB · Rede: 5G + Wi-Fi 6 · Câmera: Traseira tripla · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.7,
    "avaliacoes": 171,
    "vendidos": 284,
    "estoque": 8,
    "especificacoes": [
      ["Tela", "6,1\" a 6,7\""],
      ["Bateria", "5.000 mAh"],
      ["Armazenamento", "128 GB a 1 TB"],
      ["Rede", "5G + Wi-Fi 6"],
      ["Câmera", "Traseira tripla"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Aparelho", "Cabo USB-C", "Adaptador de tomada", "Pin para chip", "Capa protetora", "Folha de garantia"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-phone-fold",
    "nome": "Nexa Phone Fold",
    "categoria": "smartphones",
    "preco": 7999,
    "promo": 6999,
    "imagem": "assets/img/produtos/nexa-phone-fold.jpg",
    "icone": "tablet-screen-button",
    "resumo": "Dobra para caber no bolso e abre em uma tela de 7,6 polegadas.",
    "descricao": "Dobra para caber no bolso e abre em uma tela de 7,6 polegadas. O Nexa Phone Fold é para quem vive colado ao celular: tela que respira luz boa, câmera que não pede licença para a noite e bateria que aguenta até o fim do expediente sem caçar tomada.\n\nO que você precisa saber antes de comprar:\n\nTela: 6,1\" a 6,7\" · Bateria: 5.000 mAh · Armazenamento: 128 GB a 1 TB · Rede: 5G + Wi-Fi 6 · Câmera: Traseira tripla · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.6,
    "avaliacoes": 208,
    "vendidos": 345,
    "estoque": 21,
    "especificacoes": [
      ["Tela", "6,1\" a 6,7\""],
      ["Bateria", "5.000 mAh"],
      ["Armazenamento", "128 GB a 1 TB"],
      ["Rede", "5G + Wi-Fi 6"],
      ["Câmera", "Traseira tripla"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Aparelho", "Cabo USB-C", "Adaptador de tomada", "Pin para chip", "Capa protetora", "Folha de garantia"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexabook-pro-14",
    "nome": "NexaBook Pro 14",
    "categoria": "notebooks",
    "preco": 7499,
    "promo": null,
    "imagem": "assets/img/produtos/nexabook-pro-14.jpg",
    "icone": "laptop",
    "resumo": "M4 de 10 núcleos, 16GB unificados e 512GB SSD — para quem trabalha pesado.",
    "descricao": "M4 de 10 núcleos, 16GB unificados e 512GB SSD — para quem trabalha pesado. Com o NexaBook Pro 14, abrir vinte abas deixa de ser problema. O SSD curta o tempo de espera e a tela antirreflexo deixa você trabalhar perto da janela sem virar espelho.\n\nO que você precisa saber antes de comprar:\n\nTela: 13\" a 16\" · Memória: 16 GB a 32 GB · Armazenamento: SSD 512 GB · Bateria: Até 18 horas · Teclado: ABNT2 retroiluminado · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.5,
    "avaliacoes": 245,
    "vendidos": 406,
    "estoque": 34,
    "especificacoes": [
      ["Tela", "13\" a 16\""],
      ["Memória", "16 GB a 32 GB"],
      ["Armazenamento", "SSD 512 GB"],
      ["Bateria", "Até 18 horas"],
      ["Teclado", "ABNT2 retroiluminado"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Notebook", "Fonte de alimentação", "Manual", "Pin para chip"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexabook-air-13",
    "nome": "NexaBook Air 13",
    "categoria": "notebooks",
    "preco": 5299,
    "promo": 4699,
    "imagem": "assets/img/produtos/nexabook-air-13.jpg",
    "icone": "laptop",
    "resumo": "1,1 kg de alumínio, 18 horas de bateria e silencioso de verdade.",
    "descricao": "1,1 kg de alumínio, 18 horas de bateria e silencioso de verdade. Com o NexaBook Air 13, abrir vinte abas deixa de ser problema. O SSD curta o tempo de espera e a tela antirreflexo deixa você trabalhar perto da janela sem virar espelho.\n\nO que você precisa saber antes de comprar:\n\nTela: 13\" a 16\" · Memória: 16 GB a 32 GB · Armazenamento: SSD 512 GB · Bateria: Até 18 horas · Teclado: ABNT2 retroiluminado · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.4,
    "avaliacoes": 282,
    "vendidos": 467,
    "estoque": 47,
    "especificacoes": [
      ["Tela", "13\" a 16\""],
      ["Memória", "16 GB a 32 GB"],
      ["Armazenamento", "SSD 512 GB"],
      ["Bateria", "Até 18 horas"],
      ["Teclado", "ABNT2 retroiluminado"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Notebook", "Fonte de alimentação", "Manual", "Pin para chip"],
    "freteGratis": true,
    "destaque": true
  },
  {
    "id": "nexabook-gamer-x7",
    "nome": "NexaBook Gamer X7",
    "categoria": "notebooks",
    "preco": 8999,
    "promo": null,
    "imagem": "assets/img/produtos/nexabook-gamer-x7.jpg",
    "icone": "laptop",
    "resumo": "Placa dedicada de 8GB, teclado RGB e refrigeração de duplo ventilador.",
    "descricao": "Placa dedicada de 8GB, teclado RGB e refrigeração de duplo ventilador. Com o NexaBook Gamer X7, abrir vinte abas deixa de ser problema. O SSD curta o tempo de espera e a tela antirreflexo deixa você trabalhar perto da janela sem virar espelho.\n\nO que você precisa saber antes de comprar:\n\nTela: 13\" a 16\" · Memória: 16 GB a 32 GB · Armazenamento: SSD 512 GB · Bateria: Até 18 horas · Teclado: ABNT2 retroiluminado · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.3,
    "avaliacoes": 319,
    "vendidos": 528,
    "estoque": 13,
    "especificacoes": [
      ["Tela", "13\" a 16\""],
      ["Memória", "16 GB a 32 GB"],
      ["Armazenamento", "SSD 512 GB"],
      ["Bateria", "Até 18 horas"],
      ["Teclado", "ABNT2 retroiluminado"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Notebook", "Fonte de alimentação", "Manual", "Pin para chip"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexabook-slim-15",
    "nome": "NexaBook Slim 15",
    "categoria": "notebooks",
    "preco": 3999,
    "promo": null,
    "imagem": "assets/img/produtos/nexabook-slim-15.jpg",
    "icone": "laptop",
    "resumo": "Notebook do dia a dia com SSD rápido, 16GB e tela antirreflexo.",
    "descricao": "Notebook do dia a dia com SSD rápido, 16GB e tela antirreflexo. Com o NexaBook Slim 15, abrir vinte abas deixa de ser problema. O SSD curta o tempo de espera e a tela antirreflexo deixa você trabalhar perto da janela sem virar espelho.\n\nO que você precisa saber antes de comprar:\n\nTela: 13\" a 16\" · Memória: 16 GB a 32 GB · Armazenamento: SSD 512 GB · Bateria: Até 18 horas · Teclado: ABNT2 retroiluminado · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 5.0,
    "avaliacoes": 356,
    "vendidos": 589,
    "estoque": 26,
    "especificacoes": [
      ["Tela", "13\" a 16\""],
      ["Memória", "16 GB a 32 GB"],
      ["Armazenamento", "SSD 512 GB"],
      ["Bateria", "Até 18 horas"],
      ["Teclado", "ABNT2 retroiluminado"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Notebook", "Fonte de alimentação", "Manual", "Pin para chip"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexabook-work-14",
    "nome": "NexaBook Work 14",
    "categoria": "notebooks",
    "preco": 4499,
    "promo": 3899,
    "imagem": "assets/img/produtos/nexabook-work-14.jpg",
    "icone": "laptop",
    "resumo": "Pensado para escritório: leitor de digital, TPM e 3 anos de garantia.",
    "descricao": "Pensado para escritório: leitor de digital, TPM e 3 anos de garantia. Com o NexaBook Work 14, abrir vinte abas deixa de ser problema. O SSD curta o tempo de espera e a tela antirreflexo deixa você trabalhar perto da janela sem virar espelho.\n\nO que você precisa saber antes de comprar:\n\nTela: 13\" a 16\" · Memória: 16 GB a 32 GB · Armazenamento: SSD 512 GB · Bateria: Até 18 horas · Teclado: ABNT2 retroiluminado · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.9,
    "avaliacoes": 393,
    "vendidos": 650,
    "estoque": 39,
    "especificacoes": [
      ["Tela", "13\" a 16\""],
      ["Memória", "16 GB a 32 GB"],
      ["Armazenamento", "SSD 512 GB"],
      ["Bateria", "Até 18 horas"],
      ["Teclado", "ABNT2 retroiluminado"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Notebook", "Fonte de alimentação", "Manual", "Pin para chip"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexabook-studio-16",
    "nome": "NexaBook Studio 16",
    "categoria": "notebooks",
    "preco": 9799,
    "promo": null,
    "imagem": "assets/img/produtos/nexabook-studio-16.jpg",
    "icone": "laptop",
    "resumo": "Tela calibrada de fábrica, 32GB e placa de vídeo para edição de vídeo.",
    "descricao": "Tela calibrada de fábrica, 32GB e placa de vídeo para edição de vídeo. Com o NexaBook Studio 16, abrir vinte abas deixa de ser problema. O SSD curta o tempo de espera e a tela antirreflexo deixa você trabalhar perto da janela sem virar espelho.\n\nO que você precisa saber antes de comprar:\n\nTela: 13\" a 16\" · Memória: 16 GB a 32 GB · Armazenamento: SSD 512 GB · Bateria: Até 18 horas · Teclado: ABNT2 retroiluminado · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.8,
    "avaliacoes": 430,
    "vendidos": 711,
    "estoque": 5,
    "especificacoes": [
      ["Tela", "13\" a 16\""],
      ["Memória", "16 GB a 32 GB"],
      ["Armazenamento", "SSD 512 GB"],
      ["Bateria", "Até 18 horas"],
      ["Teclado", "ABNT2 retroiluminado"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Notebook", "Fonte de alimentação", "Manual", "Pin para chip"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-sound-max",
    "nome": "Nexa Sound Max",
    "categoria": "audio",
    "preco": 899,
    "promo": 699,
    "imagem": "assets/img/produtos/nexa-sound-max.jpg",
    "icone": "headphones",
    "resumo": "Cancelamento ativo de ruído, 40h de bateria e som espacial.",
    "descricao": "Cancelamento ativo de ruído, 40h de bateria e som espacial. O Nexa Sound Max foi afinado para não cansar o ouvido: graves presentes sem tapar a voz e ajuste de cancelamento que você muda num toque, do metrô ao escritório.\n\nO que você precisa saber antes de comprar:\n\nConexão: Bluetooth 5.3 · Autonomia: Até 40 horas · Cancelamento: ANC adaptativo · Resistência: IPX5 · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.7,
    "avaliacoes": 467,
    "vendidos": 772,
    "estoque": 18,
    "especificacoes": [
      ["Conexão", "Bluetooth 5.3"],
      ["Autonomia", "Até 40 horas"],
      ["Cancelamento", "ANC adaptativo"],
      ["Resistência", "IPX5"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Estojo de transporte", "Cabo de carga", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-buds-pro",
    "nome": "Nexa Buds Pro",
    "categoria": "audio",
    "preco": 549,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-buds-pro.jpg",
    "icone": "headphones",
    "resumo": "Sem fio com ANC, resistência à água IPX5 e estojo com carga rápida.",
    "descricao": "Sem fio com ANC, resistência à água IPX5 e estojo com carga rápida. O Nexa Buds Pro foi afinado para não cansar o ouvido: graves presentes sem tapar a voz e ajuste de cancelamento que você muda num toque, do metrô ao escritório.\n\nO que você precisa saber antes de comprar:\n\nConexão: Bluetooth 5.3 · Autonomia: Até 40 horas · Cancelamento: ANC adaptativo · Resistência: IPX5 · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.6,
    "avaliacoes": 504,
    "vendidos": 833,
    "estoque": 31,
    "especificacoes": [
      ["Conexão", "Bluetooth 5.3"],
      ["Autonomia", "Até 40 horas"],
      ["Cancelamento", "ANC adaptativo"],
      ["Resistência", "IPX5"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Estojo de transporte", "Cabo de carga", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-sound-bar-3-1",
    "nome": "Nexa Sound Bar 3.1",
    "categoria": "audio",
    "preco": 1799,
    "promo": 1499,
    "imagem": "assets/img/produtos/nexa-sound-bar-3-1.jpg",
    "icone": "volume-high",
    "resumo": "Subwoofer incluído, Bluetooth 5.3 e três modos de som para filmes.",
    "descricao": "Subwoofer incluído, Bluetooth 5.3 e três modos de som para filmes. O Nexa Sound Bar 3.1 foi afinado para não cansar o ouvido: graves presentes sem tapar a voz e ajuste de cancelamento que você muda num toque, do metrô ao escritório.\n\nO que você precisa saber antes de comprar:\n\nConexão: Bluetooth 5.3 · Autonomia: Até 40 horas · Cancelamento: ANC adaptativo · Resistência: IPX5 · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.5,
    "avaliacoes": 541,
    "vendidos": 894,
    "estoque": 44,
    "especificacoes": [
      ["Conexão", "Bluetooth 5.3"],
      ["Autonomia", "Até 40 horas"],
      ["Cancelamento", "ANC adaptativo"],
      ["Resistência", "IPX5"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Estojo de transporte", "Cabo de carga", "Manual"],
    "freteGratis": true,
    "destaque": true
  },
  {
    "id": "nexa-boom-speaker",
    "nome": "Nexa Boom Speaker",
    "categoria": "audio",
    "preco": 449,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-boom-speaker.jpg",
    "icone": "volume-high",
    "resumo": "À prova d'água, 24 horas de música e grave que você sente no peito.",
    "descricao": "À prova d'água, 24 horas de música e grave que você sente no peito. O Nexa Boom Speaker foi afinado para não cansar o ouvido: graves presentes sem tapar a voz e ajuste de cancelamento que você muda num toque, do metrô ao escritório.\n\nO que você precisa saber antes de comprar:\n\nConexão: Bluetooth 5.3 · Autonomia: Até 40 horas · Cancelamento: ANC adaptativo · Resistência: IPX5 · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.4,
    "avaliacoes": 578,
    "vendidos": 955,
    "estoque": 10,
    "especificacoes": [
      ["Conexão", "Bluetooth 5.3"],
      ["Autonomia", "Até 40 horas"],
      ["Cancelamento", "ANC adaptativo"],
      ["Resistência", "IPX5"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Estojo de transporte", "Cabo de carga", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-studio-headset",
    "nome": "Nexa Studio Headset",
    "categoria": "audio",
    "preco": 799,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-studio-headset.jpg",
    "icone": "headphones",
    "resumo": "Microfone com cancelamento, drivers de 50mm e cabo trançado.",
    "descricao": "Microfone com cancelamento, drivers de 50mm e cabo trançado. O Nexa Studio Headset foi afinado para não cansar o ouvido: graves presentes sem tapar a voz e ajuste de cancelamento que você muda num toque, do metrô ao escritório.\n\nO que você precisa saber antes de comprar:\n\nConexão: Bluetooth 5.3 · Autonomia: Até 40 horas · Cancelamento: ANC adaptativo · Resistência: IPX5 · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.3,
    "avaliacoes": 615,
    "vendidos": 1016,
    "estoque": 23,
    "especificacoes": [
      ["Conexão", "Bluetooth 5.3"],
      ["Autonomia", "Até 40 horas"],
      ["Cancelamento", "ANC adaptativo"],
      ["Resistência", "IPX5"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Estojo de transporte", "Cabo de carga", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-ear-clip",
    "nome": "Nexa Ear Clip",
    "categoria": "audio",
    "preco": 299,
    "promo": 239,
    "imagem": "assets/img/produtos/nexa-ear-clip.jpg",
    "icone": "headphones",
    "resumo": "Aberto, não deixa o ouvido cansado — perfeito para correr e trabalhar.",
    "descricao": "Aberto, não deixa o ouvido cansado — perfeito para correr e trabalhar. O Nexa Ear Clip foi afinado para não cansar o ouvido: graves presentes sem tapar a voz e ajuste de cancelamento que você muda num toque, do metrô ao escritório.\n\nO que você precisa saber antes de comprar:\n\nConexão: Bluetooth 5.3 · Autonomia: Até 40 horas · Cancelamento: ANC adaptativo · Resistência: IPX5 · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 5.0,
    "avaliacoes": 652,
    "vendidos": 1077,
    "estoque": 36,
    "especificacoes": [
      ["Conexão", "Bluetooth 5.3"],
      ["Autonomia", "Até 40 horas"],
      ["Cancelamento", "ANC adaptativo"],
      ["Resistência", "IPX5"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Estojo de transporte", "Cabo de carga", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-tv-55-4k",
    "nome": "Nexa TV 55\" 4K",
    "categoria": "tv",
    "preco": 3299,
    "promo": 2799,
    "imagem": "assets/img/produtos/nexa-tv-55-4k.jpg",
    "icone": "tv",
    "resumo": "Quantum Dot, HDR10+ e sistema operacional rápido com todos os apps.",
    "descricao": "Quantum Dot, HDR10+ e sistema operacional rápido com todos os apps. O Nexa TV 55\" 4K transforma a sala em sala de cinema. Cores fiéis, preto de verdade e sistema rápido que não faz você esperar para abrir o aplicativo de streaming.\n\nO que você precisa saber antes de comprar:\n\nResolução: 4K UHD / HDR · Taxa: 60 Hz a 120 Hz · Sistema: Smart TV integrado · Entradas: 3x HDMI 2.1 · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.9,
    "avaliacoes": 689,
    "vendidos": 1138,
    "estoque": 49,
    "especificacoes": [
      ["Resolução", "4K UHD / HDR"],
      ["Taxa", "60 Hz a 120 Hz"],
      ["Sistema", "Smart TV integrado"],
      ["Entradas", "3x HDMI 2.1"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Televisor", "Controle remoto", "2 pilhas AA", "Base", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-tv-43-smart",
    "nome": "Nexa TV 43\" Smart",
    "categoria": "tv",
    "preco": 1999,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-tv-43-smart.jpg",
    "icone": "tv",
    "resumo": "Tamanho certo para quarto e sala pequena, com Alexa integrada.",
    "descricao": "Tamanho certo para quarto e sala pequena, com Alexa integrada. O Nexa TV 43\" Smart transforma a sala em sala de cinema. Cores fiéis, preto de verdade e sistema rápido que não faz você esperar para abrir o aplicativo de streaming.\n\nO que você precisa saber antes de comprar:\n\nResolução: 4K UHD / HDR · Taxa: 60 Hz a 120 Hz · Sistema: Smart TV integrado · Entradas: 3x HDMI 2.1 · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.8,
    "avaliacoes": 726,
    "vendidos": 1199,
    "estoque": 15,
    "especificacoes": [
      ["Resolução", "4K UHD / HDR"],
      ["Taxa", "60 Hz a 120 Hz"],
      ["Sistema", "Smart TV integrado"],
      ["Entradas", "3x HDMI 2.1"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Televisor", "Controle remoto", "2 pilhas AA", "Base", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-tv-65-oled",
    "nome": "Nexa TV 65\" OLED",
    "categoria": "tv",
    "preco": 6499,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-tv-65-oled.jpg",
    "icone": "tv",
    "resumo": "Preto absoluto, 120Hz e jogos sem atraso com ALLM e VRR.",
    "descricao": "Preto absoluto, 120Hz e jogos sem atraso com ALLM e VRR. O Nexa TV 65\" OLED transforma a sala em sala de cinema. Cores fiéis, preto de verdade e sistema rápido que não faz você esperar para abrir o aplicativo de streaming.\n\nO que você precisa saber antes de comprar:\n\nResolução: 4K UHD / HDR · Taxa: 60 Hz a 120 Hz · Sistema: Smart TV integrado · Entradas: 3x HDMI 2.1 · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.7,
    "avaliacoes": 763,
    "vendidos": 1260,
    "estoque": 28,
    "especificacoes": [
      ["Resolução", "4K UHD / HDR"],
      ["Taxa", "60 Hz a 120 Hz"],
      ["Sistema", "Smart TV integrado"],
      ["Entradas", "3x HDMI 2.1"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Televisor", "Controle remoto", "2 pilhas AA", "Base", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-monitor-27",
    "nome": "Nexa Monitor 27\"",
    "categoria": "tv",
    "preco": 1399,
    "promo": 1199,
    "imagem": "assets/img/produtos/nexa-monitor-27.jpg",
    "icone": "desktop",
    "resumo": "IPS 1440p, 100% sRGB e porta USB-C com carga de 65W.",
    "descricao": "IPS 1440p, 100% sRGB e porta USB-C com carga de 65W. O Nexa Monitor 27\" transforma a sala em sala de cinema. Cores fiéis, preto de verdade e sistema rápido que não faz você esperar para abrir o aplicativo de streaming.\n\nO que você precisa saber antes de comprar:\n\nResolução: 4K UHD / HDR · Taxa: 60 Hz a 120 Hz · Sistema: Smart TV integrado · Entradas: 3x HDMI 2.1 · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.6,
    "avaliacoes": 800,
    "vendidos": 1321,
    "estoque": 41,
    "especificacoes": [
      ["Resolução", "4K UHD / HDR"],
      ["Taxa", "60 Hz a 120 Hz"],
      ["Sistema", "Smart TV integrado"],
      ["Entradas", "3x HDMI 2.1"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Televisor", "Controle remoto", "2 pilhas AA", "Base", "Manual"],
    "freteGratis": true,
    "destaque": true
  },
  {
    "id": "nexa-projector-mini",
    "nome": "Nexa Projector Mini",
    "categoria": "tv",
    "preco": 2199,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-projector-mini.jpg",
    "icone": "video",
    "resumo": "Projeta 120 polegadas em qualquer parede, com foco automático.",
    "descricao": "Projeta 120 polegadas em qualquer parede, com foco automático. O Nexa Projector Mini transforma a sala em sala de cinema. Cores fiéis, preto de verdade e sistema rápido que não faz você esperar para abrir o aplicativo de streaming.\n\nO que você precisa saber antes de comprar:\n\nResolução: 4K UHD / HDR · Taxa: 60 Hz a 120 Hz · Sistema: Smart TV integrado · Entradas: 3x HDMI 2.1 · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.5,
    "avaliacoes": 837,
    "vendidos": 1382,
    "estoque": 7,
    "especificacoes": [
      ["Resolução", "4K UHD / HDR"],
      ["Taxa", "60 Hz a 120 Hz"],
      ["Sistema", "Smart TV integrado"],
      ["Entradas", "3x HDMI 2.1"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Televisor", "Controle remoto", "2 pilhas AA", "Base", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-console-s",
    "nome": "Nexa Console S",
    "categoria": "games",
    "preco": 3999,
    "promo": 3599,
    "imagem": "assets/img/produtos/nexa-console-s.jpg",
    "icone": "gamepad",
    "resumo": "4K a 60fps, 1TB de SSD e catálogo compatível com gerações anteriores.",
    "descricao": "4K a 60fps, 1TB de SSD e catálogo compatível com gerações anteriores. Com o Nexa Console S a jogatina fica mais séria: resposta imediata, acabamento firme na mão e nada de atraso no momento decisivo.\n\nO que você precisa saber antes de comprar:\n\nCompatível: Consoles atuais · Conexão: Sem fio + cabo · Recarga: USB-C · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.4,
    "avaliacoes": 874,
    "vendidos": 1443,
    "estoque": 20,
    "especificacoes": [
      ["Compatível", "Consoles atuais"],
      ["Conexão", "Sem fio + cabo"],
      ["Recarga", "USB-C"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Console", "1 controle", "Cabo de energia", "HDMI", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-console-x",
    "nome": "Nexa Console X",
    "categoria": "games",
    "preco": 4999,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-console-x.jpg",
    "icone": "gamepad",
    "resumo": "Mais potência da família: 120Hz, ray tracing e carregamento instantâneo.",
    "descricao": "Mais potência da família: 120Hz, ray tracing e carregamento instantâneo. Com o Nexa Console X a jogatina fica mais séria: resposta imediata, acabamento firme na mão e nada de atraso no momento decisivo.\n\nO que você precisa saber antes de comprar:\n\nCompatível: Consoles atuais · Conexão: Sem fio + cabo · Recarga: USB-C · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.3,
    "avaliacoes": 41,
    "vendidos": 1504,
    "estoque": 33,
    "especificacoes": [
      ["Compatível", "Consoles atuais"],
      ["Conexão", "Sem fio + cabo"],
      ["Recarga", "USB-C"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Console", "1 controle", "Cabo de energia", "HDMI", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-controller-pro",
    "nome": "Nexa Controller Pro",
    "categoria": "games",
    "preco": 449,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-controller-pro.jpg",
    "icone": "gamepad",
    "resumo": "Gatilhos adaptativos, grip texturizado e conexão com latência mínima.",
    "descricao": "Gatilhos adaptativos, grip texturizado e conexão com latência mínima. Com o Nexa Controller Pro a jogatina fica mais séria: resposta imediata, acabamento firme na mão e nada de atraso no momento decisivo.\n\nO que você precisa saber antes de comprar:\n\nCompatível: Consoles atuais · Conexão: Sem fio + cabo · Recarga: USB-C · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 5.0,
    "avaliacoes": 78,
    "vendidos": 1565,
    "estoque": 46,
    "especificacoes": [
      ["Compatível", "Consoles atuais"],
      ["Conexão", "Sem fio + cabo"],
      ["Recarga", "USB-C"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Console", "1 controle", "Cabo de energia", "HDMI", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-gaming-headset",
    "nome": "Nexa Gaming Headset",
    "categoria": "games",
    "preco": 649,
    "promo": 549,
    "imagem": "assets/img/produtos/nexa-gaming-headset.jpg",
    "icone": "headphones",
    "resumo": "Som 7.1 virtual, microfone destacável e almofadas geladas.",
    "descricao": "Som 7.1 virtual, microfone destacável e almofadas geladas. Com o Nexa Gaming Headset a jogatina fica mais séria: resposta imediata, acabamento firme na mão e nada de atraso no momento decisivo.\n\nO que você precisa saber antes de comprar:\n\nCompatível: Consoles atuais · Conexão: Sem fio + cabo · Recarga: USB-C · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.9,
    "avaliacoes": 115,
    "vendidos": 1626,
    "estoque": 12,
    "especificacoes": [
      ["Compatível", "Consoles atuais"],
      ["Conexão", "Sem fio + cabo"],
      ["Recarga", "USB-C"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Console", "1 controle", "Cabo de energia", "HDMI", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-racing-wheel",
    "nome": "Nexa Racing Wheel",
    "categoria": "games",
    "preco": 1299,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-racing-wheel.jpg",
    "icone": "gamepad",
    "resumo": "Force feedback real, pedais de metal e 270° de rotação.",
    "descricao": "Force feedback real, pedais de metal e 270° de rotação. Com o Nexa Racing Wheel a jogatina fica mais séria: resposta imediata, acabamento firme na mão e nada de atraso no momento decisivo.\n\nO que você precisa saber antes de comprar:\n\nCompatível: Consoles atuais · Conexão: Sem fio + cabo · Recarga: USB-C · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.8,
    "avaliacoes": 152,
    "vendidos": 1687,
    "estoque": 25,
    "especificacoes": [
      ["Compatível", "Consoles atuais"],
      ["Conexão", "Sem fio + cabo"],
      ["Recarga", "USB-C"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Console", "1 controle", "Cabo de energia", "HDMI", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-watch-s3",
    "nome": "Nexa Watch S3",
    "categoria": "wearables",
    "preco": 1299,
    "promo": 1099,
    "imagem": "assets/img/produtos/nexa-watch-s3.jpg",
    "icone": "clock",
    "resumo": "GPS integrado, oxímetro e 10 dias de bateria com tela sempre ligada.",
    "descricao": "GPS integrado, oxímetro e 10 dias de bateria com tela sempre ligada. O Nexa Watch S3 acompanha o seu dia inteiro sem interromper: treino, notificação e sono, tudo num pulso que você esquece que está usando.\n\nO que você precisa saber antes de comprar:\n\nTela: AMOLED sempre ligada · Bateria: Até 14 dias · Sensores: Cardíaco, oxímetro, GPS · Resistência: 5 ATM · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.7,
    "avaliacoes": 189,
    "vendidos": 1748,
    "estoque": 38,
    "especificacoes": [
      ["Tela", "AMOLED sempre ligada"],
      ["Bateria", "Até 14 dias"],
      ["Sensores", "Cardíaco, oxímetro, GPS"],
      ["Resistência", "5 ATM"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Relógio", "Cabo magnético de carga", "Faixa extra", "Manual"],
    "freteGratis": true,
    "destaque": true
  },
  {
    "id": "nexa-watch-ultra",
    "nome": "Nexa Watch Ultra",
    "categoria": "wearables",
    "preco": 2499,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-watch-ultra.jpg",
    "icone": "clock",
    "resumo": "Titânio, 300m de profundidade e mapa topográfico embarcado.",
    "descricao": "Titânio, 300m de profundidade e mapa topográfico embarcado. O Nexa Watch Ultra acompanha o seu dia inteiro sem interromper: treino, notificação e sono, tudo num pulso que você esquece que está usando.\n\nO que você precisa saber antes de comprar:\n\nTela: AMOLED sempre ligada · Bateria: Até 14 dias · Sensores: Cardíaco, oxímetro, GPS · Resistência: 5 ATM · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.6,
    "avaliacoes": 226,
    "vendidos": 1809,
    "estoque": 4,
    "especificacoes": [
      ["Tela", "AMOLED sempre ligada"],
      ["Bateria", "Até 14 dias"],
      ["Sensores", "Cardíaco, oxímetro, GPS"],
      ["Resistência", "5 ATM"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Relógio", "Cabo magnético de carga", "Faixa extra", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-band-5",
    "nome": "Nexa Band 5",
    "categoria": "wearables",
    "preco": 349,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-band-5.jpg",
    "icone": "stopwatch",
    "resumo": "Faixa cardíaca 24h, 14 dias de bateria e notificações do celular.",
    "descricao": "Faixa cardíaca 24h, 14 dias de bateria e notificações do celular. O Nexa Band 5 acompanha o seu dia inteiro sem interromper: treino, notificação e sono, tudo num pulso que você esquece que está usando.\n\nO que você precisa saber antes de comprar:\n\nTela: AMOLED sempre ligada · Bateria: Até 14 dias · Sensores: Cardíaco, oxímetro, GPS · Resistência: 5 ATM · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.5,
    "avaliacoes": 263,
    "vendidos": 1870,
    "estoque": 17,
    "especificacoes": [
      ["Tela", "AMOLED sempre ligada"],
      ["Bateria", "Até 14 dias"],
      ["Sensores", "Cardíaco, oxímetro, GPS"],
      ["Resistência", "5 ATM"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Relógio", "Cabo magnético de carga", "Faixa extra", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-watch-kids",
    "nome": "Nexa Watch Kids",
    "categoria": "wearables",
    "preco": 499,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-watch-kids.jpg",
    "icone": "clock",
    "resumo": "Ligação de emergência, geolocalização e resistência a batidas.",
    "descricao": "Ligação de emergência, geolocalização e resistência a batidas. O Nexa Watch Kids acompanha o seu dia inteiro sem interromper: treino, notificação e sono, tudo num pulso que você esquece que está usando.\n\nO que você precisa saber antes de comprar:\n\nTela: AMOLED sempre ligada · Bateria: Até 14 dias · Sensores: Cardíaco, oxímetro, GPS · Resistência: 5 ATM · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.4,
    "avaliacoes": 300,
    "vendidos": 1931,
    "estoque": 30,
    "especificacoes": [
      ["Tela", "AMOLED sempre ligada"],
      ["Bateria", "Até 14 dias"],
      ["Sensores", "Cardíaco, oxímetro, GPS"],
      ["Resistência", "5 ATM"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Relógio", "Cabo magnético de carga", "Faixa extra", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-ring-smart",
    "nome": "Nexa Ring Smart",
    "categoria": "wearables",
    "preco": 799,
    "promo": 649,
    "imagem": "assets/img/produtos/nexa-ring-smart.jpg",
    "icone": "ring",
    "resumo": "Dorme, treina e monitora sem tela nenhuma — autonomia de 6 dias.",
    "descricao": "Dorme, treina e monitora sem tela nenhuma — autonomia de 6 dias. O Nexa Ring Smart acompanha o seu dia inteiro sem interromper: treino, notificação e sono, tudo num pulso que você esquece que está usando.\n\nO que você precisa saber antes de comprar:\n\nTela: AMOLED sempre ligada · Bateria: Até 14 dias · Sensores: Cardíaco, oxímetro, GPS · Resistência: 5 ATM · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.3,
    "avaliacoes": 337,
    "vendidos": 1992,
    "estoque": 43,
    "especificacoes": [
      ["Tela", "AMOLED sempre ligada"],
      ["Bateria", "Até 14 dias"],
      ["Sensores", "Cardíaco, oxímetro, GPS"],
      ["Resistência", "5 ATM"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Relógio", "Cabo magnético de carga", "Faixa extra", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-cam-indoor",
    "nome": "Nexa Cam Indoor",
    "categoria": "casa",
    "preco": 399,
    "promo": 299,
    "imagem": "assets/img/produtos/nexa-cam-indoor.jpg",
    "icone": "video",
    "resumo": "2K com visão noturna em cor, detecção de pessoa e aviso no celular.",
    "descricao": "2K com visão noturna em cor, detecção de pessoa e aviso no celular. O Nexa Cam Indoor deixa a rotina mais fácil: você liga, confere e avisa pelo celular, de qualquer lugar, sem precisar de técnico em casa.\n\nO que você precisa saber antes de comprar:\n\nConexão: Wi-Fi 2,4 GHz · App: iOS e Android · Instalação: Sem técnico · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 5.0,
    "avaliacoes": 374,
    "vendidos": 2053,
    "estoque": 9,
    "especificacoes": [
      ["Conexão", "Wi-Fi 2,4 GHz"],
      ["App", "iOS e Android"],
      ["Instalação", "Sem técnico"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Suporte e parafusos", "Cabo", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-cam-outdoor",
    "nome": "Nexa Cam Outdoor",
    "categoria": "casa",
    "preco": 549,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-cam-outdoor.jpg",
    "icone": "video",
    "resumo": "À prova de chuva, alarme embutido e armazenamento local em cartão.",
    "descricao": "À prova de chuva, alarme embutido e armazenamento local em cartão. O Nexa Cam Outdoor deixa a rotina mais fácil: você liga, confere e avisa pelo celular, de qualquer lugar, sem precisar de técnico em casa.\n\nO que você precisa saber antes de comprar:\n\nConexão: Wi-Fi 2,4 GHz · App: iOS e Android · Instalação: Sem técnico · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.9,
    "avaliacoes": 411,
    "vendidos": 2114,
    "estoque": 22,
    "especificacoes": [
      ["Conexão", "Wi-Fi 2,4 GHz"],
      ["App", "iOS e Android"],
      ["Instalação", "Sem técnico"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Suporte e parafusos", "Cabo", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-bulb-rgb-kit-4",
    "nome": "Nexa Bulb RGB (kit 4)",
    "categoria": "casa",
    "preco": 279,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-bulb-rgb-kit-4.jpg",
    "icone": "lightbulb",
    "resumo": "16 milhões de cores, sincroniza com música e liga por comando de voz.",
    "descricao": "16 milhões de cores, sincroniza com música e liga por comando de voz. O Nexa Bulb RGB (kit 4) deixa a rotina mais fácil: você liga, confere e avisa pelo celular, de qualquer lugar, sem precisar de técnico em casa.\n\nO que você precisa saber antes de comprar:\n\nConexão: Wi-Fi 2,4 GHz · App: iOS e Android · Instalação: Sem técnico · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.8,
    "avaliacoes": 448,
    "vendidos": 2175,
    "estoque": 35,
    "especificacoes": [
      ["Conexão", "Wi-Fi 2,4 GHz"],
      ["App", "iOS e Android"],
      ["Instalação", "Sem técnico"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Suporte e parafusos", "Cabo", "Manual"],
    "freteGratis": true,
    "destaque": true
  },
  {
    "id": "nexa-smart-plug",
    "nome": "Nexa Smart Plug",
    "categoria": "casa",
    "preco": 149,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-smart-plug.jpg",
    "icone": "plug",
    "resumo": "Liga qualquer aparelho pelo celular e mede o consumo em tempo real.",
    "descricao": "Liga qualquer aparelho pelo celular e mede o consumo em tempo real. O Nexa Smart Plug deixa a rotina mais fácil: você liga, confere e avisa pelo celular, de qualquer lugar, sem precisar de técnico em casa.\n\nO que você precisa saber antes de comprar:\n\nConexão: Wi-Fi 2,4 GHz · App: iOS e Android · Instalação: Sem técnico · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.7,
    "avaliacoes": 485,
    "vendidos": 2236,
    "estoque": 48,
    "especificacoes": [
      ["Conexão", "Wi-Fi 2,4 GHz"],
      ["App", "iOS e Android"],
      ["Instalação", "Sem técnico"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Suporte e parafusos", "Cabo", "Manual"],
    "freteGratis": false,
    "destaque": false
  },
  {
    "id": "nexa-doorbell",
    "nome": "Nexa Doorbell",
    "categoria": "casa",
    "preco": 429,
    "promo": 359,
    "imagem": "assets/img/produtos/nexa-doorbell.jpg",
    "icone": "bell",
    "resumo": "Vídeo em tempo real, fala pelo interfone e grava só quando há movimento.",
    "descricao": "Vídeo em tempo real, fala pelo interfone e grava só quando há movimento. O Nexa Doorbell deixa a rotina mais fácil: você liga, confere e avisa pelo celular, de qualquer lugar, sem precisar de técnico em casa.\n\nO que você precisa saber antes de comprar:\n\nConexão: Wi-Fi 2,4 GHz · App: iOS e Android · Instalação: Sem técnico · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.6,
    "avaliacoes": 522,
    "vendidos": 2297,
    "estoque": 14,
    "especificacoes": [
      ["Conexão", "Wi-Fi 2,4 GHz"],
      ["App", "iOS e Android"],
      ["Instalação", "Sem técnico"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Suporte e parafusos", "Cabo", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-sensor-kit",
    "nome": "Nexa Sensor Kit",
    "categoria": "casa",
    "preco": 329,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-sensor-kit.jpg",
    "icone": "shield-halved",
    "resumo": "4 sensores de porta e janela que avisam antes de alguém entrar.",
    "descricao": "4 sensores de porta e janela que avisam antes de alguém entrar. O Nexa Sensor Kit deixa a rotina mais fácil: você liga, confere e avisa pelo celular, de qualquer lugar, sem precisar de técnico em casa.\n\nO que você precisa saber antes de comprar:\n\nConexão: Wi-Fi 2,4 GHz · App: iOS e Android · Instalação: Sem técnico · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.5,
    "avaliacoes": 559,
    "vendidos": 2358,
    "estoque": 27,
    "especificacoes": [
      ["Conexão", "Wi-Fi 2,4 GHz"],
      ["App", "iOS e Android"],
      ["Instalação", "Sem técnico"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Suporte e parafusos", "Cabo", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-air-fryer-5l",
    "nome": "Nexa Air Fryer 5L",
    "categoria": "eletro",
    "preco": 549,
    "promo": 449,
    "imagem": "assets/img/produtos/nexa-air-fryer-5l.jpg",
    "icone": "blender",
    "resumo": "Tela digital, 8 programas e cesto que vai à lava-louças.",
    "descricao": "Tela digital, 8 programas e cesto que vai à lava-louças. O Nexa Air Fryer 5L foi desenhado para o uso de todo dia — simples de operar, fácil de limpar e com peça de reposição disponível no Brasil.\n\nO que você precisa saber antes de comprar:\n\nPotência: 1.000 W a 1.800 W · Voltagem: Bivolt · Peso: Leve, manuseio fácil · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.4,
    "avaliacoes": 596,
    "vendidos": 2419,
    "estoque": 40,
    "especificacoes": [
      ["Potência", "1.000 W a 1.800 W"],
      ["Voltagem", "Bivolt"],
      ["Peso", "Leve, manuseio fácil"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Aparelho", "Recipiente", "Manual", "Nota fiscal"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-blender-pro",
    "nome": "Nexa Blender Pro",
    "categoria": "eletro",
    "preco": 399,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-blender-pro.jpg",
    "icone": "blender",
    "resumo": "Lâmina inox de 6 pontas, jarra de 1,8L e motor de 1.200W.",
    "descricao": "Lâmina inox de 6 pontas, jarra de 1,8L e motor de 1.200W. O Nexa Blender Pro foi desenhado para o uso de todo dia — simples de operar, fácil de limpar e com peça de reposição disponível no Brasil.\n\nO que você precisa saber antes de comprar:\n\nPotência: 1.000 W a 1.800 W · Voltagem: Bivolt · Peso: Leve, manuseio fácil · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.3,
    "avaliacoes": 633,
    "vendidos": 80,
    "estoque": 6,
    "especificacoes": [
      ["Potência", "1.000 W a 1.800 W"],
      ["Voltagem", "Bivolt"],
      ["Peso", "Leve, manuseio fácil"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Aparelho", "Recipiente", "Manual", "Nota fiscal"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-coffee-machine",
    "nome": "Nexa Coffee Machine",
    "categoria": "eletro",
    "preco": 899,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-coffee-machine.jpg",
    "icone": "mug-hot",
    "resumo": "Café coado ou espresso, com espumador de leite integrado.",
    "descricao": "Café coado ou espresso, com espumador de leite integrado. O Nexa Coffee Machine foi desenhado para o uso de todo dia — simples de operar, fácil de limpar e com peça de reposição disponível no Brasil.\n\nO que você precisa saber antes de comprar:\n\nPotência: 1.000 W a 1.800 W · Voltagem: Bivolt · Peso: Leve, manuseio fácil · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 5.0,
    "avaliacoes": 670,
    "vendidos": 141,
    "estoque": 19,
    "especificacoes": [
      ["Potência", "1.000 W a 1.800 W"],
      ["Voltagem", "Bivolt"],
      ["Peso", "Leve, manuseio fácil"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Aparelho", "Recipiente", "Manual", "Nota fiscal"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-fan-smart",
    "nome": "Nexa Fan Smart",
    "categoria": "eletro",
    "preco": 329,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-fan-smart.jpg",
    "icone": "fan",
    "resumo": "Breeze natural, timer e controle pelo aplicativo ou voz.",
    "descricao": "Breeze natural, timer e controle pelo aplicativo ou voz. O Nexa Fan Smart foi desenhado para o uso de todo dia — simples de operar, fácil de limpar e com peça de reposição disponível no Brasil.\n\nO que você precisa saber antes de comprar:\n\nPotência: 1.000 W a 1.800 W · Voltagem: Bivolt · Peso: Leve, manuseio fácil · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.9,
    "avaliacoes": 707,
    "vendidos": 202,
    "estoque": 32,
    "especificacoes": [
      ["Potência", "1.000 W a 1.800 W"],
      ["Voltagem", "Bivolt"],
      ["Peso", "Leve, manuseio fácil"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Aparelho", "Recipiente", "Manual", "Nota fiscal"],
    "freteGratis": true,
    "destaque": true
  },
  {
    "id": "nexa-vacuum-robot",
    "nome": "Nexa Vacuum Robot",
    "categoria": "eletro",
    "preco": 1899,
    "promo": 1599,
    "imagem": "assets/img/produtos/nexa-vacuum-robot.jpg",
    "icone": "robot",
    "resumo": "Mapeia a casa, esquiva de obstáculos e volta sozinho para recarregar.",
    "descricao": "Mapeia a casa, esquiva de obstáculos e volta sozinho para recarregar. O Nexa Vacuum Robot foi desenhado para o uso de todo dia — simples de operar, fácil de limpar e com peça de reposição disponível no Brasil.\n\nO que você precisa saber antes de comprar:\n\nPotência: 1.000 W a 1.800 W · Voltagem: Bivolt · Peso: Leve, manuseio fácil · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.8,
    "avaliacoes": 744,
    "vendidos": 263,
    "estoque": 45,
    "especificacoes": [
      ["Potência", "1.000 W a 1.800 W"],
      ["Voltagem", "Bivolt"],
      ["Peso", "Leve, manuseio fácil"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Aparelho", "Recipiente", "Manual", "Nota fiscal"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-kettle-steel",
    "nome": "Nexa Kettle Steel",
    "categoria": "eletro",
    "preco": 199,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-kettle-steel.jpg",
    "icone": "temperature-half",
    "resumo": "Aço inox, 1,7L e desliga automático ao ferver — sem risco de esquecer.",
    "descricao": "Aço inox, 1,7L e desliga automático ao ferver — sem risco de esquecer. O Nexa Kettle Steel foi desenhado para o uso de todo dia — simples de operar, fácil de limpar e com peça de reposição disponível no Brasil.\n\nO que você precisa saber antes de comprar:\n\nPotência: 1.000 W a 1.800 W · Voltagem: Bivolt · Peso: Leve, manuseio fácil · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.7,
    "avaliacoes": 781,
    "vendidos": 324,
    "estoque": 11,
    "especificacoes": [
      ["Potência", "1.000 W a 1.800 W"],
      ["Voltagem", "Bivolt"],
      ["Peso", "Leve, manuseio fácil"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Aparelho", "Recipiente", "Manual", "Nota fiscal"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-cam-dslr-x",
    "nome": "Nexa Cam DSLR X",
    "categoria": "cameras",
    "preco": 4299,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-cam-dslr-x.jpg",
    "icone": "camera",
    "resumo": "Sensor APS-C de 24MP, 4K60 e estabilização de 5 eixos.",
    "descricao": "Sensor APS-C de 24MP, 4K60 e estabilização de 5 eixos. O Nexa Cam DSLR X pega o momento antes que ele passe. Foco rápido, vídeo estável e controle manual quando você quiser sair do automático.\n\nO que você precisa saber antes de comprar:\n\nVídeo: 4K 60fps · Estabilização: Digital e ótica · Bateria: Até 120 minutos · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.6,
    "avaliacoes": 818,
    "vendidos": 385,
    "estoque": 24,
    "especificacoes": [
      ["Vídeo", "4K 60fps"],
      ["Estabilização", "Digital e ótica"],
      ["Bateria", "Até 120 minutos"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Câmera", "Bateria", "Carregador", "Cabo", "Alça", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-action-cam-4k",
    "nome": "Nexa Action Cam 4K",
    "categoria": "cameras",
    "preco": 1499,
    "promo": 1249,
    "imagem": "assets/img/produtos/nexa-action-cam-4k.jpg",
    "icone": "video",
    "resumo": "Imersão à prova d'água até 10m e modo noturno com estabilização.",
    "descricao": "Imersão à prova d'água até 10m e modo noturno com estabilização. O Nexa Action Cam 4K pega o momento antes que ele passe. Foco rápido, vídeo estável e controle manual quando você quiser sair do automático.\n\nO que você precisa saber antes de comprar:\n\nVídeo: 4K 60fps · Estabilização: Digital e ótica · Bateria: Até 120 minutos · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.5,
    "avaliacoes": 855,
    "vendidos": 446,
    "estoque": 37,
    "especificacoes": [
      ["Vídeo", "4K 60fps"],
      ["Estabilização", "Digital e ótica"],
      ["Bateria", "Até 120 minutos"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Câmera", "Bateria", "Carregador", "Cabo", "Alça", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-cam-mirrorless",
    "nome": "Nexa Cam Mirrorless",
    "categoria": "cameras",
    "preco": 5699,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-cam-mirrorless.jpg",
    "icone": "camera",
    "resumo": "Autofoco por olhos, leitura eletrônica e tela articulada para vlog.",
    "descricao": "Autofoco por olhos, leitura eletrônica e tela articulada para vlog. O Nexa Cam Mirrorless pega o momento antes que ele passe. Foco rápido, vídeo estável e controle manual quando você quiser sair do automático.\n\nO que você precisa saber antes de comprar:\n\nVídeo: 4K 60fps · Estabilização: Digital e ótica · Bateria: Até 120 minutos · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.4,
    "avaliacoes": 892,
    "vendidos": 507,
    "estoque": 3,
    "especificacoes": [
      ["Vídeo", "4K 60fps"],
      ["Estabilização", "Digital e ótica"],
      ["Bateria", "Até 120 minutos"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Câmera", "Bateria", "Carregador", "Cabo", "Alça", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-drone-cam",
    "nome": "Nexa Drone Cam",
    "categoria": "cameras",
    "preco": 3499,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-drone-cam.jpg",
    "icone": "helicopter",
    "resumo": "Voo de 34 minutos, 4K HDR e retorno automático para o ponto inicial.",
    "descricao": "Voo de 34 minutos, 4K HDR e retorno automático para o ponto inicial. O Nexa Drone Cam pega o momento antes que ele passe. Foco rápido, vídeo estável e controle manual quando você quiser sair do automático.\n\nO que você precisa saber antes de comprar:\n\nVídeo: 4K 60fps · Estabilização: Digital e ótica · Bateria: Até 120 minutos · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.3,
    "avaliacoes": 59,
    "vendidos": 568,
    "estoque": 16,
    "especificacoes": [
      ["Vídeo", "4K 60fps"],
      ["Estabilização", "Digital e ótica"],
      ["Bateria", "Até 120 minutos"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Câmera", "Bateria", "Carregador", "Cabo", "Alça", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-cam-dash",
    "nome": "Nexa Cam Dash",
    "categoria": "cameras",
    "preco": 649,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-cam-dash.jpg",
    "icone": "car",
    "resumo": "Grava a frente e o câmbio, com detecção de movimento estacionado.",
    "descricao": "Grava a frente e o câmbio, com detecção de movimento estacionado. O Nexa Cam Dash pega o momento antes que ele passe. Foco rápido, vídeo estável e controle manual quando você quiser sair do automático.\n\nO que você precisa saber antes de comprar:\n\nVídeo: 4K 60fps · Estabilização: Digital e ótica · Bateria: Até 120 minutos · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 5.0,
    "avaliacoes": 96,
    "vendidos": 629,
    "estoque": 29,
    "especificacoes": [
      ["Vídeo", "4K 60fps"],
      ["Estabilização", "Digital e ótica"],
      ["Bateria", "Até 120 minutos"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Câmera", "Bateria", "Carregador", "Cabo", "Alça", "Manual"],
    "freteGratis": true,
    "destaque": true
  },
  {
    "id": "nexa-mouse-light",
    "nome": "Nexa Mouse Light",
    "categoria": "perifericos",
    "preco": 249,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-mouse-light.jpg",
    "icone": "computer-mouse",
    "resumo": "6.400 DPI, 70g de peso e conexão sem atraso de 2,4GHz.",
    "descricao": "6.400 DPI, 70g de peso e conexão sem atraso de 2,4GHz. O Nexa Mouse Light entra na bancada sem estragar o visual e aguenta o ritmo de trabalho pesado, do primeiro café até a última planilha.\n\nO que você precisa saber antes de comprar:\n\nConexão: USB-C / Bluetooth · Compatível: Windows, macOS · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.9,
    "avaliacoes": 133,
    "vendidos": 690,
    "estoque": 42,
    "especificacoes": [
      ["Conexão", "USB-C / Bluetooth"],
      ["Compatível", "Windows, macOS"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Cabo", "Adaptador", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-keyboard-mech",
    "nome": "Nexa Keyboard Mech",
    "categoria": "perifericos",
    "preco": 549,
    "promo": 449,
    "imagem": "assets/img/produtos/nexa-keyboard-mech.jpg",
    "icone": "keyboard",
    "resumo": "Switches lineares, abas magnéticas e iluminação por tecla.",
    "descricao": "Switches lineares, abas magnéticas e iluminação por tecla. O Nexa Keyboard Mech entra na bancada sem estragar o visual e aguenta o ritmo de trabalho pesado, do primeiro café até a última planilha.\n\nO que você precisa saber antes de comprar:\n\nConexão: USB-C / Bluetooth · Compatível: Windows, macOS · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.8,
    "avaliacoes": 170,
    "vendidos": 751,
    "estoque": 8,
    "especificacoes": [
      ["Conexão", "USB-C / Bluetooth"],
      ["Compatível", "Windows, macOS"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Cabo", "Adaptador", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-monitor-ultrawide",
    "nome": "Nexa Monitor UltraWide",
    "categoria": "perifericos",
    "preco": 3999,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-monitor-ultrawide.jpg",
    "icone": "desktop",
    "resumo": "34 polegadas curvas, 144Hz e coluna de conectividade por USB-C.",
    "descricao": "34 polegadas curvas, 144Hz e coluna de conectividade por USB-C. O Nexa Monitor UltraWide entra na bancada sem estragar o visual e aguenta o ritmo de trabalho pesado, do primeiro café até a última planilha.\n\nO que você precisa saber antes de comprar:\n\nConexão: USB-C / Bluetooth · Compatível: Windows, macOS · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.7,
    "avaliacoes": 207,
    "vendidos": 812,
    "estoque": 21,
    "especificacoes": [
      ["Conexão", "USB-C / Bluetooth"],
      ["Compatível", "Windows, macOS"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Cabo", "Adaptador", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-ssd-1tb",
    "nome": "Nexa SSD 1TB",
    "categoria": "perifericos",
    "preco": 499,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-ssd-1tb.jpg",
    "icone": "hard-drive",
    "resumo": "NVMe de 7.000MB/s — o notebook que demorava 2 minutos agora abre em 8s.",
    "descricao": "NVMe de 7.000MB/s — o notebook que demorava 2 minutos agora abre em 8s. O Nexa SSD 1TB entra na bancada sem estragar o visual e aguenta o ritmo de trabalho pesado, do primeiro café até a última planilha.\n\nO que você precisa saber antes de comprar:\n\nConexão: USB-C / Bluetooth · Compatível: Windows, macOS · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.6,
    "avaliacoes": 244,
    "vendidos": 873,
    "estoque": 34,
    "especificacoes": [
      ["Conexão", "USB-C / Bluetooth"],
      ["Compatível", "Windows, macOS"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Cabo", "Adaptador", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-webcam-4k",
    "nome": "Nexa Webcam 4K",
    "categoria": "perifericos",
    "preco": 379,
    "promo": null,
    "imagem": "assets/img/produtos/nexa-webcam-4k.jpg",
    "icone": "video",
    "resumo": "Autofoco rápido, luz de estúdio embutida e microfone estéreo.",
    "descricao": "Autofoco rápido, luz de estúdio embutida e microfone estéreo. O Nexa Webcam 4K entra na bancada sem estragar o visual e aguenta o ritmo de trabalho pesado, do primeiro café até a última planilha.\n\nO que você precisa saber antes de comprar:\n\nConexão: USB-C / Bluetooth · Compatível: Windows, macOS · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.5,
    "avaliacoes": 281,
    "vendidos": 934,
    "estoque": 47,
    "especificacoes": [
      ["Conexão", "USB-C / Bluetooth"],
      ["Compatível", "Windows, macOS"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Cabo", "Adaptador", "Manual"],
    "freteGratis": true,
    "destaque": false
  },
  {
    "id": "nexa-router-wi-fi-6",
    "nome": "Nexa Router Wi-Fi 6",
    "categoria": "perifericos",
    "preco": 599,
    "promo": 499,
    "imagem": "assets/img/produtos/nexa-router-wi-fi-6.jpg",
    "icone": "wifi",
    "resumo": "Cobre até 200m², separa a rede dos visitantes e prioriza jogos.",
    "descricao": "Cobre até 200m², separa a rede dos visitantes e prioriza jogos. O Nexa Router Wi-Fi 6 entra na bancada sem estragar o visual e aguenta o ritmo de trabalho pesado, do primeiro café até a última planilha.\n\nO que você precisa saber antes de comprar:\n\nConexão: USB-C / Bluetooth · Compatível: Windows, macOS · Garantia: 12 meses\n\nReceba e teste — se não for o que esperava, você tem 7 dias para devolver sem justificar nada, e 12 meses de garantia contra defeito de fabricação.\n\nEnvio: postamos em até 1 dia útil. Capitais e regiões metropolitanas recebem em 2 a 4 dias úteis; demais localidades, de 5 a 9 dias úteis.",
    "nota": 4.4,
    "avaliacoes": 318,
    "vendidos": 995,
    "estoque": 13,
    "especificacoes": [
      ["Conexão", "USB-C / Bluetooth"],
      ["Compatível", "Windows, macOS"],
      ["Garantia", "12 meses"]
    ],
    "naCaixa": ["Produto", "Cabo", "Adaptador", "Manual"],
    "freteGratis": true,
    "destaque": false
  }
];

/* Avaliações de cada produto, pela chave do id. */
const AVALIACOES = {
  "nexa-phone-x-pro": [
    {
      "autor": "Mariana R.",
      "nota": 3,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "01/07/2025",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "08/10/2025",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 5,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "15/01/2026",
      "comprador": true
    }
  ],
  "nexa-phone-12": [
    {
      "autor": "Thiago S.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "08/10/2025",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 5,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "15/01/2026",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "22/04/2026",
      "comprador": true
    },
    {
      "autor": "Renata N.",
      "nota": 4,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "02/09/2025",
      "comprador": true
    }
  ],
  "nexa-phone-mini": [
    {
      "autor": "Larissa T.",
      "nota": 5,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "15/01/2026",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "22/04/2026",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 4,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "02/09/2025",
      "comprador": true
    },
    {
      "autor": "Rodrigo Z.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "09/12/2025",
      "comprador": true
    },
    {
      "autor": "Juliana P.",
      "nota": 5,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "16/03/2026",
      "comprador": true
    }
  ],
  "nexa-phone-ultra-5g": [
    {
      "autor": "Eduardo K.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "22/04/2026",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 4,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "02/09/2025",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 3,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "09/12/2025",
      "comprador": true
    }
  ],
  "nexa-phone-a54": [
    {
      "autor": "Mariana R.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "02/09/2025",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "09/12/2025",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 5,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "16/03/2026",
      "comprador": true
    },
    {
      "autor": "André V.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "23/08/2025",
      "comprador": true
    }
  ],
  "nexa-phone-fold": [
    {
      "autor": "Thiago S.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "09/12/2025",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 5,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "16/03/2026",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "23/08/2025",
      "comprador": true
    },
    {
      "autor": "Renata N.",
      "nota": 4,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "03/11/2025",
      "comprador": true
    },
    {
      "autor": "Marcelo Q.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "10/02/2026",
      "comprador": true
    }
  ],
  "nexabook-pro-14": [
    {
      "autor": "Larissa T.",
      "nota": 5,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "16/03/2026",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "23/08/2025",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "03/11/2025",
      "comprador": true
    }
  ],
  "nexabook-air-13": [
    {
      "autor": "Eduardo K.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "23/08/2025",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 3,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "03/11/2025",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "10/02/2026",
      "comprador": true
    },
    {
      "autor": "Beatriz L.",
      "nota": 5,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "17/07/2025",
      "comprador": true
    }
  ],
  "nexabook-gamer-x7": [
    {
      "autor": "Mariana R.",
      "nota": 4,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "03/11/2025",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "10/02/2026",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 5,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "17/07/2025",
      "comprador": true
    },
    {
      "autor": "André V.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "24/10/2025",
      "comprador": true
    },
    {
      "autor": "Camila D.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "04/01/2026",
      "comprador": true
    }
  ],
  "nexabook-slim-15": [
    {
      "autor": "Thiago S.",
      "nota": 5,
      "texto": "Atendimento respondeu rápido no WhatsApp quando tive dúvida de configuração. Isso já valeu a compra.",
      "data": "10/02/2026",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 5,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "17/07/2025",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "24/10/2025",
      "comprador": true
    }
  ],
  "nexabook-work-14": [
    {
      "autor": "Larissa T.",
      "nota": 5,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "17/07/2025",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 5,
      "texto": "Atendimento respondeu rápido no WhatsApp quando tive dúvida de configuração. Isso já valeu a compra.",
      "data": "24/10/2025",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 4,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "04/01/2026",
      "comprador": true
    },
    {
      "autor": "Rodrigo Z.",
      "nota": 3,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "11/04/2026",
      "comprador": true
    }
  ],
  "nexabook-studio-16": [
    {
      "autor": "Eduardo K.",
      "nota": 3,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "24/10/2025",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 4,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "04/01/2026",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 5,
      "texto": "Atendimento respondeu rápido no WhatsApp quando tive dúvida de configuração. Isso já valeu a compra.",
      "data": "11/04/2026",
      "comprador": true
    },
    {
      "autor": "Beatriz L.",
      "nota": 5,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "18/09/2025",
      "comprador": true
    },
    {
      "autor": "Diego H.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "25/12/2025",
      "comprador": true
    }
  ],
  "nexa-sound-max": [
    {
      "autor": "Mariana R.",
      "nota": 4,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "04/01/2026",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "11/04/2026",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 5,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "18/09/2025",
      "comprador": true
    }
  ],
  "nexa-buds-pro": [
    {
      "autor": "Thiago S.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "11/04/2026",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 5,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "18/09/2025",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "25/12/2025",
      "comprador": true
    },
    {
      "autor": "Renata N.",
      "nota": 4,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "05/03/2026",
      "comprador": true
    }
  ],
  "nexa-sound-bar-3-1": [
    {
      "autor": "Larissa T.",
      "nota": 5,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "18/09/2025",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "25/12/2025",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 3,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "05/03/2026",
      "comprador": true
    },
    {
      "autor": "Rodrigo Z.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "12/08/2025",
      "comprador": true
    },
    {
      "autor": "Juliana P.",
      "nota": 5,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "19/11/2025",
      "comprador": true
    }
  ],
  "nexa-boom-speaker": [
    {
      "autor": "Eduardo K.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "25/12/2025",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 4,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "05/03/2026",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "12/08/2025",
      "comprador": true
    }
  ],
  "nexa-studio-headset": [
    {
      "autor": "Mariana R.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "05/03/2026",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "12/08/2025",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 5,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "19/11/2025",
      "comprador": true
    },
    {
      "autor": "André V.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "26/02/2026",
      "comprador": true
    }
  ],
  "nexa-ear-clip": [
    {
      "autor": "Thiago S.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "12/08/2025",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 5,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "19/11/2025",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "26/02/2026",
      "comprador": true
    },
    {
      "autor": "Renata N.",
      "nota": 4,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "06/07/2025",
      "comprador": true
    },
    {
      "autor": "Marcelo Q.",
      "nota": 3,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "13/10/2025",
      "comprador": true
    }
  ],
  "nexa-tv-55-4k": [
    {
      "autor": "Larissa T.",
      "nota": 5,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "19/11/2025",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 3,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "26/02/2026",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "06/07/2025",
      "comprador": true
    }
  ],
  "nexa-tv-43-smart": [
    {
      "autor": "Eduardo K.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "26/02/2026",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 4,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "06/07/2025",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "13/10/2025",
      "comprador": true
    },
    {
      "autor": "Beatriz L.",
      "nota": 5,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "20/01/2026",
      "comprador": true
    }
  ],
  "nexa-tv-65-oled": [
    {
      "autor": "Mariana R.",
      "nota": 4,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "06/07/2025",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "13/10/2025",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 5,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "20/01/2026",
      "comprador": true
    },
    {
      "autor": "André V.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "27/04/2026",
      "comprador": true
    },
    {
      "autor": "Camila D.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "07/09/2025",
      "comprador": true
    }
  ],
  "nexa-monitor-27": [
    {
      "autor": "Thiago S.",
      "nota": 5,
      "texto": "Atendimento respondeu rápido no WhatsApp quando tive dúvida de configuração. Isso já valeu a compra.",
      "data": "13/10/2025",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 5,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "20/01/2026",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "27/04/2026",
      "comprador": true
    }
  ],
  "nexa-projector-mini": [
    {
      "autor": "Larissa T.",
      "nota": 3,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "20/01/2026",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 5,
      "texto": "Atendimento respondeu rápido no WhatsApp quando tive dúvida de configuração. Isso já valeu a compra.",
      "data": "27/04/2026",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 4,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "07/09/2025",
      "comprador": true
    },
    {
      "autor": "Rodrigo Z.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "14/12/2025",
      "comprador": true
    }
  ],
  "nexa-console-s": [
    {
      "autor": "Eduardo K.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "27/04/2026",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 4,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "07/09/2025",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 5,
      "texto": "Atendimento respondeu rápido no WhatsApp quando tive dúvida de configuração. Isso já valeu a compra.",
      "data": "14/12/2025",
      "comprador": true
    },
    {
      "autor": "Beatriz L.",
      "nota": 5,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "21/03/2026",
      "comprador": true
    },
    {
      "autor": "Diego H.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "01/08/2025",
      "comprador": true
    }
  ],
  "nexa-console-x": [
    {
      "autor": "Mariana R.",
      "nota": 4,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "07/09/2025",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "14/12/2025",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 5,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "21/03/2026",
      "comprador": true
    }
  ],
  "nexa-controller-pro": [
    {
      "autor": "Thiago S.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "14/12/2025",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 5,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "21/03/2026",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 3,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "01/08/2025",
      "comprador": true
    },
    {
      "autor": "Renata N.",
      "nota": 4,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "08/11/2025",
      "comprador": true
    }
  ],
  "nexa-gaming-headset": [
    {
      "autor": "Larissa T.",
      "nota": 5,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "21/03/2026",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "01/08/2025",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 4,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "08/11/2025",
      "comprador": true
    },
    {
      "autor": "Rodrigo Z.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "15/02/2026",
      "comprador": true
    },
    {
      "autor": "Juliana P.",
      "nota": 5,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "22/07/2025",
      "comprador": true
    }
  ],
  "nexa-racing-wheel": [
    {
      "autor": "Eduardo K.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "01/08/2025",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 4,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "08/11/2025",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "15/02/2026",
      "comprador": true
    }
  ],
  "nexa-watch-s3": [
    {
      "autor": "Mariana R.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "08/11/2025",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "15/02/2026",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 5,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "22/07/2025",
      "comprador": true
    },
    {
      "autor": "André V.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "02/10/2025",
      "comprador": true
    }
  ],
  "nexa-watch-ultra": [
    {
      "autor": "Thiago S.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "15/02/2026",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 3,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "22/07/2025",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "02/10/2025",
      "comprador": true
    },
    {
      "autor": "Renata N.",
      "nota": 4,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "09/01/2026",
      "comprador": true
    },
    {
      "autor": "Marcelo Q.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "16/04/2026",
      "comprador": true
    }
  ],
  "nexa-band-5": [
    {
      "autor": "Larissa T.",
      "nota": 5,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "22/07/2025",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "02/10/2025",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "09/01/2026",
      "comprador": true
    }
  ],
  "nexa-watch-kids": [
    {
      "autor": "Eduardo K.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "02/10/2025",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 4,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "09/01/2026",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "16/04/2026",
      "comprador": true
    },
    {
      "autor": "Beatriz L.",
      "nota": 5,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "23/09/2025",
      "comprador": true
    }
  ],
  "nexa-ring-smart": [
    {
      "autor": "Mariana R.",
      "nota": 4,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "09/01/2026",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "16/04/2026",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 5,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "23/09/2025",
      "comprador": true
    },
    {
      "autor": "André V.",
      "nota": 3,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "03/12/2025",
      "comprador": true
    },
    {
      "autor": "Camila D.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "10/03/2026",
      "comprador": true
    }
  ],
  "nexa-cam-indoor": [
    {
      "autor": "Thiago S.",
      "nota": 3,
      "texto": "Atendimento respondeu rápido no WhatsApp quando tive dúvida de configuração. Isso já valeu a compra.",
      "data": "16/04/2026",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 5,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "23/09/2025",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "03/12/2025",
      "comprador": true
    }
  ],
  "nexa-cam-outdoor": [
    {
      "autor": "Larissa T.",
      "nota": 5,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "23/09/2025",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 5,
      "texto": "Atendimento respondeu rápido no WhatsApp quando tive dúvida de configuração. Isso já valeu a compra.",
      "data": "03/12/2025",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 4,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "10/03/2026",
      "comprador": true
    },
    {
      "autor": "Rodrigo Z.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "17/08/2025",
      "comprador": true
    }
  ],
  "nexa-bulb-rgb-kit-4": [
    {
      "autor": "Eduardo K.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "03/12/2025",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 4,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "10/03/2026",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 5,
      "texto": "Atendimento respondeu rápido no WhatsApp quando tive dúvida de configuração. Isso já valeu a compra.",
      "data": "17/08/2025",
      "comprador": true
    },
    {
      "autor": "Beatriz L.",
      "nota": 5,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "24/11/2025",
      "comprador": true
    },
    {
      "autor": "Diego H.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "04/02/2026",
      "comprador": true
    }
  ],
  "nexa-smart-plug": [
    {
      "autor": "Mariana R.",
      "nota": 4,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "10/03/2026",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "17/08/2025",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 3,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "24/11/2025",
      "comprador": true
    }
  ],
  "nexa-doorbell": [
    {
      "autor": "Thiago S.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "17/08/2025",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 5,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "24/11/2025",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "04/02/2026",
      "comprador": true
    },
    {
      "autor": "Renata N.",
      "nota": 4,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "11/07/2025",
      "comprador": true
    }
  ],
  "nexa-sensor-kit": [
    {
      "autor": "Larissa T.",
      "nota": 5,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "24/11/2025",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "04/02/2026",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 4,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "11/07/2025",
      "comprador": true
    },
    {
      "autor": "Rodrigo Z.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "18/10/2025",
      "comprador": true
    },
    {
      "autor": "Juliana P.",
      "nota": 5,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "25/01/2026",
      "comprador": true
    }
  ],
  "nexa-air-fryer-5l": [
    {
      "autor": "Eduardo K.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "04/02/2026",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 4,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "11/07/2025",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "18/10/2025",
      "comprador": true
    }
  ],
  "nexa-blender-pro": [
    {
      "autor": "Mariana R.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "11/07/2025",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 3,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "18/10/2025",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 5,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "25/01/2026",
      "comprador": true
    },
    {
      "autor": "André V.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "05/04/2026",
      "comprador": true
    }
  ],
  "nexa-coffee-machine": [
    {
      "autor": "Thiago S.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "18/10/2025",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 5,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "25/01/2026",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "05/04/2026",
      "comprador": true
    },
    {
      "autor": "Renata N.",
      "nota": 4,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "12/09/2025",
      "comprador": true
    },
    {
      "autor": "Marcelo Q.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "19/12/2025",
      "comprador": true
    }
  ],
  "nexa-fan-smart": [
    {
      "autor": "Larissa T.",
      "nota": 5,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "25/01/2026",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "05/04/2026",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "12/09/2025",
      "comprador": true
    }
  ],
  "nexa-vacuum-robot": [
    {
      "autor": "Eduardo K.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "05/04/2026",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 4,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "12/09/2025",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "19/12/2025",
      "comprador": true
    },
    {
      "autor": "Beatriz L.",
      "nota": 3,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "26/03/2026",
      "comprador": true
    }
  ],
  "nexa-kettle-steel": [
    {
      "autor": "Mariana R.",
      "nota": 3,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "12/09/2025",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "19/12/2025",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 5,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "26/03/2026",
      "comprador": true
    },
    {
      "autor": "André V.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "06/08/2025",
      "comprador": true
    },
    {
      "autor": "Camila D.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "13/11/2025",
      "comprador": true
    }
  ],
  "nexa-cam-dslr-x": [
    {
      "autor": "Thiago S.",
      "nota": 5,
      "texto": "Atendimento respondeu rápido no WhatsApp quando tive dúvida de configuração. Isso já valeu a compra.",
      "data": "19/12/2025",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 5,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "26/03/2026",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "06/08/2025",
      "comprador": true
    }
  ],
  "nexa-action-cam-4k": [
    {
      "autor": "Larissa T.",
      "nota": 5,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "26/03/2026",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 5,
      "texto": "Atendimento respondeu rápido no WhatsApp quando tive dúvida de configuração. Isso já valeu a compra.",
      "data": "06/08/2025",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 4,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "13/11/2025",
      "comprador": true
    },
    {
      "autor": "Rodrigo Z.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "20/02/2026",
      "comprador": true
    }
  ],
  "nexa-cam-mirrorless": [
    {
      "autor": "Eduardo K.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "06/08/2025",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 4,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "13/11/2025",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 3,
      "texto": "Atendimento respondeu rápido no WhatsApp quando tive dúvida de configuração. Isso já valeu a compra.",
      "data": "20/02/2026",
      "comprador": true
    },
    {
      "autor": "Beatriz L.",
      "nota": 5,
      "texto": "Uso todo dia desde que chegou. Ainda não apresentou defeito nenhum e a bateria/aguenta bem o ritmo que eu dou.",
      "data": "27/07/2025",
      "comprador": true
    },
    {
      "autor": "Diego H.",
      "nota": 5,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "07/10/2025",
      "comprador": true
    }
  ],
  "nexa-drone-cam": [
    {
      "autor": "Mariana R.",
      "nota": 4,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "13/11/2025",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "20/02/2026",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 5,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "27/07/2025",
      "comprador": true
    }
  ],
  "nexa-cam-dash": [
    {
      "autor": "Thiago S.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "20/02/2026",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 5,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "27/07/2025",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "07/10/2025",
      "comprador": true
    },
    {
      "autor": "Renata N.",
      "nota": 4,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "14/01/2026",
      "comprador": true
    }
  ],
  "nexa-mouse-light": [
    {
      "autor": "Larissa T.",
      "nota": 5,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "27/07/2025",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "07/10/2025",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 4,
      "texto": "Chegou antes do prazo e tudo embalado direitinho. Já usei por duas semanas e não tenho o que reclamar.",
      "data": "14/01/2026",
      "comprador": true
    },
    {
      "autor": "Rodrigo Z.",
      "nota": 5,
      "texto": "Custo-benefício melhor que achei. Comparei em três lojas e fechei aqui.",
      "data": "21/04/2026",
      "comprador": true
    },
    {
      "autor": "Juliana P.",
      "nota": 3,
      "texto": "Faz o que promete. Não é o mais barato do mercado, mas o que mais entrega pelo que cobra.",
      "data": "01/09/2025",
      "comprador": true
    }
  ],
  "nexa-keyboard-mech": [
    {
      "autor": "Eduardo K.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "07/10/2025",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 3,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "14/01/2026",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "21/04/2026",
      "comprador": true
    }
  ],
  "nexa-monitor-ultrawide": [
    {
      "autor": "Mariana R.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "14/01/2026",
      "comprador": true
    },
    {
      "autor": "Rafael M.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "21/04/2026",
      "comprador": false
    },
    {
      "autor": "Fernanda C.",
      "nota": 5,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "01/09/2025",
      "comprador": true
    },
    {
      "autor": "André V.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "08/12/2025",
      "comprador": true
    }
  ],
  "nexa-ssd-1tb": [
    {
      "autor": "Thiago S.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "21/04/2026",
      "comprador": true
    },
    {
      "autor": "Patrícia G.",
      "nota": 5,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "01/09/2025",
      "comprador": false
    },
    {
      "autor": "Vinícius B.",
      "nota": 5,
      "texto": "Veio com o acessório que estava faltando em outras lojas. Chegou antes do combinado também.",
      "data": "08/12/2025",
      "comprador": true
    },
    {
      "autor": "Renata N.",
      "nota": 4,
      "texto": "O produto é igual à foto e à descrição. Só demorou um dia a mais na entrega, que foi aviso do correio, não da loja.",
      "data": "15/03/2026",
      "comprador": true
    },
    {
      "autor": "Marcelo Q.",
      "nota": 5,
      "texto": "Bem acabado, sem cheiro de plástico barato. Dá para ver que não é o produto mais genérico que existe.",
      "data": "22/08/2025",
      "comprador": true
    }
  ],
  "nexa-webcam-4k": [
    {
      "autor": "Larissa T.",
      "nota": 5,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "01/09/2025",
      "comprador": true
    },
    {
      "autor": "Bruno F.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "08/12/2025",
      "comprador": false
    },
    {
      "autor": "Aline S.",
      "nota": 4,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "15/03/2026",
      "comprador": true
    }
  ],
  "nexa-router-wi-fi-6": [
    {
      "autor": "Eduardo K.",
      "nota": 3,
      "texto": "Comprei com receio por ser meu primeiro pedido aqui, mas veio tudo certo. Anotaram até o número da nota na caixa.",
      "data": "08/12/2025",
      "comprador": true
    },
    {
      "autor": "Priscila W.",
      "nota": 4,
      "texto": "Tive que trocar a peça por tamanho e a devolução foi resolvida em dois dias. Sem drama, é raro achar isso.",
      "data": "15/03/2026",
      "comprador": false
    },
    {
      "autor": "Carlos A.",
      "nota": 5,
      "texto": "Instalei sozinho sem manual de técnico, seguindo o que veio na caixa. Deu certo de primeira.",
      "data": "22/08/2025",
      "comprador": true
    },
    {
      "autor": "Beatriz L.",
      "nota": 5,
      "texto": "Já é o segundo que eu compro. O primeiro durou quase três anos até eu trocar por vontade própria, não por defeito.",
      "data": "02/11/2025",
      "comprador": true
    }
  ]
};

/* Cupons de desconto aplicados na tela de pagamento.
   tipo: 'percentual' (valor em %) ou 'frete' (isenta o frete) */
const CUPONS = [
  {
    "codigo": "BEMVINDO10",
    "tipo": "percentual",
    "valor": 10,
    "minimo": 200,
    "texto": "10% OFF na primeira compra acima de R$ 200"
  },
  {
    "codigo": "VOLTEI15",
    "tipo": "percentual",
    "valor": 15,
    "minimo": 600,
    "texto": "15% OFF acima de R$ 600"
  },
  {
    "codigo": "FRETEGRATIS",
    "tipo": "frete",
    "valor": 0,
    "minimo": 150,
    "texto": "Frete grátis em compras acima de R$ 150"
  },
  {
    "codigo": "PIX5",
    "tipo": "percentual",
    "valor": 5,
    "minimo": 0,
    "texto": "5% de desconto pagando no Pix"
  }
];
