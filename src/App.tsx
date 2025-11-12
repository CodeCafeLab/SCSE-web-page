import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import { Layout } from "./components/Layout";
import { PaymentCallback } from "./components/PaymentCallback";
import ThankYou from "./pages/ThankYou";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { Index } from "./pages/Index";

// Wrapper component to handle route parameters
const IndexWithAdvisor = () => {
  const { advisorId } = useParams<{ advisorId?: string }>();
  return <Index advisorId={advisorId} />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Index />
            </Layout>
          }
        />
        <Route
          path="/:advisorId"
          element={
            <Layout>
              <IndexWithAdvisor />
            </Layout>
          }
        />
        <Route
          path="/terms"
          element={
            <Layout className="bg-gray-50">
              <Terms />
            </Layout>
          }
        />
        <Route
          path="/refund-policy"
          element={
            <Layout className="bg-gray-50">
              <RefundPolicy />
            </Layout>
          }
        />
        <Route
          path="/terms-of-use"
          element={
            <Layout className="bg-gray-50">
              <TermsOfUse />
            </Layout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <Layout className="bg-gray-50">
              <PrivacyPolicy />
            </Layout>
          }
        />
        <Route path="/payment/callback" element={<PaymentCallback />} />
        <Route
          path="/thank-you"
          element={
            <Layout className="bg-gray-50">
              <ThankYou />
            </Layout>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
