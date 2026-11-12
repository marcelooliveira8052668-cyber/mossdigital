/* MOSS Digital — envio do PDF para o proprietário.
 * Esta função só é exibida após configurar endpoint e Turnstile.
 * O arquivo permanece na memória até ser enviado; NÃO há download público.
 * Os três modelos de portfólio continuam no arquivo portfolio.js.
 */
"use strict";

(() => {
  const config = window.MOSS_PORTFOLIO_EMAIL || {};
  const endpoint = typeof config.endpoint === "string" ? config.endpoint.trim() : "";
  const chavePublica = typeof config.turnstileSiteKey === "string" ? config.turnstileSiteKey.trim() : "";
  const painel = document.getElementById("email-panel");
  const botao = document.getElementById("email-cta");
  const mensagem = document.getElementById("email-msg");
  const verificador = document.getElementById("email-verificacao");
  const consentimento = document.getElementById("email-consentimento");
  const contato = document.getElementById("email-contato");

  // Sem configuração real, o recurso NÃO aparece como funcional.
  if (!painel || !botao || !endpoint.startsWith("https://") || !chavePublica) return;
  painel.hidden = false;
  let turnstileId = null;
  let ocupado = false;

  function status(texto) {
    mensagem.textContent = texto;
    mensagem.hidden = false;
  }

  // Carrega a verificação gratuita de formulário (a chave secreta fica no servidor).
  const scriptSeguranca = document.createElement("script");
  scriptSeguranca.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
  scriptSeguranca.async = true;
  scriptSeguranca.onload = () => {
    if (!window.turnstile) {
      status("A verificação de segurança não carregou. Use o WhatsApp.");
      return;
    }
    try {
      turnstileId = window.turnstile.render(verificador, {
        sitekey: chavePublica,
        action: "portfolio_email",
        theme: "dark"
      });
    } catch {
      status("Não foi possível abrir a verificação de segurança. Use o WhatsApp.");
    }
  };
  scriptSeguranca.onerror = () => status("A verificação de segurança está indisponível. Use o WhatsApp.");
  document.head.appendChild(scriptSeguranca);

  /*
   * Recria o modelo em um iframe temporário isolado. A biblioteca html2pdf
   * gera o PDF ali mesmo, respeitando o CSS do modelo escolhido.
   * O arquivo gerado retorna apenas à memória da página, nunca ao visitante.
   */
  function gerarPDF(dados) {
    return new Promise((resolve, reject) => {
      const nonce = Math.random().toString(36).slice(2) + Date.now();
      const frame = document.createElement("iframe");
      frame.setAttribute("title", "Preparação temporária do PDF");
      frame.setAttribute("aria-hidden", "true");
      frame.setAttribute("sandbox", "allow-scripts");
      frame.style.cssText = "position:fixed;left:-4000px;top:0;width:794px;height:1123px;border:0;pointer-events:none";
      let encerrado = false;

      function finalizar(erro, pdfBase64) {
        if (encerrado) return;
        encerrado = true;
        clearTimeout(tempo);
        window.removeEventListener("message", receber);
        frame.remove();
        if (erro) reject(erro);
        else resolve(pdfBase64);
      }
      function receber(evento) {
        // Iframe isolado tem origem nula. O nonce impede respostas de outras abas.
        if (evento.source !== frame.contentWindow ||
            evento.data?.tipo !== "MOSS_PDF_PRONTO" ||
            evento.data?.nonce !== nonce) return;
        if (evento.data?.erro) {
          finalizar(new Error("Não foi possível montar o PDF deste modelo."));
          return;
        }
        const dataUri = evento.data?.pdf || "";
        const virgula = dataUri.indexOf(",");
        const base64 = virgula >= 0 ? dataUri.slice(virgula + 1) : "";
        if (!dataUri.startsWith("data:application/pdf") ||
            base64.length < 500 || base64.length > 8 * 1024 * 1024) {
          finalizar(new Error("O arquivo ficou muito grande ou inválido. Escolha uma foto menor."));
          return;
        }
        finalizar(null, base64);
      }

      const tempo = setTimeout(() => finalizar(new Error("A geração do PDF não terminou. Tente novamente.")), 45000);
      window.addEventListener("message", receber);

      // Biblioteca fixada na versão 0.10.1 com verificação de integridade.
      const biblioteca = '<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous"><\/script>';
      const codigo = [
        'window.addEventListener("load", async function () {',
        'try {',
        'if (typeof html2pdf !== "function") throw new Error("Biblioteca indisponível");',
        'var pdf = await html2pdf().set({',
        'margin: 4,',
        'image: { type: "jpeg", quality: 0.88 },',
        'html2canvas: { scale: 1.5, useCORS: false, backgroundColor: null },',
        'jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },',
        'pagebreak: { mode: ["css", "legacy"] }',
        '}).from(document.body).toPdf().outputPdf("datauristring");',
        'window.parent.postMessage({tipo:"MOSS_PDF_PRONTO",nonce:' + JSON.stringify(nonce) + ',pdf:pdf},"*");',
        '} catch (erro) {',
        'window.parent.postMessage({tipo:"MOSS_PDF_PRONTO",nonce:' + JSON.stringify(nonce) + ',erro:true},"*");',
        '}',
        '});'
      ].join("\n");
      // Os dados inseridos nos modelos já são escapados por portfolio.js.
      const modelo = templates[dados.template](dados);
      if (!modelo.includes("</body>")) {
        finalizar(new Error("Modelo não preparado para PDF."));
        return;
      }
      frame.srcdoc = modelo.replace("</body>", biblioteca + "<script>" + codigo + "<\/script></body>");
      document.body.appendChild(frame);
    });
  }

  async function enviarPorEmail() {
    if (ocupado) return;
    if (!validarPedido()) return;

    const emailDeContato = contato.value.trim();
    if (!contato.checkValidity() || !emailDeContato) {
      status("Informe um e-mail válido para receber sua resposta e o portfólio depois do pagamento.");
      contato.focus();
      return;
    }
    if (!consentimento.checked) {
      status("Autorize o envio dos seus dados e da foto para a MOSS Digital.");
      consentimento.focus();
      return;
    }

    const token = turnstileId !== null && window.turnstile
      ? window.turnstile.getResponse(turnstileId) : "";
    if (!token) {
      status("Conclua a verificação de segurança antes de enviar.");
      return;
    }
    ocupado = true;
    botao.disabled = true;
    status("Montando o PDF completo para encaminhar à MOSS...");

    try {
      const dados = coletar();
      const pdfBase64 = await gerarPDF(dados);
      status("PDF pronto. Encaminhando ao e-mail da MOSS...");
      const resposta = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: dados.nome,
          profissao: dados.funcao,
          modelo: dados.template,
          emailContato: emailDeContato,
          resumo: mensagemWhatsApp().split("\\n").filter((linha) =>
            !linha.startsWith("*Foto escolhida na prévia:*") &&
            !linha.startsWith("A foto não é anexada automaticamente") &&
            !linha.startsWith("Por favor, confirmem prazo")
          ).join("\\n") + "\\nFoto: incluída no PDF anexado, quando selecionada.",
          pdfBase64,
          turnstileToken: token,
          consentimento: true
        })
      });
      const resultado = await resposta.json().catch(() => ({}));
      if (!resposta.ok || resultado.ok !== true) {
        throw new Error(resultado.error || "Não foi possível encaminhar. Tente novamente.");
      }
      status("Pedido aceito para envio à MOSS Digital! O PDF foi encaminhado ao serviço de e-mail. Aguarde nosso contato para confirmar o pagamento de R$ 39,90. Nenhuma cobrança foi realizada aqui.");
    } catch (erro) {
      status(erro.message || "O envio não foi concluído. Use o WhatsApp como alternativa.");
    } finally {
      ocupado = false;
      botao.disabled = false;
      if (turnstileId !== null && window.turnstile) window.turnstile.reset(turnstileId);
    }
  }

  botao.addEventListener("click", enviarPorEmail);
})();
