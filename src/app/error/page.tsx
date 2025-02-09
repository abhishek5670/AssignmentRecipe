// src/components/recipe/RecipeErrorState.tsx
import Link from 'next/link';

export function RecipeErrorState() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-semibold text-text-primary mb-4">
        Unable to Load Recipe
      </h2>
      <p className="text-text-secondary mb-8 text-center max-w-md">
        We encountered an error while loading this recipe. Please try again later or explore other recipes.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}

