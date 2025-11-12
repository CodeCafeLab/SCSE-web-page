import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

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
  'CASHFREE_CLIENT_ID',
  'CASHFREE_CLIENT_SECRET',
  'FRONTEND_URL',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Export configuration
export const config = {
  // Server configuration
  port: process.env.PORT || 5000,
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
  
  // Cashfree configuration
  cashfree: {
    clientId: process.env.CASHFREE_CLIENT_ID!,
    clientSecret: process.env.CASHFREE_CLIENT_SECRET!,
    env: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'SANDBOX',
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
