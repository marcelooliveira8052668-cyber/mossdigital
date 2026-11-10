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

// Triagem de desentupidora, sem geolocalização nem tempo de resposta inventado.
function iniciarDemo() { // Prepara os serviços.
  const botoes = [...document.querySelectorAll('[data-tipo]')]; // Opções de problema.
  const campoServico = document.querySelector('#servico-selecionado'); // Destino da escolha.
  const form = document.querySelector('#triagem'); // Formulário de atendimento.
  botoes.forEach((botao) => botao.addEventListener('click', () => { // Seleciona um serviço.
    botoes.forEach((outro) => { outro.classList.toggle('ativo', outro === botao); outro.setAttribute('aria-pressed', String(outro === botao)); }); // Mostra a seleção.
    campoServico.value = botao.dataset.tipo; // Escreve o nome no formulário.
    document.querySelector('#chamado').scrollIntoView({behavior:'smooth', block:'start'}); // Aproxima formulário.
  })); // Encerra botão de serviço.
  form.addEventListener('submit', (evento) => { // Inicia a consulta.
    evento.preventDefault(); // Não submete a página.
    if (!form.reportValidity()) return; // Exige campos essenciais.
    const dados = new FormData(form); // Lê todas as respostas.
    const linhas = ['Olá! Vim pela demonstração DesentoJá e gostaria de consultar um atendimento.', ...[...dados.entries()].map(([campo, valor]) => `${campo}: ${String(valor).trim()}`), 'Por favor, confirme disponibilidade, condições e orçamento.']; // Prepara pedido completo.
    abrirWhatsApp(linhas.join('\n')); // Abre conversa.
  }); // Encerra o formulário.
} // Encerra a triagem.
