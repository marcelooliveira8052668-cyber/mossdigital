(function () {
  'use strict';
  var form = document.getElementById('rsvp-form');
  var controls = document.getElementById('rsvp-controls');
  var attendance = document.getElementById('attendance');
  var companions = document.getElementById('companions');
  var preview = document.getElementById('rsvp-preview');
  var status = document.getElementById('rsvp-status');
  var summary = '';
  function countdown() {
    var difference = new Date('2027-05-22T16:00:00-03:00').getTime() - Date.now();
    document.getElementById('days').textContent = String(Math.max(0, Math.ceil(difference / 86400000)));
  }
  function invalidate() {
    preview.hidden = true;
    summary = '';
    status.textContent = '';
    document.getElementById('rsvp-ack').checked = false;
    var absent = attendance.value === 'nao';
    document.getElementById('companions-field').hidden = absent;
    companions.disabled = absent;
    if (absent) companions.value = '0';
  }
  form.addEventListener('input', function (event) { if (event.target.id !== 'rsvp-ack') invalidate(); });
  form.addEventListener('change', function (event) { if (event.target.id !== 'rsvp-ack') invalidate(); });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.getElementById('guest-name');
    if (!name.value.trim()) { name.setCustomValidity('Digite um nome fictício.'); name.reportValidity(); return; }
    summary = ['DEMONSTRAÇÃO MOSS DIGITAL — CASAMENTO FICTÍCIO', 'Não confirma presença em um evento real.', '', 'Nome fictício: ' + name.value.trim(), 'Participação simulada: ' + (attendance.value === 'sim' ? 'Sim' : 'Não'), 'Acompanhantes fictícios: ' + companions.value, '', 'Prévia local, sem envio ou cadastro.'].join('\n');
    document.getElementById('rsvp-summary').textContent = summary;
    preview.hidden = false;
    status.textContent = 'Prévia gerada. Nenhuma presença foi confirmada nem enviada.';
  });
  document.getElementById('guest-name').addEventListener('input', function () { this.setCustomValidity(''); });
  document.getElementById('download-rsvp').addEventListener('click', function () {
    if (!summary) return;
    var url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
    var link = document.createElement('a'); link.href = url; link.download = 'casamento-previa-demonstrativa.txt'; document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    status.textContent = 'Arquivo preparado para baixar. Nada foi enviado ao casal.';
  });
  document.getElementById('reset-rsvp').addEventListener('click', function () { form.reset(); invalidate(); document.getElementById('guest-name').focus(); });
  controls.disabled = false;
  countdown(); window.setInterval(countdown, 60000);
}());
