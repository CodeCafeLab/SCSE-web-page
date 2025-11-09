import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  Shield,
  Clock,
  BookOpen,
  Award,
  Lock,
  ShieldCheck,
  AlertTriangle,
  Edit,
  Mail,
  Phone,
  MapPin,
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

const ContactItem = ({
  icon: Icon,
  text,
  href,
  isLink = false,
}: {
  icon: React.ElementType;
  text: string;
  href?: string;
  isLink?: boolean;
}) => (
  <div className="flex items-start">
    <Icon className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
    {isLink && href ? (
      <a href={href} className="text-blue-600 hover:underline">
        {text}
      </a>
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
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Terms & Conditions for Course Enrollment
              </h1>
              <p className="text-gray-600 mt-2">
                Last updated: November 9, 2024
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="prose prose-blue max-w-none">
            <SectionHeader icon={FileText} title="General" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                These Terms and Conditions ("Terms") govern your enrolment and
                participation in the online courses ("Courses") offered by M/s
                Shree Chandramangal Suncity Marketing Private Limited, operating
                under the brand name Discovery of Success (DOS) – A business
                school of Suncity Solar ("we," "us," "our," or "the Company"),
                via our Learning Management System (LMS) and associated digital
                platforms.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                By purchasing or accessing our Courses, you agree to be bound by
                these Terms, formulated in compliance with the Consumer
                Protection Act, 2019, the Information Technology Act, 2000, and
                all other applicable laws.
              </p>
            </div>

            <SectionHeader icon={Shield} title="1. Application" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                These Terms apply to all consumers ("Students" or "you") who
                purchase, access, or participate in any Course provided by
                Discovery of Success (DOS) -A Business School of Suncity Solar
                through its website, mobile app, or LMS platform.
              </p>
            </div>

            <SectionHeader icon={ShieldCheck} title="2. Definitions" />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    <span className="font-semibold">"Consumer":</span> As
                    defined under the Consumer Protection Act, 2019.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    <span className="font-semibold">"Course Materials":</span>{" "}
                    Includes all digital content, such as videos, PDFs,
                    documents, presentations, quizzes, and any downloadable
                    resources.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    <span className="font-semibold">"LMS":</span> The Learning
                    Management System (website or mobile app) hosted at
                    dos.suncitysolar.in.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    <span className="font-semibold">"Order Confirmation":</span>{" "}
                    The formal confirmation of your Course enrolment, sent via
                    email, SMS, or app notification.
                  </span>
                </li>
              </ul>
            </div>

            <SectionHeader icon={Edit} title="3. Enrolment and Account" />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                By enrolling in any Course, you confirm that:
              </p>
              <ul className="space-y-3 text-gray-700 ml-6">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    The enrolment is made voluntarily after reviewing the Course
                    details and Terms.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    You have provided accurate, current, and complete
                    information during registration.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    You are responsible for maintaining the confidentiality of
                    your LMS login credentials.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Any activity under your account will be deemed to have been
                    performed by you.
                  </span>
                </li>
              </ul>
            </div>

            <SectionHeader
              icon={Lock}
              title="4. License and Use of Course Materials"
            />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                Upon successful enrolment, Discovery of Success (DOS) -A
                Business School of Suncity Solar grants you a limited,
                non-exclusive, non-transferable license to access and use the
                Course Materials solely for personal, educational purposes.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                You agree not to copy, share, record, distribute, or reproduce
                the Course content for any commercial or unauthorized use.
              </p>
            </div>

            <SectionHeader icon={Clock} title="5. Payment and Refund Policy" />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Course fees are clearly displayed on our website/LMS.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    All fees are non-transferable and subject to applicable
                    taxes.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Refunds and cancellations are governed strictly by the
                    Course Refund & Cancellation Policy available on our
                    website.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Once enrolment is confirmed and payment is made, no refund,
                    cancellation, or transfer shall be entertained under any
                    circumstances, including non-attendance, withdrawal, or
                    dissatisfaction after accessing the course.
                  </span>
                </li>
              </ul>
            </div>

            <SectionHeader
              icon={Shield}
              title="6. Data Privacy and Protection"
            />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                All personal information collected during enrolment and course
                participation shall be used solely for academic, administrative,
                and communication purposes, in compliance with the Information
                Technology Act, 2000 and the Digital Personal Data Protection
                Act, 2023.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                Discovery of Success (DOS) -A Business School of Suncity Solar
                ensures reasonable data protection but shall not be liable for
                third-party data breaches or issues beyond its control.
              </p>
            </div>

            <SectionHeader icon={Award} title="7. Code of Academic Integrity" />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Students are expected to maintain the highest standards of
                    honesty and integrity.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Any instance of plagiarism, cheating, or unauthorized
                    sharing of Course Materials will result in immediate
                    suspension or termination of access without refund or prior
                    notice.
                  </span>
                </li>
              </ul>
            </div>

            <SectionHeader
              icon={FileText}
              title="8. Course Completion and Certificate Clause"
            />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Certificates will be issued only upon successful completion
                    of all required modules, assignments, assessments, or
                    practicals as per course guidelines.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Mere enrolment or partial participation does not guarantee
                    certification.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    All certificates are digitally verifiable and issued under
                    the authority of DOS-A Business School of Suncity Solar.
                  </span>
                </li>
              </ul>
            </div>

            <SectionHeader
              icon={AlertTriangle}
              title="9. Non-Employment & Non-Guarantee Clause"
            />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Enrolment or completion of a Course does not create any
                    employment, partnership, or agency relationship between the
                    Student and DOS-A Business School of Suncity Solar.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    The Company does not guarantee any job placement, fixed
                    income, or business outcome merely upon completion.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    The program promotes entrepreneurship and self-reliance, and
                    learners acknowledge this by enrolling voluntarily.
                  </span>
                </li>
              </ul>
            </div>

            <SectionHeader
              icon={AlertTriangle}
              title="10. Third-Party Content Disclaimer"
            />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Some Courses may include references to or usage of
                    third-party software, tools, or resources.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Discovery of Success (DOS) -A Business School of Suncity
                    Solar is not responsible for the accuracy, legality, or
                    availability of such third-party materials or external
                    links.
                  </span>
                </li>
              </ul>
            </div>

            <SectionHeader
              icon={Clock}
              title="11. LMS Access Duration and Termination"
            />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Course access is valid for a specific duration (for example,
                    90 or 180 days) from the date of enrolment unless otherwise
                    specified.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    DOS-A Business School of Suncity Solar reserves the right to
                    suspend or terminate access in cases of policy violation,
                    misuse, or breach of academic integrity.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Upon completion of the access period, continued access may
                    require renewal or re-enrolment.
                  </span>
                </li>
              </ul>
            </div>

            <SectionHeader
              icon={Lock}
              title="12. Intellectual Property Rights"
            />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    All intellectual property rights in the Courses, Course
                    Materials, LMS design, and related content belong
                    exclusively to Discovery of Success (DOS) -A Business School
                    of Suncity Solar and its licensors.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Any unauthorized use, reproduction, or distribution will
                    invite legal action under the Copyright Act, 1957 and
                    related laws.
                  </span>
                </li>
              </ul>
            </div>

            <SectionHeader
              icon={AlertTriangle}
              title="13. User Conduct and Responsibilities"
            />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="space-y-3 text-gray-700 ml-6">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Share login credentials or access with anyone else.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Post, upload, or transmit unlawful, defamatory, or harmful
                    content.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Disrupt or misuse the LMS system.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Attempt unauthorized access to other accounts or LMS
                    modules.
                  </span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Violations may lead to account suspension without refund and
                potential legal consequences.
              </p>
            </div>

            <SectionHeader icon={Mail} title="14. Communication and Consent" />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    By enrolling, you consent to receive notifications, updates,
                    and communications (via email, SMS, WhatsApp, or app
                    notifications) regarding your Course, training programs,
                    events, or business opportunities.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    You may opt out of promotional messages but will continue to
                    receive essential course-related notifications.
                  </span>
                </li>
              </ul>
            </div>

            <SectionHeader
              icon={AlertTriangle}
              title="15. Modifications, Maintenance & Interruptions"
            />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Discovery of Success (DOS) -A Business School of Suncity
                    Solar reserves the right to modify, suspend, or discontinue
                    any Course or LMS feature for upgrades, maintenance, or
                    operational requirements.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    We will make reasonable efforts to inform users in advance.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Temporary interruptions shall not be grounds for refunds.
                  </span>
                </li>
              </ul>
            </div>

            <SectionHeader
              icon={AlertTriangle}
              title="16. Force Majeure Clause"
            />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                Discovery of Success (DOS) -A Business School of Suncity Solar
                shall not be held liable for any delay, interruption, or
                inability to provide services due to circumstances beyond its
                reasonable control, including natural calamities, system
                failures, pandemics, or government restrictions.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                In such cases, course access extensions may be granted instead
                of refunds.
              </p>
            </div>

            <SectionHeader
              icon={AlertTriangle}
              title="17. Disclaimer of Warranties"
            />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                All Courses and content are provided on an "as is" and "as
                available" basis.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2">
                While we strive to deliver quality learning experiences, no
                specific results, earnings, or success outcomes are guaranteed
                upon completion.
              </p>
            </div>

            <SectionHeader
              icon={AlertTriangle}
              title="18. Limitation of Liability"
            />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                To the fullest extent permitted by law, Discovery of Success
                (DOS) -A Business School of Suncity Solar shall not be liable
                for any indirect, incidental, or consequential losses, including
                loss of income, opportunity, or data, arising from course use or
                access.
              </p>
            </div>

            <SectionHeader
              icon={Phone}
              title="19. Grievance Redressal Mechanism"
            />
            <div className="ml-11 mb-8">
              <p className="text-gray-700 leading-relaxed">
                We have a structured grievance process to resolve student
                concerns promptly:
              </p>
              <ul className="space-y-3 text-gray-700 mt-4 ml-6">
                <li className="flex items-start">
                  <span className="text-blue-500 font-semibold mr-2">
                    Acknowledgment:
                  </span>
                  <span>Within 48 hours of receiving your complaint.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-semibold mr-2">
                    Resolution:
                  </span>
                  <span>
                    Our Grievance Officer will attempt resolution within 30
                    days.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-semibold mr-2">
                    Escalation:
                  </span>
                  <span>
                    If unsatisfied, you may approach the National Consumer
                    Helpline (NCH), State Consumer Helpline (SCH), or the
                    relevant Consumer Forum under the Consumer Protection Act,
                    2019.
                  </span>
                </li>
              </ul>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Grievance Officer:
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="font-medium text-gray-700 w-24">
                      Name:
                    </span>
                    <span>Mr. Mahipal Singh</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-medium text-gray-700 w-24">
                      Email:
                    </span>
                    <a
                      href="mailto:dos@suncitysolar.in"
                      className="text-blue-600 hover:underline"
                    >
                      dos@suncitysolar.in
                    </a>
                  </div>
                  <div className="flex items-start">
                    <span className="font-medium text-gray-700 w-24">
                      Contact:
                    </span>
                    <a
                      href="tel:+917014759495"
                      className="text-blue-600 hover:underline"
                    >
                      +91 7014759495
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <SectionHeader
              icon={AlertTriangle}
              title="20. Dispute Settlement & Governing Law"
            />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    All disputes arising under these Terms shall first be
                    handled through the Grievance Redressal process.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Unresolved matters may proceed to mediation or consumer
                    dispute forums as applicable.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    These Terms are governed by the laws of India, and the
                    courts of Jaipur, Rajasthan shall have exclusive
                    jurisdiction.
                  </span>
                </li>
              </ul>
            </div>

            <SectionHeader
              icon={AlertTriangle}
              title="21. Amendment and Severability"
            />
            <div className="ml-11 mb-8">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Discovery of Success (DOS) -A Business School of Suncity
                    Solar reserves the right to amend, modify, or update these
                    Terms at any time without prior notice.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Continued use of the LMS after such updates implies
                    acceptance of the revised Terms.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    If any clause herein is found invalid or unenforceable, the
                    remaining provisions shall remain fully effective.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mt-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Final Note:
              </h3>
              <p className="text-gray-700 leading-relaxed">
                These Terms ensure transparency, fairness, and integrity in our
                training and learning environment. By enrolling, you acknowledge
                that you have read, understood, and agreed to abide by these
                Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
