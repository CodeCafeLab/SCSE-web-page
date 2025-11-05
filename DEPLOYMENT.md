# Production Deployment Guide

## Deployment to https://dos.suncitysolar.in/

This guide covers deploying the application to the production domain.

### Prerequisites

1. Server/hosting setup with Node.js support
2. Domain configured: `https://dos.suncitysolar.in/`
3. SSL certificate (HTTPS required for Cashfree)
4. Cashfree Production credentials

### Environment Variables for Production

Create a `.env` file on your production server:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Production Domain - IMPORTANT
APP_URL=https://dos.suncitysolar.in
VITE_APP_URL=https://dos.suncitysolar.in
VITE_API_URL=https://dos.suncitysolar.in/api

# Cashfree Payment Gateway - Production Credentials
CASHFREE_APP_ID=your_production_app_id
CASHFREE_SECRET_KEY=your_production_secret_key
CASHFREE_API_URL=https://api.cashfree.com/pg/orders
```

### Deployment Options

#### Option 1: Same Server (Recommended for Small Scale)

Both frontend and backend on the same server:

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Start the backend server:**
   ```bash
   npm run server
   ```
   Or use PM2 for process management:
   ```bash
   pm2 start server/index.ts --name "suncity-api" --interpreter tsx
   ```

3. **Configure Nginx reverse proxy:**

   ```nginx
   server {
       listen 80;
       server_name dos.suncitysolar.in;
       
       # Redirect HTTP to HTTPS
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name dos.suncitysolar.in;

       ssl_certificate /path/to/ssl/cert.pem;
       ssl_certificate_key /path/to/ssl/key.pem;

       # Frontend - Serve static files
       location / {
           root /path/to/suncity-enroll-flow/dist;
           try_files $uri $uri/ /index.html;
       }

       # Backend API - Proxy to Express server
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

#### Option 2: Separate Servers

Frontend and backend on different servers:

1. **Frontend Server (Static Hosting):**
   - Build: `npm run build`
   - Deploy `dist/` folder to static hosting (Vercel, Netlify, etc.)
   - Update `VITE_API_URL` in build to point to backend API

2. **Backend Server:**
   - Deploy backend code to server
   - Configure CORS to allow requests from `https://dos.suncitysolar.in`
   - Update `APP_URL` to `https://dos.suncitysolar.in`
   - Start server with PM2 or similar

### Cashfree Webhook Configuration

1. Go to Cashfree Dashboard → Settings → Webhooks
2. Add webhook URL: `https://dos.suncitysolar.in/api/payment/webhook`
3. Select events: `PAYMENT_SUCCESS`, `PAYMENT_FAILED`, `PAYMENT_PENDING`
4. Save the webhook configuration

### Testing Production Deployment

1. **Test enrollment flow:**
   - Visit https://dos.suncitysolar.in/
   - Fill enrollment form
   - Submit application
   - Verify payment page opens

2. **Test payment callback:**
   - Complete test payment
   - Verify redirect to callback page
   - Check payment status display

3. **Test webhook:**
   - Check server logs for webhook calls
   - Verify webhook endpoint responds correctly

### Important Security Notes

1. **Never expose `.env` file:**
   - Ensure `.env` is in `.gitignore`
   - Use environment variables on hosting platform
   - Restrict file permissions: `chmod 600 .env`

2. **HTTPS Required:**
   - Cashfree requires HTTPS for production
   - Ensure SSL certificate is valid
   - Use secure headers

3. **API Security:**
   - Implement webhook signature verification
   - Use rate limiting
   - Monitor for suspicious activity

### Monitoring

1. **Logs:**
   - Monitor server logs for errors
   - Track payment success/failure rates
   - Monitor API response times

2. **Cashfree Dashboard:**
   - Monitor transactions
   - Check webhook delivery status
   - Review failed payments

### Troubleshooting

**Payment not opening:**
- Check browser console for errors
- Verify Cashfree credentials are correct
- Ensure `APP_URL` is set correctly

**Webhook not receiving:**
- Verify webhook URL in Cashfree dashboard
- Check server logs
- Ensure backend is accessible from internet
- Check firewall/security group settings

**CORS errors:**
- Update CORS configuration in `server/index.ts`
- Ensure frontend domain is whitelisted

### Rollback Plan

1. Keep previous version deployed
2. Have database backups
3. Document configuration changes
4. Test rollback procedure

