# .env Configuration Guide

Cashfree settings are obsolete. Use this template for the remaining services until PhonePe integration lands.

```env
# Frontend URLs
APP_URL=http://localhost:8080
VITE_API_BASE_URL=http://localhost:8080
VITE_API_URL=http://localhost:5002

# Backend server
PORT=5002
NODE_ENV=development

# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=secret
DB_NAME=suncity_enrollment

# Email (update to your provider)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=no-reply@example.com
EMAIL_PASSWORD=super-secret
EMAIL_FROM="SunCity <no-reply@example.com>"
```

> PhonePe-specific keys will be added here once available. Delete any `CASHFREE_*` or `VITE_CASHFREE_*` variables still lingering in your environment files.

