import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRouter from './routes/payment.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Configure CORS to allow production domain
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://dos.suncitysolar.in', 'https://www.dos.suncitysolar.in']
    : ['http://localhost:8080', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api/payment', paymentRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}/api`);
});

