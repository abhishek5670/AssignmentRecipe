// src/app/recipe/[id]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { mealApi } from '@/api/home';
import { RecipeDetailsSkeleton } from '../skeleton';
import { RecipeDetails } from './details';
import RecipeNotFound from './recipeerror';


interface RecipePageProps {
    params: Promise<{
      id: string;
    }>;
  }
  
  async function getRecipeData(id: string) {
    const meal = await mealApi.getMealById(id);
    if (!meal) {
      // handle meal not found
    }
    return meal;
  }
export default async function RecipePage({ params }: RecipePageProps) {
  const resolvedParams = await params;
  const recipe = await getRecipeData(resolvedParams.id);
  if(!recipe){
    return <RecipeNotFound />
  }

  return (
    <main className="min-h-screen bg-background pb-12">
     
     
        <Suspense fallback={<RecipeDetailsSkeleton />}>
          <RecipeDetails recipe={recipe} />
        </Suspense>
      
    </main>
  );
}