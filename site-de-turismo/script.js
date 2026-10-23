/* =====================================================================
   Horizon Travel — comportamento do site
   ---------------------------------------------------------------------
   CONFIG no topo: é o único lugar que o cliente precisa mexer para
   cadastrar os canais de contato da própria agência.
   ===================================================================== */

const CONFIG = {
    whatsapp: '',            // ex.: '5511999999999' (só dígitos, com 55 e DDD)
    email: 'contato@horizontravel.com.br',
    instagram: ''
};

const SELECIONADO = document.documentElement;

/* ---------------------------------------------------------------------
   Auxiliares de WhatsApp
   --------------------------------------------------------------------- */

function numeroWhats() {
    const limpo = String(CONFIG.whatsapp || '').replace(/\D/g, '');
    return limpo;
}

function linkWhats(texto) {
    const numero = numeroWhats();
    if (!numero) return null;
    const corpo = encodeURIComponent(String(texto || '').trim());
    return 'https://wa.me/' + numero + (corpo ? '?text=' + corpo : '');
}

/* Abre o WhatsApp quando há número cadastrado.
   Sem número, devolve false para quem chamou tomar o caminho alternativo. */
function irParaWhats(texto) {
    const destino = linkWhats(texto);
    if (!destino) return false;
    window.open(destino, '_blank', 'noopener,noreferrer');
    return true;
}

async function copiarParaAreaTransferencia(texto) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(texto);
            return true;
        }
    } catch (e) { /* cai no caminho antigo abaixo */ }

    try {
        const caixa = document.createElement('textarea');
        caixa.value = texto;
        caixa.setAttribute('readonly', '');
        caixa.style.position = 'fixed';
        caixa.style.top = '-1000px';
        document.body.appendChild(caixa);
        caixa.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(caixa);
        return ok;
    } catch (e) {
        return false;
    }
}

function abrirEmail(assunto, corpo) {
    const destino = String(CONFIG.email || '').trim();
    if (!destino) return false;
    window.location.href = 'mailto:' + destino +
        '?subject=' + encodeURIComponent(assunto) +
        '&body=' + encodeURIComponent(corpo);
    return true;
}

/* =====================================================================
   1. MENU MOBILE
   ===================================================================== */

const nav = document.getElementById('nav');
const btnMobile = document.getElementById('btn-mobile');
const menu = document.getElementById('menu');

function alternarMenu(querAbrir) {
    const aberto = typeof querAbrir === 'boolean'
        ? querAbrir
        : !nav.classList.contains('active');

    nav.classList.toggle('active', aberto);
    if (btnMobile) {
        btnMobile.setAttribute('aria-expanded', String(aberto));
        btnMobile.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    }
}

if (btnMobile) {
    btnMobile.addEventListener('click', () => alternarMenu());
}

if (menu) {
    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => alternarMenu(false));
    });
}

/* Esc fecha o menu (e o lightbox, tratado mais abaixo) */
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && nav.classList.contains('active')) {
        alternarMenu(false);
        btnMobile && btnMobile.focus();
    }
});

/* Voltou para o desktop? O menu tem de voltar ao estado normal. */
const larguraDesktop = window.matchMedia('(min-width: 861px)');
const aoTrocarLargura = (evento) => { if (evento.matches) alternarMenu(false); };
if (larguraDesktop.addEventListener) larguraDesktop.addEventListener('change', aoTrocarLargura);
else if (larguraDesktop.addListener) larguraDesktop.addListener(aoTrocarLargura);

/* Clicou fora do menu? Fecha. */
document.addEventListener('click', (evento) => {
    if (!nav.classList.contains('active')) return;
    if (!nav.contains(evento.target)) alternarMenu(false);
});

/* =====================================================================
   2. HEADER QUE MUDA AO ROLAR + BOTÃO VOLTAR AO TOPO
   ===================================================================== */

const header = document.getElementById('header');
const btnTopo = document.getElementById('btn-topo');

function aoRolar() {
    const y = window.scrollY || window.pageYOffset;
    header.classList.toggle('fixo', y > 40);
    if (btnTopo) btnTopo.classList.toggle('visible', y > 520);
}

window.addEventListener('scroll', aoRolar, { passive: true });
aoRolar();

if (btnTopo) {
    btnTopo.addEventListener('click', () => {
        const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduz ? 'auto' : 'smooth' });
    });
}

/* =====================================================================
   3. ANIMAÇÃO DE APARECER
   Sem JS o conteúdo já estava visível (o CSS só esconde com .js na raiz).
   Com movimento reduzido, nada anima.
   ===================================================================== */

const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const aRevelar = document.querySelectorAll('.reveal');

