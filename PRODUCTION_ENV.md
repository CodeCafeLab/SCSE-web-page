# Production .env Configuration for https://dos.suncitysolar.in/

## Required Environment Variables

Copy these exact lines to your `.env` file:

```env
# Line 1: Cashfree Client ID (App ID)
VITE_CASHFREE_APP_ID=your_production_cashfree_client_id

# Line 2: Cashfree API URL (Production)
VITE_CASHFREE_API_URL=https://api.cashfree.com/pg/orders

# Line 3: Application URL (Production Domain)
VITE_APP_URL=https://dos.suncitysolar.in

# Line 4: Node Environment
NODE_ENV=production

# Line 5: (Optional) For testing - use sandbox
# VITE_CASHFREE_API_URL=https://sandbox.cashfree.com/pg/orders
```

## Important Notes:

1. **No Backend Required**: Code calls Cashfree API directly from frontend
2. **Production Domain**: All callbacks use `https://dos.suncitysolar.in`
3. **Cashfree Credentials**: Get from https://dashboard.cashfree.com/
   - Go to Developers → API Keys
   - Use **Production** credentials (not Sandbox)
   - Copy your **Client ID** (App ID)

## How to Get Cashfree Credentials:

1. Login to Cashfree Dashboard: https://dashboard.cashfree.com/
2. Navigate to **Developers → API Keys**
3. Switch to **Production** mode (not Sandbox)
4. Copy your **Client ID** (App ID)
5. Paste it in `.env` file as `VITE_CASHFREE_APP_ID`

## Payment Flow:

1. User submits enrollment form on `https://dos.suncitysolar.in/`
2. Form submits to ERP API → Success
3. Code calls Cashfree API directly
4. Gets payment link or session ID
5. Redirects to Cashfree payment page
6. User pays ₹11,700
7. Redirects back to `https://dos.suncitysolar.in/payment/callback`

## Testing:

After setting `.env`:
1. Build: `npm run build`
2. Deploy to `https://dos.suncitysolar.in/`
3. Test enrollment flow
4. Payment should open automatically

## Important:

⚠️ **Note**: Cashfree API typically requires both Client ID and Secret Key. If you get authentication errors, you may need to:
- Use Cashfree Payment Links (pre-generated in dashboard)
- Or configure Cashfree dashboard to allow client-side order creation
- Or use Cashfree's hosted checkout pages

For production, ensure SSL certificate is valid (HTTPS required for Cashfree).

