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

// Configurador comercial da confeitaria, sem confirmação de pedido.
function iniciarDemo() { // Ativa o configurador quando o documento carregar.
  const form = document.querySelector('#pedido'); // Encontra o formulário.
  const tamanho = document.querySelector('#tamanho'); // Seleciona porções.
  const massa = document.querySelector('#massa'); // Seleciona sabor de massa.
  const recheio = document.querySelector('#recheio'); // Seleciona recheio.
  const decoracao = document.querySelector('#decoracao'); // Seleciona acabamento.
  const data = document.querySelector('#data-festa'); // Data desejada.
  const valor = document.querySelector('#valor'); // Prévia de valor.
  const descricao = document.querySelector('#descricao'); // Resumo do pedido.
  const erro = document.querySelector('#erro'); // Local de aviso.
  data.min = new Date().toLocaleDateString('en-CA'); // Impede selecionar datas anteriores, conforme navegador.
  const parseOpcao = (campo) => { // Separa nome e custo adicional.
    const [rotulo, preco] = campo.value.split('|'); // Lê a opção.
    return { rotulo, preco:Number(preco || 0) }; // Devolve dados seguros.
  };
  const atualizar = () => { // Recalcula cada mudança.
    const t = parseOpcao(tamanho); // Tamanho escolhido.
    const r = parseOpcao(recheio); // Recheio escolhido.
    const d = parseOpcao(decoracao); // Decoração escolhida.
    const total = t.preco + r.preco + d.preco; // Soma os valores ilustrativos.
    valor.textContent = moeda(total); // Exibe o total formatado.
    descricao.textContent = `${t.rotulo} • ${massa.value} • ${r.rotulo} • ${d.rotulo}`; // Mostra a composição.
    return {t, r, d, total}; // Reutiliza no envio.
  };
  [tamanho,massa,recheio,decoracao].forEach((campo) => campo.addEventListener('change', atualizar)); // Mantém a prévia viva.
  form.addEventListener('submit', (evento) => { // Inicia envio quando o cliente clicar.
    evento.preventDefault(); // Não tenta enviar para servidor inexistente.
    erro.textContent = ''; // Limpa alerta anterior.
    if (!form.reportValidity()) return; // Exige nome e data.
    const hoje = new Date(); hoje.setHours(0,0,0,0); // Normaliza o dia atual.
    const selecionada = new Date(`${data.value}T12:00:00`); // Lê data em horário local.
    if (!Number.isFinite(selecionada.getTime()) || selecionada < hoje) { erro.textContent = 'Selecione uma data de hoje em diante.'; return; } // Valida prazo.
    const configuracao = atualizar(); // Recupera preço e combinação.
    const dados = new FormData(form); // Lê nome e observação.
    const texto = ['Olá! Quero solicitar um orçamento de bolo na demo Doce Sob Medida.', `Nome: ${dados.get('nome')}`, `Data desejada: ${data.value}`, `Tamanho: ${configuracao.t.rotulo}`, `Massa: ${massa.value}`, `Recheio: ${configuracao.r.rotulo}`, `Decoração: ${configuracao.d.rotulo}`, `Valor apenas ilustrativo: ${moeda(configuracao.total)}`, `Observações: ${dados.get('obs') || 'Nenhuma'}`, 'Preciso confirmar prazo, valor e disponibilidade com a confeitaria.'].join('\n'); // Monta a mensagem.
    abrirWhatsApp(texto); // Encaminha para atendimento humano.
  }); // Encerra evento de envio.
  atualizar(); // Apresenta primeira prévia.
} // Encerra configurador.
// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
