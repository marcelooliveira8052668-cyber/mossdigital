/* =============================================================================
   KB do Professor Virtual — explicacoes, dicas, roteiros e glossario
   Motor de matching em js/professor-virtual.js
   ============================================================================= */

const TUTOR_KB = [
  /* ======================= MATEMATICA ======================= */
  {
    id: "kb-mat-001",
    disciplina: "matematica",
    tema: "Porcentagem",
    tipo: "explicacao",
    gatilhos: ["porcentagem", "porcento", "percentual", "desconto", "aumento", "acrescimo"],
    titulo: "Porcentagem: o metodo do fator multiplicativo",
    conteudo:
      "<p>Porcentagem é apenas uma razão com denominador 100: 35% quer dizer 35 em cada 100, ou seja, 0,35. O erro mais comum dos alunos é somar e subtrair porcentagens sem relacioná-las ao valor-base. Sempre pergunte: <strong>porcentagem de quê?</strong></p>" +
      "<p>O método mais rápido é o do <strong>fator multiplicativo</strong>. Um aumento de 20% transforma o valor em 100% + 20% = 120% = 1,20, então multiplique por 1,20. Um desconto de 15% deixa 85% = 0,85, então multiplique por 0,85. Um acréscimo de 8% seguido de desconto de 8% <strong>não</strong> volta ao valor inicial: 1,08 × 0,92 = 0,9936, ou seja, sobra uma perda de 0,64%.</p>" +
      "<p>Para achar quanto vale uma porcentagem sem calculadora, use a <strong>regra do 1%</strong>: 25% de 840 = 840 ÷ 4 = 210, porque 25% é um quarto. Treine decompor: 15% = 10% + 5%; 12% = 10% + 2×1%.</p>"
  },
  {
    id: "kb-mat-002",
    disciplina: "matematica",
    tema: "Juros e matemática financeira",
    tipo: "explicacao",
    gatilhos: ["juros", "juros simples", "juros compostos", "montante", "capital", "emprestimo", "financiamento"],
    titulo: "Juros simples e compostos: lendo a letra pequena",
    conteudo:
      "<p>Nos <strong>juros simples</strong>, a taxa incide sempre sobre o capital inicial: M = C × (1 + i × t). O crescimento é em linha reta e previsível. Nos <strong>juros compostos</strong>, a taxa incide sobre o montante anterior — os juros geram juros: M = C × (1 + i)<sup>t</sup>. É o chamado «juros sobre juros», o mesmo das dívidas de cartão de crédito.</p>" +
      "<p>Atenção às unidades: se a taxa é 2% ao mês e o tempo é dado em anos, converta (24 meses = 2 anos, e aí a taxa composta do período é 1,02<sup>24</sup>, não 24 × 2%). No ENEM, essa conversão é a armadilha favorita.</p>" +
      "<p>Na vida real, compare <strong>Custo Efetivo Total (CET)</strong>, não só a taxa nominal. Duas parcelas iguais podem esconder seguros e tarifas diferentes. Quando o enunciado traz uma tabela de financiamento, leia primeiro o que cada coluna significa antes de calcular.</p>"
  },
  {
    id: "kb-mat-003",
    disciplina: "matematica",
    tema: "Razão, proporção e escala",
    tipo: "metodo",
    gatilhos: ["razao", "proporcao", "escala", "regra de tres", "regra de 3", "grandezas"],
    titulo: "Razão, proporção e escala: o passo a passo seguro",
    conteudo:
      "<p>Razão é a divisão entre duas grandezas (a/b); proporção é a igualdade entre duas razões (a/b = c/d). O segredo é montar a proporção com grandezas <strong>equivalentes</strong> na mesma posição: se 3 operários fazem 60 peças, quantos fazem 7 operários? Escreva 3/60 = 7/x — nunca 3/7 = 60/x.</p>" +
      "<p>Passo a passo: (1) identifique as grandezas e se são diretamente ou inversamente proporcionais; (2) monte a proporção com unidades iguais alinhadas; (3) multiplique em cruz; (4) confira se o resultado tem sentido (se aumentou a quantidade de operários, o total de peças tem de aumentar).</p>" +
      "<p>Em <strong>escala</strong>, 1:50.000 significa 1 cm no mapa para 50.000 cm na realidade. Converta tudo para a mesma unidade antes de multiplicar. Em escalas de redução, o número grande fica no denominador; em ampliação (desenho de peça), o número grande fica no numerador.</p>"
  },
  {
    id: "kb-mat-004",
    disciplina: "matematica",
    tema: "Função do 1º grau",
    tipo: "explicacao",
    gatilhos: ["funcao do primeiro grau", "funcao afim", "reta", "coeficiente angular", "primeiro grau", "1 grau"],
    titulo: "Função do 1º grau: o que o «a» e o «b» contam",
    conteudo:
      "<p>A função do 1º grau tem a forma f(x) = a·x + b e seu gráfico é uma reta. O coeficiente <strong>a</strong> é a taxa de variação: quanto y muda a cada aumento de 1 em x. Se a é positivo, a reta sobe; se é negativo, desce. O <strong>b</strong> é o valor inicial, o ponto onde a reta corta o eixo y.</p>" +
      "<p>Na prática do ENEM, esses problemas aparecem como «tarifa de taxi», «plano de celular» ou «consumo de água». O «b» é a taxa fixa (bandeirada) e o «a» é o preço por unidade (quilômetro). Para comparar dois planos, iguale as duas funções: o x encontrado é o ponto de equilíbrio.</p>" +
      "<p>A raiz (x que zera a função) é x = −b/a. Ela indica onde o gráfico cruza o eixo x e costuma ser o limite de validade de um modelo — por exemplo, o número máximo de unidades antes do lucro virar prejuízo.</p>"
  },
  {
    id: "kb-mat-005",
    disciplina: "matematica",
    tema: "Função do 2º grau",
    tipo: "explicacao",
    gatilhos: ["funcao do segundo grau", "parabola", "raizes", "vertice", "delta", "segundo grau", "2 grau"],
    titulo: "Função do 2º grau: parábola, raízes e vértice",
    conteudo:
      "<p>A forma geral é f(x) = a·x² + b·x + c, e o gráfico é uma parábola. Se a &gt; 0, ela tem concavidade para cima (e o vértice é ponto de <strong>mínimo</strong>); se a &lt; 0, concavidade para baixo (vértice é ponto de <strong>máximo</strong>). Nas questões de receita, lucro e área máxima, é quase sempre esse vértice que a prova pede.</p>" +
      "<p>As raízes saem de Δ = b² − 4·a·c: se Δ &gt; 0, duas raízes reais; Δ = 0, uma raiz (parábola tangencia o eixo x); Δ &lt; 0, nenhuma raiz real. O vértice está em x<sub>v</sub> = −b/(2a), e y<sub>v</sub> = −Δ/(4a).</p>" +
      "<p>Uma leitura rápida do sinal: o produto das raízes é c/a e a soma é −b/a. Se o enunciado pedir «entre quais valores a função é positiva», esboce a parábola e marque os intervalos fora das raízes quando a &gt; 0.</p>"
  },
  {
    id: "kb-mat-006",
    disciplina: "matematica",
    tema: "Média, mediana e moda",
    tipo: "conceito",
    gatilhos: ["media", "mediana", "moda", "tendencia central", "estatistica", "amplitude"],
    titulo: "Média, mediana e moda: quando cada uma conta a verdade",
    conteudo:
      "<p>A <strong>média</strong> soma tudo e divide pela quantidade: é sensível a valores extremos. A <strong>mediana</strong> é o valor central depois de ordenar os dados (com quantidade par, é a média dos dois do meio) e resiste a extremos. A <strong>moda</strong> é o valor que mais se repete.</p>" +
      "<p>Exemplo clássico: cinco salários — 1.500, 1.800, 2.000, 2.400 e 98.500 — têm média R$ 21.240, mas mediana R$ 2.000. Um jornal pode manchetar a média e esconder que o trabalhador típico ganha dez vezes menos. O ENEM adora esse tipo de texto-base: desconfie de «média» em contextos de desigualdade.</p>" +
      "<p>Regra prática: havendo valores muito extremos (um bilionário, uma nota zero, um terremoto), use a <strong>mediana</strong> para descrever o caso típico. Leia sempre média, mediana e moda juntas — cada uma esconde o que a outra revela.</p>"
  },
  {
    id: "kb-mat-007",
    disciplina: "matematica",
    tema: "Probabilidade",
    tipo: "metodo",
    gatilhos: ["probabilidade", "chance", "evento", "espaco amostral", "sorteio", "dados", "acaso"],
    titulo: "Probabilidade: conte antes de calcular",
    conteudo:
      "<p>Probabilidade é a razão entre o número de casos favoráveis e o número de casos possíveis, e o primeiro passo é sempre <strong>contar</strong>. Pergunte: o espaço amostral tem quantos elementos? E o evento que eu quero?</p>" +
      "<p>Em eventos independentes («e»), multiplique as probabilidades. Em eventos mutuamente exclusivos («ou»), some. Se o problema disser «pelo menos um», o atalho é 1 − P(nenhum) — calcular o complemento costuma ser muito mais rápido.</p>" +
      "<p>Cuidado com amostragem sem reposição: ao tirar duas bolas de uma urna, o total de casos possíveis não é n², e sim n × (n − 1). E desconfie de probabilidades que somam mais de 1 — isso denuncia que os eventos não são exclusivos.</p>"
  },
  {
    id: "kb-mat-008",
    disciplina: "matematica",
    tema: "Análise de gráficos e tabelas",
    tipo: "dica",
    gatilhos: ["grafico", "tabela", "analise de grafico", "eixos", "infografico", "escala do grafico"],
    titulo: "Como ler um gráfico sem cair em armadilha",
    conteudo:
      "<p>Antes de comparar qualquer coisa, leia três elementos: o <strong>título</strong>, a <strong>fonte</strong> e as <strong>unidades dos eixos</strong>. Uma das armadilhas mais comuns do ENEM é um eixo y que não começa em zero (ou que muda de escala no meio), o que transforma uma diferença pequena num desenho dramático.</p>" +
      "<p>Depois compare <strong>proporções</strong>, não alturas: se uma barra tem o dobro da altura, o valor é o dobro — mas só se o eixo começar em zero. Em porcentagens empilhadas, verifique se a base é a mesma em todos os grupos.</p>" +
      "<p>Escreva em uma linha o que o gráfico permite afirmar (ex.: «entre 2010 e 2020 a taxa caiu de 12% para 8%») e só então analise as alternativas. Normalmente duas ou três estão fora do que o gráfico mostra de fato.</p>"
  },
  {
    id: "kb-mat-009",
    disciplina: "matematica",
    tema: "Geometria: área e volume",
    tipo: "resumo",
    gatilhos: ["area", "volume", "geometria", "perimetro", "pitagoras", "prisma", "cilindro", "piramide"],
    titulo: "Área e volume: fórmulas que se sustentam umas nas outras",
    conteudo:
      "<p>Toda figura plana tem <strong>área</strong> (2 dimensões) e todo sólido tem <strong>volume</strong> (3 dimensões). A regra-mãe dos sólidos é: volume = área da base × altura, válida para prismas e cilindros. Pirâmides e cones valem um terço disso.</p>" +
      "<p>Núcleo de fórmulas que resolve a maioria das questões: retângulo A = b·h; triângulo A = b·h/2; círculo A = π·r²; trapézio A = (B + b)·h/2; cubo V = a³; paralelepípedo V = a·b·c; cilindro V = π·r²·h; esfera V = (4/3)·π·r³.</p>" +
      "<p>Quando a figura é composta, <strong>decomponha</strong> em partes conhecidas (some ou subtraia áreas). Quando achar um comprimento desconhecido num triângulo retângulo, pense em Pitágoras: a² = b² + c². Sempre confira as unidades: área em cm², volume em cm³.</p>"
  },
  {
    id: "kb-mat-010",
    disciplina: "matematica",
    tema: "Logaritmo",
    tipo: "explicacao",
    gatilhos: ["logaritmo", "log", "exponencial", "definicao de logaritmo", "logaritmica", "ph"],
    titulo: "Logaritmo: o expoente que a gente quer descobrir",
    conteudo:
      "<p>A definição resolve 90% das dúvidas: <strong>log<sub>b</sub> a = x</strong> significa exatamente <strong>b<sup>x</sup> = a</strong>. Logaritmo é o expoente que a base precisa ter para chegar em a. Se travar na questão, reescreva na forma exponencial — quase sempre a resposta aparece.</p>" +
      "<p>Propriedades operatórias: log de produto vira soma (log(a·b) = log a + log b); log de quociente vira subtração; log de potência traz o expoente para frente (log a<sup>n</sup> = n·log a). Cuidado: log de soma <strong>não</strong> tem propriedade — log(a + b) não se separa.</p>" +
      "<p>Onde aparece: escalas de magnitude (terremotos, decibéis), meia-vida de medicamentos, crescimento bacteriano e o pH, em que pH = −log[H⁺]. Note que, nesses casos, a base é 10 e o log costuma vir escrito apenas como «log».</p>"
  },
  /* ======================= REDACAO ======================= */
  {
    id: "kb-red-001",
    disciplina: "redacao",
    tema: "Estrutura dissertativo-argumentativa",
    tipo: "metodo",
    gatilhos: ["estrutura", "dissertacao", "dissertativo argumentativo", "introducao", "desenvolvimento", "conclusao"],
    titulo: "A estrutura da dissertação argumentativa em 4 blocos",
    conteudo:
      "<p>O texto dissertativo-argumentativo do ENEM tem uma arquitetura previsível: <strong>introdução</strong> (apresentação do tema e da tese), <strong>dois desenvolvimentos</strong> (um argumento em cada, com repertório e análise) e <strong>conclusão</strong> (retomada da tese + proposta de intervenção). Pensar nesses blocos antes de escrever evita o texto que «enrola» no meio.</p>" +
      "<p>Na introdução, dedique de 3 a 5 linhas: uma frase de contextualização (o problema em geral), uma frase de aproximação (o problema no Brasil hoje) e a <strong>tese</strong> — a sua opinião, em uma frase clara, com as causas que você vai defender.</p>" +
      "<p>Cada desenvolvimento segue a lógica <strong>PORQUÊ → E ENTÃO?</strong>: primeiro o argumento (ex.: «a desigualdade de acesso à cultura»), depois o repertório que o sustenta e, por fim, a análise — o que isso provoca na sociedade. A conclusão precisa fechar o raciocínio, não apenas repetir: retome a tese e mostre o que fazer para mudar o quadro.</p>"
  },
  {
    id: "kb-red-002",
    disciplina: "redacao",
    tema: "Tese e argumentação",
    tipo: "explicacao",
    gatilhos: ["tese", "argumento", "argumentacao", "opiniao", "ponto de vista", "convencer"],
    titulo: "Tese clara e argumentos que convencem",
    conteudo:
      "<p>Tese é a sua posição sobre o tema, expressa em uma oração completa e defensável. Os dois defeitos mais comuns são a tese-óbvia («é importante falar sobre isso») e a tese-escondida, em que o leitor só descobre a opinião no último parágrafo. Escreva a tese numa frase com sujeito e verbo: <strong>quem deve fazer o quê, e por quê</strong>.</p>" +
      "<p>Um bom argumento tem três camadas: uma <strong>afirmação</strong> (o que você defende), um <strong>repertório</strong> (dado, lei, obra, fato histórico que comprova) e uma <strong>análise</strong> (a sua interpretação ligando os dois). Sem a análise, você apenas colou informação — e aí não há argumento, há citação.</p>" +
      "<p>Evite os argumentos de autoridade vazia («como dizia Aristóteles...»). Prefira repertórios que você sabe explicar em duas linhas. E lembre-se: não é preciso concordar com a tese — é preciso defendê-la com coerência do começo ao fim.</p>"
  },
  {
    id: "kb-red-003",
    disciplina: "redacao",
    tema: "Repertório sociocultural",
    tipo: "dica",
    gatilhos: ["repertorio", "repertorio sociocultural", "citacao", "dados", "exemplo", "autoria"],
    titulo: "Repertório sociocultural: usar bem, não desfilar",
    conteudo:
      "<p>Repertório é tudo que você traz de fora do seu texto para sustentar o argumento: dados do IBGE, uma lei, um filme, uma música, um acontecimento histórico, uma pesquisa. No ENEM, ele conta na competência 2 (conhecimento das áreas) e na competência 3 (organização dos argumentos).</p>" +
      "<p>A regra de ouro: <strong>use o que você sabe explicar</strong>. Um dado solto, sem interpretação, vale menos do que um exemplo simples bem analisado. Antes de citar, pergunte: o que isso prova no meu texto? Se a resposta não for imediata, troque o repertório.</p>" +
      "<p>Construa um banco pessoal de 6 a 8 repertórios que sirvam para vários temas (desigualdade, tecnologia, meio ambiente, educação, saúde). Guarde uma frase-pronta de apresentação para cada um. Na hora da prova, isso economiza minutos preciosos e evita informação inventada — nunca invente dados.</p>"
  },
  {
    id: "kb-red-004",
    disciplina: "redacao",
    tema: "Proposta de intervenção",
    tipo: "metodo",
    gatilhos: ["proposta de intervencao", "intervencao", "solucao", "agente", "acao", "efeito"],
    titulo: "Proposta de intervenção: os 5 elementos que a banca exige",
    conteudo:
      "<p>A proposta de intervenção é onde muita nota se perde. Ela precisa ter <strong>agente</strong> (quem age: Ministério da Educação, escolas, mídia, família), <strong>ação</strong> (o que fazer, de forma específica), <strong>modo</strong> (como fazer), <strong>efeito</strong> (o que se espera mudar) e <strong>detalhamento</strong> (prazo, público-alvo ou recurso).</p>" +
      "<p>Compare: «o governo deve conscientizar a população» é genérico demais — não diz como, nem quando, nem com quem. Já «o MEC, em parceria com as secretarias estaduais, deve incluir oficinas de leitura crítica na Base Nacional Comum, com formação de professores em 12 meses, para que alunos desenvolvam autonomia interpretativa» tem os cinco elementos.</p>" +
      "<p>Cuidado com propostas que ferem os direitos humanos ou que são impossíveis (multar quem não tem renda, por exemplo). E respeite a <strong>divisão de tarefas</strong>: a proposta precisa atacar a causa que você defendeu nos desenvolvimentos, não um problema novo.</p>"
  },
  {
    id: "kb-red-005",
    disciplina: "redacao",
    tema: "Competências do ENEM e nota 1000",
    tipo: "conceito",
    gatilhos: ["competencias", "nota 1000", "criterios", "avaliacao", "correcao", "rubrica"],
    titulo: "As 5 competências e o caminho da nota 1000",
    conteudo:
      "<p>A redação do ENEM é corrigida por cinco competências, cada uma valendo de 0 a 200 pontos (total 1000): (1) domínio da norma culta; (2) compreensão da proposta e repertório sociocultural; (3) organização dos argumentos; (4) coerência e coesão; (5) proposta de intervenção respeitando os direitos humanos.</p>" +
      "<p>Para chegar perto dos 1000, o texto precisa ser <strong>claro, ético e bem informado</strong>. Não existe «fórmula milagrosa»: o que muda a nota é escrever com precisão, usar repertório pertinente e construir uma proposta detalhada. Fluência verbal e arquitetura consciente do texto pesam mais que palavras difíceis.</p>" +
      "<p>Um mito a abandonar: quanto mais longo, melhor. Texto longo e vazio perde pontos em organização. Melhor um texto de 25 linhas enxuto e consistente do que 35 linhas repetitivas.</p>"
  },
  {
    id: "kb-red-006",
    disciplina: "redacao",
    tema: "Erros que zeram e como reescrever",
    tipo: "erro-comum",
    gatilhos: ["erros que zeram", "nota zero", "fuga ao tema", "copia", "reescrita", "revisao"],
    titulo: "Erros que zeram a redação e como reescrever seu texto",
    conteudo:
      "<p>Fica com nota zero quem foge ao tema, quem não escreve no tipo dissertativo-argumentativo (não vale poema, narra ou só lista tópicos), quem copia o texto da coletânea ou trechos dela, quem entrega em branco ou com menos de 8 linhas e quem desrespeita os direitos humanos.</p>" +
      "<p>Para <strong>reescrever</strong> bem, reescreva por blocos, não por palavras. Primeiro confira se cada parágrafo tem uma função clara; depois verifique se a tese aparece na introdução e é retomada na conclusão; só então ajuste frases e vocabulário. Corrigir palavra por palavra gasta o tempo da prova e melhora pouco a nota.</p>" +
      "<p>Checklist final de 2 minutos: o tema foi atendido? Há parágrafos com começo, meio e fim? As frases têm conectivos adequados? A proposta tem agente, ação, modo e efeito? Algum trecho parece cópia da coletânea? Reserve sempre os últimos minutos para essa leitura.</p>"
  },
  /* ======================= LINGUAGENS ======================= */
  {
    id: "kb-lin-001",
    disciplina: "linguagens",
    tema: "Funções da linguagem",
    tipo: "conceito",
    gatilhos: ["funcoes da linguagem", "emissor", "receptor", "mensagem", "codigo", "referencia", "funcao emotiva"],
    titulo: "As funções da linguagem e onde cada uma se apoia",
    conteudo:
      "<p>As funções da linguagem mostram qual elemento da comunicação está em destaque. São seis, segundo Jakobson: <strong>emotiva</strong> (emissor), <strong>conativa</strong> (receptor), <strong>referencial</strong> (contexto), <strong>metalinguística</strong> (código), <strong>fática</strong> (canal) e <strong>poética</strong> (mensagem).</p>" +
      "<p>Para identificar: se o texto expressa sentimentos e opiniões do autor, predomina a função emotiva (primeira pessoa, adjetivos, interjeições). Se tenta convencer ou mandar, é conativa (verbos no imperativo, vocativo). Se informa dados objetivos, é referencial — a função típica das notícias.</p>" +
      "<p>No ENEM, a pergunta clássica é «predomina nesse texto a função...». Uma dica: olhe primeiro para <strong>quem fala e para quem</strong>. Charges e anúncios misturam funções, então procure o elemento que o enunciado destaca (por exemplo, a repetição de sons indica poética).</p>"
  },
  {
    id: "kb-lin-002",
    disciplina: "linguagens",
    tema: "Coesão, coerência e conectivos",
    tipo: "explicacao",
    gatilhos: ["coesao", "coerencia", "conectivos", "conjungoes", "articulacao", "progressao textual"],
    titulo: "Coesão e coerência: o que amarra o texto",
    conteudo:
      "<p><strong>Coesão</strong> é a costura visível: conectivos, pronomes, sinônimos, repetições e elipses que ligam frases e parágrafos. <strong>Coerência</strong> é a lógica interna: o texto faz sentido, não se contradiz e respeita o que o leitor já sabe. Um texto pode ser coeso e incoerente (frases bem ligadas que se opõem) — e é aí que a prova pega.</p>" +
      "<p>Os conectivos mais úteis e o valor de cada um: <em>portanto, logo, assim</em> (conclusão); <em>mas, no entanto, contudo</em> (contraste); <em>além disso, outrossim</em> (adição); <em>porque, pois, já que</em> (causa); <em>embora, ainda que</em> (concessão); <em>para que, a fim de que</em> (finalidade); <em>quando, assim que</em> (tempo).</p>" +
      "<p>Na hora de ligar parágrafos, escolha o conectivo pelo <strong>sentido</strong>, não pelo hábito: «no entanto» exige uma oposição real; se o segundo parágrafo apenas aprofunda o primeiro, use «além disso» ou «nesse sentido». Repetir «mas» ou «portanto» em todo parágrafo empobrece a coesão.</p>"
  },
  {
    id: "kb-lin-003",
    disciplina: "linguagens",
    tema: "Interpretação de texto",
    tipo: "dica",
    gatilhos: ["interpretacao", "interpretacao de texto", "compreensao", "inferencia", "ideia principal", "tema"],
    titulo: "Interpretação de texto: ler o que está escrito",
    conteudo:
      "<p>A regra de ouro da interpretação é: <strong>toda resposta está no texto</strong>, mesmo quando a questão pede uma inferência. Leia o enunciado com atenção, volte ao trecho indicado e confirme cada palavra da alternativa no texto. Pegadinhas de ENEM trocam uma só palavra («alguns» por «todos», «pode» por «deve») e mudam tudo.</p>" +
      "<p>Um método rápido: (1) leia a pergunta antes do texto, para saber o que procurar; (2) leia o texto uma vez inteiro, sem parar; (3) marque as palavras que indicam mudança de ideia (mas, porém, entretanto, no entanto); (4) nas alternativas, elimine as que <strong>extrapolam</strong> — aquelas que acrescentam algo que o texto não disse.</p>" +
      "<p>Cuidado com as alternativas «boas demais»: se uma generalização soar moralmente correta mas não estiver no texto, está errada. E desconfie de alternativas que copiam palavras do texto mas invertem o sentido — a cópia de vocabulário não garante a resposta certa.</p>"
  },
  {
    id: "kb-lin-004",
    disciplina: "linguagens",
    tema: "Variação linguística",
    tipo: "conceito",
    gatilhos: ["variacao linguistica", "preconceito linguistico", "norma culta", "dialeto", "registro", "giria", "sotaque"],
    titulo: "Variação linguística: não existe língua errada",
    conteudo:
      "<p>Nenhuma língua é homogênea. Ela varia por <strong>região</strong> (sotaques, vocabulário), por <strong>classe social</strong>, por <strong>geração</strong> (gírias de cada idade), por <strong>situação</strong> (falar com amigos x falar numa entrevista) e por <strong>profissão</strong> (linguagem técnica). Essas variedades são todas legítimas e sistemáticas — seguem regras próprias.</p>" +
      "<p>O <strong>preconceito linguístico</strong> acontece quando se trata a variedade de prestígio como «a língua certa» e as demais como erro. O ENEM costuma trazer textos que problematizam isso, principalmente em letras de música, poemas e textos de migrantes. Ao responder, note se a questão pergunta pelo <em>efeito de sentido</em> da variedade (identidade, humor, crítica) e não por «certo ou errado».</p>" +
      "<p>Na prática: use a <strong>norma culta</strong> na redação e em situações formais, mas saiba reconhecer e valorizar outras variedades. Essa flexibilidade é parte da competência linguística — e cai com frequência nas questões de sociolinguística.</p>"
  },
  {
    id: "kb-lin-005",
    disciplina: "linguagens",
    tema: "Gêneros textuais e multimodalidade",
    tipo: "conceito",
    gatilhos: ["generos textuais", "multimodalidade", "multissemioses", "tirinha", "charge", "meme", "genero"],
    titulo: "Gêneros textuais e multimodalidade: ler imagens também é ler",
    conteudo:
      "<p>Gêneros textuais são os tipos de texto que circulam na sociedade — notícia, receita, bula, meme, tirinha, discurso, relatório. Cada um tem <strong>finalidade</strong>, <strong>suporte</strong> e <strong>estilo</strong> próprios. Identificar o gênero já responde metade das questões, porque ele indica o que se espera do texto.</p>" +
      "<p>A <strong>multimodalidade</strong> (ou multissemiose) é a combinação de linguagens: verbal, visual, sonora, gestual. Num meme, o sentido nasce do choque entre a imagem e a legenda; numa charge, do desenho e do texto; num anúncio, de cores, tipografia e palavras. Ler só as palavras faz você perder a metade da mensagem.</p>" +
      "<p>Nas questões de multimodalidade, descreva para si mesmo: <em>o que a imagem mostra? o que o texto diz? onde está o contraste ou a ironia?</em> Normalmente a resposta certa está nesse contraste, e não na descrição isolada de um dos elementos.</p>"
  },
  /* ======================= LITERATURA ======================= */
  {
    id: "kb-lit-001",
    disciplina: "literatura",
    tema: "Romantismo indianista",
    tipo: "conceito",
    gatilhos: ["romantismo", "indianista", "indianismo", "goncalves dias", "alencar", "iracema", "heroi indigena"],
    titulo: "Romantismo indianista: o herói que o Brasil inventou",
    conteudo:
      "<p>O Romantismo brasileiro tem três fases: a <strong>nacionalista ou indianista</strong> (Gonçalves Dias, José de Alencar), a <strong>byroniana</strong> (Álvares de Azevedo, Casimiro de Abreu, o egocentrismo e a morte) e a <strong>social ou condoreira</strong> (Castro Alves, o engajamento abolicionista). O indianismo é a que mais cai no ENEM.</p>" +
      "<p>O indígena é idealizado como <strong>bom selvagem</strong>, puro, corajoso e ligado à natureza — um símbolo de identidade nacional, num país que queria se ver independente de Portugal. Repare que esse índio é uma construção do homem branco letrado: fala uma língua portuguesa arcaica e culta, e serve para representar o Brasil, não para retratar os povos reais.</p>" +
      "<p>Obras-chave: <em>Iracema</em> (o encontro do português Martim com a indígena que dá nome ao livro), <em>O Guarani</em> (Peri e Ceci), <em>Canção do Exílio</em> (a saudade como tema nacional) e os poemas de Gonçalves Dias. Leia a linguagem atenta ao <strong>paralelismo</strong> e à <strong>hipérbole</strong>, típicos da idealização romântica.</p>"
  },
  {
    id: "kb-lit-002",
    disciplina: "literatura",
    tema: "Realismo e Machado de Assis",
    tipo: "conceito",
    gatilhos: ["realismo", "machado de assis", "ironia", "dom casmurro", "memorias postumas", "personagem", "psicologia"],
    titulo: "Realismo e Machado de Assis: a ironia como bisturi",
    conteudo:
      "<p>O Realismo rejeita a idealização romântica: olha a sociedade como ela é, com foco na <strong>psicologia</strong> das personagens, na crítica social e no cotidiano da elite brasileira. No Brasil, o nome central é Machado de Assis, em <em>Memórias Póstumas de Brás Cubas</em>, <em>Quincas Borba</em>, <em>Dom Casmurro</em> e <em>O Primo Basílio</em> — este último, de Eça de Queirós, pertence ao Realismo português.</p>" +
      "<p>O traço machadiano é a <strong>ironia</strong>: o narrador parece elogiar e, ao mesmo tempo, desmonta a personagem. Brás Cubas é defunto autor de suas memórias — logo, escolhe o que contar. Em <em>Dom Casmurro</em>, Bentinho passa o livro inteiro tentando provar a traição de Capitu, e o leitor nunca sabe a verdade: o livro é sobre o <strong>ciúme</strong> e a manipulação do relato, não sobre um fato.</p>" +
      "<p>Fique atento aos recursos: narrador em primeira pessoa não é confiável; as digressões e as frases que parecem elogio muitas vezes escondem crítica; o tom mistura o sério e o cômico para desmontar a vaidade das personagens. Machado escreve pouco sobre paisagem e muito sobre dinheiro, status e aparências.</p>"
  },
  {
    id: "kb-lit-003",
    disciplina: "literatura",
    tema: "Modernismo antropofágico",
    tipo: "explicacao",
    gatilhos: ["modernismo", "antropofagia", "semana de 22", "oswald de andrade", "mario de andrade", "antropofago", "vanguarda"],
    titulo: "Modernismo: da Semana de 22 à antropofagia",
    conteudo:
      "<p>O Modernismo brasileiro começa com a <strong>Semana de Arte Moderna de 1922</strong>, em São Paulo: ruptura com o academicismo, valorização da linguagem coloquial, do falar brasileiro e da cultura popular. Mário de Andrade, em <em>Macunaíma</em>, cria o «herói sem nenhum caráter», síntese irreverente das três raças formadoras.</p>" +
      "<p>A fase de 1922 a 1930 busca a <strong>identidade nacional</strong>; a partir dos anos 1930, com a <strong>antropofagia</strong>, a proposta é devorar a cultura estrangeira e transformá-la em algo nosso, em vez de rejeitá-la ou copiá-la. Oswald de Andrade sintetiza no <em>Manifesto Antropófago</em>: «só me interessa o que não é meu».</p>" +
      "<p>Para as questões, guarde: nacionalismo crítico (não ufanista), coloquialidade, antiacademicismo, projeto estético de invenção de uma literatura brasileira. Compare com o Romantismo: este idealizava o índio; o Modernismo ri dele e o reinventa.</p>"
  },
  {
    id: "kb-lit-004",
    disciplina: "literatura",
    tema: "Poesia moderna e literatura contemporânea",
    tipo: "resumo",
    gatilhos: ["poesia moderna", "geracao de 45", "concretismo", "drummond", "cabral", "bandeira", "contemporanea", "poema"],
    titulo: "Poesia moderna e literatura contemporânea",
    conteudo:
      "<p>A poesia moderna brasileira começa em 1922 e se divide em eixos que o ENEM cobra: a <strong>vertente nacionalista</strong> (Carlos Drummond de Andrade, Vinicius de Moraes, Cecília Meireles), a <strong>poesia de 45</strong> ou de «retomada» (forma tradicional, temas existenciais) e o <strong>Concretismo</strong> (Haroldo e Augusto de Campos, Décio Pignatari), que explode o verso no espaço da página.</p>" +
      "<p>Drummond é o mais cobrado: seu «No meio do caminho» mostra a ruptura com a sintaxe linear e a repetição como insistência existencial. João Cabral pratica uma poesia anti-lírica, cerebral, atenta ao social. Manuel Bandeira trabalha a memória e a infância com simplicidade.</p>" +
      "<p>Na <strong>literatura contemporânea</strong>, as questões enfatizam diversidade de vozes: literatura feminina, indígena, periférica e de migrações. Fique atento a temas como identidade, memória, pertencimento e crítica social. Ao ler um poema contemporâneo, primeiro descreva o que <em>vê</em> na página — a forma costuma ser parte da mensagem.</p>"
  },
  /* ======================= INGLES ======================= */
  {
    id: "kb-ing-001",
    disciplina: "ingles",
    tema: "Falsos cognatos",
    tipo: "erro-comum",
    gatilhos: ["falsos cognatos", "cognatos", "false friends", "traducao", "aparentemente", "parents"],
    titulo: "Falsos cognatos: as palavras que traem",
    conteudo:
      "<p>Falsos cognatos são palavras parecidas com o português, mas com outro significado. Os mais frequentes em prova: <em>parents</em> (pais, não «parentes»), <em>actually</em> (na verdade, não «atualmente»), <em>eventually</em> (finalmente, não «eventualmente»), <em>pretend</em> (fingir), <em>college</em> (faculdade), <em>library</em> (biblioteca), <em>push</em> (empurrar), <em>pull</em> (puxar).</p>" +
      "<p>Uma lista que salva tempo: <em>concert</em> = show; <em>commodity</em> = mercadoria; <em>injury</em> = lesão; <em>service</em> = conserto/manutenção (mas «serviço» em outros contextos); <em>sensible</em> = sensato; <em>sensitive</em> = sensível. Repare que os dois «s» trocam o sentido — clássico de prova.</p>" +
      "<p>Estratégia: quando uma alternativa de tradução parecer óbvia demais, desconfie. Confirme a palavra no contexto da frase antes de marcar. Muitas vezes a questão testa exatamente o falso cognato.</p>"
  },
  {
    id: "kb-ing-002",
    disciplina: "ingles",
    tema: "Conectivos e interpretação",
    tipo: "dica",
    gatilhos: ["conectivos", "linkers", "however", "although", "because", "therefore", "interpretacao em ingles"],
    titulo: "Conectivos em inglês: a chave da interpretação",
    conteudo:
      "<p>Em inglês, os conectivos contam a relação entre as ideias e decidem a resposta. <em>However</em> e <em>but</em> indicam contraste (o que vem depois geralmente é o ponto principal); <em>although</em> e <em>even though</em> indicam concessão (a ideia principal vem na outra oração); <em>because</em> e <em>since</em> indicam causa; <em>therefore</em>, <em>so</em> e <em>thus</em> indicam conclusão.</p>" +
      "<p>Método de leitura: sublinhe os conectivos antes de ler com calma. Eles funcionam como setas: <em>first</em>, <em>then</em>, <em>finally</em> mostram a ordem; <em>for example</em> e <em>for instance</em> mostram que vem um exemplo (e exemplos raramente são a resposta sobre a ideia central); <em>in contrast</em> e <em>on the other hand</em> avisam de mudança de posição.</p>" +
      "<p>Não é preciso traduzir palavra por palavra. Leia a frase, identifique a relação de sentido e responda. E lembre-se: em questões de interpretação, a alternativa correta costuma ser um <strong>paráfrase</strong> do texto, não uma cópia literal dele.</p>"
  },
  {
    id: "kb-ing-003",
    disciplina: "ingles",
    tema: "Condicionais (if)",
    tipo: "explicacao",
    gatilhos: ["condicionais", "if", "would", "will", "condicional", "hipotese", "wish"],
    titulo: "Frases condicionais: será, seria, teria sido",
    conteudo:
      "<p>As condicionais ligam uma hipótese a um resultado. A <strong>primeira</strong> (if + presente, will) fala de algo possível no futuro: «If it rains, I will stay home». A <strong>segunda</strong> (if + passado, would) fala de hipótese irreal no presente: «If I had money, I would travel».</p>" +
      "<p>A <strong>terceira</strong> (if + had + particípio, would have + particípio) trata do passado que não aconteceu: «If she had studied, she would have passed». Uma marca importante: quanto mais improvável a hipótese, mais «distante» fica o verbo.</p>" +
      "<p>Nas provas, o que se testa é reconhecer o <strong>grau de realidade</strong> da frase. Palavras como <em>probably</em> e <em>maybe</em> pedem a primeira condicional; <em>if I were you</em> (com «were», não «was») pede a segunda. E atenção: «wish» + passado significa que você <em>não</em> tem o que deseja.</p>"
  },
  {
    id: "kb-ing-004",
    disciplina: "ingles",
    tema: "Vocabulário acadêmico e interpretação",
    tipo: "conceito",
    gatilhos: ["vocabulario", "academico", "reading", "palavras chave", "skimming", "scanning", "interpretacao"],
    titulo: "Vocabulário acadêmico e estratégias de leitura",
    conteudo:
      "<p>Textos de prova vêm de artigos, relatórios e notícias, e usam um vocabulário recorrente: <em>research</em> (pesquisa), <em>evidence</em> (evidência), <em>according to</em> (de acordo com), <em>despite</em> (apesar de), <em>significant</em> (significativo), <em>to address</em> (abordar), <em>however</em> (no entanto), <em>therefore</em> (portanto). Aprender essas palavras acelera muito a leitura.</p>" +
      "<p>Use duas técnicas: <strong>skimming</strong> (ler rápido para captar a ideia geral — título, primeiro e último parágrafo) e <strong>scanning</strong> (procurar uma informação específica, como um número ou nome). Não leia o dicionário mental de cada palavra: tente adivinhar pelo contexto — a definição costuma vir depois de uma vírgula, um travessão ou um «that is».</p>" +
      "<p>Ao responder, localize no texto a frase que sustenta a alternativa. Se você não conseguir apontar o trecho, provavelmente a alternativa é uma inferência sua, não do texto.</p>"
  },
  /* ======================= ESPANHOL ======================= */
  {
    id: "kb-esp-001",
    disciplina: "espanhol",
    tema: "Falsos cognatos em espanhol",
    tipo: "erro-comum",
    gatilhos: ["falsos cognatos espanhol", "heterossemanticos", "traducao", "embarazada", "largarse", "aparentemente"],
    titulo: "Falsos cognatos em espanhol: os perigosos",
    conteudo:
      "<p>Em espanhol, os heterosemânticos (falsos cognatos) armam ciladas parecidas com as do inglês. Os mais cobrados: <em>embarazada</em> (grávida, não «embaraçada»), <em>largarse</em> (ir embora), <em>raro</em> (estranho, não «raro» no sentido de ímpar), <em>vaso</em> (copo), <em>ciruela</em> (ameixa), <em>propagar</em> (espalhar).</p>" +
      "<p>Outro grupo importante: <em>largo</em> (comprido), <em>ancho</em> (largo), <em>pretender</em> (tentar), <em>recordar</em> (lembrar), <em>salir</em> (sair), <em>realizar</em> (perceber), <em>extrañar</em> (sentir falta). Note como <em>largo</em> e <em>ancho</em> invertem o sentido do português — erro clássico. E mais uma: <em>apellido</em> é sobrenome, e não «apelo».</p>" +
      "<p>Dica prática: quando uma palavra parecer familiar, leia a frase inteira antes de traduzir. Se a tradução óbvia quebrar o sentido do texto, suspeite do falso cognato e tente outro significado.</p>"
  },
  {
    id: "kb-esp-002",
    disciplina: "espanhol",
    tema: "Conectores e interpretação",
    tipo: "dica",
    gatilhos: ["conectores", "sin embargo", "aunque", "por lo tanto", "porque", "interpretacao espanhol", "marcadores"],
    titulo: "Conectores em espanhol: as setas do texto",
    conteudo:
      "<p>Os conectores (marcadores del discurso) organizam o texto e facilitam a interpretação. Contraste: <em>sin embargo</em>, <em>no obstante</em>, <em>pero</em>. Concessão: <em>aunque</em>, <em>a pesar de que</em>. Causa: <em>porque</em>, <em>ya que</em>, <em>puesto que</em>. Consequência: <em>por lo tanto</em>, <em>por eso</em>, <em>así que</em>.</p>" +
      "<p>Para ordem e ênfase: <em>en primer lugar</em>, <em>además</em>, <em>finalmente</em>, <em>en resumen</em>. Repare que <em>aunque</em> introduz a ideia que «não impede» — a outra oração costuma ser a principal. Em «Aunque llovía, salimos», o essencial é que saíram.</p>" +
      "<p>Estratégia de prova: leia o texto uma vez procurando conectores, marque-os e reconstrua o esqueleto argumentativo. Textos jornalísticos e de opinião em espanhol têm estrutura muito parecida com a do português — confie na sua intuição, mas confirme no texto.</p>"
  },
  {
    id: "kb-esp-003",
    disciplina: "espanhol",
    tema: "Subjuntivo",
    tipo: "explicacao",
    gatilhos: ["subjuntivo", "presente de subjuntivo", "ojala", "desejo", "duvida", "imperfeito de subjuntivo"],
    titulo: "O modo subjuntivo: desejo, dúvida e hipótese",
    conteudo:
      "<p>O subjuntivo aparece quando o falante expressa algo <strong>não constatado</strong>: desejo, dúvida, hipótese, possibilidade, influência ou emoção. Depois de «quiero que», «espero que», «dudo que», «es posible que», «ojalá» — use o subjuntivo. Depois de dados e certezas («es cierto que», «sé que»), use o indicativo.</p>" +
      "<p>Formas mais comuns no presente do subjuntivo: <em>hable, coma, viva</em> (terminadas em -ar → -e; -er/-ir → -a). No imperfeito: <em>hablara/hablase, comiera/comiese</em>, usado em hipóteses mais distantes. Note o contraste: «Busco una secretaria que hable inglés» (ainda não existe) x «Busco a la secretaria que habla inglés» (já existe, é específica).</p>" +
      "<p>Nas provas, o subjuntivo costuma aparecer em questões de interpretação e de completamento. Se a frase fala de algo <em>desejado</em> ou <em>incerto</em>, a tendência é o subjuntivo; se fala de <em>fato</em>, o indicativo. Quando o enunciado trouxer «para que», quase sempre o verbo seguinte vai para o subjuntivo.</p>"
  },
  /* ======================= HISTORIA GERAL ======================= */
  {
    id: "kb-hge-001",
    disciplina: "historia-geral",
    tema: "Grécia: pólis e democracia ateniense",
    tipo: "conceito",
    gatilhos: ["grecia", "polis", "atenas", "democracia ateniense", "clistenes", "cidadania", "esparta"],
    titulo: "Grécia: a pólis e a democracia ateniense",
    conteudo:
      "<p>A Grécia antiga não era um país unificado: era um conjunto de <strong>cidades-Estado</strong> independentes, as <em>pólis</em> (Atenas, Esparta, Corinto), cada uma com leis, exército e deuses próprios. A política grega nasce desse espaço pequeno, em que os cidadãos se reúnem para decidir diretamente — a <em>democracia direta</em>.</p>" +
      "<p>Em Atenas, as reformas de Clístenes (século VI a.C.) ampliaram a participação, mas <strong>cidadão</strong> era só o homem adulto, livre e nascido na cidade. Mulheres, estrangeiros (metecos) e escravos — a maior parte da população — estavam fora da vida política. Vale dizer: a democracia ateniense era excludente.</p>" +
      "<p>Compare com <strong>Esparta</strong>: sociedade militarizada, economia baseada em trabalhadores servis (hilotas), educação voltada para a guerra. O ENEM gosta de mostrar que «liberdade grega» e «escravidão grega» cresceram juntas, e de questões que opõem os dois modelos de cidade.</p>"
  },
  {
    id: "kb-hge-002",
    disciplina: "historia-geral",
    tema: "Roma e as Doze Tábuas",
    tipo: "conceito",
    gatilhos: ["roma", "doze tabuas", "direito romano", "republica", "senado", "patricios", "plebeus", "imperio"],
    titulo: "Roma: das Doze Tábuas ao Império",
    conteudo:
      "<p>A <strong>República romana</strong> nasce da luta entre patrícios (aristocracia) e plebeus (povo). A conquista plebeia decisiva foi a <strong>Lei das Doze Tábuas</strong> (450 a.C.): as regras, antes guardadas pelos sacerdotes, passaram a ser escritas e públicas. É o embrião do <em>direito escrito</em>, base do sistema jurídico ocidental.</p>" +
      "<p>As instituições republicanas eram o <strong>Senado</strong> (aristocracia, controlava as finanças e a política externa), os <strong>cônsules</strong> (dois magistrados com poder anual e veto mútuo) e as <strong>assembleias</strong> do povo. Havia ainda os tribunos da plebe, com poder de vetar decisões que prejudicassem os plebeus.</p>" +
      "<p>Com as guerras de expansão (Guerras Púnicas, conquista do Mediterrâneo), a República entra em crise: generais vitoriosos passam a ter exércitos fiéis a eles, e não a Roma. É o caminho para o <strong>Império</strong>, com Augusto (27 a.C.) e a <em>pax romana</em>. Atenção à diferença: república = instituições partilhadas; império = poder concentrado no imperador.</p>"
  },
  {
    id: "kb-hge-003",
    disciplina: "historia-geral",
    tema: "Feudalismo",
    tipo: "conceito",
    gatilhos: ["feudalismo", "feudo", "servidao", "suserania", "vassalagem", "idade media", "economia de subsistencia"],
    titulo: "Feudalismo: economia, poder e sociedade",
    conteudo:
      "<p>O feudalismo é o sistema político, social e econômico da Europa medieval (séculos IX a XV). A base é a <strong>economia agrária de subsistência</strong>: produz-se para consumir no próprio feudo, quase sem comércio. Não existe moeda corrente nem mercado amplo.</p>" +
      "<p>As relações de poder são <strong>pessoais</strong>, não territoriais: o rei concede terra (feudo) a um senhor, que lhe jura fidelidade. Entre senhores e camponeses, vigora a <strong>servidão</strong>: o servo trabalha parte do tempo para o senhor e parte para si, está preso à terra, mas <em>não</em> é escravizado — tem família e direitos costumeiros.</p>" +
      "<p>Dois eixos dominam a vida medieval: a <strong>Igreja Católica</strong>, que unifica culturalmente a Europa, e a hierarquia senhorial, que organiza a produção. Atenção: o ENEM cobra a diferença entre servo e escravo, e a ideia de que o poder do rei era limitado — ele era, muitas vezes, apenas «o primeiro entre iguais».</p>"
  },
  {
    id: "kb-hge-004",
    disciplina: "historia-geral",
    tema: "Revolução Francesa",
    tipo: "explicacao",
    gatilhos: ["revolucao francesa", "1789", "bastilha", "terceiro estado", "liberdade igualdade fraternidade", "jacobinos", "terror"],
    titulo: "Revolução Francesa: 1789 e o fim do Antigo Regime",
    conteudo:
      "<p>A França do século XVIII vivia sob o <strong>Antigo Regime</strong>: sociedade dividida em três estados (clero, nobreza e terceiro estado), em que o terceiro estado pagava impostos e não tinha poder político. A crise fiscal do Estado, somada às ideias do Iluminismo (soberania popular, separação de poderes, igualdade jurídica), criou o terreno da revolta.</p>" +
      "<p>Em <strong>1789</strong>: convocação dos Estados Gerais, formação da Assembleia Nacional, <strong>queda da Bastilha</strong> (14 de julho), noite de 4 de agosto (fim dos privilégios) e <strong>Declaração dos Direitos do Homem e do Cidadão</strong>. A fase radical (1793-94) traz a República, a execução de Luís XVI e o <strong>Terror</strong> jacobino, liderado por Robespierre.</p>" +
      "<p>A partir de 1799, <strong>Napoleão Bonaparte</strong> dá golpe e concentra o poder — um desfecho contraditório: consolida feitos revolucionários (Código Civil, igualdade perante a lei) e, ao mesmo tempo, impõe um império autoritário. Para o ENEM: ligue a Revolução ao nascimento do <em>cidadão</em>, do Estado-nação e dos direitos civis.</p>"
  },
  {
    id: "kb-hge-005",
    disciplina: "historia-geral",
    tema: "Revolução Industrial",
    tipo: "explicacao",
    gatilhos: ["revolucao industrial", "industrializacao", "maquina a vapor", "operariado", "capitalismo industrial", "ludismo", "fabrica"],
    titulo: "Revolução Industrial: da fábrica ao operariado",
    conteudo:
      "<p>A Revolução Industrial começa na Inglaterra do século XVIII e muda a forma de produzir: da <strong>oficina artesanal</strong> (produção manual, ritmo do mestre) para a <strong>fábrica</strong> (máquina, divisão do trabalho, disciplina do relógio). Inovações-chave: máquina a vapor de Watt, tear mecânico, uso do carvão e depois da eletricidade.</p>" +
      "<p>As consequências sociais são profundas: nasce o <strong>proletariado</strong> industrial, com jornadas de 14 a 16 horas, trabalho de mulheres e crianças e bairros insalubres. Daí vêm as resistências: o <strong>ludismo</strong> (quebra das máquinas), as <strong>trade unions</strong> (sindicatos) e, mais tarde, o <strong>cartismo</strong> e o socialismo.</p>" +
      "<p>A industrialização é também <strong>imperialista</strong>: precisa de matérias-primas baratas e de mercados consumidores, o que empurra a partilha da África e da Ásia no século XIX. Note a divisão básica que o ENEM cobra: <strong>1ª Revolução</strong> (vapor, têxtil, Inglaterra), <strong>2ª</strong> (aço, eletricidade, química, EUA e Alemanha) e <strong>3ª</strong> (informática, automação, globalização).</p>"
  },
  {
    id: "kb-hge-006",
    disciplina: "historia-geral",
    tema: "Imperialismo e neocolonialismo",
    tipo: "conceito",
    gatilhos: ["imperialismo", "neocolonialismo", "partilha da africa", "conferencia de berlim", "colonialismo", "expansao"],
    titulo: "Imperialismo: a partilha do mundo no século XIX",
    conteudo:
      "<p>No fim do século XIX, as potências europeias (e também EUA e Japão) disputam territórios na África e na Ásia: é o <strong>imperialismo</strong> ou <em>neocolonialismo</em>. As justificativas eram «civilizatórias» e racistas; as razões reais eram econômicas (matéria-prima, mercado, investimentos) e estratégicas (rotas militares, prestígio nacional).</p>" +
      "<p>A <strong>Conferência de Berlim</strong> (1884-85) definiu regras para a ocupação africana: para ter direito a um território, a potência precisava ocupá-lo de fato. Foi assim que fronteiras retas foram desenhadas no mapa, cortando grupos étnicos e reinos africanos — raiz de conflitos que duram até hoje.</p>" +
      "<p>Na Ásia, o alvo principal foi a China (Guerras do Ópio, concessões territoriais) e a Índia (domínio britânico). As respostas locais variaram da resistência armada à modernização conservadora, como a <strong>Restauração Meiji</strong> no Japão (1868), que transformou o país em potência em poucas décadas.</p>"
  },
  {
    id: "kb-hge-007",
    disciplina: "historia-geral",
    tema: "Guerras Mundiais",
    tipo: "explicacao",
    gatilhos: ["primeira guerra mundial", "segunda guerra mundial", "1914", "1939", "trincheiras", "holocausto", "tratado de versalhes", "nazismo"],
    titulo: "Guerras Mundiais: causas, conflitos e desfechos",
    conteudo:
      "<p>A <strong>Primeira Guerra</strong> (1914-1918) nasceu da disputa imperialista, das alianças militares rígidas (Tríplice Aliança x Tríplice Entente) do nacionalismo e da corrida armamentista. O estopim foi o assassinato do herdeiro do Império Austro-Húngaro em Sarajevo. A guerra de trincheiras mostrou a brutalidade da indústria a serviço da morte.</p>" +
      "<p>A <strong>paz de Versalhes</strong> (1919) culpou a Alemanha, impôs perdas territoriais e dívidas pesadas — humilhação que alimentou o revanchismo e a ascensão do nazismo. A <strong>Segunda Guerra</strong> (1939-1945) teve causa central no expansionismo nazifascista: anexação da Áustria, Sudetos, invasão da Polônia.</p>" +
      "<p>Desfechos e marcos: <strong>Holocausto</strong> (extermínio sistemático de cerca de 6 milhões de judeus), <strong>bombas atômicas</strong> em Hiroshima e Nagasaki, criação da <strong>ONU</strong> (1945) e início da <strong>Guerra Fria</strong>. Um aprendizado essencial: a fragilidade da paz quando os perdedores são humilhados em vez de integrados.</p>"
  },
  {
    id: "kb-hge-008",
    disciplina: "historia-geral",
    tema: "Guerra Fria",
    tipo: "conceito",
    gatilhos: ["guerra fria", "muro de berlim", "cortina de ferro", "corrida armamentista", "capitalismo", "socialismo", "descolonizacao"],
    titulo: "Guerra Fria: dois mundos, um equilíbrio de medo",
    conteudo:
      "<p>De 1947 a 1991, o mundo se organizou em dois blocos: o <strong>capitalista</strong>, liderado pelos EUA (OTAN, Plano Marshall), e o <strong>socialista</strong>, liderado pela URSS (Pacto de Varsóvia, COMECON). A «guerra» era <em>fria</em> porque os dois lados nunca se enfrentaram diretamente: o risco nuclear (destruição mútua garantida) mantinha o equilíbrio.</p>" +
      "<p>Os conflitos aconteciam por procuração: <strong>Guerra da Coreia</strong> (1950-53), <strong>Guerra do Vietnã</strong> (1965-75), <strong>crise dos mísseis em Cuba</strong> (1962), <strong>construção e queda do Muro de Berlim</strong> (1961-1989). A decolonização da África e da Ásia foi outro palco: cada novo país independente era disputado ou influenciado pelos blocos.</p>" +
      "<p>O fim vem com as reformas de <strong>Gorbatchev</strong> (Glasnost e Perestroika), a crise econômica soviética, a queda do Muro (1989) e o fim da URSS (1991). Muitos textos do ENEM comparam a lógica da Guerra Fria com a geopolítica atual — leve os <em>conceitos</em> (bipolaridade, influência, dissuasão nuclear), não só as datas.</p>"
  },
  /* ======================= HISTORIA DO BRASIL ======================= */
  {
    id: "kb-hbr-001",
    disciplina: "historia-brasil",
    tema: "Capitanias hereditárias",
    tipo: "conceito",
    gatilhos: ["capitanias hereditarias", "capitanias", "sesmarias", "martim afonso", "pernambuco", "sao vicente", "colonizacao"],
    titulo: "Capitanias hereditárias: o primeiro ensaio colonial",
    conteudo:
      "<p>Em 1534, Portugal dividiu o Brasil em <strong>15 faixas de terra</strong> (capitanias) doadas a nobres, as <em>capitanias hereditárias</em>. Cada donatário recebia amplos poderes: fundar vilas, doar sesmarias, cobrar impostos e transmitir o cargo aos filhos. Era uma solução barata para um império sem dinheiro para colonizar diretamente.</p>" +
      "<p>O resultado foi fracasso geral. Só prosperaram duas: <strong>São Vicente</strong> (onde Martim Afonso de Souza instalou o engenho de açúcar) e <strong>Pernambuco</strong> (graças à fertilidade do massapê e à cana). Falta de recursos, ataques indígenas e a distância de Portugal derrubaram a maioria das capitanias.</p>" +
      "<p>Em 1549, a Coroa criou o <strong>Governo-Geral</strong>, com Tomé de Sousa e a capital em Salvador: centralização administrativa, defesa militar e apoio à produção açucareira. Guarde a lógica: <em>fracasso da descentralização → centralização colonial</em>. É aí que nasce o Estado colonial brasileiro.</p>"
  },
  {
    id: "kb-hbr-002",
    disciplina: "historia-brasil",
    tema: "Plantation, escravidão e resistência",
    tipo: "explicacao",
    gatilhos: ["plantation", "escravidao", "engenho", "acucar", "trafico negreiro", "quilombo", "abolicao", "resistencia"],
    titulo: "Plantation e escravidão: a base do Brasil colonial",
    conteudo:
      "<p>O <strong>sistema plantation</strong> tinha três marcas: <strong>monocultura</strong> (cana, depois café), <strong>latifúndio</strong> (grande propriedade) e <strong>trabalho escravo</strong> africano. O engenho integrava lavoura, moenda e casa de purgar - toda a produção voltada à exportação para a Europa. Era uma economia de população escrava trazida à força pelo tráfico atlântico.</p>" +
      "<p>Não houve passividade: houve <strong>resistência</strong> constante - fugas para os <strong>quilombos</strong> (Palmares, liderado por Zumbi, foi o mais duradouro), revoltas nas cidades (como a <em>Revolta dos Malês</em>, de religiosidade islâmica, em 1835), abortos e infanticídio como recusa à reprodução da escravidao, e a luta política dos abolicionistas.</p>" +
      "<p>A <strong>Lei Áurea</strong> (1888) encerrou a escravidão formal, mas deixou dívidas: sem acesso à terra, à educação ou à cidadania plena, a população negra permaneceu em desvantagem - estrutura que ainda hoje explica desigualdades que o ENEM cobra. Atenção: a escravidão indígena também existiu, embora em escala menor e lógica diferente.</p>"
  },
  {
    id: "kb-hbr-003",
    disciplina: "historia-brasil",
    tema: "República Velha, política dos governadores e coronelismo",
    tipo: "explicacao",
    gatilhos: ["republica velha", "politica dos governadores", "coronelismo", "voto de cabresto", "coronel", "primeira republica", "camara de deputados"],
    titulo: "República Velha: governadores, coronéis e voto de cabresto",
    conteudo:
      "<p>A República Velha (1889-1930) teve duas fases: a <strong>República da Espada</strong> (Deodoro, Floriano - governo militar) e a <strong>República Oligárquica</strong>, dominada pelas elites cafeeiras de São Paulo e Minas Gerais, que se alternavam no poder - o «café com leite».</p>" +
      "<p>A <strong>política dos governadores</strong> (acordo de Campos Sales) garantia apoio dos estados ao presidente da República em troca de autonomia para as oligarquias locais: o presidente não interferia nos estados, e os governadores entregavam os votos. No nível local, quem mandava era o <strong>coronel</strong> - grande proprietário que controlava a polícia, o juiz, o carteiro e os eleitores.</p>" +
      "<p>O <strong>voto de cabresto</strong> era a fraude eleitoral organizada: pressão, troca de favores, violência e abertura de urnas - em 1930, menos de 6% da população votava. Greves operárias (como a greve geral de 1917 em São Paulo), revoltas populares (Canudos, Contestado) e a crise do café com a quebra da Bolsa de Nova York (1929) prepararam o fim do regime.</p>"
  },
  {
    id: "kb-hbr-004",
    disciplina: "historia-brasil",
    tema: "Era Vargas",
    tipo: "conceito",
    gatilhos: ["era vargas", "getulio vargas", "estado novo", "revolucao de 1930", "clt", "trabalhismo", "ditadura vargas"],
    titulo: "Era Vargas: trabalho, cidadania e autoritarismo",
    conteudo:
      "<p>De 1930 a 1945, Getulio Vargas domina a vida política brasileira. Chega ao poder pela <strong>Revolução de 1930</strong>, que derruba Washington Luís e encerra a República Velha. Governa primeiro como chefe do governo provisório (1930-34), depois como presidente eleito por voto indireto (1934-37) e, de 1937 a 1945, na ditadura do <strong>Estado Novo</strong>.</p>" +
      "<p>O <strong>trabalhismo</strong> é sua marca: criação do <strong>salário mínimo</strong>, da <strong>CLT</strong> (Consolidação das Leis do Trabalho, 1943), da Justiça do Trabalho e dos sindicatos oficiais. É uma cidadania <em>concedida de cima</em>: os direitos vêm do Estado, não de conquista autônoma dos trabalhadores - e os sindicatos ficam sob controle do governo.</p>" +
      "<p>Vargas também criou o patrimônio histórico nacional, a Companhia Siderúrgica Nacional e a Petrobras (1953, já no segundo governo). Sua contradição final: populista e autoritário, ao mesmo tempo. Em 1954, sob pressão política, suicida-se - um gesto que condensou o «pai dos pobres» e o governante de mão pesada.</p>"
  },
  {
    id: "kb-hbr-005",
    disciplina: "historia-brasil",
    tema: "Ditadura Militar",
    tipo: "explicacao",
    gatilhos: ["ditadura militar", "golpe de 1964", "atos institucionais", "ai5", "anistia", "abertura politica", "censura", "diretas ja"],
    titulo: "Ditadura Militar: 1964 e a resistência democrática",
    conteudo:
      "<p>Em <strong>1964</strong>, um golpe militar depõe João Goulart, com apoio de setores civis, da imprensa e do governo dos EUA. O regime instala os <strong>Atos Institucionais</strong>: o AI-2 (1965) extingue os partidos e cria ARENA e MDB; o <strong>AI-5</strong> (1968) fecha o Congresso, suspende garantias jurídicas e abre a caça aos opositores.</p>" +
      "<p>Nos <strong>Anos de Chumbo</strong> (1968-74), a repressão atinge seu auge: prisões, tortura, censura prévia, desaparecimentos e exílio. A sociedade reagiu de várias formas - a luta armada (que fracassou militarmente), a imprensa alternativa, o teatro e a música de protesto (Chico Buarque, Geraldo Vandré), a organização sindical do ABC e, depois, a campanha pelas <strong>Diretas Já</strong> (1984).</p>" +
      "<p>A <strong>abertura</strong> foi lenta, gradual e «segura», conduzida pelo próprio regime (Geisel e Figueiredo): fim do AI-5 (1978), <strong>Lei da Anistia</strong> (1979), fim do bipartidarismo (1980) e eleições diretas para governador (1982). Em 1985, Tancredo Neves vence no Colégio Eleitoral e encerra o regime militar.</p>"
  },
  {
    id: "kb-hbr-006",
    disciplina: "historia-brasil",
    tema: "Constituição de 1988",
    tipo: "resumo",
    gatilhos: ["constituicao de 1988", "constituicao cidada", "direitos sociais", "redemocratizacao", "estado democratico", "direitos humanos"],
    titulo: "Constituição de 1988: a Constituição Cidadã",
    conteudo:
      "<p>Promulgada em <strong>5 de outubro de 1988</strong>, a Constituição Federal brasileira é chamada de «Constituição Cidadã» porque ampliou de forma inédita os <strong>direitos e garantias fundamentais</strong>: saúde e educação como direito de todos e dever do Estado (SUS, meta de investimento em educação), direitos dos trabalhadores, das mulheres, das crianças e adolescentes (ECA, 1990), dos povos indígenas e do meio ambiente.</p>" +
      "<p>Ela nasce da <strong>redemocratização</strong>: depois de 21 anos de ditadura, o país precisava refundar seu contrato social. A Assembleia Nacional Constituinte (1987-88) teve participação intensa de movimentos sociais, o que explica o caráter social do texto - inclusive emendas populares apresentadas por entidades da sociedade civil.</p>" +
      "<p>Para as questões: saiba distinguir os três Poderes e seus mecanismos de controle, entender o <strong>Estado democrático de direito</strong> e reconhecer que a Constituição é «rígida» - muda por emendas com quórum qualificado, difícil de alcançar. Muitas questões do ENEM trazem dispositivos constitucionais aplicados a casos concretos (educação, saúde, moradia).</p>"
  },
  /* ======================= GEOGRAFIA ======================= */
  {
    id: "kb-geo-001",
    disciplina: "geografia",
    tema: "Urbanização e macrocefalia urbana",
    tipo: "explicacao",
    gatilhos: ["urbanizacao", "cidade", "macrocefalia urbana", "metropole", "exodo rural", "rede urbana", "conurbacao"],
    titulo: "Urbanização: como as cidades cresceram",
    conteudo:
      "<p>Urbanização é o aumento da população que vive em cidades. Nos países desenvolvidos, ela veio junto com a industrialização e foi mais lenta e planejada. Nos países em desenvolvimento, como o Brasil, houve uma <strong>urbanização tardia e concentrada</strong>: o êxodo rural, a mecanização do campo e a industrialização por substituição de importações (décadas de 1950-70) trocaram trabalhadores rurais sem terra por trabalhadores urbanos sem emprego formal.</p>" +
      "<p>Daí nasce a <strong>macrocefalia urbana</strong>: uma cidade cresce muito mais que as outras e concentra população, renda, serviços e poder político (ex.: São Paulo e Rio de Janeiro). O sintoma é a <em>conurbação</em> - cidades vizinhas que se fundem numa mancha urbana contínua, formando regiões metropolitanas com problemas de transporte e moradia.</p>" +
      "<p>Consequências que caem no ENEM: favelização e autoconstrução de bairros sem infraestrutura, ocupação de áreas de risco (encostas, fundos de vale), inchaço da periferia e aumento do tempo de deslocamento. Quando a questão falar em «cidade informal», pense em moradia precária, ausência de saneamento e déficit habitacional.</p>"
  },
  {
    id: "kb-geo-002",
    disciplina: "geografia",
    tema: "Segregação socioespacial",
    tipo: "conceito",
    gatilhos: ["segregacao socioespacial", "segregacao", "gueto", "condominio fechado", "periferia", "desigualdade espacial", "gentrificacao"],
    titulo: "Segregação socioespacial: a cidade dividida",
    conteudo:
      "<p>Segregação socioespacial é a separação de grupos sociais no espaço urbano, ora por <strong>renda</strong>, ora por <strong>raça</strong>, ora por <strong>origem</strong>. Ela aparece em duas formas principais: a <strong>segregação imposta</strong> (os mais pobres são empurrados para periferias sem infraestrutura) e a <strong>segregação voluntária</strong> (as elites se isolam em condomínios fechados, muros, câmeras e segurança privada).</p>" +
      "<p>Compare com o <strong>gueto</strong>: originalmente, área de concentração forçada de um grupo étnico (os guetos judeus na Europa). Hoje, o termo é usado para bairros pobres e estigmatizados. Outro conceito importante é a <strong>gentrificação</strong>: valorização de um bairro popular que expulsa os moradores antigos, porque o aluguel e os impostos sobem.</p>" +
      "<p>Nas questões do ENEM, procure indícios de segregação: mapas com bairros de alta e baixa renda separados por uma avenida ou um rio, dados de acesso a saneamento por região, imagens de muro. E note que a segregação também se dá no <em>acesso</em> - transporte ruim é uma forma de impedir que o pobre chegue ao centro.</p>"
  },
  {
    id: "kb-geo-003",
    disciplina: "geografia",
    tema: "Transição demográfica",
    tipo: "explicacao",
    gatilhos: ["transicao demografica", "demografia", "taxa de natalidade", "taxa de mortalidade", "envelhecimento", "piramide etaria", "bonus demografico"],
    titulo: "Transição demográfica: o que as pirâmides contam",
    conteudo:
      "<p>A <strong>transição demográfica</strong> descreve a passagem de um regime de alta natalidade e alta mortalidade para outro de baixa natalidade e baixa mortalidade. Tem quatro fases: (1) equilíbrio antigo, com números altos; (2) mortalidade em queda (melhor alimentação, saneamento, medicina) e natalidade ainda alta - crescimento explosivo; (3) natalidade caindo (urbanização, mulheres no mercado de trabalho, contraceptivos); (4) novo equilíbrio, com números baixos.</p>" +
      "<p>Leitura da <strong>pirâmide etária</strong>: base larga = muitos jovens (população crescendo, demanda por escola e primeiro emprego). Topo largo = muitos idosos (envelhecimento, demanda por saúde e previdência). Meio largo = população economicamente ativa dominante, o «bônus demográfico».</p>" +
      "<p>O Brasil está numa transição avançada, mas <em>rápida e desigual</em>: as regiões Sul e Sudeste envelhecem antes que o Norte e o Nordeste, e há diferenças enormes por classe. O ENEM cobra muito a diferença entre <strong>crescimento populacional absoluto</strong> (número de habitantes) e <strong>taxa de crescimento</strong> (percentual) - o Brasil pode crescer pouco e ainda assim ter milhões de habitantes.</p>"
  },
  {
    id: "kb-geo-004",
    disciplina: "geografia",
    tema: "Migrações",
    tipo: "conceito",
    gatilhos: ["migracao", "migracoes", "imigracao", "emigracao", "refugiado", "xenofobia", "migracao interna", "transmigracao"],
    titulo: "Migrações: deslocar-se por escolha ou por necessidade",
    conteudo:
      "<p>Migração é o deslocamento de pessoas entre espaços. Classifique sempre por três critérios: <strong>espaço</strong> (interna ou internacional), <strong>tempo</strong> (temporária, permanente, sazonal, pendular - ir e voltar todo dia) e <strong>modo</strong> (espontânea, por exemplo, em busca de trabalho; ou forçada, como em guerras e desastres).</p>" +
      "<p>Conceitos que a banca cobra: <strong>imigração</strong> (entrada), <strong>emigração</strong> (saída), <strong>refugiado</strong> (foge de perseguição por raça, religião, opinião ou grupo social - tem proteção internacional, diferente do migrante econômico), <strong>xenofobia</strong> (rejeição ao estrangeiro) e <strong>diáspora</strong> (dispersão de um povo).</p>" +
      "<p>No Brasil, os grandes movimentos internos foram: a migração nordestina para o Sudeste (século XX), a fronteira agrícola avançando sobre o Centro-Oeste e a Amazônia e, mais recentemente, o retorno de nordestinos e o fluxo para cidades médias. O ENEM adora mostrar que migração não é «problema», é <strong>processo histórico</strong> - e que países de destino lucram com a mão de obra imigrante.</p>"
  },
  {
    id: "kb-geo-005",
    disciplina: "geografia",
    tema: "Blocos econômicos",
    tipo: "resumo",
    gatilhos: ["blocos economicos", "mercosul", "uniao europeia", "alca", "brics", "integracao regional", "tarifas", "livre comercio"],
    titulo: "Blocos econômicos: integração em graus",
    conteudo:
      "<p>Países se organizam em blocos para reduzir barreiras comerciais e ganhar peso político. Há uma <strong>escada de integração</strong>: zona de livre comércio (sem tarifas internas) → união aduaneira (tarifa externa comum) → mercado comum (livre circulação de mercadorias, capitais e pessoas) → união econômica e monetária (moeda única e política econômica comum).</p>" +
      "<p>Exemplos: <strong>Mercosul</strong> (1991 - Brasil, Argentina, Paraguai, Uruguai e, mais tarde, a Venezuela) é união aduaneira, com problemas reais de infraestrutura e assimetria entre economias. A <strong>União Europeia</strong> chegou ao topo da escada, com o euro. O <strong>NAFTA/USMCA</strong> (EUA, Canadá, México) é zona de livre comércio, e os <strong>BRICS</strong> não são bloco econômico, e sim um foro de cooperação entre economias emergentes.</p>" +
      "<p>Cuidado com duas confusões comuns: bloco econômico <em>não</em> é aliança militar, e integração regional <em>não</em> elimina desigualdades internas - países menores podem perder indústria para os maiores. Quando o enunciado citar barreiras sanitárias ou fitossanitárias, lembre-se: elas também são forma de protecionismo.</p>"
  },
  {
    id: "kb-geo-006",
    disciplina: "geografia",
    tema: "Fontes de energia e aquecimento global",
    tipo: "explicacao",
    gatilhos: ["fontes de energia", "matriz energetica", "aquecimento global", "efeito estufa", "mudancas climaticas", "energia renovavel", "acordo de paris"],
    titulo: "Matriz energética e aquecimento global",
    conteudo:
      "<p>As fontes de energia se dividem em <strong>renováveis</strong> (solar, eólica, hídrica, biomassa, geotérmica, maremotriz) e <strong>não renováveis</strong> (petróleo, carvão, gás natural, urânio). A <strong>matriz energética</strong> de um país mostra o quanto ele depende de cada fonte; a <strong>matriz elétrica</strong>, só a geração de eletricidade. No Brasil, a matriz elétrica é majoritariamente hídrica - o que gera vulnerabilidade em anos de seca, como 2001 e 2014-15.</p>" +
      "<p>O <strong>efeito estufa</strong> é natural e necessário: sem ele, a Terra teria cerca de -18 °C. O problema é o <strong>aquecimento global</strong> provocado pelo aumento da queima de combustíveis fósseis, que eleva a concentração de CO₂ e outros gases de efeito estufa (metano, óxido nitroso), retendo mais calor. Consequências: elevação do nível do mar, derretimento de calotas, eventos climáticos extremos, perda de biodiversidade e crises agrícolas.</p>" +
      "<p>No plano político, o <strong>Protocolo de Quioto</strong> (1997) criou metas de redução para países ricos, e o <strong>Acordo de Paris</strong> (2015) ampliou a discussão: limitar o aumento da temperatura média global a 1,5-2 °C, com contribuições nacionalmente determinadas (NDCs). O ENEM cobra a diferença entre clima (padrão de longo prazo) e tempo (estado momentâneo da atmosfera) - e cuidado com notícias que usam uma onda de frio para negar o aquecimento.</p>"
  },
  /* ======================= SOCIOLOGIA ======================= */
  {
    id: "kb-soc-001",
    disciplina: "sociologia",
    tema: "Mais-valia e classes sociais",
    tipo: "conceito",
    gatilhos: ["mais valia", "mais-valia", "marx", "lucro", "trabalho", "classes sociais", "proletariado", "burguesia"],
    titulo: "Marx: mais-valia e luta de classes",
    conteudo:
      "<p>Para Karl Marx, o valor de uma mercadoria vem do <strong>trabalho</strong> nela incorporado. O trabalhador vende sua força de trabalho por um salário, mas produz mais valor do que recebe. Essa diferença - o valor excedente apropriado pelo dono dos meios de produção - é a <strong>mais-valia</strong>, origem do lucro capitalista.</p>" +
      "<p>Há dois tipos clássicos: a <strong>mais-valia absoluta</strong> (aumentar a jornada de trabalho, mantendo o salário) e a <strong>mais-valia relativa</strong> (aumentar a produtividade com tecnologia e organização, reduzindo o tempo necessário para repor o salário). A terceira forma, discutida por autores posteriores, é a <em>extra</em>: alongamento do dia com tecnologias digitais (responder e-mails em casa).</p>" +
      "<p>Daí vem a <strong>luta de classes</strong>: burguesia (dono do capital) x proletariado (dono apenas da força de trabalho). Marx via a história como sucessão de modos de produção e conflitos de classe. Cuidado: o ENEM frequentemente cobra a diferença entre <em>desigualdade</em> (sociológica) e <em>pobreza</em> (econômica) - a mais-valia explica a primeira, não necessariamente a segunda.</p>"
  },
  {
    id: "kb-soc-002",
    disciplina: "sociologia",
    tema: "Estado segundo Weber",
    tipo: "conceito",
    gatilhos: ["estado", "weber", "monopolio da violencia", "burocracia", "dominacao", "legalidade", "estado moderno"],
    titulo: "Weber: o Estado e o monopólio da violência legítima",
    conteudo:
      "<p>Max Weber define o <strong>Estado</strong> como a instituição que detém o <em>monopólio do uso legítimo da força física</em> dentro de um território. Não é o único a usar violência (particulares também usam), mas é o único que pode usá-la de forma <strong>legítima</strong> - reconhecida pelos governados.</p>" +
      "<p>Weber distingue três tipos de <strong>dominação</strong> (autoridade aceita): a <strong>tradicional</strong> (manda quem manda porque «sempre foi assim» - o rei, o patriarca), a <strong>carismática</strong> (manda a pessoa com qualidades excepcionais - um líder religioso, um revolucionário) e a <strong>legal-racional</strong> (manda a lei, e a obediência é ao cargo, não à pessoa - a burocracia moderna).</p>" +
      "<p>Sua crítica à burocracia é famosa: ela é <strong>eficiente</strong>, mas tende a engessar, a criar regras que se justificam por si mesmas e a uma «jaula de ferro». Nas questões, compare com Marx: marx explica o Estado como <em>instrumento de classe</em> (quem manda são os donos do capital), Weber como <em>instituição com lógica própria</em> (a burocracia tem interesses e ritmos próprios).</p>"
  },
  {
    id: "kb-soc-003",
    disciplina: "sociologia",
    tema: "Indústria cultural",
    tipo: "conceito",
    gatilhos: ["industria cultural", "adorno", "horkheimer", "meios de comunicacao de massa", "massificacao", "alienacao", "consumo"],
    titulo: "Indústria cultural: cultura que virou mercadoria",
    conteudo:
      "<p>Theodor Adorno e Max Horkheimer, da <strong>Escola de Frankfurt</strong>, criaram o conceito nos anos 1940: a <strong>indústria cultural</strong> transforma a cultura em mercadoria produzida em série, como sabonete. Não se trata só de «cultura popular»: trata-se da produção industrial de filmes, músicas, novelas e notícias que padroniza gostos e comportamentos.</p>" +
      "<p>A crítica tem três eixos: a <strong>padronização</strong> (tudo fica parecido, porque o que funciona se repete), a <strong>passividade</strong> (o público consome em vez de criar, o que gera alienação) e a <strong>razão instrumental</strong> (a técnica deixa de servir à emancipação e passa a servir ao lucro e à eficiência).</p>" +
      "<p>Atenção à diferença: a indústria cultural <em>não</em> é o mesmo que cultura de massa. Para os frankfurtianos, a expressão é crítica: a ilusão de escolha mascara a uniformidade. Questões do ENEM costumam trazer propagandas, reality shows e redes sociais para perguntar se há <em>efetiva diversidade</em> ou apenas variedade do mesmo.</p>"
  },
  {
    id: "kb-soc-004",
    disciplina: "sociologia",
    tema: "Capital cultural de Bourdieu",
    tipo: "conceito",
    gatilhos: ["capital cultural", "bourdieu", "habitus", "escola", "reproducao", "capital social", "distincao"],
    titulo: "Bourdieu: capital cultural e reprodução",
    conteudo:
      "<p>Pierre Bourdieu mostra que o sucesso escolar não depende só de esforço individual. As famílias transmitem <strong>capital cultural</strong>: o vocabulário, o hábito de leitura, o conhecimento de museus e referências, a forma de falar e de se portar na escola. Como a escola valoriza justamente esses bens, ela premia quem já os tem - e parece, com isso, estar sendo «justa».</p>" +
      "<p>O <strong>habitus</strong> é o conjunto de disposições incorporadas desde a infância (modo de comer, falar, gostar, decidir) que nos faz agir sem pensar. O <strong>capital social</strong> são as redes de relação que se pode mobilizar. Juntos, esses capitais explicam por que alunos com a mesma nota chegam a resultados diferentes.</p>" +
      "<p>Conclusão central de Bourdieu: a escola <strong>reproduz</strong> as desigualdades, mas as apresenta como se fossem diferenças naturais de talento. Quando o ENEM trouxer um texto sobre dificuldade de alunos de baixa renda na universidade, pense em capital cultural - e também em <em>violência simbólica</em>, a imposição de uma cultura como se fosse superior.</p>"
  },
  {
    id: "kb-soc-005",
    disciplina: "sociologia",
    tema: "Movimentos sociais",
    tipo: "conceito",
    gatilhos: ["movimentos sociais", "mst", "movimento negro", "feminismo", "coletivos", "sociedade civil", "acao coletiva", "identidade"],
    titulo: "Movimentos sociais: a sociedade civil em ação",
    conteudo:
      "<p>Movimentos sociais são <strong>ações coletivas</strong> organizadas que buscam mudanças sociais, reconhecimento ou direitos. Eles surgem quando um grupo percebe que uma injustiça <em>pode</em> ser mudada e se organiza para isso. Exemplos brasileiros: o Movimento dos Trabalhadores Rurais Sem Terra (MST), o movimento negro (com a Fundação Palmares e as cotas), os movimentos feministas, os coletivos de jovens periféricos e as ocupações de escolas.</p>" +
      "<p>Uma virada importante foi a passagem dos movimentos <strong>de classe</strong> (o sujeito era o trabalhador, a pauta era econômica) para movimentos <strong>identitários e culturais</strong> (o sujeito é definido por gênero, raça, orientação sexual, geracionalidade; a pauta inclui reconhecimento e representação). Não são excludentes: um mesmo movimento pode ter as duas caras.</p>" +
      "<p>Para analisar um movimento numa questão, pergunte: <em>quem são os atores? qual é a pauta? contra quem ou o quê lutam? qual repertório usam (manifestação, ocupação, rede social)?</em> Desconfie de textos que trate movimento social como baderna: a ação coletiva é parte normal e legítima da democracia.</p>"
  },
  /* ======================= FILOSOFIA ======================= */
  {
    id: "kb-fil-001",
    disciplina: "filosofia",
    tema: "Mythos, logos e pré-socráticos",
    tipo: "conceito",
    gatilhos: ["mythos", "logos", "pre socraticos", "tales", "anaximandro", "heraclito", "parmenides", "natureza"],
    titulo: "Mythos e logos: o nascimento da filosofia",
    conteudo:
      "<p>Antes da filosofia, a explicação do mundo era pelo <strong>mythos</strong>: narrativas envolvendo deuses, forças sobrenaturais e tradição - a verdade vinha da autoridade do poeta ou do sacerdote. Com os <strong>pré-socráticos</strong>, na Grécia do século VI a.C., surge uma atitude nova: o <strong>logos</strong>, a explicação pela razão, que busca causas naturais para os fenômenos naturais.</p>" +
      "<p>Três características marcam essa virada: (1) a <strong>physis</strong> (natureza) passa a ser vista como algo ordenado, não arbitrário; (2) a busca pelo <em>arché</em>, o princípio único de tudo - Tales dizia ser a água, Anaximandro, o ápeiron (indefinido), Heráclito, o fogo; (3) o uso do <strong>argumento</strong>, e não do relato sagrado, para convencer.</p>" +
      "<p>Dois caminhos se opõem: <strong>Heráclito</strong> («não entramos duas vezes no mesmo rio») defende que tudo flui, tudo muda; <strong>Parmênides</strong> sustenta que o ser é imutável e que as mudanças são ilusão dos sentidos. Guarde essa tensão: ela estrutura boa parte da filosofia posterior.</p>"
  },
  {
    id: "kb-fil-002",
    disciplina: "filosofia",
    tema: "Maiêutica e Sócrates",
    tipo: "conceito",
    gatilhos: ["maiutica", "socrates", "dialetica", "so sei que nada sei", "conhece te a ti mesmo", "ironia", "platao"],
    titulo: "Maiêutica: parir ideias pelo diálogo",
    conteudo:
      "<p>Sócrates (470-399 a.C.) não deixou nada escrito - o que sabemos vem de Platão, seu discípulo. Seu método tinha dois tempos: primeiro a <strong>ironia</strong>, em que ele fazia perguntas humildes até revelar que o interlocutor, que se dizia sábio, na verdade se contradizia; depois a <strong>maiêutica</strong>, o «parto de ideias» - por novas perguntas, a pessoa descobria sozinha a resposta, mostrando que o conhecimento já estava nela, apenas adormecido.</p>" +
      "<p>Daí o sentido do «só sei que nada sei»: reconhecer a própria ignorância é o <em>começo</em> da sabedoria. E do templo de Delfos, Sócrates tomou o «conhece-te a ti mesmo» - a filosofia como exame de si, não apenas estudo do mundo.</p>" +
      "<p>Consequência política: a exigência de justificar as próprias escolhas incomodava os poderosos. Acusado de corromper a juventude e de não reconhecer os deuses da cidade, foi condenado à morte e aceitou a sentença - coerência entre pensamento e vida. O ENEM cobra muito a diferença entre Sócrates (o método, a pergunta) e Platão (as ideias escritas, o mundo das Formas).</p>"
  },
  {
    id: "kb-fil-003",
    disciplina: "filosofia",
    tema: "Imperativo categórico de Kant",
    tipo: "explicacao",
    gatilhos: ["imperativo categorico", "kant", "dever", "moral", "autonomia", "dignidade", "universalizacao"],
    titulo: "Kant: o imperativo categórico",
    conteudo:
      "<p>Immanuel Kant (1724-1804) procura um fundamento <strong>racional</strong> para a moral, independente de religião, costume ou consequências. Sua fórmula central: <em>age apenas segundo aquela máxima que tu podes querer que se torne lei universal</em>. Em outras palavras, antes de agir, pergunte: e se todo mundo agisse assim? A mentira, por exemplo, se universalizada, destruiria a própria confiança que a torna eficaz - logo, é errada em si mesma.</p>" +
      "<p>A segunda formulação é igualmente cobrada: <em>age de tal maneira que trates a humanidade, tanto na tua pessoa como na de qualquer outro, sempre como fim e nunca apenas como meio</em>. Tratar alguém <strong>apenas como meio</strong> é usá-la como ferramenta - o que fere a <strong>dignidade</strong> humana.</p>" +
      "<p>Duas distinções essenciais: a ação pode ser <strong>conforme ao dever</strong> (resultado bom, motivo interesseiro - o comerciante honesto para manter os clientes) ou <strong>por dever</strong> (motivação correta, o que dá valor moral). E a diferença entre <strong>heteronomia</strong> (a regra vem de fora) e <strong>autonomia</strong> (a razão dá a lei a si mesma).</p>"
  },
  {
    id: "kb-fil-004",
    disciplina: "filosofia",
    tema: "Utilitarismo de Mill",
    tipo: "conceito",
    gatilhos: ["utilitarismo", "mill", "bentham", "felicidade", "consequencialismo", "prazer", "maior numero"],
    titulo: "Utilitarismo: a maior felicidade do maior número",
    conteudo:
      "<p>O utilitarismo, de Jeremy Bentham e John Stuart Mill, é uma ética <strong>consequencialista</strong>: uma ação é boa se produzir bons resultados. O princípio é o da <em>maior felicidade para o maior número de pessoas</em> - baseando-se na utilidade, não na intenção. Para Bentham, o valor de um prazer dependia só de quantidade (duração, intensidade); Mill acrescentou a <strong>qualidade</strong>: prazeres intelectuais e morais valem mais que prazeres puramente sensuais, mesmo que menos intensos.</p>" +
      "<p>Pontos fortes: é prático, aplica-se bem a políticas públicas (custeio de tratamentos, distribuição de recursos) e dialoga com o raciocínio de custo-benefício que aparece na economia e no direito. Crítica clássica: pode justificar o sacrifício de minorias em nome da maioria, e reduz tudo a prazer e dor, ignorando deveres e direitos.</p>" +
      "<p>Compare com Kant: para o kantiano, mentir é errado <em>sempre</em>, porque fere a lei universal; para o utilitarista, mentir pode ser aceitável se gerar mais bem do que mal. O ENEM gosta de apresentar um dilema concreto e perguntar qual critério cada teoria usaria.</p>"
  },
  {
    id: "kb-fil-005",
    disciplina: "filosofia",
    tema: "Contratualismo",
    tipo: "resumo",
    gatilhos: ["contratualismo", "hobbes", "locke", "rousseau", "estado de natureza", "contrato social", "soberania", "vontade geral"],
    titulo: "Contratualismo: o Estado como acordo",
    conteudo:
      "<p>Os contratualistas imaginam um <strong>estado de natureza</strong> - como as pessoas viveriam antes do Estado - para justificar por que aceitamos obedecer a regras. Os três clássicos divergem sobre como esse estado era e sobre o que o contrato social deve garantir.</p>" +
      "<p><strong>Hobbes</strong>: no estado de natureza, o homem é o lobo do homem; a vida é guerra de todos contra todos. A saída é um Estado absoluto, o Leviatã, que concentra o poder e garante segurança. <strong>Locke</strong>: o estado de natureza já tem direitos naturais (vida, liberdade, propriedade); o Estado nasce para protegê-los e, se falhar, o povo pode legitimamente substituí-lo - ideia de resistência e de governo limitado.</p>" +
      "<p><strong>Rousseau</strong>: o homem nasce bom e a sociedade o corrompe. O contrato cria a <strong>vontade geral</strong>, que não é a soma dos interesses particulares, mas o que é melhor para a comunidade como um todo. Quem obedece à vontade geral obedece a si mesmo - aí está a liberdade civil. Resumo de prova: Hobbes = segurança e ordem; Locke = liberdade e propriedade; Rousseau = igualdade e soberania popular.</p>"
  },
  /* ======================= BIOLOGIA ======================= */
  {
    id: "kb-bio-001",
    disciplina: "biologia",
    tema: "Fotossíntese",
    tipo: "explicacao",
    gatilhos: ["fotossintese", "cloroplasto", "clorofila", "glicose", "fase clara", "ciclo de calvin", "autotrofico"],
    titulo: "Fotossíntese: a fábrica de energia das plantas",
    conteudo:
      "<p>A fotossíntese é o processo em que seres <strong>autotróficos</strong> (plantas, algas, cianobactérias) usam luz, água e gás carbônico para produzir glicose e oxigênio. A equação geral: 6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂. Ela acontece nos <strong>cloroplastos</strong>, organelas que contêm <strong>clorofila</strong>, o pigmento que absorve a luz (principalmente nas faixas azul e vermelha, e por isso reflete verde).</p>" +
      "<p>O processo tem duas etapas. A <strong>fase clara</strong> (nos tilacoides) usa luz para quebrar a água (fotólise), liberar O₂ e gerar ATP e NADPH. O <strong>ciclo de Calvin</strong> (no estroma) não precisa de luz direta: usa o ATP e o NADPH para fixar o CO₂ em moléculas orgânicas.</p>" +
      "<p>Fatores limitantes: intensidade luminosa, concentração de CO₂, temperatura e disponibilidade de água. Ponto que o ENEM cobra muito: a planta é <em>produtora</em> e base da cadeia alimentar, e o oxigênio liberado vem da água, não do CO₂ - descoberta feita com isótopos radioativos por Ruben e Kamen.</p>"
  },
  {
    id: "kb-bio-002",
    disciplina: "biologia",
    tema: "Respiração celular",
    tipo: "explicacao",
    gatilhos: ["respiracao celular", "glicolise", "mitocondria", "atp", "ciclo de krebs", "fermentacao", "aerobio"],
    titulo: "Respiração celular: liberar a energia da glicose",
    conteudo:
      "<p>A respiração celular quebra a glicose e aproveita a energia para produzir <strong>ATP</strong>, a moeda energética da célula. Equação geral: C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + energia (ATP). Ocorre principalmente na <strong>mitocôndria</strong>, depois de uma primeira etapa no citoplasma.</p>" +
      "<p>As três etapas: <strong>glicólise</strong> (no citoplasma, a glicose vira duas moléculas de piruvato, com saldo de 2 ATP); <strong>ciclo de Krebs</strong> (na matriz mitocondrial, o piruvato é oxidado e libera CO₂, gerando NADH e FADH₂); <strong>cadeia respiratória</strong> (na membrana interna, os elétrons passam por complexos proteicos e produzem a maior parte do ATP - cerca de 30 a 32 moléculas por glicose).</p>" +
      "<p>Sem oxigênio, a célula recorre à <strong>fermentação</strong>: láctica (nos músculos e em bactérias do iogurte, produzindo ácido láctico) ou alcoólica (em leveduras, produzindo etanol e CO₂). Atenção à confusão mais comum da prova: <em>respiração</em> (todas as células fazem) não é o mesmo que <em>respiração pulmonar</em> (troca de gases nos pulmões).</p>"
  },
  {
    id: "kb-bio-003",
    disciplina: "biologia",
    tema: "Leis de Mendel e daltonismo",
    tipo: "metodo",
    gatilhos: ["leis de mendel", "mendel", "genetica", "heredograma", "primeira lei", "segunda lei", "daltonismo", "heranca ligada ao x"],
    titulo: "Genética: as leis de Mendel e a herança ligada ao X",
    conteudo:
      "<p>A <strong>1ª lei de Mendel</strong> (lei da segregação dos fatores) diz que cada característica é determinada por um par de fatores que se separa na formação dos gametas - cada gameta leva apenas um. Cruzando dois heterozigotos (Aa × Aa), a proporção fenotípica é <strong>3:1</strong> (3 dominantes para 1 recessivo).</p>" +
      "<p>A <strong>2ª lei</strong> (segregação independente) vale para duas ou mais características em cromossomos diferentes: AaBb × AaBb resulta em <strong>9:3:3:1</strong>. Em questoes de duas características, monte o quadrado de Punnett ou use a regra de multiplicar as proporções isoladas.</p>" +
      "<p>Herança ligada ao <strong>cromossomo X</strong>: mulheres são XX e homens XY. Características recessivas no X (como o <strong>daltonismo</strong> e a hemofilia) aparecem muito mais em homens, porque eles têm um único X e não têm outro alelo para compensar. Um homem daltônico (XᵈY) com uma mulher normal homozigota (XᴰXᴰ) terá filhos normais, mas as filhas serão portadoras (XᴰXᵈ).</p>"
  },
  {
    id: "kb-bio-004",
    disciplina: "biologia",
    tema: "Cadeia alimentar, fluxo de energia e sucessão ecológica",
    tipo: "conceito",
    gatilhos: ["cadeia alimentar", "teia alimentar", "nivel trofico", "produtores", "consumidores", "decompositores", "piramide de energia", "sucessao ecologica"],
    titulo: "Ecologia: energia, níveis tróficos e sucessão",
    conteudo:
      "<p>A <strong>cadeia alimentar</strong> é a sequência de quem come quem: <strong>produtores</strong> (autotrófos, que fazem fotossíntese) → <strong>consumidores primários</strong> (herbívoros) → <strong>consumidores secundários</strong> (carnívoros) → <strong>decompositores</strong> (fungos e bactérias, que devolvem nutrientes ao solo). Na natureza, várias cadeias se cruzam formando uma <strong>teia alimentar</strong>.</p>" +
      "<p>O <strong>fluxo de energia é unidirecional e decrescente</strong>: a cada nível trófico, só cerca de 10% da energia passa adiante; o resto é perdido como calor (respiração) e fezes. Por isso as pirâmades alimentares têm poucos níveis - não existem muitos carnívoros de topo. Já a <strong>matéria</strong> é cíclica: os decompositores reciclam os nutrientes.</p>" +
      "<p>A <strong>sucessão ecológica</strong> é a troca gradual de espécies num ambiente. Na <strong>primária</strong>, a vida chega a um lugar sem solo (rocha nua, lava vulcânica): primeiro líquens, depois musgos, herbáceas, arbustos e, ao fim, o <em>clímax</em>. Na <strong>secundária</strong> (após um desmatamento ou incêndio, com solo preservado), a recuperação é mais rápida porque já existe banco de sementes e matéria orgânica.</p>"
  },
  {
    id: "kb-bio-005",
    disciplina: "biologia",
    tema: "Vacinas e imunidade",
    tipo: "explicacao",
    gatilhos: ["vacina", "imunidade", "anticorpos", "imunologico", "soro", "linfocito", "imunizacao", "memoria imunologica"],
    titulo: "Vacinas e imunidade: proteger antes de adoecer",
    conteudo:
      "<p>A <strong>imunidade</strong> é a capacidade de defender o corpo de agentes infecciosos. Ela tem duas frentes: a <strong>inata</strong> (barreiras como pele e mucosa, e células de resposta rápida, mas inespecífica) e a <strong>adquirida</strong> (linfócitos B, que produzem <strong>anticorpos</strong>, e linfócitos T, que matam células infectadas - específica e com memória).</p>" +
      "<p>A <strong>vacina</strong> funciona por <strong>imunização ativa</strong>: introduz antígenos (micro-organismos mortos, atenuados ou só fragmentos) para que o corpo produza anticorpos e crie <strong>memória imunológica</strong>. Se o agente real aparecer depois, a resposta é rápida. O <strong>soro</strong> é diferente: traz anticorpos prontos, agindo já, mas sem memória (imunização passiva).</p>" +
      "<p>Conceito importante: a <strong>imunidade de rebanho</strong> - quando uma parcela alta da população está imunizada, a doença circula menos e protege também quem não pode se vacinar (recém-nascidos, imunodeprimidos). Movimentos antivacina ameaçam esse coletivo. No ENEM, aparecem charges e gráficos de cobertura vacinal: lembre-se de que vacinar é ato de saúde individual <em>e</em> coletivo.</p>"
  },
  {
    id: "kb-bio-006",
    disciplina: "biologia",
    tema: "Evolução",
    tipo: "explicacao",
    gatilhos: ["evolucao", "darwin", "selecao natural", "lamarck", "adaptacao", "especiacao", "neodarwinismo", "ancestral comum"],
    titulo: "Evolução: Darwin, Lamarck e as evidências",
    conteudo:
      "<p><strong>Lamarck</strong> defendia a herança dos caracteres adquiridos: o uso desenvolve o órgão e essa melhora passa aos filhos (a girafa esticou o pescoço e nasceu com pescoço longo). Hoje sabemos que alterações no corpo do indivíduo não modificam seus genes - por isso o lamarckismo está superado.</p>" +
      "<p><strong>Darwin</strong> propôs a <strong>seleção natural</strong>: nas populações há variação herdável; os indivíduos com características vantajosas naquele ambiente sobrevivem e se reproduzem mais, aumentando a frequência desses genes ao longo das gerações. O ambiente não «cria» a adaptação, ele <em>seleciona</em> entre as variações que já existem.</p>" +
      "<p>O <strong>neodarwinismo</strong> (síntese moderna) junta Darwin à genética: mutações e recombinação geram variação; seleção natural, deriva genética e fluxo gênico alteram as frequências. Com o tempo, o isolamento reprodutivo pode gerar <strong>espécies</strong> novas. Evidências: fósseis, anatomia comparada (órgãos homólogos, mesma origem embriológica), embriologia, biologia molecular (DNA) e observação direta, como em bactérias resistentes.</p>"
  },
  /* ======================= FISICA ======================= */
  {
    id: "kb-fis-001",
    disciplina: "fisica",
    tema: "Leis de Newton",
    tipo: "explicacao",
    gatilhos: ["leis de newton", "newton", "forca", "acao e reacao", "dinamica", "fr = m.a", "resultante"],
    titulo: "As três leis de Newton",
    conteudo:
      "<p><strong>1ª lei (inércia)</strong>: um corpo em repouso permanece em repouso, e um em movimento retilíneo uniforme permanece assim, a menos que uma força resultante não nula atue sobre ele. Em outras palavras: sem força resultante, não há mudança de velocidade.</p>" +
      "<p><strong>2ª lei (princípio fundamental)</strong>: F<sub>R</sub> = m · a. A força resultante aponta na mesma direção e sentido da aceleração. Quanto maior a massa, menor a aceleração para a mesma força. É a lei que resolve a maioria das questões de dinâmica.</p>" +
      "<p><strong>3ª lei (ação e reação)</strong>: se um corpo A aplica uma força sobre B, então B aplica sobre A uma força de mesmo módulo, mesma direção e <strong>sentido oposto</strong>. Atenção: as forças de ação e reação atuam em <em>corpos diferentes</em> e por isso nunca se anulam. A clássica confusão: você empurra a parede e ela te empurra, mas quem te desloca é o atrito com o chão.</p>"
  },
  {
    id: "kb-fis-002",
    disciplina: "fisica",
    tema: "Inércia no dia a dia",
    tipo: "dica",
    gatilhos: ["inercia", "cinto de seguranca", "onibus freando", "curva", "empurra o banco", "movimento relativo"],
    titulo: "Inércia: por que o corpo «é jogado»",
    conteudo:
      "<p>Nada é jogado para frente ou para trás: o que acontece é que o veículo muda de velocidade, e o seu corpo tende a <strong>manter</strong> a velocidade que já tinha. Quando o ônibus freia, seus pés param com ele, mas o tronco continua indo - daí a sensação de ser projetado para frente.</p>" +
      "<p>Exemplos clássicos de prova: o cinto de segurança (evita que você continue em movimento retilíneo quando o carro para); a curva em alta velocidade (o carro tende a seguir reto e sai pela tangente); o coletivo que arranca e você cai para trás; o avental empoeirado (a poeira fica par enquanto o pano se move).</p>" +
      "<p>Regra de bolso: antes de calcular, pergunte <em>quem está mudando de velocidade e quem está tendendo a manter</em>. Se a questão misturar referencial, lembre-se de que inércia é um fenômeno independente da velocidade - um carro a 100 km/h constante também está em equilíbrio dinâmico.</p>"
  },
  {
    id: "kb-fis-003",
    disciplina: "fisica",
    tema: "Trabalho, energia e potência",
    tipo: "explicacao",
    gatilhos: ["trabalho", "energia", "potencia", "energia cinetica", "energia potencial", "joule", "watt", "conservacao de energia"],
    titulo: "Trabalho, energia e potência: contas que se encaixam",
    conteudo:
      "<p><strong>Trabalho</strong> é a energia transferida por uma força que desloca o corpo: W = F · d · cos θ. Se a força for perpendicular ao deslocamento (θ = 90°), o trabalho é <strong>zero</strong> - é o caso da força peso num deslocamento horizontal e da força centrípeta numa curva. A unidade é o <strong>joule (J)</strong>.</p>" +
      "<p>Energia <strong>cinética</strong> (movimento): E<sub>c</sub> = m·v²/2 - depende da velocidade ao quadrado, então dobrar a velocidade multiplica a energia por 4. Energia <strong>potencial gravitacional</strong>: E<sub>p</sub> = m·g·h. Sem atrito, a energia mecânica (cinética + potencial) se conserva - é o que permite resolver quedas e rampas comparando dois pontos.</p>" +
      "<p><strong>Potência</strong> é a rapidez com que o trabalho é realizado: P = W/Δt, medida em <strong>watt (W)</strong>. Um watt é um joule por segundo. Nas questões de consumo, cuidado: 1 kWh (o que aparece na conta de luz) equivale a 3,6 milhões de joules.</p>"
  },
  {
    id: "kb-fis-004",
    disciplina: "fisica",
    tema: "Propagação de calor",
    tipo: "conceito",
    gatilhos: ["propagacao de calor", "conducao", "conveccao", "irradiacao", "irradiacao termica", "calorimetro", "isolante termico", "condutividade"],
    titulo: "Como o calor se propaga",
    conteudo:
      "<p>O calor vai do corpo mais quente para o mais frio, por três mecanismos. <strong>Condução</strong>: a energia passa de partícula a partícula, sem transporte de matéria - predomina nos sólidos. Metais são bons condutores; madeira, isopor e ar são isolantes. <strong>Convecção</strong>: o próprio fluido se desloca - acontece em líquidos e gases, e explica o vento e o aquecimento de uma panela.</p>" +
      "<p><strong>Irradiação</strong> (ou radiação): propagação por ondas eletromagnéticas, que <em>não</em> precisam de meio material - é assim que o calor do Sol chega à Terra. Por isso a garrafa termica tem parede espelhada: ela reflete essa radiação.</p>" +
      "<p>Calor sensível: Q = m · c · ΔT (muda a temperatura). Calor latente: Q = m · L (muda de estado, com temperatura constante). Não confunda <strong>calor</strong> (energia em trânsito) com <strong>temperatura</strong> (medida do grau de agitação molecular) - um lago enorme a 20 °C tem muito mais energia térmica que uma xícara a 90 °C.</p>"
  },
  {
    id: "kb-fis-005",
    disciplina: "fisica",
    tema: "Ondas (v = f · λ)",
    tipo: "explicacao",
    gatilhos: ["ondas", "frequencia", "comprimento de onda", "amplitude", "velocidade de propagacao", "onda mecanica", "som"],
    titulo: "Ondas: o que cada grandeza significa",
    conteudo:
      "<p>Uma onda transmite <strong>energia</strong> sem transportar matéria. Os elementos são: <strong>amplitude</strong> (altura da perturbação - está ligada à energia e à intensidade sonora), <strong>comprimento de onda λ</strong> (distância entre duas cristas), <strong>frequência f</strong> (ciclos por segundo, em hertz) e <strong>velocidade de propagação v</strong>.</p>" +
      "<p>A relação fundamental é <strong>v = λ · f</strong>. Se a velocidade é constante (meio fixo), frequência e comprimento de onda são inversamente proporcionais: quanto mais agudo o som (maior frequência), menor o comprimento de onda. Cuidado: a frequência de uma onda <strong>não</strong> muda ao passar de um meio para outro - quem muda é a velocidade e, portanto, o comprimento de onda.</p>" +
      "<p>Som é onda <strong>mecânica</strong> e longitudinal (as partículas vibram na direção da propagação), por isso não se propaga vácuo. Luz é onda eletromagnética (transversal), que atravessa o vácuo - e é por isso que a velocidade da luz, 3·10⁸ m/s, é uma constante universal.</p>"
  },
  {
    id: "kb-fis-006",
    disciplina: "fisica",
    tema: "Reflexão e refração",
    tipo: "explicacao",
    gatilhos: ["reflexao", "reflexao da luz", "refracao", "espelho", "prisma", "indice de refracao", "arco iris", "miragem"],
    titulo: "Reflexão e refração: quando a luz muda de direção",
    conteudo:
      "<p>Na <strong>reflexão</strong>, a luz volta para o mesmo meio. As leis: o raio incidente, o refletido e a normal estão no mesmo plano, e o ângulo de incidência é igual ao de reflexão. Num <strong>espelho plano</strong>, a imagem é virtual, do mesmo tamanho e com inversão esquerda-direita - é por isso que a palavra AMBULÂNCIA aparece invertida nos para-choque: lida no retrovisor, fica correta.</p>" +
      "<p>Na <strong>refração</strong>, a luz passa de um meio para outro e muda de velocidade, mudando de direção. O <strong>índice de refração n</strong> mede essa redução: n = c/v. Um meio mais refringente (maior n) deixa a luz mais lenta. A lei de Snell-Descartes: n₁ · sen θ₁ = n₂ · sen θ₂.</p>" +
      "<p>Fenômenos que a prova cobra: o <strong>arco-íris</strong> (a luz branca se decompõe ao entrar e sair da gota, porque cada cor tem índice diferente - dispersão); a <strong>miragem</strong> no asfalto quente (camadas de ar de temperaturas diferentes desviam a luz); o lápis «quebrado» dentro da água; e a <strong>fibra ótica</strong>, que usa a reflexão total para guiar a luz.</p>"
  },
  {
    id: "kb-fis-007",
    disciplina: "fisica",
    tema: "Lei de Ohm e circuitos",
    tipo: "metodo",
    gatilhos: ["lei de ohm", "ohm", "resistencia", "corrente eletrica", "voltagem", "tensao", "circuito", "potencia eletrica"],
    titulo: "Lei de Ohm: tensão, corrente e resistência",
    conteudo:
      "<p>A <strong>1ª lei de Ohm</strong>: V = R · i. A <strong>tensão (V)</strong> é a «pressão» que empurra os elétrons, a <strong>corrente (i)</strong> é a quantidade de carga que passa por segundo, e a <strong>resistência (R)</strong> é a oposição à passagem. Duas consequências práticas: dobrar a resistência cai a corrente pela metade; e dobrar a tensão dobra a corrente.</p>" +
      "<p>Em <strong>série</strong>: a corrente é a mesma em todos os componentes, a tensão se divide e as resistências se somam (R<sub>eq</sub> = R₁ + R₂). Se uma lâmpada queima, as outras apagam. Em <strong>paralelo</strong>: a tensão é a mesma em todos, as correntes se somam e a resistência equivalente é <em>menor</em> que a menor delas. É por isso que instalações domésticas são em paralelo.</p>" +
      "<p>Duas fórmulas de potência muito úteis: <strong>P = V · i</strong> e, juntando com V = R·i, <strong>P = R · i²</strong> (aquecimento por efeito Joule) e <strong>P = V²/R</strong>. Guarde que 1 kWh = 1 kW × 1 h. Atenção: um resistor que esquenta mais é o que dissipa maior potência, e em série isso é o de <em>maior</em> resistência, não o maior.</p>"
  },
  {
    id: "kb-fis-008",
    disciplina: "fisica",
    tema: "Empuxo",
    tipo: "explicacao",
    gatilhos: ["empuxo", "arquimedes", "flutua", "afunda", "densidade", "peso aparente", "barco", "balanca hidrostatica"],
    titulo: "Empuxo: por que uns afundam e outros flutuam",
    conteudo:
      "<p>O <strong>princípio de Arquimedes</strong>: todo corpo imerso num fluido recebe uma força vertical para cima, o <strong>empuxo</strong>, igual ao peso do fluido deslocado. Fórmula: E = ρ<sub>fluido</sub> · V<sub>deslocado</sub> · g.</p>" +
      "<p>Compare dois pesos: se o empuxo for <strong>maior</strong> que o peso do corpo, ele sobe e flutua; se for <strong>igual</strong>, fica em equilíbrio (totalmente submerso, parado); se for <strong>menor</strong>, afunda. Ou seja: flutua quem é <em>menos denso que o líquido</em> - o aço do navio afundaria sozinho, mas o formato em casco desloca muito mais água.</p>" +
      "<p>Resultado prático: quando você entra numa piscina, o peso <em>aparente</em> diminui - a balança marca menos. E um mesmo corpo flutua mais alto em água salgada, porque a densidade do líquido é maior (Mar Morto, navio que sai do rio e entra no mar). Atenção na hora de calcular: use a densidade do <em>fluido</em>, e não do corpo.</p>"
  },
  /* ======================= QUIMICA ======================= */
  {
    id: "kb-qui-001",
    disciplina: "quimica",
    tema: "Ligações químicas",
    tipo: "explicacao",
    gatilhos: ["ligacoes quimicas", "ligacao ionica", "ligacao covalente", "ligacao metalica", "eletronegatividade", "regra do octeto", "polaridade"],
    titulo: "Ligações químicas: por que os átomos se juntam",
    conteudo:
      "<p>Átomos se ligam para ficar mais estáveis, geralmente buscando 8 elétrons na última camada (a <strong>regra do octeto</strong>, com exceções como o hidrogênio, que busca 2). O tipo de ligação depende da <strong>eletronegatividade</strong> - a capacidade de atrair elétrons.</p>" +
      "<p><strong>Iônica</strong>: entre metal e não metal, com grande diferença de eletronegatividade (acima de 1,7). Há transferência de elétrons: o metal vira cátion e o não metal, ânion. Esses compostos são sólidos, duros, quebradiços, com pontos de fusão altos, e <strong>conduzem corrente quando fundidos ou em solução</strong> - não no estado sólido.</p>" +
      "<p><strong>Covalente</strong>: entre ametais, com compartilhamento de pares de elétrons. Pode ser <strong>apolar</strong> (mesma eletronegatividade, como O₂ e N₂) ou <strong>polar</strong> (diferença de eletronegatividade, como a água). Regra de solubilidade que resolve muitas questões: <em>semelhante dissolve semelhante</em> - compostos polares se dissolvem em solventes polares. Já a <strong>ligação metálica</strong> tem elétrons livres, o que explica a condutividade e a maleabilidade dos metais.</p>"
  },
  {
    id: "kb-qui-002",
    disciplina: "quimica",
    tema: "Soluções",
    tipo: "explicacao",
    gatilhos: ["solucoes", "concentracao", "molaridade", "titulo", "diluicao", "solvente", "soluto", "saturada"],
    titulo: "Soluções: concentração e diluição",
    conteudo:
      "<p>Solução é a mistura <strong>homogênea</strong> de um <em>soluto</em> (o que se dissolve) num <em>solvente</em> (o que dissolve). A <strong>concentração comum</strong> é C = m₁/V (g/L). A <strong>molaridade</strong> (ou concentração molar) é M = n₁/V, em mol/L, onde n é o número de mols (n = massa/massa molar).</p>" +
      "<p>Na <strong>diluição</strong>, acrescenta-se solvente: a quantidade de soluto não muda, então vale <strong>M₁ · V₁ = M₂ · V₂</strong>. Essa é a fórmula mais usada do tema. Já na <strong>mistura</strong> de soluções do mesmo soluto, a concentração final é a média ponderada pelos volumes.</p>" +
      "<p>Classificações úteis: quanto à saturação (<em>insaturada</em>, <em>saturada</em>, <em>supersaturada</em>) e quanto à proporção (concentrada x diluída - cuidado, «diluída» não é «saturada»). E a <strong>solubilidade</strong> depende da temperatura: na maioria dos sólidos, aumenta com o calor; nos gases, <em>diminui</em> - o refrigerante perde gás quando esquenta.</p>"
  },
  {
    id: "kb-qui-003",
    disciplina: "quimica",
    tema: "Estequiometria e balanceamento",
    tipo: "metodo",
    gatilhos: ["estequiometria", "balanceamento", "lei de lavoisier", "coeficientes", "mol", "massa molar", "regra de tres", "reagente limitante"],
    titulo: "Balanceamento e estequiometria: o passo a passo",
    conteudo:
      "<p>A <strong>lei de Lavoisier</strong> (conservação da massa) diz que nada se cria nem se destrói numa reação química: o número de átomos de cada elemento é igual nos dois lados. Balancear é apenas ajustar os <strong>coeficientes</strong> (nunca os índices dentro das fórmulas) até igualar essas contagens.</p>" +
      "<p>Os <strong>coeficientes</strong> são as proporções em <strong>mols</strong>: em 2H₂ + O₂ → 2H₂O, 2 mols de hidrogênio reagem com 1 mol de oxigênio e formam 2 mols de água. O caminho para qualquer problema de estequiometria: (1) balanceie; (2) converta a massa dada em mols (n = m/M); (3) use a proporção da equação; (4) converta de volta para a grandeza pedida.</p>" +
      "<p>Quando dois reagentes são dados com quantidades, um deles é o <strong>limitante</strong> - é ele que determina a quantidade de produto. Calcule os mols de produto possíveis com cada reagente e use o <em>menor</em> valor. E atente ao <strong>excesso</strong>: sobra do outro reagente.</p>"
  },
  {
    id: "kb-qui-004",
    disciplina: "quimica",
    tema: "Reações endotérmica e exotérmica e chuva ácida",
    tipo: "conceito",
    gatilhos: ["endotermica", "exotermica", "entalpia", "chuva acida", "ph", "oxidos", "combustao", "grafico de energia"],
    titulo: "Endo e exotermia, e o problema da chuva ácida",
    conteudo:
      "<p>Toda reação envolve troca de energia com o ambiente. Numa reação <strong>exotérmica</strong>, o sistema <em>libera</em> calor: os produtos têm menos energia que os reagentes, o ΔH é negativo e a temperatura do meio sobe (combustão, explosão, neutralização ácido-base, chama). Numa reação <strong>endotérmica</strong>, o sistema <em>absorve</em> calor, o ΔH é positivo e a temperatura do meio cai (decomposição por calor, fotossíntese, o «sorvete que esfria»).</p>" +
      "<p>Nos gráficos de energia, repare na posição dos reagentes e produtos: na exotermia, os produtos ficam mais baixo; na endotermia, mais alto. Questões clássicas: bolsa de gelo instantâneo (endotérmica), água e cal (exotérmica, chega a ferver), queima da vela (exotérmica).</p>" +
      "<p>A <strong>chuva ácida</strong> (pH menor que 5,6) ocorre quando óxidos de enxofre (SO₂, SO₃) e de nitrogênio (NO, NO₂), liberados na queima de combustíveis, reagem com a água da atmosfera formando ácido sulfúrico e nítrico. Consequências: acidificação de lagos e solo, corrosão de monumentos e danos à saúde. A solução envolve controle de emissões, combustíveis mais limpos e energia renovável.</p>"
  },
  {
    id: "kb-qui-005",
    disciplina: "quimica",
    tema: "Isomeria e funções orgânicas",
    tipo: "resumo",
    gatilhos: ["isomeria", "isomeros", "funcoes organicas", "hidrocarboneto", "alcool", "aldeido", "cetona", "ester"],
    titulo: "Isomeria e funções orgânicas: os mapas da química do carbono",
    conteudo:
      "<p><strong>Isômeros</strong> são compostos com a mesma fórmula molecular e estruturas diferentes. Tipos principais: <strong>isomeria plana de cadeia</strong> (diferentes esqueletos de carbono), <strong>de posição</strong> (mesmo grupo em carbono diferente), <strong>de função</strong> (funções diferentes, como álcool e éter) e <strong>de compensação</strong> (metades que se compensam). A <strong>estereoisomeria</strong> inclui os <em>geométricos</em> (cis-trans, que exigem dupla ligação e grupos diferentes) e os <em>ópticos</em> (molécula quiral, que desvia a luz polarizada).</p>" +
      "<p>Funções que mais caem: <strong>hidrocarbonetos</strong> (só C e H - alcanos, alcenos, alcinos, aromáticos); <strong>álcoois</strong> (grupo OH ligado a carbono saturado - etanol, metanol); <strong>aldeídos</strong> (carbonila na ponta); <strong>cetonas</strong> (carbonila no meio - acetona); <strong>ácidos carboxílicos</strong> (COOH - acético, cítrico); <strong>ésteres</strong> (cheiro de frutas, óleos e gorduras); <strong>aminas</strong> e <strong>amidas</strong> (proteínas, medicamentos).</p>" +
      "<p>Dica de reconhecimento rápido: procure primeiro o <strong>oxigênio</strong>. Sem oxigênio → hidrocarboneto. Um oxigênio em OH → álcool; em carbonila na ponta → aldeído; no meio → cetona; em COOH → ácido. E lembre-se: propriedades físicas como ponto de ebulição dependem de forças intermoleculares - álcoois têm ligações de hidrogênio e fervem mais que hidrocarbonetos de massa parecida.</p>"
  },
  /* ======================= APOIO AO ESTUDANTE ======================= */
  {
    id: "kb-est-001",
    disciplina: "geral",
    tema: "Como estudar para o ENEM",
    tipo: "dica",
    gatilhos: ["como estudar", "metodo de estudo", "rotina de estudos", "estudar sozinho", "por onde comecar", "aprender"],
    titulo: "Como estudar para o ENEM de verdade",
    conteudo:
      "<p>Estudar para o ENEM não é ler tudo de novo: é <strong>praticar ativamente</strong>. A cada bloco de teoria, faça exercícios e, ao errar, volte ao conteúdo exato do erro. Erro anotado e revisado vale mais que dez acertos por sorte.</p>" +
      "<p>Um ciclo simples e eficaz: (1) estude um tema curto (30-40 min); (2) resolva 5 a 8 questões sobre ele; (3) marque o que errou e escreva <em>por que</em> errou (conteúdo, leitura ou cálculo); (4) reescreva a resolução correta com suas palavras; (5) revise no dia seguinte e de novo em uma semana. Essa repetição espaçada é o que fixa.</p>" +
      "<p>Não estude no dia da prova o que você nunca viu. Nas últimas semanas, priorize <strong>revisão</strong> e <strong>simulados</strong>, mantendo uma matéria de conforto para não perder a segurança. E lembre-se: consistência de 1h por dia ganha de 8h em um único domingo.</p>"
  },
  {
    id: "kb-est-002",
    disciplina: "geral",
    tema: "Gestão do tempo na prova",
    tipo: "dica",
    gatilhos: ["gestao do tempo", "tempo de prova", "cronometro", "nao deu tempo", "pressa", "admin", "ritmo"],
    titulo: "Gestão do tempo na prova",
    conteudo:
      "<p>O ENEM tem 180 questões em dois domingos (45 no 1º dia e 90 no 2º, mais redação), com tempos diferentes. A regra de ouro é o <strong>tempo médio por questão</strong>: no 2º dia, por exemplo, 5h30 para 90 questões e redação dá cerca de 3 minutos por questão - mas nenhuma deve consumir 10.</p>" +
      "<p>Estratégia que funciona: faça a prova em <strong>três passadas</strong>. Na primeira, responda o que você domina e <strong>marque</strong> (na folha de rascunho) o que ficou difícil. Na segunda, volte só às marcadas, com calma. Na terceira, revise as que você errou sem saber e as que ficou na dúvida. Nunca gaste tempo precioso numa questão que você sabe que não sabe.</p>" +
      "<p>Cuidado com a transferência de respostas: preencha o cartão-resposta sempre em blocos (a cada 10 questões), nunca deixe tudo para o fim - o risco de erro em cascata é enorme. E se travar numa questão, respire, siga em frente e volte: o cérebro continua processando em segundo plano.</p>"
  },
  {
    id: "kb-est-003",
    disciplina: "geral",
    tema: "Ansiedade na prova",
    tipo: "dica",
    gatilhos: ["ansiedade", "nervoso", "panico", "medo da prova", "travei", "branco", "suar", "coracao acelerado"],
    titulo: "Ansiedade na prova: o que fazer quando o corpo acelera",
    conteudo:
      "<p>Ansiedade em <strong>pouca</strong> quantidade é boa: ela te mantém alerta. O problema é quando passa do ponto e ocupa a memória de trabalho, aquele espaço mental que você usa para raciocinar. A boa notícia: dá para treinar o corpo a se acalmar.</p>" +
      "<p>Um protocolo rápido, para fazer antes e durante a prova: inspire pelo nariz contando até <strong>4</strong>, segure o ar por <strong>4</strong>, expire pela boca por <strong>6</strong>. Repita 4 a 6 vezes. A expiração longa ativa o sistema de calma do organismo. Funciona em cerca de 30 segundos e não chama a atenção de ninguém.</p>" +
      "<p>Fora da prova: sono regular (7-8h), atividade física, cafeína com moderação e a regra de <strong>não repassar</strong> a prova mentalmente depois - isso aumenta a ansiedade sem mudar o resultado. Se a ansiedade atrapalhar sua vida de forma persistente, procure a psicóloga ou o psicólogo da escola: isso é cuidado com a saúde, não fraqueza.</p>"
  },
  {
    id: "kb-est-004",
    disciplina: "geral",
    tema: "Organização de um cronograma de estudos",
    tipo: "metodo",
    gatilhos: ["cronograma", "planejamento", "agenda", "organizar estudos", "semana de estudos", "horarios"],
    titulo: "Como montar um cronograma que você vai cumprir",
    conteudo:
      "<p>Um cronograma realista leva em conta três coisas: suas <strong>aulas</strong>, suas <strong>outras obrigações</strong> (trabalho, casa, família) e suas <strong>matérias difíceis</strong>. Some as horas disponíveis reais - costumam ser menos do que a gente imagina - e distribua sem lotar.</p>" +
      "<p>Montagem em 4 passos: (1) liste as matérias e marque de 1 a 3 o quanto você domina; (2) dê mais tempo às de nota 3, mas nunca abandone as de nota 1; (3) coloque no cronograma blocos de 50 minutos com 10 de pausa, alternando uma matéria «difícil» com uma «leve»; (4) reserve um dia da semana para <strong>revisão</strong> e um para <strong>simulado</strong>.</p>" +
      "<p>Duas regras práticas: <strong>flexibilidade</strong> (se um dia falhar, remaneje, não desista do plano) e <strong>recompensa</strong> (depois de 3 semanas cumpridas, dê a si um descanso merecido). Escreva o cronograma num lugar visível - o que não se vê, não se faz.</p>"
  },
  {
    id: "kb-est-005",
    disciplina: "geral",
    tema: "Saúde mental do estudante",
    tipo: "dica",
    gatilhos: ["saude mental", "estresse", "burnout", "cansado", "sobrecarga", "equilibrio", "procrastinacao", "autocuidado"],
    titulo: "Saúde mental: estudar também é se cuidar",
    conteudo:
      "<p>Estudar muito sem descanso tem um nome: <strong>sobrecarga</strong>. Ela aparece como cansaço que o sono não resolve, irritabilidade, dificuldade de concentração e vontade de abandonar tudo. Nesse estado, o rendimento cai - e a pessoa conclui, erradamente, que «não é capaz».</p>" +
      "<p>O que ajuda de verdade, e é simples: <strong>sono</strong> (7 a 8 horas, sem tela uma hora antes), <strong>alimentação</strong> regular, <strong>movimento</strong> (20-30 min de caminhada já mudam o humor), <strong>convivência</strong> (falar com alguém de confiança) e <strong>pausas de verdade</strong>, sem celular. Estar sempre disponível não é descanso nenhum.</p>" +
      "<p>Se você sente tristeza persistente, perda de interesse por tudo, alterações fortes de sono ou apetite, ou pensamentos de se machucar, procure ajuda profissional agora - na escola, na UBS ou pelo CVV (188, ligação gratuita, 24h). Cuidar da cabeça não é luxo: é o que permite você continuar estudando.</p>"
  },
  /* ======================= GERAL ======================= */
  {
    id: "kb-ger-001",
    disciplina: "geral",
    tema: "Como funciona este curso",
    tipo: "explicacao",
    gatilhos: ["como funciona o curso", "curso", "aulas", "material", "por onde comecar", "atividades", "simulado"],
    titulo: "Como funciona este curso",
    conteudo:
      "<p>Este curso organiza o conteúdo do ENEM em <strong>disciplinas</strong>, com <strong>aulas</strong>, <strong>textos de apoio</strong>, <strong>atividades</strong> (duas questões no estilo ENEM por trimestre) e <strong>simulados</strong>. Cada atividade traz habilidades da BNCC e um comentário explicativo em cada questão, para você entender o raciocínio e não apenas conferir o gabarito.</p>" +
      "<p>O caminho sugerido é: assista à aula do tema, leia o texto relacionado, resolva a atividade e só depois confira o comentário das questões. Se errar, releia o comentário e refaça a questão - errar faz parte, desistir não.</p>" +
      "<p>Eu, seu professor virtual, estou aqui o tempo todo: posso explicar um conceito, dar uma dica de resolução, montar um roteiro de estudo para uma disciplina ou simplesmente conversar quando você estiver travado. É só perguntar.</p>"
  },
  {
    id: "kb-ger-002",
    disciplina: "geral",
    tema: "Matriz de referência do ENEM",
    tipo: "explicacao",
    gatilhos: ["matriz de referencia", "matriz", "enem", "o que cai", "edital", "objetos de conhecimento"],
    titulo: "O que é a matriz de referência do ENEM",
    conteudo:
      "<p>A <strong>matriz de referência</strong> é o documento que organiza o que o ENEM avalia. Ela descreve <strong>competências</strong> (o que se espera que você saiba fazer) e <strong>habilidades</strong> (o conteúdo concreto de cada área), servindo de mapa para as questões da prova.</p>" +
      "<p>Ela é útil como bússola de estudo: ao ver que a matriz de Matemática fala em «grandezas diretamente e inversamente proporcionais», você sabe que razão, proporção e escala são prioridade. Vale lembrar que a matriz não é um programa fechado: o ENEM parte dela, mas sempre acrescenta <strong>temas contemporâneos</strong> - sustentabilidade, tecnologia, direitos humanos, questões indígenas e racismo.</p>" +
      "<p>Na prática: use a matriz para <strong>diagnosticar</strong> o que você já domina e o que falta, e não para decorar lista. Uma boa estratégia é resolver uma prova antiga, marcar por tema os erros e verificar quais habilidades aparecem com mais frequência nos seus erros.</p>"
  },
  {
    id: "kb-ger-003",
    disciplina: "geral",
    tema: "Competências e habilidades da BNCC",
    tipo: "conceito",
    gatilhos: ["bncc", "competencias", "habilidades", "em13mat", "codigo", "base nacional comum", "curriculo"],
    titulo: "Competências e habilidades: o que a BNCC organiza",
    conteudo:
      "<p>A <strong>BNCC</strong> (Base Nacional Comum Curricular) define o que deve ser aprendido em cada etapa da escolaridade. Ela se organiza em <strong>competências</strong> - capacidades amplas, como «analisar informações» ou «argumentar com base em dados» - e em <strong>habilidades</strong>, que descrevem conhecimentos e práticas específicas.</p>" +
      "<p>No Ensino Médio, os códigos têm o formato <strong>EM13MAT102</strong>: «EM13» indica o Ensino Médio, «MAT» é a área (MAT para Matemática, LGG para Linguagens, CHS para Ciências Humanas, CNT para Ciências da Natureza) e o número identifica a habilidade. Ver esse código numa questão indica qual objeto de conhecimento ela está avaliando.</p>" +
      "<p>As dez <strong>competências gerais</strong> da BNCC incluem valorizar o conhecimento, exercitar a curiosidade, usar linguagens diversas, argumentar com base em fatos, compreender processos socioculturais e agir com ética e responsabilidade. Repare: essas competências são praticamente a descrição do que a redação e a interpretação do ENEM cobram.</p>"
  },
  {
    id: "kb-err-001",
    disciplina: "geral",
    tema: "Armadilhas clássicas do ENEM",
    tipo: "erro-comum",
    gatilhos: ["armadilha", "pegadinha", "erro comum", "cuidado", "errei sempre", "dificil", "traicao"],
    titulo: "Armadilhas clássicas do ENEM e como não cair",
    conteudo:
      "<p>A maioria dos erros no ENEM não é de conteúdo: é de <strong>leitura</strong>. As armadilhas mais frequentes: (1) responder sobre um texto diferente do pedido no enunciado; (2) escolher alternativa que generaliza («todos», «sempre», «nunca») quando o texto dizia «alguns»; (3) marcar a alternativa que repete palavras do texto mas inverte o sentido.</p>" +
      "<p>Em Matemática e Ciências, as pegadinhas são de <strong>unidade</strong> e de <strong>dado inútil</strong>: a questão fornece valores que não entram no cálculo só para distrair. Leia o que se pede <em>antes</em> de calcular, e ao terminar pergunte: «a resposta tem a unidade pedida?».</p>" +
      "<p>Também acontece muito o <strong>erro de cálculo por pressa</strong>: sinal trocado, arredondamento antecipado, porcentagem aplicada sobre o valor errado. Reservar 3 minutos no fim para revisar as questões «fáceis» costuma recuperar mais pontos do que insistir nas difíceis. Confie na sua primeira resposta: só mude se você encontrar um motivo objetivo.</p>"
  }
];

