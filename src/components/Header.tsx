import { useState, useEffect } from "react";
import suncityLogo from "@/assets/suncity-logo.png";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300 w-full",
        scrolled ? "py-2" : "py-3",
        "overflow-x-hidden"
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 w-full">
        <div className="flex items-center justify-center w-full">
          {/* Logo */}
          <div className="flex items-center justify-center p-1 sm:p-2">
            <img
              src={suncityLogo}
              alt="Suncity Solar Learning Program"
              className="h-12 w-auto sm:h-16 md:h-20 object-contain transition-all duration-300"
              width={80}
              height={80}
              loading="eager"
              style={{
                filter: 'brightness(1.05) contrast(1.05)',
                imageRendering: '-webkit-optimize-contrast'
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};