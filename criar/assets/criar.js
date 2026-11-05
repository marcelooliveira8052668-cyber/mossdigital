/* Criador MOSS Digital — prévia + finalização no WhatsApp */
(function () {
  'use strict';
  var form = document.getElementById('editor');
  var step = 0;
  var busy = false;
  var photoBusy = false;
  var next = document.getElementById('next');
  var back = document.getElementById('back');
  var reset = document.getElementById('reset');
  var error = document.getElementById('error');
  var frame = document.getElementById('preview');
  var previousProduct = '';
  var onlineConfig=window.MossOnlineConfig||{};
  var onlineActivity=typeof onlineConfig.url==='string'&&/^https:\/\/[a-z0-9]{20}\.supabase\.co$/.test(onlineConfig.url)
    &&typeof onlineConfig.publishableKey==='string'&&onlineConfig.publishableKey.startsWith('sb_publishable_');
  var receberPedidos=onlineActivity&&onlineConfig.receberPedidos===true;
  var pedidoEnviado='';var pedidoSnapshot='';var enviandoPedido=false;
  var activityKey='';var activityId='';var activityPending=false;
  var activityQueued=false;var activityStage='preenchendo';var lastActivity=Date.now();
  var lastActivitySent=0;
  var activityInfo=document.createElement('p');activityInfo.className='note';
  activityInfo.id='creation-status';activityInfo.setAttribute('role','status');
  form.prepend(activityInfo);
  var activityNotice=document.createElement('p');activityNotice.className='note';
  activityNotice.textContent=onlineActivity
    ?'Ao continuar, a MOSS registra no Supabase um número de atendimento, o tipo de projeto, a etapa e horários de atividade. Não enviamos seus textos, fotos ou contatos nesse acompanhamento. Dados antigos são limpos quando há novos registros, após 30 dias sem atividade. Fechar ou recarregar inicia outro atendimento. Atividade não comprova pagamento.'
    :localServer()
    ?'Ao continuar, a MOSS registra um número de atendimento, o tipo de projeto, a etapa e horários de atividade para acompanhar a criação. Não registramos os textos digitados, fotos ou contatos nesse acompanhamento. Registros são removidos após 30 dias sem atividade. Fechar ou recarregar a página inicia outro atendimento. Use apenas dados fictícios neste teste local.'
    :'O acompanhamento pela MOSS ainda não está conectado nesta versão online. Fale pelo WhatsApp para registrar seu atendimento.';
  form.querySelector('[data-page="0"]').append(activityNotice);
  function newActivityKey(){
    var bytes=new Uint8Array(32);crypto.getRandomValues(bytes);
    return Array.from(bytes,function(value){return value.toString(16).padStart(2,'0');}).join('');
  }
  async function sendActivity(){
    if((!localServer()&&!onlineActivity)||!product()||step===0)return;
    if(activityPending){activityQueued=true;return;}
    activityPending=true;activityQueued=false;
    var key=activityKey;
    var controller=new AbortController();var timeout=setTimeout(function(){controller.abort();},8000);
    try{
      if(!activityKey)activityKey=newActivityKey();
      key=activityKey;
      var endpoint=onlineActivity?onlineConfig.url+'/rest/v1/rpc/moss_criador_registrar':'/api/criador/atividade';
      var headers={'Content-Type':'application/json'};
      if(onlineActivity)headers.apikey=onlineConfig.publishableKey;
      var body=onlineActivity?{p_chave:key,p_produto:product(),p_etapa:activityStage}:{chave:key,produto:product(),etapa:activityStage};
      var response=await fetch(endpoint,{method:'POST',credentials:'omit',signal:controller.signal,
        headers:headers,body:JSON.stringify(body),referrerPolicy:'no-referrer',cache:'no-store'});
      var result=await response.json();
      if(!response.ok||typeof result.id!=='string')throw new Error('Registro indisponível');
      if(key!==activityKey)return;
      activityId=result.id;lastActivitySent=Date.now();
      activityInfo.textContent='Atendimento '+activityId+' · etapa registrada para acompanhamento pela MOSS. Não é confirmação de pagamento.';
      atualizarWhatsapp();
    }catch(failure){if(key===activityKey)activityInfo.textContent='A MOSS não conseguiu receber sua atividade agora. Continue a prévia e entre em contato pelo WhatsApp.';}
    finally{clearTimeout(timeout);activityPending=false;if(activityQueued)sendActivity();}
  }
  form.addEventListener('input',function(){lastActivity=Date.now();});
  setInterval(function(){
    if(!document.hidden&&step>0&&Date.now()-lastActivity<90000&&Date.now()-lastActivitySent>=30000)sendActivity();
  },30000);
  var fields = ['nome','titulo','apresentacao','itens','experiencia','formacao','habilidades','contato'];
  var names = {site:'Site',portfolio:'Portfólio',curriculo:'Currículo'};
  var deliveries = {download:'Arquivo para baixar',publicar:'Publicação na internet',ambos:'Publicação + arquivos para baixar'};
  var contextProduct = '';
  var area = document.getElementById('area');
  var occupation = document.getElementById('occupation');
  var occupationsReady = false;
  var moment = document.getElementById('momento');
  var examplesStatus = document.getElementById('examples-status');
  var library = window.MossExamples;
  var palettesApi = window.MossPalettes;
  if (!library || !palettesApi) { error.textContent='Não foi possível carregar os exemplos. Recarregue a página.'; return; }

  var corFundo = document.getElementById('cor-fundo');
  var corTexto = document.getElementById('cor-texto');
  var corDestaque = document.getElementById('cor-destaque');
  var swatch = document.getElementById('swatch');
  var contrastStatus = document.getElementById('contrast');
  var paletteBox = document.getElementById('palettes');
  var photoList = document.getElementById('photo-list');
  var photoStatus = document.getElementById('photo-status');
  var photoCount = document.getElementById('photo-count');
  var photoInput = document.getElementById('fotos');
  var videoStatus = document.getElementById('video-status');
  var paletteList = palettesApi.all();
  var modelDefaults = {
    claro:{fundo:'#f5f3ef',texto:'#253443',destaque:'#174f92'},
    azul:{fundo:'#eef3fb',texto:'#183149',destaque:'#174fab'},
    natural:{fundo:'#f0f3ec',texto:'#283e32',destaque:'#315f43'}
  };
  var photos = [];
  var videoToken = '';

  /* ---------- origem da visita (?demo=<id>) ----------
     Quem chega de uma demonstração do site público traz o id da demo na URL.
     O mapa (mapa-demos.js) traduz o id em produto + área e o criador já começa
     com esses dois marcados. Sem mapa, sem parâmetro ou com id desconhecido,
     o criador funciona normalmente, do zero. */
  var ORIGEM = (function () {
    try {
      var id = new URLSearchParams(location.search).get('demo');
      if (!id || !window.MossDemos) return null;
      var entry = window.MossDemos.get(id);
      if (!entry || (entry.produto !== 'site' && entry.produto !== 'portfolio')) return null;
      return { id: id, nome: entry.nome, produto: entry.produto, area: entry.area };
    } catch (failure) { return null; }
  })();
  var origemAreaAplicada = false;

  function aplicarOrigem() {
    if (!ORIGEM) return;
    var radio = form.querySelector('input[name="produto"][value="' + ORIGEM.produto + '"]');
    if (radio && !product()) { radio.checked = true; previousProduct = ORIGEM.produto; }
    var status = document.getElementById('origem-status');
    if (status) {
      status.textContent = 'Você chegou pela demonstração “' + ORIGEM.nome + '”. Produto e área já estão marcados — pode seguir.';
      status.hidden = false;
    }
  }

  /* Chamada ao fim de configure(), quando a lista de áreas do produto está pronta. */
  function aplicarAreaOrigem() {
    if (!ORIGEM || origemAreaAplicada) return;
    origemAreaAplicada = true;
    var found = false;
    for (var i = 0; i < area.options.length; i++) if (area.options[i].value === ORIGEM.area) found = true;
    if (!found) return;
    area.value = ORIGEM.area;
    area.dispatchEvent(new Event('change'));
  }

  function product() { var selected=form.querySelector('input[name="produto"]:checked');return selected ? selected.value : ''; }
  function currentExample() {
    var kind=product();
    var exampleArea=kind==='site'?area.value:library.areaForOccupation(kind,occupation.value);
    return library.example(kind,exampleArea,moment.value,occupation.value);
  }

  function loadOccupations() {
    if (occupationsReady || !Array.isArray(window.MossOccupations)) return;
    var list = document.getElementById('occupation-list');
    var options = document.createDocumentFragment();
    window.MossOccupations.forEach(function(entry){
      var option=document.createElement('option');option.value=entry[1];option.label='CBO '+entry[0];options.appendChild(option);
    });
    list.appendChild(options);
    occupationsReady = true;
  }

  /* ---------- exemplos por área ---------- */
  function updateExamples(announce) {
    var selected=currentExample();
    fields.forEach(function(field){
      var input=form.elements[field];
      var box=document.getElementById('example-'+field);
      if(!box){
        box=document.createElement('div');box.id='example-'+field;box.className='field-example';
        var text=document.createElement('small');text.className='example-text';
        var button=document.createElement('button');button.type='button';button.className='use-example';button.textContent='Usar este exemplo e editar';
        button.addEventListener('click',function(){
          var value=currentExample().content[field];
          if(input.value.trim()&&!confirm('Substituir o texto deste campo pelo exemplo? Os outros campos não serão alterados.'))return;
          input.value=value;input.focus();error.textContent='';examplesStatus.textContent='Exemplo colocado somente neste campo. Confira e ajuste para sua realidade.';
        });
        box.append(text,button);input.insertAdjacentElement('afterend',box);
        input.setAttribute('aria-describedby',box.id);
      }
      var value=selected.content[field];
      box.hidden=!value;
      box.querySelector('.example-text').textContent=value?'Exemplo fictício — '+value:'';
      input.placeholder=value?value.slice(0,180):'';
    });
    document.getElementById('role-example').textContent='Sugestão para: '+selected.label+'. Use apenas o que for verdadeiro para você.';
    document.getElementById('items-help').textContent=product()==='curriculo'
      ?'Escreva uma área ou vaga por linha. Ex.: atendimento, vendas, logística.'
      :'Escreva um item em cada linha. Identifique estudos e exemplos; não apresente como clientes reais.';
    document.getElementById('example').textContent=product()==='site'?'Preencher com exemplos desta área':'Preencher com exemplos e editar';
    if(announce)examplesStatus.textContent='Os exemplos foram adaptados. Seus textos continuam como estavam.';
  }

  /* ---------- navegação de etapas ---------- */
  function show(target) {
    step=target;
    lastActivity=Date.now();
    if(step>0){activityStage=['','preenchendo','personalizando','previa'][step];sendActivity();}
    form.querySelectorAll('[data-page]').forEach(function(panel,i){panel.hidden=i!==step;});
    document.querySelectorAll('[data-indicator]').forEach(function(item,i){if(i===step)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');});
    back.hidden=step===0;next.hidden=step===3;reset.hidden=step!==3;
    atualizarVivo(step);
    next.textContent=step===1?'Personalizar →':step===2?'Ver como ficou →':'Continuar →';
    error.textContent='';
    document.getElementById('title-'+step).focus();
  }

  function configure() {
    var kind=product();var cv=kind==='curriculo';
    if(contextProduct!==kind){
      area.replaceChildren();
      if(kind==='site')library.areas(kind).forEach(function(item){var option=document.createElement('option');option.value=item.value;option.textContent=item.label;area.append(option);});
      occupation.value='';
      moment.value='';contextProduct=kind;examplesStatus.textContent='';
    }
    document.getElementById('occupation-context').hidden=kind==='site';
    document.getElementById('area-context').hidden=kind!=='site';
    if(kind!=='site')loadOccupations();
    document.getElementById('occupation-label').textContent=cv?'Qual profissão ou vaga você procura?':'Que profissão ou tipo de trabalho quer mostrar?';
    document.getElementById('area-label').textContent='Qual é a área do seu negócio?';
    document.getElementById('context-help').textContent=cv||kind==='portfolio'
      ?'A profissão escolhida ajusta os exemplos fictícios quando houver um modelo adequado. Seus textos não mudam automaticamente.'
      :'Os exemplos mudam conforme sua escolha. Eles não são informações sobre você.';
    document.getElementById('career-context').hidden=!cv;
    document.getElementById('name-label').textContent=kind==='site'?'Nome do seu negócio':'Seu nome';
    document.getElementById('role-label').textContent=cv?'Vaga ou área que você procura':'Uma frase sobre o que você faz';
    document.getElementById('role-example').textContent=cv?'Exemplo: “Busco minha primeira oportunidade em atendimento”.':'Exemplo: “Fotografia de eventos” ou “Manutenção residencial”.';
    document.getElementById('items-label').textContent=cv?'Quais áreas ou vagas te interessam?':kind==='portfolio'?'Quais projetos ou trabalhos quer mostrar?':'Quais serviços ou produtos oferece?';
    /* Rótulos do currículo no formato de documento de emprego. */
    document.getElementById('exp-label').innerHTML=(cv?'Experiência profissional':'Experiências ou atividades que já fez')+' <span>(opcional)</span>';
    document.getElementById('exp-help').textContent=cv
      ?'Liste uma por linha: cargo — empresa · período. Ex.: “Atendente — Padaria São João · 2022 a 2024”. Primeiro emprego? Deixe vazio ou conte atividades de curso, pessoais e voluntárias — sem inventar experiência.'
      :'Primeiro emprego? Pode deixar vazio ou contar atividades de curso, pessoais e voluntárias, identificando cada uma. Não invente experiência.';
    document.getElementById('skill-label').innerHTML=(cv?'Habilidades e competências':'O que você sabe fazer')+' <span>(opcional)</span>';
    document.getElementById('contact-label').innerHTML=(cv?'Contato profissional':'Contato que gostaria de mostrar')+' <span>(opcional)</span>';
    document.getElementById('contact-help').textContent=receberPedidos
      ?'Informe cidade, telefone, e-mail e links profissionais, um por linha. No currículo e portfólio, os contatos ficam no cabeçalho. Não informe CPF, RG ou endereço completo.'
      :cv
      ?'Como querem te encontrar: cidade, e-mail, telefone ou LinkedIn. Use dados fictícios neste teste.'
      :'No teste, não use telefone nem e-mail reais. Este campo será apenas texto, não envia mensagens.';
    document.getElementById('product-help').textContent='Você está criando: '+names[kind]+(receberPedidos?'. Revise seus textos antes de finalizar e enviar à MOSS.':'. Preencha com dados fictícios enquanto testamos.');
    document.getElementById('professional-fields').hidden=kind==='site';
    document.getElementById('delivery-fields').hidden=cv;
    document.getElementById('resume-delivery').hidden=!cv;
    document.getElementById('video-fields').hidden=cv;
    var max=photoLimit();
    document.getElementById('photo-limit-text').textContent=cv?'Adicionar sua foto (até 1)':'Adicionar fotos (até '+max+')';
    if(cv)form.elements.entrega.value='download';
    updateExamples(false);
    aplicarAreaOrigem();
  }

  /* ---------- cores ---------- */
  function ratio(first, second) {
    function lum(hex) {
      var value=hex.replace('#','');
      var channels=[0,2,4].map(function(i){return parseInt(value.substr(i,2),16)/255;}).map(function(c){
        return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);});
      return 0.2126*channels[0]+0.7152*channels[1]+0.0722*channels[2];
    }
    var a=lum(first),b=lum(second);
    return (Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
  }
  function colorsOk() { return ratio(corTexto.value,corFundo.value)>=4.5 && ratio(corDestaque.value,corFundo.value)>=3; }
  function updateColors() {
    swatch.style.background=corFundo.value;
    swatch.style.color=corTexto.value;
    swatch.querySelector('strong').style.color=corDestaque.value;
    var rt=ratio(corTexto.value,corFundo.value), rd=ratio(corDestaque.value,corFundo.value);
    var ok=rt>=4.5&&rd>=3;
    contrastStatus.textContent='Contraste do texto: '+rt.toFixed(1)+':1 (mínimo 4,5) · destaque: '+rd.toFixed(1)+':1 (mínimo 3) — '+(ok?'tudo certo para leitura.':'ajuste as cores para continuar.');
    contrastStatus.classList.toggle('bad',!ok);
    paletteBox.querySelectorAll('.palette').forEach(function(button,i){
      var p=paletteList[i];
      button.setAttribute('aria-pressed',String(p.fundo===corFundo.value&&p.texto===corTexto.value&&p.destaque===corDestaque.value));
    });
    return ok;
  }
  function renderPalettes() {
    paletteBox.replaceChildren();
    paletteList.forEach(function(palette){
      var button=document.createElement('button');
      button.type='button';button.className='palette';button.setAttribute('aria-pressed','false');
      var chips=document.createElement('span');chips.className='chips';chips.setAttribute('aria-hidden','true');
      [palette.fundo,palette.texto,palette.destaque].forEach(function(color){
        var chip=document.createElement('i');chip.style.background=color;chips.append(chip);
      });
      var label=document.createElement('span');label.textContent=palette.nome;
      button.append(chips,label);
      button.addEventListener('click',function(){
        corFundo.value=palette.fundo;corTexto.value=palette.texto;corDestaque.value=palette.destaque;
        updateColors();error.textContent='';
      });
      paletteBox.append(button);
    });
  }

  /* ---------- fotos ---------- */
  function photoLimit() { return product()==='curriculo'?1:8; }
  function fileToBase64(file) {
    return new Promise(function(resolve,reject){
      var reader=new FileReader();
      reader.onerror=function(){reject(new Error('Não foi possível ler o arquivo.'));};
      reader.onload=function(){var value=String(reader.result);var comma=value.indexOf(',');resolve(comma<0?'':value.slice(comma+1));};
      reader.readAsDataURL(file);
    });
  }
  function shrink(file) {
    if(typeof createImageBitmap!=='function')return Promise.reject(new Error('Seu navegador não consegue processar esta imagem.'));
    return createImageBitmap(file,{imageOrientation:'from-image'}).then(function(bitmap){
      var scale=Math.min(1,1200/Math.max(bitmap.width,bitmap.height));
      var width=Math.max(1,Math.round(bitmap.width*scale)),height=Math.max(1,Math.round(bitmap.height*scale));
      var canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
      var ctx=canvas.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,width,height);ctx.drawImage(bitmap,0,0,width,height);
      if(bitmap.close)bitmap.close();
      var quality=0.72,uri=canvas.toDataURL('image/jpeg',quality);
      while(uri.length>1100000&&quality>0.35){quality-=0.15;uri=canvas.toDataURL('image/jpeg',quality);}
      if(uri.length>1300000)throw new Error('Esta foto continua grande demais. Tente outra imagem.');
      return uri;
    });
  }
  function renderPhotos() {
    photoList.replaceChildren();
    photos.forEach(function(photo,index){
      var item=document.createElement('li');
      var thumb=document.createElement('img');thumb.src=photo.uri;thumb.alt='';thumb.width=72;thumb.height=72;
      var label=document.createElement('label');
      var input=document.createElement('input');input.type='text';input.maxLength=120;input.value=photo.legenda;
      input.placeholder='Descreva a foto (acessibilidade)';
      input.setAttribute('aria-label','Descrição da foto '+(index+1));
      input.addEventListener('input',function(){photo.legenda=input.value;});
      label.append('Descrição da foto '+(index+1)+' ',input);
      var remove=document.createElement('button');remove.type='button';remove.className='secondary';remove.textContent='Remover';
      remove.addEventListener('click',function(){photos.splice(index,1);renderPhotos();photoStatus.textContent='Foto removida.';});
      item.append(thumb,label,remove);
      photoList.append(item);
    });
    photoCount.textContent=photos.length+' de '+photoLimit()+' foto(s) na prévia.';
  }
  async function addPhotos(fileList) {
    var files=Array.prototype.slice.call(fileList||[]);
    if(!files.length)return;
    var problems=[];
    for(var i=0;i<files.length;i++){
      if(photos.length>=photoLimit()){problems.push('Limite de '+photoLimit()+' foto(s) atingido.');break;}
      var file=files[i];
      if(['image/jpeg','image/png','image/webp'].indexOf(file.type)<0){problems.push(file.name+': use JPEG, PNG ou WebP.');continue;}
      if(file.size>20*1024*1024){problems.push(file.name+': imagem grande demais (máximo 20 MB).');continue;}
      try{photos.push({uri:await shrink(file),legenda:''});}
      catch(failure){problems.push(file.name+': '+failure.message);}
    }
    photoInput.value='';
    renderPhotos();
    agendarSync();
    photoStatus.textContent=problems.length?problems.join(' '):(photos.length?photos.length+' foto(s) adicionada(s). Descreva cada uma para acessibilidade.':'');
  }

  /* ---------- vídeo ---------- */
  function videoKind() { var el=form.querySelector('input[name="video-tipo"]:checked');return el?el.value:'nenhum'; }
  function updateVideoFields() {
    var fileOption=form.querySelector('input[name="video-tipo"][value="arquivo"]');
    if(!localServer()){
      fileOption.disabled=true;fileOption.parentElement.hidden=true;
      if(fileOption.checked)form.querySelector('input[name="video-tipo"][value="nenhum"]').checked=true;
    }
    var kind=videoKind();
    document.getElementById('video-link-fields').hidden=kind!=='link';
    document.getElementById('video-file-fields').hidden=kind!=='arquivo';
  }
  function clearVideo() {
    videoToken='';
    document.getElementById('video-url').value='';
    document.getElementById('video-arquivo').value='';
    var none=form.querySelector('input[name="video-tipo"][value="nenhum"]');
    if(none)none.checked=true;
    updateVideoFields();videoStatus.textContent='';
  }
  async function uploadVideo(file) {
    if(!localServer()){videoStatus.textContent='Nesta versão, use um link de vídeo. Nenhum arquivo foi enviado.';return;}
    if(['video/mp4','video/webm'].indexOf(file.type)<0){videoStatus.textContent='Use um arquivo MP4 ou WebM.';document.getElementById('video-arquivo').value='';return;}
    if(file.size>4*1024*1024){videoStatus.textContent='Arquivo maior que 4 MB. Reduza o vídeo antes de enviar.';document.getElementById('video-arquivo').value='';return;}
    videoStatus.textContent='Enviando o vídeo…';
    try{
      var dados=await fileToBase64(file);
      var response=await fetch('/api/criador/video',{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify({dados:dados})});
      var result=await response.json();
      if(!response.ok)throw new Error(result.erro||'Não foi possível enviar o vídeo.');
      videoToken=result.token;
      videoStatus.textContent='Vídeo enviado: '+file.name+'. Ele expira ao reiniciar o servidor.';
      agendarSync();
    }catch(failure){videoToken='';videoStatus.textContent=failure.message;document.getElementById('video-arquivo').value='';}
  }

  /* ---------- resumo do pedido ---------- */
  function localServer(){return !onlineActivity&&/^(127\.0\.0\.1|localhost|\[::1\])$/.test(location.hostname);}
  function renderOrder() {
    if(receberPedidos&&pedidoSnapshot&&pedidoSnapshot!==JSON.stringify(payload())){
      pedidoEnviado='';pedidoSnapshot='';
      document.getElementById('pix-panel').hidden=true;
      whatsFinal.textContent='Finalizar e enviar projeto à MOSS';
      document.getElementById('envio-status').textContent='Você alterou o projeto. Finalize para enviar esta nova versão.';
    }
    atualizarWhatsapp('final');
    var kind=product();
    var delivery=kind==='curriculo'?'PDF privado':deliveries[form.elements.entrega.value];
    document.getElementById('order-item').textContent=names[kind]+' — '+delivery;
    document.getElementById('order-price').textContent='A combinar no WhatsApp';
  }

  /* ---------- envio / prévia ---------- */
  function payload() {
    var content={};fields.forEach(function(field){content[field]=form.elements[field].value;});
    if(product()==='site'){content.experiencia='';content.formacao='';content.habilidades='';}
    return {produto:product(),modelo:form.querySelector('input[name="modelo"]:checked').value,
            entrega:product()==='curriculo'?'download':form.elements.entrega.value,
            conteudo:content,personalizacao:personalizacao()};
  }
  function personalizacao() {
    var kind=videoKind();var video=null;
    if(kind==='arquivo'&&videoToken)video={tipo:'arquivo',valor:videoToken};
    else if(kind==='link'){var url=document.getElementById('video-url').value.trim();if(url)video={tipo:'link',valor:url};}
    return {cores:{fundo:corFundo.value,texto:corTexto.value,destaque:corDestaque.value},
            fotos:photos.map(function(photo){return {uri:photo.uri,legenda:photo.legenda};}),
            video:video};
  }

  form.addEventListener('submit',async function(event){
    event.preventDefault();if(busy)return;
    if(step===0){if(!product()){error.textContent='Escolha se quer criar um site, um portfólio ou um currículo.';form.querySelector('input[name="produto"]').focus();return;}configure();show(1);return;}
    if(step===1){
      for(var name of ['nome','titulo','apresentacao']){if(!form.elements[name].value.trim()){error.textContent='Preencha nome, título e apresentação para continuar.';form.elements[name].focus();return;}}
      return show(2);
    }
    if(step!==2)return;
    if(photoBusy){error.textContent='Aguarde as fotos terminarem de carregar.';return;}
    if(!updateColors()){error.textContent='Ajuste as cores: o texto precisa de contraste suficiente com o fundo para ser lido.';corTexto.focus();return;}
    var vk=videoKind();
    if(vk==='link'){
      var url=document.getElementById('video-url').value.trim();
      if(!url){error.textContent='Cole o endereço do vídeo ou escolha outra opção.';document.getElementById('video-url').focus();return;}
      if(!/^https:\/\/[A-Za-z0-9]/.test(url)){error.textContent='Use um link de vídeo começando com https://.';document.getElementById('video-url').focus();return;}
    }
    if(vk==='arquivo'&&!videoToken){error.textContent='Envie o arquivo de vídeo ou escolha outra opção.';return;}
    if(!/^https?:$/.test(location.protocol)){error.textContent='Abra pelo servidor para gerar a prévia.';return;}
    if(!localServer()){
      frame.srcdoc=previewLocalHtml();
      document.getElementById('delivery-summary').textContent=names[product()]+' · '+(product()==='curriculo'?'PDF privado':deliveries[form.elements.entrega.value]);
      renderOrder();
      show(3);
      return;
    }
    var controls=Array.from(form.querySelectorAll('input,textarea,select,button'));
    var disabledBefore=controls.map(function(control){return control.disabled;});
    busy=true;controls.forEach(function(control){control.disabled=true;});next.textContent='Montando sua prévia…';
    var controller=new AbortController();var timer=setTimeout(function(){controller.abort();},15000);
    try{
      var response=await fetch('/api/criador/previa',{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload()),signal:controller.signal});
      var result=await response.json();if(!response.ok)throw new Error(result.erro||'Não foi possível montar a prévia.');
      if(typeof result.html!=='string')throw new Error('Não foi possível conferir a prévia recebida.');
      frame.srcdoc=result.html;
      document.getElementById('delivery-summary').textContent=names[product()]+' · '+(product()==='curriculo'?'PDF privado':deliveries[form.elements.entrega.value]);
      renderOrder();
      show(3);
    }catch(failure){error.textContent=failure.name==='AbortError'?'A montagem demorou mais que o esperado. Tente novamente.':failure.message;}
    finally{clearTimeout(timer);busy=false;controls.forEach(function(control,i){control.disabled=disabledBefore[i];});next.textContent='Ver como ficou →';}
  });

  back.addEventListener('click',function(){if(busy)return;frame.removeAttribute('srcdoc');show(Math.max(0,step-1));});

  document.getElementById('example').addEventListener('click',function(){
    if(fields.some(function(field){return form.elements[field].value.trim();})&&!confirm('Substituir os textos atuais por um exemplo fictício?'))return;
    var content=currentExample().content;
    fields.forEach(function(field){form.elements[field].value=content[field];});
    examplesStatus.textContent='Exemplos fictícios preenchidos. Revise todos os campos antes de continuar.';
    error.textContent='';form.elements.nome.focus();
  });

  form.querySelectorAll('input[name="produto"]').forEach(function(input){input.addEventListener('change',function(){
    if(previousProduct&&previousProduct!==product()){
      if(fields.some(function(field){return form.elements[field].value.trim();})&&!confirm('Trocar o tipo de criação apaga os textos, as fotos e o vídeo atuais. Quer continuar?')){
        form.querySelector('input[name="produto"][value="'+previousProduct+'"]').checked=true;return;}
      fields.forEach(function(field){form.elements[field].value='';});
      photos=[];renderPhotos();photoStatus.textContent='';
      clearVideo();
      frame.removeAttribute('srcdoc');
    }
    previousProduct=product();
  });});

  area.addEventListener('change',function(){updateExamples(true);});
  occupation.addEventListener('input',function(){updateExamples(true);});
  moment.addEventListener('change',function(){updateExamples(true);});

  [corFundo,corTexto,corDestaque].forEach(function(input){input.addEventListener('input',function(){updateColors();error.textContent='';});});
  photoInput.addEventListener('change',function(){
    photoBusy=true;photoStatus.textContent='Processando as fotos no seu computador…';
    addPhotos(photoInput.files).finally(function(){photoBusy=false;});
  });
  form.querySelectorAll('input[name="video-tipo"]').forEach(function(radio){radio.addEventListener('change',function(){updateVideoFields();error.textContent='';});});
  document.getElementById('video-url').addEventListener('input',function(){videoStatus.textContent='';error.textContent='';});
  document.getElementById('video-arquivo').addEventListener('change',function(){
    var file=this.files&&this.files[0];
    if(file)uploadVideo(file);
  });

  reset.addEventListener('click',function(){
    if(busy)return;
    if(!confirm('Apagar os textos, fotos e vídeo desta tela e começar outra criação?'))return;
    activityKey='';activityId='';activityQueued=false;activityInfo.textContent='';
    pedidoEnviado='';pedidoSnapshot='';
    if(receberPedidos){
      document.getElementById('envio-consent').checked=false;
      document.getElementById('envio-status').textContent='';
      document.getElementById('pix-panel').hidden=true;
      whatsFinal.textContent='Finalizar e enviar projeto à MOSS';
    }
    HTMLFormElement.prototype.reset.call(form);previousProduct='';contextProduct='';examplesStatus.textContent='';
    var origemStatus=document.getElementById('origem-status');
    if(origemStatus){origemStatus.hidden=true;origemStatus.textContent='';}
    photos=[];renderPhotos();photoStatus.textContent='';clearVideo();
    corFundo.value=modelDefaults.claro.fundo;corTexto.value=modelDefaults.claro.texto;corDestaque.value=modelDefaults.claro.destaque;
    updateColors();
    frame.removeAttribute('srcdoc');show(0);
  });

  ['desktop','mobile'].forEach(function(id){document.getElementById(id).addEventListener('click',function(){
    document.getElementById('preview-frame').classList.toggle('mobile',id==='mobile');
    document.getElementById('desktop').setAttribute('aria-pressed',String(id==='desktop'));
    document.getElementById('mobile').setAttribute('aria-pressed',String(id==='mobile'));
  });});

  form.querySelectorAll('input[name="modelo"]').forEach(function(radio){radio.addEventListener('change',function(){
    var defaults=modelDefaults[radio.value];if(!defaults)return;
    corFundo.value=defaults.fundo;corTexto.value=defaults.texto;corDestaque.value=defaults.destaque;updateColors();
  });});

  /* ---------- WhatsApp final ---------- */
  var whatsFinal=document.getElementById('whats-final');
  var whatsSupport=document.getElementById('whats-support');
  function atualizarWhatsapp(contexto){
    var kind=product()||'site';
    var delivery=kind==='curriculo'?'PDF privado':deliveries[form.elements.entrega ? form.elements.entrega.value : 'download'];
    var nome=form.elements.nome.value.trim();
    var titulo=form.elements.titulo.value.trim();
    var texto='Olá! Criei minha prévia no site da MOSS Digital: '+names[kind]+(nome?' — "'+nome+'"':'')+(titulo?' — '+titulo:'')+'. Entrega: '+delivery+'. Quero combinar o valor do Pix ou enviar meu comprovante para conferência. Aguardo a confirmação do recebimento e a entrega manual dos arquivos. Vou anexar o comprovante nesta conversa, se já tiver pago.';
    if(activityId)texto='Atendimento '+activityId+'. '+texto;
    if(pedidoEnviado)texto='Pedido '+pedidoEnviado+'. Meu projeto foi enviado ao painel privado da MOSS. '+texto;
    if(contexto==='ajuste')texto='Olá! Fiz uma prévia no criador da MOSS Digital ('+names[kind]+(nome?' — "'+nome+'"':'')+') e quero ajustar o resultado. Pode me ajudar?';
    var url='https://wa.me/5511942038103?text='+encodeURIComponent(texto);
    if(whatsFinal)whatsFinal.href=url;
    if(whatsSupport){
      var referencia=pedidoEnviado?'Pedido '+pedidoEnviado:activityId?'Atendimento '+activityId:'Prévia ainda não enviada';
      var ajuste=referencia+'. Olá, MOSS! Estou criando um '+names[kind]+(nome?' — '+nome:'')+'. Quero solicitar um recurso ou melhoria que não está incluído no modelo. Vou explicar o que preciso para vocês avaliarem viabilidade, prazo e eventual valor adicional.';
      whatsSupport.href='https://wa.me/5511942038103?text='+encodeURIComponent(ajuste);
    }
  }

  if(receberPedidos&&whatsFinal){
    var envioBox=document.createElement('div');envioBox.className='note';
    var consentLabel=document.createElement('label');consentLabel.className='envio-consent-label';var consent=document.createElement('input');
    consent.type='checkbox';consent.id='envio-consent';
    consentLabel.append(consent,document.createTextNode(' Autorizo enviar meus textos, contatos, fotos e configurações à MOSS para preparar este pedido, em área privada. Não informe CPF, RG ou dados sensíveis.'));
    var envioStatus=document.createElement('p');envioStatus.id='envio-status';envioStatus.setAttribute('role','status');envioStatus.setAttribute('aria-live','polite');
    envioBox.append(consentLabel,envioStatus);whatsFinal.before(envioBox);
    whatsFinal.textContent='Finalizar e enviar projeto à MOSS';
    document.getElementById('pix-panel').hidden=true;
    document.querySelector('.final-text').textContent='Finalize para enviar seu projeto completo ao painel privado da MOSS. Depois, converse pelo WhatsApp para combinar o valor e enviar o comprovante. A MOSS confere o Pix antes de entregar os arquivos.';
    document.querySelector('#order-box > .note:last-child').textContent='Após a confirmação do envio, a MOSS recebe o projeto para baixar no painel privado. Você recebe os arquivos manualmente após a conferência do pagamento. Se o envio falhar, não feche a página: seus textos ainda estarão nesta tela.';
    whatsFinal.addEventListener('click',async function(event){
      if(pedidoEnviado&&!enviandoPedido)return;
      event.preventDefault();event.stopImmediatePropagation();
      if(enviandoPedido)return;
      if(!consent.checked){envioStatus.textContent='Marque a autorização para enviar seu projeto à MOSS.';consent.focus();return;}
      var snapshot=payload();var serialized=JSON.stringify(snapshot);
      if(new Blob([serialized]).size>2800000){envioStatus.textContent='Projeto muito grande. Reduza a quantidade de fotos antes de enviar (limite aproximado de 2,8 MB).';return;}
      enviandoPedido=true;busy=true;whatsFinal.setAttribute('aria-disabled','true');
      envioStatus.textContent='Enviando o projeto completo… Não feche esta página.';
      var controller=new AbortController();var timer=setTimeout(function(){controller.abort();},25000);
      try{
        if(!activityId){await sendActivity();if(!activityId)throw new Error('Atendimento ainda não registrado');}
        var response=await fetch(onlineConfig.url+'/rest/v1/rpc/moss_criador_enviar',{
          method:'POST',credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer',signal:controller.signal,
          headers:{apikey:onlineConfig.publishableKey,'Content-Type':'application/json'},
          body:JSON.stringify({p_chave:activityKey,p_documento:snapshot})
        });
        var result=await response.json();
        if(!response.ok||result.recebido!==true||typeof result.id!=='string')throw new Error('Envio não confirmado');
        pedidoEnviado=result.id;pedidoSnapshot=serialized;
        atualizarWhatsapp('final');
        document.getElementById('pix-panel').hidden=false;
        whatsFinal.textContent='Conversar com a MOSS no WhatsApp';
        envioStatus.textContent='Projeto recebido pela MOSS. Pedido '+pedidoEnviado+'. Agora toque no botão para conversar pelo WhatsApp. Isso não confirma pagamento.';
      }catch(failure){
        envioStatus.textContent='Envio não confirmado. Não feche nem atualize a página. Confira a conexão e tente novamente; não faça um novo Pix por causa desta falha. Se persistir, use o suporte.';
      }finally{clearTimeout(timer);enviandoPedido=false;busy=false;whatsFinal.removeAttribute('aria-disabled');}
    });
  }
  if(whatsFinal)whatsFinal.addEventListener('click',function(){
    activityStage='whatsapp';lastActivity=Date.now();sendActivity();
  });

  document.getElementById('pix-copy').addEventListener('click',async function(){
    var key=document.getElementById('pix-key');
    var status=document.getElementById('pix-status');
    try{
      if(!navigator.clipboard)throw new Error('Clipboard indisponível');
      await navigator.clipboard.writeText(key.value);
      status.textContent='Chave CPF copiada. Confirme o valor e o destinatário antes de pagar.';
    }catch(failure){
      key.focus();key.select();
      status.textContent='Não foi possível copiar automaticamente. Copie a chave selecionada manualmente.';
    }
  });

  /* ---------- site vivo: prévia ao vivo espelhando o render_document ---------- */
  var liveFrame=document.getElementById('live');
  var liveWrap=document.getElementById('live-wrap');
  var liveToggle=document.getElementById('live-toggle');
  var liveGrid=document.getElementById('creator-grid');
  var livePronto=false;var liveTimer=0;var liveAssinatura='';
  function escLive(value){return String(value).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function agendarSync(){if(liveTimer)clearTimeout(liveTimer);liveTimer=setTimeout(function(){liveTimer=0;syncLive();},250);}
  function liveEsqueleto(){
    return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
      '<meta name="robots" content="noindex,nofollow"><title>Prévia — Site</title><link rel="stylesheet" href="assets/documento.css"></head>'+
      '<body class="claro site live"><main></main></body></html>';
  }
  function liveSecoes(kind){
    var out=[];var esc=escLive;
    var nome=form.elements.nome.value.trim();
    var itens=form.elements.itens.value;
    if(itens){
      var tituloItens=kind==='site'?'O que oferecemos':kind==='portfolio'?'Projetos e trabalhos':'Áreas de interesse';
      var lis=itens.split(/\r?\n/).filter(function(linha){return linha.trim();}).map(function(linha){return '<li>'+esc(linha.trim())+'</li>';}).join('');
      if(lis)out.push('<section><h2>'+tituloItens+'</h2><ul class="items">'+lis+'</ul></section>');
    }
    if(kind!=='curriculo'&&photos.length){
      var figures=photos.map(function(foto,index){
        var alt=esc(foto.legenda||('Foto '+(index+1)+(nome?' de '+nome:'')));
        return '<figure><img src="'+esc(foto.uri)+'" alt="'+alt+'" loading="lazy"><figcaption>'+alt+'</figcaption></figure>';
      }).join('');
      out.push('<section class="galeria"><h2>Galeria</h2><div class="gallery">'+figures+'</div></section>');
    }
    var vk=videoKind();
    if(vk==='link'){
      var url=document.getElementById('video-url').value.trim();
      if(url){
        var host=url.replace(/^https:\/\//,'').split('/')[0];
        out.push('<section class="video"><h2>Vídeo</h2><p class="video-card"><a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">▶ Assistir ao vídeo — '+esc(host)+' (abre em outra aba)</a></p></section>');
      }
    }else if(vk==='arquivo'&&videoToken){
      out.push('<section class="video"><h2>Vídeo</h2><video controls preload="metadata" src="/criador/video/'+esc(videoToken)+'">Seu navegador não consegue reproduzir este vídeo.</video></section>');
    }
    function bloco(titulo,valor){var texto=(valor||'').trim();if(texto)out.push('<section><h2>'+titulo+'</h2><p class="text">'+esc(texto)+'</p></section>');}
    if(kind==='curriculo'){
      bloco('Experiência profissional',form.elements.experiencia.value);
      bloco('Formação e cursos',form.elements.formacao.value);
      bloco('Habilidades',form.elements.habilidades.value);
    }else if(kind==='portfolio'){
      bloco('Trajetória',form.elements.experiencia.value);
      bloco('Formação e cursos',form.elements.formacao.value);
      bloco('Habilidades',form.elements.habilidades.value);
    }
    if(kind==='site')bloco('Contato',form.elements.contato.value);
    return out.join('');
  }
  function previewLocalHtml(){
    var kind=product();
    var modelo=form.querySelector('input[name="modelo"]:checked').value;
    var nome=form.elements.nome.value;
    var avatar=(kind==='curriculo'&&photos.length)?'<img class="avatar" src="'+escLive(photos[0].uri)+'" alt="'+escLive(photos[0].legenda||'Foto de exemplo')+'">':'';
    var nomeTag='<h1>'+escLive(nome)+'</h1>';
    var fraseTag='<p class="subtitle">'+escLive(form.elements.titulo.value)+'</p>';
    var contatoTopo=kind!=='site'&&form.elements.contato.value.trim()?'<p class="text contato-topo">'+escLive(form.elements.contato.value.trim())+'</p>':'';
    var header='<header>'+avatar+(kind==='curriculo'?nomeTag+fraseTag:fraseTag+nomeTag)+contatoTopo+
      '<p class="text">'+escLive(form.elements.apresentacao.value)+'</p></header>';
    var notice='<aside class="preview">PRÉVIA GRÁTIS · MOSS DIGITAL · MONTE A SUA E FINALIZE NO WHATSAPP</aside>';
    var footer='<footer>Prévia criada com a MOSS Digital. Gostou? Finalize no WhatsApp.</footer>';
    var cores='--bg:'+corFundo.value+';--ink:'+corTexto.value+';--accent:'+corDestaque.value;
    return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>'+
      escLive(nome)+' — '+names[kind]+'</title><link rel="stylesheet" href="assets/documento.css"></head><body class="'+modelo+' '+kind+'" style="'+cores+'">'+
      notice+'<main>'+header+liveSecoes(kind)+footer+'</main></body></html>';
  }
  function setTextLive(el,valor,placeholder){
    el.textContent=valor||placeholder;
    el.classList.toggle('ph',!valor);
  }
  function syncLive(){
    if(!livePronto)return;
    var doc=liveFrame.contentDocument;
    if(!doc||!doc.body||!doc.querySelector('main'))return;
    var kind=product()||'site';
    var modelo=form.querySelector('input[name="modelo"]:checked').value;
    var nome=form.elements.nome.value.trim();
    doc.body.className=modelo+' '+kind+' live';
    doc.body.style.setProperty('--bg',corFundo.value);
    doc.body.style.setProperty('--ink',corTexto.value);
    doc.body.style.setProperty('--accent',corDestaque.value);
    doc.title=(nome||'Prévia')+' — '+names[kind];
    var avatar=(kind==='curriculo'&&photos.length)?'<img class="avatar" src="'+escLive(photos[0].uri)+'" alt="'+escLive(photos[0].legenda||'Foto de exemplo')+'">':'';
    var secoes=liveSecoes(kind);
    var contatoTopo=kind!=='site'&&form.elements.contato.value.trim()?'<p class="text contato-topo">'+escLive(form.elements.contato.value.trim())+'</p>':'';
    var assinatura=kind+'|'+avatar+'|'+secoes+'|'+contatoTopo;
    var main=doc.querySelector('main');
    if(assinatura!==liveAssinatura){
      var antes=main.querySelectorAll('.gallery figure').length;
      liveAssinatura=assinatura;
      var cabecalho=kind==='curriculo'
        ?'<h1 id="l-nome"></h1><p class="subtitle" id="l-titulo"></p>'
        :'<p class="subtitle" id="l-titulo"></p><h1 id="l-nome"></h1>';
      main.innerHTML='<header>'+avatar+cabecalho+contatoTopo+'<p class="text" id="l-apresentacao"></p></header>'+secoes;
      var figs=main.querySelectorAll('.gallery figure');
      for(var i=antes;i<figs.length;i++)figs[i].classList.add('entra');
    }
    setTextLive(doc.getElementById('l-titulo'),form.elements.titulo.value.trim(),'Uma frase sobre o que você faz');
    setTextLive(doc.getElementById('l-nome'),nome,kind==='site'?'Seu negócio':'Seu nome');
    setTextLive(doc.getElementById('l-apresentacao'),form.elements.apresentacao.value.trim(),'Escreva um pouco sobre você ou seu negócio — a prévia monta sozinha.');
  }
  function montarLive(){
    liveFrame.addEventListener('load',function(){livePronto=true;liveAssinatura='';syncLive();});
    liveFrame.srcdoc=liveEsqueleto();
  }
  function atualizarVivo(alvo){
    var ativo=alvo!==3;
    liveGrid.classList.toggle('on',ativo);
    liveToggle.hidden=!ativo;
    if(!ativo){
      liveWrap.classList.remove('aberto');
      liveToggle.setAttribute('aria-expanded','false');
      liveToggle.textContent='Ver prévia ao vivo';
    }else agendarSync();
  }
  liveToggle.addEventListener('click',function(){
    var aberto=liveWrap.classList.toggle('aberto');
    liveToggle.setAttribute('aria-expanded',String(aberto));
    liveToggle.textContent=aberto?'Fechar prévia':'Ver prévia ao vivo';
    if(aberto)agendarSync();
  });
  document.addEventListener('keydown',function(event){
    if(event.key==='Escape'&&liveWrap.classList.contains('aberto'))liveToggle.click();
  });

  renderPalettes();
  renderPhotos();
  updateVideoFields();
  updateColors();
  aplicarOrigem();
  montarLive();
  atualizarVivo(0);
  atualizarWhatsapp('final');
  form.addEventListener('input',agendarSync,true);
  form.addEventListener('change',agendarSync,true);
  form.addEventListener('click',agendarSync,true);
  document.getElementById('creator').hidden=false;
}());
