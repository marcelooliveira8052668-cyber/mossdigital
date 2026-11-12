/**
 * MOSS Digital — recepção segura dos pedidos de portfólio em PDF.
 * Hospedagem: Cloudflare Workers. O segredo da Resend fica SOMENTE aqui.
 * O destinatário é fixo: visitantes não podem escolher outro e-mail.
 */
const DESTINATARIO = "marcelo.oliveira8052668@gmail.com";
const ORIGENS = new Set([
  "https://mossdigital.com.br",
  "https://www.mossdigital.com.br"
]);
const VERIFICADORES = new Set(["mossdigital.com.br", "www.mossdigital.com.br"]);
const MAX_BASE64 = 8 * 1024 * 1024;
const MAX_BODY = MAX_BASE64 + 18_000;

function resposta(json, status, origin) {
  return new Response(JSON.stringify(json), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": ORIGENS.has(origin) ? origin : "https://mossdigital.com.br",
      "Vary": "Origin",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    }
  });
}

function textoLimitado(value, limite) {
  return typeof value === "string" ? value.trim().slice(0, limite) : "";
}

function emailValido(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 200;
}

function nomeArquivo(nome) {
  const seguro = nome.toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  return "portfolio-" + (seguro || "cliente") + ".pdf";
}

async function validarTurnstile(token, request, env) {
  const corpo = new URLSearchParams({
    secret: env.TURNSTILE_SECRET,
    response: token,
    remoteip: request.headers.get("CF-Connecting-IP") || ""
  });
  const resposta = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: corpo
  });
  if (!resposta.ok) return false;
  const validacao = await resposta.json();
  return validacao.success === true &&
    VERIFICADORES.has(validacao.hostname) &&
    validacao.action === "portfolio_email";
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const path = new URL(request.url).pathname;

    // Nenhum pedido pode ser enviado por páginas de outros domínios.
    if (!ORIGENS.has(origin)) {
      return resposta({ error: "Origem não autorizada." }, 403, origin);
    }
    if (request.method === "OPTIONS") {
      return resposta({ ok: true }, 200, origin);
    }
    if (request.method !== "POST" || path !== "/pedido-portfolio") {
      return resposta({ error: "Rota não encontrada." }, 404, origin);
    }
    if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET || !env.EMAIL_FROM) {
      return resposta({ error: "Serviço de envio ainda não configurado." }, 503, origin);
    }
    if (!(request.headers.get("Content-Type") || "").includes("application/json")) {
      return resposta({ error: "Formato inválido." }, 415, origin);
    }
    const tamanho = Number(request.headers.get("Content-Length") || "0");
    if (tamanho > MAX_BODY) {
      return resposta({ error: "PDF muito grande. Escolha uma foto menor." }, 413, origin);
    }

    let dados;
    try {
      const bruto = await request.text();
      if (bruto.length > MAX_BODY) {
        return resposta({ error: "PDF muito grande. Escolha uma foto menor." }, 413, origin);
      }
      dados = JSON.parse(bruto);
    } catch {
      return resposta({ error: "Pedido inválido." }, 400, origin);
    }

    const nome = textoLimitado(dados?.nome, 80);
    const profissao = textoLimitado(dados?.profissao, 80);
    const contato = textoLimitado(dados?.emailContato, 200);
    const modelo = textoLimitado(dados?.modelo, 30);
    const resumo = textoLimitado(dados?.resumo, 12_000);
    const pdf = dados?.pdfBase64;
    const token = dados?.turnstileToken;

    if (!nome || !profissao || !emailValido(contato) ||
        !["profissional", "criativo", "tecnologia"].includes(modelo) ||
        dados?.consentimento !== true) {
      return resposta({ error: "Preencha nome, profissão, e-mail e autorização de envio." }, 400, origin);
    }

    if (typeof pdf !== "string" || pdf.length < 500 || pdf.length > MAX_BASE64 ||
        !/^[A-Za-z0-9+/]+={0,2}$/.test(pdf) ||
        !atob(pdf.slice(0, 16)).startsWith("%PDF-")) {
      return resposta({ error: "Arquivo PDF inválido ou grande demais." }, 400, origin);
    }
    if (typeof token !== "string" || !token || token.length > 2048) {
      return resposta({ error: "Conclua a verificação de segurança." }, 400, origin);
    }

    try {
      const valido = await validarTurnstile(token, request, env);
      if (!valido) {
        return resposta({ error: "Verificação expirada ou inválida. Tente novamente." }, 403, origin);
      }
    } catch {
      return resposta({ error: "Não foi possível validar a segurança do envio." }, 502, origin);
    }

    // Mensagem fixa para o proprietário, com PDF anexado. NUNCA retorna o PDF.
    const corpo = [
      "Novo pedido de portfólio — MOSS Digital",
      "Nome: " + nome,
      "Profissão: " + profissao,
      "Modelo: " + modelo,
      "E-mail para resposta: " + contato,
      "Pagamento: pendente de confirmação (R$ 39,90)",
      "",
      "Dados preenchidos pelo cliente:",
      resumo,
      "",
      "PDF gerado e anexado. Confirme pagamento antes de enviar ao cliente."
    ].join("\n");

    let enviado;
    try {
      enviado = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + env.RESEND_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: env.EMAIL_FROM,
          to: [DESTINATARIO],
          reply_to: contato,
          subject: "MOSS · Novo portfólio: " + nome,
          text: corpo,
          attachments: [{
            filename: nomeArquivo(nome),
            content: pdf,
            content_type: "application/pdf"
          }]
        })
      });
    } catch {
      return resposta({ error: "Serviço de e-mail indisponível. Tente novamente." }, 502, origin);
    }
    if (!enviado.ok) {
      // Não expõe tokens, erros internos ou dados pessoais ao visitante.
      return resposta({ error: "Não foi possível encaminhar o pedido. Tente novamente." }, 502, origin);
    }
    return resposta({ ok: true, message: "Pedido aceito para envio ao e-mail da MOSS." }, 200, origin);
  }
};
