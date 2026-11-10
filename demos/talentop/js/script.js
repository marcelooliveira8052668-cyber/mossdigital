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


// 70 — TALENTOP: filtros, favoritos locais e consulta por WhatsApp.
const vagasTalento = [ // Vagas de exemplo: nunca usar como anúncios reais sem autorização.
 {id:1,titulo:"Designer de Produto",area:"Tecnologia",modo:"Remoto",emoji:"✦",resumo:"Criação de interfaces simples, pesquisa e protótipos digitais."},
 {id:2,titulo:"Analista de Atendimento",area:"Comercial",modo:"Híbrido",emoji:"◉",resumo:"Relacionamento com clientes e melhoria da experiência de atendimento."},
 {id:3,titulo:"Assistente Administrativo",area:"Administrativo",modo:"Presencial",emoji:"▦",resumo:"Rotinas administrativas e organização de informações."},
 {id:4,titulo:"Desenvolvedor Front-end",area:"Tecnologia",modo:"Híbrido",emoji:"⌘",resumo:"Construção de páginas responsivas e interfaces acessíveis."},
 {id:5,titulo:"Consultor Comercial",area:"Comercial",modo:"Remoto",emoji:"↗",resumo:"Contato com empresas e organização de propostas comerciais."},
 {id:6,titulo:"Analista de Operações",area:"Administrativo",modo:"Híbrido",emoji:"◈",resumo:"Apoio ao planejamento e acompanhamento de processos."}
];
const chaveTalento = "moss-demo70-favoritos-v1"; // Chave exclusiva desta demo.
let favoritosTalento; // Lista persistida apenas neste dispositivo.
try { favoritosTalento = new Set(JSON.parse(localStorage.getItem(chaveTalento)||"[]")); } catch(e) { favoritosTalento = new Set(); } // Recupera ou reinicia dados.
let somenteTalento = false; // Indica se usuário quer ver apenas favoritos.
const buscaTalento = document.getElementById("jobs-search"); // Busca textual.
const areaTalento = document.getElementById("jobs-area"); // Área profissional.
const modoTalento = document.getElementById("jobs-mode"); // Formato de trabalho.
const listaTalento = document.getElementById("job-list"); // Cards renderizados.
function montarVagas() { // Desenha lista filtrada.
 const termo=buscaTalento.value.trim().toLocaleLowerCase("pt-BR"); // Termo de busca.
 const filtradas=vagasTalento.filter(vaga=>(areaTalento.value==="all"||vaga.area===areaTalento.value) && (modoTalento.value==="all"||vaga.modo===modoTalento.value) && (!somenteTalento||favoritosTalento.has(vaga.id)) && (vaga.titulo+" "+vaga.resumo).toLocaleLowerCase("pt-BR").includes(termo)); // Filtra todos os critérios.
 listaTalento.innerHTML=filtradas.length ? filtradas.map(vaga=>`<article class="job"><div class="job-head"><span class="job-icon" aria-hidden="true">${vaga.emoji}</span><button class="heart ${favoritosTalento.has(vaga.id)?'saved':''}" data-fav="${vaga.id}" aria-label="${favoritosTalento.has(vaga.id)?'Remover dos':'Adicionar aos'} favoritos">${favoritosTalento.has(vaga.id)?'♥':'♡'}</button></div><h3>${escapar(vaga.titulo)}</h3><div class="chips"><span>${escapar(vaga.area)}</span><span>${escapar(vaga.modo)}</span></div><p>${escapar(vaga.resumo)}</p><button class="contact" data-contato="${vaga.id}">Consultar vaga ↗</button></article>`).join('') : '<p class="empty">Nenhuma vaga ilustrativa encontrada. Tente outros filtros.</p>'; // Só dados do catálogo interno entram no HTML.
 document.getElementById("jobs-count").textContent=`${filtradas.length} oportunidades ilustrativas`; // Contador.
 document.getElementById("fav-count").textContent=String(favoritosTalento.size); // Total de favoritos.
 document.querySelectorAll("[data-fav]").forEach(botao=>botao.addEventListener("click",()=>{ // Salva favoritos por ID.
  const id=Number(botao.dataset.fav); // Identificador numérico.
  favoritosTalento.has(id)?favoritosTalento.delete(id):favoritosTalento.add(id); // Alterna seleção.
  try { localStorage.setItem(chaveTalento,JSON.stringify([...favoritosTalento])); } catch(e) {} // Dados locais, sem login.
  montarVagas(); // Atualiza cards.
 }));
 document.querySelectorAll("[data-contato]").forEach(botao=>botao.addEventListener("click",()=>{ // Contato não envia currículo automaticamente.
  const vaga=vagasTalento.find(item=>item.id===Number(botao.dataset.contato)); // Identifica vaga.
  if(vaga) abrirWhatsApp(`Olá! Vi na demonstração TalentoP a vaga ilustrativa de ${vaga.titulo} (${vaga.area}, ${vaga.modo}). Gostaria de mais informações. Sei que esta lista é fictícia.`); // Abre mensagem.
 }));
}
[buscaTalento,areaTalento,modoTalento].forEach(campo=>campo.addEventListener("input",montarVagas)); // Filtro instantâneo.
document.getElementById("jobs-favorites").addEventListener("click",evento=>{ // Alterna visualização de favoritas.
 somenteTalento=!somenteTalento; evento.currentTarget.classList.toggle("active",somenteTalento); evento.currentTarget.setAttribute("aria-pressed",String(somenteTalento)); montarVagas(); // Acessibilidade e estado.
});
document.getElementById("talento-company").addEventListener("click",()=>abrirWhatsApp("Olá! Quero conhecer o modelo TalentoP para divulgar oportunidades na minha empresa.")); // Lead empresarial.
montarVagas(); // Renderização inicial.
