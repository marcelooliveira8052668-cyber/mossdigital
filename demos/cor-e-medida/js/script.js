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

// Calculadora comercial de tinta; estimativa não substitui o rendimento do fabricante.
function iniciarDemo() { // Prepara as medidas.
  const form=document.querySelector('#calculadora-form'); // Formulário de paredes.
  const aviso=document.querySelector('#erro'); // Erros de preenchimento.
  const botoesCor=[...document.querySelectorAll('[data-cor]')]; // Amostras de cores.
  let corAtual='Areia suave'; // Cor demonstrativa inicial.
  let ultimo=null; // Resultado do último cálculo válido.
  const lerNumero=(id)=>Number(document.querySelector('#'+id).value); // Converte campos em números.
  const calcular=()=>{ // Recalcula o cenário de pintura.
    aviso.textContent=''; // Limpa erros anteriores.
    if (!form.reportValidity()) return null; // Valida os limites HTML.
    const comprimento=lerNumero('comprimento'); const largura=lerNumero('largura'); const altura=lerNumero('altura'); // Medidas do cômodo.
    const aberturas=lerNumero('aberturas'); const demaos=lerNumero('demaos'); const rendimento=lerNumero('rendimento'); // Outras premissas.
    if ([comprimento,largura,altura,aberturas,demaos,rendimento].some((v)=>!Number.isFinite(v))) {aviso.textContent='Informe números válidos.';return null;} // Checa dados.
    const paredeBruta=2*(comprimento+largura)*altura; // Perímetro multiplicado pela altura.
    const area=paredeBruta-aberturas; // Desconta portas e janelas.
    if (area<=0) { aviso.textContent='As aberturas não podem superar a área total de paredes.'; return null; } // Evita divisão inadequada.
    const litros=area*demaos/rendimento*1.10; // Inclui reserva de 10%.
    const latas=Math.ceil(litros/3.6); // Número inteiro de latas ilustrativas.
    const preco=latas*89; // Usa preço de exemplo, não oferta comercial.
    document.querySelector('#area').textContent=`${area.toFixed(2).replace('.',',')} m²`; // Área líquida.
    document.querySelector('#litros').textContent=`${litros.toFixed(2).replace('.',',')} L`; // Litros.
    document.querySelector('#latas').textContent=String(latas); // Embalagens de exemplo.
    document.querySelector('#preco').textContent=moeda(preco); // Total de exemplo.
    document.querySelector('#barra').style.width=`${Math.max(8,Math.min(100,litros/30*100))}%`; // Barra apenas ilustrativa.
    ultimo={comprimento,largura,altura,aberturas,demaos,rendimento,area,litros,latas,preco}; // Salva última simulação.
    return ultimo; // Devolve dados ao chamador.
  };
  botoesCor.forEach((botao)=>botao.addEventListener('click',()=>{ // Ativa uma cor.
    corAtual=botao.dataset.cor; // Nome escolhido.
    document.documentElement.style.setProperty('--cor',botao.dataset.hex); // Muda apenas cor da parede ilustrativa.
    document.querySelector('#nome-cor').textContent=corAtual; // Atualiza legenda.
    document.querySelector('#cor-resumo').textContent=`Cor selecionada: ${corAtual}`; // Atualiza resumo.
    botoesCor.forEach((outro)=>outro.setAttribute('aria-pressed',String(outro===botao))); // Informa seleção ao leitor de tela.
  })); // Encerra amostras.
  form.addEventListener('submit',(evento)=>{evento.preventDefault();calcular();}); // Recalcula ao enviar.
  form.querySelectorAll('input,select').forEach((campo)=>campo.addEventListener('input',calcular)); // Prévia instantânea.
  document.querySelector('#pedir-tinta').addEventListener('click',()=>{ // Envia cotação.
    const dados=calcular(); if (!dados) return; // Impede mensagem inválida.
    abrirWhatsApp(['Olá! Vim pela demonstração Cor & Medida e quero consultar tintas.',`Cômodo: ${dados.comprimento} × ${dados.largura} m, altura ${dados.altura} m`,`Área de aberturas: ${dados.aberturas} m²`,`Demãos: ${dados.demaos}`,`Rendimento previsto: ${dados.rendimento} m²/L por demão`,`Cor de referência: ${corAtual}`,`Área líquida aproximada: ${dados.area.toFixed(2)} m²`,`Tinta com reserva: ${dados.litros.toFixed(2)} L`,`Latas ilustrativas de 3,6 L: ${dados.latas}`,`Valor de exemplo: ${moeda(dados.preco)}`,'Por favor, confirme produto, rendimento, preços e disponibilidade.'].join('\n')); // Texto completo.
  }); // Encerra pedido.
  calcular(); // Exibe valores iniciais.
} // Encerra calculadora.
