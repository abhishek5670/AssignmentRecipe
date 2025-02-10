import Link from "next/link";
import { CustomImage } from "./CoustomeImage";

interface MealCardProps {
  meal: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strArea?: string;
    strCategoryThumb?: string;
  };
  cate?: boolean;
  category?: string;
}

export function MealCard({ meal, cate = true, category }: MealCardProps) {
  return (
    <Link
    href={cate ? `/recipeinfo/${meal.idMeal}` : `/meals?category=${category}`}
    className="block  relative bg-background hover:text-primary rounded-xl overflow-hidden shadow-md hover:shadow-sm  hover:shadow-primary transition-all duration-300 transform hover:-translate-y-1"
  >
    <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
      <CustomImage
       src={meal.strMealThumb || meal.strCategoryThumb || ""}
       alt={meal.strMeal}
       className="w-full h-full transition-transform duration-300 hover:scale-105"
       placeholderColor="bg-surface"
      />
      {/* <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" /> */}
    </div>

    <div className="p-4 space-y-2">
      <h3 className="text-text-primary font-semibold text-lg truncate hover:text-primary transition-colors">
        {meal.strMeal}
      </h3>

      <div className="flex flex-wrap gap-2 text-sm">
        {meal.strCategory && (
          <span className="px-2 py-1 bg-surface/80 text-text-secondary rounded-full">
            {meal.strCategory}
          </span>
        )}
        {meal.strArea && (
          <span className="px-2 py-1 bg-surface/80 text-text-secondary rounded-full">
            {meal.strArea}
          </span>
        )}
      </div>
    </div>
  </Link>
  );
}
