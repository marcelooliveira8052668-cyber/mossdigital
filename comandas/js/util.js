/* =================================================================
   COMANDA FÁCIL — util.js
   Funções genéricas: escape, moeda, datas, toasts, modal de
   confirmação acessível, senhas e exportação.
   Todas ficam no namespace global `CF`.
   ================================================================= */

var CF = window.CF || (window.CF = {});


/* ------------------------------------------------------------- ESCAPE
   Toda informação vinda do usuário passa por aqui antes de virar HTML.
   Evita XSS e evita que "<b>" no nome do produto quebre a tela.
------------------------------------------------------------------- */
CF.esc = function (valor) {
    if (valor === null || valor === undefined) return '';
    return String(valor)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};


/* --------------------------------------------------------------- MOEDA */

var FORMATADOR_MOEDA = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

/* Formata um número como "R$ 1.234,56". Nunca lança erro. */
CF.moeda = function (valor) {
    var n = Number(valor);
    if (!isFinite(n)) n = 0;
    return FORMATADOR_MOEDA.format(n);
};

/* Sem o "R$ " — para cabeçalhos de tabela. */
CF.moedaSemPrefixo = function (valor) {
    return CF.moeda(valor).replace('R$', '').trim();
};

/* Lê "12,50", "R$ 12.500,00" ou 12.5 e devolve número. */
CF.lerNumero = function (texto) {
    if (typeof texto === 'number') return isFinite(texto) ? texto : 0;
    if (!texto) return 0;
    var s = String(texto).trim().replace(/R\$\s*/gi, '').trim();
    if (!s) return 0;
    /* Se tiver vírgula, ela é o separador decimal. */
    if (s.indexOf(',') !== -1) {
        s = s.replace(/\./g, '').replace(',', '.');
    }
    var n = parseFloat(s.replace(/[^0-9.\-]/g, ''));
    return isFinite(n) ? n : 0;
};

/* Evita erros de ponto flutuante (0.1 + 0.2 = 0.30000000000000004). */
CF.arred2 = function (valor) {
    return Math.round((Number(valor) + Number.EPSILON) * 100) / 100;
};


/* ---------------------------------------------------------------- DATA */

/* Data local no formato AAAA-MM-DD (sem usar UTC, para não "pular" dia). */
CF.dataHojeISO = function (data) {
    var d = data || new Date();
    var ano = d.getFullYear();
    var mes = String(d.getMonth() + 1).padStart(2, '0');
    var dia = String(d.getDate()).padStart(2, '0');
    return ano + '-' + mes + '-' + dia;
};

/* "2026-10-22" -> "22/10/2026" */
CF.dataBR = function (iso) {
    if (!iso) return '—';
    var partes = String(iso).split('-');
    if (partes.length !== 3) return String(iso);
    return partes[2] + '/' + partes[1] + '/' + partes[0];
};

/* "2026-10-22" -> "quinta-feira, 22 de outubro de 2026" */
CF.dataExtenso = function (iso) {
    try {
        var partes = String(iso).split('-');
        var d = new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            Number(partes[2])
        );
        return d.toLocaleDateString('pt-BR', {
            weekday: 'long', day: 'numeric',
            month: 'long', year: 'numeric'
        });
    } catch (e) {
        return CF.dataBR(iso);
    }
};

/* Timestamp (ms) -> "19:42" */
CF.horaBR = function (ms) {
    if (!ms) return '—';
    try {
        return new Date(ms).toLocaleTimeString('pt-BR', {
            hour: '2-digit', minute: '2-digit'
        });
    } catch (e) {
        return '—';
    }
};

/* Segundos -> "1h 05min" ou "12min" ou "45s" */
CF.duracao = function (segundos) {
    var s = Math.max(0, Math.floor(segundos || 0));
    if (s < 60) return s + 's';
    var min = Math.floor(s / 60);
    var resto = s % 60;
    if (min < 60) return min + 'min' + (resto ? ' ' + resto + 's' : '');
    var h = Math.floor(min / 60);
    var minResto = min % 60;
    return h + 'h ' + String(minResto).padStart(2, '0') + 'min';
};

