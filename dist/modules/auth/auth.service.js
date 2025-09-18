"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../user/user.model");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (data) => {
    const existing = await user_model_1.User.findOne({ email: data.email });
    if (existing)
        throw new ApiError_1.default(400, "Email already exists");
    const user = new user_model_1.User(data);
    await user.save();
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await user_model_1.User.findOne({ email });
    if (!user)
        throw new ApiError_1.default(401, "Invalid credentials");
    if (user.blocked)
        throw new ApiError_1.default(403, "User is Not Found");
    const isMatch = await user_model_1.User.comparePassword(password, user.password);
    if (!isMatch)
        throw new ApiError_1.default(401, "Password didn't Match");
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });
    return { user, token };
};
exports.loginUser = loginUser;
