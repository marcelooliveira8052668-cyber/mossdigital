(function () {
  'use strict';
  var config=window.MossOnlineConfig||{};
  var form=document.getElementById('login');
  var status=document.getElementById('status');
  var dashboard=document.getElementById('dashboard');
  var list=document.getElementById('creations');
  var enter=document.getElementById('enter');
  var session=null;var generation=0;var loading=false;var signing=false;
  var configured=typeof config.url==='string'&&/^https:\/\/[a-z0-9]{20}\.supabase\.co$/.test(config.url)
    &&typeof config.publishableKey==='string'&&config.publishableKey.startsWith('sb_publishable_');
  if(!configured){enter.disabled=true;status.textContent='Painel em preparação: falta confirmar a configuração do projeto. Nenhum login será enviado.';}

  async function request(path, options, access){
    var controller=new AbortController();var timer=setTimeout(function(){controller.abort();},12000);
    try{
      var headers={apikey:config.publishableKey,'Content-Type':'application/json'};
      if(access)headers.Authorization='Bearer '+access;
      var response=await fetch(config.url+path,Object.assign({},options||{},{
        headers:headers,signal:controller.signal,credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer'
      }));
      var data=response.status===204?null:await response.json();
      if(!response.ok){var failure=new Error('Operação não confirmada.');failure.status=response.status;throw failure;}
      return data;
    }finally{clearTimeout(timer);}
  }
  function clear(message){
    generation++;session=null;list.replaceChildren();dashboard.hidden=true;form.hidden=false;
    document.getElementById('password').value='';status.textContent=message;
  }
  function makeSession(data){
    if(!data||typeof data.access_token!=='string'||typeof data.refresh_token!=='string'
      ||typeof data.expires_in!=='number'||data.expires_in<=0)throw new Error('Resposta de login inválida.');
    return {access:data.access_token,refresh:data.refresh_token,expires:Date.now()+data.expires_in*1000};
  }
  async function accessToken(version){
    if(!session||version!==generation)throw new Error('Sessão encerrada.');
    if(session.expires-Date.now()<60000){
      var data=await request('/auth/v1/token?grant_type=refresh_token',{
        method:'POST',body:JSON.stringify({refresh_token:session.refresh})
      });
      if(version!==generation)throw new Error('Sessão encerrada.');
      session=makeSession(data);
    }
    return session.access;
  }
  function text(tag,value){var el=document.createElement(tag);el.textContent=value;return el;}
  function date(value){var timestamp=Date.parse(value);return Number.isFinite(timestamp)?new Date(timestamp).toLocaleString('pt-BR'):'Horário indisponível';}
  function render(records){
    var stages={preenchendo:'Preenchendo',personalizando:'Personalizando',previa:'Prévia pronta',whatsapp:'Clicou para falar no WhatsApp'};
    var products={site:'Site',portfolio:'Portfólio',curriculo:'Currículo'};
    list.replaceChildren();
    records.forEach(function(record){
      var article=document.createElement('article');
      var age=Date.now()-Date.parse(record.atualizado_em);
      article.append(text('h3','Atendimento '+record.id),
        text('p',(products[record.produto]||'Produto desconhecido')+' · '+(stages[record.etapa]||'Etapa desconhecida')),
        text('p',age>=0&&age<90000?'Atividade nos últimos 90 segundos':'Sem atividade recente'),
        text('p','Início: '+date(record.criado_em)+' · Último registro: '+date(record.atualizado_em)));
      list.append(article);
    });
  }
  async function load(){
    if(!session||loading)return;
    loading=true;var version=generation;
    try{
      var access=await accessToken(version);
      // Revalidar a autorização em cada atualização, inclusive se a lista estiver vazia.
      var allowed=await request('/rest/v1/rpc/moss_eh_administrador',{method:'POST',body:'{}'},access);
      if(version!==generation)return;
      if(allowed!==true){clear('Esta conta não tem autorização de administrador.');return;}
      var records=await request('/rest/v1/moss_criador_atividades?select=id,produto,etapa,criado_em,atualizado_em&order=atualizado_em.desc&limit=100',null,access);
      if(version!==generation)return;
      if(!Array.isArray(records))throw new Error('Resposta inválida.');
      render(records);
      status.textContent=records.length?'Atualizado às '+new Date().toLocaleTimeString('pt-BR'):'Nenhuma criação registrada. O criador precisa estar conectado para registrar atividades.';
    }catch(error){
      if(version!==generation)return;
      if(error.status===401||error.status===403||error.status===400){clear('Acesso não confirmado. Entre novamente; se persistir, confira as permissões no Supabase.');}
      else{list.replaceChildren();status.textContent='Não foi possível atualizar. Os dados não estão disponíveis agora. Tente novamente.';}
    }finally{loading=false;}
  }
  form.addEventListener('submit',async function(event){
    event.preventDefault();if(!configured||signing)return;
    signing=true;enter.disabled=true;var version=++generation;
    var password=document.getElementById('password').value;
    var email=document.getElementById('email').value.trim();
    status.textContent='Conferindo acesso…';
    try{
      var data=await request('/auth/v1/token?grant_type=password',{
        method:'POST',body:JSON.stringify({email:email,password:password})
      });
      password='';document.getElementById('password').value='';
      if(version!==generation)return;
      session=makeSession(data);
      var allowed=await request('/rest/v1/rpc/moss_eh_administrador',{method:'POST',body:'{}'},session.access);
      if(version!==generation)return;
      if(allowed!==true){clear('Esta conta não tem autorização de administrador.');return;}
      form.hidden=true;dashboard.hidden=false;
      await load();
    }catch(error){if(version===generation)clear('Não foi possível entrar. Confira o e-mail, a senha e sua conexão.');}
    finally{password='';document.getElementById('password').value='';signing=false;enter.disabled=!configured;}
  });
  document.getElementById('refresh').addEventListener('click',load);
  document.getElementById('logout').addEventListener('click',function(){
    var access=session&&session.access;
    clear('Você saiu. O acesso foi removido desta aba.');
    if(access)request('/auth/v1/logout?scope=local',{method:'POST'},access).catch(function(){
      if(!session)status.textContent='Acesso removido desta aba. Não foi possível confirmar a revogação no servidor; a sessão expira automaticamente.';
    });
  });
  setInterval(function(){if(!document.hidden)load();},15000);
  window.addEventListener('pagehide',function(){clear('Entre novamente para continuar.');});
}());
