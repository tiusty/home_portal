import { useState, useEffect, useMemo } from 'react';
import { RecipePreferences, Recipe } from './types';

interface PreferencesProps {
  preferences: RecipePreferences;
  onSave: (preferences: RecipePreferences) => void;
  recipes: Recipe[];
  onCancel?: () => void;
}

const difficultyLevels: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard'];

export default function Preferences({ preferences, onSave, recipes, onCancel }: PreferencesProps) {
  const [localPreferences, setLocalPreferences] = useState<RecipePreferences>(preferences);
  const [isDirty, setIsDirty] = useState(false);

  // Get unique categories from current recipes
  const availableCategories = useMemo(() => {
    const categories = new Set(recipes.map(recipe => recipe.category));
    return Array.from(categories).sort();
  }, [recipes]);

  useEffect(() => {
    setLocalPreferences(preferences);
    setIsDirty(false);
  }, [preferences]);

  const handleChange = (updates: Partial<RecipePreferences>) => {
    setLocalPreferences(prev => ({ ...prev, ...updates }));
    setIsDirty(true);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = localPreferences.preferredCategories.includes(category)
      ? localPreferences.preferredCategories.filter(c => c !== category)
      : [...localPreferences.preferredCategories, category];
    handleChange({ preferredCategories: newCategories });
  };

  const handleDifficultyToggle = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    const newDifficulties = localPreferences.difficultyLevels.includes(difficulty)
      ? localPreferences.difficultyLevels.filter(d => d !== difficulty)
      : [...localPreferences.difficultyLevels, difficulty];
    handleChange({ difficultyLevels: newDifficulties });
  };

  const handleSave = () => {
    onSave(localPreferences);
    setIsDirty(false);
  };

  const handleReset = () => {
    setLocalPreferences(preferences);
    setIsDirty(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Recipe Preferences</h1>
            <p className="text-gray-600">Customize your recipe recommendations and meal planning</p>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              ← Back
            </button>
          )}
        </div>

        {/* Save Button */}
        <div className="mb-6 flex justify-end gap-4">
          <button
            onClick={handleReset}
            disabled={!isDirty}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              isDirty
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={!isDirty}
            className={`px-6 py-2 font-medium rounded-lg transition-colors ${
              isDirty
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save Preferences
          </button>
        </div>

        <div className="space-y-8">
          {/* Number of Meals */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meal Planning</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Meals to Plan
              </label>
              <input
                type="number"
                min="1"
                max="21"
                value={localPreferences.numberOfMeals}
                onChange={(e) => handleChange({ numberOfMeals: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-500">
                How many meals would you like to plan? (1-21)
              </p>
            </div>
          </div>

          {/* Preferred Categories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Food Categories</h2>
            <p className="text-sm text-gray-600 mb-4">
              Select the categories of food you prefer. Leave empty to show all categories.
            </p>
            <div className="flex flex-wrap gap-3">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    localPreferences.preferredCategories.includes(category)
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {localPreferences.preferredCategories.length === 0 && (
              <p className="mt-4 text-sm text-amber-600">
                No categories selected - all categories will be shown
              </p>
            )}
          </div>

          {/* Difficulty Levels */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Difficulty Levels</h2>
            <p className="text-sm text-gray-600 mb-4">
              Select the difficulty levels you&apos;re comfortable with.
            </p>
            <div className="flex flex-wrap gap-3">
              {difficultyLevels.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => handleDifficultyToggle(difficulty)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    localPreferences.difficultyLevels.includes(difficulty)
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
            {localPreferences.difficultyLevels.length === 0 && (
              <p className="mt-4 text-sm text-amber-600">
                No difficulty levels selected - all levels will be shown
              </p>
            )}
          </div>

          {/* Time Constraints */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Time Constraints</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Prep Time (minutes)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="No limit"
                  value={localPreferences.maxPrepTime || ''}
                  onChange={(e) => handleChange({ 
                    maxPrepTime: e.target.value ? parseInt(e.target.value) : null 
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Leave empty for no limit
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Cook Time (minutes)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="No limit"
                  value={localPreferences.maxCookTime || ''}
                  onChange={(e) => handleChange({ 
                    maxCookTime: e.target.value ? parseInt(e.target.value) : null 
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Leave empty for no limit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

