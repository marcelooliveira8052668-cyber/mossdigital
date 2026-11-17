/* ============================================================
   catalog.js — catálogo fictício com 50 produtos
   ------------------------------------------------------------
   FOTOS REAIS: imagens do Unsplash (Unsplash License — uso livre,
   sem exigência de atribuição; créditos em CREDITOS.md).
   Cada produto também tem uma ilustração SVG gerada localmente,
   usada como FALLBACK automático se a foto não carregar (offline).
   Nenhum produto, preço ou estoque é real.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const esc = MOSS.utils.escapeHtml;

  const CATEGORIES = [
    { id:'celulares',  name:'Celulares', icon:'📱' },
    { id:'notebooks',  name:'Notebooks', icon:'💻' },
    { id:'pcs',        name:'PCs e desktops', icon:'🖥️' },
    { id:'relogios',   name:'Relógios e wearables', icon:'⌚' },
    { id:'tvs',        name:'TVs e vídeo', icon:'📺' },
    { id:'audio',      name:'Caixas de som e áudio', icon:'🔊' },
    { id:'informatica',name:'Informática e games', icon:'⌨️' },
    { id:'camera',     name:'Câmeras e fotografia', icon:'📷' },
    { id:'casa',       name:'Casa e decoração', icon:'🛋️' },
    { id:'moda',       name:'Moda e acessórios', icon:'👕' },
    { id:'esportes',   name:'Esportes', icon:'🚴' },
    { id:'utilidades', name:'Utilidades', icon:'☕' },
    { id:'vestuario', name:'Vestuário', icon:'👗' },
    { id:'livros', name:'Livros', icon:'📚' },
    { id:'auto', name:'Peças de carro', icon:'🚗' },
    { id:'cama-mesa-banho', name:'Cama, mesa e banho', icon:'🛏️' },
    { id:'cozinha', name:'Coisas de cozinha', icon:'🍳' }
  ];

  /* Ícones SVG do fallback (viewBox 0 0 24 24, traço branco). */
  const ICONS = {
    phone:'M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm2 3h6v12H9z',
    laptop:'M4 5h16v11H4zM2 18h20v2H2z',
    pc:'M3 4h18v12H3zM8 20h8M12 16v4',
    watch:'M7 6h10v12H7zM9 6V3h6v3M9 18v3h6v-3',
    tv:'M3 5h18v12H3zM8 20h8M12 17v3',
    speaker:'M5 3h14v18H5zM12 17a4 4 0 100-8 4 4 0 000 8zM12 6h.01',
    keyboard:'M3 6h18v12H3zM6 9h.01M9 9h.01M12 9h.01M15 9h.01M18 9h.01M8 15h8',
    camera:'M3 7h4l2-2h6l2 2h4v13H3zM12 17a4 4 0 100-8 4 4 0 000 8z',
    lamp:'M9 3h6l3 8H6zM12 11v7M8 21h8',
    shirt:'M8 3l4 2 4-2 5 3-2 5-2-1v11H7V10L5 11 3 6z',
    bike:'M6 18a3 3 0 100-6 3 3 0 000 6zm12 0a3 3 0 100-6 3 3 0 000 6zM6 15l4-8h4l3 8',
    coffee:'M4 8h13v7a5 5 0 01-5 5H9a5 5 0 01-5-5zM17 9h2a2 2 0 010 4h-2',
    book:'M4 4h7a2 2 0 012 2v14a2 2 0 00-2-2H4zM20 4h-7a2 2 0 00-2 2v14a2 2 0 012-2h7z',
    car:'M5 11l2-5h10l2 5M3 11h18v6H3zM6 17v2M18 17v2M7 14h.01M17 14h.01',
    bed:'M3 18v-6h18v6M3 12V8h8v4M11 12V8h10v4M3 18h18M5 12h4'
  };

  /* Linha: [id, nome, categoria, preço, preçoAntigo, estoque, nota, avaliações,
             índiceFoto, ícone, cor1, cor2, descrição, especificações] */
  const ROWS = [
    // --- Celulares (6) ---------------------------------------
    ['CE-701','Smartphone Moss X5 128GB','celulares',2199,2599,9,4.7,388,5,'phone','#0b1f3a','#1b4576','Smartphone fictício com tela AMOLED de 6,5", câmera tripla e 128 GB. Ideal para demonstrar vendas de alto valor.',{'Tela':'6,5" AMOLED','Armazenamento':'128 GB','Câmera':'Tripla 48 MP','Garantia':'12 meses (fictícia)'}],
    ['CE-702','Smartphone Moss X5 Pro 256GB','celulares',2899,0,6,4.9,142,1,'phone','#123257','#275a94','Versão Pro com 256 GB, câmera principal de 108 MP e carregamento rápido de 65 W.',{'Tela':'6,7" AMOLED','Armazenamento':'256 GB','Câmera':'108 MP','Carga':'65 W'}],
    ['CE-703','Smartphone Moss Lite 64GB','celulares',899,0,22,4.4,267,0,'phone','#1b4576','#2f6fed','Modelo de entrada com tela de 6,1" e 64 GB. Ótimo para testar faixas de preço no catálogo.',{'Tela':'6,1" LCD','Armazenamento':'64 GB','Câmera':'Dupla 13 MP','Bateria':'4000 mAh'}],
    ['CE-704','Smartphone Moss Cam 128GB','celulares',1799,0,11,4.6,98,2,'phone','#0b1f3a','#275a94','Foco em fotografia: sensor principal de 50 MP, modo noturno e estabilização ótica.',{'Câmera':'50 MP','Estabilização':'Ótica','Vídeo':'4K 60fps','Armazenamento':'128 GB'}],
    ['CE-705','Smartphone Moss White 128GB','celulares',1999,0,13,4.5,184,3,'phone','#275a94','#5b8ff5','Acabamento branco fosco, 128 GB e processador octa-core. Design clean para a vitrine.',{'Cor':'Branco','Armazenamento':'128 GB','Processador':'8 núcleos','Tela':'6,4"'}],
    ['CE-706','Smartphone Moss Max 512GB','celulares',3499,0,4,4.8,73,4,'phone','#0b1f3a','#123257','Topo de linha fictício com 512 GB, tela de 6,8" e bateria de 5000 mAh.',{'Tela':'6,8" AMOLED','Armazenamento':'512 GB','Bateria':'5000 mAh','Carga':'45 W'}],

    // --- Notebooks (5) ---------------------------------------
    ['NB-801','Notebook Moss Book Air 14"','notebooks',4290,4790,7,4.8,203,16,'laptop','#0b1f3a','#123257','Ultrabook leve com processador de 8 núcleos, 16 GB de RAM e SSD de 512 GB.',{'Processador':'8 núcleos','Memória':'16 GB RAM','Armazenamento':'512 GB SSD','Tela':'14" IPS'}],
    ['NB-802','Notebook Moss Book Pro 16"','notebooks',6890,0,4,4.9,121,17,'laptop','#123257','#275a94','Notebook profissional com 32 GB de RAM e GPU dedicada para edição e desenvolvimento.',{'Processador':'10 núcleos','Memória':'32 GB RAM','GPU':'8 GB dedicada','Tela':'16" Retina'}],
    ['NB-803','Notebook Moss Gamer 15"','notebooks',5290,0,8,4.7,176,18,'laptop','#1b4576','#2f6fed','Notebook gamer com tela de 144 Hz e placa gráfica dedicada. Produto fictício.',{'Tela':'15,6" 144 Hz','Memória':'16 GB RAM','GPU':'6 GB dedicada','Armazenamento':'1 TB SSD'}],
    ['NB-804','Notebook Moss Studio 14"','notebooks',4790,0,10,4.6,88,19,'laptop','#0b1f3a','#275a94','Linha Studio com painel colorimétrico e 1 TB de SSD para criadores.',{'Tela':'14" P3','Memória':'16 GB RAM','Armazenamento':'1 TB SSD','Peso':'1,5 kg'}],
    ['NB-805','Notebook Moss Slim 13"','notebooks',2990,0,15,4.5,142,20,'laptop','#275a94','#5b8ff5','Modelo compacto e leve, ideal para estudos e rotina de trabalho.',{'Tela':'13,3" IPS','Memória':'8 GB RAM','Armazenamento':'256 GB SSD','Peso':'1,2 kg'}],

    // --- PCs e desktops (5) ----------------------------------
    ['PC-901','Desktop Moss iMac 24"','pcs',7990,0,3,4.9,67,8,'pc','#0b1f3a','#123257','Desktop all-in-one com tela Retina de 24" e design compacto.',{'Tela':'24" 4.5K','Processador':'8 núcleos','Memória':'16 GB','Armazenamento':'512 GB SSD'}],
    ['PC-902','Desktop Moss Mini','pcs',4290,0,6,4.6,91,9,'pc','#0b1f3a','#275a94','Mini desktop silencioso para escritório e estudo. Ocupa pouco espaço.',{'Processador':'6 núcleos','Memória':'8 GB','Armazenamento':'256 GB SSD','Ruído':'Silencioso'}],
    ['PC-903','Desktop Gamer Moss RGB','pcs',6490,0,5,4.8,134,10,'pc','#1b4576','#2f6fed','Torre gamer com iluminação RGB, placa dedicada e refrigeração líquida simulada.',{'GPU':'8 GB dedicada','Memória':'16 GB RAM','Armazenamento':'1 TB SSD','RGB':'Sim'}],
    ['PC-904','Workstation Moss Ryzen','pcs',8990,0,2,4.9,48,11,'pc','#123257','#275a94','Estação de trabalho com processador de 16 núcleos para tarefas pesadas.',{'Processador':'16 núcleos','Memória':'32 GB RAM','Armazenamento':'2 TB SSD','Uso':'Profissional'}],
    ['PC-905','Desktop Moss Compact','pcs',3190,0,12,4.4,105,12,'pc','#b45309','#f5a623','Desktop compacto para uso geral, com bom custo-benefício na simulação.',{'Processador':'4 núcleos','Memória':'8 GB','Armazenamento':'512 GB SSD','Cor':'Âmbar'}],

    // --- Relógios (6) ----------------------------------------
    ['RE-101','Smartwatch Moss Fit','relogios',1290,1490,14,4.7,232,22,'watch','#0b1f3a','#1b4576','Relógio inteligente com monitor cardíaco, GPS e 7 dias de bateria.',{'Tela':'1,8" AMOLED','Bateria':'7 dias','Resistência':'5 ATM','GPS':'Sim'}],
    ['RE-102','Relógio Moss Classic','relogios',449,0,26,4.5,118,21,'watch','#275a94','#5b8ff5','Relógio analógico minimalista com pulseiro branco e caixa de aço.',{'Tipo':'Analógico','Caixa':'Aço','Pulseiro':'Silicone','Resistência':'3 ATM'}],
    ['RE-103','Relógio Moss Heritage','relogios',699,0,18,4.6,96,23,'watch','#7c3f2a','#c97b52','Modelo clássico com mostrador clean e acabamento em couro.',{'Tipo':'Analógico','Pulseiro':'Couro','Mostrador':'36 mm','Estilo':'Clássico'}],
    ['RE-104','Relógio Moss Steel','relogios',899,0,11,4.7,74,24,'watch','#0b1f3a','#123257','Relógio com caixa escura e mostrador de alto contraste.',{'Tipo':'Analógico','Caixa':'Aço escovado','Mostrador':'40 mm','Resistência':'5 ATM'}],
    ['RE-105','Relógio Moss Chrono','relogios',1190,0,7,4.8,89,25,'watch','#123257','#275a94','Cronógrafo com submostradores e pulseiro de couro marrom.',{'Tipo':'Cronógrafo','Pulseiro':'Couro','Mostrador':'42 mm','Movimento':'Quartz'}],
    ['RE-106','Smartwatch Moss Sport','relogios',999,0,16,4.6,143,26,'watch','#1b4576','#2f6fed','Smartwatch esportivo com GPS integrado e 100 modos de treino.',{'Tela':'1,5"','Bateria':'10 dias','GPS':'Sim','Modos':'100 esportes'}],

    // --- TVs (4) ---------------------------------------------
    ['TV-111','Smart TV Moss 50" 4K','tvs',2190,2590,8,4.7,187,6,'tv','#0b1f3a','#123257','Smart TV 4K de 50 polegadas com sistema de streaming e controle por voz.',{'Tela':'50" 4K','Sistema':'Smart TV','HDR':'Sim','HDMI':'3 portas'}],
    ['TV-112','Smart TV Moss 65" 4K','tvs',3490,0,5,4.8,124,7,'tv','#123257','#275a94','Tela grande de 65" com HDR e taxa de atualização de 120 Hz.',{'Tela':'65" 4K','Taxa':'120 Hz','HDR':'Sim','HDMI':'4 portas'}],
    ['TV-113','TV Moss Gaming 55"','tvs',2890,0,6,4.7,96,13,'tv','#1b4576','#2f6fed','TV voltada a games com modo de baixa latência e 120 Hz.',{'Tela':'55" 4K','Latência':'Baixa','Taxa':'120 Hz','HDMI':'2.1'}],
    ['TV-114','TV Moss OLED 65"','tvs',5990,0,2,4.9,58,15,'tv','#0b1f3a','#275a94','Painel OLED com contraste infinito e cores precisas. Produto demonstrativo.',{'Painel':'OLED','Tela':'65" 4K','HDR':'Dolby Vision','Áudio':'40 W'}],

    // --- Áudio (6) -------------------------------------------
    ['EL-101','Fone Bluetooth Moss Wave','audio',449.90,599.90,18,4.8,214,30,'headphones','#1b4576','#275a94','Fone over-ear com cancelamento de ruído, 30 horas de bateria e Bluetooth 5.3.',{'Tipo':'Over-ear','Bateria':'30 horas','Conexão':'Bluetooth 5.3','Garantia':'12 meses (fictícia)'}],
    ['AU-102','Caixa de Som Moss Beat','audio',289.90,349.90,32,4.5,151,33,'speaker','#123257','#2f6fed','Caixa portátil à prova d’água, 20 W e 12 horas de reprodução.',{'Potência':'20 W','Bateria':'12 horas','Proteção':'IP67','Cor':'Preto'}],
    ['AU-103','Caixa de Som Moss Party','audio',549,0,12,4.7,103,34,'speaker','#b45309','#f5a623','Caixa de festa com iluminação LED e 80 W de potência simulada.',{'Potência':'80 W','LED':'Sim','Bateria':'18 horas','Bluetooth':'5.2'}],
    ['AU-104','Smart Speaker Moss Home','audio',399,0,20,4.6,176,35,'speaker','#0b1f3a','#275a94','Alto-falante inteligente com assistente de voz e integração com a casa.',{'Assistente':'Sim','Áudio':'360°','Conexão':'Wi-Fi/Bluetooth','Cor':'Cinza'}],
    ['AU-105','Fone Moss Buds','audio',299,0,40,4.4,208,32,'headphones','#275a94','#5b8ff5','Fone in-ear sem fio com estojo de carregamento e 24 horas de uso.',{'Tipo':'In-ear','Bateria':'24 h com estojo','Bluetooth':'5.3','Resistência':'IPX4'}],
    ['AU-106','Fone Moss Studio','audio',799,0,9,4.8,82,31,'headphones','#0b1f3a','#123257','Fone de estúdio com drivers de 40 mm e resposta de frequência ampla.',{'Driver':'40 mm','Tipo':'Over-ear','Conexão':'Bluetooth / cabo','Uso':'Estúdio'}],

    // --- Informática e games (4) -----------------------------
    ['IN-201','Monitor Moss View 27" QHD','informatica',1690,0,12,4.6,134,13,'pc','#123257','#275a94','Monitor QHD de 27", 75 Hz e painel IPS com cores precisas.',{'Resolução':'2560 × 1440','Taxa':'75 Hz','Painel':'IPS','Conexões':'HDMI / DP'}],
    ['IN-202','Teclado Mecânico Moss Key','informatica',379,449,21,4.7,178,43,'keyboard','#1b4576','#2f6fed','Teclado mecânico com switches marrons, RGB e layout ABNT2.',{'Switches':'Brown','Iluminação':'RGB','Layout':'ABNT2','Conexão':'USB-C'}],
    ['IN-203','Controle Gamer Moss Play','informatica',249,0,28,4.5,91,14,'keyboard','#b45309','#f5a623','Controle sem fio com resposta rápida e bateria de 20 horas.',{'Conexão':'Sem fio','Bateria':'20 horas','Platform':'PC / console','Cor':'Preto'}],
    ['IN-204','Headset Gamer Moss Voice','informatica',459,0,17,4.6,112,42,'headphones','#0b1f3a','#1b4576','Headset gamer com microfone removível e som surround 7.1.',{'Áudio':'7.1 surround','Microfone':'Removível','Conexão':'USB','Cor':'Preto'}],

    // --- Câmeras (4) -----------------------------------------
    ['CA-301','Câmera Mirrorless Moss C1','camera',3890,0,4,4.9,96,46,'camera','#0b1f3a','#123257','Câmera com sensor de 24 MP, estabilização e vídeo 4K.',{'Sensor':'24 MP','Vídeo':'4K 30fps','Lente':'18-55 mm','Garantia':'12 meses (fictícia)'}],
    ['CA-302','Câmera Moss S2','camera',3290,0,6,4.7,78,47,'camera','#123257','#275a94','Câmera compacta com lente intercambiável e foco rápido.',{'Sensor':'20 MP','Foco':'Rápido','Vídeo':'Full HD','Peso':'480 g'}],
    ['CA-303','Câmera Profissional Moss Pro','camera',7990,0,2,4.9,41,44,'camera','#0b1f3a','#1b4576','Câmera profissional com sensor full frame e 45 MP.',{'Sensor':'45 MP full frame','Vídeo':'4K 120fps','Montagem':'Metálica','Uso':'Profissional'}],
    ['CA-304','Câmera Instantânea Moss Snap','camera',499,0,24,4.5,163,45,'camera','#b45309','#f5a623','Câmera instantânea com impressão imediata e filme fictício.',{'Tipo':'Instantânea','Impressão':'Imediata','Cor':'Branco','Filme':'Incluso (fictício)'}],

    // --- Casa (3) --------------------------------------------
    ['CS-401','Poltrona Moss Lounge','casa',1290,1490,6,4.8,74,69,'lamp','#7c3f2a','#c97b52','Poltrona estofada com estrutura de madeira e design escandinavo.',{'Revestimento':'Tecido','Estrutura':'Madeira','Cor':'Clara','Montagem':'Simples'}],
    ['CS-402','Sofá Moss Comfort 3 lugares','casa',2890,0,4,4.7,85,70,'lamp','#275a94','#5b8ff5','Sofá de 3 lugares com almofadas e tecido resistente.',{'Lugares':'3','Tecido':'Resistente','Cor':'Cinza','Montagem':'Inclusa'}],
    ['CS-403','Luminária Moss Glow','casa',189.90,0,40,4.6,112,67,'lamp','#b45309','#f5a623','Luminária LED com três temperaturas de luz e braço articulado.',{'Luz':'3 temperaturas','Potência':'12 W','Braço':'Articulado','Cor':'Amarelo fosco'}],

    // --- Moda (4) --------------------------------------------
    ['MO-401','Tênis Moss Runner','moda',459.90,549.90,14,4.8,198,53,'shirt','#d64550','#f5a623','Tênis esportivo com cabedal em malha e sola de amortecimento.',{'Cabedal':'Malha','Sola':'EVA','Tamanhos':'37 ao 44','Cor':'Vermelho'}],
    ['MO-402','Mochila Moss Urban 20L','moda',249,0,24,4.6,121,49,'shirt','#0b1f3a','#1b4576','Mochila urbana com compartimento para notebook de 15" e tecido resistente.',{'Capacidade':'20 L','Notebook':'Até 15"','Material':'Poliéster','Cor':'Marinho'}],
    ['MO-403','Óculos de Sol Moss Sun','moda',179.90,0,30,4.4,89,52,'shirt','#b45309','#f5a623','Óculos de sol com armação leve e lentes com proteção UV400.',{'Lentes':'UV400','Armação':'Acetato','Cor':'Preto','Estojo':'Incluso'}],
    ['MO-404','Jaqueta Moss Urban','moda',349,0,17,4.6,76,54,'shirt','#7c3f2a','#c97b52','Jaqueta corta-vento com acabamento impermeável e design urbano.',{'Material':'Poliéster','Impermeável':'Sim','Tamanhos':'P ao GG','Cor':'Marrom'}],

    // --- Esportes (2) ----------------------------------------
    ['ES-501','Tapete de Yoga Moss Zen','esportes',139,0,27,4.6,104,57,'bike','#7c3f2a','#c97b52','Tapete antiderrapante com 6 mm e alça de transporte.',{'Espessura':'6 mm','Material':'TPE','Comprimento':'173 cm','Acessório':'Alça'}],
    ['ES-502','Bicicleta Moss Ride','esportes',1890,0,5,4.8,58,61,'bike','#1b4576','#2f6fed','Bicicleta urbana com 21 marchas e freios a disco.',{'Marchas':'21','Freios':'Disco','Quadro':'Aço','Rodas':'29"'}],

    // --- Utilidades (1) --------------------------------------
    ['UT-601','Cafeteira Moss Brew','utilidades',329,399,16,4.7,182,65,'coffee','#9a5b3d','#f5a623','Cafeteira elétrica de 1,5 L com filtro removível e desligamento automático.',{'Capacidade':'1,5 L','Potência':'900 W','Filtro':'Removível','Cor':'Âmbar'}]
  ];

  /* ============================================================
     MARKETPLACE — produtos adicionais gerados a partir de modelos.
     Cada linha: [nome, preço]. As fotos são reaproveitadas do mesmo
     pool verificado, com nomes/preços/vendedores diferentes.
     ============================================================ */
  const SHOPS = [
    'Moss Store Oficial','TechBR Import','Casa & Estilo','Digital Shop',
    'Moss Outlet','Gamer Point','Estilo & Cia','UtiliShop','Mega Ofertas BR','Moss Tech'
  ];
  const LOCATIONS = [
    'São Paulo, SP','Rio de Janeiro, RJ','Belo Horizonte, MG','Curitiba, PR',
    'Porto Alegre, RS','Recife, PE','Campinas, SP','Brasília, DF'
  ];

  /* Cada item: [nome, preço, ÍNDICE DA FOTO].
     O índice foi escolhido um a um para a foto combinar com o produto.
     Quando não havia foto exata, o nome foi ajustado ao que a imagem mostra. */
  const MARKET = {
    celulares:{ icon:'phone', bg:['#0b1f3a','#275a94'], items:[
      ['Smartphone Moss A1 64GB',799,0],['Smartphone Moss A2 128GB',999,1],['Smartphone Moss M3 128GB',1499,2],
      ['Smartphone Moss M5 256GB',1899,3],['Smartphone Moss Pro X 256GB',2499,4],['Smartphone Moss Pro X Max 512GB',3299,5],
      ['Smartphone Moss Lite 5G',1199,0],['Smartphone Moss Note 128GB',1699,1],['Smartphone Moss Zoom 256GB',2199,2],
      ['Smartphone Moss Ultra 512GB',3999,5],['Smartphone Moss Basic 32GB',599,3],['Smartphone Moss Play 128GB',1399,4]
    ]},
    notebooks:{ icon:'laptop', bg:['#123257','#275a94'], items:[
      ['Notebook Moss Start 13"',2499,17],['Notebook Moss Start 14"',2899,17],['Notebook Moss Air M1 14"',4290,16],
      ['Notebook Moss Air M2 13"',4990,20],['Notebook Moss Pro 16"',6890,16],['Notebook Moss Gamer RTX 15"',5990,18],
      ['Notebook Moss Gamer Pro 17"',7990,19],['Notebook Moss Studio 14"',4790,20],['Notebook Moss Slim 15"',3390,17],
      ['Notebook Moss Work 14"',3890,19]
    ]},
    pcs:{ icon:'pc', bg:['#0b1f3a','#1b4576'], items:[
      ['Desktop Moss Mini',2890,9],['Desktop Moss Compact',3190,9],['Desktop Moss iMac 24"',7990,8],
      ['Desktop All-in-One 27"',5290,13],['Desktop Gamer Moss RGB',6490,10],['Desktop Gamer Moss Pro',8990,10],
      ['Workstation Moss Ryzen',8990,11],['Workstation Moss Intel i9',10990,11],['Desktop Moss Office',2290,12],
      ['Desktop Moss Tower',4590,12]
    ]},
    relogios:{ icon:'watch', bg:['#0b1f3a','#275a94'], items:[
      ['Smartwatch Moss Fit',1290,22],['Smartwatch Moss Fit Pro',1690,26],['Smartwatch Moss Sport',999,22],
      ['Smartwatch Moss Active',1190,26],['Relógio Moss Classic',449,21],['Relógio Moss Heritage',699,23],
      ['Relógio Moss Steel',899,24],['Relógio Moss Chrono',1190,25],['Relógio Moss Minimal',399,21],
      ['Relógio Moss Gold',1490,28]
    ]},
    tvs:{ icon:'tv', bg:['#123257','#275a94'], items:[
      ['Smart TV 32" HD',899,6],['Smart TV 43" Full HD',1390,7],['Smart TV 50" 4K',2190,6],
      ['Smart TV 55" 4K',2590,7],['Smart TV 65" 4K',3490,39],['TV Moss Gaming 55"',2890,13],
      ['TV Moss OLED 65"',5990,15],['TV Moss QLED 75"',7990,39]
    ]},
    audio:{ icon:'speaker', bg:['#1b4576','#2f6fed'], items:[
      ['Fone Moss Buds',299,32],['Fone Moss Buds Pro',449,37],['Fone Moss Wave',449,30],['Fone Moss Studio',799,31],
      ['Fone Moss Neck',349,42],['Fone Moss Sport',279,31],['Caixa Moss Beat',289,33],['Caixa Moss Party',549,34],
      ['Caixa Moss Mini',199,35],['Smart Speaker Moss Home',399,35],['Soundbar Moss 2.1',899,38],['Soundbar Moss 5.1',1490,38]
    ]},
    informatica:{ icon:'keyboard', bg:['#0b1f3a','#1b4576'], items:[
      ['Monitor 24" HD',699,13],['Monitor 27" QHD',1690,13],['Monitor 32" 4K',2490,12],['Monitor Gamer 24" 144Hz',1190,12],
      ['Teclado Mecânico Moss Key',379,43],['Teclado Sem Fio',199,43],['Controle Gamer Moss Play',249,14],
      ['Headset Gamer Moss Voice',459,42],['Caixa de Som Gamer',289,34],['Webcam Full HD',299,48]
    ]},
    camera:{ icon:'camera', bg:['#0b1f3a','#123257'], items:[
      ['Câmera Instantânea Moss Snap',499,45],['Câmera Compacta 20MP',1290,47],['Câmera Mirrorless C1',3890,46],
      ['Câmera Mirrorless S2',3290,47],['Câmera DSLR 24MP',2990,44],['Câmera Pro Full Frame',7990,44],
      ['Lente 50mm',1290,48],['Webcam 1080p',299,48],['Câmera de Segurança',399,48],['Câmera Instantânea Mini',449,45]
    ]},
    casa:{ icon:'lamp', bg:['#7c3f2a','#c97b52'], items:[
      ['Poltrona Moss Lounge',1290,69],['Sofá 3 lugares',2890,70],['Sofá Retrátil',3490,72],['Luminária Moss Glow',189,67],
      ['Luminária Pendente',299,68],['Mesa de Centro',699,64],['Estante Organizadora',890,71],['Almofadas Decorativas',129,74],
      ['Tapete 2x3m',459,64],['Capa para Sofá',329,70],['Espelho Redondo',399,73],['Cortina Blackout',249,71]
    ]},
    moda:{ icon:'shirt', bg:['#b45309','#f5a623'], items:[
      ['Tênis Moss Runner',459,53],['Tênis Moss Urban',349,55],['Tênis Casual',279,51],['Mochila Moss Urban',249,49],
      ['Mochila Notebook',199,49],['Óculos de Sol Moss Sun',179,52],['Jaqueta Corta-vento',349,54],['Calça Jeans Skinny',159,50],
      ['Tênis Esportivo',219,56],['Jaqueta Jeans',229,54],['Sandália Rasteira',89,51],['Óculos Retangular',149,52]
    ]},
    esportes:{ icon:'bike', bg:['#1b4576','#2f6fed'], items:[
      ['Halteres Ajustáveis 20kg',399,60],['Tapete de Yoga Moss Zen',139,57],['Bicicleta Urbana',1890,61],
      ['Bicicleta Arod',2290,61],['Kit Treino Funcional',159,58],['Kit Halteres 10kg',249,60],['Corda de Pular',59,59],
      ['Esteira Dobrável',1290,59],['Academia em Casa',599,62],['Bicicleta Infantil',990,61]
    ]},
    utilidades:{ icon:'coffee', bg:['#9a5b3d','#f5a623'], items:[
      ['Cafeteira Moss Brew',329,65],['Café Coado 500g',49,66],['Café em Grãos 1kg',79,66],
      ['Kit de Ferramentas',199,63],['Furadeira Elétrica',349,63],['Jogo de Brocas',99,63],
      ['Air Fryer 4L',499,99],['Liquidificador',249,100],['Jogo de Panelas',399,108],['Batedeira',629,100]
    ]},
    vestuario:{ icon:'shirt', bg:['#b45309','#f5a623'], items:[
      ['Calça Legging Fitness',99,50],['Calça Jeans Masculina',159,50],['Camisa Social',129,54],
      ['Jaqueta Masculina',229,54],['Moletom com Capuz',179,54],['Tênis Casual Unissex',219,51],
      ['Tênis Esportivo',269,53],['Tênis Feminino',239,56],['Mochila Feminina',189,49],
      ['Óculos de Sol',159,52],['Sandália',89,55],['Óculos Esportivo',179,52]
    ]},
    livros:{ icon:'book', bg:['#7c3f2a','#c97b52'], items:[
      ['Livro: O Código da Manhã',89,75],['Livro: Design de Interfaces',129,76],['Livro: Pensamento Computacional',99,77],
      ['Livro: Histórias da Noite',79,78],['Livro: Manual do Front-End',149,79],['Livro: Caderno de Notas',59,80],
      ['Livro: A Arte da Simplicidade',109,81],['Livro: Jornada de Um Dev',119,82],['Livro: Fundamentos de SQL',139,83],
      ['Livro: Criatividade Aplicada',94,84],['Livro: Coleção Clássicos',199,97],['Livro: Guia de Carreira Tech',129,98]
    ]},
    auto:{ icon:'car', bg:['#0b1f3a','#275a94'], items:[
      ['Kit Pastilhas de Freio',189,94],['Filtro de Óleo Original',79,95],['Filtro de Ar do Motor',69,95],
      ['Rádio Automotivo 2DIN',429,90],['Par de Retrovisores',299,86],['Farol Dianteiro LED',389,87],
      ['Jogo de Velas de Ignição',149,95],['Correia Dentada',219,94],['Amortecedor Dianteiro',459,94],
      ['Sensor de Estacionamento',549,90],['Tapete de Carro 4 peças',129,85],['Capa para Carro',179,88]
    ]},
    'cama-mesa-banho':{ icon:'bed', bg:['#275a94','#5b8ff5'], items:[
      ['Jogo de Toalhas de Banho',119,110],['Papel Higiênico 12 rolos',69,109],['Roupão de Banho',139,110],
      ['Tapete de Banho',79,73],['Kit Organizador de Banheiro',89,73],['Bandeja para Mesa',159,103],
      ['Jarra de Vidro',99,107],['Almofadas Decorativas',129,74],['Capa para Sofá',289,70],
      ['Manta de Sofá',189,72],['Travesseiro Decorativo',129,74],['Cortina Blackout',249,71]
    ]},
    cozinha:{ icon:'coffee', bg:['#b45309','#f5a623'], items:[
      ['Air Fryer 5L Digital',549,99],['Liquidificador 1200W',279,100],['Kit Café da Manhã',189,101],
      ['Panela de Pressão',459,108],['Jogo de Panelas 5 peças',399,108],['Frigideira Antiaderente',149,108],
      ['Faca de Cozinha',119,103],['Tábua de Corte',89,106],['Pote de Vidro 1L',59,107],
      ['Espremedor de Frutas',79,107],['Batedeira Planetária',629,100],['Jogo de Talheres',139,103]
    ]}
  };

  function makeGenerated() {
    const out = [];
    let seq = 0;
    Object.keys(MARKET).forEach(function (cat) {
      const cfg = MARKET[cat];
      cfg.items.forEach(function (item, i) {
        seq++;
        const price = item[1];
        out.push({
          id:'MK-' + String(seq).padStart(4, '0'),
          name:item[0], category:cat, price:price,
          oldPrice: i % 4 === 0 ? Math.round(price * 1.15) : 0,
          stock: 3 + (seq * 7) % 40,
          rating: Math.round((4.0 + (seq % 10) * 0.1) * 10) / 10,
          reviews: 20 + (seq * 13) % 380,
          sold: 50 + (seq * 37) % 3000,
          photoIndex: Number.isFinite(item[2]) ? item[2] : 0,
          icon:cfg.icon, bg:cfg.bg,
          desc:'Produto fictício do marketplace MOSS. ' + categoryNameSafe(cat) +
               ' com qualidade simulada para demonstração de loja virtual.',
          specs:{ 'Categoria':categoryNameSafe(cat), 'Vendedor':SHOPS[seq % SHOPS.length],
                  'Origem':LOCATIONS[seq % LOCATIONS.length], 'Garantia':'12 meses (fictícia)' },
          shop:SHOPS[seq % SHOPS.length],
          location:LOCATIONS[seq % LOCATIONS.length],
          freeShipping: seq % 3 !== 0
        });
      });
    });
    return out;
  }

  function categoryNameSafe(id) {
    const c = CATEGORIES.find(function (x) { return x.id === id; });
    return c ? c.name : id;
  }

  const PRODUCTS = ROWS.map(function (r, i) {
    return {
      id:r[0], name:r[1], category:r[2], price:r[3], oldPrice:r[4], stock:r[5],
      rating:r[6], reviews:r[7], photoIndex:r[8], icon:r[9], bg:[r[10],r[11]],
      desc:r[12], specs:r[13],
      sold: 100 + (i * 53) % 2500,
      shop: SHOPS[i % SHOPS.length],
      location: LOCATIONS[i % LOCATIONS.length],
      freeShipping: i % 3 !== 0
    };
  }).concat(makeGenerated());

  /* IDs das fotos verificadas (Unsplash). A ordem segue exatamente a
     numeração usada no mapa visual de seleção (ver CREDITOS.md). */
  const PHOTO_IDS = [
    '1511707171634-5f897ff02aa9','1592750475338-74b7b21085ab','1574944985070-8f3ebc6b79d2',
    '1603891128711-11b4b03bb138','1598327105666-5b89351aff97','1610945265064-0e34e5519bbf',
    '1593359677879-a4bb92f829d1','1593784991095-a205069470b6','1461151304267-38535e780c79',
    '1527443224154-c4a3942d3acf','1587202372634-32705e3bf49c','1591799264318-7e6ef8ddb7ea',
    '1625842268584-8f3296236761','1587831990711-23ca6441447b','1612287230202-1ff1d85d1bdf',
    '1616588589676-62b3bd4ff6d2','1517336714731-489689fd1ca8','1496181133206-80ce9b88a853',
    '1541807084-5c52b6b3adef','1519389950473-47ba0277781c','1593642632823-8f785ba67e45',
    '1523275335684-37898b6baf30','1546868871-7041f2a55e12','1524592094714-0f0654e20314',
    '1434056886845-dac89ffe9b56','1524805444758-089113d48a6d','1508685096489-7aacd43bd3b1',
    '1614164185128-e4ec99c436d7','1523170335258-f5ed11844a49','1542496658-e33a6d0d50f6',
    '1505740420928-5e560c06d30e','1583394838336-acd977736f90','1590658268037-6bf12165a8df',
    '1608043152269-423dbba4e7e1','1589003077984-894e133dabab','1543512214-318c7553f230',
    '1608042314453-ae338d80c427','1608156639585-b3a032ef9689','1545454675-3531b543be5d',
    '1585412727339-54e4bae3bbf9','1560958089-b8a1929cea89','1558089687-f282ffcbc126',
    '1550009158-9ebf69173e03','1525547719571-a2d4ac8945e2','1516035069371-29a1b244cc32',
    '1526170375885-4d8ecf77b99f','1502920917128-1aa500764cbd','1452780212940-6f5c0d14d848',
    '1519183071298-a2962feb14f4','1553062407-98eeb64c6a62','1523381210434-271e8be1f52b',
    '1549298916-b41d501d3772','1572635196237-14b3f281503f','1542291026-7eec264c27ff',
    '1591047139829-d91aecb6caea','1525966222134-fcfa99b8ae77','1491553895911-0055eca6402d',
    '1571019613454-1cb2f99b2d8b','1517836357463-d25dfeac3438','1534438327276-14e5300c3a48',
    '1592432678016-e910b452f9a2','1485965120184-e220f721d03e','1571019614242-c5c5dee9f50b',
    '1504148455328-c376907d081c','1556228453-efd6c1ff04f6','1495474472287-4d71bcdd2085',
    '1517668808822-9ebb02f2a0e6','1507473885765-e6ed057f782c','1540932239986-30128078f3c5',
    '1567538096630-e0c55bd6374c','1493663284031-b7e3aefcae8e','1616486338812-3dadae4b4ace',
    '1578500494198-246f612d3b3d','1584622650111-993a426fbf0a','1540574163026-643ea20ade25',
    // Fotos extras: livros, carros, cama/mesa/banho e cozinha
    '1544947950-fa07a98d237f','1512820790803-83ca734da794','1507842217343-583bb7270b66',
    '1495446815901-a7297e633e8d','1481627834876-b7833e8f5570','1519682337058-a94d519337bc',
    '1543002588-bfa74002ed7e','1532012197267-da84d127e765','1456513080510-7bf3a84b82f8',
    '1497633762265-9d179a990aa6','1485291571150-772bcfc10da5','1492144534655-ae79c964c9d7',
    '1503376780353-7e6692767b70','1552519507-da3b142c6e3d','1494905998402-395d579af36f',
    '1449965408869-eaa3f722e40d','1542362567-b07e54358753','1544829099-b9a0c07fad1a',
    '1565008447742-97f6f38c985c','1487754180451-c456f719a1fc','1619642751034-765dfdf7c58e',
    '1635776062127-d379bfcba9f8','1524995997946-a1c2e315a42f','1586528116311-ad8dd3c8310d',
    '1556911220-bff31c812dba','1556909212-d5b604d0c90d','1556910103-1c02745aae4d',
    '1600585154340-be6161a56a0c','1600607687939-ce8a6c25118c','1556912172-45b7abe8b7e1',
    '1490645935967-10de6ba17061','1556909114-f6e7ad7d3136','1585515320310-259814833e62',
    '1590794056226-79ef3a8147e1','1610701596007-11502861dcfa','1600857544200-b2f666a9a2ec'
  ];

  /** URL da foto real do produto. variant = 0,1,2 muda o enquadramento. */
  function photo(p, variant) {
    if (p.photoIndex == null) return image(p, 0);
    const id = PHOTO_IDS[p.photoIndex];
    if (!id) return image(p, 0);
    const crops = ['entropy','center','faces'];
    return 'https://images.unsplash.com/photo-' + id +
      '?auto=format&fit=crop&w=600&h=600&q=80&crop=' + (crops[(variant || 0) % 3]);
  }

  /** Ilustração SVG local — usada se a foto falhar (offline). */
  function image(p, variant) {
    variant = variant || 0;
    const c1 = p.bg[0], c2 = p.bg[1];
    const glow = ['rgba(255,255,255,.30)', 'rgba(255,255,255,.16)', 'rgba(255,255,255,.42)'][variant % 3];
    const d = ICONS[p.icon] || ICONS.phone;
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient>' +
      '<radialGradient id="r"><stop offset="0" stop-color="' + glow + '"/><stop offset="1" stop-color="rgba(255,255,255,0)"/></radialGradient></defs>' +
      '<rect width="600" height="600" fill="url(#g)"/>' +
      '<circle cx="440" cy="150" r="240" fill="url(#r)"/>' +
      '<circle cx="120" cy="500" r="170" fill="url(#r)" opacity=".6"/>' +
      '<g opacity=".07" stroke="#fff" stroke-width="1"><path d="M0 150h600M0 300h600M0 450h600M150 0v600M300 0v600M450 0v600"/></g>' +
      '<g transform="translate(150,150) scale(12.5)" fill="none" stroke="#ffffff" stroke-width="1.3" ' +
      'stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></g>' +
      '<text x="40" y="560" font-family="Segoe UI, sans-serif" font-size="22" font-weight="700" ' +
      'fill="rgba(255,255,255,.85)" letter-spacing="3">MOSS · ' + p.id + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  /** Tag <img> com foto real e fallback SVG automático. */
  function img(p, alt, variant, cls, id) {
    const fallback = image(p, variant || 0);
    return '<img' + (id ? ' id="' + esc(id) + '"' : '') + (cls ? ' class="' + cls + '"' : '') +
      ' src="' + esc(photo(p, variant)) + '" alt="' + esc(alt || p.name) + '" loading="lazy"' +
      ' onerror="this.onerror=null;this.src=\'' + fallback + '\'">';
  }

  function all() {
    if (!MOSS.store) return PRODUCTS.slice();
    const s = MOSS.store.get();
    const overrides = s.adminProducts || {};
    const deleted = s.deletedProducts || [];
    const custom = s.customProducts || [];
    return PRODUCTS.concat(custom)
      .filter(function (p) { return deleted.indexOf(p.id) < 0; })
      .map(function (p) {
        const o = overrides[p.id];
        return o ? Object.assign({}, p, { price:o.price, stock:o.stock }) : Object.assign({}, p);
      });
  }

  function byId(id) { return all().find(function (p) { return p.id === id; }) || null; }
  function categories() { return CATEGORIES.slice(); }
  function categoryName(id) {
    const c = CATEGORIES.find(function (x) { return x.id === id; });
    return c ? c.name : id;
  }

  MOSS.catalog = {
    all: all, byId: byId, categories: categories, categoryName: categoryName,
    image: image, photo: photo, img: img, raw: PRODUCTS, PHOTO_IDS: PHOTO_IDS
  };
})(window);
