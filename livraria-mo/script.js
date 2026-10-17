/* =========================================================
   M.O LIVRARIA
   Catálogo, carrinho, checkout, tema e WhatsApp
   ========================================================= */

const WHATSAPP_NUMBER = "5511987654321";

const PLACEHOLDER_COVER =
    "https://placehold.co/300x400/e9e1d4/6b3410?text=Livro";

const books = [
    // ---------------- NACIONAIS ----------------
    { id: 1, title: "Dom Casmurro", author: "Machado de Assis", origin: "Nacional", category: "Clássicos", price: 49.90, stock: 18, sold: 312, featured: true, desc: "Um dos maiores romances da literatura brasileira. A história de Bentinho e Capitu, narrada com ironia e ambiguidade, questiona a verdade, os ciúmes e a memória." },
    { id: 2, title: "Memórias Póstumas de Brás Cubas", author: "Machado de Assis", origin: "Nacional", category: "Clássicos", price: 44.90, stock: 12, sold: 205, desc: "Escrito por um defunto autor, este romance inovador mistura humor, filosofia e crítica social, marcando o início do realismo machadiano." },
    { id: 3, title: "Quincas Borba", author: "Machado de Assis", origin: "Nacional", category: "Clássicos", price: 42.90, stock: 9, sold: 148, desc: "Acompanha a trajetória de Rubião, herdeiro de uma fortuna, explorando a filosofia do Humanitismo e a hipocrisia da sociedade carioca." },
    { id: 4, title: "O Cortiço", author: "Aluísio Azevedo", origin: "Nacional", category: "Clássicos", price: 39.90, stock: 21, sold: 267, desc: "Retrato naturalista do Rio de Janeiro oitocentista, acompanhando a vida de moradores de um cortiço e suas paixões, misérias e ambições." },
    { id: 5, title: "Capitães da Areia", author: "Jorge Amado", origin: "Nacional", category: "Romance", price: 54.90, stock: 25, sold: 480, featured: true, badge: "Mais vendido", desc: "A vida de meninos abandonados nas ruas de Salvador, liderados por Pedro Bala, em um retrato tocante do abandono e da solidariedade." },
    { id: 6, title: "Gabriela, Cravo e Canela", author: "Jorge Amado", origin: "Nacional", category: "Romance", price: 52.90, stock: 17, sold: 390, desc: "Em Ilhéus, a chegada de Gabriela transforma a cidade e seus costumes, em um romance sensual e repleto de crítica social." },
    { id: 7, title: "Grande Sertão: Veredas", author: "Guimarães Rosa", origin: "Nacional", category: "Clássicos", price: 69.90, stock: 8, sold: 175, badge: "Clássico", desc: "Um dos pilares da literatura brasileira: Riobaldo narra sua vida no sertão, o cangaço e a eterna questão do pacto com o diabo." },
    { id: 8, title: "Vidas Secas", author: "Graciliano Ramos", origin: "Nacional", category: "Clássicos", price: 38.90, stock: 14, sold: 223, desc: "A saga de uma família de retirantes nordestinos em busca de sobrevivência, em prosa seca, forte e essencial." },
    { id: 9, title: "São Bernardo", author: "Graciliano Ramos", origin: "Nacional", category: "Clássicos", price: 36.90, stock: 11, sold: 132, desc: "As memórias de Paulo Honório, proprietário da fazenda São Bernardo, em um relato de ambição, solidão e redenção." },
    { id: 10, title: "Macunaíma", author: "Mário de Andrade", origin: "Nacional", category: "Clássicos", coverTitle: "Macunaima", price: 45.90, stock: 13, sold: 160, desc: "Herói sem nenhum caráter: uma rapsódia que captura a alma do Brasil, misturando mito, humor e linguagem popular." },
    { id: 11, title: "Iracema", author: "José de Alencar", origin: "Nacional", category: "Clássicos", price: 34.90, stock: 16, sold: 189, desc: "Lenda da fundação do Ceará, narrando o amor entre a índia Iracema e o português Martim, com poesia e misticismo." },
    { id: 12, title: "O Guarani", author: "José de Alencar", origin: "Nacional", category: "Clássicos", price: 36.90, stock: 10, sold: 141, desc: "Romance indianista que retrata a formação da nação brasileira através da história de amor e aventura nas selvas." },
    { id: 13, title: "A Moreninha", author: "Joaquim Manuel de Macedo", origin: "Nacional", category: "Romance", price: 32.90, stock: 19, sold: 110, desc: "Primeiro romance do romantismo brasileiro, conta a história de amor de um estudante e uma morena em Paquetá." },
    { id: 14, title: "Memórias de um Sargento de Milícias", author: "Manuel Antônio de Almeida", origin: "Nacional", category: "Clássicos", price: 39.90, stock: 7, sold: 98, desc: "Crônica da sociedade fluminense do século XIX, cheia de humor e episódios pitorescos da vida carioca." },
    { id: 15, title: "O Alienista", author: "Machado de Assis", origin: "Nacional", category: "Contos", price: 29.90, stock: 24, sold: 201, desc: "Novela sobre o Dr. Simão Bacamarte, que instala um asilo em Itaguaí e redefine loucura e sanidade, em sátira afiada." },
    // ---------------- INTERNACIONAIS ----------------
    { id: 16, title: "Dom Quixote", author: "Miguel de Cervantes", origin: "Internacional", category: "Clássicos", price: 79.90, stock: 6, sold: 150, badge: "Clássico", desc: "A odiseia do cavaleiro andante Dom Quixote e de seu fiel escudeiro Sancho Pança, marco fundador do romance moderno." },
    { id: 17, title: "1984", author: "George Orwell", origin: "Internacional", category: "Ficção", price: 49.90, stock: 30, sold: 620, featured: true, badge: "Mais vendido", desc: "Na Oceania de Big Brother, Winston Smith luta pela verdade em uma sociedade de vigilância total e controle do pensamento." },
    { id: 18, title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", origin: "Internacional", category: "Infantil", price: 34.90, stock: 40, sold: 710, featured: true, badge: "Favorito", desc: "Um aviador encontra um pequeno príncipe no deserto e redescobre o essencial: só se vê bem com o coração." },
    { id: 19, title: "Cem Anos de Solidão", author: "Gabriel García Márquez", origin: "Internacional", category: "Romance", price: 59.90, stock: 15, sold: 380, featured: true, desc: "A saga da família Buendía em Macondo, marco do realismo mágico que encantou o mundo." },
    { id: 20, title: "O Senhor dos Anéis", author: "J. R. R. Tolkien", origin: "Internacional", category: "Fantasia", price: 89.90, stock: 12, sold: 520, badge: "Saga", coverTitle: "The Lord of the Rings", desc: "A jornada de Frodo para destruir o Um Anel e salvar a Terra-média, em uma das maiores sagas da fantasia." },
    { id: 21, title: "Harry Potter e a Pedra Filosofal", author: "J. K. Rowling", origin: "Internacional", category: "Fantasia", price: 49.90, stock: 28, sold: 680, featured: true, badge: "Mais vendido", desc: "O menino que sobreviveu descobre ser bruxo e ingressa em Hogwarts, onde começa sua grande aventura." },
    { id: 22, title: "Crime e Castigo", author: "Fiódor Dostoiévski", origin: "Internacional", category: "Clássicos", price: 54.90, stock: 9, sold: 210, desc: "Raskólnikov, um jovem estudante, comete um assassinato e enfrenta a culpa e a redenção em São Petersburgo." },
    { id: 23, title: "Orgulho e Preconceito", author: "Jane Austen", origin: "Internacional", category: "Romance", price: 44.90, stock: 20, sold: 340, desc: "Elizabeth Bennet e o orgulhoso Mr. Darcy dançam entre mal-entendidos, classes sociais e o verdadeiro amor." },
    { id: 24, title: "O Grande Gatsby", author: "F. Scott Fitzgerald", origin: "Internacional", category: "Clássicos", price: 42.90, stock: 14, sold: 195, desc: "Jay Gatsby e seu sonho americano na Era do Jazz, em um retrato da ilusão, do amor e do declínio." },
    { id: 25, title: "Moby Dick", author: "Herman Melville", origin: "Internacional", category: "Clássicos", price: 59.90, stock: 7, sold: 120, desc: "A obsessiva caçada do capitão Ahab à baleia branca, símbodo do mal e do destino." },
    { id: 26, title: "A Metamorfose", author: "Franz Kafka", origin: "Internacional", category: "Clássicos", price: 32.90, stock: 22, sold: 260, desc: "Gregor Samsa acorda transformado em um inseto gigante, em uma alegoria sobre alienação e família." },
    { id: 27, title: "O Apanhador no Campo de Centeio", author: "J. D. Salinger", origin: "Internacional", category: "Romance", price: 46.90, stock: 11, sold: 175, desc: "Holden Caulfield vaga por Nova York em uma crise de identidade, em voz adolescente inesquecível." },
    { id: 28, title: "Anna Kariênina", author: "Liev Tolstói", origin: "Internacional", category: "Clássicos", price: 64.90, stock: 8, sold: 135, desc: "O amor proibido de Anna e Vronski em meio à alta sociedade russa e à busca por sentido." },
    { id: 29, title: "Sapiens", author: "Yuval Noah Harari", origin: "Internacional", category: "Ciência", price: 69.90, stock: 26, sold: 410, featured: true, desc: "A história da humanidade, da Idade da Pedra à era digital, em uma síntese provocadora." },
    { id: 30, title: "Uma Breve História do Tempo", author: "Stephen Hawking", origin: "Internacional", category: "Ciência", price: 49.90, stock: 18, sold: 230, desc: "O universo, buracos negros e o tempo, explicados de forma acessível pelo grande físico." },
    { id: 31, title: "A Origem das Espécies", author: "Charles Darwin", origin: "Internacional", category: "Ciência", price: 59.90, stock: 6, sold: 105, desc: "A obra fundadora da biologia evolutiva, que mudou a visão do mundo sobre a vida." },
    { id: 32, title: "O Hobbit", author: "J. R. R. Tolkien", origin: "Internacional", category: "Fantasia", price: 49.90, stock: 19, sold: 405, desc: "Bilbo Bolseiro embarca em uma aventura inesperada com anões e um dragão." },
    { id: 33, title: "Duna", author: "Frank Herbert", origin: "Internacional", category: "Ficção", price: 64.90, stock: 12, sold: 330, desc: "No planeta Arrakis, Paul Atreides enfrenta intriga, profecia e deserto, na maior saga de ficção científica." },
    { id: 34, title: "Fundação", author: "Isaac Asimov", origin: "Internacional", category: "Ficção", price: 49.90, stock: 13, sold: 245, desc: "Hari Seldon prevê a queda do Império e cria a Fundação para preservar o conhecimento." },
    { id: 35, title: "O Código Da Vinci", author: "Dan Brown", origin: "Internacional", category: "Suspense", price: 47.90, stock: 16, sold: 290, coverTitle: "The Da Vinci Code", desc: "Robert Langdon investiga um assassinato no Louvre e descobre segredos sobre o Santo Graal." },
    { id: 36, title: "O Nome da Rosa", author: "Umberto Eco", origin: "Internacional", category: "Suspense", price: 56.90, stock: 9, sold: 155, desc: "Um monge franciscano investiga misteriosos assassinatos em uma abadia medieval." },
    { id: 37, title: "A Revolução dos Bichos", author: "George Orwell", origin: "Internacional", category: "Ficção", price: 36.90, stock: 27, sold: 470, desc: "Uma sátira política onde animais de uma fazenda tomam o poder e repetem os erros humanos." },
    { id: 38, title: "O Sol é Para Todos", author: "Harper Lee", origin: "Internacional", category: "Drama", price: 45.90, stock: 14, sold: 215, desc: "Na Alabama dos anos 30, Atticus Finch defende um homem negro acusado injustamente." },
    { id: 39, title: "A Garota do Lago", author: "Charlie Donlea", origin: "Internacional", category: "Suspense", price: 44.90, stock: 18, sold: 190, desc: "Uma investigadora forense tenta provar que um amigo adolescente foi assassinado, em thriller eletrizante." },
    { id: 40, title: "O Ladrão de Raios", author: "Rick Riordan", origin: "Internacional", category: "Juvenil", price: 44.90, stock: 21, sold: 360, desc: "Percy Jackson descobre ser filho de Poseidon e parte em missão para evitar uma guerra entre os deuses." },
    { id: 41, title: "Percy Jackson: O Mar de Monstros", author: "Rick Riordan", origin: "Internacional", category: "Juvenil", price: 44.90, stock: 17, sold: 340, desc: "Percy e seus amigos partem à procura do Velocino de Ouro para salvar o Acampamento Meio-Sangue." },
    { id: 42, title: "O Homem de Giz", author: "C. J. Tudor", origin: "Internacional", category: "Suspense", price: 42.90, stock: 13, sold: 150, desc: "Um crime do passado retorna quando desenhos de giz ressurgem em uma pequena cidade inglesa." }
];

// ---------------- STATE ----------------
let cart = loadCart();
let activeFilter = "all";
let currentBook = null;

const els = {};

document.addEventListener("DOMContentLoaded", () => {
    cacheElements();
    initTheme();
    renderCarousel();
    renderBooks();
    renderCart();
    bindEvents();
    updateCartCount();
    animateOnScroll();
});

function cacheElements() {
    els.header = document.getElementById("header");
    els.nav = document.getElementById("main-nav");
    els.btnMobile = document.getElementById("btn-mobile");
    els.search = document.getElementById("search");
    els.sort = document.getElementById("sort");
    els.chips = document.getElementById("filter-chips");
    els.grid = document.getElementById("books-grid");
    els.carousel = document.getElementById("carousel-track");
    els.cartDrawer = document.getElementById("cart-drawer");
    els.cartItems = document.getElementById("cart-items");
    els.cartTotal = document.getElementById("cart-total");
    els.cartCount = document.getElementById("cart-count");
    els.modalBackdrop = document.getElementById("modal-backdrop");
    els.modalBody = document.getElementById("modal-body");
    els.checkoutBackdrop = document.getElementById("checkout-backdrop");
    els.checkoutForm = document.getElementById("checkout-form");
    els.checkoutSummary = document.getElementById("checkout-summary");
    els.checkoutTotal = document.getElementById("checkout-total");
    els.themeToggle = document.getElementById("theme-toggle");
    els.themeIcon = els.themeToggle.querySelector("i");
}

// ---------------- THEME ----------------
function initTheme() {
    const saved = localStorage.getItem("mo-livraria-theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    applyTheme(theme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("mo-livraria-theme", theme);
    if (els.themeIcon) {
        els.themeIcon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
}

// ---------------- COVER ----------------
function coverUrl(book) {
    return `https://covers.openlibrary.org/b/title/${encodeURIComponent(book.coverTitle || book.title)}-L.jpg`;
}

function imgWithFallback(img) {
    img.addEventListener("error", () => {
        if (img.dataset.fallbackApplied) return;
        img.dataset.fallbackApplied = "1";
        img.src = PLACEHOLDER_COVER;
    }, { once: true });
}

// ---------------- CARDS ----------------
function createCard(book) {
    const card = document.createElement("article");
    card.className = "book-card";
    card.dataset.id = book.id;

    const coverWrap = document.createElement("div");
    coverWrap.className = "book-cover-wrap";

    const img = document.createElement("img");
    img.className = "book-cover";
    img.src = coverUrl(book);
    img.alt = `Capa do livro ${book.title}`;
    img.loading = "lazy";
    imgWithFallback(img);
    coverWrap.appendChild(img);

    if (book.badge) {
        const badge = document.createElement("span");
        badge.className = "book-badge" + (book.stock <= 0 ? " soldout" : "");
        badge.textContent = book.stock <= 0 ? "Esgotado" : book.badge;
        coverWrap.appendChild(badge);
    } else if (book.stock <= 0) {
        const badge = document.createElement("span");
        badge.className = "book-badge soldout";
        badge.textContent = "Esgotado";
        coverWrap.appendChild(badge);
    }

    const body = document.createElement("div");
    body.className = "book-body";

    const title = document.createElement("h3");
    title.className = "book-title";
    title.textContent = book.title;

    const author = document.createElement("p");
    author.className = "book-author";
    author.textContent = book.author;

    const meta = document.createElement("div");
    meta.className = "book-meta";
    meta.innerHTML = `<span><i class="fa-solid fa-globe"></i> ${book.origin}</span>
                      <span><i class="fa-solid fa-tag"></i> ${book.category}</span>
                      <span><i class="fa-solid fa-chart-line"></i> ${book.sold} vendidos</span>`;

    const priceRow = document.createElement("div");
    priceRow.className = "book-price-row";
    const price = document.createElement("span");
    price.className = "book-price";
    price.textContent = formatBRL(book.price);
    const stock = document.createElement("span");
    stock.className = "book-stock" + (book.stock > 0 && book.stock <= 5 ? " low" : "");
    stock.textContent = book.stock > 0 ? `Estq.: ${book.stock}` : "Sem estoque";
    priceRow.appendChild(price);
    priceRow.appendChild(stock);

    const actions = document.createElement("div");
    actions.className = "book-actions";
    const btnBuy = document.createElement("button");
    btnBuy.className = "btn btn-dark";
    btnBuy.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Comprar`;
    btnBuy.disabled = book.stock <= 0;
    btnBuy.addEventListener("click", (e) => { e.stopPropagation(); addToCart(book.id); });
    const btnDetail = document.createElement("button");
    btnDetail.className = "btn btn-outline";
    btnDetail.style.background = "transparent";
    btnDetail.style.color = "var(--text)";
    btnDetail.style.border = "1px solid var(--border)";
    btnDetail.innerHTML = `<i class="fa-solid fa-eye"></i>`;
    btnDetail.addEventListener("click", (e) => { e.stopPropagation(); openModal(book.id); });
    actions.appendChild(btnBuy);
    actions.appendChild(btnDetail);

    body.appendChild(title);
    body.appendChild(author);
    body.appendChild(meta);
    body.appendChild(priceRow);
    body.appendChild(actions);

    card.appendChild(coverWrap);
    card.appendChild(body);

    card.addEventListener("click", () => openModal(book.id));
    return card;
}

function renderBooks() {
    els.grid.innerHTML = "";
    const q = (els.search.value || "").trim().toLowerCase();
    const sort = els.sort.value;

    let list = books.filter((b) => {
        if (activeFilter !== "all") {
            if (activeFilter === "nacional") return b.origin === "Nacional";
            if (activeFilter === "internacional") return b.origin === "Internacional";
            return b.category === activeFilter;
        }
        return true;
    }).filter((b) => {
        if (!q) return true;
        return (
            b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q) ||
            b.origin.toLowerCase().includes(q)
        );
    });

    if (sort === "az") list.sort((a, c) => a.title.localeCompare(c.title, "pt-BR"));
    else if (sort === "za") list.sort((a, c) => c.title.localeCompare(a.title, "pt-BR"));
    else if (sort === "price-asc") list.sort((a, c) => a.price - c.price);
    else if (sort === "price-desc") list.sort((a, c) => c.price - a.price);
    else if (sort === "sold-desc") list.sort((a, c) => c.sold - a.sold);

    if (!list.length) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i><br>Nenhum livro encontrado para sua busca.`;
        els.grid.appendChild(empty);
        return;
    }

    list.forEach((b) => els.grid.appendChild(createCard(b)));
}

// ---------------- CAROUSEL ----------------
function renderCarousel() {
    els.carousel.innerHTML = "";
    const featured = books.filter((b) => b.featured);
    featured.forEach((b) => {
        const card = document.createElement("div");
        card.className = "carousel-card";
        card.innerHTML = `
            <div class="book-cover-wrap">
                <img src="${coverUrl(b)}" alt="Capa ${escapeHtml(b.title)}" loading="lazy">
                ${b.badge ? `<span class="book-badge">${escapeHtml(b.badge)}</span>` : ""}
            </div>
            <div class="carousel-body">
                <div class="carousel-title">${escapeHtml(b.title)}</div>
                <div class="carousel-author">${escapeHtml(b.author)}</div>
                <div class="carousel-price">${formatBRL(b.price)}</div>
            </div>
        `;
        const img = card.querySelector("img");
        imgWithFallback(img);
        card.addEventListener("click", () => openModal(b.id));
        els.carousel.appendChild(card);
    });
}

function formatBRL(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (m) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[m]));
}

