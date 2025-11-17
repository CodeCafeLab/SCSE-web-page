import { Zap, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useEnquiryForm } from "@/contexts/EnquiryFormContext";
import video1 from "/BamwariVaishnav17Nov.mp4";
import video2 from "/JitendraPatel17Nov.mp4";
import video3 from "/JitendraSharma17Nov.mp4";
import video4 from "/M.R.Lega17Nov.mp4";
import video5 from "/Mr.RatanlalManjhu.mp4";
import video6 from "/Nathulal17Nov.mp4";
import video7 from "/RajmalTank17Nov.mp4";
import video8 from "/RakeshKumarBairagi17Nov.mp4";
import video9 from "/RakeshMohan17Nov.mp4";
import video10 from "/jitendrasaini17Nov.mp4";

// // Video paths from public folder
// const video1 = "/Bamwari Vaishnav 17 Nov.mp4";
// const video2 = "/Jitendra Patel 17 Nov.mp4";
// const video3 = "/Jitendra Sharma 17 Nov.mp4";
// const video4 = "/M.R. Lega 17 Nov.mp4";
// const video5 = "/Mr. Ratan lal Manjhu.mp4";
// const video6 = "/Nathulal 17 Nov.mp4";
// const video7 = "/Rajmal Tank 17 Nov.mp4";
// const video8 = "/Rakesh Kumar Bairagi 17 Nov.mp4";
// const video9 = "/Rakesh Mohan 17 Nov.mp4";
// const video10 = "/jitendra saini 17 Nov.mp4";

const videoSources = [
  video4,
  video3,
  video6,
  video7,
  video8,
  video9,
  video10,
  video2,
  video1,
  video5,
];

export const TestimonialSection = () => {
  const itemsPerView = 4;
  const totalSlides = Math.ceil(videoSources.length / itemsPerView);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { openDialog } = useEnquiryForm();

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-medium rounded-full shadow-lg mb-5">
            <Zap className="w-4 h-4 mr-2 text-yellow-200" />
            Success Stories
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Hear From Our Solar Entrepreneurs
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our certified trainees are making an impact with solar energy.
          </p>
        </div>

        {/* SLIDER */}
        <div
          className="relative group "
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ARROWS */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md hover:bg-white shadow-xl p-4 rounded-full z-10 transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-gray-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md hover:bg-white shadow-xl p-4 rounded-full z-10 transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-gray-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* SLIDE INNER */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${totalSlides * 100}%`,
              transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const start = slideIndex * itemsPerView;
              const end = start + itemsPerView;
              const slideVideos = videoSources.slice(start, end);

              return (
                <div
                  key={slideIndex}
                  className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 w-full"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  {slideVideos.map((src, i) => (
                    <div
                      key={i}
                      className="rounded-xl shadow-lg bg-white border border-gray-100 p-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <video
                        src={src}
                        controls
                        preload="metadata"
                        className="w-full h-120 md:h-140 rounded-lg object-cover bg-black"
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* PAGINATION DOTS */}
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "h-3 rounded-full transition-all",
                currentSlide === index ? "bg-amber-600 w-8" : "bg-gray-300 w-3"
              )}
            />
          ))}
        </div>

        {/* CTA BOX */}
        <div className="mt-20 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl p-12 shadow-2xl text-center max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Ready to Transform Your Future with Solar?
          </h3>

          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
            Join our community of successful solar professionals and start your
            journey today.
          </p>

          <Button
            onClick={openDialog}
            size="lg"
            className="group bg-white text-amber-700 hover:bg-gray-100 text-lg py-6 px-10 rounded-full shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 font-semibold"
          >
            Book Your Seat Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
          </Button>
        </div>
      </div>
    </section>
  );
};
