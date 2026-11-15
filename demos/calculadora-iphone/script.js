/* =========================================================
   CALCULADORA CIENTÍFICA — VISUAL IPHONE
   Desenvolvido por Prof. Marcelo Oliveira

   Índice do arquivo
   1.  Estado da aplicação
   2.  Acesso ao DOM
   3.  Persistência (localStorage)
   4.  Funções matemáticas auxiliares
   5.  ETAPA 1 — Tokenização da expressão
   6.  ETAPA 2 — Shunting-yard (precedência)
   7.  ETAPA 3 — Avaliação em notação polonesa reversa
   8.  API pública: calcular()
   9.  Formatação e exibição
   10. Inserção de teclas
   11. Ações (AC, ⌫, =, ±, memória)
   12. Histórico
   13. Relógio
   14. Teclado físico
   15. Inicialização

   POR QUE NÃO USAMOS eval() ?
   eval() executa qualquer texto como código JavaScript: é uma
   falha de segurança e ainda não entende matemática (graus,
   fatorial, precedência). Aqui montamos um avaliador real em
   3 etapas: tokenizar -> organizar por precedência -> empilhar.
   ========================================================= */

'use strict';

/* =========================================================
   1. ESTADO
   ========================================================= */
const CHAVE = {
    memoria:   'calc.iphone.memoria',
    historico: 'calc.iphone.historico',
    modo:      'calc.iphone.modo'
};

const estado = {
    expressao:       '',     // texto bruto digitado pelo usuário
    modo:            'DEG',  // 'DEG' (graus) ou 'RAD' (radianos)
    memoria:         0,
    historico:       [],     // [{ e, r, v }]
    ultimoResultado: null,   // último valor numérico válido
    mostrado:        '0',    // texto atual no display
    erro:            false,
    posResultado:    false   // true logo após "="
};

const MAX_HISTORICO = 12;

/* =========================================================
   2. ACESSO AO DOM
   ========================================================= */
const el = {
    relogio:     document.getElementById('relogio'),
    expressao:   document.getElementById('expressao'),
    resultado:   document.getElementById('resultado'),
    modo:        document.getElementById('btnModo'),
    memoria:     document.getElementById('btnMemoria'),
    historico:   document.getElementById('btnHistorico'),
    painel:      document.getElementById('historico'),
    lista:       document.getElementById('listaHistorico'),
    vazio:       document.getElementById('historicoVazio'),
    limparHist:  document.getElementById('btnLimparHistorico'),
    fecharHist:  document.getElementById('btnFecharHistorico')
};

/* =========================================================
   3. PERSISTÊNCIA
   ========================================================= */
function ler(chave, padrao) {
    try {
        const bruto = localStorage.getItem(chave);
        return bruto === null ? padrao : JSON.parse(bruto);
    } catch (e) {                       // navegação privada pode bloquear
        return padrao;
    }
}

function gravar(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
    } catch (e) { /* silencioso */ }
}

function carregarEstado() {
    const mem = Number(ler(CHAVE.memoria, 0));
    estado.memoria = Number.isFinite(mem) ? mem : 0;
    estado.modo = ler(CHAVE.modo, 'DEG') === 'RAD' ? 'RAD' : 'DEG';

    const h = ler(CHAVE.historico, []);
    estado.historico = Array.isArray(h)
        ? h.filter(i => i && typeof i.v === 'number' && Number.isFinite(i.v)).slice(0, MAX_HISTORICO)
        : [];
}

/* =========================================================
   4. AUXILIARES MATEMÁTICOS
   ========================================================= */

/** Erro real (divisão por zero, domínio inválido...). */
function erroCalc(mensagem) {
    const e = new Error(mensagem || 'Erro no cálculo');
    e.ehErroDeCalculo = true;
    e.incompleta = false;
    return e;
}

/** Expressão ainda incompleta (não deve virar alerta de erro). */
function incompleta() {
    const e = new Error('Expressão incompleta');
    e.ehErroDeCalculo = true;
    e.incompleta = true;
    return e;
}

