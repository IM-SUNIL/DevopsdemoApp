import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config/index.js';
import customLogger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';

const app = express();

// Set HTTP security headers
app.use(helmet());

// Enable CORS
app.use(cors({
  origin: config.frontendUrl,
  optionsSuccessStatus: 200,
}));

// Request Logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}
app.use(customLogger);

// Parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root API Greeting
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Task Manager API Workspace',
    documentation: 'See /api/health for system status, and endpoints under /api/tasks',
  });
});

// API Root Router
app.use('/api', apiRouter);

// Fallback for undefined endpoints
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

// Global Error Handler
app.use(errorHandler);

export default app;
