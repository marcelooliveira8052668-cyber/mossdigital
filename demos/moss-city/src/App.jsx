// Importa o React, o estado e o carregamento sob demanda das telas mais pesadas.
import React, { lazy, Suspense, useEffect, useState } from 'react';
// Importa as ferramentas de navegação interna da aplicação independente.
import { Routes, Route, Navigate, NavLink, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
// Importa ícones lineares usados no menu e nos controles operacionais.
import { LayoutDashboard, Map, MessageSquare, RotateCcw, LogOut, Menu, X, ArrowUpRight, ShieldCheck, Compass, HardHat, Bus, Trees, Building2, Inbox, Wallet, BarChart3, Sun, Moon } from 'lucide-react';
// Importa a assinatura textual exclusiva da plataforma.
import Brand from './components/Brand.jsx';
// Importa a entrada leve, que não precisa carregar Leaflet ou gráficos imediatamente.
import Landing from './pages/Landing.jsx';
// Importa os perfis disponíveis na simulação.
import { profiles } from './data/scenario.js';
// Importa as permissões demonstrativas que decidem os módulos de cada perfil.
import { permissions } from './data/modules.js';
// Importa a persistência compartilhada, isolada das demais demos.
import useScenario from './hooks/useScenario.js';
// Adia o centro de comando e sua biblioteca de gráficos até a pessoa entrar.
const Command = lazy(() => import('./pages/Command.jsx'));
// Adia o explorador de mapas até seu primeiro uso.
const MapExplorer = lazy(() => import('./pages/MapExplorer.jsx'));
// Adia o formulário do cidadão até a experiência ser solicitada.
const CitizenPortal = lazy(() => import('./pages/CitizenPortal.jsx'));
// Adia o cadastro genérico dos módulos administrativos.
const ModulePage = lazy(() => import('./pages/ModulePage.jsx'));
// Adia a síntese consolidada de relatórios.
const Reports = lazy(() => import('./pages/Reports.jsx'));
// Define somente telas funcionais desta demonstração; cada perfil vê apenas as suas.
const navigation = { comando: { label: 'Centro de comando', Icon: LayoutDashboard }, mapa: { label: 'Mapa inteligente', Icon: Map }, obras: { label: 'Gestão de obras', Icon: HardHat }, mobilidade: { label: 'Mobilidade urbana', Icon: Bus }, ambiente: { label: 'Meio ambiente', Icon: Trees }, servicos: { label: 'Equipamentos públicos', Icon: Building2 }, solicitacoes: { label: 'Atendimento', Icon: Inbox }, despesas: { label: 'Despesas fictícias', Icon: Wallet }, relatorios: { label: 'Relatórios', Icon: BarChart3 }, portal: { label: 'Portal do cidadão', Icon: MessageSquare } };
// Define a ordem de leitura do menu, mantendo cada perfil protegido pela mesma lista.
const pageOrder = ['comando', 'mapa', 'obras', 'mobilidade', 'ambiente', 'servicos', 'solicitacoes', 'despesas', 'relatorios', 'portal'];
// Define a chave exclusiva da preferência visual, sem tocar nas chaves de dados ou de outras demos.
const THEME_KEY = 'moss-city:theme:v1';
// Captura erros inesperados de renderização para oferecer uma recuperação compreensível.
class CityBoundary extends React.Component {
  state = { failed: false }; // Começa sem falha de interface.
  static getDerivedStateFromError() { return { failed: true }; } // Ativa a recuperação quando um componente não consegue renderizar.
  render() { return this.state.failed ? <main className="moss-city city-loading"><h1>Não foi possível abrir esta experiência.</h1><p>Recarregue a demonstração para tentar novamente. Nenhum serviço público real foi afetado.</p><button className="city-button city-button-primary" onClick={() => window.location.reload()}>Recarregar demonstração</button></main> : this.props.children; } // Mantém uma saída acessível em vez de uma tela em branco.
} // Encerra o tratamento de falhas de interface.
// Organiza o ambiente interno com navegação tecnológica e limites claros da simulação.
function Workspace({ store, theme, onToggleTheme }) {
  const { profile, page } = useParams(); // Lê a experiência e a tela presentes no endereço.
  const [menuOpen, setMenuOpen] = useState(false); // Guarda a abertura do menu móvel.
  const location = useLocation(); // Identifica mudanças de rota e de seleção territorial.
  const navigate = useNavigate(); // Permite trocar perfis sem manipular o HTML do navegador.
  const allowed = pageOrder.filter((key) => permissions[profile]?.includes(key)); // Lista as telas que este perfil demonstrativo pode abrir.
  useEffect(() => { const close = (event) => { if (event.key === 'Escape') { setMenuOpen(false); document.getElementById('city-menu-toggle')?.focus(); } }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []); // Permite fechar o menu com Escape e remove o ouvinte ao sair.
  useEffect(() => { setMenuOpen(false); }, [location.pathname]); // Fecha o menu depois de escolher outra tela.
  if (!profiles[profile]) return <Navigate to="/" replace />; // Recusa perfis desconhecidos sem tentar renderizar seus dados.
  if (!allowed.includes(page)) return <Navigate to={`/${profile}/${profile === 'cidadao' ? 'portal' : 'comando'}`} replace />; // Impede acesso direto do cidadão ao comando administrativo.
  if (!store.data) return <main className="city-loading" role="status">Preparando o cenário urbano demonstrativo...</main>; // Mostra um estado de carregamento legível.
  function restore() { // Solicita confirmação antes de substituir o conjunto local de exemplos.
    if (window.confirm('Restaurar somente a MOSS CITY? Os protocolos fictícios criados nesta demonstração serão substituídos. As outras demos não serão alteradas.')) store.restore(); // Não utiliza localStorage.clear nem modifica outros sistemas.
  } // Encerra a restauração confirmada.
  return ( // Inicia o layout do ambiente urbano.
    <div className="city-workspace">
      {/* Mantém o menu estrutural, sem copiar a sidebar flutuante da MOSS CONDO. */}
      <aside className={`city-sidebar ${menuOpen ? 'is-open' : ''}`} id="city-navigation"><div className="city-sidebar-brand"><Brand /></div><div className="city-environment"><span className="city-status-dot" /><span>AMBIENTE DEMONSTRATIVO</span></div><div className="city-municipality"><span className="city-municipality-symbol">NA</span><div><strong>Nova Aurora</strong><small>Cidade fictícia · Brasil</small></div></div><p className="city-nav-heading">INTELIGÊNCIA URBANA</p><nav aria-label="Módulos da demonstração">{allowed.map((key, index) => { const { label, Icon } = navigation[key]; return <NavLink key={key} to={`/${profile}/${key}`}><Icon size={18} aria-hidden="true" /><span>{label}</span><small>{String(index + 1).padStart(2, '0')}</small></NavLink>; })}</nav><div className="city-sidebar-note"><Compass size={23} aria-hidden="true" /><strong>Uma perspectiva conectada.</strong><p>Explore o cenário. Nenhum dado representa uma operação municipal real.</p></div><div className="city-sidebar-footer"><button onClick={restore}><RotateCcw size={16} aria-hidden="true" />Restaurar demonstração</button><Link to="/"><LogOut size={16} aria-hidden="true" />Voltar à apresentação</Link><span>DEMONSTRAÇÃO / MOSS CITY</span></div></aside>
      {/* Distribui contexto urbano e seleção de perfil sem cortar controles à direita. */}
      <div className="city-workspace-body"><header className="city-topbar"><button id="city-menu-toggle" className="city-mobile-toggle city-icon-button" aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'} aria-expanded={menuOpen} aria-controls="city-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button><div className="city-topbar-context"><span>URBAN COMMAND</span><span className="city-topbar-divider" /><strong>Visão conectada da cidade</strong></div><div className="city-topbar-controls"><button type="button" className="city-icon-button city-theme-toggle" aria-label={theme === 'day' ? 'Ativar modo noite' : 'Ativar modo dia'} aria-pressed={theme === 'day'} title={theme === 'day' ? 'Ativar modo noite' : 'Ativar modo dia'} onClick={onToggleTheme}>{theme === 'day' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}</button><span className="city-simulation-tag"><span className="city-status-dot" /> CENÁRIO SIMULADO</span><label><span className="city-sr-only">Trocar perfil demonstrativo</span><select aria-label="Trocar perfil demonstrativo" value={profile} onChange={(event) => navigate(`/${event.target.value}/${event.target.value === 'cidadao' ? 'portal' : 'comando'}`)}>{Object.entries(profiles).map(([key, name]) => <option key={key} value={key}>{name}</option>)}</select></label><span className="city-user-mark" aria-hidden="true">{profile === 'administrador' ? 'AD' : profile === 'obras' ? 'GO' : profile === 'ambiental' ? 'GA' : 'CD'}</span></div></header><main className="city-main" id="city-main" tabIndex={-1}>
        {/* Anuncia falhas locais de persistência sem fingir que dados temporários foram salvos. */}
        {store.error && <p className="city-error" role="alert">{store.error}</p>}
        {/* Escolhe somente uma tela funcional, mantendo carregamento sob demanda no conteúdo. */}
        <Suspense fallback={<div className="city-content-loading" role="status">Carregando experiência urbana...</div>}>{page === 'comando' ? <Command key={profile} data={store.data} profile={profile} /> : page === 'mapa' ? <MapExplorer key={profile} data={store.data} profile={profile} /> : page === 'relatorios' ? <Reports key={profile} data={store.data} profile={profile} /> : page === 'portal' ? <CitizenPortal data={store.data} setData={store.setData} /> : <ModulePage key={`${profile}-${page}`} data={store.data} setData={store.setData} profile={profile} moduleKey={page} />}</Suspense>
      </main><footer className="city-workspace-footer"><span>MOSS CITY <b>/</b> Uma experiência MOSS Digital</span><span><ShieldCheck size={13} aria-hidden="true" /> Dados fictícios · Persistência neste navegador</span><Link to="/">Conhecer a plataforma <ArrowUpRight size={13} aria-hidden="true" /></Link></footer></div>
    </div> // Encerra o ambiente interno da prévia.
  ); // Encerra o retorno visual.
} // Encerra o layout do aplicativo.
// Monta as rotas independentes e mantém uma fonte de dados comum a todos os perfis.
export default function App() {
  const store = useScenario(); // Carrega os dados exclusivos desta demonstração.
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem(THEME_KEY) === 'day' ? 'day' : 'night'; } catch { return 'night'; } }); // Recupera a última escolha visível; sem armazenamento, mantém a identidade noturna padrão.
  useEffect(() => { try { localStorage.setItem(THEME_KEY, theme); } catch { /* Sem armazenamento a escolha vale somente nesta sessão. */ } }, [theme]); // Persiste apenas a preferência de tema desta demonstração.
  function toggleTheme() { setTheme((current) => (current === 'day' ? 'night' : 'day')); } // Inverte dia e noite em uma única ação.
  return <CityBoundary><div className={`moss-city${theme === 'day' ? ' theme-day' : ''}`}><a className="city-skip" href="#city-main" onClick={(event) => { event.preventDefault(); document.getElementById('city-main')?.focus(); }}>Pular para o conteúdo</a><Routes><Route path="/" element={<Landing theme={theme} onToggleTheme={toggleTheme} />} /><Route path="/:profile/:page" element={<Workspace store={store} theme={theme} onToggleTheme={toggleTheme} />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></div></CityBoundary>; // Conecta a entrada e o ambiente interno sem importar o site principal.
} // Encerra o componente principal da MOSS CITY.
