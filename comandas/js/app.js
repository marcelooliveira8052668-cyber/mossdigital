/* =================================================================
   COMANDA FÁCIL — app.js
   Liga a interface às regras de negócio.
   Regra: nenhum `onclick` no HTML — tudo por delegação de eventos.
   ================================================================= */

(function () {

    var N = CF.negocio;
    var D = CF.dados;

    /* ------------------------------------------------------ ESTADO */
    var estado = {
        funcionario: null,          /* quem está logado */
        comandaAtualId: null,
        tela: 'comandas',
        filtroComandas: 'todas',
        buscaComandas: '',
        categoriaAtiva: 'todos',
        buscaProduto: '',
        dataCaixa: CF.dataHojeISO(),
        filtroVendas: 'todas',
        filtroCadastros: 'todos',
        buscaCadastroProduto: '',
        buscaCadastroFuncionario: '',
        aba: 'produtos',
        pagamentos: {}
    };


    /* ================================================================
       ATALHOS DE ELEMENTO
    ================================================================= */
    function el(id) { return document.getElementById(id); }

    function valor(id) {
        var e = el(id);
        return e ? e.value : '';
    }


    /* ================================================================
       LOGIN / CRIAR CONTA
    ================================================================= */
    function iniciarLogin() {
        var form = el('formLogin');
        if (form) form.addEventListener('submit', fazerLogin);

        var cadastro = el('formCadastro');
        if (cadastro) cadastro.addEventListener('submit', fazerConta);

        if (el('abaEntrar')) {
            el('abaEntrar').addEventListener('click', function () { mostrarAba('entrar'); });
        }
        if (el('abaCriarConta')) {
            el('abaCriarConta').addEventListener('click', function () { mostrarAba('criar'); });
        }

        /* Mostrar/ocultar senha: o botão aponta para o campo com data-campo,
           então os três pares da tela de entrada usam o mesmo código. */
        Array.prototype.forEach.call(
            document.querySelectorAll('.btn-olho[data-campo]'),
            function (botao) {
                botao.addEventListener('click', function () {
                    var campo = el(botao.getAttribute('data-campo'));
                    if (!campo) return;
                    var mostrando = campo.type === 'text';
                    campo.type = mostrando ? 'password' : 'text';
                    botao.textContent = mostrando ? 'Mostrar' : 'Ocultar';
                    botao.setAttribute('aria-pressed', String(!mostrando));
                    botao.setAttribute('aria-label',
                        mostrando ? 'Mostrar senha' : 'Ocultar senha');
                });
            }
        );

        atualizarDica();
    }

    /* Troca entre "Entrar" e "Criar conta". */
    function mostrarAba(qual) {
        var criando = qual === 'criar';
        var formLogin = el('formLogin');
        var formCadastro = el('formCadastro');
        if (!formLogin || !formCadastro || !el('abaEntrar')) return;

        formLogin.hidden = criando;
        formCadastro.hidden = !criando;

        el('abaEntrar').classList.toggle('ativo', !criando);
        el('abaCriarConta').classList.toggle('ativo', criando);
        el('abaEntrar').setAttribute('aria-selected', String(!criando));
        el('abaCriarConta').setAttribute('aria-selected', String(criando));

        var erroEl = el('login-erro');
        if (erroEl) { erroEl.hidden = true; erroEl.textContent = ''; }

        CF.focar(criando ? 'cadNome' : 'usuario');
    }

    /* A dica de baixo muda conforme o estado real das contas. */
    function atualizarDica() {
        var dica = el('login-dica');
        if (!dica) return;

        var funcs = N.listarFuncionarios();

        if (!funcs.length) {
            /* Caso do sistema limpo: sem contas não há nada para entrar. */
            dica.innerHTML = 'Nenhuma conta cadastrada ainda. Abra a aba ' +
                '<b>Criar conta</b> — na primeira, o cargo nasce ' +
                '<b>administrador</b>.';
            return;
        }

        if (funcs.some(function (f) { return f.demo; })) {
            dica.innerHTML = 'Primeira vez? Entre com <b>admin</b> / <b>1234</b> ' +
                'e troque a senha em <b>Cadastros → Funcionários</b>.';
            return;
        }

        dica.innerHTML = 'Esqueceu a senha? Um administrador redefine em ' +
            '<b>Cadastros → Funcionários</b>.';
    }

    function fazerLogin(ev) {
        ev.preventDefault();

        var usuario = valor('usuario').trim();
        var senha = valor('senha');
        var erroEl = el('login-erro');
        var botao = el('btnEntrar');

        erroEl.hidden = true;
        erroEl.textContent = '';

        if (!usuario || !senha) {
            erroEl.textContent = 'Preencha o usuário e a senha.';
            erroEl.hidden = false;
            return;
        }

        botao.disabled = true;
        botao.textContent = 'Verificando…';

        N.verificarLogin(usuario, senha).then(function (resultado) {
            botao.disabled = false;
            botao.textContent = 'Entrar';

            if (!resultado.ok) {
                /* Sem conta cadastrada (sistema limpo): em vez de deixar a
                   pessoa encostada numa tela sem saída, abre o cadastro. */
                if (resultado.erro && resultado.erro.indexOf('não encontrado') !== -1) {
                    mostrarAba('criar');
                } else {
                    CF.focar('senha');
                }

                erroEl.textContent = resultado.erro || 'Não foi possível entrar.';
                erroEl.hidden = false;
                return;
            }

            entrarNoSistema(resultado.funcionario);
        });
    }

    /* Cria a conta pela tela de entrada e já entra com ela. */
    function fazerConta(ev) {
        ev.preventDefault();

        var erroEl = el('login-erro');
        var botao = el('btnCriarConta');

        erroEl.hidden = true;
        erroEl.textContent = '';

        var dados = {
            nome: valor('cadNome').trim(),
            usuario: valor('cadUsuario').trim(),
            senha: valor('cadSenha'),
            repetir: valor('cadSenha2')
        };

        if (!dados.nome || !dados.usuario || !dados.senha) {
            erroEl.textContent = 'Preencha nome, usuário e senha.';
            erroEl.hidden = false;
            return;
        }

        botao.disabled = true;
        botao.textContent = 'Criando…';

        N.criarConta(dados).then(function (resultado) {
            botao.disabled = false;
            botao.textContent = 'Criar conta';

            if (!resultado.ok) {
                erroEl.textContent = resultado.erro || 'Não foi possível criar a conta.';
                erroEl.hidden = false;
                return;
            }

            CF.toast(resultado.primeira
                ? 'Conta criada — você é o administrador.'
                : 'Conta criada.', 'ok');

            entrarNoSistema(resultado.funcionario);
        });
    }

    function entrarNoSistema(funcionario) {
        estado.funcionario = funcionario;

        /* A sessão vale enquanto o navegador estiver aberto.
           Ao fechar, pede login de novo. */
        try {
            sessionStorage.setItem(D.CHAVES.sessao, JSON.stringify({
                id: funcionario.id, em: Date.now()
            }));
        } catch (e) { /* modo restrito */ }

        el('telaLogin').hidden = true;
        el('sistema').hidden = false;

        var nomeTopo = el('nomeEmpresaTopo');
        nomeTopo.textContent = D.carregarConfig().nomeEmpresa;

        el('quemLogado').innerHTML =
            CF.esc(funcionario.nome) + ' · ' +
            '<b>' + (funcionario.tipo === 'admin' ? 'admin' : 'funcionário') + '</b>';

        /* Administrador vê tudo; funcionário não vê cadastros/config. */
        Array.prototype.forEach.call(
            document.querySelectorAll('.nav-btn'),
            function (b) {
                var restrito = (b.dataset.tela === 'cadastros' || b.dataset.tela === 'config');
                b.hidden = restrito && funcionario.tipo !== 'admin';
            }
        );

        document.body.dataset.tela = 'comandas';
        irPara('comandas');
    }

    function sair() {
        try { sessionStorage.removeItem(D.CHAVES.sessao); } catch (e) { /* ignora */ }
        estado.funcionario = null;
        el('sistema').hidden = true;
        el('telaLogin').hidden = false;
        el('senha').value = '';

        /* Recalcula a dica e volta para a aba certa: quem acabou de criar a
           conta não pode encontrar "nenhuma conta cadastrada" aqui. */
        if (el('formCadastro') && !el('formCadastro').hidden) {
            mostrarAba('entrar');
        } else {
            atualizarDica();
            CF.focar('usuario');
        }
    }

    /* Tenta recuperar a sessão se o navegador foi recarregado. */
    function tentarRecuperarSessao() {
        var bruto = null;
        try { bruto = sessionStorage.getItem(D.CHAVES.sessao); } catch (e) { /* ignora */ }
        if (!bruto) return false;

        try {
            var salvo = JSON.parse(bruto);
            var func = N.listarFuncionarios().filter(function (f) { return f.id === salvo.id; })[0];
            if (func && func.ativo !== false) {
                entrarNoSistema(func);
                return true;
            }
        } catch (e) { /* ignora */ }
        return false;
    }


    /* ================================================================
       NAVEGAÇÃO ENTRE TELAS
    ================================================================= */
    function irPara(tela) {
        if (tela === 'cadastros' || tela === 'config') {
            if (!estado.funcionario || estado.funcionario.tipo !== 'admin') {
                CF.toast('Somente administradores acessam esta tela.', 'aviso');
                return;
            }
        }

        estado.tela = tela;
        document.body.dataset.tela = tela;

        ['comandas', 'comanda', 'cozinha', 'caixa', 'cadastros', 'config'].forEach(function (t) {
            var secao = el('tela' + CF.primeiraMaiuscula(t));
            if (secao) secao.hidden = (t !== tela);
        });

        Array.prototype.forEach.call(document.querySelectorAll('.nav-btn'), function (b) {
            b.classList.toggle('ativo', b.dataset.tela === tela);
        });

        if (tela === 'comandas')  renderComandas();
        if (tela === 'comanda')   renderComandaAtual();
        if (tela === 'cozinha')   renderCozinha();
        if (tela === 'caixa')     renderCaixa();
        if (tela === 'cadastros') renderCadastros();
        if (tela === 'config')    renderConfig();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    /* ================================================================
       TELA — LISTA DE COMANDAS
    ================================================================= */
    function renderComandas() {
        var caixa = el('listaComandas');
        var todas = N.listarComandas();

        var busca = CF.normalizar(estado.buscaComandas);
        var lista = todas.filter(function (c) {
            if (estado.filtroComandas !== 'todas' && c.status !== estado.filtroComandas) return false;
            if (!busca) return true;
            return CF.normalizar(c.numero).indexOf(busca) !== -1 ||
                   CF.normalizar(c.abertoPor).indexOf(busca) !== -1 ||
                   CF.normalizar(c.cliente).indexOf(busca) !== -1;
        }).sort(function (a, b) { return (b.criadoEm || 0) - (a.criadoEm || 0); });

        if (!lista.length) {
            caixa.innerHTML =
                '<div class="card--vazia">' +
                '<p><b>Nenhuma comanda por aqui.</b></p>' +
                '<p>' + (todas.length
                    ? 'Nenhuma corresponde ao filtro ou à busca.'
                    : 'Clique em “+ Nova comanda” para abrir a primeira.') + '</p>' +
                '</div>';
            return;
        }

        caixa.innerHTML = lista.map(function (c) {
            var total = N.calcularTotal(c);
            var qtd = N.quantidadeItens(c);

            var statusHTML = {
                aberta:     '<span class="status status--aberta">🟡 Aberta</span>',
                em_preparo: '<span class="status status--preparo">🔥 Em preparo</span>',
                pronto:     '<span class="status status--pronto">✅ Pronta</span>'
            }[c.status] || '<span class="status">—</span>';

            var itensPreview = (c.itens || []).slice(0, 3).map(function (i) {
                return '<li>' + CF.esc(i.quantidade) + '× ' + CF.esc(i.nome) + '</li>';
            }).join('');

            if ((c.itens || []).length > 3) {
                itensPreview += '<li>… e mais ' + ((c.itens.length) - 3) + ' item(ns)</li>';
            }
            if (!itensPreview) itensPreview = '<li><i>Sem itens ainda</i></li>';

            return '' +
            '<article class="card" data-comanda="' + CF.esc(c.id) + '">' +
                '<div class="card__topo">' +
                    '<span class="card__numero">#' + CF.esc(c.numero) + '</span>' +
                    statusHTML +
                '</div>' +

                (c.cliente ? '<p class="card__meta">👤 ' + CF.esc(c.cliente) + '</p>' : '') +

                '<ul class="card__lista">' + itensPreview + '</ul>' +

                '<div class="card__rodape">' +
                    '<div>' +
                        '<div class="card__total">' + CF.moeda(total) + '</div>' +
                        '<div class="card__meta">' + qtd + ' item(ns) · ' +
                            CF.esc(c.abertoPor || '—') + '</div>' +
                    '</div>' +
                    '<div class="card__acoes">' +
                        '<button type="button" class="btn btn--pequeno btn--contorno" ' +
                                'data-acao="abrir-comanda" data-id="' + CF.esc(c.id) + '">' +
                            (c.itens.length ? 'Abrir' : 'Montar') +
                        '</button>' +
                        '<button type="button" class="btn btn--pequeno btn--perigo" ' +
                                'data-acao="excluir-comanda" data-id="' + CF.esc(c.id) + '"' +
                                (estado.funcionario.tipo === 'admin' ? '' : ' title="Somente administradores"') + '>' +
                            'Excluir' +
                        '</button>' +
                    '</div>' +
                '</div>' +
            '</article>';
        }).join('');
    }


    /* ================================================================
       TELA — DA COMANDA
    ================================================================= */
    function abrirComanda(id) {
        var c = N.acharComanda(id);
        if (!c) { CF.toast('Comanda não encontrada.', 'erro'); return; }
        estado.comandaAtualId = id;
        irPara('comanda');
    }

    function renderComandaAtual() {
        var c = N.acharComanda(estado.comandaAtualId);
        if (!c) { irPara('comandas'); return; }

        el('numeroComandaAtual').textContent = '#' + c.numero;

        el('metaAberta').textContent =
            (c.cliente ? '👤 ' + c.cliente + ' · ' : '') +
            'aberta por ' + (c.abertoPor || '—') +
            (c.editadoPor && c.editadoPor !== c.abertoPor ? ' · editada por ' + c.editadoPor : '');

        el('metaStatus').innerHTML = {
            aberta:     '<span class="status status--aberta">🟡 Aguardando envio</span>',
            em_preparo: '<span class="status status--preparo">🔥 Na cozinha desde ' +
                        CF.horaBR(c.enviadoCozinhaEm) + '</span>',
            pronto:     '<span class="status status--pronto">✅ Pronta às ' +
                        CF.horaBR(c.marcadoProntoEm) + '</span>'
        }[c.status] || '';

        renderCategorias();
        renderListaProdutos();
        renderResumo(c);
    }

    function renderCategorias() {
        var caixa = el('categorias');
        var cats = N.listarCategorias();

        if (!cats.length) {
            caixa.innerHTML = '<p class="nota">Nenhum produto cadastrado ainda.</p>';
            return;
        }

        var opcoes = [{ id: 'todos', nome: 'Todos' }].concat(
            cats.map(function (c) { return { id: c, nome: c }; })
        );

        caixa.innerHTML = opcoes.map(function (o) {
            return '<button type="button" class="chip' +
                (estado.categoriaAtiva === o.id ? ' ativo' : '') +
                '" data-categoria="' + CF.esc(o.id) + '">' + CF.esc(o.nome) + '</button>';
        }).join('');
    }

    function renderListaProdutos() {
        var caixa = el('listaProdutos');
        var lista = N.buscarProdutos(estado.buscaProduto, estado.categoriaAtiva);

        if (!lista.length) {
            caixa.innerHTML =
                '<div class="vazio"><p><b>Nenhum produto encontrado.</b></p>' +
                '<p>' + (estado.funcionario.tipo === 'admin'
                    ? 'Cadastre em <b>Cadastros → Produtos</b>.'
                    : 'Peça a um administrador para cadastrar.') + '</p></div>';
            return;
        }

        caixa.innerHTML = lista.map(function (p) {
            return '<button type="button" class="produto" ' +
                   'data-produto="' + CF.esc(p.id) + '" ' +
                   'aria-label="Adicionar ' + CF.esc(p.nome) + ', ' + CF.moeda(p.preco) + '">' +
                   '<span class="produto__nome">' + CF.esc(p.nome) + '</span>' +
                   '<span class="produto__preco">' + CF.moeda(p.preco) + '</span>' +
                   '</button>';
        }).join('');
    }

    function renderResumo(c) {
        var caixa = el('itensComanda');
        var total = N.calcularTotal(c);

        if (!c.itens.length) {
            caixa.innerHTML =
                '<div class="vazio"><p>Comanda vazia.</p>' +
                '<p>Toque em um produto ao lado para adicionar.</p></div>';
        } else {
            caixa.innerHTML = c.itens.map(function (i) {
                var subtotal = (Number(i.preco) || 0) * i.quantidade;
                return '' +
                '<div class="item-resumo" data-item="' + CF.esc(i.id) + '">' +
                    '<div>' +
                        '<div class="item-resumo__nome">' + CF.esc(i.nome) + '</div>' +
                        '<div class="item-resumo__preco">' + CF.moeda(i.preco) + ' cada</div>' +
                    '</div>' +
                    '<div class="item-resumo__total">' + CF.moeda(subtotal) + '</div>' +
                    '<div class="controles-qtd">' +
                        '<button type="button" class="qtd-btn" data-acao="diminuir" ' +
                                'data-item="' + CF.esc(i.id) + '" aria-label="Diminuir ' +
                                CF.esc(i.nome) + '">−</button>' +
                        '<span class="qtd-valor" aria-label="Quantidade">' + i.quantidade + '</span>' +
                        '<button type="button" class="qtd-btn" data-acao="aumentar" ' +
                                'data-item="' + CF.esc(i.id) + '" aria-label="Aumentar ' +
                                CF.esc(i.nome) + '">+</button>' +
                        '<button type="button" class="btn-remover" data-acao="remover-item" ' +
                                'data-item="' + CF.esc(i.id) + '">Remover</button>' +
                    '</div>' +
                '</div>';
            }).join('');
        }

        el('subtotalComanda').textContent = CF.moeda(total);
        el('totalComanda').textContent = CF.moeda(total);

        var semItens = c.itens.length === 0;
        el('btnEnviarCozinha').disabled = semItens;
        el('btnFinalizarComanda').disabled = semItens;
        el('btnEnviarCozinha').textContent = c.status === 'em_preparo'
            ? '👨‍🍳 Enviar novamente'
            : '👨‍🍳 Enviar para cozinha';
    }


    /* ================================================================
       TELA — COZINHA
    ================================================================= */
    function renderCozinha() {
        var fila = N.filaCozinha();
        var caixa = el('listaCozinha');

        el('contadorCozinha').textContent = fila.filter(function (c) {
            return c.status === 'em_preparo';
        }).length;

        var badge = el('badgeCozinha');
        var emPreparo = fila.filter(function (c) { return c.status === 'em_preparo'; }).length;
        badge.textContent = emPreparo;
        badge.hidden = emPreparo === 0;

        if (!fila.length) {
            caixa.innerHTML = '<div class="card--vazia">' +
                '<p><b>Fila da cozinha vazia.</b></p>' +
                '<p>Pedidos aparecem aqui assim que forem enviados de uma comanda.</p></div>';
            return;
        }

        caixa.innerHTML = fila.map(function (c) {
            var segundos = N.tempoNaCozinha(c);
            var atrasado = segundos > 20 * 60;

            var itens = (c.itens || []).map(function (i) {
                return '<li><b>' + CF.esc(i.quantidade) + '×</b> ' + CF.esc(i.nome) + '</li>';
            }).join('');

            var pronto = c.status === 'pronto';

            return '' +
            '<article class="card" data-comanda="' + CF.esc(c.id) + '">' +
                '<div class="card__topo">' +
                    '<span class="card__numero">#' + CF.esc(c.numero) + '</span>' +
                    (pronto
                        ? '<span class="status status--pronto">✅ PRONTO</span>'
                        : '<span class="status status--preparo">🔥 EM PREPARO</span>') +
                '</div>' +

                (c.cliente ? '<p class="card__meta">👤 ' + CF.esc(c.cliente) + '</p>' : '') +

                '<ul class="card__lista">' + itens + '</ul>' +

                '<div class="card__rodape">' +
                    '<div class="card__meta">' +
                        'Enviado às ' + CF.horaBR(c.enviadoCozinhaEm) +
                        (c.abertoPor ? ' · por ' + CF.esc(c.abertoPor) : '') +
                    '</div>' +
                    '<span class="tempo' + (atrasado ? ' tempo--atrasado' : '') +
                          '" data-tempo="' + CF.esc(c.id) + '">' +
                        '⏱ ' + CF.duracao(segundos) +
                    '</span>' +
                '</div>' +

                '<div class="card__acoes">' +
                    (pronto
                        ? '<button type="button" class="btn btn--pequeno btn--contorno" ' +
                          'data-acao="reabrir-preparo" data-id="' + CF.esc(c.id) + '">' +
                          'Voltar ao preparo</button>'
                        : '<button type="button" class="btn btn--pequeno btn--cozinha" ' +
                          'data-acao="marcar-pronto" data-id="' + CF.esc(c.id) + '">' +
                          '✅ Marcar como pronto</button>') +
                    '<button type="button" class="btn btn--pequeno btn--fantasma" ' +
                            'data-acao="imprimir-ficha" data-id="' + CF.esc(c.id) + '">' +
                        '🖨️ Ficha</button>' +
                '</div>' +
            '</article>';
        }).join('');
    }

    /* Atualiza só os cronômetros, sem redesenhar a tela inteira. */
    function atualizarTempos() {
        if (estado.tela !== 'cozinha') return;
        N.filaCozinha().forEach(function (c) {
            var alvo = document.querySelector('[data-tempo="' + c.id + '"]');
            if (!alvo) return;
            var segundos = N.tempoNaCozinha(c);
            alvo.textContent = '⏱ ' + CF.duracao(segundos);
            alvo.classList.toggle('tempo--atrasado', segundos > 20 * 60);
        });
    }


    /* ================================================================
       TELA — CAIXA
    ================================================================= */
    function renderCaixa() {
        var iso = estado.dataCaixa;
        el('dataCaixa').value = iso;

        var resumo = N.caixaDoDia(iso);
        var hoje = CF.dataHojeISO();

        el('caixaTotal').textContent = CF.moeda(resumo.total);
        el('caixaQuantidade').textContent = resumo.quantidade;

        var anotacoes = [];
        if (iso !== hoje) anotacoes.push('📅 fechamento de ' + CF.dataBR(iso));
        if (resumo.estornadas) {
            anotacoes.push(resumo.estornadas + ' venda(s) estornada(s): −' + CF.moeda(resumo.valorEstornado));
        }
        if (resumo.troco > 0) anotacoes.push('Troco entregue: ' + CF.moeda(resumo.troco));
        el('caixaAnotacoes').textContent = anotacoes.join(' · ');

        ['dinheiro', 'pix', 'debito', 'credito'].forEach(function (f) {
            el('caixa' + CF.primeiraMaiuscula(f)).textContent = CF.moeda(resumo.formas[f].total);
            el('caixa' + CF.primeiraMaiuscula(f) + 'Qtd').textContent =
                resumo.formas[f].qtd + ' venda(s)';
        });

        renderFechamento(resumo);
        renderRelatorioProdutos(iso);
        renderListaVendas(resumo);
    }

    function renderFechamento(resumo) {
        var caixa = el('fechamentoTabela');
        var linhas = '';

        N.FORMAS.forEach(function (f) {
            var d = resumo.formas[f.id];
            var percentual = resumo.total > 0 ? (d.total / resumo.total) * 100 : 0;
            linhas += '' +
                '<div class="tabela-linha">' +
                    '<div style="flex:1">' +
                        '<div>' + CF.esc(f.rotulo) + ' <span class="card__meta">(' + d.qtd + ')</span></div>' +
                        '<div class="barra-progresso"><span style="width:' +
                            Math.round(percentual) + '%"></span></div>' +
                    '</div>' +
                    '<div class="tabela-linha__valor">' + CF.moeda(d.total) + '</div>' +
                '</div>';
        });

        linhas += '' +
            '<div class="tabela-linha tabela-linha--total">' +
                '<span><b>TOTAL VÁLIDO</b></span>' +
                '<span class="tabela-linha__valor">' + CF.moeda(resumo.total) + '</span>' +
            '</div>';

        /* Defesa: se algum dado importado não fechar, o caixa avisa em
           vez de entregar números que não batem. */
        var somaFormas = CF.arred2(
            resumo.formas.dinheiro.total + resumo.formas.pix.total +
            resumo.formas.debito.total + resumo.formas.credito.total
        );

        if (Math.abs(somaFormas - resumo.total) > 0.005) {
            linhas += '' +
                '<div class="tabela-linha" style="color:var(--erro)">' +
                    '<span>⚠️ Diferença entre formas e total — os dados ' +
                    'neste dia estão inconsistentes.</span>' +
                    '<span class="tabela-linha__valor">' +
                        (somaFormas > resumo.total ? '+' : '−') +
                        CF.moeda(Math.abs(somaFormas - resumo.total)) +
                    '</span>' +
                '</div>';
        }

        if (resumo.estornadas) {
            linhas += '' +
                '<div class="tabela-linha tabela-linha--estornada">' +
                    '<span>Estornadas (' + resumo.estornadas + ')</span>' +
                    '<span class="tabela-linha__valor">' + CF.moeda(resumo.valorEstornado) + '</span>' +
                '</div>';
        }

        caixa.innerHTML = linhas;
    }

    function renderRelatorioProdutos(iso) {
        var caixa = el('relatorioProdutos');
        var lista = N.relatorioProdutos(iso);

        if (!lista.length) {
            caixa.innerHTML = '<p class="nota">Sem vendas nesse dia.</p>';
            return;
        }

        var maior = lista[0].qtd || 1;

        caixa.innerHTML = lista.map(function (p, i) {
            return '' +
            '<div class="tabela-linha">' +
                '<div style="flex:1">' +
                    '<div>' + (i + 1) + 'º ' + CF.esc(p.nome) + '</div>' +
                    '<div class="barra-progresso"><span style="width:' +
                        Math.round((p.qtd / maior) * 100) + '%"></span></div>' +
                '</div>' +
                '<div class="tabela-linha__valor">' + p.qtd + ' un.</div>' +
            '</div>';
        }).join('');
    }

    function renderListaVendas(resumo) {
        var caixa = el('listaVendas');
        var lista = resumo.vendas.slice().sort(function (a, b) {
            return (b.criadoEm || 0) - (a.criadoEm || 0);
        });

        if (estado.filtroVendas === 'estornadas') {
            lista = lista.filter(function (v) { return v.estornada; });
        } else if (estado.filtroVendas === 'validas') {
            lista = lista.filter(function (v) { return !v.estornada; });
        }

        if (!lista.length) {
            caixa.innerHTML = '<p class="nota">Nenhuma venda registrada nesse dia.</p>';
            return;
        }

        caixa.innerHTML = lista.map(function (v) {
            var formas = (v.pagamentos || []).map(function (p) {
                return CF.esc(N.rotuloForma(p.forma)) + ' ' + CF.moeda(p.valor);
            }).join(' + ');

            var qtdItens = (v.itens || []).reduce(function (s, i) {
                return s + (Math.max(1, parseInt(i.quantidade, 10) || 1));
            }, 0);

            return '' +
            '<div class="venda-card' + (v.estornada ? ' venda-card--estornada' : '') + '">' +
                '<div class="venda-card__info">' +
                    '<div class="venda-card__titulo">#' + CF.esc(v.numero) +
                        (v.cliente ? ' · ' + CF.esc(v.cliente) : '') + '</div>' +
                    '<div class="venda-card__detalhe">' +
                        qtdItens + ' item(ns) · ' + CF.horaBR(v.criadoEm) +
                        ' · ' + CF.esc(v.funcionario || '—') +
                    '</div>' +
                    '<div class="venda-card__detalhe">' + formas + '</div>' +
                    (v.estornada
                        ? '<div class="venda-card__detalhe"><b>Estornada</b> por ' +
                          CF.esc(v.estornadaPor || '—') + ' às ' + CF.horaBR(v.estornadaEm) +
                          ' — motivo: ' + CF.esc(v.estornoMotivo || '—') + '</div>'
                        : '') +
                '</div>' +
                '<div class="venda-card__valor">' + CF.moeda(v.total) + '</div>' +
                (v.estornada
                    ? '<span class="status status--estornada">Estornada</span>'
                    : '<button type="button" class="btn btn--pequeno btn--perigo" ' +
                      'data-acao="estornar" data-id="' + CF.esc(v.id) + '">Estornar</button>') +
            '</div>';
        }).join('');
    }


    /* ================================================================
       TELA — CADASTROS
    ================================================================= */
    function renderCadastros() {
        var eAdmin = estado.funcionario && estado.funcionario.tipo === 'admin';
        el('painelProdutos').hidden = estado.aba !== 'produtos';
        el('painelFuncionarios').hidden = estado.aba !== 'funcionarios';
        el('abaProdutos').classList.toggle('ativo', estado.aba === 'produtos');
        el('abaFuncionarios').classList.toggle('ativo', estado.aba === 'funcionarios');
        el('abaProdutos').setAttribute('aria-selected', String(estado.aba === 'produtos'));
        el('abaFuncionarios').setAttribute('aria-selected', String(estado.aba === 'funcionarios'));

        if (!eAdmin) return;

        if (estado.aba === 'produtos') renderTabelaProdutos();
        else renderTabelaFuncionarios();
    }

    function renderTabelaProdutos() {
        var caixa = el('tabelaProdutos');
        var busca = CF.normalizar(estado.buscaCadastroProduto);

        var lista = N.listarProdutos(true).filter(function (p) {
            if (!busca) return true;
            return CF.normalizar(p.nome).indexOf(busca) !== -1 ||
                   CF.normalizar(p.categoria).indexOf(busca) !== -1;
        }).sort(function (a, b) {
            return CF.normalizar(a.categoria).localeCompare(CF.normalizar(b.categoria), 'pt-BR') ||
                   a.nome.localeCompare(b.nome, 'pt-BR');
        });

        if (!lista.length) {
            caixa.innerHTML = '<div class="card--vazia"><p><b>Nenhum produto cadastrado.</b></p>' +
                '<p>Clique em “+ Novo produto” para começar.</p></div>';
            return;
        }

        var linhas = lista.map(function (p) {
            return '' +
            '<tr>' +
                '<td data-rotulo="Produto"><b>' + CF.esc(p.nome) + '</b>' +
                    (p.demo ? ' <span class="selo selo--inativo">demo</span>' : '') + '</td>' +
                '<td data-rotulo="Categoria">' + CF.esc(p.categoria) + '</td>' +
                '<td data-rotulo="Preço" class="alinha-direita celula-valor">' + CF.moeda(p.preco) + '</td>' +
                '<td data-rotulo="Situação">' +
                    (p.ativo !== false
                        ? '<span class="selo selo--ativo">Disponível</span>'
                        : '<span class="selo selo--inativo">Oculto</span>') + '</td>' +
                '<td class="acoes">' +
                    '<button type="button" class="btn btn--pequeno btn--contorno" ' +
                            'data-acao="editar-produto" data-id="' + CF.esc(p.id) + '">Editar</button>' +
                    '<button type="button" class="btn btn--pequeno btn--perigo" ' +
                            'data-acao="excluir-produto" data-id="' + CF.esc(p.id) + '">Excluir</button>' +
                '</td>' +
            '</tr>';
        }).join('');

        caixa.innerHTML =
            '<div class="tabela-wrap"><table>' +
            '<caption class="oculto-visual">Produtos cadastrados</caption>' +
            '<thead><tr>' +
                '<th scope="col">Produto</th>' +
                '<th scope="col">Categoria</th>' +
                '<th scope="col" class="alinha-direita">Preço</th>' +
                '<th scope="col">Situação</th>' +
                '<th scope="col" class="alinha-direita">Ações</th>' +
            '</tr></thead>' +
            '<tbody>' + linhas + '</tbody>' +
            '</table></div>';
    }

    function renderTabelaFuncionarios() {
        var caixa = el('tabelaFuncionarios');
        var busca = CF.normalizar(estado.buscaCadastroFuncionario);

        var lista = N.listarFuncionarios().filter(function (f) {
            if (!busca) return true;
            return CF.normalizar(f.nome).indexOf(busca) !== -1 ||
                   CF.normalizar(f.usuario).indexOf(busca) !== -1;
        });

        var linhas = lista.map(function (f) {
            var ehProprio = f.id === estado.funcionario.id;

            return '' +
            '<tr>' +
                '<td data-rotulo="Nome"><b>' + CF.esc(f.nome) + '</b>' +
                    (ehProprio ? ' <span class="selo selo--func">você</span>' : '') +
                    (f.demo ? ' <span class="selo selo--inativo">demo</span>' : '') + '</td>' +
                '<td data-rotulo="Usuário">' + CF.esc(f.usuario) + '</td>' +
                '<td data-rotulo="Permissão">' +
                    (f.tipo === 'admin'
                        ? '<span class="selo selo--admin">Administrador</span>'
                        : '<span class="selo selo--func">Funcionário</span>') + '</td>' +
                '<td data-rotulo="Situação">' +
                    (f.ativo !== false
                        ? '<span class="selo selo--ativo">Ativo</span>'
                        : '<span class="selo selo--inativo">Desativado</span>') + '</td>' +
                '<td class="acoes">' +
                    '<button type="button" class="btn btn--pequeno btn--contorno" ' +
                            'data-acao="editar-funcionario" data-id="' + CF.esc(f.id) + '">Editar</button>' +
                    (ehProprio ? '' :
                    '<button type="button" class="btn btn--pequeno btn--perigo" ' +
                            'data-acao="excluir-funcionario" data-id="' + CF.esc(f.id) + '">Excluir</button>') +
                '</td>' +
            '</tr>';
        }).join('');

        caixa.innerHTML =
            '<div class="tabela-wrap"><table>' +
            '<caption class="oculto-visual">Funcionários cadastrados</caption>' +
            '<thead><tr>' +
                '<th scope="col">Nome</th>' +
                '<th scope="col">Usuário</th>' +
                '<th scope="col">Permissão</th>' +
                '<th scope="col">Situação</th>' +
                '<th scope="col" class="alinha-direita">Ações</th>' +
            '</tr></thead>' +
            '<tbody>' + linhas + '</tbody>' +
            '</table></div>';
    }


    /* ================================================================
       TELA — CONFIGURAÇÕES
    ================================================================= */
    function renderConfig() {
        var cfg = D.carregarConfig();
        el('cfgNome').value = cfg.nomeEmpresa || '';
        el('cfgEndereco').value = cfg.endereco || '';
        el('cfgTelefone').value = cfg.telefone || '';
        el('cfgCnpj').value = cfg.cnpj || '';
        el('cfgProximoNumero').value = cfg.proximoNumero || 1;
    }


    /* ================================================================
       MODAIS — PRODUTO
    ================================================================= */
    function abrirModalProduto(id) {
        var produto = id ? N.listarProdutos(true).filter(function (p) { return p.id === id; })[0] : null;

        el('tituloProduto').textContent = produto ? 'Editar produto' : 'Novo produto';
        el('produtoId').value = produto ? produto.id : '';
        el('nomeProduto').value = produto ? produto.nome : '';
        el('precoProduto').value = produto ? produto.preco.toFixed(2).replace('.', ',') : '';
        el('categoriaProduto').value = produto ? produto.categoria : '';
        el('ativoProduto').checked = produto ? produto.ativo !== false : true;
        el('erroProduto').hidden = true;

        /* Sugere categorias já usadas. */
        el('listaCategorias').innerHTML = N.listarCategorias().map(function (c) {
            return '<option value="' + CF.esc(c) + '">';
        }).join('');

        CF.abrirModal('modalProduto');
    }

    function salvarProdutoDoForm(ev) {
        ev.preventDefault();

        var resultado = N.salvarProduto({
            id: el('produtoId').value || null,
            nome: el('nomeProduto').value,
            preco: CF.lerNumero(el('precoProduto').value),
            categoria: el('categoriaProduto').value,
            ativo: el('ativoProduto').checked
        });

        var erroEl = el('erroProduto');

        if (!resultado.ok) {
            erroEl.hidden = false;
            erroEl.textContent = resultado.erro;
            return;
        }

        CF.fecharModal();
        CF.toast('Produto salvo.', 'ok');
        renderCadastros();
        if (estado.tela === 'comanda') renderComandaAtual();
    }


    /* ================================================================
       MODAIS — FUNCIONÁRIO
    ================================================================= */
    function abrirModalFuncionario(id) {
        var func = id ? N.listarFuncionarios().filter(function (f) { return f.id === id; })[0] : null;

        el('tituloFuncionario').textContent = func ? 'Editar funcionário' : 'Novo funcionário';
        el('funcionarioId').value = func ? func.id : '';
        el('nomeFuncionario').value = func ? func.nome : '';
        el('usuarioFuncionario').value = func ? func.usuario : '';
        el('senhaFuncionario').value = '';
        el('tipoFuncionario').value = func ? func.tipo : 'funcionario';
        el('erroFuncionario').hidden = true;
        el('ajudaSenha').textContent = func
            ? 'Deixe em branco para manter a senha atual.'
            : 'Mínimo de 4 caracteres. Ela é guardada protegida por hash.';

        CF.abrirModal('modalFuncionario');
    }

    function salvarFuncionarioDoForm(ev) {
        ev.preventDefault();

        N.salvarFuncionario({
            id: el('funcionarioId').value || null,
            nome: el('nomeFuncionario').value,
            usuario: el('usuarioFuncionario').value,
            senha: el('senhaFuncionario').value,
            tipo: el('tipoFuncionario').value,
            ativo: true
        }).then(function (resultado) {
            var erroEl = el('erroFuncionario');

            if (!resultado.ok) {
                erroEl.hidden = false;
                erroEl.textContent = resultado.erro;
                return;
            }

            CF.fecharModal();
            CF.toast('Funcionário salvo.', 'ok');
            renderCadastros();
        });
    }


    /* ================================================================
       MODAL — PAGAMENTO
    ================================================================= */
    function abrirPagamento() {
        var c = N.acharComanda(estado.comandaAtualId);
        if (!c || !c.itens.length) {
            CF.toast('Adicione pelo menos um produto antes de finalizar.', 'aviso');
            return;
        }

        var total = N.calcularTotal(c);
        el('totalPagamento').textContent = CF.moeda(total);
        el('erroPagamento').hidden = true;
        el('valorRecebido').value = '';
        el('valorTroco').textContent = CF.moeda(0);
        el('campoTroco').hidden = true;

        /* Um campo por forma de pagamento — pode dividir a conta.
           Usa text + inputmode para aceitar "9,90" e "9.90". */
        estado.pagamentos = {};
        el('gradePagamentos').innerHTML = N.FORMAS.map(function (f) {
            return '' +
            '<div class="pagamento-campo">' +
                '<label for="pgto-' + f.id + '">' + CF.esc(f.rotulo) + '</label>' +
                '<input type="text" id="pgto-' + f.id + '" data-forma="' + f.id + '" ' +
                       'inputmode="decimal" autocomplete="off" placeholder="0,00">' +
            '</div>';
        }).join('');

        CF.abrirModal('modalPagamento');
        atualizarRestante();
    }

    function atualizarRestante() {
        var c = N.acharComanda(estado.comandaAtualId);
        if (!c) return;

        var total = N.calcularTotal(c);
        var soma = 0;
        var emDinheiro = 0;

        Array.prototype.forEach.call(
            document.querySelectorAll('#gradePagamentos input'),
            function (input) {
                var v = CF.lerNumero(input.value);
                soma += v;
                if (input.dataset.forma === 'dinheiro') emDinheiro = v;
                input.classList.toggle('preenchido', v > 0);
            }
        );

        soma = CF.arred2(soma);
        var restante = CF.arred2(total - soma);

        var restoEl = el('restantePagamento');
        restoEl.textContent = CF.moeda(restante);
        restoEl.classList.toggle('negativo', restante <= 0);

        /* O campo de troco só faz sentido quando há dinheiro envolvido. */
        el('campoTroco').hidden = emDinheiro <= 0;
        el('btnConfirmarPagamento').disabled = restante > 0.005 || soma <= 0;

        if (emDinheiro > 0) calcularTroco();
    }

    function calcularTroco() {
        var recebido = CF.lerNumero(el('valorRecebido').value);
        var campoDinheiro = document.querySelector('#gradePagamentos input[data-forma="dinheiro"]');
        var pago = campoDinheiro ? CF.lerNumero(campoDinheiro.value) : 0;
        var troco = CF.arred2(recebido - pago);

        el('valorTroco').textContent = CF.moeda(Math.max(0, troco));
        el('valorTroco').classList.toggle('negativo', troco > 0);
    }

    function confirmarPagamento(ev) {
        ev.preventDefault();

        var c = N.acharComanda(estado.comandaAtualId);
        if (!c) return;

        var total = N.calcularTotal(c);
        var pagamentos = [];

        Array.prototype.forEach.call(
            document.querySelectorAll('#gradePagamentos input'),
            function (input) {
                var v = CF.lerNumero(input.value);
                if (v > 0) pagamentos.push({ forma: input.dataset.forma, valor: v });
            }
        );

        var recebido = CF.lerNumero(el('valorRecebido').value);
        var campoDinheiro = document.querySelector('#gradePagamentos input[data-forma="dinheiro"]');
        var pagoDinheiro = campoDinheiro ? CF.lerNumero(campoDinheiro.value) : 0;
        var troco = recebido > 0 ? CF.arred2(recebido - pagoDinheiro) : 0;

        if (pagoDinheiro > 0 && recebido > 0 && recebido < pagoDinheiro) {
            var erroEl = el('erroPagamento');
            erroEl.hidden = false;
            erroEl.textContent = 'O valor recebido (' + CF.moeda(recebido) +
                                 ') é menor que o pago em dinheiro (' + CF.moeda(pagoDinheiro) + ').';
            return;
        }

        var resultado = N.finalizarVenda(
            c, pagamentos,
            recebido > pagoDinheiro ? recebido : 0,
            troco > 0 ? troco : 0,
            estado.funcionario.nome
        );

        if (!resultado.ok) {
            var e2 = el('erroPagamento');
            e2.hidden = false;
            e2.textContent = resultado.erro;
            return;
        }

        CF.fecharModal();
        CF.toast('Venda de ' + CF.moeda(resultado.venda.total) + ' registrada!', 'ok');

        estado.comandaAtualId = null;
        estado.dataCaixa = resultado.venda.dataISO;
        irPara('comandas');

        /* Oferece a ficha da comanda para o caixa/arquivo. */
        imprimirFicha(resultado.venda);
    }


    /* ================================================================
       IMPRESSÃO
    ================================================================= */
    function imprimirFicha(vendaOuComanda) {
        var cfg = D.carregarConfig();

        var numero = vendaOuComanda.numero || '—';
        var itens = vendaOuComanda.itens || [];
        var total = vendaOuComanda.total != null
            ? Number(vendaOuComanda.total)
            : N.calcularTotal(vendaOuComanda);

        var linhas = [
            { esquerda: 'Comanda', direita: '#' + numero },
            { esquerda: 'Data', direita: CF.dataHoraBR(Date.now()) },
            { esquerda: 'Atendente', direita: vendaOuComanda.funcionario || vendaOuComanda.abertoPor || '—' }
        ];

        if (vendaOuComanda.cliente) {
            linhas.push({ esquerda: 'Cliente', direita: vendaOuComanda.cliente });
        }

        linhas.push({ separador: true });

        itens.forEach(function (i) {
            linhas.push({
                esquerda: i.quantidade + 'x ' + i.nome,
                direita: CF.moeda((Number(i.preco) || 0) * i.quantidade)
            });
        });

        linhas.push({ separador: true });
        linhas.push({ esquerda: 'TOTAL', direita: CF.moeda(total), total: true });

        if (Array.isArray(vendaOuComanda.pagamentos)) {
            vendaOuComanda.pagamentos.forEach(function (p) {
                linhas.push({ esquerda: N.rotuloForma(p.forma), direita: CF.moeda(p.valor) });
            });
            if (vendaOuComanda.troco > 0) {
                linhas.push({ esquerda: 'Troco', direita: CF.moeda(vendaOuComanda.troco) });
            }
        }

        var rodape = cfg.nomeEmpresa +
            (cfg.endereco ? ' · ' + cfg.endereco : '') +
            (cfg.telefone ? ' · ' + cfg.telefone : '');

        CF.imprimirTicket(cfg.nomeEmpresa, linhas, rodape);
    }

    function imprimirFilaCozinha() {
        var cfg = D.carregarConfig();
        var fila = N.filaCozinha();

        if (!fila.length) { CF.toast('Fila da cozinha vazia.', 'aviso'); return; }

        var linhas = [{ esquerda: 'Fila da cozinha', direita: CF.horaBR(Date.now()) },
                      { separador: true }];

        fila.forEach(function (c) {
            linhas.push({ esquerda: 'COMANDA #' + c.numero, direita: c.cliente || '' });
            (c.itens || []).forEach(function (i) {
                linhas.push({ esquerda: '  ' + i.quantidade + 'x ' + i.nome, direita: '' });
            });
            linhas.push({ separador: true });
        });

        CF.imprimirTicket(cfg.nomeEmpresa + ' — Cozinha', linhas,
                          'Emitido às ' + CF.horaBR(Date.now()));
    }

    function imprimirFechamento() {
        var cfg = D.carregarConfig();
        var resumo = N.caixaDoDia(estado.dataCaixa);

        var linhas = [
            { esquerda: 'Data', direita: CF.dataBR(resumo.dataISO) },
            { esquerda: 'Vendas válidas', direita: String(resumo.quantidade) },
            { separador: true }
        ];

        N.FORMAS.forEach(function (f) {
            linhas.push({
                esquerda: f.rotulo + ' (' + resumo.formas[f.id].qtd + ')',
                direita: CF.moeda(resumo.formas[f.id].total)
            });
        });

        linhas.push({ separador: true });
        linhas.push({ esquerda: 'TOTAL', direita: CF.moeda(resumo.total), total: true });

        if (resumo.estornadas) {
            linhas.push({ esquerda: 'Estornadas (' + resumo.estornadas + ')',
                          direita: '−' + CF.moeda(resumo.valorEstornado) });
        }
        if (resumo.troco > 0) {
            linhas.push({ esquerda: 'Troco entregue', direita: CF.moeda(resumo.troco) });
        }

        CF.imprimirTicket(cfg.nomeEmpresa + ' — Fechamento', linhas,
                          'Emitido por ' + estado.funcionario.nome +
                          ' em ' + CF.dataHoraBR(Date.now()));
    }


    /* ================================================================
       EXPORTAÇÃO CSV DO CAIXA
    ================================================================= */
    function exportarCsvCaixa() {
        var resumo = N.caixaDoDia(estado.dataCaixa);

        if (!resumo.vendas.length) {
            CF.toast('Não há vendas nesse dia para exportar.', 'aviso');
            return;
        }

        var linhas = [];

        resumo.vendas.forEach(function (v) {
            linhas.push([
                CF.dataBR(v.dataISO),
                CF.horaBR(v.criadoEm),
                v.numero,
                v.cliente || '',
                v.funcionario || '',
                (v.itens || []).map(function (i) { return i.quantidade + 'x ' + i.nome; }).join(' | '),
                CF.moedaSemPrefixo(v.total).replace(',', '.'),
                (v.pagamentos || []).map(function (p) {
                    return N.rotuloForma(p.forma) + ' ' + CF.moedaSemPrefixo(p.valor).replace(',', '.');
                }).join(' | '),
                v.estornada ? 'SIM' : 'NAO',
                v.estornoMotivo || ''
            ]);
        });

        CF.baixarCSV(
            'caixa-' + estado.dataCaixa + '.csv',
            ['Data', 'Hora', 'Comanda', 'Cliente', 'Atendente', 'Itens',
             'Total', 'Pagamentos', 'Estornada', 'Motivo estorno'],
            linhas
        );

        CF.toast('CSV exportado.', 'ok');
    }


    /* ================================================================
       EVENTOS GLOBAIS (delegação)
    ================================================================= */
    function ligarEventos() {

        /* --- navegação do topo --- */
        document.querySelector('.topo__nav').addEventListener('click', function (ev) {
            var btn = ev.target.closest('.nav-btn');
            if (btn) irPara(btn.dataset.tela);
        });

        el('btnSair').addEventListener('click', sair);

        /* --- filtros de comanda --- */
        el('btnNovaComanda').addEventListener('click', function () {
            el('numeroComanda').value = N.sugerirNumero();
            el('clienteComanda').value = '';
            CF.abrirModal('modalNovaComanda');
        });

        el('btnNumeroAuto').addEventListener('click', function () {
            el('numeroComanda').value = N.sugerirNumero();
            el('numeroComanda').focus();
        });

        el('formNovaComanda').addEventListener('submit', function (ev) {
            ev.preventDefault();

            var r = N.criarComanda(
                el('numeroComanda').value,
                el('clienteComanda').value,
                estado.funcionario.nome
            );

            if (!r.ok) {
                el('ajudaNumero').innerHTML = '<span style="color:var(--erro);font-weight:600">' +
                    CF.esc(r.erro) + '</span>';
                return;
            }

            CF.fecharModal();
            CF.toast('Comanda #' + r.comanda.numero + ' aberta.', 'ok');
            abrirComanda(r.comanda.id);
        });

        el('buscaComanda').addEventListener('input', function () {
            estado.buscaComandas = this.value;
            renderComandas();
        });

        document.querySelector('[aria-label="Filtrar por situação"]').addEventListener('click', function (ev) {
            var chip = ev.target.closest('.chip');
            if (!chip) return;
            estado.filtroComandas = chip.dataset.filtro;
            Array.prototype.forEach.call(this.querySelectorAll('.chip'), function (c) {
                c.classList.toggle('ativo', c === chip);
            });
            renderComandas();
        });

        /* --- tela da comanda --- */
        el('btnFecharComanda').addEventListener('click', function () {
            estado.comandaAtualId = null;
            irPara('comandas');
        });

        el('buscaProduto').addEventListener('input', function () {
            estado.buscaProduto = this.value;
            renderListaProdutos();
        });

        el('categorias').addEventListener('click', function (ev) {
            var chip = ev.target.closest('.chip');
            if (!chip) return;
            estado.categoriaAtiva = chip.dataset.categoria;
            renderCategorias();
            renderListaProdutos();
        });

        el('listaProdutos').addEventListener('click', function (ev) {
            var btn = ev.target.closest('.produto');
            if (!btn) return;

            var c = N.acharComanda(estado.comandaAtualId);
            var p = N.listarProdutos().filter(function (x) { return x.id === btn.dataset.produto; })[0];
            if (!c || !p) return;

            N.adicionarItem(c, p, estado.funcionario.nome);
            renderResumo(c);
        });

        el('itensComanda').addEventListener('click', function (ev) {
            var btn = ev.target.closest('[data-acao]');
            if (!btn) return;

            var c = N.acharComanda(estado.comandaAtualId);
            if (!c) return;

            var acao = btn.dataset.acao;
            var itemId = btn.dataset.item;

            if (acao === 'aumentar')      N.alterarQuantidade(c, itemId, +1, estado.funcionario.nome);
            if (acao === 'diminuir')      N.alterarQuantidade(c, itemId, -1, estado.funcionario.nome);
            if (acao === 'remover-item')  N.removerItem(c, itemId, estado.funcionario.nome);

            renderResumo(c);
        });

        el('btnEnviarCozinha').addEventListener('click', function () {
            var c = N.acharComanda(estado.comandaAtualId);
            if (!c) return;

            var r = N.enviarParaCozinha(c, estado.funcionario.nome);
            if (!r.ok) { CF.toast(r.erro, 'erro'); return; }

            CF.toast('Comanda #' + c.numero + ' enviada para a cozinha.', 'ok');
            renderComandaAtual();
        });

        el('btnFinalizarComanda').addEventListener('click', abrirPagamento);

        el('btnDescartarComanda').addEventListener('click', function () {
            var c = N.acharComanda(estado.comandaAtualId);
            if (!c) return;

            CF.confirmar({
                titulo: 'Excluir comanda #' + c.numero + '?',
                texto: 'A comanda e seus ' + c.itens.length + ' item(ns) serão removidos ' +
                       'sem gerar venda. Esta ação não pode ser desfeita.',
                textoBotao: 'Excluir comanda',
                perigoso: true
            }).then(function (sim) {
                if (!sim) return;
                N.excluirComanda(c.id);
                CF.toast('Comanda excluída.', 'ok');
                estado.comandaAtualId = null;
                irPara('comandas');
            });
        });

        /* --- lista de comandas (abrir / excluir) --- */
        el('listaComandas').addEventListener('click', function (ev) {
            var btn = ev.target.closest('[data-acao]');
            if (!btn) return;

            var acao = btn.dataset.acao;
            var id = btn.dataset.id;

            if (acao === 'abrir-comanda') { abrirComanda(id); return; }

            if (acao === 'excluir-comanda') {
                var c = N.acharComanda(id);
                if (!c) return;

                CF.confirmar({
                    titulo: 'Excluir comanda #' + c.numero + '?',
                    texto: 'Ela será removida sem gerar venda.',
                    textoBotao: 'Excluir',
                    perigoso: true
                }).then(function (sim) {
                    if (!sim) return;
                    N.excluirComanda(id);
                    CF.toast('Comanda excluída.', 'ok');
                    renderComandas();
                });
            }
        });

        /* --- cozinha --- */
        el('listaCozinha').addEventListener('click', function (ev) {
            var btn = ev.target.closest('[data-acao]');
            if (!btn) return;

            var c = N.acharComanda(btn.dataset.id);
            if (!c) return;

            if (btn.dataset.acao === 'marcar-pronto') {
                N.marcarPronto(c, estado.funcionario.nome);
                CF.toast('Comanda #' + c.numero + ' pronta.', 'ok');
                renderCozinha();
            }

            if (btn.dataset.acao === 'reabrir-preparo') {
                c.status = 'em_preparo';
                c.marcadoProntoEm = null;
                N.gravarComanda(c);
                renderCozinha();
            }

            if (btn.dataset.acao === 'imprimir-ficha') imprimirFicha(c);
        });

        /* --- caixa --- */
        el('dataCaixa').addEventListener('change', function () {
            if (this.value) { estado.dataCaixa = this.value; renderCaixa(); }
        });

        el('btnCsvCaixa').addEventListener('click', exportarCsvCaixa);

        document.querySelector('[aria-label="Filtrar vendas"]').addEventListener('click', function (ev) {
            var chip = ev.target.closest('.chip');
            if (!chip) return;
            estado.filtroVendas = chip.dataset.vendas;
            Array.prototype.forEach.call(this.querySelectorAll('.chip'), function (c) {
                c.classList.toggle('ativo', c === chip);
            });
            renderListaVendas(N.caixaDoDia(estado.dataCaixa));
        });

        el('listaVendas').addEventListener('click', function (ev) {
            var btn = ev.target.closest('[data-acao="estornar"]');
            if (!btn) return;

            CF.confirmar({
                titulo: 'Estornar esta venda?',
                texto: 'O valor volta a contar como não vendido no caixa do dia, ' +
                       'mas o registro continua no histórico para auditoria.',
                textoBotao: 'Estornar',
                pedirMotivo: true,
                perigoso: true
            }).then(function (motivo) {
                if (!motivo) return;
                var r = N.estornarVenda(btn.dataset.id, motivo, estado.funcionario.nome);
                if (!r.ok) { CF.toast(r.erro, 'erro'); return; }
                CF.toast('Venda estornada.', 'ok');
                renderCaixa();
            });
        });

        /* --- cadastros --- */
        el('abaProdutos').addEventListener('click', function () {
            estado.aba = 'produtos'; renderCadastros();
        });
        el('abaFuncionarios').addEventListener('click', function () {
            estado.aba = 'funcionarios'; renderCadastros();
        });

        el('buscaProdutoCadastro').addEventListener('input', function () {
            estado.buscaCadastroProduto = this.value; renderTabelaProdutos();
        });
        el('buscaFuncionario').addEventListener('input', function () {
            estado.buscaCadastroFuncionario = this.value; renderTabelaFuncionarios();
        });

        el('btnNovoProduto').addEventListener('click', function () { abrirModalProduto(null); });
        el('formProduto').addEventListener('submit', salvarProdutoDoForm);

        el('btnNovoFuncionario').addEventListener('click', function () { abrirModalFuncionario(null); });
        el('formFuncionario').addEventListener('submit', salvarFuncionarioDoForm);

        el('tabelaProdutos').addEventListener('click', function (ev) {
            var btn = ev.target.closest('[data-acao]');
            if (!btn) return;

            if (btn.dataset.acao === 'editar-produto') abrirModalProduto(btn.dataset.id);

            if (btn.dataset.acao === 'excluir-produto') {
                CF.confirmar({
                    titulo: 'Excluir este produto?',
                    texto: 'Ele some do cardápio. Vendas antigas que já o usaram continuam intactas.',
                    textoBotao: 'Excluir',
                    perigoso: true
                }).then(function (sim) {
                    if (!sim) return;
                    N.excluirProduto(btn.dataset.id);
                    CF.toast('Produto excluído.', 'ok');
                    renderTabelaProdutos();
                });
            }
        });

        el('tabelaFuncionarios').addEventListener('click', function (ev) {
            var btn = ev.target.closest('[data-acao]');
            if (!btn) return;

            if (btn.dataset.acao === 'editar-funcionario') abrirModalFuncionario(btn.dataset.id);

            if (btn.dataset.acao === 'excluir-funcionario') {
                CF.confirmar({
                    titulo: 'Excluir este funcionário?',
                    texto: 'Ele perde o acesso ao sistema imediatamente.',
                    textoBotao: 'Excluir',
                    perigoso: true
                }).then(function (sim) {
                    if (!sim) return;
                    var r = N.excluirFuncionario(btn.dataset.id, estado.funcionario.id);
                    if (!r.ok) { CF.toast(r.erro, 'erro'); return; }
                    CF.toast('Funcionário excluído.', 'ok');
                    renderTabelaFuncionarios();
                });
            }
        });

        /* --- configurações --- */
        el('formEmpresa').addEventListener('submit', function (ev) {
            ev.preventDefault();

            var nome = el('cfgNome').value.trim();
            if (!nome) { CF.toast('Informe o nome do estabelecimento.', 'erro'); return; }

            var cfg = D.carregarConfig();
            cfg.nomeEmpresa = nome.slice(0, 60);
            cfg.endereco = el('cfgEndereco').value.trim().slice(0, 90);
            cfg.telefone = el('cfgTelefone').value.trim().slice(0, 20);
            cfg.cnpj = el('cfgCnpj').value.trim().slice(0, 20);
            cfg.proximoNumero = Math.max(1, parseInt(el('cfgProximoNumero').value, 10) || 1);

            D.salvarConfig(cfg);
            el('nomeEmpresaTopo').textContent = cfg.nomeEmpresa;
            CF.toast('Dados da empresa salvos.', 'ok');
        });

        el('btnExportarBackup').addEventListener('click', function () {
            var cfg = D.carregarConfig();
            var nomeArquivo = 'backup-comanda-facil-' + CF.dataHojeISO() + '.json';
            CF.baixarArquivo(nomeArquivo, JSON.stringify(D.exportarTudo(), null, 2));
            CF.toast('Backup baixado: ' + nomeArquivo, 'ok');
        });

        el('btnImportarBackup').addEventListener('click', function () { el('arquivoBackup').click(); });

        el('arquivoBackup').addEventListener('change', function () {
            var arquivo = this.files && this.files[0];
            this.value = '';
            if (!arquivo) return;

            var leitor = new FileReader();
            leitor.onload = function () {
                var obj;
                try { obj = JSON.parse(leitor.result); }
                catch (e) { CF.toast('Arquivo inválido — não é um backup.', 'erro'); return; }

                CF.confirmar({
                    titulo: 'Importar este backup?',
                    texto: 'Os dados atuais deste navegador serão substituídos pelos do arquivo.',
                    textoBotao: 'Importar',
                    perigoso: true
                }).then(function (sim) {
                    if (!sim) return;
                    var r = D.importarTudo(obj);
                    if (!r.ok) { CF.toast(r.erro, 'erro'); return; }
                    CF.toast('Backup importado. Recarregando…', 'ok');
                    setTimeout(function () { location.reload(); }, 1200);
                });
            };
            leitor.readAsText(arquivo);
        });

        el('btnZerarComandas').addEventListener('click', function () {
            CF.confirmar({
                titulo: 'Excluir todas as comandas abertas?',
                texto: 'As comandas em andamento serão removidas. O histórico de vendas fica intacto.',
                textoBotao: 'Excluir comandas',
                perigoso: true
            }).then(function (sim) {
                if (!sim) return;
                D.salvar(D.CHAVES.comandas, []);
                CF.toast('Comandas abertas excluídas.', 'ok');
            });
        });

        el('btnZerarTudo').addEventListener('click', function () {
            CF.confirmar({
                titulo: 'Apagar TODOS os dados?',
                texto: 'Produtos, funcionários, comandas e vendas deste navegador serão perdidos. ' +
                       'Faça um backup antes se precisar.',
                textoBotao: 'Apagar tudo',
                perigoso: true
            }).then(function (sim) {
                if (!sim) return;
                D.apagarTudo();
                CF.toast('Dados apagados. Recarregando…', 'ok');
                setTimeout(function () { location.reload(); }, 1200);
            });
        });

        /* --- botões de impressão --- */
        document.addEventListener('click', function (ev) {
            var btn = ev.target.closest('[data-print]');
            if (!btn) return;
            if (btn.dataset.print === 'fechamento') imprimirFechamento();
            if (btn.dataset.print === 'cozinha')     imprimirFilaCozinha();
        });

        /* --- fechar modal do produto/funcionário/pagamento --- */
        Array.prototype.forEach.call(
            document.querySelectorAll('#modalProduto [data-fechar-modal], ' +
                                     '#modalFuncionario [data-fechar-modal], ' +
                                     '#modalPagamento [data-fechar-modal], ' +
                                     '#modalNovaComanda [data-fechar-modal]'),
            function (b) { b.addEventListener('click', CF.fecharModal); }
        );

        /* --- pagamento --- */
        el('gradePagamentos').addEventListener('input', atualizarRestante);
        el('valorRecebido').addEventListener('input', calcularTroco);
        el('formPagamento').addEventListener('submit', confirmarPagamento);

        /* --- ajuda do número da comanda volta ao normal --- */
        el('numeroComanda').addEventListener('input', function () {
            el('ajudaNumero').textContent = 'Pode ser número, mesa ou qualquer identificador.';
        });

        /* --- cronômetro da cozinha --- */
        setInterval(atualizarTempos, 1000);
    }


    /* ================================================================
       INÍCIO
    ================================================================= */
    function iniciar() {
        /* Migra os dados antigos (granForno*) se ainda não migraram. */
        D.migrarSePreciso().then(function (migrou) {
            if (migrou) {
                console.info('[Comanda Fácil] Dados do projeto anterior importados com sucesso.');
            }

            iniciarLogin();
            ligarEventos();

            if (!tentarRecuperarSessao()) {
                CF.focar('usuario');
            }

            /* PWA — registro do service worker (só funciona via servidor). */
            if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
                navigator.serviceWorker.register('sw.js').catch(function (e) {
                    console.info('[Comanda Fácil] Service worker não registrado:', e.message);
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }

})();
