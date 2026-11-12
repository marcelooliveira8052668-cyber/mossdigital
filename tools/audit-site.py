"""Auditoria de arquivos locais: não envia formulários, não publica nem cobra."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from collections import Counter
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
IGNORE = {'.git', '.moss-local', 'node_modules'}

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids, self.refs, self.scripts = [], [], []
        self.inline = None
        self.has_title = False
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'):
            self.ids.append(a['id'])
        if tag == 'title':
            self.has_title = True
        for key in ('src', 'href', 'poster'):
            if a.get(key) and not a[key].startswith(('data:', 'blob:', 'javascript:')):
                self.refs.append((tag, key, a[key], self.getpos()[0]))
        if tag == 'script' and not a.get('src') and a.get('type', '').lower() in ('', 'text/javascript', 'module'):
            self.inline = []
            self.script_type = 'module' if a.get('type') == 'module' else 'commonjs'
    def handle_endtag(self, tag):
        if tag == 'script' and self.inline is not None:
            self.scripts.append((''.join(self.inline), self.script_type))
            self.inline = None
    def handle_data(self, data):
        if self.inline is not None:
            self.inline.append(data)

def main():
    pages = {}
    errors = []
    for file in ROOT.rglob('*.html'):
        if any(p in IGNORE for p in file.relative_to(ROOT).parts):
            continue
        try:
            text = file.read_text(encoding='utf-8-sig')
            pages[file] = Page(text)
        except Exception as e:
            errors.append({'type': 'parse', 'page': str(file.relative_to(ROOT)), 'detail': str(e)})
    for file, page in pages.items():
        rel = file.relative_to(ROOT).as_posix()
        if not page.has_title and not rel.startswith('google'):
            errors.append({'type': 'title', 'page': rel})
        for id_, count in Counter(page.ids).items():
            if count > 1:
                errors.append({'type': 'duplicate-id', 'page': rel, 'detail': id_, 'count': count})
        for tag, attr, value, line in page.refs:
            url = urlsplit(value)
            if url.scheme or url.netloc:
                if url.netloc not in ('mossdigital.com.br', 'www.mossdigital.com.br'):
                    continue
            pathname = unquote(url.path)
            if any(c in pathname for c in ('{', '}', '$')):
                continue
            if not pathname:
                target = file
            else:
                target = (ROOT / pathname.lstrip('/')) if pathname.startswith('/') or url.netloc else file.parent / pathname
                target = target.resolve()
                if target.is_dir():
                    target = target / 'index.html'
            if not target.exists():
                errors.append({'type': 'missing-file', 'page': rel, 'line': line, 'tag': tag, 'attribute': attr, 'detail': value})
            elif url.fragment and not url.fragment.startswith('/') and target in pages and unquote(url.fragment) not in pages[target].ids:
                # Âncoras de aulas/catálogos podem ser criadas por JavaScript.
                errors.append({'type': 'anchor-review', 'page': rel, 'line': line, 'detail': value})
        for i, (script, mode) in enumerate(page.scripts):
            result = subprocess.run(['node', '--check', '--input-type=' + mode], input=script, text=True, encoding='utf-8', capture_output=True)
            if result.returncode:
                errors.append({'type': 'script-syntax', 'page': rel, 'script': i + 1, 'detail': result.stderr[:1500]})
    js_count = 0
    for file in ROOT.rglob('*.js'):
        if any(p in IGNORE for p in file.relative_to(ROOT).parts):
            continue
        js_count += 1
        result = subprocess.run(['node', '--check', str(file)], capture_output=True, text=True, encoding='utf-8', errors='replace')
        if result.returncode:
            errors.append({'type': 'script-syntax', 'page': file.relative_to(ROOT).as_posix(), 'detail': result.stderr[:1500]})
    report = {'html_pages': len(pages), 'js_files': js_count, 'counts': dict(Counter(e['type'] for e in errors)), 'findings': errors}
    output = ROOT / '.moss-local' / 'audit-site.json'
    output.parent.mkdir(exist_ok=True)
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({k: v for k, v in report.items() if k != 'findings'}, ensure_ascii=False))
    print('Relatório:', output)
    return 0

if __name__ == '__main__':
    sys.exit(main())
