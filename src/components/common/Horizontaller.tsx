'use client'

import { useRef, useState, useEffect } from 'react';

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function HorizontalScroll({ children, className = "", title }: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScroll({
          left: scrollLeft > 0,
          right: scrollWidth > clientWidth
        });
      }
    };

    checkScroll();
  }, [children]); // Recheck when children change

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}

      {/* Scroll Container */}
      <div className="relative group">
        {canScroll.left && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 text-primary p-2 rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div
          ref={scrollRef}
          className={`flex overflow-x-auto no-scrollbar space-x-4 py-4 ${className}`}
          onScroll={() => {
            if (scrollRef.current) {
              const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
              setCanScroll({
                left: scrollLeft > 0,
                right: scrollLeft < scrollWidth - clientWidth
              });
            }
          }}
        >
          {children}
        </div>

        {canScroll.right && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 text-primary p-2 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
