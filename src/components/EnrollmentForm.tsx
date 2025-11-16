import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const verifyEmailOTPApi = async (
  email: string,
  otp: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/otp/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
      credentials: "include", // Include cookies if needed
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return {
      success: false,
      message: "Failed to verify OTP. Please try again.",
    };
  }
};

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, Mail, MapPin } from "lucide-react";
// import PaymentButton from "./PaymentButton";

interface FormData {
  first_name: string;
  email: string;
  gender: string;
  birth_date: string;
  mobile_no: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  qualification: string;
  presentOccupation: string;
  referralCode: string;
  sourceOfKnowledge: string;
}

// Pincode API response interface
interface PincodeResponse {
  Message: string;
  Status: string;
  PostOffice: Array<{
    Name: string;
    Description: string;
    BranchType: string;
    DeliveryStatus: string;
    Circle: string;
    District: string;
    Division: string;
    Region: string;
    Block: string;
    State: string;
    Country: string;
    Pincode: string;
  }> | null;
}

// Email validation utility
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Send OTP to email
const sendEmailOTP = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/otp/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Failed to send OTP. Please try again." };
  }
};

// Fetch pincode details
const fetchPincodeDetails = async (
  pincode: string
): Promise<PincodeResponse> => {
  try {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data[0]; // The API returns an array with one object
  } catch (error) {
    console.error("Error fetching pincode details:", error);
    throw new Error("Failed to fetch pincode details. Please try again.");
  }
};

// WhatsApp OTP service
const sendWhatsAppOTP = async (
  mobileNumber: string,
  otp: string
): Promise<boolean> => {
  try {
    const whatsappData = {
      messaging_product: "whatsapp",
      to: `91${mobileNumber}`, // Adding country code for India
      type: "template",
      template: {
        name: "dos_whatsapp_otp",
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: [{ type: "text", text: otp }],
          },
          {
            type: "button",
            sub_type: "url",
            index: "0",
            parameters: [{ type: "text", text: otp }],
          },
        ],
      },
    };

    const response = await fetch(
      "https://graph.facebook.com/v21.0/693968290464705/messages",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer EAAJuG4JpTp0BPIt1ZA5XVA3KaE7wop1QCv2ZCwnMmn7U5D4E6nRzaROnsrHEdkuGE457GQo9GMmYI5KLZClWmRQDe9evmUFuHZAZAMZBSs5quKnSssfKf9HK4b4d7YHBZBFjdKH8j3ZBGHL9iCCFXXOblOZCRTGZC2LJLhGP8TZCvzlFZA66PvG9OZAzaveSK1Ix3c6PwBgZDZD",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(whatsappData),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("WhatsApp API error:", errorData);
      throw new Error(`WhatsApp API responded with status: ${response.status}`);
    }

    const result = await response.json();
    console.log("WhatsApp OTP sent successfully:", result);

    return true;
  } catch (error) {
    console.error("Error sending WhatsApp OTP:", error);
    throw error;
  }
};

interface EnrollmentFormProps {
  advisorId?: string;
}

