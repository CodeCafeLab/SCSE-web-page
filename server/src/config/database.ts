import { DataSource } from 'typeorm';
import { config } from '../config';
import { User } from '../models/user.model';
import { OTP } from '../models/otp.model';
import { Enrollment } from '../models/enrollment.model';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: config.db.synchronize,
  logging: config.db.logging,
  entities: [User, OTP, Enrollment],
  migrations: [],
  subscribers: [],
  timezone: 'Z', // Use UTC timezone
  extra: {
    connectionLimit: 10,
  },
  // This is important for MySQL 5.7+
  // It tells TypeORM to use the legacy DATETIME type which has better compatibility
  // with MySQL's timestamp handling
  dateStrings: ['TIMESTAMP', 'DATETIME'],
  supportBigNumbers: true,
  bigNumberStrings: false,
  charset: 'utf8mb4',
});

// Initialize the database connection
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    // No console.log here - we'll handle the message in the server startup
    return true;
  } catch (error) {
    console.error('Database connection failed');
    console.error(error);
    process.exit(1);
  }
};
