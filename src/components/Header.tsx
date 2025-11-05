import suncityLogo from "@/assets/suncity-logo.jpg";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={suncityLogo}
              alt="Suncity Solar Learning Program"
              className="h-14 w-14 object-contain rounded-xl"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-primary">
                Discovery of Success
              </h1>
              <p className="text-xs md:text-sm text-accent font-semibold">
                India's #1 Solar Education & Success Program
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Course Fee</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-accent to-[hsl(35,100%,55%)] bg-clip-text text-transparent">
                ₹11,700
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
