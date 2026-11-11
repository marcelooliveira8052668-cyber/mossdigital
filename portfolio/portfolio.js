/* Moss Portfólio — montador no navegador.
   Nenhum dado do usuário sai do dispositivo: a prévia é gerada localmente
   e a foto fica apenas na memória da aba. O envio acontece somente quando a
   pessoa clica em "Quero meu portfólio" e conversa pelo WhatsApp. */
"use strict";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const WHATSAPP = "5511942038103";
const PREVIEW = $("#preview");
const PREVIEW_URL = $("#preview-url");
const FORM = $("#form-portfolio");
const projetosLista = $("#projetos-lista");
const addProjetoBtn = $("#add-projeto");
const MAX_PROJETOS = 4;

const state = { cor: "#2563eb", foto: null };

/* ---------- Utilidades ---------- */
const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const normalizarUrl = (v) => {
  const t = String(v || "").trim();
  if (!t) return "";
  return /^https?:\/\//i.test(t) ? t : "https://" + t;
};

const slug = (v) =>
  String(v || "seu-nome")
    .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "seu-portfolio";

const iniciais = (nome) => {
  const partes = String(nome || "Eu").trim().split(/\s+/).filter(Boolean);
  const pega = (i) => (partes[i] ? partes[i][0] : "");
  return (pega(0) + pega(partes.length - 1)).toUpperCase() || "EU";
};

const habilidadesDe = () =>
  $("#habilidades").value.split(",").map((h) => h.trim()).filter(Boolean).slice(0, 6);

const projetosDe = () =>
  $$(".projeto-linha")
    .map((linha) => ({
      nome: $(".p-nome", linha).value.trim(),
      desc: $(".p-desc", linha).value.trim(),
      link: normalizarUrl($(".p-link", linha).value),
    }))
    .filter((p) => p.nome || p.desc);

