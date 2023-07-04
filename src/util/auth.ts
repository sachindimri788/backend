require('dotenv').config({path:'./env/development.env'})
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
import {JwtPayload} from "jsonwebtoken"

const secretKey = process.env.SECRET_KEY;

export interface CustomRequest extends Request {
  userId?: number | string;
}

const verifyToken = (req:CustomRequest, res: Response, next: NextFunction) => {
  const bearerHeader = req.header('authorization');
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    jwt.verify(token, secretKey, (err: Error | null,decoded: JwtPayload | undefined) => {
      if (err) {
        res.status(403).json({ result: 'Invalid token' });
      } else {
        const userId = decoded?.userId;
        res.locals.userId = userId;
        next();
      }
    });
  } else {
    res.status(403).json({
      message: 'Token is not provided',
    });
  }
};

const generateToken = (user: any) => {
  const payload = { userId: user.userId }; 
  return jwt.sign(payload, secretKey); 
};

export { verifyToken, generateToken };