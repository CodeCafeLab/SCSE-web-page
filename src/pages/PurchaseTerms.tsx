import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PurchaseTerms() {
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
        <h1 className="text-3xl font-bold mb-8">Terms & Conditions for Purchase Order</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. General</h2>
            <p className="text-slate-700">
              These terms and conditions have been prescribed by Suncity Solar in accordance with the provisions of the Consumer Protection Act, 2019 and rules framed thereunder.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Application</h2>
            <p className="text-slate-700">
              These Consumer Terms and Conditions apply to all consumers who purchase products from Suncity Solar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong>"Consumer"</strong> - Shall have the same meaning as provided under the Consumer Protection Act, 2019.</li>
              <li><strong>"Direct Selling"</strong> - Shall have the same meaning as provided under the Consumer Protection Act, 2019.</li>
              <li><strong>"Direct Selling Entity"</strong> - Shall have the same meaning as provided under the Consumer Protection (Direct Selling) Rules, 2021.</li>
              <li><strong>"Order Confirmation"</strong> - Means a formal confirmation of product ordered by Consumer, sent by Suncity Solar by Email, SMS, App Notification, etc.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Purchase Terms</h2>
            <ul className="list-disc pl-6 space-y-3 text-slate-700">
              <li>
                The consumer declares that they have voluntarily placed an order for purchasing products from M/s SHREE CHANDRAMANGAL SUNCITY MARKETING PRIVATE LIMITED ("Suncity Solar") without any coercion.
              </li>
              <li>
                The consumer confirms having visited <a href="https://www.suncitysolar.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.suncitysolar.in</a> and reviewed all product information.
              </li>
              <li>
                Suncity Solar employs sufficient measures to safeguard consumer data as displayed on our website.
              </li>
              <li>
                Our Refund, Exchange, Cancellation Policy, Product Terms and Conditions, and Grievance Redressal Mechanism are available on our website.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Grievance Redressal</h2>
            <p className="text-slate-700 mb-4">
              Suncity Solar maintains a comprehensive grievance redressal mechanism:
            </p>
            <ul className="list-decimal pl-6 space-y-2 text-slate-700">
              <li>Acknowledgement of complaint within 48 hours of receipt</li>
              <li>Resolution of complaint within 30 days from receipt</li>
              <li>Unresolved complaints may be escalated to the National/State Consumer Helpline</li>
              <li>Further disputes may be referred to the appropriate consumer forum or court</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Warranty & Guarantee</h2>
            <ul className="list-disc pl-6 space-y-3 text-slate-700">
              <li>Warranty and guarantee apply only to the original purchaser from the date of purchase/invoice.</li>
              <li>Warranty is void if the product is mishandled or serviced by unauthorized personnel.</li>
              <li>Warranty does not cover damage from external causes including but not limited to:
                <ul className="list-[circle] pl-6 mt-2 space-y-1">
                  <li>Accident, abuse, or misuse</li>
                  <li>Electrical power issues</li>
                  <li>Unauthorized servicing</li>
                  <li>Improper installation or usage</li>
                  <li>Normal wear and tear</li>
                  <li>Acts of God, natural disasters, or force majeure</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Out-of-Warranty Support</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Support for out-of-warranty products is subject to parts availability.</li>
              <li>All costs for out-of-warranty service are the responsibility of the customer.</li>
              <li>For discontinued products, Suncity Solar may offer upgraded or refurbished replacements at its discretion.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Indemnification</h2>
            <p className="text-slate-700">
              The customer shall indemnify Suncity Solar against any loss, damage, injury, or death caused by negligent acts, omissions, willful misconduct, or breach of these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Dispute Resolution</h2>
            <p className="text-slate-700 mb-4">
              In the event of any dispute, the following resolution process applies:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-700">
              <li>Resolution through Suncity Solar's Grievance Redressal Mechanism</li>
              <li>Mediation through National/State Consumer Helpline</li>
              <li>Arbitration under the Indian Arbitration and Conciliation Act</li>
              <li>Legal proceedings in the appropriate consumer forum in Jaipur, Rajasthan</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Modifications</h2>
            <p className="text-slate-700">
              Suncity Solar reserves the right to modify these Terms and Conditions at any time without prior notice. Continued use of our services constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Governing Law & Jurisdiction</h2>
            <p className="text-slate-700">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Jaipur, Rajasthan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
            <div className="space-y-2 text-slate-700">
              <p>For any questions about these Terms and Conditions, please contact:</p>
              <p>Email: <a href="mailto:info@suncitysolar.in" className="text-blue-600 hover:underline">info@suncitysolar.in</a></p>
              <p>Grievance Officer: <a href="tel:+919772911700" className="text-blue-600 hover:underline">+91 97729 11700</a></p>
              <p>Customer Care (WhatsApp): <a href="https://wa.me/919587211700" className="text-blue-600 hover:underline">+91 95872 11700</a></p>
              <p>Office Address: 3rd Floor, P.No. A-317A, Dr. Rajendra Prasad Nagar, Gopalpura Bypass, Mansarovar, Jaipur, Rajasthan - 302020</p>
            </div>
          </section>

          <div className="pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Last updated: November 6, 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
