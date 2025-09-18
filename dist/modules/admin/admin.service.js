"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRides = exports.approveDriver = exports.getAllDrivers = exports.blockUser = exports.getAllUsers = void 0;
const user_model_1 = require("../user/user.model");
const driver_model_1 = require("../driver/driver.model");
const ride_model_1 = require("../ride/ride.model");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const mongoose_1 = __importDefault(require("mongoose"));
// Get all users
const getAllUsers = async () => {
    return await user_model_1.User.find().select("-password");
};
exports.getAllUsers = getAllUsers;
// Block or unblock user
const blockUser = async (userId, block) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(userId))
        throw new ApiError_1.default(400, "Invalid user ID");
    const user = await user_model_1.User.findById(userId);
    if (!user)
        throw new ApiError_1.default(404, "User not found");
    user.blocked = block;
    await user.save();
    return user;
};
exports.blockUser = blockUser;
// Get all drivers
const getAllDrivers = async () => {
    return await driver_model_1.Driver.find().populate("user", "name email role blocked approved online vehicleInfo");
};
exports.getAllDrivers = getAllDrivers;
// Approve or suspend driver
const approveDriver = async (driverId, approve) => {
    const driver = await driver_model_1.Driver.findById(driverId);
    if (!driver)
        throw new ApiError_1.default(404, "Driver not found");
    driver.approved = approve;
    await driver.save();
    return driver;
};
exports.approveDriver = approveDriver;
// Get all rides
const getAllRides = async () => {
    return await ride_model_1.Ride.find().populate("rider", "name email").populate("driver", "user vehicleInfo approved");
};
exports.getAllRides = getAllRides;
