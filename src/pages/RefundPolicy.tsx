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
        <h1 className="text-3xl font-bold mb-8">
          Course Refund & Cancellation Policy
        </h1>

        <div className="space-y-8">
          <section>
            <p className="text-slate-700 mb-4">
              At M/s Shree Chandramangal Suncity Marketing Private Limited
              (hereinafter referred to as "Discovery of Success (DOS) – A
              Business School of Suncity Solar"), we are committed to providing
              high-quality about solar educational content and a valuable
              learning experience. This Policy defines the terms, conditions,
              and process governing refunds and cancellations for all courses
              offered through our Learning Management System (LMS) and official
              platforms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Nature of Digital Products
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                All courses offered by DOS are digital products delivered online
                through our LMS.
              </li>
              <li>
                By purchasing and accessing any course, you acknowledge that
                digital content, once accessed or downloaded, cannot be returned
                or revoked.
              </li>
              <li>
                Accordingly, refund eligibility is limited and strictly governed
                by this Policy.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Refund and Cancellation Before Course Access (Pre-Screening &
              Interview Stage)
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                Information about courses may be shared via Solar Advisors,
                official DOS platforms, social media, or other authorized
                sources.
              </li>
              <li>
                You may cancel your enrolment and receive a full refund if a
                written cancellation request is submitted to dos@suncitysolar.in
                before course access credentials are granted.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Refund and Cancellation After Course Access
            </h2>
            <p className="text-slate-700 mb-4">
              Once login credentials or course access links have been shared,
              the Refund Policy below applies.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                Applicants enrol online by paying a course fee of ₹ 11,700/-
                (Rupees Eleven Thousand Seven Hundred only) through authorized
                payment gateways.
              </li>
              <li>
                Before final confirmation, DOS conducts a primary screening and
                interview to verify eligibility. Applicants are informed via
                SMS/WhatsApp/Email.
              </li>
              <li>
                Once an applicant clears the screening and is formally selected
                for enrolment, the admission becomes final and binding. No
                refund will be permitted thereafter, as digital access and
                services are considered utilized.
              </li>
              <li>
                If an applicant fails the screening or verification stage: The
                fee shall be automatically refunded within 7 working days from
                the date of rejection, without the need for a request.
                Applicable administrative and gateway charges will be deducted
                before refund.
              </li>
              <li>
                Non-Appearance for Interview: Applicants who fail to attend
                their scheduled interview are eligible to request to reschedule
                the interview within the interview schedule for the applied
                batch. No refund provision will be entertained failing to attend
                the interview/rescheduled interview.
              </li>
              <li>
                Once the course is substantially accessed, completed or
                certified, no refund, cancellation, or credit transfer shall be
                entertained under any circumstance either viz. Lack of presence,
                complete absenteeism, delay in joining, change of mind, etc will
                not be entertained for any refund.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. How to Request a Refund
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                Email dos@suncitysolar.in with your name, registered email,
                order number, and reason for refund.
              </li>
              <li>
                You may also contact our Grievance Team at +91-7014759495 for
                guidance.
              </li>
              <li>
                Refund requests are reviewed within 3–5 business days and, if
                approved, processed within 7–10 working days. Bank processing
                times may affect final credit.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Refund & Cancellation Will Not Be Issued Under the Following
              Conditions
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                Refund based on personal expectation or non-technical reasons.
              </li>
              <li>
                Violation of DOS Terms & Conditions (e.g., credential sharing,
                copied or redistribution of content.
              </li>
              <li>
                Unauthorized downloads, recordings, or misuse of course
                materials.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Non-Transferability Clause
            </h2>
            <p className="text-slate-700">
              Enrolments are strictly non-transferable and non-assignable.
              Course access, payment, or refund rights cannot be transferred to
              another individual or batch under any circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Duplicate Payment / Transaction Error Clause
            </h2>
            <p className="text-slate-700">
              In case of duplicate payments or technical transaction errors, the
              excess amount shall be refunded after internal verification within
              7–10 working days, through the original payment method only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Administrative Fee Deduction Clause
            </h2>
            <p className="text-slate-700">
              In cases of accidental payment, duplicate transaction, or
              exceptional refund approval, DOS reserves the right to deduct
              nominal administrative or gateway processing fees before issuing
              the refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              9. Technical Issues & Course Access
            </h2>
            <p className="text-slate-700">
              DOS ensures LMS accessibility and content availability. Temporary
              or minor technical issues do not qualify for refunds. For
              prolonged outages beyond our control, course access may be
              extended or rescheduled at no additional cost.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              10. Order Cancellation by DOS
            </h2>
            <p className="text-slate-700 mb-2">
              DOS reserves the right to cancel or refuse any enrolment due to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Course discontinuation or restructuring,</li>
              <li>Suspect fraudulent activity, or</li>
              <li>Technical or administrative errors.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              11. Misuse / Fraud / Violation Clause
            </h2>
            <p className="text-slate-700">
              Any misuse of course access (including sharing of credentials,
              multiple logins from different IPs, unauthorized downloads, or
              academic misconduct) will result in immediate termination of
              access without refund and may invite legal action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              12. Communication & Documentation Requirement
            </h2>
            <p className="text-slate-700">
              All refund or cancellation requests must be made in writing via
              registered email. Verbal or telephonic requests shall not be
              considered valid unless confirmed in writing by DOS.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              13. Force Majeure Clause
            </h2>
            <p className="text-slate-700">
              DOS shall not be held liable for any delay, interruption, or
              cancellation caused by circumstances beyond its control including
              natural disasters, pandemics, internet failures, or government
              restrictions. In such cases, course access extensions or
              rescheduled sessions shall be provided instead of refunds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              14. Policy Supremacy & Reference Clause
            </h2>
            <p className="text-slate-700">
              This Refund & Cancellation Policy must be read in conjunction with
              the Terms & Conditions and Privacy Policy of Discovery of Success
              (DOS). In the event of any discrepancy, the decision of the
              management shall be final and binding.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              15. Jurisdiction & Governing Law
            </h2>
            <p className="text-slate-700">
              This Policy shall be governed by and construed in accordance with
              the laws of India. Any dispute arising hereunder shall fall under
              the exclusive jurisdiction of the courts at Jaipur, Rajasthan.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              16. Policy Revision Clause
            </h2>
            <p className="text-slate-700">
              DOS reserves the right to amend, modify, or update this Policy at
              any time without prior notice. The latest version published on
              dos.suncitysolar.in shall be deemed final and applicable to all
              users and enrolments.
            </p>
          </section>

          <section className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Final Note</h2>
            <p className="text-slate-700 mb-4">
              This Policy aims to ensure fairness, transparency, and integrity
              in all course transactions — protecting both the learner's rights
              and the organization's digital intellectual property.
            </p>
            <p className="text-slate-700 font-medium">
              Applicable To: All applicants and enrolled learners of Discovery
              of Success (DOS).
            </p>
          </section>

          <div className="pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
