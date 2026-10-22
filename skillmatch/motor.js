/* =============================================================
   SkillMatch - motor.js
   Núcleo de cálculo: classe Vaga, normalização de habilidades
   e montagem do plano de estudo.
   ============================================================= */

/* -------------------------------------------------------------
   Habilidades canônicas + apelidos.
   O usuário digita "js", "React.js" ou "html5" — tudo vira o
   mesmo nome, para a comparação não falhar por causa de letra
   maiúscula, acento ou abreviação.
   ------------------------------------------------------------- */
const APELIDOS = {
    "js": "JavaScript",
    "javascript": "JavaScript",
    "java script": "JavaScript",
    "html": "HTML",
    "html5": "HTML",
    "css": "CSS",
    "css3": "CSS",
    "ts": "TypeScript",
    "typescript": "TypeScript",
    "react": "React",
    "reactjs": "React",
    "react.js": "React",
    "react js": "React",
    "vue": "Vue.js",
    "vuejs": "Vue.js",
    "vue.js": "Vue.js",
    "vue js": "Vue.js",
    "angular": "Angular",
    "node": "Node.js",
    "nodejs": "Node.js",
    "node.js": "Node.js",
    "node js": "Node.js",
    "node-js": "Node.js",
    "next": "Next.js",
    "nextjs": "Next.js",
    "next.js": "Next.js",
    "next js": "Next.js",
    "react native": "React Native",
    "reactnative": "React Native",
    "git": "Git",
    "github": "Git",
    "figma": "Figma",
    "redux": "Redux",
    "graphql": "GraphQL",
    "wordpress": "WordPress",
    "word press": "WordPress",
    "tailwind": "Tailwind CSS",
    "tailwindcss": "Tailwind CSS",
    "tailwind css": "Tailwind CSS",
    "bootstrap": "Bootstrap",
    "testes": "Testes",
    "teste": "Testes",
    "jest": "Testes",
    "cypress": "Testes",
    "vitest": "Testes",
    "testes unitarios": "Testes",
    "acessibilidade": "Acessibilidade",
    "a11y": "Acessibilidade",
    "wcag": "Acessibilidade",
    "python": "Python",
    "sql": "SQL",
    "scrum": "Scrum",
    "metodologia ageis": "Scrum",
    "scrum agile": "Scrum"
};

/* Remove acento, caixa e espaço sobrando. */
function normalizar(texto) {
    return String(texto || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ");
}

/* Converte o que o usuário digitou (ou o que está no JSON) para o
   nome canônico da habilidade. Se não conhecer, devolve o texto
   limpo — assim dá para cadastrar habilidade nova sem quebrar. */
export function canonizar(habilidade) {
    const chave = normalizar(habilidade);
    if (!chave) return "";
    return APELIDOS[chave] || habilidade.trim().replace(/\s+/g, " ");
}

/* Aplica em uma lista e remove repetições (case-insensitive). */
export function canonizarLista(lista) {
    const saida = [];
    const vistas = new Set();
    (lista || []).forEach(item => {
        const nome = canonizar(item);
        if (nome && !vistas.has(nome.toLowerCase())) {
            vistas.add(nome.toLowerCase());
            saida.push(nome);
        }
    });
    return saida;
}

/* Lê o salário venha como vier: 3500, "R$ 3.500", "3.500,00", "3500.50".
   O dado original do projeto misturava número e texto — uma vaga sem
   salário válido apareceria como "A combinar" por engano. */
function lerSalario(valor) {
    if (typeof valor === "number") {
        return Number.isFinite(valor) && valor > 0 ? valor : 0;
    }
    if (typeof valor !== "string") return 0;

    const limpo = valor.replace(/[^\d.,]/g, "").trim();
    if (!limpo) return 0;

    let numero;
    if (limpo.includes(",")) {
        /* Padrão brasileiro: 3.500,00 → 3500.00 */
        numero = parseFloat(limpo.replace(/\./g, "").replace(",", "."));
    } else if ((limpo.split(".")).length > 1 && (/\.(\d{3})$/).test(limpo)) {
        /* Ponto como milhar: 3.500 → 3500 (sem parte decimal). */
        numero = parseFloat(limpo.replace(/\./g, ""));
    } else {
        numero = parseFloat(limpo);
    }

    return Number.isFinite(numero) && numero > 0 ? numero : 0;
}

/* -------------------------------------------------------------
   Vaga
   ------------------------------------------------------------- */
export class Vaga {
    constructor(dados) {
        this.id = dados.id;
        this.empresa = dados.empresa || "";
        this.cargo = dados.cargo || "";
        this.nivel = dados.nivel || "";
        this.requisitos = canonizarLista(dados.requisitos);
        this.salario = lerSalario(dados.salario);
        this.modalidade = dados.modalidade || "";
        this.publicado = Number(dados.publicado) || 0;

        /* Calculados depois, por segurança. */
        this.compatibilidade = 0;
        this.atendidos = [];
        this.faltantes = [];
        this.classificacao = "";
    }

    /* Percentual de compatibilidade + listas de acerto e falta. */
    calcular(habilidadesUsuario) {
        const perfil = canonizarLista(habilidadesUsuario);
        const chaves = new Set(perfil.map(h => h.toLowerCase()));

        this.atendidos = this.requisitos.filter(req => chaves.has(req.toLowerCase()));
        this.faltantes = this.requisitos.filter(req => !chaves.has(req.toLowerCase()));

        const total = this.requisitos.length || 1;
        this.compatibilidade = Math.round((this.atendidos.length / total) * 100);
        this.classificacao = classificar(this.compatibilidade);

        return this;
    }

    /* Texto pronto do salário, mesmo se vier "R$ 3.500" ou 3500. */
    salarioFormatado() {
        if (!this.salario) return "A combinar";
        return this.salario.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 0
        });
    }

    publicadoTexto() {
        if (!this.publicado) return "";
        if (this.publicado === 1) return "há 1 dia";
        if (this.publicado < 7) return `há ${this.publicado} dias`;
        if (this.publicado < 14) return "há 1 semana";
        if (this.publicado < 30) return `há ${Math.round(this.publicado / 7)} semanas`;
        return `há ${Math.round(this.publicado / 30)} mês(es)`;
    }
}

