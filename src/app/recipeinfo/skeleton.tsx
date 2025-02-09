// src/components/recipe/RecipeDetailsSkeleton.tsx
export function RecipeDetailsSkeleton() {
    return (
      <div className="max-w-4xl mx-auto px-4 animate-pulse">
        {/* Hero Section Skeleton */}
        <div className="h-96 bg-surface rounded-b-xl mb-6" />
        
        {/* Title Skeleton */}
        <div className="h-8 bg-surface rounded-lg w-3/4 mb-4" />
        <div className="flex gap-2 mb-8">
          <div className="h-6 bg-surface rounded-full w-24" />
          <div className="h-6 bg-surface rounded-full w-24" />
        </div>
  
        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ingredients Skeleton */}
          <div>
            <div className="h-8 bg-surface rounded-lg w-1/2 mb-4" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-surface rounded-lg" />
              ))}
            </div>
          </div>
  
          {/* Instructions Skeleton */}
          <div className="md:col-span-2">
            <div className="h-8 bg-surface rounded-lg w-1/2 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-surface rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }