(function () {
  'use strict';
  // Capturar e remover imediatamente credenciais/erros do endereço e histórico atual.
  var fragment=new URLSearchParams(location.hash.slice(1));
  var query=new URLSearchParams(location.search);
  var access=fragment.get('type')==='recovery'?fragment.get('access_token'):null;
  var invalid=fragment.has('error')||query.has('error')||fragment.has('error_code')||query.has('error_code');
  var hasCallback=!!location.hash||invalid||query.has('code');
  if(location.hash||location.search)history.replaceState(null,'',location.pathname);
  // Um link aberto na mesma aba pode mudar só o fragmento, sem recarregar scripts.
  window.addEventListener('hashchange',function(){if(location.hash)location.reload();});
  fragment=null;query=null;
  var config=window.MossOnlineConfig||{};
  var recover=document.getElementById('recover');var reset=document.getElementById('reset');
  var status=document.getElementById('status');var send=document.getElementById('send');var save=document.getElementById('save');
  var busy=false;var ready=false;var cooldown=0;var version=0;
  var configured=typeof config.url==='string'&&/^https:\/\/[a-z0-9]{20}\.supabase\.co$/.test(config.url)
    &&typeof config.publishableKey==='string'&&config.publishableKey.startsWith('sb_publishable_');

  async function api(path, method, body, token){
    var controller=new AbortController();var timer=setTimeout(function(){controller.abort();},12000);
    try{
      var headers={apikey:config.publishableKey,'Content-Type':'application/json'};
      if(token)headers.Authorization='Bearer '+token;
      var response=await fetch(config.url+path,{method:method,headers:headers,
        body:body===undefined?undefined:JSON.stringify(body),signal:controller.signal,
        credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer'});
      var data=response.status===204?null:await response.json();
      if(!response.ok){var error=new Error('Operação não confirmada.');error.status=response.status;throw error;}
      return data;
    }finally{clearTimeout(timer);}
  }
  function clearPasswords(){document.getElementById('password').value='';document.getElementById('confirm').value='';}
  if(!configured){
    access=null;send.disabled=true;status.textContent='Configuração incompleta. Não foi enviada nenhuma solicitação.';return;
  }
  if(hasCallback){
    recover.hidden=true;
    if(!access||invalid){
      access=null;recover.hidden=false;status.textContent='Link inválido, expirado ou não compatível. Solicite um novo link nesta página.';
    }else{
      status.textContent='Validando o link…';
      var validationVersion=version;
      api('/auth/v1/user','GET',undefined,access).then(function(user){
        if(validationVersion!==version)return;
        if(!user||!user.id||!user.email)throw new Error('Conta não confirmada.');
        document.getElementById('account').textContent='Conta: '+user.email;
        reset.hidden=false;ready=true;status.textContent='Link validado. Escolha sua nova senha.';
      }).catch(function(){
        if(validationVersion!==version)return;
        access=null;recover.hidden=false;status.textContent='Não foi possível validar o link. Solicite um novo se estiver expirado.';
      });
    }
  }
  recover.addEventListener('submit',async function(event){
    event.preventDefault();if(busy)return;
    if(Date.now()<cooldown){status.textContent='Aguarde um minuto antes de pedir outro link e confira também o spam.';return;}
    busy=true;send.disabled=true;var requestVersion=version;
    status.textContent='Solicitando e-mail…';
    try{
      var redirect=new URL('redefinir.html',location.href).href;
      await api('/auth/v1/recover?redirect_to='+encodeURIComponent(redirect),'POST',{
        email:document.getElementById('email').value.trim()
      });
      if(requestVersion!==version)return;
      cooldown=Date.now()+60000;
      status.textContent='Solicitação recebida. Se houver uma conta com esse e-mail, o Supabase enviará um link. Confira a caixa de entrada e o spam; não compartilhe o link.';
    }catch(error){
      if(requestVersion!==version)return;
      status.textContent=error.status===429?'Limite de envio atingido. Aguarde antes de tentar novamente.':'Não foi possível confirmar o envio. Confira sua conexão e as configurações de e-mail no Supabase.';
    }finally{busy=false;send.disabled=false;}
  });
  reset.addEventListener('submit',async function(event){
    event.preventDefault();if(busy||!ready||!access)return;
    var password=document.getElementById('password').value;
    if(password.length<12){status.textContent='Use pelo menos 12 caracteres.';return;}
    if(password!==document.getElementById('confirm').value){status.textContent='As senhas não coincidem. Confira os dois campos.';return;}
    busy=true;save.disabled=true;var requestVersion=version;var token=access;
    status.textContent='Salvando a nova senha…';
    try{
      await api('/auth/v1/user','PUT',{password:password},token);
      password='';clearPasswords();
      if(requestVersion!==version)return;
      access=null;ready=false;reset.hidden=true;
      status.textContent='Senha atualizada. Volte ao login do painel e entre com a nova senha.';
      // Revogar sessões de atualização; não impedir o sucesso se esta etapa falhar.
      try{await api('/auth/v1/logout?scope=global','POST',undefined,token);}
      catch(error){if(requestVersion===version)status.textContent+=' Não foi possível confirmar a saída de outras sessões.';}
    }catch(error){
      if(requestVersion!==version)return;
      status.textContent='Não foi possível confirmar a alteração. O link pode ter expirado ou a senha não atender às regras. Confira sua conexão e tente novamente; se precisar, solicite outro link.';
    }finally{password='';token=null;clearPasswords();busy=false;save.disabled=false;}
  });
  window.addEventListener('pagehide',function(){
    version++;access=null;ready=false;clearPasswords();reset.hidden=true;
    status.textContent='Por segurança, use um novo link de recuperação para continuar.';
  });
}());
