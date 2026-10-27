"use strict";

const CHAVE_DADOS = "moss-agendamentos";
const formulario = document.getElementById("form-agendamento");
const lista = document.getElementById("lista-agendamentos");
const listaClientes = document.getElementById("lista-clientes");
const busca = document.getElementById("busca-agendamentos");
const filtroStatus = document.getElementById("filtro-status");
const filtroData = document.getElementById("filtro-data");
const campoNome = document.getElementById("nome-cliente");
const campoTelefone = document.getElementById("telefone-cliente");
const campoServico = document.getElementById("servico");
const campoData = document.getElementById("data-agendamento");
const campoHora = document.getElementById("hora-agendamento");
const campoObservacoes = document.getElementById("observacoes");
const mensagemFormulario = document.getElementById("mensagem-formulario");
const botaoCancelar = document.getElementById("botao-cancelar");
const notificacao = document.getElementById("notificacao");
const telaLogin = document.getElementById("tela-login");
const appPrincipal = document.getElementById("app-principal");
const formularioLogin = document.getElementById("form-login");
const mensagemLogin = document.getElementById("mensagem-login");
const configNuvem = window.MOSS_SUPABASE || {};
const querNuvem = Boolean(configNuvem.url || configNuvem.publishableKey);

let falhaLeituraLocal = false;
let agendamentos = querNuvem ? [] : carregarDados();
let idEmEdicao = null;
let temporizadorNotificacao;
let clienteNuvem = null;
let usuarioAtual = null;
let operacaoEmCurso = false;
let sequenciaSessao = 0;
let modoCadastro = false;

function carregarDados() {
    try {
        const texto = localStorage.getItem(CHAVE_DADOS);
        if (texto === null) return [];
        const dados = JSON.parse(texto);
        if (!Array.isArray(dados) || dados.some((item) => !item || typeof item !== "object" ||
            !["string", "number"].includes(typeof item.id) || typeof item.nome !== "string" ||
            typeof item.servico !== "string" || !MossAgendaUtils.dataValida(item.data) ||
            !/^([01]\d|2[0-3]):[0-5]\d$/.test(item.hora || ""))) {
            throw new Error("Dados locais inválidos; conteúdo original preservado.");
        }
        return dados;
    } catch (erro) {
        falhaLeituraLocal = true;
        console.error("Erro ao carregar agendamentos:", erro);
        return [];
    }
}

function salvarDados(registros = agendamentos) {
    if (falhaLeituraLocal) return false;
    try {
        localStorage.setItem(CHAVE_DADOS, JSON.stringify(registros));
        return true;
    } catch (erro) {
        console.error("Erro ao salvar agendamentos:", erro);
        return false;
    }
}

function avisar(texto, erro = false) {
    clearTimeout(temporizadorNotificacao);
    notificacao.textContent = texto;
    notificacao.classList.toggle("error", erro);
    notificacao.hidden = false;
    temporizadorNotificacao = setTimeout(() => { notificacao.hidden = true; }, 4000);
}

function confirmarPersistencia(registros, mensagem) {
    if (!salvarDados(registros)) {
        avisar("Não foi possível salvar. Nenhum agendamento foi alterado. Confira o armazenamento do navegador e tente novamente.", true);
        return false;
    }
    agendamentos = registros;
    avisar(mensagem);
    return true;
}

function erroLegivel(erro) {
    if (erro?.code === "MOSS_VALIDATION") return erro.message;
    if (erro?.code === "23505") return "Este horário já está ocupado. Escolha outra data ou horário.";
    if (/invalid login credentials/i.test(erro?.message || "")) return "E-mail ou senha incorretos.";
    if (/email not confirmed/i.test(erro?.message || "")) return "Confirme seu e-mail antes de entrar.";
    console.error("Erro na agenda:", erro);
    return "Não foi possível concluir. Verifique a conexão e tente novamente.";
}

function conferirResultado(resultado) {
    if (resultado.error) throw resultado.error;
    return resultado.data;
}

function converterLinha(linha) {
    return { ...linha, hora: String(linha.hora).slice(0, 5) };
}

