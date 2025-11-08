import { Award, Briefcase, PlayCircle, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Award,
    title: "Industry Certification",
    description: "Get certified and recognized by leading solar companies",
  },
  {
    icon: Briefcase,
    title: "Job Support",
    description: "Placement assistance and job opportunities after completion",
  },
  {
    icon: Video,
    title: "Live Classes",
    description: "Interactive live sessions with industry experts",
  },

];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose Our Program?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solar education with real-world applications and career support
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-none shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1 rounded-2xl w-full max-w-xs mx-auto"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
