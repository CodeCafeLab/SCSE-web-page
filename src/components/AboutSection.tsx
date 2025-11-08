import {
  CheckCircle,
  Sun,
  Leaf,
  Users,
  Award,
  Shield,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import swamiji from "./../assets/swami vivekanand ji.jpeg";

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-6 md:py-8 bg-gradient-to-b from-blue-50 to-white overflow-x-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-blue-50 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)] -z-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12 px-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            About Our Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            About Us -{" "}
            <span className="text-blue-700">
              Towards a Golden Future with the Power of the Sun
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mb-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16 px-4 sm:px-6">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
              Our Story
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              DISCOVERY OF SUCCESS–{" "}
              <span className="text-blue-600">
                A BUSINESS SCHOOL OF SUNCITY SOLAR
              </span>
            </h3>

            <div className="space-y-4 bg-blue-600/10 p-6 rounded-xl border-l-4 border-blue-600 shadow-sm">
              <p className="text-blue-900 font-medium text-lg italic">
                "सौर ऊर्जा से राष्ट्र निर्माण की ओर…"
              </p>
              <p className="text-blue-900 font-semibold text-lg">
                "Towards Nation-Building through Solar Revolution..."
              </p>
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="leading-relaxed mb-4">
                <span className="font-bold text-blue-800">OUR CAMPAIGN</span>
                <br />
                Shree Chandramangal Suncity Marketing Pvt. Ltd. (Suncity Solar)
                is a leading company committed to transforming solar energy
                solutions. Established on{" "}
                <span className="font-bold text-blue-800">June 14, 2019</span>,
                under the Companies Act, 2013, we are an ISO 9001:2015 certified
                and government-registered startup. Our certifications from BIS,
                FICCI, ASSOCHAM, and CE-certified quality research organizations
                reflect our dedication to the highest quality standards.
              </p>
              <p className="leading-relaxed mb-4">
                Under the visionary "Make in India" initiative, we specialize in
                the manufacturing (OEM) and supply of a diverse range of
                high-quality solar products, proudly recognized as "Make in
                Bharat-Made for Bharat."
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  text: "ISO 9001:2015 Certified",
                  icon: <ShieldCheck className="w-5 h-5 text-yellow-500" />,
                },
                {
                  text: "BIS Certified",
                  icon: <CheckCircle className="w-5 h-5 text-blue-500" />,
                },
                {
                  text: "FICCI Member",
                  icon: <Award className="w-5 h-5 text-green-500" />,
                },
                {
                  text: "ASSOCHAM Member",
                  icon: <Award className="w-5 h-5 text-amber-500" />,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-blue-200"
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  <span className="text-gray-800 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full">
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-1 rounded-lg inline-block mb-6 shadow-md">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-md">
                <Sun className="w-6 h-6 text-yellow-300" />
                <h4 className="text-xl font-bold text-white">
                  Our Product Portfolio
                </h4>
              </div>
            </div>
            <ul className="grid gap-3">
              {[
                { name: "Solar Panels", icon: "☀️" },
                { name: "Solar Inverters", icon: "🔌" },
                { name: "Solar Batteries", icon: "🔋" },
                { name: "Solar Water Pumping Systems", icon: "💧" },
                { name: "Solar Water Heaters", icon: "♨️" },
                { name: "Solar Street Lighting Systems", icon: "💡" },
                { name: "Solar Home Lighting Systems", icon: "🏠" },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group border border-transparent hover:border-blue-100"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-800 font-medium group-hover:text-blue-800 transition-colors">
                    {item.name}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-600 transition-colors" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quote Section */}
        <div className="w-full py-4 md:py-6 bg-gradient-to-br from-amber-50 to-amber-100 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-200">
              <div className="md:flex items-stretch">
                {/* Image Section */}
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center p-8 md:p-12 relative">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto mb-4">
                      <img
                        src={swamiji}
                        alt="Swami Vivekananda"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-white font-bold text-xl md:text-2xl mt-4">
                      Swami Vivekananda
                    </h3>
                    <p className="text-amber-100 text-sm md:text-base">
                      Spiritual Leader & Philosopher
                    </p>
                  </div>
                </div>

                {/* Quote Section */}
                <div className="md:w-3/5 p-8 md:p-12 flex items-center">
                  <div className="w-full">
                    <svg
                      className="w-10 h-10 text-amber-500 mb-6 opacity-80"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote className="text-gray-800 text-lg md:text-xl leading-relaxed mb-6 font-serif italic">
                      "जिस समय जिस काम के लिए प्रतिज्ञा करो, ठीक उसी समय पर उसे
                      करना ही चाहिए, नहीं तो लोगों का विश्वास उठ जाता है।"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-0.5 bg-amber-400 mr-4"></div>
                      <p className="text-amber-600 font-semibold text-lg">
                        - Swami Vivekananda
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="relative bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-3xl overflow-hidden mb-20 mx-4 sm:mx-6 shadow-xl">
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
                Our Vision & <span className="text-yellow-400">Approach</span>
              </h3>
              <p className="text-blue-100 mb-8 text-lg leading-relaxed max-w-4xl">
                With a commitment to energy independence, environmental
                sustainability, and technological innovation, Suncity Solar is
                leading India's solar revolution, empowering individuals and
                businesses to grasp clean, renewable energy for a brighter and
                self-reliant future.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center">
                    Our Approach
                  </h4>
                  <p className="text-blue-50 leading-relaxed">
                    At Suncity Solar, we embrace a broad and visionary approach
                    to expanding the reach of our campaign. To move forward
                    successfully toward this path, we have identified energy
                    scarcity and unemployment as critical obstacles to national
                    progress. The solution to these challenges lies in renewable
                    energy adoption and sustainable employment generation, which
                    are deeply embedded in our company's vision.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center">
                    Our Vision
                  </h4>
                  <p className="text-blue-50 leading-relaxed">
                    With this perspective, we have built a dynamic platform that
                    not only accelerates the widespread adoption of solar energy
                    but also creates livelihood opportunities. Through Suncity
                    Solar's unique DIRECT SELLING MODEL, we empower individuals
                    to establish successful careers while contributing to our
                    nation's vision of a green, energy-independent Bharat. Our
                    commitment extends far beyond just selling solar products—we
                    are fostering a self-reliant future where clean energy
                    solutions and economic growth been ensured through team
                    work.
                  </p>
                </div>
              </div>
            </div>

            {/* DOS Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <span className="inline-block mt-4 px-4 py-1.5 rounded-full bg-yellow-50 text-yellow-700 text-sm font-medium mb-4">
                  Our Training Program
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-300 mb-4">
                  <span className="text-blue-200">Discovery of Success</span>{" "}
                  (DOS)
                </h3>
                <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mb-6 rounded-full"></div>
                <p className="text-xl text-gray-200 max-w-4xl mx-auto">
                  Discovery of Success (DOS) is a structured and visionary
                  platform designed to train and transform common individuals
                  through "गुकुल" into skilled solar advisors while equipping
                  them with in-depth knowledge of the solar industry.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 mb-16">
                <div className="grid md:grid-cols-3 divide-x divide-gray-100">
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Spiritual Foundation
                    </h4>
                    <p className="text-gray-700">
                      DOS is not only developing technological and business
                      leaders but also deeply rooted in spirituality and
                      religious faith. We believe that true service to humanity
                      is intertwined with protecting nature and the environment.
                    </p>
                  </div>
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-yellow-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Technical Excellence
                    </h4>
                    <p className="text-gray-700">
                      Our uniqueness lies in our commitment in building a highly
                      competent technical team, well-equipped with advanced
                      solar expertise, ensuring that become the driving force
                      behind the solar revolution.
                    </p>
                  </div>
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Comprehensive Training
                    </h4>
                    <p className="text-gray-700">
                      Through comprehensive training in sales, technical
                      proficiency, and leadership skills, DOS empowers
                      individuals with team-building capabilities, personality
                      development, and system-oriented expertise.
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-w-4xl mx-auto">
                <h4 className="text-2xl font-bold text-white mb-6 text-center">
                  Program Impact
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      title: "Expert Solar Advisors",
                      description:
                        "Transforming common individuals into skilled solar advisors through गुकुल",
                    },
                    {
                      title: "Industry Leadership",
                      description:
                        "Creating professionals who are not just advisors but true solar experts as 'सौर सौरवीर'",
                    },
                    {
                      title: "Network Strengthening",
                      description:
                        "Strengthening the foundation of our growing solar network with competent professionals",
                    },
                    {
                      title: "Holistic Development",
                      description:
                        "Combining technical expertise with spiritual values and environmental consciousness",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900">
                          {item.title}
                        </h5>
                        <p className="text-gray-700">{item.description}</p>
                      </div>
                    </div>
                  ))}
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
