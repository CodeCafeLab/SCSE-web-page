import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Calendar, Award, Clock, CreditCard, Check, Zap, Users, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageCarousel } from "@/components/ImageCarousel";
import { useState, useEffect } from "react";

// Import images
import image1 from "../assets/0D4A8808.png";
import image2 from "../assets/0D4A8821.png";
import image3 from "../assets/0D4A8874.png";
import image4 from "../assets/0D4A8955.png";
  
interface HeroSectionProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  offerEnded: boolean;
}

export const HeroSection = ({ timeLeft, offerEnded }: HeroSectionProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if mobile on mount
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById("enrollment-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePayment = () => {
    const paymentFormUrl = 'https://payments.cashfree.com/forms/solar-training-jan2026';
    window.open(paymentFormUrl, '_blank', 'noopener,noreferrer');
  };

  // Format time left for display
  const formatTimeLeft = () => {
    if (!timeLeft) return '';
    return `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
  };

  const features = [
    { text: '3 weeks training', icon: Clock },
    { text: 'Entrepreneur certified', icon: Award },
    { text: 'Eligible for advisory practical training', icon: Check },
  ];

  return (
    <section id="home" className="relative w-full bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-500 text-white py-8 sm:py-10 md:py-12 lg:py-16 overflow-x-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80)',
          backgroundAttachment: 'fixed'
        }}
        aria-hidden="true"
      ></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30"></div>
      
      <div className="w-full max-w-full px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white/90 mb-6 sm:mb-8">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 text-yellow-300 fill-yellow-300 flex-shrink-0" />
            <span>Rated 4.9/5 by 500+ Students</span>
          </div>  
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Join India's Leading Solar Business Team
              </h1>
            
              <p className="text-sm xs:text-base sm:text-lg text-white/90 max-w-2xl mx-auto lg:mx-0 pt-2">
                Get certified in just 3 weeks and launch your career in the solar industry. Limited seats available!
              </p>
              
              {/* Features List */}
              <div className="space-y-2.5 sm:space-y-3 pt-1">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                      <div className="flex-shrink-0 bg-white/20 p-1 rounded-full">
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-300" />
                      </div>
                      <span className="text-xs xs:text-sm sm:text-base">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
                <Button 
                  onClick={scrollToForm}
                  size={isMobile ? 'default' : 'lg'}
                  className="w-full xs:w-auto flex-1 sm:flex-none bg-white text-amber-700 hover:bg-amber-50 font-medium text-sm sm:text-base md:text-lg px-4 sm:px-6 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Enroll Now <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

              </div>
              
              {/* Batch Info */}
              <div className="pt-2">
                <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm md:text-base">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1.5 sm:mr-2 text-yellow-300 flex-shrink-0" />
                  Next batch starts: <span className="font-semibold ml-1">01 Jan 2026</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image Carousel */}
            <div className="relative mt-8 lg:mt-0 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
              <div className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 md:p-2 shadow-2xl h-full">
                <ImageCarousel 
                  images={[image1, image2, image3, image4]}
                  interval={3000}
                  className="h-full"
                />
              
                
                {/* Decorative Elements */}
                <div className="hidden sm:block absolute -top-5 -left-5 w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
                <div className="hidden sm:block absolute -bottom-5 -right-5 w-16 h-16 sm:w-24 sm:h-24 bg-amber-500/20 rounded-full blur-xl"></div>
              </div>
              
              {/* Decorative Elements */}
              <div className="hidden sm:block absolute -top-5 -left-5 w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
              <div className="hidden sm:block absolute -bottom-5 -right-5 w-16 h-16 sm:w-24 sm:h-24 bg-amber-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
          
          {/* Floating Timer */}
          <div className="mt-8 sm:mt-12 md:mt-16 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg max-w-3xl mx-auto">
            <div className="text-center">
              <p className="text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3">Offer ends in:</p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px]">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.days}</span>
                  <span className="text-[10px] sm:text-xs md:text-sm opacity-80">Days</span>
                </div>
                <div className="flex items-center text-xl sm:text-2xl md:text-3xl font-bold">:</div>
                <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px]">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="text-[10px] sm:text-xs md:text-sm opacity-80">Hours</span>
                </div>
                <div className="flex items-center text-xl sm:text-2xl md:text-3xl font-bold">:</div>
                <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px]">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="text-[10px] sm:text-xs md:text-sm opacity-80">Minutes</span>
                </div>
                <div className="flex items-center text-xl sm:text-2xl md:text-3xl font-bold">:</div>
                <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px]">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                  <span className="text-[10px] sm:text-xs md:text-sm opacity-80">Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};