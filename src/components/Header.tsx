import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import suncityLogo from "@/assets/suncity-logo.jpg";
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  isMobile?: boolean;
}

export const Header = ({ isMobile = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Curriculum', id: 'curriculum' },
    { name: 'Benefits', id: 'benefits' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'FAQ', id: 'faq' },
  ];

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300 w-full',
        scrolled ? 'py-2' : 'py-3',
        'overflow-x-hidden' // Prevent horizontal overflow
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 w-full">
        <div className="flex flex-wrap items-center justify-between w-full">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex-shrink-0 bg-white p-1 sm:p-2 rounded-lg sm:rounded-xl shadow-sm border border-gray-100">
                <img
                  src={suncityLogo}
                  alt="Suncity Solar Learning Program"
                  className="h-10 w-auto sm:h-14 md:h-16 object-contain"
                  width={64}
                  height={64}
                />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                  Discovery of Success
                </h1>
                <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-600">
                  India's #1 Solar Education & Success Program
                </p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center ml-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu} 
                className="text-gray-700 hover:bg-gray-100 rounded-full p-1.5 sm:p-2"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm lg:text-base font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Price Box - Desktop */}
          <div className="hidden md:block ml-2 lg:ml-4">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-2 sm:p-3 lg:p-4 shadow-sm border border-gray-100 min-w-[140px]">
              <p className="text-xs lg:text-sm font-medium text-gray-500">Course Fee</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                ₹11,700 <span className="text-xs lg:text-sm font-normal text-gray-400 line-through">₹15,000</span>
              </p>
              <p className="text-[10px] lg:text-xs text-green-600 font-medium mt-0.5">22% OFF</p>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="md:hidden w-full mt-3 pb-3"
            style={{
              maxHeight: 'calc(100vh - 80px)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2.5 text-base text-gray-800 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 px-1">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm font-medium text-gray-600">Course Fee</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  ₹11,700 <span className="text-sm font-normal text-gray-400 line-through">₹15,000</span>
                </p>
                <p className="text-xs text-green-600 font-medium mt-1">22% OFF - Limited Time Offer</p>
                <button 
                  onClick={() => scrollToSection('enrollment-form')}
                  className="mt-3 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2.5 px-4 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
