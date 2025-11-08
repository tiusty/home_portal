import { Recipe } from '../types/recipe';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
  onMarkAsEaten: () => void;
}

export default function RecipeDetail({ recipe, onClose, onMarkAsEaten }: RecipeDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{recipe.name}</h2>
            <p className="text-gray-600">{recipe.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">Prep Time</div>
              <div className="text-2xl font-semibold text-gray-800">{recipe.prepTime} min</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">Cook Time</div>
              <div className="text-2xl font-semibold text-gray-800">{recipe.cookTime} min</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">Servings</div>
              <div className="text-2xl font-semibold text-gray-800">{recipe.servings}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500">Difficulty</div>
              <div className="text-2xl font-semibold text-gray-800">{recipe.difficulty}</div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-800 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-gray-800">
                    <span className="font-semibold">{ingredient.amount} {ingredient.unit}</span>
                    {' '}{ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h3>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-gray-700 leading-relaxed pt-1">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tags */}
          {recipe.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              onClick={onMarkAsEaten}
              className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
            >
              Mark as Eaten
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