async function carregarNuvem() {
    const usuario = usuarioAtual?.id;
    if (!usuario) return;
    const registros = [];
    const pagina = 500;
    let inicio = 0;
    let lote;
    do {
        lote = conferirResultado(await clienteNuvem.from("moss_agendamentos")
            .select("id,nome,servico,telefone,data,hora,observacoes,status")
            .eq("user_id", usuario)
            .order("data", { ascending: true })
            .order("hora", { ascending: true })
            .range(inicio, inicio + pagina - 1));
        registros.push(...lote.map(converterLinha));
        inicio += pagina;
    } while (lote.length === pagina);
    if (usuarioAtual?.id !== usuario) return;
    agendamentos = registros;
    atualizarPainel();
    let jaImportou = false;
    try { jaImportou = localStorage.getItem(`moss-importado:${usuario}`) === "1"; } catch (_) { /* armazenamento bloqueado */ }
    document.getElementById("migracao-local").hidden = jaImportou || carregarDados().length === 0;
}

async function executarNaNuvem(acao, sucesso) {
    if (operacaoEmCurso || !usuarioAtual) return false;
    operacaoEmCurso = true;
    try {
        await acao();
        await carregarNuvem();
        avisar(sucesso);
        return true;
    } catch (erro) {
        avisar(erroLegivel(erro), true);
        return false;
    } finally {
        operacaoEmCurso = false;
    }
}

function exibirMensagemLogin(texto) {
    mensagemLogin.textContent = texto;
    mensagemLogin.hidden = false;
}

async function aplicarSessao(sessao, sequencia) {
    if (sequencia !== sequenciaSessao) return;
    if (!sessao) {
        usuarioAtual = null;
        agendamentos = [];
        limparFormulario();
        appPrincipal.hidden = true;
        telaLogin.hidden = false;
        formularioLogin.reset();
        mensagemLogin.hidden = true;
        document.getElementById("migracao-local").hidden = true;
        return;
    }

    try {
        const usuario = conferirResultado(await clienteNuvem.auth.getUser()).user;
        if (sequencia !== sequenciaSessao) return;
        if (!usuario) throw new Error("Sessão inválida");
        if (usuarioAtual?.id !== usuario.id) {
            usuarioAtual = usuario;
            await carregarNuvem();
        }
        if (sequencia !== sequenciaSessao) return;
        document.getElementById("email-usuario").textContent = usuario.email || "Minha conta";
        document.getElementById("email-usuario").hidden = false;
        document.getElementById("botao-sair").hidden = false;
        document.getElementById("mensagem-armazenamento").textContent = "Sincronizado com sua conta na nuvem.";
        mensagemLogin.hidden = true;
        telaLogin.hidden = true;
        appPrincipal.hidden = false;
    } catch (erro) {
        if (sequencia !== sequenciaSessao) return;
        usuarioAtual = null;
        appPrincipal.hidden = true;
        telaLogin.hidden = false;
        exibirMensagemLogin(`Não foi possível acessar sua agenda. ${erroLegivel(erro)} Confira a configuração do Supabase no README.`);
    }
}

function iniciarNuvem() {
    appPrincipal.hidden = true;
    telaLogin.hidden = false;
    const urlValida = /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(configNuvem.url || "");
    if (!urlValida || !configNuvem.publishableKey || !window.supabase?.createClient) {
        formularioLogin.hidden = true;
        document.getElementById("alternar-cadastro").hidden = true;
        exibirMensagemLogin("Configuração incompleta ou biblioteca indisponível. Confira config.js e a conexão com a internet.");
        return;
    }
    try {
        clienteNuvem = window.supabase.createClient(configNuvem.url, configNuvem.publishableKey);
        clienteNuvem.auth.onAuthStateChange((evento, sessao) => {
            if (!["INITIAL_SESSION", "SIGNED_IN", "SIGNED_OUT"].includes(evento)) return;
            const sequencia = ++sequenciaSessao;
            setTimeout(() => { void aplicarSessao(sessao, sequencia); }, 0);
        });
        exibirMensagemLogin("Verificando sua sessão...");
        window.addEventListener("focus", () => {
            if (usuarioAtual) void carregarNuvem().catch((erro) => avisar(erroLegivel(erro), true));
        });
        setInterval(() => {
            if (usuarioAtual && !document.hidden) void carregarNuvem().catch((erro) => avisar(erroLegivel(erro), true));
        }, 60000);
    } catch (erro) {
        formularioLogin.hidden = true;
        exibirMensagemLogin(`Não foi possível iniciar a nuvem. ${erroLegivel(erro)}`);
    }
}

