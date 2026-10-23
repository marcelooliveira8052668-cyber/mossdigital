/* =====================================================================
   VELHA//CORE — lógica do jogo
   ---------------------------------------------------------------------
   CONFIG no topo: é o único bloco que o cliente precisa mexer.
   ===================================================================== */

const CONFIG = {
    nomeX: 'VOCÊ',
    nomeO: 'MÁQUINA',
    simboloX: 'X',
    simboloO: 'O',
    /* quando true, a máquina espera um instante antes de jogar de
       verdade e mostra o círculo girando. Some com false se quiser
       respostas instantâneas. */
    pensamento: true
};

const SIMBOLO_X = CONFIG.simboloX;
const SIMBOLO_O = CONFIG.simboloO;

/* As oito sequências que significam vitória. */
const LINHAS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const NIVEIS = {
    facil:   { rotulo: 'Fácil',      profundidade: 1 },
    medio:   { rotulo: 'Médio',      profundidade: 4 },
    dificil: { rotulo: 'Imbatível',  profundidade: 9 }
};

/* =====================================================================
   1. REGRAS
   ===================================================================== */

function quemGanhou(tabuleiro) {
    for (let i = 0; i < LINHAS.length; i++) {
        const linha = LINHAS[i];
        const a = linha[0], b = linha[1], c = linha[2];
        if (tabuleiro[a] &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]) {
            return { vencedor: tabuleiro[a], linha: linha };
        }
    }
    return null;
}

function tabuleiroCheio(tabuleiro) {
    return tabuleiro.every(function (celula) { return celula !== ''; });
}

function casasLivres(tabuleiro) {
    const livres = [];
    for (let i = 0; i < tabuleiro.length; i++) {
        if (tabuleiro[i] === '') livres.push(i);
    }
    return livres;
}

/* =====================================================================
   2. INTELIGÊNCIA DA MÁQUINA
   Minimax com poda alfa-beta. Na dificuldade "Imbatível" a máquina
   nunca perde — ela só empata ou vence.
   ===================================================================== */

/* A ordem importa para a busca convergir mais rápido em empates:
   centro e cantos são as casas mais fortes. */
const ORDEM_FORTE = [4, 0, 2, 6, 8, 1, 3, 5, 7];

function melhorJogada(tabuleiro, simbolo, profundidade, alfa, beta) {
    const fim = quemGanhou(tabuleiro);
    if (fim) {
        /* Quem está a jogar agora é quem está prestes a levar o golpe.
           Se ele vence, a jogada dele é ótima: pontuação alta. */
        return { ponto: fim.vencedor === simbolo ? 10 : -10, casa: -1 };
    }
    if (tabuleiroCheio(tabuleiro) || profundidade === 0) {
        return { ponto: 0, casa: -1 };
    }

    const outro = simbolo === SIMBOLO_X ? SIMBOLO_O : SIMBOLO_X;
    const livres = casasLivres(tabuleiro)
        .sort(function (a, b) { return ORDEM_FORTE.indexOf(a) - ORDEM_FORTE.indexOf(b); });

    let melhorPonto = -Infinity;
    let melhorCasa = livres[0];

    for (let i = 0; i < livres.length; i++) {
        const casa = livres[i];
        tabuleiro[casa] = simbolo;
        const r = melhorJogada(tabuleiro, outro, profundidade - 1, alfa, beta);
        tabuleiro[casa] = '';

        if (r.ponto > melhorPonto) {
            melhorPonto = r.ponto;
            melhorCasa = casa;
        }
        if (melhorPonto > alfa) alfa = melhorPonto;
        if (beta <= alfa) break;   /* poda: este ramo não melhora o que já temos */
    }

    return { ponto: melhorPonto, casa: melhorCasa };
}

