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

const templateEditorial = (s) => {
  /* Modelo único: "Editorial" — photobook de revista em formato paisagem.
     Todas as medidas usam vw para a prévia ao vivo (iframe de largura
     variável) e o PDF (iframe fixo) ficarem proporcionais em qualquer tamanho.
     Uma página por <section class="pg">; o html2pdf vira cada página em uma
     folha A4 paisagem. */
  const cor = s.cor;
  const nome = esc(s.nome || "Seu nome");
  const funcao = esc(s.funcao || "Sua profissão");
  const cidade = esc(s.cidade || "");
  const sobre = esc(s.sobre || "");
  const chips = s.habilidades.map((h) => `<span class="ed-chip">${esc(h)}</span>`).join("");
  const nomeCaps = String(s.nome || "Seu nome").trim();
  const monograma = esc(iniciais(s.nome));
  const foto = s.foto;
  const totalProjetos = s.projetos.length;
  /* Folios (números de página no rodapé): capa 01, sobre 02, projetos em seguida, obrigado por último. */
  const folio = (n) => String(n).padStart(2, "0");
  const folioFim = folio(3 + totalProjetos);

  const paginaSobre = `<section class="pg pg-sobre">
    <div class="sobre-numbox" aria-hidden="true"><span class="sobre-num">01</span><p class="kick">Sobre</p></div>
    <div class="sobre-txtbox">
      ${sobre ? `<p class="sobre-txt">${sobre}</p>` : `<p class="sobre-txt sobre-vazio">Conte aqui sobre você: quem é, o que faz de melhor e que tipo de trabalho procura.</p>`}
      ${chips ? `<p class="hab-label">Habilidades</p><div class="hab-lista">${chips}</div>` : ""}
      ${cidade ? `<div class="sobre-atual"><span class="sobre-atual-label">Atualmente</span><span class="sobre-atual-valor">${cidade}</span></div>` : ""}
    </div>
    ${foto
      ? `<div class="sobre-foto"><div class="foto-mat smol"><img src="${foto}" alt="Foto de ${nomeCaps}"></div><p class="foto-cap smol-cap">${nomeCaps}</p></div>`
      : `<div class="sobre-art" aria-hidden="true"><span class="art-c1"></span><span class="art-c2"></span><span class="sobre-mono">${monograma}</span></div>`}
    <div class="folio"><span>${nome}</span><span>02</span></div>
  </section>`;

  const paginaProjeto = (p, i) => {
    const numero = folio(i + 1);
    const alt = i % 2 === 1 ? " alt" : "";
    const pagina = folio(3 + i);
    const link = p.link ? `<a class="proj-link" href="${esc(p.link)}">Ver projeto ↗</a>` : "";
    return `<section class="pg pg-proj${alt}">
    <div class="proj-numbox" aria-hidden="true">
      <span class="art-c1"></span><span class="art-c2"></span><span class="art-ring"></span><span class="art-ring2"></span>
      <span class="proj-num">${numero}</span>
      <span class="proj-total">de ${folio(totalProjetos)}</span>
    </div>
    <div class="proj-txtbox">
      <p class="kick">Projeto ${numero}</p>
      <h2 class="proj-nome">${esc(p.nome || "Projeto")}</h2>
      <div class="regra acento"></div>
      <p class="proj-desc">${esc(p.desc)}</p>
      ${link}
    </div>
    <div class="folio"><span>${nome}</span><span>${pagina}</span></div>
  </section>`;
  };
  const paginasProjetos = s.projetos.map(paginaProjeto).join("\n  ");

  const linhasContato = [
    s.email ? `<div class="contato-linha"><span class="contato-label">E-mail</span><a class="contato-valor" href="mailto:${esc(s.email)}">${esc(s.email)}</a></div>` : "",
    s.site ? `<div class="contato-linha"><span class="contato-label">Web</span><a class="contato-valor" href="${esc(s.site)}">${esc(s.site.replace(/^https?:\/\//, "").replace(/\/+$/, ""))}</a></div>` : "",
    cidade ? `<div class="contato-linha"><span class="contato-label">Localidade</span><span class="contato-valor">${cidade}</span></div>` : "",
  ].filter(Boolean).join("\n      ");
  const letrasObrigado = [..."OBRIGADO"].map((letra) => `<span>${letra}</span>`).join("");
  const paginaFim = `<section class="pg pg-fim">
    <div class="fim-letras" aria-hidden="true">${letrasObrigado}</div>
    <div class="fim-conteudo">
      ${foto ? `<div class="fim-foto"><img src="${foto}" alt="Foto de ${nomeCaps}"></div>` : ""}
      <p class="kick">Contato</p>
      <h2 class="fim-titulo">Vamos<br>conversar?</h2>
      <div class="regra dupla"></div>
      ${linhasContato || '<p class="fim-sub">Disponível para novos projetos.</p>'}
      <p class="fim-fim">Fim do portfólio · ${nome}</p>
      <p class="fim-marca">MOSS Digital · mossdigital.com.br</p>
    </div>
    <div class="folio"><span>${nome}</span><span>${folioFim}</span></div>
  </section>`;

  return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  :root{--ac:${cor}}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Georgia,'Times New Roman',serif;background:#efece3;color:#252219;-webkit-font-smoothing:antialiased}
  /* Cada folha é uma "página" do photobook: 100vw de largura, altura proporcional ao A4 paisagem. */
  .pg{position:relative;width:100vw;height:calc(70.707vw - 3px);overflow:hidden;background:#f7f4ec;display:flex;padding:4.3vw 5.2vw;page-break-after:always;break-after:page}
  .pg:last-child{page-break-after:auto;break-after:auto}
  .pg+.pg{box-shadow:inset 0 .09vw 0 rgba(37,34,25,.3)}
  .kick{font:700 1.02vw Arial,Helvetica,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:var(--ac);white-space:nowrap}
  .regra{border:0;border-top:.3vw solid #252219;margin:2vw 0}
  .regra.acento{border-top:.32vw solid var(--ac);width:11vw;margin:0}
  .regra.dupla{border-top:.09vw solid #252219;border-bottom:.32vw solid #252219;height:.62vw}
  .folio{position:absolute;left:5.2vw;right:5.2vw;bottom:2.1vw;display:flex;justify-content:space-between;gap:2vw;
    border-top:1px solid #c9c4b2;padding-top:1.1vw;
    font:700 .95vw Arial,Helvetica,sans-serif;letter-spacing:.26em;text-transform:uppercase;color:#6f6a5c}
  /* ---------- CAPA ---------- */
  .pg-capa{display:grid;grid-template-columns:1.04fr .96fr;gap:5vw;align-items:center}
  .capa-titulo{font-family:Didot,'Bodoni MT',Georgia,'Times New Roman',serif;font-weight:400;font-size:11.4vw;line-height:.94;letter-spacing:-.035em;margin:2.6vw 0 2.4vw;color:#252219}
  .capa-nome{font:700 1.55vw Arial,Helvetica,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#252219;margin-top:2vw}
  .capa-funcao{font-size:1.7vw;font-style:italic;color:#3c382d;margin-top:1vw}
  .capa-cidade{font:700 1vw Arial,Helvetica,sans-serif;letter-spacing:.28em;text-transform:uppercase;color:#6f6a5c;margin-top:1.6vw}
  .capa-dir{display:flex;flex-direction:column;gap:1.5vw}
  /* Foto com "passe-partout" de galeria: moldura branca e sombra dura de impressão. */
  .foto-mat{background:#fff;padding:1.4vw;border:1px solid #252219;box-shadow:.7vw .7vw 0 rgba(37,34,25,.88)}
  .foto-mat img{display:block;width:100%;height:42vw;object-fit:cover;object-position:50% 18%;background:#e7e2d2}
  .foto-mat.mono{display:flex;align-items:center;justify-content:center;height:44.8vw;background:#ece8db}
  .foto-mat.mono span{font-size:10vw;font-family:Didot,'Bodoni MT',Georgia,serif;color:var(--ac)}
  .foto-cap{text-align:center;font:700 .95vw Arial,Helvetica,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#6f6a5c}
  /* ---------- SOBRE ---------- */
  .pg-sobre{display:grid;grid-template-columns:auto 1fr auto;gap:4vw;align-items:center}
  .sobre-numbox{display:flex;flex-direction:column;align-items:center;gap:1.6vw;border-right:1px solid #d5d0c2;padding-right:3.6vw}
  .sobre-num{font-family:Didot,'Bodoni MT',Georgia,serif;font-size:13vw;line-height:1;color:#e0dbcb}
  .sobre-txtbox{display:flex;flex-direction:column;gap:1.8vw;max-width:60ch}
  .sobre-atual{display:flex;gap:1.6vw;align-items:baseline;border-top:1px solid #d5d0c2;padding-top:1.4vw}
  .sobre-atual-label{font:700 .8vw Arial,Helvetica,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#6f6a5c}
  .sobre-atual-valor{font-size:1.25vw;color:#252219}
  .sobre-foto{display:flex;flex-direction:column;justify-content:center;gap:1.3vw;border-left:1px solid #d5d0c2;padding-left:3.6vw}
  .foto-mat.smol{padding:1vw;box-shadow:.45vw .45vw 0 rgba(37,34,25,.88)}
  .foto-mat.smol img{height:24vw;width:18.5vw;object-fit:cover;object-position:50% 15%}
  /* Monograma quando não há foto: painel de arte em duotone. */
  .sobre-art{position:relative;align-self:stretch;display:flex;align-items:center;justify-content:center;border-left:1px solid #d5d0c2;background:#f1ede1;overflow:hidden;width:17vw}
  .sobre-mono{position:relative;font-family:Didot,'Bodoni MT',Georgia,serif;font-size:8.5vw;line-height:1;color:var(--ac);z-index:1}
  .sobre-txt{font-size:1.66vw;line-height:1.8;color:#2e2b23}
  .sobre-vazio{color:#8a857a;font-style:italic}
  .hab-label{font:700 .95vw Arial,Helvetica,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#6f6a5c}
  .hab-lista{display:flex;flex-wrap:wrap;gap:.7vw}
  .ed-chip{display:inline-block;border:1px solid #252219;padding:.7vw 1.5vw;font:700 1vw Arial,Helvetica,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#252219}
  /* ---------- PROJETOS ---------- */
  .pg-proj{display:flex;align-items:stretch;padding:0}
  /* Painel de arte generativa das páginas de projeto (duotone, composição fixa). */
  .proj-numbox{position:relative;flex:0 0 33%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1vw;border-right:1px solid #d5d0c2;background:#f1ede1;overflow:hidden}
  .pg-proj.alt{flex-direction:row-reverse}
  .pg-proj.alt .proj-numbox{border-right:0;border-left:1px solid #d5d0c2}
  .art-c1{position:absolute;width:24vw;height:24vw;border-radius:50%;background:var(--ac);opacity:.16;top:-8vw;left:-8vw}
  .art-c2{position:absolute;width:13vw;height:13vw;border-radius:50%;background:var(--ac);opacity:.2;bottom:-4.5vw;right:-4.5vw}
  .art-ring{position:absolute;width:32vw;height:32vw;border-radius:50%;border:.12vw solid rgba(37,34,25,.22);bottom:-13vw;left:-11vw}
  .art-ring2{position:absolute;width:15vw;height:15vw;border-radius:50%;border:.12vw solid var(--ac);opacity:.55;top:4.5vw;right:2.2vw}
  .proj-num{position:relative;z-index:1;font-family:Didot,'Bodoni MT',Georgia,serif;font-size:12.5vw;line-height:1;color:#252219}
  .proj-total{font:700 .97vw Arial,Helvetica,sans-serif;letter-spacing:.34em;text-transform:uppercase;color:#8a857a}
  .proj-txtbox{flex:1;display:flex;flex-direction:column;justify-content:center;gap:1.7vw;padding:0 4vw}
  .proj-nome{font-family:Didot,'Bodoni MT',Georgia,'Times New Roman',serif;font-weight:400;font-size:4.7vw;line-height:1.02;letter-spacing:-.02em;color:#252219}
  .proj-desc{font-size:1.3vw;line-height:1.85;color:#3c382d;max-width:56ch}
  .proj-link{font:700 1.02vw Arial,Helvetica,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:var(--ac);text-decoration:none;border-bottom:.18vw solid var(--ac);width:max-content;padding-bottom:.45vw}
  /* ---------- OBRIGADO / CONTATO ---------- */
  .pg-fim{display:flex;align-items:stretch;padding:0}
  .fim-letras{flex:0 0 18%;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;border-right:1px solid #d5d0c2;background:#f1ede1;padding:2vw 0}
  .fim-letras span{font-family:Didot,'Bodoni MT',Georgia,serif;font-size:4.6vw;line-height:1;color:#ddd8c8}
  .fim-letras span:first-child{color:var(--ac)}
  .fim-conteudo{flex:1;display:flex;flex-direction:column;justify-content:center;gap:1.4vw;padding:0 5vw}
  .fim-titulo{font-family:Didot,'Bodoni MT',Georgia,'Times New Roman',serif;font-weight:400;font-size:6.2vw;line-height:.98;letter-spacing:-.02em}
  .contato-linha{display:flex;justify-content:space-between;align-items:baseline;gap:2vw;border-bottom:1px solid #d5d0c2;padding:1.05vw 0}
  .contato-label{font:700 .97vw Arial,Helvetica,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#6f6a5c}
  .contato-valor{font-size:1.3vw;color:#252219;text-decoration:none;word-break:break-word;text-align:right}
  a.contato-valor{color:var(--ac);border-bottom:1px solid transparent}
  .fim-sub{font-size:1.3vw;font-style:italic;color:#3c382d}
  .fim-foto{width:8.6vw;height:8.6vw;border-radius:50%;overflow:hidden;border:1px solid #252219;box-shadow:.45vw .45vw 0 rgba(37,34,25,.88)}
  .fim-foto img{width:100%;height:100%;object-fit:cover;object-position:50% 18%}
  .fim-fim{margin-top:1.6vw;font:700 .72vw Arial,Helvetica,sans-serif;letter-spacing:.26em;text-transform:uppercase;color:#b4afa0}
  .fim-marca{margin-top:.6vw;font:700 .95vw Arial,Helvetica,sans-serif;letter-spacing:.3em;text-transform:uppercase;color:#6f6a5c}
</style></head><body>
  <section class="pg pg-capa">
    <div class="capa-esq">
      <p class="kick">Moss Digital · Apresenta</p>
      <h1 class="capa-titulo">Portfólio</h1>
      <div class="regra dupla"></div>
      <p class="capa-nome">${nome}</p>
      <p class="capa-funcao">${funcao}</p>
      ${cidade ? `<p class="capa-cidade">${cidade}</p>` : ""}
    </div>
    <div class="capa-dir">
      ${foto
        ? `<div class="foto-mat"><img src="${foto}" alt="Foto de ${nomeCaps}"></div>`
        : `<div class="foto-mat mono"><span>${monograma}</span></div>`}
      <p class="foto-cap">${nomeCaps}${cidade ? " · " + cidade : ""}</p>
    </div>
    <div class="folio"><span>Moss · Portfólio</span><span>01</span></div>
  </section>
  ${paginaSobre}
  ${paginasProjetos}
  ${paginaFim}
</body></html>`;
};
const templates = { editorial: templateEditorial };


/* ---------- Montagem e renderização ---------- */

function coletar() {
  return {
    template: "editorial",
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
    salvarRascunho();
  }, 120);
}

/* ---------- Rascunho local ----------
   O preenchimento fica guardado neste navegador (localStorage) para não se
   perder ao fechar a página. Nada sai do dispositivo: sem upload e sem servidor. */
const CHAVE_RASCUNHO = "moss-portfolio-rascunho-v1";

function dadosRascunho() {
  const s = coletar();
  return {
    template: s.template, nome: s.nome, funcao: s.funcao, cidade: s.cidade,
    sobre: s.sobre, habilidades: $("#habilidades").value, email: s.email,
    site: $("#site").value, cor: s.cor, foto: s.foto, projetos: s.projetos
  };
}

function rascunhoVazio(dados) {
  return !dados.nome.trim() && !dados.funcao.trim() && !dados.cidade.trim() &&
    !dados.sobre.trim() && !dados.habilidades.trim() && !dados.email.trim() &&
    !dados.site.trim() && !dados.foto && !dados.projetos.length;
}

function mostrarNotaRascunho(texto) {
  const linha = $("#rascunho-linha");
  const nota = $("#rascunho-nota");
  if (!linha || !nota) return;
  linha.hidden = false;
  nota.textContent = texto;
}

let salvarTimer = null;
function salvarRascunho() {
  clearTimeout(salvarTimer);
  salvarTimer = setTimeout(() => {
    const linha = $("#rascunho-linha");
    if (!linha) return;
    const dados = dadosRascunho();
    if (rascunhoVazio(dados)) {
      try { localStorage.removeItem(CHAVE_RASCUNHO); } catch { /* sem armazenamento */ }
      linha.hidden = true;
      return;
    }
    try {
      localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(dados));
      mostrarNotaRascunho("Rascunho salvo neste navegador — pode fechar a página que nada se perde.");
    } catch {
      // Quase sempre é a foto grande demais para o limite do navegador.
      try {
        localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify({ ...dados, foto: null }));
        mostrarNotaRascunho("Rascunho salvo neste navegador (textos e projetos; a foto não coube no limite de espaço).");
      } catch {
        mostrarNotaRascunho("Não deu para salvar o rascunho neste navegador. Baixe os arquivos antes de fechar a página.");
      }
    }
  }, 400);
}

function restaurarRascunho() {
  let bruto = null;
  try { bruto = localStorage.getItem(CHAVE_RASCUNHO); } catch { return false; }
  if (!bruto) return false;
  let salvo = null;
  try { salvo = JSON.parse(bruto); } catch { return false; }
  if (!salvo || typeof salvo !== "object") return false;
  const texto = (valor, max) => String(valor ?? "").slice(0, max);

  $("#nome").value = texto(salvo.nome, 100);
  $("#funcao").value = texto(salvo.funcao, 120);
  $("#cidade").value = texto(salvo.cidade, 120);
  $("#sobre").value = texto(salvo.sobre, 600);
  $("#sobre-count").textContent = $("#sobre").value.length;
  $("#habilidades").value = texto(salvo.habilidades, 200);
  $("#email").value = texto(salvo.email, 254);
  $("#site").value = texto(salvo.site, 300);

  state.cor = corSegura(salvo.cor);
  $("#cor-custom").value = state.cor;
  $$(".swatch").forEach((b) => b.classList.toggle("active", b.dataset.cor === state.cor));

  if (typeof salvo.foto === "string" &&
      /^data:image\/(jpeg|png|webp);base64,/.test(salvo.foto) &&
      salvo.foto.length <= 4.6 * 1024 * 1024) {
    state.foto = salvo.foto;
    $("#foto-preview").src = salvo.foto;
    $("#foto-preview").hidden = false;
    $("#remover-foto").hidden = false;
  }

  const projetos = Array.isArray(salvo.projetos) ? salvo.projetos.slice(0, MAX_PROJETOS) : [];
  projetosLista.textContent = "";
  for (let i = 0; i < Math.max(projetos.length, 1); i++) {
    const linha = linhaProjeto(i + 1);
    const p = projetos[i];
    if (p && typeof p === "object") {
      linha.querySelector(".p-nome").value = texto(p.nome, 80);
      linha.querySelector(".p-desc").value = texto(p.desc, 220);
      linha.querySelector(".p-link").value = texto(p.link, 140);
    }
    projetosLista.appendChild(linha);
  }
  atualizarContadorProjetos();
  mostrarNotaRascunho("Rascunho recuperado deste navegador — continue de onde parou.");
  return true;
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

/* ---------- Pedido completo por WhatsApp ----------
   A página NÃO armazena dados nem envia fotos automaticamente.
   O cliente deve confirmar o envio da mensagem na conversa do WhatsApp.
   O texto do pedido é a alternativa segura sem backend, não o arquivo PDF. */

/* Comunica o status real ao cliente, sem dizer que o envio foi confirmado. */
function mostrarStatusPedido(texto) {
  const aviso = $("#pedido-msg");
  aviso.textContent = texto;
  aviso.hidden = false;
}

/* Nome e profissão são necessários para não receber pedidos anônimos. */
function validarPedido() {
  const nome = $("#nome");
  const profissao = $("#funcao");
  if (!nome.value.trim()) {
    mostrarStatusPedido("Preencha seu nome completo antes de enviar o pedido.");
    nome.focus();
    return false;
  }
  if (!profissao.value.trim()) {
    mostrarStatusPedido("Preencha sua profissão antes de enviar o pedido.");
    profissao.focus();
    return false;
  }
  return true;
}

/* Gera o resumo COMPLETO de todos os campos, sem incluir a foto em base64. */
function mensagemWhatsApp() {
  const s = coletar();
  const linhas = [
    "*PEDIDO DE PORTFÓLIO — MOSS DIGITAL*",
    "Olá! Montei meu portfólio e gostaria de finalizar o serviço de R$ 39,90.",
    "",
    "*Modelo:* Editorial (photobook, PDF paisagem)",
    "*Nome completo:* " + (s.nome || "Não informado"),
    "*Profissão:* " + (s.funcao || "Não informada"),
    "*Cidade:* " + (s.cidade || "Não informada"),
    "*Sobre mim:* " + (s.sobre || "Não informado"),
    "*Habilidades:* " + (s.habilidades.join(", ") || "Não informadas"),
    "*Cor principal:* " + s.cor,
    "*E-mail público:* " + (s.email || "Não informado"),
    "*Site ou GitHub:* " + (s.site || "Não informado"),
    "",
    "*PROJETOS (" + s.projetos.length + ")*"
  ];
  if (!s.projetos.length) {
    linhas.push("Nenhum projeto informado.");
  }
  s.projetos.forEach((projeto, i) => {
    linhas.push(
      "",
      "*Projeto " + (i + 1) + ":* " + (projeto.nome || "Sem título"),
      "Descrição: " + (projeto.desc || "Não informada"),
      "Link: " + (projeto.link || "Não informado")
    );
  });
  linhas.push(
    "",
    "*Foto escolhida na prévia:* " + (s.foto ? "Sim, incluída no arquivo do pedido" : "Não"),
    "Vou anexar manualmente o arquivo pedido-portfolio (.json), com os dados e a foto, e a prévia em PDF.",
    "",
    "Por favor, confirmem prazo, pagamento e entrega antes de finalizar."
  );
  return linhas.join("\n");
}

/* Abre o WhatsApp, mas NÃO afirma que a mensagem foi enviada. */
function abrirWhatsApp() {
  if (!validarPedido()) return;
  const url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensagemWhatsApp());
  window.open(url, "_blank", "noopener,noreferrer");
  mostrarStatusPedido("No WhatsApp, anexe como Documento o arquivo pedido-portfolio (.json) e a prévia em PDF que você baixou. Toque em Enviar. Nenhum arquivo é anexado automaticamente. Se não conseguir anexar, envie os dados e a foto separadamente.");
}

/* Permite copiar somente os dados escritos, nunca o PDF final. */
async function copiarPedido() {
  if (!validarPedido()) return;
  const conteudo = mensagemWhatsApp();
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(conteudo);
    } else {
      const auxiliar = document.createElement("textarea");
      auxiliar.value = conteudo;
      auxiliar.style.position = "fixed";
      auxiliar.style.opacity = "0";
      document.body.appendChild(auxiliar);
      auxiliar.focus();
      auxiliar.select();
      const copiou = document.execCommand("copy");
      auxiliar.remove();
      if (!copiou) throw new Error("Cópia não disponível");
    }
    mostrarStatusPedido("Dados copiados! Cole no WhatsApp (11) 94203-8103 e anexe o arquivo do pedido (.json) e a prévia em PDF como documentos. Depois toque em Enviar.");
  } catch (erro) {
    mostrarStatusPedido("Não foi possível copiar automaticamente. Use o botão 'Enviar meu pedido à MOSS' para abrir o WhatsApp.");
  }
}

/* ---------- Inicialização ---------- */
// A ferramenta local de finalização reutiliza os modelos, sem o formulário público.
if (FORM) {
// Recupera o que a pessoa já tinha preenchido neste navegador, se existir.
const restaurou = restaurarRascunho();
if (!restaurou) {
  projetosLista.appendChild(linhaProjeto(1));
  projetosLista.appendChild(linhaProjeto(2));
}
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
// Seleciona os DOIS botões de WhatsApp; o seletor simples $ não gera lista.
/* Abre a mesma prévia numa janela grande (about:blank), sem nenhum dado a mais —
   só a leitura em conforto do que já está na tela. */
function abrirPreviewGrande() {
  const janela = window.open("about:blank", "_blank");
  if (!janela) {
    mostrarStatusPedido("O navegador bloqueou a nova janela. Permita pop-ups para este site — ou use ‘Baixar prévia em PDF’.");
    return;
  }
  janela.document.open();
  janela.document.write(PREVIEW.srcdoc);
  janela.document.close();
}

$$("#whatsapp-cta, #whatsapp-cta-2").forEach((btn) => btn.addEventListener("click", abrirWhatsApp));
$("#copiar-pedido").addEventListener("click", copiarPedido);
const abrirPreviewBtn = $("#abrir-preview");
if (abrirPreviewBtn) abrirPreviewBtn.addEventListener("click", abrirPreviewGrande);
// Apaga o rascunho guardado neste navegador, com confirmação.
$("#apagar-rascunho").addEventListener("click", () => {
  const confirmar = confirm("Apagar o rascunho salvo neste navegador? Os textos, a foto e os projetos preenchidos aqui serão perdidos.");
  if (!confirmar) return;
  try { localStorage.removeItem(CHAVE_RASCUNHO); } catch { /* sem armazenamento */ }
  location.reload();
});
FORM.addEventListener("input", atualizarPreview);
FORM.addEventListener("change", atualizarPreview);
FORM.addEventListener("submit", (e) => e.preventDefault());

atualizarContadorProjetos();
atualizarPreview();
}
