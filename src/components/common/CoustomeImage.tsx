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
  const [imgSrc, setImgSrc] = useState('');

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
    <div className={`relative ${className}`}>
      {/* Placeholder / Skeleton Loader */}
      {isLoading && (
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundColor: placeholderColor,
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
      )}

      {/* Regular Image Tag */}
      {(imgSrc || error) && (
        <img
          src={error ? '/fallback-image.jpg' : imgSrc}
          alt={alt}
          className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          style={{ transition: 'opacity 0.3s ease-in-out' }}
        />
      )}
    </div>
  );
}