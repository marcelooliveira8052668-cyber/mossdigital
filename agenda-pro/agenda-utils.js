(function (root) {
    "use strict";

    function dataValida(valor) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(valor || "")) return false;
        const data = new Date(`${valor}T12:00:00`);
        return !Number.isNaN(data.getTime()) &&
            `${String(data.getFullYear()).padStart(4, "0")}-${String(data.getMonth() + 1).padStart(2, "0")}-${String(data.getDate()).padStart(2, "0")}` === valor;
    }

    function deslocarDia(valor, quantidade) {
        if (!dataValida(valor)) return "";
        const data = new Date(`${valor}T12:00:00`);
        data.setDate(data.getDate() + quantidade);
        if (data.getFullYear() < 1 || data.getFullYear() > 9999) return "";
        return `${String(data.getFullYear()).padStart(4, "0")}-${String(data.getMonth() + 1).padStart(2, "0")}-${String(data.getDate()).padStart(2, "0")}`;
    }

    function telefoneWhatsApp(valor) {
        const digitos = String(valor || "").replace(/\D/g, "");
        const nacional = /^55\d{10,11}$/.test(digitos) ? digitos.slice(2) : digitos;
        if (!/^[1-9]\d(?:[2-5]\d{7}|9\d{8})$/.test(nacional)) return "";
        return `55${nacional}`;
    }

    function linkLembrete(item) {
        const telefone = telefoneWhatsApp(item.telefone);
        if (!telefone || !dataValida(item.data) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(item.hora || "")) return "";
        const [ano, mes, dia] = item.data.split("-");
        const mensagem = `Olá, ${item.nome}! Passando para lembrar do seu atendimento de ${item.servico} em ${dia}/${mes}/${ano}, às ${item.hora}. Podemos confirmar sua presença?`;
        return `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    }

    const utils = Object.freeze({ dataValida, deslocarDia, telefoneWhatsApp, linkLembrete });
    if (typeof module !== "undefined" && module.exports) module.exports = utils;
    else root.MossAgendaUtils = utils;
})(typeof window !== "undefined" ? window : globalThis);
