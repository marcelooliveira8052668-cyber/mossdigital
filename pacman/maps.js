/* ============================================================================
   PAC-MAN//NEON - plantas das fases e tabela de dificuldade

   Legenda dos tiles:
     #  parede        .  moeda          o  pastilha       ' ' vazio
     -  porta da casa (so fantasmas passam)
     G  chao da casa  P  inicio do pacman   F  ponto da fruta

   As 5 plantas foram validadas por programa: simetria exata, tunel aberto,
   todas as moedas alcancaveis e a casa dos fantasmas ligada a porta.
   Fases 6 em diante reusam o NUCLEO com velocidade crescente.
   ============================================================================ */

const PLANTAS = {
    fase1: [
        "###################",
        "#o.....o###o.....o#",
        "#.##.##.###.##.##.#",
        "#.......###.......#",
        "##.#.#.#####.#.#.##",
        "#.......   .......#",
        "#.###..##-##..###.#",
        "#......#GGG#......#",
        "#......#GGG#......#",
        "  ...............  ",
        "#.#####.###.#####.#",
        "#....... F .......#",
        "#....... P .......#",
        "#.......###.......#",
        "##.#.#.#####.#.#.##",
        "#.......###.......#",
        "#.##.##.###.##.##.#",
        "#.......###.......#",
        "#.#...#.###.#...#.#",
        "#.......###.......#",
        "###################",
    ],
    fase2: [
        "###################",
        "#o.....o###o.....o#",
        "#.###.#.###.#.###.#",
        "#.....#.###.#.....#",
        "####.#..###..#.####",
        "#.......   .......#",
        "#.###..##-##..###.#",
        "#......#GGG#......#",
        "#......#GGG#......#",
        "  ...............  ",
        "#.#####.###.#####.#",
        "#....... F .......#",
        "#....... P .......#",
        "#.###.#.###.#.###.#",
        "#o...#..###..#...o#",
        "#.#####.###.#####.#",
        "#.......###.......#",
        "#.###.#.###.#.###.#",
        "#.....#.###.#.....#",
        "#.#####.###.#####.#",
        "###################",
    ],
    fase3: [
        "###################",
        "#o.....o###o.....o#",
        "#.#.#.#.###.#.#.#.#",
        "#.#.....###.....#.#",
        "#.###.#.###.#.###.#",
        "#.......   .......#",
        "#.###..##-##..###.#",
        "#......#GGG#......#",
        "#......#GGG#......#",
        "  ...............  ",
        "#.#####.###.#####.#",
        "#....... F .......#",
        "#....... P .......#",
        "#.....#.###.#.....#",
        "#.###.#.###.#.###.#",
        "#.#.....###.....#.#",
        "#.#.#.#.###.#.#.#.#",
        "#o#...#.###.#...#o#",
        "#.#####.###.#####.#",
        "#.......###.......#",
        "###################",
    ],
    fase4: [
        "###################",
        "#o.....o###o.....o#",
        "#.#####.###.#####.#",
        "#.#...#.###.#...#.#",
        "#.#.#...###...#.#.#",
        "#.......   .......#",
        "#.###..##-##..###.#",
        "#......#GGG#......#",
        "#......#GGG#......#",
        "  ...............  ",
        "#.#####.###.#####.#",
        "#....... F .......#",
        "#....... P .......#",
        "#.....#.###.#.....#",
        "#.###.#.###.#.###.#",
        "#o....#.###.#....o#",
        "#.#####.###.#####.#",
        "#.......###.......#",
        "#.###############.#",
        "#.......###.......#",
        "###################",
    ],
    fase5: [
        "###################",
        "#o.....o###o.....o#",
        "#.###.#.###.#.###.#",
        "#.#...#.###.#...#.#",
        "#.#.###.###.###.#.#",
        "#.......   .......#",
        "#.###..##-##..###.#",
        "#......#GGG#......#",
        "#......#GGG#......#",
        "  ...............  ",
        "#.#####.###.#####.#",
        "#....... F .......#",
        "#....... P .......#",
        "#.......###.......#",
        "#.#.###.###.###.#.#",
        "#.#.....###.....#.#",
        "#.###.#.###.#.###.#",
        "#o....#.###.#....o#",
        "#.#####.###.#####.#",
        "#.......###.......#",
        "###################",
    ],
};

