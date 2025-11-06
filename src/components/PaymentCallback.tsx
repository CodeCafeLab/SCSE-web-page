import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const PaymentCallback = () => {
  const [status, setStatus] = useState<'success' | 'failed' | 'pending' | 'loading'>('loading');
  const [orderId, setOrderId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      const orderIdParam = searchParams.get('order_id');
      const paymentStatus = searchParams.get('payment_status');

      if (!orderIdParam) {
        setStatus('failed');
        return;
      }

      setOrderId(orderIdParam);

      // If payment status is in URL, use it
      if (paymentStatus === 'SUCCESS') {
        setStatus('success');
        // Redirect to form with success status - form will auto-submit
        setTimeout(() => {
          navigate(`/?payment_status=SUCCESS&order_id=${orderIdParam}`);
        }, 2000);
      } else if (paymentStatus === 'FAILED') {
        setStatus('failed');
        // Redirect back to form on failure
        setTimeout(() => {
          navigate('/?payment_status=FAILED&order_id=' + orderIdParam);
        }, 3000);
      } else {
        // Verify payment status with backend
        try {
          const apiUrl = import.meta.env.VITE_API_URL || '/api';
          const response = await fetch(`${apiUrl}/payment/verify?order_id=${orderIdParam}`);
          
          if (response.ok) {
            const data = await response.json();
            if (data.payment_status === 'SUCCESS') {
              setStatus('success');
              setTimeout(() => {
                navigate(`/?payment_status=SUCCESS&order_id=${orderIdParam}`);
              }, 2000);
            } else if (data.payment_status === 'FAILED') {
              setStatus('failed');
              setTimeout(() => {
                navigate('/?payment_status=FAILED&order_id=' + orderIdParam);
              }, 3000);
            } else {
              setStatus('pending');
            }
          } else {
            setStatus('pending');
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          setStatus('pending');
        }
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Verifying payment...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          {status === 'success' && (
            <>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription className="text-base mt-2">
                Thank you for your payment. Your enrollment is now complete.
              </CardDescription>
            </>
          )}

          {status === 'failed' && (
            <>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
              <CardTitle className="text-2xl">Payment Failed</CardTitle>
              <CardDescription className="text-base mt-2">
                We couldn't process your payment. Please try again or contact support.
              </CardDescription>
            </>
          )}

          {status === 'pending' && (
            <>
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-yellow-600 animate-spin" />
              </div>
              <CardTitle className="text-2xl">Payment Pending</CardTitle>
              <CardDescription className="text-base mt-2">
                Your payment is being processed. We'll notify you once it's confirmed.
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {orderId && (
            <div className="text-center text-sm text-muted-foreground">
              <p>Order ID: {orderId}</p>
            </div>
          )}

          <div className="space-y-2">
            {status === 'success' && (
              <Button onClick={() => navigate('/')} className="w-full">
                Return to Home
              </Button>
            )}

            {status === 'failed' && (
              <>
                <Button onClick={() => navigate('/#enrollment-form')} className="w-full">
                  Try Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://wa.me/919876543210', '_blank')} 
                  className="w-full"
                >
                  Contact Support
                </Button>
              </>
            )}

            {status === 'pending' && (
              <Button onClick={() => navigate('/')} className="w-full">
                Back to Home
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

