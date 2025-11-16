import { useState, useEffect } from "react";
import suncityLogo from "@/assets/suncity-logo.png";
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
            <img
              src={suncityLogo}
              alt="Discovery Of Success : A Solar Entrepreneur Programme by Suncity Solar"
              className="h-12 w-auto sm:h-14 md:h-16 lg:h-20 object-contain transition-all duration-300"
              width={80}
              height={80}
              loading="eager"
              style={{
                filter: "brightness(1.05) contrast(1.05)",
                imageRendering: "-webkit-optimize-contrast",
              }}
            />
          </div>

          {/* Tagline (Desktop) */}
          <div className="hidden md:block flex-1 px-4">
            <p className="text-center text-lg lg:text-2xl font-semibold text-gray-800">
              Target to prepare <span className="text-blue-700">1lakh +</span>{" "}
              Solar entrepreneur till 2027
            </p>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Pricing Box */}
            <div className="ml-4 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <span className="mr-1 text-xs text-gray-500 line-through sm:text-sm">
                      ₹15,700
                    </span>
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                      25% OFF
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 sm:text-xl">
                    ₹11,700
                  </div>
                </div>
                <button
                  onClick={() => {
                    scrollToSelector("#enrollment-form");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors whitespace-nowrap"
                  aria-label="Enroll Now"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>

          {/* Mobile CTA - Improved Layout with Button Inside Box */}
          <div className="md:hidden flex-shrink-0">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg px-2.5 py-1.5 border border-blue-200/50 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                {/* Pricing Info */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] xs:text-xs text-gray-500 line-through font-medium">
                      ₹15,700
                    </span>
                    <span className="rounded-full bg-red-500 text-white px-1.5 py-0.5 text-[9px] xs:text-[10px] font-bold leading-none shadow-sm">
                      25% OFF
                    </span>
                  </div>
                  <div className="text-base xs:text-lg font-bold text-gray-900 leading-tight">
                    ₹11,700
                  </div>
                </div>

                {/* Enhanced Enroll Button */}
                <button
                  onClick={() => scrollToSelector("#enrollment-form")}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-xs xs:text-sm px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0"
                  aria-label="Enroll Now"
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile tagline - Enhanced */}
        <div className="md:hidden pt-3 pb-3 border-t border-gray-100 bg-gradient-to-r from-blue-50/30 via-transparent to-blue-50/30">
          <p className="text-center text-[12px] xs:text-[13px] sm:text-sm font-semibold text-gray-800 px-2 leading-snug">
            Target to prepare{" "}
            <span className="text-blue-700 font-bold">1lakh +</span> Solar
            entrepreneur till 2027
          </p>
        </div>
      </div>
    </header>
  );
};
