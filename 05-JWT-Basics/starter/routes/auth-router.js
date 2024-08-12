import express from 'express';
import { dashboard, login } from '../controllers/auth-controller.js';
import authMiddleware from '../middleware/auth-middleware.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.get('/dashboard', authMiddleware, dashboard);

export default authRouter;
