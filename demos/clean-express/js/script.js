// MOSS DIGITAL — Interações padrão da demo, comentadas em português.
// O arquivo é independente: funciona em hospedagem estática, sem banco de dados.
document.addEventListener('DOMContentLoaded', () => {
  // Localiza o botão do menu e a lista de navegação para uso em celulares.
  const menuButton = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  // Abre ou fecha o menu responsivo e informa seu estado para leitores de tela.
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open', !expanded);
    });

    // Fecha o menu após a escolha de uma seção no celular.
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });
  }

  // Procura uma foto em assets/img e mantém o marcador local se ainda não existir.
  document.querySelectorAll('img[data-photo]').forEach((img) => {
    const file = img.dataset.photo;
    if (!file) return;
    const image = new Image();
    image.onload = () => { img.src = file; };
    image.onerror = () => { /* O placeholder continua válido até inserir a fotografia real. */ };
    image.src = file;
  });

  // Todos os links de atendimento usam o WhatsApp autorizado para as demos.
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    const demo = document.body.dataset.demo || 'MOSS Digital';
    const message = link.dataset.message || `Olá! Vim pela demo ${demo} e quero mais informações.`;
    link.href = `https://wa.me/5511942038103?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  // Alterna visibilidade dos itens em páginas que possuem catálogo com filtros.
  const filters = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('[data-category]');
  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const selected = filter.dataset.filter;
      filters.forEach((other) => other.setAttribute('aria-pressed', String(other === filter)));
      items.forEach((item) => { item.hidden = selected !== 'todos' && item.dataset.category !== selected; });
    });
  });

  // Prepara a janela de detalhes, reutilizada pelos cards clicáveis.
  const dialog = document.getElementById('details-dialog');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogText = document.getElementById('dialog-text');
  const dialogPhoto = document.getElementById('dialog-photo');
  const dialogClose = document.getElementById('dialog-close');

  // Abre a descrição do item sem navegar para outra página.
  document.querySelectorAll('[data-detail]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!dialog || !dialogTitle || !dialogText || !dialogPhoto) return;
      dialogTitle.textContent = button.dataset.title || 'Detalhes';
      dialogText.textContent = button.dataset.description || 'Descrição demonstrativa.';

      // Reaproveita a imagem visível do card, inclusive quando ainda é placeholder.
      const cardImage = button.closest('article')?.querySelector('img');
      dialogPhoto.src = cardImage?.currentSrc || cardImage?.src || 'assets/img/placeholder.svg';
      dialogPhoto.alt = `Imagem de apoio: ${dialogTitle.textContent}`;
      dialog.showModal();
    });
  });

  // Fecha o detalhe ao clicar no botão ou na área fora da janela.
  if (dialog && dialogClose) {
    dialogClose.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
  }

  // Envia um texto pré-preenchido ao WhatsApp, sem registrar dados em servidor.
  const form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const values = new FormData(form);
      const lines = [`Olá! Vim pela demo ${document.body.dataset.demo || 'MOSS Digital'}.`];
      for (const [field, value] of values.entries()) {
        if (String(value).trim()) lines.push(`${field}: ${String(value).trim()}`);
      }
      const url = `https://wa.me/5511942038103?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // Calcula a estimativa ilustrativa somente nas demos que possuem simulador.
  const amount = document.querySelector('[data-amount]');
  const total = document.querySelector('[data-total]');
  if (amount && total) {
    const calculate = () => {
      const count = Math.max(0, Number(amount.value) || 0);
      const unitPrice = Number(amount.dataset.base) || 0;
      const formatted = (count * unitPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      total.textContent = formatted;
    };
    amount.addEventListener('input', calculate);
    calculate();
  }
});
