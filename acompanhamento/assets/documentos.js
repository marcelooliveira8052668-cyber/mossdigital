/* Geração privada pelo administrador a partir de dados, nunca de HTML enviado pelo cliente. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();else root.MossDocuments=factory();
}(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function rich(value){return esc(value).replace(/\*\*([^*\n]+)\*\*/g,'<strong>$1</strong>');}
  function picture(photo,avatar){
    if(!photo||typeof photo.uri!=='string'||!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(photo.uri))return '';
    return '<img'+(avatar?' class="avatar"':'')+' src="'+photo.uri+'" alt="'+esc(photo.legenda||'Foto fornecida pelo cliente')+'">';
  }
  function renderSite(c,photos,p,colors,css){
    var nome=String(c.nome||'').trim(),titulo=String(c.titulo||'').trim(),intro=String(c.apresentacao||'').trim();
    var itens=String(c.itens||'').split(/\r?\n/).map(function(item){return item.trim();}).filter(Boolean);
    var sobre=String(c.sobre||'').trim(),contato=String(c.contato||'').trim();
    var acao=String(c.acao||'').trim()||'Fale com a gente',rodape=String(c.rodape||'').trim();
    var gallery=photos.map(function(photo){var img=picture(photo,false);return img?'<figure>'+img+'<figcaption>'+esc(photo.legenda||'')+'</figcaption></figure>':'';}).join('');
    var nav=['<a href="#inicio">Início</a>'];
    if(itens.length)nav.push('<a href="#servicos">Serviços</a>');
    if(sobre)nav.push('<a href="#sobre">Sobre</a>');
    if(gallery)nav.push('<a href="#galeria">Galeria</a>');
    if(contato)nav.push('<a href="#contato">Contato</a>');
    var heroImage=photos.length&&picture(photos[0],false)?picture(photos[0],false):'<span class="site-visual-mark" aria-hidden="true">'+esc(nome||'Sua marca')+'</span>';
    var sections='<header class="site-header"><div class="site-shell"><a class="site-brand" href="#inicio">'+esc(nome||'Seu negócio')+'</a><nav aria-label="Navegação principal">'+nav.join('')+'</nav></div></header>'+
      '<section class="site-hero" id="inicio"><div class="site-shell site-hero-grid"><div><span class="site-kicker">Bem-vindo</span><h1>'+esc(titulo)+'</h1><p class="text">'+esc(intro)+'</p>'+
      (contato?'<a class="site-action" href="#contato">'+esc(acao)+'</a>':'')+'</div><div class="site-hero-art">'+heroImage+'</div></div></section>';
    if(itens.length)sections+='<section class="site-section site-shell" id="servicos"><h2>Serviços ou produtos</h2><div class="site-cards">'+itens.map(function(item){return '<article>'+esc(item)+'</article>';}).join('')+'</div></section>';
    if(sobre)sections+='<section class="site-section site-about" id="sobre"><div class="site-shell"><h2>Sobre a empresa</h2><p class="text">'+esc(sobre)+'</p></div></section>';
    if(gallery)sections+='<section class="site-section site-shell" id="galeria"><h2>Galeria ou portfólio</h2><div class="site-gallery">'+gallery+'</div></section>';
    if(p.video&&p.video.tipo==='link'&&typeof p.video.valor==='string'){
      var url;try{url=new URL(p.video.valor);}catch(error){url=null;}
      if(url&&url.protocol==='https:'&&!url.username&&!url.password)sections+='<section class="site-section site-shell"><h2>Vídeo</h2><p class="video-card"><a href="'+esc(url.href)+'" target="_blank" rel="noopener noreferrer">▶ Assistir ao vídeo</a></p></section>';
    }
    if(contato)sections+='<section class="site-section site-contact" id="contato"><div class="site-shell"><h2>Contato e próximo passo</h2><p class="text">'+esc(contato)+'</p></div></section>';
    sections+='<footer class="site-footer"><div class="site-shell"><strong>'+esc(nome||'Seu negócio')+'</strong>'+(rodape?'<span>'+esc(rodape)+'</span>':'')+'</div></footer>';
    var safeCss=String(css).replace(/<\/style/gi,'');
    return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src data:; object-src \'none\'; base-uri \'none\'; form-action \'none\'"><title>'+esc(nome)+' — Site</title><style>'+safeCss+'</style></head><body class="site" style="--bg:'+colors.fundo+';--ink:'+colors.texto+';--accent:'+colors.destaque+'"><main>'+sections+'</main></body></html>';
  }
  function render(data,css){
    if(!data||['site','portfolio','curriculo'].indexOf(data.produto)<0||!data.conteudo||!data.personalizacao)throw new Error('Projeto inválido.');
    var kind=data.produto,c=data.conteudo,p=data.personalizacao;
    var names={site:'Site',portfolio:'Portfólio',curriculo:'Currículo'};
    var colors=p.cores||{};
    ['fundo','texto','destaque'].forEach(function(k){if(!/^#[a-fA-F0-9]{6}$/.test(colors[k]||''))throw new Error('Cor inválida.');});
    var photos=Array.isArray(p.fotos)?p.fotos:[];
    if(kind==='site')return renderSite(c,photos,p,colors,css);
    var avatar=kind==='curriculo'&&photos.length?picture(photos[0],true):'';
    var contact=kind!=='site'&&c.contato?'<p class="text contato-topo">'+rich(c.contato)+'</p>':'';
    var header='<header>'+avatar+'<h1>'+esc(c.nome)+'</h1><p class="subtitle">'+esc(c.titulo)+'</p>'+contact+'<p class="text">'+rich(c.apresentacao)+'</p></header>';
    var sections=[];
    function block(title,value){if(typeof value==='string'&&value.trim())sections.push('<section><h2>'+title+'</h2><p class="text">'+rich(value)+'</p></section>');}
    if(c.itens){
      var items=c.itens.split(/\r?\n/).filter(function(v){return v.trim();}).map(function(v){return '<li>'+rich(v.replace(/^\s*[-•]\s*/,''))+'</li>';}).join('');
      sections.push('<section><h2>'+(kind==='curriculo'?'Áreas de interesse':kind==='portfolio'?'Projetos e trabalhos':'O que oferecemos')+'</h2><ul class="items">'+items+'</ul></section>');
    }
    if(kind!=='curriculo'&&photos.length){
      var gallery=photos.map(function(photo){var img=picture(photo,false);return img?'<figure>'+img+'<figcaption>'+esc(photo.legenda)+'</figcaption></figure>':'';}).join('');
      sections.push('<section><h2>Galeria</h2><div class="gallery">'+gallery+'</div></section>');
    }
    if(kind!=='site'){
      block(kind==='curriculo'?'Experiência profissional':'Trajetória',c.experiencia);
      block('Formação e cursos',c.formacao);block('Habilidades',c.habilidades);
    }
    if(kind==='site')block('Contato',c.contato);
    if(p.video&&p.video.tipo==='link'&&typeof p.video.valor==='string'){
      var url;try{url=new URL(p.video.valor);}catch(error){url=null;}
      if(url&&url.protocol==='https:'&&!url.username&&!url.password)sections.push('<section><h2>Vídeo</h2><a href="'+esc(url.href)+'" target="_blank" rel="noopener noreferrer">Assistir ao vídeo</a></section>');
    }
    // CSS vem do arquivo confiável da MOSS, não do pedido.
    var safeCss=String(css).replace(/<\/style/gi,'');
    safeCss+='\n.contato-topo{margin:12px 0 18px;font-size:.92rem}@page{size:A4;margin:16mm}@media print{body{background:white;color:#18283b}.curriculo main{max-width:none;padding:0}.curriculo section{break-inside:auto}.curriculo h2{break-after:avoid}.curriculo p{orphans:3;widows:3}body{height:auto;overflow:visible}}';
    return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src data:; object-src \'none\'; base-uri \'none\'; form-action \'none\'"><title>'+esc(c.nome)+' — '+names[kind]+'</title><style>'+safeCss+'</style></head><body class="'+kind+'" style="--bg:'+colors.fundo+';--ink:'+colors.texto+';--accent:'+colors.destaque+'"><main>'+header+sections.join('')+'</main></body></html>';
  }
  return {render:render};
}));
