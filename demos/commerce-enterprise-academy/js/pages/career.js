/* ============================================================
   career.js — MOSS Academy (preparação Front-End Júnior)
   ------------------------------------------------------------
   Tarefas simuladas com objetivo, demo, código, pista e critérios.
   Progresso salvo no localStorage. NÃO é processo seletivo real.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;

  function doneCount() {
    const p = MOSS.store.get().progress;
    return MOSS.course.tasks.filter(function (t) { return p[t.code]; }).length;
  }

  function render() {
    const tasks = MOSS.course.tasks;
    const pct = Math.round(doneCount() / tasks.length * 100);
    return '<div class="page">' +
      '<div class="page-head"><div><span class="eyebrow">MOSS Academy</span>' +
        '<h1>Preparação Front-End Júnior</h1>' +
        '<p>Um curso interativo baseado no código desta loja. <strong>Não é um processo seletivo real</strong> — é um espaço de estudo.</p></div></div>' +

      '<div class="card card--pad">' +
        '<div class="spread"><div><h3>Seu progresso</h3><p class="muted small">' + doneCount() + ' de ' + tasks.length + ' tarefas concluídas</p></div>' +
          '<strong style="font-size:1.6rem">' + pct + '%</strong></div>' +
        '<div class="progress"><span style="width:' + pct + '%"></span></div>' +
      '</div>' +

      '<section class="section section--tight">' +
        MOSS.ui.sectionHead('Trilha de estudos', 'Tópicos abordados', 'Os assuntos que um desenvolvedor Front-End Júnior costuma encontrar.') +
        '<div>' + MOSS.course.topics.map(function (t) { return '<span class="topic-pill">' + u.escapeHtml(t) + '</span>'; }).join('') + '</div>' +
      '</section>' +

      '<section class="section section--tight">' +
        MOSS.ui.sectionHead('Tarefas da empresa (simuladas)', 'Desafios FE', 'Cada tarefa mostra o problema, o código relevante e como conferir o resultado.') +
        '<div class="grid">' + tasks.map(function (t, i) {
          const done = !!MOSS.store.get().progress[t.code];
          return '<article class="card task-card' + (done?' is-done':'') + '">' +
            '<div class="card__body">' +
              '<div class="task-card__head"><span class="task-card__code">' + t.code + '</span>' +
                '<span class="badge ' + (done?'badge--green':'badge--outline') + '">' + (done?'✓ Concluída':'Pendente') + '</span></div>' +
              '<h3 style="margin-top:.5rem">' + u.escapeHtml(t.title) + '</h3>' +
              '<p class="small muted">' + u.escapeHtml(t.objective) + '</p>' +
              '<div class="row" style="gap:.3rem">' + t.topics.map(function (x) { return '<span class="topic-pill">' + u.escapeHtml(x) + '</span>'; }).join('') + '</div>' +
            '</div>' +
            '<div class="card__foot row">' +
              '<button class="btn btn--navy btn--sm" data-task="' + i + '">Abrir tarefa</button>' +
              '<button class="btn btn--outline btn--sm" data-toggle="' + i + '">' + (done?'Marcar como pendente':'Marcar como concluída') + '</button>' +
            '</div>' +
          '</article>';
        }).join('') + '</div>' +
      '</section>' +

      '<div class="note">🎓 Ao concluir, tente explicar a solução em voz alta usando: <strong>problema → decisão → resultado</strong>. Essa é a estrutura que recrutadores valorizam em entrevistas.</div>' +
    '</div>';
  }

  function bind() {
    const app = document.getElementById('app');

    app.querySelectorAll('[data-task]').forEach(function (b) {
      b.addEventListener('click', function () {
        const t = MOSS.course.tasks[Number(b.getAttribute('data-task'))];
        MOSS.notify.modal({
          title:t.code + ' — ' + t.title,
          wide:true,
          body:'<h4>Objetivo</h4><p>' + u.escapeHtml(t.objective) + '</p>' +
            '<h4>Demonstração</h4><p>' + u.escapeHtml(t.demo) + '</p>' +
            '<h4>Código relevante — ' + u.escapeHtml(t.file) + '</h4>' +
            '<pre class="card card--pad mono small" style="background:#0d1829;color:#dbe7f8;overflow:auto">' + u.escapeHtml(t.snippet) + '</pre>' +
            '<h4 style="margin-top:1rem">Pista opcional</h4><p class="muted">' + u.escapeHtml(t.hint) + '</p>' +
            '<h4>Critérios de conclusão</h4><ul>' + t.criteria.map(function (c) { return '<li>' + u.escapeHtml(c) + '</li>'; }).join('') + '</ul>',
          actions:[
            { label:'Fechar', className:'btn--outline' },
            { label:'Marcar como concluída', className:'btn--primary', onClick:function () { MOSS.store.setProgress(t.code, true); MOSS.notify.toast('Tarefa ' + t.code + ' concluída!', 'ok'); MOSS.router.render(); } }
          ]
        });
      });
    });

    app.querySelectorAll('[data-toggle]').forEach(function (b) {
      b.addEventListener('click', function () {
        const t = MOSS.course.tasks[Number(b.getAttribute('data-toggle'))];
        const done = !!MOSS.store.get().progress[t.code];
        MOSS.store.setProgress(t.code, !done);
        MOSS.router.render();
      });
    });
  }

  MOSS.pages = MOSS.pages || {};
  MOSS.pages.career = { render:render, bind:bind };
})(window);
