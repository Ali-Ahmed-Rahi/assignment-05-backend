import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { registerSchema, loginSchema } from "./auth.schema";
import { ZodError } from "zod";
import { User } from "../user/user.model";
import ApiError from "../../utils/ApiError";
import { Driver } from "../driver/driver.model";
import jwt from "jsonwebtoken";

// ---------------- REGISTER ----------------
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedData = registerSchema.parse(req.body);
    const { name, email, password, role } = parsedData;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(400, "User already exists");

    const user = await User.create(parsedData);

    if (role === "driver") {
      await Driver.create({
        user: user._id,
        name: user.name,
        approved: false,
        online: false,
        vehicleInfo: "",
      });
    }

    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// ---------------- LOGIN ----------------
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    loginSchema.parse(req.body);

    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);

    if (!token) throw new ApiError(500, "Failed to generate token");

    // Set cookie (cross-site safe)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,      
      sameSite: "none",   
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    next(error);
  }
};

// ---------------- LOGOUT ----------------
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// ---------------- GET ME ----------------
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    res.status(200).json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
