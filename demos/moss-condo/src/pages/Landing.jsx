// Importa o React e o estado que guarda o perfil escolhido.
import React, { useState } from 'react';
// Importa os ícones lineares usados na apresentação.
import { ArrowUpRight, Building2, ShieldCheck, Home, KeyRound } from 'lucide-react';
// Importa a navegação sem recarregar a página.
import { useNavigate } from 'react-router-dom';
// Importa os nomes dos perfis fictícios.
import { profiles } from '../data/seed.js';
// Importa a fotografia local responsiva que substitui a ilustração na apresentação.
import Photo from '../components/Photo.jsx';
// Apresenta o produto e permite entrar sem cadastro real.
export default function Landing() {
  const [profile, setProfile] = useState('sindico'); // Seleciona o síndico como ponto de partida.
  const navigate = useNavigate(); // Obtém a função que abre as telas internas.
  const icons = { sindico: Building2, morador: Home, portaria: KeyRound }; // Relaciona cada perfil a um ícone.
  return ( // Inicia a composição premium da entrada.
    <main className="condo-landing" id="main-content" tabIndex={-1}>
      {/* Mantém a marca do produto em texto, sem alterar o logotipo oficial. */}
      <header className="condo-landing-header"><a className="condo-brand" href="#/"><Building2 aria-hidden="true" /><span>MOSS <b>CONDO</b><small>PROPERTY MANAGEMENT</small></span></a><span className="condo-demo-pill">DEMONSTRAÇÃO INTERATIVA</span></header>
      {/* Divide a apresentação entre conteúdo editorial e arquitetura. */}
      <section className="condo-hero">
        {/* Agrupa a mensagem principal e a escolha de experiência. */}
        <div className="condo-hero-copy">
          {/* Apresenta o segmento antes do título principal. */}
          <p className="condo-eyebrow"><span /> UMA NOVA PERSPECTIVA DE GESTÃO</p>
          {/* Dá destaque ao slogan com um ritmo visual próprio. */}
          <h1>Seu condomínio,<br /><em>perfeitamente</em><br />conectado.</h1>
          {/* Explica a proposta sem prometer serviços de produção. */}
          <p className="condo-lead">Mais clareza para administrar. Mais tranquilidade para viver. Descubra uma experiência pensada para cada pessoa do condomínio.</p>
          {/* Permite escolher o perfil com controles nativos acessíveis pelo teclado. */}
          <fieldset className="condo-profile-picker"><legend>Escolha sua experiência</legend>{Object.entries(profiles).map(([key, label]) => { const Icon = icons[key]; return <label key={key} className={profile === key ? 'is-selected' : ''}><input type="radio" name="profile" value={key} checked={profile === key} onChange={() => setProfile(key)} /><Icon size={19} aria-hidden="true" /><span>{label}</span></label>; })}</fieldset>
          {/* Abre o painel correspondente ao perfil selecionado. */}
          <button className="condo-button condo-enter" onClick={() => navigate(`/${profile}/painel`)}>Acessar demonstração <ArrowUpRight size={20} aria-hidden="true" /></button>
          {/* Esclarece que não existe autenticação real nem cobrança. */}
          <p className="condo-safe-note"><ShieldCheck size={16} aria-hidden="true" /> Sem cadastro. Sem cobranças. Somente dados fictícios.</p>
        </div>
        {/* Destaca uma fotografia de arquitetura com indicação explícita de imagem ilustrativa. */}
        <div className="condo-hero-art"><Photo image="fachada" priority sizes="(max-width: 600px) 90vw, 45vw" caption={false} /><div className="condo-art-caption"><span>CONDOMÍNIO FICTÍCIO · FOTO ILUSTRATIVA</span><strong>Reserva do Horizonte</strong><small>Residencial & comercial · Sem vínculo com o local fotografado</small></div><div className="condo-art-label"><span className="condo-live-dot" /> Todos os espaços. Uma conexão.</div></div>
      </section>
      {/* Resume a proposta sem inventar resultados comerciais ou clientes. */}
      <section className="condo-landing-metrics" aria-label="Recursos da demonstração"><div><strong>03</strong><span>experiências conectadas</span></div><div><strong>05</strong><span>áreas comuns para reservar</span></div><div><strong>100%</strong><span>dados demonstrativos</span></div><p>Uma visão completa.<br /><b>Uma gestão mais humana.</b></p></section>
      {/* Identifica a autoria e o caráter local da demonstração. */}
      <footer className="condo-landing-footer"><span>Uma experiência MOSS Digital</span><span>Premium Glass · Dados salvos apenas neste navegador</span></footer>
    </main> // Finaliza a tela inicial.
  ); // Encerra o retorno visual.
} // Encerra o componente da apresentação.
