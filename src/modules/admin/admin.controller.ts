import { Request, Response, NextFunction } from "express";
import * as adminService from "./admin.service";


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};



export const getDrivers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const drivers = await adminService.getAllDrivers();
    res.status(200).json({ success: true, drivers });
  } catch (error) {
    next(error);
  }
};

export const getRides = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rides = await adminService.getAllRides();
    res.status(200).json({ success: true, rides });
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




