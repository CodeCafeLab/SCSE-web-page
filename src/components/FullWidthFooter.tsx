import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export const FullWidthFooter = () => {
  return (
    <footer className="w-full bg-gray-900 text-white overflow-hidden">
      {/* Top Section - Contact Info */}
      <div className="w-full bg-blue-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 p-3 rounded-full mb-3">
                <MapPin className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Our Location</h3>
              <p className="text-gray-300 text-sm">
                Suncity Solar Education Center<br />
                Green Energy Park, Sector 62<br />
                Noida, Uttar Pradesh 201309
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 p-3 rounded-full mb-3">
                <Phone className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-300 text-sm">
                +91-XXXXXXXXXX<br />
                Mon-Sat: 9:00 AM - 7:00 PM
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 p-3 rounded-full mb-3">
                <Mail className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300 text-sm">
                info@suncitysolar.com<br />
                support@suncitysolar.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Quick Links and Social */}
      <div className="w-full bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Suncity Solar</h3>
              <p className="text-gray-400 text-sm">
                Empowering the future with sustainable solar energy solutions and education.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <span className="sr-only">YouTube</span>
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Placements</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Our Courses */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Our Courses</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Solar PV Design & Installation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Solar Panel Manufacturing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Solar Water Pumping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Solar Rooftop Installation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Solar Energy Storage</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white text-sm"
                />
                <button 
                  type="submit" 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-2 px-4 rounded transition-colors text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="w-full bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Suncity Solar. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
