import { ChevronDown } from "lucide-react";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "Is this course online or offline?",
    answer: "Both! You can learn from anywhere or attend live practical sessions."
  },
  {
    question: "Do I get a certificate?",
    answer: "Yes, you'll receive a Govt. Recognized Certificate after completion."
  },
  {
    question: "Is there placement support?",
    answer: "Absolutely. We provide internship & job assistance to all students."
  },
  {
    question: "Who can join this course?",
    answer: "Students, engineers, or anyone interested in solar energy & business."
  },
  {
    question: "How long is the course?",
    answer: "4 weeks (Flexible schedule for working professionals)."
  }
];

export const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about the course
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <button
                  className={`w-full px-6 py-5 text-left flex justify-between items-center ${activeIndex === index ? 'bg-blue-50' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${activeIndex === index ? 'transform rotate-180' : ''}`} 
                  />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-40 pb-6' : 'max-h-0'}`}
                >
                  <p className="text-gray-600">
                    👉 {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Still have questions? We're here to help!
            </p>
            <a 
              href="https://wa.me/91XXXXXXXXXX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
            >
              💬 Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
