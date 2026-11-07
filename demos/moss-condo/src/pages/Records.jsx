// Importa o React e o estado dos filtros e formulários.
import React, { useState } from 'react';
// Importa ícones que acompanham ações com rótulos textuais.
import { Plus, Search, Pencil, Trash2, Download } from 'lucide-react';
// Importa o formulário acessível compartilhado entre os módulos.
import RecordDialog from '../components/RecordDialog.jsx';
// Importa o gráfico para recalcular a visão financeira conforme os filtros.
import FinanceChart from '../components/FinanceChart.jsx';
// Importa os títulos de coluna definidos no catálogo local.
import { labels } from '../data/modules.js';
// Importa funções de formatação, data e identificação.
import { identifier, money, today } from '../utils/rules.js';
// Importa a faixa visual para manter fotos também nos módulos de gestão.
import PhotoBanner from '../components/PhotoBanner.jsx';
// Importa a relação entre cada módulo e sua imagem contextual.
import { modulePhotos } from '../data/photos.js';
// Constrói uma tela funcional de listagem, pesquisa e edição.
export default function Records({ config, data, update, profile }) {
  const [search, setSearch] = useState(''); // Guarda o texto da pesquisa.
  const [category, setCategory] = useState(''); // Guarda o filtro de categoria ou situação.
  const [month, setMonth] = useState(''); // Guarda o mês usado para filtrar datas.
  const [editing, setEditing] = useState(null); // Guarda o registro atualmente aberto no formulário.
  const [feedback, setFeedback] = useState(''); // Guarda a confirmação de uma operação concluída.
  const resident = profile === 'morador'; // Identifica a visão limitada à unidade fictícia.
  const records = data[config.collection]; // Lê a coleção correspondente ao módulo aberto.
  const readOnly = (resident && config.collection === 'finances') || (profile !== 'sindico' && config.collection === 'notices'); // Reserva a publicação de comunicados ao síndico e impede o morador de editar taxas.
  const scoped = records.filter((item) => !resident || (config.collection === 'notices' ? ['Todos', 'Bloco A'].includes(item.audience) : item.unit === 'A · 302')); // Filtra dados antes de pesquisar ou exportar.
  const filterKey = config.collection === 'notices' || config.collection === 'finances' ? 'category' : config.collection === 'residents' ? 'type' : 'status'; // Escolhe um filtro apropriado ao módulo.
  const options = [...new Set(scoped.map((item) => item[filterKey]).filter(Boolean))]; // Deriva opções a partir dos dados existentes.
  const visible = scoped.filter((item) => Object.values(item).join(' ').toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR')) && (!category || item[filterKey] === category) && (!month || item.date?.startsWith(month))); // Aplica pesquisa, categoria e mês em conjunto.
  const fields = config.fields.filter((item) => !resident || !['unit', 'type', 'status'].includes(item.key)); // Remove campos administrativos do formulário do morador.
  function openNew() { // Prepara os valores iniciais de um novo cadastro.
    const initial = Object.fromEntries(config.fields.map((item) => [item.key, item.options?.[0] ?? (item.type === 'date' ? today() : '')])); // Preenche opções e data sem dados pessoais reais.
    setEditing({ ...initial, unit: resident ? 'A · 302' : initial.unit || 'Coletivo', status: initial.status || 'Aberta', type: initial.type || 'Ocorrência' }); // Garante os padrões obrigatórios.
  } // Encerra a preparação de um novo registro.
  function save(values) { // Valida e grava o registro que está no formulário.
    if (fields.some((item) => !String(values[item.key] ?? '').trim())) return 'Preencha os campos sem usar apenas espaços.'; // Evita textos vazios disfarçados de preenchimento.
    if (config.collection === 'finances' && (!Number.isFinite(Number(values.amount)) || Number(values.amount) <= 0)) return 'Informe um valor fictício maior que zero.'; // Valida o valor financeiro.
    const stamp = `${new Date().toLocaleString('pt-BR')}: ${values.id ? 'atualizado' : 'criado'}${values.status ? ` · ${values.status}` : ''}`; // Descreve a operação para o histórico.
    const entry = { ...values, id: values.id || identifier(), history: [values.history, stamp].filter(Boolean).join(' | ') }; // Preserva e amplia o histórico demonstrativo.
    if (resident) { entry.unit = 'A · 302'; entry.type = 'Ocorrência'; } // Impede a troca da unidade pelo perfil do morador.
    update(config.collection, values.id ? records.map((item) => item.id === values.id ? entry : item) : [...records, entry]); // Atualiza ou adiciona o registro sem alterar outras coleções.
    setFeedback('Registro salvo nesta demonstração.'); // Confirma a ação para a pessoa.
    return ''; // Informa ao diálogo que pode fechar o formulário.
  } // Encerra a gravação do registro.
  function remove(item) { // Solicita confirmação antes de excluir um cadastro.
    if (!window.confirm('Excluir este registro fictício? Esta ação não pode ser desfeita.')) return; // Permite desistir da exclusão.
    update(config.collection, records.filter((record) => record.id !== item.id)); // Exclui somente o registro escolhido.
    setFeedback('Registro excluído.'); // Confirma a exclusão.
  } // Encerra a ação de exclusão.
  function exportReport() { // Exporta os registros já filtrados, sem acessar dados de outro perfil.
    const cell = (value) => `"${String(value ?? '').replace(/^[=+@-]/, "'").replaceAll('"', '""')}"`; // Escapa aspas e neutraliza fórmulas comuns de planilha.
    const rows = [config.columns.map((key) => cell(labels[key])).join(';'), ...visible.map((item) => config.columns.map((key) => cell(item[key])).join(';'))]; // Monta cabeçalho e linhas do relatório.
    const url = URL.createObjectURL(new Blob(['\uFEFF' + rows.join('\r\n')], { type: 'text/csv;charset=utf-8;' })); // Cria um arquivo temporário em memória.
    const link = document.createElement('a'); // Prepara um link de download local.
    link.href = url; link.download = `moss-condo-${config.collection}-demo.csv`; link.click(); // Inicia o download com identificação de demonstração.
    URL.revokeObjectURL(url); // Libera a memória usada pelo arquivo temporário.
    setFeedback('Relatório demonstrativo exportado com os filtros atuais.'); // Explica o conteúdo do relatório.
  } // Encerra a exportação local.
  return ( // Entrega a listagem do módulo escolhido.
    <section>
      {/* Apresenta o objetivo do módulo e sua ação principal. */}
      <div className="condo-page-heading"><div><p className="condo-eyebrow">GESTÃO CONECTADA</p><h1>{config.title}</h1><p>{config.description}</p></div>{!readOnly && <button className="condo-button" onClick={openNew}><Plus size={17} aria-hidden="true" />Novo registro</button>}</div>
      {/* Usa uma faixa compacta para enriquecer a tela sem atrapalhar os registros e filtros. */}
      <PhotoBanner image={modulePhotos[config.collection]} title={config.collection === 'residents' ? 'Cada espaço, uma forma de viver.' : config.collection === 'finances' ? 'Cuidar do patrimônio começa pela clareza.' : config.collection === 'issues' ? 'Preservar hoje. Valorizar sempre.' : config.collection === 'notices' ? 'Uma comunidade se constrói em conexão.' : 'Organização para receber melhor.'} description="Ambientes de referência para uma demonstração com dados inteiramente fictícios." compact />
      {/* Oferece pesquisa, filtros e exportação sem depender de botões decorativos. */}
      <div className="condo-toolbar"><label className="condo-search"><Search size={17} aria-hidden="true" /><span className="condo-sr-only">Pesquisar registros ou unidade</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Pesquisar por nome ou unidade..." /></label><label><span className="condo-sr-only">Filtrar categoria ou situação</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Todas as opções</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>{config.collection !== 'residents' && <label><span className="condo-sr-only">Filtrar por mês</span><input type="month" value={month} onChange={(event) => setMonth(event.target.value)} /></label>}<button className="condo-button condo-secondary" onClick={() => { setSearch(''); setCategory(''); setMonth(''); }}>Limpar filtros</button><button className="condo-button condo-secondary" onClick={exportReport}><Download size={16} aria-hidden="true" />Relatório CSV</button></div>
      {/* Anuncia resultados de gravação e exclusão para leitores de tela. */}
      <p className="condo-feedback" role="status">{feedback || `${visible.length} registro(s) demonstrativo(s)`}</p>
      {/* Recalcula o gráfico com os mesmos lançamentos que aparecem na listagem filtrada. */}
      {config.collection === 'finances' && !resident && <article className="condo-panel condo-financial-chart"><h2>Movimentação dos lançamentos filtrados</h2><p className="condo-muted">Receitas previstas: {money(visible.filter((item) => item.kind === 'Receita').reduce((sum, item) => sum + Number(item.amount), 0))} · Despesas previstas: {money(visible.filter((item) => item.kind === 'Despesa').reduce((sum, item) => sum + Number(item.amount), 0))}</p><FinanceChart records={visible} /></article>}
      {/* Mantém a tabela navegável em telas pequenas com rolagem horizontal identificada. */}
      {visible.length ? <div className="condo-table-wrap" tabIndex={0} role="region" aria-label="Registros; role horizontalmente para ver todas as colunas"><table className="condo-table"><caption className="condo-sr-only">{config.title} — dados fictícios</caption><thead><tr>{config.columns.map((key) => <th key={key} scope="col">{labels[key]}</th>)}{!readOnly && <th scope="col">Ações</th>}</tr></thead><tbody>{visible.map((item) => <tr key={item.id}>{config.columns.map((key) => <td key={key}>{key === 'amount' ? money(item[key]) : key === 'date' ? item[key]?.split('-').reverse().join('/') : key === 'status' || key === 'priority' ? <span className="condo-badge">{item[key]}</span> : item[key] || '—'}</td>)}{!readOnly && <td><div className="condo-row-actions"><button onClick={() => setEditing(item)} aria-label={`Editar ${item.name || item.title || item.description}`}><Pencil size={16} aria-hidden="true" /></button><button onClick={() => remove(item)} aria-label={`Excluir ${item.name || item.title || item.description}`}><Trash2 size={16} aria-hidden="true" /></button></div></td>}</tr>)}</tbody></table></div> : <div className="condo-empty"><Search size={26} aria-hidden="true" /><h2>Nenhum registro encontrado</h2><p>Altere os filtros ou crie um novo registro fictício.</p></div>}
      {/* Abre o formulário somente quando existe um registro em edição. */}
      {editing && <RecordDialog title={editing.id ? 'Editar registro fictício' : 'Novo registro fictício'} fields={fields} initial={editing} onSave={save} onClose={() => setEditing(null)} />}
    </section> // Encerra a tela de cadastros.
  ); // Encerra o retorno visual.
} // Encerra o módulo funcional de registros.
