// Importa o React e o estado usado para tratar uma imagem indisponível.
import React, { useState } from 'react';
// Importa um ícone leve para a mensagem de recuperação visual.
import { Building2 } from 'lucide-react';
// Importa as descrições acessíveis e os caminhos locais das fotografias.
import { photos, photoUrl } from '../data/photos.js';
// Exibe fotos responsivas sem depender de sites externos durante a visita à demo.
export default function Photo({ image, className = '', priority = false, sizes = '(max-width: 600px) 100vw, 60vw', caption = true }) {
  const [failed, setFailed] = useState(false); // Guarda se o navegador encontrou uma falha ao carregar a imagem.
  const photo = photos[image]; // Localiza a descrição e o enquadramento da foto escolhida.
  return ( // Monta uma região visual com dimensão definida pelo CSS de cada contexto.
    <figure className={`condo-photo ${className}`} data-photo={image}>
      {/* Oferece uma alternativa legível se algum arquivo ficar indisponível. */}
      {failed || !photo ? <div className="condo-photo-fallback" role="status"><Building2 size={30} aria-hidden="true" /><span>Fotografia ilustrativa indisponível</span></div> : <img src={photoUrl(image)} srcSet={[640, 1120, 1600].map((width) => `${photoUrl(image, width)} ${width}w`).join(', ')} sizes={sizes} alt={photo.alt} width="1600" height="1067" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" style={{ objectPosition: photo.position }} onError={() => setFailed(true)} />}
      {/* Esclarece visualmente que a fotografia não retrata um empreendimento cliente. */}
      {caption && <figcaption>Foto ilustrativa</figcaption>}
    </figure> // Encerra a região da fotografia.
  ); // Encerra o retorno visual do componente.
} // Encerra o componente reutilizável de fotos.
