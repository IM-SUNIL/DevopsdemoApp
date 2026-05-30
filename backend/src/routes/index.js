import express from 'express';
import taskRoutes from './taskRoutes.js';

const router = express.Router();

// Health Check Endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Mounting task routes under /tasks
router.use('/tasks', taskRoutes);

export default router;
