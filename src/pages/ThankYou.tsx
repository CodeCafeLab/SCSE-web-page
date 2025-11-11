import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-12 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white bg-opacity-20">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-green-100">
            Your enrollment is now complete.
          </p>
        </div>

        <div className="p-6 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700 font-medium mb-2">Order Confirmed</p>
            <p className="text-sm text-green-600">
              Transaction ID: {new Date().getTime()}
            </p>
          </div>

          <p className="text-gray-600 mb-2">
            Thank you for your payment! Your enrollment has been confirmed.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            We've sent a confirmation email with course details to your
            registered email address.
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => navigate("/")}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
