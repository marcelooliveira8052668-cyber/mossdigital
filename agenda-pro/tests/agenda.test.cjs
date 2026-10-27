"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const sandbox = { module: { exports: {} } };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../agenda-utils.js"), "utf8"), sandbox);
const utils = sandbox.module.exports;

test("datas reais e anos bissextos", () => {
    assert.equal(utils.dataValida("2028-02-29"), true);
    for (const data of ["2026-02-29", "2026-04-31", "2026-13-01", "01/02/2026", undefined]) {
        assert.equal(utils.dataValida(data), false);
    }
});
test("navegação entre meses e anos", () => {
    assert.equal(utils.deslocarDia("2026-12-31", 1), "2027-01-01");
    assert.equal(utils.deslocarDia("2028-03-01", -1), "2028-02-29");
    assert.equal(utils.deslocarDia("2026-03-01", -1), "2026-02-28");
    assert.equal(utils.deslocarDia("inválida", 1), "");
});
test("WhatsApp brasileiro com ou sem código do país", () => {
    assert.equal(utils.telefoneWhatsApp("(11) 99999-1234"), "5511999991234");
    assert.equal(utils.telefoneWhatsApp("+55 (11) 99999-1234"), "5511999991234");
    assert.equal(utils.telefoneWhatsApp("(55) 99999-1234"), "5555999991234");
    assert.equal(utils.telefoneWhatsApp("11 3333-1234"), "551133331234");
    for (const numero of ["", "123", "00 99999-1234", "11 88888-1234"]) assert.equal(utils.telefoneWhatsApp(numero), "");
});
test("lembrete codifica os dados e não inclui observações privadas", () => {
    const link = utils.linkLembrete({ nome: "João & Ana", servico: "Corte / escova", data: "2026-12-01", hora: "10:30", telefone: "11999991234", observacoes: "SEGREDO" });
    const url = new URL(link);
    assert.equal(url.origin, "https://wa.me");
    assert.match(url.searchParams.get("text"), /João & Ana/);
    assert.match(url.searchParams.get("text"), /01\/12\/2026, às 10:30/);
    assert.equal(link.includes("SEGREDO"), false);
    assert.equal(utils.linkLembrete({ telefone: "123" }), "");
});

function criarApp(texto = null) {
    const elementos = new Map();
    function elemento(id) {
        if (!elementos.has(id)) elementos.set(id, {
            value: id === "filtro-status" ? "todos" : "", hidden: false, children: [], listeners: {},
            firstChild: { textContent: "" }, classList: { toggle() {} }, style: {},
            append(...itens) { this.children.push(...itens); },
            appendChild(item) { this.children.push(item); },
            replaceChildren(...itens) { this.children = itens; },
            setAttribute() {}, removeAttribute() {}, focus() {}, scrollIntoView() {},
            reset() {}, querySelector() { return elemento("mensagem-interna"); },
            addEventListener(evento, acao) { this.listeners[evento] = acao; }
        });
        return elementos.get(id);
    }
    let armazenamento = texto;
    let bloquear = false;
    const context = {
        document: { getElementById: elemento, createElement: () => elemento(Symbol()), querySelectorAll: () => [] },
        location: { protocol: "http:", hash: "" },
        localStorage: { getItem: () => armazenamento, setItem: (_chave, valor) => { if (bloquear) throw Error("QuotaExceeded"); armazenamento = valor; } },
        MossAgendaUtils: utils, crypto: { randomUUID: () => `teste-${Math.random()}` },
        console: { error() {} }, setTimeout() {}, clearTimeout() {}, addEventListener() {}, confirm: () => true
    };
    context.window = context;
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(__dirname, "../script.js"), "utf8"), context);
    return {
        elemento, run: (codigo) => vm.runInContext(codigo, context),
        dados: () => JSON.parse(armazenamento || "[]"),
        bloquear: () => { bloquear = true; },
        async cadastrar(nome = "Cliente de teste", hora = "10:30") {
            for (const [id, valor] of Object.entries({ "nome-cliente": nome, servico: "Corte", "data-agendamento": "2026-12-01", "hora-agendamento": hora })) elemento(id).value = valor;
            await elemento("form-agendamento").listeners.submit({ preventDefault() {} });
        }
    };
}
test("cadastro e conflito no mesmo horário", async () => {
    const app = criarApp();
    await app.cadastrar();
    await app.cadastrar("Outro cliente");
    assert.equal(app.dados().length, 1);
    assert.match(app.elemento("mensagem-formulario").textContent, /ocupado/);
});
test("cadastro não altera a agenda nem limpa o formulário quando o armazenamento falha", async () => {
    const app = criarApp(); app.bloquear();
    await app.cadastrar();
    assert.equal(app.run("agendamentos.length"), 0);
    assert.equal(app.elemento("nome-cliente").value, "Cliente de teste");
    assert.match(app.elemento("notificacao").textContent, /Nenhum agendamento foi alterado/);
});
test("conclusão e exclusão também preservam dados em falhas de gravação", async () => {
    const app = criarApp(); await app.cadastrar(); app.bloquear();
    await app.run("alternarConclusao(agendamentos[0].id)");
    assert.equal(app.run("agendamentos[0].status"), "pendente");
    await app.run("excluirAgendamento(agendamentos[0].id)");
    assert.equal(app.run("agendamentos.length"), 1);
    assert.equal(app.dados().length, 1);
});
test("edição, conclusão e exclusão persistem quando o armazenamento está disponível", async () => {
    const app = criarApp(); await app.cadastrar();
    app.run("editarAgendamento(agendamentos[0].id)");
    await app.cadastrar("Cliente atualizado");
    assert.equal(app.dados()[0].nome, "Cliente atualizado");
    await app.run("alternarConclusao(agendamentos[0].id)");
    assert.equal(app.dados()[0].status, "concluido");
    await app.run("excluirAgendamento(agendamentos[0].id)");
    assert.equal(app.dados().length, 0);
});
test("importação remove horários duplicados e valida todos os registros antes de gravar", async () => {
    const app = criarApp(); await app.cadastrar();
    const registro = JSON.stringify({ nome: "Importado", servico: "Teste", data: "2026-12-01", hora: "11:30" });
    await app.run(`importarRegistros([${registro},${registro}])`);
    assert.equal(app.dados().length, 2);
    await app.run(`importarRegistros([${registro},{nome:'inválido'}])`);
    assert.equal(app.dados().length, 2);
});
test("importação local é atômica quando a persistência falha", async () => {
    const app = criarApp(); await app.cadastrar(); app.bloquear();
    await app.run("importarRegistros([{nome:'Importado',servico:'Teste',data:'2026-12-01',hora:'11:30'}])");
    assert.equal(app.run("agendamentos.length"), 1);
    assert.equal(app.dados().length, 1);
});
test("dados corrompidos ficam preservados e bloqueiam sobrescrita", async () => {
    const app = criarApp("{json-inválido");
    await app.cadastrar();
    assert.equal(app.run("localStorage.getItem(CHAVE_DADOS)"), "{json-inválido");
    assert.equal(app.run("falhaLeituraLocal"), true);
});
