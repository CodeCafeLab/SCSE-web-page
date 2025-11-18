# Nginx Configuration for Video Files

## Problem
Videos are not loading on `https://dos.suncitysolar.in/JitendraPatel17Nov.mp4`

## Solution: Update Nginx Configuration

Add this to your Nginx configuration file for `dos.suncitysolar.in`:

```nginx
server {
    listen 443 ssl http2;
    server_name dos.suncitysolar.in;

    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;

    # Frontend - Serve static files
    location / {
        root /var/www/SCSE-web-page/suncity-enroll-flow/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
        
        # Enable video streaming
        add_header Accept-Ranges bytes;
        
        # Set proper MIME types for videos
        location ~* \.(mp4|webm|ogg)$ {
            root /var/www/SCSE-web-page/suncity-enroll-flow/dist;
            add_header Content-Type video/mp4;
            add_header Accept-Ranges bytes;
            add_header Cache-Control "public, max-age=31536000";
            # Enable range requests for video seeking
            max_ranges 0;
        }
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Alternative: Simpler Configuration

If the above doesn't work, try this simpler version:

```nginx
server {
    listen 443 ssl http2;
    server_name dos.suncitysolar.in;

    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;

    root /var/www/SCSE-web-page/suncity-enroll-flow/dist;
    index index.html;

    # Serve video files with proper headers
    location ~* \.(mp4|webm|ogg)$ {
        add_header Content-Type video/mp4;
        add_header Accept-Ranges bytes;
        add_header Cache-Control "public, max-age=31536000";
        expires 1y;
    }

    # Frontend - React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Steps to Apply:

1. **SSH into your server:**
   ```bash
   ssh user@your-server
   ```

2. **Edit Nginx config:**
   ```bash
   sudo nano /etc/nginx/sites-available/dos.suncitysolar.in
   # or
   sudo nano /etc/nginx/nginx.conf
   ```

3. **Add the video configuration** (use one of the configs above)

4. **Test Nginx configuration:**
   ```bash
   sudo nginx -t
   ```

5. **Reload Nginx:**
   ```bash
   sudo systemctl reload nginx
   ```

6. **Verify videos are in dist folder on server:**
   ```bash
   ls -lh /var/www/SCSE-web-page/suncity-enroll-flow/dist/*.mp4
   ```

7. **Test the video URL:**
   - Open: `https://dos.suncitysolar.in/JitendraPatel17Nov.mp4`
   - Should play directly in browser

## Troubleshooting:

If videos still don't work:

1. **Check file permissions:**
   ```bash
   sudo chmod 644 /var/www/SCSE-web-page/suncity-enroll-flow/dist/*.mp4
   sudo chown www-data:www-data /var/www/SCSE-web-page/suncity-enroll-flow/dist/*.mp4
   ```

2. **Check Nginx error logs:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

3. **Check if files exist:**
   ```bash
   ls -la /var/www/SCSE-web-page/suncity-enroll-flow/dist/ | grep mp4
   ```

4. **Test with curl:**
   ```bash
   curl -I https://dos.suncitysolar.in/JitendraPatel17Nov.mp4
   ```
   Should return `Content-Type: video/mp4` and `200 OK`

