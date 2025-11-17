import { Ride } from "./ride.model";
import ApiError from "../../utils/ApiError";
import mongoose from "mongoose";
import { Driver } from "../driver/driver.model";



export const requestRide = async (riderId: string, pickupLocation: string, destinationLocation: string, fare:number ) => {
  if (!mongoose.Types.ObjectId.isValid(riderId)) throw new ApiError(400, "Invalid rider ID");
  
  const ride = await Ride.create({
    rider: riderId,
    pickupLocation,
    destinationLocation,
    fare : fare || 0 ,
    status: "requested",
  });
  
  return ride;
};



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

export const getRiderRides = async (riderId: string) => {
  const rides = await Ride.find({ rider: riderId }).populate("driver", "user approved online vehicleInfo");
  return rides;
};

