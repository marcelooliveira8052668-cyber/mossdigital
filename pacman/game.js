/* ==========================================================================
   PAC-MAN//NEON - motor do jogo

   Estrutura:
     1. constantes e utilidades
     2. estado global (JG)
     3. carregamento da fase (plantas de maps.js)
     4. movimento por tile (estilo arcade: vira so no centro do corredor)
     5. inteligencia dos 4 fantasmas (Blinky/Pinky/Inky/Clyde)
     6. colisoes, medo, frutas, pontuacao
     7. fluxo de telas (login, titulo, pronto, pausa, fim...)
     8. entrada: teclado, joystick, deslizar o dedo
     9. desenho neon no canvas
    10. ranking em localStorage + gancho de testes (__teste)
   ========================================================================== */

/* ---------------------------- 1. constantes ------------------------------ */

const TS = 22;                       // pixels por tile no canvas interno
const COLS = 19, ROWS = 21;
const LARG = COLS * TS, ALT = ROWS * TS;
const TUNEL = 9;                     // linha do tunel (igual a maps.js)
const PORTA_LINHA = 6;
const PASSO = 1 / 60;                // simulacao em passos fixos de 60 Hz

const TIPO = { PAREDE: 0, MOEDA: 1, PASTILHA: 2, VAZIO: 3, PORTA: 4, CASA: 5 };

const DIRS = {
    cima:   { x: 0, y: -1, ang: -Math.PI / 2, op: "baixo" },
    esq:    { x: -1, y: 0, ang: Math.PI,      op: "dir"   },
    baixo:  { x: 0, y: 1,  ang: Math.PI / 2,  op: "cima"  },
    dir:    { x: 1, y: 0,  ang: 0,            op: "esq"   },
};
// ordem de desempate classica: cima, esquerda, baixo, direita
const ORDEM_TURNO = ["cima", "esq", "baixo", "dir"];

const NOMES_FANTASMA = ["BLINKY", "PINKY", "INKY", "CLYDE"];
const CORES_FANTASMA = ["#ff3b5c", "#ff9ee2", "#00e5ff", "#ffb899"];
const CANTOS_FANTASMA = [[COLS - 2, 1], [1, 1], [COLS - 2, ROWS - 2], [1, ROWS - 2]];

const VIDA_INICIAL = 3;
const PONTOS_MOEDA = 10;
const PONTOS_PASTILHA = 50;
const PONTOS_FRUTA_BASE = 100;
const BONUS_FIM_FASE = 500;
const VIDA_EXTRA_EM = 10000;
const FRUTAS_NA_FASE = [70, 170];    // moedas comidas quando a fruta aparece
const DUR_FRUTA = 9;                 // segundos na tela
const DUR_MEDO_FLASH = 2;            // últimos segundos do medo: pisca
const VEL_OLHOS = 16;                // fantasmas comidos voltam rapido
const DIST_CLYDE = 8;                // Clyde te ca se distancia > 8 casas

const VELOCIDADE_TUNEL_FANTASMA = 0.45;

function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function tileX(px) { return Math.floor(px / TS); }
function tileY(py) { return Math.floor(py / TS); }
function centroX(tx) { return tx * TS + TS / 2; }
function centroY(ty) { return ty * TS + TS / 2; }
function dist2(ax, ay, bx, by) { const dx = ax - bx, dy = ay - by; return dx * dx + dy * dy; }

/* ------------------------------ 2. estado -------------------------------- */

const JG = {
    modo: "login",          // login | titulo | instrucoes | ranking | pronto | jogando | pausa | morte | fimfase | fim
    jogador: "",
    nivel: 1,
    pontos: 0,
    vidas: VIDA_INICIAL,
    marcoExtra: VIDA_EXTRA_EM,
    fase: null,             // copia da fase atual (velocidades etc.)
    grade: null,
    moedasRest: 0,
    moedasComidas: 0,
    posP: null, posF: null, posPorta: null,
    pacman: null,
    fantasmas: [],
    medo: 0, combo: 0,
    cicloIdx: 0, cicloRest: 0, perseguicao: false,
    tempoFase: 0,
    temporizador: 0,
    animMorte: 0,
    fimFaseOverlay: false,
    fruta: null,
    popups: [],
    recorde: 0,
    novoRecorde: false,
    tempoTotal: 0,          // relógio para animações de desenho
    pausaAutomatica: false,
    congelar: false,        // teste: congela so o pacman
};

/* --------------------- 3. carregamento da fase --------------------------- */

function carregarFase(nivel) {
    const cfg = faseDe(nivel);
    JG.nivel = nivel;
    JG.fase = cfg;
    JG.grade = cfg.mapa.map(linha => linha.split("").map(analisarCelula));
    JG.posP = null; JG.posF = null; JG.posPorta = null;
    JG.moedasRest = 0;
    JG.moedasComidas = 0;
    JG.fruta = null;
    JG.popups = [];
    JG.tempoFase = 0;
    JG.medo = 0; JG.combo = 0;
    JG.cicloIdx = 0; JG.perseguicao = false;
    JG.cicloRest = cfg.ciclo[0];
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const t = JG.grade[y][x].t;
            if (t === TIPO.MOEDA || t === TIPO.PASTILHA) JG.moedasRest++;
        }
    }
    reiniciarPosicoes(true);
    atualizarHud();
}

function analisarCelula(c) {
    switch (c) {
        case "#": return { t: TIPO.PAREDE };
        case ".": return { t: TIPO.MOEDA };
        case "o": return { t: TIPO.PASTILHA };
        case "-": return { t: TIPO.PORTA };
        case "G": return { t: TIPO.CASA };
        default: return { t: TIPO.VAZIO };
    }
}

