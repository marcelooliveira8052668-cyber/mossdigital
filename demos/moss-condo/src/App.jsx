// Importa o React e os recursos usados para estado e tratamento de falhas.
import React, { lazy, Suspense, useEffect, useState } from 'react';
// Importa as ferramentas de rotas da demonstração.
import { Routes, Route, Navigate, NavLink, Link, useParams, useLocation } from 'react-router-dom';
// Importa ícones lineares exclusivos da composição da MOSS CONDO.
import { Building2, LayoutDashboard, Users, Wallet, CalendarDays, Wrench, MessageSquare, DoorOpen, Package, LogOut, RotateCcw, Menu, X, Bell, ArrowUpRight } from 'lucide-react';
// Importa a apresentação inicial.
import Landing from './pages/Landing.jsx';
// Importa os painéis por perfil.
const Dashboard = lazy(() => import('./pages/Dashboard.jsx')); // Carrega o painel apenas quando uma pessoa entra na demonstração.
// Importa os cadastros funcionais.
const Records = lazy(() => import('./pages/Records.jsx')); // Adia o código de cadastros até seu primeiro acesso.
// Importa o calendário de reservas.
const Reservations = lazy(() => import('./pages/Reservations.jsx')); // Carrega o calendário apenas quando ele é solicitado.
// Importa a persistência isolada da demonstração.
import { useDemo } from './hooks/useDemo.js';
// Importa os nomes de perfis fictícios.
import { profiles } from './data/seed.js';
// Importa as configurações dos módulos de cadastro.
import { modules } from './data/modules.js';
// Relaciona módulos aos rótulos e ícones da navegação.
const navigation = { painel: ['Visão geral', LayoutDashboard], moradores: ['Moradores', Users], financeiro: ['Financeiro', Wallet], reservas: ['Reservas & agenda', CalendarDays], ocorrencias: ['Manutenção', Wrench], mural: ['Mural & avisos', MessageSquare], visitantes: ['Visitantes & acessos', DoorOpen], entregas: ['Entregas', Package] };
// Define quais módulos cada perfil demonstrativo pode acessar pela interface.
const permissions = { sindico: ['painel', 'moradores', 'financeiro', 'reservas', 'ocorrencias', 'mural'], morador: ['painel', 'reservas', 'ocorrencias', 'financeiro', 'mural'], portaria: ['painel', 'visitantes', 'entregas', 'mural'] };
// Captura falhas inesperadas de renderização sem deixar a tela completamente em branco.
class DemoBoundary extends React.Component {
  state = { failed: false }; // Começa sem erros de interface.
  static getDerivedStateFromError() { return { failed: true }; } // Ativa uma mensagem de recuperação ao detectar uma falha.
  render() { return this.state.failed ? <main className="moss-condo condo-loading"><h1>Não foi possível abrir esta tela.</h1><p>Recarregue para tentar novamente. Nenhum serviço real foi afetado.</p><button className="condo-button" onClick={() => window.location.reload()}>Recarregar</button></main> : this.props.children; } // Mostra a recuperação ou a aplicação normalmente.
} // Encerra o tratamento de erros de interface.
// Monta o ambiente interno conforme o perfil e a seção presentes no endereço.
function Workspace({ store }) {
  const { profile, section = 'painel' } = useParams(); // Lê o perfil e o módulo escolhidos na rota.
  const [menuOpen, setMenuOpen] = useState(false); // Controla a abertura do menu no celular.
  const location = useLocation(); // Lê a rota atual para preservar a navegação declarativa.
  useEffect(() => { const close = (event) => { if (event.key === 'Escape') setMenuOpen(false); }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []); // Permite fechar o menu móvel com Escape e remove o ouvinte ao sair.
  const { data, update, restore, error } = store; // Separa os dados e as ações de persistência.
  if (!profiles[profile]) return <Navigate to="/" replace />; // Redireciona perfis desconhecidos para a entrada.
  if (!permissions[profile].includes(section)) return <Navigate to={`/${profile}/painel`} replace />; // Bloqueia telas não disponíveis ao perfil, inclusive por endereço direto.
  if (!data) return <main className="condo-loading" role="status"><Building2 size={36} aria-hidden="true" /><p>Preparando seu condomínio demonstrativo...</p></main>; // Mostra um estado de carregamento legível.
  function reset() { // Solicita autorização antes de restaurar dados locais.
    if (window.confirm('Restaurar somente a MOSS CONDO? Seus registros fictícios desta demonstração serão substituídos.')) restore(); // Preserva os dados de outros sistemas.
  } // Encerra a restauração confirmada.
  return ( // Monta o layout próprio da plataforma.
    <div className="condo-workspace">
      {/* Oferece um botão de menu com estado anunciado em telas pequenas. */}
      <button className="condo-mobile-toggle condo-icon-button" aria-expanded={menuOpen} aria-controls="condo-navigation" aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      {/* Mantém a navegação flutuante separada visualmente das bordas da tela. */}
      <aside className={`condo-sidebar ${menuOpen ? 'is-open' : ''}`} id="condo-navigation"><Link to="/" className="condo-brand"><Building2 aria-hidden="true" /><span>MOSS <b>CONDO</b><small>PROPERTY MANAGEMENT</small></span></Link><div className="condo-property"><span className="condo-property-mark">RH</span><div><strong>Reserva do Horizonte</strong><small>Condomínio fictício</small></div></div><p className="condo-nav-label">SEU CONDOMÍNIO</p><nav aria-label="Módulos do perfil">{permissions[profile].map((key) => { const [label, Icon] = navigation[key]; return <NavLink key={key} to={`/${profile}/${key}`} onClick={() => setMenuOpen(false)}><Icon size={19} aria-hidden="true" />{label}</NavLink>; })}</nav><div className="condo-sidebar-footer"><div className="condo-demo-note"><span className="condo-live-dot" /><strong>Ambiente demonstrativo</strong><small>Explore com dados fictícios.<br />Tudo fica neste navegador.</small></div><button onClick={reset}><RotateCcw size={17} aria-hidden="true" />Restaurar demonstração</button><Link to="/"><LogOut size={17} aria-hidden="true" />Voltar à apresentação</Link></div></aside>
      {/* Agrupa cabeçalho, conteúdo e rodapé sem reutilizar o layout das demos anteriores. */}
      <div className="condo-content"><header className="condo-topbar"><div><span className="condo-muted">Seu condomínio,</span> perfeitamente conectado.</div><div className="condo-topbar-actions"><span className="condo-demo-pill">DEMO</span><Link className="condo-notification" to={`/${profile}/mural`} aria-label="Abrir avisos demonstrativos"><Bell size={19} aria-hidden="true" /><span /></Link><label className="condo-profile-select"><span className="condo-sr-only">Trocar perfil demonstrativo</span><select aria-label="Trocar perfil demonstrativo" value={profile} onChange={(event) => { setMenuOpen(false); window.location.hash = `/${event.target.value}/painel`; }}>{Object.entries(profiles).map(([key, value]) => <option key={key} value={key}>{value}</option>)}</select></label><span className="condo-avatar" aria-hidden="true">{profile === 'sindico' ? 'AS' : profile === 'morador' ? 'ME' : 'PT'}</span></div></header><main id="main-content" tabIndex={-1} className="condo-main">
        {/* Expõe falhas de persistência em uma mensagem explícita. */}
        {error && <p role="alert" className="condo-error">{error}</p>}
        {/* Abre um painel, calendário ou módulo de registros conforme a seção autorizada. */}
        {section === 'painel' ? <Dashboard data={data} profile={profile} /> : section === 'reservas' ? <Reservations key={profile} data={data} update={update} profile={profile} /> : <Records key={location.pathname} config={modules[section]} data={data} update={update} profile={profile} />}
      </main><footer className="condo-workspace-footer"><span>MOSS CONDO <span> / </span> Uma experiência MOSS Digital</span><span>Dados fictícios · Sem operações reais <ArrowUpRight size={14} aria-hidden="true" /></span></footer></div>
    </div> // Finaliza o ambiente interno.
  ); // Encerra o retorno visual.
} // Encerra o layout por perfil.
// Conecta a entrada, as rotas internas e o armazenamento da demonstração.
export default function App() {
  const store = useDemo(); // Mantém uma fonte de dados compartilhada entre os três perfis.
  return <DemoBoundary><div className="moss-condo"><a href="#main-content" className="condo-skip" onClick={(event) => { event.preventDefault(); document.getElementById('main-content')?.focus(); }} >Pular para o conteúdo</a><Suspense fallback={<main className="condo-loading" role="status">Carregando experiência demonstrativa...</main>}><Routes><Route path="/" element={<Landing />} /><Route path="/:profile/:section" element={<Workspace store={store} />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></Suspense></div></DemoBoundary>; // Organiza as rotas, exibe o carregamento e mantém os estilos no escopo do produto.
} // Encerra a aplicação principal.
