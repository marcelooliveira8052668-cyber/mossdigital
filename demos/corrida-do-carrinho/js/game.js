/* ============================================================
   Corrida do Carrinho — jogo arcade fictício (Vanilla JS)
   ------------------------------------------------------------
   Nenhuma dependência. Funciona abrindo index.html direto.
   Tudo pontuação/produtos/obstáculos é fictício.
   ============================================================ */
(function (global) {
  'use strict';

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const el = {
    pontos:document.getElementById('pontos'), recorde:document.getElementById('recorde'),
    tempo:document.getElementById('tempo'), nivel:document.getElementById('nivel'),
    combo:document.getElementById('combo'), vidas:document.getElementById('vidas'),
    ini:document.getElementById('overlay-inicio'), pausa:document.getElementById('overlay-pausa'),
    fim:document.getElementById('overlay-fim'), aviso:document.getElementById('aviso-nivel'),
    fimTitulo:document.getElementById('fim-titulo'), fimTexto:document.getElementById('fim-texto'),
    fimRecorde:document.getElementById('fim-recorde'), fimNivel:document.getElementById('fim-nivel'),
    fimEmoji:document.getElementById('fim-emoji'), dica:document.getElementById('dica'),
    som:document.getElementById('btn-som')
  };

  const PRODUTOS = [
    { icon:'📱', cor:'#2f6fed', nome:'Smartphone' }, { icon:'💻', cor:'#1b4576', nome:'Notebook' },
    { icon:'⌚', cor:'#7c3f2a', nome:'Relógio' }, { icon:'📺', cor:'#275a94', nome:'TV' },
    { icon:'🎧', cor:'#b45309', nome:'Fone' }, { icon:'📚', cor:'#6d4aff', nome:'Livro' },
    { icon:'🚗', cor:'#0b1f3a', nome:'Peça de carro' }, { icon:'🍳', cor:'#c97b52', nome:'Cozinha' },
    { icon:'👕', cor:'#d64550', nome:'Vestuário' }, { icon:'🛋️', cor:'#1f9d6b', nome:'Casa' }
  ];
  const RUINS = [
    { icon:'🚫', cor:'#d64550', nome:'Esgotado' },
    { icon:'❌', cor:'#b02a37', nome:'Cupom inválido' },
    { icon:'💸', cor:'#9a3b2b', nome:'Frete caro' }
  ];
  const PODERES = [
    { icon:'🎟️', cor:'#f5a623', nome:'MOSS10', tipo:'dobro' },
    { icon:'🚚', cor:'#36d399', nome:'Frete grátis', tipo:'escudo' }
  ];
  const DICAS = [
    '💡 Dica: frete grátis aumenta a conversão da loja.',
    '💡 Dica: estoque atualizado evita vender um item esgotado.',
    '💡 Dica: um bom cupom melhora a experiência do cliente.',
    '💡 Dica: RLS protege os dados de cada cliente no banco.',
    '💡 Dica: Webhooks confirmam pagamentos com segurança.',
    '💡 Dica: o carrinho é só um array de { id, quantidade }.'
  ];

  let best = 0;
  try { best = Number(localStorage.getItem('moss_corrida_recorde_v1')) || 0; } catch (e) {}
  el.recorde.textContent = best;

  const state = {
    playing:false, paused:false, score:0, lives:3, level:1, combo:0,
    time:90, clock:0, doubleUntil:0, shieldUntil:0, lastDica:0, som:false
  };
  const player = { x:W/2, alvo:W/2, w:104, h:52, y:H-46 };
  let itens = [], particulas = [], spawnTimer = 0, lastFrame = performance.now(), audioCtx = null;
  const keys = { esq:false, dir:false };

  // --- Áudio simples (Web Audio) --------------------------------
  function beep(freq, dur, tipo) {
    if (!state.som) return;
    try {
      audioCtx = audioCtx || new (global.AudioContext || global.webkitAudioContext)();
      const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.type = tipo || 'sine'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioCtx.currentTime + dur);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + dur);
    } catch (e) {}
  }

  // --- Utilidades ------------------------------------------------
  function rect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function random(min, max) { return min + Math.random() * (max - min); }
  function escolher(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function multiplicador() { return Math.min(5, 1 + Math.floor(state.combo / 5)); }

  function atualizarHUD() {
    el.pontos.textContent = state.score;
    el.tempo.textContent = Math.max(0, Math.ceil(state.time)) + 's';
    el.nivel.textContent = state.level;
    el.combo.textContent = '×' + multiplicador();
    el.vidas.textContent = state.lives > 0 ? '♥'.repeat(state.lives) : '—';
    el.vidas.setAttribute('aria-label', state.lives + ' vidas');
  }

  // --- Ciclo de jogo ---------------------------------------------
  function iniciar() {
    state.playing = true; state.paused = false;
    state.score = 0; state.lives = 3; state.level = 1; state.combo = 0;
    state.time = 90; state.clock = 0; state.doubleUntil = 0; state.shieldUntil = 0;
    player.x = W/2; player.alvo = W/2;
    itens = []; particulas = []; spawnTimer = 0;
    el.ini.classList.add('hidden'); el.fim.classList.add('hidden'); el.pausa.classList.add('hidden');
    atualizarHUD();
    beep(520, .12, 'triangle');
  }

  function alternarPausa() {
    if (!state.playing) return;
    state.paused = !state.paused;
    el.pausa.classList.toggle('hidden', !state.paused);
  }

  function fim(titulo, texto, emoji) {
    state.playing = false;
    if (state.score > best) {
      best = state.score;
      try { localStorage.setItem('moss_corrida_recorde_v1', String(best)); } catch (e) {}
      el.recorde.textContent = best;
    }
    el.fimTitulo.textContent = titulo;
    el.fimTexto.textContent = texto;
    el.fimEmoji.textContent = emoji;
    el.fimRecorde.textContent = best;
    el.fimNivel.textContent = state.level;
    el.fim.classList.remove('hidden');
    beep(220, .35, 'sawtooth');
  }

  function spawn() {
    const r = Math.random();
    let item;
    if (r < .64) {
      const p = escolher(PRODUTOS);
      item = { tipo:'produto', icon:p.icon, cor:p.cor, nome:p.nome };
    } else if (r < .85) {
      const b = escolher(RUINS);
      item = { tipo:'ruim', icon:b.icon, cor:b.cor, nome:b.nome };
    } else {
      const p = escolher(PODERES);
      item = { tipo:'poder', icon:p.icon, cor:p.cor, nome:p.nome, poder:p.tipo };
    }
    item.x = random(46, W - 46);
    item.y = -38;
    item.w = 58; item.h = 58;
    item.vy = 150 + state.level * 34 + random(-10, 20);
    item.rot = random(-.12, .12);
    itens.push(item);
  }

  function explodir(x, y, cor) {
    for (let i = 0; i < 10; i++) {
      particulas.push({ x:x, y:y, vx:random(-110,110), vy:random(-150,40),
        vida:random(.3,.7), cor:cor, tam:random(3,7) });
    }
  }

  function pegar(item) {
    explodir(item.x, item.y, item.cor);
    if (item.tipo === 'produto') {
      state.combo++;
      const pts = Math.round(10 * multiplicador() * (state.clock < state.doubleUntil ? 2 : 1));
      state.score += pts;
      beep(660 + Math.min(400, state.combo * 12), .09, 'triangle');
    } else if (item.tipo === 'poder') {
      if (item.poder === 'dobro') { state.doubleUntil = state.clock + 6; state.score += 25; beep(880, .16, 'square'); }
      else { state.shieldUntil = state.clock + 7; beep(720, .18, 'sine'); }
    } else if (state.clock < state.shieldUntil) {
      state.score += 5; beep(440, .08, 'square');
    } else {
      state.lives--; state.combo = 0; beep(140, .3, 'sawtooth');
    }
    const novoNivel = 1 + Math.floor(state.score / 250);
    if (novoNivel > state.level) {
      state.level = novoNivel;
      el.aviso.textContent = 'Nível ' + state.level + '!';
      el.aviso.classList.remove('hidden');
      el.aviso.style.animation = 'none'; void el.aviso.offsetWidth; el.aviso.style.animation = '';
      setTimeout(function () { el.aviso.classList.add('hidden'); }, 1100);
      beep(990, .2, 'triangle');
    }
    atualizarHUD();
  }

  function update(dt) {
    state.clock += dt;
    state.time -= dt;

    if (keys.esq) player.alvo -= 520 * dt;
    if (keys.dir) player.alvo += 520 * dt;
    player.alvo = Math.max(player.w/2, Math.min(W - player.w/2, player.alvo));
    player.x += (player.alvo - player.x) * Math.min(1, dt * 14);

    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      spawn();
      spawnTimer = Math.max(.42, 1.05 - state.level * .075) * random(.8, 1.2);
    }

    for (let i = itens.length - 1; i >= 0; i--) {
      const it = itens[i];
      it.y += it.vy * dt;
      const pcx = player.x, pcy = player.y;
      if (Math.abs(it.x - pcx) < it.w/2 + player.w/2 - 8 &&
          Math.abs(it.y - pcy) < it.h/2 + player.h/2 - 6) {
        pegar(it); itens.splice(i, 1); continue;
      }
      if (it.y > H + 50) {
        if (it.tipo === 'produto') state.combo = 0;
        itens.splice(i, 1);
        atualizarHUD();
      }
    }

    for (let i = particulas.length - 1; i >= 0; i--) {
      const p = particulas[i];
      p.vy += 340 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vida -= dt;
      if (p.vida <= 0) particulas.splice(i, 1);
    }

    if (state.clock - state.lastDica > 12) {
      state.lastDica = state.clock;
      el.dica.textContent = DICAS[Math.floor(state.clock / 12) % DICAS.length];
    }

    if (state.lives <= 0) { fim('Fim de jogo!', 'Você perdeu todas as vidas e fez ' + state.score + ' pontos.', '💥'); return; }
    if (state.time <= 0) { fim('Tempo esgotado!', 'Você fez ' + state.score + ' pontos. Tente superar seu recorde!', '🏁'); }
  }

  // --- Desenho ----------------------------------------------------
  function draw() {
    // fundo
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0d1c31'); bg.addColorStop(1, '#08111f');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(255,255,255,.04)'; ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    const off = (state.clock * 60) % 60;
    for (let y = off - 60; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // escudo
    if (state.playing && state.clock < state.shieldUntil) {
      ctx.save(); ctx.globalAlpha = .18; ctx.strokeStyle = '#36d399'; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(player.x - 80, H - 6); ctx.lineTo(player.x - 46, H - 88);
      ctx.lineTo(player.x + 46, H - 88); ctx.lineTo(player.x + 80, H - 6); ctx.stroke(); ctx.restore();
    }

    // itens
    itens.forEach(function (it) {
      ctx.save(); ctx.translate(it.x, it.y); ctx.rotate(it.rot);
      ctx.shadowColor = it.cor; ctx.shadowBlur = 18;
      ctx.fillStyle = it.cor; rect(-it.w/2, -it.h/2, it.w, it.h, 14); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255,255,255,.18)'; rect(-it.w/2, -it.h/2, it.w, 18, 14); ctx.fill();
      ctx.font = '30px "Segoe UI Emoji","Apple Color Emoji",sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(it.icon, 0, 2);
      ctx.restore();
    });

    // partículas
    particulas.forEach(function (p) {
      ctx.globalAlpha = Math.max(0, p.vida * 1.6);
      ctx.fillStyle = p.cor; ctx.fillRect(p.x, p.y, p.tam, p.tam);
    });
    ctx.globalAlpha = 1;

    // carrinho
    ctx.save(); ctx.translate(player.x, player.y);
    ctx.shadowColor = 'rgba(245,166,35,.7)'; ctx.shadowBlur = 22;
    ctx.fillStyle = '#f5a623'; ctx.beginPath();
    ctx.moveTo(-50, -22); ctx.lineTo(50, -22); ctx.lineTo(38, 16); ctx.lineTo(-38, 16);
    ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#ffd98a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-30, -8); ctx.lineTo(30, -8); ctx.moveTo(-25, 2); ctx.lineTo(25, 2); ctx.stroke();
    ctx.fillStyle = '#0b1f3a';
    ctx.beginPath(); ctx.arc(-28, 24, 9, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(28, 24, 9, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#9db2d0';
    ctx.beginPath(); ctx.arc(-28, 24, 3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(28, 24, 3, 0, Math.PI*2); ctx.fill();
    ctx.restore();

    // efeitos de estado
    if (state.playing && state.clock < state.doubleUntil) {
      ctx.fillStyle = '#f5a623'; ctx.font = 'bold 16px Consolas,monospace'; ctx.textAlign = 'left';
      ctx.fillText('PONTOS ×2  ' + Math.ceil(state.doubleUntil - state.clock) + 's', 16, 26);
    }
    if (!state.playing && !state.paused) {
      ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.fillRect(0, 0, W, H);
    }
  }

  function frame(now) {
    const dt = Math.min((now - lastFrame) / 1000, .05);
    lastFrame = now;
    if (state.playing && !state.paused) update(dt);
    draw();
    global.requestAnimationFrame(frame);
  }

  // --- Controles --------------------------------------------------
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') { keys.esq = true; e.preventDefault(); }
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') { keys.dir = true; e.preventDefault(); }
    if (e.key.toLowerCase() === 'p') alternarPausa();
    if (e.key === ' ' && !state.playing) { iniciar(); e.preventDefault(); }
  });
  document.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keys.esq = false;
    if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keys.dir = false;
  });

  function moverPorPonto(clientX) {
    const r = canvas.getBoundingClientRect();
    player.alvo = (clientX - r.left) / r.width * W;
  }
  canvas.addEventListener('pointerdown', function (e) { moverPorPonto(e.clientX); canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', function (e) { if (e.buttons || e.pointerType === 'touch') moverPorPonto(e.clientX); });

  function segurar(btn, dir) {
    btn.addEventListener('pointerdown', function (e) { e.preventDefault(); keys[dir] = true; });
    ['pointerup','pointerleave','pointercancel'].forEach(function (ev) {
      btn.addEventListener(ev, function () { keys[dir] = false; });
    });
  }
  segurar(document.getElementById('btn-esquerda'), 'esq');
  segurar(document.getElementById('btn-direita'), 'dir');

  document.getElementById('btn-iniciar').addEventListener('click', iniciar);
  document.getElementById('btn-reiniciar').addEventListener('click', iniciar);
  document.getElementById('btn-continuar').addEventListener('click', alternarPausa);
  el.som.addEventListener('click', function () {
    state.som = !state.som;
    el.som.textContent = state.som ? '🔊 Som' : '🔇 Som';
    el.som.setAttribute('aria-pressed', String(state.som));
    if (state.som) beep(660, .1, 'triangle');
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden && state.playing && !state.paused) alternarPausa();
  });

  global.requestAnimationFrame(frame);
})(window);