function normalizar(texto) {
    return String(texto || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function agendamentosValidos() {
    return agendamentos.filter((item) => item && typeof item === "object" &&
        typeof item.nome === "string" && typeof item.servico === "string" &&
        typeof item.data === "string" && typeof item.hora === "string");
}

function dataLocalDeHoje() {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
}

function formatarData(data) {
    const partes = data.split("-");
    return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : data;
}

function criarBotao(texto, classe, descricao, acao) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = `action-button ${classe}`;
    botao.textContent = texto;
    botao.setAttribute("aria-label", descricao);
    botao.addEventListener("click", acao);
    return botao;
}

function mostrarVazio() {
    const vazio = document.createElement("div");
    vazio.className = "empty-state";
    const icone = document.createElement("span");
    icone.className = "empty-icon";
    icone.setAttribute("aria-hidden", "true");
    icone.textContent = "▦";
    const titulo = document.createElement("h3");
    const descricao = document.createElement("p");
    const acao = document.createElement("a");
    acao.href = "#form-agendamento";

    if (agendamentosValidos().length === 0) {
        titulo.textContent = "Sua agenda começa aqui";
        descricao.textContent = "Cadastre seu primeiro atendimento e organize tudo em um só lugar.";
        acao.textContent = "Criar primeiro agendamento →";
        vazio.append(icone, titulo, descricao, acao);
    } else {
        titulo.textContent = filtroData.value ? "Nenhum atendimento neste dia" : "Nenhum resultado encontrado";
        descricao.textContent = "Tente outra data, busca ou filtro para ver mais atendimentos.";
        vazio.append(icone, titulo, descricao);
    }

    lista.appendChild(vazio);
}

function criarCartao(agendamento) {
    const concluido = agendamento.status === "concluido";
    const cartao = document.createElement("article");
    cartao.className = `appointment-card${concluido ? " is-completed" : ""}`;

    const dataBadge = document.createElement("div");
    dataBadge.className = "date-badge";
    dataBadge.setAttribute("aria-hidden", "true");
    const dia = document.createElement("strong");
    dia.textContent = agendamento.data.split("-")[2] || "—";
    const mes = document.createElement("small");
    const dataFormatavel = new Date(`${agendamento.data}T12:00:00`);
    mes.textContent = Number.isNaN(dataFormatavel.getTime()) ? "DATA" :
        new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(dataFormatavel).replace(".", "").toUpperCase();
    dataBadge.append(dia, mes);

    const info = document.createElement("div");
    info.className = "appointment-info";
    const cabecalho = document.createElement("div");
    cabecalho.className = "appointment-heading";
    const nome = document.createElement("h3");
    nome.textContent = agendamento.nome;
    const situacao = document.createElement("span");
    situacao.className = `status-pill${concluido ? " done" : ""}`;
    situacao.textContent = concluido ? "Concluído" : "Pendente";
    cabecalho.append(nome, situacao);

    const servico = document.createElement("p");
    servico.className = "appointment-service";
    servico.textContent = agendamento.servico;
    const metadados = document.createElement("div");
    metadados.className = "appointment-meta";
    const data = document.createElement("time");
    data.dateTime = agendamento.data;
    data.textContent = `▦  ${formatarData(agendamento.data)}`;
    const hora = document.createElement("time");
    hora.dateTime = `${agendamento.data}T${agendamento.hora}`;
    hora.textContent = `◷  ${agendamento.hora}`;
    metadados.append(data, hora);
    if (agendamento.telefone) {
        const telefone = document.createElement("span");
        telefone.textContent = `Tel.: ${agendamento.telefone}`;
        metadados.appendChild(telefone);
    }
    info.append(cabecalho, servico, metadados);
    if (agendamento.observacoes) {
        const observacoes = document.createElement("p");
        observacoes.className = "appointment-note";
        observacoes.textContent = agendamento.observacoes;
        info.appendChild(observacoes);
    }

    const acoes = document.createElement("div");
    acoes.className = "appointment-actions";
    acoes.append(
        criarBotao("Editar", "", `Editar agendamento de ${agendamento.nome}`, () => editarAgendamento(agendamento.id)),
        criarBotao(concluido ? "Reabrir" : "Concluir", "complete",
            `${concluido ? "Reabrir" : "Concluir"} agendamento de ${agendamento.nome}`,
            () => alternarConclusao(agendamento.id)),
        criarBotao("Excluir", "delete", `Excluir agendamento de ${agendamento.nome}`,
            () => excluirAgendamento(agendamento.id))
    );
    const linkWhatsApp = MossAgendaUtils.linkLembrete(agendamento);
    if (!concluido && linkWhatsApp) {
        const lembrete = document.createElement("a");
        lembrete.className = "action-button whatsapp";
        lembrete.href = linkWhatsApp;
        lembrete.target = "_blank";
        lembrete.rel = "noopener noreferrer";
        lembrete.textContent = "Lembrar no WhatsApp ↗";
        lembrete.setAttribute("aria-label", `Revisar lembrete de ${agendamento.nome} no WhatsApp. Envio manual.`);
        acoes.appendChild(lembrete);
    }
    info.appendChild(acoes);
    cartao.append(dataBadge, info);
    return cartao;
}

function mostrarAgendamentos() {
    lista.replaceChildren();
    const validos = agendamentosValidos();
    const termo = normalizar(busca.value.trim());
    const status = filtroStatus.value;
    const dataEscolhida = filtroData.value;
    document.getElementById("dia-selecionado").hidden = !dataEscolhida;
    document.getElementById("texto-dia").textContent = dataEscolhida ? `Agenda de ${formatarData(dataEscolhida)}` : "";
    const registrosDia = validos.filter((item) => item.data === (dataEscolhida || dataLocalDeHoje()));
    document.getElementById("resumo-dia").textContent =
        `${dataEscolhida ? formatarData(dataEscolhida) : "Hoje"}: ${registrosDia.length} atendimento(s), ${registrosDia.filter((item) => item.status !== "concluido").length} pendente(s).`;
    const resultados = validos.filter((item) => {
        const correspondeBusca = normalizar(`${item.nome} ${item.servico} ${item.telefone || ""}`).includes(termo);
        const correspondeStatus = status === "todos" ||
            (status === "concluido" ? item.status === "concluido" : item.status !== "concluido");
        return correspondeBusca && correspondeStatus && (!dataEscolhida || item.data === dataEscolhida);
    }).sort((a, b) => `${a.data}T${a.hora}`.localeCompare(`${b.data}T${b.hora}`));

    document.getElementById("resumo-agendamentos").textContent =
        `${resultados.length}${resultados.length === validos.length ? "" : ` de ${validos.length}`} ${resultados.length === 1 ? "agendamento" : "agendamentos"}`;

    if (resultados.length === 0) {
        mostrarVazio();
        return;
    }

    lista.append(...resultados.map(criarCartao));
}

function mostrarClientes() {
    listaClientes.replaceChildren();
    const clientes = new Map();
    for (const item of agendamentosValidos()) {
        const chave = normalizar(item.nome.trim());
        if (!chave) continue;
        const cliente = clientes.get(chave) || { nome: item.nome.trim(), telefone: "", quantidade: 0 };
        cliente.quantidade++;
        if (item.telefone) cliente.telefone = item.telefone;
        clientes.set(chave, cliente);
    }
    document.getElementById("total-clientes").textContent = clientes.size;

    if (clientes.size === 0) {
        const mensagem = document.createElement("p");
        mensagem.className = "client-empty";
        mensagem.textContent = "Os clientes aparecerão aqui quando você cadastrar o primeiro agendamento.";
        listaClientes.appendChild(mensagem);
        return;
    }

    for (const cliente of [...clientes.values()].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))) {
        const cartao = document.createElement("article");
        cartao.className = "client-card";
        const avatar = document.createElement("span");
        avatar.className = "client-avatar";
        avatar.setAttribute("aria-hidden", "true");
        avatar.textContent = cliente.nome.split(/\s+/).slice(0, 2).map((parte) => parte[0]).join("").toUpperCase();
        const detalhes = document.createElement("div");
        detalhes.style.minWidth = "0";
        const nome = document.createElement("h3");
        nome.textContent = cliente.nome;
        const descricao = document.createElement("p");
        descricao.textContent = cliente.telefone || `${cliente.quantidade} ${cliente.quantidade === 1 ? "agendamento" : "agendamentos"}`;
        detalhes.append(nome, descricao);
        cartao.append(avatar, detalhes);
        listaClientes.appendChild(cartao);
    }
}

