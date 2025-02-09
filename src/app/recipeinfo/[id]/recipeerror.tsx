import Link from "next/link";

// src/app/recipe/[id]/not-found.tsx
export default function RecipeNotFound() {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Recipe Not Found
        </h1>
        <p className="text-text-secondary mb-8 text-center max-w-md">
          The recipe you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          href="/"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Discover More Recipes
        </Link>
      </div>
    );
  }