function escolherCasa(tabuleiro, simbolo, nivel) {
    const livres = casasLivres(tabuleiro);
    if (!livres.length) return -1;
    if (livres.length === 9) {
        /* Abertura sempre igual é monótono: sorteia entre as boas. */
        return ORDEM_FORTE[Math.floor(Math.random() * 5)];
    }

    const prof = NIVEIS[nivel].profundidade;
    const r = melhorJogada(tabuleiro.slice(), simbolo, prof, -Infinity, Infinity);
    return r.casa === -1 ? livres[0] : r.casa;
}

/* =====================================================================
   3. ESTADO
   ===================================================================== */

const estado = {
    tabuleiro: Array(9).fill(''),
    turno: SIMBOLO_X,
    encerrado: false,
    modo: 'maquina',       /* 'maquina' ou 'duo' */
    nivel: 'medio',
    placar: { X: 0, O: 0, empates: 0 },
    ultimoVencedor: '',
    sequencia: 0,
    sugestao: null,
    computadorPensando: false,
    temporizador: null,
    /* linha já vencida, para redesenhar se a janela mudar de tamanho */
    linhaVitoria: null,
    linhaVencedor: ''
};

function $(seletor) { return document.querySelector(seletor); }

const el = {
    moldura: $('#moldura'),
    tabuleiro: $('#tabuleiro'),
    trilhoVitoria: $('#trilho-vitoria'),
    msgPrincipal: $('#msg-principal'),
    msgExtra: $('#msg-extra'),
    placarX: $('#placar-x'),
    placarO: $('#placar-o'),
    placarEmpates: $('#placar-empates'),
    nomeX: $('#nome-x'),
    nomeO: $('#nome-o'),
    sequenciaX: $('#sequencia-x'),
    sequenciaO: $('#sequencia-o'),
    painelX: $('#painel-x'),
    painelO: $('#painel-o'),
    grupoNivel: $('#grupo-nivel'),
    btnProxima: $('#btn-proxima'),
    btnSugestao: $('#btn-sugestao'),
    btnZerar: $('#btn-zerar'),
    aviso: $('#aviso')
};

/* =====================================================================
   4. DESENHO
   ===================================================================== */

function montarTabuleiro() {
    el.tabuleiro.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const botao = document.createElement('button');
        botao.className = 'celula';
        botao.type = 'button';
        botao.dataset.casa = String(i);
        botao.setAttribute('aria-label', 'Casa ' + (i + 1) + ', vazia');
        botao.addEventListener('click', function () { aoClicar(i); });
        el.tabuleiro.appendChild(botao);
    }
}

function celula(i) { return el.tabuleiro.children[i]; }

function desenharTabuleiro() {
    for (let i = 0; i < 9; i++) {
        const b = celula(i);
        const marca = estado.tabuleiro[i];
        const vazia = marca === '';
        b.textContent = marca;
        b.dataset.marca = marca;
        b.dataset.vazia = vazia ? 'sim' : 'nao';
        b.disabled = !vazia || estado.encerrado || estado.computadorPensando;
        b.setAttribute(
            'aria-label',
            'Casa ' + (i + 1) + (vazia ? ', vazia' : ', marcada com ' + marca)
        );
    }
    /* A dica só aparece quando o humano pediu e o jogo não acabou. */
    for (let i = 0; i < 9; i++) {
        celula(i).dataset.dica =
            (estado.sugestao === i && !estado.encerrado) ? 'sim' : 'nao';
    }
}

function limparTrilho() {
    el.trilhoVitoria.className = 'trilho';
    el.trilhoVitoria.style.opacity = '0';
    estado.linhaVitoria = null;
    estado.linhaVencedor = '';
}

/* A linha de vitória é medida em pixels: pega o centro da primeira e da
   última casa da sequência, calcula a distância e o ângulo, e gira a
   barra com a variável --ang. Assim ela serve para horizontal, vertical
   e diagonal, em qualquer tamanho de célula e de tela. */
