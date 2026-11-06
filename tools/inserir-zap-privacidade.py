"""Insere o botão fixo do WhatsApp e o link Privacidade nos 4 arquivos (worktree + _repo-site).

Uso: python tools/inserir-zap-privacidade.py [--dry]
"""
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

WORKTREE = Path(r'C:\Users\Sylvia Camillo\Downloads\00 - MOSS Digital\10 - Plataforma MOSS\publicacao-controlada')
REPO = Path(r'C:\Users\Sylvia Camillo\Downloads\00 - MOSS Digital\_repo-site')
DRY = '--dry' in sys.argv

ZAP = (
    '\n    <a class="zap-flutuante" href="https://wa.me/5511942038103?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20MOSS%20Digital." '
    'target="_blank" rel="noopener noreferrer" aria-label="Falar com a MOSS Digital no WhatsApp">'
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">'
    '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>'
    '<span>WhatsApp</span></a>\n'
)

PAGINAS = ['index.html', 'modelos.html', 'sistemas.html', 'estrutura.html']


def inserir_privacidade(texto: str) -> str:
    """Adiciona link Privacidade no rodapé (nav do index ou no fim dos outros)."""
    if 'privacidade.html' in texto[texto.rfind('<footer>'):]:
        return texto  # já tem
    if '</nav></footer>' in texto:
        return texto.replace('</nav></footer>', '<a href="privacidade.html">Privacidade</a></nav></footer>', 1)
    # rodapé simples: insere antes de </footer> na última ocorrência
    i = texto.rfind('</footer>')
    if i == -1:
        raise ValueError('rodapé não encontrado')
    return texto[:i] + ' · <a href="privacidade.html">Privacidade</a>' + texto[i:]


def inserir_zap(texto: str) -> str:
    if 'zap-flutuante' in texto:
        return texto  # já tem
    i = texto.rfind('</body>')
    if i == -1:
        raise ValueError('</body> não encontrado')
    return texto[:i] + ZAP + texto[i:]


falhas = 0
for raiz, rotulo in [(WORKTREE, 'worktree'), (REPO, '_repo-site')]:
    print(f'=== {rotulo} ===')
    for nome in PAGINAS:
        caminho = raiz / nome
        if not caminho.exists():
            print(f'  {nome}: AUSENTE (pulado)')
            continue
        original = caminho.read_text(encoding='utf-8')
        try:
            novo = inserir_zap(inserir_privacidade(original))
        except ValueError as erro:
            print(f'  {nome}: ERRO — {erro}')
            falhas += 1
            continue
        tem_zap = 'zap-flutuante' in novo
        i = novo.rfind('<footer>')
        tem_priv = 'privacidade.html' in novo[i:] if i != -1 else False
        status = 'OK' if (tem_zap and tem_priv) else 'FALTA'
        if status != 'OK':
            falhas += 1
        print(f'  {nome}: zap={tem_zap} privacidade={tem_priv} -> {status}')
        if novo != original and not DRY:
            caminho.write_text(novo, encoding='utf-8')

print('\nDRY-RUN (nada gravado)' if DRY else '\ngravado' if not falhas else f'\n{falhas} FALHAS')
sys.exit(1 if falhas else 0)
