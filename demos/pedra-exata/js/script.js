// PEDRA EXATA — medidas e preços fictícios, nunca orçamento definitivo.
(() => { // Escopo independente.
  'use strict'; // Modo estrito.
  const WHATSAPP = '5511942038103'; // Número autorizado.
  const materials = { // Materiais e valores por metro quadrado apenas ilustrativos.
    granito: { name:'Granito', rate:740 }, // Valor fictício de referência.
    quartzo: { name:'Quartzo', rate:1320 }, // Valor fictício de referência.
    marmore: { name:'Mármore', rate:1580 } // Valor fictício de referência.
  };
  const finishing = { reto:0, polido:120, especial:240 }; // Adicionais por peça, fictícios.
  const $ = selector => document.querySelector(selector); // Atalho para consultas.
  const menu = $('#menu-toggle'); // Botão de navegação móvel.
  menu?.addEventListener('click', () => { const open = $('#main-nav').classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); }); // Alterna navegação.
  document.querySelectorAll('img[data-photo]').forEach(img => { // Suporte para fotos locais.
    const test = new Image(); // Verifica se arquivo existe.
    test.onload = () => { img.src = img.dataset.photo; }; // Troca o placeholder após sucesso.
    test.src = img.dataset.photo; // Caminho que o OpenCode poderá preencher.
  });
  let selected = 'granito'; // Material inicial.
  const formatMoney = number => number.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); // Formatação brasileira.
  const calculate = () => { // Calcula a referência a partir de medidas.
    const width = Number($('#largura').value); // Largura em centímetros.
    const depth = Number($('#profundidade').value); // Profundidade em centímetros.
    const quantity = Number($('#quantidade').value); // Número de peças.
    const edging = $('#acabamento').value; // Acabamento escolhido.
    if (![width,depth,quantity].every(Number.isFinite) || width < 30 || width > 600 || depth < 30 || depth > 300 || quantity < 1 || quantity > 20) { // Validação.
      $('#area').textContent = 'Confira as medidas'; $('#price').textContent = '—'; return null; // Bloqueia valores incoerentes.
    }
    const area = width / 100 * depth / 100 * quantity; // Área geométrica em m².
    const reference = area * materials[selected].rate + quantity * finishing[edging]; // Preço estimativo simples.
    $('#area').textContent = `${area.toLocaleString('pt-BR',{maximumFractionDigits:2})} m²`; // Resultado de metragem.
    $('#price').textContent = formatMoney(reference); // Resultado ilustrativo.
    return {width,depth,quantity,area,reference,edging,material:materials[selected].name}; // Dados para WhatsApp.
  };
  document.querySelectorAll('[data-stone]').forEach(button => { // Seleção de superfície.
    button.addEventListener('click', () => { // Ação de clique.
      selected = button.dataset.stone; // Material escolhido.
      document.querySelectorAll('[data-stone]').forEach(item => { item.classList.toggle('active',item===button); item.setAttribute('aria-pressed',String(item===button)); }); // Atualiza visual e acessibilidade.
      calculate(); // Refaz cálculo.
    });
  });
  ['#largura','#profundidade','#quantidade','#acabamento'].forEach(selector => $(selector).addEventListener('input', calculate)); // Atualização instantânea.
  $('#estimate-form')?.addEventListener('submit', event => { // Pedido pelo WhatsApp.
    event.preventDefault(); // Impede envio para servidor inexistente.
    const result = calculate(); if (!result) { alert('Confira as medidas antes de continuar.'); return; } // Valida resultado.
    const message = `Olá! Vim pela demo Pedra Exata. Gostaria de orçamento para ${result.quantity} peça(s) de ${result.material}, ${result.width} × ${result.depth} cm, acabamento ${result.edging}. Área aproximada ${result.area.toFixed(2)} m². Estimativa ilustrativa ${formatMoney(result.reference)}. Quero confirmar preço real, frete e instalação.`; // Mensagem detalhada.
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer'); // Abre conversa.
  });
  calculate(); // Preenche a estimativa inicial.
})(); // Fim do módulo.
