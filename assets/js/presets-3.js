// ==========================================================================
// PRESETS 3 — 5 novos nichos de alta demanda
// ==========================================================================
// Adiciona 5 presets ao SITE_PRESET_LIST e ao SITE_PRESETS.
// Para usar: demo.html?preset=dentista (etc.)
// ==========================================================================

// 1) Registra os 5 novos presets na lista (aparecem no painel)
window.SITE_PRESET_LIST.push.apply(window.SITE_PRESET_LIST, [
  { "id": "dentista", "nome": "Dentista", "icone": "D" },          // Dentista / clínica odontológica
  { "id": "veterinario", "nome": "Veterinário", "icone": "V" },   // Clínica veterinária
  { "id": "psicologo", "nome": "Psicólogo", "icone": "P" },       // Psicologia / terapia
  { "id": "nutricionista", "nome": "Nutricionista", "icone": "N" }, // Nutrição / dietética
  { "id": "arquiteto", "nome": "Arquiteto", "icone": "A" }        // Arquitetura e interiores
]);

// 2) Adiciona os dados completos de cada preset
Object.assign(window.SITE_PRESETS, {

  // ========================================================================
  // PRESET 1 — DENTISTA (Clínica Odontológica)
  // ========================================================================
  "dentista": {
    "brand": {                                                  // Identidade visual
      "name": "Sorriso Pleno",                                  // Nome da clínica
      "tagline": "Odontologia que cuida do seu sorriso",         // Slogan
      "logo": "assets/img/logo.svg",                            // Logo principal
      "logoDark": "assets/img/logo-white.svg",                   // Logo para fundo escuro
      "favicon": "assets/img/favicon.svg"                        // Ícone da aba
    },
    "theme": {                                                  // Cores e fontes
      "primary": "#0ea5e9",                                     // Azul principal
      "primaryDark": "#0369a1",                                 // Azul escuro (hover)
      "secondary": "#0f172a",                                   // Cor secundária (rodapé)
      "accent": "#f59e0b",                                      // Destaque (amarelo)
      "success": "#16a34a",                                     // Verde (sucesso)
      "error": "#dc2626",                                       // Vermelho (erro)
      "radius": "14px",                                         // Arredondamento padrão
      "fontHeading": "'Playfair Display', Georgia, serif",        // Fonte dos títulos
      "fontBody": "'Inter', system-ui, sans-serif"               // Fonte do corpo
    },
    "meta": {                                                   // SEO e compartilhamento
      "title": "Sorriso Pleno — Clínica Odontológica",          // Título da aba
      "description": "Clínica odontológica com equipe especializada. Limpeza, clareamento, implantes e ortodontia. Agende sua avaliação.", // Meta description
      "ogImage": "assets/img/fotos/dentista-consulta.jpg"                           // Imagem de compartilhamento
    },
    "nav": [                                                    // Menu de navegação
      { "label": "Início", "href": "#inicio" },                 // Link: Início
      { "label": "Tratamentos", "href": "#cardapio" },          // Link: Tratamentos
      { "label": "Sobre", "href": "#sobre" },                   // Link: Sobre
      { "label": "Galeria", "href": "#galeria" },               // Link: Galeria
      { "label": "Contato", "href": "#contato" }                // Link: Contato
    ],
    "hero": {                                                   // Seção hero (topo)
      "tag": "4.9 no Google · mais de 3.000 pacientes atendidos", // Selo do hero
      "title": "Seu sorriso merece cuidado de verdade",         // Título principal
      "subtitle": "Odontologia completa com equipe especializada. Avaliação inicial sem compromisso e plano de tratamento claro, sem surpresa no orçamento.", // Subtítulo
      "primaryCta": {                                           // Botão principal
        "label": "Agendar avaliação",                           // Texto do botão
        "href": "#contato"                                      // Destino do botão
      },
      "secondaryCta": {                                         // Botão secundário
        "label": "Ver tratamentos",                             // Texto do botão
        "href": "#cardapio"                                     // Destino do botão
      },
      "image": "assets/img/fotos/dentista-consulta.jpg" // Foto do hero
    },
    "stats": [                                                  // Números de destaque
      { "value": 3000, "suffix": "+", "label": "Pacientes atendidos" }, // Estatística 1
      { "value": 4.9, "suffix": "", "label": "Nota no Google" },        // Estatística 2
      { "value": 12, "suffix": "", "label": "Anos de clínica" },        // Estatística 3
      { "value": 6, "suffix": "", "label": "Especialistas" }             // Estatística 4
    ],
    "sections": {                                               // Títulos das seções
      "services": { "tag": "Tratamentos", "title": "O que cuidamos", "description": "Clique em qualquer card para ver a ficha completa: o que é, quanto dura, quanto custa e os cuidados depois." },
      "portfolio": { "tag": "Galeria", "title": "Odontologia e consultório", "description": "Imagens ilustrativas da clínica e dos tratamentos." },
      "about": { "tag": "Nossa história", "title": "Odontologia séria começa em 2012" },
      "contact": { "tag": "Agendamento", "title": "Agende sua avaliação", "description": "A primeira consulta é gratuita e sem compromisso. Escolha o melhor dia e horário para você." }
    },
    "services": [                                               // Lista de serviços/tratamentos
      { "icon": "star", "title": "Limpeza e profilaxia", "badge": "Mais pedido", "description": "Remoção de tártaro, polimento e aplicação de flúor.", "text": "Começamos com a remoção do tártaro com ultrassom, depois polimento com pasta abrasiva suave e finalizamos com flúor. A sessão dura em média 40 minutos e o resultado é visível na hora: dentes mais claros e gengiva mais saudável. Recomendamos repetir a cada 6 meses.", "price": "R$ 280", "image": "assets/img/fotos/dentista-consulta.jpg", "gallery": [], "features": ["Ultrassom", "Polimento", "Flúor", { "label": "Duração", "value": "40 minutos" }, { "label": "Intervalo", "value": "A cada 6 meses" }], "cta": { "label": "Agendar limpeza", "href": "#contato" } },
      { "icon": "star", "title": "Clareamento dental", "description": "Clareamento a laser ou caseiro supervisionado.", "text": "Trabalhamos com duas técnicas: a laser, em sessão única de 90 minutos, e a caseira supervisionada, com moldeira personalizada por 14 dias. O resultado médio é de 4 a 6 tons mais claros. Fazemos avaliação de sensibilidade antes de começar.", "price": "A partir de R$ 690", "image": "assets/img/fotos/dentista-exames.jpg", "gallery": [], "features": ["Laser ou caseiro", "Moldeira personalizada", "Avaliação de sensibilidade", { "label": "Duração", "value": "90 min (laser)" }, { "label": "Resultado", "value": "4 a 6 tons" }], "cta": { "label": "Agendar clareamento", "href": "#contato" } },
      { "icon": "heart", "title": "Implante dentário", "description": "Implante com planejamento digital e acompanhamento.", "text": "Fazemos o planejamento com tomografia e software 3D, o que permite instalar o implante com precisão milimétrica. O pós-operatório é acompanhado com retorno em 7 e 30 dias. Trabalhamos com implantes de titânio certificados.", "price": "A partir de R$ 2.800", "image": "assets/img/fotos/dentista-exames.jpg", "gallery": [], "features": ["Planejamento 3D", "Implante de titânio", "Acompanhamento pós-op", { "label": "Duração", "value": "1 a 2 horas" }, { "label": "Retorno", "value": "Em 7 e 30 dias" }], "cta": { "label": "Agendar avaliação de implante", "href": "#contato" } },
      { "icon": "star", "title": "Ortodontia", "description": "Aparelho fixo, móvel ou alinhador invisível.", "text": "Trabalhamos com aparelho fixo metálico, estético (safira) e alinhadores invisíveis. A primeira consulta inclui moldagem, fotos e planejamento do caso. O valor é fechado antes de começar e inclui todas as manutenções mensais.", "price": "A partir de R$ 3.200", "image": "assets/img/fotos/dentista-ortodontia.jpg", "gallery": [], "features": ["Fixo ou invisível", "Manutenção inclusa", "Planejamento do caso", { "label": "Manutenção", "value": "Mensal" }, { "label": "Duração", "value": "12 a 24 meses" }], "cta": { "label": "Agendar avaliação ortodôntica", "href": "#contato" } },
      { "icon": "heart", "title": "Tratamento de canal", "description": "Endodontia com microscópio e anestesia reforçada.", "text": "Usamos microscópio operatório para localizar canais acessórios que passam despercebidos. A anestesia é reforçada para que o procedimento seja indolor. Em 90% dos casos concluímos em uma única sessão.", "price": "A partir de R$ 900", "image": "assets/img/fotos/dentista-consulta.jpg", "gallery": [], "features": ["Microscópio operatório", "Anestesia reforçada", "Sessão única", { "label": "Duração", "value": "60 a 90 minutos" }, { "label": "Sessões", "value": "1 a 2" }], "cta": { "label": "Agendar tratamento de canal", "href": "#contato" } },
      { "icon": "star", "title": "Prótese dentária", "description": "Coroas, pontes e próteses sobre implante.", "text": "Trabalhamos com coroas de porcelana e zircônia, com cor selecionada em conjunto com você. O laboratório é parceiro e a peça é provada antes da cimentação final. Garantia de 2 anos sobre a prótese.", "price": "A partir de R$ 1.200", "image": "assets/img/fotos/dentista-consultorio.jpg", "gallery": [], "features": ["Porcelana ou zircônia", "Cor selecionada com você", "Garantia de 2 anos", { "label": "Prova", "value": "Antes da cimentação" }], "cta": { "label": "Agendar avaliação protética", "href": "#contato" } }
    ],
    "portfolio": [                                              // Galeria de fotos
      { "title": "Atendimento odontológico", "category": "Atendimento", "description": "Imagem ilustrativa de atendimento odontológico.", "image": "assets/img/fotos/dentista-consulta.jpg", "url": "#" },
      { "title": "Análise de exames", "category": "Exames", "description": "Imagem ilustrativa de análise de exames.", "image": "assets/img/fotos/dentista-exames.jpg", "url": "#" },
      { "title": "Ortodontia", "category": "Ortodontia", "description": "Imagem ilustrativa de ortodontia.", "image": "assets/img/fotos/dentista-ortodontia.jpg", "url": "#" },
      { "title": "Consultório", "category": "Estrutura", "description": "Imagem ilustrativa de consultório.", "image": "assets/img/fotos/dentista-consultorio.jpg", "url": "#" }
    ],
    "about": {                                                  // Seção sobre
      "tag": "Nossa história",
      "title": "Odontologia séria começa em 2012",
      "description": "A clínica nasceu com uma missão clara: odontologia não é achismo, é técnica. Doze anos depois, somos seis profissionais — entre dentistas, ortodontistas e protesistas — e seguimos com o mesmo princípio. Se não tem indicação para o seu caso, a gente fala. E se o tratamento é simples, a gente indica o simples. A confiança se constrói assim.",
      "image": "assets/img/fotos/dentista-consulta.jpg",
      "stats": [
        { "value": 12, "suffix": "", "label": "Anos de clínica" },
        { "value": 6, "suffix": "", "label": "Profissionais" },
        { "value": 4.9, "suffix": "", "label": "Nota no Google" }
      ],
      "cta": { "label": "Agendar avaliação", "href": "#contato" }
    },
    "contact": {                                                // Contato
      "tag": "Agendamento",
      "title": "Agende sua avaliação",
      "description": "A primeira consulta é gratuita e sem compromisso. Escolha o melhor dia e horário para você.",
      "phone": "(11) 3555-2020",
      "email": "contato@sorrisopleno.com.br",
      "whatsapp": "5511913131313",
      "address": "Av. Paulista, 1500, conj. 120 — São Paulo/SP",
      "hours": "Segunda a sexta, das 9h às 20h · Sábado, das 9h às 14h",
      "mapEmbed": "https://www.google.com/maps?q=Sao+Paulo&output=embed",
      "social": { "instagram": "#", "facebook": "#", "linkedin": "#", "github": "#" },
      "formMode": "whatsapp",
      "formWhatsTitle": "Novo agendamento pelo site",
      "formWhatsFooter": "Enviado pelo site",
      "formWhatsMsg": "Abrimos o WhatsApp com seu pedido escrito. É só tocar em enviar!",
      "formTitle": "Agendar avaliação gratuita",
      "formSubmit": "Confirmar horários",
      "formWhats": "Ou chame no WhatsApp",
      "formSuccess": "Agendamento recebido! Confirmamos o horário no WhatsApp em poucos minutos.",
      "formFields": [
        { "type": "text", "name": "nome", "label": "Nome", "placeholder": "Seu nome", "required": true, "half": true },
        { "type": "tel", "name": "telefone", "label": "WhatsApp", "placeholder": "(11) 99999-9999", "required": true, "half": true },
        { "type": "select", "name": "tratamento", "label": "Tratamento de interesse", "placeholder": "Escolha", "required": true, "half": true, "options": ["Limpeza", "Clareamento", "Implante", "Ortodontia", "Canal", "Prótese"] },
        { "type": "select", "name": "horario", "label": "Melhor horário", "placeholder": "Escolha", "required": true, "half": true, "options": ["Manhã (9h às 12h)", "Tarde (12h às 17h)", "Noite (17h às 20h)"] },
        { "type": "date", "name": "data", "label": "Data preferida", "required": true, "half": true },
        { "type": "email", "name": "email", "label": "E-mail", "placeholder": "seu@email.com", "required": false, "half": true },
        { "type": "textarea", "name": "observacoes", "label": "Observações", "placeholder": "Alergias, medicações em uso..." }
      ]
    },
    "footer": {                                                 // Rodapé
      "description": "Clínica odontológica com equipe especializada. Avaliação gratuita e plano de tratamento personalizado.",
      "credit": "© 2026 Sorriso Pleno. Todos os direitos reservados."
    }
  },

  // ========================================================================
  // PRESET 2 — VETERINÁRIO (Clínica Veterinária)
  // ========================================================================
  "veterinario": {
    "brand": {
      "name": "Pata & Cia",
      "tagline": "Clínica veterinária 24 horas",
      "logo": "assets/img/logo.svg",
      "logoDark": "assets/img/logo-white.svg",
      "favicon": "assets/img/favicon.svg"
    },
    "theme": {
      "primary": "#10b981",
      "primaryDark": "#059669",
      "secondary": "#064e3b",
      "accent": "#f59e0b",
      "success": "#16a34a",
      "error": "#dc2626",
      "radius": "16px",
      "fontHeading": "'Playfair Display', Georgia, serif",
      "fontBody": "'Inter', system-ui, sans-serif"
    },
    "meta": {
      "title": "Pata & Cia — Clínica Veterinária 24h",
      "description": "Clínica veterinária 24 horas. Consultas, vacinas, cirurgias e emergência. Cuidamos do seu pet como da nossa família.",
      "ogImage": "assets/img/fotos/veterinario-consulta.jpg"
    },
    "nav": [
      { "label": "Início", "href": "#inicio" },
      { "label": "Serviços", "href": "#cardapio" },
      { "label": "Sobre", "href": "#sobre" },
      { "label": "Galeria", "href": "#galeria" },
      { "label": "Contato", "href": "#contato" }
    ],
    "hero": {
      "tag": "4.9 no Google · atendimento 24 horas",
      "title": "Seu pet merece o melhor cuidado",
      "subtitle": "Clínica veterinária completa com equipe disponível 24 horas. Consultas, vacinas, cirurgias e emergência. Atendemos cães, gatos e animais exóticos.",
      "primaryCta": { "label": "Agendar consulta", "href": "#contato" },
      "secondaryCta": { "label": "Ver serviços", "href": "#cardapio" },
      "image": "assets/img/fotos/veterinario-consulta.jpg"
    },
    "stats": [
      { "value": 8000, "suffix": "+", "label": "Pets atendidos" },
      { "value": 4.9, "suffix": "", "label": "Nota no Google" },
      { "value": 24, "suffix": "h", "label": "Atendimento" },
      { "value": 5, "suffix": "", "label": "Veterinários" }
    ],
    "sections": {
      "services": { "tag": "Serviços", "title": "O que cuidamos", "description": "Clique em qualquer card para ver a ficha completa: o que é, quanto dura, quanto custa e os cuidados depois." },
      "portfolio": { "tag": "Galeria", "title": "Consultas e cuidados com pets", "description": "Imagens ilustrativas de consultas e cuidados com pets." },
      "about": { "tag": "Nossa história", "title": "Veterinária com amor desde 2015" },
      "contact": { "tag": "Agendamento", "title": "Agende a consulta", "description": "Atendimento 24 horas. Ligue ou chame no WhatsApp." }
    },
    "services": [
      { "icon": "heart", "title": "Consulta clínica", "badge": "Mais pedido", "description": "Avaliação completa com exame físico e histórico.", "text": "A consulta começa com anamnese detalhada, exame físico completo e, se necessário, exames complementares. Explicamos o diagnóstico e o plano de tratamento com clareza. Atendimento individual, sem pressa.", "price": "R$ 180", "image": "assets/img/fotos/veterinario-consulta.jpg", "gallery": [], "features": ["Anamnese completa", "Exame físico", "Plano de tratamento", { "label": "Duração", "value": "30 a 45 minutos" }], "cta": { "label": "Agendar consulta", "href": "#contato" } },
      { "icon": "star", "title": "Vacinação", "description": "Protocolo vacinal completo para cães e gatos.", "text": "Trabalhamos com vacinas importadas e nacionais de laboratórios certificados. O protocolo é personalizado conforme a idade, estilo de vida e histórico do animal. Emitimos carteirinha de vacinação digital.", "price": "A partir de R$ 90", "image": "assets/img/fotos/veterinario-gato.jpg", "gallery": [], "features": ["Vacinas importadas", "Protocolo personalizado", "Carteirinha digital", { "label": "Intervalo", "value": "Anual" }], "cta": { "label": "Agendar vacina", "href": "#contato" } },
      { "icon": "heart", "title": "Cirurgia", "description": "Cirurgias eletivas e de emergência.", "text": "Realizamos castração, remoção de tumores, cirurgias ortopédicas e procedimentos de emergência. Anestesia inalatória com monitoramento multiparamétrico. Retorno pós-operatório incluso.", "price": "A partir de R$ 600", "image": "assets/img/fotos/veterinario-consulta.jpg", "gallery": [], "features": ["Anestesia inalatória", "Monitoramento multiparamétrico", "Retorno incluso", { "label": "Internação", "value": "1 a 3 dias" }], "cta": { "label": "Agendar avaliação cirúrgica", "href": "#contato" } },
      { "icon": "star", "title": "Exames laboratoriais", "description": "Hemograma, bioquímica e exames de imagem.", "text": "Coletamos sangue, urina e fezes no próprio consultório. Resultados em até 24 horas. Trabalhamos com laboratório de referência para exames de imagem e histopatologia.", "price": "A partir de R$ 120", "image": "assets/img/fotos/veterinario-consulta.jpg", "gallery": [], "features": ["Coleta no consultório", "Resultado em 24h", "Laboratório de referência", { "label": "Tipos", "value": "Sangue, urina, imagem" }], "cta": { "label": "Agendar exame", "href": "#contato" } },
      { "icon": "heart", "title": "Emergência 24h", "description": "Atendimento de urgência a qualquer hora.", "text": "Equipe disponível 24 horas para emergências. Estabilização, medicação e, se necessário, internação em UTI veterinária. Ligue antes de sair de casa para prepararmos a sala.", "price": "A partir de R$ 250", "image": "assets/img/fotos/veterinario-consulta.jpg", "gallery": [], "features": ["Equipe 24h", "UTI veterinária", "Estabilização imediata", { "label": "Atendimento", "value": "Imediato" }], "cta": { "label": "Ligar agora", "href": "#contato" } },
      { "icon": "star", "title": "Banho e tosa", "description": "Banho, tosa higiênica e tosa completa.", "text": "Banho com shampoo específico para o tipo de pelagem, tosa higiênica e tosa completa. Usamos secador profissional e produtos hipoalergênicos. O pet sai cheiroso e feliz.", "price": "A partir de R$ 60", "image": "assets/img/fotos/veterinario-cachorro.jpg", "gallery": [], "features": ["Shampoo específico", "Tosa higiênica", "Produtos hipoalergênicos", { "label": "Duração", "value": "1 a 2 horas" }], "cta": { "label": "Agendar banho e tosa", "href": "#contato" } }
    ],
    "portfolio": [
      { "title": "Consulta veterinária", "category": "Consulta", "description": "Imagem ilustrativa de consulta veterinária.", "image": "assets/img/fotos/veterinario-consulta.jpg", "url": "#" },
      { "title": "Cães em destaque", "category": "Cães", "description": "Imagem ilustrativa de cães em destaque.", "image": "assets/img/fotos/veterinario-cao.jpg", "url": "#" },
      { "title": "Cuidados com pets", "category": "Cuidados", "description": "Imagem ilustrativa de cuidados com pets.", "image": "assets/img/fotos/veterinario-pet.jpg", "url": "#" },
      { "title": "Gatos e filhotes", "category": "Gatos", "description": "Imagem ilustrativa de gatos e filhotes.", "image": "assets/img/fotos/veterinario-gato.jpg", "url": "#" }
    ],
    "about": {
      "tag": "Nossa história",
      "title": "Veterinária com amor desde 2015",
      "description": "A clínica nasceu da vontade de oferecer um atendimento veterinário que tratasse o pet como membro da família. Nove anos depois, somos cinco veterinários — entre clínicos, cirurgiões e especialistas em animais exóticos — e seguimos com o mesmo princípio: se não tem indicação, a gente fala. E se o tratamento é simples, a gente indica o simples. A confiança se constrói assim.",
      "image": "assets/img/fotos/veterinario-consulta.jpg",
      "stats": [
        { "value": 9, "suffix": "", "label": "Anos de clínica" },
        { "value": 5, "suffix": "", "label": "Veterinários" },
        { "value": 4.9, "suffix": "", "label": "Nota no Google" }
      ],
      "cta": { "label": "Agendar consulta", "href": "#contato" }
    },
    "contact": {
      "tag": "Agendamento",
      "title": "Agende a consulta",
      "description": "Atendimento 24 horas. Ligue ou chame no WhatsApp.",
      "phone": "(11) 3555-2020",
      "email": "contato@pataecia.com.br",
      "whatsapp": "5511913131313",
      "address": "Rua das Flores, 450 — São Paulo/SP",
      "hours": "Atendimento 24 horas, todos os dias",
      "mapEmbed": "https://www.google.com/maps?q=Sao+Paulo&output=embed",
      "social": { "instagram": "#", "facebook": "#", "linkedin": "#", "github": "#" },
      "formMode": "whatsapp",
      "formWhatsTitle": "Novo agendamento pelo site",
      "formWhatsFooter": "Enviado pelo site",
      "formWhatsMsg": "Abrimos o WhatsApp com seu pedido escrito. É só tocar em enviar!",
      "formTitle": "Agendar consulta",
      "formSubmit": "Confirmar horário",
      "formWhats": "Ou chame no WhatsApp",
      "formSuccess": "Agendamento recebido! Confirmamos o horário no WhatsApp em poucos minutos.",
      "formFields": [
        { "type": "text", "name": "nome", "label": "Nome", "placeholder": "Seu nome", "required": true, "half": true },
        { "type": "tel", "name": "telefone", "label": "WhatsApp", "placeholder": "(11) 99999-9999", "required": true, "half": true },
        { "type": "select", "name": "servico", "label": "Serviço", "placeholder": "Escolha", "required": true, "half": true, "options": ["Consulta clínica", "Vacinação", "Cirurgia", "Exames", "Emergência", "Banho e tosa"] },
        { "type": "select", "name": "horario", "label": "Melhor horário", "placeholder": "Escolha", "required": true, "half": true, "options": ["Manhã (9h às 12h)", "Tarde (12h às 17h)", "Noite (17h às 20h)"] },
        { "type": "date", "name": "data", "label": "Data preferida", "required": true, "half": true },
        { "type": "email", "name": "email", "label": "E-mail", "placeholder": "seu@email.com", "required": false, "half": true },
        { "type": "textarea", "name": "observacoes", "label": "Observações", "placeholder": "Raça, idade, sintomas..." }
      ]
    },
    "footer": {
      "description": "Clínica veterinária 24 horas. Cuidamos do seu pet como da nossa família.",
      "credit": "© 2026 Pata & Cia. Todos os direitos reservados."
    }
  },
  // (continua nos próximos presets abaixo)
  // ========================================================================
  // PRESET 3 — PSICÓLOGO (Psicologia / Terapia)
  // ========================================================================
  "psicologo": {
    "brand": {
      "name": "Mente Clara",
      "tagline": "Psicologia clínica e terapia online",
      "logo": "assets/img/logo.svg",
      "logoDark": "assets/img/logo-white.svg",
      "favicon": "assets/img/favicon.svg"
    },
    "theme": {
      "primary": "#8b5cf6",
      "primaryDark": "#7c3aed",
      "secondary": "#1e1b4b",
      "accent": "#f59e0b",
      "success": "#16a34a",
      "error": "#dc2626",
      "radius": "16px",
      "fontHeading": "'Playfair Display', Georgia, serif",
      "fontBody": "'Inter', system-ui, sans-serif"
    },
    "meta": {
      "title": "Mente Clara — Psicologia Clínica",
      "description": "Psicologia clínica para adultos, adolescentes e casais. Atendimento presencial e online. Agende sua primeira sessão.",
      "ogImage": "assets/img/fotos/psicologia-consulta.jpg"
    },
    "nav": [
      { "label": "Início", "href": "#inicio" },
      { "label": "Abordagens", "href": "#cardapio" },
      { "label": "Sobre", "href": "#sobre" },
      { "label": "Galeria", "href": "#galeria" },
      { "label": "Contato", "href": "#contato" }
    ],
    "hero": {
      "tag": "4.9 no Google · atendimento online e presencial",
      "title": "Cuidar da mente é o primeiro passo",
      "subtitle": "Psicologia clínica com escuta atenta e sem julgamento. Atendimento presencial e online para adultos, adolescentes e casais. A primeira sessão é de acolhimento.",
      "primaryCta": { "label": "Agendar primeira sessão", "href": "#contato" },
      "secondaryCta": { "label": "Conhecer as abordagens", "href": "#cardapio" },
      "image": "assets/img/fotos/psicologia-consulta.jpg"
    },
    "stats": [
      { "value": 1500, "suffix": "+", "label": "Pacientes atendidos" },
      { "value": 4.9, "suffix": "", "label": "Nota no Google" },
      { "value": 8, "suffix": "", "label": "Anos de prática" },
      { "value": 3, "suffix": "", "label": "Abordagens" }
    ],
    "sections": {
      "services": { "tag": "Abordagens", "title": "Como trabalhamos", "description": "Clique em qualquer card para ver a ficha completa: o que é, quanto dura, quanto custa e os cuidados depois." },
      "portfolio": { "tag": "Galeria", "title": "Escuta e acolhimento", "description": "Imagens ilustrativas do atendimento psicológico; as pessoas retratadas não são pacientes da clínica." },
      "about": { "tag": "Nossa história", "title": "Psicologia com escuta e técnica" },
      "contact": { "tag": "Agendamento", "title": "Agende sua primeira sessão", "description": "A primeira sessão é de acolhimento, sem compromisso. Escolha o melhor dia e horário para você." }
    },
    "services": [
      { "icon": "heart", "title": "Terapia individual", "badge": "Mais pedido", "description": "Sessões individuais para adultos e adolescentes.", "text": "A terapia individual é um espaço de escuta e reflexão. Trabalhamos com técnicas baseadas em evidência, adaptadas à sua história e aos seus objetivos. As sessões duram 50 minutos e acontecem semanalmente ou quinzenalmente.", "price": "R$ 180", "image": "assets/img/fotos/psicologia-consulta.jpg", "gallery": [], "features": ["Escuta atenta", "Técnicas baseadas em evidência", "Plano personalizado", { "label": "Duração", "value": "50 minutos" }, { "label": "Frequência", "value": "Semanal ou quinzenal" }], "cta": { "label": "Agendar terapia individual", "href": "#contato" } },
      { "icon": "users", "title": "Terapia de casal", "description": "Acompanhamento para casais em crise ou transição.", "text": "A terapia de casal trabalha a comunicação, a resolução de conflitos e a reconstrução da intimidade. As sessões são conduzidas com os dois parceiros presentes e, quando necessário, com sessões individuais complementares.", "price": "R$ 220", "image": "assets/img/fotos/psicologia-grupo.jpg", "gallery": [], "features": ["Comunicação e conflito", "Sessões conjuntas", "Sessões individuais complementares", { "label": "Duração", "value": "60 minutos" }, { "label": "Frequência", "value": "Quinzenal" }], "cta": { "label": "Agendar terapia de casal", "href": "#contato" } },
      { "icon": "star", "title": "Terapia para adolescentes", "description": "Acolhimento para jovens em fase de mudanças.", "text": "Trabalhamos com adolescentes de 12 a 18 anos em temas como ansiedade, depressão, autoestima, bullying e orientação vocacional. As sessões são conduzidas com respeito à autonomia do jovem, com devolutiva aos pais quando autorizado.", "price": "R$ 160", "image": "assets/img/fotos/psicologia-dialogo.jpg", "gallery": [], "features": ["12 a 18 anos", "Ansiedade e depressão", "Orientação vocacional", { "label": "Duração", "value": "50 minutos" }, { "label": "Devolutiva aos pais", "value": "Quando autorizado" }], "cta": { "label": "Agendar terapia adolescente", "href": "#contato" } },
      { "icon": "heart", "title": "Terapia online", "description": "Atendimento por videochamada, de onde você estiver.", "text": "A terapia online tem a mesma eficácia da presencial. Usamos plataforma segura e criptografada. Ideal para quem tem agenda cheia, mora longe ou prefere o conforto de casa. Enviamos o link 15 minutos antes da sessão.", "price": "R$ 180", "image": "assets/img/fotos/psicologia-escuta.jpg", "gallery": [], "features": ["Plataforma segura", "Mesma eficácia", "Link enviado antes", { "label": "Duração", "value": "50 minutos" }, { "label": "Formato", "value": "Videochamada" }], "cta": { "label": "Agendar terapia online", "href": "#contato" } },
      { "icon": "star", "title": "Orientação parental", "description": "Apoio a pais e cuidadores.", "text": "A orientação parental ajuda a entender o comportamento da criança e a construir estratégias de convivência. São sessões com os pais, sem a presença da criança, focadas em orientação e acolhimento.", "price": "R$ 200", "image": "assets/img/fotos/psicologia-dialogo.jpg", "gallery": [], "features": ["Sessões com os pais", "Estratégias de convivência", "Acolhimento", { "label": "Duração", "value": "60 minutos" }, { "label": "Frequência", "value": "Quinzenal" }], "cta": { "label": "Agendar orientação parental", "href": "#contato" } },
      { "icon": "heart", "title": "Avaliação psicológica", "description": "Avaliação com testes e laudo.", "text": "Avaliação psicológica com bateria de testes padronizados, entrevista clínica e laudo. Indicada para diagnóstico, orientação profissional e processos seletivos. O laudo é entregue em até 15 dias.", "price": "A partir de R$ 400", "image": "assets/img/fotos/psicologia-consulta.jpg", "gallery": [], "features": ["Testes padronizados", "Entrevista clínica", "Laudo em 15 dias", { "label": "Duração", "value": "2 a 4 sessões" }], "cta": { "label": "Agendar avaliação", "href": "#contato" } }
    ],
    "portfolio": [
      { "title": "Atendimento individual", "category": "Atendimento", "description": "Imagem ilustrativa de atendimento individual.", "image": "assets/img/fotos/psicologia-consulta.jpg", "url": "#" },
      { "title": "Escuta e acolhimento", "category": "Acolhimento", "description": "Imagem ilustrativa de escuta e acolhimento.", "image": "assets/img/fotos/psicologia-escuta.jpg", "url": "#" },
      { "title": "Conversa em grupo", "category": "Terapia", "description": "Imagem ilustrativa de conversa em grupo.", "image": "assets/img/fotos/psicologia-grupo.jpg", "url": "#" },
      { "title": "Diálogo terapêutico", "category": "Atendimento", "description": "Imagem ilustrativa de diálogo terapêutico.", "image": "assets/img/fotos/psicologia-dialogo.jpg", "url": "#" }
    ],
    "about": {
      "tag": "Nossa história",
      "title": "Psicologia com escuta e técnica",
      "description": "A clínica nasceu da vontade de oferecer um espaço de escuta sem julgamento, onde a pessoa pudesse ser ela mesma. Oito anos depois, somos três psicólogos — entre clínicos, terapeutas de casal e especialistas em adolescentes — e seguimos com o mesmo princípio: se não tem indicação para o seu caso, a gente fala. E se o tratamento é simples, a gente indica o simples. A confiança se constrói assim.",
      "image": "assets/img/fotos/psicologia-escuta.jpg",
      "stats": [
        { "value": 8, "suffix": "", "label": "Anos de prática" },
        { "value": 3, "suffix": "", "label": "Psicólogos" },
        { "value": 4.9, "suffix": "", "label": "Nota no Google" }
      ],
      "cta": { "label": "Agendar primeira sessão", "href": "#contato" }
    },
    "contact": {
      "tag": "Agendamento",
      "title": "Agende sua primeira sessão",
      "description": "A primeira sessão é de acolhimento, sem compromisso. Escolha o melhor dia e horário para você.",
      "phone": "(11) 3555-2020",
      "email": "contato@menteclara.com.br",
      "whatsapp": "5511913131313",
      "address": "Rua Augusta, 1500, sala 120 — São Paulo/SP",
      "hours": "Segunda a sexta, das 8h às 20h · Sábado, das 9h às 13h",
      "mapEmbed": "https://www.google.com/maps?q=Sao+Paulo&output=embed",
      "social": { "instagram": "#", "facebook": "#", "linkedin": "#", "github": "#" },
      "formMode": "whatsapp",
      "formWhatsTitle": "Novo agendamento pelo site",
      "formWhatsFooter": "Enviado pelo site",
      "formWhatsMsg": "Abrimos o WhatsApp com seu pedido escrito. É só tocar em enviar!",
      "formTitle": "Agendar primeira sessão",
      "formSubmit": "Confirmar horário",
      "formWhats": "Ou chame no WhatsApp",
      "formSuccess": "Agendamento recebido! Confirmamos o horário no WhatsApp em poucos minutos.",
      "formFields": [
        { "type": "text", "name": "nome", "label": "Nome", "placeholder": "Seu nome", "required": true, "half": true },
        { "type": "tel", "name": "telefone", "label": "WhatsApp", "placeholder": "(11) 99999-9999", "required": true, "half": true },
        { "type": "select", "name": "servico", "label": "Tipo de atendimento", "placeholder": "Escolha", "required": true, "half": true, "options": ["Terapia individual", "Terapia de casal", "Terapia adolescente", "Terapia online", "Orientação parental", "Avaliação psicológica"] },
        { "type": "select", "name": "horario", "label": "Melhor horário", "placeholder": "Escolha", "required": true, "half": true, "options": ["Manhã (8h às 12h)", "Tarde (12h às 17h)", "Noite (17h às 20h)"] },
        { "type": "date", "name": "data", "label": "Data preferida", "required": true, "half": true },
        { "type": "email", "name": "email", "label": "E-mail", "placeholder": "seu@email.com", "required": false, "half": true },
        { "type": "textarea", "name": "observacoes", "label": "Observações", "placeholder": "O que te trouxe à terapia..." }
      ]
    },
    "footer": {
      "description": "Psicologia clínica para adultos, adolescentes e casais. Atendimento presencial e online.",
      "credit": "© 2026 Mente Clara. Todos os direitos reservados."
    }
  },

  // ========================================================================
  // PRESET 4 — NUTRICIONISTA
  // ========================================================================
  "nutricionista": {
    "brand": {
      "name": "Viva Leve",
      "tagline": "Nutrição clínica e esportiva",
      "logo": "assets/img/logo.svg",
      "logoDark": "assets/img/logo-white.svg",
      "favicon": "assets/img/favicon.svg"
    },
    "theme": {
      "primary": "#22c55e",
      "primaryDark": "#16a34a",
      "secondary": "#14532d",
      "accent": "#f59e0b",
      "success": "#16a34a",
      "error": "#dc2626",
      "radius": "16px",
      "fontHeading": "'Playfair Display', Georgia, serif",
      "fontBody": "'Inter', system-ui, sans-serif"
    },
    "meta": {
      "title": "Viva Leve — Nutrição Clínica e Esportiva",
      "description": "Nutricionista clínica e esportiva. Emagrecimento, ganho de massa, reeducação alimentar. Consulta presencial e online.",
      "ogImage": "assets/img/fotos/nutricao-refeicao.jpg"
    },
    "nav": [
      { "label": "Início", "href": "#inicio" },
      { "label": "Planos", "href": "#cardapio" },
      { "label": "Sobre", "href": "#sobre" },
      { "label": "Galeria", "href": "#galeria" },
      { "label": "Contato", "href": "#contato" }
    ],
    "hero": {
      "tag": "4.9 no Google · mais de 2.000 pacientes",
      "title": "Comer bem é viver melhor",
      "subtitle": "Nutrição clínica e esportiva com plano alimentar personalizado. Emagrecimento, ganho de massa, reeducação alimentar e nutrição para gestantes. Atendimento presencial e online.",
      "primaryCta": { "label": "Agendar consulta", "href": "#contato" },
      "secondaryCta": { "label": "Ver os planos", "href": "#cardapio" },
      "image": "assets/img/fotos/nutricao-refeicao.jpg"
    },
    "stats": [
      { "value": 2000, "suffix": "+", "label": "Pacientes atendidos" },
      { "value": 4.9, "suffix": "", "label": "Nota no Google" },
      { "value": 6, "suffix": "", "label": "Anos de prática" },
      { "value": 4, "suffix": "", "label": "Especialidades" }
    ],
    "sections": {
      "services": { "tag": "Planos", "title": "Como podemos ajudar", "description": "Clique em qualquer card para ver a ficha completa: o que é, quanto dura, quanto custa e os cuidados depois." },
      "portfolio": { "tag": "Galeria", "title": "Alimentação equilibrada", "description": "Imagens ilustrativas de alimentação equilibrada; não representam resultados de pacientes." },
      "about": { "tag": "Nossa história", "title": "Nutrição com ciência e afeto" },
      "contact": { "tag": "Agendamento", "title": "Agende sua consulta", "description": "A primeira consulta é de avaliação, sem compromisso. Escolha o melhor dia e horário para você." }
    },
    "services": [
      { "icon": "star", "title": "Emagrecimento", "badge": "Mais pedido", "description": "Plano alimentar para perda de peso saudável.", "text": "Avaliação completa com bioimpedância, anamnese alimentar e definição de metas realistas. O plano é personalizado e ajustado a cada retorno. Acompanhamento quinzenal para manter o resultado.", "price": "R$ 220", "image": "assets/img/fotos/nutricao-refeicao.jpg", "gallery": [], "features": ["Bioimpedância", "Plano personalizado", "Acompanhamento quinzenal", { "label": "Duração", "value": "60 minutos" }, { "label": "Retorno", "value": "Quinzenal" }], "cta": { "label": "Agendar consulta de emagrecimento", "href": "#contato" } },
      { "icon": "star", "title": "Ganho de massa", "description": "Nutrição para hipertrofia e performance.", "text": "Plano alimentar com superávit calórico calculado, distribuição de macros e timing de nutrientes. Ideal para quem treina e quer ganhar massa muscular sem gordura excessiva. Acompanhamento mensal.", "price": "R$ 220", "image": "assets/img/fotos/nutricao-prato.jpg", "gallery": [], "features": ["Superávit calórico", "Distribuição de macros", "Timing de nutrientes", { "label": "Duração", "value": "60 minutos" }, { "label": "Acompanhamento", "value": "Mensal" }], "cta": { "label": "Agendar consulta de ganho de massa", "href": "#contato" } },
      { "icon": "heart", "title": "Reeducação alimentar", "description": "Mudança de hábitos sem dieta restritiva.", "text": "Trabalhamos a relação com a comida, não só a comida. A reeducação alimentar ensina a comer de tudo, com equilíbrio e sem culpa. Ideal para quem já tentou várias dietas e não sustentou.", "price": "R$ 200", "image": "assets/img/fotos/nutricao-ingredientes.jpg", "gallery": [], "features": ["Sem dieta restritiva", "Mudança de hábitos", "Relação com a comida", { "label": "Duração", "value": "60 minutos" }, { "label": "Frequência", "value": "Quinzenal" }], "cta": { "label": "Agendar reeducação alimentar", "href": "#contato" } },
      { "icon": "star", "title": "Nutrição esportiva", "description": "Performance para atletas e praticantes.", "text": "Plano alimentar para atletas e praticantes de atividade física. Inclui periodização nutricional, suplementação e hidratação. Trabalhamos com corrida, musculação, crossfit e esportes de equipe.", "price": "R$ 240", "image": "assets/img/fotos/nutricao-salada.jpg", "gallery": [], "features": ["Periodização nutricional", "Suplementação", "Hidratação", { "label": "Duração", "value": "60 minutos" }, { "label": "Acompanhamento", "value": "Mensal" }], "cta": { "label": "Agendar nutrição esportiva", "href": "#contato" } },
      { "icon": "heart", "title": "Nutrição para gestantes", "description": "Acompanhamento na gestação e pós-parto.", "text": "Acompanhamento nutricional durante a gestação e no pós-parto. Garantimos nutrição adequada para mãe e bebê, com foco em ganho de peso saudável, controle de enjoos e amamentação.", "price": "R$ 220", "image": "assets/img/fotos/nutricao-prato.jpg", "gallery": [], "features": ["Gestação e pós-parto", "Ganho de peso saudável", "Amamentação", { "label": "Duração", "value": "60 minutos" }, { "label": "Frequência", "value": "Mensal" }], "cta": { "label": "Agendar nutrição gestacional", "href": "#contato" } },
      { "icon": "star", "title": "Nutrição clínica", "description": "Doenças crônicas e condições especiais.", "text": "Acompanhamento nutricional para diabetes, hipertensão, dislipidemia, síndrome do intestino irritável e outras condições. Plano alimentar adaptado à medicação e ao estilo de vida.", "price": "R$ 240", "image": "assets/img/fotos/nutricao-ingredientes.jpg", "gallery": [], "features": ["Doenças crônicas", "Plano adaptado", "Acompanhamento médico", { "label": "Duração", "value": "60 minutos" }, { "label": "Frequência", "value": "Mensal" }], "cta": { "label": "Agendar nutrição clínica", "href": "#contato" } }
    ],
    "portfolio": [
      { "title": "Refeição equilibrada", "category": "Refeições", "description": "Imagem ilustrativa de refeição equilibrada.", "image": "assets/img/fotos/nutricao-refeicao.jpg", "url": "#" },
      { "title": "Alimentos frescos", "category": "Ingredientes", "description": "Imagem ilustrativa de alimentos frescos.", "image": "assets/img/fotos/nutricao-ingredientes.jpg", "url": "#" },
      { "title": "Planejamento de refeições", "category": "Refeições", "description": "Imagem ilustrativa de planejamento de refeições.", "image": "assets/img/fotos/nutricao-salada.jpg", "url": "#" },
      { "title": "Prato colorido", "category": "Refeições", "description": "Imagem ilustrativa de prato colorido.", "image": "assets/img/fotos/nutricao-prato.jpg", "url": "#" }
    ],
    "about": {
      "tag": "Nossa história",
      "title": "Nutrição com ciência e afeto",
      "description": "A clínica nasceu da vontade de oferecer uma nutrição que não fosse sobre restrição, mas sobre escolha consciente. Seis anos depois, somos três nutricionistas — entre clínicos, esportivos e especialistas em gestação — e seguimos com o mesmo princípio: se não tem indicação para o seu caso, a gente fala. E se o tratamento é simples, a gente indica o simples. A confiança se constrói assim.",
      "image": "assets/img/fotos/nutricao-ingredientes.jpg",
      "stats": [
        { "value": 6, "suffix": "", "label": "Anos de prática" },
        { "value": 3, "suffix": "", "label": "Nutricionistas" },
        { "value": 4.9, "suffix": "", "label": "Nota no Google" }
      ],
      "cta": { "label": "Agendar consulta", "href": "#contato" }
    },
    "contact": {
      "tag": "Agendamento",
      "title": "Agende sua consulta",
      "description": "A primeira consulta é de avaliação, sem compromisso. Escolha o melhor dia e horário para você.",
      "phone": "(11) 3555-2020",
      "email": "contato@vivaleve.com.br",
      "whatsapp": "5511913131313",
      "address": "Rua Oscar Freire, 1500, sala 120 — São Paulo/SP",
      "hours": "Segunda a sexta, das 8h às 20h · Sábado, das 9h às 13h",
      "mapEmbed": "https://www.google.com/maps?q=Sao+Paulo&output=embed",
      "social": { "instagram": "#", "facebook": "#", "linkedin": "#", "github": "#" },
      "formMode": "whatsapp",
      "formWhatsTitle": "Novo agendamento pelo site",
      "formWhatsFooter": "Enviado pelo site",
      "formWhatsMsg": "Abrimos o WhatsApp com seu pedido escrito. É só tocar em enviar!",
      "formTitle": "Agendar consulta",
      "formSubmit": "Confirmar horário",
      "formWhats": "Ou chame no WhatsApp",
      "formSuccess": "Agendamento recebido! Confirmamos o horário no WhatsApp em poucos minutos.",
      "formFields": [
        { "type": "text", "name": "nome", "label": "Nome", "placeholder": "Seu nome", "required": true, "half": true },
        { "type": "tel", "name": "telefone", "label": "WhatsApp", "placeholder": "(11) 99999-9999", "required": true, "half": true },
        { "type": "select", "name": "servico", "label": "Objetivo", "placeholder": "Escolha", "required": true, "half": true, "options": ["Emagrecimento", "Ganho de massa", "Reeducação alimentar", "Nutrição esportiva", "Nutrição gestacional", "Nutrição clínica"] },
        { "type": "select", "name": "horario", "label": "Melhor horário", "placeholder": "Escolha", "required": true, "half": true, "options": ["Manhã (8h às 12h)", "Tarde (12h às 17h)", "Noite (17h às 20h)"] },
        { "type": "date", "name": "data", "label": "Data preferida", "required": true, "half": true },
        { "type": "email", "name": "email", "label": "E-mail", "placeholder": "seu@email.com", "required": false, "half": true },
        { "type": "textarea", "name": "observacoes", "label": "Observações", "placeholder": "Alergias, restrições, objetivos..." }
      ]
    },
    "footer": {
      "description": "Nutrição clínica e esportiva. Emagrecimento, ganho de massa e reeducação alimentar.",
      "credit": "© 2026 Viva Leve. Todos os direitos reservados."
    }
  },
  // (continua no próximo preset)
  // ========================================================================
  // PRESET 5 — ARQUITETO (Arquitetura e Interiores)
  // ========================================================================
  "arquiteto": {
    "brand": {
      "name": "Casa & Forma",
      "tagline": "Arquitetura e design de interiores",
      "logo": "assets/img/logo.svg",
      "logoDark": "assets/img/logo-white.svg",
      "favicon": "assets/img/favicon.svg"
    },
    "theme": {
      "primary": "#78716c",
      "primaryDark": "#57534e",
      "secondary": "#1c1917",
      "accent": "#f59e0b",
      "success": "#16a34a",
      "error": "#dc2626",
      "radius": "8px",
      "fontHeading": "'Playfair Display', Georgia, serif",
      "fontBody": "'Inter', system-ui, sans-serif"
    },
    "meta": {
      "title": "Casa & Forma — Arquitetura e Interiores",
      "description": "Arquitetura e design de interiores. Projetos residenciais e comerciais, do estudo preliminar à entrega da obra.",
      "ogImage": "assets/img/fotos/arquiteto-residencia.jpg"
    },
    "nav": [
      { "label": "Início", "href": "#inicio" },
      { "label": "Projetos", "href": "#cardapio" },
      { "label": "Sobre", "href": "#sobre" },
      { "label": "Galeria", "href": "#galeria" },
      { "label": "Contato", "href": "#contato" }
    ],
    "hero": {
      "tag": "4.9 no Google · mais de 120 projetos entregues",
      "title": "Seu espaço, do seu jeito",
      "subtitle": "Arquitetura e design de interiores com projeto completo: do estudo preliminar à entrega da obra. Residencial, comercial e corporativo.",
      "primaryCta": { "label": "Falar com a arquiteta", "href": "#contato" },
      "secondaryCta": { "label": "Ver os projetos", "href": "#cardapio" },
      "image": "assets/img/fotos/arquiteto-residencia.jpg"
    },
    "stats": [
      { "value": 120, "suffix": "+", "label": "Projetos entregues" },
      { "value": 4.9, "suffix": "", "label": "Nota no Google" },
      { "value": 9, "suffix": "", "label": "Anos de escritório" },
      { "value": 3, "suffix": "", "label": "Arquitetas" }
    ],
    "sections": {
      "services": { "tag": "Serviços", "title": "O que fazemos", "description": "Clique em qualquer card para ver a ficha completa: o que é, quanto dura, quanto custa e os cuidados depois." },
      "portfolio": { "tag": "Galeria", "title": "Inspirações de arquitetura", "description": "Imagens ilustrativas de projetos e ambientes; trabalhos reais requerem fotos autorizadas." },
      "about": { "tag": "Nossa história", "title": "Arquitetura com escuta e técnica" },
      "contact": { "tag": "Contato", "title": "Vamos conversar sobre seu projeto", "description": "A primeira reunião é gratuita e sem compromisso. Conta pra gente o que você imagina." }
    },
    "services": [
      { "icon": "star", "title": "Projeto residencial", "badge": "Mais pedido", "description": "Casa ou apartamento do estudo preliminar à entrega.", "text": "Projeto completo de arquitetura residencial: estudo preliminar, anteprojeto, projeto legal, projeto executivo e acompanhamento de obra. Entregamos em 3D e com especificação de materiais.", "price": "A partir de R$ 8.000", "image": "assets/img/fotos/arquiteto-residencia.jpg", "gallery": [], "features": ["Estudo preliminar", "Projeto 3D", "Projeto executivo", "Acompanhamento de obra", { "label": "Prazo", "value": "60 a 90 dias" }], "cta": { "label": "Solicitar orçamento", "href": "#contato" } },
      { "icon": "star", "title": "Design de interiores", "description": "Ambientes planejados com personalidade.", "text": "Projeto de interiores completo: layout, especificação de móveis, iluminação, revestimentos e decoração. Entregamos em 3D fotorrealista e com lista de compras. Acompanhamos a execução.", "price": "A partir de R$ 5.000", "image": "assets/img/fotos/arquiteto-interiores.jpg", "gallery": [], "features": ["Layout e 3D", "Especificação de móveis", "Lista de compras", "Acompanhamento", { "label": "Prazo", "value": "30 a 60 dias" }], "cta": { "label": "Solicitar orçamento", "href": "#contato" } },
      { "icon": "heart", "title": "Projeto comercial", "description": "Lojas, escritórios e restaurantes.", "text": "Projeto de arquitetura comercial com foco em experiência do cliente e funcionalidade. Trabalhamos com lojas, escritórios, restaurantes e clínicas. Inclui projeto de acessibilidade e AVCB quando necessário.", "price": "A partir de R$ 10.000", "image": "assets/img/fotos/arquiteto-escritorio.jpg", "gallery": [], "features": ["Experiência do cliente", "Acessibilidade", "AVCB", { "label": "Prazo", "value": "60 a 120 dias" }], "cta": { "label": "Solicitar orçamento", "href": "#contato" } },
      { "icon": "star", "title": "Reforma e retrofit", "description": "Transformação de ambientes existentes.", "text": "Reforma completa ou parcial de ambientes existentes. Avaliamos a estrutura, propomos soluções e acompanhamos a execução. Ideal para quem quer renovar sem reconstruir.", "price": "A partir de R$ 4.000", "image": "assets/img/fotos/imovel-4.jpg", "gallery": [], "features": ["Avaliação estrutural", "Soluções criativas", "Acompanhamento", { "label": "Prazo", "value": "30 a 60 dias" }], "cta": { "label": "Solicitar orçamento", "href": "#contato" } },
      { "icon": "heart", "title": "Consultoria de decoração", "description": "Orientação para quem quer fazer sozinho.", "text": "Consultoria pontual para quem quer decorar sozinho mas precisa de direção. Inclui visita técnica, moodboard, lista de compras e orientação de layout. Ideal para quem tem orçamento enxuto.", "price": "R$ 800", "image": "assets/img/fotos/arquiteto-interiores.jpg", "gallery": [], "features": ["Visita técnica", "Moodboard", "Lista de compras", { "label": "Duração", "value": "2 a 4 horas" }], "cta": { "label": "Agendar consultoria", "href": "#contato" } },
      { "icon": "star", "title": "Projeto luminotécnico", "description": "Iluminação que valoriza o ambiente.", "text": "Projeto de iluminação com cálculo de lux, especificação de luminárias e automação. Transforma o ambiente e economiza energia. Pode ser feito isolado ou integrado ao projeto de interiores.", "price": "A partir de R$ 2.500", "image": "assets/img/fotos/arquiteto-planejamento.jpg", "gallery": [], "features": ["Cálculo de lux", "Especificação de luminárias", "Automação", { "label": "Prazo", "value": "15 a 30 dias" }], "cta": { "label": "Solicitar projeto luminotécnico", "href": "#contato" } }
    ],
    "portfolio": [
      { "title": "Residência contemporânea", "category": "Residencial", "description": "Imagem ilustrativa de residência contemporânea.", "image": "assets/img/fotos/arquiteto-residencia.jpg", "url": "#" },
      { "title": "Ambiente interno", "category": "Interiores", "description": "Imagem ilustrativa de ambiente interno.", "image": "assets/img/fotos/arquiteto-interiores.jpg", "url": "#" },
      { "title": "Fachada residencial", "category": "Residencial", "description": "Imagem ilustrativa de fachada residencial.", "image": "assets/img/fotos/arquiteto-fachada.jpg", "url": "#" },
      { "title": "Desenvolvimento do projeto", "category": "Planejamento", "description": "Imagem ilustrativa de desenvolvimento do projeto.", "image": "assets/img/fotos/arquiteto-planejamento.jpg", "url": "#" }
    ],
    "about": {
      "tag": "Nossa história",
      "title": "Arquitetura com escuta e técnica",
      "description": "O escritório nasceu da vontade de projetar espaços que contassem a história de quem os habita. Nove anos depois, somos três arquitetas — entre residencial, comercial e design de interiores — e seguimos com o mesmo princípio: se não tem indicação para o seu caso, a gente fala. E se o projeto é simples, a gente indica o simples. A confiança se constrói assim.",
      "image": "assets/img/fotos/arquiteto-interiores.jpg",
      "stats": [
        { "value": 9, "suffix": "", "label": "Anos de escritório" },
        { "value": 3, "suffix": "", "label": "Arquitetas" },
        { "value": 4.9, "suffix": "", "label": "Nota no Google" }
      ],
      "cta": { "label": "Falar com a arquiteta", "href": "#contato" }
    },
    "contact": {
      "tag": "Contato",
      "title": "Vamos conversar sobre seu projeto",
      "description": "A primeira reunião é gratuita e sem compromisso. Conta pra gente o que você imagina.",
      "phone": "(11) 3555-2020",
      "email": "contato@casaforma.com.br",
      "whatsapp": "5511913131313",
      "address": "Rua Oscar Freire, 1500, sala 120 — São Paulo/SP",
      "hours": "Segunda a sexta, das 9h às 18h",
      "mapEmbed": "https://www.google.com/maps?q=Sao+Paulo&output=embed",
      "social": { "instagram": "#", "facebook": "#", "linkedin": "#", "github": "#" },
      "formMode": "whatsapp",
      "formWhatsTitle": "Novo contato pelo site",
      "formWhatsFooter": "Enviado pelo site",
      "formWhatsMsg": "Abrimos o WhatsApp com seu pedido escrito. É só tocar em enviar!",
      "formTitle": "Falar sobre seu projeto",
      "formSubmit": "Enviar mensagem",
      "formWhats": "Ou chame no WhatsApp",
      "formSuccess": "Mensagem recebida! Retornamos em poucas horas.",
      "formFields": [
        { "type": "text", "name": "nome", "label": "Nome", "placeholder": "Seu nome", "required": true, "half": true },
        { "type": "tel", "name": "telefone", "label": "WhatsApp", "placeholder": "(11) 99999-9999", "required": true, "half": true },
        { "type": "select", "name": "servico", "label": "Tipo de projeto", "placeholder": "Escolha", "required": true, "half": true, "options": ["Projeto residencial", "Design de interiores", "Projeto comercial", "Reforma e retrofit", "Consultoria de decoração", "Projeto luminotécnico"] },
        { "type": "select", "name": "orcamento", "label": "Orçamento estimado", "placeholder": "Escolha", "required": false, "half": true, "options": ["Até R$ 5.000", "R$ 5.000 a R$ 15.000", "R$ 15.000 a R$ 30.000", "Acima de R$ 30.000"] },
        { "type": "textarea", "name": "observacoes", "label": "Conte sobre seu projeto", "placeholder": "O que você imagina, metragem, prazo..." }
      ]
    },
    "footer": {
      "description": "Arquitetura e design de interiores. Projetos residenciais e comerciais.",
      "credit": "© 2026 Casa & Forma. Todos os direitos reservados."
    }
  }
});
