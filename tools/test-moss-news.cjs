/* npm install playwright; npx playwright install chromium; servir a raiz em localhost:8770. */
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
const base=process.env.MOSS_TEST_BASE || 'http://127.0.0.1:8770';
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch();
 try {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'/demos/moss-news/');
  await page.locator('.story').first().waitFor();
  assert.equal(await page.locator('.story').count(),8);
  await page.locator('img').evaluateAll(images=>Promise.all(images.map(img=>{img.loading='eager';return img.decode();})));
  assert.equal(await page.locator('img').evaluateAll(images=>images.every(img=>img.naturalWidth>0)),true);
  await page.screenshot({path:path.join(root,'demos/moss-news/previa-desktop.png'),fullPage:true});
  for(const id of await page.locator('#articles [data-article]').evaluateAll(links=>links.map(link=>link.dataset.article))) {
    await page.locator(`#articles [data-article="${id}"]`).focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(()=>document.querySelector('#reader').open);
    assert.ok(await page.locator('.reader-prose section').count()>=5);
    assert.ok(await page.locator('.reader-sources a').count()>=2);
    assert.equal(await page.locator('#close-reader').evaluate(el=>el===document.activeElement),true);
    await page.keyboard.press('Escape');
    await page.waitForFunction(()=>!document.querySelector('#reader').open);
    assert.equal(await page.locator(`#articles [data-article="${id}"]`).evaluate(el=>el===document.activeElement),true);
  }
  await page.getByRole('button',{name:'Tecnologia',exact:true}).click();
  assert.equal(await page.locator('.story').count(),2);
  await page.locator('#reset').click();
  await page.locator('#search').fill('inteligencia');
  assert.equal(await page.locator('.story').count(),1);
  await page.locator('#search').fill('naoexistezzzz');
  assert.equal(await page.locator('.story').count(),0);
  assert.match(await page.locator('#articles').innerText(),/Nenhum guia/);
  await page.locator('#reset').click();
  for(const query of ['segurança','negócio','inteligência','consumo']){
    await page.locator(`[data-query="${query}"]`).click();
    assert.ok(await page.locator('.story').count()>0);
  }
  await page.locator('#reset').click();
  const oldTheme=await page.locator('body').evaluate(el=>el.classList.contains('dark'));
  await page.locator('#theme').click();await page.reload();
  assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('dark')),!oldTheme);
  await page.locator('#theme').click();
  await page.locator('#credits').click();
  assert.equal(await page.locator('#credits-dialog').evaluate(el=>el.open),true);
  await page.keyboard.press('Escape');
  await page.goto(base+'/demos/moss-news/#guia=seguranca-digital');
  await page.waitForFunction(()=>document.querySelector('#reader').open);
  await page.locator('#close-reader').click();
  const duration=await page.locator('video').evaluate(async video=>{video.load();return await new Promise(resolve=>{video.addEventListener('loadedmetadata',()=>resolve(video.duration),{once:true});video.addEventListener('error',()=>resolve(-1),{once:true});});});
  assert.ok(duration>0);
  await page.locator('video').evaluate(async video=>{await video.play();});
  assert.equal(await page.locator('video').evaluate(video=>video.paused),false);
  await page.locator('video').evaluate(video=>video.pause());
  for(const width of [320,375,390,768,1024,1440]){
    await page.setViewportSize({width,height:900});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow em ${width}`);
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto(base+'/demos/moss-news/');
  await page.locator('img').evaluateAll(images=>Promise.all(images.map(img=>{img.loading='eager';return img.decode();})));
  await page.screenshot({path:path.join(root,'demos/moss-news/previa-celular.png'),fullPage:true});
  await page.getByRole('link',{name:'Manual do comprador'}).click();
  assert.match(await page.locator('h1').innerText(),/primeiro arquivo/);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+'/');
  assert.ok(await page.locator('main .grid article.card').count()>=10);
  const home=page.locator('article.card').filter({has:page.locator('h3',{hasText:'MOSS News'})});
  assert.equal(await home.count(),1);
  assert.equal(await home.locator('a.btn-outline').getAttribute('href'),'demos/moss-news/');
  await home.locator('img').evaluate(img=>{img.loading='eager';return img.decode();});
  await page.goto(base+'/modelos.html');
  await page.waitForFunction(()=>document.documentElement.dataset.mossPreviews==='ready');
  assert.ok(await page.locator('#cards article.card').count()>=122);
  const news=page.locator('#cards article.card').filter({has:page.locator('h2',{hasText:'MOSS News'})});
  assert.equal(await news.count(),1);
  assert.equal(await news.locator('a.demo').getAttribute('href'),'demos/moss-news/');
  await news.locator('img').evaluate(img=>{img.loading='eager';return img.decode();});
  await page.getByRole('searchbox').fill('MOSS News');
  assert.equal(await page.locator('#cards article.card:visible').count(),1);
  await page.goto(base+'/divulgacao/instagram/moss-news/capa.html');
  await page.setViewportSize({width:1080,height:1350});
  await page.locator('img').evaluateAll(images=>Promise.all(images.map(img=>img.decode())));
  assert.equal(await page.locator('.cover').evaluate(el=>el.scrollHeight<=el.clientHeight),true);
  assert.equal(await page.locator('.cover').evaluate(el=>el.scrollWidth<=el.clientWidth),true);
  assert.equal(await page.locator('.disclaimer').evaluate(el=>el.getBoundingClientRect().bottom<=1350),true);
  await page.screenshot({path:path.join(root,'divulgacao/instagram/moss-news/capa.png'),fullPage:false});
  assert.deepEqual(errors,[]);
  console.log('OK: 8 guias, referências, teclado e foco, busca, filtros, atalhos, tema, transparência, link direto, imagens, reprodução de vídeo, manual, 6 larguras, home 10 cards, catálogo 122 cards com busca, capa 1080x1350, zero erros JS.');
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
