import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { registerSchema, loginSchema } from "./auth.schema";
import { ZodError } from "zod";
import { User } from "../user/user.model";
import ApiError from "../../utils/ApiError";
import bcrypt from "bcryptjs";
import { Driver } from "../driver/driver.model";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //  Validate incoming data
    const parsedData = registerSchema.parse(req.body);

    const { name, email, password, role } = parsedData;
    console.log(parsedData);

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(400, "User already exists"); 

    // // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    // Create user
    const user = await User.create(parsedData);
    // console.log(user);

    // Auto-create driver document if role === 'driver'
    if (role === "driver") {
      await Driver.create({
        user: user._id,
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

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.role || req.body.role !== "admin") {
      loginSchema.parse(req.body); // validation only for rider/driver
    }

    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    next(error);
  }
};
