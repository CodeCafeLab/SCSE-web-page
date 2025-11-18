import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface OptimizedImage {
  src: string;
  srcSet: string;
  placeholder: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface ImageCarouselProps {
  images: OptimizedImage[];
  interval?: number;
  className?: string;
  preloadCount?: number;
}

export const ImageCarousel = ({
  images,
  interval = 5000, // Increased interval for better user experience
  className = "",
  preloadCount = 1,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => {
      if (prev.has(index)) return prev;
      const updated = new Set(prev);
      updated.add(index);
      return updated;
    });
  }, []);

  useEffect(() => {
    for (let i = 1; i <= preloadCount; i++) {
      const nextIndex = (currentIndex + i) % images.length;
      if (!loadedImages.has(nextIndex)) {
        const img = new Image();
        img.src = images[nextIndex].src;
        img.srcset = images[nextIndex].srcSet;
        img.onload = () => handleImageLoad(nextIndex);
      }
    }
  }, [currentIndex, images, loadedImages, preloadCount, handleImageLoad]);

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [interval, isHovered, nextSlide]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-lg sm:rounded-xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full">
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          const isNext = index === (currentIndex + 1) % images.length;
          const isPrev =
            index === (currentIndex - 1 + images.length) % images.length;
          const isLoaded = loadedImages.has(index);

          if (!isActive && !isNext && !isPrev) return null;

          return (
            <div
              key={`${image.src}-${index}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                alt={image.alt ?? `Slide ${index + 1}`}
                className="w-full h-full object-cover"
                loading={isActive ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={isActive ? "high" : "low"}
                width={image.width ?? 1200}
                height={image.height ?? 675}
                onLoad={() => handleImageLoad(index)}
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
              />

              <div
                className="absolute inset-0 rounded-lg sm:rounded-xl"
                aria-hidden="true"
                style={{
                  backgroundImage: `url(${image.placeholder})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(20px)",
                  transform: "scale(1.05)",
                  opacity: isLoaded ? 0 : 1,
                  transition: "opacity 0.3s ease-out",
                }}
              />
            </div>
          );
        })}
      </div>

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

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={`dot-${index}`}
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
