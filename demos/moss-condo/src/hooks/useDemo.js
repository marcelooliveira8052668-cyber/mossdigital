// Importa os recursos do React que guardam estado e executam ações após a renderização.
import { useEffect, useState } from 'react';
// Importa a função que gera os registros fictícios.
import { createSeed } from '../data/seed.js';
// Usa uma chave exclusiva para não afetar os dados de outras demonstrações.
const KEY = 'moss-condo:demo:v1';
// Centraliza o carregamento, a atualização e a restauração dos registros locais.
export function useDemo() {
  const [data, setData] = useState(null); // Começa sem dados para mostrar o estado de carregamento.
  const [error, setError] = useState(''); // Guarda uma mensagem se o navegador bloquear o armazenamento.
  useEffect(() => { // Carrega o armazenamento somente depois que o componente é montado.
    try { // Tenta recuperar dados salvos sem interromper a interface em caso de falha.
      const saved = localStorage.getItem(KEY); // Lê somente a chave desta demonstração.
      const parsed = saved ? JSON.parse(saved) : createSeed(); // Interpreta os dados ou cria exemplos novos.
      if (!Object.keys(createSeed()).every((key) => Array.isArray(parsed[key]))) throw new Error('Formato inválido'); // Confere as coleções obrigatórias.
      setData(parsed); // Entrega os dados validados para a aplicação.
    } catch { // Trata dados corrompidos e bloqueios do navegador.
      setData(createSeed()); // Mantém a demonstração utilizável com exemplos novos.
      setError('Não foi possível recuperar os dados locais. Usando exemplos temporários; você pode restaurar a demonstração.'); // Explica a situação ao visitante.
    } // Encerra a leitura protegida.
  }, []); // Executa a leitura apenas na montagem.
  useEffect(() => { // Salva os registros sempre que os dados mudam.
    if (!data) return; // Evita salvar antes de terminar o carregamento.
    try { localStorage.setItem(KEY, JSON.stringify(data)); } // Converte os registros para texto e salva no navegador.
    catch { setError('O navegador não permitiu salvar. As alterações funcionarão apenas nesta sessão.'); } // Informa que os dados ficaram temporários.
  }, [data]); // Observa as alterações nos dados.
  const update = (collection, records) => setData((previous) => ({ ...previous, [collection]: records })); // Troca apenas a coleção informada.
  const restore = () => { setError(''); setData(createSeed()); }; // Restaura somente a MOSS CONDO, sem usar localStorage.clear.
  return { data, update, restore, error }; // Disponibiliza os dados e as ações para os componentes.
} // Encerra o gancho de persistência.
