import { createContext, useContext, useState, ReactNode } from "react";

interface EnquiryFormContextType {
  isDialogOpen: boolean;
  openDialog: (buttonId?: string) => void;
  closeDialog: () => void;
  currentButtonId?: string;
}

const EnquiryFormContext = createContext<EnquiryFormContextType | undefined>(
  undefined
);

export const EnquiryFormProvider = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentButtonId, setCurrentButtonId] = useState<string | undefined>();

  const openDialog = (buttonId?: string) => {
    setCurrentButtonId(buttonId);
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentButtonId(undefined);
  };

  return (
    <EnquiryFormContext.Provider
      value={{ isDialogOpen, openDialog, closeDialog, currentButtonId }}
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

