/* Sugestões editoriais locais. Não inventam fatos sobre quem está preenchendo. */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.MossExamples = api;
}(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  var catalog = {
    site: {
      geral: ['Outra área / ainda não sei', 'Meu Negócio Exemplo — marca fictícia', 'Uma apresentação do que meu negócio oferece', 'Apresente o que você faz, quem atende e como trabalha. Substitua este exemplo por informações verdadeiras do seu negócio.', 'Serviço ou produto que você oferece\nOutra opção que seu cliente pode conhecer'],
      confeitaria: ['Confeitaria e doces', 'Doce Exemplo — confeitaria fictícia', 'Bolos e doces para momentos especiais', 'Nesta confeitaria fictícia, o site apresenta opções de bolos e doces. Ao editar, conte quais produtos você realmente faz e como recebe encomendas.', 'Bolos por encomenda\nDoces para festas\nCaixas de doces para presente'],
      restaurante: ['Restaurante e lanchonete', 'Sabor Exemplo — restaurante fictício', 'Conheça os pratos e sabores da nossa cozinha', 'Este restaurante fictício apresenta seus pratos e sua proposta de atendimento. Troque pelas informações reais do seu negócio, sem prometer entregas ou reservas que não oferece.', 'Pratos do dia\nLanches\nBebidas'],
      beleza: ['Salão, barbearia e beleza', 'Beleza Exemplo — negócio fictício', 'Conheça os cuidados que oferecemos', 'Este salão fictício mostra os serviços disponíveis e como conversar sobre um atendimento. Escreva apenas os procedimentos e qualificações que você realmente pode oferecer.', 'Corte de cabelo\nEscova\nCuidados com as unhas'],
      servicos: ['Consertos, limpeza e manutenção', 'Casa Exemplo — negócio fictício', 'Serviços para cuidar do seu espaço', 'Este negócio fictício apresenta serviços residenciais. Na sua versão, explique o que atende e os limites do serviço, sem inventar certificações ou garantias.', 'Pintura de ambientes\nPequenos reparos\nMontagem de móveis'],
      loja: ['Loja e comércio', 'Loja Exemplo — marca fictícia', 'Conheça os produtos da nossa loja', 'Esta loja fictícia usa o site para apresentar suas linhas de produtos. Descreva suas categorias e formas reais de atendimento. Esta prévia não cria carrinho ou pagamento.', 'Roupas e acessórios\nPresentes\nNovidades da loja']
    },
    portfolio: {
      geral: ['Outra área / ainda não sei', 'Alex Exemplo — pessoa fictícia', 'Conheça meus projetos e trabalhos', 'Aqui você pode apresentar seus interesses e a forma como trabalha. Identifique projetos pessoais, estudos e trabalhos reais sem atribuir clientes que não teve.', 'Projeto pessoal — explique a ideia e sua participação\nProjeto de curso — conte o que aprendeu', 'Organização, comunicação e habilidades que você realmente possui.'],
      fotografia: ['Fotografia', 'Alex Exemplo — fotógrafo fictício', 'Fotografia para contar histórias', 'Este portfólio fictício demonstra como apresentar trabalhos de fotografia. Conte seu estilo e identifique se as imagens são estudos, projetos pessoais ou trabalhos autorizados de clientes.', 'Ensaio de família — projeto fictício\nFotografia de eventos — projeto fictício\nEstudo de retratos — projeto pessoal', 'Composição, iluminação e edição — mantenha apenas o que você domina.'],
      design: ['Design e criação visual', 'Alex Exemplo — designer fictício', 'Ideias que ganham forma e identidade', 'Este portfólio reúne exemplos fictícios de projetos visuais. Na sua versão, explique o problema, sua participação e o resultado real, sem inventar métricas.', 'Identidade visual — exercício pessoal\nCartaz — projeto de curso\nApresentação digital — projeto fictício', 'Composição, tipografia e ferramentas que você realmente utiliza.'],
      programacao: ['Programação e tecnologia', 'Alex Exemplo — desenvolvedor fictício', 'Projetos de desenvolvimento web', 'Apresente seus projetos e o que você construiu em cada um. Trabalhos de curso e projetos pessoais também podem entrar, desde que identificados corretamente.', 'Página de apresentação — projeto de curso\nLista de tarefas — exercício pessoal\nCatálogo de produtos — demonstração fictícia', 'HTML, CSS e JavaScript — inclua somente as tecnologias que conhece.'],
      artesanato: ['Artesanato e trabalhos manuais', 'Alex Exemplo — artesão fictício', 'Trabalhos feitos com cuidado e criatividade', 'Este exemplo mostra como apresentar peças e processos artesanais. Use imagens próprias ou autorizadas e descreva materiais e técnicas reais.', 'Peça decorativa — exemplo fictício\nColeção de estudos — projeto pessoal\nPresente artesanal — exemplo fictício', 'Técnicas e materiais com os quais você realmente trabalha.']
    },
    curriculo: {
      geral: ['Outra área / ainda não sei', 'uma oportunidade profissional', 'atividades compatíveis com a vaga escolhida', 'Organização e comunicação — mantenha somente habilidades que possui.'],
      atendimento: ['Atendimento e vendas', 'atendimento ao cliente', 'Atendimento ao público\nApoio à organização da loja', 'Comunicação, escuta e organização — mantenha somente habilidades que possui.'],
      administrativo: ['Administrativo e escritório', 'apoio administrativo', 'Organização de documentos\nApoio às rotinas de escritório', 'Organização, escrita e conhecimentos de informática que realmente possui.'],
      tecnologia: ['Tecnologia e programação', 'tecnologia', 'Desenvolvimento web\nSuporte ou outra atividade que você deseja exercer', 'Tecnologias e ferramentas que você conhece; não inclua conhecimentos que ainda não possui.'],
      logistica: ['Estoque e logística', 'estoque e logística', 'Organização de estoque\nApoio à conferência de materiais', 'Atenção, organização e ferramentas que realmente sabe usar.']
    }
  };
  function areas(kind) {
    return Object.keys(catalog[kind] || {}).map(function (key) { return {value:key, label:catalog[kind][key][0]}; });
  }
  function example(kind, area, level) {
    if (!catalog[kind]) throw new Error('Produto desconhecido.');
    var selected = catalog[kind][area] || catalog[kind].geral;
    var result = {nome:'',titulo:'',apresentacao:'',itens:'',experiencia:'',formacao:'',habilidades:'',contato:'Contato ilustrativo — não disponível'};
    if (kind === 'curriculo') {
      result.nome = 'Alex Exemplo — pessoa fictícia';
      result.titulo = area === 'geral' || !catalog.curriculo[area]
        ? (level === 'primeiro' ? 'Em busca da primeira oportunidade' : level === 'experiente' ? 'Em busca de uma nova oportunidade' : 'Minha apresentação profissional')
        : level === 'primeiro' ? 'Busco minha primeira oportunidade em ' + selected[1] : level === 'experiente' ? 'Busco uma oportunidade em ' + selected[1] : 'Interesse em ' + selected[1];
      result.apresentacao = level === 'primeiro'
        ? 'Busco minha primeira oportunidade em ' + selected[1] + '. Quero aprender e contribuir com as habilidades que já desenvolvi. Ajuste este exemplo para refletir seus interesses reais.'
        : level === 'experiente'
          ? 'Meu interesse é atuar em ' + selected[1] + '. Apresente aqui as atividades e conhecimentos que você realmente desenvolveu; inclua resultados somente quando puder comprová-los.'
          : 'Conte por que deseja trabalhar nesta área e quais conhecimentos reais pode oferecer. Não é necessário inventar empregos anteriores.';
      result.itens = selected[2];
      result.experiencia = level === 'experiente' ? '[Cargo que você realmente exerceu] — [Empresa e período a confirmar]\n[Descreva suas responsabilidades reais. Não mantenha os colchetes na versão final.]' : '';
      result.formacao = '[Sua formação real] — [Instituição e situação do curso]\n[Curso complementar que você realmente fez, se houver]';
      result.habilidades = selected[3];
    } else {
      result.nome = selected[1]; result.titulo = selected[2]; result.apresentacao = selected[3]; result.itens = selected[4];
      if (kind === 'portfolio') { result.formacao = '[Sua formação ou cursos reais, se desejar informar]'; result.habilidades = selected[5]; }
    }
    return {label:selected[0],content:result};
  }
  return {areas:areas, example:example};
}));