// ---------------- MODAL ----------------
function openModal(id) {
    const book = books.find((b) => b.id === id);
    if (!book) return;
    currentBook = book;
    els.modalBody.innerHTML = `
        <div class="modal-grid">
            <div class="modal-cover">
                <img src="${coverUrl(book)}" alt="Capa ${escapeHtml(book.title)}">
            </div>
            <div class="modal-info">
                <h2>${escapeHtml(book.title)}</h2>
                <div class="modal-author">${escapeHtml(book.author)} · ${escapeHtml(book.origin)}</div>
                <div class="modal-tags">
                    <span class="tag">${escapeHtml(book.category)}</span>
                    <span class="tag">${escapeHtml(book.origin)}</span>
                    ${book.badge ? `<span class="tag">${escapeHtml(book.badge)}</span>` : ""}
                </div>
                <p class="modal-desc">${escapeHtml(book.desc)}</p>
                <div class="modal-stats">
                    <div class="stat"><strong>${formatBRL(book.price)}</strong><span>Preço</span></div>
                    <div class="stat"><strong>${book.stock}</strong><span>Em estoque</span></div>
                    <div class="stat"><strong>${book.sold}</strong><span>Vendidos</span></div>
                </div>
                <div class="modal-price">${formatBRL(book.price)}</div>
                <div class="modal-actions">
                    <button class="btn btn-dark" id="modal-add" ${book.stock <= 0 ? "disabled" : ""}>
                        <i class="fa-solid fa-cart-plus"></i> Adicionar ao carrinho
                    </button>
                    <button class="btn btn-whatsapp" id="modal-wa">
                        <i class="fa-brands fa-whatsapp"></i> Comprar pelo WhatsApp
                    </button>
                    <button class="btn btn-outline" id="modal-close-2" style="color:var(--text);border:1px solid var(--border);background:transparent;">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    `;
    const img = els.modalBody.querySelector(".modal-cover img");
    imgWithFallback(img);
    els.modalBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";

    document.getElementById("modal-add").addEventListener("click", () => {
        addToCart(book.id);
    });
    document.getElementById("modal-wa").addEventListener("click", () => {
        const msg = `Olá! Tenho interesse no livro "${book.title}" de ${book.author} (${formatBRL(book.price)}).`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    });
    document.getElementById("modal-close-2").addEventListener("click", closeModal);
}

