
/* ==========================================================
   CÓDIGO & CONHECIMENTO
   LIVRO DIGITAL DE PROGRAMAÇÃO WEB

   Arquivo: js/script.js

   Neste arquivo, eu desenvolvo a navegação do meu livro.
   O leitor poderá avançar, voltar e acessar o sumário.
   ========================================================== */


/* ==========================================================
   1. LOCALIZO AS PÁGINAS DO LIVRO
   ========================================================== */

// Seleciono todas as seções que representam páginas.
const paginas = Array.from(document.querySelectorAll(".pagina"));

// Guardo a posição da página que está aberta.
let paginaAtual = 0;


/* ==========================================================
   2. LOCALIZO OS BOTÕES
   ========================================================== */

// Seleciono o botão para voltar uma página.
const botaoAnterior = document.getElementById("pagina-anterior");

// Seleciono o botão para avançar uma página.
const botaoProximo = document.getElementById("proxima-pagina");

// Seleciono o botão que abre o sumário.
const botaoSumario = document.getElementById("botao-sumario");

// Seleciono o texto que informa a página atual.
const indicadorPagina = document.getElementById("indicador-pagina");


/* ==========================================================
   3. CRIO A FUNÇÃO PARA EXIBIR UMA PÁGINA
   ========================================================== */

