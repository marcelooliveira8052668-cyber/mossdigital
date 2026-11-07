// Importa o React para montar a faixa editorial de fotografia.
import React from 'react';
// Importa a imagem local responsiva com tratamento de falhas.
import Photo from './Photo.jsx';
// Combina fotografia e texto sem colocar imagens dentro de tabelas e formulários.
export default function PhotoBanner({ image, title, description, compact = false }) {
  return ( // Monta uma faixa com contraste preservado independentemente da fotografia.
    <section className={`condo-photo-banner ${compact ? 'is-compact' : ''}`} aria-label="Ambiente ilustrativo do condomínio">
      {/* Carrega a fotografia com prioridade porque a faixa aparece no início da tela. */}
      <Photo key={image} image={image} priority sizes="(max-width: 900px) 100vw, 80vw" />
      {/* Mantém as palavras sobre uma região escura, em vez de depender das cores da imagem. */}
      <div className="condo-photo-banner-copy"><span className="condo-eyebrow">ESPAÇOS QUE INSPIRAM</span><h2>{title}</h2><p>{description}</p></div>
    </section> // Encerra a faixa contextual.
  ); // Encerra o retorno visual.
} // Encerra o componente de faixa fotográfica.
