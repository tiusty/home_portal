export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  imageUrl?: string;
  tags: string[];
}

export interface ReceipeEatenEvent {
  recipeId: string;
  dateEaten: Date;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface RecipePreferences {
  numberOfMeals: number;
  preferredCategories: string[];
  maxPrepTime: number | null; // in minutes, null means no limit
  maxCookTime: number | null; // in minutes, null means no limit
  difficultyLevels: ('Easy' | 'Medium' | 'Hard')[];
  dietaryTags: string[]; // e.g., 'vegetarian', 'healthy', etc.
  servingsRange: {
    min: number;
    max: number;
  };
}
