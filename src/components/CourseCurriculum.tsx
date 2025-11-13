import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, CheckCircle, Clock, Award } from "lucide-react";

interface CourseCurriculumProps {
  onEnrollClick: () => void;
}

const modules = [
  {
    title: "1st Week",
    duration: "1 Week",
    lessons: [
      "WELCOME",
      "INTRODUCE BY DOS",
      "ABOUT ENTREPRENEURSHIP",
      "HOW TO GENERATE ELECTRICITY BY SOLAR",
      "ABOUT SOLAR PRODUCT",
      "ABOUT SOLAR PRODUCT COMPONENTS",
      "WORK FLOW OF SOLAR PRODUCTS",
    ],
  },
  {
    title: "2nd Week",
    duration: "1 Week",
    lessons: [
      "ABOUT LATEST AND ADVANCED SOLAR TECHNOLOGY",
      "ABOUT SOLAR SYSTEM",
      "ABOUT SITE SURVEY",
      "SOLAR SECTOR",
      "DEVELOP SALES SKILL",
      "ABOUT INSTALLATION",
      "AFTER SALES SUPPORT SKILL",
    ],
  },
  {
    title: "3rd Week",
    duration: "1 Week",
    lessons: [
      "PERSONALITY DEVELOPMENT",
      "ONLINE EXAM",
      "RESULT",
      "SUNCITY SOLAR ENTREPRENEURSHIP SESSION",
      "CERTIFICATE",
      "ENTREPRENEURSHIP AGREEMENT (OPTIONAL)",
      "BUSINESS DEVELOPMENT SUPPORT BY SOLAR EXPERT",
    ],
  },
];

export const CourseCurriculum = ({ onEnrollClick }: CourseCurriculumProps) => {
  return (
    <section
      id="curriculum"
      className="py-20 "
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-amber-100">
            <BookOpen className="w-4 h-4 mr-2" />
            JOURNEY OF TRAINEE
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Course Modules
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            A 3-week intensive solar business training programme covering
            marketing, sales, technical, personality & skill development,
            business & entrepreneurship expertise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {modules.map((module, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-50 opacity-70"></div>
                <div className="relative p-6 flex justify-between items-center">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-lg font-bold mb-2">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {module.title}
                    </h3>
                    <span className="text-sm text-amber-600 font-medium">
                      {module.duration}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                </div>
              </div>
              <div className="p-6 pt-4">
                <ul className="space-y-3.5">
                  {module.lessons.map((lesson, i) => (
                    <li
                      key={i}
                      className="flex items-start group-hover:bg-amber-50/50 p-2 rounded-lg transition-colors duration-200"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">
                        {lesson}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 pb-6 pt-2">
                <div className="h-1 w-full bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 rounded-full mb-4"></div>
                <div className="flex items-center text-sm text-amber-700">
                  <Award className="w-4 h-4 mr-2" />
                  <span>Certificate on completion</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
