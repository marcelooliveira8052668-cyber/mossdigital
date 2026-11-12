/* Fluxo local e gratuito. Nenhum upload; pedidos contêm dados pessoais. */
"use strict";
window.MossArquivos = (() => {
  const MAX = 5 * 1024 * 1024;
  function validar(arquivo) {
    if (!arquivo || arquivo.tipo !== "moss-portfolio" || arquivo.versao !== 1) throw new Error("Este não é um arquivo de pedido MOSS válido.");
    const s = arquivo.dados;
    if (!s || !Object.hasOwn(templates, s.template)) throw new Error("Modelo inválido.");
    const limites = { nome: 100, funcao: 120, cidade: 120, sobre: 600, email: 254, site: 300 };
    const dados = { template: s.template, cor: corSegura(s.cor), foto: null };
    for (const [campo, limite] of Object.entries(limites)) {
      if (typeof s[campo] !== "string" || s[campo].length > limite) throw new Error("Campo inválido: " + campo);
      dados[campo] = s[campo];
    }
    if (!dados.nome.trim() || !dados.funcao.trim()) throw new Error("Pedido sem nome ou profissão.");
    if (!Array.isArray(s.habilidades) || s.habilidades.length > 6 || s.habilidades.some(h => typeof h !== "string" || h.length > 200)) throw new Error("Habilidades inválidas.");
    if (!Array.isArray(s.projetos) || s.projetos.length > 4) throw new Error("Projetos inválidos.");
    dados.habilidades = s.habilidades.slice();
    dados.projetos = s.projetos.map(p => {
      if (!p || ["nome", "desc", "link"].some(k => typeof p[k] !== "string") || p.nome.length > 80 || p.desc.length > 220 || p.link.length > 300) throw new Error("Projeto inválido.");
      return { nome: p.nome, desc: p.desc, link: urlSegura(p.link) };
    });
    dados.site = urlSegura(dados.site);
    if (s.foto != null) {
      if (typeof s.foto !== "string" || s.foto.length > MAX || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(s.foto)) throw new Error("Foto inválida.");
      dados.foto = s.foto;
    }
    return dados;
  }
  function urlSegura(v) {
    if (!v) return "";
    try { const u = new URL(v); return ["http:", "https:"].includes(u.protocol) ? u.href : ""; } catch { return ""; }
  }
  function baixar(blob, nome) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = nome;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
  function pedido(dados) {
    return { tipo: "moss-portfolio", versao: 1, criadoEm: new Date().toISOString(), dados };
  }
  async function pdf(dados, previa = true) {
    // Revalida mesmo os dados locais. Dados importados nunca são executados.
    dados = validar(pedido(dados));
    const frame = document.createElement("iframe");
    frame.title = "Preparação do PDF";
    // html2canvas precisa acessar seu iframe de clonagem. O HTML vem apenas
    // dos modelos fixos, com textos escapados e foto raster validada acima.
    frame.setAttribute("sandbox", "allow-scripts allow-same-origin");
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;left:-10000px;top:0;width:794px;height:1123px;border:0";
    const nonce = crypto.randomUUID();
    const resultado = new Promise((resolve, reject) => {
      const fim = (erro, valor) => {
        clearTimeout(timer); window.removeEventListener("message", receber); frame.remove();
        if (erro) reject(erro); else resolve(valor);
      };
      const receber = e => {
        if (e.source !== frame.contentWindow || e.data?.nonce !== nonce) return;
        if (e.data.erro) { console.error("MOSS PDF:", e.data.detalhe); return fim(new Error("Não foi possível gerar o PDF. Confira a conexão com a internet e tente novamente.")); }
        const uri = e.data.pdf;
        if (typeof uri !== "string" || !uri.startsWith("data:application/pdf") || uri.length > 24 * 1024 * 1024) return fim(new Error("PDF inválido ou muito grande."));
        const base64 = uri.slice(uri.indexOf(",") + 1);
        try { fim(null, new Blob([Uint8Array.from(atob(base64), c => c.charCodeAt(0))], { type: "application/pdf" })); } catch { fim(new Error("PDF inválido.")); }
      };
      const timer = setTimeout(() => fim(new Error("A geração demorou demais. Tente uma foto menor e confira a internet.")), 60000);
      window.addEventListener("message", receber);
    });
    const codigo = `window.addEventListener('load', async () => {
      try {
        await document.fonts.ready;
        await Promise.all(Array.from(document.images, img => img.decode().catch(() => {})));
        const worker = html2pdf().set({margin:8,image:{type:'jpeg',quality:0.92},html2canvas:{scale:1.5,backgroundColor:null},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'},pagebreak:{mode:['css','legacy'],avoid:['article','header','footer']}}).from(document.body).toPdf();
        await worker;
        const doc = await worker.get('pdf');
        if (${previa === true}) {
          for(let p=1;p<=doc.internal.getNumberOfPages();p++) {
            doc.setPage(p); doc.setTextColor(190,55,55); doc.setFontSize(22);
            for(let y=55;y<290;y+=75) doc.text('PREVIA - MOSS DIGITAL',105,y,{align:'center'});
            doc.setFontSize(10); doc.text('DEMONSTRACAO - NAO E O ARQUIVO FINAL',105,290,{align:'center'});
          }
        }
        parent.postMessage({nonce:${JSON.stringify(nonce)},pdf:doc.output('datauristring')},'*');
      } catch (erro) { parent.postMessage({nonce:${JSON.stringify(nonce)},erro:true,detalhe:String(erro)},'*'); }
    });`;
    const lib = '<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous"><\/script>';
    frame.srcdoc = templates[dados.template](dados).replace("</head>", "<style>body{overflow-wrap:anywhere}article,header,footer{break-inside:avoid}</style></head>").replace("</body>", lib + "<script>" + codigo + "<\/script></body>");
    document.body.appendChild(frame);
    return resultado;
  }
  return { validar, pedido, baixar, pdf, MAX };
})();

