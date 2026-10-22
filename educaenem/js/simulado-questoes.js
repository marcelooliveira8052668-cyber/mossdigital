/* =============================================================================
   Simulado Express ENEM — Banco de questoes
   309 questoes estilo ENEM, com correcao automatica e comentario.
   Formato: { disciplina, enunciado, alternativas[5], correta, comentario }
   ============================================================================= */

const SIMULADO_QUESTOES = [
  {
    "disciplina": "Matemática",
    "trimestre": 1,
    "habilidades": [
      "EM13MAT105"
    ],
    "enunciado": "No mapa descrito, a rota principal mede 16,8 cm e a escala é de 1:5 000. Qual é a distância real correspondente?",
    "alternativas": [
      "840 m",
      "42 000 m",
      "84 m",
      "4 200 m",
      "420 m"
    ],
    "correta": 0,
    "comentario": "A escala 1:5 000 significa que 1 cm no mapa representa 5 000 cm no terreno. Multiplicando a medida do trajeto: 16,8 × 5 000 = 84 000 cm. Como 1 m equivale a 100 cm, 84 000 cm = 840 m. A alternativa correta é a (A). O distrator de 42 000 m nasce de usar metade da medida do trajeto (8,4 × 5 000 = 42 000, valor ainda em centímetros) e o de 420 m de converter esse mesmo resultado errado: 42 000 cm = 420 m."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 1,
    "habilidades": [
      "EM13MAT105"
    ],
    "enunciado": "O entregador percorreu a rota secundária, cuja distância real é de 750 m, em 6 minutos. Qual foi sua velocidade média, em km/h?",
    "alternativas": [
      "6,5 km/h",
      "7,5 km/h",
      "7,0 km/h",
      "12,5 km/h",
      "6,0 km/h"
    ],
    "correta": 1,
    "comentario": "Velocidade média = distância / tempo. A rota tem 750 m e foi percorrida em 6 min, logo a velocidade é 750 / 6 = 125 metros por minuto. Para converter em km/h, multiplique por 60: 125 × 60 = 7 500 m/h = 7,5 km/h. O gabarito é (B). Esse valor é coerente com o ritmo de uma bicicleta ou motocicleta em trânsito urbano."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 2,
    "habilidades": [
      "EM13MAT101",
      "EM13MAT205"
    ],
    "enunciado": "Cada uma das 24 prestações do financiamento corresponde a quantos por cento, aproximadamente, do preço de tabela de R$ 20.000,00?",
    "alternativas": [
      "6,4%",
      "7,2%",
      "5,4%",
      "8,0%",
      "4,4%"
    ],
    "correta": 2,
    "comentario": "A parcela é R$ 1.087,00 e o preço de tabela é R$ 20.000,00. A razão entre eles é 1.087 / 20.000 = 0,05435. Multiplicando por 100, obtém-se 5,435%, aproximadamente 5,4%. O gabarito é (C). Perceba que o valor 8% é um distrator: ele é o desconto oferecido no pagamento à vista, não a relação entre prestação e preço."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 2,
    "habilidades": [
      "EM13MAT101",
      "EM13MAT205"
    ],
    "enunciado": "Ao optar pelo pagamento à vista, com 8% de desconto sobre o preço de tabela, quanto o comprador economiza em relação ao total desembolsado no financiamento em 24 parcelas?",
    "alternativas": [
      "R$ 6.088,00",
      "R$ 8.000,00",
      "R$ 18.400,00",
      "R$ 7.688,00",
      "R$ 9.400,00"
    ],
    "correta": 3,
    "comentario": "Total pago no financiamento: 24 × R$ 1.087,00 = R$ 26.088,00. Valor à vista com 8% de desconto: R$ 20.000,00 × 0,92 = R$ 18.400,00. A economia é a diferença: 26.088 − 18.400 = R$ 7.688,00. O gabarito é (D). O distrator de R$ 6.088,00 corresponde apenas ao acréscimo do financiamento sobre o preço de tabela, e o de R$ 18.400,00 é o próprio valor à vista, não a economia."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 2,
    "habilidades": [
      "EM13MAT102",
      "EM13MAT202"
    ],
    "enunciado": "De acordo com os dados do infográfico, o gasto médio mensal por estudante é de",
    "alternativas": [
      "R$ 68,50",
      "R$ 65,00",
      "R$ 74,00",
      "R$ 70,00",
      "R$ 70,50"
    ],
    "correta": 4,
    "comentario": "Soma ponderada dos gastos: 20×4 + 40×8 + 50×6 + 80×10 + 100×6 + 120×6 = 80 + 320 + 300 + 800 + 600 + 720 = R$ 2.820,00. Como foram consultados 40 estudantes, a média é 2.820 / 40 = R$ 70,50. O gabarito é (E). Erros comuns incluem dividir pelo número de faixas de valor em vez do número de estudantes."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 2,
    "habilidades": [
      "EM13MAT102",
      "EM13MAT202"
    ],
    "enunciado": "Analisando os dados da pesquisa, qual afirmação está correta?",
    "alternativas": [
      "A moda é R$ 80,00, valor gasto pelo maior número de estudantes.",
      "A mediana dos gastos é R$ 60,00.",
      "As medidas de média, mediana e moda são iguais nessa pesquisa.",
      "A média dos gastos é superior à mediana.",
      "A moda é R$ 120,00, valor gasto pela maioria dos estudantes."
    ],
    "correta": 0,
    "comentario": "A moda é o valor de maior frequência: R$ 80,00 aparece para 10 estudantes, mais do que qualquer outro valor, portanto (A) é a correta. Com 40 dados, a mediana fica entre o 20º e o 21º valores, ambos na faixa de R$ 80,00 — a mediana vale R$ 80,00, não R$ 60,00. A média, R$ 70,50, é menor que a mediana. As demais alternativas contradizem os dados do infográfico."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 1,
    "habilidades": [
      "EM13MAT201",
      "EM13MAT205"
    ],
    "enunciado": "Para uma corrida de 8 km, qual é o valor total cobrado pela empresa Alfa?",
    "alternativas": [
      "R$ 28,00",
      "R$ 25,60",
      "R$ 22,80",
      "R$ 30,40",
      "R$ 20,80"
    ],
    "correta": 1,
    "comentario": "A cobrança da Alfa é C(d) = 4,80 + 2,60 d. Para d = 8: C(8) = 4,80 + 2,60 × 8 = 4,80 + 20,80 = R$ 25,60. O gabarito é (B). O distrator de R$ 20,80 corresponde a considerar apenas a parte variável, esquecendo de somar a taxa fixa; o de R$ 22,80 não é o valor da Beta: 6,00 + 2,00 × 8 = R$ 22,00, valor que nem consta das alternativas — trata-se apenas de um distrator aritmético."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 1,
    "habilidades": [
      "EM13MAT201",
      "EM13MAT205"
    ],
    "enunciado": "Comparando as duas empresas, para quais valores de distância a empresa Beta cobra menos que a Alfa?",
    "alternativas": [
      "Menores que 2 km.",
      "Exatamente 2 km.",
      "Maiores que 2 km.",
      "Nunca, pois o valor é o mesmo em todas as distâncias.",
      "Qualquer distância."
    ],
    "correta": 2,
    "comentario": "Igualando as cobranças: 4,80 + 2,60 d = 6,00 + 2,00 d, o que dá 0,60 d = 1,20 e, portanto, d = 2 km. Em 2 km, ambas cobram R$ 10,00. Para distâncias menores que 2 km, a Alfa é mais barata; acima de 2 km, a menor taxa por quilômetro da Beta se impõe. O gabarito é (C). Graficamente, 2 km é a abscissa do ponto de encontro das duas retas."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 3,
    "habilidades": [
      "EM13MAT301",
      "EM13MAT305"
    ],
    "enunciado": "Usando π = 3, a capacidade aproximada da cisterna cilíndrica, em litros, é de",
    "alternativas": [
      "10 240",
      "9 600",
      "4 320",
      "8 640",
      "7 200"
    ],
    "correta": 3,
    "comentario": "O volume do cilindro é V = π r² h. Com π = 3, r = 1,2 m e h = 2,0 m: r² = 1,44 m²; área da base = 3 × 1,44 = 4,32 m²; volume = 4,32 × 2,0 = 8,64 m³. Como 1 m³ = 1 000 L, a capacidade é aproximadamente 8 640 litros. O gabarito é (D). O distrator de 4 320 litros resulta de esquecer de multiplicar pela altura, usando apenas a área da base."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 3,
    "habilidades": [
      "EM13MAT301",
      "EM13MAT305"
    ],
    "enunciado": "Para proteger a obra, cercaram um terreno retangular de 12 m por 9 m com três voltas de arame. Quantos metros de arame foram utilizados?",
    "alternativas": [
      "168 m",
      "108 m",
      "252 m",
      "84 m",
      "126 m"
    ],
    "correta": 4,
    "comentario": "O perímetro do retângulo é P = 2 × (12 + 9) = 2 × 21 = 42 m. Com três voltas de arame, o total é 3 × 42 = 126 m. O gabarito é (E). Cuidado com os distratores: 84 m corresponde a duas voltas, 168 m a quatro voltas e 108 m² à área do terreno (12 × 9), grandeza que não resolve o problema da cerca."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 3,
    "habilidades": [
      "EM13MAT205",
      "EM13MAT505"
    ],
    "enunciado": "Na rifa com 400 bilhetes e um único prêmio, qual é a probabilidade de que ganhe quem adquiriu 2 bilhetes?",
    "alternativas": [
      "0,5%",
      "2,0%",
      "1,0%",
      "5,0%",
      "0,2%"
    ],
    "correta": 0,
    "comentario": "Em sorteio equiprovável, probabilidade = casos favoráveis / casos possíveis = 2 / 400 = 0,005. Convertendo em porcentagem: 0,005 × 100 = 0,5%. O gabarito é (A). O distrator de 2% nasce de multiplicar por 100 duas vezes ou de confundir a fração com a porcentagem, e o de 5% corresponde a errar o total, dividindo os 2 bilhetes por 40 (2/40 = 5%)."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 3,
    "habilidades": [
      "EM13MAT205",
      "EM13MAT505"
    ],
    "enunciado": "Em um sorteio com 20 papéis na urna, dos quais 6 são premiados, quantos papéis premiados devem ser acrescentados para que a probabilidade de sortear um premiado chegue a 60%?",
    "alternativas": [
      "6",
      "15",
      "9",
      "12",
      "14"
    ],
    "correta": 1,
    "comentario": "A chance inicial é 6 / 20 = 0,30 (30%). Dobrá-la significa atingir 60%. Acrescentando x papéis premiados, tanto os favorecidos quanto os possíveis aumentam: (6 + x) / (20 + x) = 0,60. Resolvendo: 6 + x = 12 + 0,6 x, logo 0,4 x = 6 e x = 15. Verificação: 21 / 35 = 0,60, ou seja, exatamente 60%. O gabarito é (B). O distrator 6 corresponde a dobrar apenas o número de premiados, esquecendo que o total de papéis também cresce."
  },
  {
    "disciplina": "Língua Portuguesa",
    "trimestre": 1,
    "habilidades": [
      "EM13LP101",
      "EM13LP201"
    ],
    "enunciado": "No cartaz da campanha de doação de sangue, a frase «Doe sangue. Você não precisa ser herói para salvar uma vida.» está organizada a partir do uso do pronome «você» e do verbo no imperativo. Esses recursos concentram-se predominantemente em qual função da linguagem?",
    "alternativas": [
      "Referencial, porque a frase informa de maneira objetiva os horários e o endereço do hemocentro.",
      "Poética, porque a escolha das palavras valoriza a sonoridade e a própria forma do enunciado.",
      "Apelativa, porque o enunciado se volta diretamente para o destinatário, com o objetivo de mobilizá-lo a doar sangue.",
      "Emotiva, porque o cartaz expressa antes de tudo o sentimento de solidariedade de quem produz a mensagem.",
      "Metalinguística, porque a frase explica ao público o significado da palavra «sangue»."
    ],
    "correta": 2,
    "comentario": "As funções da linguagem foram sistematizadas a partir da ênfase em um dos elementos da comunicação. Quando a mensagem se organiza em torno do destinatário — como no uso do pronome «você» e do verbo no imperativo «Doe» —, predomina a função apelativa (ou conativa), característica de textos que pretendem convencer, ordenar ou convocar. A função referencial apareceria se o cartaz se limitasse a informar dados; a emotiva, se o foco fosse a emoção do emissor; a poética, se o enunciado explorasse a forma em si mesma; e a metalinguística, se a mensagem falasse do próprio código. O cartaz descrito mistura funções, mas o núcleo do convite é apelativo."
  },
  {
    "disciplina": "Língua Portuguesa",
    "trimestre": 1,
    "habilidades": [
      "EM13LP101",
      "EM13LP201"
    ],
    "enunciado": "Segundo o texto, a substituição da expressão original «seja um herói» por «você não precisa ser herói para salvar uma vida» produziu o seguinte efeito:",
    "alternativas": [
      "Fortaleceu a função emotiva, uma vez que o enunciado passou a centrar-se na emoção de quem realiza a doação.",
      "Deslocou o foco para o próprio código, tornando a peça metalinguística ao explicar em palavras o ato de doar.",
      "Manteve a função referencial do cartaz, já que a frase passou a informar dados objetivos sobre o estoque do hemocentro.",
      "Reduziu a distância entre o serviço público e o cidadão, ao sugerir que doar sangue é um ato acessível a qualquer pessoa, e não um feito excepcional.",
      "Transformou o cartaz em texto injuntivo, pois eliminou qualquer referência ao destinatário da mensagem."
    ],
    "correta": 3,
    "comentario": "O texto explicita que a palavra «herói» afastava parte do público porque sugeria um ato excepcional, reservado a poucos. A nova formulação preserva a ideia de salvamento de vidas, mas a apresenta como algo acessível ao cidadão comum, aproximando o serviço público do leitor. Isso mantém — e até reforça — a função apelativa, porque o convite se dirige ainda mais diretamente ao destinatário. As demais alternativas descrevem efeitos que o texto não sustenta: não houve acréscimo de informação objetiva (referencial), nem foco na emoção do emissor (emotiva), nem explicação sobre o código (metalinguística)."
  },
  {
    "disciplina": "Língua Portuguesa",
    "trimestre": 2,
    "habilidades": [
      "EM13LP202",
      "EM13LP203"
    ],
    "enunciado": "No trecho da reportagem, os conectivos «entretanto», «Por isso» e «Embora» estabelecem, respectivamente, as relações de:",
    "alternativas": [
      "causa, conformidade e condição.",
      "tempo, conclusão e proporção.",
      "explicação, consequência e adição.",
      "condição, finalidade e oposição.",
      "oposição, conclusão e concessão."
    ],
    "correta": 4,
    "comentario": "«Entretanto» é um conectivo adversativo, que institui uma relação de oposição entre o crescimento da malha cicloviária e a ausência de queda proporcional dos acidentes. «Por isso» é conclusivo: apresenta o plano de educação no trânsito como consequência do problema diagnosticado. «Embora» é concessivo: admite que a medida é bem-vinda para, em seguida, limitar seu alcance. Essas três relações — oposição, conclusão e concessão — sustentam a coerência do texto, porque mostram que o repórter não apenas exalta a obra pública nem a desqualifica, mas a dimensiona. Confundir «Embora» com «Portanto», por exemplo, inverteria o sentido da argumentação."
  },
  {
    "disciplina": "Língua Portuguesa",
    "trimestre": 2,
    "habilidades": [
      "EM13LP202",
      "EM13LP203"
    ],
    "enunciado": "O comentário do texto afirma que a escolha do conectivo «não é um ornamento». Com base nessa afirmação, assinale a alternativa que descreve corretamente o efeito da substituição proposta.",
    "alternativas": [
      "O efeito seria diferente, porque a relação de concessão daria lugar a uma relação de conclusão: o leitor passaria a entender que o alerta dos especialistas decorre do apoio à medida, e não que ele impõe um limite a ela.",
      "O efeito seria mais enfático, uma vez que «Portanto» é um conectivo de maior formalidade do que «Embora» e, por isso, mais adequado ao gênero reportagem.",
      "O efeito seria idêntico, pois os dois articuladores pertencem à mesma classe gramatical e, por isso, são intercambiáveis em qualquer texto.",
      "O efeito seria o mesmo, porque as duas expressões indicam que os especialistas apoiam incondicionalmente o plano.",
      "O efeito seria praticamente nulo, já que a coerência de um texto jornalístico depende apenas da ordem em que os parágrafos se apresentam na página."
    ],
    "correta": 0,
    "comentario": "A coerência de um texto não está apenas nas palavras, mas nas relações lógicas que elas estabelecem. «Embora a medida seja bem-vinda, especialistas alertam...» instaura uma relação de concessão: admite-se um lado positivo e, na sequência, ressalva-se um limite. Se o articulador fosse trocado por «Portanto», a relação passaria a ser conclusiva, e o leitor seria induzido a entender que o alerta dos especialistas é consequência do próprio apoio à medida. Por isso o texto afirma que o conectivo funciona como placa de sinalização: ele orienta a direção do raciocínio e pode, se mal escolhido, comprometer a coerência."
  },
  {
    "disciplina": "Língua Portuguesa",
    "trimestre": 3,
    "habilidades": [
      "EM13LP102",
      "EM13LP104"
    ],
    "enunciado": "Na carta da professora e na resposta do editorial, predomina a defesa de que:",
    "alternativas": [
      "a variação linguística é um fenômeno irrelevante diante da necessidade de unidade da língua.",
      "a variação linguística é legítima, e a escola deve ensinar também a modalidade formal sem desqualificar a variedade que o aluno traz de casa.",
      "as variedades regionais devem substituir a norma culta nos textos jurídicos e escolares.",
      "a escrita culta formal deve ser abandonada, porque ela reproduz a desigualdade social.",
      "o desvio de concordância, em qualquer contexto de uso, deve ser aceito sem ressalvas pela escola."
    ],
    "correta": 1,
    "comentario": "Os dois textos convergem: reconhecem a legitimidade científica de todas as variedades do português e, ao mesmo tempo, afirmam que a escola tem o papel de ensinar a modalidade escrita formal. A professora não pede o abandono da norma culta, e sim o fim da confusão entre erro e marca regional; o editorial é explícito ao dizer que a escola deve ensinar a modalidade formal «sem apagar nem desqualificar» a variedade do aluno. As alternativas que propõem substituir a norma culta ou abolir a escrita formal deformam o argumento, e a que trata a variação como irrelevante contraria diretamente o texto."
  },
  {
    "disciplina": "Língua Portuguesa",
    "trimestre": 3,
    "habilidades": [
      "EM13LP102",
      "EM13LP104"
    ],
    "enunciado": "A forma «os menino chegaram», citada na carta da leitora, é utilizada no texto como exemplo de:",
    "alternativas": [
      "construção típica da linguagem literária, empregada com valor estético.",
      "forma arcaica do português, preservada apenas em cidades do interior do estado de Minas Gerais.",
      "marca de uma variedade linguística legítima, distinta da noção de erro, ainda que não corresponda à norma culta escrita.",
      "desvio fonético provocado pela mistura de línguas indígenas com o português.",
      "erro grave de regência verbal, que compromete a inteligibilidade do enunciado."
    ],
    "correta": 2,
    "comentario": "A carta é explícita: «não estamos diante de uma falha de inteligência, mas de um sistema linguístico diferente daquele que a escola valoriza». A expressão «os menino chegaram» ilustra a variação no plano morfológico, comum em várias variedades do português brasileiro, e não um erro de raciocimento. O preconceito linguístico surge justamente quando se trata toda diferença — regional, social ou geracional — como incorreção. Vale notar que a própria resposta do editorial não nega a existência da norma formal: ela apenas recusa a ideia de que uma variedade seja linguisticamente superior a outra."
  },
  {
    "disciplina": "Redação",
    "trimestre": 1,
    "habilidades": [
      "EM13LP101",
      "EM13LP403"
    ],
    "enunciado": "Segundo o texto, o repertório sociocultural é considerado produtivo quando:",
    "alternativas": [
      "é apresentado na conclusão, momento em que sintetiza os argumentos desenvolvidos.",
      "abrange temas contemporâneos, como redes sociais, impactos ambientais e saúde mental.",
      "aparece em todos os parágrafos, garantindo a presença de elementos culturais na dissertação.",
      "é mobilizado para resolver um problema colocado pela tese, e não exposto como ornamento do texto.",
      "consiste em citações de autores clássicos e dados oficiais, que conferem autoridade ao texto."
    ],
    "correta": 3,
    "comentario": "O texto é direto: o repertório «só é produtivo quando é mobilizado para resolver um problema colocado pela tese, não quando é exposto como ornamento». A metáfora da fundação ajuda: sem fundação o edifício não se sustenta, mas a fundação existe para sustentar a construção, não para ser exibida. O relatório da banca critica justamente o repertório decorado, encaixado em qualquer tema. Assim, um dado de uma reportagem local ou uma experiência pessoal podem valer mais do que uma citação erudita descolada do problema em discussão."
  },
  {
    "disciplina": "Redação",
    "trimestre": 1,
    "habilidades": [
      "EM13LP101",
      "EM13LP403"
    ],
    "enunciado": "No trecho «Um candidato chegou a dizer que a ausência de transporte público nas periferias é consequência da desorganização do país», a formulação é apontada pelo texto como exemplo de:",
    "alternativas": [
      "proposta de intervenção completa, porque indica um agente e uma ação a ser realizada.",
      "tese clara e defensável, porque identifica um problema e sua causa principal.",
      "argumento bem hierarquizado, porque aponta uma causa geral para um fenômeno específico.",
      "repertório sociocultural produtivo, porque remete a um diagnóstico de alcance nacional.",
      "generalização que enfraquece a coerência, porque uma causa ampla demais não explica o problema analisado."
    ],
    "correta": 4,
    "comentario": "A generalidade excessiva é um dos defeitos mais graves em uma dissertação. Quando o candidato atribui o problema a uma causa vasta e abstrata — como «a desorganização do país» —, ele não demonstra como essa causa opera no caso concreto, nem permite que o leitor avalie a relação entre causa e efeito. Um argumento forte é específico: mostra o mecanismo, apresenta dados ou exemplos e liga cada etapa à tese. A formulação citada, além de vaga, tende a produzir uma proposta de intervenção igualmente vaga, o que compromete também a competência relativa à solução do problema."
  },
  {
    "disciplina": "Redação",
    "trimestre": 2,
    "habilidades": [
      "EM13LP104",
      "EM13LP403"
    ],
    "enunciado": "De acordo com o roteiro apresentado no texto, a alternativa que contém a proposta de intervenção mais completa é:",
    "alternativas": [
      "O Ministério da Educação deve incluir disciplina de educação financeira no ensino médio, por meio de alteração na Base Nacional Comum Curricular, com formação de professores e material didático, para reduzir o endividamento entre jovens.",
      "Cabe à sociedade civil e ao poder público agirem juntos, buscando soluções eficazes e duradouras.",
      "As escolas precisam repensar sua atitude, promovendo debates e atividades ao longo do ano letivo.",
      "O governo deve criar leis mais severas e campanhas educativas em todos os meios de comunicação.",
      "É preciso que a população se conscientize sobre a importância do problema o mais rápido possível."
    ],
    "correta": 0,
    "comentario": "A alternativa correta cumpre os quatro passos do roteiro. O agente está delimitado (Ministério da Educação); a ação é verificável (incluir disciplina de educação financeira); o modo é detalhado (alteração na Base Nacional Comum Curricular, formação de professores, material didático); e o efeito está explícito (reduzir o endividamento entre jovens), ligado à causa apontada no desenvolvimento. As outras alternativas falham justamente nesses pontos: «conscientizar a população» e «repensar sua atitude» são ações vagas; «leis mais severas e campanhas» não especificam como nem para quê; e «agirem juntos» não identifica nenhum agente concreto."
  },
  {
    "disciplina": "Redação",
    "trimestre": 2,
    "habilidades": [
      "EM13LP104",
      "EM13LP403"
    ],
    "enunciado": "Segundo o texto, uma proposta de intervenção que prometa «erradicar o problema em seis meses, com campanhas permanentes em todas as escolas do país» seria problemática principalmente porque:",
    "alternativas": [
      "confunde a proposta de intervenção com a tese, repetindo o que já foi defendido no primeiro parágrafo.",
      "é inviável e pouco realista, pois promete o que nenhum agente pode cumprir, o que enfraquece o texto.",
      "desrespeita os direitos humanos ao propor ação de alcance nacional sem consulta prévia.",
      "deveria estar na introdução, e não na conclusão do texto dissertativo-argumentativo.",
      "omite o agente responsável, já que não indica quem executaria as campanhas."
    ],
    "correta": 1,
    "comentario": "O texto alerta expressamente para a presunção: «prometer o que nenhum agente pode cumprir enfraquece o texto». Uma solução viável é aquela que dimensiona o problema e respeita limites reais de prazo, orçamento e alcance. Note que a proposta citada até tem agente implícito e ação, mas falha no modo e no efeito porque é desproporcional. Por outro lado, uma proposta não precisa ser modesta a ponto de ser inócua; o equilíbrio está em detalhar os meios e indicar um efeito plausível, atacando a causa apontada no desenvolvimento."
  },
  {
    "disciplina": "Redação",
    "trimestre": 3,
    "habilidades": [
      "EM13LP101",
      "EM13LP104"
    ],
    "enunciado": "Pela sequência descrita no texto, a professora priorizou, na primeira etapa do trabalho, o desenvolvimento de qual aspecto do texto?",
    "alternativas": [
      "A eliminação de repetições e de frases longas, por meio da leitura em voz alta.",
      "A correção ortográfica e a acentuação, para evitar vícios desde o início.",
      "A identificação e o refinamento da tese, transformando uma opinião genérica em uma afirmação defensável.",
      "A ampliação do número de linhas, garantindo que o tema fosse bem explorado.",
      "A inserção de repertório sociocultural diversificado ao longo dos parágrafos."
    ],
    "correta": 2,
    "comentario": "A professora foi explícita ao dizer que não corrigiu a ortografia nessa etapa. O pedido foi outro: localizar a frase que resumia a opinião do aluno para, em seguida, transformá-la em uma afirmação sobre a qual fosse possível discordar. Esse trabalho é o de construção da tese, que precisa ser defensável e específica, e não uma constatação evidente com a qual ninguém discutiria. A revisão de superfície — acentuação, repetições, frases longas — apareceu apenas na Semana 3, e a ampliação do número de linhas não foi uma meta: a versão final teve menos linhas do que o rascunho."
  },
  {
    "disciplina": "Redação",
    "trimestre": 3,
    "habilidades": [
      "EM13LP101",
      "EM13LP104"
    ],
    "enunciado": "Comparando o rascunho da Semana 1 com a versão final da Semana 3, o texto defende que a qualidade da redação aumentou principalmente porque:",
    "alternativas": [
      "o aluno passou a escrever mais, pois a extensão é o principal indicador de profundidade na redação.",
      "a professora corrigiu a ortografia já na primeira etapa, evitando a fixação de vícios de escrita.",
      "o aluno eliminou a tese original, que era genérica, e passou a apenas descrever o tema.",
      "houve corte de conteúdo supérfluo e substituição de frases genéricas por exemplos concretos, o que aumentou a densidade argumentativa.",
      "a proposta de intervenção foi transferida para a introdução, facilitando a compreensão do leitor."
    ],
    "correta": 3,
    "comentario": "O registro mostra que a versão final tinha 26 linhas, ou seja, menos do que o rascunho de 32 — e, ainda assim, dizia mais. Os ganhos vieram de cortes (quatro linhas de rodeios na introdução) e de substituições (exemplos concretos no lugar de frases como «muitas pessoas sofrem com isso»). Isso ilustra a diferença entre reescrita e revisão: a primeira age sobre as ideias e a estrutura; a segunda, sobre a superfície. Um texto mais longo não é necessariamente melhor, e um texto «limpo» do ponto de vista ortográfico pode permanecer vazio de argumentação."
  },
  {
    "disciplina": "Literatura",
    "trimestre": 1,
    "habilidades": [
      "EM13LIT1001",
      "EM13LIT1002"
    ],
    "enunciado": "Com base no texto, é correto afirmar que o Indianismo romântico:",
    "alternativas": [
      "tinha como objetivo documentar com precisão etnográfica a vida dos povos indígenas do século XIX.",
      "surgiu antes da Independência do Brasil, como forma de sustentar a permanência de Portugal na colônia.",
      "era rejeitado pelos leitores do século XIX por utilizar a língua portuguesa em vez das línguas indígenas.",
      "representava os indígenas como inimigos que deveriam ser derrotados pelos heróis colonizadores.",
      "construiu uma imagem idealizada do indígena, cumprindo ao mesmo tempo um papel de fundação mítica do povo brasileiro e um apagamento dos povos reais."
    ],
    "correta": 4,
    "comentario": "O texto descreve o Indianismo como uma dupla operação. De um lado, ele forneceu ao Brasil recém-independente símbolos próprios — Peri, Iracema, Moacir, o primeiro filho da terra. De outro, a idealização do indígena literário serviu para encobrir a violência concreta sofrida pelos povos indígenas no período, que aparecem na história como dizimados, expulsos de suas terras e integrados à força a aldeamentos. A alternativa correta articula as duas faces. As demais negam elementos centrais do texto: o Indianismo não era documento etnográfico, não nasceu antes da Independência, não foi rejeitado pelo público do século XIX e não tratava o indígena como inimigo — pelo contrário, ele era o herói."
  },
  {
    "disciplina": "Literatura",
    "trimestre": 1,
    "habilidades": [
      "EM13LIT1001",
      "EM13LIT1002"
    ],
    "enunciado": "A frase que abre «Iracema» — «Além, muito além daquela serra, que ainda azula no horizonte, nasceu Iracema» — é citada no texto com a finalidade de:",
    "alternativas": [
      "exemplificar uma abertura em que a paisagem do Ceará se liga ao nascimento da heroína que simboliza a terra e a origem do povo.",
      "mostrar que a obra é um registro histórico confiável da chegada dos portugueses ao litoral cearense.",
      "comprovar que o romance indianista foi escrito antes da Independência do Brasil.",
      "caracterizar o estilo parnasiano, marcado pela objetividade e pela descrição científica da natureza.",
      "demonstrar que Alencar dominava as línguas indígenas e as reproduzia com fidelidade no romance."
    ],
    "correta": 0,
    "comentario": "A citação funciona como exemplo do procedimento alegórico descrito pelo texto: o nascimento da personagem é fundido ao nascimento da terra, o que sustenta a leitura de «Iracema» como mito de origem nacional. É justamente esse caráter simbólico que a crítica posterior contrapõe ao indígena histórico, real e massacrado. A alternativa que fala em fidelidade às línguas indígenas contraria o texto, que afirma serem os personagens construídos a partir de crônicas de viajantes e da imaginação do autor; a que fala em registro histórico confiável é incompatível com a denúncia de invenção; e a referência ao parnasianismo é anacrônica, pois o parnasianismo é posterior ao primeiro romantismo e se caracteriza pelo rigor formal e pela impessoalidade."
  },
  {
    "disciplina": "Literatura",
    "trimestre": 2,
    "habilidades": [
      "EM13LIT2001",
      "EM13LIT3001"
    ],
    "enunciado": "Segundo o texto, a dúvida em relação à fidelidade de Capitu permanece sem resolução porque:",
    "alternativas": [
      "o autor optou por um narrador onisciente que desconhece os pensamentos dos personagens.",
      "toda informação sobre Capitu é filtrada pela memória ciumenta de Bentinho, e o texto não confirma nem desmente suas suspeitas.",
      "Capitu nega sistematicamente as acusações, mas o narrador se recusa a registrar as respostas dela.",
      "Bentinho morre antes de concluir as memórias, interrompendo a narrativa no momento decisivo.",
      "a obra ficou incompleta, e Machado de Assis não chegou a escrever os capítulos finais."
    ],
    "correta": 1,
    "comentario": "A chave de leitura oferecida pelo texto é a do ponto de vista. Bentinho narra em primeira pessoa, muito depois dos fatos, e é justamente a subjetividade dele — o ciúme, a desconfiança, a obsessão por sinais — que impede o leitor de separar fato e interpretação. As cenas que ele apresenta são ambíguas, e o romance não traz nenhuma instância que as valide ou as refute. As alternativas que falam em obra incompleta, morte do narrador ou recusa em registrar respostas inventam elementos inexistentes no texto, e a do narrador onisciente contradiz diretamente a análise, já que a ausência de onisciência é o próprio motor do problema."
  },
  {
    "disciplina": "Literatura",
    "trimestre": 2,
    "habilidades": [
      "EM13LIT2001",
      "EM13LIT3001"
    ],
    "enunciado": "No terceiro parágrafo, o texto aproxima «Dom Casmurro», «Vidas secas» e «A Hora da Estrela» com o objetivo de mostrar que, nas três obras:",
    "alternativas": [
      "as protagonistas femininas são silenciadas para reforçar a dominação patriarcal.",
      "predomina o estilo realista de descrição objetiva do ambiente social e econômico.",
      "o próprio ato de narrar, com seus limites, suas omissões e suas falhas, torna-se matéria do enredo.",
      "o ciúme é o motor psicológico que conduz a ação de todos os personagens principais.",
      "a narração em primeira pessoa é empregada apenas com a finalidade de produzir efeito de humor."
    ],
    "correta": 2,
    "comentario": "O texto fecha o terceiro parágrafo com uma generalização explícita: os três autores apostam em transformar a narração em conteúdo da obra. Em Machado, isso ocorre pela memória interessada e ciumenta de Bentinho; em Graciliano, pela fala seca e truncada de Fabiano, que revela pela forma o que a pobreza impede de dizer; em Clarice, pelo narrador que expõe a própria incapacidade de descrever. Essa é uma questão recorrente da literatura moderna, e por isso as três obras são aproximadas. As outras alternativas descrevem traços parciais ou inexistentes: o estilo realista objetivo não se aplica a «A Hora da Estrela»; o silenciamento feminino não é a chave comum; e a primeira pessoa em Machado não tem função humorística."
  },
  {
    "disciplina": "Literatura",
    "trimestre": 3,
    "habilidades": [
      "EM13LIT1003",
      "EM13LIT2002"
    ],
    "enunciado": "De acordo com o texto, a proposta antropofágica de Oswald de Andrade, em 1928, consistia em:",
    "alternativas": [
      "imitar as vanguardas europeias, demonstrando fidelidade ao projeto moderno.",
      "restaurar as formas parnasianas de versificação, atualizadas para o século XX.",
      "abandonar a literatura escrita e valorizar apenas a oralidade de origem tupi.",
      "devorar criticamente a herança estrangeira para transformá-la em criação brasileira.",
      "recusar toda influência europeia e produzir uma arte exclusivamente indígena."
    ],
    "correta": 3,
    "comentario": "A metáfora antropofágica não é de recusa, e sim de digestão: os modernistas propunham «engolir» as técnicas e as influências estrangeiras para devolvê-las transformadas em algo brasileiro. O texto descreve exatamente isso ao falar em «devorar a herança estrangeira para transformá-la em criação brasileira», e a fórmula «Tupi or not Tupi, eis a questão» resume o gesto, que é ao mesmo tempo de incorporação e de inversão irônica do cânone europeu. As alternativas que sugerem recusa total, imitação servil, abandono da escrita ou retorno ao parnasianismo contradizem o texto — inclusive a última, pois o parnasianismo era justamente o alvo dos manifestos de 1922."
  },
  {
    "disciplina": "Literatura",
    "trimestre": 3,
    "habilidades": [
      "EM13LIT1003",
      "EM13LIT2002"
    ],
    "enunciado": "No texto, o conceito de escrevivência, atribuído a Conceição Evaristo, é apresentado como:",
    "alternativas": [
      "um gênero literário exclusivo da poesia contemporânea de autoria negra.",
      "uma proposta de retorno ao romance histórico do século XIX, centrado na memória da escravidão.",
      "uma técnica de composição poética baseada na rima e na métrica clássica.",
      "a transcrição literal de depoimentos orais colhidos nas periferias brasileiras.",
      "uma escrita que toma a experiência de vida de mulheres negras e periféricas como fundamento da criação."
    ],
    "correta": 4,
    "comentario": "O texto define escrevivência como «uma literatura que escreve a partir da experiência de vida das mulheres negras e periféricas», e mostra seu efeito em «Ponciá Vicêncio» e em «Becos da Memória»: a história da escravidão e o cotidiano das periferias passam a ser o lugar de enunciação, e não apenas o cenário. Isso altera quem narra e de onde se narra. A alternativa que trata o conceito como técnica métrica confunde-o com as escolas do século XIX; a que fala em transcrição literal ignora que se trata de criação literária; a que o restringe à poesia contraria os exemplos citados, que são romances; e a que o liga ao romance histórico do século XIX é anacrônica, pois Conceição Evaristo é autora contemporânea."
  },
  {
    "disciplina": "Inglês",
    "trimestre": 1,
    "habilidades": [
      "EM13LI101",
      "EM13LI102"
    ],
    "enunciado": "No trecho “Actually, most of our members say they read more now than they did five years ago”, a palavra Actually indica uma ideia de:",
    "alternativas": [
      "contraste com uma expectativa (na verdade, de fato)",
      "atualidade (equivalente a atualmente)",
      "frequência (de vez em quando)",
      "tempo futuro (mais tarde)",
      "certeza absoluta (sem dúvida)"
    ],
    "correta": 0,
    "comentario": "O anúncio abre com a pergunta “Do people still read?” e, em seguida, responde “Actually, most of our members say they read more now...”, corrigindo a dúvida inicial. Nesse contexto, actually equivale a “na verdade/de fato”, e não a “atualmente”: a evidência do contraste é a própria pergunta que introduz a resposta."
  },
  {
    "disciplina": "Inglês",
    "trimestre": 1,
    "habilidades": [
      "EM13LI101",
      "EM13LI102"
    ],
    "enunciado": "Em “Eventually, everyone finds the book that changes the way they see the world”, a palavra eventually expressa a ideia de:",
    "alternativas": [
      "por acaso",
      "mais cedo ou mais tarde, depois de algum tempo",
      "quase nunca",
      "com muita frequência",
      "de imediato, sem nenhuma demora"
    ],
    "correta": 1,
    "comentario": "Eventually indica que algo acontece ao final de um período de espera: “mais cedo ou mais tarde”. Cuidado com o falso cognato — em português, “eventualmente” significa “de vez em quando”, mas em inglês eventually equivale a “finalmente/mais cedo ou mais tarde”. A frase do anúncio descreve uma descoberta que ocorre em algum momento da vida do leitor."
  },
  {
    "disciplina": "Inglês",
    "trimestre": 2,
    "habilidades": [
      "EM13LI101",
      "EM13LI103"
    ],
    "enunciado": "No trecho “However, a recent survey shows that 78% of residents support the measure”, o conector however estabelece uma relação de:",
    "alternativas": [
      "conclusão do raciocínio do autor",
      "ordem temporal dos fatos narrados",
      "contraste com a informação anterior",
      "adição de mais uma informação sobre o mesmo assunto",
      "causa da reclamação dos lojistas"
    ],
    "correta": 2,
    "comentario": "A frase anterior apresenta a reclamação dos lojistas (“some shop owners complain about the loss of parking spaces”), e however introduz a pesquisa favorável (78% dos moradores apoiam a medida). O conector however equivale a “no entanto” e sempre marca oposição entre as ideias — a evidência está na passagem da queixa para o dado que a contraria."
  },
  {
    "disciplina": "Inglês",
    "trimestre": 2,
    "habilidades": [
      "EM13LI101",
      "EM13LI103"
    ],
    "enunciado": "Em “Therefore, the city council decided to expand the program to three more neighborhoods”, a palavra therefore indica que a decisão do conselho é:",
    "alternativas": [
      "uma condição para a construção das ciclovias",
      "uma hipótese sem relação com os dados do texto",
      "um fato anterior à realização da pesquisa",
      "uma consequência dos dados apresentados no texto",
      "uma oposição direta ao resultado da pesquisa"
    ],
    "correta": 3,
    "comentario": "Therefore equivale a “portanto” e introduz uma conclusão apoiada no que vem antes: a pesquisa registra 78% de apoio dos moradores e as empresas relatam mais clientes que chegam de bicicleta. Esses dados sustentam logicamente a decisão de expandir o programa — a evidência são os argumentos que precedem o conector."
  },
  {
    "disciplina": "Inglês",
    "trimestre": 3,
    "habilidades": [
      "EM13LI101",
      "EM13LI202"
    ],
    "enunciado": "Em “If everyone supported local farmers, our towns would be stronger”, a estrutura verbal utilizada expressa:",
    "alternativas": [
      "uma ação já concluída no passado",
      "uma possibilidade muito provável para o futuro",
      "um fato verdadeiro e frequente no presente",
      "uma ordem ou pedido direto ao leitor",
      "uma situação hipotética e improvável no presente"
    ],
    "correta": 4,
    "comentario": "A combinação de If + passado simples (supported) com would + infinitivo (would be) forma a segunda condicional, usada para falar de situações imaginárias. A evidência está no próprio texto: a frase admite que hoje nem todos apoiam os agricultores locais (“If everyone supported...”), por isso trata de uma hipótese, e não de um fato real."
  },
  {
    "disciplina": "Inglês",
    "trimestre": 3,
    "habilidades": [
      "EM13LI101",
      "EM13LI202"
    ],
    "enunciado": "Em “if we do not address this issue now, we will lose the farms that feed us”, o verbo address significa, no contexto:",
    "alternativas": [
      "tratar de ou enfrentar um problema",
      "escrever o endereço de uma carta",
      "pronunciar um discurso para uma plateia",
      "aumentar o preço de um produto",
      "mudar-se para um novo endereço"
    ],
    "correta": 0,
    "comentario": "Address é um falso amigo do português: como substantivo, significa “endereço”, mas na expressão “address this issue” funciona como verbo e quer dizer “tratar de, enfrentar”. A evidência é a consequência anunciada na própria frase — “we will lose the farms that feed us” —, que só faz sentido se o problema for enfrentado agora."
  },
  {
    "disciplina": "Espanhol",
    "trimestre": 1,
    "habilidades": [
      "EM13LE101",
      "EM13LE102"
    ],
    "enunciado": "No trecho “mi mejor amiga estaba embarazada, y su alegría me sirvió de inspiración”, a palavra embarazada significa:",
    "alternativas": [
      "emocionada, comovida",
      "grávida, esperando um bebê",
      "surpresa, admirada",
      "apressada, com muita pressa",
      "envergonhada, com vergonha"
    ],
    "correta": 1,
    "comentario": "Embarazada é um falso cognato clássico: em espanhol significa “grávida” (a forma espanhola equivalente a “envergonhada” seria avergonzada). A evidência está na continuação da frase — “su alegría me sirvió de inspiración” —: a alegria da amiga se relaciona com a espera de um bebê, e não com vergonha."
  },
  {
    "disciplina": "Espanhol",
    "trimestre": 1,
    "habilidades": [
      "EM13LE101",
      "EM13LE102"
    ],
    "enunciado": "Em “La obra tiene un largo recorrido por la historia de tres generaciones de su familia”, a expressão largo recorrido significa:",
    "alternativas": [
      "um erro de tradução",
      "um espaço amplo e vazio",
      "uma longa trajetória",
      "um percurso curto e rápido",
      "uma trilha perigosa"
    ],
    "correta": 2,
    "comentario": "Largo, em espanhol, quer dizer “comprido, longo”; em português, “largo” significa “amplo” (oposto de estreito), e o termo equivalente ao espanhol é “longo”. A evidência está no complemento da frase: a obra percorre “la historia de tres generaciones de su familia”, ou seja, uma trajetória longa no tempo."
  },
  {
    "disciplina": "Espanhol",
    "trimestre": 2,
    "habilidades": [
      "EM13LE101",
      "EM13LE103"
    ],
    "enunciado": "No cartaz, a expressão “Sin embargo, reciclar no es suficiente” introduz uma ideia de:",
    "alternativas": [
      "sequência temporal das ações recomendadas",
      "comparação de igualdade entre as atitudes",
      "causa do problema ambiental",
      "contraste em relação à ideia anterior de que cada pessoa pode começar hoje",
      "condição para que se possa reciclar"
    ],
    "correta": 3,
    "comentario": "Sin embargo equivale a “no entanto” e marca contraste. A frase anterior incentiva a ação individual (“tú puedes empezar hoy”), e a seguinte a relativiza (“reciclar no es suficiente”). A evidência da oposição está na passagem do incentivo (“puedes empezar hoy”) para a ressalva (“no es suficiente”)."
  },
  {
    "disciplina": "Espanhol",
    "trimestre": 2,
    "habilidades": [
      "EM13LE101",
      "EM13LE103"
    ],
    "enunciado": "Em “Por lo tanto, reduce, reutiliza y recicla”, a expressão por lo tanto serve para:",
    "alternativas": [
      "indicar que a ação só acontecerá num futuro distante",
      "introduzir uma dúvida sobre as atitudes recomendadas",
      "negar a informação apresentada antes",
      "apresentar um exemplo de produto reciclável",
      "marcar uma conclusão que decorre das ideias anteriores"
    ],
    "correta": 4,
    "comentario": "Por lo tanto significa “portanto” e anuncia a conclusão do raciocínio do cartaz. Depois de afirmar que reciclar não basta e que o dinheiro do consumidor também “vota”, o cartaz conclui com as três ações possíveis — “reduce, reutiliza y recicla”. A evidência são as ideias anteriores, que sustentam essa conclusão prática."
  },
  {
    "disciplina": "Espanhol",
    "trimestre": 3,
    "habilidades": [
      "EM13LE101",
      "EM13LE104"
    ],
    "enunciado": "Em “Recomendamos que prueben el pescado fresco”, a forma prueben (presente do subjuntivo) é usada porque:",
    "alternativas": [
      "depende de uma expressão de recomendação (recomendamos que), que exige subjuntivo",
      "expressa um fato certo e indiscutível",
      "indica uma ação que já foi concluída ontem",
      "descreve uma ação habitual do chef no passado",
      "trata-se de uma ordem direta dirigida a uma única pessoa"
    ],
    "correta": 0,
    "comentario": "Em espanhol, depois de verbos como recomendar — que expressam conselho, vontade ou influência sobre a ação de outra pessoa —, usa-se o presente do subjuntivo prueben (referindo-se a “ustedes”, os clientes). A evidência está na própria estrutura: “Recomendamos que prueben...”: o chef ainda não sabe se os clientes vão provar o peixe; ele apenas recomenda a ação."
  },
  {
    "disciplina": "Espanhol",
    "trimestre": 3,
    "habilidades": [
      "EM13LE101",
      "EM13LE104"
    ],
    "enunciado": "No cardápio, a palavra postre corresponde a:",
    "alternativas": [
      "a entrada",
      "a sobremesa",
      "o prato principal",
      "a conta",
      "a bebida"
    ],
    "correta": 1,
    "comentario": "Postre, em espanhol, é a sobremesa — a parte final da refeição. A evidência está na organização do próprio cardápio: “Entrantes / Plato principal / Postre / Bebidas” reproduz a ordem típica de uma refeição, e o item listado como postre é o “flan de huevo”, um doce."
  },
  {
    "disciplina": "História Geral",
    "trimestre": 1,
    "habilidades": [
      "EM13HIS101",
      "EM13HIS102"
    ],
    "enunciado": "O texto apresenta a cheia anual do Nilo como elemento central da civilização egípcia. Com base na leitura, a principal consequência desse fenômeno natural foi",
    "alternativas": [
      "O isolamento comercial do Egito, que impediu qualquer contato com povos do Mediterrâneo.",
      "A dependência exclusiva da caça e da coleta, já que a agricultura era impossível na região.",
      "A fertilização do solo pelo lodo, viabilizando uma agricultura produtiva e o crescimento populacional.",
      "A destruição periódica das colheitas, que obrigava os camponeses a migrar para a Núbia.",
      "A ampliação dos desertos, que protegiam o Egito de invasões estrangeiras."
    ],
    "correta": 2,
    "comentario": "O texto explica que a cheia do Nilo deixava nas margens uma camada de lodo fértil, na qual os camponeses semeavam trigo, cevada e linho, permitindo uma agricultura produtiva mesmo em região quase sem chuvas. Foi essa produtividade que sustentou uma população densa e, indiretamente, o Estado centralizado. A alternativa correta é a que articula fertilização do solo, agricultura produtiva e crescimento populacional. As demais opções contrariam o texto: a cheia não destruía as colheitas (C), a agricultura era a base da economia (D) e o Egito manteve contatos com o Mediterrâneo (E)."
  },
  {
    "disciplina": "História Geral",
    "trimestre": 1,
    "habilidades": [
      "EM13HIS101",
      "EM13HIS102"
    ],
    "enunciado": "Segundo o texto, o faraó era tido como «um deus vivo» e mediador entre os homens e os deuses. Essa caracterização indica que o poder político no Egito Antigo fundamentava-se",
    "alternativas": [
      "No domínio militar de povos vizinhos, sem qualquer base religiosa.",
      "Na separação rígida entre o poder do faraó e o dos sacerdotes dos templos.",
      "Na divisão igualitária de terras entre as famílias da nobreza.",
      "Na legitimidade religiosa do soberano, o que sustentava a obediência e a centralização do Estado.",
      "Em eleições realizadas pela assembleia de camponeses e escribas."
    ],
    "correta": 3,
    "comentario": "Ao definir o faraó como deus vivo e mediador entre homens e deuses, o texto mostra que a autoridade política egípcia apoiava-se na religião: a obediência ao soberano era também uma obrigação de ordem sagrada. Isso explica a centralização do poder e a estabilidade das dinastias. A alternativa correta é a que menciona a legitimidade religiosa do soberano. As demais opções não encontram apoio no texto: não havia eleições (A), nem divisão igualitária de terras (B); a coerção militar existia, mas não era a base do poder (C); e os sacerdotes estavam integrados à mesma hierarquia, e não separados do faraó (E)."
  },
  {
    "disciplina": "História Geral",
    "trimestre": 1,
    "habilidades": [
      "EM13HIS101",
      "EM13HIS501"
    ],
    "enunciado": "O trecho de Tucídides afirma que o governo de Atenas é «administrado no interesse da maioria, e não de uma minoria». Uma leitura historicamente correta desse documento exige considerar que",
    "alternativas": [
      "A maioria mencionada no documento era formada pelos escravos e metecos, que dominavam a Assembleia.",
      "A maioria correspondia ao conjunto de mulheres atenienses, excluídas apenas das atividades militares.",
      "A maioria era composta pelos estrangeiros residentes, que participavam diretamente das decisões da Eclésia.",
      "A democracia ateniense incluía todos os habitantes da pólis, sem qualquer restrição.",
      "A maioria referida no texto dizia respeito apenas aos cidadãos com direitos políticos, grupo minoritário na população total."
    ],
    "correta": 4,
    "comentario": "A expressão maioria, no documento, não deve ser lida com o sentido atual de maioria da população. Como o próprio texto explica, a cidadania era restrita a homens atenienses adultos, filhos de pai e mãe atenienses; mulheres, metecos e escravos estavam excluídos da participação política. Portanto, a maioria de que fala Péricles é a maioria dos cidadãos, grupo numericamente minoritário na cidade. A alternativa correta é a que explicita essa diferença. As demais opções contrariam o texto: não havia inclusão universal (A), escravos e metecos não deliberavam (B, D) e as mulheres estavam fora das decisões políticas (E)."
  },
  {
    "disciplina": "História Geral",
    "trimestre": 1,
    "habilidades": [
      "EM13HIS101",
      "EM13HIS501"
    ],
    "enunciado": "A partir da leitura do texto, a principal diferença entre a democracia ateniense e a democracia representativa contemporânea está no fato de que, em Atenas,",
    "alternativas": [
      "As decisões eram tomadas diretamente pelos cidadãos, reunidos em assembleia, e não por representantes eleitos.",
      "Os cidadãos escolhiam um rei por meio do voto direto, a cada dez anos de governo.",
      "As leis eram aprovadas por um parlamento eleito, com mandatos regulares de quatro anos.",
      "As decisões políticas eram tomadas por um conselho de sacerdotes ligados ao oráculo de Delfos.",
      "O voto era secreto e universal, estendido a mulheres e estrangeiros residentes."
    ],
    "correta": 0,
    "comentario": "A democracia ateniense é classificada como direta porque os cidadãos compareciam à Eclésia e votavam pessoalmente os assuntos da cidade, sem intermediários. Nas democracias representativas contemporâneas, o povo elege representantes que decidem em seu nome, e o voto costuma ser secreto e universal. A alternativa correta é a que descreve a participação direta na assembleia. As demais opções atribuem a Atenas instituições que não existiam: voto secreto e universal (B), parlamento com mandatos (C), realeza eletiva (D) e governo sacerdotal (E)."
  },
  {
    "disciplina": "História Geral",
    "trimestre": 2,
    "habilidades": [
      "EM13HIS301",
      "EM13HIS401"
    ],
    "enunciado": "Segundo o texto, a condição do servo medieval caracterizava-se",
    "alternativas": [
      "Pela isenção de impostos e tributos, garantida pelas decisões do Grande Cisma de 1054.",
      "Pelo vínculo com a terra e pelo dever de prestar trabalho gratuito e pagar taxas ao senhor.",
      "Pela escravidão absoluta, com o direito de ser comprado e vendido como qualquer mercadoria.",
      "Pela propriedade coletiva dos campos, repartidos igualmente entre todos os moradores do feudo.",
      "Pela plena liberdade de deixar a terra e negociar seu trabalho em qualquer feudo vizinho."
    ],
    "correta": 1,
    "comentario": "O texto descreve o servo como ligado à terra e devedor de obrigações: corveia, talha e banalidades. Essa é a característica central da servidão medieval, distinta tanto da liberdade camponesa quanto da escravidão, em que a pessoa é tratada como coisa. A alternativa correta é a que reúne o vínculo com a terra e as obrigações devidas. As demais opções contrariam o texto: o servo não podia deixar livremente a terra (A), não havia repartição igualitária (B), ele não era escravizado nos termos do direito antigo (D) e o Cisma de 1054 não concedeu isenções (E)."
  },
  {
    "disciplina": "História Geral",
    "trimestre": 2,
    "habilidades": [
      "EM13HIS301",
      "EM13HIS401"
    ],
    "enunciado": "O texto atribui à Igreja medieval um papel central na organização da sociedade. Entre as funções destacadas pelo texto está",
    "alternativas": [
      "A promoção do Grande Cisma como forma de unificar as igrejas do Ocidente e do Oriente.",
      "A criação das corporações de ofício urbanas, controladas diretamente pelos papas.",
      "A conservação e a cópia de textos nos mosteiros, além da unificação cultural da Europa pelo latim.",
      "A proibição do uso do latim, para que cada povo rezasse em sua própria língua.",
      "A destruição dos mosteiros, considerados centros de oposição ao poder dos reis."
    ],
    "correta": 2,
    "comentario": "O texto afirma que a Igreja unificava a Europa pelo latim e preservava textos nos mosteiros, citando a Regra de São Bento. Essa dupla função — cultural e religiosa — explica sua centralidade no período. A alternativa correta é a que menciona a cópia de textos e o latim como elemento de unificação. As demais opções contrariam o texto: os mosteiros preservavam, e não destruíam, o saber (A); o latim foi mantido, e não proibido (B); as corporações surgiram nas cidades ligadas ao comércio, não foram criadas pelos papas (C); e o Cisma separou, em vez de unificar, as igrejas (D)."
  },
  {
    "disciplina": "História Geral",
    "trimestre": 2,
    "habilidades": [
      "EM13HIS102",
      "EM13HIS202"
    ],
    "enunciado": "De acordo com o texto, o absolutismo monárquico dos séculos XVI a XVIII fundamentava-se",
    "alternativas": [
      "No livre mercado, com a ausência de qualquer intervenção estatal na economia.",
      "Na divisão do território em feudos autossuficientes controlados pelos servos.",
      "Na soberania popular expressa em assembleias eleitas periodicamente.",
      "Na teoria do direito divino, segundo a qual a autoridade do rei provinha de Deus.",
      "Na separação rígida entre o poder do rei e o poder da Igreja católica."
    ],
    "correta": 3,
    "comentario": "O texto afirma que os reis absolutos apoiavam-se na teoria do direito divino, formulada por pensadores como Bossuet, e que o mercantilismo implicava forte intervenção do Estado na economia. A alternativa correta é a que identifica a origem religiosa da autoridade real. As demais opções descrevem princípios posteriores ou incompatíveis com o absolutismo: a soberania popular e as assembleias eletivas são traços do liberalismo (A); não havia separação entre Igreja e monarquia (C); a economia era intervencionista, e não de livre mercado (D); e os feudos pertencem ao mundo medieval, não ao absolutismo (E)."
  },
  {
    "disciplina": "História Geral",
    "trimestre": 2,
    "habilidades": [
      "EM13HIS102",
      "EM13HIS202"
    ],
    "enunciado": "O texto relaciona a Revolução Industrial a transformações sociais profundas. Entre as consequências destacadas está",
    "alternativas": [
      "A redução geral das jornadas de trabalho para oito horas já no século XVIII.",
      "A igualdade salarial entre operários e proprietários das fábricas, reconhecida em 1848.",
      "A extinção imediata do trabalho feminino e infantil nas fábricas têxteis inglesas.",
      "O retorno da produção artesanal, com o fortalecimento das corporações de ofício.",
      "A emergência da oposição entre burguesia e proletariado e a longa luta por direitos trabalhistas."
    ],
    "correta": 4,
    "comentario": "O texto descreve a mecanização fabril e suas consequências sociais — jornadas longas, trabalho infantil, bairros sem saneamento — e apresenta a reação operária em etapas: motins contra as máquinas, sindicatos e leis fabris, culminando na interpretação de Marx e Engels sobre burguesia e proletariado. A alternativa correta é a que reúne o conflito de classes e a conquista progressiva de direitos. As demais opções falseiam o processo: o trabalho infantil não acabou de imediato (A), a jornada de oito horas é conquista muito posterior (B), a produção artesanal recuou em vez de avançar (C) e nunca houve igualdade salarial automática (E)."
  },
  {
    "disciplina": "História do Brasil",
    "trimestre": 1,
    "habilidades": [
      "EM13HIS203",
      "EM13HIS401"
    ],
    "enunciado": "Segundo o texto, a criação das capitanias hereditárias em 1534 atendeu principalmente ao objetivo de",
    "alternativas": [
      "Ocupar e defender o território contra estrangeiros com o menor custo possível para a Coroa.",
      "Conceder autonomia política aos povos indígenas do litoral brasileiro.",
      "Estimular a produção de gêneros de abastecimento para o mercado interno.",
      "Transferir para a Igreja a responsabilidade pela colonização da América portuguesa.",
      "Distribuir terras igualmente entre os colonos pobres que chegavam de Portugal."
    ],
    "correta": 0,
    "comentario": "O texto explica que as capitanias foram criadas num contexto de ameaça francesa no litoral e que o rei doou os lotes a donatários justamente para ocupar o território sem arcar com os custos, transferindo-os à iniciativa privada. A alternativa correta é a que reúne ocupação, defesa e redução de custos para a Coroa. As demais opções contrariam o texto: não houve distribuição igualitária de terras (A), não se concedeu autonomia política aos indígenas (C), a produção colonial era voltada à exportação (D) e a Igreja não foi encarregada da colonização (E)."
  },
  {
    "disciplina": "História do Brasil",
    "trimestre": 1,
    "habilidades": [
      "EM13HIS203",
      "EM13HIS401"
    ],
    "enunciado": "O texto define a plantation pela articulação entre latifúndio, monocultura de exportação e trabalho escravo. A partir dessa definição, é correto afirmar que a economia açucareira colonial",
    "alternativas": [
      "Organizava-se em comunidades coletivas de produção, administradas pelos próprios escravizados.",
      "Concentrava a propriedade da terra e destinava a produção ao mercado externo, sustentando-se no trabalho escravo.",
      "Baseava-se no trabalho livre assalariado, com contratos assinados nas cidades portuárias.",
      "Priorizava a policultura de exportação em pequenas lavouras familiares do interior.",
      "Distribuía pequenas propriedades rurais e produzia alimentos para o consumo local."
    ],
    "correta": 1,
    "comentario": "A plantation é definida no texto pela conjugação de três elementos: grande propriedade (latifúndio), cultivo de um único produto para exportação (monocultura) e uso de mão de obra escravizada. A alternativa correta reúne exatamente esses três traços. As demais opções contrariam a definição: pequenas propriedades e consumo local (B) descrevem outro tipo de economia; o trabalho assalariado livre (C) não era a base do sistema; a administração coletiva (D) não corresponde ao poder do senhor de engenho; e a policultura (E) é o oposto da monocultura."
  },
  {
    "disciplina": "História do Brasil",
    "trimestre": 1,
    "habilidades": [
      "EM13HIS101",
      "EM13HIS601"
    ],
    "enunciado": "A leitura do anúncio de fuga apresentado no texto permite concluir que, no Brasil escravista, a pessoa escravizada",
    "alternativas": [
      "Podia recorrer à Justiça para exigir salário e melhores condições de trabalho.",
      "Tinha direito a aposentadoria e indenização após longos anos de serviço no engenho.",
      "Era tratada como propriedade do senhor, razão pela qual sua fuga gerava anúncio com recompensa pela captura.",
      "Era proibida por lei de mudar de cidade, mas podia escolher livremente seu patrão.",
      "Era reconhecida como sujeito de direitos, com liberdade para negociar seu próprio trabalho."
    ],
    "correta": 2,
    "comentario": "O anúncio oferece gratificação pela captura e descreve a pessoa por marcas físicas e vestimentas, como se descreve um bem perdido. Isso mostra que a legislação escravista tratava os escravizados como propriedade, e não como sujeitos de direitos. A alternativa correta é a que identifica essa condição de coisa. As demais opções atribuem ao sistema escravista direitos que ele não reconhecia: negociar o próprio trabalho (A), recorrer à Justiça (B), aposentadoria (D) e escolha de patrão (E)."
  },
  {
    "disciplina": "História do Brasil",
    "trimestre": 1,
    "habilidades": [
      "EM13HIS101",
      "EM13HIS601"
    ],
    "enunciado": "O texto descreve diferentes formas de resistência à escravidão, como fugas, quilombos, revoltas e atuação abolicionista. Essas informações reforçam a ideia de que",
    "alternativas": [
      "A Lei Áurea garantiu, desde 1888, a distribuição de terras e a educação para os libertos.",
      "Os quilombos eram comunidades organizadas exclusivamente por senhores de engenho favoráveis à abolição.",
      "O movimento abolicionista foi conduzido apenas por agentes estrangeiros, sem participação de negros brasileiros.",
      "As pessoas escravizadas não foram passivas diante do cativeiro e construíram estratégias permanentes de resistência e de disputa pela liberdade.",
      "A resistência ocorria apenas por meio de revoltas armadas de grande escala, sem manifestações cotidianas."
    ],
    "correta": 3,
    "comentario": "O texto descreve um leque amplo de comportamentos: recusas cotidianas, fugas, quilombos como Palmares, revoltas como a dos Malês e a atuação de negros livres e libertos no abolicionismo. Essa diversidade mostra que a resistência foi contínua e assumiu múltiplas formas. A alternativa correta é a que sintetiza essa ideia de agência. As demais opções reduzem ou falseiam a resistência: apenas revoltas armadas (B), garantias que a Lei Áurea não previu (C), autoria dos senhores de engenho (D) e participação exclusivamente estrangeira (E)."
  },
  {
    "disciplina": "História do Brasil",
    "trimestre": 2,
    "habilidades": [
      "EM13HIS201",
      "EM13HIS402"
    ],
    "enunciado": "O texto descreve o fim da escravidão no Brasil como um processo gradual, marcado por três leis. A sequência cronológica correta dessas leis, da primeira à última, é",
    "alternativas": [
      "Lei Áurea (1888), Lei do Ventre Livre (1871) e Lei dos Sexagenários (1885).",
      "Lei dos Sexagenários (1871), Lei do Ventre Livre (1885) e Lei Áurea (1888).",
      "Lei dos Sexagenários (1865), Lei do Ventre Livre (1871) e Lei Áurea (1882).",
      "Lei do Ventre Livre (1888), Lei dos Sexagenários (1871) e Lei Áurea (1885).",
      "Lei do Ventre Livre (1871), Lei dos Sexagenários (1885) e Lei Áurea (1888)."
    ],
    "correta": 4,
    "comentario": "A ordem histórica é: Lei do Ventre Livre, de 1871, que declarou livres os filhos de mulheres escravizadas nascidos a partir daquela data; Lei dos Sexagenários, de 1885, que libertou os escravizados com mais de sessenta e cinco anos; e Lei Áurea, de 1888, que extinguiu a escravidão. A alternativa correta é a única que apresenta as três leis na sequência cronológica exata, com as datas corretas. As demais opções invertem a ordem (C, D) ou apresentam datas incorretas (A, E), sendo incompatíveis com a periodização do texto."
  },
  {
    "disciplina": "História do Brasil",
    "trimestre": 2,
    "habilidades": [
      "EM13HIS201",
      "EM13HIS402"
    ],
    "enunciado": "Segundo o texto, entre as consequências da Guerra do Paraguai (1864-1870) para o Brasil estavam",
    "alternativas": [
      "O elevado número de mortos, o aumento das dívidas e o fortalecimento político do Exército.",
      "O fortalecimento da economia açucareira do Nordeste e a paz duradoura com a Inglaterra.",
      "A anulação da dívida externa brasileira e a abolição imediata da escravidão pelos militares.",
      "A separação das províncias do Sul e a proclamação da República em 1867.",
      "A ocupação permanente do território paraguaio por tropas brasileiras até o ano de 1900."
    ],
    "correta": 0,
    "comentario": "O texto afirma que o conflito devastou o Paraguai e deixou o Brasil com milhares de mortos, dívidas expressivas e um Exército mais forte e politizado — elemento que, somado ao desgaste da monarquia, contribuiu para a Proclamação da República. A alternativa correta reúne esses três efeitos. As demais opções inventam consequências que o texto não menciona e que não correspondem aos fatos: fortalecimento do açúcar nordestino (A), anulação da dívida e abolição imediata (B), separação do Sul (C) e ocupação permanente do Paraguai (E)."
  },
  {
    "disciplina": "História do Brasil",
    "trimestre": 3,
    "habilidades": [
      "EM13HIS102",
      "EM13HIS601"
    ],
    "enunciado": "Segundo o texto, o voto aberto instituído pela Constituição de 1891 favorecia",
    "alternativas": [
      "A criação do sufrágio universal, antecipando a democracia brasileira em quase um século.",
      "O controle dos coronéis sobre os eleitores, já que a escolha era pública e podia ser punida.",
      "A proibição legal de qualquer forma de clientelismo nas relações políticas.",
      "A ampliação da participação de mulheres e analfabetos nas eleições municipais.",
      "A autonomia do eleitor, que podia votar sem sofrer qualquer tipo de pressão social."
    ],
    "correta": 1,
    "comentario": "O texto explica que o voto aberto, somado às exclusões da Constituição de 1891, permitia que os coronéis soubessem em quem cada eleitor votava, o que viabilizava a retaliação e o controle conhecido como voto de cabresto. A alternativa correta é a que liga a publicidade do voto ao poder dos coronéis. As demais opções contrariam o texto e os fatos: a publicidade do voto reduzia, e não ampliava, a autonomia do eleitor (A); mulheres e analfabetos estavam excluídos (C); o clientelismo era prática corrente (D); e o sufrágio universal só se consolidou muito depois (E)."
  },
  {
    "disciplina": "História do Brasil",
    "trimestre": 3,
    "habilidades": [
      "EM13HIS102",
      "EM13HIS601"
    ],
    "enunciado": "O texto relaciona a Constituição de 1988 a transformações posteriores, como a Lei n.º 10.639/2003 e o Estatuto da Igualdade Racial. Essas medidas expressam",
    "alternativas": [
      "O abandono das políticas de igualdade racial em favor do mérito individual.",
      "A proibição do ensino da história da África nas escolas brasileiras.",
      "O reconhecimento legal de dívidas históricas com a população negra e a presença de suas demandas na agenda do Estado.",
      "A extinção dos movimentos sociais após o processo de redemocratização.",
      "A revogação das garantias previstas na Constituição de 1988 pelos governos seguintes."
    ],
    "correta": 2,
    "comentario": "A Constituição de 1988 tornou inafiançável o crime de racismo e deu base legal às políticas de ação afirmativa posteriores, como o ensino de história afro-brasileira e africana e o sistema de cotas. Essas medidas resultaram, segundo o texto, da atuação dos movimentos sociais. A alternativa correta é a que identifica o reconhecimento de dívidas históricas e a incorporação das demandas negras à agenda estatal. As demais opções contrariam o texto: nenhuma delas descreve uma política de igualdade (A), os movimentos se fortaleceram em vez de se extinguir (B), as garantias não foram revogadas (D) e o ensino da história da África foi tornado obrigatório, não proibido (E)."
  },
  {
    "disciplina": "Geografia",
    "trimestre": 1,
    "habilidades": [
      "EM13GEO101",
      "EM13GEO102"
    ],
    "enunciado": "De acordo com o texto, o bônus demográfico, ou janela de oportunidade, consiste em:",
    "alternativas": [
      "crescimento acelerado da população idosa, o que reduz os gastos com aposentadorias e amplia a arrecadação previdenciária.",
      "elevação da taxa de natalidade, necessária para recompor a população em idade ativa ao longo do século XXI.",
      "concentração da população nas regiões metropolitanas do Sudeste, onde a renda per capita é mais alta.",
      "fase em que a população em idade ativa é proporcionalmente maior que a dependente, o que pode favorecer o crescimento econômico se houver investimento em educação e emprego.",
      "equilíbrio permanente entre natalidade e mortalidade assegurado pelas políticas de planejamento familiar do Estado."
    ],
    "correta": 3,
    "comentario": "O bônus demográfico é a fase da transição em que a razão de dependência cai, pois há proporcionalmente mais pessoas em idade de trabalhar do que jovens e idosos. Ele não é automático: só gera desenvolvimento se acompanhado de investimento em educação, saúde e emprego formal."
  },
  {
    "disciplina": "Geografia",
    "trimestre": 1,
    "habilidades": [
      "EM13GEO101",
      "EM13GEO102"
    ],
    "enunciado": "A queda da taxa de fecundidade total no Brasil entre as décadas de 1960 e 2020 está associada, segundo o texto, principalmente a:",
    "alternativas": [
      "redução do número de casamentos formalizados no país.",
      "recuo da participação feminina no mercado de trabalho a partir dos anos 1990.",
      "adoção de políticas estatais compulsórias de limitação de nascimentos.",
      "alta da mortalidade infantil e intensificação da emigração internacional.",
      "ampliação da escolarização das mulheres, urbanização e maior acesso a métodos contraceptivos."
    ],
    "correta": 4,
    "comentario": "O texto atribui a queda da fecundidade à escolarização feminina, à inserção das mulheres no mercado de trabalho, ao acesso a contraceptivos, à urbanização e à queda da mortalidade infantil. Não houve no Brasil política compulsória de limitação de nascimentos."
  },
  {
    "disciplina": "Geografia",
    "trimestre": 2,
    "habilidades": [
      "EM13GEO201",
      "EM13GEO202",
      "EM13GEO203"
    ],
    "enunciado": "Com base no mapa e no texto, a segregação socioespacial na metrópole brasileira manifesta-se principalmente por:",
    "alternativas": [
      "ocupação das áreas centrais e melhor infraestruturadas pelos grupos de maior renda e o afastamento das camadas populares para periferias com serviços escassos e longos deslocamentos.",
      "substituição das antigas periferias por áreas industriais ao longo do século XX.",
      "distribuição homogênea das classes sociais pelo espaço urbano, resultado da ausência de políticas públicas.",
      "organização da cidade em anéis concêntricos determinados pela altitude e pela proximidade do litoral.",
      "separação por raça, uma vez que a legislação definia bairros residenciais distintos."
    ],
    "correta": 0,
    "comentario": "A segregação socioespacial é a separação das classes sociais no espaço urbano. No Brasil, ela se expressa pela concentração da renda e dos serviços em áreas centrais e pela expansão de periferias e municípios dormitório com infraestrutura precária, o que alonga os deslocamentos pendulares."
  },
  {
    "disciplina": "Geografia",
    "trimestre": 2,
    "habilidades": [
      "EM13GEO201",
      "EM13GEO202",
      "EM13GEO203"
    ],
    "enunciado": "A leitura do mapa da rede urbana permite afirmar que a concentração populacional em poucas regiões metropolitanas relaciona-se a:",
    "alternativas": [
      "maior taxa de natalidade registrada nas capitais do Sudeste.",
      "processo histórico de industrialização e de modernização agrícola, que atraiu população do campo e concentrou oportunidades nas metrópoles.",
      "abundância de recursos hídricos no Sudeste, que garante o adensamento populacional.",
      "limitação da ocupação no interior do país imposta pelas unidades de conservação.",
      "decisão constitucional de 1988, que criou integralmente as regiões metropolitanas brasileiras."
    ],
    "correta": 1,
    "comentario": "A macrocefalia urbana brasileira decorre da urbanização acelerada ligada ao ciclo do café, à industrialização e à modernização agrícola, que gerou êxodo rural e concentração nas capitais. O grau de urbanização próximo a 87% confirma esse padrão histórico."
  },
  {
    "disciplina": "Geografia",
    "trimestre": 3,
    "habilidades": [
      "EM13GEO301",
      "EM13GEO302",
      "EM13GEO104"
    ],
    "enunciado": "Segundo o texto e a legislação brasileira citada, o Brasil reconhece como refugiada a pessoa que:",
    "alternativas": [
      "tenha sido formalmente registrada pelo ACNUR em um campo de refugiados fora do território brasileiro.",
      "possua visto de turista válido e comprove residência superior a noventa dias no Brasil.",
      "tenha fugido do país em razão de violência generalizada, agressão estrangeira, conflitos internos ou violação maciça de direitos humanos, conforme a definição ampliada incorporada pela legislação brasileira.",
      "seja nacional de país signatário da Convenção de 1951 e comprove possuir renda para se sustentar.",
      "tenha deixado seu país exclusivamente por perseguição política comprovada em audiência judicial individual."
    ],
    "correta": 2,
    "comentario": "A Lei 9.474/1996 ampliou a definição da Convenção de 1951 ao incorporar a Declaração de Cartagena de 1984, que inclui situações de violência generalizada, conflitos internos e violação maciça de direitos humanos. O refúgio, portanto, não depende apenas de perseguição política individual comprovada."
  },
  {
    "disciplina": "Geografia",
    "trimestre": 3,
    "habilidades": [
      "EM13GEO301",
      "EM13GEO302",
      "EM13GEO104"
    ],
    "enunciado": "No texto, o fenômeno denominado fuga de cérebros é explicado como:",
    "alternativas": [
      "retorno de migrantes ao país de origem após o término dos conflitos armados.",
      "redução das remessas internacionais enviadas pelos imigrantes aos países de origem.",
      "aumento do número de refugiados reconhecidos pelo Estado brasileiro.",
      "saída de profissionais qualificados de seus países de origem, gerando perda do investimento público em sua formação e de força de trabalho especializada.",
      "restrição à entrada de imigrantes qualificados nos países de destino."
    ],
    "correta": 3,
    "comentario": "A fuga de cérebros ocorre quando profissionais qualificados — médicos, engenheiros, pesquisadores — deixam seu país. Como a formação deles costuma ser financiada com recursos públicos, o país de origem perde investimento e capacitação técnica, ainda que receba remessas dos emigrantes."
  },
  {
    "disciplina": "Geografia",
    "trimestre": 2,
    "habilidades": [
      "EM13GEO401",
      "EM13GEO501",
      "EM13GEO103"
    ],
    "enunciado": "A partir da análise do infográfico e do texto, a principal diferença entre matriz elétrica e matriz energética brasileiras é:",
    "alternativas": [
      "a matriz elétrica mede exclusivamente a capacidade instalada, sem considerar a geração efetiva.",
      "a matriz energética considera apenas as termelétricas movidas a gás natural.",
      "ambas são idênticas, mudando apenas a unidade de medida utilizada.",
      "a matriz elétrica exclui a geração de origem hidrelétrica por se tratar de fonte não renovável.",
      "a matriz energética inclui fontes empregadas no transporte e na indústria, como derivados de petróleo, o que reduz a participação relativa das renováveis."
    ],
    "correta": 4,
    "comentario": "A matriz elétrica abrange somente a geração de eletricidade, dominada por hidrelétricas, eólica e solar. A matriz energética inclui todo o consumo de energia do país, com forte peso de derivados de petróleo no transporte, o que reduz a fatia das fontes renováveis."
  },
  {
    "disciplina": "Geografia",
    "trimestre": 2,
    "habilidades": [
      "EM13GEO401",
      "EM13GEO501",
      "EM13GEO103"
    ],
    "enunciado": "O texto relaciona a busca pelo desenvolvimento sustentável à Agenda 2030. De acordo com essa agenda e com a definição clássica citada, uma proposta coerente seria:",
    "alternativas": [
      "compatibilizar expansão das fontes renováveis, ordenamento territorial e proteção dos biomas, atendendo necessidades atuais sem inviabilizar as das gerações futuras.",
      "substituir hidrelétricas por termelétricas a carvão mineral, de menor custo de instalação.",
      "ampliar grandes barragens em áreas protegidas para garantir segurança energética imediata.",
      "flexibilizar a proteção de biomas para expandir a fronteira agrícola e reduzir preços dos alimentos.",
      "priorizar exclusivamente o crescimento econômico, postergando as metas ambientais para as próximas décadas."
    ],
    "correta": 0,
    "comentario": "O desenvolvimento sustentável, formulado no Relatório Brundtland, exige equilíbrio entre crescimento, equidade e limites ambientais. Assim, a proposta coerente articula energia renovável, ordenamento do território e conservação dos biomas, atendendo o presente sem esgotar as possibilidades das gerações futuras."
  },
  {
    "disciplina": "Sociologia",
    "trimestre": 1,
    "habilidades": [
      "EM13SOC101",
      "EM13SOC201"
    ],
    "enunciado": "Segundo o texto, a mais-valia relativa resulta de:",
    "alternativas": [
      "redução do número de operários mantida a mesma jornada de trabalho.",
      "aumento da produtividade obtido pela introdução de máquinas e novas formas de organização do trabalho, reduzindo o valor da força de trabalho.",
      "pagamento de horas extras acima do valor diário da força de trabalho.",
      "extensão pura e simples da jornada de trabalho sem alteração no salário pago.",
      "cobrança de juros sobre o capital adiantado pelo empresário."
    ],
    "correta": 1,
    "comentario": "A mais-valia relativa decorre do aumento da produtividade, via tecnologia e organização do trabalho, que reduz o valor dos bens necessários à reprodução da força de trabalho. A mais-valia absoluta, por sua vez, provém da ampliação da jornada ou da intensificação do trabalho."
  },
  {
    "disciplina": "Sociologia",
    "trimestre": 1,
    "habilidades": [
      "EM13SOC101",
      "EM13SOC201"
    ],
    "enunciado": "O conceito marxiano de fetiche da mercadoria, descrito no texto, designa:",
    "alternativas": [
      "valor de uso da mercadoria, expresso na utilidade concreta do bem.",
      "manipulação publicitária que cria necessidades artificiais de consumo.",
      "aparência de que as mercadorias possuem valor por si mesmas, ocultando as relações sociais de trabalho que as produziram.",
      "preferência dos consumidores por produtos importados em detrimento dos nacionais.",
      "lei da oferta e da procura na formação dos preços de mercado."
    ],
    "correta": 2,
    "comentario": "Para Marx, o fetiche da mercadoria faz com que relações entre pessoas apareçam como relações entre coisas. O valor parece uma propriedade natural do objeto, escondendo o trabalho social que o produziu e, com ele, a exploração inerente à produção capitalista."
  },
  {
    "disciplina": "Sociologia",
    "trimestre": 2,
    "habilidades": [
      "EM13SOC201",
      "EM13SOC301"
    ],
    "enunciado": "Uma chefia de ministério em que a obediência se funda em normas impessoais, na hierarquia de cargos e na competência técnica do servidor exemplifica, na tipologia weberiana, a dominação:",
    "alternativas": [
      "mítica, ancorada na crença em forças sobrenaturais.",
      "patrimonial, baseada na lealdade ao senhor.",
      "carismática, fundada na devoção pessoal ao chefe.",
      "legal-racional, fundada em normas impessoais e na qualificação técnica.",
      "plebiscitária, decorrente da aclamação popular periódica."
    ],
    "correta": 3,
    "comentario": "A dominação legal-racional caracteriza o Estado moderno e burocrático: obedece-se não à pessoa, mas à norma e ao cargo. A burocracia se organiza por regras impessoais, hierarquia funcional e competência técnica, sendo esse o tipo que sustenta as administrações públicas contemporâneas."
  },
  {
    "disciplina": "Sociologia",
    "trimestre": 2,
    "habilidades": [
      "EM13SOC201",
      "EM13SOC301"
    ],
    "enunciado": "Para Weber, o que garante a especificidade do Estado moderno é:",
    "alternativas": [
      "a integração dos indivíduos por valores religiosos compartilhados.",
      "a divisão social do trabalho entre classes produtivas.",
      "a capacidade de produzir leis aprovadas por unanimidade.",
      "o controle direto dos meios de produção pela burocracia estatal.",
      "o monopólio do uso legítimo da força física dentro de um território delimitado."
    ],
    "correta": 4,
    "comentario": "Weber define o Estado pelo monopólio do uso legítimo da violência física em um território. Não é a violência em si que o define, mas o seu caráter legítimo, aceito pelos dominados, o que o distingue de outras associações e do poder privado."
  },
  {
    "disciplina": "Sociologia",
    "trimestre": 2,
    "habilidades": [
      "EM13SOC401",
      "EM13SOC101"
    ],
    "enunciado": "Para Adorno e Horkheimer, o conceito de pseudoindividualidade refere-se ao fato de:",
    "alternativas": [
      "a produção em série oferecer diferenças apenas aparentes, dentro de uma estrutura padronizada, gerando a ilusão de escolha e originalidade.",
      "o público deixar de consumir bens culturais produzidos em massa.",
      "cada produto ser de fato único, ainda que a propaganda o apresente como padronizado.",
      "a indústria cultural suprimir por completo a variedade de gêneros e formatos disponíveis.",
      "os consumidores rejeitarem coletivamente qualquer forma de padronização estética."
    ],
    "correta": 0,
    "comentario": "A pseudoindividualidade é a ilusão de originalidade criada pela indústria cultural: as diferenças são superficiais, pois a estrutura do produto permanece padronizada. O efeito é fazer com que o consumo pareça uma escolha autônoma quando, na verdade, ele obedece a fórmulas industriais pré-definidas."
  },
  {
    "disciplina": "Sociologia",
    "trimestre": 2,
    "habilidades": [
      "EM13SOC401",
      "EM13SOC101"
    ],
    "enunciado": "O texto contrapõe a crítica de Adorno e Horkheimer à análise de Walter Benjamin. Segundo Benjamin, em A Obra de Arte na Era de Sua Reprodutibilidade Técnica (1936), a reprodução técnica:",
    "alternativas": [
      "conserva integralmente a aura da obra, uma vez que as cópias nunca se igualam ao original.",
      "dissolve a aura da obra, o que pode retirar seu caráter único e, ao mesmo tempo, abrir possibilidades políticas de democratização do acesso à cultura.",
      "demonstra que a indústria cultural é incapaz de produzir qualquer forma artística.",
      "restringe a arte ao universo das elites, restaurando seu valor ritual.",
      "elimina por completo a dimensão política da experiência estética."
    ],
    "correta": 1,
    "comentario": "Benjamin não nega que a reprodução destrói a aura, o caráter único e sagrado da obra. Para ele, porém, essa perda tem um lado emancipador: a arte deixa de ser privilégio de poucos e pode ser apropriada por um público amplo, inclusive com finalidades políticas, como no cinema e na fotografia."
  },
  {
    "disciplina": "Sociologia",
    "trimestre": 3,
    "habilidades": [
      "EM13SOC201",
      "EM13SOC401"
    ],
    "enunciado": "De acordo com o texto, a violência simbólica em Bourdieu consiste em:",
    "alternativas": [
      "uso da força física pelo Estado para conter revoltas populares.",
      "censura estatal a conteúdos considerados ofensivos.",
      "imposição de um arbitrário cultural apresentado como legítimo, aceita pelos próprios dominados com sua cumplicidade.",
      "imposição direta de normas pelo aparato repressivo.",
      "monopólio da violência legítima exercido por uma burocracia racional."
    ],
    "correta": 2,
    "comentario": "A violência simbólica é o poder que se exerce sem coerção física, pela adesão dos dominados a critérios que os desfavorecem. Ela é eficaz justamente porque não é percebida como violência: o arbitrário cultural de um grupo é naturalizado e interiorizado como legítimo."
  },
  {
    "disciplina": "Sociologia",
    "trimestre": 3,
    "habilidades": [
      "EM13SOC201",
      "EM13SOC401"
    ],
    "enunciado": "A partir da noção de capital cultural, o texto permite interpretar o desempenho diferenciado em processos seletivos como resultado, entre outros fatores, de:",
    "alternativas": [
      "sorte no momento da aplicação das provas, fator dominante segundo Bourdieu.",
      "apenas o esforço individual de estudo de cada candidato.",
      "infraestrutura material da escola, sem relação com o meio familiar.",
      "acesso desigual, ao longo da vida, a bens culturais como livros, idiomas, viagens e titulação, incorporados em disposições e saberes valorizados pela escola.",
      "diferenças de capacidade intelectual determinadas geneticamente."
    ],
    "correta": 3,
    "comentario": "O capital cultural acumulado no meio familiar e na trajetória escolar se converte em desempenho acadêmico. Assim, diferenças aparentemente individuais de desempenho em processos seletivos expressam, em boa medida, o acesso desigual a bens e práticas culturais valorizados pela instituição escolar."
  },
  {
    "disciplina": "Filosofia",
    "trimestre": 1,
    "habilidades": [
      "EM13FIL101",
      "EM13FIL102"
    ],
    "enunciado": "Segundo o texto, a passagem do mythos ao logos na Grécia antiga caracteriza-se por:",
    "alternativas": [
      "invenção da escrita alfabética pelos filósofos pré-socráticos.",
      "abandono completo da religiosidade e da produção poética em nome da razão científica.",
      "proibição estatal dos relatos míticos nas cidades de Jônia.",
      "adoção generalizada do método experimental de observação controlada.",
      "busca de explicações racionais e argumentáveis para a natureza, sem que isso implicasse necessariamente o fim da religiosidade."
    ],
    "correta": 4,
    "comentario": "A passagem do mythos ao logos não suprimiu a religião, mas inaugurou um novo modo de explicação, baseado no argumento e no exame racional da physis. O conhecimento tradicional e poético continuou existindo; o que mudou foi a exigência de justificação racional para as explicações sobre o cosmos."
  },
  {
    "disciplina": "Filosofia",
    "trimestre": 1,
    "habilidades": [
      "EM13FIL101",
      "EM13FIL102"
    ],
    "enunciado": "Heráclito, ao propor o fogo como arché e afirmar que «não se entra duas vezes no mesmo rio», enfatiza:",
    "alternativas": [
      "o devir, isto é, a realidade como transformação permanente governada por um logos.",
      "o ceticismo radical quanto à possibilidade de qualquer conhecimento.",
      "a existência de partículas indivisíveis em movimento no vazio.",
      "a estrutura numérica subjacente à harmonia do cosmos.",
      "a imutabilidade do ser e a ilusão dos sentidos."
    ],
    "correta": 0,
    "comentario": "Heráclito defende que a realidade é devir, mudança contínua, e que essa mudança não é caótica, mas regida pelo logos, uma razão comum. A imagem do rio expressa justamente a instabilidade: as águas mudam a cada instante, embora a ordem permaneça."
  },
  {
    "disciplina": "Filosofia",
    "trimestre": 1,
    "habilidades": [
      "EM13FIL101",
      "EM13FIL201"
    ],
    "enunciado": "No documento, Sócrates descreve seu método como maiêutica. Essa designação indica que ele:",
    "alternativas": [
      "cobrava honorários para ensinar a arte da persuasão na assembleia.",
      "não transmitia doutrinas prontas, mas interrogava o interlocutor para que este examinasse e desse à luz suas próprias ideias.",
      "defendia que o conhecimento humano se reduz à opinião compartilhada pela maioria.",
      "recorria a mitos tradicionais para transmitir conhecimentos já estabelecidos.",
      "impunha sua verdade ao interlocutor pela força do argumento retórico."
    ],
    "correta": 1,
    "comentario": "A maiêutica é a arte de fazer as ideias virem à luz pelo questionamento. Comparando-se à sua mãe, a parteira Fenarete, Sócrates se define como aquele que ajuda o outro a parir suas próprias concepções, submetendo-as a exame, e não como alguém que ensina conteúdos prontos."
  },
  {
    "disciplina": "Filosofia",
    "trimestre": 1,
    "habilidades": [
      "EM13FIL101",
      "EM13FIL201"
    ],
    "enunciado": "A atitude socrática de reconhecer a própria ignorância implica, segundo o texto, que:",
    "alternativas": [
      "todo conhecimento é impossível, restando apenas a dúvida cética.",
      "a opinião da maioria constitui o critério último da verdade.",
      "a consciência dos limites do próprio saber é o ponto de partida da investigação filosófica.",
      "a verdade se encontra exclusivamente na tradição e nos relatos míticos.",
      "o sábio é aquele que já alcançou uma ciência plena e definitiva."
    ],
    "correta": 2,
    "comentario": "O reconhecimento da ignorância em Sócrates não é a negação do conhecimento, mas seu pressuposto. Só quem admite não saber procura examinar suas crenças. Esse gesto funda a atitude filosófica e sustenta o intelectualismo moral: conhecer o bem é condição para praticá-lo."
  },
  {
    "disciplina": "Filosofia",
    "trimestre": 2,
    "habilidades": [
      "EM13FIL301",
      "EM13FIL401"
    ],
    "enunciado": "Avaliar uma máxima perguntando o que aconteceria se todos agissem da mesma forma é um procedimento típico do raciocínio kantiano porque:",
    "alternativas": [
      "compara os custos e os benefícios financeiros da decisão a ser tomada.",
      "mede a quantidade de prazer e dor provocada pela ação em cada pessoa afetada.",
      "considera que o valor moral depende exclusivamente do caráter virtuoso do agente.",
      "testa se a máxima da ação pode ser universalizada sem entrar em contradição.",
      "verifica se o costume social da comunidade admite exceções à regra."
    ],
    "correta": 3,
    "comentario": "A primeira formulação do imperativo categórico kantiano exige que a máxima da ação possa ser pensada como lei universal sem contradição. Mentir, por exemplo, fracassa nesse teste: se todos mentissem, a própria mentira se tornaria ineficaz, pois a confiança desapareceria."
  },
  {
    "disciplina": "Filosofia",
    "trimestre": 2,
    "habilidades": [
      "EM13FIL301",
      "EM13FIL401"
    ],
    "enunciado": "De acordo com o utilitarismo de John Stuart Mill, exposto no texto, uma ação é moralmente correta quando:",
    "alternativas": [
      "respeita integralmente os costumes vigentes na comunidade política.",
      "é ditada por uma boa vontade incondicional, alheia a qualquer inclinação.",
      "é aprovada por unanimidade entre todos os indivíduos afetados.",
      "cumpre o dever independentemente das consequências que produz.",
      "tende a promover a felicidade geral, entendida como prazer e ausência de dor."
    ],
    "correta": 4,
    "comentario": "O princípio da maior felicidade, formulado por Bentham e refinado por Mill, define a correção moral pela tendência da ação a produzir prazer e evitar dor para o maior número de pessoas. Mill, no entanto, qualifica os prazeres, atribuindo valor superior aos prazeres do intelecto e da vida moral."
  },
  {
    "disciplina": "Filosofia",
    "trimestre": 3,
    "habilidades": [
      "EM13FIL201",
      "EM13FIL401",
      "EM13FIL501"
    ],
    "enunciado": "Segundo o texto, para Rousseau, em Do Contrato Social (1762), a liberdade civil realiza-se quando:",
    "alternativas": [
      "o cidadão obedece a leis que ajudou a instituir por meio da vontade geral, tornando-se, nesse sentido, livre.",
      "o indivíduo preserva intacta sua vontade particular e apenas respeita as leis que lhe convêm.",
      "o soberano absoluto garante a segurança e a propriedade de cada um.",
      "a maioria delibera sem limitações, ainda que contrarie o interesse comum.",
      "o povo delega permanentemente seu poder a um corpo de especialistas."
    ],
    "correta": 0,
    "comentario": "Para Rousseau, a liberdade civil não é a ausência de leis, mas a obediência à lei que cada um prescreveu a si mesmo ao participar da vontade geral. O pacto legítimo converte a liberdade natural em liberdade civil, ancorada na soberania popular e na igualdade de direitos."
  },
  {
    "disciplina": "Filosofia",
    "trimestre": 3,
    "habilidades": [
      "EM13FIL201",
      "EM13FIL401",
      "EM13FIL501"
    ],
    "enunciado": "A tese sartriana de que a existência precede a essência, apresentada no texto, significa que:",
    "alternativas": [
      "a essência de cada indivíduo se define apenas após a morte, pelo julgamento alheio.",
      "o ser humano não recebe uma essência predeterminada e se define por suas escolhas e ações, assumindo inteira responsabilidade por elas.",
      "o comportamento humano é inteiramente determinado pelas estruturas econômicas de classe.",
      "a liberdade é uma ilusão, cabendo ao sujeito aceitar o destino que lhe foi dado.",
      "o ser humano possui uma natureza fixa, definida de antemão pela biologia e pela divindade."
    ],
    "correta": 1,
    "comentario": "Negando qualquer natureza humana dada, Sartre afirma que o homem é o que faz de si. Como não há essência anterior à existência, cada escolha define o sujeito e o projeta como modelo de humanidade, o que implica responsabilidade total, sem desculpas deterministas — é a má-fé."
  },
  {
    "disciplina": "Biologia",
    "trimestre": 1,
    "habilidades": [
      "EM13CNT101",
      "EM13CNT202"
    ],
    "enunciado": "Células de glândulas salivares humanas produzem e lançam grande quantidade de enzimas digestivas no tubo digestório. O aumento da produção dessas enzimas está associado, principalmente, à alta atividade de quais organelas?",
    "alternativas": [
      "Centríolos e nucléolos, que produzem os fosfolipídios da membrana secretora.",
      "Mitocôndrias exclusivamente, únicas estruturas capazes de sintetizar proteínas.",
      "Ribossomos, retículo endoplasmático rugoso e complexo de Golgi, que sintetizam, processam e secretam as proteínas.",
      "Cloroplastos e vacúolos, que armazenam as enzimas já prontas.",
      "Lisossomos e peroxissomos, responsáveis pela digestão intracelular e pela degradação de radicais livres."
    ],
    "correta": 2,
    "comentario": "A via secretora começa na síntese de proteínas nos ribossomos aderidos ao retículo endoplasmático rugoso; a proteína é processada, passa pelo complexo de Golgi, que a modifica e a empacota em vesículas, e é liberada por exocitose. Lisossomos fazem digestão intracelular e mitocôndrias fornecem ATP, mas nenhuma das duas sintetiza as proteínas secretoras."
  },
  {
    "disciplina": "Biologia",
    "trimestre": 1,
    "habilidades": [
      "EM13CNT101",
      "EM13CNT202"
    ],
    "enunciado": "Mitocôndrias e cloroplastos apresentam duas membranas, DNA próprio e ribossomos semelhantes aos de bactérias. Na biologia moderna, essas características são interpretadas como:",
    "alternativas": [
      "Demonstração de que a célula eucariótica é quimicamente idêntica à célula procariótica.",
      "Indício de que ambas realizam a fermentação láctica como principal fonte de energia.",
      "Prova de que ambas as organelas surgem por brotamento da membrana plasmática em cada divisão celular.",
      "Evidência de que ambas descendem de bactérias englobadas por células ancestrais, conforme a teoria endossimbiótica.",
      "Sinal de que tais organelas não possuem material genético, apenas RNAs de síntese proteica própria."
    ],
    "correta": 3,
    "comentario": "A teoria endossimbiótica explica que mitocôndrias e cloroplastos descendem de procariotos que passaram a viver dentro de células ancestrais. A membrana dupla, o DNA circular e os ribossomos do tipo bacteriano são as principais evidências. Funcionalmente, a mitocôndria realiza a respiração celular e o cloroplasto, a fotossíntese — processos complementares de transformação de energia."
  },
  {
    "disciplina": "Biologia",
    "trimestre": 1,
    "habilidades": [
      "EM13CNT201",
      "EM13CNT203"
    ],
    "enunciado": "Um homem daltônico (XᵈY) casa-se com uma mulher de visão normal cujo pai era daltônico. Qual a probabilidade de o casal ter um filho do sexo masculino daltônico?",
    "alternativas": [
      "100%, pois o pai transmite seu cromossomo X afetado a todos os filhos homens.",
      "75%, pois três dos quatro genótipos femininos possíveis carregam o alelo mutante.",
      "50%, pois a mulher é obrigatoriamente homozigota recessiva.",
      "0%, pois o daltonismo é herança autossômica recessiva e ambos os pais precisariam ser portadores.",
      "25%, pois metade dos filhos será do sexo masculino e, dentre esses, metade herda o X recessivo materno."
    ],
    "correta": 4,
    "comentario": "Como o pai era daltônico, a mulher herdou dele um Xᵈ: seu genótipo é Xᴰ Xᵈ (portadora de visão normal). O cruzamento XᵈY × Xᴰ Xᵈ gera quatro genótipos com 1/4 de chance cada: Xᴰ Xᵈ, Xᵈ Xᵈ, Xᴰ Y e Xᵈ Y. O menino daltônico (Xᵈ Y) só surge se herdar o Xᵈ da mãe (1/2) e o Y do pai (1/2): 1/2 × 1/2 = 25%. Observe que o alelo se distribui segundo os princípios de segregação da primeira lei de Mendel."
  },
  {
    "disciplina": "Biologia",
    "trimestre": 1,
    "habilidades": [
      "EM13CNT201",
      "EM13CNT203"
    ],
    "enunciado": "A rápida disseminação da resistência de bactérias a antibióticos em hospitais é explicada, do ponto de vista evolutivo, porque:",
    "alternativas": [
      "Mutações aleatórias que conferem resistência dão vantagem seletiva na presença do antibiótico; os indivíduos resistentes sobrevivem e se reproduzem, aumentando a frequência do alelo de resistência na população.",
      "As bactérias resistentes são menos aptas e morrem quando expostas ao antibiótico, o que seleciona a sensibilidade.",
      "As bactérias tornam-se resistentes como resposta fisiológica individual ao antibiótico, pela lei do uso e desuso.",
      "O antibiótico provoca mutações direcionadas exclusivamente nos genes que conferem resistência, tornando toda a colônia resistente.",
      "A resistência é adquirida por esforço metabólico e transmitida diretamente à prole, sem envolver mudanças no DNA."
    ],
    "correta": 0,
    "comentario": "Darwin explicaria o caso pela seleção natural: existe variabilidade na população; mutações aleatórias (e a troca de plasmídeos) geram indivíduos resistentes; sob a pressão do antibiótico, os sensíveis são eliminados e os resistentes deixam mais descendentes. A explicação lamarckista de que o esforço individual gera e transmite a adaptação está descartada, pois modificações somáticas não alteram o material genético herdado."
  },
  {
    "disciplina": "Biologia",
    "trimestre": 2,
    "habilidades": [
      "EM13CNT202",
      "EM13CNT301"
    ],
    "enunciado": "Um reservatório apresenta produtividade primária líquida de 20.000 kcal/m²/ano, da qual cerca de 10% passa para o nível seguinte, com a mesma eficiência entre os demais níveis. A energia anual disponível para o nível dos peixes carnívoros, que são consumidores terciários, é de aproximadamente:",
    "alternativas": [
      "2.000 kcal/m²/ano, valor correspondente ao segundo nível de consumidores.",
      "20 kcal/m²/ano, resultado de três transferências tróficas com aproveitamento de cerca de 10% em cada etapa.",
      "10.000 kcal/m²/ano, já que metade da energia é dissipada em cada nível.",
      "Não é possível estimar, porque a energia flui em ciclos fechados nos ecossistemas.",
      "200 kcal/m²/ano, pois ocorrem apenas duas transferências tróficas."
    ],
    "correta": 1,
    "comentario": "A cadeia é: produtores → zooplâncton (consumidor primário) → pequenos peixes (secundário) → peixes maiores (terciário). A partir dos produtores ocorrem três transferências: 20.000 → 2.000 → 200 → 20 kcal/m²/ano. Como cerca de 90% da energia é perdida como calor em cada nível, apenas aproximadamente 10% é aproveitado na biomassa do nível seguinte."
  },
  {
    "disciplina": "Biologia",
    "trimestre": 2,
    "habilidades": [
      "EM13CNT202",
      "EM13CNT301"
    ],
    "enunciado": "Após um período de estiagem, pescadores registram mortandade de peixes em um reservatório que recebe esgoto não tratado e rede de drenagem de lavouras vizinhas adubadas. A explicação mais adequada para o fenômeno é:",
    "alternativas": [
      "O aquecimento das águas aumenta a solubilidade do oxigênio, e o excesso de O₂ dissolvido intoxica os peixes.",
      "O processo é reversível em poucas horas, porque bactérias aeróbicas restauram o oxigênio dissolvido por meio da quimiossíntese.",
      "O aporte de nutrientes (N e P) eleva a produtividade primária; a decomposição da biomassa consome o oxigênio dissolvido, gerando anóxia e morte dos peixes.",
      "As florações de cianobactérias produzem oxigênio em demasia durante o dia, e esse excesso bloqueia a respiração branquial dos peixes.",
      "O esgoto reduz a concentração de nutrientes na água, e a escassez de alimento causa a mortandade."
    ],
    "correta": 2,
    "comentario": "A eutrofização começa com o excesso de nitrogênio e fósforo, que provocam florações de algas e cianobactérias. Ao morrerem, esses organismos são decompostos por bactérias que consomem o oxigênio dissolvido; a hipóxia resultante leva à mortandade. O controle depende de saneamento e do manejo de fertilizantes, e a recuperação do reservatório costuma levar semanas ou meses, não horas."
  },
  {
    "disciplina": "Biologia",
    "trimestre": 3,
    "habilidades": [
      "EM13CNT302",
      "EM13CNT401"
    ],
    "enunciado": "O número básico de reprodução R0 indica quantas pessoas um indivíduo infectado contagia, em média, em uma população inteiramente suscetível. Segundo o modelo de imunidade de rebanho, a cobertura vacinal mínima para conter a transmissão é Vc = (1 − 1/R0) × 100%. Para um patógeno com R0 = 12, como o sarampo, essa cobertura é de, aproximadamente:",
    "alternativas": [
      "75%.",
      "60%.",
      "8,3%.",
      "91,7%.",
      "50%."
    ],
    "correta": 3,
    "comentario": "Vc = (1 − 1/12) × 100% = (1 − 0,083) × 100% = 91,7%. Quanto maior o R0, maior a fração de imunes necessária; por isso doenças muito transmissíveis exigem coberturas altas — próximas de 92%, no caso do sarampo. O valor 8,3% corresponde apenas a 1/R0, ou seja, à fração suscetível tolerada."
  },
  {
    "disciplina": "Biologia",
    "trimestre": 3,
    "habilidades": [
      "EM13CNT302",
      "EM13CNT401"
    ],
    "enunciado": "Um jovem picado por cobra é atendido em hospital e recebe soro antiofídico, que contém anticorpos prontos contra a peçonha. Esse procedimento difere da vacinação porque:",
    "alternativas": [
      "Ambos são exemplos de imunização ativa, em que o paciente produz seus próprios anticorpos.",
      "O soro confere imunidade permanente, enquanto a vacina tem efeito passageiro de poucos dias.",
      "Ambos são exemplos de imunidade passiva natural, herdada da mãe durante a gestação.",
      "O soro contém antígenos inativados que estimulam a produção de anticorpos pelo paciente.",
      "O soro introduz anticorpos prontos, conferindo imunidade passiva, rápida, mas temporária; a vacina, com antígenos, induz imunidade ativa, com produção de anticorpos e células de memória, de efeito duradouro."
    ],
    "correta": 4,
    "comentario": "A soroterapia é imunização passiva artificial: anticorpos já prontos agem de imediato, mas são degradados em semanas, sem gerar memória. A vacina é imunização ativa artificial: os antígenos estimulam o organismo a produzir anticorpos e células de memória, conferindo proteção duradoura. Imunidade passiva natural é a recebida pela placenta e pelo leite materno."
  },
  {
    "disciplina": "Física",
    "trimestre": 1,
    "habilidades": [
      "EM13FIS101",
      "EM13FIS102"
    ],
    "enunciado": "Um automóvel de 1.000 kg trafega a 72 km/h (20 m/s) quando o motorista aciona os freios, percorrendo 50 m até parar. A força resultante média aplicada pelos freios foi de, aproximadamente:",
    "alternativas": [
      "4.000 N",
      "200 N",
      "20 N",
      "400 N",
      "40.000 N"
    ],
    "correta": 0,
    "comentario": "Pelo teorema do trabalho e energia, o trabalho da força de frenagem modifica a energia cinética: −F · d = 0 − (1/2) · m · v². Logo F = m · v²/(2 · d) = 1.000 × (20)²/(2 × 50) = 400.000/100 = 4.000 N. A força é contrária ao movimento, e seu módulo depende da massa, da velocidade e da distância de parada — o que explica por que parar leva mais tempo e espaço a velocidades maiores."
  },
  {
    "disciplina": "Física",
    "trimestre": 1,
    "habilidades": [
      "EM13FIS101",
      "EM13FIS102"
    ],
    "enunciado": "Em uma colisão frontal, um caminhão de 30 toneladas e um carro de passeio de 1 tonelada, ambos a 90 km/h, trocam forças de contato durante 0,2 s. Considerando o sistema caminhão + carro como isolado durante a colisão, é correto afirmar que:",
    "alternativas": [
      "A quantidade de movimento total do sistema aumenta durante a colisão, porque os módulos das velocidades diminuem.",
      "As forças trocadas entre os veículos têm módulos iguais, mesma direção e sentidos opostos; o carro, de menor massa, sofre maior desaceleração.",
      "A força exercida pelo caminhão sobre o carro é maior do que a exercida pelo carro sobre o caminhão, porque o caminhão tem massa maior.",
      "O caminhão sofre variação de velocidade maior que a do carro, pois sua quantidade de movimento inicial é trinta vezes maior.",
      "O impulso recebido pelo caminhão é trinta vezes maior que o impulso recebido pelo carro, pois suas velocidades iniciais são iguais."
    ],
    "correta": 1,
    "comentario": "Pela terceira lei de Newton, as forças de contato são iguais e opostas; durante os mesmos 0,2 s, os impulsos também são iguais e opostos. Como Δp = m · Δv, e as variações de quantidade de movimento têm o mesmo módulo, 30.000 × Δv(caminhão) = 1.000 × Δv(carro): a velocidade do carro muda cerca de 30 vezes mais que a do caminhão. É por isso que, em colisões, o veículo mais leve sofre danos muito maiores."
  },
  {
    "disciplina": "Física",
    "trimestre": 1,
    "habilidades": [
      "EM13FIS301",
      "EM13FIS302"
    ],
    "enunciado": "Uma onda periódica induzida numa corda tem frequência de 5 Hz e medições sucessivas mostram cristas separadas por 0,80 m. A velocidade de propagação e o período dessa onda são, respectivamente:",
    "alternativas": [
      "5,0 m/s e 0,16 s",
      "0,16 m/s e 0,20 s",
      "4,0 m/s e 0,20 s",
      "4,0 m/s e 5,0 s",
      "0,16 m/s e 5,0 s"
    ],
    "correta": 2,
    "comentario": "A equação fundamental da ondulatória é v = f · λ = 5 Hz × 0,80 m = 4,0 m/s. O período é o inverso da frequência: T = 1/f = 1/5 = 0,20 s. A amplitude não entra nas contas: ela indica a energia transportada pela onda, não a sua velocidade de propagação."
  },
  {
    "disciplina": "Física",
    "trimestre": 1,
    "habilidades": [
      "EM13FIS301",
      "EM13FIS302"
    ],
    "enunciado": "O arco-íris que se forma após a chuva resulta, principalmente, do seguinte fenômeno:",
    "alternativas": [
      "O fenômeno é devido à difração, pois as gotículas têm dimensões menores que o comprimento de onda da luz visível.",
      "A luz branca sofre reflexão especular na superfície das gotículas, sem mudar de velocidade, e as cores surgem por interferência destrutiva.",
      "A separação ocorre na atmosfera acima da chuva: partículas de poeira filtram a luz branca em suas cores componentes.",
      "A luz branca, ao penetrar nas gotículas, é decomposta em suas cores porque cada frequência sofre refração em grau distinto (dispersão); em seguida, a luz refletida na parede interna retorna ao observador.",
      "As cores aparecem porque as gotículas emitem luz própria, de frequências diferentes, ao evaporarem."
    ],
    "correta": 3,
    "comentario": "O índice de refração da água varia com a frequência, de modo que o violeta desvia-se mais que o vermelho — é a dispersão. A luz refrata-se ao entrar na gota, reflete-se internamente e refrata-se novamente ao sair, chegando ao observador organizada em cores. A difração exigiria obstáculos de dimensões comparáveis ao comprimento de onda da luz, e as gotas são muito maiores que isso."
  },
  {
    "disciplina": "Física",
    "trimestre": 2,
    "habilidades": [
      "EM13FIS205",
      "EM13FIS206"
    ],
    "enunciado": "Um chuveiro elétrico de potência 6.400 W é ligado em uma rede de 220 V. A resistência elétrica do seu elemento de aquecimento é de, aproximadamente:",
    "alternativas": [
      "34,6 Ω",
      "29,1 Ω",
      "0,11 Ω",
      "1.312 Ω",
      "7,56 Ω"
    ],
    "correta": 4,
    "comentario": "De P = U²/R vem R = U²/P = (220 V)²/6.400 W = 48.400/6.400 = 7,56 Ω. A partir de R, obtém-se a corrente i = P/U = 6.400/220 ≈ 29,1 A, valor que aparece na alternativa B, apresentado erroneamente como uma resistência de 29,1 Ω. O valor 29,1 corresponde à corrente em ampères, não à resistência; e a resistência só se obtém por R = U²/P, nunca por P/U², que daria 6.400/48.400 = 0,13 Ω."
  },
  {
    "disciplina": "Física",
    "trimestre": 2,
    "habilidades": [
      "EM13FIS205",
      "EM13FIS206"
    ],
    "enunciado": "Uma residência utiliza diariamente: chuveiro de 6.400 W por 40 minutos, geladeira de 150 W com compressor funcionando 8 horas por dia e dez lâmpadas LED de 9 W acesas 5 horas por dia. O consumo mensal (30 dias) é de aproximadamente:",
    "alternativas": [
      "178 kWh",
      "554 kWh",
      "2.448 kWh",
      "36 kWh",
      "146 kWh"
    ],
    "correta": 0,
    "comentario": "Chuveiro: 6,4 kW × 0,667 h = 4,27 kWh/dia. Geladeira: 0,15 kW × 8 h = 1,20 kWh/dia. Lâmpadas: 10 × 0,009 kW × 5 h = 0,45 kWh/dia. Total diário: 5,92 kWh; em 30 dias, 5,92 × 30 ≈ 178 kWh. O valor de 36 kWh corresponderia a considerar apenas a geladeira, e 146 kWh resultaria de estimar o banho em 30 minutos."
  },
  {
    "disciplina": "Física",
    "trimestre": 3,
    "habilidades": [
      "EM13FIS201",
      "EM13FIS303"
    ],
    "enunciado": "Em um calorímetro, 400 g de água a 25 °C recebem um bloco metálico de 500 g a 150 °C, de calor específico 0,11 cal/(g · °C), num calorímetro ideal. A temperatura final de equilíbrio térmico é de aproximadamente:",
    "alternativas": [
      "30,2 °C",
      "40,1 °C",
      "37,5 °C",
      "44,5 °C",
      "58,3 °C"
    ],
    "correta": 1,
    "comentario": "Q<sub>metal</sub> + Q<sub>água</sub> = 0: 500 × 0,11 × (150 − T) + 400 × 1,00 × (T − 25) = 0, ou seja, 8.250 − 55 T + 400 T − 10.000 = 0, logo 455 T = 18.250 e T ≈ 40,1 °C. O resultado é sempre intermediário entre as temperaturas iniciais e, como a capacidade térmica da água (400 cal/°C) é muito maior que a do bloco (55 cal/°C), a temperatura final fica mais próxima da da água."
  },
  {
    "disciplina": "Física",
    "trimestre": 3,
    "habilidades": [
      "EM13FIS201",
      "EM13FIS303"
    ],
    "enunciado": "Um cubo metálico de massa 156 g e volume 20 cm³ é totalmente imerso em água (ρ = 1,0 g/cm³; g = 10 m/s²). Analisando o empuxo e o peso, é correto afirmar que:",
    "alternativas": [
      "Por ser metálico, o cubo não sofre empuxo, pois flutua apenas materiais menos densos que o ar.",
      "O empuxo é de 1,56 N, igual ao peso do cubo; por isso ele fica em equilíbrio no interior da água.",
      "O empuxo é de 0,20 N, menor que o peso de 1,56 N; por isso o cubo afunda.",
      "O empuxo depende apenas do volume do corpo, não importando a densidade do fluido.",
      "O empuxo é de 2,00 N, e o cubo sobe até a superfície, onde passa a flutuar."
    ],
    "correta": 2,
    "comentario": "E = ρ<sub>fluido</sub> · V · g = 1,0 g/cm³ × 20 cm³ = 20 g de água deslocada, cujo peso é 0,02 kg × 10 m/s² = 0,20 N. O peso do cubo é 0,156 kg × 10 m/s² = 1,56 N. Como o peso supera o empuxo, o corpo afunda; a densidade do cubo (7,8 g/cm³) é muito maior que a da água. O empuxo depende tanto do volume deslocado quanto da densidade do fluido."
  },
  {
    "disciplina": "Química",
    "trimestre": 1,
    "habilidades": [
      "EM13QMU101",
      "EM13QMU102"
    ],
    "enunciado": "O sódio (Z = 11) e o cloro (Z = 17) estão no mesmo período da tabela periódica. Comparando os dois elementos, é correto afirmar que:",
    "alternativas": [
      "O sódio tem menor raio atômico porque possui menos camadas eletrônicas que o cloro.",
      "O sódio tem energia de ionização maior, porque metais alcalinos seguram seus elétrons com mais força.",
      "Ambos têm raios atômicos iguais, pois pertencem ao mesmo período da tabela.",
      "O cloro tem menor raio atômico e maior eletronegatividade, porque, ao longo do período, o aumento da carga nuclear efetiva atrai mais fortemente os elétrons de valência.",
      "Ambos são gases nobres com configurações de valência completas."
    ],
    "correta": 3,
    "comentario": "Sódio e cloro ocupam o terceiro período: ambos têm três camadas eletrônicas. Ao longo do período, a carga nuclear aumenta, os elétrons de valência são atraídos mais fortemente e o raio diminui; a eletronegatividade e a energia de ionização aumentam. Daí o cloro (3,16 na escala de Pauling) ser muito mais eletronegativo que o sódio (0,93), e a reação entre eles formar o composto iônico NaCl."
  },
  {
    "disciplina": "Química",
    "trimestre": 1,
    "habilidades": [
      "EM13QMU101",
      "EM13QMU102"
    ],
    "enunciado": "No experimento de Rutherford, a maior parte das partículas alfa atravessou uma fina lâmina de ouro praticamente sem desvio, mas aproximadamente uma em cada oito mil era desviada com ângulos superiores a 90 graus. Essas observações permitiam concluir que o átomo:",
    "alternativas": [
      "Contém elétrons dispersos numa massa positiva, como num pudim de passas.",
      "É uma esfera maciça e indivisível, com cargas distribuídas uniformemente.",
      "Não possui núcleo, mas um mar de elétrons circulando livremente entre os prótons.",
      "Tem elétrons organizados em órbitas circulares de energia quantizada.",
      "Possui um núcleo pequeno, denso e positivamente carregado, distante da região ocupada pelos elétrons."
    ],
    "correta": 4,
    "comentario": "Partículas alfa são positivas; ao serem repelidas com grandes ângulos, só podiam estar interagindo com uma região muito pequena, densa e de carga positiva no centro do átomo — o núcleo. O modelo de Thomson previra apenas desvios pequenos. O modelo de Bohr, com órbitas quantizadas, veio depois e explicava os espectros de linhas, não o resultado da lâmina de ouro."
  },
  {
    "disciplina": "Química",
    "trimestre": 1,
    "habilidades": [
      "EM13QMU201",
      "EM13QMU204"
    ],
    "enunciado": "A remoção da gordura de uma panela com água e detergente ocorre porque:",
    "alternativas": [
      "As moléculas do detergente, anfifílicas, formam micelas que mantêm a gordura dispersa na água, com as cadeias apolares voltadas para dentro e as cabeças polares para fora.",
      "O detergente reage quimicamente com a gordura, convertendo-a em sais solúveis em água.",
      "A água, sendo polar, dissolve a gordura desde que o detergente reduza a temperatura da mistura.",
      "O detergente aumenta tanto a tensão superficial da água que ela passa a molhar e a dissolver a gordura.",
      "O detergente torna a água apolar, o que permite dissolver a gordura por semelhança de polaridade."
    ],
    "correta": 0,
    "comentario": "A molécula de sabão ou detergente tem uma extremidade polar (hidrofílica) e uma cadeia longa apolar (lipofílica). Na micela, as cadeias apolares envolvem a gordura e as cabeças polares ficam em contato com a água, mantendo a emulsão estável até o enxágue. O detergente reduz, e não aumenta, a tensão superficial; e a água, polar, não dissolve a gordura apolar (semelhante dissolve semelhante)."
  },
  {
    "disciplina": "Química",
    "trimestre": 1,
    "habilidades": [
      "EM13QMU201",
      "EM13QMU204"
    ],
    "enunciado": "Considerando as diferenças de eletronegatividade: NaCl (Δ ≈ 2,2), HCl (Δ ≈ 1,0) e H₂ (Δ = 0), as ligações presentes nesses compostos classificam-se, respectivamente, como:",
    "alternativas": [
      "Metálica, iônica e covalente apolar.",
      "Iônica, covalente polar e covalente apolar.",
      "Iônica, covalente apolar e iônica.",
      "Covalente polar, covalente polar e iônica.",
      "Covalente apolar, covalente polar e metálica."
    ],
    "correta": 1,
    "comentario": "Diferenças de eletronegatividade acima de cerca de 1,7 indicam ligação iônica (metal com ametal): NaCl, formado por sódio (0,93) e cloro (3,16), é iônico. Entre 0,4 e 1,7, a ligação é covalente polar: HCl, com hidrogênio (2,20) e cloro (3,16), é polar. Com Δ próxima de zero, entre átomos iguais, a ligação é covalente apolar: H₂."
  },
  {
    "disciplina": "Química",
    "trimestre": 2,
    "habilidades": [
      "EM13QMU202",
      "EM13QMU205"
    ],
    "enunciado": "Uma solução foi preparada dissolvendo-se 60 g de cloreto de sódio em água até completar 400 mL. Comparada ao coeficiente de solubilidade do sal (cerca de 357 g/L a 25 °C), a concentração e a classificação dessa solução são:",
    "alternativas": [
      "6,7 g/L; insaturada.",
      "60 g/L; supersaturada.",
      "150 g/L; insaturada.",
      "150 g/L; saturada, com soluto não dissolvido no fundo do recipiente.",
      "24 g/L; saturada."
    ],
    "correta": 2,
    "comentario": "C = m₁/V = 60 g / 0,4 L = 150 g/L. Como o coeficiente de solubilidade do NaCl a 25 °C é cerca de 357 g/L, a solução ainda comportaria muito mais soluto: é insaturada. O valor 6,7 g/L resultaria de dividir o volume pela massa, e confundir concentração com solubilidade máxima leva erroneamente à classificação saturada."
  },
  {
    "disciplina": "Química",
    "trimestre": 2,
    "habilidades": [
      "EM13QMU202",
      "EM13QMU205"
    ],
    "enunciado": "Numa estação de tratamento de água, o sulfato de alumínio é adicionado à água bruta com a finalidade principal de:",
    "alternativas": [
      "Fornecer flúor à água distribuída, prevenindo a formação de cáries.",
      "Retirar gases dissolvidos, como o oxigênio, por arraste com alumínio metálico.",
      "Aumentar a dureza da água, elevando o pH para valores fortemente alcalinos.",
      "Promover a coagulação das partículas coloidais em suspensão, por neutralização de cargas, formando flocos que decantam ou são retidos na filtração.",
      "Eliminar os microrganismos patogênicos, substituindo a etapa de cloração."
    ],
    "correta": 3,
    "comentario": "O sulfato de alumínio (ou o PAC) age na coagulação e floculação: os íons alumínio formam flocos de hidróxido de alumínio e neutralizam as cargas das partículas coloidais, que se agrupam, sedimentam na decantação e são retiradas na filtração. A desinfecção é feita pelo cloro (ou cloramina e ozônio), a fluoretação adiciona fluoreto, e a correção de pH usa cal — nenhuma dessas é função do sulfato de alumínio."
  },
  {
    "disciplina": "Química",
    "trimestre": 2,
    "habilidades": [
      "EM13QMU301",
      "EM13QMU302"
    ],
    "enunciado": "A queima completa de 228 g de octano (C₈H₁₈, massa molar 114 g/mol) consome, em condições estequiométricas, quantos mols de O₂ e produz quantos mols de CO₂?",
    "alternativas": [
      "6,25 mol de O₂ e 4 mol de CO₂.",
      "50 mol de O₂ e 32 mol de CO₂.",
      "12,5 mol de O₂ e 8 mol de CO₂.",
      "1,25 mol de O₂ e 0,8 mol de CO₂.",
      "25 mol de O₂ e 16 mol de CO₂."
    ],
    "correta": 4,
    "comentario": "A equação balanceada é 2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O. Como 228 g correspondem a 2 mols de octano, as proporções diretas são 25 mols de O₂ e 16 mols de CO₂ — em gramas, 800 g de O₂ e 704 g de CO₂, confirmando a conservação da massa (1.028 g de reagentes e 1.028 g de produtos). Por mol de octano, a proporção é de 12,5 mols de O₂ e 8 mols de CO₂."
  },
  {
    "disciplina": "Química",
    "trimestre": 2,
    "habilidades": [
      "EM13QMU301",
      "EM13QMU302"
    ],
    "enunciado": "Do ponto de vista termoquímico, uma reação em que os produtos têm entalpia menor que a dos reagentes é classificada como:",
    "alternativas": [
      "Exotérmica, com ΔH menor que zero, liberando calor para o ambiente.",
      "Exotérmica, com ΔH igual a zero, sem troca de calor com o ambiente.",
      "Endotérmica, com ΔH menor que zero, liberando calor.",
      "Endotérmica, com ΔH maior que zero, absorvendo calor do ambiente.",
      "Exotérmica, com ΔH maior que zero, absorvendo calor."
    ],
    "correta": 0,
    "comentario": "A variação de entalpia é ΔH = H(produtos) − H(reagentes). Produtos em nível energético inferior implicam ΔH negativo, ou seja, calor liberado: a reação é exotérmica. Combustões e neutralizações são exemplos típicos; decomposições como a do calcário são endotérmicas e exigem aquecimento."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 1,
    "habilidades": [
      "EM13MAT205"
    ],
    "enunciado": "Um mapa está na escala 1:2.000.000. Se duas cidades distam 6 cm no mapa, qual a distância real entre elas?",
    "alternativas": [
      "600 km",
      "120 km",
      "60 km",
      "1.200 km",
      "12 km"
    ],
    "correta": 1,
    "comentario": "1 cm no mapa = 2.000.000 cm = 20 km na realidade. Logo, 6 cm × 20 km = 120 km."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 1,
    "habilidades": [
      "EM13MAT205"
    ],
    "enunciado": "Se 3 operários constroem um muro em 12 dias, em quantos dias 4 operários, com o mesmo ritmo, construiriam o mesmo muro?",
    "alternativas": [
      "16 dias",
      "8 dias",
      "9 dias",
      "15 dias",
      "6 dias"
    ],
    "correta": 2,
    "comentario": "Grandezas inversamente proporcionais: 3 × 12 = 4 × x → x = 36/4 = 9 dias."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 2,
    "habilidades": [
      "EM13MAT205"
    ],
    "enunciado": "A raiz da função f(x) = 3x - 12 é:",
    "alternativas": [
      "3",
      "2",
      "-4",
      "4",
      "12"
    ],
    "correta": 3,
    "comentario": "3x - 12 = 0 → 3x = 12 → x = 4. Portanto, a raiz da função f(x) = 3x - 12 vale 4, ou seja, o ponto onde o gráfico cruza o eixo x é (4, 0)."
  },
  {
    "disciplina": "Matemática",
    "trimestre": 2,
    "habilidades": [
      "EM13MAT205"
    ],
    "enunciado": "Uma corrida de táxi custa R$ 5,00 (bandeirada) mais R$ 2,20 por km. Qual o valor de uma corrida de 8 km?",
    "alternativas": [
      "R$ 21,60",
      "R$ 22,60",
      "R$ 16,60",
      "R$ 17,60",
      "R$ 23,60"
    ],
    "correta": 1,
    "comentario": "f(km) = 5 + 2,2·km → 5 + 2,2×8 = 5 + 17,6 = R$ 22,60. A bandeirada entra uma única vez; o distrator R$ 17,60 é apenas o trecho variável (2,2 × 8), sem a taxa fixa, e o R$ 23,60 nasce de somar R$ 5,00 de forma indevida a um valor já completo."
  },
  {
    "disciplina": "Língua Portuguesa",
    "trimestre": 1,
    "habilidades": [
      "EM13LP201"
    ],
    "enunciado": "No cartaz 'Vacine seu filho contra a paralisia infantil neste sábado!', a função da linguagem predominante é a:",
    "alternativas": [
      "Conativa (apelativa)",
      "Referencial",
      "Poética",
      "Metalinguística",
      "Emotiva"
    ],
    "correta": 0,
    "comentario": "O texto busca convencer o leitor a agir, focando no receptor: função conativa ou apelativa."
  },
  {
    "disciplina": "Língua Portuguesa",
    "trimestre": 1,
    "habilidades": [
      "EM13LP201"
    ],
    "enunciado": "Em um poema que valoriza a sonoridade e a forma das palavras, predomina a função:",
    "alternativas": [
      "Conativa",
      "Poética",
      "Emotiva",
      "Fática",
      "Referencial"
    ],
    "correta": 1,
    "comentario": "Quando o foco está na mensagem e na sua organização estética, predomina a função poética."
  },
  {
    "disciplina": "Literatura",
    "trimestre": 2,
    "habilidades": [
      "EM13LIT1002"
    ],
    "enunciado": "O Manifesto Antropófago, de Oswald de Andrade, propunha:",
    "alternativas": [
      "A valorização exclusiva do indígena como herói.",
      "A imitação dos modelos clássicos europeus.",
      "A 'devoração' crítica da cultura estrangeira para criar uma identidade brasileira.",
      "A defesa do parnasianismo.",
      "A negação de qualquer influência externa."
    ],
    "correta": 2,
    "comentario": "A antropofagia defendia deglutir criticamente as influências estrangeiras e produzir algo original e nacional."
  },
  {
    "disciplina": "Literatura",
    "trimestre": 2,
    "habilidades": [
      "EM13LIT1002"
    ],
    "enunciado": "A primeira fase do Romantismo brasileiro é conhecida como:",
    "alternativas": [
      "Parnasiana",
      "Condoreira",
      "Pré-modernista",
      "Indianista",
      "Realista"
    ],
    "correta": 3,
    "comentario": "A fase indianista exaltava o indígena como herói nacional, com obras como 'O Guarani' e 'Iracema'."
  },
  {
    "disciplina": "Redação",
    "trimestre": 1,
    "habilidades": [
      "EM13LP603"
    ],
    "enunciado": "Na redação do ENEM, a proposta de intervenção deve apresentar, obrigatoriamente:",
    "alternativas": [
      "Somente dados estatísticos do IBGE.",
      "Apenas o agente que resolverá o problema.",
      "Uma opinião pessoal sem detalhamento.",
      "Apenas o efeito esperado da ação.",
      "Agente, ação, modo/meio, efeito e detalhamento."
    ],
    "correta": 4,
    "comentario": "A proposta completa detalha quem age (agente), o que faz (ação), como (modo/meio), o que se pretende obter (efeito/finalidade) e detalhes que especificam a ação (detalhamento), respeitando os direitos humanos."
  },
  {
    "disciplina": "Redação",
    "trimestre": 1,
    "habilidades": [
      "EM13LP603"
    ],
    "enunciado": "O 'repertório sociocultural' na redação serve para:",
    "alternativas": [
      "Sustentar a argumentação com referências diversas (leis, dados, autores, fatos).",
      "Descrever a história pessoal do autor.",
      "Substituir a tese do texto.",
      "Encerrar a conclusão.",
      "Alongar o texto sem necessidade."
    ],
    "correta": 0,
    "comentario": "O repertório legitimado (filmes, leis, filósofos, dados) dá peso e originalidade à argumentação."
  },
  {
    "disciplina": "Inglês",
    "trimestre": 1,
    "habilidades": [
      "EM13LI202"
    ],
    "enunciado": "Na frase 'She is actually very prepared', a palavra 'actually' significa:",
    "alternativas": [
      "Eventualmente",
      "Na verdade",
      "Atualmente",
      "Realmente sempre",
      "No final"
    ],
    "correta": 1,
    "comentario": "'Actually' = 'na verdade'. 'Atualmente' seria 'currently'. Todo cuidado com falsos cognatos."
  },
  {
    "disciplina": "Inglês",
    "trimestre": 1,
    "habilidades": [
      "EM13LI202"
    ],
    "enunciado": "Em 'The policy aims to reduce costs', a palavra 'policy' significa:",
    "alternativas": [
      "Polícia",
      "Educação",
      "Política",
      "Popularidade",
      "Economia"
    ],
    "correta": 2,
    "comentario": "'Policy' = política (diretriz/estratégia). 'Polícia' é 'police'. Atenção aos falsos cognatos."
  },
  {
    "disciplina": "Espanhol",
    "trimestre": 1,
    "habilidades": [
      "EM13LE202"
    ],
    "enunciado": "A palavra espanhola 'embarazada' significa:",
    "alternativas": [
      "Confusa",
      "Cansada",
      "Com fome",
      "Grávida",
      "Envergonhada"
    ],
    "correta": 3,
    "comentario": "'Embarazada' = grávida. É um falso cognato clássico do espanhol."
  },
  {
    "disciplina": "Espanhol",
    "trimestre": 1,
    "habilidades": [
      "EM13LE202"
    ],
    "enunciado": "O conector 'sin embargo' indica uma ideia de:",
    "alternativas": [
      "Finalidade",
      "Consequência",
      "Tempo",
      "Causa",
      "Contraste (adversativa)"
    ],
    "correta": 4,
    "comentario": "'Sin embargo' = 'no entanto', introduz contraste, articulando uma oposição entre as ideias."
  },
  {
    "disciplina": "História Geral",
    "trimestre": 1,
    "habilidades": [
      "EM13HIS101"
    ],
    "enunciado": "A democracia ateniense do século V a.C. caracterizava-se por ser:",
    "alternativas": [
      "Direta, com a participação dos cidadãos nas decisões na Ágora.",
      "Representativa, com eleições para o Senado.",
      "Controlada pelos sacerdotes.",
      "Monárquica, sob a liderança de um rei.",
      "Universal, incluindo mulheres e estrangeiros."
    ],
    "correta": 0,
    "comentario": "A democracia ateniense era direta: os cidadãos (homens atenienses, maiores de idade, de pai e mãe atenienses) deliberavam pessoalmente na Eclésia, assembleia que se reunia no Pnyx; a Ágora era o espaço de comércio e circulação da cidade."
  },
  {
    "disciplina": "História Geral",
    "trimestre": 1,
    "habilidades": [
      "EM13HIS101"
    ],
    "enunciado": "As lutas dos plebeus em Roma resultaram na criação da/o:",
    "alternativas": [
      "Código de Hamurábi.",
      "Lei das Doze Tábuas.",
      "Tratado de Versalhes.",
      "Edito de Nantes.",
      "Corpus Juris Civilis."
    ],
    "correta": 1,
    "comentario": "A pressão dos plebeus levou à Lei das Doze Tábuas (450 a.C.), primeiro código escrito do direito romano."
  },
  {
    "disciplina": "História do Brasil",
    "trimestre": 2,
    "habilidades": [
      "EM13HIS202",
      "EM13HIS205"
    ],
    "enunciado": "A 'Política dos Governadores', do governo Campos Salles, consistia em:",
    "alternativas": [
      "Aliança do Brasil com a Inglaterra.",
      "Fim do poder dos coronéis no interior.",
      "Apoio mútuo entre o Presidente e os governadores para eleger candidatos oficiais.",
      "Entrega do governo a militares.",
      "Divisão igualitária de terras entre os estados."
    ],
    "correta": 2,
    "comentario": "Presidência e governadores trocavam apoios para garantir a eleição de candidatos oficiais e controlar a oposição."
  },
  {
    "disciplina": "História do Brasil",
    "trimestre": 2,
    "habilidades": [
      "EM13HIS202",
      "EM13HIS205"
    ],
    "enunciado": "O voto aberto previsto na Constituição de 1891 favorecia diretamente:",
    "alternativas": [
      "A ampliação do eleitorado feminino.",
      "O sigilo e a liberdade do eleitor.",
      "O voto dos analfabetos.",
      "A fraude e a coerção pelo coronelismo.",
      "A fiscalização independente das eleições."
    ],
    "correta": 3,
    "comentario": "Sem voto secreto, o coronel podia identificar e coagir o voto do eleitor rural, garantindo o resultado."
  },
  {
    "disciplina": "Geografia",
    "trimestre": 2,
    "habilidades": [
      "EM13GEO102"
    ],
    "enunciado": "O termo 'macrocefalia urbana' refere-se:",
    "alternativas": [
      "Ao planejamento urbano sustentável.",
      "Ao crescimento equilibrado das cidades médias.",
      "À industrialização do campo.",
      "À diminuição da população nas capitais.",
      "Ao crescimento acelerado e desordenado de uma cidade, que concentra serviços e população."
    ],
    "correta": 4,
    "comentario": "A macrocefalia urbana é o crescimento exagerado de uma metrópole, que concentra população, serviços e problemas."
  },
  {
    "disciplina": "Geografia",
    "trimestre": 2,
    "habilidades": [
      "EM13GEO102"
    ],
    "enunciado": "A 'conurbação' ocorre quando:",
    "alternativas": [
      "Duas ou mais cidades vizinhas crescem até unir seus limites físicos.",
      "A população migra do campo para a cidade.",
      "Ocorre a divulgação de uma cultura local.",
      "As indústrias deixam o espaço urbano.",
      "Uma cidade é totalmente planejada."
    ],
    "correta": 0,
    "comentario": "Conurbação é o encontro físico entre cidades próximas, formando uma malha urbana contínua."
  },
  {
    "disciplina": "Sociologia",
    "trimestre": 1,
    "habilidades": [
      "SOC2001"
    ],
    "enunciado": "Para Karl Marx, a 'mais-valia' corresponde:",
    "alternativas": [
      "Ao lucro do trabalhador sobre o salário.",
      "À diferença entre o valor produzido pelo trabalho e o salário pago.",
      "Ao custo da matéria-prima.",
      "Ao valor de mercado das máquinas.",
      "Aos juros pagos pelos bancos."
    ],
    "correta": 1,
    "comentario": "A mais-valia é o tempo de trabalho não pago: o valor que o operário produz além do que recebe, apropriado pelo capitalista."
  },
  {
    "disciplina": "Sociologia",
    "trimestre": 1,
    "habilidades": [
      "SOC2001"
    ],
    "enunciado": "Max Weber classificou a dominação 'racional-legal' como aquela baseada:",
    "alternativas": [
      "No uso da força física.",
      "No carisma do líder.",
      "Em leis e regulamentos impessoais.",
      "Nos costumes e na tradição.",
      "Na vontade divina."
    ],
    "correta": 2,
    "comentario": "A dominação racional-legal se sustenta em normas impessoais e na crença na legalidade, típica do Estado moderno burocrático."
  },
  {
    "disciplina": "Filosofia",
    "trimestre": 2,
    "habilidades": [
      "FIL3001",
      "FIL4001"
    ],
    "enunciado": "O Imperativo Categórico de Kant afirma que devemos agir:",
    "alternativas": [
      "Sempre em busca do prazer.",
      "Conforme os interesses da maioria.",
      "Conforme a tradição de cada povo.",
      "De modo que nossa ação possa se tornar uma lei universal.",
      "Para agradar aos deuses."
    ],
    "correta": 3,
    "comentario": "Para Kant, a ação moral é aquela que se pode universalizar, movida pelo dever e não pelo interesse."
  },
  {
    "disciplina": "Filosofia",
    "trimestre": 2,
    "habilidades": [
      "FIL3001",
      "FIL4001"
    ],
    "enunciado": "Para John Locke, os direitos naturais inalienáveis do ser humano são:",
    "alternativas": [
      "Riqueza, poder e glória.",
      "Trabalho, lazer e educação.",
      "Religião, exército e Estado.",
      "Terra, casa e família.",
      "Vida, liberdade e propriedade."
    ],
    "correta": 4,
    "comentario": "Locke defende que todo indivíduo possui, naturalmente, direito à vida, à liberdade e à propriedade."
  },
  {
    "disciplina": "Biologia - Citologia",
    "enunciado": "Durante a meiose de uma célula animal com 2n = 46 cromossomos, ocorre o pareamento dos homólogos na prófase I e a separação desses homólogos na anáfase I. Quantos cromossomos terá cada célula resultante ao final da meiose I?",
    "alternativas": [
      "23 cromossomos, cada um ainda com duas cromátides irmãs",
      "23 cromossomos, cada um com uma cromátide",
      "92 cromossomos, cada um com duas cromátides irmãs",
      "46 cromossomos, cada um com uma cromátide",
      "46 cromossomos, cada um com duas cromátides irmãs"
    ],
    "correta": 0,
    "comentario": "A meiose I é reducional: os cromossomos homólogos se separam, de modo que cada célula-filha recebe 23 cromossomos, ou seja, a metade de 46. Nessa fase ainda não houve divisão dos centrômeros, portanto cada cromossomo continua com duas cromátides irmãs. A separação das cromátides ocorre apenas na meiose II, quando se formam células com 23 cromossomos de uma cromátide cada."
  },
  {
    "disciplina": "Biologia - Fotossíntese",
    "enunciado": "A equação simplificada da fotossíntese, considerando que o O₂ liberado provém da água, é 6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂. Quantos mols de oxigênio são liberados na síntese de 3 mols de glicose?",
    "alternativas": [
      "6 mols",
      "18 mols",
      "36 mols",
      "3 mols",
      "9 mols"
    ],
    "correta": 1,
    "comentario": "Pela proporção estequiométrica da equação, 1 mol de glicose corresponde a 6 mols de O₂. Assim, para 3 mols de glicose: 3 × 6 = 18 mols de O₂. Atenção: o oxigênio liberado vem da quebra da água (fotólise), e não do gás carbônico, fato demonstrado com o uso de isótopos marcados."
  },
  {
    "disciplina": "Biologia - Respiração celular",
    "enunciado": "Na respiração celular aeróbia completa de 1 mol de glicose, obtêm-se cerca de 30 a 32 mols de ATP. Considerando o saldo de ATP produzido diretamente na glicólise (2 ATP) e no ciclo de Krebs (2 ATP), quantos mols de ATP são gerados por fosforilação em nível de substrato?",
    "alternativas": [
      "32 mols",
      "2 mols",
      "4 mols",
      "10 mols",
      "6 mols"
    ],
    "correta": 2,
    "comentario": "A fosforilação em nível de substrato ocorre na glicólise, com saldo de 2 ATP (4 produzidos e 2 consumidos na fase de investimento), e no ciclo de Krebs, com 1 ATP por acetil-CoA, totalizando 2 ATP. Logo, 2 + 2 = 4 mols de ATP. O restante, cerca de 26 a 28 mols, provém da cadeia de transporte de elétrons nas cristas mitocondriais, por fosforilação oxidativa."
  },
  {
    "disciplina": "Biologia - Genética",
    "enunciado": "Em ervilhas, a cor amarela da semente (A) é dominante sobre a verde (a). Dois indivíduos heterozigotos (Aa × Aa) são cruzados. Qual a proporção fenotípica esperada entre os descendentes?",
    "alternativas": [
      "9:3:3:1",
      "todos os descendentes amarelos",
      "1:2:1 (homozigotos dominantes, heterozigotos e homozigotos recessivos)",
      "3 descendentes amarelos para 1 verde",
      "1:1, metade amarela e metade verde"
    ],
    "correta": 3,
    "comentario": "O cruzamento Aa × Aa produz os genótipos 1 AA : 2 Aa : 1 aa. Como A é dominante, tanto AA quanto Aa expressam o fenótipo amarelo, resultando em 3 amarelos : 1 verde. A proporção 1:2:1 é genotípica; 9:3:3:1 corresponde à segregação independente de dois caracteres; 1:1 resulta do cruzamento-teste (Aa × aa)."
  },
  {
    "disciplina": "Biologia - Genética (daltonismo)",
    "enunciado": "O daltonismo é uma característica recessiva ligada ao cromossomo X (Xᵈ). Uma mulher de visão normal, cujo pai é daltônico, tem filhos com um homem de visão normal. Qual a probabilidade de cada filho do casal, independentemente do sexo, ser daltônico?",
    "alternativas": [
      "100%",
      "50%",
      "0%",
      "75%",
      "25%"
    ],
    "correta": 4,
    "comentario": "O pai da mulher é daltônico (XᵈY), portanto ela recebeu obrigatoriamente o Xᵈ. Como tem visão normal, seu genótipo é XᴰXᵈ, ou seja, é portadora. O marido é XᴰY. As combinações possíveis, em proporções iguais, são XᴰXᴰ, XᴰXᵈ, XᴰY e XᵈY. Apenas XᵈY é daltônico, logo a probabilidade é 1 em 4, isto é, 25%."
  },
  {
    "disciplina": "Biologia - Ecologia",
    "enunciado": "Em um ambiente aquático observa-se a cadeia alimentar: alga → microcrustáceo → lambari → peixe maior → garça. Quantos níveis tróficos estão presentes nessa cadeia?",
    "alternativas": [
      "5 níveis",
      "6 níveis",
      "2 níveis",
      "4 níveis",
      "3 níveis"
    ],
    "correta": 0,
    "comentario": "Cada organismo ocupa um nível trófico: alga (produtor, 1º), microcrustáceo (consumidor primário, 2º), lambari (consumidor secundário, 3º), peixe maior (consumidor terciário, 4º) e garça (consumidor quaternário, 5º). Há, portanto, 5 níveis tróficos. As setas indicam o sentido da transferência de energia e matéria, e não quem come quem."
  },
  {
    "disciplina": "Biologia - Evolução",
    "enunciado": "Sobre as teorias evolutivas, qual afirmação está de acordo com a teoria sintética da evolução (neodarwinismo)?",
    "alternativas": [
      "Os organismos se adaptam ao meio durante a vida e transmitem essas adaptações adquiridas aos descendentes.",
      "As mutações e a recombinação gênica geram variabilidade, e a seleção natural aumenta a frequência dos alelos vantajosos na população.",
      "O ambiente provoca mutações dirigidas que beneficiam os indivíduos que delas necessitam.",
      "A seleção natural age sobre caracteres adquiridos, modificando-os diretamente nas gerações seguintes.",
      "A evolução ocorre exclusivamente pelo uso e desuso dos órgãos, que se desenvolvem conforme a necessidade."
    ],
    "correta": 1,
    "comentario": "O neodarwinismo integra a genética à seleção natural: a variabilidade genética surge ao acaso, por mutação e recombinação, e a seleção natural atua sobre fenótipos herdáveis, aumentando a frequência dos alelos que conferem maior aptidão. A transmissão de caracteres adquiridos (uso e desuso) é uma ideia lamarckista, refutada; o ambiente não provoca mutações dirigidas aos indivíduos, ele apenas seleciona as variações já existentes."
  },
  {
    "disciplina": "Biologia - Vacinas e imunidade",
    "enunciado": "As vacinas são uma das principais formas de prevenção de doenças infecciosas. Qual afirmação descreve corretamente seu mecanismo de ação?",
    "alternativas": [
      "Atuam como antibióticos, destruindo bactérias e vírus já presentes no organismo do doente.",
      "Substituem os glóbulos vermelhos, aumentando o oxigênio disponível para o transporte pelas células.",
      "Apresentam antígenos (micro-organismos atenuados, inativados ou fragmentos) que estimulam a produção de anticorpos e células de memória pelo próprio organismo.",
      "Agem apenas sobre os leucócitos, elevando a temperatura corporal de forma permanente.",
      "Introduzem anticorpos prontos, produzidos em laboratório, conferindo imunidade passiva permanente."
    ],
    "correta": 2,
    "comentario": "As vacinas induzem imunidade ativa: os antígenos são apresentados aos linfócitos, que produzem anticorpos específicos e células de memória. Em uma exposição futura ao agente, a resposta é mais rápida e eficiente. A soroterapia, e não a vacinação, introduz anticorpos prontos (imunidade passiva e temporária); vacinas não são antibióticos e não atuam sobre hemácias."
  },
  {
    "disciplina": "Biologia - Fisiologia (sistema circulatório)",
    "enunciado": "O sangue venoso, rico em gás carbônico, retorna ao coração pelas veias cavas, entra no átrio direito, passa ao ventrículo direito e é bombeado pelas artérias pulmonares até os pulmões. Após a hematose, o sangue arterial retorna ao coração. Qual afirmação sobre esse percurso é correta?",
    "alternativas": [
      "O átrio esquerdo envia o sangue diretamente aos pulmões, sem passar pelas valvas.",
      "As artérias pulmonares transportam sangue oxigenado para os alvéolos.",
      "O sangue que chega pelas veias cavas é rico em oxigênio.",
      "As veias pulmonares trazem sangue oxigenado dos pulmões para o átrio esquerdo.",
      "O ventrículo direito bombeia o sangue oxigenado para a aorta."
    ],
    "correta": 3,
    "comentario": "A regra geral é que artérias saem do coração e veias chegam a ele, mas o tipo de sangue é definido pela circulação, e não pelo nome do vaso. Na pequena circulação, as artérias pulmonares são exceção, pois levam sangue venoso aos pulmões, e as veias pulmonares, também exceção, trazem sangue oxigenado ao átrio esquerdo. O ventrículo direito nunca bombeia sangue oxigenado, e as veias cavas trazem sangue venoso."
  },
  {
    "disciplina": "Biologia - Ciclo do nitrogênio",
    "enunciado": "Bactérias do gênero Rhizobium vivem em nódulos das raízes de leguminosas, como soja e feijão, e convertem o N₂ atmosférico em amônia (NH₃). Qual papel essas bactérias desempenham no ciclo do nitrogênio?",
    "alternativas": [
      "Fotossíntese: conversão de CO₂ e água em glicose",
      "Nitrificação: conversão da amônia em nitrito e depois em nitrato",
      "Amonificação: transformação da matéria orgânica em amônia",
      "Desnitrificação: conversão de nitratos em N₂, devolvido à atmosfera",
      "Fixação biológica: incorporação do nitrogênio atmosférico a compostos assimiláveis pelas plantas"
    ],
    "correta": 4,
    "comentario": "As bactérias fixadoras, como as Rhizobium em simbiose com leguminosas, usam a enzima nitrogenase para reduzir o N₂ a NH₃, processo conhecido como fixação biológica. É a principal porta de entrada do nitrogênio na cadeia alimentar, pois as plantas não conseguem usar o gás N₂ diretamente. Amonificação, nitrificação e desnitrificação são etapas distintas do ciclo, realizadas por outros micro-organismos."
  },
  {
    "disciplina": "Biologia - Citologia (transporte pela membrana)",
    "enunciado": "Uma hemácia, célula animal sem parede celular, é transferida para uma solução hipotônica. O que se espera que ocorra?",
    "alternativas": [
      "Entrada de água por osmose, com edema e possível ruptura da célula (hemólise).",
      "Saída de água, com enrugamento da célula (crenação).",
      "Entrada de água, mas o volume permanece inalterado graças à parede celular.",
      "Saída de íons, levando ao inchaço celular.",
      "Igualdade de concentrações, sem qualquer variação de volume."
    ],
    "correta": 0,
    "comentario": "Solução hipotônica tem concentração de solutos menor que a do meio intracelular, logo a água entra na célula por osmose. Na ausência de parede celular, a hemácia incha e pode sofrer lise (hemólise). A crenação ocorre em solução hipertônica; a resistência à mudança de volume e a plasmólise são características de células vegetais, que possuem parede celular."
  },
  {
    "disciplina": "Biologia - Genética molecular (DNA)",
    "enunciado": "Uma das fitas de uma molécula de DNA apresenta a sequência 3' TAC – CGA – ATG 5'. Considerando o pareamento A-T e C-G e o antiparalelismo das fitas, a sequência da fita complementar, no sentido 5' → 3', é:",
    "alternativas": [
      "5' TAC – CGA – ATG 3'",
      "5' ATG – GCT – TAC 3'",
      "3' ATG – GCT – TAC 5'",
      "5' GCT – ATG – CGA 3'",
      "3' UAC – CGA – AUG 5'"
    ],
    "correta": 1,
    "comentario": "As fitas do DNA são antiparalelas e complementares: T pareia com A e C pareia com G. Complementando 3' TAC CGA ATG 5', obtém-se, na direção oposta, a fita 5' ATG GCT TAC 3'. A opção com uracila (U) descreve RNA, e a sequência idêntica à original não respeita a complementaridade entre as fitas."
  },
  {
    "disciplina": "Biologia - Ecologia (relações ecológicas)",
    "enunciado": "O carrapato que se alimenta do sangue do boi, prejudicando-o, e a rêmora que se fixa ao tubarão para aproveitar restos de alimento, sem prejudicá-lo, estabelecem, respectivamente, relações do tipo:",
    "alternativas": [
      "inquilismo e sociedade",
      "comensalismo e parasitismo",
      "parasitismo e comensalismo",
      "mutualismo e parasitismo",
      "predação e competição"
    ],
    "correta": 2,
    "comentario": "No parasitismo, uma espécie (parasita) vive às custas de outra (hospedeiro), prejudicando-a, como o carrapato e o boi. No comensalismo, uma espécie beneficia-se dos restos alimentares de outra sem lhe causar prejuízo nem benefício, como a rêmora e o tubarão. O inquilismo envolve obtenção de abrigo, o mutualismo beneficia ambas as espécies e a sociedade reúne indivíduos da mesma espécie."
  },
  {
    "disciplina": "Biologia - Fisiologia (sistema digestório)",
    "enunciado": "Sobre a digestão das proteínas no ser humano, é correto afirmar que:",
    "alternativas": [
      "a digestão das proteínas termina no estômago, não havendo ação de enzimas intestinais",
      "as lipases pancreáticas quebram as proteínas em aminoácidos ainda no estômago",
      "a ptialina, produzida pelas glândulas salivares, inicia a digestão das proteínas na boca",
      "a pepsina, produzida pelo estômago na forma inativa de pepsinogênio, é ativada pelo pH ácido e degrada proteínas em peptídeos menores",
      "o tripsinogênio, produzido pelo fígado, é ativado no intestino e digere os lipídios"
    ],
    "correta": 3,
    "comentario": "A pepsina é secretada pelas células principais do estômago na forma inativa (pepsinogênio) e é ativada pelo HCl, que também reduz o pH a cerca de 2, condição ideal para sua ação. Ela inicia a digestão das proteínas, transformando-as em peptídeos; a digestão é complementada no intestino delgado, pela tripsina, quimiotripsina e peptidases. A ptialina age sobre o amido, e o tripsinogênio é produzido pelo pâncreas, não pelo fígado."
  },
  {
    "disciplina": "Biologia - Evolução (equilíbrio de Hardy-Weinberg)",
    "enunciado": "Em uma população em equilíbrio de Hardy-Weinberg, a frequência do alelo recessivo a é q = 0,4. Qual a frequência esperada de indivíduos heterozigotos (Aa)?",
    "alternativas": [
      "36%",
      "16%",
      "24%",
      "40%",
      "48%"
    ],
    "correta": 4,
    "comentario": "No equilíbrio de Hardy-Weinberg, p + q = 1, logo p = 1 - 0,4 = 0,6. As frequências genotípicas seguem p² + 2pq + q² = 1: AA = p² = 0,36 (36%), Aa = 2pq = 2 × 0,6 × 0,4 = 0,48 (48%) e aa = q² = 0,16 (16%). Note que 16% e 36% são as frequências dos homozigotos, não dos heterozigotos."
  },
  {
    "disciplina": "Física - Leis de Newton",
    "enunciado": "Um bloco de 8 kg desloca-se sobre uma superfície horizontal perfeitamente lisa, puxado por uma força horizontal resultante de 20 N. Qual a aceleração adquirida pelo bloco?",
    "alternativas": [
      "2,5 m/s²",
      "28 m/s²",
      "6,25 m/s²",
      "0,4 m/s²",
      "160 m/s²"
    ],
    "correta": 0,
    "comentario": "Pela 2ª lei de Newton, F_R = m · a, logo a = F_R / m = 20 N / 8 kg = 2,5 m/s². A opção 0,4 m/s² resulta da divisão invertida (m/F); 160 resulta do produto m × F, que não é uma aceleração."
  },
  {
    "disciplina": "Física - Trabalho e energia",
    "enunciado": "Um objeto de 2 kg é solto do repouso de uma altura de 5 m em relação ao solo, com g = 10 m/s² e desprezando a resistência do ar. Qual sua energia cinética ao atingir o solo?",
    "alternativas": [
      "10 J",
      "100 J",
      "200 J",
      "20 J",
      "50 J"
    ],
    "correta": 1,
    "comentario": "Pela conservação da energia mecânica, a energia potencial gravitacional inicial (E_p = m · g · h = 2 × 10 × 5 = 100 J) converte-se integralmente em energia cinética, já que o objeto partiu do repouso (E_c inicial = 0). Portanto, E_c final = 100 J."
  },
  {
    "disciplina": "Física - Cinemática",
    "enunciado": "Um trem desloca-se em linha reta com velocidade constante de 90 km/h. Quanto tempo, em segundos, ele gasta para percorrer 500 m?",
    "alternativas": [
      "10 s",
      "15 s",
      "20 s",
      "25 s",
      "45 s"
    ],
    "correta": 2,
    "comentario": "Convertendo a velocidade para m/s: 90 km/h ÷ 3,6 = 25 m/s. No movimento uniforme, v = Δs / Δt, logo Δt = 500 m ÷ 25 m/s = 20 s. É fundamental converter as unidades antes de calcular; usar 90 como se fosse m/s levaria a resultados muito menores."
  },
  {
    "disciplina": "Física - Termologia (calorimetria)",
    "enunciado": "Em um calorímetro, 200 g de água a 20 °C recebem 8 400 cal de calor. Qual a temperatura final da água, em °C? Dado: calor específico da água = 1 cal/(g · °C).",
    "alternativas": [
      "21 °C",
      "42 °C",
      "44 °C",
      "62 °C",
      "22 °C"
    ],
    "correta": 3,
    "comentario": "Usando Q = m · c · ΔT: 8 400 = 200 × 1 × ΔT, logo ΔT = 8 400 / 200 = 42 °C. Como a água parte de 20 °C, a temperatura final é 20 + 42 = 62 °C. O valor 42 °C é a variação de temperatura, não a temperatura final."
  },
  {
    "disciplina": "Física - Ondulatória",
    "enunciado": "Uma onda sonora propaga-se no ar com velocidade de 340 m/s e frequência de 170 Hz. Qual o comprimento de onda, em metros?",
    "alternativas": [
      "0,2 m",
      "1 m",
      "17 m",
      "0,5 m",
      "2 m"
    ],
    "correta": 4,
    "comentario": "A equação fundamental da ondulatória é v = f · λ, portanto λ = v / f = 340 / 170 = 2 m. A opção 0,5 m resulta da divisão invertida (f/v). Mantendo as unidades: (m/s) ÷ (1/s) = m, confirmando que o resultado sai em metros."
  },
  {
    "disciplina": "Física - Óptica (espelho plano)",
    "enunciado": "Um objeto de 3 cm de altura é colocado a 20 cm de um espelho plano. Quais as características da imagem formada?",
    "alternativas": [
      "virtual, direita, do mesmo tamanho (3 cm) e situada a 20 cm atrás do espelho",
      "virtual, invertida e de 3 cm de altura",
      "real, invertida e de 3 cm de altura",
      "real, invertida e de 6 cm de altura",
      "real, direita e de 6 cm de altura"
    ],
    "correta": 0,
    "comentario": "No espelho plano, a imagem é sempre virtual (formada pelo prolongamento dos raios refletidos), direita, do mesmo tamanho do objeto e simétrica em relação ao plano do espelho. Assim, ela mede 3 cm e fica a 20 cm atrás do espelho. Não há inversão nem mudança de tamanho, independentemente da distância do objeto."
  },
  {
    "disciplina": "Física - Eletricidade (Lei de Ohm)",
    "enunciado": "Um resistor ôhmico de 220 Ω é ligado a uma tensão de 110 V. Qual a corrente elétrica que percorre o resistor?",
    "alternativas": [
      "24,2 A",
      "0,5 A",
      "5 A",
      "2 A",
      "0,05 A"
    ],
    "correta": 1,
    "comentario": "Pela 1ª lei de Ohm, U = R · i, logo i = U / R = 110 / 220 = 0,5 A. A opção 2 A decorre da divisão invertida (R/U); 5 A resultaria de dividir por 22 Ω; o valor 24,2 só se obtém multiplicando U por R e dividindo por mil (110 × 220 / 1 000 = 24,2), operação que não tem sentido dimensional."
  },
  {
    "disciplina": "Física - Hidrostática",
    "enunciado": "Um mergulhador encontra-se a 10 m de profundidade em um lago. Qual a pressão total suportada por ele, em pascals? Dados: densidade da água = 1 000 kg/m³, g = 10 m/s², pressão atmosférica = 1,0 × 10⁵ Pa.",
    "alternativas": [
      "1,1 × 10⁵ Pa",
      "2,1 × 10⁶ Pa",
      "2,0 × 10⁵ Pa",
      "1,0 × 10⁵ Pa",
      "1,5 × 10⁵ Pa"
    ],
    "correta": 2,
    "comentario": "Pelo teorema de Stevin, a pressão hidrostática é p_h = ρ · g · h = 1 000 × 10 × 10 = 1,0 × 10⁵ Pa. A pressão total é a soma com a pressão atmosférica: p = 1,0 × 10⁵ + 1,0 × 10⁵ = 2,0 × 10⁵ Pa. A opção 1,0 × 10⁵ Pa considera apenas a atmosfera, esquecendo a coluna de água."
  },
  {
    "disciplina": "Física - Empuxo (Arquimedes)",
    "enunciado": "Um bloco maciço de volume 0,002 m³ encontra-se totalmente submerso em água de densidade 1 000 kg/m³. Qual o módulo do empuxo sobre o bloco, em newtons? Use g = 10 m/s².",
    "alternativas": [
      "0,2 N",
      "20 000 N",
      "200 N",
      "20 N",
      "2 N"
    ],
    "correta": 3,
    "comentario": "Pelo princípio de Arquimedes, E = ρ_líquido · V_submerso · g = 1 000 × 0,002 × 10 = 20 N. A opção 2 N resulta de usar volume 0,0002 m³; 200 N resultaria de usar volume 0,02 m³, isto é, confusão com a ordem de grandeza do volume submerso."
  },
  {
    "disciplina": "Física - Dinâmica (peso)",
    "enunciado": "Um astronauta de massa 72 kg está na superfície da Lua, onde a aceleração da gravidade é aproximadamente 1,6 m/s². Qual o peso do astronauta na Lua?",
    "alternativas": [
      "45 N",
      "11,5 N",
      "115,2 kg",
      "720 N",
      "115,2 N"
    ],
    "correta": 4,
    "comentario": "Peso é a força gravitacional P = m · g. Na Lua: P = 72 × 1,6 = 115,2 N. A massa continua sendo 72 kg em qualquer lugar, por isso a opção em quilogramas confunde massa com peso. O valor 720 N corresponderia ao peso do mesmo astronauta na Terra, onde g ≈ 10 m/s²."
  },
  {
    "disciplina": "Física - Cinemática (MRUV)",
    "enunciado": "Um veículo parte do repouso e acelera uniformemente à razão de 2 m/s². Qual a distância percorrida nos primeiros 5 segundos?",
    "alternativas": [
      "25 m",
      "2,5 m",
      "50 m",
      "10 m",
      "5 m"
    ],
    "correta": 0,
    "comentario": "No MRUV, Δs = v₀ · t + a · t² / 2 = 0 + 2 × 5² / 2 = 2 × 25 / 2 = 25 m. A opção 50 m decorre de omitir a divisão por 2 (a · t²); 10 m resulta de multiplicar a aceleração pelo tempo, que daria a velocidade final (10 m/s), e não a distância."
  },
  {
    "disciplina": "Física - Termologia (gases ideais)",
    "enunciado": "Certo gás ideal está contido em um recipiente fechado e rígido. Ao variar sua temperatura absoluta de 300 K para 600 K, mantendo o volume constante, o que ocorre com a pressão do gás?",
    "alternativas": [
      "quadruplica",
      "dobra",
      "permanece constante, pois o volume não muda",
      "reduz-se à metade",
      "aumenta seis vezes"
    ],
    "correta": 1,
    "comentario": "Pela lei geral dos gases perfeitos, a volume constante, p/T é constante, logo p₂ = p₁ · T₂ / T₁ = p₁ · 600 / 300 = 2 · p₁, ou seja, a pressão dobra. Fisicamente, o aumento da temperatura eleva a agitação molecular e a frequência das colisões com as paredes. A temperatura absoluta deve estar sempre em kelvin."
  },
  {
    "disciplina": "Física - Ondulatória (efeito Doppler)",
    "enunciado": "Uma ambulância com a sirene ligada aproxima-se de um observador parado na calçada, em um dia sem vento. Em relação ao som emitido pela sirene, o som percebido pelo observador apresenta:",
    "alternativas": [
      "menor frequência, pois a fonte está em movimento",
      "mesma frequência e menor comprimento de onda",
      "maior frequência e menor comprimento de onda",
      "mesma frequência e mesma velocidade, com som mais agudo por ilusão auditiva",
      "maior velocidade de propagação e maior frequência"
    ],
    "correta": 2,
    "comentario": "No efeito Doppler, a fonte que se aproxima comprime as frentes de onda na direção do movimento, reduzindo o comprimento de onda λ. Como v = f · λ e a velocidade do som no ar não se altera, a redução de λ implica aumento da frequência f, tornando o som mais agudo para o observador."
  },
  {
    "disciplina": "Física - Trabalho e energia (potência)",
    "enunciado": "Um guincho eleva um bloco de 100 kg a 3 m de altura, com velocidade constante, em 6 s. Qual a potência média desenvolvida? Use g = 10 m/s².",
    "alternativas": [
      "50 W",
      "1 800 W",
      "3 000 W",
      "500 W",
      "300 W"
    ],
    "correta": 3,
    "comentario": "Como o movimento é uniforme, a força aplicada equilibra o peso: F = m · g = 100 × 10 = 1 000 N. O trabalho é W = F · d = 1 000 × 3 = 3 000 J. A potência média é P = W / Δt = 3 000 / 6 = 500 W. A opção 3 000 W confunde trabalho com potência; 300 W esqueceria a altura."
  },
  {
    "disciplina": "Física - Eletricidade (potência elétrica)",
    "enunciado": "Um chuveiro elétrico opera com tensão de 220 V, sendo percorrido por uma corrente de 20 A. Qual a potência dissipada, em kW, e a energia consumida, em kWh, durante 15 minutos de uso?",
    "alternativas": [
      "0,44 kW e 1,1 kWh",
      "2,2 kW e 0,55 kWh",
      "4,4 kW e 0,11 kWh",
      "11 kW e 2,75 kWh",
      "4,4 kW e 1,1 kWh"
    ],
    "correta": 4,
    "comentario": "A potência é P = U · i = 220 × 20 = 4 400 W = 4,4 kW. Quinze minutos correspondem a 0,25 h, logo a energia é E = P · Δt = 4,4 × 0,25 = 1,1 kWh. Atenção à conversão de minutos para horas: 15 min = 0,25 h, e não 25 h."
  },
  {
    "disciplina": "Química - Modelos atômicos",
    "enunciado": "No modelo de Bohr, os elétrons só podem ocupar órbitas com energias definidas, ou seja, níveis quantizados de energia. Quando um elétron passa de um nível de maior energia (n maior) para um de menor energia (n menor):",
    "alternativas": [
      "emite um fóton com energia bem definida, aparecendo como linha no espectro",
      "emite energia térmica contínua, sem formação de espectro",
      "absorve um próton, alterando o número atômico do átomo",
      "emite um nêutron e sua massa atômica diminui",
      "absorve um fóton com energia contínua, podendo assumir qualquer valor"
    ],
    "correta": 0,
    "comentario": "A quantização da energia faz com que a diferença entre dois níveis seja um valor fixo: ΔE = E_final - E_inicial. Como o elétron vai para um nível mais interno, ΔE é negativo e a energia é liberada na forma de um fóton, com frequência f = |ΔE| / h. Cada transição possível gera uma linha no espectro de emissão, o que explica os espectros atômicos serem descontínuos."
  },
  {
    "disciplina": "Química - Ligações químicas",
    "enunciado": "A combinação de um átomo de sódio (Z = 11) com um átomo de cloro (Z = 17) forma o cloreto de sódio, NaCl, substância essencial ao organismo humano. Sobre o composto formado, é correto afirmar que:",
    "alternativas": [
      "apresenta ligações covalentes simples, com compartilhamento de um par de elétrons",
      "apresenta ligação iônica, resultante da transferência de um elétron do sódio para o cloro, formando os íons Na⁺ e Cl⁻",
      "apresenta ligação covalente dativa, em que o cloro doa um par de elétrons ao sódio",
      "apresenta ligações de hidrogênio entre os átomos de sódio e cloro",
      "apresenta ligação metálica, com elétrons livres percorrendo o retículo cristalino"
    ],
    "correta": 1,
    "comentario": "O sódio tem 1 elétron na camada de valência e o cloro, 7. O sódio tende a doar seu elétron, formando Na⁺, com configuração estável do neônio, e o cloro a recebê-lo, formando Cl⁻, com configuração do argônio. A atração eletrostática entre os íons é a ligação iônica. Ligam-se metal com não metal formando, em geral, compostos iônicos, e não covalentes ou metálicos."
  },
  {
    "disciplina": "Química - Soluções (concentração)",
    "enunciado": "Uma solução foi preparada dissolvendo-se 20 g de hidróxido de sódio, NaOH, em água suficiente para completar 500 mL de solução. Qual a concentração comum dessa solução, em g/L?",
    "alternativas": [
      "20 g/L",
      "10 g/L",
      "40 g/L",
      "80 g/L",
      "4 g/L"
    ],
    "correta": 2,
    "comentario": "Concentração comum: C = m₁ / V. O volume é 500 mL = 0,5 L, logo C = 20 g / 0,5 L = 40 g/L. A opção 4 g/L resultaria de usar 5 L no denominador (20 g / 5 L); a opção 20 g/L não decorre de deixar de converter o volume, pois 20 g / 500 mL daria 0,04 g/mL, equivalente a 40 g/L."
  },
  {
    "disciplina": "Química - Estequiometria",
    "enunciado": "A síntese da amônia, processo Haber-Bosch, é representada por N₂ + 3 H₂ → 2 NH₃. Utilizando 28 g de N₂ com excesso de H₂, qual a massa de amônia obtida? Dados: massas molares N₂ = 28 g/mol e NH₃ = 17 g/mol.",
    "alternativas": [
      "28 g",
      "17 g",
      "51 g",
      "34 g",
      "68 g"
    ],
    "correta": 3,
    "comentario": "Pela equação balanceada, 1 mol de N₂ produz 2 mols de NH₃. Como 28 g correspondem a 1 mol de N₂, obtêm-se 2 mols de NH₃, o que dá 2 × 17 = 34 g. A opção 17 g corresponderia a apenas 1 mol de NH₃, como se a relação fosse 1:1, e a opção 68 g resultaria de considerar 2 mols de N₂ nos 28 g (usando 14 g/mol como massa molar do N₂), em vez de 1 mol."
  },
  {
    "disciplina": "Química - Balanceamento de equações",
    "enunciado": "Quais coeficientes balanceiam corretamente a equação de combustão completa do etanol: C₂H₆O + O₂ → CO₂ + H₂O?",
    "alternativas": [
      "1, 3, 3, 3",
      "2, 5, 2, 6",
      "2, 7, 4, 6",
      "1, 2, 2, 3",
      "1, 3, 2, 3"
    ],
    "correta": 4,
    "comentario": "Balanceando, obtém-se 1 C₂H₆O + 3 O₂ → 2 CO₂ + 3 H₂O. Verificação: carbono 2 = 2; hidrogênio 6 = 6; oxigênio, 1 + 3 × 2 = 7 no lado dos reagentes e 2 × 2 + 3 = 7 no lado dos produtos. A sequência 1, 2, 2, 3, por exemplo, fecharia o carbono, mas deixaria o oxigênio desbalanceado (5 contra 7)."
  },
  {
    "disciplina": "Química - Termoquímica",
    "enunciado": "Na queima de 1 mol de um determinado combustível, são liberados 5 700 kJ de energia para o ambiente. Escrevendo-se a equação termoquímica dessa reação com o combustível como reagente, a variação de entalpia (ΔH) é:",
    "alternativas": [
      "-5 700 kJ",
      "+5 700 kJ",
      "-2 850 kJ",
      "+2 850 kJ",
      "0 kJ, pois a massa se conserva na reação"
    ],
    "correta": 0,
    "comentario": "Por convenção, a energia liberada em uma reação exotérmica tem sinal negativo: ΔH = H_produtos - H_reagentes < 0. Como a queima de 1 mol libera 5 700 kJ, escreve-se ΔH = -5 700 kJ por mol de combustível. O valor de ΔH deve ser sempre acompanhado da equação química e dos estados físicos das substâncias."
  },
  {
    "disciplina": "Química - Chuva ácida",
    "enunciado": "O pH da chuva em equilíbrio com o CO₂ atmosférico é cerca de 5,6. Em regiões industriais, óxidos como SO₂ e NO₂ reagem com a água formando ácidos, e o pH da chuva pode cair para 4,5. Comparada à chuva normal, a chuva de pH 4,5 apresenta:",
    "alternativas": [
      "caráter básico, com predomínio de íons OH⁻",
      "concentração de íons H⁺ cerca de dez vezes maior",
      "concentração de íons H⁺ cem vezes menor",
      "concentração de íons H⁺ igual, apenas com mais sais dissolvidos",
      "concentração de íons H⁺ dez vezes menor"
    ],
    "correta": 1,
    "comentario": "A escala de pH é logarítmica: pH = -log[H⁺], portanto cada unidade de redução no pH corresponde a dez vezes mais íons H⁺. A queda de 5,6 para 4,5 representa aproximadamente uma unidade, logo a acidez fica cerca de dez vezes maior. Óxidos ácidos, como SO₂ e NO₂, formam H₂SO₃, H₂SO₄ e HNO₃, principais responsáveis pela chuva ácida."
  },
  {
    "disciplina": "Química - Isomeria",
    "enunciado": "O butan-1-ol, de fórmula CH₃CH₂CH₂CH₂OH, e o éter dietílico, de fórmula CH₃CH₂OCH₂CH₃, possuem a mesma fórmula molecular C₄H₁₀O, mas pertencem a funções orgânicas diferentes. Esse tipo de isomeria é denominado:",
    "alternativas": [
      "isomeria geométrica (cis-trans)",
      "isomeria de cadeia",
      "isomeria de função",
      "isomeria de posição",
      "isomeria óptica"
    ],
    "correta": 2,
    "comentario": "Quando os isômeros pertencem a funções químicas distintas, fala-se em isomeria de função. A isomeria de cadeia envolve estruturas diferentes de cadeia carbônica, como butano e metilpropano; a de posição varia a localização de um grupo funcional ou de uma insaturação; a geométrica exige dupla ligação entre carbonos diferentes; e a óptica exige carbono assimétrico, ou quiral."
  },
  {
    "disciplina": "Química - Funções orgânicas",
    "enunciado": "Qual das substâncias abaixo pertence à função cetona?",
    "alternativas": [
      "CH₃–CHO (etanal)",
      "CH₃–CH₂–OH (etanol)",
      "CH₃–COOH (ácido etanoico)",
      "CH₃–CO–CH₃ (acetona)",
      "CH₃–O–CH₃ (dimetil-éter)"
    ],
    "correta": 3,
    "comentario": "A cetona apresenta o grupo carbonila (C=O) ligado a dois átomos de carbono, com fórmula geral R–CO–R'. A acetona, CH₃COCH₃, é a cetona mais simples. O etanol é um álcool; o etanal, um aldeído, em que a carbonila liga-se a um hidrogênio; o dimetil-éter é um éter; e o ácido etanoico, um ácido carboxílico."
  },
  {
    "disciplina": "Química - Combustão",
    "enunciado": "A combustão completa do metano ocorre segundo a equação CH₄ + 2 O₂ → CO₂ + 2 H₂O. Qual o volume de CO₂ liberado, nas CNTP, na queima de 32 g de CH₄, com excesso de O₂? Dados: massa molar do CH₄ = 16 g/mol e volume molar nas CNTP = 22,4 L/mol.",
    "alternativas": [
      "67,2 L",
      "11,2 L",
      "22,4 L",
      "22,4 g",
      "44,8 L"
    ],
    "correta": 4,
    "comentario": "32 g de CH₄ correspondem a 2 mols. Pela equação, 1 mol de CH₄ produz 1 mol de CO₂, logo obtêm-se 2 mols de CO₂, que ocupam 2 × 22,4 = 44,8 L nas CNTP. A opção 11,2 L corresponderia a meio mol, e a opção em gramas confunde grandeza de massa com volume."
  },
  {
    "disciplina": "Química - Sabão (saponificação)",
    "enunciado": "A fabricação de sabão é feita pela reação de um óleo vegetal (triacilglicerol) com uma base forte, como NaOH ou KOH, processo denominado saponificação. Os produtos dessa reação são:",
    "alternativas": [
      "sal de ácido graxo (sabão) e glicerol",
      "gás carbônico e água",
      "um polímero de adição e gás hidrogênio",
      "ácido graxo e água, sem formação de sal",
      "detergente sintético e sulfato de sódio"
    ],
    "correta": 0,
    "comentario": "A saponificação é a hidrólise alcalina de ésteres: o triacilglicerol reage com a base, liberando glicerol e sais de ácidos graxos de cadeia longa, que são os sabões. Com NaOH obtém-se sabão duro, como o estearato de sódio, e com KOH, sabão mole. Detergentes sintéticos não são produzidos por saponificação."
  },
  {
    "disciplina": "Química - Modelos atômicos (isótopos)",
    "enunciado": "O hidrogênio natural apresenta três formas isotópicas: o prótio (¹H), o deutério (²H) e o trítio (³H). Sobre esses átomos, é correto afirmar que:",
    "alternativas": [
      "pertencem a elementos diferentes, pois suas massas são distintas",
      "possuem o mesmo número de prótons e de elétrons, diferindo no número de nêutrons",
      "possuem o mesmo número de elétrons, o que os torna íons isoeletrônicos",
      "possuem números atômicos distintos, o que muda suas propriedades químicas",
      "possuem o mesmo número de nêutrons, diferindo no número de prótons"
    ],
    "correta": 1,
    "comentario": "Isótopos são átomos do mesmo elemento, com mesmo número atômico Z, portanto mesmo número de prótons e de elétrons, mas com números de massa A diferentes, isto é, quantidades distintas de nêutrons. O prótio não tem nêutrons, o deutério tem 1 e o trítio tem 2. Suas propriedades químicas são praticamente iguais, pois dependem dos elétrons."
  },
  {
    "disciplina": "Química - Soluções (diluição)",
    "enunciado": "Um laboratório dispõe de 200 mL de uma solução de HCl 6,0 mol/L. Adicionando-se apenas água, qual o volume final de solução 2,0 mol/L que poderá ser obtido?",
    "alternativas": [
      "400 mL",
      "66,7 mL",
      "600 mL",
      "100 mL",
      "1 200 mL"
    ],
    "correta": 2,
    "comentario": "Na diluição, o número de mols de soluto permanece constante: M₁ · V₁ = M₂ · V₂. Logo V₂ = 6,0 × 0,2 / 2,0 = 0,6 L = 600 mL. Atenção: o volume de água adicionada é 600 - 200 = 400 mL, por isso a opção 400 mL confunde volume de solvente acrescentado com volume final da solução."
  },
  {
    "disciplina": "Química - Estequiometria (pureza)",
    "enunciado": "A decomposição térmica do calcário segue a equação CaCO₃ → CaO + CO₂. Partindo de 250 g de calcário com 80% de pureza em CaCO₃ e admitindo rendimento de 100%, qual a massa de cal virgem (CaO) obtida? Dados: massas molares CaCO₃ = 100 g/mol e CaO = 56 g/mol.",
    "alternativas": [
      "140 g",
      "224 g",
      "56 g",
      "112 g",
      "280 g"
    ],
    "correta": 3,
    "comentario": "Massa de CaCO₃ puro: 250 × 0,80 = 200 g, o que corresponde a 2 mols. Pela equação, 1 mol de CaCO₃ gera 1 mol de CaO, logo obtêm-se 2 mols de CaO = 2 × 56 = 112 g. A opção 140 g ignoraria a pureza, tratando os 250 g como se fossem 100% de CaCO₃ (2,5 mols → 2,5 × 56 = 140 g de CaO); a opção 280 g não resulta de nenhum cálculo coerente com os dados."
  },
  {
    "disciplina": "Química - Termoquímica (processos endotérmicos)",
    "enunciado": "Em uma reação endotérmica, verifica-se que:",
    "alternativas": [
      "reagentes e produtos estão no mesmo patamar energético, com ΔH = 0",
      "o sistema absorve calor do ambiente, o que reduz a entropia a zero",
      "a reação ocorre sem necessidade de energia de ativação",
      "os produtos têm energia menor que a dos reagentes e ΔH é negativo, com liberação de calor",
      "os produtos têm energia maior que a dos reagentes e ΔH é positivo, com absorção de calor"
    ],
    "correta": 4,
    "comentario": "Em processos endotérmicos, a entalpia dos produtos é maior que a dos reagentes: ΔH = H_produtos - H_reagentes > 0, e há absorção de calor pelo sistema. Toda reação, porém, inclusive as endotérmicas, requer energia de ativação para se iniciar. Nos processos exotérmicos, ocorre o oposto: ΔH < 0 com liberação de calor."
  },
  {
    "disciplina": "Matemática - Logaritmo",
    "enunciado": "O nível de intensidade sonora β, em decibéis, é definido por β = 10 · log(I / I₀), em que I₀ = 10⁻¹² W/m². Para uma fonte cuja intensidade I é 100 vezes I₀, o valor de β é:",
    "alternativas": [
      "20 dB",
      "40 dB",
      "10 dB",
      "100 dB",
      "2 dB"
    ],
    "correta": 0,
    "comentario": "Se I = 100 · I₀, então I / I₀ = 100 = 10², e log(100) = 2. Logo β = 10 × 2 = 20 dB. A opção 100 dB confunde a razão I/I₀ com o valor de β; 10 dB resultaria de usar I/I₀ = 10, cujo logaritmo é 1; e 40 dB, de aplicar a fórmula da pressão, β = 20 · log(I/I₀), em vez da fórmula da intensidade."
  },
  {
    "disciplina": "Matemática - Análise combinatória",
    "enunciado": "Usando apenas os algarismos 1, 2, 3, 4 e 5, sem repetição, quantos números diferentes de três algarismos podem ser formados?",
    "alternativas": [
      "125",
      "60",
      "243",
      "20",
      "10"
    ],
    "correta": 1,
    "comentario": "Como a ordem importa (123 é diferente de 321) e não há repetição, trata-se de um arranjo de 5 elementos tomados 3 a 3: A₅,₃ = 5! / (5-3)! = 5 × 4 × 3 = 60. A opção 125 seria 5³, valor obtido se a repetição fosse permitida, e 10 seria a combinação C₅,₃, que ignora a ordem dos algarismos."
  },
  {
    "disciplina": "Matemática - Progressão aritmética",
    "enunciado": "Uma progressão aritmética tem primeiro termo a₁ = 5 e razão r = 3. Qual é o valor do décimo termo?",
    "alternativas": [
      "50",
      "29",
      "32",
      "35",
      "30"
    ],
    "correta": 2,
    "comentario": "A fórmula do termo geral é aₙ = a₁ + (n - 1) · r, logo a₁₀ = 5 + 9 × 3 = 5 + 27 = 32. A opção 35 decorre de usar n em vez de n - 1 (5 + 30), e 50 resultaria de multiplicar 5 × 10, confundindo a estrutura da PA."
  },
  {
    "disciplina": "Matemática - Progressão geométrica",
    "enunciado": "Em uma progressão geométrica de termos positivos, o primeiro termo é a₁ = 3 e a razão é q = 2. Qual é o valor do sétimo termo?",
    "alternativas": [
      "384",
      "128",
      "96",
      "192",
      "21"
    ],
    "correta": 3,
    "comentario": "Na PG, aₙ = a₁ · q elevado a (n − 1), logo a₇ = 3 × 2⁶ = 3 × 64 = 192. A opção 96 resulta de usar o expoente 5, confundindo o índice; 384 vem do expoente 7, típico de quem usa n em vez de n - 1 na fórmula."
  },
  {
    "disciplina": "Matemática - Matrizes",
    "enunciado": "A matriz A tem primeira linha (2, 1) e segunda linha (0, 3), enquanto a matriz B tem primeira linha (1, 4) e segunda linha (2, 0). Qual é a matriz A + B?",
    "alternativas": [
      "primeira linha (1, 5) e segunda linha (2, 3)",
      "primeira linha (2, 4) e segunda linha (0, 0)",
      "primeira linha (3, 4) e segunda linha (2, 0)",
      "primeira linha (3, 5) e segunda linha (0, 3)",
      "primeira linha (3, 5) e segunda linha (2, 3)"
    ],
    "correta": 4,
    "comentario": "Na soma de matrizes, somam-se os elementos de mesma posição: 2 + 1 = 3 e 1 + 4 = 5 na primeira linha; 0 + 2 = 2 e 3 + 0 = 3 na segunda linha. A matriz (3, 4; 2, 0) erra o segundo elemento da primeira linha; (2, 4; 0, 0) corresponde ao produto elemento a elemento de A por B; e a diferença A - B daria (1, −3; −2, 3)."
  },
  {
    "disciplina": "Matemática - Trigonometria",
    "enunciado": "Num triângulo retângulo, o cateto oposto ao ângulo agudo α mede 12 cm, a hipotenusa mede 13 cm e o cateto adjacente a α mede 5 cm. Quanto vale sen α?",
    "alternativas": [
      "12/13",
      "5/12",
      "13/12",
      "5/13",
      "12/5"
    ],
    "correta": 0,
    "comentario": "Por definição, sen α = cateto oposto / hipotenusa = 12 / 13. A razão 5/13 é o cosseno de α, e 12/5 é a tangente. O triângulo de lados 5, 12 e 13 é um clássico terno pitagórico: 5² + 12² = 25 + 144 = 169 = 13²."
  },
  {
    "disciplina": "Matemática - Geometria espacial",
    "enunciado": "Um reservatório cilíndrico reto tem raio da base igual a 2 m e altura igual a 1,5 m. Qual seu volume, em m³, quando está totalmente cheio? Use π = 3.",
    "alternativas": [
      "9 m³",
      "18 m³",
      "6 m³",
      "24 m³",
      "12 m³"
    ],
    "correta": 1,
    "comentario": "O volume do cilindro é V = π · r² · h = 3 × (2)² × 1,5 = 3 × 4 × 1,5 = 18 m³. A opção 6 m³ resultaria de esquecer o π, usando apenas r² · h = 4 × 1,5, e 9 m³ de usar r em vez de r²: 3 × 2 × 1,5 = 9."
  },
  {
    "disciplina": "Matemática - Função do 2º grau",
    "enunciado": "Considerando a função f(x) = x² - 6x + 5, quais são os valores de x que anulam a função?",
    "alternativas": [
      "2 e 3",
      "-1 e 5",
      "1 e 5",
      "0 e 6",
      "-1 e -5"
    ],
    "correta": 2,
    "comentario": "Fazendo x² - 6x + 5 = 0, tem-se Δ = 36 - 20 = 16, logo x = (6 ± 4) / 2, ou seja, x = 1 e x = 5. Conferindo pelas relações de Girard: soma das raízes S = -b/a = 6 e produto P = c/a = 5, ambos satisfeitos por 1 e 5."
  },
  {
    "disciplina": "Matemática - Juros simples",
    "enunciado": "Um capital de R$ 2.000,00 é aplicado a juros simples, à taxa de 3% ao mês, durante 5 meses. Qual o montante ao final do período?",
    "alternativas": [
      "R$ 2 150,00",
      "R$ 2 600,00",
      "R$ 3 000,00",
      "R$ 2 300,00",
      "R$ 2 060,00"
    ],
    "correta": 3,
    "comentario": "Nos juros simples, J = C · i · t = 2 000 × 0,03 × 5 = R$ 300,00, e o montante é M = C + J = 2 300,00. A opção R$ 2 060,00 considera apenas 1 mês de juros, e R$ 3 000,00 usaria taxa de 10% ao mês. Nos juros simples os juros incidem sempre sobre o capital inicial."
  },
  {
    "disciplina": "Matemática - Porcentagem",
    "enunciado": "Após um reajuste de 20%, o preço de um eletrodoméstico passou a ser R$ 120,00. Qual era o preço antes do reajuste?",
    "alternativas": [
      "R$ 90,00",
      "R$ 144,00",
      "R$ 108,00",
      "R$ 96,00",
      "R$ 100,00"
    ],
    "correta": 4,
    "comentario": "O preço final corresponde a 120% do original, isto é, 1,2 · x = 120, logo x = 120 / 1,2 = R$ 100,00. A opção R$ 96,00, obtida por 120 × 0,8, é o erro clássico de aplicar o desconto sobre o valor já reajustado; R$ 144,00 seria o preço após um novo aumento de 20%."
  },
  {
    "disciplina": "Matemática - Estatística",
    "enunciado": "As notas de cinco alunos em uma prova foram 4,0, 6,0, 7,0, 8,0 e 10,0. Qual a média aritmética dessas notas?",
    "alternativas": [
      "7,0",
      "7,5",
      "35,0",
      "6,0",
      "8,0"
    ],
    "correta": 0,
    "comentario": "A média é a soma dos valores dividida pela quantidade de valores: (4 + 6 + 7 + 8 + 10) / 5 = 35 / 5 = 7,0. O valor 35,0 é a soma das notas, e não a média. Como a quantidade de dados (5) é ímpar, a mediana (valor central, 7,0) coincide com a média nesse conjunto."
  },
  {
    "disciplina": "Matemática - Análise combinatória (combinação)",
    "enunciado": "De um grupo de 10 pessoas, quantas comissões diferentes de 3 pessoas podem ser formadas?",
    "alternativas": [
      "45",
      "120",
      "30",
      "210",
      "720"
    ],
    "correta": 1,
    "comentario": "Em uma comissão a ordem não importa, logo usa-se a combinação C₁₀,₃ = 10! / (3! · 7!) = (10 × 9 × 8) / (3 × 2 × 1) = 720 / 6 = 120. A opção 720 é o arranjo A₁₀,₃, que considera a ordem dos elementos; 210 corresponderia a C₁₀,₄."
  },
  {
    "disciplina": "Matemática - Progressão geométrica (soma)",
    "enunciado": "A sequência (2, 6, 18, 54, ...) é uma progressão geométrica de razão 3. Qual a soma dos quatro primeiros termos?",
    "alternativas": [
      "60",
      "78",
      "80",
      "82",
      "162"
    ],
    "correta": 2,
    "comentario": "Somando diretamente: 2 + 6 + 18 + 54 = 80. Pela fórmula da soma dos termos da PG, S₄ = a₁ (q⁴ - 1) / (q - 1) = 2 × (81 - 1) / (3 - 1) = 2 × 80 / 2 = 80. A opção 162 seria 2 × 81, confundindo a fórmula da soma com a do termo geral."
  },
  {
    "disciplina": "Matemática - Logaritmo (propriedades)",
    "enunciado": "Qual o valor da expressão log₂ 32 + log₃ (1/81)?",
    "alternativas": [
      "20",
      "9",
      "-1",
      "1",
      "-9"
    ],
    "correta": 3,
    "comentario": "Tem-se log₂ 32 = 5, pois 2⁵ = 32. Para a segunda parcela, 1/81 = 81⁻¹ = 3⁻⁴, logo log₃ (1/81) = -4. Somando: 5 + (-4) = 1. O erro comum é esquecer que o logaritmo de um número entre 0 e 1 é sempre negativo."
  },
  {
    "disciplina": "Matemática - Geometria espacial (esfera)",
    "enunciado": "Uma esfera de raio 3 cm tem volume, em cm³, igual a: (use π = 3)",
    "alternativas": [
      "54 cm³",
      "36 cm³",
      "81 cm³",
      "27 cm³",
      "108 cm³"
    ],
    "correta": 4,
    "comentario": "O volume da esfera é V = (4/3) · π · R³ = (4/3) × 3 × 27 = 4 × 27 = 108 cm³. Com π = 3, o 3 do denominador cancela o 3 de π. A opção 27 cm³ seria apenas R³, e 81 cm³ resultaria de calcular 3R³ em vez de 4R³/3."
  },
  {
    "disciplina": "História - Antiguidade Clássica (Fuvest)",
    "enunciado": "Nas cidades-Estado gregas do período clássico, e em especial na Atenas do século V a.C., as reformas de Clístenes e a atuação da Eclésia consolidaram um sistema de governo cuja principal característica era a:",
    "alternativas": [
      "participação direta dos cidadãos nas deliberações públicas, ainda que restrita a uma minoria da população.",
      "separação dos poderes em Executivo, Legislativo e Judiciário, com sufrágio universal e mandatos fixos.",
      "escolha de todas as magistraturas por sorteio, com direito de voto concedido inclusive a estrangeiros e cativos.",
      "delegação da soberania a assembleias representativas eleitas periodicamente por todos os homens livres.",
      "organização de um império territorial centralizado sob o comando de um monarca hereditário."
    ],
    "correta": 0,
    "comentario": "A democracia ateniense era direta: os cidadãos reuniam-se na Eclésia para decidir pessoalmente sobre leis, guerra e finanças. Ocorre que a cidadania abrangia apenas homens adultos nascidos em Atenas e livres, pois mulheres, estrangeiros (metecos) e escravizados estavam excluídos. A alternativa correta captura exatamente essa dupla face, isto é, participação direta e restrição social. A alternativa B é anacrônica, porque Montesquieu só formularia a tripartição de poderes no século XVIII. A alternativa C generaliza o sorteio, que valia para a maioria das magistraturas, mas não para todas, e nega o próprio conceito de cidadania restrito. A alternativa D confunde democracia direta com representação eletiva de massa, ideal moderno inexistente na Antiguidade, pois em Atenas os cidadãos decidiam pessoalmente na Eclésia. A alternativa E descreve uma monarquia territorial centralizada, modelo ausente no mundo grego clássico do período clássico."
  },
  {
    "disciplina": "História - Roma Antiga (Unicamp)",
    "enunciado": "A crise do século III no Império Romano combinou guerras civis, invasões bárbaras, inflação e desestruturação da arrecadação fiscal. A resposta política consolidada a partir de Diocleciano e Constantino caracterizou-se por:",
    "alternativas": [
      "a abolição do escravismo colonial e a concessão de cidadania ilimitada a todos os povos conquistados das fronteiras.",
      "a reorganização autoritária do Estado, com tetrarquia, divisão administrativa do Império, reformas fiscais e monetárias e crescente intervenção imperial na vida econômica.",
      "a descentralização radical do poder, entregando províncias inteiras a generais com autonomia militar e fiscal.",
      "a transferência da capital para Constantinopla como solução imediata e única para o problema das invasões germânicas.",
      "o restabelecimento pleno das instituições republicanas, com o Senado retomando o controle sobre as províncias."
    ],
    "correta": 1,
    "comentario": "Diocleciano instituiu a tetrarquia, com dois augusti e dois césares, dividiu o Império em dioceses e províncias, tentou conter a inflação pelo Edito Máximo dos Preços e burocratizou o Estado; Constantino prosseguiu nessa linha e transferiu a capital definitivamente para Constantinopla em 330. A alternativa correta sintetiza esse processo de Estado autoritário e intervencionista. A alternativa A é falsa porque não houve 'escravismo colonial' no Império Romano, a escravização persistiu e a cidadania plena já havia sido estendida a todos os habitantes livres do Império com o Édito de Caracala, em 212, por motivos fiscais. A alternativa C é falsa porque a reforma fez o oposto da descentralização: o poder foi rigorosamente hierarquizado, sem que províncias fossem entregues a generais com autonomia militar e fiscal. A alternativa D contraria a história, já que a crise do século III acelerou o fim do principado e o triunfo do dominato, e a transferência da capital, em 330, foi apenas uma parte das reformas. A alternativa E reduz a mudança de capital para Constantinopla a uma solução única e imediata, ignorando as reformas administrativas e fiscais que a acompanharam."
  },
  {
    "disciplina": "História - Idade Média (UFMG)",
    "enunciado": "No sistema feudal europeu ocidental, a relação de vassalagem organizava-se por meio de um contrato entre suserano e vassalo. Analise as afirmativas: I. O vassalo recebia um benefício, geralmente a terra (feudo), e devia ao suserano serviço militar, conselho e ajuda financeira. II. A suserania criava cadeias hierárquicas generalizadas, o que explica a fragmentação política típica da Idade Média. III. A relação era puramente econômica, sem conteúdo simbólico ou religioso, assemelhando-se a um contrato de compra e venda de terras. Está correto o que se afirma em:",
    "alternativas": [
      "II e III.",
      "I, II e III.",
      "I e II.",
      "Somente III.",
      "Somente I."
    ],
    "correta": 2,
    "comentario": "A afirmativa I é correta porque o feudo entregava a terra em senhorio e o vassalo assumia obrigações militares, consultivas e pecuniárias, resumidas na fórmula auxilium et consilium. A afirmativa II também é correta porque o mesmo homem podia ser vassalo de vários senhores e suserano de vários vassalos, formando pirâmides de lealdades que disputavam o mesmo espaço e fragmentavam a soberania. A afirmativa III é falsa, pois a cerimônia de homenagem e investidura envolvia juramento solene, símbolos materiais e bênção religiosa, e o feudo não transferia propriedade plena, apenas senhorio de exploração. Por isso o gabarito é I e II. A alternativa A é incorreta porque aceita a III, que é falsa, ainda que contenha a II, verdadeira; as alternativas B e D também aceitam a III; e a alternativa E omite a II, que é verdadeira."
  },
  {
    "disciplina": "História - Idade Média (Unicamp)",
    "enunciado": "A partir do século XI, o crescimento demográfico, a expansão agrícola e o reaquecimento do comércio no Mediterrâneo favoreceram o chamado renascimento urbano europeu. Sobre suas consequências, é correto afirmar que:",
    "alternativas": [
      "as cidades novas surgiram por concessão de antigos senhores rurais, que nelas transferiram a corte e mantiveram a hierarquia de suserania inalterada.",
      "o desenvolvimento urbano eliminou progressivamente o escravismo na Europa, substituindo inteiramente o trabalho cativo pelo assalariado nas corporações.",
      "o crescimento das cidades se deu sem qualquer tensão, uma vez que os senhores feudais abriam mão voluntariamente de seus tributos para atrair artesãos.",
      "a organização em corporações de ofício, com regras de qualidade, hierarquia entre mestres, oficiais e aprendizes, conviveu com a competição entre cidades e a busca de cartas de franquia.",
      "a burguesia comercial aderiu imediatamente à política dos reis, garantindo o fim do particularismo feudal já no século XII."
    ],
    "correta": 3,
    "comentario": "O renascimento urbano produziu as corporações, que regulavam produção, preços e formação profissional, e as cidades obtinham cartas de franquia que limitavam o poder senhorial, muitas vezes por conflito e não por doação espontânea. A alternativa correta é a única que descreve esse quadro com fidelidade. A alternativa A inverte a lógica do processo, pois quem teve seu poder cerceado foi justamente o senhor rural. A alternativa B é anacrônica, uma vez que o trabalho assalariado pleno e o fim do escravismo não caracterizam a economia urbano-medieval. A alternativa C é falsa, pois as cidades não surgiram por doação espontânea dos senhores: elas muitas vezes se formaram em oposição aos senhorios feudais e obtiveram cartas de franquia por conflito, e não por concessão voluntária. A alternativa E é falsa, pois a aliança entre burguesia e monarquia amadurece apenas na Baixa Idade Média e na Idade Moderna, e não já no século XII, quando as cidades ainda lutavam contra os particularismos feudais."
  },
  {
    "disciplina": "História - Revoluções Burguesas (Fuvest)",
    "enunciado": "Entre 1789 e 1799, a Revolução Francesa passou por fases distintas. A Convenção Montanhesa (1792-1794), controlada pelos jacobinos, enfrentou guerra externa e conspirações internas e adotou medidas radicais. Dentre elas, destaca-se:",
    "alternativas": [
      "a abolição imediata da escravidão em todas as colônias e o sufrágio universal masculino e feminino.",
      "a descentralização administrativa radical, entregando o poder militar aos departamentos e suspendendo qualquer controle estatal sobre preços.",
      "a assinatura de um acordo de paz com a Áustria e a Inglaterra, encerrando a guerra antes das execuções em massa.",
      "a devolução dos bens do clero já nacionalizados e a restauração dos privilégios feudais para conter a revolta camponesa.",
      "a criação do Tribunal Revolucionário, da Lei dos Suspeitos e do Maximum, que tabelava preços e salários, no quadro de um governo de emergência centralizado."
    ],
    "correta": 4,
    "comentario": "A Convenção jacobina instituiu o Comitê de Salvação Pública e o Tribunal Revolucionário, decretou a Lei dos Suspeitos e o Maximum, promoveu a descristianização e o recrutamento em massa. A alternativa correta reúne exatamente essas medidas. A alternativa B é o oposto do que ocorreu, já que o período foi de forte centralização e intervenção econômica. A alternativa C é falsa, pois a guerra não foi encerrada por acordo de paz com Áustria e Inglaterra: ela se intensificou até as vitórias de Fleurus, em 1794, e as execuções em massa do Terror ocorreram justamente durante o período de guerra. A alternativa D é falsa, pois a Assembleia Constituinte já havia nacionalizado os bens do clero em 1789 e nenhum privilégio feudal foi restaurado para conter a revolta camponesa. A alternativa A é falsa porque a Convenção nunca estendeu o sufrágio às mulheres, que ficaram fora da cidadania política, e porque a abolição da escravidão, decretada em 1794, foi revertida por Napoleão em 1802."
  },
  {
    "disciplina": "História - Revolução Industrial (ENEM)",
    "enunciado": "Nas primeiras décadas do século XIX, na Inglaterra, trabalhadores têxteis organizaram a destruição de máquinas e teares mecânicos em protesto contra a queda de salários e o desemprego. Sobre esse movimento, conhecido como ludismo, é correto afirmar que:",
    "alternativas": [
      "representou uma forma de resistência à mecanização, sem uma organização política capaz de propor um projeto alternativo de sociedade.",
      "coincidiu com o surgimento do cartismo, que defendia o sufrágio universal masculino e feminino já na década de 1810.",
      "teve como desfecho a proibição definitiva das máquinas a vapor nas fábricas inglesas, obtida por pressão sindical.",
      "foi liderado por socialistas utópicos, que viam na destruição dos teares um passo para a supressão do capitalismo industrial.",
      "resultou de uma aliança entre operários e industriais contra a política de tarifas alfandegárias do Estado britânico."
    ],
    "correta": 0,
    "comentario": "O ludismo, nome atribuído ao lendário Ned Ludd, foi espontâneo, localizado e basicamente reativo: quebrava máquinas, mas não formulava um projeto político coerente de transformação social. Por isso a alternativa correta é a primeira. A alternativa C é falsa, pois a repressão foi severa, com pena de morte para a destruição de máquinas em 1812, e a mecanização avançou. A alternativa E inventa uma aliança inexistente, já que os industriais sustentavam o novo maquinismo. A alternativa B confunde cronologias, porque o cartismo data dos anos 1830 e 1840, e não da década de 1810, além de excluía as mulheres. A alternativa D atribui aos ludistas uma consciência política que só surgiria com o socialismo e o sindicalismo posteriores."
  },
  {
    "disciplina": "História - Século XX (Unesp)",
    "enunciado": "Ao fim da Primeira Guerra Mundial, o Tratado de Versalhes (1919) impôs à Alemanha perdas territoriais, limitações militares, a aceitação da culpa pela guerra e o pagamento de reparações. Uma consequência política direta desse arranjo sobre a República de Weimar foi:",
    "alternativas": [
      "a consolidação de um sistema pluripartidário estável, sustentado pelo apoio franco do campo e da indústria.",
      "a fragilização da jovem república, explorada pela propaganda nacionalista que classificava o tratado como uma humilhação imposta ao povo alemão.",
      "a estabilidade imediata do regime, uma vez que as reparações foram fixadas em valores simbólicos e rapidamente quitadas.",
      "a criação da Liga das Nações com assento permanente garantido à Alemanha e à Rússia soviética.",
      "a rápida anexação da renânia e da Áustria pela Alemanha, validada pelas potências vencedoras em 1920."
    ],
    "correta": 1,
    "comentario": "A expressão diktat e o mito da punhalada pelas costas alimentaram a radicalização da direita alemã e corroeram a legitimidade de Weimar, sobretudo após a hiperinflação de 1923. Por isso a segunda alternativa é o gabarito. A primeira é falsa porque a República de Weimar foi marcada por instabilidade política crônica, e não por um pluripartidário estável sustentado pelo campo e pela indústria. A terceira é oposta ao que ocorreu, pois as reparações foram vultosas e sua renegociação pelo Plano Dawes, em 1924, mostra que a questão permaneceu aberta. A quarta é duplamente falsa, pois a Liga das Nações foi criada sem a participação dos Estados Unidos, e nem a Alemanha, admitida apenas em 1926, nem a Rússia soviética, que só ingressou em 1934, tiveram assento permanente desde o início. A quinta é falsa, pois a Renânia foi remilitarizada pelos nazistas em 1936 e a Áustria foi anexada em 1938, sem validação das potências vencedoras."
  },
  {
    "disciplina": "História - Guerra Fria e Descolonização (ENEM)",
    "enunciado": "Nas décadas de 1950 e 1960, a independência de numerosos países africanos e asiáticos ocorreu em um contexto no qual:",
    "alternativas": [
      "a ONU proibiu qualquer forma de nacionalismo nos territórios coloniais, temendo o crescimento do socialismo.",
      "as fronteiras herdadas das metrópoles mostraram-se plenamente alinhadas com as divisões étnicas locais, evitando guerras civis.",
      "o processo combinou lutas anticoloniais locais, o clima ideológico da Guerra Fria e a própria decadência dos impérios europeus após 1945.",
      "os novos Estados se alinharam automaticamente ao bloco capitalista, por imposição das antigas metrópoles europeias.",
      "a descolonização foi concluída sem conflitos armados, graças a negociações pacíficas promovidas pelos Estados Unidos."
    ],
    "correta": 2,
    "comentario": "A descolonização explica-se pela conjugação de fatores: o enfraquecimento da Europa após a Segunda Guerra, a ascensão de movimentos nacionalistas, como os da Índia, de Gana, da Argélia e do Vietnã, e o interesse das superpotências em influenciar as novas nações. A terceira alternativa é a correta. A primeira inventa uma proibição inexistente, já que a Carta da ONU consagra o direito dos povos à autodeterminação, e não proíbe o nacionalismo nos territórios coloniais. A segunda é falsa porque as fronteiras herdadas das metrópoles raramente coincidiam com as divisões étnicas locais, e geraram conflitos internos que perduram até hoje. A quarta é falsa porque muitos novos Estados aderiram ao não alinhamento, como na Conferência de Bandung, em 1955, e no Movimento dos Não Alinhados, em 1961. A quinta é falsa porque a descolonização foi marcada por guerras, como as da Argélia, da Indochina e de Angola."
  },
  {
    "disciplina": "História - Totalitarismos (Unicamp)",
    "enunciado": "O fascismo italiano e o nazismo alemão, embora compartilhem traços autoritários e nacionalistas, diferem em aspectos centrais. Uma distinção conceitual importante é:",
    "alternativas": [
      "o nazismo negava a existência de diferenças raciais, enquanto o fascismo organizava o Estado em torno de uma hierarquia racial.",
      "o nazismo surgiu antes do fascismo e serviu de modelo institucional direto para a Marcha sobre Roma de 1922.",
      "o fascismo defendia a propriedade privada dos meios de produção, ao passo que o nazismo estatizou a indústria alemã em sua totalidade.",
      "o nazismo fundava sua ideologia em um racismo biologizado e antissemita que justificava o extermínio, enquanto o fascismo italiano inicialmente se orientava por um nacionalismo autoritário e corporativista.",
      "ambos rejeitavam o culto ao líder, atribuindo o poder a colegiados burocráticos de partido único."
    ],
    "correta": 3,
    "comentario": "O ponto central é a natureza da ideologia: o nazismo tem no povo e no antissemitismo biologizado seu núcleo, com desdobramento genocida no Holocausto, enquanto o fascismo de Mussolini nasce de um nacionalismo autoritário, do culto ao Estado e do corporativismo, tendo aprovado as leis raciais apenas em 1938. A quarta alternativa é a correta. A primeira inverte os termos. A segunda inverte a cronologia, pois o fascismo italiano antecede o nazismo: Mussolini tomou o poder em 1922 e Hitler apenas em 1933. A terceira é falsa porque o nazismo conviveu com a grande propriedade privada alemã, coordenando-a pelo Estado em economia de guerra, sem estatização geral da indústria. A quinta é absurda, já que o culto ao líder, seja como Duce, seja como Führer, é definidor de ambos."
  },
  {
    "disciplina": "História - Brasil Colônia (Unesp)",
    "enunciado": "A economia colonial brasileira esteve articulada ao capitalismo comercial europeu por meio de ciclos de exportação. Sobre essa dinâmica, considere as afirmativas: I. O escravismo africano foi o regime de trabalho dominante nas plantations de cana e, depois, de café, e não um resquício do feudalismo europeu. II. A mineração do século XVIII provocou intensa migração interna e a transferência da sede do vice-reino para o Rio de Janeiro. III. A Lei de Terras de 1850 estabeleceu a proibição do tráfico de escravizados e definiu a posse de terras pela ocupação efetiva. Está correto apenas o que se afirma em:",
    "alternativas": [
      "I e III.",
      "II.",
      "II e III.",
      "I.",
      "I e II."
    ],
    "correta": 4,
    "comentario": "A afirmativa I é verdadeira, pois a escravidão moderna foi uma empresa de negócios integrada ao mercado atlântico, e não um resto de estruturas medievais. A afirmativa II também é verdadeira, já que a corrida do ouro em Minas Gerais deslocou população do litoral nordestino em direção ao Sudeste e levou à mudança da capital de Salvador para o Rio de Janeiro, em 1763. A afirmativa III é falsa e inverte o conteúdo da lei: a Lei de Terras de 1850 restringiu a aquisição de terras à compra, acabando com a posse e o regime sesmarial, e foi a Lei Eusébio de Queiroz, do mesmo ano, que proibiu o tráfico de escravizados. O gabarito é, portanto, I e II. As alternativas A (I e III) e C (II e III) aceitam a III, que é falsa; a alternativa B (somente II) omite a I, que é verdadeira; e a alternativa D (somente I) omite a II, que é verdadeira."
  },
  {
    "disciplina": "História - Brasil Império (Fuvest)",
    "enunciado": "Durante o Período Regencial (1831-1840), o Brasil enfrentou uma série de revoltas provinciais, como a Cabanagem e a Balaiada. Uma interpretação corrente do período afirma que essas revoltas:",
    "alternativas": [
      "expressaram descontentamentos locais contra a centralização política e as elites agrárias, misturando demandas sociais e conflitos regionais.",
      "demonstravam o apoio popular maciço à restauração do regime colonial português e ao fim da escravidão.",
      "resultaram da reação de setores rurais ao avanço industrial provocado pela política da Tarifa Alves Brancas.",
      "foram movimentos exclusivamente separatistas, sem qualquer articulação com as disputas políticas no Rio de Janeiro.",
      "tiveram caráter estritamente religioso, sendo lideradas por clérigos ligados à Igreja Católica."
    ],
    "correta": 0,
    "comentario": "As revoltas regenciais combinaram tensões diversas: disputa pelo poder provincial, descontentamento com uma Regência considerada distante, participação de populações pobres, escravizados e indígenas, e reivindicações muitas vezes radicais, como a proclamação de repúblicas locais na Cabanagem. A primeira alternativa é a correta. A segunda é absurda, pois os revoltosos não defendiam a restauração do regime colonial português. A terceira é anacrônica, já que a industrialização brasileira não se dá nesse período e a Tarifa Alves Brancas é de 1844, posterior às revoltas. A quarta é falsa, pois os movimentos não foram exclusivamente separatistas e guardaram relação com as disputas políticas do centro do Império. A quinta elimina a natureza política e social documentada desses levantes."
  },
  {
    "disciplina": "História - Brasil República (Unicamp)",
    "enunciado": "O Estado Novo (1937-1945) representou a fase ditatorial do getulismo. Sobre o seu arcabouço político-institucional, é correto afirmar que:",
    "alternativas": [
      "extinguiu a Justiça do Trabalho e proibiu qualquer forma de organização sindical de trabalhadores urbanos.",
      "suprimiu os partidos políticos, outorgou uma Constituição centralizadora e criou mecanismos de controle social, como o Departamento de Imprensa e Propaganda e o Departamento de Ordem Política e Social.",
      "manteve o federalismo descentralizador dos anos 1920, devolvendo às oligarquias estaduais o controle da arrecadação.",
      "transferiu a capital federal para Belo Horizonte, reforçando o projeto de interiorização do poder.",
      "restaurou o pluripartidarismo e convocou eleições livres para a Câmara e para o Senado nos anos de 1940 e 1942."
    ],
    "correta": 1,
    "comentario": "O Estado Novo implodiu a ordem constitucional de 1934: houve fechamento do Congresso, extinção dos partidos, outorga da Carta de 1937, censura exercida pelo Departamento de Imprensa e Propaganda e pelo Departamento de Ordem Política e Social, além da nomeação de interventores nos Estados. Por isso a segunda alternativa é a correta. A primeira é falsa, pois o Estado Novo não extinguiu a Justiça do Trabalho nem proibiu a organização sindical: os sindicatos foram mantidos, mas sob controle corporativo do Estado. A terceira é falsa, pois o Estado Novo concentrou o poder, nomeando interventores nos Estados e encerrando o federalismo oligárquico da República Velha. A quarta confunde o período com o governo Juscelino Kubitschek, responsável pela construção de Brasília. A quinta contraria a história, pois não houve eleições legislativas livres em 1940 e 1942 e os partidos políticos foram extintos."
  },
  {
    "disciplina": "Geografia - Geopolítica (ENEM)",
    "enunciado": "Após o fim da Guerra Fria, tornou-se corrente a ideia de uma ordem mundial multipolar. Uma leitura crítica dessa afirmação exige reconhecer que:",
    "alternativas": [
      "os conflitos militares desapareceram, substituídos por disputas comerciais resolvidas por organismos multilaterais.",
      "o poder mundial passou a ser distribuído igualmente entre dezenas de países, graças à globalização financeira.",
      "a multiplicidade de centros de poder não elimina a assimetria entre economias centrais e periféricas, nem a dependência tecnológica e financeira.",
      "as organizações supranacionais, como a ONU e a OMC, tornaram-se capazes de impor decisões de forma soberana aos Estados nacionais.",
      "a única potência global restante deixou de participar de conflitos armados e de organismos internacionais."
    ],
    "correta": 2,
    "comentario": "A multipolaridade convive com hierarquias: países desenvolvidos dominam tecnologia, fluxos de capital e instituições financeiras, enquanto as periferias seguem vulneráveis à volatilidade externa. A terceira alternativa expressa exatamente essa ressalva e é a correta. A primeira é falsa porque os conflitos militares não desapareceram após o fim da Guerra Fria, nem foram resolvidos de forma pacífica por organismos multilaterais. A segunda é falsa porque o poder mundial não se distribuiu igualmente entre dezenas de países: a globalização financeira convive com hierarquias e assimetrias entre economias centrais e periféricas. A quarta é falsa, já que organismos internacionais não detêm soberania sobre os Estados e atuam por acordo, com poderes limitados. A quinta é falsa, pois a superpotência remanescente seguiu intervindo militarmente em diversas regiões e participando dos organismos internacionais."
  },
  {
    "disciplina": "Geografia - Geopolítica (Fuvest)",
    "enunciado": "O compartilhamento das águas do rio Nilo é historicamente fonte de tensão entre Egito, Etiópia e Sudão. Do ponto de vista geopolítico, o caso ilustra o princípio de que:",
    "alternativas": [
      "a posse das águas de um rio internacional cabe integralmente ao país onde ele desagua, por razão de prioridade histórica de uso.",
      "o aquecimento global eliminou a importância estratégica dos rios no Oriente Médio e no nordeste da África.",
      "a construção de grandes obras em rios internacionais não produz impactos transfronteiriços, desde que autorizada pela ONU.",
      "o domínio de um recurso estratégico depende da localização na bacia, da capacidade técnica de obras e de arranjos diplomáticos, envolvendo risco de desequilíbrio entre os países ribeirinhos.",
      "o conflito por recursos hídricos é sempre resolvido pela guerra, pois inexistem tratados sobre bacias compartilhadas."
    ],
    "correta": 3,
    "comentario": "A barragem etíope Renascença Etíope mostra como o controle da vazão afeta os países a jusante, em especial o Egito, altamente dependente das águas do Nilo. A geopolítica dos recursos envolve posição na bacia, capacidade de engenharia e negociação internacional, e não uma regra única e simples. A quarta alternativa é a correta. A primeira é falsa porque o direito internacional das águas não reconhece prioridade absoluta do país onde o rio desagua, prevalecendo o uso razoável e não prejudicial entre os Estados ribeirinhos. A segunda é absurda, pois a escassez hídrica tende a aumentar, e não a diminuir, a importância estratégica desses rios. A terceira é falsa, pois grandes obras em rios internacionais produzem impactos transfronteiriços, existindo inúmeros tratados e vias diplomáticas para bacias compartilhadas. A quinta é falsa, pois inexistem acordos e tratados sobre bacias compartilhadas, e nem todo conflito por recursos hídricos se resolve pela guerra."
  },
  {
    "disciplina": "Geografia - Urbanização (ENEM)",
    "enunciado": "O crescimento das regiões metropolitanas brasileiras produziu uma mancha urbana contínua e interdependente, fenômeno designado por alguns especialistas como macrometrópole. Considerando as consequências socioespaciais desse processo, é correto afirmar que:",
    "alternativas": [
      "a expansão ocorreu exclusivamente por meio de planos diretores participativos, o que garantiu a oferta de habitação popular em todas as periferias.",
      "a mobilidade pendular tornou-se irrelevante, uma vez que as atividades produtivas se desconcentraram totalmente do núcleo metropolitano.",
      "as cidades vizinhas passaram a formar um único ente federado administrativamente, com governo único compartilhado.",
      "a região metropolitana deixou de apresentar segregação socioespacial, graças à homogeneização do preço do solo.",
      "a conurbação intensificou a dependência da população a longos deslocamentos diários e multiplicou os desafios de gestão do transporte, do saneamento e do uso do solo."
    ],
    "correta": 4,
    "comentario": "A conurbação cria um tecido urbano único, mas conserva divisões administrativas e profundas desigualdades: a população de baixa renda ocupou periferias distantes e depende de deslocamentos longos. Por isso a quinta alternativa é a correta. A primeira é falsa, pois a maior parte da expansão ocorreu fora dos planos diretores, com loteamentos irregulares e autoconstrução. A segunda é o oposto do que ocorreu, já que os deslocamentos pendulares aumentaram. A terceira é incorreta porque a conurbação não implica fusão administrativa: cada município preserva sua autonomia e seu próprio governo. A quarta contraria a evidência, visto que a segregação socioespacial se aprofundou, com condomínios fechados e ocupações informais nas mesmas regiões."
  },
  {
    "disciplina": "Geografia - Urbanização (Unicamp)",
    "enunciado": "Em bairros centrais de cidades como São Paulo e Rio de Janeiro, observa-se a chegada de novos moradores de maior renda, a valorização imobiliária, a mudança do comércio local e a expulsão indireta de moradores antigos. Esse processo é denominado:",
    "alternativas": [
      "gentrificação, e tende a alterar a composição social e cultural do espaço urbano.",
      "verticalização, definida pelo aumento do número de pavimentos nas edificações de baixo padrão construtivo.",
      "favelização, entendida como a ocupação de áreas centrais por moradias informais e sem infraestrutura.",
      "suburbanização, caracterizada pelo deslocamento das classes ricas para áreas periféricas das metrópoles.",
      "conurbação, isto é, a fusão das malhas urbanas de dois municípios vizinhos em uma única cidade."
    ],
    "correta": 0,
    "comentario": "O enunciado descreve a sequência típica da gentrificação: revalorização de áreas antes depreciadas, substituição do perfil de moradores e pressão sobre antigos ocupantes. A primeira alternativa é a correta. A segunda descreve outro fenômeno, o da verticalização, aumento do número de pavimentos, que pode até acompanhar a gentrificação, mas não define o processo. A terceira confunde dois processos, pois a favelização é a ocupação informal de áreas sem infraestrutura, usualmente na periferia, e não a valorização de bairros centrais por novos moradores de maior renda. A quarta é oposta, pois a suburbanização descreve o deslocamento de grupos de maior renda do centro para as bordas da metrópole, e não a chegada de maior renda aos bairros centrais. A quinta refere-se à junção física de duas malhas urbanas, sem implicar necessariamente mudança do perfil social dos moradores."
  },
  {
    "disciplina": "Geografia - Climatologia (Unesp)",
    "enunciado": "A dinâmica climática do território brasileiro é fortemente influenciada pela atuação de massas de ar tropicais e polares. Sobre essa dinâmica, analise as afirmativas: I. A Massa Equatorial Continental, de característica quente e úmida, atua sobre a Amazônia e é responsável por grande parte das chuvas na região Norte. II. A Massa Polar Atlântica provoca, no inverno, quedas bruscas de temperatura e, em certas circunstâncias, geadas nas regiões Sudeste e Sul. III. A Zona de Convergência Intertropical é o principal sistema responsável pela estação seca do sertão nordestino. Está correto o que se afirma em:",
    "alternativas": [
      "II e III.",
      "I e II.",
      "Somente III.",
      "I, II e III.",
      "Somente I."
    ],
    "correta": 1,
    "comentario": "A afirmativa I é verdadeira, pois a massa equatorial continental, quente e úmida, sustenta o regime pluviométrico amazônico. A afirmativa II também é verdadeira, já que as incursões da massa polar atlântica, sobretudo quando ocorrem com céu claro e ventos fracos, favorecem geadas em junho e julho no Sudeste. A afirmativa III é falsa porque a Zona de Convergência Intertropical está ligada às chuvas, e a seca no sertão decorre de fatores como a subsidência do ar e a atuação da massa tropical atlântica, que impede o alcance da zona de convergência na estação seca. Logo, o gabarito é I e II. As alternativas que incluem a III estão incorretas, e a opção que cita apenas I é incompleta."
  },
  {
    "disciplina": "Geografia - Climatologia (ENEM)",
    "enunciado": "Medições em grandes cidades mostram que o centro urbano costuma registrar temperaturas mais elevadas que as áreas rurais vizinhas, fenômeno conhecido como ilha de calor. Assinale a alternativa que explica corretamente suas principais causas:",
    "alternativas": [
      "a maior rotação atmosférica causada pela concentração de edifícios, que comprime o ar e eleva sua temperatura.",
      "a maior proximidade do mar no centro das metrópoles, que intensifica a evaporação e retém calor.",
      "a substituição da vegetação e do solo permeável por materiais escuros e impermeáveis, aliada ao calor liberado por veículos, indústrias e aparelhos de ar-condicionado.",
      "a ausência de nuvens sobre as cidades, provocada pela poluição que impede a condensação do vapor de água.",
      "a maior altitude do centro das cidades, que aproxima a superfície das camadas mais quentes da atmosfera."
    ],
    "correta": 2,
    "comentario": "A ilha de calor resulta da mudança das propriedades da superfície, com o asfalto e o concreto apresentando albedo e inércia térmica distintos, da redução da evapotranspiração e da liberação antrópica de calor. A terceira alternativa é a correta. A primeira inventa um efeito inexistente: a concentração de edifícios não aumenta a rotação atmosférica nem comprime o ar. A segunda inverte a lógica, já que corpos de água amenizam a temperatura. A quarta confunde processos, porque a poluição urbana tende a aumentar aerossóis e nevoeiro, e não a eliminar nuvens. A quinta é falsa, pois a altitude não explica o fenômeno e, em muitos casos, centros urbanos estão em cotas baixas."
  },
  {
    "disciplina": "Geografia - Relevo (Fuvest)",
    "enunciado": "A Cordilheira dos Andes resulta da interação entre as placas de Nazca e Sul-Americana. Sobre esse contexto geológico, é correto afirmar que:",
    "alternativas": [
      "os Andes foram erguidos por divergência de placas, com ascensão de magma astenosférico em um vale de rifte.",
      "a cordilheira originou-se de movimento transformante, no qual as placas deslizam lateralmente acumulando sedimentos marinhos rasos.",
      "as duas placas são convergentes oceânicas, e os Andes formaram-se por acreção de arcos de ilha em área de rifteamento.",
      "ocorre subducção da placa oceânica de Nazca sob a placa continental Sul-Americana, o que gera soerguimento da crosta, vulcanismo e intensa sismicidade.",
      "a cordilheira é resultado exclusivo do intemperismo glacial sobre um planalto preexistente, sem relação com limites de placas."
    ],
    "correta": 3,
    "comentario": "A margem oeste da América do Sul é zona de subducção: a placa de Nazca, mais densa, mergulha sob a Sul-Americana, levantando a cadeia andina e fundindo parcialmente o manto, o que alimenta vulcanismo e terremotos. A quarta alternativa é a correta. A primeira mistura conceitos, pois a placa Sul-Americana é continental e não há rifteamento na região. A segunda descreve limites transformantes, como o de Santo André, na Califórnia. A terceira descreve um rifte, ou seja, divergência, o oposto de uma zona de colisão. A quinta reduz um processo tectônico a um modelado de superfície e ainda nega o papel dos limites de placas."
  },
  {
    "disciplina": "Geografia - Relevo (Unicamp)",
    "enunciado": "Voçorocas são grandes feições erosivas lineares que avançam sobre encostas e fundos de vale, especialmente em áreas desmatadas e com solo exposto. Sobre sua dinâmica, é correto afirmar que:",
    "alternativas": [
      "são causadas unicamente por erosão eólica, que remove o solo em direção às vertentes e forma sulcos lineares.",
      "formam-se apenas em regiões áridas, pois dependem da ausência completa de cobertura vegetal para se instalar.",
      "resultam exclusivamente de atividades de mineração, sendo ausentes em áreas agrícolas e urbanas.",
      "representam o estágio inicial da erosão, anterior à formação de ravinas, e são facilmente revertidas apenas com drenagem.",
      "progridem por erosão hídrica concentrada, sendo favorecidas pela remoção da vegetação, pelo escoamento superficial e pelo manejo inadequado do solo."
    ],
    "correta": 4,
    "comentario": "Voçorocas são o estágio avançado da erosão laminar e linear: a água de escoamento superficial concentra-se em sulcos que crescem para montante. Fatores como desmatamento, sobrepastoreio, déficit de infiltração e construções mal drenadas aceleram o processo. A quinta alternativa é a correta. A primeira é falsa, pois a voçoroca resulta de erosão hídrica concentrada, e não de erosão eólica, que tem outra morfologia. A segunda é falsa, pois ocorrem com frequência em regiões tropicais úmidas com solo exposto. A terceira é absurda, pois há voçorocas urbanas e rurais em todo o país, não apenas em áreas de mineração. A quarta inverte a sequência evolutiva, já que as ravinas precedem as voçorocas."
  },
  {
    "disciplina": "Geografia - População (ENEM)",
    "enunciado": "A teoria da transição demográfica descreve a passagem de regimes de alta natalidade e mortalidade para regimes de taxas baixas. No Brasil, observa-se um estágio em que a natalidade já caiu a níveis próximos ao de reposição e a expectativa de vida segue crescendo, o que produz um fenômeno conhecido como:",
    "alternativas": [
      "bônus demográfico, período em que a proporção de população em idade ativa supera a de dependentes, com efeitos potenciais sobre a economia.",
      "explosão demográfica, caracterizada pelo descompasso entre natalidade elevada e queda da mortalidade.",
      "transposição demográfica, nome dado à migração de idosos do campo para as regiões metropolitanas.",
      "regressão populacional, situação em que a taxa de fecundidade permanece muito acima do nível de reposição.",
      "inverno demográfico, marcado pelo total esvaziamento populacional e pela ausência de jovens no mercado de trabalho."
    ],
    "correta": 0,
    "comentario": "Com a queda da fecundidade e o posterior envelhecimento, abre-se uma janela em que a razão de dependência diminui: é o bônus ou dividendo demográfico, que só gera crescimento econômico sustentado se houver emprego, educação e saúde. A primeira alternativa é a correta. A segunda descreve a segunda fase da transição, que o Brasil já ultrapassou. A terceira não é termo técnico consagrado. A quarta é inventada. A quinta contradiz a premissa de fecundidade baixa enunciada no problema."
  },
  {
    "disciplina": "Geografia - População (Unesp)",
    "enunciado": "Nas duas últimas décadas, o Brasil passou a receber fluxos migratórios internacionais antes pouco expressivos, como de haitianos, venezuelanos, senegaleses e bolivianos. Sobre essas dinâmicas, é correto afirmar que:",
    "alternativas": [
      "a migração de retorno de brasileiros superou numericamente a entrada de estrangeiros, invertendo o saldo migratório do país.",
      "os movimentos combinam causas econômicas, políticas e humanitárias, e geram desafios de inserção no mercado de trabalho e no acesso a serviços públicos.",
      "esses fluxos são homogêneos, compostos exclusivamente de refugiados reconhecidos pelo Comitê Nacional para os Refugiados, sem qualquer migrante de caráter econômico.",
      "a presença de imigrantes eliminou a emigração de brasileiros para países como Estados Unidos, Portugal e Japão.",
      "tais deslocamentos são proibidos por tratados internacionais de livre comércio assinados no âmbito do Mercosul."
    ],
    "correta": 1,
    "comentario": "Os fluxos recentes são plurais: haitianos e venezuelanos, por exemplo, chegaram por razões diversas, como crise política e humanitária, e muitos ingressaram por vistos humanitários. O desafio central é a integração socioeconômica. A segunda alternativa é a correta. A primeira é falsa, já que a emigração de brasileiros prossegue e a migração de retorno não inverteu de forma consistente o saldo migratório do país. A terceira reduz a heterogeneidade dos fluxos a uma única categoria jurídica, pois há imigrantes econômicos, estudantes e pessoas em deslocamento humanitário ao lado dos refugiados reconhecidos pelo Comitê Nacional para os Refugiados. A quarta é falsa, já que a emigração de brasileiros prossegue para países como Estados Unidos, Portugal e Japão. A quinta é absurda, pois tratados comerciais não proíbem migrações e o Mercosul facilita a livre circulação."
  },
  {
    "disciplina": "Geografia - Meio Ambiente (ENEM)",
    "enunciado": "No Brasil, o licenciamento ambiental é um instrumento da Política Nacional de Meio Ambiente, exigido para atividades potencialmente poluidoras. Do ponto de vista técnico e jurídico, é correto afirmar que:",
    "alternativas": [
      "deve ser ignorado pelos municípios, porque as competências ambientais locais foram revogadas pela Constituição de 1988.",
      "é concedido apenas pelo órgão federal, em todos os casos, uma vez que o meio ambiente é bem da União.",
      "envolve etapas como licença prévia, de instalação e de operação, além de estudos de impacto ambiental quando aplicável, e pode ser federal, estadual ou municipal.",
      "autoriza qualquer empreendimento, independentemente de impacto, desde que o requerente pague uma taxa de compensação.",
      "dispensa a participação pública e o controle social, posto que a análise é estritamente técnica e de competência exclusiva do Poder Executivo."
    ],
    "correta": 2,
    "comentario": "O licenciamento é faseado em licença prévia, de instalação e de operação, exige estudo e respectivo relatório de impacto ambiental em casos de significativo impacto e segue a competência do ente federativo responsável pelo empreendimento. Por isso a terceira alternativa é a correta. A primeira é falsa, pois a competência é comum entre União, Estados, Distrito Federal e Municípios, conforme o artigo 23 da Constituição. A segunda é falsa, pois o licenciamento pode ser federal, estadual ou municipal, conforme a competência e a abrangência do empreendimento. A quarta transforma o instrumento em mera autorização monetária, o que contraria a lógica de prevenção e controle. A quinta é falsa, pois a participação pública e o controle social são assegurados, especialmente mediante audiências públicas quando há estudo de impacto ambiental."
  },
  {
    "disciplina": "Geografia - Fontes de Energia (Fuvest)",
    "enunciado": "A matriz elétrica brasileira caracteriza-se pela predominância de fontes renováveis, especialmente a hidroeletricidade, mas vem recebendo aportes crescentes de eólica, solar e biomassa. Considerando esse cenário, uma análise adequada indica que:",
    "alternativas": [
      "a predominância hídrica elimina qualquer risco de desabastecimento, uma vez que não depende das condições climáticas.",
      "a geração distribuída e as pequenas centrais hidrelétricas não têm impacto ambiental relevante, sendo sempre aprovadas sem licenciamento.",
      "as fontes eólica e solar são inviáveis no Brasil, dado que o país não possui regiões com ventos constantes nem alta insolação.",
      "a variabilidade dos regimes de chuva, somada ao crescimento da demanda, explica a importância estratégica da diversificação com térmicas, eólica e solar.",
      "a matriz elétrica deixou de incluir fontes térmicas, tornando-se integralmente renovável desde a década de 1990."
    ],
    "correta": 3,
    "comentario": "A segurança energética exige prever anos de chuvas fracas, como aqueles que exigiram o acionamento maciço de termelétricas, e por isso a diversificação é vista como vantagem sistêmica. A quarta alternativa é a correta. A primeira é falsa, pois o risco hidrológico é real e documentado. A segunda é falsa, pois qualquer empreendimento de geração — incluindo geração distribuída e pequenas centrais hidrelétricas — passa por controle ambiental proporcional ao impacto. A terceira é falsa, pois o Nordeste brasileiro registra alguns dos melhores ventos e níveis de irradiação do mundo. A quinta é falsa, já que o gás natural continua relevante no parque térmico brasileiro."
  },
  {
    "disciplina": "Sociologia - Indústria Cultural (Unicamp)",
    "enunciado": "Theodor Adorno e Max Horkheimer, na Dialética do Esclarecimento, cunharam o conceito de indústria cultural para descrever a produção da cultura em escala industrial. Segundo os autores, esse processo tende a:",
    "alternativas": [
      "promover a libertação estética, ao separar definitivamente a arte de qualquer forma de entretenimento comercial.",
      "elevar a consciência crítica das massas ao transformar cada indivíduo em produtor autônomo de conteúdo cultural.",
      "descentralizar a produção cultural de tal modo que cada grupo social desenvolve uma linguagem artística inteiramente original.",
      "eliminar o lucro do setor cultural, substituindo a lógica de mercado pela gestão democrática das obras artísticas.",
      "transformar a cultura em mercadoria padronizada, submetendo a criação artística à lógica da repetição e do lucro e amortecendo a consciência crítica."
    ],
    "correta": 4,
    "comentario": "Para Adorno e Horkheimer, a indústria cultural não produz simples diversão: ela organiza o tempo livre, aplica critérios industriais de série à arte e gera uma pseudo-individualidade, pois cada produto parece único, mas repete a mesma fórmula. O efeito é a integração do público ao sistema. Por isso a quinta alternativa é o gabarito. A primeira atribui ao sistema um efeito emancipador oposto ao diagnosticado. A segunda é o contrário do diagnosticado: a indústria cultural amorteceria a consciência crítica em vez de elevá-la, e não transforma o público em produtor autônomo de conteúdo. A terceira contraria a tese, pois a indústria cultural concentra a produção e padroniza as linguagens, em vez de descentralizá-las. A quarta ignora que o lucro é o motor do processo: os autores identificam a fusão entre arte e comércio."
  },
  {
    "disciplina": "Sociologia - Max Weber (Fuvest)",
    "enunciado": "Max Weber distingue três tipos puros de dominação legítima: tradicional, carismática e legal-racional. A dominação legal-racional, típica do Estado moderno burocrático, fundamenta-se:",
    "alternativas": [
      "na crença na legalidade de regulamentos escritos e na obediência ao cargo ocupado, e não à pessoa que o exerce.",
      "na soberania popular direta, exercida sem mediação de aparatos administrativos permanentes.",
      "no uso exclusivo da coerção física, dispensando qualquer forma de consentimento dos dominados.",
      "na devoção afetiva e pessoal a um líder portador de qualidades extraordinárias, rompidas as regras do grupo.",
      "no costume e na hereditariedade, que tornam sagradas as ordens recebidas e os direitos históricos do soberano."
    ],
    "correta": 0,
    "comentario": "No tipo legal-racional, a obediência dirige-se ao estatuto e à competência do cargo, e não a quem o ocupa: é o fundamento do aparato burocrático moderno. Por isso a primeira alternativa é a correta. A segunda descreve uma democracia direta ideal, que não é o modelo burocrático analisado por Weber. A terceira confunde dominação legítima com poder coativo, pois a coerção existe, mas o conceito weberiano exige crença na legitimidade por parte dos dominados. A quarta descreve a dominação carismática, fundada na devoção afetiva e pessoal ao líder. A quinta descreve a dominação tradicional, fundada no costume e na hereditariedade."
  },
  {
    "disciplina": "Sociologia - Pierre Bourdieu (Unicamp)",
    "enunciado": "Pierre Bourdieu propôs os conceitos de campo, habitus e capitais para compreender a reprodução social. Segundo essa perspectiva, a reprodução das desigualdades ocorre principalmente porque:",
    "alternativas": [
      "a escola distribui capitais culturais de modo plenamente equitativo, anulando as diferenças de origem social.",
      "as disposições incorporadas pelos agentes, isto é, o habitus, e os capitais econômico, cultural, social e simbólico são desigualmente distribuídos e legitimados como se fossem naturais.",
      "o conflito de classes desapareceu, dando lugar a uma sociedade de indivíduos totalmente autônomos em suas escolhas.",
      "as regras explícitas das instituições determinam de forma mecânica a posição social de cada indivíduo.",
      "a ação humana é sempre racional e consciente, orientada apenas por cálculos utilitários de custo e benefício."
    ],
    "correta": 1,
    "comentario": "Bourdieu mostra que o sucesso escolar e profissional depende de capitais herdados, muitas vezes convertidos em capitais simbólicos, e que o habitus leva os agentes a reproduzirem as condições de sua própria dominação sem que haja coerção explícita. A segunda alternativa é a correta. A primeira é o oposto do que a sociologia bourdieusiana demonstra, pois a escola tende a reproduzir as desigualdades de origem, e não a anular. A terceira contraria a centralidade da luta simbólica nos campos e a própria noção de reprodução social. A quarta reduz a obra a uma leitura mecanicista de regras explícitas, o contrário da proposta, pois são as disposições incorporadas (habitus) que orientam as posições dos agentes. A quinta aproxima-se do modelo do homo economicus, criticado pelo autor."
  },
  {
    "disciplina": "Sociologia - Movimentos Sociais (ENEM)",
    "enunciado": "Nas últimas décadas, a literatura sociológica vem usando a expressão novos movimentos sociais para nomear coletivos como o feminismo contemporâneo, o movimento negro, os indígenas e os ambientalistas. Uma característica que os distingue dos movimentos operários clássicos é:",
    "alternativas": [
      "a defesa exclusiva de reivindicações salariais e de direitos trabalhistas no interior das fábricas.",
      "a completa indiferença em relação às instituições estatais e ao sistema jurídico.",
      "a centralidade de pautas identitárias, culturais e de reconhecimento, e a articulação em redes frequentemente transnacionais.",
      "a ausência total de organização e de lideranças, uma vez que operam apenas por redes virtuais.",
      "o uso sistemático da luta armada como estratégia principal de mobilização política."
    ],
    "correta": 2,
    "comentario": "Os novos movimentos sociais deslocam o eixo da redistribuição para o reconhecimento: questões de gênero, raça, sexualidade, meio ambiente e cultura ganham destaque, e a articulação em rede é comum. Por isso a terceira alternativa é a correta. A primeira é falsa, pois os novos movimentos sociais não se restringem a reivindicações salariais e trabalhistas no interior das fábricas — esse é o traço dos movimentos operários clássicos. A segunda é falsa, pois esses movimentos dialogam com o Estado e com o sistema jurídico, ainda que muitas vezes por meio de conflito, leis e ações judiciais. A quarta é exagerada e historicamente incorreta, pois há organização, ainda que menos hierárquica. A quinta é falsa, já que muitos desses movimentos atuam justamente por meio de leis, ações judiciais e políticas públicas."
  },
  {
    "disciplina": "Filosofia - Kant (Unicamp)",
    "enunciado": "Na Fundamentação da Metafísica dos Costumes, Kant formula o imperativo categórico, segundo o qual devo agir:",
    "alternativas": [
      "conforme a vontade de Deus, expressa nos mandamentos religiosos recebidos pela revelação.",
      "em vista das consequências úteis da ação, ainda que eu não possa desejar que todos ajam do mesmo modo.",
      "segundo máximas que me proporcionem a maior felicidade possível, desde que não prejudiquem terceiros.",
      "apenas segundo máximas que eu possa querer que se tornem lei universal, respeitando a humanidade como fim em si mesma.",
      "de acordo com os hábitos de minha comunidade, pois a moral não passa de construção cultural local."
    ],
    "correta": 3,
    "comentario": "O imperativo categórico kantiano é formal e universal: exige a universalizabilidade da máxima e o tratamento das pessoas como fins, nunca apenas como meios. A quarta alternativa é a correta. A primeira funda a moral em revelação externa, o que Kant rejeita, pois a lei moral deve brotar da razão prática. A segunda descreve uma ética de consequências, próxima do utilitarismo, que Kant rejeita ao exigir que a ação seja ditada pelo dever. A terceira é utilitarista e contradiz a exigência de universalidade, pois subordina a máxima ao prazer individual. A quinta é relativista e incompatível com a noção de validade universal."
  },
  {
    "disciplina": "Filosofia - Contratualismo (Fuvest)",
    "enunciado": "Hobbes, Locke e Rousseau desenvolveram teorias contratualistas, mas com conclusões diferentes sobre o estado de natureza e o contrato social. Sobre essas diferenças, é correto afirmar que:",
    "alternativas": [
      "Locke, Hobbes e Rousseau convergem ao negar qualquer limite ao poder do Estado sobre a vida e os bens dos cidadãos.",
      "para Rousseau, o estado de natureza é uma guerra de todos contra todos, e o contrato deve entregar toda a liberdade a um soberano.",
      "Hobbes e Locke concordam que o contrato institui um poder absoluto e indivisível, do qual os súditos não podem retomar seus direitos.",
      "os três defendem que, no estado de natureza, os homens viviam em plena harmonia e que o contrato serviu apenas para criar a propriedade privada.",
      "enquanto Hobbes vê no contrato uma saída para um estado de natureza conflituoso, Locke associa-o à proteção da vida, da liberdade e da propriedade, e Rousseau formula a vontade geral como fonte da legitimidade."
    ],
    "correta": 4,
    "comentario": "A quinta alternativa resume corretamente as três posições: a saída hobbesiana da insegurança exige um Leviatã; o contrato lockeano preserva direitos naturais e admite resistência ao poder que os viole; Rousseau funda a soberania na vontade geral. A primeira é falsa, pois os três não convergem: Hobbes nega limites ao poder do soberano, ao passo que Locke admite o direito de resistência e Rousseau subordina o Estado à vontade geral. A segunda atribui a Rousseau a tese de Hobbes, pois a guerra de todos contra todos e a entrega de toda a liberdade a um soberano descrevem o modelo hobbesiano. A terceira atribui a Locke a tese hobbesiana, já que o contrato lockeano preserva a vida, a liberdade e a propriedade e admite a resistência ao poder que os viole. A quarta é falsa, pois Hobbes descreve o estado de natureza como guerra de todos contra todos, e não como harmonia."
  },
  {
    "disciplina": "Filosofia - Sócrates (ENEM)",
    "enunciado": "Nos diálogos platônicos, Sócrates costuma iniciar a conversa reconhecendo sua própria ignorância e levando o interlocutor a contradizer suas certezas iniciais. Esse procedimento, conhecido como ironia, tem como objetivo principal:",
    "alternativas": [
      "purificar o discurso das opiniões infundadas para que o interlocutor chegue, por esforço próprio, ao conhecimento verdadeiro.",
      "vencer debates políticos por meio de retórica persuasiva, independentemente da veracidade do que se diz.",
      "provar que os deuses revelam a sabedoria diretamente aos homens virtuosos, sem necessidade de investigação.",
      "demonstrar que a verdade é inacessível e que todo conhecimento é apenas opinião variável.",
      "impor ao interlocutor uma doutrina pronta, transmitida pela autoridade do mestre e da tradição."
    ],
    "correta": 0,
    "comentario": "A ironia socrática é negativa em sua forma, mas positiva em seu propósito: ao desmontar a falsa certeza, ela abre caminho para a maiêutica, o parto das ideias, em que o interlocutor é levado a produzir o saber. Por isso a primeira alternativa é a correta. A segunda descreve a prática que Sócrates atribuía aos sofistas, que buscavam vencer debates por retórica persuasiva, independentemente da verdade. A terceira introduz um elemento teológico ausente do procedimento racional socrático. A quarta aproxima Sócrates do ceticismo radical, o que não corresponde ao seu projeto, pois a ironia tem propósito construtivo. A quinta contraria o método dialógico, que rejeita a autoridade e a transmissão passiva."
  },
  {
    "disciplina": "Filosofia - Existencialismo (Unesp)",
    "enunciado": "Para Jean-Paul Sartre, a existência precede a essência. Essa tese implica, no plano ético, que:",
    "alternativas": [
      "os valores são universais e anteriores ao indivíduo, cabendo a ele apenas descobri-los pela razão.",
      "o ser humano está condenado a ser livre, não possui uma natureza dada que o determine, e é integralmente responsável por seus projetos.",
      "a liberdade humana é uma ilusão, uma vez que tudo o que ocorre decorre de causas naturais necessárias.",
      "a essência humana é fixada pela natureza biológica e pela cultura herdada, e a liberdade limita-se a escolhas irrelevantes.",
      "o sentido da vida é assegurado pela fé, pois sem Deus não há possibilidade de escolha moral."
    ],
    "correta": 1,
    "comentario": "Se não há essência prévia, o homem se faz por suas escolhas e assume a responsabilidade por elas: é a liberdade radical do existencialismo sartriano. A segunda alternativa é a correta. A primeira descreve um essencialismo de valores, oposto à tese. A terceira é determinismo, incompatível com a liberdade sartriana. A quarta reintroduz uma essência natural. A quinta apela para a fé, que Sartre, ateu, rejeita como fundamento moral."
  },
  {
    "disciplina": "Filosofia - Pré-socráticos (Fuvest)",
    "enunciado": "Heráclito e Parmênides propuseram respostas antagônicas sobre a natureza do real. Sobre essas doutrinas, é correto afirmar que:",
    "alternativas": [
      "os dois filósofos trabalham com a hipótese dos quatro elementos irredutíveis como explicação única da physis.",
      "Parmênides funda a escola atomista, ao afirmar que o real se reduz a partículas indivisíveis em movimento no vazio.",
      "Heráclito acentua o devir e o conflito como princípio do real, enquanto Parmênides separa a via da verdade, captada pelo logos, da via das opiniões dos mortais.",
      "ambos sustentam que os sentidos fornecem acesso seguro ao Ser e que a razão é fonte de erro.",
      "Heráclito nega a mudança e defende a imutabilidade do Ser, enquanto Parmênides afirma que tudo flui sem cessar."
    ],
    "correta": 2,
    "comentario": "Heráclito, de Éfeso, vê no fogo e no devir a chave do real, pois não se entra duas vezes no mesmo rio. Parmênides, de Eléia, distingue o caminho da verdade, em que o Ser é imutável e uno, do caminho da opinião, baseado nos sentidos. A terceira alternativa é a correta. A primeira é anacrônica, já que a hipótese dos quatro elementos é de Empédocles. A segunda atribui a Parmênides a doutrina de Demócrito e Leucipo, os verdadeiros fundadores do atomismo. A quarta contraria ambos, pois Parmênides desconfia dos sentidos e neles vê o engano, ao passo que Heráclito valoriza o logos como via de acesso à verdade comum. A quinta inverte as posições."
  },
  {
    "disciplina": "Sociologia - Durkheim (Unicamp)",
    "enunciado": "Em Da Divisão do Trabalho Social, Durkheim distingue solidariedade mecânica e orgânica. Segundo o autor, a passagem de uma para outra ocorre:",
    "alternativas": [
      "pela eliminação completa do direito repressivo e sua substituição por normas puramente religiosas.",
      "pela substituição do Estado por comunidades autogeridas, capazes de suprimir a necessidade de normas.",
      "pelo aumento da homogeneidade social, que intensifica a semelhança entre os membros do grupo.",
      "com a crescente especialização das funções, que cria interdependência entre indivíduos e grupos antes semelhantes.",
      "pela extinção da divisão do trabalho, que seria a causa de todos os males das sociedades modernas."
    ],
    "correta": 3,
    "comentario": "Nas sociedades simples predomina a solidariedade mecânica, fundada na semelhança e no direito penal repressivo. Nas sociedades complexas, a divisão do trabalho gera especialização e interdependência, produzindo solidariedade orgânica e direitos restitutivos. Por isso a quarta alternativa é a correta. A primeira é falsa, pois é nas sociedades organizadas pela solidariedade mecânica que predomina o direito repressivo, e a passagem à solidariedade orgânica nem suprime a norma jurídica nem a reduz a normas puramente religiosas. A segunda é falsa, pois Durkheim não propõe eliminar o Estado nem a divisão do trabalho, que é justamente a fonte da solidariedade orgânica e da regulação própria das sociedades complexas. A terceira descreve o cenário da solidariedade mecânica. A quinta é alheia ao pensamento do autor, que vê na divisão do trabalho a fonte da solidariedade orgânica, e não a causa de todos os males."
  },
  {
    "disciplina": "Filosofia - Aristóteles (ENEM)",
    "enunciado": "Na Ética a Nicômaco, Aristóteles define a virtude como uma disposição de caráter adquirida pelo hábito, situada em um meio-termo relativo a nós. Essa compreensão implica que:",
    "alternativas": [
      "toda paixão deve ser eliminada para que a razão possa atuar de forma pura e sem obstáculos.",
      "o bem supremo é o prazer imediato, e a virtude não passa de um cálculo hedonista de riscos.",
      "o agir virtuoso consiste em seguir regras universais fixadas de antemão pela lei positiva.",
      "a virtude é uma qualidade inata, possuída por alguns homens desde o nascimento e inacessível à educação.",
      "a excelência moral resulta da prática repetida de ações justas e temperantes, orientada pela razão prudente, que escolhe o meio-termo adequado a cada situação."
    ],
    "correta": 4,
    "comentario": "Aristóteles nega que a virtude seja natural ou mero conhecimento teórico: ela se forma pelo exercício e depende da sabedoria prática, que discerne o justo meio na situação concreta. A quinta alternativa é a correta. A primeira exagera, pois não se trata de extinguir as paixões, mas de educá-las pela razão, situando-as no justo meio. A segunda descreve hedonismo, criticado pelo filósofo, que não reduz o bem supremo ao prazer imediato. A terceira aproxima Aristóteles de uma moral de dever exterior, que não é a sua, pois a virtude não se resume a seguir regras fixadas de antemão. A quarta contraria a definição de disposição adquirida pelo hábito, pois a virtude não é natural nem inata."
  },
  {
    "disciplina": "Sociologia - Estratificação Social (Unesp)",
    "enunciado": "Distintas abordagens sociológicas procuram explicar a desigualdade social. Considerando as contribuições de Karl Marx e de Max Weber, é correto afirmar que:",
    "alternativas": [
      "Marx enfatiza a posse dos meios de produção como fundamento das classes, ao passo que Weber adiciona dimensões de status, prestígio e poder na explicação da estratificação.",
      "Marx deriva as classes exclusivamente do prestígio social, e Weber, exclusivamente da propriedade dos meios de produção.",
      "Marx e Weber coincidem ao reduzir a estratificação social à ação racional dos indivíduos no mercado.",
      "ambos defendem que a desigualdade é fenômeno natural e necessário à coesão de qualquer sociedade.",
      "Weber nega a existência de qualquer forma de desigualdade econômica, concentrando-se apenas nas crenças religiosas."
    ],
    "correta": 0,
    "comentario": "A primeira alternativa é a correta e expressa a complementaridade clássica: em Marx, as classes definem-se pela relação com a propriedade dos meios de produção; em Weber, a estratificação é pluridimensional, envolvendo classe, status e partido. A segunda é absurda, pois inverte os critérios: para Marx, as classes definem-se pela relação com os meios de produção, e Weber não se resume ao prestígio social. A terceira atribui a Marx uma leitura individualista que ele rejeita. A quarta aproxima os autores de uma explicação funcionalista da desigualdade, que não é a deles, pois ambos a explicam por relações de dominação. A quinta é falsa, pois Weber reconhece a dimensão econômica (classe) ao lado de status e partido, e jamais negou a desigualdade econômica."
  },
  {
    "disciplina": "Literatura - Modernismo (Unicamp)",
    "enunciado": "O poema Os Sapos, de Olavo Bilac, lido em tom de sátira durante a Semana de Arte Moderna de 1922, representa uma crítica:",
    "alternativas": [
      "ao parnasianismo brasileiro, exclusivamente por seu rigor métrico, e ao uso obrigatório do soneto na lírica moderna.",
      "ao academicismo e ao euforismo oficial que produziam uma poesia vazia de sentido, repetidora de modelos importados e de fácil reconhecimento público.",
      "à ausência de métrica na poesia contemporânea, defendida pelo autor como única forma legítima de expressão lírica.",
      "à linguagem coloquial, que o poeta considera incompatível com a seriedade da grande poesia.",
      "ao romantismo indianista, criticado por ignorar completamente a cultura popular e a oralidade brasileira."
    ],
    "correta": 1,
    "comentario": "Os sapos evocam os poetas acadêmicos, a vaidade das tertúlias e a poesia que se satisfaz na própria pose, sem contato com a vida. A crítica modernista dirige-se, portanto, ao anquilosamento das academias e ao falso lirismo, e não à métrica em si. A segunda alternativa é a correta. A primeira reduz a crítica à forma, quando ela é, sobretudo, de conteúdo e de atitude. A terceira é absurda: o poema não defende a ausência de métrica — ele é metricamente regular —, apenas satiriza o uso vazio que os poetas acadêmicos faziam dela. A quarta desloca o alvo da sátira. A quinta é o contrário do que o poema defende."
  },
  {
    "disciplina": "Literatura - Romantismo (Fuvest)",
    "enunciado": "O indianismo romântico brasileiro, presente em obras como Iracema e O Guarani, construiu uma figura do índio que, apesar de distante da realidade histórica, cumpria uma função específica no projeto literário da época. Essa função era:",
    "alternativas": [
      "sustentar a tese da inferioridade cultural dos indígenas, justificando a expansão agrícola sobre suas terras.",
      "denunciar o extermínio indígena como consequência direta do sistema escravista e defender sua autonomia política.",
      "criar uma identidade nacional idealizada, unindo o índio heroico e puro à natureza exuberante como símbolos do Brasil independente.",
      "documentar com rigor etnográfico as línguas e os costumes dos povos autóctones, segundo os métodos da antropologia moderna.",
      "reproduzir os modelos medievais europeus, ignorando por completo a paisagem e os temas americanos."
    ],
    "correta": 2,
    "comentario": "O índio idealizado de José de Alencar e de Gonçalves Dias servia à construção simbólica de uma nação nova e independente, fundindo o nativo ao cenário tropical. Por isso a terceira alternativa é a correta. A quarta é oposta ao tom idealizador, pois não havia preocupação etnográfica nesses romances. A segunda é parcial, já que há denúncia do sofrimento indígena, mas a obra não se traduz em projeto político de autonomia. A primeira é falsa, porque o indianismo idealiza o índio, em vez de sustentar sua inferioridade cultural. A quinta é falsa, uma vez que o Romantismo valoriza justamente o cenário americano."
  },
  {
    "disciplina": "Literatura - Barroco (Unesp)",
    "enunciado": "A produção barroca em língua portuguesa é marcada pelo conflito entre o cultismo e o conceptismo. Essa característica manifesta-se:",
    "alternativas": [
      "na adoção de uma linguagem exclusivamente popular, isenta de influências clássicas e religiosas.",
      "na simplicidade sintática e na clareza expositiva, que buscam eliminar qualquer ambiguidade do texto.",
      "no predomínio absoluto do soneto regular, com versos decassílabos e ausência de figuras de linguagem.",
      "no jogo entre a exuberância formal, os contrastes e os jogos de palavras, de um lado, e o raciocínio em conceitos engenhosos, de outro.",
      "na rejeição completa dos temas religiosos, substituídos por uma poesia puramente materialista."
    ],
    "correta": 3,
    "comentario": "O Barroco vive do dilema entre o ser e o parecer, entre o pecado e a graça. O cultismo explora a sonoridade e a imagem, enquanto o conceptismo explora a construção lógica e o conceito engenhoso. A quarta alternativa é a correta: o Barroco vive justamente do jogo entre a exuberância formal e o raciocínio em conceitos engenhosos. A primeira é falsa, porque o Barroco é erudito e rebuscado, e não isento de influências clássicas e religiosas. A segunda é incompatível com a estética barroca, que cultiva o exagero, o pormenor e o jogo de palavras, e não a simplicidade sintática. A terceira é falsa, pois o Barroco não se resume ao soneto regular e faz amplo uso de figuras de linguagem. A quinta é absurda, porque a tensão religiosa é central no Barroco, como nos Sermões de Vieira."
  },
  {
    "disciplina": "Literatura - Realismo (ENEM)",
    "enunciado": "Machado de Assis é habitualmente associado ao Realismo brasileiro; no entanto, sua obra mantém uma distância irônica em relação às convenções do movimento. Em Memórias Póstumas de Brás Cubas, essa marca se evidencia pelo:",
    "alternativas": [
      "relato linear e objetivo, que segue a ordem cronológica sem qualquer desvio digressivo.",
      "uso exclusivo do narrador onisciente, que explica ao leitor as motivações de cada personagem.",
      "tratamento sentimental do amor, com final feliz e redenção do protagonista por um casamento.",
      "abandono da primeira pessoa e defesa da impessoalidade radical do narrador realista.",
      "narrador-defunto que se dirige ao leitor em tom cáustico, digressivo e experimental, rompendo a ilusão realista e questionando a própria escrita."
    ],
    "correta": 4,
    "comentario": "Brás Cubas é um morto que narra, interpela o leitor, quebra a ordem cronológica e zomba das convenções narrativas. Essa consciência irônica aproxima Machado do Realismo, mas o leva além dele. A quinta alternativa é a correta. A primeira contraria a estrutura fragmentária do romance. A segunda é falsa, pois o narrador é personagem — o próprio Brás Cubas — e escreve em primeira pessoa, não em terceira pessoa onisciente. A terceira é falsa, pois o romance não oferece final feliz nem redenção sentimental ao protagonista. A quarta descreve o oposto do que ocorre no livro."
  },
  {
    "disciplina": "Linguagens - Funções da Linguagem (Unesp)",
    "enunciado": "Segundo Roman Jakobson, a função da linguagem centrada no canal e no contato, que busca estabelecer, manter ou verificar a comunicação, é a função:",
    "alternativas": [
      "fática, típica de expressões que servem para manter aberta a via de comunicação.",
      "conativa ou apelativa, dirigida diretamente ao destinatário.",
      "metalinguística, que toma o próprio código como objeto.",
      "emotiva, centrada no emissor e em suas atitudes subjetivas.",
      "referencial ou denotativa, orientada para o contexto e para o conteúdo informado."
    ],
    "correta": 0,
    "comentario": "A função fática privilegia o canal: expressões de contato, como as saudações e as perguntas sobre se a mensagem está sendo ouvida, servem para verificar se a comunicação é possível. A primeira alternativa é a correta. A segunda (conativa ou apelativa) centra-se no destinatário, como na publicidade e na persuasão. A terceira (metalinguística) centra-se no código, como em definições de dicionário. A quarta (emotiva) centra-se no remetente e em suas atitudes subjetivas. A quinta (referencial) centra-se no contexto e na informação."
  },
  {
    "disciplina": "Linguagens - Voz Passiva (Unicamp)",
    "enunciado": "Assinale a alternativa em que a oração está corretamente transposta para a voz passiva analítica, mantendo-se o sentido original: O comitê analisará as propostas até sexta-feira.",
    "alternativas": [
      "As propostas analisaria o comitê até sexta-feira.",
      "As propostas serão analisadas pelo comitê até sexta-feira.",
      "Analisaria as propostas o comitê até sexta-feira.",
      "As propostas tinham sido analisadas pelo comitê até sexta-feira.",
      "As propostas serão analisadas no comitê até sexta-feira."
    ],
    "correta": 1,
    "comentario": "Na voz passiva analítica, o objeto direto torna-se sujete paciente, o verbo principal vai para o particípio e recebe o auxiliar ser, e o agente é introduzido pela preposição por. Assim, a construção correta é serão analisadas pelo comitê. A segunda alternativa é o gabarito. A primeira e a terceira não constroem voz passiva alguma. A quarta altera o tempo verbal para o mais-que-perfeito, comprometendo o sentido temporal do enunciado original. A quinta corrompe o agente, substituindo a preposição «pela» pela preposição «em» (no comitê)."
  },
  {
    "disciplina": "Linguagens - Crase (Fuvest)",
    "enunciado": "Assinale a alternativa em que o emprego do acento indicador de crase está correto:",
    "alternativas": [
      "A caminho da escola, parou à pé para descansar.",
      "Referiu-se à duas normas já revogadas pelo decreto.",
      "O professor prefere trabalhar de manhã, porém voltará à noite para a reunião.",
      "Entregou o relatório à ela no final da tarde.",
      "Eles foram à teatro na véspera de Ano Novo."
    ],
    "correta": 2,
    "comentario": "A crase ocorre quando a preposição a se funde com o artigo definido a ou com o a de locuções femininas. Na locução adverbial à noite, que exige a preposição e contém substantivo feminino, o acento é obrigatório; por isso a terceira alternativa é a correta. Na primeira, «parou à pé» é indevido, porque a locução adverbial parou a pé não leva preposição nem artigo. Na segunda, o artigo não aparece antes de numeral feminino: escreve-se referiu-se a duas normas. Na quarta, pronome pessoal não admite artigo antes, logo não ocorre crase: entregou o relatório a ela. Na quinta, «teatro» é substantivo masculino, de modo que se escreve ao teatro, sem crase."
  },
  {
    "disciplina": "Linguagens - Interpretação (ENEM)",
    "enunciado": "Leia o texto a seguir. Estudos recentes mostram que o uso excessivo de telas por adolescentes está associado à diminuição da qualidade do sono. O problema, porém, não reside nas telas em si, mas no tempo total que passam ligadas a conteúdos de alta estimulação antes de dormir, ao lado da ausência de limites combinados entre pais e filhos. Uma crítica consistente a esse texto deveria:",
    "alternativas": [
      "questionar exclusivamente a credibilidade dos estudos mencionados, sem discutir o raciocínio apresentado.",
      "aderir ao argumento, ignorando a ressalva de que o problema está no uso e não no aparelho.",
      "substituir a discussão pela narração de casos pessoais, úteis para validar a conclusão geral.",
      "distinguir a correlação estatística apresentada de uma relação de causa e efeito, examinando se outras variáveis, como idade, renda e hábitos familiares, não explicariam o dado.",
      "recusar o texto por concluir algo óbvio, sem necessidade de análise metodológica adicional."
    ],
    "correta": 3,
    "comentario": "O texto afirma que o uso excessivo de telas está associado à queda de qualidade do sono. Trata-se de uma inferência a partir de correlação, e uma crítica rigorosa deve indagar se a relação é causal ou se há variáveis de confusão. A quarta alternativa é a correta. A primeira confunde ataque à fonte com análise argumentativa. A segunda pede adesão, não crítica. A terceira recorre a exemplos anedóticos, que não testam generalizações. A quinta rejeita o texto por sua conclusão, sem enfrentar o argumento."
  },
  {
    "disciplina": "Artes - Arte Moderna (Fuvest)",
    "enunciado": "A obra Guernica, de Pablo Picasso, é considerada uma das imagens mais fortes da arte engajada do século XX. Do ponto de vista histórico e estético, é correto afirmar que:",
    "alternativas": [
      "representa uma paisagem rural tranquila, na qual o artista exalta a harmonia entre o campo e a tecnologia.",
      "foi criada durante a Segunda Guerra Mundial, em homenagem à libertação da cidade basca pelo exército francês.",
      "utiliza uma paleta monocromática em tons de verde e azul, simbolizando a esperança na reconstrução da cidade.",
      "trata-se de uma pintura abstrata geometricamente construída, sem qualquer referência figurativa aos horrores da guerra.",
      "foi encomendada pelo governo republicano espanhol para denunciar o bombardeio aéreo da cidade basca de Guernica, em 1937, durante a Guerra Civil Espanhola."
    ],
    "correta": 4,
    "comentario": "Guernica foi pintada em 1937 para o Pavilhão da República Espanhola na Exposição Internacional de Paris, em resposta ao bombardeio da cidade por aviões alemães aliados de Franco. A quinta alternativa é a correta. A primeira descreve uma cena pastoril, o oposto do horror representado. A segunda erra o contexto histórico, já que se trata da Guerra Civil Espanhola, e não da Segunda Guerra Mundial. A terceira inventa uma paleta inexistente e inverte o sentido de denúncia. A quarta é falsa, pois a obra mantém forte carga figurativa, ainda que distorça corpos e animais."
  },
  {
    "disciplina": "Literatura - Parnasianismo (Unesp)",
    "enunciado": "O Parnasianismo brasileiro, vinculado à valorização da forma e ao culto do verso perfeito, tem em Olavo Bilac um de seus principais nomes. Sobre as marcas dessa estética, é correto afirmar que:",
    "alternativas": [
      "defende o ideal do fazer poético por meio da métrica rigorosa, do vocabulário preciosista e da impessoalidade do eu lírico.",
      "centra-se na denúncia social, usando a forma fixa do soneto para criticar a República.",
      "adota o verso livre e a colagem de fragmentos do cotidiano, antecipando a poesia concreta.",
      "nega qualquer relação com a poesia clássica e propõe uma linguagem exclusivamente coloquial.",
      "prioriza a emoção subjetiva em primeira pessoa, com versos brancos e ausência de rima."
    ],
    "correta": 0,
    "comentario": "A primeira alternativa é a correta: o parnasianismo busca a arte pela arte, com culto da forma, descrição objetiva e rigor técnico. A segunda descreve traços românticos. A terceira é anacrônica, pois o verso livre e a colagem não caracterizam o período. A quarta é falsa, já que os parnasianos tinham as musas clássicas como referência constante. A quinta reduz a produção a uma função política que não é central nessa estética."
  },
  {
    "disciplina": "Linguagens - Regência Verbal (Unicamp)",
    "enunciado": "Assinale a alternativa em que a construção está de acordo com a norma-padrão da regência verbal:",
    "alternativas": [
      "O Tribunal respondeu a manifestação dos advogados após várias sessões.",
      "O relatório a que o pesquisador se referiu continha dados inéditos.",
      "Todos obedeceram o regulamento sem qualquer restrição.",
      "Assisti o filme pela segunda vez e continuou emocionante.",
      "O diretor aspira o cargo de chefia desde o início do ano."
    ],
    "correta": 1,
    "comentario": "A segunda alternativa é a correta: o verbo referir-se é transitivo indireto e exige a preposição a, e o pronome relativo que, retomando relatório, vem precedido dessa preposição, produzindo a construção a que. Na primeira, o verbo responder é transitivo indireto e exige a preposição a; diante de substantivo feminino definido ocorre a crase, devendo-se escrever respondeu à manifestação. Na terceira, obedecer é transitivo indireto, e o correto é obedeceram ao regulamento. Na quarta, assistir, no sentido de ver, é transitivo indireto, e o correto é assisti ao filme. Na quinta, aspirar, no sentido de desejar, pede a preposição a, devendo-se escrever aspira ao cargo."
  },
  {
    "disciplina": "Linguagens - Argumentação (Unesp)",
    "enunciado": "Um editorial afirma: A cidade precisa de mais parques, não de mais shoppings. Do ponto de vista argumentativo, o efeito produzido por essa oposição depende principalmente de:",
    "alternativas": [
      "uma ironia dirigida ao poder público, que já teria recusado a construção dos shoppings citados.",
      "uma enumeração de dados estatísticos que comprovam a superioridade dos parques sobre os shoppings.",
      "um contraste que privilegia, no plano simbólico, o valor de uso coletivo em detrimento do consumo privado.",
      "uma metáfora puramente decorativa, sem relevância para a construção do argumento.",
      "uma comparação entre dois objetos do mesmo tipo, de modo a manter a simetria do raciocínio."
    ],
    "correta": 2,
    "comentario": "A terceira alternativa é a correta, pois a força do argumento está no contraste entre espaços públicos de lazer e equipamentos privados de consumo, o que remete a prioridades de urbanidade. A primeira introduz uma intenção irônica que o texto não manifesta. A segunda é inexistente no enunciado, que não traz dados estatísticos. A quarta é falsa, pois a força do argumento está justamente no contraste, e não em uma metáfora decorativa. A quinta é falsa, já que a oposição se dá entre coisas desiguais — parques e shoppings —, e não entre objetos do mesmo tipo."
  },
  {
    "disciplina": "Matemática - Logaritmos (Fuvest)",
    "enunciado": "Dado que log x = log 2 + 3 log 3 - log 6, em que todos os logaritmos são decimais e x é positivo, o valor de x é:",
    "alternativas": [
      "3.",
      "4.",
      "6.",
      "9.",
      "18."
    ],
    "correta": 3,
    "comentario": "Aplicando as propriedades dos logaritmos, 3 log 3 = log 27. Assim, log x = log 2 + log 27 - log 6 = log(2 × 27) - log 6 = log 54 - log 6 = log(54/6) = log 9. Logo, x = 9 e a quarta alternativa é a correta. O valor 18 vem de dividir 54 por 3 em vez de por 6; os valores 3 e 4 nasceriam de erros de aritmética elementar na manipulação das frações; e o 6 não decorre do erro descrito, pois trocar 3 log 3 por log 6 daria log 2, isto é, x = 2, valor que nem consta das alternativas."
  },
  {
    "disciplina": "Matemática - Análise Combinatória (Unicamp)",
    "enunciado": "De quantos modos distintos 5 pessoas podem sentar-se em 5 cadeiras dispostas em fila, de modo que duas dessas pessoas nunca fiquem em lugares vizinhos?",
    "alternativas": [
      "54.",
      "48.",
      "60.",
      "64.",
      "72."
    ],
    "correta": 4,
    "comentario": "O número total de permutações de 5 pessoas em 5 lugares é 5 fatorial, isto é, 120. Eliminando as disposições em que o par fica junto: trata-se o par como um bloco, obtendo 4 fatorial, igual a 24 formas de organizar quatro objetos, que são o bloco mais as outras três pessoas, e dentro do bloco há 2 fatorial, igual a 2 ordens possíveis, totalizando 48 disposições indesejadas. Portanto, 120 menos 48 igual a 72, e a quinta alternativa é a correta. O valor 48 é exatamente o total que deveria ser subtraído, e não o resultado pedido. O valor 60 só se obtém dividindo 120 por 2, isto é, pegando metade das permutações, e os valores 54 e 64 resultam de contagens parciais incorretas."
  },
  {
    "disciplina": "Matemática - Função Exponencial (Fuvest)",
    "enunciado": "Uma população de bactérias duplica a cada 3 horas. Se inicialmente há 5 × 10³ unidades, o tempo necessário para que a população atinja 8 × 10⁴ unidades é de:",
    "alternativas": [
      "12 horas.",
      "6 horas.",
      "9 horas.",
      "15 horas.",
      "24 horas."
    ],
    "correta": 0,
    "comentario": "A população segue a lei P = P₀ · 2^(t/3). A razão entre a população final e a inicial é 80000 dividido por 5000, igual a 16, e 16 = 2 elevado a 4. Logo, t/3 = 4, isto é, t = 12 horas, e a primeira alternativa é a correta. O valor 6 horas corresponderia a apenas duas duplicações, fator 4; 9 horas, a três duplicações, fator 8; 15 horas corresponderia a cinco duplicações, fator 32, acima do necessário; e 24 horas implicaria oito duplicações, fator 256, muito acima do necessário."
  },
  {
    "disciplina": "Matemática - Geometria Plana (Unesp)",
    "enunciado": "Um retângulo de perímetro 36 cm é dividido em dois quadrados por um segmento paralelo a um dos lados. A área do retângulo é, em cm², igual a:",
    "alternativas": [
      "81.",
      "72.",
      "90.",
      "80.",
      "60."
    ],
    "correta": 1,
    "comentario": "Se cada quadrado tem lado s, o retângulo resultante tem dimensões s e 2s, e seu perímetro é 2(s + 2s) = 6s = 36, donde s = 6. A área é s multiplicado por 2s, isto é, 6 x 12 = 72 cm², e a segunda alternativa é a correta. O valor 60 não vem de supor s = 5 (daria 5 × 10 = 50); o 80 corresponderia a um retângulo de lados 10 e 8, que tem perímetro 36, mas não se divide em dois quadrados iguais; o 90 não é possível, pois a área máxima de um retângulo de perímetro 36 é 81; e o valor 81 viria de supor que o retângulo é, na verdade, um quadrado."
  },
  {
    "disciplina": "Física - Cinemática (Unicamp)",
    "enunciado": "Um automóvel trafega a 72 km/h quando o motorista avista um obstáculo e freia com aceleração constante de módulo 4 m/s². Desprezando o tempo de reação, a distância mínima de frenagem, em metros, é:",
    "alternativas": [
      "100.",
      "20.",
      "50.",
      "200.",
      "40."
    ],
    "correta": 2,
    "comentario": "Pela equação de Torricelli, v² = v₀² + 2 · a · Δs. No fim da frenagem a velocidade é zero, logo Δs = v₀² / (2 · a). Convertendo 72 km/h para 20 m/s, obtém-se 400 dividido por 8, igual a 50 m, e a terceira alternativa é a correta. O tempo de frenagem seria t = v0/a = 20/4 = 5 s. O valor 100 surge de esquecer o fator 2 do denominador (v0²/a = 400/4 = 100); o 200, de esquecer de dividir pela aceleração (400/2 = 200); o 40, de dividir v0² por 10 em vez de por 2a = 8 (400/10 = 40); e o 20, de usar g = 10 m/s² no lugar da aceleração de frenagem (400/20 = 20)."
  },
  {
    "disciplina": "Física - Dinâmica (Fuvest)",
    "enunciado": "Um bloco de 4 kg repousa sobre um plano horizontal cujo coeficiente de atrito cinético é 0,25. Uma força horizontal constante de 20 N aplicada ao bloco produz, em newtons, uma força resultante de:",
    "alternativas": [
      "16.",
      "0.",
      "5.",
      "10.",
      "8."
    ],
    "correta": 3,
    "comentario": "A força de atrito cinético vale F_at = mN, com N = mg = 4 x 10 = 40 N, adotando g = 10 m/s². Logo, F_at = 0,25 x 40 = 10 N. Aplicando a segunda lei de Newton na direção horizontal, a resultante é 20 - 10 = 10 N, e a quarta alternativa é a correta. O valor zero corresponderia a uma situação de equilíbrio, que não ocorre, pois a força aplicada excede o atrito. O valor 5 N surgiria de erro de aritmética, o 8 N de usar coeficiente 0,2 e o 16 N de dobrar indevidamente o valor do atrito."
  },
  {
    "disciplina": "Física - Óptica (Unicamp)",
    "enunciado": "Um objeto situa-se a 30 cm de uma lente delgada convergente de distância focal 15 cm. A imagem formada será:",
    "alternativas": [
      "real, invertida e menor que o objeto.",
      "real, direita e maior que o objeto.",
      "virtual, invertida e maior que o objeto.",
      "virtual, direita e do mesmo tamanho do objeto.",
      "real, invertida e do mesmo tamanho do objeto."
    ],
    "correta": 4,
    "comentario": "Pela equação dos pontos conjugados, 1/f = 1/p + 1/p'. Com f = 15 cm e p = 30 cm, tem-se 1/15 = 1/30 + 1/p', donde 1/p' = 1/30 e p' = 30 cm. Como p' é positivo, a imagem é real; sendo real, é invertida; e a ampliação A = -p'/p = -1 indica mesmo tamanho. A quinta alternativa é a correta. A primeira erra ao indicar a imagem menor que o objeto, pois, com p = 2f, a ampliação é unitária; a segunda erra ao indicar a imagem direita e maior, pois, para objeto real além do foco, a imagem é real, invertida e, aqui, do mesmo tamanho; a terceira erra ao indicar imagem virtual (e maior), pois, com p > f, a imagem é real; e a quarta indica imagem virtual, o que só ocorreria com o objeto entre o foco e a lente (p < f)."
  },
  {
    "disciplina": "Química - Termoquímica (ENEM)",
    "enunciado": "Considere as entalpias de ligação, em kJ/mol: C-H = 413, O=O = 498, C=O = 745 e O-H = 463. A variação de entalpia da combustão completa de 1 mol de metano, na reação CH₄ + 2 O₂ originando CO₂ + 2 H₂O, é aproximadamente, em kJ/mol:",
    "alternativas": [
      "-694.",
      "-200.",
      "+200.",
      "+694.",
      "-1390."
    ],
    "correta": 0,
    "comentario": "A variação de entalpia é estimada pela soma das ligações rompidas menos a soma das ligações formadas. Rompidas: 4 x 413 + 2 x 498 = 1652 + 996 = 2648 kJ. Formadas: 2 x 745 + 4 x 463 = 1490 + 1852 = 3342 kJ. Logo, 2648 - 3342 = -694 kJ/mol, e a primeira alternativa é a correta. O sinal negativo indica reação exotérmica, o que descarta as opções positivas. O valor -1390 corresponderia a efetuar o cálculo para 2 mols de metano, dobrando todos os coeficientes (2 × −694 = −1.388); o -200 a uma contagem incompleta das ligações de O-H na água permanece válida (contando 3 das 4 ligações O-H: 2.648 − 1.490 − 1.389 = −231, cerca de −200)."
  },
  {
    "disciplina": "Química - Equilíbrio Químico (Unicamp)",
    "enunciado": "Para a reação exotérmica 2 SO₂(g) + O₂(g) em equilíbrio com 2 SO₃(g), analise as afirmações: I. O aumento da pressão desloca o equilíbrio no sentido dos produtos. II. O aumento da temperatura desloca o equilíbrio no sentido dos produtos. III. A adição de um catalisador desloca o equilíbrio, aumentando o rendimento em SO3. Está correto o que se afirma em:",
    "alternativas": [
      "Somente II.",
      "Somente I.",
      "Somente III.",
      "I e II.",
      "I, II e III."
    ],
    "correta": 1,
    "comentario": "Pelo princípio de Le Chatelier, um aumento de pressão desloca o equilíbrio para o lado com menor número de mols gasosos: aqui, 3 mols de reagentes produzem 2 mols de produtos, favorecendo o SO3, portanto I é verdadeira. Como a reação é exotérmica, o aumento de temperatura desloca no sentido endotérmico, isto é, para os reagentes, tornando II falsa. O catalisador acelera igualmente as reações direta e inversa e altera apenas o tempo de alcance do equilíbrio, não a sua posição, tornando III falsa. O gabarito é, pois, Somente I. As alternativas que incluem II ou III estão incorretas."
  },
  {
    "disciplina": "Química - Genética (Fuvest)",
    "enunciado": "Em uma espécie, o gene A, dominante, condiciona pigmentação normal, e o alelo a, quando em homozigose, condiciona albinismo. Dois indivíduos heterozigotos têm dois filhos. A probabilidade de que exatamente um dos filhos seja albino é de:",
    "alternativas": [
      "1/4.",
      "1/16.",
      "3/8.",
      "1/2.",
      "3/16."
    ],
    "correta": 2,
    "comentario": "Cada filho tem 1/4 de chance de ser albino, aa, e 3/4 de chance de ter fenótipo normal. Como se pede exatamente um albino em dois nascimentos, usa-se a distribuição binomial: 2 x (1/4) x (3/4) = 6/16 = 3/8, e a terceira alternativa é a correta. O valor 1/4 é a probabilidade de um filho isolado ser albino, e não o que foi pedido. O valor 1/2 ignoraria o fator de ponderação binomial. O valor 1/16 refere-se aos dois filhos albinos, e 3/16 decorreria de uma contagem parcial sem o fator combinatório."
  },
  {
    "disciplina": "Matemática - Progressão Aritmética (ENEM)",
    "enunciado": "A sequência dos termos a1, a2, a3,... é uma progressão aritmética em que a3 = 10 e a9 = 34. O valor da soma a1 + a2 + ... + a10 é:",
    "alternativas": [
      "150.",
      "180.",
      "190.",
      "200.",
      "220."
    ],
    "correta": 3,
    "comentario": "De a9 - a3 = 6r decorre que 34 - 10 = 6r, logo r = 4. Substituindo em a3 = a1 + 2r, obtém-se a1 = 10 - 8 = 2. A soma dos n primeiros termos é Sₙ = n · (a₁ + aₙ)/2, e a₁₀ = a₁ + 9r = 2 + 36 = 38. Assim, S₁₀ = 10 × (2 + 38)/2 = 200, e a quarta alternativa é a correta. O valor 150 não vem de usar razão 3 (daria 175), mas de supor r = 2 mantendo a₃ = 10: S₁₀ = 5 × (12 + 18) = 150; o 180 aparece quando se usa a₉ = 34 no lugar de a₁₀ na fórmula da soma: 10 × (2 + 34)/2 = 180; o 190, de tomar a₁₀ = 36, esquecendo de somar a₁: 10 × (2 + 36)/2 = 190; e o 220, de usar a₁₀ = a₁ + 10r = 42: 10 × (2 + 42)/2 = 220."
  },
  {
    "disciplina": "Química - Eletroquímica (Unicamp)",
    "enunciado": "Considere uma pilha formada pelos pares Zn²⁺/Zn, com potencial de redução -0,76 V, e Cu²⁺/Cu, com potencial de redução +0,34 V. Sobre essa pilha, é correto afirmar que:",
    "alternativas": [
      "o zinco é o cátodo, no qual ocorre a redução do íon cúprico, e a diferença de potencial vale 0,42 V.",
      "a diferença de potencial da pilha é 1,10 V, porém o fluxo de elétrons ocorre do eletrodo de cobre para o de zinco.",
      "o cobre sofre oxidação e funciona como ânodo, enquanto o zinco recebe elétrons na semirreação de redução.",
      "os dois eletrodos sofrem oxidação simultaneamente, e o fluxo de elétrons ocorre do cobre para o zinco.",
      "o zinco é o ânodo e oxida-se, o cobre recebe os elétrons no cátodo e a diferença de potencial nas condições padrão é 1,10 V."
    ],
    "correta": 4,
    "comentario": "A quinta alternativa é a correta. O par de menor potencial de redução, Zn²⁺/Zn com -0,76 V, tende a sofrer oxidação, funcionando como ânodo; o cobre, de maior potencial, é o cátodo, onde ocorre a redução de Cu²⁺ a Cu. A diferença de potencial é 0,34 - (-0,76) = 1,10 V. A primeira inverte os papéis dos eletrodos e apresenta ddp incorreta (o valor correto é 0,34 − (−0,76) = 1,10 V, não 0,42 V). A segunda mantém a ddp correta (1,10 V), mas inverte o sentido do fluxo de elétrons, que vai do ânodo (zinco) para o cátodo (cobre). A terceira inverte os papéis dos eletrodos: o cobre é o cátodo, onde Cu²⁺ sofre redução, e o zinco é o ânodo, onde Zn se oxida. A quarta é absurda, pois em uma pilha um eletrodo oxida e o outro reduz. A quarta é absurda, pois em uma pilha um eletrodo oxida e o outro reduz."
  },
  {
    "disciplina": "Matemática - Porcentagem",
    "enunciado": "Uma loja anuncia uma televisão por R$ 2.000,00 com desconto de 15% para pagamento à vista. Qual o valor a ser pago pelo cliente nessa condição?",
    "alternativas": [
      "R$ 1.700,00",
      "R$ 1.750,00",
      "R$ 1.800,00",
      "R$ 1.850,00",
      "R$ 1.650,00"
    ],
    "correta": 0,
    "comentario": "O desconto é 15% de 2.000 = 0,15 × 2.000 = R$ 300,00. Logo, o preço à vista é 2.000 − 300 = R$ 1.700,00. Atenção: a porcentagem incide sempre sobre o valor original, não sobre o já reajustado."
  },
  {
    "disciplina": "Matemática - Razão e proporção",
    "enunciado": "Uma receita de bolo para 8 pessoas pede 600 g de farinha. Quantos gramas de farinha serão necessários para servir 20 pessoas, mantidas as mesmas proporções?",
    "alternativas": [
      "2.000 g",
      "1.500 g",
      "1.800 g",
      "1.350 g",
      "1.200 g"
    ],
    "correta": 1,
    "comentario": "As grandezas são diretamente proporcionais: 600/8 = x/20 → x = 600 × 20 / 8 = 12.000/8 = 1.500 g. Monte a proporção sempre com as grandezas equivalentes na mesma coluna."
  },
  {
    "disciplina": "Matemática - Função do 1º grau",
    "enunciado": "Uma empresa de telefonia cobra R$ 0,60 por minuto de ligação mais uma taxa fixa de R$ 12,00 mensais. Qual expressão representa o valor total pago, em reais, por um cliente que fala x minutos no mês?",
    "alternativas": [
      "0,60x × 12",
      "(12 + 0,60) ÷ x",
      "0,60x + 12",
      "12x + 0,60",
      "12,60x"
    ],
    "correta": 2,
    "comentario": "O valor tem uma parte fixa (a taxa de R$ 12,00) e uma parte variável (R$ 0,60 por minuto). Portanto f(x) = 0,60·x + 12. O coeficiente de x é o custo por minuto; o termo independente é a taxa fixa."
  },
  {
    "disciplina": "Matemática - Estatística",
    "enunciado": "As notas de um aluno em cinco provas foram 6,0; 7,5; 8,0; 5,5 e 9,0. Qual é a média aritmética dessas notas?",
    "alternativas": [
      "8,0",
      "7,0",
      "6,8",
      "7,2",
      "7,5"
    ],
    "correta": 3,
    "comentario": "Soma = 6,0 + 7,5 + 8,0 + 5,5 + 9,0 = 36,0. Média = 36,0 ÷ 5 = 7,2. A média aritmética é a soma dos valores dividida pela quantidade de dados."
  },
  {
    "disciplina": "Matemática - Probabilidade",
    "enunciado": "Ao lançar um dado honesto de seis faces, qual a probabilidade de obter um número maior que 4?",
    "alternativas": [
      "5/6",
      "1/6",
      "3/6",
      "4/6",
      "2/6"
    ],
    "correta": 4,
    "comentario": "Os resultados possíveis são 6 (1 a 6) e os favoráveis são 2 (5 e 6). Logo P = 2/6 = 1/3. Probabilidade = casos favoráveis ÷ casos possíveis."
  },
  {
    "disciplina": "Matemática - Geometria",
    "enunciado": "Um terreno retangular mede 12 m de comprimento por 8 m de largura. O proprietário quer cercá-lo com três voltas de arame. Quantos metros de arame serão necessários?",
    "alternativas": [
      "120 m",
      "144 m",
      "48 m",
      "96 m",
      "60 m"
    ],
    "correta": 0,
    "comentario": "O perímetro do retângulo é 2 × (12 + 8) = 40 m. Como são três voltas: 3 × 40 = 120 m. Cuidado para não confundir área (12 × 8 = 96 m²) com perímetro — a cerca usa o perímetro."
  },
  {
    "disciplina": "Matemática - Logaritmo",
    "enunciado": "O valor de log₂ 32 é:",
    "alternativas": [
      "16",
      "5",
      "6",
      "4",
      "8"
    ],
    "correta": 1,
    "comentario": "log₂ 32 = x significa 2ˣ = 32. Como 2⁵ = 32, então x = 5. O logaritmo responde: '2 elevado a quanto dá 32?'"
  },
  {
    "disciplina": "Matemática - Progressão aritmética",
    "enunciado": "Em uma progressão aritmética cujo primeiro termo é 3 e a razão é 4, qual é o valor do 6º termo?",
    "alternativas": [
      "21",
      "25",
      "23",
      "19",
      "27"
    ],
    "correta": 2,
    "comentario": "Na PA, aₙ = a₁ + (n − 1)·r. Então a₆ = 3 + (6 − 1) × 4 = 3 + 20 = 23. Atenção: some a razão (n − 1) vezes, não n vezes."
  },
  {
    "disciplina": "Matemática - Juros simples",
    "enunciado": "Um capital de R$ 1.500,00 é aplicado a juros simples de 2% ao mês durante 5 meses. Qual o valor dos juros obtidos?",
    "alternativas": [
      "R$ 200,00",
      "R$ 75,00",
      "R$ 100,00",
      "R$ 150,00",
      "R$ 250,00"
    ],
    "correta": 3,
    "comentario": "Nos juros simples, J = C · i · t = 1.500 × 0,02 × 5 = R$ 150,00. O montante seria 1.500 + 150 = R$ 1.650,00 — a questão pede apenas os juros."
  },
  {
    "disciplina": "Matemática - Análise de gráficos",
    "enunciado": "Um gráfico de barras mostra que a produção de uma fábrica foi de 400 unidades em janeiro e 500 unidades em fevereiro. Qual foi o aumento percentual da produção de janeiro para fevereiro?",
    "alternativas": [
      "50%",
      "40%",
      "10%",
      "20%",
      "25%"
    ],
    "correta": 4,
    "comentario": "Aumento = 500 − 400 = 100 unidades. O percentual é calculado sobre o valor inicial (janeiro): 100/400 = 0,25 = 25%. Se calculasse sobre fevereiro, erraria a base."
  },
  {
    "disciplina": "Linguagens - Funções da linguagem",
    "enunciado": "Na frase 'O aquecimento global é provocado pela emissão de gases do efeito estufa', a função da linguagem predominante é a:",
    "alternativas": [
      "Referencial",
      "Metalinguística",
      "Conativa",
      "Emotiva",
      "Poética"
    ],
    "correta": 0,
    "comentario": "O foco está no contexto, na informação objetiva sobre o mundo — função referencial (ou denotativa), típica de textos informativos, científicos e jornalísticos."
  },
  {
    "disciplina": "Linguagens - Coesão e coerência",
    "enunciado": "Em 'Choveu muito durante a noite; ________, as ruas amanheceram alagadas', o conectivo que expressa corretamente a relação de consequência é:",
    "alternativas": [
      "por exemplo",
      "portanto",
      "embora",
      "além disso",
      "no entanto"
    ],
    "correta": 1,
    "comentario": "A segunda oração é consequência da primeira, então usamos um conectivo conclusivo: 'portanto', 'logo', 'assim', 'por isso'. 'No entanto' e 'embora' indicam oposição; 'além disso', adição."
  },
  {
    "disciplina": "Linguagens - Interpretação de texto",
    "enunciado": "Leia: 'A cidade cresceu, mas o saneamento básico não acompanhou esse crescimento.' A relação de sentido estabelecida pelo conectivo 'mas' é de:",
    "alternativas": [
      "Adição",
      "Tempo",
      "Oposição",
      "Causa",
      "Conclusão"
    ],
    "correta": 2,
    "comentario": "'Mas' é conjunção coordenativa adversativa: estabelece contraste entre duas ideias. Atenção: o crescimento (positivo) contrasta com a falta de saneamento (negativo)."
  },
  {
    "disciplina": "Literatura - Modernismo",
    "enunciado": "A obra 'Macunaíma', de Mário de Andrade, publicada em 1928, é considerada um marco do Modernismo brasileiro porque:",
    "alternativas": [
      "Rejeita qualquer influência da cultura popular.",
      "Retoma o ideal do herói indígena do Romantismo.",
      "Descreve exclusivamente a vida da aristocracia rural.",
      "Valoriza a fala coloquial e mistura elementos das culturas indígena, africana e europeia.",
      "Mantém a linguagem formal e os modelos parnasianos."
    ],
    "correta": 3,
    "comentario": "Macunaíma, o 'herói sem nenhum caráter', sintetiza as três raças formadoras e usa linguagem coloquial e experimental — marcas do Modernismo da fase heroica (1922-1930)."
  },
  {
    "disciplina": "Literatura - Romantismo",
    "enunciado": "No Romantismo brasileiro, a idealização do indígena como herói nacional, presente em obras como 'Iracema', de José de Alencar, caracteriza a fase:",
    "alternativas": [
      "Byroniana",
      "Parnasiana",
      "Condoreira",
      "Realista",
      "Indianista"
    ],
    "correta": 4,
    "comentario": "A fase indianista (ou nacionalista) idealiza o índio como símbolo de identidade nacional. A fase condoreira é social e abolicionista (Castro Alves); a byroniana aborda o egocentrismo e a morte."
  },
  {
    "disciplina": "Redação - Estrutura dissertativa",
    "enunciado": "Em uma redação dissertativo-argumentativa do ENEM, a TESE deve ser apresentada:",
    "alternativas": [
      "Na introdução, como o ponto de vista que será defendido.",
      "Em qualquer parágrafo, desde que apareça.",
      "Somente nos desenvolvimentos, em cada argumento.",
      "Apenas na conclusão, para surpreender o leitor.",
      "No título, que é obrigatório na prova do ENEM."
    ],
    "correta": 0,
    "comentario": "A tese é o seu posicionamento sobre o tema e deve aparecer na introdução, orientando todo o texto e sendo retomada na conclusão. O ENEM não exige título."
  },
  {
    "disciplina": "Redação - Proposta de intervenção",
    "enunciado": "Qual das propostas abaixo está MAIS completa, atendendo aos elementos exigidos pelo ENEM?",
    "alternativas": [
      "A educação é um problema que afeta a todos.",
      "O governo deve fazer algo para melhorar a educação.",
      "Todos precisam estudar mais para o país crescer.",
      "É preciso que as escolas invistam mais em qualidade.",
      "O Ministério da Educação deve ampliar a formação de professores por meio de cursos semestrais, para garantir a qualidade do ensino."
    ],
    "correta": 1,
    "comentario": "A proposta completa tem agente (Ministério da Educação), ação (ampliar a formação), modo/meio (cursos semestrais) e efeito/finalidade (garantir a qualidade). As outras são genéricas e vagas."
  },
  {
    "disciplina": "Linguagens - Voz passiva",
    "enunciado": "A frase 'O livro foi lido pelo aluno' está na:",
    "alternativas": [
      "Voz ativa",
      "Voz verbal",
      "Voz passiva analítica",
      "Voz reflexiva",
      "Voz impessoal"
    ],
    "correta": 2,
    "comentario": "A construção 'foi lido' (verbo ser + particípio + pelo agente) caracteriza a voz passiva analítica. Na ativa seria 'O aluno leu o livro'."
  },
  {
    "disciplina": "Linguagens - Crase",
    "enunciado": "Em 'Entreguei o trabalho ___ professora', a justificativa para o uso ou não da crase é:",
    "alternativas": [
      "Não ocorre crase porque 'professora' é substantativo masculino.",
      "A crase é opcional e não muda o sentido.",
      "Ocorre crase sempre antes de substantivos femininos.",
      "Ocorre crase, pois há a preposição 'a' (de entregar) encontrando o artigo 'a' (de professora).",
      "Não ocorre crase porque verbos transitivos diretos não pedem preposição."
    ],
    "correta": 3,
    "comentario": "'Entregar a alguém' pede preposição 'a', e 'a professora' tem o artigo definido feminino 'a'. A fusão dos dois gera a crase: 'à professora'. Crase não é regra automática antes de mulher — precisa da preposição."
  },
  {
    "disciplina": "Literatura - Realismo",
    "enunciado": "Em 'Memórias Póstumas de Brás Cubas', de Machado de Assis, a inovação narrativa está principalmente:",
    "alternativas": [
      "No narrador indígena que descreve a natureza brasileira.",
      "No uso exclusivo de versos e métrica clássica.",
      "No enredo linear e otimista sobre a ascensão social.",
      "Na descrição heroica das batalhas do Império.",
      "No narrador defunto, irônico e metalinguístico, que questiona a própria veracidade do relato."
    ],
    "correta": 4,
    "comentario": "Machado inova com o narrador defunto — que escreve «de além-túmulo» —, com a ironia e com a metalinguagem: o próprio ato de escrever e as dúvidas sobre a veracidade do relato tornam-se parte da obra, rompendo com a linearidade realista."
  },
  {
    "disciplina": "História - Grécia Antiga",
    "enunciado": "A democracia ateniense do século V a.C. é frequentemente citada como origem da democracia ocidental. É correto afirmar que ela era:",
    "alternativas": [
      "Direta, com a participação pessoal dos cidadãos nas decisões da Assembleia.",
      "Representativa, com deputados eleitos por todos os habitantes.",
      "Exercida por um conselho de filósofos eleitos vitalícios.",
      "Controlada pelos sacerdotes do templo de Apolo.",
      "Universal, incluindo mulheres, estrangeiros e escravizados."
    ],
    "correta": 0,
    "comentario": "A democracia ateniense era direta: os cidadãos (homens atenienses, livres e maiores de idade) deliberavam pessoalmente na Eclésia, assembleia que se reunia no Pnyx; a Ágora era o espaço público de comércio e circulação. Mulheres, metecos e escravizados — a maioria da população — não participavam."
  },
  {
    "disciplina": "História - Roma Antiga",
    "enunciado": "As prolongadas revoltas dos plebeus romanos resultaram, por volta de 450 a.C., na elaboração da/o:",
    "alternativas": [
      "Édito de Nantes.",
      "Lei das Doze Tábuas.",
      "Tratado de Latrão.",
      "Corpus Juris Civilis.",
      "Código de Hamurábi."
    ],
    "correta": 1,
    "comentario": "A pressão dos plebeus obrigou o Senado a escrever as leis, antes costumeiras e controladas pelos patrícios: nasce a Lei das Doze Tábuas, marco do direito escrito no Ocidente."
  },
  {
    "disciplina": "História - Idade Média",
    "enunciado": "No sistema feudal europeu, a relação de vassalagem baseava-se fundamentalmente:",
    "alternativas": [
      "No comércio marítimo entre os feudos e o Império Bizantino.",
      "No pagamento de salários em moeda aos camponeses.",
      "Na troca de terra (feudo) por fidelidade e serviço militar.",
      "Na escravidão por dívidas dos trabalhadores urbanos.",
      "Na eleição direta dos senhores feudais pelo povo."
    ],
    "correta": 2,
    "comentario": "A vassalagem era um laço pessoal: o suserano concedia o feudo e proteção; o vassalo devia fidelidade e auxílio militar. O servo não era escravo — estava preso à terra, mas tinha direitos costumeiros."
  },
  {
    "disciplina": "História - Revolução Industrial",
    "enunciado": "Uma das principais consequências sociais da Revolução Industrial na Inglaterra do século XVIII foi:",
    "alternativas": [
      "A distribuição igualitária dos lucros entre operários e patrões.",
      "O fim imediato do trabalho infantil nas fábricas.",
      "A redução do êxodo rural e o retorno da população ao campo.",
      "A formação de duas novas classes: a burguesia industrial e o proletariado.",
      "A valorização do artesanato em detrimento das máquinas."
    ],
    "correta": 3,
    "comentario": "A fábrica concentrou os trabalhadores e criou o proletariado, oposto à burguesia dona dos meios de produção. Jornas de 14 a 16 horas, trabalho infantil e bairros insalubres marcaram o período."
  },
  {
    "disciplina": "História - Brasil Colônia",
    "enunciado": "O sistema de Capitanias Hereditárias, implantado por Portugal em 1534, tinha como principal objetivo:",
    "alternativas": [
      "Expandir o protestantismo no Novo Mundo.",
      "Impedir a extração do pau-brasil.",
      "Criar assembleias legislativas eleitas nas colônias.",
      "Distribuir terras igualitariamente entre os colonos pobres.",
      "Povoar e defender o território colonial com baixo custo para a Coroa."
    ],
    "correta": 4,
    "comentario": "As capitanias dividiam o litoral brasileiro em lotes doados a donatários com amplos poderes — solução barata para um império sem recursos. A maioria fracassou; prosperaram São Vicente e Pernambuco, onde se firmou o açúcar."
  },
  {
    "disciplina": "História - República Velha",
    "enunciado": "A 'Política dos Governadores', articulada no governo de Campos Salles, consistia em:",
    "alternativas": [
      "Um acordo de apoio mútuo entre o Presidente da República e os governadores estaduais.",
      "Um programa de distribuição de terras aos trabalhadores rurais.",
      "Uma política de privatização das estradas de ferro.",
      "Um sistema de votação universal e secreto para todos os brasileiros.",
      "Uma aliança militar do Brasil com a Inglaterra."
    ],
    "correta": 0,
    "comentario": "O Presidente garantia os governadores estaduais e, em troca, recebia o apoio deles nas eleições de deputados e na sua própria eleição. Era a base da República Oligárquica."
  },
  {
    "disciplina": "História - Era Vargas",
    "enunciado": "A criação da Consolidação das Leis do Trabalho (CLT), em 1943, durante o governo Vargas, representa:",
    "alternativas": [
      "A retomada das práticas de trabalho escravo.",
      "A concessão estatal de direitos trabalhistas, com controle do Estado sobre os sindicatos.",
      "A conquista autônoma dos sindicatos operários.",
      "A adoção do liberalismo econômico sem intervenção do Estado.",
      "A extinção dos sindicatos no Brasil."
    ],
    "correta": 1,
    "comentario": "O trabalhismo varguista criou direitos (salário mínimo, CLT, Justiça do Trabalho), mas de cima para baixo, com sindicatos oficiais controlados pelo Estado — uma cidadania concedida, não conquistada."
  },
  {
    "disciplina": "História - Ditadura Militar",
    "enunciado": "O Ato Institucional nº 5 (AI-5), editado em 1968, é considerado o ápice do autoritarismo porque:",
    "alternativas": [
      "Instituiu eleições diretas para presidente.",
      "Concedeu anistia ampla aos presos políticos.",
      "Suspendeu garantias constitucionais, permitindo cassar mandatos e fechar o Congresso.",
      "Restaurou a monarquia no Brasil.",
      "Extinguiu voluntariamente os partidos políticos."
    ],
    "correta": 2,
    "comentario": "O AI-5 deu poder ao Executivo para cassar mandatos, suspender direitos políticos e intervir nos estados. Foi revogado em 1978, pela Emenda Constitucional nº 11, no curso da abertura política iniciada em 1974."
  },
  {
    "disciplina": "História - Abolição",
    "enunciado": "A Lei Áurea, assinada em 13 de maio de 1888, é historicamente importante porque:",
    "alternativas": [
      "Proclamou a independência do Brasil.",
      "Concedeu voto universal a todas as mulheres.",
      "Criou o sistema de capitanias hereditárias.",
      "Aboliu formalmente a escravidão no Brasil, sem garantir acesso à terra ou à educação aos libertos.",
      "Instituiu a República Presidencialista."
    ],
    "correta": 3,
    "comentario": "A abolição encerrou a escravidão formal, mas não distribuiu terras, educação ou cidadania plena. A população negra permaneceu em desvantagem — desigualdade que ainda hoje é tema central do ENEM."
  },
  {
    "disciplina": "Geografia - Urbanização",
    "enunciado": "O crescimento acelerado e concentrado de uma cidade que passa a comandar a economia e os serviços de toda uma região é denominado:",
    "alternativas": [
      "Gentrificação.",
      "Desmetropolização.",
      "Conurbação.",
      "Metropolização difusa.",
      "Macrocefalia urbana."
    ],
    "correta": 4,
    "comentario": "A macrocefalia urbana é o crescimento exagerado de uma cidade (ou metrópole) que concentra população, renda e serviços — sintoma clássico da urbanização tardia e desigual do Brasil."
  },
  {
    "disciplina": "Geografia - Segregação socioespacial",
    "enunciado": "A construção de condomínios fechados com muros, câmeras e segurança privada nas grandes cidades brasileiras é um exemplo de:",
    "alternativas": [
      "Segregação socioespacial voluntária.",
      "Revitalização do centro histórico.",
      "Descentralização industrial.",
      "Expansão da malha viária.",
      "Conurbação planejada."
    ],
    "correta": 0,
    "comentario": "Quando as elites se isolam voluntariamente em espaços murados, ocorre a segregação voluntária — o oposto da segregação imposta, em que os mais pobres são empurrados para periferias sem infraestrutura."
  },
  {
    "disciplina": "Geografia - População",
    "enunciado": "A fase da transição demográfica em que a taxa de natalidade começa a cair, reduzindo o ritmo de crescimento populacional, caracteriza:",
    "alternativas": [
      "O regime populacional inicial, de altas natalidade e mortalidade.",
      "A desaceleração do crescimento.",
      "O declínio populacional absoluto.",
      "A explosão demográfica.",
      "O equilíbrio migratório."
    ],
    "correta": 1,
    "comentario": "Na transição demográfica, primeiro cai a mortalidade (explosão demográfica); depois cai a natalidade (crescimento desacelera); por fim ambas ficam baixas e a população envelhece — situação do Brasil atual."
  },
  {
    "disciplina": "Geografia - Migrações",
    "enunciado": "O deslocamento de pessoas do campo para a cidade, motivado principalmente pela mecanização da agricultura e pela oferta de empregos urbanos, é chamado de:",
    "alternativas": [
      "Transumância.",
      "Diáspora religiosa.",
      "Êxodo rural.",
      "Migração de retorno.",
      "Nomadismo."
    ],
    "correta": 2,
    "comentario": "O êxodo rural alimentou a urbanização brasileira no século XX. Ele se diferencia da transumância (deslocamento periódico) e do nomadismo (sem residência fixa)."
  },
  {
    "disciplina": "Geografia - Geopolítica",
    "enunciado": "A formação de blocos econômicos como o Mercosul tem como um dos principais objetivos:",
    "alternativas": [
      "Padronizar as moedas de todos os países da América do Sul.",
      "Unificar os sistemas políticos em um único governo.",
      "Impedir a entrada de investimentos estrangeiros.",
      "Reduzir as tarifas de comércio e aumentar a integração entre os países membros.",
      "Isolar economicamente os países membros do resto do mundo."
    ],
    "correta": 3,
    "comentario": "Blocos econômicos buscam integração comercial (redução de tarifas, regras comuns). O Mercosul é uma união aduaneira, não uma união monetária — cada país mantém sua moeda."
  },
  {
    "disciplina": "Geografia - Fontes de energia",
    "enunciado": "Entre as fontes de energia abaixo, a única considerada RENOVÁVEL é:",
    "alternativas": [
      "Urânio.",
      "Gás natural.",
      "Carvão mineral.",
      "Petróleo.",
      "Energia solar."
    ],
    "correta": 4,
    "comentario": "Renováveis são as que se regeneram em escala humana: solar, eólica, hídrica, biomassa. Petróleo, carvão, gás e urânio (nuclear) são fósseis ou finitos — portanto, não renováveis."
  },
  {
    "disciplina": "Geografia - Meio ambiente",
    "enunciado": "O aumento da concentração de dióxido de carbono (CO₂) na atmosfera, resultante principalmente da queima de combustíveis fósseis, está associado:",
    "alternativas": [
      "À intensificação do efeito estufa e ao aquecimento global.",
      " À formação da aurora boreal.",
      "À diminuição da chuva ácida nos centros urbanos.",
      "À redução da camada de ozônio na estratosfera.",
      "Ao aumento da biodiversidade nos oceanos."
    ],
    "correta": 0,
    "comentario": "O CO₂ é um gás de efeito estufa: sua maior concentração retém mais calor, intensificando o efeito estufa. Atenção: o buraco na camada de ozônio é outro problema, causado pelos CFCs."
  },
  {
    "disciplina": "Geografia - Relevo",
    "enunciado": "A formação de voçorocas em áreas urbanas está diretamente relacionada:",
    "alternativas": [
      "Ao resfriamento brusco do solo nas madrugadas de inverno.",
      "À erosão causada pelo escoamento da água em solo desprotegido.",
      "À ação do vento sobre dunas litorâneas.",
      "Ao movimento das placas tectônicas.",
      "À deposição de sedimentos em fundos de rio."
    ],
    "correta": 1,
    "comentario": "Voçorocas são grandes erosões provocadas pela água da chuva escorrendo em solo sem vegetação — agravadas pela remoção da cobertura vegetal e pelo manejo inadequado do solo."
  },
  {
    "disciplina": "Geografia - Clima",
    "enunciado": "O fenômeno climático caracterizado pelo aquecimento anormal das águas do Oceano Pacífico Equatorial, que altera o regime de chuvas no Brasil, é denominado:",
    "alternativas": [
      "Monção.",
      "La Niña.",
      "El Niño.",
      "Efeito estufa.",
      "Inversão térmica."
    ],
    "correta": 2,
    "comentario": "O El Niño aquece as águas do Pacífico equatorial e provoca seca no Norte do Brasil e chuvas no Sul. A La Niña é o fenômeno oposto (resfriamento anormal)."
  },
  {
    "disciplina": "Geografia - Geopolítica",
    "enunciado": "A divergência entre o conceito de Estado e o de nação evidencia-se quando:",
    "alternativas": [
      "Um Estado não mantém relações com outros países.",
      "Um Estado possui um único povo e uma única cultura.",
      "Um Estado não possui governo organizado.",
      "Um Estado abriga diferentes nações em seu território, como ocorre em países multiétnicos.",
      "Uma nação não possui território definido, mas exerce soberania."
    ],
    "correta": 3,
    "comentario": "Estado é a organização política com território, governo e soberania; nação é o povo com identidade cultural comum. Quando várias nações coexistem em um Estado, há divergência entre os dois conceitos."
  },
  {
    "disciplina": "Geografia - População",
    "enunciado": "O 'bônus demográfico', apontado como uma oportunidade econômica para o Brasil, ocorre quando:",
    "alternativas": [
      "A taxa de fecundidade total aumenta acima de 3 filhos por mulher.",
      "A taxa de natalidade supera a de mortalidade de forma acentuada.",
      "A população idosa duplica a cada década.",
      "O número de imigrantes supera o de emigrantes.",
      "A população em idade ativa torna-se maior que a população dependente (jovens e idosos)."
    ],
    "correta": 4,
    "comentario": "O bônus demográfico é a janela em que há mais pessoas em idade de trabalhar do que dependentes. Ele exige investimento em educação e emprego — caso contrário, torna-se um passivo social."
  },
  {
    "disciplina": "Sociologia - Estado (Weber)",
    "enunciado": "Max Weber definiu o Estado moderno como a entidade que detém:",
    "alternativas": [
      "O monopólio do uso legítimo da força física dentro de um território.",
      "A propriedade de todas as terras produtivas.",
      "O controle de todos os meios de comunicação.",
      "O direito de definir a religião oficial do país.",
      "O monopólio do comércio internacional."
    ],
    "correta": 0,
    "comentario": "Para Weber, o Estado é a única instituição que pode usar a força de forma legítima (exército, polícia) dentro de um território. As demais formas de violência são consideradas ilegítimas ou criminosas."
  },
  {
    "disciplina": "Sociologia - Indústria cultural",
    "enunciado": "Para Theodor Adorno e Max Horkheimer, o conceito de 'indústria cultural' refere-se:",
    "alternativas": [
      "Ao desenvolvimento das artes plásticas de vanguarda.",
      "À produção de bens culturais em série, tratados como mercadorias.",
      "Ao regime de trabalho dos artistas em cooperativas.",
      "Ao conjunto de museus e centros culturais mantidos pelo Estado.",
      "À preservação do folclore e das culturas tradicionais."
    ],
    "correta": 1,
    "comentario": "A indústria cultural transforma a cultura em produto padronizado, gerando passividade e dificultando o pensamento crítico. É um conceito da Escola de Frankfurt, do livro 'Dialética do Esclarecimento' (1947)."
  },
  {
    "disciplina": "Sociologia - Capital cultural (Bourdieu)",
    "enunciado": "O conceito de 'capital cultural', formulado por Pierre Bourdieu, designa:",
    "alternativas": [
      "O total de recursos financeiros investidos em escolas.",
      "O valor venal dos imóveis de uma cidade.",
      "O conjunto de conhecimentos, gostos e habilidades adquiridos pelo indivíduo.",
      "O montante de impostos destinados à cultura.",
      "O número de obras de arte de uma coleção privada."
    ],
    "correta": 2,
    "comentario": "Bourdieu mostrou que existem capitais além do econômico: o cultural (conhecimentos, domínio da linguagem), o social (rede de contatos) e o simbólico (prestígio). A escola valoriza o capital cultural das elites."
  },
  {
    "disciplina": "Sociologia - Movimentos sociais",
    "enunciado": "Os movimentos sociais caracterizam-se como:",
    "alternativas": [
      " Órgãos do governo responsáveis pela assistência social.",
      "Partidos políticos registrados oficialmente.",
      "Empresas que atuam no setor de serviços.",
      "Ações coletivas que buscam transformações sociais ou a defesa de direitos de grupos.",
      "Iniciativas individuais sem organização política."
    ],
    "correta": 3,
    "comentario": "Movimentos sociais são ações coletivas organizadas em torno de causas — como o movimento negro, o feminista e o ambientalista. Diferem de partidos porque não disputam eleições, mas pressionam por mudanças."
  },
  {
    "disciplina": "Filosofia - Pré-socráticos",
    "enunciado": "A principal busca dos filósofos pré-socráticos era identificar:",
    "alternativas": [
      "Os caminhos para a salvação da alma.",
      "As regras do convívio político na cidade.",
      "As leis que regem a moral dos deuses.",
      "As técnicas de persuasão nos tribunais.",
      "O princípio originário (arché) e a ordem da natureza (physis)."
    ],
    "correta": 4,
    "comentario": "Os pré-socráticos substituíram a explicação mítica (mythos) pela razão (logos) e buscaram a arché, o princípio único de que tudo é feito — Tales dizia ser a água; Heráclito, o fogo."
  },
  {
    "disciplina": "Filosofia - Sócrates",
    "enunciado": "A 'maiêutica' socrática consistia em:",
    "alternativas": [
      "Um método de perguntas que levava o interlocutor a perceber a verdade por si mesmo.",
      "Um sistema político de governo dos filósofos.",
      "Uma técnica de memorização de textos clássicos.",
      "Um conjunto de regras para a escrita filosófica.",
      "Transmitir conhecimentos prontos aos discípulos."
    ],
    "correta": 0,
    "comentario": "Sócrates comparava seu método ao trabalho da parteira: não coloca ideias de fora, mas ajuda o interlocutor a 'dar à luz' o conhecimento que já possui em potência, por meio do diálogo e da dúvida."
  },
  {
    "disciplina": "Filosofia - Ética (Kant)",
    "enunciado": "O Imperativo Categórico, formulado por Immanuel Kant, estabelece que devemos agir:",
    "alternativas": [
      "Conforme a vontade dos mais fortes.",
      "De modo que a nossa ação possa valer como lei universal.",
      "Somente quando houver aprovação religiosa.",
      "Conforme os costumes da nossa sociedade.",
      "Sempre em busca do maior prazer possível."
    ],
    "correta": 1,
    "comentario": "Para Kant, a moral não se baseia nas consequências nem nos costumes, mas no dever ditado pela razão. Uma ação é moral se você puder querer que todos ajam assim, sem contradição."
  },
  {
    "disciplina": "Filosofia - Contratualismo",
    "enunciado": "Para John Locke, os direitos naturais e inalienáveis de todo ser humano são:",
    "alternativas": [
      "Terra, casa e família.",
      "Riqueza, poder e glória.",
      "Vida, liberdade e propriedade.",
      "Trabalho, lazer e educação.",
      "Religião, exército e Estado."
    ],
    "correta": 2,
    "comentario": "Locke defende que, antes do Estado, as pessoas já possuem direitos naturais: vida, liberdade e propriedade. O governo existe para proteger esses direitos — se falhar, o povo pode substituí-lo."
  },
  {
    "disciplina": "Filosofia - Sócrates e Platão",
    "enunciado": "A frase atribuída a Sócrates 'Só sei que nada sei' expressa a atitude filosófica de:",
    "alternativas": [
      "Negar a existência do mundo sensível.",
      "Defender que o conhecimento é impossível.",
      "Afirmar que apenas os deuses detêm a verdade.",
      "Reconhecer os limites do próprio saber como ponto de partida da investigação.",
      "Aceitar qualquer opinião como verdadeira."
    ],
    "correta": 3,
    "comentario": "A ignorância socrática não é desistir de conhecer, mas reconhecer que as certezas imediatas são frágeis. É a partir da dúvida que se começa a filosofia — a busca rigorosa pelo saber."
  },
  {
    "disciplina": "Inglês - Falsos cognatos",
    "enunciado": "A frase 'The manager actually pushed for new social investments last week' indica que o gerente:",
    "alternativas": [
      "Atualmente adiou os projetos planejados.",
      "Financiará os custos sozinho e em segredo.",
      "Atualmente puxou os investimentos.",
      "Escondeu os relatórios de investimento antigos.",
      "Na verdade pressionou a favor de novos investimentos sociais."
    ],
    "correta": 4,
    "comentario": "'Actually' significa 'na verdade', não 'atualmente'. 'Pushed for' é um phrasal verb que significa 'pressionou a favor de' (e não 'empurrou'). 'Actually', sim, é um falso cognato clássico do ENEM, muito cobrado na prova."
  },
  {
    "disciplina": "Inglês - Conectores",
    "enunciado": "Na frase 'The project is expensive; __________, it is very efficient', o conector que expressa corretamente a ideia de contraste é:",
    "alternativas": [
      "Nevertheless.",
      "Consequently.",
      "Moreover.",
      "Besides.",
      "Therefore."
    ],
    "correta": 0,
    "comentario": "'Nevertheless' (ou however) indica contraste: algo é caro, mas eficiente. 'Moreover' e 'besides' adicionam informações; 'therefore' e 'consequently' indicam conclusão."
  },
  {
    "disciplina": "Inglês - Interpretação",
    "enunciado": "Na frase 'We are committed to reducing our carbon footprint by 50% by 2030', o termo 'committed' indica que a empresa está:",
    "alternativas": [
      "Cometendo um erro de planejamento.",
      "Comprometida e empenhada em atingir a meta.",
      "Cancelando os investimentos ambientais.",
      "Obrigada por lei a fechar suas fábricas.",
      "Confundida sobre os prazos."
    ],
    "correta": 1,
    "comentario": "'Committed to' significa 'comprometido com/empenhado em'. É vocabulário muito frequente em relatórios de sustentabilidade cobrados pelo ENEM."
  },
  {
    "disciplina": "Inglês - Condicionais",
    "enunciado": "Na frase 'If we had known about the traffic, we would have left earlier', a estrutura utilizada é a:",
    "alternativas": [
      "Second Conditional (hipótese no presente).",
      "First Conditional (probabilidade futura).",
      "Third Conditional (hipótese sobre o passado).",
      "Zero Conditional (fatos científicos).",
      "Present Continuous (ação em andamento)."
    ],
    "correta": 2,
    "comentario": "'If + had + particípio' com 'would have + particípio' trata de algo que NÃO aconteceu no passado — é a Third Conditional. Na Second Conditional usaríamos 'If we knew... we would leave'."
  },
  {
    "disciplina": "Inglês - Interpretação",
    "enunciado": "Na frase 'Although the weather was bad, the concert went on as planned', o termo 'Although' introduz uma ideia de:",
    "alternativas": [
      "Conclusão.",
      "Causa.",
      "Condição.",
      "Concessão (contraste).",
      "Adição."
    ],
    "correta": 3,
    "comentario": "'Although' (embora) é um conectivo de concessão: apresenta um obstáculo que não impediu a ação principal. A ideia central da frase é que o show aconteceu."
  },
  {
    "disciplina": "Espanhol - Falsos cognatos",
    "enunciado": "Em espanhol, dizer que uma mulher está 'embarazada' significa que ela está:",
    "alternativas": [
      "Envergonhada.",
      "Com fome.",
      "Cansada.",
      "Confusa.",
      "Grávida."
    ],
    "correta": 4,
    "comentario": "'Embarazada' = grávida. É um dos falsos cognatos mais cobrados: em português 'embaraçada' significa envergonhada, mas em espanhol o termo tem outro sentido."
  },
  {
    "disciplina": "Espanhol - Falsos cognatos",
    "enunciado": "A palavra espanhola 'largo' significa:",
    "alternativas": [
      "Comprido (extenso).",
      "Largo (largura).",
      "Pesado.",
      "Demorado.",
      "Apertado."
    ],
    "correta": 0,
    "comentario": "'Largo' = comprido, extenso. Já 'ancho' é que significa 'largo' (largura). É um par de falsos cognatos que inverte o sentido em relação ao português — pegadinha frequente."
  },
  {
    "disciplina": "Espanhol - Conectores",
    "enunciado": "Na frase 'Quiero ir al cine, pero no tengo dinero', o conector 'pero' expressa:",
    "alternativas": [
      "Uma causa.",
      "Uma oposição (adversativa).",
      "Uma consequência.",
      "Uma finalidade.",
      "Uma condição."
    ],
    "correta": 1,
    "comentario": "'Pero' (mas) é conectivo adversativo, que estabelece contraste entre a vontade de ir ao cinema e a falta de dinheiro. Em espanhol, 'pero' e 'sino' têm usos distintos."
  },
  {
    "disciplina": "Espanhol - Conectores",
    "enunciado": "O conector 'sin embargo' é equivalente, em português, a:",
    "alternativas": [
      "Em seguida.",
      "Portanto.",
      "No entanto.",
      "Por exemplo.",
      "Além disso."
    ],
    "correta": 2,
    "comentario": "'Sin embargo' = 'no entanto', introduz contraste. É um dos marcadores mais úteis para a interpretação de textos jornalísticos e de opinião em espanhol."
  },
  {
    "disciplina": "Espanhol - Interpretação",
    "enunciado": "No trecho 'Mañana iremos al cine', o advérbio 'mañana' refere-se a:",
    "alternativas": [
      "A noite.",
      "A tarde.",
      "Nunca.",
      "Amanhã.",
      "Hoje."
    ],
    "correta": 3,
    "comentario": "'Mañana' pode significar 'manhã' (substantivo) ou 'amanhã' (advérbio). Nesta frase, funciona como advérbio de tempo: 'amanhã iremos ao cinema'. Atenção à dupla possibilidade de sentido."
  }
];

if (typeof window !== "undefined") {
  window.SIMULADO_QUESTOES = SIMULADO_QUESTOES;
}
