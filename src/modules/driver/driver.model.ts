import mongoose, { Schema, Document } from "mongoose";

export interface IDriver extends Document {
  user: mongoose.Schema.Types.ObjectId; 
  approved: boolean;
  online: boolean;
  earnings?: number;
  vehicleInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const driverSchema: Schema<IDriver> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    approved: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
    earnings: { type: Number, default: 0 },
    vehicleInfo: { type: String },
  },
  { timestamps: true }
);

export const Driver = mongoose.models.Driver || mongoose.model<IDriver>("Driver", driverSchema);

