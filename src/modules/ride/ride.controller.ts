import { Request, Response, NextFunction } from "express";
import * as rideService from "./ride.service";

// Rider requests ride
export const requestRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pickupLocation, destination } = req.body;
    const ride = await rideService.requestRide(req.user.id, pickupLocation, destination);
    res.status(201).json({ success: true, ride });
  } catch (error) {
    next(error);
  }
};

// Rider cancels ride
export const cancelRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const ride = await rideService.cancelRide(id, req.user.id);
    res.status(200).json({ success: true, ride });
  } catch (error) {
    next(error);
  }
};

// Driver accepts ride
export const acceptRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const ride = await rideService.acceptRide(id, req.user.id);
    res.status(200).json({ success: true, ride });
  } catch (error) {
    next(error);
  }
};

// Driver updates ride status
export const updateRideStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const ride = await rideService.updateRideStatus(id, status);
    res.status(200).json({ success: true, ride });
  } catch (error) {
    next(error);
  }
};

// Rider views history
export const getRiderRides = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rides = await rideService.getRiderRides(req.user.id);
    res.status(200).json({ success: true, rides });
  } catch (error) {
    next(error);
  }
};

// Driver views history
export const getDriverRides = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rides = await rideService.getDriverRides(req.user.id);
    res.status(200).json({ success: true, rides });
  } catch (error) {
    next(error);
  }
};
