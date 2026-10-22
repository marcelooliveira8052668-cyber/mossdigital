/* Questoes extras para o simulado — lote 2 (Ciencias da Natureza e Matematica) */
const QUESTOES_EXTRA_2 = [
  {
    disciplina: "Biologia - Citologia",
    enunciado: "Durante a meiose de uma célula animal com 2n = 46 cromossomos, ocorre o pareamento dos homólogos na prófase I e a separação desses homólogos na anáfase I. Quantos cromossomos terá cada célula resultante ao final da meiose I?",
    alternativas: [
      "46 cromossomos, cada um com duas cromátides irmãs",
      "23 cromossomos, cada um com uma cromátide",
      "23 cromossomos, cada um ainda com duas cromátides irmãs",
      "92 cromossomos, cada um com duas cromátides irmãs",
      "46 cromossomos, cada um com uma cromátide"
    ],
    correta: 2,
    comentario: "A meiose I é reducional: os cromossomos homólogos se separam, de modo que cada célula-filha recebe 23 cromossomos, ou seja, a metade de 46. Nessa fase ainda não houve divisão dos centrômeros, portanto cada cromossomo continua com duas cromátides irmãs. A separação das cromátides ocorre apenas na meiose II, quando se formam células com 23 cromossomos de uma cromátide cada."
  },
  {
    disciplina: "Biologia - Fotossíntese",
    enunciado: "A equação simplificada da fotossíntese, considerando que o O₂ liberado provém da água, é 6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂. Quantos mols de oxigênio são liberados na síntese de 3 mols de glicose?",
    alternativas: [
      "18 mols",
      "6 mols",
      "3 mols",
      "9 mols",
      "36 mols"
    ],
    correta: 0,
    comentario: "Pela proporção estequiométrica da equação, 1 mol de glicose corresponde a 6 mols de O₂. Assim, para 3 mols de glicose: 3 × 6 = 18 mols de O₂. Atenção: o oxigênio liberado vem da quebra da água (fotólise), e não do gás carbônico, fato demonstrado com o uso de isótopos marcados."
  },
  {
    disciplina: "Biologia - Respiração celular",
    enunciado: "Na respiração celular aeróbia completa de 1 mol de glicose, obtêm-se cerca de 30 a 32 mols de ATP. Considerando o saldo de ATP produzido diretamente na glicólise (2 ATP) e no ciclo de Krebs (2 ATP), quantos mols de ATP são gerados por fosforilação em nível de substrato?",
    alternativas: [
      "2 mols",
      "6 mols",
      "10 mols",
      "32 mols",
      "4 mols"
    ],
    correta: 4,
    comentario: "A fosforilação em nível de substrato ocorre na glicólise, com saldo de 2 ATP (4 produzidos e 2 consumidos na fase de investimento), e no ciclo de Krebs, com 1 ATP por acetil-CoA, totalizando 2 ATP. Logo, 2 + 2 = 4 mols de ATP. O restante, cerca de 26 a 28 mols, provém da cadeia de transporte de elétrons nas cristas mitocondriais, por fosforilação oxidativa."
  },
  {
    disciplina: "Biologia - Genética",
    enunciado: "Em ervilhas, a cor amarela da semente (A) é dominante sobre a verde (a). Dois indivíduos heterozigotos (Aa × Aa) são cruzados. Qual a proporção fenotípica esperada entre os descendentes?",
    alternativas: [
      "1:2:1 (homozigotos dominantes, heterozigotos e homozigotos recessivos)",
      "3 descendentes amarelos para 1 verde",
      "1:1, metade amarela e metade verde",
      "9:3:3:1",
      "todos os descendentes amarelos"
    ],
    correta: 1,
    comentario: "O cruzamento Aa × Aa produz os genótipos 1 AA : 2 Aa : 1 aa. Como A é dominante, tanto AA quanto Aa expressam o fenótipo amarelo, resultando em 3 amarelos : 1 verde. A proporção 1:2:1 é genotípica; 9:3:3:1 corresponde à segregação independente de dois caracteres; 1:1 resulta do cruzamento-teste (Aa × aa)."
  },
  {
    disciplina: "Biologia - Genética (daltonismo)",
    enunciado: "O daltonismo é uma característica recessiva ligada ao cromossomo X (Xᵈ). Uma mulher de visão normal, cujo pai é daltônico, tem filhos com um homem de visão normal. Qual a probabilidade de cada filho do casal, independentemente do sexo, ser daltônico?",
    alternativas: [
      "50%",
      "0%",
      "75%",
      "25%",
      "100%"
    ],
    correta: 3,
    comentario: "O pai da mulher é daltônico (XᵈY), portanto ela recebeu obrigatoriamente o Xᵈ. Como tem visão normal, seu genótipo é XᴰXᵈ, ou seja, é portadora. O marido é XᴰY. As combinações possíveis, em proporções iguais, são XᴰXᴰ, XᴰXᵈ, XᴰY e XᵈY. Apenas XᵈY é daltônico, logo a probabilidade é 1 em 4, isto é, 25%."
  },
  {
    disciplina: "Biologia - Ecologia",
    enunciado: "Em um ambiente aquático observa-se a cadeia alimentar: alga → microcrustáceo → lambari → peixe maior → garça. Quantos níveis tróficos estão presentes nessa cadeia?",
    alternativas: [
      "2 níveis",
      "3 níveis",
      "4 níveis",
      "6 níveis",
      "5 níveis"
    ],
    correta: 4,
    comentario: "Cada organismo ocupa um nível trófico: alga (produtor, 1º), microcrustáceo (consumidor primário, 2º), lambari (consumidor secundário, 3º), peixe maior (consumidor terciário, 4º) e garça (consumidor quaternário, 5º). Há, portanto, 5 níveis tróficos. As setas indicam o sentido da transferência de energia e matéria, e não quem come quem."
  },
  {
    disciplina: "Biologia - Evolução",
    enunciado: "Sobre as teorias evolutivas, qual afirmação está de acordo com a teoria sintética da evolução (neodarwinismo)?",
    alternativas: [
      "Os organismos se adaptam ao meio durante a vida e transmitem essas adaptações adquiridas aos descendentes.",
      "As mutações e a recombinação gênica geram variabilidade, e a seleção natural aumenta a frequência dos alelos vantajosos na população.",
      "A evolução ocorre exclusivamente pelo uso e desuso dos órgãos, que se desenvolvem conforme a necessidade.",
      "A seleção natural age sobre caracteres adquiridos, modificando-os diretamente nas gerações seguintes.",
      "O ambiente provoca mutações dirigidas que beneficiam os indivíduos que delas necessitam."
    ],
    correta: 1,
    comentario: "O neodarwinismo integra a genética à seleção natural: a variabilidade genética surge ao acaso, por mutação e recombinação, e a seleção natural atua sobre fenótipos herdáveis, aumentando a frequência dos alelos que conferem maior aptidão. A transmissão de caracteres adquiridos (uso e desuso) é uma ideia lamarckista, refutada; o ambiente não provoca mutações dirigidas aos indivíduos, ele apenas seleciona as variações já existentes."
  },
  {
    disciplina: "Biologia - Vacinas e imunidade",
    enunciado: "As vacinas são uma das principais formas de prevenção de doenças infecciosas. Qual afirmação descreve corretamente seu mecanismo de ação?",
    alternativas: [
      "Introduzem anticorpos prontos, produzidos em laboratório, conferindo imunidade passiva permanente.",
      "Atuam como antibióticos, destruindo bactérias e vírus já presentes no organismo do doente.",
      "Apresentam antígenos (micro-organismos atenuados, inativados ou fragmentos) que estimulam a produção de anticorpos e células de memória pelo próprio organismo.",
      "Substituem os glóbulos vermelhos, aumentando o oxigênio disponível para o transporte pelas células.",
      "Agem apenas sobre os leucócitos, elevando a temperatura corporal de forma permanente."
    ],
    correta: 2,
    comentario: "As vacinas induzem imunidade ativa: os antígenos são apresentados aos linfócitos, que produzem anticorpos específicos e células de memória. Em uma exposição futura ao agente, a resposta é mais rápida e eficiente. A soroterapia, e não a vacinação, introduz anticorpos prontos (imunidade passiva e temporária); vacinas não são antibióticos e não atuam sobre hemácias."
  },
  {
    disciplina: "Biologia - Fisiologia (sistema circulatório)",
    enunciado: "O sangue venoso, rico em gás carbônico, retorna ao coração pelas veias cavas, entra no átrio direito, passa ao ventrículo direito e é bombeado pelas artérias pulmonares até os pulmões. Após a hematose, o sangue arterial retorna ao coração. Qual afirmação sobre esse percurso é correta?",
    alternativas: [
      "As veias pulmonares trazem sangue oxigenado dos pulmões para o átrio esquerdo.",
      "As artérias pulmonares transportam sangue oxigenado para os alvéolos.",
      "O ventrículo direito bombeia o sangue oxigenado para a aorta.",
      "O sangue que chega pelas veias cavas é rico em oxigênio.",
      "O átrio esquerdo envia o sangue diretamente aos pulmões, sem passar pelas valvas."
    ],
    correta: 0,
    comentario: "A regra geral é que artérias saem do coração e veias chegam a ele, mas o tipo de sangue é definido pela circulação, e não pelo nome do vaso. Na pequena circulação, as artérias pulmonares são exceção, pois levam sangue venoso aos pulmões, e as veias pulmonares, também exceção, trazem sangue oxigenado ao átrio esquerdo. O ventrículo direito nunca bombeia sangue oxigenado, e as veias cavas trazem sangue venoso."
  },
  {
    disciplina: "Biologia - Ciclo do nitrogênio",
    enunciado: "Bactérias do gênero Rhizobium vivem em nódulos das raízes de leguminosas, como soja e feijão, e convertem o N₂ atmosférico em amônia (NH₃). Qual papel essas bactérias desempenham no ciclo do nitrogênio?",
    alternativas: [
      "Amonificação: transformação da matéria orgânica em amônia",
      "Nitrificação: conversão da amônia em nitrito e depois em nitrato",
      "Desnitrificação: conversão de nitratos em N₂, devolvido à atmosfera",
      "Fixação biológica: incorporação do nitrogênio atmosférico a compostos assimiláveis pelas plantas",
      "Fotossíntese: conversão de CO₂ e água em glicose"
    ],
    correta: 3,
    comentario: "As bactérias fixadoras, como as Rhizobium em simbiose com leguminosas, usam a enzima nitrogenase para reduzir o N₂ a NH₃, processo conhecido como fixação biológica. É a principal porta de entrada do nitrogênio na cadeia alimentar, pois as plantas não conseguem usar o gás N₂ diretamente. Amonificação, nitrificação e desnitrificação são etapas distintas do ciclo, realizadas por outros micro-organismos."
  },
  {
    disciplina: "Biologia - Citologia (transporte pela membrana)",
    enunciado: "Uma hemácia, célula animal sem parede celular, é transferida para uma solução hipotônica. O que se espera que ocorra?",
    alternativas: [
      "Entrada de água por osmose, com edema e possível ruptura da célula (hemólise).",
      "Saída de água, com enrugamento da célula (crenação).",
      "Igualdade de concentrações, sem qualquer variação de volume.",
      "Entrada de água, mas o volume permanece inalterado graças à parede celular.",
      "Saída de íons, levando ao inchaço celular."
    ],
    correta: 0,
    comentario: "Solução hipotônica tem concentração de solutos menor que a do meio intracelular, logo a água entra na célula por osmose. Na ausência de parede celular, a hemácia incha e pode sofrer lise (hemólise). A crenação ocorre em solução hipertônica; a resistência à mudança de volume e a plasmólise são características de células vegetais, que possuem parede celular."
  },
  {
    disciplina: "Biologia - Genética molecular (DNA)",
    enunciado: "Uma das fitas de uma molécula de DNA apresenta a sequência 3' TAC – CGA – ATG 5'. Considerando o pareamento A-T e C-G e o antiparalelismo das fitas, a sequência da fita complementar, no sentido 5' → 3', é:",
    alternativas: [
      "3' ATG – GCT – TAC 5'",
      "5' TAC – CGA – ATG 3'",
      "5' ATG – GCT – TAC 3'",
      "3' UAC – CGA – AUG 5'",
      "5' GCT – ATG – CGA 3'"
    ],
    correta: 2,
    comentario: "As fitas do DNA são antiparalelas e complementares: T pareia com A e C pareia com G. Complementando 3' TAC CGA ATG 5', obtém-se, na direção oposta, a fita 5' ATG GCT TAC 3'. A opção com uracila (U) descreve RNA, e a sequência idêntica à original não respeita a complementaridade entre as fitas."
  },
  {
    disciplina: "Biologia - Ecologia (relações ecológicas)",
    enunciado: "O carrapato que se alimenta do sangue do boi, prejudicando-o, e a rêmora que se fixa ao tubarão para aproveitar restos de alimento, sem prejudicá-lo, estabelecem, respectivamente, relações do tipo:",
    alternativas: [
      "mutualismo e parasitismo",
      "comensalismo e parasitismo",
      "inquilismo e sociedade",
      "parasitismo e comensalismo",
      "predação e competição"
    ],
    correta: 3,
    comentario: "No parasitismo, uma espécie (parasita) vive às custas de outra (hospedeiro), prejudicando-a, como o carrapato e o boi. No comensalismo, uma espécie beneficia-se dos restos alimentares de outra sem lhe causar prejuízo nem benefício, como a rêmora e o tubarão. O inquilismo envolve obtenção de abrigo, o mutualismo beneficia ambas as espécies e a sociedade reúne indivíduos da mesma espécie."
  },
  {
    disciplina: "Biologia - Fisiologia (sistema digestório)",
    enunciado: "Sobre a digestão das proteínas no ser humano, é correto afirmar que:",
    alternativas: [
      "a ptialina, produzida pelas glândulas salivares, inicia a digestão das proteínas na boca",
      "a pepsina, produzida pelo estômago na forma inativa de pepsinogênio, é ativada pelo pH ácido e degrada proteínas em peptídeos menores",
      "o tripsinogênio, produzido pelo fígado, é ativado no intestino e digere os lipídios",
      "as lipases pancreáticas quebram as proteínas em aminoácidos ainda no estômago",
      "a digestão das proteínas termina no estômago, não havendo ação de enzimas intestinais"
    ],
    correta: 1,
    comentario: "A pepsina é secretada pelas células principais do estômago na forma inativa (pepsinogênio) e é ativada pelo HCl, que também reduz o pH a cerca de 2, condição ideal para sua ação. Ela inicia a digestão das proteínas, transformando-as em peptídeos; a digestão é complementada no intestino delgado, pela tripsina, quimiotripsina e peptidases. A ptialina age sobre o amido, e o tripsinogênio é produzido pelo pâncreas, não pelo fígado."
  },
  {
    disciplina: "Biologia - Evolução (equilíbrio de Hardy-Weinberg)",
    enunciado: "Em uma população em equilíbrio de Hardy-Weinberg, a frequência do alelo recessivo a é q = 0,4. Qual a frequência esperada de indivíduos heterozigotos (Aa)?",
    alternativas: [
      "16%",
      "36%",
      "40%",
      "24%",
      "48%"
    ],
    correta: 4,
    comentario: "No equilíbrio de Hardy-Weinberg, p + q = 1, logo p = 1 - 0,4 = 0,6. As frequências genotípicas seguem p² + 2pq + q² = 1: AA = p² = 0,36 (36%), Aa = 2pq = 2 × 0,6 × 0,4 = 0,48 (48%) e aa = q² = 0,16 (16%). Note que 16% e 36% são as frequências dos homozigotos, não dos heterozigotos."
  },
  {
    disciplina: "Física - Leis de Newton",
    enunciado: "Um bloco de 8 kg desloca-se sobre uma superfície horizontal perfeitamente lisa, puxado por uma força horizontal resultante de 20 N. Qual a aceleração adquirida pelo bloco?",
    alternativas: [
      "2,5 m/s²",
      "0,4 m/s²",
      "6,25 m/s²",
      "160 m/s²",
      "28 m/s²"
    ],
    correta: 0,
    comentario: "Pela 2ª lei de Newton, F_R = m · a, logo a = F_R / m = 20 N / 8 kg = 2,5 m/s². A opção 0,4 m/s² resulta da divisão invertida (m/F); 160 resulta do produto m × F, que não é uma aceleração."
  },
  {
    disciplina: "Física - Trabalho e energia",
    enunciado: "Um objeto de 2 kg é solto do repouso de uma altura de 5 m em relação ao solo, com g = 10 m/s² e desprezando a resistência do ar. Qual sua energia cinética ao atingir o solo?",
    alternativas: [
      "10 J",
      "50 J",
      "20 J",
      "100 J",
      "200 J"
    ],
    correta: 3,
    comentario: "Pela conservação da energia mecânica, a energia potencial gravitacional inicial (E_p = m · g · h = 2 × 10 × 5 = 100 J) converte-se integralmente em energia cinética, já que o objeto partiu do repouso (E_c inicial = 0). Portanto, E_c final = 100 J."
  },
  {
    disciplina: "Física - Cinemática",
    enunciado: "Um trem desloca-se em linha reta com velocidade constante de 90 km/h. Quanto tempo, em segundos, ele gasta para percorrer 500 m?",
    alternativas: [
      "10 s",
      "15 s",
      "25 s",
      "45 s",
      "20 s"
    ],
    correta: 4,
    comentario: "Convertendo a velocidade para m/s: 90 km/h ÷ 3,6 = 25 m/s. No movimento uniforme, v = Δs / Δt, logo Δt = 500 m ÷ 25 m/s = 20 s. É fundamental converter as unidades antes de calcular; usar 90 como se fosse m/s levaria a resultados muito menores."
  },
  {
    disciplina: "Física - Termologia (calorimetria)",
    enunciado: "Em um calorímetro, 200 g de água a 20 °C recebem 8 400 cal de calor. Qual a temperatura final da água, em °C? Dado: calor específico da água = 1 cal/(g · °C).",
    alternativas: [
      "42 °C",
      "44 °C",
      "62 °C",
      "21 °C",
      "22 °C"
    ],
    correta: 2,
    comentario: "Usando Q = m · c · ΔT: 8 400 = 200 × 1 × ΔT, logo ΔT = 8 400 / 200 = 42 °C. Como a água parte de 20 °C, a temperatura final é 20 + 42 = 62 °C. O valor 42 °C é a variação de temperatura, não a temperatura final."
  },
  {
    disciplina: "Física - Ondulatória",
    enunciado: "Uma onda sonora propaga-se no ar com velocidade de 340 m/s e frequência de 170 Hz. Qual o comprimento de onda, em metros?",
    alternativas: [
      "0,5 m",
      "2 m",
      "0,2 m",
      "17 m",
      "1 m"
    ],
    correta: 1,
    comentario: "A equação fundamental da ondulatória é v = f · λ, portanto λ = v / f = 340 / 170 = 2 m. A opção 0,5 m resulta da divisão invertida (f/v). Mantendo as unidades: (m/s) ÷ (1/s) = m, confirmando que o resultado sai em metros."
  },
  {
    disciplina: "Física - Óptica (espelho plano)",
    enunciado: "Um objeto de 3 cm de altura é colocado a 20 cm de um espelho plano. Quais as características da imagem formada?",
    alternativas: [
      "real, invertida e de 3 cm de altura",
      "real, invertida e de 6 cm de altura",
      "virtual, invertida e de 3 cm de altura",
      "real, direita e de 6 cm de altura",
      "virtual, direita, do mesmo tamanho (3 cm) e situada a 20 cm atrás do espelho"
    ],
    correta: 4,
    comentario: "No espelho plano, a imagem é sempre virtual (formada pelo prolongamento dos raios refletidos), direita, do mesmo tamanho do objeto e simétrica em relação ao plano do espelho. Assim, ela mede 3 cm e fica a 20 cm atrás do espelho. Não há inversão nem mudança de tamanho, independentemente da distância do objeto."
  },
  {
    disciplina: "Física - Eletricidade (Lei de Ohm)",
    enunciado: "Um resistor ôhmico de 220 Ω é ligado a uma tensão de 110 V. Qual a corrente elétrica que percorre o resistor?",
    alternativas: [
      "2 A",
      "5 A",
      "0,5 A",
      "0,05 A",
      "24,2 A"
    ],
    correta: 2,
    comentario: "Pela 1ª lei de Ohm, U = R · i, logo i = U / R = 110 / 220 = 0,5 A. A opção 2 A decorre da divisão invertida (R/U); 5 A resultaria de dividir por 22 Ω; o valor 24,2 só se obtém multiplicando U por R e dividindo por mil (110 × 220 / 1 000 = 24,2), operação que não tem sentido dimensional."
  },
  {
    disciplina: "Física - Hidrostática",
    enunciado: "Um mergulhador encontra-se a 10 m de profundidade em um lago. Qual a pressão total suportada por ele, em pascals? Dados: densidade da água = 1 000 kg/m³, g = 10 m/s², pressão atmosférica = 1,0 × 10⁵ Pa.",
    alternativas: [
      "2,0 × 10⁵ Pa",
      "1,0 × 10⁵ Pa",
      "1,1 × 10⁵ Pa",
      "1,5 × 10⁵ Pa",
      "2,1 × 10⁶ Pa"
    ],
    correta: 0,
    comentario: "Pelo teorema de Stevin, a pressão hidrostática é p_h = ρ · g · h = 1 000 × 10 × 10 = 1,0 × 10⁵ Pa. A pressão total é a soma com a pressão atmosférica: p = 1,0 × 10⁵ + 1,0 × 10⁵ = 2,0 × 10⁵ Pa. A opção 1,0 × 10⁵ Pa considera apenas a atmosfera, esquecendo a coluna de água."
  },
  {
    disciplina: "Física - Empuxo (Arquimedes)",
    enunciado: "Um bloco maciço de volume 0,002 m³ encontra-se totalmente submerso em água de densidade 1 000 kg/m³. Qual o módulo do empuxo sobre o bloco, em newtons? Use g = 10 m/s².",
    alternativas: [
      "20 000 N",
      "20 N",
      "2 N",
      "0,2 N",
      "200 N"
    ],
    correta: 1,
    comentario: "Pelo princípio de Arquimedes, E = ρ_líquido · V_submerso · g = 1 000 × 0,002 × 10 = 20 N. A opção 2 N resulta de usar volume 0,0002 m³; 200 N resultaria de usar volume 0,02 m³, isto é, confusão com a ordem de grandeza do volume submerso."
  },
  {
    disciplina: "Física - Dinâmica (peso)",
    enunciado: "Um astronauta de massa 72 kg está na superfície da Lua, onde a aceleração da gravidade é aproximadamente 1,6 m/s². Qual o peso do astronauta na Lua?",
    alternativas: [
      "45 N",
      "720 N",
      "115,2 kg",
      "115,2 N",
      "11,5 N"
    ],
    correta: 3,
    comentario: "Peso é a força gravitacional P = m · g. Na Lua: P = 72 × 1,6 = 115,2 N. A massa continua sendo 72 kg em qualquer lugar, por isso a opção em quilogramas confunde massa com peso. O valor 720 N corresponderia ao peso do mesmo astronauta na Terra, onde g ≈ 10 m/s²."
  },
  {
    disciplina: "Física - Cinemática (MRUV)",
    enunciado: "Um veículo parte do repouso e acelera uniformemente à razão de 2 m/s². Qual a distância percorrida nos primeiros 5 segundos?",
    alternativas: [
      "25 m",
      "50 m",
      "10 m",
      "5 m",
      "2,5 m"
    ],
    correta: 0,
    comentario: "No MRUV, Δs = v₀ · t + a · t² / 2 = 0 + 2 × 5² / 2 = 2 × 25 / 2 = 25 m. A opção 50 m decorre de omitir a divisão por 2 (a · t²); 10 m resulta de multiplicar a aceleração pelo tempo, que daria a velocidade final (10 m/s), e não a distância."
  },
  {
    disciplina: "Física - Termologia (gases ideais)",
    enunciado: "Certo gás ideal está contido em um recipiente fechado e rígido. Ao variar sua temperatura absoluta de 300 K para 600 K, mantendo o volume constante, o que ocorre com a pressão do gás?",
    alternativas: [
      "permanece constante, pois o volume não muda",
      "reduz-se à metade",
      "quadruplica",
      "aumenta seis vezes",
      "dobra"
    ],
    correta: 4,
    comentario: "Pela lei geral dos gases perfeitos, a volume constante, p/T é constante, logo p₂ = p₁ · T₂ / T₁ = p₁ · 600 / 300 = 2 · p₁, ou seja, a pressão dobra. Fisicamente, o aumento da temperatura eleva a agitação molecular e a frequência das colisões com as paredes. A temperatura absoluta deve estar sempre em kelvin."
  },
  {
    disciplina: "Física - Ondulatória (efeito Doppler)",
    enunciado: "Uma ambulância com a sirene ligada aproxima-se de um observador parado na calçada, em um dia sem vento. Em relação ao som emitido pela sirene, o som percebido pelo observador apresenta:",
    alternativas: [
      "menor frequência, pois a fonte está em movimento",
      "mesma frequência e menor comprimento de onda",
      "maior velocidade de propagação e maior frequência",
      "maior frequência e menor comprimento de onda",
      "mesma frequência e mesma velocidade, com som mais agudo por ilusão auditiva"
    ],
    correta: 3,
    comentario: "No efeito Doppler, a fonte que se aproxima comprime as frentes de onda na direção do movimento, reduzindo o comprimento de onda λ. Como v = f · λ e a velocidade do som no ar não se altera, a redução de λ implica aumento da frequência f, tornando o som mais agudo para o observador."
  },
  {
    disciplina: "Física - Trabalho e energia (potência)",
    enunciado: "Um guincho eleva um bloco de 100 kg a 3 m de altura, com velocidade constante, em 6 s. Qual a potência média desenvolvida? Use g = 10 m/s².",
    alternativas: [
      "300 W",
      "500 W",
      "1 800 W",
      "3 000 W",
      "50 W"
    ],
    correta: 1,
    comentario: "Como o movimento é uniforme, a força aplicada equilibra o peso: F = m · g = 100 × 10 = 1 000 N. O trabalho é W = F · d = 1 000 × 3 = 3 000 J. A potência média é P = W / Δt = 3 000 / 6 = 500 W. A opção 3 000 W confunde trabalho com potência; 300 W esqueceria a altura."
  },
  {
    disciplina: "Física - Eletricidade (potência elétrica)",
    enunciado: "Um chuveiro elétrico opera com tensão de 220 V, sendo percorrido por uma corrente de 20 A. Qual a potência dissipada, em kW, e a energia consumida, em kWh, durante 15 minutos de uso?",
    alternativas: [
      "4,4 kW e 0,11 kWh",
      "2,2 kW e 0,55 kWh",
      "4,4 kW e 1,1 kWh",
      "11 kW e 2,75 kWh",
      "0,44 kW e 1,1 kWh"
    ],
    correta: 2,
    comentario: "A potência é P = U · i = 220 × 20 = 4 400 W = 4,4 kW. Quinze minutos correspondem a 0,25 h, logo a energia é E = P · Δt = 4,4 × 0,25 = 1,1 kWh. Atenção à conversão de minutos para horas: 15 min = 0,25 h, e não 25 h."
  },
  {
    disciplina: "Química - Modelos atômicos",
    enunciado: "No modelo de Bohr, os elétrons só podem ocupar órbitas com energias definidas, ou seja, níveis quantizados de energia. Quando um elétron passa de um nível de maior energia (n maior) para um de menor energia (n menor):",
    alternativas: [
      "absorve um fóton com energia contínua, podendo assumir qualquer valor",
      "emite um nêutron e sua massa atômica diminui",
      "absorve um próton, alterando o número atômico do átomo",
      "emite energia térmica contínua, sem formação de espectro",
      "emite um fóton com energia bem definida, aparecendo como linha no espectro"
    ],
    correta: 4,
    comentario: "A quantização da energia faz com que a diferença entre dois níveis seja um valor fixo: ΔE = E_final - E_inicial. Como o elétron vai para um nível mais interno, ΔE é negativo e a energia é liberada na forma de um fóton, com frequência f = |ΔE| / h. Cada transição possível gera uma linha no espectro de emissão, o que explica os espectros atômicos serem descontínuos."
  },
  {
    disciplina: "Química - Ligações químicas",
    enunciado: "A combinação de um átomo de sódio (Z = 11) com um átomo de cloro (Z = 17) forma o cloreto de sódio, NaCl, substância essencial ao organismo humano. Sobre o composto formado, é correto afirmar que:",
    alternativas: [
      "apresenta ligações covalentes simples, com compartilhamento de um par de elétrons",
      "apresenta ligação iônica, resultante da transferência de um elétron do sódio para o cloro, formando os íons Na⁺ e Cl⁻",
      "apresenta ligação metálica, com elétrons livres percorrendo o retículo cristalino",
      "apresenta ligações de hidrogênio entre os átomos de sódio e cloro",
      "apresenta ligação covalente dativa, em que o cloro doa um par de elétrons ao sódio"
    ],
    correta: 1,
    comentario: "O sódio tem 1 elétron na camada de valência e o cloro, 7. O sódio tende a doar seu elétron, formando Na⁺, com configuração estável do neônio, e o cloro a recebê-lo, formando Cl⁻, com configuração do argônio. A atração eletrostática entre os íons é a ligação iônica. Ligam-se metal com não metal formando, em geral, compostos iônicos, e não covalentes ou metálicos."
  },
  {
    disciplina: "Química - Soluções (concentração)",
    enunciado: "Uma solução foi preparada dissolvendo-se 20 g de hidróxido de sódio, NaOH, em água suficiente para completar 500 mL de solução. Qual a concentração comum dessa solução, em g/L?",
    alternativas: [
      "4 g/L",
      "10 g/L",
      "20 g/L",
      "40 g/L",
      "80 g/L"
    ],
    correta: 3,
    comentario: "Concentração comum: C = m₁ / V. O volume é 500 mL = 0,5 L, logo C = 20 g / 0,5 L = 40 g/L. A opção 4 g/L resultaria de usar 5 L no denominador (20 g / 5 L); a opção 20 g/L não decorre de deixar de converter o volume, pois 20 g / 500 mL daria 0,04 g/mL, equivalente a 40 g/L."
  },
  {
    disciplina: "Química - Estequiometria",
    enunciado: "A síntese da amônia, processo Haber-Bosch, é representada por N₂ + 3 H₂ → 2 NH₃. Utilizando 28 g de N₂ com excesso de H₂, qual a massa de amônia obtida? Dados: massas molares N₂ = 28 g/mol e NH₃ = 17 g/mol.",
    alternativas: [
      "34 g",
      "17 g",
      "28 g",
      "51 g",
      "68 g"
    ],
    correta: 0,
    comentario: "Pela equação balanceada, 1 mol de N₂ produz 2 mols de NH₃. Como 28 g correspondem a 1 mol de N₂, obtêm-se 2 mols de NH₃, o que dá 2 × 17 = 34 g. A opção 17 g corresponderia a apenas 1 mol de NH₃, como se a relação fosse 1:1, e a opção 68 g resultaria de considerar 2 mols de N₂ nos 28 g (usando 14 g/mol como massa molar do N₂), em vez de 1 mol."
  },
  {
    disciplina: "Química - Balanceamento de equações",
    enunciado: "Quais coeficientes balanceiam corretamente a equação de combustão completa do etanol: C₂H₆O + O₂ → CO₂ + H₂O?",
    alternativas: [
      "1, 2, 2, 3",
      "2, 5, 2, 6",
      "1, 3, 2, 3",
      "1, 3, 3, 3",
      "2, 7, 4, 6"
    ],
    correta: 2,
    comentario: "Balanceando, obtém-se 1 C₂H₆O + 3 O₂ → 2 CO₂ + 3 H₂O. Verificação: carbono 2 = 2; hidrogênio 6 = 6; oxigênio, 1 + 3 × 2 = 7 no lado dos reagentes e 2 × 2 + 3 = 7 no lado dos produtos. A sequência 1, 2, 2, 3, por exemplo, fecharia o carbono, mas deixaria o oxigênio desbalanceado (5 contra 7)."
  },
  {
    disciplina: "Química - Termoquímica",
    enunciado: "Na queima de 1 mol de um determinado combustível, são liberados 5 700 kJ de energia para o ambiente. Escrevendo-se a equação termoquímica dessa reação com o combustível como reagente, a variação de entalpia (ΔH) é:",
    alternativas: [
      "+5 700 kJ",
      "0 kJ, pois a massa se conserva na reação",
      "+2 850 kJ",
      "-2 850 kJ",
      "-5 700 kJ"
    ],
    correta: 4,
    comentario: "Por convenção, a energia liberada em uma reação exotérmica tem sinal negativo: ΔH = H_produtos - H_reagentes < 0. Como a queima de 1 mol libera 5 700 kJ, escreve-se ΔH = -5 700 kJ por mol de combustível. O valor de ΔH deve ser sempre acompanhado da equação química e dos estados físicos das substâncias."
  },
  {
    disciplina: "Química - Chuva ácida",
    enunciado: "O pH da chuva em equilíbrio com o CO₂ atmosférico é cerca de 5,6. Em regiões industriais, óxidos como SO₂ e NO₂ reagem com a água formando ácidos, e o pH da chuva pode cair para 4,5. Comparada à chuva normal, a chuva de pH 4,5 apresenta:",
    alternativas: [
      "concentração de íons H⁺ cem vezes menor",
      "concentração de íons H⁺ dez vezes menor",
      "concentração de íons H⁺ igual, apenas com mais sais dissolvidos",
      "concentração de íons H⁺ cerca de dez vezes maior",
      "caráter básico, com predomínio de íons OH⁻"
    ],
    correta: 3,
    comentario: "A escala de pH é logarítmica: pH = -log[H⁺], portanto cada unidade de redução no pH corresponde a dez vezes mais íons H⁺. A queda de 5,6 para 4,5 representa aproximadamente uma unidade, logo a acidez fica cerca de dez vezes maior. Óxidos ácidos, como SO₂ e NO₂, formam H₂SO₃, H₂SO₄ e HNO₃, principais responsáveis pela chuva ácida."
  },
  {
    disciplina: "Química - Isomeria",
    enunciado: "O butan-1-ol, de fórmula CH₃CH₂CH₂CH₂OH, e o éter dietílico, de fórmula CH₃CH₂OCH₂CH₃, possuem a mesma fórmula molecular C₄H₁₀O, mas pertencem a funções orgânicas diferentes. Esse tipo de isomeria é denominado:",
    alternativas: [
      "isomeria de cadeia",
      "isomeria de função",
      "isomeria de posição",
      "isomeria geométrica (cis-trans)",
      "isomeria óptica"
    ],
    correta: 1,
    comentario: "Quando os isômeros pertencem a funções químicas distintas, fala-se em isomeria de função. A isomeria de cadeia envolve estruturas diferentes de cadeia carbônica, como butano e metilpropano; a de posição varia a localização de um grupo funcional ou de uma insaturação; a geométrica exige dupla ligação entre carbonos diferentes; e a óptica exige carbono assimétrico, ou quiral."
  },
  {
    disciplina: "Química - Funções orgânicas",
    enunciado: "Qual das substâncias abaixo pertence à função cetona?",
    alternativas: [
      "CH₃–CO–CH₃ (acetona)",
      "CH₃–CH₂–OH (etanol)",
      "CH₃–CHO (etanal)",
      "CH₃–O–CH₃ (dimetil-éter)",
      "CH₃–COOH (ácido etanoico)"
    ],
    correta: 0,
    comentario: "A cetona apresenta o grupo carbonila (C=O) ligado a dois átomos de carbono, com fórmula geral R–CO–R'. A acetona, CH₃COCH₃, é a cetona mais simples. O etanol é um álcool; o etanal, um aldeído, em que a carbonila liga-se a um hidrogênio; o dimetil-éter é um éter; e o ácido etanoico, um ácido carboxílico."
  },
  {
    disciplina: "Química - Combustão",
    enunciado: "A combustão completa do metano ocorre segundo a equação CH₄ + 2 O₂ → CO₂ + 2 H₂O. Qual o volume de CO₂ liberado, nas CNTP, na queima de 32 g de CH₄, com excesso de O₂? Dados: massa molar do CH₄ = 16 g/mol e volume molar nas CNTP = 22,4 L/mol.",
    alternativas: [
      "11,2 L",
      "22,4 L",
      "44,8 L",
      "22,4 g",
      "67,2 L"
    ],
    correta: 2,
    comentario: "32 g de CH₄ correspondem a 2 mols. Pela equação, 1 mol de CH₄ produz 1 mol de CO₂, logo obtêm-se 2 mols de CO₂, que ocupam 2 × 22,4 = 44,8 L nas CNTP. A opção 11,2 L corresponderia a meio mol, e a opção em gramas confunde grandeza de massa com volume."
  },
  {
    disciplina: "Química - Sabão (saponificação)",
    enunciado: "A fabricação de sabão é feita pela reação de um óleo vegetal (triacilglicerol) com uma base forte, como NaOH ou KOH, processo denominado saponificação. Os produtos dessa reação são:",
    alternativas: [
      "gás carbônico e água",
      "sal de ácido graxo (sabão) e glicerol",
      "um polímero de adição e gás hidrogênio",
      "ácido graxo e água, sem formação de sal",
      "detergente sintético e sulfato de sódio"
    ],
    correta: 1,
    comentario: "A saponificação é a hidrólise alcalina de ésteres: o triacilglicerol reage com a base, liberando glicerol e sais de ácidos graxos de cadeia longa, que são os sabões. Com NaOH obtém-se sabão duro, como o estearato de sódio, e com KOH, sabão mole. Detergentes sintéticos não são produzidos por saponificação."
  },
  {
    disciplina: "Química - Modelos atômicos (isótopos)",
    enunciado: "O hidrogênio natural apresenta três formas isotópicas: o prótio (¹H), o deutério (²H) e o trítio (³H). Sobre esses átomos, é correto afirmar que:",
    alternativas: [
      "pertencem a elementos diferentes, pois suas massas são distintas",
      "possuem números atômicos distintos, o que muda suas propriedades químicas",
      "possuem o mesmo número de prótons e de elétrons, diferindo no número de nêutrons",
      "possuem o mesmo número de nêutrons, diferindo no número de prótons",
      "possuem o mesmo número de elétrons, o que os torna íons isoeletrônicos"
    ],
    correta: 2,
    comentario: "Isótopos são átomos do mesmo elemento, com mesmo número atômico Z, portanto mesmo número de prótons e de elétrons, mas com números de massa A diferentes, isto é, quantidades distintas de nêutrons. O prótio não tem nêutrons, o deutério tem 1 e o trítio tem 2. Suas propriedades químicas são praticamente iguais, pois dependem dos elétrons."
  },
  {
    disciplina: "Química - Soluções (diluição)",
    enunciado: "Um laboratório dispõe de 200 mL de uma solução de HCl 6,0 mol/L. Adicionando-se apenas água, qual o volume final de solução 2,0 mol/L que poderá ser obtido?",
    alternativas: [
      "600 mL",
      "66,7 mL",
      "100 mL",
      "400 mL",
      "1 200 mL"
    ],
    correta: 0,
    comentario: "Na diluição, o número de mols de soluto permanece constante: M₁ · V₁ = M₂ · V₂. Logo V₂ = 6,0 × 0,2 / 2,0 = 0,6 L = 600 mL. Atenção: o volume de água adicionada é 600 - 200 = 400 mL, por isso a opção 400 mL confunde volume de solvente acrescentado com volume final da solução."
  },
  {
    disciplina: "Química - Estequiometria (pureza)",
    enunciado: "A decomposição térmica do calcário segue a equação CaCO₃ → CaO + CO₂. Partindo de 250 g de calcário com 80% de pureza em CaCO₃ e admitindo rendimento de 100%, qual a massa de cal virgem (CaO) obtida? Dados: massas molares CaCO₃ = 100 g/mol e CaO = 56 g/mol.",
    alternativas: [
      "140 g",
      "280 g",
      "224 g",
      "112 g",
      "56 g"
    ],
    correta: 3,
    comentario: "Massa de CaCO₃ puro: 250 × 0,80 = 200 g, o que corresponde a 2 mols. Pela equação, 1 mol de CaCO₃ gera 1 mol de CaO, logo obtêm-se 2 mols de CaO = 2 × 56 = 112 g. A opção 140 g ignoraria a pureza, tratando os 250 g como se fossem 100% de CaCO₃ (2,5 mols → 2,5 × 56 = 140 g de CaO); a opção 280 g não resulta de nenhum cálculo coerente com os dados."
  },
  {
    disciplina: "Química - Termoquímica (processos endotérmicos)",
    enunciado: "Em uma reação endotérmica, verifica-se que:",
    alternativas: [
      "os produtos têm energia menor que a dos reagentes e ΔH é negativo, com liberação de calor",
      "reagentes e produtos estão no mesmo patamar energético, com ΔH = 0",
      "a reação ocorre sem necessidade de energia de ativação",
      "o sistema absorve calor do ambiente, o que reduz a entropia a zero",
      "os produtos têm energia maior que a dos reagentes e ΔH é positivo, com absorção de calor"
    ],
    correta: 4,
    comentario: "Em processos endotérmicos, a entalpia dos produtos é maior que a dos reagentes: ΔH = H_produtos - H_reagentes > 0, e há absorção de calor pelo sistema. Toda reação, porém, inclusive as endotérmicas, requer energia de ativação para se iniciar. Nos processos exotérmicos, ocorre o oposto: ΔH < 0 com liberação de calor."
  },
  {
    disciplina: "Matemática - Logaritmo",
    enunciado: "O nível de intensidade sonora β, em decibéis, é definido por β = 10 · log(I / I₀), em que I₀ = 10⁻¹² W/m². Para uma fonte cuja intensidade I é 100 vezes I₀, o valor de β é:",
    alternativas: [
      "100 dB",
      "20 dB",
      "10 dB",
      "2 dB",
      "40 dB"
    ],
    correta: 1,
    comentario: "Se I = 100 · I₀, então I / I₀ = 100 = 10², e log(100) = 2. Logo β = 10 × 2 = 20 dB. A opção 100 dB confunde a razão I/I₀ com o valor de β; 10 dB resultaria de usar I/I₀ = 10, cujo logaritmo é 1; e 40 dB, de usar log(100) = 4."
  },
  {
    disciplina: "Matemática - Análise combinatória",
    enunciado: "Usando apenas os algarismos 1, 2, 3, 4 e 5, sem repetição, quantos números diferentes de três algarismos podem ser formados?",
    alternativas: [
      "10",
      "20",
      "125",
      "243",
      "60"
    ],
    correta: 4,
    comentario: "Como a ordem importa (123 é diferente de 321) e não há repetição, trata-se de um arranjo de 5 elementos tomados 3 a 3: A₅,₃ = 5! / (5-3)! = 5 × 4 × 3 = 60. A opção 125 seria 5³, valor obtido se a repetição fosse permitida, e 10 seria a combinação C₅,₃, que ignora a ordem dos algarismos."
  },
  {
    disciplina: "Matemática - Progressão aritmética",
    enunciado: "Uma progressão aritmética tem primeiro termo a₁ = 5 e razão r = 3. Qual é o valor do décimo termo?",
    alternativas: [
      "35",
      "30",
      "32",
      "50",
      "29"
    ],
    correta: 2,
    comentario: "A fórmula do termo geral é aₙ = a₁ + (n - 1) · r, logo a₁₀ = 5 + 9 × 3 = 5 + 27 = 32. A opção 35 decorre de usar n em vez de n - 1 (5 + 30), e 50 resultaria de multiplicar 5 × 10, confundindo a estrutura da PA."
  },
  {
    disciplina: "Matemática - Progressão geométrica",
    enunciado: "Em uma progressão geométrica de termos positivos, o primeiro termo é a₁ = 3 e a razão é q = 2. Qual é o valor do sétimo termo?",
    alternativas: [
      "96",
      "21",
      "384",
      "192",
      "128"
    ],
    correta: 3,
    comentario: "Na PG, aₙ = a₁ · q^(n-1), logo a₇ = 3 × 2⁶ = 3 × 64 = 192. A opção 96 resulta de usar o expoente 5, confundindo o índice; 384 vem do expoente 7, típico de quem usa n em vez de n - 1 na fórmula."
  },
  {
    disciplina: "Matemática - Matrizes",
    enunciado: "A matriz A tem primeira linha (2, 1) e segunda linha (0, 3), enquanto a matriz B tem primeira linha (1, 4) e segunda linha (2, 0). Qual é a matriz A + B?",
    alternativas: [
      "primeira linha (3, 5) e segunda linha (2, 3)",
      "primeira linha (3, 4) e segunda linha (2, 0)",
      "primeira linha (2, 4) e segunda linha (0, 0)",
      "primeira linha (3, 5) e segunda linha (0, 3)",
      "primeira linha (1, 5) e segunda linha (2, 3)"
    ],
    correta: 0,
    comentario: "Na soma de matrizes, somam-se os elementos de mesma posição: 2 + 1 = 3 e 1 + 4 = 5 na primeira linha; 0 + 2 = 2 e 3 + 0 = 3 na segunda linha. A matriz (3, 4; 2, 0) erra o segundo elemento da primeira linha, (2, 4; 0, 0) corresponde ao produto elemento a elemento de A por B, e a diferença A - B daria (1, -3; -2, 3)."
  },
  {
    disciplina: "Matemática - Trigonometria",
    enunciado: "Num triângulo retângulo, o cateto oposto ao ângulo agudo α mede 12 cm, a hipotenusa mede 13 cm e o cateto adjacente a α mede 5 cm. Quanto vale sen α?",
    alternativas: [
      "12/5",
      "5/13",
      "13/12",
      "12/13",
      "5/12"
    ],
    correta: 3,
    comentario: "Por definição, sen α = cateto oposto / hipotenusa = 12 / 13. A razão 5/13 é o cosseno de α, e 12/5 é a tangente. O triângulo de lados 5, 12 e 13 é um clássico terno pitagórico: 5² + 12² = 25 + 144 = 169 = 13²."
  },
  {
    disciplina: "Matemática - Geometria espacial",
    enunciado: "Um reservatório cilíndrico reto tem raio da base igual a 2 m e altura igual a 1,5 m. Qual seu volume, em m³, quando está totalmente cheio? Use π = 3.",
    alternativas: [
      "6 m³",
      "12 m³",
      "18 m³",
      "9 m³",
      "24 m³"
    ],
    correta: 2,
    comentario: "O volume do cilindro é V = π · r² · h = 3 × (2)² × 1,5 = 3 × 4 × 1,5 = 18 m³. A opção 6 m³ resultaria de esquecer o π, usando apenas r² · h = 4 × 1,5, e 9 m³ de usar r em vez de r²: 3 × 2 × 1,5 = 9."
  },
  {
    disciplina: "Matemática - Função do 2º grau",
    enunciado: "Considerando a função f(x) = x² - 6x + 5, quais são os valores de x que anulam a função?",
    alternativas: [
      "-1 e -5",
      "1 e 5",
      "-1 e 5",
      "2 e 3",
      "0 e 6"
    ],
    correta: 1,
    comentario: "Fazendo x² - 6x + 5 = 0, tem-se Δ = 36 - 20 = 16, logo x = (6 ± 4) / 2, ou seja, x = 1 e x = 5. Conferindo pelas relações de Girard: soma das raízes S = -b/a = 6 e produto P = c/a = 5, ambos satisfeitos por 1 e 5."
  },
  {
    disciplina: "Matemática - Juros simples",
    enunciado: "Um capital de R$ 2.000,00 é aplicado a juros simples, à taxa de 3% ao mês, durante 5 meses. Qual o montante ao final do período?",
    alternativas: [
      "R$ 2 060,00",
      "R$ 2 150,00",
      "R$ 2 600,00",
      "R$ 3 000,00",
      "R$ 2 300,00"
    ],
    correta: 4,
    comentario: "Nos juros simples, J = C · i · t = 2 000 × 0,03 × 5 = R$ 300,00, e o montante é M = C + J = 2 300,00. A opção R$ 2 060,00 considera apenas 1 mês de juros, e R$ 3 000,00 usaria taxa de 10% ao mês. Nos juros simples os juros incidem sempre sobre o capital inicial."
  },
  {
    disciplina: "Matemática - Porcentagem",
    enunciado: "Após um reajuste de 20%, o preço de um eletrodoméstico passou a ser R$ 120,00. Qual era o preço antes do reajuste?",
    alternativas: [
      "R$ 100,00",
      "R$ 96,00",
      "R$ 90,00",
      "R$ 108,00",
      "R$ 144,00"
    ],
    correta: 0,
    comentario: "O preço final corresponde a 120% do original, isto é, 1,2 · x = 120, logo x = 120 / 1,2 = R$ 100,00. A opção R$ 96,00, obtida por 120 × 0,8, é o erro clássico de aplicar o desconto sobre o valor já reajustado; R$ 144,00 seria o preço após um novo aumento de 20%."
  },
  {
    disciplina: "Matemática - Estatística",
    enunciado: "As notas de cinco alunos em uma prova foram 4,0, 6,0, 7,0, 8,0 e 10,0. Qual a média aritmética dessas notas?",
    alternativas: [
      "7,0",
      "7,5",
      "6,0",
      "8,0",
      "35,0"
    ],
    correta: 0,
    comentario: "A média é a soma dos valores dividida pela quantidade de valores: (4 + 6 + 7 + 8 + 10) / 5 = 35 / 5 = 7,0. O valor 35,0 é a soma das notas, e não a média. Como a quantidade de dados (5) é ímpar, a mediana (valor central, 7,0) coincide com a média nesse conjunto."
  },
  {
    disciplina: "Matemática - Análise combinatória (combinação)",
    enunciado: "De um grupo de 10 pessoas, quantas comissões diferentes de 3 pessoas podem ser formadas?",
    alternativas: [
      "720",
      "30",
      "45",
      "120",
      "210"
    ],
    correta: 3,
    comentario: "Em uma comissão a ordem não importa, logo usa-se a combinação C₁₀,₃ = 10! / (3! · 7!) = (10 × 9 × 8) / (3 × 2 × 1) = 720 / 6 = 120. A opção 720 é o arranjo A₁₀,₃, que considera a ordem dos elementos; 210 corresponderia a C₁₀,₄."
  },
  {
    disciplina: "Matemática - Progressão geométrica (soma)",
    enunciado: "A sequência (2, 6, 18, 54, ...) é uma progressão geométrica de razão 3. Qual a soma dos quatro primeiros termos?",
    alternativas: [
      "60",
      "80",
      "82",
      "162",
      "78"
    ],
    correta: 1,
    comentario: "Somando diretamente: 2 + 6 + 18 + 54 = 80. Pela fórmula da soma dos termos da PG, S₄ = a₁ (q⁴ - 1) / (q - 1) = 2 × (81 - 1) / (3 - 1) = 2 × 80 / 2 = 80. A opção 162 seria 2 × 81, confundindo a fórmula da soma com a do termo geral."
  },
  {
    disciplina: "Matemática - Logaritmo (propriedades)",
    enunciado: "Qual o valor da expressão log₂ 32 + log₃ (1/81)?",
    alternativas: [
      "9",
      "-9",
      "1",
      "20",
      "-1"
    ],
    correta: 2,
    comentario: "Tem-se log₂ 32 = 5, pois 2⁵ = 32. Para a segunda parcela, 1/81 = 81⁻¹ = 3⁻⁴, logo log₃ (1/81) = -4. Somando: 5 + (-4) = 1. O erro comum é esquecer que o logaritmo de um número entre 0 e 1 é sempre negativo."
  },
  {
    disciplina: "Matemática - Geometria espacial (esfera)",
    enunciado: "Uma esfera de raio 3 cm tem volume, em cm³, igual a: (use π = 3)",
    alternativas: [
      "27 cm³",
      "36 cm³",
      "54 cm³",
      "81 cm³",
      "108 cm³"
    ],
    correta: 4,
    comentario: "O volume da esfera é V = (4/3) · π · R³ = (4/3) × 3 × 27 = 4 × 27 = 108 cm³. Com π = 3, o 3 do denominador cancela o 3 de π. A opção 27 cm³ seria apenas R³, e 81 cm³ resultaria de calcular 3R³ em vez de 4R³/3."
  }
];
if (typeof window !== "undefined") { window.QUESTOES_EXTRA_2 = QUESTOES_EXTRA_2; }
