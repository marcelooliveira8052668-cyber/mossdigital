// TOLDOFORMA — cálculo demonstrativo em três etapas, sem cobrança ou serviço contratado.
(() => { // Início do módulo privado.
  'use strict'; // Segurança de escopo.
  const PHONE='5511942038103'; // Número comercial autorizado.
  const $=selector=>document.querySelector(selector); // Atalho DOM.
  const menu=$('#menu-toggle'); // Botão móvel.
  menu?.addEventListener('click',()=>{const open=$('#nav-links').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));}); // Alterna menu.
  document.querySelectorAll('img[data-photo]').forEach(img=>{const trial=new Image();trial.onload=()=>img.src=img.dataset.photo;trial.src=img.dataset.photo;}); // Carrega fotos colocadas posteriormente.
  const models={retratil:{name:'Toldo retrátil',rate:340},fixa:{name:'Cobertura fixa',rate:440},comercial:{name:'Toldo comercial',rate:290}}; // Valores por m² apenas fictícios.
  const finishes={basico:{name:'Padrão',extra:0},premium:{name:'Premium',extra:110}}; // Adicionais ilustrativos por m².
  let type='retratil'; // Tipo inicial.
  let step=1; // Etapa atual.
  const brl=value=>value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); // Moeda brasileira.
  const compute=()=>{ // Calcula área e preço referencial.
    const width=Number($('#width').value); // Largura, em metros.
    const depth=Number($('#depth').value); // Projeção, em metros.
    if(!Number.isFinite(width)||!Number.isFinite(depth)||width<1||width>12||depth<.5||depth>8){return null;} // Regras de entrada.
    const area=width*depth; // Área geométrica.
    const finish=finishes[$('#finish').value]; // Acabamento.
    const installation=$('#installation').checked; // Inclui instalação fictícia.
    const total=area*(models[type].rate+finish.extra)+(installation?350:0); // Cálculo ilustrativo.
    return {width,depth,area,model:models[type].name,finish:finish.name,installation,total}; // Informações para resumo.
  };
  const updatePanel=()=>{ // Alterna visibilidade de etapas.
    document.querySelectorAll('[data-panel]').forEach(panel=>{panel.hidden=Number(panel.dataset.panel)!==step;}); // Mostra somente uma etapa.
    document.querySelectorAll('[data-step-nav]').forEach(button=>{const active=Number(button.dataset.stepNav)===step;button.classList.toggle('active',active);if(active)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');}); // Realça etapa atual.
    $('#prev-step').hidden=step===1;$('#next-step').hidden=step===3;$('#send-quote').hidden=step!==3; // Botões contextuais.
    if(step===3){const value=compute();if(value){$('#summary-type').textContent=value.model;$('#summary-area').textContent=`${value.area.toLocaleString('pt-BR',{maximumFractionDigits:2})} m²`;$('#summary-finish').textContent=value.finish;$('#summary-price').textContent=brl(value.total);}} // Preenche resumo.
  };
  const setModel=value=>{ // Atualiza modelo selecionado.
    if(!models[value])return; // Protege valor de entrada.
    type=value;document.querySelectorAll('[data-type]').forEach(button=>{const active=button.dataset.type===type;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}); // Estado visual.
  };
  document.querySelectorAll('[data-type]').forEach(button=>button.addEventListener('click',()=>setModel(button.dataset.type))); // Seleção do modelo.
  document.querySelectorAll('[data-select]').forEach(button=>button.addEventListener('click',()=>{setModel(button.dataset.select);step=1;updatePanel();$('#simulador').scrollIntoView({behavior:'smooth'});})); // Escolha pelo catálogo.
  $('#next-step').addEventListener('click',()=>{if(step===2&&!compute()){alert('Informe largura de 1 a 12 metros e projeção de 0,5 a 8 metros.');return;}step=Math.min(3,step+1);updatePanel();}); // Avança validando.
  $('#prev-step').addEventListener('click',()=>{step=Math.max(1,step-1);updatePanel();}); // Retorna etapa.
  document.querySelectorAll('[data-step-nav]').forEach(button=>button.addEventListener('click',()=>{const destination=Number(button.dataset.stepNav);if(destination===3&&!compute()){alert('Confira as medidas antes de revisar.');return;}step=destination;updatePanel();})); // Navegação entre etapas.
  $('#wizard-form').addEventListener('submit',event=>{ // Envia resumo para atendimento.
    event.preventDefault(); // Não existe backend.
    const info=compute();if(!info){alert('Confira as medidas.');return;} // Garante dados válidos.
    const message=`Olá! Vim pela demo ToldoForma. Modelo: ${info.model}. Medidas aproximadas: ${info.width} m × ${info.depth} m (${info.area.toFixed(2)} m²). Acabamento: ${info.finish}. Instalação incluída na simulação: ${info.installation?'sim':'não'}. Referência fictícia: ${brl(info.total)}. Solicito avaliação técnica e orçamento real.`; // Conteúdo para WhatsApp.
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer'); // Abre conversa, sem enviar automaticamente.
  });
  updatePanel(); // Inicialização.
})(); // Finalização.