// percorre a planta para achar porta, inicio do pacman e ponto da fruta
function acharMarcadoresDoMapa() {
    if (JG.posP && JG.posF && JG.posPorta) return;
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const t = JG.grade[y][x].t;
            if (t === TIPO.PORTA) JG.posPorta = { x, y };
        }
    }
    // P e F viraram VAZIO no parse; achar pela planta original
    const mapa = JG.fase.mapa;
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const c = mapa[y][x];
            if (c === "P") JG.posP = { x, y };
            if (c === "F") JG.posF = { x, y };
        }
    }
}

function reiniciarPosicoes(inicioJogo) {
    // pacman volta para o P da planta
    acharMarcadoresDoMapa();
    JG.pacman = {
        x: centroX(JG.posP.x), y: centroY(JG.posP.y),
        dir: "esq", prox: null,
        boca: 0, andando: 0,
    };

    // fantasmas: Blinky la fora; os outros na casa esperando liberacao
    const lib = JG.fase.liberacao;
    const lugares = [[9, 7], [8, 8], [10, 8]]; // slots dentro da casa
    JG.fantasmas = NOMES_FANTASMA.map((nome, i) => {
        const base = {
            nome, idx: i,
            x: 0, y: 0, yCasa: 0,
            dir: i === 0 ? "esq" : "cima",
            prox: null, tileDec: null,
            estado: "livre",
            espera: 0,
            cor: CORES_FANTASMA[i],
        };
        if (i === 0) { // Blinky: acima da porta, ja caçando
            base.x = centroX(JG.posPorta.x);
            base.y = centroY(PORTA_LINHA - 1);
        } else {
            base.x = centroX(lugares[i - 1][0]);
            base.yCasa = centroY(lugares[i - 1][1]);
            base.y = base.yCasa;
            base.estado = "casa";
            base.espera = lib[i - 1];
        }
        return base;
    });
}

/* ------------------- 4. movimento por tile ------------------------------- */

// a célula na direção é passável para quem?
function celulaLivre(tx, ty, papel) {
    if (ty < 0 || ty >= ROWS) return false;
    if (tx < 0 || tx >= COLS) return ty === TUNEL; // tunel lateral
    const t = JG.grade[ty][tx].t;
    if (t === TIPO.PAREDE) return false;
    if (t === TIPO.PORTA) return papel === "olhos" || papel === "casa";
    if (t === TIPO.CASA) return papel === "casa";
    return true;
}

function tileDaFrente(ent, dir) {
    const d = DIRS[dir];
    return { x: tileX(ent.x) + d.x, y: tileY(ent.y) + d.y };
}

function noCentro(ent, margem) {
    const cx = centroX(tileX(ent.x)), cy = centroY(tileY(ent.y));
    return Math.abs(ent.x - cx) <= margem && Math.abs(ent.y - cy) <= margem;
}

function encaixarNoCentro(ent) {
    ent.x = centroX(tileX(ent.x));
    ent.y = centroY(tileY(ent.y));
}

// movimento do pacman: vira ao passar pelo centro, inverte a qualquer hora
function moverPacman() {
    const p = JG.pacman;
    const vel = JG.fase.velPac * TS * PASSO;

    if (p.prox) {
        if (p.prox === DIRS[p.dir].op) {
            p.dir = p.prox; p.prox = null;
        } else if (p.prox !== p.dir) {
            const tx = tileX(p.x), ty = tileY(p.y);
            const d = DIRS[p.prox];
            const cx = centroX(tx), cy = centroY(ty);
            const pertoDoCentro = (p.dir === "esq" || p.dir === "dir")
                ? Math.abs(p.x - cx) <= vel + 0.6
                : Math.abs(p.y - cy) <= vel + 0.6;
            if (pertoDoCentro && celulaLivre(tx + d.x, ty + d.y, "pac")) {
                p.x = cx; p.y = cy;
                p.dir = p.prox; p.prox = null;
            }
        }
    }

    const frente = tileDaFrente(p, p.dir);
    const podeIr = celulaLivre(frente.x, frente.y, "pac");
    if (podeIr) {
        const d = DIRS[p.dir];
        p.x += d.x * vel;
        p.y += d.y * vel;
        p.andando += vel;
        // tunel: sai de um lado e entra no outro
        if (p.x < -TS / 2) p.x = LARG + TS / 2 - 0.01;
        if (p.x > LARG + TS / 2) p.x = -TS / 2 + 0.01;
    } else {
        // gruda no centro do corredor
        if (p.dir === "esq" || p.dir === "dir") p.x = centroX(tileX(p.x));
        else p.y = centroY(tileY(p.y));
    }
    p.boca += vel * 0.16;
}

/* ------------ 5. inteligencia dos fantasmas ------------------------------ */

function alvoDoFantasma(f) {
    const p = JG.pacman;
    const ptx = tileX(p.x), pty = tileY(p.y);
    const pd = DIRS[p.dir];
    switch (f.idx) {
        case 0: // Blinky: reto na cabeca
            return { x: ptx, y: pty };
        case 1: // Pinky: embosca 4 casas a frente
            return { x: ptx + pd.x * 4, y: pty + pd.y * 4 };
        case 2: { // Inky: vetor dobrado a partir de Blinky
            const b = JG.fantasmas[0];
            const frente = { x: ptx + pd.x * 2, y: pty + pd.y * 2 };
            return {
                x: frente.x * 2 - tileX(b.x),
                y: frente.y * 2 - tileY(b.y),
            };
        }
        default: { // Clyde: ca se longe, espalha se perto
            const dist = Math.abs(ptx - tileX(f.x)) + Math.abs(pty - tileY(f.y));
            if (dist > DIST_CLYDE) return { x: ptx, y: pty };
            const c = CANTOS_FANTASMA[3];
            return { x: c[0], y: c[1] };
        }
    }
}

function alvoEspalhar(f) {
    const c = CANTOS_FANTASMA[f.idx];
    return { x: c[0], y: c[1] };
}

