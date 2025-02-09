// src/app/recipe/[id]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { mealApi } from '@/api/home';
import { RecipeDetailsSkeleton } from '../skeleton';
import { RecipeDetails } from './details';
import { RecipeErrorState } from '@/app/error/page';


interface RecipePageProps {
  params: {
    id: string;
  };
}

async function getRecipeData(id: string) {
  const meal = await mealApi.getMealById(id);
  if (!meal) {
    notFound();
  }
  return meal;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeData(params.id);

  return (
    <main className="min-h-screen bg-background pb-12">
      {/* <ErrorBoundary 
        fallback={<RecipeErrorState />}
      > */}
        <Suspense fallback={<RecipeDetailsSkeleton />}>
          <RecipeDetails recipe={recipe} />
        </Suspense>
      {/* </ErrorBoundary> */}
    </main>
  );
}