// ============================================================
// Album - catalogo de midias
// PRODUTO SEM FOTOS: listas vazias, prontas para o cliente.
//
// Para colocar as suas fotos:
// 1. Copie os arquivos para dentro da pasta fotos/
// 2. Adicione o nome de cada arquivo entre aspas em PHOTOS
//    (ex.: "foto-02.jpeg")
// 3. Faça o mesmo com os videos na pasta videos/ em VIDEOS
// ============================================================

const PHOTOS = [
];

const VIDEOS = [
];

// Organizar por colecoes (mesmos nomes dos filtros do site)
function getCollection(filename) {
  const lower = filename.toLowerCase();
  if (lower.startsWith('foto-')) return 'fotos';
  if (lower.startsWith('img_')) return 'momentos';
  return 'memorias';
}

window.ALBUM_DATA = {
  images: PHOTOS,
  videos: VIDEOS,
  getCollection
};

console.log('Album carregado: ' + PHOTOS.length + ' fotos, ' + VIDEOS.length + ' videos');
