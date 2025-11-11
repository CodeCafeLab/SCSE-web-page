# .env Configuration Guide

## Required Environment Variables

Copy this to your `.env` file and fill in your Cashfree credentials:

```env
# Cashfree Client ID (App ID) - Get from Cashfree Dashboard
VITE_CASHFREE_APP_ID=your_cashfree_client_id_here

# Cashfree Client Secret - MUST be kept on backend server only
CASHFREE_SECRET_KEY=your_cashfree_secret_key_here

# Cashfree API URL
# Sandbox: https://sandbox.cashfree.com/pg/orders
# Production: https://api.cashfree.com/pg/orders
VITE_CASHFREE_API_URL=https://sandbox.cashfree.com/pg/orders

# Backend API URL (Optional - if using backend server)
# If set, payment will try backend first, then fallback to direct Cashfree API
VITE_API_URL=http://localhost:5000/api

# Application URL (for payment callbacks)
VITE_API_BASE_URL=http://localhost:8080
```

## How to Get Cashfree Credentials:

1. Go to https://dashboard.cashfree.com/
2. Sign up or login
3. Navigate to **Developers → API Keys**
4. Copy your **Client ID** and **Client Secret**
5. For testing, use **Sandbox** mode
6. For production, switch to **Production** mode

## Setup Options:

### Option 1: With Backend Server (Recommended - More Secure)

1. Add all variables to `.env`
2. Start backend server: `npm run dev:server`
3. Frontend will use backend API automatically

### Option 2: Direct Cashfree API (Less Secure)

1. Add only `VITE_CASHFREE_APP_ID` and `VITE_CASHFREE_API_URL` to `.env`
2. Leave `VITE_API_URL` empty
3. Note: May fail if Cashfree requires secret key

## Testing:

After setting up `.env`:
1. Restart your dev server: `npm run dev`
2. Fill enrollment form
3. Click "Submit Application"
4. Check browser console for payment flow

## Important Notes:

- ⚠️ Never commit `.env` file to git
- ⚠️ Client Secret should NEVER be in frontend code
- ✅ Use backend server for production (more secure)
- ✅ Use Sandbox credentials for testing

