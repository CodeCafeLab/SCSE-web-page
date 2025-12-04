import { useState, useEffect } from "react";
import { LazyImage } from "./LazyImage";
import suncityLogoSrc from "../assets/suncity-logo.png";
import { Button } from "@/components/ui/button";
import { useEnquiryForm } from "@/contexts/EnquiryFormContext";
import { cn } from "@/lib/utils";

const scrollToSelector = (selector: string) => {
  if (typeof document === "undefined") return;

  const element = document.querySelector(selector);

  if (element instanceof HTMLElement) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { openDialog } = useEnquiryForm();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Set initial scroll state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-gray-100 transition-all duration-300 overflow-x-hidden",
        scrolled
          ? "bg-white/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/70"
          : "bg-white/80 shadow-sm backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 w-full">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between py-3 sm:py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <LazyImage
              src={suncityLogoSrc}
              sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
              alt="Discovery Of Success : A Solar Entrepreneur Programme by Suncity Solar"
              className="h-12 w-auto sm:h-14 md:h-16 lg:h-20 object-contain transition-all duration-300"
              width={160}
              height={80}
              eager
              style={{
                filter: "brightness(1.05) contrast(1.05)",
                imageRendering: "-webkit-optimize-contrast",
              }}
            />
          </div>

          {/* Tagline (Desktop) */}
          <div className="hidden md:block flex-1 px-4">
            <p className="text-center text-lg lg:text-2xl font-semibold text-gray-800">
              Target to prepare <span className="text-blue-700">1 lakh+</span>{" "}
              Solar Entrepreneurs by 2027
            </p>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-8">
            <Button
              onClick={() => {
                localStorage.setItem(
                  "enrollment_button_id",
                  "BTN-HEADER-DESKTOP"
                );
                openDialog("BTN-HEADER-DESKTOP");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
              aria-label="Book Your Seat"
            >
              Book Your Seat
            </Button>
          </div>

          {/* Mobile CTA - Improved Layout with Button Inside Box */}
          <div className="md:hidden flex-shrink-0">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg px-2.5 py-1.5 border border-blue-200/50 shadow-sm flex justify-center">
              <Button
                onClick={() => {
                  localStorage.setItem(
                    "enrollment_button_id",
                    "BTN-HEADER-MOBILE"
                  );
                  openDialog("BTN-HEADER-MOBILE");
                }}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs xs:text-sm px-4 xs:px-5 py-2 xs:py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap"
                aria-label="Book Your Seat"
              >
                Book Your Seat
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile tagline - Enhanced */}
        <div className="md:hidden pt-3 pb-3 border-t border-gray-100 bg-gradient-to-r from-blue-50/30 via-transparent to-blue-50/30">
          <p className="text-center text-[12px] xs:text-[13px] sm:text-sm font-semibold text-gray-800 px-2 leading-snug">
            Target to prepare{" "}
            <span className="text-blue-700 font-bold">1 lakh+</span> Solar
            Entrepreneurs by 2027
          </p>
        </div>
      </div>
    </header>
  );
};
