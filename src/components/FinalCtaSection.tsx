import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "./ui/button";

export const FinalCtaSection = () => {
  const scrollToForm = () => {
    document.getElementById("enrollment-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Get In Touch With Us
              </h2>
              <p className="text-blue-100 text-lg">
                Have questions? Our team is here to help you with any inquiries about our solar training programs.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Email */}
              <a 
                href="mailto:info@suncitysolar.in" 
                className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300 group"
              >
                <div className="bg-blue-800/50 p-3 rounded-lg group-hover:bg-blue-700/70 transition-colors">
                  <Mail className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Email Us</h3>
                  <p className="text-blue-100">info@suncitysolar.in</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/919587211700" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300 group"
              >
                <div className="bg-green-800/50 p-3 rounded-lg group-hover:bg-green-700/70 transition-colors">
                  <Phone className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">WhatsApp Us</h3>
                  <p className="text-blue-100">+91 95872 11700</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <div className="bg-amber-800/50 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Our Office</h3>
                  <address className="not-italic text-blue-100">
                    3rd Floor, P.No. A-317A,<br />
                    Dr. Rajendra Prasad Nagar,<br />
                    Gopalpura Bypass, Mansarovar,<br />
                    Jaipur, Rajasthan - 302020
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - CTA Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Start Your Solar Career Today
              </h2>
              <p className="text-blue-100">
                Limited seats available for the next batch. Enroll now to secure your spot!
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-blue-100 text-sm font-medium">Full Name</label>
                  <input 
                    id="name" 
                    type="text"
                    placeholder="Your name" 
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-blue-100 text-sm font-medium">Phone Number</label>
                  <input 
                    id="phone" 
                    type="tel" 
                    placeholder="Your phone number" 
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-blue-100 text-sm font-medium">Email Address</label>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com" 
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-blue-100 text-sm font-medium">Your Message</label>
                <textarea 
                  id="message" 
                  rows={3} 
                  placeholder="How can we help you?" 
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              
              <Button 
                onClick={scrollToForm}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold py-3 text-lg mt-4 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Get More Information
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <p className="text-sm text-center text-blue-200/80 mt-4">
                We respect your privacy. Your information is safe with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
