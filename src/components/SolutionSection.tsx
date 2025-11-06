import { ArrowRight, BookOpen, Briefcase, Award, Users, Monitor } from "lucide-react";
import { Button } from "./ui/button";

export const SolutionSection = () => {
  const scrollToForm = () => {
    document.getElementById("enrollment-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: BookOpen,
      title: "Beginner to Expert Curriculum",
      description: "Structured learning path from basics to advanced concepts"
    },
    {
      icon: Briefcase,
      title: "Real Projects & Hands-On Practice",
      description: "Work on actual solar installation projects"
    },
    {
      icon: Award,
      title: "Govt. Recognized Certification",
      description: "Earn a certificate that's valued by employers"
    },
    {
      icon: Users,
      title: "Placement & Business Support",
      description: "Get help finding jobs or starting your own business"
    },
    {
      icon: Monitor,
      title: "Online + Offline Classes",
      description: "Flexible learning options to suit your schedule"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Section Header */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Your Path to Solar Success
            </h2>
            <p className="text-xl text-gray-600">
              Introducing the Solar Education System — <span className="font-semibold text-amber-600">Learn. Build. Earn.</span>
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A complete, step-by-step training program designed by solar industry experts.
              Whether you're a student, engineer, or entrepreneur — this course will turn you into a solar-ready professional.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                  <feature.icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
            
            {/* CTA Card */}
            <div className="md:col-span-2 lg:col-span-3">
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-8 rounded-2xl border border-amber-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to transform your career?</h3>
                <p className="text-gray-600 mb-6">Join hundreds of professionals who've already started their solar journey with us.</p>
                <Button 
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-lg py-6 px-8 rounded-full font-semibold shadow-lg hover:shadow-amber-200 transition-all duration-300 transform hover:scale-105"
                >
                  🚀 Start Your Solar Journey Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
