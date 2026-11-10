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

// Controle didático de estacionamento com localStorage, sem servidor e sem faturamento real.
const STORAGE_PARKING = 'moss-demo-estaciona-v1'; // Chave exclusiva para não misturar dados de outros sites.
const PRECOS_EXEMPLO = {carro:{primeira:12,extra:6},moto:{primeira:8,extra:4}}; // Tarifas fictícias.
function iniciarDemo() { // Ativa o painel.
  const form = document.querySelector('#entrada-form'); // Registro de entrada.
  const tabela = document.querySelector('#linhas'); // Histórico.
  const dialogo = document.querySelector('#dialogo-saida'); // Confirmação.
  const avisoEntrada = document.querySelector('#aviso-entrada'); // Retorno do cadastro.
  const avisoMovimento = document.querySelector('#aviso-movimento'); // Retorno do histórico.
  let registros = []; // Dados atuais apenas deste navegador.
  let selecionado = null; // Ticket a finalizar.
  try { const salvo = JSON.parse(localStorage.getItem(STORAGE_PARKING) || '[]'); registros = Array.isArray(salvo) ? salvo.filter((r) => r && typeof r.codigo === 'string' && Number.isFinite(r.entrada)) : []; } catch { registros = []; } // Evita quebra com dados corrompidos.
  const salvar = () => { // Persiste os registros localmente.
    try { localStorage.setItem(STORAGE_PARKING, JSON.stringify(registros)); return true; } catch { avisoMovimento.textContent = 'Armazenamento indisponível: os dados não serão guardados após fechar a página.'; return false; } // Trata modo privado.
  };
  const calcular = (registro, fim = Date.now()) => { // Aplica tarifa de demonstração por horas iniciadas.
    const horas = Math.max(1, Math.ceil(Math.max(0, fim - registro.entrada) / 3600000)); // Uma hora mínima.
    const regra = PRECOS_EXEMPLO[registro.categoria] || PRECOS_EXEMPLO.carro; // Identifica tipo.
    return {horas, valor: regra.primeira + Math.max(0, horas - 1) * regra.extra}; // Retorna horas e valor.
  };
  const dataHora = (numero) => new Date(numero).toLocaleString('pt-BR',{dateStyle:'short',timeStyle:'short'}); // Formata datas.
  const renderizar = () => { // Atualiza estatísticas e tabela.
    const abertos = registros.filter((r) => !r.saida); // Tickets ativos.
    const fechados = registros.filter((r) => r.saida); // Tickets encerrados.
    document.querySelector('#ativos').textContent = String(abertos.length); // Contador de entradas.
    document.querySelector('#finalizados').textContent = String(fechados.length); // Contador de saídas.
    document.querySelector('#receita').textContent = moeda(fechados.reduce((soma,r)=>soma+(r.valor||0),0)); // Soma hipotética.
    tabela.innerHTML = registros.slice().reverse().map((r) => `<tr><td><strong>${r.codigo}</strong></td><td>${r.categoria === 'moto'?'Moto':'Carro'}</td><td>${dataHora(r.entrada)}</td><td><span class="tag-status ${r.saida?'fechado':''}">${r.saida?'Finalizado':'No pátio'}</span></td><td>${r.saida ? moeda(r.valor||0) : `<button type="button" data-saida="${r.id}">Registrar saída</button>`}</td></tr>`).join('') || '<tr><td colspan="5">Nenhum registro criado ainda.</td></tr>'; // Monta linhas seguras a partir de códigos validados.
    tabela.querySelectorAll('[data-saida]').forEach((botao) => botao.addEventListener('click', () => { // Abre conferência de saída.
      selecionado = registros.find((r)=>r.id===botao.dataset.saida && !r.saida); // Localiza ticket ativo.
      if (!selecionado) return; // Impede duplicação.
      const info = calcular(selecionado); // Calcula valor atual.
      document.querySelector('#resumo-saida').textContent = `${selecionado.codigo} · ${info.horas} hora(s) iniciada(s) · Valor ilustrativo: ${moeda(info.valor)}.`; // Informa a estimativa.
      dialogo.showModal(); // Mostra confirmação.
    })); // Encerra botões de saída.
  };
  form.addEventListener('submit',(evento)=>{ // Entrada manual.
    evento.preventDefault(); // Permanece na página.
    if (!form.reportValidity()) return; // Valida padrões HTML.
    const codigo = document.querySelector('#codigo').value.trim().toUpperCase(); // Normaliza código.
    if (!/^[A-Z0-9-]{4,8}$/.test(codigo)) { avisoEntrada.textContent = 'Informe de 4 a 8 letras, números ou hífen.'; return; } // Checagem adicional.
    if (registros.some((r)=>r.codigo===codigo && !r.saida)) { avisoEntrada.textContent = 'Esse código já possui entrada aberta.'; return; } // Evita duplicatas ativas.
    const categoria = document.querySelector('#categoria').value; // Identifica tipo.
    registros.push({id:String(Date.now())+'-'+Math.random().toString(36).slice(2,7),codigo,categoria,entrada:Date.now(),saida:null,valor:null}); // Cria ticket de demonstração.
    salvar(); renderizar(); form.reset(); // Persiste e limpa cadastro.
    avisoEntrada.textContent = `Entrada registrada para ${codigo}.`; // Confirma registro local.
  }); // Encerra cadastro.
  const fechar = () => { selecionado=null; dialogo.close(); }; // Limpa estado da conferência.
  document.querySelector('#cancelar-saida').addEventListener('click', fechar); // Fecha no X.
  document.querySelector('#voltar-saida').addEventListener('click', fechar); // Fecha no botão.
  document.querySelector('#confirmar-saida').addEventListener('click',()=>{ // Finaliza ticket.
    if (!selecionado || selecionado.saida) return; // Evita conclusão dupla.
    const agora = Date.now(); const calculo = calcular(selecionado,agora); // Congela cálculo no momento.
    selecionado.saida=agora; selecionado.valor=calculo.valor; // Guarda dados demonstrativos.
    salvar(); fechar(); renderizar(); // Atualiza estado e fecha diálogo.
    avisoMovimento.textContent = 'Saída registrada somente neste navegador.'; // Comunica o resultado.
  }); // Encerra saída.
  document.querySelector('#limpar').addEventListener('click',()=>{ // Limpeza explícita.
    if (!registros.length) { avisoMovimento.textContent = 'Nenhum registro para apagar.'; return; } // Evita ações vazias.
    if (!window.confirm('Apagar TODOS os registros de demonstração deste navegador?')) return; // Exige confirmação humana.
    registros=[]; salvar(); renderizar(); avisoMovimento.textContent='Histórico local apagado.'; // Reinicia painel.
  }); // Encerra limpeza.
  document.querySelector('#exportar').addEventListener('click',()=>{ // Gera arquivo para planilha.
    const cabecalho = ['Codigo','Categoria','Entrada','Saida','Valor ilustrativo']; // Nomes de colunas.
    const linhas = registros.map((r)=>[r.codigo,r.categoria,dataHora(r.entrada),r.saida?dataHora(r.saida):'',r.valor??'']); // Formata registros.
    const csv = '\uFEFF'+[cabecalho,...linhas].map((linha)=>linha.map((celula)=>`"${String(celula).replaceAll('"','""')}"`).join(';')).join('\r\n'); // Protege aspas e acentos; códigos limitados ao padrão alfanumérico.
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})); // Cria arquivo temporário.
    const link=document.createElement('a'); link.href=url; link.download='estaciona-demonstracao.csv'; document.body.append(link); link.click(); link.remove(); // Inicia download.
    setTimeout(()=>URL.revokeObjectURL(url),1000); // Libera memória.
    avisoMovimento.textContent='Relatório demonstrativo preparado para download.'; // Confirma exportação.
  }); // Encerra exportação.
  renderizar(); // Renderiza painel inicial.
} // Finaliza aplicativo.
