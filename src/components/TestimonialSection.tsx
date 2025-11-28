import { Zap, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useEnquiryForm } from "@/contexts/EnquiryFormContext";

// Get the base URL from Vite's environment variables
const baseUrl = import.meta.env.BASE_URL || "/";

const videoFolder = `${baseUrl}wetransfer_banwari-vaishnav-mp4_2025-11-26_1032/`;

const videoFiles = [
  "M.R. Lega.mp4",
  "Jitendra Sharma.mp4",
  "Banwari Vaishnav.mp4",
  "Ratan Lal Manjhu.mp4",
  "Rakesh Mohan.mp4",
  "Rakesh Kumar Bairagi.mp4",
  "Rajmal Tank.mp4",
  "Nathulal Kachhawaha.mp4",
  "Mr. Jitendra patel.mp4",
  "Jitendra Kumar Saini.mp4",
];

const videoSources = videoFiles.map(
  (fileName) => `${videoFolder}${encodeURIComponent(fileName)}`
);

const FALLBACK_ASPECT_RATIO = 9 / 16;

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
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState<string | null>(
    null
  );
  const [videoDimensions, setVideoDimensions] = useState<
    Record<string, { width: number; height: number }>
  >({});
  const totalSlides = Math.max(
    1,
    Math.ceil(videoSources.length / itemsPerView)
  );

  const { openDialog } = useEnquiryForm();

  const handleVideoPlay = (videoSrc: string) => {
    // Pause all other videos when a new video starts playing
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      const videoElement = video as HTMLVideoElement;
      // Compare the current video src with the playing video src
      if (
        videoElement.src &&
        !videoElement.src.includes(videoSrc.split("/").pop() || "") &&
        !videoElement.paused
      ) {
        videoElement.pause();
      }
    });
    setCurrentPlayingVideo(videoSrc);
  };

  const handleVideoPause = () => {
    setCurrentPlayingVideo(null);
  };

  const handleLoadedMetadata = (
    videoSrc: string,
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const element = event.currentTarget;
    const width = element.videoWidth;
    const height = element.videoHeight;

    if (!width || !height) return;

    setVideoDimensions((prev) => {
      const existing = prev[videoSrc];
      if (existing && existing.width === width && existing.height === height) {
        return prev;
      }

      return {
        ...prev,
        [videoSrc]: { width, height },
      };
    });
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
    <section className="py-14 md:py-20 ">
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
          className="relative group p-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ARROWS */}
          <button
            onClick={prevSlide}
            disabled={!!currentPlayingVideo}
            className={`absolute left-4 top-1/2 -translate-y-1/2 hover:bg-white shadow-xl p-4 rounded-full z-10 transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-gray-200 ${
              currentPlayingVideo
                ? "opacity-50 cursor-not-allowed hover:scale-100"
                : "hover:scale-110"
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            disabled={!!currentPlayingVideo}
            className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md hover:bg-white shadow-xl p-4 rounded-full z-10 transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-gray-200 ${
              currentPlayingVideo
                ? "opacity-50 cursor-not-allowed hover:scale-100"
                : "hover:scale-110"
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
                  {slideVideos.map((src) => {
                    const dimensions = videoDimensions[src];
                    const aspectRatio = dimensions
                      ? dimensions.width / dimensions.height
                      : FALLBACK_ASPECT_RATIO;

                    return (
                      <div
                        key={`${slideIndex}-${src}`}
                        className="flex h-full flex-col rounded-3xl p-3"
                      >
                        <div
                          className="relative w-full overflow-hidden rounded-2xl"
                          style={{ aspectRatio }}
                        >
                          <video
                            src={src}
                            controls
                            preload="metadata"
                            className="h-full w-full object-contain"
                            playsInline
                            muted={false}
                            onPlay={() => handleVideoPlay(src)}
                            onPause={handleVideoPause}
                            onError={(e) => {
                              console.error("Video error:", src, e);
                            }}
                            onLoadedMetadata={(event) =>
                              handleLoadedMetadata(src, event)
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
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
            onClick={() => {
              localStorage.setItem("enrollment_button_id", "BTN-TESTIMONIAL");
              openDialog("BTN-TESTIMONIAL");
            }}
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
