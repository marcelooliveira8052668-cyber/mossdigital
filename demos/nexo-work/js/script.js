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


// 69 — NEXO WORK: estimador de reserva ilustrativa.
const tarifasNexo = {"Mesa flex":55,"Sala privativa":180,"Sala de reunião":120}; // Preço de exemplo por período.
const espacoNexo = document.getElementById("nexo-space"); // Escolha da modalidade.
const periodosNexo = document.getElementById("nexo-periods"); // Quantidade de períodos.
const pessoasNexo = document.getElementById("nexo-people"); // Participantes.
const cafeNexo = document.getElementById("nexo-coffee"); // Adicional café.
const projetorNexo = document.getElementById("nexo-projector"); // Adicional projetor.
const totalNexo = document.getElementById("nexo-total"); // Elemento de retorno.
function calcularNexo() { // Recalcula sem enviar dados a nenhum servidor.
 const periodos = Math.max(1,Math.min(15,Number(periodosNexo.value)||1)); // Limite didático.
 const pessoas = Math.max(1,Math.min(20,Number(pessoasNexo.value)||1)); // Limite didático.
 const base = tarifasNexo[espacoNexo.value] * periodos; // Valor do ambiente.
 const cafe = cafeNexo.checked ? 18 * pessoas * periodos : 0; // Café do grupo.
 const projetor = projetorNexo.checked ? 45 * periodos : 0; // Projetor por período.
 const total = base + cafe + projetor; // Resultado estimado.
 totalNexo.textContent = moeda(total); // Exibe com formatação brasileira.
 document.querySelectorAll("[data-space-card]").forEach(card => card.classList.toggle("active",card.dataset.spaceCard===espacoNexo.value)); // Marca card ativo.
 return total; // Retorna para a mensagem WhatsApp.
}
[espacoNexo,periodosNexo,pessoasNexo,cafeNexo,projetorNexo].forEach(campo=>campo.addEventListener("input",calcularNexo)); // Reage a alterações.
document.querySelectorAll("[data-pick]").forEach(botao=>botao.addEventListener("click",()=>{ // Atalho dos cards.
 espacoNexo.value=botao.dataset.pick; calcularNexo(); document.getElementById("reservar").scrollIntoView({behavior:"smooth"}); // Seleciona e rola.
}));
document.getElementById("nexo-form").addEventListener("submit",evento=>{ // Envia somente intenção de contato.
 evento.preventDefault(); // Não recarrega a página.
 const dia=document.getElementById("nexo-date").value; // Lê a data.
 if(!dia) return; // O campo data é obrigatório.
 const mensagem=`Olá! Quero consultar disponibilidade na Nexo Work.
Espaço: ${espacoNexo.value}
Data: ${dia}
Períodos: ${periodosNexo.value}
Pessoas: ${pessoasNexo.value}
Café: ${cafeNexo.checked?'Sim':'Não'}
Projetor: ${projetorNexo.checked?'Sim':'Não'}
Estimativa ilustrativa: ${moeda(calcularNexo())}.
Gostaria de confirmar preço e disponibilidade.`; // Mensagem editável.
 abrirWhatsApp(mensagem); // Abre WhatsApp somente após clique.
});
calcularNexo(); // Preenche total inicial.
