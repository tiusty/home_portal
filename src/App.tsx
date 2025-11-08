import { useState } from 'react';
import './App.css';
import HomeCooking from './recipes/HomeCooking';
import { Recipe } from './recipes/types';
import { mockRecipes } from './recipes/data';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [activeTab, setActiveTab] = useState<'home-cooking'>('home-cooking');

  const handleAddRecipe = (recipe: Recipe) => {
    setRecipes([recipe, ...recipes]);
  };

  const handleMarkAsEaten = (recipeId: string) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === recipeId 
        ? { ...recipe, dateEaten: new Date() }
        : recipe
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('home-cooking')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'home-cooking'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Home Cooking
            </button>
            {/* Add more tabs here in the future */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {activeTab === 'home-cooking' && (
          <HomeCooking
            recipes={recipes}
            onAddRecipe={handleAddRecipe}
            onMarkAsEaten={handleMarkAsEaten}
          />
        )}
      </main>
    </div>
  );
}

export default App;
