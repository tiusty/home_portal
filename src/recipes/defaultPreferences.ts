import { RecipePreferences } from './types';

export const defaultPreferences: RecipePreferences = {
  numberOfMeals: 5,
  preferredCategories: [],
  maxPrepTime: null,
  maxCookTime: null,
  difficultyLevels: ['Easy', 'Medium', 'Hard'],
};

