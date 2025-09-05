import { Driver } from "./driver.model";
import ApiError from "../../utils/ApiError";
import mongoose from "mongoose";

export const getAllDrivers = async () => {
  return await Driver.find().populate("user", "name email role blocked");
};

export const getDriverById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid driver ID");
  const driver = await Driver.findById(id).populate("user", "name email role blocked");
  if (!driver) throw new ApiError(404, "Driver not found");
  return driver;
};

export const approveDriver = async (id: string) => {
  const driver = await getDriverById(id);
  driver.approved = true;
  await driver.save();
  return driver;
};

export const suspendDriver = async (id: string) => {
  const driver = await getDriverById(id);
  driver.approved = false;
  await driver.save();
  return driver;
};

export const setAvailability = async (id: string, online: boolean) => {
  const driver = await getDriverById(id);
  driver.online = online;
  await driver.save();
  return driver;
};
