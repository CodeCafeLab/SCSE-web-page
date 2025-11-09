import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import suncityLogo from "@/assets/suncity-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col items-start">
            <div className="bg-white shadow-sm border border-gray-100 mb-4 rounded rounded-md">
              <img
                src={suncityLogo}
                alt="Suncity Solar"
                className="h-12 w-auto object-contain"
                width={120}
                height={48}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Discovery of Success</h3>
            <p className="text-white/80 text-sm">
              A Business School of Suncity Solar
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-white/80 text-sm">
              Discovery of Success is India's leading solar education program, empowering individuals with skills for a sustainable future.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link to="/" className="hover:text-accent transition-colors block">Home</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-accent transition-colors block">Privacy policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-accent transition-colors block">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="hover:text-accent transition-colors block">Website Usage Terms</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-accent transition-colors block">Refund Policy</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:dos@suncitysolar.in" className="hover:text-accent transition-colors">dos@suncitysolar.in</a>
              </li>
              {/* <li className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919587211700" className="hover:text-accent transition-colors">+91 95872 11700</a> (WhatsApp)
              </li> */}
              <li className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a 
                  href="https://www.google.com/search?sca_esv=2e82bc2b963fb339&rlz=1C5CHFA_enIN1029IN1029&cs=1&output=search&kgmid=/g/11wtdzfzn5&q=Suncity+Solar&shndl=30&shem=lcuae,uaasie,shrtsdl&source=sh/x/loc/uni/m1/1&kgs=2dfa33809b4eff91&utm_source=lcuae,uaasie,shrtsdl,sh/x/loc/uni/m1/1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  3rd Floor, P.No. A-317A, Dr. Rajendra Prasad Nagar,<br />Gopalpura Bypass, Mansarovar,<br />Jaipur, Rajasthan - 302020
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-white/20 mb-6" />
        
        <div className="text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Discovery of Success - A Business School by Suncity Solar.  All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
