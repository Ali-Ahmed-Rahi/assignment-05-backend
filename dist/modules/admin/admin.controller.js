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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRides = exports.approveSuspendDriver = exports.getDrivers = exports.blockUnblockUser = exports.getUsers = void 0;
const adminService = __importStar(require("./admin.service"));
// Users
const getUsers = async (req, res, next) => {
    try {
        const users = await adminService.getAllUsers();
        res.status(200).json({ success: true, users });
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const blockUnblockUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { blocked } = req.body;
        const user = await adminService.blockUser(id, blocked);
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        next(error);
    }
};
exports.blockUnblockUser = blockUnblockUser;
// Drivers
const getDrivers = async (req, res, next) => {
    try {
        const drivers = await adminService.getAllDrivers();
        res.status(200).json({ success: true, drivers });
    }
    catch (error) {
        next(error);
    }
};
exports.getDrivers = getDrivers;
const approveSuspendDriver = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { approve } = req.body;
        const driver = await adminService.approveDriver(id, approve);
        res.status(200).json({ success: true, driver });
    }
    catch (error) {
        next(error);
    }
};
exports.approveSuspendDriver = approveSuspendDriver;
// Rides
const getRides = async (req, res, next) => {
    try {
        const rides = await adminService.getAllRides();
        res.status(200).json({ success: true, rides });
    }
    catch (error) {
        next(error);
    }
};
exports.getRides = getRides;
