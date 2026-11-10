// MOSS DIGITAL: programação independente, explicada em português.
'use strict'; // Evita variáveis globais criadas acidentalmente.
const WHATSAPP = '5511942038103'; // Número autorizado pelo proprietário da MOSS Digital.
const SITE = document.body.dataset.demo; // Identifica a demo ativa sem depender de outros arquivos.
const MODE = document.body.dataset.mode; // Identifica o formulário específico do segmento.
const menuButton = document.querySelector('#menu-toggle'); // Recupera o controle do menu móvel.
const navLinks = document.querySelector('#nav-links'); // Recupera a lista de links de navegação.
menuButton.addEventListener('click', () => { // Abre ou fecha os links no celular.
  const aberto = navLinks.classList.toggle('is-open'); // Alterna a classe de exibição dos links.
  menuButton.setAttribute('aria-expanded', String(aberto)); // Informa o estado ao leitor de tela.
  menuButton.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu'); // Atualiza a descrição acessível.
}); // Fecha o evento do menu.
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { // Escuta cada link do menu.
  navLinks.classList.remove('is-open'); // Recolhe a navegação após escolher uma seção.
  menuButton.setAttribute('aria-expanded', 'false'); // Informa que o menu ficou fechado.
})); // Termina observação dos links.
function linkWhatsapp(mensagem) { // Constrói um endereço de WhatsApp a partir do texto.
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`; // Codifica caracteres para URL válida.
} // Termina gerador de link.
function abrirWhatsapp(mensagem) { // Abre uma guia com mensagem pronta para revisão.
  window.open(linkWhatsapp(mensagem), '_blank', 'noopener,noreferrer'); // Não expõe acesso à janela de origem.
} // Termina a ação de contato.
document.querySelectorAll('[data-whatsapp]').forEach(link => { // Seleciona todos os botões gerais.
  link.href = linkWhatsapp(`Olá! Vi a demonstração ${SITE} da MOSS Digital e gostaria de saber mais.`); // Configura contato específico.
}); // Finaliza configuração de links.
document.querySelectorAll('img[data-photo]').forEach(img => { // Localiza espaços de fotos preparados para substituição.
  const foto = new Image(); // Cria teste de existência do arquivo local da foto.
  foto.onload = () => { img.src = img.dataset.photo; img.alt = `Foto de ${img.alt.replace('Foto principal a inserir: ', '').replace('Espaço para fotografia: ', '').replace('Foto de exemplo a substituir: ', '')}`; img.closest('.hero-image')?.querySelector('.image-label')?.remove(); }; // Troca SVG, descreve foto e oculta a dica da capa.
  foto.onerror = () => {}; // Mantém reserva visual quando a foto ainda não foi inserida.
  foto.src = img.dataset.photo; // Procura a imagem na pasta assets/img sem serviços externos.
}); // Termina carregamento opcional de fotos locais.
const filtros = document.querySelectorAll('button[data-filter]'); // Recupera botões de categoria.
const cartoes = document.querySelectorAll('#service-cards .card'); // Recupera cards de serviços.
filtros.forEach(botao => botao.addEventListener('click', () => { // Responde ao clique de filtro.
  const categoria = botao.dataset.filter; // Identifica categoria selecionada.
  filtros.forEach(item => item.setAttribute('aria-pressed', String(item === botao))); // Atualiza o estado do conjunto.
  cartoes.forEach(cartao => { cartao.hidden = categoria !== 'todos' && cartao.dataset.category !== categoria; }); // Oculta o que não corresponde ao filtro.
})); // Finaliza listener de filtros.
const dialog = document.querySelector('#details-dialog'); // Recupera janela de detalhe nativa.
const dialogTitle = document.querySelector('#dialog-title'); // Recupera título do diálogo.
const dialogText = document.querySelector('#dialog-text'); // Recupera texto do diálogo.
const dialogPhoto = document.querySelector('#dialog-photo'); // Recupera imagem do diálogo.
document.querySelectorAll('[data-detail]').forEach(botao => botao.addEventListener('click', () => { // Abre detalhes ao clicar no card.
  const cartao = botao.closest('.card'); // Encontra somente o card escolhido.
  dialogTitle.textContent = cartao.querySelector('h3').textContent; // Copia o nome do serviço de maneira segura.
  dialogText.textContent = cartao.querySelector('p').textContent; // Copia descrição de maneira segura.
  dialogPhoto.src = cartao.querySelector('img').src; // Mostra a imagem atualmente disponível.
  dialogPhoto.alt = cartao.querySelector('img').alt; // Preserva descrição da imagem.
  dialog.querySelector('[data-whatsapp]').href = linkWhatsapp(`Olá! Vi ${dialogTitle.textContent} na demo ${SITE}. Gostaria de detalhes.`); // Personaliza contato do serviço.
  dialog.showModal(); // Abre janela nativa acessível por teclado.
})); // Termina eventos dos cards.
document.querySelector('#dialog-close').addEventListener('click', () => dialog.close()); // Fecha pelo botão.
dialog.addEventListener('click', evento => { // Permite fechar ao tocar fora da janela.
  if (evento.target === dialog) dialog.close(); // Só fecha ao tocar no plano de fundo.
}); // Termina listener do diálogo.
const formulario = document.querySelector('#lead-form'); // Recupera formulário de orçamento.
function valor(id) { // Lê o valor de um campo sem acessar HTML de usuário.
  return (formulario.elements.namedItem(id)?.value ?? '').trim(); // Remove espaços excedentes e usa string segura.
} // Termina função de leitura.
function moeda(numero) { // Formata número em reais brasileiros.
  return numero.toLocaleString('pt-BR', {style:'currency',currency:'BRL'}); // Usa moeda do Brasil.
} // Termina formatador.
function diasEntre(inicio, fim) { // Calcula noites entre datas sem fusos ou horário de verão.
  if (!inicio || !fim) return 0; // Ausência de datas não produz estimativa.
  const a = inicio.split('-').map(Number); // Converte data inicial em números.
  const b = fim.split('-').map(Number); // Converte data final em números.
  const dias = Math.round((Date.UTC(b[0], b[1]-1, b[2]) - Date.UTC(a[0], a[1]-1, a[2])) / 86400000); // Calcula dias corridos.
  return dias > 0 ? dias : 0; // Rejeita datas invertidas ou iguais.
} // Termina cálculo de noites.
function resumoSimulador() { // Atualiza estimativa e retorna descrição resumida.
  const painel = document.querySelector('#estimate'); // Encontra área onde o preço é mostrado.
  if (MODE === 'auto') { // Ativa cálculo ilustrativo da estética automotiva.
    const servico = valor('escolha'); // Serviço selecionado.
    const porte = valor('porte'); // Porte do veículo selecionado.
    const tabela = {'Polimento técnico':480,'Vitrificação':1100,'Higienização interna':260,'Proteção PPF':1800}; // Preços fictícios de exemplo.
    const fator = {hatch:1,sedan:1.15,suv:1.35}[porte] ?? 1; // Ajuste meramente ilustrativo por porte.
    const total = Math.round((tabela[servico] ?? 0) * fator); // Valor de referência demonstrativo.
    if (painel) painel.textContent = servico && porte ? `Estimativa demonstrativa: ${moeda(total)} (valor não comercial).` : 'Selecione o serviço e o porte para simular.'; // Atualiza tela com alerta claro.
    return servico && porte ? `${servico}, veículo ${porte}, valor demonstrativo ${moeda(total)} (não é orçamento)` : 'Sem estimativa'; // Descrição para conversa.
  } // Termina cálculo automotivo.
  if (MODE === 'pet') { // Ativa o cálculo de diárias de hospedagem.
    const noites = diasEntre(valor('entrada'),valor('saida')); // Quantidade válida de noites.
    const tipo = valor('escolha'); // Tipo de acomodação escolhida.
    const diaria = {conforto:90,jardim:140}[tipo] ?? 0; // Tarifas fictícias para fins didáticos.
    const total = noites * diaria; // Total simulado por noites.
    if (painel) painel.textContent = noites && diaria ? `${noites} noite(s) · valor ilustrativo ${moeda(total)} (sem reserva).` : 'Selecione acomodação e datas válidas para simular.'; // Exibe estimativa.
    return noites && diaria ? `${noites} noite(s), suíte ${tipo}, estimativa demonstrativa ${moeda(total)} (sem disponibilidade confirmada)` : 'Sem estimativa válida'; // Dados para WhatsApp.
  } // Termina cálculo de hospedagem.
  return ''; // Outras demos não precisam de simulador.
} // Termina função do simulador.
formulario.addEventListener('input', resumoSimulador); // Recalcula quando o visitante digita.
formulario.addEventListener('change', resumoSimulador); // Recalcula ao trocar opções ou datas.
formulario.addEventListener('submit', evento => { // Prepara contato via WhatsApp no envio do formulário.
  evento.preventDefault(); // Evita enviar dados para servidor inexistente.
  if (!formulario.reportValidity()) return; // Verifica campos obrigatórios e regras nativas.
  if (MODE === 'pet' && !diasEntre(valor('entrada'), valor('saida'))) { // Exige datas válidas na hospedagem.
    formulario.elements.namedItem('saida').setCustomValidity('A saída deve acontecer depois da entrada.'); // Explica problema de datas.
    formulario.reportValidity(); // Exibe aviso do navegador.
    return; // Não abre WhatsApp com datas inválidas.
  } // Finaliza checagem de datas.
  const dados = [...new FormData(formulario).entries()].filter(([chave, texto]) => texto && chave !== 'observacao'); // Reúne campos preenchidos sem valores vazios.
  const linhas = dados.map(([chave, texto]) => `${chave.replace(/_/g,' ')}: ${texto}`); // Monta resumo simples em português.
  if (valor('observacao')) linhas.push(`Observações: ${valor('observacao')}`); // Acrescenta informações livres apenas quando existem.
  const calculo = resumoSimulador(); // Atualiza e captura possível estimativa.
  const mensagem = [`Olá! Estou entrando em contato pela demonstração ${SITE} da MOSS Digital.`, ...linhas, ...(calculo ? [calculo] : []), 'Entendo que esta é uma demonstração e que valores e disponibilidade dependem de confirmação.'].join('\n'); // Monta mensagem revisável.
  abrirWhatsapp(mensagem); // Abre WhatsApp sem cobrar e sem gravar dados em banco.
}); // Termina envio do formulário.
if (MODE === 'pet') { // Limpa erro de data quando visitante corrige a seleção.
  ['entrada','saida'].forEach(id => formulario.elements.namedItem(id).addEventListener('input', () => { formulario.elements.namedItem('saida').setCustomValidity(''); })); // Remove erro após editar.
} // Termina configuração das datas.
resumoSimulador(); // Atualiza estado inicial de possível simulador.
