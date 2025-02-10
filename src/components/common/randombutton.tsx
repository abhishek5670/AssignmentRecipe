'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mealApi } from '@/api/home';
import { Dice1, Dices } from 'lucide-react';

export function RandomRecipeButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRandomRecipe = async () => {
    try {
      setIsLoading(true);
      const response = await mealApi.randomMeals();
      if (response && response?.length > 0) {
        router.push(`/recipeinfo/${response[0].idMeal}`);
      }
    } catch (error) {
      console.error('Error fetching random meal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=' relative' >
      <button 
        onClick={handleRandomRecipe}
        disabled={isLoading}
        className="bg-primary flex flex-row space-x-2 text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-300"
      >
        {isLoading ? (
          <div className="animate-spin">
            <Dices size={24} />
          </div>
        ) : (
          <Dices size={24} />
        )}
        <span className='text-lg font-semibold '>Random Recipe</span>
      </button>
    </div>
  );
}

export default RandomRecipeButton;