(function () {
  'use strict';
  var controls = document.querySelector('.view-switch');
  var canvas = document.getElementById('wire-page');
  var buttons = Array.from(controls.querySelectorAll('[data-view]'));
  function show(view) {
    canvas.dataset.view = view;
    buttons.forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.view === view)); });
  }
  buttons.forEach(function (button) { button.addEventListener('click', function () { show(button.dataset.view); }); });
  show(window.matchMedia('(max-width: 700px)').matches ? 'mobile' : 'desktop');
  controls.hidden = false;
}());
