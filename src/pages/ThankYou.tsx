import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

type FormData = {
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
  present_occupation: string;
  course: string;
  amount: string;
  currency: string;
};

export const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const submitEnrollment = async () => {
      try {
        const formData = Object.fromEntries(searchParams.entries()) as unknown as FormData;
        
        // Check if we have a payment_id to confirm payment was successful
        const paymentId = searchParams.get('payment_id');
        if (!paymentId) {
          throw new Error('Payment verification failed: No payment ID found');
        }

        // Prepare the API payload
        const apiPayload = {
          first_name: formData.first_name.trim(),
          email: formData.email.trim(),
          gender: formData.gender,
          birth_date: formData.birth_date,
          mobile_no: formData.mobile_no.replace(/\D/g, ''),
          advisor_id: "advisor1",
          course: formData.course || "Solar Panel Technology: From Basics to Installation",
          amount: formData.amount || 11700,
          currency: formData.currency || 'INR',
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state,
          pincode: formData.pincode,
          qualification: formData.qualification,
          present_occupation: formData.present_occupation,
          address_type: "Billing",
          payment_id: paymentId,
          payment_status: 'completed'
        };

        // Submit to the enrollment API
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
          throw new Error(errorData.message || 'Failed to process enrollment');
        }

        // Store the form data for display
        setFormData(formData);
        setSubmissionError(null);
      } catch (error) {
        console.error('Enrollment error:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setSubmissionError(errorMessage);
        
        toast({
          title: "Enrollment Error",
          description: `We received your payment but encountered an issue with your enrollment: ${errorMessage}`,
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    submitEnrollment();
  }, [searchParams, toast]);

  // If still submitting, show loading state
  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900">Processing Your Enrollment</h2>
          <p className="mt-2 text-gray-600">Please wait while we confirm your payment and complete your enrollment...</p>
        </div>
      </div>
    );
  }

  // If there was an error, show error state
  if (submissionError || !formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-gray-900">Enrollment Incomplete</h2>
          <p className="mt-2 text-gray-600">
            {submissionError || 'We encountered an issue processing your enrollment.'}
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Your payment was successful, but we couldn't complete your enrollment. 
            Our team has been notified and will contact you shortly.
          </p>
          <div className="mt-6">
            <Button onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Format amount for display
  const formatAmount = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return isNaN(num) ? '₹0' : num.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-lg text-gray-600">
            Thank you for              {formData.course || 'the course'}
          </p>
          <p className="text-gray-500 mt-2">
            A confirmation has been sent to {formData.email}
          </p>
        </div>

        {/* Order Summary */}
        <div className="px-6 py-8 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">{formData.course || 'Course Enrollment'}</h3>
              <span className="font-medium text-gray-900">{formatAmount(formData.amount)}</span>
            </div>
            <div className="text-sm text-gray-500">
              <p>Payment ID: {searchParams.get('payment_id') || searchParams.get('cf_payment_id') || 'N/A'}</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">STUDENT DETAILS</h3>
              <div className="space-y-1 text-sm">
                <p className="text-gray-900">{formData.first_name}</p>
                <p className="text-gray-600">{formData.email}</p>
                <p className="text-gray-600">+91 {formData.mobile_no}</p>
                {formData.qualification && (
                  <p className="text-gray-600">Qualification: {formData.qualification}</p>
                )}
                {formData.present_occupation && (
                  <p className="text-gray-600">Occupation: {formData.present_occupation}</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">BILLING ADDRESS</h3>
              <div className="space-y-1 text-sm">
                <p className="text-gray-900">{formData.first_name}</p>
                <p className="text-gray-600">{formData.address}</p>
                <p className="text-gray-600">
                  {formData.city}, {formData.state} {formData.pincode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="px-6 py-6 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="ml-3 text-sm text-gray-700">
                You will receive a confirmation email with course access details within 24 hours.
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="ml-3 text-sm text-gray-700">
                Check your spam folder if you don't see our email in your inbox.
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-green-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="ml-3 text-sm text-gray-700">
                For any questions, please contact our support team at support@suncitysolar.in
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Print Receipt
            </Button>
            <Button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto"
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