function atualizarPainel() {
    const validos = agendamentosValidos();
    document.getElementById("total-hoje").textContent = validos.filter((item) => item.data === dataLocalDeHoje()).length;
    document.getElementById("total-pendentes").textContent = validos.filter((item) => item.status !== "concluido").length;
    document.getElementById("total-concluidos").textContent = validos.filter((item) => item.status === "concluido").length;
    mostrarClientes();
    mostrarAgendamentos();
}

function limparFormulario() {
    formulario.reset();
    idEmEdicao = null;
    document.getElementById("titulo-formulario").textContent = "Novo agendamento";
    document.getElementById("botao-salvar").firstChild.textContent = "Salvar agendamento ";
    botaoCancelar.hidden = true;
    mensagemFormulario.hidden = true;
}

function editarAgendamento(id) {
    const item = agendamentos.find((agendamento) => agendamento.id === id);
    if (!item) return;
    idEmEdicao = id;
    campoNome.value = item.nome;
    campoTelefone.value = item.telefone || "";
    campoServico.value = item.servico;
    campoData.value = item.data;
    campoHora.value = item.hora;
    campoObservacoes.value = item.observacoes || "";
    mensagemFormulario.hidden = true;
    document.getElementById("titulo-formulario").textContent = "Editar agendamento";
    document.getElementById("botao-salvar").firstChild.textContent = "Salvar alterações ";
    botaoCancelar.hidden = false;
    formulario.scrollIntoView({ behavior: "smooth", block: "center" });
    campoNome.focus({ preventScroll: true });
}

