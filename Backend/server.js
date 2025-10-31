import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database.js';
import experiencesRouter from './routes/experiences.js';
import bookingsRouter from './routes/bookings.js';
import promoRouter from './routes/promo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:5173', 
  'http://localhost:5174',
  'http://127.0.0.1:5500',
  'http://localhost:5500'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Highway Delite API is running' });
});

// Database connectivity check endpoint
app.get('/api/db-status', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'connected',
      message: 'Database connection successful',
      timestamp: result.rows[0].now,
      database: process.env.DB_NAME
    });
  } catch (error) {
    res.status(500).json({
      status: 'disconnected',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// API Routes
app.use('/api/experiences', experiencesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/promo', promoRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: { message: 'Route not found', status: 404 } });
});

// Database connection check on startup
async function checkDatabaseConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully');
    console.log(`📦 Database: ${process.env.DB_NAME}`);
    console.log(`🕐 Server time: ${result.rows[0].now}`);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed');
    console.error('Error:', error.message);
    console.error('\n⚠️  Please check your database configuration in .env file:');
    console.error(`   - DB_HOST: ${process.env.DB_HOST}`);
    console.error(`   - DB_PORT: ${process.env.DB_PORT}`);
    console.error(`   - DB_NAME: ${process.env.DB_NAME}`);
    console.error(`   - DB_USER: ${process.env.DB_USER}`);
    console.error('\n💡 Make sure PostgreSQL is running and credentials are correct.\n');
    return false;
  }
}

// Start server
app.listen(PORT, async () => {
  console.log('='.repeat(60));
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(60));
  
  // Check database connection
  await checkDatabaseConnection();
  
  console.log('='.repeat(60));
  console.log('📡 Available Endpoints:');
  console.log(`   - GET  http://localhost:${PORT}/api/health`);
  console.log(`   - GET  http://localhost:${PORT}/api/db-status`);
  console.log(`   - GET  http://localhost:${PORT}/api/experiences`);
  console.log(`   - GET  http://localhost:${PORT}/api/experiences/:id`);
  console.log(`   - POST http://localhost:${PORT}/api/bookings`);
  console.log(`   - POST http://localhost:${PORT}/api/promo/validate`);
  console.log('='.repeat(60));
});
