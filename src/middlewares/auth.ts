import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    // Check token in cookies OR in Authorization header
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new ApiError(401, "Unauthorized - No token provided"));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    if (!decoded) {
      return next(new ApiError(401, "Invalid token"));
    }

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};


//Role-based authorization
export const authorize =
  (...roles: string[]) =>
  (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Forbidden"));
    }
    next();
  };
