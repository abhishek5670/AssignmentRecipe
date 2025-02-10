import { Suspense } from 'react';
import SearchContent from './search';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background ">
    <Suspense fallback={
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
    </main>
  );
}