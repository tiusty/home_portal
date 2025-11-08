import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden border border-gray-200"
    >
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{recipe.prepTime + recipe.cookTime} min</span>
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
            {recipe.difficulty}
          </span>
        </div>
        {recipe.dateEaten && (
          <div className="mt-2 text-xs text-gray-400">
            Eaten: {new Date(recipe.dateEaten).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}

