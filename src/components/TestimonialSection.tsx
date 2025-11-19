import {
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { useEnquiryForm } from "@/contexts/EnquiryFormContext";
import { toast } from "sonner";

// Get the base URL from Vite's environment variables
const baseUrl = import.meta.env.BASE_URL || "/";

// Video paths from public folder - using base URL for proper resolution in production
const video1 = `${baseUrl}BamwariVaishnav17Nov.mp4`;
const video2 = `${baseUrl}JitendraPatel17Nov.mp4`;
const video3 = `${baseUrl}JitendraSharma17Nov.mp4`;
const video4 = `${baseUrl}M.R.Lega17Nov.mp4`;
const video5 = `${baseUrl}Mr.RatanlalManjhu.mp4`;
const video6 = `${baseUrl}Nathulal17Nov.mp4`;
const video7 = `${baseUrl}RajmalTank17Nov.mp4`;
const video8 = `${baseUrl}RakeshKumarBairagi17Nov.mp4`;
const video9 = `${baseUrl}RakeshMohan17Nov.mp4`;
const video10 = `${baseUrl}jitendrasaini17Nov.mp4`;

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

const getItemsPerView = () => {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 4;
};

export const TestimonialSection = () => {
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState<string | null>(null);
  const totalSlides = Math.max(
    1,
    Math.ceil(videoSources.length / itemsPerView)
  );

  const { openDialog } = useEnquiryForm();

  const handleVideoPlay = (videoSrc: string) => {
    // Pause all other videos when a new video starts playing
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      const videoElement = video as HTMLVideoElement;
      // Compare the current video src with the playing video src
      if (videoElement.src && !videoElement.src.includes(videoSrc.split('/').pop() || '') && !videoElement.paused) {
        videoElement.pause();
      }
    });
    setCurrentPlayingVideo(videoSrc);
  };

  const handleVideoPause = (videoSrc: string) => {
    setCurrentPlayingVideo(null);
  };

  const nextSlide = useCallback(() => {
    if (!currentPlayingVideo) {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }
  }, [totalSlides, currentPlayingVideo]);

  const prevSlide = () => {
    if (!currentPlayingVideo) {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentSlide((prev) => Math.min(prev, totalSlides - 1));
  }, [totalSlides]);

  useEffect(() => {
    if (!isPaused && !currentPlayingVideo) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, nextSlide, currentPlayingVideo]);

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
            disabled={!!currentPlayingVideo}
            className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md hover:bg-white shadow-xl p-4 rounded-full z-10 transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-gray-200 ${
              currentPlayingVideo 
                ? 'opacity-50 cursor-not-allowed hover:scale-100' 
                : 'hover:scale-110'
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            disabled={!!currentPlayingVideo}
            className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md hover:bg-white shadow-xl p-4 rounded-full z-10 transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-gray-200 ${
              currentPlayingVideo 
                ? 'opacity-50 cursor-not-allowed hover:scale-100' 
                : 'hover:scale-110'
            }`}
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
                  className={cn(
                    "grid w-full gap-6 px-4",
                    itemsPerView === 1
                      ? "grid-cols-1"
                      : itemsPerView === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-4"
                  )}
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  {slideVideos.map((src, i) => (
                    <div
                      key={i}
                      className="rounded-2xl  shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative   h-full md:h-[76vh] lg:h-[80vh]  w-72 overflow-hidden rounded-xl bg-black aspect-[10/16] sm:aspect-[4/3] lg:aspect-video">
                        <video
                          src={src}
                          controls
                          preload="metadata"
                          className="absolute inset-0 h-full w-full object-cover"
                          playsInline
                          muted={false}
                          onPlay={(e) => {
                            console.log('Video playing:', src);
                            handleVideoPlay(src);
                          }}
                          onPause={(e) => {
                            console.log('Video paused:', src);
                            handleVideoPause(src);
                          }}
                          onError={(e) => {
                            console.error('Video error:', src, e);
                          }}
                        />
                      </div>
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
              onClick={() => !currentPlayingVideo && setCurrentSlide(index)}
              disabled={!!currentPlayingVideo}
              className={cn(
                "h-3 rounded-full transition-all",
                currentSlide === index ? "bg-amber-600 w-8" : "bg-gray-300 w-3",
                currentPlayingVideo && "opacity-50 cursor-not-allowed"
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
            className="group bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-10 rounded-full shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 font-bold"
          >
            Book Your Seat Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
          </Button>
        </div>
      </div>
    </section>
  );
};
