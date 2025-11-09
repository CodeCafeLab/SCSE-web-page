import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Building2,
  FileCheck,
  Star,
  Award as Trophy,
  MapPin,
  Users,
  Zap,
} from "lucide-react";

// Import certificate images
import cert1 from "@/assets/1350 FINAL Soft DISCOVERY OF SUCCESS  29993 2017_page-0001.jpg";
import cert2 from "@/assets/1351 FINAL Soft DISCOVERY OF SUCCESS  21001 2018_page-0001.jpg";

interface CertificateSectionProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  offerEnded: boolean;
}

export const CertificateSection = ({
  timeLeft,
  offerEnded,
}: CertificateSectionProps) => {
  const companyAchievements = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "'DOS' Is ISO Recognised Solar Institute",
      description: "Recognized by 'DOS' Is ISO Solar Institute",
    },
    {
      icon: <Building2 className="w-6 h-6 text-green-600" />,
      title: "Industry Leader",
      description: "Pioneers in solar energy solutions",
    },
    {
      icon: <FileCheck className="w-6 h-6 text-amber-600" />,
      title: "Certified Excellence",
      description: "Awarded for outstanding performance",
    },
    {
      icon: <Trophy className="w-6 h-6 text-red-600" />,
      title: "Award Winning",
      description: "Multiple industry recognitions",
    },
  ];

  const certificates = [
    {
      id: 1,
      title: "ISO 29993:2017",
      year: "ISO 29993:2017",
      image: cert1,
      description: "Learning services outside formal education",
    },
    {
      id: 2,
      title: "ISO 21001:2018",
      year: "ISO 21001:2018",
      image: cert2,
      description: "Management system for Educational organizations",
    },
  ];

  const states = [
    "Rajasthan",
    "Gujarat",
    "Madhya Pradesh",
    "Uttar Pradesh",
    "Punjab",
    "Tamil Nadu",
    "Maharashtra",
    "Jammu and Kashmir",
    "Assam",
    "West Bengal",
    "Jharkhand",
    "Arunachal Pradesh",
    "Bihar",
    "Haryana",
  ];

  return (
    <section className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Certificate Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 py-1.5 px-4 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Certified Excellence
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Government Recognized{" "}
              <span className="text-blue-600">Certifications</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence is validated by prestigious
              government and industry certifications
            </p>
          </div>

          {/* Certificate Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Certificate Frame */}
                <div className="relative p-6 md:p-8">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-full h-2  from-blue-600 to-blue-400"></div>

                  {/* Certificate Badge */}
                  <div className="absolute top-6 right-6 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {cert.year}
                  </div>

                  {/* Certificate Content */}
                  <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-inner">
                    <img
                      src={cert.image}
                      alt={`${cert.title} Certificate ${cert.year}`}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>

                  {/* Certificate Footer */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {cert.title}
                        </h3>
                      </div>
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <FileCheck className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-500">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Coverage */}
      <div className="max-w-4xl mx-auto mt-16">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 py-1.5 px-4 border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-50"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Our Reach
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Entrepreneurs Embarking in{" "}
            <span className="text-blue-600">Following States</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We are committed to providing solar solutions to these states{" "}
          </p>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-wrap justify-center gap-3">
              {states.map((state, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 border border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                >
                  {state}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
