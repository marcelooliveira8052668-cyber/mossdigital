/* Eu conecto somente navegação, filtros do cardápio e contato de demonstração. */
(function(){
  const menu=document.getElementById('public-nav'),toggle=document.getElementById('public-toggle');
  toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}});
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const value=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;document.querySelectorAll('[data-category]').forEach(item=>{item.hidden=value!=='Todos'&&value!==item.dataset.category;if(!item.hidden)count++;});document.getElementById('menu-count').textContent=count+' opções de demonstração';}));
  document.getElementById('year').textContent=new Date().getFullYear();
})();
