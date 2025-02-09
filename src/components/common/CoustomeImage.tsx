'use client'

import { useState, useEffect } from 'react';

interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
}

export function CustomImage({
  src,
  alt,
  className = "",
  placeholderColor = "#1a1a1a"
}: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setError(false);

    // Create a new image object
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      console.error('Error loading image:', src);
      setError(true);
      setIsLoading(false);
    };

    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder / Skeleton Loader */}
      {isLoading && (
        <img
          src={'/images/loading_gif.jpg' }
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* Regular Image Tag */}
      {(imgSrc || error) && (
        <img
          src={error ? '/images/loading_gif.jpg' : imgSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity rounded-md duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
    </div>
  );
}