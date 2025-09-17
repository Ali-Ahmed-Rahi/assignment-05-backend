import { Ride } from "./ride.model";

import ApiError from "../../utils/ApiError";
import mongoose from "mongoose";

// Rider requests a ride
export const requestRide = async (riderId: string, pickupLocation: string, dropoffLocation: string) => {
  if (!mongoose.Types.ObjectId.isValid(riderId)) throw new ApiError(400, "Invalid rider ID");

  const ride = await Ride.create({
    rider: riderId,
    pickupLocation,
    dropoffLocation,
    status: "requested",
  });

  return ride;
};

// Rider cancels a ride (only if not accepted)
export const cancelRide = async (rideId: string, riderId: string) => {
  if (!mongoose.Types.ObjectId.isValid(rideId)) throw new ApiError(400, "Invalid ride ID");
  const ride = await Ride.findById(rideId);
  if (!ride) throw new ApiError(404, "Ride not found");
  if (ride.rider.toString() !== riderId) throw new ApiError(403, "You cannot cancel this ride");
  if (ride.status !== "requested") throw new ApiError(400, "Cannot cancel ride after driver accepts");
  ride.status = "cancelled";
  await ride.save();
  return ride;
};

// Driver accepts a ride
export const acceptRide = async (rideId: string, driverId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new ApiError(404, "Ride not found");
  if (ride.status !== "requested") throw new ApiError(400, "Ride already accepted or in progress");
  ride.driver = driverId;
  ride.status = "accepted";
  await ride.save();
  return ride;
};

// Update ride status (Driver only)
export const updateRideStatus = async (rideId: string, status: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new ApiError(404, "Ride not found");

  const allowedTransitions: Record<string, string[]> = {
    requested: ["accepted", "cancelled"],
    accepted: ["in-progress", "cancelled"],
    "in-progress": ["completed", "cancelled"],
    completed: [],
    cancelled: [],
  };

  if (!allowedTransitions[ride.status].includes(status)) {
    throw new ApiError(400, "Invalid status update");
  }

  ride.status = status as any;
  await ride.save();
  return ride;
};

// Get ride history for rider
export const getRiderRides = async (riderId: string) => {
  const rides = await Ride.find({ rider: riderId }).populate("driver", "user approved online vehicleInfo");
  return rides;
};

// Get ride history for driver
export const getDriverRides = async (driverId: string) => {
  const rides = await Ride.find({ driver: driverId }).populate("rider", "name email");
  return rides;
};


// get all rides (admin)
export const getAllRides = async () => {
  const rides = await Ride.find()
    .populate("rider", "name email")
    .populate("driver", "name email vehicleNo");

  return rides;
};
