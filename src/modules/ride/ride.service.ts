import { Ride } from "./ride.model";
import ApiError from "../../utils/ApiError";
import mongoose from "mongoose";
import { Driver } from "../driver/driver.model";



export const requestRide = async (riderId: string, pickupLocation: string, destinationLocation: string) => {
  if (!mongoose.Types.ObjectId.isValid(riderId)) throw new ApiError(400, "Invalid rider ID");

  const ride = await Ride.create({
    rider: riderId,
    pickupLocation,
    destinationLocation,
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


// Driver accepts a ride
export const acceptRide = async (rideId: string, driverId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new ApiError(404, "Ride not found");

  if (ride.status !== "requested") {
    throw new ApiError(400, "Ride already accepted or in progress")
  };
  ride.driver = driverId;
  ride.status = "accepted";
  await ride.save();
  return ride;
};


export const rejectRide = async (rideId: string, driverId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new ApiError(404, "Ride not found");
  }
  if (!ride.driver||ride.driver.toString() !== driverId) {
    throw new ApiError(403, "You are not authorized to reject this ride");
  }


  // Ride must be in requested or accepted stage
  if (!["requested", "accepted"].includes(ride.status)) {
    throw new ApiError(400, "Ride cannot be rejected at this stage");
  }

  ride.status = "rejected";
  await ride.save();

  return ride;
};



export const updateRideStatus = async (rideId: string, status: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new ApiError(404, "Ride not found");

const allowedTransitions: Record<string, string[]> = {
  requested: ["accepted", "cancelled", "rejected"],
  accepted: ["picked_up", "cancelled"],          
  picked_up: ["in_transit"],                       
  in_transit: ["completed", "cancelled"],         
  completed: [],                                   
  cancelled: [],                                    
  rejected: [],                                     
};


  if (!allowedTransitions[ride.status].includes(status)) {
    throw new ApiError(400, "Invalid status update");
  }

  ride.status = status as any;
  await ride.save();
  return ride;
};




export const getRiderRides = async (riderId: string) => {
  const rides = await Ride.find({ rider: riderId }).populate("driver", "user approved online vehicleInfo");
  return rides;
};


export const getDriverRides = async (driverId: string) => {
  const rides = await Ride.find({ driver: driverId }).populate("rider", "name email");
  return rides;
};


export const completeRide = async (rideId: string) => {
  const ride = await Ride.findById(rideId);
  if (!ride) throw new ApiError(404, "Ride not found");

  if (ride.status === "completed") {
    throw new ApiError(400, "Ride already completed");
  }

  // Example fare calculation
  const baseFare = 50;
  const perKmRate = 10;
  const distance = ride.distance || 0;

  ride.fare = baseFare + distance * perKmRate;
  ride.status = "completed";
  await ride.save();

  // Update driver earnings
  const driver = await Driver.findById(ride.driver);
  if (driver) {
    driver.earnings += ride.fare;
    await driver.save();
  }

  return ride;
};

