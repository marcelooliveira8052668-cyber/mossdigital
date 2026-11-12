"""Remove os prefixos de patch que sobraram no template HTML do gerador de capas."""
from pathlib import Path

ARQUIVO = Path(__file__).resolve().parent / 'make_capas.py'  # Gerador em correção.

def main():
    texto = ARQUIVO.read_text(encoding='utf-8')  # Lê preservando acentos.
    inicio = texto.index('HTML=')  # Início do template.
    fim = texto.index("LEGENDA='''")  # Fim do template.
    bloco = texto[inicio:fim]  # Recorte do template HTML.
    corrigido = '\n'.join(linha[1:] if linha.startswith('+') else linha for linha in bloco.splitlines())  # Remove o prefixo herdado do patch.
    ARQUIVO.write_text(texto[:inicio] + corrigido + '\n' + texto[fim:], encoding='utf-8')  # Grava sem alterar o restante.
    print('Template do gerador corrigido.')

if __name__ == '__main__':
    main()  # Correção pontual e reversível.
