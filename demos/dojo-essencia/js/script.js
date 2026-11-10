/* Apenas apresentação e pedido de informações: nenhuma aula é reservada. */
const WHATSAPP='5511942038103'; // Declara um dado ou referência utilizada nesta funcionalidade.
const nav=document.querySelector('#nav'); // Declara um dado ou referência utilizada nesta funcionalidade.
const toggle=document.querySelector('#menu-button'); // Declara um dado ou referência utilizada nesta funcionalidade.
toggle.addEventListener('click',()=>{ // Registra a reação a uma ação do usuário.
  const ativo=nav.classList.toggle('open'); // Declara um dado ou referência utilizada nesta funcionalidade.
  toggle.setAttribute('aria-expanded',String(ativo)); // Executa uma etapa da interação descrita acima.
  toggle.textContent=ativo?'✕':'☰'; // Atualiza um texto da interface sem inserir HTML.
}); // Encerra o bloco ou a função anterior.
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ // Registra a reação a uma ação do usuário.
  nav.classList.remove('open'); // Executa uma etapa da interação descrita acima.
  toggle.setAttribute('aria-expanded','false'); // Executa uma etapa da interação descrita acima.
  toggle.textContent='☰'; // Atualiza um texto da interface sem inserir HTML.
})); // Encerra o bloco ou a função anterior.
/* Cards inserem turma escolhida no formulário de interesse. */
document.querySelectorAll('[data-turma]').forEach(card=>card.addEventListener('click',()=>{ // Registra a reação a uma ação do usuário.
  document.querySelector('#turma').value=card.dataset.turma; // Localiza os elementos necessários na página.
  document.querySelector('#visita').scrollIntoView({behavior:'smooth'}); // Localiza os elementos necessários na página.
})); // Encerra o bloco ou a função anterior.
/* Contato adequado para escola: responsável ou interessado controla mensagem. */
document.querySelector('#dojo-form').addEventListener('submit',evento=>{ // Registra a reação a uma ação do usuário.
  evento.preventDefault(); // Executa uma etapa da interação descrita acima.
  const dados=new FormData(evento.currentTarget); // Declara um dado ou referência utilizada nesta funcionalidade.
  const nome=String(dados.get('nome')||'').trim(); // Declara um dado ou referência utilizada nesta funcionalidade.
  const turma=String(dados.get('turma')||''); // Declara um dado ou referência utilizada nesta funcionalidade.
  const periodo=String(dados.get('periodo')||''); // Declara um dado ou referência utilizada nesta funcionalidade.
  if(!nome||!turma||!periodo)return; // Verifica uma condição antes de prosseguir.
  const msg=`Olá! Quero informações sobre o Dojô Essência.\nResponsável ou interessado: ${nome}\nTurma: ${turma}\nPeríodo de preferência: ${periodo}\nGostaria de saber sobre horários e possibilidade de visita. Aguardo confirmação.`; // Declara um dado ou referência utilizada nesta funcionalidade.
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,'_blank','noopener,noreferrer'); // Abre a conversa do WhatsApp com mensagem codificada.
}); // Encerra o bloco ou a função anterior.
