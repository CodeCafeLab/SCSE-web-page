import { Quote, Star, Zap } from "lucide-react";
import { Button } from "./ui/button";

const testimonials = [
  {
    quote: "I started my solar business just 2 months after completing the course. The training was 100% practical and the team guided me at every step!",
    author: "Ravi Sharma",
    role: "Solar Entrepreneur",
    location: "Jaipur",
    rating: 5
  },
  {
    quote: "The course helped me get my first job at a solar EPC company. Great mentors and amazing support!",
    author: "Neha Verma",
    role: "Solar Design Engineer",
    location: "Mumbai",
    rating: 5
  },
  {
    quote: "Best investment in my career! The hands-on training and industry insights were invaluable for starting my own installation business.",
    author: "Amit Patel",
    role: "Solar Business Owner",
    location: "Ahmedabad",
    rating: 5
  }
];

const companies = [
  { name: "Tata Power Solar", logo: "🏭" },
  { name: "Adani Solar", logo: "🔆" },
  { name: "Waaree", logo: "☀️" },
  { name: "Vikram Solar", logo: "⚡" },
  { name: "Loom Solar", logo: "🔋" },
  { name: "Goldi Solar", logo: "🌞" },
];

export const TestimonialSection = () => {
  const scrollToForm = () => {
    document.getElementById("enrollment-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Section Header */}
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 text-sm font-medium rounded-full mb-6">
            <Zap className="w-4 h-4 mr-2 text-amber-500" />
            Our Students Are Shining Bright
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-12">
            Hear From Our Solar Achievers <span className="text-yellow-500">🌞</span>
          </h2>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <Quote className="h-8 w-8 text-amber-100 mb-4" />
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-lg mr-4">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                      {testimonial.location && ` • ${testimonial.location}`}
                    </p>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Companies Section */}
          <div className="mb-16">
            <h3 className="text-lg font-medium text-gray-500 mb-6">Our students work at top companies</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {companies.map((company, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-4xl mb-2">{company.logo}</div>
                  <span className="text-sm text-gray-500">{company.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to start your solar journey?</h3>
            <p className="text-gray-600 mb-6">Join hundreds of successful solar professionals who transformed their careers with our training.</p>
            <Button 
              onClick={scrollToForm}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-lg py-6 px-8 rounded-full font-semibold shadow-lg hover:shadow-amber-200 transition-all duration-300 transform hover:scale-105"
            >
              🚀 Enroll Now - Limited Seats Available
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