export const EnrollmentForm = ({ advisorId }: EnrollmentFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isTestMode, setIsTestMode] = useState(
    process.env.NODE_ENV === "development"
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFetchingPincode, setIsFetchingPincode] = useState(false);

  // WhatsApp OTP States
  const [whatsappOtp, setWhatsappOtp] = useState("");
  const [whatsappOtpSent, setWhatsappOtpSent] = useState(false);
  const [whatsappOtpVerified, setWhatsappOtpVerified] = useState(false);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);

  // Email OTP States
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Terms & Conditions State
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Set initial form data with advisorId if provided
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    email: "",
    gender: "",
    birth_date: "",
    mobile_no: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    qualification: "",
    presentOccupation: "",
    referralCode: advisorId || "", // Auto-fill with advisorId if provided
    sourceOfKnowledge: "",
  });

  // Update referral code if advisorId changes
  useEffect(() => {
    if (advisorId) {
      setFormData((prev) => ({
        ...prev,
        referralCode: advisorId,
      }));
    }
  }, [advisorId]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Clear error for the current field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Mobile number validation - only allow numbers and limit to 10 digits
    if (name === "mobile_no") {
      const numbers = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numbers }));

      // Reset WhatsApp OTP state if mobile number changes
      if (whatsappOtpSent) {
        setWhatsappOtpSent(false);
        setWhatsappOtpVerified(false);
        setWhatsappOtp("");
      }
      return;
    }

    // If email is changed, reset email verification
    if (name === "email" && emailOtpSent) {
      setEmailOtpSent(false);
      setEmailOtpVerified(false);
      setEmailOtp("");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle pincode change and fetch details
  const handlePincodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pincode = e.target.value.replace(/\D/g, "").slice(0, 6);

    setFormData((prev) => ({ ...prev, pincode }));

    // Clear error for pincode when user starts typing
    if (errors.pincode) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.pincode;
        return newErrors;
      });
    }

    // Fetch pincode details when 6 digits are entered
    if (pincode.length === 6) {
      setIsFetchingPincode(true);
      try {
        const pincodeData = await fetchPincodeDetails(pincode);

        if (
          pincodeData.Status === "Success" &&
          pincodeData.PostOffice &&
          pincodeData.PostOffice.length > 0
        ) {
          const firstPostOffice = pincodeData.PostOffice[0];
          const city = firstPostOffice.District || firstPostOffice.Name;
          const state = firstPostOffice.State;

          // Create complete address from pincode API response
          const completeAddress = `${city}, ${state} - ${pincode}`;

          // Update form data with address, city, and state (hidden from user)
          setFormData((prev) => ({
            ...prev,
            address: completeAddress,
            city: city,
            state: state,
          }));

          toast({
            title: "Address auto-filled!",
            description: `Address details saved for pincode ${pincode}`,
          });

          console.log("Auto-filled address details:", {
            address: completeAddress,
            city: city,
            state: state,
            pincode: pincode,
          });
        } else {
          toast({
            title: "Invalid Pincode",
            description:
              pincodeData.Message ||
              "No address found for this pincode. Please check and try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching pincode details:", error);
        toast({
          title: "Error",
          description: "Failed to fetch address details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsFetchingPincode(false);
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Only validate if form has been submitted
    if (!isSubmitted) return true;

    const requiredFields = [
      {
        field: "first_name",
        name: "Full Name",
        errorMessage: "Full name is required",
      },
      {
        field: "email",
        name: "Email",
        errorMessage: "Valid email is required",
      },
      {
        field: "gender",
        name: "Gender",
        errorMessage: "Please select your gender",
      },
      {
        field: "birth_date",
        name: "Date of Birth",
        errorMessage: "Valid date of birth is required",
      },
      {
        field: "mobile_no",
        name: "Mobile Number",
        errorMessage: "Valid 10-digit mobile number is required",
      },
      {
        field: "address",
        name: "Address",
        errorMessage: "Address is required - please enter pincode to auto-fill",
      },
      {
        field: "pincode",
        name: "Pincode",
        errorMessage: "Valid 6-digit pincode is required",
      },
      {
        field: "qualification",
        name: "Education",
        errorMessage: "Please select your education",
      },
      {
        field: "sourceOfKnowledge",
        name: "Source of Knowledge",
        errorMessage: "Please select how you heard about us",
      },
    ];

    // Check required fields
    for (const { field, errorMessage } of requiredFields) {
      const value = formData[field as keyof FormData];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        newErrors[field] = errorMessage;
      }
    }

    // Email validation
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Mobile number validation
    if (formData.mobile_no) {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(formData.mobile_no)) {
        newErrors.mobile_no = "Please enter a valid 10-digit mobile number";
      }
    }

    // Pincode validation
    if (formData.pincode && formData.pincode.length !== 6) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    // Date of birth validation
    if (formData.birth_date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const birthDate = new Date(formData.birth_date);

      if (isNaN(birthDate.getTime())) {
        newErrors.birth_date = "Please enter a valid date of birth";
      } else if (birthDate >= today) {
        newErrors.birth_date = "Date of birth cannot be in the future";
      } else {
        const minValidDate = new Date("1900-01-01");
        if (birthDate < minValidDate) {
          newErrors.birth_date = "Please enter a valid date of birth";
        } else {
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }

          if (age < 18) {
            newErrors.birth_date = "You must be at least 18 years old";
          }
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send WhatsApp OTP
  const sendWhatsAppOTPHandler = async () => {
    if (!formData.mobile_no || formData.mobile_no.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsSendingWhatsApp(true);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP

    try {
      // Store WhatsApp OTP data in localStorage
      const whatsappOtpData = {
        otp: newOtp,
        timestamp: new Date().getTime(),
        mobile: formData.mobile_no,
        attempts: 0,
      };
      localStorage.setItem("whatsapp_otp", JSON.stringify(whatsappOtpData));

      // Send WhatsApp OTP
      await sendWhatsAppOTP(formData.mobile_no, newOtp);

      setWhatsappOtpSent(true);
      setWhatsappOtp("");

      toast({
        title: "WhatsApp OTP Sent",
        description: `A 6-digit verification code has been sent to your WhatsApp number ${formData.mobile_no}`,
      });
    } catch (error) {
      console.error("WhatsApp OTP sending error:", error);
      toast({
        title: "Error Sending WhatsApp OTP",
        description: "Failed to send WhatsApp OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSendingWhatsApp(false);
    }
  };

  // Verify WhatsApp OTP
  const verifyWhatsAppOTP = () => {
    if (!whatsappOtp || whatsappOtp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    const storedData = localStorage.getItem("whatsapp_otp");
    if (!storedData) {
      toast({
        title: "OTP Expired",
        description: "Please request a new WhatsApp OTP",
        variant: "destructive",
      });
      setWhatsappOtpSent(false);
      return;
    }

    const { otp: storedOtp, timestamp, mobile } = JSON.parse(storedData);
    const now = new Date().getTime();
    const OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes expiry for WhatsApp

    // Check if OTP is expired
    if (now - timestamp > OTP_EXPIRY) {
      toast({
        title: "OTP Expired",
        description: "Your WhatsApp OTP has expired. Please request a new one.",
        variant: "destructive",
      });
      setWhatsappOtpSent(false);
      return;
    }

    // Check if mobile number matches
    if (mobile !== formData.mobile_no) {
      toast({
        title: "Error",
        description: "Mobile number mismatch. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Verify OTP - must match exactly
    if (whatsappOtp === storedOtp) {
      setWhatsappOtpVerified(true);
      toast({
        title: "WhatsApp Verified ✅",
        description:
          "Your mobile number has been successfully verified via WhatsApp.",
      });
    } else {
      // Increment attempts
      const otpData = JSON.parse(storedData);
      otpData.attempts = (otpData.attempts || 0) + 1;
      localStorage.setItem("whatsapp_otp", JSON.stringify(otpData));

      // Check if too many attempts
      if (otpData.attempts >= 5) {
        toast({
          title: "Too Many Attempts",
          description: "Please request a new OTP",
          variant: "destructive",
        });
        setWhatsappOtpSent(false);
        return;
      }

      toast({
        title: "Incorrect OTP",
        description: "The OTP you entered is incorrect. Please try again.",
        variant: "destructive",
      });

      setWhatsappOtp("");
    }
  };

  // Send Email OTP
  const sendEmailOTPHandler = async () => {
    if (!formData.email || !isValidEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSendingEmail(true);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP

    try {
      const emailSent = await sendEmailOTP(formData.email);

      if (emailSent) {
        setEmailOtpSent(true);
        setEmailOtp("");

        toast({
          title: "Email Verification Sent",
          description: `A 6-digit verification code has been sent to ${formData.email}`,
        });
      } else {
        throw new Error("Failed to send email OTP");
      }
    } catch (error) {
      console.error("Email OTP sending error:", error);
      toast({
        title: "Error Sending Email OTP",
        description: "Failed to send verification email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Verify Email OTP
  const verifyEmailOTP = async () => {
    if (!emailOtp || emailOtp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsSendingEmail(true);

    try {
      // Call the verifyEmailOTPApi function to verify OTP with the database
      const verification = await verifyEmailOTPApi(formData.email, emailOtp);

      if (verification.success) {
        // If OTP is correct
        setEmailOtpVerified(true);
        toast({
          title: "Email Verified ✅",
          description: "Your email has been successfully verified.",
        });
      } else {
        // If OTP is incorrect
        toast({
          title: "Verification Failed",
          description:
            verification.message || "Incorrect OTP. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        title: "Verification Error",
        description:
          "An error occurred while verifying the OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Set form as submitted to show validation errors
    setIsSubmitted(true);

    if (!whatsappOtpVerified) {
      toast({
        title: "WhatsApp verification required",
        description:
          "Please verify your mobile number via WhatsApp before submitting",
        variant: "destructive",
      });
      return;
    }

    // Check if terms are accepted
    if (!acceptedTerms) {
      toast({
        title: "Terms & Conditions Required",
        description: "Please accept the Terms & Conditions to proceed",
        variant: "destructive",
      });
      return;
    }

    // First validate the form
    const isValid = validateForm();

    // If there are errors, show them and don't proceed with submission
    if (Object.keys(errors).length > 0) {
      // Find the first field with an error and scroll to it
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    setIsLoading(true);

    try {
      // Prepare form data for URL parameters
      const formDataForUrl = new URLSearchParams();
      const formPayload = {
        first_name: formData.first_name.trim(),
        email: formData.email.trim(),
        gender: formData.gender,
        birth_date: formData.birth_date,
        mobile_no: formData.mobile_no.replace(/\D/g, ""),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state,
        pincode: formData.pincode,
        qualification: formData.qualification,
        present_occupation: formData.presentOccupation,
        referral_code: formData.referralCode.trim(),
        source_of_knowledge: formData.sourceOfKnowledge,
        course: "Solar business training course",
        amount: "11700",
        currency: "INR",
      };

      // Add form data to URL parameters
      Object.entries(formPayload).forEach(([key, value]) => {
        if (value) formDataForUrl.append(key, value);
      });

      // Create redirect URL with form data as query parameters
      const baseUrl = `${window.location.origin}/thank-you`;
      const redirectUrl = `${baseUrl}?${formDataForUrl.toString()}`;

      // Redirect to Cashfree payment page with the redirect URL
      const cashfreeUrl = new URL(
        "https://payments.cashfree.com/forms/solar-training-jan2026"
      );
      cashfreeUrl.searchParams.append("redirect", "true");
      cashfreeUrl.searchParams.append("redirectUrl", redirectUrl);

      // Add any additional parameters required by Cashfree
      cashfreeUrl.searchParams.append(
        "customerName",
        formData.first_name.trim()
      );
      cashfreeUrl.searchParams.append("customerEmail", formData.email.trim());
      cashfreeUrl.searchParams.append(
        "customerPhone",
        formData.mobile_no.replace(/\D/g, "")
      );
      cashfreeUrl.searchParams.append("amount", "11700");

      // Save form data to localStorage before redirecting
      const formDataForStorage = {
        ...formPayload,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(
        "enrollmentFormData",
        JSON.stringify(formDataForStorage)
      );
      console.log("Form data saved to localStorage");

      // Redirect to Cashfree payment page
      window.location.href = cashfreeUrl.toString();
    } catch (error) {
      console.error("Error redirecting to payment:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Error",
        description: `Failed to process payment: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Test handler for PaymentButton
  const handleTestPayment = async () => {
    try {
      setIsLoading(true);
      // Simulate a successful payment after a short delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Test Payment Successful",
        description: "This is a test payment simulation.",
        variant: "default",
      });
    } catch (error) {
      console.error("Test payment failed:", error);
      toast({
        title: "Test Payment Failed",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">Enrollment Form</h1>
        <p className="text-gray-600">
          Please fill in your details to enroll in the course
        </p>
      </div>

      {/* Personal Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="first_name">Full Name *</Label>
            <Input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => validateForm()}
              className={errors.email ? "border-red-500" : ""}
              placeholder="e.g., john.doe@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}

            <div className="mt-2">
              {!emailOtpSent ? (
                <Button
                  type="button"
                  onClick={sendEmailOTPHandler}
                  disabled={
                    !formData.email ||
                    !isValidEmail(formData.email) ||
                    isSendingEmail
                  }
                  className="w-full sm:w-auto"
                  variant="outline"
                  size="sm"
                >
                  {isSendingEmail ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Verify Email
                    </>
                  )}
                </Button>
              ) : !emailOtpVerified ? (
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={emailOtp}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);
                        setEmailOtp(value);
                      }}
                      maxLength={6}
                      className="flex-1"
                      disabled={isSendingEmail}
                    />
                    <Button
                      type="button"
                      onClick={verifyEmailOTP}
                      disabled={emailOtp.length !== 6 || isSendingEmail}
                      className="w-full sm:w-auto"
                      size="sm"
                    >
                      {isSendingEmail ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify Email OTP"
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter the 6-digit code sent to {formData.email}
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setEmailOtpSent(false)}
                    className="h-auto p-0 text-sm"
                  >
                    Change email
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Email verified</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile_no">WhatsApp Number *</Label>
            <Input
              id="mobile_no"
              name="mobile_no"
              type="tel"
              value={formData.mobile_no}
              onChange={handleInputChange}
              onBlur={() => validateForm()}
              className={errors.mobile_no ? "border-red-500" : ""}
              placeholder="e.g., 9876543210"
              maxLength={10}
            />
            {errors.mobile_no && (
              <p className="text-sm text-red-500 mt-1">{errors.mobile_no}</p>
            )}

            <div className="mt-2">
              {!whatsappOtpSent ? (
                <Button
                  type="button"
                  onClick={sendWhatsAppOTPHandler}
                  disabled={
                    formData.mobile_no.length !== 10 || isSendingWhatsApp
                  }
                  className="w-full sm:w-auto "
                  variant="outline"
                  size="sm"
                >
                  {isSendingWhatsApp ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              ) : !whatsappOtpVerified ? (
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={whatsappOtp}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);
                        setWhatsappOtp(value);
                      }}
                      maxLength={6}
                      className="flex-1"
                      disabled={isSendingWhatsApp}
                    />
                    <Button
                      type="button"
                      onClick={verifyWhatsAppOTP}
                      disabled={whatsappOtp.length !== 6 || isSendingWhatsApp}
                      className="w-full sm:w-auto"
                    >
                      {isSendingWhatsApp ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify Number"
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter the 6-digit code sent to your WhatsApp number {formData.mobile_no}
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setWhatsappOtpSent(false)}
                    className="h-auto p-0 text-sm"
                  >
                    Change number
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">WhatsApp number verified</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gender *</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleSelectChange("gender", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birth_date">Date of Birth *</Label>
            <Input
              id="birth_date"
              name="birth_date"
              type="date"
              value={formData.birth_date}
              onChange={handleInputChange}
              onBlur={() => validateForm()}
              className={errors.birth_date ? "border-red-500" : ""}
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.birth_date && (
              <p className="text-sm text-red-500 mt-1">{errors.birth_date}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualification">Highest Education *</Label>
            <Select
              value={formData.qualification}
              onValueChange={(value) =>
                handleSelectChange("qualification", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your highest education" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8th">8th Standard</SelectItem>
                <SelectItem value="10th">10th Standard</SelectItem>
                <SelectItem value="12th">12th Standard</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
                <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                <SelectItem value="masters">Master's Degree</SelectItem>
                <SelectItem value="phd">Ph.D. or higher</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="presentOccupation">Present Occupation</Label>
            <select
              id="presentOccupation"
              name="presentOccupation"
              value={formData.presentOccupation}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select your occupation</option>
              <option value="ELECTRICIAN">Electrician</option>
              <option value="Technician">Technician</option>
              <option value="plumber">Plumber</option>
              <option value="Student">Student</option>
              <option value="Employed">Employed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Business Owner">Business Owner</option>
              <option value="Homemaker">Homemaker</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Retired">Retired</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sourceOfKnowledge">
              How did you hear about DOS? *
            </Label>
            <Select
              value={formData.sourceOfKnowledge}
              onValueChange={(value) =>
                handleSelectChange("sourceOfKnowledge", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friend">Friend/Relative</SelectItem>
                <SelectItem value="social_media">Social Media</SelectItem>
                <SelectItem value="newspaper">Newspaper</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="seminar">Seminar/Workshop</SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.sourceOfKnowledge && (
              <p className="text-sm text-red-500 mt-1">
                {errors.sourceOfKnowledge}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="referralCode">Referral Code (Optional)</Label>
              <span className="text-xs text-gray-500">
                Have a referral code?
              </span>
            </div>
            <div className="relative">
              <Input
                id="referralCode"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleInputChange}
                placeholder="Enter referral code if any"
                className="pr-24"
              />
              <button
                type="button"
                onClick={() => {
                  toast({
                    title: formData.referralCode
                      ? "Referral code applied!"
                      : "Please enter a referral code",
                    variant: formData.referralCode ? "default" : "destructive",
                  });
                }}
                disabled={!formData.referralCode}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode *</Label>
            <div className="relative">
              <Input
                id="pincode"
                name="pincode"
                type="text"
                value={formData.pincode}
                onChange={handlePincodeChange}
                required
                placeholder="Enter 6-digit pincode"
                maxLength={6}
                className={errors.pincode ? "border-red-500 pr-10" : "pr-10"}
                disabled={isFetchingPincode}
              />
              {isFetchingPincode && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-blue-600" />
              )}
              {!isFetchingPincode && formData.pincode.length === 6 && (
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
              )}
            </div>
            {errors.pincode && (
              <p className="text-sm text-red-500 mt-1">{errors.pincode}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Enter your 6-digit pincode to automatically fill your address
              details
            </p>
          </div>

          {/* Hidden fields - data is stored but not shown to user */}
          <div style={{ display: "none" }}>
            <Input name="address" value={formData.address} readOnly />
            <Input name="city" value={formData.city} readOnly />
            <Input name="state" value={formData.state} readOnly />
          </div>
        </div>
      </div>

      {/* Terms & Conditions Section */}
      <div className="space-y-4 p-6 bg-gray-50 rounded-lg border">
        <div className="space-y-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>Declaration:</strong> "I have read, understood, and accepted
            the
            <a
              href="/terms"
              target="_blank"
              className="text-blue-600 hover:text-blue-800 underline mx-1"
            >
              Terms & Conditions for Course enrollment
            </a>
            ,
            <a
              href="/privacy-policy"
              target="_blank"
              className="text-blue-600 hover:text-blue-800 underline mx-1"
            >
              privacy policy
            </a>
            ,
            <a
              href="/refund-policy"
              target="_blank"
              className="text-blue-600 hover:text-blue-800 underline mx-1"
            >
              Course Refund & Cancellation Policy
            </a>
            and
            <a
              href="/terms-of-use"
              target="_blank"
              className="text-blue-600 hover:text-blue-800 underline mx-1"
            >
              website usage terms and conditions
            </a>
            of Discovery of Success (DOS) - A business school of Suncity Solar.
            I hereby undertake and agree that I shall abide by all the policies
            and T&C as mentioned and be amended from time to time at the sole
            discretion of the management."
          </p>

          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>Consent:</strong> "I willingly like to proceed further by
            accepting and giving my consent in complete sense and to the best of
            my knowledge."
          </p>
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="acceptTerms"
            className="text-sm font-medium text-gray-900 cursor-pointer select-none"
          >
            I accept the Terms & Conditions and give my consent as mentioned
            above
          </label>
        </div>
      </div>

      {/* <PaymentButton
        amount={1} // Amount in INR
        customer={{
          name: "John Doe",
          email: "antima142005@gmail.com",
          phone: "8619749796",
        }}
        onSuccess={(response) => {
          console.log("Payment successful:", response);
          // Handle successful payment
        }}
        onFailure={(error) => {
          console.error("Payment failed:", error);
          // Handle payment failure
        }}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
      >
        Pay Now
      </PaymentButton> */}
      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={isLoading || !whatsappOtpVerified || !acceptedTerms}
          className={`
            w-full py-4 px-6 text-lg font-semibold text-white rounded-xl
            bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900
            shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-80 disabled:cursor-not-allowed
            relative overflow-hidden group
          `}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span className="text-yellow-300">🎓</span>
                <span>
                  {!whatsappOtpVerified || !acceptedTerms
                    ? "Complete Verification & Accept Terms to Enroll"
                    : "Join Course just in ₹11,700"}
                </span>
              </>
            )}
          </span>

          <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-full bg-white/20 -skew-x-12 transition-all duration-500 ease-in-out group-hover:left-full"></span>
        </button>

        {/* Helper text */}
        {(!whatsappOtpVerified || !acceptedTerms) && (
          <p className="text-sm text-center text-gray-600 mt-3">
            {!whatsappOtpVerified && !acceptedTerms
              ? "Complete WhatsApp verification and accept Terms & Conditions to enable enrollment"
              : !whatsappOtpVerified
              ? "Complete WhatsApp verification to enable enrollment"
              : "Please accept the Terms & Conditions to enable enrollment"}
          </p>
        )}
      </div>
    </form>
  );
};
