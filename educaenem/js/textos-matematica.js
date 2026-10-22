/* Textos de apoio BNCC — Matemática (EM) */
const TEXTOS_MAT = [
  {
    id: "txt-mat-1",
    disciplina: "matematica",
    trimestre: 1,
    tipo: "artigo",
    fonte: "Adaptado de material didático sobre cartografia e logística urbana",
    titulo: "Trabalho por aplicativo: como a escala do mapa ajuda a planejar a rota",
    habilidades: ["EM13MAT105"],
    corpo: "<p>O trabalho de quem faz entregas por aplicativo depende de decisões rápidas: qual caminho seguir, quanto tempo a rota vai levar, se o trajeto mais curto compensa ou não. Para decidir, o entregador consulta o mapa na tela do celular. No entanto, todo mapa é uma representação reduzida da realidade, e essa redução segue uma razão fixa, chamada escala. Uma escala de 1:5 000 indica que cada 1 centímetro medido no mapa corresponde a 5 000 centímetros no terreno, ou seja, 50 metros.</p><p>Em um mapa das proximidades do bairro central, a rota que sai do centro de distribuição, passa pela avenida principal e termina no conjunto residencial mede 16,8 cm no papel. Aplicando a escala, obtém-se a distância real: 16,8 cm no mapa vezes 5 000 = 84 000 cm reais = 840 metros.</p><p>Outra rota acompanha a margem do rio, evita a avenida e mede 15,0 cm no mesmo mapa, o que representa 750 metros reais. As duas opções têm comprimentos muito parecidos — 840 metros e 750 metros, uma diferença de apenas 90 metros —, mas o tempo estimado de percurso não é o mesmo: pela avenida, o trânsito e os semáforos fazem a viagem durar cerca de 6 minutos a mais.</p><p>Por isso o entregador compara não apenas distâncias, mas também tempo. A velocidade média é outra razão importante: a distância percorrida dividida pelo tempo gasto. Quem entende essas relações usa proporções e razões para trabalhar de forma mais eficiente, econômica e segura.</p>",
    questoes: [
      {
        enunciado: "No mapa descrito, a rota principal mede 16,8 cm e a escala é de 1:5 000. Qual é a distância real correspondente?",
        alternativas: [
          "84 m",
          "420 m",
          "840 m",
          "4 200 m",
          "42 000 m"
        ],
        correta: 2,
        comentario: "A escala 1:5 000 significa que 1 cm no mapa representa 5 000 cm no terreno. Multiplicando a medida do trajeto: 16,8 × 5 000 = 84 000 cm. Como 1 m equivale a 100 cm, 84 000 cm = 840 m. A alternativa correta é a (C). O distrator de 84 m nasce de aplicar a razão errada 1 cm = 5 m; os de 420 m, 4.200 m e 42.000 m correspondem a erros de ordem de grandeza na conversão de centímetros para metros (84.000 cm não são 84.000 m, e 84.000 ÷ 100 = 840).",
      },
      {
        enunciado: "O entregador percorreu a rota secundária, cuja distância real é de 750 m, em 6 minutos. Qual foi sua velocidade média, em km/h?",
        alternativas: [
          "6,0 km/h",
          "6,5 km/h",
          "7,0 km/h",
          "7,5 km/h",
          "12,5 km/h"
        ],
        correta: 3,
        comentario: "Velocidade média = distância / tempo. A rota tem 750 m e foi percorrida em 6 min, logo a velocidade é 750 / 6 = 125 metros por minuto. Para converter em km/h, multiplique por 60: 125 × 60 = 7 500 m/h = 7,5 km/h. O gabarito é (D). Esse valor é coerente com o ritmo de uma bicicleta ou motocicleta em trânsito urbano.",
      }
    ]
  },
  {
    id: "txt-mat-2",
    disciplina: "matematica",
    trimestre: 2,
    tipo: "noticia",
    fonte: "Adaptado de reportagem sobre educação financeira e crédito",
    titulo: "Financiar ou pagar à vista? Os juros mudam completamente o preço final",
    habilidades: ["EM13MAT101", "EM13MAT205"],
    corpo: "<p>Uma família decide comprar uma motocicleta usada. Na loja, o preço de tabela é de R$ 20.000,00 e há duas formas de pagamento: à vista, com desconto, ou parcelado em 24 prestações fixas de R$ 1.087,00. O valor da prestação é definido no contrato de financiamento e inclui não apenas o preço do bem, mas também juros, taxas administrativas e seguros cobrados pela financeira.</p><p>Quem escolhe o parcelamento desembolsa, ao final de dois anos, 24 × R$ 1.087,00, ou seja, um total bem superior ao preço anunciado. Cada prestação não é simplesmente uma fração do preço: ela carrega o custo do dinheiro emprestado.</p><p>Para quem paga à vista, a loja oferece 8% de desconto sobre o preço de tabela. Percentagem é uma razão de denominador 100: 8% significa 8 em cada 100, isto é, 0,08. Comparar valores percentuais exige sempre definir a base de comparação — 8% do preço de tabela não é a mesma coisa que 8% do total financiado.</p><p>Quando o assunto é crédito, a comparação honesta se dá entre o que se paga ao fim do contrato e o preço original do bem. Números absolutos, como os R$ 6.088,00 de diferença nesse exemplo, só revelam sua magnitude quando transformados em porcentagem do preço de tabela — e é essa comparação que mostra o custo real do financiamento.</p>",
    questoes: [
      {
        enunciado: "Cada uma das 24 prestações do financiamento corresponde a quantos por cento, aproximadamente, do preço de tabela de R$ 20.000,00?",
        alternativas: [
          "4,4%",
          "5,4%",
          "6,4%",
          "7,2%",
          "8,0%"
        ],
        correta: 1,
        comentario: "A parcela é R$ 1.087,00 e o preço de tabela é R$ 20.000,00. A razão entre eles é 1.087 / 20.000 = 0,05435. Multiplicando por 100, obtém-se 5,435%, aproximadamente 5,4%. O gabarito é (B). Perceba que o valor 8% é um distrator: ele é o desconto oferecido no pagamento à vista, não a relação entre prestação e preço.",
      },
      {
        enunciado: "Ao optar pelo pagamento à vista, com 8% de desconto sobre o preço de tabela, quanto o comprador economiza em relação ao total desembolsado no financiamento em 24 parcelas?",
        alternativas: [
          "R$ 7.688,00",
          "R$ 6.088,00",
          "R$ 8.000,00",
          "R$ 9.400,00",
          "R$ 18.400,00"
        ],
        correta: 0,
        comentario: "Total pago no financiamento: 24 × R$ 1.087,00 = R$ 26.088,00. Valor à vista com 8% de desconto: R$ 20.000,00 × 0,92 = R$ 18.400,00. A economia é a diferença: 26.088 − 18.400 = R$ 7.688,00. O gabarito é (A). O distrator de R$ 6.088,00 corresponde apenas ao acréscimo do financiamento sobre o preço de tabela, e o de R$ 18.400,00 é o próprio valor à vista, não a economia.",
      }
    ]
  },
  {
    id: "txt-mat-3",
    disciplina: "matematica",
    trimestre: 2,
    tipo: "infografico",
    fonte: "Adaptado de infográfico de pesquisa escolar",
    titulo: "Quanto custa chegar à escola? Pesquisa com estudantes do noturno",
    habilidades: ["EM13MAT102", "EM13MAT202"],
    corpo: "<p>Uma escola pública da periferia de uma capital ouviu 40 estudantes do período noturno sobre o quanto gastam por mês para chegar até a escola. A pesquisa foi feita com um questionário simples, aplicado em uma única semana, e os resultados foram organizados em uma tabela de frequências. O tema interessa porque transporte consome parte significativa do orçamento de muitas famílias e interfere na permanência do aluno na escola.</p><p>A tabela a seguir resume os dados coletados:</p><table border='1' cellpadding='6' style='border-collapse:collapse'><thead><tr><th>Gasto mensal (R$)</th><th>Número de estudantes</th></tr></thead><tbody><tr><td>20</td><td>4</td></tr><tr><td>40</td><td>8</td></tr><tr><td>50</td><td>6</td></tr><tr><td>80</td><td>10</td></tr><tr><td>100</td><td>6</td></tr><tr><td>120</td><td>6</td></tr></tbody></table><p>Para resumir um conjunto de dados, a estatística usa medidas de tendência central. A média aritmética é a soma de todos os valores dividida pela quantidade de observações e indica o valor esperado por estudante. A mediana é o valor que separa a amostra ao meio, deixando metade dos dados abaixo e metade acima: por ser menos sensível a valores extremos, ela mostra melhor o estudante típico. A moda é o valor que mais se repete na amostra.</p><p>Nenhuma dessas medidas resume sozinha a realidade. Ler corretamente uma pesquisa de opinião envolve entender como os dados foram coletados, qual é o universo pesquisado e qual medida de resumo está sendo apresentada — habilidade essencial para interpretar notícias, gráficos e pesquisas eleitorais.</p>",
    questoes: [
      {
        enunciado: "De acordo com os dados do infográfico, o gasto médio mensal por estudante é de",
        alternativas: [
          "R$ 65,00",
          "R$ 68,50",
          "R$ 70,00",
          "R$ 74,00",
          "R$ 70,50"
        ],
        correta: 4,
        comentario: "Soma ponderada dos gastos: 20×4 + 40×8 + 50×6 + 80×10 + 100×6 + 120×6 = 80 + 320 + 300 + 800 + 600 + 720 = R$ 2.820,00. Como foram consultados 40 estudantes, a média é 2.820 / 40 = R$ 70,50. O gabarito é (E). Erros comuns incluem dividir pelo número de faixas de valor em vez do número de estudantes.",
      },
      {
        enunciado: "Analisando os dados da pesquisa, qual afirmação está correta?",
        alternativas: [
          "A moda é R$ 120,00, valor gasto pela maioria dos estudantes.",
          "A mediana dos gastos é R$ 60,00.",
          "A média dos gastos é superior à mediana.",
          "A moda é R$ 80,00, valor gasto pelo maior número de estudantes.",
          "As medidas de média, mediana e moda são iguais nessa pesquisa."
        ],
        correta: 3,
        comentario: "A moda é o valor de maior frequência: R$ 80,00 aparece para 10 estudantes, mais do que qualquer outro valor, portanto (D) é a correta. Com 40 dados, a mediana fica entre o 20º e o 21º valores, ambos na faixa de R$ 80,00 — a mediana vale R$ 80,00, não R$ 60,00. A média, R$ 70,50, é menor que a mediana. As demais alternativas contradizem os dados do infográfico.",
      }
    ]
  },
  {
    id: "txt-mat-4",
    disciplina: "matematica",
    trimestre: 1,
    tipo: "tabela",
    fonte: "Adaptado de tabela comparativa de transporte por aplicativo",
    titulo: "Corrida por aplicativo: comparando duas formas de cobrança",
    habilidades: ["EM13MAT201", "EM13MAT205"],
    corpo: "<p>Em uma grande cidade, duas empresas oferecem corridas de automóvel por aplicativo no horário de pico, com regras diferentes de cobrança. A empresa Alfa cobra uma taxa fixa de R$ 4,80 por corrida mais R$ 2,60 por quilômetro rodado. A empresa Beta cobra uma taxa fixa de R$ 6,00 por corrida mais R$ 2,00 por quilômetro rodado. Se d representa a distância em quilômetros, os valores pagos são dados pelas expressões C<sub>Alfa</sub>(d) = 4,80 + 2,60 d e C<sub>Beta</sub>(d) = 6,00 + 2,00 d, respectivamente.</p><p>Os dados estão resumidos na tabela:</p><table border='1' cellpadding='6' style='border-collapse:collapse'><thead><tr><th>Empresa</th><th>Taxa fixa por corrida</th><th>Valor por quilômetro</th></tr></thead><tbody><tr><td>Alfa</td><td>R$ 4,80</td><td>R$ 2,60</td></tr><tr><td>Beta</td><td>R$ 6,00</td><td>R$ 2,00</td></tr></tbody></table><p>As duas cobranças são modeladas por funções do 1º grau (funções afins), porque o valor pago varia linearmente com a distância — não proporcionalmente, já que existe taxa fixa: a cada quilômetro a mais, o preço cresce sempre na mesma quantidade — R$ 2,60 na Alfa e R$ 2,00 na Beta. O número que multiplica a distância é o coeficiente angular da função, e o valor acrescido mesmo com distância zero é o coeficiente linear.</p><p>Escolher a empresa mais barata exige comparar as duas funções. Como a Beta tem taxa fixa maior, mas custo por quilômetro menor, ela se torna vantajosa apenas a partir de certa distância. Descobrir essa distância de equilíbrio, em que as duas cobranças se igualam, é um problema típico de função afim, muito usado na análise de planos de celular, tarifas de energia e contratos de serviços.</p>",
    questoes: [
      {
        enunciado: "Para uma corrida de 8 km, qual é o valor total cobrado pela empresa Alfa?",
        alternativas: [
          "R$ 20,80",
          "R$ 22,80",
          "R$ 25,60",
          "R$ 28,00",
          "R$ 30,40"
        ],
        correta: 2,
        comentario: "A cobrança da Alfa é C(d) = 4,80 + 2,60 d. Para d = 8: C(8) = 4,80 + 2,60 × 8 = 4,80 + 20,80 = R$ 25,60. O gabarito é (C). O distrator de R$ 20,80 corresponde a considerar apenas a parte variável, esquecendo de somar a taxa fixa; o de R$ 22,80 não é o valor da Beta: 6,00 + 2,00 × 8 = R$ 22,00, valor que nem consta das alternativas; trata-se apenas de um distrator aritmético.",
      },
      {
        enunciado: "Comparando as duas empresas, para quais valores de distância a empresa Beta cobra menos que a Alfa?",
        alternativas: [
          "Exatamente 2 km.",
          "Qualquer distância.",
          "Menores que 2 km.",
          "Nunca, pois o valor é o mesmo em todas as distâncias.",
          "Maiores que 2 km."
        ],
        correta: 4,
        comentario: "Igualando as cobranças: 4,80 + 2,60 d = 6,00 + 2,00 d, o que dá 0,60 d = 1,20 e, portanto, d = 2 km. Em 2 km, ambas cobram R$ 10,00. Para distâncias menores que 2 km, a Alfa é mais barata; acima de 2 km, a menor taxa por quilômetro da Beta se impõe. O gabarito é (E). Graficamente, 2 km é a abscissa do ponto de encontro das duas retas.",
      }
    ]
  },
  {
    id: "txt-mat-5",
    disciplina: "matematica",
    trimestre: 3,
    tipo: "artigo",
    fonte: "Adaptado de matéria sobre construção civil e recursos hídricos",
    titulo: "Da laje à cisterna: onde a geometria aparece em uma obra",
    habilidades: ["EM13MAT301", "EM13MAT305"],
    corpo: "<p>Em regiões de longos períodos sem chuva, reservatórios para armazenar água de chuva tornaram-se comuns em sítios e comunidades rurais. Um modelo muito usado tem formato cilíndrico, com raio da base de 1,2 metro e altura de 2,0 metros. Calcular quanto de água ele armazena exige trabalhar com duas grandezas diferentes: a área da base circular, medida em metros quadrados, e o volume do cilindro, medido em metros cúbicos.</p><p>Ao redor do reservatório, a equipe da obra cercou um terreno retangular de 12 metros por 9 metros, dando três voltas de arame. Para saber quantos metros de arame comprar, é necessário calcular o perímetro do retângulo, isto é, a soma de todos os lados. Vale lembrar que 1 metro cúbico equivale a 1 000 litros, o que permite expressar a capacidade do reservatório em litros, unidade em que as caixas de água são vendidas.</p><p>Área, perímetro e volume são grandezas distintas e precisam de unidades distintas. A área responde quanta superfície existe no plano da base, o perímetro responde qual é o contorno da figura, e o volume informa quanto espaço interno há para armazenar água. Confundir essas medidas leva a erros de compra muito comuns em obras: quem calcula apenas a área da laje esquece de multiplicar pela espessura e não obtém o volume de concreto (em m³) necessário, errando a quantidade a comprar, e quem calcula área em vez de perímetro compra arame insuficiente para uma cerca.</p><p>Na prática, a matemática da obra funciona como uma linguagem: croquis, plantas e listas de materiais traduzem medidas reais para cálculos que orientam a compra, o transporte e a execução do serviço.</p>",
    questoes: [
      {
        enunciado: "Usando π = 3, a capacidade aproximada da cisterna cilíndrica, em litros, é de",
        alternativas: [
          "8 640",
          "7 200",
          "9 600",
          "10 240",
          "4 320"
        ],
        correta: 0,
        comentario: "O volume do cilindro é V = π r² h. Com π = 3, r = 1,2 m e h = 2,0 m: r² = 1,44 m²; área da base = 3 × 1,44 = 4,32 m²; volume = 4,32 × 2,0 = 8,64 m³. Como 1 m³ = 1 000 L, a capacidade é aproximadamente 8 640 litros. O gabarito é (A). O distrator de 4 320 litros resulta de tratar a área da base (4,32) como se fosse o volume em m³, esquecendo de multiplicar pela altura.",
      },
      {
        enunciado: "Para proteger a obra, cercaram um terreno retangular de 12 m por 9 m com três voltas de arame. Quantos metros de arame foram utilizados?",
        alternativas: [
          "84 m",
          "108 m",
          "126 m",
          "168 m",
          "252 m"
        ],
        correta: 2,
        comentario: "O perímetro do retângulo é P = 2 × (12 + 9) = 2 × 21 = 42 m. Com três voltas de arame, o total é 3 × 42 = 126 m. O gabarito é (C). Cuidado com os distratores: 84 m corresponde a duas voltas, 168 m a quatro voltas, 252 m a seis voltas e 108 à área do terreno (12 × 9 = 108 m²), grandeza que não resolve o problema da cerca.",
      }
    ]
  },
  {
    id: "txt-mat-6",
    disciplina: "matematica",
    trimestre: 3,
    tipo: "noticia",
    fonte: "Adaptado de notícia sobre sorteios beneficentes",
    titulo: "Rifa da comunidade: o que a probabilidade diz sobre a chance de prêmio",
    habilidades: ["EM13MAT205", "EM13MAT505"],
    corpo: "<p>Associações de bairro e grupos escolares costumam realizar rifas para arrecadar fundos. Em uma campanha realizada no fim de semana, foram vendidos 400 bilhetes numerados e havia um único prêmio: uma bicicleta. A chance de ganhar depende diretamente da quantidade de bilhetes comprados — quem adquire 2 bilhetes concorre com 2 dos 400 papéis sorteados.</p><p>Em outro sorteio, uma peneira escolheu 6 famílias premiadas entre 20 nomes colocados em uma urna. A coordenadora da campanha quer aumentar a atração e discute acrescentar mais papéis premiados à urna antes do próximo sorteio. Quantos papéis premiados seriam necessários para dobrar a chance inicial de cada participante?</p><p>Em sorteios como esses, quando todos os papéis têm a mesma chance de ser retirados, diz-se que o espaço amostral é equiprovável. A probabilidade de um evento é a razão entre o número de casos favoráveis e o número de casos possíveis, e a porcentagem correspondente é essa razão multiplicada por 100.</p><p>Interpretar corretamente essas chances é uma forma de educação financeira e estatística: pequenas porcentagens de probabilidade descrevem riscos reais, e comparar probabilidades permite decidir racionalmente — seja na compra de um bilhete de rifa, seja na análise de um seguro, de uma loteria ou de um exame médico.</p>",
    questoes: [
      {
        enunciado: "Na rifa com 400 bilhetes e um único prêmio, qual é a probabilidade de que ganhe quem adquiriu 2 bilhetes?",
        alternativas: [
          "0,2%",
          "0,5%",
          "1,0%",
          "2,0%",
          "5,0%"
        ],
        correta: 1,
        comentario: "Em sorteio equiprovável, probabilidade = casos favoráveis / casos possíveis = 2 / 400 = 0,005. Convertendo em porcentagem: 0,005 × 100 = 0,5%. O gabarito é (B). O distrator de 0,2% nasce de dividir 2 por 1.000 em vez de 400 (2/1.000 = 0,002 = 0,2%), o de 2% de tomar 100 como total (2/100 = 2%) e o de 5% de usar 20 como numerador (20/400 = 5%).",
      },
      {
        enunciado: "Em um sorteio com 20 papéis na urna, dos quais 6 são premiados, quantos papéis premiados devem ser acrescentados para que a probabilidade de sortear um premiado chegue a 60%?",
        alternativas: [
          "6",
          "9",
          "12",
          "14",
          "15"
        ],
        correta: 4,
        comentario: "A chance inicial é 6 / 20 = 0,30 (30%). Dobrá-la significa atingir 60%. Acrescentando x papéis premiados, tanto os favorecidos quanto os possíveis aumentam: (6 + x) / (20 + x) = 0,60. Resolvendo: 6 + x = 12 + 0,6 x, logo 0,4 x = 6 e x = 15. Verificação: 21 / 35 = 0,60, ou seja, exatamente 60%. O gabarito é (E). O distrator 6 corresponde a dobrar apenas o número de premiados, esquecendo que o total de papéis também cresce.",
      }
    ]
  }
];
if (typeof window !== "undefined") { window.TEXTOS_MAT = TEXTOS_MAT; }
