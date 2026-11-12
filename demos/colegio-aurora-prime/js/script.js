/* O número é de demonstração; altere no atendimento do cliente. */
const WHATSAPP = '5511942038103'; // Declara um dado ou referência utilizada nesta funcionalidade.
const nav = document.querySelector('#navigation'); // Declara um dado ou referência utilizada nesta funcionalidade.
const menu = document.querySelector('.menu-toggle'); // Declara um dado ou referência utilizada nesta funcionalidade.
/* Menu acessível de celular. */
menu.addEventListener('click', () => { // Registra a reação a uma ação do usuário.
  const aberto = nav.classList.toggle('open'); // Declara um dado ou referência utilizada nesta funcionalidade.
  menu.setAttribute('aria-expanded', String(aberto)); // Executa uma etapa da interação descrita acima.
  menu.textContent = aberto ? '✕' : '☰'; // Atualiza um texto da interface sem inserir HTML.
}); // Encerra o bloco ou a função anterior.
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { // Registra a reação a uma ação do usuário.
  nav.classList.remove('open'); // Executa uma etapa da interação descrita acima.
  menu.setAttribute('aria-expanded', 'false'); // Executa uma etapa da interação descrita acima.
  menu.textContent = '☰'; // Atualiza um texto da interface sem inserir HTML.
})); // Encerra o bloco ou a função anterior.
/* Clicar em uma etapa deixa o formulário de visita pré-selecionado. */
document.querySelectorAll('[data-etapa]').forEach(card => { // Localiza os elementos necessários na página.
  card.addEventListener('click', () => { // Registra a reação a uma ação do usuário.
    document.querySelector('#etapa').value = card.dataset.etapa; // Localiza os elementos necessários na página.
    document.querySelector('#visita').scrollIntoView({behavior:'smooth'}); // Localiza os elementos necessários na página.
  }); // Encerra o bloco ou a função anterior.
}); // Encerra o bloco ou a função anterior.
/* A ação apenas prepara o WhatsApp; ninguém fica automaticamente agendado. */
document.querySelector('#visita-form').addEventListener('submit', evento => { // Registra a reação a uma ação do usuário.
  evento.preventDefault(); // Executa uma etapa da interação descrita acima.
  const dados = new FormData(evento.currentTarget); // Declara um dado ou referência utilizada nesta funcionalidade.
  const nome = String(dados.get('nome') || '').trim(); // Declara um dado ou referência utilizada nesta funcionalidade.
  const etapa = String(dados.get('etapa') || ''); // Declara um dado ou referência utilizada nesta funcionalidade.
  const turno = String(dados.get('turno') || ''); // Declara um dado ou referência utilizada nesta funcionalidade.
  if(!nome || !etapa || !turno) return; // Verifica uma condição antes de prosseguir.
  const mensagem = `Olá! Gostaria de informações sobre uma visita ao Colégio Aurora Prime.\nResponsável: ${nome}\nEtapa: ${etapa}\nTurno preferido: ${turno}\nAguardo confirmação.`; // Declara um dado ou referência utilizada nesta funcionalidade.
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`, '_blank', 'noopener,noreferrer'); // Abre a conversa do WhatsApp com mensagem codificada.
}); // Encerra o bloco ou a função anterior.
// Fontes e identificação das fotografias ilustrativas.
(() => { const s = document.createElement('script'); s.src = '../../assets/js/fotos-revisadas.js'; document.head.append(s); })();
