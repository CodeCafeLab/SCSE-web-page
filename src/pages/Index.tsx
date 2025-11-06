import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { OutcomeSection } from "@/components/OutcomeSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import { CertificateSection } from "@/components/CertificateSection";
import { AboutSection } from "@/components/AboutSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { CheckCircle, Lock, ShieldCheck } from "lucide-react";
import { CourseCurriculum } from "@/components/CourseCurriculum";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Calculate remaining time for the offer (until December 12th, 2025, 11:59:59 PM)
  const calculateTimeLeft = () => {
    const now = new Date();
    // Set offer end to December 12th, 2025, 11:59:59 PM
    const offerEndDate = new Date(2025, 11, 12, 23, 59, 59); // Month is 0-indexed (11 = December)
    
    const difference = offerEndDate.getTime() - now.getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [offerEnded, setOfferEnded] = useState(false);
  const [nextBatchDate] = useState('01 Jan 2026');

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.days <= 0 && newTimeLeft.hours <= 0 && 
          newTimeLeft.minutes <= 0 && newTimeLeft.seconds <= 0) {
        setOfferEnded(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      {/* Hero Section - First Impression */}
      <HeroSection timeLeft={timeLeft} offerEnded={offerEnded} />
      
      {/* Certificate Section - Show Value Proposition */}
      <CertificateSection timeLeft={timeLeft} offerEnded={offerEnded} />

      {/* Problem Section - Create Urgency */}
      <ProblemSection />

      {/* Solution Section - Present Your Offer */}
      <SolutionSection />

      {/* Course Curriculum - Show Value */}
      <CourseCurriculum onEnrollClick={scrollToForm} />

      {/* Enrollment Form - Conversion Point */}
      <section
        id="enrollment-form"
        ref={formRef}
        className="relative bg-gradient-to-b from-white to-blue-50 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-yellow-100 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
              🚀 Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Secure Your Spot in the Next Batch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Only a few seats left! Begin your solar career journey today with our expert-led program.
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-4 w-full">
            <Card className="rounded-2xl shadow-2xl border-0 overflow-hidden w-full transform transition-all duration-300 hover:shadow-3xl">
              <div className="md:flex h-full">
                {/* Left Side - Benefits */}
                <div className="md:w-2/5 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-8 text-white relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-20 -left-10 w-40 h-40 bg-yellow-400/20 rounded-full"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-3 flex items-center">
                        <span className="bg-white/10 p-2 rounded-lg mr-3">🎯</span>
                        Enroll Now
                      </h2>
                      <p className="text-blue-100 text-lg mb-8">
                        Take the first step towards your solar career today
                      </p>
                      
                      <h3 className="text-xl font-bold mb-6 pb-3 border-b border-blue-500/30 flex items-center">
                        <span className="mr-2">✨</span> Why Choose Us?
                      </h3>
                      
                      <ul className="space-y-4">
                        {[
                          { text: 'Limited seats available', icon: '👥' },
                          { text: 'Early bird pricing', icon: '⏰' },
                          { text: 'Guaranteed internship', icon: '💼' },
                          { text: 'Free career counseling', icon: '🎓' },
                          { text: 'Industry-recognized certification', icon: '🏆' }
                        ].map((item, index) => (
                          <li key={index} className="flex items-start group">
                            <span className="bg-white/10 p-1.5 rounded-lg mr-3 group-hover:bg-white/20 transition-all duration-300">
                              {item.icon}
                            </span>
                            <span className="text-blue-50 font-medium">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Stats Section */}
                    <div className="mt-10 pt-6 border-t border-blue-500/30">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {[
                          { value: '4.9/5', label: 'Rating', icon: '⭐' },
                          { value: '500+', label: 'Students', icon: '👨‍🎓' },
                          { value: '90%', label: 'Entrepreneur Success', icon: '🎯' }
                        ].map((stat, index) => (
                          <div key={index} className="group">
                            <div className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300">
                              {stat.value}
                            </div>
                            <div className="text-sm text-blue-200 mt-1">
                              {stat.label}
                            </div>
                            <div className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {stat.icon}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Form */}
                <div className="md:w-3/5 p-8 bg-white">
                  <div className="relative h-full">
                    <div className="absolute -top-8 right-0 bg-yellow-400 text-yellow-900 text-sm font-semibold px-4 py-1 rounded-l-full">
                      Special Offer: Save 20%
                    </div>
                    <EnrollmentForm />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section - Build Trust */}
      <BenefitsSection />

      {/* Certificate Section - Social Proof */}

      {/* Testimonials - Social Proof */}
      <TestimonialSection />

      {/* FAQ Section - Address Objections */}
      <FaqSection />

      {/* Final CTA Section - Last Chance */}
      <FinalCtaSection />

      {/* WhatsApp Button - Always Accessible */}
      <WhatsAppButton />

      <AboutSection />
    </div>
  );
};

export default Index;
