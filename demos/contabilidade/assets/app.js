(function () {
  'use strict';
  var form = document.getElementById('guide-form');
  var result = document.getElementById('guide-result');
  var goal = document.getElementById('goal');
  var sector = document.getElementById('sector');
  var team = document.getElementById('team');
  var status = document.getElementById('guide-status');
  var text = '';
  var paths = {
    abrir: { title: 'Preparar a primeira conversa', intro: 'Organize o que você imagina para o negócio, sem antecipar enquadramento ou viabilidade.', items: ['Descrever a atividade que você pretende desenvolver.', 'Anotar onde e como gostaria de atuar.', 'Listar dúvidas sobre abertura e organização inicial.'] },
    mei: { title: 'Organizar a conversa sobre MEI', intro: 'Reúna os temas da rotina que precisam de esclarecimento profissional.', items: ['Listar as dúvidas sobre a rotina do negócio.', 'Descrever a atividade que você realiza.', 'Anotar como você organiza hoje seus registros e comprovantes.'] },
    empresa: { title: 'Revisar o momento da empresa', intro: 'Identifique o que já funciona e os pontos em que deseja apoio.', items: ['Descrever a operação e as necessidades atuais.', 'Listar os processos que você gostaria de organizar.', 'Separar dúvidas para revisar com um profissional habilitado.'] }
  };
  var sectors = { servicos: 'Prestação de serviços', comercio: 'Comércio', outro: 'Outra área / a definir' };
  function invalidate() { result.hidden = true; text = ''; document.getElementById('guide-ack').checked = false; status.textContent = ''; }
  [goal, sector, team].forEach(function (input) { input.addEventListener('change', invalidate); });
  document.querySelectorAll('[data-goal]').forEach(function (link) { link.addEventListener('click', function () { goal.value = link.dataset.goal; invalidate(); goal.focus({ preventScroll: true }); }); });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var path = paths[goal.value];
    var items = path.items.slice();
    items.push('Área de interesse: ' + sectors[sector.value] + '.');
    if (team.value === 'com') items.push('Levar as dúvidas sobre equipe e contratação para análise profissional.');
    items.push('Não compartilhar senhas ou documentos sensíveis por canais sem validação.');
    document.getElementById('result-title').textContent = path.title;
    document.getElementById('result-intro').textContent = path.intro;
    var list = document.getElementById('checklist'); list.replaceChildren();
    items.forEach(function (item) { var li = document.createElement('li'); li.textContent = item; list.appendChild(li); });
    text = ['ROTEIRO DEMONSTRATIVO MOSS DIGITAL — EIXO CONTÁBIL', 'Marca fictícia. Não é diagnóstico, orientação fiscal ou serviço contábil.', '', path.title, path.intro, '', ...items.map(function (item) { return '- ' + item; }), '', 'Não define regime, imposto, obrigação, prazo ou viabilidade. Consulte um profissional habilitado.'].join('\n');
    result.hidden = false;
    status.textContent = 'Roteiro gerado apenas nesta página. Nenhum dado foi enviado.';
  });
  function download() {
    if (!text) return;
    var url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    var link = document.createElement('a'); link.href = url; link.download = 'eixo-roteiro-demonstrativo.txt'; document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  document.getElementById('download-guide').addEventListener('click', function () { download(); status.textContent = 'Roteiro preparado para baixar. Nada foi enviado.'; });
  document.getElementById('copy-guide').addEventListener('click', async function () {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); status.textContent = 'Roteiro demonstrativo copiado.'; }
    catch (error) { download(); status.textContent = 'A cópia foi bloqueada. O roteiro foi preparado para baixar em texto.'; }
  });
  document.getElementById('reset-guide').addEventListener('click', function () { form.reset(); invalidate(); goal.focus(); });
  document.getElementById('guide-controls').disabled = false;
}());
