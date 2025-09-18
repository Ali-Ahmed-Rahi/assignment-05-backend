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
exports.getDriverById = exports.getAllDrivers = exports.suspendDriver = exports.approveDriver = void 0;
const driverService = __importStar(require("./driver.service"));
// Approve driver
const approveDriver = async (req, res, next) => {
    console.log(req);
    try {
        const { id } = req.params;
        const driver = await driverService.approveDriver(id);
        res.status(200).json({ success: true, driver });
    }
    catch (error) {
        next(error);
    }
};
exports.approveDriver = approveDriver;
// Suspend driver
const suspendDriver = async (req, res, next) => {
    try {
        const { id } = req.params;
        const driver = await driverService.suspendDriver(id);
        res.status(200).json({ success: true, driver });
    }
    catch (error) {
        next(error);
    }
};
exports.suspendDriver = suspendDriver;
// Get all drivers
const getAllDrivers = async (req, res, next) => {
    try {
        const drivers = await driverService.getAllDrivers();
        res.status(200).json({ success: true, drivers });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllDrivers = getAllDrivers;
// Get driver by ID
const getDriverById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const driver = await driverService.getDriverById(id);
        res.status(200).json({ success: true, driver });
    }
    catch (error) {
        next(error);
    }
};
exports.getDriverById = getDriverById;