function mostrarPagina(indice) {

    // Verifico se a página solicitada existe.
    if (indice < 0 || indice >= paginas.length) {
        return;
    }

    // Percorro todas as páginas do livro.
    paginas.forEach((pagina, posicao) => {

        // Mostro apenas a página selecionada.
        pagina.hidden = posicao !== indice;

    });

    // Atualizo o número da página atual.
    paginaAtual = indice;

    // Atualizo o indicador de leitura.
    indicadorPagina.textContent =
        `Página ${paginaAtual + 1} de ${paginas.length}`;

    // Desativo o botão anterior quando estou na capa.
    botaoAnterior.disabled = paginaAtual === 0;

    // Desativo o botão próximo quando chego ao final.
    botaoProximo.disabled =
        paginaAtual === paginas.length - 1;

    // Volto ao início da tela ao mudar de página.
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* ==========================================================
   4. PROGRAMO O BOTÃO PRÓXIMA
   ========================================================== */

botaoProximo.addEventListener("click", function () {

    // Avanço uma posição no livro.
    mostrarPagina(paginaAtual + 1);

});


/* ==========================================================
   5. PROGRAMO O BOTÃO ANTERIOR
   ========================================================== */

botaoAnterior.addEventListener("click", function () {

    // Volto uma posição no livro.
    mostrarPagina(paginaAtual - 1);

});


/* ==========================================================
   6. PROGRAMO O BOTÃO SUMÁRIO
   ========================================================== */

botaoSumario.addEventListener("click", function () {

    // Localizo a página do sumário pelo seu identificador.
    const indiceSumario = paginas.findIndex(function (pagina) {
        return pagina.id === "sumario";
    });

    // Abro o sumário, caso ele exista.
    if (indiceSumario !== -1) {
        mostrarPagina(indiceSumario);
    }

});


/* ==========================================================
   7. PROGRAMO OS LINKS INTERNOS DO SUMÁRIO
   ========================================================== */

// Seleciono os links que apontam para páginas do livro.
const linksInternos = document.querySelectorAll('a[href^="#"]');

// Percorro cada link encontrado.
linksInternos.forEach(function (link) {

    // Escuto o clique do leitor.
    link.addEventListener("click", function (evento) {

        // Identifico o destino do link.
        const destino = link.getAttribute("href").slice(1);

        // Procuro a página correspondente.
        const indiceDestino = paginas.findIndex(function (pagina) {
            return pagina.id === destino;
        });

        // Se a página ainda não existe, não navego.
        if (indiceDestino === -1) {
            evento.preventDefault();
            return;
        }

        // Impedo a navegação padrão para controlar a exibição.
        evento.preventDefault();

        // Mostro a página solicitada.
        mostrarPagina(indiceDestino);

    });

});


/* ==========================================================
   8. PERMITO NAVEGAR PELO TECLADO
   ========================================================== */

document.addEventListener("keydown", function (evento) {

    // Evito interferir quando o leitor está digitando.
    const elementoAtivo = document.activeElement;

    if (
        elementoAtivo.tagName === "INPUT" ||
        elementoAtivo.tagName === "TEXTAREA" ||
        elementoAtivo.tagName === "SELECT" ||
        elementoAtivo.isContentEditable
    ) {
        return;
    }

    // A seta direita avança uma página.
    if (evento.key === "ArrowRight") {
        mostrarPagina(paginaAtual + 1);
    }

    // A seta esquerda volta uma página.
    if (evento.key === "ArrowLeft") {
        mostrarPagina(paginaAtual - 1);
    }

});


/* ==========================================================
   9. INICIO O LIVRO PELA CAPA
   ========================================================== */

// Exibo a primeira página assim que o site é carregado.
mostrarPagina(0);


// =========================================================
// LABORATÓRIO 1 — MEU PRIMEIRO PROGRAMA JAVASCRIPT
//
// Eu programo o botão criado na página 8 do meu livro.
// Quando o estudante clicar, uma mensagem será exibida.
// =========================================================


// Eu procuro no HTML o botão que possui o id "executar-programa".
const botaoExecutar = document.getElementById("executar-programa");

// Eu procuro no HTML o parágrafo que receberá a mensagem.
const mensagemLaboratorio = document.getElementById("mensagem-laboratorio");


// Eu verifico se os dois elementos foram encontrados no HTML.
if (botaoExecutar && mensagemLaboratorio) {

    // Eu adiciono um evento para detectar o clique no botão.
    botaoExecutar.addEventListener("click", function () {

        // Eu modifico o texto do parágrafo quando o botão é clicado.
        mensagemLaboratorio.textContent =
            "🎉 Parabéns! Você executou seu primeiro programa JavaScript!";

        // Eu altero o texto do próprio botão depois da execução.
        botaoExecutar.textContent = "Programa executado!";

        // Eu desativo o botão para evitar cliques repetidos.
        botaoExecutar.disabled = true;

    // Eu encerro a função responsável por responder ao clique.
    });

// Eu encerro a verificação dos elementos.
}


// =========================================================
// LABORATÓRIO 2 — SIMULADOR DE DECISÃO
//
// Eu utilizo uma condição para verificar a nota
// informada pelo estudante.
// =========================================================


// Eu encontro o campo no qual o estudante informa a nota.
const campoNota = document.getElementById("nota-estudante");

// Eu encontro o botão que executará a verificação.
const botaoVerificarNota = document.getElementById("verificar-nota");

// Eu encontro o parágrafo que apresentará o resultado.
const resultadoNota = document.getElementById("resultado-nota");


// Eu verifico se os três elementos existem na página.
if (campoNota && botaoVerificarNota && resultadoNota) {

    // Eu acompanho os cliques no botão de verificação.
    botaoVerificarNota.addEventListener("click", function () {

        // Eu guardo o texto digitado pelo estudante.
        const textoDigitado = campoNota.value.trim();

        // Eu verifico se o campo está vazio.
        if (textoDigitado === "") {

            // Eu solicito que o estudante informe uma nota.
            resultadoNota.textContent = "Digite uma nota de 0 a 10.";

            // Eu interrompo a função porque não há nota para verificar.
            return;

        // Eu encerro a verificação do campo vazio.
        }

        // Eu converto o texto digitado para um número.
        const nota = Number(textoDigitado);

        // Eu verifico se a nota é válida e está entre 0 e 10.
        if (!Number.isFinite(nota) || nota < 0 || nota > 10) {

            // Eu informo que o valor digitado não é permitido.
            resultadoNota.textContent = "Informe uma nota válida entre 0 e 10.";

            // Eu interrompo a execução para evitar um resultado incorreto.
            return;

        // Eu encerro a validação da nota.
        }

        // Eu verifico se a nota atende ao critério do exemplo.
        if (nota >= 7) {

            // Eu apresento a mensagem correspondente à condição verdadeira.
            resultadoNota.textContent =
                "Parabéns! Você foi aprovado no exemplo!";

        // Eu defino o que acontece quando a nota é menor que 7.
        } else {

            // Eu apresento a mensagem correspondente à condição falsa.
            resultadoNota.textContent =
                "Continue estudando e praticando!";

        // Eu encerro a estrutura de decisão.
        }

    // Eu encerro a função executada quando o botão é clicado.
    });

// Eu encerro a verificação dos elementos do laboratório.
}


// =========================================================
// LABORATÓRIO 3 — EDITOR INTERATIVO DE HTML
//
// Eu leio o HTML digitado pelo estudante e
// apresento o resultado em uma área isolada.
// =========================================================


// Eu encontro o campo onde o estudante escreve HTML.
const editorHTML = document.getElementById("editor-html");

// Eu encontro o botão que executará a visualização.
const botaoExecutarHTML = document.getElementById("executar-html");

// Eu encontro o iframe que apresentará o resultado.
const visualizacaoHTML = document.getElementById("visualizacao-html");


// Eu verifico se os três elementos existem no documento.
if (editorHTML && botaoExecutarHTML && visualizacaoHTML) {

    // Eu crio uma função para atualizar a visualização.
    function executarCodigoHTML() {

        // Eu leio o código digitado pelo estudante.
        const codigoDigitado = editorHTML.value;

        // Eu envio o HTML para o documento interno do iframe.
        visualizacaoHTML.srcdoc = codigoDigitado;

    // Eu encerro a função responsável pela visualização.
    }

    // Eu acompanho os cliques no botão Executar HTML.
    botaoExecutarHTML.addEventListener("click", executarCodigoHTML);

    // Eu apresento o exemplo inicial assim que a página é carregada.
    executarCodigoHTML();

// Eu encerro a verificação dos elementos do laboratório.
}


// =========================================================
// LABORATÓRIO 4 — FORMULÁRIO DE CADASTRO
//
// Eu programo um formulário didático que verifica
// os campos e apresenta uma mensagem ao estudante.
// =========================================================


// Eu encontro o formulário pelo seu identificador.
const formularioEstudante = document.getElementById("formulario-estudante");

// Eu encontro o campo utilizado para informar o nome.
const nomeEstudante = document.getElementById("nome-estudante");

// Eu encontro o campo utilizado para informar o e-mail.
const emailEstudante = document.getElementById("email-estudante");

// Eu encontro a lista de cursos disponíveis.
const cursoEstudante = document.getElementById("curso-estudante");

// Eu encontro o espaço reservado para a mensagem.
const mensagemInscricao = document.getElementById("mensagem-inscricao");


// Eu verifico se todos os elementos existem no documento.
if (
    formularioEstudante &&
    nomeEstudante &&
    emailEstudante &&
    cursoEstudante &&
    mensagemInscricao
) {

    // Eu acompanho o evento de envio do formulário.
    formularioEstudante.addEventListener("submit", function (evento) {

        // Eu impeço que o navegador recarregue a página.
        evento.preventDefault();

        // Eu leio o nome e retiro espaços desnecessários.
        const nome = nomeEstudante.value.trim();

        // Eu leio o e-mail e retiro espaços desnecessários.
        const email = emailEstudante.value.trim();

        // Eu identifico o curso selecionado.
        const curso = cursoEstudante.value;

        // Eu verifico se algum campo obrigatório está vazio.
        if (nome === "" || email === "" || curso === "") {

            // Eu apresento uma mensagem solicitando o preenchimento.
            mensagemInscricao.textContent =
                "Preencha todos os campos antes de continuar.";

            // Eu interrompo a função para evitar uma confirmação incorreta.
            return;

        // Eu encerro a verificação dos campos vazios.
        }

        // Eu verifico se o e-mail atende à validação nativa do navegador.
        if (!emailEstudante.validity.valid) {

            // Eu informo que o e-mail precisa ser corrigido.
            mensagemInscricao.textContent =
                "Confira o endereço de e-mail informado.";

            // Eu interrompo a execução.
            return;

        // Eu encerro a verificação do e-mail.
        }

        // Eu apresento uma confirmação personalizada.
        mensagemInscricao.textContent =
            `Parabéns, ${nome}! Você concluiu a simulação de inscrição no curso de ${curso}.`;

        // Eu limpo os campos depois da simulação.
        formularioEstudante.reset();

    // Eu encerro a função responsável pelo envio.
    });

// Eu encerro a verificação dos elementos do formulário.
}


// =========================================================
// LABORATÓRIO 5 — ACESSIBILIDADE
//
// Eu demonstro uma interação que pode ser
// realizada com mouse ou teclado.
// =========================================================


// Eu encontro o botão do laboratório de acessibilidade.
const botaoAcessibilidade = document.getElementById("botao-acessibilidade");

// Eu encontro o parágrafo que apresentará a mensagem.
const mensagemAcessibilidade = document.getElementById("mensagem-acessibilidade");


// Eu verifico se os dois elementos existem no HTML.
if (botaoAcessibilidade && mensagemAcessibilidade) {

    // Eu acompanho a ativação do botão.
    botaoAcessibilidade.addEventListener("click", function () {

        // Eu apresento a confirmação da atividade.
        mensagemAcessibilidade.textContent =
            "Muito bem! Você ativou um botão HTML acessível.";

    // Eu encerro a função de resposta à ativação.
    });

// Eu encerro a verificação dos elementos.
}


/* =========================================================
   PÁGINA 19 — LABORATÓRIO INTERATIVO DO BOX MODEL

   Eu conecto os controles HTML aos estilos CSS
   utilizando JavaScript.
   ========================================================= */


// Eu procuro o controle deslizante da margem.
const controleMargin = document.getElementById("controle-margin");

// Eu procuro o controle deslizante do padding.
const controlePadding = document.getElementById("controle-padding");

// Eu procuro o controle deslizante da borda.
const controleBorda = document.getElementById("controle-borda");

// Eu procuro a caixa que receberá as alterações.
const caixaBoxModel = document.getElementById("caixa-box-model");

// Eu procuro os elementos que mostram os valores numéricos.
const valorMargin = document.getElementById("valor-margin");
const valorPadding = document.getElementById("valor-padding");
const valorBorda = document.getElementById("valor-borda");

// Eu procuro o texto que resume os valores atuais.
const descricaoBoxModel = document.getElementById("descricao-box-model");

// Eu procuro o botão de restauração.
const botaoRestaurarBoxModel = document.getElementById(
    "restaurar-box-model"
);


/* =========================================================
   FUNÇÃO PARA ATUALIZAR A CAIXA
   ========================================================= */

// Eu crio uma função para aplicar os valores escolhidos.
function atualizarBoxModel() {

    // Eu leio o valor atual do controle da margem.
    const margin = controleMargin.value;

    // Eu leio o valor atual do controle do padding.
    const padding = controlePadding.value;

    // Eu leio o valor atual do controle da borda.
    const borda = controleBorda.value;

    // Eu aplico a margem escolhida à caixa.
    caixaBoxModel.style.margin = `${margin}px`;

    // Eu aplico o padding escolhido à caixa.
    caixaBoxModel.style.padding = `${padding}px`;

    // Eu altero a espessura da borda.
    caixaBoxModel.style.borderWidth = `${borda}px`;

    // Eu atualizo o número exibido ao lado de Margin.
    valorMargin.textContent = margin;

    // Eu atualizo o número exibido ao lado de Padding.
    valorPadding.textContent = padding;

    // Eu atualizo o número exibido ao lado de Border.
    valorBorda.textContent = borda;

    // Eu apresento um resumo dos valores escolhidos.
    descricaoBoxModel.textContent =
        `Margin: ${margin}px | Padding: ${padding}px | Border: ${borda}px`;

}


/* =========================================================
   EVENTOS DOS CONTROLES
   ========================================================= */

// Eu verifico se os elementos do laboratório existem.
if (
    controleMargin &&
    controlePadding &&
    controleBorda &&
    caixaBoxModel &&
    valorMargin &&
    valorPadding &&
    valorBorda &&
    descricaoBoxModel &&
    botaoRestaurarBoxModel
) {

    // Eu escuto as alterações do controle de margem.
    controleMargin.addEventListener("input", atualizarBoxModel);

    // Eu escuto as alterações do controle de padding.
    controlePadding.addEventListener("input", atualizarBoxModel);

    // Eu escuto as alterações do controle de borda.
    controleBorda.addEventListener("input", atualizarBoxModel);


    /* =====================================================
       BOTÃO RESTAURAR
       ===================================================== */

    // Eu escuto o clique no botão Restaurar valores.
    botaoRestaurarBoxModel.addEventListener("click", function () {

        // Eu restauro o valor inicial da margem.
        controleMargin.value = 20;

        // Eu restauro o valor inicial do padding.
        controlePadding.value = 24;

        // Eu restauro o valor inicial da borda.
        controleBorda.value = 3;

        // Eu atualizo a caixa com os valores restaurados.
        atualizarBoxModel();

    });


    /* =====================================================
       INICIALIZAÇÃO DO LABORATÓRIO
       ===================================================== */

    // Eu sincronizo a caixa com os controles ao carregar.
    atualizarBoxModel();

}


/* =========================================================
   ETAPA 45 — LEITOR DE CÓDIGO INTERATIVO

   Eu permito que o estudante clique em uma linha
   e visualize a explicação correspondente.
   ========================================================= */


// Eu procuro o laboratório de leitura de código.
const leitorCodigo = document.querySelector(
    "#laboratorio-box-model .leitor-codigo-interativo"
);


// Eu verifico se o laboratório existe na página.
if (leitorCodigo) {

    // Eu procuro todas as linhas clicáveis do laboratório.
    const linhasCodigo = leitorCodigo.querySelectorAll(
        ".linha-codigo"
    );

    // Eu procuro o parágrafo que mostrará a explicação.
    const textoExplicacao = leitorCodigo.querySelector(
        "#texto-explicacao-linha"
    );


    // Eu verifico se o parágrafo de explicação existe.
    if (textoExplicacao) {

        // Eu percorro cada linha do código.
        linhasCodigo.forEach(function (linha) {

            // Eu observo quando o estudante clica na linha.
            linha.addEventListener("click", function () {

                // Eu leio a explicação armazenada no HTML.
                const explicacao = linha.dataset.explicacao;

                // Eu retiro o destaque de todas as linhas.
                linhasCodigo.forEach(function (outraLinha) {

                    // Eu removo a classe de seleção anterior.
                    outraLinha.classList.remove("ativa");

                    // Eu informo que a linha não está selecionada.
                    outraLinha.setAttribute(
                        "aria-pressed",
                        "false"
                    );

                });


                // Eu destaco a linha escolhida pelo estudante.
                linha.classList.add("ativa");

                // Eu informo que esta linha está selecionada.
                linha.setAttribute(
                    "aria-pressed",
                    "true"
                );

                // Eu mostro a explicação correspondente.
                textoExplicacao.textContent = explicacao;

            });

        });

    }

}


/* =====================================================
   ETAPA 60 — LABORATÓRIO INTERATIVO DE FLEXBOX

   Eu programo os três menus da página 21.

   Meu objetivo é permitir que o estudante
   modifique propriedades CSS e observe
   imediatamente o resultado no navegador.
   ===================================================== */


// =====================================================
// 1. EU LOCALIZO OS ELEMENTOS DO HTML
// =====================================================

// Eu encontro o menu que controla a direção.
const controleDirecaoFlexbox = document.getElementById(
    "flex-direction-controle"
);

// Eu encontro o menu que controla a distribuição.
const controleDistribuicaoFlexbox = document.getElementById(
    "justify-content-controle"
);

// Eu encontro o menu que controla o alinhamento.
const controleAlinhamentoFlexbox = document.getElementById(
    "align-items-controle"
);

// Eu encontro a área que contém as três caixas azuis.
const areaLaboratorioFlexbox = document.querySelector(
    "#laboratorio-flexbox .laboratorio-flexbox-area"
);


// =====================================================
// 2. EU CRIO A FUNÇÃO QUE ATUALIZA O FLEXBOX
// =====================================================

// Eu crio uma função para aplicar as escolhas do aluno.
function atualizarLaboratorioFlexbox() {

    // Eu verifico se todos os elementos existem.
    if (
        !controleDirecaoFlexbox ||
        !controleDistribuicaoFlexbox ||
        !controleAlinhamentoFlexbox ||
        !areaLaboratorioFlexbox
    ) {

        // Eu interrompo a função se faltar algum elemento.
        return;
    }

    // Eu leio a direção escolhida pelo estudante.
    const direcao = controleDirecaoFlexbox.value;

    // Eu leio a distribuição escolhida pelo estudante.
    const distribuicao = controleDistribuicaoFlexbox.value;

    // Eu leio o alinhamento escolhido pelo estudante.
    const alinhamento = controleAlinhamentoFlexbox.value;


    // =================================================
    // 3. EU APLICO AS PROPRIEDADES CSS
    // =================================================

    // Eu modifico a direção das caixas.
    areaLaboratorioFlexbox.style.flexDirection = direcao;

    // Eu modifico a distribuição das caixas.
    areaLaboratorioFlexbox.style.justifyContent = distribuicao;

    // Eu modifico o alinhamento das caixas.
    areaLaboratorioFlexbox.style.alignItems = alinhamento;

    // =================================================
    // ETAPA 62 — EU ATUALIZO O CÓDIGO CSS NA TELA
    // =================================================

    // Eu encontro o elemento que mostra o código CSS.
    const visualizadorCodigoFlexbox = document.getElementById(
        "codigo-flexbox-ao-vivo"
    );

    // Eu verifico se o visualizador existe na página.
    if (visualizadorCodigoFlexbox) {

        // Eu construo o código CSS usando as escolhas
        // que o estudante fez nos três menus.
        const codigoCSS = `.container {
    display: flex;
    flex-direction: ${direcao};
    justify-content: ${distribuicao};
    align-items: ${alinhamento};
}`;

        // Eu atualizo o texto do visualizador.
        // Uso textContent para mostrar o código
        // sem interpretá-lo como HTML.
        visualizadorCodigoFlexbox.textContent = codigoCSS;

    }


}


// =====================================================
// 4. EU ATIVO OS MENUS INTERATIVOS
// =====================================================

// Eu verifico se todos os elementos foram encontrados.
if (
    controleDirecaoFlexbox &&
    controleDistribuicaoFlexbox &&
    controleAlinhamentoFlexbox &&
    areaLaboratorioFlexbox
) {

    // Eu escuto mudanças no menu de direção.
    controleDirecaoFlexbox.addEventListener(
        "change",
        atualizarLaboratorioFlexbox
    );

    // Eu escuto mudanças no menu de distribuição.
    controleDistribuicaoFlexbox.addEventListener(
        "change",
        atualizarLaboratorioFlexbox
    );

    // Eu escuto mudanças no menu de alinhamento.
    controleAlinhamentoFlexbox.addEventListener(
        "change",
        atualizarLaboratorioFlexbox
    );

    // Eu aplico os valores iniciais dos menus.
    atualizarLaboratorioFlexbox();

}

/* =====================================================
   FIM DA ETAPA 60

   Eu transformei os menus HTML em controles
   capazes de modificar o CSS pelo JavaScript.
   ===================================================== */


/* =====================================================
   ETAPA 64 — RESTAURANDO O LABORATÓRIO FLEXBOX

   Eu programo o botão "Restaurar valores".

   Quando o estudante clicar no botão,
   eu retornarei os três menus às suas
   configurações originais.

   Depois, atualizarei as caixas azuis
   e o código CSS exibido na tela.
   ===================================================== */


// =====================================================
// 1. EU LOCALIZO O BOTÃO
// =====================================================

// Eu encontro o botão criado na página 21.
const botaoRestaurarFlexbox = document.getElementById(
    "btn-restaurar-flexbox"
);


// =====================================================
// 2. EU VERIFICO SE O BOTÃO EXISTE
// =====================================================

// Eu verifico se o botão e os três menus existem.
if (
    botaoRestaurarFlexbox &&
    controleDirecaoFlexbox &&
    controleDistribuicaoFlexbox &&
    controleAlinhamentoFlexbox &&
    areaLaboratorioFlexbox
) {

    // =================================================
    // 3. EU ESCUTO O CLIQUE DO ESTUDANTE
    // =================================================

    // Eu executo uma função quando o botão é clicado.
    botaoRestaurarFlexbox.addEventListener(
        "click",
        function () {

            // =========================================
            // 4. EU RESTAURO OS VALORES ORIGINAIS
            // =========================================

            // Eu volto a organizar as caixas em linha.
            controleDirecaoFlexbox.value = "row";

            // Eu volto a centralizar a distribuição.
            controleDistribuicaoFlexbox.value = "center";

            // Eu volto a centralizar o alinhamento.
            controleAlinhamentoFlexbox.value = "center";


            // =========================================
            // 5. EU ATUALIZO O LABORATÓRIO
            // =========================================

            // Eu reutilizo a função que já construí.
            atualizarLaboratorioFlexbox();

        }
    );

}

/* =====================================================
   FIM DA ETAPA 64

   Eu permito que o estudante experimente
   diferentes configurações e retorne
   ao estado inicial com um único clique.
   ===================================================== */


/* =====================================================
   ETAPA 70 — LABORATÓRIO INTERATIVO DE CSS GRID

   Eu programo os dois menus da página 22.

   Meu objetivo é permitir que o estudante
   modifique a quantidade de colunas e o
   espaçamento dos cartões em tempo real.
   ===================================================== */


// =====================================================
// 1. EU LOCALIZO OS ELEMENTOS DO HTML
// =====================================================

// Eu encontro o menu que controla as colunas.
const controleColunasGrid = document.getElementById(
    "grid-colunas-controle"
);

// Eu encontro o menu que controla o espaçamento.
const controleEspacamentoGrid = document.getElementById(
    "grid-espacamento-controle"
);

// Eu encontro o contêiner dos seis cartões verdes.
const areaLaboratorioGrid = document.querySelector(
    "#laboratorio-css-grid .laboratorio-grid-area"
);


// =====================================================
// 2. EU CRIO A FUNÇÃO QUE ATUALIZA O GRID
// =====================================================

// Eu crio uma função para aplicar as escolhas do aluno.
function atualizarLaboratorioGrid() {

    // Eu verifico se os elementos existem na página.
    if (
        !controleColunasGrid ||
        !controleEspacamentoGrid ||
        !areaLaboratorioGrid
    ) {

        // Eu interrompo a função se faltar um elemento.
        return;
    }


    // =================================================
    // 3. EU LEIO AS ESCOLHAS DO ESTUDANTE
    // =================================================

    // Eu obtenho a quantidade de colunas selecionada.
    const colunas = controleColunasGrid.value;

    // Eu obtenho o espaçamento selecionado.
    const espacamento = controleEspacamentoGrid.value;


    // =================================================
    // 4. EU MODIFICO AS PROPRIEDADES CSS
    // =================================================

    // Eu defino a quantidade de colunas da grade.
    areaLaboratorioGrid.style.gridTemplateColumns =
        `repeat(${colunas}, minmax(0, 1fr))`;

    // Eu defino o espaçamento entre os cartões.
    areaLaboratorioGrid.style.gap =
        `${espacamento}px`;


    // =================================================
    // ETAPA 72 — EU ATUALIZO O CÓDIGO CSS NA TELA
    // =================================================

    // Eu encontro o visualizador de código da página 22.
    const visualizadorCodigoGrid = document.getElementById(
        "codigo-grid-ao-vivo"
    );

    // Eu verifico se o visualizador existe.
    if (visualizadorCodigoGrid) {

        // Eu construo o CSS com os valores escolhidos.
        const codigoCSSGrid = `.container {
    display: grid;
    grid-template-columns: repeat(${colunas}, minmax(0, 1fr));
    gap: ${espacamento}px;
}`;

        // Eu apresento o código atualizado ao estudante.
        visualizadorCodigoGrid.textContent = codigoCSSGrid;

    }

}


// =====================================================
// 5. EU ATIVO OS CONTROLES INTERATIVOS
// =====================================================

// Eu verifico se os menus e o contêiner existem.
if (
    controleColunasGrid &&
    controleEspacamentoGrid &&
    areaLaboratorioGrid
) {

    // Eu escuto mudanças na quantidade de colunas.
    controleColunasGrid.addEventListener(
        "change",
        atualizarLaboratorioGrid
    );

    // Eu escuto mudanças no espaçamento.
    controleEspacamentoGrid.addEventListener(
        "change",
        atualizarLaboratorioGrid
    );

    // Eu aplico os valores iniciais dos menus.
    atualizarLaboratorioGrid();

}

/* =====================================================
   FIM DA ETAPA 70

   Eu permito que o estudante experimente
   diferentes configurações de CSS Grid.
   ===================================================== */


/* =====================================================
   ETAPA 75 — BOTÃO RESTAURAR CSS GRID

   Eu programo o botão para devolver o laboratório
   aos valores originais.

   Valores iniciais:
   - 3 colunas
   - 16 pixels de espaçamento
   ===================================================== */

// Eu encontro o botão de restauração no HTML.
const botaoRestaurarGrid = document.getElementById(
    "botao-restaurar-grid"
);

// Eu verifico se o botão e os controles existem.
if (
    botaoRestaurarGrid &&
    controleColunasGrid &&
    controleEspacamentoGrid
) {

    // Eu escuto o clique do estudante no botão.
    botaoRestaurarGrid.addEventListener("click", function () {

        // Eu restauro a quantidade original de colunas.
        controleColunasGrid.value = "3";

        // Eu restauro o espaçamento original.
        controleEspacamentoGrid.value = "16";

        // Eu atualizo os cartões e o código CSS exibido.
        atualizarLaboratorioGrid();

    });

}


/* =====================================================
   ETAPA 79 — LABORATÓRIO DE DESIGN RESPONSIVO

   Eu programo os botões Computador, Tablet
   e Celular da página 23.

   Eu modifico a largura da simulação
   e a quantidade de colunas dos cartões.
   ===================================================== */

// Eu encontro o botão Computador.
const botaoComputador = document.getElementById(
    "botao-tela-computador"
);

// Eu encontro o botão Tablet.
const botaoTablet = document.getElementById(
    "botao-tela-tablet"
);

// Eu encontro o botão Celular.
const botaoCelular = document.getElementById(
    "botao-tela-celular"
);

// Eu encontro a área que representa a tela.
const simuladorResponsivo = document.getElementById(
    "simulador-tela-responsiva"
);

// Eu encontro a grade que contém os seis cartões.
const gradeResponsiva = document.getElementById(
    "grade-responsiva"
);

// Eu encontro o texto que informa o dispositivo escolhido.
const descricaoTela = document.getElementById(
    "descricao-tela-responsiva"
);

// Eu crio uma função para modificar a simulação.
function atualizarTelaResponsiva(dispositivo) {

    // Eu verifico se os elementos necessários existem.
    if (
        !simuladorResponsivo ||
        !gradeResponsiva ||
        !descricaoTela
    ) {
        return;
    }

    // Eu preparo as configurações do computador.
    if (dispositivo === "computador") {

        // Eu utilizo toda a largura disponível.
        simuladorResponsivo.style.width = "100%";

        // Eu organizo os cartões em três colunas.
        gradeResponsiva.style.gridTemplateColumns =
            "repeat(3, minmax(0, 1fr))";

        // Eu atualizo a descrição apresentada.
        descricaoTela.textContent =
            "Computador — 3 colunas";

    }

    // Eu preparo as configurações do tablet.
    else if (dispositivo === "tablet") {

        // Eu reduzo a largura da área de simulação.
        simuladorResponsivo.style.width = "78%";

        // Eu organizo os cartões em duas colunas.
        gradeResponsiva.style.gridTemplateColumns =
            "repeat(2, minmax(0, 1fr))";

        // Eu atualizo a descrição apresentada.
        descricaoTela.textContent =
            "Tablet — 2 colunas";

    }

    // Eu preparo as configurações do celular.
    else if (dispositivo === "celular") {

        // Eu reduzo a largura para simular um celular.
        simuladorResponsivo.style.width = "52%";

        // Eu organizo os cartões em uma coluna.
        gradeResponsiva.style.gridTemplateColumns =
            "minmax(0, 1fr)";

        // Eu atualizo a descrição apresentada.
        descricaoTela.textContent =
            "Celular — 1 coluna";

    }

    /* =====================================================
       ETAPA 81 — VISUALIZADOR CSS RESPONSIVO

       Eu atualizo o código CSS mostrado ao estudante
       conforme o dispositivo que ele selecionou.
       ===================================================== */

    // Eu encontro o visualizador de código CSS da página 23.
    const visualizadorResponsivo = document.getElementById(
        "codigo-responsivo-ao-vivo"
    );

    // Eu verifico se o visualizador existe antes de atualizá-lo.
    if (visualizadorResponsivo) {

        // Eu começo com três colunas, que representam o computador.
        let quantidadeColunas = 3;

        // Eu seleciono duas colunas quando o estudante escolhe tablet.
        if (dispositivo === "tablet") {
            quantidadeColunas = 2;
        }

        // Eu seleciono uma coluna quando o estudante escolhe celular.
        else if (dispositivo === "celular") {
            quantidadeColunas = 1;
        }

        // Eu monto o exemplo CSS com a quantidade de colunas escolhida.
        const codigoCSSResponsivo = `.grade-responsiva {
    display: grid;
    grid-template-columns: repeat(${quantidadeColunas}, minmax(0, 1fr));
    gap: 12px;
}`;

        // Eu mostro o código como texto, sem executá-lo como HTML.
        visualizadorResponsivo.textContent = codigoCSSResponsivo;

    }

}

// Eu verifico se o botão Computador existe.
if (botaoComputador) {

    // Eu escuto o clique no botão Computador.
    botaoComputador.addEventListener("click", function () {

        // Eu ativo a simulação de computador.
        atualizarTelaResponsiva("computador");

    });

}

// Eu verifico se o botão Tablet existe.
if (botaoTablet) {

    // Eu escuto o clique no botão Tablet.
    botaoTablet.addEventListener("click", function () {

        // Eu ativo a simulação de tablet.
        atualizarTelaResponsiva("tablet");

    });

}

// Eu verifico se o botão Celular existe.
if (botaoCelular) {

    // Eu escuto o clique no botão Celular.
    botaoCelular.addEventListener("click", function () {

        // Eu ativo a simulação de celular.
        atualizarTelaResponsiva("celular");

    });

}

// Eu apresento inicialmente a versão de computador.
atualizarTelaResponsiva("computador");
