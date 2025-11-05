import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
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
                <a href="#" className="hover:text-accent transition-colors">About Course</a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">Refund Policy</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Email: info@suncitysolar.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Mumbai, Maharashtra, India</li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-white/20 mb-6" />
        
        <div className="text-center text-sm text-white/60">
          <p>&copy; 2025 Discovery of Success - Suncity Solar Learning Program. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
