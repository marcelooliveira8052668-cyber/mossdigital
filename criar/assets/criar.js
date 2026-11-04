/* Cria prévias de verdade no servidor local; não simula pagamento nem entrega. */
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
  var fields = ['nome','titulo','apresentacao','itens','experiencia','formacao','habilidades','contato'];
  var names = {site:'Site',portfolio:'Portfólio',curriculo:'Currículo'};
  var deliveries = {download:'Arquivo para baixar',publicar:'Publicação na internet',ambos:'Publicação + arquivos para baixar'};
  var contextProduct = '';
  var area = document.getElementById('area');
  var moment = document.getElementById('momento');
  var examplesStatus = document.getElementById('examples-status');
  var library = window.MossExamples;
  var palettesApi = window.MossPalettes;
  if (!library || !palettesApi) { error.textContent='Não foi possível carregar os exemplos. Reabra o criador pelo servidor local.'; return; }

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
  var prices = null;
  var pixInfo = null;
  var pixPedido = '';
  var pixTimer = 0;
  var pixTentativa = 0;

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
  function currentExample() { return library.example(product(),area.value,moment.value); }

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
    document.getElementById('items-help').textContent='Escreva um item em cada linha. Identifique estudos e exemplos; não apresente como clientes reais.';
    document.getElementById('example').textContent='Preencher com exemplos desta área';
    if(announce)examplesStatus.textContent='Os exemplos foram adaptados. Seus textos continuam como estavam.';
  }

  /* ---------- navegação de etapas ---------- */
  function show(target) {
    step=target;
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
      library.areas(kind).forEach(function(item){var option=document.createElement('option');option.value=item.value;option.textContent=item.label;area.append(option);});
      moment.value='';contextProduct=kind;examplesStatus.textContent='';
    }
    document.getElementById('area-label').textContent=cv?'Em qual área você quer trabalhar?':kind==='portfolio'?'Que tipo de trabalho quer mostrar?':'Qual é a área do seu negócio?';
    document.getElementById('career-context').hidden=!cv;
    document.getElementById('name-label').textContent=kind==='site'?'Nome do seu negócio':'Seu nome';
    document.getElementById('role-label').textContent=cv?'Vaga ou área que você procura':'Uma frase sobre o que você faz';
    document.getElementById('role-example').textContent=cv?'Exemplo: “Busco minha primeira oportunidade em atendimento”.':'Exemplo: “Fotografia de eventos” ou “Manutenção residencial”.';
    document.getElementById('items-label').textContent=cv?'Que atividades ou oportunidades procura?':kind==='portfolio'?'Quais projetos ou trabalhos quer mostrar?':'Quais serviços ou produtos oferece?';
    document.getElementById('product-help').textContent='Você está criando: '+names[kind]+'. Preencha com dados fictícios enquanto testamos.';
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
    if(['video/mp4','video/webm'].indexOf(file.type)<0){videoStatus.textContent='Use um arquivo MP4 ou WebM.';document.getElementById('video-arquivo').value='';return;}
    if(file.size>4*1024*1024){videoStatus.textContent='Arquivo maior que 4 MB. Reduza o vídeo antes de enviar.';document.getElementById('video-arquivo').value='';return;}
    videoStatus.textContent='Enviando o vídeo para o servidor local…';
    try{
      var dados=await fileToBase64(file);
      var response=await fetch('/api/criador/video',{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify({dados:dados})});
      var result=await response.json();
      if(!response.ok)throw new Error(result.erro||'Não foi possível enviar o vídeo.');
      videoToken=result.token;
      videoStatus.textContent='Vídeo enviado para esta sessão: '+file.name+'. Ele expira ao reiniciar o servidor.';
      agendarSync();
    }catch(failure){videoToken='';videoStatus.textContent=failure.message;document.getElementById('video-arquivo').value='';}
  }

  /* ---------- resumo do pedido ---------- */
  async function loadPrices() {
    if(prices)return;
    if(!localServer()){prices=null;return;}
    try{
      var response=await fetch('/api/criador/precos',{credentials:'omit'});
      var result=await response.json();
      if(response.ok&&result&&result.itens)prices=result;
    }catch(failure){prices=null;}
  }
  function renderOrder() {
    var kind=product();
    var delivery=kind==='curriculo'?'PDF privado':deliveries[form.elements.entrega.value];
    document.getElementById('order-item').textContent=names[kind]+' — '+delivery;
    var value=prices&&prices.itens?prices.itens[kind]:null;
    var from=kind==='site'&&value?'a partir de ':'';
    document.getElementById('order-price').textContent=value?(from+'R$ '+Number(value).toLocaleString('pt-BR')):'A definir';
    document.getElementById('order-note').textContent=value
      ?(pixInfo&&pixInfo.disponivel?'Valor exibido para teste. Pix em modo teste: nenhuma cobrança real será feita.':'Valor exibido para teste. O pagamento Pix continua desativado até a homologação do Mercado Pago.')
      :'Os valores ainda não foram definidos. Quando forem definidos neste computador, aparecem aqui antes do pagamento.';
    closePix();
    updatePixButton();
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
    if(!/^https?:$/.test(location.protocol)){error.textContent='Abra pelo servidor local para gerar a prévia. Use INICIAR MOSS.cmd e acesse /criar/.';return;}
    if(!localServer()){
      frame.srcdoc=previewLocalHtml();
      document.getElementById('delivery-summary').textContent=names[product()]+' · '+(product()==='curriculo'?'PDF privado — entrega ainda não ativada':deliveries[form.elements.entrega.value]+' — entrega ainda não ativada');
      await loadPrices();
      await loadPix();
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
      document.getElementById('delivery-summary').textContent=names[product()]+' · '+(product()==='curriculo'?'PDF privado — entrega ainda não ativada':deliveries[form.elements.entrega.value]+' — entrega ainda não ativada');
      await loadPrices();
      await loadPix();
      renderOrder();
      show(3);
    }catch(failure){error.textContent=failure.name==='AbortError'?'A montagem demorou mais que o esperado. Tente novamente.':failure.message;}
    finally{clearTimeout(timer);busy=false;controls.forEach(function(control,i){control.disabled=disabledBefore[i];});updatePixButton();next.textContent='Ver como ficou →';}
  });

  back.addEventListener('click',function(){if(busy)return;closePix();frame.removeAttribute('srcdoc');show(Math.max(0,step-1));});

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
    if(!confirm('Apagar os textos, fotos e vídeo desta tela e começar outra criação?'))return;
    form.reset();previousProduct='';contextProduct='';examplesStatus.textContent='';
    var origemStatus=document.getElementById('origem-status');
    if(origemStatus){origemStatus.hidden=true;origemStatus.textContent='';}
    photos=[];renderPhotos();photoStatus.textContent='';clearVideo();closePix();
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

  /* ---------- Pix (Mercado Pago em modo teste) ----------
     A chave secreta fica só no servidor; o navegador conversa apenas com a MOSS. */
  function localServer(){return /^(127\.0\.0\.1|localhost|\[::1\])$/.test(location.hostname);}
  async function loadPix(){
    pixInfo={disponivel:false,modo:'',motivo:''};
    if(!localServer())return;
    try{
      var response=await fetch('/api/criador/pix',{credentials:'omit'});
      var result=await response.json();
      if(response.ok&&result&&typeof result.disponivel==='boolean')pixInfo=result;
    }catch(failure){pixInfo={disponivel:false,modo:'',motivo:''};}
  }
  function updatePixButton(){
    var pixOpen=document.getElementById('pix-open');
    var ativo=!!(pixInfo&&pixInfo.disponivel);
    pixOpen.disabled=!ativo;
    pixOpen.textContent=ativo?(pixInfo.modo==='teste'?'Pagar com Pix (teste)':'Pagar com Pix'):'Pagamento Pix indisponível nesta versão';
    pixOpen.title=ativo?(pixInfo.modo==='teste'?'Ambiente de teste do Mercado Pago: nenhuma cobrança real.':'Modo de pagamento: '+pixInfo.modo):String((pixInfo&&pixInfo.motivo)||'');
  }
  function pixStep(which){
    ['pix-form','pix-qr','pix-done'].forEach(function(id){document.getElementById(id).hidden=id!==which;});
  }
  function closePix(){
    if(pixTimer){clearTimeout(pixTimer);pixTimer=0;}
    pixPedido='';pixTentativa=0;
    document.getElementById('pix-panel').hidden=true;
    pixStep('pix-form');
    document.getElementById('pix-error').textContent='';
  }
  function pixCheck(){
    pixTimer=setTimeout(async function(){
      pixTimer=0;
      if(!pixPedido)return;
      pixTentativa+=1;
      var confirmado=false;
      try{
        var response=await fetch('/api/criador/pagamento',{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify({pedido:pixPedido})});
        var result=await response.json();
        if(response.ok&&result&&result.confirmado)confirmado=true;
      }catch(failure){/* tenta de novo na próxima rodada */}
      if(!pixPedido)return;
      if(confirmado){
        document.getElementById('pix-done-text').textContent='O Mercado Pago confirmou o Pix. Ambiente de teste: nenhuma cobrança real foi feita. A entrega continua desativada nesta versão.';
        pixStep('pix-done');
        return;
      }
      if(pixTentativa>=200){
        document.getElementById('pix-status').textContent='Tempo esgotado para esta tentativa. Gere um novo Pix se ainda quiser pagar.';
        return;
      }
      pixCheck();
    },3000);
  }
  document.getElementById('pix-open').addEventListener('click',function(){
    var panel=document.getElementById('pix-panel');
    if(panel.hidden){panel.hidden=false;pixStep('pix-form');document.getElementById('pix-email').focus();}
    else closePix();
  });
  document.getElementById('pix-doc').addEventListener('input',function(){
    this.value=this.value.replace(/\D/g,'').slice(0,14);
  });
  document.getElementById('pix-pay').addEventListener('click',async function(){
    var button=this;var box=document.getElementById('pix-error');
    var email=document.getElementById('pix-email').value.trim();
    var digits=document.getElementById('pix-doc').value.replace(/\D/g,'');
    box.textContent='';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){box.textContent='Informe um e-mail válido para o comprovante.';return;}
    if(digits.length!==11&&digits.length!==14){box.textContent='Informe o CPF (11 números) ou o CNPJ (14 números) de quem paga.';return;}
    button.disabled=true;button.textContent='Falando com o Mercado Pago…';
    try{
      var response=await fetch('/api/criador/pagar',{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({produto:product(),email:email,documento:{type:digits.length===11?'CPF':'CNPJ',number:digits}})});
      var result=await response.json();
      if(!response.ok)throw new Error(result.erro||'Não foi possível gerar o Pix.');
      if(!result.qr_imagem&&!result.qr_code)throw new Error('O Mercado Pago não devolveu o QR agora. Aguarde alguns segundos e tente de novo.');
      pixPedido=result.pedido;
      var image=document.getElementById('pix-img');
      if(result.qr_imagem){image.src=result.qr_imagem;image.hidden=false;}
      else{image.removeAttribute('src');image.hidden=true;}
      document.getElementById('pix-code').value=result.qr_code||'';
      document.getElementById('pix-valor').textContent='Valor: R$ '+Number(result.valor_cents/100).toLocaleString('pt-BR')+(result.modo==='teste'?' — modo teste, nenhuma cobrança real':'');
      pixStep('pix-qr');
      pixCheck();
    }catch(failure){box.textContent=failure.message;}
    finally{button.disabled=false;button.textContent='Gerar Pix';}
  });
  document.getElementById('pix-copy').addEventListener('click',async function(){
    var code=document.getElementById('pix-code');var button=this;
    try{
      if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(code.value);
      else{code.select();document.execCommand('copy');}
      button.textContent='Código copiado ✓';
      setTimeout(function(){button.textContent='Copiar código Pix';},2000);
    }catch(failure){
      code.select();
      document.getElementById('pix-status').textContent='Não foi possível copiar automaticamente. O código está selecionado — use Ctrl+C.';
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
      var tituloItens=kind==='site'?'O que oferecemos':kind==='portfolio'?'Projetos e trabalhos':'Objetivo e atividades de interesse';
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
      bloco('Experiências e atividades',form.elements.experiencia.value);
      bloco('Formação e cursos',form.elements.formacao.value);
      bloco('Habilidades',form.elements.habilidades.value);
    }else if(kind==='portfolio'){
      bloco('Trajetória',form.elements.experiencia.value);
      bloco('Formação e cursos',form.elements.formacao.value);
      bloco('Habilidades',form.elements.habilidades.value);
    }
    bloco('Contato',form.elements.contato.value);
    return out.join('');
  }
  function previewLocalHtml(){
    /* Sem servidor local (site publicado): monta a prévia no navegador, com a
       mesma estrutura do render_document do servidor. */
    var kind=product();
    var modelo=form.querySelector('input[name="modelo"]:checked').value;
    var nome=form.elements.nome.value;
    var avatar=(kind==='curriculo'&&photos.length)?'<img class="avatar" src="'+escLive(photos[0].uri)+'" alt="'+escLive(photos[0].legenda||'Foto de exemplo')+'">':'';
    var header='<header>'+avatar+'<p class="subtitle">'+escLive(form.elements.titulo.value)+'</p><h1>'+escLive(nome)+'</h1><p class="text">'+escLive(form.elements.apresentacao.value)+'</p></header>';
    var notice='<aside class="preview">PRÉVIA DE TESTE MOSS DIGITAL · NÃO PUBLICADO · NÃO É COMPROVANTE DE COMPRA</aside>';
    var footer='<footer>Prévia criada com informações de teste. Pagamento e entrega final ainda não ativados.</footer>';
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
    var assinatura=avatar+'|'+secoes;
    var main=doc.querySelector('main');
    if(assinatura!==liveAssinatura){
      var antes=main.querySelectorAll('.gallery figure').length;
      liveAssinatura=assinatura;
      main.innerHTML='<header>'+avatar+'<p class="subtitle" id="l-titulo"></p><h1 id="l-nome"></h1><p class="text" id="l-apresentacao"></p></header>'+secoes;
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
  form.addEventListener('input',agendarSync,true);
  form.addEventListener('change',agendarSync,true);
  form.addEventListener('click',agendarSync,true);
  document.getElementById('creator').hidden=false;
}());
