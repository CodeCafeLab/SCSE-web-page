import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sun, Settings, Zap, Briefcase, CheckCircle, Clock, Award, UserCheck } from "lucide-react";

interface CourseCurriculumProps {
  onEnrollClick: () => void;
}

const modules = [
  {
    title: "Module 1: Solar Energy Fundamentals",
    icon: <Sun className="w-6 h-6" />,
    duration: "1 Week",
    lessons: [
      "Introduction to Solar Energy",
      "Solar Radiation & Site Assessment",
      "Basic Electrical Concepts",
      "Solar Panel Technologies",
      "Safety Standards & Regulations"
    ],
    color: "from-amber-100 to-yellow-100"
  },
  {
    title: "Module 2: System Components",
    icon: <Zap className="w-6 h-6" />,
    duration: "1 Week",
    lessons: [
      "Solar Panels & Arrays",
      "Inverters & Charge Controllers",
      "Battery Storage Systems",
      "Mounting Structures",
      "Balance of System Components"  
    ],
    color: "from-blue-50 to-cyan-50"
  },
  {
    title: "Module 3: Design & Installation",
    icon: <Settings className="w-6 h-6" />,
    duration: "1 Week",
    lessons: [
      "System Sizing & Design",
      "Electrical Wiring & Connections",
      "Mounting & Installation",
      "Testing & Commissioning",
      "Maintenance & Troubleshooting"
    ],
    color: "from-green-50 to-emerald-50"
  },
  {
    title: "Module 4: Business & Career",
    icon: <Briefcase className="w-6 h-6" />,
    duration: "1 Week",
    lessons: [
      "Solar Business Models",
      "Sales & Marketing Strategies",
      "Project Costing & Pricing",
      "Customer Acquisition",
      "Career Pathways in Solar"
    ],
    color: "from-purple-50 to-violet-50"
  }
];

export const CourseCurriculum = ({ onEnrollClick }: CourseCurriculumProps) => {
  return (
    <section id="curriculum" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center bg-amber-100 text-amber-800 px-6 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Comprehensive Curriculum
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Master Solar Technology with Our Expert-Led Program
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A 12-week intensive program covering everything from basic concepts to advanced installation techniques and business development.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {modules.map((module, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className={`p-6 bg-gradient-to-r ${module.color} flex justify-between items-center`}>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-white/30 backdrop-blur-sm flex items-center justify-center mr-4">
                    {module.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                </div>
                <span className="text-sm font-medium bg-white/30 px-3 py-1 rounded-full">
                  {module.duration}
                </span>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {module.lessons.map((lesson, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 text-center">
          <div className="inline-flex items-center bg-white px-4 py-2 rounded-full text-sm font-medium text-amber-700 mb-4">
            <Award className="w-4 h-4 mr-2" />
            Certification Included
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Ready to Start Your Solar Career?</h3>
          <p className="text-gray-600 mb-6">Join our next batch and get certified as a Solar enterpreneur</p>
          <Button 
            onClick={onEnrollClick}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-lg py-6 px-8 rounded-full font-semibold shadow-lg hover:shadow-amber-200 transition-all duration-300 transform hover:scale-105"
          >
            Enroll Now for Just ₹11,700
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-gray-500 mt-4 flex items-center justify-center">
            <Clock className="w-4 h-4 mr-1" /> Next batch starts: 01 Jan 2026
          </p>
        </div>
      </div>
    </section>
  );
};
