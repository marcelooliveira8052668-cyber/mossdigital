/* Carrossel aprovado: deslizamento contínuo, pausa e busca por todas as demos. */
(()=>{
  'use strict';
  const root=document.querySelector('#modelos'),rail=document.querySelector('#cards');
  if(!root||!rail)return;
  const cards=[...rail.querySelectorAll(':scope > article')],input=document.querySelector('#busca-modelo'),category=document.querySelector('#categoria-modelo'),clear=document.querySelector('[data-clear]'),reset=document.querySelector('[data-reset]'),empty=document.querySelector('[data-empty]'),count=document.querySelector('#count'),prev=document.querySelector('[data-prev]'),next=document.querySelector('[data-next]'),position=document.querySelector('#slide-position');
  const norm=t=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),texts=new Map(cards.map(c=>[c,norm(c.textContent)]));
  const motion=matchMedia('(prefers-reduced-motion:reduce)'),reduced=()=>motion.matches;
  const play=document.createElement('button');play.type='button';play.className='carousel-play';play.setAttribute('aria-controls','cards');
  document.querySelector('.carousel-arrows').prepend(play);
  let matches=cards,timer,animationFrame,playing=!reduced(),inView=false,userAllowedMotion=false;
  function schedule(){
    cancelAnimationFrame(animationFrame);
    const running=playing&&(!reduced()||userAllowedMotion)&&inView&&!document.hidden&&!rail.hidden&&rail.scrollWidth>rail.clientWidth+3;
    root.dataset.carouselRunning=String(running);
    document.querySelector('.desktop-carousel-hint').textContent=running?'Deslizamento contínuo':'Use as setas ou inicie o movimento';
    if(!running)return;
    let previous=0,left=rail.scrollLeft,lastUpdate=0;
    const speed=matchMedia('(max-width:650px)').matches?56:48;
    const limit=rail.scrollWidth-rail.clientWidth;
    const animate=now=>{
      if(!previous)previous=now;
      const elapsed=Math.min(now-previous,50);previous=now;
      left+=speed*elapsed/1000;
      if(left>limit)left=0;
      rail.scrollLeft=left;
      if(now-lastUpdate>400){update();lastUpdate=now;}
      animationFrame=requestAnimationFrame(animate);
    };
    animationFrame=requestAnimationFrame(animate);
  }
  function setPlaying(value,manual=false){
    if(manual)userAllowedMotion=true;
    playing=value&&(!reduced()||userAllowedMotion);
    play.textContent=playing?'Ⅱ Pausar':'▶ Iniciar';
    play.setAttribute('aria-label',playing?'Pausar avanço automático':'Iniciar avanço automático');
    play.disabled=false;root.dataset.carouselMotion=playing?'playing':'paused';
    position.setAttribute('aria-live',playing?'off':'polite');schedule();
  }
  function update(){
    const width=matches[0]?.getBoundingClientRect().width||1;
    const step=width+parseFloat(getComputedStyle(rail).gap||0);
    const first=matches.length?Math.min(matches.length,Math.floor(rail.scrollLeft/step)+1):0;
    const last=matches.length?Math.min(matches.length,Math.ceil((rail.scrollLeft+rail.clientWidth)/step)):0;
    position.textContent=matches.length?`${first}–${last} de ${matches.length}`:'0 demos';
    prev.disabled=rail.scrollLeft<=2;next.disabled=rail.scrollLeft>=rail.scrollWidth-rail.clientWidth-3||matches.length===0;
  }
  function apply(){
    const query=norm(input.value.trim());
    matches=cards.filter(c=>(category.value==='Todos'||c.dataset.category===category.value)&&texts.get(c).includes(query));
    const set=new Set(matches);cards.forEach(c=>c.hidden=!set.has(c));
    count.textContent=matches.length+(matches.length===1?' demo encontrada':' demos disponíveis');
    clear.hidden=!input.value;empty.hidden=matches.length!==0;rail.hidden=matches.length===0;
    rail.scrollTo({left:0,behavior:'instant'});update();schedule();
  }
  function move(direction){rail.scrollBy({left:direction*(rail.clientWidth+22),behavior:reduced()?'instant':'smooth'})}
  play.addEventListener('click',()=>setPlaying(!playing,true));
  prev.addEventListener('click',()=>{setPlaying(false);move(-1)});next.addEventListener('click',()=>{setPlaying(false);move(1)});
  rail.addEventListener('focusin',()=>setPlaying(false));
  rail.addEventListener('pointerdown',()=>setPlaying(false),{passive:true});
  rail.addEventListener('scroll',()=>{clearTimeout(timer);timer=setTimeout(update,130)},{passive:true});
  rail.addEventListener('keydown',event=>{
    if(event.target!==rail)return;
    setPlaying(false);
    if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key))event.preventDefault();
    if(event.key==='ArrowLeft')move(-1);if(event.key==='ArrowRight')move(1);
    if(event.key==='Home')rail.scrollTo({left:0,behavior:reduced()?'instant':'smooth'});
    if(event.key==='End')rail.scrollTo({left:rail.scrollWidth,behavior:reduced()?'instant':'smooth'});
  });
  const filter=()=>{setPlaying(false);apply()};
  input.addEventListener('focus',()=>setPlaying(false));category.addEventListener('focus',()=>setPlaying(false));
  input.addEventListener('input',filter);input.addEventListener('search',filter);category.addEventListener('change',filter);
  input.addEventListener('keydown',event=>{if(event.key==='Escape'){input.value='';filter()}});
  clear.addEventListener('click',()=>{input.value='';filter();input.focus()});
  reset.addEventListener('click',()=>{input.value='';category.value='Todos';filter();input.focus()});
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedule()},{threshold:.02}).observe(rail);
  document.addEventListener('visibilitychange',schedule);motion.addEventListener('change',()=>{userAllowedMotion=false;setPlaying(false)});
  window.addEventListener('resize',()=>{update();schedule()});root.classList.add('carousel-enabled');apply();setPlaying(playing);
})();
