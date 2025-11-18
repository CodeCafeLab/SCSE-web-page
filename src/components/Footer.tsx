import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { LazyImage } from "./LazyImage";
import suncityLogoSrc from "@/assets/suncity-logo.png?w=320&format=webp&quality=80";
import suncityLogoSrcSet from "@/assets/suncity-logo.png?w=160;240;320&format=webp&quality=80&as=srcset";
import suncityLogoPlaceholder from "@/assets/suncity-logo.png?w=32&blur=30&format=webp&as=base64";
import { Mail, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-start">
            <div className="bg-white backdrop-blur-sm p-2 mb-4 rounded-lg shadow-inner">
              <LazyImage
                src={suncityLogoSrc}
                srcSet={suncityLogoSrcSet}
                placeholder={suncityLogoPlaceholder}
                sizes="(max-width: 640px) 120px, 160px"
                alt="Suncity Solar"
                className="h-10 sm:h-12 w-auto object-contain"
                width={160}
                height={60}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">
              Discovery of Success
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              A Business School of Suncity Solar, empowering future solar
              entrepreneurs with comprehensive training and support.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mt-4 sm:mt-0">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="flex items-center text-white/80 hover:text-accent transition-colors text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="flex items-center text-white/80 hover:text-accent transition-colors text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="flex items-center text-white/80 hover:text-accent transition-colors text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-use"
                  className="flex items-center text-white/80 hover:text-accent transition-colors text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Website Usage Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="flex items-center text-white/80 hover:text-accent transition-colors text-sm sm:text-base"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mt-4 sm:mt-0">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 mt-1">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div className="ml-3">
                  <a
                    href="mailto:dos@suncitysolar.in"
                    className="text-white/80 hover:text-accent transition-colors text-sm sm:text-base"
                  >
                    dos@suncitysolar.in
                  </a>
                </div>
              </li>

              <li className="flex">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div className="ml-3">
                  <a
                    href="https://www.google.com/maps/place/Suncity+Solar+Private+Limited/@26.847078,75.785479,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5a5b5b5b5b5b5b:0x5a5a5b5b5b5b5b5b!8m2!3d26.847078!4d75.785479!16s%2Fg%2F11wtdzfzn5?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-accent transition-colors text-sm sm:text-base"
                  >
                    <span className="block">3rd Floor, P.No. A-317A,</span>
                    <span className="block">Dr. Rajendra Prasad Nagar,</span>
                    <span className="block">Gopalpura Bypass, Mansarovar,</span>
                    <span className="block">Jaipur, Rajasthan - 302020</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/20 my-6" />

        <div className="justify-between items-center">
          <div className="text-center text-sm text-white/60">
            &copy; {currentYear} Discovery of Success - A Business School by
            Suncity Solar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
