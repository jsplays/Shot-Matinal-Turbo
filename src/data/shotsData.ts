import { ShotRecipe, ShoppingItem, DaySuggestion, MythFact } from '../types/shot';

export const RECIPES: ShotRecipe[] = [
  // BLOCO 1 - 7 combinações leves e cítricas
  {
    id: 1,
    number: 1,
    name: "Limão & Gengibre Fresco",
    category: "citrus",
    categoryLabel: "Bloco 1 — Leve & Cítrico",
    ingredients: [
      { name: "Água", amount: "50 ml" },
      { name: "Suco de limão", amount: "1 colher de chá" },
      { name: "Gengibre fresco ralado", amount: "¼ colher de chá" }
    ],
    rawIngredientsText: "50 ml de água; 1 colher de chá de suco de limão; ¼ colher de chá de gengibre ralado",
    prepTimeSeconds: 30,
    preparation: "Misture e tome. Se preferir, coe o gengibre.",
    highlight: "Sabor cítrico e picante.",
    flavorNotes: ["Cítrico", "Picante fresco", "Termogênico suave"],
    acidityLevel: "media",
    spiceLevel: "moderada",
    dilutionTip: "Se a picância ou acidez incomodar, adicione mais 50 ml de água ou tome com a refeição."
  },
  {
    id: 2,
    number: 2,
    name: "Laranja com Gengibre",
    category: "citrus",
    categoryLabel: "Bloco 1 — Leve & Cítrico",
    ingredients: [
      { name: "Suco de laranja natural", amount: "60 ml" },
      { name: "Gengibre ralado", amount: "¼ colher de chá" }
    ],
    rawIngredientsText: "60 ml de suco de laranja; ¼ colher de chá de gengibre ralado",
    prepTimeSeconds: 25,
    preparation: "Misture bem e sirva.",
    highlight: "Doçura natural da fruta, sem açúcar adicionado.",
    flavorNotes: ["Frutado", "Doçura natural", "Aromático"],
    acidityLevel: "baixa",
    spiceLevel: "leve",
    dilutionTip: "Pode ser diluído com um gole de água se preferir menos concentrado."
  },
  {
    id: 3,
    number: 3,
    name: "Abacaxi & Hortelã",
    category: "citrus",
    categoryLabel: "Bloco 1 — Leve & Cítrico",
    ingredients: [
      { name: "Suco de abacaxi", amount: "50 ml" },
      { name: "Folhas de hortelã picadas", amount: "2 folhas" },
      { name: "Água", amount: "30 ml" }
    ],
    rawIngredientsText: "50 ml de suco de abacaxi; 2 folhas de hortelã picadas; 30 ml de água",
    prepTimeSeconds: 30,
    preparation: "Amasse a hortelã na água, junte o suco e misture.",
    highlight: "Sabor frutado e refrescante.",
    flavorNotes: ["Refrescante", "Frutado", "Herbal"],
    acidityLevel: "baixa",
    spiceLevel: "nenhuma",
    dilutionTip: "Excelente para dias quentes; a água já garante boa suavidade."
  },
  {
    id: 4,
    number: 4,
    name: "Limão com Pepino",
    category: "citrus",
    categoryLabel: "Bloco 1 — Leve & Cítrico",
    ingredients: [
      { name: "Água", amount: "50 ml" },
      { name: "Pepino bem picado", amount: "2 colheres de sopa" },
      { name: "Suco de limão", amount: "1 colher de chá" }
    ],
    rawIngredientsText: "50 ml de água; 2 colheres de sopa de pepino bem picado; 1 colher de chá de suco de limão",
    prepTimeSeconds: 30,
    preparation: "Amasse o pepino com um garfo, misture à água e acrescente o limão.",
    highlight: "Combinação suave e fresca.",
    flavorNotes: ["Muito leve", "Frescor de pepino", "Toque cítrico"],
    acidityLevel: "baixa",
    spiceLevel: "nenhuma",
    dilutionTip: "Uma das opções mais suaves para quem acorda com estômago sensível."
  },
  {
    id: 5,
    number: 5,
    name: "Maçã & Canela",
    category: "citrus",
    categoryLabel: "Bloco 1 — Leve & Cítrico",
    ingredients: [
      { name: "Suco de maçã sem açúcar", amount: "60 ml" },
      { name: "Canela em pó", amount: "1 pitada" },
      { name: "Água", amount: "20 ml" }
    ],
    rawIngredientsText: "60 ml de suco de maçã sem açúcar; 1 pitada de canela; 20 ml de água",
    prepTimeSeconds: 20,
    preparation: "Misture até dissolver a canela.",
    highlight: "Sabor adocicado e aromático.",
    flavorNotes: ["Doce suave", "Aromático", "Aconchegante"],
    acidityLevel: "baixa",
    spiceLevel: "leve",
    dilutionTip: "A canela confere aroma agradável; misture bem para não empelotar."
  },
  {
    id: 6,
    number: 6,
    name: "Água de Coco com Limão",
    category: "citrus",
    categoryLabel: "Bloco 1 — Leve & Cítrico",
    ingredients: [
      { name: "Água de coco", amount: "60 ml" },
      { name: "Suco de limão", amount: "1 colher de chá" }
    ],
    rawIngredientsText: "60 ml de água de coco; 1 colher de chá de suco de limão",
    prepTimeSeconds: 15,
    preparation: "Misture e sirva.",
    highlight: "Uma alternativa saborosa à água pura.",
    flavorNotes: ["Hidratante", "Equilibrado", "Levemente ácido"],
    acidityLevel: "baixa",
    spiceLevel: "nenhuma",
    dilutionTip: "A água de coco já quebra qualquer excesso de acidez do limão de forma natural."
  },
  {
    id: 7,
    number: 7,
    name: "Maracujá Leve",
    category: "citrus",
    categoryLabel: "Bloco 1 — Leve & Cítrico",
    ingredients: [
      { name: "Polpa de maracujá", amount: "1 colher de sopa" },
      { name: "Água", amount: "60 ml" }
    ],
    rawIngredientsText: "1 colher de sopa de polpa de maracujá; 60 ml de água",
    prepTimeSeconds: 25,
    preparation: "Misture e, se quiser, coe as sementes.",
    highlight: "Sabor azedinho e frutado.",
    flavorNotes: ["Azedinho clássico", "Frutado tropical", "Refrescante"],
    acidityLevel: "media",
    spiceLevel: "nenhuma",
    dilutionTip: "Se achar o maracujá muito azedo, adicione mais água até ficar agradável ao seu paladar."
  },

  // BLOCO 2 — 7 combinações aromáticas e especiadas
  {
    id: 8,
    number: 8,
    name: "Cúrcuma & Limão Suave",
    category: "spiced",
    categoryLabel: "Bloco 2 — Aromático & Especiado",
    ingredients: [
      { name: "Água", amount: "60 ml" },
      { name: "Cúrcuma em pó (açafrão-da-terra)", amount: "1 pitada" },
      { name: "Suco de limão", amount: "1 colher de chá" }
    ],
    rawIngredientsText: "60 ml de água; 1 pitada de cúrcuma; 1 colher de chá de suco de limão",
    prepTimeSeconds: 25,
    preparation: "Misture bem até incorporar a cúrcuma.",
    highlight: "Sabor terroso com toque cítrico.",
    flavorNotes: ["Terroso", "Cítrico", "Cor dourada marcante"],
    acidityLevel: "media",
    spiceLevel: "leve",
    dilutionTip: "Uma pitada pequena é o bastante para sabor sem amargar."
  },
  {
    id: 9,
    number: 9,
    name: "Canela & Laranja",
    category: "spiced",
    categoryLabel: "Bloco 2 — Aromático & Especiado",
    ingredients: [
      { name: "Suco de laranja natural", amount: "60 ml" },
      { name: "Canela em pó", amount: "1 pitada" }
    ],
    rawIngredientsText: "60 ml de suco de laranja; 1 pitada de canela",
    prepTimeSeconds: 20,
    preparation: "Misture até incorporar.",
    highlight: "Combinação doce e aromática.",
    flavorNotes: ["Doce cítrico", "Especiaria quente", "Perfume de canela"],
    acidityLevel: "baixa",
    spiceLevel: "leve",
    dilutionTip: "Combinação clássica que agrada até quem não tem hábito de tomar shots."
  },
  {
    id: 10,
    number: 10,
    name: "Gengibre & Hortelã",
    category: "spiced",
    categoryLabel: "Bloco 2 — Aromático & Especiado",
    ingredients: [
      { name: "Água", amount: "60 ml" },
      { name: "Gengibre ralado", amount: "¼ colher de chá" },
      { name: "Folhas de hortelã", amount: "2 folhas" }
    ],
    rawIngredientsText: "60 ml de água; ¼ colher de chá de gengibre ralado; 2 folhas de hortelã",
    prepTimeSeconds: 30,
    preparation: "Amasse levemente a hortelã e misture os ingredientes na água.",
    highlight: "Perfil fresco com leve ardência.",
    flavorNotes: ["Refrescância herbal", "Ardência controlada", "Estimulante"],
    acidityLevel: "baixa",
    spiceLevel: "moderada",
    dilutionTip: "A hortelã ameniza a picância do gengibre de maneira natural."
  },
  {
    id: 11,
    number: 11,
    name: "Cacau & Canela",
    category: "spiced",
    categoryLabel: "Bloco 2 — Aromático & Especiado",
    ingredients: [
      { name: "Leite ou bebida vegetal", amount: "60 ml" },
      { name: "Cacau em pó 100% sem açúcar", amount: "½ colher de chá" },
      { name: "Canela em pó", amount: "1 pitada" }
    ],
    rawIngredientsText: "60 ml de leite ou bebida vegetal; ½ colher de chá de cacau sem açúcar; 1 pitada de canela",
    prepTimeSeconds: 30,
    preparation: "Misture vigorosamente. Pode usar um pequeno pote com tampa para agitar.",
    highlight: "Sabor de chocolate sem precisar adoçar.",
    flavorNotes: ["Cremoso", "Cacau puro", "Aroma de canela"],
    acidityLevel: "baixa",
    spiceLevel: "leve",
    dilutionTip: "Pode ser consumido levemente morno nos dias mais frios."
  },
  {
    id: 12,
    number: 12,
    name: "Maçã, Limão & Gengibre",
    category: "spiced",
    categoryLabel: "Bloco 2 — Aromático & Especiado",
    ingredients: [
      { name: "Suco de maçã sem açúcar", amount: "50 ml" },
      { name: "Suco de limão", amount: "1 colher de chá" },
      { name: "Gengibre ralado", amount: "1 lasca pequena" }
    ],
    rawIngredientsText: "50 ml de suco de maçã sem açúcar; 1 colher de chá de limão; uma lasca pequena de gengibre ralado",
    prepTimeSeconds: 30,
    preparation: "Misture e ajuste com água se ficar forte.",
    highlight: "Frutado, cítrico e levemente picante.",
    flavorNotes: ["Equilíbrio agridoce", "Toque cítrico", "Picância leve"],
    acidityLevel: "media",
    spiceLevel: "leve",
    dilutionTip: "O adocicado da maçã harmoniza perfeitamente com a acidez do limão."
  },
  {
    id: 13,
    number: 13,
    name: "Cúrcuma & Laranja",
    category: "spiced",
    categoryLabel: "Bloco 2 — Aromático & Especiado",
    ingredients: [
      { name: "Suco de laranja natural", amount: "60 ml" },
      { name: "Cúrcuma em pó", amount: "1 pitada" }
    ],
    rawIngredientsText: "60 ml de suco de laranja; 1 pitada de cúrcuma",
    prepTimeSeconds: 20,
    preparation: "Misture bem antes de beber.",
    highlight: "Sabor cítrico com toque terroso.",
    flavorNotes: ["Frutado cítrico", "Terroso suave", "Vibrante"],
    acidityLevel: "baixa",
    spiceLevel: "leve",
    dilutionTip: "A laranja facilita a ingestão da cúrcuma sem necessidade de adoçar."
  },
  {
    id: 14,
    number: 14,
    name: "Vinagre de Maçã Bem Diluído",
    category: "spiced",
    categoryLabel: "Bloco 2 — Aromático & Especiado",
    ingredients: [
      { name: "Água", amount: "100 ml" },
      { name: "Vinagre de maçã de boa qualidade", amount: "1 colher de chá" }
    ],
    rawIngredientsText: "100 ml de água; 1 colher de chá de vinagre de maçã",
    prepTimeSeconds: 20,
    preparation: "Dilua completamente e tome sem ficar sorvendo por muito tempo. Enxágue a boca com água depois.",
    highlight: "Sabor ácido para quem aprecia vinagre — sem promessa de emagrecimento.",
    flavorNotes: ["Ácido fermentado", "Maçã sutil", "Intensidade controlada"],
    acidityLevel: "alta",
    spiceLevel: "nenhuma",
    dilutionTip: "SEMPRE beba bem diluído (mínimo 100 ml de água). Nunca tome puro.",
    cautionNote: "Receita opcional. Não tome vinagre puro; bebidas ácidas podem irritar a garganta e desgastar o esmalte dos dentes. Se você tem refluxo, sensibilidade digestiva, diabetes ou usa medicamentos (incluindo insulina e diuréticos), prefira outra receita até conversar com um profissional de saúde."
  }
];

