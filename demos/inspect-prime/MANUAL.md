# Manual do comprador — INSPECT PRIME

Demonstração desenvolvida pela **MOSS Digital**. Este manual explica como testar,
personalizar e publicar o modelo. **Todos os dados, nomes, preços e imagens de
empresa são fictícios.**

## 1. Como testar
1. Abra `index.html` no navegador (computador ou celular).
2. Navegue pelas seções e teste os botões, filtros e formulários.
3. Preencha os formulários com dados inventados. Nada é enviado a servidor.
4. Confira a versão em telas pequenas (360 px) e grandes (1366 px).

## 2. Checklist de verificação
- [ ] Menu abre e fecha (inclusive no celular)
- [ ] Botões e links levam à seção correta
- [ ] Formulários validam e exibem confirmação **simulada**
- [ ] Imagens carregam e possuem texto alternativo
- [ ] Sem rolagem horizontal indesejada
- [ ] Navegação por teclado funciona

## 3. Como personalizar para um cliente real
- **Textos e serviços:** edite os arrays no `<script>` (ver README.md).
- **Fotografias:** substitua os WebP em `img/fotos/` e atualize `CREDITOS.md`
  com a nova fonte e licença.
- **Preços/valores:** altere os objetos de configuração no JavaScript.
- **Contato:** troque o número em `WHATSAPP_MOSS` e o link do rodapé.
- **Cores:** altere as variáveis CSS em `:root`.

## 4. Publicação
- Demo é independente: basta enviar a pasta inteira para o servidor.
- Use caminhos relativos para imagens e arquivos locais.
- No GitHub Pages, confirme a branch/pasta e depois verifique os links.

## 5. Dependências e limites
- HTML5, CSS3 e JavaScript puro. Sem frameworks, build ou servidor obrigatório.
- Funciona em navegadores modernos. Sem API paga ou credencial no frontend.
- Esta é uma demonstração: não processa pedidos, pagamentos nem dados reais.

## 6. Pedidos e pagamento (simulação)
- Os formulários apenas validam campos e exibem confirmação local.
- **Nenhum pedido é enviado e nenhum pagamento é aprovado.**
- Para pedidos reais: integrar WhatsApp Business, e-mail ou banco/servidor com
  autenticação e regras de acesso (RLS) para dados pessoais.
- Para cobrança real: gateway com chave secreta no servidor, confirmação por
  webhook e autenticação. Nunca expor chave privada no JavaScript público.

## 7. Créditos e licenças das fotos
As 6 fotografias ilustrativas foram obtidas via Openverse com licenças CC0,
CC BY ou CC BY-SA; fontes, autores e licenças estão em `CREDITOS.md` e
`img/fotos/fontes.json`. Elas não representam a empresa fictícia.

## 8. Status da entrega
- Demonstração funcional e testada (larguras 360/390/768/1366 px).
- 6 fotografias licenciadas e otimizadas, com créditos.
- Capa Instagram em `divulgacao/instagram/<demo>/`.
- Publicação no site oficial: somente após autorização explícita desta demo.
