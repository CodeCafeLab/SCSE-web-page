import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import { CertificateSection } from "@/components/CertificateSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BenefitsSection />
      
      <section id="enrollment-form" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="rounded-2xl shadow-[var(--shadow-card)] border-2 border-accent/20">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl md:text-4xl font-bold text-primary">
                  Enrollment Form
                </CardTitle>
                <CardDescription className="text-base">
                  Fill in your details to start your journey in solar energy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnrollmentForm />
              </CardContent>
            </Card>
            
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                By enrolling, you agree to our{" "}
                <a href="#" className="text-accent hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-accent hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <CertificateSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