export const WEEKLY_SCHEDULE: DaySuggestion[] = [
  { dayName: "Segunda-feira", dayShort: "Seg", dayIndex: 1, recipeId: 1, recipeName: "Limão & Gengibre Fresco" },
  { dayName: "Terça-feira", dayShort: "Ter", dayIndex: 2, recipeId: 3, recipeName: "Abacaxi & Hortelã" },
  { dayName: "Quarta-feira", dayShort: "Qua", dayIndex: 3, recipeId: 5, recipeName: "Maçã & Canela" },
  { dayName: "Quinta-feira", dayShort: "Qui", dayIndex: 4, recipeId: 13, recipeName: "Cúrcuma & Laranja" },
  { dayName: "Sexta-feira", dayShort: "Sex", dayIndex: 5, recipeId: 2, recipeName: "Laranja com Gengibre" },
  { dayName: "Sábado", dayShort: "Sáb", dayIndex: 6, recipeId: 11, recipeName: "Cacau & Canela" },
  { dayName: "Domingo", dayShort: "Dom", dayIndex: 0, recipeId: 6, recipeName: "Água de Coco com Limão" }
];

export const SHOPPING_LIST: ShoppingItem[] = [
  { id: "limao", name: "Limões", suggestedQty: "3 a 4 unidades", category: "frutas" },
  { id: "laranja", name: "Laranjas ou suco de laranja sem açúcar", suggestedQty: "2 a 3 unidades ou 1 emb. pequena", category: "frutas" },
  { id: "gengibre", name: "Gengibre fresco", suggestedQty: "1 pedaço pequeno", category: "frutas" },
  { id: "pepino", name: "Pepino", suggestedQty: "1 unidade", category: "frutas" },
  { id: "abacaxi", name: "Abacaxi", suggestedQty: "2 a 3 fatias ou polpa sem açúcar", category: "frutas" },
  { id: "maca", name: "Maçã ou suco de maçã sem açúcar", suggestedQty: "1 unidade ou 1 emb. pequena", category: "frutas" },
  { id: "maracuja", name: "Polpa de maracujá", suggestedQty: "1 unidade ou porção congelada", category: "frutas" },
  { id: "hortela", name: "Hortelã fresca", suggestedQty: "1 maço pequeno", category: "frutas" },
  { id: "canela", name: "Canela em pó", suggestedQty: "1 embalagem pequena", category: "especiarias" },
  { id: "curcuma", name: "Cúrcuma em pó (açafrão)", suggestedQty: "1 embalagem pequena", category: "especiarias" },
  { id: "cacau", name: "Cacau sem açúcar 100%", suggestedQty: "1 embalagem pequena", category: "especiarias" },
  { id: "vinagre", name: "Vinagre de maçã (opcional)", suggestedQty: "1 garrafa pequena", category: "especiarias" },
  { id: "coco", name: "Água de coco", suggestedQty: "1 embalagem pequena", category: "liquidos" },
  { id: "leite", name: "Leite ou bebida vegetal", suggestedQty: "1 embalagem pequena", category: "liquidos" }
];

