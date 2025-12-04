import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
  type RouteObject,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import { Layout } from "./components/Layout";
import { PaymentCallback } from "./components/PaymentCallback";
import ThankYou from "./pages/ThankYou";
import EnquiryThankYou from "./pages/EnquiryThankYou";
import { EnrollmentPage } from "./pages/EnrollmentPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { Index } from "./pages/Index";
import { EnquiryFormProvider } from "./contexts/EnquiryFormContext";

// Wrapper component to handle route parameters
const IndexWithAdvisor = () => {
  const { advisorId } = useParams<{ advisorId?: string }>();
  return <Index advisorId={advisorId} />;
};

// Wrapper component for enrollment route with advisorId
const EnrollmentPageWithAdvisor = () => {
  const { advisorId } = useParams<{ advisorId?: string }>();
  return <EnrollmentPage advisorId={advisorId} />;
};

const queryClient = new QueryClient();

const withLayout = (node: ReactNode, className?: string) => (
  <Layout className={className}>{node}</Layout>
);

const routes: RouteObject[] = [
  {
    path: "/",
    element: withLayout(<Index />),
  },
  {
    path: "/:advisorId",
    element: withLayout(<IndexWithAdvisor />),
  },
  {
    path: "/enrolment",
    element: withLayout(<EnrollmentPage />),
  },
  {
    path: "/enrolment/:advisorId",
    element: withLayout(<EnrollmentPageWithAdvisor />),
  },
  {
    path: "/terms",
    element: withLayout(<Terms />, "bg-gray-50"),
  },
  {
    path: "/refund-policy",
    element: withLayout(<RefundPolicy />, "bg-gray-50"),
  },
  {
    path: "/terms-of-use",
    element: withLayout(<TermsOfUse />, "bg-gray-50"),
  },
  {
    path: "/privacy-policy",
    element: withLayout(<PrivacyPolicy />, "bg-gray-50"),
  },
  {
    path: "/thank-you",
    element: withLayout(<ThankYou />, "bg-gray-50"),
  },
  {
    path: "/enquiry/thank-you",
    element: withLayout(<EnquiryThankYou />, "bg-gray-50"),
  },
  {
    path: "/payment/callback",
    element: <PaymentCallback />,
  },
  {
    path: "*",
    element: withLayout(<NotFound />),
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <EnquiryFormProvider>
      <RouterProvider
        router={router}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      />
    </EnquiryFormProvider>
  </QueryClientProvider>
);

export default App;
