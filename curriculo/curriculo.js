/* MOSS Currículo — dados locais, modelos originais e PDF pesquisável. */
"use strict";
window.MossCurriculo = (() => {
  const MAX = 5 * 1024 * 1024;
  const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const slug = v => String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,50) || 'curriculo';
  const limites = { nome:100, titulo:100, email:254, telefone:30, cidade:100, linkedin:250, resumo:600, habilidades:300, idiomas:200, cursos:500, atividades:700, informacoes:400 };
  function pacote(dados) { return { tipo:'moss-curriculo', versao:1, criadoEm:new Date().toISOString(), dados }; }
  function validar(arquivo) {
    if (!arquivo || arquivo.tipo !== 'moss-curriculo' || arquivo.versao !== 1 || !arquivo.dados) throw Error('Escolha um arquivo de pedido de currículo MOSS (.json), não o pedido de portfólio ou o PDF.');
    const s = arquivo.dados;
    if (!['profissional','primeiro-emprego'].includes(s.publico) || !['classico','lateral'].includes(s.modelo)) throw Error('Tipo de currículo ou modelo inválido.');
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
    return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><style>*{box-sizing:border-box}body{margin:0;font:14px/1.55 Arial,sans-serif;color:#253341;background:#fff;overflow-wrap:anywhere}main{max-width:794px;margin:auto;min-height:1050px;padding:36px}h1{font-size:29px;line-height:1.15;margin:0 0 7px;color:${d.cor}}.cargo{font-size:16px;margin:0 0 15px}header{border-bottom:2px solid ${d.cor};padding-bottom:20px;margin-bottom:23px}.contatos{font-size:12px;white-space:pre-line}h2{font-size:17px;color:${d.cor};border-bottom:1px solid #dce3e8;padding-bottom:5px;margin:24px 0 10px}h3{font-size:14px;margin:10px 0 4px}.sub{font-size:12px;color:#586776}p{margin:7px 0;white-space:pre-line}.foto{width:95px;height:110px;object-fit:contain;float:right;margin:0 0 12px 16px;border-radius:6px}.lateral{display:grid;grid-template-columns:28% 72%;padding:0}.lateral aside{background:${d.cor};color:white;padding:27px 17px}.lateral aside h1{color:white;font-size:24px}.lateral aside .foto{float:none;display:block;width:100%;height:140px;margin:16px 0}.lateral section{padding:27px}.lateral header{border:0}.lateral aside .contatos{font-size:12px}article{break-inside:avoid}</style></head><body><main class="${d.modelo==='lateral'?'lateral':''}">${d.modelo==='lateral'?'<aside>':''}<header>${d.foto?`<img class="foto" src="${esc(d.foto)}" alt="Foto opcional de ${esc(d.nome)}">`:''}<h1>${esc(d.nome||'Seu nome')}</h1><p class="cargo">${esc(d.titulo||'Sua profissão ou vaga desejada')}</p><div class="contatos">${contatos.map(esc).join('\n')}</div></header>${d.modelo==='lateral'?'</aside><section>':''}${blocos(d).map(b=>`<h2>${esc(b.titulo)}</h2>${b.itens.map(i=>`<article>${i.titulo?`<h3>${esc(i.titulo)}</h3>`:''}${i.sub?`<p class="sub">${esc(i.sub)}</p>`:''}${i.texto?`<p>${esc(i.texto)}</p>`:''}</article>`).join('')}`).join('')}${d.modelo==='lateral'?'</section>':''}</main></body></html>`;
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
    const imagem=await fotoJPEG(d.foto), lateral=d.modelo==='lateral', x=lateral?69:15, largura=lateral?126:180;
    let y=18;
    function texto(valor,tamanho=10,negrito=false,cor='#253341',xx=x,ww=largura) {
      if(!valor)return;
      doc.setFont('NotoSans',negrito?'bold':'normal');doc.setFontSize(tamanho);doc.setTextColor(cor);
      const linhas=doc.splitTextToSize(String(valor).replace(/[–—]/g,'-'),ww);
      const altura=tamanho*0.3528*1.45;
      for(const linha of linhas){if(y+altura>279){doc.addPage();y=18;desenharLateral();doc.setFont('NotoSans',negrito?'bold':'normal');doc.setFontSize(tamanho);doc.setTextColor(cor);}doc.text(linha,xx,y);y+=altura;}
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
    if(!lateral){
      if(imagem)doc.addImage(imagem,'JPEG',166,16,28,33);
      texto(d.nome,22,true,d.cor,x,imagem?145:largura);texto(d.titulo,12,false,d.cor,x,imagem?145:largura);
      texto([d.email,d.telefone,d.cidade,d.linkedin].filter(Boolean).join('\n'),9,false,'#526170',x,imagem?145:largura);
      if(imagem)y=Math.max(y,55);
    }
    for(const b of blocos(d)){
      if(y>252){doc.addPage();y=18;desenharLateral();}
      y+=6;texto(b.titulo,13,true,d.cor);y+=1;
      for(const i of b.itens){if(i.titulo)texto(i.titulo,10,true);if(i.sub)texto(i.sub,9,false,'#526170');if(i.texto)texto(i.texto);y+=4;}
    }
    const paginas=doc.getNumberOfPages();
    for(let p=1;p<=paginas;p++){
      doc.setPage(p);doc.setFont('NotoSans','normal');doc.setFontSize(8);doc.setTextColor('#526170');
      if(paginas>1)doc.text(`${p} / ${paginas}`,195,289,{align:'right'});
      if(previa){doc.saveGraphicsState();doc.setGState(new doc.GState({opacity:0.24}));doc.setTextColor('#b91c1c');doc.setFontSize(23);doc.text('PRÉVIA - MOSS DIGITAL',105,145,{align:'center',angle:30});doc.restoreGraphicsState();doc.setFontSize(8);doc.setTextColor('#b91c1c');doc.text('DEMONSTRAÇÃO - NÃO É O ARQUIVO FINAL',x,289);}
    }
    return doc.output('blob');
  }
  return {MAX,esc,slug,pacote,validar,render,pdf,baixar,limites};
})();
