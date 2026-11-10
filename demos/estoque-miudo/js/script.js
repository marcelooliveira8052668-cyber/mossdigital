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

// 46 – CRUD demonstrativo de estoque persistido apenas no armazenamento deste navegador.
const STORAGE_KEY = 'moss-demo-estoque-miudo-v1'; // Chave isolada das outras demos.
const sample = [ // Registros fictícios para demonstrar o funcionamento na primeira abertura.
  { id:'ex-1', nome:'Caderno A5', sku:'PAP-001', quantidade:18, minimo:5, preco:19.9 }, // Exemplo com estoque saudável.
  { id:'ex-2', nome:'Caneta azul', sku:'PAP-002', quantidade:4, minimo:10, preco:2.5 }, // Exemplo abaixo do mínimo.
  { id:'ex-3', nome:'Pasta arquivo', sku:'PAP-003', quantidade:11, minimo:7, preco:8.9 }, // Outro produto ilustrativo.
]; // Termina os dados de exemplo.
let products = getStorage(STORAGE_KEY, sample); // Usa dados existentes ou a demonstração inicial.
if (!Array.isArray(products)) products = sample; // Evita travamento se o armazenamento estiver inválido.
let editingId = null; // Identifica qual registro está em edição.
const tbody = $('#inventory-body'); // Corpo da tabela que será atualizado dinamicamente.
const form = $('#product-form'); // Formulário de cadastro e edição.
const status = $('#inventory-status'); // Feedback acessível ao usuário.
function sanitizeProduct(raw) { // Mantém apenas dados simples necessários ao cadastro.
  return { id:String(raw.id), nome:String(raw.nome).slice(0,70), sku:String(raw.sku).slice(0,24), quantidade:Number(raw.quantidade), minimo:Number(raw.minimo), preco:Number(raw.preco) }; // Normaliza os tipos.
} // Finaliza normalização.
function render() { // Atualiza indicadores e linhas a cada modificação.
  const search = $('#search').value.toLocaleLowerCase('pt-BR').trim(); // Busca pelo nome ou código.
  const filter = $('#filter').value; // Filtro por situação.
  const filtered = products.filter((item) => { // Seleciona somente registros correspondentes.
    const low = item.quantidade < item.minimo; // Verifica se a quantidade está abaixo do mínimo.
    return (item.nome.toLocaleLowerCase('pt-BR').includes(search) || item.sku.toLocaleLowerCase('pt-BR').includes(search)) && (filter === 'todos' || (filter === 'baixo' && low) || (filter === 'ok' && !low)); // Combina os filtros.
  }); // Encerra o filtro.
  $('#count-products').textContent = products.length; // Conta quantos produtos existem.
  $('#total-stock').textContent = products.reduce((sum, item) => sum + item.quantidade, 0); // Soma as unidades cadastradas.
  $('#low-stock').textContent = products.filter((item) => item.quantidade < item.minimo).length; // Conta itens com alerta.
  tbody.replaceChildren(); // Limpa a tabela sem criar HTML com dados digitados.
  if (!filtered.length) { const row = document.createElement('tr'); const cell = document.createElement('td'); cell.colSpan = 7; cell.textContent = 'Nenhum produto encontrado.'; row.appendChild(cell); tbody.appendChild(row); } // Explica lista vazia.
  filtered.forEach((item) => { // Monta uma linha por produto.
    const row = document.createElement('tr'); // Cria um elemento real da tabela.
    [item.nome, item.sku, item.quantidade, item.minimo, brl(item.preco)].forEach((value) => { const cell = document.createElement('td'); cell.textContent = value; row.appendChild(cell); }); // Evita interpolar HTML inseguro.
    const statusCell = document.createElement('td'); // Cria célula de alerta.
    const badge = document.createElement('span'); // Cria selo visual.
    const low = item.quantidade < item.minimo; // Verifica se a quantidade está abaixo do mínimo.
    badge.className = `status-pill${low ? ' low' : ''}`; // Aplica a aparência adequada.
    badge.textContent = low ? 'Repor' : 'OK'; // Informa situação em texto.
    statusCell.appendChild(badge); // Anexa selo à tabela.
    row.appendChild(statusCell); // Anexa a coluna de situação.
    const actions = document.createElement('td'); // Cria coluna de ações do produto.
    const group = document.createElement('div'); group.className = 'row-actions'; // Agrupa botões de edição e exclusão.
    const edit = document.createElement('button'); edit.type='button'; edit.textContent='Editar'; edit.setAttribute('aria-label', `Editar ${item.nome}`); edit.addEventListener('click', () => editProduct(item.id)); // Cria ação de edição.
    const remove = document.createElement('button'); remove.type='button'; remove.textContent='Excluir'; remove.setAttribute('aria-label', `Excluir ${item.nome}`); remove.addEventListener('click', () => deleteProduct(item.id)); // Cria exclusão com confirmação.
    group.append(edit,remove); actions.appendChild(group); row.appendChild(actions); tbody.appendChild(row); // Finaliza a linha.
  }); // Encerra a construção da tabela.
} // Encerra atualização da tela.
function persist() { // Salva alterações apenas no dispositivo atual.
  const success = saveStorage(STORAGE_KEY, products); // Tenta gravar no navegador.
  status.textContent = success ? 'Dados salvos neste navegador. Exporte CSV para guardar uma cópia.' : 'Seu navegador não permitiu salvar. Exporte CSV antes de fechar.'; // Dá feedback realista.
} // Encerra persistência.
function editProduct(id) { // Carrega valores de um produto no formulário.
  const item = products.find((product) => product.id === id); // Busca registro.
  if (!item) return; // Protege contra IDs inexistentes.
  editingId = item.id; // Identifica a edição ativa.
  ['nome','sku','quantidade','minimo','preco'].forEach((field) => { form.elements[field].value = item[field]; }); // Preenche campos editáveis.
  $('#form-heading').textContent = 'Editar item'; $('#save-btn').textContent = 'Salvar alterações'; $('#cancel-edit').hidden = false; // Ajusta título e botões.
  $('#cadastro').scrollIntoView({ behavior:'smooth', block:'start' }); // Leva o usuário ao formulário.
} // Encerra edição.
function resetEdit() { // Retorna o formulário ao modo de cadastro.
  editingId = null; form.reset(); $('#form-heading').textContent = 'Novo item'; $('#save-btn').textContent = 'Salvar item'; $('#cancel-edit').hidden = true; // Limpa os campos e o estado.
} // Encerra limpeza do formulário.
function deleteProduct(id) { // Exclui apenas após confirmação explícita.
  const item = products.find((product) => product.id === id); // Localiza o item a excluir.
  if (!item || !confirm(`Excluir ${item.nome} do estoque deste navegador?`)) return; // Confirma a operação.
  products = products.filter((product) => product.id !== id); // Remove o registro escolhido.
  if (editingId === id) resetEdit(); // Cancela edição se o item foi apagado.
  persist(); render(); // Salva e atualiza o painel.
} // Encerra exclusão.
form.addEventListener('submit', (event) => { // Trata cadastro e edição.
  event.preventDefault(); // Mantém tudo no navegador.
  if (!form.reportValidity()) return; // Respeita validações HTML.
  const data = Object.fromEntries(new FormData(form).entries()); // Lê os campos enviados.
  data.nome = String(data.nome).trim(); data.sku = String(data.sku).trim().toUpperCase(); // Normaliza nome e código.
  if (!data.nome || !data.sku) { status.textContent = 'Informe um nome e código válidos.'; return; } // Evita valores vazios.
  if (products.some((item) => item.sku === data.sku && item.id !== editingId)) { status.textContent = 'Já existe produto com este código.'; return; } // Garante códigos únicos.
  const item = sanitizeProduct({ ...data, id:editingId || `p-${Date.now()}-${Math.floor(Math.random()*1000)}` }); // Constrói cadastro simples.
  if (!Number.isInteger(item.quantidade) || !Number.isInteger(item.minimo) || item.quantidade<0 || item.minimo<0 || !Number.isFinite(item.preco) || item.preco<0) { status.textContent='Confira quantidade, mínimo e preço.'; return; } // Protege consistência numérica.
  if (editingId) products = products.map((product) => product.id === editingId ? item : product); // Atualiza registro existente.
  else products.push(item); // Adiciona novo item.
  persist(); resetEdit(); render(); // Grava, limpa e atualiza.
}); // Encerra cadastro.
$('#cancel-edit').addEventListener('click', resetEdit); // Habilita cancelar edição.
$('#search').addEventListener('input', render); // Atualiza busca enquanto digita.
$('#filter').addEventListener('change', render); // Atualiza filtro de alertas.
$('#export').addEventListener('click', () => downloadCSV('estoque-miudo.csv', ['Nome','Código','Quantidade','Mínimo','Preço'], products.map((item) => [item.nome,item.sku,item.quantidade,item.minimo,item.preco]))); // Permite backup manual.
render(); // Exibe a lista assim que a página abre.
