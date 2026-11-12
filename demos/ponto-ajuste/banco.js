/* Cliente REST mínimo. Sem cookies, credenciais persistidas ou dependências. */
'use strict';
window.PontoBanco = (() => {
  const config = window.PONTO_AJUSTE_CONFIG || {};
  let sessao = null;
  function configuracao() {
    if (!config.usarSupabase) throw Error('O banco está desativado. Siga o manual e configure config.js.');
    let url;
    try { url = new URL(config.supabaseUrl); } catch { throw Error('Confira a URL do Supabase em config.js.'); }
    if (url.protocol !== 'https:' || !url.hostname.endsWith('.supabase.co') || url.pathname !== '/') throw Error('Use a URL HTTPS do projeto Supabase, sem caminhos adicionais.');
    const chave = config.supabaseChavePublica || '';
    if (chave.startsWith('sb_secret_')) throw Error('Chave privada proibida. Use a chave publishable ou anon.');
    if (!chave.startsWith('sb_publishable_')) {
      try {
        const trecho = chave.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
        if (JSON.parse(atob(trecho)).role !== 'anon') throw Error();
      } catch { throw Error('Use somente a chave pública publishable ou anon. Nunca service_role.'); }
    }
    return { url:url.origin, chave };
  }
  async function requisicao(caminho, opcoes = {}, privada = false) {
    const c = configuracao();
    if (privada && (!sessao || Date.now() >= sessao.expira)) { sessao = null; throw Error('Entre novamente: sua sessão não está ativa.'); }
    const headers = { apikey:c.chave, 'Content-Type':'application/json', ...opcoes.headers };
    if (sessao) headers.Authorization = 'Bearer ' + sessao.token;
    else if (c.chave.startsWith('eyJ')) headers.Authorization = 'Bearer ' + c.chave;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const resposta = await fetch(c.url + caminho, {...opcoes, headers, signal:controller.signal, cache:'no-store'});
      if (!resposta.ok) {
        if (resposta.status === 401) { sessao = null; throw Error('Acesso não autorizado. Confira o login, a configuração e a validade da sessão.'); }
        if (resposta.status === 403) throw Error('Acesso negado pelas regras do banco. Confira o usuário autorizado e as políticas RLS.');
        throw Error('Não foi possível concluir no banco (HTTP ' + resposta.status + '). Confira a configuração e tente novamente.');
      }
      if (resposta.status === 204 || resposta.headers.get('content-length') === '0') return null;
      const texto = await resposta.text(); return texto ? JSON.parse(texto) : null;
    } catch (e) {
      if (e.name === 'AbortError') throw Error('O banco demorou a responder. Tente novamente; confira antes se a operação foi salva.');
      if (e instanceof TypeError) throw Error('Não foi possível conectar. Confira sua internet e a URL do projeto.');
      throw e;
    } finally { clearTimeout(timer); }
  }
  async function entrar(email, senha) {
    sessao = null;
    const r = await requisicao('/auth/v1/token?grant_type=password', {method:'POST', body:JSON.stringify({email,password:senha})});
    if (!r.access_token) throw Error('Login não confirmado.');
    sessao = {token:r.access_token, expira:Date.now() + (r.expires_in || 3600)*1000};
    try {
      const autorizados = await requisicao('/rest/v1/pa_administradores?select=id', {}, true);
      if (!autorizados?.length) throw Error('Este usuário não está autorizado como responsável pelo ateliê.');
    } catch (e) { sessao = null; throw e; }
  }
  async function sair() { try { if (sessao) await requisicao('/auth/v1/logout', {method:'POST'}, true); } finally { sessao = null; } }
  const consultar = () => requisicao('/rest/v1/pa_servicos?select=codigo,nome,descricao&ativo=eq.true&order=ordem.asc');
  const pedidos = () => requisicao('/rest/v1/pa_pedidos?select=id,cliente,contato,servico,detalhes,status,criado_em&order=criado_em.desc&limit=100', {}, true);
  const criar = dados => requisicao('/rest/v1/pa_pedidos', {method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(dados)}, true);
  const atualizar = (id,status) => requisicao('/rest/v1/pa_pedidos?id=eq.'+encodeURIComponent(id), {method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({status})}, true);
  const excluir = id => requisicao('/rest/v1/pa_pedidos?id=eq.'+encodeURIComponent(id), {method:'DELETE',headers:{Prefer:'return=representation'}}, true);
  return { configuracao, consultar, entrar, sair, pedidos, criar, atualizar, excluir };
})();
