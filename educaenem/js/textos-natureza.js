/* Textos de apoio BNCC — Ciências da Natureza (ENEM) */
const TEXTOS_NAT = [
  /* ===================== BIOLOGIA — TRIMESTRE 1 ===================== */
  {
    id: "txt-bio-1",
    disciplina: "biologia",
    trimestre: 1,
    tipo: "tabela",
    fonte: "Adaptado de material didático",
    titulo: "Citologia em tabela: organelas e o metabolismo energético da célula",
    habilidades: ["EM13CNT101", "EM13CNT202"],
    corpo:
      "<p>A célula eucariótica é comparada com frequência a uma cidade: cada organela exerce uma função especializada, e o funcionamento do conjunto depende do transporte de substâncias e de energia entre seus setores. A tabela a seguir resume as principais organelas, sua estrutura e sua função.</p>" +
      "<table><tr><th>Organela</th><th>Estrutura</th><th>Função principal</th></tr>" +
      "<tr><td>Núcleo</td><td>Envolto por uma dupla membrana (carioteca)</td><td>Armazena o DNA e controla a expressão gênica</td></tr>" +
      "<tr><td>Ribossomo</td><td>Duas subunidades de RNA e proteína</td><td>Síntese de proteínas</td></tr>" +
      "<tr><td>Retículo endoplasmático rugoso</td><td>Rede de membranas com ribossomos aderidos</td><td>Síntese e transporte de proteínas</td></tr>" +
      "<tr><td>Retículo endoplasmático liso</td><td>Rede de membranas sem ribossomos</td><td>Síntese de lipídios e desintoxicação celular</td></tr>" +
      "<tr><td>Complexo de Golgi</td><td>Pilhas de cisternas achatadas</td><td>Modificação, empacotamento e encaminhamento das proteínas</td></tr>" +
      "<tr><td>Lisossomo</td><td>Vesícula com enzimas digestivas</td><td>Digestão intracelular e autofagia</td></tr>" +
      "<tr><td>Mitocôndria</td><td>Membrana dupla com cristas internas</td><td>Respiração celular aeróbica: produz a maior parte do ATP</td></tr>" +
      "<tr><td>Cloroplasto</td><td>Membrana dupla com tilacoides e estroma</td><td>Fotossíntese: converte luz, CO₂ e água em glicose</td></tr></table>" +
      "<p>Duas organelas merecem destaque: a mitocôndria e o cloroplasto, responsáveis pelo metabolismo energético. Na mitocôndria ocorre a respiração celular aeróbica, representada de forma simplificada por C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + energia, com rendimento de aproximadamente 30 a 32 moléculas de ATP por glicose. A glicose é inicialmente degradada na glicólise, no citosol, e a maior parte do ATP é gerada na cadeia de transporte de elétrons, na membrana interna da mitocôndria. No cloroplasto, presente em plantas e algas, ocorre a fotossíntese: na fase clara, nos tilacoides, a luz é captada pela clorofila e produz ATP e NADPH, liberando O₂; no estroma, o ciclo de Calvin fixa o CO₂ em carboidratos, usando a energia química produzida na fase clara.</p>" +
      "<p>Mitocôndrias e cloroplastos possuem membranas duplas, DNA circular próprio e ribossomos semelhantes aos de bactérias, evidências que sustentam a teoria endossimbiótica: essas organelas descendem de bactérias engolidas por células ancestrais há cerca de 1,5 bilhão de anos. A célula também possui uma via de secreção: proteínas sintetadas por ribossomos do retículo rugoso passam pelo complexo de Golgi, são empacotadas em vesículas e liberadas por exocitose. A energia para todos esses processos é fornecida pelo ATP, o que mostra a integração entre as organelas.</p>",
    questoes: [
      {
        enunciado:
          "Células de glândulas salivares humanas produzem e lançam grande quantidade de enzimas digestivas no tubo digestório. O aumento da produção dessas enzimas está associado, principalmente, à alta atividade de quais organelas?",
        alternativas: [
          "Lisossomos e peroxissomos, responsáveis pela digestão intracelular e pela degradação de radicais livres.",
          "Ribossomos, retículo endoplasmático rugoso e complexo de Golgi, que sintetizam, processam e secretam as proteínas.",
          "Mitocôndrias exclusivamente, únicas estruturas capazes de sintetizar proteínas.",
          "Cloroplastos e vacúolos, que armazenam as enzimas já prontas.",
          "Centríolos e nucléolos, que produzem os fosfolipídios da membrana secretora.",
        ],
        correta: 1,
        comentario:
          "A via secretora começa na síntese de proteínas nos ribossomos aderidos ao retículo endoplasmático rugoso; a proteína é processada, passa pelo complexo de Golgi, que a modifica e a empacota em vesículas, e é liberada por exocitose. Lisossomos fazem digestão intracelular e mitocôndrias fornecem ATP, mas nenhuma das duas sintetiza as proteínas secretoras.",
      },
      {
        enunciado:
          "Mitocôndrias e cloroplastos apresentam duas membranas, DNA próprio e ribossomos semelhantes aos de bactérias. Na biologia moderna, essas características são interpretadas como:",
        alternativas: [
          "Prova de que ambas as organelas surgem por brotamento da membrana plasmática em cada divisão celular.",
          "Indício de que ambas realizam a fermentação láctica como principal fonte de energia.",
          "Demonstração de que a célula eucariótica é quimicamente idêntica à célula procariótica.",
          "Evidência de que ambas descendem de bactérias englobadas por células ancestrais, conforme a teoria endossimbiótica.",
          "Sinal de que tais organelas não possuem material genético, apenas RNAs de síntese proteica própria.",
        ],
        correta: 3,
        comentario:
          "A teoria endossimbiótica explica que mitocôndrias e cloroplastos descendem de procariotos que passaram a viver dentro de células ancestrais. A membrana dupla, o DNA circular e os ribossomos do tipo bacteriano são as principais evidências. Funcionalmente, a mitocôndria realiza a respiração celular e o cloroplasto, a fotossíntese — processos complementares de transformação de energia.",
      },
    ],
  },
  {
    id: "txt-bio-2",
    disciplina: "biologia",
    trimestre: 1,
    tipo: "experimento",
    fonte: "Adaptado de material didático",
    titulo: "Experimento: ervilhas de Mendel, daltonismo e seleção natural",
    habilidades: ["EM13CNT201", "EM13CNT203"],
    corpo:
      "<p>Entre 1856 e 1863, o monge Gregor Mendel cruzou plantas de ervilha (Pisum sativum) de linhagens puras no jardim de seu mosteiro em Brno, na Morávia, e acompanhou cerca de 29 mil descendentes. Ao cruzar plantas altas com plantas anãs, obteve na primeira geração filial (F1) apenas plantas altas; cruzando os indivíduos de F1 entre si, obteve 3/4 de plantas altas e 1/4 de anãs na geração F2. Essa regularidade levou à primeira lei de Mendel, ou lei da segregação dos fatores: cada indivíduo possui dois alelos para cada característica, e esses alelos se separam na formação dos gametas, de modo que o cruzamento Aa × Aa produz as proporções genotípicas 1 AA : 2 Aa : 1 aa e a proporção fenotípica 3 : 1, nos casos de dominância completa. Mendel repetiu a análise com dois caracteres ao mesmo tempo, como a cor (amarela ou verde) e a textura (lisa ou rugosa) das sementes: o cruzamento AaBb × AaBb produziu a proporção fenotípica 9 : 3 : 3 : 1. Essa é a segunda lei de Mendel, ou lei da segregação independente: pares de alelos localizados em cromossomos diferentes distribuem-se de forma independente para os gametas.</p>" +
      "<p>Nem toda herança segue o padrão autossômico. O daltonismo, incapacidade de distinguir certas cores, é causado por alelos recessivos ligados ao cromossomo X. Mulheres possuem dois X (genótipos XᴰXᴰ, normais; XᴰXᵈ, portadoras de visão normal; XᵈXᵈ, daltônicas), enquanto homens possuem um único X (XᴰY, normais; XᵈY, daltônicos), sendo, portanto, hemizigóticos. Estima-se que cerca de 8% dos homens e 0,5% das mulheres sejam daltônicos, porque o homem que herda o alelo recessivo da mãe não tem outro X para compensar. Um pai daltônico transmite seu X a todas as filhas — que ficam portadoras, se a mãe for normal — e a nenhum de seus filhos, que recebem o Y. Uma mãe portadora tem, em cada gestação, 25% de chance de ter um filho daltônico — ou, dito de outro modo, 50% de chance de que cada filho do sexo masculino nasça daltônico. Essas proporções são obtidas aplicando-se os princípios de segregação da primeira lei de Mendel aos cromossomos sexuais.</p>" +
      "<p>No século XIX, Jean-Baptiste de Lamarck propôs que a evolução ocorria pela lei do uso e desuso e pela herança dos caracteres adquiridos: o pescoço da girafa teria se alongado porque os indivíduos o esticavam para alcançar folhas altas, transmitindo o alongamento à prole. Em 1858, Charles Darwin e Alfred Russel Wallace apresentaram à Sociedade Lineana de Londres a teoria da seleção natural (publicada por Darwin em 1859, no livro A origem das espécies): dentro de uma população existe variação hereditária; indivíduos com características vantajosas deixam mais descendentes; com o tempo, a frequência dessas características aumenta. A genética moderna confirmou que características adquiridas durante a vida não alteram o DNA das células germinativas, ao contrário do que supunha Lamarck. Nas ilhas Galápagos, os tentilhões descritos por Darwin apresentam bicos diferentes conforme a ilha e o alimento disponível — exemplo de adaptação por seleção natural. Quando populações se isolam reprodutivamente, seja por barreiras geográficas (especiação alopátrica), seja por mudanças cromossômicas ou comportamentais, surgem novas espécies: é o processo de especiação.</p>" +
      "<p>Um exemplo clássico de seleção natural em ação é a resistência de bactérias a antibióticos. Em uma colônia, mutações aleatórias — muitas vezes aceleradas pela troca de plasmídeos entre indivíduos — podem conferir resistência. Na presença do antibiótico, as sensíveis morrem e as resistentes sobrevivem e se multiplicam: a frequência dos genes de resistência aumenta rapidamente na população. O uso inadequado de antibióticos, tanto em hospitais quanto na agropecuária, acelera a emergência de superbactérias, como as cepas de Klebsiella pneumoniae resistentes a carbapenêmicos (KPC).</p>",
    questoes: [
      {
        enunciado:
          "Um homem daltônico (XᵈY) casa-se com uma mulher de visão normal cujo pai era daltônico. Qual a probabilidade de o casal ter um filho do sexo masculino daltônico?",
        alternativas: [
          "0%, pois o daltonismo é herança autossômica recessiva e ambos os pais precisariam ser portadores.",
          "50%, pois a mulher é obrigatoriamente homozigota recessiva.",
          "75%, pois três dos quatro genótipos femininos possíveis carregam o alelo mutante.",
          "100%, pois o pai transmite seu cromossomo X afetado a todos os filhos homens.",
          "25%, pois metade dos filhos será do sexo masculino e, dentre esses, metade herda o X recessivo materno.",
        ],
        correta: 4,
        comentario:
          "Como o pai era daltônico, a mulher herdou dele um Xᵈ: seu genótipo é Xᴰ Xᵈ (portadora de visão normal). O cruzamento XᵈY × Xᴰ Xᵈ gera quatro genótipos com 1/4 de chance cada: Xᴰ Xᵈ, Xᵈ Xᵈ, Xᴰ Y e Xᵈ Y. O menino daltônico (Xᵈ Y) só surge se herdar o Xᵈ da mãe (1/2) e o Y do pai (1/2): 1/2 × 1/2 = 25%. Observe que o alelo se distribui segundo os princípios de segregação da primeira lei de Mendel.",
      },
      {
        enunciado:
          "A rápida disseminação da resistência de bactérias a antibióticos em hospitais é explicada, do ponto de vista evolutivo, porque:",
        alternativas: [
          "As bactérias tornam-se resistentes como resposta fisiológica individual ao antibiótico, pela lei do uso e desuso.",
          "O antibiótico provoca mutações direcionadas exclusivamente nos genes que conferem resistência, tornando toda a colônia resistente.",
          "Mutações aleatórias que conferem resistência dão vantagem seletiva na presença do antibiótico; os indivíduos resistentes sobrevivem e se reproduzem, aumentando a frequência do alelo de resistência na população.",
          "A resistência é adquirida por esforço metabólico e transmitida diretamente à prole, sem envolver mudanças no DNA.",
          "As bactérias resistentes são menos aptas e morrem quando expostas ao antibiótico, o que seleciona a sensibilidade.",
        ],
        correta: 2,
        comentario:
          "Darwin explicaria o caso pela seleção natural: existe variabilidade na população; mutações aleatórias (e a troca de plasmídeos) geram indivíduos resistentes; sob a pressão do antibiótico, os sensíveis são eliminados e os resistentes deixam mais descendentes. A explicação lamarckista de que o esforço individual gera e transmite a adaptação está descartada, pois modificações somáticas não alteram o material genético herdado.",
      },
    ],
  },
  /* ===================== BIOLOGIA — TRIMESTRE 2 ===================== */
  {
    id: "txt-bio-3",
    disciplina: "biologia",
    trimestre: 2,
    tipo: "infografico",
    fonte: "Adaptado de material didático",
    titulo: "Infográfico: cadeia alimentar, fluxo de energia, sucessão ecológica e ciclo do nitrogênio",
    habilidades: ["EM13CNT202", "EM13CNT301"],
    corpo:
      "<p>Em um reservatório do interior paulista, a cadeia alimentar começa no fitoplâncton e nas macrófitas, que captam luz e produzem matéria orgânica; segue para o zooplâncton, depois para pequenos peixes e, finalmente, para peixes carnívoros e aves aquáticas. O fluxo de energia no ecossistema é unidirecional, e em cada passagem trófica apenas cerca de 10% da energia é convertida em biomassa: o restante é perdido como calor na respiração, seguindo a segunda lei da termodinâmica. Por isso uma cadeia raramente ultrapassa quatro ou cinco níveis tróficos. Em termos numéricos, se os produtores de uma área fixam 20.000 quilocalorias por metro quadrado por ano, os consumidores primários dispõem de cerca de 2.000, os secundários de 200 e os terciários de apenas 20 kcal/m²/ano. A energia não é reciclada: ela precisa ser continuamente reposta pelo Sol, enquanto a matéria — carbono, nitrogênio, fósforo — circula em ciclos biogeoquímicos.</p>" +
      "<p>Quando uma área é perturbada — um campo de cultivo abandonado, uma encosta desmatada, um lago em assoreamento —, a comunidade se modifica ao longo do tempo em um processo chamado sucessão ecológica. Em regiões previamente desabitadas, como rochas nuas ou ilhas vulcânicas recém-formadas, a sucessão primária começa com espécies pioneiras, como líquens e cianobactérias, que ajudam a formar o solo; em locais que já possuem solo e remanescentes de vida, como uma floresta derrubada, ocorre a sucessão secundária, mais rápida. Gramíneas e ervas logo dão lugar a arbustos e, finalmente, a uma comunidade mais estável e diversa — o estágio de clímax. Ao longo da sucessão, a biomassa total aumenta e a diversidade de espécies tende a crescer.</p>" +
      "<p>O ciclo do nitrogênio liga a atmosfera, onde o gás N₂ representa cerca de 78% do ar, aos organismos. A fixação biológica é feita por bactérias como as do gênero Rhizobium, que vivem em nódulos das raízes de leguminosas — feijão, soja, ervilha — e por cianobactérias, convertendo o N₂ em amônia; descargas elétricas, como relâmpagos, também fixam nitrogênio. Bactérias nitrificantes (Nitrosomonas e Nitrobacter) transformam a amônia em nitrito e depois em nitrato, forma absorvida pelas plantas e incorporada em proteínas e ácidos nucleicos. Bactérias desnitrificantes, em solos alagados e pobres em oxigênio, devolvem o nitrogênio à atmosfera como N₂. Na agricultura brasileira, a adubação nitrogenada aumenta a produtividade, mas o excesso de nitrato pode ser lixiviado para rios e aquíferos.</p>" +
      "<p>A eutrofização ocorre quando o excesso de nutrientes — especialmente fósforo e nitrogênio, vindos de esgoto doméstico e de fertilizantes — chega a corpos de água. A produtividade explode: ocorrem florações de cianobactérias, que liberam toxinas e bloqueiam a luz. Quando essas algas morrem, bactérias decompositoras proliferam e consomem o oxigênio dissolvido, provocando zonas anóxicas e mortandade de peixes. Em reservatórios brasileiros usados para abastecimento e lazer, florações se tornam frequentes em períodos de estiagem. O saneamento básico — coleta e tratamento de esgotos, com remoção de fósforo nas estações — e o manejo adequado de fertilizantes são as principais formas de controle.</p>",
    questoes: [
      {
        enunciado:
          "Um reservatório apresenta produtividade primária líquida de 20.000 kcal/m²/ano, da qual cerca de 10% passa para o nível seguinte, com a mesma eficiência entre os demais níveis. A energia anual disponível para o nível dos peixes carnívoros, que são consumidores terciários, é de aproximadamente:",
        alternativas: [
          "20 kcal/m²/ano, resultado de três transferências tróficas com aproveitamento de cerca de 10% em cada etapa.",
          "200 kcal/m²/ano, pois ocorrem apenas duas transferências tróficas.",
          "2.000 kcal/m²/ano, valor correspondente ao segundo nível de consumidores.",
          "10.000 kcal/m²/ano, já que metade da energia é dissipada em cada nível.",
          "Não é possível estimar, porque a energia flui em ciclos fechados nos ecossistemas.",
        ],
        correta: 0,
        comentario:
          "A cadeia é: produtores → zooplâncton (consumidor primário) → pequenos peixes (secundário) → peixes maiores (terciário). A partir dos produtores ocorrem três transferências: 20.000 → 2.000 → 200 → 20 kcal/m²/ano. Como cerca de 90% da energia é perdida como calor em cada nível, apenas aproximadamente 10% é aproveitado na biomassa do nível seguinte.",
      },
      {
        enunciado:
          "Após um período de estiagem, pescadores registram mortandade de peixes em um reservatório que recebe esgoto não tratado e rede de drenagem de lavouras vizinhas adubadas. A explicação mais adequada para o fenômeno é:",
        alternativas: [
          "O aquecimento das águas aumenta a solubilidade do oxigênio, e o excesso de O₂ dissolvido intoxica os peixes.",
          "As florações de cianobactérias produzem oxigênio em demasia durante o dia, e esse excesso bloqueia a respiração branquial dos peixes.",
          "O aporte de nutrientes (N e P) eleva a produtividade primária; a decomposição da biomassa consome o oxigênio dissolvido, gerando anóxia e morte dos peixes.",
          "O esgoto reduz a concentração de nutrientes na água, e a escassez de alimento causa a mortandade.",
          "O processo é reversível em poucas horas, porque bactérias aeróbicas restauram o oxigênio dissolvido por meio da quimiossíntese.",
        ],
        correta: 2,
        comentario:
          "A eutrofização começa com o excesso de nitrogênio e fósforo, que provocam florações de algas e cianobactérias. Ao morrerem, esses organismos são decompostos por bactérias que consomem o oxigênio dissolvido; a hipóxia resultante leva à mortandade. O controle depende de saneamento e do manejo de fertilizantes, e a recuperação do reservatório costuma levar semanas ou meses, não horas.",
      },
    ],
  },
  /* ===================== BIOLOGIA — TRIMESTRE 3 ===================== */
  {
    id: "txt-bio-4",
    disciplina: "biologia",
    trimestre: 3,
    tipo: "artigo",
    fonte: "Adaptado de material didático",
    titulo: "Fisiologia humana e imunização: sangue, defesas do corpo e vacinas",
    habilidades: ["EM13CNT302", "EM13CNT401"],
    corpo:
      "<p>O sangue humano é formado pelo plasma, uma solução aquosa com cerca de 90% de água, e por elementos figurados: hemácias (cerca de 5 milhões por mililitro), leucócitos (5 mil a 10 mil por microlitro) e plaquetas (200 mil a 400 mil por microlitro). As hemácias contêm hemoglobina, proteína que transporta o oxigênio dos pulmões para os tecidos e parte do gás carbônico de volta. Os leucócitos — neutrófilos, linfócitos e macrófagos, entre outros — atuam na defesa do organismo, enquanto as plaquetas participam da coagulação e da cicatrização de ferimentos. A medula óssea vermelha produz essas células; quando envelhecem, as hemácias são destruídas no fígado e no baço, e seus componentes são reaproveitados.</p>" +
      "<p>A defesa do organismo ocorre em duas frentes. A imunidade inata é a primeira linha: barreiras físicas, como pele e mucosas, além de células fagocitárias, que englobam invasores de forma inespecífica, e da resposta inflamatória, que leva sangue e leucócitos ao local da infecção. A imunidade adaptativa é específica: os linfócitos B reconhecem antígenos, diferenciam-se em plasmócitos produtores de anticorpos e em células de memória; os linfócitos T destroem células infectadas e coordenam a resposta. Uma característica decisiva é a memória imunológica: num segundo contato com o mesmo antígeno, a resposta é mais rápida e intensa. É essa memória que a vacinação explora.</p>" +
      "<p>As vacinas contêm antígenos enfraquecidos ou inativados, ou fragmentos deles, que estimulam o sistema imune a produzir anticorpos e células de memória sem causar a doença. O Programa Nacional de Imunização (PNI), criado no Brasil em 1975, oferece dezenas de vacinas gratuitamente e aplica centenas de milhões de doses por ano, sendo referência mundial. Estima-se que a vacinação contra o sarampo tenha evitado mais de 30 milhões de mortes entre 2000 e 2020. Além de proteger o indivíduo vacinado, a alta cobertura vacinal protege o grupo por meio da chamada imunidade de rebanho: quando a proporção de imunes supera o limiar dado por Vc = (1 − 1/R0) × 100%, em que R0 é o número básico de reprodução do patógeno, a cadeia de transmissão é interrompida. Para o sarampo, cujo R0 é cerca de 12, esse limiar é da ordem de 92%, motivo pelo qual coberturas abaixo de 95% preocupam a saúde pública.</p>",
    questoes: [
      {
        enunciado:
          "O número básico de reprodução R0 indica quantas pessoas um indivíduo infectado contagia, em média, em uma população inteiramente suscetível. Segundo o modelo de imunidade de rebanho, a cobertura vacinal mínima para conter a transmissão é Vc = (1 − 1/R0) × 100%. Para um patógeno com R0 = 12, como o sarampo, essa cobertura é de, aproximadamente:",
        alternativas: ["91,7%.", "8,3%.", "50%.", "75%.", "60%."],
        correta: 0,
        comentario:
          "Vc = (1 − 1/12) × 100% = (1 − 0,083) × 100% = 91,7%. Quanto maior o R0, maior a fração de imunes necessária; por isso doenças muito transmissíveis exigem coberturas altas — próximas de 92%, no caso do sarampo. O valor 8,3% corresponde apenas a 1/R0, ou seja, à fração suscetível tolerada.",
      },
      {
        enunciado:
          "Um jovem picado por cobra é atendido em hospital e recebe soro antiofídico, que contém anticorpos prontos contra a peçonha. Esse procedimento difere da vacinação porque:",
        alternativas: [
          "Ambos são exemplos de imunização ativa, em que o paciente produz seus próprios anticorpos.",
          "O soro contém antígenos inativados que estimulam a produção de anticorpos pelo paciente.",
          "O soro introduz anticorpos prontos, conferindo imunidade passiva, rápida, mas temporária; a vacina, com antígenos, induz imunidade ativa, com produção de anticorpos e células de memória, de efeito duradouro.",
          "O soro confere imunidade permanente, enquanto a vacina tem efeito passageiro de poucos dias.",
          "Ambos são exemplos de imunidade passiva natural, herdada da mãe durante a gestação.",
        ],
        correta: 2,
        comentario:
          "A soroterapia é imunização passiva artificial: anticorpos já prontos agem de imediato, mas são degradados em semanas, sem gerar memória. A vacina é imunização ativa artificial: os antígenos estimulam o organismo a produzir anticorpos e células de memória, conferindo proteção duradoura. Imunidade passiva natural é a recebida pela placenta e pelo leite materno.",
      },
    ],
  },
  /* ===================== FÍSICA — TRIMESTRE 1 ===================== */
  {
    id: "txt-fis-1",
    disciplina: "fisica",
    trimestre: 1,
    tipo: "artigo",
    fonte: "Adaptado de material didático",
    titulo: "Trabalho, energia, potência e as leis de Newton no cotidiano",
    habilidades: ["EM13FIS101", "EM13FIS102"],
    corpo:
      "<p>As três leis de Newton organizam a mecânica. A primeira, a lei da inércia, afirma que um corpo permanece em repouso ou em movimento retilíneo uniforme enquanto a resultante das forças que agem sobre ele for nula: quando um ônibus freia bruscamente, os passageiros são projetados para a frente porque seus corpos continuam em movimento por inércia. O cinto de segurança e o airbag corrigem isso aplicando a força necessária para parar o corpo junto com o veículo. A 72 km/h (cerca de 20 m/s), um passageiro de 70 kg possui energia cinética de aproximadamente 0,5 × 70 × (20)² = 14.000 joules, energia que precisa ser dissipada de forma controlada em uma colisão.</p>" +
      "<p>A segunda lei estabelece a relação entre força, massa e aceleração: F = m · a. Um carro de 1.000 kg que acelera de 0 a 108 km/h (30 m/s) em 8 segundos tem aceleração de 30/8 = 3,75 m/s² e está sujeito a uma força resultante de 3.750 N. A terceira lei, ação e reação, afirma que as forças sempre ocorrem em pares de mesmo módulo, mesma direção e sentidos opostos, agindo em corpos diferentes: quando caminhamos, o pé empurra o chão para trás e o chão empurra o pé para a frente; um foguete sobe porque expele gases quentes para baixo. As forças de ação e reação nunca se anulam uma à outra, pois atuam em corpos distintos.</p>" +
      "<p>Na energia, o conceito de trabalho conecta força e deslocamento: W = F · d · cos θ, em que θ é o ângulo entre a força e o deslocamento. O trabalho da força resultante se converte em energia cinética (Ec = 1/2 · m · v²), enquanto o trabalho das forças conservativas se converte em energia potencial gravitacional (Epg = m · g · h). Um carrinho de montanha-russa com 500 kg, partindo do alto de uma elevação de 20 m, chegaria à base com velocidade de aproximadamente 20 m/s, desprezando atritos: de m · g · h = 1/2 · m · v² vem v = √(2 · g · h) = √(2 · 10 · 20) = 20 m/s. A potência mede a rapidez com que a energia é transformada: P = W/Δt. Um elevador que sobe com 500 kg até 20 m em 40 s desenvolve potência de 2.500 W. Na usina hidrelétrica, uma queda de 120 m com vazão de 100 m³/s pode gerar até cerca de 120 MW: P = ρ · Q · g · H = 1.000 × 100 × 10 × 120 W.</p>",
    questoes: [
      {
        enunciado:
          "Um automóvel de 1.000 kg trafega a 72 km/h (20 m/s) quando o motorista aciona os freios, percorrendo 50 m até parar. A força resultante média aplicada pelos freios foi de, aproximadamente:",
        alternativas: ["200 N", "4.000 N", "400 N", "40.000 N", "20 N"],
        correta: 1,
        comentario:
          "Pelo teorema do trabalho e energia, o trabalho da força de frenagem modifica a energia cinética: −F · d = 0 − (1/2) · m · v². Logo F = m · v²/(2 · d) = 1.000 × (20)²/(2 × 50) = 400.000/100 = 4.000 N. A força é contrária ao movimento, e seu módulo depende da massa, da velocidade e da distância de parada — o que explica por que parar leva mais tempo e espaço a velocidades maiores.",
      },
      {
        enunciado:
          "Em uma colisão frontal, um caminhão de 30 toneladas e um carro de passeio de 1 tonelada, ambos a 90 km/h, trocam forças de contato durante 0,2 s. Considerando o sistema caminhão + carro como isolado durante a colisão, é correto afirmar que:",
        alternativas: [
          "A força exercida pelo caminhão sobre o carro é maior do que a exercida pelo carro sobre o caminhão, porque o caminhão tem massa maior.",
          "O caminhão sofre variação de velocidade maior que a do carro, pois sua quantidade de movimento inicial é trinta vezes maior.",
          "O impulso recebido pelo caminhão é trinta vezes maior que o impulso recebido pelo carro, pois suas velocidades iniciais são iguais.",
          "A quantidade de movimento total do sistema aumenta durante a colisão, porque os módulos das velocidades diminuem.",
          "As forças trocadas entre os veículos têm módulos iguais, mesma direção e sentidos opostos; o carro, de menor massa, sofre maior desaceleração.",
        ],
        correta: 4,
        comentario:
          "Pela terceira lei de Newton, as forças de contato são iguais e opostas; durante os mesmos 0,2 s, os impulsos também são iguais e opostos. Como Δp = m · Δv, e as variações de quantidade de movimento têm o mesmo módulo, 30.000 × Δv(caminhão) = 1.000 × Δv(carro): a velocidade do carro muda cerca de 30 vezes mais que a do caminhão. É por isso que, em colisões, o veículo mais leve sofre danos muito maiores.",
      },
    ],
  },
  {
    id: "txt-fis-2",
    disciplina: "fisica",
    trimestre: 1,
    tipo: "experimento",
    fonte: "Adaptado de material didático",
    titulo: "Experimento: ondas numa corda, no tanque de ondas e na atmosfera",
    habilidades: ["EM13FIS301", "EM13FIS302"],
    corpo:
      "<p>Num experimento de ondulatória, prende-se uma corda longa em uma parede e faz-se a outra extremidade oscilar para cima e para baixo com frequência de 5 Hz. Observam-se cristas e vales percorrendo a corda; medindo-se a distância entre duas cristas consecutivas, chega-se ao comprimento de onda λ = 0,80 m. A velocidade de propagação é dada por v = f · λ = 5 × 0,80 = 4 m/s, e o período, pela relação T = 1/f = 0,20 s. Nota-se que as partículas da corda não atravessam a sala: a onda transporta energia e perturbação, não matéria. A amplitude das oscilações indica a energia transportada, mas não altera a velocidade da onda, que depende do meio e do tipo de onda.</p>" +
      "<p>As ondas sonoras são mecânicas e longitudinais: consistem em compressões e rarefações do ar. A 20 °C, a velocidade do som no ar é de aproximadamente 340 m/s; na água do mar, cerca de 1.500 m/s; no aço, quase 5.000 m/s. Uma nota lá de 440 Hz, nesse meio de 340 m/s, apresenta comprimento de onda de aproximadamente 0,77 m. Frequências acima de 20 kHz são ultrassons, usados em exames de imagem e em sonares; abaixo de 20 Hz estão os infrassons, emitidos por terremotos e pela vocalização de elefantes. Na reflexão do som, o eco permite medir distâncias: se uma embarcação recebe o eco de seu pulso ultrassônico 2 segundos depois, o objeto está a 340 metros, pois a onda percorreu 680 m na ida e na volta (2 · d = v · Δt).</p>" +
      "<p>A luz visível é uma onda eletromagnética transversal que se propaga no vácuo a 3,0 × 10⁸ m/s, com frequências entre cerca de 4 × 10¹⁴ e 8 × 10¹⁴ Hz. Ao mudar de meio, a luz diminui de velocidade e muda de direção: é a refração, explicada pelo índice de refração n = c/v. Por isso um lápis inserido em um copo de água parece quebrado. A maior redução de velocidade para as frequências mais altas faz a luz branca separar-se nas cores do espectro — a dispersão. O arco-íris forma-se quando a luz solar entra nas gotas de chuva, refrata-se e se dispersa, reflete-se na superfície interna da gota e refrata-se novamente ao sair: o violeta desvia-se mais que o vermelho, e o observador vê as cores organizadas em um arco.</p>",
    questoes: [
      {
        enunciado:
          "Uma onda periódica induzida numa corda tem frequência de 5 Hz e medições sucessivas mostram cristas separadas por 0,80 m. A velocidade de propagação e o período dessa onda são, respectivamente:",
        alternativas: [
          "0,16 m/s e 0,20 s",
          "0,16 m/s e 5,0 s",
          "4,0 m/s e 0,20 s",
          "5,0 m/s e 0,16 s",
          "4,0 m/s e 5,0 s",
        ],
        correta: 2,
        comentario:
          "A equação fundamental da ondulatória é v = f · λ = 5 Hz × 0,80 m = 4,0 m/s. O período é o inverso da frequência: T = 1/f = 1/5 = 0,20 s. A amplitude não entra nas contas: ela indica a energia transportada pela onda, não a sua velocidade de propagação.",
      },
      {
        enunciado:
          "O arco-íris que se forma após a chuva resulta, principalmente, do seguinte fenômeno:",
        alternativas: [
          "A luz branca, ao penetrar nas gotículas, é decomposta em suas cores porque cada frequência sofre refração em grau distinto (dispersão); em seguida, a luz refletida na parede interna retorna ao observador.",
          "A luz branca sofre reflexão especular na superfície das gotículas, sem mudar de velocidade, e as cores surgem por interferência destrutiva.",
          "As cores aparecem porque as gotículas emitem luz própria, de frequências diferentes, ao evaporarem.",
          "O fenômeno é devido à difração, pois as gotículas têm dimensões menores que o comprimento de onda da luz visível.",
          "A separação ocorre na atmosfera acima da chuva: partículas de poeira filtram a luz branca em suas cores componentes.",
        ],
        correta: 0,
        comentario:
          "O índice de refração da água varia com a frequência, de modo que o violeta desvia-se mais que o vermelho — é a dispersão. A luz refrata-se ao entrar na gota, reflete-se internamente e refrata-se novamente ao sair, chegando ao observador organizada em cores. A difração exigiria obstáculos de dimensões comparáveis ao comprimento de onda da luz, e as gotas são muito maiores que isso.",
      },
    ],
  },
  /* ===================== FÍSICA — TRIMESTRE 2 ===================== */
  {
    id: "txt-fis-3",
    disciplina: "fisica",
    trimestre: 2,
    tipo: "tabela",
    fonte: "Adaptado de material didático",
    titulo: "Tabela de consumo: Lei de Ohm, potência elétrica e geração nas usinas",
    habilidades: ["EM13FIS205", "EM13FIS206"],
    corpo:
      "<p>A Lei de Ohm relaciona a diferença de potencial U, em volts, aplicada a um resistor, à corrente elétrica i, em ampères, que o atravessa: U = R · i, em que R é a resistência, em ohms. A tabela a seguir mostra a potência nominal, a tensão de alimentação e a corrente elétrica aproximada de aparelhos residenciais comuns (i = P/U).</p>" +
      "<table><tr><th>Aparelho</th><th>Potência (W)</th><th>Tensão (V)</th><th>Corrente (A)</th><th>Uso típico</th></tr>" +
      "<tr><td>Chuveiro elétrico — posição inverno</td><td>6.400</td><td>220</td><td>29,1</td><td>40 min por dia</td></tr>" +
      "<tr><td>Chuveiro elétrico — posição verão</td><td>3.600</td><td>220</td><td>16,4</td><td>30 min por dia</td></tr>" +
      "<tr><td>Ar-condicionado de 12.000 BTUs</td><td>1.400</td><td>220</td><td>6,4</td><td>8 h por dia</td></tr>" +
      "<tr><td>Ferro de passar</td><td>1.050</td><td>127</td><td>8,3</td><td>1 h por dia, 3 vezes por semana</td></tr>" +
      "<tr><td>Geladeira</td><td>150</td><td>127</td><td>1,2</td><td>8 h de compressor por dia</td></tr>" +
      "<tr><td>Televisor LED de 55 polegadas</td><td>140</td><td>127</td><td>1,1</td><td>5 h por dia</td></tr>" +
      "<tr><td>Lâmpada LED</td><td>9</td><td>127</td><td>0,07</td><td>5 h por dia</td></tr></table>" +
      "<p>Observar a coluna de correntes explica por que chuveiros elétricos e ar-condicionados exigem fiação e disjuntores próprios: o chuveiro na posição inverno chega a quase 30 A, valor que supera a capacidade de um circuito residencial de 20 A. A potência dissipada num elemento resistivo pode ser calculada de três formas equivalentes: P = U · i, P = i² · R e P = U²/R. A energia consumida é a potência multiplicada pelo tempo: E = P · Δt, medida em quilowatt-hora (kWh) nas contas de luz. Uma residência que use diariamente o chuveiro na posição inverno por 40 minutos (6,4 kW), uma geladeira por 8 horas (0,15 kW) e dez lâmpadas LED por 5 horas (0,09 kW ao todo) consome cerca de 4,27 + 1,20 + 0,45 = 5,92 kWh por dia, aproximadamente 178 kWh por mês. O chuveiro elétrico, isoladamente, responde por mais da metade desse consumo, razão pela qual banhos curtos e a posição verão são as medidas domésticas de economia mais eficazes.</p>" +
      "<p>Na outra ponta, a geração. A usina hidrelétrica Itaipu, na fronteira do Brasil com o Paraguai, tem 20 unidades geradoras de 700 MW cada, totalizando 14.000 MW (14 GW): dez delas geram energia a 50 Hz, para o Paraguai, e dez a 60 Hz, para o Brasil. A matriz elétrica brasileira é majoritariamente renovável: a hidreletricidade responde por cerca de 60% da geração, e fontes como eólica e solar têm crescido rapidamente. Para transportar energia até os centros de consumo com perdas reduzidas, a transmissão ocorre em tensões elevadas — 230 kV, 500 kV e até 750 kV em corrente alternada — porque, para uma dada potência P = U · i, tensões maiores implicam correntes menores e, portanto, menores perdas por efeito Joule nas longas linhas (P = i² · R). Nas subestações, transformadores alteram os níveis de tensão, aplicando o princípio da indução eletromagnética.</p>",
    questoes: [
      {
        enunciado:
          "Um chuveiro elétrico de potência 6.400 W é ligado em uma rede de 220 V. A resistência elétrica do seu elemento de aquecimento é de, aproximadamente:",
        alternativas: ["0,11 Ω", "29,1 Ω", "1.312 Ω", "7,56 Ω", "34,6 Ω"],
        correta: 3,
        comentario:
          "De P = U²/R vem R = U²/P = (220 V)²/6.400 W = 48.400/6.400 = 7,56 Ω. A partir de R, obtém-se a corrente i = P/U = 6.400/220 ≈ 29,1 A, valor que aparece na alternativa B, apresentado erroneamente como uma resistência de 29,1 Ω. O valor 29,1 corresponde à corrente em ampères, não à resistência; dividir a potência pela tensão ao quadrado (6.400/48.400) daria 0,132 Ω, e não 1.312 Ω — o valor 1.312 Ω não corresponde a nenhum cálculo coerente com os dados.",
      },
      {
        enunciado:
          "Uma residência utiliza diariamente: chuveiro de 6.400 W por 40 minutos, geladeira de 150 W com compressor funcionando 8 horas por dia e dez lâmpadas LED de 9 W acesas 5 horas por dia. O consumo mensal (30 dias) é de aproximadamente:",
        alternativas: ["36 kWh", "178 kWh", "146 kWh", "554 kWh", "2.448 kWh"],
        correta: 1,
        comentario:
          "Chuveiro: 6,4 kW × 0,667 h = 4,27 kWh/dia. Geladeira: 0,15 kW × 8 h = 1,20 kWh/dia. Lâmpadas: 10 × 0,009 kW × 5 h = 0,45 kWh/dia. Total diário: 5,92 kWh; em 30 dias, 5,92 × 30 ≈ 178 kWh. O valor de 36 kWh corresponderia a considerar apenas a geladeira, e 146 kWh resultaria de estimar o banho em 30 minutos.",
      },
    ],
  },
  /* ===================== FÍSICA — TRIMESTRE 3 ===================== */
  {
    id: "txt-fis-4",
    disciplina: "fisica",
    trimestre: 3,
    tipo: "experimento",
    fonte: "Adaptado de material didático",
    titulo: "Experimento: calorimetria, propagação do calor, termodinâmica e empuxo",
    habilidades: ["EM13FIS201", "EM13FIS303"],
    corpo:
      "<p>Num calorímetro de paredes isoladas, misturam-se 400 g de água a 25 °C com um bloco metálico de 500 g a 150 °C, feito de metal de calor específico 0,11 cal/(g · °C). Como o calorímetro isola o sistema do ambiente, o calor cedido pelo metal é igual ao calor recebido pela água: Q<sub>cedido</sub> + Q<sub>recebido</sub> = 0, com Q = m · c · ΔT. Assim, 500 × 0,11 × (150 − T) = 400 × 1,00 × (T − 25), de onde 8.250 − 55 T = 400 T − 10.000, e portanto T = 18.250/455 = 40,1 °C. O elevado calor específico da água explica sua importância como regulador térmico: por absorver muito calor sem variar muito de temperatura, a água ameniza o clima das regiões costeiras e resfria motores de automóveis.</p>" +
      "<table><tr><th>Substância</th><th>Calor específico (cal/(g · °C))</th><th>Calor específico (J/(kg · °C))</th></tr>" +
      "<tr><td>Água</td><td>1,00</td><td>4.200</td></tr>" +
      "<tr><td>Alumínio</td><td>0,22</td><td>900</td></tr>" +
      "<tr><td>Ferro</td><td>0,11</td><td>460</td></tr>" +
      "<tr><td>Cobre</td><td>0,093</td><td>390</td></tr>" +
      "<tr><td>Madeira</td><td>0,42</td><td>1.760</td></tr>" +
      "<tr><td>Chumbo</td><td>0,031</td><td>130</td></tr></table>" +
      "<p>O calor se propaga por três mecanismos. A condução ocorre em meios materiais, principalmente em metais, em que os elétrons livres transportam energia rapidamente — razão pela qual panelas de metal têm cabos de madeira ou plástico, materiais isolantes. A convecção ocorre nos fluidos por deslocamento de massa: ar quente sobe e ar frio desce, gerando a brisa marítima e o aquecimento dos ambientes por aquecedores. A irradiação, por meio de ondas eletromagnéticas, dispensa meio material: é assim que a energia do Sol atravessa o espaço e chega à Terra. Nas mudanças de estado, a energia entra ou sai sem variar a temperatura: fundir 1 g de gelo a 0 °C exige cerca de 80 cal (calor latente de fusão), enquanto vaporizar 1 g de água a 100 °C exige cerca de 540 cal. Por isso uma bebida com gelo resfria de forma mais eficiente do que com a mesma massa de água gelada: durante a fusão, o gelo absorve muito calor sem se aquecer.</p>" +
      "<p>A primeira lei da termodinâmica, ΔU = Q − W, expressa a conservação da energia: a variação da energia interna de um sistema resulta do calor recebido e do trabalho realizado. A segunda lei estabelece que o calor flui espontaneamente do corpo mais quente para o mais frio e que nenhuma máquina converte integralmente calor em trabalho. Usinas térmicas operam entre uma fonte quente e uma fonte fria, e seu rendimento máximo é limitado pelo ciclo de Carnot: η = 1 − T<sub>fria</sub>/T<sub>quente</sub>. Para uma usina que opere entre 400 °C (673 K) e 30 °C (303 K), esse limite é cerca de 55%; as usinas reais ficam em torno de 40%. Na hidrostática, o princípio de Arquimedes afirma que todo corpo imerso num fluido em equilíbrio recebe um empuxo vertical para cima igual ao peso do fluido deslocado: E = ρ<sub>fluido</sub> · V<sub>deslocado</sub> · g. Um cubo de aço de 20 cm³ (0,156 kg) imerso em água desloca 20 g de líquido, sendo empurrado por 0,20 N, muito menos que seu peso de 1,56 N: por isso afunda. Já um navio de aço de 50.000 toneladas flutua porque seu casco desloca um volume de água de massa maior que a sua. A densidade explica ainda por que o gelo, com 0,92 g/cm³, mantém cerca de 92% de seu volume submerso, e por que balões de ar quente sobem: ao aquecer o ar interno de 290 K para 350 K, sua densidade cai de cerca de 1,2 para 1,0 g/L, e o empuxo supera o peso total do conjunto.</p>",
    questoes: [
      {
        enunciado:
          "Em um calorímetro, 400 g de água a 25 °C recebem um bloco metálico de 500 g a 150 °C, de calor específico 0,11 cal/(g · °C), num calorímetro ideal. A temperatura final de equilíbrio térmico é de aproximadamente:",
        alternativas: ["44,5 °C", "37,5 °C", "58,3 °C", "30,2 °C", "40,1 °C"],
        correta: 4,
        comentario:
          "Q_perdida pelo metal = Q_ganha pela água: 500 × 0,11 × (150 − T) = 400 × 1,00 × (T − 25), ou seja, 8.250 − 55 T = 400 T − 10.000, logo 455 T = 18.250 e T ≈ 40,1 °C. O resultado é sempre intermediário entre as temperaturas iniciais e, como a capacidade térmica da água (400 cal/°C) é muito maior que a do bloco (55 cal/°C), a temperatura final fica mais próxima da da água.",
      },
      {
        enunciado:
          "Um cubo metálico de massa 156 g e volume 20 cm³ é totalmente imerso em água (ρ = 1,0 g/cm³; g = 10 m/s²). Analisando o empuxo e o peso, é correto afirmar que:",
        alternativas: [
          "O empuxo é de 1,56 N, igual ao peso do cubo; por isso ele fica em equilíbrio no interior da água.",
          "O empuxo é de 2,00 N, e o cubo sobe até a superfície, onde passa a flutuar.",
          "O empuxo é de 0,20 N, menor que o peso de 1,56 N; por isso o cubo afunda.",
          "Por ser metálico, o cubo não sofre empuxo, pois flutua apenas materiais menos densos que o ar.",
          "O empuxo depende apenas do volume do corpo, não importando a densidade do fluido.",
        ],
        correta: 2,
        comentario:
          "E = ρ<sub>fluido</sub> · V · g = 1,0 g/cm³ × 20 cm³ = 20 g de água deslocada, cujo peso é 0,02 kg × 10 m/s² = 0,20 N. O peso do cubo é 0,156 kg × 10 m/s² = 1,56 N. Como o peso supera o empuxo, o corpo afunda; a densidade do cubo (7,8 g/cm³) é muito maior que a da água. O empuxo depende tanto do volume deslocado quanto da densidade do fluido.",
      },
    ],
  },
  /* ===================== QUÍMICA — TRIMESTRE 1 ===================== */
  {
    id: "txt-qui-1",
    disciplina: "quimica",
    trimestre: 1,
    tipo: "tabela",
    fonte: "Adaptado de material didático",
    titulo: "Tabela: modelos atômicos e organização da tabela periódica",
    habilidades: ["EM13QMU101", "EM13QMU102"],
    corpo:
      "<p>A ideia de átomo passou por reformulações sucessivas. Em 1803, John Dalton propôs o modelo da esfera maciça e indivisível para explicar as leis ponderais das reações. Em 1897, com a descoberta do elétron, Joseph Thomson sugeriu o modelo do pudim de passas, com cargas negativas incrustadas numa massa positiva. Em 1911, o experimento de Geiger, Marsden e Rutherford mostrou que a maioria das partículas alfa atravessava uma fina lâmina de ouro sem desvio, enquanto poucas eram desviadas com grandes ângulos: o modelo passou a prever um núcleo pequeno, denso e positivo, envolto por um grande espaço vazio. Em 1913, Niels Bohr introduziu níveis de energia quantizados, explicando por que átomos excitados emitem espectros de linhas. No século XX, o modelo quântico substituiu órbitas definidas por orbitais, regiões de probabilidade de encontrar o elétron, regidas pelo princípio da incerteza de Heisenberg.</p>" +
      "<table><tr><th>Elemento</th><th>Símbolo</th><th>Número atômico (Z)</th><th>Distribuição eletrônica</th><th>Massa molar (g/mol)</th></tr>" +
      "<tr><td>Hidrogênio</td><td>H</td><td>1</td><td>1s¹</td><td>1,0</td></tr>" +
      "<tr><td>Carbono</td><td>C</td><td>6</td><td>1s² 2s² 2p²</td><td>12,0</td></tr>" +
      "<tr><td>Oxigênio</td><td>O</td><td>8</td><td>1s² 2s² 2p⁴</td><td>16,0</td></tr>" +
      "<tr><td>Sódio</td><td>Na</td><td>11</td><td>1s² 2s² 2p⁶ 3s¹</td><td>23,0</td></tr>" +
      "<tr><td>Enxofre</td><td>S</td><td>16</td><td>1s² 2s² 2p⁶ 3s² 3p⁴</td><td>32,1</td></tr>" +
      "<tr><td>Cloro</td><td>Cl</td><td>17</td><td>1s² 2s² 2p⁶ 3s² 3p⁵</td><td>35,5</td></tr>" +
      "<tr><td>Ferro</td><td>Fe</td><td>26</td><td>1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶</td><td>55,8</td></tr>" +
      "<tr><td>Cobre</td><td>Cu</td><td>29</td><td>1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d¹⁰</td><td>63,5</td></tr></table>" +
      "<p>Na tabela periódica, regida pela lei periódica, os elementos estão ordenados por número atômico em períodos (linhas) e grupos (colunas) com propriedades químicas semelhantes. Ao longo de um período, da esquerda para a direita, o raio atômico diminui e a eletronegatividade aumenta, porque a carga nuclear efetiva cresce e atrai os elétrons de valência com mais força; ao descer num grupo, o raio aumenta, pois novas camadas são ocupadas. O flúor é o elemento mais eletronegativo (cerca de 4,0 na escala de Pauling), e o césio, um dos metais mais reativos. Isótopos — átomos com mesmo Z e diferente número de nêutrons — têm aplicações notáveis: o carbono-14 permite datação arqueológica, e o iodo-131 é empregado no diagnóstico e no tratamento de doenças da tireoide.</p>",
    questoes: [
      {
        enunciado:
          "O sódio (Z = 11) e o cloro (Z = 17) estão no mesmo período da tabela periódica. Comparando os dois elementos, é correto afirmar que:",
        alternativas: [
          "O cloro tem menor raio atômico e maior eletronegatividade, porque, ao longo do período, o aumento da carga nuclear efetiva atrai mais fortemente os elétrons de valência.",
          "O sódio tem menor raio atômico porque possui menos camadas eletrônicas que o cloro.",
          "Ambos têm raios atômicos iguais, pois pertencem ao mesmo período da tabela.",
          "O sódio tem energia de ionização maior, porque metais alcalinos seguram seus elétrons com mais força.",
          "Ambos são gases nobres com configurações de valência completas.",
        ],
        correta: 0,
        comentario:
          "Sódio e cloro ocupam o terceiro período: ambos têm três camadas eletrônicas. Ao longo do período, a carga nuclear aumenta, os elétrons de valência são atraídos mais fortemente e o raio diminui; a eletronegatividade e a energia de ionização aumentam. Daí o cloro (3,16 na escala de Pauling) ser muito mais eletronegativo que o sódio (0,93), e a reação entre eles formar o composto iônico NaCl.",
      },
      {
        enunciado:
          "No experimento de Rutherford, a maior parte das partículas alfa atravessou uma fina lâmina de ouro praticamente sem desvio, mas aproximadamente uma em cada oito mil era desviada com ângulos superiores a 90 graus. Essas observações permitiam concluir que o átomo:",
        alternativas: [
          "É uma esfera maciça e indivisível, com cargas distribuídas uniformemente.",
          "Contém elétrons dispersos numa massa positiva, como num pudim de passas.",
          "Tem elétrons organizados em órbitas circulares de energia quantizada.",
          "Possui um núcleo pequeno, denso e positivamente carregado, distante da região ocupada pelos elétrons.",
          "Não possui núcleo, mas um mar de elétrons circulando livremente entre os prótons.",
        ],
        correta: 3,
        comentario:
          "Partículas alfa são positivas; ao serem repelidas com grandes ângulos, só podiam estar interagindo com uma região muito pequena, densa e de carga positiva no centro do átomo — o núcleo. O modelo de Thomson previra apenas desvios pequenos. O modelo de Bohr, com órbitas quantizadas, veio depois e explicava os espectros de linhas, não o resultado da lâmina de ouro.",
      },
    ],
  },
  {
    id: "txt-qui-2",
    disciplina: "quimica",
    trimestre: 1,
    tipo: "artigo",
    fonte: "Adaptado de material didático",
    titulo: "Ligações químicas, polaridade e a ação de sabões e tensoativos",
    habilidades: ["EM13QMU201", "EM13QMU204"],
    corpo:
      "<p>As ligações químicas surgem da interação entre os elétrons de valência dos átomos. Na ligação iônica, típica entre metais e ametais, um átomo transfere elétrons a outro, formando cátions e ânions mantidos por atração eletrostática: o NaCl, a calcita (CaCO₃) e o hidróxido de sódio (NaOH) são exemplos. Na ligação covalente, átomos, em geral ametais, compartilham pares de elétrons, como em H₂O, CO₂ e CH₄. Na ligação metálica, cátions metálicos ficam imersos num mar de elétrons livres, o que explica a condutibilidade, a maleabilidade e o brilho dos metais. As diferenças se refletem nas propriedades: compostos iônicos formam sólidos cristalinos de alto ponto de fusão, que conduzem corrente quando dissolvidos ou fundidos; moléculas covalentes apresentam pontos de fusão menores; os metais conduzem no estado sólido.</p>" +
      "<p>A polaridade decorre da diferença de eletronegatividade entre os átomos ligados: quando dois átomos iguais se ligam, como em H₂ e O₂, a nuvem eletrônica é simétrica e a ligação é apolar; quando há diferença significativa, como em H₂O e HCl, a molécula apresenta polos, e a ligação é covalente polar. A regra prática semelhante dissolve semelhante explica muito do cotidiano: o sal de cozinha se dissolve em água e não em óleo; o iodo se dissolve melhor em álcool do que em água. Moléculas apolares, como as de gordura, não se dispersam na água, tendendo a se separar em outra fase.</p>" +
      "<p>O sabão é um sal de ácido carboxílico de cadeia longa, obtido na saponificação de triglicerídeos (óleos e gorduras) com hidróxido de sódio, que produz glicerol e carboxilatos. Sua molécula é anfifílica: uma longa cadeia hidrocarbônica apolar, lipofílica, e uma extremidade iônica polar, hidrofílica. Em água, os tensoativos — categoria que inclui sabões e detergentes — orientam-se na interface com a gordura: as cadeias apolares penetram na gordura e as cabeças polares ficam voltadas para a água, formando micelas que mantêm a gordura dispersa e permitem que ela seja enxaguada. Os tensoativos também reduzem a tensão superficial da água, o que aumenta a sua molhabilidade e facilita a limpeza. Em águas duras, ricas em íons Ca²⁺ e Mg²⁺, o sabão forma sais insolúveis, perdendo eficiência e produzindo espuma escassa; os detergentes sintéticos, como os sulfonatos, são menos afetados e hoje são biodegradáveis. O mesmo princípio anfifílico organiza as membranas celulares, formadas por fosfolipídios.</p>",
    questoes: [
      {
        enunciado:
          "A remoção da gordura de uma panela com água e detergente ocorre porque:",
        alternativas: [
          "O detergente reage quimicamente com a gordura, convertendo-a em sais solúveis em água.",
          "As moléculas do detergente, anfifílicas, formam micelas que mantêm a gordura dispersa na água, com as cadeias apolares voltadas para dentro e as cabeças polares para fora.",
          "O detergente aumenta tanto a tensão superficial da água que ela passa a molhar e a dissolver a gordura.",
          "A água, sendo polar, dissolve a gordura desde que o detergente reduza a temperatura da mistura.",
          "O detergente torna a água apolar, o que permite dissolver a gordura por semelhança de polaridade.",
        ],
        correta: 1,
        comentario:
          "A molécula de sabão ou detergente tem uma extremidade polar (hidrofílica) e uma cadeia longa apolar (lipofílica). Na micela, as cadeias apolares envolvem a gordura e as cabeças polares ficam em contato com a água, mantendo a emulsão estável até o enxágue. O detergente reduz, e não aumenta, a tensão superficial; e a água, polar, não dissolve a gordura apolar (semelhante dissolve semelhante).",
      },
      {
        enunciado:
          "Considerando as diferenças de eletronegatividade: NaCl (Δ ≈ 2,2), HCl (Δ ≈ 1,0) e H₂ (Δ = 0), as ligações presentes nesses compostos classificam-se, respectivamente, como:",
        alternativas: [
          "Covalente apolar, covalente polar e metálica.",
          "Iônica, covalente apolar e iônica.",
          "Covalente polar, covalente polar e iônica.",
          "Metálica, iônica e covalente apolar.",
          "Iônica, covalente polar e covalente apolar.",
        ],
        correta: 4,
        comentario:
          "Diferenças de eletronegatividade acima de cerca de 1,7 indicam ligação iônica (metal com ametal): NaCl, formado por sódio (0,93) e cloro (3,16), é iônico. Entre 0,4 e 1,7, a ligação é covalente polar: HCl, com hidrogênio (2,20) e cloro (3,16), é polar. Com Δ próxima de zero, entre átomos iguais, a ligação é covalente apolar: H₂.",
      },
    ],
  },
  /* ===================== QUÍMICA — TRIMESTRE 2 ===================== */
  {
    id: "txt-qui-3",
    disciplina: "quimica",
    trimestre: 2,
    tipo: "experimento",
    fonte: "Adaptado de material didático",
    titulo: "Experimento: curva de solubilidade, concentração e etapas do tratamento de água",
    habilidades: ["EM13QMU202", "EM13QMU205"],
    corpo:
      "<p>Num experimento de solubilidade, aquece-se 100 g de água e adiciona-se açúcar (sacarose) mexendo sempre, até que o excesso passe a se depositar no fundo: a solução está saturada. Repetindo o procedimento em diferentes temperaturas, obtém-se a curva de solubilidade. A tabela mostra a massa de sacarose que satura 100 g de água em cada temperatura.</p>" +
      "<table><tr><th>Temperatura (°C)</th><th>0</th><th>20</th><th>40</th><th>60</th><th>80</th><th>100</th></tr>" +
      "<tr><td>Sacarose dissolvida em 100 g de água (g)</td><td>179</td><td>204</td><td>238</td><td>287</td><td>362</td><td>487</td></tr></table>" +
      "<p>Assim, uma solução saturada a 60 °C, com cerca de 287 g de açúcar em 100 g de água, resfriada até 20 °C, só mantém 204 g dissolvidos: os cerca de 83 g excedentes cristalizam. Se o resfriamento for lento e sem perturbação, pode-se obter uma solução supersaturada, instável, que cristaliza instantaneamente ao primeiro germe de cristalização. O mesmo raciocínio explica por que o sal de cozinha, cuja solubilidade varia pouco com a temperatura (cerca de 36 g por 100 g de água a 20 °C e 40 g a 100 °C), é obtido em salinas, pela evaporação da água do mar, e não pelo resfriamento.</p>" +
      "<p>A concentração comum relaciona massa de soluto e volume de solução: C = m₁/V. Em termos práticos, o soro fisiológico tem 9 g de NaCl por litro (9 g/L, ou 0,9% m/V); uma solução de soda cáustica usada em limpeza pesada pode chegar a 500 g/L. Em soluções muito diluídas, usa-se ppm, equivalente a mg/L numa solução aquosa: o cloro residual livre da água tratada, que deve ser mantido entre 0,2 e 0,5 mg/L em toda a rede de distribuição (mínimo legal de 0,2 mg/L e máximo recomendado de 2,0 mg/L, conforme a Portaria de Potabilidade), equivale a 0,2 a 0,5 ppm. Para preparar 500 mL de solução de sacarose a 100 g/L, dissolvem-se 50 g de açúcar e completa-se com água até a marca do balão volumétrico.</p>" +
      "<p>No tratamento de água, a água bruta captada de mananciais passa por etapas que removem sólidos, matéria orgânica e microrganismos: na coagulação e floculação, adiciona-se sulfato de alumínio (10 a 50 mg/L), que forma flocos de hidróxido de alumínio e neutraliza as cargas das partículas coloidais, permitindo que se agrupem; na decantação, os flocos sedimentam; na filtração em camadas de areia, carvão ativado e pedregulhos, retêm-se as partículas restantes; na desinfecção, adiciona-se cloro (ou cloramina), que inativa bactérias e vírus; e, em muitos municípios, corrige-se o pH com cal e adiciona-se flúor na faixa de 0,6 a 0,8 mg/L, prevenindo cáries. O lodo gerado no processo é encaminhado a aterros industriais. No Brasil, milhões de pessoas ainda dependem de soluções alternativas de abastecimento, o que mantém a importância do saneamento na saúde pública.</p>",
    questoes: [
      {
        enunciado:
          "Uma solução foi preparada dissolvendo-se 60 g de cloreto de sódio em água até completar 400 mL. Comparada ao coeficiente de solubilidade do sal (cerca de 357 g/L a 25 °C), a concentração e a classificação dessa solução são:",
        alternativas: [
          "6,7 g/L; insaturada.",
          "150 g/L; saturada, com soluto não dissolvido no fundo do recipiente.",
          "150 g/L; insaturada.",
          "60 g/L; supersaturada.",
          "24 g/L; saturada.",
        ],
        correta: 2,
        comentario:
          "C = m₁/V = 60 g / 0,4 L = 150 g/L. Como o coeficiente de solubilidade do NaCl a 25 °C é cerca de 357 g/L, a solução ainda comportaria muito mais soluto: é insaturada. O valor 6,7 g/L resultaria de dividir o volume pela massa, e confundir concentração com solubilidade máxima leva erroneamente à classificação saturada.",
      },
      {
        enunciado:
          "Numa estação de tratamento de água, o sulfato de alumínio é adicionado à água bruta com a finalidade principal de:",
        alternativas: [
          "Promover a coagulação das partículas coloidais em suspensão, por neutralização de cargas, formando flocos que decantam ou são retidos na filtração.",
          "Eliminar os microrganismos patogênicos, substituindo a etapa de cloração.",
          "Aumentar a dureza da água, elevando o pH para valores fortemente alcalinos.",
          "Fornecer flúor à água distribuída, prevenindo a formação de cáries.",
          "Retirar gases dissolvidos, como o oxigênio, por arraste com alumínio metálico.",
        ],
        correta: 0,
        comentario:
          "O sulfato de alumínio (ou o PAC) age na coagulação e floculação: os íons alumínio formam flocos de hidróxido de alumínio e neutralizam as cargas das partículas coloidais, que se agrupam, sedimentam na decantação e são retiradas na filtração. A desinfecção é feita pelo cloro (ou cloramina e ozônio), a fluoretação adiciona fluoreto, e a correção de pH usa cal — nenhuma dessas é função do sulfato de alumínio.",
      },
    ],
  },
  {
    id: "txt-qui-4",
    disciplina: "quimica",
    trimestre: 2,
    tipo: "artigo",
    fonte: "Adaptado de material didático",
    titulo: "Balanceamento, estequiometria, termoquímica, química orgânica e chuva ácida",
    habilidades: ["EM13QMU301", "EM13QMU302"],
    corpo:
      "<p>As equações químicas foram consolidadas pela lei da conservação da massa, de Lavoisier: os átomos não se criam nem se destroem, apenas se rearranjam. Por isso toda equação precisa estar balanceada: o número de átomos de cada elemento deve ser igual nos dois lados. A queima completa do octano (C₈H₁₈), componente representativo da gasolina, é representada por 2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O. As massas molares (C = 12 g/mol, H = 1 g/mol, O = 16 g/mol) permitem montar as relações de massa: 2 mols de octano (228 g) reagem com 25 mols de O₂ (800 g), produzindo 16 mols de CO₂ (704 g) e 18 mols de H₂O (324 g), somando 1.028 g dos dois lados. Em valores aproximados, queimar 1 litro de gasolina (cerca de 0,75 kg) libera cerca de 2,3 kg de gás carbônico na atmosfera.</p>" +
      "<p>As reações químicas trocam energia com o ambiente, registrada pela variação de entalpia (ΔH). Reações endotérmicas absorvem calor e apresentam ΔH positivo: a decomposição do calcário (CaCO₃ → CaO + CO₂, cerca de +178 kJ/mol) exige fornos aquecidos, e a fotossíntese absorve luz. Reações exotérmicas liberam calor e têm ΔH negativo: as combustões, a neutralização entre ácido e base (cerca de −57 kJ/mol de água formada) e a respiração celular. Em diagramas de energia, o ΔH é a diferença entre a entalpia dos produtos e a dos reagentes; quando os produtos ficam em nível energético inferior ao dos reagentes, o calor é liberado. Bolsas de gelo instantâneo, que contêm nitrato de amônio e água, exploram uma dissolução endotérmica para resfriar lesões.</p>" +
      "<p>A chuva naturalmente ácida, com pH próximo de 5,6, resulta do CO₂ atmosférico dissolvido. A chuva ácida, com pH abaixo de 5,0, decorre da queima de combustíveis fósseis: o enxofre presente no diesel e no carvão produz SO₂, e as altas temperaturas dos motores permitem a reação do N₂ com o O₂, formando NOₓ. Na atmosfera, esses óxidos se oxidam e reagem com a umidade: SO₃ + H₂O → H₂SO₄ (ácido sulfúrico) e 4 NO₂ + 2 H₂O + O₂ → 4 HNO₃ (ácido nítrico). A precipitação corrói monumentos de mármore (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂), acidifica solos e lagos e danifica vegetações. Nas décadas de 1970 e 1980, as chaminés de Cubatão (SP) tornaram a região um caso crítico de poluição atmosférica. A redução do enxofre no diesel e no carvão, os conversores catalíticos e as leis de emissão de poluentes vêm reduzindo o problema.</p>" +
      "<p>Na química orgânica, compostos de mesma fórmula molecular, mas com estruturas diferentes, são isômeros. O butano (CH₃CH₂CH₂CH₃) e o 2-metilpropano (C₄H₁₀) são isômeros de cadeia; o etanol (CH₃CH₂OH) e o metoximetano (CH₃OCH₃), ambos de fórmula C₂H₆O, são isômeros de função, com propriedades bem distintas: o etanol é líquido de ponto de ebulição 78 °C, solúvel em água, e o outro é gás à temperatura ambiente. Os grupos funcionais organizam as famílias: hidrocarbonetos, álcoois, aldeídos e cetonas, ácidos carboxílicos, ésteres. A queima do etanol segue C₂H₆O + 3 O₂ → 2 CO₂ + 3 H₂O. Quando a queima é incompleta, forma-se monóxido de carbono (2 C₈H₁₈ + 17 O₂ → 16 CO + 18 H₂O): o CO liga-se à hemoglobina com afinidade cerca de 200 vezes maior que o oxigênio, causando intoxicações frequentes em ambientes mal ventilados com motores ligados.</p>",
    questoes: [
      {
        enunciado:
          "A queima completa de 228 g de octano (C₈H₁₈, massa molar 114 g/mol) consome, em condições estequiométricas, quantos mols de O₂ e produz quantos mols de CO₂?",
        alternativas: [
          "1,25 mol de O₂ e 0,8 mol de CO₂.",
          "6,25 mol de O₂ e 4 mol de CO₂.",
          "12,5 mol de O₂ e 8 mol de CO₂.",
          "25 mol de O₂ e 16 mol de CO₂.",
          "50 mol de O₂ e 32 mol de CO₂.",
        ],
        correta: 3,
        comentario:
          "A equação balanceada é 2 C₈H₁₈ + 25 O₂ → 16 CO₂ + 18 H₂O. Como 228 g correspondem a 2 mols de octano, as proporções diretas são 25 mols de O₂ e 16 mols de CO₂ — em gramas, 800 g de O₂ e 704 g de CO₂, confirmando a conservação da massa (1.028 g de reagentes e 1.028 g de produtos). Por mol de octano, a proporção é de 12,5 mols de O₂ e 8 mols de CO₂.",
      },
      {
        enunciado:
          "Do ponto de vista termoquímico, uma reação em que os produtos têm entalpia menor que a dos reagentes é classificada como:",
        alternativas: [
          "Endotérmica, com ΔH maior que zero, absorvendo calor do ambiente.",
          "Endotérmica, com ΔH menor que zero, liberando calor.",
          "Exotérmica, com ΔH maior que zero, absorvendo calor.",
          "Exotérmica, com ΔH igual a zero, sem troca de calor com o ambiente.",
          "Exotérmica, com ΔH menor que zero, liberando calor para o ambiente.",
        ],
        correta: 4,
        comentario:
          "A variação de entalpia é ΔH = H(produtos) − H(reagentes). Produtos em nível energético inferior implicam ΔH negativo, ou seja, calor liberado: a reação é exotérmica. Combustões e neutralizações são exemplos típicos; decomposições como a do calcário são endotérmicas e exigem aquecimento.",
      },
    ],
  },
];
if (typeof window !== "undefined") { window.TEXTOS_NAT = TEXTOS_NAT; }
