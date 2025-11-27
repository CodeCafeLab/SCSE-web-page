# ✅ .env File Configuration - Current State

PhonePe integration is still being built, so only the common infrastructure settings are required. Remove every `CASHFREE_*` or `VITE_CASHFREE_*` variable from your environment files.

## Recommended `.env`

```env
APP_URL=http://localhost:8080
VITE_API_BASE_URL=http://localhost:8080
VITE_API_URL=http://localhost:5002
PORT=5002
NODE_ENV=development

# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=secret
DB_NAME=suncity_enrollment

# Email
EMAIL_HOST=smtp.example.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=no-reply@example.com
EMAIL_PASSWORD=super-secret
EMAIL_FROM="SunCity <no-reply@example.com>"
```

## Next steps

1. Start the backend: `cd server && npm install && npm run start`.
2. Start the frontend: `npm install && npm run dev`.
3. Wait for PhonePe API docs—once available we'll list the new payment variables here.

