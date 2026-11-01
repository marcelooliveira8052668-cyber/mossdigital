"""Confere integridade dos pacotes e referências das cinco demos."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,struct,zipfile

repo=Path(__file__).resolve().parents[1]
ids=['reciclo','junto','raizfeira','pontocomum','acessoaberto']
class Page(HTMLParser):
    def __init__(self):super().__init__();self.refs=[];self.ids=[];self.h1=0;self.robots=''
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='h1':self.h1+=1
        if a.get('id'):self.ids.append(a['id'])
        if tag=='meta' and a.get('name')=='robots':self.robots=a.get('content','')
        for attr in ['href','src']:
            if a.get(attr):self.refs.append(a[attr])

for id in ids:
    base=repo/'demos'/id
    for source in base.glob('*.html'):
        text=source.read_text(encoding='utf-8');page=Page();page.feed(text)
        assert page.h1==1,(source,'h1')
        assert len(page.ids)==len(set(page.ids)),(source,'IDs repetidos')
        assert 'noindex' in page.robots,(source,'noindex ausente')
        assert text.count('<!--')==text.count('-->'),(source,'comentários desbalanceados')
        for ref in page.refs:
            parts=urlsplit(ref)
            if parts.scheme or parts.netloc:continue
            if not parts.path:
                if parts.fragment:assert unquote(parts.fragment) in page.ids,(source,ref)
                continue
            target=source.parent/unquote(parts.path)
            assert target.exists(),(source,ref)
    assert struct.unpack('>II',(base/'assets/social.png').read_bytes()[16:24])==(1200,630)
    print(id+': páginas, links, IDs, comentários e imagem social OK')

covers=list((repo/'divulgacao/instagram/utilidade-empreendedorismo').glob('*.png'))
assert len(covers)==5
for p in covers:assert struct.unpack('>II',p.read_bytes()[16:24])==(1080,1350)
packages=list((repo/'entregas/utilidade-empreendedorismo').glob('*.zip'))
assert len(packages)==5
for p in packages:
    with zipfile.ZipFile(p) as archive:
        assert archive.testzip() is None
        names=archive.namelist()
        assert any(n.endswith('/index.html') for n in names)
        assert any(n.endswith('/ENTREGA-AO-CLIENTE.md') for n in names)
print('Cinco capas 1080x1350 e cinco ZIPs íntegros: OK')
