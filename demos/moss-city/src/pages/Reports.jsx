// Importa o React e o estado da janela temporal dos relatórios.
import React, { useState } from 'react';
// Importa os ícones dos indicadores e das exportações.
import { Inbox, CircleCheck, Database, Wallet, Download, FileBarChart } from 'lucide-react';
// Importa os gráficos já usados no centro de comando, sem criar uma biblioteca nova.
import { RequestsChart, DistributionChart } from '../components/Charts.jsx';
// Importa as configurações, colunas e permissões dos módulos administrativos.
import { modules, columnLabels, recordsFor, permissions } from '../data/modules.js';
// Importa formatação e indicadores derivados dos próprios registros.
import { number, money, summarize } from '../utils/domain.js';
// Importa a exportação local das tabelas filtradas.
import exportCsv from '../utils/exportCsv.js';
// Define a ordem de leitura dos módulos na página de relatórios.
const reportOrder = ['obras', 'mobilidade', 'ambiente', 'servicos', 'solicitacoes', 'despesas'];
// Define o título de cada tabela de situação.
const reportTitles = { obras: 'Obras por situação', mobilidade: 'Mobilidade por situação', ambiente: 'Meio ambiente por situação', servicos: 'Equipamentos públicos por situação', solicitacoes: 'Atendimento por situação', despesas: 'Despesas por situação' };
// Indica quais módulos também somam uma coluna de valor fictício.
const valueColumns = { obras: { key: 'budget', label: 'Orçamento previsto' }, mobilidade: { key: 'lengthKm', label: 'Extensão (km)' }, ambiente: { key: 'areaHa', label: 'Área (ha)' }, despesas: { key: 'amount', label: 'Valor fictício' } };
// Ordena as situações pela sequência natural do fluxo, em vez da ordem alfabética.
const statusOrder = ['Planejada', 'Em execução', 'Pausada', 'Operacional', 'Em manutenção', 'Aberta', 'Em triagem', 'Em atendimento', 'Concluída', 'Prevista', 'Registrada'];
// Constrói a página de relatórios calculada exclusivamente dos registros locais.
export default function Reports({ data, profile }) {
  const [months, setMonths] = useState(6); // Controla a janela temporal usada por métricas, gráficos e tabelas.
  const [distribution, setDistribution] = useState('servicos'); // Escolhe a distribuição exibida ao lado da evolução.
  const metrics = summarize(data); // Recalcula os totais gerais do cenário.
  // Monta as chaves de ano-mês da janela selecionada, seguindo o mesmo critério do gráfico.
  const keys = Array.from({ length: months }, (_, index) => { const date = new Date(new Date().getFullYear(), new Date().getMonth() - months + 1 + index, 1); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; });
  const inWindow = (record, dateKey = 'date') => keys.includes(String(record[dateKey] || '').slice(0, 7)); // Mantém apenas registros com data dentro da janela.
  const requests = data.requests.filter((request) => inWindow(request)); // Filtra os protocolos da janela escolhida.
  const completed = requests.filter((request) => request.status === 'Concluída'); // Separa os atendimentos finalizados.
  const available = reportOrder.filter((key) => permissions[profile]?.includes(key)); // Mostra somente os módulos que este perfil demonstrativo pode consultar.
  const moduleRows = available.map((key) => ({ key, records: recordsFor(data, key, profile).filter((record) => inWindow(record, modules[key].dateKey)) })); // Aplica a mesma janela a cada domínio.
  const managementTotal = moduleRows.reduce((sum, row) => sum + row.records.length, 0); // Soma os registros administrativos visíveis.
  const windowExpenses = data.expenses.filter((expense) => inWindow(expense)).reduce((sum, item) => sum + item.amount, 0); // Calcula as despesas lançadas na janela.
  function groupRows(key, records) { // Agrega os registros de um módulo por situação.
    const valueColumn = valueColumns[key]; // Lê a coluna numérica quando o módulo possui uma.
    const map = new Map(); // Cria um mapa temporário de situações.
    records.forEach((record) => { const row = map.get(record.status) || { status: record.status, count: 0, value: 0 }; row.count += 1; row.value += valueColumn ? Number(record[valueColumn.key]) || 0 : 0; map.set(record.status, row); }); // Acumula contagem e soma por situação.
    return [...map.values()].sort((a, b) => (statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)) || a.status.localeCompare(b.status, 'pt-BR')); // Entrega linhas em ordem estável e previsível.
  } // Encerra a agregação de uma tabela.
  function download(key, records) { const config = modules[key]; exportCsv(`moss-city-${key}-DEMO.csv`, config.columns.map((column) => ({ key: column, label: columnLabels[column] || column })), records); } // Exporta exatamente as linhas da janela atual.
  const periodLabel = `últimos ${months} meses`; // Prepara o rótulo repetido em métricas e tabelas.
  return ( // Entrega a tela consolidada de relatórios.
    <section>
      {/* Apresenta o propósito da página e o controle único de período. */}
      <div className="city-page-heading"><div><span className="city-kicker">RELATÓRIOS / VISÃO CONSOLIDADA</span><h1>Sínteses para decidir.</h1><p>Valores calculados dos registros fictícios armazenados neste navegador · janela: {periodLabel}.</p></div><label className="city-period-select"><span>Janela dos relatórios</span><select aria-label="Janela dos relatórios" value={months} onChange={(event) => setMonths(Number(event.target.value))}><option value="3">Últimos 3 meses</option><option value="6">Últimos 6 meses</option><option value="12">Últimos 12 meses</option></select></label></div>
      {/* Reaproveita a faixa contínua de indicadores com números derivados da janela. */}
      <div className="city-command-metrics">{[{ label: 'Solicitações na janela', value: number(requests.length), note: `${completed.length} concluídas · ${requests.length ? Math.round(completed.length / requests.length * 100) : 0}% de resolução`, Icon: Inbox }, { label: 'Registros de gestão', value: number(managementTotal), note: `${available.length} módulos disponíveis ao perfil`, Icon: Database }, { label: 'Obras em execução', value: number(metrics.works), note: `${metrics.budget ? money(metrics.budget) : money(0)} previstos no cenário`, Icon: CircleCheck }, { label: profile === 'administrador' ? 'Despesas na janela' : 'Locais no território', value: profile === 'administrador' ? money(windowExpenses) : number(data.points.length), note: profile === 'administrador' ? 'Lançamentos fictícios, sem pagamento real' : 'Pontos fictícios conectados ao mapa', Icon: Wallet }].map(({ label, value, note, Icon }) => <article key={label}><div><span>{label}</span><Icon size={18} aria-hidden="true" /></div><strong>{value}</strong><small>{note}</small></article>)}</div>
      {/* Mantém os mesmos gráficos funcionais do comando, agora sincronizados à janela escolhida. */}
      <div className="city-chart-grid"><article className="city-panel"><div className="city-panel-heading"><div><span className="city-kicker">ATENDIMENTO / {periodLabel.toUpperCase()}</span><h2>Evolução das solicitações</h2></div></div><div className="city-chart-legend"><span>Solicitações</span><span>Concluídas</span></div><RequestsChart requests={data.requests} months={months} /></article><article className="city-panel"><div className="city-panel-heading"><div><span className="city-kicker">DISTRIBUIÇÃO DO CENÁRIO</span><h2>{distribution === 'despesas' ? 'Despesas por setor' : 'Serviços públicos'}</h2></div>{profile === 'administrador' && <label><span className="city-sr-only">Visualização por setor</span><select aria-label="Visualização por setor" value={distribution} onChange={(event) => setDistribution(event.target.value)}><option value="servicos">Serviços</option><option value="despesas">Despesas</option></select></label>}</div><p className="city-chart-note">Mesmos dados textuais do centro de comando, recalculados a cada mudança de cenário.</p><DistributionChart data={data} mode={distribution} /></article></div>
      {/* Gera uma tabela de situações para cada módulo autorizado ao perfil. */}
      <div className="city-report-grid">{moduleRows.map(({ key, records }) => { const config = modules[key]; const rows = groupRows(key, records); const valueColumn = valueColumns[key]; const totalValue = rows.reduce((sum, row) => sum + row.value, 0); return (
        <article className="city-panel" key={key}>
          {/* Identifica a tabela, sua janela e a ação de exportação. */}
          <div className="city-panel-heading"><div><span className="city-kicker">{config.subtitle}</span><h2>{reportTitles[key]}</h2></div><button className="city-button city-button-text" onClick={() => download(key, records)}><Download size={15} aria-hidden="true" />Exportar CSV</button></div>
          {rows.length ? ( // Mostra a tabela apenas quando a janela tem registros.
            <div className="city-report-table-wrap"><table className="city-report-table"><caption className="city-sr-only">{reportTitles[key]} nos {periodLabel}, com total de registros{valueColumn ? ' e soma do valor fictício' : ''}</caption><thead><tr><th scope="col">Situação</th><th scope="col">Registros</th>{valueColumn && <th scope="col">{valueColumn.label}</th>}</tr></thead><tbody>{rows.map((row) => <tr key={row.status}><th scope="row">{row.status}</th><td>{number(row.count)}</td>{valueColumn && <td>{key === 'mobilidade' || key === 'ambiente' ? number(row.value.toFixed(1)) : money(row.value)}</td>}</tr>)}</tbody><tfoot><tr><th scope="row">Total</th><td>{number(records.length)}</td>{valueColumn && <td>{key === 'mobilidade' || key === 'ambiente' ? number(totalValue.toFixed(1)) : money(totalValue)}</td>}</tr></tfoot></table></div>
          ) : (
            <p className="city-empty">Nenhum registro deste módulo dentro da janela de {periodLabel}.</p> // Mantém o módulo visível para explicar a ausência de dados.
          )}
        </article> // Encerra o painel de um módulo.
      ); })}</div>
      {/* Explica limites dos números antes de qualquer exportação. */}
      <p className="city-module-note"><FileBarChart size={15} aria-hidden="true" /> Todos os valores são fictícios e recalculados dos registros locais. Não representam execução orçamentária, indicadores oficiais ou metas de órgãos públicos.</p>
    </section> // Encerra a tela de relatórios.
  ); // Encerra o retorno visual.
} // Encerra a página de relatórios.
