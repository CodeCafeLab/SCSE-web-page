import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Award,
  Users,
  Monitor,
} from "lucide-react";
import { Button } from "./ui/button";
import { useEnquiryForm } from "@/contexts/EnquiryFormContext";

export const SolutionSection = () => {
  const { openDialog } = useEnquiryForm();

  const scrollToForm = () => {
    openDialog();
  };

  const features = [
    {
      icon: BookOpen,
      title: "Learn From Industry Experts",
      description: "Structured learning path from basics to advanced concepts",
    },
    {
      icon: Briefcase,
      title: "Live Online Training",
      description: "Flexible online learning options to suit your schedule",
    },
    {
      icon: Award,
      title: "Certificate by 'DOS'",
      description:
        "Get certification by 'DOS' an ISO recognised solar institute",
    },
    {
      icon: Users,
      title: "Practical Training After Certification",
      description:
        "Gain hands-on practical training after certification to build real-world skills and confidence.",
    },
    {
      icon: Monitor,
      title: "Entrepreneurship Opportunity",
      description: "Free Suncity Solar entrepreneurship opportunity",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centered */}
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Your Path to Solar Success
            </h2>
            <p className="text-xl text-gray-600">
              Introducing the Solar Education System —{" "}
              <span className="font-semibold text-amber-600">
                Learn from Solar, Earn from Solar{" "}
              </span>
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A complete, step-by-step training program designed by solar
              industry experts. Whether you're a student, engineer, or
              entrepreneur — this course will turn you into a solar-ready
              professional.
            </p>
          </div>
        </div>

        {/* Features Grid - Centered */}
        <div className="w-full max-w-6xl mx-auto py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center text-amber-600 mb-6 shadow-inner border border-amber-50">
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card - Centered */}
        <div className="flex justify-center mt-12">
          <div className="w-full max-w-4xl">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-8 rounded-2xl border border-amber-100 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to transform your career?
              </h3>
              <p className="text-gray-600 mb-6">
                Join hundreds of professionals who've already started their
                solar journey with us.
              </p>
              <Button
                onClick={scrollToForm}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-lg py-6 px-8 rounded-full font-semibold shadow-lg hover:shadow-amber-200 transition-all duration-300 transform hover:scale-105"
              >
                Book Your Seat Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-gray-500 text-sm mt-4">
                Prefer speaking to our team first? Scroll down for contact
                details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
