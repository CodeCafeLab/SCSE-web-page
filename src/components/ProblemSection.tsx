import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

export const ProblemSection = () => {
  const scrollToForm = () => {
    document.getElementById("enrollment-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center mb-16 space-y-8">
          {/* Section Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              The Growing Solar Opportunity
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              India Needs Solar Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The world is switching to clean energy faster than ever. Yet, there's a massive shortage of skilled solar engineers and installers. <span className="text-blue-600 font-medium">The future is bright!</span> <span className="text-yellow-500">🌞</span>
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-amber-500 mb-2">10x</div>
              <p className="text-gray-600">Solar Jobs Growing Faster than the overall job market</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-amber-500 mb-2">2M+</div>
              <p className="text-gray-600">Solar Jobs expected by 2030 in India</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-amber-500 mb-2">💰</div>
              <p className="text-gray-600">High-income career & business opportunities in solar</p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <Button 
              onClick={scrollToForm}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-lg py-6 px-8 rounded-full font-semibold shadow-lg hover:shadow-amber-200 transition-all duration-300 transform hover:scale-105"
            >
              ⚡ Be Part of the Revolution
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 -translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 translate-x-10 translate-y-10"></div>
        </div>
      </div>
    </section>
  );
};
