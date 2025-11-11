# ✅ .env File Configuration - Complete Setup

## Your .env File Should Have:

```env
# Line 1: Cashfree Client ID (Required)
VITE_CASHFREE_APP_ID=your_cashfree_client_id_here

# Line 2: Cashfree API URL (Required)
VITE_CASHFREE_API_URL=https://sandbox.cashfree.com/pg/orders

# Line 3: Backend API URL (Optional - for secure payment)
VITE_API_URL=http://localhost:5000/api

# Line 4: Cashfree Secret Key (Backend Only - DO NOT expose to frontend)
CASHFREE_SECRET_KEY=your_cashfree_secret_key_here

# Line 5: Application URL (Optional)
VITE_API_BASE_URL=http://localhost:8080

# Line 6: Node Environment (Optional)
NODE_ENV=development
```

## Minimum Required Configuration:

For **frontend-only** (Cashfree API direct):
```env
VITE_CASHFREE_APP_ID=your_client_id
VITE_CASHFREE_API_URL=https://sandbox.cashfree.com/pg/orders
```

For **with backend server** (Recommended):
```env
VITE_CASHFREE_APP_ID=your_client_id
VITE_CASHFREE_API_URL=https://sandbox.cashfree.com/pg/orders
VITE_API_URL=http://localhost:5000/api
CASHFREE_SECRET_KEY=your_secret_key
```

## How It Works Now:

1. **If `VITE_API_URL` is set**: Code tries backend API first, then falls back to Cashfree API
2. **If `VITE_API_URL` is empty**: Code calls Cashfree API directly
3. **Backend API**: Uses secret key securely (recommended)
4. **Direct API**: May fail if Cashfree requires secret key (will show clear error)

## Quick Setup Steps:

1. **Get Cashfree Credentials:**
   - Go to https://dashboard.cashfree.com/
   - Navigate to Developers → API Keys
   - Copy Client ID and Secret Key

2. **Update .env file:**
   ```env
   VITE_CASHFREE_APP_ID=your_actual_client_id
   VITE_CASHFREE_API_URL=https://sandbox.cashfree.com/pg/orders
   ```

3. **For Backend (Recommended):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   CASHFREE_SECRET_KEY=your_actual_secret_key
   ```

4. **Start Backend Server (if using):**
   ```bash
   npm run dev:server
   ```

5. **Start Frontend:**
   ```bash
   npm run dev
   ```

## Testing:

1. Fill enrollment form
2. Submit application
3. Check browser console for payment flow
4. Payment page should open automatically

## Troubleshooting:

- **"Client ID not configured"**: Add `VITE_CASHFREE_APP_ID` to .env
- **"Connection refused"**: Start backend server or remove `VITE_API_URL`
- **"Authentication failed"**: Add `CASHFREE_SECRET_KEY` to backend .env

