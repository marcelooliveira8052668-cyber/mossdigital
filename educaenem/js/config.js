/* =============================================================================
   EducaEnem — CONFIGURAÇÃO CENTRAL DO SITE
   -----------------------------------------------------------------------------
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR para deixar o site com a
   sua cara e para CONECTAR O SEU BANCO DE DADOS / SERVIDOR.

   Nada aqui quebra o site se ficar em branco: por padrão ele funciona 100%
   no navegador (localStorage). Quando você tiver um servidor/banco, basta
   preencher a seção "backend" e mudar o modo para "api".
   ============================================================================= */

window.EDUCA_CONFIG = {
  /* ---------------------------------------------------------------------------
     1. IDENTIDADE DA ESCOLA / PROFESSOR
     --------------------------------------------------------------------------- */
  escola: {
    nome: "EducaEnem",
    slogan: "Preparação completa para o ENEM 2026",
    professor: "Marcelo Oliveira",
    ano: "2026",
    email: "contato@educaenem.com",
    // WhatsApp no formato DDI+DDD+número, apenas dígitos (ex.: 5511987654321)
    whatsapp: "5511999999999",
  },

  /* ---------------------------------------------------------------------------
     2. PAGAMENTO PIX  (usado pela loja — curso.html)
     Troque pela chave PIX real do recebedor. O QR Code gerado é um BR Code
     oficial do Banco Central e funciona em qualquer banco.
     --------------------------------------------------------------------------- */
  pix: {
    chave: "pix@educaenem.com", // e-mail, telefone (+55...), CPF/CNPJ ou chave aleatória
    beneficiario: "MARCELO OLIVEIRA", // nome do recebedor (máx. 25 caracteres)
    cidade: "SÃO PAULO", // cidade do recebedor (máx. 25 caracteres)
    expiracaoMin: 30, // validade exibida do QR Code (minutos)
  },

  /* ---------------------------------------------------------------------------
     3. PREÇOS DO CURSO (em reais)
     -- VALORES DEIXADOS EM ZERO PARA PLANO GRÁTIS --
     O site funciona 100% no modo gratuito. Quem quiser contribuir ou
     apoiar o projeto pode entrar em contato pelo e-mail institucional.
     --------------------------------------------------------------------------- */
  precos: {
    curso: 0, // pacote completo (todas as disciplinas, o ano inteiro)
    porArea: {
      natureza: 0,
      matematica: 0,
      linguagens: 0,
      humanas: 0,
    },
    disciplina: 0, // valor de cada disciplina avulsa
    aula: 0, // valor de UMA aula/conteúdo avulso (compre só o que precisa)
  },

  /* Cupons de desconto: código -> fração (0.1 = 10%) */
  cupons: {
    ENEM10: 0.1,
    BOLSA20: 0.2, // bolsa para quem tem cadastro no Programa Bolsa Família / escola pública
    PRIMEIRAAULA: 0.15,
  },

  /* ---------------------------------------------------------------------------
     3b. PLANO GRÁTIS  <<< ESTE É O MODELO DO SITE >>>
     Todo estudante pode criar uma conta grátis e estudar com uma cota mensal.
     Quem quiser ir além, compra o curso (ou uma área/disciplina) na loja.
     - ativo: false  ->  todo o conteúdo fica liberado para quem está logado
     - cotas: quantas questões e aulas o aluno grátis pode usar por mês
     - rotasPagas: telas que consomem cota / exigem plano pago
     --------------------------------------------------------------------------- */
  plano: {
    gratis: {
      ativo: true,
      cotas: {
        questoes: 60, // questões respondidas por mês (grátis)
        aulas: 20, // aulas/textos/atividades abertos por mês (grátis)
      },
      rotasPagas: [
        "aula",
        "texto",
        "atividade",
        "simulado",
        "projeto",
        "gravacao",
        // Vestibulares: a apresentação (vestibulares/vestibular) é aberta para
        // visitante ver o que o curso oferece; as leituras longas e o banco de
        // questões do estilo da banca consomem cota como o restante do curso.
        "vtexto",
        "vquestoes",
      ],
    },

    /* Textos usados na tela de limite / "libere o conteúdo" */
    mensagens: {
      titulo: "Você chegou ao limite do plano grátis",
      corpo:
        "Seu plano grátis deste mês foi usado. Com o curso completo você estuda sem limite em todas as disciplinas, o ano inteiro — por menos de R$ 100, à vista no Pix.",
      cta: "Ver planos e preços",
      semConta: "Crie sua conta grátis e comece a estudar agora.",
    },
  },

  /* ---------------------------------------------------------------------------
     4. BACKEND / BANCO DE DADOS  <<< A "PORTA" PARA CONECTAR O SEU SISTEMA >>>
     - modo "local": os dados ficam no navegador do usuário (localStorage).
       Perfeito para demonstração, testes e uso individual.
     - modo "api": o site passa a conversar com o SEU servidor via HTTP (REST).
       Preencha baseUrl com o endereço do seu backend e, se usar autenticação,
       a apiKey (enviada no cabeçalho Authorization).
     Veja backend/README.md e backend/api.md para o contrato completo
     e backend/exemplo-servidor.js para um servidor pronto para usar.
     --------------------------------------------------------------------------- */
  backend: {
    modo: "local", // "local" | "api"
    baseUrl: "", // ex.: "https://api.suaescola.com"  (sem barra no final)
    apiKey: "", // token opcional (Bearer)
    timeout: 15000, // tempo máximo de espera (ms)

    // Caminhos dos recursos no seu servidor (podem ficar assim)
    recursos: {
      usuarios: "/usuarios",
      login: "/login",
      notas: "/notas",
      submissoes: "/submissoes",
      pedidos: "/pedidos",
      textos: "/textos",
      textosExtra: "/textos-extra",
      aulas: "/aulas",
      matriculas: "/matriculas",
      provas: "/provas",
    },
  },

  /* ---------------------------------------------------------------------------
     5. INTEGRAÇÕES OPCIONAIS (preencha só se for usar)
     Se preferir um serviço pronto em vez de servidor próprio, dá para ligar
     Supabase ou Firebase. Deixe em branco para não usar.
     --------------------------------------------------------------------------- */
  integracoes: {
    supabase: { url: "", anonKey: "" },
    firebase: { apiKey: "", authDomain: "", projectId: "" },
  },

  /* ---------------------------------------------------------------------------
     6. RECURSOS DO SITE (ligar/desligar)
     --------------------------------------------------------------------------- */
  recursosSite: {
    loja: true, // área de compra com PIX
    gravacoes: true, // estúdio/galeria de aulas gravadas
    professorVirtual: true, // tira-dúvidas automático
    simulado: true,
  },
};

/* Atalho global opcional */
window.EDUCA_CONFIG_OK = true;
