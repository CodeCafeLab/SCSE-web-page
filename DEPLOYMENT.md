# Production Deployment Guide

PhonePe integration is not live yet, but you can deploy the rest of the stack using the steps below.

## Prerequisites

1. Node.js 18+
2. Domain configured for `https://dos.suncitysolar.in/`
3. Valid SSL certificate
4. Database + email credentials

## Environment variables

```env
PORT=5002
NODE_ENV=production
APP_URL=https://dos.suncitysolar.in
VITE_API_BASE_URL=https://dos.suncitysolar.in
VITE_API_URL=https://dos.suncitysolar.in/api
DB_HOST=...
DB_PORT=3306
DB_USERNAME=...
DB_PASSWORD=...
DB_NAME=...
EMAIL_HOST=...
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=...
EMAIL_PASSWORD=...
EMAIL_FROM=no-reply@dos.suncitysolar.in
```

## Steps

1. **Build frontend**
   ```bash
   npm install
   npm run build
   ```
2. **Start backend**
   ```bash
   cd server
   npm install
   npm run start   # or pm2 start src/index.ts --interpreter ts-node
   ```
3. **Configure Nginx/Apache**
   - Serve `dist/` for `/`.
   - Proxy `/api` to `http://localhost:5002`.
4. **Verify**
   - Visit `/health` to confirm backend status.
   - Run through the enrollment form (payment step will inform users that PhonePe integration is pending).

## Current limitations

- Order creation, webhook, and verification routes return HTTP 501.
- No payment credentials are required or used.
- Replace any lingering `CASHFREE_*` secrets with the new PhonePe keys once they are published.

