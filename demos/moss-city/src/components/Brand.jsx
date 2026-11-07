// Importa o React e o ícone arquitetônico linear da marca textual do produto.
import React from 'react';
// Importa um símbolo de edifícios sem modificar o logotipo oficial da MOSS Digital.
import { Building2 } from 'lucide-react';
// Importa o link que abre a apresentação sem recarregar o aplicativo.
import { Link } from 'react-router-dom';
// Desenha uma assinatura exclusiva para o produto de gestão urbana.
export default function Brand() {
  return <Link to="/" className="city-brand"><span className="city-brand-symbol"><Building2 aria-hidden="true" size={26} /></span><span>MOSS <b>CITY</b><small>URBAN INTELLIGENCE</small></span></Link>; // Agrupa símbolo e nome com assinatura acessível pelo próprio texto.
} // Encerra a marca do produto.
