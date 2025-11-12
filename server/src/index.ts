import express from 'express';
import cors from 'cors';
import { config } from './config';
import { initializeDatabase } from './config/database';
import otpRoutes from './routes/otp.routes';
import paymentRoutes from './routes/payment.routes';

const app = express();
const PORT = config.port || 5000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:8080',
  'https://dos.suncitysolar.in',
  'https://www.dos.suncitysolar.in'
];

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/otp', otpRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
async function startServer() {
  try {
    // Initialize database
    await initializeDatabase();
    console.log('Database connection established successfully\n');
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on: http://localhost:${PORT}\n`);
    });
  } catch (error) {
    process.exit(1);
  }
}

// Start the server
startServer();