/* ---------- Roteiros de aula por disciplina ---------- */
const TUTOR_ROTEIROS = {
  matematica: {
    saudacao: "Olá! Eu sou seu professor virtual de Matemática. Vamos montar juntos o seu roteiro de aula.",
    objetivos: [
      "Reconhecer qual modelo matemático se aplica a cada situação-problema do ENEM",
      "Aplicar razão, proporção, porcentagem e funções na resolução de problemas contextualizados",
      "Interpretar gráficos, tabelas e textos com informações quantitativas"
    ],
    pontosChave: [
      "Leia o enunciado duas vezes: primeiro para entender o contexto, depois para identificar os dados e a pergunta",
      "Escreva a fórmula ou a proporção antes de substituir valores",
      "Confira as unidades e a ordem de grandeza da resposta",
      "Fique atento aos dados que não entram na conta: eles são distração"
    ],
    checkPergunta: "Antes de seguirmos: você consegue explicar, com suas palavras, a diferença entre uma grandeza diretamente proporcional e uma inversamente proporcional?",
    despedida: "Bons estudos! Faça os exercícios da atividade e volte aqui quando travar em uma questão."
  },
  redacao: {
    saudacao: "Olá! Eu sou seu professor virtual de Redação. Escrever bem se aprende com método e prática.",
    objetivos: [
      "Planejar um texto dissertativo-argumentativo antes de escrever",
      "Defender uma tese clara com argumentos e repertório sociocultural pertinente",
      "Construir uma proposta de intervenção com agente, ação, modo, efeito e detalhamento"
    ],
    pontosChave: [
      "Tese em uma frase, com posicionamento explícito",
      "Dois desenvolvimentos: um argumento em cada, sempre com análise, não apenas citação",
      "Repertório que você sabe explicar vale mais do que um dado decorado",
      "Conclusão que retoma a tese e encaminha a solução do problema"
    ],
    checkPergunta: "Antes de seguirmos: na sua última redação, a proposta de intervenção dizia claramente quem faz o que, como e com qual efeito?",
    despedida: "Bons estudos! Escreva um rascunho por semana e traga suas dúvidas sobre estrutura ou argumento."
  },
  linguagens: {
    saudacao: "Olá! Eu sou seu professor virtual de Linguagens. Ler bem é o primeiro passo para acertar qualquer questão.",
    objetivos: [
      "Identificar gêneros textuais e suas finalidades",
      "Reconhecer funções da linguagem, coesão, coerência e variação linguística",
      "Interpretar textos verbais e não verbais sem extrapolar o que está escrito"
    ],
    pontosChave: [
      "Leia a pergunta antes do texto para saber o que procurar",
      "Sublinhe conectivos e palavras que indicam mudança de ideia",
      "Em textos multimodais, descreva a imagem e o texto e procure o contraste entre eles",
      "Elimine alternativas que generalizam ou acrescentam informações que o texto não traz"
    ],
    checkPergunta: "Antes de seguirmos: quando você lê uma questão de interpretação, costuma apontar no texto o trecho que sustenta cada alternativa?",
    despedida: "Bons estudos! Leia um pouco de tudo todos os dias — notícia, tirinha, charge, infográfico — e pratique questões."
  },
  literatura: {
    saudacao: "Olá! Eu sou seu professor virtual de Literatura. Vamos ligar os textos aos seus contextos históricos.",
    objetivos: [
      "Situar as principais escolas literárias brasileiras no tempo",
      "Reconhecer traços de estilo de autores e movimentos centrais para o ENEM",
      "Relacionar tema, forma e contexto social na leitura de poemas e narrativas"
    ],
    pontosChave: [
      "Não decore autores: aprenda o que cada movimento queria mudar",
      "Fique atento à ironia, ao narrador e à voz do texto",
      "Compare períodos: o Romantismo idealiza, o Realismo critica, o Modernismo reinventa",
      "Leia em voz alta: a sonoridade faz parte do sentido do poema"
    ],
    checkPergunta: "Antes de seguirmos: você consegue explicar a diferença entre o índio idealizado do Romantismo e o índio reinventado pelo Modernismo?",
    despedida: "Bons estudos! Leia os textos integrais indicados nas aulas e anote as marcas de estilo que encontrar."
  },
  ingles: {
    saudacao: "Hello! Eu sou seu professor virtual de Inglês. Não precisa traduzir tudo: precisa entender as pistas.",
    objetivos: [
      "Reconhecer falsos cognatos e vocabulário acadêmico recorrente",
      "Usar conectivos para entender a relação entre as ideias do texto",
      "Responder questões de interpretação com base em paráfrases do texto"
    ],
    pontosChave: [
      "Sublinhe os conectivos: however, although, because, therefore, for example",
      "Desconfie de tradução óbvia demais: pode ser falso cognato",
      "Leia o texto uma vez inteiro antes de olhar as alternativas",
      "A resposta correta costuma ser uma paráfrase, não uma cópia literal"
    ],
    checkPergunta: "Antes de seguirmos: você saberia dizer o que realmente significam actually, eventually e parents em uma prova?",
    despedida: "Good studies! Leia um texto curto em inglês por dia e anote as palavras novas em contexto."
  },
  espanhol: {
    saudacao: "¡Hola! Eu sou seu professor virtual de Espanhol. Sua intuição de falante de português ajuda, mas precisa de cuidado.",
    objetivos: [
      "Identificar heterosemânticos (falsos cognatos) mais frequentes",
      "Reconhecer conectores e a estrutura argumentativa do texto",
      "Distinguir o uso do indicativo e do subjuntivo"
    ],
    pontosChave: [
      "Largo e ancho invertem o sentido em relação ao português",
      "Aunque introduz a ideia que não impede: a outra oração é a principal",
      "Depois de quiero que, espero que e ojalá, use o subjuntivo",
      "Se a tradução óbvia quebrar o sentido da frase, desconfie do falso cognato"
    ],
    checkPergunta: "Antes de seguirmos: você sabe dizer quando uma frase em espanhol pede indicativo e quando pede subjuntivo?",
    despedida: "¡Buen estudio! Leia notícias curtas em espanhol e preste atenção aos conectores."
  },
  "historia-geral": {
    saudacao: "Olá! Eu sou seu professor virtual de História Geral. Entender o passado explica o presente.",
    objetivos: [
      "Situar os principais processos históricos do mundo antigo ao contemporâneo",
      "Relacionar causas econômicas, sociais e políticas dos grandes eventos",
      "Comparar modelos políticos e econômicos em diferentes épocas"
    ],
    pontosChave: [
      "Toda revolução tem causas profundas e um estopim: não confunda os dois",
      "Atenção às continuidades: o que não mudou é tão importante quanto o que mudou",
      "Guerras Mundiais, Guerra Fria e imperialismo estão ligados pela disputa de poder",
      "Leia as datas como consequências, não como lista para decorar"
    ],
    checkPergunta: "Antes de seguirmos: você consegue explicar por que a paz de Versalhes ajudou a preparar a Segunda Guerra?",
    despedida: "Bons estudos! Monte uma linha do tempo com os processos que estudamos e relacione causa e consequência."
  },
  "historia-brasil": {
    saudacao: "Olá! Eu sou seu professor virtual de História do Brasil. A nossa história explica muitas questões atuais.",
    objetivos: [
      "Compreender a formação econômica e social do Brasil colonial",
      "Relacionar estruturas de poder, como coronelismo e ditadura, ao presente",
      "Reconhecer conquistas de direitos e os limites de cada período republicano"
    ],
    pontosChave: [
      "Colonização, escravidão e desigualdade são processos conectados",
      "República Velha: oligarquias, política dos governadores e voto de cabresto",
      "A Era Vargas trouxe direitos trabalhistas, mas de forma autoritária",
      "Ditadura Militar e Constituição de 1988: repressão, resistência e redemocratização"
    ],
    checkPergunta: "Antes de seguirmos: você consegue explicar como o coronelismo garantia votos na República Velha?",
    despedida: "Bons estudos! Leia as fontes históricas indicadas nas aulas e relacione cada período com um problema atual."
  },
  geografia: {
    saudacao: "Olá! Eu sou seu professor virtual de Geografia. O espaço em que vivemos é resultado de escolhas sociais.",
    objetivos: [
      "Analisar processos urbanos e suas consequências socioespaciais",
      "Interpretar dados demográficos, gráficos e mapas",
      "Relacionar energética, clima e modelos de desenvolvimento"
    ],
    pontosChave: [
      "A urbanização brasileira foi tardia, rápida e concentrada",
      "Segregação socioespacial e desigualdade de acesso andam juntas",
      "O fluxo de energia ecológica é decrescente; a matéria é cíclica",
      "Matriz energética e matriz elétrica não são a mesma coisa"
    ],
    checkPergunta: "Antes de seguirmos: você sabe explicar a diferença entre segregação imposta e segregação voluntária?",
    despedida: "Bons estudos! Observe o espaço da sua cidade e tente identificar os conceitos que estudamos nas aulas."
  },
  sociologia: {
    saudacao: "Olá! Eu sou seu professor virtual de Sociologia. Vamos olhar a sociedade com olhos analíticos.",
    objetivos: [
      "Compreender os conceitos clássicos de Marx, Weber e Bourdieu",
      "Relacionar escola, trabalho e cultura como espaços de desigualdade",
      "Analisar movimentos sociais e ação coletiva no Brasil"
    ],
    pontosChave: [
      "Mais-valia é a diferença entre o valor produzido e o salário recebido",
      "Weber: o Estado detém o monopólio do uso legítimo da força",
      "Bourdieu: a escola premia o capital cultural que já se tem em casa",
      "A indústria cultural padroniza gostos e reduz a diversidade"
    ],
    checkPergunta: "Antes de seguirmos: você consegue explicar como o capital cultural influencia o desempenho escolar?",
    despedida: "Bons estudos! Leia as reportagens indicadas e tente identificar os conceitos sociológicos em situações concretas."
  },
  filosofia: {
    saudacao: "Olá! Eu sou seu professor virtual de Filosofia. Aqui a gente aprende a pensar argumentando.",
    objetivos: [
      "Compreender a passagem do mythos ao logos na Grécia antiga",
      "Reconhecer os métodos de Sócrates, Platão e Aristóteles",
      "Aplicar conceitos éticos e políticos de Kant, Mill e dos contratualistas"
    ],
    pontosChave: [
      "O mythos explica pela narrativa sagrada; o logos, pela razão e pelo argumento",
      "A maiêutica é o parto de ideias pelo diálogo, não a resposta pronta",
      "Kant: age de forma que sua máxima possa ser lei universal e trata as pessoas como fim",
      "O utilitarismo julga pela consequência; o contratualismo imagina o Estado como acordo"
    ],
    checkPergunta: "Antes de seguirmos: você consegue explicar a diferença entre a ética de Kant e a ética utilitarista de Mill?",
    despedida: "Bons estudos! Leia os textos filosóficos com atenção aos argumentos e escreva resumos com suas palavras."
  },
  biologia: {
    saudacao: "Olá! Eu sou seu professor virtual de Biologia. A vida é feita de processos que se conectam.",
    objetivos: [
      "Compreender fotossíntese, respiração celular e o fluxo de energia nos ecossistemas",
      "Aplicar as leis de Mendel e a herança ligada ao cromossomo X",
      "Relacionar imunização, vacinas e evolução a situações do dia a dia"
    ],
    pontosChave: [
      "A fotossíntese produz glicose e oxigênio; a respiração quebra a glicose e gera ATP",
      "Cerca de 10% da energia passa de um nível trófico para o outro",
      "Proporção 3:1 na primeira lei de Mendel e 9:3:3:1 na segunda",
      "O daltonismo é recessivo e ligado ao X: por isso é mais comum em homens"
    ],
    checkPergunta: "Antes de seguirmos: você consegue explicar por que uma pirâmide de energia não pode ter muitos níveis?",
    despedida: "Bons estudos! Monte esquemas dos processos e resolva questões de heredograma para fixar a lógica."
  },
  fisica: {
    saudacao: "Olá! Eu sou seu professor virtual de Física. A Física explica o que acontece ao seu redor.",
    objetivos: [
      "Aplicar as leis de Newton na análise de movimentos e forças",
      "Resolver problemas de energia, trabalho, potência e eletricidade",
      "Interpretar fenômenos de ondas, calor e flutuação com modelos simples"
    ],
    pontosChave: [
      "Comece sempre pelo diagrama de forças",
      "Sem força resultante, não há variação de velocidade",
      "Ação e reação atuam em corpos diferentes e nunca se anulam",
      "Atenção às unidades: joule, watt, newton, hertz e ohm têm significados específicos"
    ],
    checkPergunta: "Antes de seguirmos: você sabe dizer por que o cinto de segurança é necessário mesmo quando o carro está a 100 km/h constante?",
    despedida: "Bons estudos! Resolva exercícios numéricos por escrito e confira sempre a unidade da resposta."
  },
  quimica: {
    saudacao: "Olá! Eu sou seu professor virtual de Química. Tudo é feito de átomos que se organizam.",
    objetivos: [
      "Classificar ligações químicas e prever propriedades dos compostos",
      "Calcular concentração, diluição e problemas de estequiometria",
      "Reconhecer funções orgânicas, isomeria e reações do cotidiano"
    ],
    pontosChave: [
      "Comece balanceando: os coeficientes são proporções em mol",
      "Na dúvida entre iônica e covalente, olhe a diferença de eletronegatividade",
      "Na diluição, M1V1 = M2V2: a quantidade de soluto não muda",
      "Reação exotérmica libera calor; endotérmica absorve calor"
    ],
    checkPergunta: "Antes de seguirmos: você consegue explicar por que o aço do navio não afunda, apesar de ser mais denso que a água?",
    despedida: "Bons estudos! Treine balanceamento e cálculo estequiométrico com exercícios resolvidos passo a passo."
  }
};

