/* ═══════════════════════════════════════════════════════
   DevBook — PROJETOS INTEGRADORES
   Projetos de portfólio com escopo, requisitos pontuados e bônus.
   ═══════════════════════════════════════════════════════ */

const PROJECTS = [
{
  id: "pj-dashboard",
  icon: "📊",
  name: "Dashboard de Vendas",
  part: "Projetos Integradores",
  level: "medium",
  hours: 12,
  track: ["frontend"],
  stack: ["HTML", "CSS", "JavaScript", "Chart.js"],
  brief: "Painel administrativo com gráficos interativos, tabela de vendas e filtro por período.",
  requirements: [
    { id: "p1", title: "Layout com CSS Grid", points: 20, desc: "Sidebar fixa + área de conteúdo com grid responsivo (desktop e mobile)." },
    { id: "p2", title: "Gráfico de vendas", points: 20, desc: "Renderizar gráfico de barras/linha com dados de exemplo (usando Chart.js ou SVG puro)." },
    { id: "p3", title: "Filtro por período", points: 15, desc: "Select com '7 dias / 30 dias / 12 meses' que atualiza os gráficos e a tabela." },
    { id: "p4", title: "Tabela de vendas com busca", points: 15, desc: "Tabela paginada, ordenável por coluna e com busca por texto (input que filtra em tempo real)." },
    { id: "p5", title: "Cards de KPI", points: 15, desc: "Exibir total de vendas, ticket médio e número de pedidos — calculados dos dados." },
    { id: "p6", title: "Estado vazio e carregando", points: 15, desc: "Tratar casos de 'sem resultados' e um skeleton/shimmer durante carregamento simulado." }
  ],
  bonus: [
    "Persistir preferências de filtro em localStorage",
    "Exportar CSV dos dados filtrados",
    "Dark mode no dashboard"
  ],
  tips: [
    "Quebre o dashboard em componentes: <Sidebar>, <KpiCard>, <SalesChart>, <SalesTable>.",
    "Guarde os dados num arquivo JS e simule uma API com setTimeout para ver o estado de carregamento."
  ]
},
{
  id: "pj-api-tarefas",
  icon: "⚙️",
  name: "API REST de Tarefas",
  part: "Projetos Integradores",
  level: "medium",
  hours: 14,
  track: ["backend", "fullstack"],
  stack: ["Node.js", "Express", "SQL", "JWT"],
  brief: "API completa de gerenciamento de tarefas com autenticação, validação e persistência em banco relacional.",
  requirements: [
    { id: "p1", title: "CRUD completo", points: 20, desc: "GET (listar/filtrar), GET por id, POST, PATCH e DELETE de tarefas." },
    { id: "p2", title: "Banco relacional", points: 20, desc: "Persistir em PostgreSQL ou SQLite. Tabela tarefas com id, titulo, descricao, concluida, criada_em, usuario_id." },
    { id: "p3", title: "Autenticação JWT", points: 20, desc: "Cadastro + login gerando JWT. Senhas com bcrypt. Middleware protegendo rotas privadas." },
    { id: "p4", title: "Validação com Zod", points: 15, desc: "Validar corpo de todas as requisições e devolver 400 com mensagens claras quando inválido." },
    { id: "p5", title: "Isolamento por usuário", points: 15, desc: "Cada usuário vê/edita apenas as próprias tarefas. Testar que não vaza dado alheio." },
    { id: "p6", title: "Testes automatizados", points: 10, desc: "Testes de integração das rotas principais com supertest — no mínimo: criar, listar, rejeitar vazio." }
  ],
  bonus: [
    "Paginação e ordenação na listagem",
    "Endpoint de estatísticas (tarefas por status)",
    "Documentação da API com README/OpenAPI"
  ],
  tips: [
    "Organize em camadas: routes → controllers → services → repositories.",
    "Se autenticação está derrogando atenção, use um middleware simples que confere um header estático — depois evolua para JWT."
  ]
},
{
  id: "pj-ecommerce",
  icon: "🛒",
  name: "Loja Online Full Stack",
  part: "Projetos Integradores",
  level: "hard",
  hours: 30,
  track: ["fullstack", "frontend", "backend"],
  stack: ["React", "Node.js", "PostgreSQL", "JWT", "CSS"],
  brief: "E-commerce completo: catálogo, carrinho, checkout, autenticação e painel admin. Projeto de portfólio.",
  requirements: [
    { id: "p1", title: "Autenticação completa", points: 15, desc: "Cadastro, login, logout. Token JWT com refresh. Rota protegida no frontend." },
    { id: "p2", title: "Catálogo de produtos", points: 15, desc: "Listagem com paginação, busca e filtro por categoria/preço. Página de detalhe do produto." },
    { id: "p3", title: "Carrinho de compras", points: 20, desc: "Adicionar/remover itens, persistir carrinho (localStorage ou no servidor para logados), calcular total." },
    { id: "p4", title: "Checkout e pedidos", points: 20, desc: "Formulário de entrega, criar pedido no banco, decrementar estoque, página de 'pedido confirmado'." },
    { id: "p5", title: "Painel administrativo", points: 15, desc: "CRUD de produtos (só admin), listagem de pedidos, métricas de venda." },
    { id: "p6", title: "Banco e modelagem", points: 15, desc: "Tabelas relacionadas: users, products, categories, orders, order_items. Relationships e foreign keys." }
  ],
  bonus: [
    "Página de pedidos do usuário com status",
    "Cupom de desconto",
    "Avaliações dos produtos",
    "Deploy com Docker e domínio próprio"
  ],
  tips: [
    "Comece pelo backend (API + banco). O frontend vem depois — saber os dados disponíveis facilita a UI.",
    "Use o projeto de API de tarefas como base: você já tem auth e camadas prontas."
  ]
}
]
