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
  console.log('localPreferences', localPreferences);

  const availableCategories = useMemo(() => {
    const categories = new Set(recipes.map(recipe => recipe.category));
    return Array.from(categories).sort();
  }, [recipes]);

  const availableTags = useMemo(() => {
    const allTags = recipes.flatMap(recipe => recipe.tags);
    const uniqueTags = new Set(allTags);
    return Array.from(uniqueTags).sort();
  }, [recipes]);

  const isDirty = useMemo(() => {
    return JSON.stringify(preferences) !== JSON.stringify(localPreferences);
  }, [preferences, localPreferences]);


  useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  const handleChange = (updates: Partial<RecipePreferences>) => {
    setLocalPreferences(prev => ({ ...prev, ...updates }));
  };

  const handleDifficultyToggle = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    const newDifficulties = localPreferences.difficultyLevels.includes(difficulty)
      ? localPreferences.difficultyLevels.filter(d => d !== difficulty)
      : [...localPreferences.difficultyLevels, difficulty];
    handleChange({ difficultyLevels: newDifficulties });
  };

  const handleSave = () => {
    onSave(localPreferences);
  };

  const handleReset = () => {
    setLocalPreferences(preferences);
  };

  const handleCancel = () => {
    if (isDirty) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (!confirmed) return;
    }
    setLocalPreferences(preferences);
    if (onCancel) {
      onCancel();
    }
  };

  const acceptableExtraServings = useMemo(() => {
    return localPreferences.numOfServingsPerWeek.max - localPreferences.numOfServingsPerWeek.min;
  }, [localPreferences.numOfServingsPerWeek]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Recipe Preferences</h1>
            <p className="text-gray-600">Customize your recipe recommendations and meal planning</p>
          </div>
          {onCancel && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg border border-gray-300"
            >
              ← Back
            </button>
          )}
        </div>

        <div className="mb-6 flex justify-end gap-3">
          <button
            onClick={handleReset}
            disabled={!isDirty}
            className={`px-4 py-2 rounded-lg ${
              isDirty
                ? 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
            }`}
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={!isDirty}
            className={`px-6 py-2 rounded-lg ${
              isDirty
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save Preferences
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Meal Planning</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Meals to Plan
              </label>
              <input
                type="number"
                min="1"
                max="21"
                value={localPreferences.numberOfReceipesPerWeek}
                onChange={(e) => handleChange({ numberOfReceipesPerWeek: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="mt-2 text-sm text-gray-500">
                How many recipes would you like to plan for this week? 
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Servings For the Week</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Servings to make
                </label>
                <input
                  type="number"
                  min="1"
                  value={localPreferences.numOfServingsPerWeek.min}
                  onChange={(e) => handleChange({
                    numOfServingsPerWeek: {
                      ...localPreferences.numOfServingsPerWeek,
                      min: parseInt(e.target.value) || 1
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Acceptable extra servings
                </label>
                <input
                  type="number"
                  min="1"
                  value={acceptableExtraServings}
                  onChange={(e) => handleChange({
                    numOfServingsPerWeek: {
                      ...localPreferences.numOfServingsPerWeek,
                      max: localPreferences.numOfServingsPerWeek.min + parseInt(e.target.value) || 1
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Meal Type</h2>
            <div className="flex flex-wrap gap-3">
              {localPreferences.mealType.map((mealType) => (
                <button key={mealType} onClick={() => handleChange({ mealType: [...localPreferences.mealType, mealType] })} className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300">
                  {mealType}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Food Categories</h2>
            <p className="text-sm text-gray-600 mb-4">
              Select the categories of food you prefer. Leave empty to show all categories.
            </p>
            <div className="flex flex-wrap gap-3">
              {localPreferences.proteinType.map((proteinType) => (
                <button
                  key={proteinType}
                  onClick={() => handleChange({ proteinType: [...localPreferences.proteinType, proteinType] })}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    localPreferences.proteinType.includes(proteinType)
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {proteinType}
                </button>
              ))}
            </div>
            {localPreferences.proteinType.length === 0 && (
              <p className="mt-4 text-sm text-amber-600">
                No protein types selected - all protein types will be shown
              </p>
            )}
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Difficulty Levels</h2>
            <p className="text-sm text-gray-600 mb-4">
              Select the difficulty levels you're comfortable with.
            </p>
            <div className="flex flex-wrap gap-3">
              {difficultyLevels.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => handleDifficultyToggle(difficulty)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    localPreferences.difficultyLevels.includes(difficulty)
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
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

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Time Constraints</h2>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Leave empty for no limit
                </p>
              </div>
            </div>
          </div>


          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dietary Preferences</h2>
            <p className="text-sm text-gray-600 mb-4">
              Select tags that match your dietary preferences or restrictions.
            </p>
            <div className="flex flex-wrap gap-3">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleChange({ dietaryTags: [...localPreferences.dietaryTags, tag] })}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    localPreferences.dietaryTags.includes(tag)
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {localPreferences.dietaryTags.length === 0 && (
              <p className="mt-4 text-sm text-gray-500">
                No dietary tags available in current recipes
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
