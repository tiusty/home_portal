import { RecipePreferences } from './types';

export const defaultPreferences: RecipePreferences = {
  numberOfMeals: 7,
  preferredCategories: [],
  maxPrepTime: null,
  maxCookTime: null,
  difficultyLevels: ['Easy', 'Medium', 'Hard'],
  dietaryTags: [],
  servingsRange: {
    min: 1,
    max: 10,
  },
};