function closeModal() {
    els.modalBackdrop.classList.remove("open");
    document.body.style.overflow = "";
    currentBook = null;
}

// ---------------- CART ----------------
function loadCart() {
    try {
        return JSON.parse(localStorage.getItem("mo-livraria-cart") || "[]");
    } catch (e) {
        return [];
    }
}

function saveCart() {
    localStorage.setItem("mo-livraria-cart", JSON.stringify(cart));
}

function addToCart(id) {
    const book = books.find((b) => b.id === id);
    if (!book || book.stock <= 0) return;
    const existing = cart.find((c) => c.id === id);
    if (existing) {
        if (existing.qty < book.stock) existing.qty++;
        else { showToast("Estoque máximo atingido."); return; }
    } else {
        cart.push({ id, qty: 1 });
    }
    saveCart();
    renderCart();
    updateCartCount();
    openCart();
    showToast(`${book.title} adicionado ao carrinho!`);
}

function removeFromCart(id) {
    cart = cart.filter((c) => c.id !== id);
    saveCart();
    renderCart();
    updateCartCount();
}

function changeQty(id, delta) {
    const item = cart.find((c) => c.id === id);
    if (!item) return;
    const book = books.find((b) => b.id === id);
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(id);
    else if (book && item.qty > book.stock) item.qty = book.stock;
    saveCart();
    renderCart();
    updateCartCount();
}

