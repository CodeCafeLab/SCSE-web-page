import { CheckCircle, Zap, Briefcase, TrendingUp, Globe } from "lucide-react";
import { Button } from "./ui/button";

export const OutcomeSection = () => {
  const outcomes = [
    {
      icon: Briefcase,
      title: "Start your own Solar EPC Business",
      description: "Gain the knowledge and confidence to launch and grow your own solar business"
    },
    {
      icon: CheckCircle,
      title: "Work with top solar companies",
      description: "Get hired by leading solar firms as a certified professional"
    },
    {
      icon: TrendingUp,
      title: "Earn ₹50,000+ per month",
      description: "Competitive salaries in the rapidly growing solar industry"
    },
    {
      icon: Globe,
      title: "Contribute to India's Green Energy Mission",
      description: "Be part of the sustainable energy revolution"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-6">
            <Zap className="w-4 h-4 mr-2 text-yellow-500" />
            Your Solar Career Starts Here
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-12">
            After Completing This Course, You Can…
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {outcomes.map((outcome, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      <outcome.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{outcome.title}</h3>
                    <p className="text-gray-600">{outcome.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Success Story / Before-After */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Success Story</h3>
                <blockquote className="text-lg text-gray-600 italic mb-6">
                  "This course transformed my career. I went from being an electrician to running my own solar installation company within a year!"
                </blockquote>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg mr-4">
                    RK
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Rajesh Kumar</p>
                    <p className="text-sm text-gray-500">Solar Entrepreneur, Delhi</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
                <div className="relative w-full h-64 md:h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6 bg-white rounded-lg shadow-inner border border-gray-200">
                      <div className="text-5xl mb-2">📊</div>
                      <p className="font-medium">Before & After</p>
                      <p className="text-sm text-gray-500 mt-1">See real student transformations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg py-6 px-8 rounded-full font-semibold shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:scale-105"
            >
              🌟 Start Your Success Story Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
