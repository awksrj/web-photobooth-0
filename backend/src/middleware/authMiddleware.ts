import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string; // you can add more fields depending on what you store in the token
  email: string;
  accName: string;
}

// Extend Express Request to include `user`
declare module 'express-serve-static-core' {
  interface Request {
    user?: string | JwtPayload;
  }
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: "Access Denied - No token provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = verified;
    next();
  } catch {
    res.status(400).send("Invalid Token");
  }
}