// decide a melhor direção num corredor (heuristica classica: menor Manhattan)
function decidirDirecao(f, alvo, permitirReversao) {
    const oposta = DIRS[f.dir].op;
    let melhor = null, melhorD = Infinity;
    for (const nome of ORDEM_TURNO) {
        if (nome === oposta && !permitirReversao) continue;
        const d = DIRS[nome];
        const tx = tileX(f.x) + d.x, ty = tileY(f.y) + d.y;
        if (!celulaLivre(tx, ty, "fantasma")) continue;
        const dist = Math.abs(alvo.x - tx) + Math.abs(alvo.y - ty);
        if (dist < melhorD) { melhorD = dist; melhor = nome; }
    }
    if (!melhor) melhor = oposta; // beco sem saida
    f.dir = melhor;
}

// decide a direção ao passar pelo centro do corredor (uma vez por tile)
function decidirNoCentro(f, passoPx) {
    if (!noCentro(f, passoPx + 0.4)) return;
    // alinha apenas o eixo perpendicular; o avanço continua normalmente
    if (f.dir === "esq" || f.dir === "dir") f.y = centroY(tileY(f.y));
    else f.x = centroX(tileX(f.x));
    const chave = tileY(f.y) * 100 + tileX(f.x);
    if (f.tileDec === chave) return; // ja decidiu neste corredor
    f.tileDec = chave;
    if (f.estado === "olhos") f.dir = direcaoOlhos(f);
    else if (f.estado === "medo") decidirMedo(f);
    else {
        const alvo = JG.perseguicao ? alvoDoFantasma(f) : alvoEspalhar(f);
        decidirDirecao(f, alvo, false);
    }
}

function decidirMedo(f) {
    const oposta = DIRS[f.dir].op;
    const validas = ORDEM_TURNO.filter(nome => {
        if (nome === oposta) return false;
        const d = DIRS[nome];
        return celulaLivre(tileX(f.x) + d.x, tileY(f.y) + d.y, "fantasma");
    });
    const lista = validas.length ? validas : [oposta];
    f.dir = lista[(Math.random() * lista.length) | 0];
}

// caminho minimo por busca em largura: os olhos sempre acham a porta,
// mesmo contornando o bloco central (o guloso daria voltas infinitas)
function direcaoOlhos(f) {
    const tx = tileX(f.x), ty = tileY(f.y);
    const alvo = JG.posPorta;
    const visto = new Set([ty * 100 + tx]);
    const fila = [[tx, ty, null]];
    while (fila.length) {
        const item = fila.shift();
        const x = item[0], y = item[1], primeira = item[2];
        if (x === alvo.x && y === alvo.y) return primeira || f.dir;
        for (const nome of ORDEM_TURNO) {
            const d = DIRS[nome];
            let nx = x + d.x, ny = y + d.y;
            if (ny < 0 || ny >= ROWS) continue;
            if (nx < 0 || nx >= COLS) {
                if (ny !== TUNEL) continue;
                nx = (nx + COLS) % COLS; // tunel lateral
            }
            const k = ny * 100 + nx;
            if (visto.has(k) || !celulaLivre(nx, ny, "olhos")) continue;
            visto.add(k);
            fila.push([nx, ny, primeira === null && x === tx && y === ty ? nome : primeira]);
        }
    }
    return f.dir; // sem caminho (nao deve acontecer): segue reto
}

function atualizarFantasma(f) {
    const fase = JG.fase;

    if (f.estado === "casa") {
        // balança esperando a hora de sair (oscila em volta da posição da casa)
        f.espera -= PASSO;
        f.y = f.yCasa + Math.sin(JG.tempoTotal * 6) * 2;
        if (f.espera <= 0) {
            f.estado = "saindo";
            f.y = centroY(7);
        }
        return;
    }

    if (f.estado === "saindo") {
        const px = centroX(JG.posPorta.x);
        const saidaY = centroY(PORTA_LINHA - 1);
        const vel = 4 * TS * PASSO;
        if (Math.abs(f.x - px) > 0.5) {
            f.x += Math.sign(px - f.x) * Math.min(vel, Math.abs(f.x - px));
        } else {
            f.x = px;
            f.y -= Math.min(vel * 0.9, Math.abs(f.y - saidaY));
            if (f.y <= saidaY) {
                f.y = saidaY;
                f.estado = "livre";
                f.dir = Math.random() < 0.5 ? "esq" : "dir";
            }
        }
        return;
    }

    if (f.estado === "olhos") {
        const vel = VEL_OLHOS * TS * PASSO;
        const tx = tileX(f.x), ty = tileY(f.y);
        if (tx === JG.posPorta.x && ty === JG.posPorta.y) {
            f.estado = "entrando";
            return;
        }
        decidirNoCentro(f, vel);
        const frente = tileDaFrente(f, f.dir);
        if (!celulaLivre(frente.x, frente.y, "olhos")) {
            if (f.dir === "esq" || f.dir === "dir") f.x = centroX(tx); else f.y = centroY(ty);
        } else {
            const d = DIRS[f.dir];
            f.x += d.x * vel; f.y += d.y * vel;
            if (f.x < -TS / 2) f.x = LARG + TS / 2 - 0.01;
            if (f.x > LARG + TS / 2) f.x = -TS / 2 + 0.01;
        }
        return;
    }

    if (f.estado === "entrando") {
        const vel = 7 * TS * PASSO;
        const px = centroX(JG.posPorta.x);
        const portaY = centroY(JG.posPorta.y);
        const chaoY = centroY(8);
        if (Math.abs(f.y - portaY) > 0.5 && f.y < portaY) {
            f.y = Math.min(portaY, f.y + vel); // desce da porta
        } else if (Math.abs(f.x - px) > 0.5) {
            f.x += Math.sign(px - f.x) * Math.min(vel, Math.abs(f.x - px));
        } else {
            f.y = Math.min(chaoY, f.y + vel);
            if (f.y >= chaoY - 0.1) {
                f.y = chaoY;
                f.estado = "casa";
                f.espera = 1.2;
            }
        }
        return;
    }

    // estado livre ou medo: anda pelos corredores
    let vel = f.estado === "medo" ? fase.velPresa : fase.velFant;
    // tunel desacelera fantasmas comuns (igual ao fliperama)
    if (tileY(f.y) === TUNEL && f.estado !== "medo") vel *= VELOCIDADE_TUNEL_FANTASMA;
    const passoPx = vel * TS * PASSO;

    decidirNoCentro(f, passoPx);

    const frente = tileDaFrente(f, f.dir);
    if (!celulaLivre(frente.x, frente.y, "fantasma")) {
        if (f.dir === "esq" || f.dir === "dir") f.x = centroX(tileX(f.x));
        else f.y = centroY(tileY(f.y));
    } else {
        const d = DIRS[f.dir];
        f.x += d.x * passoPx; f.y += d.y * passoPx;
        if (f.x < -TS / 2) f.x = LARG + TS / 2 - 0.01;
        if (f.x > LARG + TS / 2) f.x = -TS / 2 + 0.01;
    }
}

