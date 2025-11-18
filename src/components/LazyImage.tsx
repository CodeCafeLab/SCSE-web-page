import { ImgHTMLAttributes, useEffect, useRef, useState } from "react";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  placeholder?: string;
  rootMargin?: string;
  eager?: boolean;
}

export const LazyImage = ({
  src,
  srcSet,
  sizes,
  placeholder,
  rootMargin = "200px",
  eager = false,
  loading,
  ...props
}: LazyImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(eager);

  useEffect(() => {
    if (eager || isVisible) return;

    const element = imageRef.current;
    if (!element) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [eager, isVisible, rootMargin]);

  return (
    <img
      ref={imageRef}
      src={isVisible || !placeholder ? src : placeholder}
      srcSet={isVisible ? srcSet : undefined}
      sizes={isVisible ? sizes : undefined}
      loading={loading ?? (eager ? "eager" : "lazy")}
      decoding="async"
      {...props}
    />
  );
};

