// EXPLICAÇÃO: tenta usar a fotografia real quando o arquivo existir na pasta de fotos.
// EXPLICAÇÃO: fotos sem revisão de licença não recebem o selo de "foto verificada".
const imagensReaisCarregadas = new Set();
// EXPLICAÇÃO: observa as imagens inseridas dinamicamente na vitrine, no carrinho e nos detalhes.
const observadorDeFotos = new MutationObserver(() => {
  // EXPLICAÇÃO: seleciona imagens de produtos ainda não verificadas pelo carregador.
  document.querySelectorAll('img[src*="/produtos/relogio-"]').forEach((imagem) => {
    // EXPLICAÇÃO: evita repetir a tentativa no mesmo elemento.
    if (imagem.dataset.fotoTentada === 'sim') return;
    // EXPLICAÇÃO: marca a tentativa para evitar loops.
    imagem.dataset.fotoTentada = 'sim';
    // EXPLICAÇÃO: extrai o número do relógio do arquivo SVG original.
    const correspondencia = imagem.getAttribute('src').match(/relogio-(\d{3})\.svg/);
    // EXPLICAÇÃO: ignora imagens que não correspondem ao padrão do catálogo.
    if (!correspondencia) return;
    // Não associa uma fotografia de origem/modelo não confirmados a um SKU fictício.
    const produto = PRODUTOS.find(p => String(p.id).padStart(3, '0') === correspondencia[1]);
    if (!produto?.fotoValidada) return;
    // EXPLICAÇÃO: guarda a ilustração para restaurar em caso de foto ausente.
    const imagemOriginal = imagem.getAttribute('src');
    // EXPLICAÇÃO: cria a referência ao arquivo JPEG correspondente.
    const arquivoReal = `assets/img/fotos-reais/relogio-${correspondencia[1]}.jpg`;
    // EXPLICAÇÃO: usa uma imagem temporária para testar se o arquivo realmente existe.
    const teste = new Image();
    // EXPLICAÇÃO: só troca a imagem da loja quando o JPEG carregar corretamente.
    teste.onload = () => { imagem.src = arquivoReal; imagem.alt = `Fotografia demonstrativa de relógio ${correspondencia[1]} — modelo e licença a confirmar`; imagensReaisCarregadas.add(correspondencia[1]); };
    // EXPLICAÇÃO: mantém a ilustração caso a foto não exista ou esteja corrompida.
    teste.onerror = () => { imagem.src = imagemOriginal; };
    // EXPLICAÇÃO: inicia a verificação da foto local.
    teste.src = arquivoReal;
  });
});
// EXPLICAÇÃO: observa a criação dos cards, diálogos e itens do carrinho.
observadorDeFotos.observe(document.body, { childList: true, subtree: true });
// EXPLICAÇÃO: verifica também as imagens que já estavam na página.
document.querySelectorAll('img[src*="/produtos/relogio-"]').forEach((imagem) => {
  // EXPLICAÇÃO: ativa a verificação sem depender de alterações no DOM.
  const codigo = imagem.getAttribute('src').match(/relogio-(\d{3})\.svg/);
  // EXPLICAÇÃO: apenas arquivos com código válido participam da substituição.
  if (!codigo) return;
  const produto = PRODUTOS.find(p => String(p.id).padStart(3, '0') === codigo[1]);
  if (!produto?.fotoValidada) return;
  // EXPLICAÇÃO: a imagem real precisa estar na pasta local.
  const foto = new Image();
  // EXPLICAÇÃO: altera a foto de destaque somente após carregar com sucesso.
  foto.onload = () => { imagem.src = `assets/img/fotos-reais/relogio-${codigo[1]}.jpg`; imagem.alt = 'Fotografia demonstrativa; identificação do produto pendente'; };
  // EXPLICAÇÃO: dispara o teste do arquivo correspondente.
  foto.src = `assets/img/fotos-reais/relogio-${codigo[1]}.jpg`;
});
