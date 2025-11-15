import { Mail, MapPin } from "lucide-react";
import { EnquiryForm } from "./EnquiryForm";

export const FinalCtaSection = () => {

  return (
    <section id="enquiry-form" className="relative py-8 w-full bg-gradient-to-br from-blue-900 to-blue-800 text-white scroll-mt-28">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Get In Touch With Us
              </h2>
              <p className="text-blue-100 text-lg">
                Have questions? Our team is here to help you with any inquiries
                about our solar training programs.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Email */}
              <a
                href="mailto:dos@suncitysolar.in"
                className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300 group"
              >
                <div className="bg-blue-800/50 p-3 rounded-lg group-hover:bg-blue-700/70 transition-colors">
                  <Mail className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Email Us</h3>
                  <p className="text-blue-100">dos@suncitysolar.in</p>
                </div>
              </a>

              {/* WhatsApp
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
              </a> */}

              {/* Address */}
              <a
                href="https://www.google.com/search?sca_esv=2e82bc2b963fb339&rlz=1C5CHFA_enIN1029IN1029&cs=1&output=search&kgmid=/g/11wtdzfzn5&q=Suncity+Solar&shndl=30&shem=lcuae,uaasie,shrtsdl&source=sh/x/loc/uni/m1/1&kgs=2dfa33809b4eff91&utm_source=lcuae,uaasie,shrtsdl,sh/x/loc/uni/m1/1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300 group"
              >
                <div className="bg-blue-800/50 p-3 rounded-lg group-hover:bg-blue-700/70 transition-colors">
                  <MapPin className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Our Office</h3>
                  <address className="not-italic text-blue-100">
                    3rd Floor, P.No. A-317A,
                    <br />
                    Dr. Rajendra Prasad Nagar,
                    <br />
                    Gopalpura Bypass, Mansarovar,
                    <br />
                    Jaipur, Rajasthan - 302020
                  </address>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column - CTA Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Start Your Solar Career Today
              </h2>
              <p className="text-blue-100">
                Limited seats available for the next batch. Enroll now to secure
                your spot!
              </p>
            </div>

            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
};
