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

          {/* Mobile CTA button (right side) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => scrollToSelector("#enrollment-form")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-3 py-2 rounded-lg transition-colors"
              aria-label="Enroll Now"
            >
              Enroll
            </button>
          </div>
        </div>

        {/* Mobile tagline */}
        <div className="md:hidden pt-2 pb-3 border-t border-gray-100">
          <p className="text-center text-[13px] sm:text-sm font-semibold text-gray-800">
            Target to prepare <span className="text-blue-700">1lakh +</span>{" "}
            Solar entrepreneur till 2027
          </p>
        </div>
      </div>
    </header>
  );
};
