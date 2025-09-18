"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeRideController = exports.getAllRides = exports.getDriverRides = exports.getRiderRides = exports.updateRideStatus = exports.rejectRide = exports.acceptRide = exports.cancelRide = exports.requestRide = void 0;
const rideService = __importStar(require("./ride.service"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
// Rider requests ride
const requestRide = async (req, res, next) => {
    try {
        if (!req.user)
            throw new ApiError_1.default(401, "Unauthorized: user not found");
        const riderId = req.user.id;
        const { pickupLocation, destinationLocation } = req.body;
        const ride = await rideService.requestRide(riderId, pickupLocation, destinationLocation);
        res.status(201).json({ success: true, ride });
    }
    catch (error) {
        next(error);
    }
};
exports.requestRide = requestRide;
// Rider cancels ride
const cancelRide = async (req, res, next) => {
    try {
        if (!req.user)
            throw new ApiError_1.default(401, "Unauthorized: user not found");
        const { id } = req.params;
        const ride = await rideService.cancelRide(id, req.user.id);
        res.status(200).json({ success: true, ride });
    }
    catch (error) {
        next(error);
    }
};
exports.cancelRide = cancelRide;
// Driver accepts ride
const acceptRide = async (req, res, next) => {
    try {
        if (!req.user)
            throw new ApiError_1.default(401, "Unauthorized: user not found");
        const { id } = req.params;
        const ride = await rideService.acceptRide(id, req.user.id);
        res.status(200).json({ success: true, ride, massage: "Ride Accept" });
    }
    catch (error) {
        next(error);
    }
};
exports.acceptRide = acceptRide;
// Driver rejects a ride
const rejectRide = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ride = await rideService.rejectRide(id, req.user.id);
        res.status(200).json({
            success: true,
            message: "Ride rejected successfully",
            ride,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.rejectRide = rejectRide;
// Driver updates ride status
const updateRideStatus = async (req, res, next) => {
    try {
        if (!req.user)
            throw new ApiError_1.default(401, "Unauthorized: user not found");
        const { id } = req.params;
        const { status } = req.body;
        const ride = await rideService.updateRideStatus(id, status);
        res.status(200).json({ success: true, ride });
    }
    catch (error) {
        next(error);
    }
};
exports.updateRideStatus = updateRideStatus;
// Rider views history
const getRiderRides = async (req, res, next) => {
    try {
        if (!req.user)
            throw new ApiError_1.default(401, "Unauthorized: user not found");
        const rides = await rideService.getRiderRides(req.user.id);
        res.status(200).json({ success: true, rides });
    }
    catch (error) {
        next(error);
    }
};
exports.getRiderRides = getRiderRides;
// Driver views history
const getDriverRides = async (req, res, next) => {
    try {
        if (!req.user)
            throw new ApiError_1.default(401, "Unauthorized: user not found");
        const rides = await rideService.getDriverRides(req.user.id);
        res.status(200).json({ success: true, rides });
    }
    catch (error) {
        next(error);
    }
};
exports.getDriverRides = getDriverRides;
//  get all rides 
const getAllRides = async (req, res) => {
    const rides = await rideService.getAllRides();
    res.status(200).json({
        success: true,
        message: "All rides fetched successfully",
        data: rides,
    });
};
exports.getAllRides = getAllRides;
const completeRideController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ride = await rideService.completeRide(id);
        res.status(200).json({ success: true, ride });
    }
    catch (error) {
        next(error);
    }
};
exports.completeRideController = completeRideController;