const corSegura = (v) => (/^#[0-9a-fA-F]{6}$/.test(v) ? v : "#2563eb");

/* ---------- Templates de prévia (HTML gerado localmente) ---------- */

const templateProfissional = (s) => {
  const chips = s.habilidades.map((h) => `<span class="p-chip">${esc(h)}</span>`).join("");
  const projetos = s.projetos.map((p, i) => `
    <article class="p-proj">
      <span class="p-num">0${i + 1}</span>
      <h3>${esc(p.nome || "Projeto")}</h3>
      <p>${esc(p.desc)}</p>
      ${p.link ? `<a href="${esc(p.link)}">ver projeto ↗</a>` : ""}
    </article>`).join("");
  const sobre = s.sobre ? `<p class="p-sobre">${esc(s.sobre)}</p>` : "";
  const cidade = s.cidade ? `<span class="p-cidade">${esc(s.cidade)}</span>` : "";
  const links = [
    s.email ? `<a href="mailto:${esc(s.email)}">${esc(s.email)}</a>` : "",
    s.site ? `<a href="${esc(s.site)}">${esc(s.site.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join("<span class='p-sep'>·</span>");
  return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  :root{--ac:${s.cor}}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Georgia,'Times New Roman',serif;background:#fbfaf7;color:#221f1a;line-height:1.6;padding:34px 26px;-webkit-font-smoothing:antialiased}
  main{max-width:640px;margin:0 auto}
  header{display:flex;gap:22px;align-items:center;border-bottom:3px solid var(--ac);padding-bottom:20px;margin-bottom:18px}
  .p-photo{width:118px;height:118px;border-radius:18px;object-fit:cover;border:3px solid var(--ac);flex:0 0 auto}
  .p-name{font-size:2.1rem;letter-spacing:-.02em;line-height:1.1}
  .p-role{color:var(--ac);font:700 .68rem Arial,Helvetica,sans-serif;letter-spacing:.22em;text-transform:uppercase;margin-top:6px}
  .p-cidade{font:.72rem Arial,Helvetica,sans-serif;color:#6b665c;display:block;margin-top:4px}
  .p-sobre{font-size:1.02rem;color:#38342c;margin:16px 0 18px}
  .p-skills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}
  .p-chip{font:600 .66rem Arial,Helvetica,sans-serif;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--ac);color:var(--ac);border-radius:99px;padding:5px 12px}
  .p-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .p-proj{background:#fff;border:1px solid #e6e2d8;border-radius:14px;padding:16px;box-shadow:0 2px 10px rgba(20,18,12,.06)}
  .p-num{font:800 .62rem Arial;color:var(--ac);letter-spacing:.15em}
  .p-proj h3{font-size:1.02rem;margin:6px 0 6px}
  .p-proj p{font-size:.8rem;color:#4d4940}
  .p-proj a{font:700 .72rem Arial;color:var(--ac);text-decoration:none;display:inline-block;margin-top:8px}
  footer{border-top:1px solid #e6e2d8;margin-top:18px;padding-top:12px;font:600 .78rem Arial;color:#38342c;display:flex;gap:12px;flex-wrap:wrap}
  footer a{color:var(--ac);text-decoration:none}
  .p-sep{color:#b7b2a5}
  @media(max-width:480px){header{flex-direction:column;text-align:center}.p-grid{grid-template-columns:1fr}.p-name{font-size:1.7rem}}
</style></head><body><main>
  <header>
    ${s.foto ? `<img class="p-photo" src="${s.foto}" alt="Foto de ${esc(s.nome)}">` : `<div class="p-photo" style="display:flex;align-items:center;justify-content:center;background:var(--ac);color:#fff;font:700 1.8rem Georgia">${esc(iniciais(s.nome))}</div>`}
    <div><h1 class="p-name">${esc(s.nome || "Seu nome")}</h1><p class="p-role">${esc(s.funcao || "Sua função")}</p>${cidade}</div>
  </header>
  ${sobre}
  ${chips ? `<div class="p-skills">${chips}</div>` : ""}
  ${s.projetos.length ? `<div class="p-grid">${projetos}</div>` : ""}
  ${links ? `<footer>${links}</footer>` : ""}
</main></body></html>`;
};

const templateCriativo = (s) => {
  const chips = s.habilidades.map((h) => `<span class="c-chip">${esc(h)}</span>`).join("");
  const projetos = s.projetos.map((p, i) => `
    <article class="c-proj">
      <span class="c-num">0${i + 1}</span>
      <h3>${esc(p.nome || "Projeto")}</h3>
      <p>${esc(p.desc)}</p>
      ${p.link ? `<a href="${esc(p.link)}">abrir ↗</a>` : ""}
    </article>`).join("");
  const sobre = s.sobre ? `<p class="c-sobre">${esc(s.sobre)}</p>` : "";
  const cidade = s.cidade ? `<span class="c-cidade">${esc(s.cidade)}</span>` : "";
  const links = [
    s.email ? `<a href="mailto:${esc(s.email)}">Email</a>` : "",
    s.site ? `<a href="${esc(s.site)}">Meu site</a>` : "",
  ].filter(Boolean).join("<span class='c-sep'>·</span>");
  const painel = s.foto
    ? `<div class="c-photo"><img src="${s.foto}" alt="Foto de ${esc(s.nome)}"></div>`
    : `<div class="c-photo c-ph">${esc(iniciais(s.nome))}</div>`;
  return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  :root{--ac:${s.cor}}
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#101010;color:#f2ede2;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased}
  main{display:grid;grid-template-columns:.42fr .58fr;min-height:100vh}
  .c-photo{position:relative;overflow:hidden;min-height:100vh}
  .c-photo img{width:100%;height:100%;object-fit:cover;display:block;filter:contrast(.98) saturate(.92)}
  .c-ph{display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,var(--ac),#241f04);font:900 4rem Arial;color:#f5c14a}
  .c-right{padding:44px 36px;display:flex;flex-direction:column}
  .c-kicker{display:flex;align-items:center;gap:14px;font:700 .66rem Arial;letter-spacing:.28em;text-transform:uppercase;color:#f5c14a}
  .c-kicker::before{content:"";width:44px;height:6px;background:var(--ac)}
  h1{font-size:clamp(3rem,8vw,4.6rem);line-height:.96;letter-spacing:-.045em;font-family:'Arial Black',Arial,sans-serif;margin:14px 0 10px;word-break:break-word}
  .c-role{font-size:1.05rem;color:#f5c14a;font-style:italic}
  .c-cidade{font-size:.72rem;color:#b8b09e;text-transform:uppercase;letter-spacing:.2em;margin-top:8px}
  .c-sobre{color:#cdc6b6;font-size:.95rem;margin:22px 0;max-width:46ch}
  .c-skills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:26px}
  .c-chip{font:700 .62rem Arial;letter-spacing:.12em;text-transform:uppercase;border:1px solid #3a382f;color:#f5c14a;border-radius:4px;padding:6px 12px}
  .c-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .c-proj{border:1px solid #2a2924;border-radius:6px;padding:14px;background:#141413}
  .c-num{font:800 .62rem Arial;color:var(--ac);letter-spacing:.2em}
  .c-proj h3{font-size:.98rem;margin:8px 0 6px;color:#f2ede2}
  .c-proj p{font-size:.76rem;color:#b8b09e}
  .c-proj a{display:inline-block;margin-top:8px;font:700 .7rem Arial;letter-spacing:.08em;text-transform:uppercase;color:#f5c14a;text-decoration:none}
  footer{margin-top:auto;padding-top:22px;font:700 .74rem Arial;color:#f5c14a;display:flex;gap:14px}
  footer a{color:#f5c14a;text-decoration:none;text-transform:uppercase;letter-spacing:.14em}
  .c-sep{color:#4a463d}
  @media(max-width:520px){main{grid-template-columns:1fr}.c-photo{min-height:260px}.c-grid{grid-template-columns:1fr}}
</style></head><body><main>
  ${painel}
  <div class="c-right">
    <p class="c-kicker">Portfólio</p>
    <h1>${esc(s.nome || "Seu nome")}</h1>
    <p class="c-role">${esc(s.funcao || "Sua função")}</p>
    ${cidade}
    ${sobre}
    ${chips ? `<div class="c-skills">${chips}</div>` : ""}
    ${s.projetos.length ? `<div class="c-grid">${projetos}</div>` : ""}
    ${links ? `<footer>${links}</footer>` : ""}
  </div>
</main></body></html>`;
};

const templateTecnologia = (s) => {
  const chips = s.habilidades.map((h) => `<span class="t-chip">${esc(h)}</span>`).join("");
  const projetos = s.projetos.map((p, i) => `
    <article class="t-proj">
      <p class="t-prompt"><span class="t-dollar">$</span> projeto-${String(i + 1).padStart(2, "0")} <span class="t-nome">${esc(p.nome || "projeto")}</span> EOF</p>
      <p class="t-desc">${esc(p.desc)}</p>
      ${p.link ? `<a class="t-link" href="${esc(p.link)}">→ ${esc(p.link.replace(/^https?:\/\//, ""))}</a>` : ""}
    </article>`).join("");
  const sobre = s.sobre ? `<p class="t-sobre"><span class="t-c">/*</span> ${esc(s.sobre)} <span class="t-c">*/</span></p>` : "";
  const cidade = s.cidade ? `<span class="t-cidade">@ ${esc(s.cidade)}</span>` : "";
  const links = [
    s.email ? `<a href="mailto:${esc(s.email)}">${esc(s.email)}</a>` : "",
    s.site ? `<a href="${esc(s.site)}">${esc(s.site.replace(/^https?:\/\//, ""))}</a>` : "",
  ].filter(Boolean).join("<span class='t-sep'> | </span>");
  const painel = s.foto
    ? `<img class="t-photo" src="${s.foto}" alt="Foto de ${esc(s.nome)}">`
    : `<div class="t-photo t-ph">${esc(iniciais(s.nome))}</div>`;
  return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  :root{--ac:${s.cor}}
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#060d1c;color:#d7e6f7;font-family:Consolas,'Cascadia Code',Monaco,monospace;-webkit-font-smoothing:antialiased;padding:18px}
  main{max-width:620px;margin:0 auto;border:1px solid #123047;border-radius:12px;background:#0a1322;box-shadow:0 0 44px rgba(34,211,238,.08)}
  .t-bar{display:flex;gap:7px;align-items:center;background:#0d1b30;border-bottom:1px solid #123047;border-radius:12px 12px 0 0;padding:9px 14px}
  .t-bar i{width:11px;height:11px;border-radius:50%;background:#1d3a55}
  .t-bar i:nth-child(1){background:#ef6a5a}.t-bar i:nth-child(2){background:#f5bd4f}.t-bar i:nth-child(3){background:#62c554}
  .t-bar span{margin-left:auto;font-size:.62rem;color:#3e6a8d}
  .t-body{padding:24px}
  .t-head{display:flex;gap:18px;align-items:center;border-bottom:1px dashed #123047;padding-bottom:18px;margin-bottom:16px}
  .t-photo{width:96px;height:96px;object-fit:cover;border-radius:14px;border:2px solid var(--ac);box-shadow:0 0 22px rgba(34,211,238,.25);flex:0 0 auto}
  .t-ph{display:flex;align-items:center;justify-content:center;background:#0c2436;color:var(--ac);font-size:1.6rem;font-weight:700}
  h1{font-size:1.55rem;color:#eaf6ff;letter-spacing:0}
  .t-role{color:var(--ac);font-size:.76rem;margin-top:6px}
  .t-role::before{content:"> ";opacity:.7}
  .t-cidade{color:#3e6a8d;font-size:.7rem;display:block;margin-top:4px}
  .t-sobre{color:#8faecb;font-size:.78rem;margin:6px 0 16px}
  .t-c{color:#2b4a63}
  .t-skills{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:20px}
  .t-chip{font-size:.66rem;letter-spacing:.08em;border:1px solid #123047;color:var(--ac);border-radius:4px;padding:4px 9px}
  .t-proj{border:1px solid #0f2740;background:#081122;border-radius:8px;padding:12px 14px;margin-bottom:10px}
  .t-prompt{color:var(--ac);font-size:.78rem}
  .t-dollar{color:#5eead4}
  .t-nome{color:#eaf6ff}
  .t-desc{color:#8faecb;font-size:.76rem;margin:8px 0 0}
  .t-link{color:#5eead4;text-decoration:none;font-size:.72rem}
  footer{border-top:1px dashed #123047;padding-top:12px;margin-top:16px;font-size:.72rem;color:#8faecb}
  footer a{color:#5eead4;text-decoration:none}
  .t-sep{color:#123047}
  @media(max-width:480px){.t-head{flex-direction:column;text-align:center}h1{font-size:1.3rem}}
</style></head><body><main>
  <div class="t-bar"><i></i><i></i><i></i><span>~/${esc(slug(s.nome))} — portfolio</span></div>
  <div class="t-body">
    <div class="t-head">
      ${painel}
      <div><h1>${esc(s.nome || "seu-nome")}</h1><p class="t-role">${esc(s.funcao || "sua funcao")}</p>${cidade}</div>
    </div>
    ${sobre}
    ${chips ? `<div class="t-skills">${chips}</div>` : ""}
    ${projetos}
    ${links ? `<footer>${links}</footer>` : ""}
  </div>
</main></body></html>`;
};

const templates = { profissional: templateProfissional, criativo: templateCriativo, tecnologia: templateTecnologia };

/* ---------- Montagem e renderização ---------- */

function coletar() {
  return {
    template: ($('input[name="template"]:checked') || {}).value || "profissional",
    foto: state.foto,
    nome: $("#nome").value.trim(),
    funcao: $("#funcao").value.trim(),
    cidade: $("#cidade").value.trim(),
    sobre: $("#sobre").value.trim(),
    habilidades: habilidadesDe(),
    projetos: projetosDe(),
    email: $("#email").value.trim(),
    site: normalizarUrl($("#site").value),
    cor: corSegura(state.cor),
  };
}

let renderTimer = null;
function atualizarPreview() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(() => {
    const s = coletar();
    PREVIEW.srcdoc = templates[s.template](s);
    PREVIEW_URL.textContent = slug(s.nome) + ".mossdigital.com.br";
  }, 120);
}

/* ---------- Projetos dinâmicos ---------- */
function linhaProjeto(inicial) {
  const linha = document.createElement("div");
  linha.className = "projeto-linha";
  linha.innerHTML = `
    <input class="p-nome" type="text" maxlength="80" placeholder="Nome do projeto" aria-label="Nome do projeto ${inicial}">
    <input class="p-link" type="text" inputmode="url" maxlength="140" placeholder="Link (opcional)" aria-label="Link do projeto ${inicial}">
    <button type="button" class="p-remove" aria-label="Remover projeto ${inicial}">✕</button>
    <input class="p-desc w2" type="text" maxlength="220" placeholder="O que você fez, com o que e o resultado (1–2 frases)" aria-label="Descrição do projeto ${inicial}">`;
  linha.querySelector(".p-remove").addEventListener("click", () => {
    if (projetosLista.children.length > 1) {
      linha.remove();
      atualizarContadorProjetos();
      atualizarPreview();
    }
  });
  return linha;
}

function atualizarContadorProjetos() {
  addProjetoBtn.hidden = projetosLista.children.length >= MAX_PROJETOS;
}

function adicionarProjeto() {
  if (projetosLista.children.length >= MAX_PROJETOS) return;
  projetosLista.appendChild(linhaProjeto(projetosLista.children.length + 1));
  atualizarContadorProjetos();
  atualizarPreview();
}

/* ---------- Foto ---------- */
function tratarFoto(file) {
  const msg = $("#foto-msg");
  const tipos = ["image/jpeg", "image/png", "image/webp"];
  if (!tipos.includes(file.type)) {
    msg.textContent = "Formato não suportado. Use JPEG, PNG ou WebP.";
    msg.hidden = false;
    return;
  }
  if (file.size > 3 * 1024 * 1024) {
    msg.textContent = "A foto tem mais de 3 MB. Escolha uma versão menor.";
    msg.hidden = false;
    return;
  }
  msg.hidden = true;
  const reader = new FileReader();
  reader.onload = () => {
    state.foto = reader.result;
    const thumb = $("#foto-preview");
    thumb.src = state.foto;
    thumb.hidden = false;
    $("#remover-foto").hidden = false;
    atualizarPreview();
  };
  reader.readAsDataURL(file);
}

/* ---------- Download local da prévia em um arquivo HTML único ---------- */
function baixarPreviaHTML() {
  // Coleta os campos diretamente do formulário para salvar a versão mais recente.
  const dados = coletar();
  const aviso = $("#download-msg");

  // Nome e profissão são necessários para gerar um portfólio identificável.
  if (!dados.nome || !dados.funcao) {
    aviso.textContent = "Preencha seu nome e sua função/profissão antes de baixar.";
    aviso.style.color = "#ffb1b1";
    aviso.hidden = false;
    (!dados.nome ? $("#nome") : $("#funcao")).focus();
    return;
  }

  try {
    // Os modelos já incluem CSS; a foto também fica incorporada ao HTML em base64.
    const titulo = "<title>Portfólio de " + esc(dados.nome) + "</title>";
    const html = templates[dados.template](dados).replace("</head>", titulo + "</head>");
    const nomeArquivo = "portfolio-" + slug(dados.nome) + ".html";
    const arquivo = new Blob([html], { type: "text/html;charset=utf-8" });
    const enderecoTemporario = URL.createObjectURL(arquivo);

    // Dispara o download diretamente no navegador, sem hospedar dados pessoais.
    const link = document.createElement("a");
    link.href = enderecoTemporario;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Libera os recursos após o navegador ter tempo de iniciar o download.
    window.setTimeout(() => URL.revokeObjectURL(enderecoTemporario), 60000);
    aviso.style.color = "#86efac";
    // O navegador não informa à página qual pasta foi escolhida pelo visitante.
    // A mensagem apresenta o nome do arquivo e o local habitual, sem afirmar que o download terminou.
    aviso.textContent = "✅ Download iniciado! Arquivo: " + nomeArquivo + ". Procure na pasta Downloads ou naquela que você escolheu no navegador. No computador, pressione Ctrl+J para ver o histórico de downloads.";
    aviso.hidden = false;
  } catch (erro) {
    console.error("Falha ao baixar a prévia:", erro);
    aviso.textContent = "Não foi possível iniciar o download. Verifique se o navegador está bloqueando downloads e tente novamente.";
    aviso.style.color = "#ffb1b1";
    aviso.hidden = false;
  }
}

/* ---------- WhatsApp ---------- */
function mensagemWhatsApp() {
  const s = coletar();
  const nome = s.nome || "(sem nome)";
  const funcao = s.funcao || "(não informada)";
  const projetos = s.projetos.length ? s.projetos.length + " projeto(s): " + s.projetos.map((p) => p.nome || "sem nome").join(", ") : "nenhum projeto";
  return (
    "Olá! Montei a prévia do meu portfólio e quero finalizar o meu por R$ 39,90.\n" +
    "Modelo: " + s.template.charAt(0).toUpperCase() + s.template.slice(1) + "\n" +
    "Nome: " + nome + "\n" +
    "Função: " + funcao + "\n" +
    "Projetos: " + projetos
  );
}

function abrirWhatsApp() {
  const url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensagemWhatsApp());
  window.open(url, "_blank", "noopener,noreferrer");
}

/* ---------- Inicialização ---------- */
projetosLista.appendChild(linhaProjeto(1));
projetosLista.appendChild(linhaProjeto(2));
addProjetoBtn.addEventListener("click", adicionarProjeto);
$("#foto").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) tratarFoto(file);
});
$("#remover-foto").addEventListener("click", () => {
  state.foto = null;
  $("#foto").value = "";
  $("#foto-preview").hidden = true;
  $("#remover-foto").hidden = true;
  atualizarPreview();
});
$("#sobre").addEventListener("input", (e) => ($("#sobre-count").textContent = e.target.value.length));
$$(".swatch[data-cor]").forEach((btn) =>
  btn.addEventListener("click", () => {
    state.cor = btn.dataset.cor;
    $$(".swatch").forEach((b) => b.classList.toggle("active", b === btn));
    $("#cor-custom").value = state.cor;
    atualizarPreview();
  })
);
$("#cor-custom").addEventListener("input", (e) => {
  state.cor = corSegura(e.target.value);
  $$(".swatch").forEach((b) => b.classList.remove("active"));
  atualizarPreview();
});
$("#baixar-previa").addEventListener("click", baixarPreviaHTML);
$("#whatsapp-cta, #whatsapp-cta-2").forEach((btn) => btn.addEventListener("click", abrirWhatsApp));
FORM.addEventListener("input", atualizarPreview);
FORM.addEventListener("change", atualizarPreview);
FORM.addEventListener("submit", (e) => e.preventDefault());

atualizarContadorProjetos();
atualizarPreview();
