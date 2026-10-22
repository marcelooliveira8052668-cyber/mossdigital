/* ==========================================================================
   PORTFÓLIO — Prof. Marcelo Oliveira
   Script leve: preenche os exemplos, liga o WhatsApp e anima na rolagem.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     SEUS DADOS — mexa aqui quando quiser trocar
     ------------------------------------------------------------------ */
  const EU = {
    nome: 'Prof. Marcelo Oliveira',
    whats: '5511942038103',   // com DDD, só números
    whatsTexto: '(11) 94203-8103',
    cidade: 'São Paulo — SP',
    preco: 'R$ 400',
    prazo: '7 a 15 dias'
  };

  /* ------------------------------------------------------------------
     EXEMPLOS — cada um aponta para um preset do template
     ------------------------------------------------------------------ */
  const EXEMPLOS = [
    { id: 'lanchonete',  emoji: '🍔', foto: 'assets/img/fotos/heroi-lanchonete.jpg', nome: 'Lanchonete',         desc: 'Cardápio com preço e pedido pelo WhatsApp' },
    { id: 'pizzaria',    emoji: '🍕', foto: 'assets/img/fotos/heroi-pizzaria.jpg', nome: 'Pizzaria',           desc: 'Forno a lenha, cardápio e reserva de mesa' },
    { id: 'padaria',     emoji: '🥐', foto: 'assets/img/fotos/heroi-padaria.jpg', nome: 'Padaria e café',     desc: 'Cardápio da manhã e encomenda para negócio' },
    { id: 'clinica',     emoji: '🦷', foto: 'assets/img/fotos/heroi-clinica.jpg', nome: 'Clínica',            desc: 'Tratamentos, avaliação e agenda online' },
    { id: 'estetica',    emoji: '💫', foto: 'assets/img/fotos/heroi-estetica.jpg', nome: 'Clínica estética',  desc: 'Ficha completa de cada tratamento' },
    { id: 'fisioterapia', emoji: '🦵', foto: 'assets/img/fotos/heroi-fisioterapia.jpg', nome: 'Fisioterapia',       desc: 'Convênios, avaliação grátis e agenda' },
    { id: 'academia',    emoji: '🏋️', foto: 'assets/img/fotos/heroi-academia.jpg', nome: 'Academia',          desc: 'Aulas, planos e avaliação física' },
    { id: 'salao',       emoji: '💇', foto: 'assets/img/fotos/heroi-salao.jpg', nome: 'Salão de beleza',    desc: 'Agenda online, sem fila de espera' },
    { id: 'barbearia',   emoji: '💈', foto: 'assets/img/fotos/heroi-barbearia.jpg', nome: 'Barbearia',          desc: 'Barba, corte e terapia quente' },
    { id: 'petshop',     emoji: '🐾', foto: 'assets/img/fotos/heroi-petshop.jpg', nome: 'Pet shop',          desc: 'Serviços, preços e agendamento' },
    { id: 'locadora',    emoji: '🚗', foto: 'assets/img/fotos/heroi-locadora.jpg', nome: 'Locadora',          desc: 'Frota com diária e reserva de datas' },
    { id: 'imobiliaria', emoji: '🏠', foto: 'assets/img/fotos/heroi-imobiliaria.jpg', nome: 'Imobiliária',        desc: 'Imóveis à venda e avaliação gratuita' },
    { id: 'advocacia',   emoji: '⚖️', foto: 'assets/img/fotos/heroi-advocacia.jpg', nome: 'Advocacia',         desc: 'Áreas de atuação e casos do escritório' },
    { id: 'escola',      emoji: '🎓', foto: 'assets/img/fotos/heroi-escola.jpg', nome: 'Escola e cursos',    desc: 'Cursos, turmas e matrícula online' },
    { id: 'hotel',       emoji: '🏨', foto: 'assets/img/fotos/heroi-hotel.jpg', nome: 'Hotel e pousada',    desc: 'Quartos, diária e reserva direta' },
    { id: 'oficina',     emoji: '🔧', foto: 'assets/img/fotos/heroi-oficina.jpg', nome: 'Oficina',           desc: 'Serviços e orçamento no mesmo dia' },
    { id: 'fotografo',   emoji: '📷', foto: 'assets/img/fotos/heroi-fotografo.jpg', nome: 'Fotógrafo',         desc: 'Portfólio e orçamento de ensaio' },
    { id: 'servicos',    emoji: '🛠️', foto: 'assets/img/fotos/heroi-servicos.jpg', nome: 'Prestação de serviço', desc: 'Orçamento na hora e atendimento' },
    { id: 'dentista',     emoji: '🦷', foto: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80', nome: 'Dentista',               desc: 'Tratamentos, avaliação e agenda online' },
    { id: 'veterinario',  emoji: '🐾', foto: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80', nome: 'Clínica veterinária',    desc: 'Consultas, vacinas e emergência 24h' },
    { id: 'psicologo',    emoji: '🧠', foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80', nome: 'Psicólogo',              desc: 'Terapia individual, casal e online' },
    { id: 'nutricionista', emoji: '🥗', foto: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80', nome: 'Nutricionista',          desc: 'Planos alimentares personalizados' },
    { id: 'arquiteto',    emoji: '📐', foto: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', nome: 'Arquiteto',              desc: 'Projetos residenciais e comerciais' },
    { id: 'livraria',   emoji: '📚', foto: 'assets/img/fotos/heroi-livraria.jpg', nome: 'M.O Livraria',       desc: 'Livraria online com catálogo, carrinho, checkout e WhatsApp', link: 'livraria-mo/index.html' },
    { id: 'educaenem',  emoji: '🎓', foto: 'assets/img/fotos/heroi-educaenem.jpg', nome: 'EducaEnem',          desc: 'Curso online do ENEM: aulas, PDFs, simulados e área do aluno', link: 'educaenem/index.html' },
    { id: 'conhecimento', emoji: '📘', foto: 'assets/img/fotos/heroi-codigo.jpg', nome: 'Código & Conhecimento', desc: 'Livro didático de programação web, do HTML ao React', link: 'codigo-conhecimento/index.html' },
    { id: 'nfcontrol', emoji: '📦', foto: 'assets/img/fotos/heroi-nfcontrol.jpg', nome: 'NF Control', desc: 'Sistema de notas fiscais, estoque, financeiro e auditoria', link: 'nf-control/index.html' },
    { id: 'gerador', emoji: '🛠️', foto: 'assets/img/fotos/heroi-gerador.jpg', nome: 'Gerador de Portfólio', desc: 'Ferramenta que monta o site do cliente em 20 minutos, sem código', link: 'gerador-portfolio/index.html' },
    { id: 'tutor', emoji: '🎧', foto: 'assets/img/fotos/heroi-tutor.jpg', nome: 'Lina — Tutor de Inglês', desc: 'App de inglês com IA: voz, cenários, correção de erros e XP', link: 'tutor-ia/index.html' },
    { id: 'skillmatch', emoji: '🔍', foto: 'assets/img/fotos/heroi-skillmatch.jpg', nome: 'SkillMatch', desc: 'Cruza suas habilidades com cada vaga e monta um plano de estudo', link: 'skillmatch/index.html' }
  ];

  /* ------------------------------------------------------------------
     Monta os cards de exemplo
     ------------------------------------------------------------------ */
  const grade = document.getElementById('grade-exemplos');

  // impede que texto do cliente quebre o HTML
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  if (grade) {
    grade.innerHTML = EXEMPLOS.map(function (e) {
      var foto = e.foto
        ? '<img src="' + e.foto + '" alt="Exemplo de site para ' + esc(e.nome) + '" loading="lazy">'
        : '<span class="ex__emoji">' + e.emoji + '</span>';
      var href = esc(e.link || ('demo.html?preset=' + encodeURIComponent(e.id)));

      return '<a class="ex" href="' + href + '">'
        + '<div class="ex__topo">' + foto + '</div>'
        + '<div class="ex__body">'
        + '<h3>' + esc(e.nome) + '</h3>'
        + '<p>' + esc(e.desc) + '</p>'
        + '<span class="ex__ver">Ver o site &rsaquo;</span>'
        + '</div>'
        + '</a>';
    }).join('');
  }

  /* ------------------------------------------------------------------
     Liga os botões de WhatsApp
     ------------------------------------------------------------------ */
  const wa = 'https://wa.me/' + EU.whats;
  const msg = encodeURIComponent('Olá, Prof. Marcelo! Vi seu trabalho e quero um site para o meu negócio.');

  ['waTop', 'waHero', 'waPreco', 'waFinal', 'rodWa'].forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = id === 'rodWa' ? wa : wa + '?text=' + msg;
    el.target = '_blank';
    el.rel = 'noopener';
  });

  // Assinatura no rodapé
  const quem = document.querySelector('.rod__marca p');
  if (quem) quem.textContent = 'Sites profissionais para qualquer tipo de negócio. ' + EU.cidade + '.';

  /* ------------------------------------------------------------------
     Menu do celular
     ------------------------------------------------------------------ */
  const nav  = document.getElementById('nav');
  const hamb = document.getElementById('hamb');

  if (hamb && nav) {
    hamb.addEventListener('click', function () {
      const aberto = nav.classList.toggle('aberto');
      hamb.setAttribute('aria-expanded', String(aberto));
      hamb.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('aberto');
        hamb.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------
     Sombra do cabeçalho ao rolar
     ------------------------------------------------------------------ */
  const cab = document.getElementById('cab');
  const marcar = () => cab.classList.toggle('rolou', window.scrollY > 8);
  window.addEventListener('scroll', marcar, { passive: true });
  marcar();

  /* ------------------------------------------------------------------
     Animação de entrada na rolagem
     ------------------------------------------------------------------ */
  const alvos = document.querySelectorAll(
    '.ben, .passo, .ex, .faq__i, .sec__cab'
  );

  // Escalona dentro de cada grupo
  const grupos = new Map();
  alvos.forEach(function (el) {
    const chave = el.parentNode;
    const i = grupos.get(chave) || 0;
    el.setAttribute('data-aparece', '');
    el.style.setProperty('--atraso', (i * 70) + 'ms');
    grupos.set(chave, i + 1);
  });

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visivel');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    alvos.forEach(function (el) { obs.observe(el); });
  } else {
    alvos.forEach(function (el) { el.classList.add('visivel'); });
  }

  /* ------------------------------------------------------------------
     Ano automático no rodapé
     ------------------------------------------------------------------ */
  const base = document.querySelector('.rod__base span');
  if (base) base.textContent = '© ' + new Date().getFullYear() + ' ' + EU.nome + '. Todos os direitos reservados.';
})();
