# Production Setup for https://dos.suncitysolar.in/

Cashfree has been removed. Follow these steps to deploy the frontend + backend while we wait for PhonePe integration details.

## 1. Frontend

```bash
npm install
npm run build
```

Serve `dist/` behind HTTPS.

## 2. Backend

```bash
cd server
npm install
npm run start   # or use PM2/systemd
```

Populate `server/.env` with the usual database/email credentials—no payment keys are required right now.

## 3. Nginx example

```nginx
location / {
    root /var/www/dos.suncitysolar.in/dist;
    try_files $uri $uri/ /index.html;
}

    location /api {
        proxy_pass http://localhost:5002;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

## Current status

- Payments are disabled and will be reintroduced with PhonePe.
- Remove every `CASHFREE_*` environment variable from production secrets.
- Future updates will document the new gateway endpoints, callbacks, and webhooks.

