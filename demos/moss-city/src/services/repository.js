// Importa o conjunto inicial de registros, sem depender de um servidor.
import { createSeed } from '../data/seed.js';
// Define uma chave exclusiva para não acessar dados de outras demos.
export const STORAGE_KEY = 'moss-city:scenario:v1';
// Valida os campos usados pela primeira prévia antes de renderizar registros recuperados.
export function validScenario(data) {
  return Boolean(data && data.city && Number.isFinite(data.city.population) && Array.isArray(data.points) && data.points.every((item) => typeof item.id === 'string' && typeof item.name === 'string' && Number.isFinite(item.lat) && Number.isFinite(item.lng) && Number.isFinite(item.budget)) && Array.isArray(data.requests) && data.requests.every((item) => typeof item.id === 'string' && typeof item.protocol === 'string' && typeof item.date === 'string' && Array.isArray(item.history)) && Array.isArray(data.expenses) && data.expenses.every((item) => Number.isFinite(item.amount))); // Recusa dados que quebrariam listas, mapa e indicadores.
} // Encerra a verificação dos dados locais.
// Importa a evolução de esquema que mantém dados antigos compatíveis com os novos módulos.
import { normalizeScenario } from './schema.js';
// Lê o cenário e deixa a interface decidir como apresentar eventuais falhas.
export function loadScenario(storage = window.localStorage) {
  const saved = storage.getItem(STORAGE_KEY); // Lê somente o armazenamento da MOSS CITY.
  if (!saved) return createSeed(); // Retorna exemplos novos na primeira visita.
  const data = JSON.parse(saved); // Interpreta o texto salvo pelo navegador.
  if (!validScenario(data)) throw new Error('Os dados locais têm um formato inválido.'); // Interrompe a leitura de estruturas incompatíveis.
  return normalizeScenario(data); // Complementa registros salvos por versões anteriores sem perder protocolos já criados.
} // Encerra a leitura do cenário.
// Centraliza a gravação, permitindo substituir este serviço por uma API no futuro.
export const saveScenario = (data, storage = window.localStorage) => storage.setItem(STORAGE_KEY, JSON.stringify(data));
