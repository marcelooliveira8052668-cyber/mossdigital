// Importa o React e o estado do formulário de solicitação fictícia.
import React, { useState } from 'react';
// Importa ícones que acompanham instruções e ações textuais.
import { Send, Search, ShieldCheck, ArrowRight, CircleCheck } from 'lucide-react';
// Importa a imagem de contexto urbano com licença documentada.
import Photo from '../components/Photo.jsx';
// Importa categorias e bairros inventados, sem pedir endereços pessoais reais.
import { serviceCategories, districts } from '../data/scenario.js';
// Importa as regras independentes de protocolo, data e validação.
import { reserveProtocol, newId, requestError, today } from '../utils/domain.js';
// Conecta o primeiro fluxo de solicitação aos indicadores do centro de comando.
export default function CitizenPortal({ data, setData }) {
  const [values, setValues] = useState({ title: '', description: '', category: serviceCategories[0], district: districts[0] }); // Guarda os campos sem nome, e-mail ou documento de uma pessoa.
  const [query, setQuery] = useState(''); // Guarda o texto usado para consultar os próprios protocolos de demonstração.
  const [status, setStatus] = useState(''); // Guarda o filtro de situação das solicitações desse cidadão fictício.
  const [feedback, setFeedback] = useState(''); // Guarda a confirmação do protocolo criado.
  const [error, setError] = useState(''); // Guarda uma mensagem de validação acessível.
  const own = data.requests.filter((item) => item.owner === 'citizen-demo'); // Não apresenta solicitações atribuídas a outros cidadãos do cenário.
  const visible = own.filter((item) => `${item.protocol} ${item.title}`.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')) && (!status || item.status === status)); // Aplica pesquisa de protocolo e filtro de situação.
  const change = (field, value) => setValues((previous) => ({ ...previous, [field]: value })); // Atualiza somente o campo que foi alterado.
  function submit(event) { // Tenta criar uma solicitação somente nesta demonstração.
    event.preventDefault(); // Evita que o formulário recarregue o navegador.
    const message = requestError(values); // Valida o texto antes de persistir o registro.
    if (message) { setError(message); return; } // Mantém os dados digitados quando é necessário corrigir o formulário.
    const year = new Date().getFullYear(); // Define o ano demonstrativo do novo protocolo.
    const protocol = reserveProtocol(data.requests, data.protocolCounters, year); // Gera uma sequência que também respeita códigos já excluídos.
    const record = { ...values, title: values.title.trim(), description: values.description.trim(), id: newId(), protocol, status: 'Aberta', priority: 'Média', sector: 'Atendimento', date: today(), owner: 'citizen-demo', history: [{ date: today(), text: 'Solicitação fictícia criada neste navegador. Nenhum órgão público foi acionado.' }] }; // Cria um registro sem dados pessoais reais, já pronto para a triagem administrativa.
    setData((previous) => ({ ...previous, requests: [record, ...previous.requests], protocolCounters: { ...previous.protocolCounters, [year]: Number(protocol.split('-').at(-1)) } })); // Atualiza a fonte de dados que alimenta portal, atendimento e indicadores.
    setFeedback(`Protocolo fictício ${protocol} criado. Nenhuma solicitação foi enviada a um órgão público.`); // Confirma a ação e reafirma seu limite.
    setError(''); setValues({ title: '', description: '', category: serviceCategories[0], district: districts[0] }); // Limpa apenas o formulário após a gravação bem-sucedida.
    setQuery(''); setStatus(''); // Garante que o novo protocolo fique visível na lista.
  } // Encerra o registro de uma solicitação fictícia.
  return ( // Entrega o primeiro fluxo do portal do cidadão demonstrativo.
    <section>
      {/* Explica de forma inequívoca que o formulário não é um canal oficial de atendimento. */}
      <div className="city-page-heading"><div><span className="city-kicker">PORTAL DO CIDADÃO / PERFIL FICTÍCIO</span><h1>Sua perspectiva faz parte.</h1><p>Experimente registrar e acompanhar uma solicitação. Não informe dados pessoais reais.</p></div></div>
      {/* Combina uma imagem brasileira e um aviso permanente, sem prometer envio real. */}
      <div className="city-citizen-intro"><Photo image="cidade" priority sizes="(max-width: 800px) 100vw, 35vw" /><div><ShieldCheck size={24} aria-hidden="true" /><h2>Um exercício de cidadania digital.</h2><p>Este portal é uma demonstração da MOSS Digital. Seus registros ficam apenas neste navegador e não chegam a prefeituras, concessionárias ou serviços de emergência.</p></div></div>
      {/* Mantém formulário e consulta como regiões independentes, adequadas ao uso por teclado. */}
      <div className="city-portal-layout">
        {/* Usa validação nativa além das regras didáticas compartilhadas. */}
        <form className="city-panel city-request-form" onSubmit={submit}>
          {/* Identifica o objetivo do formulário sem solicitar identificação pessoal. */}
          <span className="city-kicker">NOVO REGISTRO DEMONSTRATIVO</span>
          {/* Apresenta a ação principal de forma simples. */}
          <h2>O que você quer sinalizar?</h2>
          {/* Seleciona uma categoria controlada de serviço público fictício. */}
          <label>Categoria<select aria-label="Categoria da solicitação" value={values.category} onChange={(event) => change('category', event.target.value)}>{serviceCategories.map((name) => <option key={name}>{name}</option>)}</select></label>
          {/* Usa bairros inventados em vez de pedir o endereço de uma pessoa. */}
          <label>Região fictícia<select aria-label="Região fictícia" value={values.district} onChange={(event) => change('district', event.target.value)}>{districts.map((name) => <option key={name}>{name}</option>)}</select></label>
          {/* Limita o texto principal a uma descrição curta do assunto demonstrativo. */}
          <label>Assunto fictício<input aria-label="Assunto fictício" required minLength={5} maxLength={100} value={values.title} onChange={(event) => change('title', event.target.value)} placeholder="Ex.: luminária de exemplo apagada" /></label>
          {/* Explica que não devem ser incluídas informações pessoais ou relatos reais de emergência. */}
          <label>Descrição fictícia<textarea aria-label="Descrição fictícia" required minLength={15} maxLength={1000} rows={4} value={values.description} onChange={(event) => change('description', event.target.value)} placeholder="Descreva uma situação inventada. Não informe nomes, documentos ou contatos." /></label>
          {/* Anuncia erros de preenchimento sem apagar os valores digitados. */}
          {error && <p className="city-error" role="alert">{error}</p>}
          {/* Salva um protocolo local sem disparar mensagem a serviços públicos. */}
          <button className="city-button city-button-primary" type="submit">Gerar protocolo fictício <Send size={16} aria-hidden="true" /></button>
        </form> {/* Encerra o formulário de registro. */}
        {/* Permite consultar os próprios exemplos e abrir seu histórico de atendimento. */}
        <section className="city-panel city-protocol-panel" aria-labelledby="city-protocol-title"><div className="city-panel-heading"><h2 id="city-protocol-title">Seus protocolos de demonstração</h2><CircleCheck size={19} aria-hidden="true" /></div><p className="city-feedback" role="status">{feedback || `${own.length} registros do cidadão fictício deste cenário.`}</p><label className="city-search"><Search size={17} aria-hidden="true" /><span className="city-sr-only">Consultar protocolo ou assunto</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar protocolo ou assunto..." /></label><label className="city-protocol-filter">Situação<select aria-label="Situação dos protocolos" value={status} onChange={(event) => setStatus(event.target.value)}><option value="">Todas as situações</option><option>Aberta</option><option>Em triagem</option><option>Em atendimento</option><option>Concluída</option></select></label><div className="city-protocol-list">{visible.length ? visible.map((item) => <details key={item.id}><summary><span><small>{item.protocol}</small><strong>{item.title}</strong><span className="city-protocol-context">{item.district} · {item.date.split('-').reverse().join('/')}</span></span><span className="city-badge">{item.status}</span><ArrowRight size={15} aria-hidden="true" /></summary><div className="city-protocol-history"><p>{item.description}</p><h3>Histórico demonstrativo</h3><ol>{item.history.map((event, index) => <li key={`${event.date}-${index}`}><time>{event.date.split('-').reverse().join('/')}</time>{event.text}</li>)}</ol></div></details>) : <p className="city-empty">Nenhum protocolo encontrado com os filtros atuais.</p>}</div></section>
      </div> {/* Encerra a composição de formulário e consulta. */}
    </section> // Encerra o portal demonstrativo.
  ); // Encerra o retorno visual.
} // Encerra a primeira experiência do cidadão.
