"""Prepara a publicação da VIVA Prime: metadados, sitemap e registro da aprovação."""
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[3]  # Raiz do repositório na árvore de publicação.
MODELOS = RAIZ / 'modelos.html'  # Catálogo com metadados descritivos.
SITEMAP = RAIZ / 'sitemap.xml'  # Lista de endereços públicos.
DEMO = RAIZ / 'demos' / 'viva-prime'  # Pasta da demonstração aprovada.
ENTREGA = DEMO / 'entrega'  # Registro de publicação e card.

def main():
    # 1. Metadados do catálogo passam de 125 para 126 modelos.
    texto = MODELOS.read_text(encoding='utf-8')  # Lê o catálogo.
    texto = texto.replace('Explore os 125 modelos de sites da MOSS Digital', 'Explore os 126 modelos de sites da MOSS Digital')
    texto = texto.replace('Catálogo com 125 modelos de sites prontos', 'Catálogo com 126 modelos de sites prontos')
    MODELOS.write_text(texto, encoding='utf-8')  # Grava os metadados atualizados.

    # 2. Endereço público da demo entra no sitemap.
    mapa = SITEMAP.read_text(encoding='utf-8')  # Lê o sitemap atual.
    if 'demos/viva-prime/' not in mapa:  # Evita duplicar em execuções futuras.
        entrada = ('  <url>\n    <loc>https://mossdigital.com.br/demos/viva-prime/</loc>\n'
                   '    <lastmod>2026-11-12</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n')
        marcador = '  <url>\n    <loc>https://mossdigital.com.br/demos/moss-academia/</loc>'  # Insere logo após a academia.
        pos = mapa.index(marcador) + len('  <url>\n    <loc>https://mossdigital.com.br/demos/moss-academia/</loc>\n'
                                        '    <lastmod>2026-11-12</lastmod>\n    <changefreq>monthly</changefreq>\n'
                                        '    <priority>0.7</priority>\n  </url>\n')
        mapa = mapa[:pos] + entrada + mapa[pos:]  # Mantém o padrão de ordenação do arquivo.
        SITEMAP.write_text(mapa, encoding='utf-8')  # Grava o sitemap com o novo endereço.

    # 3. Registro explícito da autorização do proprietário.
    (ENTREGA / 'APROVACAO.md').write_text('''# Autorização de publicação

- Data: 12/11/2026.
- Demonstração aprovada: VIVA Prime Imóveis.
- Mensagem explícita do proprietário: **“pode publicar”**.
- Escopo: publicar esta demo no site MOSS Digital, com acesso pela página principal e pelo catálogo.
- URL: <https://mossdigital.com.br/demos/viva-prime/>.
- Inclui a capa de Instagram preparada em `divulgacao/instagram/viva-prime/`, sem postagem nas redes sociais.
- Não inclui publicação de outras alterações locais, operações imobiliárias reais, disponibilidade, reserva, financiamento aprovado ou banco conectado.
- Marca, anúncios, equipe, valores, horários e depoimentos continuam fictícios e identificados como demonstração.
''', encoding='utf-8')  # Guarda a autorização junto da demo.

    # 4. Catálogo interno da entrega deixa de tratar a demo como pendente.
    catalogo = ENTREGA / 'catalogo-publicacao.json'  # Registro estruturado.
    catalogo.write_text('''{
  "nome": "VIVA Prime Imóveis",
  "status": "publicacao-autorizada",
  "aprovacao": "pode publicar — autorização explícita do proprietário em 12/11/2026",
  "publicado": true,
  "url": "https://mossdigital.com.br/demos/viva-prime/",
  "categoria": "Serviços",
  "segmento": "Portal imobiliário premium",
  "destino_relativo_raiz": "demos/viva-prime/",
  "capa_relativa_raiz": "demos/viva-prime/entrega/card-viva-prime.webp",
  "descricao": "Portal imobiliário editorial com 16 anúncios fictícios, busca completa, favoritos, comparador, simulador de financiamento e painel local demonstrativo. Galerias com cinco espaços para fotos reais, sem atribuição enganosa de imagens de banco.",
  "aviso": "Sem imóveis reais, disponibilidade, reserva, CRECI verificado, backend ou financiamento aprovado. A postagem nas redes sociais continua exigindo autorização própria."
}
''', encoding='utf-8')  # Substitui o registro pendente.

    # 5. README passa a refletir a publicação.
    leia = DEMO / 'README.md'  # Manual do comprador.
    texto_leia = leia.read_text(encoding='utf-8')  # Lê o manual.
    texto_leia = texto_leia.replace(
        '**Não publicada e não autorizada para publicação.** A aprovação da MOSS Academia não se estende a este projeto.',
        '**Publicação autorizada explicitamente pelo proprietário em 12/11/2026, com a mensagem “pode publicar”.** Endereço: <https://mossdigital.com.br/demos/viva-prime/>. A autorização cobre o site e o catálogo; a postagem no Instagram continua exigindo aprovação própria.')
    texto_leia = texto_leia.replace('## Capa e catálogo — aguardando aprovação', '## Capa e catálogo — publicados')
    texto_leia = texto_leia.replace('- Card e entrada de catálogo preparados em `entrega/`, **sem inserir na home/catálogo públicos**.',
                                    '- Card e entrada de catálogo aplicados na home e no catálogo da versão publicada.')
    texto_leia = texto_leia.replace('- Não há URL pública aprovada para esta demo. Não divulgar localhost ou inventar endereço.',
                                    '- Endereço publicado: <https://mossdigital.com.br/demos/viva-prime/>. Conferir o endereço no navegador antes de divulgar a arte.')
    texto_leia = texto_leia.replace('## Publicar somente depois da aprovação desta demo', '## Publicação realizada em 12/11/2026')
    leia.write_text(texto_leia, encoding='utf-8')  # Grava o manual atualizado.

    print('Metadados, sitemap, registro de aprovação e manual atualizados.')

if __name__ == '__main__':
    main()  # Execução manual e determinística.
