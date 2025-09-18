"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (err) {
            const message = err.errors?.map((e) => e.message).join(", ") || "Validation error";
            next(new ApiError_1.default(400, message));
        }
    };
};
exports.validateRequest = validateRequest;
