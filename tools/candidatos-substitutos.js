const TERMOS = [
  'wheelchair ramp entrance building', 'wheelchair ramp handrail',
  'elevator cabin interior', 'lift elevator inside',
  'construction inspector helmet', 'building inspection worker'
];
(async () => {
  for (const t of TERMOS) {
    const u = 'https://api.openverse.org/v1/images/?' + new URLSearchParams({ q: t, page_size: 8, license: 'cc0,by,by-sa' });
    const r = await fetch(u, { headers: { 'User-Agent': 'MOSS-Digital-demo/1.0 (mossdigital.com.br)' } });
    const j = await r.json();
    console.log('\n-- ' + t);
    (j.results || []).forEach((x, i) => {
      const host = (() => { try { return new URL(x.url).hostname; } catch { return '?'; } })();
      console.log(`  ${i} [${x.license}] ${x.width}x${x.height} ${host} | ${(x.title || '').slice(0, 70)}`);
    });
    await new Promise(r => setTimeout(r, 700));
  }
})().catch(e => console.error(e));
