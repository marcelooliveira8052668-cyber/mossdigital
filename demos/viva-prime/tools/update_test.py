"""Atualiza as expectativas do teste da VIVA Prime após a expansão do catálogo."""
from pathlib import Path

ARQUIVO = Path(__file__).resolve().parent.parent / 'tools' / 'test_demo.py'  # Teste da demo.

def main():
    texto = ARQUIVO.read_text(encoding='utf-8')  # Lê o teste atual.
    trocas = [
        ("assert page.evaluate('VIVA_DATA.listings.length')==12", "assert page.evaluate('VIVA_DATA.listings.length')==16"),
        ("assert page.locator('.property-card').count()==12", "assert page.locator('.property-card').count()==16"),
        ('document.querySelectorAll(".property-card").length===12', 'document.querySelectorAll(".property-card").length===16'),
        ("assert ids==['VP-109','VP-111','VP-104','VP-103'],ids", "assert ids==['VP-109','VP-116','VP-111','VP-114','VP-104','VP-103'],ids"),
        ("assert page.locator('.property-card').count()==4", "assert page.locator('.property-card').count()==6"),
        ("('collection=campo&minLand=1000',1)", "('collection=campo&minLand=1000',2)"),
        ("('collection=praia&purpose=temporada&guests=6',1)", "('collection=praia&purpose=temporada&guests=6',2)"),
        ("('type=Kitnet',0)", "('type=Kitnet',1)"),
        ("('purpose=alugar&pets=on',1)", "('purpose=alugar&pets=on',2)"),
        ("assert page.locator('.property-card').count()==3", "assert page.locator('.property-card').count()==4"),
        ("assert page.locator('.admin-row').count()==12", "assert page.locator('.admin-row').count()==16"),
        ("assert page.locator('.admin-row').count()==13", "assert page.locator('.admin-row').count()==17"),
        ("for i in range(101,113):", "for i in range(101,117):"),
        ("12 cadastros e cinco espaços", "16 cadastros e cinco espaços"),
        ("Doze páginas de detalhes", "Dezesseis páginas de detalhes"),
    ]  # Cada troca reflete o catálogo real de 16 imóveis.
    for antigo, novo in trocas:
        texto = texto.replace(antigo, novo)  # Substitui apenas a ocorrência esperada.
    ARQUIVO.write_text(texto, encoding='utf-8')  # Grava o teste atualizado.
    print('Expectativas do teste atualizadas para 16 imóveis.')

if __name__ == '__main__':
    main()  # Correção determinística e revisável.