export const COMFORT_PRINCIPLES = [
  {
    title: "Não é preciso estar em jejum",
    text: "Tome o shot quando for confortável — ao acordar, com o café da manhã ou em outro momento do dia."
  },
  {
    title: "Prefira uma bebida diluída",
    text: "As receitas rendem porções pequenas (50 a 100 ml), mas podem ser completadas com água a gosto se o paladar pedir."
  },
  {
    title: "Água em temperatura ambiente ou levemente morna",
    text: "Escolha a que preferir; não há necessidade nem comprovação de benefícios de uma temperatura especial."
  },
  {
    title: "Comece com pouco gengibre ou pimenta",
    text: "Reduza ou retire esses ingredientes se sentir ardor, azia ou qualquer sensação de queimação."
  },
  {
    title: "Cuidado redobrado com acidez",
    text: "Limão e vinagre podem incomodar pessoas sensíveis. Evite vinagre puro, enxágue a boca com água e não escove os dentes imediatamente."
  },
  {
    title: "Pare se houver desconforto",
    text: "Você não precisa insistir em um ingrediente só porque ele aparece em uma receita. Água pura já é excelente."
  }
];

export const MYTHS_AND_FACTS: MythFact[] = [
  {
    myth: "Shots matinais 'desintoxicam' o corpo e limpam o fígado.",
    fact: "Fígado e rins já desempenham funções de processamento e eliminação naturalmente.",
    explanation: "Não há comprovação de que limão, gengibre ou vinagre 'desintoxiquem' o organismo ou eliminem toxinas além da capacidade biológica natural.",
    citation: "Fontes científicas sobre fisiologia renal e hepática"
  },
  {
    myth: "Tomar shot com vinagre ou gengibre acelera o metabolismo e 'queima gordura'.",
    fact: "Nenhuma bebida isolada queima gordura corporal.",
    explanation: "O gengibre pode fazer parte de uma alimentação equilibrada, mas não transforma um shot em estratégia garantida de emagrecimento.",
    citation: "Revisões sistemáticas sobre termogênicos naturais"
  },
  {
    myth: "Vinagre de maçã é milagroso para emagrecer e 'desinchar' em 7 dias.",
    fact: "Evidências para perda de peso com vinagre são limitadas.",
    explanation: "O vinagre puro pode irritar garganta, estômago, agredir o esmalte dentário e interagir com remédios como insulina e diuréticos.",
    citation: "Estudos clínicos sobre ácido acético e saúde bucal"
  },
  {
    myth: "O inchaço diário é eliminado por bebidas milagrosas.",
    fact: "Inchaço tem múltiplas causas que exigem diagnóstico real.",
    explanation: "Pode ser decorrente de gases, constipação, padrão alimentar, ciclo menstrual ou condições clínicas. Se o inchaço for persistente ou com dor, procure auxílio médico.",
    citation: "Diretrizes de gastroenterologia clínica"
  }
];

