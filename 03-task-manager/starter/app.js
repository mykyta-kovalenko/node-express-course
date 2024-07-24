import dotenv from 'dotenv';
import express from 'express';
import './db/connect.js';
import { connectDB } from './db/connect.js';
import tasksRouter from './routes/tasks-router.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/api/v1/tasks', tasksRouter);
app.get('/hello', (req, res) => {
  res.send('Task Manager App');
});

app.all('*', (req, res) => {
  res.status(404).send('Resource not found');
});

const port = 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log('Server is running on port 3000'));
  } catch (error) {
    console.error(error);
  }
};

start();
