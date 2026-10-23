Som.desligar();
const errosJs = [];
window.addEventListener("error", (e) => errosJs.push(String(e.message)));
const resultados = [];
const log = document.getElementById("log");
function t(id, ok, info) {
    resultados.push({ id: id, ok: !!ok, info: info == null ? "" : String(info) });
    log.textContent += (ok ? "OK  " : "FALHA") + " " + id + " " + (info == null ? "" : info) + "\n";
}
// prende todos os fantasmas na casa para os testes serem deterministicos
function prenderTodos() {
    const lugares = [[9, 7], [8, 8], [10, 8]];
    JG.fantasmas.forEach((f, i) => {
        f.estado = "casa"; f.espera = 9999;
        const l = lugares[i - 1] || [9, 7];
        f.x = centroX(l[0]); f.yCasa = centroY(l[1]); f.y = f.yCasa; f.dir = "cima";
    });
}

function rodar() {
    try {
        // ---------- 1. tela de login ----------
        t("1_loginVisivel", document.getElementById("camLogin").classList.contains("ativa"));

        // ---------- 2. entrar e iniciar ----------
        __teste.iniciar("ANA");
        t("2_jogador", JG.jogador === "ANA", JG.jogador);
        t("2_modoPronto", __teste.modo() === "pronto", __teste.modo());
        __teste.avancar(2100);
        t("2_modoJogando", __teste.modo() === "jogando", __teste.modo());
        t("2_hudJogador", document.getElementById("hudJogador").textContent === "ANA");
        t("2_vidas", __teste.vidas() === 3, __teste.vidas());
        prenderTodos();

        // ---------- 3. fase 1 ----------
        t("3_grade", JG.grade.length === 21 && JG.grade[0].length === 19);
        t("3_moedas", __teste.moedasRest() === 209, __teste.moedasRest());

        // ---------- 4. comer moeda ----------
        const antesMoeda = __teste.moedasRest();
        __teste.teleportar(2, 1);
        __teste.avancar(120);
        t("4_moedaComida", __teste.moedasRest() === antesMoeda - 1, __teste.moedasRest());
        t("4_pontos", __teste.pontos() === 10, __teste.pontos());

        // ---------- 5. pastilha e medo ----------
        JG.fantasmas[0].estado = "livre"; // Blinky solto para o teste de azul
        __teste.teleportar(1, 1);
        __teste.avancar(120);
        t("5_pastilhaPontos", __teste.pontos() === 60, __teste.pontos());
        t("5_medoLigado", __teste.medo() > 5, __teste.medo().toFixed(2));
        const estados = __teste.estados();
        t("5_blinkyAzul", estados[0] === "medo", estados.join(","));
        t("5_casaEsperando", estados[1] === "casa" && estados[2] === "casa" && estados[3] === "casa", estados.join(","));

        // ---------- 6. comer fantasma azul ----------
        __teste.teleportarFantasma(0);
        __teste.avancar(60);
        t("6_fantasmaComido", JG.fantasmas[0].estado === "olhos", JG.fantasmas[0].estado);
        t("6_pontos200", __teste.pontos() === 260, __teste.pontos());

        // ---------- 7. olhos voltam para a casa ----------
        __teste.avancar(9000);
        t("7_olhosFora", ["casa", "saindo", "livre"].indexOf(JG.fantasmas[0].estado) !== -1, JG.fantasmas[0].estado);
        prenderTodos();

        // ---------- 8. perde vida ao encostar em fantasma normal ----------
        const vidasAntes = __teste.vidas();
        __teste.avancar(7000); // espera o medo acabar
        __teste.teleportarFantasma(1);
        __teste.avancar(100);
        t("8_morteIniciada", __teste.modo() === "morte", __teste.modo());
        __teste.avancar(1700);
        t("8_vidaPerdida", __teste.vidas() === vidasAntes - 1, __teste.vidas());
        __teste.avancar(1800);
        t("8_voltaAJogar", __teste.modo() === "jogando", __teste.modo());
        t("8_pinkyNaCasa", JG.fantasmas[1].estado === "casa", JG.fantasmas[1].estado);

        // ---------- 9. limpa a fase e passa para a 2 ----------
        prenderTodos();
        __teste.zerarMoedas();
        __teste.teleportar(2, 1);
        __teste.avancar(120);
        t("9_fimFase", __teste.modo() === "fimfase", __teste.modo());
        __teste.avancar(3300);
        t("9_fase2", __teste.nivel() === 2, __teste.nivel());
        t("9_modoPronto2", __teste.modo() === "pronto", __teste.modo());
        __teste.avancar(1900);
        t("9_jogandoFase2", __teste.modo() === "jogando", __teste.modo());
        t("9_hudFase2", document.getElementById("hudFase").textContent === "2");
        t("9_moedasFase2", __teste.moedasRest() === 187, __teste.moedasRest());
        t("9_bonus", __teste.pontos() === 770, __teste.pontos());

        // ---------- 10. liberacao dos fantasmas ----------
        prenderTodos();
        JG.fantasmas[1].espera = 2.5; // Pinky sai em 2.5s neste teste
        __teste.avancar(4200);
        t("10_pinkySaiu", JG.fantasmas[1].estado !== "casa", JG.fantasmas[1].estado);

        // ---------- 11. ciclo perseguicao ----------
        t("11_perseguicao", JG.perseguicao === true, JG.perseguicao);

        // ---------- 12. ponto da fruta ----------
        t("12_pontoFruta", JG.posF && JG.posF.x === 9 && JG.posF.y === 11, JSON.stringify(JG.posF));

        // ---------- 13. pausa ----------
        prenderTodos();
        document.getElementById("btPausa").click();
        t("13_pausa", __teste.modo() === "pausa", __teste.modo());
        t("13_camadaPausa", document.getElementById("camPausa").classList.contains("ativa"));
        document.getElementById("btContinuar").click();
        t("13_continuou", __teste.modo() === "jogando", __teste.modo());

        // ---------- 14. fim de jogo e ranking ----------
        for (let i = 0; i < 8 && __teste.modo() !== "fim"; i++) {
            __teste.teleportarFantasma(0);
            __teste.avancar(120);
            if (__teste.modo() === "morte") { __teste.avancar(1700); __teste.avancar(1900); }
        }
        t("14_fimDeJogo", __teste.modo() === "fim", __teste.modo());
        t("14_camadaFim", document.getElementById("camFim").classList.contains("ativa"));
        t("14_vidasZero", __teste.vidas() === 0, __teste.vidas());
        let rk = -1;
        try { rk = JSON.parse(localStorage.getItem("pacman.ranking") || "[]").length; } catch (e) { }
        t("14_rankingSalvo", rk === 1 || rk === -1, "entradas=" + rk);
        t("14_fimPontos", document.getElementById("fimPontos").textContent === String(__teste.pontos()));

        // ---------- 15. trocar jogador ----------
        document.getElementById("btTrocarFim").click();
        t("15_login", __teste.modo() === "login", __teste.modo());
        document.getElementById("inpNome").value = "BOB";
        document.getElementById("formLogin").dispatchEvent(new Event("submit", { cancelable: true }));
        t("15_novoJogador", JG.jogador === "BOB" && __teste.modo() === "titulo", JG.jogador + "/" + __teste.modo());
        t("15_hud", document.getElementById("hudJogador").textContent === "BOB");

        // ---------- 16. instrucoes e ranking vao e voltam ----------
        document.getElementById("btInstrucoes").click();
        t("16_instrucoes", __teste.modo() === "instrucoes" && document.getElementById("camInstrucoes").classList.contains("ativa"));
        document.getElementById("btVoltarInstrucoes").click();
        t("16_voltouTitulo", __teste.modo() === "titulo", __teste.modo());
        document.getElementById("btRanking").click();
        t("16_ranking", __teste.modo() === "ranking");
        document.getElementById("btVoltarRanking").click();
        t("16_voltouTitulo2", __teste.modo() === "titulo", __teste.modo());

        // ---------- 17. todas as fases carregam ----------
        let todasOk = true, detalhe = "";
        for (let n = 1; n <= 8; n++) {
            carregarFase(n);
            const okGrade = JG.grade.length === 21 && JG.grade[0].length === 19 && __teste.moedasRest() > 100;
            if (!okGrade) { todasOk = false; detalhe = "fase " + n; break; }
        }
        t("17_oitoFases", todasOk, detalhe);
        t("17_infinito", faseDe(6).velFant > faseDe(5).velFant && faseDe(7).fruta.pontos === 3000,
          faseDe(6).velFant + "/" + faseDe(7).fruta.pontos);

        // ---------- 18. sem erros de javascript ----------
        t("18_semErros", errosJs.length === 0, errosJs.join(" | "));
    } catch (e) {
        t("99_excecao", false, (e && e.stack ? e.stack.slice(0, 300) : String(e)));
    }

    const falhas = resultados.filter(r => !r.ok).length;
    document.title = "##json##" + JSON.stringify({
        total: resultados.length, falhas: falhas,
        lista: resultados.filter(r => !r.ok).map(r => r.id + ":" + r.info),
        erros: errosJs.length,
    }) + "##fim##";
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(rodar, 250));
else setTimeout(rodar, 250);
