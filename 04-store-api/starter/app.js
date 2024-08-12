import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import { connectDB } from './db/connect.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import productsRouter from './routes/products-router.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/v1/products', productsRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.error(error);
  }
};

start();
