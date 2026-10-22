/* =================================================================
   COMANDA FÁCIL — dados.js
   Camada de armazenamento local.
   • Chaves próprias (cf_*), livres do nome do cliente original.
   • Migração automática dos dados antigos (granForno*).
   • Nada sensível em texto puro: senhas viram hash aqui.
   ================================================================= */

var CF = window.CF || (window.CF = {});

CF.dados = (function () {

    /* ------------------------------------------------------ CHAVES */
    var CHAVES = {
        produtos:     'cf_produtos',
        comandas:     'cf_comandas',
        vendas:       'cf_vendas',
        funcionarios: 'cf_funcionarios',
        config:       'cf_config',
        log:          'cf_log',
        sessao:       'cf_sessao'
    };

    /* Versão do esquema — futuras migrações usam isto. */
    var VERSAO = 2;


    /* ------------------------------------------------- LEITURA/GRAVAÇÃO */
    function ler(chave, padrao) {
        try {
            var bruto = localStorage.getItem(chave);
            if (bruto === null) return padrao;
            var valor = JSON.parse(bruto);
            return valor === null || valor === undefined ? padrao : valor;
        } catch (e) {
            console.warn('[Comanda Fácil] Falha ao ler "' + chave + '":', e);
            return padrao;
        }
    }

    function salvar(chave, valor) {
        try {
            localStorage.setItem(chave, JSON.stringify(valor));
            return true;
        } catch (e) {
            console.error('[Comanda Fácil] Falha ao gravar "' + chave + '":', e);
            CF.toast('Não foi possível gravar no navegador. ' +
                     'Libere espaço ou desative o modo anônimo.', 'erro');
            return false;
        }
    }

    function remover(chave) {
        try { localStorage.removeItem(chave); } catch (e) { /* ignora */ }
    }


    /* ------------------------------------------------------- CONFIGURAÇÃO */
    var CONFIG_PADRAO = {
        versao: VERSAO,
        nomeEmpresa: 'Comanda Fácil',
        endereco: '',
        telefone: '',
        cnpj: '',
        proximoNumero: 1
    };

    function carregarConfig() {
        var cfg = ler(CHAVES.config, null);
        if (!cfg || typeof cfg !== 'object') return Object.assign({}, CONFIG_PADRAO);
        return Object.assign({}, CONFIG_PADRAO, cfg);
    }

    function salvarConfig(cfg) {
        cfg.versao = VERSAO;
        return salvar(CHAVES.config, cfg);
    }


    /* ---------------------------------------------------------- LOG
       Um trilha simples de ações sensíveis (senhas trocadas, estornos,
       exclusões). Fica invisível na interface mas dá rastroabilidade.
    ----------------------------------------------------------------- */
    function registrar(acao, detalhe, quem) {
        var log = ler(CHAVES.log, []);
        log.push({
            id: CF.uid(),
            acao: acao,
            detalhe: detalhe || '',
            quem: quem || 'sistema',
            em: Date.now()
        });
        /* Mantém apenas os últimos 500 registros. */
        if (log.length > 500) log = log.slice(-500);
        salvar(CHAVES.log, log);
    }


    /* ================================================================
       MIGRAÇÃO
       O projeto original gravava tudo em chaves "granForno*". Se elas
       existirem, importamos os dados uma única vez, convertendo para o
       formato novo e protegendo as senhas.
       É assíncrona porque proteger a senha exige o WebCrypto.
    ================================================================= */
    function migrarSePreciso() {
        var configAtual = ler(CHAVES.config, null);
        if (configAtual && configAtual.versao >= VERSAO) {
            /* Esquema atual — garante apenas que as coleções existam. */
            return Promise.resolve(false);
        }

        var houveMigracao = false;

        /* --- funcionários (senha estava em texto puro) --- */
        var funcsNovos = ler(CHAVES.funcionarios, []);
        var funcsAntigos = Array.isArray(funcsNovos) && funcsNovos.length
            ? [] : ler('granFornoFuncionarios', []);

        var promessas = [];

        funcsAntigos.forEach(function (f) {
            promessas.push(
                CF.hashSenha(f.senha || '1234').then(function (resumo) {
                    return {
                        id: CF.uid(),
                        nome: f.nome || f.usuario || 'Funcionário',
                        usuario: f.usuario || '',
                        /* Senha antiga em texto puro: virou hash na hora. */
                        senhaResumo: resumo,
                        tipo: f.tipo === 'admin' ? 'admin' : 'funcionario',
                        ativo: f.ativo !== false,
                        criadoEm: Date.now(),
                        migrou: true
                    };
                })
            );
        });

        return Promise.all(promessas).then(function (novos) {
            funcsNovos = funcsNovos.concat(novos);
            if (novos.length) houveMigracao = true;

            if (funcsNovos.length === 0) {
                return semearFuncionarios().then(function (semeados) {
                    funcsNovos = semeados;
                    salvar(CHAVES.funcionarios, funcsNovos);
                    return prosseguir();
                });
            }

            salvar(CHAVES.funcionarios, funcsNovos);
            return prosseguir();
        });

        function prosseguir() {
            /* --- produtos --- */
            var prodsNovos = ler(CHAVES.produtos, []);
            if (prodsNovos.length === 0) {
                var prodsAntigos = ler('granFornoProdutos', []);
                if (Array.isArray(prodsAntigos) && prodsAntigos.length) {
                    prodsAntigos.forEach(function (p) {
                        prodsNovos.push({
                            id: CF.uid(),
                            nome: p.nome || 'Produto',
                            preco: Number(p.preco) || 0,
                            categoria: CF.primeiraMaiuscula(p.categoria || 'outros'),
                            ativo: true
                        });
                    });
                    houveMigracao = true;
                }
            }
            if (prodsNovos.length === 0) prodsNovos = semearProdutos();
            salvar(CHAVES.produtos, prodsNovos);

            /* --- comandas abertas --- */
            var comandasNovas = ler(CHAVES.comandas, []);
            if (comandasNovas.length === 0) {
                var comandasAntigas = ler('granFornoComandas', []);
                if (Array.isArray(comandasAntigas) && comandasAntigas.length) {
                    comandasAntigas.forEach(function (c) {
                        comandasNovas.push({
                            id: CF.uid(),
                            numero: String(c.numero || ''),
                            cliente: c.cliente || '',
                            itens: normalizarItens(c.itens),
                            abertoPor: c.funcionarioNome || c.abertoPor || '',
                            editadoPor: '',
                            status: c.status || 'aberta',
                            criadoEm: c.criadoEm || Date.now(),
                            enviadoCozinhaEm: c.horarioCozinha || null,
                            marcadoProntoEm: c.prontoEm || null
                        });
                    });
                    houveMigracao = true;
                }
            }
            salvar(CHAVES.comandas, comandasNovas);

            /* --- vendas --- */
            var vendasNovas = ler(CHAVES.vendas, []);
            if (vendasNovas.length === 0) {
                var vendasAntigas = ler('granFornoVendas', []);
                if (Array.isArray(vendasAntigas) && vendasAntigas.length) {
                    vendasAntigas.forEach(function (v) {
                        var forma = normalizarForma(v.pagamento);
                        vendasNovas.push({
                            id: CF.uid(),
                            numero: String(v.numero || ''),
                            itens: normalizarItens(v.itens),
                            funcionario: v.funcionarioNome || '',
                            total: Number(v.total) || 0,
                            pagamentos: [{ forma: forma, valor: Number(v.total) || 0 }],
                            recebido: null,
                            troco: null,
                            dataISO: v.dataISO || CF.dataHojeISO(),
                            criadoEm: v.criadoEm || Date.now(),
                            estornada: false,
                            estornoMotivo: null,
                            estornadaPor: null,
                            estornadaEm: null
                        });
                    });
                    houveMigracao = true;
                }
            }
            salvar(CHAVES.vendas, vendasNovas);

            /* --- configuração --- */
            var cfg = carregarConfig();
            cfg.versao = VERSAO;
            salvarConfig(cfg);

            /* Remove as chaves antigas já importadas. */
            ['granFornoFuncionarios', 'granFornoProdutos',
             'granFornoComandas', 'granFornoVendas'].forEach(remover);

            return houveMigracao;
        }
    }


    /* Converte os itens do formato antigo para o novo. */
    function normalizarItens(itens) {
        if (!Array.isArray(itens)) return [];
        return itens.map(function (i) {
            return {
                id: CF.uid(),
                produtoId: i.produtoId || null,
                nome: i.nome || 'Item',
                preco: Number(i.preco) || 0,
                quantidade: Math.max(1, parseInt(i.quantidade, 10) || 1)
            };
        });
    }

    var FORMAS = {
        'Dinheiro': 'dinheiro',
        'Pix': 'pix',
        'Debito': 'debito',
        'Débito': 'debito',
        'Credito': 'credito',
        'Crédito': 'credito'
    };

    function normalizarForma(forma) {
        return FORMAS[String(forma || '')] || FORMAS[CF.primeiraMaiuscula(String(forma || ''))] || 'dinheiro';
    }


    /* --------------------------------------------------------- DADOS DE
       DEMONSTRAÇÃO
       Quem instala já vê o sistema funcionando. É só apagar em
       Cadastros e no botão "Apagar todos os dados".
    ----------------------------------------------------------------- */
    function semearProdutos() {
        var base = [
            ['Refrigerante lata', 6.00, 'Bebidas'],
            ['Suco natural 500ml', 9.50, 'Bebidas'],
            ['Água mineral', 4.00, 'Bebidas'],
            ['Café expresso', 5.00, 'Bebidas'],
            ['Cerveja long neck', 12.00, 'Bebidas'],
            ['X-Burger', 24.90, 'Lanches'],
            ['X-Salada', 22.90, 'Lanches'],
            ['X-Bacon', 28.90, 'Lanches'],
            ['Batata frita grande', 18.00, 'Lanches'],
            ['Porção de frango à passarinho', 38.00, 'Porções'],
            ['Pizza broto (individual)', 32.00, 'Pizzas'],
            ['Pizza grande (8 fatias)', 62.00, 'Pizzas'],
            ['Pão de queijo (6 un.)', 12.00, 'Padaria'],
            ['Bolo de chocolate (fatia)', 11.00, 'Doces'],
            ['Pudim de leite (fatia)', 10.00, 'Doces']
        ];

        return base.map(function (p) {
            return {
                id: CF.uid(),
                nome: p[0],
                preco: p[1],
                categoria: p[2],
                ativo: true,
                demo: true
            };
        });
    }

    /* Assíncrona: proteger a senha exige o WebCrypto. */
    function semearFuncionarios() {
        return CF.hashSenha('1234').then(function (resumo) {
            return [{
                id: CF.uid(),
                nome: 'Administrador',
                usuario: 'admin',
                senhaResumo: resumo,
                tipo: 'admin',
                ativo: true,
                criadoEm: Date.now(),
                demo: true
            }];
        });
    }


    /* -------------------------------------------------------- EXPORTAR */
    function exportarTudo() {
        return {
            aplicacao: 'Comanda Fácil',
            versao: VERSAO,
            exportadoEm: new Date().toISOString(),
            config: carregarConfig(),
            produtos: ler(CHAVES.produtos, []),
            comandas: ler(CHAVES.comandas, []),
            vendas: ler(CHAVES.vendas, []),
            funcionarios: ler(CHAVES.funcionarios, []),
            log: ler(CHAVES.log, [])
        };
    }

    /* Importa um backup. Valida o formato antes de substituir. */
    function importarTudo(obj) {
        if (!obj || typeof obj !== 'object') {
            return { ok: false, erro: 'Arquivo inválido.' };
        }
        var temAlgumDado = ['produtos', 'comandas', 'vendas', 'funcionarios']
            .some(function (c) { return Array.isArray(obj[c]); });

        if (!temAlgumDado && !obj.config) {
            return { ok: false, erro: 'Este arquivo não parece ser um backup do Comanda Fácil.' };
        }

        salvar(CHAVES.produtos, Array.isArray(obj.produtos) ? obj.produtos : []);
        salvar(CHAVES.comandas, Array.isArray(obj.comandas) ? obj.comandas : []);
        salvar(CHAVES.vendas, Array.isArray(obj.vendas) ? obj.vendas : []);
        salvar(CHAVES.funcionarios, Array.isArray(obj.funcionarios) ? obj.funcionarios : []);
        salvar(CHAVES.log, Array.isArray(obj.log) ? obj.log : []);
        salvar(CHAVES.config, Object.assign({}, CONFIG_PADRAO, obj.config || {}, { versao: VERSAO }));

        return { ok: true };
    }

    /* Zera tudo (mantém a configuração da empresa). */
    function apagarTudo() {
        remover(CHAVES.produtos);
        remover(CHAVES.comandas);
        remover(CHAVES.vendas);
        remover(CHAVES.funcionarios);
        remover(CHAVES.log);
        remover(CHAVES.sessao);
        ['granFornoFuncionarios', 'granFornoProdutos',
         'granFornoComandas', 'granFornoVendas'].forEach(remover);
    }


    /* ---------------------------------------------------------- API */
    return {
        CHAVES: CHAVES,
        VERSAO: VERSAO,
        ler: ler,
        salvar: salvar,
        remover: remover,
        carregarConfig: carregarConfig,
        salvarConfig: salvarConfig,
        registrar: registrar,
        migrarSePreciso: migrarSePreciso,
        semearProdutos: semearProdutos,
        semearFuncionarios: semearFuncionarios,
        normalizarForma: normalizarForma,
        exportarTudo: exportarTudo,
        importarTudo: importarTudo,
        apagarTudo: apagarTudo
    };

})();
