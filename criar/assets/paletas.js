/* Paletas prontas da MOSS. Todas com contraste verificado de texto e destaque. */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.MossPalettes = api;
}(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  var palettes = [
    {nome: 'Clássico', fundo: '#ffffff', texto: '#1f2933', destaque: '#174fab'},
    {nome: 'Areia', fundo: '#f7f3ec', texto: '#2b2620', destaque: '#8a5a1e'},
    {nome: 'Mata', fundo: '#f2f6f0', texto: '#223026', destaque: '#2f6b3f'},
    {nome: 'Oceano', fundo: '#eef4fb', texto: '#16283c', destaque: '#1560a8'},
    {nome: 'Noite', fundo: '#14161a', texto: '#eef1f5', destaque: '#7fb2ff'},
    {nome: 'Lavanda', fundo: '#f4f1fa', texto: '#26223a', destaque: '#6b4fbb'},
    {nome: 'Coral', fundo: '#fff1ee', texto: '#331f1c', destaque: '#b4402c'},
    {nome: 'Menta', fundo: '#eefaf5', texto: '#16302a', destaque: '#0f7a5f'},
    {nome: 'Dourado', fundo: '#1b1a17', texto: '#f2ede4', destaque: '#e0a531'},
    {nome: 'Rosa', fundo: '#fdf0f4', texto: '#33202a', destaque: '#a83b64'},
    {nome: 'Cinza', fundo: '#f2f3f5', texto: '#1d2229', destaque: '#4a5560'},
    {nome: 'Uva', fundo: '#f6f1ff', texto: '#241b33', destaque: '#6a3fbd'}
  ];
  function luminance(hex) {
    var value = hex.replace('#', '');
    var channels = [0, 2, 4].map(function (i) { return parseInt(value.substr(i, 2), 16) / 255; }).map(function (c) {
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  }
  function contrast(first, second) {
    var a = luminance(first), b = luminance(second);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  }
  return {
    all: function () { return palettes.map(function (p) { return Object.assign({}, p); }); },
    contrast: contrast
  };
}));
