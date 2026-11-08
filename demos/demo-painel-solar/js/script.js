/*
 * ============================================================
 * Painel Solar - JavaScript Funcional
 * ============================================================
 * Scripts para interatividade do site Painel Solar.
 * Funcionalidades: simulador de economia, renderização de galeria,
 * rolagem suave, validação de formulário.
 * ============================================================
 */

/*
 * Dados dos projetos para a galeria
 * Define os projetos demonstrativos com título, descrição e imagem.
 * Estes dados são utilizados para renderizar a galeria de instalações.
 * Cada projeto tem uma categoria para filtros futuros.
 */
const projetos = [
    {
        id: 1,
        titulo: "Residência Moderno",
        descricao: "Sistema fotovoltaico de 6kW em casa residencial, reduzindo em 90% o consumo de energia elétrica.",
        imagem: "assets/img/casa-com-painel.webp"
    },
    {
        id: 2,
        titulo: "Galpão Industrial",
        descricao: "Usina solar de 50kW em galpão industrial, retorno de investimento em 4 anos.",
        imagem: "assets/img/galpao-industrial2.webp"
    },
    {
        id: 3,
        titulo: "Comércio",
        descricao: "Sistema de 15kW para comércio com alto consumo diurno, economia de R$ 800/mês.",
        imagem: "assets/img/loja-com-painel.webp"
    },
    {
        id: 4,
        titulo: "Condomínio",
        descricao: "Sistema compartilhado para condomínio de 8 unidades, economia coletiva de 70%.",
        imagem: "assets/img/condominio-painel.webp"
    }
];

/*
 * Renderizar cards da galeria
 * @param {string} filtro - Categoria para filtrar ('todos' para todos)
 * Funcionamento: limpa o container e insere os cards dos projetos
 * filtrados ou todos, dependendo do parâmetro.
 */
function renderizarGaleria(filtro = 'todos') {
    const grid = document.getElementById('galeria-grid');
    if (!grid) return; // Segurança: garante que o elemento existe

    grid.innerHTML = ''; // Limpa conteúdo anterior

    // Filtra os projetos: se filtro for 'todos', usa todos; senão, filtra pela categoria
    const projetosFiltrados = filtro === 'todos'
        ? projetos
        : projetos.filter(p => p.categoria === filtro);

    // Itera sobre cada projeto filtrado e cria um card
    projetosFiltrados.forEach(projeto => {
        const card = document.createElement('div');
        card.className = 'projeto-card';
        card.innerHTML = `
            <img src="${projeto.imagem}" alt="${projeto.titulo}">
            <div class="info">
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

/*
 * Inicialização após o carregamento da página
 * Configura os eventos para funcionalidades do site
 */
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza a galeria inicial (todos os projetos)
    renderizarGaleria('todos');

    // ---- Simulador de economia ----
    const form = document.getElementById('calc-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obter valores dos campos do formulário
            const contaLuz = parseFloat(document.getElementById('conta-luz').value);
            const consumoKwh = parseFloat(document.getElementById('consumo-kwh').value);
            // Premissas demonstrativas claramente documentadas no código:
            // - Estes são cálculos ilustrativos baseados em média de mercado
            // - Não garantimos resultados específicos
            // - Tarifas, consumo real, características técnicas e condições
            //   de instalação podem alterar os valores finais
            const economiaEstimada = Math.round(contaLuz * 0.70); // 70% de economia estimada
            const economiaAnual = economiaEstimada * 12;

            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.classList.add('ativo');
            document.getElementById('valor-economia').textContent = 'R$ ' + economiaEstimada.toFixed(2);
            document.getElementById('periodo').textContent = '/ mês';
        });
    }

    // ---- Rolagem suave ----
    document.querySelectorAll('a[href^="#"]').forEach(ancora => {
        ancora.addEventListener('click', function(e) {
            e.preventDefault();
            const alvo = document.querySelector(this.getAttribute('href'));
            if (alvo) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const alvoPosicao = alvo.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: alvoPosicao,
                    behavior: 'smooth'
                });
            }
        });
    });
});