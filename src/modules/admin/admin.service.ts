import { User } from "../user/user.model";
import { Driver } from "../driver/driver.model";
import { Ride } from "../ride/ride.model";
import ApiError from "../../utils/ApiError";
import mongoose from "mongoose";

// Get all users
export const getAllUsers = async () => {
  return await User.find().select("-password");
};

// Block or unblock user
export const blockUser = async (userId: string, block: boolean) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) throw new ApiError(400, "Invalid user ID");
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  user.blocked = block;
  await user.save();
  return user;
};

// Get all drivers
export const getAllDrivers = async () => {
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
