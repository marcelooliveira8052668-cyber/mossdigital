// Importa o React para desenhar a ilustração autoral em JSX.
import React from 'react';
// Desenha um condomínio moderno sem depender de serviços externos de imagens.
export default function Architecture() {
  return ( // Entrega uma ilustração vetorial leve e acessível.
    <svg className="condo-architecture" viewBox="0 0 800 800" role="img" aria-labelledby="architecture-title">
      {/* Fornece uma descrição acessível da ilustração arquitetônica. */}
      <title id="architecture-title">Ilustração de condomínio moderno ao entardecer, com torres, jardins e piscina</title>
      {/* Define gradientes de céu, vidro e água usados apenas nesta ilustração. */}
      <defs><linearGradient id="condo-sky" x2="0" y2="1"><stop stopColor="#273449" /><stop offset="1" stopColor="#be977a" /></linearGradient><linearGradient id="condo-glass" x2="1" y2="1"><stop stopColor="#75929a" /><stop offset="1" stopColor="#1b2b3a" /></linearGradient><linearGradient id="condo-water" x2="1" y2="1"><stop stopColor="#36b5a0" /><stop offset="1" stopColor="#182b39" /></linearGradient></defs>
      {/* Pinta o céu e um disco de luz suave ao fundo. */}
      <rect width="800" height="800" fill="url(#condo-sky)" /><circle cx="640" cy="200" r="95" fill="#f4efe9" opacity=".22" />
      {/* Desenha a torre do fundo com sua fachada lateral. */}
      <path d="M450 160 650 205V615H450Z" fill="#b4aaa0" /><path d="m650 205 65-32v440l-65 2Z" fill="#736f70" />
      {/* Cria os andares da torre posterior a partir de uma sequência de posições. */}
      {Array.from({ length: 10 }, (_, floor) => <g key={floor}><path d={`M465 ${185 + floor * 40} 635 ${220 + floor * 36}v22L465 ${208 + floor * 40}Z`} fill="url(#condo-glass)" /><path d={`M449 ${213 + floor * 40} 650 ${249 + floor * 36}`} stroke="#e4d6c7" strokeWidth="7" /></g>)}
      {/* Desenha a torre principal em perspectiva, com tons de concreto e cobre. */}
      <path d="m135 125 275-60v565l-275 45Z" fill="#dbd0c2" /><path d="m410 65 80 65v500h-80Z" fill="#817a73" />
      {/* Repete as varandas e suas divisões para formar uma fachada autoral. */}
      {Array.from({ length: 11 }, (_, floor) => <g key={floor}><path d={`m155 ${147 + floor * 44} 235-48v27l-235 48Z`} fill="url(#condo-glass)" /><path d={`m133 ${181 + floor * 44} 278-55 80 51`} fill="none" stroke="#eadfd0" strokeWidth="10" /><path d={`M228 ${132 + floor * 44}v29M315 ${114 + floor * 44}v29`} stroke="#b68c68" strokeWidth="5" /></g>)}
      {/* Acrescenta o jardim e a borda da área de lazer. */}
      <path d="M0 650 360 594 800 640V800H0Z" fill="#233b35" /><path d="m35 735 385-98 365 52-345 111H0Z" fill="#b1a28f" />
      {/* Representa a piscina com água turquesa e linhas suaves de reflexo. */}
      <path d="m180 735 255-63 270 26-275 88Z" fill="url(#condo-water)" stroke="#e3d7c4" strokeWidth="7" /><path d="m270 737 167-42 174 18m-290 39 124-29 110 8" fill="none" stroke="#a1d7cd" strokeWidth="2" opacity=".6" />
      {/* Distribui árvores estilizadas ao redor da área comum. */}
      {[60, 105, 550, 745].map((x, index) => <g key={x}><path d={`M${x} 690v-95`} stroke="#7b6958" strokeWidth="8" /><ellipse cx={x} cy={590 + index * 5} rx="32" ry="65" fill={index % 2 ? '#365449' : '#2c473e'} /></g>)}
    </svg> // Finaliza a ilustração vetorial.
  ); // Encerra o retorno do componente.
} // Encerra o componente de arquitetura.
