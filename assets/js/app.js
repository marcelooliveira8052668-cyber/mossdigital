/* ==========================================================================
   APP — Monta o site inteiro a partir do config.js
   ==========================================================================
   Você não precisa mexer neste arquivo para personalizar o site.
   Tudo o que aparece na tela é controlado por  assets/js/config.js
   ========================================================================== */

(function () {
  'use strict';

  const CFG = window.SITE_CONFIG;
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const THEME_KEY = 'site_theme';

  /* ======================================================================
     ÍCONES
     ====================================================================== */
  const ICONS = {
    code:    '<path d="m8 6-6 6 6 6M16 6l6 6-6 6"/>',
    cart:    '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6"/>',
    design:  '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/>',
    growth:  '<path d="M3 17l6-6 4 4 7-7"/><path d="M14 8h6v6"/>',
    support: '<path d="M12 22s8-4.5 8-10V5l-8-3-8 3v7c0 5.5 8 10 8 10z"/>',
    shield:  '<path d="M12 22s8-4.5 8-10V5l-8-3-8 3v7c0 5.5 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    phone:   '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    star:    '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3L7 14.2l-5-4.9 6.9-1z"/>',
    check:   '<path d="M20 6 9 17l-5-5"/>',
    clock:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    location:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    rocket:  '<path d="M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.9-.9.9-2.3 0-3.2a2.3 2.3 0 0 0-3 .2z"/><path d="M15 9a10 10 0 0 0-3-3c-3-1-6-1-8-1 0 2 0 5 1 8a10 10 0 0 0 3 3c2 1 4 1 4 1s0-3 1-5c.6-1.2 2-3 2-3z"/><circle cx="9" cy="9" r="1.5"/>',
    chart:   '<path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="7"/><rect x="12" y="7" width="3" height="11"/><rect x="17" y="13" width="3" height="5"/>',
    users:   '<path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
    heart:   '<path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
    burger:  '<path d="M3 11h18"/><path d="M4 7a4 3 0 0 1 4-3h8a4 3 0 0 1 4 3"/><path d="M5 15a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M3 11v2M21 11v2"/>',
    pizza:   '<path d="M12 2 3 20a2 2 0 0 0 1.8 3h14.4A2 2 0 0 0 21 20z"/><circle cx="9" cy="13" r="1.3"/><circle cx="14" cy="10" r="1.3"/><circle cx="15" cy="16" r="1.3"/>',
    coffee:  '<path d="M17 8h1a3 3 0 0 1 0 6h-1"/><path d="M3 8h14v7a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z"/><path d="M3 21h14"/>',

    /* --- Veículos e locação --- */
    car:     '<path d="M5 17h14M6.5 17v2M17.5 17v2"/><path d="M3 17v-4.2a2 2 0 0 1 .3-1L6 7.2A2 2 0 0 1 7.8 6.5h8.4A2 2 0 0 1 18 7.2l2.7 4.6a2 2 0 0 1 .3 1V17"/><path d="M4 12h16"/><circle cx="7.5" cy="14.5" r="1.2"/><circle cx="16.5" cy="14.5" r="1.2"/>',
    key:     '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.8 12.2 8.2-8.2M16 7l2.5 2.5M13.5 9.5 16 12"/>',
    fuel:    '<path d="M3 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16"/><path d="M2 21h12"/><path d="M13 9h3a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V9l-3-3"/><path d="M5 7h6"/>',
    gauge:   '<path d="M12 14l4-4"/><path d="M3.5 18a9 9 0 1 1 17 0"/><circle cx="12" cy="14" r="1.6"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    road:    '<path d="M4 21 7 3M20 21 17 3M12 4v3M12 11v3M12 18v3"/>',
    parking: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>',
    seat:    '<path d="M6 4h9a2 2 0 0 1 2 2v8H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M5 14v4a2 2 0 0 0 2 2h12"/>',
    route:   '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M15.5 5H9a3.5 3.5 0 0 0 0 7h6a3.5 3.5 0 0 1 0 7H8.5"/>',
    idcard:  '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8.5" cy="11" r="2.2"/><path d="M5 16.5c.6-1.5 1.9-2.3 3.5-2.3s2.9.8 3.5 2.3"/><path d="M15 10h4M15 13.5h4"/>',
    clock24: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    insurance:'<path d="M12 22s8-4.5 8-10V5l-8-3-8 3v7c0 5.5 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>'
  };

  function icon(name) {
    const path = ICONS[name] || ICONS.star;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
  }

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ======================================================================
     CORES E CONTRASTE
     ----------------------------------------------------------------------
     O cliente escolhe UMA cor principal. O site deriva automaticamente as
     outras variações para garantir texto legível (WCAG AA), em vez de
     obrigar o cliente a escolher 4 tons na mão.

     • primary-ink       → a cor como TEXTO sobre fundo claro
     • primary-ink-dark  → a cor como TEXTO sobre fundo escuro
     • primary-btn       → fundo de botão com texto branco por cima
     ====================================================================== */

  function hexToRgb(hex) {
    let h = String(hex).replace('#', '').trim();
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function rgbToHex(rgb) {
    return '#' + rgb.map(v =>
      Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')
    ).join('');
  }

  function luminance(rgb) {
    const a = rgb.map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }

  function contrast(rgb1, rgb2) {
    const l1 = luminance(rgb1), l2 = luminance(rgb2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  // Escurece (direction -1) ou clareia (+1) a cor até atingir o contraste mínimo
  function tune(hex, bgHex, minRatio, direction) {
    const bg = hexToRgb(bgHex);
    let rgb = hexToRgb(hex);

    // Se já passa, devolve como está
    if (contrast(rgb, bg) >= minRatio) return rgbToHex(rgb);

    const target = direction < 0 ? 0 : 255;
    for (let step = 0; step < 100; step++) {
      rgb = rgb.map(v => v + (target - v) * 0.06);
      if (contrast(rgb, bg) >= minRatio) break;
    }
    return rgbToHex(rgb);
  }

  /* ======================================================================
     1. TEMA — aplica as cores do config no CSS
     ====================================================================== */
  function applyTheme() {
    const t = CFG.theme;

    // Derivatives that keep text readable with any client color
    const inkLight = t.primaryInk || tune(t.primary, '#ffffff', 4.5, -1);
    const inkDark  = tune(t.primary, '#141210', 4.5, +1);
    const btn      = tune(t.primary, '#ffffff', 4.5, -1);
    const btnHover = tune(btn, '#ffffff', 6.2, -1);

    // Injected as a stylesheet (not inline) so the dark theme can still override.
    let tag = document.getElementById('site-theme-vars');
    if (!tag) {
      tag = document.createElement('style');
      tag.id = 'site-theme-vars';
      document.head.appendChild(tag);
    }

    tag.textContent = ':root{' +
      '--primary:'           + t.primary           + ';' +
      '--primary-dark:'      + t.primaryDark       + ';' +
      '--primary-ink:'       + inkLight            + ';' +
      '--primary-ink-dark:'  + inkDark             + ';' +
      '--primary-btn:'       + btn                 + ';' +
      '--primary-btn-hover:' + btnHover            + ';' +
      '--secondary:'         + t.secondary         + ';' +
      '--accent:'            + t.accent            + ';' +
      '--success:'           + t.success           + ';' +
      '--error:'             + t.error             + ';' +
      '--radius:'            + t.radius            + ';' +
      '--font-heading:'      + t.fontHeading       + ';' +
      '--font-body:'         + t.fontBody          + ';' +
    '}';
  }

  /* ======================================================================
     2. SEO — título, descrição, favicon
     ====================================================================== */
  function applySeo() {
    document.title = CFG.meta.title;

    // Cria/atualiza uma meta. O atributo identificador (name ou property)
    // também é definido — sem ele a tag não funciona (Open Graph, por exemplo).
    const setMeta = (key, value, attr) => {
      const a = attr || 'name';
      let el = document.querySelector('meta[' + a + '="' + key + '"]');
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(a, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value == null ? '' : value);
    };

    setMeta('description', CFG.meta.description);
    setMeta('author', CFG.brand.name);

    setMeta('og:title', CFG.meta.title, 'property');
    setMeta('og:description', CFG.meta.description, 'property');
    setMeta('og:image', CFG.meta.ogImage, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', CFG.brand.name, 'property');
    setMeta('og:locale', 'pt_BR', 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', CFG.meta.title);
    setMeta('twitter:description', CFG.meta.description);
    setMeta('twitter:image', CFG.meta.ogImage);

    const fav = $('link[rel="icon"]') || document.createElement('link');
    if (!fav.parentNode) document.head.appendChild(fav);
    fav.setAttribute('rel', 'icon');
    fav.setAttribute('href', CFG.brand.favicon);
  }

  /* ======================================================================
     3. CABEÇALHO E NAVEGAÇÃO
     ====================================================================== */
  function renderHeader() {
    $('.brand img').src = CFG.brand.logo;
    $('.brand img').alt = CFG.brand.name;
    $('.brand__name').innerHTML =
      esc(CFG.brand.name) + '<small>' + esc(CFG.brand.tagline) + '</small>';

    $('#nav').innerHTML = CFG.nav
      .map(item => '<li><a href="' + esc(item.href) + '">' + esc(item.label) + '</a></li>')
      .join('');
  }

  /* ======================================================================
     4. HERO
     ====================================================================== */
  function renderHero() {
    const h = CFG.hero;
    $('#heroTag').textContent = h.tag;
    $('#heroTitle').textContent = h.title;
    $('#heroSub').textContent = h.subtitle;

    const wa = CFG.contact.whatsapp;
    const first = $('#heroPrimary');
    first.textContent = h.primaryCta.label;
    first.href = h.primaryCta.href;

    const second = $('#heroSecondary');
    second.textContent = h.secondaryCta.label;
    second.href = h.secondaryCta.href;

    // Atalho de WhatsApp direto
    $('#heroWhats').href = 'https://wa.me/' + wa + '?text=' +
      encodeURIComponent('Olá! Quero fazer um pedido.');

    $('#heroImg').src = h.image;
    $('#heroImg').alt = h.title;
  }

  /* ======================================================================
     5. ESTATÍSTICAS
     ====================================================================== */
  function renderStats() {
    $('#statsGrid').innerHTML = CFG.stats.map(s =>
      '<div class="stat">' +
        '<div class="stat__value" data-target="' + esc(s.value) + '" data-decimal="' +
          (String(s.value).indexOf('.') > -1 ? '1' : '0') + '">0</div>' +
        '<div class="stat__label">' + esc(s.label) + (s.suffix || '') + '</div>' +
      '</div>'
    ).join('');
  }

  /* ======================================================================
     6. CARDS (Cardápio / Serviços)
     ====================================================================== */
  function renderCards(items) {
    $('#cardsGrid').innerHTML = items.map((item, i) =>
      '<article class="card" data-reveal>' +
        '<div class="card__icon">' + icon(item.icon) + '</div>' +
        '<h3>' + esc(item.title) + '</h3>' +
        '<p>' + esc(item.description) + '</p>' +
        (item.price ? '<span class="card__price">' + esc(item.price) + '</span>' : '') +
        '<span class="card__hint">Ver detalhes &rsaquo;</span>' +
      '</article>'
    ).join('');

    $$('#cardsGrid .card').forEach((el, i) => tornarClicavel(el, items[i]));
  }

  /* ======================================================================
     7. GALERIA / PORTFÓLIO
     ====================================================================== */
  function renderGallery(items) {
    // Monta a lista de categorias
    const cats = ['Todos'];
    items.forEach(it => {
      if (it.category && cats.indexOf(it.category) === -1) cats.push(it.category);
    });

    $('#filters').innerHTML = cats.map((c, i) =>
      '<button class="filter' + (i === 0 ? ' is-active' : '') + '" data-cat="' + esc(c) + '">' +
        esc(c) + '</button>'
    ).join('');

    $('#galleryGrid').innerHTML = items.map(it =>
      '<a class="tile" href="' + esc(it.url || '#') + '" data-cat="' + esc(it.category || '') +
        '" data-reveal>' +
        '<div class="tile__media">' +
          '<img src="' + esc(it.image) + '" alt="' + esc(it.title) + '" loading="lazy">' +
          (it.badge ? '<span class="tile__badge">' + esc(it.badge) + '</span>' : '') +
        '</div>' +
        '<div class="tile__body">' +
          (it.category ? '<span class="tile__cat">' + esc(it.category) + '</span>' : '') +
          '<h3>' + esc(it.title) + '</h3>' +
          '<p>' + esc(it.description) + '</p>' +
          '<span class="tile__hint">Ver ficha &rsaquo;</span>' +
        '</div>' +
      '</a>'
    ).join('');

    $$('#galleryGrid .tile').forEach((el, i) => tornarClicavel(el, items[i]));
    setupFilters();
  }

  function setupFilters() {
    $$('.filter').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.filter').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const cat = btn.dataset.cat;
        $$('.tile').forEach(tile => {
          const show = cat === 'Todos' || tile.dataset.cat === cat;
          tile.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* ======================================================================
     8. SOBRE
     ====================================================================== */
  function renderAbout() {
    const a = CFG.about;
    $('#aboutTag').textContent = a.tag;
    $('#aboutTitle').textContent = a.title;
    $('#aboutText').textContent = a.description;
    $('#aboutImg').src = a.image;
    $('#aboutImg').alt = a.title;

    $('#aboutStats').innerHTML = a.stats.map(s =>
      '<div><strong data-target="' + esc(s.value) + '" data-decimal="' +
        (String(s.value).indexOf('.') > -1 ? '1' : '0') + '">0</strong>' +
        '<span>' + esc(s.label) + (s.suffix || '') + '</span></div>'
    ).join('');

    const cta = $('#aboutCta');
    cta.textContent = a.cta.label;
    cta.href = a.cta.href;
  }

  /* ======================================================================
     9. CONTATO
     ====================================================================== */

  // Campos padrão usados quando o config não define nenhum
  const DEFAULT_FIELDS = [
    { type: 'text',  name: 'nome',      label: 'Nome',      placeholder: 'Seu nome',   required: true,  half: true },
    { type: 'email', name: 'email',     label: 'E-mail',    placeholder: 'seu@email.com', required: true, half: true },
    { type: 'textarea', name: 'mensagem', label: 'Mensagem', placeholder: 'Como podemos ajudar?', required: true }
  ];

  function renderFormFields() {
    const fields = (CFG.contact.formFields && CFG.contact.formFields.length)
      ? CFG.contact.formFields
      : DEFAULT_FIELDS;

    let html = '';
    let naLinha = 0; // quantos campos já estão na linha atual

    const fieldHtml = (f) => {
      const id   = 'f_' + f.name;
      const req  = f.required ? ' required' : '';
      const ph   = f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : '';

      let control;
      if (f.type === 'textarea') {
        control = '<textarea id="' + id + '" name="' + esc(f.name) + '" rows="4"' + ph + req + '></textarea>';
      } else if (f.type === 'select') {
        const opts = (f.options || []).map(o => {
          const val = typeof o === 'string' ? o : o.value;
          const lab = typeof o === 'string' ? o : o.label;
          return '<option value="' + esc(val) + '">' + esc(lab) + '</option>';
        }).join('');
        control = '<select id="' + id + '" name="' + esc(f.name) + '"' + req + '>' +
                  (f.placeholder ? '<option value="">' + esc(f.placeholder) + '</option>' : '') +
                  opts + '</select>';
      } else {
        const t = ['text', 'email', 'tel', 'number', 'date'].indexOf(f.type) > -1 ? f.type : 'text';
        const min = f.min ? ' min="' + esc(f.min) + '"' : '';
        const max = f.max ? ' max="' + esc(f.max) + '"' : '';
        control = '<input type="' + t + '" id="' + id + '" name="' + esc(f.name) + '"' + ph + min + max + req + '>';
      }

      return '<div class="field">' +
        '<label for="' + id + '">' + esc(f.label || f.name) + '</label>' +
        control +
        '<span class="field__error"></span>' +
      '</div>';
    };

    // Campos com half:true vão dois por linha
    fields.forEach((f) => {
      if (f.half) {
        if (naLinha === 0) html += '<div class="form__row">';
        html += fieldHtml(f);
        naLinha++;
        if (naLinha >= 2) { html += '</div>'; naLinha = 0; }
      } else {
        if (naLinha > 0) { html += '</div>'; naLinha = 0; }
        html += fieldHtml(f);
      }
    });

    if (naLinha > 0) html += '</div>';

    $('#formFields').innerHTML = html;
  }

  function renderContact() {
    const c = CFG.contact;
    const s = CFG.sections.contact;

    $('#contactTag').textContent = s.tag;
    $('#contactTitle').textContent = s.title;
    $('#contactSub').textContent = s.description;

    $('#infoPhone').textContent = c.phone;
    $('#infoEmail').textContent = c.email;
    $('#infoAddress').textContent = c.address;
    $('#infoHours').textContent = c.hours;

    $('#waTop').href = 'https://wa.me/' + c.whatsapp;
    $('#waForm').href = 'https://wa.me/' + c.whatsapp + '?text=' +
      encodeURIComponent('Olá! Vim pelo site.');

    const socials = $('#socials');
    socials.innerHTML = Object.keys(c.social)
      .filter(k => c.social[k])
      .map(k => '<a href="' + esc(c.social[k]) + '" target="_blank" rel="noopener" aria-label="' +
        esc(k) + '">' + socialIcon(k) + '</a>')
      .join('');

    $('#map').src = c.mapEmbed;

    // Formulário
    if (c.formTitle) $('#formTitle').textContent = c.formTitle;
    $('#fSubmit').innerHTML = '<span>' + esc(c.formSubmit || 'Enviar') + '</span>';
    $('#waForm').lastElementChild.textContent = c.formWhats || 'Ou chame no WhatsApp';
    renderFormFields();

    // Data mínima = hoje, para não escolher data passada
    const today = new Date().toISOString().slice(0, 10);
    $$('#formFields input[type="date"]').forEach(i => { i.min = today; });
  }

  function socialIcon(k) {
    const p = {
      instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
      facebook:  '<path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.5A.5.5 0 0 1 12.5 7H15z"/>',
      linkedin:  '<path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05a4.2 4.2 0 0 1 3.75-2c4 0 4.75 2.6 4.75 6V21h-4v-5.6c0-1.3-.02-3-1.85-3s-2.13 1.44-2.13 2.9V21H9z"/>',
      github:   '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19.9 5a4.9 4.9 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.6 0C6.9 1.1 5.8 1.4 5.8 1.4A4.9 4.9 0 0 0 5.7 5a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22"/>'
    }[k];
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (p || ICONS.star) + '</svg>';
  }

  /* ======================================================================
     10. RODAPÉ
     ====================================================================== */
  function renderFooter() {
    const f = CFG.footer;
    $('.footer__brand img').src = CFG.brand.logoDark;
    $('.footer__brand img').alt = CFG.brand.name;
    $('#footerDesc').textContent = f.description;
    $('#footerCredit').textContent = f.credit;

    $('#footerNav').innerHTML = CFG.nav
      .map(i => '<li><a href="' + esc(i.href) + '">' + esc(i.label) + '</a></li>').join('');

    const phone = $('#footerPhone');
    phone.textContent = CFG.contact.phone;
    phone.href = 'tel:' + CFG.contact.phone.replace(/\D/g, '');

    const mail = $('#footerEmail');
    mail.textContent = CFG.contact.email;
    mail.href = 'mailto:' + CFG.contact.email;
  }

  /* ======================================================================
     11. TÍTULOS DAS SEÇÕES
     ====================================================================== */
  function renderSectionTitles() {
    $('#cardapioTag').textContent = CFG.sections.services.tag;
    $('#cardapioTitle').textContent = CFG.sections.services.title;
    $('#cardapioDesc').textContent = CFG.sections.services.description;

    $('#galeriaTag').textContent = CFG.sections.portfolio.tag;
    $('#galeriaTitle').textContent = CFG.sections.portfolio.title;
    $('#galeriaDesc').textContent = CFG.sections.portfolio.description;
  }

  /* ======================================================================
     12. COMPORTAMENTOS
     ====================================================================== */

  // Tema claro / escuro
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === 'dark' : prefersDark;

    setTheme(dark);

    $('#themeToggle').addEventListener('click', () => {
      setTheme(!document.documentElement.hasAttribute('data-theme'));
    });
  }

  function setTheme(dark) {
    const html = document.documentElement;
    if (dark) html.setAttribute('data-theme', 'dark');
    else html.removeAttribute('data-theme');

    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');

    const btn = $('#themeToggle');
    btn.innerHTML = dark
      ? '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
      : '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    btn.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
  }

  // Menu mobile
  function initMobileNav() {
    const btn = $('#navToggle');
    const nav = $('#nav');

    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  // Sombra no header ao rolar
  function initHeaderShadow() {
    const header = $('.header');
    const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Marca o item do menu da seção visível
  function initScrollSpy() {
    const sections = $$('main section[id]');
    const links = $$('#nav a');

    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(s => spy.observe(s));
  }

  // Anima os números
  function initCounters() {
    const nums = $$('[data-target]');
    if (!nums.length) return;

    const run = (el) => {
      const target = parseFloat(el.dataset.target);
      const decimal = el.dataset.decimal === '1';
      const dur = 1600;
      const start = performance.now();

      const fmt = (v) => {
        if (decimal) return v.toFixed(1).replace('.', ',');
        return Math.round(v).toLocaleString('pt-BR');
      };

      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          run(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    nums.forEach(n => obs.observe(n));
  }

  // Revela elementos ao rolar
  function initReveal() {
    const items = $$('[data-reveal]');
    if (!items.length) return;

    // Escalona a animação dentro de cada grupo
    const groups = new Map();
    items.forEach(el => {
      const key = el.parentNode;
      const i = groups.get(key) || 0;
      el.style.setProperty('--delay', (i * 70) + 'ms');
      groups.set(key, i + 1);
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => obs.observe(el));
  }

  // Formulário — valida e envia os campos definidos no config
  function initForm() {
    const form = $('#leadForm');
    const msg  = $('#formMsg');

    const fail = (input, text) => {
      const field = input.closest('.field');
      if (!field) return;
      field.classList.add('has-error');
      const err = $('.field__error', field);
      if (err) err.textContent = text;
    };

    const clear = () => {
      $$('.field', form).forEach(f => f.classList.remove('has-error'));
    };

    const hojeISO = () => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return d.toISOString().slice(0, 10);
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clear();
      msg.className = 'form__msg';

      const inputs = $$('input, textarea, select', form);
      const btn    = $('#fSubmit');
      const data   = {};
      let ok = true;

      inputs.forEach(input => {
        const val = input.value.trim();
        const field = input.closest('.field');
        const label = field ? $('label', field) : null;
        const ehObrigatorio = input.hasAttribute('required');

        // 1. obrigatório
        if (ehObrigatorio && !val) {
          fail(input, 'Preencha este campo.');
          ok = false;
          return;
        }
        if (!val) return;

        // 2. e-mail
        if (input.type === 'email' &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) {
          fail(input, 'Informe um e-mail válido.');
          ok = false;
          return;
        }

        // 3. telefone (10 a 13 dígitos, com DDD)
        if (input.type === 'tel') {
          const d = val.replace(/\D/g, '');
          if (d.length < 10 || d.length > 13) {
            fail(input, 'Informe um telefone válido com DDD.');
            ok = false;
            return;
          }
          data[input.name] = d;
          return;
        }

        // 4. data não pode ser no passado
        if (input.type === 'date' && val < hojeISO()) {
          fail(input, 'Escolha uma data a partir de hoje.');
          ok = false;
          return;
        }

        // 5. devolução precisa ser depois da retirada
        if (input.name === 'devolucao') {
          const retirada = form.querySelector('[name="retirada"]');
          if (retirada && retirada.value && val < retirada.value) {
            fail(input, 'A devolução precisa ser depois da retirada.');
            ok = false;
            return;
          }
        }

        // 6. número com mínimo
        if (input.type === 'number' && input.min &&
            parseFloat(val) < parseFloat(input.min)) {
          fail(input, 'O mínimo é ' + input.min + '.');
          ok = false;
          return;
        }

        // 7. texto muito curto
        if ((input.tagName === 'TEXTAREA' || input.type === 'text') &&
            val.length < 3 && ehObrigatorio) {
          fail(input, 'Escreva um pouco mais.');
          ok = false;
          return;
        }

        data[input.name] = val;
      });

      if (!ok) {
        const primeiro = $('.field.has-error', form);
        if (primeiro) {
          primeiro.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const input = $('input, textarea, select', primeiro);
          if (input) input.focus({ preventScroll: true });
        }
        return;
      }

      const original = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Enviando...';

      data.pagina = location.pathname;

      // ---------- Sem banco de dados: manda o pedido pelo WhatsApp ----------
      // Se o cliente nao configurou API, o pedido vai para o WhatsApp dele
      // com a mensagem ja escrita. E o que funciona de verdade no dia a dia.
      const modo = CFG.contact.formMode ||
                   (CFG.dataSource.provider === 'local' ? 'whatsapp' : 'api');

      if (modo === 'whatsapp' && CFG.contact.whatsapp) {
        const numero = String(CFG.contact.whatsapp).replace(/\D/g, '');
        const titulo = CFG.contact.formWhatsTitle || 'Novo pedido pelo site';
        const rodape = CFG.contact.formWhatsFooter || '';

        const linhas = Object.keys(data)
          .filter(k => k !== 'pagina' && data[k])
          .map(k => {
            const campo = (CFG.contact.formFields || []).find(f => f.name === k);
            return '*' + (campo ? campo.label : k) + ':* ' + data[k];
          });

        const mensagem = '```' + titulo + '\n\n' + linhas.join('\n') +
                         (rodape ? '\n\n' + rodape : '') + '\n```';

        // Guarda uma copia local por garantia (se o WhatsApp nao abrir)
        try { window.DataLayer.sendLead(data); } catch (e) {}

        btn.disabled = false;
        btn.innerHTML = original;

        const link = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(mensagem);
        const janela = window.open(link, '_blank');
        if (!janela) location.href = link;

        msg.className = 'form__msg is-ok';
        msg.textContent = CFG.contact.formWhatsMsg ||
          'Abrimos o WhatsApp com seu pedido escrito. E so tocar em enviar!';
        form.reset();
        return;
      }

      // ---------- Com API configurada: envia para o banco ----------
      const result = await window.DataLayer.sendLead(data);

      btn.disabled = false;
      btn.innerHTML = original;

      msg.className = 'form__msg ' + (result.ok ? 'is-ok' : 'is-error');
      msg.textContent = result.ok
        ? (result.persisted === false
            ? 'Recebemos sua solicitação! (salva localmente — banco indisponível no momento)'
            : (CFG.contact.formSuccess || 'Recebemos sua solicitação! Responderemos em breve.'))
        : 'Não foi possível enviar agora. Tente o WhatsApp.';

      if (result.ok) form.reset();
    });

    $$('input, textarea, select', form).forEach(el => {
      const limpar = () => {
        const f = el.closest('.field');
        if (f) f.classList.remove('has-error');
      };
      el.addEventListener('input', limpar);
      el.addEventListener('change', limpar);
    });
  }

  /* ======================================================================
     13. MODAL — ficha completa do produto/serviço
     ----------------------------------------------------------------------
     Clique no card (ou tecle Enter) e abre a ficha com:
     fotos extras, descrição longa, características e botão de ação.

     Campos opcionais no config, por item:
       text      → descrição mais longa
       gallery   → [foto1, foto2, ...]  (usa a principal se ausente)
       features  → ['item 1', ...] ou [{ label: 'Duração', value: '60 min' }]
       badge     → etiqueta no topo (ex: "Mais pedido")
       cta       → { label: 'Reservar', href: '#contato' }
     ====================================================================== */

  let modal = null;
  let modalFotos = [];
  let modalIndice = 0;
  let ultimoFoco = null;

  function buildModal() {
    if (modal) return;

    modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'detailModal';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modalTitle');

    modal.innerHTML =
      '<div class="modal__backdrop" data-close></div>' +
      '<div class="modal__box">' +
        '<button class="modal__close" data-close aria-label="Fechar ficha">&times;</button>' +

        '<div class="modal__media">' +
          '<div class="modal__stage">' +
            '<img class="modal__main" src="" alt="">' +
            '<button class="modal__nav modal__nav--prev" aria-label="Foto anterior">&#8249;</button>' +
            '<button class="modal__nav modal__nav--next" aria-label="Próxima foto">&#8250;</button>' +
            '<span class="modal__counter"></span>' +
          '</div>' +
          '<div class="modal__thumbs"></div>' +
        '</div>' +

        '<div class="modal__body">' +
          '<span class="modal__badge"></span>' +
          '<span class="modal__cat"></span>' +
          '<h3 class="modal__title" id="modalTitle"></h3>' +
          '<div class="modal__price"></div>' +
          '<p class="modal__text"></p>' +
          '<ul class="modal__features"></ul>' +
          '<div class="modal__actions"></div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(modal);

    // Fechar
    modal.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) fecharModal();
    });

    // Navegação de fotos
    $('.modal__nav--prev', modal).addEventListener('click', () => moverFoto(-1));
    $('.modal__nav--next', modal).addEventListener('click', () => moverFoto(1));

    // Clique nas miniaturas
    modal.addEventListener('click', (e) => {
      const thumb = e.target.closest('.modal__thumb');
      if (thumb) irParaFoto(Number(thumb.dataset.i));
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
      if (modal.hidden) return;
      if (e.key === 'Escape') { fecharModal(); return; }
      if (e.key === 'ArrowLeft') { moverFoto(-1); return; }
      if (e.key === 'ArrowRight') { moverFoto(1); return; }
      if (e.key === 'Tab') prenderFoco(e);
    });
  }

  // Mantém o foco dentro do modal enquanto ele estiver aberto
  function prenderFoco(e) {
    const focaveis = $$('a[href], button:not([disabled]), input, select, textarea', modal)
      .filter(el => el.offsetParent !== null);
    if (!focaveis.length) return;

    const primeiro = focaveis[0];
    const ultimo  = focaveis[focaveis.length - 1];

    if (e.shiftKey && document.activeElement === primeiro) {
      e.preventDefault(); ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault(); primeiro.focus();
    }
  }

  function abrirModal(item) {
    buildModal();

    // Normaliza os dados do item
    const fotos = (item.gallery && item.gallery.length)
      ? item.gallery
      : (item.image ? [item.image] : []);

    modalFotos = fotos;
    modalIndice = 0;

    $('.modal__badge', modal).textContent = item.badge || '';
    $('.modal__cat', modal).textContent   = item.category || '';
    $('.modal__title', modal).textContent = item.title || '';
    $('.modal__price', modal).textContent = item.price || '';
    $('.modal__text', modal).textContent   = item.text || item.description || '';

    // Características
    const feats = (item.features || []).map(f => {
      if (typeof f === 'string') return '<li class="modal__feature">' + esc(f) + '</li>';
      return '<li class="modal__feature"><b>' + esc(f.label) + ':</b> <span>' +
             esc(f.value) + '</span></li>';
    }).join('');
    $('.modal__features', modal).innerHTML = feats;

    // Botões
    const cta = item.cta || { label: 'Quero este', href: '#contato' };
    const wa  = CFG.contact.whatsapp;
    const msg = encodeURIComponent('Olá! Tenho interesse em: ' + (item.title || ''));

    $('.modal__actions', modal).innerHTML =
      '<a class="btn btn--primary btn--block" data-close href="' + esc(cta.href) + '">' +
        esc(cta.label) + '</a>' +
      '<a class="btn btn--wa btn--block" target="_blank" rel="noopener" ' +
        'href="https://wa.me/' + wa + '?text=' + msg + '">Falar no WhatsApp</a>';

    // Miniaturas
    const temVarias = modalFotos.length > 1;
    $('.modal__thumbs', modal).innerHTML = temVarias
      ? modalFotos.map((f, i) =>
          '<button class="modal__thumb" data-i="' + i + '" aria-label="Foto ' + (i + 1) + '">' +
          '<img src="' + esc(f) + '" alt=""></button>'
        ).join('')
      : '';
    $('.modal__nav--prev', modal).style.display = temVarias ? '' : 'none';
    $('.modal__nav--next', modal).style.display = temVarias ? '' : 'none';

    irParaFoto(0);

    ultimoFoco = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    $('.modal__close', modal).focus();
  }

  function fecharModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (ultimoFoco) ultimoFoco.focus();
  }

  function irParaFoto(i) {
    if (!modalFotos.length) return;
    modalIndice = (i + modalFotos.length) % modalFotos.length;

    $('.modal__main', modal).src = modalFotos[modalIndice];
    $('.modal__main', modal).alt = ($('.modal__title', modal).textContent || '') +
      ' — foto ' + (modalIndice + 1);

    const counter = $('.modal__counter', modal);
    counter.textContent = modalFotos.length > 1
      ? (modalIndice + 1) + ' / ' + modalFotos.length
      : '';

    $$('.modal__thumb', modal).forEach((t, n) =>
      t.classList.toggle('is-active', n === modalIndice)
    );
  }

  function moverFoto(passo) {
    if (modalFotos.length < 2) return;
    irParaFoto(modalIndice + passo);
  }

  // Deixa qualquer elemento clicável abrir a ficha
  function tornarClicavel(el, item) {
    el.classList.add(el.classList.contains('tile') ? 'tile--clickable' : 'card--clickable');
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', 'Ver ficha completa de ' + (item.title || 'item'));

    el.addEventListener('click', (e) => {
      // links de verdade continuam indo para o destino
      if (el.tagName === 'A' && !el.classList.contains('card')) {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        if (!/^#/.test(el.getAttribute('href') || '')) return;
        if (e.target.closest('.modal__actions')) return;
      }
      e.preventDefault();
      abrirModal(item);
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrirModal(item);
      }
    });
  }

  /* ======================================================================
     14. INICIALIZAÇÃO
     ====================================================================== */
  async function init() {
    applyTheme();
    applySeo();

    renderHeader();
    renderHero();
    renderStats();
    renderAbout();
    renderContact();
    renderFooter();
    renderSectionTitles();

    // Cards e galeria: tenta o banco, cai para o config.js
    let cards    = CFG.services;
    let gallery  = CFG.portfolio;

    try {
      const [dbCards, dbGallery] = await Promise.all([
        window.DataLayer.get('services'),
        window.DataLayer.get('portfolio')
      ]);
      if (Array.isArray(dbCards)   && dbCards.length)   cards   = dbCards;
      if (Array.isArray(dbGallery) && dbGallery.length) gallery = dbGallery;
    } catch (e) {
      console.warn('Banco indisponível, usando config.js.', e);
    }

    renderCards(cards);
    renderGallery(gallery);

    // Comportamentos
    initTheme();
    initMobileNav();
    initHeaderShadow();
    initScrollSpy();
    initCounters();
    initReveal();
    initForm();

    console.log('%cSite pronto!', 'color:#e8590c;font-weight:700',
      'Banco configurado:', window.DataLayer.provider());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();