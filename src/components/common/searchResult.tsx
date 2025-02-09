'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { mealApi } from '@/api/home';
import { MealCard } from './MealCard';

interface SearchResultsProps {
  searchTerm: string;
}

export function SearchResults({ searchTerm }: SearchResultsProps) {
  const [meals, setMeals] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchMeals = async () => {
      if (!searchTerm.trim()) {
        setMeals([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await mealApi.searchMeals(searchTerm);
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

    searchMeals();
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 mt-24">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center text-text-secondary py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <MealCard meal={meal}/>
          ))}
        </div>
      )}
    </div>
  );
}