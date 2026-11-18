/* MOSS Digital — motor de temas comemorativos.
   Funciona em GitHub Pages, sem banco de dados e sem alterar outras demos.
   O modo dia/noite continua sendo controlado por moss-tema.js. */
(() => {
  'use strict';

  const raiz = document.documentElement;
  const heroTitulo = document.getElementById('hero-title');
  const heroTexto = document.querySelector('.vitrine-lead');
  const heroChamada = document.querySelector('.vitrine-eyebrow');
  const vitrine = document.querySelector('.vitrine');
  const grade = document.querySelector('.vitrine-grid');
  const ticker = [...document.querySelectorAll('.ticker-inner span')];
  const botaoWhatsApp = document.querySelector('.vitrine-link');
  const botaoSites = document.querySelector('.vitrine-cta');

  // Falta algum elemento? Não mexemos em páginas de demonstrações.
  if (!heroTitulo || !heroTexto || !heroChamada || !vitrine || !grade || !botaoWhatsApp || !botaoSites) return;

  // Guardar o texto ORIGINAL para restaurá-lo sem modificar o código antigo.
  const original = {
    titulo: heroTitulo.innerHTML,
    texto: heroTexto.innerHTML,
    chamada: heroChamada.textContent,
    ticker: ticker.map(elemento => elemento.textContent),
    contatoHref: botaoWhatsApp.getAttribute('href'),
    contatoTexto: botaoWhatsApp.textContent,
    contatoTarget: botaoWhatsApp.getAttribute('target'),
    contatoRel: botaoWhatsApp.getAttribute('rel'),
    sitesHTML: botaoSites.innerHTML
  };

  // Conteúdos das campanhas. Não prometemos descontos não aprovados.
  const temas = {
    natal: {
      chamada: '🎄 Especial de Natal MOSS Digital',
      titulo: 'Seu site pronto para <em>vender neste Natal!</em>',
      texto: 'Criamos sites profissionais para sua empresa mostrar seus produtos e conquistar clientes.',
      faixa: 'Natal é tempo de novas oportunidades',
      faixaTexto: 'Seu negócio merece um site bonito, fácil de usar e pronto para receber clientes.',
      selo: '🎁 O melhor presente é crescer!',
      fita: 'SITES PROFISSIONAIS ✦ NATAL MOSS DIGITAL ✦ FALE CONOSCO ✦ ',
      mensagem: 'Olá! Quero conhecer os sites da MOSS Digital neste Natal.'
    },
    'ano-novo': {
      chamada: '🎆 MOSS Digital • Bem-vindo, Ano Novo',
      titulo: 'Comece <em>{ano}</em> com seu site pronto para vender.',
      texto: 'Comece o ano mostrando sua empresa para novos clientes com um site profissional.',
      faixa: 'Ano Novo, novas oportunidades',
      faixaTexto: 'Comece o ano com um site bonito e feito para sua empresa.',
      selo: '✨ Novos planos, novas conquistas!',
      fita: 'SITES PROFISSIONAIS ✦ ANO NOVO ✦ MOSS DIGITAL ✦ ',
      mensagem: 'Olá! Quero começar o ano com um site da MOSS Digital.'
    },
    carnaval: {
      chamada: '🎭 Carnaval MOSS Digital',
      titulo: 'Prepare seu negócio para o <em>Carnaval!</em>',
      texto: 'Tenha um site profissional para sua empresa chamar atenção no Carnaval e o ano inteiro.',
      faixa: 'Carnaval de oportunidades',
      faixaTexto: 'Mostre seus produtos e serviços com um site feito para o seu negócio.',
      selo: '🎉 Seu negócio merece destaque!',
      fita: 'CARNAVAL ✦ SITES PROFISSIONAIS ✦ MOSS DIGITAL ✦ ',
      mensagem: 'Olá! Quero conhecer os sites da MOSS Digital para meu negócio.'
    }
  };

  // Verificar a data da cidade de São Paulo, mesmo quando visitantes estão viajando.
  function dataDeSaoPaulo() {
    const partes = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo', year: 'numeric',
      month: '2-digit', day: '2-digit'
    }).formatToParts(new Date());
    const valor = nome => Number(partes.find(p => p.type === nome).value);
    return { ano: valor('year'), mes: valor('month'), dia: valor('day') };
  }

  // Calcular a Páscoa para que o Carnaval possa mudar de data a cada ano.
  function tercaDeCarnaval(ano) {
    const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100;
    const d = Math.floor(b / 4), e = b % 4;
    const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k + 7 * 1000) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mes = Math.floor((h + l - 7 * m + 114) / 31);
    const dia = ((h + l - 7 * m + 114) % 31) + 1;
    const pascoa = new Date(Date.UTC(ano, mes - 1, dia));
    pascoa.setUTCDate(pascoa.getUTCDate() - 47);
    return pascoa;
  }

  // Temporadas: Natal (1 a 26/12), Ano Novo (27/12 a 6/1)
  // e Carnaval (oito dias antes da terça-feira até o dia seguinte).
  function escolherAutomaticamente() {
    const { ano, mes, dia } = dataDeSaoPaulo();
    if (mes === 12 && dia >= 1 && dia <= 26) return 'natal';
    if ((mes === 12 && dia >= 27) || (mes === 1 && dia <= 6)) return 'ano-novo';

    const hoje = Date.UTC(ano, mes - 1, dia);
    const diferenca = (hoje - tercaDeCarnaval(ano).getTime()) / 86400000;
    if (diferenca >= -8 && diferenca <= 1) return 'carnaval';
    return 'original';
  }

  // Selo e banner ficam ocultos no tema original, mantendo tudo como estava.
  const selo = document.createElement('div');
  selo.className = 'moss-estacoes-selo';
  selo.setAttribute('aria-hidden', 'true');
  grade.appendChild(selo);

  const faixa = document.createElement('aside');
  faixa.className = 'moss-estacoes-faixa';
  faixa.setAttribute('aria-label', 'Campanha comemorativa da MOSS Digital');
  faixa.innerHTML = '<div><h2></h2><p></p></div><a target="_blank" rel="noopener noreferrer">Falar no WhatsApp ↗</a>';
  vitrine.insertAdjacentElement('afterend', faixa);

  const emPrevia = new URLSearchParams(location.search).get('moss-temas') === 'teste';
  let modoEscolhido = 'automatico';
  if (emPrevia) {
    try { modoEscolhido = sessionStorage.getItem('moss:estacao-preview') || 'automatico'; }
    catch (_) { /* Navegador sem armazenamento: a prévia ainda funciona. */ }
  }

  function aplicarTema(escolha) {
    const { ano, mes } = dataDeSaoPaulo();
    const anoNovo = mes >= 7 ? ano + 1 : ano;
    const nome = escolha === 'automatico' ? escolherAutomaticamente() : escolha;
    const tema = temas[nome];

    // Alteramos só um atributo; o CSS usa esse atributo para vestir a página.
    raiz.dataset.estacao = tema ? nome : 'original';

    if (!tema) {
      heroTitulo.innerHTML = original.titulo;
      heroTexto.innerHTML = original.texto;
      heroChamada.textContent = original.chamada;
      ticker.forEach((elemento, indice) => elemento.textContent = original.ticker[indice]);
      selo.textContent = '';
      faixa.hidden = true;
      // Ao voltar ao visual original, restauramos os botões exatamente como eram.
      botaoWhatsApp.setAttribute('href', original.contatoHref);
      botaoWhatsApp.textContent = original.contatoTexto;
      // Evitar abrir nova guia quando o tema voltar ao original.
      if (original.contatoTarget) botaoWhatsApp.setAttribute('target', original.contatoTarget);
      else botaoWhatsApp.removeAttribute('target');
      if (original.contatoRel) botaoWhatsApp.setAttribute('rel', original.contatoRel);
      else botaoWhatsApp.removeAttribute('rel');
      botaoSites.innerHTML = original.sitesHTML;
    } else {
      heroTitulo.innerHTML = tema.titulo.replace('{ano}', String(anoNovo));
      heroTexto.textContent = tema.texto;
      heroChamada.textContent = tema.chamada;
      ticker.forEach(elemento => elemento.textContent = tema.fita);
      selo.textContent = tema.selo;
      faixa.querySelector('h2').textContent = tema.faixa;
      faixa.querySelector('p').textContent = tema.faixaTexto;
      faixa.querySelector('a').href =
        'https://wa.me/5511942038103?text=' + encodeURIComponent(tema.mensagem);
      faixa.hidden = false;
      // Na festa, o contato da vitrine leva ao WhatsApp; o catálogo segue intacto.
      botaoWhatsApp.href = 'https://wa.me/5511942038103?text=' + encodeURIComponent(tema.mensagem);
      botaoWhatsApp.textContent = '☏ Falar no WhatsApp';
      botaoWhatsApp.setAttribute('target', '_blank');
      botaoWhatsApp.setAttribute('rel', 'noopener noreferrer');
      botaoSites.innerHTML = 'Ver sites <span aria-hidden="true">↗</span>';
      faixa.querySelector('a').textContent = 'Quero meu site ↗';
    }

    // Estado acessível dos botões da prévia; não altera os outros visitantes.
    document.querySelectorAll('[data-estacao-prever]').forEach(botao => {
      botao.setAttribute('aria-pressed', String(botao.dataset.estacaoPrever === escolha));
    });
    const estado = document.getElementById('moss-estacoes-estado');
    if (estado) estado.textContent = 'Tema na tela: ' +
      ({ original: 'Original', natal: 'Natal', 'ano-novo': 'Ano Novo',
         carnaval: 'Carnaval', automatico: 'Pela data' }[nome] || 'Original');
  }

  // O painel só existe em ?moss-temas=teste; por padrão, o público vê a data automática.
  if (emPrevia) {
    const painel = document.createElement('aside');
    painel.className = 'moss-estacoes-painel';
    painel.setAttribute('aria-label', 'Painel de prévia de temas');
    painel.innerHTML = '<h2>🎨 Temas da MOSS</h2>' +
      '<p>Este teste só muda a aparência no seu navegador.</p>' +
      '<div class="moss-estacoes-botoes"></div>' +
      '<p id="moss-estacoes-estado" role="status"></p>' +
      '<a class="moss-estacoes-fechar" href="/">Sair da prévia</a>';
    document.body.appendChild(painel);

    const opcoes = [
      ['automatico', '📅 Pela data'], ['original', '💚 Original'],
      ['natal', '🎄 Natal'], ['ano-novo', '🎆 Ano Novo'], ['carnaval', '🎭 Carnaval']
    ];
    const botoes = painel.querySelector('.moss-estacoes-botoes');
    opcoes.forEach(([id, texto]) => {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.dataset.estacaoPrever = id;
      botao.textContent = texto;
      botao.addEventListener('click', () => {
        modoEscolhido = id;
        try { sessionStorage.setItem('moss:estacao-preview', id); } catch (_) {}
        aplicarTema(modoEscolhido);
      });
      botoes.appendChild(botao);
    });
  }

  // Primeiro carregamento: o site volta automaticamente ao original fora das festas.
  aplicarTema(modoEscolhido);
})();