/* ---------- Glossario ---------- */
const TUTOR_GLOSSARIO = [
  { termo: "Porcentagem", disciplina: "matematica", definicao: "Razão de denominador 100. Aumentar 20% equivale a multiplicar por 1,20; dar desconto de 15% equivale a multiplicar por 0,85." },
  { termo: "Razão e proporção", disciplina: "matematica", definicao: "Razão é a divisão entre duas grandezas (a/b); proporção é a igualdade entre duas razões. Para montar corretamente, alinhe grandezas equivalentes." },
  { termo: "Escala", disciplina: "matematica", definicao: "Relação entre a medida no desenho e a medida real. Na escala 1:50.000, 1 cm no mapa representa 50.000 cm no terreno." },
  { termo: "Juros compostos", disciplina: "matematica", definicao: "Regime em que a taxa incide sobre o montante anterior: M = C(1 + i)ᵗ. Os juros geram juros, como nas dívidas de cartão." },
  { termo: "Função do 1º grau", disciplina: "matematica", definicao: "f(x) = a·x + b. O coeficiente a é a taxa de variação e b é o valor inicial; o gráfico é uma reta." },
  { termo: "Mediana", disciplina: "matematica", definicao: "Valor central de um conjunto ordenado. Ao contrário da média, não sofre influência de valores extremos." },
  { termo: "Probabilidade", disciplina: "matematica", definicao: "Razão entre casos favoráveis e casos possíveis. Em eventos independentes multiplicam-se as probabilidades; em eventos exclusivos, somam-se." },
  { termo: "Logaritmo", disciplina: "matematica", definicao: "Expoente ao qual a base é elevada para resultar em certo número. Exemplo: log₂ 8 = 3, porque 2³ = 8." },
  { termo: "Coesão", disciplina: "linguagens", definicao: "Costura visível do texto, feita de conectivos, pronomes, sinônimos e repetições que ligam frases e parágrafos." },
  { termo: "Coerência", disciplina: "linguagens", definicao: "Lógica interna do texto: ele faz sentido, não se contradiz e respeita o que o leitor já sabe." },
  { termo: "Gênero textual", disciplina: "linguagens", definicao: "Tipo de texto que circula na sociedade (notícia, receita, meme, discurso), com finalidade, suporte e estilo próprios." },
  { termo: "Multimodalidade", disciplina: "linguagens", definicao: "Combinação de linguagens — verbal, visual, sonora, gestual — na construção do sentido de um texto." },
  { termo: "Tese", disciplina: "redacao", definicao: "Posicionamento explícito do autor sobre o tema, expresso em uma frase completa e defensável." },
  { termo: "Repertório sociocultural", disciplina: "redacao", definicao: "Conhecimento de áreas diversas (dados, leis, obras, fatos históricos) usado para sustentar os argumentos do texto." },
  { termo: "Proposta de intervenção", disciplina: "redacao", definicao: "Solução apresentada na conclusão, com agente, ação, modo, efeito e detalhamento, respeitando os direitos humanos." },
  { termo: "Indianismo", disciplina: "literatura", definicao: "Vertente do Romantismo brasileiro que idealiza o indígena como bom selvagem e símbolo da identidade nacional." },
  { termo: "Realismo", disciplina: "literatura", definicao: "Escola literária que rejeita a idealização romântica e analisa a sociedade com foco na psicologia e na crítica social." },
  { termo: "Antropofagia", disciplina: "literatura", definicao: "Proposta modernista de devorar a cultura estrangeira e transformá-la em algo novo, em vez de copiá-la ou rejeitá-la." },
  { termo: "Falso cognato", disciplina: "ingles", definicao: "Palavra parecida com o português mas com significado diferente, como actually (na verdade) e parents (pais)." },
  { termo: "Condicional", disciplina: "ingles", definicao: "Estrutura com if que liga uma hipótese a um resultado. Quanto mais improvável a hipótese, mais distante fica o verbo." },
  { termo: "Subjuntivo", disciplina: "espanhol", definicao: "Modo verbal usado para dúvida e hipótese. Aparece depois de expressões como quiero que e ojalá." },
  { termo: "Heterossemântico", disciplina: "espanhol", definicao: "Falso cognato do espanhol: palavra de forma parecida e sentido diferente, como embarazada (grávida) e largo (comprido)." },
  { termo: "Pólis", disciplina: "historia-geral", definicao: "Cidade-Estado independente da Grécia antiga, com leis, exército e deuses próprios." },
  { termo: "Feudalismo", disciplina: "historia-geral", definicao: "Sistema medieval baseado na propriedade da terra, em relações pessoais de poder e numa economia agrária de subsistência." },
  { termo: "Servidão", disciplina: "historia-geral", definicao: "Condição do servo: preso à terra, trabalha parte do tempo para o senhor e parte para si, mas não é escravizado." },
  { termo: "Imperialismo", disciplina: "historia-geral", definicao: "Disputa de territórios na África e na Ásia pelas potências europeias no século XIX, movida por interesses econômicos." },
  { termo: "Guerra Fria", disciplina: "historia-geral", definicao: "Confronto entre o bloco capitalista e o socialista (1947-1991) sem combate direto, marcado pela dissuasão nuclear." },
  { termo: "Capitanias hereditárias", disciplina: "historia-brasil", definicao: "Faixas de terra doadas pela Coroa portuguesa a donatários, em 1534, com amplos poderes de administração." },
  { termo: "Plantation", disciplina: "historia-brasil", definicao: "Sistema colonial de monocultura, latifúndio e trabalho escravo voltado à exportação, base da economia brasileira." },
  { termo: "Coronelismo", disciplina: "historia-brasil", definicao: "Domínio político local exercido por grandes proprietários na República Velha, base do voto de cabresto." },
  { termo: "Voto de cabresto", disciplina: "historia-brasil", definicao: "Fraude eleitoral organizada pelos coroneis, com pressão, violência e troca de favores sobre os eleitores." },
  { termo: "AI-5", disciplina: "historia-brasil", definicao: "Ato Institucional nº 5 (1968), que fechou o Congresso, suspendeu garantias jurídicas e endureceu a repressão na ditadura militar." },
  { termo: "Macrocefalia urbana", disciplina: "geografia", definicao: "Crescimento desproporcional de uma cidade, que concentra população, renda, serviços e poder político." },
  { termo: "Segregação socioespacial", disciplina: "geografia", definicao: "Separação de grupos sociais no espaço urbano por renda, raça ou origem, imposta ou voluntária." },
  { termo: "Transição demográfica", disciplina: "geografia", definicao: "Passagem de um regime de alta natalidade e mortalidade para outro de níveis baixos, com envelhecimento da população." },
  { termo: "Matriz energética", disciplina: "geografia", definicao: "Conjunto das fontes de energia usadas por um país. A matriz elétrica considera apenas a geração de eletricidade." },
  { termo: "Bloco econômico", disciplina: "geografia", definicao: "Acordo entre países para reduzir barreiras comerciais. A integração vai da zona de livre comércio à união monetária." },
  { termo: "Mais-valia", disciplina: "sociologia", definicao: "Diferença entre o valor produzido pelo trabalhador e o salário que ele recebe, apropriada pelo dono dos meios de produção." },
  { termo: "Indústria cultural", disciplina: "sociologia", definicao: "Produção industrial da cultura como mercadoria, que padroniza gostos e comportamentos (Adorno e Horkheimer)." },
  { termo: "Capital cultural", disciplina: "sociologia", definicao: "Conjunto de saberes, hábitos e referências transmitidos pela família e valorizados pela escola (Bourdieu)." },
  { termo: "Habitus", disciplina: "sociologia", definicao: "Disposições incorporadas desde a infância que orientam nossa forma de agir, gostar e decidir (Bourdieu)." },
  { termo: "Mythos e logos", disciplina: "filosofia", definicao: "Duas formas de explicação: o mythos, pela narrativa sagrada, e o logos, pela razão e pelo argumento." },
  { termo: "Maiêutica", disciplina: "filosofia", definicao: "Método socrático do parto de ideias: por meio de perguntas, o interlocutor descobre sozinho a resposta." },
  { termo: "Imperativo categórico", disciplina: "filosofia", definicao: "Princípio moral de Kant: age apenas segundo a máxima que tu podes querer que se torne lei universal." },
  { termo: "Utilitarismo", disciplina: "filosofia", definicao: "Ética consequencialista (Mill, Bentham) que avalia a ação pela maior felicidade produzida ao maior número de pessoas." },
  { termo: "Contratualismo", disciplina: "filosofia", definicao: "Ideia de que o Estado nasce de um acordo entre pessoas que abandonam o estado de natureza (Hobbes, Locke, Rousseau)." },
  { termo: "Fotossíntese", disciplina: "biologia", definicao: "Processo em que seres autotróficos usam luz, água e gás carbônico para produzir glicose e oxigênio, nos cloroplastos." },
  { termo: "Respiração celular", disciplina: "biologia", definicao: "Quebra da glicose para produzir ATP, em três etapas: glicólise, ciclo de Krebs e cadeia respiratória." },
  { termo: "Nível trófico", disciplina: "biologia", definicao: "Posição de um organismo na cadeia alimentar. Cerca de 10% da energia passa de um nível para o outro." },
  { termo: "Seleção natural", disciplina: "biologia", definicao: "Mecanismo darwiniano em que as variações vantajosas num ambiente aumentam de frequência ao longo das gerações." },
  { termo: "Inércia", disciplina: "fisica", definicao: "Tendência dos corpos de manter seu estado de repouso ou de movimento retilíneo uniforme sem força resultante." },
  { termo: "Trabalho", disciplina: "fisica", definicao: "Energia transferida por uma força que desloca o corpo: W = F · d · cos θ. Será zero se força e deslocamento forem perpendiculares." },
  { termo: "Empuxo", disciplina: "fisica", definicao: "Força vertical para cima que um fluido exerce sobre um corpo imerso, igual ao peso do fluido deslocado (Arquimedes)." },
  { termo: "Ligação iônica", disciplina: "quimica", definicao: "Ligação por transferência de elétrons entre metal e não metal. Os compostos conduzem corrente quando fundidos ou em solução." },
  { termo: "Molaridade", disciplina: "quimica", definicao: "Quantidade de soluto por volume de solução: M = n/V, em mol por litro." },
  { termo: "Reagente limitante", disciplina: "quimica", definicao: "Reagente que se esgota primeiro numa reação e, por isso, determina a quantidade de produto formada." },
  { termo: "Chuva ácida", disciplina: "quimica", definicao: "Precipitação com pH menor que 5,6, causada por óxidos de enxofre e nitrogênio que reagem com a água da atmosfera." },
  { termo: "Isomeria", disciplina: "quimica", definicao: "Fenômeno em que compostos diferentes têm a mesma fórmula molecular, seja por estrutura da cadeia, por função ou por estereoquímica." }
];

if (typeof window !== "undefined") {
  window.TUTOR_KB = TUTOR_KB;
  window.TUTOR_ROTEIROS = TUTOR_ROTEIROS;
  window.TUTOR_GLOSSARIO = TUTOR_GLOSSARIO;
}
