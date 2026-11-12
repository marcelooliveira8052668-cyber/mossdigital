"""Reúne todas as capas de Instagram em uma pasta única no disco E: da proprietária.

Uso:  python tools/sync_capas_instagram.py
O script nunca publica nada: apenas copia arquivos de divulgação.
"""
from pathlib import Path
import shutil
import sys

REPO = Path(__file__).resolve().parent.parent  # Raiz do repositório mossdigital.
FONTE_REPO = REPO / 'divulgacao' / 'instagram'  # Capas mantidas no repositório.
FONTE_COPIAS = REPO.parent / '04 - Divulgacao'  # Cópias já entregues fora do repositório.
DESTINO = Path('E:/MOSS - Divulgacao/Capas Instagram')  # Pasta única pedida pela proprietária.
LEGENDAS = DESTINO / 'Legendas'  # Textos de apoio separados dos arquivos de imagem.
CAPTURAS = DESTINO / 'Capturas das demos'  # Imagens usadas dentro das fontes editáveis.
PNGS = DESTINO / 'PNGs para postar'  # Todos os PNGs em uma única pasta, prontos para uso.

def nome_amigavel(pasta: Path) -> str:
    """Deriva um nome curto e legível a partir do nome da pasta de origem."""
    if pasta.name.lower() in {'destaques', 'fotos-reais', 'estrutura'}:
        return pasta.name  # Pastas com nomes próprios mantêm a identificação.
    return pasta.name.replace('-', ' ').replace('_', ' ').strip().title()

def coletar() -> list[tuple[Path, str]]:
    """Devolve todos os arquivos de capa encontrados nas duas fontes."""
    achados = []
    for raiz in (FONTE_REPO, FONTE_COPIAS):
        if not raiz.exists():
            continue
        for pasta in sorted(p for p in raiz.iterdir() if p.is_dir()):
            achados.append((pasta, nome_amigavel(pasta)))
    return achados

def main() -> int:
    """Copia as capas para a pasta única e informa o que foi feito."""
    if not Path(DESTINO.drive).exists():
        print(f'Aviso: a unidade {DESTINO.drive} não está conectada. As capas continuam no repositório e na pasta 04 - Divulgacao.')
        return 0
    for pasta in (DESTINO, LEGENDAS, CAPTURAS, PNGS):
        pasta.mkdir(parents=True, exist_ok=True)  # Estrutura única e previsível.
    copiados = 0
    ignoradas = []
    for origem, rotulo in coletar():
        for arquivo in origem.iterdir():
            if not arquivo.is_file():
                continue
            if arquivo.suffix.lower() == '.png':
                shutil.copy2(arquivo, PNGS / arquivo.name)  # Todos os PNGs juntos, prontos para postar.
                copiados += 1
            elif arquivo.suffix.lower() == '.html':
                alvo = CAPTURAS / f'{rotulo} - {arquivo.name}'  # Fonte editável com nome legível.
                shutil.copy2(arquivo, alvo)
                copiados += 1
            elif arquivo.suffix.lower() == '.txt':
                shutil.copy2(arquivo, LEGENDAS / f'{rotulo} - {arquivo.name}')  # Legenda ao lado do nome da demo.
                copiados += 1
            elif arquivo.suffix.lower() == '.webp':
                shutil.copy2(arquivo, CAPTURAS / f'{rotulo} - {arquivo.name}')  # Capturas usadas nas fontes.
                copiados += 1
            else:
                ignoradas.append(arquivo.name)
    (DESTINO / 'LEIA PARA ORGANIZAR.txt').write_text(
        'CAPAS DE INSTAGRAM MOSS DIGITAL\n'
        '=================================\n\n'
        'Esta pasta concentra todas as capas criadas para o Instagram.\n\n'
        'PNGs para postar\n'
        '  Todos os PNGs de 1080 x 1350 px, prontos para arrastar para o Instagram.\n\n'
        'Legendas\n'
        '  Texto pronto de cada capa, com aviso de demonstração e conferência do endereço.\n\n'
        'Capturas das demos\n'
        '  As imagens usadas dentro das fontes editáveis. Mantenha cada arquivo junto do HTML correspondente.\n\n'
        'Fontes editáveis\n'
        '  Os arquivos HTML abrem no navegador e mostram a arte no tamanho real (1080 x 1350).\n'
        '  Para alterar textos ou cores, edite o HTML e tire uma nova captura da tela.\n\n'
        'REGRAS\n'
        '  - Confirme o endereço público da demo antes de divulgar.\n'
        '  - Mantenha a identificação de demonstração e nunca anuncie clientes, preços ou resultados inventados.\n'
        '  - Criar a capa não autoriza postagem. A publicação nas redes sociais precisa de aprovação.\n\n'
        'ATUALIZAÇÃO\n'
        '  Rode novamente: python tools/sync_capas_instagram.py\n'
        '  As capas novas do repositório são copiadas para cá sem apagar as suas edições.\n',
        encoding='utf-8')
    print(f'Capas reunidas em {DESTINO}')
    print(f'  {len(list(PNGS.glob("*.png")))} PNGs em "PNGs para postar"')
    print(f'  {len(list(LEGENDAS.glob("*.txt")))} legendas em "Legendas"')
    print(f'  {len(list(CAPTURAS.glob("*")))} arquivos de apoio em "Capturas das demos"')
    if ignoradas:
        print('  Arquivos de outros tipos ignorados:', ', '.join(sorted(set(ignoradas))[:8]))
    return 0

if __name__ == '__main__':
    sys.exit(main())
