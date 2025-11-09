import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, CheckCircle, Clock, Award } from "lucide-react";

interface CourseCurriculumProps {
  onEnrollClick: () => void;
}

const modules = [
  {
    title: "1 Week",
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
    title: "2 Week",
    duration: "2 Week",
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
    title: "3 Week",
    duration: "3 Week",
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
    <section id="curriculum" className="py-16 bg-gradient-to-b ">
      <div className="container mx-auto px-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center bg-amber-100 text-amber-800 px-6 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            JOURNEY OF TRAINEE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Course Modules
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="p-6   flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {module.title}
                </h3>
                {/* <span className="text-sm font-medium bg-white/30 px-3 py-1 rounded-full">
                  {module.duration}
                </span> */}
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
      </div>
    </section>
  );
};
