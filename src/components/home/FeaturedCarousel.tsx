'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

interface FeaturedCarouselProps {
  meals: Array<{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }>;
}

export function FeaturedCarousel({ meals }: FeaturedCarouselProps) {
  // Create a duplicated array to ensure smooth infinite loop
  const extendedMeals = [...meals, ...meals.slice(0, 3)];

  return (
    <div className="w-full">
      <Swiper
        grabCursor={true}
        loop={true}
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="w-full h-[300px] px-4"
      >
        {extendedMeals.map((meal, index) => (
          <SwiperSlide
            key={`${meal.idMeal}-${index}`}
            className="h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <Link href={`recipeinfo/${meal.idMeal}`} className="relative block w-full h-full group">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white font-semibold text-lg truncate">
                  {meal.strMeal}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default FeaturedCarousel;