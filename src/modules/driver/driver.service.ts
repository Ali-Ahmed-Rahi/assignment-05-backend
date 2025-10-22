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

export const getEarnings = async (driverId: string) => {
  const driver = await Driver.findById(driverId);
  if (!driver) throw new ApiError(404, "Driver not found");

  const completedRides = await Ride.find({ driver: driverId, status: "completed" });
  const totalEarnings = completedRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);

  return {
    totalEarnings,
    rideCount: completedRides.length,
    rides: completedRides,
  };
};