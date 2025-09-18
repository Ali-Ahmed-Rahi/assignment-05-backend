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
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["rider", "driver", "admin"], required: true },
    blocked: { type: Boolean, default: false },
}, { timestamps: true });
// Hash password before saving
userSchema.pre("save", async function (next) {
    // if (!this.isModified("password")) return next();
    const hashed = await bcryptjs_1.default.hash(this.password, 10);
    this.password = hashed;
    next();
});
// Compare password method
userSchema.statics.comparePassword = async function (plainPassword, hashedPassword) {
    return await bcryptjs_1.default.compare(plainPassword, hashedPassword);
};
exports.User = mongoose_1.default.model("User", userSchema);
// import mongoose, { Schema, Document } from "mongoose";
// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password:string;
//   role: "rider" | "driver" | "admin";
//   blocked: boolean;
//   comparePassword: (password: string) => Promise<boolean>; // method
//   createdAt: Date;
//   updatedAt: Date;
// }
// const userSchema: Schema<IUser> = new Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["rider", "driver", "admin"], required: true },
//     blocked: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );
// export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
