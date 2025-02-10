// src/lib/api/mealDb.ts

import { apiCall } from "./core";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
}

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;



export const mealApi = {
  searchMeals: async (searchTerm: string) => {
    const data = await apiCall(`${BASE_URL}/search.php`, { s: searchTerm });
    return data.meals || [];
  },

  getLatestMeals: async () => {
    try {
      const categories = ['Beef', 'Chicken', 'Pork', 'Lamb', 'Pasta', 'Seafood', 'Goat', 'Vegan'];

      const meals = await Promise.all(
        categories.map(async (category) => {
          const filterData = await apiCall(`${BASE_URL}/filter.php`, { c: category });

          if (filterData.meals?.length > 0) {
            const randomIndex = Math.floor(Math.random() * filterData.meals.length);
            const mealData = await apiCall(`${BASE_URL}/lookup.php`, { i: filterData.meals[randomIndex].idMeal });
            return mealData.meals?.[0];
          }
          return null;
        })
      );

      return meals.filter(Boolean);
    } catch (error) {
      console.error('Error getting latest meals:', error);
      return [];
    }
  },

  getAreas: async () => {
    const data = await apiCall(`${BASE_URL}/list.php`, { a: 'list' });
    return data.meals || [];
  },
  randomMeals: async () => {
    const data = await apiCall(`${BASE_URL}/random.php`);
    return data.meals || [];
  },

  getPopularIngredients: async () => {
    const data = await apiCall(`${BASE_URL}/list.php`, { i: 'list' });
    return (data.meals || []).slice(0, 10);
  },

  getCategories: async () => {
    const data = await apiCall(`${BASE_URL}/categories.php`);
    return data.categories || [];
  },

  getMealById: async (id: string) => {
    const data = await apiCall(`${BASE_URL}/lookup.php`, { i: id });
    return data.meals?.[0] || null;
  },

  getMealsByIngredient: async (ingredient: string) => {
    const data = await apiCall(`${BASE_URL}/filter.php`, { i: ingredient });
    return data.meals || [];
  },

  getMealsByCategory: async (category: string) => {
    const data = await apiCall(`${BASE_URL}/filter.php`, { c: category });
    return data.meals || [];
  },

  getMealsByArea: async (area: string) => {
    const data = await apiCall(`${BASE_URL}/filter.php`, { a: area });
    return data.meals || [];
  },

  getCarouselMeals: async () => {
    try {
      const categories = [
        'Breakfast', 'Dessert', 'Side', 'Starter',
        'Vegetarian', 'Miscellaneous', 'Pizza', 'Rice'
      ];

      const meals = await Promise.all(
        categories.map(async (category) => {
          const filterData = await apiCall(`${BASE_URL}/filter.php`, { c: category });

          if (filterData.meals?.length > 0) {
            const randomIndex = Math.floor(Math.random() * filterData.meals.length);
            const mealData = await apiCall(`${BASE_URL}/lookup.php`, { i: filterData.meals[randomIndex].idMeal });
            return mealData.meals?.[0];
          }
          return null;
        })
      );

      return meals.filter(Boolean);
    } catch (error) {
      console.error('Error getting carousel meals:', error);
      return [];
    }
  }
};