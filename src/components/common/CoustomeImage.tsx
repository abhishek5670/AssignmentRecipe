import React, { useState, useEffect } from 'react';

interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
  loadingPlaceholder?: string;
  placeholderColor?: string;
  fallbackSrc?: string;
}

export function CustomImage({
  src,
  alt,
  className = "",
  loadingPlaceholder = "/images/placeholder.svg", // Default loading placeholder
  placeholderColor = "bg-gray-200", // Tailwind background color for placeholder
  fallbackSrc = "/images/fallback.png" // Fallback image if src fails
}: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setHasError(false);

    // If no src, set error state
    if (!src) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    // Create a new image object
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      console.error('Error loading image:', src);
      setHasError(true);
      setIsLoading(false);
    };

    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  // Determine which image to show
  const displaySrc = hasError ? 'images/loading_gif.jpg' : imgSrc;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading Placeholder */}
      {isLoading && (
        <div 
          className={`absolute inset-0 ${placeholderColor} animate-pulse`} 
          aria-label="Loading"
        />
      )}

      {/* Image */}
      {!isLoading && (
        <img
          src={displaySrc}
          alt={alt}
          className={`
            w-full 
            h-full 
            object-cover 
            transition-opacity 
            duration-300 
            ${hasError ? 'opacity-50' : 'opacity-100'}
          `}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}