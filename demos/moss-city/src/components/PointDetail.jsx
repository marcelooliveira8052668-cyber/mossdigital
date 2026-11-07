// Importa o React para desenhar as informações do ponto selecionado.
import React from 'react';
// Importa o ícone de localização usado junto ao nome do bairro fictício.
import { MapPin, ArrowUpRight } from 'lucide-react';
// Importa links para abrir o mesmo ponto no explorador territorial.
import { Link } from 'react-router-dom';
// Importa a foto contextual do registro.
import Photo from './Photo.jsx';
// Importa as categorias controladas do território.
import { categories } from '../data/scenario.js';
// Importa a formatação dos valores fictícios.
import { money } from '../utils/domain.js';
// Converte uma data no formato 2026-01-31 para 31/01/2026 sem depender do fuso do navegador.
const brDate = (value) => { const [year, month, day] = String(value || '').split('-'); return year && month && day ? `${day}/${month}/${year}` : String(value || ''); }; // Devolve a data brasileira ou o texto original quando a data não existe.
// Mostra detalhes públicos e, quando permitido, o orçamento do ponto selecionado.
export default function PointDetail({ point, profile, link = false }) {
  if (!point) return <div className="city-empty">Nenhum local corresponde aos filtros. Limpe a seleção para continuar explorando.</div>; // Evita tentar ler propriedades de uma seleção vazia.
  const category = categories[point.category]; // Localiza o rótulo e a foto contextual da categoria.
  const showBudget = ['administrador', 'obras'].includes(profile) && point.category === 'obras'; // Limita os valores administrativos na interface demonstrativa.
  const specs = []; // Prepara a lista curta de características técnicas do ponto.
  if (point.category === 'obras' && point.startDate && point.endDate) specs.push(['Prazo demonstrativo', `${brDate(point.startDate)} → ${brDate(point.endDate)}`]); // Mostra o intervalo previsto da obra fictícia.
  if (point.category === 'mobilidade' && point.lineCode) specs.push(['Linha fictícia', point.lineCode]); // Identifica a linha quando ela existe no cadastro.
  if (point.category === 'mobilidade' && Number(point.frequency) > 0) specs.push(['Intervalo demonstrativo', `${point.frequency} min`]); // Informa o intervalo sem afirmar tempo real.
  if (point.category === 'mobilidade' && Number(point.lengthKm) > 0) specs.push(['Extensão demonstrativa', `${point.lengthKm} km`]); // Apresenta a extensão do trecho fictício.
  if (point.category === 'ambiente' && Number(point.areaHa) > 0) specs.push(['Área demonstrativa', `${point.areaHa} ha`]); // Exibe a área cadastrada para o local ambiental.
  const events = Array.isArray(point.history) ? [...point.history].slice(-3).reverse() : []; // Copia os três eventos mais recentes do histórico, do mais recente para o mais antigo.
  return ( // Entrega um painel que corresponde ao marcador e à linha selecionados.
    <article className="city-point-detail">
      {/* Usa uma foto de referência sem apresentá-la como registro real da intervenção. */}
      <Photo key={category.photo} image={category.photo} sizes="(max-width: 800px) 90vw, 30vw" />
      {/* Agrupa o nome, a localização e os dados do cenário fictício. */}
      <div className="city-point-detail-body"><span className="city-kicker city-kicker-category" style={{ '--category-color': category.color }}>{category.label.toLocaleUpperCase('pt-BR')} · DEMONSTRAÇÃO</span><h2>{point.name}</h2><p className="city-point-location"><MapPin size={14} aria-hidden="true" />{point.district}</p><span className="city-badge">{point.status}</span><p className="city-detail-description">{point.description}</p>
        {/* Mostra as características técnicas do ponto, sempre rotuladas como demonstrativas. */}
        {specs.length > 0 && <dl className="city-point-specs">{specs.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>}
        {/* Desenha avanço somente para obras, sem simular progresso dos demais tipos de local. */}
        {point.category === 'obras' && <div className="city-project-progress"><div><span>Execução demonstrativa</span><strong>{point.progress}%</strong></div><progress max="100" value={point.progress} aria-label={`Execução de ${point.name}`} /></div>}
        {/* Não mostra orçamento administrativo no perfil do cidadão ou do gestor ambiental. */}
        {showBudget && <div className="city-budget-line"><span>Orçamento previsto fictício</span><strong>{money(point.budget)}</strong></div>}
        {/* Apresenta as etapas já registradas no ponto, sem sugerir andamento em tempo real. */}
        {events.length > 0 && <section className="city-point-history"><span className="city-kicker">HISTÓRICO DEMONSTRATIVO</span><ul>{events.map((event, index) => <li key={`${event.date}-${index}`}><time>{brDate(event.date)}</time><span>{event.text}</span></li>)}</ul></section>}
        {/* Abre o explorador com a seleção preservada quando o painel está no dashboard. */}
        {link && <Link className="city-detail-link" to={`/${profile}/mapa?point=${point.id}`}>Localizar no território <ArrowUpRight size={17} aria-hidden="true" /></Link>}
      </div> {/* Encerra as informações textuais do ponto. */}
    </article> // Encerra o cartão de detalhe.
  ); // Encerra o retorno visual.
} // Encerra o componente de informações territoriais.
