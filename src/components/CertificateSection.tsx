import { Card } from "@/components/ui/card";
import { Award, CheckCircle2 } from "lucide-react";

export const CertificateSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-3 rounded-full mb-4">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent">Industry Recognized</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Get Your Professional Certificate
            </h2>
            <p className="text-muted-foreground">
              Upon successful completion, receive an industry-recognized certificate
            </p>
          </div>

          <Card className="rounded-2xl overflow-hidden shadow-[var(--shadow-card)] border-2 border-accent/20">
            <div className="bg-gradient-to-br from-primary to-[hsl(210,65%,35%)] p-8 md:p-12 text-white">
              <div className="border-4 border-white/20 rounded-xl p-8 md:p-12 backdrop-blur-sm bg-white/5">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">
                    Certificate of Completion
                  </h3>
                  <p className="text-lg opacity-90">
                    Suncity Solar Learning Program
                  </p>
                  <div className="h-px bg-white/20 my-6"></div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 justify-center">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span>Valid across solar industry</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span>Digital & physical copy provided</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span>Lifetime validity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
