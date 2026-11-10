// MOSS Digital: funções reutilizáveis copiadas para esta pasta independente.
const MOSS_WHATSAPP = '5511942038103'; // Número autorizado pelo proprietário.
const MOSS_DEMO = document.body.dataset.demo || 'Demo MOSS'; // Identifica a mensagem comercial.
function abrirWhatsApp(mensagem) { // Abre atendimento em uma ação iniciada pelo visitante.
  const url = `https://wa.me/${MOSS_WHATSAPP}?text=${encodeURIComponent(mensagem)}`; // Codifica acentos e quebras de linha.
  window.open(url, '_blank', 'noopener,noreferrer'); // Abre o contato em outra aba.
}
function prepararImagens() { // Substitui apenas as imagens cujos arquivos locais existem.
  document.querySelectorAll('img[data-foto]').forEach((img) => { // Analisa cada espaço reservado.
    const arquivo = img.dataset.foto; // Caminho definido para OpenCode ou VS Code.
    if (!arquivo) return; // Ignora caminhos vazios.
    const teste = new Image(); // Carrega em memória antes de trocar o placeholder.
    teste.onload = () => { img.src = arquivo; img.dataset.status = 'real'; }; // Atualiza apenas se existir.
    teste.onerror = () => { img.dataset.status = 'pendente'; }; // Mantém o SVG se o arquivo faltar.
    teste.src = arquivo; // Inicia o teste local da imagem.
  }); // Encerra a verificação.
}
function prepararMenu() { // Ativa navegação acessível em telas pequenas.
  const botao = document.querySelector('[data-menu-botao]'); // Botão móvel.
  const menu = document.querySelector('[data-menu]'); // Lista de links.
  if (!botao || !menu) return; // Algumas demos usam outra navegação.
  botao.addEventListener('click', () => { // Alterna o menu ao clicar.
    const aberto = botao.getAttribute('aria-expanded') === 'true'; // Lê o estado atual.
    botao.setAttribute('aria-expanded', String(!aberto)); // Atualiza acessibilidade.
    menu.classList.toggle('aberto', !aberto); // Abre ou fecha visualmente.
  }); // Finaliza ação do botão.
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { // Fecha após navegar.
    botao.setAttribute('aria-expanded', 'false'); // Restabelece o estado.
    menu.classList.remove('aberto'); // Recolhe a lista.
  })); // Finaliza navegação por âncoras.
}
function configurarLinksWhatsApp() { // Mantém links úteis mesmo sem funções comerciais.
  document.querySelectorAll('[data-whatsapp]').forEach((link) => { // Analisa os atalhos.
    const texto = link.dataset.mensagem || `Olá! Vi a demonstração ${MOSS_DEMO} e gostaria de mais informações.`; // Mensagem padrão.
    link.href = `https://wa.me/${MOSS_WHATSAPP}?text=${encodeURIComponent(texto)}`; // Constrói link.
    link.target = '_blank'; // Abre nova aba.
    link.rel = 'noopener noreferrer'; // Evita acesso da aba externa à página.
  }); // Encerra configuração.
}
function moeda(valor) { // Formata números como reais brasileiros.
  return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(valor); // Apresenta R$.
}
document.addEventListener('DOMContentLoaded', () => { // Aguarda o HTML ficar pronto.
  prepararMenu(); // Inicializa navegação.
  prepararImagens(); // Procura fotografias opcionais.
  configurarLinksWhatsApp(); // Configura contatos.
  iniciarDemo(); // Cada projeto define seu funcionamento.
}); // Finaliza inicialização.

