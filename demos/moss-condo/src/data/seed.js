// Importa a data local para deixar a demonstração atualizada ao restaurar os dados.
import { today } from '../utils/rules.js';
// Define as cinco áreas comuns disponíveis no condomínio fictício.
export const areas = ['Salão de festas', 'Churrasqueira', 'Quadra', 'Espaço gourmet', 'Sala de reuniões'];
// Relaciona os nomes dos perfis aos identificadores usados pela navegação.
export const profiles = { sindico: 'Síndico', morador: 'Morador', portaria: 'Portaria' };
// Cria uma cópia nova dos dados sempre que a demonstração precisar ser restaurada.
export function createSeed() {
  const date = today(); // Guarda a data de hoje para as atividades iniciais.
  const month = date.slice(0, 7); // Separa o ano e o mês para o financeiro.
  return { // Entrega os registros iniciais, todos inteiramente fictícios.
    residents: [ // Lista pessoas inventadas, sem documentos nem contatos reais.
      { id: 'r1', name: 'Marina Exemplo', unit: 'A · 302', type: 'Proprietário', history: 'Cadastro demonstrativo inicial' }, // Moradora usada no perfil de demonstração.
      { id: 'r2', name: 'Rafael Modelo', unit: 'B · 104', type: 'Inquilino', history: 'Cadastro demonstrativo inicial' }, // Segundo exemplo de ocupação.
      { id: 'r3', name: 'Clara Fictícia', unit: 'A · 501', type: 'Proprietário', history: 'Cadastro demonstrativo inicial' }, // Terceiro exemplo de moradora.
      { id: 'r4', name: 'Pedro Demonstração', unit: 'C · 203', type: 'Inquilino', history: 'Cadastro demonstrativo inicial' }, // Quarto exemplo de morador.
    ], // Encerra a lista inicial de moradores.
    finances: [ // Reúne receitas e despesas de exemplo.
      ...Array.from({ length: 5 }, (_, index) => { const previous = new Date(new Date().getFullYear(), new Date().getMonth() - 5 + index, 5); const stamp = `${previous.getFullYear()}-${String(previous.getMonth() + 1).padStart(2, '0')}-05`; return [{ id: `past-in-${index}`, description: 'Receitas históricas demonstrativas', kind: 'Receita', category: 'Condomínio', amount: 35000 + index * 1550, date: stamp, status: 'Pago', unit: 'Coletivo' }, { id: `past-out-${index}`, description: 'Despesas históricas demonstrativas', kind: 'Despesa', category: 'Serviços', amount: 19000 + (index % 3) * 2300, date: stamp, status: 'Pago', unit: 'Coletivo' }]; }).flat(), // Gera cinco meses de histórico fictício para o gráfico inicial.
      { id: 'f1', description: 'Taxas condominiais — lote demonstrativo', kind: 'Receita', category: 'Condomínio', amount: 42600, date: `${month}-05`, status: 'Pago', unit: 'Coletivo' }, // Receita administrativa agregada, não exibida ao morador.
      { id: 'f2', description: 'Manutenção dos elevadores', kind: 'Despesa', category: 'Manutenção', amount: 4800, date: `${month}-08`, status: 'Pago', unit: 'Coletivo' }, // Despesa fictícia de manutenção.
      { id: 'f3', description: 'Equipe e serviços de limpeza', kind: 'Despesa', category: 'Serviços', amount: 12300, date: `${month}-10`, status: 'Pago', unit: 'Coletivo' }, // Despesa fictícia de serviços.
      { id: 'f4', description: 'Taxa condominial — unidade A · 302', kind: 'Receita', category: 'Condomínio', amount: 850, date: `${month}-10`, status: 'Pendente', unit: 'A · 302' }, // Taxa visível para a moradora selecionada.
      { id: 'f5', description: 'Taxa condominial — unidade B · 104', kind: 'Receita', category: 'Condomínio', amount: 850, date: `${month}-10`, status: 'Pendente', unit: 'B · 104' }, // Outra taxa pendente de exemplo.
      { id: 'f6', description: 'Energia das áreas comuns', kind: 'Despesa', category: 'Consumo', amount: 3250, date: `${month}-12`, status: 'Pago', unit: 'Coletivo' }, // Despesa fictícia de consumo.
    ], // Encerra os lançamentos iniciais.
    reservations: [ // Guarda reservas fictícias por área e horário.
      { id: 'b1', area: 'Espaço gourmet', date, start: '18:00', end: '21:00', unit: 'A · 302', status: 'Confirmada' }, // Reserva de exemplo para a moradora.
      { id: 'b2', area: 'Quadra', date, start: '10:00', end: '12:00', unit: 'B · 104', status: 'Confirmada' }, // Reserva usada para demonstrar conflitos.
    ], // Encerra as reservas iniciais.
    issues: [ // Reúne solicitações e manutenções preventivas.
      { id: 'i1', title: 'Iluminação do jardim', priority: 'Média', status: 'Aberta', unit: 'A · 302', date, type: 'Ocorrência', history: 'Solicitação demonstrativa recebida' }, // Problema visível para a moradora.
      { id: 'i2', title: 'Revisão preventiva dos elevadores', priority: 'Alta', status: 'Em atendimento', unit: 'Coletivo', date, type: 'Preventiva', history: 'Equipe fictícia programada' }, // Manutenção administrativa.
      { id: 'i3', title: 'Inspeção do portão de acesso', priority: 'Média', status: 'Aberta', unit: 'Coletivo', date, type: 'Preventiva', history: 'Inspeção demonstrativa agendada' }, // Segunda manutenção preventiva.
    ], // Encerra a lista de ocorrências.
    notices: [ // Reúne comunicados e eventos da comunidade fictícia.
      { id: 'n1', title: 'Um novo capítulo para nossa comunidade', text: 'Conheça os espaços e experimente os serviços desta demonstração.', audience: 'Todos', category: 'Geral', date }, // Aviso geral para todos os perfis.
      { id: 'n2', title: 'Assembleia de moradores', text: 'Encontro fictício no salão de festas, às 19h30. Nenhuma inscrição real é necessária.', audience: 'Todos', category: 'Assembleia', date }, // Evento incluído na agenda.
      { id: 'n3', title: 'Revisão da iluminação — bloco A', text: 'Manutenção demonstrativa dos corredores no período da manhã.', audience: 'Bloco A', category: 'Manutenção', date }, // Comunicado destinado ao bloco da moradora.
    ], // Encerra os comunicados iniciais.
    visitors: [{ id: 'v1', name: 'Visitante Exemplo', unit: 'A · 302', date, status: 'Autorizado' }], // Registra somente uma pessoa inventada.
    deliveries: [{ id: 'd1', name: 'Pacote demonstrativo', unit: 'A · 302', date, status: 'Aguardando retirada' }], // Simula uma entrega sem rastrear pessoas.
  }; // Finaliza os dados de demonstração.
} // Encerra a fábrica de dados fictícios.
