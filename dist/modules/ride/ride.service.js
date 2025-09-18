"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeRide = exports.getAllRides = exports.getDriverRides = exports.getRiderRides = exports.updateRideStatus = exports.rejectRide = exports.acceptRide = exports.cancelRide = exports.requestRide = void 0;
const ride_model_1 = require("./ride.model");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const mongoose_1 = __importDefault(require("mongoose"));
const driver_model_1 = require("../driver/driver.model");
// Rider requests a ride
const requestRide = async (riderId, pickupLocation, destinationLocation) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(riderId))
        throw new ApiError_1.default(400, "Invalid rider ID");
    const ride = await ride_model_1.Ride.create({
        rider: riderId,
        pickupLocation,
        destinationLocation,
        status: "requested",
    });
    return ride;
};
exports.requestRide = requestRide;
// Rider cancels a ride (only if not accepted)
const cancelRide = async (rideId, riderId) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(rideId))
        throw new ApiError_1.default(400, "Invalid ride ID");
    const ride = await ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new ApiError_1.default(404, "Ride not found");
    if (ride.rider.toString() !== riderId)
        throw new ApiError_1.default(403, "You cannot cancel this ride");
    if (ride.status !== "requested")
        throw new ApiError_1.default(400, "Cannot cancel ride after driver accepts");
    ride.status = "cancelled";
    await ride.save();
    return ride;
};
exports.cancelRide = cancelRide;
// Driver accepts a ride
const acceptRide = async (rideId, driverId) => {
    const ride = await ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new ApiError_1.default(404, "Ride not found");
    if (ride.status !== "requested")
        throw new ApiError_1.default(400, "Ride already accepted or in progress");
    ride.driver = driverId;
    ride.status = "accepted";
    await ride.save();
    return ride;
};
exports.acceptRide = acceptRide;
// Driver rejects a ride
const rejectRide = async (rideId, driverId) => {
    const ride = await ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new ApiError_1.default(404, "Ride not found");
    }
    // Ensure only the assigned driver can reject
    if (ride.driver.toString() !== driverId) {
        throw new ApiError_1.default(403, "You are not authorized to reject this ride");
    }
    // Ride must be in requested or accepted stage
    if (!["requested", "accepted"].includes(ride.status)) {
        throw new ApiError_1.default(400, "Ride cannot be rejected at this stage");
    }
    ride.status = "rejected";
    await ride.save();
    return ride;
};
exports.rejectRide = rejectRide;
// Update ride status (Driver only)
const updateRideStatus = async (rideId, status) => {
    const ride = await ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new ApiError_1.default(404, "Ride not found");
    const allowedTransitions = {
        requested: ["accepted", "cancelled"],
        accepted: ["in-progress", "cancelled"],
        "in-progress": ["completed", "cancelled"],
        completed: [],
        cancelled: [],
    };
    if (!allowedTransitions[ride.status].includes(status)) {
        throw new ApiError_1.default(400, "Invalid status update");
    }
    ride.status = status;
    await ride.save();
    return ride;
};
exports.updateRideStatus = updateRideStatus;
// Get ride history for rider
const getRiderRides = async (riderId) => {
    const rides = await ride_model_1.Ride.find({ rider: riderId }).populate("driver", "user approved online vehicleInfo");
    return rides;
};
exports.getRiderRides = getRiderRides;
// Get ride history for driver
const getDriverRides = async (driverId) => {
    const rides = await ride_model_1.Ride.find({ driver: driverId }).populate("rider", "name email");
    return rides;
};
exports.getDriverRides = getDriverRides;
// get all rides (admin)
const getAllRides = async () => {
    const rides = await ride_model_1.Ride.find()
        .populate("rider", "name email")
        .populate("driver", "name email vehicleNo");
    return rides;
};
exports.getAllRides = getAllRides;
const completeRide = async (rideId) => {
    const ride = await ride_model_1.Ride.findById(rideId);
    if (!ride)
        throw new ApiError_1.default(404, "Ride not found");
    if (ride.status === "completed") {
        throw new ApiError_1.default(400, "Ride already completed");
    }
    // Example fare calculation
    const baseFare = 50;
    const perKmRate = 10;
    const distance = ride.distance || 0;
    ride.fare = baseFare + distance * perKmRate;
    ride.status = "completed";
    await ride.save();
    // Update driver earnings
    const driver = await driver_model_1.Driver.findById(ride.driver);
    if (driver) {
        driver.earnings += ride.fare;
        await driver.save();
    }
    return ride;
};
exports.completeRide = completeRide;
