import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const EnrollmentForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    qualification: "",
    city: "",
    state: "",
    country: "India",
    address: "",
    workingInSolar: "",
    referralCode: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.fullName || !formData.email || !formData.mobile || !formData.dob || 
        !formData.gender || !formData.qualification || !formData.city || !formData.state || 
        !formData.address || !formData.workingInSolar) {
      toast({
        title: "Required fields missing",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Call the create-payment edge function
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          enrollmentData: {
            fullName: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            dob: formData.dob,
            gender: formData.gender,
            qualification: formData.qualification,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            address: formData.address,
            workingInSolar: formData.workingInSolar === 'yes',
            referralCode: formData.referralCode,
          },
        },
      });

      if (error) {
        console.error('Payment creation error:', error);
        throw error;
      }

      console.log('Payment response:', data);

      // Load Cashfree SDK and initiate payment
      const cashfree = (window as any).Cashfree({
        mode: "sandbox" // Change to "production" for live
      });

      const checkoutOptions = {
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      };

      cashfree.checkout(checkoutOptions).then((result: any) => {
        if (result.error) {
          console.error('Payment error:', result.error);
          toast({
            title: "Payment failed",
            description: result.error.message || "Payment could not be processed",
            variant: "destructive",
          });
        } else if (result.paymentDetails) {
          // Payment successful - verify it
          verifyPayment(data.orderId, data.enrollmentId);
        }
      });

    } catch (error: any) {
      console.error('Enrollment error:', error);
      toast({
        title: "Enrollment failed",
        description: error.message || "An error occurred during enrollment",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const verifyPayment = async (orderId: string, enrollmentIdValue: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { orderId },
      });

      if (error) throw error;

      if (data.success) {
        setPaymentSuccess(true);
        setEnrollmentId(enrollmentIdValue);
        toast({
          title: "Payment Successful! 🎉",
          description: `Your enrollment ID is: ${enrollmentIdValue}`,
        });
      } else {
        toast({
          title: "Payment verification failed",
          description: "Please contact support",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Verification error:', error);
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-12 space-y-6">
        <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
        <h2 className="text-3xl font-bold text-primary">Payment Successful!</h2>
        <div className="bg-accent/10 border-2 border-accent rounded-xl p-6 max-w-md mx-auto">
          <p className="text-lg mb-2">Your Enrollment ID:</p>
          <p className="text-3xl font-bold text-accent">{enrollmentId}</p>
        </div>
        <p className="text-muted-foreground">
          A confirmation email and SMS has been sent to your registered contact details.
        </p>
        <p className="text-sm text-muted-foreground">
          Please save your Enrollment ID for future reference.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Enter your full name"
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your.email@example.com"
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number *</Label>
          <Input
            id="mobile"
            type="tel"
            required
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            placeholder="+91 XXXXX XXXXX"
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth *</Label>
          <Input
            id="dob"
            type="date"
            required
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Gender *</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => setFormData({ ...formData, gender: value })}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="font-normal">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="font-normal">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="font-normal">Other</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="qualification">Education Qualification *</Label>
          <Select
            value={formData.qualification}
            onValueChange={(value) => setFormData({ ...formData, qualification: value })}
          >
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Select qualification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10th">10th Pass</SelectItem>
              <SelectItem value="12th">12th Pass</SelectItem>
              <SelectItem value="diploma">Diploma</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
              <SelectItem value="postgraduate">Post Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Your city"
            className="rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            required
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            placeholder="Your state"
            className="rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Textarea
          id="address"
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter your complete address"
          className="rounded-xl min-h-24"
        />
      </div>

      <div className="space-y-2">
        <Label>Are you already working in Solar industry? *</Label>
        <RadioGroup
          value={formData.workingInSolar}
          onValueChange={(value) => setFormData({ ...formData, workingInSolar: value })}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="idProof">Upload ID Proof (Aadhar/PAN/Driving License) *</Label>
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent transition-colors cursor-pointer">
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
          <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
          <input type="file" id="idProof" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="referralCode">Referral Code (Optional)</Label>
        <Input
          id="referralCode"
          value={formData.referralCode}
          onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
          placeholder="Enter referral code if any"
          className="rounded-xl"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-accent to-[hsl(35,100%,55%)] hover:shadow-[var(--shadow-glow)] transition-all duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          "Proceed to Payment - ₹11,700"
        )}
      </Button>
    </form>
  );
};
