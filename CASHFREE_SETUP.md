# Cashfree Direct API Integration

## Important Security Note

⚠️ **Cashfree's order creation API requires BOTH Client ID and Client Secret.**

The Client Secret should NEVER be exposed in frontend code as it's visible to users.

## Options:

### Option 1: Use Cashfree Payment Links (Recommended for Frontend-only)

If you want to avoid backend, you can:
1. Pre-generate payment links in Cashfree dashboard
2. Or use Cashfree's hosted checkout pages
3. Redirect users to payment links directly

### Option 2: Use Backend Server (Recommended for Security)

The current implementation tries to call Cashfree API directly, but it will likely fail without the secret key.

**Best Practice:** Use a backend server to:
- Securely store Client Secret
- Create orders server-side
- Handle webhooks securely

## Environment Variables Needed:

```env
# Frontend (Safe to expose)
VITE_CASHFREE_APP_ID=your_client_id_here
VITE_CASHFREE_API_URL=https://sandbox.cashfree.com/pg/orders

# Backend (Keep secret)
CASHFREE_SECRET_KEY=your_secret_key_here
```

## Current Implementation:

The code now calls Cashfree API directly from frontend. If it fails due to missing secret, you'll see an error message.

To fix:
1. Either add a backend server (recommended)
2. Or use Cashfree's payment link feature
3. Or configure Cashfree dashboard to allow client-id only (if available)

