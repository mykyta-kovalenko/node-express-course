import dotenv from 'dotenv';
import express from 'express';
import './db/connect.js';
import { connectDB } from './db/connect.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import tasksRouter from './routes/tasks-router.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/api/v1/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log('Server is running on port 3000'));
  } catch (error) {
    console.error(error);
  }
};

start();
