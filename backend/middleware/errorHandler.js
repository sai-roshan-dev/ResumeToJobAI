const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the full error stack for debugging
    
    // Check if the error is a known operational error
    if (res.headersSent) {
        return next(err);
    }
    
    // Send a generic 500 Internal Server Error
    res.status(500).json({
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
    });
};

module.exports = errorHandler;