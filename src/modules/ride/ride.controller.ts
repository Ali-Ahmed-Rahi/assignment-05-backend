import { Request, Response, NextFunction } from "express";
import * as rideService from "./ride.service";
import ApiError from "../../utils/ApiError";

// Rider requests ride
export const requestRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new ApiError(401, "Unauthorized: user not found")
      const riderId = req.user.id; 
    const { pickupLocation, destinationLocation ,fare } = req.body;
    
    const ride = await rideService.requestRide(riderId, pickupLocation, destinationLocation,fare);
    
    res.status(201).json({ success: true, ride });
  } catch (error) {
    next(error);
  }
};

// Rider cancels ride
export const cancelRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new ApiError(401, "Unauthorized: user not found")
      const { id } = req.params;
    const ride = await rideService.cancelRide(id, req.user.id);
    res.status(200).json({ success: true, ride });
  } catch (error) {
    next(error);
  }
};

// Rider views history
export const getRiderRides = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new ApiError(401, "Unauthorized: user not found")
    const rides = await rideService.getRiderRides(req.user.id);
    res.status(200).json({ success: true, rides });
  } catch (error) {
    next(error);
  }
};
