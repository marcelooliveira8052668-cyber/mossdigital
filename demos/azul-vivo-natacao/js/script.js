/* O formulário representa interesse: não é uma reserva confirmada. */
const WHATSAPP='5511942038103'; // Declara um dado ou referência utilizada nesta funcionalidade.
const menu=document.querySelector('#nav'); // Declara um dado ou referência utilizada nesta funcionalidade.
const botaoMenu=document.querySelector('#menu-button'); // Declara um dado ou referência utilizada nesta funcionalidade.
botaoMenu.addEventListener('click',()=>{const aberto=menu.classList.toggle('open');botaoMenu.setAttribute('aria-expanded',String(aberto));botaoMenu.textContent=aberto?'✕':'☰';}); // Registra a reação a uma ação do usuário.
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');botaoMenu.setAttribute('aria-expanded','false');botaoMenu.textContent='☰';})); // Registra a reação a uma ação do usuário.
/* Cards selecionam a modalidade no formulário sem capturar dados pessoais. */
document.querySelectorAll('[data-modalidade]').forEach(card=>card.addEventListener('click',()=>{ // Registra a reação a uma ação do usuário.
  document.querySelector('#modalidade').value=card.dataset.modalidade; // Localiza os elementos necessários na página.
  document.querySelector('#experiencia').scrollIntoView({behavior:'smooth'}); // Localiza os elementos necessários na página.
})); // Encerra o bloco ou a função anterior.
/* Somente os dados que o usuário escreve voluntariamente entram na mensagem. */
document.querySelector('#experiment-form').addEventListener('submit',evento=>{ // Registra a reação a uma ação do usuário.
  evento.preventDefault(); // Executa uma etapa da interação descrita acima.
  const dados=new FormData(evento.currentTarget); // Declara um dado ou referência utilizada nesta funcionalidade.
  const nome=String(dados.get('nome')||'').trim(); // Declara um dado ou referência utilizada nesta funcionalidade.
  const idade=String(dados.get('idade')||''); // Declara um dado ou referência utilizada nesta funcionalidade.
  const modalidade=String(dados.get('modalidade')||''); // Declara um dado ou referência utilizada nesta funcionalidade.
  const turno=String(dados.get('turno')||''); // Declara um dado ou referência utilizada nesta funcionalidade.
  const objetivo=String(dados.get('objetivo')||'').trim(); // Declara um dado ou referência utilizada nesta funcionalidade.
  if(!nome||!idade||!modalidade||!turno) return; // Verifica uma condição antes de prosseguir.
  const msg=`Olá! Quero saber mais sobre as aulas da Azul Vivo.\nNome: ${nome}\nFaixa etária: ${idade}\nModalidade: ${modalidade}\nPeríodo preferido: ${turno}${objetivo?`\nObservação: ${objetivo}`:''}\nAguardo informações e confirmação de disponibilidade.`; // Declara um dado ou referência utilizada nesta funcionalidade.
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,'_blank','noopener,noreferrer'); // Abre a conversa do WhatsApp com mensagem codificada.
}); // Encerra o bloco ou a função anterior.
