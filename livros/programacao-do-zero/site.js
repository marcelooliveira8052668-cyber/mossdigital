(function () {
  "use strict";
  var c = window.OFERTA_MOSS || {};
  var botao = document.getElementById("comprar");
  if (!/^55\d{10,11}$/.test(c.whatsapp || "")) return;
  var url = new URL("https://wa.me/" + c.whatsapp);
  url.searchParams.set("text", c.mensagem);
  botao.href = url.href;
  botao.removeAttribute("aria-disabled");
  botao.textContent = "Quero comprar pelo WhatsApp";
  botao.target = "_blank";
  botao.rel = "noopener noreferrer";
  document.getElementById("situacao-compra").textContent = c.entrega + " O botão abre o WhatsApp em outra aba.";
  document.getElementById("texto-entrega").textContent = c.entrega;
  document.getElementById("dados-vendedor").textContent = "Moss Digital · Atendimento e compra: " + c.atendimento;
})();
