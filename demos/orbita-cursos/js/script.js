/* Catálogo é inteiramente ilustrativo: sem turmas ou matrículas em tempo real. */
const WHATSAPP='5511942038103'; // Declara um dado ou referência utilizada nesta funcionalidade.
const CURSOS=[ // Declara um dado ou referência utilizada nesta funcionalidade.
  {id:'front',nome:'Desenvolvimento Front-End',area:'tecnologia',duracao:'Curso livre',desc:'Fundamentos de HTML, CSS e JavaScript com atividades práticas.'}, // Inicia bloco de dados.
  {id:'dados',nome:'Planilhas e Dados',area:'tecnologia',duracao:'Curso livre',desc:'Organização de informações, planilhas e leitura de indicadores.'}, // Inicia bloco de dados.
  {id:'design',nome:'Design Visual',area:'criatividade',duracao:'Curso livre',desc:'Composição, tipografia e criação de peças digitais.'}, // Inicia bloco de dados.
  {id:'video',nome:'Edição de Vídeo',area:'criatividade',duracao:'Curso livre',desc:'Planejamento, montagem e edição de conteúdo audiovisual.'}, // Inicia bloco de dados.
  {id:'vendas',nome:'Vendas e Atendimento',area:'negocios',duracao:'Curso livre',desc:'Atendimento de qualidade, comunicação e relacionamento.'}, // Inicia bloco de dados.
  {id:'gestao',nome:'Gestão de Projetos',area:'negocios',duracao:'Curso livre',desc:'Organização de tarefas, etapas e acompanhamento de entregas.'} // Inicia bloco de dados.
]; // Executa uma etapa da interação descrita acima.
const STORAGE_KEY='moss_orbita_interesses_v1'; // Declara um dado ou referência utilizada nesta funcionalidade.
const nav=document.querySelector('#nav'),toggle=document.querySelector('#nav-toggle'); // Declara um dado ou referência utilizada nesta funcionalidade.
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'✕':'☰';}); // Registra a reação a uma ação do usuário.
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';})); // Registra a reação a uma ação do usuário.
let favoritos=[]; // Declara um dado ou referência utilizada nesta funcionalidade.
try {const lista=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');if(Array.isArray(lista)) favoritos=lista.filter(id=>CURSOS.some(c=>c.id===id));}catch(erro){favoritos=[];} // Tenta uma operação que pode ser bloqueada pelo navegador.
let filtro='todos',atual=null; // Declara um dado ou referência utilizada nesta funcionalidade.
const container=document.querySelector('#courses'); // Declara um dado ou referência utilizada nesta funcionalidade.
function salvar(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(favoritos));}catch(erro){/* Navegador pode bloquear gravação. */}} // Inicia a função responsável por esta operação.
function atualizarLista(){ // Inicia a função responsável por esta operação.
  document.querySelector('#counter').textContent=String(favoritos.length); // Localiza os elementos necessários na página.
  document.querySelector('#selected-list').textContent=favoritos.length?CURSOS.filter(c=>favoritos.includes(c.id)).map(c=>c.nome).join(' • '):'Nenhum curso selecionado.'; // Localiza os elementos necessários na página.
} // Encerra o bloco ou a função anterior.
/* Criar elementos com textContent evita injeção de HTML pela busca. */
function renderizar(){ // Inicia a função responsável por esta operação.
  const termo=document.querySelector('#search').value.trim().toLocaleLowerCase('pt-BR'); // Declara um dado ou referência utilizada nesta funcionalidade.
  const visiveis=CURSOS.filter(c=>(filtro==='todos'||c.area===filtro)&&c.nome.toLocaleLowerCase('pt-BR').includes(termo)); // Declara um dado ou referência utilizada nesta funcionalidade.
  container.replaceChildren(); // Executa uma etapa da interação descrita acima.
  document.querySelector('#empty').hidden=visiveis.length>0; // Localiza os elementos necessários na página.
  visiveis.forEach(c=>{ // Executa uma etapa da interação descrita acima.
    const card=document.createElement('article');card.className='course'; // Declara um dado ou referência utilizada nesta funcionalidade.
    const tag=document.createElement('span');tag.className='course-tag';tag.textContent=c.area; // Declara um dado ou referência utilizada nesta funcionalidade.
    const titulo=document.createElement('h3');titulo.textContent=c.nome; // Declara um dado ou referência utilizada nesta funcionalidade.
    const p=document.createElement('p');p.textContent=c.desc; // Declara um dado ou referência utilizada nesta funcionalidade.
    const foot=document.createElement('div');foot.className='course-foot'; // Declara um dado ou referência utilizada nesta funcionalidade.
    const duration=document.createElement('small');duration.textContent=c.duracao; // Declara um dado ou referência utilizada nesta funcionalidade.
    const details=document.createElement('button');details.type='button';details.textContent='Detalhes ↗';details.addEventListener('click',()=>abrirDialogo(c)); // Declara um dado ou referência utilizada nesta funcionalidade.
    const fave=document.createElement('button');fave.type='button';fave.textContent=favoritos.includes(c.id)?'✓ Na lista':'+ Interesse'; // Declara um dado ou referência utilizada nesta funcionalidade.
    fave.setAttribute('aria-label',`Alternar interesse no curso ${c.nome}`); // Executa uma etapa da interação descrita acima.
    fave.addEventListener('click',()=>{alternar(c.id);renderizar();}); // Registra a reação a uma ação do usuário.
    foot.append(duration,details,fave);card.append(tag,titulo,p,foot);container.append(card); // Executa uma etapa da interação descrita acima.
  }); // Encerra o bloco ou a função anterior.
  atualizarLista(); // Executa uma etapa da interação descrita acima.
} // Encerra o bloco ou a função anterior.
function alternar(id){favoritos=favoritos.includes(id)?favoritos.filter(i=>i!==id):[...favoritos,id];salvar();atualizarLista();} // Inicia a função responsável por esta operação.
const modal=document.querySelector('#details'); // Declara um dado ou referência utilizada nesta funcionalidade.
function abrirDialogo(c){atual=c;document.querySelector('#details-area').textContent=c.area;document.querySelector('#details-title').textContent=c.nome;document.querySelector('#details-desc').textContent=c.desc;document.querySelector('#details-info').textContent='Carga horária, calendário, certificação e valor devem ser confirmados pela instituição.';modal.showModal();} // Inicia a função responsável por esta operação.
document.querySelector('#close-dialog').addEventListener('click',()=>modal.close()); // Registra a reação a uma ação do usuário.
modal.addEventListener('click',evento=>{if(evento.target===modal)modal.close();}); // Registra a reação a uma ação do usuário.
document.querySelector('#add-current').addEventListener('click',()=>{if(atual && !favoritos.includes(atual.id))alternar(atual.id);modal.close();renderizar();}); // Registra a reação a uma ação do usuário.
document.querySelector('#search').addEventListener('input',renderizar); // Registra a reação a uma ação do usuário.
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filtro=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));renderizar();})); // Registra a reação a uma ação do usuário.
document.querySelectorAll('[data-area]').forEach(b=>b.addEventListener('click',()=>{filtro=b.dataset.area;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x.dataset.filter===filtro));renderizar();document.querySelector('#catalogo').scrollIntoView({behavior:'smooth'});})); // Registra a reação a uma ação do usuário.
document.querySelector('#send-courses').addEventListener('click',()=>{ // Registra a reação a uma ação do usuário.
  const nomes=CURSOS.filter(c=>favoritos.includes(c.id)).map(c=>c.nome); // Declara um dado ou referência utilizada nesta funcionalidade.
  if(!nomes.length){alert('Selecione pelo menos um curso antes de pedir informações.');return;} // Verifica uma condição antes de prosseguir.
  const texto=`Olá! Quero informações sobre os cursos da Órbita Cursos: ${nomes.join(', ')}. Gostaria de saber sobre turmas e valores.`; // Declara um dado ou referência utilizada nesta funcionalidade.
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`,'_blank','noopener,noreferrer'); // Abre a conversa do WhatsApp com mensagem codificada.
}); // Encerra o bloco ou a função anterior.
renderizar(); // Executa uma etapa da interação descrita acima.
