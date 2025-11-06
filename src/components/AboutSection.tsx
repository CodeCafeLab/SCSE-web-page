import { CheckCircle, Sun, Leaf, Users, Award, Shield, ArrowRight, ShieldCheck } from "lucide-react";
import React from 'react';

export const AboutSection = () => {
  return (
    <section id="about" className="relative py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-blue-50 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)] -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12 px-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            About Our Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Empowering <span className="text-blue-600">India's Solar Revolution</span> 
            <span className="block text-yellow-500">Since 2019</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto">
            Towards a Golden Future with the Power of the Sun
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16 px-4 sm:px-6">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
              Our Story
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Discovery of Success – 
              <span className="text-blue-600">A Business School of Suncity Solar</span>
            </h3>
            
            <div className="space-y-4 bg-blue-50/50 p-6 rounded-xl border-l-4 border-yellow-400">
              <p className="text-blue-900 font-medium text-lg italic">
                "सौर ऊर्जा से राष्ट्र निर्माण की ओर..."
              </p>
              <p className="text-blue-900 font-medium text-lg">
                "Towards Nation-Building through Solar Revolution..."
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="leading-relaxed">
                Shree Chandramangal Suncity Marketing Pvt. Ltd. (Suncity Solar) is a leading company committed to transforming solar energy solutions. Established on <span className="font-semibold text-blue-700">June 14, 2019</span> under the Companies Act, 2013, we are an ISO 9001:2015 certified and government-registered startup.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { text: 'ISO 9001:2015 Certified', icon: <ShieldCheck className="w-5 h-5 text-yellow-500" /> },
                { text: 'BIS Certified', icon: <CheckCircle className="w-5 h-5 text-blue-500" /> },
                { text: 'FICCI Member', icon: <Award className="w-5 h-5 text-green-500" /> },
                { text: 'ASSOCHAM Member', icon: <Award className="w-5 h-5 text-amber-500" /> },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-1 rounded-lg inline-block mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-md">
                <Sun className="w-6 h-6 text-yellow-300" />
                <h4 className="text-xl font-bold text-white">Our Product Portfolio</h4>
              </div>
            </div>
            <ul className="grid gap-3">
              {[
                { name: 'Solar Panels', icon: '☀️' },
                { name: 'Solar Inverters', icon: '🔌' },
                { name: 'Solar Batteries', icon: '🔋' },
                { name: 'Solar Water Pumps', icon: '💧' },
                { name: 'Solar Water Heaters', icon: '♨️' },
                { name: 'Solar Street Lights', icon: '💡' },
                { name: 'Solar Home Systems', icon: '🏠' }
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors group">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-700 font-medium group-hover:text-blue-700 transition-colors">{item.name}</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-600 transition-colors" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Our Mission */}
        <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-3xl overflow-hidden mb-20 mx-4 sm:mx-6">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-yellow-400 rounded-full mix-blend-overlay"></div>
          </div>
          <div className="relative z-10 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-yellow-300 text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                <span>Our Commitment</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                Mission & <span className="text-yellow-400">Vision</span>
              </h3>
              <p className="text-blue-100 mb-8 text-lg leading-relaxed max-w-4xl">
                With a commitment to energy independence, environmental sustainability, and technological innovation, Suncity Solar is leading India's solar revolution, empowering individuals and businesses to grasp clean, renewable energy for a brighter and self-reliant future.
              </p>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Our Approach</h4>
                <p className="text-blue-100 leading-relaxed">
                  We've identified energy scarcity and unemployment as critical obstacles to national progress. Our solution combines renewable energy adoption with sustainable employment generation through our unique DIRECT SELLING MODEL.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Our Vision</h4>
                <p className="text-blue-100 leading-relaxed">
                  To foster a self-reliant future where clean energy solutions and economic growth are ensured through teamwork, contributing to our nation's vision of a green, energy-independent Bharat.
                </p>
              </div>
          </div>
        </div>

        {/* DOS Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-50 text-yellow-700 text-sm font-medium mb-4">
              Our Training Program
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600">Discovery of Success</span> (DOS)
            </h3>
            <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-white max-w-4xl mx-auto">
              Empowering individuals to become solar energy leaders through comprehensive training and mentorship
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-16">
            <div className="grid md:grid-cols-3 divide-x divide-gray-100">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Holistic Development</h4>
                <p className="text-gray-600">
                  Training individuals through "गुकुल" to become skilled solar advisors with both technical and business expertise
                </p>
              </div>
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Industry Knowledge</h4>
                <p className="text-gray-600">
                  In-depth understanding of solar technology, market trends, and sustainable business practices
                </p>
              </div>
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Values-Based</h4>
                <p className="text-gray-600">
                  Developing leaders rooted in spirituality, environmental consciousness, and ethical business practices
                </p>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Program Highlights
            </h4>
            <div className="space-y-4">
              {[
                {
                  title: "Technical Expertise",
                  description: "Comprehensive training in solar technology, installation, and maintenance"
                },
                {
                  title: "Business Acumen",
                  description: "Developing sales, marketing, and entrepreneurial skills for the solar industry"
                },
                {
                  title: "Leadership Development",
                  description: "Building confidence, communication, and team management capabilities"
                },
                {
                  title: "Practical Experience",
                  description: "Hands-on training and real-world project experience"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">{item.title}</h5>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Join Our Next Training Batch
                <ArrowRight className="w-5 h-5 ml-2 inline-block" />
              </button>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
