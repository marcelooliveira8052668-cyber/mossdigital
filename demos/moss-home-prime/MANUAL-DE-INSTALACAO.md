# MOSS HOME PRIME — Manual de instalação e personalização

> Documento da demo em desenvolvimento. Não representa uma loja real. Antes de vender ou publicar para um cliente, substitua dados demonstrativos e valide as imagens.

## 1. Arquivos
- `index.html`: estrutura HTML, estilos CSS e interações JavaScript integrados.
- `MANUAL-DE-INSTALACAO.md`: este guia.
- Futuras fotografias próprias/licenciadas podem ser guardadas em `assets/img/`.

## 2. Testar no Koder
1. Copie o arquivo `index.html` para o aparelho.
2. Abra-o no Koder e escolha a prévia do navegador.
3. Mantenha conexão com a internet enquanto as imagens externas forem utilizadas.
4. Teste busca, filtro, ordenação, detalhes, carrinho, favoritos e comparação.
5. Verifique a versão mobile e a abertura do WhatsApp.

## 3. Personalizar
- No início do JavaScript, altere `TELEFONE` para o WhatsApp comercial autorizado no formato código do país + DDD + número, sem sinais.
- Em `colecoes`, substitua os nomes fictícios dos produtos.
- No mapeamento `produtos`, altere os preços e descrições demonstrativos.
- Revise título, marca, história, textos, política de privacidade e informações do rodapé.
- Não anuncie como disponível para venda um móvel cujo estoque, preço e identidade não tenham sido confirmados.

## 4. Fotografias e galerias
A demo contém fotografias de referência de ambientes, que **não correspondem necessariamente** ao produto anunciado. Elas não devem ser apresentadas como fotos de um mesmo móvel.
- Cadastre somente **3 a 5 arquivos diferentes do mesmo item**, com origem e autorização verificadas, no objeto `galeriasVerificadas`.
- Exemplo: `1: ['assets/img/sofa-aurora-frente.webp','assets/img/sofa-aurora-lado.webp','assets/img/sofa-aurora-detalhe.webp']`.
- Até que isso seja feito, a galeria exibe apenas uma foto ilustrativa e identifica a pendência.
- Mantenha registro da URL de origem, autor, licença e data da consulta; imagens de marcas, obras ou pessoas podem exigir permissões adicionais.
- Nunca fabrique ângulos diferentes recortando uma única foto e chamando-os de fotografias distintas do produto.

## 5. Hospedagem e domínio
O site estático pode ser publicado em hospedagens compatíveis com HTML, CSS e JavaScript.
- Envie o `index.html` e a pasta de imagens mantendo os caminhos relativos.
- Em GitHub Pages, Netlify, Vercel ou hospedagem tradicional, siga o procedimento oficial do provedor escolhido.
- Configure DNS (A, AAAA ou CNAME, conforme instruções do provedor) no painel do domínio.
- Ative HTTPS e teste tanto o domínio principal quanto o endereço com `www`, se aplicável.
- Não altere o site oficial MOSS Digital sem aprovação do proprietário.

## 6. WhatsApp e pagamentos
O carrinho monta uma mensagem de consulta e abre o WhatsApp; **não processa pagamento nem confirma pedidos**.
Para Pix/cartão automáticos, será necessário contratar um provedor de pagamentos e integrar um backend seguro quando exigido. Nunca inclua chaves secretas em HTML/JavaScript público.

## 7. Banco de dados
O catálogo demonstrativo é estático e não exige banco de dados. Estoque em tempo real, contas, pedidos persistentes e painel administrativo requerem backend, autenticação, banco e regras de segurança adequadas.

## 8. Checklist de entrega
- [ ] Fotografias de cada produto verificadas e licenciadas
- [ ] Preços, medidas, descrições e estoque revisados
- [ ] Links, telefone, carrinho e contatos testados
- [ ] Busca, filtros, favoritos, comparação e modais testados
- [ ] Teste em celular e computador concluído
- [ ] Domínio e HTTPS funcionando
- [ ] Backup do pacote e dados do cliente armazenados com segurança
- [ ] Políticas comerciais e de privacidade ajustadas ao negócio

## 9. Suporte MOSS Digital
Instalação, personalização e manutenção podem ser contratadas separadamente, mediante avaliação técnica e orçamento. Serviços remotos simples podem começar em R$ 39,90 por atendimento, sem incluir hospedagem, domínio ou integrações complexas.