function desenharTrilho(linha, vencedor) {
    const moldura = el.moldura.getBoundingClientRect();
    const bordaCima = parseFloat(getComputedStyle(el.moldura).borderTopWidth) || 0;
    const bordaLado = parseFloat(getComputedStyle(el.moldura).borderLeftWidth) || 0;

    const p1 = celula(linha[0]).getBoundingClientRect();
    const p2 = celula(linha[2]).getBoundingClientRect();

    const x1 = p1.left + p1.width / 2 - moldura.left - bordaLado;
    const y1 = p1.top + p1.height / 2 - moldura.top - bordaCima;
    const x2 = p2.left + p2.width / 2 - moldura.left - bordaLado;
    const y2 = p2.top + p2.height / 2 - moldura.top - bordaCima;

    const comprimento = Math.hypot(x2 - x1, y2 - y1);
    const angulo = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    const trilho = el.trilhoVitoria;
    trilho.style.left = x1 + 'px';
    trilho.style.top = (y1 - 2) + 'px';          /* metade da altura de 4px */
    trilho.style.width = comprimento + 'px';
    trilho.style.opacity = '';
    trilho.style.setProperty('--ang', angulo + 'deg');
    trilho.className = 'trilho trilho--vitoria trilho--' + String(vencedor || 'x').toLowerCase();

    estado.linhaVitoria = linha;
    estado.linhaVencedor = vencedor || '';
}

/* Mudou o tamanho da janela? A linha é em px, então mede de novo. */
window.addEventListener('resize', function () {
    if (estado.encerrado && estado.linhaVitoria) {
        desenharTrilho(estado.linhaVitoria, estado.linhaVencedor);
    }
});

function pintarVitoria(linha) {
    linha.forEach(function (i) { celula(i).dataset.vitoria = 'sim'; });
}

function mensagem(principal, extra, tom) {
    el.msgPrincipal.textContent = principal;
    el.msgPrincipal.dataset.tom = tom || '';
    el.msgExtra.textContent = extra || '';
}

function atualizarPlacar() {
    el.placarX.textContent = estado.placar.X;
    el.placarO.textContent = estado.placar.O;
    el.placarEmpates.textContent = estado.placar.empates;

    el.painelX.dataset.ativo =
        (estado.turno === SIMBOLO_X && !estado.encerrado) ? 'sim' : 'nao';
    el.painelO.dataset.ativo =
        (estado.turno === SIMBOLO_O && !estado.encerrado) ? 'sim' : 'nao';

    el.sequenciaX.textContent = (estado.sequencia > 1 && estado.ultimoVencedor === SIMBOLO_X)
        ? estado.sequencia + ' seguidas' : '';
    el.sequenciaO.textContent = (estado.sequencia > 1 && estado.ultimoVencedor === SIMBOLO_O)
        ? estado.sequencia + ' seguidas' : '';

    el.painelX.dataset.lider = el.sequenciaX.textContent ? 'sim' : 'nao';
    el.painelO.dataset.lider = el.sequenciaO.textContent ? 'sim' : 'nao';
}

function nomeDe(simbolo) {
    if (estado.modo === 'duo') return simbolo === SIMBOLO_X ? 'Jogador 1' : 'Jogador 2';
    return simbolo === SIMBOLO_X ? CONFIG.nomeX : CONFIG.nomeO;
}

function atualizarNomes() {
    el.nomeX.textContent = nomeDe(SIMBOLO_X);
    el.nomeO.textContent = nomeDe(SIMBOLO_O);
}

function mostrarAviso(texto) {
    el.aviso.textContent = texto || '';
    el.aviso.hidden = !texto;
}

/* =====================================================================
   5. FLUXO
   ===================================================================== */

function aoClicar(indice) {
    if (estado.encerrado) return;
    if (estado.computadorPensando) return;
    if (estado.tabuleiro[indice] !== '') return;
    /* No modo máquina, só o humano joga no seu turno. */
    if (estado.modo === 'maquina' && estado.turno === SIMBOLO_O) return;

    jogar(indice, estado.turno);
}

