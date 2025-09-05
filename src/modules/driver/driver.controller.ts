import { Request, Response, NextFunction } from "express";
import * as driverService from "./driver.service";

export const getAllDrivers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const drivers = await driverService.getAllDrivers();
    res.status(200).json({ success: true, drivers });
  } catch (error) {
    next(error);
  }
};

export const getDriverById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const driver = await driverService.getDriverById(id);
    res.status(200).json({ success: true, driver });
  } catch (error) {
    next(error);
  }
};

export const approveDriver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const driver = await driverService.approveDriver(id);
    res.status(200).json({ success: true, driver });
  } catch (error) {
    next(error);
  }
};

export const suspendDriver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const driver = await driverService.suspendDriver(id);
    res.status(200).json({ success: true, driver });
  } catch (error) {
    next(error);
  }
};

export const setAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { online } = req.body;
    const driver = await driverService.setAvailability(id, online);
    res.status(200).json({ success: true, driver });
  } catch (error) {
    next(error);
  }
};
