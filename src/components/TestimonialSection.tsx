import {
  Quote,
  Star,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    title: "From Learning to Livelihood",
    quote:
      "Discovery of Success was not just a training platform — it became the turning point of my professional journey. Through DOS, I learned the real essence of solar entrepreneurship and self-reliance. The hands-on experience, guidance, and values I received reshaped my confidence. After completing my training, I was offered an employment opportunity with one of their associated organizations — the very first milestone of my success. DOS helped me convert learning into livelihood and dreams into determination.",
    author: "Mr. M. R. Lega",
    location: "Nagaur, Rajasthan",
  },
  {
    id: 2,
    title: "A Vision Reborn through Knowledge",
    quote:
      "My association with Discovery of Success completely transformed the direction of my career. The combination of technical learning, leadership training, and ethical business education helped me discover my own potential. After the training, I received an opportunity to work with one of their sister concern companies — a beginning that gave my vision the right direction. DOS made me independent, confident, and future-ready.",
    author: "Mr. Jitendra Sharma",
    location: "Jodhpur, Rajasthan",
  },
  {
    id: 3,
    title: "Empowered by Education, Driven by Purpose",
    quote:
      "Discovery of Success gave me what traditional education never could — practical wisdom, clarity, and courage. From understanding solar systems to building customer trust, every lesson changed my thinking. Today, I manage my own solar enterprise and inspire others to become self-reliant. DOS didn't just train me; it transformed me.",
    author: "Mr. Rakesh Mohan",
    location: "Hanumangarh, Rajasthan",
  },
  {
    id: 4,
    title: "Learning That Lights Lives",
    quote:
      "My journey with Discovery of Success was one of true empowerment. I learned to design, install, and manage solar systems with precision and purpose. The training instilled in me the confidence to start my own business and create opportunities for others. For me, DOS is a place where knowledge becomes energy and energy becomes empowerment.",
    author: "Mr. Rajmal Talk",
    location: "Chittorgarh, Rajasthan",
  },
  {
    id: 5,
    title: "From Learner to Leader",
    quote:
      "Joining Discovery of Success was the most defining decision of my life. Their practical approach and real-world modules made me ready for the solar profession. Today, I lead my own venture with pride and stability. DOS gave me the identity of a skilled and self-reliant professional.",
    author: "Mr. Nathulal Kachwaha",
    location: "Kuchaman City, Rajasthan",
  },
  {
    id: 6,
    title: "Ignited with Purpose, Powered by Learning",
    quote:
      "When I joined Discovery of Success, I had no technical background. Yet, the structured training and mentorship turned my curiosity into capability. Today, I manage solar installations independently and inspire others toward clean energy. DOS taught me not just how to earn, but how to live with purpose.",
    author: "Mr. Sachin Gupta",
    location: "Samba, Jammu & Kashmir",
  },
  {
    id: 7,
    title: "A Pathway to Self-Dependence",
    quote:
      "Discovery of Success guided me from learning to leadership. Every session, every module added confidence and clarity to my journey. Today, I help others explore solar solutions and lead a self-dependent life. DOS is not merely an institution — it's a movement of empowerment.",
    author: "Mr. Ratan Lal Manjhu",
    location: "Hanumangarh, Rajasthan",
  },
  {
    id: 8,
    title: "Turning Curiosity into Confidence",
    quote:
      "My experience with Discovery of Success was truly transformative. I joined with a desire to learn, and left with the power to create. The training not only equipped me with technical knowledge but also with a belief in myself. Today, I am financially secure and proud of my achievements — all built on the foundation laid by DOS.",
    author: "Mr. Banwari Lal Vaishnav",
    location: "Kota, Rajasthan",
  },
  {
    id: 9,
    title: "From Hesitation to Confidence",
    quote:
      "Discovery of Success opened doors to a world of opportunity. The practical training and motivational environment turned my hesitation into confidence and my ideas into action.",
    author: "Mr. Jitendra Patel",
    location: "Udaipur, Rajasthan",
  },
  {
    id: 10,
    title: "From Dreams to Reality",
    quote:
      "Every session at Discovery of Success brought me closer to my dreams. The knowledge I gained here made me confident, skilled, and economically independent.",
    author: "Mr. Anil Sharma",
    location: "Patna, Bihar",
  },
  {
    id: 11,
    title: "Finding Direction and Purpose",
    quote:
      "Discovery of Success gave me direction, discipline, and the courage to act. I joined with uncertainty, but left with a renewed sense of purpose and success.",
    author: "Mr. Rakesh Vaishnav",
    location: "Jhalawar, Rajasthan",
  },
  {
    id: 12,
    title: "From Self-Discovery to Nationwide Impact",
    quote:
      "Discovery of Success transforms ordinary individuals into extraordinary achievers. Their unique teaching methods helped me discover my inner strength and become financially self-reliant. Only due to this confidence built through solar knowledge and skill development, I have been able to reach the north-eastern parts of the country — including regions like Assam — to successfully install solar systems and spread awareness about clean energy.",
    author: "Mr. Jitendra Saini",
    location: "Jaipur, Rajasthan",
  },
  {
    id: 13,
    title: "Founder's Vision - Saur Kranti Se Rashtra Nirman Ki Aur",
    quote:
      "When we together laid the foundation of Discovery of Success, it was not just to create another institute — it was to ignite a movement. A movement that educates, empowers, and enlightens every individual with the wisdom of solar energy — the most powerful, pure, and eternal gift of nature. In a world battling climate change, energy crisis, and unemployment, solar education is no longer a choice — it is the only sustainable path forward.",
    author: "Manoj Purohit",
    location: "Founder, Discovery of Success",
  },
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const autoSlideInterval = useRef<NodeJS.Timeout>();
  const itemsPerView = 3; // Number of testimonials to show at once
  const maxIndex = Math.ceil(testimonials.length / itemsPerView) - 1;

  const scrollToForm = () => {
    document
      .getElementById("enrollment-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  // Get the current testimonials to display
  const getVisibleTestimonials = () => {
    const startIndex = currentIndex * itemsPerView;
    const endIndex = Math.min(startIndex + itemsPerView, testimonials.length);
    return testimonials.slice(startIndex, endIndex);
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isPaused) {
      autoSlideInterval.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, [isPaused]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-amber-50 to-white py-16 md:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-sm font-medium rounded-full mb-4">
              <Zap className="w-4 h-4 mr-2 text-yellow-200" />
              Success Stories
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Transforming Lives Through Solar Education
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our students who turned their lives around with solar
              skills and entrepreneurship
            </p>
          </div>

          {/* Testimonials Slider */}
          <div
            className="relative w-full overflow-hidden py-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Slider container */}
            <div
              ref={slideRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full md:w-1/3 flex-shrink-0 px-2"
                >
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full mx-1">
                    <div className="flex-1">
                      {testimonial.title && (
                        <h3 className="text-amber-600 font-medium text-sm mb-2">
                          {testimonial.title}
                        </h3>
                      )}
                      <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-5">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="flex items-center pt-4 border-t border-gray-100">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 font-bold text-xl">
                        {testimonial.author.trim().charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold text-gray-900">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-amber-600">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-amber-600 p-2 rounded-full shadow-md z-10 transition-all hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-amber-600 p-2 rounded-full shadow-md z-10 transition-all hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({
                length: Math.ceil(testimonials.length / itemsPerView),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    currentIndex === index
                      ? "bg-amber-500 w-6"
                      : "bg-gray-300 w-2"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl p-8 md:p-10 shadow-xl max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Transform Your Future with Solar?
              </h3>
              <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
                Join our community of successful solar professionals and start
                your journey towards financial freedom and environmental impact.
              </p>
              <Button
                onClick={scrollToForm}
                size="lg"
                className="group bg-white text-amber-600 hover:bg-gray-100 text-lg py-6 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Start My Solar Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-amber-100 text-sm mt-4">
                Next batch starting soon! Limited seats available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
