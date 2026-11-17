/* ============================================================
   course.js — dados da MOSS Academy (Formação Front-End Júnior)
   ------------------------------------------------------------
   Tarefas simuladas, baseadas no próprio código desta loja.
   NÃO é um processo seletivo real.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;

  const TOPICS = [
    'HTML semântico','CSS moderno','Flexbox','Grid','Responsividade','JavaScript',
    'DOM','Eventos','Arrays','Objetos','Funções','Promises','async/await','fetch',
    'JSON','APIs REST','Autenticação','Git','GitHub','Testes','Depuração',
    'Acessibilidade','Segurança básica','Organização de projetos','Noções de React'
  ];

  // Cada tarefa: código, título, objetivo, demo (rota/imento), pista, critérios,
  // tópicos relacionados e trecho de código relevante.
  const TASKS = [
    {
      code:'FE-001', title:'Melhore a pesquisa de produtos',
      objective:'A pesquisa deve ignorar acentos e maiúsculas ao buscar no catálogo.',
      demo:'Abra a Loja e digite "fone" ou "FONE" — ambos devem encontrar o fone de ouvido.',
      hint:'A função normalize() remove acentos com NFD e compara em minúsculas.',
      criteria:['normalize() aplicada ao termo e ao nome','Busca retorna resultados com e sem acento','Campo mostra contagem de resultados'],
      topics:['JavaScript','Arrays','Funções'],
      file:'js/core/utils.js → normalize()',
      snippet:"function normalize(str) {\n  return String(str).normalize('NFD')\n    .replace(/[\\u0300-\\u036f]/g, '')\n    .toLowerCase();\n}"
    },
    {
      code:'FE-002', title:'Corrija um erro no carrinho',
      objective:'Ao aumentar a quantidade além do estoque, o sistema deve avisar e bloquear.',
      demo:'No carrinho, tente elevar a quantidade de um produto com estoque baixo.',
      hint:'Valide contra product.stock antes de chamar store.setQty().',
      criteria:['Quantidade nunca ultrapassa o estoque','Mensagem clara ao usuário','Total recalculado corretamente'],
      topics:['JavaScript','DOM','Eventos'],
      file:'js/services/cart.service.js → setQty()',
      snippet:"if (qty > product.stock) {\n  notify.toast('Estoque insuficiente.', 'err');\n  return false;\n}"
    },
    {
      code:'FE-003', title:'Conecte uma API',
      objective:'Entenda como uma API simulada responde com dados no formato JSON.',
      demo:'Abra o Laboratório → módulo "Como uma API responde" e clique nos nós do diagrama.',
      hint:'fetch() retorna uma Promise; use await dentro de uma função async.',
      criteria:['Explicar o que é Promise','Dizer por que await pausa a execução','Identificar o JSON retornado'],
      topics:['Promises','async/await','fetch','JSON','APIs REST'],
      file:'js/services/api.service.js',
      snippet:"async function listar() {\n  const res = await api.get('/products');\n  return res.data;\n}"
    },
    {
      code:'FE-004', title:'Faça a página funcionar no celular',
      objective:'Garanta que nenhum texto seja cortado e o menu caiba na tela pequena.',
      demo:'Reduza a janela abaixo de 700px e abra o menu; depois teste no Laboratório.',
      hint:'Use media queries e grid-template-columns: 1fr em telas estreitas.',
      criteria:['Menu acessível no celular','Sem rolagem horizontal','Botões com área de toque adequada'],
      topics:['CSS moderno','Grid','Responsividade'],
      file:'css/layout.css → @media',
      snippet:"@media (max-width: 620px) {\n  .grid--2, .grid--3 { grid-template-columns: 1fr; }\n}"
    },
    {
      code:'FE-005', title:'Corrija um problema de acessibilidade',
      objective:'Todo botão deve ter texto accessível e o foco deve ser visível.',
      demo:'Navegue só com Tab pela Loja; o foco deve aparecer e os ícones devem ter aria-label.',
      hint:'Use aria-label em botões de ícone e :focus-visible no CSS.',
      criteria:['Navegação por teclado funcional','Foco visível','aria-label nos botões de ícone'],
      topics:['Acessibilidade','HTML semântico','CSS moderno'],
      file:'css/base.css → :focus-visible',
      snippet:':focus-visible {\n  outline: 3px solid var(--accent-500);\n  outline-offset: 2px;\n}'
    },
    {
      code:'FE-006', title:'Adicione um estado de carregamento',
      objective:'Enquanto uma API demora, mostre um indicador visual ao usuário.',
      demo:'No Laboratório, módulo "Como uma API responde", observe o estado "carregando".',
      hint:'Desabilite o botão e mostre "Carregando…" até a Promise resolver.',
      criteria:['Indicador visível durante a espera','Botão desabilitado','Erro tratado com mensagem amigável'],
      topics:['Promises','async/await','DOM'],
      file:'js/services/api.service.js',
      snippet:"btn.disabled = true;\nbtn.textContent = 'Carregando…';\nconst dados = await api.get('/products');\nbtn.disabled = false;"
    },
    {
      code:'FE-007', title:'Crie testes para o cálculo do total',
      objective:'Valide subtotal, desconto do cupom e frete com casos automatizados.',
      demo:'Abra tests/index.html no navegador e clique em "Executar testes".',
      hint:'Teste casos limite: carrinho vazio, cupom inválido e quantidade zero.',
      criteria:['Pelo menos 6 asserções','Casos de sucesso e erro','Nenhum teste chama pagamento real'],
      topics:['Testes','Funções','Depuração'],
      file:'tests/index.html',
      snippet:"assert.equal(calcTotal(subtotal, 10, 20), 27);\n// 100 - 10% = 90; 90 + 20 frete = 110 (exemplo)"
    },
    {
      code:'FE-008', title:'Explique sua solução numa entrevista',
      objective:'Descreva uma mudança usando contexto, decisão e resultado.',
      demo:'Escolha uma tarefa concluída e use o roteiro de explicação abaixo.',
      hint:'Estrutura: "O problema era X. Eu escolhi Y porque Z. O resultado foi W."',
      criteria:['Explicar o problema','Justificar a decisão técnica','Mostrar o resultado observável'],
      topics:['Organização de projetos','Testes','Acessibilidade'],
      file:'Este painel',
      snippet:'Problema → Decisão → Resultado\nExemplo: "O carrinho perdia dados ao recarregar. Escolhi localStorage porque não há backend na demo. Agora o carrinho persiste."'
    }
  ];

  MOSS.course = { topics: TOPICS, tasks: TASKS };
})(window);
