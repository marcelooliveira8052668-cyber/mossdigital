// MOSS Digital: configurações comuns e comentários didáticos em português.
const WHATSAPP_MOSS = "5511942038103"; // Número de demonstração, troque pelo do cliente ao personalizar.
const moeda = valor => Number(valor).toLocaleString("pt-BR", {style:"currency",currency:"BRL"}); // Formata moeda em reais.
const abrirWhatsApp = mensagem => { // Prepara uma conversa sem enviar pedidos automaticamente.
  const url = `https://wa.me/${WHATSAPP_MOSS}?text=${encodeURIComponent(mensagem)}`; // A mensagem é codificada na URL.
  window.open(url, "_blank", "noopener,noreferrer"); // O usuário decide se deseja enviar.
};
function iniciarMenu() { // Permite usar o menu no celular e fecha ao selecionar um link.
  const botao = document.querySelector("[data-menu]"); // Localiza o botão de navegação.
  const menu = document.querySelector("[data-nav]"); // Localiza os links.
  if (!botao || !menu) return; // Evita erro caso a estrutura seja adaptada.
  botao.addEventListener("click", () => { // Alterna menu acessível.
    const aberto = menu.classList.toggle("aberto"); // Aplica a classe visual.
    botao.setAttribute("aria-expanded", String(aberto)); // Informa a tecnologia assistiva.
  });
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => { // Fecha ao navegar.
    menu.classList.remove("aberto"); // Esconde o menu.
    botao.setAttribute("aria-expanded", "false"); // Atualiza o estado.
  }));
}
function carregarFotografiasLocais() { // Troca marcadores somente se a fotografia existir.
  document.querySelectorAll("img[data-photo]").forEach(imagem => { // Percorre espaços preparados.
    const teste = new Image(); // Verifica a existência da foto sem quebrar a página.
    teste.onload = () => { imagem.src = teste.src; }; // Mostra a fotografia se carregada.
    teste.onerror = () => {}; // Mantém o SVG caso não exista.
    teste.src = imagem.dataset.photo; // Caminho esperado descrito no guia.
  });
}
function escapar(texto) { // Evita interpretar dados de formulário como código HTML.
 return String(texto).replace(/[&<>"']/g, letra=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[letra]));
}
document.addEventListener("DOMContentLoaded", () => { iniciarMenu(); carregarFotografiasLocais(); }); // Inicia funções compartilhadas.


// 71 — ROTA VIVA: filtragem de roteiros e solicitação de orçamento.
const roteiros = [ // Produtos fictícios, sem disponibilidade ou preço reais.
 {nome:"Serra & Charme",tipo:"Natureza",dias:"4 a 6 dias",descricao:"Paisagens de montanha, gastronomia e pausas para respirar.",foto:"serra-charme.webp"},
 {nome:"Costa Azul",tipo:"Praia",dias:"5 a 7 dias",descricao:"Mar, descanso e dias leves perto da natureza.",foto:"costa-azul.webp"},
 {nome:"Circuito Cultural",tipo:"Cultura",dias:"3 a 5 dias",descricao:"Arte, história e sabores de cidades cheias de vida.",foto:"circuito-cultural.webp"},
 {nome:"Trilhas & Horizonte",tipo:"Natureza",dias:"4 a 8 dias",descricao:"Caminhadas guiadas e roteiros para conhecer novos cenários.",foto:"trilhas-horizonte.webp"}
];
let tipoAtivo="Todos"; // Filtro atual da vitrine.
const areaRoteiros=document.getElementById("routes-list"); // Contêiner dos cards.
function desenharRoteiros() { // Cria somente os cards que atendem à categoria.
 const exibidos=roteiros.filter(item=>tipoAtivo==="Todos"||item.tipo===tipoAtivo); // Aplica categoria.
 areaRoteiros.innerHTML=exibidos.map(item=>`<article class="route-card"><div class="route-pic"><img src="assets/img/placeholder.svg" data-photo="assets/img/${item.foto}" alt="Foto representativa do roteiro fictício ${escapar(item.nome)} a inserir"><span>${escapar(item.tipo.toUpperCase())}</span></div><div class="route-details"><small>VIAGEM / ${escapar(item.dias)}</small><h3>${escapar(item.nome)}</h3><p>${escapar(item.descricao)}</p><button data-route="${escapar(item.nome)}">Planejar roteiro <span>↗</span></button></div></article>`).join(''); // Monta os cards sem bibliotecas.
 carregarFotografiasLocais(); // Verifica fotos inseridas depois.
 document.querySelectorAll("[data-route]").forEach(botao=>botao.addEventListener("click",()=>{ // Pré-seleciona o roteiro.
  document.getElementById("trip-route").value=botao.dataset.route; // Atualiza o formulário.
  document.getElementById("planejar").scrollIntoView({behavior:"smooth"}); // Leva o usuário ao planejador.
 }));
}
document.querySelectorAll("[data-type]").forEach(botao=>botao.addEventListener("click",()=>{ // Alterna categoria.
 tipoAtivo=botao.dataset.type; // Guarda o filtro selecionado.
 document.querySelectorAll("[data-type]").forEach(outro=>{ outro.classList.toggle("selected",outro===botao);outro.setAttribute("aria-pressed",String(outro===botao)); }); // Acessibilidade.
 desenharRoteiros(); // Refaz a vitrine.
}));
document.getElementById("trip-form").addEventListener("submit",evento=>{ // Compõe consulta personalizada.
 evento.preventDefault(); // Impede recarga da página.
 const roteiro=document.getElementById("trip-route").value; // Experiência.
 const mes=document.getElementById("trip-month").value; // Mês solicitado.
 const viajantes=Math.max(1,Math.min(20,Number(document.getElementById("trip-travelers").value)||1)); // Total validado.
 const perfil=document.getElementById("trip-stay").value; // Tipo de hospedagem.
 const orcamento=document.getElementById("trip-budget").value; // Faixa indicada.
 if(!mes) return; // Garante mês válido.
 abrirWhatsApp(`Olá! Quero solicitar uma proposta de viagem pela Rota Viva.
Roteiro: ${roteiro}
Mês: ${mes}
Pessoas: ${viajantes}
Hospedagem: ${perfil}
Orçamento total: ${orcamento}.
Sei que os roteiros são ilustrativos. Podem me orientar?`); // Não cria reserva real.
});
desenharRoteiros(); // Inicia a listagem.
