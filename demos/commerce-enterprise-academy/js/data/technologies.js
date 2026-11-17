/* ============================================================
   technologies.js — dados didáticos sobre tecnologias empresariais
   ------------------------------------------------------------
   Ferramentas são apresentadas como ALTERNATIVAS para diferentes
   cenários. Não sugerimos que toda empresa precise de todas.
   Links apontam para a documentação oficial de cada uma.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;

  const GROUPS = [
    { id:'frontend', name:'Front-End', color:'#2f6fed' },
    { id:'backend', name:'Back-End', color:'#1b4576' },
    { id:'database', name:'Banco de dados', color:'#0b1f3a' },
    { id:'hosting', name:'Hospedagem', color:'#275a94' },
    { id:'payments', name:'Pagamentos', color:'#f5a623' },
    { id:'security', name:'Segurança', color:'#d64550' },
    { id:'erp', name:'Gestão empresarial', color:'#7c3f2a' },
    { id:'logistics', name:'Logística', color:'#1f9d6b' },
    { id:'crm', name:'CRM', color:'#6d4aff' },
    { id:'analytics', name:'Análise', color:'#0ea5e9' },
    { id:'monitoring', name:'Monitoramento', color:'#e11d48' },
    { id:'distributed', name:'Arquitetura distribuída', color:'#475569' }
  ];

  // [nome, grupo, finalidade, aplicação prática, quando vale a pena, docs]
  const T = [
    ['HTML','frontend','Estruturar o conteúdo da página de forma semântica.','Marcações como header, main e article organizam a loja.','Sempre: é a base de qualquer site.','https://developer.mozilla.org/pt-BR/docs/Web/HTML'],
    ['CSS','frontend','Definir aparência, layout e responsividade.','Grid e Flexbox organizam o catálogo; media queries adaptam ao celular.','Sempre: junto com HTML e JavaScript.','https://developer.mozilla.org/pt-BR/docs/Web/CSS'],
    ['JavaScript','frontend','Adicionar interatividade e reagir a eventos.','Carrinho, filtros e validações deste projeto usam JS puro.','Quando a interface precisa responder a ações do usuário.','https://developer.mozilla.org/pt-BR/docs/Web/JavaScript'],
    ['React','frontend','Construir interfaces com componentes reutilizáveis.','Split de estados e componentes em aplicações grandes.','Quando a UI é complexa e a equipe já domina o ecossistema.','https://react.dev/'],
    ['Next.js','frontend','Framework React com renderização no servidor e rotas.','Páginas de produto com SEO e carregamento rápido.','Quando SEO e performance são requisitos.','https://nextjs.org/docs'],

    ['Node.js','backend','Executar JavaScript no servidor e criar APIs.','Endpoint que consulta estoque e cria pedidos.','Quando a equipe quer usar JS também no backend.','https://nodejs.org/docs/latest/api/'],
    ['NestJS','backend','Framework Node.js estruturado e escalável.','Organizar módulos, injeção de dependência e validações.','Em sistemas corporativos que exigem organização.','https://docs.nestjs.com/'],
    ['Java','backend','Linguagem robusta para sistemas de grande porte.','Serviços financeiros e de alta concorrência.','Quando há exigência de performance e maturidade.','https://docs.oracle.com/javase/'],
    ['Spring Boot','backend','Framework Java para APIs e microsserviços.','Pagamentos, estoque e integrações ERP.','Em arquiteturas corporativas Java.','https://spring.io/projects/spring-boot'],
    ['.NET','backend','Plataforma da Microsoft para aplicações variadas.','APIs corporativas integradas a ecossistemas Windows.','Quando a empresa já usa tecnologias Microsoft.','https://learn.microsoft.com/dotnet/'],

    ['PostgreSQL','database','Banco relacional para dados estruturados.','Produtos, pedidos, itens e pagamentos deste modelo.','Quando os dados têm relações claras e integridade importa.','https://www.postgresql.org/docs/'],
    ['Supabase','database','Backend como serviço baseado em PostgreSQL.','Auth, RLS e tabelas para protótipos e MVPs.','Para acelerar desenvolvimento com menos infraestrutura.','https://supabase.com/docs'],
    ['Amazon RDS','database','Banco gerenciado na AWS.','PostgreSQL/MySQL com backup e escalabilidade automáticos.','Quando se quer delegar administração do banco.','https://docs.aws.amazon.com/rds/'],
    ['MongoDB','database','Banco de documentos (NoSQL).','Catálogos com estruturas variáveis.','Quando o schema muda com frequência.','https://www.mongodb.com/docs/'],

    ['AWS','hosting','Nuvem com computação, storage e redes.','Hospedar APIs, imagens e bancos em produção.','Quando se precisa de escala e serviços diversificados.','https://docs.aws.amazon.com/'],
    ['Cloudflare','hosting','CDN, DNS e proteção na borda.','Cache de imagens e proteção contra ataques.','Para performance global e segurança perimetral.','https://developers.cloudflare.com/'],
    ['Vercel','hosting','Hospedagem otimizada para front-ends.','Publicar sites estáticos e aplicações Next.js.','Quando o foco é front-end e deploy rápido.','https://vercel.com/docs'],
    ['Azure','hosting','Nuvem da Microsoft.','Aplicações corporativas e integração com .NET.','Quando a empresa já investe no ecossistema Microsoft.','https://learn.microsoft.com/azure/'],

    ['Mercado Pago','payments','Gateway de pagamentos muito usado na América Latina.','Checkout, Pix e cartões com webhooks.','Para aceitar pagamentos reais no Brasil.','https://www.mercadopago.com.br/developers/'],
    ['Stripe','payments','Plataforma de pagamentos com API para desenvolvedores.','Assinaturas, checkout e antifraude.','Quando se quer uma API muito documentada.','https://docs.stripe.com/'],
    ['Adyen','payments','Plataforma global de pagamentos.','Varejo internacional e múltiplos métodos.','Para operações globais de grande escala.','https://docs.adyen.com/'],
    ['Pagar.me','payments','Gateway brasileiro com Pix e cartões.','Split de pagamentos e marketplace.','Para integrações de pagamento no Brasil.','https://docs.pagar.me/'],

    ['Autenticação','security','Confirmar a identidade do usuário.','Login de administradores com Supabase Auth.','Sempre que houver áreas restritas.','https://owasp.org/www-project-cheat-sheets/'],
    ['Autorização','security','Definir o que cada usuário pode fazer.','RLS impede visitantes de alterar pedidos.','Sempre que houver diferentes níveis de acesso.','https://www.postgresql.org/docs/current/ddl-rowsecurity.html'],
    ['HTTPS','security','Criptografar a comunicação cliente-servidor.','TLS no domínio da loja.','Sempre: é requisito mínimo de segurança.','https://developer.mozilla.org/pt-BR/docs/Web/Security'],
    ['RLS','security','Segurança em nível de linha no banco.','Cada cliente vê apenas seus próprios pedidos.','Quando vários usuários compartilham o mesmo banco.','https://supabase.com/docs/guides/database/postgres/row-level-security'],
    ['Antifraude','security','Detectar transações suspeitas.','Análise de perfil e comportamento no checkout.','Em operações com pagamento real.','https://stripe.com/docs/radar'],

    ['Bling','erp','Gestão de estoque, financeiro e notas fiscais.','Sincronizar vendas com o ERP da empresa.','Quando a operação já usa esse sistema.','https://www.bling.com.br/ajuda'],
    ['Omie','erp','ERP em nuvem com gestão empresarial.','Pedidos, financeiro e documentos.','Para integrar a loja ao back-office.','https://help.omie.com.br/'],
    ['TOTVS','erp','Suite de gestão para empresas.','Integração com módulos de distribuição e varejo.','Em médias e grandes empresas.','https://www.totvs.com/'],
    ['SAP','erp','ERP corporativo de grande porte.','Processos complexos de varejo e logística.','Em operações internacionais complexas.','https://help.sap.com/'],

    ['Correios','logistics','Transportadora e serviços postais no Brasil.','Cotação e rastreio de encomendas.','Para entregas em todo o território nacional.','https://www.correios.com.br/'],
    ['Melhor Envio','logistics','Agregador que compara fretes.','Gerar etiquetas com diversas transportadoras.','Para reduzir custo logístico.','https://melhorenvio.com.br/'],
    ['Frenet','logistics','API de cotação de frete.','Calcular prazo e preço no checkout.','Quando se quer integrar várias transportadoras.','https://frenet.io/'],
    ['Intelipost','logistics','Plataforma de gestão logística.','Cotação, etiquetas e rastreamento.','Para operações com volume de entregas.','https://www.intelipost.com.br/'],

    ['Salesforce','crm','Gestão de relacionamento com clientes.','Histórico de compras e campanhas.','Em equipes comerciais estruturadas.','https://developer.salesforce.com/docs'],
    ['HubSpot','crm','CRM + automação de marketing.','Captar leads e nutrir clientes.','Para marketing e vendas integrados.','https://developers.hubspot.com/docs'],
    ['RD Station','crm','Automação de marketing brasileira.','Campanhas e captura de leads.','Para PMEs que fazem marketing digital.','https://www.rdstation.com/'],

    ['Google Analytics 4','analytics','Analisar tráfego e comportamento.','Funil de compra e origem dos visitantes.','Para entender o desempenho da loja.','https://support.google.com/analytics/'],
    ['Power BI','analytics','Visualização de dados e relatórios.','Dashboards de vendas fictícias.','Para apoiar decisões com dados.','https://learn.microsoft.com/power-bi/'],
    ['Looker','analytics','Plataforma de BI sobre o banco.','Métricas consistentes de negócio.','Quando se quer governança de métricas.','https://cloud.google.com/looker/docs'],

    ['Sentry','monitoring','Capturar erros em produção.','Alertas de falhas no front-end e backend.','Para detectar problemas rapidamente.','https://docs.sentry.io/'],
    ['Datadog','monitoring','Observabilidade de aplicações e infra.','Métricas, logs e traces.','Em sistemas distribuídos complexos.','https://docs.datadoghq.com/'],
    ['OpenTelemetry','monitoring','Padrão aberto de telemetria.','Instrumentar traces e métricas.','Para evitar dependência de um único fornecedor.','https://opentelemetry.io/docs/'],

    ['Redis','distributed','Cache e armazenamento em memória.','Cache de catálogo e sessões.','Para acelerar consultas frequentes.','https://redis.io/docs/'],
    ['RabbitMQ','distributed','Fila de mensagens.','Processar pedidos de forma assíncrona.','Para desacoplar serviços.','https://www.rabbitmq.com/documentation.html'],
    ['Kafka','distributed','Plataforma de eventos em streaming.','Pipeline de eventos de vendas.','Quando se processa alto volume de eventos.','https://kafka.apache.org/documentation/'],
    ['Amazon SQS','distributed','Fila gerenciada na AWS.','Processar tarefas em segundo plano.','Quando se quer uma fila simples e gerenciada.','https://docs.aws.amazon.com/AWSSimpleQueueService/']
  ];

  const all = T.map(function (r, i) {
    return {
      id: 't' + i, name: r[0], group: r[1], purpose: r[2], usage: r[3],
      when: r[4], docs: r[5],
      groupName: (GROUPS.find(function (g) { return g.id === r[1]; }) || {}).name || r[1],
      color: (GROUPS.find(function (g) { return g.id === r[1]; }) || {}).color || '#1b4576'
    };
  });

  // Custos: nunca inventamos preços atuais. Onde não há valor confirmado,
  // mostramos "Consultar fornecedor". Nenhum número aqui é uma cotação real.
  const COSTS = [
    { item:'Desenvolvimento do site', value:'Consultar fornecedor', note:'Depende do escopo e da equipe.' },
    { item:'Domínio', value:'Consultar fornecedor', note:'Varia por registrador e extensão.' },
    { item:'Hospedagem', value:'Consultar fornecedor', note:'Plataformas estáticas podem ter plano gratuito.' },
    { item:'Banco de dados', value:'Consultar fornecedor', note:'Planos free tier existem para testes.' },
    { item:'Tarifas de pagamentos', value:'Consultar fornecedor', note:'Percentuais variam por modalidade e contrato.' },
    { item:'Custos de frete', value:'Consultar fornecedor', note:'Cotação depende de peso, dimensões e região.' },
    { item:'Manutenção', value:'Consultar fornecedor', note:'Correções, atualizações e monitoramento.' },
    { item:'Serviços empresariais opcionais', value:'Consultar fornecedor', note:'ERP, CRM e automações.' }
  ];

  MOSS.technologies = { groups: GROUPS, all: all, costs: COSTS };
})(window);
