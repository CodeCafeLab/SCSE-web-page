import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, CheckCircle, Clock, Award } from "lucide-react";

interface CourseCurriculumProps {
  onEnrollClick: () => void;
}

const modules = [
  {
    title: "SESSION SUMMARY",
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
    title: "SESSION SUMMARY",
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
    title: "SESSION SUMMARY",
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
    <section id="curriculum" className="py-16 bg-gradient-to-b ">
      <div className="container mx-auto px-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center bg-amber-100 text-amber-800 px-6 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            JOURNEY OF TRAINEE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            SESSION SUMMARY
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

        <div className="max-w-3xl mx-auto    from-amber-50 to-yellow-50 rounded-2xl p-8 text-center">
          <div className="inline-flex items-center bg-white px-4 py-2 rounded-full text-sm font-medium text-amber-700 mb-4">
            <Award className="w-4 h-4 mr-2" />
            CERTIFICATE
          </div>
          <Button
            onClick={onEnrollClick}
            className=" from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-lg py-6 px-8 rounded-full font-semibold"
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