if (movimentoReduzido || !('IntersectionObserver' in window)) {
    aRevelar.forEach((el) => el.classList.add('show'));
} else {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add('show');
            observador.unobserve(entrada.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    aRevelar.forEach((el) => observador.observe(el));
}

/* =====================================================================
   4. DESTAQUE DA SEÇÃO NO MENU
   ===================================================================== */

const secoes = Array.from(document.querySelectorAll('main section[id]'));
const linksMenu = Array.from(document.querySelectorAll('#menu a[href^="#"]'));

function destacarSecao(id) {
    linksMenu.forEach((link) => {
        const mesmo = link.getAttribute('href') === '#' + id;
        if (mesmo) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
    });
}

if ('IntersectionObserver' in window && secoes.length) {
    const observadorSecoes = new IntersectionObserver((entradas) => {
        const visivel = entradas
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visivel) destacarSecao(visivel.target.id);
    }, { threshold: [0.15, 0.4], rootMargin: '-80px 0px -55% 0px' });

    secoes.forEach((sec) => observadorSecoes.observe(sec));
}

/* =====================================================================
   5. LIGHTBOX DA GALERIA
   ===================================================================== */

const figuras = Array.from(document.querySelectorAll('#galeria-fotos figure'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxLegenda = document.getElementById('lightbox-legenda');
const btnFechar = document.querySelector('.lightbox-fechar');
const btnAnterior = document.querySelector('.lightbox-anterior');
const btnProxima = document.querySelector('.lightbox-proxima');

let indiceAtual = 0;
let quemAbriu = null;

function mostrarImagem(indice) {
    if (!figuras.length) return;
    indiceAtual = (indice + figuras.length) % figuras.length;

    const figura = figuras[indiceAtual];
    const img = figura.querySelector('img');
    if (!img) return;

    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
    lightboxLegenda.textContent = (img.alt || '') +
        '  ·  ' + (indiceAtual + 1) + ' de ' + figuras.length;
}

function abrirLightbox(indice, origem) {
    quemAbriu = origem || null;
    mostrarImagem(indice);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    btnFechar && btnFechar.focus();
}

function fecharLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
    if (quemAbriu && typeof quemAbriu.focus === 'function') quemAbriu.focus();
    quemAbriu = null;
}

figuras.forEach((figura, indice) => {
    figura.addEventListener('click', () => abrirLightbox(indice, figura));
    figura.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter' || evento.key === ' ') {
            evento.preventDefault();
            abrirLightbox(indice, figura);
        }
    });
});

if (btnFechar) btnFechar.addEventListener('click', fecharLightbox);
if (btnAnterior) btnAnterior.addEventListener('click', () => mostrarImagem(indiceAtual - 1));
if (btnProxima) btnProxima.addEventListener('click', () => mostrarImagem(indiceAtual + 1));

/* Clicou no fundo escuro? Fecha. */
lightbox.addEventListener('click', (evento) => {
    if (evento.target === lightbox) fecharLightbox();
});

document.addEventListener('keydown', (evento) => {
    if (lightbox.hidden) return;
    if (evento.key === 'Escape') fecharLightbox();
    if (evento.key === 'ArrowLeft') mostrarImagem(indiceAtual - 1);
    if (evento.key === 'ArrowRight') mostrarImagem(indiceAtual + 1);

    /* Tab fica preso dentro do lightbox enquanto ele estiver aberto */
    if (evento.key === 'Tab') {
        const focaveis = lightbox.querySelectorAll('button');
        if (!focaveis.length) return;
        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        if (evento.shiftKey && document.activeElement === primeiro) {
            evento.preventDefault();
            ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
            evento.preventDefault();
            primeiro.focus();
        }
    }
});

/* =====================================================================
   6. DESTINOS E PACOTES -> PEDIDO DE ORÇAMENTO NO WHATSAPP
   ===================================================================== */

function textoPedido(destino, pacote) {
    const linhas = ['Olá! Vim pelo site da Horizon Travel.'];
    if (destino) linhas.push('Tenho interesse no destino: ' + destino + '.');
    if (pacote) linhas.push('Pacote de interesse: ' + pacote + '.');
    linhas.push('Podem me enviar um orçamento, por favor?');
    return linhas.join('\n');
}

document.querySelectorAll('[data-destino]').forEach((botao) => {
    botao.addEventListener('click', () => {
        const destino = botao.getAttribute('data-destino');
        if (!irParaWhats(textoPedido(destino, ''))) {
            /* Sem número cadastrado: manda para o formulário já preenchido. */
            const campo = document.getElementById('destino');
            if (campo) campo.value = destino;
            document.getElementById('contato')
                .scrollIntoView({ behavior: movimentoReduzido ? 'auto' : 'smooth' });
        }
    });
});

document.querySelectorAll('[data-pacote]').forEach((botao) => {
    botao.addEventListener('click', () => {
        const pacote = botao.getAttribute('data-pacote');
        if (!irParaWhats(textoPedido('', pacote))) {
            const campo = document.getElementById('mensagem');
            if (campo && !campo.value.trim()) {
                campo.value = 'Tenho interesse no pacote ' + pacote + '.';
            }
            document.getElementById('contato')
                .scrollIntoView({ behavior: movimentoReduzido ? 'auto' : 'smooth' });
        }
    });
});

/* =====================================================================
   7. FORMULÁRIO DE ORÇAMENTO
   Valida de verdade e entrega a mensagem pelo canal disponível.
   Nada é enviado automaticamente e nada é guardado.
   ===================================================================== */

