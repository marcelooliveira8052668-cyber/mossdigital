'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const api = window.SolBanco;
  const nomes = { novo: 'Nova', visita: 'Visita agendada', proposta_enviada: 'Proposta enviada', instalado: 'Instalado', cancelado: 'Cancelado' };
  let registros = [], versao = 0, ocupado = false;
  const status = texto => { $('painel-status').textContent = texto; };
  try { api.configuracao(); $('aviso-config').textContent = 'Conexão configurada. O acesso será verificado no banco ao entrar.'; }
  catch (e) { $('aviso-config').textContent = e.message; $('login').querySelector('button').disabled = true; }
  function montar() {
    $('propostas').replaceChildren();
    const lista = registros.filter(r => $('filtro').value === 'todos' || r.status === $('filtro').value);
    if (!lista.length) { const p = document.createElement('p'); p.className = 'dica'; p.textContent = 'Nenhuma proposta neste filtro.'; $('propostas').append(p); return; }
    lista.forEach(r => {
      const card = document.createElement('article'); card.className = 'proposta';
      const titulo = document.createElement('h3'); titulo.textContent = r.cliente;
      const meta = document.createElement('p');
      meta.textContent = r.contato + ' · ' + r.bairro + ' · ' + r.servico + ' · ' + new Date(r.criado_em).toLocaleString('pt-BR');
      const texto = document.createElement('p'); texto.textContent = r.detalhes;
      const extras = [];
      if (r.consumo_kwh) extras.push('consumo ' + r.consumo_kwh + ' kWh');
      if (r.valor_estimado) extras.push('estimativa R$ ' + Number(r.valor_estimado).toLocaleString('pt-BR'));
      if (extras.length) { const linha = document.createElement('p'); linha.textContent = 'Simulação: ' + extras.join(' · '); card.append(titulo, meta, texto, linha); }
      else card.append(titulo, meta, texto);
      const label = document.createElement('label'); label.textContent = 'Status da proposta de ' + r.cliente;
      const select = document.createElement('select');
      Object.entries(nomes).forEach(([valor, textoOpcao]) => { const o = document.createElement('option'); o.value = valor; o.textContent = textoOpcao; select.append(o); });
      select.value = r.status; label.append(select);
      const salvar = document.createElement('button'); salvar.type = 'button'; salvar.className = 'salvar'; salvar.textContent = 'Salvar status';
      const excluir = document.createElement('button'); excluir.type = 'button'; excluir.className = 'excluir'; excluir.textContent = 'Excluir proposta';
      salvar.addEventListener('click', () => executar(async () => {
        const alterados = await api.atualizar(r.id, select.value);
        if (!alterados?.length) throw Error('Proposta não alterada. Atualize a lista e confira suas permissões.');
        await carregar();
        status('Status salvo no banco. Nenhuma mensagem foi enviada ao cliente.');
      }));
      excluir.addEventListener('click', () => {
        if (confirm('Excluir definitivamente esta proposta do banco? Esta ação não pode ser desfeita.')) executar(async () => {
          const apagados = await api.excluir(r.id);
          if (!apagados?.length) throw Error('Proposta não excluída. Confira a lista e suas permissões.');
          await carregar();
          status('Proposta excluída do banco.');
        });
      });
      card.append(label, salvar, excluir);
      $('propostas').append(card);
    });
  }
  async function carregar() {
    const v = ++versao;
    const dados = await api.propostas();
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
      status('Acesso autorizado. Propostas consultadas no banco.');
    } catch (erro) { status(erro.message); }
    finally { $('senha').value = ''; botao.disabled = false; }
  });
  $('sair').addEventListener('click', () => executar(async () => {
    try { await api.sair(); }
    finally {
      versao++; registros = []; $('propostas').replaceChildren(); $('nova-proposta').reset();
      $('gestao').hidden = true; $('acesso').hidden = false;
      status('Sessão local encerrada. Entre novamente para continuar.');
    }
  }));
  $('nova-proposta').addEventListener('submit', e => {
    e.preventDefault();
    const consumo = $('consumo').value.trim(), valor = $('valor').value.trim();
    const dados = {
      cliente: $('cliente').value.trim(),
      contato: $('contato').value.trim(),
      bairro: $('bairro').value.trim(),
      servico: $('servico').value,
      detalhes: $('detalhes').value.trim(),
      consumo_kwh: consumo === '' ? null : Number(consumo),
      valor_estimado: valor === '' ? null : Number(valor)
    };
    if (!dados.cliente || dados.contato.length < 3 || !dados.bairro || !dados.detalhes) { status('Preencha nome, contato, bairro e situação.'); return; }
    executar(async () => {
      const criadas = await api.criar(dados);
      if (!criadas?.length) throw Error('O banco não confirmou a gravação.');
      $('nova-proposta').reset();
      await carregar();
      status('Proposta registrada no Supabase. Nenhum pagamento ou agendamento foi confirmado automaticamente.');
    });
  });
  $('recarregar').addEventListener('click', () => executar(async () => { await carregar(); status('Lista atualizada no banco.'); }));
  $('filtro').addEventListener('change', montar);
})();