export const DISCLAIMER_TEXT = `Este material é educativo e informativo. Seu objetivo é apresentar ideias de bebidas e combinações de ingredientes para uso culinário. Ele não substitui orientação médica, nutricional ou de qualquer outro profissional de saúde, nem constitui diagnóstico, prescrição, tratamento ou recomendação individualizada.

As receitas e informações aqui apresentadas não prometem resultados. O consumo de shots não garante emagrecimento, redução de medidas, aceleração do metabolismo, “desintoxicação”, eliminação de gordura, diminuição do inchaço ou qualquer outro efeito específico. Os resultados variam de pessoa para pessoa e dependem de diversos fatores, incluindo saúde, alimentação, rotina e características individuais. Nenhuma receita deve ser entendida como cura ou tratamento para doenças.

Os ingredientes podem não ser adequados para todas as pessoas. Limão e vinagre são ácidos e podem causar desconforto ou agravar sintomas em quem tem sensibilidade, refluxo ou outras condições digestivas. Gengibre, pimentas e especiarias também podem provocar irritação ou desconforto. Alergias, intolerâncias, condições de saúde, gravidez, amamentação e uso de medicamentos podem exigir cuidados específicos.

Antes de experimentar as receitas ou alterar sua alimentação, consulte um profissional de saúde se você tiver uma condição médica, apresentar sintomas persistentes, estiver grávida ou amamentando, usar medicamentos regularmente ou tiver dúvidas sobre a segurança de algum ingrediente. Interrompa o consumo se sentir reação alérgica, dor, irritação ou qualquer outro sintoma indesejado e procure orientação adequada.

A decisão de preparar ou consumir qualquer receita é individual. Verifique os ingredientes, considere suas necessidades e limitações e não use este material para adiar ou substituir atendimento profissional. Em caso de sintomas intensos ou urgentes, procure um serviço de saúde.`;
