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
exports.login = exports.register = void 0;
const authService = __importStar(require("./auth.service"));
const auth_schema_1 = require("./auth.schema");
const zod_1 = require("zod");
const user_model_1 = require("../user/user.model");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const driver_model_1 = require("../driver/driver.model");
const register = async (req, res, next) => {
    try {
        //  Validate incoming data
        const parsedData = auth_schema_1.registerSchema.parse(req.body);
        const { name, email, password, role } = parsedData;
        console.log(parsedData);
        // Check if user exists
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser)
            throw new ApiError_1.default(400, "User already exists");
        // // Hash password
        // const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);
        // Create user
        const user = await user_model_1.User.create(parsedData);
        // console.log(user);
        // Auto-create driver document if role === 'driver'
        if (role === "driver") {
            await driver_model_1.Driver.create({
                user: user._id,
                approved: false,
                online: false,
                vehicleInfo: "",
            });
        }
        res.status(201).json({ success: true, user });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        if (!req.body.role || req.body.role !== "admin") {
            auth_schema_1.loginSchema.parse(req.body); // validation only for rider/driver
        }
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        res.status(200).json({ success: true, ...result });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({ success: false, errors: error.errors });
        }
        next(error);
    }
};
exports.login = login;
