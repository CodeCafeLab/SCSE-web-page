import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, Mail } from "lucide-react";

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
}

// Email service utility
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const sendEmailOTP = async (email: string, otp: string): Promise<boolean> => {
  try {
    // Store email OTP data in localStorage
    const emailOtpData = {
      otp: otp,
      timestamp: new Date().getTime(),
      email: email,
      attempts: 0,
    };
    localStorage.setItem("email_otp", JSON.stringify(emailOtpData));

    // Simulate API call - in production, replace with actual email service
    console.log(`Email OTP ${otp} sent to: ${email}`);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return true;
  } catch (error) {
    console.error("Error sending email OTP:", error);
    return false;
  }
};

export const EnrollmentForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Mobile OTP States
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Email OTP States
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

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
    referralCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Mobile number validation - only allow numbers and limit to 10 digits
    if (name === "mobile_no") {
      const numbers = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numbers }));
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      {
        field: "first_name",
        name: "Full Name",
        errorMessage: "Please enter your full name",
      },
      {
        field: "email",
        name: "Email",
        errorMessage:
          "Please enter a valid email address (e.g., example@domain.com)",
      },
      {
        field: "gender",
        name: "Gender",
        errorMessage: "Please select your gender",
      },
      {
        field: "birth_date",
        name: "Date of Birth",
        errorMessage: "Please enter a valid date of birth (YYYY-MM-DD)",
      },
      {
        field: "mobile_no",
        name: "Mobile Number",
        errorMessage:
          "Please enter a valid 10-digit mobile number starting with 6-9 (e.g., 9876543210)",
      },
      {
        field: "address",
        name: "Address",
        errorMessage: "Please enter your address",
      },
      { field: "city", name: "City", errorMessage: "Please enter your city" },
      {
        field: "state",
        name: "State",
        errorMessage: "Please enter your state",
      },
      {
        field: "pincode",
        name: "Pincode",
        errorMessage: "Please enter a valid pincode",
      },
      {
        field: "qualification",
        name: "Education",
        errorMessage: "Please enter your education",
      },
    ];

    // Check required fields
    for (const { field, name, errorMessage } of requiredFields) {
      const value = formData[field as keyof FormData];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        newErrors[field] = errorMessage;
      }
    }

    // Email validation
    if (formData.email) {
      if (!isValidEmail(formData.email)) {
        newErrors.email =
          "Please enter a valid email address (e.g., example@domain.com)";
      }
    }

    // Mobile number validation
    if (formData.mobile_no) {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(formData.mobile_no)) {
        newErrors.mobile_no =
          "Please enter a valid 10-digit mobile number starting with 6-9 (e.g., 9876543210)";
      }
    }

    // Date of birth validation
    if (formData.birth_date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const birthDate = new Date(formData.birth_date);

      if (isNaN(birthDate.getTime())) {
        newErrors.birth_date =
          "Please enter a valid date of birth (YYYY-MM-DD)";
      } else if (birthDate >= today) {
        newErrors.birth_date = "Date of birth cannot be in the future";
      } else {
        const minValidDate = new Date("1900-01-01");
        if (birthDate < minValidDate) {
          newErrors.birth_date = "Please enter a date after 1900";
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
            newErrors.birth_date =
              "You must be at least 18 years old to enroll";
          }
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      const emailSent = await sendEmailOTP(formData.email, newOtp);

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
  const verifyEmailOTP = () => {
    if (!emailOtp || emailOtp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    const storedData = localStorage.getItem("email_otp");
    if (!storedData) {
      toast({
        title: "OTP Expired",
        description: "Please request a new email OTP",
        variant: "destructive",
      });
      setEmailOtpSent(false);
      return;
    }

    const { otp: storedOtp, timestamp, email } = JSON.parse(storedData);
    const now = new Date().getTime();
    const OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes expiry for email

    // Check if OTP is expired
    if (now - timestamp > OTP_EXPIRY) {
      toast({
        title: "OTP Expired",
        description: "Your email OTP has expired. Please request a new one.",
        variant: "destructive",
      });
      setEmailOtpSent(false);
      return;
    }

    // Check if email matches
    if (email !== formData.email) {
      toast({
        title: "Error",
        description: "Email mismatch. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Verify OTP - must match exactly
    if (emailOtp === storedOtp) {
      setEmailOtpVerified(true);
      toast({
        title: "Email Verified ✅",
        description: "Your email has been successfully verified.",
      });
    } else {
      // Increment attempts
      const otpData = JSON.parse(storedData);
      otpData.attempts = (otpData.attempts || 0) + 1;
      localStorage.setItem("email_otp", JSON.stringify(otpData));

      // Check if too many attempts
      if (otpData.attempts >= 5) {
        toast({
          title: "Too Many Attempts",
          description: "Please request a new OTP",
          variant: "destructive",
        });
        setEmailOtpSent(false);
        return;
      }

      toast({
        title: "Incorrect OTP",
        description: "The OTP you entered is incorrect. Please try again.",
        variant: "destructive",
      });

      setEmailOtp("");
    }
  };

  // Send Mobile OTP
  const sendOTP = async () => {
    if (!formData.mobile_no || formData.mobile_no.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    setGeneratedOtp(newOtp);

    // Store OTP in localStorage with timestamp
    const otpData = {
      otp: newOtp,
      timestamp: new Date().getTime(),
      mobile: formData.mobile_no,
    };
    localStorage.setItem("enrollment_otp", JSON.stringify(otpData));

    try {
      // Always attempt to send OTP via SMS
      try {
        const url = `https://trans.ismsexpert.com/http-tokenkeyapi.php?authentic-key=393173756e63697479733130301714721103&senderid=SUNCTM&route=1&templateid=1107176258910305673&number=${formData.mobile_no}&message=Your one time code for DOS enrollment is : ${newOtp} -Suncity solar`;
        await fetch(url, {
          method: "GET",
          mode: "no-cors",
        });
      } catch (sslError) {
        console.warn("HTTPS request failed, falling back to HTTP");
        // Fallback to HTTP if HTTPS fails
        try {
          const httpUrl = `http://trans.ismsexpert.com/http-tokenkeyapi.php?authentic-key=393173756e63697479733130301714721103&senderid=SUNCTM&route=1&templateid=1107176258910305673&number=${formData.mobile_no}&message=Your one time code for DOS enrollment is : ${newOtp} -Suncity solar`;
          await fetch(httpUrl, {
            method: "GET",
            mode: "no-cors",
          });
        } catch (httpError) {
          console.error("HTTP request failed:", httpError);
          throw new Error("Failed to send OTP. Please try again later.");
        }
      }

      // Show OTP sent message and display input field
      setOtpSent(true);
      setOtp("");

      // Show success message without revealing the OTP
      toast({
        title: "OTP Sent",
        description: `A 6-digit verification code has been sent to ${formData.mobile_no}`,
      });
    } catch (error) {
      console.error("OTP sending error:", error);
      toast({
        title: "Error Sending OTP",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Verify Mobile OTP
  const verifyOTP = () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    const storedData = localStorage.getItem("enrollment_otp");
    if (!storedData) {
      toast({
        title: "OTP Expired",
        description: "Please request a new OTP",
        variant: "destructive",
      });
      setOtpSent(false);
      return;
    }

    const { otp: storedOtp, timestamp, mobile } = JSON.parse(storedData);
    const now = new Date().getTime();
    const OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes expiry

    // Check if OTP is expired
    if (now - timestamp > OTP_EXPIRY) {
      toast({
        title: "OTP Expired",
        description: "Your OTP has expired. Please request a new one.",
        variant: "destructive",
      });
      setOtpSent(false);
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
    if (otp === storedOtp) {
      setOtpVerified(true);
      toast({
        title: "Mobile Number Verified ✅",
        description: "Your mobile number has been successfully verified.",
      });
    } else {
      const errorMessage =
        "The OTP you entered is incorrect. Please try again.";

      toast({
        title: "Incorrect OTP",
        description: errorMessage,
        variant: "destructive",
      });

      setOtp("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpVerified) {
      toast({
        title: "Mobile verification required",
        description: "Please verify your mobile number before submitting",
        variant: "destructive",
      });
      return;
    }


    const isValid = validateForm();
    if (!isValid) {
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
        course: "Solar Panel Technology: From Basics to Installation",
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

  if (success) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-6">
        <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
        <h2 className="text-3xl font-bold text-primary">
          Enrollment Successful!
        </h2>
        <p className="text-lg text-muted-foreground">
          Your enrollment has been submitted successfully.
        </p>
        <Button onClick={() => setSuccess(false)}>
          Submit Another Enrollment
        </Button>
      </div>
    );
  }

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
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile_no">Mobile Number *</Label>
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
              {!otpSent ? (
                <Button
                  type="button"
                  onClick={sendOTP}
                  disabled={formData.mobile_no.length !== 10 || isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              ) : !otpVerified ? (
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);
                        setOtp(value);
                      }}
                      maxLength={6}
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      onClick={verifyOTP}
                      disabled={otp.length !== 6 || isLoading}
                      className="w-full sm:w-auto"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter the 6-digit code sent to {formData.mobile_no}
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setOtpSent(false)}
                    className="h-auto p-0 text-sm"
                  >
                    Change number
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Mobile number verified</span>
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
            <Input
              id="presentOccupation"
              name="presentOccupation"
              value={formData.presentOccupation}
              onChange={handleInputChange}
              placeholder="e.g., Student, Business, Job, etc."
            />
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
      </div>

      {/* Address Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
          Address Information
        </h2>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="address">Full Address *</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="Enter your complete address"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                placeholder="Enter your city"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                placeholder="Enter your state"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
                placeholder="Enter 6-digit pincode"
                maxLength={6}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={isLoading || !otpVerified }
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
                  {!otpVerified 
                    ? "Complete Verification to Enroll"
                    : "Enroll Now"}
                </span>
              </>
            )}
          </span>

          <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-full bg-white/20 -skew-x-12 transition-all duration-500 ease-in-out group-hover:left-full"></span>
        </button>

        {/* Verification Status */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div
            className={`flex items-center gap-2 ${
              otpVerified ? "text-green-600" : "text-gray-500"
            }`}
          >
            <CheckCircle className="h-4 w-4" />
            <span>Mobile {otpVerified ? "Verified" : "Verification"}</span>
          </div>
          <div
            className={`flex items-center gap-2 ${
              emailOtpVerified ? "text-green-600" : "text-gray-500"
            }`}
          >
            <CheckCircle className="h-4 w-4" />
            <span>Email {emailOtpVerified ? "Verified" : "Verification"}</span>
          </div>
        </div>
      </div>
    </form>
  );
};
