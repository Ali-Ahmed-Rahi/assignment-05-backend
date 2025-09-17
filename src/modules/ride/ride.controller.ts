import { Request, Response, NextFunction } from "express";
import * as rideService from "./ride.service";
import ApiError from "../../utils/ApiError";

// Rider requests ride
export const requestRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new ApiError(401, "Unauthorized: user not found")
    const riderId = req.user.id; 
    const { pickupLocation, dropoffLocation } = req.body;

    const ride = await rideService.requestRide(riderId, pickupLocation, dropoffLocation);

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

// Driver accepts ride
export const acceptRide = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new ApiError(401, "Unauthorized: user not found")
    const { id } = req.params;
    const ride = await rideService.acceptRide(id, req.user.id);
    res.status(200).json({ success: true, ride,massage:"Ride Accept" });
  } catch (error) {
    next(error);
  }
};


// Driver rejects a ride
export const rejectRide = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const ride = await rideService.rejectRide(id, req.user.id);

    res.status(200).json({
      success: true,
      message: "Ride rejected successfully",
      ride,
    });
  } catch (error) {
    next(error);
  }
};

// Driver updates ride status
export const updateRideStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new ApiError(401, "Unauthorized: user not found")
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
    if (!req.user) throw new ApiError(401, "Unauthorized: user not found")
    const rides = await rideService.getRiderRides(req.user.id);
    res.status(200).json({ success: true, rides });
  } catch (error) {
    next(error);
  }
};

// Driver views history
export const getDriverRides = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new ApiError(401, "Unauthorized: user not found")
    const rides = await rideService.getDriverRides(req.user.id);
    res.status(200).json({ success: true, rides });
  } catch (error) {
    next(error);
  }
};

//  get all rides 
export const getAllRides = async(req: Request, res: Response) => {
  const rides = await rideService.getAllRides();

  res.status(200).json({
    success: true,
    message: "All rides fetched successfully",
    data: rides,
  });
};
