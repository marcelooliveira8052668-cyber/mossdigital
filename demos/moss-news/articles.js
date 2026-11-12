/* Conteúdo educativo original. Não são reportagens nem notícias em tempo real. */
'use strict';
const MOSS_ARTICLES = [
  {
    id:'presenca-digital', category:'Negócios', title:'Seu negócio merece mais do que um perfil nas redes sociais',
    summary:'Entenda como um site bem planejado organiza sua presença digital e facilita a vida de quem quer comprar de você.',
    image:'business.jpg', alt:'Pessoas reunidas ao redor de uma mesa de trabalho', minutes:6,
    sections:[
      {title:'O cliente precisa encontrar respostas, não obstáculos', text:'Imagine alguém conhecendo sua empresa pela primeira vez. Essa pessoa quer entender o que você oferece, onde atende, quais são os horários e como conversar com alguém. Quando essas informações estão espalhadas em publicações antigas, a decisão fica mais difícil. Um site pode reunir o essencial em um endereço organizado, acessível pelo celular e fácil de compartilhar.'},
      {title:'Redes sociais e site podem trabalhar juntos', text:'Não é preciso abandonar as redes. Elas ajudam na descoberta, na conversa e na distribuição de conteúdo. O site funciona como uma referência estável para apresentar serviços, mostrar trabalhos e explicar o processo de atendimento. O endereço próprio também reduz a dependência de uma única plataforma, embora hospedagem, domínio e manutenção continuem exigindo cuidado.'},
      {title:'O que uma boa página comercial precisa ter', items:['Uma descrição direta do que a empresa faz e de quem ela atende.','Serviços ou produtos com informações suficientes para o cliente decidir o próximo passo.','Fotografias autorizadas e exemplos reais, sem depoimentos ou resultados inventados.','Contato visível, área de atendimento e horários atualizados.','Informações sobre privacidade e sobre como os dados enviados serão utilizados.','Boa leitura no celular, botões acessíveis e páginas leves.']},
      {title:'Comece pelo objetivo, não pelo efeito visual', text:'Um restaurante pode priorizar cardápio e pedidos. Um profissional autônomo pode precisar de apresentação, portfólio e contato. Uma loja com pagamento online exige cuidados adicionais com preço, estoque, entrega, trocas e segurança. Definir o objetivo antes de escolher recursos evita um site bonito que não resolve a necessidade do negócio.'},
      {title:'Um roteiro simples para começar', text:'Liste as dúvidas mais frequentes dos clientes, organize os serviços e separe materiais que você tem direito de usar. Depois, defina quem será responsável por atualizar contatos, valores e horários. Antes da publicação, teste cada botão em um celular e peça a uma pessoa que ainda não conhece a empresa para tentar encontrar as informações básicas.'},
      {title:'Como avaliar se está funcionando', text:'Observe a qualidade das conversas recebidas e pergunte como o cliente encontrou sua empresa. Caso adote ferramentas de análise, escolha uma configuração adequada à sua política de privacidade. Um site, por si só, não garante vendas ou uma posição nos mecanismos de busca; conteúdo claro, atendimento e continuidade também importam.'}
    ],
    sources:[{name:'Sebrae — orientação para pequenos negócios',url:'https://sebrae.com.br/'},{name:'Google — guia de fundamentos de SEO',url:'https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=pt-br'}]
  },
  {
    id:'seguranca-digital', category:'Tecnologia', title:'Antes de clicar: cuidados que ajudam a reconhecer um golpe digital',
    summary:'Mensagens urgentes, falsas cobranças e links suspeitos: aprenda a interromper a pressa e conferir a origem.',
    image:'security.jpg',alt:'Computador portátil em uma mesa, ilustrando o uso de serviços digitais',minutes:5,
    sections:[
      {title:'A urgência é parte da armadilha',text:'Uma conta que será bloqueada, uma compra que você não reconhece ou um prêmio que vence em minutos: mensagens fraudulentas costumam pressionar a pessoa a agir antes de conferir. O primeiro passo é pausar. Não siga o link recebido apenas porque a mensagem parece ter logotipo, nome de empresa ou dados pessoais corretos.'},
      {title:'Confirme por um caminho independente',text:'Abra o aplicativo oficial que você já usa ou digite o endereço conhecido no navegador. Para telefonar, procure um número em uma fonte confiável, em vez de usar o contato enviado na mensagem suspeita. A presença de HTTPS ajuda a proteger a conexão, mas não prova que o negócio ou o conteúdo do site é legítimo.'},
      {title:'Uma lista prática de proteção',items:['Use senhas longas e diferentes para cada serviço; considere um gerenciador confiável.','Ative verificação em duas etapas, de preferência por aplicativo autenticador ou chave de acesso, quando disponível.','Nunca informe senhas, códigos de autenticação ou dados completos de cartão por mensagem.','Mantenha sistema, navegador e aplicativos atualizados.','Antes de transferir dinheiro, confira o destinatário e confirme pedidos incomuns por outro canal.','Desconfie de pedidos para instalar aplicativos de acesso remoto durante supostos atendimentos.']},
      {title:'Se você já clicou ou informou dados',text:'Não continue a conversa com o remetente. Se houve informação bancária ou transferência, entre em contato imediatamente com a instituição pelos canais oficiais. Troque senhas comprometidas a partir de um dispositivo confiável, encerre sessões desconhecidas e preserve mensagens e comprovantes. As medidas adequadas dependem do ocorrido; siga as orientações do banco e das autoridades.'},
      {title:'Compartilhe o cuidado, não o link suspeito',text:'Ao alertar familiares, evite reenviar links clicáveis que possam expor outras pessoas. Explique o padrão do golpe e mostre como verificar a origem. Segurança digital é um conjunto de hábitos, não uma promessa de risco zero.'}
    ],
    sources:[{name:'CERT.br — Cartilha de Segurança para Internet',url:'https://cartilha.cert.br/'},{name:'Banco Central — informações sobre o Pix',url:'https://www.bcb.gov.br/estabilidadefinanceira/pix'}]
  },
  {
    id:'inteligencia-artificial', category:'Tecnologia',title:'Inteligência artificial no dia a dia: onde ela ajuda e onde exige cuidado',
    summary:'Da primeira ideia à revisão de um texto, veja como usar a tecnologia sem abrir mão do seu julgamento.',
    image:'technology.jpg',alt:'Estação de trabalho com computador e materiais de escritório',minutes:5,
    sections:[
      {title:'Uma assistente de rascunho, não uma garantia de verdade',text:'Ferramentas de inteligência artificial generativa podem ajudar a organizar ideias, sugerir versões de um texto e explicar conceitos. Elas também podem produzir respostas incorretas com aparência convincente. O melhor ponto de partida é tratá-las como apoio para uma tarefa, não como autoridade final sobre fatos, leis, saúde ou finanças.'},
      {title:'Peça com contexto e revise com atenção',text:'Um pedido como “escreva uma mensagem” deixa muitas decisões em aberto. Explique o público, o objetivo, o tamanho e o tom desejados, sem incluir dados sensíveis. Depois confira se a resposta respeita seu contexto, se faz promessas indevidas e se contém informações que precisam de verificação.'},
      {title:'Bons usos para começar',items:['Criar uma primeira estrutura para um roteiro de atendimento.','Organizar uma lista de tarefas a partir de anotações sem dados confidenciais.','Sugerir perguntas frequentes para você responder com informações verdadeiras.','Reescrever um aviso em linguagem mais simples, conferindo se o sentido foi preservado.','Comparar ideias de títulos sem inventar resultados, preços ou depoimentos.']},
      {title:'O que não entregar sem avaliar',text:'Dados de clientes, documentos, senhas, informações médicas e contratos sigilosos não devem ser inseridos por conveniência. Antes de usar uma ferramenta no trabalho, verifique as regras da organização, a política de privacidade do serviço e as configurações de uso dos dados. Anonimizar um nome nem sempre é suficiente para impedir a identificação de uma pessoa.'},
      {title:'A responsabilidade continua humana',text:'Confira fontes primárias, faça testes e solicite revisão especializada em decisões de risco. Observe também direitos autorais e autorizações para imagens, vozes e marcas. A velocidade da ferramenta não elimina o trabalho de checar, corrigir e assumir responsabilidade pelo material publicado.'}
    ],sources:[{name:'UNESCO — inteligência artificial e ética',url:'https://www.unesco.org/en/artificial-intelligence'},{name:'ANPD — proteção de dados pessoais',url:'https://www.gov.br/anpd/pt-br'}]
  },
  {
    id:'consumo-consciente',category:'Economia',title:'Comprar melhor começa antes de colocar um produto no carrinho',
    summary:'Preço total, reputação da loja e necessidade real: um guia para decisões de consumo mais conscientes.',
    image:'shopping.jpg',alt:'Arara com roupas em uma loja, imagem ilustrativa de consumo',minutes:5,
    sections:[
      {title:'Separe vontade, necessidade e urgência',text:'Uma promoção pode ser interessante, mas um desconto não transforma automaticamente um produto em prioridade. Antes de comprar, pergunte se ele resolve uma necessidade, se você já tem algo equivalente e se o gasto cabe nas despesas previstas. Fazer uma pequena pausa ajuda a perceber compras motivadas apenas por contadores regressivos ou mensagens de escassez.'},
      {title:'Compare o custo completo',text:'Preço anunciado, frete, juros, acessórios e manutenção podem alterar o valor final. Compare propostas equivalentes e leia o parcelamento com atenção. Uma parcela que parece pequena pode comprometer o orçamento junto com outras compras. Evite decidir apenas pela porcentagem de desconto exibida.'},
      {title:'Antes de comprar pela internet',items:['Confira os dados e os canais de atendimento do fornecedor.','Pesquise a reputação em mais de uma fonte, observando o contexto das reclamações.','Leia descrição, dimensões, prazo de entrega, garantia e condições de troca.','Registre a oferta e guarde a confirmação e o comprovante da compra.','Prefira meios de pagamento adequados à transação e desconfie de pressão para pagar fora da plataforma.']},
      {title:'Conheça o direito de arrependimento',text:'No Brasil, o Código de Defesa do Consumidor prevê, em regra, prazo de sete dias para desistência de contratação realizada fora do estabelecimento comercial, contado da assinatura ou do recebimento do produto ou serviço. A aplicação a um caso concreto deve ser avaliada pelos órgãos de defesa do consumidor; confira a norma e procure orientação quando houver dúvida.'},
      {title:'Se houver problema',text:'Procure primeiro o fornecedor e guarde protocolos. Quando a empresa participa da plataforma, o Consumidor.gov.br pode ser um canal de tentativa de solução. Procons também oferecem orientação. Este guia é informativo e não substitui análise jurídica ou a leitura das condições da contratação.'}
    ],sources:[{name:'Código de Defesa do Consumidor — texto oficial, art. 49',url:'https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm'},{name:'Consumidor.gov.br — portal oficial',url:'https://www.consumidor.gov.br/'}]
  },
  {
    id:'pausas-e-movimento',category:'Bem-estar',title:'Pequenas pausas, mais movimento: repense o tempo diante da tela',
    summary:'Ajustes possíveis na rotina para intercalar trabalho, descanso e atividade física com mais consciência.',
    image:'wellbeing.jpg',alt:'Caminho arborizado em meio à natureza',minutes:4,
    sections:[
      {title:'Perceba como o seu dia está organizado',text:'Trabalho, estudo e lazer podem acontecer no mesmo dispositivo. Sem perceber, passamos de uma atividade sentada para outra. Observar a rotina é um começo: em que momentos você consegue levantar, caminhar um pouco ou alternar a postura? Não existe um ajuste único que sirva para todas as pessoas e todos os ambientes.'},
      {title:'Crie oportunidades de movimento',text:'Uma caminhada curta em um horário possível, uma tarefa feita em pé ou um intervalo para sair da mesma posição podem ajudar a reduzir períodos contínuos de inatividade. As possibilidades variam conforme saúde, mobilidade, segurança e trabalho. Escolha mudanças compatíveis com sua realidade, sem transformar a pausa em mais uma cobrança.'},
      {title:'Uma rotina mais cuidadosa pode incluir',items:['Deixar água acessível e respeitar suas necessidades individuais.','Ajustar iluminação e tamanho do texto para facilitar a leitura.','Organizar a mesa para evitar esforços desnecessários.','Reservar momentos sem notificações para atividades que exigem atenção.','Planejar atividade física adequada às suas condições e preferências.']},
      {title:'Bem-estar não se resolve com uma dica isolada',text:'Dor persistente, alterações de visão, cansaço intenso ou dificuldade frequente para dormir merecem avaliação profissional. Orientações gerais na internet não substituem consulta. Se você tem restrições de saúde ou dúvidas sobre exercícios, busque uma equipe de saúde antes de mudar a prática.'},
      {title:'Comece pelo que é viável',text:'Escolha um hábito pequeno e observe como ele se encaixa na semana. Ajuste quando necessário. O objetivo não é cumprir uma rotina perfeita, mas construir um dia em que descanso, movimento e necessidades reais tenham espaço.'}
    ],sources:[{name:'Ministério da Saúde — Saúde de A a Z',url:'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z'},{name:'OMS — informações sobre atividade física',url:'https://www.who.int/news-room/fact-sheets/detail/physical-activity'}]
  },
  {
    id:'cultura-perto',category:'Cultura',title:'A cultura pode estar mais perto do que você imagina',
    summary:'Bibliotecas, museus e atividades de bairro: caminhos para descobrir experiências além da sua rotina.',
    image:'culture.jpg',alt:'Prateleiras de livros em uma biblioteca',minutes:4,
    sections:[
      {title:'Olhe primeiro para o seu entorno',text:'Uma biblioteca pública, um centro cultural ou uma feira de livros pode fazer parte do seu bairro sem aparecer nas suas redes sociais. Consulte os canais oficiais do município, das instituições e dos espaços culturais. A programação muda, por isso confirme horário, ingresso, classificação indicativa e necessidade de inscrição antes de sair.'},
      {title:'Uma visita fica melhor com planejamento',text:'Confira transporte, condições de acessibilidade e tempo de deslocamento. Para crianças, idosos ou pessoas que precisam de adaptações, procure informações específicas com o local. “Entrada gratuita” não significa necessariamente ausência de agendamento, limite de público ou custos de transporte.'},
      {title:'Ideias para experimentar',items:['Consultar o catálogo e as atividades de uma biblioteca pública.','Procurar visitas mediadas ou ações educativas de museus.','Pesquisar cineclubes e mostras em espaços reconhecidos.','Acompanhar feiras de artesanato e encontros literários da região.','Explorar acervos digitais de instituições culturais.']},
      {title:'A experiência digital também abre portas',text:'Acervos online podem ajudar a conhecer uma instituição antes da visita ou permitir acesso quando o deslocamento não é possível. Observe direitos de reprodução: encontrar uma obra na internet não significa autorização para reutilizá-la comercialmente. Os termos do acervo e a situação de cada obra precisam ser considerados.'},
      {title:'Compartilhe com responsabilidade',text:'Ao fotografar ou divulgar uma atividade, respeite regras do espaço e a privacidade de outras pessoas. Dê crédito aos criadores e confirme informações antes de convidar alguém. Este guia não anuncia eventos específicos nem garante disponibilidade de programação.'}
    ],sources:[{name:'Ibram — Instituto Brasileiro de Museus',url:'https://www.gov.br/museus/pt-br'},{name:'Biblioteca Nacional — acervo e serviços',url:'https://www.gov.br/bn/pt-br'}]
  },
  {
    id:'viagem-planejada',category:'Vida & Cidade',title:'Um passeio melhor começa com um planejamento simples',
    summary:'Do roteiro à acessibilidade, veja o que conferir antes de conhecer um novo destino ou redescobrir sua cidade.',
    image:'city.jpg',alt:'Vista urbana e arquitetura de uma cidade, fotografia ilustrativa',minutes:4,
    sections:[
      {title:'Escolha o ritmo antes da lista de atrações',text:'Um roteiro com muitos pontos pode deixar pouco tempo para aproveitar qualquer um deles. Considere o tempo disponível, o deslocamento e as necessidades de quem vai com você. Um passeio curto e bem organizado pode ser mais agradável que um dia inteiro de correria.'},
      {title:'Confirme informações perto da saída',text:'Horários, regras de entrada e condições de acesso podem mudar. Consulte canais oficiais das atrações e serviços. Verifique também previsão do tempo e orientações da Defesa Civil quando houver risco de chuva intensa, calor extremo ou outros eventos. Uma publicação antiga não confirma que um local continua aberto.'},
      {title:'Checklist do passeio',items:['Definir um orçamento incluindo transporte, alimentação e eventuais ingressos.','Conferir reservas, documentos e política de cancelamento quando aplicável.','Pesquisar condições reais de acessibilidade e apoio no destino.','Separar água e itens necessários conforme a duração e o clima.','Ter um plano alternativo para mudanças de tempo ou fechamento de atrações.']},
      {title:'Respeite o lugar que recebe você',text:'Siga regras de visitação, descarte resíduos corretamente e não entre em áreas restritas para fotografar. Em espaços naturais, procure orientações de segurança e considere acompanhamento habilitado quando necessário. Prestigiar serviços locais pode enriquecer a experiência, mas confirme preços e condições antes de contratar.'},
      {title:'Menos exposição, mais tranquilidade',text:'Pense antes de publicar sua localização em tempo real ou documentos de viagem. Guarde cópias importantes de forma segura e evite enviar dados a contatos sem confirmação. Este conteúdo é um guia geral, não uma oferta de viagem ou avaliação de um destino específico.'}
    ],sources:[{name:'Ministério do Turismo — informações oficiais',url:'https://www.gov.br/turismo/pt-br'},{name:'INMET — previsão e avisos meteorológicos',url:'https://portal.inmet.gov.br/'}]
  },
  {
    id:'organizar-financas',category:'Economia',title:'Organize o dinheiro com uma visão clara do seu mês',
    summary:'Um começo possível para acompanhar entradas, despesas e compromissos, sem fórmulas milagrosas.',
    image:'finance.jpg',alt:'Mesa de trabalho com materiais para planejamento e organização',minutes:5,
    sections:[
      {title:'Antes de cortar, entenda',text:'Anotar o que entra e o que sai ajuda a trocar a sensação de descontrole por informações concretas. Você pode usar caderno, planilha ou aplicativo de sua preferência. Escolha algo simples o suficiente para manter. Em renda variável, diferencie o dinheiro já recebido das expectativas de receita.'},
      {title:'Mapeie compromissos reais',text:'Liste moradia, alimentação, transporte, saúde, contas recorrentes e parcelas já assumidas. Inclua gastos que não aparecem todos os meses, como manutenção e tributos. O objetivo não é classificar escolhas pessoais como certas ou erradas, e sim perceber o que está comprometido e o que pode ser ajustado.'},
      {title:'Um primeiro passo em quatro partes',items:['Reúna extratos, contas e faturas de um período recente.','Agrupe despesas de uma forma que faça sentido para você.','Compare as saídas com a renda efetivamente disponível.','Defina uma ação pequena e revise o resultado no mês seguinte.']},
      {title:'Cuidado com crédito e promessas fáceis',text:'Para comparar crédito, não olhe só a parcela: confira o custo efetivo total, o prazo e o total a pagar. Desconfie de propostas de retorno garantido ou enriquecimento rápido. Não assuma uma nova dívida apenas para aliviar a sensação momentânea de aperto, sem entender o custo e a capacidade de pagamento.'},
      {title:'Quando procurar orientação',text:'Se as dívidas comprometem despesas essenciais, procure canais confiáveis de orientação e negociação. Não forneça documentos a intermediários sem verificar a legitimidade. Este guia não recomenda investimentos, produtos de crédito ou uma estratégia financeira individual; situações pessoais exigem avaliação adequada.'}
    ],sources:[{name:'Banco Central — cidadania financeira',url:'https://www.bcb.gov.br/cidadaniafinanceira'},{name:'CVM — Portal do Investidor',url:'https://www.gov.br/investidor/pt-br'}]
  }
];
