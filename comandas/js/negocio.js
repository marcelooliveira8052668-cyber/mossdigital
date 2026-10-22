/* =================================================================
   COMANDA FÁCIL — negocio.js
   Regras de negócio puras: não mexem na tela.
   Toda alteração é gravada imediatamente no armazenamento.
   ================================================================= */

var CF = window.CF || (window.CF = {});

CF.negocio = (function () {

    var D = CF.dados;
    var K = CF.dados.CHAVES;

    /* Formas de pagamento aceitas (na ordem em que aparecem na tela). */
    var FORMAS = [
        { id: 'dinheiro', rotulo: '💵 Dinheiro', curto: 'Dinheiro' },
        { id: 'pix',      rotulo: '📱 Pix',      curto: 'Pix' },
        { id: 'debito',   rotulo: '💳 Débito',   curto: 'Débito' },
        { id: 'credito',  rotulo: '💳 Crédito',  curto: 'Crédito' }
    ];

    function rotuloForma(id) {
        var f = FORMAS.filter(function (x) { return x.id === id; })[0];
        return f ? f.curto : id;
    }

    function listaDe(chave, padrao) {
        var v = D.ler(chave, padrao);
        return Array.isArray(v) ? v : padrao;
    }


    /* ================================================================
       PRODUTOS
    ================================================================= */
    function listarProdutos(incluindoInativos) {
        return listaDe(K.produtos, []).filter(function (p) {
            return incluindoInativos || p.ativo !== false;
        });
    }

    function buscarProdutos(termo, categoria) {
        var busca = CF.normalizar(termo);
        return listarProdutos().filter(function (p) {
            if (categoria && categoria !== 'todos' &&
                CF.normalizar(p.categoria) !== CF.normalizar(categoria)) {
                return false;
            }
            if (busca && CF.normalizar(p.nome).indexOf(busca) === -1) return false;
            return true;
        });
    }

    function listarCategorias() {
        var vistas = {};
        listarProdutos().forEach(function (p) {
            if (p.categoria) vistas[p.categoria] = true;
        });
        return Object.keys(vistas).sort(function (a, b) {
            return a.localeCompare(b, 'pt-BR');
        });
    }

    /* Verifica nome duplicado (ignorando acentos e maiúsculas). */
    function produtoDuplicado(nome, ignorandoId) {
        var alvo = CF.normalizar(nome);
        return listaDe(K.produtos, []).some(function (p) {
            return p.id !== ignorandoId && CF.normalizar(p.nome) === alvo;
        });
    }

    function salvarProduto(dados) {
        var produtos = listaDe(K.produtos, []);
        var erro = null;

        if (!dados.nome || !dados.nome.trim()) erro = 'Informe o nome do produto.';
        else if (!(dados.preco > 0)) erro = 'Informe um preço maior que zero.';
        else if (!dados.categoria || !dados.categoria.trim()) erro = 'Informe a categoria.';
        else if (produtoDuplicado(dados.nome, dados.id)) {
            erro = 'Já existe um produto com esse nome.';
        }

        if (erro) return { ok: false, erro: erro };

        var nomeLimpo = dados.nome.trim().slice(0, 60);
        var catLimpa  = CF.primeiraMaiuscula(dados.categoria.trim().slice(0, 30));

        if (dados.id) {
            var idx = produtos.findIndex(function (p) { return p.id === dados.id; });
            if (idx === -1) return { ok: false, erro: 'Produto não encontrado.' };
            produtos[idx] = Object.assign({}, produtos[idx], {
                nome: nomeLimpo,
                preco: CF.arred2(dados.preco),
                categoria: catLimpa,
                ativo: dados.ativo !== false,
                demo: false
            });
        } else {
            produtos.push({
                id: CF.uid(),
                nome: nomeLimpo,
                preco: CF.arred2(dados.preco),
                categoria: catLimpa,
                ativo: dados.ativo !== false,
                criadoEm: Date.now()
            });
        }

        D.salvar(K.produtos, produtos);
        return { ok: true };
    }

    function excluirProduto(id) {
        var produtos = listaDe(K.produtos, []).filter(function (p) { return p.id !== id; });
        D.salvar(K.produtos, produtos);
        return produtos.length;
    }


    /* ================================================================
       FUNCIONÁRIOS
    ================================================================= */
    function listarFuncionarios() {
        return listaDe(K.funcionarios, []);
    }

    function acharPorUsuario(usuario) {
        var alvo = CF.normalizar(usuario);
        return listarFuncionarios().filter(function (f) {
            return CF.normalizar(f.usuario) === alvo;
        })[0] || null;
    }

    function usuarioDuplicado(usuario, ignorandoId) {
        var alvo = CF.normalizar(usuario);
        return listarFuncionarios().some(function (f) {
            return f.id !== ignorandoId && CF.normalizar(f.usuario) === alvo;
        });
    }

    /* Verifica as credenciais. Sempre assíncrono (a senha é protegida). */
    function verificarLogin(usuario, senha) {
        return new Promise(function (resolver) {
            var func = acharPorUsuario(usuario);
            if (!func) return resolver({ ok: false, erro: 'Usuário não encontrado.' });
            if (func.ativo === false) return resolver({ ok: false, erro: 'Este usuário está desativado.' });

            CF.verificarSenha(senha, func.senhaResumo).then(function (certo) {
                if (!certo) return resolver({ ok: false, erro: 'Senha incorreta.' });
                resolver({ ok: true, funcionario: func });
            });
        });
    }

    /* Salva (cria ou edita) um funcionário. Senha só muda se informada. */
    function salvarFuncionario(dados) {
        var funcs = listarFuncionarios();
        var erro = null;

        if (!dados.nome || !dados.nome.trim()) erro = 'Informe o nome completo.';
        else if (!dados.usuario || !dados.usuario.trim()) erro = 'Informe o usuário de acesso.';
        else if (usuarioDuplicado(dados.usuario, dados.id)) erro = 'Esse usuário já está em uso.';
        else if (!dados.id && (!dados.senha || dados.senha.length < 4)) {
            erro = 'A senha precisa ter pelo menos 4 caracteres.';
        } else if (dados.id && dados.senha && dados.senha.length < 4) {
            erro = 'A nova senha precisa ter pelo menos 4 caracteres.';
        }

        if (erro) return Promise.resolve({ ok: false, erro: erro });

        var id = dados.id || CF.uid();

        function gravar(resumo) {
            var lista = listarFuncionarios();
            var existente = lista.filter(function (f) { return f.id === id; })[0];

            if (existente) {
                existente.nome = dados.nome.trim().slice(0, 60);
                existente.usuario = dados.usuario.trim().slice(0, 40);
                existente.tipo = dados.tipo === 'admin' ? 'admin' : 'funcionario';
                existente.ativo = dados.ativo !== false;
                existente.demo = false;
                if (resumo) existente.senhaResumo = resumo;
            } else {
                lista.push({
                    id: id,
                    nome: dados.nome.trim().slice(0, 60),
                    usuario: dados.usuario.trim().slice(0, 40),
                    senhaResumo: resumo,
                    tipo: dados.tipo === 'admin' ? 'admin' : 'funcionario',
                    ativo: true,
                    criadoEm: Date.now()
                });
            }

            D.salvar(K.funcionarios, lista);
            return { ok: true, id: id };
        }

        if (dados.senha) {
            return CF.hashSenha(dados.senha).then(function (r) { return gravar(r); });
        }
        return Promise.resolve(gravar(null));
    }

    function excluirFuncionario(id, idQuemExcluiu) {
        var funcs = listarFuncionarios();
        var alvo = funcs.filter(function (f) { return f.id === id; })[0];

        if (alvo && alvo.tipo === 'admin' &&
            funcs.filter(function (f) { return f.tipo === 'admin' && f.ativo !== false; }).length <= 1) {
            return { ok: false, erro: 'Não é possível remover o último administrador.' };
        }
        if (id === idQuemExcluiu) {
            return { ok: false, erro: 'Você não pode remover o próprio usuário.' };
        }

        D.salvar(K.funcionarios, funcs.filter(function (f) { return f.id !== id; }));
        return { ok: true };
    }


    /* ================================================================
       COMANDAS
    ================================================================= */
    function listarComandas() {
        return listaDe(K.comandas, []);
    }

    function acharComanda(id) {
        return listarComandas().filter(function (c) { return c.id === id; })[0] || null;
    }

    /* Verifica se o número já está em uso entre as comandas abertas. */
    function numeroEmUso(numero) {
        var alvo = CF.normalizar(numero);
        return listarComandas().some(function (c) {
            return CF.normalizar(c.numero) === alvo;
        });
    }

    /* Próximo número sugerido: o maior número existente + 1, ou o
       configurado em Configurações. */
    function sugerirNumero() {
        var cfg = D.carregarConfig();
        var maior = 0;

        listarComandas().forEach(function (c) {
            var n = parseInt(String(c.numero).replace(/[^0-9]/g, ''), 10);
            if (isFinite(n) && n > maior) maior = n;
        });

        listaDe(K.vendas, []).forEach(function (v) {
            var n = parseInt(String(v.numero).replace(/[^0-9]/g, ''), 10);
            if (isFinite(n) && n > maior) maior = n;
        });

        return String(Math.max(maior, (cfg.proximoNumero || 1) - 1) + 1);
    }

    function criarComanda(numero, cliente, quemAbriu) {
        var limpo = String(numero || '').trim().slice(0, 20);
        if (!limpo) return { ok: false, erro: 'Informe o número da comanda.' };

        if (numeroEmUso(limpo)) {
            return { ok: false, erro: 'Já existe uma comanda aberta com esse número.' };
        }

        var comanda = {
            id: CF.uid(),
            numero: limpo,
            cliente: String(cliente || '').trim().slice(0, 40),
            itens: [],
            abertoPor: quemAbriu,
            editadoPor: '',
            status: 'aberta',
            criadoEm: Date.now(),
            enviadoCozinhaEm: null,
            marcadoProntoEm: null
        };

        var comandas = listarComandas();
        comandas.push(comanda);
        D.salvar(K.comandas, comandas);

        return { ok: true, comanda: comanda };
    }

    function gravarComanda(comanda) {
        var comandas = listarComandas();
        var idx = comandas.findIndex(function (c) { return c.id === comanda.id; });
        if (idx === -1) return false;
        comandas[idx] = comanda;
        return D.salvar(K.comandas, comandas);
    }

    function excluirComanda(id) {
        var comandas = listarComandas();
        var alvo = comandas.filter(function (c) { return c.id === id; })[0];
        if (!alvo) return false;
        D.salvar(K.comandas, comandas.filter(function (c) { return c.id !== id; }));
        return true;
    }

    /* ---------------------------------------------------------- ITENS */

    /* Adiciona um produto à comanda. Se o mesmo produto já estiver
       lá, soma a quantidade em vez de duplicar a linha. */
    function adicionarItem(comanda, produto, quem) {
        var existente = comanda.itens.filter(function (i) {
            return i.produtoId === produto.id;
        })[0];

        if (existente) {
            existente.quantidade += 1;
        } else {
            comanda.itens.push({
                id: CF.uid(),
                produtoId: produto.id,
                nome: produto.nome,
                preco: Number(produto.preco) || 0,
                quantidade: 1
            });
        }

        comanda.editadoPor = quem || '';
        gravarComanda(comanda);
        return comanda;
    }

    /* delta = +1 ou -1. Zera remove o item da lista. */
    function alterarQuantidade(comanda, itemId, delta, quem) {
        var item = comanda.itens.filter(function (i) { return i.id === itemId; })[0];
        if (!item) return comanda;

        item.quantidade += delta;
        comanda.itens = comanda.itens.filter(function (i) {
            return i.quantidade > 0;
        });

        comanda.editadoPor = quem || '';
        gravarComanda(comanda);
        return comanda;
    }

    function removerItem(comanda, itemId, quem) {
        comanda.itens = comanda.itens.filter(function (i) { return i.id !== itemId; });
        comanda.editadoPor = quem || '';
        gravarComanda(comanda);
        return comanda;
    }

    /* Total em centavos — evita 0.1 + 0.2 = 0.30000000000000004. */
    function calcularTotal(comanda) {
        var centavos = 0;
        (comanda.itens || []).forEach(function (i) {
            centavos += Math.round((Number(i.preco) || 0) * 100) *
                        (Math.max(1, parseInt(i.quantidade, 10) || 1));
        });
        return centavos / 100;
    }

    function quantidadeItens(comanda) {
        return (comanda.itens || []).reduce(function (soma, i) {
            return soma + (Math.max(1, parseInt(i.quantidade, 10) || 1));
        }, 0);
    }


    /* -------------------------------------------------------- COZINHA */
    function enviarParaCozinha(comanda, quem) {
        if (!comanda.itens.length) return { ok: false, erro: 'Adicione pelo menos um produto.' };
        comanda.status = 'em_preparo';
        comanda.enviadoCozinhaEm = Date.now();
        comanda.marcadoProntoEm = null;
        comanda.editadoPor = quem || '';
        gravarComanda(comanda);
        return { ok: true };
    }

    function marcarPronto(comanda, quem) {
        comanda.status = 'pronto';
        comanda.marcadoProntoEm = Date.now();
        comanda.editadoPor = quem || '';
        gravarComanda(comanda);
        return { ok: true };
    }

    /* Pedidos que a cozinha deve ver. */
    function filaCozinha() {
        return listarComandas().filter(function (c) {
            return c.status === 'em_preparo' || c.status === 'pronto';
        }).sort(function (a, b) {
            return (a.enviadoCozinhaEm || 0) - (b.enviadoCozinhaEm || 0);
        });
    }

    /* Tempo, em segundos, desde que o pedido foi enviado. */
    function tempoNaCozinha(comanda) {
        if (!comanda.enviadoCozinhaEm) return 0;
        var fim = comanda.marcadoProntoEm || Date.now();
        return Math.max(0, Math.floor((fim - comanda.enviadoCozinhaEm) / 1000));
    }


    /* ================================================================
       VENDAS E CAIXA
    ================================================================= */

    /* pagamentos: [{ forma: 'pix', valor: 12.5 }, ...] */
    function validarPagamentos(pagamentos, total) {
        var soma = 0;
        var usados = [];

        pagamentos.forEach(function (p) {
            var v = Number(p.valor) || 0;
            if (v > 0) { soma += v; usados.push(p.forma); }
        });

        soma = CF.arred2(soma);

        if (soma <= 0) return { ok: false, erro: 'Informe pelo menos um valor pago.' };
        if (soma < total - 0.005) {
            return { ok: false, erro: 'Falta receber ' + CF.moeda(total - soma) + '.' };
        }
        if (soma > total + 0.005) {
            return { ok: false, erro: 'Os pagamentos somam ' + CF.moeda(soma) + ', acima do total de ' + CF.moeda(total) + '.' };
        }
        if (usados.indexOf('dinheiro') === -1 &&
            pagamentos.filter(function (p) { return p.forma === 'dinheiro' && Number(p.valor) > 0; }).length) {
            /* não faz nada — só evita avisos */
        }

        return { ok: true, soma: soma };
    }

    /* Converte a comanda em venda e remove a comanda da lista. */
    function finalizarVenda(comanda, pagamentos, recebido, troco, quem) {
        var total = calcularTotal(comanda);

        var checagem = validarPagamentos(pagamentos, total);
        if (!checagem.ok) return checagem;

        var lista = pagamentos
            .filter(function (p) { return (Number(p.valor) || 0) > 0; })
            .map(function (p) { return { forma: p.forma, valor: CF.arred2(p.valor) }; });

        var venda = {
            id: CF.uid(),
            numero: comanda.numero,
            cliente: comanda.cliente || '',
            itens: comanda.itens.map(function (i) { return Object.assign({}, i); }),
            funcionario: quem || comanda.abertoPor || '',
            total: total,
            pagamentos: lista,
            recebido: recebido > 0 ? CF.arred2(recebido) : null,
            troco: troco > 0 ? CF.arred2(troco) : null,
            dataISO: CF.dataHojeISO(),
            criadoEm: Date.now(),
            estornada: false,
            estornoMotivo: null,
            estornadaPor: null,
            estornadaEm: null
        };

        var vendas = listaDe(K.vendas, []);
        vendas.push(venda);
        D.salvar(K.vendas, vendas);

        excluirComanda(comanda.id);

        D.registrar('venda', 'Comanda ' + comanda.numero + ' — ' + CF.moeda(total), quem);
        return { ok: true, venda: venda };
    }

    function listarVendas(dataISO) {
        return listaDe(K.vendas, []).filter(function (v) {
            return !dataISO || v.dataISO === dataISO;
        });
    }

    /* Cancela uma venda (estorno). O registro continua no histórico,
       marcado, para o caixa não sumir com o rastro. */
    function estornarVenda(id, motivo, quem) {
        var vendas = listaDe(K.vendas, []);
        var venda = vendas.filter(function (v) { return v.id === id; })[0];

        if (!venda) return { ok: false, erro: 'Venda não encontrada.' };
        if (venda.estornada) return { ok: false, erro: 'Essa venda já foi estornada.' };

        venda.estornada = true;
        venda.estornoMotivo = motivo;
        venda.estornadaPor = quem;
        venda.estornadaEm = Date.now();

        D.salvar(K.vendas, vendas);
        D.registrar('estorno', 'Venda ' + venda.numero + ' — ' + CF.moeda(venda.total) + ' — motivo: ' + motivo, quem);
        return { ok: true };
    }

    /* Agrega o dia: totais por forma de pagamento, já descontando
       as vendas estornadas. */
    function caixaDoDia(dataISO) {
        var vendas = listarVendas(dataISO);

        var resumo = {
            dataISO: dataISO,
            total: 0,
            quantidade: 0,
            estornadas: 0,
            valorEstornado: 0,
            recebido: 0,
            troco: 0,
            formas: { dinheiro: { total: 0, qtd: 0 }, pix: { total: 0, qtd: 0 },
                      debito:  { total: 0, qtd: 0 }, credito: { total: 0, qtd: 0 } },
            vendas: vendas
        };

        vendas.forEach(function (v) {
            if (v.estornada) {
                resumo.estornadas += 1;
                resumo.valorEstornado += Number(v.total) || 0;
                return;
            }

            resumo.total += Number(v.total) || 0;
            resumo.quantidade += 1;
            if (v.recebido) resumo.recebido += Number(v.recebido);
            if (v.troco) resumo.troco += Number(v.troco);

            (v.pagamentos || []).forEach(function (p) {
                if (resumo.formas[p.forma]) {
                    resumo.formas[p.forma].total += Number(p.valor) || 0;
                    resumo.formas[p.forma].qtd += 1;
                }
            });
        });

        resumo.total = CF.arred2(resumo.total);
        resumo.valorEstornado = CF.arred2(resumo.valorEstornado);
        Object.keys(resumo.formas).forEach(function (f) {
            resumo.formas[f].total = CF.arred2(resumo.formas[f].total);
        });

        return resumo;
    }

    /* Ranking de produtos vendidos em um dia (vendas válidas). */
    function relatorioProdutos(dataISO) {
        var mapa = {};

        listarVendas(dataISO).forEach(function (v) {
            if (v.estornada) return;
            (v.itens || []).forEach(function (i) {
                var chave = CF.normalizar(i.nome);
                if (!mapa[chave]) mapa[chave] = { nome: i.nome, qtd: 0, total: 0 };
                mapa[chave].qtd += Math.max(1, parseInt(i.quantidade, 10) || 1);
                mapa[chave].total += (Number(i.preco) || 0) * (Math.max(1, parseInt(i.quantidade, 10) || 1));
            });
        });

        return Object.keys(mapa).map(function (k) { return mapa[k]; })
            .sort(function (a, b) { return b.qtd - a.qtd || b.total - a.total; })
            .slice(0, 10);
    }

    /* Vendas agrupadas por funcionário (apenas para administradores). */
    function relatorioFuncionarios(dataISO) {
        var mapa = {};

        listarVendas(dataISO).forEach(function (v) {
            if (v.estornada) return;
            var nome = v.funcionario || 'Não informado';
            if (!mapa[nome]) mapa[nome] = { nome: nome, total: 0, qtd: 0 };
            mapa[nome].total += Number(v.total) || 0;
            mapa[nome].qtd += 1;
        });

        return Object.keys(mapa).map(function (k) { return mapa[k]; })
            .sort(function (a, b) { return b.total - a.total; });
    }

    /* Datas que têm vendas registradas — usado no histórico. */
    function diasComVendas() {
        var dias = {};
        listaDe(K.vendas, []).forEach(function (v) { if (v.dataISO) dias[v.dataISO] = true; });
        return Object.keys(dias).sort().reverse();
    }


    /* ---------------------------------------------------------- API */
    return {
        FORMAS: FORMAS,
        rotuloForma: rotuloForma,

        listarProdutos: listarProdutos,
        buscarProdutos: buscarProdutos,
        listarCategorias: listarCategorias,
        salvarProduto: salvarProduto,
        excluirProduto: excluirProduto,

        listarFuncionarios: listarFuncionarios,
        verificarLogin: verificarLogin,
        salvarFuncionario: salvarFuncionario,
        excluirFuncionario: excluirFuncionario,
        acharPorUsuario: acharPorUsuario,

        listarComandas: listarComandas,
        acharComanda: acharComanda,
        numeroEmUso: numeroEmUso,
        sugerirNumero: sugerirNumero,
        criarComanda: criarComanda,
        gravarComanda: gravarComanda,
        excluirComanda: excluirComanda,
        adicionarItem: adicionarItem,
        alterarQuantidade: alterarQuantidade,
        removerItem: removerItem,
        calcularTotal: calcularTotal,
        quantidadeItens: quantidadeItens,

        enviarParaCozinha: enviarParaCozinha,
        marcarPronto: marcarPronto,
        filaCozinha: filaCozinha,
        tempoNaCozinha: tempoNaCozinha,

        validarPagamentos: validarPagamentos,
        finalizarVenda: finalizarVenda,
        listarVendas: listarVendas,
        estornarVenda: estornarVenda,
        caixaDoDia: caixaDoDia,
        relatorioProdutos: relatorioProdutos,
        relatorioFuncionarios: relatorioFuncionarios,
        diasComVendas: diasComVendas
    };

})();
