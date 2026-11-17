/* ============================================================
   utils.js — funções auxiliares compartilhadas
   ------------------------------------------------------------
   Exposto em window.MOSS.utils. Tudo em IIFE para não poluir o
   escopo global e funcionar via file:// (sem módulos ES/CORS).
   ============================================================ */
(function (global) {
  'use strict';

  const MOSS = global.MOSS = global.MOSS || {};

  /** Remove acentos e caixa — usado pela pesquisa tolerante. */
  function normalize(str) {
    return String(str == null ? '' : str)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  /** Formata número como moeda brasileira (produto fictício). */
  function money(value) {
    const n = Number(value) || 0;
    return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /** Escapa HTML para evitar injeção ao interpolar dados. */
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  /** Gera identificador único com prefixo (pedidos, rastreios etc.). */
  function uid(prefix) {
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    const time = Date.now().toString(36).slice(-4).toUpperCase();
    return (prefix || 'ID') + '-' + time + rand;
  }

  /** Lê JSON do localStorage com fallback seguro (modo privado, desativado). */
  function lsGet(key, fallback) {
    try {
      const raw = global.localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  /** Grava JSON no localStorage sem quebrar se o storage estiver indisponível. */
  function lsSet(key, value) {
    try {
      global.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  /** Remove chave do localStorage. */
  function lsRemove(key) {
    try { global.localStorage.removeItem(key); } catch (e) { /* ignora */ }
  }

  /** Valida e-mail simples o suficiente para formulário demonstrativo. */
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim()); }

  /** Data/hora legível em pt-BR. */
  function formatDate(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  }

  /** Datalist reutilizável, gerado a partir de array de strings. */
  function datalist(id, items) {
    return '<datalist id="' + escapeHtml(id) + '">' +
      items.map(function (i) { return '<option value="' + escapeHtml(i) + '"></option>'; }).join('') +
      '</datalist>';
  }

  /** Debounce: atrasa a execução (usado na pesquisa instantânea). */
  function debounce(fn, ms) {
    let t;
    return function () {
      const args = arguments, ctx = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(ctx, args); }, ms || 120);
    };
  }

  /** Clona objeto/array sem referências (structuredClone com fallback). */
  function clone(value) {
    if (global.structuredClone) return global.structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  /** Arredonda em 2 casas para evitar erros de ponto flutuante em preços. */
  function round2(n) { return Math.round((Number(n) + Number.EPSILON) * 100) / 100; }

  /** Interpola inteiros de 1..n (para estrelas etc.). */
  function range(n) { return Array.from({ length: n }, function (_, i) { return i + 1; }); }

  MOSS.utils = {
    normalize: normalize, money: money, escapeHtml: escapeHtml, uid: uid,
    lsGet: lsGet, lsSet: lsSet, lsRemove: lsRemove, isEmail: isEmail,
    formatDate: formatDate, datalist: datalist, debounce: debounce,
    clone: clone, round2: round2, range: range
  };
})(window);
