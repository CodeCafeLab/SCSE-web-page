# Simple Answer: Backend Deployment

You still need the backend running, even though payments are offline, because it powers OTP flows and will host the upcoming PhonePe integration.

## Quick steps

1. SSH into the server that hosts `dos.suncitysolar.in`.
2. Install and start the backend:
   ```bash
   cd /var/www/SCSE-web-page/suncity-enroll-flow/server
   npm install
   npm run start   # or pm2 start src/index.ts --interpreter ts-node
   ```
3. Fill `server/.env` with database/email settings only (no payment keys required yet).
4. Add an Nginx block that proxies `/api` to `http://localhost:5002`.
5. Reload Nginx and hit `https://dos.suncitysolar.in/api/health` to confirm it’s live.

Payments will continue to respond with HTTP 501 until the PhonePe APIs are wired in—no extra action is needed right now.

