// Rotinas compartilhadas, copiadas para cada demo independente, sem dependências externas.
const WHATSAPP = '5511942038103'; // Telefone comercial autorizado pela MOSS Digital.
const $ = (selector, scope = document) => scope.querySelector(selector); // Busca um elemento.
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)]; // Busca uma lista.
const money = (number) => Number(number || 0).toLocaleString('pt-BR', {style:'currency', currency:'BRL'}); // Reais.
const whatsLink = (message) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`; // Link de atendimento.
const notify = (message) => { // Exibe uma mensagem rápida ao visitante.
  const live = $('#feedback'); // Região com leitura por tecnologias assistivas.
  if (live) live.textContent = message; // Evita inserir HTML não confiável.
};
const readLocal = (key, fallback) => { // Carrega dados, sem quebrar quando o armazenamento estiver indisponível.
  try {return JSON.parse(localStorage.getItem(key)) ?? fallback;} catch {return fallback;}
};
const saveLocal = (key, value) => { // Salva no navegador atual; não sincroniza entre dispositivos.
  try {localStorage.setItem(key, JSON.stringify(value)); return true;} catch {notify('Não foi possível salvar neste navegador.'); return false;}
};
function setupCommon() { // Executa configurações gerais da página.
  const toggle = $('#menu-toggle'); // Botão de menu em telas menores.
  const nav = $('#nav-links'); // Lista de navegação.
  if (toggle && nav) toggle.addEventListener('click', () => { // Mostra/oculta o menu.
    const opened = toggle.getAttribute('aria-expanded') === 'true'; // Estado anterior.
    toggle.setAttribute('aria-expanded', String(!opened)); // Atualiza acessibilidade.
    nav.classList.toggle('open', !opened); // Atualiza o visual.
  });
  if (nav) $$('#nav-links a').forEach(link => link.addEventListener('click', () => { // Fecha menu após navegar.
    nav.classList.remove('open'); if (toggle) toggle.setAttribute('aria-expanded','false');
  }));
  $$('img[data-photo]').forEach(img => { // Substitui o placeholder apenas se a foto real existir.
    const src = img.dataset.photo; if (!src) return; // Caminho local especificado no HTML.
    const probe = new Image(); // Verificação isolada para evitar foto quebrada.
    probe.onload = () => {img.src = src;}; // Usa a fotografia real.
    probe.src = src; // Inicia a checagem.
  });
  $$('a[data-whatsapp]').forEach(link => { // Configura atalhos de atendimento.
    link.href = whatsLink(link.dataset.message || `Olá! Vim pela demonstração ${document.body.dataset.demo}.`);
    link.target = '_blank'; link.rel = 'noopener noreferrer'; // Abertura segura.
  });
}
document.addEventListener('DOMContentLoaded', () => {setupCommon(); initDemo();}); // Aguarda o DOM.

// Montador de sorvetes: valores fictícios, sem cobrança ou baixa de estoque.
function initDemo(){ // Inicia a sorveteria.
 const form=$('#icecream-form'); // Formulário de montagem.
 const flavors=$$('input[name="sabores"]',form); // Sabores permitidos.
 const extras=$$('input[name="adicionais"]',form); // Adicionais.
 const getInfo=()=>{ // Lê seleção atual e calcula preço ilustrativo.
   const size=$('input[name="tamanho"]:checked',form); // Tamanho selecionado.
   const chosen=flavors.filter(x=>x.checked).map(x=>x.value); // Até dois sabores.
   const toppings=extras.filter(x=>x.checked).map(x=>x.value); // Adicionais.
   const quantity=Number($('#quantidade').value); // Quantidade informada.
   const unit=Number(size.dataset.price)+toppings.length*3; // Preço demonstrativo unitário.
   return {size:size.value,chosen,toppings,quantity,unit,total:unit*quantity}; // Dados estruturados.
 };
 const update=()=>{ // Recalcula o recibo.
   const x=getInfo(); const lines=$('#receipt-lines');lines.replaceChildren(); // Esvazia resumo.
   [`Tamanho: ${x.size}`,`Sabores: ${x.chosen.join(' + ')||'Escolha um sabor'}`,`Adicionais: ${x.toppings.join(', ')||'Sem adicionais'}`,`Unidades: ${x.quantity||0}`].forEach(text=>{const p=document.createElement('p');p.textContent=text;lines.append(p);}); // Texto seguro.
   $('#receipt-total').textContent=money(x.total); // Estimativa.
 };
 flavors.forEach(input=>input.addEventListener('change',()=>{ // Impede mais de dois sabores.
   const selected=flavors.filter(x=>x.checked);
   if(selected.length>2){input.checked=false;notify('Escolha no máximo dois sabores.');}
   update(); // Sincroniza visual.
 }));
 $$('input[name="tamanho"],input[name="adicionais"],#quantidade',form).forEach(input=>input.addEventListener('input',update)); // Outros campos.
 $$('[data-choose]').forEach(button=>button.addEventListener('click',()=>{ // Atalho no card do sabor.
   const name=button.dataset.choose;const input=flavors.find(x=>x.value===name); // Busca opção.
   if(input.checked){notify(`${name} já está selecionado.`);return;}
   if(flavors.filter(x=>x.checked).length>=2){notify('Retire um sabor antes de escolher outro.');return;}
   input.checked=true;update();$('#monte').scrollIntoView({behavior:'smooth'}); // Seleção e navegação.
 }));
 form.addEventListener('submit',event=>{ // Envia pedido por WhatsApp.
   event.preventDefault();const x=getInfo(); // Dados atuais.
   if(!x.chosen.length){notify('Selecione ao menos um sabor.');return;}
   if(!Number.isInteger(x.quantity)||x.quantity<1||x.quantity>20){notify('Informe uma quantidade de 1 a 20.');return;}
   const message=`Olá! Quero consultar um pedido na demo Dolce Neve.\nTamanho: ${x.size}\nSabores: ${x.chosen.join(' + ')}\nAdicionais: ${x.toppings.join(', ')||'Nenhum'}\nQuantidade: ${x.quantity}\nValor ilustrativo: ${money(x.total)}\nPor favor, confirme disponibilidade, entrega e pagamento.`;
   window.open(whatsLink(message),'_blank','noopener'); // Sem checkout.
 });
 update(); // Primeira estimativa.
}

// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
