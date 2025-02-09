'use client';
import { useState, useEffect } from 'react';
import { Loader2, Search, ChefHat } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { mealApi } from '@/api/home';
import { MealCard } from '@/components/common/MealCard';
import Pagination from '@/components/common/Pagination';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const [meals, setMeals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Adjust as needed

  // Get current meals
  const indexOfLastMeal = currentPage * itemsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let debounceTimer: NodeJS.Timeout;

    const performSearch = async () => {
      if (!searchValue.trim()) {
        setMeals([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      setCurrentPage(1); // Reset to first page on new search

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

    const newUrl = searchValue.trim()
      ? `/search?q=${encodeURIComponent(searchValue.trim())}`
      : '/search';
    window.history.replaceState({}, '', newUrl);

    debounceTimer = setTimeout(performSearch, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4">
        {/* Search Input */}
        <div className="sticky top-20 bg-background/95 backdrop-blur-sm pt-4 pb-4 z-10">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search recipes..."
              className="w-full px-4 py-3 pl-12 rounded-lg bg-surface border border-text-secondary/20 focus:outline-none focus:border-primary transition-colors"
              autoFocus
            />
            {isLoading ? (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-primary" />
            ) : (
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto mt-4">
          {error ? (
            <div className="flex flex-col items-center justify-center py-12 text-text-secondary">
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
                {currentMeals.map((meal) => (
                  <MealCard key={meal.idMeal} meal={meal} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalItems={meals.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : searchValue ? null : (
            <div className="flex flex-col items-center justify-center py-12 text-text-secondary">
              <ChefHat className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg">Start typing to search for recipes</p>
              <p className="mt-2">Try searching for ingredients or cuisine types</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}