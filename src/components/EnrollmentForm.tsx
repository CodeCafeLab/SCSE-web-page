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
      const apiPayload = {
        first_name: formData.first_name.trim(),
        email: formData.email.trim(),
        gender: formData.gender,
        birth_date: formatDateForAPI(formData.birth_date),
        mobile_no: formData.mobile_no.replace(/\D/g, ""),
        advisor_id: "advisor1",
        course: "Solar Panel Technology: From Basics to Installation",
        amount: 11700,
        currency: "INR",
        address: formData.address.trim(),
        city: formData.city.trim(),
        address_type: "Billing",
      };

      const response = await fetch(
        "https://erp.suncitysolar.in/api/method/lms_enrollment_api",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiPayload),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        let errorMessage = "API request failed";
        if (responseData.message) {
          errorMessage =
            typeof responseData.message === "string"
              ? responseData.message
              : JSON.stringify(responseData.message);
        }
        throw new Error(errorMessage);
      }

      setSuccess(true);
      toast({
        title: "Enrollment Successful!",
        description: "Your enrollment has been submitted successfully.",
        variant: "default",
      });

      // Reset form
      setFormData({
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
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast({
        title: "Error",
        description: errorMessage,
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
      <div className="flex justify-center pt-6">
        <Button
          type="submit"
          className="w-full md:w-auto px-8 py-3 text-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Enrollment"
          )}
        </Button>
      </div>
    </form>
  );
};
