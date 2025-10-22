import { User } from "../user/user.model";
import { Driver } from "../driver/driver.model";
import { Ride } from "../ride/ride.model";
import ApiError from "../../utils/ApiError";
import mongoose from "mongoose";

export const getAllUsers = async () => {
  return await User.find({role: "rider"}).select("-password")
};


export const getAllDrivers = async (): Promise<any[]> => {
  return await Driver.find().populate("user", "name email role blocked approved online vehicleInfo");
};

// Approve or suspend driver
export const approveDriver = async (driverId: string, approve: boolean) => {
  const driver = await Driver.findById(driverId);
  if (!driver) throw new ApiError(404, "Driver not found");
  driver.approved = approve;
  await driver.save();
  return driver;
};

// Get all rides
export const getAllRides = async () => {
  return await Ride.find().populate("rider", "name email").populate("driver", "user vehicleInfo approved");
};
