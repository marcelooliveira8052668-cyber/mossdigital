# Manual do comprador — ECOANALYTICS PRIME

Demonstração desenvolvida pela **MOSS Digital**. Todos os dados, nomes, preços
e imagens de empresa são fictícios.

## 1. Como testar
1. Abra `index.html` no navegador (computador ou celular).
2. Navegue pelas seções e teste botões, filtros e formulários.
3. Preencha os formulários com dados inventados: nada é enviado a servidor.
4. Confira telas pequenas (360 px) e grandes (1366 px).

## 2. Checklist de verificação
- [ ] Menu abre e fecha (inclusive no celular)
- [ ] Botões e links levam à seção correta
- [ ] Formulários validam e exibem confirmação **simulada**
- [ ] Imagens carregam e possuem texto alternativo
- [ ] Sem rolagem horizontal indesejada
- [ ] Navegação por teclado funciona

## 3. Personalização
- **Textos/serviços:** edite os arrays no `<script>` (ver README.md).
- **Fotografias:** substitua os WebP em `img/fotos/` e atualize `CREDITOS.md`.
- **Valores:** altere os objetos de configuração no JavaScript.
- **Contato:** troque `WHATSAPP_MOSS` e o link do rodapé.
- **Cores:** altere as variáveis CSS em `:root`.

## 4. Publicação
Pasta independente: envie tudo ao servidor. Use caminhos relativos. No GitHub
Pages, confirme branch/pasta e verifique os links depois.

## 5. Dependências e limites
HTML5, CSS3 e JavaScript puro. Sem frameworks, build ou servidor obrigatório.
Sem API paga ou credencial no frontend. Não processa pedidos nem pagamentos reais.

## 6. Pedidos e pagamento (simulação)
Formulários apenas validam e confirmam localmente. **Nenhum pedido é enviado e
nenhum pagamento é aprovado.** Para pedidos reais: WhatsApp Business, e-mail ou
banco/servidor com autenticação e RLS para dados pessoais. Para cobrança real:
gateway com chave secreta no servidor, webhook de confirmação e autenticação.
Nunca exponha chave privada no JavaScript público.

## 7. Créditos das fotos
6 fotografias ilustrativas obtidas via Openverse (CC0/CC BY/CC BY-SA), com
fonte, autor e licença em `CREDITOS.md` e `img/fotos/fontes.json`. Elas não
representam a empresa fictícia.

## 8. Status
Demonstração funcional e testada em 360/390/768/1366 px, com 6 fotos
licenciadas, manual e capa Instagram. Publicação sujeita à autorização
explícita desta demo.
