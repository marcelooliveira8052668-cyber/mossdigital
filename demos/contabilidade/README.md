# Eixo Contábil — demonstração de site

Marca fictícia, não um escritório em funcionamento. Não foram criados registros profissionais, CNPJ, depoimentos, números de clientes ou resultados fictícios apresentados como reais.

- Três serviços ilustrativos e um roteiro guiado por objetivo, setor e tema de equipe.
- O roteiro é apenas uma organização de perguntas; não calcula tributos nem recomenda regime, enquadramento, prazo, obrigação ou viabilidade.
- Não é orientação fiscal, diagnóstico ou prestação de serviços contábeis. Um caso real exige profissional habilitado e informações atualizadas.
- Não há CPF, CNPJ, nome, senha, upload, pagamento, autenticação ou banco de dados.
- Respostas não são enviadas nem armazenadas. O roteiro pode ser copiado ou baixado em TXT; se a área de transferência for bloqueada, o download é usado como alternativa.
- Trocar respostas invalida a prévia; o reconhecimento da demonstração precisa ser renovado.
- O WhatsApp final é da MOSS Digital, para contratar desenvolvimento de site, não serviços contábeis.
- Sem JavaScript: apresentação acessível, formulário desabilitado. Sem fontes externas ou análise de visitantes adicionadas.

Para uso real: inserir marca, equipe e qualificações verificáveis, definir serviços, privacidade, condições e qualquer infraestrutura para documentos ou área do cliente. Não apresentar os recursos como implementados antes de contratar e testar as integrações. A demo usa `noindex,nofollow` e não entra no sitemap como empresa real.

Capa, fonte HTML e legenda em `divulgacao/instagram/contabilidade/`, com cópia em `04 - Divulgacao/Contabilidade - Demonstracao/`.

Renderizar: `python tools/render-demo-cover.py --slug contabilidade --page demos/contabilidade/index.html --output PASTA_DE_DIVULGACAO`.
Testar com Playwright: `python tools/test-novas-demos.py --output PASTA_DE_RELATORIOS`.

Destino planejado: `https://mossdigital.com.br/demos/contabilidade/`. Confirmar que está publicado antes de divulgar. Nada é publicado automaticamente.