/** Remove o ruído de ponto flutuante (ex.: sin(180°) = 0). */
function ajustar(v) {
    if (!Number.isFinite(v)) return v;
    const a = Math.abs(v);
    if (a < 1e-12) return 0;
    if (a < 1e12)  return parseFloat(v.toPrecision(12));
    return v;
}

function fatorial(n) {
    if (!Number.isFinite(n)) throw erroCalc('Número inválido');
    const limpo = Math.abs(n - Math.round(n)) < 1e-9 ? Math.round(n) : n;
    if (!Number.isInteger(limpo)) throw erroCalc('Fatorial exige número inteiro');
    if (limpo < 0)                throw erroCalc('Fatorial exige número maior ou igual a zero');
    if (limpo > 170)              throw erroCalc('Fatorial acima de 170 é grande demais');
    let r = 1;
    for (let i = 2; i <= limpo; i++) r *= i;
    return r;
}

function aplicarOperador(op, x, y) {
    switch (op) {
        case '+': return x + y;
        case '-': return x - y;
        case '*': return x * y;
        case '/':
            if (y === 0) throw erroCalc('Divisão por zero');
            return x / y;
        case '^': {
            const r = Math.pow(x, y);
            if (Number.isNaN(r)) throw erroCalc('Potência inválida');
            return r;
        }
    }
    throw erroCalc('Operador inválido');
}

function aplicarFuncao(nome, x) {
    const emGraus = estado.modo === 'DEG';
    const paraRad = v => emGraus ? v * Math.PI / 180 : v;
    const deRad   = v => emGraus ? v * 180 / Math.PI : v;

    switch (nome) {
        case 'sin': return ajustar(Math.sin(paraRad(x)));
        case 'cos': return ajustar(Math.cos(paraRad(x)));

        case 'tan': {
            if (emGraus) {
                const resto = ((x % 180) + 180) % 180;
                if (Math.abs(resto - 90) < 1e-9) throw erroCalc('Tangente indefinida');
            } else {
                const q = (x - Math.PI / 2) / Math.PI;
                if (Math.abs(q - Math.round(q)) < 1e-12) throw erroCalc('Tangente indefinida');
            }
            return ajustar(Math.tan(paraRad(x)));
        }

        case 'asin':
            if (x < -1 || x > 1) throw erroCalc('Domínio inválido: use −1 a 1');
            return ajustar(deRad(Math.asin(x)));

        case 'acos':
            if (x < -1 || x > 1) throw erroCalc('Domínio inválido: use −1 a 1');
            return ajustar(deRad(Math.acos(x)));

        case 'atan': return ajustar(deRad(Math.atan(x)));

        case 'ln':
            if (x <= 0) throw erroCalc('Logaritmo exige valor maior que zero');
            return ajustar(Math.log(x));

        case 'log':
            if (x <= 0) throw erroCalc('Logaritmo exige valor maior que zero');
            return ajustar(Math.log10(x));

        case 'sqrt':
            if (x < 0) throw erroCalc('Raiz de número negativo');
            return Math.sqrt(x);

        case 'exp':
            return ajustar(Math.exp(x));

        case 'abs': return Math.abs(x);
    }
    throw erroCalc('Função desconhecida');
}

/** Desembrulha { v, pct } usado pelo operador de porcentagem. */
function valorDe(x) {
    if (x && typeof x === 'object' && typeof x.v === 'number') {
        return x.pct ? x.v / 100 : x.v;
    }
    return x;
}

/* =========================================================
   5. ETAPA 1 — TOKENIZAÇÃO
   ========================================================= */

const FUNCOES = {
    sin: true, cos: true, tan: true,
    asin: true, acos: true, atan: true,
    ln: true, log: true, exp: true, sqrt: true, abs: true
};

/** Aceita vírgula brasileira, sinal de multiplicação bonito etc. */
function normalizar(s) {
    return String(s)
        .replace(/[×✕·]/g, '*')
        .replace(/÷/g, '/')
        .replace(/[−–—]/g, '-')
        .replace(/，/g, '.')
        .replace(/，/g, '.');
}

const RE_NUMERO = /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/;
const RE_LETRA  = /^[a-zA-Z]+/;

