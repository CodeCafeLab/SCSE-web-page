import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EnquiryForm } from "./EnquiryForm";
import { X, Sparkles } from "lucide-react";
import { useEnquiryForm } from "@/contexts/EnquiryFormContext";

interface EnquiryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EnquiryFormDialog = ({
  open,
  onOpenChange,
}: EnquiryFormDialogProps) => {
  const { currentButtonId } = useEnquiryForm();
  
  const handleSuccess = () => {
    // Close dialog after successful submission
    setTimeout(() => {
      onOpenChange(false);
    }, 1500); // Delay to show success message
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-hidden p-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white border-0 shadow-2xl rounded-2xl [&>button]:hidden">
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-t-2xl" />
        
        {/* Header Section with gradient background */}
        <div className="relative px-6 md:px-8 pt-8 pb-6 bg-gradient-to-r from-blue-900/50 to-blue-800/30 border-b border-white/10">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 z-10 rounded-full p-2 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-blue-900"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
          
          <DialogHeader className="space-y-3 pr-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-400/20 rounded-lg">
                <Sparkles className="h-6 w-6 text-yellow-400" />
              </div>
              <DialogTitle className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Get In Touch With Us
              </DialogTitle>
            </div>
            <DialogDescription className="text-blue-100/90 text-base leading-relaxed pt-2">
              Fill out the form below and our team will get back to you soon. 
              <span className="block mt-1 text-sm text-blue-200/70">
                We're here to help you start your solar career journey!
              </span>
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form Content with scrollable area */}
        <div className="px-6 md:px-8 py-6 overflow-y-auto max-h-[calc(95vh-180px)] custom-scrollbar">
          <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8">
            <EnquiryForm onSuccess={handleSuccess} buttonId={currentButtonId} />
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 rounded-b-2xl" />
      </DialogContent>

      {/* Custom scrollbar and overlay styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251, 191, 36, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 191, 36, 0.5);
        }
        /* Overlay blur effect */
        [data-radix-dialog-overlay] {
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
      `}</style>
    </Dialog>
  );
};

