import { PrismaClient } from '@prisma/client';
import config from './index.js';

const isDev = config.nodeEnv === 'development';

// Initialize Prisma client with custom query logs in development
const prisma = new PrismaClient({
  log: isDev ? ['query', 'info', 'warn', 'error'] : ['error', 'warn'],
});

export default prisma;
