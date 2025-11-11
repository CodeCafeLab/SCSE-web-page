# Production .env Configuration for https://dos.suncitysolar.in/

## ⚠️ Important: CORS Restriction

Cashfree API **CANNOT** be called directly from browser due to CORS. 
You **MUST** use a backend server (even if minimal) for payment order creation.

## Required Environment Variables

### Frontend .env (for build):
```env
# Line 1: Cashfree Client ID
VITE_CASHFREE_APP_ID=your_production_cashfree_client_id

# Line 2: Backend API URL (Required - must point to your backend)
VITE_API_URL=https://dos.suncitysolar.in/api

# Line 3: Application URL
VITE_API_BASE_URL=https://dos.suncitysolar.in

# Line 4: Node Environment
NODE_ENV=production
```

### Backend .env (on server - separate file):
```env
# Line 1: Port
PORT=5000

# Line 2: Environment
NODE_ENV=production

# Line 3: Production Domain
APP_URL=https://dos.suncitysolar.in

# Line 4: Cashfree Client ID
CASHFREE_APP_ID=your_production_cashfree_client_id

# Line 5: Cashfree Secret Key (Keep Secret!)
CASHFREE_SECRET_KEY=your_production_cashfree_secret_key

# Line 6: Cashfree API URL
CASHFREE_API_URL=https://api.cashfree.com/pg/orders
```

## Minimal Backend Setup

The backend server is **minimal** - only handles Cashfree API calls:
- 1 endpoint: `/api/payment/create-session`
- Very lightweight
- Can be deployed as serverless function

## Deployment Options

### Option 1: Same Server
- Deploy frontend (`dist/`) and backend (`server/`) on same server
- Configure Nginx to route `/api` to backend

### Option 2: Serverless Function
- Use Vercel Functions, Netlify Functions, or AWS Lambda
- Deploy just the payment endpoint

### Option 3: Separate API Subdomain
- Deploy backend at `https://api.dos.suncitysolar.in`
- Update `VITE_API_URL=https://api.dos.suncitysolar.in`

## Why Backend is Required

- Browser CORS prevents direct Cashfree API calls
- Secret key must be kept secure (server-side only)
- Industry standard security practice

This is the **only secure way** to integrate Cashfree payments.

