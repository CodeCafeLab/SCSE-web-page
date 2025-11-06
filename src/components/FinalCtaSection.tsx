import { ArrowRight, Phone, Clock, Users, CheckCircle, MapPin, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

export const FinalCtaSection = () => {
  const scrollToForm = () => {
    document.getElementById("enrollment-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full py-16 md:py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white overflow-x-hidden">
      {/* Decorative elements */}
      <div className=" inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0dGVybiBpZD0icGF0dGVybi1iZyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L3N2Zz4=')]"></div>
      </div>
      
      <div className="w-full max-w-none px-0 relative">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            🚀 Limited Time Offer
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Secure Your Spot in the Next Batch
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Limited seats available. Start your solar career journey today!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-yellow-400 mb-2">
                <Clock className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold">6 Weeks</div>
              <div className="text-sm text-blue-100">Intensive Training</div>
            </div>
            
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-yellow-400 mb-2">
                <CheckCircle className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-blue-100">Job Assistance</div>
            </div>
            
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-yellow-400 mb-2">
                <Users className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold">20 Seats</div>
              <div className="text-sm text-blue-100">Only Per Batch</div>
            </div>
            
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-yellow-400 mb-2">
                <Phone className="w-8 h-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-blue-100">Support</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button 
              onClick={scrollToForm}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 text-lg py-5 px-8 rounded-full font-semibold shadow-lg hover:shadow-yellow-200/30 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              Secure My Spot Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 text-lg py-5 px-8 rounded-full font-semibold backdrop-blur-sm hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <Phone className="w-5 h-5 mr-2" />
              Talk to an Expert
            </Button>
          </div>

          {/* Contact Info */}
          <div className="border-t border-white/10 pt-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-medium mb-1">Our Location</h4>
                <p className="text-sm text-blue-100">
                  Suncity Solar Education Center<br />
                  Green Energy Park, Sector 62<br />
                  Noida, Uttar Pradesh 201309
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-medium mb-1">Call Us</h4>
                <p className="text-sm text-blue-100">
                  +91-XXXXXXXXXX<br />
                  Mon-Sat: 9:00 AM - 7:00 PM
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-medium mb-1">Email Us</h4>
                <p className="text-sm text-blue-100">
                  info@solaredu.com<br />
                  support@solaredu.com
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-blue-100 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