/* Faixas de qualidade da compatibilidade. */
export function classificar(percentual) {
    const p = Number(percentual) || 0;
    if (p >= 85) return "Excelente";
    if (p >= 70) return "Muito boa";
    if (p >= 50) return "Boa";
    if (p >= 30) return "Parcial";
    return "Baixa";
}

/* Cor associada à faixa (o CSS usa para a barra e o anel). */
export function faixaCor(percentual) {
    const p = Number(percentual) || 0;
    if (p >= 70) return "ok";
    if (p >= 40) return "atencao";
    return "ruim";
}

/* -------------------------------------------------------------
   Plano de estudo
   A promessa do produto: dizer o que estudar PRIMEIRO.
   A prioridade não é "o que falta", e sim "o que falta nas vagas
   que você já quase consegue" — é ali que um pontinho de estudo
   vira entrevista.
   ------------------------------------------------------------- */

/* Quanto cada habilidade pesa quando aparece numa vaga. */
const PESO = {
    "JavaScript": 3, "TypeScript": 3, "React": 3, "HTML": 2, "CSS": 2,
    "Next.js": 3, "Vue.js": 3, "Angular": 3, "Node.js": 3, "Git": 2,
    "Redux": 2, "GraphQL": 2, "React Native": 3, "Testes": 2,
    "Acessibilidade": 2, "Figma": 1, "WordPress": 1, "Tailwind CSS": 2,
    "Bootstrap": 1, "SQL": 2, "Python": 2, "Scrum": 1
};

/* Para onde mandar estudar + quanto tempo leva de verdade. */
const GUIA = {
    "HTML": { onde: "MDN Web Docs — guia de HTML", tempo: "2 semanas" },
    "CSS": { onde: "MDN + CSS-Tricks — layout e Flexbox", tempo: "3 a 4 semanas" },
    "JavaScript": { onde: "freeCodeCamp + JavaScript.info", tempo: "6 a 8 semanas" },
    "TypeScript": { onde: "documentação oficial (handbook)", tempo: "3 semanas" },
    "React": { onde: "react.dev — tutorial oficial", tempo: "4 semanas" },
    "Vue.js": { onde: "vuejs.org — Getting Started", tempo: "3 semanas" },
    "Angular": { onde: "angular.dev — tour of heroes", tempo: "5 semanas" },
    "Next.js": { onde: "nextjs.org — Learn", tempo: "3 semanas" },
    "Node.js": { onde: "Node.js oficial + Express", tempo: "4 semanas" },
    "React Native": { onde: "reactnative.dev — tutorials", tempo: "5 semanas" },
    "Git": { onde: "Oh Shit, Git!?!, depois Pro Git", tempo: "1 semana" },
    "Redux": { onde: "Redux Toolkit — tutorial", tempo: "2 semanas" },
    "GraphQL": { onde: "graphql.org — tutorial interativo", tempo: "2 semanas" },
    "Testes": { onde: "Jest ou Vitest — docs + projeto real", tempo: "3 semanas" },
    "Acessibilidade": { onde: "WAI-Tutorials + axe DevTools", tempo: "2 semanas" },
    "Figma": { onde: "Figma — playground + design system", tempo: "2 semanas" },
    "WordPress": { onde: "WordPress.org — documentação", tempo: "2 semanas" },
    "Tailwind CSS": { onde: "tailwindcss.com — docs", tempo: "1 semana" },
    "Bootstrap": { onde: "getbootstrap.com", tempo: "1 semana" },
    "SQL": { onde: "Mode Analytics — SQL tutorial", tempo: "3 semanas" },
    "Python": { onde: "Python.org — tutorial + Exercism", tempo: "4 semanas" },
    "Scrum": { onde: "Scrum Guide (grátis, 13 páginas)", tempo: "2 dias" }
};

/* Gera o plano: cada habilidade faltando, quanto ela vale e
   em quantas das vagas recomendadas ela aparece. */
export function montarPlano(vagas, habilidadesUsuario) {
    const perfil = new Set(canonizarLista(habilidadesUsuario).map(h => h.toLowerCase()));
    const acertos = new Map();   // habilidade -> em quantas vagas ela aparece
    const peso = new Map();      // habilidade -> soma dos pesos

    vagas.forEach(vaga => {
        vaga.faltantes.forEach(falta => {
            if (perfil.has(falta.toLowerCase())) return;
            acertos.set(falta, (acertos.get(falta) || 0) + 1);
            peso.set(falta, (peso.get(falta) || 0) + (PESO[falta] || 1));
        });
    });

    const plano = Array.from(acertos.entries()).map(([skill, quantas]) => ({
        habilidade: skill,
        quantas,
        peso: peso.get(skill),
        onde: (GUIA[skill] && GUIA[skill].onde) || "documentação oficial da tecnologia",
        tempo: (GUIA[skill] && GUIA[skill].tempo) || "2 a 3 semanas"
    }));

    /* Ordena: primeiro o que aparece em mais vagas; empate decidido
       pelo peso da habilidade (JS pesa mais que WordPress). */
    plano.sort((a, b) => (b.quantas - a.quantas) || (b.peso - a.peso));

    return plano.map((item, indice) => Object.assign(item, {
        prioridade: indice === 0 ? "alta" : indice < 3 ? "média" : "baixa"
    }));
}
