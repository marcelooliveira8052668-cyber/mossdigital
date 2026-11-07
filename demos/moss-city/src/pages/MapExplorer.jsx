// Importa o React e o estado dos filtros locais e da seleção territorial.
import React, { useState } from 'react';
// Importa a leitura da categoria e do ponto recebidos pelo endereço.
import { useSearchParams } from 'react-router-dom';
// Importa ícones que acompanham ações funcionais do explorador.
import { Search, Download, ListFilter, MapPin } from 'lucide-react';
// Importa o mapa interativo com base local e opção OpenStreetMap.
import CityMap from '../components/CityMap.jsx';
// Importa o painel que descreve o registro selecionado.
import PointDetail from '../components/PointDetail.jsx';
// Importa os rótulos e os bairros fictícios do cenário.
import { categories, districts } from '../data/scenario.js';
// Importa a função usada igualmente pelo mapa e pela lista.
import { filterPoints } from '../utils/domain.js';
// Importa a exportação local dos registros já filtrados.
import exportCsv from '../utils/exportCsv.js';
// Constrói o explorador territorial da primeira prévia com todos os controles ativos.
export default function MapExplorer({ data, profile }) {
  const [params, setParams] = useSearchParams(); // Mantém a categoria e o ponto compartilháveis no endereço local.
  const [search, setSearch] = useState(''); // Guarda a pesquisa pelo nome ou pelo bairro fictício.
  const [district, setDistrict] = useState(''); // Guarda o filtro de região demonstrativa.
  const [status, setStatus] = useState(''); // Guarda o filtro de situação dos locais.
  const [feedback, setFeedback] = useState(''); // Guarda a confirmação de download de relatório.
  const category = categories[params.get('category')] ? params.get('category') : ''; // Recusa categorias desconhecidas no endereço.
  const points = filterPoints(data.points, { search, district, status, category }); // Mantém mapa, contagem e lista com os mesmos filtros.
  const selected = points.find((item) => item.id === params.get('point')) || points[0]; // Mantém uma seleção válida ao filtrar o conjunto.
  const selectPoint = (id) => setParams({ ...(category ? { category } : {}), point: id }, { replace: true }); // Atualiza o endereço sem criar dezenas de entradas no histórico.
  const chooseCategory = (value) => setParams(value ? { category: value } : {}, { replace: true }); // Aplica a categoria e libera um ponto que possa ter ficado fora da seleção.
  function clear() { // Limpa todos os controles do explorador de uma só vez.
    setSearch(''); setDistrict(''); setStatus(''); setParams({}, { replace: true }); // Retorna à visão completa do cenário sem apagar seus dados.
  } // Encerra a limpeza dos filtros.
  function download() { // Exporta a seleção atual sem incluir campos administrativos de outros perfis.
    exportCsv('moss-city-territorio-DEMO.csv', [{ key: 'name', label: 'Local fictício' }, { key: 'category', label: 'Categoria' }, { key: 'district', label: 'Bairro fictício' }, { key: 'status', label: 'Situação' }], points); // Exporta somente informações públicas da seleção.
    setFeedback('Seleção exportada em CSV com dados fictícios.'); // Confirma o download de forma acessível.
  } // Encerra a exportação do território.
  return ( // Entrega o explorador de mapa e lista sincronizados.
    <section>
      {/* Explica a diferença entre território simulado e cartografia real opcional. */}
      <div className="city-page-heading"><div><span className="city-kicker">TERRITÓRIO / INTELIGÊNCIA ESPACIAL</span><h1>A cidade em perspectiva.</h1><p>Explore {data.points.length} locais fictícios. Selecione um marcador ou use a lista acessível.</p></div><button className="city-button city-button-outline" onClick={download}><Download size={16} aria-hidden="true" />Exportar seleção</button></div>
      {/* Filtra as categorias usando nomes e contagens, não apenas cores. */}
      <div className="city-category-tabs" aria-label="Filtrar categoria do mapa"><button aria-pressed={!category} onClick={() => chooseCategory('')}>Todos <span>{data.points.length}</span></button>{Object.entries(categories).map(([key, value]) => <button key={key} aria-pressed={category === key} onClick={() => chooseCategory(key)}><i style={{ background: value.color }} aria-hidden="true" />{value.label}<span>{data.points.filter((item) => item.category === key).length}</span></button>)}</div>
      {/* Mantém pesquisa e filtros adicionais próximos ao conteúdo que eles controlam. */}
      <div className="city-map-filters"><label className="city-search"><Search size={17} aria-hidden="true" /><span className="city-sr-only">Pesquisar local ou bairro</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar local ou bairro fictício..." /></label><label><span className="city-sr-only">Filtrar bairro</span><select aria-label="Filtrar bairro" value={district} onChange={(event) => setDistrict(event.target.value)}><option value="">Todas as regiões</option>{districts.map((name) => <option key={name}>{name}</option>)}</select></label><label><span className="city-sr-only">Filtrar situação</span><select aria-label="Filtrar situação" value={status} onChange={(event) => setStatus(event.target.value)}><option value="">Todas as situações</option>{[...new Set(data.points.map((item) => item.status))].map((name) => <option key={name}>{name}</option>)}</select></label><button className="city-button city-button-text" onClick={clear}>Limpar filtros</button></div>
      {/* Anuncia quantidade e operações sem interromper o uso por teclado. */}
      <p className="city-feedback" role="status">{feedback || `${points.length} locais na seleção atual · Todos os registros são fictícios`}</p>
      {/* Coloca o mapa em destaque e mantém detalhes identificáveis fora da cartografia. */}
      <div className="city-explorer-layout"><div className="city-panel city-explorer-map"><div className="city-panel-heading"><h2>Nova Aurora / Cenário urbano</h2><span className="city-mini-label">NÃO É OPERAÇÃO AO VIVO</span></div><CityMap points={points} selected={selected?.id} onSelect={selectPoint} /></div><PointDetail point={selected} profile={profile} /></div>
      {/* Oferece uma alternativa completa aos marcadores para teclado e leitores de tela. */}
      <section className="city-panel city-location-list" aria-labelledby="city-locations-title"><div className="city-panel-heading"><h2 id="city-locations-title"><ListFilter size={17} aria-hidden="true" />Locais desta seleção</h2><span className="city-mini-label">MESMOS DADOS DO MAPA</span></div>{points.length ? <div className="city-location-grid">{points.map((point) => <button className={`city-location-item ${selected?.id === point.id ? 'is-selected' : ''}`} key={point.id} aria-pressed={selected?.id === point.id} onClick={() => selectPoint(point.id)}><span className="city-category-symbol" style={{ '--category-color': categories[point.category].color }}>{categories[point.category].symbol}</span><span><strong>{point.name}</strong><small>{point.district} · {point.status}</small></span><MapPin size={16} aria-hidden="true" /></button>)}</div> : <div className="city-empty"><h3>Nenhum local encontrado</h3><p>Altere sua pesquisa ou limpe os filtros para explorar novamente.</p><button className="city-button city-button-outline" onClick={clear}>Ver todos os locais</button></div>}</section>
    </section> // Encerra o explorador territorial.
  ); // Encerra o retorno visual da página.
} // Encerra a página de mapa inteligente.
