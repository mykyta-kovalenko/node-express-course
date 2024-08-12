import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import CustomAPIError from '../errors/custom-error.js';

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError(
      'Please provide name and password',
      StatusCodes.BAD_REQUEST
    );
  }

  // Mock id
  const id = new Date().getMilliseconds();

  const token = jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  res.status(StatusCodes.OK).json({ token });
};

const dashboard = async (req, res) => {
  res.status(StatusCodes.OK).json({
    msg: `Hello, ${req.user.username}`,
    data: `Authorized Data: ${req.user.id}`,
  });
};

export { dashboard, login };
