# Backend Server Deployment Guide

The backend still handles OTP/email flows and will host the future PhonePe endpoints, so you need it running even though payments are temporarily disabled.

## Option 1: Host alongside the frontend

1. Upload the `server/` folder to your VPS.
2. Install dependencies and start the API:
   ```bash
   cd /path/to/server
   npm install
   npm run start           # or pm2 start src/index.ts --interpreter ts-node
   ```
3. Configure `server/.env` with database + email settings (no payment keys yet).
4. Add an Nginx block that proxies `/api` to `http://localhost:5002`.

## Option 2: Serverless/managed functions

Deploy the Express server to Vercel/Netlify/Fly.io/Dokku—any environment that can run a Node process with environment variables will work. Update `VITE_API_URL` to the deployed endpoint.

## Health checks

```bash
curl https://dos.suncitysolar.in/api/health
```

If the route responds with `{ "status":"ok" }`, the backend is available. The payment endpoints currently return HTTP 501 until we wire up PhonePe.

## Troubleshooting

- `404 /api/...`: Nginx/hosting isn’t proxying to the backend—double-check the reverse-proxy block.
- `CORS error`: Ensure the requested origin is added to `allowedOrigins` inside `server/src/index.ts`.
- Process stops after SSH logout: run it via PM2/systemd or your hosting provider’s background process feature.

