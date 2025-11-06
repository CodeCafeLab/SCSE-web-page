import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CourseCurriculumProps {
  onEnrollClick: () => void;
}

export const CourseCurriculum = ({ onEnrollClick }: CourseCurriculumProps) => {
  return (
    <section id="curriculum" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What You'll Learn
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            A comprehensive curriculum designed to take you from beginner to advanced
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Add your curriculum modules here */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Module 1: Introduction</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Course Overview</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Setting Up Your Environment</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Module 2: Core Concepts</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Fundamental Principles</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Advanced Techniques</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            onClick={onEnrollClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium rounded-full transition-colors"
          >
            Enroll Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
