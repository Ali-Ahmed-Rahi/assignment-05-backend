"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAvailability = exports.suspendDriver = exports.approveDriver = exports.getDriverById = exports.getAllDrivers = void 0;
const driver_model_1 = require("./driver.model");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllDrivers = async () => {
    return await driver_model_1.Driver.find().populate("user", "name email role blocked");
};
exports.getAllDrivers = getAllDrivers;
const getDriverById = async (id) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        throw new ApiError_1.default(400, "Invalid driver ID");
    const driver = await driver_model_1.Driver.findById(id).populate("user", "name email role blocked");
    if (!driver)
        throw new ApiError_1.default(404, "Driver not found");
    return driver;
};
exports.getDriverById = getDriverById;
const approveDriver = async (id) => {
    const driver = await (0, exports.getDriverById)(id);
    driver.approved = true;
    await driver.save();
    return driver;
};
exports.approveDriver = approveDriver;
const suspendDriver = async (id) => {
    const driver = await (0, exports.getDriverById)(id);
    driver.approved = false;
    await driver.save();
    return driver;
};
exports.suspendDriver = suspendDriver;
const setAvailability = async (id, online) => {
    const driver = await (0, exports.getDriverById)(id);
    driver.online = online;
    await driver.save();
    return driver;
};
exports.setAvailability = setAvailability;
