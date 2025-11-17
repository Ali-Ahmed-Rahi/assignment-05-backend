import { Driver, IDriver } from "./driver.model";
import ApiError from "../../utils/ApiError";
import mongoose from "mongoose";
import { Ride } from "../ride/ride.model";

export const getAllDrivers = async (): Promise<IDriver[]> => {
  return await Driver.find().populate("user", "name email role blocked");
};

export const getDriverById = async (id: string): Promise<IDriver> => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid driver ID");
  const driver = await Driver.findById(id).populate("user", "name email role blocked");
  if (!driver) throw new ApiError(404, "Driver not found");
  return driver;
};

export const approveDriver = async (id: string): Promise<IDriver> => {
  const driver = await getDriverById(id);
  driver.approved = true;
  await driver.save();
  return driver;
};

// Suspend driver
export const suspendDriver = async (id: string): Promise<IDriver> => {
  const driver = await getDriverById(id);
  driver.approved = false;
  await driver.save();
  return driver;
};
export const setAvailability = async (userId: string, online: boolean) => {
  const driver = await Driver.findOne({ user: userId });

  if (!driver) throw new ApiError(404, "Driver not found");

  if (!driver.approved) throw new ApiError(403, "Driver not approved");

  driver.online = online;
  await driver.save();
  return driver;
};

export const getEarnings = async (userId: string) => {
  const driver = await Driver.findOne({user:userId});
  if (!driver) throw new ApiError(404, "Driver not found");

  const completedRides = await Ride.find({ driver: driver._Id, status: "completed" }).populate("rider", "name email");
  const totalEarnings = completedRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);

  return {
    driverId: driver._id,
    totalEarnings,
    rideCount: completedRides.length,
    rides: completedRides,
  };
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


export const getDriverRides = async (driverId: string) => {
  const rides = await Driver.find({ driver: driverId }).populate("rider", "name email");
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

