/* ============================================================
   lab-content.js — conteúdo do Laboratório Visual do Código
   ------------------------------------------------------------
   Cada módulo contém:
     - flow: nós do diagrama de caminho dos dados
     - lines: linhas de código com tradução, símbolos, significado,
              arquivo, localização e resultado visual
     - simplified: true quando o código foi reduzido para fins didáticos
   O código exibido aqui é "recortado" do projeto real para caber na tela.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;

  // Nós padrão reaproveitáveis no diagrama.
  const N = {
    cliente: { label:'Cliente', icon:'👤' },
   html: { label:'HTML', icon:'🧱' },
    css: { label:'CSS', icon:'🎨' },
    browser: { label:'Navegador', icon:'🌐' },
    js: { label:'JavaScript', icon:'⚙️' },
    fn: { label:'Função', icon:'🔧' },
    cart: { label:'Carrinho', icon:'🛒' },
    api: { label:'API', icon:'🔌' },
    db: { label:'Banco', icon:'🗄️' },
    dom: { label:'Tela', icon:'✨' }
  };

  const MODULES = [
    {
      id:'html', title:'1 · Como o HTML constrói a página', icon:'🧱', simplified:false,
      source:'index.html + js/components/layout.js',
      intro:'O HTML é o esqueleto. Cada tag semântica diz ao navegador o que aquela parte representa.',
      flow:[N.cliente, N.html, N.browser, N.dom],
      lines:[
        { code:'<header id="header-root"></header>', en:'header = cabeçalho', symbols:'< > = abertura e fechamento da tag', meaning:'Cria a área do cabeçalho. O JS preenche esse container depois.', file:'index.html', loc:'linha ~28', result:'Cabeçalho reservado na página' },
        { code:'<main id="app" tabindex="-1"></main>', en:'main = conteúdo principal; tabindex = foco via teclado', symbols:'id = identificador único; " " = aspas do atributo', meaning:'Marca o conteúdo principal. Aqui as páginas são renderizadas.', file:'index.html', loc:'linha ~31', result:'Área central pronta para receber páginas' },
        { code:'<script src="js/app.js"></script>', en:'script = script; src = source (origem)', symbols:'src= aponta para o arquivo.carregado', meaning:'Carrega o JavaScript que forma toda a aplicação.', file:'index.html', loc:'linha ~70', result:'Aplicação ganha vida' }
      ]
    },
    {
      id:'css', title:'2 · Como o CSS transforma a aparência', icon:'🎨', simplified:false,
      source:'css/base.css + css/components.css',
      intro:'Variáveis (--cor) centralizam o tema. Uma mudança aqui repete em toda a loja.',
      flow:[N.html, N.css, N.browser, N.dom],
      lines:[
        { code:':root { --accent-500: #f5a623; }', en:'root = raiz; accent = destaque', symbols:': = pseudo-seletor; -- = variável CSS; ; = fim da declaração', meaning:'Define a cor âmbar usada nos botões de ação.', file:'css/base.css', loc:'linha ~18', result:'Botões ficam amarelos' },
        { code:'.btn--primary { background: var(--accent-500); }', en:'button primary = botão principal; background = fundo', symbols:'. = classe; var() = lê uma variável', meaning:'O botão principal usa a cor da variável, não um valor fixo.', file:'css/components.css', loc:'linha ~20', result:'Botão "Adicionar" ganha destaque' },
        { code:'[data-theme="dark"] { --bg: #0b1322; }', en:'theme dark = tema escuro', symbols:'[ ] = seletor de atributo; " " = valor igual', meaning:'Quando o tema é escuro, a variável de fundo muda.', file:'css/base.css', loc:'linha ~48', result:'Fundo escuro aplicado ao alternar tema' }
      ]
    },
    {
      id:'click', title:'3 · Como o JS reage a um clique', icon:'🖱️', simplified:true,
      source:'js/pages/store.js (recortado)',
      intro:'Um event listener "escuta" o clique e chama uma função. O fluxo: clique → evento → função → efeito.',
      flow:[N.cliente, N.html, N.js, N.fn, N.dom],
      lines:[
        { code:"btn.addEventListener('click', handler);", en:'addEventListener = adicionar ouvinte de evento; handler = manipulador', symbols:"' ' = texto; ( ) = chamar; , = separar argumentos", meaning:'Registra uma função para rodar sempre que o botão for clicado.', file:'js/pages/store.js', loc:'padrão usado nas páginas', result:'Botão passa a responder ao clique' },
        { code:'function handler(event) {', en:'handler = quem manipula; event = evento', symbols:'{ } = bloco da função', meaning:'Cria a função que recebe o evento do clique.', file:'js/pages/store.js', loc:'padrão usado nas páginas', result:'Função pronta para executar' },
        { code:"event.preventDefault();", en:'preventDefault = evitar o padrão', symbols:'( ) = executar; ; = encerrar instrução', meaning:'Impede que o navegador recarregue a página.', file:'js/pages/store.js', loc:'padrão usado nas páginas', result:'Página não recarrega' },
        { code:"notify.toast('Adicionado!', 'ok');", en:'toast = aviso curto; ok = sucesso', symbols:'. = acessar propriedade; , = separar', meaning:'Mostra o feedback visual ao usuário.', file:'js/core/notify.js', loc:'toast()', result:'Aviso "Adicionado!" aparece' }
      ]
    },
    {
      id:'search', title:'4 · Como funciona uma pesquisa', icon:'🔍', simplified:true,
      source:'js/core/utils.js + js/pages/store.js',
      intro:'A pesquisa compara textos normalizados: sem acento e em minúsculas. "move" encontra "Móvel".',
      flow:[N.cliente, N.js, N.fn, N.api, N.dom],
      live:'search',
      lines:[
        { code:"const termo = normalize(input.value);", en:'const = constante; value = valor digitado', symbols:'= = atribuir; . = acessar; ( ) = executar', meaning:'Pega o texto digitado e o normaliza.', file:'js/core/utils.js', loc:'normalize()', result:'"FONE" vira "fone"' },
        { code:"return str.normalize('NFD')", en:'return = devolver; NFD = forma de decomposição', symbols:'return encerra a função devolvendo um valor', meaning:'Decompõe "ç" em "c" + acento.', file:'js/core/utils.js', loc:'normalize()', result:'Acentos separados das letras' },
        { code:".replace(/[\\u0300-\\u036f]/g, '')", en:'replace = substituir; g = global (todos)', symbols:'/ / = regex; [ ] = faixa; \\u = código Unicode', meaning:'Remove os acentos já separados.', file:'js/core/utils.js', loc:'normalize()', result:'"fone" — sem acento' },
        { code:".toLowerCase().trim()", en:'toLowerCase = minúsculas; trim = aparar espaços', symbols:'. = encadeamento de métodos', meaning:'Padroniza caixa e remove espaços nas bordas.', file:'js/core/utils.js', loc:'normalize()', result:'Termo pronto para comparar' },
        { code:"itens.filter(p => normalize(p.name).includes(termo))", en:'filter = filtrar; includes = conter', symbols:'=> = arrow function; ( ) = parâmetro', meaning:'Mantém só os produtos cujo nome contém o termo.', file:'js/pages/store.js', loc:'render()', result:'Grade atualizada com os resultados' }
      ]
    },
    {
      id:'cart', title:'5 · Como funciona um carrinho', icon:'🛒', simplified:false,
      source:'js/core/store.js + js/services/cart.service.js',
      intro:'O carrinho é um array de {id, qty}. Cada mudança atualiza o estado e salva no navegador.',
      flow:[N.cliente, N.js, N.fn, N.cart, N.dom],
      live:'addToCart',
      lines:[
        { code:"addToCart(id, qty) {", en:'add to cart = adicionar ao carrinho; qty = quantity (quantidade)', symbols:'{ } = corpo da função; , = argumentos', meaning:'Função que entra com produto e quantidade.', file:'js/core/store.js', loc:'addToCart()', result:'Função disponível' },
        { code:'const idx = cart.findIndex(i => i.id === id);', en:'findIndex = encontrar índice; idx = index', symbols:'=> = seta; === = igualdade estrita', meaning:'Descobre se o produto já está no carrinho.', file:'js/core/store.js', loc:'addToCart()', result:'Posição encontrada (ou -1)' },
        { code:'if (idx >= 0) cart[idx].qty += qty;', en:'if = se; qty += = somar quantidade', symbols:'>= = maior ou igual; += = somar e atribuir', meaning:'Se já existe, soma à quantidade existente.', file:'js/core/store.js', loc:'addToCart()', result:'Quantidade somada' },
        { code:'else cart.push({ id, qty });', en:'else = senão; push = empurrar/inserir', symbols:'{ } = objeto literal; ; = fim', meaning:'Se não existe, insere um novo item.', file:'js/core/store.js', loc:'addToCart()', result:'Novo item no carrinho' },
        { code:"lsSet(KEYS.cart, cart);", en:'ls = local storage; set = gravar', symbols:'( ) = executar; , = separar', meaning:'Persiste o carrinho no navegador.', file:'js/core/store.js', loc:'set()', result:'Carrinho sobrevive ao recarregar' }
      ]
    },
    {
      id:'price', title:'6 · Como calcular preços e descontos', icon:'🧮', simplified:true,
      source:'js/services/cart.service.js',
      intro:'Subtotal é a soma de preço × quantidade. O desconto incide sobre o subtotal; o frete entra depois.',
      flow:[N.cart, N.js, N.fn, N.dom],
      lines:[
        { code:'subtotal += p.price * item.qty;', en:'subtotal = soma; price = preço; qty = quantidade', symbols:'+= = acumular; * = multiplicar', meaning:'Soma o valor de cada linha do carrinho.', file:'js/services/cart.service.js', loc:'getTotals()', result:'Subtotal calculado' },
        { code:'desconto = subtotal * (cupom.percent / 100);', en:'discount = desconto; percent = porcentagem', symbols:'/ = dividir; 100 = base percentual', meaning:'Converte 10% em 0,10 e calcula o desconto.', file:'js/services/cart.service.js', loc:'getTotals()', result:'Valor do desconto' },
        { code:'total = subtotal - desconto + frete;', en:'total = total; frete = frete (shipping)', symbols:'- = subtrair; + = somar', meaning:'Aplica o desconto e acrescenta o frete.', file:'js/services/cart.service.js', loc:'getTotals()', result:'Total final exibido' },
        { code:'round2(total)', en:'round = arredondar; 2 = duas casas', symbols:'( ) = executar com argumento', meaning:'Evita erros de ponto flutuante (0.30000000004).', file:'js/core/utils.js', loc:'round2()', result:'Valor limpo, com 2 casas' }
      ]
    },
    {
      id:'form', title:'7 · Como um formulário é validado', icon:'📝', simplified:true,
      source:'js/pages/checkout.js (recortado)',
      intro:'A validação checa campos antes de avançar. Se algo estiver errado, mostra erro ao lado do campo.',
      flow:[N.cliente, N.html, N.js, N.fn, N.dom],
      live:'form',
      lines:[
        { code:"if (!isEmail(email)) {", en:'if not = se não; email = e-mail', symbols:'! = negação; ( ) = agrupar; { = início do bloco', meaning:'Verifica se o e-mail é válido.', file:'js/core/utils.js', loc:'isEmail()', result:'Decisão tomada' },
        { code:"erro.textContent = 'Informe um e-mail válido';", en:'error = erro; textContent = conteúdo de texto', symbols:'= = atribuir; . = acessar', meaning:'Escreve a mensagem de erro no campo.', file:'js/pages/checkout.js', loc:'validate()', result:'Mensagem aparece em vermelho' },
        { code:"input.setAttribute('aria-invalid', 'true');", en:'aria invalid = inválido para leitores de tela', symbols:'setAttribute = definir atributo', meaning:'Sinaliza o erro também para tecnologias assistivas.', file:'js/pages/checkout.js', loc:'validate()', result:'Acessibilidade mantida' },
        { code:'return false;', en:'return false = devolver falso', symbols:'return encerra a função', meaning:'Impede o avanço para a próxima etapa.', file:'js/pages/checkout.js', loc:'validate()', result:'Checkout permanece na etapa' }
      ]
    },
    {
      id:'storage', title:'8 · Como os dados são armazenados', icon:'💾', simplified:false,
      source:'js/core/store.js',
      intro:'localStorage guarda texto no navegador. O store converte objetos em JSON ao salvar e lê ao abrir.',
      flow:[N.js, N.fn, N.db, N.dom],
      lines:[
        { code:"lsSet(key, JSON.stringify(value))", en:'stringify = transformar em string; JSON = formato de dados', symbols:'( ) = executar; , = separar', meaning:'Converte o objeto em texto antes de gravar.', file:'js/core/utils.js', loc:'lsSet()', result:'Objeto vira texto JSON' },
        { code:"localStorage.setItem(key, texto)", en:'set item = definir item', symbols:'. = método; ( ) = argumentos', meaning:'Grava a chave e o valor no navegador.', file:'js/core/utils.js', loc:'lsSet()', result:'Dado salvo localmente' },
        { code:"JSON.parse(localStorage.getItem(key))", en:'parse = interpretar; get item = buscar item', symbols:'JSON.parse converte texto em objeto', meaning:'Recupera e reconverte o dado ao recarregar.', file:'js/core/utils.js', loc:'lsGet()', result:'Carrinho restaurado' },
        { code:'try { ... } catch (e) { return fallback; }', en:'try = tentar; catch = capturar; fallback = valor de reserva', symbols:'{ } = bloco; catch pega erros', meaning:'Se o storage estiver bloqueado, a demo continua funcionando.', file:'js/core/utils.js', loc:'lsGet()', result:'Nenhuma quebra no modo privado' }
      ]
    },
    {
      id:'api', title:'9 · Como uma API responde', icon:'🔌', simplified:true,
      source:'js/services/api.service.js',
      intro:'Uma API simulada devolve respostas realistas com delay. Em produção, seria fetch() para um servidor.',
      flow:[N.js, N.api, N.db, N.api, N.dom],
      lines:[
        { code:'async function get(path) {', en:'async = assíncrono; get = buscar', symbols:'{ } = corpo; ( ) = parâmetro', meaning:'Declara uma função que pode esperar.', file:'js/services/api.service.js', loc:'get()', result:'Função assíncrona pronta' },
        { code:'await delay(280);', en:'await = aguardar; delay = atraso', symbols:'await só vale dentro de async', meaning:'Simula o tempo de rede (280 ms).', file:'js/services/api.service.js', loc:'get()', result:'Estado "carregando" visível' },
        { code:'return { ok: true, data: produtos };', en:'ok = sucesso; data = dados', symbols:'{ } = objeto; : = separar chave e valor', meaning:'Devolve um envelope de resposta previsível.', file:'js/services/api.service.js', loc:'get()', result:'JSON com produtos' },
        { code:'const res = await api.get("/products")', en:'res = response (resposta)', symbols:'const = constante; await espera a Promise', meaning:'O código espera a resposta antes de continuar.', file:'js/services/api.service.js', loc:'uso', result:'Dados disponíveis na tela' }
      ]
    },
    {
      id:'supabase', title:'10 · Como o Supabase recebe dados', icon:'🗄️', simplified:true,
      source:'js/services/supabase.service.js + supabase/schema.sql',
      intro:'No modo conectado, o navegador usaria a chave pública (anon). NUNCA uma service_role key.',
      flow:[N.js, N.api, N.db, N.api, N.dom],
      lines:[
        { code:'createClient(URL, ANON_KEY)', en:'create client = criar cliente; anon = anônimo (público)', symbols:'( ) = argumentos; , = separar', meaning:'Inicia a conexão com a chave pública, segura para o navegador.', file:'js/services/supabase.service.js', loc:'init()', result:'Cliente configurado' },
        { code:'from("orders").insert({ ... })', en:'from = de; insert = inserir', symbols:'" " = nome da tabela; { } = registro', meaning:'Envia um pedido para a tabela orders.', file:'js/services/supabase.service.js', loc:'insertOrder()', result:'Pedido no banco (simulado)' },
        { code:'CREATE POLICY "dono" ON orders ...', en:'policy = política; ON = sobre a tabela', symbols:'SQL usa ; no fim', meaning:'RLS permite que cada cliente veja só seus pedidos.', file:'supabase/schema.sql', loc:'RLS', result:'Acesso restrito por linha' },
        { code:'// service_role NUNCA no front-end', en:'service role = função de serviço (privilegiada)', symbols:'// = comentário', meaning:'Chaves secretas ficam só no backend seguro.', file:'supabase/README.md', loc:'Segurança', result:'Credenciais protegidas' }
      ]
    },
    {
      id:'payment', title:'11 · Como funciona um pagamento fictício', icon:'💳', simplified:true,
      source:'js/services/payment.service.js',
      intro:'O simulador devolve aprovado, recusado ou pendente. Nenhuma cobrança real é criada.',
      flow:[N.cliente, N.js, N.fn, N.api, N.dom],
      live:'payment',
      lines:[
        { code:'async pay(method, amount) {', en:'pay = pagar; amount = valor', symbols:'{ } = corpo; async = assíncrono', meaning:'Recebe o método (pix/card) e o valor.', file:'js/services/payment.service.js', loc:'pay()', result:'Pagamento iniciado' },
        { code:'const id = uid("PIX");', en:'uid = unique id (identificador único)', symbols:'( ) = executar; " " = prefixo', meaning:'Gera um identificador fictício de comprovante.', file:'js/core/utils.js', loc:'uid()', result:'ID PIX-XXXXXX no comprovante' },
        { code:"if (result === 'recusado') throw ...", en:'throw = lançar erro', symbols:'=== = igualdade estrita; ... = continua', meaning:'Resultado recusado gera erro tratado pela interface.', file:'js/services/payment.service.js', loc:'pay()', result:'Mensagem "Pagamento recusado"' },
        { code:'order.payment = "pago";', en:'payment = pagamento; pago = pago', symbols:'= = atribuir; . = acessar', meaning:'Atualiza o status do pedido após aprovação.', file:'js/services/order.service.js', loc:'markPaid()', result:'Pedido marcado como pago' }
      ]
    },
    {
      id:'delivery', title:'12 · Como um pedido chega à entrega', icon:'🚚', simplified:true,
      source:'js/services/logistics.service.js',
      intro:'O pedido percorre estados. Cada avanço gera um evento — igual a um rastreio real (mas fictício).',
      flow:[N.cart, N.api, N.db, N.fn, N.dom],
      live:'delivery',
      lines:[
        { code:"const ESTADOS = ['recebido','pago','preparando',...]", en:'estados = states; preparando = preparing', symbols:'[ ] = array; ... = mais itens', meaning:'Define a sequência visual da linha do tempo.', file:'js/services/logistics.service.js', loc:'ESTADOS', result:'6 etapas na timeline' },
        { code:'advance(order)', en:'advance = avançar', symbols:'( ) = executar com pedido', meaning:'Move o pedido para o próximo estado.', file:'js/services/logistics.service.js', loc:'advance()', result:'Próxima etapa marcada' },
        { code:"order.tracking = uid('MOSS');", en:'tracking = rastreio', symbols:'uid gera código único', meaning:'Cria um código de rastreio fictício.', file:'js/services/logistics.service.js', loc:'createTracking()', result:'Código MOSS-XXXXXX exibido' },
        { code:'eventos.push({ status, at: Date.now() })', en:'push = inserir; at = em (timestamp)', symbols:'{ } = objeto; Date.now() = hora atual', meaning:'Registra cada mudança no histórico.', file:'js/services/logistics.service.js', loc:'advance()', result:'Histórico atualizado' }
      ]
    }
  ];

  const DIAGRAM = [
    { label:'Cliente', icon:'👤', text:'A pessoa clica, digita ou escolhe uma opção na interface.' },
    { label:'Navegador', icon:'🌐', text:'O HTML/CSS mostram a tela e capturam a ação do usuário.' },
    { label:'JavaScript', icon:'⚙️', text:'O evento dispara uma função que executa a lógica.' },
    { label:'API', icon:'🔌', text:'Uma camada de serviço simula uma chamada com delay e JSON.' },
    { label:'Banco de dados', icon:'🗄️', text:'localStorage (demo) ou Supabase (modo conectado) guarda os dados.' },
    { label:'Resposta', icon:'↩️', text:'O dado volta para a aplicação já no formato esperado.' },
    { label:'Atualização', icon:'✨', text:'O DOM é atualizado e o usuário vê o resultado na tela.' }
  ];

  MOSS.labContent = { modules: MODULES, diagram: DIAGRAM, nodes: N };
})(window);
