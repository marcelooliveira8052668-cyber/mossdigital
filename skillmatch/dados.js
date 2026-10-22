/* =============================================================
   SkillMatch - dados.js
   Carregamento das vagas + persistência do perfil.
   ============================================================= */

/* -------------------------------------------------------------
   Fallback: cópia das vagas dentro do código.
   Se o fetch falhar (arquivo aberto com dois cliques, sem
   servidor local), o app continua funcionando em vez de
   travar numa tela vazia.
   ------------------------------------------------------------- */
const VAGAS_OFFLINE = [
    { id: 1, empresa: "Tech Solutions", cargo: "Desenvolvedor Front-End Júnior", nivel: "Júnior", requisitos: ["HTML", "CSS", "JavaScript", "Git"], salario: 4500, modalidade: "Remoto", publicado: 2 },
    { id: 2, empresa: "Inova Web", cargo: "Desenvolvedor React Jr", nivel: "Júnior", requisitos: ["HTML", "CSS", "JavaScript", "React", "Git"], salario: 5200, modalidade: "Híbrido", publicado: 5 },
    { id: 3, empresa: "Data Corp", cargo: "Estagiário de Front-End", nivel: "Estágio", requisitos: ["HTML", "CSS"], salario: 2200, modalidade: "Presencial", publicado: 1 },
    { id: 4, empresa: "Creative Studio", cargo: "Web Designer e Desenvolvedor", nivel: "Júnior", requisitos: ["HTML", "CSS", "JavaScript", "Figma"], salario: 4000, modalidade: "Híbrido", publicado: 9 },
    { id: 5, empresa: "NextLevel Code", cargo: "Desenvolvedor Front-End Pleno", nivel: "Pleno", requisitos: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Node.js", "Git"], salario: 9500, modalidade: "Remoto", publicado: 3 },
    { id: 6, empresa: "Startup Growth", cargo: "Frontend Developer", nivel: "Pleno", requisitos: ["HTML", "CSS", "JavaScript", "Vue.js", "Git"], salario: 6800, modalidade: "Remoto", publicado: 7 },
    { id: 7, empresa: "Banco Central Digital", cargo: "Analista de Front-End", nivel: "Pleno", requisitos: ["JavaScript", "TypeScript", "React", "Testes", "Acessibilidade"], salario: 7500, modalidade: "Híbrido", publicado: 4 },
    { id: 8, empresa: "HealthTech Brasil", cargo: "Desenvolvedor Front-End Acessível", nivel: "Pleno", requisitos: ["HTML", "CSS", "JavaScript", "Acessibilidade", "React"], salario: 6500, modalidade: "Remoto", publicado: 6 },
    { id: 9, empresa: "Educa Online", cargo: "Desenvolvedor React Native", nivel: "Pleno", requisitos: ["JavaScript", "React", "React Native", "Git"], salario: 8000, modalidade: "Remoto", publicado: 12 },
    { id: 10, empresa: "Conecta Logística", cargo: "Desenvolvedor Front-End Pleno", nivel: "Pleno", requisitos: ["HTML", "CSS", "JavaScript", "React", "Redux", "GraphQL"], salario: 7000, modalidade: "Presencial", publicado: 8 },
    { id: 11, empresa: "Imobiliária Digital", cargo: "Desenvolvedor Front-End Júnior", nivel: "Júnior", requisitos: ["HTML", "CSS", "JavaScript", "WordPress"], salario: 4200, modalidade: "Remoto", publicado: 11 },
    { id: 12, empresa: "FinTech Aurora", cargo: "Desenvolvedor Front-End Sênior", nivel: "Sênior", requisitos: ["TypeScript", "React", "Next.js", "Testes", "Acessibilidade", "Git"], salario: 14000, modalidade: "Remoto", publicado: 2 }
];

/* -------------------------------------------------------------
   Carrega as vagas: tenta o vagas.json (caminho certo),
   e se der errado usa a cópia embutida.
   ------------------------------------------------------------- */
export async function carregarVagas() {
    try {
        const resposta = await fetch("vagas.json", { cache: "no-store" });
        if (!resposta.ok) throw new Error("HTTP " + resposta.status);
        const dados = await resposta.json();
        if (!Array.isArray(dados) || !dados.length) throw new Error("JSON vazio");
        return dados;
    } catch (erro) {
        console.warn("SkillMatch: usando as vagas embutidas (" + erro.message + ")");
        return VAGAS_OFFLINE.map(v => Object.assign({}, v));
    }
}

/* -------------------------------------------------------------
   Perfil do candidato - localStorage
   ------------------------------------------------------------- */
const CHAVE = "skillmatch_perfil_v1";

export function salvarPerfil(dados) {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(dados));
    } catch (erro) {
        console.warn("SkillMatch: não foi possível salvar o perfil.", erro);
    }
}

export function lerPerfil() {
    try {
        const bruto = localStorage.getItem(CHAVE);
        if (!bruto) return null;
        const dados = JSON.parse(bruto);
        if (!dados || !Array.isArray(dados.habilidades)) return null;
        return dados;
    } catch (erro) {
        return null;
    }
}

export function limparPerfil() {
    try { localStorage.removeItem(CHAVE); } catch (erro) { /* silencioso */ }
}

/* -------------------------------------------------------------
   Tema claro/escuro - também no localStorage
   ------------------------------------------------------------- */
const CHAVE_TEMA = "skillmatch_tema_v1";

export function lerTema() {
    try {
        const salvo = localStorage.getItem(CHAVE_TEMA);
        if (salvo === "claro" || salvo === "escuro") return salvo;
    } catch (erro) { /* silencioso */ }

    /* Sem preferência salva: respeita a do sistema. */
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "claro";
    }
    return "escuro";
}

export function salvarTema(tema) {
    try { localStorage.setItem(CHAVE_TEMA, tema); } catch (erro) { /* silencioso */ }
}
