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


// 72 — EDITORA FAROL: seleção de livros e cotação em volume.
const livrosFarol = [ // Autores e obras fictícios, criados para esta demonstração.
 {id:1,titulo:"Entre Linhas e Cidades",autor:"Lia Monte",genero:"Ficção",valor:49.9,cor:"#5f9e91",letra:"#f5eee1"},
 {id:2,titulo:"O Tempo Depois do Sol",autor:"Caio Ventura",genero:"Ficção",valor:54.9,cor:"#e3bf75",letra:"#312821"},
 {id:3,titulo:"Cartas da História",autor:"Elisa Moura",genero:"História",valor:62.9,cor:"#6c506e",letra:"#fff5de"},
 {id:4,titulo:"A Cidade Inventada",autor:"Raul Pinto",genero:"Infantojuvenil",valor:39.9,cor:"#e17d52",letra:"#25231a"},
 {id:5,titulo:"O Mundo que Lemos",autor:"Bia Campos",genero:"Ensaios",valor:44.9,cor:"#a6ba9b",letra:"#222e27"},
 {id:6,titulo:"Pequenas Grandes Rotas",autor:"Tânia Luz",genero:"Infantojuvenil",valor:36.9,cor:"#4885a1",letra:"#ffefc9"},
 {id:7,titulo:"A Palavra e o Tempo",autor:"Mauro Paes",genero:"História",valor:58.9,cor:"#b35448",letra:"#fff4e7"},
 {id:8,titulo:"Horizontes de Papel",autor:"Dora Reis",genero:"Ensaios",valor:45.9,cor:"#424d47",letra:"#f8e8b3"}
];
const sacolaFarol = new Map(); // Quantidades são temporárias e não há pagamento.
const livrosGrid = document.getElementById("books-grid"); // Lista de títulos.
const livrosBusca = document.getElementById("books-search"); // Busca de texto.
const livrosGenero = document.getElementById("books-category"); // Categoria.
function desenharLivros() { // Aplica busca e categoria no catálogo.
 const termo=livrosBusca.value.trim().toLocaleLowerCase("pt-BR"); // Normaliza texto.
 const encontrados=livrosFarol.filter(livro=>(livrosGenero.value==="Todos"||livro.genero===livrosGenero.value) && (livro.titulo+" "+livro.autor).toLocaleLowerCase("pt-BR").includes(termo)); // Filtros combinados.
 livrosGrid.innerHTML=encontrados.map(livro=>`<article class="book-card"><div class="cover" style="background:${livro.cor};color:${livro.letra}"><small>FAROL EDITORA ✦</small><strong>${escapar(livro.titulo)}</strong><span>${escapar(livro.autor)}</span></div><div class="book-meta"><small>${escapar(livro.genero.toUpperCase())}</small><h3>${escapar(livro.titulo)}</h3><p>${escapar(livro.autor)}</p><div><strong>${moeda(livro.valor)}</strong><button data-addbook="${livro.id}">+ SELECIONAR</button></div></div></article>`).join('') || '<p>Nenhum livro fictício encontrado.</p>'; // Mantém visual de capas autorais.
 document.getElementById("book-count").textContent=`${encontrados.length} títulos`; // Total filtrado.
 document.querySelectorAll("[data-addbook]").forEach(botao=>botao.addEventListener("click",()=>{ // Seleciona exemplar.
  const id=Number(botao.dataset.addbook); // Identifica obra.
  sacolaFarol.set(id,(sacolaFarol.get(id)||0)+1); // Soma quantidade.
  desenharSacola(); // Atualiza cotação.
  botao.textContent="✓ ADICIONADO"; // Feedback ao usuário.
 }));
}
function valoresFarol() { // Calcula valores ilustrativos, com desconto por quantidade.
 const qtd=[...sacolaFarol.values()].reduce((s,v)=>s+v,0); // Exemplares totais.
 const subtotal=[...sacolaFarol.entries()].reduce((s,[id,qtd])=>s+livrosFarol.find(l=>l.id===id).valor*qtd,0); // Soma dos livros.
 const taxa=qtd>=30?.20:qtd>=10?.10:0; // Faixa de desconto de exemplo.
 return {qtd,subtotal,taxa,desconto:subtotal*taxa,total:subtotal*(1-taxa)}; // Retorna dados.
}
function desenharSacola() { // Atualiza cesta e totais sem rede.
 const area=document.getElementById("book-cart"); // Área de seleção.
 area.innerHTML=sacolaFarol.size?[...sacolaFarol.entries()].map(([id,qtd])=>{const l=livrosFarol.find(x=>x.id===id);return `<div class="cart-row"><div><strong>${escapar(l.titulo)}</strong><small>${moeda(l.valor)} / exemplar</small></div><label aria-label="Quantidade de ${escapar(l.titulo)}"><input type="number" min="1" max="100" data-book-qty="${id}" value="${qtd}"></label><button data-book-del="${id}" aria-label="Remover ${escapar(l.titulo)}">Remover</button></div>`;}).join(''):'<div class="cart-empty">Sua seleção ainda está vazia. Escolha livros no catálogo.</div>'; // Lista atual.
 area.querySelectorAll("[data-book-qty]").forEach(campo=>campo.addEventListener("change",()=>{ // Permite cotações em volume.
  const id=Number(campo.dataset.bookQty); const qtd=Math.max(1,Math.min(100,Math.floor(Number(campo.value)||1))); sacolaFarol.set(id,qtd); campo.value=String(qtd); atualizarResumoFarol(); // Valida e atualiza sem remover o campo durante o evento.
 }));
 area.querySelectorAll("[data-book-del]").forEach(botao=>botao.addEventListener("click",()=>{ sacolaFarol.delete(Number(botao.dataset.bookDel)); desenharSacola(); })); // Exclui item.
 atualizarResumoFarol(); // Recalcula o resumo após montar os itens.
}
function atualizarResumoFarol() { // Atualiza somente valores, sem substituir os inputs ativos.
 const valores=valoresFarol(); // Recalcula descontos.
 document.getElementById("book-badge").textContent=String(valores.qtd); // Itens no topo.
 document.getElementById("book-discount").textContent=`Desconto ilustrativo (${Math.round(valores.taxa*100)}%): ${moeda(valores.desconto)}`; // Desconto.
 document.getElementById("book-total").textContent=moeda(valores.total); // Total.
}
[livrosBusca,livrosGenero].forEach(campo=>campo.addEventListener("input",desenharLivros)); // Busca instantânea.
document.getElementById("book-whatsapp").addEventListener("click",()=>{ // Botão de cotação, sem compra.
 if(!sacolaFarol.size){ document.getElementById("catalogo").scrollIntoView({behavior:"smooth"}); return; } // Não envia cesta vazia.
 const lista=[...sacolaFarol.entries()].map(([id,qtd])=>{const l=livrosFarol.find(x=>x.id===id);return `${qtd}x ${l.titulo}`;}).join("\n"); // Itens legíveis.
 abrirWhatsApp(`Olá! Gostaria de solicitar uma cotação da Editora Farol.
${lista}
Total ilustrativo: ${moeda(valoresFarol().total)}.
Por favor, confirmem condições e disponibilidade.`); // Abre conversa.
});
desenharLivros(); desenharSacola(); // Inicializa catálogo e cesta.
