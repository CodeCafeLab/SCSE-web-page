# Simple Answer: Backend Deployment

## ✅ YES - You Need to Run Backend Server Separately

**But it's very simple!** The backend is minimal (just 1 endpoint).

## Quick Steps:

### 1. On Your Server (where dos.suncitysolar.in is hosted):

```bash
# Navigate to your project
cd /var/www/SCSE-web-page/suncity-enroll-flow

# Install backend dependencies
npm install express cors dotenv axios tsx @types/express @types/cors concurrently

# Go to server folder
cd server

# Create backend .env file
nano .env
```

### 2. Backend .env file content:

```env
PORT=5000
NODE_ENV=production
APP_URL=https://dos.suncitysolar.in
CASHFREE_APP_ID=2010284e3f0d145901db313a3b820102
CASHFREE_SECRET_KEY=your_production_secret_key_here
CASHFREE_API_URL=https://api.cashfree.com/pg/orders
```

### 3. Start Backend Server:

```bash
# Option A: Simple start (stops when you close terminal)
npm run server

# Option B: Use PM2 (keeps running, auto-restarts)
npm install -g pm2
pm2 start ../server/index.ts --name "payment-api" --interpreter tsx
pm2 save
pm2 startup  # Auto-start on server reboot
```

### 4. Configure Nginx:

Add this to your Nginx config for `dos.suncitysolar.in`:

```nginx
# Frontend (already configured)
location / {
    root /var/www/SCSE-web-page/suncity-enroll-flow/dist;
    try_files $uri $uri/ /index.html;
}

# Backend API (ADD THIS)
location /api {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### 5. Restart Nginx:

```bash
sudo nginx -t  # Test config
sudo systemctl reload nginx  # Apply changes
```

## What Runs Where:

- **Frontend**: Static files served by Nginx (`/var/www/.../dist/`)
- **Backend**: Node.js server on port 5000 (`npm run server`)
- **Nginx**: Routes `/api` → backend, everything else → frontend

## Test:

Visit: `https://dos.suncitysolar.in/api/payment/health`

Should return: `{"status":"ok"}`

## Summary:

✅ **Yes, run backend separately**
✅ **Very minimal** - just 1 endpoint
✅ **Same server** - no need for separate server
✅ **Uses PM2** - keeps running automatically

The backend is **essential** because Cashfree blocks direct browser calls (CORS security).

