import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from './logger';
dotenv.config()

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Connected to database");
  } catch (err) {
    logger.error(err, "Failed to connect to database");;
    process.exit(1);
  }
}

export const disconnectFromDatabase = async () => {
  await mongoose.connection.close();
  logger.info("Disconnected from database");

  return;
}