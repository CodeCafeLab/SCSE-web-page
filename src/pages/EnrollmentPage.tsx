import { useParams } from "react-router-dom";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface EnrollmentPageProps {
  advisorId?: string;
}

export const EnrollmentPage = ({ advisorId }: EnrollmentPageProps) => {
  // Allow advisorId to come either from props (wrapper) or directly from the URL
  const params = useParams<{ advisorId?: string }>();
  const effectiveAdvisorId = advisorId ?? params.advisorId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/80 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="rounded-2xl shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <CardTitle className="text-2xl md:text-3xl">
                Enrollment Form
              </CardTitle>
              <CardDescription className="text-blue-100">
                Secure your spot in the upcoming batch by completing the
                enrollment details below.
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white p-6 md:p-8">
              <EnrollmentForm advisorId={effectiveAdvisorId} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};


