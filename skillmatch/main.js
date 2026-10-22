/* =============================================================
   SkillMatch - main.js
   Orquestra: perfil -> cálculo -> filtros -> tela.
   ============================================================= */

import { Vaga, canonizarLista, montarPlano } from "./motor.js";
import { carregarVagas, salvarPerfil, lerPerfil, lerTema, salvarTema } from "./dados.js";
import { renderizarCards, renderizarResumo, renderizarPlano, mostrarMensagem } from "./ui.js";

const $ = sel => document.querySelector(sel);

/* Estado da tela (guardado para os filtros re-renderizarem sem
   recalcular tudo do zero). */
let VAGAS_TODAS = [];
let VAGAS_ATUAIS = [];
let PERFIL = { nome: "", habilidades: [] };

/* -------------------------------------------------------------
   Sugestões clicáveis — o usuário não precisa decorar as
   habilidades que o mercado pede.
   ------------------------------------------------------------- */
const SUGESTOES = ["HTML", "CSS", "JavaScript", "React", "TypeScript",
    "Git", "Node.js", "Vue.js", "Figma", "Acessibilidade", "Testes", "Redux"];

/* -------------------------------------------------------------
   Análise principal
   ------------------------------------------------------------- */
async function analisar(evento) {
    if (evento) evento.preventDefault();

    const campoNome = $("#nome");
    const campoHab = $("#habilidades");

    const nome = campoNome.value.trim();
    const habilidades = canonizarLista(campoHab.value.split(","));

    if (!nome) {
        mostrarMensagem($("#container-vagas"), "Digite seu nome para começar.");
        campoNome.focus();
        return;
    }
    if (!habilidades.length) {
        mostrarMensagem($("#container-vagas"), "Digite pelo menos uma habilidade (ex: HTML, CSS, JavaScript).");
        campoHab.focus();
        return;
    }

    /* Mostra o que está processando. */
    $("#secao-resultados").hidden = false;
    $("#filtros").hidden = false;
    $("#container-vagas").innerHTML = '<p class="carregando" role="status">Analisando vagas...</p>';
    $("#resumo").hidden = true;
    $("#secao-plano").hidden = true;

    /* Persistência do perfil. */
    PERFIL = { nome, habilidades };
    salvarPerfil(PERFIL);

    /* Se o JSON ainda não chegou, carrega. */
    if (!VAGAS_TODAS.length) {
        const brutas = await carregarVagas();
        VAGAS_TODAS = brutas.map(v => new Vaga(v));
    }

    /* Calcula compatibilidade de todas as vagas. */
    VAGAS_ATUAIS = VAGAS_TODAS.map(v => {
        const copia = Object.assign(
            Object.create(Vaga.prototype),
            v,
            { atendidos: [], faltantes: [], compatibilidade: 0, classificacao: "" }
        );
        return copia.calcular(PERFIL.habilidades);
    });

    pintarPlano();
    aplicarFiltros();

    /* Rola até os resultados em telas pequenas. */
    if (window.innerWidth < 760) {
        $("#secao-resultados").scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

/* -------------------------------------------------------------
   Plano de estudo geral (bloco grande)
   ------------------------------------------------------------- */
function pintarPlano() {
    const plano = montarPlano(VAGAS_ATUAIS, PERFIL.habilidades);
    renderizarPlano(plano, $("#corpo-plano"));
    $("#secao-plano").hidden = !plano.length;
}

/* -------------------------------------------------------------
   Filtros + ordenação
   ------------------------------------------------------------- */
function aplicarFiltros() {
    const modalidade = $("#fModalidade").value;
    const minimo = Number($("#fMinimo").value);
    const ordem = $("#fOrdem").value;

    let lista = VAGAS_ATUAIS.filter(v =>
        (modalidade === "todas" || v.modalidade === modalidade) &&
        v.compatibilidade >= minimo
    );

    if (ordem === "compat") lista.sort((a, b) => b.compatibilidade - a.compatibilidade);
    if (ordem === "salario") lista.sort((a, b) => b.salario - a.salario);
    if (ordem === "recentes") lista.sort((a, b) => a.publicado - b.publicado);
    if (ordem === "nivel") lista.sort((a, b) => ordemNivel(a.nivel) - ordemNivel(b.nivel));

    renderizarResumo($("#resumo"), {
        total: VAGAS_ATUAIS.length,
        visiveis: lista.length,
        melhor: lista.length ? lista[0].compatibilidade : 0,
        perfil: PERFIL.nome
    });

    renderizarCards(lista, $("#container-vagas"));
}

function ordemNivel(nivel) {
    const ordem = { "Estágio": 0, "Júnior": 1, "Pleno": 2, "Sênior": 3 };
    return ordem[nivel] == null ? 9 : ordem[nivel];
}

function limparFiltros() {
    $("#fModalidade").value = "todas";
    $("#fMinimo").value = "0";
    $("#fOrdem").value = "compat";
    aplicarFiltros();
}

/* -------------------------------------------------------------
   Chips de sugestão de habilidades
   ------------------------------------------------------------- */
function pintarSugestoes() {
    const caixa = $("#sugestoes");
    caixa.innerHTML = "";

    SUGESTOES.forEach(skill => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "chip-sugestao";
        btn.textContent = skill;
        btn.setAttribute("aria-pressed", "false");
        btn.addEventListener("click", () => adicionarHabilidade(skill, btn));
        caixa.appendChild(btn);
    });
}

function adicionarHabilidade(skill, botao) {
    const campo = $("#habilidades");
    const atuais = canonizarLista(campo.value.split(","));

    const jaTem = atuais.some(a => a.toLowerCase() === skill.toLowerCase());
    if (jaTem) {
        campo.value = atuais.filter(a => a.toLowerCase() !== skill.toLowerCase()).join(", ");
        botao.setAttribute("aria-pressed", "false");
        botao.classList.remove("ativo");
    } else {
        atuais.push(skill);
        campo.value = atuais.join(", ");
        botao.setAttribute("aria-pressed", "true");
        botao.classList.add("ativo");
    }
    campo.focus();
}

/* Destaca os chips que já estão no campo. */
function sincronizarSugestoes() {
    const atuais = new Set(canonizarLista($("#habilidades").value.split(",")).map(h => h.toLowerCase()));
    document.querySelectorAll(".chip-sugestao").forEach(btn => {
        const dentro = atuais.has(btn.textContent.toLowerCase());
        btn.classList.toggle("ativo", dentro);
        btn.setAttribute("aria-pressed", dentro ? "true" : "false");
    });
}

/* -------------------------------------------------------------
   Tema
   ------------------------------------------------------------- */
function aplicarTema(tema) {
    document.documentElement.setAttribute("data-tema", tema);
    const botao = $("#btnTema");
    const escuro = tema === "escuro";
    botao.textContent = escuro ? "☀️" : "🌙";
    botao.setAttribute("aria-label", escuro ? "Mudar para tema claro" : "Mudar para tema escuro");
    botao.setAttribute("title", escuro ? "Tema claro" : "Tema escuro");
    salvarTema(tema);
}

/* -------------------------------------------------------------
   Inicialização
   ------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    /* Tema */
    aplicarTema(lerTema());
    $("#btnTema").addEventListener("click", () => {
        const atual = document.documentElement.getAttribute("data-tema");
        aplicarTema(atual === "escuro" ? "claro" : "escuro");
    });

    /* Sugestões */
    pintarSugestoes();
    $("#habilidades").addEventListener("input", sincronizarSugestoes);

    /* Perfil salvo */
    const salvo = lerPerfil();
    if (salvo) {
        $("#nome").value = salvo.nome || "";
        $("#habilidades").value = (salvo.habilidades || []).join(", ");
        sincronizarSugestoes();
    }

    /* Formulário */
    $("#form-perfil").addEventListener("submit", analisar);

    /* Filtros */
    ["#fModalidade", "#fMinimo", "#fOrdem"].forEach(sel => {
        const el = $(sel);
        el.addEventListener("change", () => { if (VAGAS_ATUAIS.length) aplicarFiltros(); });
    });

    /* Limpar filtros (delegação: o botão pode nascer dinamicamente) */
    $("#container-vagas").addEventListener("click", ev => {
        if (ev.target.id === "btnLimparFiltros") limparFiltros();
    });

    /* Ação do card (demonstração: nada de link quebrado) */
    $("#container-vagas").addEventListener("click", ev => {
        const acao = ev.target.closest(".card__acao");
        if (!acao) return;
        ev.preventDefault();
        const empresa = acao.getAttribute("data-empresa") || "";
        window.alert("Vaga da " + empresa + "\n\nNesta demonstração o botão não sai daqui. " +
            "Num site publicado, aqui abre a página da vaga ou o formulário de candidatura.");
    });
});
