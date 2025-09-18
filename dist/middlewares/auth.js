"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError_1.default(401, "Unauthorized"));
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        if (!decoded)
            return next(new ApiError_1.default(401, "Invalid token"));
        req.user = decoded;
        next();
    }
    catch {
        return next(new ApiError_1.default(401, "Invalid token"));
    }
};
exports.authMiddleware = authMiddleware;
const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new ApiError_1.default(403, "Forbidden"));
    }
    next();
};
exports.authorize = authorize;
