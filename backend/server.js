/* --- File: backend/server.cjs --- */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const resumeRoutes = require('./routes/resumeRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the new auth routes
const errorHandler = require('./middleware/errorHandler');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware (Helmet)
app.use(helmet());

// Rate Limiting Middleware
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
});
app.use('/api/', apiLimiter);

// Middleware
app.use(express.json());
app.use(cors());

// Define API routes
app.use('/api/resumes', resumeRoutes);
app.use('/api/auth', authRoutes); // Use the new auth routes

// Global Error Handler (must be the last middleware)
app.use(errorHandler);

// Export the app instance for testing
module.exports = app;

// Start the server only if the file is run directly
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
