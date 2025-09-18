"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unblockUser = exports.blockUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const user_model_1 = require("./user.model");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllUsers = async () => {
    return await user_model_1.User.find();
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        throw new ApiError_1.default(400, "Invalid user ID");
    const user = await user_model_1.User.findById(id);
    if (!user)
        throw new ApiError_1.default(404, "User not found");
    return user;
};
exports.getUserById = getUserById;
const updateUser = async (id, data) => {
    const user = await (0, exports.getUserById)(id);
    Object.assign(user, data);
    await user.save();
    return user;
};
exports.updateUser = updateUser;
const blockUser = async (id) => {
    const user = await (0, exports.getUserById)(id);
    user.blocked = true;
    await user.save();
    return user;
};
exports.blockUser = blockUser;
const unblockUser = async (id) => {
    const user = await (0, exports.getUserById)(id);
    user.blocked = false;
    await user.save();
    return user;
};
exports.unblockUser = unblockUser;
