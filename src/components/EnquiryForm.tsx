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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EnquiryFormData {
  name: string;
  phone: string;
  city: string;
  occupation: string;
  batchPreference: string;
  message?: string;
}

interface EnquiryFormProps {
  onSuccess?: () => void;
}

export const EnquiryForm = ({ onSuccess }: EnquiryFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    phone: "",
    city: "",
    occupation: "",
    batchPreference: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    // Phone number validation - only allow numbers and limit to 10 digits
    if (name === "phone") {
      const numbers = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numbers }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    // Clear error for the current field when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation (required)
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Phone validation (required)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // City validation (required)
    if (!formData.city.trim()) {
      newErrors.city = "City name is required";
    }

    // Occupation validation (required)
    if (!formData.occupation) {
      newErrors.occupation = "Occupation is required";
    }

    // Batch preference validation (required)
    if (!formData.batchPreference) {
      newErrors.batchPreference = "Please select when you want to join";
    }

    // Message validation (optional - no validation needed)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://erp.suncitysolar.in/api/method/create_website_lead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            city: formData.city.trim(),
            occupation: formData.occupation,
            batchPreference: formData.batchPreference,
            message: formData.message.trim() || undefined,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.message?.success) {
        toast({
          title: "Success!",
          description:
            "Your enquiry has been submitted successfully. We'll get back to you soon.",
        });

        // Reset form
        setFormData({
          name: "",
          phone: "",
          city: "",
          occupation: "",
          batchPreference: "",
          message: "",
        });

        navigate("/enquiry/thank-you");

        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error(
          data.message?.message || "Failed to submit enquiry. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit enquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-blue-100">
            Name *
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name"
            className="bg-white/5 border-white/20 text-white placeholder-blue-300 focus:ring-yellow-400"
            required
          />
          {errors.name && (
            <p className="text-sm text-red-300 mt-1">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-blue-100">
            Mobile No. *
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Your phone number"
            maxLength={10}
            className="bg-white/5 border-white/20 text-white placeholder-blue-300 focus:ring-yellow-400"
            required
          />
          {errors.phone && (
            <p className="text-sm text-red-300 mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-blue-100">
            City Name *
          </Label>
          <Input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Your city"
            className="bg-white/5 border-white/20 text-white placeholder-blue-300 focus:ring-yellow-400"
            required
          />
          {errors.city && (
            <p className="text-sm text-red-300 mt-1">{errors.city}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation" className="text-blue-100">
            Occupation *
          </Label>
          <Select
            value={formData.occupation}
            onValueChange={(value) => handleSelectChange("occupation", value)}
          >
            <SelectTrigger className="bg-white/5 border-white/20 text-white placeholder:text-blue-300 focus:ring-yellow-400">
              <SelectValue
                placeholder="Select occupation"
                className="text-blue-300"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SELECT">Select your occupation</SelectItem>
              <SelectItem value="ELECTRICIAN">Electrician</SelectItem>
              <SelectItem value="Technician">Technician</SelectItem>
              <SelectItem value="plumber">Plumber</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Employed">Employed</SelectItem>
              <SelectItem value="Self-Employed">Self-Employed</SelectItem>
              <SelectItem value="Freelancer">Freelancer</SelectItem>
              <SelectItem value="Business Owner">Business Owner</SelectItem>
              <SelectItem value="Homemaker">Homemaker</SelectItem>
              <SelectItem value="Unemployed">Unemployed</SelectItem>
              <SelectItem value="Retired">Retired</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.occupation && (
            <p className="text-sm text-red-300 mt-1">{errors.occupation}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="batchPreference" className="text-blue-100">
          When you want to join *
        </Label>
        <Select
          value={formData.batchPreference}
          onValueChange={(value) =>
            handleSelectChange("batchPreference", value)
          }
        >
          <SelectTrigger className="bg-white/5 border-white/20 text-white placeholder:text-blue-300 focus:ring-yellow-400">
            <SelectValue
              placeholder="Select batch preference"
              className="text-blue-300"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="JUST STARTING BATCH">
              Just Starting Batch
            </SelectItem>
            <SelectItem value="NEXT STARTING BATCH">
              Next Starting Batch
            </SelectItem>
            <SelectItem value="LATER">Later</SelectItem>
          </SelectContent>
        </Select>
        {errors.batchPreference && (
          <p className="text-sm text-red-300 mt-1">{errors.batchPreference}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-blue-100">
          Your Message (Optional)
        </Label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={3}
          placeholder="Your message..."
          className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold py-3 text-lg mt-4 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Enquiry"
        )}
      </Button>

      <p className="text-sm text-center text-blue-200/80 mt-4">
        We respect your privacy. Your information is safe with us.
      </p>
    </form>
  );
};
