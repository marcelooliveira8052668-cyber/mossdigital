# Mapa visual da aplicação

```text
                         ┌───────────────────────────┐
                         │        index.html         │
                         │  HTML semântico + script  │
                         └─────────────┬─────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
  ┌─────▼─────┐                  ┌─────▼─────┐                  ┌─────▼─────┐
  │    css    │                  │    js     │                  │ supabase  │
  └─────┬─────┘                  └─────┬─────┘                  └─────┬─────┘
        │                              │                              │
  base · layout                 core ──► data ──► services        schema.sql
  components · pages            │        │         │              config.js
  lab                           │        │         │
                                │        │         └─ api · cart · order
                         utils · store   │            payment · logistics
                         notify · theme  │            supabase
                         router          │
                                         └─ catalog · coupons · shipping
                                            technologies · course
                                            lab-content
                                    │
                              components
                              ui · layout · product-card
                                    │
                                  pages
                        home · store · product · cart
                        checkout · orders · tracking · admin
                        technologies · lab · career
                                    │
                                 app.js
                          (registra rotas e inicia)
```

## Fluxo de uma ação (exemplo: adicionar ao carrinho)

```text
Botão "Adicionar"  (product-card.js)
        │  clique
        ▼
cartService.add()  (services/cart.service.js)
        │  valida estoque
        ▼
store.addToCart()  (core/store.js)
        │  atualiza estado + localStorage
        ▼
notify.toast() + atualização do badge  (core/notify.js, components/layout.js)
        │
        ▼
Usuário vê o resultado na tela
```

Esse mesmo caminho é mostrado animado no **Laboratório Visual do Código**.