function jogar(indice, simbolo) {
    if (estado.encerrado || estado.tabuleiro[indice] !== '') return;

    estado.tabuleiro[indice] = simbolo;
    estado.sugestao = null;
    desenharTabuleiro();

    const fim = quemGanhou(estado.tabuleiro);
    if (fim) { encerrar(fim); return; }
    if (tabuleiroCheio(estado.tabuleiro)) { encerrarEmpate(); return; }

    estado.turno = simbolo === SIMBOLO_X ? SIMBOLO_O : SIMBOLO_X;
    atualizarPlacar();

    if (estado.modo === 'maquina' && estado.turno === SIMBOLO_O) {
        vezDaMaquina();
    } else {
        mensagem('Vez de ' + nomeDe(estado.turno), 'Casa livre: sua escolha',
            estado.turno === SIMBOLO_X ? 'x' : 'o');
    }
}

function vezDaMaquina() {
    estado.computadorPensando = true;
    mensagem('Analisando as linhas...', 'A máquina está calculando a melhor casa', 'o');

    const alvo = escolherCasa(estado.tabuleiro, SIMBOLO_O, estado.nivel);
    const espera = CONFIG.pensamento ? (420 + Math.random() * 420) : 0;

    /* Acende o indicador antes de esperar: a animação continua correndo
       enquanto a máquina "pensa". */
    if (alvo >= 0) {
        celula(alvo).dataset.pensando = 'sim';
        celula(alvo).setAttribute(
            'aria-label', 'Casa ' + (alvo + 1) + ', a máquina vai jogar aqui');
    }

    estado.temporizador = setTimeout(function () {
        estado.computadorPensando = false;
        if (alvo >= 0) celula(alvo).dataset.pensando = 'nao';
        if (estado.encerrado) return;
        jogar(alvo, SIMBOLO_O);
    }, espera);
}

function encerrar(fim) {
    estado.encerrado = true;
    estado.computadorPensando = false;
    pintarVitoria(fim.linha);
    desenharTrilho(fim.linha, fim.vencedor);

    estado.placar[fim.vencedor] += 1;
    if (estado.ultimoVencedor === fim.vencedor) estado.sequencia += 1;
    else estado.sequencia = 1;
    estado.ultimoVencedor = fim.vencedor;
    atualizarPlacar();

    if (estado.modo === 'duo') {
        mensagem('Vitória de ' + nomeDe(fim.vencedor),
            fim.vencedor === SIMBOLO_X ? 'Jogador 1 venceu' : 'Jogador 2 venceu', 'vitoria');
    } else if (fim.vencedor === SIMBOLO_X) {
        mensagem('Você venceu a máquina!', 'Linhas fechadas — tente de novo', 'vitoria');
    } else {
        mensagem('A máquina venceu', 'Ela conhece todas as linhas. Jogue de novo', 'o');
    }

    el.tabuleiro.dataset.encerrado = 'sim';
    el.btnProxima.hidden = false;      /* a rodada acabou: o próximo passo é novo round */
    for (let i = 0; i < 9; i++) celula(i).disabled = true;
}

function encerrarEmpate() {
    estado.encerrado = true;
    estado.computadorPensando = false;
    estado.placar.empates += 1;
    estado.sequencia = 0;
    estado.ultimoVencedor = '';
    atualizarPlacar();

    mensagem('Empate!', 'Tabuleiro fechado — nenhum ponto marcado', '');
    el.tabuleiro.dataset.encerrado = 'sim';
    el.btnProxima.hidden = false;
    for (let i = 0; i < 9; i++) celula(i).disabled = true;
}

