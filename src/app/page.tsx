import { Suspense } from 'react';
import { FeaturedCarousel } from '../components/home/FeaturedCarousel';
import { HorizontalScroll } from '../components/common/Horizontaller';
import { CustomImage } from '../components/common/CoustomeImage';
import { mealApi } from '@/api/home';
import { MealCard } from '@/components/common/MealCard';
import Link from 'next/link';

async function getHomePageData() {
  const [
    carouselMeals,
    categories,
    latestMeals,
    areas,
    popularIngredients
  ] = await Promise.all([
    mealApi.getCarouselMeals(),
    mealApi.getCategories(),
    mealApi.getLatestMeals(), // New API method needed
    mealApi.getAreas(),       // New API method needed
    mealApi.getPopularIngredients() // New API method needed
  ]);

  return {
    carouselMeals,
    categories,
    latestMeals,
    areas,
    popularIngredients
  };
}

export default async function HomePage() {
  const { 
    carouselMeals, 
    categories, 
    latestMeals, 
    areas, 
    popularIngredients 
  } = await getHomePageData();

  return (
    <main className="min-h-screen bg-background">
    {/* Hero Section */}
    <section className="bg-surface py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-primary text-center mb-8 animate-fade-in">
          Discover Delicious Recipes
        </h1>
        <p className="text-text-secondary text-center max-w-2xl mx-auto">
          Explore thousands of recipes from around the world
        </p>
      </div>
    </section>

    {/* Featured Carousel */}
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-text-primary mb-8">
          Featured Meals
        </h2>
        <Suspense fallback={<div className="h-64 bg-surface animate-pulse rounded-xl" />}>
          <FeaturedCarousel meals={carouselMeals} />
        </Suspense>
      </div>
    </section>

    {/* Latest Meals */}
    <section className="py-12 bg-surface">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-text-primary mb-8">
          Latest Additions
        </h2>
        <HorizontalScroll>
          {latestMeals.map((meal) => (
            <div key={meal.idMeal} className="w-80 flex-shrink-0">
              <MealCard meal={meal} />
            </div>
          ))}
        </HorizontalScroll>
      </div>
    </section>

    {/* Categories Grid */}
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-text-primary mb-8">
          Browse Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category:any) => (
            <MealCard key={category.idCategory} meal={category} cate={false} category={category.strCategory} />
          ))}
        </div>
      </div>
    </section>

    {/* Cuisines Around the World */}
    <section className="py-12 bg-surface">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-text-primary mb-8">
          Cuisines Around the World
        </h2>
        <div className="flex flex-wrap flex-row items-center justify-center gap-4 ">
          {areas.map((area:any) => (
            <Link href={`/meals?area=${area.strArea}`}
              key={area.strArea}
              className="p-4 bg-background rounded-lg text-center hover:border-primary hover:border hover:shadow-sm hover:shadow-prima transition-colors"

            >
              {/* <CustomImage src={area.}/> */}
              <h3 className="text-text-primary text-lg">{area.strArea}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Popular Ingredients */}
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-text-primary mb-8">
          Popular Ingredients
        </h2>
        <HorizontalScroll>
          {popularIngredients.map((ingredient:any) => (
            <Link href={`/meals?ingredient=${ingredient.strIngredient}`}
              key={ingredient.idIngredient} 
              className="w-64 flex-shrink-0 p-4 bg-surface rounded-lg mr-4"
            >
              <img 
                src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`}
                alt={ingredient.strIngredient}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-text-primary text-lg text-center">
                {ingredient.strIngredient}
              </h3>
            </Link>
          ))}
        </HorizontalScroll>
      </div>
    </section>
  </main>
  );
}