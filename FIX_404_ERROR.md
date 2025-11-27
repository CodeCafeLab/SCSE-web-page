# 🔧 Fix: Backend API 404 Error

## Problem:
Your frontend is calling `https://dos.suncitysolar.in/api/payment/create-session` but getting **404 Not Found**.

This means either:
1. ❌ Backend server is not running
2. ❌ Nginx is not configured to proxy `/api` requests to backend

## Solution:

### Option 1: Configure Nginx (Recommended for Production)

Add this to your Nginx configuration for `dos.suncitysolar.in`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name dos.suncitysolar.in www.dos.suncitysolar.in;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name dos.suncitysolar.in www.dos.suncitysolar.in;
    
    # SSL certificates (adjust paths as needed)
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;
    
    # Frontend static files
    location / {
        root /var/www/SCSE-web-page/suncity-enroll-flow/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
    }
    
    # Backend API proxy (ADD THIS BLOCK)
    location /api {
        proxy_pass http://localhost:5002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection "";
        proxy_buffering off;
    }
    
    # Health check endpoint
    location /health {
        proxy_pass http://localhost:5002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

### Option 2: Run Backend Server on Your Server

**SSH into your server** and run:

```bash
# Navigate to project directory
cd /var/www/SCSE-web-page/suncity-enroll-flow

# Install dependencies (if not done)
npm install

# Create backend .env file
cd server
nano .env
```

**Add to `server/.env`:**
```env
PORT=5002
NODE_ENV=production
APP_URL=https://dos.suncitysolar.in
```

**Start backend server:**
```bash
# Go back to project root
cd ..

# Start server (use PM2 for production)
npm install -g pm2
pm2 start server/index.ts --name "payment-api" --interpreter tsx
pm2 save
pm2 startup  # Auto-start on reboot
```

### Option 3: Test Backend Locally First

1. **Start backend server:**
   ```bash
   npm run server
   ```

2. **Update frontend `.env` for local testing:**
   ```env
   VITE_API_URL=http://localhost:5002/api
   ```

3. **Test if backend is working:**
   ```bash
   curl http://localhost:5002/health
   ```
   Should return: `{"status":"ok"}`

## Quick Checklist:

- [ ] Backend server is running on port 5002
- [ ] Backend `.env` file contains the required DB/email secrets
- [ ] Nginx is configured to proxy `/api` → `http://localhost:5002`
- [ ] Nginx config is reloaded: `sudo systemctl reload nginx`
- [ ] Backend health check works: `curl https://dos.suncitysolar.in/health`

## Test Commands:

```bash
# Test backend locally
curl http://localhost:5002/health

# Test backend via domain (should work after Nginx config)
curl https://dos.suncitysolar.in/health

# Test API endpoint
curl -X POST https://dos.suncitysolar.in/api/payment/create-session \
  -H "Content-Type: application/json" \
  -d '{"orderId":"test123","amount":11700,"customerName":"Test","customerEmail":"test@test.com","customerPhone":"9999999999"}'
```

## After Setup:

Once backend is running and Nginx is configured:
1. ✅ Frontend will call `/api/payment/create-session`
2. ✅ Nginx will proxy to `http://localhost:5002/api/payment/create-session`
3. ✅ The endpoint will respond with HTTP 501 until the PhonePe integration is ready
4. ✅ When PhonePe APIs are connected, this path will return an order reference instead of a 404

