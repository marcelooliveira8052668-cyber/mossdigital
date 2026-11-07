// Importa o React e o estado usado para recuperar falhas de imagem.
import React, { useState } from 'react';
// Importa os caminhos locais e as descrições acessíveis das fotos.
import { photos, photoUrl } from '../data/photos.js';
// Renderiza fotografias reais em molduras responsivas sem deformar a imagem.
export default function Photo({ image = 'cidade', className = '', priority = false, sizes = '(max-width: 800px) 100vw, 45vw', caption = true }) {
  const [failed, setFailed] = useState(false); // Guarda uma falha para não mostrar o ícone de imagem quebrada.
  const photo = photos[image]; // Localiza o texto alternativo e o ponto de recorte.
  return ( // Entrega a fotografia com dimensões reservadas pelo CSS do contexto.
    <figure className={`city-photo ${className}`}>
      {/* Usa variantes locais para o navegador baixar somente o tamanho adequado à tela. */}
      {failed ? <div className="city-photo-fallback" role="status">Fotografia ilustrativa indisponível</div> : <img src={photoUrl(image)} srcSet={[640, 1120, 1920].map((width) => `${photoUrl(image, width)} ${width}w`).join(', ')} sizes={sizes} alt={photo.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" width="1920" height="1280" style={{ objectPosition: photo.position }} onError={() => setFailed(true)} />}
      {/* Mantém explícita a diferença entre fotografia de referência e registro de serviço público. */}
      {caption && <figcaption>{photo.label}</figcaption>}
    </figure> // Finaliza a moldura da fotografia.
  ); // Encerra o retorno do componente.
} // Encerra o componente de fotografia responsiva.