async function alternarConclusao(id) {
    const item = agendamentos.find((agendamento) => agendamento.id === id);
    if (!item) return;
    const novoStatus = item.status === "concluido" ? "pendente" : "concluido";
    if (querNuvem) {
        await executarNaNuvem(async () => {
            conferirResultado(await clienteNuvem.from("moss_agendamentos")
                .update({ status: novoStatus }).eq("id", id).eq("user_id", usuarioAtual.id)
                .select("id").single());
        }, novoStatus === "concluido" ? "Atendimento concluído!" : "Atendimento reaberto.");
        return;
    }
    const registros = agendamentos.map((agendamento) => agendamento.id === id ? { ...agendamento, status: novoStatus } : agendamento);
    if (confirmarPersistencia(registros, novoStatus === "concluido" ? "Atendimento concluído!" : "Atendimento reaberto.")) atualizarPainel();
}

async function excluirAgendamento(id) {
    const item = agendamentos.find((agendamento) => agendamento.id === id);
    if (!item || !window.confirm(`Deseja realmente excluir o agendamento de ${item.nome}?`)) return;
    if (querNuvem) {
        const excluido = await executarNaNuvem(async () => {
            conferirResultado(await clienteNuvem.from("moss_agendamentos")
                .delete().eq("id", id).eq("user_id", usuarioAtual.id)
                .select("id").single());
        }, "Agendamento excluído.");
        if (excluido && idEmEdicao === id) limparFormulario();
        return;
    }
    const registros = agendamentos.filter((agendamento) => agendamento.id !== id);
    if (!confirmarPersistencia(registros, "Agendamento excluído.")) return;
    if (idEmEdicao === id) limparFormulario();
    atualizarPainel();
}

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (operacaoEmCurso) return;
    const dados = {
        nome: campoNome.value.trim(),
        telefone: campoTelefone.value.trim(),
        servico: campoServico.value.trim(),
        data: campoData.value,
        hora: campoHora.value,
        observacoes: campoObservacoes.value.trim()
    };

    if (!dados.nome || dados.nome.length > 80 || !dados.servico || dados.servico.length > 80 ||
        dados.telefone.length > 25 || dados.observacoes.length > 300 ||
        !MossAgendaUtils.dataValida(dados.data) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(dados.hora)) {
        mensagemFormulario.textContent = "Confira os campos obrigatórios, a data e o horário informados.";
        mensagemFormulario.hidden = false;
        return;
    }
    const horarioOcupado = agendamentosValidos().some((item) =>
        item.id !== idEmEdicao && item.data === dados.data && item.hora === dados.hora);
    if (horarioOcupado) {
        mensagemFormulario.textContent = "Este horário já está ocupado. Escolha outra data ou horário.";
        mensagemFormulario.hidden = false;
        campoHora.focus();
        return;
    }

    const editando = idEmEdicao !== null;
    if (querNuvem) {
        const salvo = await executarNaNuvem(async () => {
            if (editando) {
                conferirResultado(await clienteNuvem.from("moss_agendamentos")
                    .update(dados).eq("id", idEmEdicao).eq("user_id", usuarioAtual.id)
                    .select("id").single());
            } else {
                conferirResultado(await clienteNuvem.from("moss_agendamentos")
                    .insert({ ...dados, user_id: usuarioAtual.id }).select("id").single());
            }
        }, editando ? "Agendamento atualizado!" : "Agendamento criado com sucesso!");
        if (salvo) limparFormulario();
        return;
    }
    const registros = [...agendamentos];
    if (editando) {
        const indice = agendamentos.findIndex((item) => item.id === idEmEdicao);
        if (indice === -1) {
            limparFormulario();
            avisar("Esse agendamento não foi encontrado. Cadastre-o novamente.", true);
            return;
        }
        registros[indice] = { ...agendamentos[indice], ...dados };
    } else {
        const id = window.crypto && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        registros.push({ id, ...dados, status: "pendente" });
    }

    if (!confirmarPersistencia(registros, editando ? "Agendamento atualizado!" : "Agendamento criado com sucesso!")) return;
    limparFormulario();
    atualizarPainel();
});

