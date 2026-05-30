/**
 * Custom request logging middleware
 */
const logger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[API Request] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} (${duration}ms)`
    );
  });
  
  next();
};

export default logger;
