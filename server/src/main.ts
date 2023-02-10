import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectToDatabase, disconnectFromDatabase } from './utils/database';
import logger from './utils/logger';
import { CORS_ORIGIN } from './constants';
import helmet from 'helmet';

const PORT = process.env.PORT || 4001;

const app = express();

// App middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(helmet());

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server listening at http://localhost:${PORT}`);
})

// Signals to perform graceful shutdown of server
const signals = ["SIGTERM", "SIGINT"];

/**
 * Function to disconnect from database and perform graceful shutdown of server
 * @param signal 
 */
const gracefulShutdown = (signal: string) => {
  process.on(signal, async () => {
    logger.info(`Got signal: ${signal}`);
    server.close();

    // disconnect from database
    await disconnectFromDatabase();

    logger.info('Shutdown complete');
    process.exit(0);
  })
}

signals.forEach(signal => {
  gracefulShutdown(signal);
})