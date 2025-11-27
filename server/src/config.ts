import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const phonePeClientId = process.env.PHONEPE_CLIENT_ID;
const phonePeClientSecret = process.env.PHONEPE_CLIENT_SECRET;
const phonePeClientVersion = process.env.PHONEPE_CLIENT_VERSION || '1';
const phonePeEnv = (process.env.PHONEPE_ENV || 'SANDBOX').toUpperCase();
const phonePeWebhookSaltKey = process.env.PHONEPE_WEBHOOK_SALT_KEY;
const phonePeWebhookSaltIndex = process.env.PHONEPE_WEBHOOK_SALT_INDEX;

// Validate required environment variables
const requiredEnvVars = [
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
  'EMAIL_HOST',
  'EMAIL_PORT',
  'EMAIL_USER',
  'EMAIL_PASSWORD',
  'EMAIL_FROM',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.warn(`Warning: Missing environment variable: ${envVar}`);
  }
}

// Export configuration
export const config = {
  // Server configuration
  port: process.env.PORT || 5002,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database configuration
  db: {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
  },
  
  // Email configuration
  email: {
    host: process.env.EMAIL_HOST!,
    port: parseInt(process.env.EMAIL_PORT!, 10),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASSWORD!,
    },
    from: process.env.EMAIL_FROM!,
  },
  
  // PhonePe configuration
  phonepe: {
    clientId: phonePeClientId,
    clientSecret: phonePeClientSecret,
    clientVersion: phonePeClientVersion,
    env: phonePeEnv,
    webhookSaltKey: phonePeWebhookSaltKey,
    webhookSaltIndex: phonePeWebhookSaltIndex,
  },
  
  // App configuration
  app: {
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:8080',
  },
  
  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
    credentials: process.env.CORS_CREDENTIALS === 'true',
  },
} as const;

export type Config = typeof config;
