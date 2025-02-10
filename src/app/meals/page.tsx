'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { mealApi } from '@/api/home';
import { MealCard } from '@/components/common/MealCard';
import Pagination from '@/components/common/Pagination';
import RecipeNotFound from '../recipeinfo/[id]/recipeerror';

const FilteredMealsContent = () => {
  const searchParams = useSearchParams();
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterInfo, setFilterInfo] = useState({
    type: '',
    value: ''
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Get current meals
  const indexOfLastMeal = currentPage * itemsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - itemsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);
      setCurrentPage(1); // Reset to first page on new filter
      
      const ingredient = searchParams.get('ingredient');
      const category = searchParams.get('category');
      const area = searchParams.get('area');

      try {
        let result = [];
        let type = '';
        let value = '';

        if (ingredient) {
          result = await mealApi.getMealsByIngredient(ingredient);
          type = 'ingredient';
          value = ingredient;
        } else if (category) {
          result = await mealApi.getMealsByCategory(category);
          type = 'category';
          value = category;
        } else if (area) {
          result = await mealApi.getMealsByArea(area);
          type = 'area';
          value = area;
        } else {
          throw new Error('No filter parameter provided');
        }

        if (!result || result.length === 0) {
          throw new Error('No meals found');
        }
        
        setFilterInfo({ type, value });
        setMeals(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <RecipeNotFound />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-surface rounded-lg shadow-sm mb-6 p-6">
        <h1 className="text-2xl font-bold text-text-primary">
          {filterInfo.type === 'ingredient' && `Meals with ${filterInfo.value}`}
          {filterInfo.type === 'category' && `${filterInfo.value} Dishes`}
          {filterInfo.type === 'area' && `${filterInfo.value} Cuisine`}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentMeals.map((meal:any) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={meals.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const FilteredMealsScreen = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <FilteredMealsContent />
    </Suspense>
  );
};

export default FilteredMealsScreen;