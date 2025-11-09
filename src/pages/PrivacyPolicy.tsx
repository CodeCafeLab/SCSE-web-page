import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  Shield,
  Mail,
  ShieldCheck,
  AlertTriangle,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const SectionHeader = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <div className="flex items-center mb-4">
    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
      <Icon className="h-5 w-5" />
    </div>
    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
  </div>
);

export default function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="group">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className=" from-blue-50 to-indigo-50 px-6 py-8 border-b border-gray-100">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100 mr-4">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Privacy Policy
              </h1>
              <p className="text-gray-600 mt-2">
                Last updated: November 10, 2024
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              This Privacy Policy ("Policy") is a legally binding document between you (the "User") and M/s Shree Chandramangal Suncity Marketing Private Limited (hereinafter referred to as "Discovery of Success (DOS) - A Business School of Suncity Solar," "we," "us," or "our").
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              This Policy governs your use of our website <a href="https://dos.suncitysolar.in" className="text-blue-600 hover:underline">dos.suncitysolar.in</a>, our Learning Management System (LMS), and all associated digital platforms (collectively referred to as the "Platform").
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              This Policy is published in accordance with the provisions of the Information Technology Act, 2000, the Digital Personal Data Protection Act, 2023 (DPDP Act), and relevant rules made thereunder. It outlines our practices for the collection, use, storage, sharing, and protection of your personal information.
            </p>

            <div className="border-l-4 border-blue-200 pl-4 py-2 bg-blue-50 mb-10">
              <p className="text-gray-700 leading-relaxed">
                <strong>By accessing or using our Platform, you indicate that you understand, agree, and consent to this Policy. If you do not agree with its terms, please refrain from using our Platform.</strong>
              </p>
            </div>

            <SectionHeader icon={Shield} title="1. Information We Collect" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information to provide, improve, and personalize our services and learning experience.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">A. Information You Provide to Us:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Account Information:</strong> When you register for an account, we collect your name, email address, and contact number.</li>
                <li><strong>Profile Information:</strong> Includes photo, biography, professional details, and any information you voluntarily provide.</li>
                <li><strong>Course Data:</strong> Enrolment details, submitted assignments, quiz results, participation records, and certificates.</li>
                <li><strong>Payment Information:</strong> Processed securely by third-party payment gateways. We do not store credit/debit card details on our servers.</li>
                <li><strong>Communication Data:</strong> Correspondence with our support or grievance team via email, calls, or messages.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">B. Information We Collect Automatically:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Technical Data:</strong> IP address, browser type, device ID, operating system, and domain information.</li>
                <li><strong>Usage Data:</strong> Interaction with courses, time spent on modules, learning progress, and performance analytics.</li>
                <li><strong>Cookies & Tracking Technologies:</strong> Used to improve functionality and personalize your experience.</li>
              </ul>
            </div>

            <SectionHeader icon={ShieldCheck} title="2. Cookies & Tracking Consent" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                By continuing to use our Platform, you acknowledge and consent to our use of cookies and similar technologies for performance enhancement, analytics, and personalized content. You can manage or disable cookies via browser settings; however, certain features may not function properly if cookies are disabled.
              </p>
            </div>

            <SectionHeader icon={Shield} title="3. How We Use Your Information" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                We use collected information for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Account Management:</strong> To create and manage user accounts.</li>
                <li><strong>Course Access & Delivery:</strong> To facilitate enrolment, certification, and performance tracking.</li>
                <li><strong>Transaction Processing:</strong> To verify and process secure payments.</li>
                <li><strong>Personalization:</strong> To customize your learning experience and recommend relevant courses.</li>
                <li><strong>Communication:</strong> To send important updates, administrative notices, and support responses.</li>
                <li><strong>Improvement:</strong> To enhance content, functionality, and service quality.</li>
                <li><strong>Security:</strong> To protect users and systems from unauthorized access, misuse, or fraud.</li>
              </ul>
            </div>

            <SectionHeader icon={Mail} title="4. Consent for Marketing, Communication & Notifications" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                By sharing your contact details, you expressly consent to receive transactional, promotional, and informational communications via email, SMS, WhatsApp, or phone calls from Discovery of Success (DOS) - A Business School of Suncity Solar or its authorized representatives. You may opt out of promotional messages anytime; however, service-related messages will continue as long as your account remains active.
              </p>
            </div>

            <SectionHeader icon={ArrowRight} title="5. Data Processing and Transfer" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                Your personal data may be processed and stored on secure servers within India or abroad (where legally permitted).
                By using our Platform, you consent to such cross-border data transfer, subject to equivalent data protection safeguards as per applicable law.
              </p>
            </div>

            <SectionHeader icon={AlertTriangle} title="6. Children's Data Protection (Age Restriction)" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                Our Platform is intended for individuals 18 years and above. We do not knowingly collect data from minors. If such information is inadvertently obtained, we will delete it promptly upon becoming aware.
              </p>
            </div>

            <SectionHeader icon={Shield} title="7. How We Share Your Information" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, rent, or lease your personal data. Information may be shared only in the following cases:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>With Consent:</strong> When you provide explicit permission.</li>
                <li><strong>With Service Providers:</strong> Such as hosting partners, analytics providers, or payment gateways — all bound by confidentiality and data protection agreements.</li>
                <li><strong>For Legal Obligations:</strong> To comply with lawful requests or governmental directives.</li>
                <li><strong>For Business Continuity:</strong> In the event of mergers or restructuring, subject to confidentiality assurance.</li>
              </ul>
            </div>

            <SectionHeader icon={Lock} title="8. Data Storage, Security & Encryption" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                We implement administrative, technical, and physical safeguards to protect your data from unauthorized access, misuse, or loss.
                Sensitive data such as passwords and financial details are encrypted using industry-standard AES/SSL encryption protocols and stored on restricted-access servers.
                While we employ best practices, no system can guarantee absolute security; hence users share data at their own discretion.
              </p>
            </div>

            <SectionHeader icon={AlertTriangle} title="9. Data Breach Notification" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                In the rare event of a data breach compromising personal information, Discovery of Success (DOS) - A Business School of Suncity Solar shall notify affected users and relevant authorities within a reasonable time, outlining the nature of the breach and corrective actions taken.
              </p>
            </div>

            <SectionHeader icon={ShieldCheck} title="10. Accountability & Third-Party Compliance" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                All third-party vendors (including payment processors, hosting partners, or analytics tools) are required to comply with strict confidentiality and data protection obligations equivalent to this Policy.
                We regularly evaluate their compliance to ensure secure data handling.
              </p>
            </div>

            <SectionHeader icon={FileText} title="11. Retention and Deletion of Data" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                We retain user data as long as necessary to provide services, comply with legal obligations, or resolve disputes. Upon account deactivation or consent withdrawal, all personal data shall be deleted or anonymised within 90 days, unless retention is legally required (e.g., taxation or audit purposes).
              </p>
            </div>

            <SectionHeader icon={Shield} title="12. User Rights" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access and review your stored data.</li>
                <li>Request correction of inaccurate or outdated information.</li>
                <li>Withdraw consent and request deletion of your personal data.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Such requests must be made in writing to <a href="mailto:dos@suncitysolar.in" className="text-blue-600 hover:underline">dos@suncitysolar.in</a>, and will be processed within a reasonable timeframe upon verification of your identity.
              </p>
            </div>

            <SectionHeader icon={AlertTriangle} title="13. Limitation of Liability" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                Discovery of Success (DOS) - A Business School of Suncity Solar shall not be liable for any unauthorized access, hacking incidents, or misuse of user information that occur beyond its reasonable control or arise from third-party applications, plugins, or integrations.
              </p>
            </div>

            <SectionHeader icon={Shield} title="14. Third-Party Links" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                Our Platform may contain links to third-party websites or services.
                We are not responsible for their privacy practices, content, or security.
                Users are encouraged to review the privacy policies of such websites before sharing any personal information.
              </p>
            </div>

            <SectionHeader icon={FileText} title="15. Governing Law and Jurisdiction" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy shall be governed by and construed in accordance with the laws of India, and the courts at Jaipur, Rajasthan shall have exclusive jurisdiction over all disputes arising hereunder.
              </p>
            </div>

            <SectionHeader icon={ShieldCheck} title="16. Policy Updates & Revisions" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                Discovery of Success (DOS) - A Business School of Suncity Solar reserves the right to amend, modify, or update this Policy at any time.
                Changes will be reflected by an updated "Last Updated" date at the top of this page.
                Your continued use of the Platform after such updates constitutes acceptance of the revised Policy.
              </p>
            </div>

            <SectionHeader icon={Mail} title="17. Grievance Officer" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                In compliance with the Information Technology Act, 2000 and related rules, users may contact our Grievance Officer for concerns, complaints, or data protection queries:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800">Mr. Mahipal Singh</p>
                <p className="text-gray-700">
                  <a href="mailto:dos@suncitysolar.in" className="text-blue-600 hover:underline">dos@suncitysolar.in</a>
                </p>
                <p className="text-gray-700">
                  <a href="tel:+917014759495" className="text-blue-600 hover:underline">+91-7014759495</a>
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                We endeavour to resolve all concerns within 72 hours of receipt.
              </p>
            </div>

            <SectionHeader icon={Shield} title="18. Final Statement" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy represents our unwavering commitment to transparency, user trust, and responsible data handling. We encourage all users to review this Policy periodically for the latest updates and ensure continued understanding of their rights and responsibilities.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                <strong>Official Website:</strong> <a href="https://dos.suncitysolar.in" className="text-blue-600 hover:underline">dos.suncitysolar.in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
