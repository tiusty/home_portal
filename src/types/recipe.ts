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
  dateEaten?: Date;
  tags: string[];
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

