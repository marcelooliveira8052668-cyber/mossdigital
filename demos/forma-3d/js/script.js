// Ferramentas compartilhadas: cada demo possui seu próprio script e não depende de servidores.
const $ = (selector, root = document) => root.querySelector(selector); // Localiza o primeiro elemento que corresponde ao seletor.
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)]; // Localiza todos os elementos correspondentes.
const brl = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0); // Formata valores demonstrativos em reais.
const demoName = document.body.dataset.demo || 'MOSS Digital'; // Identifica o projeto exibido no navegador.
function whatsapp(message) { // Monta uma URL segura para iniciar uma conversa, sem enviar dados automaticamente.
  return `https://wa.me/5511942038103?text=${encodeURIComponent(`Olá! Vim pela demo ${demoName}.\n${message}`)}`; // Adiciona o texto do visitante.
}
function openWhatsApp(message) { // Abre o WhatsApp somente após ação explícita do visitante.
  window.open(whatsapp(message), '_blank', 'noopener,noreferrer'); // O visitante ainda confirma o envio no aplicativo.
}
function initPhotos() { // Permite que o OpenCode adicione fotos sem alterar o HTML original.
  $$('img[data-photo]').forEach((img) => { // Examina apenas os espaços reservados para imagens.
    const photoPath = img.dataset.photo; // Recupera o caminho definido no HTML.
    const probe = new Image(); // Cria teste de carregamento sem quebrar o visual.
    probe.onload = () => { img.src = photoPath; }; // Usa a foto definitiva se ela existir na pasta.
    probe.onerror = () => { /* Mantém a imagem de reserva quando o arquivo não existe. */ }; // Evita foto quebrada.
    probe.src = photoPath; // Inicia a verificação local.
  }); // Encerra a análise das imagens.
}
function initNav() { // Habilita navegação acessível para dispositivos móveis.
  const toggle = $('#menu-toggle'); // Botão do menu.
  const nav = $('#nav-links'); // Lista de links de navegação.
  if (!toggle || !nav) return; // A navegação pode ser diferente em cada layout.
  toggle.addEventListener('click', () => { // O usuário abre e fecha o menu.
    const open = toggle.getAttribute('aria-expanded') === 'true'; // Lê o estado atual para alterná-lo.
    toggle.setAttribute('aria-expanded', String(!open)); // Atualiza o atributo para leitores de tela.
    nav.classList.toggle('open', !open); // Aplica os estilos responsivos.
  }); // Encerra o evento de abertura.
  $$('a', nav).forEach((link) => link.addEventListener('click', () => { // Fecha o menu após escolher uma seção.
    nav.classList.remove('open'); // Oculta a navegação móvel.
    toggle.setAttribute('aria-expanded', 'false'); // Atualiza o estado acessível.
  })); // Encerra eventos dos links.
}
function initContactLinks() { // Padroniza os botões de WhatsApp autorizados pelo proprietário.
  $$('[data-whatsapp]').forEach((link) => { // Encontra os links de contato no documento.
    link.href = whatsapp(link.dataset.message || 'Quero conhecer seus serviços.'); // Adiciona a mensagem da demo.
    link.target = '_blank'; // Abre a conversa em outra aba.
    link.rel = 'noopener noreferrer'; // Protege a navegação externa.
  }); // Encerra o ajuste dos links.
}
function cleanCSVValue(raw) { // Previne execução de fórmulas em planilhas ao exportar textos digitados.
  const text = String(raw ?? '').replace(/[\r\n]+/g, ' ').trim(); // Remove quebras de linha e espaços desnecessários.
  return /^[=+\-@\t]/.test(text) ? `'${text}` : text; // Neutraliza prefixos de fórmulas.
}
function downloadCSV(filename, headers, rows) { // Exporta dados locais para o proprietário sem enviar informações para servidores.
  const quote = (value) => `"${cleanCSVValue(value).replace(/"/g, '""')}"`; // Escapa aspas e campos especiais.
  const lines = [headers, ...rows].map((row) => row.map(quote).join(';')); // Cria CSV compatível com Excel em PT-BR.
  const blob = new Blob(['\ufeff', lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' }); // Inclui BOM para acentos.
  const url = URL.createObjectURL(blob); // Gera endereço temporário para download local.
  const anchor = document.createElement('a'); // Cria o link temporário.
  anchor.href = url; // Aponta para o arquivo CSV.
  anchor.download = filename; // Define o nome amigável do arquivo.
  document.body.appendChild(anchor); // Permite iniciar o download.
  anchor.click(); // Inicia a exportação solicitada.
  anchor.remove(); // Remove o elemento auxiliar.
  setTimeout(() => URL.revokeObjectURL(url), 1000); // Libera recursos do navegador.
}
function getStorage(key, fallback) { // Lê informações de demonstração salvas somente neste navegador.
  try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); } // Mantém dados persistidos existentes.
  catch { return fallback; } // Evita que armazenamento indisponível quebre a interface.
}
function saveStorage(key, value) { // Salva dados locais sem sincronização externa.
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } // Grava de forma simples para o mesmo navegador.
  catch { return false; } // Informa falha, por exemplo em modo privado ou sem espaço.
}
function localDate() { // Cria data ISO correspondente ao calendário local do usuário.
  const now = new Date(); // Obtém o relógio do dispositivo.
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10); // Mantém ano, mês e dia locais.
}
initPhotos(); // Procura imagens autorizadas na pasta assets/img.
initNav(); // Ativa o menu do layout quando houver.
initContactLinks(); // Atualiza links de contato com o WhatsApp autorizado.

