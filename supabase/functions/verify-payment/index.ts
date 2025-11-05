import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId } = await req.json();

    console.log('Verifying payment for order:', orderId);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Cashfree API credentials
    const cashfreeAppId = Deno.env.get('CASHFREE_APP_ID');
    const cashfreeSecretKey = Deno.env.get('CASHFREE_SECRET_KEY');

    if (!cashfreeAppId || !cashfreeSecretKey) {
      throw new Error('Cashfree credentials not configured');
    }

    // Verify payment status with Cashfree
    const cashfreeResponse = await fetch(
      `https://sandbox.cashfree.com/pg/orders/${orderId}`,
      {
        method: 'GET',
        headers: {
          'x-api-version': '2023-08-01',
          'x-client-id': cashfreeAppId,
          'x-client-secret': cashfreeSecretKey,
        },
      }
    );

    if (!cashfreeResponse.ok) {
      const errorText = await cashfreeResponse.text();
      console.error('Cashfree verification error:', errorText);
      throw new Error(`Cashfree verification error: ${errorText}`);
    }

    const paymentStatus = await cashfreeResponse.json();
    console.log('Payment status from Cashfree:', paymentStatus);

    // Update enrollment payment status
    const { data: enrollment, error: updateError } = await supabase
      .from('enrollments')
      .update({
        payment_status: paymentStatus.order_status === 'PAID' ? 'completed' : 'failed',
      })
      .eq('payment_id', orderId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating enrollment:', updateError);
      throw updateError;
    }

    console.log('Enrollment updated:', enrollment);

    return new Response(
      JSON.stringify({
        success: paymentStatus.order_status === 'PAID',
        paymentStatus: paymentStatus.order_status,
        enrollmentId: enrollment.enrollment_id,
        enrollment: enrollment,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Error in verify-payment function:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Unknown error occurred' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
