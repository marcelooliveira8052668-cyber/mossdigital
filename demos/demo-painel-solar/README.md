# Painel Solar — Simulador e Benefícios da Energia Solar

## Visão Geral
Demo interativa da MOSS Digital para demonstrar as vantagens da energia solar fotovoltaica. Inclui simulador de economia, benefícios ambientais e formulário de orçamento personalizado.

## Funcionalidades

### 1. Simulador de Economia
- **Entradas:**
  - Valor médio mensal da conta de luz (R$)
  - Tipo de imóvel (residencial/comercial)
  - Estado brasileiro (SP, RJ, MG, RS, SC)
  - Consumo mensal (kWh)
- **Saídas:**
  - Economia mensal estimada (70% do valor da conta)
  - Economia anual estimada
  - Projeção de economia em 5 anos
- **Avisos Importantes:**
  - Os resultados são **ilustrativos** e baseados em médias de mercado
  - **Não garantimos** resultados específicos ou economia garantida
  - Tarifas concessionárias, consumo real, características técnicas da instalação e condições climáticas podem alterar significativamente os valores finais
  - O simulador **não substitui** uma avaliação técnica profissional

### 2. Benefícios da Energia Solar
- **Economia Financeira:** Redução de até 95% na conta de luz, com retorno do investimento em 3 a 6 anos dependendo da região e consumo
- **Impacto Ambiental:** Cada sistema solar residencial evita a emissão de toneladas de CO2 ao longo de sua vida útil, equivalente a plantar centenas de árvores
- **Independência Energética:** Redução da dependência da rede elétrica e proteção contra aumentos de tarifa das concessionárias
- **Valorização do Imóvel:** Imóveis com sistemas solares tendem a ter valor de mercado maior e mais atrativo para futuros compradores

### 2. Galeria de Instalações
Projetos demonstrativos de instalações solares em diferentes tipos de imóveis:
- Residência Moderna
- Galpão Industrial
- Comércio
- Condomínio

### 3. Orçamento Personalizado
- Formulário com campos: nome, telefone, e-mail, tipo de imóvel, valor médio da conta, cidade
- Ao submeter, a equipe entrará em contato em até 24 horas para detalhar o projeto
- WhatsApp direto: (11) 98887-7777

## Tecnologias Utilizadas
- **HTML5:**Estrutura semântica e acessível
- **CSS3:**Estilização responsiva com variáveis CSS e media queries
- **JavaScript Puro:**Simulador, galeria dinâmica e rolagem suave

## Testes Realizados
- ✅ Simulador de economia com diferentes valores de entrada
- ✅ Validação de formulários (campos obrigatórios)
- ✅ Funcionamento de links de âncora (rolagem suave)
- ✅ Responsividade em breakpoints: 768px e 600px
- ✅ Galeria de projetos com renderização dinâmica
- ✅ Verificação de erros no console do navegador

## Estrutura de Arquivos
```
demo-painel-solar/
├── index.html          # HTML semântico com todas as seções
├── css/style.css       # Estilos responsivos com variáveis CSS
├── js/script.js        # JavaScript puro (simulador, galeria, rolagem)
├── assets/img/         # Imagens otimizadas (WebP)
│   ├── logo-painel-solar.svg
│   ├── casa-com-painel.webp
│   ├── galpao-industrial2.webp
│   ├── loja-com-painel.webp
│   └── condominio-painel.webp
└── README.md           # Documentação desta demo
```

## Como Testar
1. Abra o `index.html` em qualquer navegador moderno
2. Arraste a janela do navegador para testar responsividade
3. Preencha o simulador com diferentes valores para ver os resultados
4. Clique nos links de navegação para testar a rolagem suave
5. Passe o mouse sobre os cards de benefícios para ver o efeito de hover

## Contato
Para mais informações ou orçamento personalizado, entre em contato:
- **WhatsApp:** (11) 98887-7777
- **E-mail:** através do formulário do site
- **Endereço:** Rua das Palmeiras, 100 - São Paulo, SP
- **Site:** [mossdigital.com.br](https://mossdigital.com.br)