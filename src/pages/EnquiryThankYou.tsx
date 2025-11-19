// c:\Users\Antima P\OneDrive\Desktop\SCSE web page\suncity-enroll-flow\src\pages\EnquiryThankYou.tsx
import { CheckCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EnquiryThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-50 px-6 py-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thank You for Your Enquiry!
          </h1>
          <p className="text-lg text-gray-600">
            We’ve received your details and our team will contact you shortly.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Keep your phone available and check your messages for updates.
          </p>
        </div>

        <div className="px-6 py-8">
          <div className="bg-gray-50 rounded-lg p-5 flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-gray-600 mt-0.5" />
            <div className="text-gray-700">
              <p className="font-medium text-gray-900">What happens next?</p>
              <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                <li>Our advisor will reach out to discuss your goals.</li>
                <li>We’ll guide you to the right batch and schedule.</li>
                <li>You can ask questions about the course and enrollment.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate("/")} className="sm:w-auto w-full">
              Return to Home
            </Button>
            <a
              href="tel:+919000000000"
              className="sm:w-auto w-full inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryThankYou;