function atualizarCiclo() {
    if (JG.medo > 0) return; // no medo o ciclo pausa (como no fliperama)
    JG.cicloRest -= PASSO;
    if (JG.cicloRest > 0) return;
    JG.cicloIdx++;
    const prox = JG.fase.ciclo[JG.cicloIdx];
    if (prox === undefined || prox === -1) {
        JG.perseguicao = true;
        JG.cicloRest = Infinity;
        return;
    }
    JG.cicloRest = prox;
    JG.perseguicao = !JG.perseguicao;
    // na troca de modo, os fantasmas viram (regra classica)
    for (const f of JG.fantasmas) {
        if (f.estado !== "livre") continue;
        const op = DIRS[f.dir].op;
        const d = DIRS[op];
        if (celulaLivre(tileX(f.x) + d.x, tileY(f.y) + d.y, "fantasma")) f.dir = op;
    }
}

/* ------------- 6. colisões, medo, frutas, pontuação ---------------------- */

function comerCelula() {
    const p = JG.pacman;
    const tx = tileX(p.x), ty = tileY(p.y);
    if (tx < 0 || tx >= COLS || ty < 0 || ty >= ROWS) return;
    const c = JG.grade[ty][tx];
    if (c.t === TIPO.MOEDA) {
        c.t = TIPO.VAZIO;
        JG.moedasRest--; JG.moedasComidas++;
        somPontuar(PONTOS_MOEDA, tx, ty, false);
        verificarFruta();
        verificarFimDeFase();
    } else if (c.t === TIPO.PASTILHA) {
        c.t = TIPO.VAZIO;
        JG.moedasRest--; JG.moedasComidas++;
        somPontuar(PONTOS_PASTILHA, tx, ty, false);
        ligarMedo();
        verificarFruta();
        verificarFimDeFase();
    }
}

function ligarMedo() {
    JG.medo = JG.fase.assustado;
    JG.combo = 0;
    for (const f of JG.fantasmas) {
        if (f.estado === "livre") {
            f.estado = "medo";
            f.dir = DIRS[f.dir].op;
        }
    }
    Som.tocar("pastilha");
}

function pontuar(v) {
    JG.pontos += v;
    if (JG.pontos >= JG.marcoExtra) {
        JG.marcoExtra += VIDA_EXTRA_EM;
        JG.vidas++;
        Som.tocar("vidaExtra");
        mostrarPopup(JG.pacman.x, JG.pacman.y - TS, "VIDA EXTRA!", "#3dff8b");
    }
    atualizarHud();
}

function somPontuar(v, tx, ty, flutua) {
    pontuar(v);
    if (v >= PONTOS_PASTILHA) mostrarPopup(centroX(tx), centroY(ty), String(v), "#ffe3d9");
}

function mostrarPopup(x, y, texto, cor) {
    JG.popups.push({ x, y, texto, cor, t: 1.1 });
    if (JG.popups.length > 6) JG.popups.shift();
}

function verificarFruta() {
    if (!JG.fruta && FRUTAS_NA_FASE.indexOf(JG.moedasComidas) !== -1 && JG.posF) {
        JG.fruta = { x: centroX(JG.posF.x), y: centroY(JG.posF.y), t: DUR_FRUTA };
        Som.tocar("fruta");
    }
}

function atualizarFruta() {
    const fr = JG.fruta;
    if (!fr) return;
    fr.t -= PASSO;
    if (dist2(fr.x, fr.y, JG.pacman.x, JG.pacman.y) < (TS * 0.7) ** 2) {
        pontuar(JG.fase.fruta.pontos);
        mostrarPopup(fr.x, fr.y - TS / 2, JG.fase.fruta.nome + " " + JG.fase.fruta.pontos, "#3dff8b");
        JG.fruta = null;
        Som.tocar("fruta");
    } else if (fr.t <= 0) {
        JG.fruta = null;
    }
}

function colisoes() {
    const p = JG.pacman;
    comerCelula();
    for (const f of JG.fantasmas) {
        const comavel = f.estado === "livre" || f.estado === "medo" || f.estado === "saindo";
        if (!comavel) continue;
        if (dist2(f.x, f.y, p.x, p.y) >= (TS * 0.62) ** 2) continue;
        if (f.estado === "medo") {
            JG.combo++;
            const pontos = 200 * Math.pow(2, JG.combo - 1);
            pontuar(pontos);
            mostrarPopup(f.x, f.y - TS / 2, String(pontos), "#00e5ff");
            f.estado = "olhos";
            f.dir = DIRS[f.dir].op;
            Som.tocar("fantasma");
        } else {
            comecarMorte();
            return;
        }
    }
}

