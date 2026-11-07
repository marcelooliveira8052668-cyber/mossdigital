// Importa os recursos do React para estado e efeitos de persistência.
import { useEffect, useState } from 'react';
// Importa o repositório local independente da interface.
import { loadScenario, saveScenario } from '../services/repository.js';
// Importa os exemplos usados na recuperação e restauração.
import { createSeed } from '../data/seed.js';
// Mantém os dados compartilhados entre mapa, gráficos e portal demonstrativo.
export default function useScenario() {
  const [data, setData] = useState(null); // Permite mostrar um estado inicial de carregamento.
  const [error, setError] = useState(''); // Guarda mensagens de armazenamento bloqueado ou inválido.
  useEffect(() => { // Lê os registros depois da montagem da aplicação.
    try { setData(loadScenario()); } // Carrega os dados locais validados.
    catch { setData(createSeed()); setError('Não foi possível recuperar o cenário salvo. Exemplos temporários foram carregados; restaure a demonstração para começar novamente.'); } // Recupera a interface sem esconder o problema.
  }, []); // Executa a leitura uma vez por montagem.
  useEffect(() => { // Observa mudanças nos registros para persistir as operações.
    if (!data) return; // Não grava antes de terminar o carregamento inicial.
    try { saveScenario(data); } // Salva os dados somente na chave desta demo.
    catch { setError('O navegador bloqueou o armazenamento. Suas alterações durarão apenas nesta sessão.'); } // Explica o limite da persistência sem travar os recursos.
  }, [data]); // Executa a gravação quando o cenário muda.
  const restore = () => { setError(''); setData(createSeed()); }; // Restaura somente os exemplos da MOSS CITY.
  return { data, setData, error, restore }; // Disponibiliza os dados e ações para o aplicativo.
} // Encerra o gancho de cenário demonstrativo.