botaoCancelar.addEventListener("click", limparFormulario);
formulario.addEventListener("input", () => { mensagemFormulario.hidden = true; });
busca.addEventListener("input", mostrarAgendamentos);
filtroStatus.addEventListener("change", mostrarAgendamentos);
filtroData.addEventListener("change", mostrarAgendamentos);
function selecionarDia(data) {
    if (!MossAgendaUtils.dataValida(data)) return;
    filtroData.value = data;
    if (idEmEdicao === null && !campoData.value) campoData.value = data;
    mostrarAgendamentos();
}
document.getElementById("dia-hoje").addEventListener("click", () => selecionarDia(dataLocalDeHoje()));
document.getElementById("dia-anterior").addEventListener("click", () => selecionarDia(MossAgendaUtils.deslocarDia(filtroData.value || dataLocalDeHoje(), -1)));
document.getElementById("dia-proximo").addEventListener("click", () => selecionarDia(MossAgendaUtils.deslocarDia(filtroData.value || dataLocalDeHoje(), 1)));
document.getElementById("limpar-data").addEventListener("click", () => {
    filtroData.value = "";
    mostrarAgendamentos();
    filtroData.focus();
});

function atualizarNavegacao() {
    const secao = ["#agenda", "#clientes"].includes(window.location.hash) ? window.location.hash : "#painel";
    document.querySelectorAll(".nav-link").forEach((link) => {
        const ativo = link.getAttribute("href") === secao;
        link.classList.toggle("is-active", ativo);
        if (ativo) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
    });
}

