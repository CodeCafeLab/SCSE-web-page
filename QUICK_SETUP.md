# Quick Setup Guide for https://dos.suncitysolar.in/

## ⚠️ Why Backend is Required

Cashfree API blocks direct browser calls due to CORS security. 
You need a **minimal backend** (just 1 endpoint) to create payment orders.

## Your .env File Setup

### Frontend .env (lines 1-7):
```env
# Line 1: Cashfree Client ID
VITE_CASHFREE_APP_ID=2010284e3f0d145901db313a3b820102

# Line 2: Backend API URL (Required!)
VITE_API_URL=https://dos.suncitysolar.in/api

# Line 3: Application URL
VITE_API_BASE_URL=https://dos.suncitysolar.in

# Line 4: Node Environment
NODE_ENV=production

# Line 5: (Don't need this)
# VITE_CASHFREE_API_URL=https://api.cashfree.com/pg/orders
```

### Backend .env (on your server):
```env
PORT=5000
NODE_ENV=production
APP_URL=https://dos.suncitysolar.in
CASHFREE_APP_ID=2010284e3f0d145901db313a3b820102
CASHFREE_SECRET_KEY=your_production_secret_key_here
CASHFREE_API_URL=https://api.cashfree.com/pg/orders
```

## Deployment Steps

### 1. Deploy Backend Server

**On your server at https://dos.suncitysolar.in:**

```bash
# Upload server folder
cd /path/to/server

# Install dependencies
npm install

# Set backend .env file (with CASHFREE_SECRET_KEY)

# Start server
npm run server

# Or use PM2 (recommended)
pm2 start server/index.ts --name "payment-api" --interpreter tsx
```

### 2. Configure Nginx

```nginx
server {
    listen 443 ssl;
    server_name dos.suncitysolar.in;

    # Frontend
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. Build and Deploy Frontend

```bash
# Build
npm run build

# Upload dist/ folder to your server
```

## What Happens Now

1. User submits form → ERP API call succeeds
2. Frontend calls `/api/payment/create-session` (your backend)
3. Backend calls Cashfree API (no CORS issue)
4. Backend returns payment session ID
5. Frontend opens Cashfree payment page
6. User pays ₹11,700
7. Redirects to callback page

## The Backend is Minimal

- Only 1 endpoint: `/api/payment/create-session`
- Just handles Cashfree API calls
- Very lightweight (~100 lines of code)
- Secure (keeps secret key safe)

This is the **standard way** to integrate Cashfree - all payment gateways require backend for security.

