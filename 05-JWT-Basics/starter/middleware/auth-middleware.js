import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import CustomAPIError from '../errors/custom-error.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError(
      'Not authorized to access this route',
      StatusCodes.UNAUTHORIZED
    );
  }
};

export default authMiddleware;