const form = document.getElementById('form-contato');
const formErro = document.getElementById('form-erro');
const btnEnviar = document.getElementById('btn-enviar');

function marcarCampo(campo, ruim) {
    campo.classList.toggle('invalido', ruim);
    campo.setAttribute('aria-invalid', ruim ? 'true' : 'false');
}

function mostrarAviso(texto, ehOk) {
    if (!formErro) return;
    formErro.hidden = false;
    formErro.textContent = texto;
    formErro.classList.toggle('form-ok', !!ehOk);
}

function esconderAviso() {
    if (!formErro) return;
    formErro.hidden = true;
    formErro.textContent = '';
    formErro.classList.remove('form-ok');
}

if (form) {
    form.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        esconderAviso();

        const nome = form.elements['nome'];
        const telefone = form.elements['telefone'];
        const email = form.elements['email'];
        const destino = form.elements['destino'];
        const mensagem = form.elements['mensagem'];

        const problemas = [];

        const nomeLimpo = nome.value.trim();
        if (nomeLimpo.length < 3) { problemas.push('seu nome completo'); marcarCampo(nome, true); }
        else marcarCampo(nome, false);

        const telLimpo = telefone.value.replace(/\D/g, '');
        if (telLimpo.length < 10) { problemas.push('um telefone com DDD'); marcarCampo(telefone, true); }
        else marcarCampo(telefone, false);

        if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
            problemas.push('um e-mail válido (ou deixe em branco)');
            marcarCampo(email, true);
        } else marcarCampo(email, false);

        if (problemas.length) {
            mostrarAviso('Falta preencher corretamente: ' + problemas.join(' e ') + '.', false);
            const primeiroRuim = form.querySelector('.invalido');
            if (primeiroRuim) primeiroRuim.focus();
            return;
        }

        const destinoTexto = destino.value || 'Ainda não sei — me ajuda a escolher';
        const corpo = [
            'Olá! Vim pelo site da Horizon Travel.',
            '',
            'Nome: ' + nomeLimpo,
            'Telefone: ' + telefone.value.trim(),
            email.value.trim() ? 'E-mail: ' + email.value.trim() : null,
            'Destino: ' + destinoTexto,
            mensagem.value.trim() ? 'Observações: ' + mensagem.value.trim() : null
        ].filter(Boolean).join('\n');

        /* Botão em estado de espera curto, para o clique não virar duplo. */
        if (btnEnviar) {
            btnEnviar.disabled = true;
            btnEnviar.textContent = 'Preparando...';
        }

        const abriu = irParaWhats(corpo);

        if (abriu) {
            mostrarAviso('Abrimos o WhatsApp com sua mensagem pronta. Só confirmar o envio por lá.', true);
            form.reset();
        } else {
            const copiou = await copiarParaAreaTransferencia(corpo);
            if (copiou) {
                mostrarAviso('Mensagem copiada! Cole no seu aplicativo preferido — ou use o e-mail abaixo.', true);
            } else if (abrirEmail('Orçamento pelo site', corpo)) {
                mostrarAviso('Abrimos seu programa de e-mail com a mensagem pronta.', true);
            } else {
                mostrarAviso('Não consegui abrir nenhum canal. Anote: ' + corpo.replace(/\n/g, ' / '), false);
            }
        }

        if (btnEnviar) {
            btnEnviar.disabled = false;
            btnEnviar.textContent = 'Solicitar orçamento';
        }
    });

    /* Limpa o erro assim que o cliente volta a digitar. */
    form.querySelectorAll('input, select, textarea').forEach((campo) => {
        campo.addEventListener('input', () => {
            marcarCampo(campo, false);
            if (formErro && !formErro.hidden && !formErro.classList.contains('form-ok')) esconderAviso();
        });
    });
}

/* =====================================================================
   8. CANAIS DE CONTATO PREENCHIDOS A PARTIR DO CONFIG
   ===================================================================== */

function configurarCanais() {
    const zapPainel = document.getElementById('link-whatsapp-painel');
    const zapFlutuante = document.getElementById('zap-flutuante');
    const linkEmail = document.getElementById('link-email');

    const textoGeral = 'Olá! Vim pelo site da Horizon Travel e gostaria de um orçamento.';
    const destinoZap = linkWhats(textoGeral);

    [zapPainel, zapFlutuante].forEach((el) => {
        if (!el) return;
        if (destinoZap) {
            el.href = destinoZap;
            el.removeAttribute('aria-hidden');
            el.removeAttribute('tabindex');
        } else {
            /* Sem número: o botão some, e o formulário vira o caminho. */
            el.hidden = true;
        }
    });

    if (linkEmail && String(CONFIG.email || '').trim()) {
        const endereco = String(CONFIG.email).trim();
        linkEmail.href = 'mailto:' + endereco;
        linkEmail.textContent = endereco;
    }

    const ano = document.getElementById('ano');
    if (ano) ano.textContent = String(new Date().getFullYear());
}

configurarCanais();

/* Fim do arquivo. */
