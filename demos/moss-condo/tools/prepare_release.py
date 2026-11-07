# Importa caminhos para distinguir o código-fonte da cópia de publicação.
from pathlib import Path
# Importa a cópia de arquivos sem alterar os originais da demonstração.
import shutil
# Importa argumentos para receber o diretório de trabalho da publicação.
import sys
# Localiza a raiz independente do projeto MOSS CONDO.
ROOT = Path(__file__).resolve().parents[1]
# Exige um destino explícito para evitar copiar o build no repositório errado.
if len(sys.argv) != 2:
    # Explica como chamar o script sem executar alterações parciais.
    raise SystemExit('Uso: python tools/prepare_release.py CAMINHO_DO_WORKTREE')
# Resolve o diretório separado que receberá somente os arquivos públicos.
release = Path(sys.argv[1]).resolve()
# Confere que o destino realmente é uma árvore de trabalho Git reconhecível.
if not (release / '.git').exists() or not (release / 'CNAME').exists():
    # Recusa destinos arbitrários antes de criar arquivos.
    raise SystemExit('O destino precisa ser o worktree do site MOSS Digital.')
# Monta o endereço da nova demo dentro da árvore de publicação.
target = release / 'demos' / 'moss-condo'
# Confere se o build existe e se o endereço não contém arquivos de outro trabalho.
if not (ROOT / 'dist' / 'index.html').exists() or target.exists():
    # Recusa sobrescrever uma demo ou publicar sem compilação prévia.
    raise SystemExit('Gere o build e escolha um destino moss-condo ainda inexistente.')
# Copia o build inteiro para uma pasta nova, preservando integralmente o código-fonte.
shutil.copytree(ROOT / 'dist', target)
# Inclui o inventário das fontes das fotografias junto aos arquivos públicos.
shutil.copy2(ROOT / 'docs' / 'photo-sources.json', target / 'photo-sources.json')
# Inclui a explicação do uso ilustrativo das imagens e suas referências de licença.
shutil.copy2(ROOT / 'docs' / 'FOTOGRAFIAS.md', target / 'FOTOGRAFIAS.md')
# Confirma o destino sem executar commit ou push automaticamente.
print(f'Build preparado em {target}; nenhum arquivo existente foi sobrescrito.')
