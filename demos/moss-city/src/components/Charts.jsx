// Importa o React para organizar os gráficos em componentes independentes.
import React from 'react';
// Importa somente as visualizações utilizadas no primeiro centro de comando.
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
// Importa a formatação de valores fictícios.
import { money } from '../utils/domain.js';
// Define a aparência da caixa de valores sem depender do CSS das outras demos.
const tooltipStyle = { background: '#10263c', border: '1px solid #426077', color: '#eaf7ff', borderRadius: 5 };
// Desenha a evolução mensal conforme os dados existentes e a janela temporal selecionada.
export function RequestsChart({ requests, months = 6 }) {
  const keys = Array.from({ length: months }, (_, index) => { const date = new Date(new Date().getFullYear(), new Date().getMonth() - months + 1 + index, 1); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; }); // Monta os meses reais da janela sem inventar amostras.
  const points = keys.map((month) => ({ month, Solicitações: requests.filter((item) => item.date.startsWith(month)).length, Concluídas: requests.filter((item) => item.date.startsWith(month) && item.status === 'Concluída').length })); // Calcula os totais de cada série usando o mesmo cadastro.
  return ( // Retorna o gráfico com um resumo legível sem depender do desenho.
    <div>
      {/* Mantém altura estável e permite interagir com os valores por ponteiro e teclado. */}
      <div className="city-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={points} margin={{ left: -20, right: 8, top: 10, bottom: 0 }}><defs><linearGradient id="city-request-fill" x2="0" y2="1"><stop stopColor="#00d4ff" stopOpacity={0.22} /><stop offset="1" stopColor="#00d4ff" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#ffffff0b" vertical={false} /><XAxis dataKey="month" tickFormatter={(value) => value.slice(5) + '/' + value.slice(2, 4)} tickLine={false} axisLine={false} stroke="#9bb1c5" /><YAxis allowDecimals={false} tickLine={false} axisLine={false} stroke="#9bb1c5" /><Tooltip contentStyle={tooltipStyle} /><Area dataKey="Solicitações" stroke="#00d4ff" fill="url(#city-request-fill)" strokeWidth={2.5} isAnimationActive={false} /><Area dataKey="Concluídas" stroke="#32d6a0" fill="transparent" strokeWidth={2} isAnimationActive={false} /></AreaChart></ResponsiveContainer></div>
      {/* Oferece os mesmos números em texto para usuários de leitores de tela. */}
      <details className="city-chart-values"><summary>Consultar valores do gráfico</summary><ul>{points.map((point) => <li key={point.month}>{point.month}: {point.Solicitações} solicitações; {point.Concluídas} concluídas.</li>)}</ul></details>
    </div> // Encerra o gráfico temporal.
  ); // Encerra o retorno visual.
} // Encerra a evolução de solicitações.
// Desenha despesas ou distribuição de serviços conforme a opção escolhida pelo usuário.
export function DistributionChart({ data, mode }) {
  const rows = mode === 'despesas' ? data.expenses.map((item) => ({ name: item.sector, value: item.amount })) : [...new Set(data.requests.map((item) => item.category))].map((name) => ({ name: name.replace(' pública', '').replace(' urbana', '').replace(' nas vias', ''), value: data.requests.filter((item) => item.category === name).length })); // Deriva os valores diretamente das despesas ou solicitações.
  return ( // Entrega uma visualização horizontal com rótulos textuais.
    <div>
      {/* Usa barras horizontais para preservar a leitura dos nomes dos setores. */}
      <div className="city-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={rows} layout="vertical" margin={{ left: 0, right: 20, top: 5, bottom: 0 }}><CartesianGrid stroke="#ffffff09" horizontal={false} /><XAxis type="number" hide /><YAxis type="category" dataKey="name" width={105} stroke="#a8bdd0" tickLine={false} axisLine={false} /><Tooltip formatter={(value) => mode === 'despesas' ? money(value) : value} contentStyle={tooltipStyle} cursor={{ fill: '#ffffff05' }} /><Bar dataKey="value" name={mode === 'despesas' ? 'Despesa fictícia' : 'Solicitações'} fill="#32d6a0" radius={[0, 3, 3, 0]} barSize={13} isAnimationActive={false} /></BarChart></ResponsiveContainer></div>
      {/* Não deixa os valores dependentes de cores ou ponteiro. */}
      <details className="city-chart-values"><summary>Consultar distribuição</summary><ul>{rows.map((row) => <li key={row.name}>{row.name}: {mode === 'despesas' ? money(row.value) : row.value}</li>)}</ul></details>
    </div> // Encerra a visualização por setor.
  ); // Encerra o retorno visual.
} // Encerra o componente de distribuição.