window.addEventListener("hashchange", atualizarNavegacao);
atualizarNavegacao();

function erroDeValidacao(mensagem) {
    return Object.assign(new Error(mensagem), { code: "MOSS_VALIDATION" });
}

function validarImportacao(registros) {
    if (!Array.isArray(registros) || registros.length > 5000) {
        throw erroDeValidacao("O backup precisa conter uma lista de até 5.000 agendamentos.");
    }
    return registros.map((item, indice) => {
        const dados = {
            nome: typeof item?.nome === "string" ? item.nome.trim() : "",
            servico: typeof item?.servico === "string" ? item.servico.trim() : "",
            telefone: typeof item?.telefone === "string" ? item.telefone.trim() : "",
            data: item?.data,
            hora: typeof item?.hora === "string" ? item.hora.slice(0, 5) : "",
            observacoes: typeof item?.observacoes === "string" ? item.observacoes.trim() : "",
            status: item?.status === "concluido" ? "concluido" : "pendente"
        };
        const dataValida = MossAgendaUtils.dataValida(dados.data);
        const horaValida = /^([01]\d|2[0-3]):[0-5]\d$/.test(dados.hora);
        if (!dados.nome || dados.nome.length > 80 || !dados.servico || dados.servico.length > 80 ||
            dados.telefone.length > 25 || dados.observacoes.length > 300 || !dataValida || !horaValida) {
            throw erroDeValidacao(`O agendamento ${indice + 1} do arquivo tem dados inválidos. Nada foi importado.`);
        }
        return dados;
    });
}

async function importarRegistros(registros) {
    if (operacaoEmCurso) return false;
    operacaoEmCurso = true;
    let importados = 0;
    let repetidos = 0;
    const horarios = new Set(agendamentosValidos().map((item) => `${item.data}T${item.hora}`));
    const registrosLocais = [...agendamentos];
    try {
        const dados = validarImportacao(registros);
        for (const item of dados) {
            const horario = `${item.data}T${item.hora}`;
            if (horarios.has(horario)) { repetidos++; continue; }
            if (querNuvem) {
                if (!usuarioAtual) throw erroDeValidacao("Entre na sua conta antes de importar.");
                const resultado = await clienteNuvem.from("moss_agendamentos")
                    .insert({ ...item, user_id: usuarioAtual.id });
                if (resultado.error?.code === "23505") { repetidos++; horarios.add(horario); continue; }
                conferirResultado(resultado);
            } else {
                const id = window.crypto && typeof crypto.randomUUID === "function"
                    ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
                registrosLocais.push({ id, ...item });
            }
            horarios.add(horario);
            importados++;
        }
        if (querNuvem) await carregarNuvem();
        else {
            if (!salvarDados(registrosLocais)) {
                importados = 0;
                throw erroDeValidacao("Não foi possível salvar o backup. Nenhum agendamento foi alterado.");
            }
            agendamentos = registrosLocais;
        }
        atualizarPainel();
        avisar(`${importados} importado(s); ${repetidos} horário(s) já existente(s).`);
        return true;
    } catch (erro) {
        if (querNuvem) await carregarNuvem().catch(console.error);
        avisar(`${erroLegivel(erro)} ${importados ? `${importados} registro(s) foram importados antes do erro.` : ""}`, true);
        return false;
    } finally {
        operacaoEmCurso = false;
    }
}

