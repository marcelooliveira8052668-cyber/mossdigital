/* Busca candidatos de fotos no Wikimedia Commons com licença e tamanho. */
const TERMOS = {
  'restaura-prime': ['woodworking workshop', 'wooden chair', 'sanding wood', 'varnish brush wood', 'antique furniture', 'carpenter tools'],
  'acesso-prime': ['wheelchair ramp', 'handrail stairs', 'tactile paving', 'accessible toilet', 'elevator cabin', 'accessibility sign'],
  'inspect-prime': ['building facade', 'wall crack', 'water damage wall', 'building inspector', 'blueprint architecture', 'rusty pipe']
};

async function buscar(termo) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=' +
    encodeURIComponent('filetype:bitmap ' + termo) +
    '&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|size|extmetadata&format=json';
  const r = await fetch(url, { headers: { 'User-Agent': 'MOSS-Digital-demo/1.0 (contato: mossdigital.com.br)' } });
  const j = await r.json();
  return Object.values(j.query?.pages || {}).map(p => {
    const i = p.imageinfo?.[0] || {};
    const m = i.extmetadata || {};
    return {
      titulo: p.title.replace('File:', ''),
      licenca: (m.LicenseShortName?.value || '?').replace(/<[^>]+>/g, ''),
      largura: i.width, altura: i.height,
      url: i.url?.split('?')[0],
      pagina: i.descriptionurl
    };
  });
}

(async () => {
  for (const [demo, termos] of Object.entries(TERMOS)) {
    console.log('\n===== ' + demo + ' =====');
    for (const t of termos) {
      const itens = await buscar(t);
      console.log('\n-- ' + t);
      itens.slice(0, 4).forEach(x => console.log(`  [${x.licenca}] ${x.largura}x${x.altura} | ${x.titulo}`));
    }
  }
})().catch(e => console.error('ERRO', e));
