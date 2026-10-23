/* ==========================================================================
   CONFIGURAÇÃO DA LOJA
   --------------------------------------------------------------------------
   Tudo que é "dados da empresa" está aqui. Troque os valores abaixo e o site
   inteiro se atualiza — cabeçalho, rodapé, WhatsApp, mapa, Pix e prazos.
   Nenhuma outra página precisa ser editada.

   Regra única para o WhatsApp: só números, com DDI 55 na frente.
   Errado:  "(11) 99999-9999"   |   Certo:  "5511999999999"
   ========================================================================== */

const CONFIG = {

  /* ---------------- IDENTIDADE ---------------- */
  loja: {
    nome: "NEXA STORE",
    prefixo: "NEXA",          // parte que fica colorida no logo
    sufixo: "STORE",
    slogan: "Tecnologia premium com entrega rápida para todo o Brasil.",
    assinatura: "Loja demonstrativa. Preços, endereço e contatos são fictícios.",
    telefone: "(11) 4000-0000",
    whatsapp: "5511999999999",
    email: "contato@nexastore.com.br",
    horario: "Segunda a sexta, das 9h às 18h",
    instagram: "https://instagram.com/"
  },

  /* ---------------- ONDE ESTAMOS ----------------
     lat / lon alimentam o mapa do site (venda, preparação e entrega).
     Troque pelos números do seu endereço real.                        */
  endereco: {
    titulo: "Loja física e centro de distribuição",
    rua: "Av. Paulista, 1000 — Conjunto 12",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    uf: "SP",
    cep: "01310-100",
    lat: -23.5614,
    lon: -46.6559,
    /* abre o Google Maps no navegador do cliente, para traçar rota */
    comoChegar: "https://www.google.com/maps/search/?api=1&query=-23.5614,-46.6559"
  },

  /* ---------------- PAGAMENTO ----------------
     pix.chave  -> chave Pix real (CPF, CNPJ, e-mail ou aleatória).
                   Com a chave certa, o QR Code gerado no checkout já
                   recebe pagamento de verdade.                          */
  pagamento: {
    pix: {
      chave: "11999999999",
      titular: "NEXA STORE LTDA",
      cidade: "SAO PAULO"
    },
    parcelas: [1, 2, 3, 4, 6, 10, 12],
    /* exibido só como referência na simulação do cartão */
    jurosCredito: 0.0399
  },

  /* ---------------- ENTREGA ---------------- */
  entrega: {
    freteGratisAcima: 199,
    taxaFixa: 15.9,
    prazoCapital: [2, 4],      // dias úteis
    prazoInterior: [5, 9],
    diasPorRegiao: {           // pode ser ajustado por estado
      SP: [2, 3], RJ: [2, 4], MG: [3, 5]
    }
  },

  /* ---------------- IDENTIDADE VISUAL ----------------
     A cor principal do site inteiro. Use código HEX.                     */
  cores: {
    principal: "#6366f1"
  }
};

/* ==========================================================================
   NÃO PRECISA MEXER ABAIXO DAQUI
   ========================================================================== */

/* Monta o link de WhatsApp com a mensagem já preenchida. */
function linkWhats(mensagem) {
  const numero = String(CONFIG.loja.whatsapp).replace(/\D/g, "");
  const texto = mensagem || ("Olá! Vim pelo site " + CONFIG.loja.nome + " e gostaria de ajuda.");
  return "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto);
}

/* Link do mapa embutido (OpenStreetMap, sem chave de API). */
function linkMapa(raio) {
  const r = raio || 0.006;
  const { lat, lon } = CONFIG.endereco;
  const bbox = [lon - r * 1.6, lat - r, lon + r * 1.6, lat + r].join(",");
  return "https://www.openstreetmap.org/export/embed.html?bbox=" + bbox +
         "&layer=mapnik&marker=" + lat + "," + lon;
}

/* Prazo de entrega em dias úteis, conforme o CEP digitado. */
function prazoPorCep(cep) {
  const digitos = String(cep || "").replace(/\D/g, "");
  if (digitos.length !== 8) return CONFIG.entrega.prazoInterior;
  const uf = digitos.slice(0, 1);          // primeiro dígito ~ região
  if (uf === "0" || uf === "1") return CONFIG.entrega.prazoCapital;
  return CONFIG.entrega.prazoInterior;
}

/* Aplica a cor escolhida pelo cliente sem exigir que ele edite o CSS. */
(function aplicarCor() {
  const hex = CONFIG.cores.principal;
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const raiz = document.documentElement;
  raiz.style.setProperty("--accent", hex);
  raiz.style.setProperty("--accent-rgb", r + ", " + g + ", " + b);
})();
