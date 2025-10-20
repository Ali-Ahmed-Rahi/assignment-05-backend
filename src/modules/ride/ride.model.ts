import mongoose, { Schema, Document } from "mongoose";

export interface IRide extends Document {
  rider: mongoose.Schema.Types.ObjectId;
  driver?: mongoose.Schema.Types.ObjectId;
  pickupLocation: string;
  destinationLocation: string;
  fare?: number;
  status: "requested" | "accepted" | "in-progress" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const rideSchema: Schema<IRide> = new Schema(
  {
    rider: { type: Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: Schema.Types.ObjectId, ref: "Driver" },
    pickupLocation: { type: String, required: true },
    destinationLocation: { type: String, required: true },
    fare: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["requested", "accepted", "picked_up", "in_transit", "completed", "cancelled","rejected"],
      default: "requested",
    },
  },
  { timestamps: true }
);

export const Ride = mongoose.models.Ride || mongoose.model<IRide>("Ride", rideSchema);
