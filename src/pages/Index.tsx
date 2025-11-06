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
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef } from "react";
import { CheckCircle, Lock, ShieldCheck } from "lucide-react";
import { CourseCurriculum } from "@/components/CourseCurriculum";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      {/* Hero Section - First Impression */}
      <HeroSection />

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
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Secure Your Spot in the Next Batch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Limited seats available. Start your solar career journey today!
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-4 w-full">
            <Card className="rounded-2xl shadow-xl border-0 overflow-hidden w-full">
              <div className="md:flex">
                <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-6 md:p-8 text-white">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        Enroll Now
                      </h2>
                      <p className="text-blue-100 mb-6">
                        Fill the form to start your solar career journey
                      </p>
                      <h3 className="text-xl font-bold mb-4">
                        Why Enroll Now?
                      </h3>
                      <ul className="space-y-3 text-blue-100">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Limited seats available</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Early bird pricing</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Guaranteed internship assistance</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Free career counseling session</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-8 pt-6 border-t border-blue-500/30">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">4.9/5</div>
                          <div className="text-sm text-blue-200">Rating</div>
                        </div>
                        <div className="h-10 w-px bg-blue-500/50"></div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">500+</div>
                          <div className="text-sm text-blue-200">
                            Students Trained
                          </div>
                        </div>
                        <div className="h-10 w-px bg-blue-500/50"></div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">90%</div>
                          <div className="text-sm text-blue-200">
                            Placement Rate
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-6 md:p-8">
                  <EnrollmentForm />
                </div>
              </div>
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                <div className="flex flex-col md:flex-row items-center justify-between flex-wrap gap-4">
                  <div className="text-sm text-gray-500 mb-4 md:mb-0">
                    Need help? Call us at +91-XXXXXXXXXX
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Lock className="h-4 w-4 mr-1 text-green-500" />
                      Secure Payment
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ShieldCheck className="h-4 w-4 mr-1 text-blue-500" />
                      Privacy Protected
                    </div>
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
      <CertificateSection />

      {/* Testimonials - Social Proof */}
      <TestimonialSection />

      {/* FAQ Section - Address Objections */}
      <FaqSection />

      {/* Final CTA Section - Last Chance */}
      <FinalCtaSection />

      {/* WhatsApp Button - Always Accessible */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
