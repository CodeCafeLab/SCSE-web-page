import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Calendar, Award, Clock, CreditCard, Check, Zap, Users, BookOpen, ChevronLeft, ChevronRight, Grid3x3, X } from "lucide-react";
import { ImageCarousel } from "@/components/ImageCarousel";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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


  const features = [
    { text: '3 weeks training', icon: Clock },
    { text: 'Entrepreneur certified', icon: Award },
    { text: 'Eligible for advanced practical training', icon: Check },
  ];

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const galleryImages = [image1, image2, image3, image4];

  // Add custom scrollbar styles
  const customStyles = `
    /* Custom Scrollbar */
    .scrollbar-thin::-webkit-scrollbar {
      height: 6px;
    }
    .scrollbar-thin::-webkit-scrollbar-track {
      background: #1f2937; /* bg-gray-800 */
      border-radius: 3px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background-color: #4b5563; /* bg-gray-600 */
      border-radius: 3px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
      background-color: #6b7280; /* bg-gray-500 */
    }
    
    /* Smooth transitions */
    .gallery-transition {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `;

  // Add styles to document head
  if (typeof document !== 'undefined' && !document.getElementById('gallery-styles')) {
    const style = document.createElement('style');
    style.id = 'gallery-styles';
    style.innerHTML = customStyles;
    document.head.appendChild(style);
  }

  const shimmerAnimation = `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 2s infinite linear;
    }
  `;

  if (typeof document !== 'undefined' && !document.getElementById('shimmer-animation')) {
    const style = document.createElement('style');
    style.id = 'shimmer-animation';
    style.innerHTML = shimmerAnimation;
    document.head.appendChild(style);
  }

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
            <span>Rated 4.9/5 by 50,000+ Students</span>
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
                <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                  <ImageCarousel images={galleryImages} interval={3000} className="h-full" />
        
                  {/* Enhanced Gallery Button with Pulse Effect */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <div className="relative">
                      {/* Pulsing Circle */}
                      <div className="absolute -inset-1.5 bg-white/30 rounded-full animate-pulse"></div>
                      {/* Main Button */}
                      <button 
                        onClick={() => setIsGalleryOpen(true)}
                        className={cn(
                          "relative flex items-center gap-2 px-4 py-2  from-blue-600 to-blue-800 text-white rounded-full",
                          "text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg",
                          "shadow-md backdrop-blur-sm border border-white/20",
                          "group"
                        )}
                      >
                        <Grid3x3 className="w-4 h-4 transition-transform group-hover:scale-110" />
                        <span>View Gallery</span>
                        {/* Subtle shine effect on hover */}
                        <span className="absolute inset-0 overflow-hidden rounded-full">
                          <span className="absolute inset-0  from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full"></span>
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Gallery Modal */}
                  <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
                    <DialogContent className="max-w-2xl p-0 bg-transparent border-0 shadow-none overflow-hidden">
                      <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                        {/* Header with Close Button and Counter */}
                        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent">
                          <div className="text-white font-medium">
                            <span className="text-blue-400">{selectedImage + 1}</span>
                            <span className="text-gray-400"> / {galleryImages.length}</span>
                          </div>
                          <button 
                            onClick={() => setIsGalleryOpen(false)}
                            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Close gallery"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {/* Main Image Container */}
                        <div className="relative aspect-video bg-black">
                          {/* Main Image with Fade Transition */}
                          <div className="relative w-full h-full">
                            {galleryImages.map((img, index) => (
                              <img 
                                key={index}
                                src={img}
                                alt={`Gallery image ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                                  selectedImage === index ? 'opacity-100' : 'opacity-0'
                                }`}
                              />
                            ))}
                          </div>
                          
                          {/* Navigation Arrows */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/60 text-white rounded-full hover:bg-black/80 transition-all duration-200 z-10 backdrop-blur-sm hover:scale-110"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(prev => (prev + 1) % galleryImages.length);
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/60 text-white rounded-full hover:bg-black/80 transition-all duration-200 z-10 backdrop-blur-sm hover:scale-110"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </div>
                        
                        {/* Thumbnails with Scrollable Container */}
                        <div className="bg-gray-900 p-4 border-t border-gray-800">
                          <div className="flex space-x-3 overflow-x-auto p-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            {galleryImages.map((img, index) => (
                              <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative flex-shrink-0 w-20 h-16 rounded-md overflow-hidden transition-all duration-200 ${
                                  selectedImage === index 
                                    ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900 scale-105' 
                                    : 'opacity-70 hover:opacity-100 hover:ring-1 hover:ring-white/30'
                                }`}
                              >
                                <img 
                                  src={img} 
                                  alt={`Thumbnail ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                {/* Active indicator */}
                                {selectedImage === index && (
                                  <div className="absolute inset-0 bg-blue-500/20"></div>
                                )}
                              </button>
                            ))}
                          </div>
                          
                          {/* Image Caption */}
                          <div className="mt-2 text-center text-sm text-gray-400">
                            Image {selectedImage + 1} of {galleryImages.length}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
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