function verificarFimDeFase() {
    if (JG.moedasRest > 0 || JG.modo !== "jogando") return;
    JG.modo = "fimfase";
    JG.temporizador = 3.0;
    JG.fimFaseOverlay = false;
    JG.fruta = null;
    Som.tocar("fase");
}

function comecarMorte() {
    JG.modo = "morte";
    JG.animMorte = 0;
    JG.medo = 0;
    Som.tocar("morte");
}

/* ---------------------------- 7. fluxo de telas -------------------------- */

function $(id) { return document.getElementById(id); }

function mostrarCamada(id) {
    for (const c of document.querySelectorAll(".camada")) c.classList.remove("ativa");
    if (id) $(id).classList.add("ativa");
}

function atualizarHud() {
    $("hudJogador").textContent = JG.jogador || "—";
    $("hudPontos").textContent = JG.pontos;
    $("hudFase").textContent = JG.nivel;
    $("hudRecorde").textContent = JG.recorde;
}

function entrarJogador(nome) {
    JG.jogador = (nome || "").trim().slice(0, 12).toUpperCase() || "JOGADOR";
    try { localStorage.setItem("pacman.jogador", JG.jogador); } catch (e) { }
    JG.modo = "titulo";
    $("saudacao").textContent = "Boa sorte, " + JG.jogador + ". O ranking espera por você.";
    atualizarHud();
    mostrarCamada("camTitulo");
}

function iniciarPartida() {
    JG.pontos = 0;
    JG.vidas = VIDA_INICIAL;
    JG.marcoExtra = VIDA_EXTRA_EM;
    JG.novoRecorde = false;
    JG.pausaAutomatica = false;
    carregarFase(1);
    JG.modo = "pronto";
    JG.temporizador = 1.9;
    mostrarCamada("camPronto");
    Som.tocar("inicio");
    atualizarHud();
}

function pausar(auto) {
    if (JG.modo !== "jogando") return;
    JG.modo = "pausa";
    JG.pausaAutomatica = !!auto;
    mostrarCamada("camPausa");
    Som.tocar("pausa");
}

function continuarJogo() {
    if (JG.modo !== "pausa") return;
    JG.modo = "jogando";
    mostrarCamada(null);
}

function sairParaTitulo() {
    JG.modo = "titulo";
    $("saudacao").textContent = JG.jogador
        ? "Boa sorte, " + JG.jogador + ". O ranking espera por você."
        : "Bem-vindo.";
    mostrarCamada("camTitulo");
}

function fimDeJogo() {
    JG.modo = "fim";
    // salva no ranking local
    const anterior = JG.recorde;
    let lista = lerRanking();
    lista.push({ nome: JG.jogador, pontos: JG.pontos, fase: JG.nivel, data: Date.now() });
    lista.sort((a, b) => b.pontos - a.pontos || a.data - b.data);
    lista = lista.slice(0, 10);
    try { localStorage.setItem("pacman.ranking", JSON.stringify(lista)); } catch (e) { }
    JG.novoRecorde = JG.pontos > anterior && JG.pontos > 0;
    JG.recorde = lista.length ? Math.max(anterior, lista[0].pontos) : anterior;

    $("fimPontos").textContent = JG.pontos;
    $("fimDetalhe").textContent = "Você chegou até a fase " + JG.nivel + " com " + JG.jogador + ".";
    $("fimRecorde").hidden = !JG.novoRecorde;
    mostrarCamada("camFim");
    Som.tocar("fim");
    atualizarHud();
}

function lerRanking() {
    try {
        const v = JSON.parse(localStorage.getItem("pacman.ranking") || "[]");
        if (Array.isArray(v)) return v;
    } catch (e) { }
    return [];
}

function atualizarRankingNaTela() {
    const lista = lerRanking();
    const alvo = $("listaRanking");
    alvo.innerHTML = "";
    if (!lista.length) {
        alvo.innerHTML = '<p class="vazio">Nenhuma partida ainda. O primeiro lugar é seu — comece jogando!</p>';
        return;
    }
    lista.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "linha" + (item.nome === JG.jogador && item.pontos === JG.pontos ? " eu" : "");
        div.innerHTML =
            '<span class="pos">' + (i + 1) + 'º</span>' +
            '<span class="nome"></span>' +
            '<span class="pts">' + item.pontos + '</span>' +
            '<span class="fase-r">F' + item.fase + '</span>';
        div.querySelector(".nome").textContent = item.nome;
        alvo.appendChild(div);
    });
}

function camadaDoModo(modo) {
    switch (modo) {
        case "titulo": return "camTitulo";
        case "fim": return "camFim";
        case "pausa": return "camPausa";
        case "login": return "camLogin";
        default: return "camTitulo";
    }
}

function abrirInstrucoes() {
    JG.voltaPara = JG.modo;
    if (JG.modo === "jogando") pausar(false);
    JG.modo = "instrucoes";
    mostrarCamada("camInstrucoes");
}

function fecharInstrucoes() {
    const destino = JG.voltaPara === "jogando" || JG.voltaPara === "pausa" ? "pausa" : JG.voltaPara;
    JG.modo = destino || "titulo";
    mostrarCamada(camadaDoModo(JG.modo));
    JG.voltaPara = null;
}

function abrirRanking() {
    JG.voltaPara = JG.modo;
    if (JG.modo === "jogando") pausar(false);
    JG.modo = "ranking";
    atualizarRankingNaTela();
    mostrarCamada("camRanking");
}

function fecharRanking() {
    const destino = JG.voltaPara === "jogando" || JG.voltaPara === "pausa" ? "pausa" : JG.voltaPara;
    JG.modo = destino || "titulo";
    mostrarCamada(camadaDoModo(JG.modo));
    JG.voltaPara = null;
}

/* --------------------------- 8. entrada ---------------------------------- */

