// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];  // Get token from Authorization header

  if (!token) {
   res.status(401).json({ status: false, message: 'Authorization token is required' });
   return;
  }

  try {
    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { user: number };
    req.body.userId = decoded.user;  // Attach userId to the request body for use in the controller
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', (error as any)?.message);
    res.status(401).json({ status: false, message: 'Invalid or expired token' });
  }
};
