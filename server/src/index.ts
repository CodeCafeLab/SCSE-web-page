// src/index.ts
import express from 'express';
import cors from 'cors';
import { config } from './config';
import { initializeDatabase } from './config/database';
import otpRoutes from './routes/otp.routes';

const app = express();
const PORT = config.port || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/otp', otpRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
const startServer = async () => {
  try {
    // Initialize database connection
    await initializeDatabase();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();