import express from 'express';
import cors from 'cors';
import { config } from './config';
import { initializeDatabase } from './config/database';
import otpRoutes from './routes/otp.routes';
import paymentRoutes from './routes/payment.routes';

const app = express();
const PORT = config.port || 5000;

// CORS configuration - Allow both www and non-www versions
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:3000',
  'https://dos.suncitysolar.in',
  'https://www.dos.suncitysolar.in'
];

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in the allowed list
    if (allowedOrigins.indexOf(origin) === -1) {
      console.warn(`CORS blocked for origin: ${origin}`);
      // In production, you might want to be more strict
      if (process.env.NODE_ENV === 'production') {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      // In development, allow it
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Pre-flight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/otp', otpRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

// API health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    cashfreeConfigured: !!(config.cashfree?.clientId && config.cashfree?.clientSecret)
  });
});

// Error handling middleware - must be last
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  
  res.status(err.status || 500).json({ 
    success: false, 
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found',
    path: req.path
  });
});

// Start server
async function startServer() {
  try {
    // Initialize database (make it non-blocking for payment APIs)
    try {
      await initializeDatabase();
      console.log('Database connection established successfully\n');
    } catch (dbError) {
      console.error('Database connection failed, but continuing server startup...');
      console.error('Note: Some features may not work without database connection');
      // Don't exit - allow server to start for payment APIs
    }
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`\n✅ Server is running on: http://localhost:${PORT}`);
      console.log(`Environment: ${config.nodeEnv}`);
      console.log(`Cashfree Mode: ${config.cashfree?.env || 'NOT CONFIGURED'}`);
      console.log(`Allowed Origins: ${allowedOrigins.join(', ')}\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();