function pedirDirecao(nome) {
    if (JG.modo !== "jogando" && JG.modo !== "pronto") return;
    JG.pacman.prox = nome;
}

function teclado(e) {
    const mapa = {
        ArrowUp: "cima", ArrowDown: "baixo", ArrowLeft: "esq", ArrowRight: "dir",
        w: "cima", s: "baixo", a: "esq", d: "dir",
        W: "cima", S: "baixo", A: "esq", D: "dir",
    };
    if (mapa[e.key]) {
        if (JG.modo === "jogando" || JG.modo === "pronto") {
            e.preventDefault();
            pedirDirecao(mapa[e.key]);
        }
        return;
    }
    if (e.key === "p" || e.key === "P" || e.key === "Escape") {
        if (JG.modo === "jogando") pausar(false);
        else if (JG.modo === "pausa") continuarJogo();
        else if (JG.modo === "instrucoes") fecharInstrucoes();
        else if (JG.modo === "ranking") fecharRanking();
    }
}

function ligarEntrada() {
    document.addEventListener("keydown", teclado);

    // joystick na tela
    for (const bt of document.querySelectorAll(".joystick button[data-dir]")) {
        const nome = bt.dataset.dir;
        const apertar = (e) => {
            e.preventDefault();
            Som.acordar();
            bt.classList.add("pressionado");
            pedirDirecao(nome);
        };
        bt.addEventListener("pointerdown", apertar);
        bt.addEventListener("pointerup", () => bt.classList.remove("pressionado"));
        bt.addEventListener("pointercancel", () => bt.classList.remove("pressionado"));
        bt.addEventListener("pointerleave", () => bt.classList.remove("pressionado"));
    }

    // deslizar o dedo sobre o labirinto
    const tela = $("tela");
    let iniX = 0, iniY = 0, arrastando = false;
    tela.addEventListener("pointerdown", (e) => {
        if (JG.modo !== "jogando") return;
        arrastando = true;
        iniX = e.clientX; iniY = e.clientY;
    });
    tela.addEventListener("pointermove", (e) => {
        if (!arrastando) return;
        const dx = e.clientX - iniX, dy = e.clientY - iniY;
        if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
        if (Math.abs(dx) > Math.abs(dy)) pedirDirecao(dx > 0 ? "dir" : "esq");
        else pedirDirecao(dy > 0 ? "baixo" : "cima");
        iniX = e.clientX; iniY = e.clientY;
    });
    const soltar = () => { arrastando = false; };
    tela.addEventListener("pointerup", soltar);
    tela.addEventListener("pointercancel", soltar);

    // botões das telas
    $("formLogin").addEventListener("submit", (e) => {
        e.preventDefault();
        Som.acordar(); Som.tocar("botao");
        entrarJogador($("inpNome").value);
    });
    $("btJogar").addEventListener("click", () => { Som.tocar("botao"); iniciarPartida(); });
    $("btDeNovo").addEventListener("click", () => { Som.tocar("botao"); iniciarPartida(); });
    $("btInstrucoes").addEventListener("click", () => { Som.tocar("botao"); abrirInstrucoes(); });
    $("btAjuda").addEventListener("click", () => {
        Som.tocar("botao");
        if (JG.modo === "instrucoes") fecharInstrucoes(); else abrirInstrucoes();
    });
    $("btVoltarInstrucoes").addEventListener("click", () => { Som.tocar("botao"); fecharInstrucoes(); });
    $("btRanking").addEventListener("click", () => { Som.tocar("botao"); abrirRanking(); });
    $("btRankingFim").addEventListener("click", () => { Som.tocar("botao"); abrirRanking(); });
    $("btVoltarRanking").addEventListener("click", () => { Som.tocar("botao"); fecharRanking(); });
    $("btPausa").addEventListener("click", () => {
        Som.tocar("botao");
        if (JG.modo === "jogando") pausar(false);
        else if (JG.modo === "pausa") continuarJogo();
    });
    $("btContinuar").addEventListener("click", () => { Som.tocar("botao"); continuarJogo(); });
    $("btSair").addEventListener("click", () => { Som.tocar("botao"); sairParaTitulo(); });
    $("btTrocar").addEventListener("click", () => {
        Som.tocar("botao");
        JG.modo = "login";
        $("inpNome").value = "";
        mostrarCamada("camLogin");
        setTimeout(() => $("inpNome").focus(), 60);
    });
    $("btTrocarFim").addEventListener("click", () => {
        Som.tocar("botao");
        JG.modo = "login";
        $("inpNome").value = "";
        mostrarCamada("camLogin");
    });
    $("btSom").addEventListener("click", () => {
        const ligado = Som.alternar();
        $("btSom").textContent = ligado ? "🔊" : "🔇";
        if (ligado) Som.tocar("botao");
    });
    $("btSom").textContent = Som.mudo ? "🔇" : "🔊";

    // pausa automática quando a aba some
    document.addEventListener("visibilitychange", () => {
        if (document.hidden && JG.modo === "jogando") pausar(true);
    });
    window.addEventListener("blur", () => {
        if (JG.modo === "jogando") pausar(true);
    });
}

/* --------------------------- 9. desenho ---------------------------------- */

const canvas = $("jogo");
const ctx = canvas.getContext("2d");

function configurarCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = LARG * dpr;
    canvas.height = ALT * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function desenhar() {
    const g = JG.grade;
    if (!g) return;
    ctx.fillStyle = "#0a0518";
    ctx.fillRect(0, 0, LARG, ALT);

    const modoFim = JG.modo === "fimfase";
    const piscarFim = modoFim && JG.temporizador > 1.6 && Math.floor(JG.tempoTotal * 8) % 2 === 0;

    // paredes (blocos neon com cantos arredondados)
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const cel = g[y][x];
            const px = x * TS, py = y * TS;
            if (cel.t === TIPO.PAREDE) {
                ctx.fillStyle = piscarFim ? "#3d0f4f" : "#171153";
                ctx.strokeStyle = piscarFim ? "#ff2bd6" : "#4f3cff";
                ctx.lineWidth = 2;
                cantos(px, py, 5);
                ctx.fill();
                ctx.stroke();
            } else if (cel.t === TIPO.PORTA) {
                ctx.strokeStyle = "#ff9ee2";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(px + 2, py + TS / 2);
                ctx.lineTo(px + TS - 2, py + TS / 2);
                ctx.stroke();
            }
        }
    }

    // moedas e pastilhas
    const pulso = 1 + Math.sin(JG.tempoTotal * 5) * 0.22;
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const cel = g[y][x];
            if (cel.t === TIPO.MOEDA) {
                ctx.fillStyle = "#ffb8ae";
                ctx.beginPath();
                ctx.arc(centroX(x), centroY(y), 2.2, 0, Math.PI * 2);
                ctx.fill();
            } else if (cel.t === TIPO.PASTILHA) {
                ctx.fillStyle = "#ffe3d9";
                ctx.shadowColor = "rgba(255,227,217,0.9)";
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(centroX(x), centroY(y), 5.5 * pulso, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
    }

    if (JG.fruta) desenharFruta(JG.fruta.x, JG.fruta.y);

    for (const f of JG.fantasmas) desenharFantasma(f);
    if (JG.pacman) desenharPacman();

    // popups de pontos
    for (const pop of JG.popups) {
        ctx.globalAlpha = clamp(pop.t, 0, 1);
        ctx.fillStyle = pop.cor;
        ctx.font = "bold 13px 'Chakra Petch', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(pop.texto, pop.x, pop.y - (1.1 - pop.t) * 14);
        ctx.globalAlpha = 1;
    }
    ctx.textAlign = "start";
}

// retângulo com cantos arredondados só nas bordas externas (visual de bloco)
function cantos(px, py, r) {
    ctx.beginPath();
    ctx.moveTo(px + r, py);
    ctx.arcTo(px + TS, py, px + TS, py + TS, r);
    ctx.arcTo(px + TS, py + TS, px, py + TS, r);
    ctx.arcTo(px, py + TS, px, py, r);
    ctx.arcTo(px, py, px + TS, py, r);
    ctx.closePath();
}

function desenharPacman() {
    const p = JG.pacman;
    const r = TS * 0.62;
    let abertura = Math.abs(Math.sin(p.boca)) * 0.62;
    let ang = DIRS[p.dir].ang;

    if (JG.modo === "morte") {
        // abre a boca ate sumir
        const t = clamp(JG.animMorte / 1.4, 0, 1);
        abertura = t * Math.PI * 0.98;
        ang = -Math.PI / 2;
        if (t >= 1) return;
    }

    ctx.fillStyle = "#ffe600";
    ctx.shadowColor = "rgba(255,230,0,0.65)";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, r, ang + abertura, ang + Math.PI * 2 - abertura);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
}