function terminaOperando(tk) {
    if (!tk) return false;
    return tk.t === 'num' || tk.t === 'const' || tk.t === 'fecha' || tk.t === 'pos';
}

function iniciaOperando(tk) {
    if (!tk) return false;
    return tk.t === 'num' || tk.t === 'const' || tk.t === 'abre' || tk.t === 'fn';
}

function tokenizar(bruto) {
    const s = normalizar(bruto);
    const tokens = [];
    let i = 0;

    while (i < s.length) {
        const c = s[i];
        if (c === ' ' || c === '\t') { i++; continue; }

        // --- número ---
        const mNum = RE_NUMERO.exec(s.slice(i));
        if (mNum) {
            const v = parseFloat(mNum[0]);
            if (!Number.isFinite(v)) throw incompleta();
            tokens.push({ t: 'num', v: v });
            i += mNum[0].length;
            continue;
        }

        // --- constante ou função por extenso ---
        const mLet = RE_LETRA.exec(s.slice(i));
        if (mLet) {
            const palavra = mLet[0].toLowerCase();
            if (palavra === 'e') {
                tokens.push({ t: 'const', nome: 'e' });
                i += 1;
            } else if (palavra === 'pi') {
                tokens.push({ t: 'const', nome: 'pi' });
                i += mLet[0].length;
            } else if (FUNCOES[palavra]) {
                tokens.push({ t: 'fn', nome: palavra });
                i += mLet[0].length;
            } else {
                throw erroCalc('Função desconhecida: ' + mLet[0]);
            }
            continue;
        }

        // --- símbolos avulsos ---
        if (c === '√') { tokens.push({ t: 'fn', nome: 'sqrt' }); i++; continue; }
        if (c === 'π') { tokens.push({ t: 'const', nome: 'pi' }); i++; continue; }
        if (c === '²') { tokens.push({ t: 'pos', v: '²' });   i++; continue; }
        if (s.substr(i, 2) === '⁻¹') { tokens.push({ t: 'pos', v: 'inv' }); i += 2; continue; }
        if (c === '!') { tokens.push({ t: 'pos', v: '!' });   i++; continue; }
        if (c === '%') { tokens.push({ t: 'pos', v: '%' });   i++; continue; }
        if (c === '(') { tokens.push({ t: 'abre' });   i++; continue; }
        if (c === ')') { tokens.push({ t: 'fecha' });  i++; continue; }
        if (c === '+' || c === '-' || c === '*' || c === '/' || c === '^') {
            tokens.push({ t: 'op', v: c });
            i++;
            continue;
        }

        throw erroCalc('Símbolo inválido: ' + c);
    }

    // --- multiplicação implícita: 2π, 3(4), 5sin(30), )( ---
    for (let k = 1; k < tokens.length; k++) {
        if (terminaOperando(tokens[k - 1]) && iniciaOperando(tokens[k])) {
            tokens.splice(k, 0, { t: 'op', v: '*' });
            k++;
        }
    }

    return tokens;
}

/* =========================================================
   6. ETAPA 2 — SHUNTING-YARD (ordem por precedência)
   ========================================================= */

const PRECEDENCIA = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };

