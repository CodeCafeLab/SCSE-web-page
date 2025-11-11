import { useState, useEffect, useRef } from "react";
import suncityLogo from "@/assets/suncity-logo.png";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    
    // Set initial scroll state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open on mobile
    document.body.style.overflow = isMenuOpen ? '' : 'hidden';
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300 w-full",
        scrolled ? "py-0" : "py-0",
        "overflow-x-hidden"
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 w-full">
        <div className="flex items-center justify-between w-full py-2 sm:py-0">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={suncityLogo}
              alt="Discovery Of Success : A Solar Entrepreneur Programme by Suncity Solar"
              className="h-14 w-auto sm:h-16 md:h-20 lg:h-24 object-contain transition-all duration-300"
              width={80}
              height={80}
              loading="eager"
              style={{
                filter: 'brightness(1.05) contrast(1.05)',
                imageRendering: '-webkit-optimize-contrast'
              }}
            />
          </div>

          {/* Desktop Navigation and CTA */}
          <div className="hidden md:flex items-center space-x-6">
         

            {/* Pricing Box */}
            <div className="bg-white rounded-lg shadow-md p-2 border border-gray-200 ml-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <span className="text-gray-500 line-through text-xs sm:text-sm mr-1">₹15,700</span>
                    <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full">25% OFF</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900">₹11,700</div>
                </div>
                <button 
                  onClick={() => {
                    const formSection = document.getElementById('enrollment-form');
                    if (formSection) {
                      formSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors whitespace-nowrap"
                  aria-label="Enroll Now"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
          )}
        >
          <div className="pt-4 pb-3 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 px-2">
              <a 
                href="#features" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#curriculum" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Curriculum
              </a>
              <a 
                href="#testimonials" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#faq" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
            </nav>
            
            {/* Mobile CTA */}
            <div className="mt-4 px-2">
              <div className="bg-white rounded-lg shadow-md p-3 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <div className="flex items-center justify-end">
                      <span className="text-gray-500 line-through text-sm mr-2">₹15,700</span>
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">25% OFF</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">₹11,700</div>
                  </div>
                  <button 
                    onClick={() => {
                      const formSection = document.getElementById('enrollment-form');
                      if (formSection) {
                        formSection.scrollIntoView({ behavior: 'smooth' });
                      }
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};