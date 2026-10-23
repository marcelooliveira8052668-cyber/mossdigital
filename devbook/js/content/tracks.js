/* ═══════════════════════════════════════════════════════
   DevBook — TRILHAS DE CARREIRA
   Front-end, Back-end e Full Stack. `chapters` referencia ids do currículo.
   ═══════════════════════════════════════════════════════ */

const TRACKS = [
  {
    id: "frontend",
    icon: "🎨",
    name: "Trilha Front-End",
    tagline: "Interfaces que as pessoas amam usar",
    color: "purple",
    chapters: ["html-fundamentos", "css-fundamentos", "js-fundamentos", "js-assincrono", "react-fundamentos", "react-hooks", "git-github", "nextjs", "testes"],
    projects: ["pj-dashboard", "pj-ecommerce"],
    skills: ["HTML/CSS semântico", "JavaScript moderno", "React + Hooks", "Next.js + SSR", "Acessibilidade", "Testes de UI", "Git workflow"]
  },
  {
    id: "backend",
    icon: "⚙️",
    name: "Trilha Back-End",
    tagline: "APIs rápidas, seguras e escaláveis",
    color: "accent",
    chapters: ["js-fundamentos", "js-assincrono", "node-backend", "sql-banco", "arquitetura", "testes", "docker-deploy", "git-github", "typescript"],
    projects: ["pj-api-tarefas", "pj-ecommerce"],
    skills: ["Node.js + Express", "SQL + modelagem", "REST + middleware", "Auth (JWT/bcrypt)", "Validação (Zod)", "Testes de API", "Docker", "TypeScript"]
  },
  {
    id: "fullstack",
    icon: "🧩",
    name: "Trilha Full Stack",
    tagline: "Do zero ao produto completo",
    color: "success",
    chapters: ["html-fundamentos", "css-fundamentos", "js-fundamentos", "js-assincrono", "git-github", "react-fundamentos", "react-hooks", "node-backend", "sql-banco", "typescript", "arquitetura", "testes", "nextjs", "docker-deploy", "deploy"],
    projects: ["pj-dashboard", "pj-api-tarefas", "pj-ecommerce"],
    skills: ["Tudo da trilha front + back", "Integração front↔API", "Modelagem de dados", "Deploy e infraestrutura", "Boas práticas de engenharia"]
  }
]