function desenharFantasma(f) {
    const r = TS * 0.62;
    const olhando = f.estado === "olhos";
    const medo = f.estado === "medo";
    const some = medo && JG.medo < DUR_MEDO_FLASH &&
        Math.floor(JG.tempoTotal * 6) % 2 === 0; // pisca antes de voltar

    if (!olhando) {
        ctx.fillStyle = some ? "#eaf6ff" : (medo ? "#2b3bff" : f.cor);
        ctx.shadowColor = medo ? "rgba(43,59,255,0.6)" : f.cor;
        ctx.shadowBlur = 9;
        ctx.beginPath();
        ctx.arc(f.x, f.y - r * 0.12, r, Math.PI, 0);
        // barra ondulada embaixo
        const base = f.y + r * 0.78;
        const onda = Math.sin(JG.tempoTotal * 9 + f.idx) * 2;
        ctx.lineTo(f.x + r, base);
        for (let i = 0; i < 4; i++) {
            const bx = f.x + r - (i + 0.5) * (r / 2);
            ctx.quadraticCurveTo(bx + r / 4, base + 5 + onda * (i % 2 ? -1 : 1), bx - r / 4, base);
        }
        ctx.lineTo(f.x - r, f.y - r * 0.12);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // olhos (sempre, exceto no azul piscando)
    if (!some) {
        const d = DIRS[f.dir] || DIRS.cima;
        const olhoY = f.y - r * 0.18;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(f.x - r * 0.34, olhoY, r * 0.28, 0, Math.PI * 2);
        ctx.arc(f.x + r * 0.34, olhoY, r * 0.28, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = medo ? "#2b3bff" : "#1b1464";
        ctx.beginPath();
        ctx.arc(f.x - r * 0.34 + d.x * 2.4, olhoY + d.y * 2.4, r * 0.14, 0, Math.PI * 2);
        ctx.arc(f.x + r * 0.34 + d.x * 2.4, olhoY + d.y * 2.4, r * 0.14, 0, Math.PI * 2);
        ctx.fill();
    }
}

function desenharFruta(x, y) {
    const nome = JG.fase.fruta.nome;
    const cores = {
        CEREJA: "#ff3b5c", MORANGO: "#ff3b5c", LARANJA: "#ff9d2b", MACA: "#ff3b5c",
        MELANCIA: "#3dff8b", GALAXIAN: "#00e5ff", SINO: "#ffe600", CHAVE: "#b9c6e0",
    };
    const cor = cores[nome] || "#ff3b5c";
    ctx.fillStyle = cor;
    ctx.shadowColor = cor;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(x - 4, y + 3, 4.6, 0, Math.PI * 2);
    ctx.arc(x + 4, y + 4.4, 4.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#3dff8b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 4, y);
    ctx.quadraticCurveTo(x + 2, y - 8, x + 7, y - 6);
    ctx.stroke();
}

/* ------------------------ laço principal e modos ------------------------- */

function passoSimulacao() {
    JG.tempoTotal += PASSO;

    for (let i = JG.popups.length - 1; i >= 0; i--) {
        JG.popups[i].t -= PASSO;
        if (JG.popups[i].t <= 0) JG.popups.splice(i, 1);
    }

    switch (JG.modo) {
        case "jogando": {
            JG.tempoFase += PASSO;
            if (JG.medo > 0) {
                JG.medo -= PASSO;
                if (JG.medo <= 0) {
                    JG.medo = 0;
                    for (const f of JG.fantasmas) if (f.estado === "medo") f.estado = "livre";
                }
            }
            atualizarCiclo();
            if (!JG.congelar) moverPacman();
            for (const f of JG.fantasmas) atualizarFantasma(f);
            if (JG.modo === "jogando") {
                colisoes();
                atualizarFruta();
            }
            break;
        }
        case "pronto": {
            // como no fliperama: todo mundo congela no "PREPARADO..."
            JG.temporizador -= PASSO;
            if (JG.temporizador <= 0) {
                JG.modo = "jogando";
                mostrarCamada(null);
            }
            break;
        }
        case "morte": {
            JG.animMorte += PASSO;
            if (JG.animMorte >= 1.5) {
                JG.vidas--;
                atualizarHud();
                if (JG.vidas <= 0) {
                    fimDeJogo();
                } else {
                    reiniciarPosicoes(false);
                    JG.modo = "pronto";
                    JG.temporizador = 1.6;
                    mostrarCamada("camPronto");
                }
            }
            break;
        }
        case "fimfase": {
            JG.temporizador -= PASSO;
            if (!JG.fimFaseOverlay && JG.temporizador <= 1.55) {
                JG.fimFaseOverlay = true;
                pontuar(BONUS_FIM_FASE);
                const proxima = faseDe(JG.nivel + 1);
                $("txtProxFase").textContent = "Próxima: " + proxima.nome;
                $("txtBonusFase").textContent = "Bônus: " + BONUS_FIM_FASE + " pontos";
                mostrarCamada("camFase");
            }
            if (JG.temporizador <= 0) {
                carregarFase(JG.nivel + 1);
                JG.modo = "pronto";
                JG.temporizador = 1.7;
                mostrarCamada("camPronto");
                Som.tocar("inicio");
            }
            break;
        }
        default:
            break; // outras telas esperam o jogador
    }
}

let acumulador = 0, ultimo = 0;

function laco(agora) {
    if (!ultimo) ultimo = agora;
    let dt = (agora - ultimo) / 1000;
    ultimo = agora;
    if (dt > 0.25) dt = 0.25; // aba escondida não acumula tempo morto
    acumulador += dt;
    let n = 0;
    while (acumulador >= PASSO && n < 16) {
        passoSimulacao();
        acumulador -= PASSO;
        n++;
    }
    desenhar();
    requestAnimationFrame(laco);
}

/* ------------------ 10. ranking, arranque e gancho de teste -------------- */

function iniciarAplicacao() {
    configurarCanvas();
    ligarEntrada();

    try {
        JG.recorde = lerRanking().reduce((m, i) => Math.max(m, i.pontos), 0);
    } catch (e) { JG.recorde = 0; }

    // mostra o nome salvo, se houver
    let salvo = "";
    try { salvo = localStorage.getItem("pacman.jogador") || ""; } catch (e) { }
    if (salvo) {
        JG.jogador = salvo;
        $("inpNome").value = salvo;
        entrarJogador(salvo);
    } else {
        mostrarCamada("camLogin");
        setTimeout(() => $("inpNome").focus(), 120);
    }

    atualizarHud();
    requestAnimationFrame(laco);
}

// gancho usado pelo ensaio automatizado (não afeta o jogador)
window.JG = JG;
window.__teste = {
    avancar(ms) {
        const n = Math.max(1, Math.round(ms / 1000 / PASSO));
        for (let i = 0; i < n; i++) passoSimulacao();
    },
    iniciar(nome) {
        entrarJogador(nome || "TESTE");
        iniciarPartida();
        JG.temporizador = 0.02;
        passoSimulacao();
        JG.pacman.dir = "cima"; // para cima = parede: nao come nada sem querer
    },
    modo() { return JG.modo; },
    pontos() { return JG.pontos; },
    vidas() { return JG.vidas; },
    nivel() { return JG.nivel; },
    moedasRest() { return JG.moedasRest; },
    medo() { return JG.medo; },
    estados() { return JG.fantasmas.map(f => f.estado); },
    teleportar(x, y) { JG.pacman.x = centroX(x); JG.pacman.y = centroY(y); },
    zerarMoedas() {
        for (let y = 0; y < ROWS; y++)
            for (let x = 0; x < COLS; x++) {
                const t = JG.grade[y][x].t;
                if (t === TIPO.MOEDA || t === TIPO.PASTILHA) JG.grade[y][x].t = TIPO.VAZIO;
            }
        JG.grade[1][2].t = TIPO.MOEDA; // deixa UMA moeda para disparar o fim da fase
        JG.moedasRest = 1;
    },
    fantasmaVivoMaisProximo() {
        let melhor = null, d = Infinity;
        for (const f of JG.fantasmas) {
            if (f.estado !== "livre") continue;
            const dd = dist2(f.x, f.y, JG.pacman.x, JG.pacman.y);
            if (dd < d) { d = dd; melhor = f; }
        }
        return melhor;
    },
    teleportarFantasma(idx) {
        const f = JG.fantasmas[idx];
        f.estado = JG.medo > 0 ? "medo" : "livre";
        f.x = JG.pacman.x; f.y = JG.pacman.y;
    },
    medoAtivo() { return JG.medo; },
    fruta() { return JG.fruta; },
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarAplicacao);
} else {
    iniciarAplicacao();
}
