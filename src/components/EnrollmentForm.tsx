import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/WhatsApp Image 2025-11-05 at 14.24.02_49170dee.jpg";

interface FormData {
  // API Required Fields
  first_name: string;
  email: string;
  gender: string;
  birth_date: string;
  mobile_no: string;
  advisor_id: string;
  course: string;
  amount: number;
  currency: string;
  address: string;
  city: string;
  address_type: string;
  
  // Optional Fields (not sent to API)
  fathersName: string;
  qualification: string;
  state: string;
  pincode: string;
  presentOccupation: string;
  hasSolarExperience: string;
  reasonForJoining: string;
  heardAboutProgram: string;
  declaration: boolean;
  referralCode?: string;
}

export const EnrollmentForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    // API Required Fields
    first_name: "",
    email: "",
    gender: "",
    birth_date: "",
    mobile_no: "",
    advisor_id: "advisor1",
    course: "Solar Panel Technology: From Basics to Installation",
    amount: 11700,
    currency: "INR",
    address: "",
    city: "",
    address_type: "Billing",
    
    // Optional Fields
    fathersName: "",
    qualification: "",
    state: "",
    pincode: "",
    presentOccupation: "",
    hasSolarExperience: "",
    reasonForJoining: "",
    heardAboutProgram: "",
    declaration: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const initiatePayment = async (orderId: string, amount: number) => {
    try {
      // Create payment session (using Vite proxy or direct API URL)
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      
      console.log('Creating payment session...', { orderId, amount, apiUrl });
      
      const response = await fetch(`${apiUrl}/payment/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount,
          customerName: formData.first_name,
          customerEmail: formData.email,
          customerPhone: formData.mobile_no.replace(/\D/g, ''),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `Failed to create payment session (${response.status})`;
        console.error('Payment session creation failed:', errorData);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Payment session created:', data);

      if (!data.paymentSessionId) {
        throw new Error('Payment session ID not received from server');
      }

      // Ensure Cashfree SDK is loaded
      const loadCashfreeSDK = (): Promise<void> => {
        return new Promise((resolve, reject) => {
          // Check if already loaded
          if (window.Cashfree) {
            resolve();
            return;
          }

          // Check if script is already being loaded
          const existingScript = document.querySelector('script[src="https://sdk.cashfree.com/js/v3/cashfree.js"]');
          if (existingScript) {
            // Wait for existing script to load
            existingScript.addEventListener('load', () => resolve());
            existingScript.addEventListener('error', () => reject(new Error('Failed to load Cashfree SDK')));
            return;
          }

          // Load the SDK
          const script = document.createElement('script');
          script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
          script.async = true;
          script.onload = () => {
            if (window.Cashfree) {
              resolve();
            } else {
              reject(new Error('Cashfree SDK loaded but not available'));
            }
          };
          script.onerror = () => {
            reject(new Error('Failed to load Cashfree SDK'));
          };
          document.body.appendChild(script);
        });
      };

      // Load SDK and initialize payment
      await loadCashfreeSDK();

      // Wait a bit for SDK to be fully ready
      await new Promise(resolve => setTimeout(resolve, 100));

      if (!window.Cashfree) {
        throw new Error('Cashfree SDK is not available');
      }

      console.log('Initializing Cashfree payment...');
      
      // Initialize Cashfree payment
      const cashfree = new window.Cashfree();
      cashfree.drop({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self", // Redirect in same window
        theme: {
          backgroundColor: "#ffffff",
          buttonColor: "#2563eb",
          buttonTextColor: "#ffffff",
          buttonRadius: "6px",
        },
      });

      console.log('Cashfree payment initialized successfully');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment initialization failed';
      console.error('Payment error:', err);
      throw new Error(errorMessage);
    }
  };

  const formatDateForAPI = (dateString: string): string => {
    // Convert YYYY-MM-DD to DD-MM-YYYY
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const validateForm = (): string | null => {
    const requiredFields = [
      { field: 'first_name', name: 'Full Name' },
      { field: 'email', name: 'Email' },
      { field: 'gender', name: 'Gender' },
      { field: 'birth_date', name: 'Date of Birth' },
      { field: 'mobile_no', name: 'Mobile Number' },
      { field: 'address', name: 'Address' },
      { field: 'city', name: 'City' },
    ];

    for (const { field, name } of requiredFields) {
      const value = formData[field as keyof FormData];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return `${name} is required`;
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
    }

    // Validate mobile number (Indian format: 10 digits starting with 6-9)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile_no.replace(/\D/g, ''))) {
      return 'Please enter a valid 10-digit Indian mobile number.';
    }

    // Validate date of birth (should be in the past)
    const today = new Date();
    const birthDate = new Date(formData.birth_date);
    if (birthDate >= today) {
      return 'Date of birth must be in the past.';
    }

    // Validate declaration
    if (!formData.declaration) {
      return 'You must agree to the declaration.';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate all required fields
      const validationError = validateForm();
      if (validationError) {
        throw new Error(validationError);
      }

      // Prepare API payload with required fields only
      const apiPayload = {
        first_name: formData.first_name.trim(),
        email: formData.email.trim(),
        gender: formData.gender,
        birth_date: formatDateForAPI(formData.birth_date),
        mobile_no: formData.mobile_no.replace(/\D/g, ''), // Remove any non-digit characters
        advisor_id: formData.advisor_id,
        course: formData.course,
        amount: formData.amount,
        currency: formData.currency,
        address: formData.address.trim(),
        city: formData.city.trim(),
        address_type: formData.address_type,
      };

      console.log('Sending payload:', apiPayload); // For debugging

      // Make API call with JSON payload
      const response = await fetch('https://erp.suncitysolar.in/api/method/lms_enrollment_api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Safely extract error message - handle both string and object
        let errorMessage = 'API request failed';
        if (responseData.message) {
          errorMessage = typeof responseData.message === 'string' 
            ? responseData.message 
            : JSON.stringify(responseData.message);
        } else if (responseData.exception) {
          errorMessage = typeof responseData.exception === 'string'
            ? responseData.exception
            : JSON.stringify(responseData.exception);
        } else {
          errorMessage = `API request failed with status ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      // Safely extract success message
      const successMessage = responseData.message 
        ? (typeof responseData.message === 'string' 
            ? responseData.message 
            : "Your enrollment has been submitted successfully.")
        : "Your enrollment has been submitted successfully.";

      // Show success message
      toast({
        title: "Enrollment Successful!",
        description: "Redirecting to payment...",
        variant: "default",
      });

      // Generate unique order ID
      const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const paymentAmount = 11700; // ₹11,700

      // Initiate payment flow
      setIsLoading(false); // Reset loading state
      setIsProcessingPayment(true);
      
      try {
        await initiatePayment(orderId, paymentAmount);
      } catch (paymentError) {
        console.error('Payment initiation error:', paymentError);
        const paymentErrorMessage = paymentError instanceof Error 
          ? paymentError.message 
          : 'Payment initialization failed';
        
        toast({
          title: "Payment Error",
          description: paymentErrorMessage,
          variant: "destructive",
        });
        setIsProcessingPayment(false);
        // Don't reset form on payment error - let user try again
      }
      
    } catch (err) {
      console.error('Form submission error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      // Ensure errorMessage is always a string
      const safeErrorMessage = typeof errorMessage === 'string' ? errorMessage : String(errorMessage);
      setError(safeErrorMessage);
      toast({
        title: "Error",
        description: safeErrorMessage,
        variant: "destructive",
      });
      setIsProcessingPayment(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12 space-y-6">
        <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
        <h2 className="text-3xl font-bold text-primary">Enrollment Submitted!</h2>
        <p className="text-lg text-muted-foreground">
          {success}
        </p>
        <Button onClick={() => window.location.reload()}>Submit Another Enrollment</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center mb-8">
        <img 
          src={logo} 
          alt="Sun City Solar Logo" 
          className="h-24 w-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-primary">DISCOVERY OF SUCCESS (DOS)</h1>
        <h2 className="text-xl font-semibold text-gray-700">Application Form – 21 Days Online Solar Business Training</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">Full Name <span className="text-red-500">*</span></Label>
              <Input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email ID <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birth_date">Date of Birth <span className="text-red-500">*</span></Label>
              <Input
                id="birth_date"
                name="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={handleInputChange}
                required
                max={new Date().toISOString().split('T')[0]} // Prevent future dates
              />
            </div>
            <div className="space-y-2">
              <Label>Gender <span className="text-red-500">*</span></Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleSelectChange('gender', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile_no">Mobile Number <span className="text-red-500">*</span></Label>
              <Input
                id="mobile_no"
                name="mobile_no"
                type="tel"
                value={formData.mobile_no}
                onChange={handleInputChange}
                placeholder="98XXXXXXXX"
                pattern="[6-9]\d{9}"
                title="Please enter a valid 10-digit Indian mobile number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your complete address"
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter your state"
              />
            </div>
          </div>

          {/* Optional Fields (Not required for API) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fathersName">Father's / Mother's Name</Label>
              <Input
                id="fathersName"
                name="fathersName"
                value={formData.fathersName}
                onChange={handleInputChange}
                placeholder="Parent's Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                name="pincode"
                type="text"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                maxLength={6}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="qualification">Educational Qualification</Label>
              <Input
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                placeholder="e.g., 10th, 12th, Graduation, etc."
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

          <div className="space-y-2">
            <Label>Prior Experience in Solar Business?</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="solarExpYes"
                  name="hasSolarExperience"
                  value="yes"
                  checked={formData.hasSolarExperience === 'yes'}
                  onChange={(e) => handleSelectChange('hasSolarExperience', e.target.value)}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <Label htmlFor="solarExpYes" className="font-normal">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="solarExpNo"
                  name="hasSolarExperience"
                  value="no"
                  checked={formData.hasSolarExperience === 'no'}
                  onChange={(e) => handleSelectChange('hasSolarExperience', e.target.value)}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <Label htmlFor="solarExpNo" className="font-normal">No</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reasonForJoining">Reason for Joining the Course</Label>
            <Textarea
              id="reasonForJoining"
              name="reasonForJoining"
              value={formData.reasonForJoining}
              onChange={handleInputChange}
              placeholder="Please share your motivation for joining this course"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heardAboutProgram">How did you hear about the program?</Label>
            <Select
              value={formData.heardAboutProgram}
              onValueChange={(value) => handleSelectChange('heardAboutProgram', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="social_media">Social Media (Facebook, Instagram, etc.)</SelectItem>
                <SelectItem value="friend">Friend/Family</SelectItem>
                <SelectItem value="newspaper">Newspaper/Advertisement</SelectItem>
                <SelectItem value="search_engine">Search Engine (Google, etc.)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="referralCode">Referred By (Advisor Code, if any)</Label>
            <Input
              id="referralCode"
              name="referralCode"
              value={formData.referralCode || ''}
              onChange={handleInputChange}
              placeholder="Enter referral code if any"
            />
          </div>

          <div className="space-y-4 pt-4 border-t mt-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-4">
                I hereby declare that all information provided above is true and correct to the best of my knowledge. I agree to abide by the rules and regulations of Discovery of Success.
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="declaration"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={(e) => setFormData(prev => ({ ...prev, declaration: e.target.checked }))}
                  className="h-4 w-4 text-primary focus:ring-primary rounded"
                  required
                />
                <Label htmlFor="declaration" className="font-normal text-sm">
                  I agree to the above declaration <span className="text-red-500">*</span>
                </Label>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="pt-4">
          <Button type="submit" className="w-full" disabled={isLoading || isProcessingPayment}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : isProcessingPayment ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};