/* Tabela de fases: cada fase endurece de um jeito proprio.
   velPac/velFant/velPresa = tiles por segundo | assustado = segundos da pastilha
   ciclo = alternancia perseguido/espalhado em segundos (-1 = para sempre)
   liberacao = atraso para Pinky, Inky e Clyde sair da casa (segundos) */
const FASES = [
    {
        nome: "O DESPERTAR",
        mapa: PLANTAS.fase1,
        velPac: 7.4, velFant: 6.6, velPresa: 4.0,
        assustado: 7.0,
        ciclo: [7, 20, 7, 20, 5, 20, 5, -1],
        liberacao: [4.0, 9.0, 14.0],
        fruta: { nome: "CEREJA", pontos: 100 }
    },
    {
        nome: "O LABIRINTO",
        mapa: PLANTAS.fase2,
        velPac: 7.5, velFant: 7.0, velPresa: 4.1,
        assustado: 6.0,
        ciclo: [7, 20, 7, 20, 5, 17, 5, -1],
        liberacao: [3.0, 7.0, 11.0],
        fruta: { nome: "MORANGO", pontos: 300 }
    },
    {
        nome: "A TEIA",
        mapa: PLANTAS.fase3,
        velPac: 7.6, velFant: 7.4, velPresa: 4.2,
        assustado: 5.0,
        ciclo: [7, 20, 7, 20, 5, 17, 5, -1],
        liberacao: [2.5, 6.0, 9.0],
        fruta: { nome: "LARANJA", pontos: 500 }
    },
    {
        nome: "O CAOS",
        mapa: PLANTAS.fase4,
        velPac: 7.7, velFant: 7.8, velPresa: 4.3,
        assustado: 4.0,
        ciclo: [5, 20, 5, 20, 5, 17, 5, -1],
        liberacao: [2.0, 5.0, 7.0],
        fruta: { nome: "MACA", pontos: 700 }
    },
    {
        nome: "O NUCLEO",
        mapa: PLANTAS.fase5,
        velPac: 8.0, velFant: 8.2, velPresa: 4.4,
        assustado: 3.5,
        ciclo: [5, 20, 5, 20, 4, 17, 4, -1],
        liberacao: [1.5, 4.0, 6.0],
        fruta: { nome: "MELANCIA", pontos: 1000 }
    },
];

/* Alem da quinta fase o jogo entra em modo infinito: mesmo labirinto,
   fantasmas cada vez mais rapidos, assustado cada vez mais curto e
   frutas mais valiosas (2000, 3000, 5000...). */
const FRUTAS_INFINITO = [
    { nome: "GALAXIAN", pontos: 2000 },
    { nome: "SINO",     pontos: 3000 },
    { nome: "CHAVE",    pontos: 5000 },
];

function faseDe(nivel) {
    const base = FASES[Math.min(nivel, FASES.length) - 1];
    if (nivel <= FASES.length) return base;
    const extra = nivel - FASES.length;
    return Object.assign({}, base, {
        nome: "O NUCLEO +" + extra,
        velFant: Math.min(base.velFant + extra * 0.3, 10.5),
        assustado: Math.max(base.assustado - extra * 0.25, 2.0),
        liberacao: base.liberacao.map(t => Math.max(t - extra * 0.4, 0.6)),
        fruta: FRUTAS_INFINITO[Math.min(extra, FRUTAS_INFINITO.length) - 1] || FRUTAS_INFINITO[FRUTAS_INFINITO.length - 1],
    });
}

