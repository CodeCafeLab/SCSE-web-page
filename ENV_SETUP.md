# Environment Variables Setup

The Cashfree-specific instructions have been removed. PhonePe credentials are not required yet because the new payment flow is still being built.

Create a `.env` file in the root directory with the common variables that are still needed today:

```env
# Server Configuration
PORT=5002
NODE_ENV=development

# Frontend URLs
APP_URL=http://localhost:8080
VITE_API_BASE_URL=http://localhost:8080
VITE_API_URL=http://localhost:5002

# Email / Database secrets
EMAIL_HOST=...
EMAIL_PORT=...
EMAIL_USER=...
EMAIL_PASSWORD=...
EMAIL_FROM=...
DB_HOST=...
DB_PORT=...
DB_USERNAME=...
DB_PASSWORD=...
DB_NAME=...

# PhonePe sandbox credentials
PHONEPE_ENV=SANDBOX
PHONEPE_CLIENT_ID=M23GUHJ84OK0Y_2511271235
PHONEPE_CLIENT_SECRET=NTRjZTRlM2ItMWRhZS00ZDk0LTkyY2EtN2ZkZDUyYTg5ODhm
PHONEPE_CLIENT_VERSION=1
```

> These are the sandbox credentials shared by PhonePe. When you move to production, switch `PHONEPE_ENV=PRODUCTION` and replace the client ID/secret with the live pair.

