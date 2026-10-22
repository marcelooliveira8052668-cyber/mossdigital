/* Questoes extras para o simulado — lote 1 (Matematica, Linguagens, Humanas) */
const QUESTOES_EXTRA_1 = [
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
      "1.200 g",
      "1.350 g",
      "1.500 g",
      "1.800 g",
      "2.000 g"
    ],
    "correta": 2,
    "comentario": "As grandezas são diretamente proporcionais: 600/8 = x/20 → x = 600 × 20 / 8 = 12.000/8 = 1.500 g. Monte a proporção sempre com as grandezas equivalentes na mesma coluna."
  },
  {
    "disciplina": "Matemática - Função do 1º grau",
    "enunciado": "Uma empresa de telefonia cobra R$ 0,60 por minuto de ligação mais uma taxa fixa de R$ 12,00 mensais. Qual expressão representa o valor total pago, em reais, por um cliente que fala x minutos no mês?",
    "alternativas": [
      "12x + 0,60",
      "0,60x + 12",
      "12,60x",
      "(12 + 0,60) ÷ x",
      "0,60x × 12"
    ],
    "correta": 1,
    "comentario": "O valor tem uma parte fixa (a taxa de R$ 12,00) e uma parte variável (R$ 0,60 por minuto). Portanto f(x) = 0,60·x + 12. O coeficiente de x é o custo por minuto; o termo independente é a taxa fixa."
  },
  {
    "disciplina": "Matemática - Estatística",
    "enunciado": "As notas de um aluno em cinco provas foram 6,0; 7,5; 8,0; 5,5 e 9,0. Qual é a média aritmética dessas notas?",
    "alternativas": [
      "6,8",
      "7,0",
      "7,2",
      "7,5",
      "8,0"
    ],
    "correta": 2,
    "comentario": "Soma = 6,0 + 7,5 + 8,0 + 5,5 + 9,0 = 36,0. Média = 36,0 ÷ 5 = 7,2. A média aritmética é a soma dos valores dividida pela quantidade de dados."
  },
  {
    "disciplina": "Matemática - Probabilidade",
    "enunciado": "Ao lançar um dado honesto de seis faces, qual a probabilidade de obter um número maior que 4?",
    "alternativas": [
      "1/6",
      "2/6",
      "3/6",
      "4/6",
      "5/6"
    ],
    "correta": 1,
    "comentario": "Os resultados possíveis são 6 (1 a 6) e os favoráveis são 2 (5 e 6). Logo P = 2/6 = 1/3. Probabilidade = casos favoráveis ÷ casos possíveis."
  },
  {
    "disciplina": "Matemática - Geometria",
    "enunciado": "Um terreno retangular mede 12 m de comprimento por 8 m de largura. O proprietário quer cercá-lo com três voltas de arame. Quantos metros de arame serão necessários?",
    "alternativas": [
      "48 m",
      "60 m",
      "96 m",
      "120 m",
      "144 m"
    ],
    "correta": 3,
    "comentario": "O perímetro do retângulo é 2 × (12 + 8) = 40 m. Como são três voltas: 3 × 40 = 120 m. Cuidado para não confundir área (12 × 8 = 96 m²) com perímetro — a cerca usa o perímetro."
  },
  {
    "disciplina": "Matemática - Logaritmo",
    "enunciado": "O valor de log₂ 32 é:",
    "alternativas": [
      "4",
      "5",
      "6",
      "8",
      "16"
    ],
    "correta": 1,
    "comentario": "log₂ 32 = x significa 2ˣ = 32. Como 2⁵ = 32, então x = 5. O logaritmo responde: '2 elevado a quanto dá 32?'"
  },
  {
    "disciplina": "Matemática - Progressão aritmética",
    "enunciado": "Em uma progressão aritmética cujo primeiro termo é 3 e a razão é 4, qual é o valor do 6º termo?",
    "alternativas": [
      "21",
      "23",
      "25",
      "27",
      "19"
    ],
    "correta": 1,
    "comentario": "Na PA, aₙ = a₁ + (n − 1)·r. Então a₆ = 3 + (6 − 1) × 4 = 3 + 20 = 23. Atenção: some a razão (n − 1) vezes, não n vezes."
  },
  {
    "disciplina": "Matemática - Juros simples",
    "enunciado": "Um capital de R$ 1.500,00 é aplicado a juros simples de 2% ao mês durante 5 meses. Qual o valor dos juros obtidos?",
    "alternativas": [
      "R$ 75,00",
      "R$ 100,00",
      "R$ 150,00",
      "R$ 200,00",
      "R$ 250,00"
    ],
    "correta": 2,
    "comentario": "Nos juros simples, J = C · i · t = 1.500 × 0,02 × 5 = R$ 150,00. O montante seria 1.500 + 150 = R$ 1.650,00 — a questão pede apenas os juros."
  },
  {
    "disciplina": "Matemática - Análise de gráficos",
    "enunciado": "Um gráfico de barras mostra que a produção de uma fábrica foi de 400 unidades em janeiro e 500 unidades em fevereiro. Qual foi o aumento percentual da produção de janeiro para fevereiro?",
    "alternativas": [
      "10%",
      "20%",
      "25%",
      "40%",
      "50%"
    ],
    "correta": 2,
    "comentario": "Aumento = 500 − 400 = 100 unidades. O percentual é calculado sobre o valor inicial (janeiro): 100/400 = 0,25 = 25%. Se calculasse sobre fevereiro, erraria a base."
  },
  {
    "disciplina": "Linguagens - Funções da linguagem",
    "enunciado": "Na frase 'O aquecimento global é provocado pela emissão de gases do efeito estufa', a função da linguagem predominante é a:",
    "alternativas": [
      "Emotiva",
      "Conativa",
      "Referencial",
      "Poética",
      "Metalinguística"
    ],
    "correta": 2,
    "comentario": "O foco está no contexto, na informação objetiva sobre o mundo — função referencial (ou denotativa), típica de textos informativos, científicos e jornalísticos."
  },
  {
    "disciplina": "Linguagens - Coesão e coerência",
    "enunciado": "Em 'Choveu muito durante a noite; ________, as ruas amanheceram alagadas', o conectivo que expressa corretamente a relação de consequência é:",
    "alternativas": [
      "no entanto",
      "embora",
      "portanto",
      "além disso",
      "por exemplo"
    ],
    "correta": 2,
    "comentario": "A segunda oração é consequência da primeira, então usamos um conectivo conclusivo: 'portanto', 'logo', 'assim', 'por isso'. 'No entanto' e 'embora' indicam oposição; 'além disso', adição."
  },
  {
    "disciplina": "Linguagens - Interpretação de texto",
    "enunciado": "Leia: 'A cidade cresceu, mas o saneamento básico não acompanhou esse crescimento.' A relação de sentido estabelecida pelo conectivo 'mas' é de:",
    "alternativas": [
      "Adição",
      "Oposição",
      "Causa",
      "Conclusão",
      "Tempo"
    ],
    "correta": 1,
    "comentario": "'Mas' é conjunção coordenativa adversativa: estabelece contraste entre duas ideias. Atenção: o crescimento (positivo) contrasta com a falta de saneamento (negativo)."
  },
  {
    "disciplina": "Literatura - Modernismo",
    "enunciado": "A obra 'Macunaíma', de Mário de Andrade, publicada em 1928, é considerada um marco do Modernismo brasileiro porque:",
    "alternativas": [
      "Mantém a linguagem formal e os modelos parnasianos.",
      "Valoriza a fala coloquial e mistura elementos das culturas indígena, africana e europeia.",
      "Rejeita qualquer influência da cultura popular.",
      "Retoma o ideal do herói indígena do Romantismo.",
      "Descreve exclusivamente a vida da aristocracia rural."
    ],
    "correta": 1,
    "comentario": "Macunaíma, o 'herói sem nenhum caráter', sintetiza as três raças formadoras e usa linguagem coloquial e experimental — marcas do Modernismo da fase heroica (1922-1930)."
  },
  {
    "disciplina": "Literatura - Romantismo",
    "enunciado": "No Romantismo brasileiro, a idealização do indígena como herói nacional, presente em obras como 'Iracema', de José de Alencar, caracteriza a fase:",
    "alternativas": [
      "Condoreira",
      "Indianista",
      "Byroniana",
      "Realista",
      "Parnasiana"
    ],
    "correta": 1,
    "comentario": "A fase indianista (ou nacionalista) idealiza o índio como símbolo de identidade nacional. A fase condoreira é social e abolicionista (Castro Alves); a byroniana aborda o egocentrismo e a morte."
  },
  {
    "disciplina": "Redação - Estrutura dissertativa",
    "enunciado": "Em uma redação dissertativo-argumentativa do ENEM, a TESE deve ser apresentada:",
    "alternativas": [
      "Apenas na conclusão, para surpreender o leitor.",
      "Na introdução, como o ponto de vista que será defendido.",
      "Somente nos desenvolvimentos, em cada argumento.",
      "No título, que é obrigatório na prova do ENEM.",
      "Em qualquer parágrafo, desde que apareça."
    ],
    "correta": 1,
    "comentario": "A tese é o seu posicionamento sobre o tema e deve aparecer na introdução, orientando todo o texto e sendo retomada na conclusão. O ENEM não exige título."
  },
  {
    "disciplina": "Redação - Proposta de intervenção",
    "enunciado": "Qual das propostas abaixo está MAIS completa, atendendo aos elementos exigidos pelo ENEM?",
    "alternativas": [
      "O governo deve fazer algo para melhorar a educação.",
      "É preciso que as escolas invistam mais em qualidade.",
      "O Ministério da Educação deve ampliar a formação de professores por meio de cursos semestrais, para garantir a qualidade do ensino.",
      "Todos precisam estudar mais para o país crescer.",
      "A educação é um problema que afeta a todos."
    ],
    "correta": 0,
    "comentario": "A proposta completa tem agente (Ministério da Educação), ação (ampliar a formação), modo/meio (cursos semestrais) e efeito/finalidade (garantir a qualidade). As outras são genéricas e vagas."
  },
  {
    "disciplina": "Linguagens - Voz passiva",
    "enunciado": "A frase 'O livro foi lido pelo aluno' está na:",
    "alternativas": [
      "Voz ativa",
      "Voz passiva analítica",
      "Voz reflexiva",
      "Voz verbal",
      "Voz impessoal"
    ],
    "correta": 1,
    "comentario": "A construção 'foi lido' (verbo ser + particípio + pelo agente) caracteriza a voz passiva analítica. Na ativa seria 'O aluno leu o livro'."
  },
  {
    "disciplina": "Linguagens - Crase",
    "enunciado": "Em 'Entreguei o trabalho ___ professora', a justificativa para o uso ou não da crase é:",
    "alternativas": [
      "Não ocorre crase porque 'professora' é substantativo masculino.",
      "Ocorre crase, pois há a preposição 'a' (de entregar) encontrando o artigo 'a' (de professora).",
      "Ocorre crase sempre antes de substantivos femininos.",
      "Não ocorre crase porque verbos transitivos diretos não pedem preposição.",
      "A crase é opcional e não muda o sentido."
    ],
    "correta": 1,
    "comentario": "'Entregar a alguém' pede preposição 'a', e 'a professora' tem o artigo definido feminino 'a'. A fusão dos dois gera a crase: 'à professora'. Crase não é regra automática antes de mulher — precisa da preposição."
  },
  {
    "disciplina": "Literatura - Realismo",
    "enunciado": "Em 'Memórias Póstumas de Brás Cubas', de Machado de Assis, a inovação narrativa está principalmente:",
    "alternativas": [
      "No narrador indígena que descreve a natureza brasileira.",
      "No narrador defunto, irônico e metalinguístico, que questiona a própria veracidade do relato.",
      "No enredo linear e otimista sobre a ascensão social.",
      "No uso exclusivo de versos e métrica clássica.",
      "Na descrição heroica das batalhas do Império."
    ],
    "correta": 1,
    "comentario": "Machado inova com o narrador defunto — que escreve «de além-túmulo» —, com a ironia e com a metalinguagem: o próprio ato de escrever e as dúvidas sobre a veracidade do relato tornam-se parte da obra, rompendo com a linearidade realista."
  },
  {
    "disciplina": "História - Grécia Antiga",
    "enunciado": "A democracia ateniense do século V a.C. é frequentemente citada como origem da democracia ocidental. É correto afirmar que ela era:",
    "alternativas": [
      "Controlada pelos sacerdotes do templo de Apolo.",
      "Representativa, com deputados eleitos por todos os habitantes.",
      "Direta, com a participação pessoal dos cidadãos nas decisões da Assembleia.",
      "Universal, incluindo mulheres, estrangeiros e escravizados.",
      "Exercida por um conselho de filósofos eleitos vitalícios."
    ],
    "correta": 2,
    "comentario": "A democracia ateniense era direta: os cidadãos (homens atenienses, livres e maiores de idade) deliberavam pessoalmente na Ágora. Mulheres, metecos e escravizados — a maioria da população — não participavam."
  },
  {
    "disciplina": "História - Roma Antiga",
    "enunciado": "As prolongadas revoltas dos plebeus romanos resultaram, por volta de 450 a.C., na elaboração da/o:",
    "alternativas": [
      "Código de Hamurábi.",
      "Lei das Doze Tábuas.",
      "Édito de Nantes.",
      "Corpus Juris Civilis.",
      "Tratado de Latrão."
    ],
    "correta": 1,
    "comentario": "A pressão dos plebeus obrigou o Senado a escrever as leis, antes costumeiras e controladas pelos patrícios: nasce a Lei das Doze Tábuas, marco do direito escrito no Ocidente."
  },
  {
    "disciplina": "História - Idade Média",
    "enunciado": "No sistema feudal europeu, a relação de vassalagem baseava-se fundamentalmente:",
    "alternativas": [
      "No pagamento de salários em moeda aos camponeses.",
      "Na escravidão por dívidas dos trabalhadores urbanos.",
      "Na troca de terra (feudo) por fidelidade e serviço militar.",
      "Na eleição direta dos senhores feudais pelo povo.",
      "No comércio marítimo entre os feudos e o Império Bizantino."
    ],
    "correta": 2,
    "comentario": "A vassalagem era um laço pessoal: o suserano concedia o feudo e proteção; o vassalo devia fidelidade e auxílio militar. O servo não era escravo — estava preso à terra, mas tinha direitos costumeiros."
  },
  {
    "disciplina": "História - Revolução Industrial",
    "enunciado": "Uma das principais consequências sociais da Revolução Industrial na Inglaterra do século XVIII foi:",
    "alternativas": [
      "A distribuição igualitária dos lucros entre operários e patrões.",
      "A valorização do artesanato em detrimento das máquinas.",
      "O fim imediato do trabalho infantil nas fábricas.",
      "A redução do êxodo rural e o retorno da população ao campo.",
      "A formação de duas novas classes: a burguesia industrial e o proletariado."
    ],
    "correta": 4,
    "comentario": "A fábrica concentrou os trabalhadores e criou o proletariado, oposto à burguesia dona dos meios de produção. Jornas de 14 a 16 horas, trabalho infantil e bairros insalubres marcaram o período."
  },
  {
    "disciplina": "História - Brasil Colônia",
    "enunciado": "O sistema de Capitanias Hereditárias, implantado por Portugal em 1534, tinha como principal objetivo:",
    "alternativas": [
      "Povoar e defender o território colonial com baixo custo para a Coroa.",
      "Distribuir terras igualitariamente entre os colonos pobres.",
      "Expandir o protestantismo no Novo Mundo.",
      "Criar assembleias legislativas eleitas nas colônias.",
      "Impedir a extração do pau-brasil."
    ],
    "correta": 0,
    "comentario": "As capitanas dividiam o Brasil em lotes doados a donatários com amplos poderes — solução barata para um império sem recursos. A maioria fracassou; prosperaram São Vicente e Pernambuco, onde se firmou o açúcar."
  },
  {
    "disciplina": "História - República Velha",
    "enunciado": "A 'Política dos Governadores', articulada no governo de Campos Salles, consistia em:",
    "alternativas": [
      "Um programa de distribuição de terras aos trabalhadores rurais.",
      "Um acordo de apoio mútuo entre o Presidente da República e os governadores estaduais.",
      "Uma aliança militar do Brasil com a Inglaterra.",
      "Um sistema de votação universal e secreto para todos os brasileiros.",
      "Uma política de privatização das estradas de ferro."
    ],
    "correta": 1,
    "comentario": "O Presidente garantia os governadores estaduais e, em troca, recebia o apoio deles nas eleições de deputados e na sua própria eleição. Era a base da República Oligárquica."
  },
  {
    "disciplina": "História - Era Vargas",
    "enunciado": "A criação da Consolidação das Leis do Trabalho (CLT), em 1943, durante o governo Vargas, representa:",
    "alternativas": [
      "A conquista autônoma dos sindicatos operários.",
      "A extinção dos sindicatos no Brasil.",
      "A adoção do liberalismo econômico sem intervenção do Estado.",
      "A concessão estatal de direitos trabalhistas, com controle do Estado sobre os sindicatos.",
      "A retomada das práticas de trabalho escravo."
    ],
    "correta": 3,
    "comentario": "O trabalhismo varguista criou direitos (salário mínimo, CLT, Justiça do Trabalho), mas de cima para baixo, com sindicatos oficiais controlados pelo Estado — uma cidadania concedida, não conquistada."
  },
  {
    "disciplina": "História - Ditadura Militar",
    "enunciado": "O Ato Institucional nº 5 (AI-5), editado em 1968, é considerado o ápice do autoritarismo porque:",
    "alternativas": [
      "Restaurou a monarquia no Brasil.",
      "Concedeu anistia ampla aos presos políticos.",
      "Suspendeu garantias constitucionais, permitindo cassar mandatos e fechar o Congresso.",
      "Instituiu eleições diretas para presidente.",
      "Extinguiu voluntariamente os partidos políticos."
    ],
    "correta": 2,
    "comentario": "O AI-5 deu poder ao Executivo para cassar mandatos, suspender direitos políticos e intervir nos estados. Foi revogado em 1978, no início da distensão política."
  },
  {
    "disciplina": "História - Abolição",
    "enunciado": "A Lei Áurea, assinada em 13 de maio de 1888, é historicamente importante porque:",
    "alternativas": [
      "Aboliu formalmente a escravidão no Brasil, sem garantir acesso à terra ou à educação aos libertos.",
      "Criou o sistema de capitanias hereditárias.",
      "Proclamou a independência do Brasil.",
      "Instituiu a República Presidencialista.",
      "Concedeu voto universal a todas as mulheres."
    ],
    "correta": 0,
    "comentario": "A abolição encerrou a escravidão formal, mas não distribuiu terras, educação ou cidadania plena. A população negra permaneceu em desvantagem — desigualdade que ainda hoje é tema central do ENEM."
  },
  {
    "disciplina": "Geografia - Urbanização",
    "enunciado": "O crescimento acelerado e concentrado de uma cidade que passa a comandar a economia e os serviços de toda uma região é denominado:",
    "alternativas": [
      "Conurbação.",
      "Macrocefalia urbana.",
      "Gentrificação.",
      "Metropolização difusa.",
      "Desmetropolização."
    ],
    "correta": 1,
    "comentario": "A macrocefalia urbana é o crescimento exagerado de uma cidade (ou metrópole) que concentra população, renda e serviços — sintoma clássico da urbanização tardia e desigual do Brasil."
  },
  {
    "disciplina": "Geografia - Segregação socioespacial",
    "enunciado": "A construção de condomínios fechados com muros, câmeras e segurança privada nas grandes cidades brasileiras é um exemplo de:",
    "alternativas": [
      "Conurbação planejada.",
      "Segregação socioespacial voluntária.",
      "Expansão da malha viária.",
      "Revitalização do centro histórico.",
      "Descentralização industrial."
    ],
    "correta": 1,
    "comentario": "Quando as elites se isolam voluntariamente em espaamentos murados, ocorre a segregação voluntária — o oposto da segregação imposta, em que os mais pobres são empurrados para periferias sem infraestrutura."
  },
  {
    "disciplina": "Geografia - População",
    "enunciado": "A fase da transição demográfica em que a taxa de natalidade começa a cair, reduzindo o ritmo de crescimento populacional, caracteriza:",
    "alternativas": [
      "O regime populacional inicial, de altas natalidade e mortalidade.",
      "A explosão demográfica.",
      "A desaceleração do crescimento.",
      "O declínio populacional absoluto.",
      "O equilíbrio migratório."
    ],
    "correta": 2,
    "comentario": "Na transição demográfica, primeiro cai a mortalidade (explosão demográfica); depois cai a natalidade (crescimento desacelera); por fim ambas ficam baixas e a população envelhece — situação do Brasil atual."
  },
  {
    "disciplina": "Geografia - Migrações",
    "enunciado": "O deslocamento de pessoas do campo para a cidade, motivado principalmente pela mecanização da agricultura e pela oferta de empregos urbanos, é chamado de:",
    "alternativas": [
      "Êxodo rural.",
      "Migração de retorno.",
      "Nomadismo.",
      "Transumância.",
      "Diáspora religiosa."
    ],
    "correta": 0,
    "comentario": "O êxodo rural alimentou a urbanização brasileira no século XX. Ele se diferencia da transumância (deslocamento periódico) e do nomadismo (sem residência fixa)."
  },
  {
    "disciplina": "Geografia - Geopolítica",
    "enunciado": "A formação de blocos econômicos como o Mercosul tem como um dos principais objetivos:",
    "alternativas": [
      "Isolar economicamente os países membros do resto do mundo.",
      "Reduzir as tarifas de comércio e aumentar a integração entre os países membros.",
      "Padronizar as moedas de todos os países da América do Sul.",
      "Impedir a entrada de investimentos estrangeiros.",
      "Unificar os sistemas políticos em um único governo."
    ],
    "correta": 1,
    "comentario": "Blocos econômicos buscam integração comercial (redução de tarifas, regras comuns). O Mercosul é uma união aduaneira, não uma união monetária — cada país mantém sua moeda."
  },
  {
    "disciplina": "Geografia - Fontes de energia",
    "enunciado": "Entre as fontes de energia abaixo, a única considerada RENOVÁVEL é:",
    "alternativas": [
      "Petróleo.",
      "Carvão mineral.",
      "Gás natural.",
      "Energia solar.",
      "Urânio."
    ],
    "correta": 3,
    "comentario": "Renováveis são as que se regeneram em escala humana: solar, eólica, hídrica, biomassa. Petróleo, carvão, gás e urânio (nuclear) são fósseis ou finitos — portanto, não renováveis."
  },
  {
    "disciplina": "Geografia - Meio ambiente",
    "enunciado": "O aumento da concentração de dióxido de carbono (CO₂) na atmosfera, resultante principalmente da queima de combustíveis fósseis, está associado:",
    "alternativas": [
      "À redução da camada de ozônio na estratosfera.",
      "À intensificação do efeito estufa e ao aquecimento global.",
      "À diminuição da chuva ácida nos centros urbanos.",
      "Ao aumento da biodiversidade nos oceanos.",
      " À formação da aurora boreal."
    ],
    "correta": 1,
    "comentario": "O CO₂ é um gás de efeito estufa: sua maior concentração retém mais calor, intensificando o efeito estufa. Atenção: o buraco na camada de ozônio é outro problema, causado pelos CFCs."
  },
  {
    "disciplina": "Geografia - Relevo",
    "enunciado": "A formação de voçorocas em áreas urbanas está diretamente relacionada:",
    "alternativas": [
      "Ao resfriamento brusco do solo nas madrugadas de inverno.",
      "À ação do vento sobre dunas litorâneas.",
      "À erosão causada pelo escoamento da água em solo desprotegido.",
      "Ao movimento das placas tectônicas.",
      "À deposição de sedimentos em fundos de rio."
    ],
    "correta": 2,
    "comentario": "Voçorocas são grandes erosões provocadas pela água da chuva escorrendo em solo sem vegetação — agravadas pela remoção da cobertura vegetal e pelo manejo inadequado do solo."
  },
  {
    "disciplina": "Geografia - Clima",
    "enunciado": "O fenômeno climático caracterizado pelo aquecimento anormal das águas do Oceano Pacífico Equatorial, que altera o regime de chuvas no Brasil, é denominado:",
    "alternativas": [
      "La Niña.",
      "El Niño.",
      "Inversão térmica.",
      "Efeito estufa.",
      "Monção."
    ],
    "correta": 1,
    "comentario": "O El Niño aquece as águas do Pacífico equatorial e provoca seca no Norte do Brasil e chuvas no Sul. A La Niña é o fenômeno oposto (resfriamento anormal)."
  },
  {
    "disciplina": "Geografia - Geopolítica",
    "enunciado": "A divergência entre o conceito de Estado e o de nação evidencia-se quando:",
    "alternativas": [
      "Um Estado abriga diferentes nações em seu território, como ocorre em países multiétnicos.",
      "Um Estado possui um único povo e uma única cultura.",
      "Um Estado não possui governo organizado.",
      "Uma nação não possui território definido, mas exerce soberania.",
      "Um Estado não mantém relações com outros países."
    ],
    "correta": 0,
    "comentario": "Estado é a organização política com território, governo e soberania; nação é o povo com identidade cultural comum. Quando várias nações coexistem em um Estado, há divergência entre os dois conceitos."
  },
  {
    "disciplina": "Geografia - População",
    "enunciado": "O 'bônus demográfico', apontado como uma oportunidade econômica para o Brasil, ocorre quando:",
    "alternativas": [
      "A taxa de natalidade supera a de mortalidade de forma acentuada.",
      "A população em idade ativa torna-se maior que a população dependente (jovens e idosos).",
      "A população idosa duplica a cada década.",
      "O número de imigrantes supera o de emigrantes.",
      "A taxa de fecundidade total aumenta acima de 3 filhos por mulher."
    ],
    "correta": 1,
    "comentario": "O bônus demográfico é a janela em que há mais pessoas em idade de trabalhar do que dependentes. Ele exige investimento em educação e emprego — caso contrário, torna-se um passivo social."
  },
  {
    "disciplina": "Sociologia - Trabalho (Marx)",
    "enunciado": "Para Karl Marx, a 'mais-valia' corresponde:",
    "alternativas": [
      "Ao salário pago ao trabalhador pelo tempo de descanso.",
      "Aos juros que o banco cobra sobre empréstimos.",
      "A diferença entre o valor produzido pelo trabalho e o salário efetivamente pago.",
      "Ao custo da matéria-prima utilizada na produção.",
      "Ao valor de revenda das máquinas após a obsolescência."
    ],
    "correta": 2,
    "comentario": "A mais-valia é o tempo de trabalho não pago: o operário produz mais valor do que recebe, e essa diferença é apropriada pelo dono dos meios de produção. É a base da exploração no capitalismo, segundo Marx."
  },
  {
    "disciplina": "Sociologia - Estado (Weber)",
    "enunciado": "Max Weber definiu o Estado moderno como a entidade que detém:",
    "alternativas": [
      "O controle de todos os meios de comunicação.",
      "O monopólio do uso legítimo da força física dentro de um território.",
      "A propriedade de todas as terras produtivas.",
      "O direito de definir a religião oficial do país.",
      "O monopólio do comércio internacional."
    ],
    "correta": 1,
    "comentario": "Para Weber, o Estado é a única instituição que pode usar a força de forma legítima (exército, polícia) dentro de um território. As demais formas de violência são consideradas ilegítimas ou criminosas."
  },
  {
    "disciplina": "Sociologia - Indústria cultural",
    "enunciado": "Para Theodor Adorno e Max Horkheimer, o conceito de 'indústria cultural' refere-se:",
    "alternativas": [
      "Ao conjunto de museus e centros culturais mantidos pelo Estado.",
      "À produção de bens culturais em série, tratados como mercadorias.",
      "Ao desenvolvimento das artes plásticas de vanguarda.",
      "Ao regime de trabalho dos artistas em cooperativas.",
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
      "O conjunto de conhecimentos, gostos e habilidades adquiridos pelo indivíduo.",
      "O número de obras de arte de uma coleção privada.",
      "O valor venal dos imóveis de uma cidade.",
      "O montante de impostos destinados à cultura."
    ],
    "correta": 1,
    "comentario": "Bourdieu mostrou que existem capitais além do econômico: o cultural (conhecimentos, domínio da linguagem), o social (rede de contatos) e o simbólico (prestígio). A escola valoriza o capital cultural das elites."
  },
  {
    "disciplina": "Sociologia - Movimentos sociais",
    "enunciado": "Os movimentos sociais caracterizam-se como:",
    "alternativas": [
      "Ações coletivas que buscam transformações sociais ou a defesa de direitos de grupos.",
      "Iniciativas individuais sem organização política.",
      "Partidos políticos registrados oficialmente.",
      " Órgãos do governo responsáveis pela assistência social.",
      "Empresas que atuam no setor de serviços."
    ],
    "correta": 0,
    "comentario": "Movimentos sociais são ações coletivas organizadas em torno de causas — como o movimento negro, o feminista e o ambientalista. Diferem de partidos porque não disputam eleições, mas pressionam por mudanças."
  },
  {
    "disciplina": "Filosofia - Pré-socráticos",
    "enunciado": "A principal busca dos filósofos pré-socráticos era identificar:",
    "alternativas": [
      "As regras do convívio político na cidade.",
      "O princípio originário (arché) e a ordem da natureza (physis).",
      "Os caminhos para a salvação da alma.",
      "As leis que regem a moral dos deuses.",
      "As técnicas de persuasão nos tribunais."
    ],
    "correta": 1,
    "comentario": "Os pré-socráticos substituíram a explicação mítica (mythos) pela razão (logos) e buscaram a arché, o princípio único de que tudo é feito — Tales dizia ser a água; Heráclito, o fogo."
  },
  {
    "disciplina": "Filosofia - Sócrates",
    "enunciado": "A 'maiêutica' socrática consistia em:",
    "alternativas": [
      "Transmitir conhecimentos prontos aos discípulos.",
      "Um método de perguntas que levava o interlocutor a perceber a verdade por si mesmo.",
      "Um conjunto de regras para a escrita filosófica.",
      "Uma técnica de memorização de textos clássicos.",
      "Um sistema político de governo dos filósofos."
    ],
    "correta": 1,
    "comentario": "Sócrates comparava seu método ao trabalho da parteira: não coloca ideias de fora, mas ajuda o interlocutor a 'dar à luz' o conhecimento que já possui em potência, por meio do diálogo e da dúvida."
  },
  {
    "disciplina": "Filosofia - Ética (Kant)",
    "enunciado": "O Imperativo Categórico, formulado por Immanuel Kant, estabelece que devemos agir:",
    "alternativas": [
      "Sempre em busca do maior prazer possível.",
      "Conforme os costumes da nossa sociedade.",
      "De modo que a nossa ação possa valer como lei universal.",
      "Conforme a vontade dos mais fortes.",
      "Somente quando houver aprovação religiosa."
    ],
    "correta": 2,
    "comentario": "Para Kant, a moral não se baseia nas consequências nem nos costumes, mas no dever ditado pela razão. Uma ação é moral se você puder querer que todos ajam assim, sem contradição."
  },
  {
    "disciplina": "Filosofia - Contratualismo",
    "enunciado": "Para John Locke, os direitos naturais e inalienáveis de todo ser humano são:",
    "alternativas": [
      "Riqueza, poder e glória.",
      "Vida, liberdade e propriedade.",
      "Trabalho, lazer e educação.",
      "Terra, casa e família.",
      "Religião, exército e Estado."
    ],
    "correta": 1,
    "comentario": "Locke defende que, antes do Estado, as pessoas já possuem direitos naturais: vida, liberdade e propriedade. O governo existe para proteger esses direitos — se falhar, o povo pode substituí-lo."
  },
  {
    "disciplina": "Filosofia - Sócrates e Platão",
    "enunciado": "A frase atribuída a Sócrates 'Só sei que nada sei' expressa a atitude filosófica de:",
    "alternativas": [
      "Aceitar qualquer opinião como verdadeira.",
      "Reconhecer os limites do próprio saber como ponto de partida da investigação.",
      "Defender que o conhecimento é impossível.",
      "Afirmar que apenas os deuses detêm a verdade.",
      "Negar a existência do mundo sensível."
    ],
    "correta": 1,
    "comentario": "A ignorância socrática não é desistir de conhecer, mas reconhecer que as certezas imediatas são frágeis. É a partir da dúvida que se começa a filosofia — a busca rigorosa pelo saber."
  },
  {
    "disciplina": "Inglês - Falsos cognatos",
    "enunciado": "A frase 'The manager actually pushed for new social investments last week' indica que o gerente:",
    "alternativas": [
      "Atualmente puxou os investimentos.",
      "Na verdade pressionou a favor de novos investimentos sociais.",
      "Atualmente adiou os projetos planejados.",
      "Escondeu os relatórios de investimento antigos.",
      "Financiará os custos sozinho e em segredo."
    ],
    "correta": 1,
    "comentario": "'Actually' significa 'na verdade', não 'atualmente'. 'Pushed for' é um phrasal verb que significa 'pressionou a favor de' (e não 'empurrou'). 'Actually', sim, é um falso cognato clássico do ENEM, muito cobrado na prova."
  },
  {
    "disciplina": "Inglês - Conectores",
    "enunciado": "Na frase 'The project is expensive; __________, it is very efficient', o conector que expressa corretamente a ideia de contraste é:",
    "alternativas": [
      "Moreover.",
      "Therefore.",
      "Nevertheless.",
      "Besides.",
      "Consequently."
    ],
    "correta": 2,
    "comentario": "'Nevertheless' (ou however) indica contraste: algo é caro, mas eficiente. 'Moreover' e 'besides' adicionam informações; 'therefore' e 'consequently' indicam conclusão."
  },
  {
    "disciplina": "Inglês - Interpretação",
    "enunciado": "Na frase 'We are committed to reducing our carbon footprint by 50% by 2030', o termo 'committed' indica que a empresa está:",
    "alternativas": [
      "Cometendo um erro de planejamento.",
      "Obrigada por lei a fechar suas fábricas.",
      "Comprometida e empenhada em atingir a meta.",
      "Confundida sobre os prazos.",
      "Cancelando os investimentos ambientais."
    ],
    "correta": 2,
    "comentario": "'Committed to' significa 'comprometido com/empenhado em'. É vocabulário muito frequente em relatórios de sustentabilidade cobrados pelo ENEM."
  },
  {
    "disciplina": "Inglês - Condicionais",
    "enunciado": "Na frase 'If we had known about the traffic, we would have left earlier', a estrutura utilizada é a:",
    "alternativas": [
      "First Conditional (probabilidade futura).",
      "Zero Conditional (fatos científicos).",
      "Second Conditional (hipótese no presente).",
      "Third Conditional (hipótese sobre o passado).",
      "Present Continuous (ação em andamento)."
    ],
    "correta": 3,
    "comentario": "'If + had + particípio' com 'would have + particípio' trata de algo que NÃO aconteceu no passado — é a Third Conditional. Na Second Conditional usaríamos 'If we knew... we would leave'."
  },
  {
    "disciplina": "Inglês - Interpretação",
    "enunciado": "Na frase 'Although the weather was bad, the concert went on as planned', o termo 'Although' introduz uma ideia de:",
    "alternativas": [
      "Conclusão.",
      "Adição.",
      "Condição.",
      "Concessão (contraste).",
      "Causa."
    ],
    "correta": 3,
    "comentario": "'Although' (embora) é um conectivo de concessão: apresenta um obstáculo que não impediu a ação principal. A ideia central da frase é que o show aconteceu."
  },
  {
    "disciplina": "Espanhol - Falsos cognatos",
    "enunciado": "Em espanhol, dizer que uma mulher está 'embarazada' significa que ela está:",
    "alternativas": [
      "Envergonhada.",
      "Grávida.",
      "Cansada.",
      "Confusa.",
      "Com fome."
    ],
    "correta": 1,
    "comentario": "'Embarazada' = grávida. É um dos falsos cognatos mais cobrados: em português 'embaraçada' significa envergonhada, mas em espanhol o termo tem outro sentido."
  },
  {
    "disciplina": "Espanhol - Falsos cognatos",
    "enunciado": "A palavra espanhola 'largo' significa:",
    "alternativas": [
      "Largo (largura).",
      "Comprido (extenso).",
      "Demorado.",
      "Apertado.",
      "Pesado."
    ],
    "correta": 1,
    "comentario": "'Largo' = comprido, extenso. Já 'ancho' é que significa 'largo' (largura). É um par de falsos cognatos que inverte o sentido em relação ao português — pegadinha frequente."
  },
  {
    "disciplina": "Espanhol - Conectores",
    "enunciado": "Na frase 'Quiero ir al cine, pero no tengo dinero', o conector 'pero' expressa:",
    "alternativas": [
      "Uma causa.",
      "Uma consequência.",
      "Uma condição.",
      "Uma oposição (adversativa).",
      "Uma finalidade."
    ],
    "correta": 3,
    "comentario": "'Pero' (mas) é conectivo adversativo, que estabelece contraste entre a vontade de ir ao cinema e a falta de dinheiro. Em espanhol, 'pero' e 'sino' têm usos distintos."
  },
  {
    "disciplina": "Espanhol - Conectores",
    "enunciado": "O conector 'sin embargo' é equivalente, em português, a:",
    "alternativas": [
      "Portanto.",
      "No entanto.",
      "Além disso.",
      "Por exemplo.",
      "Em seguida."
    ],
    "correta": 1,
    "comentario": "'Sin embargo' = 'no entanto', introduz contraste. É um dos marcadores mais úteis para a interpretação de textos jornalísticos e de opinião em espanhol."
  },
  {
    "disciplina": "Espanhol - Interpretação",
    "enunciado": "No trecho 'Mañana iremos al cine', o advérbio 'mañana' refere-se a:",
    "alternativas": [
      "Hoje.",
      "Amanhã.",
      "A tarde.",
      "A noite.",
      "Nunca."
    ],
    "correta": 1,
    "comentario": "'Mañana' pode significar 'manhã' (substantivo) ou 'amanhã' (advérbio). Nesta frase, funciona como advérbio de tempo: 'amanhã iremos ao cinema'. Atenção à dupla possibilidade de sentido."
  }
];

if (typeof window !== "undefined") {
  window.QUESTOES_EXTRA_1 = QUESTOES_EXTRA_1;
}