/* Timestamp -> "12/10/2026 às 19:42" */
CF.dataHoraBR = function (ms) {
    if (!ms) return '—';
    return CF.dataBR(CF.dataHojeISO(new Date(ms))) + ' às ' + CF.horaBR(ms);
};


/* ----------------------------------------------------------- IDENTIDADE */

/* Identificador único (usado como chave interna). */
CF.uid = function () {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'id-' + Date.now().toString(36) + '-' +
        Math.random().toString(36).slice(2, 10);
};

/* Normaliza texto para comparação (busca, nomes). */
CF.normalizar = function (texto) {
    return String(texto || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
};

/* "cozinha quente" -> "Cozinha quente" */
CF.primeiraMaiuscula = function (texto) {
    var s = String(texto || '').trim();
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
};


/* --------------------------------------------------------------- SENHAS
   A senha nunca é guardada em texto puro: guardamos um "resumo" (hash)
   SHA-256 com um sal específico da instalação. Assim, quem abrir o
   armazenamento do navegador não enxerga nenhuma senha.
------------------------------------------------------------------- */

var SALT_INSTALACAO = 'comanda-facil-v2';

CF._hashEmCache = {};

/* Função síncrona de emergência caso o navegador não tenha WebCrypto. */
function resumoSimples(texto) {
    var h1 = 0x811c9dc5;
    for (var i = 0; i < texto.length; i++) {
        h1 ^= texto.charCodeAt(i);
        h1 = Math.imul(h1, 0x01000193);
    }
    var h2 = 0;
    for (var j = texto.length - 1; j >= 0; j--) {
        h2 = (h2 * 31 + texto.charCodeAt(j)) >>> 0;
    }
    return 'fb' + (h1 >>> 0).toString(16) + (h2 >>> 0).toString(16);
}

/* Devolve uma Promise com o resumo da senha. */
CF.hashSenha = function (senha) {
    var texto = SALT_INSTALACAO + '|' + String(senha ?? '');

    if (CF._hashEmCache[texto]) {
        return Promise.resolve(CF._hashEmCache[texto]);
    }

    function guardar(valor) {
        CF._hashEmCache[texto] = valor;
        return valor;
    }

    if (window.crypto && crypto.subtle && window.TextEncoder) {
        try {
            var dados = new TextEncoder().encode(texto);
            return crypto.subtle.digest('SHA-256', dados).then(function (buf) {
                var bytes = new Uint8Array(buf);
                var hex = '';
                for (var k = 0; k < bytes.length; k++) {
                    hex += bytes[k].toString(16).padStart(2, '0');
                }
                return guardar(hex);
            }).catch(function () {
                return guardar(resumoSimples(texto));
            });
        } catch (e) {
            return Promise.resolve(guardar(resumoSimples(texto)));
        }
    }

    return Promise.resolve(guardar(resumoSimples(texto)));
};

/* Compara uma senha digitada com o resumo guardado. */
CF.verificarSenha = function (senha, resumoGuardado) {
    return CF.hashSenha(senha).then(function (calculado) {
        return calculado === resumoGuardado;
    });
};


/* --------------------------------------------------------------- TOASTS */

CF.toast = function (mensagem, tipo) {
    var caixa = document.getElementById('toasts');
    if (!caixa) return;

    var el = document.createElement('div');
    el.className = 'toast toast--' + (tipo || 'info');

    var icone = { ok: '✅', erro: '⚠️', aviso: '⚠️', info: 'ℹ️' }[tipo] || 'ℹ️';
    el.innerHTML = '<span aria-hidden="true">' + icone + '</span><span></span>';
    el.lastChild.textContent = String(mensagem);

    caixa.appendChild(el);

    /* Remove sozinho. */
    setTimeout(function () {
        el.classList.add('saindo');
        setTimeout(function () {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, 260);
    }, tipo === 'erro' ? 6500 : 4000);
};


/* ------------------------------------------------------ MODAL GENÉRICO
   Um único modal de confirmação é reaproveitado para tudo
   (excluir comanda, estornar venda, apagar dados...).
------------------------------------------------------------------- */

var _modalAberto = null;
var _resolveConfirmacao = null;
var _focoOriginal = null;

function elementosDoModal(modal) {
    return Array.prototype.filter.call(
        modal.querySelectorAll('button, [href], input, select, textarea'),
        function (el) {
            return !el.disabled && el.offsetParent !== null;
        }
    );
}

CF.abrirModal = function (id) {
    var modal = document.getElementById(id);
    if (!modal) return null;

    _focoOriginal = document.activeElement;
    _modalAberto = modal;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    var alvos = elementosDoModal(modal);
    var primeiro = modal.querySelector('input:not([type="hidden"]), select, textarea') || alvos[0];
    if (primeiro) setTimeout(function () { primeiro.focus(); }, 30);

    return modal;
};

CF.fecharModal = function () {
    if (!_modalAberto) return;
    _modalAberto.hidden = true;
    _modalAberto = null;
    document.body.style.overflow = '';

    if (_focoOriginal && document.contains(_focoOriginal)) {
        try { _focoOriginal.focus(); } catch (e) { /* ignora */ }
    }
    _focoOriginal = null;
};

/* Confirmação com Promessa:  confirmar({...}).then(function(sim){...}) */
CF.confirmar = function (opcoes) {
    var o = opcoes || {};
    var modal = CF.abrirModal(o.modal || 'modalConfirmar');
    if (!modal) return Promise.resolve(false);

    var titulo = document.getElementById('tituloConfirmar');
    var texto  = document.getElementById('textoConfirmar');
    var campoMotivo = document.getElementById('campoMotivo');
    var inputMotivo = document.getElementById('motivoConfirmar');
    var erro   = document.getElementById('erroConfirmar');
    var botao  = document.getElementById('btnConfirmarAcao');

    titulo.textContent = o.titulo || 'Confirmar';
    texto.textContent = o.texto || 'Tem certeza?';

    campoMotivo.hidden = !o.pedirMotivo;
    inputMotivo.value = '';
    erro.hidden = true;
    erro.textContent = '';

    botao.textContent = o.textoBotao || 'Confirmar';
    botao.className = 'btn ' + (o.perigoso === false ? 'btn--principal' : 'btn--perigo');

    if (_resolveConfirmacao) { _resolveConfirmacao(false); }
    _resolveConfirmacao = null;

    return new Promise(function (resolver) {
        _resolveConfirmacao = resolver;

        function concluir(valor, motivo) {
            var r = _resolveConfirmacao;
            _resolveConfirmacao = null;
            CF.fecharModal();
            if (r) r(valor === true ? motivo || true : false);
        }

        botao.onclick = function () {
            if (o.pedirMotivo) {
                var motivo = inputMotivo.value.trim();
                if (motivo.length < 3) {
                    erro.hidden = false;
                    erro.textContent = 'Escreva um motivo com pelo menos 3 letras.';
                    inputMotivo.focus();
                    return;
                }
                concluir(true, motivo);
                return;
            }
            concluir(true);
        };

        Array.prototype.forEach.call(modal.querySelectorAll('[data-fechar-modal]'), function (b) {
            b.onclick = function () { concluir(false); };
        });

        var form = modal.querySelector('form');
        if (form) {
            form.onsubmit = function (ev) {
                ev.preventDefault();
                botao.onclick();
            };
        }
    });
};

/* Fecha qualquer modal aberto pela tecla Esc / clique fora. */
document.addEventListener('keydown', function (ev) {
    if (!_modalAberto) return;

    if (ev.key === 'Escape') {
        ev.preventDefault();
        if (_resolveConfirmacao) {
            var r = _resolveConfirmacao;
            _resolveConfirmacao = null;
            CF.fecharModal();
            r(false);
        } else {
            CF.fecharModal();
        }
        return;
    }

    /* Foco preso dentro do modal (requisito de acessibilidade). */
    if (ev.key === 'Tab') {
        var alvos = elementosDoModal(_modalAberto);
        if (!alvos.length) return;
        var primeiro = alvos[0];
        var ultimo = alvos[alvos.length - 1];

        if (ev.shiftKey && document.activeElement === primeiro) {
            ev.preventDefault(); ultimo.focus();
        } else if (!ev.shiftKey && document.activeElement === ultimo) {
            ev.preventDefault(); primeiro.focus();
        } else if (!_modalAberto.contains(document.activeElement)) {
            ev.preventDefault(); primeiro.focus();
        }
    }
});

document.addEventListener('click', function (ev) {
    if (!_modalAberto) return;
    if (ev.target === _modalAberto) {
        /* Clique no fundo escuro = cancelar. */
        if (_resolveConfirmacao) {
            var r = _resolveConfirmacao;
            _resolveConfirmacao = null;
            CF.fecharModal();
            r(false);
        } else {
            CF.fecharModal();
        }
    }
});


/* -------------------------------------------------------- IMPRESSÃO */

/* Monta um "ticket" de papel térmico (76mm) na área de impressão. */
CF.imprimirTicket = function (titulo, linhas, rodape) {
    var area = document.getElementById('areaImpressao');
    if (!area) return;

    var html = '<div class="ticket">';
    html += '<div class="ticket__titulo">' + CF.esc(titulo) + '</div>';
    html += '<div class="ticket__linha"></div>';

    (linhas || []).forEach(function (linha) {
        if (linha.separador) {
            html += '<div class="ticket__linha"></div>';
            return;
        }
        html += '<div class="ticket__item' + (linha.total ? ' ticket__total' : '') + '">' +
                '<span>' + CF.esc(linha.esquerda) + '</span>' +
                '<span>' + CF.esc(linha.direita) + '</span>' +
                '</div>';
    });

    html += '<div class="ticket__linha"></div>';
    html += '<div class="ticket__pe">' + CF.esc(rodape || 'Obrigado!') + '</div>';
    html += '</div>';

    area.innerHTML = html;
    area.removeAttribute('aria-hidden');

    setTimeout(function () {
        window.print();
        area.innerHTML = '';
        area.setAttribute('aria-hidden', 'true');
    }, 60);
};


/* ------------------------------------------------------------- ARQUIVOS */

CF.baixarArquivo = function (nome, conteudo, tipo) {
    var blob = new Blob([conteudo], { type: tipo || 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = nome;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 800);
};

/* Converte lista de objetos em CSV (com separador ;) e baixa. */
CF.baixarCSV = function (nomeArquivo, colunas, linhas) {
    function celula(valor) {
        var s = String(valor === null || valor === undefined ? '' : valor);
        /* Excel brasileiro: separador ; e decimal vírgula. */
        if (s.indexOf(';') !== -1 || s.indexOf('"') !== -1 || s.indexOf('\n') !== -1) {
            s = '"' + s.replace(/"/g, '""') + '"';
        }
        return s;
    }

    var csv = '\uFEFF'; /* BOM para o Excel reconhecer acentos */
    csv += colunas.map(celula).join(';') + '\r\n';

    linhas.forEach(function (linha) {
        csv += linha.map(celula).join(';') + '\r\n';
    });

    CF.baixarArquivo(nomeArquivo, csv, 'text/csv;charset=utf-8');
};

/* Foco em um elemento com segurança. */
CF.focar = function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    setTimeout(function () {
        try { el.focus(); } catch (e) { /* ignora */ }
    }, 40);
};
