export type ShotCategory = 'citrus' | 'spiced';

export interface ShotIngredient {
  name: string;
  amount: string;
  note?: string;
}

export interface ShotRecipe {
  id: number;
  number: number;
  name: string;
  category: ShotCategory;
  categoryLabel: string;
  ingredients: ShotIngredient[];
  rawIngredientsText: string;
  prepTimeSeconds: number;
  preparation: string;
  highlight: string;
  flavorNotes: string[];
  acidityLevel: 'baixa' | 'media' | 'alta';
  spiceLevel: 'nenhuma' | 'leve' | 'moderada' | 'intensa';
  dilutionTip: string;
  cautionNote?: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  suggestedQty: string;
  category: 'frutas' | 'especiarias' | 'liquidos';
}

export interface DaySuggestion {
  dayName: string;
  dayShort: string;
  dayIndex: number; // 0 for Sunday, 1 for Monday, etc.
  recipeId: number;
  recipeName: string;
}

export interface MythFact {
  myth: string;
  fact: string;
  explanation: string;
  citation?: string;
}
