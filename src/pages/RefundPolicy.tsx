import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
      
      <div className="prose prose-slate max-w-none">
        <h1 className="text-3xl font-bold mb-8">Refund & Cancellation Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Refund Eligibility</h2>
            <p className="text-slate-700 mb-4">
              At Shree Chandramangal Suncity Marketing Private Limited (Suncity Solar), we strive to ensure complete satisfaction with our 21 Days Online Solar Business Training & Certification Course. Our refund policy is designed to be fair and transparent.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Full refunds are available if requested within 7 days of payment, provided no course materials have been accessed.</li>
              <li>No refunds will be issued after accessing any course materials or after 7 days from the date of payment.</li>
              <li>To be eligible for a refund, you must notify us of your intention to cancel within 24 hours of enrollment.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How to Request a Refund</h2>
            <p className="text-slate-700 mb-4">
              To request a refund, please contact our support team with the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Full name and contact information</li>
              <li>Order/Transaction ID</li>
              <li>Reason for refund request</li>
              <li>Bank account details for refund processing (if payment was made via bank transfer)</li>
            </ul>
            <p className="text-slate-700 mt-4">
              Refund requests can be sent to: <a href="mailto:dos@suncitysolar.in" className="text-blue-600 hover:underline">dos@suncitysolar.in</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Processing Time</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Refund requests are typically processed within 7-10 business days after approval.</li>
              <li>The time it takes for the refund to reflect in your account may vary depending on your bank or payment method.</li>
              <li>You will receive a confirmation email once your refund has been processed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Non-Refundable Items</h2>
            <p className="text-slate-700 mb-2">The following are not eligible for refunds:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Course materials that have been accessed or downloaded</li>
              <li>Digital certificates that have been issued</li>
              <li>Any third-party service fees or processing charges</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Course Cancellation by Suncity Solar</h2>
            <p className="text-slate-700">
              In the unlikely event that Suncity Solar needs to cancel the course, registered participants will be notified immediately and offered the option to transfer their enrollment to the next available session or receive a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Special Circumstances</h2>
            <p className="text-slate-700 mb-4">
              We understand that exceptional circumstances may arise. If you believe your situation warrants special consideration, please contact our support team with detailed information about your circumstances.
            </p>
            <p className="text-slate-700">
              All special consideration requests will be reviewed on a case-by-case basis at the discretion of Suncity Solar management.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
            <div className="space-y-2 text-slate-700">
              <p>For any questions about our refund policy, please contact:</p>
              <p>Email: <a href="mailto:dos@suncitysolar.in" className="text-blue-600 hover:underline">dos@suncitysolar.in</a></p>
              <p>Phone: <a href="tel:+911413611709" className="text-blue-600 hover:underline">+91 14136 11709</a></p>
              <p>Customer Care (WhatsApp): <a href="https://wa.me/919587211700" className="text-blue-600 hover:underline">+91 95872 11700</a></p>
              <p>Address: 3rd Floor, P.No. A-317A, Dr. Rajendra Prasad Nagar, Gopalpura Bypass, Mansarovar, Jaipur, Rajasthan</p>
            </div>
          </section>

          <div className="pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Last updated: November 6, 2024
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Note: This refund policy is specifically for the 21 Days Online Solar Business Training & Certification Course. For product-related refunds, please refer to our general refund policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
