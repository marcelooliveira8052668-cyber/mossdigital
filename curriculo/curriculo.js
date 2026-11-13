/* MOSS Currículo — dados locais, modelos originais e PDF pesquisável. */
"use strict";
window.MossCurriculo = (() => {
  const MAX = 5 * 1024 * 1024;
  const MODELOS = ['classico','lateral','topo','minimal','moldura','blocos','semfoto','executivo','trajetoria','retrato'];
  const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const slug = v => String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,50) || 'curriculo';
  const limites = { nome:100, titulo:100, email:254, telefone:30, cidade:100, linkedin:250, resumo:600, habilidades:300, idiomas:200, cursos:500, atividades:700, informacoes:400 };
  function pacote(dados) { return { tipo:'moss-curriculo', versao:1, criadoEm:new Date().toISOString(), dados }; }
  function validar(arquivo) {
    if (!arquivo || arquivo.tipo !== 'moss-curriculo' || arquivo.versao !== 1 || !arquivo.dados) throw Error('Escolha um arquivo de pedido de currículo MOSS (.json), não o pedido de portfólio ou o PDF.');
    const s = arquivo.dados;
    if (!['profissional','primeiro-emprego'].includes(s.publico) || !MODELOS.includes(s.modelo)) throw Error('Tipo de currículo ou modelo inválido.');
    const d = { publico:s.publico, modelo:s.modelo, cor:/^#[\da-f]{6}$/i.test(s.cor) ? s.cor : '#075985', foto:null };
    for (const [campo,max] of Object.entries(limites)) {
      if (typeof s[campo] !== 'string' || s[campo].length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(s[campo])) throw Error('Campo inválido: ' + campo);
      d[campo] = s[campo].trim();
    }
    if (!d.nome || !d.titulo) throw Error('Preencha seu nome e a profissão ou vaga desejada.');
    if (!d.email && !d.telefone) throw Error('Informe pelo menos um contato: e-mail ou telefone.');
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) throw Error('Confira o e-mail informado.');
    if (d.telefone && !/^\+?[\d\s().-]+$/.test(d.telefone)) throw Error('Confira o telefone informado.');
    if (d.telefone && (d.telefone.replace(/\D/g,'').length < 8 || d.telefone.replace(/\D/g,'').length > 15)) throw Error('Informe um telefone válido, com DDD.');
    if (d.linkedin) {
      try { const u = new URL(/^https?:\/\//i.test(d.linkedin) ? d.linkedin : 'https://' + d.linkedin); if (!['https:','http:'].includes(u.protocol)) throw Error(); d.linkedin = u.href; }
      catch { throw Error('Informe um link completo e válido.'); }
    }
    for (const [nome,max,campos] of [['experiencias',4,{cargo:100,empresa:100,periodo:70,descricao:600}],['formacao',3,{curso:120,instituicao:120,periodo:70,detalhes:300}]]) {
      if (!Array.isArray(s[nome]) || s[nome].length > max) throw Error('Quantidade inválida de ' + nome + '.');
      d[nome] = s[nome].map(item => {
        if (!item || typeof item !== 'object') throw Error('Item inválido.');
        const limpo = {};
        for (const [campo,limite] of Object.entries(campos)) {
          if (typeof item[campo] !== 'string' || item[campo].length > limite) throw Error('Campo inválido em ' + nome + ': ' + campo);
          limpo[campo] = item[campo].trim();
        }
        return limpo;
      }).filter(item => Object.values(item).some(Boolean));
    }
    if (d.publico === 'primeiro-emprego') d.experiencias = [];
    if (s.foto != null) {
      if (typeof s.foto !== 'string' || s.foto.length > MAX || !/^data:image\/(jpeg|png|webp);base64,[\da-z+/]+={0,2}$/i.test(s.foto)) throw Error('Foto inválida. Use JPEG, PNG ou WebP de até 3 MB.');
      d.foto = s.foto;
    }
    return d;
  }
  function baixar(blob,nome) {
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href=url; a.download=nome; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url),60000);
  }
  function blocos(d) {
    const lista = [];
    if (d.resumo) lista.push({titulo:d.publico==='primeiro-emprego'?'Objetivo e apresentação':'Resumo profissional',itens:[{texto:d.resumo}]});
    const educacao = {titulo:'Formação',itens:d.formacao.map(f=>({titulo:f.curso,sub:[f.instituicao,f.periodo].filter(Boolean).join(' | '),texto:f.detalhes}))};
    if (d.publico==='primeiro-emprego' && educacao.itens.length) lista.push(educacao);
    if (d.experiencias.length) lista.push({titulo:'Experiência profissional',itens:d.experiencias.map(e=>({titulo:e.cargo,sub:[e.empresa,e.periodo].filter(Boolean).join(' | '),texto:e.descricao}))});
    if (d.publico!=='primeiro-emprego' && educacao.itens.length) lista.push(educacao);
    for (const [campo,titulo] of [['atividades','Projetos e atividades'],['cursos','Cursos e certificações'],['habilidades','Habilidades'],['idiomas','Idiomas'],['informacoes','Informações adicionais']]) {
      if (d[campo]) lista.push({titulo,itens:[{texto:d[campo]}]});
    }
    return lista;
  }
  function render(d) {
    const contatos = [d.email,d.telefone,d.cidade,d.linkedin].filter(Boolean);
    const cls = {lateral:'lateral',topo:'topo',minimal:'minimal',moldura:'moldura',blocos:'blocos',semfoto:'semfoto',executivo:'executivo',trajetoria:'trajetoria',retrato:'retrato'}[d.modelo] || '';
    // O modelo "Sem foto" ignora a imagem enviada: é a característica dele.
    const foto = d.modelo==='semfoto' ? null : d.foto;
    // Ajustes visuais próprios de cada modelo (o CSS base vale para todos).
    const css = {
      topo:`.topo header{background:${d.cor};color:#fff;border:0;margin:-36px -36px 24px;padding:34px 36px 28px}.topo h1,.topo .cargo{color:#fff}.topo .contatos{color:rgba(255,255,255,.92)}.topo .foto{border:2px solid rgba(255,255,255,.75)}`,
      minimal:`.minimal{text-align:center}.minimal header{border:0;border-bottom:1px solid #d1d5db;padding-bottom:16px}.minimal h1{color:#1f2937;font-size:24px;letter-spacing:1.5px;text-transform:uppercase}.minimal .cargo{color:#4b5563}.minimal .contatos{color:#6b7280}.minimal .foto{float:none;display:block;margin:0 auto 14px;border-radius:50%}.minimal h2{color:${d.cor};border-bottom:1px solid #e5e7eb;text-transform:uppercase;font-size:12px;letter-spacing:1.4px}`,
      moldura:`main.moldura{border:3px solid ${d.cor};margin:20px auto}.moldura header{text-align:center;border-bottom:2px solid ${d.cor}}.moldura .foto{float:none;display:block;margin:0 auto 12px}`,
      blocos:`.blocos h2{background:${d.cor};color:#fff;border:0;padding:5px 10px;border-radius:3px;font-size:15px}`,
      semfoto:`.semfoto{counter-reset:secao}.semfoto h1{font-size:27px;letter-spacing:-.4px;color:#1f2937}.semfoto header{border-bottom:0;padding-bottom:6px}.semfoto .cargo{color:${d.cor}}.semfoto h2{counter-increment:secao;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#334155;border:0;border-top:1px solid ${d.cor}33;padding-top:14px;margin-top:24px}.semfoto h2::before{content:counter(secao,decimal-leading-zero);color:${d.cor};margin-right:9px;font-weight:800}`,
      executivo:`.executivo header{border-bottom:0;padding-bottom:0}.executivo h1{color:#1f2937}.executivo .cargo{color:${d.cor};font-weight:600}.executivo header::after{content:"";display:block;width:120px;height:5px;background:${d.cor};border-radius:3px;margin:14px 0 16px}.executivo .contatos{background:#f1f5f9;border:1px solid #d8e0e8;border-left:4px solid ${d.cor};border-radius:0 8px 8px 0;padding:10px 14px;display:inline-block;margin-top:4px}.executivo h2{font-size:12px;letter-spacing:.16em;text-transform:uppercase;border:0;border-top:1.5px solid #d8e0e8;padding-top:16px;margin-top:26px}`,
      trajetoria:`.trajetoria{position:relative}.trajetoria::before{content:"";position:absolute;left:17px;top:62px;bottom:30px;width:3px;background:${d.cor};opacity:.45;border-radius:2px}.trajetoria h2{position:relative;border:0;padding-left:36px;margin:28px 0 6px;font-size:15px}.trajetoria h2::before{content:"";position:absolute;left:-24px;top:3px;width:13px;height:13px;border-radius:50%;background:${d.cor};box-shadow:0 0 0 3.5px #fff}.trajetoria article{position:relative;padding-left:36px}`,
      retrato:`.retrato{border-left:9px solid ${d.cor};padding-left:34px}.retrato header{border-bottom:0}.retrato h1{font-size:34px;line-height:1.05}.retrato .foto{float:right;width:118px;height:138px;margin:0 0 10px 20px;border-radius:16px;border:3px solid ${d.cor}}.retrato header::after{content:"";display:block;width:92px;height:4px;background:${d.cor};border-radius:2px;margin-top:12px}.retrato h2{font-size:14px;display:flex;align-items:center;gap:8px;border:0}.retrato h2::before{content:"";width:9px;height:9px;background:${d.cor};border-radius:2px;flex:0 0 auto}`
    }[d.modelo] || '';
    return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><style>*{box-sizing:border-box}body{margin:0;font:14px/1.55 Arial,sans-serif;color:#253341;background:#fff;overflow-wrap:anywhere}main{max-width:794px;margin:auto;min-height:1050px;padding:36px}h1{font-size:29px;line-height:1.15;margin:0 0 7px;color:${d.cor}}.cargo{font-size:16px;margin:0 0 15px}header{border-bottom:2px solid ${d.cor};padding-bottom:20px;margin-bottom:23px}.contatos{font-size:12px;white-space:pre-line}h2{font-size:17px;color:${d.cor};border-bottom:1px solid #dce3e8;padding-bottom:5px;margin:24px 0 10px}h3{font-size:14px;margin:10px 0 4px}.sub{font-size:12px;color:#586776}p{margin:7px 0;white-space:pre-line}.foto{width:95px;height:110px;object-fit:contain;float:right;margin:0 0 12px 16px;border-radius:6px}.lateral{display:grid;grid-template-columns:28% 72%;padding:0}.lateral aside{background:${d.cor};color:white;padding:27px 17px}.lateral aside h1{color:white;font-size:24px}.lateral aside .foto{float:none;display:block;width:100%;height:140px;margin:16px 0}.lateral section{padding:27px}.lateral header{border:0}.lateral aside .contatos{font-size:12px}article{break-inside:avoid}${css}</style></head><body><main class="${cls}">${d.modelo==='lateral'?'<aside>':''}<header>${foto?`<img class="foto" src="${esc(foto)}" alt="Foto opcional de ${esc(d.nome)}">`:''}<h1>${esc(d.nome||'Seu nome')}</h1><p class="cargo">${esc(d.titulo||'Sua profissão ou vaga desejada')}</p><div class="contatos">${contatos.map(esc).join('\n')}</div></header>${d.modelo==='lateral'?'</aside><section>':''}${blocos(d).map(b=>`<h2>${esc(b.titulo)}</h2>${b.itens.map(i=>`<article>${i.titulo?`<h3>${esc(i.titulo)}</h3>`:''}${i.sub?`<p class="sub">${esc(i.sub)}</p>`:''}${i.texto?`<p>${esc(i.texto)}</p>`:''}</article>`).join('')}`).join('')}${d.modelo==='lateral'?'</section>':''}</main></body></html>`;
  }
  async function fotoJPEG(src) {
    if (!src) return null;
    const img=new Image(); img.src=src;
    try { await img.decode(); } catch { throw Error('Não foi possível abrir a foto. Escolha outra imagem e gere o pedido novamente.'); }
    const canvas=document.createElement('canvas');canvas.width=300;canvas.height=350;
    const c=canvas.getContext('2d');c.fillStyle='#fff';c.fillRect(0,0,300,350);
    const escala=Math.min(300/img.width,350/img.height),w=img.width*escala,h=img.height*escala;
    c.drawImage(img,(300-w)/2,(350-h)/2,w,h);return canvas.toDataURL('image/jpeg',0.9);
  }
  async function pdf(dados,previa=true) {
    const d=validar(pacote(dados));
    if (!window.jspdf?.jsPDF || !window.MOSS_CV_FONTS) throw Error('A biblioteca do PDF não carregou. Atualize a página e tente novamente.');
    const doc=new window.jspdf.jsPDF({unit:'mm',format:'a4',compress:true});
    for (const [estilo,nome] of [['normal','regular'],['bold','bold']]) {
      const file='NotoSans-'+nome+'.ttf';doc.addFileToVFS(file,window.MOSS_CV_FONTS[nome]);doc.addFont(file,'NotoSans',estilo);
    }
    doc.setFont('NotoSans','normal');
    doc.setProperties({title:(previa?'Prévia - ':'')+'Currículo - '+d.nome,author:d.nome,subject:'Currículo profissional'});
    const semFoto=d.modelo==='semfoto';
    const imagem=semFoto?null:await fotoJPEG(d.foto);
    const lateral=d.modelo==='lateral', topo=d.modelo==='topo', minimal=d.modelo==='minimal', moldura=d.modelo==='moldura', emBlocos=d.modelo==='blocos', executivo=d.modelo==='executivo', trajetoria=d.modelo==='trajetoria', retrato=d.modelo==='retrato';
    const x=lateral?69:(retrato?17:15), largura=lateral?126:(retrato?178:180);
    let y=18;
    function texto(valor,tamanho=10,negrito=false,cor='#253341',xx=x,ww=largura,align='left') {
      if(!valor)return;
      const ax=align==='center'?xx+ww/2:align==='right'?xx+ww:xx;
      doc.setFont('NotoSans',negrito?'bold':'normal');doc.setFontSize(tamanho);doc.setTextColor(cor);
      const linhas=doc.splitTextToSize(String(valor).replace(/[–—]/g,'-'),ww);
      const altura=tamanho*0.3528*1.45;
      for(const linha of linhas){if(y+altura>279){doc.addPage();y=18;desenharLateral();doc.setFont('NotoSans',negrito?'bold':'normal');doc.setFontSize(tamanho);doc.setTextColor(cor);}doc.text(linha,ax,y,{align});y+=altura;}
    }
    function desenharLateral(){
      if(!lateral)return;
      doc.setFillColor(d.cor);doc.rect(0,0,60,297,'F');
      let yy=18;
      function bloco(v,size=9,bold=false){if(!v)return;doc.setFont('NotoSans',bold?'bold':'normal');doc.setFontSize(size);doc.setTextColor('#ffffff');const linhas=doc.splitTextToSize(v,48);for(const l of linhas){if(yy>265)throw Error('Os contatos excedem a coluna lateral. Reduza os textos ou escolha o modelo Essencial para preservar todos os dados.');doc.text(l,6,yy);yy+=size*0.48;}yy+=4;}
      bloco(d.nome,16,true);bloco(d.titulo,10);
      if(imagem){doc.addImage(imagem,'JPEG',7,yy,45,52);yy+=58;}
      bloco('CONTATO',10,true);[d.telefone,d.email,d.cidade,d.linkedin].filter(Boolean).forEach(v=>bloco(v,8));
    }
    desenharLateral();
    const contatos=[d.email,d.telefone,d.cidade,d.linkedin].filter(Boolean).join('\n');
    if(topo){
      // Faixa colorida no topo da primeira página; as demais páginas ficam limpas.
      doc.setFillColor(d.cor);doc.rect(0,0,210,56,'F');
      if(imagem)doc.addImage(imagem,'JPEG',166,10,28,33);
      y=23;texto(d.nome,22,true,'#ffffff',x,imagem?145:largura);texto(d.titulo,12,false,'#ffffff',x,imagem?145:largura);
      y=70;texto(contatos,9,false,'#526170');
      if(imagem)y=Math.max(y,74);
    } else if(minimal){
      // Cabeçalho centralizado, sem cor de bloco: elegância discreta.
      if(imagem)doc.addImage(imagem,'JPEG',91,14,28,33);
      y=imagem?58:26;
      texto(d.nome,20,true,'#1f2937',x,largura,'center');texto(d.titulo,11,false,'#4b5563',x,largura,'center');
      texto(contatos.replace(/\n/g,'  ·  '),8.5,false,'#6b7280',x,largura,'center');
      y+=3;doc.setDrawColor('#d1d5db');doc.setLineWidth(.3);doc.line(x+45,y,x+largura-45,y);y+=7;
    } else if(executivo){
      // Cabeçalho corporativo: nome em tinta, barra de destaque e contatos em tarja.
      if(imagem)doc.addImage(imagem,'JPEG',166,16,28,33);
      texto(d.nome,22,true,'#1f2937',x,imagem?145:largura);
      texto(d.titulo,12,true,d.cor,x,imagem?145:largura);
      y+=2;doc.setFillColor(d.cor);doc.rect(x,y,46,2.6,'F');y+=8;
      const linhas=[];
      for(const l of String(contatos).split('\n').filter(Boolean)) for(const p of doc.splitTextToSize(l,largura-14)) linhas.push(p);
      if(linhas.length){
        const caixa=linhas.length*4.6+7;
        doc.setFillColor('#f1f5f9');doc.setDrawColor('#d8e0e8');doc.setLineWidth(.3);doc.rect(x,y-3.5,largura,caixa,'FD');
        doc.setFillColor(d.cor);doc.rect(x,y-3.5,1.8,caixa,'F');
        doc.setFont('NotoSans','normal');doc.setFontSize(9);doc.setTextColor('#46536a');
        let cy=y+1.4;
        for(const p of linhas){doc.text(p,x+6.5,cy);cy+=4.6;}
        y=y-3.5+caixa+7;
      }
      if(imagem)y=Math.max(y,55);
    } else if(retrato){
      // Capa: faixa colorida à esquerda, foto grande e nome em destaque.
      doc.setFillColor(d.cor);doc.rect(0,0,8,297,'F');
      if(imagem)doc.addImage(imagem,'JPEG',150,14,44,54);
      texto(d.nome,24,true,d.cor,x,imagem?128:largura);
      texto(d.titulo,13,false,'#253341',x,imagem?128:largura);
      y+=2;doc.setFillColor(d.cor);doc.rect(x,y,54,2.4,'F');y+=9;
      for(const l of String(contatos).split('\n').filter(Boolean)) texto(l,9,false,'#526170',x,largura);
      if(imagem)y=Math.max(y,56);
    } else if(semFoto){
      // Modelo Sem foto: cabeçalho enxuto em tinta, sem espaço reservado à imagem.
      texto(d.nome,26,true,'#1f2937',x,largura);
      texto(d.titulo,12,false,d.cor,x,largura);
      y+=1;
      texto(String(contatos).replace(/\n/g,'  ·  '),9,false,'#64748b',x,largura);
      y+=2;doc.setDrawColor(d.cor);doc.setLineWidth(.6);doc.line(x,y,x+58,y);y+=6;
    } else if(!lateral){
      const al=moldura?'center':'left', ww=moldura?largura:(imagem?145:largura);
      if(imagem&&moldura){doc.addImage(imagem,'JPEG',91,14,28,33);y=56;}
      else if(imagem)doc.addImage(imagem,'JPEG',166,16,28,33);
      texto(d.nome,22,true,d.cor,x,ww,al);texto(d.titulo,12,false,d.cor,x,ww,al);
      texto(contatos,9,false,'#526170',x,ww,al);
      if(imagem&&!moldura)y=Math.max(y,55);
    }
    let marcaY=null, marcaPg=0;
    for(const [bi,b] of blocos(d).entries()){
      if(y>252){doc.addPage();y=18;desenharLateral();}
      y+=6;
      if(emBlocos){ // Modelo Blocos: título com fundo colorido.
        doc.setFont('NotoSans','bold');doc.setFontSize(13);
        const w=Math.min(doc.getTextWidth(b.titulo)+8,largura);
        doc.setFillColor(d.cor);doc.rect(x,y-4.6,w,6.9,'F');
        texto(b.titulo,13,true,'#ffffff');
      } else if(semFoto){ // Modelo Sem foto: seções numeradas.
        doc.setFont('NotoSans','bold');doc.setFontSize(9);doc.setTextColor(d.cor);
        doc.text(String(bi+1).padStart(2,'0'),x,y);
        texto(b.titulo.toUpperCase(),11,true,'#334155',x+8,largura-8);
      } else if(executivo){ // Modelo Executivo: fio superior e título em caixa alta.
        doc.setDrawColor('#d8e0e8');doc.setLineWidth(.4);doc.line(x,y+1.6,x+largura,y+1.6);
        texto(b.titulo.toUpperCase(),11,true,d.cor);
      } else if(trajetoria){ // Modelo Trajetória: marcadores ligados por uma linha vertical.
        const pg=doc.getCurrentPageInfo().pageNumber, px=x-6;
        if(marcaY!==null){doc.setDrawColor(d.cor);doc.setLineWidth(.7);doc.line(px,marcaPg===pg?marcaY:18,px,y-1.5);}
        doc.setFillColor(d.cor);doc.circle(px,y-1.5,1.7,'F');
        marcaY=y-1.5;marcaPg=pg;
        texto(b.titulo,13,true,d.cor);
      } else if(retrato){ // Modelo Retrato: marcador quadrado ao lado do título.
        doc.setFillColor(d.cor);doc.rect(x,y-3.4,2.6,2.6,'F');
        texto(b.titulo,13,true,d.cor,x+6,largura-6);
      } else texto(b.titulo,13,true,d.cor);
      y+=1;
      for(const i of b.itens){if(i.titulo)texto(i.titulo,10,true);if(i.sub)texto(i.sub,9,false,'#526170');if(i.texto)texto(i.texto);y+=4;}
    }
    const paginas=doc.getNumberOfPages();
    for(let p=1;p<=paginas;p++){
      doc.setPage(p);
      // Moldura desenhada em todas as páginas; faixa colorida só nas seguintes.
      if(moldura){doc.setDrawColor(d.cor);doc.setLineWidth(.7);doc.rect(7,7,196,283);}
      if(topo&&p>1){doc.setFillColor(d.cor);doc.rect(0,0,210,7,'F');}
      if(retrato&&p>1){doc.setFillColor(d.cor);doc.rect(0,0,210,7,'F');}
      doc.setFont('NotoSans','normal');doc.setFontSize(8);doc.setTextColor('#526170');
      if(paginas>1)doc.text(`${p} / ${paginas}`,195,289,{align:'right'});
      if(previa){doc.saveGraphicsState();doc.setGState(new doc.GState({opacity:0.24}));doc.setTextColor('#b91c1c');doc.setFontSize(23);doc.text('PRÉVIA - MOSS DIGITAL',105,145,{align:'center',angle:30});doc.restoreGraphicsState();doc.setFontSize(8);doc.setTextColor('#b91c1c');doc.text('DEMONSTRAÇÃO - NÃO É O ARQUIVO FINAL',x,289);}
    }
    return doc.output('blob');
  }
  return {MAX,esc,slug,pacote,validar,render,pdf,baixar,limites};
})();
