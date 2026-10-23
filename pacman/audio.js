/* ==========================================================================
   PAC-MAN//NEON - efeitos sonoros gerados por WebAudio
   Nenhum arquivo externo: tudo e oscillator + envelope. O contexto e
   criado no primeiro toque/clique (regra dos navegadores contra autoplay).
   ========================================================================== */

const Som = (function () {
    let ctx = null;
    let mestre = null;
    let mudo = false;
    let wakaAlt = false;
    let paciencia = 0; // evita flood de waka em rajada

    function garantir() {
        if (!ctx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            ctx = new AC();
            mestre = ctx.createGain();
            mestre.gain.value = 0.5;
            mestre.connect(ctx.destination);
        }
        if (ctx.state === "suspended") ctx.resume();
        return ctx;
    }

    // nota simples com envelope
    function nota(freq, dur, tipo, vol, atraso, varFreq) {
        if (mudo || !garantir()) return;
        const t0 = ctx.currentTime + (atraso || 0);
        const osc = ctx.createOscillator();
        const ganho = ctx.createGain();
        osc.type = tipo || "square";
        osc.frequency.setValueAtTime(freq, t0);
        if (varFreq) {
            if (varFreq.tipo === "exponencial") {
                osc.frequency.exponentialRampToValueAtTime(Math.max(varFreq.ate, 1), t0 + dur);
            } else {
                osc.frequency.linearRampToValueAtTime(varFreq.ate, t0 + dur);
            }
        }
        const v = vol == null ? 0.22 : vol;
        ganho.gain.setValueAtTime(0.0001, t0);
        ganho.gain.exponentialRampToValueAtTime(v, t0 + 0.012);
        ganho.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        osc.connect(ganho);
        ganho.connect(mestre);
        osc.start(t0);
        osc.stop(t0 + dur + 0.05);
    }

    function ruidao(dur, vol, atraso) { // "waka" classico: barulho curtinho
        if (mudo || !garantir()) return;
        const t0 = ctx.currentTime + (atraso || 0);
        const osc = ctx.createOscillator();
        const ganho = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(wakaAlt ? 320 : 190, t0);
        osc.frequency.exponentialRampToValueAtTime(wakaAlt ? 170 : 320, t0 + dur);
        wakaAlt = !wakaAlt;
        ganho.gain.setValueAtTime(0.0001, t0);
        ganho.gain.exponentialRampToValueAtTime(vol || 0.16, t0 + 0.008);
        ganho.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        osc.connect(ganho);
        ganho.connect(mestre);
        osc.start(t0);
        osc.stop(t0 + dur + 0.03);
    }

    const efeitos = {
        moeda() {
            const agora = performance.now();
            if (agora - paciencia < 55) return; // nao empilha
            paciencia = agora;
            ruidao(0.07, 0.13);
        },
        pastilha() {
            nota(392, 0.1, "square", 0.2, 0);
            nota(523, 0.1, "square", 0.2, 0.08);
            nota(659, 0.16, "square", 0.22, 0.16);
        },
        fantasma() {
            [523, 659, 784, 1047, 1319].forEach((f, i) => nota(f, 0.07, "square", 0.2, i * 0.05));
        },
        morte() {
            nota(700, 0.55, "sawtooth", 0.22, 0, { tipo: "exponencial", ate: 60 });
            nota(500, 0.5, "sine", 0.14, 0.1, { tipo: "exponencial", ate: 50 });
        },
        fruta() {
            [659, 784, 988, 1319].forEach((f, i) => nota(f, 0.12, "triangle", 0.22, i * 0.09));
        },
        inicio() {
            // toque de abertura: subida + pausa + confirmacao
            const seq = [[330, 0], [392, 0.16], [523, 0.32], [659, 0.5], [523, 0.72], [659, 0.88], [784, 1.04]];
            seq.forEach(([f, t]) => nota(f, 0.14, "square", 0.18, t));
        },
        vidaExtra() {
            [784, 988, 1175, 1568].forEach((f, i) => nota(f, 0.09, "triangle", 0.2, i * 0.07));
        },
        fim() {
            [523, 466, 392, 330, 262].forEach((f, i) => nota(f, 0.24, "sawtooth", 0.16, i * 0.18));
        },
        botao() {
            nota(880, 0.05, "square", 0.1);
        },
        pausa() {
            nota(440, 0.07, "square", 0.12);
            nota(330, 0.09, "square", 0.12, 0.08);
        },
        fase() {
            [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, t) => nota(f, 0.13, "square", 0.18, t * 0.12));
        },
    };

    return {
        tocar(nome) {
            const f = efeitos[nome];
            if (f) { try { f(); } catch (e) { /* sem audio, sem drama */ } }
        },
        ligar() {
            mudo = false;
            try { localStorage.setItem("pacman.som", "1"); } catch (e) { }
            garantir();
        },
        desligar() {
            mudo = true;
            try { localStorage.setItem("pacman.som", "0"); } catch (e) { }
        },
        alternar() {
            if (mudo) this.ligar(); else this.desligar();
            return !mudo;
        },
        get mudo() { return mudo; },
        acordar() { garantir(); }, // chamar em gesto do usuario
    };
})();

try { if (localStorage.getItem("pacman.som") === "0") Som.desligar(); } catch (e) { }