function novaRodada() {
    if (estado.temporizador) clearTimeout(estado.temporizador);
    estado.tabuleiro = Array(9).fill('');
    estado.turno = SIMBOLO_X;
    estado.encerrado = false;
    estado.sugestao = null;
    estado.computadorPensando = false;

    el.tabuleiro.dataset.encerrado = 'nao';
    el.btnProxima.hidden = true;       /* só volta a aparecer quando a rodada terminar */
    limparTrilho();
    desenharTabuleiro();
    atualizarPlacar();
    mostrarAviso('');

    mensagem('Vez de ' + nomeDe(SIMBOLO_X), 'Casa livre: sua escolha', 'x');
}

function reiniciarTudo() {
    estado.placar = { X: 0, O: 0, empates: 0 };
    estado.ultimoVencedor = '';
    estado.sequencia = 0;
    novaRodada();
}

/* =====================================================================
   6. SUGESTÃO DE JOGADA
   Mostra a casa que o minimax escolheria no lugar do humano. É dica,
   não automático: o clique continua sendo do jogador.
   ===================================================================== */

let temporizadorSugestao = null;

function pedirSugestao() {
    if (estado.encerrado || estado.computadorPensando) return;
    if (estado.modo === 'maquina' && estado.turno !== SIMBOLO_X) return;

    const casa = escolherCasa(estado.tabuleiro, estado.turno, 'dificil');
    if (casa < 0) return;

    estado.sugestao = casa;
    desenharTabuleiro();
    mostrarAviso('Dica: a casa ' + (casa + 1) + ' é a mais forte no momento.');

    if (temporizadorSugestao) clearTimeout(temporizadorSugestao);
    temporizadorSugestao = setTimeout(function () {
        if (estado.sugestao === casa) {
            estado.sugestao = null;
            desenharTabuleiro();
            mostrarAviso('');
        }
    }, 6000);
}

/* =====================================================================
   7. CONTROLES
   ===================================================================== */

function trocarModo(modo) {
    if (estado.modo === modo) return;
    estado.modo = modo;

    document.querySelectorAll('.grupo--modo .opcao').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.dataset.modo === modo));
    });

    /* A dificuldade só faz sentido contra a máquina. */
    const travado = modo === 'duo';
    el.grupoNivel.setAttribute('aria-disabled', String(travado));
    el.btnSugestao.hidden = travado;

    atualizarNomes();      /* VOCÊ/MÁQUINA viram Jogador 1/Jogador 2 */
    reiniciarTudo();
}

function trocarNivel(nivel) {
    if (estado.nivel === nivel) return;
    estado.nivel = nivel;

    document.querySelectorAll('.grupo--nivel .opcao').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.dataset.nivel === nivel));
    });

    reiniciarTudo();
}

document.querySelectorAll('.grupo--modo .opcao').forEach(function (botao) {
    botao.addEventListener('click', function () { trocarModo(botao.dataset.modo); });
});

document.querySelectorAll('.grupo--nivel .opcao').forEach(function (botao) {
    botao.addEventListener('click', function () { trocarNivel(botao.dataset.nivel); });
});

el.btnProxima.addEventListener('click', novaRodada);
el.btnSugestao.addEventListener('click', pedirSugestao);
el.btnZerar.addEventListener('click', function () {
    reiniciarTudo();
    mostrarAviso('Placar zerado.');
    setTimeout(function () { mostrarAviso(''); }, 3000);
});

/* =====================================================================
   8. TECLADO
   As casas 1 a 9 marcam direto; N abre a próxima rodada.
   ===================================================================== */

document.addEventListener('keydown', function (evento) {
    if (evento.ctrlKey || evento.metaKey || evento.altKey) return;

    if (/^[1-9]$/.test(evento.key)) {
        aoClicar(Number(evento.key) - 1);
        return;
    }

    if (evento.key === 'n' || evento.key === 'N') novaRodada();
});

/* =====================================================================
   9. PARTIDA DE ABERTURA
   ===================================================================== */

montarTabuleiro();
atualizarNomes();
novaRodada();