function paraRPN(tokens) {
    if (!tokens.length) throw incompleta();

    const saida  = [];
    const pilha  = [];
    let anterior = null;

    for (let n = 0; n < tokens.length; n++) {
        const tk = tokens[n];

        switch (tk.t) {
            case 'num':
            case 'const':
            case 'pos':                    // pós-fixos aplicam na hora
                saida.push(tk);
                break;

            case 'fn':
            case 'abre':
                pilha.push(tk);
                break;

            case 'fecha': {
                let fechou = false;
                while (pilha.length) {
                    const topo = pilha.pop();
                    if (topo.t === 'abre') { fechou = true; break; }
                    saida.push(topo);
                }
                if (!fechou) throw erroCalc('Parênteses desbalanceados');
                if (pilha.length && pilha[pilha.length - 1].t === 'fn') {
                    saida.push(pilha.pop());
                }
                break;
            }

            case 'op': {
                const ehUnario = !terminaOperando(anterior);
                let atual;

                if (ehUnario) {
                    if (tk.v !== '-') throw erroCalc('Símbolo inválido');
                    // Início da expressão ou logo após "(": precedência média,
                    // para que "-2^2" resulte em −4 e "2^-3" funcione.
                    const lider = !anterior || anterior.t === 'abre' || anterior.t === 'fn';
                    atual = { t: 'op', v: '-', unario: true, p: lider ? 2.5 : 4, dir: true };
                } else {
                    atual = {
                        t: 'op', v: tk.v, unario: false,
                        p: PRECEDENCIA[tk.v], dir: tk.v === '^'
                    };
                }

                while (pilha.length) {
                    const topo = pilha[pilha.length - 1];
                    if (topo.t !== 'op') break;
                    if (topo.p > atual.p || (topo.p === atual.p && !atual.dir)) {
                        saida.push(pilha.pop());
                    } else {
                        break;
                    }
                }
                pilha.push(atual);
                break;
            }
        }

        anterior = tk;
    }

    const ultimo = tokens[tokens.length - 1];
    if (ultimo && (ultimo.t === 'op' || ultimo.t === 'abre' || ultimo.t === 'fn')) {
        throw incompleta();
    }

    while (pilha.length) {
        const topo = pilha.pop();
        if (topo.t === 'abre') throw incompleta();
        saida.push(topo);
    }

    if (!saida.length) throw incompleta();
    return saida;
}

/* =========================================================
   7. ETAPA 3 — AVALIAÇÃO RPN (pilha de valores)
   ========================================================= */

function avaliarRPN(rpn) {
    const pilha = [];

    const pegar = () => {
        if (!pilha.length) throw incompleta();
        return pilha.pop();
    };

    for (let n = 0; n < rpn.length; n++) {
        const tk = rpn[n];

        if (tk.t === 'num')   { pilha.push({ v: tk.v }); continue; }
        if (tk.t === 'const') { pilha.push({ v: tk.nome === 'pi' ? Math.PI : Math.E }); continue; }

        if (tk.t === 'fn') {
            const a = pegar();
            pilha.push({ v: aplicarFuncao(tk.nome, valorDe(a)) });
            continue;
        }

        if (tk.t === 'pos') {
            const a = pegar();
            const x = valorDe(a);

            if (tk.v === '²')       pilha.push({ v: x * x });
            else if (tk.v === 'inv') {
                if (x === 0) throw erroCalc('Divisão por zero');
                pilha.push({ v: 1 / x });
            }
            else if (tk.v === '!')  pilha.push({ v: fatorial(x) });
            // Guardamos o valor ORIGINAL com pct=true — a divisão por 100
            // acontece só na operação final (para respeitar 200+20%=240).
            else if (tk.v === '%')  pilha.push({ v: x, pct: true });
            continue;
        }

        if (tk.t === 'op') {
            if (tk.unario) {
                const a = pegar();
                pilha.push({ v: -valorDe(a) });
                continue;
            }
            const b = pegar();
            const a = pegar();
            const x = valorDe(a);

            // 200+20% → 240 (percentual relativo à base)
            // 50×20%  → 10  (percentual como fração)
            let y;
            if (b && b.pct) {
                y = (tk.v === '+' || tk.v === '-') ? x * (b.v / 100) : b.v / 100;
            } else {
                y = b ? b.v : 0;
            }

            pilha.push({ v: aplicarOperador(tk.v, x, y) });
            continue;
        }
    }

    if (pilha.length !== 1) throw incompleta();
    return valorDe(pilha[0]);
}

/* =========================================================
   8. API PÚBLICA
   ========================================================= */

function calcular(texto) {
    let s = String(texto || '').trim();
    if (!s) throw incompleta();

    // fecha sozinho parênteses que o usuário esqueceu de fechar
    const abertos   = (s.match(/\(/g) || []).length;
    const fechados  = (s.match(/\)/g) || []).length;
    if (abertos > fechados) s += ')'.repeat(abertos - fechados);

    const tokens = tokenizar(s);
    const rpn    = paraRPN(tokens);
    return avaliarRPN(rpn);
}

