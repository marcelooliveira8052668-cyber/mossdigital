(function () {
  'use strict';
  var form = document.getElementById('list-form');
  var controls = document.getElementById('list-controls');
  var purpose = document.getElementById('purpose');
  var face = document.getElementById('face');
  var style = document.getElementById('style');
  var ack = document.getElementById('list-ack');
  var result = document.getElementById('list-result');
  var status = document.getElementById('list-status');
  var text = '';
  var faces = {
    redondo: { label: 'rosto redondo', tips: ['Prefira armações angulares ou quadradas, que contrastam com a curva do rosto.', 'Aros médios a grandes ajudam a equilibrar as proporções.'] },
    oval: { label: 'rosto oval', tips: ['Quase todos os formatos combinam: é o formato mais versátil.', 'Use o estilo da armação para destacar a sua preferência pessoal.'] },
    quadrado: { label: 'rosto quadrado', tips: ['Armações redondas ou ovais suavizam os ângulos da mandíbula.', 'Evite aros muito retos se você quiser um contraste mais suave.'] },
    coracao: { label: 'rosto em coração', tips: ['Aros com base mais leve, como o aviador ou o metálico fino, equilibram o rosto.', 'Evite modelos muito largos na parte de cima.'] }
  };
  var purposes = { grau: 'óculos de grau', sol: 'óculos de sol', dois: 'um par de grau e um de sol' };
  var styles = { qualquer: '', redondo: 'redonda', quadrado: 'quadrada', aviador: 'aviador', gato: 'gato', hexagonal: 'hexagonal' };
  var counts = { todos: 7, grau: 4, sol: 3 };

  function invalidate() {
    result.hidden = true;
    text = '';
    ack.checked = false;
    status.textContent = '';
  }

  [purpose, face, style].forEach(function (input) {
    input.addEventListener('change', invalidate);
  });

  document.querySelectorAll('[data-style]').forEach(function (link) {
    link.addEventListener('click', function () {
      style.value = link.dataset.style;
      invalidate();
      style.focus({ preventScroll: true });
    });
  });

  document.querySelectorAll('[data-filter]').forEach(function (button) {
    button.addEventListener('click', function () {
      var filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(function (other) {
        other.setAttribute('aria-pressed', String(other === button));
      });
      var visible = 0;
      document.querySelectorAll('.card').forEach(function (card) {
        var show = filter === 'todos' || card.dataset.kind === filter;
        card.hidden = !show;
        if (show) visible += 1;
      });
      document.getElementById('filter-count').textContent = visible + (visible === 1 ? ' modelo na coleção' : ' modelos na coleção');
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var guide = faces[face.value];
    var items = guide.tips.slice();
    if (styles[style.value]) {
      items.push('Se quiser seguir a sua preferência, experimente a armação ' + styles[style.value] + ' entre as opções disponíveis.');
    } else {
      items.push('Experimente ao menos três formatos diferentes antes de decidir.');
    }
    items.push('Para ' + purposes[purpose.value] + ', leve uma receita válida emitida por profissional habilitado, sempre que houver grau.');
    items.push('Reserve tempo para a prova de armação e pergunte sobre ajuste, peso e garantia da armação.');
    items.push('Confirme com a loja o prazo de fabricação das lentes e as condições de troca.');
    document.getElementById('list-title').textContent = 'Sua lista para ' + purposes[purpose.value];
    document.getElementById('list-meta').textContent = 'Formato do rosto informado: ' + guide.label + ' · gerado neste navegador';
    var ul = document.getElementById('list-items');
    ul.textContent = '';
    items.forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    text = [
      'LISTA DE PROVA — DEMONSTRAÇÃO MOSS DIGITAL',
      'Lumina Ótica é uma marca fictícia. Nada foi enviado nem salvo.',
      '',
      'Finalidade: ' + purposes[purpose.value],
      'Formato do rosto informado: ' + guide.label,
      '',
      '- ' + items.join('\n- '),
      '',
      'Sugestões de estilo, não avaliação oftalmológica. O grau vem da receita.',
      'Demo: mossdigital.com.br'
    ].join('\n');
    result.hidden = false;
    status.textContent = 'Lista gerada apenas nesta página. Nenhum dado foi enviado.';
  });

  function saveFile() {
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'lumina-lista-demonstrativa.txt';
    link.click();
    URL.revokeObjectURL(link.href);
    status.textContent = 'Arquivo TXT gerado localmente. Nada foi enviado.';
  }

  document.getElementById('copy-list').addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        status.textContent = 'Resumo copiado. Nada foi enviado.';
      }, saveFile);
    } else {
      saveFile();
    }
  });

  document.getElementById('download-list').addEventListener('click', saveFile);

  document.getElementById('reset-list').addEventListener('click', function () {
    form.reset();
    invalidate();
    status.textContent = 'Formulário limpo.';
    face.focus();
  });

  if (typeof controls !== 'undefined' && controls) {
    controls.disabled = false;
  }
}());
