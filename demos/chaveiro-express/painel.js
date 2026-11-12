'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const api = window.ChaveiroBanco;
  const nomes = { novo: 'Novo', avaliacao: 'Em avaliação', combinado: 'Combinado', atendido: 'Atendido', cancelado: 'Cancelado' };
  let registros = [], versao = 0, ocupado = false;
  const status = texto => { $('painel-status').textContent = texto; };
  try { api.configuracao(); $('aviso-config').textContent = 'Conexão configurada. O acesso será verificado no banco ao entrar.'; }
  catch (e) { $('aviso-config').textContent = e.message; $('login').querySelector('button').disabled = true; }
  function montar() {
    $('chamados').replaceChildren();
    const lista = registros.filter(r => $('filtro').value === 'todos' || r.status === $('filtro').value);
    if (!lista.length) { const p = document.createElement('p'); p.className = 'dica'; p.textContent = 'Nenhum chamado neste filtro.'; $('chamados').append(p); return; }
    lista.forEach(r => {
      const card = document.createElement('article'); card.className = 'chamado';
      const titulo = document.createElement('h3'); titulo.textContent = r.cliente;
      const meta = document.createElement('p'); meta.textContent = r.contato + ' · ' + r.bairro + ' · ' + r.servico + ' · ' + new Date(r.criado_em).toLocaleString('pt-BR');
      const texto = document.createElement('p'); texto.textContent = r.descricao;
      const label = document.createElement('label'); label.textContent = 'Status do chamado de ' + r.cliente;
      const select = document.createElement('select');
      Object.entries(nomes).forEach(([valor, textoOpcao]) => { const o = document.createElement('option'); o.value = valor; o.textContent = textoOpcao; select.append(o); });
      select.value = r.status; label.append(select);
      const salvar = document.createElement('button'); salvar.type = 'button'; salvar.className = 'salvar'; salvar.textContent = 'Salvar status';
      const excluir = document.createElement('button'); excluir.type = 'button'; excluir.className = 'excluir'; excluir.textContent = 'Excluir chamado';
      salvar.addEventListener('click', () => executar(async () => {
        const alterados = await api.atualizar(r.id, select.value);
        if (!alterados?.length) throw Error('Chamado não alterado. Atualize a lista e confira suas permissões.');
        await carregar();
        status('Status salvo no banco. Nenhuma mensagem foi enviada ao cliente.');
      }));
      excluir.addEventListener('click', () => {
        if (confirm('Excluir definitivamente este chamado do banco? Esta ação não pode ser desfeita.')) executar(async () => {
          const apagados = await api.excluir(r.id);
          if (!apagados?.length) throw Error('Chamado não excluído. Confira a lista e suas permissões.');
          await carregar();
          status('Chamado excluído do banco.');
        });
      });
      card.append(titulo, meta, texto, label, salvar, excluir);
      $('chamados').append(card);
    });
  }
  async function carregar() {
    const v = ++versao;
    const dados = await api.chamados();
    if (v !== versao) return;
    if (!Array.isArray(dados)) throw Error('Resposta inválida do banco.');
    registros = dados; montar();
  }
  async function executar(acao) {
    if (ocupado) return;
    ocupado = true;
    document.querySelectorAll('#gestao button').forEach(b => b.disabled = true);
    status('Aguarde a confirmação do banco…');
    try { await acao(); }
    catch (e) { status(e.message + '\nSe houve falha de conexão durante uma gravação, atualize a lista antes de repetir.'); }
    finally { ocupado = false; document.querySelectorAll('#gestao button').forEach(b => b.disabled = false); }
  }
  $('login').addEventListener('submit', async e => {
    e.preventDefault();
    const botao = $('login').querySelector('button'); botao.disabled = true;
    status('Verificando seu acesso…');
    try {
      await api.entrar($('email').value.trim(), $('senha').value);
      await carregar();
      $('acesso').hidden = true; $('gestao').hidden = false;
      status('Acesso autorizado. Chamados consultados no banco.');
    } catch (erro) { status(erro.message); }
    finally { $('senha').value = ''; botao.disabled = false; }
  });
  $('sair').addEventListener('click', () => executar(async () => {
    try { await api.sair(); }
    finally {
      versao++; registros = []; $('chamados').replaceChildren(); $('novo-chamado').reset();
      $('gestao').hidden = true; $('acesso').hidden = false;
      status('Sessão local encerrada. Entre novamente para continuar.');
    }
  }));
  $('novo-chamado').addEventListener('submit', e => {
    e.preventDefault();
    const dados = {
      cliente: $('cliente').value.trim(),
      contato: $('contato').value.trim(),
      bairro: $('bairro').value.trim(),
      servico: $('servico').value,
      descricao: $('descricao').value.trim()
    };
    if (!dados.cliente || dados.contato.length < 3 || !dados.bairro || !dados.descricao) { status('Preencha nome, contato, bairro e situação.'); return; }
    executar(async () => {
      const criados = await api.criar(dados);
      if (!criados?.length) throw Error('O banco não confirmou a gravação.');
      $('novo-chamado').reset();
      await carregar();
      status('Chamado registrado no Supabase. Nenhum pagamento ou agendamento foi confirmado automaticamente.');
    });
  });
  $('recarregar').addEventListener('click', () => executar(async () => { await carregar(); status('Lista atualizada no banco.'); }));
  $('filtro').addEventListener('change', montar);
})();
