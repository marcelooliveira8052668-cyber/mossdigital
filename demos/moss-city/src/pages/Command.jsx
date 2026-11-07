// Importa o React e os filtros que controlam as visualizações do painel.
import React, { useState } from 'react';
// Importa a navegação para abrir o mapa com uma seleção preservada.
import { Link } from 'react-router-dom';
// Importa os ícones lineares do centro de comando.
import { Users, HardHat, CircleCheck, Inbox, ArrowUpRight, GraduationCap, HeartPulse, Lightbulb, Trees, CircleAlert, Wallet, ScanLine, Bus, Building2, BarChart3 } from 'lucide-react';
// Importa o mapa interativo da área principal.
import CityMap from '../components/CityMap.jsx';
// Importa o detalhe que responde à seleção dos marcadores.
import PointDetail from '../components/PointDetail.jsx';
// Importa as visualizações calculadas diretamente dos registros fictícios.
import { RequestsChart, DistributionChart } from '../components/Charts.jsx';
// Importa as categorias para os filtros territoriais do painel.
import { categories } from '../data/scenario.js';
// Importa formatação e indicadores derivados, sem duplicar números manuais.
import { number, money, summarize } from '../utils/domain.js';
// Importa as permissões que decidem quais módulos cada perfil pode abrir.
import { permissions } from '../data/modules.js';
// Constrói o primeiro centro de comando com foco no território e nas prioridades.
export default function Command({ data, profile }) {
  const [category, setCategory] = useState(profile === 'obras' ? 'obras' : profile === 'ambiental' ? 'ambiente' : ''); // Começa com uma visão apropriada ao gestor escolhido.
  const [selection, setSelection] = useState(''); // Guarda o registro selecionado no mapa.
  const [months, setMonths] = useState(6); // Controla a janela temporal do gráfico de solicitações.
  const [distribution, setDistribution] = useState(profile === 'administrador' ? 'despesas' : 'servicos'); // Evita abrir despesas na primeira visão de gestores especializados.
  const metrics = summarize(data); // Recalcula os indicadores quando um protocolo é criado ou o cenário é restaurado.
  const points = data.points.filter((item) => !category || item.category === category); // Limita o mapa à categoria escolhida.
  const selected = points.find((item) => item.id === selection) || points[0]; // Garante um painel de detalhe válido mesmo após mudar filtros.
  const label = profile === 'obras' ? 'FOCO / INFRAESTRUTURA' : profile === 'ambiental' ? 'FOCO / MEIO AMBIENTE' : 'CENTRO DE COMANDO / VISÃO INTEGRADA'; // Diferencia a experiência dos gestores sem inventar autenticação.
  const shortcuts = [{ key: 'obras', label: 'Obras', Icon: HardHat }, { key: 'mobilidade', label: 'Mobilidade', Icon: Bus }, { key: 'ambiente', label: 'Ambiente', Icon: Trees }, { key: 'servicos', label: 'Serviços', Icon: Building2 }, { key: 'solicitacoes', label: 'Atendimento', Icon: Inbox }, { key: 'despesas', label: 'Despesas', Icon: Wallet }, { key: 'relatorios', label: 'Relatórios', Icon: BarChart3 }].filter((item) => permissions[profile]?.includes(item.key)); // Mostra somente os módulos autorizados ao perfil demonstrativo.
  return ( // Monta a composição territorial exclusiva da MOSS CITY.
    <section>
      {/* Apresenta o contexto e uma ação real para explorar o território. */}
      <div className="city-page-heading"><div><span className="city-kicker">{label}</span><h1>Uma cidade. Todas as conexões.</h1><p>Nova Aurora · Cenário fictício para decisões em perspectiva.</p></div><Link className="city-button city-button-outline" to={`/${profile}/mapa`}><ScanLine size={17} aria-hidden="true" />Explorar território</Link></div>
      {/* Oferece atalhos diretos aos módulos que este perfil já encontra no menu lateral. */}
      <nav className="city-command-shortcuts" aria-label="Atalhos dos módulos">{shortcuts.map(({ key, label: name, Icon }) => <Link key={key} to={`/${profile}/${key}`}><Icon size={16} aria-hidden="true" />{name}<ArrowUpRight size={13} aria-hidden="true" /></Link>)}</nav>
      {/* Usa uma faixa contínua de números, diferente dos cartões soltos da MOSS CONDO. */}
      <div className="city-command-metrics">{[{ label: 'População estimada', value: number(metrics.population), note: 'Habitantes fictícios', Icon: Users }, { label: 'Solicitações', value: number(metrics.requests), note: 'Histórico completo do cenário', Icon: Inbox }, { label: 'Obras em andamento', value: number(metrics.works), note: 'Situação: em execução', Icon: HardHat }, { label: 'Serviços concluídos', value: number(metrics.completed), note: `${metrics.serviceRate}% dos protocolos`, Icon: CircleCheck }].map(({ label: title, value, note, Icon }) => <article key={title}><div><span>{title}</span><Icon size={18} aria-hidden="true" /></div><strong>{value}</strong><small>{note}</small></article>)}</div>
      {/* Coloca o mapa como elemento principal em vez de repetir um dashboard de cartões financeiros. */}
      <div className="city-command-grid"><article className="city-panel city-command-map"><div className="city-panel-heading"><div><span className="city-kicker">INTELIGÊNCIA TERRITORIAL</span><h2>O território, em uma só visão.</h2></div><Link to={`/${profile}/mapa`} aria-label="Abrir mapa completo"><ArrowUpRight size={22} aria-hidden="true" /></Link></div><label className="city-command-layer"><span>Camada de interesse</span><select aria-label="Camada de interesse" value={category} onChange={(event) => { setCategory(event.target.value); setSelection(''); }}><option value="">Todos os setores</option>{Object.entries(categories).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}</select><span>{points.length} locais fictícios</span></label><CityMap compact points={points} selected={selected?.id} onSelect={setSelection} /><div className="city-map-legend">{Object.entries(categories).map(([key, item]) => <span key={key}><i style={{ background: item.color }} />{item.label}</span>)}</div></article><aside className="city-command-focus"><div className="city-focus-heading"><span className="city-kicker">FOCO NO TERRITÓRIO</span><span className="city-mini-label">SELEÇÃO DO MAPA</span></div><PointDetail point={selected} profile={profile} link /></aside></div>
      {/* Complementa a visão com todos os indicadores ligados ao cadastro territorial. */}
      <section className="city-secondary-metrics" aria-label="Indicadores complementares">{[{ label: 'Escolas', value: metrics.schools, Icon: GraduationCap }, { label: 'Unidades de saúde', value: metrics.health, Icon: HeartPulse }, { label: 'Pontos de iluminação', value: metrics.lights, Icon: Lightbulb }, { label: 'Parques cadastrados', value: metrics.greens, Icon: Trees }, { label: 'Ocorrências pendentes', value: metrics.pending, Icon: CircleAlert }, { label: profile === 'administrador' ? 'Orçamento de obras' : 'Locais no território', value: profile === 'administrador' ? money(metrics.budget) : data.points.length, Icon: Wallet }].map(({ label: title, value, Icon }) => <article key={title}><Icon size={18} aria-hidden="true" /><div><strong>{value}</strong><span>{title}</span></div></article>)}</section>
      {/* Oferece filtros reais e os mesmos valores em representação textual acessível. */}
      <div className="city-chart-grid"><article className="city-panel"><div className="city-panel-heading"><div><span className="city-kicker">ATENDIMENTO EM PERSPECTIVA</span><h2>Evolução das solicitações</h2></div><label><span className="city-sr-only">Período do gráfico</span><select aria-label="Período do gráfico" value={months} onChange={(event) => setMonths(Number(event.target.value))}><option value="6">6 meses</option><option value="3">3 meses</option></select></label></div><div className="city-chart-legend"><span>Solicitações</span><span>Concluídas</span></div><RequestsChart requests={data.requests} months={months} /></article><article className="city-panel"><div className="city-panel-heading"><div><span className="city-kicker">DISTRIBUIÇÃO DO CENÁRIO</span><h2>{distribution === 'despesas' ? 'Despesas por setor' : 'Serviços públicos'}</h2></div>{profile === 'administrador' && <label><span className="city-sr-only">Visualização por setor</span><select aria-label="Visualização por setor" value={distribution} onChange={(event) => setDistribution(event.target.value)}><option value="despesas">Despesas</option><option value="servicos">Serviços</option></select></label>}</div><p className="city-chart-note">{distribution === 'despesas' ? 'Lançamentos fictícios; não representam execução orçamentária real.' : 'Quantidade de solicitações demonstrativas por categoria.'}</p><DistributionChart data={data} mode={distribution} /></article></div>
    </section> // Encerra o primeiro centro de comando.
  ); // Encerra o retorno visual do painel.
} // Encerra a visão de comando territorial.
