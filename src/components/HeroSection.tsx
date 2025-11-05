import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 12, minutes: 30, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToForm = () => {
    document.getElementById("enrollment-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-[hsl(210,65%,35%)] text-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <Clock className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold">Admissions Closing In:</span>
            <div className="flex gap-2 ml-2">
              <div className="bg-white/20 px-3 py-1 rounded-lg">
                <span className="font-bold">{timeLeft.days}d</span>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-lg">
                <span className="font-bold">{timeLeft.hours}h</span>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-lg">
                <span className="font-bold">{timeLeft.minutes}m</span>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-lg">
                <span className="font-bold">{timeLeft.seconds}s</span>
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Launch Your Career in
            <span className="block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Solar Energy
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Join India's premier solar education program and become part of the renewable energy revolution
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="h-14 px-8 text-lg rounded-xl bg-gradient-to-r from-accent to-[hsl(35,100%,55%)] hover:shadow-[var(--shadow-glow)] transition-all duration-300"
            >
              Enroll Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
              <span className="text-sm">Course Fee:</span>
              <span className="text-2xl font-bold text-accent">₹11,700</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
