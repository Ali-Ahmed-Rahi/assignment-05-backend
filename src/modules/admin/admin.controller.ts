import { Request, Response, NextFunction } from "express";
import * as adminService from "./admin.service";

// Users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

export const blockUnblockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { blocked } = req.body;
    const user = await adminService.blockUser(id, blocked);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Drivers
export const getDrivers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const drivers = await adminService.getAllDrivers();
    res.status(200).json({ success: true, drivers });
  } catch (error) {
    next(error);
  }
};

export const approveSuspendDriver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { approve } = req.body;
    const driver = await adminService.approveDriver(id, approve);
    res.status(200).json({ success: true, driver });
  } catch (error) {
    next(error);
  }
};

// Rides
export const getRides = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rides = await adminService.getAllRides();
    res.status(200).json({ success: true, rides });
  } catch (error) {
    next(error);
  }
};