function renderCart() {
    els.cartItems.innerHTML = "";
    if (!cart.length) {
        els.cartItems.innerHTML = `<div class="cart-empty"><i class="fa-solid fa-bag-shopping" style="font-size:2rem;color:var(--border);display:block;margin-bottom:.5rem"></i>Seu carrinho está vazio.</div>`;
        els.cartTotal.textContent = `Total: R$ 0,00`;
        return;
    }
    let total = 0;
    cart.forEach((item) => {
        const book = books.find((b) => b.id === item.id);
        if (!book) return;
        total += book.price * item.qty;
        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
            <img src="${coverUrl(book)}" alt="${escapeHtml(book.title)}" onerror="this.src='${PLACEHOLDER_COVER}'">
            <div>
                <div class="cart-item-title">${escapeHtml(book.title)}</div>
                <div class="cart-item-author">${escapeHtml(book.author)}</div>
                <div class="cart-item-price">${formatBRL(book.price)}</div>
                <div class="qty">
                    <button data-act="dec" data-id="${book.id}">−</button>
                    <span>${item.qty}</span>
                    <button data-act="inc" data-id="${book.id}">+</button>
                </div>
            </div>
            <button class="icon-btn" data-act="remove" data-id="${book.id}" aria-label="Remover">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        const img = row.querySelector("img");
        imgWithFallback(img);
        els.cartItems.appendChild(row);
    });

    // bind qty buttons (delegation handled in bindEvents)
    els.cartTotal.textContent = `Total: ${formatBRL(total)}`;
}

