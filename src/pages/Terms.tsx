import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Shield, Clock, BookOpen, Award, Lock, ShieldCheck, AlertTriangle, Edit, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="flex items-center mb-4">
    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
      <Icon className="h-5 w-5" />
    </div>
    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
  </div>
);

const ContactItem = ({ icon: Icon, text, href, isLink = false }: { icon: React.ElementType; text: string; href?: string; isLink?: boolean }) => (
  <div className="flex items-start">
    <Icon className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
    {isLink && href ? (
      <a href={href} className="text-blue-600 hover:underline">{text}</a>
    ) : (
      <span className="text-gray-700">{text}</span>
    )}
  </div>
);

export default function Terms() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="group">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </Button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-8 border-b border-gray-100">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100 mr-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Terms & Conditions</h1>
              <p className="text-gray-600 mt-2">Last updated: November 6, 2024</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="prose prose-blue max-w-none">
            <SectionHeader icon={FileText} title="1. Program Overview" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                The "21 Days Online Solar Business Training & Certification Course" (hereafter referred to as "the Program") is offered by Shree Chandramangal Suncity Marketing Pvt. Ltd. (Suncity Solar), an ISO 21001:2018 & ISO 29993:2017 Certified Institute.
              </p>
            </div>

            <SectionHeader icon={Shield} title="2. Enrollment and Payment" />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>The course fee is <span className="font-semibold">₹11,700</span> (inclusive of applicable taxes).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Full payment is required to secure your enrollment.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>All payments are processed through secure payment gateways.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Course access will be granted only after payment confirmation.</span>
                </li>
              </ul>
            </div>

            <SectionHeader icon={Clock} title="3. Refund Policy" />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Full refunds will be processed if requested within 7 days of payment, provided no course materials have been accessed.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>No refunds will be issued after accessing any course materials or after 7 days from the date of payment.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Refund requests must be submitted in writing to <a href="mailto:dos@suncitysolar.in" className="text-blue-600 hover:underline font-medium">dos@suncitysolar.in</a>.</span>
                </li>
              </ul>
            </div>

            <SectionHeader icon={BookOpen} title="4. Course Access" />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Course materials will be accessible for <span className="font-medium">6 months</span> from the date of enrollment.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Access requires a stable internet connection and a compatible device.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Sharing of login credentials is strictly prohibited.</span>
                </li>
              </ul>
            </div>

            <SectionHeader icon={Award} title="5. Certification" />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Certification is awarded upon successful completion of all course requirements.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Minimum <span className="font-medium">80% attendance</span> and passing score on assessments are required for certification.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Digital certificates will be issued within 15 days of course completion.</span>
                </li>
              </ul>
            </div>

            <SectionHeader icon={Lock} title="6. Intellectual Property" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                All course materials, including videos, presentations, and documents, are the intellectual property of Suncity Solar. Unauthorized reproduction, distribution, or commercial use is strictly prohibited.
              </p>
            </div>

            <SectionHeader icon={ShieldCheck} title="7. Privacy Policy" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                We are committed to protecting your personal information. Your data will be used solely for course administration and will not be shared with third parties without your consent, except as required by law.
              </p>
            </div>

            <SectionHeader icon={AlertTriangle} title="8. Limitation of Liability" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                Suncity Solar is not responsible for any direct, indirect, incidental, or consequential damages resulting from participation in the Program. While we strive for accuracy, we do not guarantee specific business outcomes or earnings.
              </p>
            </div>

            <SectionHeader icon={Edit} title="9. Modifications" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                Suncity Solar reserves the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of the Program constitutes acceptance of the modified terms.
              </p>
            </div>

            <SectionHeader icon={Mail} title="10. Contact Information" />
            <div className="ml-11 mb-4">
              <div className="space-y-4 bg-gray-50 rounded-xl p-6">
                <ContactItem 
                  icon={Mail} 
                  text="dos@suncitysolar.in" 
                  href="mailto:dos@suncitysolar.in" 
                  isLink 
                />
                <ContactItem 
                  icon={Phone} 
                  text="+91 14136 11709" 
                  href="tel:+911413611709" 
                  isLink 
                />
                <ContactItem 
                  icon={MapPin} 
                  text="3rd Floor, P.No. A-317A, Dr. Rajendra Prasad Nagar, Gopalpura Bypass, Mansarovar, Jaipur, Rajasthan - 302020" 
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Suncity Solar. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
              <span>•</span>
              <Link to="/refund-policy" className="hover:text-blue-600 transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