// 47 – Orçamento preliminar de peças impressas em 3D, sem cobrança ou garantia de viabilidade.
const material = $('#material'); // Tipo de filamento informado na simulação.
const grams = $('#grams'); // Peso aproximado estimado pelo visitante.
const hours = $('#hours'); // Tempo de máquina aproximado.
const quantity = $('#quantity'); // Quantidade de unidades desejada.
const finish = $('#finish'); // Tipo de acabamento opcional.
const price = $('#price'); // Valor ilustrativo exibido na página.
const ask = $('#ask'); // Botão para consultar orçamento real pelo WhatsApp.
function calculate() { // Estima custos básicos apenas para demonstração comercial.
  const g = Number(grams.value); const h = Number(hours.value); const q = Number(quantity.value); // Converte entradas numéricas.
  const valid = Number.isFinite(g) && g >= 1 && g <= 10000 && Number.isFinite(h) && h >= 0.5 && h <= 200 && Number.isInteger(q) && q >= 1 && q <= 200; // Respeita limites exibidos.
  ask.disabled = !valid; // Não permite solicitar consulta com valores inválidos.
  if (!valid) { price.textContent = 'Confira os dados'; return; } // Evita produzir números irreais por entrada inválida.
  const perGram = { pla:0.18, petg:0.24, abs:0.27 }[material.value]; // Usa preços de exemplo sem referência a fornecedor.
  const finishCost = { none:0, basic:18, premium:42 }[finish.value]; // Acrescenta acabamento ilustrativo por unidade.
  const total = (g * perGram + h * 12 + finishCost) * q; // Aplica fórmula didática.
  price.textContent = brl(total); // Mostra custo fictício em reais.
} // Encerra cálculo.
[material,grams,hours,quantity,finish].forEach((field) => field.addEventListener('input', calculate)); // Recalcula conforme alterações.
ask.addEventListener('click', () => { // Prepara mensagem solicitada pelo visitante.
  if (ask.disabled) return; // Confere validação antes de abrir outra aba.
  openWhatsApp(`Gostaria de cotar impressão 3D.\nMaterial: ${material.options[material.selectedIndex].text}\nPeso estimado: ${grams.value} g\nTempo aproximado: ${hours.value} h\nQuantidade: ${quantity.value}\nAcabamento: ${finish.options[finish.selectedIndex].text}\nEstimativa ilustrativa: ${price.textContent}\nVou encaminhar o modelo 3D na conversa para orçamento real.`); // Nunca simula envio de arquivo.
  $('#estimate-status').textContent = 'Mensagem preparada. O arquivo 3D deve ser enviado manualmente pela conversa, se necessário.'; // Reforça limite técnico.
}); // Encerra a consulta.
calculate(); // Calcula a estimativa inicial da demo.
// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
