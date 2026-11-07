// Importa o React e o estado do formulário e dos filtros desta tela.
import React, { useState } from 'react';
// Importa os ícones das ações realmente disponíveis neste módulo.
import { Plus, Download, Pencil, Trash2, X, Search, ClipboardList } from 'lucide-react';
// Importa a fotografia de contexto com licença documentada.
import Photo from '../components/Photo.jsx';
// Importa as definições de campos, colunas e perfis que autorizam cada módulo.
import { modules, columnLabels, recordsFor, permissions } from '../data/modules.js';
// Importa as regras de formulário compartilhadas entre todos os cadastros.
import { fieldsFor, initialRecord, saveRecord, deleteRecord, filterRecords } from '../utils/management.js';
// Importa a formatação de números e valores fictícios.
import { number, money } from '../utils/domain.js';
// Importa a exportação local da seleção atual.
import exportCsv from '../utils/exportCsv.js';
// Importa as categorias do território para traduzir rótulos internos usados no mapa.
import { categories } from '../data/scenario.js';
// Converte uma data no padrão ano-mês-dia para leitura brasileira sem depender de fuso horário.
const brDate = (value) => String(value || '').split('-').reverse().join('/');
// Escolhe um nome curto do registro para mensagens e rótulos acessíveis.
const recordLabel = (record) => record.name || record.title || record.protocol || 'registro fictício';
// Constrói a tela de cadastro usada por obras, mobilidade, ambiente, serviços, atendimento e despesas.
export default function ModulePage({ data, setData, profile, moduleKey }) {
  const config = modules[moduleKey]; // Lê a configuração do módulo solicitado pelo endereço.
  const [search, setSearch] = useState(''); // Guarda a pesquisa textual da listagem.
  const [kind, setKind] = useState(''); // Guarda o filtro de tipo, categoria ou setor.
  const [status, setStatus] = useState(''); // Guarda o filtro de situação.
  const [draft, setDraft] = useState(null); // Guarda o registro em criação ou edição; null fecha o formulário.
  const [error, setError] = useState(''); // Guarda a mensagem de validação acessível.
  const [feedback, setFeedback] = useState(''); // Guarda a confirmação da última operação.
  if (!config || !permissions[profile]?.includes(moduleKey)) return <section className="city-panel city-empty"><h1>Este perfil não inclui o módulo solicitado.</h1><p>Use a navegação lateral para escolher uma tela disponível na demonstração.</p></section>; // Recusa direção indevida antes de qualquer leitura de registros.
  const records = recordsFor(data, moduleKey, profile); // Lista somente registros que este perfil demonstrativo pode administrar.
  const kindOf = (record) => record.kind || record.category || record.sector || ''; // Resume tipo, categoria e setor em um único valor de filtro.
  const visible = filterRecords(records, { search, category: kind, status }, config.dateKey); // Aplica os três filtros com a mesma função usada na exportação.
  const kindOptions = [...new Set(records.map(kindOf))].sort(); // Descobre as opções do filtro a partir dos próprios registros.
  const statusOptions = [...new Set(records.map((record) => record.status))].sort(); // Descobre as situações disponíveis sem listar opções vazias.
  function openNew() { setDraft(initialRecord(moduleKey, profile)); setError(''); setFeedback(''); } // Prepara um cadastro com valores iniciais coerentes.
  function openEdit(record) { setDraft({ ...record, updateNote: '' }); setError(''); setFeedback(''); } // Carrega o registro completo e reserva um campo para observação do histórico.
  function closeDraft() { setDraft(null); setError(''); } // Fecha o formulário preservando a listagem.
  function change(key, value) { setDraft((previous) => ({ ...previous, [key]: value })); } // Atualiza somente o campo editado.
  function submit(event) { // Salva criação ou edição usando as mesmas regras de validação.
    event.preventDefault(); // Evita que o formulário recarregue a página.
    const result = saveRecord(data, moduleKey, draft, profile); // Valida e monta uma nova estrutura de dados.
    if (result.error) { setError(result.error); return; } // Mantém os valores digitados até a correção.
    setData(result.data); // Persiste o cenário pelo gancho compartilhado.
    const protocol = result.record?.protocol ? ` · Protocolo fictício ${result.record.protocol}` : ''; // Prepara detalhe do código quando o módulo gerou um.
    setFeedback(draft.id ? `Registro fictício atualizado${protocol}.` : `Registro fictício criado${protocol}.`); // Confirma a operação sem sugerir envio a órgãos públicos.
    setDraft(null); setError(''); } // Encerra a gravação bem-sucedida.
  function remove(record) { // Exclui um registro depois de confirmação explícita.
    if (!window.confirm(`Excluir "${recordLabel(record)}" desta demonstração? Somente este registro fictício local será removido.`)) return; // Cancela sem alterar dados se a pessoa recusar.
    const result = deleteRecord(data, moduleKey, record.id, profile); // Aplica novamente as permissões antes de remover.
    if (result.error) { setError(result.error); return; } // Informa tentativa fora do escopo do perfil.
    setData(result.data); setFeedback('Registro fictício excluído.'); setError(''); } // Encerra a exclusão controlada.
  function clearFilters() { setSearch(''); setKind(''); setStatus(''); setFeedback(''); } // Volta à visão completa sem tocar nos registros.
  function download() { exportCsv(`moss-city-${moduleKey}-DEMO.csv`, config.columns.map((key) => ({ key, label: columnLabels[key] || key })), visible); setFeedback('Seleção exportada em CSV com dados fictícios.'); } // Exporta exatamente o que a tabela está mostrando.
  function renderField(field) { // Desenha cada campo conforme o tipo declarado na configuração.
    const id = `city-${moduleKey}-${field.key}`; // Garante um identificador único entre os módulos.
    const value = draft[field.key] ?? ''; // Lê o valor atual com conversão segura para campos vazios.
    const update = (event) => change(field.key, event.target.value); // Encaminha a mudança apenas deste campo.
    return ( // Entrega um bloco com rótulo associado e controle nativo fora do texto do rótulo.
      <div key={field.key} className={`city-field ${field.type === 'textarea' ? 'city-field-wide' : ''}`}>
        <label htmlFor={id}>{field.label}{field.optional ? ' (opcional)' : ''}</label>
        {field.options ? <select id={id} value={value} onChange={update}>{field.options.map((option) => <option key={option} value={option}>{field.optionLabels?.[option] || option}</option>)}</select> : field.type === 'textarea' ? <textarea id={id} rows={4} maxLength={1000} value={value} onChange={update} placeholder="Descreva uma situação fictícia. Não informe dados pessoais reais." /> : <input id={id} type={field.type || 'text'} min={field.min} max={field.max} step={field.step} maxLength={field.type ? undefined : 120} value={value} onChange={update} />}
      </div> // Encerra o bloco do campo.
    ); // Encerra o campo individual.
  } // Encerra a montagem dinâmica de campos.
  function cell(key, record) { // Formata cada célula preservando o valor original armazenado.
    const value = record[key]; // Lê a propriedade da coluna atual.
    if (value === undefined || value === null || value === '') return <><span aria-hidden="true">—</span><span className="city-sr-only">Não informado</span></>; // Indica ausência também para leitores de tela.
    if (key === 'status') return <span className="city-badge">{value}</span>; // Mostra a situação com texto, não apenas cor.
    if (key === 'protocol') return <code className="city-protocol-code">{value}</code>; // Destaca o código fictício em fonte monoespaçada.
    if (key === 'budget' || key === 'amount') return money(value); // Formata valores orçamentários e de despesa.
    if (key === 'progress') return `${number(value)}%`; // Apresenta a execução percentual.
    if (key === 'date' || key === 'startDate' || key === 'endDate') return brDate(value); // Converte datas para leitura brasileira.
    if (key === 'category' && categories[value]) return categories[value].label; // Traduz categorias que também existem no mapa.
    if (typeof value === 'number') return number(value); // Formata números com separadores em português.
    return value; // Entrega os textos diretamente.
  } // Encerra a formatação das células.
  return ( // Entrega a tela completa do módulo.
    <section>
      {/* Apresenta o módulo com o mesmo cabeçalho estrutural das demais telas. */}
      <div className="city-page-heading"><div><span className="city-kicker">{config.subtitle}</span><h1>{config.title}</h1><p>{config.description}</p></div><div className="city-page-actions"><button className="city-button city-button-outline" onClick={download}><Download size={16} aria-hidden="true" />Exportar seleção</button><button className="city-button city-button-primary" onClick={openNew}><Plus size={16} aria-hidden="true" />Novo registro</button></div></div>
      {/* Combina fotografia ilustrativa e situação atual do módulo, sem apresentá-la como registro municipal. */}
      <div className="city-module-intro"><Photo image={config.photo} priority sizes="(max-width: 800px) 100vw, 32vw" /><div><span className="city-kicker">CENÁRIO FICTÍCIO / ARMAZENAMENTO LOCAL</span><h2>Cadastros que alimentam o mapa e os indicadores.</h2><p>Tudo o que você criar aqui fica apenas neste navegador e reflete imediatamente no território e nos relatórios. Fotografias são ilustrativas e não comprovam serviços reais.</p><div className="city-module-stats"><span><strong>{records.length}</strong> registros do módulo</span><span><strong>{visible.length}</strong> na seleção atual</span><span><strong>{kindOptions.length}</strong> tipos cadastrados</span></div></div></div>
      {/* Abre o formulário acima dos filtros para que a ação seja a primeira região após o cabeçalho. */}
      {draft && ( // Mostra o formulário apenas enquanto houver um registro em edição.
        <form className="city-panel city-module-form-wrap" onSubmit={submit}>
          {/* Identifica a operação e oferece fechamento imediato. */}
          <div className="city-panel-heading"><div><span className="city-kicker">{draft.id ? 'EDIÇÃO DE REGISTRO' : 'NOVO REGISTRO'}</span><h2>{draft.id ? `Editar ${recordLabel(draft)}` : `Cadastrar em ${config.subtitle.split(' / ').at(-1)}`}</h2></div><button type="button" className="city-icon-button" aria-label="Fechar formulário" onClick={closeDraft}><X size={18} aria-hidden="true" /></button></div>
          {/* Disponibiliza os campos declarados para este módulo. */}
          <div className="city-module-form">{fieldsFor(moduleKey, profile).map(renderField)}
            {/* Permite registrar o motivo de uma atualização administrativa no histórico. */}
            {draft.id && <div className="city-field city-field-wide"><label htmlFor={`city-${moduleKey}-updateNote`}>Observação da atualização (opcional)</label><input id={`city-${moduleKey}-updateNote`} type="text" maxLength={120} value={draft.updateNote || ''} onChange={(event) => change('updateNote', event.target.value)} placeholder="Ex.: reavaliação de prazo após visita técnica fictícia" /></div>}
            {/* Anuncia erros sem apagar o que foi digitado. */}
            {error && <p className="city-error city-field-wide" role="alert">{error}</p>}
            {/* Confirma ou cancela a operação com alvos de toque confortáveis. */}
            <div className="city-form-actions"><button className="city-button city-button-primary" type="submit"><Plus size={16} aria-hidden="true" />{draft.id ? 'Salvar alterações' : 'Salvar registro'}</button><button className="city-button city-button-outline" type="button" onClick={closeDraft}>Cancelar</button></div>
          </div> {/* Encerra a grade de campos. */}
        </form> // Encerra o formulário do módulo.
      )}
      {/* Mantém pesquisa e filtros próximos da tabela que eles controlam. */}
      <div className="city-module-filters"><label className="city-search"><Search size={17} aria-hidden="true" /><span className="city-sr-only">Pesquisar registros deste módulo</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar nome, protocolo, setor..." /></label><label><span className="city-sr-only">Filtrar tipo de registro</span><select aria-label="Filtrar tipo de registro" value={kind} onChange={(event) => setKind(event.target.value)}><option value="">Todos os tipos</option>{kindOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label><span className="city-sr-only">Filtrar situação</span><select aria-label="Filtrar situação do módulo" value={status} onChange={(event) => setStatus(event.target.value)}><option value="">Todas as situações</option>{statusOptions.map((option) => <option key={option}>{option}</option>)}</select></label><button className="city-button city-button-text" onClick={clearFilters}>Limpar filtros</button></div>
      {/* Anuncia o resultado da última operação ou a contagem atual de registros. */}
      <p className="city-feedback" role="status">{feedback || `${visible.length} de ${records.length} registros fictícios nesta seleção · Somente dados locais`}</p>
      {/* Oferece a listagem completa como alternativa acessível aos marcadores do mapa. */}
      {visible.length ? (
        <div className="city-table-scroll" tabIndex={0} role="region" aria-label={`Registros de ${config.subtitle}`}>
          {/* Tabela semântica com cabeçalhos identificados para leitores de tela. */}
          <table className="city-record-table"><caption className="city-sr-only">Registros fictícios de {config.title}, com ações de edição e exclusão</caption><thead><tr>{config.columns.map((key) => <th key={key} scope="col">{columnLabels[key] || key}</th>)}<th scope="col">Ações</th></tr></thead><tbody>{visible.map((record) => <tr key={record.id}>{config.columns.map((key) => <td key={key}>{cell(key, record)}</td>)}<td><div className="city-row-actions"><button className="city-button city-button-text" aria-label={`Editar ${recordLabel(record)}`} onClick={() => openEdit(record)}><Pencil size={14} aria-hidden="true" />Editar</button><button className="city-button city-button-text is-danger" aria-label={`Excluir ${recordLabel(record)}`} onClick={() => remove(record)}><Trash2 size={14} aria-hidden="true" />Excluir</button></div></td></tr>)}</tbody></table>
        </div> // Encerra a região rolável da tabela.
      ) : (
        <div className="city-empty"><h3>Nenhum registro encontrado</h3><p>Altere a pesquisa ou os filtros para ver os registros deste módulo.</p><button className="city-button city-button-outline" onClick={clearFilters}>Ver todos os registros</button></div> // Mantém uma saída clara do estado vazio.
      )}
      {/* Orienta a rolagem lateral apenas quando a tabela não cabe inteira na tela. */}
      {visible.length > 0 && <p className="city-table-hint">Deslize a tabela para o lado para ver as demais colunas.</p>}
      {/* Reafirma o caráter demonstrativo no fim da tela. */}
      <p className="city-module-note"><ClipboardList size={15} aria-hidden="true" /> Módulo demonstrativo da MOSS CITY: nenhum registro é enviado a sistemas públicos, e as alterações valem somente para este navegador.</p>
    </section> // Encerra a tela do módulo.
  ); // Encerra o retorno visual.
} // Encerra o componente de cadastro genérico.
