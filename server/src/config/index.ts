// src/config/index.ts
import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5002,
  nodeEnv: process.env.NODE_ENV || "development",
  db: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "suncity_enrollment",
    synchronize: process.env.NODE_ENV !== "production",
    logging: process.env.NODE_ENV !== "production",
  },
  email: {
    host: process.env.EMAIL_HOST || "",
    port: parseInt(process.env.EMAIL_PORT || "465", 10),
    secure: process.env.EMAIL_SECURE === "true",
    user: process.env.EMAIL_USER || "",
    password: process.env.EMAIL_PASSWORD || "",
    from: process.env.EMAIL_FROM || "",
  },
  phonepe: {
    clientId: process.env.PHONEPE_CLIENT_ID || "",
    clientSecret: process.env.PHONEPE_CLIENT_SECRET || "",
    clientVersion: process.env.PHONEPE_CLIENT_VERSION || "1",
    env: (process.env.PHONEPE_ENV || "SANDBOX").toUpperCase(),
    webhookSaltKey: process.env.PHONEPE_WEBHOOK_SALT_KEY || "",
    webhookSaltIndex: process.env.PHONEPE_WEBHOOK_SALT_INDEX || "",
  },
};

export default config;
