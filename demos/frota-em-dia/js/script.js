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

// 48 – Agenda de manutenção de frota simulada; os dados ficam apenas neste navegador.
const STORAGE_KEY = 'moss-demo-frota-em-dia-v1'; // Chave exclusiva deste painel para evitar mistura com outras demos.
const today = localDate(); // Registra o dia local de abertura do painel.
const sample = [ // Dados fictícios iniciais para demonstrar alertas de manutenção.
  { id:'f1', placa:'DEMO-001', modelo:'Van de entregas', km:50200, proxima:50600, data:today, servico:'Revisão de rotina' }, // Primeiro registro com atenção por prazo e quilometragem.
  { id:'f2', placa:'DEMO-002', modelo:'Utilitário de apoio', km:32000, proxima:37000, data:'2030-12-30', servico:'Troca de filtros' }, // Exemplo sem urgência de manutenção.
]; // Encerra dados de demonstração.
let vehicles = getStorage(STORAGE_KEY, sample); // Tenta restaurar os registros anteriormente cadastrados.
if (!Array.isArray(vehicles)) vehicles = sample; // Recupera estado seguro se a gravação estiver inválida.
let editingId = null; // Indica se o formulário está editando um registro.
const form = $('#vehicle-form'); // Localiza o formulário de veículos.
const list = $('#vehicle-list'); // Recebe os cards dinâmicos.
const status = $('#fleet-status'); // Informa resultado das operações ao usuário.
form.elements.data.value = today; // Define a data inicial do novo cadastro.
function needsAttention(item) { // Regra didática de alerta por prazo ou quilometragem informados manualmente.
  const diffDays = Math.ceil((new Date(`${item.data}T12:00:00`) - new Date(`${localDate()}T12:00:00`)) / 86400000); // Calcula dias aproximados para o prazo.
  return item.proxima - item.km <= 500 || diffDays <= 14; // Avisa perto de 500 km ou de 14 dias.
} // Finaliza a regra de alerta.
function render() { // Reconstrói cards e indicadores de forma segura.
  const search = $('#search').value.toLocaleLowerCase('pt-BR').trim(); // Lê a busca por identificação ou modelo.
  const filter = $('#filter').value; // Lê o filtro selecionado.
  const visible = vehicles.filter((item) => { const atencao = needsAttention(item); return (item.placa.toLocaleLowerCase('pt-BR').includes(search) || item.modelo.toLocaleLowerCase('pt-BR').includes(search)) && (filter === 'todos' || (filter === 'atencao' && atencao) || (filter === 'ok' && !atencao)); }); // Calcula lista filtrada.
  $('#vehicle-count').textContent = vehicles.length; // Número total de veículos.
  $('#attention-count').textContent = vehicles.filter(needsAttention).length; // Conta itens em atenção.
  $('#ok-count').textContent = vehicles.filter((item) => !needsAttention(item)).length; // Conta os itens planejados sem alerta.
  list.replaceChildren(); // Remove cards antigos sem injetar HTML.
  if (!visible.length) { const empty = document.createElement('p'); empty.textContent = 'Nenhum veículo encontrado.'; list.appendChild(empty); } // Orienta quando os filtros não retornam dados.
  visible.forEach((item) => { // Monta um card por veículo.
    const attention = needsAttention(item); // Verifica condição do alerta.
    const card = document.createElement('article'); card.className = `vehicle-card${attention ? ' attention' : ''}`; // Cria contêiner do veículo.
    const top = document.createElement('div'); top.className = 'vehicle-top'; // Agrupa identificação e situação.
    const identity = document.createElement('div'); // Contêiner dos dados de identificação.
    const title = document.createElement('h3'); title.textContent = item.modelo; // Insere o modelo somente como texto.
    const plate = document.createElement('p'); plate.textContent = item.placa; // Insere a identificação sem HTML dinâmico.
    identity.append(title,plate); // Finaliza os dados de identificação.
    const badge = document.createElement('span'); badge.className = `vehicle-badge${attention ? ' attention' : ''}`; badge.textContent = attention ? 'Atenção' : 'Planejado'; // Cria selo acessível.
    top.append(identity,badge); // Completa o topo do card.
    const description = document.createElement('p'); description.textContent = `Serviço: ${item.servico}`; // Exibe a manutenção programada.
    const metrics = document.createElement('div'); metrics.className = 'vehicle-metrics'; // Contêiner de quilometragem.
    [[`Km atual`, item.km.toLocaleString('pt-BR')],[`Revisão em km`,item.proxima.toLocaleString('pt-BR')],[`Prazo`,item.data],[`Falta (km)`,Math.max(0,item.proxima-item.km).toLocaleString('pt-BR')]].forEach(([label,value]) => { const box = document.createElement('div'); const small = document.createElement('small'); small.textContent = label; const strong=document.createElement('strong'); strong.textContent=value; box.append(small,strong); metrics.appendChild(box); }); // Exibe indicadores de forma segura.
    const actions=document.createElement('div'); actions.className='vehicle-actions'; // Agrupa botões.
    const edit=document.createElement('button'); edit.type='button'; edit.textContent='Editar'; edit.setAttribute('aria-label',`Editar ${item.placa}`); edit.addEventListener('click',()=>editVehicle(item.id)); // Habilita edição.
    const remove=document.createElement('button'); remove.type='button'; remove.textContent='Excluir'; remove.setAttribute('aria-label',`Excluir ${item.placa}`); remove.addEventListener('click',()=>deleteVehicle(item.id)); // Habilita exclusão confirmada.
    actions.append(edit,remove); card.append(top,description,metrics,actions); list.appendChild(card); // Finaliza o card.
  }); // Encerra lista de veículos.
} // Fecha renderização.
function persist() { // Salva dados em localStorage sem sincronizar com outros aparelhos.
  const saved = saveStorage(STORAGE_KEY, vehicles); // Tenta persistir alterações.
  status.textContent = saved ? 'Dados salvos neste navegador. Exporte CSV para backup.' : 'Armazenamento indisponível. Exporte CSV para não perder alterações.'; // Exibe resultado real.
} // Termina persistência.
function editVehicle(id) { // Carrega dados de uma ficha no formulário.
  const item = vehicles.find((record) => record.id === id); // Localiza ficha.
  if (!item) return; // Protege contra registros inexistentes.
  editingId = id; // Define estado de edição.
  ['placa','modelo','km','proxima','data','servico'].forEach((key)=>{ form.elements[key].value=item[key]; }); // Preenche os campos.
  $('#form-title').textContent = 'Editar veículo'; $('#save').textContent='Salvar alterações'; $('#cancel').hidden=false; // Atualiza controles.
  $('#novo').scrollIntoView({ behavior:'smooth', block:'start' }); // Mostra edição ao usuário.
} // Fecha edição.
function resetForm() { // Limpa ficha após salvamento ou cancelamento.
  editingId=null; form.reset(); form.elements.data.value=localDate(); $('#form-title').textContent='Adicionar veículo'; $('#save').textContent='Salvar veículo'; $('#cancel').hidden=true; // Restaura cadastro inicial.
} // Fecha limpeza.
function deleteVehicle(id) { // Remove somente após confirmação explícita.
  const item=vehicles.find((record)=>record.id===id); // Identifica veículo.
  if (!item || !confirm(`Excluir ${item.placa} deste navegador?`)) return; // Confirma exclusão.
  vehicles=vehicles.filter((record)=>record.id!==id); // Remove registro específico.
  if (editingId===id) resetForm(); // Evita editar registro removido.
  persist(); render(); // Atualiza lista e indicadores.
} // Fecha exclusão.
form.addEventListener('submit',(event)=>{ // Trata inclusão e atualização de veículos.
  event.preventDefault(); // Não envia dados por rede.
  if (!form.reportValidity()) return; // Exige preenchimento mínimo.
  const data=Object.fromEntries(new FormData(form).entries()); // Recupera valores do formulário.
  data.placa=String(data.placa).trim().toUpperCase(); data.modelo=String(data.modelo).trim(); data.servico=String(data.servico).trim(); // Normaliza textos digitados.
  const km=Number(data.km), proxima=Number(data.proxima); // Converte quilômetros para números.
  if (!data.placa || !data.modelo || !data.servico || !/^\d{4}-\d{2}-\d{2}$/.test(data.data) || !Number.isInteger(km) || km<0 || !Number.isInteger(proxima) || proxima<0) { status.textContent='Confira os dados da ficha.'; return; } // Evita registros inválidos.
  if (vehicles.some((item)=>item.placa===data.placa && item.id!==editingId)) { status.textContent='Esta identificação já foi cadastrada.'; return; } // Garante identificação única na demo.
  const item={id:editingId||`v-${Date.now()}-${Math.floor(Math.random()*1000)}`,placa:data.placa,modelo:data.modelo,km,proxima,data:data.data,servico:data.servico}; // Constrói registro simples.
  if (editingId) vehicles=vehicles.map((record)=>record.id===editingId?item:record); else vehicles.push(item); // Salva cadastro ou edição.
  persist(); resetForm(); render(); // Atualiza estado e painel.
}); // Encerra formulário.
$('#cancel').addEventListener('click',resetForm); // Permite cancelar edição.
$('#search').addEventListener('input',render); // Aplica pesquisa imediata.
$('#filter').addEventListener('change',render); // Atualiza indicadores filtrados.
$('#export').addEventListener('click',()=>downloadCSV('frota-em-dia.csv',['Identificação','Modelo','Km atual','Revisão km','Data limite','Serviço'],vehicles.map((item)=>[item.placa,item.modelo,item.km,item.proxima,item.data,item.servico]))); // Exporta backup CSV local.
render(); // Exibe painel na abertura.
