import { useState, useEffect, useRef } from "react";
import suncityLogo from "@/assets/suncity-logo.png";
import { cn } from "@/lib/utils";
// If you have a custom Button component, use this import:
// import { Button } from "./ui/button";
// Otherwise, we'll use a standard button for now

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
        "sticky top-0 z-50 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300 w-full",
        scrolled ? "py-0": "py-0",
        "overflow-x-hidden"
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 w-full">
        <div className="flex items-start justify-start w-full">
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
            {/* Logo */}
            <div className="flex items-center justify-start p-1 sm:p-2">
              <img
                src={suncityLogo}
                alt="Discovery Of Success : A Solar Entrepreneur Programme by Suncity Solar"
                className="h-16 w-auto sm:h-18 md:h-24 object-contain transition-all duration-300"
                width={80}
                height={80}
                loading="eager"
                style={{
                  filter: 'brightness(1.05) contrast(1.05)',
                  imageRendering: '-webkit-optimize-contrast'
                }}
              />
            </div>

            {/* Pricing Box */}
            <div className="bg-white rounded-lg shadow-md p-2 sm:p-3 my-1 sm:my-0 sm:mr-3 border border-gray-200">
              <div className="flex items-center justify-between gap-3">
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <span className="text-gray-500 line-through text-xs sm:text-sm mr-1">₹15,700</span>
                    <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full">25% OFF</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">₹11,700</div>
                </div>
                <button 
                  onClick={() => {
                    const formSection = document.getElementById('enrollment-form');
                    if (formSection) {
                      formSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors whitespace-nowrap"
                >
                  Enroll Now
                </button>
              </div>
            </div>
        </div>
      </div>
      </div>
    </header>
  );
};