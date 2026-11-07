// Importa o React e o estado do calendário, filtros e formulário.
import React, { useState } from 'react';
// Importa ícones para navegar entre meses e iniciar uma reserva.
import { ChevronLeft, ChevronRight, Plus, CalendarDays } from 'lucide-react';
// Importa as áreas comuns permitidas nesta demonstração.
import { areas } from '../data/seed.js';
// Importa o formulário acessível usado para criar reservas.
import RecordDialog from '../components/RecordDialog.jsx';
// Importa as regras que validam datas, horários e conflitos.
import { identifier, today, reservationError } from '../utils/rules.js';
// Importa as fotos locais de cada área comum reservável.
import { areaPhotos } from '../data/photos.js';
// Importa o componente de imagem responsiva com descrição acessível.
import Photo from '../components/Photo.jsx';
// Implementa um calendário mensal com reservas reais dentro da demonstração.
export default function Reservations({ data, update, profile }) {
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1)); // Começa no primeiro dia do mês atual.
  const [selected, setSelected] = useState(today()); // Guarda o dia escolhido no calendário.
  const [area, setArea] = useState(''); // Guarda o filtro opcional de área comum.
  const [editing, setEditing] = useState(null); // Guarda o formulário de reserva aberto.
  const [feedback, setFeedback] = useState(''); // Guarda o resultado de uma operação.
  const resident = profile === 'morador'; // Identifica a visão da unidade A · 302.
  const records = data.reservations; // Lê todas as reservas para detectar conflitos sem expor titulares.
  const own = records.filter((item) => !resident || item.unit === 'A · 302'); // Separa apenas o histórico permitido ao perfil.
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate(); // Calcula quantos dias existem no mês exibido.
  const offset = (month.getDay() + 6) % 7; // Faz o calendário começar na segunda-feira.
  const formatDate = (day) => `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // Monta a data sem conversões de fuso horário.
  const booked = records.filter((item) => item.date === selected && item.status !== 'Cancelada' && (!area || item.area === area)); // Encontra horários ocupados no dia selecionado.
  const events = data.notices.filter((item) => item.date === selected && ['Reunião', 'Assembleia', 'Evento'].includes(item.category) && (!resident || ['Todos', 'Bloco A'].includes(item.audience))); // Encontra eventos públicos permitidos para esse dia.
  function changeMonth(direction) { // Troca o mês exibido e seleciona seu primeiro dia.
    const next = new Date(month.getFullYear(), month.getMonth() + direction, 1); // Usa o calendário nativo para tratar viradas de ano.
    setMonth(next); // Atualiza o cabeçalho e a grade mensal.
    setSelected(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-01`); // Mantém a seleção dentro do mês aberto.
  } // Encerra a navegação mensal.
  function save(values) { // Valida e registra uma reserva fictícia.
    const candidate = { ...values, id: identifier(), unit: resident ? 'A · 302' : values.unit.trim(), status: 'Confirmada' }; // Define a unidade e o estado inicial.
    if (!candidate.unit) return 'Informe uma unidade fictícia.'; // Recusa unidades em branco.
    const message = reservationError(records, candidate); // Verifica data, ordem dos horários e sobreposição.
    if (message) return message; // Mantém o diálogo aberto quando há conflito.
    update('reservations', [...records, candidate]); // Adiciona a reserva sem apagar o histórico anterior.
    setSelected(candidate.date); // Mostra imediatamente o dia reservado.
    setMonth(new Date(Number(candidate.date.slice(0, 4)), Number(candidate.date.slice(5, 7)) - 1, 1)); // Exibe o mês da reserva criada sem conversões de fuso horário.
    setFeedback('Reserva fictícia confirmada.'); // Confirma a operação para o visitante.
    return ''; // Autoriza o fechamento do diálogo.
  } // Encerra a gravação da reserva.
  function cancel(item) { // Cancela uma reserva sem eliminar seu histórico.
    if (!window.confirm('Cancelar esta reserva fictícia?')) return; // Solicita confirmação explícita.
    update('reservations', records.map((record) => record.id === item.id ? { ...record, status: 'Cancelada' } : record)); // Libera o horário da reserva cancelada.
    setFeedback('Reserva cancelada; o horário está disponível novamente.'); // Explica o efeito do cancelamento.
  } // Encerra o cancelamento.
  const fields = [{ key: 'area', label: 'Área comum', options: areas }, { key: 'date', label: 'Data', type: 'date' }, { key: 'start', label: 'Início', type: 'time' }, { key: 'end', label: 'Fim', type: 'time' }, ...(!resident ? [{ key: 'unit', label: 'Unidade fictícia' }] : [])]; // Descreve os campos do formulário de reserva.
  return ( // Entrega a tela de calendário e histórico.
    <section>
      {/* Identifica o módulo e oferece uma ação de reserva funcional. */}
      <div className="condo-page-heading"><div><p className="condo-eyebrow">ESPAÇOS PARA COMPARTILHAR</p><h1>Seu próximo bom momento.</h1><p>Reserve, acompanhe e aproveite. Sem sobreposição de horários.</p></div><button className="condo-button" onClick={() => setEditing({ area: area || areas[0], date: selected, start: '14:00', end: '16:00', unit: 'A · 302' })}><Plus size={17} aria-hidden="true" />Reservar espaço</button></div>
      {/* Mostra uma foto específica para cada espaço, com seleção funcional de disponibilidade. */}
      <div className="condo-area-gallery">{areas.map((name) => <article className={`condo-area-card ${area === name ? 'is-selected' : ''}`} key={name}><Photo image={areaPhotos[name]} sizes="(max-width: 600px) 90vw, (max-width: 1200px) 40vw, 18vw" /><div><h2>{name}</h2><button className="condo-area-select" aria-label={`Ver disponibilidade: ${name}`} aria-pressed={area === name} onClick={() => setArea(area === name ? '' : name)}>Ver disponibilidade <span aria-hidden="true">↗</span></button></div></article>)}</div>
      {/* Anuncia confirmações sem interromper a navegação por teclado. */}
      <p role="status" className="condo-feedback">{feedback || 'Os horários ocupados são públicos; o morador só vê os titulares de suas próprias reservas.'}</p>
      {/* Divide calendário e disponibilidade em duas colunas responsivas. */}
      <div className="condo-calendar-layout">
        {/* Agrupa o mês visível e os botões de seleção de dia. */}
        <article className="condo-panel">
          {/* Oferece navegação pelos meses sem recarregar a página. */}
          <div className="condo-calendar-heading"><button className="condo-icon-button" aria-label="Mês anterior" onClick={() => changeMonth(-1)}><ChevronLeft aria-hidden="true" /></button><h2>{month.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h2><button className="condo-icon-button" aria-label="Próximo mês" onClick={() => changeMonth(1)}><ChevronRight aria-hidden="true" /></button></div>
          {/* Cria uma grade com os sete dias de cada semana. */}
          <div className="condo-calendar-grid">
            {/* Identifica as colunas de segunda-feira até domingo. */}
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => <span className="condo-weekday" key={day}>{day}</span>)}
            {/* Deixa vazias as posições anteriores ao primeiro dia do mês. */}
            {Array.from({ length: offset }, (_, index) => <span key={`empty-${index}`} aria-hidden="true" />)}
            {/* Constrói um botão acessível para cada data do mês. */}
            {Array.from({ length: days }, (_, index) => {
              const date = formatDate(index + 1); // Transforma a posição da célula em uma data local.
              const count = records.filter((item) => item.date === date && item.status !== 'Cancelada' && (!area || item.area === area)).length; // Conta somente reservas ativas da área selecionada.
              const label = `${index + 1}${count > 0 ? ` ${count} reserva(s)` : ''}, data ${date.split('-').reverse().join('/')}`; // Repete o texto visível para permitir comandos de voz e acrescenta a data completa.
              return <button key={date} className={`${selected === date ? 'is-selected' : ''} ${date === today() ? 'is-today' : ''}`} aria-pressed={selected === date} aria-label={label} onClick={() => setSelected(date)}><span>{index + 1}</span>{' '}{count > 0 && <small>{count} reserva(s)</small>}</button>; // Seleciona o dia e separa o número da contagem também no nome acessível.
            })}
          </div> {/* Encerra a grade mensal de datas. */}
        </article> {/* Encerra o cartão do calendário. */}
        {/* Mostra os intervalos ocupados sem revelar outras unidades ao morador. */}
        <aside className="condo-panel"><span className="condo-eyebrow">DISPONIBILIDADE</span><h2>{selected.split('-').reverse().join('/')}</h2><label className="condo-field">Área comum<select aria-label="Área comum" value={area} onChange={(event) => setArea(event.target.value)}><option value="">Todas as áreas</option>{areas.map((name) => <option key={name}>{name}</option>)}</select></label><p className="condo-muted">Horários fora dos intervalos abaixo estão disponíveis, sujeitos à validação da reserva.</p>{booked.length ? booked.map((item) => <div className="condo-notice-preview" key={item.id}><small>{item.start}–{item.end} · Ocupado</small><strong>{item.area}</strong>{(!resident || item.unit === 'A · 302') && <span>{item.unit}</span>}</div>) : <p className="condo-empty">Nenhum horário ocupado nesta seleção.</p>}{events.map((event) => <div className="condo-notice-preview" key={event.id}><small>{event.category}</small><strong>{event.title}</strong><p>{event.text}</p></div>)}</aside>
      </div> {/* Encerra a composição de calendário e disponibilidade. */}
      {/* Mantém o histórico de reservas, inclusive as canceladas. */}
      <article className="condo-panel condo-history"><h2>{resident ? 'Suas reservas & histórico' : 'Reservas & histórico'}</h2>{own.length ? own.filter((item) => !area || item.area === area).map((item) => <div className="condo-reservation-row" key={item.id}><CalendarDays size={20} aria-hidden="true" /><div><strong>{item.area}</strong><small>{item.date.split('-').reverse().join('/')} · {item.start}–{item.end} · {item.unit}</small></div><span className="condo-badge">{item.status}</span>{item.status !== 'Cancelada' && <button className="condo-button condo-secondary" onClick={() => cancel(item)}>Cancelar</button>}</div>) : <p className="condo-empty">Nenhuma reserva no histórico.</p>}</article>
      {/* Abre o formulário de criação e mantém a validação de conflito no salvamento. */}
      {editing && <RecordDialog title="Reservar área comum" fields={fields} initial={editing} onSave={save} onClose={() => setEditing(null)} />}
    </section> // Encerra a tela de reservas.
  ); // Encerra o retorno visual.
} // Encerra o calendário interativo.
