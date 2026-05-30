import config from '../config/index.js';

/**
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  const response = {
    message: err.message || 'Internal Server Error',
    stack: config.nodeEnv === 'development' ? err.stack : undefined,
  };

  // Log error stack for debugging
  console.error(`[Error Handler] ${err.message}`, err.stack);

  res.status(statusCode).json(response);
};

export default errorHandler;
