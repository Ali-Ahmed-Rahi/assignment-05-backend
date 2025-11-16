import { User } from "../user/user.model";
import { Driver } from "../driver/driver.model";
import { Ride } from "../ride/ride.model";
import ApiError from "../../utils/ApiError";
import mongoose from "mongoose";

export const getAllUsers = async () => {
  return await User.find({role: "rider"}).select("-password")
};


export const getAllDrivers = async (): Promise<any[]> => {
  return await Driver.find().populate("user", "name email");
};


// Get all rides
export const getAllRides = async () => {
  return await Ride.find().populate("rider", "name email").populate("driver", "user vehicleInfo approved");
};
