import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

type FormData = {
  first_name?: string;
  email?: string;
  gender?: string;
  birth_date?: string;
  mobile_no?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  qualification?: string;
  present_occupation?: string;
  course?: string;
  amount?: string;
  currency?: string;
};

export const ThankYou = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const processEnrollment = async () => {
      try {
        console.log("Processing enrollment...");

        // Get form data from localStorage
        const storedFormData = localStorage.getItem("enrollmentFormData");
        let formData: FormData;

        if (storedFormData) {
          console.log("Using form data from localStorage");
          formData = JSON.parse(storedFormData);
          // Clean up by removing the stored data after using it
          localStorage.removeItem("enrollmentFormData");
        } else {
          console.log("No form data found, using default values");
          formData = {
            first_name: "Student",
            email: "no-email@example.com",
            course: "Solar business training course fee",
            amount: "11700",
            currency: "INR",
          };
        }

        console.log("Form Data:", formData);
        setFormData(formData);

        // Validate required fields before proceeding
        if (!formData.first_name || !formData.email || !formData.course) {
          const missingFields = [];
          if (!formData.first_name) missingFields.push("first_name");
          if (!formData.email) missingFields.push("email");
          if (!formData.course) missingFields.push("course");

          throw new Error(
            `Missing required fields: ${missingFields.join(", ")}`
          );
        }

        // Create the API payload
        const apiPayload = {
          first_name: formData.first_name || "Not Provided",
          email: formData.email || "not-provided@example.com",
          course: formData.course || "Solar business training course fee",
          gender: formData.gender || "Not Specified",
          birth_date: formData.birth_date || "",
          mobile_no: formData.mobile_no
            ? formData.mobile_no.replace(/\D/g, "")
            : "",
          advisor_id: "advisor1",
          amount: formData.amount ? parseInt(formData.amount) : 11700,
          currency: formData.currency || "INR",
          payment_id: `enrollment_${Date.now()}`,
          payment_status: "success",
          address: formData.address ? formData.address.trim() : "Not Provided",
          city: formData.city ? formData.city.trim() : "Not Specified",
          state: formData.state || "Not Specified",
          pincode: formData.pincode || "000000",
          qualification: formData.qualification || "Not Specified",
          present_occupation: formData.present_occupation || "Not Specified",
          address_type: "Billing",
          country: "India",
          source: "Website",
          enrollment_date: new Date().toISOString().split("T")[0],
        };

        console.log(
          "Sending payload to API:",
          JSON.stringify(apiPayload, null, 2)
        );

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

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to process enrollment");
        }

        console.log("Enrollment successful");
      } catch (error) {
        console.error("Error processing enrollment:", error);
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        setApiError(errorMessage);

        toast({
          title: "Error",
          description: `Failed to process enrollment: ${errorMessage}`,
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    processEnrollment();
  }, []);

  // If still submitting, show loading state
  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900">
            Processing Your Enrollment
          </h2>
          <p className="mt-2 text-gray-600">
            Please wait while we process your enrollment...
          </p>
        </div>
      </div>
    );
  }

  // If there was an API error, show error state
  if (apiError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-gray-900">
            Enrollment Incomplete
          </h2>
          <p className="mt-2 text-gray-600">{apiError}</p>
          <p className="mt-4 text-sm text-gray-500">
            We're having trouble processing your enrollment. Please contact
            support with your details.
          </p>
          <div className="mt-6">
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  // Format amount for display
  const formatAmount = (amount: string | number | undefined) => {
    if (amount === undefined || amount === "") return "₹0";
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return isNaN(num)
      ? "₹0"
      : num.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-green-50 px-6 py-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thank You for Your Enrollment!
          </h1>

          <p className="text-lg text-gray-600">
            {formData?.course
              ? `Thank you for enrolling in ${formData.course}`
              : "Thank you for your enrollment"}
          </p>
          {formData?.email && (
            <p className="text-gray-500 mt-2">
              A confirmation has been sent to {formData.email}
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="px-6 py-8 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Enrollment Summary
          </h2>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">
                {formData?.course || "Course Enrollment"}
              </h3>
              <span className="font-medium text-gray-900">
                {formatAmount(formData?.amount)}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              <p>Status: Enrolled</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {formData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  STUDENT DETAILS
                </h3>
                <div className="space-y-1 text-sm">
                  {formData.first_name && (
                    <p className="text-gray-900">{formData.first_name}</p>
                  )}
                  {formData.email && (
                    <p className="text-gray-600">{formData.email}</p>
                  )}
                  {formData.mobile_no && (
                    <p className="text-gray-600">+91 {formData.mobile_no}</p>
                  )}
                  {formData.qualification && (
                    <p className="text-gray-600">
                      Qualification: {formData.qualification}
                    </p>
                  )}
                  {formData.present_occupation && (
                    <p className="text-gray-600">
                      Occupation: {formData.present_occupation}
                    </p>
                  )}
                </div>
              </div>

              {(formData.address ||
                formData.city ||
                formData.state ||
                formData.pincode) && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    CONTACT INFORMATION
                  </h3>
                  <div className="space-y-1 text-sm">
                    {formData.first_name && (
                      <p className="text-gray-900">{formData.first_name}</p>
                    )}
                    {formData.address && (
                      <p className="text-gray-600">{formData.address}</p>
                    )}
                    {(formData.city || formData.state || formData.pincode) && (
                      <p className="text-gray-600">
                        {[formData.city, formData.state, formData.pincode]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 text-center">
          <Button onClick={() => navigate("/")} className="w-full sm:w-auto">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
