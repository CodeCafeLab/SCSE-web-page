# Production .env Configuration for https://dos.suncitysolar.in/

Cashfree has been removed from the stack. Configure only the shared infrastructure variables until PhonePe details are available.

## Frontend variables (`.env.production`)

```env
NODE_ENV=production
APP_URL=https://dos.suncitysolar.in
VITE_API_BASE_URL=https://dos.suncitysolar.in
VITE_API_URL=https://dos.suncitysolar.in/api
PHONEPE_ENV=PRODUCTION
PHONEPE_CLIENT_ID=SU2511201540330730273312
PHONEPE_CLIENT_SECRET=22b18d20-93ce-4533-8a4b-938c16d26c37
PHONEPE_CLIENT_VERSION=1
```

## Backend variables (`server/.env.production`)

```env
PORT=5002
NODE_ENV=production
APP_URL=https://dos.suncitysolar.in
FRONTEND_URL=https://dos.suncitysolar.in
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

> PhonePe credentials, callbacks, and webhook secrets will be documented once the payment gateway contract is finalized. Delete any legacy `CASHFREE_*` variables from your production secrets.

