import { createContext, useContext, useState, ReactNode } from "react";

interface EnquiryFormContextType {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const EnquiryFormContext = createContext<EnquiryFormContextType | undefined>(
  undefined
);

export const EnquiryFormProvider = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <EnquiryFormContext.Provider
      value={{ isDialogOpen, openDialog, closeDialog }}
    >
      {children}
    </EnquiryFormContext.Provider>
  );
};

export const useEnquiryForm = () => {
  const context = useContext(EnquiryFormContext);
  if (context === undefined) {
    throw new Error(
      "useEnquiryForm must be used within an EnquiryFormProvider"
    );
  }
  return context;
};