/* =========================================================
   9. FORMATAÇÃO E EXIBIÇÃO
   ========================================================= */

const EXIBICAO = {
    'sin('  : 'sin(',
    'cos('  : 'cos(',
    'tan('  : 'tan(',
    'asin(' : 'sin⁻¹(',
    'acos(' : 'cos⁻¹(',
    'atan(' : 'tan⁻¹(',
    'ln('   : 'ln(',
    'log('  : 'log(',
    'sqrt(' : '√(',
    'exp('  : 'eˣ(',
    'abs('  : '|x|'
};

/** Deixa a expressão legível: × ÷ √ , e inversas trigonométricas. */
function textoParaExibir(bruto) {
    let s = normalizar(bruto);

    s = s.replace(
        /(^|[^a-z])(asin\(|acos\(|atan\(|sin\(|cos\(|tan\(|ln\(|log\(|sqrt\(|exp\(|abs\()/g,
        (m, prefixo, fn) => prefixo + (EXIBICAO[fn] || fn)
    );

    return s.replace(/\*/g, '×').replace(/\//g, '÷').replace(/\./g, ',');
}

/** Valor numérico -> texto reaproveitável na expressão (sem "1.234"). */
function textoDeNumero(v) {
    if (typeof v !== 'number' || !Number.isFinite(v)) return '';
    const limpo = Math.abs(v) < 1e15 ? parseFloat(v.toPrecision(12)) : v;
    return String(limpo);
}

/** Valor numérico -> texto bonito em português. */
function formatarNumero(n) {
    if (typeof n !== 'number' || Number.isNaN(n)) return 'Erro';
    if (!isFinite(n)) return n > 0 ? 'Infinito' : '−Infinito';

    const abs = Math.abs(n);

    if (abs !== 0 && (abs >= 1e15 || abs < 1e-9)) {
        return n.toExponential(6)
            .replace(/\.?0+e/, 'e')
            .replace('e+', 'e')
            .replace('.', ',');
    }

    if (Number.isInteger(n)) {
        return n.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
    }

    return n.toLocaleString('pt-BR', { maximumFractionDigits: 10 });
}

function equilibrio(s) {
    return (s.match(/\(/g) || []).length - (s.match(/\)/g) || []).length;
}

function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, c => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}

/** Renderiza expressão + resultado no display. */
function render() {
    el.expressao.textContent = textoParaExibir(estado.expressao);

    if (!estado.expressao) {
        estado.mostrado = '0';
        estado.erro = false;
        estado.ultimoResultado = null;
    } else {
        try {
            const v = calcular(estado.expressao);
            estado.ultimoResultado = v;
            estado.mostrado = formatarNumero(v);
            estado.erro = false;
        } catch (e) {
            if (e && e.incompleta) {
                // expressão incompleta: mantém o último valor válido na tela
                if (typeof estado.mostrado !== 'string') estado.mostrado = '0';
            } else {
                estado.mostrado = (e && e.message) || 'Erro';
                estado.erro = true;
                estado.ultimoResultado = null;
            }
        }
    }

    el.resultado.textContent = estado.mostrado;

    if (estado.erro) el.resultado.setAttribute('data-erro', 'sim');
    else el.resultado.removeAttribute('data-erro');

    const n = estado.mostrado.length;
    const escala = n > 13 ? 'pequeno' : (n > 9 ? 'medio' : null);
    if (escala) el.resultado.dataset.escala = escala;
    else delete el.resultado.dataset.escala;

    // pill do modo angular
    el.modo.textContent = estado.modo;
    el.modo.setAttribute('aria-pressed', estado.modo === 'RAD' ? 'true' : 'false');

    // indicador da memória
    const temMemoria = estado.memoria !== 0;
    el.memoria.disabled = !temMemoria;
    el.memoria.classList.toggle('pill--ativo', temMemoria);

    marcarOperadorAtivo();
}

function marcarOperadorAtivo() {
    document.querySelectorAll('.tecla[data-ativo]').forEach(b => b.removeAttribute('data-ativo'));
    const ult = estado.expressao.slice(-1);
    if ('+-*/'.indexOf(ult) === -1 || estado.posResultado) return;
    const alvo = Array.prototype.slice.call(document.querySelectorAll('[data-ins]'))
        .find(b => b.dataset.ins === ult);
    if (alvo) alvo.dataset.ativo = 'sim';
}

/* =========================================================
   10. INSERÇÃO DE TECLAS
   ========================================================= */

const INICIA_OPERANDO = /^[(\dπ.]|^(sin|cos|tan|asin|acos|atan|ln|log|sqrt|abs|√)/;

function precisaMultiplicar(expr, texto) {
    if (!expr) return false;
    if (!INICIA_OPERANDO.test(texto)) return false;

    if (/[)²!]$/.test(expr)) return true;
    if (/⁻¹$/.test(expr)) return true;
    if (/π$/.test(expr))  return true;

    if (/\d$/.test(expr)) {
        // "10^" depois de um número precisa de × — dígito solto não.
        if (texto.length > 1 && /^\d/.test(texto)) return true;
        return /^[(]|^(sin|cos|tan|ln|log|sqrt|abs|√)/.test(texto);
    }

    return false;
}

function inserir(texto) {
    if (typeof texto !== 'string' || !texto) return;

    // saiu de um resultado: operador continua, número começa de novo
    if (estado.posResultado) {
        const ehOperador = /^[+\-*/^]$/.test(texto);
        const ehPosfixo  = texto === '%' || texto === '²' || texto === '!' || texto === '⁻¹';

        if ((ehOperador || ehPosfixo) && estado.ultimoResultado !== null) {
            estado.expressao = textoDeNumero(estado.ultimoResultado) + texto;
            estado.posResultado = false;
            render();
            return;
        }
        estado.expressao = '';
        estado.posResultado = false;
    }

    // vírgula decimal: uma por número
    if (texto === '.') {
        const ultimoNumero = (estado.expressao.match(/[\d.]+$/) || [''])[0];
        if (ultimoNumero.indexOf('.') !== -1) return;
        if (!ultimoNumero) texto = '0.';
    }

    if (precisaMultiplicar(estado.expressao, texto)) estado.expressao += '*';

    // operadores
    if (/^[+\-*/^]$/.test(texto)) {
        const ult = estado.expressao.slice(-1);

        if (!estado.expressao) {
            if (texto !== '-') return;                     // só o "−" no início
        } else if ('+-*/^'.indexOf(ult) !== -1) {
            const anterior = estado.expressao.slice(-2, -1);
            const anteriorEhOperando = anterior === '' ||
                anterior === '(' || '+-*/^'.indexOf(anterior) !== -1;

            // "5×" + "−"  -> "5×−3"  (unário)
            // "5×" + "+"   -> "5+"    (troca o operador)
            if (texto === '-' && !anteriorEhOperando) estado.expressao += texto;
            else estado.expressao = estado.expressao.slice(0, -1) + texto;

            render();
            return;
        } else if (ult === '(' && texto !== '-') {
            return;
        }
    }

    if (texto === ')' && ( !/\(/.test(estado.expressao) || equilibrio(estado.expressao) <= 0 )) {
        return;
    }

    estado.expressao += texto;
    render();
}

function apagar() {
    if (!estado.expressao) return;
    estado.posResultado = false;

    const mFuncao = /(asin\(|acos\(|atan\(|sin\(|cos\(|tan\(|ln\(|log\(|sqrt\(|exp\(|abs\(|√\()$/
        .exec(estado.expressao);

    if (mFuncao) {
        estado.expressao = estado.expressao.slice(0, -mFuncao[0].length);
    } else if (estado.expressao.slice(-2) === '⁻¹') {
        estado.expressao = estado.expressao.slice(0, -2);
    } else {
        estado.expressao = estado.expressao.slice(0, -1);
    }

    render();
}

/* =========================================================
   11. AÇÕES
   ========================================================= */

function resultadoOuZero() {
    return (estado.ultimoResultado !== null && isFinite(estado.ultimoResultado))
        ? estado.ultimoResultado
        : 0;
}

function envolverSeNegativo(texto) {
    return texto.charAt(0) === '-' ? '(' + texto + ')' : texto;
}

function igual() {
    if (!estado.expressao) return;

    let v = null;
    try { v = calcular(estado.expressao); } catch (e) { v = null; }

    const valido = v !== null && isFinite(v) && !Number.isNaN(v);
    if (valido) adicionarHistorico(estado.expressao, v);

    estado.posResultado = valido;
    render();
}

function negativo() {
    if (!estado.expressao) {
        if (estado.ultimoResultado !== null && isFinite(estado.ultimoResultado)) {
            estado.expressao = envolverSeNegativo(textoDeNumero(-estado.ultimoResultado));
            estado.posResultado = false;
            render();
        }
        return;
    }

    // caso 1: termina em número -> inverte só esse número
    const m = estado.expressao.match(/\d*\.?\d+(?:[eE][+-]?\d+)?$/);
    if (m) {
        const antes   = estado.expressao.slice(0, estado.expressao.length - m[0].length);
        const penul   = antes.slice(-2, -1);
        const jaUnario = antes.slice(-1) === '-' &&
            (antes.length === 1 || penul === '(' || '+-*/^'.indexOf(penul) !== -1);

        estado.expressao = jaUnario
            ? antes.slice(0, -1) + m[0]
            : antes + '-' + m[0];

        estado.posResultado = false;
        render();
        return;
    }

    // caso 2: termina em ")" -> envolve tudo em −( ... )
    if (estado.expressao.slice(-1) === ')') {
        const semSinal = estado.expressao;
        const jaEnvolvido = semSinal.slice(0, 2) === '-(' &&
            semSinal.slice(-1) === ')' &&
            equilibrio(semSinal.slice(1)) === 0;

        estado.expressao = jaEnvolvido
            ? semSinal.slice(2, -1)
            : '-(' + semSinal + ')';

        estado.posResultado = false;
        render();
    }
}

function acao(nome) {
    switch (nome) {
        case 'limpar':
            estado.expressao = '';
            estado.mostrado = '0';
            estado.erro = false;
            estado.ultimoResultado = null;
            estado.posResultado = false;
            render();
            break;

        case 'apagar':
            apagar();
            break;

        case 'igual':
            igual();
            break;

        case 'negativo':
            negativo();
            break;

        case 'memoria-limpar':
            estado.memoria = 0;
            gravar(CHAVE.memoria, 0);
            render();
            break;

        case 'memoria-recuperar':
            if (estado.memoria !== 0) inserir(envolverSeNegativo(textoDeNumero(estado.memoria)));
            break;

        case 'memoria-somar':
            estado.memoria += resultadoOuZero();
            gravar(CHAVE.memoria, estado.memoria);
            render();
            break;

        case 'memoria-subtrair':
            estado.memoria -= resultadoOuZero();
            gravar(CHAVE.memoria, estado.memoria);
            render();
            break;

        case 'memoria-salvar':
            estado.memoria = resultadoOuZero();
            gravar(CHAVE.memoria, estado.memoria);
            render();
            break;
    }
}

/* =========================================================
   12. HISTÓRICO
   ========================================================= */

function adicionarHistorico(expr, valor) {
    const conta = textoParaExibir(expr);
    const res   = formatarNumero(valor);

    if (estado.historico.length &&
        estado.historico[0].e === conta &&
        estado.historico[0].r === res) return;

    estado.historico.unshift({ e: conta, r: res, v: valor });
    if (estado.historico.length > MAX_HISTORICO) {
        estado.historico.length = MAX_HISTORICO;
    }
    gravar(CHAVE.historico, estado.historico);
    renderHistorico();
}

function renderHistorico() {
    el.lista.innerHTML = '';

    estado.historico.forEach((item, i) => {
        const li = document.createElement('li');
        li.className = 'historico__item';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'historico__botao';
        btn.innerHTML =
            '<span class="historico__conta">' + escapeHTML(item.e) + '</span>' +
            '<span class="historico__valor">' + escapeHTML(item.r) + '</span>';
        btn.addEventListener('click', () => usarHistorico(i));

        li.appendChild(btn);
        el.lista.appendChild(li);
    });

    el.vazio.hidden = estado.historico.length > 0;
}

function usarHistorico(indice) {
    const item = estado.historico[indice];
    if (!item) return;
    estado.expressao = textoDeNumero(item.v);
    estado.posResultado = false;
    fecharHistorico();
    render();
}

function abrirHistorico() {
    el.painel.hidden = false;
    el.historico.setAttribute('aria-expanded', 'true');
}

function fecharHistorico() {
    el.painel.hidden = true;
    el.historico.setAttribute('aria-expanded', 'false');
    el.historico.focus();
}

/* =========================================================
   13. RELÓGIO
   ========================================================= */

function atualizarRelogio() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    el.relogio.textContent = hh + ':' + mm;
}

/* =========================================================
   14. TECLADO FÍSICO
   ========================================================= */

function aoTeclar(ev) {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;

    const tecla = ev.key;
    const emBotao = ev.target && ev.target.tagName === 'BUTTON';

    // deixa o navegador acionar o botão em foco
    if (emBotao && (tecla === 'Enter' || tecla === ' ')) return;

    if (tecla.length === 1 && tecla >= '0' && tecla <= '9') {
        inserir(tecla); ev.preventDefault(); return;
    }
    if (tecla === '.' || tecla === ',') { inserir('.'); ev.preventDefault(); return; }
    if (tecla.length === 1 && '+-*/^()'.indexOf(tecla) !== -1) {
        inserir(tecla); ev.preventDefault(); return;
    }
    if (tecla === '%') { inserir('%'); ev.preventDefault(); return; }
    if (tecla === '!') { inserir('!'); ev.preventDefault(); return; }

    if (tecla === 'Enter' || tecla === '=') { acao('igual'); ev.preventDefault(); return; }
    if (tecla === 'Backspace') { acao('apagar'); ev.preventDefault(); return; }

    if (tecla === 'Escape') {
        if (!el.painel.hidden) fecharHistorico();
        else acao('limpar');
        ev.preventDefault(); return;
    }
    if (tecla === 'Delete') { acao('limpar'); ev.preventDefault(); return; }

    const atalhos = {
        s: 'sin(', c: 'cos(', t: 'tan(', a: 'asin(',
        l: 'log(', n: 'ln(',  r: '√(',   p: 'π', e: 'e'
    };
    if (atalhos[tecla]) { inserir(atalhos[tecla]); ev.preventDefault(); }
}

/* =========================================================
   15. INICIALIZAÇÃO
   ========================================================= */

function iniciar() {
    carregarEstado();
    render();
    renderHistorico();
    atualizarRelogio();
    setInterval(atualizarRelogio, 15000);

    // delegação de clique para todas as teclas
    document.addEventListener('click', ev => {
        const alvo = ev.target.closest ? ev.target.closest('button') : null;
        if (!alvo) return;

        // devolve o foco ao documento após clique com o mouse
        if (ev.detail !== 0 && typeof alvo.blur === 'function') alvo.blur();

        if (alvo.dataset.ins !== undefined) { inserir(alvo.dataset.ins); return; }
        if (alvo.dataset.acao) { acao(alvo.dataset.acao); }
    });

    document.addEventListener('keydown', aoTeclar);

    el.modo.addEventListener('click', () => {
        estado.modo = estado.modo === 'DEG' ? 'RAD' : 'DEG';
        gravar(CHAVE.modo, estado.modo);
        render();
    });

    el.memoria.addEventListener('click', () => acao('memoria-recuperar'));

    el.historico.addEventListener('click', () => {
        if (el.painel.hidden) abrirHistorico();
        else fecharHistorico();
    });

    el.fecharHist.addEventListener('click', fecharHistorico);

    el.limparHist.addEventListener('click', () => {
        estado.historico = [];
        gravar(CHAVE.historico, []);
        renderHistorico();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
} else {
    iniciar();
}
