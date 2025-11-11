import { ReactNode, useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className = "" }: LayoutProps) => {
  // Add viewport meta tag for better mobile responsiveness
  useEffect(() => {
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover';
    document.head.appendChild(viewportMeta);
    
    return () => {
      document.head.removeChild(viewportMeta);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <TooltipProvider>
        <Header />
        <main className={cn("flex-1 w-full", className)}>{children}</main>
        <Footer />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </div>
  );
};
