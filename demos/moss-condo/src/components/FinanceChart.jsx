// Importa o React para construir o componente de gráficos.
import React from 'react';
// Importa somente os componentes de gráfico utilizados no painel.
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// Importa a formatação de moeda compartilhada pela aplicação.
import { money } from '../utils/rules.js';
// Desenha uma comparação mensal baseada nos lançamentos existentes.
export default function FinanceChart({ records }) {
  const months = [...new Set(records.map((record) => record.date.slice(0, 7)))].sort(); // Descobre os meses presentes nos registros.
  const points = months.map((month) => ({ month, Receitas: records.filter((record) => record.date.startsWith(month) && record.kind === 'Receita').reduce((sum, record) => sum + Number(record.amount), 0), Despesas: records.filter((record) => record.date.startsWith(month) && record.kind === 'Despesa').reduce((sum, record) => sum + Number(record.amount), 0) })); // Soma receitas e despesas de cada mês.
  if (!points.length) return <p className="condo-empty">Cadastre lançamentos para visualizar o gráfico.</p>; // Mostra um estado vazio quando não há lançamentos.
  return ( // Entrega um gráfico responsivo acompanhado de resumo acessível.
    <div className="condo-chart-wrap">
      {/* Diferencia as previsões do gráfico do saldo calculado apenas com pagamentos. */}
      <p className="condo-muted condo-chart-note">Lançamentos previstos: inclui valores pagos e pendentes.</p>
      {/* Mantém altura estável para evitar saltos enquanto o gráfico é desenhado. */}
      <div className="condo-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={points} margin={{ top: 15, right: 15, bottom: 0, left: 0 }}><defs><linearGradient id="condo-income" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#36B5A0" stopOpacity={0.24} /><stop offset="1" stopColor="#36B5A0" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#ffffff0c" vertical={false} /><XAxis dataKey="month" stroke="#aab4c4" tickFormatter={(value) => value.slice(5) + '/' + value.slice(2, 4)} tickLine={false} axisLine={false} /><YAxis stroke="#aab4c4" tickFormatter={(value) => `${value / 1000}k`} tickLine={false} axisLine={false} width={40} /><Tooltip formatter={(value) => money(value)} contentStyle={{ background: '#1F2937', border: '1px solid #465164', borderRadius: 12, color: '#F4EFE9' }} /><Legend /><Area name="Receitas" dataKey="Receitas" stroke="#36B5A0" fill="url(#condo-income)" strokeWidth={3} isAnimationActive={false} /><Area name="Despesas" dataKey="Despesas" stroke="#C58B5A" fill="transparent" strokeWidth={3} isAnimationActive={false} /></AreaChart></ResponsiveContainer></div>
      {/* Oferece os mesmos valores sem depender de mouse, cor ou leitura do desenho. */}
      <details className="condo-chart-details"><summary>Consultar valores do gráfico</summary><ul>{points.map((point) => <li key={point.month}>{point.month}: receitas {money(point.Receitas)}; despesas {money(point.Despesas)}.</li>)}</ul></details>
    </div> // Encerra o contêiner do gráfico.
  ); // Encerra o retorno visual.
} // Encerra o componente financeiro.