if (document.getElementById("baixar-previa")) {
  let ocupado = false;

  /* Resultado visível: o PDF aparece na própria página e cada arquivo gerado
     é listado com o nome exato e o lugar onde o navegador o salvou. */
  const painelResultado = document.getElementById("resultado-pdf");
  const tituloResultado = document.getElementById("resultado-titulo");
  const infoResultado = document.getElementById("resultado-info");
  const quadroPdf = document.getElementById("resultado-frame");
  const linkPdf = document.getElementById("resultado-baixar-pdf");
  const listaArquivos = document.getElementById("lista-arquivos");
  let urlPdfAtual = null;

  const ONDE_SALVO = "Pasta Downloads do navegador — no Windows é a pasta Downloads, no iPhone é Arquivos › Downloads e no Android é Downloads.";

  function registrarArquivo(nome, detalhe) {
    if (!listaArquivos) return;
    // Substitui a entrada anterior do mesmo arquivo, caso a pessoa gere de novo.
    [...listaArquivos.children].forEach((item) => {
      if (item.dataset.nome === nome) item.remove();
    });
    const item = document.createElement("li");
    item.dataset.nome = nome;
    const forte = document.createElement("strong");
    forte.textContent = nome;
    item.appendChild(forte);
    item.append(" — " + detalhe);
    listaArquivos.appendChild(item);
  }

  function prepararResultado() {
    if (!painelResultado) return false;
    painelResultado.hidden = false;
    painelResultado.classList.remove("erro");
    return true;
  }

  function mostrarPdfResultado(blob, nome) {
    if (!prepararResultado()) return;
    if (urlPdfAtual) URL.revokeObjectURL(urlPdfAtual);
    urlPdfAtual = URL.createObjectURL(blob);
    tituloResultado.textContent = "Sua prévia está pronta — o PDF é este:";
    infoResultado.replaceChildren();
    const forte = document.createElement("strong");
    forte.textContent = nome;
    infoResultado.append(forte, ` (${Math.max(1, Math.round(blob.size / 1024))} KB). Ele está aberto aqui embaixo e também foi salvo em ${ONDE_SALVO} Se o navegador mostrar uma barra de downloads, o arquivo está lá também.`);
    if (quadroPdf) { quadroPdf.hidden = false; quadroPdf.src = urlPdfAtual; }
    if (linkPdf) { linkPdf.hidden = false; linkPdf.href = urlPdfAtual; linkPdf.download = nome; }
    registrarArquivo(nome, "prévia em PDF com marca-d'água. " + ONDE_SALVO);
    painelResultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function mostrarErroResultado(mensagem) {
    if (!prepararResultado()) return;
    painelResultado.classList.add("erro");
    tituloResultado.textContent = "Não foi possível gerar o PDF agora";
    infoResultado.textContent = mensagem + " Confira a internet e desative o bloqueador de anúncio (ele pode barrar a biblioteca que monta o PDF) e clique de novo. O que você preencheu continua guardado neste navegador.";
    if (quadroPdf) { quadroPdf.hidden = true; quadroPdf.removeAttribute("src"); }
    if (linkPdf) { linkPdf.hidden = true; }
    painelResultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  document.getElementById("baixar-previa").addEventListener("click", async e => {
    if (ocupado || !validarPedido()) return;
    ocupado = true; e.target.disabled = true;
    mostrarStatusPedido("Preparando a prévia em PDF com marca-d’água...");
    try {
      const dados = coletar();
      const blob = await MossArquivos.pdf(dados);
      const nome = "previa-" + slug(dados.nome) + ".pdf";
      MossArquivos.baixar(blob, nome);
      mostrarPdfResultado(blob, nome);
      mostrarStatusPedido("Prévia gerada! O PDF está aberto logo abaixo e também foi salvo na sua pasta Downloads. Baixe também o arquivo do pedido e anexe os dois como documentos no WhatsApp. Nada foi enviado à MOSS ainda.");
    } catch (erro) {
      mostrarStatusPedido(erro.message);
      mostrarErroResultado(erro.message);
    }
    finally { ocupado = false; e.target.disabled = false; }
  });

  function baixarPedido() {
    if (!validarPedido()) return;
    try {
      const dados = coletar();
      MossArquivos.validar(MossArquivos.pedido(dados));
      const nome = "pedido-portfolio-" + slug(dados.nome) + ".json";
      MossArquivos.baixar(new Blob([JSON.stringify(MossArquivos.pedido(dados))], { type: "application/json" }), nome);
      prepararResultado();
      registrarArquivo(nome, "dados, textos e foto do seu portfólio. " + ONDE_SALVO + " Guarde-o: é o arquivo que a MOSS precisa para finalizar o trabalho sem você preencher tudo de novo.");
      painelResultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
      mostrarStatusPedido("Arquivo do pedido gerado, com seus dados e foto. Ele não é o PDF. No WhatsApp, escolha Anexar > Documento, selecione este arquivo e toque em Enviar. Guarde-o com cuidado: contém dados pessoais.");
    } catch (erro) { mostrarStatusPedido(erro.message); }
  }

  document.getElementById("baixar-pedido").addEventListener("click", baixarPedido);
  const botaoJsonResultado = document.getElementById("resultado-baixar-json");
  if (botaoJsonResultado) botaoJsonResultado.addEventListener("click", baixarPedido);
}
