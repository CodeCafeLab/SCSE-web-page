import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { OutcomeSection } from "@/components/OutcomeSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { CertificateSection } from "@/components/CertificateSection";
import { AboutSection } from "@/components/AboutSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle, Lock, ShieldCheck } from "lucide-react";
import { CourseCurriculum } from "@/components/CourseCurriculum";
import { useEnquiryForm } from "@/contexts/EnquiryFormContext";

interface IndexProps {
  advisorId?: string;
}

export const Index = ({ advisorId }: IndexProps) => {
  const formRef = useRef<HTMLDivElement>(null);
  const { openDialog } = useEnquiryForm();

  // Open enquiry form dialog instead of scrolling
  const scrollToForm = () => {
    localStorage.setItem("enrollment_button_id", "BTN-CURRICULUM");
    openDialog("BTN-CURRICULUM");
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
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [offerEnded, setOfferEnded] = useState(false);
  const [nextBatchDate] = useState("01 Jan 2026");

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days <= 0 &&
        newTimeLeft.hours <= 0 &&
        newTimeLeft.minutes <= 0 &&
        newTimeLeft.seconds <= 0
      ) {
        setOfferEnded(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fbff] via-white to-white overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection timeLeft={timeLeft} offerEnded={offerEnded} />

      {/* Main content container */}
      <div className="relative z-10 flex flex-col ">
        {/* Certificate Section - Show Value Proposition */}
        <section className="scroll-mt-28">
          <CertificateSection timeLeft={timeLeft} offerEnded={offerEnded} />
        </section>

        {/* Problem Section - Create Urgency */}
        <section className="scroll-mt-28">
          <ProblemSection />
        </section>

        {/* Solution Section - Present Your Offer */}
        <section className="scroll-mt-28">
          <SolutionSection />
        </section>

        {/* Course Curriculum - Show Value */}
        <section id="curriculum" className="scroll-mt-28">
          <CourseCurriculum onEnrollClick={scrollToForm} />
        </section>

        {/* Benefits Section - Build Trust */}
        <section className="scroll-mt-28">
          <BenefitsSection />
        </section>

        {/* Certificate Section - Social Proof */}

        {/* Testimonials - Social Proof */}
        <section id="testimonials" className="scroll-mt-28">
          <TestimonialSection />
        </section>

        {/* FAQ Section - Address Objections */}
        <section id="faq" className="scroll-mt-28">
          <FaqSection />
        </section>

        {/* WhatsApp Button - Always Accessible */}
        <section className="scroll-mt-28">
          <AboutSection />
        </section>

        {/* Final CTA Section - Last Chance */}
        <section className="scroll-mt-28">
          <FinalCtaSection />
        </section>
      </div>
    </div>
  );
};
