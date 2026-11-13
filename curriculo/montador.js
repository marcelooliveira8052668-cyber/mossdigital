"use strict";
(() => {
  const form=document.getElementById('cv-form'); if(!form)return;
  const api=window.MossCurriculo,$=id=>document.getElementById(id);
  let foto=null, fotoLendo=false, versaoFoto=0, ocupado=false;
  const status=t=>{$('cv-status').textContent=t;};
  // Cor padrão e nome de apresentação de cada modelo.
  const CORES_MODELO={classico:'#166534',lateral:'#075985',topo:'#0f766e',minimal:'#374151',moldura:'#1d4ed8',blocos:'#b91c1c',semfoto:'#334155',executivo:'#4338ca',trajetoria:'#7c3aed',retrato:'#b45309'};
  const NOMES_MODELO={classico:'Essencial',lateral:'Destaque',topo:'Faixa',minimal:'Minimalista',moldura:'Moldura',blocos:'Blocos',semfoto:'Sem foto',executivo:'Executivo',trajetoria:'Trajetória',retrato:'Retrato'};
  function linha(tipo){
    const el=document.createElement('div');el.className='item';
    const campos=tipo==='experiencias'?[['cargo','Cargo',100],['empresa','Empresa',100],['periodo','Período (ex.: 2023–2025)',70],['descricao','Atividades e resultados verdadeiros',600]]:[['curso','Curso ou escolaridade',120],['instituicao','Instituição',120],['periodo','Período ou previsão de conclusão',70],['detalhes','Detalhes da formação (opcional)',300]];
    campos.forEach(([nome,label,max])=>{const input=document.createElement(nome==='descricao'||nome==='detalhes'?'textarea':'input');input.dataset.campo=nome;input.maxLength=max;input.placeholder=label;input.setAttribute('aria-label',label);if(input.tagName==='TEXTAREA')input.rows=3;el.append(input);});
    const remover=document.createElement('button');remover.type='button';remover.className='secundario';remover.textContent='Remover';remover.addEventListener('click',()=>{el.remove();atualizar();});el.append(remover);
    $('cv-'+tipo).append(el);atualizar();
  }
  function coletar(){
    const d={};Object.keys(api.limites).forEach(k=>{d[k]=$('cv-'+k).value.trim();});
    d.publico=form.querySelector('[name=publico]:checked').value;d.modelo=form.querySelector('[name=modelo]:checked').value;d.cor=$('cv-cor').value;d.foto=foto;
    for(const nome of ['experiencias','formacao'])d[nome]=Array.from($('cv-'+nome).children).map(el=>Object.fromEntries(Array.from(el.querySelectorAll('[data-campo]')).map(i=>[i.dataset.campo,i.value.trim()]))).filter(i=>Object.values(i).some(Boolean));
    if(d.publico==='primeiro-emprego')d.experiencias=[];return d;
  }
  function atualizar(){
    const d=coletar();$('cv-exp-grupo').hidden=d.publico==='primeiro-emprego';
    $('cv-add-exp').disabled=$('cv-experiencias').children.length>=4;$('cv-add-form').disabled=$('cv-formacao').children.length>=3;
    $('cv-visual').srcdoc=api.render(d);
  }
  function preparar(){if(fotoLendo)throw Error('Aguarde a foto terminar de carregar.');return api.validar(api.pacote(coletar()));}
  form.addEventListener('submit',e=>e.preventDefault());
  form.querySelectorAll('[name=modelo]').forEach(input=>input.addEventListener('change',()=>{$('cv-cor').value=CORES_MODELO[input.value]||'#166534';atualizar();}));
  let timer;form.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(atualizar,150);});form.addEventListener('change',atualizar);
  $('cv-add-exp').addEventListener('click',()=>{if($('cv-experiencias').children.length<4)linha('experiencias');});
  $('cv-add-form').addEventListener('click',()=>{if($('cv-formacao').children.length<3)linha('formacao');});
  $('cv-foto').addEventListener('change',async e=>{
    const v=++versaoFoto,file=e.target.files[0];fotoLendo=false;if(!file)return;
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>3*1024*1024){status('Escolha JPEG, PNG ou WebP de até 3 MB. A foto anterior, se houver, foi mantida.');e.target.value='';return;}
    fotoLendo=true;status('Carregando foto...');
    try{const valor=await new Promise((r,j)=>{const reader=new FileReader();reader.onload=()=>r(reader.result);reader.onerror=()=>j(Error('Não foi possível ler a foto.'));reader.readAsDataURL(file);});const img=new Image();img.src=valor;await img.decode();if(v!==versaoFoto)return;foto=valor;$('cv-remover-foto').hidden=false;status('Foto adicionada apenas à prévia local. Nada foi enviado.');atualizar();}catch{if(v===versaoFoto)status('Não foi possível abrir esta foto. Escolha outra imagem.');}finally{if(v===versaoFoto)fotoLendo=false;}
  });
  $('cv-remover-foto').addEventListener('click',()=>{versaoFoto++;fotoLendo=false;foto=null;$('cv-foto').value='';$('cv-remover-foto').hidden=true;atualizar();status('Foto removida da prévia. Baixe novamente os arquivos se já havia baixado.');});
  $('cv-previa').addEventListener('click',async()=>{
    if(ocupado)return;
    try{const d=preparar();ocupado=true;$('cv-previa').disabled=true;status('Gerando prévia com marca-d’água...');const blob=await api.pdf(d,true);api.baixar(blob,'previa-curriculo-'+api.slug(d.nome)+'.pdf');status('Prévia gerada! Baixe também o arquivo do pedido (.json) e anexe os dois no WhatsApp. Nada foi enviado à MOSS.');}catch(e){status(e.message);}finally{ocupado=false;$('cv-previa').disabled=false;}
  });
  $('cv-pedido').addEventListener('click',()=>{try{const d=preparar();api.baixar(new Blob([JSON.stringify(api.pacote(d))],{type:'application/json'}),'pedido-curriculo-'+api.slug(d.nome)+'.json');status('Arquivo do pedido gerado com dados e foto. Ele não é o PDF. Anexe-o como Documento no WhatsApp, junto com a prévia.');}catch(e){status(e.message);}});
  $('cv-whats').addEventListener('click',()=>{try{const d=preparar();const texto=`Olá! Montei meu currículo na MOSS Digital.\nNome: ${d.nome}\nVaga/área: ${d.titulo}\nTipo: ${d.publico}\nModelo: ${NOMES_MODELO[d.modelo]||d.modelo}\nValor: R$ 19,90.\nVou anexar manualmente a prévia PDF e o arquivo do pedido (.json). Favor confirmar prazo, pagamento e entrega antes de finalizar.`;window.open('https://wa.me/5511942038103?text='+encodeURIComponent(texto),'_blank','noopener,noreferrer');status('Confira a conversa, anexe o PDF e o pedido JSON como Documentos e toque em Enviar. Nenhum arquivo foi anexado automaticamente.');}catch(e){status(e.message);}});
  atualizar();linha('experiencias');linha('formacao');
})();
