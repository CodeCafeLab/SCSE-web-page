# Production Setup for https://dos.suncitysolar.in/

## ⚠️ Important: CORS Issue

Cashfree API **CANNOT** be called directly from browser due to CORS restrictions. 
You **MUST** use a backend server to create orders.

## Solution: Minimal Backend Server

You need a small backend server (just for Cashfree API calls) that runs on your domain.

### Option 1: Deploy Backend on Same Domain (Recommended)

Deploy backend server at `https://dos.suncitysolar.in/api` or `https://api.dos.suncitysolar.in`

### Option 2: Use Serverless Function

Use Vercel/Netlify Functions or similar for the payment endpoint.

## .env Configuration

### Frontend .env (for build):
```env
VITE_CASHFREE_APP_ID=your_production_client_id
VITE_CASHFREE_API_URL=https://api.cashfree.com/pg/orders
VITE_API_URL=https://dos.suncitysolar.in/api
VITE_API_BASE_URL=https://dos.suncitysolar.in
NODE_ENV=production
```

### Backend .env (on server):
```env
PORT=5000
NODE_ENV=production
APP_URL=https://dos.suncitysolar.in
CASHFREE_APP_ID=your_production_client_id
CASHFREE_SECRET_KEY=your_production_secret_key
CASHFREE_API_URL=https://api.cashfree.com/pg/orders
```

## Deployment Steps

1. **Build Frontend:**
   ```bash
   npm run build
   ```

2. **Deploy Frontend:**
   - Upload `dist/` folder to your web server
   - Configure Nginx/Apache to serve static files

3. **Deploy Backend:**
   - Upload `server/` folder to your server
   - Install dependencies: `npm install`
   - Set backend `.env` file
   - Start server: `npm run server` or use PM2

4. **Configure Nginx (if using same domain):**
   ```nginx
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
   }
   ```

## Why Backend is Needed

- ❌ Browser CORS blocks direct Cashfree API calls
- ❌ Client Secret cannot be exposed in frontend
- ✅ Backend handles Cashfree API securely
- ✅ Backend returns payment session to frontend

This is the **standard and secure way** to integrate Cashfree payments.

