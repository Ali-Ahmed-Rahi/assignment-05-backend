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

    const { available} = req.body;
    if (typeof available !== "boolean") throw new ApiError(400, "available must be a boolean");

    const driver = await driverService.setAvailability(userId, available);
    res.status(200).json({ success: true, driver });
  } catch (err) {
    next(err);
  }
};

export const getEarnings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const earnings = await driverService.getEarnings(req.user.id);
    res.status(200).json({
      success: true,
      message: "Driver earnings fetched successfully",
      earnings,
    });
  } catch (error) {
    next(error);
  }
};