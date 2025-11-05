# Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

## For Development (Local)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for callback URLs)
VITE_APP_URL=http://localhost:8080
VITE_API_URL=http://localhost:5000
APP_URL=http://localhost:8080

# Cashfree Payment Gateway Configuration
# Get these from: https://dashboard.cashfree.com/
# For testing, use Sandbox credentials

# Cashfree App ID (Client ID)
CASHFREE_APP_ID=your_cashfree_app_id_here

# Cashfree Secret Key (Client Secret)
CASHFREE_SECRET_KEY=your_cashfree_secret_key_here

# Cashfree API URL
# Sandbox: https://sandbox.cashfree.com/pg/orders
# Production: https://api.cashfree.com/pg/orders
CASHFREE_API_URL=https://sandbox.cashfree.com/pg/orders
```

## For Production (https://dos.suncitysolar.in/)

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Production Domain - IMPORTANT: Use your actual production domain
APP_URL=https://dos.suncitysolar.in
VITE_APP_URL=https://dos.suncitysolar.in
VITE_API_URL=https://dos.suncitysolar.in/api

# Cashfree Payment Gateway Configuration
# Use PRODUCTION credentials from Cashfree dashboard

# Cashfree App ID (Client ID) - Production
CASHFREE_APP_ID=your_production_cashfree_app_id

# Cashfree Secret Key (Client Secret) - Production
CASHFREE_SECRET_KEY=your_production_cashfree_secret_key

# Cashfree API URL - Production
CASHFREE_API_URL=https://api.cashfree.com/pg/orders
```

## How to get Cashfree Credentials:

1. Go to https://dashboard.cashfree.com/
2. Sign up or login to your account
3. Navigate to Developers → API Keys
4. For testing, use Sandbox credentials
5. For production, switch to Production mode and use Production credentials

## Important Notes:

- Never commit your `.env` file to git
- The `.env` file is already in `.gitignore`
- For production, update `CASHFREE_API_URL` to production URL
- Update `VITE_APP_URL` to your production domain when deploying

