# Backend Server Deployment Guide

## ✅ Yes, You Need to Run Backend Server

**Why?** Cashfree API blocks direct browser calls (CORS security). Backend is required.

## Two Deployment Options:

### Option 1: Same Server (Recommended - Easiest)

Run backend on the **same server** as your website, accessible at `https://dos.suncitysolar.in/api`

**Steps:**

1. **Upload Backend Code:**
   - Upload `server/` folder to your server
   - Example: `/var/www/dos-backend/` or `/home/your-user/suncity-backend/`

2. **Install Dependencies:**
   ```bash
   cd /path/to/server
   npm install express cors dotenv axios tsx @types/express @types/cors
   ```

3. **Create Backend .env File:**
   ```env
   PORT=5000
   NODE_ENV=production
   APP_URL=https://dos.suncitysolar.in
   CASHFREE_APP_ID=2010284e3f0d145901db313a3b820102
   CASHFREE_SECRET_KEY=your_production_secret_key
   CASHFREE_API_URL=https://api.cashfree.com/pg/orders
   ```

4. **Start Server:**
   ```bash
   # Simple start
   npm run server
   
   # OR use PM2 (recommended - keeps server running)
   npm install -g pm2
   pm2 start server/index.ts --name "payment-api" --interpreter tsx
   pm2 save
   pm2 startup  # Auto-start on server reboot
   ```

5. **Configure Nginx:**
   ```nginx
   # Add this to your Nginx config for dos.suncitysolar.in
   location /api {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
   }
   ```

6. **Restart Nginx:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Option 2: Serverless Function (No Separate Server)

Deploy backend as a **serverless function** (Vercel, Netlify, Cloudflare Workers)

**Advantages:**
- No server management
- Auto-scales
- Free tier available

**Steps:**
1. Create account on Vercel/Netlify
2. Upload `server/` folder
3. Configure environment variables
4. Deploy
5. Get API URL and update `VITE_API_URL`

## Quick Test:

After deployment, test if backend is working:

```bash
# Test health endpoint
curl https://dos.suncitysolar.in/api/payment/health

# Or visit in browser:
# https://dos.suncitysolar.in/api/payment/health
```

## What Runs on Server:

- **Backend Server** (port 5000) - Handles Cashfree API calls
- **Frontend** (static files) - Served by Nginx
- **Nginx** - Routes `/api` → backend, `/` → frontend

## Minimum Requirements:

- Node.js installed on server
- Port 5000 available (or change in .env)
- Nginx configured to proxy `/api` requests

## Checking if Backend is Running:

```bash
# Check if server is running
ps aux | grep node

# Check if port 5000 is listening
netstat -tulpn | grep 5000

# Check backend logs
pm2 logs payment-api  # if using PM2
```

## Troubleshooting:

**"Cannot connect to payment server"**
- Backend server not running
- Port 5000 not accessible
- Nginx not configured correctly

**"CORS error"**
- Backend CORS not allowing your domain
- Check `server/index.ts` CORS configuration

## Summary:

✅ **Yes, you need backend server**
- Minimal code (~100 lines)
- Only 1 endpoint
- Handles Cashfree securely
- Can run on same server as frontend

The backend is **very lightweight** and essential for Cashfree payment integration.

