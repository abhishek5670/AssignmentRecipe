// src/components/recipe/RecipeDetails.tsx

import { CustomImage } from "@/components/common/CoustomeImage";
import Link from "next/link";

interface Ingredient {
  name: string;
  measure: string;
}

interface RecipeDetailsProps {
  recipe: any; // Type this properly based on your API response
}

export function RecipeDetails({ recipe }: RecipeDetailsProps) {
  // Extract ingredients and measures
  const ingredients: Ingredient[] = Array.from({ length: 20 }, (_, i) => i + 1)
    .map(i => ({
      name: recipe[`strIngredient${i}`],
      measure: recipe[`strMeasure${i}`]
    }))
    .filter(ing => ing.name && ing.name.trim() !== '');

  // Split instructions into steps
  const instructions = recipe.strInstructions
    .split(/\r\n|\r|\n/)
    .filter((step: string) => step.trim() !== '');

  const tags = recipe.strTags ? recipe.strTags.split(',') : [];

  return (
    <article className="max-w-4xl mx-auto px-4">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-96 overflow-hidden rounded-b-xl">
          <CustomImage
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
          
            className="w-full h-full"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-6">
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            {recipe.strMeal}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-surface text-text-secondary text-sm">
              {recipe.strCategory}
            </span>
            <span className="px-3 py-1 rounded-full bg-surface text-text-secondary text-sm">
              {recipe.strArea}
            </span>
          </div>
        </div>
      </section>

      {/* Tags */}
      {tags.length > 0 && (
        <section className="mt-6">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Grid Layout for Details */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Ingredients */}
        <section className="md:col-span-1">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Ingredients
          </h2>
          <ul className="space-y-3">
            {ingredients.map((ing, index) => (
              <li 
                key={index}
                className="flex justify-between items-center p-3 bg-surface rounded-lg hover:text-primary"
              >
                <Link href={`/meals?ingredient=${ing.name}`} className="text-text-primary hover:text-primary">{ing.name}</Link>
                <span className="text-text-secondary hover:text-accent">{ing.measure}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Instructions */}
        <section className="md:col-span-2">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Instructions
          </h2>
          <ol className="space-y-4">
            {instructions.map((step: string, index: number) => (
              <li key={index} className="relative pl-8">
                <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <p className="text-text-secondary">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Additional Information */}
      {recipe.strYoutube && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Video Tutorial
          </h2>
          <a 
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
          >
            <span>Watch on YouTube</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </section>
      )}

      {recipe.strSource && (
        <section className="mt-4">
          <a 
            href={recipe.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-primary transition-colors text-sm"
          >
            Original Recipe Source
          </a>
        </section>
      )}
    </article>
  );
}