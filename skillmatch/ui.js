/* =============================================================
   SkillMatch - ui.js
   Renderização da tela: resumo, cards, plano de estudo e
   mensagens de estado vazio.
   ============================================================= */

import { faixaCor } from "./motor.js";

/* Todo texto que vem de fora (JSON, digitação do usuário) passa
   por aqui antes de entrar no innerHTML. Evita XSS. */
export function escapar(texto) {
    return String(texto == null ? "" : texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/* Badge do nível (slug limpo, sem acento). */
function badgeNivel(nivel) {
    if (!nivel) return "";
    const slugs = { "Estágio": "estagio", "Júnior": "junior", "Pleno": "pleno", "Sênior": "senior" };
    const classe = slugs[nivel] || "geral";
    return `<span class="badge badge--${classe}">${escapar(nivel)}</span>`;
}

/* Um card de vaga inteiro. */
function modeloCard(vaga) {
    const cor = faixaCor(vaga.compatibilidade);
    const dias = vaga.publicadoTexto();

    const listaFaltantes = vaga.faltantes.length
        ? vaga.faltantes.map(f => `<li class="chip chip--falta">${escapar(f)}</li>`).join("")
        : `<li class="chip chip--ok">Você tem tudo</li>`;

    const listaAtendidos = vaga.atendidos.length
        ? vaga.atendidos.map(a => `<li class="chip chip--tem">${escapar(a)}</li>`).join("")
        : "";

    return `
    <article class="card card--${cor}" aria-labelledby="vaga-${vaga.id}">
      <div class="card__topo">
        ${badgeNivel(vaga.nivel)}
        <span class="card__data">${dias ? escapar(dias) : "Hoje"}</span>
      </div>

      <h3 class="card__cargo" id="vaga-${vaga.id}">${escapar(vaga.cargo)}</h3>
      <p class="card__empresa">${escapar(vaga.empresa)}</p>

      <ul class="card__meta">
        <li title="Salário mensal">${escapar(vaga.salarioFormatado())}</li>
        <li><span class="ponto ponto--${cor}" aria-hidden="true"></span>${escapar(vaga.modalidade)}</li>
      </ul>

      <div class="match" role="group" aria-label="Compatibilidade: ${vaga.compatibilidade} por cento">
        <div class="match__cabecalho">
          <span class="match__rotulo">Compatibilidade</span>
          <span class="match__valor match__valor--${cor}">${vaga.compatibilidade}%</span>
        </div>
        <div class="match__trilha" aria-hidden="true">
          <div class="match__preencher match__preencher--${cor}" style="width:${vaga.compatibilidade}%"></div>
        </div>
        <span class="match__nota">${escapar(vaga.classificacao)}</span>
      </div>

      <div class="reqs">
        <p class="reqs__titulo" id="falta-${vaga.id}">Requisitos</p>
        <ul class="chips" aria-labelledby="falta-${vaga.id}">
          ${listaAtendidos}
          ${listaFaltantes}
        </ul>
      </div>

      <details class="plano">
        <summary>Como chegar a 100% nesta vaga</summary>
        <div class="plano__corpo">
          ${modeloPlanoRapido(vaga)}
        </div>
      </details>

      <button type="button" class="card__acao" data-empresa="${escapar(vaga.empresa)}"
         aria-label="Ver detalhes da vaga ${escapar(vaga.cargo)} na ${escapar(vaga.empresa)}">
        Ver vaga
      </button>
    </article>`;
}

/* O "como chegar a 100%" de um card: lista o que falta na ordem
   de importância e onde estudar cada um. */
function modeloPlanoRapido(vaga) {
    if (!vaga.faltantes.length) {
        return `<p class="plano__ok">Seu perfil bate com todos os requisitos.
          Candidate-se agora — você está no topo da fila.</p>`;
    }

    const ordem = ["TypeScript", "React", "JavaScript", "Next.js", "Redux",
        "GraphQL", "Node.js", "Vue.js", "React Native", "Testes",
        "Acessibilidade", "Git", "Figma", "HTML", "CSS",
        "WordPress", "Tailwind CSS", "Bootstrap", "SQL", "Python", "Scrum"];

    const ordenados = vaga.faltantes.slice().sort((a, b) => {
        const ia = ordem.indexOf(a); const ib = ordem.indexOf(b);
        return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });

    const linhas = ordenados.map((falta, i) => `
      <li class="passo">
        <span class="passo__num">${i + 1}</span>
        <span class="passo__texto">
          <b>${escapar(falta)}</b>
          <small>${i === 0 ? "Comece por aqui" : "Depois disso"}</small>
        </span>
      </li>`).join("");

    return `<ol class="passos">${linhas}</ol>`;
}

/* -------------------------------------------------------------
   Resumo acima dos resultados
   ------------------------------------------------------------- */
export function renderizarResumo(container, dados) {
    const { total, visiveis, melhor, perfil } = dados;

    if (!visiveis) {
        container.innerHTML = "";
        container.hidden = true;
        return;
    }

    container.hidden = false;
    container.innerHTML = `
      <p class="resumo__linha">
        <strong>${visiveis}</strong> de <strong>${total}</strong> vagas
        ${visiveis === 1 ? "compatível" : "compatíveis"} com o perfil de
        <strong>${escapar(perfil)}</strong>
      </p>
      <p class="resumo__melhor">
        Melhor compatibilidade:
        <strong class="match__valor--${faixaCor(melhor)}">${melhor}%</strong>
      </p>`;
}

/* -------------------------------------------------------------
   Lista de cards
   ------------------------------------------------------------- */
export function renderizarCards(vagas, container) {
    container.innerHTML = "";

    if (!vagas.length) {
        container.appendChild(montarVazio());
        return;
    }

    /* Fragment: evita reflow a cada card. */
    const frag = document.createDocumentFragment();
    vagas.forEach(vaga => {
        const temp = document.createElement("template");
        temp.innerHTML = modeloCard(vaga).trim();
        frag.appendChild(temp.content.firstElementChild);
    });
    container.appendChild(frag);
}

/* Estado vazio — nunca uma tela em branco. */
function montarVazio() {
    const div = document.createElement("div");
    div.className = "vazio";
    div.setAttribute("role", "status");
    div.innerHTML = `
      <span class="vazio__ico" aria-hidden="true">&#128269;</span>
      <h3>Nenhuma vaga compatível com esses filtros</h3>
      <p>Tente incluir mais habilidades no seu perfil ou afrouxe o
         filtro de compatibilidade mínima.</p>
      <button type="button" id="btnLimparFiltros" class="btn btn--fantasma">
        Limpar filtros
      </button>`;
    return div;
}

/* Mensagem de erro (fetch falhou de um jeito que nem o fallback
   resolveu, ou o JSON veio corrompido). */
export function mostrarMensagem(container, mensagem) {
    container.innerHTML = `<p class="erro" role="alert">${escapar(mensagem)}</p>`;
}

/* -------------------------------------------------------------
   Plano de estudo geral (bloco grande, abaixo dos cards)
   ------------------------------------------------------------- */
export function renderizarPlano(plano, container) {
    if (!plano.length) {
        container.hidden = true;
        container.innerHTML = "";
        return;
    }

    container.hidden = false;

    const linhas = plano.slice(0, 6).map((item, i) => `
      <li class="estudo estudo--${item.prioridade}">
        <span class="estudo__prio">${escapar(item.prioridade)}</span>
        <div class="estudo__corpo">
          <h4>${escapar(item.habilidade)}</h4>
          <p>Aparece em <b>${item.quantas}</b>
             ${item.quantas === 1 ? "vaga recomendada" : "vagas recomendadas"}</p>
          <p class="estudo__onde">Onde estudar: ${escapar(item.onde)}</p>
          <p class="estudo__tempo">Tempo estimado: ${escapar(item.tempo)}</p>
        </div>
      </li>`).join("");

    container.innerHTML = `
      <div class="estudo__cabecalho">
        <h3>Seu plano de estudo</h3>
        <p>Ordenado pelo que destrava <b>mais vagas</b> — não pelo que
           você mais tem falta.</p>
      </div>
      <ol class="estudo__lista">${linhas}</ol>
      ${plano.length > 6 ? `<p class="mais">+ ${plano.length - 6} outras habilidades</p>` : ""}`;
}
