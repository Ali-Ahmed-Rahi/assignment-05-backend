import { Request, Response, NextFunction } from "express";
import * as driverService from "./driver.service";
import ApiError from "../../utils/ApiError";


// Approve driver
export const approveDriver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const driver = await driverService.approveDriver(id);
    res.status(200).json({ success: true, driver });
  } catch (error) {
    next(error);
  }
};

// Suspend driver
export const suspendDriver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const driver = await driverService.suspendDriver(id);
    res.status(200).json({ success: true, driver });
  } catch (error) {
    next(error);
  }
};

// Get all drivers
export const getAllDrivers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const drivers = await driverService.getAllDrivers();
    res.status(200).json({ success: true, drivers });
  } catch (error) {
    next(error);
  }
};

// Get driver by ID
export const getDriverById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const driver = await driverService.getDriverById(id);
    res.status(200).json({ success: true, driver });
  } catch (error) {
    next(error);
  }
};

export const setAvailability = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new ApiError(401, "Unauthorized");

    const { online } = req.body;
    if (typeof online !== "boolean") throw new ApiError(400, "online must be a boolean");

    const driver = await driverService.setAvailability(userId, online);
    res.status(200).json({ success: true, driver });
  } catch (err) {
    next(err);
  }
};

export const getEarnings = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) throw new ApiError(401, "Unauthorized");

    const result = await driverService.getEarnings(userId);
    
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}
