import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  interval?: number;
  className?: string;
  preloadCount?: number;
  autoPlay?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
}

export const ImageCarousel = ({
  images,
  interval = 5000, // Increased interval for better user experience
  className = "",
  preloadCount = 2,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isHovered, setIsHovered] = useState(false);

  // Memoize the nextSlide function
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Memoize the prevSlide function
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Handle image load
  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  }, []);

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      // Preload next 'preloadCount' images
      for (let i = 1; i <= preloadCount; i++) {
        const nextIndex = (currentIndex + i) % images.length;
        if (!loadedImages.has(nextIndex)) {
          const img = new Image();
          img.src = images[nextIndex];
          img.onload = () => handleImageLoad(nextIndex);
        }
      }
    };

    preloadImages();
  }, [currentIndex, images, loadedImages, preloadCount, handleImageLoad]);

  // Auto-advance slides
  useEffect(() => {
    if (isHovered) return; // Pause on hover

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval, isHovered, nextSlide]);

  // Generate srcset for responsive images
  const getSrcSet = (image: string) => {
    // This is a simplified example - in a real app, you'd generate multiple sizes
    // and provide them in the srcset attribute
    return `${image}?w=400 400w, ${image}?w=800 800w, ${image}?w=1200 1200w`;
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-lg sm:rounded-xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          const isLoaded = loadedImages.has(index);
          const isNext = index === (currentIndex + 1) % images.length;
          const isPrev =
            index === (currentIndex - 1 + images.length) % images.length;

          // Only render active, next, and previous slides for better performance
          if (!isActive && !isNext && !isPrev) return null;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={image}
                srcSet={getSrcSet(image)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                loading={isActive ? "eager" : "lazy"}
                onLoad={() => handleImageLoad(index)}
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  // Prevent layout shifts
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                width="1200"
                height="675"
                decoding="async"
                fetchPriority={isActive ? "high" : "low"}
              />
              {/* Low-quality image placeholder (LQIP) */}
              {!isLoaded && (
                <div
                  className="absolute inset-0 bg-gray-200"
                  style={{
                    backgroundImage: `url(${image}?w=20&q=10)`,
                    backgroundSize: "cover",
                    filter: "blur(8px)",
                    transform: "scale(1.05)",
                    transition: "opacity 0.3s ease-out",
                    opacity: 1,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-6" : "bg-white/50 w-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
