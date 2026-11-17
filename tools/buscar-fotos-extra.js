/* Busca extra, com delay, para completar as seleções. */
const TERMOS = [
  'furniture restoration', 'wooden chair woodworking', 'wooden table workshop',
  'architectural blueprint', 'construction worker inspection', 'building inspection'
];
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function buscar(termo) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=' +
    encodeURIComponent('filetype:bitmap ' + termo) +
    '&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|size|extmetadata&format=json';
  for (let tentativa = 0; tentativa < 3; tentativa++) {
    const r = await fetch(url, { headers: { 'User-Agent': 'MOSS-Digital-demo/1.0 (mossdigital.com.br)' } });
    const txt = await r.text();
    try {
      const j = JSON.parse(txt);
      return Object.values(j.query?.pages || {}).map(p => {
        const i = p.imageinfo?.[0] || {}, m = i.extmetadata || {};
        return {
          titulo: p.title.replace('File:', ''),
          licenca: (m.LicenseShortName?.value || '?').replace(/<[^>]+>/g, ''),
          url: i.url?.split('?')[0]
        };
      });
    } catch (e) { await sleep(2500); }
  }
  return [];
}

(async () => {
  for (const t of TERMOS) {
    const itens = await buscar(t);
    console.log('\n-- ' + t);
    itens.forEach(x => console.log(`  [${x.licenca}] ${x.titulo}`));
    await sleep(1800);
  }
})().catch(e => console.error('ERRO', e));
