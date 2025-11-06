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
import { Loader2, CheckCircle } from "lucide-react";

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

export const EnrollmentForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateForAPI = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const validateForm = (): string | null => {
    const requiredFields = [
      { field: "first_name", name: "Full Name" },
      { field: "email", name: "Email" },
      { field: "gender", name: "Gender" },
      { field: "birth_date", name: "Date of Birth" },
      { field: "mobile_no", name: "Mobile Number" },
      { field: "address", name: "Address" },
      { field: "city", name: "City" },
      { field: "state", name: "State" },
      { field: "pincode", name: "Pincode" },
    ];

    for (const { field, name } of requiredFields) {
      const value = formData[field as keyof FormData];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        return `${name} is required`;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address.";
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile_no.replace(/\D/g, ""))) {
      return "Please enter a valid 10-digit Indian mobile number.";
    }

    const today = new Date();
    const birthDate = new Date(formData.birth_date);
    if (birthDate >= today) {
      return "Date of birth must be in the past.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive",
      });
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
        mobile_no: formData.mobile_no.replace(/\D/g, ''),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state,
        pincode: formData.pincode,
        qualification: formData.qualification,
        present_occupation: formData.presentOccupation,
        referral_code: formData.referralCode.trim(),
        course: "Solar Panel Technology: From Basics to Installation",
        amount: "11700",
        currency: "INR"
      };

      // Add form data to URL parameters
      Object.entries(formPayload).forEach(([key, value]) => {
        if (value) formDataForUrl.append(key, value);
      });

      // Create redirect URL with form data as query parameters
      const baseUrl = `${window.location.origin}/thank-you`;
      const redirectUrl = `${baseUrl}?${formDataForUrl.toString()}`;

      // Redirect to Cashfree payment page with the redirect URL
      const cashfreeUrl = new URL('https://payments.cashfree.com/forms/solar-training-jan2026');
      cashfreeUrl.searchParams.append('redirect', 'true');
      cashfreeUrl.searchParams.append('redirectUrl', redirectUrl);
      
      // Add any additional parameters required by Cashfree
      cashfreeUrl.searchParams.append('customerName', formData.first_name.trim());
      cashfreeUrl.searchParams.append('customerEmail', formData.email.trim());
      cashfreeUrl.searchParams.append('customerPhone', formData.mobile_no.replace(/\D/g, ''));
      cashfreeUrl.searchParams.append('amount', '11700');
      
      // Save form data to localStorage before redirecting
      const formDataForStorage = {
        ...formPayload,
        // Add any additional fields you want to store
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('enrollmentFormData', JSON.stringify(formDataForStorage));
      console.log('Form data saved to localStorage');
      
      // Redirect to Cashfree payment page
      window.location.href = cashfreeUrl.toString();
    } catch (error) {
      console.error('Error redirecting to payment:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
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
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile_no">Mobile Number *</Label>
            <Input
              id="mobile_no"
              name="mobile_no"
              type="tel"
              value={formData.mobile_no}
              onChange={handleInputChange}
              required
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
            />
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
              required
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualification">Qualification</Label>
            <Input
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              placeholder="e.g., B.Tech, BBA, 12th, etc."
            />
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
              <span className="text-xs text-gray-500">Have a referral code?</span>
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
                  // Add any referral code validation logic here
                  toast({
                    title: formData.referralCode ? "Referral code applied!" : "Please enter a referral code",
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
          disabled={isLoading}
          className={`
            w-full py-4 px-6 text-lg font-semibold text-white rounded-xl
            bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900
            shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-80 disabled:cursor-not-allowed
            relative overflow-hidden group
          `}
        >
          {/* Animated background effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          
          {/* Button content */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span className="text-yellow-300">🎓</span>
                <span>Enroll Now for Just ₹11,700</span>
                <span className="ml-2 px-2 py-0.5 text-sm bg-yellow-400/20 text-yellow-100 rounded-full">
                  Limited Seats
                </span>
                <span className="absolute -right-2 -top-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                  SAVE 20%
                </span>
              </>
            )}
          </span>
          
          {/* Shine effect on hover */}
          <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-full bg-white/20 -skew-x-12 transition-all duration-500 ease-in-out group-hover:left-full"></span>
        </button>
  
      </div>
    </form>
  );
};
