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


// 73 — SENTINELA DIGITAL: checklist didático, sem varredura ou diagnóstico.
const marcadoresSec = [...document.querySelectorAll("#sec-form input[type='checkbox']")]; // 6 práticas organizacionais.
function atualizarChecklistSec() { // Atualiza contagem sem atribuir uma nota de segurança.
 const praticas = marcadoresSec.filter(item=>item.checked); // Itens declarados pelo usuário.
 const quantidade = praticas.length; // Quantidade de práticas marcadas.
 document.getElementById("sec-score").textContent=`${quantidade} de ${marcadoresSec.length}`; // Resultado descritivo.
 document.getElementById("sec-bar").style.width=`${100*quantidade/marcadoresSec.length}%`; // Barra apenas visual.
 const dicas = quantidade===0 ? "Comece identificando quais rotinas existem de fato na empresa." : quantidade<3 ? "Há itens não marcados: considere conversar com um profissional sobre prioridades." : quantidade<6 ? "Vale revisar os itens pendentes com a equipe responsável." : "Você informou a existência das seis rotinas. Isso não comprova que estão implementadas corretamente."; // Sem avaliar risco real.
 document.getElementById("sec-advice").textContent=dicas; // Orientação limitada.
 return praticas.map(item=>item.value); // Retorna seleção.
}
marcadoresSec.forEach(item=>item.addEventListener("change",atualizarChecklistSec)); // Recalcula ao marcar.
document.getElementById("sec-whatsapp").addEventListener("click",()=>{ // Inicia contato voluntário.
 const itens=atualizarChecklistSec(); // Práticas informadas.
 const mensagem=`Olá! Gostaria de orientação profissional sobre rotinas de segurança digital.
Marquei ${itens.length} de 6 práticas no checklist ilustrativo:
${itens.length?itens.map(item=>'- '+item).join('\n'):'(nenhuma prática marcada)'}
Sei que isso não é uma auditoria nem diagnóstico.`; // Texto que pode ser editado pelo usuário.
 abrirWhatsApp(mensagem); // Abre conversa, sem acessar dispositivos ou redes.
});
atualizarChecklistSec(); // Mostra estado inicial.
