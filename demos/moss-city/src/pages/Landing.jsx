// Importa o React e o estado da escolha de perfil demonstrativo.
import React, { useState } from 'react';
// Importa a navegação interna que não recarrega o documento.
import { Link, useNavigate } from 'react-router-dom';
// Importa os ícones lineares usados na apresentação.
import { ArrowUpRight, ArrowRight, MapPin, ShieldCheck, Activity, Network, Trees, Route, HardHat, Sun, Moon } from 'lucide-react';
// Importa a marca textual do produto, independente do logotipo oficial.
import Brand from '../components/Brand.jsx';
// Importa as fotografias reais locais e responsivas.
import Photo from '../components/Photo.jsx';
// Importa os nomes dos perfis fictícios.
import { profiles } from '../data/scenario.js';
// Importa a contagem demonstrativa calculada a partir da base inicial.
import { createSeed } from '../data/seed.js';
// Importa a formatação e os indicadores derivados.
import { number, summarize } from '../utils/domain.js';
// Constrói a apresentação comercial da primeira prévia sem afirmar operação municipal real.
export default function Landing({ theme, onToggleTheme }) { // Recebe o tema atual e a ação de alternar dia/noite.
  const [profile, setProfile] = useState('administrador'); // Guarda a experiência escolhida antes da entrada.
  const navigate = useNavigate(); // Obtém a função que abre os painéis.
  const scenario = createSeed(); // Reúne os dados iniciais apresentados como exemplo na entrada.
  const metrics = summarize(scenario); // Calcula os indicadores iniciais exibidos como cenário fictício.
  const entry = `/${profile}/${profile === 'cidadao' ? 'portal' : 'comando'}`; // Define uma entrada adequada ao perfil demonstrativo.
  return ( // Inicia a composição própria da MOSS CITY.
    <main className="city-landing" id="city-main" tabIndex={-1}>
      {/* Apresenta marca, navegação por seções e acesso à plataforma. */}
      <header className="city-landing-top"><Brand /><nav aria-label="Apresentação da MOSS CITY"><a href="#city-experience" onClick={(event) => { event.preventDefault(); document.getElementById('city-experience').scrollIntoView(); }}>A experiência</a><Link to="/administrador/mapa">O território</Link></nav><button type="button" className="city-icon-button city-theme-toggle" aria-label={theme === 'day' ? 'Ativar modo noite' : 'Ativar modo dia'} aria-pressed={theme === 'day'} title={theme === 'day' ? 'Ativar modo noite' : 'Ativar modo dia'} onClick={onToggleTheme}>{theme === 'day' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}</button><Link className="city-button city-button-outline" to={entry}>Acessar plataforma <ArrowUpRight size={16} aria-hidden="true" /></Link></header>
      {/* Usa fotografia brasileira como presença visual, sem apresentá-la como a cidade fictícia. */}
      <section className="city-landing-hero">
        {/* Agrupa título, proposta e escolha de perfil na coluna editorial. */}
        <div className="city-landing-copy"><span className="city-kicker"><span className="city-status-dot" /> INTELIGÊNCIA PARA TRANSFORMAR</span><h1>O futuro da cidade<br />começa <em>aqui.</em></h1><p className="city-hero-lead">Conecte o território. Enxergue prioridades.<br />Transforme informação em cuidado com a cidade.</p><p className="city-hero-description">Uma nova perspectiva de gestão urbana: infraestrutura, serviços e pessoas na mesma visão.</p><label className="city-entry-profile">Sua experiência demonstrativa<select value={profile} onChange={(event) => setProfile(event.target.value)}>{Object.entries(profiles).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label><button className="city-button city-button-primary city-main-cta" onClick={() => navigate(entry)}>Explorar plataforma <ArrowUpRight size={21} aria-hidden="true" /></button><p className="city-demo-disclaimer"><ShieldCheck size={16} aria-hidden="true" /> Cidade e serviços fictícios. Sem vínculo com órgãos públicos.</p></div>
        {/* Constrói uma moldura técnica, distinta dos cartões glass da MOSS CONDO. */}
        <div className="city-landing-visual"><Photo image="parque" priority sizes="(max-width: 800px) 100vw, 55vw" /><div className="city-visual-grid" aria-hidden="true" /><div className="city-visual-heading"><span className="city-status-dot" /> URBAN COMMAND<span>VISÃO INTEGRADA</span></div><div className="city-visual-callout"><MapPin size={21} aria-hidden="true" /><div><span>TERRITÓRIO, VIDA E CONEXÃO</span><strong>Uma cidade. Novas possibilidades.</strong></div></div><div className="city-visual-coordinates"><span>01 / PERSPECTIVA URBANA</span><Network size={19} aria-hidden="true" /></div></div>
      </section>
      {/* Destaca números do cenário fictício, não resultados comerciais da plataforma. */}
      <section className="city-landing-numbers" aria-label="Cenário inicial fictício"><div><span>POPULAÇÃO ESTIMADA</span><strong>{number(metrics.population)}<small>habitantes fictícios</small></strong></div><div><span>TERRITÓRIO CONECTADO</span><strong>{number(scenario.points.length)}<small>locais de demonstração</small></strong></div><div><span>SERVIÇOS EM PERSPECTIVA</span><strong>{number(metrics.requests)}<small>solicitações simuladas</small></strong></div><p><Activity size={22} aria-hidden="true" /> Uma demonstração interativa.<br />Não é monitoramento em tempo real.</p></section>
      {/* Apresenta as fotografias dos eixos e oferece links reais para os filtros do mapa. */}
      <section className="city-experience" id="city-experience"><div className="city-section-heading"><div><span className="city-kicker">DO TERRITÓRIO À DECISÃO</span><h2>Conexões que fazem<br />a cidade acontecer.</h2></div><p>Explore o primeiro centro de comando da MOSS CITY. Cada ponto conta uma parte do cenário.</p></div><div className="city-experience-grid">{[{ title: 'Infraestrutura em foco', text: 'Localize intervenções e acompanhe o avanço dos projetos demonstrativos.', photo: 'obras', category: 'obras', Icon: HardHat }, { title: 'Caminhos mais conectados', text: 'Explore pontos de transporte e infraestrutura de mobilidade fictícios.', photo: 'mobilidade', category: 'mobilidade', Icon: Route }, { title: 'Uma cidade que respira', text: 'Encontre parques e ecopontos no território de demonstração.', photo: 'parque', category: 'ambiente', Icon: Trees }].map(({ title, text, photo, category, Icon }) => <article className="city-experience-card" key={category}><Photo image={photo} sizes="(max-width: 800px) 90vw, 30vw" /><div><Icon size={24} aria-hidden="true" /><h3>{title}</h3><p>{text}</p><Link to={`/administrador/mapa?category=${category}`}>Explorar no mapa <ArrowRight size={17} aria-hidden="true" /></Link></div></article>)}</div></section>
      {/* Explica o recorte da primeira prévia e mantém uma ação funcional para entrar. */}
      <section className="city-preview-note"><div><span className="city-kicker">PRIMEIRO PONTO DE REVISÃO</span><h2>Uma visão que já pode ser explorada.</h2><p>Centro de comando, mapa, filtros e portal demonstrativo. Os módulos completos de gestão serão ampliados após a avaliação desta direção visual.</p></div><Link className="city-button city-button-primary" to={entry}>Entrar na experiência <ArrowUpRight size={18} aria-hidden="true" /></Link></section>
      {/* Identifica a autoria e os limites sem sugerir endosso municipal. */}
      <footer className="city-landing-footer"><Brand /><p>Uma experiência MOSS Digital.<br />Fotografias ilustrativas. Todos os registros operacionais são fictícios.</p><span>PRÉVIA 01 · PUBLICADA</span></footer>
    </main> // Encerra a apresentação inicial.
  ); // Encerra o retorno visual.
} // Encerra a página inicial da plataforma.
