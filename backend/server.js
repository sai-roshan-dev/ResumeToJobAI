const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const resumeRoutes = require('./routes/resumeRoutes');
const authRoutes = require('./routes/authRoutes');
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

// Specific CORS configuration to allow only your frontend domain
const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend development URL
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Resume to Job AI API!');  
 });
// Define API routes

app.use('/api/resumes', resumeRoutes);
app.use('/api/auth', authRoutes);

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
