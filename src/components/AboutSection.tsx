import React from "react";
import swamiji from "./../assets/swami vivekanand ji.jpeg";

export const AboutSection = () => {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      {/* About Us Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-xl text-amber-600 font-semibold">
          Towards a Golden Future with the Power of the Sun
        </p>
      </div>

      {/* Company Introduction */}
      <div className="max-w-4xl mx-auto mb-12">
        <p className="text-gray-700 mb-6 leading-relaxed">
          Since Chandramangal Suncity Marketing Pvt. Ltd. (Suncity Solar) is a
          leading company committed to transforming solar energy solutions.
          Established on June 14, 2019, under the Companies Act, 2013, we are an
          ISO 9001:2015 certified and government-registered startup. Our
          certifications from BIS, FICCI, ASSOCHAM, and CE-certified quality
          research organizations reflect our dedication to the highest quality
          standards.
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Under the visionary "Make in India" initiative, we specialize in the
          manufacturing (OEM) and supply of a diverse range of high-quality
          solar products, proudly recognized as "Made in Bharat- Made for
          Bharat." Our product portfolio includes solar panels, solar inverters,
          solar batteries, solar water pumping systems, solar water heaters,
          solar street lighting systems, and solar home lighting systems,
          catering to the residential, commercial, agricultural, and industrial
          sectors.
        </p>

        <p className="text-gray-700 leading-relaxed">
          With a commitment to energy independence, environmental
          sustainability, and technological innovation, Suncity Solar is leading
          India's solar revolution, empowering individuals and businesses to
          grasp clean, renewable energy for a brighter and self-reliant future.
        </p>
      </div>

      {/* Campaign Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-center text-amber-600 mb-6">
          OUR CAMPAIGN
        </h2>

        {/* Hindi Line Design */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-4 text-center mb-6 shadow-md">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            "सौर्य क्रांति से राष्ट्र निर्माण की ओर ..."
          </h3>
          <p className="text-lg text-amber-100 italic">
            "Towards Nation-Building through Solar Revolution..."
          </p>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">
          At Suncity Solar, we embrace a broad and visionary approach to
          expanding the reach of our campaign "all this is my fault of all...".
          To move forward successfully toward this path, we have identified
          energy scarcity and unemployment as critical obstacles to national
          progress. The solution to these challenges lies in renewable energy
          adoption and sustainable employment generation, which are deeply
          embedded in our company's vision.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          With this perspective, we have built a dynamic platform that not only
          accelerates the widespread adoption of solar energy but also creates
          livelihood opportunities. Through Suncity Solar's unique DIRECT
          SELLING MODEL, we empower individuals to establish successful careers
          while contributing to our nations vision of a green,
          energy-independent bharat.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Our commitment extends far beyond just setting solar products; we are
          fostering a self-reliant future where clean energy solutions and
          economic growth been ensured through team work.
        </p>
      </div>

      {/* DOS Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-amber-600 mb-6">
          DISCOVERY OF SUCCESS—A BUSINESS SCHOOL OF SUNCITY SOLAR
        </h2>

        <p className="text-gray-700 mb-4 leading-relaxed">
          Discovery of Success (DOS) is a structured and visionary platform
          designed to train and transform common individuals through "trigger"
          into skilled solar advisors while equipping them with in-depth
          knowledge of the solar industry.
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          DOS is not only developing technological and business leaders but also
          deeply rooted in spirituality and religious faith. We believe that
          true service to humanity is intertwined with protecting nature and the
          environment.
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Our uniqueness lies in our commitment in building a highly competent
          technical team, well-equipped with advanced solar expertise, ensuring
          that become the driving force behind the solar revolution. Through
          comprehensive training in sales, technical proficiency, and leadership
          skills, DOS empowers individuals with team-building capabilities,
          personality development, and system-oriented expertise. This
          initiative strengthens the foundation of our growing solar network,
          creating professionals who are not just advisors but true solar
          experts as "the the diga".
        </p>

        {/* Vision & Mission Boxes */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision Box */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
              VISION
            </h3>
            <div className="text-center space-y-3">
              <p className="text-lg font-semibold text-gray-800">
                "Solar For All and Employment for All"
              </p>
              <p className="text-blue-600 italic font-medium">
                "हर घर सोलर, हर घर रोज़गार"
              </p>
            </div>
          </div>

          {/* Mission Box */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
              MISSION
            </h3>
            <p className="text-lg font-semibold text-gray-800 text-center">
              Solution of Power and Power of Team Work to Save the Nature and
              Build the Nation.
            </p>
          </div>
        </div>

        {/* Swami Vivekananda Quote Section */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Image */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
                <img
                  src={swamiji}
                  alt="Swami Vivekananda"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Quote Content */}
            <div className="flex-1 text-center md:text-left">
              <blockquote className="text-gray-700 text-base leading-relaxed mb-3 italic">
                "जिस समय जिस काम के लिए प्रतिज्ञा करो, ठीक उसी समय पर उसे करना
                ही चाहिए, नहीं तो लोगों का विश्वास उठ जाता है।"
              </blockquote>
              <div className="text-amber-600 font-medium">
                <p className="text-sm">- Swami Vivekananda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