function updateCartCount() {
    const count = cart.reduce((a, c) => a + c.qty, 0);
    els.cartCount.textContent = count;
}

function openCart() {
    els.cartDrawer.classList.add("open");
}

function closeCart() {
    els.cartDrawer.classList.remove("open");
}

// ---------------- CHECKOUT ----------------
function openCheckout() {
    if (!cart.length) {
        showToast("Seu carrinho está vazio.");
        return;
    }
    const total = cart.reduce((a, item) => {
        const b = books.find((x) => x.id === item.id);
        return a + (b ? b.price * item.qty : 0);
    }, 0);

    els.checkoutSummary.innerHTML = `
        <h3>Resumo do pedido</h3>
        <ul>
            ${cart.map((item) => {
                const b = books.find((x) => x.id === item.id);
                return `<li><span>${escapeHtml(b.title)} × ${item.qty}</span><span>${formatBRL(b.price * item.qty)}</span></li>`;
            }).join("")}
        </ul>
        <div class="total"><span>Total</span><span>${formatBRL(total)}</span></div>
    `;
    els.checkoutBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeCheckout() {
    els.checkoutBackdrop.classList.remove("open");
    if (!els.modalBackdrop.classList.contains("open")) document.body.style.overflow = "";
}

function submitCheckout(e) {
    e.preventDefault();
    const form = els.checkoutForm;
    const name = form.querySelector("#co-name").value.trim();
    const email = form.querySelector("#co-email").value.trim();
    const phone = form.querySelector("#co-phone").value.trim();
    const address = form.querySelector("#co-address").value.trim();
    const payment = form.querySelector("input[name='payment']:checked").value;

    const total = cart.reduce((a, item) => {
        const b = books.find((x) => x.id === item.id);
        return a + (b ? b.price * item.qty : 0);
    }, 0);

    let msg = `*Novo pedido - M.O Livraria*%0A%0A`;
    msg += `*Cliente:* ${name}%0A`;
    msg += `*E-mail:* ${email}%0A`;
    msg += `*Telefone:* ${phone}%0A`;
    msg += `*Endereço:* ${address}%0A`;
    msg += `*Pagamento:* ${payment}%0A%0A`;
    msg += `*Itens:*%0A`;
    cart.forEach((item) => {
        const b = books.find((x) => x.id === item.id);
        msg += `• ${b.title} (${b.author}) - ${item.qty}x ${formatBRL(b.price)} = ${formatBRL(b.price * item.qty)}%0A`;
    });
    msg += `%0A*Total: ${formatBRL(total)}*`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    window.open(url, "_blank");
    showToast("Pedido enviado pelo WhatsApp!");
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
    closeCheckout();
    closeCart();
}

// ---------------- EVENTS ----------------
function bindEvents() {
    // mobile nav
    els.btnMobile.addEventListener("click", () => els.nav.classList.toggle("open"));
    els.nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => els.nav.classList.remove("open")));

    // search/sort
    els.search.addEventListener("input", renderBooks);
    els.sort.addEventListener("change", renderBooks);

    // chips
    els.chips.addEventListener("click", (e) => {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        els.chips.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        activeFilter = chip.dataset.filter;
        renderBooks();
    });

    // theme
    els.themeToggle.addEventListener("click", toggleTheme);

    // cart open/close
    document.getElementById("cart-btn").addEventListener("click", openCart);
    document.getElementById("close-cart").addEventListener("click", closeCart);
    document.getElementById("checkout-btn").addEventListener("click", () => { closeCart(); openCheckout(); });

    // modal close
    document.querySelector(".modal-close").addEventListener("click", closeModal);
    els.modalBackdrop.addEventListener("click", (e) => {
        if (e.target === els.modalBackdrop) closeModal();
    });

    // checkout close/submit
    document.getElementById("close-checkout").addEventListener("click", closeCheckout);
    els.checkoutBackdrop.addEventListener("click", (e) => {
        if (e.target === els.checkoutBackdrop) closeCheckout();
    });
    els.checkoutForm.addEventListener("submit", submitCheckout);

    // cart item delegation
    els.cartItems.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const id = Number(btn.dataset.id);
        const act = btn.dataset.act;
        if (act === "inc") changeQty(id, 1);
        else if (act === "dec") changeQty(id, -1);
        else if (act === "remove") removeFromCart(id);
    });

    // carousel nav
    document.querySelectorAll(".carousel-nav").forEach((btn) => {
        btn.addEventListener("click", () => {
            const dir = btn.classList.contains("next") ? 1 : -1;
            els.carousel.scrollBy({ left: dir * 300, behavior: "smooth" });
        });
    });

    // smooth scroll for nav
    // ESC close
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
            closeCheckout();
            closeCart();
        }
    });
}

// ---------------- TOAST ----------------
function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--primary);color:#fff;padding:.8rem 1.4rem;border-radius:999px;box-shadow:var(--shadow);z-index:3000;opacity:0;transition:opacity .25s;font-weight:600;`;
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { toast.style.opacity = "0"; }, 2600);
}

// ---------------- AOS (simple) ----------------
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (en.isIntersecting) {
                en.target.classList.add("in-view");
                observer.unobserve(en.target);
            }
        });
    }, { threshold: .12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}
