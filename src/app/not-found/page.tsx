import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-2xl mx-auto text-center px-4 py-8 rounded-2xl">
        <div className="mb-6">
          {/* Plate emoji with fork and knife */}
          <span className="text-7xl mb-4 block">🍽️</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Oops! This recipe seems to have vanished
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Looks like this dish isn't on our menu. Let's find you something delicious to cook instead!
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Browse All Recipes
          </Link>
          
          <div className="text-gray-500 text-sm mt-6">
            Suggested: Try searching for popular dishes or browse by category
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Link 
              href="/meals?category=Breakfast"
              className="px-4 py-2 bg-white border border-orange-200 rounded-full text-orange-600 hover:bg-orange-50 transition-colors"
            >
              Breakfast
            </Link>
            <Link 
              href="/meals?category=Dinner"
              className="px-4 py-2 bg-white border border-orange-200 rounded-full text-orange-600 hover:bg-orange-50 transition-colors"
            >
              Dinner
            </Link>
            <Link 
              href="/meals?category=Dessert"
              className="px-4 py-2 bg-white border border-orange-200 rounded-full text-orange-600 hover:bg-orange-50 transition-colors"
            >
              Desserts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}