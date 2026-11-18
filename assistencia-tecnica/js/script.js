/* ============================================================
   NextTech - script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 20);
    if (backToTop) backToTop.classList.toggle('visible', y > 500);
    highlightNav();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Active nav link ---------- */
  function highlightNav() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 150) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let countersDone = false;

  const runCounters = () => {
    if (countersDone || reduceMotion) return;
    countersDone = true;
    counters.forEach(counter => {
      const target = Number(counter.getAttribute('data-count'));
      const duration = 1800;
      const start = performance.now();
      counter.textContent = '0';

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target).toLocaleString('pt-BR');
        if (progress < 1) requestAnimationFrame(tick);
        else counter.textContent = target.toLocaleString('pt-BR');
      };
      requestAnimationFrame(tick);
    });
  };

  const statsSection = document.querySelector('.stats');
  if (statsSection && 'IntersectionObserver' in window && !reduceMotion) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        runCounters();
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    statsObserver.observe(statsSection);
  } else {
    runCounters();
  }

  /* ---------- Phone mask ---------- */
  const phoneInput = document.getElementById('telefone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length <= 10) {
        v = v.replace(/^(\d{2})(\d)/, '($1) $2');
        v = v.replace(/(\d{4})(\d)/, '$1-$2');
      } else {
        v = v.replace(/^(\d{2})(\d)/, '($1) $2');
        v = v.replace(/(\d{5})(\d)/, '$1-$2');
      }
      e.target.value = v;
    });
  }

  /* ---------- Form validation ---------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
      fields.forEach(field => {
        const group = field.closest('.form-group');
        const error = group ? group.querySelector('.error-msg') : null;
        let message = '';

        if (!field.value.trim()) {
          message = 'Este campo é obrigatório.';
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          message = 'Informe um e-mail válido.';
        } else if (field.id === 'telefone' && field.value.replace(/\D/g, '').length < 10) {
          message = 'Informe um telefone válido.';
        }

        if (group) group.classList.toggle('invalid', !!message);
        if (error) error.textContent = message;
        if (message) valid = false;
      });

      if (!valid) {
        const firstInvalid = form.querySelector('.form-group.invalid input, .form-group.invalid select, .form-group.invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      formSuccess.classList.add('active');
      form.reset();
    });

    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        const group = field.closest('.form-group');
        if (group) group.classList.remove('invalid');
      });
    });
  }

  /* ---------- Close success message ---------- */
  if (formSuccess) {
    formSuccess.addEventListener('click', () => formSuccess.classList.remove('active'));
  }
});
