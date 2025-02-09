'use client';

import { useState, useEffect } from 'react';
import { Loader2, Search, ChefHat } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { mealApi } from '@/api/home';
import { MealCard } from '@/components/common/MealCard';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const [meals, setMeals] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search effect
  useEffect(() => {
    if (!searchValue.trim()) {
      setMeals([]);
      return;
    }

    const searchMeals = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await mealApi.searchMeals(searchValue.trim());
        if (results.length === 0) {
          setError('No recipes found. Try different keywords.');
        }
        setMeals(results);
      } catch (err) {
        setError('Failed to fetch recipes. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    // Update URL without triggering navigation
    const newUrl = searchValue.trim() 
      ? `/search?q=${encodeURIComponent(searchValue.trim())}` 
      : '/search';
    window.history.replaceState({}, '', newUrl);

    const debounceTimer = setTimeout(searchMeals, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  return (
    <div className="container mx-auto px-4 pt-24">
      {/* Search Form */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search recipes..."
            className="w-full px-4 py-3 pl-12 rounded-lg bg-surface/50 border border-text-secondary/20 focus:outline-none focus:border-primary transition-colors"
            autoFocus
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-text-secondary">Searching for recipes...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-text-secondary">
            <ChefHat className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg">{error}</p>
            <p className="mt-2">Try searching for ingredients or cuisine types</p>
          </div>
        ) : meals.length > 0 ? (
          <>
            <h2 className="text-lg font-semibold mb-6">
              Found {meals.length} recipes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
               <MealCard meal={meal}/>
              ))}
            </div>
          </>
        ) : searchValue ? null : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-text-secondary">
            <ChefHat className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg">Start typing to search for recipes</p>
            <p className="mt-2">Try searching for ingredients or cuisine types</p>
          </div>
        )}
      </div>
    </div>
  );
}