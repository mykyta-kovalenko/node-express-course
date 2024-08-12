import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import errorHandlerMiddleware from './middleware/error-handler-middleware.js';
import notFoundMiddleware from './middleware/not-found-middleware.js';
import authRouter from './routes/auth-router.js';

const app = express();

app.use(express.json());

app.use('/api/v1', authRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
