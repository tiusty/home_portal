import { useState } from 'react';
import { Recipe } from '../types/recipe';
import RecipeCard from './RecipeCard';
import RecipeDetail from './RecipeDetail';
import AddRecipe from './AddRecipe';

interface HomeCookingProps {
  recipes: Recipe[];
  onAddRecipe: (recipe: Recipe) => void;
  onMarkAsEaten: (recipeId: string) => void;
}

type View = 'home' | 'add' | 'detail' | 'history';

export default function HomeCooking({ recipes, onAddRecipe, onMarkAsEaten }: HomeCookingProps) {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Get recipe of the week (most recent recipe or first one)
  const recipeOfTheWeek = recipes.length > 0 ? recipes[0] : null;

  // Get recipes that have been eaten
  const eatenRecipes = recipes.filter(r => r.dateEaten).sort((a, b) => {
    if (!a.dateEaten || !b.dateEaten) return 0;
    return new Date(b.dateEaten).getTime() - new Date(a.dateEaten).getTime();
  });

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('detail');
  };

  const handleMarkAsEaten = () => {
    if (selectedRecipe) {
      onMarkAsEaten(selectedRecipe.id);
      setCurrentView('home');
      setSelectedRecipe(null);
    }
  };

  const handleAddRecipe = (recipe: Recipe) => {
    onAddRecipe(recipe);
    setCurrentView('home');
  };

  if (currentView === 'add') {
    return (
      <AddRecipe
        onAdd={handleAddRecipe}
        onCancel={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'detail' && selectedRecipe) {
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        onClose={() => {
          setCurrentView('home');
          setSelectedRecipe(null);
        }}
        onMarkAsEaten={handleMarkAsEaten}
      />
    );
  }

  if (currentView === 'history') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">Recipe History</h1>
            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              ← Back to Home
            </button>
          </div>

          {eatenRecipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No recipes eaten yet.</p>
              <p className="text-gray-400 mt-2">Mark recipes as eaten to see them here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eatenRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => handleRecipeClick(recipe)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Home Cooking</h1>
          <p className="text-gray-600">Discover, cook, and track your favorite recipes</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setCurrentView('add')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            + Add New Recipe
          </button>
          <button
            onClick={() => setCurrentView('history')}
            className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
          >
            📚 Recipe History
          </button>
        </div>

        {/* Recipe of the Week */}
        {recipeOfTheWeek ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Recipe of the Week</h2>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                ⭐ Featured
              </span>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">{recipeOfTheWeek.name}</h3>
                  <p className="text-gray-600 mb-6">{recipeOfTheWeek.description}</p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">{recipeOfTheWeek.prepTime + recipeOfTheWeek.cookTime}</div>
                      <div className="text-sm text-gray-500">Minutes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">{recipeOfTheWeek.servings}</div>
                      <div className="text-sm text-gray-500">Servings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">{recipeOfTheWeek.difficulty}</div>
                      <div className="text-sm text-gray-500">Difficulty</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRecipeClick(recipeOfTheWeek)}
                    className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    View Recipe →
                  </button>
                </div>
                <div className="md:w-1/2 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center p-8">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">🍳</div>
                    <p className="text-xl font-semibold">Ready to Cook!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-12 bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">👨‍🍳</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No recipes yet</h2>
            <p className="text-gray-600 mb-6">Get started by adding your first recipe!</p>
            <button
              onClick={() => setCurrentView('add')}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
            >
              + Add Your First Recipe
            </button>
          </div>
        )}

        {/* All Recipes */}
        {recipes.length > 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.slice(1).map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => handleRecipeClick(recipe)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