document.getElementById("botao-backup").addEventListener("click", async () => {
    if (!querNuvem && falhaLeituraLocal) {
        avisar("Os dados locais não puderam ser lidos. Não gere um backup vazio: preserve o armazenamento original e peça ajuda para recuperá-lo.", true);
        return;
    }
    if (querNuvem) {
        try { await carregarNuvem(); } catch (erro) { avisar(erroLegivel(erro), true); return; }
    }
    const backup = {
        formato: "moss-agenda-pro-v1",
        criadoEm: new Date().toISOString(),
        agendamentos: agendamentosValidos().map(({ nome, servico, telefone, data, hora, observacoes, status }) =>
            ({ nome, servico, telefone: telefone || "", data, hora, observacoes: observacoes || "", status }))
    };
    const arquivo = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");
    link.href = url;
    link.download = `moss-agenda-backup-${dataLocalDeHoje()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    avisar("Backup baixado. Guarde o arquivo em local privado.");
});

document.getElementById("arquivo-backup").addEventListener("change", async (evento) => {
    const arquivo = evento.target.files?.[0];
    if (!arquivo) return;
    try {
        if (arquivo.size > 5 * 1024 * 1024) throw erroDeValidacao("O arquivo deve ter menos de 5 MB.");
        const backup = JSON.parse(await arquivo.text());
        if (!backup || backup.formato !== "moss-agenda-pro-v1") {
            throw erroDeValidacao("Este arquivo não é um backup válido da MOSS Agenda Pro.");
        }
        if (window.confirm("Deseja importar os agendamentos deste backup? Os horários já existentes serão mantidos.")) {
            await importarRegistros(backup.agendamentos);
        }
    } catch (erro) {
        avisar(erro?.name === "SyntaxError" ? "Arquivo JSON inválido." : erroLegivel(erro), true);
    } finally {
        evento.target.value = "";
    }
});

document.getElementById("botao-migrar").addEventListener("click", async () => {
    const antigos = carregarDados();
    if (!antigos.length || !window.confirm(`Enviar ${antigos.length} agendamento(s) deste navegador para sua conta? Os dados locais serão mantidos.`)) return;
    const importado = await importarRegistros(antigos);
    if (!importado || !usuarioAtual) return;
    try { localStorage.setItem(`moss-importado:${usuarioAtual.id}`, "1"); } catch (_) { /* armazenamento bloqueado */ }
    document.getElementById("migracao-local").hidden = true;
});

document.getElementById("alternar-cadastro").addEventListener("click", () => {
    modoCadastro = !modoCadastro;
    mensagemLogin.hidden = true;
    document.getElementById("titulo-login").textContent = modoCadastro ? "Crie sua conta" : "Acesse sua conta";
    document.getElementById("botao-login").textContent = modoCadastro ? "Criar conta grátis" : "Entrar";
    document.getElementById("alternar-cadastro").textContent = modoCadastro ? "Já tem conta? Entrar" : "Ainda não tem conta? Criar conta";
    document.getElementById("senha-login").autocomplete = modoCadastro ? "new-password" : "current-password";
});

formularioLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (!clienteNuvem) return;
    const email = document.getElementById("email-login").value.trim();
    const password = document.getElementById("senha-login").value;
    const botao = document.getElementById("botao-login");
    botao.disabled = true;
    mensagemLogin.hidden = true;
    try {
        const redirectTo = window.location.protocol === "https:" || window.location.hostname === "localhost"
            ? window.location.origin + window.location.pathname : undefined;
        const resultado = modoCadastro
            ? await clienteNuvem.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } })
            : await clienteNuvem.auth.signInWithPassword({ email, password });
        conferirResultado(resultado);
        document.getElementById("senha-login").value = "";
        if (modoCadastro && !resultado.data.session) {
            exibirMensagemLogin("Conta criada! Confirme o e-mail recebido e depois entre com sua senha.");
        }
    } catch (erro) {
        exibirMensagemLogin(erroLegivel(erro));
    } finally {
        botao.disabled = false;
    }
});

document.getElementById("botao-sair").addEventListener("click", async () => {
    if (!clienteNuvem) return;
    try { conferirResultado(await clienteNuvem.auth.signOut({ scope: "local" })); }
    catch (erro) { avisar(erroLegivel(erro), true); }
});

if (querNuvem) iniciarNuvem();
else {
    document.getElementById("aviso-demo").hidden = window.location.protocol !== "https:";
    atualizarPainel();
    if (falhaLeituraLocal) {
        const aviso = document.getElementById("aviso-demo");
        aviso.hidden = false;
        aviso.querySelector("p").textContent = "Não foi possível ler os dados locais. O conteúdo original foi preservado e novas gravações foram bloqueadas. Não limpe os dados do navegador; recupere sua cópia de segurança antes de continuar.";
    }
}
