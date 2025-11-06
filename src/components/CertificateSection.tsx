import { Card } from "@/components/ui/card";
import {
  Award,
  CheckCircle2,
  MapPin,
  Users,
  Zap,
  TrendingUp,
  Star,
  Clock,
  Calendar,
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
  const programHighlights = [
    { icon: <Zap className="w-5 h-5" />, text: "Real projects training" },
    { icon: <Award className="w-5 h-5" />, text: "Provincial offers" },
    { icon: <Star className="w-5 h-5" />, text: "Free Suncity Solar entry" },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Learn from industry experts",
    },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Earn from sales" },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "Scale from hundreds to thousands",
    },
  ];

  const certificates = [
    {
      id: 1,
      title: 'Discovery of Success',
      year: '2017',
      image: cert1,
      description: 'Certificate of Achievement in Professional Development'
    },
    {
      id: 2,
      title: 'Advanced Success Program',
      year: '2018',
      image: cert2,
      description: 'Advanced Certification in Professional Excellence'
    }
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
    <section className="py-16 bg-gradient-to-br from-muted/50 to-background">
      <div className="container mx-auto px-4">
        {/* Certificate Section */}
        <div className="max-w-4xl mx-auto mb-16 ">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-3 rounded-full mb-4">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent">
                Industry Recognized
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Get Your Professional Certificate
            </h2>
          </div>

          {/* Certificate Images Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {certificates.map((cert) => (
              <div 
                key={cert.id}
                className="relative group overflow-hidden rounded-xl shadow-2xl transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="relative w-full overflow-hidden">
                  <img
                    src={cert.image}
                    alt={`${cert.title} Certificate ${cert.year}`}
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h4 className="text-xl font-bold text-white mb-1">{cert.title}</h4>
                  <p className="text-accent font-medium">{cert.year}</p>
                  <p className="text-white/80 text-sm mt-2">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>

          </div>
        </div>

        {/* Program Highlights */}
        <div className="max-w-6xl mx-auto ">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Program Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {programHighlights.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-center">
                    {item.text}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Availability */}
        <div className="max-w-4xl mx-auto ">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-3 rounded-full mb-4">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent">
                Available In
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Geographic Availability
            </h2>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {states.map((state, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm border"
                >
                  {state}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Seat Availability */}
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-amber-50 to-yellow-50 p-8 rounded-2xl border border-amber-100">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-2 rounded-full mb-4">
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold">Limited Seats</span>
          </div>
          <h3 className="text-2xl font-bold text-amber-900 mb-2">
            Only 50 seats available for offline training
          </h3>
          <p className="text-amber-800 mb-4">
            Next batch starts:{" "}
            <span className="font-semibold">01 Jan 2026</span>
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-3xl font-bold text-amber-700">₹11,700</div>
            {!offerEnded ? (
              <div className="text-sm text-amber-700">
                <div>
                  Offer ends:{" "}
                  <span className="font-semibold">11th November</span>
                </div>
                <div className="text-xs opacity-80">
                  Hurry! Limited time offer
                </div>
              </div>
            ) : (
              <div className="text-sm text-amber-700 font-semibold">
                Offer has ended
              </div>
            )}
          </div>
        </div>

    </section>
  );
};
