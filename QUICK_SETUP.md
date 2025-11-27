# Quick Setup Guide for https://dos.suncitysolar.in/

Cashfree integration has been removed. Follow these condensed steps to get the rest of the app running while PhonePe support is being built.

## 1. Environment variables

Create `.env` files with the standard URLs and infrastructure secrets only:

```env
APP_URL=https://dos.suncitysolar.in
VITE_API_BASE_URL=https://dos.suncitysolar.in
VITE_API_URL=https://dos.suncitysolar.in/api
PORT=5002
NODE_ENV=production
```

Remove every `CASHFREE_*` or `VITE_CASHFREE_*` entry if it still exists.

## 2. Deploy backend + frontend

```bash
npm install && npm run build           # frontend
cd server && npm install && npm run start
```

Proxy `/api` traffic from your web server to the backend process (see `PRODUCTION_SETUP.md` for an Nginx example).

## 3. Current limitations

- The payment button now reports that PhonePe integration is pending.
- Webhooks/order endpoints return HTTP 501.
- No payment credentials are required yet.

Once PhonePe APIs land, this document will be updated with the new steps.