// Lista Certa: catálogo estático e carrinho de cotação (não há estoque sincronizado).
const materiais = [ // Produtos fictícios editáveis para futuros clientes.
  {id:'cad96',nome:'Caderno universitário 96 folhas',cat:'cadernos',preco:24.9,descricao:'Capa flexível',foto:'assets/img/caderno.webp'}, // Material escolar.
  {id:'lapis',nome:'Lápis grafite HB',cat:'escrita',preco:2.5,descricao:'Unidade',foto:'assets/img/lapis.webp'}, // Material de escrita.
  {id:'caneta',nome:'Caneta esferográfica azul',cat:'escrita',preco:3.25,descricao:'Unidade',foto:'assets/img/caneta.webp'}, // Material de escrita.
  {id:'borracha',nome:'Borracha macia branca',cat:'escrita',preco:2.9,descricao:'Unidade',foto:'assets/img/borracha.webp'}, // Material de escrita.
  {id:'hidrocor',nome:'Canetinha 12 cores',cat:'arte',preco:17.5,descricao:'Estojo com 12 cores',foto:'assets/img/canetinhas.webp'}, // Material de arte.
  {id:'cola',nome:'Cola branca 90 g',cat:'arte',preco:5.9,descricao:'Frasco de 90 g',foto:'assets/img/cola.webp'}, // Material de arte.
  {id:'caderno10',nome:'Caderno 10 matérias',cat:'cadernos',preco:39.9,descricao:'Espiral com divisórias',foto:'assets/img/caderno-dez.webp'}, // Material escolar.
  {id:'pastas',nome:'Pasta com elástico A4',cat:'organizacao',preco:7.9,descricao:'Plástico reforçado',foto:'assets/img/pasta.webp'}, // Organização.
  {id:'postit',nome:'Bloco adesivo colorido',cat:'organizacao',preco:11.5,descricao:'Bloco com folhas',foto:'assets/img/bloco.webp'}, // Organização.
  {id:'lapis-cor',nome:'Lápis de cor 12 cores',cat:'arte',preco:19.9,descricao:'Caixa com 12 cores',foto:'assets/img/lapis-cor.webp'} // Arte.
]; // Finaliza catálogo.
function iniciarDemo() { // Inicia catálogo e carrinho.
  const grade = document.querySelector('#produtos'); // Vitrine.
  const lista = document.querySelector('#lista-pedido'); // Lista de cotação.
  const escolha = new Map(); // Guarda id e quantidade em memória local da página.
  const campoBusca = document.querySelector('#buscar'); // Pesquisa de itens.
  const filtros = [...document.querySelectorAll('[data-categoria]')]; // Botões de categorias.
  const alerta = document.querySelector('#alerta'); // Aviso de operação.
  let categoria = 'todos'; // Categoria inicial.
  const obterProdutos = () => materiais.filter((item) => (categoria === 'todos' || item.cat === categoria) && `${item.nome} ${item.descricao}`.toLocaleLowerCase('pt-BR').includes(campoBusca.value.trim().toLocaleLowerCase('pt-BR'))); // Filtra texto/categoria.
  const renderProdutos = () => { // Desenha os itens correspondentes.
    const exibidos = obterProdutos(); // Consulta itens.
    document.querySelector('#contador-produtos').textContent = `${exibidos.length} produto(s) de exemplo`; // Contador.
    grade.innerHTML = exibidos.map((item) => `<article class="produto"><img src="assets/img/espaco-foto.svg" data-foto="${item.foto}" alt="Espaço para foto de ${item.nome}" width="300" height="345"><div><h3>${item.nome}</h3><p>${item.descricao}</p><strong>${moeda(item.preco)}</strong><button type="button" data-add="${item.id}" aria-label="Adicionar ${item.nome} à cotação">+ Adicionar</button></div></article>`).join('') || '<p>Nenhum produto encontrado. Tente outra busca.</p>'; // Atualiza conteúdo.
    grade.querySelectorAll('[data-add]').forEach((botao) => botao.addEventListener('click', () => { // Adiciona item.
      const id = botao.dataset.add; // Identifica produto.
      escolha.set(id, (escolha.get(id) || 0) + 1); // Incrementa quantidade.
      renderPedido(); // Atualiza resumo.
      alerta.textContent = 'Item adicionado à cotação.'; // Dá retorno acessível.
    })); // Encerra botões de adicionar.
    prepararImagens(); // Procura as fotos recém-renderizadas.
  };
  const renderPedido = () => { // Desenha o resumo.
    let total = 0; let unidades = 0; // Acumuladores.
    const linhas = [...escolha.entries()].map(([id, qtd]) => { // Percorre os itens escolhidos.
      const item = materiais.find((m) => m.id === id); // Lê cadastro demonstrativo.
      if (!item) return ''; // Ignora inconsistência.
      total += item.preco * qtd; unidades += qtd; // Soma preço e quantidade.
      return `<div class="linha-pedido"><strong>${item.nome}</strong><span>${moeda(item.preco*qtd)}</span><div class="botoes-qtd"><button type="button" data-alterar="${id}" data-delta="-1" aria-label="Remover uma unidade de ${item.nome}">−</button><span>${qtd}</span><button type="button" data-alterar="${id}" data-delta="1" aria-label="Adicionar uma unidade de ${item.nome}">+</button></div></div>`; // Cria controle do item.
    }); // Encerra construção.
    lista.innerHTML = linhas.join('') || '<p>Adicione seus materiais para montar a lista.</p>'; // Exibe resumo.
    document.querySelector('#quantidade-selecionada').textContent = `${unidades} item(ns)`; // Atualiza quantidade.
    document.querySelector('#subtotal').textContent = moeda(total); // Exibe soma.
    lista.querySelectorAll('[data-alterar]').forEach((botao) => botao.addEventListener('click', () => { // Ajusta quantidade.
      const id = botao.dataset.alterar; // Item alterado.
      const novo = (escolha.get(id) || 0) + Number(botao.dataset.delta); // Soma delta.
      if (novo <= 0) escolha.delete(id); else escolha.set(id, novo); // Remove ou mantém item.
      renderPedido(); // Redesenha.
    })); // Finaliza controles.
  };
  filtros.forEach((botao) => botao.addEventListener('click', () => { // Aplica categoria.
    categoria = botao.dataset.categoria; // Guarda categoria.
    filtros.forEach((outro) => outro.setAttribute('aria-pressed', String(outro === botao))); // Estado acessível.
    renderProdutos(); // Atualiza a vitrine.
  })); // Encerra filtros.
  document.querySelector('#pesquisa').addEventListener('submit', (evento) => { evento.preventDefault(); renderProdutos(); document.querySelector('#catalogo').scrollIntoView({behavior:'smooth'}); }); // Pesquisa sem recarregar.
  campoBusca.addEventListener('input', renderProdutos); // Busca em tempo real.
  document.querySelector('#limpar-lista').addEventListener('click', () => { escolha.clear(); renderPedido(); alerta.textContent = 'Lista apagada.'; }); // Limpa lista.
  document.querySelector('#enviar-lista').addEventListener('click', () => { // Finaliza cotação manual.
    if (!escolha.size) { alerta.textContent = 'Escolha pelo menos um material.'; return; } // Valida seleção.
    const nome = document.querySelector('#nome-cliente').value.trim() || 'Não informado'; // Nome opcional.
    const itens = [...escolha.entries()].map(([id,qtd]) => { const item = materiais.find((m)=>m.id===id); return `${qtd} × ${item.nome} — ${moeda(item.preco*qtd)}`; }); // Monta linhas.
    const total = [...escolha.entries()].reduce((soma,[id,qtd]) => soma + materiais.find((m)=>m.id===id).preco*qtd,0); // Soma total.
    abrirWhatsApp(['Olá! Quero consultar disponibilidade e preços de materiais pela demo Lista Certa.',`Nome: ${nome}`,...itens,`Subtotal ilustrativo: ${moeda(total)}`,'Por favor, confirme preços, condições e estoque.'].join('\n')); // Encaminha cotação.
  }); // Finaliza envio.
  renderProdutos(); renderPedido(); // Apresenta o estado inicial.
} // Finaliza a loja demonstrativa.
