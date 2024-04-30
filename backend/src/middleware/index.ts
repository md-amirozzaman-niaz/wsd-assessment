import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error("🚫 Un-Authorized 🚫");
  }

  try {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET as any);
  } catch (err: any) {
    res.status(401);
    if (err.name === "TokenExpiredError") {
      throw new Error(err.name);
    }
    throw new Error("🚫 Un-Authorized 🚫");
  }

  next();
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  /* eslint-enable no-unused-vars */
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    // stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}
