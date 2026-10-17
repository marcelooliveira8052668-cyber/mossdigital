/* ==========================================================================
   PAINEL DE DEMOS — lógica do seletor
   ========================================================================== */

(function () {
  'use strict';

  const bar    = document.getElementById('demoBar');
  const list   = document.getElementById('demoList');
  const fab    = document.getElementById('demoFab');
  const closeB = document.getElementById('demoClose');
  const copyB  = document.getElementById('copyBtn');
  const hint   = document.getElementById('copyHint');

  const presets = window.SITE_PRESETS || {};
  const ordem   = window.SITE_PRESET_LIST || [];

  const params  = new URLSearchParams(location.search);
  const atual   = params.get('preset') || 'lanchonete';

  /* ------------------------------------------------------------------
     MODO LIMPO
     Sem ?painel=1 o site abre "limpo": sem painel e sem botão flutuante.
     É esse link que você manda pro cliente.

     Com ?painel=1 o painel aparece (é o modo seu, para escolher o preset).
     ------------------------------------------------------------------ */
  const modoLimpo = !params.get('painel');

  if (modoLimpo) {
    if (bar)  bar.remove();
    if (fab)  fab.remove();
  }

  /* Monta a lista de presets */
  ordem.forEach(function (p) {
    if (!presets[p.id] || !list) return;

    const b = document.createElement('button');
    b.className = 'demo-item' + (p.id === atual ? ' is-active' : '');
    b.innerHTML =
      '<span class="demo-item__badge">' + esc(p.icone) + '</span>' +
      '<span>' + esc(p.nome) +
      '<small>' + esc(presets[p.id].brand.tagline) + '</small></span>';

    b.addEventListener('click', function () {
      // Mantém o painel aberto quando você for trocando de preset
      location.search = '?preset=' + encodeURIComponent(p.id) + '&painel=1';
    });

    list.appendChild(b);
  });

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (modoLimpo) return; // não registra mais nada no modo de compartilhamento

  /* Abrir / fechar */
  fab.addEventListener('click', function () { bar.classList.add('is-open'); });
  closeB.addEventListener('click', function () { bar.classList.remove('is-open'); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') bar.classList.remove('is-open');
  });

  /* Copiar configuracao do preset atual */
  copyB.addEventListener('click', function () {
    const preset = presets[atual];
    if (!preset) return;

    const texto =
      'window.SITE_CONFIG = ' + JSON.stringify(preset, null, 2) + ';\n';

    const feito = function () {
      copyB.textContent = 'Copiado!';
      hint.className = 'demo-bar__hint is-ok';
      hint.textContent = 'Agora cole em assets/js/config.js';

      setTimeout(function () {
        copyB.textContent = 'Copiar configuração';
        hint.className = 'demo-bar__hint';
        hint.textContent = 'Copia e cola dentro de assets/js/config.js';
      }, 2200);
    };

    // Copia modern (Clipboard API)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(feito).catch(function () {
        fallbackCopy(texto, feito);
      });
    } else {
      fallbackCopy(texto, feito);
    }
  });

  /* Metodo alternativo para navegadores antigos ou quando abre via file:// */
  function fallbackCopy(texto, feito) {
    try {
      const ta = document.createElement('textarea');
      ta.value = texto;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      feito();
    } catch (err) {
      hint.textContent = 'Nao foi possivel copiar. O texto esta no console (F12).';
      console.log(texto);
    }
  }

  /* Abre o painel automaticamente quando voce entra sem escolher preset */
  if (!params.get('preset')) {
    setTimeout(function () { bar.classList.add('is-open'); }, 600);
  }
})();