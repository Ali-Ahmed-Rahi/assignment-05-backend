import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ success: false, message });
};
