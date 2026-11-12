'use strict';
(() => {
  const $ = id => document.getElementById(id), api = window.PontoBanco;
  const status = texto => { $('painel-status').textContent = texto; };
  const nomes = {novo:'Novo',avaliacao:'Em avaliação',combinado:'Combinado',concluido:'Concluído',cancelado:'Cancelado'};
  let registros = [], versao = 0, ocupado = false;
  try { api.configuracao(); $('aviso-config').textContent = 'Conexão configurada. O acesso será verificado no banco ao entrar.'; }
  catch (e) { $('aviso-config').textContent = e.message; $('login').querySelector('button').disabled = true; }
  function montarLista() {
    $('pedidos').replaceChildren();
    const filtrados = registros.filter(r => $('filtro-status').value === 'todos' || r.status === $('filtro-status').value);
    if (!filtrados.length) { const p = document.createElement('p'); p.textContent = 'Nenhum pedido neste filtro.'; $('pedidos').append(p); return; }
    filtrados.forEach(r => {
      const card = document.createElement('article'); card.className = 'pedido';
      const titulo = document.createElement('h3'); titulo.textContent = r.cliente;
      const meta = document.createElement('p'); meta.textContent = r.contato + ' · ' + r.servico + ' · ' + new Date(r.criado_em).toLocaleString('pt-BR');
      const texto = document.createElement('p'); texto.textContent = r.detalhes;
      const label = document.createElement('label'); label.textContent = 'Status do pedido de '+r.cliente;
      const select = document.createElement('select');
      Object.entries(nomes).forEach(([value,text]) => { const o = document.createElement('option'); o.value = value; o.textContent = text; select.append(o); });
      select.value = r.status; label.append(select);
      const salvar = document.createElement('button'); salvar.type = 'button'; salvar.className = 'salvar'; salvar.textContent = 'Salvar status';
      const excluir = document.createElement('button'); excluir.type = 'button'; excluir.className = 'excluir'; excluir.textContent = 'Excluir pedido';
      salvar.addEventListener('click', () => executar(async () => { const alterados = await api.atualizar(r.id,select.value); if (!alterados?.length) throw Error('Pedido não alterado. Atualize a lista e confira suas permissões.'); await carregar(); status('Status salvo no banco. Nenhuma mensagem foi enviada ao cliente.'); }));
      excluir.addEventListener('click', () => { if (confirm('Excluir definitivamente este pedido do banco? Esta ação não pode ser desfeita.')) executar(async () => { const apagados = await api.excluir(r.id); if (!apagados?.length) throw Error('Pedido não excluído. Confira a lista e suas permissões.'); await carregar(); status('Pedido excluído do banco.'); }); });
      card.append(titulo,meta,texto,label,salvar,excluir); $('pedidos').append(card);
    });
  }
  async function carregar() {
    const v = ++versao; const dados = await api.pedidos();
    if (v !== versao) return;
    if (!Array.isArray(dados)) throw Error('Resposta inválida do banco.');
    registros = dados; montarLista();
  }
  async function executar(acao) {
    if (ocupado) return;
    ocupado = true; document.querySelectorAll('#gestao button').forEach(b => b.disabled = true);
    status('Aguarde a confirmação do banco…');
    try { await acao(); } catch (e) { status(e.message + '\nSe houve falha de conexão durante uma gravação, atualize a lista antes de repetir.'); }
    finally { ocupado = false; document.querySelectorAll('#gestao button').forEach(b => b.disabled = false); }
  }
  $('login').addEventListener('submit',async e => {
    e.preventDefault(); const botao = $('login').querySelector('button'); botao.disabled = true; status('Verificando seu acesso…');
    try { await api.entrar($('email').value.trim(),$('senha').value); await carregar(); $('senha').value = ''; $('acesso').hidden = true; $('gestao').hidden = false; status('Acesso autorizado. Pedidos consultados no banco.'); }
    catch (erro) { status(erro.message); }
    finally { $('senha').value = ''; botao.disabled = false; }
  });
  $('sair').addEventListener('click', () => executar(async () => {
    try { await api.sair(); } finally { versao++; registros = []; $('pedidos').replaceChildren(); $('novo-pedido').reset(); $('gestao').hidden = true; $('acesso').hidden = false; status('Sessão local encerrada. Entre novamente para continuar.'); }
  }));
  $('novo-pedido').addEventListener('submit', e => {
    e.preventDefault();
    const dados = {cliente:$('cliente').value.trim(),contato:$('contato').value.trim(),servico:$('tipo-servico').value,detalhes:$('descricao-pedido').value.trim()};
    if (!dados.cliente || dados.contato.length < 3 || !dados.detalhes) { status('Preencha nome, contato com pelo menos três caracteres e descrição.'); return; }
    executar(async () => { const criados = await api.criar(dados); if (!criados?.length) throw Error('O banco não confirmou a gravação.'); $('novo-pedido').reset(); await carregar(); status('Pedido registrado no Supabase. Nenhum pagamento ou agendamento foi confirmado automaticamente.'); });
  });
  $('recarregar').addEventListener('click', () => executar(async () => { await carregar(); status('Lista atualizada no banco.'); }));
  $('filtro-status').addEventListener('change',montarLista);
})();
